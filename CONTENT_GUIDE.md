# Health Transformation Review — Content Guide

For content creators, editors, coaches, and analysts who publish through Sanity CMS.

---

## Accessing the Studio

The Sanity Studio is embedded directly in the HTR platform.

- **URL**: `https://your-domain.com/studio`
- **Local dev**: `http://localhost:3000/studio`

You need a Sanity account with access to the `fxz10xl7` project to log in.

---

## The Five Pillars

All content must be assigned to one of five pillars. These organize navigation, search, and AI context.

| Pillar | Value Used in Fields |
|--------|---------------------|
| Policy | `Policy` |
| Economics | `Economics` |
| Technology | `Technology` |
| Clinical | `Clinical` |
| Equity | `Equity` |

---

## Document Types Reference

The Studio manages 21 document types. Below is the complete reference for each.

---

### 1. Policy Analysis (`policyAnalysis`)

The primary content type. Full analytical articles published across all five pillars.

**Required fields:**
- `title` — Article headline
- `pillar` — One of the five pillars (radio selection)
- `category` — One of 20 subcategories (see below)

**Optional fields:**
- `slug` — Auto-generated from title. Determines the URL: `/policy/[slug]`
- `status` — `Active`, `Proposed`, or `In Committee`
- `impactLevel` — `Critical`, `High`, or `Medium`
- `publishedAt` — Publication datetime
- `summary` — 2–3 sentence executive abstract. Shown on article cards and hub pages.
- `body` — Full article content (Portable Text / blockContent)

**The 20 subcategories:**

| Pillar | Subcategory |
|--------|-------------|
| Policy | Regulation & Legislation |
| Policy | Public Health Mandates |
| Policy | Global & Comparative Policy |
| Policy | Policy Feasibility Studies |
| Economics | Value-Based Care Models |
| Economics | Market & Finance |
| Economics | Labor & Workforce Strategy |
| Economics | Healthcare Investment Trends |
| Technology | AI & Machine Learning |
| Technology | Digital Health & Telemedicine |
| Technology | Data Security & Governance |
| Technology | Tech-Enabled Workflow |
| Clinical | Hospital-at-Home |
| Clinical | Precision Medicine |
| Clinical | Virtual Care Models |
| Clinical | Population Health |
| Equity | SDOH Integration |
| Equity | Algorithmic Bias |
| Equity | Access Disparity |
| Equity | Community Engagement |

**Studio preview** shows: pillar emoji + pillar name + status + impact level.

---

### 2. Post (`post`)

Standard blog-style article. Simpler than policyAnalysis — no pillar/category system.

**Fields:**
- `title` — Post headline
- `slug` — URL: `/articles/[slug]`
- `author` — Reference to an `author` document
- `publishedAt` — Publication datetime
- `body` — Full content (blockContent)

---

### 3. Academy Module (`academyModule`)

A single learning unit within a course. This is the main Academy content type.

**Required fields:**
- `title` — Module title
- `slug` — URL: `/academy/modules/[slug]`
- `courseTitle` — Name of the parent course (text, not a reference)
- `moduleNumber` — Position in course sequence (1, 2, 3...)
- `summary` — 3–4 sentence abstract

**Optional fields:**
- `totalModules` — Total modules in parent course (used for progress display "2 of 5")
- `prevModuleSlug` — Slug of the preceding module (leave blank for Module 1)
- `nextModuleSlug` — Slug of the following module (leave blank for last module)
- `pillar` — Primary pillar (Policy/Economics/Technology/Clinical/Equity/All)
- `level` — `Foundational`, `Intermediate`, or `Advanced`
- `estimatedReadTime` — Minutes to complete
- `publishedAt` — Publication datetime
- `learningObjectives` — Array of strings (3–5 objectives, "After this module you will be able to...")
- `body` — Full module content (blockContent)

**Important**: The `prevModuleSlug` and `nextModuleSlug` fields enable navigation between modules. Always set both directions when creating a sequence. Leave blank for the first and last modules respectively.

---

### 4. Course (`course`)

A structured collection of academy modules.

**Use this to**: Define the course's overall metadata. Individual modules reference the course by `courseTitle` string.

---

### 5. Case Study (`caseStudy`)

Real-world implementation examples. Displayed in the Academy case studies section.

**Fields** are similar to `policyAnalysis` — title, slug, pillar, summary, body.

---

### 6. Webinar / Event (`webinar`)

Live or upcoming webinar events.

**Required fields:**
- `title` — Event title
- `slug` — URL: `/academy/webinars/[slug]`
- `pillar` — One of the five pillars
- `date` — Date and time (critical for sorting upcoming vs. past)

**Optional fields:**
- `description` — Short summary (shown on listing page)
- `duration` — e.g., "60 Min"
- `registrationLink` — External URL for registration
- `image` — Event banner image (supports hotspot cropping)

---

### 7. Report (`report`)

Advisory reports and research documents.

**Fields:** title, slug, pillar, abstract, body content.

---

### 8. Analyst Note / The Signal (`analystNote`)

Short editorial notes that appear in the left sidebar. These are "The Signal" — the analyst's current take.

**Required fields:**
- `headline` — Topic/headline (max 50 characters)

**Optional fields:**
- `isActive` — Toggle visibility (unchecked = hidden from site)
- `content` — The insight text (Portable Text with bold/italic only — keep it punchy)
- `author` — Analyst name (default: "Chief Editor")

**Guidance**: Keep these short and impactful. Bold key phrases. One or two tight paragraphs maximum.

---

### 9. Glossary Definition (`definition`)

Terms and acronyms for the Academy glossary. Searchable and indexed in the AI knowledge base.

**Required fields:**
- `term` — The term or acronym (e.g., "APM", "SDOH")
- `description` — Plain text definition

**Optional fields:**
- `pillars` — Tag with associated pillars (multiple allowed, tag layout)

---

### 10. System Vitals Ticker (`ticker`)

Metrics that scroll across the platform ticker strip (not headlines — these are data points).

**Required fields:**
- `label` — Metric name (e.g., "ER Wait Time (Avg)")
- `value` — Current value (e.g., "4.2 Hours")

**Optional fields:**
- `trend` — Context (e.g., "+12% YoY", "Critical")
- `status` — Color coding: `good` (green), `warning` (orange), `critical` (red), `neutral` (blue)

Note: The live ticker in the header pulls from RSS feeds (not this collection). This collection feeds the AppShell ticker strip below the header.

---

### 11. Daily Insight (`dailyInsight`)

Short daily intelligence notes. Separate from analyst notes.

---

### 12. RHT State Profile (`rhtState`)

State-level data for the RHT (Rural Health Transformation) program dashboard.

**Required fields:**
- `stateId` — Lowercase slug, e.g., `new_hampshire`
- `stateName` — Full state name

**Optional fields:**
- `awardAmount` — e.g., "$195,000,000"
- `status` — `Active`, `Pending`, or `At Risk`
- `strategicFocus` — One-line strategic focus statement
- `description` — 4-sentence program description (textarea)
- `initiatives` — Array of strategic initiatives (each with `title` + `description`)
- `metrics` — Array of key metrics (each with `label`, `status` [Pending/In Progress/Achieved], `target`)

---

### 13. State Performance Index (`statePerformanceIndex`)

Performance scoring data for states. Used in dashboard charts.

---

### 14. Hospital (`hospital`)

Hospital-specific data and profiles. Used in `/dashboard/[state]/hospitals`.

---

### 15. Subscriber (`subscriber`)

Email list entries. Created automatically by `/api/subscribe`.

**Fields:**
- `email` — Subscriber email
- `tier` — `free` or paid tier
- `isActive` — Whether they receive digests
- `digestEnabled` — Whether to include in weekly digest sends
- `subscribedAt` — ISO datetime

Do not create or edit these manually unless necessary (e.g., re-activating someone who unsubscribed).

---

### 16. Author (`author`)

Author profiles referenced by `post` documents.

**Fields:** name, bio, image.

---

### 17. Instructor (`instructor`)

Faculty profiles for the Academy.

**Fields:** name, bio, credentials, image.

---

### 18. Audio (`audio`)

Audio content for article-level listen features.

---

### 19. Category (`category`)

Content categories (legacy). Pillar + category fields in `policyAnalysis` are the active taxonomy system.

---

### 20. blockContent (base type)

Not a document type — this is the shared rich text definition used in all body fields. See the "Writing Body Content" section below.

---

## Writing Body Content (Portable Text / blockContent)

All `body` fields use Sanity's Portable Text with these block types available:

**Text styles:**
- Normal
- H2, H3, H4 (use for section structure)
- Blockquote (for pull quotes or key takeaways)

**Lists:**
- Bullet list
- Numbered list

**Inline marks:**
- Bold, italic, underline, code (inline)
- Links (external URL or internal document reference)

**Custom blocks** (inserted via the toolbar "+" button):
- **Image** — with alt text and caption
- **Audio player** — embed audio content
- **Video** — embed video content
- **Code block** — for technical content
- **Call-out / highlighted note**

**For AI indexing:** The backend extracts `pt::text(body)` from body fields when indexing into the RAG system. Structured headings and clear prose improve AI retrieval quality.

---

## Workflow: Publishing a New Policy Analysis

1. In the Studio, go to **Policy Analysis** in the left sidebar
2. Click **+ New document**
3. Fill required fields: `title`, `pillar`, `category`
4. Write the `summary` (2–3 sentences) — this appears on article cards
5. Write the `body` (full article)
6. Set `impactLevel` and `status` as appropriate
7. Set `publishedAt` to now (or schedule for future)
8. Click **Publish**
9. The article is immediately live at `/policy/[slug]`
10. To add it to the AI knowledge base, trigger a re-index: `POST /api/ingest`

---

## Workflow: Publishing an Academy Module

1. Go to **Academy Module** in the Studio
2. Create a new document
3. Set `title`, `courseTitle`, `moduleNumber`
4. Set `pillar` and `level`
5. Write `learningObjectives` (3–5 items)
6. Write `summary` (3–4 sentences)
7. Set `estimatedReadTime`
8. Connect navigation: set `prevModuleSlug` (slug of the previous module) and `nextModuleSlug` (slug of the next module)
9. Write `body` content
10. Publish

**Navigation tip**: When creating a series, create all modules first, then go back and set the prev/next slugs. The slug is auto-generated from the title — check it in the slug field before using it as a reference.

---

## Workflow: Creating a Webinar

1. Go to **Webinar / Event**
2. Fill title, pillar, and **date** (required for sorting)
3. Add description, duration, registration link, and banner image
4. Publish — appears at `/academy/webinars`
5. Past events (date in the past) are shown as "On-Demand" or "Past"
6. Upcoming events appear at the top sorted by date

---

## Workflow: Publishing a Daily Insight or Analyst Note

### Analyst Note (The Signal sidebar)

1. Go to **The Signal (Sidebar Note)**
2. Enter a short `headline` (max 50 characters — be punchy)
3. Write the `content` — keep it to 2–3 tight sentences. Use bold for key phrases.
4. Set `isActive` to true
5. Publish — appears immediately in the sidebar on all pages

Only one or two Analyst Notes should be active at a time. Deactivate old ones by unchecking `isActive`.

---

## Workflow: Managing the Glossary

1. Go to **Glossary Definition**
2. Create a new document with `term` and `description`
3. Tag with relevant `pillars`
4. Publish — appears at `/academy/glossary`
5. Trigger RAG re-index to make the definition available to the AI Analyst

Glossary terms are searched across the platform via the search bar.

---

## Adding RHT State Profiles

1. Go to **RHT State Profile**
2. Set `stateId` (slug format, e.g., `new_hampshire`)
3. Set `stateName`
4. Fill `awardAmount`, `status`, `strategicFocus`, `description`
5. Add `initiatives` — each needs a title and description
6. Add `metrics` — each needs a label, status (Pending/In Progress/Achieved), and target value
7. Publish

The state profile appears at `/states/[state-slug]` and feeds the national dashboard.

---

## Sending the Weekly Digest

The digest email is sent manually (or via a scheduled cron job). It pulls the 5 most recent published `policyAnalysis` documents.

To trigger manually:

```bash
curl -X POST https://your-domain.com/api/digest \
  -H "Authorization: Bearer YOUR_DIGEST_SECRET"
```

The digest goes to all `subscriber` documents with `isActive: true` and `digestEnabled: true`.

---

## AI Knowledge Base — Content Ingestion

The following Sanity document types are automatically indexed into the AI knowledge base when `/api/ingest` is triggered:

| Type | Fields Indexed |
|------|---------------|
| `policyAnalysis` | title, pillar, summary, body text |
| `post` | title, body text |
| `academyModule` | title, pillar, summary, learningObjectives, body text |
| `caseStudy` | title, pillar, summary, body text |
| `definition` | term, description, pillars |
| `analystNote` | title, pillar, body text |
| `webinar` | title, pillar, description |
| `report` | title, pillar, abstract |

**Important:**
- Only documents with a defined slug are included (except `definition` and `analystNote`)
- Maximum 8,000 characters per document in the index
- Documents shorter than 20 characters are skipped
- After publishing significant new content, trigger a re-index so the AI can reference it

---

## Content Quality Guidelines

### For Policy Analysis Articles

- Keep `summary` to 2–3 sentences. This is what appears on article cards — make it compelling.
- Use H2 headings to organize the body into clear sections
- Cite specific data, policy names, and report names — the AI will reference these by name in answers
- `impactLevel: Critical` should be reserved for content with immediate, high-stakes implications
- Always set the `pillar` and `category` — they determine which hub page the article appears on

### For Academy Modules

- Learning objectives should be action-oriented ("Analyze X", "Evaluate Y", "Apply Z")
- Write summaries in the third person ("This module explores...")
- Connect prev/next module slugs carefully — broken navigation degrades the learner experience
- The AI knowledge base indexes `learningObjectives` — write them in full sentences

### For Analyst Notes (The Signal)

- Maximum two active at a time
- Write for a senior healthcare executive audience
- Lead with the data or the implication, not the background
- Bold 1–2 key phrases per note

### For Glossary Definitions

- Define in plain language first, then technical language
- Include the full expansion of any acronym in the first sentence
- Keep descriptions under 150 words
- Tag all relevant pillars — this improves search and AI retrieval
