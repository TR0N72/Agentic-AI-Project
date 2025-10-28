from sqlalchemy import Column, Integer, String, DateTime
from .database import Base
from datetime import datetime

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    answer = Column(String)

class UserActivity(Base):
    __tablename__ = "user_activities"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    activity = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)