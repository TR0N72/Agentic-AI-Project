from fastapi import FastAPI
import pika
import json
import threading
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
from langchain_community.chat_models import ChatAnthropic
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

app = FastAPI(
    title="Agent Orchestrator Service",
    description="Orchestrates the Planner, Generator, and Evaluator pipeline.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

llm = ChatAnthropic(temperature=0.9)  # Requires ANTHROPIC_API_KEY environment variable

planner_prompt = PromptTemplate(
    input_variables=["topic"],
    template="Create a lesson plan for the following topic: {topic}",
)
planner_chain = LLMChain(llm=llm, prompt=planner_prompt)

generator_prompt = PromptTemplate(
    input_variables=["lesson_plan"],
    template="Generate content for the following lesson plan: {lesson_plan}",
)
generator_chain = LLMChain(llm=llm, prompt=generator_prompt)

evaluator_prompt = PromptTemplate(
    input_variables=["content"],
    template="Evaluate the following content for clarity and accuracy: {content}",
)
evaluator_chain = LLMChain(llm=llm, prompt=evaluator_prompt)

def callback(ch, method, properties, body):
    data = json.loads(body)
    print(f" [x] Received {data}")
    lesson_plan = planner_chain.run(data["text"])
    content = generator_chain.run(lesson_plan)
    evaluation = evaluator_chain.run(content)
    print(f"Evaluation: {evaluation}")

def consume_messages():
    RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")
    connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue='question_created')
    channel.basic_consume(queue='question_created', on_message_callback=callback, auto_ack=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "agent_orchestrator_service")
    c.agent.service.register(
        name="agent-orchestrator-service",
        service_id="agent-orchestrator-service-1",
        address=container_name,
        port=8007,
        check=consul.Check.http(f"http://{container_name}:8007/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    threading.Thread(target=consume_messages, daemon=True).start()
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def read_root():
    return {"service": "agent_orchestrator"}
