# 06 — The AI Analyst & RAG Backend

> **Verified against:** `backend/main.py`, `backend/config.py`, `backend/services/{llm,retrieval,indexing,auth,catalog_search,tools}.py`, `backend/routers/{chat,ingest,api_v1,vermont_ops,personalized_learning}.py`, `frontend/app/api/{chat,suggest,webhooks/sanity}/route.ts`.

The **AI Analyst** is the platform's conversational research assistant. It is a retrieval-augmented generation (RAG) system backed by the FastAPI "HTR AI Brain" (v4.2.0). This document explains how it works and how to operate it.

## Table of contents
1. [Where the AI shows up](#1-where-the-ai-shows-up)
2. [The request path end-to-end](#2-the-request-path-end-to-end)
3. [Model routing by role](#3-model-routing-by-role)
4. [Retrieval pipeline](#4-retrieval-pipeline)
5. [The agentic (ReAct) pipeline & tools](#5-the-agentic-react-pipeline--tools)
6. [Ingest: keeping RAG in sync with Sanity](#6-ingest-keeping-rag-in-sync-with-sanity)
7. [Suggestions & the feature catalog](#7-suggestions--the-feature-catalog)
8. [The developer API (`/api/v1`)](#8-the-developer-api-apiv1)
9. [Vermont Ops tools](#9-vermont-ops-tools)
10. [Operating, tuning & troubleshooting](#10-operating-tuning--troubleshooting)

---

## 1. Where the AI shows up

| Surface | Component / route |
|---|---|
| Right-sidebar widget (every page) | `frontend/components/RightSidebar.tsx` |
| Full-page chat | `/chat` |
| Follow-up suggestions | `/api/suggest` |
| Personalized learning generation | `/academy/personalized-learning` → `/api/personalized-learning` |

The frontend never calls the LLM directly. It calls Next.js route handlers (`/api/chat`, `/api/suggest`) which authenticate the Supabase session and proxy to the backend (`BACKEND_URL`).

## 2. The request path end-to-end

```
Browser (RightSidebar / /chat)
   │  POST /api/chat   (Next.js route handler)
   ▼
frontend/app/api/chat/route.ts
   │  - validates Supabase session, attaches JWT
   │  - fetch() → BACKEND_URL  POST /api/chat
   ▼
backend/routers/chat.py  (require_subscriber)
   │  1. verify JWT (services/auth.py, SUPABASE_JWT_SECRET)
   │  2. resolve role  →  pick LLM (services/llm.get_llm_for_role)
   │  3. retrieve context (HybridRetriever + rerank + Vermont boost)
   │  4. (professional/advisory/admin) attach ReAct tools
   │  5. stream answer + citations
   ▼
StreamingResponse  →  relayed to browser token-by-token
```

CORS is locked to `FRONTEND_URL` + `localhost:3000`. Rate limiting via `slowapi`. Sentry wraps everything.

## 3. Model routing by role

`backend/services/llm.py → get_llm_for_role(role)`. Every model is wrapped in a `FallbackLLM` so a provider outage degrades gracefully rather than failing.

| Role | Primary model | Fallback chain |
|---|---|---|
| `free` / `student` | Groq `llama-3.1-8b-instant` (`MODEL_FREE`) | → OpenAI `gpt-4o-mini` |
| `subscriber` / `professional` | Groq `llama-3.3-70b-versatile` (`MODEL_SUBSCRIBER`) | → `llama-3.1-8b-instant` → `gpt-4o-mini` |
| `advisory` / `admin` | Anthropic `claude-sonnet-4-6` (`MODEL_ADVISORY`) | → `llama-3.3-70b-versatile` → `gpt-4o-mini` |

- **Embeddings:** OpenAI (`EMBEDDING_MODEL`) — required for RAG. Without `OPENAI_API_KEY`, ingest and retrieval cannot embed.
- Models are configurable via env (`GROQ_MODEL`, etc.). Anthropic is an **optional** dependency — if the package/key is absent, advisory/admin gracefully fall back to the subscriber model.

## 4. Retrieval pipeline

In `backend/services/retrieval.py` and `indexing.py`:

1. **Index build/load** (`build_index` / `load_index`) — pulls content (`fetch_sanity_content`) and the pgvector store.
2. **`HybridRetriever`** — combines vector similarity (pgvector, hybrid search SQL fn from migration 007) with keyword matching. `StaticNodeRetriever` is used where a fixed node set is appropriate.
3. **Rerank** — `rerank_nodes` via FlashRank (`get_ranker`) reorders candidates by relevance. (`MetadataReplacementNodePostprocessor` swaps in full-window context.)
4. **Vermont boost** — `boost_vermont_nodes` raises Vermont-specific results because Vermont is the flagship use-case.
5. **Citations** — `extract_citations` attaches source references so the UI can show what grounded each answer.

Tuning levers live in `config.py` (e.g. `MAX_SYSTEM_PROMPT_LEN`) and the retriever constructor (top-k, score thresholds).

## 5. The agentic (ReAct) pipeline & tools

For `professional`, `advisory`, `admin` roles (`AGENTIC_ROLES` in `chat.py`), the chat uses a LlamaIndex **ReActAgent** with function tools instead of plain context-stuffing. The agent can call tools, observe results, and reason in steps.

`backend/services/tools.py → ALL_TOOLS`:

| Tool | Function name | What it answers |
|---|---|---|
| State metrics | `query_state_metrics` | Per-state six-pillar performance data |
| Research Lab | `list_research_lab_tools` | Which interactive Lab tools exist |
| VT hospital financials | `query_vermont_hospital_financials` | Vermont hospital financial data |
| VT bed capacity | `query_vermont_bed_capacity` | Current bed capacity |
| Act 167 recommendations | `query_act167_recommendations` | Vermont Act 167 guidance |
| Best transfer | `find_best_transfer` | Optimal patient transfer destination |
| VT HSA population | `query_vermont_hsa_population` | Health Service Area population |
| VT system summary | `query_vermont_system_summary` | System-wide Vermont snapshot |

Lower roles (subscriber) get RAG-only `ContextChatEngine` (no tools).

## 6. Ingest: keeping RAG in sync with Sanity

`backend/routers/ingest.py` exposes:

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST /api/ingest` (202) | `INGEST_SECRET` | Kick off a full/background re-index job |
| `GET /api/ingest/status` | `INGEST_SECRET` | Poll job status |
| `POST /api/ingest/webhook` (202) | Bearer `INGEST_SECRET` | Incremental ingest of a single changed doc (called by `/api/webhooks/sanity`) |

**Incremental flow (normal operation):** Editor publishes in Sanity → Sanity GROQ webhook → Next.js `/api/webhooks/sanity` → backend `/api/ingest/webhook` → `_run_incremental(doc_id, index)` parses, chunks, embeds, upserts into pgvector. The new content is answerable within seconds.

**Full re-index (recovery):** if RAG drifts (e.g. after a bulk content migration or restore), POST `/api/ingest` to rebuild. Poll `/api/ingest/status`.

> The ingest filter (which `_type`s reach RAG) is set on the Sanity webhook: `policyAnalysis`, `post`, `academyModule`, `caseStudy`, `definition`, `analystNote`, `webinar`, `report`. See [Doc 03 §8](./03-content-sanity.md).

## 7. Suggestions & the feature catalog

- **`/api/suggest`** (open, no subscription) generates follow-up questions.
- **`services/catalog_search.py`** holds a semantic index of the platform's own pages/tools (`platform_catalog.py → HTR_TOOLS_CATALOG_TEXT`). When a user's question maps to a feature (e.g. "compare states"), the AI surfaces a link to the right page (`find_relevant_tools_semantic`, `build_guaranteed_lab_section`). This is what lets the Analyst say "use the State Comparison tool at /compare-states."

## 8. The developer API (`/api/v1`)

`backend/routers/api_v1.py`. Authenticated by **API key** (header `X-HTR-API-Key`), validated by `require_api_key` against the `api_keys` table (HMAC-hashed, rotatable — migration 023). Endpoints:

| Endpoint | Returns |
|---|---|
| `GET /api/v1/states` | All state performance profiles |
| `GET /api/v1/states/{state_id}` | One state profile |
| `GET /api/v1/survey/results` | Aggregated survey results (current edition) |

Users manage keys at `/account/api-keys` (`/api/keys/create`, `/revoke`, `/rotate`).

## 9. Vermont Ops tools

`backend/routers/vermont_ops.py` powers the operational Vermont features (subscriber+). Surfaced in the app at `/bed-capacity`, `/connect/alerts`, etc.

| Endpoint | Purpose |
|---|---|
| `GET /vermont/bed-capacity` | Current bed capacity |
| `PATCH /vermont/bed-capacity/{hospital_id}` | Update capacity |
| `GET /vermont/alerts` | Capacity alerts |
| `POST /vermont/transfer-log` | Log a patient transfer |
| `GET /vermont/transfer-log` | Read transfer log |

These also back the agentic tools in §5 (e.g. `find_best_transfer`).

## 10. Operating, tuning & troubleshooting

**Health & monitoring**
- `GET /health` — liveness (Fly + Railway healthcheck path).
- Sentry captures backend exceptions (`SENTRY_DSN`, `traces_sample_rate=0.1`).
- `rag_query_log` records queries; `rag_feedback` records 👍/👎. Review these to spot weak answers.

**Common issues**

| Symptom | Likely cause | Fix |
|---|---|---|
| 401 from chat | JWT secret mismatch | Backend `SUPABASE_JWT_SECRET` must match Supabase project |
| "No context"/empty answers | Empty/stale RAG index | Run full ingest `POST /api/ingest` |
| Ingest webhook ignored | `INGEST_SECRET` mismatch or doc `_type` not in filter | Align secrets; check webhook filter |
| Slow first response | Backend cold start (Fly scale-to-zero, `min_machines_running=0`) | Expected; first call warms it. Raise min machines if needed |
| Advisory role gets generic answers | Anthropic key/package missing → fell back to Groq | Set `ANTHROPIC_API_KEY`, install the Anthropic LlamaIndex integration |
| Embeddings error | Missing `OPENAI_API_KEY` | Set it; embeddings are OpenAI-only |
| Rate-limited | `slowapi` limits hit | Tune limits in `main.py` |

**Cost control:** Groq is the cheap default; Anthropic only fires for advisory/admin. Embeddings (OpenAI) cost scales with ingest volume — full re-indexes are the expensive operation, so prefer incremental webhook ingest.

Continue to → [07 — Tooling & Scripts Reference](./07-tooling-scripts.md)
