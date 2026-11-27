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

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel

from services.db import get_supabase

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

@router.get("/states", summary="List sourced indicators for all 50 states")
async def list_states(_key: APIKeyMeta = Depends(require_api_key)):
    """
    Returns sourced per-state indicators (CDC BRFSS, CMS Care Compare, KFF, CMS
    AHEAD and Rural Health Transformation awards) for all 50 states. There is no
    composite score: the retired "HTR Performance Index" had hand-entered values.
    """
    from services import state_indicators
    states = state_indicators.load()["states"]
    data = [state_indicators.as_record(code, row) for code, row in sorted(states.items(), key=lambda kv: kv[1]["name"])]
    return {"data": data, "count": len(data), **state_indicators.sources()}


@router.get("/states/{state_id}", summary="Sourced indicators for one state")
async def get_state(state_id: str, _key: APIKeyMeta = Depends(require_api_key)):
    """
    `state_id` is a postal code (`VT`), a name (`Vermont`) or a slug (`new-york`).
    """
    from services import state_indicators
    hit = state_indicators.find(state_id)
    if not hit:
        raise HTTPException(status_code=404, detail=f"State '{state_id}' not found.")
    return {"data": state_indicators.as_record(*hit), **state_indicators.sources()}


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
