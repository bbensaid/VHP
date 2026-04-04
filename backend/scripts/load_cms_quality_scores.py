"""
backend/scripts/load_cms_quality_scores.py
──────────────────────────────────────────
Downloads the CMS Hospital Compare Overall Star Rating dataset and updates
the `quality_score` column in the Supabase `hospitals` table.

CMS publishes HCAHPS overall star ratings (1–5 stars) for acute care hospitals.
We map this to a 0–100 quality score (star × 20) for use in the dashboard.

Data source: CMS Hospital General Information (updated quarterly)
  https://data.cms.gov/provider-data/dataset/xubh-q36u

Usage:
  python -m scripts.load_cms_quality_scores [--state VT] [--dry-run]

Flags:
  --state <code>  Only update hospitals in this state (2-letter code)
  --dry-run       Print mapped scores without writing to Supabase
"""

import argparse
import csv
import io
import logging
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("cms-quality")

# CMS Hospital General Information — includes overall star rating
HOSPITAL_GENERAL_URL = (
    "https://data.cms.gov/provider-data/api/1/datastore/sql"
    "?query=SELECT+provider_id,hospital_overall_rating,state"
    "+FROM+xubh-q36u"
    "&limit=6000"
    "&offset=0"
)

# Simpler direct CSV URL (fallback if SQL API is unavailable)
HOSPITAL_GENERAL_CSV = (
    "https://data.cms.gov/provider-data/sites/default/files/resources/"
    "092256becd267d9eeccf73bf7d16c46b_1709230831/Hospital_General_Information.csv"
)


def fetch_star_ratings(state_filter: str | None) -> dict[str, int]:
    """
    Returns a mapping of { cms_provider_id: quality_score (0–100) }
    by fetching CMS Hospital General Information.
    """
    log.info("Fetching CMS HCAHPS star ratings…")

    # Try the SQL API first
    url = HOSPITAL_GENERAL_URL
    if state_filter:
        url += f"+WHERE+state='{state_filter.upper()}'"

    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            data = __import__("json").loads(resp.read())
            rows = data if isinstance(data, list) else data.get("results", [])
    except Exception as e:
        log.warning(f"SQL API failed ({e}), trying CSV download…")
        rows = _fetch_csv_fallback(state_filter)

    ratings: dict[str, int] = {}
    for row in rows:
        provider_id = (row.get("provider_id") or row.get("Provider ID", "")).strip()
        star_raw    = (row.get("hospital_overall_rating") or row.get("Hospital overall rating", "")).strip()

        if not provider_id or not star_raw or star_raw.lower() in ("not available", "not applicable", ""):
            continue

        try:
            star = int(star_raw)
            if 1 <= star <= 5:
                ratings[provider_id] = star * 20  # Map 1–5 stars → 20–100
        except ValueError:
            continue

    log.info(f"Loaded {len(ratings)} star ratings from CMS")
    return ratings


def _fetch_csv_fallback(state_filter: str | None) -> list[dict]:
    """Fallback: download the full CSV and parse it."""
    with urllib.request.urlopen(HOSPITAL_GENERAL_CSV, timeout=60) as resp:
        text = resp.read().decode("utf-8-sig")  # BOM-aware for CMS CSVs

    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)
    if state_filter:
        rows = [r for r in rows if r.get("State", "").strip().upper() == state_filter.upper()]
    return rows


def update_quality_scores(ratings: dict[str, int], dry_run: bool = False) -> None:
    """Update quality_score in Supabase hospitals table for each matched provider."""
    if not ratings:
        log.warning("No ratings to update.")
        return

    if dry_run:
        log.info(f"[DRY RUN] Would update {len(ratings)} hospital quality scores")
        for pid, score in list(ratings.items())[:5]:
            print(f"  cms-{pid} → quality_score={score}")
        return

    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        log.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env")
        sys.exit(1)

    from supabase import create_client
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    updated = 0
    skipped = 0
    for provider_id, score in ratings.items():
        db_id = f"cms-{provider_id}"
        resp = supabase.table("hospitals") \
            .update({"quality_score": score}) \
            .eq("id", db_id) \
            .execute()
        if resp.data:
            updated += 1
        else:
            skipped += 1  # Hospital not in our DB (filtered out or different type)

    log.info(f"✅ Updated {updated} hospitals, skipped {skipped} (not in DB)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Update hospital quality scores from CMS HCAHPS")
    parser.add_argument("--state",   help="2-letter state code filter (e.g. VT)")
    parser.add_argument("--dry-run", action="store_true", help="Print without writing")
    args = parser.parse_args()

    ratings = fetch_star_ratings(args.state)
    update_quality_scores(ratings, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
