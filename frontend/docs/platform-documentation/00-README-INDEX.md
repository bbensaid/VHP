# Vermont Health Platform — Complete Documentation Set

> **Audience:** Engineers, operators, content editors, and end-users of the Vermont Health Platform (internally "HTR" — *Healthcare Transformation Roadmap*).
> **Status:** Authoritative reference, verified against the live codebase. Where this set and older ad-hoc `.md` files in the repo root disagree, **this set wins.**
> **Last verified against code:** see each document header.

---

## What this platform is

The Vermont Health Platform is a full-stack web application that publishes healthcare-transformation research, runs an online learning **Academy**, hosts interactive policy simulators and dashboards, and provides a retrieval-augmented (RAG) **AI Analyst**. It is organized around a **Six-Pillar Framework**: **Policy, Economics, Technology, Clinical, Equity, Operations.**

It is built from three cooperating systems:

| System | Technology | Responsibility |
|---|---|---|
| **Frontend / web app** | Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 | All pages, UI, route handlers (`/api/*`), Stripe, auth session, Sanity Studio mount |
| **CMS** | Sanity (project `fxz10xl7`, dataset `production`) | Editorial content: Analyses, Courses, Case Studies, Webinars, Reports, Glossary, Ticker, etc. |
| **Application database** | Supabase (Postgres + Auth + Storage + pgvector) | Users, roles, subscriptions, course progress, bookmarks, community, RAG vectors |
| **AI Brain (backend)** | FastAPI (Python), LlamaIndex, Groq/Anthropic/OpenAI | RAG chat, suggestions, content ingest, embeddings, Vermont-ops tools |

---

## How to read this set

Read in order if you are new. Jump by role if you are not.

| # | Document | Read this if you are… |
|---|---|---|
| **01** | [Architecture & System Overview](./01-architecture-overview.md) | An engineer onboarding, or anyone who needs the big picture |
| **02** | [Local Development & Environment Setup](./02-local-development-setup.md) | Setting up the app on a new machine |
| **03** | [Content Creation — Sanity CMS](./03-content-sanity.md) | A content editor or author publishing Analyses, Courses, etc. |
| **04** | [Content & Data — Supabase](./04-content-supabase.md) | Managing users, roles, course enrollment, the database |
| **05** | [The Academy — Courses, Lessons, Quizzes, Certificates](./05-academy-system.md) | Building or maintaining course content |
| **06** | [The AI Analyst & RAG Backend](./06-ai-analyst-rag.md) | Operating or extending the AI chat / ingest pipeline |
| **07** | [Tooling & Scripts Reference](./07-tooling-scripts.md) | Running any of the maintenance / seed / content scripts |
| **08** | [Operations, Deployment & Maintenance](./08-operations-deployment.md) | Deploying, monitoring, upgrading, or doing incident response |
| **09** | [User Guide & Usability](./09-user-guide.md) | An end-user, or writing user-facing help |
| **10** | [Reference Appendices](./10-reference-appendices.md) | Anyone needing env-var, route, schema, or table lookups |

---

## The Six-Pillar Framework (the spine of everything)

Almost every content type, navigation section, and dashboard is keyed to one of six pillars. Memorize these — they appear as a `pillar` field on Sanity documents, as top-level nav sections, and as Research-Lab workspaces.

| Pillar | What it covers | Example subcategories |
|---|---|---|
| **Policy** | Regulation, legislation, mandates, feasibility | Regulation & Legislation, Public Health Mandates, Global & Comparative Policy, Policy Feasibility Studies |
| **Economics** | Value-based care, market/finance, workforce, investment | Value-Based Care Models, Market & Finance, Labor & Workforce Strategy, Healthcare Investment Trends |
| **Technology** | AI/ML, digital health, security, workflow | AI & Machine Learning, Digital Health & Telemedicine, Data Security & Governance, Tech-Enabled Workflow |
| **Clinical** | Care delivery models | Hospital-at-Home, Precision Medicine, Virtual Care Models, Population Health |
| **Equity** | Disparity & SDOH | SDOH Integration, Algorithmic Bias, Access Disparity, Community Engagement |
| **Operations** | Running a health system | Revenue Cycle, Supply Chain, Workforce, Compliance, Payer Network |

---

## Conventions used in this documentation

- **Code paths** are written relative to the repo root, e.g. `frontend/app/api/chat/route.ts`.
- **Commands** assume your shell is at the repo root unless noted (`cd frontend` is called out explicitly).
- **⚠️ Danger** boxes mark operations that mutate production data or are hard to reverse.
- **🔑 Secret** boxes mark places that require credentials not stored in the repo.

---

## Document conventions for "page count"

This set is intentionally split into ten Markdown documents. Rendered to PDF/print (the repo already ships a PDF-export pipeline; see [Doc 07](./07-tooling-scripts.md)), the set runs well past 35 pages. Each document is self-contained with its own table of contents.
