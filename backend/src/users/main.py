from fastapi import FastAPI, Depends, HTTPException, Header
from supabase import Client
from gotrue.errors import AuthApiError
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx
import uuid

from api_schemas import UserCreate, UserUpdate, UserResponse, UserProgressResponse, UserAnswerResponse, EvaluationResponse, UserSignup, UserLogin, AuthResponse
from database import get_supabase_client

app = FastAPI(
    title="User Service",
    description="Manages user accounts with CRUD operations and authentication.",
    version="2.0.0",
)

Instrumentator().instrument(app).expose(app)

USER_PROGRESS_SERVICE_URL = os.getenv("USER_PROGRESS_SERVICE_URL", "http://localhost:8017")
USER_ANSWERS_SERVICE_URL = os.getenv("USER_ANSWERS_SERVICE_URL", "http://localhost:8018")
EVALUATIONS_SERVICE_URL = os.getenv("EVALUATIONS_SERVICE_URL", "http://localhost:8019")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "user_service")
    c.agent.service.register(
        name="user-service",
        service_id="user-service-1",
        address=container_name,
        port=8014,
        check=consul.Check.http(f"http://{container_name}:8014/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/users/signup")
def signup(user: UserSignup, supabase: Client = Depends(get_supabase_client)):
    try:
        # Sign up the user in Supabase auth
        auth_response = supabase.auth.sign_up(
            {"email": user.email, "password": user.password}
        )

        if not auth_response.user:
            raise HTTPException(status_code=400, detail="Could not sign up user.")

        # Create a corresponding user profile in the public 'users' table
        user_profile_data = {
            "user_id": auth_response.user.id,
            "username": user.username,
            "email": user.email
        }
        
        profile_response = supabase.table('users').insert(user_profile_data).execute()

        if not profile_response.data:
            # Here you might want to handle the case where the auth user was created but the profile was not.
            # For simplicity, we'll raise an error. A more robust solution might involve cleanup.
            raise HTTPException(status_code=500, detail="Failed to create user profile after signup.")

        if auth_response.session:
             return {
                "access_token": auth_response.session.access_token,
                "refresh_token": auth_response.session.refresh_token,
                "user": auth_response.user.dict()
            }
        else:
            # This case might happen if email confirmation is required.
            # The user is created but no session is returned.
            return {"message": "Signup successful, please check your email for confirmation."}

    except AuthApiError as e:
        raise HTTPException(status_code=e.status, detail=e.message)

@app.post("/users/login", response_model=AuthResponse)
def login(user: UserLogin, supabase: Client = Depends(get_supabase_client)):
    try:
        response = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        if response.user and response.session:
            return {
                "access_token": response.session.access_token,
                "refresh_token": response.session.refresh_token,
                "user": response.user.dict()
            }
        else:
            raise HTTPException(status_code=400, detail="Invalid login credentials.")
    except AuthApiError as e:
        raise HTTPException(status_code=e.status, detail=e.message)

@app.post("/users/logout")
def logout(authorization: str = Header(None), supabase: Client = Depends(get_supabase_client)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header is required.")
    
    token = authorization.split(" ")[1]
    try:
        supabase.auth.sign_out(token)
        return {"message": "Successfully logged out."}
    except AuthApiError as e:
        raise HTTPException(status_code=e.status, detail=e.message)

@app.get("/users/{user_id}", response_model=UserResponse)
async def read_user(user_id: uuid.UUID, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('users').select("*").eq('user_id', str(user_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = response.data[0]

    async with httpx.AsyncClient() as client:
        # Fetch associated user progress from the user_progress service
        try:
            user_progress_response = await client.get(f"{USER_PROGRESS_SERVICE_URL}/user-progress/by-user/{user_id}")
            user_progress_response.raise_for_status()
            user_data['user_progress'] = user_progress_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="User Progress service is unavailable or returned an error.")
            user_data['user_progress'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="User Progress service is unavailable.")

        # Fetch associated user answers from the user_answers service
        try:
            user_answers_response = await client.get(f"{USER_ANSWERS_SERVICE_URL}/user-answers/by-user/{user_id}")
            user_answers_response.raise_for_status()
            user_data['user_answers'] = user_answers_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="User Answers service is unavailable or returned an error.")
            user_data['user_answers'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="User Answers service is unavailable.")

        # Fetch associated user evaluations from the evaluations service
        try:
            evaluations_response = await client.get(f"{EVALUATIONS_SERVICE_URL}/evaluations/by-user/{user_id}")
            evaluations_response.raise_for_status()
            user_data['evaluations'] = evaluations_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="Evaluations service is unavailable or returned an error.")
            user_data['evaluations'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Evaluations service is unavailable.")
    
    return UserResponse(**user_data)

@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: uuid.UUID, user: UserUpdate, supabase: Client = Depends(get_supabase_client)):
    user_data = user.dict(exclude_unset=True)
    response = supabase.table('users').update(user_data).eq('user_id', str(user_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")

    return response.data[0]

@app.delete("/users/{user_id}")
def delete_user(user_id: uuid.UUID, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('users').delete().eq('user_id', str(user_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}