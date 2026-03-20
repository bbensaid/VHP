"""
backend/main.py
───────────────
HTR AI Brain — FastAPI + LlamaIndex + Gemini + Supabase pgvector

Architecture:
  - Ingests PDFs from backend/data/ (auto-detects all .pdf files)
  - Ingests Sanity CMS content via GROQ HTTP API
  - Stores embeddings in Supabase pgvector (rag_documents table)
  - Serves a streaming /api/chat endpoint with conversation memory + JWT auth
  - Serves /api/ingest to re-trigger ingestion after new content

Auth:
  - /api/chat requires a valid Supabase JWT in Authorization: Bearer <token>
  - User role is extracted from Supabase JWT claims → tier-aware system prompt
  - Free users are rejected (subscriber+ required)

Run:
  uvicorn main:app --reload --port 8000
"""

import os
import asyncio
import logging
import json
from typing import Optional, List

import httpx
import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator
from supabase import create_client as create_supabase_client, Client as SupabaseClient

from llama_index.core import (
    VectorStoreIndex,
    StorageContext,
    SimpleDirectoryReader,
    Settings,
    Document,
)
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.llms import ChatMessage, MessageRole
from llama_index.llms.groq import Groq as GroqLLM
from llama_index.embeddings.openai import OpenAIEmbedding

try:
    from llama_index.vector_stores.postgres import PGVectorStore
    _PG_VECTOR_AVAILABLE = True
except ImportError:
    PGVectorStore = None  # type: ignore
    _PG_VECTOR_AVAILABLE = False

# ── Configuration ─────────────────────────────────────────────────────────────

load_dotenv(override=True)

OPENAI_API_KEY    = os.getenv("OPENAI_API_KEY")
SANITY_PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
SANITY_DATASET    = os.getenv("SANITY_DATASET", "production")
SANITY_API_TOKEN  = os.getenv("SANITY_API_TOKEN")
SANITY_API_VER    = os.getenv("SANITY_API_VERSION", "2023-10-01")
FRONTEND_URL      = os.getenv("FRONTEND_URL", "http://localhost:3000")
GROQ_API_KEY      = os.getenv("GROQ_API_KEY")
GROQ_MODEL        = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
EMBEDDING_MODEL   = "text-embedding-3-small"

# Supabase
SUPABASE_URL              = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_JWT_SECRET       = os.getenv("SUPABASE_JWT_SECRET")
# Postgres connection string for LlamaIndex SupabaseVectorStore
# Format: postgresql://postgres:[service_role_key]@db.[project_ref].supabase.co:5432/postgres
SUPABASE_DB_URL           = os.getenv("SUPABASE_DB_URL")

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")
# Local storage kept as emergency fallback if Supabase not configured
STORAGE_DIR = os.path.join(BASE_DIR, "storage")

SANITY_MAX_RETRIES  = 3
SANITY_RETRY_BACKOFF = 1.5
MAX_SYSTEM_PROMPT_LEN = 800

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("htr-brain")

# ── LlamaIndex model settings ─────────────────────────────────────────────────

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is required in backend/.env")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is required in backend/.env")
Settings.llm = GroqLLM(model=GROQ_MODEL, api_key=GROQ_API_KEY)
Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL, api_key=OPENAI_API_KEY)
log.info(f"LLM: Groq {GROQ_MODEL} | Embeddings: OpenAI {EMBEDDING_MODEL}")

# ── Supabase client ───────────────────────────────────────────────────────────

_supabase: Optional[SupabaseClient] = None

def get_supabase() -> Optional[SupabaseClient]:
    global _supabase
    if _supabase is None and SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
        _supabase = create_supabase_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    return _supabase

# ── FastAPI app ────────────────────────────────────────────────────────────────

app = FastAPI(title="HTR AI Brain", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Global index — protected by an asyncio lock
_index: Optional[VectorStoreIndex] = None
_index_lock = asyncio.Lock()

# ── JWT Auth ──────────────────────────────────────────────────────────────────

class AuthedUser(BaseModel):
    user_id: str
    email: str
    role: str  # highest role: free | subscriber | student | professional | advisory | admin

ROLE_HIERARCHY = ["free", "subscriber", "student", "professional", "advisory", "admin"]

async def get_auth_user(request: Request) -> AuthedUser:
    """
    Verify the Supabase JWT from Authorization: Bearer <token>.
    Then fetch the user's highest role from Supabase.
    Raises 401 if missing/invalid, 403 if role insufficient.
    """
    if not SUPABASE_JWT_SECRET:
        # Dev mode: no JWT verification, no token required
        log.warning("SUPABASE_JWT_SECRET not set — running in dev mode (all requests accepted as subscriber)")
        return AuthedUser(user_id="dev", email="dev@localhost", role="subscriber")

    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    token = auth_header.split(" ", 1)[1]

    try:
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")

    user_id = payload.get("sub")
    email = payload.get("email", "")

    # Fetch user's roles from Supabase
    supabase = get_supabase()
    role = "free"
    if supabase and user_id:
        try:
            res = supabase.table("user_roles").select("role").eq("user_id", user_id).execute()
            roles = [r["role"] for r in (res.data or [])]
            # Find highest role
            for r in reversed(ROLE_HIERARCHY):
                if r in roles:
                    role = r
                    break
        except Exception as e:
            log.warning(f"Could not fetch roles for {user_id}: {e}")

    return AuthedUser(user_id=user_id or "", email=email, role=role)


async def require_subscriber(request: Request) -> AuthedUser:
    """Dependency: require subscriber or higher role."""
    user = await get_auth_user(request)
    if ROLE_HIERARCHY.index(user.role) < ROLE_HIERARCHY.index("subscriber"):
        raise HTTPException(
            status_code=403,
            detail="A Subscriber plan or higher is required to use the AI Analyst."
        )
    return user

# ── Sanity ingestion ───────────────────────────────────────────────────────────

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


async def fetch_sanity_content() -> list[Document]:
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
            results = []
            for attempt in range(SANITY_MAX_RETRIES):
                try:
                    resp = await client.get(base_url, params={"query": query}, headers=headers)
                    if resp.status_code == 429:
                        wait = SANITY_RETRY_BACKOFF * (2 ** attempt)
                        await asyncio.sleep(wait)
                        continue
                    resp.raise_for_status()
                    results = resp.json().get("result", [])
                    break
                except httpx.HTTPStatusError as e:
                    log.error(f"  ✗ {content_type} HTTP {e.response.status_code}: {e}")
                    break
                except Exception as e:
                    if attempt < SANITY_MAX_RETRIES - 1:
                        await asyncio.sleep(SANITY_RETRY_BACKOFF * (2 ** attempt))
                    else:
                        log.error(f"  ✗ {content_type}: {e}")

            for doc in results:
                parts: list[str] = []
                title = doc.get("title") or doc.get("term") or ""
                if title:
                    parts.append(title)
                summary = doc.get("summary") or doc.get("description") or doc.get("abstract") or ""
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

    return documents


# ── Index Build ───────────────────────────────────────────────────────────────

def _build_pg_vector_store():
    """Create a pgvector-backed vector store if DB URL is configured."""
    if not SUPABASE_DB_URL or not _PG_VECTOR_AVAILABLE:
        log.warning("PG vector store unavailable — using local file storage as fallback")
        return None
    try:
        # asyncpg requires its own URL scheme; derive it from the sync URL
        async_db_url = SUPABASE_DB_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
        vector_store = PGVectorStore.from_params(
            connection_string=SUPABASE_DB_URL,
            async_connection_string=async_db_url,
            table_name="rag_documents",
            embed_dim=1536,  # text-embedding-3-small dimension
        )
        log.info("✅ PG vector store (Supabase pgvector) initialized")
        return vector_store
    except Exception as e:
        log.error(f"Could not init PG vector store: {e} — falling back to local storage")
        return None


async def build_index() -> VectorStoreIndex:
    """
    Build a VectorStoreIndex from all sources:
      1. PDFs in backend/data/
      2. Sanity CMS content

    Storage: Supabase pgvector (preferred) → local JSON (fallback)
    """
    documents: list[Document] = []

    # 1. Load PDFs
    if os.path.exists(DATA_DIR):
        pdf_files = [f for f in os.listdir(DATA_DIR) if f.lower().endswith(".pdf")]
        if pdf_files:
            log.info(f"📄 Loading {len(pdf_files)} PDF(s) from data/...")
            for pdf_file in pdf_files:
                pdf_path = os.path.join(DATA_DIR, pdf_file)
                try:
                    pdf_docs = SimpleDirectoryReader(input_files=[pdf_path]).load_data()
                    for doc in pdf_docs:
                        doc.metadata.setdefault("source", "pdf")
                        doc.metadata.setdefault("pillar", "General")
                    documents.extend(pdf_docs)
                    log.info(f"  ✓ {pdf_file}: {len(pdf_docs)} pages")
                except Exception as e:
                    log.error(f"  ✗ {pdf_file} failed: {e}")

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

    log.info(f"\n⏳ Embedding {len(documents)} documents...")

    vector_store = _build_pg_vector_store()

    if vector_store:
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        idx = VectorStoreIndex.from_documents(
            documents,
            storage_context=storage_context,
            show_progress=True,
        )
        log.info("✅ Index built and stored in Supabase pgvector")
    else:
        # Fallback: local JSON storage
        idx = VectorStoreIndex.from_documents(documents, show_progress=True)
        os.makedirs(STORAGE_DIR, exist_ok=True)
        idx.storage_context.persist(persist_dir=STORAGE_DIR)
        log.info(f"✅ Index built and persisted to local storage/ (fallback)")

    return idx


async def load_index() -> Optional[VectorStoreIndex]:
    """Try to load an existing index from Supabase or local storage."""
    vector_store = _build_pg_vector_store()

    if vector_store:
        try:
            storage_context = StorageContext.from_defaults(vector_store=vector_store)
            idx = VectorStoreIndex.from_vector_store(vector_store=vector_store)
            log.info("✅ Loaded existing index from Supabase pgvector")
            return idx
        except Exception as e:
            log.warning(f"Could not load from Supabase ({e}), trying local storage...")

    # Try local JSON fallback
    docstore_path = os.path.join(STORAGE_DIR, "docstore.json")
    if os.path.exists(docstore_path):
        try:
            from llama_index.core import load_index_from_storage
            storage_context = StorageContext.from_defaults(persist_dir=STORAGE_DIR)
            idx = load_index_from_storage(storage_context)
            log.info("✅ Loaded existing index from local storage/ (fallback)")
            return idx
        except Exception as e:
            log.warning(f"Could not load local index: {e}")

    return None


# ── Startup ────────────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    global _index
    log.info("\n🚀 HTR AI Brain v3 starting...")

    existing = await load_index()
    if existing:
        async with _index_lock:
            _index = existing
        log.info("Index ready. POST /api/ingest to refresh with new content.")
    else:
        log.info("No existing index found — building from scratch...")
        async with _index_lock:
            _index = await build_index()


@app.on_event("shutdown")
async def shutdown():
    log.info("🛑 HTR AI Brain shutting down...")


# ── Request models ─────────────────────────────────────────────────────────────

class HistoryMessage(BaseModel):
    role: str
    text: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        if v not in ("user", "ai"):
            raise ValueError("role must be 'user' or 'ai'")
        return v

    @field_validator("text")
    @classmethod
    def validate_text(cls, v: str) -> str:
        return v.strip()[:4000]


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[HistoryMessage]] = []
    temperature: Optional[float] = 0.7
    systemPrompt: Optional[str] = None

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("message cannot be empty")
        return v[:2000]

    @field_validator("systemPrompt")
    @classmethod
    def validate_system_prompt(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        v = v.strip()
        if len(v) > MAX_SYSTEM_PROMPT_LEN:
            raise ValueError(f"systemPrompt must be <= {MAX_SYSTEM_PROMPT_LEN} characters")
        return v

    @field_validator("temperature")
    @classmethod
    def validate_temperature(cls, v: Optional[float]) -> Optional[float]:
        if v is None:
            return 0.7
        return max(0.0, min(1.0, v))


# ── Tier-aware system prompts ─────────────────────────────────────────────────

BASE_SYSTEM_PROMPT = (
    "You are an expert AI Analyst for the Health Transformation Review (HTR). "
    "Your audience consists of healthcare executives, policy makers, and economists. "
    "Answer questions thoroughly and professionally, citing specific policies, data, "
    "and source documents where relevant. When referencing a document, name it explicitly "
    "(e.g. 'According to the Wyman Report...' or 'Vermont Act 167 states...'). "
    "Focus on policy, economics, technology, clinical outcomes, and health equity."
)

ADVISORY_SYSTEM_PROMPT = (
    BASE_SYSTEM_PROMPT +
    " You are speaking with an ADVISORY-tier client — a senior healthcare leader or "
    "organizational decision-maker. Provide deeper strategic analysis, quantitative "
    "benchmarking, and actionable recommendations tailored to organizational implementation. "
    "Feel free to draw on comparative case studies and multi-state examples."
)


def get_system_prompt(user: AuthedUser, client_prompt: Optional[str]) -> str:
    if client_prompt:
        return client_prompt
    if user.role in ("advisory", "admin"):
        return ADVISORY_SYSTEM_PROMPT
    return BASE_SYSTEM_PROMPT


# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.post("/api/chat")
async def chat(
    request: ChatRequest,
    user: AuthedUser = Depends(require_subscriber),
):
    """
    RAG-enhanced streaming chat with JWT auth and tier-aware prompts.
    Requires Authorization: Bearer <supabase_jwt>
    Subscriber+ access required.
    """
    if _index is None:
        raise HTTPException(status_code=503, detail="Index not ready — try again in a few seconds")

    log.info(f"Chat: user={user.user_id} role={user.role} msg_len={len(request.message)}")

    # Reconstruct conversation memory
    memory = ChatMemoryBuffer.from_defaults(token_limit=4096)
    for msg in (request.history or []):
        if not msg.text:
            continue
        if msg.role == "user":
            memory.put(ChatMessage(role=MessageRole.USER, content=msg.text))
        elif msg.role == "ai":
            memory.put(ChatMessage(role=MessageRole.ASSISTANT, content=msg.text))

    system_prompt = get_system_prompt(user, request.systemPrompt)

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
            log.error(f"Streaming error for user {user.user_id}: {e}")
            yield "\n\n[STREAM_ERROR]"

    return StreamingResponse(generate(), media_type="text/plain; charset=utf-8")


@app.post("/api/suggest")
async def suggest(request: ChatRequest):
    """
    Generate 3 follow-up question suggestions based on conversation history.
    No auth required — suggestions contain no sensitive data.
    """
    history_text = "\n".join(
        f"{'User' if m.role == 'user' else 'Analyst'}: {m.text[:400]}"
        for m in (request.history or [])[-6:]  # last 6 turns max
    )
    if request.message:
        history_text += f"\nUser: {request.message[:400]}"

    prompt = (
        "Based on this health policy conversation, suggest exactly 3 concise follow-up questions "
        "the user might want to ask next. Return ONLY a JSON array of 3 strings, no other text.\n\n"
        f"Conversation:\n{history_text}\n\n"
        "Return format: [\"question 1\", \"question 2\", \"question 3\"]"
    )

    try:
        response = await Settings.llm.acomplete(prompt)
        text = response.text.strip()
        # Extract JSON array from response
        start = text.find("[")
        end = text.rfind("]") + 1
        if start >= 0 and end > start:
            import json
            suggestions = json.loads(text[start:end])
            if isinstance(suggestions, list):
                return {"suggestions": suggestions[:3]}
    except Exception as e:
        log.warning(f"Suggest error: {e}")

    return {"suggestions": []}


@app.post("/api/ingest")
async def ingest(request: Request):
    """
    Re-index all content (PDFs + Sanity CMS) in the background.
    Requires admin or service-role auth in production.
    """
    global _index

    # Simple secret check for automated cron calls
    auth = request.headers.get("Authorization", "")
    ingest_secret = os.getenv("INGEST_SECRET")
    if ingest_secret and auth != f"Bearer {ingest_secret}":
        raise HTTPException(status_code=401, detail="Invalid ingest secret")

    async def rebuild():
        global _index
        log.info("🔄 /api/ingest — rebuilding index in background...")
        try:
            new_index = await build_index()
            async with _index_lock:
                _index = new_index
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
        "model": GROQ_MODEL,
        "embedding_model": EMBEDDING_MODEL,
        "vector_store": "pgvector" if SUPABASE_DB_URL else "local_json",
        "auth_enabled": bool(SUPABASE_JWT_SECRET),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
