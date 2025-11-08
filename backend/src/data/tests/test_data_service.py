
import pytest
from fastapi.testclient import TestClient
from data.main import app
from unittest.mock import AsyncMock, patch

client = TestClient(app)

@pytest.fixture
def mock_supabase_client():
    with patch('data.dependencies.supabase') as mock_supabase:
        yield mock_supabase

@pytest.fixture
def mock_supabase_postgrest_client():
    with patch('data.dependencies.create_client') as mock_create_client:
        mock_supabase = AsyncMock()
        mock_create_client.return_value = mock_supabase
        yield mock_supabase



def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_create_question(mock_supabase_client):
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"text": "Test question?", "answer": "Test answer", "id": 1}]
    
    response = client.post("/questions/", json={"text": "Test question?", "answer": "Test answer"})
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Test question?"
    assert data["answer"] == "Test answer"
    assert "id" in data

@pytest.mark.asyncio
async def test_read_questions(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.range.return_value.execute.return_value.data = [
        {"text": "Test question?", "answer": "Test answer", "id": 1}]
    
    response = client.get("/questions/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["text"] == "Test question?"

@pytest.mark.asyncio
async def test_read_question(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {
        "text": "Test question?", "answer": "Test answer", "id": 1}
    
    response = client.get("/questions/1")
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Test question?"

@pytest.mark.asyncio
async def test_log_activity(mock_supabase_client):
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"user_id": 1, "activity": "test activity", "timestamp": "2023-01-01T00:00:00", "id": 1}]
    
    response = client.post("/activities/", json={"user_id": 1, "activity": "test activity"})
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["activity"] == "test activity"
