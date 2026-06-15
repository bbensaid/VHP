# Backend Deployment — which config is authoritative

> The backend ("HTR AI Brain", FastAPI) ships **four** deploy-related files. Only one is wired to automation. This doc removes the ambiguity.

## TL;DR

**Fly.io is the active production target.** Everything else is a fallback you can ignore unless you are deliberately switching platforms.

| File | Status | Role |
|---|---|---|
| `fly.toml` | ✅ **ACTIVE** | Production config. App `vhp-backend`, region `sjc`. |
| `Dockerfile` | 🟡 Support | Container image (python:3.11-slim, venv, `uvicorn main:app` on :8000). Used by Fly's builder and any container host. |
| `railway.toml` | ⚪ Fallback | Railway config (nixpacks, `/health` healthcheck). **Not** wired to CI. |
| `Procfile` | ⚪ Fallback | Generic `web: uvicorn main:app` for Heroku-style platforms. **Not** wired to CI. |

## How production actually deploys

`.github/workflows/fly-deploy.yml` runs on every push to `main` that touches `backend/**`:

```yaml
- run: flyctl deploy
  working-directory: backend
  env:
    FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

So: **push to `main` with backend changes → GitHub Action → `flyctl deploy` → Fly.io.** No other descriptor participates in the live pipeline.

### After a backend deploy
If content or schema changed, rebuild the RAG index: `POST /api/ingest` (auth `INGEST_SECRET`). See `improvement/` and the platform docs for the ingest flow.

## Why keep the fallbacks?

`railway.toml` and `Procfile` are kept as **portability insurance** — if Fly is ever unavailable or you migrate, they let you stand the service up on Railway / a Heroku-style PaaS without rewriting deploy config. They cost nothing to keep and are not run by anything today.

If you decide Fly is permanent, these two files are safe to delete — but that's a deliberate human decision, not an automated cleanup.

## Local run (not deploy)

```bash
cd backend
python3.13 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000   # http://localhost:8000/health
```

## Secrets (set on the platform, never committed)

Fly: `flyctl secrets set KEY=value` for each backend env var (Supabase, Sanity, LLM keys, `INGEST_SECRET`, `SENTRY_DSN`). See `config.py` for the full list.
