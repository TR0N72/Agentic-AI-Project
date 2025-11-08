
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

def test_create_user():
    response = client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "password"})
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"
    assert "id" in data

def test_read_user():
    # Create a user first
    response = client.post("/users/", json={"username": "anotheruser", "email": "another@example.com", "password": "password"})
    user_id = response.json()["id"]

    # Now read it
    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "anotheruser"
    assert data["email"] == "another@example.com"

def test_read_nonexistent_user():
    response = client.get("/users/9999")
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}
