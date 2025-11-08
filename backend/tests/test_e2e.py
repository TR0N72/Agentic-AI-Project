
import requests

API_GATEWAY_URL = "http://127.0.0.1:8000"

def test_api_gateway_health():
    response = requests.get(f"{API_GATEWAY_URL}/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_question():
    response = requests.post(f"{API_GATEWAY_URL}/questions/", json={"text": "What is the capital of France?", "answer": "Paris"})
    assert response.status_code == 200
    assert response.json()["text"] == "What is the capital of France?"

def test_read_question():
    # First, create a question to read
    create_response = requests.post(f"{API_GATEWAY_URL}/questions/", json={"text": "What is the capital of Spain?", "answer": "Madrid"})
    question_id = create_response.json()["id"]

    # Now, read the question
    read_response = requests.get(f"{API_GATEWAY_URL}/questions/{question_id}")
    assert read_response.status_code == 200
    assert read_response.json()["text"] == "What is the capital of Spain?"
