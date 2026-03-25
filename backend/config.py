"""
backend/config.py
─────────────────
Centralised configuration: reads environment variables and exposes typed constants.
Import from here instead of scattering os.getenv() calls across modules.
"""

import os
from dotenv import load_dotenv

load_dotenv(override=True)

# ── LLM ───────────────────────────────────────────────────────────────────────
GROQ_API_KEY: str | None = os.getenv("GROQ_API_KEY")
ANTHROPIC_API_KEY: str | None = os.getenv("ANTHROPIC_API_KEY")
OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")

# Model routing by tier
MODEL_FREE       = "llama-3.1-8b-instant"
MODEL_SUBSCRIBER = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
MODEL_ADVISORY   = "claude-sonnet-4-6"
EMBEDDING_MODEL  = "text-embedding-3-small"

# ── Supabase ──────────────────────────────────────────────────────────────────
SUPABASE_URL              = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_JWT_SECRET       = os.getenv("SUPABASE_JWT_SECRET")
SUPABASE_DB_URL           = os.getenv("SUPABASE_DB_URL")

# ── Sanity CMS ────────────────────────────────────────────────────────────────
SANITY_PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
SANITY_DATASET    = os.getenv("SANITY_DATASET", "production")
SANITY_API_TOKEN  = os.getenv("SANITY_API_TOKEN")
SANITY_API_VER    = os.getenv("SANITY_API_VERSION", "2023-10-01")

# ── Application ───────────────────────────────────────────────────────────────
FRONTEND_URL         = os.getenv("FRONTEND_URL", "http://localhost:3000")
INGEST_SECRET        = os.getenv("INGEST_SECRET")
MAX_SYSTEM_PROMPT_LEN = 800

# ── Retry / tuning ────────────────────────────────────────────────────────────
SANITY_MAX_RETRIES   = 3
SANITY_RETRY_BACKOFF = 1.5

# ── Paths ─────────────────────────────────────────────────────────────────────
import pathlib
BASE_DIR    = pathlib.Path(__file__).parent
DATA_DIR    = BASE_DIR / "data"
STORAGE_DIR = BASE_DIR / "storage"
