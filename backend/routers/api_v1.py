"""
backend/routers/api_v1.py
─────────────────────────
Public developer API — authenticated via API key header.

Endpoints:
  GET /api/v1/states          — all state performance index profiles
  GET /api/v1/states/{id}     — single state profile
  GET /api/v1/survey/results  — aggregate survey data (current edition)

Auth header:  X-HTR-API-Key: htr_<32 hex chars>

Rate limits (enforced in middleware / main.py):
  researcher  → 1,000 req / day
  enterprise  → unlimited
"""

import hashlib
import logging
from typing import Optional

from fastapi import APIRouter, Header, HTTPException, Depends
from pydantic import BaseModel

from services.db import get_supabase
from config import SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL

log = logging.getLogger("htr-brain")
router = APIRouter(prefix="/api/v1", tags=["developer-api"])

RATE_LIMITS = {
    "researcher": 1000,
    "enterprise": None,  # unlimited
}


# ── Auth dependency ────────────────────────────────────────────────────────────

class APIKeyMeta(BaseModel):
    id: str
    user_id: str
    tier: str
    requests_today: int


async def require_api_key(
    x_htr_api_key: Optional[str] = Header(default=None, alias="X-HTR-API-Key"),
) -> APIKeyMeta:
    if not x_htr_api_key:
        raise HTTPException(
            status_code=401,
            detail="Missing API key. Set the X-HTR-API-Key header.",
            headers={"WWW-Authenticate": "APIKey"},
        )

    key_hash = hashlib.sha256(x_htr_api_key.encode()).hexdigest()
    supabase = get_supabase()

    result = supabase.table("api_keys") \
        .select("id, user_id, tier, requests_today") \
        .eq("key_hash", key_hash) \
        .is_("revoked_at", "null") \
        .single() \
        .execute()

    if not result.data:
        raise HTTPException(status_code=401, detail="Invalid or revoked API key.")

    meta = APIKeyMeta(**result.data)
    limit = RATE_LIMITS.get(meta.tier)
    if limit is not None and meta.requests_today >= limit:
        raise HTTPException(
            status_code=429,
            detail=f"Daily rate limit of {limit} requests reached for tier '{meta.tier}'. Resets at midnight UTC.",
        )

    # Increment counter + update last_used_at (fire-and-forget)
    try:
        supabase.table("api_keys") \
            .update({
                "requests_today": meta.requests_today + 1,
                "last_used_at": "now()",
            }) \
            .eq("id", meta.id) \
            .execute()
    except Exception:
        pass  # Non-fatal

    return meta


# ── Endpoints ──────────────────────────────────────────────────────────────────

@router.get("/states", summary="List all state performance profiles")
async def list_states(_key: APIKeyMeta = Depends(require_api_key)):
    """
    Returns all 50-state HTR Performance Index profiles as a JSON array.
    Each record includes overall score, status, tier-level metrics, and narrative summary.
    """
    supabase = get_supabase()
    result = supabase.table("state_performance_index") \
        .select("*") \
        .order("state_name") \
        .execute()

    if result.data is None:
        raise HTTPException(status_code=503, detail="Data unavailable.")

    return {"data": result.data, "count": len(result.data)}


@router.get("/states/{state_id}", summary="Get a single state performance profile")
async def get_state(state_id: str, _key: APIKeyMeta = Depends(require_api_key)):
    """
    Returns the full HTR Performance Index profile for a single state.
    `state_id` is the lowercase state slug (e.g. `vermont`, `california`).
    """
    supabase = get_supabase()
    result = supabase.table("state_performance_index") \
        .select("*") \
        .eq("id", state_id) \
        .single() \
        .execute()

    if not result.data:
        raise HTTPException(status_code=404, detail=f"State '{state_id}' not found.")

    return {"data": result.data}


@router.get("/survey/results", summary="Aggregate survey results (current edition)")
async def survey_results(_key: APIKeyMeta = Depends(require_api_key)):
    """
    Returns aggregated, anonymised results from the current annual
    'State of Healthcare Transformation' survey.
    """
    supabase = get_supabase()
    result = supabase.table("survey_aggregate").select("*").execute()

    if not result.data:
        raise HTTPException(status_code=503, detail="Survey data unavailable.")

    return {"data": result.data}
