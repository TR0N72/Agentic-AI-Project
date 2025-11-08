from fastapi import FastAPI
from InstructorEmbedding import INSTRUCTOR
from qdrant_client import QdrantClient, models
from pydantic import BaseModel
from typing import List
import consul
import os
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="Embedding Service",
    description="Generates text embeddings.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

model = INSTRUCTOR('hkunlp/instructor-xl')
QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
qdrant_client = QdrantClient(host=QDRANT_HOST, port=6333)

class Text(BaseModel):
    id: int
    instruction: str
    text: str

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "embedding_service")
    c.agent.service.register(
        name="embedding-service",
        service_id="embedding-service-1",
        address=container_name,
        port=8006,
        check=consul.Check.http(f"http://{container_name}:8006/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/embeddings/")
def generate_and_store_embedding(text: Text):
    embedding = model.encode([[text.instruction, text.text]]).tolist()
    qdrant_client.upsert(
        collection_name="my_collection",
        points=[
            {
                "id": text.id,
                "vector": embedding,
            }
        ],
    )
    return {"status": "success"}
