"""
Sourced per-state indicators: the same data as the website's fifty-state
dashboard (frontend/lib/data/state-indicators.json, built by
frontend/scripts/build-state-indicators.mjs, which also writes the copy in
backend/data/ that this module reads).

Replaces the "HTR Performance Index" table (state_performance_index), which
never existed in the live database and whose 0-100 composite was retired on the
website on 2026-10-17 because its values were hand-entered. No composite, no
"leading / at risk" label: each indicator is reported as its source reports it.
"""
from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path

_PATH = Path(__file__).resolve().parent.parent / "data" / "state-indicators.json"


@lru_cache(maxsize=1)
def load() -> dict:
    with open(_PATH, encoding="utf-8") as f:
        return json.load(f)


def _slug(s: str) -> str:
    return s.lower().strip().replace("_", " ").replace("-", " ")


def find(state: str) -> tuple[str, dict] | None:
    """Look up by postal code ('VT'), name ('Vermont') or slug ('new-york')."""
    states = load()["states"]
    q = state.strip()
    if q.upper() in states:
        return q.upper(), states[q.upper()]
    for code, row in states.items():
        if _slug(row["name"]) == _slug(q):
            return code, row
    return None


def as_record(code: str, row: dict) -> dict:
    """Flat, documented record for the public API."""
    b = row.get("brfss") or {}
    c = row.get("cms") or {}
    return {
        "state_code": code,
        "state_name": row["name"],
        "medicaid_expansion": row.get("medicaidExpansion"),
        "ahead_participant": row.get("ahead"),
        "rht_award_fy26_usd": row.get("rhtAwardFY26"),
        "brfss_year": b.get("year"),
        "insured_pct": b.get("insuredPct"),
        "cost_barrier_pct": b.get("costBarrierPct"),
        "routine_checkup_pct": b.get("checkupPct"),
        "has_personal_provider_pct": b.get("personalProviderPct"),
        "provider_gap_by_education_pts": b.get("providerGapEducation"),
        "hospitals": c.get("hospitals"),
        "critical_access_hospitals": c.get("criticalAccess"),
        "cms_rated_hospitals": c.get("ratedHospitals"),
        "cms_mean_star_rating": c.get("meanStarRating"),
    }


def sources() -> dict:
    d = load()
    return {"generated": d.get("generated"), "sources": d.get("sources")}


def describe(state: str) -> str:
    """Markdown summary for the AI Analyst, every figure with its source."""
    hit = find(state)
    if not hit:
        return f"No sourced indicators found for '{state}'. Use a US state name or postal code."
    code, row = hit
    src = load()["sources"]
    b = row.get("brfss") or {}
    c = row.get("cms") or {}
    lines = [f"## {row['name']} ({code}): sourced state indicators"]
    lines.append(f"- Medicaid expansion: {'yes' if row.get('medicaidExpansion') else 'no'} ({src['kff']['label']})")
    lines.append(f"- CMS AHEAD Model: {row['ahead'] if row.get('ahead') else 'not a participant'} ({src['ahead']['label']})")
    if row.get("rhtAwardFY26"):
        lines.append(f"- Rural Health Transformation award, FY2026: ${row['rhtAwardFY26']:,} ({src['rht']['label']})")
    if b:
        y = b.get("year")
        for key, label in [("insuredPct", "Adults with some form of health insurance"),
                           ("costBarrierPct", "Adults who needed a doctor in the past 12 months but could not go because of cost"),
                           ("checkupPct", "Adults with a routine checkup in the past year"), ("personalProviderPct", "Adults with a personal doctor or provider")]:
            if b.get(key) is not None:
                lines.append(f"- {label}: {b[key]}% (BRFSS {y})")
        if b.get("providerGapEducation") is not None:
            lines.append(f"- Gap in having a personal provider, college graduates vs. less than high school: {b['providerGapEducation']} points (BRFSS {y})")
    if c:
        lines.append(f"- Hospitals listed in CMS Care Compare (every CMS-registered hospital, so it can exceed a state's "
                     f"own count of community hospitals): {c.get('hospitals')} ({c.get('criticalAccess')} critical access); "
                     f"{c.get('ratedHospitals')} with a CMS star rating, mean {c.get('meanStarRating')} ({src['cms']['label']})")
    lines.append("\nSources: " + "; ".join(f"{v['label']} <{v['url']}>" for v in src.values()))
    lines.append("There is no composite score: each indicator is reported as its source reports it.")
    return "\n".join(lines)
