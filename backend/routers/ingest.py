"""
backend/routers/ingest.py
──────────────────────────
/api/ingest        — enqueue a content re-index job (returns 202 immediately)
/api/ingest/status — poll job status
"""

import asyncio
import hmac
import logging
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Request

from config import INGEST_SECRET
from routers.chat import get_index, set_index
from services.db import get_supabase
from services.indexing import build_index, incremental_reindex_document

log    = logging.getLogger("htr-brain")
router = APIRouter()

_index_lock = asyncio.Lock()

# In-memory job state (also written to Supabase ingest_jobs if available)
_current_job: dict = {}


def _auth_check(request: Request) -> None:
    # Fail closed: with no secret configured these endpoints used to accept
    # anyone, so a stranger could start a full library rebuild on the server.
    if not INGEST_SECRET:
        raise HTTPException(status_code=503, detail="Ingest is disabled: INGEST_SECRET is not set")
    auth = request.headers.get("Authorization", "")
    if not hmac.compare_digest(auth, f"Bearer {INGEST_SECRET}"):
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
    Incremental re-index of one Sanity document.

    Sanity does not call this directly. Sanity calls the website's
    /api/webhooks/sanity, which checks Sanity's own signature
    (sanity-webhook-signature) and then forwards here with
    Authorization: Bearer <INGEST_SECRET>.

    Expected payload: { "_id": "<sanity doc id>", "_type": "...", ... }

    On receipt:
      - Deletes this document's existing passages from the library
      - Re-fetches the document from Sanity
      - Re-embeds and inserts new passages (if the doc still exists)

    Falls back to a full rebuild if no live index is available.
    """
    _auth_check(request)
    payload = await request.json()

    doc_id = payload.get("_id", "")
    if not doc_id or doc_id.startswith("_") or doc_id.startswith("drafts."):
        # System documents and unpublished drafts are never indexed
        return {"status": "ignored", "reason": "system or draft document"}

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
