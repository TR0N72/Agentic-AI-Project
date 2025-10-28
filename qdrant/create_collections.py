from qdrant_client.http.models import VectorParams, Distance
from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os

load_dotenv()

client = QdrantClient(url=os.getenv("QDRANT_URL", "http://localhost:6333"))

collections = ["materials_embeddings", "questions_embeddings", "generated_embeddings"]

for c in collections:
    client.recreate_collection(
        collection_name=c,
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    print(f"✅ Collection created: {c}")
