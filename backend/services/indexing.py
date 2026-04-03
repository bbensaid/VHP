"""
backend/services/indexing.py
─────────────────────────────
Document ingestion (PDFs + Sanity CMS) and VectorStoreIndex management.
"""

import asyncio
import hashlib
import json
import logging
from pathlib import Path
from typing import List, Optional

import httpx
from llama_index.core import (
    VectorStoreIndex,
    StorageContext,
    SimpleDirectoryReader,
    Settings,
    Document,
)
from llama_index.core.node_parser import SentenceWindowNodeParser

from config import (
    DATA_DIR,
    STORAGE_DIR,
    SANITY_PROJECT_ID,
    SANITY_DATASET,
    SANITY_API_TOKEN,
    SANITY_API_VER,
    SANITY_MAX_RETRIES,
    SANITY_RETRY_BACKOFF,
    SUPABASE_DB_URL,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
)

try:
    from llama_index.vector_stores.postgres import PGVectorStore
    _PG_VECTOR_AVAILABLE = True
except ImportError:
    PGVectorStore = None  # type: ignore
    _PG_VECTOR_AVAILABLE = False

log = logging.getLogger("htr-brain")

SANITY_QUERIES = {
    "policyAnalysis": """*[_type=="policyAnalysis" && defined(slug.current)]{
        _id, title, pillar, summary,
        "bodyText": pt::text(body)
    }""",
    "post": """*[_type=="post" && defined(slug.current)]{
        _id, title,
        "bodyText": pt::text(body)
    }""",
    "academyModule": """*[_type=="academyModule" && defined(slug.current)]{
        _id, title, pillar, summary, learningObjectives,
        "bodyText": pt::text(body)
    }""",
    "caseStudy": """*[_type=="caseStudy" && defined(slug.current)]{
        _id, title, pillar, summary,
        "bodyText": pt::text(body)
    }""",
    "definition": """*[_type=="definition"]{
        _id, term, description, pillars
    }""",
    "analystNote": """*[_type=="analystNote"]{
        _id, title, pillar,
        "bodyText": pt::text(body)
    }""",
    "webinar": """*[_type=="webinar" && defined(slug.current)]{
        _id, title, pillar, description
    }""",
    "report": """*[_type=="report" && defined(slug.current)]{
        _id, title, pillar, abstract
    }""",
}


async def fetch_sanity_content() -> List[Document]:
    if not SANITY_PROJECT_ID or not SANITY_API_TOKEN:
        log.warning("Sanity env vars not set — skipping CMS content ingestion")
        return []

    base_url = (
        f"https://{SANITY_PROJECT_ID}.api.sanity.io"
        f"/v{SANITY_API_VER}/data/query/{SANITY_DATASET}"
    )
    headers   = {"Authorization": f"Bearer {SANITY_API_TOKEN}"}
    documents: List[Document] = []

    async with httpx.AsyncClient(timeout=30.0) as client:
        for content_type, query in SANITY_QUERIES.items():
            results = []
            for attempt in range(SANITY_MAX_RETRIES):
                try:
                    resp = await client.get(base_url, headers=headers, params={"query": query})
                    resp.raise_for_status()
                    results = resp.json().get("result", [])
                    break
                except Exception as e:
                    if attempt < SANITY_MAX_RETRIES - 1:
                        await asyncio.sleep(SANITY_RETRY_BACKOFF ** attempt)
                    else:
                        log.error(f"  ✗ {content_type}: {e}")

            for doc in results:
                parts: List[str] = []
                title      = doc.get("title") or doc.get("term") or ""
                summary    = doc.get("summary") or doc.get("description") or doc.get("abstract") or ""
                body       = doc.get("bodyText") or ""
                objectives = doc.get("learningObjectives")

                if title:      parts.append(title)
                if summary:    parts.append(summary)
                if objectives and isinstance(objectives, list):
                    parts.append(". ".join(objectives))
                if body:       parts.append(body)

                content = "\n\n".join(filter(None, parts)).strip()
                if len(content) < 20:
                    continue

                pillar = doc.get("pillar")
                if not pillar and doc.get("pillars"):
                    pillar = doc["pillars"][0] if doc["pillars"] else None

                documents.append(Document(
                    text=content,
                    metadata={
                        "source": content_type,
                        "doc_id": doc["_id"],
                        "title":  title,
                        "pillar": pillar or "General",
                    },
                ))
            log.info(f"  ✓ {content_type}: {len(results)} docs")

    return documents


def _build_pg_vector_store():
    if not SUPABASE_DB_URL or not _PG_VECTOR_AVAILABLE:
        log.warning("PG vector store unavailable — using local file storage as fallback")
        return None
    try:
        async_db_url = SUPABASE_DB_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
        vector_store = PGVectorStore.from_params(
            connection_string=str(SUPABASE_DB_URL),
            async_connection_string=async_db_url,
            table_name="rag_documents",
            embed_dim=1536,
        )
        log.info("✅ PG vector store (Supabase pgvector) initialized")
        return vector_store
    except Exception as e:
        log.error(f"Could not init PG vector store: {e} — falling back to local storage")
        return None


# ── Embedding cache ───────────────────────────────────────────────────────────

_EMBED_CACHE_PATH = STORAGE_DIR / "embedding_cache.json"


def _file_sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def _load_embed_cache() -> dict:
    try:
        if _EMBED_CACHE_PATH.exists():
            return json.loads(_EMBED_CACHE_PATH.read_text())
    except Exception:
        pass
    return {}


def _save_embed_cache(cache: dict) -> None:
    try:
        STORAGE_DIR.mkdir(parents=True, exist_ok=True)
        _EMBED_CACHE_PATH.write_text(json.dumps(cache, indent=2))
    except Exception as e:
        log.warning(f"Could not save embedding cache: {e}")


async def build_index() -> VectorStoreIndex:
    """
    Build a VectorStoreIndex from all sources using semantic chunking.
    Documents are chunked with SentenceWindowNodeParser (±3 sentence window).
    Static PDFs are cached by SHA-256 hash — already-embedded files are skipped.
    """
    documents: List[Document] = []
    embed_cache = _load_embed_cache()
    cached_pdf_hits = 0

    # 1. Load PDFs (with embedding cache)
    if DATA_DIR.exists():
        pdf_files = [f for f in DATA_DIR.iterdir() if f.suffix.lower() == ".pdf"]
        if pdf_files:
            log.info(f"📄 Loading {len(pdf_files)} PDF(s) from data/...")
            for pdf_path in pdf_files:
                try:
                    file_hash = _file_sha256(pdf_path)
                    if file_hash in embed_cache:
                        # Reconstruct Document objects from cache
                        cached_docs = [
                            Document(text=d["text"], metadata=d["metadata"])
                            for d in embed_cache[file_hash]
                        ]
                        documents.extend(cached_docs)
                        cached_pdf_hits += 1
                        log.info(f"  ✓ {pdf_path.name}: {len(cached_docs)} pages (from cache)")
                        continue

                    pdf_docs = SimpleDirectoryReader(input_files=[str(pdf_path)]).load_data()
                    for doc in pdf_docs:
                        doc.metadata.setdefault("source", "pdf")
                        doc.metadata.setdefault("pillar", "General")
                    documents.extend(pdf_docs)
                    # Store in cache
                    embed_cache[file_hash] = [
                        {"text": doc.text, "metadata": doc.metadata} for doc in pdf_docs
                    ]
                    log.info(f"  ✓ {pdf_path.name}: {len(pdf_docs)} pages (newly loaded)")
                except Exception as e:
                    log.error(f"  ✗ {pdf_path.name} failed: {e}")

            if cached_pdf_hits:
                log.info(f"  📦 {cached_pdf_hits} PDF(s) served from embedding cache")
            _save_embed_cache(embed_cache)

    # 2. Fetch Sanity CMS
    log.info("🔗 Fetching Sanity CMS content...")
    sanity_docs = await fetch_sanity_content()
    documents.extend(sanity_docs)
    log.info(f"  ✓ {len(sanity_docs)} Sanity documents loaded")

    if not documents:
        documents = [Document(
            text="The HTR AI Brain is initializing. No content has been indexed yet.",
            metadata={"source": "system"},
        )]

    # 3. Semantic chunking
    log.info(f"⏳ Chunking {len(documents)} documents with SentenceWindowNodeParser...")
    parser = SentenceWindowNodeParser.from_defaults(
        window_size=3,
        window_metadata_key="window",
        original_text_metadata_key="original_text",
    )
    nodes = parser.get_nodes_from_documents(documents)
    log.info(f"📝 {len(documents)} docs → {len(nodes)} sentence-window nodes")

    # 4. Embed and store
    log.info(f"⏳ Embedding {len(nodes)} nodes...")
    vector_store = _build_pg_vector_store()

    if vector_store:
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        index = VectorStoreIndex(nodes, storage_context=storage_context, show_progress=True)
    else:
        STORAGE_DIR.mkdir(parents=True, exist_ok=True)
        storage_context = StorageContext.from_defaults(persist_dir=str(STORAGE_DIR))
        index = VectorStoreIndex(nodes, storage_context=storage_context, show_progress=True)
        index.storage_context.persist(persist_dir=str(STORAGE_DIR))

    log.info("✅ Index built and stored.")
    return index


async def load_index() -> Optional[VectorStoreIndex]:
    vector_store = _build_pg_vector_store()
    if vector_store:
        try:
            idx = VectorStoreIndex.from_vector_store(vector_store=vector_store)
            log.info("✅ Loaded existing index from Supabase pgvector")
            return idx
        except Exception as e:
            log.warning(f"Could not load from Supabase ({e}), trying local storage...")

    docstore_path = STORAGE_DIR / "docstore.json"
    if docstore_path.exists():
        try:
            from llama_index.core import load_index_from_storage
            storage_context = StorageContext.from_defaults(persist_dir=str(STORAGE_DIR))
            idx = load_index_from_storage(storage_context)
            log.info("✅ Loaded existing index from local storage/ (fallback)")
            return idx
        except Exception as e:
            log.warning(f"Could not load local index: {e}")

    return None


# ── Incremental indexing ───────────────────────────────────────────────────────

# Generic query for any doc type — fetches by _id
_GENERIC_DOC_QUERY = """*[_id == $doc_id][0]{
    _id, _type, title, term, pillar, pillars, summary, description, abstract,
    "bodyText": pt::text(body)
}"""


async def fetch_single_sanity_doc(doc_id: str) -> Optional[Document]:
    """
    Fetch a single Sanity document by _id and return it as a LlamaIndex Document.
    Used by incremental_reindex_document.
    """
    if not SANITY_PROJECT_ID or not SANITY_API_TOKEN:
        return None

    base_url = (
        f"https://{SANITY_PROJECT_ID}.api.sanity.io"
        f"/v{SANITY_API_VER}/data/query/{SANITY_DATASET}"
    )
    headers = {"Authorization": f"Bearer {SANITY_API_TOKEN}"}

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            resp = await client.get(base_url, headers=headers, params={
                "query": _GENERIC_DOC_QUERY,
                "$doc_id": f'"{doc_id}"',
            })
            resp.raise_for_status()
            doc = resp.json().get("result")
    except Exception as e:
        log.error(f"fetch_single_sanity_doc failed: {e}")
        return None

    if not doc:
        log.info(f"Sanity doc {doc_id} not found (likely deleted)")
        return None

    title   = doc.get("title") or doc.get("term") or ""
    summary = doc.get("summary") or doc.get("description") or doc.get("abstract") or ""
    body    = doc.get("bodyText") or ""
    content = "\n\n".join(filter(None, [title, summary, body])).strip()

    if len(content) < 20:
        return None

    pillar = doc.get("pillar")
    if not pillar and doc.get("pillars"):
        pillar = doc["pillars"][0] if doc["pillars"] else None

    return Document(
        text=content,
        metadata={
            "source":  doc.get("_type", "sanity"),
            "doc_id":  doc_id,
            "title":   title,
            "pillar":  pillar or "General",
        },
    )


async def incremental_reindex_document(doc_id: str, index: VectorStoreIndex) -> bool:
    """
    Incrementally re-index a single Sanity document:
      1. Delete existing chunks for this doc_id from rag_documents
      2. Fetch updated content from Sanity
      3. Re-embed and insert new chunks into the index

    Returns True on success, False on failure or doc deleted.
    """
    log.info(f"📄 Incremental reindex: {doc_id}")

    # Step 1: Delete existing chunks via Supabase REST
    if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
        try:
            async with httpx.AsyncClient() as client:
                r = await client.delete(
                    f"{SUPABASE_URL}/rest/v1/rag_documents",
                    headers={
                        "apikey":        SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Prefer":        "return=minimal",
                    },
                    params={"metadata->>doc_id": f"eq.{doc_id}"},
                    timeout=15,
                )
                if r.status_code not in (200, 204):
                    log.warning(f"Delete chunks for {doc_id}: HTTP {r.status_code}")
        except Exception as e:
            log.warning(f"Could not delete old chunks for {doc_id}: {e}")

    # Step 2: Fetch updated content from Sanity
    doc = await fetch_single_sanity_doc(doc_id)
    if doc is None:
        log.info(f"  Doc {doc_id} deleted or empty — chunks removed, nothing re-inserted")
        return True

    # Step 3: Parse + embed new chunks and insert into live index
    try:
        parser = SentenceWindowNodeParser.from_defaults(
            window_size=3,
            window_metadata_key="window",
            original_text_metadata_key="original_text",
        )
        nodes = parser.get_nodes_from_documents([doc])
        log.info(f"  Re-indexing {len(nodes)} nodes for doc {doc_id}")
        index.insert_nodes(nodes)
        log.info(f"  ✅ Incremental reindex complete for {doc_id} (~{len(nodes)} chunks)")
        return True
    except Exception as e:
        log.error(f"  ❌ Incremental reindex failed for {doc_id}: {e}")
        return False
