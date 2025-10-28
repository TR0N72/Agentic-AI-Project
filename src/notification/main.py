
from fastapi import FastAPI, WebSocket
import smtplib
from email.mime.text import MIMEText
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="Notification Service",
    description="Sends email and real-time notifications (WebSocket).",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "notification_service")
    c.agent.service.register(
        name="notification-service",
        service_id="notification-service-1",
        address=container_name,
        port=8009,
        check=consul.Check.http(f"http://{container_name}:8009/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}


# WebSocket endpoint
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}, for user: {user_id}")

# Email sending function
def send_email(to_address: str, subject: str, body: str):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.example.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "user@example.com")
    smtp_password = os.getenv("SMTP_PASSWORD", "password")

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = smtp_user
    msg['To'] = to_address

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)

@app.post("/email/")
def send_email_notification(to_address: str, subject: str, body: str):
    send_email(to_address, subject, body)
    return {"message": "Email sent successfully"}
