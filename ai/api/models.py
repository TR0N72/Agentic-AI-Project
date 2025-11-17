from pydantic import BaseModel
from typing import List, Optional

# Pydantic models
class TextRequest(BaseModel):
    text: str
    model: Optional[str] = "gpt-3.5-turbo"

class EmbeddingRequest(BaseModel):
    text: str
    model: Optional[str] = "all-MiniLM-L6-v2"

class VectorSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5

class HybridSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 10
    alpha: Optional[float] = 0.6
    filter: Optional[dict] = None

class IngestRequest(BaseModel):
    texts: List[str]
    metadata_list: Optional[List[dict]] = None

class AgentRequest(BaseModel):
    query: str
    tools: Optional[List[str]] = []

class IndexUserQuestionsRequest(BaseModel):
    limit: Optional[int] = 10
    include_user: Optional[bool] = True

class OrchestrateUserAnswerRequest(BaseModel):
    user_id: str
    question: str
    limit: Optional[int] = 5
