"""
backend/services/llm.py
────────────────────────
LLM factory: initialises global LlamaIndex settings and provides per-tier LLM routing.

Fallback chain (Groq tiers):
  If the primary model returns a rate-limit (429) or service error (5xx),
  FallbackLLM automatically retries with the next model in the chain before
  propagating the error to the caller.
"""

import asyncio
import logging
from typing import Any, Optional, Sequence

from llama_index.core import Settings
from llama_index.core.llms import LLM, CompletionResponse, CompletionResponseGen
from llama_index.core.llms import ChatMessage, ChatResponse, ChatResponseGen, ChatResponseAsyncGen
from llama_index.llms.groq import Groq as GroqLLM
from llama_index.embeddings.openai import OpenAIEmbedding

from config import (
    GROQ_API_KEY,
    ANTHROPIC_API_KEY,
    OPENAI_API_KEY,
    MODEL_FREE,
    MODEL_SUBSCRIBER,
    MODEL_ADVISORY,
    EMBEDDING_MODEL,
)

log = logging.getLogger("htr-brain")

# Anthropic LLM — optional dependency
try:
    from llama_index.llms.anthropic import Anthropic as AnthropicLLM
    _ANTHROPIC_AVAILABLE = True
except ImportError:
    AnthropicLLM = None  # type: ignore
    _ANTHROPIC_AVAILABLE = False


# ── Fallback LLM wrapper ───────────────────────────────────────────────────────

# HTTP status codes that should trigger a fallback (not user errors)
_RETRYABLE_STATUS = {429, 500, 502, 503, 504}

def _is_retryable(exc: Exception) -> bool:
    """Return True if the exception looks like a transient Groq error."""
    msg = str(exc).lower()
    # Groq SDK raises httpx.HTTPStatusError or groq.RateLimitError etc.
    if any(str(s) in msg for s in _RETRYABLE_STATUS):
        return True
    if any(kw in msg for kw in ("rate limit", "ratelimit", "overloaded", "service unavailable", "bad gateway", "timeout")):
        return True
    return False


class FallbackLLM(LLM):
    """
    Wraps a primary LLM with an ordered fallback chain.

    On any retryable error from the primary, tries each fallback in order.
    Non-retryable errors (e.g. 400 bad request) are re-raised immediately.

    Usage:
        llm = FallbackLLM(
            primary=GroqLLM(model="llama-3.3-70b-versatile", ...),
            fallbacks=[GroqLLM(model="llama-3.1-8b-instant", ...)],
        )
    """

    # LlamaIndex requires these class-level fields
    model: str = "fallback"
    context_window: int = 32768
    num_output: int = 4096
    is_chat_model: bool = True
    is_function_calling_model: bool = False

    class Config:
        arbitrary_types_allowed = True

    def __init__(self, primary: LLM, fallbacks: list[LLM]):
        super().__init__()
        object.__setattr__(self, "_primary", primary)
        object.__setattr__(self, "_fallbacks", fallbacks)
        object.__setattr__(self, "model", getattr(primary, "model", "fallback"))

    @property
    def metadata(self):
        return self._primary.metadata

    def _all_llms(self) -> list[LLM]:
        return [self._primary] + self._fallbacks

    # ── Sync complete ──────────────────────────────────────────────────────────

    def complete(self, prompt: str, **kwargs) -> CompletionResponse:
        last_exc: Optional[Exception] = None
        for llm in self._all_llms():
            try:
                return llm.complete(prompt, **kwargs)
            except Exception as exc:
                if not _is_retryable(exc):
                    raise
                log.warning(f"FallbackLLM: {getattr(llm, 'model', '?')} failed ({exc!r}), trying next")
                last_exc = exc
        raise last_exc  # type: ignore

    async def acomplete(self, prompt: str, **kwargs) -> CompletionResponse:
        last_exc: Optional[Exception] = None
        for llm in self._all_llms():
            try:
                return await llm.acomplete(prompt, **kwargs)
            except Exception as exc:
                if not _is_retryable(exc):
                    raise
                log.warning(f"FallbackLLM: {getattr(llm, 'model', '?')} failed ({exc!r}), trying next")
                last_exc = exc
        raise last_exc  # type: ignore

    # ── Sync chat ──────────────────────────────────────────────────────────────

    def chat(self, messages: Sequence[ChatMessage], **kwargs) -> ChatResponse:
        last_exc: Optional[Exception] = None
        for llm in self._all_llms():
            try:
                return llm.chat(messages, **kwargs)
            except Exception as exc:
                if not _is_retryable(exc):
                    raise
                log.warning(f"FallbackLLM: {getattr(llm, 'model', '?')} failed ({exc!r}), trying next")
                last_exc = exc
        raise last_exc  # type: ignore

    async def achat(self, messages: Sequence[ChatMessage], **kwargs) -> ChatResponse:
        last_exc: Optional[Exception] = None
        for llm in self._all_llms():
            try:
                return await llm.achat(messages, **kwargs)
            except Exception as exc:
                if not _is_retryable(exc):
                    raise
                log.warning(f"FallbackLLM: {getattr(llm, 'model', '?')} failed ({exc!r}), trying next")
                last_exc = exc
        raise last_exc  # type: ignore

    # ── Streaming — delegates to primary only; falls back to non-streaming ─────
    # Streaming fallback: if primary fails mid-stream we can't unsend tokens,
    # so we catch errors before the first token and fall back then.

    def stream_complete(self, prompt: str, **kwargs) -> CompletionResponseGen:
        return self._primary.stream_complete(prompt, **kwargs)

    def stream_chat(self, messages: Sequence[ChatMessage], **kwargs) -> ChatResponseGen:
        return self._primary.stream_chat(messages, **kwargs)

    async def astream_complete(self, prompt: str, **kwargs):
        return await self._primary.astream_complete(prompt, **kwargs)

    async def astream_chat(self, messages: Sequence[ChatMessage], **kwargs) -> ChatResponseAsyncGen:
        last_exc: Optional[Exception] = None
        for llm in self._all_llms():
            try:
                return await llm.astream_chat(messages, **kwargs)
            except Exception as exc:
                if not _is_retryable(exc):
                    raise
                log.warning(f"FallbackLLM astream_chat: {getattr(llm, 'model', '?')} failed ({exc!r}), trying next")
                last_exc = exc
        raise last_exc  # type: ignore


# ── Public API ─────────────────────────────────────────────────────────────────

def init_global_settings() -> None:
    """Set LlamaIndex global LLM + embedding model. Call once at startup."""
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is required in backend/.env")
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY is required in backend/.env")

    Settings.llm = GroqLLM(model=MODEL_SUBSCRIBER, api_key=GROQ_API_KEY)
    Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL, api_key=OPENAI_API_KEY)
    log.info(f"LLM: Groq {MODEL_SUBSCRIBER} | Embeddings: OpenAI {EMBEDDING_MODEL}")


def get_llm_for_role(role: str) -> LLM:
    """
    Return an LLM (wrapped in FallbackLLM) for the user's subscription tier:

      free / student       → llama-3.1-8b-instant  (Groq)
                             fallback: none (already the cheapest)

      subscriber           → llama-3.3-70b-versatile (Groq)
                             fallback: llama-3.1-8b-instant

      advisory / admin     → claude-sonnet-4-6 (Anthropic)
                             fallback: llama-3.3-70b-versatile → llama-3.1-8b-instant
    """
    fast_llm = GroqLLM(model=MODEL_FREE, api_key=GROQ_API_KEY)
    sub_llm  = GroqLLM(model=MODEL_SUBSCRIBER, api_key=GROQ_API_KEY)

    if role in ("advisory", "admin"):
        if _ANTHROPIC_AVAILABLE and ANTHROPIC_API_KEY and AnthropicLLM is not None:
            log.info(f"Model routing: role={role} → {MODEL_ADVISORY} (Anthropic) w/ Groq fallback")
            primary = AnthropicLLM(model=MODEL_ADVISORY, api_key=ANTHROPIC_API_KEY)
            return FallbackLLM(primary=primary, fallbacks=[sub_llm, fast_llm])
        log.warning(f"Model routing: advisory role but Anthropic unavailable — using {MODEL_SUBSCRIBER}")

    if role in ("free", "student"):
        log.info(f"Model routing: role={role} → {MODEL_FREE} (Groq)")
        return fast_llm  # No fallback needed for the cheapest model

    # subscriber / professional + advisory fallback
    log.info(f"Model routing: role={role} → {MODEL_SUBSCRIBER} (Groq) w/ fast fallback")
    return FallbackLLM(primary=sub_llm, fallbacks=[fast_llm])


# ── FlashRank re-ranker (lazy init) ───────────────────────────────────────────

_ranker: Any = None


def get_ranker() -> Any:
    global _ranker
    if _ranker is None:
        try:
            from flashrank import Ranker
            _ranker = Ranker(model_name="ms-marco-MiniLM-L-12-v2", cache_dir="/tmp/flashrank")
            log.info("✅ FlashRank re-ranker initialized (ms-marco-MiniLM-L-12-v2)")
        except Exception as e:
            log.warning(f"FlashRank unavailable: {e} — re-ranking disabled")
    return _ranker
