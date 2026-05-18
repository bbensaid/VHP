# Vermont Health Platform — Codebase Audit & Upgrade Plan

**Prepared:** 2026-05-18
**Reviewer:** Claude (Opus 4.7)
**Scope:** Full audit of the frontend Next.js app, Python AI backend, supporting infra, and integration with the HTR Book v28.
**Repo root:** `/Users/baba/Vermont-Health-Platform`

---

## 0. TL;DR — One-page Executive Summary

The HTR platform is unusually ambitious for a single-author codebase: 174 page routes, 111 reusable components, a six-pillar information architecture, 21 Research Lab tools, an AI Analyst with RAG over Sanity content, voice I/O, Stripe billing, Supabase auth, Sentry, beta gating, and a tightly integrated 380-page book. The architecture is sound and the design vocabulary is consistent. The biggest risks are not architectural — they are **scale-of-surface** problems:

- **Bloat in route files** — 9 pages exceed 600 lines (Act 167 simulator is **2,248 lines**), 14 research components exceed 1,400 lines. These hurt iteration speed, test coverage, and code review.
- **Markdown-as-data** — concepts, chapters, and pillar topics are duplicated across the book, the homepage, the pillar pages, and the sidebar. Each update is a multi-file change.
- **No automated tests** — there's no `__tests__`, no Playwright/Cypress, no CI test step. A single render-time error in a deeply-linked component can ship to prod undetected.
- **Auth bypass is on** (`BYPASS_AUTH = true` in middleware) for beta. This is fine for now, but it means role-gated routes don't actually gate anything in the current build — must be reverted at GA.
- **Backend is unrelated to the frontend lifecycle** — the AI Analyst calls Python on Railway, but the frontend silently degrades if the backend is down. Health-check is good; surfacing status to the user is weak.
- **Book ↔ platform alignment is currently a hand-maintained list.** The new `/book` page is excellent but the chapter map is hard-coded; the platform has no single source of truth for "chapter → tools → pages".
- **Stale documents** in repo root (deleted .md / .pdf files in `git status`) — the working tree carries 6 deletions and 10 modifications. A clean-up commit is overdue.

The upgrade plan below is sequenced in **four phases** — each phase compiles, ships, and stands on its own.

---

## 1. Inventory & Scope

### 1.1 Frontend (Next.js 16, React 19, Tailwind 4 beta)
| Surface | Count | Notes |
|---|---:|---|
| App routes (`page.tsx`) | 174 | Includes all six pillars, 21 lab tools, 12 Vermont program pages, 4 cross-state pages, full academy + book |
| Components | 111 | 14 of them exceed 1,400 lines (research tools) |
| API routes (`route.ts`) | 36 | Chat proxy, health, bookmarks, subscribe, stripe webhook, role-content, etc. |
| Hooks | small | Only `frontend/hooks/` has light custom hooks |
| Lib modules | ~22 | Sanity client, Supabase client, ticker, rate-limit, dashboard queries |
| Sanity schemas | 32 | Reports, courses, webinars, tickers, analyst notes |

### 1.2 Backend (Python FastAPI on Railway)
- `main.py` — app factory (149 lines, well-structured)
- `routers/` — `chat.py`, `ingest.py`, `api_v1.py`, `personalized_learning.py`, `vermont_ops.py`
- `services/` — `auth`, `catalog_search`, `db`, `indexing`, `llm`, `retrieval`, `tools`, `medicaid_parser`
- **Strengths:** Modular, hybrid BM25+vector retrieval w/ RRF, FlashRank reranker, slowapi rate limiting, Sentry, dev-mode auth fallback
- **Risk:** Vector store auto-selects local JSON vs pgvector based on env — one missing env var in prod silently degrades to file storage

### 1.3 Infra
- Hosting: Vercel (frontend), Railway (backend)
- DB: Supabase (auth, user_roles, bookmarks, feedback, comments)
- CMS: Sanity (reports, courses, webinars, tickers, analyst notes)
- Payments: Stripe (subscriptions)
- Monitoring: Sentry (client, server, edge)
- CSP: configured with Stripe, Sanity, OSM, jsDelivr allowed

### 1.4 Top 10 Largest Files (technical debt hotspots)
1. `app/vermont-act-167/simulator/page.tsx` — **2,248 lines**
2. `components/research/PolicySimulator.tsx` — 2,232
3. `components/research/HTAStudio.tsx` — 2,227
4. `components/research/WorkforceModeler.tsx` — 2,194
5. `components/research/ResearchWorkspace.tsx` — 1,912
6. `components/research/APMDesignLab.tsx` — 1,894
7. `components/academy/PersonalizedLearningHub.tsx` — 1,843
8. `components/research/AIAnalyticsLab.tsx` — 1,800
9. `components/research/ClinicalQualityOptimizer.tsx` — 1,767
10. `components/research/PopulationHealthModeler.tsx` — 1,693

---

## 2. Findings — by severity

### 🔴 P0 — Ship-blockers for GA

**P0.1 — `BYPASS_AUTH = true` is hard-coded in `middleware.ts:97`.**
Role-gated routes (`/admin`, `/dashboard`, `/chat`, `/hti-dashboard`, `/advisory-hub`) currently let unauthenticated users through. This is correct for the beta gate, but it must be feature-flagged through env (`NEXT_PUBLIC_ALLOW_AUTH_BYPASS`) before launch. Today, a forgotten flip = open admin.

**P0.2 — Frontend silently swallows Python backend outages.**
`/api/chat/route.ts` returns a generic 503 message and `RightSidebar.tsx:classifyError` shows the right copy, but there's no proactive UI signal that the backend is down — the user only finds out after typing a question. `BackendStatus.tsx` exists but isn't visible by default. **Fix:** show a small pulse-dot in the header when `indexReady === false`.

**P0.3 — Working tree has 16 uncommitted changes and 5 untracked book-related additions** (per `git status`). At least 6 deleted top-level docs (`CLINICAL_DATA_VBC_DOCUMENTATION.*`, `HTR-PLATFORM-MAP.md`, `SESSION_*`, `UPGRADE_REPORT.*`) are sitting in the working tree. Either commit or restore — leaving them in this state is a recipe for accidental loss.

**P0.4 — No automated test suite.**
Zero `*.test.ts`, no Playwright/Cypress, no test step in package.json scripts. A single typo in a chapter card in `/book/page.tsx` can ship. **Minimum bar before GA:** smoke tests for the top 10 pages, plus a chat-API contract test.

### 🟠 P1 — Major code-health issues

**P1.1 — Research components are too large.**
`PolicySimulator.tsx` at 2,232 lines is unmaintainable. These files typically mix: tab state, form state, computed results, chart configs, ~10 sub-panels, plus prose-heavy explanatory copy. They should be split: shell + tab components + a `lib/research/<tool>.ts` data module for constants/copy.

**P1.2 — Page bodies carry too much markup.**
`app/book/page.tsx` (666 lines) and `app/clinical/page.tsx` (125 lines, *but the pattern is repeated across all 6 pillars*) hard-code chapter lists, topic cards, "tools & data" grids. This is hand-synced data. Move to `lib/data/pillar-topics.ts` and `lib/data/chapter-map.ts` and have one component render each.

**P1.3 — Voice + speech APIs use TypeScript escape hatches.**
`VoiceContext.tsx` has 3 `any` casts (SR class, event types, ref bag) and disables ESLint exhaustive-deps on a keyboard-shortcut effect. The SpeechRecognition typings are notoriously bad in lib.dom — adopt the `@types/dom-speech-recognition` declarations you already have in devDeps but aren't applying everywhere.

**P1.4 — Two parallel navigation systems.**
`HomeSidebar.tsx` and `Header.tsx` mega-menu both encode the same pillar/topic structure. Edits must be made in both. Extract `lib/navigation.ts` as the single source.

**P1.5 — Markdown citations & "TRY IT IN THE HTR LAB" sentinel.**
`RightSidebar.tsx` parses `[CITATIONS]...[/CITATIONS]` and "TRY IT IN THE HTR LAB" prose markers from the model output. Sentinels are fragile — the model can hallucinate the marker mid-sentence. Move to structured JSON responses from the backend (`{text, citations, suggestions}`) and stream as NDJSON instead of raw text.

**P1.6 — `revalidate = 120` on the homepage but no webhook-driven busting on most other ISR pages.**
The homepage query bundles `next.tags`. Other pages (pillar overviews, dashboards) don't. Audit and standardise revalidation pattern.

**P1.7 — No skeleton or empty states on several heavy pages.**
`research-lab` has a `loading.tsx`, but `bed-capacity`, `htr-simulator`, and many Vermont pages don't.

**P1.8 — `tsconfig.tsbuildinfo` is 3.4MB and lives in repo root** — not gitignored. Adds 3MB to every clone.

### 🟡 P2 — Quality-of-life / polish

- `frontend/repomix-output.txt` (2.4MB) is committed and stale — delete.
- `frontend/dist/` is committed but empty-ish.
- `frontend/.next/` shouldn't be in the working tree at commit time.
- `extra scope.txt`, `Session-summary.txt`, `sanity.txt`, `finance_primer.json`, `blueprint_analytics.txt`, `htr_six_pillar_framework_map.html` — these look like ad-hoc notes. Move to `frontend/docs/` or delete.
- The `random python scripts` directory at repo root needs renaming or removal.
- `DEVELOPER_GUIDE.md.docx` (270 KB) at root — convert to Markdown.
- `bulk_import.js`, `digest_latest.py` — one-shot scripts, move to `scripts/`.
- Tailwind 4 beta is fine, but stay alert for breaking changes between betas.
- `next 16.1.6` is recent — keep checking for security patches.
- React 19 + styled-components 6 — confirm the styled-components SSR setup with React 19 streaming.

### 🟢 P3 — Nice-to-have / future

- A `feature flags` system (LaunchDarkly or simple Supabase-backed) would let you ship Personalized Learning, the Book CTAs, and other new surfaces to subsets of users.
- A page-view analytics layer (Plausible or PostHog) tied to pillar + chapter to learn what readers actually use.
- Bundle analyser run — with 174 pages, code-splitting matters.

---

## 3. Security & Privacy Review

| Area | Status | Notes |
|---|---|---|
| CSP | ✅ Strong | Explicitly allow-lists Stripe, Sanity, OSM, jsDelivr; `unsafe-inline`/`unsafe-eval` documented as required for Next + Sanity Studio |
| HSTS | ✅ | 2-year preload |
| Auth | ⚠️ Bypassed in beta | See P0.1 |
| JWT | ✅ | Supabase SSR + signed HMAC role cache (1-hour TTL) |
| Rate limiting | ⚠️ Partial | In-process map for `/verify/*` (cold-start resets), slowapi on backend chat/suggest/ingest. No frontend `/api/*` rate limits. |
| Secrets | ✅ Not committed | `.env.local` & `.env.production.example` only |
| Sentry | ✅ Three configs (client, server, edge) |
| Prompt injection | ⚠️ | The RightSidebar parses model output for sentinels — if a user pastes `[CITATIONS]` into chat, the parser misbehaves on the next turn. |
| File upload | n/a | No user uploads found |
| Stripe webhook | ✅ Has signing-secret verification via stripe lib |

**Recommendations:**
1. Wrap `BYPASS_AUTH` in `process.env.NEXT_PUBLIC_ALLOW_BYPASS === "true"` (default `false`).
2. Add per-IP rate limits on `/api/chat` at the Next.js layer (defence-in-depth — backend has its own).
3. Sanitise user input before it reaches the citation parser regex.
4. Audit the beta access code: `htr_beta` cookie is granted via `/beta` page — confirm the code is server-validated, not client-checked.

---

## 4. Performance & Accessibility

**Performance signals:**
- `WebVitalsReporter` is wired up — confirm Sentry/Vercel is receiving CLS/LCP/INP.
- Bundle: 14 research components are 1.4 KB+ each. Confirm they're code-split per route, not loaded together.
- Iframe PDF on `/book` is 700px tall — fine, but the PDF is 6.3 MB. Consider a lazy `<embed>` + page nav.
- `react-leaflet` + `react-simple-maps` + `chart.js` + `d3-geo` — four mapping/charting libraries. Standardise on two.

**Accessibility (WCAG):**
- ✅ Skip-link in `layout.tsx`
- ✅ `aria-label`s on most icon-only buttons
- ⚠️ Focus indicators on custom buttons inconsistent (some have `focus:outline-none` without replacement)
- ⚠️ Color contrast — pillar accent colors (sky/emerald/indigo/red/violet/teal) at -700 on -50 backgrounds: confirm AA on small text
- ⚠️ No reduced-motion media query honoured in animated elements (bouncing dots in chat, hover transforms)
- ⚠️ The voice FAB has keyboard activation, but the recognition only triggers on `⌘⇧V` — document this in the help UI

---

## 5. Data Model & Content Architecture

The platform mixes four content sources:
1. **Sanity CMS** — reports, courses, webinars, tickers, analyst notes (queried via GROQ)
2. **Hard-coded TS data** — `lib/data/hospital-data.ts`, `learning-tracks-data.ts`, `rht-program.ts`, `state-initiatives-data.ts`, `system-vitals-data.ts`, `performance-index-data.ts`, `hti-timeseries-data.ts`
3. **Inline page constants** — chapter list in `/book`, topic cards in pillar pages
4. **Supabase tables** — `user_roles`, bookmarks, feedback, comments

**Problem:** No single source of truth for "what is a pillar?" "what tools exist?" "what chapters map to what pages?". This drives the duplication noted in P1.

**Recommended unified schema** (TypeScript, in `lib/taxonomy/`):
```ts
// lib/taxonomy/pillars.ts
export const PILLARS = [...] as const;  // id, label, color, dot, etc.

// lib/taxonomy/tools.ts
export const TOOLS = [...] as const;    // id, label, href, pillar, chapter, status

// lib/taxonomy/chapters.ts
export const CHAPTERS = [...] as const; // num, title, pillar, platformLinks (by tool id)

// lib/taxonomy/programs.ts
export const PROGRAMS = [...] as const; // Vermont, Oregon, California program pages
```
Then `HomeSidebar`, `Header`, `/book`, all pillar pages, the `FromTheBook` callouts, and the HTR Simulator all consume the same source.

---

## 6. The Phased Upgrade Plan

Each phase is independently shippable. Skip phases if you disagree — they're sequenced by ROI, not necessity.

### Phase 1 — **Stabilise** (1 week, no new features)
Goal: Make the platform safe to iterate on without regressions.

- [ ] **1.1** Commit / discard pending git changes. Get to a clean working tree.
- [ ] **1.2** Gate `BYPASS_AUTH` behind env var. Test that role-gated routes redirect when bypass is off.
- [ ] **1.3** Add `.gitignore` for `tsconfig.tsbuildinfo`, `.next/`, `repomix-output.txt`, `dist/`. Remove from repo.
- [ ] **1.4** Move loose `.txt` / `.docx` / `.json` notes to `frontend/docs/` or `archive/`.
- [ ] **1.5** Wire `BackendStatus` into header as a tiny dot indicator. Show "AI offline" when `/api/health` reports `indexReady: false`.
- [ ] **1.6** Add ESLint `no-explicit-any` warning (not error) and start chipping at the count.
- [ ] **1.7** Add a smoke-test step in `package.json` using `next build` as the gate. (Real tests come in Phase 2.)
- [ ] **1.8** Document the beta gate flow and `htr_beta` cookie in `frontend/docs/auth.md`.

**Deliverable:** A clean repo, a visible AI status, no accidental auth bypasses, no stale junk.

### Phase 2 — **Refactor the foundation** (2–3 weeks)
Goal: Reduce duplication and start unifying content sources.

- [ ] **2.1** Create `lib/taxonomy/` with `pillars.ts`, `tools.ts`, `chapters.ts`, `programs.ts`. Migrate `HomeSidebar`, `Header`, `/book`, and all 6 pillar pages to consume it.
- [ ] **2.2** Split the top 5 largest research components. Each gets: a thin shell page, sub-tab components, and a sibling `*.data.ts` file for constants/copy. Target: nothing over 800 lines.
- [ ] **2.3** Split `vermont-act-167/simulator/page.tsx` (2,248 lines) into a hub + tab routes.
- [ ] **2.4** Introduce `lib/data/pillar-topics.ts` — each pillar's topic cards, scope blurbs, related tools.
- [ ] **2.5** Build a `<PillarOverview pillar="clinical" />` component that all 6 pillar pages render. Each pillar page becomes ~10 lines.
- [ ] **2.6** Replace the citation-sentinel parser with NDJSON streaming from the backend. Backend emits `{type: "text", chunk}` and `{type: "citations", items}`.
- [ ] **2.7** Add Playwright smoke tests for: homepage, /book, each of the 6 pillar pages, /research-lab, /htr-simulator, /chat (UI only — no backend dependency).
- [ ] **2.8** Add a GitHub Action: install, typecheck, lint, build, smoke tests.

**Deliverable:** ~30% line reduction across the heaviest files. Single source of truth for taxonomy. CI on every PR.

### Phase 3 — **New features** (3–4 weeks)
Goal: Capabilities readers/users have asked for, leveraging the cleaner foundation.

**Feature ideas, ranked by likely impact:**

1. **Book ↔ Platform Reader Mode** — A `/read/chapter-X` route that renders the chapter inline as HTML (extracted from PDF), with marginal links to the corresponding platform tools. Currently the book is iframe-embedded as a 6 MB PDF.
2. **Personalized Learning v2** — Quiz-driven track recommendations based on reader role (executive, policy, clinician, etc.). Hook into the existing `personalized-learning` API route.
3. **Save & Recall — across devices** — `My Library` exists at `/saved` but is local-only. Wire to Supabase `bookmarks` table.
4. **Chapter Notes & Highlights** — Let signed-in readers annotate the book. Comments component exists; reuse the model.
5. **HTR Simulator v2** — Make the simulator state shareable (encode the inputs in a URL). Currently single-session.
6. **The Wire — feed personalization** — filter by pillar + role. Existing `ticker` infra can extend.
7. **API/Developer surface** — `api_v1.py` exists in the backend. Document it, gate it via `htr_api_key`, expose to Plus tier.
8. **Voice on-page commands** — Already supports nav. Add: "Read this page aloud," "Summarize this for me," "Open the related lab tool."
9. **PDF export of any pillar page** — Existing `SaveToPdfButton` component; standardise across pages.
10. **A `/compare-states` route** that diffs Vermont, Oregon, California across the six pillars. Big book draw.
11. **Email digest** — `digest_latest.py` exists at root. Wire it to Loops or Resend. Weekly summary of Wire + AI Analyst trends.
12. **Onboarding tour** — `PlatformTour.tsx` exists. Re-enable behind a feature flag for first-time users (after the "ugly fuzzy background" issue from commit `52310a8` is resolved).

**Recommend committing to 4-6 of these, not all.** Suggested combo: 1, 3, 4, 5, 10, 11.

### Phase 4 — **Polish & launch readiness** (1–2 weeks)
- [ ] **4.1** Lighthouse 90+ on Performance, Accessibility, Best Practices for the top 10 routes.
- [ ] **4.2** Replace the static PDF iframe with the Reader Mode from Phase 3.
- [ ] **4.3** Standardise loading + empty + error states across all heavy pages.
- [ ] **4.4** Mobile QA pass on iPhone/Android — the BottomNav is wired, but the new Personalized Learning hub hasn't been touched on mobile.
- [ ] **4.5** Accessibility audit — automated (axe) + a manual screen reader pass on the AI Analyst sidebar.
- [ ] **4.6** Set the auth bypass to `false` and run a full role-gating regression.
- [ ] **4.7** Publish the platform changelog at `/changelog`.

---

## 7. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Auth bypass left on at GA | M | 🔴 Critical | Phase 1.2 — env-gate, add startup banner if bypass enabled |
| Backend offline → bad chat UX | H | 🟠 High | Phase 1.5 + Phase 2.6 — surface status, NDJSON for graceful degradation |
| Tailwind 4 beta API breaks | M | 🟠 High | Pin minor; watch upgrade notes; have a Tailwind 3 rollback branch |
| Next 16.x SSR change breaks ISR | L | 🟠 High | Stay on latest 16.x patch, test deploys in staging branch |
| Sanity content drift vs. book | H | 🟡 Medium | Phase 2.1 — taxonomy module is the bridge |
| A single ESLint upgrade cascades | M | 🟡 Medium | Lock to current major; staged updates only |
| Stripe pricing changes (book + tier) | M | 🟡 Medium | Use Stripe Products dashboard, not hard-coded prices |

---

## 8. What I would NOT do

- **Don't migrate off Next.js**. App Router + ISR is the right fit.
- **Don't move Sanity to a different CMS.** It's working and the GROQ patterns are well-internalised.
- **Don't rewrite the research tools from scratch.** Split them, don't rebuild them.
- **Don't introduce a state management library** (Redux/Zustand). React Context is sufficient at this scope.
- **Don't introduce a monorepo tool** unless you're adding a second app (mobile, public API client). Not warranted yet.

---

## 9. Open Questions for the User

These shaped my recommendations; you may want to revisit:

1. **Audience scope** — is the platform aimed primarily at Vermont practitioners, or at a national policy-and-executive audience? The current navigation suggests both equally, but the Vermont thread is far deeper.
2. **Monetization clarity** — Stripe is wired, tiers exist (free / subscriber / student / professional / advisory / admin), but most content is currently unrestricted. What's the actual paywall plan?
3. **Backend autonomy** — is the Python service expected to be a permanent dependency, or is a long-term goal to fold AI Analyst into a Vercel-hosted edge function? Today it's a hard dependency for `/chat` and the right-sidebar.
4. **Book updates v29+** — how often does the book change vs. how often does the platform change? The current `/book` page hardcodes v28. We need a `/lib/taxonomy/chapters.ts` that the book CI updates.
5. **Personalized Learning future** — is this becoming the primary entry point, or staying as one of many features? It already has a backend route and its own page.

---

## Appendix A — File-level "delete or move" recommendations

```
DELETE (committed, stale, large):
  frontend/repomix-output.txt              # 2.4 MB ad-hoc dump
  frontend/dist/                            # build artifact
  frontend/tsconfig.tsbuildinfo             # 3.4 MB build cache
  frontend/Session-summary.txt              # one-shot note
  frontend/extra scope.txt                  # one-shot note
  frontend/sanity.txt                       # one-shot note

MOVE TO frontend/docs/:
  frontend/DEVELOPER_GUIDE.md.docx → convert to MD, move
  frontend/HTR-PROJECT-BRIEF.md
  frontend/htr_six_pillar_framework_map.html
  frontend/blueprint_analytics.txt
  frontend/finance_primer.json (if still referenced; else delete)

MOVE TO scripts/:
  frontend/bulk_import.js
  frontend/digest_latest.py

RENAME:
  random python scripts/ → scripts/legacy-python/

DECIDE — commit or discard:
  All `D` files in git status (10 deletions sitting in working tree)
  All `M` files in git status (modifications to pillar pages, Header, HeroCarousel, HomeSidebar)
```

---

## Appendix B — Estimated effort

| Phase | Engineer-weeks (solo) | Pair-weeks |
|---|---:|---:|
| 1 Stabilise | 1.0 | 0.5 |
| 2 Refactor | 2.5 | 1.5 |
| 3 New features (top 6) | 4.0 | 2.5 |
| 4 Polish | 1.5 | 1.0 |
| **Total** | **9.0** | **5.5** |

End of audit.
