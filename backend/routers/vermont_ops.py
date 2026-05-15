"""
backend/routers/vermont_ops.py
───────────────────────────────
Vermont operational endpoints:

  GET  /api/vermont/bed-capacity          — all hospital bed counts (live from Supabase + static fallback)
  PATCH /api/vermont/bed-capacity/{id}    — update one hospital's bed counts (admin/professional only)
  POST  /api/vermont/transfer-log         — log a completed transfer request
  GET   /api/vermont/transfer-log         — retrieve recent transfer logs
  POST  /api/vermont/flags                — flag a hospital/issue for AHS review
  GET   /api/vermont/flags                — retrieve open flags
  PATCH /api/vermont/flags/{id}           — resolve or update a flag
  GET   /api/vermont/alerts               — active capacity alerts (beds at critical threshold)
"""

import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from services.auth import AuthedUser, require_subscriber
from services.db import get_supabase

log = logging.getLogger("htr-brain")
router = APIRouter()

# ─── Static fallback — mirrors system-vitals-data.ts ─────────────────────────

_STATIC_BEDS = {
    "uvmmc":        {"name": "UVM Medical Center",                  "icu_total": 32,  "icu_avail": 1,  "medsurg_total": 180, "medsurg_avail": 12, "behavioral_total": 24, "behavioral_avail": 4,  "snf_total": 0,  "snf_avail": 0},
    "dhmc":         {"name": "Dartmouth-Hitchcock (VT patients)",   "icu_total": 40,  "icu_avail": 6,  "medsurg_total": 160, "medsurg_avail": 22, "behavioral_total": 18, "behavioral_avail": 2,  "snf_total": 0,  "snf_avail": 0},
    "cvmc":         {"name": "Central Vermont Medical Center",       "icu_total": 12,  "icu_avail": 4,  "medsurg_total": 68,  "medsurg_avail": 18, "behavioral_total": 10, "behavioral_avail": 3,  "snf_total": 20, "snf_avail": 7},
    "svmc":         {"name": "Southwestern Vermont Medical Center",  "icu_total": 8,   "icu_avail": 3,  "medsurg_total": 52,  "medsurg_avail": 11, "behavioral_total": 6,  "behavioral_avail": 1,  "snf_total": 14, "snf_avail": 5},
    "rrmc":         {"name": "Rutland Regional Medical Center",      "icu_total": 10,  "icu_avail": 2,  "medsurg_total": 72,  "medsurg_avail": 9,  "behavioral_total": 8,  "behavioral_avail": 0,  "snf_total": 18, "snf_avail": 4},
    "nvrh":         {"name": "Northeastern Vermont Regional",        "icu_total": 4,   "icu_avail": 2,  "medsurg_total": 25,  "medsurg_avail": 6,  "behavioral_total": 4,  "behavioral_avail": 1,  "snf_total": 10, "snf_avail": 3},
    "nch":          {"name": "North Country Hospital",               "icu_total": 4,   "icu_avail": 1,  "medsurg_total": 25,  "medsurg_avail": 9,  "behavioral_total": 4,  "behavioral_avail": 2,  "snf_total": 8,  "snf_avail": 2},
    "porter":       {"name": "Porter Medical Center",                "icu_total": 4,   "icu_avail": 3,  "medsurg_total": 25,  "medsurg_avail": 11, "behavioral_total": 0,  "behavioral_avail": 0,  "snf_total": 10, "snf_avail": 6},
    "springfield":  {"name": "Springfield Hospital",                 "icu_total": 2,   "icu_avail": 0,  "medsurg_total": 25,  "medsurg_avail": 3,  "behavioral_total": 0,  "behavioral_avail": 0,  "snf_total": 6,  "snf_avail": 1},
    "gifford":      {"name": "Gifford Medical Center",               "icu_total": 4,   "icu_avail": 2,  "medsurg_total": 25,  "medsurg_avail": 8,  "behavioral_total": 4,  "behavioral_avail": 2,  "snf_total": 12, "snf_avail": 5},
    "mah":          {"name": "Mt. Ascutney Hospital",                "icu_total": 2,   "icu_avail": 1,  "medsurg_total": 18,  "medsurg_avail": 5,  "behavioral_total": 0,  "behavioral_avail": 0,  "snf_total": 14, "snf_avail": 7},
    "bmh":          {"name": "Brattleboro Memorial Hospital",        "icu_total": 4,   "icu_avail": 2,  "medsurg_total": 37,  "medsurg_avail": 7,  "behavioral_total": 8,  "behavioral_avail": 1,  "snf_total": 0,  "snf_avail": 0},
    "grace_cottage":{"name": "Grace Cottage Hospital",               "icu_total": 0,   "icu_avail": 0,  "medsurg_total": 19,  "medsurg_avail": 6,  "behavioral_total": 0,  "behavioral_avail": 0,  "snf_total": 10, "snf_avail": 4},
    "copley":       {"name": "Copley Hospital",                      "icu_total": 4,   "icu_avail": 2,  "medsurg_total": 25,  "medsurg_avail": 9,  "behavioral_total": 4,  "behavioral_avail": 1,  "snf_total": 8,  "snf_avail": 3},
}

_ALERT_THRESHOLDS = {"icu": 0.05, "medsurg": 0.05, "behavioral": 0.10, "snf": 0.10}


def _merge_with_live(static: dict) -> list[dict]:
    """Merge static baseline with any live Supabase rows. Live rows win."""
    supabase = get_supabase()
    live: dict = {}
    if supabase:
        try:
            res = supabase.table("vt_bed_capacity").select("*").execute()
            for row in (res.data or []):
                live[row["hospital_id"]] = row
        except Exception as e:
            log.debug(f"vt_bed_capacity read failed: {e}")

    result = []
    for hid, base in static.items():
        row = {**base, "hospital_id": hid, "source": "baseline", "updated_at": None}
        if hid in live:
            lv = live[hid]
            for field in ("icu_total", "icu_avail", "medsurg_total", "medsurg_avail",
                          "behavioral_total", "behavioral_avail", "snf_total", "snf_avail"):
                if field in lv and lv[field] is not None:
                    row[field] = lv[field]
            row["source"] = "live"
            row["updated_at"] = lv.get("updated_at")
            row["updated_by"] = lv.get("updated_by")
        result.append(row)
    return result


# ─── Pydantic models ──────────────────────────────────────────────────────────

class BedUpdateRequest(BaseModel):
    icu_avail:         Optional[int] = None
    icu_total:         Optional[int] = None
    medsurg_avail:     Optional[int] = None
    medsurg_total:     Optional[int] = None
    behavioral_avail:  Optional[int] = None
    behavioral_total:  Optional[int] = None
    snf_avail:         Optional[int] = None
    snf_total:         Optional[int] = None
    notes:             Optional[str] = None


class TransferLogRequest(BaseModel):
    from_hospital:  str
    to_hospital:    str
    patient_label:  str          # anonymised e.g. "Patient A"
    acuity:         str          # icu | medsurg | behavioral | snf
    specialty:      Optional[str] = None
    status:         str = "initiated"   # initiated | confirmed | completed | cancelled
    notes:          Optional[str] = None


class FlagRequest(BaseModel):
    hospital_id:    Optional[str] = None
    category:       str           # capacity | financial | staffing | transfer | other
    title:          str
    description:    str
    severity:       str = "medium"  # low | medium | high | critical
    assigned_to:    Optional[str] = None


class FlagUpdateRequest(BaseModel):
    status:         Optional[str] = None   # open | in_progress | resolved
    assigned_to:    Optional[str] = None
    resolution:     Optional[str] = None


# ─── Endpoints ────────────────────────────────────────────────────────────────

@router.get("/vermont/bed-capacity")
async def get_bed_capacity(user: AuthedUser = Depends(require_subscriber)):
    """Return all Vermont hospital bed counts, merging live Supabase data over static baseline."""
    hospitals = _merge_with_live(_STATIC_BEDS)
    return {"hospitals": hospitals, "count": len(hospitals)}


@router.patch("/vermont/bed-capacity/{hospital_id}")
async def update_bed_capacity(
    hospital_id: str,
    body: BedUpdateRequest,
    user: AuthedUser = Depends(require_subscriber),
):
    """Update bed counts for a hospital. Creates or upserts the Supabase row."""
    if hospital_id not in _STATIC_BEDS:
        raise HTTPException(status_code=404, detail=f"Hospital '{hospital_id}' not found.")

    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    now = datetime.now(timezone.utc).isoformat()
    update_data = {
        "hospital_id": hospital_id,
        "updated_at":  now,
        "updated_by":  user.sub,
    }
    for field in ("icu_avail", "icu_total", "medsurg_avail", "medsurg_total",
                  "behavioral_avail", "behavioral_total", "snf_avail", "snf_total", "notes"):
        val = getattr(body, field, None)
        if val is not None:
            update_data[field] = val

    try:
        res = supabase.table("vt_bed_capacity").upsert(update_data, on_conflict="hospital_id").execute()
        log.info(f"Bed capacity updated: {hospital_id} by {user.sub}")

        # Check if this update triggers a critical alert and write it
        for bed_type in ("icu", "medsurg", "behavioral", "snf"):
            avail_field = f"{bed_type}_avail"
            total_field = f"{bed_type}_total"
            avail = update_data.get(avail_field) or _STATIC_BEDS[hospital_id].get(avail_field, 0)
            total = update_data.get(total_field) or _STATIC_BEDS[hospital_id].get(total_field, 0)
            if total > 0 and avail / total <= _ALERT_THRESHOLDS.get(bed_type, 0.05):
                _write_capacity_alert(supabase, hospital_id, bed_type, avail, total)

        return {"ok": True, "hospital_id": hospital_id, "updated_at": now}
    except Exception as e:
        log.error(f"Bed capacity update failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


def _write_capacity_alert(supabase, hospital_id: str, bed_type: str, avail: int, total: int):
    """Write a capacity alert to Supabase (non-fatal if it fails)."""
    try:
        hname = _STATIC_BEDS[hospital_id]["name"]
        pct = int((avail / total) * 100) if total > 0 else 0
        supabase.table("vt_capacity_alerts").upsert({
            "hospital_id": hospital_id,
            "bed_type":    bed_type,
            "avail":       avail,
            "total":       total,
            "pct":         pct,
            "severity":    "critical" if pct < 5 else "warning",
            "message":     f"{hname} {bed_type.upper()} at {pct}% capacity ({avail}/{total} beds available)",
            "resolved":    False,
            "created_at":  datetime.now(timezone.utc).isoformat(),
        }, on_conflict="hospital_id,bed_type").execute()
    except Exception as e:
        log.debug(f"Alert write failed (non-fatal): {e}")


@router.get("/vermont/alerts")
async def get_capacity_alerts(user: AuthedUser = Depends(require_subscriber)):
    """Return active (unresolved) capacity alerts."""
    supabase = get_supabase()
    if not supabase:
        # Compute alerts from static data as fallback
        alerts = []
        for hid, beds in _STATIC_BEDS.items():
            for bt in ("icu", "medsurg", "behavioral", "snf"):
                total = beds.get(f"{bt}_total", 0)
                avail = beds.get(f"{bt}_avail", 0)
                if total > 0 and avail / total <= _ALERT_THRESHOLDS.get(bt, 0.05):
                    pct = int((avail / total) * 100)
                    alerts.append({
                        "hospital_id": hid,
                        "hospital_name": beds["name"],
                        "bed_type": bt,
                        "avail": avail,
                        "total": total,
                        "pct": pct,
                        "severity": "critical" if pct < 5 else "warning",
                        "source": "computed",
                    })
        return {"alerts": alerts}

    try:
        res = supabase.table("vt_capacity_alerts") \
            .select("*").eq("resolved", False).order("created_at", desc=True).execute()
        alerts = res.data or []
        # Enrich with hospital name
        for a in alerts:
            a["hospital_name"] = _STATIC_BEDS.get(a.get("hospital_id", ""), {}).get("name", a.get("hospital_id", ""))
        return {"alerts": alerts}
    except Exception as e:
        log.warning(f"Alert fetch failed: {e}")
        return {"alerts": []}


@router.post("/vermont/transfer-log")
async def log_transfer(body: TransferLogRequest, user: AuthedUser = Depends(require_subscriber)):
    """Log a transfer initiation or completion."""
    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    row = {
        "from_hospital": body.from_hospital,
        "to_hospital":   body.to_hospital,
        "patient_label": body.patient_label,
        "acuity":        body.acuity,
        "specialty":     body.specialty,
        "status":        body.status,
        "notes":         body.notes,
        "created_by":    user.sub,
        "created_at":    datetime.now(timezone.utc).isoformat(),
    }
    try:
        res = supabase.table("vt_transfer_log").insert(row).execute()
        record = res.data[0] if res.data else row
        log.info(f"Transfer logged: {body.from_hospital}→{body.to_hospital} by {user.sub}")
        return {"ok": True, "id": record.get("id"), "status": body.status}
    except Exception as e:
        log.error(f"Transfer log failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/vermont/transfer-log")
async def get_transfer_log(
    limit: int = 50,
    hospital_id: Optional[str] = None,
    user: AuthedUser = Depends(require_subscriber),
):
    """Retrieve recent transfer log entries, optionally filtered by hospital."""
    supabase = get_supabase()
    if not supabase:
        return {"transfers": [], "total": 0}

    try:
        q = supabase.table("vt_transfer_log").select("*").order("created_at", desc=True).limit(limit)
        if hospital_id:
            q = q.or_(f"from_hospital.eq.{hospital_id},to_hospital.eq.{hospital_id}")
        res = q.execute()
        return {"transfers": res.data or [], "total": len(res.data or [])}
    except Exception as e:
        log.warning(f"Transfer log fetch failed: {e}")
        return {"transfers": [], "total": 0}


@router.post("/vermont/flags")
async def create_flag(body: FlagRequest, user: AuthedUser = Depends(require_subscriber)):
    """Flag a hospital, capacity issue, or operational concern for AHS review."""
    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    row = {
        "hospital_id":  body.hospital_id,
        "category":     body.category,
        "title":        body.title,
        "description":  body.description,
        "severity":     body.severity,
        "status":       "open",
        "assigned_to":  body.assigned_to,
        "created_by":   user.sub,
        "created_at":   datetime.now(timezone.utc).isoformat(),
    }
    try:
        res = supabase.table("vt_flags").insert(row).execute()
        record = res.data[0] if res.data else row
        log.info(f"Flag created: {body.title} by {user.sub}")
        return {"ok": True, "id": record.get("id")}
    except Exception as e:
        log.error(f"Flag creation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/vermont/flags")
async def get_flags(
    status: Optional[str] = "open",
    hospital_id: Optional[str] = None,
    user: AuthedUser = Depends(require_subscriber),
):
    """Retrieve flags, optionally filtered by status or hospital."""
    supabase = get_supabase()
    if not supabase:
        return {"flags": [], "total": 0}

    try:
        q = supabase.table("vt_flags").select("*").order("created_at", desc=True)
        if status:
            q = q.eq("status", status)
        if hospital_id:
            q = q.eq("hospital_id", hospital_id)
        res = q.limit(100).execute()
        return {"flags": res.data or [], "total": len(res.data or [])}
    except Exception as e:
        log.warning(f"Flags fetch failed: {e}")
        return {"flags": [], "total": 0}


@router.patch("/vermont/flags/{flag_id}")
async def update_flag(
    flag_id: str,
    body: FlagUpdateRequest,
    user: AuthedUser = Depends(require_subscriber),
):
    """Update a flag's status, assignment, or resolution."""
    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    update_data = {"updated_by": user.sub, "updated_at": datetime.now(timezone.utc).isoformat()}
    if body.status:
        update_data["status"] = body.status
    if body.assigned_to:
        update_data["assigned_to"] = body.assigned_to
    if body.resolution:
        update_data["resolution"] = body.resolution

    try:
        supabase.table("vt_flags").update(update_data).eq("id", flag_id).execute()
        return {"ok": True, "id": flag_id}
    except Exception as e:
        log.error(f"Flag update failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
