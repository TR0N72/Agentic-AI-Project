
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, get_db, Base

# Use an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_question():
    response = client.post("/questions/", json={"text": "Test question?", "answer": "Test answer"})
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Test question?"
    assert data["answer"] == "Test answer"
    assert "id" in data

def test_read_question():
    # Create a question first
    response = client.post("/questions/", json={"text": "Another test?", "answer": "Another answer"})
    question_id = response.json()["id"]

    # Now read it
    response = client.get(f"/questions/{question_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Another test?"
    assert data["answer"] == "Another answer"

def test_read_nonexistent_question():
    response = client.get("/questions/9999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Question not found"}

def test_update_question():
    # Create a question first
    response = client.post("/questions/", json={"text": "Original text", "answer": "Original answer"})
    question_id = response.json()["id"]

    # Now update it
    response = client.put(f"/questions/{question_id}", json={"text": "Updated text", "answer": "Updated answer"})
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Updated text"
    assert data["answer"] == "Updated answer"

def test_delete_question():
    # Create a question first
    response = client.post("/questions/", json={"text": "To be deleted", "answer": "Delete me"})
    question_id = response.json()["id"]

    # Now delete it
    response = client.delete(f"/questions/{question_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Question deleted successfully"}

    # Verify it's gone
    response = client.get(f"/questions/{question_id}")
    assert response.status_code == 404
