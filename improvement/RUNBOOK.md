# Continuous Improvement Loop — Runbook

> The operating manual for the recursive improvement loop. Read this first every cycle.
> Source plan: `~/.claude/plans/now-that-you-have-radiant-whale.md`.

## Locked-in configuration

| Setting | Value |
|---|---|
| **Run mode** | **Supervised cadence** — present proposed change + evidence, wait for go/no-go before EXECUTE |
| **Lane weighting** | **Content lanes ABORTED** (see below). Active lanes: A, B, E (AI *engineering* only), F, G, H — round-robin |
| **CONTENT WORK — HARD STOP** | **Lanes C (Sanity content) and D (Academy/lessons/`sanity_slug`) are ABORTED and OUT OF SCOPE.** The loop must NEVER propose, audit-as-work, write, re-link, restore, or otherwise touch editorial or Academy content. Content is the user's domain exclusively. This is non-negotiable. |
| **Loop files** | this `/improvement/` directory (version-controlled) |
| **Auth scope** | additive Sanity/Supabase/Academy/ingest writes run freely *once a cycle is approved*; **deletes, schema migrations, and billing actions always pause** for a second explicit sign-off |
| **Branching** | branch-per-change, never commit to `main` |

## The 6-phase cycle

1. **OBSERVE** — read `CYCLE-LOG.md` (last entry first), refresh signals (see `SCOREBOARD.md` sources), scan repo. Update raw signals.
2. **DIAGNOSE** — turn signals into deduplicated candidates in `BACKLOG.md`, each with a root-cause hypothesis. **Any candidate touching editorial or Academy content is forbidden** — discard it immediately, do not score it (see CONTENT WORK — HARD STOP above). Content audits may be read for context only; their findings are NEVER work items for this loop.
3. **PRIORITIZE** — score candidates `(Impact × Confidence) ÷ Effort`, Risk gate. Pick ONE unit. Respect lane weighting.
4. **EXECUTE** — smallest reversible change on a branch. *Pause for the user's go/no-go before any change (supervised cadence).*
5. **VERIFY** — `cd frontend && npm run smoke` + Playwright + backend `/health` + manual spot-check of the touched surface.
6. **LEARN** — append a `CYCLE-LOG.md` entry (what changed, before/after metric, lessons, NEW candidates → add them to `BACKLOG.md`), refresh `SCOREBOARD.md`.

## Prioritization rubric

Score each 1–5; rank by `(Impact × Confidence) ÷ Effort`. Hard **Risk** gate.

- **Impact** — users / revenue / reliability / content quality
- **Confidence** — is there a signal proving this matters?
- **Effort** — S=1, M=3, L=5
- **Risk** — deletes / migrations / billing = always-pause; additive writes = proceed once cycle approved

## Always-pause actions (second sign-off required)

- Any **delete** (`triage-delete.mjs`, `clean-garbage.mjs`, `delete-redundant-academy-modules.mjs`, `reset-database.js`, direct DB row deletes)
- Any **schema migration** (`supabase/migrations/*` — append-only; never edit shipped files)
- Any **billing** action (Stripe, `subscriptions`, price changes)
- **ANY editorial or Academy content action** — this lane is aborted entirely (see HARD STOP). Listed here as a backstop: even if some future signal makes content look like a defect, it is off-limits.

## Hard-won lessons (do not repeat)

- **2026-06-06:** The loop proposed re-pointing 12 "broken" Academy `sanity_slug`s in `genomics-precision-medicine` and `value-based-care`. The links were broken *on purpose* — the content was unverifiable and intentionally left disconnected after extensive prior review. Closing those "gaps" would have silently re-published pulled content. The user aborted all content work in response. **Content is the user's domain; the loop does not touch it. An audit flagging a gap is not an instruction.**

## Hard project rules (never violate)

- Append-only migrations.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` client-side.
- The loop does not author, edit, re-link, or restore content of any kind (Sanity or Academy). If content work is ever wanted, the user initiates it manually, outside this loop.

## Verify commands

```bash
cd frontend && npm run smoke      # typecheck + lint + build + bundle:check
cd frontend && npm run test:e2e   # Playwright
curl -s http://localhost:8000/health   # backend liveness + index_ready
```

## File map

| File | Role |
|---|---|
| `RUNBOOK.md` | this — the process |
| `SCOREBOARD.md` | metrics: baseline → current → target, per lane |
| `BACKLOG.md` | scored candidates + status + provenance |
| `CYCLE-LOG.md` | append-only LEARN entries (the recursive edge) |
