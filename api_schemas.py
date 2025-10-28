from pydantic import BaseModel
from typing import List, Optional

class QuestionCreate(BaseModel):
    question_text: str

class QuestionUpdate(BaseModel):
    question_text: str

class QuestionResponse(BaseModel):
    id: int
    question_text: str

    class Config:
        orm_mode = True

class SearchQuery(BaseModel):
    query: str
