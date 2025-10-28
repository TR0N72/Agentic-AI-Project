from fastapi import FastAPI
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="CMS Admin Service",
    description="Provides admin functionality for the CMS.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "cms_admin_service")
    c.agent.service.register(
        name="cms-admin-service",
        service_id="cms-admin-service-1",
        address=container_name,
        port=8010,
        check=consul.Check.http(f"http://{container_name}:8010/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def read_root():
    return {"service": "cms_admin"}
