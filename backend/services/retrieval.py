"""
backend/services/retrieval.py
──────────────────────────────
Hybrid BM25+vector retrieval with FlashRank re-ranking.
"""

import json
import logging
from typing import List, Optional

from llama_index.core import Settings
from llama_index.core.retrievers import BaseRetriever
from llama_index.core.schema import NodeWithScore, TextNode, QueryBundle
from supabase import Client as SupabaseClient

from services.llm import get_ranker

log = logging.getLogger("htr-brain")


class HybridRetriever(BaseRetriever):
    """
    Retrieves from Supabase using the hybrid_search_rag RPC:
      - Dense: cosine ANN on pgvector embeddings
      - Sparse: BM25 via PostgreSQL tsvector + ts_rank_cd
      - Merged: Reciprocal Rank Fusion (RRF)
      - Optional: filter_pillar narrows results to one intelligence pillar
    """

    def __init__(
        self,
        supabase: SupabaseClient,
        top_k: int = 20,
        filter_pillar: Optional[str] = None,
    ):
        self._sb           = supabase
        self._top_k        = top_k
        self._filter_pillar = filter_pillar
        super().__init__()

    def _retrieve(self, query_bundle: QueryBundle) -> List[NodeWithScore]:
        query = query_bundle.query_str
        try:
            embedding = Settings.embed_model.get_text_embedding(query)
            rpc_args: dict = {
                "query_text":      query,
                "query_embedding": embedding,
                "match_count":     self._top_k,
            }
            if self._filter_pillar:
                rpc_args["filter_pillar"] = self._filter_pillar

            result = self._sb.rpc("hybrid_search_rag", rpc_args).execute()

            nodes: List[NodeWithScore] = []
            for row in (result.data or []):
                meta = row.get("metadata_") or row.get("metadata") or {}
                if isinstance(meta, str):
                    try:
                        meta = json.loads(meta)
                    except Exception:
                        meta = {}
                meta.update({
                    "title":       row.get("title", ""),
                    "source_type": row.get("source_type", ""),
                    "pillar":      row.get("pillar", ""),
                    "url":         row.get("url", ""),
                })
                text = row.get("text") or row.get("chunk_text") or ""
                node = TextNode(text=text, metadata=meta)
                nodes.append(NodeWithScore(node=node, score=float(row.get("rrf_score", 0.0))))
            return nodes

        except Exception as e:
            log.warning(f"Hybrid search failed: {e} — falling back to vector-only")
            return []


class StaticNodeRetriever(BaseRetriever):
    """Returns pre-computed nodes regardless of query string."""

    def __init__(self, nodes: List[NodeWithScore]):
        self._nodes = nodes
        super().__init__()

    def _retrieve(self, query_bundle: QueryBundle) -> List[NodeWithScore]:
        return self._nodes


_VT_QUERY_SIGNALS = (
    "vermont", "act 167", "act167", "wyman", "gmcb", "gifford", "uvmmc", "nvrh", "nch",
    "north country", "grace cottage", "springfield hospital", "brattleboro", "copley",
    "rutland", "cvmc", "rrmc", "svmc", "nmc", "porter", "ascutney", "ahead model",
    "rht program", "hsa", "hospital service area", "coe", "center of excellence",
)

_VT_PILLAR_TAGS = {"Vermont / Act 167", "Vermont / RHT", "Vermont / Act 68", "vermont_policy",
                   "vermont_legislation", "vermont_program", "vermont_advisory"}


def _is_vermont_query(query: str) -> bool:
    q = query.lower()
    return any(sig in q for sig in _VT_QUERY_SIGNALS)


def boost_vermont_nodes(query: str, nodes: List[NodeWithScore]) -> List[NodeWithScore]:
    """
    For Vermont-focused queries, apply a score boost to nodes from Vermont-specific
    documents (Wyman report, Act 167, RHT, etc.) so they rank above generic content.
    Non-Vermont queries are unaffected.
    """
    if not _is_vermont_query(query):
        return nodes

    boosted = []
    for n in nodes:
        meta   = n.node.metadata or {}
        pillar = (meta.get("pillar") or "").strip()
        stype  = (meta.get("source_type") or "").strip()
        tags   = (meta.get("tags") or "").lower()
        is_vt  = (
            pillar in _VT_PILLAR_TAGS
            or stype in _VT_PILLAR_TAGS
            or "vermont" in pillar.lower()
            or "vermont" in stype.lower()
            or "vermont" in tags
        )
        boost = 0.25 if is_vt else 0.0
        boosted.append(NodeWithScore(node=n.node, score=n.score + boost))

    boosted.sort(key=lambda x: -x.score)
    return boosted


def rerank_nodes(query: str, nodes: List[NodeWithScore], top_k: int = 5) -> List[NodeWithScore]:
    """
    Re-rank nodes using FlashRank cross-encoder (ms-marco-MiniLM-L-12-v2).
    Falls back to top-k by original score if FlashRank is unavailable.
    """
    ranker = get_ranker()
    if not ranker or not nodes:
        return nodes[:top_k]
    try:
        from flashrank import RerankRequest
        passages = [{"id": i, "text": n.node.get_content()} for i, n in enumerate(nodes)]
        results  = ranker.rerank(RerankRequest(query=query, passages=passages))
        return [
            NodeWithScore(node=nodes[r["id"]].node, score=float(r.get("score", 0.0)))
            for r in results[:top_k]
        ]
    except Exception as e:
        log.warning(f"Re-ranking failed: {e}")
        return nodes[:top_k]


_PLATFORM_BASE = "https://healthtransformationreview.org"

# Maps Sanity content_type → platform URL prefix
_SOURCE_TYPE_URL_MAP = {
    "post":           "/policy",          # articles live under pillar paths
    "policyAnalysis": "/policy",
    "academyModule":  "/academy/modules",
    "caseStudy":      "/academy/case-studies",
    "webinar":        "/academy/webinars",
    "report":         "/research-lab/policy-analysis",
}


def _resolve_citation_url(meta: dict) -> str | None:
    """Resolve an internal platform URL from node metadata, falling back to stored url."""
    stored_url = (meta.get("url") or "").strip()
    slug        = (meta.get("slug") or "").strip()
    source_type = (meta.get("source_type") or meta.get("source") or "").strip()

    if slug and source_type in _SOURCE_TYPE_URL_MAP:
        prefix = _SOURCE_TYPE_URL_MAP[source_type]
        return f"{prefix}/{slug}"

    # Fall back to whatever URL was stored at index time (static nodes, PDFs, etc.)
    return stored_url or None


def extract_citations(nodes: List[NodeWithScore]) -> List[dict]:
    """
    Extract unique, non-empty source citations from retrieved nodes.
    Returns list of {title, url, pillar, source_type} dicts, deduped by title.
    Internal platform content gets resolved to relative platform URLs.
    """
    seen: set = set()
    citations: List[dict] = []
    for n in nodes:
        meta  = n.node.metadata or {}
        title = (meta.get("title") or "").strip()
        if not title or title in seen:
            continue
        seen.add(title)
        citations.append({
            "title":       title,
            "url":         _resolve_citation_url(meta),
            "pillar":      (meta.get("pillar") or "").strip() or None,
            "source_type": (meta.get("source_type") or meta.get("source") or "").strip() or None,
        })
    return citations
