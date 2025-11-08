
import pytest
from fastapi.testclient import TestClient
from assessment.main import app
from unittest.mock import AsyncMock, patch

client = TestClient(app)

@pytest.fixture
def mock_supabase_client():
    with patch('assessment.dependencies.supabase') as mock_supabase:
        yield mock_supabase

@pytest.fixture
def mock_supabase_postgrest_client():
    with patch('assessment.dependencies.create_client') as mock_create_client:
        mock_supabase = AsyncMock()
        mock_create_client.return_value = mock_supabase
        yield mock_supabase

@pytest.mark.asyncio
async def test_create_assessment(mock_supabase_client):
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"user_id": 1, "score": 0, "id": 1}]
    
    response = client.post("/assessments/", params={"user_id": 1})
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["score"] == 0
    assert "id" in data

@pytest.mark.asyncio
async def test_add_question_to_assessment(mock_supabase_client):
    mock_supabase_client.rpc.return_value.execute.return_value.data = None
    
    response = client.post(f"/assessments/1/questions", params={"question_id": 1, "user_answer": "some answer"})
    assert response.status_code == 200
    assert response.json() == {"message": "Question added to assessment"}

@pytest.mark.asyncio
async def test_read_assessment(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {
        "user_id": 1, "score": 0, "id": 1, "assessment_questions": []}
    
    response = client.get(f"/assessments/1")
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
