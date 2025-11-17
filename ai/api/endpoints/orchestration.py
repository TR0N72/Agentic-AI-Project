from fastapi import APIRouter, HTTPException
from typing import List
from api.models import IndexUserQuestionsRequest, OrchestrateUserAnswerRequest
from orchestrator_service import orchestrator_service, OrchestrationRequest, OrchestrationResponse
from core.deps import (
    user_client, question_client, api_gateway_client,
    user_grpc_client, question_grpc_client, api_gateway_grpc_client,
    bm25_service, qdrant_service, llm_service
)
from services.hybrid_retriever_service import HybridRetriever

router = APIRouter()

# Sample external service integrations
@router.get("/users/{user_id}")
async def get_user_via_user_service(user_id: str):
    try:
        data = await user_client.get_user(user_id)
        return {"user": data}
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"User service error: {str(e)}")

@router.post("/users/{user_id}/index-questions")
async def index_user_questions(user_id: str, body: IndexUserQuestionsRequest):
    try:
        # Fetch latest questions for the user from Question Service
        q = await question_client.get_user_questions(user_id, limit=body.limit or 10)
        questions = q.get("questions") or q.get("data") or q
        if not isinstance(questions, list):
            questions = []

        # Ingest into both BM25 and Vector DB with metadata
        texts = []
        metas = []
        for item in questions:
            text = item.get("text") or item.get("title") or item.get("body") or ""
            if not text:
                continue
            texts.append(text)
            metas.append({
                "type": "question",
                "user_id": user_id,
                "source": "question_service",
                "question_id": item.get("id"),
            })

        ids_es = bm25_service.add_documents_batch(texts, metas)
        ids_qdrant = await qdrant_service.add_documents_batch(texts, metas)

        result = {"count": len(texts), "elastic_ids": ids_es, "qdrant_ids": ids_qdrant}

        # Optionally fetch user profile
        user_info = None
        if body.include_user:
            try:
                user_info = await user_client.get_user(user_id)
            except Exception:
                user_info = None

        return {"ingested": result, "user": user_info}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/gateway/proxy")
async def gateway_proxy(path: str, method: str = "GET"):
    try:
        data = await api_gateway_client.proxy(method=method, path=path)
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Gateway error: {str(e)}")

@router.post("/orchestrate/answer")
async def orchestrate_user_answer(body: OrchestrateUserAnswerRequest):
    try:
        # 1) Fetch user context
        user = None
        try:
            user = await user_client.get_user(body.user_id)
        except Exception:
            user = None

        # 2) Use hybrid retrieval over user's questions/materials
        retriever = HybridRetriever(bm25_service=bm25_service, vector_service=qdrant_service, alpha=0.6)
        filt = {"user_id": body.user_id}
        context_results = await retriever.search(body.question, top_k=body.limit or 5, filter_metadata=filt)

        # 3) Build prompt and call LLM
        context_snippets = "\n\n".join([r.get("document", "") for r in context_results])
        prompt = f"Answer the user's question using the provided context.\n\nUser: {user}\n\nContext:\n{context_snippets}\n\nQuestion: {body.question}\nAnswer:"
        answer = await llm_service.generate_text(prompt)

        return {
            "user": user,
            "retrieved": context_results,
            "answer": answer,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================================================================
# Enhanced Orchestrator Endpoints
# =============================================================================

@router.post("/orchestrate/query", response_model=OrchestrationResponse)
async def orchestrate_comprehensive_query(request: OrchestrationRequest):
    """Comprehensive orchestration endpoint that coordinates all services"""
    try:
        response = await orchestrator_service.orchestrate_user_query(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/orchestrate/index-questions/{user_id}")
async def index_user_questions_orchestrated(
    user_id: str, 
    limit: int = 50, 
    use_grpc: bool = False
):
    """Index user's questions into vector database using orchestrator"""
    try:
        result = await orchestrator_service.index_user_questions(user_id, limit, use_grpc)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/orchestrate/health")
async def orchestrator_health_check(use_grpc: bool = False):
    """Get health status of all orchestrated services"""
    try:
        health_status = await orchestrator_service.get_service_health(use_grpc)
        return health_status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/orchestrate/services/discover")
async def discover_orchestrated_services():
    """Discover all services using service discovery"""
    try:
        services = await orchestrator_service.discover_services()
        return services
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================================================================
# Enhanced Service Integration Endpoints
# =============================================================================

@router.get("/services/user/{user_id}/profile")
async def get_user_profile_comprehensive(user_id: str, use_grpc: bool = False):
    """Get comprehensive user profile using both API and gRPC"""
    try:
        if use_grpc:
            await user_grpc_client.connect()
            user_data = await user_grpc_client.get_user(user_id)
            user_profile = await user_grpc_client.get_user_profile(user_id)
        else:
            user_data = await user_client.get_user(user_id)
            user_profile = await user_client.get_user_profile(user_id)
        
        return {
            "user_data": user_data,
            "user_profile": user_profile,
            "retrieved_via": "grpc" if use_grpc else "rest_api"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/services/questions/user/{user_id}")
async def get_user_questions_comprehensive(
    user_id: str, 
    page: int = 1, 
    page_size: int = 10,
    use_grpc: bool = False
):
    """Get user questions using both API and gRPC"""
    try:
        if use_grpc:
            await question_grpc_client.connect()
            questions_data = await question_grpc_client.get_user_questions(
                user_id, page, page_size
            )
        else:
            questions_data = await question_client.get_user_questions(
                user_id, page, page_size
            )
        
        return {
            "questions": questions_data,
            "retrieved_via": "grpc" if use_grpc else "rest_api"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/services/gateway/proxy")
async def proxy_through_gateway(
    method: str = "GET",
    path: str = "/",
    target_service: str = "",
    use_grpc: bool = False,
    **kwargs
):
    """Proxy request through API Gateway using both protocols"""
    try:
        if use_grpc:
            await api_gateway_grpc_client.connect()
            result = await api_gateway_grpc_client.proxy_request(
                method=method,
                path=path,
                target_service=target_service,
                **kwargs
            )
        else:
            result = await api_gateway_client.proxy(method, path, **kwargs)
        
        return {
            "result": result,
            "proxied_via": "grpc" if use_grpc else "rest_api"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/services/gateway/validate")
async def validate_request_through_gateway(
    method: str = "GET",
    path: str = "/",
    user_id: str = "",
    user_roles: List[str] = [],
    user_permissions: List[str] = [],
    use_grpc: bool = False
):
    """Validate request authorization through API Gateway"""
    try:
        if use_grpc:
            await api_gateway_grpc_client.connect()
            result = await api_gateway_grpc_client.validate_request(
                method=method,
                path=path,
                user_id=user_id,
                user_roles=user_roles,
                user_permissions=user_permissions
            )
        else:
            result = await api_gateway_client.validate_request(
                method=method,
                path=path,
                user_id=user_id,
                user_roles=user_roles,
                user_permissions=user_permissions
            )
        
        return {
            "validation_result": result,
            "validated_via": "grpc" if use_grpc else "rest_api"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/services/gateway/health/{service_name}")
async def get_service_health_through_gateway(service_name: str, use_grpc: bool = False):
    """Get service health through API Gateway"""
    try:
        if use_grpc:
            await api_gateway_grpc_client.connect()
            result = await api_gateway_grpc_client.get_service_health(service_name)
        else:
            result = await api_gateway_client.get_service_health(service_name)
        
        return {
            "health_status": result,
            "checked_via": "grpc" if use_grpc else "rest_api"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/services/gateway/rate-limit/check")
async def check_rate_limit_through_gateway(
    user_id: str = "",
    api_key: str = "",
    endpoint: str = "",
    service_name: str = "",
    use_grpc: bool = False
):
    """Check rate limit through API Gateway"""
    try:
        if use_grpc:
            await api_gateway_grpc_client.connect()
            result = await api_gateway_grpc_client.rate_limit_check(
                user_id=user_id,
                api_key=api_key,
                endpoint=endpoint,
                service_name=service_name
            )
        else:
            result = await api_gateway_client.rate_limit_check(
                user_id=user_id,
                api_key=api_key,
                endpoint=endpoint,
                service_name=service_name
            )
        
        return {
            "rate_limit_status": result,
            "checked_via": "grpc" if use_grpc else "rest_api"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
