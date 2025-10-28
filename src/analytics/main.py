
from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
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
class UserActivity(Base):
    __tablename__ = "user_activities"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    activity = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

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


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/activities/")
def log_activity(user_id: int, activity: str, db: Session = Depends(get_db)):
    db_activity = UserActivity(user_id=user_id, activity=activity)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@app.get("/analytics/")
def get_analytics(db: Session = Depends(get_db)):
    analytics = db.query(UserActivity.activity, func.count(UserActivity.activity)).group_by(UserActivity.activity).all()
    return {activity: count for activity, count in analytics}
