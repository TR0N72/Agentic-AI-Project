
from fastapi import FastAPI, HTTPException, Depends
from datetime import datetime
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
from supabase import Client
from .dependencies import get_supabase

app = FastAPI(
    title="Analytics Service",
    description="Logs user activities and provides aggregated analytics.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

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
    response = supabase.table("user_activities").insert({
        "user_id": user_id,
        "activity": activity,
        "timestamp": datetime.utcnow().isoformat()
    }).execute()
    
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to log activity.")
        
    return response.data[0]

@app.get("/analytics/")
def get_analytics(supabase: Client = Depends(get_supabase)):
    # This endpoint assumes you have created a PostgreSQL function in your Supabase
    # database called 'get_activity_analytics'.
    #
    # CREATE OR REPLACE FUNCTION get_activity_analytics()
    # RETURNS TABLE(activity TEXT, count BIGINT) AS $
    # BEGIN
    #     RETURN QUERY
    #     SELECT ua.activity, COUNT(ua.activity)
    #     FROM user_activities ua
    #     GROUP BY ua.activity;
    # END; $
    # LANGUAGE plpgsql;
    
    response = supabase.rpc('get_activity_analytics').execute()
    
    if not response.data:
        return {}
        
    return {item['activity']: item['count'] for item in response.data}
