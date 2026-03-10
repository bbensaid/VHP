# Health Transformation Review — Developer Guide

**Version:** 2026-03-10 | **Stack:** Next.js 16 · React 19 · Sanity CMS · Supabase · Gemini 1.5 Flash · Tailwind v4

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Repository Layout](#2-repository-layout)
3. [Environment Variables](#3-environment-variables)
4. [Architecture & Data Flow](#4-architecture--data-flow)
5. [Getting Started (Local Dev)](#5-getting-started-local-dev)
6. [Routing & Page Structure](#6-routing--page-structure)
7. [Component Architecture](#7-component-architecture)
8. [Color System](#8-color-system)
9. [Sanity CMS — All Schemas](#9-sanity-cms--all-schemas)
10. [Static Data Layer](#10-static-data-layer)
11. [RAG Pipeline (AI Analyst)](#11-rag-pipeline-ai-analyst)
12. [Dashboard System](#12-dashboard-system)
13. [Auth & Middleware](#13-auth--middleware)
14. [Scripts Reference](#14-scripts-reference)
15. [API Routes](#15-api-routes)
16. [How to Add a New Pillar](#16-how-to-add-a-new-pillar)
17. [How to Add a New State](#17-how-to-add-a-new-state)
18. [Deployment](#18-deployment)
19. [Known Issues & Roadmap](#19-known-issues--roadmap)

---

## 1. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 16.1.6 | App Router (not Pages Router) |
| UI Library | React | 19.0.0-rc | Pre-release — stable for production |
| Styling | Tailwind CSS | 4.0.0-beta.9 | v4 beta — uses `@theme` in CSS, not `tailwind.config.js` |
| Styled Components | styled-components | 6.3.8 | Used for a few legacy components only |
| CMS | Sanity | latest | Studio embedded at `/studio` route |
| CMS Client | next-sanity | latest | Includes `createClient` + live preview utilities |
| Database / Auth | Supabase | 2.89.0 | Postgres + pgvector + auth |
| Supabase SSR | @supabase/ssr | 0.9.0 | Server-side session handling in middleware |
| AI Model | Google Gemini 1.5 Flash | — | Via `@google/generative-ai` 0.24.1 |
| Embedding Model | Google text-embedding-004 | — | 768-dim, used for RAG |
| Maps | react-simple-maps | 1.0.0 | D3-backed SVG US map |
| Type Safety | TypeScript | 5.x | Strict mode enabled |
| Language | Node.js | 20.x | Dev and build environment |

**Important version notes:**
- Next.js reports as `^16.1.6` in package.json — treat as Next.js 15 app router series.
- Tailwind v4 is a **breaking change** from v3: no `tailwind.config.js` theme extensions for custom colors — all color tokens live in `globals.css` via `@theme`.
- React 19 RC ships with concurrent features; no `ReactDOM.render()` — use `createRoot()`.

---

## 2. Repository Layout

```
Vermont-Health-Platform/
├── frontend/                    ← Next.js application (primary codebase)
│   ├── app/                     ← App Router pages and API routes
│   │   ├── layout.tsx           ← Root layout (Header + AppShell + Footer)
│   │   ├── globals.css          ← SINGLE SOURCE OF TRUTH for all colors (@theme)
│   │   ├── page.tsx             ← Home page
│   │   ├── api/
│   │   │   ├── chat/route.ts    ← RAG-enhanced AI Analyst endpoint
│   │   │   ├── digest/route.ts  ← Email digest trigger
│   │   │   ├── rht-states/route.ts ← RHT state data API
│   │   │   ├── search/route.ts  ← Full-text search endpoint
│   │   │   └── subscribe/route.ts ← Email subscription endpoint
│   │   ├── dashboard/           ← State Performance Dashboard
│   │   │   ├── layout.tsx       ← Dashboard layout with sidebar
│   │   │   ├── page.tsx         ← Dashboard index (map view)
│   │   │   ├── DashboardIndexClient.tsx ← Client component for map
│   │   │   └── [state]/         ← Dynamic state detail pages
│   │   │       ├── page.tsx     ← Server component (fetches data)
│   │   │       └── StateDetailClientPage.tsx ← Client (tabs, charts)
│   │   ├── policy/              ← Policy pillar hub + articles
│   │   │   ├── page.tsx         ← PillarHub template
│   │   │   └── [slug]/page.tsx  ← Individual article
│   │   ├── economics/           ← Economics pillar hub + articles
│   │   ├── technology/          ← Technology pillar hub + articles
│   │   ├── clinical/            ← Clinical pillar hub + articles
│   │   ├── equity/              ← Equity pillar hub + articles
│   │   ├── academy/             ← Academy learning platform
│   │   │   ├── page.tsx         ← Academy home
│   │   │   ├── courses/[slug]/  ← Course detail
│   │   │   ├── modules/[slug]/  ← Module detail
│   │   │   ├── webinars/[slug]/ ← Webinar detail
│   │   │   └── glossary/        ← Glossary with pillar filter
│   │   ├── account/             ← Protected user account (requires auth)
│   │   ├── login/               ← Auth login page
│   │   ├── signup/              ← Auth signup page
│   │   ├── reset-password/      ← Password reset flow
│   │   ├── search/              ← Full-text search results
│   │   ├── chat/                ← AI Analyst standalone chat page
│   │   ├── advisory/            ← Advisory hub
│   │   ├── hti-dashboard/       ← HTI (Health Transformation Index) dashboard
│   │   ├── trending-topics/     ← Trending topics page
│   │   ├── privacy/             ← Privacy policy stub
│   │   ├── terms/               ← Terms of service stub
│   │   └── sitemap/             ← Sitemap stub
│   ├── components/              ← Shared React components
│   │   ├── Header.tsx           ← Top navigation bar
│   │   ├── Footer.tsx           ← Site footer
│   │   ├── AppShell.tsx         ← Left/right sidebar shell (auto-collapses)
│   │   ├── HomeSidebar.tsx      ← Left sidebar (pillar nav links)
│   │   ├── RightSidebar.tsx     ← Right sidebar (AI chat suggestions)
│   │   ├── CommandPalette.tsx   ← Cmd+K command palette
│   │   ├── VideoLibrary.tsx     ← Multi-pillar video library
│   │   ├── TickerContext.tsx    ← Context provider for news ticker
│   │   ├── TooltipContext.tsx   ← Tooltip context provider
│   │   ├── dashboard/           ← Dashboard-specific components
│   │   │   └── RHTScorecard.tsx ← RHT program scorecard
│   │   └── templates/           ← Full-page template components
│   │       ├── PillarHub.tsx    ← Template for all 5 pillar hub pages
│   │       ├── ArticleEngine.tsx ← Template for individual articles
│   │       ├── AcademyModuleEngine.tsx ← Academy module renderer
│   │       ├── AcademyModuleLayout.tsx ← Academy module layout wrapper
│   │       └── HubPageTemplate.tsx   ← Generic hub page template
│   ├── lib/                     ← Utilities, data, and service clients
│   │   ├── sanity.ts            ← Sanity client + urlFor() helper
│   │   ├── supabase.ts          ← Supabase browser client
│   │   ├── rag.ts               ← RAG helpers (embed, search, buildContext)
│   │   ├── chat.ts              ← Chat client-side utilities
│   │   ├── ticker.ts            ← Ticker/news data fetcher
│   │   ├── utils.ts             ← General utility functions
│   │   ├── dashboard-types.ts   ← TypeScript types for dashboard
│   │   ├── sanity-dashboard-queries.ts ← GROQ queries for dashboard
│   │   ├── context/
│   │   │   ├── DashboardContext.tsx ← React context for dashboard state
│   │   │   └── ProgramContext.tsx   ← React context for RHT program state
│   │   ├── data/                ← Static data (pre-Sanity / seed reference)
│   │   │   ├── performance-index-data.ts ← 50-state performance metrics
│   │   │   ├── rht-program.ts   ← RHT state profiles + RHTProfile type
│   │   │   ├── hospital-data.ts ← Hospital reference data
│   │   │   ├── rht-awards.ts    ← RHT award amounts by state
│   │   │   └── states.ts        ← State metadata (names, abbreviations)
│   │   └── hooks/
│   │       └── useSolvencySimulation.ts ← Hospital solvency simulation hook
│   ├── sanity/                  ← Sanity Studio configuration
│   │   ├── schemaTypes/         ← All 21 document schemas (see §9)
│   │   └── ...                  ← Studio desk config, plugins
│   ├── scripts/                 ← One-off seed and sync scripts (Node/tsx)
│   │   ├── seed-content.ts      ← Seed initial Sanity content
│   │   ├── seed-hospitals.ts    ← Seed hospital documents
│   │   ├── seed-sanity-performance-index.ts ← Seed state performance index
│   │   ├── seed-sanity-rht.ts   ← Seed RHT state profiles
│   │   └── sync-embeddings.ts   ← Sync Sanity → Supabase pgvector (RAG)
│   ├── middleware.ts             ← Supabase auth guard for /account routes
│   ├── next.config.ts           ← Next.js config (styled-components compiler)
│   └── .env.local               ← Environment variables (never commit)
├── supabase/
│   └── setup-rag.sql            ← One-time pgvector setup SQL
├── USER_MANUAL.md               ← End-user documentation
└── DEVELOPER_GUIDE.md           ← This file
```

---

## 3. Environment Variables

Create `frontend/.env.local` with the following variables. **Never commit this file.**

```env
# ─── Sanity CMS ──────────────────────────────────────────────────────────────
# Project ID and dataset from sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01

# Read/write API token for server-side mutations and seeding scripts.
# Generate at: sanity.io/manage → your project → API → Tokens
# Required permissions: Editor (or higher for mutations)
SANITY_API_TOKEN=your-sanity-api-token

# ─── Supabase ────────────────────────────────────────────────────────────────
# Found in: Supabase dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Service role key — server-side only, bypasses Row Level Security.
# Used by sync-embeddings.ts to write to content_embeddings.
# NEVER expose to the browser.
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ─── Google AI (Gemini + Embeddings) ─────────────────────────────────────────
# Used for: AI Analyst chat (Gemini 1.5 Flash) + RAG embeddings (text-embedding-004)
# Get from: aistudio.google.com → API Keys
GEMINI_API_KEY=your-gemini-api-key
```

### Variable reference table

| Variable | Public? | Used By | Required |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity client, seed scripts | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity client | Yes (default: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Sanity client | Yes |
| `SANITY_API_TOKEN` | No (server) | Seed scripts, sync-embeddings | For seeding only |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase client, middleware, RAG | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase browser client, auth | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | No (server) | sync-embeddings.ts | For RAG sync only |
| `GEMINI_API_KEY` | No (server) | `/api/chat/route.ts`, `lib/rag.ts`, sync-embeddings | Yes (for AI/RAG) |

**Note on `GEMINI_API_KEY`:** If omitted from `.env.local`, export it in your shell profile (`export GEMINI_API_KEY=...`) — the sync script uses `dotenv` but also reads from the shell environment. The Next.js dev server must have it in `.env.local` for the chat API to work.

---

## 4. Architecture & Data Flow

### High-level system diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (User)                          │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                        │
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────────────────────┐  │
│  │  Server Components│    │  Client Components               │  │
│  │  (page.tsx files) │    │  (StateDetailClientPage, etc.)  │  │
│  │                   │    │                                  │  │
│  │  - Fetch Sanity   │    │  - Dashboard tabs & charts       │  │
│  │  - Fetch static   │    │  - Chat UI                       │  │
│  │    data           │    │  - Map interactions              │  │
│  └─────────┬─────────┘    └──────────────────────────────────┘  │
│            │                                                     │
│  ┌─────────▼──────────────────────────────────────────────────┐ │
│  │                    API Routes (app/api/)                    │ │
│  │  /api/chat  → RAG + Gemini stream                          │ │
│  │  /api/search → Full-text search                            │ │
│  │  /api/subscribe → Supabase email list                      │ │
│  │  /api/digest → Email digest trigger                        │ │
│  │  /api/rht-states → RHT state data                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────┬──────────────────────────┬──────────────────────────────┘
          │                          │
          ▼                          ▼
┌──────────────────┐      ┌────────────────────────────────────┐
│   Sanity CMS      │      │           Supabase                 │
│                   │      │                                    │
│  - 21 schemas     │      │  ┌─────────────────────────────┐  │
│  - GROQ queries   │      │  │  content_embeddings table    │  │
│  - Studio at      │      │  │  (pgvector, 768-dim)         │  │
│    /studio        │      │  │                              │  │
│  - Portable Text  │      │  │  match_documents() function  │  │
│    (block content)│      │  └─────────────────────────────┘  │
└──────────────────┘      │  ┌─────────────────────────────┐  │
                           │  │  Auth (email/password)       │  │
                           │  │  User sessions               │  │
                           │  └─────────────────────────────┘  │
                           └────────────────────────────────────┘
```

### RAG chat flow (detailed)

```
User types question
        │
        ▼
POST /api/chat
        │
        ├─ 1. embedText(question)
        │        │
        │        └─ Google text-embedding-004 API
        │              → 768-dimensional float array
        │
        ├─ 2. searchSimilar(embedding, threshold=0.45, count=5)
        │        │
        │        └─ Supabase RPC: match_documents()
        │              → Top-5 content chunks (cosine similarity)
        │
        ├─ 3. buildContextBlock(chunks)
        │        │
        │        └─ Formats chunks as numbered, cited context string
        │
        ├─ 4. Build full prompt:
        │     systemContext + contextBlock + "Question: " + message
        │
        └─ 5. model.generateContentStream(fullPrompt)
                 │
                 └─ Gemini 1.5 Flash streaming
                       → ReadableStream → client
```

### Content sync flow (offline / scheduled)

```
Sanity Studio (editor creates content)
        │
        ▼
npx tsx scripts/sync-embeddings.ts
        │
        ├─ Fetch all docs from Sanity via GROQ
        │   (policyAnalysis, post, academyModule, caseStudy,
        │    definition, analystNote, webinar, report)
        │
        ├─ For each doc:
        │   1. Extract plain text (portableTextToPlain)
        │   2. Truncate to 8000 chars
        │   3. embed(text) → Google text-embedding-004
        │   4. supabase.upsert() → content_embeddings
        │   5. sleep(1000ms) ← rate-limit compliance
        │
        └─ Done: embeddings available for RAG queries
```

---

## 5. Getting Started (Local Dev)

### Prerequisites

- Node.js 20.x
- npm or npx (scripts use `npx tsx`)
- Supabase project with pgvector enabled
- Sanity project (free tier works)
- Google AI Studio API key (free tier: 60 req/min)

### Steps

```bash
# 1. Clone and install
cd frontend
npm install

# 2. Create environment file
cp .env.local.example .env.local   # if example exists, else create manually
# Fill in all variables from §3

# 3. Set up Supabase pgvector (one time only)
# Open Supabase dashboard → SQL Editor → paste and run:
# supabase/setup-rag.sql

# 4. Start development server
npm run dev
# → http://localhost:3000

# 5. Start Sanity Studio (runs on same port via /studio route)
# Studio is embedded in the Next.js app — no separate command needed.

# 6. (Optional) Seed initial content
cd frontend
npx tsx scripts/seed-content.ts
npx tsx scripts/seed-hospitals.ts
npx tsx scripts/seed-sanity-rht.ts
npx tsx scripts/seed-sanity-performance-index.ts

# 7. Sync RAG embeddings
npx tsx scripts/sync-embeddings.ts
```

### Build and lint

```bash
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
```

---

## 6. Routing & Page Structure

All routes use Next.js 14+ App Router with `page.tsx` server components as entry points.

### Route map

| URL Pattern | File | Type |
|---|---|---|
| `/` | `app/page.tsx` | Server |
| `/policy` | `app/policy/page.tsx` | Server → PillarHub template |
| `/policy/[slug]` | `app/policy/[slug]/page.tsx` | Server → ArticleEngine |
| `/economics` | `app/economics/page.tsx` | Server → PillarHub |
| `/economics/[slug]` | `app/economics/[slug]/page.tsx` | Server → ArticleEngine |
| `/technology` | `app/technology/page.tsx` | Server → PillarHub |
| `/clinical` | `app/clinical/page.tsx` | Server → PillarHub |
| `/equity` | `app/equity/page.tsx` | Server → PillarHub |
| `/academy` | `app/academy/page.tsx` | Server |
| `/academy/modules/[slug]` | `app/academy/modules/[slug]/page.tsx` | Server → AcademyModuleEngine |
| `/academy/courses/[slug]` | `app/academy/courses/[slug]/page.tsx` | Server |
| `/academy/webinars/[slug]` | `app/academy/webinars/[slug]/page.tsx` | Server |
| `/academy/glossary` | `app/academy/glossary/page.tsx` | Client (filter state) |
| `/dashboard` | `app/dashboard/page.tsx` | Server → DashboardIndexClient |
| `/dashboard/[state]` | `app/dashboard/[state]/page.tsx` | Server → StateDetailClientPage |
| `/chat` | `app/chat/page.tsx` | Client |
| `/search` | `app/search/page.tsx` | Client |
| `/account` | `app/account/page.tsx` | Client (protected) |
| `/login` | `app/login/page.tsx` | Client |
| `/signup` | `app/signup/page.tsx` | Client |
| `/studio` | Sanity Studio embedded | Studio |

### Naming conventions

- **Server components** (`page.tsx`) handle data fetching (Sanity GROQ queries, static data imports).
- **Client components** (`*Client*.tsx` or `"use client"` directive) handle interactivity — tab switches, map clicks, chat input.
- **Layout files** (`layout.tsx`) apply shared UI wrappers — the dashboard layout adds a sidebar, the root layout adds Header/AppShell/Footer.
- Dynamic segments use `[slug]` or `[state]` — state slugs are lowercase (e.g., `vermont`, `new-york`).

---

## 7. Component Architecture

### Root layout chain

```
app/layout.tsx
  └── CommandPalette        ← Cmd+K global command palette
      TooltipProvider       ← Hover tooltip context
      TickerProvider        ← News ticker data context
        Header              ← Top nav bar (links, auth state, search)
        AppShell            ← Left sidebar + main content + right sidebar
          HomeSidebar       ← Left: pillar nav links
          {children}        ← Page content
          RightSidebar      ← Right: AI chat suggestions
        Footer
```

### AppShell behavior

`AppShell` automatically collapses both sidebars on:
- Article routes (`/policy/[slug]`, `/economics/[slug]`, etc.)
- Academy module routes (`/academy/modules/[slug]`)

This gives article pages full-width layout. The sidebars show on hub pages, the home page, and the dashboard.

### Template components (`components/templates/`)

| Template | Used for | Key props |
|---|---|---|
| `PillarHub` | All 5 pillar landing pages | `pillarName`, `themeColor`, `featured`, `recent` |
| `ArticleEngine` | Policy analysis articles | `article` (full Sanity doc) |
| `AcademyModuleEngine` | Academy module content | `module` (Sanity academyModule doc) |
| `AcademyModuleLayout` | Module navigation wrapper | `prev`, `next`, `pillar` |
| `HubPageTemplate` | Generic hub pages (advisory) | `sections[]` |

### Dashboard components

- **`app/dashboard/page.tsx`** — Server component. Imports state list from `lib/data/states.ts`, renders `DashboardIndexClient`.
- **`DashboardIndexClient.tsx`** — Client. Shows US SVG map (`react-simple-maps`), handles state click → navigate to `/dashboard/[state]`.
- **`app/dashboard/[state]/page.tsx`** — Server. Looks up state in `rhtProgramData` and `performanceIndexData`, passes to `StateDetailClientPage`.
- **`StateDetailClientPage.tsx`** — Client. Three-tab UI: Performance Index | RHT Program | Hospital View.
- **`RHTScorecard.tsx`** — Renders the RHT metrics grid with color-coded status badges.
- **`DashboardContext`** (`lib/context/DashboardContext.tsx`) — Provides selected state, scenario mode (statusQuo | optimized), and all-states data to deeply nested dashboard components.
- **`ProgramContext`** (`lib/context/ProgramContext.tsx`) — Provides RHT program data to the RHT Program tab.

---

## 8. Color System

**Single source of truth: `frontend/app/globals.css`**

Do **not** add custom colors to `tailwind.config.js`. Tailwind v4 reads CSS `@theme` variables directly.

### How it works

```css
/* frontend/app/globals.css */
@theme {
  --color-brand-policy:     #0369a1;  /* sky-700 */
  --color-brand-economics:  #059669;  /* emerald-600 */
  --color-brand-technology: #4f46e5;  /* indigo-600 */
  --color-brand-clinical:   #dc2626;  /* red-600 */
  --color-brand-equity:     #d97706;  /* amber-600 */
  --color-brand-academy:    #38bdf8;  /* sky-400 */
  --color-brand-advisory:   #d946ef;  /* fuchsia-500 */
  /* ... card and UI variables ... */
}
```

Tailwind v4 auto-generates utility classes from `@theme` variables:
- `text-brand-policy` → `color: #0369a1`
- `bg-brand-economics` → `background-color: #059669`
- `border-brand-clinical` → `border-color: #dc2626`

### Complete color token reference

| Token | Value | Usage |
|---|---|---|
| `--color-brand-policy` | `#0369a1` | Policy pillar (sky blue) |
| `--color-brand-economics` | `#059669` | Economics pillar (emerald) |
| `--color-brand-technology` | `#4f46e5` | Technology pillar (indigo) |
| `--color-brand-clinical` | `#dc2626` | Clinical pillar (red) |
| `--color-brand-equity` | `#d97706` | Equity pillar (amber) |
| `--color-brand-academy` | `#38bdf8` | Academy/education (light sky) |
| `--color-brand-advisory` | `#d946ef` | Advisory services (fuchsia) |
| `--color-card-policy` | (light sky bg) | Card backgrounds |
| `--color-card-tech` | (light indigo bg) | Card backgrounds |
| `--color-card-economics` | (light emerald bg) | Card backgrounds |
| `--color-card-clinical` | (light red bg) | Card backgrounds |
| `--color-card-equity` | (light amber bg) | Card backgrounds |
| `--color-ui-primary` | (brand accent) | Primary buttons/links |
| `--color-ui-border` | (slate) | Default borders |
| `--color-text-heading` | (near black) | H1–H6 |
| `--color-text-body` | (slate-600) | Body text |
| `--color-surface` | white | Page background |
| `--color-surface-muted` | (slate-50) | Secondary backgrounds |

### Pillar theme objects

Components that need pillar-specific theming define a `styles` object (see `PillarHub.tsx` as the canonical example):

```typescript
const styles = {
  policy:     { header: "bg-brand-policy", text: "text-brand-policy", ... },
  economics:  { header: "bg-brand-economics", ... },
  technology: { header: "bg-brand-technology", ... },
  clinical:   { header: "bg-brand-clinical", ... },
  equity:     { header: "bg-brand-equity", ... },
};
const theme = styles[themeColor];
```

---

## 9. Sanity CMS — All Schemas

The studio lives at `/studio` (next-sanity embedded). Schema files are in `frontend/sanity/schemaTypes/`.

### Document schemas

#### `post` — General Blog Articles
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generated from title |
| `author` | reference → author | |
| `publishedAt` | datetime | |
| `mainImage` | image | Cover image |
| `categories` | array of reference → category | |
| `body` | blockContent | Full rich text |

#### `policyAnalysis` — Policy Deep-Dives
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required |
| `pillar` | string | Policy \| Economics \| Technology \| Clinical \| Equity |
| `summary` | text | Executive summary |
| `impactLevel` | string | Critical \| High \| Medium \| Low |
| `category` | string | Thematic category |
| `publishedAt` | datetime | |
| `body` | blockContent | Full analysis |

**Consumed by:** Pillar hub pages (featured + recent), ArticleEngine template, RAG sync.

#### `caseStudy` — Case Studies
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required |
| `pillar` | string | Policy \| Economics \| Technology \| Clinical \| Equity |
| `clientType` | string | e.g., "Rural Hospital", "Payer" |
| `summary` | text | Executive summary |
| `metrics` | array of string | e.g., "40% Reduction" |
| `body` | blockContent | Full case study |
| `mainImage` | image | Cover image |

#### `course` — Academy Courses
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required |
| `pillar` | string | Policy \| Economics \| Technology \| Clinical \| Equity |
| `type` | string | CERTIFICATION \| COURSE \| WEBINAR \| MASTERCLASS |
| `description` | text | Short description |
| `meta` | string | e.g., "8 Weeks • Online Cohort" |
| `price` | string | e.g., "$2,995" |
| `instructors` | array of reference → instructor | |
| `modules` | array of reference → academyModule | Ordered module list |
| `overview` | blockContent | Full syllabus |

#### `academyModule` — Academy Modules (individual lessons)
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required |
| `pillar` | string | Policy \| Economics \| Technology \| Clinical \| Equity |
| `moduleNumber` | number | Order within course |
| `summary` | text | Short description |
| `learningObjectives` | array of string | Bullet objectives |
| `prevModule` | reference → academyModule | Navigation |
| `nextModule` | reference → academyModule | Navigation |
| `body` | blockContent | Full module content |

#### `webinar` — Webinars
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required |
| `pillar` | string | Policy \| Economics \| Technology \| Clinical \| Equity |
| `description` | text | |
| `youtubeId` | string | YouTube video ID |
| `scheduledDate` | datetime | |
| `speakers` | array of reference → instructor | |

#### `report` — Research Reports
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required |
| `pillar` | string | Policy \| Economics \| Technology \| Clinical \| Equity |
| `abstract` | text | Executive summary |
| `publishedAt` | datetime | |
| `body` | blockContent | Full report |
| `pdfUrl` | url | Download link |

#### `analystNote` — Analyst Notes (for RAG context)
| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `pillar` | string | Pillar association |
| `body` | blockContent | Note content |

These are internal notes embedded into the RAG context but not displayed publicly.

#### `definition` — Glossary Terms
| Field | Type | Notes |
|---|---|---|
| `term` | string | Required — term or acronym |
| `description` | text | Required — full definition |
| `pillars` | array of string | Tags: Policy \| Economics \| Technology \| Clinical \| Equity |

**Consumed by:** `/academy/glossary` page (filterable by pillar), RAG sync.

#### `instructor` — Academy Instructors
| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `bio` | text | |
| `photo` | image | |
| `title` | string | Professional title |
| `organization` | string | Affiliation |

#### `author` — Article Authors
| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `bio` | text | |
| `image` | image | |

#### `category` — Content Categories
| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `description` | text | |

#### `hospital` — Hospital Records
| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `stateSlug` | string | Lowercase state slug (e.g., "vermont") |
| `location` | string | City, state |
| `type` | string | Critical Access \| Regional \| Academic \| Community |
| `beds` | number | Licensed bed count |
| `margin` | number | Operating margin % |
| `rhtParticipant` | boolean | |

#### `rhtState` — RHT Program State Profiles (Sanity version)
Mirrors the structure of `lib/data/rht-program.ts` but managed in Sanity.
| Field | Type | Notes |
|---|---|---|
| `stateId` | string | Lowercase slug (e.g., "vermont") |
| `stateName` | string | Display name |
| `awardAmount` | string | Dollar amount |
| `status` | string | Active \| Pending \| At Risk |
| `description` | text | Program overview |
| `initiatives` | array of objects | `{ title, description }` |
| `metrics` | array of objects | `{ label, status, target }` |

#### `statePerformanceIndex` — State Performance (Sanity version)
Sanity-managed version of `lib/data/performance-index-data.ts`.

#### `subscriber` — Email Subscribers
| Field | Type | Notes |
|---|---|---|
| `email` | string | Required |
| `subscribedAt` | datetime | |
| `active` | boolean | |

#### `ticker` — News Ticker Items
| Field | Type | Notes |
|---|---|---|
| `label` | string | Short ticker text |
| `url` | url | Link target |
| `publishedAt` | datetime | |

#### `dailyInsight` — Daily Insights
| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `body` | blockContent | |
| `publishedAt` | datetime | |
| `pillar` | string | |

#### `audio` — Audio Content (Podcasts)
| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `description` | text | |
| `audioUrl` | url | Direct audio file URL |
| `pillar` | string | |
| `publishedAt` | datetime | |

#### `blockContent` — Shared Rich Text Type
Not a document — a reusable type for portable text fields across all schemas. Supports: paragraphs, headings, blockquotes, images, code blocks, and custom inline annotations.

---

## 10. Static Data Layer

Static TypeScript data files in `frontend/lib/data/` power the dashboard while Sanity-managed versions are being built out. They are the source of truth for the dashboard currently.

### `performance-index-data.ts`

**Type:**
```typescript
type PerformanceIndexProfile = {
  id: string;              // lowercase state slug (e.g., "vermont")
  stateName: string;
  overallScore: number;    // 0–100 composite
  rank: number;            // 1–50 national rank
  tier: "Leader" | "Advancing" | "Developing" | "Lagging";
  lastUpdated: string;
  metrics: {
    policy: {
      vbpAdoption: number;       // 0–100 score
      telehealth: number;
      scopeOfPractice: number;
    };
    economics: {
      spendingPerCapita: number;
      workforceGaps: number;
      insuranceCoverage: number;
    };
    technology: {
      hieAdoption: number;
      broadbandAccess: number;
      ehrAdoption: number;
    };
    clinical: {
      preventiveCare: number;
      readmissionRate: number;
      chronicDiseaseControl: number;
    };
    equity: {
      racialEquityGap: number;
      ruralUrbanGap: number;
      sdohIntegration: number;
    };
  };
};
```

All 50 states have entries. Scores are on a 0–100 scale (higher = better). The file was updated (2026-03-10) to include all 5 pillar metric groups — earlier it only had policy, economics, and technology.

### `rht-program.ts`

```typescript
type RHTProfile = {
  id: string;                    // "vermont"
  stateName: string;             // "Vermont"
  awardAmount: string;           // "$195,000,000"
  status?: "Active" | "Pending" | "At Risk";
  strategicFocus: string | string[];
  description: string;           // Program overview paragraph
  initiatives: {
    title: string;
    description: string;
  }[];
  metrics: {
    label: string;
    status: "Pending" | "In Progress" | "Achieved";
    target?: string;
  }[];
};

export const rhtProgramData: Record<string, RHTProfile>
```

Only states with active CMS Innovation RHT awards have entries.

### `hospital-data.ts`

Static hospital reference data. Each entry includes name, stateSlug, location, type, beds, margin, and rhtParticipant flag. This data is shown in the "Hospital View" tab on state detail pages.

### `states.ts`

Lookup table mapping state slugs to display names and two-letter abbreviations. Used by the dashboard map and state selector.

### `rht-awards.ts`

Award amounts by state slug. Cross-references `rht-program.ts`.

---

## 11. RAG Pipeline (AI Analyst)

### Components

| File | Role |
|---|---|
| `supabase/setup-rag.sql` | One-time DB setup — creates table, indexes, function |
| `frontend/scripts/sync-embeddings.ts` | Offline sync: Sanity → embeddings → Supabase |
| `frontend/lib/rag.ts` | Runtime helpers: `embedText`, `searchSimilar`, `buildContextBlock` |
| `frontend/app/api/chat/route.ts` | Request handler: orchestrates RAG + Gemini streaming |

### Database setup

Run `supabase/setup-rag.sql` **once** in the Supabase SQL Editor:

```sql
-- Enables pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table for all content embeddings
CREATE TABLE content_embeddings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id   TEXT NOT NULL,        -- Sanity document _id
  content_type TEXT NOT NULL,        -- schema type name
  title        TEXT,
  content      TEXT NOT NULL,        -- plain text that was embedded
  url          TEXT,                 -- canonical frontend URL
  pillar       TEXT,                 -- Policy | Economics | ... | null
  embedding    VECTOR(768),          -- Google text-embedding-004 output
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Unique index on content_id (enables upsert without duplicates)
CREATE UNIQUE INDEX content_embeddings_content_id_idx ON content_embeddings (content_id);

-- HNSW index for fast cosine-distance ANN search
CREATE INDEX content_embeddings_hnsw_idx
  ON content_embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- RPC function called by the RAG helper at query time
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.5,
  match_count     INT   DEFAULT 5
) RETURNS TABLE (id UUID, content_id TEXT, content_type TEXT, title TEXT,
                 content TEXT, url TEXT, pillar TEXT, similarity FLOAT)
LANGUAGE SQL STABLE AS $$
  SELECT id, content_id, content_type, title, content, url, pillar,
         1 - (embedding <=> query_embedding) AS similarity
  FROM content_embeddings
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

### Sync script

Run after content changes in Sanity:

```bash
cd frontend
npx tsx scripts/sync-embeddings.ts
```

The script:
1. Fetches all syncable documents from Sanity via GROQ
2. Converts Portable Text blocks to plain text
3. Truncates each to 8,000 characters (Gemini API limit)
4. Embeds each with `text-embedding-004` (768-dim)
5. Upserts into `content_embeddings` by `content_id`
6. Sleeps 1s between embeds to respect rate limits (60 req/min free tier)

**Content types synced:** `policyAnalysis`, `post`, `academyModule`, `caseStudy`, `definition`, `analystNote`, `webinar`, `report`

### RAG library (`lib/rag.ts`)

```typescript
// Embed user query
embedText(text: string): Promise<number[]>
  // → calls Google text-embedding-004, returns 768-float array

// Retrieve similar chunks
searchSimilar(embedding: number[], options?: {
  matchThreshold?: number;   // default 0.5; chat uses 0.45 (more permissive)
  matchCount?: number;       // default 5
}): Promise<ContentChunk[]>
  // → calls Supabase RPC match_documents()

// Format chunks into an LLM context string
buildContextBlock(chunks: ContentChunk[]): string
  // → numbered list: "[1] 'Title' [Pillar] (url)\n{content truncated to 1200 chars}"
```

### Chat endpoint (`/api/chat`)

**Request:**
```json
{
  "message": "What is Vermont's telehealth adoption rate?",
  "temperature": 0.7,       // optional, default 0.7
  "systemPrompt": "..."     // optional, overrides default HTR analyst persona
}
```

**Response:** `ReadableStream` (text chunks from Gemini 1.5 Flash)

**Graceful degradation:** If embedding or Supabase fails, the endpoint logs a warning and proceeds with no context (Gemini answers from general knowledge only). The endpoint never 500s due to RAG failure alone.

### Tuning parameters

| Parameter | Current value | Effect of increasing |
|---|---|---|
| `matchThreshold` | 0.45 | Higher = fewer but more relevant results |
| `matchCount` | 5 | More chunks = richer context, larger prompt |
| `temperature` | 0.7 | Higher = more creative, less reliable |
| Truncate per chunk | 1,200 chars | More context per source |
| Text truncation | 8,000 chars | Larger input per embedded doc |

---

## 12. Dashboard System

### State detail pages

URL pattern: `/dashboard/[state]` where `state` is a lowercase slug (e.g., `vermont`, `new-york`).

**Server component** (`app/dashboard/[state]/page.tsx`):
- Imports `rhtProgramData` from `lib/data/rht-program.ts`
- Imports `performanceIndexData` from `lib/data/performance-index-data.ts`
- Looks up both by `params.state`
- Passes to `StateDetailClientPage`

**Client component** (`StateDetailClientPage.tsx`):
- Three tabs: **Performance Index** | **RHT Program** | **Hospital View**
- Tab state managed with `useState`

### Performance Index tab

Renders 5 pillar metric groups:
1. **Policy** — VBP Adoption, Telehealth Coverage, Scope of Practice
2. **Economics** — Spending Per Capita, Workforce Gaps, Insurance Coverage
3. **Technology** — HIE Adoption, Broadband Access, EHR Adoption
4. **Clinical** — Preventive Care, Readmission Rate, Chronic Disease Control
5. **Equity** — Racial Equity Gap, Rural-Urban Gap, SDOH Integration

Each metric renders with a `MetricDisplay` component showing score, color-coded bar, and label.

### Hospital solvency simulation

The "Hospital View" tab uses the `useSolvencySimulation` hook (`lib/hooks/useSolvencySimulation.ts`) to model two scenarios:
- **Status Quo** — current hospital financials
- **Optimized** — projected financials with RHT program interventions

Controlled via `DashboardContext.simulationMode`.

### Contexts

**`DashboardContext`** (provides to all dashboard subtree):
```typescript
{
  selectedStateId: string | null;
  setSelectedStateId: (id) => void;
  simulationMode: 'statusQuo' | 'optimized';
  setSimulationMode: (mode) => void;
  allStates: Record<string, RHTProfile>;
  selectedStateData: RHTProfile | null;
}
```

**`ProgramContext`** — Provides RHT program data (initiatives, metrics) to the RHT Program tab and scorecard.

---

## 13. Auth & Middleware

### Supabase Auth

Authentication uses Supabase email/password auth. The Supabase client is initialized in two ways:

1. **Browser client** (`lib/supabase.ts`) — uses anon key, for client-side session reads:
   ```typescript
   export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
   ```

2. **Server client** (middleware, `@supabase/ssr`) — uses `createServerClient` with cookie handling for SSR session validation.

### Middleware (`middleware.ts`)

Runs on edge runtime before every matched request. Checks Supabase session:

```typescript
// Only runs for:
export const config = { matcher: ["/account/:path*"] };

// Logic:
// 1. If path is not protected → NextResponse.next()
// 2. Create server-side Supabase client with request cookies
// 3. supabase.auth.getUser() — validates session
// 4. If no user → redirect to /login?from={pathname}
// 5. If authenticated → NextResponse.next() with updated cookies
```

### Auth pages

- `/login` — Email + password sign-in form
- `/signup` — New account creation
- `/reset-password` — Password reset request and confirm flow
- `/account` — Protected. Shows user profile, subscription status.

### Extending auth

To protect additional routes, add the path prefix to `PROTECTED_PREFIXES` in `middleware.ts`:
```typescript
const PROTECTED_PREFIXES = ["/account", "/your-new-protected-route"];
```

---

## 14. Scripts Reference

All scripts run from the `frontend/` directory using `npx tsx`.

### Execution order for a fresh setup

```bash
# 1. DB setup (Supabase SQL Editor — not a script)
# Run: supabase/setup-rag.sql

# 2. Seed Sanity content (run in order)
npx tsx scripts/seed-content.ts          # Articles, policy analyses
npx tsx scripts/seed-hospitals.ts        # Hospital records
npx tsx scripts/seed-sanity-rht.ts       # RHT state profiles
npx tsx scripts/seed-sanity-performance-index.ts  # State performance data

# 3. Sync RAG embeddings (after Sanity has content)
npx tsx scripts/sync-embeddings.ts
```

### Script details

#### `seed-content.ts`
Seeds initial policyAnalysis and post documents into Sanity. Run once per fresh project setup or to reset demo content. Uses `SANITY_API_TOKEN` for write access.

#### `seed-hospitals.ts`
Seeds hospital documents into Sanity from a static data source. Matches state slugs from `lib/data/states.ts`.

#### `seed-sanity-rht.ts`
Converts `lib/data/rht-program.ts` entries into Sanity `rhtState` documents. Keeps the Sanity CMS in sync with the static data.

#### `seed-sanity-performance-index.ts`
Converts `lib/data/performance-index-data.ts` entries into Sanity `statePerformanceIndex` documents.

#### `sync-embeddings.ts`
The most important operational script. Run after any significant Sanity content updates:
- Fetches all embeddable content types from Sanity
- Generates 768-dim embeddings via Google text-embedding-004
- Upserts into Supabase `content_embeddings` table
- Handles rate limiting (1s sleep between API calls)
- Reports: `N synced, N skipped, N errors`

**Required env vars for sync-embeddings.ts:**
- `GEMINI_API_KEY`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 15. API Routes

### `POST /api/chat`

RAG-enhanced AI Analyst. See §11 for full details.

**Body:** `{ message: string, temperature?: number, systemPrompt?: string }`
**Response:** Streaming text (ReadableStream)
**Auth:** None required (public endpoint)

### `GET /api/rht-states`

Returns RHT program state profiles as JSON.

**Response:** `{ states: Record<string, RHTProfile> }`
**Source:** `lib/data/rht-program.ts`

### `POST /api/subscribe`

Adds an email subscriber to Supabase.

**Body:** `{ email: string }`
**Response:** `{ success: boolean }`
**Storage:** Supabase `subscriber` table (or Sanity `subscriber` document)

### `POST /api/digest`

Triggers generation and delivery of the weekly email digest.

**Body:** `{ to?: string }` (optional override recipient)
**Response:** `{ sent: boolean }`

### `GET /api/search`

Full-text content search.

**Query params:** `?q=search+term`
**Response:** `{ results: SearchResult[] }`
**Source:** Sanity GROQ query with text matching

---

## 16. How to Add a New Pillar

Adding a new pillar requires changes in 12+ places. Follow this checklist:

### 1. Globals CSS — add color tokens

```css
/* frontend/app/globals.css */
@theme {
  --color-brand-newpillar: #your-color;
  --color-card-newpillar: #your-light-color;
}
```

### 2. Create the pillar route directory

```
frontend/app/newpillar/
├── page.tsx          ← Server component using PillarHub template
└── [slug]/
    └── page.tsx      ← Article page using ArticleEngine template
```

### 3. `PillarHub.tsx` — extend the types and styles

```typescript
// Update the union type:
themeColor: "economics" | "policy" | "technology" | "clinical" | "equity" | "newpillar"

// Add to the styles object:
newpillar: {
  header: "bg-brand-newpillar",
  text: "text-brand-newpillar",
  border: "border-brand-newpillar",
  indicator: "bg-brand-newpillar",
  hoverText: "group-hover:text-brand-newpillar",
  lightBg: "bg-[your-light-color]-50",
},
```

### 4. All Sanity schemas — add to pillar lists

Update the `list` option in every schema that has a `pillar` field:
- `sanity/schemaTypes/policyAnalysis.ts`
- `sanity/schemaTypes/caseStudy.ts`
- `sanity/schemaTypes/course.ts`
- `sanity/schemaTypes/academyModule.ts`
- `sanity/schemaTypes/webinar.ts`
- `sanity/schemaTypes/report.ts`
- `sanity/schemaTypes/analystNote.ts`

```typescript
// In each schema's pillar field:
options: {
  list: ['Policy', 'Economics', 'Technology', 'Clinical', 'Equity', 'New Pillar'],
}
```

### 5. `definition.ts` (Sanity schema) — add to pillars array

```typescript
options: {
  list: [
    ...existing entries...,
    { title: 'New Pillar', value: 'New Pillar' },
  ],
}
```

### 6. `VideoLibrary.tsx` — add to `getPillarTheme()` switch and `pillarOrder`

```typescript
case "New Pillar":
  return { text: "text-brand-newpillar", border: "border-brand-newpillar", ... };

const pillarOrder = ['Policy', 'Economics', 'Technology', 'Clinical', 'Equity', 'New Pillar', 'General']
```

### 7. Glossary page — add pillar to list and badge/button styles

`frontend/app/academy/glossary/page.tsx`:
- Add to `pillars` array
- Add case to `getBadgeStyle()`
- Add case to `getPillarButtonStyle()`

### 8. `performance-index-data.ts` — add new metrics to all 50 states

```typescript
// Add to PerformanceIndexProfile type:
newpillar: {
  metric1: number;
  metric2: number;
  metric3: number;
};

// Add to all 50 state entries:
newpillar: { metric1: 75, metric2: 80, metric3: 65 },
```

### 9. `StateDetailClientPage.tsx` — add metric section to Performance Index tab

Import an icon, then add a new `<div>` block mirroring the existing clinical/equity sections.

### 10. Navigation — update Header, HomeSidebar, and Footer

- `components/Header.tsx` — add pillar to the nav dropdown
- `components/HomeSidebar.tsx` — add direct link
- `components/Footer.tsx` — add to pillars list

### 11. Re-run sync after adding Sanity content

```bash
npx tsx scripts/sync-embeddings.ts
```

---

## 17. How to Add a New State

States appear in the dashboard, the US map, and RHT program profiles.

### Step 1: Add to `lib/data/states.ts`

```typescript
{ id: "new-state", name: "New State", abbreviation: "NS" }
```

### Step 2: Add to `lib/data/performance-index-data.ts`

Add a full `PerformanceIndexProfile` entry:
```typescript
"new-state": {
  id: "new-state",
  stateName: "New State",
  overallScore: 72,
  rank: 26,
  tier: "Advancing",
  lastUpdated: "2026-01-01",
  metrics: {
    policy:     { vbpAdoption: 70, telehealth: 65, scopeOfPractice: 75 },
    economics:  { spendingPerCapita: 80, workforceGaps: 60, insuranceCoverage: 85 },
    technology: { hieAdoption: 70, broadbandAccess: 55, ehrAdoption: 78 },
    clinical:   { preventiveCare: 72, readmissionRate: 68, chronicDiseaseControl: 74 },
    equity:     { racialEquityGap: 60, ruralUrbanGap: 55, sdohIntegration: 65 },
  },
},
```

### Step 3: (Optional) Add RHT profile to `lib/data/rht-program.ts`

Only if the state has an active RHT award:
```typescript
"new-state": {
  id: "new-state",
  stateName: "New State",
  awardAmount: "$50,000,000",
  status: "Active",
  strategicFocus: "...",
  description: "...",
  initiatives: [...],
  metrics: [...],
},
```

### Step 4: Add hospital data to `lib/data/hospital-data.ts`

Add relevant hospitals with `stateSlug: "new-state"`.

### Step 5: Seed to Sanity (optional but recommended)

```bash
# The seed scripts will pick up the new state data:
npx tsx scripts/seed-sanity-rht.ts
npx tsx scripts/seed-sanity-performance-index.ts
```

### Step 6: Verify the map

The US map in `DashboardIndexClient.tsx` uses `react-simple-maps` with GeoJSON — all 50 US states are already present in the TopoJSON. No map changes needed. The state becomes clickable automatically once its slug matches a known state name in the data.

---

## 18. Deployment

The application is a standard Next.js app. It deploys to Vercel (recommended) or any Node.js host.

### Vercel deployment

```bash
# Deploy from frontend/ directory
cd frontend
npx vercel --prod
```

**No `vercel.json` is required** — defaults handle everything.

Set all environment variables from §3 in the Vercel dashboard under **Settings → Environment Variables**. Mark `GEMINI_API_KEY`, `SANITY_API_TOKEN`, and `SUPABASE_SERVICE_ROLE_KEY` as server-only (not exposed to browser).

### Pre-deployment checklist

- [ ] All env vars set in Vercel (or host) environment
- [ ] `supabase/setup-rag.sql` has been run against the production Supabase project
- [ ] `sync-embeddings.ts` has been run to populate initial RAG content
- [ ] Sanity dataset is `production` (not a dev dataset)
- [ ] `npm run build` completes without errors locally
- [ ] No hardcoded `localhost` URLs in components

### Build notes

```bash
cd frontend
npm run build    # Must pass before deploying
npm run start    # Test production build locally
```

**Tailwind v4 note:** The beta PostCSS plugin (`@tailwindcss/postcss`) handles CSS compilation at build time. If build fails with CSS errors, ensure `postcss.config.js` contains:
```javascript
module.exports = { plugins: { '@tailwindcss/postcss': {} } }
```

### Database migrations

Currently there are no migration files — schema changes to Supabase are applied manually via the SQL editor. Before any production DB change:
1. Test in a staging Supabase project
2. Apply to production
3. Re-run `sync-embeddings.ts` if the `content_embeddings` schema changed

### Sanity Studio deployment

The Studio is embedded in the Next.js app at `/studio`. It deploys automatically with the Next.js app. CORS must be configured in Sanity:
- `sanity.io/manage` → your project → API → CORS Origins
- Add: `https://your-production-domain.com`

---

## 19. Known Issues & Roadmap

### Known issues

| Issue | Status | Notes |
|---|---|---|
| Static data not live | Active | `performance-index-data.ts` and `rht-program.ts` are hardcoded. Sanity schemas exist but data pipeline not wired. |
| `GEMINI_API_KEY` not in default `.env.local` | Active | Must be added manually or via shell export |
| TypeScript `any` types in Sanity queries | Active | GROQ results typed as `any` — `sanity typegen` not run |
| `react-simple-maps` SSR warning | Active | Map component requires client-side rendering guard |
| No RAG re-sync automation | Active | `sync-embeddings.ts` must be run manually after content updates |
| HNSW index on empty table | Fixed | If the table is empty when indexed, it works but warns — populate before indexing if possible |

### Roadmap (prioritized)

1. **Live data pipeline** — Replace static `lib/data/*.ts` files with Sanity GROQ queries pulled server-side. The `sanity-dashboard-queries.ts` file has the GROQ queries ready.

2. **Automated RAG sync** — Add a Sanity webhook → Vercel serverless function to trigger `sync-embeddings` logic on content publish.

3. **Search** — Wire up `/api/search` with Sanity's native search or Algolia. The route file exists but may need GROQ expansion.

4. **TypeScript strictness** — Run `npx sanity typegen generate` to produce typed GROQ results. Eliminate `any` in API routes and data fetchers.

5. **Email digest** — Complete `/api/digest` endpoint to generate a weekly summary from recent Sanity content and send to `subscriber` table emails.

6. **Auth + personalization** — Extend the account page with saved states, reading history, and personalized content recommendations via Supabase row-level security.

7. **Content depth** — Populate all 5 pillar hubs with policyAnalysis documents; add academy modules for Clinical and Equity pillars.

8. **Performance** — Enable Sanity CDN (`useCdn: true`) for production reads. Add `stale-while-revalidate` ISR to static-heavy pages.

---

*Last updated: 2026-03-10*
