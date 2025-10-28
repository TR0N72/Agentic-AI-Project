FROM python:3.11-slim-bookworm

WORKDIR /app

COPY . /app

RUN pip install --timeout=600 -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8006"]
