
import pytest
from fastapi.testclient import TestClient
from user.main import app
from unittest.mock import AsyncMock, patch

client = TestClient(app)

@pytest.fixture
def mock_supabase_client():
    with patch('user.dependencies.supabase') as mock_supabase:
        yield mock_supabase

@pytest.fixture
def mock_supabase_postgrest_client():
    with patch('user.dependencies.create_client') as mock_create_client:
        mock_supabase = AsyncMock()
        mock_create_client.return_value = mock_supabase
        yield mock_supabase

@pytest.fixture
def mock_pwd_context():
    with patch('user.main.pwd_context') as mock_pwd:
        yield mock_pwd

@pytest.mark.asyncio
async def test_create_user(mock_supabase_client, mock_pwd_context):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.execute.return_value.data = []
    mock_pwd_context.hash.return_value = "hashed_password"
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"username": "testuser", "email": "test@example.com", "hashed_password": "hashed_password", "id": 1}]
    
    response = client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "password"})
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"
    assert "id" in data

@pytest.mark.asyncio
async def test_create_user_email_exists(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.execute.return_value.data = [
        {"id": 1}]
    
    response = client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "password"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already registered"}

@pytest.mark.asyncio
async def test_read_user(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {
        "username": "anotheruser", "email": "another@example.com", "id": 1, "hashed_password": "hashed_password"}
    
    response = client.get(f"/users/1")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "anotheruser"
    assert data["email"] == "another@example.com"

@pytest.mark.asyncio
async def test_read_nonexistent_user(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = None
    
    response = client.get("/users/9999")
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

@pytest.mark.asyncio
async def test_read_user_by_email(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {
        "username": "emailuser", "email": "email@example.com", "id": 2, "hashed_password": "hashed_password"}
    
    response = client.get(f"/users/email/email@example.com")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "emailuser"
    assert data["email"] == "email@example.com"
    assert "hashed_password" in data

@pytest.mark.asyncio
async def test_read_user_by_email_not_found(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = None
    
    response = client.get(f"/users/email/nonexistent@example.com")
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

@pytest.mark.asyncio
async def test_create_role(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.execute.return_value.data = []
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"name": "admin", "id": 1}]
    
    response = client.post("/roles/", json={"name": "admin"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "admin"
    assert "id" in data

@pytest.mark.asyncio
async def test_create_role_exists(mock_supabase_client):
    mock_supabase_client.table.return_value.select.return_value.eq.return_value.execute.return_value.data = [
        {"id": 1}]
    
    response = client.post("/roles/", json={"name": "admin"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Role already exists"}

@pytest.mark.asyncio
async def test_add_role_to_user(mock_supabase_client):
    mock_supabase_client.table.return_value.insert.return_value.execute.return_value.data = [
        {"user_id": 1, "role_id": 1}]
    
    response = client.post("/users/1/roles/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Role added to user"}
