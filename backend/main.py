"""
backend/main.py
───────────────
HTR AI Brain — FastAPI application factory.

Module structure (refactored from monolith 2026-03):
  config.py              — all env var constants
  services/
    db.py                — Supabase singleton
    auth.py              — JWT auth, role gating
    llm.py               — LLM factory + FlashRank
    retrieval.py         — HybridRetriever, StaticNodeRetriever, rerank_nodes
    indexing.py          — build_index, load_index, fetch_sanity_content
  routers/
    chat.py              — /api/chat, /api/suggest
    ingest.py            — /api/ingest
    api_v1.py            — /api/v1/* (developer API, key-authenticated)

Run:
  uvicorn main:app --reload --port 8000
"""

import asyncio
import logging
import os

# Sentry — must init before any app code
_SENTRY_DSN = os.getenv("SENTRY_DSN")
if _SENTRY_DSN:
    import sentry_sdk
    from sentry_sdk.integrations.fastapi import FastApiIntegration
    from sentry_sdk.integrations.starlette import StarletteIntegration
    sentry_sdk.init(
        dsn=_SENTRY_DSN,
        traces_sample_rate=0.1,
        integrations=[StarletteIntegration(), FastApiIntegration()],
        environment=os.getenv("ENVIRONMENT", "production"),
    )

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import FRONTEND_URL, MODEL_SUBSCRIBER, EMBEDDING_MODEL, SUPABASE_DB_URL, SUPABASE_JWT_SECRET
from services.llm import init_global_settings, get_ranker
from services.indexing import build_index, load_index
from routers.chat import router as chat_router, set_index
from routers.ingest import router as ingest_router
from routers.api_v1 import router as api_v1_router
from routers.personalized_learning import router as personalized_learning_router
from services.catalog_search import build_catalog_index

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("htr-brain")

# ── App ────────────────────────────────────────────────────────────────────────

app = FastAPI(title="HTR AI Brain", version="4.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=list({FRONTEND_URL, "http://localhost:3000"}),
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization", "X-HTR-API-Key"],
)

# ── Rate limiting ──────────────────────────────────────────────────────────────

try:
    from slowapi import Limiter, _rate_limit_exceeded_handler
    from slowapi.util import get_remote_address
    from slowapi.errors import RateLimitExceeded

    limiter = Limiter(key_func=get_remote_address)
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # Wrap router endpoints with rate limits
    from routers.chat import chat, suggest
    from routers.ingest import ingest
    chat    = limiter.limit("30/minute")(chat)
    suggest = limiter.limit("60/minute")(suggest)
    ingest  = limiter.limit("5/hour")(ingest)

    log.info("✅ Rate limiting enabled (slowapi)")
except ImportError:
    log.warning("slowapi not installed — rate limiting disabled")

# ── Routers ────────────────────────────────────────────────────────────────────

app.include_router(chat_router)
app.include_router(ingest_router)
app.include_router(api_v1_router)
app.include_router(personalized_learning_router)

# ── Lifecycle ──────────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    log.info("\n🚀 HTR AI Brain v4.2.0 starting...")
    init_global_settings()

    # Warm up FlashRank in background so first request isn't slow
    asyncio.get_event_loop().run_in_executor(None, get_ranker)

    existing = await load_index()
    if existing:
        set_index(existing)
        log.info("Index ready. POST /api/ingest to refresh with new content.")
    else:
        log.info("No existing index found — building from scratch...")
        index = await build_index()
        set_index(index)

    # Build semantic catalog index — must run after init_global_settings()
    # so Settings.embed_model is already initialised
    await build_catalog_index()


@app.on_event("shutdown")
async def shutdown():
    log.info("🛑 HTR AI Brain shutting down...")


# ── Health ─────────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    from routers.chat import get_index
    return {
        "status":          "ok",
        "version":         "4.2.0",
        "index_ready":     get_index() is not None,
        "model_subscriber": MODEL_SUBSCRIBER,
        "embedding_model": EMBEDDING_MODEL,
        "vector_store":    "pgvector" if SUPABASE_DB_URL else "local_json",
        "auth_enabled":    bool(SUPABASE_JWT_SECRET),
        "reranker":        "flashrank" if get_ranker() is not None else "disabled",
        "retrieval":       "hybrid_bm25_vector_rrf",
        "chunking":        "sentence_window_3",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
