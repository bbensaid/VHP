# 08 — Operations, Deployment & Maintenance

> **Verified against:** `.github/workflows/{ci,fly-deploy}.yml`, `vercel.json`, `backend/{fly.toml,railway.toml,Procfile,Dockerfile}`, `frontend/app/api/health/route.ts`, `frontend/app/api/cron/digest/route.ts`.

This document covers deploying the platform, the CI/CD pipeline, monitoring, routine maintenance, upgrades, backups, and incident response.

## Table of contents
1. [Deployment topology](#1-deployment-topology)
2. [CI/CD pipeline](#2-cicd-pipeline)
3. [Deploying the frontend (Vercel)](#3-deploying-the-frontend-vercel)
4. [Deploying the backend (Fly.io)](#4-deploying-the-backend-flyio)
5. [Database migrations in production](#5-database-migrations-in-production)
6. [Scheduled jobs / crons](#6-scheduled-jobs--crons)
7. [Monitoring & health](#7-monitoring--health)
8. [Routine maintenance checklist](#8-routine-maintenance-checklist)
9. [Upgrades (dependencies, framework, content)](#9-upgrades-dependencies-framework-content)
10. [Backups & disaster recovery](#10-backups--disaster-recovery)
11. [Incident runbook](#11-incident-runbook)

---

## 1. Deployment topology

| Component | Platform | Region | Trigger |
|---|---|---|---|
| Frontend (Next.js) | **Vercel** | `iad1` | Auto-deploy on push to `main` (Vercel Git integration) |
| Backend (FastAPI) | **Fly.io** (app `vhp-backend`) | `sjc` | GitHub Action on push to `main` touching `backend/**` |
| Database | **Supabase Cloud** | — | Migrations applied manually / via CLI |
| CMS | **Sanity Cloud** | — | Studio publishes; webhook drives ingest |

Backend has fallback descriptors for **Railway** (`railway.toml`, nixpacks, `/health` healthcheck) and a generic **Procfile**, plus a `Dockerfile` (python:3.11-slim, venv, uvicorn on 8000). Fly is the active target.

## 2. CI/CD pipeline

`.github/workflows/ci.yml` runs on push/PR to `main`. Jobs:

1. **frontend** — `npm ci` → `npm run lint` → `tsc --noEmit` → `npm run build` → `npm run bundle:check`. Builds with minimal public env from GitHub secrets; Sentry source-map upload skipped (`SENTRY_AUTH_TOKEN=""`).
2. **e2e** — needs `frontend`. Builds with `ALLOW_AUTH_BYPASS=true`, starts `npm run start`, waits on `localhost:3000`, runs Playwright (`frontend/e2e/`). Uploads the report artifact on failure.
3. **backend** — Python 3.11, `pip install`, `ruff check`, `mypy` (non-blocking), `pytest` (non-blocking until the suite matures).
4. **deploy-notify** — on `main` push after frontend+backend+e2e pass: echoes readiness. Vercel and Fly handle the actual deploys.

`.github/workflows/fly-deploy.yml` — on push to `main` under `backend/**`: `flyctl deploy` from `backend/` using `FLY_API_TOKEN`.

> After a backend deploy, **run `POST /api/ingest`** to rebuild the RAG index if content/schema changed (the CI notify step reminds you of this).

## 3. Deploying the frontend (Vercel)

- **Auto:** push to `main` → Vercel builds and deploys.
- **Build config** (`vercel.json`): `installCommand: npm install`, `buildCommand: cd frontend && ../node_modules/.bin/next build`, `outputDirectory: frontend/.next`, framework `nextjs`, region `iad1`.
- **Headers:** CORS headers on `/api/(.*)`.
- **Env:** set all `NEXT_PUBLIC_*` and server secrets in the Vercel project settings (mirror `frontend/.env.production.example`). Production secrets are **not** in the repo.
- **Manual deploy:** `vercel --prod` from repo root (or redeploy from the Vercel dashboard).

> **ISR / revalidation:** content is cached. The daily cron (`/api/cron/revalidate` in `vercel.json` crons, `0 0 * * *`) refreshes. For an immediate content refresh after a Sanity publish, trigger revalidation or redeploy.

## 4. Deploying the backend (Fly.io)

- **Auto:** push to `main` touching `backend/**` → GitHub Action runs `flyctl deploy`.
- **Manual:** `cd backend && flyctl deploy`.
- **Config** (`fly.toml`): app `vhp-backend`, region `sjc`, process `uvicorn main:app --host 0.0.0.0 --port 8000`, `force_https`, **auto-stop/auto-start machines**, `min_machines_running = 0` (scale-to-zero), 1 GB / 1 CPU.
- **Secrets:** `flyctl secrets set KEY=value` for every backend env var (Supabase, Sanity, LLM keys, `INGEST_SECRET`, `SENTRY_DSN`). Never bake secrets into the image.
- **Health:** `GET /health` (also Railway healthcheck path, 30s interval).

> **Cold starts:** scale-to-zero means the first request after idle is slow. If users complain about first-message latency, set `min_machines_running = 1`.

## 5. Database migrations in production

1. Add a new file `supabase/migrations/0NN_description.sql` (never edit a shipped one).
2. Test locally against a dev/staging Supabase or a throwaway DB.
3. Apply to production:
   ```bash
   supabase db push                       # if CLI-linked
   # or
   psql "$SUPABASE_DB_URL" -f supabase/migrations/0NN_description.sql
   ```
4. If the migration changes content that RAG indexes, run `POST /api/ingest` afterward.
5. Watch Sentry + `/admin/analytics` for regressions.

## 6. Scheduled jobs / crons

| Job | Where defined | Schedule | Does |
|---|---|---|---|
| Revalidate content | `vercel.json` crons → `/api/cron/revalidate` | `0 0 * * *` (daily) | Refresh ISR caches from Sanity |
| Email digest | `frontend/app/api/cron/digest/route.ts` (+ `/api/digest`, `/api/digest/preview`) | (scheduled externally / cron) | Build & send the email digest via Loops to opted-in users (`digest_opt_in`) |
| RAG log pruning | Supabase (migration 020) | DB-side | Trim `rag_query_log` |
| pgvector HNSW maintenance | Supabase (migration 021) | DB-side | Keep the vector index healthy |

## 7. Monitoring & health

| Signal | Where |
|---|---|
| Frontend errors | Sentry (`@sentry/nextjs`, `NEXT_PUBLIC_SENTRY_DSN`) |
| Backend errors | Sentry (`sentry-sdk[fastapi]`, `traces_sample_rate=0.1`) |
| Backend liveness | `GET /health` → `{ index_ready }`; proxied by frontend `/api/health` → `{ ok, indexReady }` |
| In-app system status | `/system-vitals`, `BackendStatus.tsx`, `TickerStrip` |
| RAG quality | `rag_query_log`, `rag_feedback` tables |
| Usage/revenue | `/admin/analytics`, `/admin/revenue` |
| Web vitals | `WebVitalsReporter.tsx` → `web-vitals` |

## 8. Routine maintenance checklist

**Weekly**
- Review Sentry for new error clusters (frontend + backend).
- Skim `rag_feedback` 👎 to find weak AI answers; re-ingest or fix source content.
- Confirm the digest cron sent (check Loops + logs).

**Monthly**
- Take a Sanity dataset export → `sanity-backups/` (see §10).
- Review Supabase storage growth (certs, audio) and DB size.
- Rotate any API keys nearing policy age (`/account/api-keys`, migration 023 supports rotation).
- `npm audit` / dependency review.

**Per content release**
- Run the relevant audit script (`audit-analysis-length.mjs`, `audit-courses.mjs`).
- After bulk content changes, run `POST /api/ingest` to rebuild RAG.
- Verify a sample page + a sample lesson render correctly.

## 9. Upgrades (dependencies, framework, content)

**Frontend dependency bump**
1. Update `frontend/package.json` (and root `package.json` if hoisted).
2. `cd frontend && npm install && npm run smoke` (typecheck + lint + build + bundle).
3. Run Playwright (`npm run test:e2e`).
4. Watch for: Next 16 / React 19 breaking changes, Tailwind v4 beta churn, Sanity/`next-sanity` majors.

**Backend dependency bump**
1. Update `backend/requirements.txt` (versions are pinned to the working venv).
2. Recreate venv, `pip install -r requirements.txt`, run app + `/health`.
3. Watch LlamaIndex core/integration version compatibility (it moves fast) and Groq/OpenAI/Anthropic SDK changes.

**LLM model upgrade**
- Change `GROQ_MODEL` / `MODEL_*` constants in `backend/config.py` (or env). The fallback chain in `services/llm.py` insulates against a bad model. Re-test chat for each role.

**Content upgrade** — follow the Academy one-lesson-at-a-time workflow ([Doc 05](./05-academy-system.md)) and the Analysis standards ([Doc 03](./03-content-sanity.md)); always re-ingest after.

> The repo's `UPGRADE_PLAN.md` and `PLAN_SANITY_ECOSYSTEM.md` are historical planning docs — useful context, but treat this section as the current procedure.

## 10. Backups & disaster recovery

| Asset | Backup method | Restore |
|---|---|---|
| **Sanity content** | `npx sanity dataset export production <file>.tar.gz` → `sanity-backups/` | `npx sanity dataset import <file>.tar.gz production --replace` (⚠️ overwrites) |
| **Supabase DB** | Supabase automated backups + manual `pg_dump "$SUPABASE_DB_URL"` | `psql` restore / Supabase PITR |
| **Supabase Storage** | Bucket export | Re-upload |
| **RAG index** | *Not backed up — it's derived* | Rebuild with `POST /api/ingest` from Sanity |
| **Code** | Git (`main`) | Redeploy from a known-good commit |

**Recovery principle:** Sanity + Supabase are the only stateful sources of truth. The RAG index, the built frontend, and the running backend are all reproducible. Restore content + DB, redeploy code, re-ingest.

## 11. Incident runbook

| Incident | First checks | Action |
|---|---|---|
| Site down | Vercel status, recent deploy, build logs | Roll back to last green deploy in Vercel |
| AI Analyst failing | `/api/health` → `indexReady`; backend Sentry; Fly machine status | Restart Fly machine; if index empty, `POST /api/ingest` |
| Payments failing | Stripe dashboard; `/api/stripe/webhook` logs; `stripe_events` | Replay missed webhook events; reconcile `subscriptions` |
| Content not updating | ISR cache; was it published in Sanity? | Trigger `/api/cron/revalidate` or redeploy |
| RAG drifted from content | Compare a known Sanity doc vs an AI answer | `POST /api/ingest` full rebuild |
| Login broken | Supabase Auth status; JWT secret parity | Verify `SUPABASE_JWT_SECRET` matches across frontend/backend |
| Backend cold-start latency | Fly `min_machines_running` | Set to 1 |

Continue to → [09 — User Guide & Usability](./09-user-guide.md)
