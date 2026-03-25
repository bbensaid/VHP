"""
backend/services/indexing.py
─────────────────────────────
Document ingestion (PDFs + Sanity CMS) and VectorStoreIndex management.
"""

import asyncio
import logging
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


async def build_index() -> VectorStoreIndex:
    """
    Build a VectorStoreIndex from all sources using semantic chunking.
    Documents are chunked with SentenceWindowNodeParser (±3 sentence window).
    """
    documents: List[Document] = []

    # 1. Load PDFs
    if DATA_DIR.exists():
        pdf_files = [f for f in DATA_DIR.iterdir() if f.suffix.lower() == ".pdf"]
        if pdf_files:
            log.info(f"📄 Loading {len(pdf_files)} PDF(s) from data/...")
            for pdf_path in pdf_files:
                try:
                    pdf_docs = SimpleDirectoryReader(input_files=[str(pdf_path)]).load_data()
                    for doc in pdf_docs:
                        doc.metadata.setdefault("source", "pdf")
                        doc.metadata.setdefault("pillar", "General")
                    documents.extend(pdf_docs)
                    log.info(f"  ✓ {pdf_path.name}: {len(pdf_docs)} pages")
                except Exception as e:
                    log.error(f"  ✗ {pdf_path.name} failed: {e}")

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
