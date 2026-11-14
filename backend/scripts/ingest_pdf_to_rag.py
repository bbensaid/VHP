"""
Load ONE PDF from backend/data/ into the AI Analyst's library (data_rag_documents)
without a full rebuild. Uses the same metadata, chunking and embedding model as
services/indexing.build_index(), and replaces any rows already loaded for that
file, so re-running it never creates duplicates.

    cd backend && venv/bin/python scripts/ingest_pdf_to_rag.py "Health Economics.pdf"
    (add --dry-run to count chunks without writing)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import psycopg2
from llama_index.core import Settings, StorageContext, VectorStoreIndex
from llama_index.core.node_parser import SentenceWindowNodeParser
from llama_index.embeddings.openai import OpenAIEmbedding

from config import DATA_DIR, EMBEDDING_MODEL, OPENAI_API_KEY, SUPABASE_DB_URL
from services import indexing

name = sys.argv[1]
dry = "--dry-run" in sys.argv
path = DATA_DIR / name
assert path.is_file(), f"not found: {path}"

# Same metadata rule as build_index(): known files get enriched labels.
meta = {"source": "pdf", "source_type": "general", "pillar": "General", "filename": name}
for key, m in sorted(indexing._known_pdf_metadata().items(), key=lambda kv: -len(kv[0])):  # longest name wins
    if key in name.lower():
        meta = {**m, "source": "pdf", "filename": name}
        break

docs = indexing.load_pdf_pages(path)
for d in docs:
    d.metadata.update(meta)
parser = SentenceWindowNodeParser.from_defaults(
    window_size=3, window_metadata_key="window", original_text_metadata_key="original_text"
)
nodes = parser.get_nodes_from_documents(docs)
for n in nodes:
    n.text = n.text.replace("\x00", "")[:30_000]
    for k, v in list(n.metadata.items()):
        if isinstance(v, str) and "\x00" in v:
            n.metadata[k] = v.replace("\x00", "")
print(f"{name}: {len(docs)} pages -> {len(nodes)} chunks; labels: {meta}")
if dry:
    sys.exit(0)

with psycopg2.connect(SUPABASE_DB_URL) as conn, conn.cursor() as cur:
    cur.execute(
        "SELECT max(id) FROM public.data_rag_documents "
        "WHERE coalesce(metadata_->>'file_name', metadata_->>'filename') = %s", (name,))
    old_max = cur.fetchone()[0]

Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL, api_key=OPENAI_API_KEY)
store = indexing._build_pg_vector_store()
assert store is not None, "PG vector store unavailable"
VectorStoreIndex(nodes, storage_context=StorageContext.from_defaults(vector_store=store), show_progress=True)

with psycopg2.connect(SUPABASE_DB_URL) as conn, conn.cursor() as cur:
    if old_max is not None:
        cur.execute(
            "DELETE FROM public.data_rag_documents WHERE id <= %s "
            "AND coalesce(metadata_->>'file_name', metadata_->>'filename') = %s", (old_max, name))
        print(f"removed {cur.rowcount} rows from an earlier load")
    cur.execute(
        "SELECT count(*) FROM public.data_rag_documents "
        "WHERE coalesce(metadata_->>'file_name', metadata_->>'filename') = %s", (name,))
    print(f"now in library: {cur.fetchone()[0]} chunks")
