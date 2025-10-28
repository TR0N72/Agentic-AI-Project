
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

def test_create_assessment():
    response = client.post("/assessments/", params={"user_id": 1})
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["score"] == 0
    assert "id" in data

def test_add_question_to_assessment():
    # Create an assessment first
    response = client.post("/assessments/", params={"user_id": 1})
    assessment_id = response.json()["id"]

    # Add a question
    response = client.post(f"/assessments/{assessment_id}/questions", params={"question_id": 1, "user_answer": "some answer"})
    assert response.status_code == 200
    assert response.json() == {"message": "Question added to assessment"}

def test_read_assessment():
    # Create an assessment first
    response = client.post("/assessments/", params={"user_id": 1})
    assessment_id = response.json()["id"]

    # Now read it
    response = client.get(f"/assessments/{assessment_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
