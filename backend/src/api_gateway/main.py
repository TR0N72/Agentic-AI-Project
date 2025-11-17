from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import os

app = FastAPI(
    title="API Gateway",
    description="The main entry point for the API.",
    version="1.0.0",
)

origins = [
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)


def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "api_gateway_service")
    c.agent.service.register(
        name="api-gateway",
        service_id="api-gateway-1",
        address=container_name,
        port=8000,
        check=consul.Check.http(f"http://{container_name}:8000/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def read_root():
    return {"service": "api_gateway"}