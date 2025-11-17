from fastapi import FastAPI, Depends, HTTPException
from supabase import Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx

from api_schemas import GeneratedQuestionCreate, GeneratedQuestionUpdate, GeneratedQuestionResponse
from database import get_supabase_client

app = FastAPI(
    title="Generated Question Service",
    description="Manages AI-generated questions with CRUD operations.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

TOPICS_SERVICE_URL = os.getenv("TOPICS_SERVICE_URL", "http://localhost:8013")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "generated_question_service")
    c.agent.service.register(
        name="generated-question-service",
        service_id="generated-question-service-1",
        address=container_name,
        port=8016, # Assuming a new port for this service
        check=consul.Check.http(f"http://{container_name}:8016/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/generated-questions/", response_model=GeneratedQuestionResponse)
async def create_generated_question(question: GeneratedQuestionCreate, supabase: Client = Depends(get_supabase_client)):
    # Check if topic_id exists in the topics service
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{question.topic_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"Topic with ID {question.topic_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    response = supabase.table('generated_questions').insert(question.dict()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create generated question")
    
    return response.data[0]

@app.get("/generated-questions/{gen_id}", response_model=GeneratedQuestionResponse)
def read_generated_question(gen_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('generated_questions').select("*").eq('gen_id', gen_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Generated question not found")
    
    return response.data[0]

@app.get("/generated-questions/by-topic/{topic_id}", response_model=List[GeneratedQuestionResponse])
def get_generated_questions_by_topic(topic_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('generated_questions').select("*").eq('topic_id', topic_id).execute()
    if not response.data:
        return [] # Return empty list if no generated questions found for the topic
    
    return response.data

@app.put("/generated-questions/{gen_id}", response_model=GeneratedQuestionResponse)
async def update_generated_question(gen_id: int, question: GeneratedQuestionUpdate, supabase: Client = Depends(get_supabase_client)):
    # Check if topic_id exists if it's being updated
    if question.topic_id:
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{question.topic_id}")
                response.raise_for_status()
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail=f"Topic with ID {question.topic_id} not found.")
            except httpx.RequestError:
                raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    response = supabase.table('generated_questions').update(question.dict(exclude_unset=True)).eq('gen_id', gen_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Generated question not found")

    return response.data[0]

@app.delete("/generated-questions/{gen_id}")
def delete_generated_question(gen_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('generated_questions').delete().eq('gen_id', gen_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Generated question not found")
    
    return {"message": "Generated question deleted successfully"}
