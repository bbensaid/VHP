# User Guide — Vermont Health Platform (HTR)

**Audience**: All platform users — new visitors, subscribers, professionals, and advisory clients.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Navigation Overview](#2-navigation-overview)
3. [The Five Pillars — Intelligence Content](#3-the-five-pillars--intelligence-content)
4. [The Wire — Real-Time Feed](#4-the-wire--real-time-feed)
5. [HTR Academy — Learning Center](#5-htr-academy--learning-center)
6. [Research Lab — Analytical Tools](#6-research-lab--analytical-tools)
7. [HTR Simulator](#7-htr-simulator)
8. [50-State RHTP Dashboard](#8-50-state-rhtp-dashboard)
9. [Federal Programs](#9-federal-programs)
10. [State Initiatives](#10-state-initiatives)
11. [AI Analyst](#11-ai-analyst)
12. [Advisory Services](#12-advisory-services)
13. [Connect Hub](#13-connect-hub)
14. [Multimedia Library](#14-multimedia-library)
15. [Trending Topics](#15-trending-topics)
16. [Account & Subscription](#16-account--subscription)
17. [Search](#17-search)
18. [Keyboard Shortcuts](#18-keyboard-shortcuts)

---

## 1. Getting Started

### Creating an Account

1. Click **Subscribe** in the top-right corner of the header, or navigate to `/signup`.
2. Enter your email and create a password.
3. Verify your email address via the confirmation link sent to your inbox.
4. Complete the onboarding flow — select your role (clinician, administrator, policy professional, researcher, etc.) and primary areas of interest.

### Logging In

Navigate to `/login` or click **Login** in the top bar. The platform uses Supabase Auth with secure cookie-based sessions. Sessions persist across browser restarts.

### Subscription Tiers

| Tier | Price | Key Access |
|---|---|---|
| **Free** | $0 | Public pillar pages, academy browsing, limited AI chat |
| **Subscriber** | Monthly/Annual | Full AI Analyst, The Wire, Research Lab, 50-State Dashboard |
| **Professional** | Higher tier | All of above + agentic AI tools, API access |
| **Advisory** | Contact us | All of above + Claude Sonnet AI, advisory engagements |

Visit `/pricing` for current pricing. Billing is managed through Stripe at `/account`.

---

## 2. Navigation Overview

### Header (Top Bar — Black)

The thin black bar at the very top contains:
- **Date** — today's date (left)
- **Daily Insight Ticker** — scrolling real-time healthcare headlines (center)
- **FAQ** — frequently asked questions
- **Company** dropdown — About, Mission, Values, Framework, Methodology, Contact
- **Login / Subscribe** — authentication and conversion (right)

### Header (Main Nav Bar — White)

The white bar below contains the primary navigation:

- **Left sidebar toggle** (☰) — opens/closes the persistent left navigation sidebar
- **HTR Logo** — click to return to the homepage
- **INTELLIGENCE** — mega-menu for all five-pillar content
- **LEARN** — mega-menu for Academy content (courses, webinars, tracks, etc.)
- **ANALYZE** — mega-menu for tools, dashboards, and data (Research Lab, Simulator, RHTP Dashboard, state programs)
- **ADVISE** — mega-menu for advisory services and community
- **Search bar** — always-visible full-width search (`⌘K` shortcut)
- **Dark mode toggle** — switch between light and dark themes
- **Right sidebar toggle** — opens/closes the AI Analyst panel

### Left Sidebar

The left sidebar is persistent across all pages. It provides quick access to the entire platform organized into six sections with an **inline accordion** — clicking a section or pillar header expands it downward in place without navigating away. Multiple sections and pillars can be open simultaneously. Items show a label and icon only (no descriptions).

| Section | Contents |
|---|---|
| **Intelligence** | All 5 pillars, each expandable to show subcategories |
| **Learn** | Personalized Learning, Learning Tracks, Courses, Webinars, Case Studies, Glossary, Faculty (all direct `/academy/*` routes) |
| **Analyze & Tools** | 6 Research Lab sections, HTR Simulator, HTI Dashboard, Multimedia, Trending Topics |
| **States & Programs** | Vermont Act 167, California CalAIM, All States Explorer, AHEAD Model |
| **Advisory & Services** | Advisory Hub, Connect Hub |
| **My Library** | Bookmarks and saved content |

Click any section header to expand it. Click any pillar within Intelligence to expand its subcategories. Multiple sections and pillars stay open simultaneously.

### Right Sidebar

The right sidebar contains the **AI Analyst** — a chat interface for asking questions while staying on any page. Click the right sidebar toggle in the header (or the floating **"Ask AI"** button that appears when the sidebar is closed) to open it.

### Breadcrumbs

A breadcrumb trail appears below the header on all pages, showing your current location and allowing quick navigation to parent sections.

---

## 3. The Five Pillars — Intelligence Content

The five pillars are the core content architecture of the platform. Each pillar has a hub page and four to five subcategory pages.

### Accessing Pillar Content

**Three ways to reach pillar content:**
1. Hover over **INTELLIGENCE** in the header — a mega-menu shows all five pillars side-by-side with their subcategories
2. Click any pillar in the **left sidebar** (expand the accordion to see subcategories)
3. Navigate directly: `/policy`, `/economics`, `/technology`, `/clinical`, `/equity`

### Policy Hub (`/policy`)

Tracks the regulatory and legislative environment for healthcare.

| Subcategory | URL | Focus |
|---|---|---|
| Regulation & Legislation | `/policy/regulation` | CMS rules, state bills, compliance tracking |
| Public Health Mandates | `/policy/mandates` | Emergency orders, vaccine policy, reporting requirements |
| Global & Comparative Policy | `/policy/global` | EU health data, UK NHS reforms, global pharma |
| Policy Feasibility Studies | `/policy/feasibility` | Impact analysis, cost-benefit, stakeholder review |

### Economics Hub (`/economics`)

Covers financial transformation across payers, providers, and the labor market.

| Subcategory | URL | Focus |
|---|---|---|
| Value-Based Care Models | `/economics/value` | APMs, risk adjustment, capitation, global budgets |
| Market & Finance | `/economics/market` | M&A activity, payer-provider dynamics, hospital consolidation |
| Labor & Workforce Strategy | `/economics/cea` | Compensation, burnout, retention, scope-of-practice |
| Healthcare Investment Trends | `/economics/investment` | Digital health funding, PE activity, biotech valuations |

### Technology Hub (`/technology`)

Analyzes the digital transformation of healthcare delivery and operations.

| Subcategory | URL | Focus |
|---|---|---|
| AI & Machine Learning | `/technology/ai` | Generative AI, predictive analytics, NLP |
| Digital Health & Telemedicine | `/technology/digital` | RPM, telehealth platforms, digital therapeutics |
| Data Security & Governance | `/technology/security` | Cybersecurity, HIPAA compliance, interoperability |
| Tech-Enabled Workflow | `/technology/workflow` | RPA, EHR optimization, clinical decision support |

### Clinical Hub (`/clinical`)

Covers innovation in care delivery models.

| Subcategory | URL | Focus |
|---|---|---|
| Hospital-at-Home | `/clinical/hah` | CMS waivers, remote monitoring, logistics |
| Precision Medicine | `/clinical/precision` | Genomics, targeted therapies, biomarkers |
| Genomics & Predictive Medicine | `/clinical/genomics` | Pharmacogenomics, polygenic risk scores, AI early warning |
| Virtual Care Models | `/clinical/virtual` | Virtual nursing, asynchronous care, tele-ICU |
| Population Health | `/clinical/population` | Chronic care management, preventive screenings, risk stratification |

### Equity Hub (`/equity`)

Focuses on disparities and the structural drivers of health outcomes.

| Subcategory | URL | Focus |
|---|---|---|
| SDOH Integration | `/equity/sdoh` | Housing, food security, transportation |
| Algorithmic Bias | `/equity/bias` | AI ethics, bias audits, inclusive data |
| Access Disparity | `/equity/access` | Underserved communities, Medicaid access, safety net |
| Community Engagement | `/equity/community` | CBO partnerships, health literacy, trust building |

### Related Tools on Pillar Pages

Each pillar hub page includes a **"Tools & Data for [Pillar]"** section near the bottom. This surfaces 4 directly relevant tools from the Research Lab, HTR Simulator, and state programs so you never have to hunt for them separately.

---

## 4. The Wire — Real-Time Feed

**URL**: `/` (homepage, below the Quick Start cards)

The Wire is a real-time intelligence feed showing the most recent reports, courses, and webinars published on the platform.

### Filtering

Use the filter chips above the feed to narrow content:

**By Pillar**: All · Policy · Economics · Technology · Clinical · Equity

**By Format**: All Formats · Reports · Courses · Webinars

Filters combine — you can select "Economics" + "Reports" to see only economics reports. If no items match your filters, a "Clear filters" link appears.

### Loading More

Click **Load More Intelligence** at the bottom of the feed to fetch additional items.

---

## 5. HTR Academy — Learning Center

**URL**: `/academy`

The Academy is the platform's learning hub for executive education, structured courses, expert faculty, and AI-powered personalized curriculum.

### Navigation

The `/academy` page is a content-only landing page describing what the Academy offers. Navigation to individual Academy sections is done via the left sidebar's **Learn** section — each entry links directly to its `/academy/*` route. There are no tabs on the `/academy` page itself.

| Section | URL |
|---|---|
| **Personalized Learning** | `/academy/personalized-learning` |
| **Learning Tracks** | `/academy/tracks` |
| **Courses** | `/academy/courses` |
| **Webinars** | `/academy/webinars` |
| **Case Studies** | `/academy/case-studies` |
| **Glossary** | `/academy/glossary` |
| **Faculty** | `/academy/faculty` |

### Personalized Learning (AI-Powered)

Personalized Learning is the flagship Academy feature and the recommended starting point for new users.

**How it works:**

1. **Step 1 — Role**: Select your professional role (Clinician, Hospital Administrator, Health System Executive, Policy Professional, Researcher, Payer/Insurer, etc.)
2. **Step 2 — Topics**: Choose your areas of focus from across the five pillars
3. **Step 3 — Difficulty**: Select your level (Foundational / Intermediate / Advanced)
4. **Step 4 — Schedule**: Set your weekly time budget (1–2 hrs, 3–5 hrs, 5+ hrs)
5. **Step 5 — Goals**: Describe what you want to achieve

The AI then generates a **multi-week structured curriculum** containing:
- Weekly themes and focus areas
- A mix of readings, case studies, and interactive exercises
- **Knowledge check quizzes** with 3 questions per item, complete with explanations
- **Relevance bridges** — personalized 2–3 sentence explanations of why each case study matters for your specific role and goals
- Estimated time per item
- Key concepts to watch for
- Reflection questions

**Saving paths**: Your learning paths are saved to localStorage. You can create multiple paths, continue a saved path, and archive completed ones.

**Audio**: Select items support text-to-speech playback via OpenAI's TTS-1-HD model. Choose from six voices: Alloy, Echo, Fable, Onyx, Nova, Shimmer.

### Learning Tracks

Learning Tracks are pre-built structured programs that group related courses into a coherent progression. Each track shows:
- Total estimated hours
- Number of modules
- Your progress percentage (persisted across sessions)
- A completion status badge

### Courses

Individual deep-dive courses with multiple modules. Navigate to `/academy/courses` to browse all available courses, or click any course tile to begin.

### Webinars

Live and recorded sessions with expert faculty and practitioners. Navigate to `/academy/webinars`. Individual webinar pages at `/academy/webinars/[slug]`.

### Case Studies

Real-world transformation stories. Navigate to `/academy/case-studies` to browse all available case studies.

### Glossary

A searchable reference of healthcare terminology. Navigate to `/academy/glossary` or click any term for its definition page at `/academy/glossary/[term]`.

### Faculty

A directory of expert instructors, advisors, and practitioners featured in HTR Academy content. Navigate to `/academy/faculty`.

---

## 6. Research Lab — Analytical Tools

**URL**: `/research-lab`

**Access**: Subscriber tier and above.

The Research Lab contains 19 interactive analytical tools organized across six categories. These are not static pages — they are live models you can manipulate with real inputs.

### Tool Categories

| Category | URL | Tools |
|---|---|---|
| **Payment Models** | `/research-lab/payment-models` | Global budget modeler, APM design tool, risk adjustment calculator, capitation rate builder |
| **Policy Quality** | `/research-lab/policy-quality` | Policy impact model, feasibility scoring, legislative tracker |
| **Population & Equity** | `/research-lab/population-equity` | Risk stratification, chronic care analytics, SDOH mapping, disparity dashboards |
| **Technology & AI** | `/research-lab/technology-ai` | AI adoption ROI, workflow automation modeler, EHR optimization |
| **Interoperability** | `/research-lab/interoperability` | FHIR Lab, API testing tool, data standards analysis |
| **Knowledge Workspace** | `/research-lab/knowledge-workspace` | Custom research workspace |

### Using the Tools

Each tool accepts inputs relevant to your organization or scenario (e.g., patient volume, current payment mix, geography) and returns calculated outputs, often with chart visualizations and downloadable summaries.

> **Note**: The AI Analyst (right sidebar) is aware of Research Lab tools. If you describe a problem, the AI can recommend which specific tool to use and link you to it.

---

## 7. HTR Simulator

**URL**: `/htr-simulator`

The HTR Simulator is a five-pillar scenario modeler that scores a healthcare transformation strategy across all five dimensions simultaneously. The `/htr-simulator` page is a **flat, scrollable content page** — there are no tabs. All content (framework overview, scoring model, use cases, methodology) is presented on a single scrollable page.

### How It Works

1. **Describe your scenario** — enter details about a health system, a proposed initiative, or a hypothetical transformation
2. **The simulator evaluates across five dimensions**:

| Dimension | What It Assesses |
|---|---|
| **Policy Alignment** | Enabling legislation, CMS waivers, regulatory readiness |
| **Technology Modernization** | EHR maturity, HIE connectivity, telehealth, analytics capability |
| **Financial Sustainability** | Margin trajectory, capital needs, revenue model transition risk |
| **Health Equity** | Access gaps, disparity data, SDOH integration |
| **Clinical Quality** | Outcomes performance, care model design, safety culture |

3. **Receive a scored output** — each pillar is rated, with an overall transformation readiness score and specific recommendations for improvement

The Simulator is particularly useful for:
- Pre-planning a value-based care transition
- Assessing readiness for a CMS innovation model application
- Stress-testing a strategic plan against all five pillars before board presentation

---

## 8. 50-State RHTP Dashboard

**URL**: `/dashboard`

**Access**: Subscriber tier and above.

The dashboard provides hospital-level performance data for all participants in the **Rural Health Transformation Program (RHTP)** — a landmark CMS initiative stabilizing rural safety-net hospitals through global budgets.

### Dashboard Features

**Overview** (`/dashboard`):
- 50-state performance index map
- State-level rankings
- Program-wide trend charts

**State Profiles** (`/dashboard/[state]`):
- Individual state performance scores
- Hospital-level breakdown
- Initiative status and award amounts
- Key metrics: cost index, quality score, access score, equity score, innovation score, preventive care rate, uninsured rate

**State Comparison** (`/dashboard/compare`):
- Side-by-side comparison of up to multiple states

**Vermont-Specific** (`/dashboard/vermont`):
- Deep Vermont profile
- Individual hospital pages at `/dashboard/vermont/[hospital]`

### Performance Metrics Explained

| Metric | Definition |
|---|---|
| **Overall Score** | Composite HTR Performance Index (0–100) |
| **Cost Index** | Total cost of care relative to national median |
| **Quality Score** | Clinical outcomes and patient safety composite |
| **Access Score** | Geographic and insurance access to care |
| **Equity Score** | Disparity reduction and SDOH integration |
| **Innovation Score** | Technology adoption and care model transformation |
| **Preventive Care Rate** | % of eligible patients receiving recommended screenings |
| **Uninsured Rate** | % of state population without health coverage |

---

## 9. Federal Programs

### Rural Health Transformation Program (RHTP)

**URL**: `/dashboard`

The RHTP is a CMS initiative designed to stabilize the rural safety net through global budgeting and care delivery reform. Since 2010, over 140 rural hospitals have closed; RHTP provides financial stability and technical assistance to keep doors open.

**Key Program Pillars**:
- **Global Budgets**: Moving hospitals from fee-for-service to prospective payment
- **Regional Collaboration**: Hub-and-spoke networks sharing administrative and clinical resources
- **Service Line Optimization**: Aligning offerings with community needs

### AHEAD Model

**URL**: `/ahead-model`

The **All-payer Health Equity Approaches and Development (AHEAD) Model** is a CMS Center for Medicare & Medicaid Innovation (CMMI) model operating in six states. It is a total cost of care model designed to:
- Align all payers (Medicare, Medicaid, commercial) around a shared per-capita budget
- Reduce spending growth while improving quality
- Address health equity systematically

The platform provides detailed analysis of AHEAD program mechanics, participating state performance, and implications for hospital strategy.

---

## 10. State Initiatives

### Vermont Act 167

**URL**: `/vermont-act-167`

Vermont Act 167 is landmark legislation governing hospital transformation in Vermont. The platform provides:
- Full legislative analysis
- The Oliver Wyman Report — an independent assessment of Vermont hospital system sustainability
- Transformation pathway options for Vermont hospitals
- Intersection with the AHEAD Model and RHTP

### California CalAIM

**URL**: `/california-calaim`

CalAIM is California's $6.7 billion Medi-Cal transformation initiative — the largest state Medicaid transformation program in U.S. history. The platform covers:
- Whole-person care framework
- Enhanced Care Management (ECM) program mechanics
- Community Supports (housing, food security, transportation)
- Equity provisions and SDOH integration
- Implications for other states considering similar programs

### All States Explorer

**URL**: `/states`

A 50-state interactive explorer of health reform initiatives including Medicaid waivers, public option proposals, global budget pilots, and state innovation models. Filter by initiative type, program status, or region.

---

## 11. AI Analyst

The AI Analyst is an embedded chat interface available on every page of the platform. It is powered by the HTR RAG (Retrieval-Augmented Generation) system — meaning it answers questions using the platform's actual content, not generic internet knowledge.

### Accessing the AI Analyst

**Three ways to open it:**
1. Click the **right sidebar toggle** (≡ icon on the right side of the header)
2. Click the floating **"Ask AI"** button (bottom-right corner of the screen, visible when the sidebar is closed)
3. Navigate to `/chat` for the full-screen chat experience

### What the AI Analyst Knows

The AI is trained on all platform content including:
- All five-pillar reports and analysis
- Academy modules, case studies, and glossary terms
- Analyst notes and market intelligence
- Webinar transcripts
- State program data (Vermont, California, 50-state index)

### AI Tiers

| Your Role | Model | Capability |
|---|---|---|
| Free / Student | Llama 3.1 8b (Groq) | Basic RAG chat |
| Subscriber / Professional | Llama 3.3 70b (Groq) | Full RAG chat |
| Advisory / Admin | Claude Sonnet 4.6 (Anthropic) | Full chat + agentic tools |

### Agentic Tools (Advisory/Admin Only)

Advisory and Admin users have access to an AI **agent** that can use tools during a conversation:

- **State Metrics Tool** — retrieves live HTR Performance Index scores for any state by name
- **Research Lab Tool Finder** — finds and links to specific Research Lab tools based on a described problem

### Tips for Better Answers

- **Be specific**: "What are the financial implications of global budgets for critical access hospitals in Vermont?" will get a better answer than "tell me about global budgets"
- **Reference context**: "Based on the CalAIM model, what SDOH strategies could Vermont adopt?" works well because both CalAIM and Vermont content are indexed
- **Ask follow-ups**: The AI maintains conversation context within a session
- **Use "Ask AI" inline**: When reading a pillar page or report, open the right sidebar and ask follow-up questions without leaving the page

### Expand to Full Chat

In the right sidebar, click the **expand button** (four-arrows-out icon, `ArrowsPointingOutIcon`) to open the full `/chat` page.

### Full Chat Page

Navigate to `/chat` for a full-screen chat experience with more display space. The full chat page disables the sidebars to maximize the chat area. **Save** and **Clear** buttons are always visible in the chat header. To collapse back to the right sidebar and return to the previous page, click the **collapse button** (four-arrows-in icon, `ArrowsPointingInIcon`) in the header.

---

## 12. Advisory Services

**URL**: `/advisory`

HTR Advisory provides eight practice areas of strategic consulting grounded in the five-pillar intelligence framework.

### Practice Areas

| Service | URL | Description |
|---|---|---|
| **Strategic Consulting** | `/advisory/consulting` | Full enterprise health transformation strategy |
| **Custom Research & Analysis** | `/advisory/research` | Bespoke policy, economics, and clinical research |
| **Financial Audit & Reimbursement** | `/advisory/financial-audit` | Revenue cycle, cost structure, reimbursement strategy |
| **Regulatory & Compliance Counsel** | `/advisory/regulatory` | CMS rules, state regulations, compliance gap analysis |
| **IT Consulting & Implementation** | `/advisory/it-consulting` | EHR strategy, interoperability, digital health program management |
| **Capability Assessment** | `/advisory/capability-assessment` | Organizational readiness for transformation |
| **Training & Executive Education** | `/advisory/training` | Custom executive programs and team training |
| **Independent Review & Validation** | `/advisory/independent-review` | Third-party assessment of strategies, reports, or proposals |

### How Engagements Work

1. **Discovery Call** (Week 1): Define challenge, objectives, and key questions. No obligation — we assess fit and suggest the right service.
2. **Engagement Design** (Weeks 1–2): Tailored methodology, team, timeline, and deliverables. You approve scope before work begins.
3. **Analysis & Delivery** (Weeks 3–12): Structured work sprints with interim briefings. Transparent throughout.
4. **Ongoing Advisory** (Optional): Many clients convert to a quarterly retainer for continuous counsel.

### Why HTR Advisory vs. Big Consulting Firms

- **Embedded Intelligence**: HTR advisors publish the same content they consult on daily. When CMS releases a final rule, the analysis is ready before the discovery call.
- **Non-Partisan Framework**: No vendor relationships, no preferred referral partners, no political donors.
- **Speed to Insight**: Policy briefs in 2 weeks, project assessments in 4 weeks, financial reviews in 6 weeks.

**Book a discovery call**: `/advisory/contact`

### Advisory Reports

**URL**: `/advisory/reports`

Published research from HTR Advisory — policy briefs, market analyses, financial models, and strategic frameworks available to subscribers.

---

## 13. Connect Hub

**URL**: `/connect-hub`

The Connect Hub is the community and networking layer of the platform. It facilitates peer connections among healthcare leaders, policymakers, and researchers across the HTR network.

Features include:
- Peer cohorts organized by role and interest
- Office hours with faculty and advisors
- Toolkits and shared resources
- Grant finder
- Pillar circles — discussion forums organized by the five pillars
- "Ask HTR" — direct question channel to the editorial team

---

## 14. Multimedia Library

**URL**: `/multimedia`

A curated library of video content, presentations, and infographics covering all five pillars. Content types include:
- Video briefings from HTR analysts
- Slide decks from webinars and conferences
- Infographic summaries of complex policy changes
- Data visualizations and charts

---

## 15. Trending Topics

**URL**: `/trending-topics`

A real-time view of the most active and discussed topics across the platform and in the broader healthcare policy ecosystem. Updated continuously based on:
- Content publication velocity
- AI Analyst query patterns
- External signal monitoring

The **Trending by Pillar** strip on the homepage surfaces the top trending topic in each of the five pillars, updated daily.

---

## 16. Account & Subscription

### Managing Your Account

Navigate to `/account` to:
- Update your profile (name, role, avatar)
- View your current subscription plan
- Access billing and payment history
- Manage API keys (if on Professional tier or above)

### Changing Your Subscription

- **Upgrade**: Visit `/pricing` or `/upgrade` to move to a higher tier
- **Billing portal**: Stripe manages all billing. Access via `/account` → Billing, which redirects to the Stripe customer portal where you can update payment methods, view invoices, or cancel

### Password Reset

Navigate to `/forgot-password`. An email will be sent with a reset link. The reset flow completes at `/reset-password`.

---

## 17. Search

### Global Search Bar

The search bar is always visible in the header. Type your query and press **Enter** or click **Search**. Results appear at `/search?q=[your query]`.

### What Gets Searched

- Reports and articles
- Academy courses, modules, and webinars
- Glossary terms and definitions
- Case studies
- Faculty names and bios
- State program pages

### Command Palette

Press **⌘K** (Mac) or **Ctrl+K** (Windows/Linux) from anywhere on the platform to open the Command Palette — a quick-access overlay for searching and navigating without using the mouse.

---

## 18. Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `Escape` | Close Command Palette / clear search input |
| `Enter` | Submit search query |

---

## Frequently Asked Questions

**Q: I can't access the Research Lab / Dashboard.**
A: These features require a Subscriber tier or above. Visit `/pricing` to upgrade.

**Q: The AI Analyst says "Connection error."**
A: The Python backend server is not running. If you are a developer, start it with `cd backend && source venv/bin/activate && uvicorn main:app --reload --port 8000`. If you are a user, this is a platform infrastructure issue — contact support.

**Q: My Personalized Learning path disappeared.**
A: Learning paths are stored in your browser's localStorage. Clearing browser data or switching browsers/devices will remove saved paths. In a future release, paths will be saved server-side to your account.

**Q: How current is the intelligence content?**
A: Content is published continuously by the HTR editorial team and synced in real-time from Sanity CMS. The Daily Insight Ticker in the header reflects the most recent headlines.

**Q: Can I access the platform API programmatically?**
A: Yes, the HTR Developer API is available on Professional tier and above. See the `/developers` page for documentation and API key management.
