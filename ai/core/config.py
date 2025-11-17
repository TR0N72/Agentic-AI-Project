import os
from dotenv import load_dotenv
import logging
from observability.otel_setup import configure_json_logging, init_tracing

# Load environment variables
load_dotenv()

# Observability: logging and tracing
SERVICE_NAME = os.getenv("SERVICE_NAME", "nlp-ai-microservice")

def setup_observability(app):
    configure_json_logging(SERVICE_NAME)
    init_tracing(SERVICE_NAME, app)
