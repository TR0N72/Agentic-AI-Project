# Backend for Agentic AI SAT/UTBK Learning Platform
This project contains the backend microservices for the Agentic AI SAT/UTBK Learning Platform. The backend is built with FastAPI and utilizes a variety of technologies, including PostgreSQL, Redis, RabbitMQ, and Consul.

## Project Structure
The project is organized into a microservices architecture, with each service located in its own directory under the `src/` directory. Each service has its own `Dockerfile` and `requirements.txt` file.

- `src/api_gateway`: The main entry point for the API.
- `src/auth`: Handles authentication, including OAuth2 and JWT.
- `src/user`: Manages user profiles and role-based access control (RBAC).
- `src/data`: Manages data for questions, users, and activities.
- `src/question`: Manages the question bank with CRUD operations and caching.
- `src/assessment`: Manages exam sessions and adaptive scoring.
- `src/embedding`: Generates text embeddings.
- `src/agent_orchestrator`: Orchestrates the Planner, Generator, and Evaluator pipeline.
- `src/analytics`: Logs user activities and provides aggregated analytics.
- `src/notification`: Sends email and real-time notifications (WebSocket).

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Backend
To run the entire backend stack, simply run the following command from the root of the project:

```bash
docker-compose up -d
```

This will start all the microservices, as well as the necessary infrastructure (PostgreSQL, Redis, RabbitMQ, and Consul). The services will be available at their respective ports (8000-8009).

To stop the backend, run the following command:

```bash
docker-compose down
```

## API Documentation

Each service has its own OpenAPI/Swagger documentation, which can be accessed at the `/docs` endpoint of each service. For example, the API Gateway's documentation can be accessed at `http://localhost:8000/docs`.

## Monitoring

Each service exposes a `/metrics` endpoint for Prometheus. A Grafana dashboard is also available to visualize the metrics. The Grafana dashboard can be accessed at `http://localhost:3000`.
