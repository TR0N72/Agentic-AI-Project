from fastapi import FastAPI, HTTPException, Depends
import pika
import json
import redis
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
from supabase import Client
from .dependencies import get_supabase

# Redis setup
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# RabbitMQ setup
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")

app = FastAPI(
    title="Question Service",
    description="Manages the question bank with CRUD operations and caching.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

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

@app.post("/questions/")
def create_question(text: str, answer: str, supabase: Client = Depends(get_supabase)):
    response = supabase.table("questions").insert({"text": text, "answer": answer}).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create question.")
    
    new_question = response.data[0]

    # Publish message to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue='question_created')
    channel.basic_publish(exchange='',
                          routing_key='question_created',
                          body=json.dumps({"id": new_question['id'], "text": new_question['text']}))
    connection.close()

    return new_question

@app.get("/questions/{question_id}")
def read_question(question_id: int, supabase: Client = Depends(get_supabase)):
    # Check cache first
    cached_question = redis_client.get(f"question_{question_id}")
    if cached_question:
        return json.loads(cached_question)

    # If not in cache, get from DB
    response = supabase.table("questions").select("*").eq("id", question_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Question not found")

    db_question = response.data
    # Store in cache
    redis_client.set(f"question_{question_id}", json.dumps(db_question))
    return db_question

@app.put("/questions/{question_id}")
def update_question(question_id: int, text: str, answer: str, supabase: Client = Depends(get_supabase)):
    response = supabase.table("questions").update({"text": text, "answer": answer}).eq("id", question_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Question not found")

    updated_question = response.data[0]
    # Update cache
    redis_client.set(f"question_{question_id}", json.dumps(updated_question))
    return updated_question

@app.delete("/questions/{question_id}")
def delete_question(question_id: int, supabase: Client = Depends(get_supabase)):
    response = supabase.table("questions").delete().eq("id", question_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Question not found")

    # Delete from cache
    redis_client.delete(f"question_{question_id}")
    return {"message": "Question deleted successfully"}
