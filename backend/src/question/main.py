from fastapi import FastAPI, Depends, HTTPException
import pika
import json
from supabase import Client
import redis
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx

from api_schemas import QuestionCreate, QuestionUpdate, QuestionResponse, UserAnswerResponse
from database import get_supabase_client

# Redis setup
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)

# RabbitMQ setup
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")

app = FastAPI(
    title="Question Service",
    description="Manages the question bank with CRUD operations and caching.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

TOPICS_SERVICE_URL = os.getenv("TOPICS_SERVICE_URL", "http://localhost:8013")
USER_ANSWERS_SERVICE_URL = os.getenv("USER_ANSWERS_SERVICE_URL", "http://localhost:8018")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "question_service")
    c.agent.service.register(
        name="question-service",
        service_id="question-service-1",
        address=container_name,
        port=8004,
        check=consul.Check.http(f"http://{container_name}:8004/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/questions/", response_model=QuestionResponse)
async def create_question(question: QuestionCreate, supabase: Client = Depends(get_supabase_client)):
    # Check if topic_id exists in the topics service
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{question.topic_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"Topic with ID {question.topic_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    response = supabase.table('questions').insert(question.dict()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create question")
    
    db_question = response.data[0]

    # Publish message to RabbitMQ
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
        channel = connection.channel()
        channel.queue_declare(queue='question_created')
        channel.basic_publish(exchange='',
                              routing_key='question_created',
                              body=json.dumps(db_question))
        connection.close()
    except pika.exceptions.AMQPConnectionError:
        # Handle RabbitMQ connection error
        pass

    return db_question

@app.get("/questions/{question_id}", response_model=QuestionResponse)
async def read_question(question_id: int, supabase: Client = Depends(get_supabase_client)):
    # Check cache first
    cached_question = redis_client.get(f"question_{question_id}")
    if cached_question:
        return json.loads(cached_question)

    # If not in cache, get from DB
    response = supabase.table('questions').select("*").eq('question_id', question_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question_data = response.data[0]

    # Fetch associated user answers from the user_answers service
    async with httpx.AsyncClient() as client:
        try:
            user_answers_response = await client.get(f"{USER_ANSWERS_SERVICE_URL}/user-answers/by-question/{question_id}")
            user_answers_response.raise_for_status()
            question_data['user_answers'] = user_answers_response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code != 404:
                raise HTTPException(status_code=503, detail="User Answers service is unavailable or returned an error.")
            question_data['user_answers'] = []
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="User Answers service is unavailable.")

    # Store in cache
    redis_client.set(f"question_{question_id}", json.dumps(question_data), ex=3600) # Cache for 1 hour
    return QuestionResponse(**question_data)

@app.get("/questions/by-topic/{topic_id}", response_model=List[QuestionResponse])
def get_questions_by_topic(topic_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('questions').select("*").eq('topic_id', topic_id).execute()
    if not response.data:
        return [] # Return empty list if no questions found for the topic
    
    return response.data

@app.put("/questions/{question_id}", response_model=QuestionResponse)
async def update_question(question_id: int, question: QuestionUpdate, supabase: Client = Depends(get_supabase_client)):
    # Check if topic_id exists if it's being updated
    if question.topic_id:
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{question.topic_id}")
                response.raise_for_status()
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail=f"Topic with ID {question.topic_id} not found.")
            except httpx.RequestError:
                raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    response = supabase.table('questions').update(question.dict(exclude_unset=True)).eq('question_id', question_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Question not found")

    db_question = response.data[0]
    # Update cache
    redis_client.set(f"question_{question_id}", json.dumps(db_question), ex=3600)
    return db_question

@app.delete("/questions/{question_id}")
def delete_question(question_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('questions').delete().eq('question_id', question_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Question not found")
    # Delete from cache
    redis_client.delete(f"question_{question_id}")
    return {"message": "Question deleted successfully"}