from fastapi import FastAPI, Depends, HTTPException
import pika
import json
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import redis
import json
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

# Database setup
DB_USER = os.getenv("DB_USER", "user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "dbname")
SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Redis setup
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# RabbitMQ setup
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")

# Models
class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    answer = Column(String)

Base.metadata.create_all(bind=engine)

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


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/questions/")
def create_question(text: str, answer: str, db: Session = Depends(get_db)):
    db_question = Question(text=text, answer=answer)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    # Publish message to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue='question_created')
    channel.basic_publish(exchange='',
                          routing_key='question_created',
                          body=json.dumps({"id": db_question.id, "text": db_question.text}))
    connection.close()

    return db_question

@app.get("/questions/{question_id}")
def read_question(question_id: int, db: Session = Depends(get_db)):
    # Check cache first
    cached_question = redis_client.get(f"question_{question_id}")
    if cached_question:
        return json.loads(cached_question)

    # If not in cache, get from DB
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")

    # Store in cache
    redis_client.set(f"question_{question_id}", json.dumps({"id": db_question.id, "text": db_question.text, "answer": db_question.answer}))
    return db_question

@app.put("/questions/{question_id}")
def update_question(question_id: int, text: str, answer: str, db: Session = Depends(get_db)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db_question.text = text
    db_question.answer = answer
    db.commit()
    db.refresh(db_question)
    # Update cache
    redis_client.set(f"question_{question_id}", json.dumps({"id": db_question.id, "text": db_question.text, "answer": db_question.answer}))
    return db_question

@app.delete("/questions/{question_id}")
def delete_question(question_id: int, db: Session = Depends(get_db)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(db_question)
    db.commit()
    # Delete from cache
    redis_client.delete(f"question_{question_id}")
    return {"message": "Question deleted successfully"}