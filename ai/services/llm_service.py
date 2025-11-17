import os
import asyncio
from abc import ABC, abstractmethod
from typing import Optional, List, Dict, Any, Type
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage, BaseMessage
import logging
from enum import Enum
from cache.redis_cache import (
    make_cache_key,
    cache_get_text,
    cache_set_text,
    cache_get_json,
    cache_set_json,
)

# Load environment variables
load_dotenv()
logger = logging.getLogger(__name__)

class LLMProvider(Enum):
    """Supported LLM providers"""
    GROQ = "groq"

class BaseLLMProvider(ABC):
    """Abstract base class for LLM providers"""
    
    @abstractmethod
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """Generate text from prompt"""
        pass
    
    @abstractmethod
    async def chat_completion(self, messages: List[BaseMessage], **kwargs) -> str:
        """Generate chat completion from messages"""
        pass
    
    @abstractmethod
    def get_available_models(self) -> Dict[str, str]:
        """Get available models for this provider"""
        pass

class GroqProvider(BaseLLMProvider):
    """Groq-specific implementation"""
    
    def __init__(self):
        self.default_model = os.getenv("GROQ_DEFAULT_MODEL", "llama3-8b-8192")
        self.client = ChatGroq(
            model_name=self.default_model,
            temperature=float(os.getenv("TEMPERATURE", 0.7)),
            max_tokens=int(os.getenv("MAX_TOKENS", 1000))
        )
        
    async def generate_text(self, prompt: str, **kwargs) -> str:
        try:
            messages = [HumanMessage(content=prompt)]
            response = await self.client.ainvoke(messages)
            return response.content
        except Exception as e:
            logger.error(f"Groq generation error: {str(e)}")
            raise
            
    async def chat_completion(self, messages: List[BaseMessage], **kwargs) -> str:
        try:
            response = await self.client.ainvoke(messages)
            return response.content
        except Exception as e:
            logger.error(f"Groq chat completion error: {str(e)}")
            raise
            
    def get_available_models(self) -> Dict[str, str]:
        return {
            "llama3-8b-8192": "LLaMA3-8b-8192",
            "llama3-70b-8192": "LLaMA3-70b-8192",
            "mixtral-8x7b-32768": "Mixtral-8x7b-32768",
            "gemma-7b-it": "Gemma-7b-it"
        }

class LLMService:
    """
    Service for handling Large Language Model operations with Groq.
    """
    
    def __init__(self):
        # Initialize providers
        self.providers = {
            LLMProvider.GROQ: GroqProvider()
        }
        
        # Set default provider
        self.default_provider = LLMProvider.GROQ
        
        # Set max retries
        self.max_retries = int(os.getenv("MAX_RETRIES", 3))
    
    async def _execute_with_fallback(self, operation: str, func, *args, **kwargs) -> str:
        """Execute operation with retries"""
        retries = 0
        
        while retries < self.max_retries:
            try:
                provider_instance = self.providers[self.default_provider]
                return await getattr(provider_instance, func)(*args, **kwargs)
            except Exception as e:
                logger.error(f"{operation} failed with {self.default_provider.value}: {str(e)}")
                retries += 1
        
        raise Exception(f"Max retries ({self.max_retries}) exceeded for {operation}")
    
    async def generate_text(self, prompt: str, **kwargs) -> str:
        """
        Generate text using configured LLM providers with automatic fallback.
        
        Args:
            prompt: The input prompt for text generation
            **kwargs: Additional arguments passed to provider
            
        Returns:
            Generated text response
        """
        # Redis cache (optional)
        if os.getenv("REDIS_CACHE_ENABLED", "true").lower() in {"1", "true", "yes"}:
            provider = kwargs.get("provider", self.default_provider)
            provider_name = getattr(provider, "value", str(provider))
            model_name = kwargs.get("model")
            cache_key = make_cache_key("llm:generate", prompt, {"provider": provider_name, "model": model_name})
            cached = await cache_get_text(cache_key)
            if cached is not None:
                return cached

        result = await self._execute_with_fallback(
            "Text generation",
            "generate_text",
            prompt,
            **kwargs
        )

        if os.getenv("REDIS_CACHE_ENABLED", "true").lower() in {"1", "true", "yes"}:
            try:
                provider = kwargs.get("provider", self.default_provider)
                provider_name = getattr(provider, "value", str(provider))
                model_name = kwargs.get("model")
                cache_key = make_cache_key("llm:generate", prompt, {"provider": provider_name, "model": model_name})
                await cache_set_text(cache_key, result)
            except Exception:
                pass
        return result
    
    async def chat_completion(self, messages: List[BaseMessage], **kwargs) -> str:
        """
        Perform chat completion with automatic provider fallback.
        
        Args:
            messages: List of chat messages
            **kwargs: Additional arguments passed to provider
            
        Returns:
            Chat completion response
        """
        # Redis cache (optional)
        if os.getenv("REDIS_CACHE_ENABLED", "true").lower() in {"1", "true", "yes"}:
            provider = kwargs.get("provider", self.default_provider)
            provider_name = getattr(provider, "value", str(provider))
            model_name = kwargs.get("model")
            serializable_messages = [{"type": getattr(m, "type", None), "content": getattr(m, "content", None)} for m in messages]
            cache_key = make_cache_key("llm:chat", serializable_messages, {"provider": provider_name, "model": model_name})
            cached = await cache_get_text(cache_key)
            if cached is not None:
                return cached

        result = await self._execute_with_fallback(
            "Chat completion",
            "chat_completion",
            messages,
            **kwargs
        )

        if os.getenv("REDIS_CACHE_ENABLED", "true").lower() in {"1", "true", "yes"}:
            try:
                provider = kwargs.get("provider", self.default_provider)
                provider_name = getattr(provider, "value", str(provider))
                model_name = kwargs.get("model")
                serializable_messages = [{"type": getattr(m, "type", None), "content": getattr(m, "content", None)} for m in messages]
                cache_key = make_cache_key("llm:chat", serializable_messages, {"provider": provider_name, "model": model_name})
                await cache_set_text(cache_key, result)
            except Exception:
                pass
        return result
    
    def get_available_models(self, provider: Optional[LLMProvider] = None) -> Dict[str, str]:
        """
        Get available models for specified provider or all providers.
        
        Args:
            provider: Optional specific provider to get models for
            
        Returns:
            Dictionary of model names and descriptions
        """
        if provider:
            return self.providers[provider].get_available_models()
        
        all_models = {}
        for provider_enum, provider_instance in self.providers.items():
            provider_models = provider_instance.get_available_models()
            all_models.update({
                f"{provider_enum.value}/{model}": desc
                for model, desc in provider_models.items()
            })
        return all_models
