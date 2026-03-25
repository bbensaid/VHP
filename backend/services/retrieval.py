"""
backend/services/retrieval.py
──────────────────────────────
Hybrid BM25+vector retrieval with FlashRank re-ranking.
"""

import json
import logging
from typing import List

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
    """

    def __init__(self, supabase: SupabaseClient, top_k: int = 20):
        self._sb    = supabase
        self._top_k = top_k
        super().__init__()

    def _retrieve(self, query_bundle: QueryBundle) -> List[NodeWithScore]:
        query = query_bundle.query_str
        try:
            embedding = Settings.embed_model.get_text_embedding(query)
            result    = self._sb.rpc("hybrid_search_rag", {
                "query_text":      query,
                "query_embedding": embedding,
                "match_count":     self._top_k,
            }).execute()

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
