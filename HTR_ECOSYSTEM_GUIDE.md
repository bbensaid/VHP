# The HTR Ecosystem — Complete Guide
### User Guide · Technical Reference · Operations & Maintenance Manual

**Health Transformation Review (HTR) / Health Transformation Solutions (HTS)**
*Covering the Book, the Platform, and the Academy*

Document version 1.0 — generated 2026-06-20
Applies to: Platform on Next.js 16.2 / React 19, Book manuscript v41, Academy (15 courses / ~90 tracks / ~243 lessons), Research Lab (24 tools)

---

## How to read this guide

This guide serves three audiences, and each Part is self-contained so you can read only what you need:

- **Parts I–IV — Users.** Anyone using the book, the platform, the AI Analyst, or the Academy. No technical knowledge assumed. Written as step-by-step instruction.
- **Parts V–VI — Operators & developers.** Architecture, data model, the taxonomy spine, authentication, and the full environment reference.
- **Parts VII–VIII — Operations & launch.** The maintenance runbook, content operations, the AI corpus, monitoring, the pre-launch checklist, and the go-live runbook.

A reader who only wants to *use* HTR can stop after Part IV. A reader who *maintains or launches* it should read Parts V–VIII.

Throughout, a 🔧 marks a hands-on instruction, a ⚠️ marks an operational hazard, and a 📁 marks a file or code location.

---

## Table of Contents

**Part I — The HTR Ecosystem at a Glance**
1. What HTR Is and Why It Exists
2. The Three Components and How They Connect
3. The Six-Pillar Framework
4. Who HTR Is For

**Part II — The Book**
5. Overview and Structure
6. The Source Files and the Sync Rule
7. Reading the Book on the Platform
8. Audio Narration
9. "Work This Chapter on the Platform"
10. Appendix E and Book↔Platform Alignment

**Part III — The Platform**
11. Navigation and Layout
12. The Six Pillar Hubs
13. The Research Lab — Overview
14. The Research Lab — Tool-by-Tool Walkthroughs
15. The AI Analyst
16. Dashboards, Simulators, and The Wire
17. Accounts, Roles, and Subscriptions
18. Search, Bookmarks, and Personalization

**Part IV — The Academy**
19. Structure: Courses, Tracks, Lessons
20. Using the Academy
21. Getting Started and Learning Paths
22. Certificates and Verification

**Part V — Technical Architecture**
23. System Overview
24. The Frontend
25. The Backend (AI Brain)
26. Data Stores: Supabase and Sanity
27. The Taxonomy Spine
28. Authentication, Roles, and the Proxy
29. Request Flows (Worked Examples)

**Part VI — Environment & Configuration**
30. Environment Variables (Complete Reference)
31. Deployment Topology and Constraints

**Part VII — Operations & Maintenance**
32. Routine Maintenance Cadence
33. Content Operations
34. Adding a Research Lab Tool (Full Checklist)
35. The AI Knowledge Corpus
36. Monitoring and Incident Response
37. Backups and Disaster Recovery

**Part VIII — Launch**
38. Pre-Launch Checklist
39. Go-Live Runbook
40. Post-Launch Operations

**Appendices**
- A. Complete Tool Catalog (all 24 + top-level simulators)
- B. Route Map
- C. Environment Variable Quick Table
- D. Glossary
- E. Maintenance Quick Reference

---
---

# PART I — THE HTR ECOSYSTEM AT A GLANCE

## 1. What HTR Is and Why It Exists

Health Transformation Review (HTR) is an integrated knowledge and analytical system built to support the work of transforming a health system. It is not a single product but an ecosystem of three reinforcing components — a book, a web platform, and an academy — that together let a user learn a concept, see the evidence behind it, and model it against their own organization or state.

HTR uses **Vermont as its primary teaching case.** Vermont is unusually instructive because it is attempting comprehensive, all-payer health system transformation under hard statutory deadlines: Act 167 (2022) initiated the reform cascade; Act 68 (2025) made transformation mandatory; the AHEAD Model brings federal all-payer global budgets beginning January 2028; and a $195M federal Rural Health Transformation (RHT) Program funds the infrastructure. Around this case, HTR layers **national comparative evidence** — Oregon's Coordinated Care Organizations, California's CalAIM, and all 50 states — so that Vermont's specific lessons generalize to any state or system.

The reason the ecosystem exists at all is a single conviction, stated plainly in the book's first chapter: **transformation fails when it is approached one pillar at a time.** Payment reform without clinical redesign produces savings that evaporate when care models do not change. Clinical improvement without payment reform produces better care that the payment system then penalizes. Technology investment without operational readiness produces platforms no one uses. The pillars must move together — and in the right order. HTR is built to teach, evidence, and model exactly that.

## 2. The Three Components and How They Connect

**The Book** — *Transforming American Healthcare: A Six-Pillar Framework for System Transformation.* Sixteen chapters plus front matter and appendices. It is the intellectual foundation: the framework, the dependency logic, the Vermont evidence, and the national comparisons. Everything else in the ecosystem is, in effect, an interactive expression of the book.

**The Platform** — a web application of 184 page routes. It contains six pillar hubs (one per pillar), a Research Lab of 24 interactive analytical tools, an AI Analyst, a 50-state dashboard, several standalone simulators, a daily intelligence feed (The Wire), and the full account/subscription system.

**The Academy** — the executive-education layer: 15 courses organized into roughly 90 tracks and 243 lessons, plus case studies, webinars, a faculty page, a glossary, getting-started guides, and credential paths.

These three are deliberately **cross-linked** so a user moves fluidly among learning, evidence, and modeling:

- **Book → Platform.** Each pillar chapter ends with a "Work This Chapter on the Platform" table that maps the chapter's argument to the specific Research Lab tools that let the reader manipulate it. Reading about EHR feasibility in Chapter 4? The chapter table links you straight to the FHIR Lab, the EMR/EHR Lab, and the Statewide EHR Modeler.
- **Platform → Book.** Pillar hubs and the Research Lab carry "From the Book" callouts and chapter cross-links, so a user exploring a tool can jump to the chapter that explains the concept.
- **Academy → Platform.** Lessons carry "Apply It" callouts that deep-link to the matching tool — for example, the EHR business-case lesson links directly to the EMR/EHR Lab's cost-modeling mode.
- **AI Analyst ↔ everything.** The Analyst is grounded in the book and Vermont source documents and knows the platform's tool catalog, so it can answer a question *and* route the user to the right tool or page.

The mechanism that keeps all of this consistent is the **taxonomy spine** — three canonical lists (pillars, tools, chapters) in `frontend/lib/taxonomy/` against which every surface resolves. When those three lists agree, the ecosystem is aligned. (See §27.)

## 3. The Six-Pillar Framework

Every component of HTR is organized around the same six pillars. They are not arbitrary categories; they form a dependency structure.

| Pillar | The question it answers | What it covers |
|---|---|---|
| **Policy** | Is it mandated? | Legislative architecture, Section 1115 waivers, CMMI models, the federal–state interface, budget neutrality |
| **Economics** | Does it pay? | Global budgets, reference-based pricing, alternative payment models, hospital finance, total cost of care |
| **Technology** | Can we measure it? | Data infrastructure, health information exchange, FHIR interoperability, EHRs, AI governance |
| **Clinical** | Does it improve care? | Care model redesign, risk stratification, quality measurement, care management |
| **Equity** | Does it close gaps? | Disparity measurement, social determinants of health, access, equity-weighted analysis |
| **Operations** | Is it executable? | Workforce, revenue cycle, supply chain, compliance, the administrative cost gap |

**The dependency logic.** Technology and Policy are upstream *gates*. Economics, Clinical, and Equity depend on them — you cannot run a global budget (Economics) for a population you cannot measure (Technology), and you cannot enforce a payment model (Economics) without a policy mandate (Policy). Operations is the execution layer that translates all of the above into organizational reality. The framework's central, testable claim is that **funding a downstream pillar before its upstream gate is open produces a measurable failure cascade** — the exact dynamic that sank earlier reform efforts, and the principle a user can reproduce hands-on in the HTR Simulator.

## 4. Who HTR Is For

HTR is built for the people who make or execute transformation decisions:

- **Health-system executives** (CEOs, CFOs, CMOs, CMIOs) navigating value-based care, technology adoption, and the move to global budgets.
- **Policy analysts and government officials** designing waivers, CMMI applications, and state reform legislation.
- **Health economists and actuaries** modeling payment models, rates, and cost-effectiveness.
- **Clinicians and clinical informaticists** redesigning care and managing risk.
- **Health-technology professionals and investors** evaluating interoperability, AI, and digital health.
- **Students and researchers** studying health system transformation.

The Academy's getting-started flow lets a user declare their role, which personalizes what the platform and AI Analyst surface first.

---
---

# PART II — THE BOOK

## 5. Overview and Structure

**Title:** *Transforming American Healthcare: A Six-Pillar Framework for System Transformation*
**Version:** v41
**Length:** 16 chapters, plus a Preface, an Introduction, and a set of appendices.

The chapters are grouped by pillar, with most pillars getting a "pillar" chapter (the architecture/theory) followed by a "pillar in practice" chapter (implementation):

- **Chapter 1** — The Six-Pillar Framework and the Execution Sequence. The dependency logic and the failure-cascade argument.
- **Chapters 2–3** — The Policy Pillar: legislative architecture for structural reform; then CMMI models, waiver strategy, and the federal–state interface.
- **Chapters 4–5** — The Technology Pillar: data infrastructure (VHCURES, VITL/VHIE, the statewide-EHR feasibility question); then FHIR implementation, AI governance, and clinical decision support.
- **Chapters 6–7** — The Economics Pillar: global budgets, reference-based pricing, financial reform; then VBC financial modeling and APM readiness.
- **Chapters 8–9** — The Clinical Pillar: care delivery redesign; then care-model implementation and quality mechanics.
- **Chapter 10** — The Equity Pillar: closing gaps rather than averaging them.
- **Chapter 11** — The Operations Pillar: executing hospital system transformation, including the administrative cost gap.
- **Chapters 12–16** — Infrastructure for knowledge transfer; the future of transformation; political sustainability across election cycles; healthcare transformation as portfolio management (PMI standards); and the AHS restructuring roadmap.

The appendices include **Appendix E — HTR Platform Tools and Methodology Overview**, which catalogs all 24 Research Lab tools and is the book's canonical bridge to the platform.

## 6. The Source Files and the Sync Rule

The book exists in three forms; understanding which is authoritative is essential for maintenance.

📁 **`HTR_Book_v41.docx`** — the editable manuscript. This is what the author round-trips through Google Docs / Microsoft Word. It is **formatting-sensitive.**
📁 **`HTR_Book_v41.md`** — a Markdown twin of the `.docx`, kept in sync with it.
📁 **`HTR_Book_v41.pdf`** — a derived, distributable output.

⚠️ **The sync rule (critical for maintenance):** when the book changes, edit **both** the `.docx` and the `.md`, with the *same* change, so they never drift apart. The `.docx` must be edited carefully because its formatting is fragile (it is round-tripped through word processors). The `.md` mirrors it. Never edit one and leave the other stale — that creates silent divergence between what's published and what the platform/tools reference. The `.pdf` is regenerated from these when a new distributable is needed.

⚠️ The `.docx` files are **gitignored** (only the `.md` is in version control), so the `.docx` must be backed up separately.

A further distinction that matters: **"the book"** means the manuscript (the `.docx`/`.md`). **"The `/book` page"** means the frontend code that renders the book browser on the platform. They are different things; a change to one is not automatically a change to the other.

## 7. Reading the Book on the Platform

The book is fully integrated into the platform, not merely linked as a download:

- 🔧 **`/book`** — the chapter browser. It lists every chapter with a description, the key concepts introduced, reader-profile guidance ("if you are a hospital executive…"), and the per-chapter platform cross-links. Start here.
- 🔧 **`/read/[slug]`** — the in-app reader for a single chapter. Supports **bookmarking** (save your place / mark a chapter) and **chapter notes** (your own annotations, stored to your account).
- 🔧 **`/book/listen`** — the audio narration player.

The book is also surfaced prominently across the platform: a hero slide on the home page, a pinned entry at the top of the Home Sidebar (with a "New" badge), and a "📖 THE BOOK" link in the header's top bar and the Learn mega-menu.

## 8. Audio Narration

Every chapter has full audio narration so the book can be consumed hands-free.

📁 Audio files (`.m4a`) and their transcripts (`.txt`) live in `frontend/public/audio/narration/`, named in reading order: `00-preface`, `01-introduction`, `02-chapter-01`, through the final chapter. The `/read/[slug]` reader displays the transcript; `/book/listen` plays the audio with chapter navigation.

⚠️ **Operational note:** the narration audio totals roughly **280 MB**. It is served as static CDN assets and is deliberately **excluded from the serverless function bundle** via `outputFileTracingExcludes` in `next.config.ts`. This exclusion is what keeps the `/read/[slug]` deployment under Vercel's 300 MB function-size limit (the route reads the small `.txt` transcripts at runtime, which would otherwise drag all the audio into the function). Do not remove or weaken that exclusion without understanding this constraint (see §31).

## 9. "Work This Chapter on the Platform"

This is the book's signature integration feature and the clearest expression of the ecosystem idea. Each pillar chapter ends with a section titled **"Work This Chapter on the Platform,"** containing a short intro and a table of this form:

| Do this | On this tool | What to look for |
|---|---|---|

Each row maps one of the chapter's arguments to a specific Research Lab tool and tells the reader what insight to look for. For example, Chapter 4 (Technology Pillar) includes rows for the FHIR Interoperability Lab, the Risk Stratification Engine, the EMR/EHR Lab, and the Statewide EHR Deployment Modeler. Chapter 11 (Operations) includes the Transformation Scorecard, the Workforce Modeler, and the Vermont-RHT CIN & Shared Services and EMS Transformation modelers.

This is how a reader moves from *understanding* a concept to *modeling it against their own numbers.* It is also a maintenance obligation: when a tool is added to the platform, the relevant chapter's table — and Appendix E — must be updated to match (see §34).

## 10. Appendix E and Book↔Platform Alignment

**Appendix E** is the book's canonical list of the platform's tools. It states the tool count and enumerates the tools by bench. Because it is canonical, it is the place most likely to go stale when the platform grows, and keeping it current is part of the alignment discipline.

"Alignment" across the ecosystem means three things agree:
1. The **tool registry** (`tools.ts`) — what tools exist.
2. The **chapter tables + Appendix E** in the book — which tools the book references.
3. The **Academy** — where lessons point users to tools.

When all three agree, a reader who learns a concept in the book, looks it up in the Academy, and opens the tool on the platform finds a consistent story. The new-tool checklist in §34 exists precisely to preserve this alignment.

---
---

# PART III — THE PLATFORM

## 11. Navigation and Layout

The platform uses a **sidebar-first** navigation model with three persistent regions plus the main content area.

**Home Sidebar (left)** — the primary navigation. From top to bottom:
- **The Book**, pinned at the top.
- **The six pillars** (Policy, Economics, Technology, Clinical, Equity, Operations), each expandable to its intelligence pages and its Research Lab tools.
- **The Research Lab**, grouped by pillar.
- **The Academy.**
- **Dashboards and simulators.**

Sidebar accordions support multiple sections open at once. The sidebar's tool listings are driven by `labToolIds` arrays in `frontend/components/HomeSidebar.tsx`, which resolve against the tool registry — so a tool only appears in the sidebar if its ID is listed there (a common omission when adding tools; see §34).

**Header (top)** — the brand, the "📖 THE BOOK" link, a "Learn" mega-menu (curated links to pillars, the Research Lab, the Academy, and reference material), and account/login controls.

**AI Analyst (right sidebar)** — a persistent assistant. Collapsed, it's a compact widget; expanded, it becomes a chat panel; or open it full-screen at `/chat`.

**Main content (center)** — the active page.

The layout is fully responsive: on mobile the sidebars collapse into accordions and the AI Analyst becomes a launchable panel.

## 12. The Six Pillar Hubs

Each pillar has a hub page — `/policy`, `/economics`, `/technology`, `/clinical`, `/equity`, `/operations` — generated from one shared template (`PillarOverview`) with per-pillar content from `frontend/lib/data/pillar-topics.ts`. Every hub contains, in order:

1. **A hero** with the pillar's eyebrow, title, and tagline.
2. **A "From the Book" callout** linking to the pillar's chapter.
3. **A topic-card grid** — the sub-topics within the pillar (e.g., Technology's cards: AI & Machine Learning, Digital Health & Telemedicine, Data Security & Governance, Tech-Enabled Workflow). Each card links to a dedicated intelligence page.
4. **A "Tools & Data" footer** — the Research Lab tools relevant to that pillar, plus a link to the full lab.
5. **Latest related editorial / analysis.**

🔧 **To explore a pillar:** open its hub from the sidebar, read the From-the-Book callout for grounding, browse the topic cards for the sub-area you care about, then jump to the linked tools in the footer to model it.

## 13. The Research Lab — Overview

The Research Lab (`/research-lab`) is the analytical core of the platform: **24 interactive tools** that are self-contained, browser-based, and run entirely client-side. They perform real computation (Monte Carlo simulations, Markov models, FHIR resource generation, financial projections) using only inputs you provide through the UI — **no data upload, no PHI, no external dependencies.** Every tool's figures are illustrative planning models, clearly labeled as such, not audited or live data.

The tools are organized into **seven benches**, each its own route:

| Bench | Route | Tools |
|---|---|---|
| Interoperability & Risk | `/research-lab/interoperability` | FHIR Lab, Risk Stratification Engine, EMR/EHR Lab, Statewide EHR Modeler |
| Payment Models & VBC | `/research-lab/payment-models` | APM Design Lab, Shared Savings Calculator, CEA Calculator, Global Budget Transition Modeler |
| Policy & Quality Sciences | `/research-lab/policy-quality` | Policy Simulator, Clinical Quality Optimizer, Hospital Financial Stress Test, HTA Studio, Actuarial Lab, Work Requirements Calculator, H.R. 1 Cliff Scenario |
| Population & Equity | `/research-lab/population-equity` | Population Health Modeler, Health Equity Studio |
| Technology & AI | `/research-lab/technology-ai` | AI Clinical Governance Lab, Digital Health Lab |
| VBC, Clinical & Quality | `/research-lab/vbc-clinical-quality` | Clinical Data Exchange Lab, Risk Stratification Methodology, VBC Quality Measures, High vs. Low Value Care |
| Knowledge & Workspace | `/research-lab/knowledge-workspace` | Transformation Scorecard, VBC Readiness Assessment, Evidence Library, Workforce Modeler, Innovation Leaderboard, Research Workspace, CIN & Shared Services Modeler, EMS Transformation Modeler |

🔧 **Using any tool — the universal pattern:**
1. Open the bench route and click the tool's tab.
2. Read the tool header (it states the tool's purpose and methodology).
3. Adjust the **input controls** on the left/top — sliders, dropdowns, toggles, number fields.
4. Read the **outputs** — stat cards, tables, charts, and (for several tools) a plain-language verdict.
5. Ask the **AI Analyst** to interpret the result.
6. **Bookmark** the tool for return visits.

**Deep-linking:** every tool is addressable via `?tab=<id>` on its bench. Some tools additionally support `&mode=<id>` to open a specific sub-mode (e.g., `/research-lab/interoperability?tab=emr&mode=workflow` opens the EMR/EHR Lab directly in its Workflow Simulator). Academy "Apply It" callouts use these deep links.

The canonical in-app usage guide — who each tool is for, when to use it, one power tip each — is at **`/academy/getting-started/research-lab`.**

## 14. The Research Lab — Tool-by-Tool Walkthroughs

This section walks each tool's purpose, inputs, and outputs. (Tools sharing a bench are grouped.)

### Interoperability & Risk

**FHIR Interoperability Lab** — *for health IT professionals and clinical informaticists.*
Build and validate FHIR R4 resources, map clinical terminologies across ICD-10/SNOMED/LOINC/RxNorm, test CDS Hooks, simulate the CMS prior-authorization workflow, and check ONC compliance. *Use it when* planning a Patient Access or Provider Directory API, or testing FHIR resource design. *Outputs:* spec-compliant FHIR JSON, terminology mappings, compliance checkpoints.

**Risk Stratification Engine** — *for population-health managers and data scientists.*
Apply HCC v28 RAF scoring, segment a population into risk tiers, build custom risk models, and analyze comorbidity interactions (Elixhauser, Charlson). *Use it when* building a risk-stratified care-management program or validating HCC scores. *Outputs:* RAF scores, tier distribution, comorbidity analysis.

**EMR/EHR Lab** — *for CMIOs, health-IT leaders, and hospital finance.* An integrated four-mode tool driven by one vendor selection:
- *Vendor Comparison* — weight interoperability, usability, cost, and ambulatory fit; rank Epic, Oracle Health, MEDITECH, athenahealth.
- *Adoption & Cost* — model implementation cost, go-live productivity dip, and a 5-year cost/benefit table with break-even, using the selected vendor's cost profile.
- *Data Quality* — audit a mock record against the ten USCDI classes, seeded by the vendor's interoperability score.
- *Workflow Simulator* — model a clinician's daily EHR burden by vendor and patient panel; toggle interventions (scribes, ambient AI, templates, team-based care) against the ~360 min/day national benchmark.

**Statewide EHR Deployment Modeler** — *the Act 167 / Oliver Wyman feasibility question.* Model a single statewide EHR versus FHIR interoperability across the existing platforms, scored on 10-year total cost, data timeliness, migration disruption, and vendor lock-in. *Outputs:* side-by-side path comparison and a verdict on whether FHIR makes a statewide migration unnecessary.

### Payment Models & VBC

**APM Design Lab** — design alternative payment models from scratch (episode bundles, global budgets), with benchmark waterfalls and natural-language model recommendations.
**Shared Savings Calculator** — project shared savings/losses under MSSP, ACO REACH, or custom global budgets, with risk corridors and quality withholds.
**CEA Calculator** — cost per QALY, NNT, and break-even for any intervention, compared against ICER/NICE/CMS willingness-to-pay thresholds.
**Global Budget Transition Modeler** — model a state's transition from fee-for-service to a global hospital budget.

### Policy & Quality Sciences

**Policy Simulator** — model 1115 waiver types across state scenarios, design Vermont-style global budgets, and analyze price-transparency policy.
**Clinical Quality Optimizer** — simulate HEDIS measures with NCQA benchmarks, predict CMS Star Ratings, optimize MIPS, and calculate pay-for-performance ROI.
**Hospital Financial Stress Test** — stress-test hospital financials against payer-mix shifts, Medicaid rate cuts, and volume changes, benchmarked against CAH/Rural-PPS/Urban-Tertiary peers; 10-year projection.
**HTA Studio** — budget-impact models, multi-criteria decision analysis, and real Monte Carlo probabilistic sensitivity analysis (1,000 iterations).
**Actuarial Lab** — ACA actuarial value, premium development, adverse-selection modeling, IRA drug-pricing impacts.
**Work Requirements Calculator** — Medicaid coverage loss from work-requirement and eligibility provisions, including administrative-churn effects.
**H.R. 1 Cliff Scenario** — the financial cliff for states and providers under H.R. 1 Medicaid changes.

### Population & Equity

**Population Health Modeler** — Markov disease-progression models, SIR epidemic dynamics, preventable-hospitalization modeling, intervention ROI.
**Health Equity Studio** — disparity analysis across outcomes by race/income/geography, SDOH burden scoring, and the HEROI equity-weighted ICER metric.

### Technology & AI

**AI Clinical Governance Lab** — compare predictive-model performance, detect algorithmic bias (demographic parity, equal opportunity), build governance frameworks, and calculate AI ROI.
**Digital Health Lab** — RPM ROI using CMS CPT codes (99453–99458), telehealth utilization scenarios, patient-engagement comparisons, EHR-interoperability optimization.

### VBC, Clinical & Quality

**Clinical Data Exchange Lab** — annotated HL7 v2 messages (ADT/ORU), FHIR R4 bundles, an HL7↔FHIR bridge, and a USCDI v3 browser, anchored to eight Vermont patient scenarios.
**Risk Stratification Methodology** — step-by-step HCC v28 RAF calculation, a population-tier pyramid, and comparison of ACG/CDPS/Charlson algorithms.
**VBC Quality Measures** — HEDIS measures with numerator/denominator logic, CMS RSRR readmission analysis, AHRQ PQI avoidable-ED classification.
**High vs. Low Value Care** — A1C/BP panel management with shared-savings math, a Choosing Wisely low-value-care scan, and total-cost-of-care decomposition.

### Knowledge & Workspace

**Transformation Scorecard** — score an organization across all six pillars with Vermont AHEAD milestones integrated.
**VBC Readiness Assessment** — a 30-dimension, 6-domain readiness score with prioritized gap analysis and presets (Vermont AHEAD, CAH, advanced system).
**Evidence Library** — searchable library of landmark CEA/CUA studies, CMMI models with lessons learned, and HTR policy briefs.
**Workforce Modeler** — physician/nurse supply-demand projections across specialties, staffing-ratio impacts, turnover costs, rural-incentive modeling.
**Innovation Leaderboard** — rank states, health systems, and payers on transformation/VBC-maturity indices.
**Research Workspace** — save and compare scenarios, build reports from templates, manage citations, export findings.
**CIN & Shared Services Modeler** *(Vermont RHT)* — model the RHT-funded Clinically Integrated Network: shared billing/coding/credentialing/HR/IT and group purchasing across the 14 hospitals against the ~$1,303/discharge administrative cost premium, with break-even.
**EMS Transformation Modeler** *(Vermont RHT)* — model regionalizing Vermont's 31 EMS agencies and community-paramedicine treat-and-refer ED diversion, with the global-budget margin impact of prevented ED visits and admissions.

### Top-level simulators (not on a bench)

**HTR Simulator** (`/htr-simulator`) — score an org or state across all six pillars and watch the dependency cascade. **Transformation Friction Index** (`/transformation-friction-index`) — find the binding-constraint pillar. **Impact Simulation** (`/impact-simulation`). **HTI Dashboard** (`/hti-dashboard`). **Investment Tracker** (`/investment-tracker`). **Medicaid Eligibility Simulator** (`/medicaid-eligibility-simulator`).

## 15. The AI Analyst

The AI Analyst is a retrieval-augmented assistant, available as a right-sidebar widget on every page and full-screen at `/chat`.

**What it can do:**
- Answer questions grounded in the book and Vermont source documents (it retrieves from a curated corpus rather than answering from generic training).
- Recommend and link to the right Research Lab tool or platform page for a question (e.g., "how do I compare EHR vendors?" → the EMR/EHR Lab).
- Help interpret a tool's output.

**How it works (user-relevant):** the Analyst is *retrieval-augmented* — it searches an indexed corpus (the book, Vermont policy documents, the Research Lab documentation) and a structured catalog of every platform page and tool, then composes an answer grounded in what it found. This is why its tool recommendations are accurate and current — provided the catalog and corpus are kept up to date (see §35).

**Access:** the widget is available broadly; full chat is gated to subscribers and above. The frontend `/api/chat` endpoint is a thin proxy to the Python AI backend.

🔧 **Tips:** ask it your real question in plain language; ask it "which tool should I use to…"; after running a tool, paste your result and ask it to interpret. If it ever cannot reach the backend, it returns a clear error rather than a wrong answer.

## 16. Dashboards, Simulators, and The Wire

- **50-State Dashboard** (`/dashboard`, `/dashboard/[state]`, down to `/dashboard/[state]/hospitals/[hospital]`) — hospital-level and state-level transformation data, including RHT participation and financial metrics.
- **HTI Dashboard** (`/hti-dashboard`) — the composite Health Transformation Index across states/systems.
- **HTR Simulator** (`/htr-simulator`) — the flagship six-pillar dependency simulator.
- **State comparisons & spotlights** — `/compare-states`, `/states/[state]`, plus dedicated Vermont, Oregon CCO, and California CalAIM pages.
- **The Wire** (`/the-wire`) — a daily, RSS-driven intelligence feed across all six pillars, with reader comments.

## 17. Accounts, Roles, and Subscriptions

The platform has a tiered access model enforced at the edge by the proxy (see §28). The role hierarchy, lowest to highest:

`free → subscriber → student → professional → advisory → admin`

**What each tier sees (typical):**
- **Free / public** — pillar hubs, the book browser, The Wire, marketing/pricing pages, the AI Analyst widget (limited).
- **Subscriber and above** — the AI Analyst full chat, the dashboards, the HTI dashboard, the advisory hub.
- **Admin** — the `/admin` console: users, access codes, analytics, revenue, role-change log, content ingestion.

**Subscriptions** run through **Stripe**: checkout, the customer billing portal, team checkout, and webhooks (which keep Supabase roles in sync with subscription status). Pricing is at `/pricing`; upgrades at `/upgrade`.

**Account management** lives under `/account`: profile, billing, subscription, bookmarks, courses, developer API keys (with create/rotate/revoke), and referrals.

## 18. Search, Bookmarks, and Personalization

- **Search** (`/search`, `/api/search`) — across platform content.
- **Bookmarks / My Library** (`/saved`, `/account/bookmarks`) — save any page or tool via the bookmark icon; build a personal research center.
- **Role personalization** — setting your role at `/welcome` personalizes what the AI Analyst and getting-started flow surface.
- **Chapter notes** — personal annotations on book chapters, stored to your account.

---

# PART IV — THE ACADEMY

## 19. Structure: Courses, Tracks, Lessons

The Academy (`/academy`) is HTR's executive-education layer, built on a three-level hierarchy:

**Courses → Tracks → Lessons**

- **~15 courses** spanning all six pillars. Examples: Healthcare Interoperability & Data Exchange; AI & Machine Learning in Healthcare; Value-Based Care Fundamentals; Welcome & the HTR Framework.
- **~90 tracks** — a course's sub-modules (e.g., the Interoperability course contains tracks like *Foundations of Interoperability*, *FHIR APIs & Patient Access*, *EHR Systems & Integration*, and *Data Standards Beyond FHIR*).
- **~243 lessons** — the actual content units within tracks.

**Where the data lives (important for maintenance):**
- Course/track/lesson **structure and membership** live in **Supabase** (`courses`, `tracks`, `lessons` tables; each row carries a `pillar`).
- Rich lesson **body content** lives in **Sanity** as `academyModule` documents.
- The link is `lessons.sanity_slug = academyModule._id`. If a lesson's `sanity_slug` resolves to a real Sanity doc, the full rich body renders; if it is null or points to a missing doc, the app falls back to lighter inline content blocks.

## 20. Using the Academy

🔧 **For a learner:**
- **`/academy`** — the landing page: the course catalog and the executive-education framing.
- **`/academy/courses`** and **`/academy/courses/[slug]`** — browse courses and open the course player.
- **`/academy/tracks/[courseSlug]/[lessonSlug]`** — the lesson reader.
- **`/academy/case-studies`**, **`/academy/webinars`** — supplementary content.
- **`/academy/glossary`** and **`/academy/medicaid/glossary`** — terminology references.
- **`/academy/faculty`** — the faculty/authors.

Many lessons include **"Apply It in the [Tool]"** callouts that deep-link to the matching Research Lab tool and mode — turning a concept into hands-on modeling. For example, lessons in the *EHR Systems & Integration* track link to the EMR/EHR Lab's vendor, workflow, and data-quality modes, and a dedicated EHR business-case lesson links to its cost mode.

## 21. Getting Started and Learning Paths

- **`/academy/getting-started`** — the onboarding hub. The recommended first session: (1) set your role at `/welcome`; (2) ask the AI Analyst your real question; (3) read your role guide; (4) explore the Research Lab; (5) bookmark your key tools. Includes role-specific quick-starts for executives, policy analysts, clinicians, economists, health-tech professionals, compliance officers, researchers, and investors.
- **`/academy/getting-started/research-lab`** — the canonical "how to use each tool" guide: who each tool is for, when to use it, and one power tip per tool. This is the user-facing companion to §14 of this manual.
- **`/academy/personalized-learning`** — a tailored learning path that sequences lessons to the learner's role and goals.

## 22. Certificates and Verification

The Academy tracks course completion and issues certificates (`/api/academy/certificates`). Completed certificates are publicly verifiable at **`/verify/[hash]`** (the endpoint is rate-limited at 20 requests/IP/minute to deter scraping). A learner's course progress is visible under `/account/courses`.

---
---

# PART V — TECHNICAL ARCHITECTURE

## 23. System Overview

HTR is a three-tier system spanning two hosts and two managed data services:

```
┌──────────────────────────────────────────────────────────────┐
│  FRONTEND — Next.js 16 (App Router, Turbopack) on Vercel       │
│  184 page routes · 39 API routes · Research Lab · Academy      │
│  proxy.ts at the edge: beta gate · rate limit · auth/roles     │
└───────────────┬───────────────────────────┬──────────────────┘
                │                            │
        ┌───────▼────────┐          ┌────────▼─────────┐
        │  SUPABASE      │          │  SANITY CMS      │
        │  Postgres,     │          │  Article +       │
        │  Auth, RLS,    │          │  academyModule + │
        │  pgvector      │          │  webinar bodies  │
        └───────┬────────┘          └──────────────────┘
                │ (pgvector shared)
        ┌───────▼───────────────────────────────────┐
        │  BACKEND "AI Brain" — FastAPI on Fly.io     │
        │  LlamaIndex RAG · Groq (LLM) · OpenAI (emb) │
        │  hybrid BM25 + vector retrieval (RRF)       │
        └─────────────────────────────────────────────┘
```

The frontend is the user-facing application and the system of record for routing and access control. The backend is a dedicated AI service. Supabase holds structured/relational data and the vector store; Sanity holds long-form editorial content.

## 24. The Frontend

- **Framework:** Next.js 16.2 (App Router, Turbopack), React 19, TypeScript.
- **Styling:** Tailwind CSS with styled-components.
- **Error monitoring:** Sentry (`@sentry/nextjs`); server and React Server Component errors are captured via `instrumentation.ts`.
- **Key locations:**
  - 📁 `frontend/app/` — routes. Page routes are `page.tsx`; API routes are `route.ts` under `app/api/`.
  - 📁 `frontend/components/` — shared components. `components/research/` holds the 24 Research Lab tool components.
  - 📁 `frontend/lib/taxonomy/` — the canonical pillars/tools/chapters spine (see §27).
  - 📁 `frontend/lib/data/` — pillar topics, learning-track data.
  - 📁 `frontend/proxy.ts` — the edge proxy (auth, roles, beta gate).
  - 📁 `frontend/sanity/` — the embedded Sanity Studio (served at `/studio`) and the schema types.
  - 📁 `frontend/next.config.ts` — config, security headers (CSP, HSTS), image remote patterns, `outputFileTracingExcludes`, and `turbopack.root`.
- **Build/verify scripts:** `npm run typecheck`, `npm run lint`, `npm run build`, `npm run bundle:check`, and `npm run smoke` (all of the above together).

## 25. The Backend (AI Brain)

- **Framework:** FastAPI (Python), served by uvicorn.
- **RAG stack:** LlamaIndex core; Groq for the LLM, OpenAI for embeddings; hybrid retrieval (BM25 + vector with reciprocal-rank fusion); sentence-window chunking (window size 3).
- **Vector store:** pgvector inside the Supabase Postgres instance.
- **Knowledge sources:**
  - 📁 PDFs in `backend/data/` — the book, Vermont source documents (Act 167/68, the Wyman Report, the RHT application/budget, 50-state spotlights), and `HTR_ResearchLab_Documentation.pdf`.
  - Sanity CMS content (articles, academy modules), ingested via GROQ.
  - 📁 `backend/platform_catalog.py` — the canonical catalog of every page, tool, and simulator, used to build the AI's tool awareness and the platform card grid.
- **Entry point:** 📁 `backend/main.py`. Health: `GET /health` reports `index_ready`, the active model, embedding model, vector store, and retrieval mode.
- **Indexing:** 📁 `backend/services/indexing.py` ingests PDFs + Sanity at startup and on demand via the ingest endpoint. 📁 `backend/services/catalog_search.py` embeds the catalog so the Analyst can semantically match a question to a tool.
- **The frontend `/api/chat` route is a thin proxy** to `POST /api/chat` on this backend; auth/tier is validated backend-side.

## 26. Data Stores: Supabase and Sanity

**Supabase (Postgres + Auth + pgvector):**
- **Auth & access:** user accounts, `user_roles`, subscription state.
- **Academy:** `courses`, `tracks`, `lessons`.
- **Operational tables:** bookmarks, chapter notes, wire comments, ticker cache, HTI scores, and more.
- **Migrations:** 📁 `supabase/migrations/` — **36 SQL migrations, append-only.** ⚠️ Never edit a shipped migration file; always add a new, higher-numbered one. Editing shipped migrations corrupts the migration history for any environment that already ran them.
- **Security:** Row-Level Security protects user-scoped data. The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and is **server-only** — never expose it to the client.

**Sanity CMS:**
- **Content types:** 22 schema types in 📁 `frontend/sanity/schemaTypes/`, including `policyAnalysis` (articles), `academyModule` (lesson bodies), `webinar`, and case studies.
- **Access:** queried via GROQ; reads are public for published content; writes use `SANITY_API_TOKEN` (server-only).
- **The Academy link:** `lessons.sanity_slug` (Supabase) = `academyModule._id` (Sanity).
- **Studio:** the editing UI is embedded in the app at `/studio`.

## 27. The Taxonomy Spine

📁 `frontend/lib/taxonomy/` is the **single source of truth** that keeps the three components aligned:

- **`pillars.ts`** — the six pillars.
- **`tools.ts`** — the canonical tool registry: each entry is `{ id, label, href, pillars[], chapters?[], desc? }`. Every tool surface (sidebar, hub, book chapter links, AI catalog cross-references) resolves a tool by `id` via `getTool(id)`. This file is also what the book's Appendix E is generated/checked against.
- **`chapters.ts`** — the book's chapters and each chapter's `platformLinks` (the tool IDs that appear in that chapter's "Work This Chapter" table).

The discipline is simple but strict: **a tool is only "real" when it appears consistently in the registry, every navigation surface, the AI catalog, the book chapter tables, and the Academy.** §34 is the checklist that enforces this.

## 28. Authentication, Roles, and the Proxy

📁 `frontend/proxy.ts` (Next 16's renamed "middleware" convention) runs at the edge on every request and performs three checks in order:

1. **Beta gate.** Any visitor without the `htr_beta` cookie is redirected to `/beta` (an access-code wall). Exemptions: `/beta`, `/api/*`, `/studio`, and static assets. ⚠️ **This is currently unconditional** — there is no env switch to disable it. For a public launch it must be removed or made toggleable (see §38).
2. **Rate limiting.** The public `/verify/*` certificate endpoint is limited to 20 requests/IP/minute.
3. **Auth + role enforcement.** For protected prefixes — `/admin`, `/dashboard`, `/chat`, `/hti-dashboard`, `/advisory-hub`, `/account`, `/onboarding` — it reads the Supabase session and compares the user's role against the required tier in the hierarchy `free → subscriber → student → professional → advisory → admin`. To avoid a DB lookup on every request, the resolved role is cached in an HMAC-signed cookie (`MIDDLEWARE_ROLE_SECRET`) for one hour. The `ALLOW_AUTH_BYPASS=true` env flag (default off) opens role-gated routes during beta and must be unset for GA.

Logged-in users hitting `/login` or `/signup` are redirected to `/account`; unauthenticated users hitting a protected route are sent to `/login?from=…`; under-privileged users are sent to `/upgrade?from=…`.

## 29. Request Flows (Worked Examples)

**A public visitor opens a pillar hub (`/technology`):** proxy checks the beta cookie (must be present post-launch) → route is not protected → page renders server-side, pulling pillar content from `pillar-topics.ts` and any editorial from Sanity.

**A subscriber asks the AI Analyst a question:** the chat UI calls `/api/chat` → the proxy confirms the subscriber role → the route proxies to the FastAPI backend → the backend runs hybrid retrieval over the corpus + catalog, composes an answer with the LLM, and streams it back → the UI renders the answer plus any tool/page links.

**A learner opens a lesson:** route loads the Supabase `lessons` row → reads `sanity_slug` → fetches the `academyModule` body from Sanity → renders the rich body (or falls back to inline blocks if the slug doesn't resolve).

**A user subscribes:** Stripe checkout → Stripe webhook hits `/api/stripe/webhook` → the handler updates the user's role in Supabase → the next request's proxy role-check (cache miss) reads the new role and grants access.

---

# PART VI — ENVIRONMENT & CONFIGURATION

## 30. Environment Variables (Complete Reference)

⚠️ Secrets are never committed to git. Set them in the host: Vercel for the frontend, Fly for the backend. Any `NEXT_PUBLIC_*` variable is exposed to the browser — never put a secret value in one.

**Supabase**
- `NEXT_PUBLIC_SUPABASE_URL` *(public)* — project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` *(public)* — anon key; safe client-side, RLS-protected.
- `SUPABASE_SERVICE_ROLE_KEY` *(**secret, server-only**)* — full DB access; bypasses RLS.

**Sanity**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` *(public)*.
- `SANITY_API_TOKEN` *(**secret**)* — content writes/queries.

**AI backend**
- `NEXT_PUBLIC_BACKEND_URL` / `BACKEND_URL` / `PYTHON_BACKEND_URL` — the FastAPI backend address (the frontend `/api/chat` proxy target).
- *(Backend-side)* Groq + OpenAI API keys; the Postgres/pgvector connection string.

**Auth & security**
- `MIDDLEWARE_ROLE_SECRET` *(**secret**)* — signs the role-cache cookie.
- `ALLOW_AUTH_BYPASS` — `"true"` opens role-gated routes; **beta only**, unset for GA.
- `API_KEY_HMAC_SECRET` *(**secret**)* — signs developer API keys.

**Stripe (billing)**
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` *(**secrets**)*.
- `STRIPE_PRICE_*` — price IDs for each tier × interval: `SUBSCRIBER`, `STUDENT`, `PROFESSIONAL`, `TEAM`, each `_MONTHLY` and `_YEARLY`.

**Email & lifecycle**
- `LOOPS_API_KEY` and `LOOPS_TEMPLATE_*` (welcome, digest, payment-failed, survey-results, trial-ending).
- `RESEND_API_KEY`.

**Jobs & feeds**
- `CRON_SECRET`, `DIGEST_SECRET`, `INGEST_SECRET` — shared secrets guarding the cron, digest, and ingest endpoints.
- `TICKER_API_URL`.

**Site**
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_APP_URL` — canonical URLs (redirects, emails; should back `metadataBase`).
- `NODE_ENV`.

## 31. Deployment Topology and Constraints

**Frontend → Vercel.** Build runs `cd frontend && next build`. Config in 📁 `frontend/vercel.json` and the repo-root `vercel.json`.

⚠️ **Two hard-won constraints encoded in `next.config.ts` — do not remove:**
1. **`outputFileTracingExcludes`** keeps `*.m4a`, `*.mp3`, and `*.pdf` out of serverless function bundles. The `/read/[slug]` route reads narration `.txt` files from `public/` at runtime; without this exclusion Next's file tracer pulls all ~280 MB of narration audio into that function, exceeding Vercel's **300 MB function limit** and **failing the deploy.** With it, the function is ~24 MB.
2. **`turbopack.root`** is pinned to the frontend directory because stray `package-lock.json` files exist higher in the tree (home dir, repo root); without the pin, Next infers the wrong workspace root and warns.

**Backend → Fly.io** (authoritative; 📁 `backend/fly.toml`). 📁 `backend/Procfile` and `backend/railway.toml` exist as alternative/fallback descriptors. Full instructions in 📁 `backend/DEPLOYMENT.md`.

**Databases → Supabase** (managed Postgres + auth + pgvector) and **Sanity** (managed CMS) — both SaaS, no self-hosting.

---
---

# PART VII — OPERATIONS & MAINTENANCE

## 32. Routine Maintenance Cadence

| Task | Cadence | How |
|---|---|---|
| Dependency security review | Monthly | `npm audit` (frontend), `pip-audit` (backend). Patch high/critical with direct exposure; transitive build-tooling vulns can be deferred with a note. |
| Supabase backup | ≤ 30 days | Managed PITR + a manual export. |
| Sanity dataset export | ≤ 30 days | Store under `sanity-backups/`. |
| Sentry triage | Weekly | Review open clusters; fix the top recurring errors. |
| Typecheck + lint | Every change | `npm run typecheck`, `npm run lint`. |
| Bundle budget | Every release | `npm run bundle:check` (budget 20 MB; largest chunk < 1.5 MB). |
| Full smoke | Every release | `npm run smoke`. |
| Backend index freshness | After any corpus/catalog change | Restart backend or trigger ingest (see §35). |

## 33. Content Operations

**Editorial / Academy content** lives in Sanity (bodies) and Supabase (structure). The standing rules:

- ⚠️ **Academy seed scripts are upsert-only — they never delete.** To remove a lesson, delete the Supabase row directly, then check all tracks for orphans/dupes.
- ⚠️ After posting a lesson body to Sanity, **set the Supabase lesson's `sanity_slug`** (= the Sanity `_id`) or the app renders thin fallback content instead of the rich body.
- ⚠️ Content-write scripts must live in `frontend/scripts/` (so Node resolves `@supabase/supabase-js`), not `/tmp`.
- ⚠️ **Broken/missing `sanity_slug` links and orphaned modules are sometimes intentional** — content deliberately disconnected because it was unverified and pulled. An audit that flags such a gap is raising a question, not issuing a work order. Never auto-restore or re-link without explicit sign-off and proof the content is verifiable. Editorial content is the owner's domain.

**Editing the book** — edit BOTH `HTR_Book_v41.docx` (carefully; formatting-sensitive) and `HTR_Book_v41.md`, kept in sync; regenerate the `.pdf` when a distributable is needed. Distinguish the **book** (manuscript) from the **`/book` page** (frontend code).

## 34. Adding a Research Lab Tool (Full Checklist)

This is the most cross-cutting operation in the platform; missing a step leaves the tool half-wired. Do all of it:

1. 📁 `frontend/lib/taxonomy/tools.ts` — add the registry entry (source of truth).
2. 📁 `frontend/app/research-lab/<bench>/<Bench>Client.tsx` — add the tab: a TABS entry, a `dynamic()` import, and the render line.
3. 📁 `frontend/app/research-lab/ResearchLabHub.tsx` — add the hub card to the bench's section AND the renderer `case`.
4. 📁 `frontend/components/research/<Tool>.tsx` — build the component (client-side; match the existing tool pattern, including an "illustrative model" disclaimer).
5. 📁 `frontend/components/HomeSidebar.tsx` — add the tool ID to the right pillar's `labToolIds`. **Easily missed** — without it the tool is absent from sidebar nav.
6. 📁 `backend/platform_catalog.py` — add a catalog entry with rich keywords. **Easily missed** — this is what lets the AI Analyst surface and recommend the tool.
7. 📁 `frontend/lib/taxonomy/chapters.ts` — add the tool ID to the relevant chapter's `platformLinks`.
8. 📁 `frontend/lib/data/pillar-topics.ts` — mention it in the pillar's tool footer.
9. 📁 `frontend/app/academy/getting-started/research-lab/page.tsx` — add a who/when/tip guide entry.
10. **The book manuscript** — add the tool to the chapter's "Work This Chapter" table AND Appendix E, in BOTH `.docx` and `.md`.
11. **Tool count** — update the count copy everywhere (currently 24): the hub, getting-started, pillar footers, header mega-menu, home card, advisory page, the AI corpus doc, and Appendix E.

⚠️ **The two most-forgotten surfaces are #5 (sidebar) and #6 (AI catalog).** A tool can pass typecheck and render on its bench while being invisible to navigation and unknown to the Analyst.

After wiring: `npm run typecheck`, lint the new files, confirm the AI catalog parses and matches a sample query, and load the route to confirm it renders.

## 35. The AI Knowledge Corpus

The AI Analyst's knowledge has two maintainable parts:

1. **Tool/page catalog** — 📁 `backend/platform_catalog.py`. A Python list; edit directly. Used for tool recommendation and the platform card grid. Updating this is part of §34.
2. **Document corpus** — PDFs in 📁 `backend/data/` (book, Vermont docs, `HTR_ResearchLab_Documentation.pdf`) plus Sanity content. When a source changes, regenerate its PDF (e.g., via pandoc from the `.md` source) and **re-ingest.**

⚠️ The backend builds its semantic index **at startup**. Editing a catalog or corpus file does not change retrieval until the index rebuilds — restart the backend or trigger the ingest endpoint. Verify with `GET /health` (`index_ready: true`).

> **Worked example — keeping the Analyst current after adding tools:** edit `platform_catalog.py` (catalog) and `backend/data/HTR_ResearchLab_Documentation.md` → regenerate its `.pdf` → restart/re-ingest the backend → confirm a query like "compare EHR vendors" returns the EMR/EHR Lab.

## 36. Monitoring and Incident Response

- **Errors:** Sentry for both tiers; server/RSC errors captured via `instrumentation.ts`.
- **Health checks:** backend `GET /health` (reports `index_ready` and config); frontend `GET /api/health`; in-app `/system-vitals`.
- **Billing:** monitor Stripe webhook deliveries; a failed `/api/stripe/webhook` means roles can drift from subscription status.
- **Common incidents:**
  - *AI Analyst not responding* → check the backend is up (`/health`), `BACKEND_URL` is correct, and the LLM/embedding keys are valid. `/api/chat` returns a clear error if it can't reach the backend.
  - *Users locked out unexpectedly* → check the beta gate and `ALLOW_AUTH_BYPASS` state, and that the role-cache secret is set.
  - *Deploy fails on function size* → something re-introduced large files into a function bundle; verify `outputFileTracingExcludes` (§31).
  - *Lessons show thin content* → a `sanity_slug` is missing or broken (§33).

## 37. Backups and Disaster Recovery

- **Supabase:** managed point-in-time backups plus periodic manual exports; schema reconstructible from `supabase/migrations/`.
- **Sanity:** periodic dataset exports under `sanity-backups/`.
- **Code:** GitHub `bbensaid/VHP`, `main` branch.
- **Book `.docx`:** gitignored — back up separately (round-trips through Google Docs).
- **Recovery order after a total loss:** restore code (GitHub) → restore Supabase (backup + migrations) → restore Sanity (dataset export) → redeploy frontend (Vercel) and backend (Fly) → rebuild the AI index → smoke-test.

---
---

# PART VIII — LAUNCH

## 38. Pre-Launch Checklist

> The one true blocker is the beta gate. Everything in 🔴 must be done before going public.

**🔴 Required**
- [ ] **Disable the beta gate.** As shipped, `proxy.ts` redirects every visitor to `/beta`; the public cannot enter without an access code, and there is **no env switch** for it. Action: add a production toggle (e.g., `NEXT_PUBLIC_PUBLIC_LAUNCH=true`) that bypasses the gate, or remove the gate block. *(Code change required.)*
- [ ] Confirm `ALLOW_AUTH_BYPASS` is **unset** in production (so role-gated routes are actually protected).
- [ ] All required env vars set in Vercel and Fly (§30) — especially Stripe **live** keys and price IDs if billing is live at launch.
- [ ] A green production deploy (the 300 MB function fix and proxy migration are in; confirm the latest build deploys clean).
- [ ] `MIDDLEWARE_ROLE_SECRET` set (role caching + integrity).

**🟡 Strongly recommended (launch quality)**
- [ ] Add `metadataBase` + Open Graph / Twitter card metadata (with a share image) in `app/layout.tsx`, so shared book/platform links render proper previews — important for a public book launch.
- [ ] Add `app/robots.ts` (pointing at the existing `sitemap.ts`) and a favicon / `app/icon`.
- [ ] `npm audit` — patch any directly-exposed high/critical vulns (the current 4 highs are transitive/build-tooling: `vite`, `undici`, `ws`, `form-data`).
- [ ] Rebuild the backend index so the Analyst knows all 24 tools (catalog + corpus current).
- [ ] Logged-out spot check: `/`, `/book`, `/research-lab`, each pillar hub, `/academy`, `/the-wire` all load.

**🟢 Verify-only (already true)**
- [x] No secrets committed to git; no secrets in client components.
- [x] Book, platform, and Academy aligned (24 tools consistent across registry, sidebar, hub, AI catalog, chapter tables, Appendix E).
- [x] Tool counts unified to 24.

## 39. Go-Live Runbook

1. Freeze content; take fresh Supabase + Sanity backups.
2. Set/confirm production env vars; flip the beta-gate toggle off; confirm `ALLOW_AUTH_BYPASS` unset.
3. Deploy frontend (Vercel) and backend (Fly); confirm both healthy (`/api/health`, `/health` with `index_ready: true`).
4. Rebuild/confirm the AI index.
5. Smoke-test public routes logged out, then one full subscriber journey: sign up → pay (Stripe) → access a gated tool/chat.
6. Confirm Stripe webhooks deliver and update roles.
7. Announce.

## 40. Post-Launch Operations

- Watch Sentry closely for the first 24–48 hours.
- Monitor Stripe (new subscriptions, failed payments) and the lifecycle emails (welcome, trial-ending).
- Watch backend latency and `index_ready`.
- Resume the §32 maintenance cadence.
- Since active development is paused: keep the security cadence (monthly `npm audit`/`pip-audit`) even in maintenance mode — dependency CVEs are the main risk to a static deployment.

---
---

# APPENDICES

## Appendix A — Complete Tool Catalog

**Research Lab — 24 hub tools (by bench):**

*Interoperability & Risk:* FHIR Interoperability Lab; Risk Stratification Engine; EMR/EHR Lab; Statewide EHR Deployment Modeler.
*Payment Models & VBC:* APM Design Lab; Shared Savings Calculator; CEA Calculator; Global Budget Transition Modeler.
*Policy & Quality Sciences:* Policy Simulator; Clinical Quality Optimizer; Hospital Financial Stress Test; HTA Studio; Actuarial Lab; Work Requirements Calculator; H.R. 1 Cliff Scenario.
*Population & Equity:* Population Health Modeler; Health Equity Studio.
*Technology & AI:* AI Clinical Governance Lab; Digital Health Lab.
*VBC, Clinical & Quality:* Clinical Data Exchange Lab; Risk Stratification Methodology; VBC Quality Measures; High vs. Low Value Care.
*Knowledge & Workspace:* Transformation Scorecard; VBC Readiness Assessment; Evidence Library; Workforce Modeler; Innovation Leaderboard; Research Workspace; CIN & Shared Services Modeler; EMS Transformation Modeler.

**Top-level simulators & dashboards (registry, not hub cards):** HTR Simulator; Transformation Friction Index; Impact Simulation; HTI Dashboard; Investment Tracker; Medicaid Eligibility Simulator; Six-Pillar Map; The Wire.

> The "24" headline is the count of tool cards in the Research Lab hub. The full `tools.ts` registry total is higher because it also lists the top-level simulators and dashboards above.

## Appendix B — Route Map

| Area | Routes |
|---|---|
| Home / brand | `/` |
| Book | `/book`, `/read/[slug]`, `/book/listen` |
| Pillars | `/policy`, `/economics`, `/technology`, `/clinical`, `/equity`, `/operations` (+ `/[pillar]/[slug]` sub-pages) |
| Research Lab | `/research-lab` + `/research-lab/{interoperability,payment-models,policy-quality,population-equity,technology-ai,vbc-clinical-quality,knowledge-workspace}` |
| AI Analyst | `/chat` (widget everywhere) |
| Academy | `/academy`, `/academy/courses`, `/academy/courses/[slug]`, `/academy/tracks/[courseSlug]/[lessonSlug]`, `/academy/getting-started`, `/academy/getting-started/research-lab`, `/academy/case-studies`, `/academy/webinars`, `/academy/glossary` |
| Dashboards / sims | `/dashboard`, `/dashboard/[state]`, `/dashboard/[state]/hospitals/[hospital]`, `/hti-dashboard`, `/htr-simulator`, `/transformation-friction-index`, `/impact-simulation`, `/investment-tracker`, `/medicaid-eligibility-simulator` |
| The Wire | `/the-wire` |
| Vermont & states | `/vermont-rht-program`, `/vermont-act-167`, `/vermont-act-68`, `/ahead-model`, `/vermont-blueprint`, `/vermont-vcci`, `/vermont-sash`, `/vermont-sdoh`, `/oregon-cco`, `/california-calaim`, `/states/[state]`, `/compare-states` |
| Account / billing | `/account/*`, `/login`, `/signup`, `/pricing`, `/upgrade`, `/welcome` |
| Admin | `/admin`, `/admin/{users,access-codes,analytics,revenue,role-changes,ingest}` |
| CMS | `/studio` |
| Key APIs | `/api/chat`, `/api/search`, `/api/stripe/{checkout,portal,webhook}`, `/api/academy/certificates`, `/api/wire`, `/api/health` |

## Appendix C — Environment Variable Quick Table

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` | Yes | Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | Server DB access |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` | Yes | Sanity client |
| `SANITY_API_TOKEN` | **Secret** | Sanity writes |
| `BACKEND_URL` / `NEXT_PUBLIC_BACKEND_URL` | Mixed | AI backend address |
| `MIDDLEWARE_ROLE_SECRET` | **Secret** | Role-cookie signing |
| `ALLOW_AUTH_BYPASS` | Config | Beta route bypass (unset for GA) |
| `API_KEY_HMAC_SECRET` | **Secret** | Developer API keys |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | **Secret** | Billing |
| `STRIPE_PRICE_*` | Config | Tier price IDs |
| `LOOPS_API_KEY` / `RESEND_API_KEY` | **Secret** | Email |
| `CRON_SECRET` / `DIGEST_SECRET` / `INGEST_SECRET` | **Secret** | Job endpoints |
| `NEXT_PUBLIC_SITE_URL` / `_APP_URL` | Yes | Canonical URLs |

## Appendix D — Glossary

- **AHEAD Model** — CMS all-payer global-budget model; Vermont's Medicare partner to Act 68 (performance year from Jan 2028).
- **Act 167 (2022) / Act 68 (2025)** — Vermont's enabling, then mandatory, transformation legislation.
- **APM** — Alternative Payment Model.
- **CIN** — Clinically Integrated Network.
- **CMMI** — CMS Center for Medicare & Medicaid Innovation.
- **FHIR** — Fast Healthcare Interoperability Resources (HL7 standard).
- **HCC / RAF** — Hierarchical Condition Categories / Risk Adjustment Factor.
- **HTI** — Health Transformation Index.
- **RAG** — Retrieval-Augmented Generation (the AI Analyst's method).
- **RHT** — Rural Health Transformation Program ($195M federal award to Vermont).
- **RLS** — Row-Level Security (Supabase).
- **RRF** — Reciprocal Rank Fusion (hybrid-retrieval ranking).
- **TCOC** — Total Cost of Care.
- **USCDI** — United States Core Data for Interoperability.
- **VHCURES** — Vermont's all-payer claims database.
- **VITL / VHIE** — Vermont's health information exchange.

## Appendix E — Maintenance Quick Reference

| If you… | Do this | Section |
|---|---|---|
| Add a Research Lab tool | Follow the 11-step checklist | §34 |
| Edit the book | Change BOTH `.docx` and `.md`; regenerate `.pdf` | §6, §33 |
| Change AI knowledge | Edit `platform_catalog.py` and/or `backend/data/` PDFs; re-ingest | §35 |
| Change the DB schema | Add a NEW migration (never edit shipped ones) | §26 |
| Remove an Academy lesson | Delete the Supabase row directly (seeds are upsert-only) | §33 |
| Deploy | Vercel (frontend) / Fly (backend); keep `outputFileTracingExcludes` | §31 |
| Go public | Disable the beta gate; run the pre-launch checklist | §38–39 |

---

*End of guide. This document should be updated alongside the platform — in particular the tool count, Appendix A, and §34 — whenever the Research Lab changes. Maintained by the HTR team.*
---
---

# PART IX — WORKED EXAMPLES & EXTENDED REFERENCE

This part adds hands-on, numeric walkthroughs for the most-used tools, end-to-end user scenarios by role, expanded troubleshooting playbooks, and a fuller data-model reference. It is intended for readers who want to see exactly what a tool does with concrete inputs, and for operators who need deeper detail than Parts VII–VIII.

## 41. Worked Tool Examples

Each example gives representative inputs and the kind of output you should expect. (All figures are illustrative — the tools are planning models, not live data.)

### 41.1 EMR/EHR Lab — building an EHR business case

**Scenario:** a 14-hospital system evaluating whether to standardize on a single vendor.

🔧 **Step 1 — Vendor Comparison.** Open `/research-lab/interoperability?tab=emr`. Set the criteria weights to reflect your priorities — e.g., Interoperability 35, Usability 25, Cost 25, Ambulatory fit 15. Observe how the four vendors re-rank: a high interoperability weight favors Epic; a high cost weight favors MEDITECH/athenahealth. Select the vendor you want to carry forward (say, Oracle Health).

🔧 **Step 2 — Adoption & Cost.** Switch to the Cost mode (or open `&mode=cost`). Enter: 14 hospitals, 1,800 providers, a 24-month rollout, $550K average clinical revenue/provider. The tool returns an implementation capex, an annual license/support figure, a modeled go-live productivity dip (a temporary revenue loss as clinicians ramp), and a 5-year cost-vs-benefit table with a **break-even year.** The headline question it answers: *in which year does cumulative benefit overtake cumulative cost?*

🔧 **Step 3 — Data Quality.** Switch to the Data Quality mode. The mock record is seeded by the selected vendor's interoperability score; review which of the ten USCDI classes are complete vs. gapped. Higher-interoperability vendors show fewer gaps.

🔧 **Step 4 — Workflow Simulator.** Set a primary-care panel (e.g., 20 patients/day) and toggle interventions — ambient AI documentation, scribes, template redesign. Watch projected daily EHR minutes move relative to the ~360 min/day national benchmark. This quantifies the "pajama time" burden and the ROI of documentation-burden interventions.

**What you walk away with:** a defensible cost/benefit narrative, a data-quality expectation, and a clinician-burden estimate — the three legs of an EHR decision.

### 41.2 Statewide EHR Deployment Modeler — the Act 167 question

**Scenario:** answering whether Vermont should pursue a single statewide EHR or invest in FHIR interoperability.

🔧 Open `/research-lab/interoperability?tab=statewide-ehr`. Enter the number of participating hospitals and the per-hospital migration vs. integration cost assumptions. The tool produces two paths side by side — *Single statewide EHR* vs. *FHIR interoperability* — each scored on 10-year total cost, data timeliness, migration disruption, and vendor lock-in, and renders a verdict. The pedagogical point (straight from Chapter 4): if FHIR delivers acceptable real-time exchange, the case for a disruptive single-EHR migration weakens.

### 41.3 CIN & Shared Services Modeler — the administrative cost gap

**Scenario:** quantifying the savings from the RHT-funded Clinically Integrated Network.

🔧 Open `/research-lab/knowledge-workspace?tab=cin`. Enter 14 hospitals, total annual discharges, and the administrative cost premium (anchored at ~$1,303/discharge). Toggle which functions to consolidate — billing, coding, credentialing, HR, IT — and set combined group-purchasing volume. The tool returns annual admin savings, group-purchasing savings, the CIN's setup and operating cost, and a **break-even in months.** The lesson: shared services only pay off at sufficient scale; the tool shows where that threshold is.

### 41.4 EMS Transformation Modeler — fragmentation to margin

🔧 Open `/research-lab/knowledge-workspace?tab=ems`. Enter Vermont's 31 EMS agencies, a target number of regions, annual 911 volume, the non-emergent share, and community-paramedicine reach. The tool returns ED visits diverted, admissions prevented, regionalization savings, the program cost, and net annual impact — illustrating how treat-and-refer converts fragmentation into margin under global budgets.

### 41.5 HTR Simulator — the dependency cascade

🔧 Open `/htr-simulator`. Build a profile with strong Economics ambition but weak Technology and Policy scores. The composite readiness collapses — not because the Economics inputs are bad, but because the simulator enforces the dependency logic. Then raise Technology and Policy first and watch the same Economics inputs finally produce a viable score. *That reversal is the central argument of the book, made tangible.*

### 41.6 Hospital Financial Stress Test — surviving the transition

🔧 Open `/research-lab/policy-quality?tab=scorecard`. Select a peer archetype (CAH, Rural PPS, Urban Tertiary), then apply stressors: a payer-mix shift toward Medicaid, a Medicaid rate cut, and a volume decline. The 10-year projection shows the margin trajectory — reproducing the Oliver Wyman finding that most Vermont hospitals reach operating loss under conservative assumptions absent transformation.

## 42. End-to-End Scenarios by Role

**A hospital CFO preparing for AHEAD (Jan 2028):**
1. Read Chapter 6–7 (Economics) via `/book`.
2. Run the Hospital Financial Stress Test to see the baseline trajectory.
3. Run the Shared Savings Calculator and Global Budget Transition Modeler to model the AHEAD environment.
4. Run the CIN & Shared Services Modeler to size administrative savings.
5. Take the VBC Readiness Assessment; export the gap analysis.
6. Ask the AI Analyst to summarize the combined picture.

**A state policy analyst designing a waiver:**
1. Read Chapters 2–3 (Policy).
2. Run the Policy Simulator against a pre-loaded state scenario.
3. Run the Work Requirements Calculator and H.R. 1 Cliff Scenario for coverage impact.
4. Compare against Oregon CCO and California CalAIM pages.

**A CMIO evaluating EHR strategy:**
1. Read Chapters 4–5 (Technology).
2. Work through the EMR/EHR Lab (§41.1) and the Statewide EHR Modeler (§41.2).
3. Take the relevant Academy track (*EHR Systems & Integration*) and the EHR business-case lesson.
4. Validate FHIR readiness in the FHIR Interoperability Lab.

## 43. Extended Troubleshooting Playbook

| Symptom | Likely cause | Resolution |
|---|---|---|
| Public users hit an access-code wall | Beta gate still on | Disable the gate / set the launch toggle (§38). |
| Role-gated route open to everyone | `ALLOW_AUTH_BYPASS=true` in prod | Unset it; redeploy. |
| Users get logged out / role wrong | `MIDDLEWARE_ROLE_SECRET` missing or rotated | Set a stable secret; role cache falls back to DB if absent. |
| AI Analyst returns an error | Backend down / wrong `BACKEND_URL` / bad LLM keys | Check `/health`; verify env; check Groq/OpenAI keys. |
| AI Analyst gives stale tool info | Catalog/corpus not re-indexed | Rebuild index (§35); confirm `index_ready`. |
| New tool missing from sidebar | `labToolIds` not updated | Add the ID in `HomeSidebar.tsx` (§34 step 5). |
| New tool unknown to the Analyst | `platform_catalog.py` not updated | Add the catalog entry (§34 step 6); re-ingest. |
| Lesson shows thin content | `sanity_slug` null/broken | Set/repair the slug (§33). |
| Deploy fails on function size | Large files traced into a function | Verify `outputFileTracingExcludes` (§31). |
| Build warns about workspace root | Stray lockfiles | Confirm `turbopack.root` pin (§31). |
| Shared link shows no preview | `metadataBase`/OG missing | Add OG metadata (§38). |
| Stripe role not updating | Webhook failing | Check `/api/stripe/webhook` deliveries + `STRIPE_WEBHOOK_SECRET`. |
| Book page tool link 404s | `tools.ts` href / chapter link mismatch | Verify the tool id resolves via `getTool` (§27). |

## 44. Extended Data-Model Reference

**Supabase — principal tables (representative):**

| Table | Purpose | Key fields |
|---|---|---|
| `user_roles` | Tier per user | `user_id`, `role` |
| `courses` | Academy courses | `id`, `title`, `slug`, `pillar` |
| `tracks` | Course sub-modules | `id`, `title`, `slug`, `course_id`, `pillar` |
| `lessons` | Lesson units | `id`, `title`, `slug`, `track_id`, `pillar`, `sanity_slug`, `is_published`, `order`, `objectives` |
| `bookmarks` | Saved pages/tools | `user_id`, target ref |
| `chapter_notes` | Book annotations | `user_id`, chapter ref, note |
| `wire_comments` | The Wire comments | thread/comment refs |
| `hti_scores` | Health Transformation Index | state/system scores |
| `ticker_cache` | Cached ticker data | cache rows |

Relationships: `courses 1—* tracks 1—* lessons`. Every level carries `pillar`. The cross-system join is `lessons.sanity_slug → academyModule._id` in Sanity.

**Sanity — principal document types (representative of the 22):** `policyAnalysis` (articles), `academyModule` (lesson bodies), `webinar`, case-study types, plus supporting object/block types. Bodies use a shared block-content schema (portable text) with custom blocks for images, callouts, and embeds.

**The taxonomy spine (code, not DB):** `pillars.ts` (6 entries), `tools.ts` (the tool registry — 24 hub tools + top-level simulators), `chapters.ts` (16 chapters + `platformLinks`). These three files are the contract that the book, platform, and Academy all honor.

## 45. Security Posture Summary

- **Secrets:** never in git; never in `NEXT_PUBLIC_*`; service-role and API tokens are server-only.
- **Transport:** HSTS (2-year max-age, preload), enforced in `next.config.ts` security headers.
- **CSP:** a strict Content-Security-Policy allowlists only the required origins (Supabase, Sanity, Stripe, YouTube/Wikimedia media, OSM tiles, Sentry).
- **Other headers:** `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, a restrictive `Referrer-Policy` and `Permissions-Policy`.
- **Data:** Supabase RLS protects user-scoped rows; the role cache is HMAC-signed and tamper-evident.
- **Rate limiting:** the public verify endpoint is IP-rate-limited.
- **Dependency risk:** the main residual risk in a paused-development posture is dependency CVEs — keep the monthly audit cadence.

---

*End of extended reference. Combined with Parts I–VIII, this guide is the complete user, technical, and operational manual for the HTR ecosystem.*
