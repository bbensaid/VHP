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

### Right Sidebar — Inline AI Chat

The right sidebar contains a compact version of the AI Analyst. You can ask quick questions without leaving your current page. For a full-featured experience, click "Full chat →" to go to `/chat`.

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
- Click **Clear** (trash icon) to erase history

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

The Academy (`/academy`) is available to **Student** plan members and above.

### What's in the Academy

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

### AHEAD Model (`/ahead-model`)
Vermont's All-Payer Claims Database and AHEAD model analysis.

### Vermont Act 167 (`/vermont-act-167`)
Deep analysis of Vermont's landmark health reform legislation.

### California CalAIM (`/california-calaim`)
Analysis of California's Medi-Cal transformation initiative.

### Research Lab (`/research-lab`)
Six interactive labs organized by domain. Each lab contains multiple modeling and simulation tools:

- **Payment Models & VBC** (`/research-lab/payment-models`) — Design alternative payment models, episode bundles, global budgets, and shared savings scenarios. Run cost-effectiveness analyses (CEA) and APM financial projections.
- **Policy & Quality Sciences** (`/research-lab/policy-quality`) — Simulate Medicaid waivers and global budgets, model HEDIS/Star ratings, MIPS scoring, actuarial projections, and hospital financial stress tests.
- **Population & Equity** (`/research-lab/population-equity`) — Model chronic disease progression, epidemic dynamics, health disparities, SDOH impact, and population-scale intervention ROI.
- **Technology & AI** (`/research-lab/technology-ai`) — Evaluate AI model performance, audit algorithmic bias, build AI governance frameworks, and model remote patient monitoring and telehealth ROI.
- **Interoperability & Risk** (`/research-lab/interoperability`) — Build and validate FHIR R4 resources, test CDS Hooks, check ONC compliance, and run HCC v28 risk stratification models.
- **Knowledge & Workspace** (`/research-lab/knowledge-workspace`) — Access the CEA evidence library, CMMI model tracker, workforce projection models, and innovation leaderboard. Save and manage your active research workspace.

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
