# Health Transformation Review (HTR) — Documentation Index

> **Platform version:** 4.2.0 | **Last updated:** March 2026 | **Stack:** Next.js 16 · FastAPI · Supabase · Sanity · Groq

HTR (Health Transformation Review) is an intelligence and analytics platform for understanding, modeling, and navigating U.S. healthcare transformation. It covers five analytical pillars — Policy, Economics, Technology, Clinical, and Equity — through a continuously updated intelligence feed, AI-powered analysis, 19 interactive research tools, structured learning, and expert advisory services.

---

## Documentation Map

| Document | Audience | Description |
| --- | --- | --- |
| [User Guide](user-guide.md) | All users | Features, navigation, subscription tiers, quick-start |
| [Developer Guide](developer-guide.md) | Engineers | Local setup, env vars, API reference, adding features |
| [Technical Architecture](technical-architecture.md) | Architects · Engineers | System design, data flow, service map, component map |
| [Database Guide](database-guide.md) | Backend devs · DBA | Schema, RLS policies, migrations, Supabase client patterns |
| [AI & RAG Guide](ai-rag-guide.md) | AI/ML engineers | RAG pipeline, LLM routing, ingest, embeddings, retrieval |
| [Content Management](content-management.md) | Editors · Content leads | Sanity Studio, 21 content types, editorial workflow |
| [Research Lab](research-lab.md) | Analysts · Tool devs | 19 tools across 6 labs, calculation reference, UI patterns |
| [Operations Guide](operations.md) | DevOps · SRE | Deployment, monitoring, environment management, incident response |
| [Academy & Coaching](academy-and-coaching.md) | Faculty · Product | Course structure, modules, tracks, personalized learning, coaching |
| [Advisory Services](advisory-services.md) | Advisory team · Sales | Service lines, client segmentation, five-pillar methodology, pricing |
| [White Paper](white-paper.md) | Executives · Policymakers | Five-pillar framework, strategic rationale, health system context |
| [HTI Methodology](hti-methodology.md) | Data scientists · Researchers | Health Transformation Index algorithm, data sources, formulas |
| [Vermont Act 167](act167-vermont.md) | VT policymakers · Analysts | Act 167 analysis, AHEAD model, Vermont-specific implementation |
| [Platform Improvement Plan](platform-improvement-plan.md) | Leadership · Product | Roadmap: AI, architecture, database, security, compliance |
| [Testing & Deployment](testing-and-deployment.md) | Engineers · Operators | End-to-end testing, staging, deployment runbook |
| [Personalized Learning](personalized-learning.md) | Engineers · Product | Technical deep-dive on the AI curriculum generation feature |
| [HTR Connect](HTR-Connect.md) | Engineers · Product | HTR Connect community feature — architecture and implementation |
| [Deployment Guide](deployment-guide.md) | Engineers · DevOps | Step-by-step deployment for all 8 services: Supabase, Railway, Vercel, Stripe, Sanity, Groq, OpenAI, Sentry |
| [Act 167 Simulator Guide](act167-simulator-guide.md) | VT analysts · Developers | Vermont Act 167 simulation tool — usage, calculations, methodology |

---

## Platform Overview

### Five Pillars

| Pillar | Color | Focus |
| --- | --- | --- |
| **Policy** | Sky blue | Legislation, regulation, payment reform, state programs |
| **Economics** | Emerald | Value-based care, investment, market dynamics, cost analysis |
| **Technology** | Indigo | AI/ML, digital health, interoperability, EHR, FHIR |
| **Clinical** | Red | Hospital care, quality measures, workforce, delivery systems |
| **Equity** | Amber | SDOH, racial disparities, rural access, community health |

### Core Product Surfaces

| Feature | Route | Description |
| --- | --- | --- |
| **Intelligence Feed** | `/` | Curated real-time articles across all five pillars |
| **Pillar Hubs** | `/{pillar}` | Dedicated analysis pages per pillar |
| **State Dashboard** | `/dashboard/[state]` | Performance Index, RHT program data, hospital view |
| **AI Analyst** | `/chat` | RAG-powered chat with the HTR knowledge base |
| **Research Lab** | `/research-lab` | 19 interactive analytical tools |
| **HTI Dashboard** | `/hti-dashboard` | Real-time Health Transformation Index monitoring |
| **Academy** | `/academy` | Courses, modules, tracks, webinars, personalized learning |
| **Advisory Hub** | `/advisory-hub` | Expert consulting services and engagement tools |

### Technology Stack

```text
Frontend:   Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
Backend:    FastAPI (Python) · LlamaIndex · Groq (Llama 3.3-70b) · OpenAI Embeddings
Database:   Supabase PostgreSQL · pgvector · Row Level Security
CMS:        Sanity v3 (21 content types) · GROQ queries · Portable Text
Auth:       Supabase Auth · JWT · 6-role RBAC (free → admin)
Payments:   Stripe Subscriptions (3 tiers: $29/$19/$99/mo)
Email:      Loops.so (transactional) · Resend (system emails)
Hosting:    Vercel (frontend) · Railway (backend)
Monitoring: Sentry (errors) · Vercel Analytics (performance)
```

### Subscription Tiers

| Tier | Price | Key Access |
| --- | --- | --- |
| **Free** | $0 | Preview articles, state dashboard overview, limited AI queries |
| **Subscriber** | $29/mo | Full articles, AI Analyst, Research Lab, Academy modules |
| **Student** | $19/mo | Same as Subscriber (verified `.edu` email) |
| **Professional** | $99/mo | Everything + Advisory Hub, priority AI model, API access |
| **Advisory** | Custom | Full platform + dedicated consulting engagement |
| **Admin** | Internal | Full platform access + admin dashboard |

---

## Repository Structure

```text
Vermont-Health-Platform/
├── frontend/               # Next.js 16 application
│   ├── app/                # App Router pages and API routes
│   │   ├── api/            # Next.js API routes (proxies to backend)
│   │   ├── admin/          # Admin dashboard (role-gated)
│   │   ├── academy/        # Learning management system
│   │   ├── chat/           # Full-page AI Analyst
│   │   ├── dashboard/      # State performance dashboard
│   │   ├── research-lab/   # 19-tool analytical suite
│   │   └── [pillar]/       # Economics, policy, technology, clinical, equity
│   ├── components/         # Shared React components
│   │   ├── research/       # Individual research tool components (19 tools)
│   │   └── templates/      # PillarHub, HubPageTemplate, ArticlePageTemplate
│   ├── lib/                # Data fetching, auth, Sanity client, utilities
│   └── public/             # Static assets
├── backend/                # FastAPI Python service
│   ├── routers/            # chat, ingest, api_v1, personalized_learning
│   ├── services/           # db, auth, llm, retrieval, indexing
│   └── data/               # Static data files and documentation
├── supabase/               # Database migrations and seeds
│   ├── migrations/         # SQL migration files
│   └── seed/               # Seed data scripts
└── docs/                   # This documentation set
```

---

## Quick Links

- **Production:** Deploy via Vercel (frontend) + Railway (backend)
- **CMS:** Sanity Studio at `[frontend-url]/studio` (admin role required)
- **Admin Dashboard:** `[frontend-url]/admin` (admin role required)
- **Health Check:** `[backend-url]/health`
- **API Docs:** `[backend-url]/docs` (FastAPI auto-generated OpenAPI)
