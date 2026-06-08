# Backlog — scored improvement candidates

> Seeded by the cycle-0 OBSERVE sweep (2026-06-06). PRIORITIZE reads this; LEARN appends to it.
> Score = `(Impact × Confidence) ÷ Effort`. Impact/Confidence 1–5; Effort S=1/M=3/L=5. Risk: `additive` (proceed once cycle approved) or `always-pause` (deletes/migrations/billing).
> Status: proposed → approved → in-progress → done → parked.

## Scoring table

> **CONTENT LANES (C/D) ABORTED 2026-06-06 by user.** All content/Academy candidates removed. The loop touches code, tools, infra, and AI *engineering* only — never editorial or Academy content.

| ID | Lane | Candidate | Impact | Conf | Effort | Score | Risk | Status | Provenance |
|---|---|---|---|---|---|---|---|---|---|
| C0-7 | H | Address 2 high npm vulnerabilities (`npm audit`) | 4 | 5 | S(1) | 20 | additive | **✅ DONE Cycle 2** | next 16.2.3→16.2.7 patch; 2 high→0; smoke passed |
| C0-8 | H | Capture Sentry baseline; triage top open error clusters | 4 | 4 | S(1) | 16 | additive | **partially ✅ Cycle 3** | Fixed the gap that made server errors invisible (see C0-14). Live dashboard baseline still needs user's Sentry creds. |
| C0-14 | H | Wire Sentry server/RSC error capture in `instrumentation.ts` (import server/edge configs + export `onRequestError`) | 4 | 5 | S(1) | 20 | additive | **✅ DONE Cycle 3** | Server/RSC errors were silently dropped on Next 16; now captured. smoke passed |
| C0-12 | H | Refresh Supabase backup; set ≤30-day cadence (code/infra only, no content writes) | 3 | 5 | S(1) | 15 | additive | proposed | Plan §2 Lane H |
| C0-11 | B | Capture typecheck + bundle baselines (fill scoreboard blanks) | 2 | 5 | S(1) | 10 | additive | proposed | scoreboard has gaps |
| C0-9 | A | Converge or document the 3 backend deploy descriptors (fly/railway/Procfile) | 2 | 4 | S(1) | 8 | additive | proposed | Doc 01; fly active, others fallback |
| C0-6 | B | Burn down 293 lint warnings, starting with `no-unused-vars` (142, lowest risk) | 3 | 5 | M(3) | 5.0 | additive | **in-progress** | Cycle 4 batch 1: −10 (293→283). ~50 files w/ unused imports remain + 34 assigned-unused + 12 args + 138 unescaped-entities + 13 img |
| C0-1 | E | Wire `backend/eval/` as a runnable code harness (latency + retrieval regression) — **code only, no content authoring** | 4 | 3 | M(3) | 4.0 | additive | proposed | Plan §3; eval dir exists |
| C0-13 | H | Investigate 21 moderate vulns (transitive `uuid`/`@sanity/uuid` via `@sanity/*` + `@sentry/*`); needs upstream bumps or `--force` (breaking) — **propose-only** | 2 | 4 | M(3) | 2.7 | propose-only | proposed | Cycle 2: `npm audit fix` can't clear; surfaced 2026-06-06 |

### Removed (content lanes — out of scope)

- ~~C0-2~~ RAG 👎 instrumentation — depended on reading content-quality signals; dropped to stay clear of content.
- ~~C0-3~~ `audit-courses.mjs` sanity_slug — the "gaps" are intentional suppression; **never touch.**
- ~~C0-4~~ Analysis quality audits — content domain, user's only.
- ~~C0-5~~ Course richness — content domain, user's only.
- ~~C0-10~~ `platform_catalog.py` route sync — borderline; parked to avoid any content-adjacent edits unless you ask.

## Recommended first units (code/infra only, high score, low risk)

1. **C0-7** (score 20) — fix the 2 high npm vulnerabilities. Pure dependency hygiene.
2. **C0-8** (score 16) — capture Sentry baseline + triage top error clusters. Read-only first.
3. **C0-11** (score 10) — fill the typecheck + bundle baseline blanks. Pure measurement.

> Supervised cadence: each unit is presented with evidence and waits for your go/no-go before EXECUTE.

## Parked / needs-decision

- C0-7 — if `npm audit fix` requires a breaking major bump, downgrade to "review" and present options.
