# 03 — Content Creation: Sanity CMS

> **Verified against:** `frontend/sanity/sanity.config.ts`, `frontend/sanity/schemaTypes/*` (all 22 schema types), `frontend/app/api/webhooks/sanity/route.ts`, `frontend/lib/sanity-fetch.ts`.

Sanity is where **all editorial content** lives. This document is the working manual for editors and authors.

## Table of contents
1. [Accessing the Studio](#1-accessing-the-studio)
2. [Project facts](#2-project-facts)
3. [The content model — every document type](#3-the-content-model--every-document-type)
4. [Anatomy of an Analysis (the flagship type)](#4-anatomy-of-an-analysis-the-flagship-type)
5. [Portable Text & block content](#5-portable-text--block-content)
6. [Pillars, categories, and book-chapter linkage](#6-pillars-categories-and-book-chapter-linkage)
7. [Publishing workflow & what happens on publish](#7-publishing-workflow--what-happens-on-publish)
8. [The Sanity → RAG ingest webhook](#8-the-sanity--rag-ingest-webhook)
9. [Programmatic content creation (scripts & AI generation)](#9-programmatic-content-creation-scripts--ai-generation)
10. [Editorial standards & quality bar](#10-editorial-standards--quality-bar)
11. [Backups](#11-backups)

---

## 1. Accessing the Studio

The Studio is embedded in the Next.js app:

```
Production:  https://<app-domain>/studio
Local:       http://localhost:3000/studio
```

Route: `frontend/app/studio/[[...index]]`. Log in with your Sanity account (must be a member of project `fxz10xl7`). You can also run a standalone Studio from `frontend/sanity/` with `npx sanity dev`.

## 2. Project facts

| Item | Value |
|---|---|
| Project ID | `fxz10xl7` |
| Dataset | `production` |
| API version | `2023-10-01` (set via `NEXT_PUBLIC_SANITY_API_VERSION`) |
| Studio config | `frontend/sanity/sanity.config.ts` |
| Desk structure | `frontend/sanity/structure.ts` |
| Schema types | `frontend/sanity/schemaTypes/` (registered in `index.ts`) |
| Write token | `SANITY_API_TOKEN` (used by scripts + ingest) |
| Webhook secret | `SANITY_WEBHOOK_SECRET` |

## 3. The content model — every document type

Registered in `frontend/sanity/schemaTypes/index.ts`. Twenty-two types:

| Schema (`_type`) | Studio title | Purpose / where it surfaces |
|---|---|---|
| `policyAnalysis` | **Analysis** | The flagship research brief. Surfaces on all six pillar sections, `/articles/[slug]`, `/read/[slug]`, search, RAG |
| `post` | Post | Generic article/post |
| `author` | Author | Byline for posts |
| `instructor` | Instructor | Course faculty (`/academy/faculty`) |
| `course` | **Course** | Academy course shell (links `academyModule` refs + instructors) |
| `academyModule` | Academy Module | A module within a course |
| `caseStudy` | **Case Study** | `/academy/case-studies`, advisory |
| `webinar` | Webinar / Event | `/academy/webinars`, events |
| `report` | **Impact Report** | `/library`, advisory reports (PDF + summary) |
| `definition` | Glossary Definition | `/academy/glossary` |
| `ticker` | System Vitals (Ticker) | The scrolling metric strip (`TickerStrip`) |
| `dailyInsight` | Daily Insight (Dark Strip) | The dark insight strip on home |
| `analystNote` | Analyst Note | AI-analyst / editorial notes |
| `audio` | Audio | Narration / audio blocks |
| `hospital` | Hospital | Hospital profiles (`/dashboard`, directory) |
| `rhtState` | RHT State Profile | Rural Health Transformation state pages (`/states/[state]`) |
| `statePerformanceIndex` | State Performance Index | The 0–100 six-pillar composite per state |
| `investmentDeal` | Investment Deal | `/investment-tracker` (M&A, VC, PE, IPO…) |
| `subscriber` | Subscriber | Newsletter/subscriber records |
| `category` | Category | Taxonomy |
| `blockContent` | (object) | Reusable Portable Text body definition |

### Field-level cheat sheet (most-used types)

**`policyAnalysis` (Analysis)** — `title`, `slug`, `pillar` (one of the six), `category` (subcategory, see §6), `chapterRef` (book chapter "1"–"20"), `status`, plus body (Portable Text). See §4.

**`course`** — `title`, `slug`, `pillar`, `type` (Format Type, e.g. cohort/self-paced), `description` (short), `meta` (e.g. "8 Weeks • Online Cohort"), `price` (e.g. "$2,995"), `instructors` (refs → `instructor`), `modules` (refs → `academyModule`, **in order**), `overview` (full syllabus, Portable Text).

**`caseStudy`** — `title`, `slug`, `pillar`, `chapterRef`, `clientType` (e.g. "Rural Hospital"), `summary`, `metrics` (array of strings like "40% Reduction"), `body` (Portable Text), `mainImage`.

**`webinar`** — `title`, `slug`, `pillar`, `chapterRef`, `description`, `date` (datetime — drives sorting), `duration`, `registrationLink` (url), `image`.

**`report`** (Impact Report) — `title`, subtitle, `publishedAt`, `pillar`, `chapterRef`, `accessLevel`, `coverImage`, `file` (PDF), `summary` (executive summary), `topics` (array).

**`definition`** — `term`, `description`, `pillars` (array, multi-pillar allowed), `chapterRef`.

**`ticker`** — `label` (e.g. "ER Wait Time (Avg)"), `value` (e.g. "4.2 Hours"), `trend` (e.g. "+12% YoY"), `status` (good/warning/critical/neutral → green/orange/red/blue).

**`dailyInsight`** — `isActive` (the app shows the most recently updated active one), `category` (QUOTE/CHART/STAT/READ/TRIVIA), `content` (headline), `link` (optional).

**`investmentDeal`** — `title`, `dealType` (ma/vc/pe/ipo/partnership/debt), `status` (announced/pending/closed/terminated), `announcedDate`, `closedDate`, `dealValueUsd` (in **millions**), `acquirer`, `target`, `pillar`.

**`rhtState`** (Rural Health Transformation state) — `stateId` (slug like `new_hampshire`), `stateName`, `awardAmount` (e.g. "$195,000,000"), `status` (Active/Pending/At Risk), `strategicFocus`, `description`, `initiatives` (array of {title, description}), `metrics` (array of {label, value, status}).

**`statePerformanceIndex`** — `stateId`, `stateName`, `performanceScore` (0–100 composite), `status` (Leading/Improving/Stable/At Risk), and five metric objects (`policyMetrics`, `economicsMetrics`, `technologyMetrics`, `clinicalMetrics`, `equityMetrics`) each holding 0–100 sub-scores, plus a narrative.

## 4. Anatomy of an Analysis (the flagship type)

The **Analysis** (`policyAnalysis`) is the workhorse. A complete Analysis has:

1. **Title** — specific and dated where relevant.
2. **Slug** — kebab-case, stable (URLs and ingest depend on it; don't churn it).
3. **Pillar** — exactly one of: Policy, Economics, Technology, Clinical, Equity, Operations.
4. **Category** — a pillar-scoped subcategory (the dropdown lists all valid pairs; see §6).
5. **chapterRef** — optional book chapter number "1"–"20" tying the brief to *Transforming American Healthcare*.
6. **status** — editorial state.
7. **Body** — Portable Text: headings, paragraphs, callouts, stats, sources/citations.

> **Quality bar:** every factual/statistical claim in an Analysis body must be verifiable and sourced. The repo's content-correction history (`CONTENT_CORRECTIONS.md`, `ANALYSIS_CONTENT_STANDARDS.md`) records prior removals of fabricated stats. When in doubt, cut the claim or cite it. See §10.

## 5. Portable Text & block content

Bodies use Sanity **Portable Text** via the shared `blockContent` type (`frontend/sanity/schemaTypes/blockContent.ts`). It is rendered with `frontend/sanity/schemaTypes/PortableTextComponents.tsx` on the web side. Supported blocks typically include headings, rich text, lists, links, images, code (`@sanity/code-input`), and custom callouts/audio (`AudioPlayer.tsx`, `audio` type).

When content is fetched for the Academy, the Portable Text body is packed into the renderer; `frontend/components/AcademyContent.tsx` is the **gold-standard renderer** — match its block structure when authoring programmatically.

## 6. Pillars, categories, and book-chapter linkage

**Pillar → Category pairs** (the valid set, from the `policyAnalysis` schema):

- **Policy:** Regulation & Legislation · Public Health Mandates · Global & Comparative Policy · Policy Feasibility Studies
- **Economics:** Value-Based Care Models · Market & Finance · Labor & Workforce Strategy · Healthcare Investment Trends
- **Technology:** AI & Machine Learning · Digital Health & Telemedicine · Data Security & Governance · Tech-Enabled Workflow
- **Clinical:** Hospital-at-Home · Precision Medicine · Virtual Care Models · Population Health
- **Equity:** SDOH Integration · Algorithmic Bias · Access Disparity · Community Engagement
- **Operations:** (Revenue Cycle, Supply Chain, Workforce, Compliance, Payer Network — surfaced under `/operations/*`)

**Book chapter (`chapterRef`)** links content to the companion book. Many types carry it (`policyAnalysis`, `caseStudy`, `webinar`, `report`, `definition`). It powers "From the Book" cross-links (`FromTheBook.tsx`).

## 7. Publishing workflow & what happens on publish

1. **Draft** in Studio → fill all required fields → **Publish**.
2. The published document becomes visible to the live site via GROQ queries (`frontend/lib/sanity-fetch.ts`). Next.js may serve cached/ISR data — there's a daily revalidate cron (`vercel.json` → `/api/cron/revalidate`); for an instant refresh, trigger a revalidation or redeploy.
3. **If** the type is in the ingest filter (see §8), publishing fires the GROQ webhook → backend ingest → RAG index updates. This is how new Analyses become answerable by the AI Analyst.

## 8. The Sanity → RAG ingest webhook

Defined by `frontend/app/api/webhooks/sanity/route.ts`. It receives Sanity's GROQ webhook and forwards it to the backend `POST /api/ingest/webhook` with `Authorization: Bearer <INGEST_SECRET>` and `X-Sanity-Signature`.

**Configure the webhook in Sanity (manage.sanity.io → API → Webhooks):**

| Setting | Value |
|---|---|
| URL | `https://<app-domain>/api/webhooks/sanity` |
| Secret | same value as `INGEST_SECRET` (and `SANITY_WEBHOOK_SECRET`) |
| Trigger | on create/update/delete |
| Filter (`_type in [...]`) | `policyAnalysis`, `post`, `academyModule`, `caseStudy`, `definition`, `analystNote`, `webinar`, `report` |

> Types **not** in this filter (e.g. `ticker`, `dailyInsight`, `investmentDeal`, `statePerformanceIndex`) are **display-only** — they render on pages but are not ingested into RAG. That's intentional.

If RAG falls behind Sanity, re-run a full ingest from the backend (see [Doc 06 §6](./06-ai-analyst-rag.md)).

## 9. Programmatic content creation (scripts & AI generation)

Beyond the Studio UI, content is created and maintained at scale by scripts in `frontend/scripts/` and generation prompts in `frontend/sanity/`.

**Generation prompts** (`frontend/sanity/`): `Prompt_template_Claude.txt`, `Prompt_template_Claude_v2.txt`, `Prompt_Template_Final.txt`, `Prompt_template_Academy_v1.txt`, `ultimate_prompt*.txt`, `master_instructions_block.txt`. These encode the editorial voice and structure for AI-assisted drafting. `generate_sanity_content.py` drives generation; JSON outputs land in `frontend/sanity/content/*.json` and are imported with the bulk-import scripts.

**Content seed/import scripts** (run from `frontend/scripts/`):
- `bulk_import.js`, `import.js`, `import_one.js` — push JSON documents into Sanity.
- `import-glossary.js`, `seed-webinars.js`, `seed-reports.js`, `seed-caseStudies.js`, `seed-ticker.js` — type-specific seeds.
- `seed-sanity-performance-index.ts`, `seed-sanity-rht.ts` — state index + RHT profiles.

**Content maintenance scripts** (Analysis quality program): `audit-analysis-length.mjs`, `clean-policy-analysis.mjs`, `neutralize-unverifiable.mjs`, `purge-htr-claims.mjs`, `scan-htr-claims.mjs`, the `expand-batch-*.mjs` family, and the `triage-*` scripts. Full reference in [Doc 07](./07-tooling-scripts.md).

> ⚠️ All content scripts use `SANITY_API_TOKEN` and write to the **production** dataset. Always dry-run/inspect target IDs first. Several scripts (e.g. `triage-delete.mjs`, `clean-garbage.mjs`) delete documents.

## 10. Editorial standards & quality bar

The repo ships content standards you must follow when authoring Analyses:

- `ANALYSIS_CONTENT_STANDARDS.md` — structure + sourcing rules for Analyses.
- `CONTENT_CORRECTIONS.md` / `CONTENT_PROMPT.md` / `CONTENT_PROMPT_EDITORIAL.md` — the editorial voice and the log of corrections.
- **Hard rules** distilled from project history:
  - Every statistic must be web-verifiable and sourced; unverifiable claims are removed or neutralized.
  - Do not fabricate "HTR" proprietary numbers — those were purged.
  - Keep slugs stable once published.
  - Match the gold-standard renderer's block structure.

## 11. Backups

Sanity exports are kept in two places at repo root/Studio:
- `sanity-backups/` (repo root) — dataset export snapshots.
- `frontend/sanity/my-backup.tar.gz` — a Studio tarball.

To take a fresh export:

```bash
cd frontend/sanity
npx sanity dataset export production ../../sanity-backups/production-$(date +%Y%m%d).tar.gz
```

To restore (⚠️ destructive to the target dataset):

```bash
npx sanity dataset import <backup>.tar.gz production --replace
```

Continue to → [04 — Content & Data: Supabase](./04-content-supabase.md)
