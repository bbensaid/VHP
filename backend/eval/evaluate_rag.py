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
            "The AHEAD (All-Payer Health Equity Approaches and Development) model is a CMS innovation "
            "model in Vermont designed to test whether a whole-state approach to health transformation "
            "can reduce Medicare expenditures, improve quality, and advance health equity. "
            "It builds on Vermont's All-Payer ACO Model."
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
    {
        "question": "What is the HTI (Health Transformation Index) composite score?",
        "ground_truth": (
            "The HTI composite score is a multi-dimensional index that measures a state's progress "
            "across the five pillars of health transformation: Policy, Economics, Technology, Clinical, "
            "and Equity. It aggregates weighted sub-scores from each pillar to produce a 0-100 score "
            "reflecting overall transformation readiness and performance."
        ),
        "pillar": "Policy",
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
]

# ── Evaluation pipeline ────────────────────────────────────────────────────────

async def retrieve_context(question: str, pillar: str | None = None) -> list[str]:
    """Retrieve context using the hybrid RAG pipeline."""
    from llama_index.core import Settings
    from llama_index.core.schema import QueryBundle
    from llama_index.core.postprocessor import MetadataReplacementNodePostprocessor
    from llama_index.embeddings.openai import OpenAIEmbedding
    from llama_index.llms.groq import Groq as GroqLLM
    from supabase import create_client

    GROQ_API_KEY   = os.getenv("GROQ_API_KEY")
    GROQ_MODEL     = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
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

    from llama_index.core.schema import NodeWithScore, TextNode, QueryBundle
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
        from ragas import evaluate
        from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall
        from datasets import Dataset
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
