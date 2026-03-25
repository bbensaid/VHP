"""
backend/services/tools.py
──────────────────────────
LlamaIndex FunctionTools available to the agentic chat pipeline.

Tools:
  query_state_metrics(state)     — fetch live state performance data from Supabase
  list_research_lab_tools(topic) — surface relevant Research Lab tools by topic keyword
"""

import logging
from typing import Optional

from llama_index.core.tools import FunctionTool

log = logging.getLogger("htr-brain")

# ── State data tool ───────────────────────────────────────────────────────────

def query_state_metrics(state: str) -> str:
    """
    Retrieve health system performance metrics for a US state from the HTR database.
    Returns a structured summary of key indicators including performance score,
    cost index, quality score, access score, and equity score.

    Args:
        state: The US state name or abbreviation (e.g. "Vermont", "VT", "California").
    """
    from services.db import get_supabase
    supabase = get_supabase()
    if not supabase:
        return f"State metrics database unavailable. Cannot retrieve data for {state}."

    # Normalise: lowercase, replace spaces with underscores
    state_key = state.lower().strip().replace(" ", "_").replace("-", "_")

    # Try exact match first, then partial
    try:
        res = supabase.table("state_performance_index") \
            .select("*") \
            .ilike("state_id", f"%{state_key}%") \
            .limit(1) \
            .execute()

        if not res.data:
            # Try by state name directly
            res = supabase.table("state_performance_index") \
                .select("*") \
                .ilike("state_name", f"%{state}%") \
                .limit(1) \
                .execute()

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


# ── Research Lab tool ─────────────────────────────────────────────────────────

_RESEARCH_LAB_TOOLS = [
    {
        "name": "FHIR Lab",
        "url": "/research-lab/interoperability",
        "keywords": ["fhir", "interoperability", "cds hooks", "hl7", "api", "onc", "ehr"],
    },
    {
        "name": "Risk Stratification Engine",
        "url": "/research-lab/interoperability",
        "keywords": ["hcc", "risk", "stratification", "risk score", "chronic", "comorbidity"],
    },
    {
        "name": "APM Design Lab",
        "url": "/research-lab/payment-models",
        "keywords": ["apm", "alternative payment", "bundle", "episode", "value-based", "vbc", "p4p"],
    },
    {
        "name": "APM Shared Savings Calculator",
        "url": "/research-lab/payment-models",
        "keywords": ["shared savings", "mssp", "aco", "savings", "benchmark", "total cost of care"],
    },
    {
        "name": "Cost-Effectiveness Calculator",
        "url": "/research-lab/payment-models",
        "keywords": ["cost-effectiveness", "icer", "qaly", "cea", "willingness to pay"],
    },
    {
        "name": "Population Health Modeler",
        "url": "/research-lab/population-equity",
        "keywords": ["population health", "markov", "disease model", "chronic disease", "sir", "epidemic"],
    },
    {
        "name": "Health Equity Studio",
        "url": "/research-lab/population-equity",
        "keywords": ["equity", "sdoh", "social determinants", "disparity", "race", "income", "zip code"],
    },
    {
        "name": "Policy Simulator",
        "url": "/research-lab/policy-quality",
        "keywords": ["policy", "waiver", "1115", "global budget", "all-payer", "simulate", "medicaid"],
    },
    {
        "name": "Clinical Quality Optimizer",
        "url": "/research-lab/policy-quality",
        "keywords": ["hedis", "star ratings", "mips", "quality measure", "cms", "quality"],
    },
    {
        "name": "Hospital Financial Scorecard",
        "url": "/research-lab/policy-quality",
        "keywords": ["hospital finance", "operating margin", "revenue", "cost per discharge", "dsrip"],
    },
    {
        "name": "Actuarial Lab",
        "url": "/research-lab/policy-quality",
        "keywords": ["actuarial", "premium", "loss ratio", "mlr", "insurance", "claims"],
    },
    {
        "name": "AI Analytics Lab",
        "url": "/research-lab/technology-ai",
        "keywords": ["ai", "machine learning", "algorithm", "bias", "model performance", "auc", "roc"],
    },
    {
        "name": "Evidence Library",
        "url": "/research-lab/knowledge-workspace",
        "keywords": ["evidence", "systematic review", "literature", "meta-analysis", "publication"],
    },
    {
        "name": "Workforce Modeler",
        "url": "/research-lab/knowledge-workspace",
        "keywords": ["workforce", "staffing", "nursing", "physician", "shortage", "supply"],
    },
]


def list_research_lab_tools(topic: str) -> str:
    """
    Find HTR Research Lab tools relevant to a given healthcare topic.
    Returns a list of tool names and links that the user can explore interactively.

    Args:
        topic: A healthcare topic, task, or question (e.g. "value-based care", "HEDIS measures").
    """
    topic_lower = topic.lower()
    matches = []
    for tool in _RESEARCH_LAB_TOOLS:
        if any(kw in topic_lower for kw in tool["keywords"]):
            matches.append(tool)

    if not matches:
        return (
            f"No specific Research Lab tools matched '{topic}'. "
            f"Browse all 19 tools at /research-lab."
        )

    lines = [f"**Research Lab tools relevant to '{topic}':**"]
    seen_urls: set = set()
    for tool in matches[:4]:  # Cap at 4 to avoid cluttering the response
        if tool["url"] not in seen_urls:
            lines.append(f"- [{tool['name']}]({tool['url']})")
            seen_urls.add(tool["url"])

    lines.append("\nAll tools: [HTR Research Lab](/research-lab)")
    return "\n".join(lines)


# ── Tool registry ─────────────────────────────────────────────────────────────

STATE_METRICS_TOOL = FunctionTool.from_defaults(
    fn=query_state_metrics,
    name="query_state_metrics",
    description=(
        "Fetch live health system performance metrics for a US state from the HTR database. "
        "Use this when the user asks about a specific state's performance, scores, costs, "
        "or wants to compare states. Input: state name or abbreviation."
    ),
)

RESEARCH_LAB_TOOL = FunctionTool.from_defaults(
    fn=list_research_lab_tools,
    name="list_research_lab_tools",
    description=(
        "Find HTR Research Lab analytical tools relevant to a healthcare topic. "
        "Use this when the user asks about modeling, simulation, calculators, or wants "
        "to run an analysis themselves. Input: topic or task description."
    ),
)

ALL_TOOLS = [STATE_METRICS_TOOL, RESEARCH_LAB_TOOL]
