import os
from fastapi import FastAPI, Depends, HTTPException
from supabase import create_client, Client
import consul
from prometheus_fastapi_instrumentator import Instrumentator
from . import schemas

app = FastAPI(
    title="Data Service",
    description="Manages data for questions, users, and activities.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

def get_supabase() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")
    if not url or not key:
        raise ValueError("Supabase URL and service key are required.")
    return create_client(url, key)

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "data_service")
    c.agent.service.register(
        name="data-service",
        service_id="data-service-1",
        address=container_name,
        port=8003,
        check=consul.Check.http(f"http://{container_name}:8003/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/questions/", response_model=schemas.Question)
def create_question(question: schemas.QuestionCreate, supabase: Client = Depends(get_supabase)):
    response = supabase.table('questions').insert(question.dict()).execute()
    if response.data:
        return response.data[0]
    raise HTTPException(status_code=400, detail="Failed to create question")

@app.get("/questions/", response_model=list[schemas.Question])
def read_questions(skip: int = 0, limit: int = 100, supabase: Client = Depends(get_supabase)):
    response = supabase.table('questions').select("*").range(skip, skip + limit - 1).execute()
    return response.data

@app.get("/questions/{question_id}", response_model=schemas.Question)
def read_question(question_id: int, supabase: Client = Depends(get_supabase)):
    response = supabase.table('questions').select("*").eq('id', question_id).execute()
    if response.data:
        return response.data[0]
    raise HTTPException(status_code=404, detail="Question not found")

@app.post("/activities/", response_model=schemas.UserActivity)
def log_activity(activity: schemas.UserActivityCreate, supabase: Client = Depends(get_supabase)):
    response = supabase.table('user_activities').insert(activity.dict()).execute()
    if response.data:
        return response.data[0]
    raise HTTPException(status_code=400, detail="Failed to log activity")
