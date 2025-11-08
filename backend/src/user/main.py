
import os
from fastapi import FastAPI, HTTPException, Depends
from . import schemas
from supabase import Client
from .dependencies import get_supabase
from passlib.context import CryptContext
import consul
from prometheus_fastapi_instrumentator import Instrumentator

from .dependencies import get_supabase
from supabase import Client

app = FastAPI(
    title="User Service",
    description="Manages user profiles and role-based access control (RBAC).",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, supabase: Client = Depends(get_supabase)):
    # Check if user exists
    response = supabase.table("users").select("id").eq("email", user.email).execute()
    if response.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    
    # Create user
    response = supabase.table("users").insert({
        "username": user.username, 
        "email": user.email, 
        "hashed_password": hashed_password
    }).execute()
    
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create user.")
        
    return response.data[0]

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, supabase: Client = Depends(get_supabase)):
    response = supabase.table("users").select("*").range(skip, skip + limit - 1).execute()
    return response.data if response.data else []

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, supabase: Client = Depends(get_supabase)):
    response = supabase.table("users").select("*").eq("id", user_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return response.data


@app.get("/users/email/{email}", response_model=schemas.User)
def read_user_by_email(email: str, supabase: Client = Depends(get_supabase)):
    response = supabase.table("users").select("*").eq("email", email).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return response.data

@app.post("/roles/", response_model=schemas.Role)
def create_role(role: schemas.RoleCreate, supabase: Client = Depends(get_supabase)):
    # Check if role exists
    response = supabase.table("roles").select("id").eq("name", role.name).execute()
    if response.data:
        raise HTTPException(status_code=400, detail="Role already exists")

    response = supabase.table("roles").insert({"name": role.name}).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create role.")
    return response.data[0]

@app.post("/users/{user_id}/roles/{role_id}")
def add_role_to_user(user_id: int, role_id: int, supabase: Client = Depends(get_supabase)):
    # This assumes a join table named 'user_roles' exists.
    # You would typically also check if the user and role exist first.
    response = supabase.table("user_roles").insert({"user_id": user_id, "role_id": role_id}).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to add role to user.")
    return {"message": "Role added to user"}
