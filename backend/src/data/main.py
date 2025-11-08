
import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database
import consul
from prometheus_fastapi_instrumentator import Instrumentator

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Data Service",
    description="Manages data for questions, users, and activities.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "data_service")
    c.agent.service.register(
        name="data-service",
        service_id="data-service-1",
        address=container_name,
        port=8003,
        check=consul.Check.http(f"http://{container_name}:8003/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/questions/", response_model=schemas.Question)
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    db_question = models.Question(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@app.get("/questions/", response_model=list[schemas.Question])
def read_questions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    questions = db.query(models.Question).offset(skip).limit(limit).all()
    return questions

@app.get("/questions/{question_id}", response_model=schemas.Question)
def read_question(question_id: int, db: Session = Depends(get_db)):
    db_question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question

@app.post("/activities/", response_model=schemas.UserActivity)
def log_activity(activity: schemas.UserActivityCreate, db: Session = Depends(get_db)):
    db_activity = models.UserActivity(**activity.dict())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity
