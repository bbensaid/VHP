# 02 — Local Development & Environment Setup

> **Verified against:** `frontend/package.json` scripts, `backend/requirements.txt`, `backend/main.py` run instructions, `frontend/.env.production.example`, `backend/config.py`.

## Table of contents
1. [Prerequisites](#1-prerequisites)
2. [Clone and install](#2-clone-and-install)
3. [Environment variables](#3-environment-variables)
4. [Running the frontend](#4-running-the-frontend)
5. [Running the backend (AI Brain)](#5-running-the-backend-ai-brain)
6. [Running Sanity Studio](#6-running-sanity-studio)
7. [Database / Supabase](#7-database--supabase)
8. [Verifying the full stack locally](#8-verifying-the-full-stack-locally)
9. [Quality gates: lint, typecheck, tests, build](#9-quality-gates-lint-typecheck-tests-build)
10. [Common setup problems](#10-common-setup-problems)

---

## 1. Prerequisites

| Tool | Version | Used by |
|---|---|---|
| **Node.js** | 20.x (CI pins Node 20) | frontend, scripts |
| **npm** | bundled with Node 20 | install/build |
| **Python** | 3.13 (the working venv is `python3.13`) | backend AI Brain |
| **Git** | any recent | source control |
| Sanity CLI | `npx sanity` (no global install needed) | Studio admin |
| Stripe CLI | optional | local webhook testing |
| Supabase CLI | optional | local migrations |
| Fly CLI (`flyctl`) | optional | backend deploy |

You also need accounts/credentials for: **Supabase**, **Sanity** (project `fxz10xl7`), **Stripe** (test mode), and at least one LLM key (**Groq** is the cheapest default; **OpenAI** is required for embeddings).

## 2. Clone and install

```bash
git clone <repo-url> Vermont-Health-Platform
cd Vermont-Health-Platform

# Root install (the monorepo hoists frontend deps to the root node_modules;
# vercel.json buildCommand also relies on ../node_modules/.bin/next).
npm install

# Frontend has its own package.json too — install there as well:
cd frontend && npm install && cd ..

# Backend Python deps:
cd backend
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

> The frontend build is invoked from the root in production (`cd frontend && ../node_modules/.bin/next build`). Locally you can run npm scripts from inside `frontend/` directly.

## 3. Environment variables

There are **two** env files:

- `frontend/.env.local` — for the Next.js app (and the scripts in `frontend/scripts/`).
- `backend/.env` — for the FastAPI AI Brain.

Start from the template:

```bash
cp frontend/.env.production.example frontend/.env.local
```

> 🔑 **Secret:** Never commit real keys. `.env.local` and `backend/.env` are git-ignored. The `*.example` file lists names only.

### Frontend env (`frontend/.env.local`) — the essentials

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Base URL of the app (`http://localhost:3000` locally) |
| `ALLOW_AUTH_BYPASS` | Dev-only: skip auth gating. **Never set in prod** |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side privileged DB access (route handlers, scripts) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` (`fxz10xl7`), `NEXT_PUBLIC_SANITY_DATASET` (`production`), `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity client |
| `SANITY_API_TOKEN` | Write/mutate access for Studio + content scripts |
| `SANITY_WEBHOOK_SECRET` | Verify Sanity GROQ webhooks |
| `INGEST_SECRET` | Shared secret for the Sanity→backend ingest bridge (must match backend) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Billing |
| `STRIPE_PRICE_*` | One price ID per plan/interval (subscriber/student/professional × monthly/yearly) |
| `LOOPS_API_KEY`, `LOOPS_TEMPLATE_*` | Email |
| `API_KEY_HMAC_SECRET` | Hashing developer API keys |
| `PYTHON_BACKEND_URL` / `BACKEND_URL` | Where the Next.js app proxies AI calls (`http://localhost:8000` locally) |
| `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` | Error monitoring |

(Full annotated list in [Doc 10 — Appendix A](./10-reference-appendices.md).)

### Backend env (`backend/.env`) — from `backend/config.py`

| Var | Default | Purpose |
|---|---|---|
| `GROQ_API_KEY` | — | Default chat LLM |
| `ANTHROPIC_API_KEY` | — | Alt LLM (higher roles) |
| `OPENAI_API_KEY` | — | **Embeddings** (required for RAG) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Subscriber model |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | — | DB |
| `SUPABASE_SERVICE_ROLE_KEY` | — | Privileged DB |
| `SUPABASE_JWT_SECRET` | — | Verify session JWTs from the frontend |
| `SUPABASE_DB_URL` | — | Direct Postgres URL (pgvector) |
| `SANITY_PROJECT_ID`, `SANITY_DATASET` (`production`), `SANITY_API_TOKEN`, `SANITY_API_VERSION` (`2023-10-01`) | — | Pull content for ingest |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allow-list |
| `INGEST_SECRET` | — | Must equal the frontend's `INGEST_SECRET` |
| `SENTRY_DSN`, `ENVIRONMENT` | — | Monitoring |

## 4. Running the frontend

```bash
cd frontend
npm run dev      # next dev --webpack  → http://localhost:3000
```

Other scripts (`frontend/package.json`):

| Script | Does |
|---|---|
| `npm run dev` | Dev server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` / `npm run lint:strict` | ESLint (strict = 0 warnings) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright e2e |
| `npm run bundle:check` | `scripts/check-bundle-size.sh` |
| `npm run smoke` | typecheck + lint + build + bundle check (the full local gate) |
| `npm run seed:courses` | `node scripts/seed-courses.mjs` |

## 5. Running the backend (AI Brain)

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

- Healthcheck: `GET http://localhost:8000/health`.
- The app initializes Sentry (if `SENTRY_DSN`), builds/loads the RAG index, builds the catalog index, then serves.
- If you don't need RAG locally, you can still run the app — chat will fail gracefully without an index, but pages and non-AI routes work.

> ⚠️ The backend talks to **production** Supabase/Sanity unless you point it at staging. Be deliberate about which dataset/DB your `.env` references before running ingest.

## 6. Running Sanity Studio

The Studio is mounted **inside** the Next.js app at `/studio` (route `frontend/app/studio/[[...index]]`). With `npm run dev` running, open:

```
http://localhost:3000/studio
```

You can also run the standalone Sanity dev server from `frontend/sanity/` if needed:

```bash
cd frontend/sanity
npx sanity dev        # standalone studio
npx sanity deploy     # deploy hosted studio (if used)
```

Config lives in `frontend/sanity/sanity.config.ts` (Studio) and `frontend/sanity/sanity.cli.ts` (CLI; `projectId: 'fxz10xl7'`, `dataset: 'production'`). Schema is in `frontend/sanity/schemaTypes/`. See [Doc 03](./03-content-sanity.md).

## 7. Database / Supabase

Migrations live in `supabase/migrations/` as **ordered SQL files** (`001_…` through `033_…`, plus dated ones). They are append-only history — never edit a shipped migration; add a new one.

To apply against a project (with the Supabase CLI linked):

```bash
supabase db push          # apply pending migrations
# or run a single file against SUPABASE_DB_URL with psql:
psql "$SUPABASE_DB_URL" -f supabase/migrations/033_course_chapter_ref_backfill.sql
```

`supabase/seed/` holds seed data. The Academy structure is seeded with `frontend/scripts/seed-courses.mjs` and siblings — see [Doc 05](./05-academy-system.md) and [Doc 07](./07-tooling-scripts.md).

## 8. Verifying the full stack locally

A green end-to-end check:

1. `backend`: `uvicorn main:app --reload` → `curl localhost:8000/health` returns OK.
2. `frontend`: `npm run dev` → open `http://localhost:3000`, pages render.
3. Sign up / log in (Supabase Auth) at `/signup` / `/login`.
4. Open `/studio`, confirm you can see documents.
5. Open the AI Analyst (right sidebar or `/chat`) as a subscriber → ask a question → get a grounded, cited answer (confirms backend + RAG + Supabase JWT all wired).
6. Hit `/pricing` → start a Stripe **test-mode** checkout to confirm billing env.

## 9. Quality gates: lint, typecheck, tests, build

The canonical pre-push gate:

```bash
cd frontend && npm run smoke    # typecheck → lint → build → bundle:check
```

CI (`.github/workflows/ci.yml`) runs frontend lint + build on every push/PR to `main`. Backend deploy (`fly-deploy.yml`) triggers only on changes under `backend/**`. See [Doc 08](./08-operations-deployment.md).

## 10. Common setup problems

| Symptom | Cause | Fix |
|---|---|---|
| Scripts in `frontend/scripts/` can't resolve `@supabase/supabase-js` | Script run from `/tmp` or wrong cwd | Scripts **must** live and run inside `frontend/scripts/` so node resolves deps. |
| Lesson renders thin/legacy content | Supabase `lessons.sanity_slug` not set | Run `frontend/scripts/link-sanity-slugs.mjs`. See [Doc 05](./05-academy-system.md). |
| AI Analyst returns auth error | `SUPABASE_JWT_SECRET` mismatch between frontend session and backend | Ensure backend `.env` JWT secret matches the Supabase project. |
| Ingest webhook 401 | `INGEST_SECRET` differs between frontend and backend | Make them identical. |
| RAG returns nothing | No embeddings (missing `OPENAI_API_KEY`) or empty index | Set OpenAI key and run ingest ([Doc 06](./06-ai-analyst-rag.md)). |
| Tailwind classes missing | Tailwind v4 beta PostCSS plugin not picked up | Reinstall in `frontend/`, restart dev server. |
| Build fails on `next build` path | Running from wrong dir | Build from `frontend/` (or via the root `vercel.json` command). |

Continue to → [03 — Content Creation: Sanity CMS](./03-content-sanity.md)
