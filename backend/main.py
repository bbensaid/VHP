"""
backend/main.py
───────────────
HTR AI Brain — FastAPI + LlamaIndex + Gemini

Architecture:
  - Ingests PDFs from backend/data/ (auto-detects all .pdf files)
  - Ingests Sanity CMS content via GROQ HTTP API
  - Builds a VectorStoreIndex persisted to backend/storage/
  - Serves a streaming /api/chat endpoint with conversation memory
  - Serves /api/ingest to re-trigger ingestion after new content

Startup behaviour:
  - If backend/storage/ exists: loads persisted index (fast, ~2s)
  - If not: builds index from scratch, then persists (slow on first run)

Run:
  uvicorn main:app --reload --port 8000
"""

import os
import asyncio
import logging
from typing import Optional, List

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from llama_index.core import (
    VectorStoreIndex,
    StorageContext,
    SimpleDirectoryReader,
    Settings,
    Document,
)
from llama_index.core import load_index_from_storage
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.llms import ChatMessage, MessageRole
from llama_index.llms.google_genai import GoogleGenAI
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding

# ── Configuration ─────────────────────────────────────────────────────────────

load_dotenv(override=True)

GOOGLE_API_KEY    = os.getenv("GOOGLE_API_KEY")
SANITY_PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
SANITY_DATASET    = os.getenv("SANITY_DATASET", "production")
SANITY_API_TOKEN  = os.getenv("SANITY_API_TOKEN")
SANITY_API_VER    = os.getenv("SANITY_API_VERSION", "2023-10-01")
FRONTEND_URL      = os.getenv("FRONTEND_URL", "http://localhost:3000")

BASE_DIR    = os.path.dirname(__file__)
DATA_DIR    = os.path.join(BASE_DIR, "data")
STORAGE_DIR = os.path.join(BASE_DIR, "storage")

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("htr-brain")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is required in backend/.env")

# ── LlamaIndex model settings ─────────────────────────────────────────────────

Settings.llm = GoogleGenAI(
    model="models/gemini-flash-lite-latest",
    api_key=GOOGLE_API_KEY,
)
Settings.embed_model = GoogleGenAIEmbedding(
    model="models/text-embedding-004",
    api_key=GOOGLE_API_KEY,
)

# ── FastAPI app ────────────────────────────────────────────────────────────────

app = FastAPI(title="HTR AI Brain", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global index — built once at startup, replaced by /api/ingest
_index: Optional[VectorStoreIndex] = None


# ── Sanity ingestion ───────────────────────────────────────────────────────────

# GROQ projections — string::join flattens portable text blocks to plain string.
SANITY_QUERIES = {
    "policyAnalysis": """*[_type=="policyAnalysis" && defined(slug.current)]{
        _id, title, pillar, summary,
        "bodyText": string::join(body[].children[].text, " ")
    }""",
    "post": """*[_type=="post" && defined(slug.current)]{
        _id, title,
        "bodyText": string::join(body[].children[].text, " ")
    }""",
    "academyModule": """*[_type=="academyModule" && defined(slug.current)]{
        _id, title, pillar, summary, learningObjectives,
        "bodyText": string::join(body[].children[].text, " ")
    }""",
    "caseStudy": """*[_type=="caseStudy" && defined(slug.current)]{
        _id, title, pillar, summary,
        "bodyText": string::join(body[].children[].text, " ")
    }""",
    "definition": """*[_type=="definition"]{
        _id, term, description, pillars
    }""",
    "analystNote": """*[_type=="analystNote"]{
        _id, title, pillar,
        "bodyText": string::join(body[].children[].text, " ")
    }""",
    "webinar": """*[_type=="webinar" && defined(slug.current)]{
        _id, title, pillar, description
    }""",
    "report": """*[_type=="report" && defined(slug.current)]{
        _id, title, pillar, abstract
    }""",
}


async def fetch_sanity_content() -> list[Document]:
    """Fetch all publishable content from Sanity CMS via GROQ HTTP API."""
    if not SANITY_PROJECT_ID or not SANITY_API_TOKEN:
        log.warning("Sanity env vars not set — skipping CMS content ingestion")
        return []

    base_url = (
        f"https://{SANITY_PROJECT_ID}.api.sanity.io"
        f"/v{SANITY_API_VER}/data/query/{SANITY_DATASET}"
    )
    headers = {"Authorization": f"Bearer {SANITY_API_TOKEN}"}
    documents: list[Document] = []

    async with httpx.AsyncClient(timeout=30.0) as client:
        for content_type, query in SANITY_QUERIES.items():
            try:
                resp = await client.get(base_url, params={"query": query}, headers=headers)
                resp.raise_for_status()
                results = resp.json().get("result", [])

                for doc in results:
                    parts: list[str] = []

                    title = doc.get("title") or doc.get("term") or ""
                    if title:
                        parts.append(title)

                    summary = (
                        doc.get("summary")
                        or doc.get("description")
                        or doc.get("abstract")
                        or ""
                    )
                    if summary:
                        parts.append(summary)

                    objectives = doc.get("learningObjectives")
                    if objectives and isinstance(objectives, list):
                        parts.append(". ".join(objectives))

                    body = doc.get("bodyText") or ""
                    if body:
                        parts.append(body)

                    content = "\n\n".join(filter(None, parts)).strip()
                    if len(content) < 20:
                        continue

                    pillar = doc.get("pillar")
                    if not pillar and doc.get("pillars"):
                        pillar = doc["pillars"][0] if doc["pillars"] else None

                    documents.append(
                        Document(
                            text=content[:8000],
                            metadata={
                                "source": content_type,
                                "doc_id": doc["_id"],
                                "title": title,
                                "pillar": pillar or "General",
                            },
                        )
                    )

                log.info(f"  ✓ {content_type}: {len(results)} docs")

            except Exception as e:
                log.error(f"  ✗ {content_type}: {e}")

    return documents


async def build_index() -> VectorStoreIndex:
    """
    Build a fresh VectorStoreIndex from all sources:
      1. PDFs in backend/data/   (drop new PDFs here, call /api/ingest)
      2. Sanity CMS content

    Persists to backend/storage/ — subsequent startups load in ~2s.
    """
    documents: list[Document] = []

    # 1. Load PDFs
    if os.path.exists(DATA_DIR):
        pdf_files = [f for f in os.listdir(DATA_DIR) if f.lower().endswith(".pdf")]
        if pdf_files:
            log.info(f"📄 Loading {len(pdf_files)} PDF(s) from data/...")
            try:
                pdf_docs = SimpleDirectoryReader(DATA_DIR).load_data()
                for doc in pdf_docs:
                    doc.metadata.setdefault("source", "pdf")
                    doc.metadata.setdefault("pillar", "General")
                documents.extend(pdf_docs)
                log.info(f"  ✓ {len(pdf_docs)} pages loaded from PDFs")
            except Exception as e:
                log.error(f"  ✗ PDF loading failed: {e}")
        else:
            log.info("  (no PDFs in data/ — add .pdf files and call POST /api/ingest)")

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

    log.info(f"\n⏳ Embedding {len(documents)} documents (first run takes a few minutes)...")
    idx = VectorStoreIndex.from_documents(documents, show_progress=True)

    os.makedirs(STORAGE_DIR, exist_ok=True)
    idx.storage_context.persist(persist_dir=STORAGE_DIR)
    log.info(f"✅ Index built and persisted to storage/")

    return idx


# ── Startup ────────────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    global _index
    log.info("\n🚀 HTR AI Brain starting...")

    docstore_path = os.path.join(STORAGE_DIR, "docstore.json")
    if os.path.exists(docstore_path):
        log.info("📦 Loading persisted index from storage/...")
        try:
            storage_context = StorageContext.from_defaults(persist_dir=STORAGE_DIR)
            _index = load_index_from_storage(storage_context)
            log.info("✅ Index ready. POST /api/ingest to refresh with new content.")
            return
        except Exception as e:
            log.warning(f"Could not load persisted index ({e}), rebuilding...")

    _index = await build_index()


# ── Request models ─────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []
    temperature: Optional[float] = 0.7
    systemPrompt: Optional[str] = None


# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    RAG-enhanced streaming chat with conversation memory.
    Payload shape matches the previous TypeScript endpoint — no frontend changes needed.
    """
    if _index is None:
        raise HTTPException(status_code=503, detail="Index not ready — try again in a few seconds")

    # Reconstruct conversation memory from the history array sent by the frontend
    memory = ChatMemoryBuffer.from_defaults(token_limit=4096)
    for msg in (request.history or []):
        role = msg.get("role", "")
        text = msg.get("text", "").strip()
        if not text:
            continue
        if role == "user":
            memory.put(ChatMessage(role=MessageRole.USER, content=text))
        elif role == "ai":
            memory.put(ChatMessage(role=MessageRole.ASSISTANT, content=text))

    system_prompt = request.systemPrompt or (
        "You are an expert AI Analyst for the Health Transformation Review (HTR). "
        "Your audience consists of healthcare executives, policy makers, and economists. "
        "Answer questions thoroughly and professionally, citing specific policies, data, "
        "and source documents where relevant. When referencing a document, name it explicitly "
        "(e.g. 'According to the Wyman Report...' or 'Vermont Act 167 states...'). "
        "Focus on policy, economics, technology, clinical outcomes, and health equity."
    )

    chat_engine = _index.as_chat_engine(
        chat_mode="context",
        memory=memory,
        system_prompt=system_prompt,
        verbose=False,
    )

    async def generate():
        try:
            streaming_response = await chat_engine.astream_chat(request.message)
            async for token in streaming_response.async_response_gen():
                yield token
        except Exception as e:
            log.error(f"Streaming error: {e}")
            yield f"\n\n[Error: {e}]"

    return StreamingResponse(generate(), media_type="text/plain; charset=utf-8")


@app.post("/api/ingest")
async def ingest():
    """
    Re-index all content (PDFs + Sanity CMS) in the background.
    Call this after:
      - Dropping new PDF files into backend/data/
      - Publishing significant new content in Sanity
    """
    global _index

    async def rebuild():
        global _index
        log.info("🔄 /api/ingest — rebuilding index in background...")
        try:
            _index = await build_index()
            log.info("✅ Background rebuild complete.")
        except Exception as e:
            log.error(f"Background rebuild failed: {e}")

    asyncio.create_task(rebuild())
    return {
        "status": "accepted",
        "message": "Index rebuild started. Watch server logs for progress.",
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "index_ready": _index is not None,
        "model": "gemini-flash-lite-latest",
        "embedding_model": "text-embedding-004",
        "persisted": os.path.exists(os.path.join(STORAGE_DIR, "docstore.json")),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
