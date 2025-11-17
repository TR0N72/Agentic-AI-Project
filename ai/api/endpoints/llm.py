from fastapi import APIRouter, HTTPException
from api.models import TextRequest
from core.deps import llm_service

router = APIRouter()

@router.post("/llm/generate", tags=["llm"])
async def generate_text(request: TextRequest):
    """
    Generate text using Large Language Models.
    
    Supports multiple LLM providers including OpenAI GPT, Anthropic Claude, and local LLaMA models.
    Useful for generating explanations, summaries, and educational content.
    
    - **text**: The input prompt or question
    - **model**: The LLM model to use (default: gpt-3.5-turbo)
    
    Returns the generated text response from the selected LLM.
    """
    try:
        response = await llm_service.generate_text(request.text, request.model)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/llm/chat", tags=["llm"])
async def chat_completion(request: TextRequest):
    """
    Chat completion using Large Language Models.
    
    Provides conversational AI capabilities for interactive tutoring and Q&A sessions.
    Ideal for educational scenarios where students need step-by-step guidance.
    
    - **text**: The user's message or question
    - **model**: The LLM model to use (default: gpt-3.5-turbo)
    
    Returns a conversational response from the LLM.
    """
    try:
        response = await llm_service.chat_completion(request.text, request.model)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
