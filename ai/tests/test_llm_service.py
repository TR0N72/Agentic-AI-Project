import pytest
from llm_engine.llm_service import LLMService, LLMProvider
from unittest.mock import AsyncMock, patch
import os

@pytest.fixture(autouse=True)
def set_test_env():
    # Set environment variables for testing
    os.environ["DEFAULT_LLM_PROVIDER"] = "groq"
    os.environ["LLM_PROVIDER_FALLBACK_ORDER"] = "groq"
    os.environ["GROQ_API_KEY"] = "mock_groq_key"
    os.environ["TEMPERATURE"] = "0.7"
    os.environ["MAX_TOKENS"] = "1000"
    os.environ["REDIS_CACHE_ENABLED"] = "false"
    yield
    # Clean up environment variables after test
    del os.environ["DEFAULT_LLM_PROVIDER"]
    del os.environ["LLM_PROVIDER_FALLBACK_ORDER"]
    del os.environ["GROQ_API_KEY"]
    del os.environ["TEMPERATURE"]
    del os.environ["MAX_TOKENS"]
    del os.environ["REDIS_CACHE_ENABLED"]

@pytest.mark.asyncio
async def test_llm_service_init():
    service = LLMService()
    assert service.default_provider == LLMProvider.GROQ
    assert LLMProvider.GROQ in service.providers

@pytest.mark.asyncio
async def test_generate_text_groq_success():
    service = LLMService()
    
    with patch('langchain_groq.chat_models.ChatGroq.ainvoke', new_callable=AsyncMock) as mock_ainvoke:
        mock_ainvoke.return_value.content = "Generated response"
        response = await service.generate_text("Test prompt")
        mock_ainvoke.assert_called_once()
        assert response == "Generated response"

@pytest.mark.asyncio
async def test_chat_completion_groq_success():
    service = LLMService()
    
    from langchain.schema import HumanMessage
    messages = [HumanMessage(content="Hello")]

    with patch('langchain_groq.chat_models.ChatGroq.ainvoke', new_callable=AsyncMock) as mock_ainvoke:
        mock_ainvoke.return_value.content = "Chat response"
        response = await service.chat_completion(messages)
        mock_ainvoke.assert_called_once()
        assert response == "Chat response"

@pytest.mark.asyncio
async def test_generate_text_groq_failure_and_no_fallback():
    os.environ["LLM_PROVIDER_FALLBACK_ORDER"] = "groq"
    service = LLMService()

    with patch('langchain_groq.chat_models.ChatGroq.ainvoke', new_callable=AsyncMock) as mock_ainvoke:
        mock_ainvoke.side_effect = Exception("Groq error")
        with pytest.raises(Exception, match="All providers failed for Text generation"):
            await service.generate_text("Test prompt")
        mock_ainvoke.assert_called_once()

@pytest.mark.asyncio
async def test_get_available_models():
    service = LLMService()
    models = service.get_available_models()
    assert "groq/llama3-8b-8192" in models
    assert "groq/mixtral-8x7b-32768" in models
