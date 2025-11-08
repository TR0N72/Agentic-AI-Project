
import pytest
from fastapi.testclient import TestClient
from question.main import app
from unittest.mock import AsyncMock, patch
import json

client = TestClient(app)

@pytest.fixture
def mock_supabase_client():
    with patch('question.dependencies.supabase') as mock_supabase:
        yield mock_supabase

@pytest.fixture
def mock_supabase_postgrest_client():
    with patch('question.dependencies.create_client') as mock_create_client:
        mock_supabase = AsyncMock()
        mock_create_client.return_value = mock_supabase
        yield mock_supabase

@pytest.fixture
def mock_redis_client():
    with patch('question.main.redis_client') as mock_redis:
        yield mock_redis

@pytest.fixture
def mock_rabbitmq_channel():
    with patch('pika.BlockingConnection') as mock_pika_conn:
        mock_channel = mock_pika_conn.return_value.channel.return_value
        yield mock_channel

@pytest.mark.asyncio
async def test_create_question(mock_supabase_client, mock_rabbitmq_channel):
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"text": "Test question?", "answer": "Test answer", "id": 1}]
    
    response = client.post("/questions/", params={"text": "Test question?", "answer": "Test answer"})
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Test question?"
    assert data["answer"] == "Test answer"
    assert "id" in data
    mock_rabbitmq_channel.queue_declare.assert_called_once_with(queue='question_created')
    mock_rabbitmq_channel.basic_publish.assert_called_once()

@pytest.mark.asyncio
async def test_read_question_from_cache(mock_supabase_client, mock_redis_client):
    mock_redis_client.get.return_value = json.dumps({"text": "Cached question?", "answer": "Cached answer", "id": 1})
    
    response = client.get(f"/questions/1")
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Cached question?"
    mock_redis_client.get.assert_called_once_with("question_1")
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.assert_not_called()

@pytest.mark.asyncio
async def test_read_question_from_db(mock_supabase_client, mock_redis_client):
    mock_redis_client.get.return_value = None
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {
        "text": "DB question?", "answer": "DB answer", "id": 2}
    
    response = client.get(f"/questions/2")
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "DB question?"
    mock_redis_client.get.assert_called_once_with("question_2")
    mock_supabase_client.table.return_value.select.assert_called_once()
    mock_redis_client.set.assert_called_once_with("question_2", json.dumps(data))

@pytest.mark.asyncio
async def test_read_nonexistent_question(mock_supabase_client, mock_redis_client):
    mock_redis_client.get.return_value = None
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = None
    
    response = client.get("/questions/9999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Question not found"}

@pytest.mark.asyncio
async def test_update_question(mock_supabase_client, mock_redis_client):
    mock_supabase_client.table.return_value.update.return_value.eq.return_value.execute.return_value.data = [
        {"text": "Updated text", "answer": "Updated answer", "id": 1}]
    
    response = client.put(f"/questions/1", params={"text": "Updated text", "answer": "Updated answer"})
    assert response.status_code == 200
    data = response.json()
    assert data["text"] == "Updated text"
    mock_redis_client.set.assert_called_once_with("question_1", json.dumps(data))

@pytest.mark.asyncio
async def test_delete_question(mock_supabase_client, mock_redis_client):
    mock_supabase_client.table.return_value.delete.return_value.eq.return_value.execute.return_value.data = [
        {"id": 1}]
    
    response = client.delete(f"/questions/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Question deleted successfully"}
    mock_redis_client.delete.assert_called_once_with("question_1")
