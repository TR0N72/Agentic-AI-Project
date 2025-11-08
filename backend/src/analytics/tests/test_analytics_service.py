
import pytest
from fastapi.testclient import TestClient
from analytics.main import app
from unittest.mock import AsyncMock, patch

client = TestClient(app)

@pytest.fixture
def mock_supabase_client():
    with patch('analytics.dependencies.supabase') as mock_supabase:
        yield mock_supabase

@pytest.fixture
def mock_supabase_postgrest_client():
    with patch('analytics.dependencies.create_client') as mock_create_client:
        mock_supabase = AsyncMock()
        mock_create_client.return_value = mock_supabase
        yield mock_supabase

@pytest.mark.asyncio
async def test_log_activity(mock_supabase_client):
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [{
        "user_id": 1, "activity": "test activity", "timestamp": "2023-01-01T00:00:00"}]
    
    response = client.post("/activities/", params={"user_id": 1, "activity": "test activity"})
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["activity"] == "test activity"

@pytest.mark.asyncio
async def test_get_analytics(mock_supabase_client):
    mock_supabase_client.rpc.return_value.execute.return_value.data = [
        {"activity": "activity1", "count": 2},
        {"activity": "activity2", "count": 1}
    ]

    response = client.get("/analytics/")
    assert response.status_code == 200
    data = response.json()
    assert data["activity1"] == 2
    assert data["activity2"] == 1
