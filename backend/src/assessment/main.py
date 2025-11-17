from fastapi import FastAPI, Depends, HTTPException
from supabase import create_client, Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="Assessment Service",
    description="Manages exam sessions and adaptive scoring.",
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
    response = supabase.table('assessments').insert({"user_id": user_id, "score": 0}).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create assessment")
    return response.data[0]

@app.post("/assessments/{assessment_id}/questions")
def add_question_to_assessment(assessment_id: int, question_id: int, user_answer: str, supabase: Client = Depends(get_supabase)):
    # In a real application, you would have logic to check the answer
    # and determine if it is correct. For this example, we'll just
    # assume the answer is correct if it's not empty.
    is_correct = 1 if user_answer else 0

    response = supabase.table('assessment_questions').insert({
        "assessment_id": assessment_id,
        "question_id": question_id,
        "user_answer": user_answer,
        "is_correct": is_correct
    }).execute()

    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to add question to assessment")

    # Update the assessment score
    if is_correct:
        assessment_response = supabase.table('assessments').select("score").eq('id', assessment_id).execute()
        if assessment_response.data:
            current_score = assessment_response.data[0]['score']
            supabase.table('assessments').update({"score": current_score + 1}).eq('id', assessment_id).execute()

    return {"message": "Question added to assessment"}

@app.get("/assessments/{assessment_id}")
def read_assessment(assessment_id: int, supabase: Client = Depends(get_supabase)):
    response = supabase.table('assessments').select("*").eq('id', assessment_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    questions_response = supabase.table('assessment_questions').select("*").eq('assessment_id', assessment_id).execute()
    assessment = response.data[0]
    assessment['questions'] = questions_response.data
    return assessment