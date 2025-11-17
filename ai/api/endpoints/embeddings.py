from fastapi import APIRouter, HTTPException
from typing import List
from api.models import EmbeddingRequest
from core.deps import embedding_service

router = APIRouter()

@router.post("/embedding/generate", tags=["embeddings"])
async def generate_embedding(request: EmbeddingRequest):
    """
    Generate text embeddings for vector operations.
    
    Converts text into high-dimensional vectors for similarity search and semantic analysis.
    Supports multiple embedding models including Sentence Transformers and OpenAI Ada.
    
    - **text**: The text to convert to embeddings
    - **model**: The embedding model to use (default: all-MiniLM-L6-v2)
    
    Returns the embedding vector as a list of floating-point numbers.
    """
    try:
        embedding = await embedding_service.generate_embedding(request.text, request.model)
        return {"embedding": embedding.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/embedding/batch", tags=["embeddings"])
async def generate_batch_embeddings(request: List[EmbeddingRequest]):
    """
    Generate embeddings for multiple texts in batch.
    
    Efficiently processes multiple texts at once for better performance.
    Useful for indexing large datasets of educational content.
    
    - **request**: List of EmbeddingRequest objects containing text and model
    
    Returns a list of embedding vectors for all input texts.
    """
    try:
        texts = [req.text for req in request]
        model = request[0].model if request else "all-MiniLM-L6-v2"
        embeddings = await embedding_service.generate_batch_embeddings(texts, model)
        return {"embeddings": [emb.tolist() for emb in embeddings]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
