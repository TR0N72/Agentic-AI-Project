from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv

load_dotenv()

qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL", "http://localhost:6333"),
)


