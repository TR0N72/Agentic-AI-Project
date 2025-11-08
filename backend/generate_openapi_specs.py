
import requests
import time
import os
import subprocess

SERVICES = {
    "api_gateway": "http://localhost:8000",
    "auth": "http://localhost:8001",
    "user": "http://localhost:8002",
    "data": "http://localhost:8003",
    "question": "http://localhost:8004",
    "assessment": "http://localhost:8005",
    "embedding": "http://localhost:8006",
    "agent_orchestrator": "http://localhost:8007",
    "analytics": "http://localhost:8008",
    "notification": "http://localhost:8009",
}

OUTPUT_DIR = "docs/api"

def start_services():
    print("Starting Docker Compose services...")
    subprocess.run(["docker-compose", "up", "-d"], check=True)
    print("Services started. Waiting for them to be ready...")
    time.sleep(30) 

def stop_services():
    print("Stopping Docker Compose services...")
    subprocess.run(["docker-compose", "down"], check=True)
    print("Services stopped.")

def fetch_and_save_openapi_spec():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for service_name, service_url in SERVICES.items():
        openapi_url = f"{service_url}/openapi.json"
        output_path = os.path.join(OUTPUT_DIR, f"{service_name}.json")
        try:
            print(f"Fetching OpenAPI spec for {service_name} from {openapi_url}...")
            response = requests.get(openapi_url, timeout=10)
            response.raise_for_status()
            with open(output_path, "w") as f:
                f.write(response.text)
            print(f"Successfully saved {service_name}.json")
        except requests.exceptions.RequestException as e:
            print(f"Error fetching OpenAPI spec for {service_name}: {e}")

if __name__ == "__main__":
    try:
        start_services()
        fetch_and_save_openapi_spec()
    finally:
        stop_services()
