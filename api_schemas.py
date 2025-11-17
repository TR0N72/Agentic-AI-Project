from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# --- User Schemas ---
class UserBase(BaseModel):
    username: str = Field(..., max_length=50)
    email: str = Field(..., max_length=100)

class UserCreate(UserBase):
    user_id: uuid.UUID

class UserUpdate(UserBase):
    pass

class UserResponse(UserBase):
    user_id: uuid.UUID
    created_at: datetime
    user_progress: List['UserProgressResponse'] = []
    user_answers: List['UserAnswerResponse'] = []
    evaluations: List['EvaluationResponse'] = []

    class Config:
        orm_mode = True

class UserSignup(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: dict

# --- Topic Schemas ---
class TopicBase(BaseModel):
    topic_name: str = Field(..., max_length=100)
    category: Optional[str] = Field(None, max_length=50)

class TopicCreate(TopicBase):
    pass

class TopicUpdate(TopicBase):
    pass

class TopicResponse(TopicBase):
    topic_id: int
    materials: List['MaterialResponse'] = []
    questions: List['QuestionResponse'] = []
    evaluations: List['EvaluationResponse'] = []
    generated_questions: List['GeneratedQuestionResponse'] = []

    class Config:
        orm_mode = True

# --- Material Schemas ---
class MaterialBase(BaseModel):
    title: str
    content: str
    difficulty: Optional[str] = Field(None, max_length=20)

class MaterialCreate(MaterialBase):
    topic_id: int

class MaterialUpdate(MaterialBase):
    topic_id: Optional[int] = None

class MaterialResponse(MaterialBase):
    material_id: int
    topic_id: int
    embedding_id: Optional[uuid.UUID] = None
    created_at: datetime

    class Config:
        orm_mode = True

# --- Question Schemas ---
class QuestionBase(BaseModel):
    question_text: str
    correct_answer: str
    explanation: Optional[str] = None
    difficulty: Optional[str] = Field(None, max_length=20)

class QuestionCreate(QuestionBase):
    topic_id: int

class QuestionUpdate(QuestionBase):
    topic_id: Optional[int] = None

class QuestionResponse(QuestionBase):
    question_id: int
    topic_id: int
    embedding_id: Optional[uuid.UUID] = None
    created_at: datetime
    user_answers: List['UserAnswerResponse'] = []

    class Config:
        orm_mode = True

# --- GeneratedQuestion Schemas ---
class GeneratedQuestionBase(BaseModel):
    question_text: str
    correct_answer: str
    ai_explanation: Optional[str] = None
    source_model: Optional[str] = None

class GeneratedQuestionCreate(GeneratedQuestionBase):
    topic_id: int

class GeneratedQuestionUpdate(GeneratedQuestionBase):
    topic_id: Optional[int] = None

class GeneratedQuestionResponse(GeneratedQuestionBase):
    gen_id: int
    topic_id: int
    embedding_id: Optional[uuid.UUID] = None
    generated_at: datetime

    class Config:
        orm_mode = True

# --- UserProgress Schemas ---
class UserProgressBase(BaseModel):
    completion_rate: float

class UserProgressCreate(UserProgressBase):
    user_id: uuid.UUID
    topic_id: int

class UserProgressUpdate(UserProgressBase):
    pass

class UserProgressResponse(UserProgressBase):
    progress_id: int
    user_id: uuid.UUID
    topic_id: int
    last_accessed: datetime

    class Config:
        orm_mode = True

# --- UserAnswer Schemas ---
class UserAnswerBase(BaseModel):
    selected_answer: str
    is_correct: bool

class UserAnswerCreate(UserAnswerBase):
    user_id: uuid.UUID
    question_id: int

class UserAnswerUpdate(UserAnswerBase):
    pass

class UserAnswerResponse(UserAnswerBase):
    answer_id: int
    user_id: uuid.UUID
    question_id: int
    answered_at: datetime

    class Config:
        orm_mode = True

# --- Evaluation Schemas ---
class EvaluationBase(BaseModel):
    weakness_detected: str
    improvement_suggestion: str

class EvaluationCreate(EvaluationBase):
    user_id: uuid.UUID
    topic_id: int

class EvaluationUpdate(EvaluationBase):
    pass

class EvaluationResponse(EvaluationBase):
    evaluation_id: int
    user_id: uuid.UUID
    topic_id: int
    evaluated_at: datetime

    class Config:
        orm_mode = True

# --- Search Schemas ---
class SearchQuery(BaseModel):
    query: str

TopicResponse.update_forward_refs()