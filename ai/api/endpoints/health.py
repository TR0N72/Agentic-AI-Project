from fastapi import APIRouter

router = APIRouter()

@router.get("/health", tags=["health"])
async def health_check():
    """
    Health check endpoint to verify service status.
    
    Returns the current health status of the NLP/AI microservice.
    """
    return {"status": "healthy", "service": "nlp-ai-microservice"}
