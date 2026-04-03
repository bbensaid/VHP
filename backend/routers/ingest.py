"""
backend/routers/ingest.py
──────────────────────────
/api/ingest        — enqueue a content re-index job (returns 202 immediately)
/api/ingest/status — poll job status
"""

import asyncio
import hashlib
import hmac
import logging
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Request

from config import INGEST_SECRET
from services.indexing import build_index, incremental_reindex_document
from services.db import get_supabase
from routers.chat import set_index, get_index

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


@router.post("/api/ingest/webhook", status_code=202)
async def sanity_webhook(request: Request):
    """
    Sanity GROQ-Webhook endpoint for incremental document re-indexing.

    Sanity sends a POST when a document is created, updated, or deleted.
    The webhook HMAC signature is verified using INGEST_SECRET.

    Expected payload: { "_id": "<sanity doc id>", "_type": "...", ... }

    On receipt:
      - Deletes existing rag_documents chunks for this _id
      - Re-fetches the document from Sanity
      - Re-embeds and inserts new chunks (if doc still exists)

    Falls back to a full rebuild if no live index is available.
    """
    # Verify Sanity HMAC signature (Sanity sends X-Sanity-Signature: sha1=<hmac>)
    if INGEST_SECRET:
        sig_header = request.headers.get("X-Sanity-Signature", "")
        body = await request.body()
        mac = hmac.new(INGEST_SECRET.encode(), body, hashlib.sha1)
        expected = "sha1=" + mac.hexdigest()
        if not hmac.compare_digest(expected, sig_header):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")
        import json as _json
        payload = _json.loads(body)
    else:
        payload = await request.json()

    doc_id = payload.get("_id", "")
    if not doc_id or doc_id.startswith("_"):
        # System documents (e.g. _type starting with sanity.) — ignore
        return {"status": "ignored", "reason": "system document"}

    log.info(f"🔔 Sanity webhook: doc_id={doc_id} type={payload.get('_type', '?')}")

    index = get_index()
    if index is None:
        log.warning("Webhook received but index not loaded — queuing full rebuild")
        asyncio.create_task(_run_job(str(uuid.uuid4())))
        return {"status": "queued_full_rebuild", "doc_id": doc_id}

    asyncio.create_task(_run_incremental(doc_id, index))
    return {"status": "accepted", "doc_id": doc_id, "mode": "incremental"}


async def _run_incremental(doc_id: str, index) -> None:
    """Background task: incremental re-index of a single document."""
    try:
        await incremental_reindex_document(doc_id, index)
    except Exception as e:
        log.error(f"Incremental reindex task failed for {doc_id}: {e}")
