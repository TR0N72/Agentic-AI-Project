from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
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

# Models
class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    score = Column(Integer)

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey('assessments.id'))
    question_id = Column(Integer)
    user_answer = Column(String)
    is_correct = Column(Integer)

    assessment = relationship("Assessment", back_populates="questions")

Assessment.questions = relationship("AssessmentQuestion", back_populates="assessment")

Base.metadata.create_all(bind=engine)

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


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/assessments/")
def create_assessment(user_id: int, db: Session = Depends(get_db)):
    db_assessment = Assessment(user_id=user_id, score=0)
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

@app.post("/assessments/{assessment_id}/questions")
def add_question_to_assessment(assessment_id: int, question_id: int, user_answer: str, db: Session = Depends(get_db)):
    db_assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not db_assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    # In a real application, you would have logic to check the answer
    # and determine if it is correct. For this example, we'll just
    # assume the answer is correct if it's not empty.
    is_correct = 1 if user_answer else 0

    db_assessment_question = AssessmentQuestion(
        assessment_id=assessment_id,
        question_id=question_id,
        user_answer=user_answer,
        is_correct=is_correct
    )
    db.add(db_assessment_question)
    db.commit()

    # Update the assessment score
    if is_correct:
        db_assessment.score += 1
        db.commit()

    return {"message": "Question added to assessment"}

@app.get("/assessments/{assessment_id}")
def read_assessment(assessment_id: int, db: Session = Depends(get_db)):
    db_assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if db_assessment is None:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return db_assessment