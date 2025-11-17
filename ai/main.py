from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# Auth & RBAC
from shared.auth.api_key_middleware import APIKeyMiddleware
from shared.auth.rbac_middleware import RBACMiddleware
from middleware.rate_limit import RateLimitMiddleware
from observability.otel_setup import configure_json_logging, init_tracing
from metrics.prometheus import setup_metrics
from core.config import setup_observability
from api.endpoints import (
    health, llm, embeddings, vector_search, agents, tools, rbac, analytics, external, orchestration
)
from core.deps import (
    user_client, question_client, api_gateway_client,
    user_grpc_client, question_grpc_client, api_gateway_grpc_client,
    orchestrator_service
)

# Initialize FastAPI app
app = FastAPI(
    title="NLP/AI Microservice",
    description="A comprehensive FastAPI microservice providing Natural Language Processing and Artificial Intelligence capabilities for educational applications.",
    version="1.0.0",
)

# Observability
setup_observability(app)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics endpoint for Prometheus
setup_metrics(app)

# Add RBAC middleware for automatic route protection
app.add_middleware(RBACMiddleware)

# Add API key middleware for external routes
app.add_middleware(APIKeyMiddleware)

# Rate limiting middleware (after API key, before handlers)
app.add_middleware(RateLimitMiddleware)

# Include routers
app.include_router(health.router)
app.include_router(llm.router)
app.include_router(embeddings.router)
app.include_router(vector_search.router)
app.include_router(agents.router)
app.include_router(tools.router)
app.include_router(rbac.router)
app.include_router(analytics.router)
app.include_router(external.router)
app.include_router(orchestration.router)

# Lifecycle events to clean up network clients
@app.on_event("shutdown")
async def _shutdown_clients():
    try:
        await user_client.aclose()
    except Exception:
        pass
    try:
        await question_client.aclose()
    except Exception:
        pass
    try:
        await api_gateway_client.aclose()
    except Exception:
        pass
    try:
        await user_grpc_client.aclose()
    except Exception:
        pass
    try:
        await question_grpc_client.aclose()
    except Exception:
        pass
    try:
        await api_gateway_grpc_client.aclose()
    except Exception:
        pass
    try:
        await orchestrator_service.cleanup()
    except Exception:
        pass

if __name__ == "__main__":
    cert_file = os.getenv("TLS_CERT_FILE")
    key_file = os.getenv("TLS_KEY_FILE")
    if cert_file and key_file:
        uvicorn.run(app, host="0.0.0.0", port=8000, ssl_certfile=cert_file, ssl_keyfile=key_file)
    else:
        uvicorn.run(app, host="0.0.0.0", port=8000)