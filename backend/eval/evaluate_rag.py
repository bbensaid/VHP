"""
backend/eval/evaluate_rag.py
────────────────────────────
RAG pipeline evaluation using Ragas.

Measures four key metrics on a golden question/answer test set:
  - faithfulness:      Does the answer stick to the retrieved context? (hallucination proxy)
  - answer_relevancy:  Is the answer on-topic for the question?
  - context_precision: Are the retrieved chunks actually relevant?
  - context_recall:    Do the chunks cover the expected answer?

Usage:
  cd backend
  python -m eval.evaluate_rag

Requirements (add to requirements.txt before running):
  ragas~=0.2
  datasets~=2.0
  pandas

The golden_dataset below is a starter set. Expand it as the knowledge base grows.
Aim for 50+ Q/A pairs covering all 5 pillars.
"""

import asyncio
import json
import logging
import os
import sys

# Add parent dir to path so we can import main
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from dotenv import load_dotenv

load_dotenv(override=True)

log = logging.getLogger("rag-eval")
logging.basicConfig(level=logging.INFO)

# ── Golden test set ────────────────────────────────────────────────────────────
# Each entry: question, ground_truth answer, expected pillar context
# EXPAND THIS LIST to 50+ entries for statistically meaningful evaluation.

GOLDEN_DATASET = [
    {
        "question": "What is Vermont Act 167 and what does it require health systems to do?",
        "ground_truth": (
            "Vermont Act 167 is a comprehensive health care reform law that requires health systems "
            "to participate in the All-Payer Model (APM), align with accountable care organization "
            "structures, and meet performance targets for cost, quality, and population health. "
            "It establishes the Green Mountain Care Board as the regulatory authority."
        ),
        "pillar": "Policy",
    },
    {
        "question": "What is the AHEAD model in Vermont health care?",
        "ground_truth": (
            "The AHEAD (Achieving Healthcare Efficiency through Accountable Design; originally States "
            "Advancing All-Payer Health Equity Approaches and Development) model is a CMS innovation "
            "model designed to test whether a whole-state approach to health transformation can reduce "
            "Medicare expenditures, improve quality, and advance health equity. Vermont signed its AHEAD "
            "State Agreement in January 2025 and formally withdrew in July 2026, after a CMS "
            "renegotiation cut its expected EAST Fund from roughly $138 million to a cap near $10 "
            "million. Vermont's mandatory state architecture under Acts 167, 51 and 68 remained in "
            "force, so the reform continued without the federal model."
        ),
        "pillar": "Policy",
    },
    {
        "question": "How does value-based care differ from fee-for-service?",
        "ground_truth": (
            "Value-based care ties provider reimbursement to patient outcomes and cost efficiency, "
            "incentivizing quality over quantity. Fee-for-service pays for each service rendered "
            "regardless of outcome, which can incentivize unnecessary utilization. VBC models include "
            "ACOs, bundled payments, and capitation arrangements."
        ),
        "pillar": "Economics",
    },
    {
        "question": "What are social determinants of health (SDOH)?",
        "ground_truth": (
            "Social determinants of health are the conditions in which people are born, grow, live, "
            "work, and age that affect health outcomes. They include economic stability, education, "
            "social and community context, health care access and quality, and neighborhood and "
            "built environment. SDOH account for 30-55% of health outcomes."
        ),
        "pillar": "Equity",
    },
    # ── Operations pillar ─────────────────────────────────────────────────────
    # Added 2026-09-18. The Operations pillar had zero coverage here, the same
    # omission that had dropped it from the chat validator and the role-content
    # API. Ground truths below are taken from Chapter 11 of HTR_Book_v42.docx
    # (the manuscript of record) — no figures invented.
    {
        "question": "What is the Operations pillar and why is it the one most often under-resourced?",
        "ground_truth": (
            "Operations is the fifth pillar of the HTR framework and asks whether a reform is "
            "executable. It is the pillar where a transformation plan either becomes real or stays a "
            "document. It is most often under-resourced because it produces no new policy, technology "
            "or care model of its own — it simply has to make the other pillars work, on a timeline, "
            "with the staff and capital actually available."
        ),
        "pillar": "Operations",
    },
    {
        "question": "How does Vermont's regionalization blueprint tier its 14 hospitals?",
        "ground_truth": (
            "Oliver Wyman's regionalization blueprint organizes Vermont's 14-hospital network into "
            "three facility types. Tier 1 are Regional Specialty Centers (RSCs), hospitals with enough "
            "population base, financial position and existing expertise to sustain inpatient beds and "
            "act as Centers of Excellence; UVMMC in Burlington is the primary RSC with 16 COE "
            "designations. Tier 2 are focused-scope hospitals with defined specialty roles. Tier 3 are "
            "hospitals that cannot sustain inpatient beds long term and would convert in an orderly "
            "way to a Rural Emergency Hospital, a Community Ambulatory Care Center, or a Care at Home "
            "support hub rather than closing unexpectedly."
        ),
        "pillar": "Operations",
    },
    {
        "question": "Why is workforce Vermont's most binding operational constraint?",
        "ground_truth": (
            "Workforce is the operational challenge most likely to constrain the pace and ambition of "
            "Vermont's transformation. It is not a single issue but a cluster of interconnected "
            "problems cascading across the system. Vermont's unemployment rate was 2.5% in August "
            "2025, below the 4.3% national rate — an extremely tight labor market that limits "
            "healthcare recruitment. The RHT Program (a $195 million first-year award) funds workforce "
            "investments, including tuition assistance, recruitment incentives with five-year service obligations, "
            "and scope-of-practice expansion for nurses and APRNs. That is the supply-side response; "
            "workforce redistribution planning is the demand-side response."
        ),
        "pillar": "Operations",
    },
    {
        "question": "What is the EMS fragmentation problem in Vermont's inter-facility transfers?",
        "ground_truth": (
            "Vermont has 31 separate EMS agencies that a provider may need to contact to arrange a "
            "patient transfer. Community meeting participants described having to contact all 31. That "
            "fragmentation is simultaneously a patient safety risk and an operational cost, and it is "
            "a barrier to regionalization, which depends on reliable transfer infrastructure. "
            "Vermont's RHT Program application includes EMS transformation as a priority investment: "
            "professionalization and regionalization of EMS, improved inter-facility transfer "
            "coordination, and expanded telehealth to reduce unnecessary transfers."
        ),
        "pillar": "Operations",
    },
    {
        "question": "What is the RHRC and what role does it play in Vermont hospital transformation?",
        "ground_truth": (
            "The RHRC provides technical assistance for rural hospital transformation. It meets "
            "individually with each Vermont hospital to review hospital-specific financial and "
            "operational data — cost per adjusted discharge, operating margin, payer mix, service line "
            "volumes and workforce indicators — and compares each against national and Vermont peers. "
            "AHS reviews the data with hospitals and the Green Mountain Care Board provides benchmark "
            "data. The RHRC's transformation plan methodology supports the short-, medium- and "
            "long-term planning each hospital needs to manage its transition."
        ),
        "pillar": "Operations",
    },
    # ── Equity Imperative (cross-cutting, not a pillar) ───────────────────────
    {
        "question": "Is equity a pillar in the HTR framework?",
        "ground_truth": (
            "No. Equity is deliberately not a sixth pillar. The HTR framework has five pillars — "
            "Policy, Technology, Economics, Clinical and Operations — each defined by a diagnostic "
            "question. There is a sixth question, 'is it just?', and that is the Equity Imperative: a "
            "cross-cutting test each of the five pillars must pass on its own terms, rather than a "
            "separate workstream competing with them for budget, staff and attention. The reason this "
            "matters is that a reform can improve the average while widening the gap. Vermont's "
            "primary care access rate is roughly 91%, four points above the national benchmark, yet "
            "that aggregate conceals an 11-point gap between white Vermont adults and BIPOC Vermont "
            "adults."
        ),
        "pillar": "Equity",
    },
    {
        "question": "What is Hospital-at-Home and what evidence supports it?",
        "ground_truth": (
            "Hospital-at-Home is a care delivery model that provides acute-level hospital care in a "
            "patient's home using remote monitoring, telehealth, and mobile care teams. CMS's "
            "Acute Hospital Care at Home waiver, launched during COVID-19, demonstrated comparable "
            "clinical outcomes to inpatient care with lower rates of delirium and falls and higher "
            "patient satisfaction scores."
        ),
        "pillar": "Clinical",
    },
    {
        "question": "What is an ACO and how does it work?",
        "ground_truth": (
            "An Accountable Care Organization (ACO) is a group of health care providers that "
            "voluntarily coordinates care for a defined patient population and shares in the financial "
            "savings — or losses — from meeting quality and cost targets. Medicare ACOs under the "
            "MSSP (Medicare Shared Savings Program) are the most common model."
        ),
        "pillar": "Economics",
    },
    {
        "question": "What are the main challenges to AI adoption in clinical settings?",
        "ground_truth": (
            "Key barriers to clinical AI adoption include data interoperability gaps (fragmented EHR "
            "systems), algorithmic bias from training data that underrepresents minority populations, "
            "lack of FDA-cleared validation for many models, workflow integration friction, liability "
            "uncertainty, and clinician skepticism about black-box decision support."
        ),
        "pillar": "Technology",
    },
    # Ground truth quoted verbatim from HTR_Book_v42 (added 2026-11-20; book-audit/deep/rht/build_golden.py)
    {
        "question": "Who operates Vermont's Health Information Exchange?",
        "ground_truth": "Vermont's Health Information Exchange (VHIE) is operated by Vermont Information Technology Leaders (VITL), an independent nonprofit designated by statute as the exclusive operator of the statewide HIE network.",
        "pillar": "Technology",
    },
    {
        "question": "What is Vermont's Unified Health Data Space?",
        "ground_truth": "Vermont's answer is the Unified Health Data Space (UHDS) — the second-generation successor to the VHIE, and the vehicle Act 68 §10 directs AHS to develop for that integration.",
        "pillar": "Technology",
    },
    {
        "question": "Why does every cross-organization FHIR use case depend on patient matching?",
        "ground_truth": "Every FHIR use case that involves sharing records between organizations requires patient matching — reliably identifying that the 'John Smith, DOB 1952-03-14' at UVMMC is the same person as the 'John Smith, DOB 1952-03-14' at North Country Hospital and the 'Jonathan Smith, DOB 1952-03-14' (with a name variant) in the Medicaid enrollment file.",
        "pillar": "Technology",
    },
    {
        "question": "How could e-Consults and telehealth support Oliver Wyman's regionalization blueprint?",
        "ground_truth": "This is a technology enabler for Oliver Wyman's regionalization blueprint: rather than requiring every COE specialty to maintain physical presence at every community hospital, e-Consults and telehealth let COE specialists advise across the network while patients remain near their homes.",
        "pillar": "Technology",
    },
    {
        "question": "What does the CCBHC model require of a certified entity?",
        "ground_truth": "The CCBHC model requires a certified entity with the organizational capacity to serve all patients regardless of insurance status.",
        "pillar": "Clinical",
    },
    {
        "question": "Why do Vermont primary care practices have a financial incentive for HEDIS improvement?",
        "ground_truth": "This means Vermont primary care practices have a direct financial incentive for HEDIS improvement — not just a regulatory compliance requirement.",
        "pillar": "Clinical",
    },
    {
        "question": "Were Vermont's clinical models invented in Vermont?",
        "ground_truth": "Every clinical model in this chapter — PCMH transformation, the Collaborative Care Model, CCBHC operations, HEDIS improvement — has a national specification and a national evidence base; none of it was invented in Vermont.",
        "pillar": "Clinical",
    },
    {
        "question": "How does remote patient monitoring change economics under global budgets?",
        "ground_truth": "Under global budgets, RPM is a cost-reduction tool: every hospital admission or readmission prevented by early RPM-triggered intervention saves revenue under the fixed budget.",
        "pillar": "Clinical",
    },
    {
        "question": "What does Act 68 require regardless of what happens federally?",
        "ground_truth": "Act 68 requires reference-based pricing and, as resources allow, global budgets for every hospital, regardless of what happens federally.",
        "pillar": "Economics",
    },
    {
        "question": "What level of reference-based pricing did Oliver Wyman recommend, and what problem does it address?",
        "ground_truth": "Reference-based pricing — which Oliver Wyman recommended setting at 200% of Medicare or less for PPS hospitals; GMCB sets the actual level — addresses the unit price problem: Vermont's commercial insurance rates run far above Medicare, creating a cross-subsidy that is neither sustainable nor equitable.",
        "pillar": "Economics",
    },
    {
        "question": "What does Maryland's experience show about hospital global budgets?",
        "ground_truth": "Maryland's experience with hospital global budgets is the primary counterevidence: Maryland has set hospital rates for all payers since 1977, and under its 2014 all-payer model per-capita hospital revenue grew 1.47% and 2.31% in the first two years against a 3.58% ceiling, while hospital spending per Medicare beneficiary rose more slowly than it did nationally.",
        "pillar": "Economics",
    },
    {
        "question": "What are the five goals of Vermont's Act 167?",
        "ground_truth": "The five goals of Vermont's Act 167 — reduce inefficiencies, lower costs, improve health outcomes, reduce health inequities, and increase access to essential services — are goals that virtually every person across the political spectrum would endorse.",
        "pillar": "Policy",
    },
    {
        "question": "How do Acts 167, 51 and 68 fit together?",
        "ground_truth": "Vermont's cascade — Act 167 establishing diagnosis, Act 51 building institutional capacity, Act 68 deploying mandatory requirements — is itself a sustainability design.",
        "pillar": "Policy",
    },
    {
        "question": "What kind of body is the Green Mountain Care Board, compared with other states?",
        "ground_truth": "The Green Mountain Care Board is Vermont's version of a hospital rate-setting or cost-growth-benchmark authority — Massachusetts, Rhode Island, and several other states have analogous bodies under different names.",
        "pillar": "Policy",
    },
    {
        "question": "What is the basic unit of analysis for Vermont's regionalization planning?",
        "ground_truth": "The HSA is the fundamental unit of analysis for Vermont's regionalization and transformation planning.",
        "pillar": "Operations",
    },
    {
        "question": "What did Act 167 community meetings reveal about arranging patient transfers in Vermont?",
        "ground_truth": "Multiple meeting participants noted that EMR systems do not talk to each other, that a provider may have to call up to 31 EMS agencies to arrange a single transfer, and that no centralized system guides patients through the coverage and financial assistance they are entitled to.",
        "pillar": "Operations",
    },
    {
        "question": "When is a community better served without a full inpatient hospital?",
        "ground_truth": "A community that cannot sustain a full inpatient hospital but has reliable access to a Regional Specialty Center via improved EMS and transportation is better served than one that maintains an understaffed, financially distressed inpatient facility that cannot reliably staff its emergency department or maintain physician expertise across specialties.",
        "pillar": "Operations",
    },
    {
        "question": "What is the Equity Imperative?",
        "ground_truth": "This is the Equity Imperative — a cross-cutting test that each of the five pillars must pass on its own terms, rather than a separate workstream competing with them for budget, staff, and attention.",
        "pillar": "Equity",
    },
    {
        "question": "Why does social risk adjustment matter for Northeast Kingdom hospitals under global budgets?",
        "ground_truth": "If their global budgets are set at the same percentage of Medicare rates without social risk adjustment, the Northeast Kingdom hospital is being held to a standard that does not reflect its population's actual cost burden.",
        "pillar": "Equity",
    },
    {
        "question": "What gap in having a personal health care provider does Vermont's data show by ethnicity?",
        "ground_truth": "Yet the average hides gaps that appear as soon as the data is broken out by race and ethnicity: 78% of Hispanic adults — the one group statistically below the state rate — have one, against 91% of white adults, and Black (85%) and American Indian or Alaska Native (82%) adults also trail (Vermont Department of Health, BRFSS 2023–2024, published March 2026).",
        "pillar": "Equity",
    },
    {
        "question": "What are the five pillars of the HTR framework?",
        "ground_truth": "The framework is organized around five pillars: Policy, Technology, Economics, Clinical, and Operations.",
        "pillar": "Policy",
    },
    {
        "question": "What was OneCare Vermont responsible for?",
        "ground_truth": "OneCare was Vermont's primary Accountable Care Organization vehicle under a Total Cost of Care model — holding OneCare financially responsible for the total healthcare spending of an attributed Vermont population.",
        "pillar": "Economics",
    },
    {
        "question": "What happened when Blue Cross Blue Shield of Vermont left OneCare?",
        "ground_truth": "OneCare Vermont ran for more than a decade on a voluntary model: all 14 hospitals took part, but the insurers did not have to — and when Blue Cross Blue Shield of Vermont, the state's largest, left in January 2023, about a third of the attributed population went with it (§1.2.1).",
        "pillar": "Policy",
    },
    {
        "question": "What did Vermont's AHEAD withdrawal show about the EAST Fund and Act 68?",
        "ground_truth": "Vermont's AHEAD withdrawal shows it: the EAST Fund was cut from about $138 million to a cap near $10 million, and the incentive architecture — Act 68's mandates — was untouched, because the two were never the same thing.",
        "pillar": "Policy",
    },
    {
        "question": "What is the highest-priority technology engagement for Vermont's Clinically Integrated Network?",
        "ground_truth": "For the Clinically Integrated Network of Shared Services that Vermont's RHT plan funds for its independent hospitals and providers, the highest-priority Technology Strategy engagement is the data architecture design that enables shared services across its member facilities.",
        "pillar": "Technology",
    },
    {
        "question": "Why does Vermont route clinical-claims integration through MDWAS rather than VHCURES?",
        "ground_truth": "The reason is timeliness: MDWAS links Medicaid members' VHIE clinical data with Medicaid claims inside the State's own system, where VHCURES runs on quarterly collection and a six-month claims run-out, is de-identified for end users, and — because of ERISA preemption — excludes large segments of the commercially insured population.",
        "pillar": "Technology",
    },
    {
        "question": "What staffing does the Collaborative Care Model require?",
        "ground_truth": "The Collaborative Care Model requires a behavioral health care manager employed by a primary care practice.",
        "pillar": "Clinical",
    },
    {
        "question": "What evidence and billing support the Collaborative Care Model?",
        "ground_truth": "The Collaborative Care Model (CoCM) has its own designated Medicare billing codes and a 90+ randomized controlled trial evidence base.",
        "pillar": "Clinical",
    },
    {
        "question": "What primary care physician shortfall does Vermont project by 2030?",
        "ground_truth": "The primary-care shortage is the most immediately actionable: the RHT application projects a 370-FTE physician shortfall by 2030 (112 family medicine, 190 internal medicine, 52 OB/GYN, 2 pediatrics).",
        "pillar": "Operations",
    },
    {
        "question": "Why does credentialing delay matter in Vermont?",
        "ground_truth": "In a state projecting a 370 FTE primary care shortage by 2030, every month of credentialing delay is a month of foregone care — and foregone revenue — for every provider recruited.",
        "pillar": "Operations",
    },
    {
        "question": "What has the Section 1557 rule required of covered health programs since May 2025?",
        "ground_truth": "The Section 1557 nondiscrimination rule has, since May 1, 2025, required covered health programs to identify and mitigate discrimination risk in patient care decision support tools (45 CFR § 92.210).",
        "pillar": "Technology",
    },
    {
        "question": "Why was Vermont's Certificate of Need process cited as a barrier?",
        "ground_truth": "- CON process streamlining: Vermont's Certificate of Need process for hospital capital investments was cited as a barrier to efficient regionalization — providers cannot build the facilities and purchase the equipment that transformation requires if CON review is slow and contested.",
        "pillar": "Operations",
    },
    {
        "question": "What does a staffed PMO cost relative to the RHT award it coordinates?",
        "ground_truth": "A staffed PMO costs about $0.85–1.3M a year — $4–6.4M over four to five years — which is under 1% a year of the $195M first-year RHT award it coordinates, before counting any savings from reference-based pricing.",
        "pillar": "Operations",
    },
    {
        "question": "What did the largest study of ambient clinical intelligence find?",
        "ground_truth": "By 2026, ambient clinical intelligence — systems that listen to encounters and generate structured documentation automatically — has moved from early adoption to mainstream consideration, with the largest study to date (JAMA, 2026) finding real but modest savings — about 16 fewer minutes of documentation per eight scheduled patient hours (§4.6.1).",
        "pillar": "Technology",
    },
    {
        "question": "How does Act 68 strengthen GMCB's access to provider contracts?",
        "ground_truth": "Act 68 lets GMCB share subpoenaed material with AHS and the Department of Financial Regulation and requires providers to hand over unredacted contracts on request, and the answer is no longer hypothetical.",
        "pillar": "Policy",
    },
    {
        "question": "Is the Equity Imperative a sixth pillar?",
        "ground_truth": "It is the Equity Imperative — a single justice test that each of the five pillars must pass on its own terms.",
        "pillar": "Equity",
    },
    {
        "question": "What foundation do Blueprint PCMHs and Community Health Teams provide for Act 68?",
        "ground_truth": "Vermont's Blueprint for Health PCMHs and CHTs provide a strong care delivery foundation; the gap is in building on this foundation to serve the more complex patients that Act 68's global budget population health requirements target.",
        "pillar": "Clinical",
    },
]

# ── Evaluation pipeline ────────────────────────────────────────────────────────

async def retrieve_context(question: str, pillar: str | None = None) -> list[str]:
    """Retrieve context using the hybrid RAG pipeline."""
    from llama_index.core import Settings
    from llama_index.core.postprocessor import MetadataReplacementNodePostprocessor
    from llama_index.embeddings.openai import OpenAIEmbedding
    from llama_index.llms.groq import Groq as GroqLLM
    from supabase import create_client

    GROQ_API_KEY   = os.getenv("GROQ_API_KEY")
    GROQ_MODEL     = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    Settings.llm         = GroqLLM(model=GROQ_MODEL, api_key=GROQ_API_KEY)
    Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small", api_key=OPENAI_API_KEY)

    SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    sb        = create_client(SUPABASE_URL, SUPABASE_KEY)
    embedding = Settings.embed_model.get_text_embedding(question)

    result = sb.rpc("hybrid_search_rag", {
        "query_text":      question,
        "query_embedding": embedding,
        "match_count":     10,
        **({"filter_pillar": pillar} if pillar else {}),
    }).execute()

    from llama_index.core.schema import NodeWithScore, TextNode
    nodes = []
    for row in (result.data or []):
        meta = row.get("metadata_") or row.get("metadata") or {}
        if isinstance(meta, str):
            try:
                meta = json.loads(meta)
            except Exception:
                meta = {}
        text = row.get("text") or row.get("chunk_text") or ""
        node = NodeWithScore(
            node=TextNode(text=text, metadata=meta),
            score=float(row.get("rrf_score", 0.0))
        )
        nodes.append(node)

    # Expand sentence windows
    nodes = MetadataReplacementNodePostprocessor(
        target_metadata_key="window"
    ).postprocess_nodes(nodes)

    return [n.node.get_content() for n in nodes[:5]]


async def generate_answer(question: str, contexts: list[str]) -> str:
    """Generate an answer using the LLM + retrieved context."""
    from llama_index.core import Settings
    from llama_index.core.llms import ChatMessage, MessageRole

    context_str = "\n\n---\n\n".join(contexts)
    messages = [
        ChatMessage(
            role=MessageRole.SYSTEM,
            content=(
                "You are an expert health policy analyst. Answer questions using only "
                "the provided context. Be precise and cite sources where possible.\n\n"
                f"Context:\n{context_str}"
            ),
        ),
        ChatMessage(role=MessageRole.USER, content=question),
    ]

    response = await Settings.llm.achat(messages)
    return response.message.content or ""


async def run_evaluation():
    """Run Ragas evaluation on the golden dataset."""
    try:
        from datasets import Dataset
        from ragas import evaluate
        from ragas.metrics import (
            answer_relevancy,
            context_precision,
            context_recall,
            faithfulness,
        )
    except ImportError:
        log.error(
            "Ragas not installed. Run: pip install ragas datasets pandas\n"
            "Then add to requirements.txt: ragas~=0.2  datasets~=2.0  pandas"
        )
        return

    log.info(f"Running RAG evaluation on {len(GOLDEN_DATASET)} test cases...")

    questions         = []
    answers           = []
    contexts_list     = []
    ground_truths     = []

    for i, item in enumerate(GOLDEN_DATASET):
        log.info(f"  [{i+1}/{len(GOLDEN_DATASET)}] {item['question'][:60]}...")
        try:
            ctxs   = await retrieve_context(item["question"], item.get("pillar"))
            answer = await generate_answer(item["question"], ctxs)

            questions.append(item["question"])
            answers.append(answer)
            contexts_list.append(ctxs)
            ground_truths.append(item["ground_truth"])
        except Exception as e:
            log.warning(f"  Skipping item {i+1}: {e}")

    dataset = Dataset.from_dict({
        "question":      questions,
        "answer":        answers,
        "contexts":      contexts_list,
        "ground_truth":  ground_truths,
    })

    log.info("Scoring with Ragas...")
    result = evaluate(
        dataset,
        metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
    )

    print("\n" + "="*60)
    print("RAG EVALUATION RESULTS")
    print("="*60)
    print(f"  Faithfulness:       {result['faithfulness']:.3f}  (hallucination proxy — higher=better)")
    print(f"  Answer Relevancy:   {result['answer_relevancy']:.3f}  (on-topic answers — higher=better)")
    print(f"  Context Precision:  {result['context_precision']:.3f}  (retrieved chunks relevant — higher=better)")
    print(f"  Context Recall:     {result['context_recall']:.3f}  (chunks cover expected answer — higher=better)")
    print("="*60)
    print(f"\nBaseline established {__import__('datetime').date.today()}.")
    print("Re-run after any RAG pipeline change to detect regressions.")

    # Save results to JSON for CI comparison
    output_path = os.path.join(os.path.dirname(__file__), "eval_results.json")
    with open(output_path, "w") as f:
        json.dump({
            "date": str(__import__("datetime").date.today()),
            "n_samples": len(questions),
            "faithfulness":      result["faithfulness"],
            "answer_relevancy":  result["answer_relevancy"],
            "context_precision": result["context_precision"],
            "context_recall":    result["context_recall"],
        }, f, indent=2)
    log.info(f"Results saved to {output_path}")


if __name__ == "__main__":
    asyncio.run(run_evaluation())
