# HTR Ecosystem — Final Pre-Release Audit Ledger (2026-08)

Working branch: `release-audit`. Every finding gets an ID, severity (P0 blocker / P1 should-fix / P2 improvement), and status: **FIXED** (landed on branch), **NEEDS-SIGN-OFF** (content or product decision — owner must approve), **AUTHOR-ACTION** (only the author can do it), or **RECOMMENDATION**.

Baseline (Phase 0, 2026-08-10): frontend `typecheck` ✅, `build` ✅, `lint` 0 errors / 245 warnings (so `lint:strict` ❌); backend `ruff` ❌ 254 errors (now ✅, see CODE-9); eval dataset structurally valid with warnings (OPS-3). Audit scripts: pillar-excerpts ✅, chapterref-integrity ✅ (97 Sanity docs + 15 courses), book-tool-tables ✅ (58 refs / 16 tables), audit-courses: 229/243 lessons rich (CONTENT-1/2). Book holder: **author** — no manuscript edits this audit. `./book.sh check`: no unsynced edits.

## Code

| ID | Sev | Finding | Status |
|---|---|---|---|
| CODE-1 | P1 | `/advisory/*` (12 routes) fully reachable on .review domains — hidden from nav/sitemap only; `app/advisory/layout.tsx` does no brand check | OPEN → fixing |
| CODE-2 | P1 | Backend brand-blind: `platform_catalog.py` BASE_URL + chat system prompt hardcode healthtransformationreview.org; .solutions visitors get .review URLs in AI answers | OPEN → fixing |
| CODE-3 | P2 | `resolveBrand()` defaults unknown hosts (localhost, Vercel previews) to `solutions` (full advisory variant) | NEEDS-SIGN-OFF (confirm intended) |
| CODE-4 | P1 | `app/research-lab/page.tsx` hardcodes its own 32-tool catalog instead of importing `TOOLS` from `lib/taxonomy/tools.ts` — two sources of truth can drift | OPEN → fixing |
| CODE-5 | P2 | `components/VoiceFab.tsx` dead code (`return null` before all logic) | OPEN → fixing |
| CODE-6 | P2 | Stale Railway artifacts: `backend/railway.toml`, `Procfile`, `.env.railway.example`, ci.yml "Railway will auto-deploy" message; Fly is the real target | OPEN → fixing |
| CODE-7 | P2 | `frontend/e2e/README.md` + config comments reference deleted `middleware.ts` and old `htr_beta=granted` cookie format (now `granted:<host>`) | OPEN → fixing |
| CODE-8 | P2 | CI runs `pytest tests/` against nonexistent `backend/tests/` (continue-on-error, so silently useless) | OPEN → fixing |
| CODE-9 | P1 | Backend `ruff check .` (CI-blocking, unpinned ruff) failed with 254 errors. Added `backend/ruff.toml` pinning rules (E4/E7/E9/F/I + deliberate E402 ignores for dotenv-ordering in main.py/config.py), auto-fixed imports, hand-fixed unused vars, deleted dead `main-original.py` (Gemini-era orphan). Backend now compiles + lints clean | **FIXED** |
| CODE-10 | P1 | Personalized Learning: `items_per_week` (2–6 from user's time budget) computed but prompt hardcoded "exactly 3 items per week" — pacing personalization was dead code. Wired into prompt; downstream validation already handles variable counts | **FIXED** |
| CODE-11 | P1 | AI Analyst prompt said "Act 167 (2018)" — platform (correctly) says 2022 everywhere. Cross-corpus contradiction in the AI's own grounding | **FIXED** (→ 2022) |
| CODE-12 | P2 | AI prompt labeled Vermont All-Payer ACO Model "(VMSSP)" — VMSSP is the 2013–16 Medicare-only predecessor; term appears nowhere else on platform | **FIXED** (→ 2017–2022) |
| CODE-13 | P2 | Frontend `lint` reports 245 warnings (unused vars, unescaped entities); `lint:strict` unusable as a gate | RECOMMENDATION (burn down opportunistically) |
| CODE-14 | P2 | `backend/venv/bin/pip` shebang points at another project's venv (`~/building-with-llamaIndex`); `pip install` from this venv silently installs elsewhere. Use `venv/bin/python -m pip` | RECOMMENDATION (rebuild venv) |

## Content (no changes made — questions for owner)

| ID | Sev | Finding | Status |
|---|---|---|---|
| CONTENT-1 | P1 | Supabase has live course `welcome-htr-framework` with 1 lesson, 0 rich content (EMPTY shell visible to users?) — delete row, hide, or fill? | NEEDS-SIGN-OFF |
| CONTENT-2 | P2 | 14 lessons not rich: genomics-precision-medicine 15/21, value-based-care 17/23, interoperability-data-exchange 25/26. Possibly intentional (unverifiable content pulled) | NEEDS-SIGN-OFF (confirm intentional per-lesson) |

## Ops / Author actions

| ID | Sev | Finding | Status |
|---|---|---|---|
| OPS-1 | P0 | `frontend/public/HTR_Book_v42.pdf` dated Aug 4; manuscript `.docx` rebuilt Aug 6 → served PDF likely stale. Verify with "The OneCare Failure: A Sequencing Autopsy" + latest edits | AUTHOR-ACTION (re-export via Google Docs) |
| OPS-2 | P1 | Narration audio recorded 2026-06-14, drifted from v42 (worst: preface, introduction, ch1). Regeneration is local + free (Piper) | RECOMMENDATION (approve regeneration run) |
| OPS-3 | P2 | RAG eval golden dataset: 8 Q/A pairs vs 50 target; Operations pillar has zero coverage | RECOMMENDATION |

## Docs (fix directly in Phase 6)

| ID | Sev | Finding | Status |
|---|---|---|---|
| DOC-1 | P1 | `CLAUDE.md:10` + `ALIGNMENT_AUDIT_BRIEF.md` say alignment audit "not started" — it completed 2026-07-31 (`ALIGNMENT_AUDIT_FINDINGS.md`) | OPEN |
| DOC-2 | P1 | `ACADEMY.md` says 9 courses / Tier 3 "planned"; Supabase has 15 courses, 243 lessons, Tier 3 shipped | OPEN |
| DOC-3 | P2 | platform-documentation: 03 schema count (22 vs 21), 04 migration count (33 vs 36), 05 cites certificates API (Academy issues no certificates) | OPEN |

## AI / RAG

| ID | Sev | Finding | Status |
|---|---|---|---|
| RAG-1 | P1 | The book is NOT in the RAG index (`backend/data/` has policy PDFs only) — AI Analyst cannot quote or ground on the book despite being its companion | NEEDS-SIGN-OFF (proposal: ingest v42) |
