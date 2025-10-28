FROM python:3.11-slim-bookworm

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --timeout=600 -r requirements.txt

COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003"]
