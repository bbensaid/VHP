"""
backend/services/tools.py
──────────────────────────
LlamaIndex FunctionTools available to the agentic chat pipeline.

Tools:
  query_state_metrics(state)              — fetch live state performance data from Supabase
  list_research_lab_tools(topic)          — surface relevant Research Lab tools by topic keyword
  query_vermont_hospital_financials(name) — operating margin, loss, 2028 projection for a VT hospital
  query_vermont_bed_capacity(hospital, bed_type) — live/latest bed availability for VT hospitals
  query_act167_recommendations(hospital)  — Wyman report recommendations for a specific hospital
  find_best_transfer(from_hospital, acuity, specialty) — run transfer-routing algorithm
  query_vermont_hsa_population(hsa)       — HSA population, aging trend, decline projection
  query_vermont_system_summary()          — statewide summary: margins, beds, key metrics
"""

import logging
from typing import Optional

from llama_index.core.tools import FunctionTool

log = logging.getLogger("htr-brain")

# ─────────────────────────────────────────────────────────────────────────────
# VERMONT HOSPITAL FINANCIAL DATA (from Wyman/GMCB report)
# ─────────────────────────────────────────────────────────────────────────────

_VT_HOSPITAL_FINANCIALS = {
    "uvmmc": {
        "name": "UVM Medical Center",
        "operating_margin_pct": 3.1,
        "annual_loss_m": 0,
        "projected_loss_2028_m": 105.0,
        "fy2025_budget_request_increase_m": 62.0,
        "category": "Significant Cost Reductions Needed",
        "affiliation": "UVM Health Network",
        "note": "75% of clinical physicians performing below 50th percentile productivity. Admin costs >400% of peer AMC benchmarks. Accounts for ~56% of Vermont's statewide commercial hospital spend.",
    },
    "cvmc": {
        "name": "Central Vermont Medical Center",
        "operating_margin_pct": -6.5,
        "annual_loss_m": 17.8,
        "projected_loss_2028_m": 44.0,
        "fy2025_budget_request_increase_m": 18.0,
        "category": "Changes to Existing Service Lines",
        "affiliation": "UVM Health Network",
        "note": "Potential to receive Gifford inpatient volume. COE for Geriatric Care, Infusion, Neurology, Psych-Adult, Radiation Therapy.",
    },
    "rrmc": {
        "name": "Rutland Regional Medical Center",
        "operating_margin_pct": 2.1,
        "annual_loss_m": 0,
        "projected_loss_2028_m": 20.6,
        "fy2025_budget_request_increase_m": 10.0,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Independent",
        "note": "COE for Acute General Surgery, Geriatric Care, Minimally Invasive Surgery, Neurology, Psych-Adult. Level II Trauma Center potential.",
    },
    "svmc": {
        "name": "Southwestern Vermont Medical Center",
        "operating_margin_pct": -3.8,
        "annual_loss_m": 7.4,
        "projected_loss_2028_m": 24.5,
        "fy2025_budget_request_increase_m": 6.6,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Dartmouth Health",
        "note": "COE for 9 specialties including Psych-Adult, Psych-Adolescent, Orthopedics. Adolescent mental health unit under construction.",
    },
    "nmc": {
        "name": "Northwestern Medical Center",
        "operating_margin_pct": -6.6,
        "annual_loss_m": 8.2,
        "projected_loss_2028_m": 20.9,
        "fy2025_budget_request_increase_m": 10.9,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Independent",
        "note": "Geriatric psychiatry unit pending AHS approval. COE for Cancer Surgery, Infusion, Neurology, Radiation Therapy.",
    },
    "nvrh": {
        "name": "Northeastern Vermont Regional Hospital",
        "operating_margin_pct": 0.5,
        "annual_loss_m": 0,
        "projected_loss_2028_m": 5.2,
        "fy2025_budget_request_increase_m": 2.1,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Independent",
        "note": "Will absorb North Country Hospital inpatient volume if NCH restructures. COE for Cancer Surgery, Infusion, Minimally Invasive, Radiation.",
    },
    "nch": {
        "name": "North Country Hospital",
        "operating_margin_pct": -8.9,
        "annual_loss_m": 8.8,
        "projected_loss_2028_m": 17.3,
        "fy2025_budget_request_increase_m": 8.7,
        "category": "Major Restructuring Needed",
        "affiliation": "Independent",
        "note": "5-year cumulative deficit $69M–$101M to break even. Options: REH conversion or CACC. Inpatients redirect to NVRH.",
    },
    "gifford": {
        "name": "Gifford Medical Center",
        "operating_margin_pct": -8.3,
        "annual_loss_m": 4.7,
        "projected_loss_2028_m": 1.3,
        "fy2025_budget_request_increase_m": 1.3,
        "category": "Major Restructuring Needed",
        "affiliation": "Independent (also FQHC)",
        "note": "Also an FQHC — REH designation may conflict. Options: convert IP beds to Mental Health/Memory Care, form consortium with CVMC for Hospital-at-Home.",
    },
    "grace_cottage": {
        "name": "Grace Cottage Hospital",
        "operating_margin_pct": -8.9,
        "annual_loss_m": 2.3,
        "projected_loss_2028_m": 4.6,
        "fy2025_budget_request_increase_m": 1.9,
        "category": "Major Restructuring Needed",
        "affiliation": "Independent",
        "note": "5-year deficit $17.8M–$32.5M to break even. 98 acute IP admissions in 2022 (32.9% preventable). Inpatients redirect to BMH.",
    },
    "springfield": {
        "name": "Springfield Hospital",
        "operating_margin_pct": -0.9,
        "annual_loss_m": 0.6,
        "projected_loss_2028_m": 5.0,
        "fy2025_budget_request_increase_m": 6.7,
        "category": "Major Restructuring Needed",
        "affiliation": "Independent",
        "note": "COE for Memory Care, Psych-Adult. IP beds to Mental Health or Memory Care. Inpatients to BMH. Join consortium with Grace Cottage and BMH.",
    },
    "bmh": {
        "name": "Brattleboro Memorial Hospital",
        "operating_margin_pct": -1.7,
        "annual_loss_m": 1.9,
        "projected_loss_2028_m": 12.4,
        "fy2025_budget_request_increase_m": 6.8,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Independent",
        "note": "Will absorb Grace Cottage and Springfield inpatients. COE for Acute General Surgery, Cancer Surgery, Robotic Surgery, Geriatric Care, Orthopedics, Rheumatology.",
    },
    "copley": {
        "name": "Copley Hospital",
        "operating_margin_pct": -1.8,
        "annual_loss_m": 1.7,
        "projected_loss_2028_m": 7.0,
        "fy2025_budget_request_increase_m": 6.9,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Independent",
        "note": "COE for Orthopedics, Rheumatology. Will receive orthopedic volume from Gifford and North Country.",
    },
    "mah": {
        "name": "Mt. Ascutney Hospital and Health Center",
        "operating_margin_pct": 2.0,
        "annual_loss_m": 0,
        "projected_loss_2028_m": 1.4,
        "fy2025_budget_request_increase_m": 1.9,
        "category": "Changes to Existing Service Lines",
        "affiliation": "Dartmouth Health",
        "note": "Predominantly rehab facility. COE for Rehabilitation. Future determined by Dartmouth Health system strategy.",
    },
    "porter": {
        "name": "Porter Medical Center",
        "operating_margin_pct": 7.6,
        "annual_loss_m": 0,
        "projected_loss_2028_m": 3.5,
        "fy2025_budget_request_increase_m": 1.2,
        "category": "Changes to Existing Service Lines",
        "affiliation": "UVM Health Network",
        "note": "Currently profitable. Middlebury HSA population projected at 66.1% over 65 by 2040 — highest in state.",
    },
}

_HOSPITAL_ALIASES = {
    "uvm": "uvmmc", "uvmmc": "uvmmc", "uvm medical": "uvmmc", "university of vermont": "uvmmc",
    "cvmc": "cvmc", "central vermont": "cvmc", "barre": "cvmc",
    "rrmc": "rrmc", "rutland": "rrmc", "rutland regional": "rrmc",
    "svmc": "svmc", "southwestern": "svmc", "bennington": "svmc",
    "nmc": "nmc", "northwestern": "nmc", "st albans": "nmc", "st. albans": "nmc",
    "nvrh": "nvrh", "northeastern": "nvrh", "st johnsbury": "nvrh", "st. johnsbury": "nvrh",
    "nch": "nch", "north country": "nch", "newport": "nch",
    "gifford": "gifford", "randolph": "gifford",
    "grace cottage": "grace_cottage", "gcottage": "grace_cottage", "townshend": "grace_cottage",
    "springfield": "springfield", "sph": "springfield",
    "bmh": "bmh", "brattleboro": "bmh", "brattleboro memorial": "bmh",
    "copley": "copley", "morrisville": "copley",
    "mah": "mah", "mt ascutney": "mah", "mount ascutney": "mah", "ascutney": "mah",
    "porter": "porter", "pmh": "porter", "middlebury": "porter",
}

# ─────────────────────────────────────────────────────────────────────────────
# HSA POPULATION DATA
# ─────────────────────────────────────────────────────────────────────────────

_VT_HSA_DATA = {
    "Burlington":          {"pop_2020": 189000, "pop_2040": 210000, "over65_pct_2040": 31, "trend": "growing",   "hospital": "UVMMC"},
    "Barre":               {"pop_2020": 65000,  "pop_2040": 62000,  "over65_pct_2040": 37, "trend": "declining", "hospital": "CVMC"},
    "Rutland":             {"pop_2020": 59000,  "pop_2040": 53000,  "over65_pct_2040": 36, "trend": "declining", "hospital": "RRMC"},
    "Bennington":          {"pop_2020": 48000,  "pop_2040": 46000,  "over65_pct_2040": 28, "trend": "declining", "hospital": "SVMC"},
    "St. Albans":          {"pop_2020": 42000,  "pop_2040": 41000,  "over65_pct_2040": 31, "trend": "stable",    "hospital": "NMC"},
    "St. Johnsbury":       {"pop_2020": 31000,  "pop_2040": 30000,  "over65_pct_2040": 29, "trend": "declining", "hospital": "NVRH"},
    "Newport":             {"pop_2020": 31000,  "pop_2040": 29000,  "over65_pct_2040": 36, "trend": "declining", "hospital": "NCH"},
    "Randolph":            {"pop_2020": 28000,  "pop_2040": 25000,  "over65_pct_2040": 38, "trend": "declining", "hospital": "Gifford"},
    "Brattleboro":         {"pop_2020": 39000,  "pop_2040": 31000,  "over65_pct_2040": 40, "trend": "declining", "hospital": "BMH / Grace Cottage"},
    "Springfield":         {"pop_2020": 27000,  "pop_2040": 24000,  "over65_pct_2040": 32, "trend": "declining", "hospital": "Springfield Hospital"},
    "Middlebury":          {"pop_2020": 31000,  "pop_2040": 30000,  "over65_pct_2040": 66, "trend": "stable",    "hospital": "Porter Medical Center"},
    "Morrisville":         {"pop_2020": 28000,  "pop_2040": 25000,  "over65_pct_2040": 31, "trend": "declining", "hospital": "Copley Hospital"},
    "White River Junction":{"pop_2020": 24000,  "pop_2040": 24000,  "over65_pct_2040": 40, "trend": "stable",    "hospital": "Mt. Ascutney / DHMC"},
}

# ─────────────────────────────────────────────────────────────────────────────
# TOOL 1: State metrics
# ─────────────────────────────────────────────────────────────────────────────

def query_state_metrics(state: str) -> str:
    """
    Retrieve health system performance metrics for a US state from the HTR database.

    Args:
        state: The US state name or abbreviation (e.g. "Vermont", "VT", "California").
    """
    from services.db import get_supabase
    supabase = get_supabase()
    if not supabase:
        return f"State metrics database unavailable. Cannot retrieve data for {state}."

    state_key = state.lower().strip().replace(" ", "_").replace("-", "_")
    try:
        res = supabase.table("state_performance_index") \
            .select("*").ilike("state_id", f"%{state_key}%").limit(1).execute()
        if not res.data:
            res = supabase.table("state_performance_index") \
                .select("*").ilike("state_name", f"%{state}%").limit(1).execute()
        if not res.data:
            return f"No performance data found for '{state}' in the HTR database."

        row = res.data[0]
        lines = [f"## HTR Performance Index: {row.get('state_name', state)}"]
        for field, label in [
            ("performance_score",   "Overall Performance Score"),
            ("cost_index",          "Cost Index"),
            ("quality_score",       "Quality Score"),
            ("access_score",        "Access Score"),
            ("equity_score",        "Equity Score"),
            ("innovation_score",    "Innovation Score"),
            ("preventive_care_rate","Preventive Care Rate"),
            ("uninsured_rate",      "Uninsured Rate"),
        ]:
            val = row.get(field)
            if val is not None:
                lines.append(f"- **{label}**: {val}")
        if row.get("data_year"):
            lines.append(f"\n*Data year: {row['data_year']}*")
        return "\n".join(lines)

    except Exception as e:
        log.warning(f"query_state_metrics error for {state}: {e}")
        return f"Error retrieving metrics for {state}: {e}"


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 2: Research lab tools
# ─────────────────────────────────────────────────────────────────────────────

_RESEARCH_LAB_TOOLS = [
    {"name": "FHIR Lab",                    "url": "/research-lab/interoperability",  "keywords": ["fhir", "interoperability", "cds hooks", "hl7", "api", "onc", "ehr"]},
    {"name": "Risk Stratification Engine",  "url": "/research-lab/interoperability",  "keywords": ["hcc", "risk", "stratification", "risk score", "chronic", "comorbidity"]},
    {"name": "APM Design Lab",              "url": "/research-lab/payment-models",     "keywords": ["apm", "alternative payment", "bundle", "episode", "value-based", "vbc", "p4p"]},
    {"name": "APM Shared Savings Calculator","url": "/research-lab/payment-models",   "keywords": ["shared savings", "mssp", "aco", "savings", "benchmark", "total cost of care"]},
    {"name": "Cost-Effectiveness Calculator","url": "/research-lab/payment-models",   "keywords": ["cost-effectiveness", "icer", "qaly", "cea", "willingness to pay"]},
    {"name": "Population Health Modeler",   "url": "/research-lab/population-equity", "keywords": ["population health", "markov", "disease model", "chronic disease", "epidemic"]},
    {"name": "Health Equity Studio",        "url": "/research-lab/population-equity", "keywords": ["equity", "sdoh", "social determinants", "disparity", "race", "income", "zip code"]},
    {"name": "Policy Simulator",            "url": "/research-lab/policy-quality",    "keywords": ["policy", "waiver", "1115", "global budget", "all-payer", "simulate", "medicaid"]},
    {"name": "Clinical Quality Optimizer",  "url": "/research-lab/policy-quality",    "keywords": ["hedis", "star ratings", "mips", "quality measure", "cms", "quality"]},
    {"name": "Hospital Financial Scorecard","url": "/research-lab/policy-quality",    "keywords": ["hospital finance", "operating margin", "revenue", "cost per discharge"]},
    {"name": "Actuarial Lab",               "url": "/research-lab/policy-quality",    "keywords": ["actuarial", "premium", "loss ratio", "mlr", "insurance", "claims"]},
    {"name": "AI Analytics Lab",            "url": "/research-lab/technology-ai",     "keywords": ["ai", "machine learning", "algorithm", "bias", "model performance"]},
    {"name": "Evidence Library",            "url": "/research-lab/knowledge-workspace","keywords": ["evidence", "systematic review", "literature", "meta-analysis"]},
    {"name": "Workforce Modeler",           "url": "/research-lab/knowledge-workspace","keywords": ["workforce", "staffing", "nursing", "physician", "shortage", "supply"]},
    {"name": "Vermont Bed Capacity & Transfer","url": "/bed-capacity",                "keywords": ["bed", "capacity", "transfer", "icu", "inpatient", "repatriation", "routing"]},
    {"name": "Act 167 Simulator",           "url": "/vermont-act-167/simulator",      "keywords": ["act 167", "vermont hospital", "restructuring", "coe", "center of excellence", "hsa", "regionalization"]},
    {"name": "Vermont RHT Program",         "url": "/vermont-rht-program",            "keywords": ["rht", "rural health transformation", "ahead", "vermont program", "tcoc"]},
]


def list_research_lab_tools(topic: str) -> str:
    """
    Find HTR Research Lab and platform tools relevant to a healthcare topic.

    Args:
        topic: A healthcare topic, task, or question.
    """
    topic_lower = topic.lower()
    matches = [t for t in _RESEARCH_LAB_TOOLS if any(kw in topic_lower for kw in t["keywords"])]

    if not matches:
        return f"No specific tools matched '{topic}'. Browse all tools at /research-lab."

    lines = [f"**Research Lab tools relevant to '{topic}':**"]
    seen: set = set()
    for tool in matches[:4]:
        if tool["url"] not in seen:
            lines.append(f"- [{tool['name']}]({tool['url']})")
            seen.add(tool["url"])
    lines.append("\nAll tools: [HTR Research Lab](/research-lab)")
    return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 3: Vermont hospital financials
# ─────────────────────────────────────────────────────────────────────────────

def _resolve_hospital(name: str) -> Optional[str]:
    name_lower = name.lower().strip()
    if name_lower in _HOSPITAL_ALIASES:
        return _HOSPITAL_ALIASES[name_lower]
    for alias, key in _HOSPITAL_ALIASES.items():
        if alias in name_lower or name_lower in alias:
            return key
    return None


def query_vermont_hospital_financials(hospital_name: str) -> str:
    """
    Retrieve financial performance data for a specific Vermont hospital from the
    Act 167 Oliver Wyman report and GMCB records.

    Args:
        hospital_name: Name or abbreviation (e.g. "UVMMC", "Gifford", "North Country").
    """
    key = _resolve_hospital(hospital_name)
    if not key or key not in _VT_HOSPITAL_FINANCIALS:
        available = ", ".join(sorted(set(_HOSPITAL_ALIASES.values())))
        return f"Hospital '{hospital_name}' not found. Available: {available}."

    h = _VT_HOSPITAL_FINANCIALS[key]
    margin = h["operating_margin_pct"]
    margin_str = f"+{margin}%" if margin >= 0 else f"{margin}%"
    loss_str = f"${h['annual_loss_m']}M loss" if h["annual_loss_m"] > 0 else "operating gain"

    return "\n".join([
        f"## {h['name']} — Financial Profile (Act 167 / GMCB)",
        f"- **Affiliation**: {h['affiliation']}",
        f"- **Restructuring category**: {h['category']}",
        f"- **2023 Operating Margin**: {margin_str} ({loss_str})",
        f"- **Projected 2028 Loss** (5% expense growth): ${h['projected_loss_2028_m']}M",
        f"- **FY2025 Budget Request Increase**: ${h['fy2025_budget_request_increase_m']}M",
        f"- **Strategic Context**: {h['note']}",
        f"\n🔗 [Act 167 Simulator](/vermont-act-167/simulator) · [Bed Capacity Tool](/bed-capacity)",
    ])


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 4: Vermont bed capacity
# ─────────────────────────────────────────────────────────────────────────────

_STATIC_BED_CAPACITY = {
    "uvmmc":        {"icu": (32, 1),  "medsurg": (180, 12), "behavioral": (24, 4), "snf": (0,  0)},
    "dhmc":         {"icu": (40, 6),  "medsurg": (160, 22), "behavioral": (18, 2), "snf": (0,  0)},
    "cvmc":         {"icu": (12, 4),  "medsurg": (68,  18), "behavioral": (10, 3), "snf": (20, 7)},
    "svmc":         {"icu": (8,  3),  "medsurg": (52,  11), "behavioral": (6,  1), "snf": (14, 5)},
    "rrmc":         {"icu": (10, 2),  "medsurg": (72,   9), "behavioral": (8,  0), "snf": (18, 4)},
    "nvrh":         {"icu": (4,  2),  "medsurg": (25,   6), "behavioral": (4,  1), "snf": (10, 3)},
    "nch":          {"icu": (4,  1),  "medsurg": (25,   9), "behavioral": (4,  2), "snf": (8,  2)},
    "porter":       {"icu": (4,  3),  "medsurg": (25,  11), "behavioral": (0,  0), "snf": (10, 6)},
    "springfield":  {"icu": (2,  0),  "medsurg": (25,   3), "behavioral": (0,  0), "snf": (6,  1)},
    "gifford":      {"icu": (4,  2),  "medsurg": (25,   8), "behavioral": (4,  2), "snf": (12, 5)},
    "mah":          {"icu": (2,  1),  "medsurg": (18,   5), "behavioral": (0,  0), "snf": (14, 7)},
    "bmh":          {"icu": (4,  2),  "medsurg": (37,   7), "behavioral": (8,  1), "snf": (0,  0)},
    "grace_cottage":{"icu": (0,  0),  "medsurg": (19,   6), "behavioral": (0,  0), "snf": (10, 4)},
    "copley":       {"icu": (4,  2),  "medsurg": (25,   9), "behavioral": (4,  1), "snf": (8,  3)},
}

_H_DISPLAY_NAMES = {k: v["name"] for k, v in _VT_HOSPITAL_FINANCIALS.items()}
_H_DISPLAY_NAMES["dhmc"] = "Dartmouth-Hitchcock (VT patients)"


def _fetch_live_beds() -> dict:
    from services.db import get_supabase
    supabase = get_supabase()
    if not supabase:
        return {}
    try:
        res = supabase.table("vt_bed_capacity").select("*").execute()
        return {row["hospital_id"]: row for row in (res.data or [])}
    except Exception as e:
        log.debug(f"vt_bed_capacity fetch failed (using static): {e}")
        return {}


def query_vermont_bed_capacity(hospital_name: str = "all", bed_type: str = "all") -> str:
    """
    Get current bed availability for Vermont hospitals. Checks Supabase for live
    updates first, falls back to baseline data from system-vitals-data.ts.

    Args:
        hospital_name: Hospital name/abbreviation or "all".
        bed_type: One of "icu", "medsurg", "behavioral", "snf", or "all".
    """
    live = _fetch_live_beds()
    bed_type_lower = bed_type.lower().strip()
    if bed_type_lower not in {"icu", "medsurg", "behavioral", "snf", "all"}:
        bed_type_lower = "all"

    def _fmt(hid: str) -> str:
        src = live.get(hid, {})
        beds = _STATIC_BED_CAPACITY.get(hid, {})
        hname = _H_DISPLAY_NAMES.get(hid, hid.upper())
        lines = [f"**{hname}**"]
        bkeys = ["icu", "medsurg", "behavioral", "snf"] if bed_type_lower == "all" else [bed_type_lower]
        for bk in bkeys:
            if bk in beds:
                total = src.get(f"{bk}_total", beds[bk][0])
                avail = src.get(f"{bk}_avail", beds[bk][1])
                if total == 0:
                    continue
                pct = avail / total
                status = "🔴 Critical" if pct < 0.05 else "🟡 Limited" if pct < 0.2 else "🟢 Available"
                lines.append(f"  - {bk.upper()}: {avail}/{total} {status}")
        source = "live" if hid in live else "baseline"
        lines.append(f"  *(source: {source})*")
        return "\n".join(lines)

    if hospital_name.lower() == "all":
        lines = ["## Vermont Statewide Bed Capacity\n"]
        for hid in _STATIC_BED_CAPACITY:
            lines.append(_fmt(hid))
            lines.append("")
        lines.append("🔗 [Live Bed Capacity & Transfer Tool](/bed-capacity)")
        return "\n".join(lines)

    key = _resolve_hospital(hospital_name)
    if not key or key not in _STATIC_BED_CAPACITY:
        return f"Hospital '{hospital_name}' not found. Use 'all' or try 'UVMMC', 'Gifford', 'North Country'."

    return _fmt(key) + "\n\n🔗 [Live Bed Capacity & Transfer Tool](/bed-capacity)"


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 5: Act 167 recommendations
# ─────────────────────────────────────────────────────────────────────────────

_ACT167_RECOMMENDATIONS = {
    "uvmmc": {
        "short_term": [
            "Engage external consultancy to reduce administrative costs (target: below peer AMC benchmarks within 18 months)",
            "Move physician clinical productivity to >60th Sullivan Cotter percentile",
            "Eliminate low-volume (<50 patients) sub-specialty service lines; refer out-of-state",
            "Reduce non-patient-care physician FTEs (currently 31% of total) to increase clinical access",
            "Stop small-volume kidney transplant program",
            "Accept ALL transfers from Vermont community hospitals without exception",
            "Improve access to routine specialist appointments to <4 weeks",
        ],
        "long_term": [
            "Develop Hospital-at-Home for Burlington metro",
            "Build centralized monitoring for IP beds across UVM network hospitals",
            "Develop rural primary care trainee rotations to community hospitals",
        ],
        "hsa_changes": "Burlington HSA is the only one projected to grow by 2040.",
    },
    "gifford": {
        "short_term": [
            "Stop colectomy, lysis of adhesions, repair of perforated peptic ulcer, hernias (except inguinal/femoral)",
            "Convert inpatient beds to Mental Health, Geriatric Psychiatry, or Memory Care",
            "Change ED staffing to non-physician model with support from CVMC",
            "Form consortium with CVMC for Hospital-at-Home and mobile rural clinics",
            "Combine back-office functions with New England Collaborative Network",
        ],
        "long_term": ["Consider REH or CACC conversion", "Develop PACE program", "Consider freestanding birthing center"],
        "hsa_changes": "Combine Randolph and Barre HSAs. Inpatients redirect to CVMC.",
    },
    "nch": {
        "short_term": [
            "Stop total joint replacement, spinal surgery, repair of perforated ulcer",
            "Shift routine birthing to NVRH (keep urgent/emergent)",
            "Change ED to non-physician model; consider Urgicare conversion",
            "Form consortium with NVRH for Hospital-at-Home",
            "Recruit primary care providers urgently",
        ],
        "long_term": ["Convert to REH or CACC", "Operate as NVRH ambulatory subunit"],
        "hsa_changes": "Combine Newport and St. Johnsbury HSAs. Inpatients redirect to NVRH.",
    },
    "grace_cottage": {
        "short_term": [
            "Shift all IP acute care to Brattleboro Memorial Hospital",
            "Convert inpatient beds to Mental Health, Geriatric Psychiatry, or Memory Care",
            "Consider Urgicare rather than full ED",
            "Form consortium with Springfield and BMH for Hospital-at-Home",
        ],
        "long_term": ["Operate as BMH ambulatory subunit", "Develop PACE program"],
        "hsa_changes": "Brattleboro HSA extended north. Inpatients redirect to BMH.",
    },
    "springfield": {
        "short_term": [
            "Stop colectomy, femoral hernia repair, lysis of adhesions, total hip replacements",
            "Expand IP psychiatry beds (adult and juvenile) — COE for Psych-Adult, Memory Care",
            "Joint venture ASC with Brattleboro Memorial",
            "Form consortium with Grace Cottage and BMH",
        ],
        "long_term": ["Convert to REH or CACC", "Operate as BMH ambulatory subunit"],
        "hsa_changes": "Combine Brattleboro and Springfield HSAs.",
    },
    "nvrh": {
        "short_term": [
            "Stop femoral hernia repair, lysis of adhesions, perforated ulcers, other hernias",
            "Expand telehealth for ED/UrgiCare and specialists",
            "Expand mobile health clinic to Newport HSA",
            "Form consortium with NCH and Gifford for Hospital-at-Home",
        ],
        "long_term": ["Start inpatient dialysis if/when NCH closes", "Grow OB or absorb OB volume from Newport"],
        "hsa_changes": "Combine St. Johnsbury and Newport HSAs.",
    },
    "rrmc": {
        "short_term": [
            "Implement cost reductions to break even at Medicare payment levels",
            "Evaluate expanded cancer services",
            "Tighten relationship with Rutland EMS and regionalize EMS transfers",
        ],
        "long_term": [
            "Consider Level II Trauma Center designation",
            "Develop OB capacity for Gifford HSA volume",
            "Consider Emergency General Surgery center",
            "Consider Center for Robotic Surgery",
        ],
        "hsa_changes": "No HSA merger recommended. Absorbs Gifford inpatients.",
    },
    "cvmc": {
        "short_term": [
            "Implement cost reductions to break even at Medicare payment levels",
            "Grow colectomy, femoral hernia repair, lysis of adhesions",
            "Recover OB services — increase certified midwife program",
            "Develop Hospital-at-Home with UVM",
        ],
        "long_term": [
            "Consider Level II / III Trauma Center",
            "Prepare for OB volume from Randolph and Morrisville HSAs",
            "Open ICU beds with UVM support",
            "Add inpatient dialysis capability",
        ],
        "hsa_changes": "Combine Randolph and Barre HSAs. CVMC absorbs Gifford inpatients.",
    },
    "bmh": {
        "short_term": [
            "Implement cost reductions to break even at Medicare payment levels",
            "Form consortium with Grace Cottage and Springfield for Hospital-at-Home",
            "Develop mobile rural clinics in combined HSA",
        ],
        "long_term": [
            "Grow inpatient psych capacity synergistic with Brattleboro Retreat",
            "Add IP dialysis", "Grow OB/GYN", "Grow orthopedics and acute general surgery",
        ],
        "hsa_changes": "Extend HSA north to Springfield. Absorb Grace Cottage and Springfield inpatients.",
    },
}


def query_act167_recommendations(hospital_name: str) -> str:
    """
    Retrieve Act 167 Oliver Wyman report recommendations for a specific Vermont hospital.

    Args:
        hospital_name: Name or abbreviation of the Vermont hospital.
    """
    key = _resolve_hospital(hospital_name)
    fin = _VT_HOSPITAL_FINANCIALS.get(key) if key else None
    recs = _ACT167_RECOMMENDATIONS.get(key) if key else None

    if not key or not fin:
        return (
            f"Hospital '{hospital_name}' not found. Try: UVMMC, Gifford, North Country, "
            "Grace Cottage, Springfield, NVRH, RRMC, CVMC, BMH, Copley, Porter, SVMC, NMC, Mt. Ascutney."
        )

    lines = [
        f"## Act 167 Recommendations: {fin['name']}",
        f"**Category**: {fin['category']}  |  **2023 Margin**: {fin['operating_margin_pct']}%\n",
    ]
    if recs:
        lines.append("### Short-Term (2025–2027)")
        for r in recs["short_term"]:
            lines.append(f"- {r}")
        if recs.get("long_term"):
            lines.append("\n### Long-Term (2028+)")
            for r in recs["long_term"]:
                lines.append(f"- {r}")
        if recs.get("hsa_changes"):
            lines.append(f"\n### HSA Reconfiguration\n{recs['hsa_changes']}")
    else:
        lines.append(f"*{fin['note']}*")

    lines.append(f"\n🔗 [Act 167 Simulator](/vermont-act-167/simulator)")
    return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 6: Find best transfer destination
# ─────────────────────────────────────────────────────────────────────────────

_DRIVE_TIMES: dict[tuple, int] = {
    ("uvmmc", "cvmc"): 40,  ("uvmmc", "svmc"): 130, ("uvmmc", "rrmc"): 65,
    ("uvmmc", "nvrh"): 95,  ("uvmmc", "nch"): 100,  ("uvmmc", "porter"): 35,
    ("uvmmc", "springfield"): 110, ("uvmmc", "gifford"): 55, ("uvmmc", "mah"): 90,
    ("uvmmc", "bmh"): 120,  ("uvmmc", "grace_cottage"): 130, ("uvmmc", "copley"): 55,
    ("cvmc",  "rrmc"): 55,  ("cvmc", "nvrh"): 75,   ("cvmc", "nch"): 85,
    ("cvmc",  "porter"): 55,("cvmc", "gifford"): 25, ("cvmc", "mah"): 70,
    ("cvmc",  "bmh"): 100,  ("cvmc", "copley"): 30,
    ("rrmc",  "nvrh"): 120, ("rrmc", "nch"): 130,   ("rrmc", "porter"): 75,
    ("rrmc",  "springfield"): 60, ("rrmc", "gifford"): 50, ("rrmc", "mah"): 55,
    ("rrmc",  "bmh"): 70,   ("rrmc", "copley"): 70,
    ("nvrh",  "nch"): 35,   ("nvrh", "gifford"): 75, ("nvrh", "mah"): 120, ("nvrh", "copley"): 80,
    ("nch",   "gifford"): 90, ("nch", "mah"): 130,  ("nch", "copley"): 90,
    ("gifford","mah"): 50,  ("gifford", "bmh"): 85, ("gifford", "copley"): 40,
    ("mah",   "bmh"): 55,   ("mah", "springfield"): 25,
    ("bmh",   "grace_cottage"): 20,
    ("springfield", "bmh"): 60,
}

_HOSPITAL_SPECIALTIES: dict[str, list] = {
    "uvmmc":        ["cardiac", "neuro", "ortho", "psych", "peds", "oncology", "trauma", "transplant"],
    "cvmc":         ["cardiac", "ortho", "neuro", "psych"],
    "rrmc":         ["cardiac", "ortho", "neuro", "psych"],
    "svmc":         ["cardiac", "ortho", "psych"],
    "nmc":          ["cardiac", "oncology"],
    "nvrh":         ["general"],
    "nch":          ["general"],
    "porter":       ["general"],
    "springfield":  ["psych", "general"],
    "gifford":      ["general"],
    "mah":          ["rehab", "general"],
    "bmh":          ["psych", "ortho", "general"],
    "grace_cottage":["snf", "general"],
    "copley":       ["ortho", "general"],
}


def _drive_time(a: str, b: str) -> int:
    if a == b:
        return 0
    return _DRIVE_TIMES.get((a, b), _DRIVE_TIMES.get((b, a), 120))


def find_best_transfer(from_hospital: str, acuity: str, specialty: str = "general") -> str:
    """
    Find the best hospital to receive a patient transfer from a Vermont hospital,
    scoring by bed availability, specialty match, and drive time.

    Args:
        from_hospital: Sending hospital name or abbreviation.
        acuity: Bed type — "icu", "medsurg", "behavioral", or "snf".
        specialty: Clinical specialty (e.g. "cardiac", "psych", "ortho", "general").
    """
    live = _fetch_live_beds()
    from_key = _resolve_hospital(from_hospital)
    if not from_key:
        return f"Sending hospital '{from_hospital}' not found."

    acuity_lower = acuity.lower().strip()
    if acuity_lower not in ("icu", "medsurg", "behavioral", "snf"):
        return f"Invalid acuity '{acuity}'. Use: icu, medsurg, behavioral, snf."

    spec_lower = specialty.lower().strip()
    results = []
    for hid, beds in _STATIC_BED_CAPACITY.items():
        if hid == from_key:
            continue
        src = live.get(hid, {})
        avail = src.get(f"{acuity_lower}_avail", beds.get(acuity_lower, (0, 0))[1])
        total = src.get(f"{acuity_lower}_total", beds.get(acuity_lower, (0, 0))[0])
        if avail <= 0:
            continue
        bed_pct = avail / total if total > 0 else 0
        specs = _HOSPITAL_SPECIALTIES.get(hid, ["general"])
        has_spec = spec_lower in specs or "general" in specs or spec_lower == "general"
        drive = _drive_time(from_key, hid)
        score = bed_pct * 40
        if has_spec:
            score += 35
        score += max(0, (180 - drive) / 180) * 15
        if hid in ("uvmmc", "dhmc"):
            score += 10
        results.append((score, hid, avail, total, drive, has_spec))

    if not results:
        return (
            f"No available {acuity_lower} beds found for '{specialty}' transfer from {from_hospital}. "
            "All Vermont hospitals at or near capacity for this bed type."
        )

    results.sort(key=lambda x: -x[0])
    lines = [
        f"## Best Transfer Options: {from_key.upper()} → {acuity_lower.upper()} / {specialty}\n",
        "*(Ranked: bed availability 40pt + specialty match 35pt + proximity 15pt + tertiary 10pt)*\n",
    ]
    for i, (score, hid, avail, total, drive, has_spec) in enumerate(results[:5], 1):
        hname = _H_DISPLAY_NAMES.get(hid, hid.upper())
        lines.append(f"**{i}. {hname}**")
        lines.append(f"   - {acuity_lower.upper()} beds: {avail}/{total} available")
        lines.append(f"   - Drive time: ~{drive} min")
        lines.append(f"   - {'✅ Specialty match' if has_spec else '⚠️ No specialty match'}")
        lines.append(f"   - Score: {score:.0f}/100\n")

    lines.append("🔗 [Run transfer routing interactively](/bed-capacity)")
    return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 7: Vermont HSA population
# ─────────────────────────────────────────────────────────────────────────────

def query_vermont_hsa_population(hsa_name: str = "all") -> str:
    """
    Retrieve population data for Vermont Hospital Service Areas (HSAs) including
    2020 baseline, 2040 projections, aging trends, and decline forecasts.

    Args:
        hsa_name: HSA name (e.g. "Burlington", "Rutland", "Newport") or "all".
    """
    if hsa_name.lower() == "all":
        lines = ["## Vermont HSA Population Projections (2020–2040)\n"]
        for hsa, d in _VT_HSA_DATA.items():
            change = d["pop_2040"] - d["pop_2020"]
            sign = "+" if change >= 0 else ""
            lines.append(
                f"**{hsa}** ({d['hospital']}): {d['pop_2020']:,}→{d['pop_2040']:,} "
                f"({sign}{change:,}) | 65+ by 2040: {d['over65_pct_2040']}% | {d['trend'].title()}"
            )
        lines.append(
            "\n**Statewide**: Working-age population (20–64) declines **13%** by 2040. "
            "65+ increases **57%**. Burlington is the only HSA projected to grow."
        )
        return "\n".join(lines)

    match = next((h for h in _VT_HSA_DATA if hsa_name.lower() in h.lower() or h.lower() in hsa_name.lower()), None)
    if not match:
        return f"HSA '{hsa_name}' not found. Available: {', '.join(_VT_HSA_DATA)}."

    d = _VT_HSA_DATA[match]
    change = d["pop_2040"] - d["pop_2020"]
    sign = "+" if change >= 0 else ""
    return "\n".join([
        f"## {match} HSA — Population Profile",
        f"- **Primary hospital**: {d['hospital']}",
        f"- **2020 population**: {d['pop_2020']:,}",
        f"- **2040 projection**: {d['pop_2040']:,} ({sign}{change:,})",
        f"- **Population 65+ by 2040**: {d['over65_pct_2040']}%",
        f"- **Population trend**: {d['trend'].title()}",
        "",
        "The aging population increases demand for long-term care, memory care, and home health. "
        "Shrinking working-age population reduces commercial premium contributions and worsens workforce shortages.",
    ])


# ─────────────────────────────────────────────────────────────────────────────
# TOOL 8: Vermont statewide system summary
# ─────────────────────────────────────────────────────────────────────────────

def query_vermont_system_summary() -> str:
    """
    Get a comprehensive statewide summary of Vermont's healthcare transformation based on
    the Act 167 Oliver Wyman report. Use for broad Vermont health system questions.
    Takes no input.
    """
    return """## Vermont Healthcare System — Act 167 Summary (Oliver Wyman, Aug 2024)

### Key Problems
- **9 of 14 hospitals** reporting operating losses in 2023; **13 of 14** projected in loss by 2028
- **5-year total system deficit**: $0.7B–$2.4B depending on expense growth scenario
- Silver exchange plan premiums up **108%** in 6 years; now $948/month average
- **28% of Vermont healthcare dollars** spent out-of-state
- Working-age population declines **13% by 2040**; 65+ population increases **57%**
- Up to **31 EMS agencies** called for a single patient transfer (interoperability failure)

### Three Transformation Imperatives
1. **Build housing and fix transportation** — housing instability drives preventable hospitalizations
2. **Move to reference-based pricing** — cap PPS hospital rates at ≤200% of Medicare
3. **Move all care possible out of hospitals** — Hospital-at-Home, community paramedicine, telehealth

### Hospital Categories
- **Major Restructuring (4)**: Gifford, Grace Cottage, North Country, Springfield
- **Service Line Changes (9)**: CVMC, RRMC, SVMC, NMC, NVRH, BMH, Copley, Mt. Ascutney, Porter
- **Significant Cost Reductions (1)**: UVMMC — 75% of physicians below 50th percentile productivity

### AHS Priority Programs (2025)
1. Regionalization of specialty care across hospitals
2. EMS professionalization and regionalization
3. Care coordination for heavy utilizers (elderly, mental health, foster care)
4. Dual-eligible targeting and care coordination
5. State-wide EMR coordination and VITL optimization

### GMCB Regulatory Actions (2025)
- No further commercial subsidization increases for hospital shortfalls
- Begin reference-based pricing at ≤200% Medicare for PPS hospitals
- Simplify CON process; encourage freestanding diagnostic and ASC centers

### Projected Savings from Transformation
- **>$400M direct savings** over 5 years from hospital restructuring
- Sources: close unsustainable inpatient units ($100M+), reduce admin, shared services ($300M+)

🔗 [Act 167 Simulator](/vermont-act-167/simulator) · [Bed Capacity Tool](/bed-capacity) · [Vermont RHT Program](/vermont-rht-program)"""


# ─────────────────────────────────────────────────────────────────────────────
# TOOL REGISTRY
# ─────────────────────────────────────────────────────────────────────────────

STATE_METRICS_TOOL = FunctionTool.from_defaults(
    fn=query_state_metrics,
    name="query_state_metrics",
    description=(
        "Fetch live health system performance metrics for a US state from the HTR database. "
        "Use for state performance scores, cost index, quality, access, or equity. "
        "Input: state name or abbreviation."
    ),
)

RESEARCH_LAB_TOOL = FunctionTool.from_defaults(
    fn=list_research_lab_tools,
    name="list_research_lab_tools",
    description=(
        "Find HTR platform and Research Lab tools relevant to a healthcare topic. "
        "Use when the user asks about modeling, simulation, calculators, bed capacity, "
        "transfer routing, or wants to run an interactive analysis. Input: topic."
    ),
)

VT_HOSPITAL_FINANCIALS_TOOL = FunctionTool.from_defaults(
    fn=query_vermont_hospital_financials,
    name="query_vermont_hospital_financials",
    description=(
        "Get financial data for a specific Vermont hospital from Act 167 / GMCB records: "
        "operating margin, annual loss, 2028 projection, restructuring category, strategic notes. "
        "Use for ANY question about a Vermont hospital's financial situation. "
        "Input: hospital name or abbreviation (e.g. 'Gifford', 'UVMMC', 'North Country')."
    ),
)

VT_BED_CAPACITY_TOOL = FunctionTool.from_defaults(
    fn=query_vermont_bed_capacity,
    name="query_vermont_bed_capacity",
    description=(
        "Get current bed availability for Vermont hospitals by type (ICU, med/surg, behavioral, SNF). "
        "Queries live Supabase data first, falls back to baseline. "
        "Use for questions about Vermont hospital capacity or which hospitals have open beds. "
        "Input: hospital name or 'all', bed type or 'all'."
    ),
)

VT_ACT167_RECS_TOOL = FunctionTool.from_defaults(
    fn=query_act167_recommendations,
    name="query_act167_recommendations",
    description=(
        "Get Act 167 Oliver Wyman report recommendations for a specific Vermont hospital. "
        "Returns short-term (2025-2027) and long-term (2028+) actions and HSA changes. "
        "Use when asked what a hospital should do, what the report recommends, "
        "or what the transformation plan is. Input: hospital name or abbreviation."
    ),
)

VT_TRANSFER_TOOL = FunctionTool.from_defaults(
    fn=find_best_transfer,
    name="find_best_transfer",
    description=(
        "Find the best Vermont hospital to receive a patient transfer. "
        "Scores by bed availability, specialty match, and drive time. "
        "Use for transfer questions, which hospital can take a specific case, "
        "or which facilities have capacity. "
        "Input: sending hospital name, acuity (icu/medsurg/behavioral/snf), specialty."
    ),
)

VT_HSA_POPULATION_TOOL = FunctionTool.from_defaults(
    fn=query_vermont_hsa_population,
    name="query_vermont_hsa_population",
    description=(
        "Get population data for Vermont Hospital Service Areas (HSAs): "
        "current size, 2040 projections, aging trends, decline forecasts. "
        "Use for Vermont demographics, shrinking communities, aging population, "
        "or workforce sustainability questions. Input: HSA name or 'all'."
    ),
)

VT_SYSTEM_SUMMARY_TOOL = FunctionTool.from_defaults(
    fn=query_vermont_system_summary,
    name="query_vermont_system_summary",
    description=(
        "Get a comprehensive Vermont healthcare transformation summary from the Act 167 report: "
        "key metrics, three imperatives, AHS priorities, GMCB actions, expected savings. "
        "Use for broad Vermont health system questions or Act 167 overview. No input needed."
    ),
)

ALL_TOOLS = [
    STATE_METRICS_TOOL,
    RESEARCH_LAB_TOOL,
    VT_HOSPITAL_FINANCIALS_TOOL,
    VT_BED_CAPACITY_TOOL,
    VT_ACT167_RECS_TOOL,
    VT_TRANSFER_TOOL,
    VT_HSA_POPULATION_TOOL,
    VT_SYSTEM_SUMMARY_TOOL,
]
