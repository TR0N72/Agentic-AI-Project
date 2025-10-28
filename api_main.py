import uuid
from typing import List
from fastapi import FastAPI, HTTPException
from api_schemas import QuestionCreate, QuestionResponse, SearchQuery, QuestionUpdate
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

from postgres.postgres_client import PostgresClient
from qdrant.qdrant_client import QdrantClient as QdrantClientClass
from qdrant_client.http import models
from openai import OpenAI
import config

# Initialize clients
postgres_client = PostgresClient()
qdrant_client = QdrantClientClass()
openai_client = OpenAI(api_key=config.OPENAI_API_KEY)

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
    postgres_client.connect()
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.on_event("shutdown")
def shutdown_event():
    postgres_client.disconnect()

@app.get("/")
def read_root():
    """
    Root endpoint to check if the API is running.
    """
    return {"message": "Welcome to the pinterin API!"}

@app.post("/questions/", response_model=QuestionResponse)
def create_question(question: QuestionCreate):
    """
    Create a new question.
    This will insert the question into PostgreSQL and then create an embedding
    and store it in Qdrant.
    """
    # Insert into PostgreSQL
    query = "INSERT INTO questions (question_text) VALUES (%s) RETURNING id, question_text;"
    try:
        result = postgres_client.execute_query(query, (question.question_text,), fetch_one=True)
        if not result:
            raise HTTPException(status_code=500, detail="Failed to create question in PostgreSQL.")
        
        new_question_id, new_question_text = result
        
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
        # Basic error handling
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/questions/search/")
def search_questions(search: SearchQuery):
    """
    Search for similar questions using vector search.
    """
    try:
        # Generate embedding for the search query
        query_embedding = get_embedding(search.query)

        # Search in Qdrant
        search_results = qdrant_client.search(
            collection_name="pinterin_collection",
            query_vector=query_embedding,
            limit=5  # Return top 5 results
        )

        return search_results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/questions/", response_model=List[QuestionResponse])
def read_questions(skip: int = 0, limit: int = 100):
    """
    Retrieve all questions from PostgreSQL.
    """
    query = "SELECT id, question_text FROM questions ORDER BY id LIMIT %s OFFSET %s;"
    try:
        results = postgres_client.execute_query(query, (limit, skip), fetch_all=True)
        if not results:
            return []
        questions = [{"id": row[0], "question_text": row[1]} for row in results]
        return questions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/questions/{question_id}", response_model=QuestionResponse)
def read_question(question_id: int):
    """
    Retrieve a single question by its ID from PostgreSQL.
    """
    query = "SELECT id, question_text FROM questions WHERE id = %s;"
    try:
        result = postgres_client.execute_query(query, (question_id,), fetch_one=True)
        if not result:
            raise HTTPException(status_code=404, detail="Question not found.")
        return {"id": result[0], "question_text": result[1]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/questions/{question_id}", response_model=QuestionResponse)
def update_question(question_id: int, question: QuestionUpdate):
    """
    Update a question in PostgreSQL and re-synchronize it with Qdrant.
    """
    # Update in PostgreSQL
    query = "UPDATE questions SET question_text = %s WHERE id = %s RETURNING id, question_text;"
    try:
        result = postgres_client.execute_query(query, (question.question_text, question_id), fetch_one=True)
        if not result:
            raise HTTPException(status_code=404, detail="Question not found.")

        updated_question_id, updated_question_text = result

        # Re-generate embedding and update in Qdrant
        new_embedding = get_embedding(updated_question_text)
        
        qdrant_client.client.set_payload(
            collection_name="pinterin_collection",
            payload={"text": updated_question_text},
            points=models.Filter(
                must=[
                    models.FieldCondition(
                        key="id",
                        match=models.MatchValue(value=updated_question_id),
                    )
                ]
            ),
        )

        return {"id": updated_question_id, "question_text": updated_question_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/questions/{question_id}", response_model=dict)
def delete_question(question_id: int):
    """
    Delete a question from PostgreSQL and Qdrant.
    """
    # Delete from PostgreSQL
    query = "DELETE FROM questions WHERE id = %s RETURNING id;"
    try:
        result = postgres_client.execute_query(query, (question_id,), fetch_one=True)
        if not result:
            raise HTTPException(status_code=404, detail="Question not found.")

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
