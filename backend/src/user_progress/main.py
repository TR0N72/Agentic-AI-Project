from fastapi import FastAPI, Depends, HTTPException
from supabase import Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx
import uuid
from typing import List

from api_schemas import UserProgressCreate, UserProgressUpdate, UserProgressResponse
from database import get_supabase_client

app = FastAPI(
    title="User Progress Service",
    description="Manages user progress with CRUD operations.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

USERS_SERVICE_URL = os.getenv("USERS_SERVICE_URL", "http://localhost:8014")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "user_progress_service")
    c.agent.service.register(
        name="user-progress-service",
        service_id="user-progress-service-1",
        address=container_name,
        port=8017,
        check=consul.Check.http(f"http://{container_name}:8017/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/user-progress/", response_model=UserProgressResponse)
async def create_user_progress(progress: UserProgressCreate, supabase: Client = Depends(get_supabase_client)):
    # Check if user_id exists in the users service
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{USERS_SERVICE_URL}/users/{progress.user_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"User with ID {progress.user_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Users service is unavailable.")

    progress_data = progress.dict()
    progress_data['user_id'] = str(progress.user_id)
    response = supabase.table('user_progress').insert(progress_data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create user progress")
    
    return response.data[0]

@app.get("/user-progress/{progress_id}", response_model=UserProgressResponse)
def read_user_progress(progress_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_progress').select("*").eq('progress_id', progress_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User progress not found")
    
    return response.data[0]

@app.get("/user-progress/by-user/{user_id}", response_model=List[UserProgressResponse])
def get_user_progress_by_user(user_id: uuid.UUID, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_progress').select("*").eq('user_id', str(user_id)).execute()
    if not response.data:
        return [] # Return empty list if no progress found for the user
    
    return response.data

@app.put("/user-progress/{progress_id}", response_model=UserProgressResponse)
async def update_user_progress(progress_id: int, progress: UserProgressUpdate, supabase: Client = Depends(get_supabase_client)):
    progress_data = progress.dict(exclude_unset=True)
    response = supabase.table('user_progress').update(progress_data).eq('progress_id', progress_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User progress not found")

    return response.data[0]

@app.delete("/user-progress/{progress_id}")
def delete_user_progress(progress_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('user_progress').delete().eq('progress_id', progress_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User progress not found")
    
    return {"message": "User progress deleted successfully"}