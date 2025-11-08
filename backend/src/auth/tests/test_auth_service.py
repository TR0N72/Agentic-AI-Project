import pytest
from fastapi.testclient import TestClient
from auth.main import app, SECRET_KEY, ALGORITHM, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from unittest.mock import patch, AsyncMock
from datetime import timedelta
from jose import jwt
import httpx

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_login_for_access_token_success():
    mock_user = {"email": "test@example.com", "hashed_password": "$2b$12$EXAMPLEHASH", "id": 1, "username": "testuser", "roles": []}
    
    with patch('httpx.AsyncClient.get', new_callable=AsyncMock) as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_user
        mock_get.return_value.raise_for_status.return_value = None
        
        with patch('auth.main.pwd_context.verify') as mock_verify:
            mock_verify.return_value = True
            
            response = client.post(
                "/token",
                data={
                    "username": "test@example.com",
                    "password": "password"
                }
            )
            
            assert response.status_code == 200
            data = response.json()
            assert "access_token" in data
            assert data["token_type"] == "bearer"
            mock_get.assert_called_once_with("http://user-service:8002/users/email/test@example.com")
            mock_verify.assert_called_once_with("password", "$2b$12$EXAMPLEHASH")

@pytest.mark.asyncio
async def test_login_for_access_token_invalid_credentials():
    mock_user = {"email": "test@example.com", "hashed_password": "$2b$12$EXAMPLEHASH", "id": 1, "username": "testuser", "roles": []}

    with patch('httpx.AsyncClient.get', new_callable=AsyncMock) as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_user
        mock_get.return_value.raise_for_status.return_value = None

        with patch('auth.main.pwd_context.verify') as mock_verify:
            mock_verify.return_value = False  # Simulate incorrect password

            response = client.post(
                "/token",
                data={
                    "username": "test@example.com",
                    "password": "wrongpassword"
                }
            )

            assert response.status_code == 400
            assert response.json() == {"detail": "Incorrect username or password"}
            mock_get.assert_called_once_with("http://user-service:8002/users/email/test@example.com")
            mock_verify.assert_called_once_with("wrongpassword", "$2b$12$EXAMPLEHASH")

@pytest.mark.asyncio
async def test_login_for_access_token_user_not_found():
    with patch('httpx.AsyncClient.get', new_callable=AsyncMock) as mock_get:
        mock_get.return_value.status_code = 404
        mock_get.return_value.raise_for_status.side_effect = httpx.HTTPStatusError("Not Found", request=httpx.Request("GET", "url"), response=httpx.Response(404))

        response = client.post(
            "/token",
            data={
                "username": "nonexistent@example.com",
                "password": "password"
            }
        )

        assert response.status_code == 400
        assert response.json() == {"detail": "Incorrect username or password"}
        mock_get.assert_called_once_with("http://user-service:8002/users/email/nonexistent@example.com")

@pytest.mark.asyncio
async def test_read_users_me_success():
    test_email = "test@example.com"
    to_encode = {"sub": test_email}
    access_token = create_access_token(to_encode)

    response = client.get(
        "/users/me",
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )

    assert response.status_code == 200
    assert response.json() == {"username": test_email}

@pytest.mark.asyncio
async def test_read_users_me_invalid_token():
    response = client.get(
        "/users/me",
        headers={
            "Authorization": "Bearer invalidtoken"
        }
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid authentication credentials"}

@pytest.mark.asyncio
async def test_read_users_me_no_token():
    response = client.get(
        "/users/me"
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}