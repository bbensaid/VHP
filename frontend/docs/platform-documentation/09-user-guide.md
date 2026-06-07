# 09 — User Guide & Usability

> **Verified against:** `frontend/app/*` routes, `frontend/components/{CommandPalette,VoiceContext,VoiceFab,Header,HomeSidebar,RightSidebar,AppShell}.tsx`, `frontend/app/pricing/page.tsx`, `frontend/app/research-lab/*`. Companion: `training/` user-guides & feature-guides.

This is the end-user manual. It explains what the platform does and how to use every major feature, written for clinicians, executives, policy analysts, investors, and researchers.

## Table of contents
1. [Getting started](#1-getting-started)
2. [Plans & access tiers](#2-plans--access-tiers)
3. [Navigating the app](#3-navigating-the-app)
4. [The Six-Pillar sections](#4-the-six-pillar-sections)
5. [The AI Analyst](#5-the-ai-analyst)
6. [The Academy](#6-the-academy)
7. [Dashboards, states & simulators](#7-dashboards-states--simulators)
8. [The Research Lab](#8-the-research-lab)
9. [The Wire, the Book & media](#9-the-wire-the-book--media)
10. [Connect & Community](#10-connect--community)
11. [Voice & accessibility](#11-voice--accessibility)
12. [Your account](#12-your-account)
13. [Keyboard shortcuts](#13-keyboard-shortcuts)

---

## 1. Getting started

1. **Sign up** at `/signup` (or `/login` if you have an account). Auth is email/password via Supabase.
2. **Onboarding** (`/onboarding`, `/welcome`, `/start`) — pick your role/interests so content and personalized learning are tailored.
3. **Beta access:** during pre-launch, an access code may be required (`/beta`).
4. **Explore** from the home page — the left **HomeSidebar** is your primary navigation; the right sidebar is the **AI Analyst**.

## 2. Plans & access tiers

The platform offers these tiers (see `/pricing`):

| Tier | Who it's for | Unlocks |
|---|---|---|
| **Free** | Anyone | Public articles, limited features |
| **Student** | Learners | Academy + discounted access |
| **Subscriber** | Professionals | Full content + AI Analyst (RAG) |
| **Professional** | Power users | Agentic AI (tool-using), deeper data |
| **Advisory** | Consulting clients | Advisory hub, premium AI (Claude), reports |

Manage your plan at `/account/subscription` and `/account/billing` (Stripe-powered, including team checkout). Upgrade prompts appear on gated content.

## 3. Navigating the app

- **Header** (`Header.tsx`) — global search, account, theme toggle.
- **HomeSidebar** (left) — sidebar-first navigation into the six pillars and major sections. This is the primary nav.
- **RightSidebar** (right) — the AI Analyst widget, available on every page; expand to full chat.
- **TickerStrip** — a live scrolling band of "System Vitals" (ER wait time, etc.), driven by Sanity `ticker` docs.
- **Command Palette** — press **⌘K** (or Ctrl+K) to jump anywhere by name.
- **Breadcrumbs**, **Site Map** (`/site-map`), and **Search** (`/search`) help you orient.

## 4. The Six-Pillar sections

The platform's content is organized into six pillars, each a top-level section with overview, subpages, and `[slug]` articles:

| Pillar | Section | Example subpages |
|---|---|---|
| **Policy** | `/policy` | regulation, mandates, global, feasibility |
| **Economics** | `/economics` | value, market, investment, cea |
| **Technology** | `/technology` | ai, digital, security, workflow |
| **Clinical** | `/clinical` | hah (hospital-at-home), precision, virtual, population, genomics |
| **Equity** | `/equity` | sdoh, bias, access |
| **Operations** | `/operations` | revenue-cycle, supply-chain, workforce, compliance, payer-network |

Each pillar surfaces **Analyses** (research briefs), case studies, and "From the Book" cross-links.

## 5. The AI Analyst

Your research co-pilot. It answers questions grounded in the platform's content (RAG) and cites its sources.

- **Where:** the right-sidebar widget on any page, or the full page at `/chat`.
- **How to use:** type a question (e.g. "How does Vermont's Act 167 change hospital budgeting?"). The Analyst retrieves relevant Analyses/case studies, answers with citations, and may link you to the right interactive tool.
- **Follow-ups:** suggested next questions appear after each answer.
- **Tiers:** Subscribers get grounded RAG answers. Professional/Advisory/Admin get the **agentic** Analyst, which can call live data tools (state metrics, Vermont bed capacity, best-transfer routing, etc.).
- **Feedback:** rate answers 👍/👎 — this feeds answer-quality monitoring.

> The Analyst only knows what's published on the platform. If an answer seems thin, the underlying content may not be indexed yet.

## 6. The Academy

Structured learning at `/academy`.

- **Courses** (`/academy/courses`) — multi-module courses across the six pillars; some are cohort-based, some self-paced.
- **Tracks & Modules** (`/academy/tracks`, `/academy/modules`) — curated learning paths.
- **Lessons** — rich, illustrated lessons (key concepts, real-world examples, stat cards, comparisons, warnings) with optional audio narration.
- **Quizzes** — check your understanding; attempts and scores are saved.
- **Case Studies, Faculty, Glossary, Webinars** — supporting resources.
- **Personalized Learning** (`/academy/personalized-learning`) — an AI-generated path tailored to your role and goals, optionally with audio.
- **Progress & Certificates** — track completion at `/account/courses`; earn a **certificate** on completion (verifiable publicly at `/verify/[hash]`).

## 7. Dashboards, states & simulators

Interactive, data-driven tools:

- **State profiles** (`/states/[state]`) — Rural Health Transformation program profiles, awards, initiatives, metrics.
- **State Performance Index** — a 0–100 six-pillar composite per state.
- **Compare states** (`/compare-states`, `/dashboard/compare`).
- **Simulators** — model policy and program outcomes:
  - Vermont: `/vermont-act-167`, `/vermont-act-68`, `/vermont-rht-program`, `/vermont-blueprint`, `/vermont-medicaid`, `/vermont-sash`, plus `/htr-simulator`, `/impact-simulation`.
  - Other states: `/california-calaim/simulator`, `/oregon-cco/simulator`.
  - Eligibility: `/medicaid-eligibility-simulator`.
- **Indices & trackers** — `/htr-index`, `/hti-dashboard`, `/investment-tracker`, `/transformation-friction-index`, `/bed-capacity`.

## 8. The Research Lab

`/research-lab` — seven specialized workspaces for deeper analysis:

| Workspace | Focus |
|---|---|
| `technology-ai` | AI & technology |
| `payment-models` | Payment & reimbursement |
| `policy-quality` | Policy & quality |
| `population-equity` | Population health & equity |
| `vbc-clinical-quality` | Value-based / clinical quality |
| `interoperability` | Data interoperability |
| `knowledge-workspace` | A working/knowledge surface |

The AI Analyst can point you to the right Lab tool for a given question.

## 9. The Wire, the Book & media

- **The Wire** (`/the-wire`) — a live feed of healthcare-transformation news/insights with threaded comments.
- **The Book** — *Transforming American Healthcare*: read at `/book`, listen at `/book/listen` (Piper-narrated audio), with chapter notes and "From the Book" callouts woven through pillar pages.
- **Media** (`/media`, `/media/videos`, `/multimedia`) — video library and multimedia.
- **Trending / Daily Insight** — the dark insight strip surfaces the current "Quote/Stat/Chart of the Day."

## 10. Connect & Community

- **Community** (`/community`) — forums, threads, upvotes.
- **Connect hub** (`/connect`) — directory, ask-an-expert, alerts, toolkits, office hours, forums.
- **Advisory hub** (`/advisory`) — for consulting clients: services, regulatory, financial audit, independent review, reports, training.
- **Survey** (`/survey`) — periodic editions; aggregated results at `/survey/results`.

## 11. Voice & accessibility

- **Voice input/output:** toggle the mic with **⌘⇧V** (hide/show the voice FAB with **⌘⇧H**). Ask the Analyst by voice; answers can be spoken (TTS).
- **Accessibility controls:** dark-mode toggle, font-size toggle, print/save-to-PDF buttons on articles, semantic headings, keyboard navigation.

## 12. Your account

`/account/*`:

| Page | Purpose |
|---|---|
| `/account/profile` | Name, org, bio, avatar |
| `/account/subscription` / `/account/billing` | Manage plan & payment (Stripe portal) |
| `/account/courses` | Enrolled courses & progress |
| `/account/bookmarks` | Saved items (also `/saved`) |
| `/account/referrals` | Your referral code & rewards |
| `/account/api-keys` | Developer API keys (create/rotate/revoke) |

## 13. Keyboard shortcuts

| Shortcut | Action |
|---|---|
| **⌘K / Ctrl+K** | Open the Command Palette (jump anywhere) |
| **⌘⇧V** | Toggle voice mic |
| **⌘⇧H** | Hide/show the voice FAB |
| In Command Palette: `H` `E` `P` `T` `C` `Q` | Quick-nav Home, Economics, Policy, Technology, Clinical, Equity |

> For role-specific quick-starts (clinician, executive, economist, policy analyst, investor/consultant, researcher, health-tech, compliance), see `training/user-guides/`. For feature deep-dives (Academy, AI Analyst, Research Lab, Voice), see `training/feature-guides/`.

Continue to → [10 — Reference Appendices](./10-reference-appendices.md)
