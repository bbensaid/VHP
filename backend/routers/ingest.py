"""
backend/routers/ingest.py
──────────────────────────
/api/ingest        — enqueue a content re-index job (returns 202 immediately)
/api/ingest/status — poll job status
"""

import asyncio
import logging
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Request

from config import INGEST_SECRET
from services.indexing import build_index
from services.db import get_supabase
from routers.chat import set_index

log    = logging.getLogger("htr-brain")
router = APIRouter()

_index_lock = asyncio.Lock()

# In-memory job state (also written to Supabase ingest_jobs if available)
_current_job: dict = {}


def _auth_check(request: Request) -> None:
    auth = request.headers.get("Authorization", "")
    if INGEST_SECRET and auth != f"Bearer {INGEST_SECRET}":
        raise HTTPException(status_code=401, detail="Invalid ingest secret")


async def _run_job(job_id: str) -> None:
    supabase = get_supabase()
    _current_job.update({"status": "running", "started_at": datetime.now(timezone.utc).isoformat()})
    if supabase:
        try:
            supabase.table("ingest_jobs").update({
                "status": "running",
                "started_at": "now()",
            }).eq("id", job_id).execute()
        except Exception:
            pass

    log.info(f"🔄 Ingest job {job_id} — rebuilding index…")
    try:
        new_index = await build_index()
        async with _index_lock:
            set_index(new_index)
        _current_job.update({"status": "completed", "completed_at": datetime.now(timezone.utc).isoformat()})
        if supabase:
            try:
                supabase.table("ingest_jobs").update({
                    "status": "completed",
                    "completed_at": "now()",
                }).eq("id", job_id).execute()
            except Exception:
                pass
        log.info(f"✅ Ingest job {job_id} completed.")
    except Exception as e:
        err = str(e)
        _current_job.update({"status": "failed", "error": err})
        if supabase:
            try:
                supabase.table("ingest_jobs").update({
                    "status": "failed",
                    "error_message": err[:2000],
                }).eq("id", job_id).execute()
            except Exception:
                pass
        log.error(f"❌ Ingest job {job_id} failed: {err}")


@router.post("/api/ingest", status_code=202)
async def ingest(request: Request):
    """
    Enqueue a content re-index job. Returns 202 immediately.
    Poll /api/ingest/status for progress.
    """
    _auth_check(request)

    # Reject if a job is already running
    if _current_job.get("status") == "running":
        return {
            "status": "already_running",
            "job_id": _current_job.get("job_id"),
            "message": "An index rebuild is already in progress.",
        }

    job_id = str(uuid.uuid4())
    _current_job.clear()
    _current_job.update({
        "job_id": job_id,
        "status": "queued",
        "queued_at": datetime.now(timezone.utc).isoformat(),
    })

    supabase = get_supabase()
    if supabase:
        try:
            supabase.table("ingest_jobs").insert({
                "id": job_id,
                "status": "queued",
            }).execute()
        except Exception:
            pass

    asyncio.create_task(_run_job(job_id))
    return {"status": "accepted", "job_id": job_id, "message": "Index rebuild started. Poll /api/ingest/status for progress."}


@router.get("/api/ingest/status")
async def ingest_status(request: Request):
    """Return status of the most recent ingest job."""
    _auth_check(request)
    if not _current_job:
        return {"status": "idle", "message": "No ingest job has run since last restart."}
    return _current_job
