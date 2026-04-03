"""
backend/scripts/sync_hospitals.py
──────────────────────────────────
Downloads the CMS Provider of Services (POS) file and syncs hospital data
into the hospitals_cms Supabase table.

Data source:
    CMS Provider of Services File — Short-Term Acute Care Hospitals
    https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/provider-of-services-file-hospital-non-hospital-facilities

Also cross-references:
    CMS Hospital Compare — Overall star ratings and quality measures
    https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0

Usage:
    python backend/scripts/sync_hospitals.py
    python backend/scripts/sync_hospitals.py --state vermont

    # Quarterly Railway cron: 0 5 2 */3 * (day 2 of Jan, Apr, Jul, Oct)

Prerequisites:
    pip install httpx supabase python-dotenv

Environment variables (backend/.env):
    SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY
"""

import asyncio
import argparse
import csv
import io
import logging
import os
import sys
from pathlib import Path
from typing import Optional

import httpx
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

log = logging.getLogger("htr-hospital-sync")
logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")

SUPABASE_URL         = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

# CMS data endpoints
CMS_POS_URL = (
    "https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/"
    "provider-of-services-file-hospital-non-hospital-facilities/data.csv"
)
CMS_COMPARE_URL = (
    "https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0"
)

# Platform's state slug mapping
STATE_SLUGS = {
    "AL": "alabama",      "AK": "alaska",       "AZ": "arizona",
    "AR": "arkansas",     "CA": "california",   "CO": "colorado",
    "CT": "connecticut",  "DE": "delaware",     "FL": "florida",
    "GA": "georgia",      "HI": "hawaii",       "ID": "idaho",
    "IL": "illinois",     "IN": "indiana",      "IA": "iowa",
    "KS": "kansas",       "KY": "kentucky",     "LA": "louisiana",
    "ME": "maine",        "MD": "maryland",     "MA": "massachusetts",
    "MI": "michigan",     "MN": "minnesota",    "MS": "mississippi",
    "MO": "missouri",     "MT": "montana",      "NE": "nebraska",
    "NV": "nevada",       "NH": "new-hampshire","NJ": "new-jersey",
    "NM": "new-mexico",   "NY": "new-york",     "NC": "north-carolina",
    "ND": "north-dakota", "OH": "ohio",         "OK": "oklahoma",
    "OR": "oregon",       "PA": "pennsylvania", "RI": "rhode-island",
    "SC": "south-carolina","SD": "south-dakota","TN": "tennessee",
    "TX": "texas",        "UT": "utah",         "VT": "vermont",
    "VA": "virginia",     "WA": "washington",   "WV": "west-virginia",
    "WI": "wisconsin",    "WY": "wyoming",      "DC": "dc",
}


async def fetch_pos_csv(client: httpx.AsyncClient, state_filter: Optional[str] = None) -> list[dict]:
    """
    Download CMS Provider of Services CSV and parse short-term acute care hospitals.
    The file is large (~30MB), streamed and parsed line-by-line.
    """
    log.info("Downloading CMS Provider of Services file (this may take 30–60s)...")
    rows = []

    try:
        async with client.stream("GET", CMS_POS_URL, timeout=120) as r:
            r.raise_for_status()
            content = await r.aread()

        log.info(f"Downloaded {len(content) / 1024 / 1024:.1f} MB")

        reader = csv.DictReader(io.StringIO(content.decode("latin-1")))
        for row in reader:
            # Filter to short-term acute care hospitals only
            facility_type = row.get("PRVDR_CTGRY_CD", "").strip()
            state_abbr    = row.get("STATE_CD", "").strip()
            status        = row.get("CRTFCTN_STUS_CD", "").strip()

            # 01 = Short-Term Acute Care; skip SNF, LTC, rehab, etc.
            if facility_type not in ("01",):
                continue
            # Skip inactive certifications
            if status not in ("A",):
                continue
            # Apply optional state filter
            if state_filter and STATE_SLUGS.get(state_abbr) != state_filter:
                continue

            try:
                beds = int(row.get("BED_CNT", "0") or "0")
            except ValueError:
                beds = 0

            rows.append({
                "cms_provider_id":     row.get("PRVDR_NUM", "").strip(),
                "name":                row.get("FAC_NAME", "").strip().title(),
                "state":               STATE_SLUGS.get(state_abbr, state_abbr.lower()),
                "city":                row.get("CITY_NAME", "").strip().title(),
                "county":              row.get("CNTY_NAME", "").strip().title(),
                "zip":                 row.get("ZIP_CD", "").strip(),
                "hospital_type":       "Short-Term Acute Care",
                "ownership":           row.get("GNRL_CNTL_TYPE_CD", "").strip(),
                "beds":                beds if beds > 0 else None,
                "emergency_services":  row.get("EMER_ROOM_SRVC_CD", "0") == "1",
                "data_year":           2024,
            })

        log.info(f"Parsed {len(rows)} short-term acute care hospitals")
        return rows

    except Exception as e:
        log.error(f"CMS POS download failed: {e}")
        return []


async def fetch_star_ratings(client: httpx.AsyncClient, provider_ids: list[str]) -> dict[str, dict]:
    """
    Fetch CMS Hospital Compare overall star ratings for a list of provider IDs.
    Returns: { provider_id: { cms_star_rating, readmission_rate, mortality_rate } }
    """
    log.info("Fetching Hospital Compare star ratings...")
    results = {}

    try:
        # CMS Hospital Compare API — query in batches of 100
        for i in range(0, len(provider_ids), 100):
            batch = provider_ids[i:i + 100]
            conditions = [{"property": "provider_id", "value": pid, "operator": "="} for pid in batch]

            payload = {
                "conditions": conditions,
                "limit": 100,
                "offset": 0,
            }
            r = await client.post(CMS_COMPARE_URL, json=payload, timeout=30)
            if not r.is_success:
                continue

            for record in r.json().get("results", []):
                pid = record.get("provider_id", "")
                if pid:
                    results[pid] = {
                        "cms_star_rating": _safe_int(record.get("hospital_overall_rating")),
                        "readmission_rate": _safe_float(record.get("rate_of_readmission_after_discharge_from_hospital_30_day_death_rate")),
                        "mortality_rate":   _safe_float(record.get("death_rate_for_heart_failure_patients")),
                    }

        log.info(f"Fetched star ratings for {len(results)} hospitals")
        return results

    except Exception as e:
        log.warning(f"Hospital Compare API unavailable: {e}")
        return {}


def _safe_int(v) -> Optional[int]:
    try:
        return int(v) if v and str(v).strip() not in ("", "Not Available", "N/A") else None
    except (ValueError, TypeError):
        return None


def _safe_float(v) -> Optional[float]:
    try:
        return round(float(v), 2) if v and str(v).strip() not in ("", "Not Available", "N/A") else None
    except (ValueError, TypeError):
        return None


async def upsert_hospitals(rows: list[dict]) -> None:
    """Upsert hospital rows into hospitals_cms via Supabase REST API."""
    if not rows:
        log.info("No hospital rows to upsert")
        return

    headers = {
        "apikey":        SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type":  "application/json",
        "Prefer":        "resolution=merge-duplicates",
    }
    url = f"{SUPABASE_URL}/rest/v1/hospitals_cms"

    async with httpx.AsyncClient() as client:
        total = 0
        for i in range(0, len(rows), 100):
            batch = rows[i:i + 100]
            clean = [{k: v for k, v in row.items() if v is not None} for row in batch]
            r = await client.post(url, json=clean, headers=headers, timeout=30)
            if r.status_code not in (200, 201):
                log.error(f"Upsert error: {r.status_code} {r.text[:200]}")
            else:
                total += len(batch)

        log.info(f"Upserted {total} hospital records")


async def main() -> None:
    parser = argparse.ArgumentParser(description="Sync CMS hospital data to Supabase")
    parser.add_argument("--state", type=str, default=None,
                        help="Limit sync to a single state slug, e.g. 'vermont'")
    args = parser.parse_args()

    async with httpx.AsyncClient(
        headers={"User-Agent": "HTR-Platform/4.3.0 (hospital-data-sync)"},
        follow_redirects=True,
    ) as client:
        # 1. Download POS file
        hospitals = await fetch_pos_csv(client, state_filter=args.state)
        if not hospitals:
            log.error("No hospital data fetched — aborting")
            sys.exit(1)

        # 2. Enrich with star ratings
        provider_ids = [h["cms_provider_id"] for h in hospitals if h["cms_provider_id"]]
        ratings = await fetch_star_ratings(client, provider_ids)

        # 3. Merge ratings into hospital rows
        for h in hospitals:
            pid = h.get("cms_provider_id", "")
            if pid in ratings:
                h.update(ratings[pid])

    # 4. Upsert to Supabase
    await upsert_hospitals(hospitals)
    log.info(f"Hospital sync complete — {len(hospitals)} facilities processed")


if __name__ == "__main__":
    asyncio.run(main())
