# Platform Amendment — Version 4.11.0
# Vermont Health Platform (HTR)

**Type:** Amendment to Platform Documentation (supplements v4.10.0 and all prior amendments)
**Version:** 4.11.0
**Date:** April 2026
**Classification:** Internal
**Scope:** Vermont Medicaid Eligibility & Enrollment — a comprehensive new product area spanning four new pages, two updated navigation components, a 37-term interactive glossary, a multi-step eligibility simulator, a Medicaid-specialized RAG pipeline, and AI chat enhancements. This amendment documents every change end-to-end — for residents, navigators, content editors, and engineers.

---

## Table of Contents

1. [Why This Release Exists](#1-why-this-release-exists)
2. [Feature Overview](#2-feature-overview)
3. [End-User Guide — Vermont Residents & Navigators](#3-end-user-guide--vermont-residents--navigators)
   - 3.1 [Vermont Medicaid Hub — /vermont-medicaid](#31-vermont-medicaid-hub--vermont-medicaid)
   - 3.2 [Medicaid Eligibility Simulator — /medicaid-eligibility-simulator](#32-medicaid-eligibility-simulator--medicaid-eligibility-simulator)
   - 3.3 [Medicaid Learning Center — /academy/medicaid](#33-medicaid-learning-center--academymedicaid)
   - 3.4 [Medicaid Glossary — /academy/medicaid/glossary](#34-medicaid-glossary--academymedicaidglossary)
   - 3.5 [AI Analyst — Medicaid Quick Prompts](#35-ai-analyst--medicaid-quick-prompts)
4. [Navigation Changes](#4-navigation-changes)
5. [AI & RAG — Medicaid Eligibility Subsystem (v4.3.0 Recap + Current State)](#5-ai--rag--medicaid-eligibility-subsystem)
6. [Developer Reference — Page Architecture](#6-developer-reference--page-architecture)
   - 6.1 [/vermont-medicaid/page.tsx](#61-vermont-medicaidpagetsx)
   - 6.2 [/medicaid-eligibility-simulator/page.tsx](#62-medicaid-eligibility-simulatorpagetsx)
   - 6.3 [/academy/medicaid/page.tsx](#63-academymedicaidpagetsx)
   - 6.4 [/academy/medicaid/glossary/page.tsx](#64-academymedicaidglossarypagetsx)
7. [Component Changes](#7-component-changes)
   - 7.1 [HomeSidebar.tsx](#71-homesidebartsx)
   - 7.2 [RightSidebar.tsx](#72-rightsidebartsx)
8. [Eligibility Logic Reference](#8-eligibility-logic-reference)
   - 8.1 [FPL Calculation](#81-fpl-calculation)
   - 8.2 [Program Rules Engine](#82-program-rules-engine)
   - 8.3 [Updating Income Limits](#83-updating-income-limits)
9. [Content Reference — Programs Covered](#9-content-reference--programs-covered)
10. [Glossary Term Catalog](#10-glossary-term-catalog)
11. [Cross-Linking Architecture](#11-cross-linking-architecture)
12. [Maintenance & Future Extension Guide](#12-maintenance--future-extension-guide)

---

## 1. Why This Release Exists

Vermont Medicaid is the single largest publicly funded health coverage program in the state, serving over 207,000 Vermonters — roughly 26% of the population. Despite its scale, eligibility rules are distributed across dozens of government PDFs, the DVHA website, Vermont Health Connect, and complex federal regulations (42 CFR Part 435). Residents — particularly those in coverage transitions, families with mixed circumstances, or people navigating long-term care — consistently struggle to find reliable, plain-language guidance on:

- Which specific Vermont program covers their situation
- What their income limit is in plain dollar terms (not just "138% FPL")
- How to apply, what documents to bring, and what to expect
- The difference between MAGI and non-MAGI programs
- Whether Medicare and Medicaid can be combined

This release builds HTR into a **comprehensive Vermont Medicaid information platform** — the first in the state to combine a live eligibility simulator, structured learning content, an AI analyst trained on official documents, and a policy intelligence layer — all in one place.

**This is not a replacement for an official application.** Every part of this release is designed to inform, educate, and route users to the correct official channel. The simulator outputs preliminary guidance, not legal determinations.

---

## 2. Feature Overview

| # | What was built | Route | Type | Notes |
|---|---|---|---|---|
| 1 | Vermont Medicaid Hub | `/vermont-medicaid` | New page (Server Component) | Flagship program reference page |
| 2 | Medicaid Eligibility Simulator | `/medicaid-eligibility-simulator` | New page (Client Component) | Multi-step wizard with inline logic engine |
| 3 | Medicaid Learning Center | `/academy/medicaid` | New page (Server Component) | Courses, webinars, case studies |
| 4 | Medicaid Glossary | `/academy/medicaid/glossary` | New page (Client Component) | 37 terms, searchable + filterable |
| 5 | HomeSidebar nav entries | `HomeSidebar.tsx` | Component edit | 3 new items across 3 sections |
| 6 | AI quick-prompt chips | `RightSidebar.tsx` | Component edit | 6 Medicaid prompts in empty state |
| 7 | Medicaid RAG pipeline | `backend/` | Backend (prior release, v4.3.0) | Documents indexed, intent detection wired |

All frontend pages are built with the platform's existing Tailwind design system. No new dependencies were added. All pages are statically renderable (no `getServerSideProps`, no dynamic `params`).

---

## 3. End-User Guide — Vermont Residents & Navigators

This section is written for non-technical audiences: Vermont residents seeking coverage, community health workers, hospital financial counselors, social workers, and certified application counselors (CACs) using HTR to assist clients.

### 3.1 Vermont Medicaid Hub — `/vermont-medicaid`

**Purpose:** A single reference page that answers the question: *"What is Vermont Medicaid and what programs exist?"* It is the authoritative starting point for anyone new to Vermont Medicaid on this platform.

**What's on the page:**

**Hero Section**
- Program badge ("State Program · Vermont"), 2026 update badge, enrollment stat badge ("Over 200,000 Vermonters Enrolled")
- A plain-language description of Vermont Medicaid — who administers it (DVHA), how residents enroll (HBEE / Vermont Health Connect), and what the program covers at a high level
- Three action buttons:
  - **Check My Eligibility →** — goes to the simulator
  - **Learn Center** — goes to the Medicaid Learning Center
  - **Apply at VT Health Connect** — external link to healthconnect.vermont.gov

**Key Stats Strip**
Four headline numbers in a white card:
- 207K+ Vermonters enrolled
- 26% of Vermont's total population covered
- 6 distinct program categories
- 317% FPL — the highest income threshold (Dr. Dynasaur for children)

These numbers establish scale and legitimacy for users unfamiliar with the program's reach.

**Program Cards (6 cards)**
Each program has its own card with:
- Program name and tagline
- Plain-language description of who it serves
- Income threshold expressed as a percentage of FPL *and* a monthly dollar estimate for a single adult or household
- Color-coded by program type

The six programs documented:

| Program | Who it serves | Income threshold |
|---|---|---|
| Medicaid for Adults | Adults 19–64 without Medicare | ≤ 138% FPL |
| Dr. Dynasaur | Children 0–18 and pregnant women | ≤ 317% FPL (children) |
| Pregnant Women | Pregnant women and 12-month postpartum | ≤ 208% FPL |
| Choices for Care | Adults 65+ or physically disabled needing LTSS | Functional + income test |
| AABD Medicaid | Aged, Blind, and Disabled adults | ≤ 100% FPL (SSI-level) |
| Vermont Premium Assistance | Adults with employer insurance access | ≤ 300% FPL |

**2026 Income Table**
A 6-row × 4-column table showing monthly dollar income limits for household sizes 1–6 at four FPL thresholds: 100%, 138%, 208%, and 317%. Columns are color-coded (amber/rose/amber/emerald) to match each program. This is one of the most practically useful elements on the page — it translates abstract percentages into the dollar amounts residents actually know their income as.

A footnote links to the DVHA official guidelines page and notes that figures are estimates based on the 2026 HHS poverty guidelines.

**How to Apply (4-step process)**
Step cards for:
1. Check eligibility (links to simulator)
2. Gather documents (links to DVHA document checklist)
3. Submit application (links to Vermont Health Connect with phone number 1-855-899-9600)
4. Receive determination (explains the 45-day timeline and retroactive coverage)

**Key Contacts (6 contacts)**
Each card shows phone number, organization name, role, and an external link to their website:
- Vermont Health Connect (1-855-899-9600)
- DVHA (1-800-250-8427)
- VT Legal Aid (1-800-889-2047)
- 2-1-1 Vermont
- Vermont Aging & Disabilities Resource Connection (1-800-642-5119)
- VT Office of the Health Care Advocate (1-800-917-7787)

**CTA Strip (dark)**
Three-column strip: Eligibility Simulator → Learning Center → Ask AI Analyst. Connects all three product areas.

---

### 3.2 Medicaid Eligibility Simulator — `/medicaid-eligibility-simulator`

**Purpose:** Help Vermont residents quickly understand which Medicaid programs they may qualify for, without requiring them to navigate the full HBEE application process first. Also valuable for navigators as a rapid triage tool during client intake.

**Important disclaimer (displayed prominently):** This simulator is a *screening tool*, not an official eligibility determination. It provides preliminary guidance based on general rules. Only DVHA and DCF can make official determinations. The disclaimer is shown in an amber warning box at the top of the page, before the first question.

**How the simulator works:**

The simulator is a 5-step wizard. Each step is displayed one at a time with a progress bar. The user can move backward at any time to change answers. No data is submitted to any server — all computation happens in the browser.

**Step 1 — Residency & Citizenship**
- Do you currently live in Vermont? (Yes / No)
- Are you a U.S. citizen or qualified immigrant? (Yes / No / Unsure)

*Why these come first:* Vermont residency and citizenship/immigration status are hard disqualifiers. If a user answers No to Vermont residency, the simulator immediately returns a result explaining the residency requirement rather than asking further questions. If they answer No/Unsure on citizenship, the simulator returns guidance on immigration-based eligibility pathways and directs them to Vermont Health Connect.

**Step 2 — Household Composition**
- Total household size (number input, minimum 1)
- Do any children under 19 live in the household? (Yes / No)
- If yes: how many children under 19?

*Why household size matters:* FPL thresholds scale with household size. A family of 4 at $40,000/year might be below 138% FPL; a single adult at $40,000/year is well above it. Accurate household size is essential for correct results.

**Step 3 — Income**
- Total annual household income before taxes (dollar amount input)
- A live FPL indicator bar appears as soon as income is entered, showing the income as a percentage of FPL with color-coded zone markers for each program's threshold

*The FPL indicator:* This is one of the most educational elements. It shows a horizontal bar that fills from left to right as income increases, with four vertical markers at 100% (AABD), 138% (Adult Medicaid), 208% (Pregnant Women), and 317% FPL (Dr. Dynasaur). Below the bar, each threshold is labeled in plain English. The bar also displays the raw FPL dollar amount for the entered household size: "2026 FPL for household of 3: $26,650/year."

**Step 4 — Your Situation**
- Your age (number input)
- Are you currently pregnant? (Yes / No)
- Did you give birth within the past 12 months? (Yes / No)
- Do you have a disability that prevents substantial work? (Yes / No)
- Are you legally blind? (Yes / No)
- Did you age out of Vermont foster care under age 26? (Yes / No)

**Step 5 — Current Insurance**
- Does your employer offer health insurance? (Yes / No) — with a note explaining Vermont Premium Assistance
- Are you currently enrolled in Medicare? (Yes / No) — with a note explaining Medicare Savings Programs and dual eligibility

**Results Page**

After step 5, the simulator computes results and displays them. The results page has:

1. **Summary banner** — green (likely eligible for one or more programs), amber (possible eligibility, further review needed), or gray (no direct match). Plain-language summary sentence.

2. **FPL indicator** — shown again on results page for reference.

3. **Program result cards** — one card per program evaluated. Each card shows:
   - Program name badge (color-coded)
   - Eligibility status: **Likely eligible** (green checkmark), **Possibly eligible** (amber triangle), or **Unlikely eligible** (gray X)
   - Plain-language reason: e.g., "Your income (112% FPL) is at or below the 138% FPL threshold"
   - Detailed explanation of what the program covers and any caveats
   - "Apply / Learn More" link for programs where eligibility is likely or possible

4. **Next steps checklist** (dark background):
   - Apply at Vermont Health Connect
   - Call 1-855-899-9600
   - Visit the Medicaid Learning Center
   - Ask the AI Analyst

5. **Start Over button** — resets all inputs and returns to step 1.

**Programs evaluated by the simulator:**

| Program evaluated | Key criteria checked |
|---|---|
| Medicaid for Adults | Age 19–64, no Medicare, income ≤ 138% FPL |
| Dr. Dynasaur (children) | Children present, income ≤ 317% FPL |
| Dr. Dynasaur (pregnancy) | Is pregnant, income ≤ 208% FPL |
| Postpartum Medicaid (12 months) | Gave birth in past 12 months, income ≤ 208% FPL |
| AABD Medicaid | Age ≥ 65 or disabled/blind, income ≤ 100% FPL (possibly up to 150%) |
| Choices for Care | Age ≥ 65 or disabled — always shown as "possibly" pending functional assessment |
| Former Foster Care Youth | Aged out of VT foster care, age < 26 — no income test |
| Vermont Premium Assistance | Has employer insurance, income 139–300% FPL |
| Medicare Savings Program | Has Medicare, income ≤ 135% FPL |
| Dual Eligible | Has Medicare + disabled/65+, income ≤ 100% FPL |

**Residency/citizenship short-circuit:**
If the user says they don't live in Vermont, or is unsure about immigration status, the simulator returns a single informational result card rather than evaluating all programs.

---

### 3.3 Medicaid Learning Center — `/academy/medicaid`

**Purpose:** Structured educational content for residents who want to understand Vermont Medicaid deeply before applying, navigators who need a reference resource to share with clients, and policy professionals who need a curated knowledge base.

**Courses (4 modules)**

Each course card shows: difficulty level, estimated time, a description, a list of 5 topics covered, and a link to explore further with the AI Analyst.

| Course | Level | Time | Core topics |
|---|---|---|---|
| Vermont Medicaid 101: Programs, Eligibility & Benefits | Beginner | 45 min | 6 programs overview, MAGI basics, benefits covered, Medicaid vs. Medicare |
| Navigating the HBEE Application Process | Intermediate | 60 min | VT Health Connect walkthrough, documents required, special enrollment, appeals |
| Choices for Care: Long-Term Services & Supports | Intermediate | 50 min | NFLOC definition, ADL assessment, moderate vs. highest needs, financial eligibility |
| Income & Asset Rules: MAGI vs. Non-MAGI Pathways | Advanced | 75 min | MAGI vs. non-MAGI compared, SSI income rules, asset limits and exclusions, deductions |

**Webinars (3 sessions)**

Each webinar card shows: title, date, presenter, description, and topic tags.

| Webinar | Presenter | Key topics |
|---|---|---|
| 2026 Vermont Medicaid Income Limit Updates: What Changed and Why | DVHA Policy Team | FPL adjustments, updated income charts, threshold changes |
| Dual Eligibility in Vermont: Maximizing Medicare & Medicaid Benefits | Vermont Health Care Advocate | Medicare/Medicaid coordination, MSP programs, cost-sharing |
| Using VT Health Connect as a Certified Navigator or Assister | Vermont Health Connect Training | Navigator role, enrollment errors, escalation procedures |

**Case Studies (2)**

| Case Study | Subject |
|---|---|
| A Family's Journey Through the HBEE Application | Household of 4, Lamoille County, 2025 — documents denial, appeal, retroactive coverage |
| Vermont's Postpartum Medicaid Expansion: One Year In | Statewide policy analysis, 2023–2024 — 12-month postpartum extension impact data |

**Quick Access Tool Strip (4 cards)**
- Eligibility Simulator
- Medicaid Glossary
- Program Hub (/vermont-medicaid)
- Ask the AI

**Official Resources Section**
Six Vermont government links in a card grid: Vermont Health Connect, DVHA, VT Legal Aid, VT Health Care Advocate, ADRC, 2-1-1 Vermont.

---

### 3.4 Medicaid Glossary — `/academy/medicaid/glossary`

**Purpose:** A comprehensive, searchable reference for the terminology that appears throughout Vermont Medicaid — programs, eligibility rules, enrollment processes, policy frameworks, and benefits. Designed for residents who encounter unfamiliar terms on a DVHA notice, a Vermont Health Connect screen, or in news coverage.

**37 terms** across 5 categories:

| Category | Terms | Color |
|---|---|---|
| Programs | Dr. Dynasaur, Choices for Care, AABD, VPA, MSP, Former Foster Care Youth, VHAP | Rose |
| Eligibility | MAGI, FPL, Presumptive Eligibility, Categorical Eligibility, NFLOC, ADLs, Asset Test, Income Disregard, Medically Needy, Retroactive Eligibility | Amber |
| Enrollment | HBEE, Vermont Health Connect, Notice of Decision, Annual Renewal, Ex Parte Renewal, Special Enrollment Period, CAC, Navigator | Sky |
| Administration | DVHA, CMS, State Plan, 1115 Waiver, Global Commitment to Health, FMAP, Dual Eligible, Coordinated Care | Slate |
| Benefits | Mandatory Benefits, EPSDT, HCBS, Postpartum Coverage, Behavioral Health | Emerald |

**Filtering capabilities:**
- **Search box** — searches term name, acronym, and definition text simultaneously. Results update in real time.
- **Category filter** — 6 buttons (All + 5 categories). Multiple filters cannot be active simultaneously — selecting a category replaces the previous selection.
- **Alphabet bar** — 26 letter buttons. Inactive letters (no terms) are grayed out and non-clickable. Selecting a letter filters to terms starting with that letter. Search overrides the alphabet bar.

**Each term card shows:**
- Term name (bold)
- Acronym badge (if applicable) — e.g., "MAGI", "AABD", "HBEE"
- Category badge (color-coded)
- Full definition in plain language (typically 50–120 words, written for a general audience)

**Breadcrumb:** "← Medicaid Learning Center" at the top links back to `/academy/medicaid`.

---

### 3.5 AI Analyst — Medicaid Quick Prompts

When the AI Analyst panel (right sidebar) has no active conversation, it now displays 6 Medicaid-specific quick-prompt chips in addition to the existing placeholder text:

1. "Am I eligible for Vermont Medicaid?"
2. "What does Dr. Dynasaur cover?"
3. "What are the 2026 income limits?"
4. "How do I apply for Choices for Care?"
5. "What's the difference between MAGI and non-MAGI?"
6. "Can I have Medicare and Medicaid at the same time?"

Clicking any chip sends that question directly to the AI Analyst. The AI Analyst is trained on 23 Vermont and federal Medicaid documents (see Section 5) and will provide a grounded, cited answer.

The chips appear on all non-chat pages when the right sidebar is open and no conversation has started. They disappear as soon as the user sends any message.

---

## 4. Navigation Changes

### 4.1 — HomeSidebar additions

Three new items were added to the HomeSidebar. They are all wired to auto-expand the correct section when the user navigates to their route.

**States & Programs section** — new item at the top of the list:

| Label | Route | Icon |
|---|---|---|
| Vermont Medicaid | `/vermont-medicaid` | DocumentTextIcon |

Vermont Medicaid is placed first in the States & Programs list — above Vermont Act 167 — because it is the highest-traffic, most universally relevant entry in that section.

**Learn section** — new item between Glossary and Faculty:

| Label | Route | Icon |
|---|---|---|
| Medicaid Learning Center | `/academy/medicaid` | DocumentTextIcon |

**Analyze & Tools section** — new item between HTR Simulator and HTI Dashboard:

| Label | Route | Icon |
|---|---|---|
| Medicaid Eligibility | `/medicaid-eligibility-simulator` | DocumentTextIcon |

### 4.2 — Auto-expand path prefix maps

Two prefix arrays in `HomeSidebar.tsx` were updated to include the new routes so that navigating directly to a URL (e.g., from a search result or a link in an email) correctly opens the parent section in the sidebar:

```typescript
// States & Programs
const statesPrefixes = ["/vermont-medicaid", "/vermont-act-167", ...];

// Analyze & Tools
const analyzePrefixes = [..., "/medicaid-eligibility-simulator", ...];
```

`/academy/medicaid` is already covered by the existing `/academy/` prefix match for the Learn section — no change needed there.

---

## 5. AI & RAG — Medicaid Eligibility Subsystem

*This section recaps the backend work documented in platform-amendment-v4.3.0.md (the ai-rag-guide.md update) and summarizes the current state for engineers who may not have read that amendment.*

### 5.1 — Document Collection

23 Vermont Medicaid PDF documents are stored in `backend/data/medicaid_eligibility/`. They were sourced from Vermont state government websites and the Government Publishing Office (GPO). Documents include:

- HBEE Parts 1–8 (Vermont Health Benefits Exchange eligibility rules)
- Vermont Medicaid combined reference
- 2026 income charts
- Choices for Care program rules
- 42 CFR Part 435 (federal Medicaid eligibility regulations)
- Vermont Provider Manual (Medicaid billing)

Total corpus: 23 PDFs, ~14MB, yielding 1,246 section chunks after parsing.

### 5.2 — Specialized Medicaid Parser

**File:** `backend/services/medicaid_parser.py`

The platform uses `pdfplumber` (not PyPDF2) for Medicaid documents because government PDFs contain multi-column layouts, regulatory tables, and section numbering that standard PDF extractors mangle. The parser:

- Detects headings using regex patterns: `Part X`, `Section X.X`, ALL-CAPS lines, `CHAPTER X`
- Chunks text at heading boundaries (section-aware chunking), not at arbitrary character counts
- Converts tables to Markdown format for embedding
- Attaches metadata to every chunk: `source_type="medicaid_eligibility"`, `pillar="Medicaid Eligibility"`, `program_type`, `part`, `section_heading`, `page_num`, `file_name`

### 5.3 — Dual Ingestion Pipeline

**File:** `backend/services/indexing.py`

The `build_index()` function uses two separate ingestion paths:

**Path A — Medicaid documents:**
```
PDFs → parse_medicaid_directory() → TextNode (section chunks) → embed directly
```
Medicaid nodes bypass `SentenceWindowNodeParser` because section-aware chunks already have the correct granularity. Applying sentence-window splitting to them would fragment regulatory text at sentence boundaries, destroying the context needed for eligibility determinations.

**Path B — General platform documents (Sanity CMS + other PDFs):**
```
Sanity articles + other PDFs → SentenceWindowNodeParser → embed
```
Standard pipeline unchanged from prior releases.

Both paths merge before the embedding step. A global NUL byte sanitization pass and a 30,000-character truncation guard run on all nodes before embedding to ensure PostgreSQL compatibility and to stay within OpenAI's 8,192-token embedding limit.

### 5.4 — Intent Detection

**File:** `backend/routers/chat.py`

The chat endpoint detects Medicaid intent before routing. If intent is detected, the query is routed to the Medicaid path regardless of which pillar the user is currently viewing.

**Detection method:** two-tier keyword matching.

Tier 1 — keyword set (`_MEDICAID_KEYWORDS`):
```
medicaid, dr dynasaur, choices for care, aabd, dvha, hbee, vhap, fpl, magi,
vermont health connect, eligibility, medicaid adult, postpartum, foster care youth, ...
```

Tier 2 — phrase patterns (`_MEDICAID_QUESTION_PHRASES`):
```
"am i eligible", "do i qualify", "what does medicaid cover",
"how do i apply", "income limit", "what programs", ...
```

Any match on either tier triggers the Medicaid path.

### 5.5 — Medicaid Retrieval Parameters

When Medicaid intent is detected, retrieval is scoped to the `"Medicaid Eligibility"` pillar:

| Parameter | General queries | Medicaid queries |
|---|---|---|
| `top_k` (vector search) | 15 | 25 |
| Rerank top-N | 5 | 8 |
| Pillar filter | current pillar or none | `"Medicaid Eligibility"` (forced) |
| System prompt | BASE or ADVISORY | MEDICAID_ELIGIBILITY_SYSTEM_PROMPT |
| LLM floor | user tier | subscriber tier (ensures stronger reasoning) |

### 5.6 — Medicaid System Prompt

The `MEDICAID_ELIGIBILITY_SYSTEM_PROMPT` instructs the LLM to:
- Answer as a Vermont Medicaid eligibility specialist
- Ground every answer in the retrieved documents
- Express income limits in both FPL percentages and monthly dollar terms
- Distinguish between MAGI and non-MAGI programs when relevant
- Acknowledge the limits of a chat response vs. an official determination
- Include the disclaimer: *"This information is for educational purposes. Only Vermont DCF/DVHA can make an official eligibility determination. Apply at Vermont Health Connect or call 1-855-899-9600."*
- Cite sources using the `[CITATIONS][/CITATIONS]` sentinel format

### 5.7 — Embedding & Storage

Embeddings use OpenAI `text-embedding-3-small` (1,536 dimensions). All vectors are stored in Supabase pgvector alongside the general platform embeddings in the same table, differentiated by the `pillar` and `source_type` metadata columns. No separate table or index was created for Medicaid content.

To rebuild the index after adding or modifying Medicaid documents:

```bash
cd backend
source venv/bin/activate
python -c "from services.indexing import build_index; build_index()"
```

Expected output: approximately 1,246 Medicaid section nodes + general nodes. Total build time: 8–12 minutes depending on API rate limits.

---

## 6. Developer Reference — Page Architecture

### 6.1 `/vermont-medicaid/page.tsx`

**Type:** React Server Component (no `"use client"` directive)
**File:** `frontend/app/vermont-medicaid/page.tsx`
**Route:** `/vermont-medicaid`

**Component inventory:**

| Component | Props | Purpose |
|---|---|---|
| `ExternalLink` | `href`, `children` | Opens in new tab with `rel="noopener noreferrer"`, rose text color, external icon |
| `SectionHeader` | `label`, `title` | Two-line section heading — small label in rose, large black title |
| `ProgramCard` | `name`, `tagline`, `who`, `incomePct`, `incomeNote`, `color`, `badge` | Program summary card with income threshold and hover state |
| `StatPill` | `value`, `label` | Single stat: large number + descriptive label, used in the hero stats strip |
| `StepCard` | `step`, `title`, `description`, `cta`, `ctaHref`, `external?` | Numbered enrollment step card with optional external link |
| `IncomeRow` | `household`, `fpl100`, `fpl138`, `fpl208`, `fpl317` | Single row in the income table; all cells are strings |

**Data:** All content is hardcoded inline. Income figures are 2026 estimates derived from HHS poverty guidelines. No API calls, no Sanity CMS dependency.

**When to update this page:**
- Each January when HHS releases new FPL guidelines — update `IncomeRow` values and the `incomeNote` strings in each `ProgramCard`
- If DVHA changes program thresholds mid-year
- If contact information changes (phone numbers, URLs in the contacts grid)

**Adding a new program:**
Add a new `<ProgramCard ... />` to the grid. The grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — a 7th card will wrap correctly. Use a color class not already used (check existing `color` props) and add a matching `badge` class.

---

### 6.2 `/medicaid-eligibility-simulator/page.tsx`

**Type:** React Client Component (`"use client"`)
**File:** `frontend/app/medicaid-eligibility-simulator/page.tsx`
**Route:** `/medicaid-eligibility-simulator`

**State model:**

```typescript
const [step, setStep] = useState(1);           // 1–5 = wizard; 6 = results
const [inputs, setInputs] = useState<SimInputs>(defaultInputs);
const [results, setResults] = useState<EligibilityResult[] | null>(null);
```

**`SimInputs` interface (full):**

```typescript
interface SimInputs {
  // Step 1
  isVermont: boolean;
  isCitizen: boolean;
  // Step 2
  householdSize: number;
  hasChildren: boolean;
  childrenUnder19: number;
  // Step 3
  annualIncome: number;
  // Step 4
  age: number;
  isPregnant: boolean;
  isPostpartum: boolean;
  isDisabled: boolean;
  isBlind: boolean;
  isFosterCareYouth: boolean;
  // Step 5
  hasEmployerInsurance: boolean;
  hasMedicare: boolean;
}
```

**`EligibilityResult` interface:**

```typescript
type EligibilityResult = {
  program: string;
  eligible: "likely" | "possibly" | "unlikely";
  reason: string;    // one-line plain-language explanation
  details: string;   // full paragraph with program details and caveats
  color: string;     // Tailwind border class (e.g. "border-rose-300")
  badge: string;     // Tailwind badge classes
  applyUrl?: string; // external or internal link for "Apply / Learn More"
};
```

**FPL constants:**

```typescript
const FPL_BASE = 15_650;  // 1-person household, 2026 HHS guidelines
const FPL_INCR = 5_500;   // per additional person

function getFPL(householdSize: number): number {
  return FPL_BASE + FPL_INCR * Math.max(0, householdSize - 1);
}
```

**Logic function:**

```typescript
function computeResults(inputs: SimInputs): EligibilityResult[]
```

All eligibility logic lives in this one pure function. It takes the `SimInputs` object and returns an array of `EligibilityResult` objects (one per program evaluated). This is intentionally pure — no side effects, no API calls, fully testable in isolation.

**Reusable sub-components:**

| Component | Purpose |
|---|---|
| `ProgressBar` | Shows step X of Y with percentage fill |
| `RadioOption` | Styled radio-style button (Yes/No choices) |
| `NumberInput` | Labeled number field with optional prefix/suffix/helpText |
| `FPLIndicator` | Animated FPL bar with zone markers (shown in step 3 and results) |
| `ResultCard` | Individual program result with icon, badge, reason, details, apply link |

**Updating FPL constants annually:**
Edit `FPL_BASE` and `FPL_INCR` at the top of the file. Also update the descriptive string in the `FPLIndicator` component: `"2026 FPL for household of ..."` → `"2027 FPL for household of ..."`.

**Adding a new program to the simulator:**
1. Add a new block in `computeResults()` following the existing pattern
2. Use the `inputs` fields to construct eligibility logic
3. Push a new `EligibilityResult` object to the `results` array
4. No changes needed to the wizard steps or the results rendering — they are generic

**Testing the logic function:**
Because `computeResults` is pure, it can be unit-tested directly:

```typescript
import { computeResults } from "./page"; // if exported

const result = computeResults({
  isVermont: true,
  isCitizen: true,
  householdSize: 1,
  annualIncome: 18000,
  hasChildren: false,
  childrenUnder19: 0,
  isPregnant: false,
  isPostpartum: false,
  age: 35,
  isDisabled: false,
  isBlind: false,
  isFosterCareYouth: false,
  hasEmployerInsurance: false,
  hasMedicare: false,
});

// Single adult at $18,000/yr → should be "likely" for Adult Medicaid (138% FPL = ~$21,597)
expect(result[0].eligible).toBe("likely");
expect(result[0].program).toBe("Medicaid for Adults");
```

*Note: `computeResults` is currently not exported. To make it testable, add `export` to the function declaration. This has no runtime impact — tree-shaking eliminates unused exports.*

---

### 6.3 `/academy/medicaid/page.tsx`

**Type:** React Server Component
**File:** `frontend/app/academy/medicaid/page.tsx`
**Route:** `/academy/medicaid`

**Component inventory:**

| Component | Props | Purpose |
|---|---|---|
| `CourseCard` | `title`, `level`, `duration`, `description`, `topics[]`, `color`, `badge` | Self-paced course summary with 5-topic checklist |
| `WebinarCard` | `title`, `date`, `presenter`, `description`, `tags[]` | Session card with tag chips |
| `CaseStudyCard` | `title`, `subject`, `summary`, `keyTakeaways[]`, `color` | Case study with arrow-bullet takeaways |

All content is inline. The page does not fetch from Sanity CMS. If the platform's Academy module is later extended to manage Medicaid courses in Sanity, this page can be refactored to use `client.fetch()` following the pattern in `frontend/app/academy/courses/page.tsx`.

**Adding a new course:** Add a `<CourseCard />` to the grid. The grid is `md:grid-cols-2` — up to 6 courses render cleanly.

**Adding a new webinar:** Add a `<WebinarCard />` to the grid. The grid is `md:grid-cols-3`.

---

### 6.4 `/academy/medicaid/glossary/page.tsx`

**Type:** React Client Component (`"use client"`)
**File:** `frontend/app/academy/medicaid/glossary/page.tsx`
**Route:** `/academy/medicaid/glossary`

**Data structure:**

```typescript
type Term = {
  term: string;
  acronym?: string;   // optional — e.g. "MAGI", "HBEE"
  definition: string;
  category: string;   // one of: "Programs" | "Eligibility" | "Enrollment" | "Administration" | "Benefits"
};

const TERMS: Term[] = [ ... ]; // 37 terms, hardcoded inline
```

**State:**

```typescript
const [search, setSearch]     = useState("");
const [letter, setLetter]     = useState<string | null>(null);
const [category, setCategory] = useState("All");
```

**Filtering logic (`useMemo`):**

Priority order:
1. If `search` is non-empty → filter by search across `term`, `acronym`, and `definition`. Alphabet filter is ignored when search is active.
2. Else if `letter` is set → filter by first letter of term
3. Apply `category` filter on top of whichever of the above applies
4. Sort results alphabetically

**Adding a new term:**
Add an object to the `TERMS` array. The alphabet bar auto-generates from the first letters of all terms — no manual update needed. If the new term introduces a new first letter not currently in the corpus, that letter's button will automatically become active.

**Adding a new category:**
1. Add the category string to the `TERMS` entry
2. Add it to the `CATEGORIES` array at the top of the file
3. Add a case to `getCategoryStyle()` and `getCategoryButtonStyle()` with appropriate Tailwind classes

---

## 7. Component Changes

### 7.1 HomeSidebar.tsx

**File:** `frontend/components/HomeSidebar.tsx`

**Three additions to the `SECTIONS` data array:**

1. **Learn section** — `Medicaid Learning Center` inserted between Glossary and Faculty:
```typescript
{ href: "/academy/medicaid", label: "Medicaid Learning Center", icon: DocumentTextIcon },
```

2. **Analyze & Tools section** — `Medicaid Eligibility` inserted between HTR Simulator and HTI Dashboard:
```typescript
{ href: "/medicaid-eligibility-simulator", label: "Medicaid Eligibility", icon: DocumentTextIcon },
```

3. **States & Programs section** — `Vermont Medicaid` inserted at the top of the list:
```typescript
{ href: "/vermont-medicaid", label: "Vermont Medicaid", icon: MapPinIcon },
```

**Two additions to the route prefix maps:**

```typescript
// getSectionForPath() — states section
const statesPrefixes = ["/vermont-medicaid", "/vermont-act-167", ...];

// getSectionForPath() — analyze section
const analyzePrefixes = [..., "/medicaid-eligibility-simulator", ...];
```

These ensure that when a user navigates directly to any Medicaid page (from a bookmark, search result, or internal link), the correct sidebar section auto-expands.

**No other changes to HomeSidebar.** The visual design, state management, collapse behavior, dark mode styles, and Intelligence pillar system are unchanged.

---

### 7.2 RightSidebar.tsx

**File:** `frontend/components/RightSidebar.tsx`

**One addition:** The empty-state UI (shown when `messages.length === 0`) was extended with a set of Medicaid quick-prompt chips.

**Before:**
```tsx
{messages.length === 0 && (
  <p className="text-slate-400 text-center py-4 leading-relaxed">
    {activePillar ? `Ask about ${activePillar} topics...` : "Ask a quick question..."}
  </p>
)}
```

**After:**
```tsx
{messages.length === 0 && (
  <div className="flex flex-col gap-3 py-2">
    <p className="text-slate-400 text-center leading-relaxed text-[11px]">
      {activePillar ? `Ask about ${activePillar} topics...` : "Ask a quick question..."}
    </p>

    <div className="mt-1">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2 text-center">
        Vermont Medicaid — Try asking:
      </p>
      <div className="flex flex-col gap-1.5">
        {[
          "Am I eligible for Vermont Medicaid?",
          "What does Dr. Dynasaur cover?",
          "What are the 2026 income limits?",
          "How do I apply for Choices for Care?",
          "What's the difference between MAGI and non-MAGI?",
          "Can I have Medicare and Medicaid at the same time?",
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={() => send(prompt)}
            className="... hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 ..."
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  </div>
)}
```

**Behavior:** Chips are visible only in the empty state (no conversation). Once the user sends any message, the chips disappear and are replaced by the conversation. Clicking a chip calls `send(prompt)` directly — it bypasses the textarea and immediately submits the question to the AI backend.

**Styling:** Rose hover color distinguishes Medicaid chips from the general UI chrome without conflicting with the indigo accent used for the AI header and message bubbles. Dark mode supported via `dark:hover:bg-rose-950/30`.

**No other changes to RightSidebar.** The streaming, citation parsing, feedback thumbs, expand-to-full-chat, and localStorage sync behavior are unchanged.

---

## 8. Eligibility Logic Reference

This section is for engineers and policy staff who need to verify, audit, or update the eligibility rules in the simulator.

### 8.1 FPL Calculation

**2026 HHS Poverty Guidelines (48 contiguous states + DC):**

| Household size | 100% FPL | 138% FPL | 208% FPL | 317% FPL |
|---|---|---|---|---|
| 1 | $15,650 | $21,597 | $32,552 | $49,611 |
| 2 | $21,150 | $29,187 | $44,022 | $67,106 |
| 3 | $26,650 | $36,777 | $55,432 | $84,481 |
| 4 | $32,150 | $44,367 | $66,952 | $102,036 |
| 5 | $37,650 | $51,957 | $78,312 | $119,431 |
| 6 | $43,150 | $59,547 | $89,752 | $136,886 |

*Note: Figures rounded to nearest dollar. Vermont's actual program thresholds may differ by ±$50/year from these estimates due to rounding rules in DVHA's official charts. Always verify against DVHA publications for official use.*

The simulator uses the formula:
```
FPL(n) = 15,650 + 5,500 × (n − 1)
```

HHS updates FPL guidelines each January. The simulator `FPL_BASE` and `FPL_INCR` constants must be updated each January to reflect the new guidelines.

### 8.2 Program Rules Engine

Below is a prose specification of the logic in `computeResults()`. This can be used to verify the code against current DVHA policy, or to reimplement the logic in a different language.

**Short-circuit conditions (checked first, in order):**

1. If `!isVermont` → return single result: Vermont residency required, unlikely eligible for all programs.
2. If `!isCitizen` → return single result: immigration status review needed, possibly eligible, direct to Vermont Health Connect.

**Program evaluations (run in order, appending to results array):**

**Medicaid for Adults**
- Condition: `age >= 19 AND age <= 64 AND !hasMedicare`
- Likely eligible if: `fplPct <= 138`
- Unlikely eligible if: `fplPct > 138 AND fplPct <= 200` (note: also suggests subsidized QHP)
- No result card if: `fplPct > 200` (not evaluated)

**Dr. Dynasaur (children)**
- Condition: `hasChildren AND childrenUnder19 > 0`
- Likely eligible if: `fplPct <= 317`
- Unlikely eligible if: `fplPct > 317`

**Dr. Dynasaur (pregnancy)**
- Condition: `isPregnant`
- Likely eligible if: `fplPct <= 208`
- Unlikely eligible if: `fplPct > 208`

**Postpartum Medicaid**
- Condition: `isPostpartum`
- Likely eligible if: `fplPct <= 208`
- No "unlikely" card — if over threshold, no card is shown (postpartum Medicaid is only for those already on Medicaid during pregnancy)

**AABD Medicaid**
- Condition: `age >= 65 OR isBlind OR isDisabled`
- Likely eligible if: `fplPct <= 100`
- Possibly eligible if: `fplPct > 100 AND fplPct <= 150` (allowable deductions may bring effective income below limit)
- No card if: `fplPct > 150`

**Choices for Care**
- Condition: `age >= 65 OR isDisabled`
- Always returns "possibly eligible" — functional assessment (ADL evaluation) is required regardless of income; the simulator cannot assess functional status
- No income-based logic applied (the simulator notes the income limit in the details text but does not gate on it, because functional eligibility is the primary unknown)

**Former Foster Care Youth Medicaid**
- Condition: `isFosterCareYouth AND age < 26`
- Always returns "likely eligible" — no income test applies
- No income check performed

**Vermont Premium Assistance**
- Condition: `hasEmployerInsurance AND fplPct > 138 AND fplPct <= 300`
- Always returns "possibly eligible" — whether the employer plan qualifies requires a caseworker review

**Medicare Savings Program**
- Condition: `hasMedicare AND fplPct <= 135`
- Always returns "likely eligible"

**Dual Eligible**
- Condition: `hasMedicare AND (isDisabled OR age >= 65)`
- Likely eligible if: `fplPct <= 100`
- Possibly eligible if: `fplPct > 100`

**Fallback (no results)**
- If the `results` array is still empty after all evaluations: return a single "no direct match" card directing user to Vermont Health Connect for QHP subsidies.

### 8.3 Updating Income Limits

**Annual FPL update (every January):**
1. Check HHS published 2027 FPL guidelines at aspe.hhs.gov
2. Update `FPL_BASE` (1-person household amount) and `FPL_INCR` (per-person increment) in `medicaid-eligibility-simulator/page.tsx`
3. Update the year references in `FPLIndicator`: `"2026 FPL"` → `"2027 FPL"`
4. Update the income table values in `/vermont-medicaid/page.tsx` (`IncomeRow` components)
5. Update the `incomeNote` strings in each `ProgramCard` on the Vermont Medicaid hub page
6. Update the income table in this document (Section 8.1)

**Mid-year DVHA threshold change:**
DVHA occasionally adjusts thresholds independently of FPL (e.g., Choices for Care income limits). Check `dvha.vermont.gov/members/vermont-medicaid-benefits` and update the corresponding program block in `computeResults()`.

---

## 9. Content Reference — Programs Covered

This section is an authoritative content reference for the six programs documented on the Vermont Medicaid Hub page and evaluated in the simulator. It draws from the indexed Vermont Medicaid documents.

### Vermont Medicaid for Adults (Standard Adult Medicaid)
- **Governing authority:** 42 CFR Part 435; Vermont State Plan; Global Commitment to Health waiver
- **Income methodology:** MAGI
- **Income limit:** 138% FPL (includes the 5% income disregard built into the ACA threshold)
- **Asset test:** None
- **Age range:** 19–64 (65+ are assessed under AABD)
- **Medicare enrollees:** Excluded — they are assessed under AABD or MSP pathways
- **Benefits:** Full Medicaid — physician, hospital, prescription, mental health, substance use, dental, vision, transportation
- **Premiums:** None
- **Effective date of coverage:** Date of application (retroactive up to 3 months in some cases)

### Dr. Dynasaur
- **Governing authority:** Vermont State Plan; CHIP; 42 CFR Part 457
- **Income methodology:** MAGI (children); MAGI (pregnant women)
- **Income limits:** 317% FPL (children 0–18); 208% FPL (pregnant women)
- **Asset test:** None
- **Age range:** 0–18 (children); any age during pregnancy
- **Benefits:** Comprehensive — EPSDT for children (all medically necessary services); full pregnancy coverage for women
- **Premiums:** None below 225% FPL; small sliding-scale premiums at 225–317% FPL

### Choices for Care
- **Governing authority:** Vermont HCBS Waiver (1915(c)); 42 CFR Part 441 Subpart G
- **Income methodology:** Non-MAGI (SSI-based rules)
- **Income limit:** ~300% SSI ($2,742/month individual; $3,655/month couple, 2026 estimates)
- **Asset test:** Yes — $2,000 individual; $3,000 couple. Excludes: primary home, one vehicle, prepaid burial up to $1,500, personal belongings
- **Functional requirement:** Must meet "nursing facility level of care" standard — typically defined as needing assistance with 3+ ADLs or having significant cognitive impairment. Assessment conducted by a certified assessor.
- **Benefit levels:** Moderate Needs (lower hourly personal care allowance) and Highest Needs (higher allowance + additional services)
- **Settings:** Home, adult day program, adult foster home, residential care home

### AABD Medicaid
- **Governing authority:** 42 CFR Part 435 Subpart C; Vermont State Plan
- **Income methodology:** Non-MAGI (SSI methodology)
- **Income limit:** 100% FPL (~$1,255/month individual, 2026 estimate); certain deductions may apply
- **Asset test:** Yes — same limits as Choices for Care ($2,000/$3,000)
- **Categorical requirement:** Age 65+, legally blind, or receiving SSI or having a disability determination
- **Auto-enrollment:** SSI recipients are automatically enrolled
- **Benefits:** Full Medicaid + long-term care coverage. Coordinates with Medicare for dual eligibles.

### Vermont Premium Assistance (VPA)
- **Governing authority:** Vermont State Plan; 42 CFR Part 435.1015
- **Eligibility:** Access to employer-sponsored insurance (ESI); income ≤ 300% FPL; employer plan must meet minimum benefit and premium cost standards
- **Benefit:** Vermont pays the employee share of premiums and cost-sharing. Does not provide Medicaid directly.
- **Administrative note:** VPA is determined by an eligibility worker, not self-assessed. The simulator correctly flags this as "possibly" rather than "likely."

### Medicare Savings Programs
- **Types:** QMB (100% FPL), SLMB (120% FPL), QI (135% FPL), QDWI (200% FPL, working disabled)
- **Benefit:** QMB pays Medicare Part A and B premiums plus cost-sharing. SLMB and QI pay Part B premiums only.
- **Application:** Applied for through DVHA, not Social Security. Vermont uses the same HBEE application for MSP.

---

## 10. Glossary Term Catalog

Complete listing of all 37 terms in the Medicaid Glossary (`/academy/medicaid/glossary`), organized by category for reference.

### Programs (7 terms)
Dr. Dynasaur · Choices for Care · AABD Medicaid · Vermont Premium Assistance · Medicare Savings Program · Former Foster Care Youth Medicaid · Vermont Health Access Program (VHAP)

### Eligibility (10 terms)
Modified Adjusted Gross Income (MAGI) · Federal Poverty Level (FPL) · Presumptive Eligibility · Categorical Eligibility · Nursing Facility Level of Care (NFLOC) · Activities of Daily Living (ADLs) · Asset Test · Income Disregard · Medically Needy · Retroactive Eligibility

### Enrollment (8 terms)
Health Benefits Exchange (HBEE) · Vermont Health Connect · Notice of Decision (NOD) · Annual Renewal · Ex Parte Renewal · Special Enrollment Period (SEP) · Certified Application Counselor (CAC) · Navigator

### Administration (8 terms)
Department of Vermont Health Access (DVHA) · Centers for Medicare & Medicaid Services (CMS) · State Plan · 1115 Waiver · Global Commitment to Health · Federal Medical Assistance Percentage (FMAP) · Dual Eligible · Coordinated Care

### Benefits (5 terms)
Mandatory Benefits · EPSDT · Home and Community-Based Services (HCBS) · Postpartum Coverage · Behavioral Health

---

## 11. Cross-Linking Architecture

The four new pages form a tightly cross-linked product cluster. Every page links to every other page in the cluster, and all pages link outward to the AI Analyst and the official Vermont application portal.

```
/vermont-medicaid  ←→  /medicaid-eligibility-simulator
        ↕                          ↕
/academy/medicaid  ←→  /academy/medicaid/glossary
        ↕                          ↕
      /chat (AI Analyst)    healthconnect.vermont.gov
```

**Inbound links from existing pages:**
- HomeSidebar → all 3 new page routes (via updated nav items)
- RightSidebar empty state → /chat with Medicaid prompt text pre-queued
- Medicaid quick-prompt chips → /chat (via `send()`)

**Internal cross-links (programmatic):**

| From page | Links to |
|---|---|
| `/vermont-medicaid` | `/medicaid-eligibility-simulator`, `/academy/medicaid`, `/chat`, VT Health Connect, DVHA, VT Legal Aid, 2-1-1, ADRC, Health Care Advocate |
| `/medicaid-eligibility-simulator` | `/vermont-medicaid`, `/academy/medicaid`, `/chat`, VT Health Connect (results apply links) |
| `/academy/medicaid` | `/medicaid-eligibility-simulator`, `/academy/medicaid/glossary`, `/vermont-medicaid`, `/chat`, 6 external government resources |
| `/academy/medicaid/glossary` | `/academy/medicaid` (breadcrumb), `/chat`, `/medicaid-eligibility-simulator` |

**Design principle:** A user who lands on any one of these pages should be able to reach any other page in the cluster within one click, and should always be able to reach the official application portal (Vermont Health Connect) within two clicks.

---

## 12. Maintenance & Future Extension Guide

### 12.1 Annual Update Checklist (Every January)

- [ ] Update `FPL_BASE` and `FPL_INCR` in `/medicaid-eligibility-simulator/page.tsx`
- [ ] Update year strings in `FPLIndicator` component
- [ ] Update income table values in `/vermont-medicaid/page.tsx`
- [ ] Update `incomeNote` strings in each `ProgramCard` on the hub page
- [ ] Update income table in this document (Section 8.1)
- [ ] Verify DVHA has not changed program-specific thresholds (check dvha.vermont.gov)
- [ ] Re-run `build_index()` if any new or updated PDFs are added to `backend/data/medicaid_eligibility/`
- [ ] Review the 6 AI quick-prompt chips for relevance (update year references if any)

### 12.2 Adding a New Vermont Medicaid Program

**Simulator:** Add a new evaluation block to `computeResults()`. Follow the pattern:
```typescript
if (/* categorical condition */) {
  if (fplPct <= THRESHOLD) {
    results.push({
      program: "Program Name",
      eligible: "likely",
      reason: `Income (${fplPct.toFixed(0)}% FPL) is within the X% FPL threshold`,
      details: "Plain-language details...",
      color: "border-COLOR-300",
      badge: "bg-COLOR-100 text-COLOR-700",
      applyUrl: "https://...",
    });
  }
}
```

**Hub page:** Add a `<ProgramCard />` to the programs grid.

**Glossary:** Add the program name as a new term with `category: "Programs"`.

**AI documents:** Add the relevant PDF to `backend/data/medicaid_eligibility/` and re-run `build_index()`.

### 12.3 Adding Courses, Webinars, or Case Studies

All content on `/academy/medicaid` is inline React — no CMS required. To add:

- **Course:** Add a `<CourseCard />` with the 5 required props. `topics` is a string array of 5 items.
- **Webinar:** Add a `<WebinarCard />` with `tags` as a string array.
- **Case Study:** Add a `<CaseStudyCard />` with `keyTakeaways` as a string array of 4 items.

If content volume grows significantly (>8 courses, >6 webinars), consider migrating to Sanity using the existing `academy/courses` pattern.

### 12.4 Migrating the Glossary to Sanity

The current glossary is a static hardcoded array. To migrate to Sanity:
1. Create a `medicaidTerm` schema in Sanity with fields: `term`, `acronym`, `definition`, `category`
2. Import the 37 terms via Sanity's import tool
3. Replace `TERMS` array with a `client.fetch()` query
4. Remove `"use client"` and convert to a Server Component + pass data to `GlossaryClient`
5. Set `revalidate = 3600` for ISR caching

The `GlossaryClient` component pattern already exists in the main platform glossary at `frontend/app/academy/glossary/GlossaryClient.tsx` — follow that implementation.

### 12.5 Adding the Medicaid Pillar to the RAG System

If the platform adds a dedicated "Medicaid" pillar to the Intelligence section (separate from the current general Medicaid content distributed across Policy, Economics, and Equity pillars):

1. Add `"Medicaid"` to the `pillars` array in `HomeSidebar.tsx`
2. Add the corresponding color scheme (dot, accent, rail) — rose is recommended
3. Add route prefix `/medicaid` to `getPillarForPath()`
4. Add sub-item routes (e.g., `/medicaid/eligibility`, `/medicaid/enrollment`, `/medicaid/policy`)
5. Create the corresponding page files
6. Update `PILLAR_PREFIXES` in `RightSidebar.tsx` to add `"/medicaid": "Medicaid"`
7. The AI will then automatically scope retrieval to the Medicaid pillar when on those routes

### 12.6 Supabase & pgvector — No Schema Changes Required

This release added 1,246 Medicaid nodes to the existing vector store. No new tables, columns, or indexes were created. The existing `documents` table (with `pillar`, `source_type`, `metadata` columns) handles the Medicaid content without modification.

If the vector count in the table grows large enough to affect query latency, consider adding a partial index on `(pillar)` for the Medicaid pillar:
```sql
CREATE INDEX idx_documents_medicaid
ON documents USING ivfflat (embedding vector_cosine_ops)
WHERE pillar = 'Medicaid Eligibility';
```
This is not currently necessary given the corpus size.

---

*End of Amendment v4.11.0*

*This document supplements all prior amendments and the core platform documentation. It does not supersede any prior amendment. For the AI/RAG architecture reference (including the full Medicaid RAG pipeline specification), see `docs/ai-rag-guide.md` (v4.3.0).*
