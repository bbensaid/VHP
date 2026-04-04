"""
backend/scripts/load_cms_hospitals.py
──────────────────────────────────────
Downloads the CMS Provider of Services (POS) file and loads short-term acute
care and critical access hospitals into the Supabase `hospitals` table.

CMS POS file: quarterly release, available at:
  https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/provider-of-services-file-hospital-non-hospital-facilities

Usage:
  python -m scripts.load_cms_hospitals [--state VT] [--limit 500]

Flags:
  --state <code>   Only load hospitals for this 2-letter state code (optional)
  --limit <n>      Max rows to upsert (default: all)
  --dry-run        Parse and print rows without writing to Supabase
"""

import argparse
import csv
import io
import logging
import os
import sys
import urllib.request
from pathlib import Path

# Allow running as a standalone script
sys.path.insert(0, str(Path(__file__).parent.parent))

from config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("cms-hospitals")

# ── CMS POS download URL ──────────────────────────────────────────────────────
# This URL points to the most recent Provider of Services flat file.
# CMS updates it quarterly; check data.cms.gov if this URL expires.
POS_URL = (
    "https://data.cms.gov/resource/fc9f-b161.csv"
    "?$limit=50000"
    "&$select=prvdr_num,fac_name,city_name,state_cd,"
    "prvdr_ctgry_cd,prvdr_ctgry_sbtyp_cd,"
    "bed_cnt,pgm_trmntn_cd"
)

# Provider category codes for hospitals
# 01 = Short-term acute care (urban), 02 = Long-term, 11 = Critical Access
HOSPITAL_CATEGORY_CODES = {"01", "11", "14"}  # 01=acute, 11=CAH, 14=rural PPS

CATEGORY_TO_TYPE = {
    "01": "Urban",
    "11": "Critical Access",
    "14": "Rural PPS",
}

# Map 2-letter state codes to the slug format used in the DB
STATE_CODE_TO_SLUG: dict[str, str] = {
    "AL": "alabama", "AK": "alaska", "AZ": "arizona", "AR": "arkansas",
    "CA": "california", "CO": "colorado", "CT": "connecticut", "DE": "delaware",
    "FL": "florida", "GA": "georgia", "HI": "hawaii", "ID": "idaho",
    "IL": "illinois", "IN": "indiana", "IA": "iowa", "KS": "kansas",
    "KY": "kentucky", "LA": "louisiana", "ME": "maine", "MD": "maryland",
    "MA": "massachusetts", "MI": "michigan", "MN": "minnesota", "MS": "mississippi",
    "MO": "missouri", "MT": "montana", "NE": "nebraska", "NV": "nevada",
    "NH": "new-hampshire", "NJ": "new-jersey", "NM": "new-mexico", "NY": "new-york",
    "NC": "north-carolina", "ND": "north-dakota", "OH": "ohio", "OK": "oklahoma",
    "OR": "oregon", "PA": "pennsylvania", "RI": "rhode-island", "SC": "south-carolina",
    "SD": "south-dakota", "TN": "tennessee", "TX": "texas", "UT": "utah",
    "VT": "vermont", "VA": "virginia", "WA": "washington", "WV": "west-virginia",
    "WI": "wisconsin", "WY": "wyoming", "DC": "district-of-columbia",
}


def fetch_pos_csv(state_filter: str | None) -> list[dict]:
    """Download CMS POS file and return filtered hospital rows."""
    url = POS_URL
    if state_filter:
        url += f"&state_cd={state_filter.upper()}"

    log.info(f"Fetching CMS POS file: {url[:80]}…")
    with urllib.request.urlopen(url, timeout=60) as resp:
        raw = resp.read().decode("utf-8")

    reader = csv.DictReader(io.StringIO(raw))
    rows = []
    for row in reader:
        cat = row.get("prvdr_ctgry_cd", "").strip()
        if cat not in HOSPITAL_CATEGORY_CODES:
            continue
        # Skip terminated providers (pgm_trmntn_cd != blank/00)
        term = row.get("pgm_trmntn_cd", "").strip()
        if term and term != "00":
            continue
        rows.append(row)

    log.info(f"Found {len(rows)} active hospitals in POS file")
    return rows


def transform(rows: list[dict]) -> list[dict]:
    """Transform CMS POS rows into our hospitals table schema."""
    records = []
    for row in rows:
        prvdr_num = row.get("prvdr_num", "").strip()
        state_cd  = row.get("state_cd", "").strip().upper()
        cat       = row.get("prvdr_ctgry_cd", "").strip()
        name      = row.get("fac_name", "").strip().title()
        city      = row.get("city_name", "").strip().title()
        beds_raw  = row.get("bed_cnt", "").strip()

        state_slug = STATE_CODE_TO_SLUG.get(state_cd)
        if not state_slug or not prvdr_num:
            continue

        beds = int(beds_raw) if beds_raw.isdigit() else 0
        # Estimate discharges from beds (rough: ~60% occupancy, 4-day avg stay, 365 days)
        estimated_discharges = int(beds * 0.60 * 365 / 4) if beds > 0 else 0

        records.append({
            "id":                 f"cms-{prvdr_num}",
            "name":               name or "Unknown",
            "city":               city or "Unknown",
            "state_id":           state_slug,
            "state_code":         state_cd,
            "hospital_type":      CATEGORY_TO_TYPE.get(cat, "Urban"),
            "total_discharges":   estimated_discharges,
            "avg_length_of_stay": 4.2,   # CMS national average; replace with real data when available
            "quality_score":      75,    # Placeholder; update with HCAHPS/star rating data
        })

    return records


def upsert_to_supabase(records: list[dict], dry_run: bool = False) -> None:
    """Upsert hospital records into Supabase hospitals table."""
    if dry_run:
        log.info(f"[DRY RUN] Would upsert {len(records)} hospitals")
        for r in records[:5]:
            print(r)
        return

    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        log.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env")
        sys.exit(1)

    from supabase import create_client
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    # Upsert in batches of 500
    batch_size = 500
    total = 0
    for i in range(0, len(records), batch_size):
        batch = records[i : i + batch_size]
        resp = supabase.table("hospitals").upsert(batch, on_conflict="id").execute()
        total += len(batch)
        log.info(f"Upserted {total}/{len(records)} hospitals")

    log.info(f"✅ Done — {total} hospitals loaded into Supabase")


def main() -> None:
    parser = argparse.ArgumentParser(description="Load CMS hospital data into Supabase")
    parser.add_argument("--state",   help="2-letter state code filter (e.g. VT)")
    parser.add_argument("--limit",   type=int, help="Max hospitals to upsert")
    parser.add_argument("--dry-run", action="store_true", help="Print rows without writing")
    args = parser.parse_args()

    rows    = fetch_pos_csv(args.state)
    records = transform(rows)

    if args.limit:
        records = records[: args.limit]

    log.info(f"Upserting {len(records)} hospitals…")
    upsert_to_supabase(records, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
