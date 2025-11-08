from fastapi import FastAPI, HTTPException, Depends
from supabase import Client
from .dependencies import get_supabase
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="Assessment Service",
    description="Manages exam sessions and adaptive scoring.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "assessment_service")
    c.agent.service.register(
        name="assessment-service",
        service_id="assessment-service-1",
        address=container_name,
        port=8005,
        check=consul.Check.http(f"http://{container_name}:8005/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/assessments/")
def create_assessment(user_id: int, supabase: Client = Depends(get_supabase)):
    response = supabase.table("assessments").insert({"user_id": user_id, "score": 0}).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create assessment.")
    return response.data[0]

@app.post("/assessments/{assessment_id}/questions")
def add_question_to_assessment(assessment_id: int, question_id: int, user_answer: str, supabase: Client = Depends(get_supabase)):
    # This endpoint requires a PostgreSQL function in Supabase to ensure atomicity.
    # See previous comments for the function definition.
    try:
        supabase.rpc('add_question_to_assessment_and_update_score', {
            'p_assessment_id': assessment_id,
            'p_question_id': question_id,
            'p_user_answer': user_answer
        }).execute()
        return {"message": "Question added to assessment"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/assessments/{assessment_id}")
def read_assessment(assessment_id: int, supabase: Client = Depends(get_supabase)):
    # This assumes a foreign key relationship is set up in Supabase
    response = supabase.table("assessments").select("*, assessment_questions(*)").eq("id", assessment_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return response.data
