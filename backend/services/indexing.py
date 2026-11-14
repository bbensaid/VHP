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
    Document,
    SimpleDirectoryReader,
    StorageContext,
    VectorStoreIndex,
)
from llama_index.core.node_parser import SentenceWindowNodeParser

from config import (
    DATA_DIR,
    SANITY_API_TOKEN,
    SANITY_API_VER,
    SANITY_DATASET,
    SANITY_MAX_RETRIES,
    SANITY_PROJECT_ID,
    SANITY_RETRY_BACKOFF,
    STORAGE_DIR,
    SUPABASE_DB_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_URL,
)
from services.medicaid_parser import parse_medicaid_directory

MEDICAID_DIR = DATA_DIR / "medicaid_eligibility"

try:
    from llama_index.vector_stores.postgres import PGVectorStore
    _PG_VECTOR_AVAILABLE = True
except ImportError:
    PGVectorStore = None  # type: ignore
    _PG_VECTOR_AVAILABLE = False

log = logging.getLogger("htr-brain")

SANITY_QUERIES = {
    "policyAnalysis": """*[_type=="policyAnalysis" && defined(slug.current)]{
        _id, title, pillar, summary, "slug": slug.current,
        "bodyText": pt::text(body)
    }""",
    "post": """*[_type=="post" && defined(slug.current)]{
        _id, title, "slug": slug.current,
        "bodyText": pt::text(body)
    }""",
    "academyModule": """*[_type=="academyModule" && defined(slug.current)]{
        _id, title, pillar, summary, learningObjectives, "slug": slug.current,
        "bodyText": pt::text(body)
    }""",
    "caseStudy": """*[_type=="caseStudy" && defined(slug.current)]{
        _id, title, pillar, summary, "slug": slug.current,
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
        _id, title, pillar, description, "slug": slug.current
    }""",
    "report": """*[_type=="report" && defined(slug.current)]{
        _id, title, pillar, abstract, "slug": slug.current
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

                if title:
                    parts.append(title)
                if summary:
                    parts.append(summary)
                if objectives and isinstance(objectives, list):
                    parts.append(". ".join(objectives))
                if body:
                    parts.append(body)

                content = "\n\n".join(filter(None, parts)).strip()
                if len(content) < 20:
                    continue

                pillar = doc.get("pillar")
                if not pillar and doc.get("pillars"):
                    pillar = doc["pillars"][0] if doc["pillars"] else None

                slug = doc.get("slug") or ""
                documents.append(Document(
                    text=content,
                    metadata={
                        "source":      content_type,
                        "source_type": content_type,
                        "doc_id":      doc["_id"],
                        "title":       title,
                        "pillar":      pillar or "General",
                        "slug":        slug,
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


# ── Stale-row cleanup for full rebuilds ───────────────────────────────────────
# A full rebuild inserts a fresh copy of every PDF and Sanity document. Until
# 2026-11-13 it never removed the previous copy, so each rebuild doubled the
# corpus (24,726 duplicate rows were found and deleted). The rebuild now notes
# the highest existing id for the sources it owns, inserts, and only then
# deletes the older rows — so a failed rebuild never leaves the table empty.
# Rows written by book-build/ingest_*_to_rag.py (htr_book_md, htr_briefing)
# are never touched here; those scripts manage their own rows.

_RAG_TABLE = "data_rag_documents"   # PGVectorStore prefixes "data_" to table_name
_REBUILD_SOURCES = ["pdf", "system", *SANITY_QUERIES.keys()]


def _max_rebuild_row_id() -> Optional[int]:
    import psycopg2
    with psycopg2.connect(SUPABASE_DB_URL) as conn, conn.cursor() as cur:
        cur.execute(
            f"SELECT max(id) FROM public.{_RAG_TABLE} WHERE metadata_->>'source' = ANY(%s)",
            (_REBUILD_SOURCES,),
        )
        return cur.fetchone()[0]


def _delete_superseded_rows(max_old_id: int) -> int:
    import psycopg2
    deleted = 0
    with psycopg2.connect(SUPABASE_DB_URL) as conn:
        while True:
            with conn.cursor() as cur:
                cur.execute(
                    f"DELETE FROM public.{_RAG_TABLE} WHERE id IN ("
                    f"  SELECT id FROM public.{_RAG_TABLE}"
                    f"  WHERE id <= %s AND metadata_->>'source' = ANY(%s) LIMIT 5000)",
                    (max_old_id, _REBUILD_SOURCES),
                )
                n = cur.rowcount
            conn.commit()
            deleted += n
            if n == 0:
                return deleted


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


# 1b. Load general PDFs from data/ root (excluding the medicaid_eligibility subfolder)
#
# Vermont-specific PDFs get enriched metadata so the retriever can surface them
# preferentially for Vermont-focused queries. The tagging is keyed on filename.
_VT_PDF_METADATA: dict[str, dict] = {
    # The book itself. The Introduction tells readers the AI Analyst is
    # "grounded in this book" — until this entry existed, it was not: the
    # corpus held policy PDFs only, so the Analyst answered framework
    # questions from model priors, which still assert the pre-v46 six-pillar
    # model. This is the authoritative source for the five pillars, the
    # Equity Imperative, the nine dependencies and the execution sequence.
    # Ch.1 §1.4 also states the rule for matrix membership: a dependency
    # earns a cell only when the upstream pillar delivers the currency it
    # issues (Policy=authority, Technology=information, Economics=incentives,
    # Clinical=outcomes, Operations=capacity). That is why there is no
    # Economics->Technology cell: transformation capital (RHT award, and the
    # EAST Fund under AHEAD before Vermont withdrew in July 2026) is
    # appropriated, and appropriation is authority, not incentive.
    "htr_book_v42.pdf": {
        "pillar": "HTR Framework",
        "source_type": "htr_book",
        "report": "Transforming American Healthcare — the HTR book (v42)",
        "year": "2026",
        "tags": (
            "htr,book,framework,five pillars,equity imperative,policy,technology,"
            "economics,clinical,operations,dependencies,execution sequence,vermont,"
            "act167,act68,onecare,ahead,global budgets,reference-based pricing,"
            "dependency matrix,matrix membership,what each pillar issues,"
            "authority,incentives,information,outcomes,capacity,"
            "transformation capital,incentive architecture,rht program,east fund"
        ),
    },
    # Reference textbook for health-economics concepts (replaced a pirated
    # dictionary removed 2026-11-13).
    "health economics.pdf": {
        "pillar": "Economics",
        "source_type": "general",
        "title": "Health Economics (Bhattacharya, Hyde & Tu, Palgrave Macmillan, 2014)",
        "report": "Health Economics — Bhattacharya, Hyde & Tu (2014)",
        "year": "2014",
        "tags": "health economics,textbook,insurance,adverse selection,moral hazard,qaly,cost-effectiveness,demand,supply,physicians,hospitals",
    },
    # Definitions of health-economics terms. Publisher copy supplied by the
    # author 2026-11-13 (replaces a shadow-library copy removed that day).
    "dictionary of health economics.pdf": {
        "pillar": "Economics",
        "source_type": "general",
        "title": "The Dictionary of Health Economics (Culyer, Edward Elgar)",
        "report": "The Dictionary of Health Economics — A. J. Culyer",
        "tags": "health economics,dictionary,definitions,glossary,terms,qaly,cost-effectiveness,insurance,equity",
    },
    "wyman_report.pdf": {
        "pillar": "Vermont / Act 167",
        "source_type": "vermont_policy",
        "jurisdiction": "Vermont",
        "report": "Oliver Wyman Act 167 Community Engagement Recommendations",
        "year": "2024",
        "tags": "act167,vermont,hospital,restructuring,gmcb,ahs,wyman,financials,coe,hsa,ems,transfer,beds",
    },
    "act167 as enacted.pdf": {
        "pillar": "Vermont / Act 167",
        "source_type": "vermont_legislation",
        "jurisdiction": "Vermont",
        "report": "Vermont Act 167 (2022) — As Enacted",
        "year": "2022",
        "tags": "act167,vermont,legislation,gmcb,ahs,hospital,sustainability",
    },
    "act068 act summary.pdf": {
        "pillar": "Vermont / Act 68",
        "source_type": "vermont_legislation",
        "jurisdiction": "Vermont",
        "report": "Vermont Act 68 Summary",
        "tags": "act68,vermont,legislation,medicaid",
    },
    "htr_vermont_act167_advisory.pdf": {
        "pillar": "Vermont / Act 167",
        "source_type": "vermont_advisory",
        "jurisdiction": "Vermont",
        "report": "HTR Vermont Act 167 Advisory",
        "tags": "act167,vermont,advisory,hospital,transformation",
    },
    "vermonts-rural-health-transformation-(rht)-program-application-activity-details-12052025.pdf": {
        "pillar": "Vermont / RHT",
        "source_type": "vermont_program",
        "jurisdiction": "Vermont",
        "report": "Vermont Rural Health Transformation Program Application",
        "tags": "rht,vermont,rural,transformation,ahead,tcoc",
    },
    "vermont rht budget narrative updated 01-30-26.pdf": {
        "pillar": "Vermont / RHT",
        "source_type": "vermont_program",
        "jurisdiction": "Vermont",
        "report": "Vermont RHT Budget Narrative 2026",
        "tags": "rht,vermont,rural,budget,transformation",
    },
    "rhtp 11-12-2025 (1).pdf": {
        "pillar": "Rural Health",
        "source_type": "national_policy",
        "report": "Rural Health Transformation Program — CMS",
        "tags": "rhtp,rural,cms,transformation,ahead,national",
    },
    "rhtp-50-state-spotlight_final.pdf": {
        "pillar": "Rural Health",
        "source_type": "national_policy",
        "report": "RHTP 50-State Spotlight",
        "tags": "rhtp,rural,states,transformation,cms",
    },
    "rht-program-state-provided-abstracts (1).pdf": {
        "pillar": "Rural Health",
        "source_type": "national_policy",
        "report": "RHTP State Abstracts",
        "tags": "rhtp,rural,states,transformation",
    },
}


def load_pdf_pages(pdf_path: Path) -> List[Document]:
    """One Document per page. SimpleDirectoryReader first; if it fails or returns
    nothing (it silently skipped 'Health Economics.pdf' with a TypeError, so that
    book was never indexed), fall back to plain pypdf with the same metadata keys."""
    docs = SimpleDirectoryReader(input_files=[str(pdf_path)]).load_data()
    if docs:
        return docs
    from pypdf import PdfReader
    log.warning(f"  ⚠️ {pdf_path.name}: default PDF reader returned nothing — using pypdf")
    reader = PdfReader(str(pdf_path))
    return [
        Document(
            text=(page.extract_text() or ""),
            metadata={"page_label": str(i + 1), "file_name": pdf_path.name},
        )
        for i, page in enumerate(reader.pages)
        if (page.extract_text() or "").strip()
    ]


def _known_pdf_metadata() -> dict:
    return _VT_PDF_METADATA


async def build_index() -> VectorStoreIndex:
    """
    Build a VectorStoreIndex from all sources.

    Two separate node pipelines are used:
      - Medicaid eligibility docs: section-aware chunks from medicaid_parser.py.
        These are already chunked at rule/section boundaries — do NOT re-chunk with
        SentenceWindowNodeParser (that would split conditional logic across chunks).
      - General PDFs + Sanity CMS: SentenceWindowNodeParser (±3 sentence window),
        same as before.

    Static PDFs are cached by SHA-256 hash — already-embedded files are skipped.
    """
    general_documents: List[Document] = []
    embed_cache = _load_embed_cache()
    cached_pdf_hits = 0

    # 1a. Load Medicaid eligibility PDFs — section-aware chunking, no sentence windowing
    medicaid_nodes = []
    if MEDICAID_DIR.exists():
        medicaid_pdf_files = sorted(MEDICAID_DIR.glob("*.pdf"))
        log.info(f"📋 Loading {len(medicaid_pdf_files)} Medicaid eligibility PDF(s) from data/medicaid_eligibility/...")
        try:
            from llama_index.core.schema import TextNode
            medicaid_docs = parse_medicaid_directory(MEDICAID_DIR)
            # Convert Documents directly to TextNodes (skip SentenceWindowNodeParser)
            for doc in medicaid_docs:
                medicaid_nodes.append(TextNode(
                    text=doc.text,
                    metadata=doc.metadata,
                ))
            log.info(f"  ✓ Medicaid parser: {len(medicaid_docs)} section chunks → {len(medicaid_nodes)} nodes (no re-chunking)")
        except Exception as e:
            log.error(f"  ✗ Medicaid directory parse failed: {e}")
    else:
        log.info("ℹ️  No data/medicaid_eligibility/ directory found — skipping")


    def _get_pdf_metadata(pdf_path: Path) -> dict:
        """Return enriched metadata for known Vermont/policy PDFs, generic otherwise."""
        fname_lower = pdf_path.name.lower()
        for key, meta in sorted(_VT_PDF_METADATA.items(), key=lambda kv: -len(kv[0])):  # longest name wins
            if key in fname_lower:
                return {**meta, "source": "pdf", "filename": pdf_path.name}
        return {"source": "pdf", "source_type": "general", "pillar": "General", "filename": pdf_path.name}

    if DATA_DIR.exists():
        pdf_files = [
            f for f in DATA_DIR.iterdir()
            if f.suffix.lower() == ".pdf" and f.is_file()
        ]
        if pdf_files:
            log.info(f"📄 Loading {len(pdf_files)} general PDF(s) from data/...")
            for pdf_path in pdf_files:
                try:
                    file_hash = _file_sha256(pdf_path)
                    enriched_meta = _get_pdf_metadata(pdf_path)

                    if file_hash in embed_cache:
                        cached_docs = [
                            Document(text=d["text"], metadata={**d["metadata"], **enriched_meta})
                            for d in embed_cache[file_hash]
                        ]
                        general_documents.extend(cached_docs)
                        cached_pdf_hits += 1
                        log.info(f"  ✓ {pdf_path.name}: {len(cached_docs)} pages (cache) [{enriched_meta.get('pillar')}]")
                        continue

                    pdf_docs = load_pdf_pages(pdf_path)
                    for doc in pdf_docs:
                        for k, v in enriched_meta.items():
                            doc.metadata[k] = v
                    general_documents.extend(pdf_docs)
                    embed_cache[file_hash] = [
                        {"text": doc.text, "metadata": doc.metadata} for doc in pdf_docs
                    ]
                    log.info(f"  ✓ {pdf_path.name}: {len(pdf_docs)} pages [{enriched_meta.get('pillar')}]")
                except Exception as e:
                    log.error(f"  ✗ {pdf_path.name} failed: {e}")

            if cached_pdf_hits:
                log.info(f"  📦 {cached_pdf_hits} PDF(s) served from embedding cache")
            _save_embed_cache(embed_cache)

    # 2. Fetch Sanity CMS
    log.info("🔗 Fetching Sanity CMS content...")
    sanity_docs = await fetch_sanity_content()
    general_documents.extend(sanity_docs)
    log.info(f"  ✓ {len(sanity_docs)} Sanity documents loaded")

    if not general_documents and not medicaid_nodes:
        general_documents = [Document(
            text="The HTR AI Brain is initializing. No content has been indexed yet.",
            metadata={"source": "system"},
        )]

    # 3. Sentence-window chunking for general docs only
    log.info(f"⏳ Chunking {len(general_documents)} general documents with SentenceWindowNodeParser...")
    parser = SentenceWindowNodeParser.from_defaults(
        window_size=3,
        window_metadata_key="window",
        original_text_metadata_key="original_text",
    )
    general_nodes = parser.get_nodes_from_documents(general_documents) if general_documents else []
    log.info(f"📝 {len(general_documents)} general docs → {len(general_nodes)} sentence-window nodes")

    # Combine: Medicaid section nodes + general sentence-window nodes
    all_nodes = medicaid_nodes + general_nodes
    log.info(f"📦 Total nodes to embed: {len(all_nodes)} ({len(medicaid_nodes)} medicaid + {len(general_nodes)} general)")

    # Safety pass: strip NUL bytes (PostgreSQL rejects them) and truncate oversized nodes.
    # NUL bytes can come from any PDF parser or window metadata.
    # ~30,000 chars ≈ 7,500 tokens — safely under OpenAI's 8192-token embedding limit.
    _EMBED_MAX_CHARS = 30_000
    nul_count = 0
    oversized_count = 0
    for n in all_nodes:
        # Strip NUL bytes from text
        if "\x00" in n.text:
            n.text = n.text.replace("\x00", "")
            nul_count += 1
        # Strip NUL bytes from all metadata string values
        for k, v in list(n.metadata.items()):
            if isinstance(v, str) and "\x00" in v:
                n.metadata[k] = v.replace("\x00", "")
        # Truncate if still too long
        if len(n.text) > _EMBED_MAX_CHARS:
            n.text = n.text[:_EMBED_MAX_CHARS]
            oversized_count += 1
    if nul_count:
        log.warning(f"⚠️  Stripped NUL bytes from {nul_count} node(s)")
    if oversized_count:
        log.warning(f"⚠️  Truncated {oversized_count} oversized node(s) to {_EMBED_MAX_CHARS} chars")

    # 4. Embed and store
    log.info(f"⏳ Embedding {len(all_nodes)} nodes...")
    vector_store = _build_pg_vector_store()

    if vector_store:
        max_old_id = _max_rebuild_row_id()
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        index = VectorStoreIndex(all_nodes, storage_context=storage_context, show_progress=True)
        if max_old_id is not None:
            removed = _delete_superseded_rows(max_old_id)
            log.info(f"🧹 Removed {removed} rows from the previous build (id <= {max_old_id})")
    else:
        STORAGE_DIR.mkdir(parents=True, exist_ok=True)
        storage_context = StorageContext.from_defaults(persist_dir=str(STORAGE_DIR))
        index = VectorStoreIndex(all_nodes, storage_context=storage_context, show_progress=True)
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
