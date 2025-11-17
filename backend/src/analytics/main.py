from fastapi import FastAPI, Depends
from supabase import create_client, Client
from datetime import datetime
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="Analytics Service",
    description="Logs user activities and provides aggregated analytics.",
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
    container_name = os.getenv("CONTAINER_NAME", "analytics_service")
    c.agent.service.register(
        name="analytics-service",
        service_id="analytics-service-1",
        address=container_name,
        port=8008,
        check=consul.Check.http(f"http://{container_name}:8008/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/activities/")
def log_activity(user_id: int, activity: str, supabase: Client = Depends(get_supabase)):
    response = supabase.table('user_activities').insert({"user_id": user_id, "activity": activity}).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to log activity")
    return response.data[0]

@app.get("/analytics/")
def get_analytics(supabase: Client = Depends(get_supabase)):
    response = supabase.table('user_activities').select("activity", count='exact').execute()
    return {row['activity']: row['count'] for row in response.data}
