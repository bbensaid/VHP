"""
backend/services/llm.py
────────────────────────
LLM factory: initialises global LlamaIndex settings and provides per-tier LLM routing.
"""

import logging
from typing import Any

from llama_index.core import Settings
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


def init_global_settings() -> None:
    """Set LlamaIndex global LLM + embedding model. Call once at startup."""
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is required in backend/.env")
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY is required in backend/.env")

    Settings.llm = GroqLLM(model=MODEL_SUBSCRIBER, api_key=GROQ_API_KEY)
    Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL, api_key=OPENAI_API_KEY)
    log.info(f"LLM: Groq {MODEL_SUBSCRIBER} | Embeddings: OpenAI {EMBEDDING_MODEL}")


def get_llm_for_role(role: str) -> Any:
    """
    Return the appropriate LLM instance for the user's subscription tier:
      free / student       → llama-3.1-8b-instant  (Groq, fast)
      subscriber / pro     → llama-3.3-70b-versatile (Groq, capable)
      advisory / admin     → claude-sonnet-4-6 (Anthropic, highest quality)
    Falls back to subscriber model if Anthropic is unavailable.
    """
    if role in ("advisory", "admin"):
        if _ANTHROPIC_AVAILABLE and ANTHROPIC_API_KEY and AnthropicLLM is not None:
            log.info(f"Model routing: role={role} → {MODEL_ADVISORY} (Anthropic)")
            return AnthropicLLM(model=MODEL_ADVISORY, api_key=ANTHROPIC_API_KEY)
        log.warning(f"Model routing: advisory role but Anthropic unavailable — using {MODEL_SUBSCRIBER}")

    if role in ("free", "student"):
        log.info(f"Model routing: role={role} → {MODEL_FREE} (Groq)")
        return GroqLLM(model=MODEL_FREE, api_key=GROQ_API_KEY)

    log.info(f"Model routing: role={role} → {MODEL_SUBSCRIBER} (Groq)")
    return GroqLLM(model=MODEL_SUBSCRIBER, api_key=GROQ_API_KEY)


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
