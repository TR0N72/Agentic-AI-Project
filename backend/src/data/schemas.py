from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class QuestionBase(BaseModel):
    text: str
    answer: str

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int

    class Config:
        orm_mode = True

class UserActivityBase(BaseModel):
    user_id: int
    activity: str

class UserActivityCreate(UserActivityBase):
    pass

class UserActivity(UserActivityBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True