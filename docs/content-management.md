# Content Management Guide

**Vermont Health Platform (HTR) — v4.2.0**
**Audience**: Editors, content administrators, analysts
**Last Updated**: March 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Accessing Sanity Studio](#accessing-sanity-studio)
3. [Content Types Reference](#content-types-reference)
4. [Creating & Editing Content](#creating--editing-content)
5. [The Rich Text Editor (blockContent)](#the-rich-text-editor-blockcontent)
6. [Content Workflow & Publishing](#content-workflow--publishing)
7. [Pillar Taxonomy](#pillar-taxonomy)
8. [AI-Powered Content Generation](#ai-powered-content-generation)
9. [Webhook & Sync Pipeline](#webhook--sync-pipeline)
10. [Data Content (Hospitals, States)](#data-content-hospitals-states)
11. [Academy Content Management](#academy-content-management)
12. [Daily Widgets & Live Content](#daily-widgets--live-content)
13. [Slug Conventions](#slug-conventions)
14. [Troubleshooting](#troubleshooting)

---

## Overview

All editorial content on the Vermont Health Platform is managed through **Sanity CMS** — a headless content management system with a real-time studio interface. When you publish or update content in Sanity, a webhook automatically triggers the platform's AI indexing pipeline, ensuring that the AI Analyst chatbot always reflects your latest content.

**Sanity Project**: `fxz10xl7`
**Dataset**: `production`
**Studio URL**: `https://your-domain.com/studio` (local: `http://localhost:3000/studio`)

---

## Accessing Sanity Studio

### Production
Navigate to `https://your-domain.com/studio` and log in with your Sanity account. You must be added as a member of the `fxz10xl7` project with at least Editor role.

### Local Development
The studio is embedded in the Next.js app. With the frontend running:

```
http://localhost:3000/studio
```

No separate studio server is required — it runs as a Next.js route.

### Studio Structure

The studio organizes content into five sections:

| Section | Content Types |
|---|---|
| **Editorial** | Posts, Policy Analyses, Case Studies, Analyst Notes, Reports |
| **Academy** | Modules, Courses, Webinars, Instructors |
| **Data & Intelligence** | Daily Insights, Ticker, Glossary, Hospitals, State Profiles |
| **People & Taxonomy** | Authors, Categories, Subscribers |
| **Media** | Audio |

---

## Content Types Reference

### Editorial Content

#### Policy Analysis (`policyAnalysis`)
The primary content type. In-depth analysis articles organized by the five-pillar framework.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Article headline |
| `slug` | slug | Yes | URL path (auto-generated from title) |
| `pillar` | select | Yes | One of the 5 pillars (see [Pillar Taxonomy](#pillar-taxonomy)) |
| `category` | select | Yes | Subcategory within the pillar (20 options) |
| `status` | select | No | Active / Proposed / In Committee |
| `impactLevel` | select | No | Critical / High / Medium |
| `publishedAt` | datetime | No | Defaults to creation time |
| `summary` | text | No | Short excerpt shown in article cards |
| `body` | blockContent | No | Full rich text article body |

**Category options by pillar:**

- **Policy**: Regulation & Legislation, Public Health Mandates, Federal Health Reform, State Innovation, Global & Comparative Policy
- **Economics**: Value-Based Care Models, Market Dynamics, Workforce & Labor, Insurance & Coverage, Investment & Funding
- **Technology**: AI & Machine Learning, Digital Health & Telemedicine, Interoperability & Data, Security & Privacy, Workflow Automation
- **Clinical**: Hospital-at-Home, Precision Medicine, Virtual Care Models, Care Coordination, Population Health
- **Equity**: SDOH Integration, Algorithmic Bias, Access Disparity, Rural Health, Community Engagement

---

#### Post (`post`)
General blog articles — less structured than Policy Analysis. Use for news, editorials, and platform updates.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | |
| `slug` | slug | Yes | |
| `author` | reference | No | References an `author` document |
| `publishedAt` | datetime | No | |
| `body` | blockContent | No | |

---

#### Case Study (`caseStudy`)
Real-world implementation stories and outcomes.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | |
| `slug` | slug | Yes | |
| `pillar` | select | No | Pillar this case study belongs to |
| `clientType` | string | No | e.g., "Rural Hospital System", "State Medicaid Agency" |
| `summary` | text | No | Short excerpt for cards |
| `metrics` | array | No | Key outcome metrics (objects with label/value) |
| `body` | blockContent | No | Full case study narrative |
| `mainImage` | image | No | Hero image |

---

#### Report (`report`)
PDF-based impact reports and white papers.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | |
| `subtitle` | string | No | |
| `publishedAt` | date | No | |
| `accessLevel` | select | No | Public / Client Only / Enterprise |
| `coverImage` | image | No | Report cover thumbnail |
| `file` | file | No | PDF upload |
| `summary` | text | No | |
| `topics` | array | No | String tags |

---

#### Analyst Note (`analystNote`)
Short editorial notes displayed in "The Signal" sidebar widget on the homepage.

| Field | Type | Required | Notes |
|---|---|---|---|
| `isActive` | boolean | Yes | Only active notes are shown |
| `headline` | string | Yes | Max 50 characters |
| `content` | portableText | No | Short rich text (bold/emphasis only) |
| `author` | string | No | Byline |

**Usage**: Only one analyst note is shown at a time — the most recently updated one with `isActive: true`. Toggle `isActive` off to suppress a note without deleting it.

---

### Academy Content

#### Academy Module (`academyModule`)
Individual lesson units within a course. Modules are linked in sequence.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Module title |
| `slug` | slug | Yes | URL path |
| `courseTitle` | string | No | Parent course name (for breadcrumbs) |
| `moduleNumber` | number | No | Position within course (e.g., 3) |
| `totalModules` | number | No | Total modules in course (e.g., 8) |
| `prevModuleSlug` | string | No | Slug of previous module for navigation |
| `nextModuleSlug` | string | No | Slug of next module for navigation |
| `pillar` | select | No | Pillar alignment |
| `level` | select | No | Foundational / Intermediate / Advanced |
| `estimatedReadTime` | number | No | Minutes to read |
| `publishedAt` | datetime | No | |
| `learningObjectives` | array | No | String list of outcomes |
| `summary` | text | No | |
| `body` | blockContent | No | Full lesson content |

**Navigation tip**: Set `prevModuleSlug` and `nextModuleSlug` to enable the Previous/Next buttons at the bottom of each module page. These are plain slugs (not references), so type them carefully.

---

#### Course (`course`)
Container that groups modules into a curriculum.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | |
| `slug` | slug | Yes | |
| `pillar` | select | No | Primary pillar |
| `type` | select | No | CERTIFICATION / COURSE / WEBINAR / MASTERCLASS |
| `description` | text | No | Short description for course cards |
| `meta` | string | No | Metadata tag (e.g., "6 modules · 4 hours") |
| `price` | number | No | Leave empty for free courses |
| `instructors` | array | No | References to `instructor` documents |
| `modules` | array | No | References to `academyModule` documents (ordered) |
| `overview` | blockContent | No | Full course overview content |

---

#### Webinar (`webinar`)
Live and recorded events.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | |
| `slug` | slug | Yes | |
| `pillar` | select | Yes | |
| `description` | text | No | |
| `date` | datetime | Yes | Event date/time |
| `duration` | string | No | e.g., "90 minutes" |
| `registrationLink` | url | No | External registration URL |
| `image` | image | No | |

---

#### Instructor (`instructor`)
Academy faculty profiles.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | |
| `role` | string | No | Title and affiliation |
| `bio` | text | No | Short biography |
| `image` | image | No | Headshot |
| `tags` | array | No | Specialty tags (e.g., "AI in Healthcare", "Medicaid Policy") |

---

### Reference Content

#### Definition (`definition`)
Glossary entries accessible at `/glossary`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `term` | string | Yes | The term being defined |
| `description` | text | Yes | Plain text definition |
| `pillars` | array | No | Tags: Policy, Economics, Technology, Clinical, Equity |

---

#### Author (`author`)
Article bylines.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | |
| `slug` | slug | Yes | |
| `image` | image | No | Author headshot (with hotspot cropping) |
| `bio` | blockContent | No | Short bio |

---

## Creating & Editing Content

### Creating a New Policy Analysis Article

1. Open Sanity Studio → **Editorial** → **Policy Analysis**
2. Click **+ Create**
3. Fill in required fields:
   - **Title**: Descriptive headline (e.g., "CMS Releases Final Rule on Prior Authorization")
   - **Slug**: Click **Generate** to auto-create from title, or type a custom slug
   - **Pillar**: Select the most relevant pillar
   - **Category**: Select the most specific subcategory
4. Optional but recommended:
   - **Summary**: 1–2 sentences for article cards and search results
   - **Impact Level**: Helps users quickly assess significance
   - **Published At**: Set to control the order content appears in feeds
5. Write the article body in the **Body** field (see [Rich Text Editor](#the-rich-text-editor-blockcontent))
6. Click **Publish**

The webhook fires automatically within seconds of publishing. The AI index rebuild begins in the background (takes 1–5 minutes depending on index size).

---

### Editing Existing Content

1. Navigate to the content type in the studio sidebar
2. Use the search box (top of the list) to find the document by title
3. Make your changes
4. Click **Publish** to push changes live

Sanity auto-saves drafts as you type. The published version is not updated until you explicitly click **Publish**.

---

### Unpublishing Content

To hide content without deleting it:
1. Open the document
2. Click the **▾** arrow next to the Publish button
3. Select **Unpublish**

The content remains in Sanity as a draft and can be re-published later.

---

## The Rich Text Editor (blockContent)

The `body` field uses Sanity's Portable Text editor with a set of custom block types designed for HTR's educational content format.

### Text Formatting

| Option | Use for |
|---|---|
| **Normal** | Standard paragraph text |
| **H2** | Section headings |
| **H3** | Sub-section headings |
| **H4** | Minor sub-headings |
| **Quote** | Pull quotes and blockquotes |
| **Highlight** | Key definition or callout sentences |
| **Callout** | Actionable tips or warnings |
| **Bullet list** | Unordered items |
| **Numbered list** | Sequential steps |

Inline marks: **Bold**, _Italic_, Underline, ~~Strikethrough~~, and hyperlinks.

---

### Custom Educational Blocks

Click the **+** icon in the body editor to insert any of these blocks:

#### Stat Grid
Display 2–4 statistics side-by-side.

```
Each stat has:
- value: "47%"
- label: "of rural hospitals"
- context: "reported financial losses in 2025"
- trend: "up" | "down" | "flat"
```

#### Real-World Example
Highlight an organization's outcome.

```
- Organization: "Geisinger Health System"
- Outcome: "Reduced readmissions by 23%"
- Context: "After deploying AI-driven care transitions"
- Source: "NEJM Catalyst, 2025"
```

#### Analogy Block
Explain complex healthcare concepts through analogy.

```
- Concept: "Value-Based Care"
- Analogy: "Like a gym membership where the gym..."
- Bridge: "In healthcare, this means..."
```

#### Comparison Table
Old vs. New comparison with multiple rows.

```
Rows: [
  { old: "Fee-for-service", new: "Capitated payment" },
  { old: "Volume incentives", new: "Outcome incentives" }
]
```

#### Step-by-Step Process
Numbered process explanation.

```
Steps: [
  { number: 1, description: "Submit prior authorization request..." },
  { number: 2, description: "Payer reviews within 72 hours..." }
]
```

#### Knowledge Check
Interactive question for Academy modules.

```
- Question: "What does AHEAD stand for?"
- Hint: "It's Vermont's model name..."
- Answer: "All-Payer Health Equity Assurance Demonstration"
```

#### Key Takeaways
Summary bullets at the end of an article.

```
Points: [
  "CMS now requires 72-hour response for urgent PA requests",
  "Electronic PA systems must be implemented by 2027"
]
```

#### Common Misconception
Myth vs. Reality block.

```
- Myth: "AI will replace physicians"
- Reality: "AI augments clinical decision-making..."
```

#### Image
Upload or reference an image with caption and alt text.

#### Code Block
For displaying JSON, configuration files, or code samples. Language: JSON.

#### Video
Embed a video by URL with caption.

#### Audio
Embed audio content with title, URL, and summary.

---

## Content Workflow & Publishing

### Draft vs. Published

Every Sanity document has two states:
- **Draft**: Visible only in the studio. Not live on the platform.
- **Published**: Live on the platform and indexed by the AI.

### Recommended Workflow

```
Write (Draft) → Internal Review → Edit → Publish → Verify on Platform
```

### Content Review Checklist

Before publishing a Policy Analysis article:

- [ ] Pillar is correctly assigned
- [ ] Category is the most specific match
- [ ] Summary is written (used in article cards)
- [ ] Impact Level is set for significant articles
- [ ] Slug is clean (lowercase, hyphens, no special characters)
- [ ] Body uses appropriate headings (H2 for sections, H3 for subsections)
- [ ] Statistics use Stat Grid blocks, not raw text
- [ ] Published At date is correct

---

## Pillar Taxonomy

All editorial content (articles, modules, case studies, webinars) is tagged with exactly **one** primary pillar. This drives filtering throughout the platform.

| Pillar | Color | Focus Areas |
|---|---|---|
| **Policy** | Sky Blue | Federal/state legislation, regulation, mandates, feasibility |
| **Economics** | Emerald | Value-based care, markets, labor, investment |
| **Technology** | Indigo | AI/ML, digital health, security, workflow automation |
| **Clinical** | Red/Rose | Hospital-at-home, precision medicine, virtual care |
| **Equity** | Amber | SDOH, algorithmic bias, access disparity |

### Choosing the Right Pillar

When an article spans multiple pillars, choose the **primary lens**:

- An article about AI bias in clinical algorithms → **Equity** (the focus is on bias/disparity, not the technology itself)
- An article about EHR adoption rates → **Technology**
- An article about the financial impact of telehealth → **Economics**
- An article about hospital-at-home regulatory approvals → **Policy** or **Clinical** (choose which angle is primary)

---

## AI-Powered Content Generation

The platform includes a Python script for generating draft articles using Google Gemini 2.0 Flash.

### Setup

```bash
# Requires GOOGLE_API_KEY in your .env file
cd frontend/sanity
pip install google-generativeai python-dotenv
```

### Usage

```bash
python generate_sanity_content.py
```

The script prompts for:
1. **Topic**: The article topic (e.g., "Vermont's AHEAD Model: 2026 Progress Report")
2. **Data points**: Key statistics or facts to include

It generates a Sanity-compatible JSON file in `frontend/sanity/content/{slug}.json`.

### Importing Generated Content

Generated JSON files are not automatically imported. To import:

1. Review the generated JSON in `frontend/sanity/content/`
2. Use the Sanity CLI or copy content into the studio manually
3. Review and edit before publishing — AI output requires human review

### Prompt Templates

Templates are stored in `frontend/sanity/` as `Prompt_template_*.txt`. Edit these to change the structure or tone of generated articles.

---

## Webhook & Sync Pipeline

When content is published in Sanity, the platform automatically updates its AI search index through a webhook pipeline.

### Pipeline Flow

```
Sanity Publish
     │
     ▼
POST /api/webhooks/sanity   (Next.js route)
     │
     ├─ Verifies HMAC-SHA256 signature
     │    Header: t=<timestamp>,v1=<hex>
     │    Secret: SANITY_WEBHOOK_SECRET
     │
     ▼
POST {PYTHON_BACKEND_URL}/api/ingest   (FastAPI backend)
     │
     ├─ Enqueues rebuild job (returns 202)
     │
     ▼
build_index()   (async background task)
     │
     ├─ Fetches all published content from Sanity
     ├─ Generates embeddings (OpenAI)
     ├─ Writes vectors to Supabase pgvector
     └─ Updates BM25 keyword index
```

### Webhook Configuration in Sanity

To configure or verify the webhook in Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project
2. Navigate to **API** → **Webhooks**
3. Verify the webhook points to `https://your-domain.com/api/webhooks/sanity`
4. Trigger: `create`, `update`, `delete` on all document types
5. Secret must match `SANITY_WEBHOOK_SECRET` in your environment

### Checking Ingest Status

Poll the ingest status endpoint to verify the rebuild completed:

```
GET {PYTHON_BACKEND_URL}/api/ingest/status
```

Response:
```json
{
  "status": "completed",
  "queued_at": "2026-03-27T14:32:00Z",
  "started_at": "2026-03-27T14:32:05Z",
  "completed_at": "2026-03-27T14:34:22Z"
}
```

Status values: `queued` → `running` → `completed` | `failed`

### Ingest Timing

- **Webhook fires**: Within 1–2 seconds of publishing
- **Index rebuild**: 1–5 minutes depending on total content volume
- **AI reflects new content**: After rebuild completes

If the AI Analyst does not reflect newly published content after 10 minutes, check the ingest status endpoint and the Railway backend logs.

---

## Data Content (Hospitals, States)

### Hospital Data (`hospital`)

Used by the 50-State Dashboard and HTR Simulator for hospital-level metrics.

| Field | Description |
|---|---|
| `name` | Hospital name |
| `stateSlug` | Two-letter state code (lowercase, e.g., `vt`) |
| `city` | City name |
| `type` | Critical Access / Rural PPS / Urban |
| `totalDischarges` | Annual discharge volume |
| `avgLengthOfStay` | Average LOS in days |
| `qualityScore` | 0–100 composite quality score |
| `beds` | Licensed bed count |
| `revenue` | Annual revenue (USD) |
| `margin` | Operating margin percentage |
| `staffingStatus` | Critical / Strain / Stable |

**Updating hospital data**: Edit the relevant `hospital` document. The Dashboard reads directly from Sanity via the GROQ API — no index rebuild is needed for dashboard data.

---

### RHT State Profiles (`rhtState`)

Profiles for states participating in the RHT program, displayed on `/connect`.

| Field | Description |
|---|---|
| `stateId` | Slug-format state identifier (e.g., `vermont`) |
| `stateName` | Full state name |
| `awardAmount` | Grant award amount |
| `status` | Active / Pending / At Risk |
| `strategicFocus` | One-line strategic focus description |
| `description` | Full program description |
| `initiatives` | Array of initiative objects (name, status, description) |
| `metrics` | Array of metric objects (label, status, target) |

---

### State Performance Index (`statePerformanceIndex`)

Powers the state scorecard in the 50-State Dashboard.

Each record contains a `performanceScore` (0–100) and detailed metrics across all five pillars:

- **Policy**: VBP Adoption, Telehealth Policy, Scope of Practice
- **Economics**: Spending Per Capita, Workforce Adequacy, Insurance Coverage
- **Technology**: HIE Adoption, Broadband Access, EHR Adoption
- **Clinical**: Preventive Care, Readmission Rate, Chronic Disease Control
- **Equity**: Racial Equity Gap, Rural-Urban Gap, SDOH Integration

Each metric has: `value`, `status` (Leading/Improving/Stable/At Risk), `trend`, `notes`.

---

## Academy Content Management

### Course Structure

```
Course
  └── Module 1
  └── Module 2
  └── Module 3
  ...
```

Courses reference modules by document ID. Modules are standalone documents that can appear in multiple courses.

### Creating a New Course

1. Create all **Academy Modules** first (with slugs, content, and learning objectives)
2. Set `moduleNumber`, `totalModules`, `prevModuleSlug`, `nextModuleSlug` on each module
3. Create the **Course** document
4. Add modules to the `modules` array in order (drag to reorder)
5. Add **Instructors** (create instructor documents first if needed)
6. Publish the course

### Module Navigation Setup

For a 3-module course on "AI in Healthcare":

| Module | `moduleNumber` | `prevModuleSlug` | `nextModuleSlug` |
|---|---|---|---|
| `intro-ai-healthcare` | 1 | _(empty)_ | `ai-clinical-applications` |
| `ai-clinical-applications` | 2 | `intro-ai-healthcare` | `ai-governance-ethics` |
| `ai-governance-ethics` | 3 | `ai-clinical-applications` | _(empty)_ |

### Personalized Learning Catalog

The Personalized Learning tab in Academy reads courses directly from Sanity via GROQ. To include a course in the personalized learning system:

- Ensure the course has a `pillar` assigned
- Ensure the course has a `type` (COURSE, CERTIFICATION, etc.)
- Ensure `description` is filled in for the recommendation card

The system auto-populates based on user preferences — no special flags required.

---

## Daily Widgets & Live Content

### Daily Insight (`dailyInsight`)

Shown in the homepage insight widget.

- Set `isActive: true` on exactly one document at a time
- The platform shows the most recently updated active insight
- **Category options**: QUOTE / CHART / STAT / READ / TRIVIA
- **Content**: Max 120 characters — keep it punchy
- **Link**: Optional URL for "Read more" button

**Rotating insights**: Create multiple insight documents and toggle `isActive` on the one you want to show. There is no scheduling — you manually activate/deactivate.

### Ticker (`ticker`)

The scrolling metrics bar (System Vitals) at the top of the homepage.

Each ticker item has:
- `label`: Metric name (e.g., "Hospital Closures YTD")
- `value`: Current value (e.g., "47")
- `trend`: Direction indicator
- `status`: `good` / `warning` / `critical` / `neutral`

Update ticker values manually as new data becomes available.

---

## Slug Conventions

Slugs are URL path segments. Follow these conventions for consistency:

| Rule | Example |
|---|---|
| Lowercase only | `cms-prior-auth-2026` not `CMS-Prior-Auth-2026` |
| Hyphens as word separators | `value-based-care` not `value_based_care` |
| No special characters | Avoid `&`, `#`, `?`, `/` in slugs |
| Descriptive but concise | `vermont-ahead-model-update` not `article-12345` |
| Date suffix for recurring content | `q1-2026-performance-report` |
| Academy modules include course prefix | `ai-healthcare-module-2-clinical-applications` |

Slugs become permanent URLs once published. Changing a slug after publication will break existing links and search rankings. Avoid slug changes unless necessary, and use redirects if you must change one.

---

## Troubleshooting

### Content published but not appearing on platform

1. Check that you clicked **Publish** (not just saved a draft)
2. Wait 1–2 minutes for the CDN cache to clear
3. Hard refresh the browser (`Cmd+Shift+R`)

### AI Analyst not reflecting new content

1. Check the ingest status: `GET {PYTHON_BACKEND_URL}/api/ingest/status`
2. If status is `failed`, check Railway backend logs for the error
3. Manually trigger a re-index by calling `POST /api/ingest` with the `INGEST_SECRET` bearer token
4. Confirm the Python backend is running on Railway

### Webhook not firing

1. Go to Sanity manage → API → Webhooks
2. Check the webhook delivery log for errors
3. Verify `SANITY_WEBHOOK_SECRET` matches between Sanity and the Next.js environment variables
4. Confirm the webhook URL is correct and the Next.js app is deployed

### Module navigation buttons not working

`prevModuleSlug` and `nextModuleSlug` are plain text fields — they must exactly match the `slug.current` value of the target module. Open both modules and copy-paste the slug values to avoid typos.

### Images not displaying

- Ensure images are uploaded directly in the Sanity studio (not external URLs)
- For author/instructor headshots, enable **hotspot** to control cropping focus
- Minimum recommended image dimensions: 1200×630px for article heroes, 400×400px for headshots

### Duplicate or conflicting content

If the AI returns duplicate or conflicting answers, there may be duplicate documents in Sanity. Search the studio for the topic and check for two documents with similar titles. Unpublish or delete the older one, then manually trigger a re-index.
