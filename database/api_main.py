import uuid
from typing import List
from fastapi import FastAPI, HTTPException
from api_schemas import QuestionCreate, QuestionResponse, SearchQuery, QuestionUpdate
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

# Adjusted import to bring in the supabase_client
from config import supabase_client, QDRANT_CONFIG, OPENAI_API_KEY
from qdrant.qdrant_client import QdrantClient as QdrantClientClass
from qdrant_client.http import models
from openai import OpenAI

# Initialize clients
# postgres_client is removed
qdrant_client = QdrantClientClass()
openai_client = OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI(
    title="pinterin API",
    description="API for pinterin project, based on the blueprint.",
    version="0.1.0",
)

Instrumentator().instrument(app).expose(app)

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "database_api_service")
    c.agent.service.register(
        name="database-api-service",
        service_id="database-api-service-1",
        address=container_name,
        port=8012,
        check=consul.Check.http(f"http://{container_name}:8012/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    # postgres_client.connect() is removed
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

# shutdown_event is removed

@app.get("/")
def read_root():
    return {"message": "Welcome to the pinterin API!"}

def get_embedding(text: str):
    response = openai_client.embeddings.create(
        input=text,
        model="text-embedding-ada-002" # or another model if you prefer
    )
    return response.data[0].embedding

@app.post("/questions/", response_model=QuestionResponse)
def create_question(question: QuestionCreate):
    try:
        # Insert into Supabase
        response = supabase_client.table("questions").insert({
            "question_text": question.question_text
        }).select("id, question_text").execute()

        if not response.data:
            raise HTTPException(status_code=500, detail="Failed to create question in Supabase.")

        new_question = response.data[0]
        new_question_id = new_question['id']
        new_question_text = new_question['question_text']

        # Generate embedding
        embedding = get_embedding(new_question_text)

        # Insert into Qdrant
        qdrant_client.insert_data(
            collection_name="pinterin_collection",
            points=[
                {
                    "id": str(uuid.uuid4()),
                    "vector": embedding,
                    "payload": {"id": new_question_id, "text": new_question_text}
                }
            ]
        )

        return {"id": new_question_id, "question_text": new_question_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/questions/search/")
def search_questions(search: SearchQuery):
    try:
        query_embedding = get_embedding(search.query)
        search_results = qdrant_client.search(
            collection_name="pinterin_collection",
            query_vector=query_embedding,
            limit=5
        )
        return search_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/questions/", response_model=List[QuestionResponse])
def read_questions(skip: int = 0, limit: int = 100):
    try:
        # Supabase uses range which is inclusive, so limit needs adjustment
        response = supabase_client.table("questions").select("id, question_text").range(skip, skip + limit - 1).execute()
        return response.data if response.data else []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/questions/{question_id}", response_model=QuestionResponse)
def read_question(question_id: int):
    try:
        response = supabase_client.table("questions").select("id, question_text").eq("id", question_id).single().execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Question not found.")
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/questions/{question_id}", response_model=QuestionResponse)
def update_question(question_id: int, question: QuestionUpdate):
    try:
        response = supabase_client.table("questions").update({
            "question_text": question.question_text
        }).eq("id", question_id).select("id, question_text").execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Question not found.")

        updated_question = response.data[0]
        updated_question_id = updated_question['id']
        updated_question_text = updated_question['question_text']

        # Re-generation of embedding is removed. A replacement is needed.

        return {"id": updated_question_id, "question_text": updated_question_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/questions/{question_id}", response_model=dict)
def delete_question(question_id: int):
    try:
        # First, verify the question exists and delete it from Supabase
        response = supabase_client.table("questions").delete().eq("id", question_id).select("id").execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Question not found.")

        # Then, delete from Qdrant
        qdrant_client.client.delete(
            collection_name="pinterin_collection",
            points_selector=models.Filter(
                must=[
                    models.FieldCondition(
                        key="id",
                        match=models.MatchValue(value=question_id),
                    )
                ]
            ),
        )
        return {"message": f"Question with id {question_id} deleted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
