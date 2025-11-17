from fastapi import FastAPI, Depends, HTTPException
from supabase import Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx

from api_schemas import TopicCreate, TopicUpdate, TopicResponse, MaterialResponse, QuestionResponse, EvaluationResponse, GeneratedQuestionResponse
from database import get_supabase_client

app = FastAPI(
    title="Topic Service",
    description="Manages topics with CRUD operations.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

MATERIALS_SERVICE_URL = os.getenv("MATERIALS_SERVICE_URL", "http://localhost:8015")
QUESTIONS_SERVICE_URL = os.getenv("QUESTIONS_SERVICE_URL", "http://localhost:8004")
EVALUATIONS_SERVICE_URL = os.getenv("EVALUATIONS_SERVICE_URL", "http://localhost:8019")
GENERATED_QUESTIONS_SERVICE_URL = os.getenv("GENERATED_QUESTIONS_SERVICE_URL", "http://localhost:8016")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "topic_service")
    c.agent.service.register(
        name="topic-service",
        service_id="topic-service-1",
        address=container_name,
        port=8013, # Assuming a new port for this service
        check=consul.Check.http(f"http://{container_name}:8013/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/topics/", response_model=TopicResponse)
def create_topic(topic: TopicCreate, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('topics').insert(topic.dict()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create topic")
    
    return response.data[0]

@app.get("/topics/{topic_id}", response_model=TopicResponse)
async def read_topic(topic_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('topics').select("*").eq('topic_id', topic_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    topic_data = response.data[0]

    async with httpx.AsyncClient() as client:
        # Fetch associated materials from the materials service
        try:
            materials_response = await client.get(f"{MATERIALS_SERVICE_URL}/materials/by-topic/{topic_id}")
            materials_response.raise_for_status()
            topic_data['materials'] = materials_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="Materials service is unavailable or returned an error.")
            topic_data['materials'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Materials service is unavailable.")

        # Fetch associated questions from the questions service
        try:
            questions_response = await client.get(f"{QUESTIONS_SERVICE_URL}/questions/by-topic/{topic_id}")
            questions_response.raise_for_status()
            topic_data['questions'] = questions_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="Questions service is unavailable or returned an error.")
            topic_data['questions'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Questions service is unavailable.")

        # Fetch associated evaluations from the evaluations service
        try:
            evaluations_response = await client.get(f"{EVALUATIONS_SERVICE_URL}/evaluations/by-topic/{topic_id}")
            evaluations_response.raise_for_status()
            topic_data['evaluations'] = evaluations_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="Evaluations service is unavailable or returned an error.")
            topic_data['evaluations'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Evaluations service is unavailable.")

        # Fetch associated generated questions from the generated_questions service
        try:
            generated_questions_response = await client.get(f"{GENERATED_QUESTIONS_SERVICE_URL}/generated-questions/by-topic/{topic_id}")
            generated_questions_response.raise_for_status()
            topic_data['generated_questions'] = generated_questions_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="Generated Questions service is unavailable or returned an error.")
            topic_data['generated_questions'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Generated Questions service is unavailable.")
    
    return TopicResponse(**topic_data)

@app.put("/topics/{topic_id}", response_model=TopicResponse)
def update_topic(topic_id: int, topic: TopicUpdate, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('topics').update(topic.dict(exclude_unset=True)).eq('topic_id', topic_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Topic not found")

    return response.data[0]

@app.delete("/topics/{topic_id}")
def delete_topic(topic_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('topics').delete().eq('topic_id', topic_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    return {"message": "Topic deleted successfully"}
