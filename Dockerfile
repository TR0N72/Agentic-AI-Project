# Frontend build
FROM node:22-alpine AS frontend

WORKDIR /usr/src/app

COPY frontend/package*.json ./

RUN npm install --legacy-peer-deps

COPY frontend/. .

RUN npm run build

# Backend
FROM python:3.11-slim-bookworm

WORKDIR /app

COPY --from=frontend /usr/src/app/dist/spa /app/static

COPY backend/ /app/

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for the backend
EXPOSE 8000

# Command to run the backend
CMD ["uvicorn", "src.api_gateway.main:app", "--host", "0.0.0.0", "--port", "8000"]
