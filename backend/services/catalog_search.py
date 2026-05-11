"""
backend/services/catalog_search.py
────────────────────────────────────
Semantic search over the HTR platform catalog.

At startup, every catalog entry is embedded using the same embedding model
as the document RAG pipeline (text-embedding-3-small). At query time, the
user's question is embedded and cosine similarity is used to find the most
relevant tools — no keyword matching, no manual maintenance.

HOW IT WORKS:
  1. build_catalog_index() is called once at startup from main.py
  2. It embeds each catalog entry's label + description + keywords
  3. find_relevant_tools_semantic(question, top_k) embeds the question
     and returns the top_k most similar catalog entries

WHY THIS MATTERS:
  "How many patients can Vermont hospitals handle?" → finds Bed Capacity & Transfer
  "inpatient overflow management" → finds Bed Capacity & Transfer
  "transfer bottleneck" → finds Bed Capacity & Transfer
  ...without any of those phrases being in a keyword list.
"""

import logging
import math
from typing import Optional

from llama_index.core import Settings

from platform_catalog import CATALOG, BASE_URL

log = logging.getLogger("htr-brain")

# Module-level state — populated at startup
_catalog_embeddings: list[list[float]] = []
_catalog_entries: list[dict] = []
_index_built = False


def _cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def _entry_text(entry: dict) -> str:
    """Build the text to embed for a catalog entry — richer = better retrieval."""
    parts = [
        entry["label"],
        entry["description"],
        entry.get("category", ""),
        entry.get("subcategory", ""),
        " ".join(entry.get("keywords", [])),
    ]
    return " | ".join(p for p in parts if p)


async def build_catalog_index() -> None:
    """
    Embed every catalog entry. Called once from main.py startup.
    Uses the same embed_model already initialised by init_global_settings().
    Falls back gracefully if embedding fails — catalog search just returns empty.
    """
    global _catalog_embeddings, _catalog_entries, _index_built

    if _index_built:
        return

    log.info(f"Building semantic catalog index for {len(CATALOG)} entries...")

    texts = [_entry_text(e) for e in CATALOG]

    try:
        # Batch embed — Settings.embed_model is already initialised by main.py startup
        embeddings = Settings.embed_model.get_text_embedding_batch(texts, show_progress=False)
        _catalog_embeddings = embeddings
        _catalog_entries = list(CATALOG)
        _index_built = True
        log.info(f"✅ Catalog semantic index ready ({len(CATALOG)} entries)")
    except Exception as e:
        log.warning(f"Catalog embedding failed — semantic search disabled: {e}")


def find_relevant_tools_semantic(
    question: str,
    top_k: int = 4,
    min_score: float = 0.30,
) -> list[dict]:
    """
    Embed the question and return the top_k most semantically similar catalog entries.
    Returns [] if the catalog index hasn't been built or embedding fails.

    min_score filters out weak matches (cosine similarity < 0.30 is usually noise).
    """
    if not _index_built or not _catalog_embeddings:
        return []

    try:
        q_embedding = Settings.embed_model.get_text_embedding(question)
    except Exception as e:
        log.warning(f"Question embedding failed in catalog search: {e}")
        return []

    scored = [
        (i, _cosine_similarity(q_embedding, emb))
        for i, emb in enumerate(_catalog_embeddings)
    ]
    scored.sort(key=lambda x: -x[1])

    results = []
    for i, score in scored[:top_k]:
        if score < min_score:
            break
        entry = dict(_catalog_entries[i])
        entry["_score"] = round(score, 4)
        full_url = BASE_URL + entry["url"] if entry["url"].startswith("/") else entry["url"]
        entry["full_url"] = full_url
        results.append(entry)

    if results:
        log.debug(
            f"Catalog search top matches for '{question[:60]}': "
            + ", ".join(f"{e['label']}({e['_score']})" for e in results)
        )

    return results


def format_tool_hint(entries: list[dict]) -> str:
    """
    Format matched catalog entries as a short injection into the system prompt.
    These are prepended before the full catalog so the AI sees them first.
    """
    if not entries:
        return ""
    lines = [
        "HIGHEST-RELEVANCE TOOLS FOR THIS SPECIFIC QUESTION (recommend these first):"
    ]
    for e in entries:
        lines.append(f'- [{e["label"]}]({e["full_url"]}) — {e["description"]}')
    return "\n".join(lines) + "\n\n"


def find_tools_for_query(question: str, top_k: int = 4) -> list[dict]:
    """
    Find the most relevant catalog tools for a question.
    Uses semantic search if the index is built, falls back to keyword matching.
    Always returns a full_url field on each entry.
    """
    from platform_catalog import CATALOG, BASE_URL, find_relevant_tools as kw_find

    def _enrich(entries: list[dict]) -> list[dict]:
        result = []
        for e in entries:
            e = dict(e)
            e["full_url"] = BASE_URL + e["url"] if e["url"].startswith("/") else e["url"]
            result.append(e)
        return result

    # Prefer semantic if index is ready
    semantic = find_relevant_tools_semantic(question, top_k=top_k)
    if semantic:
        return semantic  # already has full_url set

    # Fallback: keyword matching
    kw = kw_find(question, max_results=top_k)
    return _enrich(kw)


def build_guaranteed_lab_section(entries: list[dict]) -> str:
    """
    Build a deterministic 🔬 TRY IT IN THE HTR LAB section from matched catalog entries.
    This is appended by the backend CODE after the LLM stream — it is not LLM-generated
    and cannot be omitted or replaced by the model.
    """
    if not entries:
        return ""
    lines = ["\n\n🔬 TRY IT IN THE HTR LAB:"]
    for e in entries:
        lines.append(f'- [{e["label"]}]({e["full_url"]}) — {e["description"]}')
    return "\n".join(lines)
