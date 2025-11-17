import os
from fastapi import FastAPI, Depends, HTTPException
from supabase import create_client, Client
import consul
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="User Service",
    description="Manages user profiles and role-based access control (RBAC).",
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
    container_name = os.getenv("CONTAINER_NAME", "user_service")
    c.agent.service.register(
        name="user-service",
        service_id="user-service-1",
        address=container_name,
        port=8002,
        check=consul.Check.http(f"http://{container_name}:8002/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/users/")
def read_users(supabase: Client = Depends(get_supabase)):
    response = supabase.auth.admin.list_users()
    return response.users

@app.get("/users/{user_id}")
def read_user(user_id: str, supabase: Client = Depends(get_supabase)):
    response = supabase.auth.admin.get_user_by_id(user_id)
    if not response.user:
        raise HTTPException(status_code=404, detail="User not found")
    return response.user

@app.get("/users/by_email/{email}")
def read_user_by_email(email: str, supabase: Client = Depends(get_supabase)):
    # This is a workaround as supabase-py does not have a direct way to get user by email
    response = supabase.auth.admin.list_users()
    for user in response.users:
        if user.email == email:
            return user
    raise HTTPException(status_code=404, detail="User not found")
