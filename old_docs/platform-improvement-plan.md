# Platform Improvement Plan — Vermont Health Platform (HTR)

**Audience:** Leadership, product managers, engineering leads.
**Version:** 4.2.0 | **Updated:** March 2026
**Classification:** Internal

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Completed — Phase 1 (March 2026)](#2-completed--phase-1-march-2026)
3. [Roadmap — Phase 2 (Q2 2026)](#3-roadmap--phase-2-q2-2026)
4. [Roadmap — Phase 3 (Q3–Q4 2026)](#4-roadmap--phase-3-q3q4-2026)
5. [AI & RAG Improvements](#5-ai--rag-improvements)
6. [Architecture Improvements](#6-architecture-improvements)
7. [Database & Performance](#7-database--performance)
8. [Security & Compliance](#8-security--compliance)
9. [Content & Feature Expansion](#9-content--feature-expansion)
10. [Known Issues](#10-known-issues)

---

## 1. Executive Summary

This document is the living roadmap for HTR platform improvement. It captures completed work, active priorities, and future initiatives across five dimensions: AI/RAG quality, frontend/backend architecture, database performance, security and compliance, and content/feature expansion.

**Current version:** 4.2.0 (March 2026)
**Next milestone:** 4.3.0 (Q2 2026) — focused on dark mode stability, AI quality improvements, and Academy enrollment flow

---

## 2. Completed — Phase 1 (March 2026)

### Dark Mode — Full Platform Implementation

**Problem:** ThemeProvider and CSS infrastructure existed but zero `dark:` Tailwind classes were present in any component. Dark mode toggle was non-functional — UI remained in light mode regardless of theme setting.

**Solution:** Systematic pass through all major components adding `dark:` Tailwind variants following a consistent semantic mapping:

| Light | Dark |
| --- | --- |
| `bg-white` | `dark:bg-slate-900` |
| `bg-slate-50` | `dark:bg-slate-800` |
| `border-slate-200` | `dark:border-slate-700` |
| `text-slate-900` | `dark:text-slate-100` |
| `text-slate-600` | `dark:text-slate-300` |
| `text-slate-500` | `dark:text-slate-400` |

**Components updated:** AppShell, CollapsibleSidebar, HomeSidebar, RightSidebar, Header, OnboardingModal, CommandPalette, TickerStrip, PillarHub, HubPageTemplate, ArticleFeed, ArticlePageTemplate, chat page, ResearchLabHub, StateDetailClientPage.

---

### Tailwind Configuration Cleanup

**Problem:** `tailwind.config.js` contained shadcn/ui boilerplate referencing HSL CSS variables (`hsl(var(--background))`) that were never defined anywhere. The `@tailwindcss/typography` plugin was listed but not installed. Generated classes like `bg-background` and `text-foreground` did not exist but appeared to be referenced.

**Solution:** Replaced the entire config with a minimal valid configuration:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
```

The Tailwind v4 `@theme {}` directive in `globals.css` handles all custom token definitions — no `tailwind.config.js` extensions needed.

---

### Functional Bug Fixes

**Enroll Now button (non-functional):** The course enrollment button was a `<button>` with no `onClick` handler or navigation. Fixed by replacing with a `<Link>` that redirects to `/pricing?from=/academy/courses/[slug]`.

**Missing `/admin/ingest` route:** The admin dashboard linked to `/admin/ingest` but the route did not exist. Created `frontend/app/admin/ingest/page.tsx` with:

- RAG query statistics (query count, average latency, last query time)
- Recent query log table (20 most recent entries, color-coded by latency)
- Manual "Trigger Ingest" button (`IngestTriggerButton` client component)

---

### Backend Fixes

**Version string mismatch:** Backend startup log printed `v4.1` while the actual version is `4.2.0`. Fixed in `main.py`.

**CORS duplicate entry:** When `FRONTEND_URL=http://localhost:3000` (default dev), the CORS allowed origins list contained `["http://localhost:3000", "http://localhost:3000"]`. Fixed with set deduplication: `list({FRONTEND_URL, "http://localhost:3000"})`.

**Missing rate limiting on `/verify/`:** The certificate verification endpoint had no rate limiting, exposing it to bulk scraping. Added in-process rate limiting: 20 requests per IP per 60-second window using a `Map` in Next.js middleware.

---

### Documentation Set

Wrote a complete new documentation set (14 documents) covering all platform scope. See `docs/README.md` for the full index.

---

## 3. Roadmap — Phase 2 (Q2 2026)

### P0 — Academy Enrollment Persistence

**Problem:** After clicking "Enroll Now" and completing subscription checkout, users are redirected back to the pricing page confirmation, not to the course they were enrolling in. The `from` parameter is not being read by the post-payment success handler.

**Fix required:** In `frontend/app/api/stripe/webhook/route.ts`, after processing `checkout.session.completed`, redirect to the `metadata.from` URL stored in the Stripe checkout session.

---

### P0 — Right Sidebar AI Analyst Height

**Problem:** The right sidebar AI Analyst panel overflows its container on short viewport heights, hiding the send button below the fold. Users cannot send messages without scrolling the sidebar independently.

**Fix required:** Apply `min-h-0` and `flex-1 overflow-y-auto` correctly to the message list container inside the right sidebar so it flexes within the fixed sidebar height rather than growing beyond it.

---

### P1 — Personalized Learning Path Persistence

**Problem:** Personalized learning paths are regenerated on every page visit. There is no UI to view the stored path from a previous generation.

**Fix required:**

1. On page load, check `user_learning_paths` for an existing path — load it if found
2. Add a "Regenerate" button that explicitly clears and rebuilds
3. Track item completion state per item ID in localStorage (or a new `learning_progress` table)

---

### P1 — Mobile Navigation Overhaul

**Problem:** The left sidebar is not functional on mobile viewports. The hamburger menu opens the sidebar but it overlaps content rather than sliding in with proper z-index management. The close behavior requires two taps.

**Fix required:**

1. Implement proper mobile drawer with `z-overlay` layering and backdrop overlay
2. Close drawer on route change (add `usePathname` effect to SidebarContext)
3. Ensure close tap works on first tap (currently requires tap outside then tap again)

---

### P2 — Search (Global)

**Problem:** The Command Palette (`Cmd+K`) searches navigation destinations but not content. Users searching for "FHIR" find only nav items, not the FHIR Interoperability Lab or FHIR-tagged articles.

**Fix required:**

1. Add a Sanity GROQ search query to the command palette `useEffect`
2. Separate results into sections: Navigation, Articles, Research Tools, Glossary Terms
3. Add keyboard section navigation (left/right arrow to switch between sections)

---

### P2 — Article Bookmarking (Full Flow)

**Problem:** The bookmark icon on article cards calls `POST /api/bookmarks` but the bookmarks list at `/account` is a static placeholder — it does not fetch from the database.

**Fix required:**

1. Implement `GET /api/bookmarks` API route (fetch from `bookmarks` table for authenticated user)
2. Render actual bookmarks on `/account/bookmarks` page with proper loading/empty states
3. Add un-bookmark capability (delete with optimistic UI)

---

## 4. Roadmap — Phase 3 (Q3–Q4 2026)

### Major Features

**Community Hub:** The `/community` route is a placeholder. Phase 3 will implement:

- Discussion threads (per-article comments using Supabase Realtime)
- Professional directory (opt-in profiles for subscribers)
- HTR Connect (`/connect`) — structured peer connection for subscribers with aligned pillar interests

**Investment Tracker:** The sidebar links to `/investment-tracker` which does not exist. Phase 3 will implement a filterable database of healthcare M&A, VC, and PE transactions with:

- Sanity-managed transaction records
- Filter by deal type, pillar, geography, deal size
- Integration with public data sources (SEC EDGAR for public company deals)

**Academy Certificates (Public Verification):** The `/verify/[hash]` route is implemented but certificates are not yet issued by the completion flow. Phase 3 will:

1. Issue certificates on course completion with passing score
2. Generate and store verification hash in `academy_certificates`
3. Send certificate email via Loops.so

**Admin Dashboard Expansion:** Current admin dashboard at `/admin` shows basic metrics. Phase 3 will add:

- User management (search, role changes, subscription management)
- Content analytics (most-read articles, most-used tools, search queries)
- Revenue dashboard (Stripe MRR, churn, trial conversion)
- AI quality dashboard (zero-result rate, feedback thumbs down rate by topic)

---

## 5. AI & RAG Improvements

### Retrieval Quality (Q2 2026)

**Pillar-filtered retrieval:** Add optional pillar filtering to the hybrid search RPC. When a user is on a pillar page and opens the right sidebar AI, pre-filter retrieval to documents tagged with that pillar. Reduces noise and improves answer relevance for pillar-specific questions.

**Conversation memory:** Current RAG pipeline ignores conversation history for retrieval — every turn is retrieved independently. Implement query rewriting: before retrieval, use a fast LLM call to generate a standalone query that incorporates the conversation context. This dramatically improves follow-up question handling.

**Source citation in responses:** The system prompt instructs the LLM to cite sources but there is no structured citation extraction. Implement a post-processing step that parses source metadata from retrieved nodes and appends structured citations to the response.

### Model Routing (Q3 2026)

**Streaming structured output:** The current streaming implementation returns raw text. For specific query types (requests for comparisons, data tables, lists), detect the query intent and request structured Markdown output to improve rendering quality.

**Fallback chain:** When Groq is unavailable (rate limit or outage), fall back to OpenAI GPT-4o-mini for subscriber tier. Currently an outage of Groq takes down all AI Analyst functionality.

### Ingest Pipeline (Q3 2026)

**Incremental indexing:** Current ingest rebuilds the entire index from scratch. Implement incremental indexing: on Sanity webhook, extract the `_id` of the changed document, delete its existing chunks from `rag_documents`, re-fetch and re-embed only the changed document. Reduces ingest time from ~15 minutes to ~30 seconds for single-document changes.

**Embedding cache:** For static PDF documents in `backend/data/`, cache embeddings to avoid re-embedding on every rebuild. Store embedding version hash in metadata.

---

## 6. Architecture Improvements

### Next.js 16 Migration (Ongoing)

The codebase targets Next.js 16 (App Router). Some patterns from Pages Router remain:

- `next.config.js` still uses `experimental` flags that are now stable in Next.js 16
- Some `getServerSideProps` patterns in legacy pages — migrate to Server Components
- `next/headers` is being used correctly in API routes (async cookies/headers)

### Supabase SSR Client (Q2 2026)

The `@supabase/ssr` client in middleware uses `request.cookies.getAll()` and `response.cookies.set()` correctly. However, in some Server Components, the client is created without the cookie context, causing session hydration mismatches on first load. Audit all `createClient()` call sites to ensure they use the correct pattern.

### Error Boundaries (Q2 2026)

Research Lab tool components crash silently when a calculation produces `NaN` or `Infinity`. Wrap each tool component in a React `ErrorBoundary` that:

1. Catches rendering errors
2. Shows a friendly "Reset Tool" button
3. Reports the error to Sentry with tool ID context

### Bundle Size (Q3 2026)

Current bundle analysis (Vercel dashboard) shows the research-lab page bundle at ~1.8MB gzipped — primarily due to charting libraries (Recharts, D3). Options:

1. Replace heavy charting libraries with lightweight alternatives (visx, victory-native-xl)
2. Move chart rendering to a dedicated `/api/chart` route that returns SVG (avoids client bundle)
3. Code-split charts at the individual chart component level (currently split at tool level)

---

## 7. Database & Performance

### Query Optimization (Q2 2026)

The middleware executes a Supabase role lookup on every protected route request. This is a round-trip database query per page load. Optimize by:

1. Caching role in the JWT custom claims (set at login time, refresh on role change)
2. OR caching role in the session cookie (encrypted, validated on middleware)

This would eliminate ~80% of the `SELECT role FROM user_roles WHERE user_id = ?` queries.

---

### `rag_query_log` Growth (Ongoing)

At 1,000 AI queries/day, `rag_query_log` grows by ~365,000 rows/year. Implement automated pruning:

```sql
-- Run quarterly via cron (Supabase pg_cron or external scheduler)
DELETE FROM public.rag_query_log
WHERE created_at < NOW() - INTERVAL '90 days';
```

---

### pgvector Index Rebuild (Q3 2026)

The HNSW index on `rag_documents` is not rebuilt when documents are deleted. Over time, deleted documents remain in the graph as "ghost nodes" that waste memory and marginally degrade recall. Schedule a quarterly index rebuild:

```sql
REINDEX INDEX CONCURRENTLY idx_rag_embedding;
```

This rebuilds without locking the table (requires PostgreSQL 12+, which Supabase provides).

---

## 8. Security & Compliance

### HIPAA Alignment (Q2 2026)

The platform explicitly advises users not to enter PHI in the AI Analyst, and includes a PHI pattern detector in the input. However, the platform is not formally HIPAA-compliant (no BAA with Supabase, Groq, or Railway). For clients seeking to use HTR in a covered-entity context:

1. Obtain BAAs from Supabase (available on Enterprise plan), Railway (contact required), and Groq (contact required)
2. Enable Supabase audit logging for all data access
3. Implement session timeout (currently no session timeout is enforced)
4. Add PHI access logging if PHI is ever intentionally permitted

**Current status:** Advisory — the platform is for intelligence and analytics, not patient record management. PHI entry is actively discouraged and partially blocked.

---

### Content Security Policy (Q2 2026)

The current `next.config.js` does not define a Content Security Policy header. Add CSP headers to block XSS vectors:

```javascript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: *.sanity.io;
  font-src 'self';
  connect-src 'self' *.supabase.co *.railway.app *.sentry.io;
  frame-src 'none';
`;
```

Note: `unsafe-inline` and `unsafe-eval` are required for Next.js's inline scripts. Use nonce-based CSP in a future iteration to tighten this further.

---

### API Key Security Hardening (Q3 2026)

Current API keys are SHA-256 hashed. Improvements:

1. Add HMAC-based signing (key = `htr_` + base64url(random 32 bytes) + `.` + HMAC-SHA256(payload, secret))
2. Implement per-key rate limiting (currently rate limiting is per-IP, not per-key)
3. Add key rotation UI (generate new key while old one remains valid for 24 hours)

---

## 9. Content & Feature Expansion

### HTI Dashboard — Real Data (Q2 2026)

The HTI Dashboard currently displays static mock data. Phase 2 will connect it to real data sources:

1. CMS Quality Payment Program API for APM penetration
2. NCQA Quality Compass for HEDIS measures
3. ONC Health IT Dashboard for interoperability scores
4. Manual entry via admin dashboard for proprietary HTR scores

Data pipeline: scheduled Railway cron job → fetch/normalize → upsert into `hti_scores` Supabase table → served via `/api/v1/hti` endpoint.

---

### State Dashboard — Hospital Data (Q2 2026)

The Hospital View tab on state detail pages currently shows synthetic data. Connect to real CMS hospital compare data:

1. Download CMS Provider of Services file (quarterly release)
2. Parse and normalize hospital records by state
3. Load into `hospitals` Supabase table (new migration needed)
4. Serve via existing `StateDetailClientPage` hospital tab

---

### The Wire — Live News Feed (Q3 2026)

`/the-wire` currently shows static placeholder headlines. Implement a live news aggregation pipeline:

1. Scheduled job (Railway cron or Vercel cron) fetches from 5–10 healthcare news RSS feeds
2. Normalizes to `{text, url, source, published_at}` schema
3. Filters for healthcare relevance using keyword matching or a lightweight classifier
4. Stores in `ticker_cache` table
5. `/api/ticker` serves cached headlines (TTL: 15 minutes)

---

## 10. Known Issues

| Issue | Severity | Status | Notes |
| --- | --- | --- | --- |
| Right sidebar send button hidden on short viewports | High | Open | CSS flex height issue in RightSidebar |
| Mobile sidebar close requires two taps | High | Open | z-index / event propagation issue |
| Academy enrollment redirect post-payment broken | High | Open | Stripe success URL not reading `from` param |
| Bookmarks list on `/account` shows placeholder | Medium | Open | API route not implemented |
| Personalized learning path not persisting | Medium | Open | No load-existing-path logic on page mount |
| HTI Dashboard uses static mock data | Medium | Open | Awaiting real data pipeline |
| Hospital View tab uses synthetic data | Medium | Open | Awaiting CMS data integration |
| `/community` route is a placeholder | Low | Open | Phase 3 feature |
| `/investment-tracker` route does not exist | Low | Open | Phase 3 feature |
| Research Lab tools have no error boundaries | Low | Open | Silent crashes on bad inputs |
| FlashRank model download on first startup | Low | Acceptable | One-time ~100MB download; cached after |
| In-process rate limiter resets on cold start | Low | Acceptable | Acceptable for low-traffic `/verify/` route |
