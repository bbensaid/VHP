# 01 — Architecture & System Overview

> **Verified against:** `frontend/package.json` (Next 16.1.6, React 19), `backend/main.py` (HTR AI Brain v4.2.0), `backend/requirements.txt`, `supabase/migrations/*`, `vercel.json`, `backend/fly.toml`.

## Table of contents
1. [The four runtimes](#1-the-four-runtimes)
2. [Request lifecycle — a page load](#2-request-lifecycle--a-page-load)
3. [Request lifecycle — an AI Analyst question](#3-request-lifecycle--an-ai-analyst-question)
4. [Content flow — Sanity → ingest → RAG](#4-content-flow--sanity--ingest--rag)
5. [The frontend in detail](#5-the-frontend-in-detail)
6. [The backend (AI Brain) in detail](#6-the-backend-ai-brain-in-detail)
7. [Data stores and what lives where](#7-data-stores-and-what-lives-where)
8. [Authentication & authorization model](#8-authentication--authorization-model)
9. [Third-party services](#9-third-party-services)
10. [Repository layout](#10-repository-layout)

---

## 1. The four runtimes

The platform is **not** a single deployable. It is four cooperating runtimes:

```
                          ┌─────────────────────────────────────────────┐
       Browser  ───────►  │  NEXT.JS APP  (Vercel, region iad1)          │
                          │  - All pages (App Router, RSC + client)      │
                          │  - /api/* route handlers (Node runtime)      │
                          │  - /studio  (embedded Sanity Studio)         │
                          │  - Stripe checkout/portal/webhook            │
                          └───────┬───────────────┬──────────────┬───────┘
                                  │               │              │
                    Supabase JS   │     Sanity    │   fetch()    │
                    (anon+SSR)     │     client    │   to BACKEND │
                                  ▼               ▼              ▼
                       ┌────────────────┐  ┌───────────┐  ┌──────────────────┐
                       │  SUPABASE      │  │  SANITY   │  │  FASTAPI BACKEND │
                       │  Postgres+Auth │  │  CMS      │  │  "HTR AI Brain"  │
                       │  +Storage      │  │  fxz10xl7 │  │  (Fly.io, sjc)   │
                       │  +pgvector     │  │           │  │  LlamaIndex+Groq │
                       └────────────────┘  └─────┬─────┘  └────────┬─────────┘
                                                 │  GROQ webhook    │
                                                 └──────────────────┘ (ingest)
```

| Runtime | Hosted on | Entry point | Notes |
|---|---|---|---|
| Next.js web app | **Vercel** (`iad1`) | `frontend/` | Build: `cd frontend && next build`; output `frontend/.next` |
| FastAPI AI Brain | **Fly.io** (`sjc`, app `vhp-backend`) — also has Railway & Procfile configs | `backend/main.py` (`app`) | `uvicorn main:app`. Auto-stop/auto-start machines, scale-to-zero |
| Supabase | **Supabase Cloud** | `supabase/migrations/` | Postgres 15+, Auth (GoTrue), Storage, pgvector |
| Sanity | **Sanity Cloud** | `frontend/sanity/` + `frontend/app/studio` | Project `fxz10xl7`, dataset `production` |

> The backend has **three** deploy descriptors (`fly.toml`, `railway.toml`, `Procfile`). Fly.io is the active target — see [Doc 08](./08-operations-deployment.md). The others are fallbacks.

---

## 2. Request lifecycle — a page load

1. Browser hits e.g. `/policy/regulation`.
2. Vercel serves the Next.js App Router. The route is a **React Server Component** by default.
3. The RSC fetches editorial content from **Sanity** via `frontend/lib/sanity-fetch.ts` (GROQ queries), and any user/personalization data from **Supabase** via the SSR client (`frontend/lib/supabase.ts`).
4. Shared chrome is composed in `frontend/components/AppShell.tsx` (header, sidebars, ticker, footer). Client interactivity (voice, AI sidebar, command palette) hydrates on the client.
5. The page streams to the browser. The **RightSidebar** AI Analyst and the **TickerStrip** (system vitals) are client components that call `/api/*` handlers after hydration.

## 3. Request lifecycle — an AI Analyst question

1. User types into the AI Analyst (right sidebar widget, or full page at `/chat`).
2. The client calls the Next.js route handler `frontend/app/api/chat/route.ts`, which (a) authenticates the Supabase session and (b) proxies to the FastAPI backend `POST /api/chat` (`BACKEND_URL`).
3. Backend (`backend/routers/chat.py`) resolves the caller's **role** (free / subscriber / professional / advisory / admin). Subscribers+ get RAG; professional/advisory/admin roles get the **agentic ReAct** pipeline with tools.
4. `HybridRetriever` (vector + keyword) pulls candidate nodes from Supabase pgvector, FlashRank/`get_ranker()` reranks, Vermont-specific nodes are boosted (`boost_vermont_nodes`).
5. The LLM (Groq `llama-3.3-70b-versatile` for subscribers by default; configurable) streams a grounded answer back with citations, which is relayed to the browser as a `StreamingResponse`.

## 4. Content flow — Sanity → ingest → RAG

```
Editor publishes in Sanity Studio (/studio)
        │
        ▼
Sanity GROQ webhook  ──POST──►  /api/webhooks/sanity (Next.js)
        │  (filtered to: policyAnalysis, post, academyModule,
        │   caseStudy, definition, analystNote, webinar, report)
        ▼
Backend  /api/ingest/webhook  (auth: Bearer INGEST_SECRET)
        │
        ▼
Document parsed → chunked → embedded (OpenAI embeddings)
        │
        ▼
Stored in Supabase pgvector (rag_documents / vector store)
        │
        ▼
Available to AI Analyst RAG immediately
```

This is the single most important integration to understand: **the CMS is the source of editorial truth; the RAG index is a derived, regenerable copy.** If RAG drifts from Sanity, re-run ingest (see [Doc 06](./06-ai-analyst-rag.md)).

---

## 5. The frontend in detail

**Stack:** Next.js 16.1.6 (App Router, `--webpack` dev), React 19, TypeScript 5, Tailwind CSS v4 (beta PostCSS plugin), styled-components 6 (for Sanity Studio).

**Key libraries** (`frontend/package.json` / root `package.json`):
- `next-sanity`, `@sanity/image-url`, `@sanity/vision`, `@sanity/code-input` — CMS integration + Studio.
- `@supabase/ssr`, `@supabase/supabase-js` — auth + DB from server and client.
- `stripe`, `@stripe/stripe-js` — billing.
- `chart.js` + `react-chartjs-2`, `react-simple-maps`, `react-leaflet` + `leaflet`, `d3-geo` — dashboards, simulators, maps.
- `@sentry/nextjs` — error monitoring.
- `react-markdown` — rendering markdown content blocks.

**Directory map** (`frontend/`):
- `app/` — every route. ~150 page routes + ~40 API route handlers. See [§10](#10-repository-layout) and [Doc 10 appendix](./10-reference-appendices.md).
- `components/` — ~80 shared components (`AppShell`, `Header`, `RightSidebar`, `HomeSidebar`, `AcademyContent`, `TickerStrip`, voice components, etc.) plus subfolders `academy/`, `advisory/`, `connect/`, `course/`, `dashboard/`, `policy/`, `research/`.
- `lib/` — data + integration layer: `sanity.ts`, `sanity-fetch.ts`, `supabase.ts`, `stripe.ts`, `auth.ts`, `chat.ts`, `loops.ts`, `narration.ts`, `course-api.ts`, plus `ai/`, `data/`, `db/`, `hooks/`, `context/`, `taxonomy/`.
- `sanity/` — Studio config + schema (`schemaTypes/`), content seeds, generation prompts.
- `scripts/` — ~90 maintenance/seed/content scripts (see [Doc 07](./07-tooling-scripts.md)).
- `supabase/` — local helpers.
- `e2e/` — Playwright tests.

**Notable route groups** (full list in [Doc 10](./10-reference-appendices.md)):
- Six pillar sections: `/policy`, `/economics`, `/technology`, `/clinical`, `/equity`, `/operations` — each with `[slug]` and named subpages.
- **Academy:** `/academy/*` (courses, tracks, modules, case-studies, faculty, glossary, webinars, personalized-learning).
- **Account:** `/account/*` (profile, billing, subscription, courses, bookmarks, referrals, api-keys).
- **Admin:** `/admin/*` (users, analytics, revenue, access-codes, role-changes, ingest).
- **Advisory:** `/advisory/*` (consulting, regulatory, financial-audit, training, reports…).
- **Research Lab:** `/research-lab/*` (seven workspaces incl. `technology-ai`, `payment-models`, `population-equity`).
- **State / simulators:** `/states/[state]`, `/dashboard/[state]`, `/compare-states`, plus Vermont-specific (`/vermont-act-167`, `/vermont-act-68`, `/vermont-rht-program`, `/vermont-blueprint`, …) and multi-state simulators (`/california-calaim`, `/oregon-cco`).
- **The Wire** (`/the-wire`), **Book** (`/book`, `/book/listen`), **HTR Index/Simulator**, **System Vitals**.

## 6. The backend (AI Brain) in detail

`backend/main.py` is a FastAPI **application factory** (refactored from a monolith in 2026-03). Title `HTR AI Brain`, version `4.2.0`.

**Module layout:**
- `config.py` — all env-var constants in one place (never scatter `os.getenv`).
- `services/db.py` — Supabase singleton.
- `services/auth.py` — JWT verification (`SUPABASE_JWT_SECRET`), role gating (`require_subscriber`, etc.).
- `services/llm.py` — LLM factory (`get_llm_for_role`), FlashRank reranker (`get_ranker`), `init_global_settings`.
- `services/retrieval.py` — `HybridRetriever`, `StaticNodeRetriever`, `rerank_nodes`, `extract_citations`, `boost_vermont_nodes`.
- `services/indexing.py` — `build_index`, `load_index`, `fetch_sanity_content`.
- `services/catalog_search.py` — semantic tool/feature catalog so the AI can point users to the right page.
- `services/tools.py` — `ALL_TOOLS` for the agentic pipeline.
- `services/medicaid_parser.py`, `services/retrieval.py` — domain-specific helpers.
- **Routers:** `chat.py` (`/api/chat`, `/api/suggest`), `ingest.py` (`/api/ingest*`), `api_v1.py` (`/api/v1/*` developer API, key-authenticated), `personalized_learning.py`, `vermont_ops.py`.

**Cross-cutting:** Sentry (init before app code), CORS (locked to `FRONTEND_URL` + localhost), `slowapi` rate limiting, `/health` healthcheck.

**LLM providers:** Groq (default, `llama-3.3-70b-versatile`), Anthropic, OpenAI — selected per role. Embeddings via OpenAI. See [Doc 06](./06-ai-analyst-rag.md).

## 7. Data stores and what lives where

| Data | Store | Why |
|---|---|---|
| Editorial content (Analyses, Courses, Case Studies, Webinars, Reports, Glossary, Ticker, Daily Insight, Hospital/State profiles, Investment Deals) | **Sanity** | Editor-friendly, versioned, Portable Text |
| Users, auth sessions, roles | **Supabase Auth** + `profiles`, `user_roles` | Identity |
| Subscriptions & payments | **Supabase** (`subscriptions`, `stripe_customers`, `stripe_events`) mirrored from **Stripe** | Billing source of truth is Stripe; mirrored for fast reads |
| Course enrollment & progress | **Supabase** (`course_enrollments`, `course_player_enrollments`, `course_lesson_progress`, `module_progress`, `course_quiz_attempts`, `certifications`) | Per-user state |
| Academy *structure* (courses→tracks→lessons, quizzes) | **Supabase** (`courses`, `tracks`, `lessons`, `quizzes`, …) — lesson *body* links to Sanity via `sanity_slug` | Hybrid: structure in DB, rich content in CMS |
| RAG vectors | **Supabase pgvector** (`rag_documents`, HNSW index) | Semantic search |
| Bookmarks, notes, community, referrals, API keys, survey, ticker cache | **Supabase** | App state |

> **Critical academy nuance:** a lesson's prose lives in Sanity, but the lesson *row* lives in Supabase. The two are linked by setting the Supabase lesson's `sanity_slug` equal to the Sanity document's slug/`_id`. If that link is missing the app renders thin legacy `content_blocks` instead of the rich body. See [Doc 05](./05-academy-system.md).

## 8. Authentication & authorization model

- **Identity:** Supabase Auth. Sessions are carried server-side via `@supabase/ssr`.
- **Roles** (ascending capability): `free` → `subscriber` → `professional` → `advisory` → `admin`. Stored in `user_roles` / `profiles`; audited in `role_change_log`.
- **Gating on the frontend:** route handlers and server components check the session + role. Paywalled content uses `ArticlePaywall` / `UpgradePrompt`.
- **Gating on the backend:** `services/auth.py` verifies the Supabase JWT (`SUPABASE_JWT_SECRET`) and enforces role with `require_subscriber` and friends. RAG chat requires subscriber+; the agentic ReAct pipeline is limited to `professional`, `advisory`, `admin`.
- **Beta access:** `beta_access_codes` table + `/api/beta/verify` gate pre-launch access.
- **Developer API:** `/api/v1/*` is authenticated by HMAC-hashed API keys (`api_keys` table, header `X-HTR-API-Key`).

## 9. Third-party services

| Service | Used for | Key env vars |
|---|---|---|
| **Sanity** | CMS | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET` |
| **Supabase** | DB/Auth/Storage/pgvector | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `SUPABASE_DB_URL` |
| **Stripe** | Subscriptions + team checkout | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` |
| **Groq / Anthropic / OpenAI** | LLM + embeddings | `GROQ_API_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` |
| **Loops** | Transactional/marketing email | `LOOPS_API_KEY`, `LOOPS_TEMPLATE_*` |
| **Sentry** | Error monitoring | `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` |
| **Piper** | Local TTS narration (voice) | (`.piper-venv`, `.piper-voices`) |

## 10. Repository layout

```
Vermont-Health-Platform/
├── frontend/              # Next.js app (the deployable web app)
│   ├── app/               # routes (pages + /api route handlers + /studio)
│   ├── components/        # shared React components
│   ├── lib/               # data & integration layer (sanity, supabase, stripe…)
│   ├── sanity/            # Studio config + schemaTypes + content seeds
│   ├── scripts/           # ~90 seed/content/maintenance scripts
│   ├── e2e/               # Playwright tests
│   └── docs/              # ← this documentation lives here
├── backend/               # FastAPI "HTR AI Brain"
│   ├── main.py            # app factory
│   ├── config.py          # env constants
│   ├── routers/           # chat, ingest, api_v1, personalized_learning, vermont_ops
│   ├── services/          # db, auth, llm, retrieval, indexing, tools, catalog_search
│   ├── scripts/           # CMS/CMS-data loaders (CMS hospitals, HTI scores…)
│   ├── data/, data_rfp/   # source data
│   ├── fly.toml / railway.toml / Procfile / Dockerfile
│   └── requirements.txt
├── supabase/
│   ├── migrations/        # 34 ordered SQL migrations (001 … 033 + dated)
│   └── seed/
├── scripts/               # repo-level scripts (narration audio, digests)
├── training/              # end-user guides & video scripts (user-facing)
└── *.md                   # legacy planning docs (treat as historical)
```

Continue to → [02 — Local Development & Environment Setup](./02-local-development-setup.md)
