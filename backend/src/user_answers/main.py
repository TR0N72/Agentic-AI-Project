from fastapi import FastAPI, Depends, HTTPException
from supabase import Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx
import uuid
from typing import List

from api_schemas import UserAnswerCreate, UserAnswerUpdate, UserAnswerResponse
from database import get_supabase_client

app = FastAPI(
    title="User Answer Service",
    description="Manages user answers with CRUD operations.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

USERS_SERVICE_URL = os.getenv("USERS_SERVICE_URL", "http://localhost:8014")
QUESTIONS_SERVICE_URL = os.getenv("QUESTIONS_SERVICE_URL", "http://localhost:8004")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "user_answer_service")
    c.agent.service.register(
        name="user-answer-service",
        service_id="user-answer-service-1",
        address=container_name,
        port=8018,
        check=consul.Check.http(f"http://{container_name}:8018/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/user-answers/", response_model=UserAnswerResponse)
async def create_user_answer(answer: UserAnswerCreate, supabase: Client = Depends(get_supabase_client)):
    # Check if user_id exists in the users service
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{USERS_SERVICE_URL}/users/{answer.user_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"User with ID {answer.user_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Users service is unavailable.")

        # Check if question_id exists in the questions service
        try:
            response = await client.get(f"{QUESTIONS_SERVICE_URL}/questions/{answer.question_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"Question with ID {answer.question_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Questions service is unavailable.")

    answer_data = answer.dict()
    answer_data['user_id'] = str(answer.user_id)
    response = supabase.table('user_answers').insert(answer_data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create user answer")
    
    return response.data[0]

@app.get("/user-answers/{answer_id}", response_model=UserAnswerResponse)
def read_user_answer(answer_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_answers').select("*").eq('answer_id', answer_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User answer not found")
    
    return response.data[0]

@app.get("/user-answers/by-user/{user_id}", response_model=List[UserAnswerResponse])
def get_user_answers_by_user(user_id: uuid.UUID, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_answers').select("*").eq('user_id', str(user_id)).execute()
    if not response.data:
        return [] # Return empty list if no answers found for the user
    
    return response.data

@app.get("/user-answers/by-question/{question_id}", response_model=List[UserAnswerResponse])
def get_user_answers_by_question(question_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_answers').select("*").eq('question_id', question_id).execute()
    if not response.data:
        return [] # Return empty list if no answers found for the question
    
    return response.data

@app.put("/user-answers/{answer_id}", response_model=UserAnswerResponse)
async def update_user_answer(answer_id: int, answer: UserAnswerUpdate, supabase: Client = Depends(get_supabase_client)):
    answer_data = answer.dict(exclude_unset=True)
    response = supabase.table('user_answers').update(answer_data).eq('answer_id', answer_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User answer not found")

    return response.data[0]

@app.delete("/user-answers/{answer_id}")
def delete_user_answer(answer_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_answers').delete().eq('answer_id', answer_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User answer not found")
    
    return {"message": "User answer deleted successfully"}