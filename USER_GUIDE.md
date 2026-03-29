# Health Transformation Review — User Guide

> Policy, Economics, and Technology at the Nexus of Healthcare Reform.

---

## What is HTR?

The Health Transformation Review (HTR) is an intelligence platform for healthcare professionals, policy makers, economists, and clinical leaders. It delivers:

- Deep analysis across five policy pillars
- A state-by-state health transformation dashboard
- Academy courses with certificates and CME credits
- An AI Analyst powered by a proprietary knowledge base
- Live news intelligence and weekly digest emails

---

## The Five Pillars

All content is organized into five research pillars, each with subcategories:

| Pillar | Subcategories |
|--------|---------------|
| **Policy** | Regulation & Legislation, Public Health Mandates, Global & Comparative Policy, Policy Feasibility Studies |
| **Economics** | Value-Based Care Models, Market & Finance, Labor & Workforce Strategy, Healthcare Investment Trends |
| **Technology** | AI & Machine Learning, Digital Health & Telemedicine, Data Security & Governance, Tech-Enabled Workflow |
| **Clinical** | Hospital-at-Home, Precision Medicine, Virtual Care Models, Population Health |
| **Equity** | SDOH Integration, Algorithmic Bias, Access Disparity, Community Engagement |

---

## Creating Your Account

1. Go to `/signup`
2. Enter your email and choose a password
3. Verify your email address
4. Complete onboarding at `/onboarding`
5. You start on the **Free** tier with access to public content

---

## Subscription Plans

| Plan | Monthly | Yearly | What You Get |
|------|---------|--------|--------------|
| **Free** | $0 | $0 | Public articles and browsing |
| **Subscriber** | $29/mo | $23/mo | All analysis + AI Analyst + Dashboards + Digest |
| **Student** | $49/mo | $39/mo | Everything in Subscriber + Academy courses + Certificates |
| **Professional** | $99/mo | $79/mo | Everything in Student + Certification tracks + CME credits + Downloadable datasets |
| **Advisory** | Custom | Custom | Dedicated analyst partner, custom reports, direct team access |

Yearly plans save approximately 20%. Visit `/pricing` to subscribe.

### Upgrading Your Plan

1. Go to `/pricing` and click the plan you want
2. You will be redirected to Stripe's secure checkout
3. After payment, your account is upgraded instantly
4. Manage your billing and cancel anytime at `/account/subscription`

---

## Navigating the Platform

### Header

The header has two rows:

**Top bar** — date, live news ticker (Policy/FDA/CMS headlines), FAQ link, Company menu, Login, Subscribe button.

**Navigation bar** — sidebar toggles (left and right), HTR logo, five pillar dropdown menus, search bar (⌘K), mobile menu.

### Left Sidebar

The left sidebar is a collapsible navigation panel. Toggle it with the icon on the left side of the nav bar. On mobile it overlays the page; on desktop it slides in without obscuring content.

The sidebar is organized into six sections with an inline accordion — clicking a section or pillar header expands it downward in place. Multiple sections and pillars can be open simultaneously. Items show a label and icon only (no descriptions).

| Section | Contents |
| --- | --- |
| **Intelligence** | Five pillars (Policy, Economics, Technology, Clinical, Equity), each expandable to show subcategories |
| **Learn** | Personalized Learning, Learning Tracks, Courses, Webinars, Case Studies, Glossary, Faculty (all direct `/academy/*` routes) |
| **Analyze & Tools** | 6 Research Lab sections, HTR Simulator, HTI Dashboard, Multimedia, Trending Topics |
| **States & Programs** | Vermont Act 167, California CalAIM, All States Explorer, AHEAD Model |
| **Advisory & Services** | Advisory Hub, Connect Hub |
| **My Library** | Bookmarks and saved content |

### Right Sidebar — Inline AI Chat

The right sidebar contains a compact version of the AI Analyst. You can ask quick questions without leaving your current page. For a full-featured experience, click the **expand button** (four-arrows-out icon, `ArrowsPointingOutIcon`) to open the full `/chat` page.

- Type your question and press Enter (or Shift+Enter for a new line)
- Press Stop to interrupt a long response
- Click the trash icon to clear the conversation

### News Ticker

The ticker strip below the header shows live headlines from KFF Health News, FDA news, and CMS news. It refreshes every 5 minutes. You can toggle it on/off with the button at its left edge.

### Search

- Click the search bar or press **⌘K** (Mac) / **Ctrl+K** (Windows) to open the command palette
- Or click the search bar in the header and press Enter to go to the full search page
- Searches across: articles, policy analyses, academy modules, glossary definitions, case studies, and analyst notes

---

## The AI Analyst

The AI Analyst is available to **Subscriber, Student, Professional, and Advisory** plan members.

### Accessing the AI Analyst

- **Quick access**: Right sidebar on any page
- **Full access**: Navigate to `/chat`

### How It Works

The AI Analyst is backed by a Retrieval-Augmented Generation (RAG) system. When you ask a question, the system:

1. Searches the HTR knowledge base for the most relevant content
2. Feeds that context to the AI model along with your question
3. Streams the response back in real time, citing specific documents where relevant

The knowledge base includes:
- Vermont Act 167 documentation
- Vermont AHEAD Model materials
- Health Economics research (Wyman Report and others)
- All HTR policy analyses, academy modules, case studies, reports, and glossary definitions published in Sanity

### Using the Full Chat Page (`/chat`)

- Type your question in the input bar and press **Enter** to send
- Press **Shift+Enter** for a new line without sending
- Click **Stop** to interrupt a streaming response
- Click **Regenerate** to get a new answer to your last question
- Click the **copy** icon to copy any AI response
- Use thumbs up/down to rate responses
- Click **Download transcript** to save the conversation as a text file
- After each response, **follow-up question suggestions** appear in the left panel — click any to continue the conversation
- Conversation history is saved in your browser's local storage and survives page reloads
- **Save** and **Clear** buttons are always visible in the chat header
- To return to the previous page with the right sidebar open, click the **collapse button** (four-arrows-in icon, `ArrowsPointingInIcon`) in the header

### Prefilling a Question

From any article page, if a "Ask the Analyst" button is available, clicking it opens `/chat` with the question pre-filled and automatically submitted.

### Advisory Tier

If you are on the Advisory plan, the AI Analyst uses an enhanced system prompt that provides deeper strategic analysis, quantitative benchmarking, and actionable recommendations tailored to organizational implementation, with comparative case studies and multi-state examples.

---

## State Dashboards

Visit `/dashboard` for the national map overview, or `/dashboard/[state]` for a specific state.

Vermont is the primary focus state with detailed data including:
- Hospital-level performance (`/dashboard/vermont/hospitals`)
- NVRH (North Country Hospital) specific data (`/dashboard/vermont/hospitals/nvrh`)
- State performance index scores

The `/states` page lists all states with their RHT program profiles, award amounts, and initiative status.

---

## HTR Academy

The Academy (`/academy`) is available to **Student** plan members and above. The `/academy` page is a content-only landing page — navigation to individual Academy sections is done via the left sidebar's **Learn** section, not through tabs on the page itself.

### What's in the Academy

- **Personalized Learning** (`/academy/personalized-learning`) — AI wizard that builds a custom multi-week curriculum
- **Courses** (`/academy/courses`) — structured multi-module learning programs
- **Modules** (`/academy/modules/[slug]`) — individual learning units with objectives, body content, and knowledge checks
- **Case Studies** (`/academy/case-studies`) — real-world healthcare transformation examples
- **Webinars** (`/academy/webinars`) — recorded and upcoming events with registration links
- **Learning Tracks** (`/academy/tracks`) — curated learning paths (e.g., Policy Track, Economics Track)
- **Glossary** (`/academy/glossary`) — searchable definitions for healthcare transformation terms
- **Faculty** (`/academy/faculty`) — instructor profiles

### Module Structure

Each academy module has:
- A **pillar** classification
- A **level** (Foundational, Intermediate, Advanced)
- **Learning objectives** (what you will be able to do after completing it)
- **Estimated read time**
- **Previous/Next module** navigation
- A **knowledge check** quiz

---

## Research Tools

### HTR Simulator (`/htr-simulator`)

The HTR Simulator is the platform's policy simulation engine — a multi-pillar decision-support tool for modeling the downstream consequences of healthcare transformation decisions before they are implemented.

The `/htr-simulator` page is a flat, scrollable content page covering the simulator's Overview, 5-Pillar Framework, Simulation Engine mechanics, Use Cases index, and Methodology. There are no tabs — all content scrolls on a single page.

**Content areas (scrollable sections):**

- **Overview** — What the simulator is, its six core capabilities, and who it is designed for
- **5-Pillar Framework** — Full explanation of the scoring model across Policy Alignment, Technology Modernization, Financial Sustainability, Health Equity, and Clinical Quality
- **Simulation Engine** — How recommendations are scored, aggregated into scenarios, and projected onto institutions and geographies
- **Use Cases** — Index of configured simulation instances. Vermont Act 167 is the live use case; California CalAIM, Oregon CCO, and CMS Rural Health Transformation are planned
- **Methodology** — Data sources, scoring assumptions, and limitations

**Relationship to use case pages:** The HTR Simulator page contains all generic, educational content about the framework. Individual use case pages (e.g., `/vermont-act-167/simulator`) go directly into the simulation with context-specific data — they do not repeat the framework documentation.

Access via: the **HTR Simulator** entry in the left sidebar under Analyze & Tools, or directly at `/htr-simulator`.

---

### AHEAD Model (`/ahead-model`)
Vermont's All-Payer Claims Database and AHEAD model analysis.

### Vermont Act 167 (`/vermont-act-167`)
Deep analysis of Vermont's landmark health reform legislation. Includes the Act 167 Policy Simulation Engine (`/vermont-act-167/simulator`) — a use case instance of the HTR Simulator configured with Vermont-specific hospital data, financial projections, and the Oliver Wyman Report recommendations.

### California CalAIM (`/california-calaim`)
Analysis of California's Medi-Cal transformation initiative.

### Research Lab (`/research-lab`)
19 interactive analytical tools organized into 6 sections. The `/research-lab` page is a content page describing the six lab sections; individual section pages (`/research-lab/[section]`) contain the interactive tools and use a raised folder-tab UI to select among tools within a section.

**How to navigate:**

- Access a section directly from the left sidebar under Analyze & Tools, or navigate to `/research-lab/[section]`
- Within a section page, use the **raised folder tabs** at the top to select a specific tool

| Section | Tools |
| --- | --- |
| **Interoperability & Risk** | FHIR Interoperability Lab, Risk Stratification Engine |
| **Payment Models & VBC** | APM Design Lab, APM Shared Savings Calculator, Cost-Effectiveness Analysis Calculator |
| **Population & Equity** | Population Health Modeler, Health Equity Studio |
| **Policy & Quality Sciences** | Policy Simulator, Clinical Quality Optimizer, Hospital Financial Scorecard, HTA Studio, Actuarial Lab |
| **Technology & AI** | AI Analytics Lab, Digital Health Lab |
| **Knowledge & Workspace** | Evidence Library, Workforce Modeler, Innovation Leaderboard, Research Workspace |

The section sub-URLs (`/research-lab/policy-quality`, etc.) remain valid for direct linking but the full two-level experience lives at `/research-lab`.

### HTI Dashboard (`/hti-dashboard`)
Health Transformation Index timeseries data and charts.

### HTR Index (`/htr-index`)
HTR performance index scoring and methodology.

---

## Account Management

| Page | What You Can Do |
|------|-----------------|
| `/account` | Overview of your account and plan |
| `/account/profile` | Update your name and avatar |
| `/account/billing` | View billing history |
| `/account/subscription` | View plan, cancel, or upgrade |
| `/account/courses` | View your enrolled Academy courses |

---

## Email Digest

Subscribers with an active account receive a weekly HTML email digest containing the 5 most recent policy analyses. The digest comes from `digest@healthtransformationreport.com`.

To manage your digest subscription, go to `/account` or use the unsubscribe link at the bottom of any digest email.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘K / Ctrl+K | Open command palette / search |
| Enter | Send message in AI chat |
| Shift+Enter | New line in AI chat input |
| Escape | Close search or modal |

---

## Tips

- The AI Analyst remembers your conversation history within a session. Ask follow-up questions naturally.
- The **follow-up question suggestions** panel (left side of `/chat`) updates after each AI response — use it to explore related angles quickly.
- The right sidebar AI chat is scoped to quick questions. For longer research sessions, use `/chat`.
- Use ⌘K search to find any article, module, or definition quickly without navigating menus.
- On mobile, the mobile menu appears at the top right of the nav bar. Sidebars overlay the page on small screens.
