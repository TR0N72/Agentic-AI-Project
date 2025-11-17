from fastapi import FastAPI, Depends, HTTPException
from supabase import Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx
import uuid
from typing import List

from api_schemas import EvaluationCreate, EvaluationUpdate, EvaluationResponse
from database import get_supabase_client

app = FastAPI(
    title="Evaluation Service",
    description="Manages user evaluations with CRUD operations.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

USERS_SERVICE_URL = os.getenv("USERS_SERVICE_URL", "http://localhost:8014")
TOPICS_SERVICE_URL = os.getenv("TOPICS_SERVICE_URL", "http://localhost:8013")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "evaluation_service")
    c.agent.service.register(
        name="evaluation-service",
        service_id="evaluation-service-1",
        address=container_name,
        port=8019,
        check=consul.Check.http(f"http://{container_name}:8019/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/evaluations/", response_model=EvaluationResponse)
async def create_evaluation(evaluation: EvaluationCreate, supabase: Client = Depends(get_supabase_client)):
    # Check if user_id exists in the users service
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{USERS_SERVICE_URL}/users/{evaluation.user_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"User with ID {evaluation.user_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Users service is unavailable.")

        # Check if topic_id exists in the topics service
        try:
            response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{evaluation.topic_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"Topic with ID {evaluation.topic_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    evaluation_data = evaluation.dict()
    evaluation_data['user_id'] = str(evaluation.user_id)
    response = supabase.table('evaluations').insert(evaluation_data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create evaluation")
    
    return response.data[0]

@app.get("/evaluations/{evaluation_id}", response_model=EvaluationResponse)
def read_evaluation(evaluation_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('evaluations').select("*").eq('evaluation_id', evaluation_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Evaluation not found")
    
    return response.data[0]

@app.get("/evaluations/by-user/{user_id}", response_model=List[EvaluationResponse])
def get_evaluations_by_user(user_id: uuid.UUID, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('evaluations').select("*").eq('user_id', str(user_id)).execute()
    if not response.data:
        return [] # Return empty list if no evaluations found for the user
    
    return response.data

@app.get("/evaluations/by-topic/{topic_id}", response_model=List[EvaluationResponse])
def get_evaluations_by_topic(topic_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('evaluations').select("*").eq('topic_id', topic_id).execute()
    if not response.data:
        return [] # Return empty list if no evaluations found for the topic
    
    return response.data

@app.put("/evaluations/{evaluation_id}", response_model=EvaluationResponse)
async def update_evaluation(evaluation_id: int, evaluation: EvaluationUpdate, supabase: Client = Depends(get_supabase_client)):
    evaluation_data = evaluation.dict(exclude_unset=True)
    response = supabase.table('evaluations').update(evaluation_data).eq('evaluation_id', evaluation_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Evaluation not found")

    return response.data[0]

@app.delete("/evaluations/{evaluation_id}")
def delete_evaluation(evaluation_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('evaluations').delete().eq('evaluation_id', evaluation_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Evaluation not found")
    
    return {"message": "Evaluation deleted successfully"}