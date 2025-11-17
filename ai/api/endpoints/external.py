from fastapi import APIRouter, Depends, HTTPException
from api.models import TextRequest, EmbeddingRequest
from core.deps import llm_service, embedding_service
from shared.auth.api_key_middleware import require_api_key_roles, require_api_key_permissions

router = APIRouter()

@router.get("/external/status")
async def external_status():
    """External API status endpoint (requires API key)."""
    return {"status": "ok", "service": "nlp-ai-microservice"}


@router.get("/external/health")
async def external_health():
    """External API health check (requires API key)."""
    return {
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z",
        "version": "1.0.0"
    }


@router.post("/external/llm/generate")
async def external_llm_generate(
    request: TextRequest,
    api_key_user = Depends(require_api_key_roles("admin", "teacher"))
):
    """External LLM generation endpoint (requires API key with admin/teacher role)."""
    try:
        response = await llm_service.generate_text(request.text, request.model)
        return {"response": response, "generated_by": "external_api"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/external/embedding/generate")
async def external_embedding_generate(
    request: EmbeddingRequest,
    api_key_user = Depends(require_api_key_permissions("external_api_access"))
):
    """External embedding generation endpoint (requires API key with external_api_access permission)."""
    try:
        embedding = await embedding_service.generate_embedding(request.text, request.model)
        return {"embedding": embedding.tolist(), "generated_by": "external_api"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
