#!/usr/bin/env python3
"""
ingest_sanity_to_rag.py — refresh the AI Analyst's Sanity-sourced RAG rows.
================================================================================

Re-run after Sanity content changes (policy briefs, Academy modules, glossary,
case studies, analyst notes, webinars, reports):

    backend/venv/bin/python book-build/ingest_sanity_to_rag.py [--dry-run]

Why not /api/ingest: build_index() re-embeds every PDF too (~52k rows) and never
deletes, so a re-run duplicates the corpus. The webhook path
(incremental_reindex_document) deletes from `rag_documents`, the dead table, so
it duplicates as well. This script touches only rows whose metadata `source` is
one of the Sanity content types, using the backend's own fetch and chunking so
the rows match what build_index() writes.

Order is embed -> delete -> insert, so a failed embedding run leaves the old
rows in place (same rule as ingest_book_to_rag.py).
"""

from __future__ import annotations

import argparse
import asyncio
import os
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BACKEND = REPO / "backend"
sys.path.insert(0, str(BACKEND))
os.chdir(BACKEND)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    from dotenv import load_dotenv
    load_dotenv(BACKEND / ".env")

    from llama_index.core import Settings
    from llama_index.core.node_parser import SentenceWindowNodeParser
    from llama_index.embeddings.openai import OpenAIEmbedding
    from llama_index.vector_stores.postgres import PGVectorStore
    import psycopg2

    from config import EMBEDDING_MODEL, SUPABASE_DB_URL
    from services.indexing import SANITY_QUERIES, fetch_sanity_content

    sources = list(SANITY_QUERIES.keys())
    docs = asyncio.run(fetch_sanity_content())
    if not docs:
        print("No Sanity documents fetched — aborting without touching the index.")
        return 1

    parser = SentenceWindowNodeParser.from_defaults(
        window_size=3,
        window_metadata_key="window",
        original_text_metadata_key="original_text",
    )
    nodes = parser.get_nodes_from_documents(docs)
    for n in nodes:
        n.text = n.text.replace("\x00", "")[:30_000]
        for k, v in list(n.metadata.items()):
            if isinstance(v, str) and "\x00" in v:
                n.metadata[k] = v.replace("\x00", "")

    by_src: dict[str, int] = {}
    for d in docs:
        by_src[d.metadata["source"]] = by_src.get(d.metadata["source"], 0) + 1
    print(f"Fetched {len(docs)} Sanity docs {by_src} -> {len(nodes)} nodes")

    db_url = SUPABASE_DB_URL or os.environ["SUPABASE_DB_URL"]
    conn = psycopg2.connect(db_url)
    with conn.cursor() as cur:
        cur.execute("SELECT metadata_->>'source', count(*) FROM public.data_rag_documents "
                    "WHERE metadata_->>'source' = ANY(%s) GROUP BY 1", (sources,))
        print("Existing rows:", dict(cur.fetchall()))
    conn.close()
    if args.dry_run:
        print("DRY RUN — nothing embedded, nothing written.")
        return 0

    # 1. Embed first. Embeddings are cached on disk by content hash, so a failed
    #    insert can be re-run without paying for (or waiting on) re-embedding.
    import hashlib, json
    cache_path = BACKEND / "storage" / "sanity_embed_cache.json"
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        cache = json.loads(cache_path.read_text())
    except Exception:
        cache = {}
    Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL)
    embed = Settings.embed_model
    texts = [n.get_content(metadata_mode="embed") for n in nodes]
    keys = [hashlib.sha256(x.encode()).hexdigest() for x in texts]
    todo = [i for i, k in enumerate(keys) if k not in cache]
    print(f"  {len(nodes) - len(todo)} embeddings cached, {len(todo)} to embed")
    BATCH = 100
    for j in range(0, len(todo), BATCH):
        idx = todo[j: j + BATCH]
        vecs = embed.get_text_embedding_batch([texts[i] for i in idx], show_progress=False)
        for i, v in zip(idx, vecs):
            cache[keys[i]] = v
        if (j // BATCH) % 20 == 0:
            print(f"  embedded {min(j + BATCH, len(todo))}/{len(todo)}")
            cache_path.write_text(json.dumps(cache))
    cache_path.write_text(json.dumps(cache))
    for n, k in zip(nodes, keys):
        n.embedding = cache[k]

    # 2. Only now remove the stale Sanity rows.
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    with conn.cursor() as cur:
        cur.execute("SET statement_timeout = '110s'")
        cur.execute("DELETE FROM public.data_rag_documents WHERE metadata_->>'source' = ANY(%s)",
                    (sources,))
        print(f"Deleted {cur.rowcount} stale Sanity rows.")
    conn.close()

    # 3. Insert through PGVectorStore (same table/params as indexing._build_pg_vector_store).
    store = PGVectorStore.from_params(
        connection_string=str(db_url),
        async_connection_string=db_url.replace("postgresql://", "postgresql+asyncpg://", 1),
        table_name="rag_documents",
        embed_dim=1536,
    )
    # Small batches: each row carries ~10KB of window metadata plus a 1536-dim
    # vector, and 500-row INSERTs made the server drop the connection.
    import time
    ids = []
    BATCH = 50
    for i in range(0, len(nodes), BATCH):
        for attempt in range(4):
            try:
                ids += store.add(nodes[i: i + BATCH])
                break
            except Exception as e:
                if attempt == 3:
                    raise
                print(f"  insert batch {i} failed ({type(e).__name__}); retrying")
                time.sleep(5 * (attempt + 1))
                store = PGVectorStore.from_params(
                    connection_string=str(db_url),
                    async_connection_string=db_url.replace("postgresql://", "postgresql+asyncpg://", 1),
                    table_name="rag_documents",
                    embed_dim=1536,
                )
        if (i // BATCH) % 40 == 0:
            print(f"  inserted {len(ids)}/{len(nodes)}")
    print(f"Inserted {len(ids)} rows into public.data_rag_documents.")

    # 4. Verify.
    conn = psycopg2.connect(db_url)
    with conn.cursor() as cur:
        cur.execute("SELECT metadata_->>'source', count(*) FROM public.data_rag_documents "
                    "WHERE metadata_->>'source' = ANY(%s) GROUP BY 1", (sources,))
        print("Rows now:", dict(cur.fetchall()))
    conn.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
