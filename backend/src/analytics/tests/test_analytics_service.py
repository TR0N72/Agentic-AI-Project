
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

def test_log_activity():
    response = client.post("/activities/", params={"user_id": 1, "activity": "test activity"})
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["activity"] == "test activity"
    assert "id" in data

def test_get_analytics():
    # Log some activities first
    client.post("/activities/", params={"user_id": 1, "activity": "activity1"})
    client.post("/activities/", params={"user_id": 1, "activity": "activity1"})
    client.post("/activities/", params={"user_id": 2, "activity": "activity2"})

    # Now get analytics
    response = client.get("/analytics/")
    assert response.status_code == 200
    data = response.json()
    assert data["activity1"] == 2
    assert data["activity2"] == 1
