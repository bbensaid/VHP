# Scoreboard — metrics baseline → current → target

> Refreshed every LEARN phase. Baselines captured 2026-06-06 (cycle 0). "Improvement" = a tracked metric moving toward target.

## How to refresh

```bash
cd frontend
npm run lint 2>&1 | grep -E "problems"                 # lint warning count
npm audit --json | python3 -c "import sys,json;print(json.load(sys.stdin)['metadata']['vulnerabilities'])"
npm run typecheck                                       # tsc errors
npm run bundle:check                                    # bundle budget pass/fail
```
RAG/content/business metrics are read from Supabase tables and `/admin/*` (see source column).

## Lanes C/D — Content + Academy — ABORTED, OUT OF SCOPE

> Removed per user direction (2026-06-06). The loop does **not** measure, audit-as-work, or touch editorial/Academy content. Content quality is the user's domain. No metrics tracked here.

## Lane E — AI / RAG **engineering** (code only — NOT content)

> Strictly the technical machinery: retrieval params, eval harness as code, latency. **Fixing weak answers by editing content is forbidden** — only code/config/infra changes count here.

| Metric | Source | Baseline (2026-06-06) | Current | Target |
|---|---|---|---|---|
| Eval harness exists as runnable code | `backend/eval/` | exists; not wired to CI | — | runs in CI, code-only |
| RAG p95 latency | backend timing | _to capture_ | — | trending down |
| Retrieval config under version control | `services/retrieval.py` | in repo | — | tuned + documented |

## Lane A/B — Architecture + Codebase health

| Metric | Source | Baseline (2026-06-06) | Current | Target |
|---|---|---|---|---|
| Lint warnings | `npm run lint` | **293** (0 errors) | **283** (Cycle 4) | 0 |
| — `no-unused-vars` | lint | **142** | **132** (Cycle 4, batch 1: 10 unused imports) | 0 |
| — `react/no-unescaped-entities` | lint | **138** | 138 | 0 |
| — `next/no-img-element` | lint | **13** | 13 | 0 |
| Typecheck errors | `npm run typecheck` | _to capture_ | — | 0 |
| Bundle budget | `bundle:check` | _to capture (assumed pass)_ | — | pass |
| Top-level components | `components/*.tsx` | **73** | 73 | trending down (dedupe) |
| One-off scripts | `frontend/scripts/` | **80** | 80 | consolidated/documented |
| Backend mypy/pytest gating | CI | non-blocking | non-blocking | blocking |

## Lane F/H — Tools/data + Ops/security

| Metric | Source | Baseline (2026-06-06) | Current | Target |
|---|---|---|---|---|
| npm vulnerabilities | `npm audit` | **25 total: 2 high, 23 moderate** | **21 total: 0 high, 21 moderate** (Cycle 2) | 0 high ✅, ↓ moderate |
| Sentry error clusters (open) | Sentry | _to capture_ | — | trending down |
| Backups current (Sanity + Supabase) | manual | last export in `sanity-backups/` | — | ≤ 30 days old |
| Deploy descriptors | repo | 3 (fly active, railway, Procfile) | 3 | converged/documented |

## Structural reference (not targets — context)

| Item | Count |
|---|---|
| Page routes | 184 |
| API route handlers | 39 |
| Supabase migrations | 34 |
| Sanity schema types | 22 |

> Note: counts differ slightly from the documentation set (~160 routes) because `find page.tsx` counts every nested dynamic segment; both are correct at different granularities.
