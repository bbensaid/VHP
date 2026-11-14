"""
Reload ALL current Sanity content into the AI Analyst's library
(data_rag_documents) without a full rebuild, so every passage carries its real
Sanity _id (metadata ref_doc_id). Run it when the library's Sanity content is
out of date or after changing how Sanity documents are indexed.

Safe order: the new passages are inserted FIRST, then the older Sanity
passages are deleted, so the Analyst never runs without Sanity content.
PDFs, the book and the briefings are not touched.

    cd backend && venv/bin/python scripts/reindex_sanity_to_rag.py --dry-run
    cd backend && venv/bin/python scripts/reindex_sanity_to_rag.py

Day to day this is not needed: once the Sanity webhook is set up, each
published edit updates its own passages automatically.
"""
import asyncio
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import psycopg2
from llama_index.core import Settings, StorageContext, VectorStoreIndex
from llama_index.core.node_parser import SentenceWindowNodeParser
from llama_index.embeddings.openai import OpenAIEmbedding

from config import EMBEDDING_MODEL, OPENAI_API_KEY, SUPABASE_DB_URL
from services import indexing

dry = "--dry-run" in sys.argv
types = list(indexing.SANITY_QUERIES.keys())

docs = asyncio.run(indexing.fetch_sanity_content())
assert docs, "no Sanity documents fetched: check SANITY_* settings in backend/.env"
bad = [d for d in docs if d.id_ != d.metadata.get("doc_id")]
assert not bad, f"{len(bad)} documents do not carry their Sanity _id"

parser = SentenceWindowNodeParser.from_defaults(
    window_size=3, window_metadata_key="window", original_text_metadata_key="original_text"
)
nodes = parser.get_nodes_from_documents(docs)
for n in nodes:
    n.text = n.text.replace("\x00", "")[:30_000]
    for k, v in list(n.metadata.items()):
        if isinstance(v, str) and "\x00" in v:
            n.metadata[k] = v.replace("\x00", "")

print("Sanity documents by type:", dict(Counter(d.metadata["source"] for d in docs)))
print(f"{len(docs)} documents -> {len(nodes)} passages to embed")

with psycopg2.connect(SUPABASE_DB_URL) as conn, conn.cursor() as cur:
    cur.execute(
        "SELECT count(*), max(id) FROM public.data_rag_documents WHERE metadata_->>'source' = ANY(%s)", (types,))
    old_count, old_max = cur.fetchone()
print(f"currently in library: {old_count} Sanity passages (highest row id {old_max})")
if dry:
    sys.exit(0)

Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL, api_key=OPENAI_API_KEY)
store = indexing._build_pg_vector_store()
assert store is not None, "PG vector store unavailable"
VectorStoreIndex(nodes, storage_context=StorageContext.from_defaults(vector_store=store), show_progress=True)

with psycopg2.connect(SUPABASE_DB_URL) as conn, conn.cursor() as cur:
    cur.execute(
        "SELECT count(*) FROM public.data_rag_documents WHERE metadata_->>'source' = ANY(%s) AND id > %s",
        (types, old_max or 0))
    new_count = cur.fetchone()[0]
    print(f"inserted: {new_count} passages")
    assert new_count >= len(nodes) * 0.99, "insert incomplete: old passages kept, nothing deleted"
    if old_max is not None:
        cur.execute(
            "DELETE FROM public.data_rag_documents WHERE metadata_->>'source' = ANY(%s) AND id <= %s",
            (types, old_max))
        print(f"removed {cur.rowcount} older Sanity passages")
    cur.execute(
        "SELECT count(*), count(DISTINCT metadata_->>'ref_doc_id') FROM public.data_rag_documents "
        "WHERE metadata_->>'source' = ANY(%s)", (types,))
    print("now in library: %s Sanity passages from %s documents" % cur.fetchone())
