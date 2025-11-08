from fastapi import FastAPI
from qdrant_client import QdrantClient, models
from pydantic import BaseModel
from typing import List

app = FastAPI()

qdrant_client = QdrantClient(host="qdrant_db", port=6333)

# Create collection if it doesn't exist
try:
    qdrant_client.get_collection(collection_name="my_collection")
except Exception:
    qdrant_client.recreate_collection(
        collection_name="my_collection",
        vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE),
    )

class Embedding(BaseModel):
    id: int
    vector: List[float]

@app.post("/embeddings/")
def store_embedding(embedding: Embedding):
    qdrant_client.upsert(
        collection_name="my_collection",
        points=[
            {
                "id": embedding.id,
                "vector": embedding.vector,
            }
        ],
    )
    return {"status": "success"}

@app.get("/embeddings/{embedding_id}")
def retrieve_embedding(embedding_id: int):
    retrieved_point = qdrant_client.retrieve(
        collection_name="my_collection",
        ids=[embedding_id],
    )
    return {"embedding": retrieved_point}
