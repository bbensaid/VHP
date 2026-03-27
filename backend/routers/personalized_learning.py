"""
backend/routers/personalized_learning.py
─────────────────────────────────────────
POST /api/personalized-learning/generate
  → AI-powered personalized healthcare learning path generation.
  → Uses the subscriber-tier Groq model (70b) for quality content generation.
  → Returns structured JSON curriculum with weekly modules, quizzes, and reflections.
"""

import asyncio
import json
import logging
from typing import List, Optional, Dict, Any

import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, field_validator

from services.auth import AuthedUser, require_subscriber
from config import (
    GROQ_API_KEY, MODEL_SUBSCRIBER,
    SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN, SANITY_API_VER,
)
from llama_index.llms.groq import Groq as GroqLLM

log = logging.getLogger("htr-brain")
router = APIRouter()


# ── Request / Response Models ─────────────────────────────────────────────────

class LearningPreferences(BaseModel):
    role: str
    experience_years: str
    topics: List[str]
    difficulty: str
    format_preference: str
    time_per_week_hours: float
    timeline_weeks: int
    goals: List[str]
    custom_goal: Optional[str] = None

    @field_validator("topics")
    @classmethod
    def validate_topics(cls, v: List[str]) -> List[str]:
        if not v:
            raise ValueError("At least one topic must be selected")
        return v[:8]

    @field_validator("timeline_weeks")
    @classmethod
    def validate_timeline(cls, v: int) -> int:
        return max(1, min(12, v))

    @field_validator("time_per_week_hours")
    @classmethod
    def validate_time(cls, v: float) -> float:
        return max(0.25, min(20.0, v))

    @field_validator("custom_goal")
    @classmethod
    def validate_custom_goal(cls, v: Optional[str]) -> Optional[str]:
        if v:
            return v.strip()[:500]
        return v


# ── Domain Context ─────────────────────────────────────────────────────────────

TOPIC_LABELS = {
    "health-economics":    "Health Economics & Value-Based Care",
    "clinical-innovation": "Clinical Innovation & Quality Improvement",
    "health-policy":       "Health Policy & Reform",
    "health-technology":   "Healthcare Technology & Digital Health",
    "health-equity":       "Health Equity & Social Determinants of Health",
    "population-health":   "Population Health Management",
    "leadership":          "Healthcare Leadership & Organizational Strategy",
    "payment-reform":      "Payment Reform & Alternative Payment Models",
    "data-analytics":      "Data Analytics & AI in Healthcare",
    "regulatory":          "Regulatory Compliance & Risk Management",
}

GOAL_LABELS = {
    "strategic-leadership":  "Lead strategic transformation initiatives",
    "policy-fluency":        "Understand and navigate the healthcare policy landscape",
    "vbc-implementation":    "Design and implement value-based care programs",
    "technology-adoption":   "Drive technology adoption and digital health strategy",
    "equity-integration":    "Integrate health equity into clinical and operational workflows",
    "financial-analysis":    "Conduct healthcare financial and economic analysis",
    "quality-improvement":   "Lead quality improvement and patient safety programs",
    "workforce-development": "Build and develop high-performing healthcare teams",
}

# Maps user topic slugs to Sanity pillar values so we can pre-filter candidates.
TOPIC_TO_PILLAR: Dict[str, Optional[str]] = {
    "health-economics":    "Economics",
    "payment-reform":      "Economics",
    "clinical-innovation": "Clinical",
    "health-policy":       "Policy",
    "health-technology":   "Technology",
    "health-equity":       "Equity",
    "population-health":   "Clinical",
    "leadership":          None,
    "data-analytics":      "Technology",
    "regulatory":          "Policy",
}

# Maps user topic slugs to the most relevant published learning track ID.
# Track IDs must match ids defined in frontend/lib/data/learning-tracks-data.ts.
TOPIC_TO_TRACK: Dict[str, str] = {
    "health-economics":    "value-based-care-track",
    "payment-reform":      "value-based-care-track",
    "clinical-innovation": "value-based-care-track",
    "health-policy":       "value-based-care-track",
    "population-health":   "value-based-care-track",
    "leadership":          "value-based-care-track",
    "regulatory":          "value-based-care-track",
    "health-technology":   "precision-medicine-track",
    "data-analytics":      "precision-medicine-track",
    "health-equity":       "health-equity-track",
}



# ── Sanity catalog fetch ───────────────────────────────────────────────────────

async def _fetch_sanity_catalog() -> List[Dict[str, Any]]:
    """
    Fetch all academy modules, case studies, and courses from Sanity with their
    real slugs. Returns an empty list if Sanity credentials are not configured.
    """
    if not SANITY_PROJECT_ID or not SANITY_API_TOKEN:
        log.warning("Sanity credentials not set — platform link matching disabled")
        return []

    query = (
        '*[(_type == "academyModule" || _type == "caseStudy" || _type == "course") '
        '&& defined(slug.current)]{'
        '  _type, title, "slug": slug.current, pillar, summary, learningObjectives'
        '} | order(_type, title)'
    )
    url = (
        f"https://{SANITY_PROJECT_ID}.api.sanity.io"
        f"/v{SANITY_API_VER}/data/query/{SANITY_DATASET}"
    )
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(
                url,
                headers={"Authorization": f"Bearer {SANITY_API_TOKEN}"},
                params={"query": query},
            )
            resp.raise_for_status()
            results = resp.json().get("result", [])
            log.info(f"Sanity catalog: {len(results)} documents fetched for link matching")
            return results
    except Exception as e:
        log.warning(f"Sanity catalog fetch failed (link matching will use tab fallbacks): {e}")
        return []


# ── Content matching ───────────────────────────────────────────────────────────


def _validate_links(
    path_data: Dict[str, Any],
    catalog: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Validate every platform_link the AI set against the real Sanity catalog.
    - Links to real slugs are kept.
    - Hallucinated or malformed links are nulled out.
    - knowledge_check items always get null.
    The AI chose the content; we just enforce that it didn't invent a slug.
    """
    valid_module_slugs     = {d["slug"] for d in catalog if d["_type"] == "academyModule"}
    valid_case_study_slugs = {d["slug"] for d in catalog if d["_type"] == "caseStudy"}

    for week in path_data.get("weeks", []):
        for item in week.get("items", []):
            if item.get("type") == "knowledge_check":
                item["platform_link"] = None
                continue

            link = item.get("platform_link") or ""

            if "/academy/modules/" in link:
                slug = link.split("/academy/modules/")[1].split("?")[0].strip("/")
                if slug not in valid_module_slugs:
                    log.warning(f"AI hallucinated module slug '{slug}' — nulling link")
                    item["platform_link"] = None
            elif "/academy/case-studies/" in link:
                slug = link.split("/academy/case-studies/")[1].split("?")[0].strip("/")
                if slug not in valid_case_study_slugs:
                    log.warning(f"AI hallucinated case-study slug '{slug}' — nulling link")
                    item["platform_link"] = None
            else:
                # AI set a non-specific link (tab URL, course, empty) — suppress it
                item["platform_link"] = None

            if item.get("platform_link"):
                log.debug(f"Verified link: '{item.get('title')}' → {item['platform_link']}")
            else:
                log.debug(f"No verified link for '{item.get('title')}'")

    return path_data

async def _generate_single_bridge(
    item: Dict[str, Any],
    doc: Dict[str, Any],
    prefs: "LearningPreferences",
    week_theme: str,
    llm: GroqLLM,
) -> None:
    """Generate a personalized relevance bridge for one case study item in-place."""
    role_label = prefs.role.replace("_", " ").title()
    goals_str  = ", ".join(
        GOAL_LABELS.get(g, g) for g in prefs.goals[:3]
    )
    topics_str = ", ".join(
        TOPIC_LABELS.get(t, t) for t in prefs.topics[:4]
    )

    prompt = f"""You are a faculty advisor at a world-class healthcare leadership program.
Write exactly 2-3 sentences that explain — specifically and concretely — why the case study below is the right next step for this learner RIGHT NOW, given where they are in their curriculum.

LEARNER CONTEXT
Role: {role_label}
Topics they are studying: {topics_str}
Their stated goals: {goals_str}
Current week theme: {week_theme}
The curriculum item they just completed reading: "{item['title']}"

CASE STUDY BEING LINKED
Title: {doc['title']}
Summary: {doc.get('summary', '')}

RULES
- Do NOT start with "This case study" or "This is"
- Start with the organization name or a concrete fact from the case
- Be specific to the learner's role and current week theme — not generic praise
- 2-3 sentences only
- Return only the paragraph, no labels, no formatting"""

    try:
        response = await llm.acomplete(prompt)
        item["relevance_bridge"] = response.text.strip()
    except Exception as e:
        log.warning(f"Bridge generation failed for '{doc.get('slug')}': {e}")
        # Non-fatal — item still shows the link, just without the bridge


async def _generate_case_study_bridges(
    path_data: Dict[str, Any],
    catalog: List[Dict[str, Any]],
    prefs: "LearningPreferences",
) -> Dict[str, Any]:
    """
    For every case_study item that has a verified /academy/case-studies/<slug> link,
    generate a short personalized paragraph explaining exactly why that specific case
    study is relevant to this learner at this point in their curriculum.

    Bridge texts are injected into each item as `relevance_bridge`.
    All bridges are generated concurrently to minimise latency.
    """
    slug_to_doc = {d["slug"]: d for d in catalog if d.get("slug")}

    # Use lower temperature — we want factual, specific prose, not creative
    llm = GroqLLM(model=MODEL_SUBSCRIBER, api_key=GROQ_API_KEY, temperature=0.25)

    tasks = []
    for week in path_data.get("weeks", []):
        week_theme = week.get("theme", "")
        for item in week.get("items", []):
            link = item.get("platform_link") or ""
            if item.get("type") != "case_study":
                continue
            if "/academy/case-studies/" not in link:
                continue
            slug = link.split("/academy/case-studies/")[1].split("?")[0]
            doc  = slug_to_doc.get(slug)
            if not doc:
                continue
            tasks.append(
                _generate_single_bridge(item, doc, prefs, week_theme, llm)
            )

    if tasks:
        await asyncio.gather(*tasks)
        log.info(f"Generated {len(tasks)} case study bridge(s)")

    return path_data


ROLE_FRAMING = {
    "clinician":           "front-line clinical care delivery and quality outcomes",
    "administrator":       "operational efficiency, workforce, and organizational strategy",
    "policy_maker":        "policy design, regulatory impact, and cross-sector coordination",
    "technology_leader":   "digital health strategy, interoperability, and technology ROI",
    "researcher":          "evidence synthesis, study design, and translational research",
    "student":             "foundational concepts and career development in health transformation",
    "consultant":          "strategic advisory, market analysis, and implementation frameworks",
    "finance":             "financial modeling, reimbursement strategy, and budget impact",
    "other":               "healthcare transformation principles and best practices",
}


# ── Prompt Builder ─────────────────────────────────────────────────────────────

def _build_catalog_section(catalog: List[Dict[str, Any]], topics: List[str]) -> str:
    """
    Build the HTR CONTENT LIBRARY section injected into the generation prompt.
    Filters to documents whose pillar matches the user's selected topics, then
    caps at 12 entries so the prompt stays within token budget.
    The AI uses this list to set platform_link on items — no guessing.
    """
    if not catalog:
        return ""

    topic_pillars = {TOPIC_TO_PILLAR.get(t) for t in topics} - {None}

    modules    = [d for d in catalog if d["_type"] == "academyModule"]
    case_studies = [d for d in catalog if d["_type"] == "caseStudy"]

    def pillar_score(doc: Dict) -> int:
        return 1 if doc.get("pillar") in topic_pillars or doc.get("pillar") == "All" else 0

    # Prioritise pillar-matching docs; cap total to keep prompt lean
    modules_sorted     = sorted(modules,      key=pillar_score, reverse=True)[:8]
    case_studies_sorted = sorted(case_studies, key=pillar_score, reverse=True)[:5]

    lines = [
        "\n═══ HTR CONTENT LIBRARY (use these for platform_link) ═══",
        "The items below are REAL published documents on the HTR platform.",
        "For each reading and case_study item you generate, you MUST set",
        "platform_link to the URL of the BEST MATCHING document from this list,",
        "or null if none is a strong topical fit. Do NOT invent URLs.",
        "",
        "MODULES (use for reading/reflection items):",
    ]
    for d in modules_sorted:
        lines.append(f'  /academy/modules/{d["slug"]}  →  {d["title"]}')

    lines.append("\nCASE STUDIES (use for case_study items):")
    for d in case_studies_sorted:
        lines.append(f'  /academy/case-studies/{d["slug"]}  →  {d["title"]}')

    lines.append("")
    return "\n".join(lines)


def _build_generation_prompt(
    prefs: LearningPreferences,
    catalog: List[Dict[str, Any]],
) -> str:
    topics_str   = ", ".join(TOPIC_LABELS.get(t, t) for t in prefs.topics)
    goals_list   = [GOAL_LABELS.get(g, g) for g in prefs.goals]
    if prefs.custom_goal:
        goals_list.append(prefs.custom_goal)
    goals_str    = "; ".join(goals_list) if goals_list else "General healthcare transformation competency"
    role_context = ROLE_FRAMING.get(prefs.role, "healthcare transformation")
    total_hours  = round(prefs.time_per_week_hours * prefs.timeline_weeks, 1)

    # Determine items per week based on time budget (target ~25-30 min/item)
    mins_per_week  = prefs.time_per_week_hours * 60
    items_per_week = max(2, min(6, int(mins_per_week / 28)))

    return f"""You are a world-class healthcare education curriculum designer at the Health Transformation Review (HTR).

Design a highly personalized learning path in strict JSON format for this learner:

═══ LEARNER PROFILE ═══
Role: {prefs.role.replace('_', ' ').title()} — focus on {role_context}
Experience: {prefs.experience_years} years in healthcare
Difficulty: {prefs.difficulty.title()} level
Time available: {prefs.time_per_week_hours} hours/week × {prefs.timeline_weeks} weeks = {total_hours} total hours
Selected topics: {topics_str}
Learning goals: {goals_str}
Preferred format: {prefs.format_preference.replace('_', ' ')}

═══ HTR PLATFORM CONTEXT ═══
HTR focuses on US healthcare transformation with Vermont as a laboratory for reform.
Content spans 5 pillars:
1. Health Economics & Value-Based Care (ACOs, MSSP, bundled payments, CMMI models, Total Cost of Care)
2. Clinical Innovation & Quality Improvement (HEDIS metrics, safety culture, care redesign, evidence-based practice)
3. Health Policy & Reform (Act 167, ACA marketplaces, Medicaid 1115 waivers, state-based reform)
4. Healthcare Technology & Digital Health (EHR interoperability, FHIR, AI/ML diagnostics, telehealth, RPM)
5. Health Equity & SDOH (disparities data, community health workers, housing-health nexus, equity metrics)

Vermont-specific context to weave in where relevant:
- Vermont Blueprint for Health — multi-payer PCMH model
- Vermont All-Payer ACO Model (VMSSP) — statewide Total Cost of Care contract
- OneCare Vermont — the single Accountable Care Organization
- Green Mountain Care Board — Vermont's health care oversight body
- Act 167 (2018) — health care reform legislation

{_build_catalog_section(catalog, prefs.topics)}
═══ GENERATION INSTRUCTIONS ═══
Create exactly {prefs.timeline_weeks} weeks with exactly 3 items per week (reading, case_study, knowledge_check).

Rules:
- Every reading and case_study item: content field must be 100-130 words (concise but substantive — key insight, real example, actionable takeaway)
- Content must be tailored to the learner's role and difficulty level
- Knowledge checks: exactly 3 scenario-based multiple choice questions
- Items build progressively week over week
- Case studies reference real Vermont/US healthcare organizations
- platform_link: set to the BEST MATCHING URL from the HTR Content Library above, or null. Never invent a URL.
- Be concise — quality over quantity in every field

OUTPUT: Return ONLY valid JSON. No markdown. No explanation. Start with {{ and end with }}:

{{
  "title": "Personalized title",
  "description": "2 sentence overview for this learner.",
  "estimated_weeks": {prefs.timeline_weeks},
  "total_hours": {total_hours},
  "difficulty_level": "{prefs.difficulty}",
  "key_skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "weeks": [
    {{
      "week": 1,
      "theme": "Week theme",
      "focus_areas": ["area1", "area2"],
      "items": [
        {{
          "id": "w1-i1",
          "type": "reading",
          "title": "Reading title",
          "description": "1-2 sentence preview.",
          "content": "100-130 word substantive content with a real example. Tailored to the learner role.",
          "platform_link": null,
          "estimated_minutes": 15,
          "key_concepts": ["concept1", "concept2", "concept3"],
          "reflection_question": "A short reflective question.",
          "questions": null
        }},
        {{
          "id": "w1-i2",
          "type": "case_study",
          "title": "Case study title",
          "description": "1-2 sentence preview.",
          "content": "100-130 word case study: challenge, intervention, outcome, lesson.",
          "platform_link": null,
          "estimated_minutes": 15,
          "key_concepts": ["concept1", "concept2"],
          "reflection_question": "How would you apply this?",
          "questions": null
        }},
        {{
          "id": "w1-i3",
          "type": "knowledge_check",
          "title": "Week 1 Knowledge Check",
          "description": "Test your Week 1 understanding.",
          "content": "",
          "platform_link": null,
          "estimated_minutes": 10,
          "key_concepts": [],
          "reflection_question": null,
          "questions": [
            {{
              "question": "Scenario-based question for this role.",
              "options": ["A: option", "B: option", "C: option", "D: option"],
              "correct": 0,
              "explanation": "Brief explanation."
            }},
            {{
              "question": "Second question.",
              "options": ["A: option", "B: option", "C: option", "D: option"],
              "correct": 1,
              "explanation": "Brief explanation."
            }},
            {{
              "question": "Third question.",
              "options": ["A: option", "B: option", "C: option", "D: option"],
              "correct": 2,
              "explanation": "Brief explanation."
            }}
          ]
        }}
      ]
    }}
  ],
  "recommended_resources": [
    {{
      "title": "Resource title",
      "type": "course",
      "link": "/academy/courses/healthcare-economics",
      "description": "1 sentence."
    }},
    {{
      "title": "Resource title",
      "type": "external",
      "link": "https://www.cms.gov/priorities/innovation",
      "description": "1 sentence."
    }}
  ]
}}"""


# ── Endpoint ───────────────────────────────────────────────────────────────────

@router.post("/api/personalized-learning/generate")
async def generate_learning_path(
    prefs: LearningPreferences,
    user: AuthedUser = Depends(require_subscriber),
):
    """
    Generate a personalized healthcare learning path using AI.

    The LLM produces a weekly curriculum with readings, case studies,
    reflections, and knowledge checks — all tailored to the user's role,
    experience, topics, time budget, and learning goals.
    """
    log.info(
        f"Generating learning path: user={user.user_id} role={user.role} "
        f"topics={prefs.topics} weeks={prefs.timeline_weeks}"
    )

    # Fetch catalog first — it's embedded in the generation prompt so the
    # AI can choose platform_link values from real published documents.
    catalog = await _fetch_sanity_catalog()
    prompt  = _build_generation_prompt(prefs, catalog)

    # max_tokens: 8000 leaves headroom under Groq's 8192 limit and ensures
    # the JSON is never silently truncated mid-object.
    llm = GroqLLM(model=MODEL_SUBSCRIBER, api_key=GROQ_API_KEY, max_tokens=8000)

    try:
        response = await llm.acomplete(prompt, temperature=0.65)
        text = response.text.strip()

        # Strip any accidental markdown fences
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()

        # Extract the JSON object boundaries
        start = text.find("{")
        if start < 0:
            log.error(f"No JSON found in LLM response: {text[:300]}")
            raise ValueError("LLM did not return valid JSON")

        # Try the full text first, then walk back to find the last valid close brace
        json_text = text[start:]
        path_data = None
        for end in range(len(json_text), 0, -1):
            if json_text[end - 1] == "}":
                try:
                    path_data = json.loads(json_text[:end])
                    break
                except json.JSONDecodeError:
                    continue

        if path_data is None:
            log.error(f"Could not repair truncated JSON. Raw tail: {text[-200:]}")
            raise ValueError("LLM returned malformed JSON that could not be repaired")

        # Validate the AI-chosen platform_link values against real Sanity slugs.
        # The catalog was already fetched before generation and embedded in
        # the prompt — the AI picked links from that list. We just confirm
        # no slug was hallucinated.
        path_data = _validate_links(path_data, catalog)

        # For each case study item with a confirmed real link, generate a
        # personalised 2-3 sentence bridge explaining why that specific case
        # study is the right next step for this learner right now.
        if catalog:
            path_data = await _generate_case_study_bridges(
                path_data, catalog, prefs
            )

        return {
            "success": True,
            "path": path_data,
            "preferences": prefs.model_dump(),
        }

    except json.JSONDecodeError as e:
        log.error(f"JSON parse error in learning path generation: {e}")
        raise HTTPException(
            status_code=500,
            detail="The AI returned malformed content. Please try again.",
        )
    except Exception as e:
        log.error(f"Learning path generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
