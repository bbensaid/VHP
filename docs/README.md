# Vermont Health Platform — Documentation

**Version**: 4.2.0
**Last Updated**: March 2026

---

## What Is This Platform?

The Vermont Health Platform (operating as **Health Transformation Review — HTR**) is a full-stack healthcare intelligence and transformation platform. It combines a real-time content intelligence engine, an AI-powered research analyst, structured learning programs, interactive analytical tools, and expert advisory services — all organized around a five-pillar framework for understanding U.S. healthcare transformation.

---

## Documentation Index

| Document | Audience | Description |
|---|---|---|
| [User Guide](./user-guide.md) | All users | How to use every feature of the platform |
| [Technical Architecture](./technical-architecture.md) | Developers, architects | System design, AI pipeline, database schema, component map |
| [Developer Guide](./developer-guide.md) | Developers | Local setup, environment variables, API reference, deployment |
| [Content Management Guide](./content-management.md) | Editors, admins | Managing content in Sanity CMS, sync behavior, content types |

---

## Platform at a Glance

### The Five-Pillar Framework

All content, tools, and advisory services are organized around five interconnected dimensions of U.S. healthcare transformation:

| Pillar | Color | Focus |
|---|---|---|
| **Policy** | Sky Blue | Federal/state legislation, regulation, mandates, feasibility |
| **Economics** | Emerald | Value-based care, markets, labor, investment |
| **Technology** | Indigo | AI/ML, digital health, security, workflow automation |
| **Clinical** | Red/Rose | Hospital-at-home, precision medicine, virtual care |
| **Equity** | Amber | SDOH, algorithmic bias, access disparity |

### Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend | FastAPI (Python), Uvicorn ASGI |
| AI / RAG | LlamaIndex, Groq (Llama 3.1/3.3), Anthropic (Claude Sonnet 4.6), OpenAI (embeddings, TTS) |
| Database | Supabase (PostgreSQL + pgvector) |
| CMS | Sanity (headless) |
| Auth | Supabase Auth (JWT, HS256) |
| Payments | Stripe |
| Hosting | Vercel (frontend), Railway (backend) |
| Monitoring | Sentry, Web Vitals |

### User Roles & Tiers

| Role | AI Model | Features |
|---|---|---|
| `free` | Llama 3.1 8b | Public pillar content, academy browsing |
| `subscriber` | Llama 3.3 70b | Full AI chat, The Wire, Research Lab |
| `student` | Llama 3.1 8b | Academy-focused learning path |
| `professional` | Llama 3.3 70b | Full platform + agentic AI tools |
| `advisory` | Claude Sonnet 4.6 | All features + advisory services |
| `admin` | Claude Sonnet 4.6 | Full platform + admin panel |

---

## Quick Links

- **Local development setup** → [Developer Guide: Local Setup](./developer-guide.md#local-setup)
- **Environment variables reference** → [Developer Guide: Environment Variables](./developer-guide.md#environment-variables)
- **API endpoints** → [Developer Guide: API Reference](./developer-guide.md#api-reference)
- **Adding/editing content** → [Content Management Guide](./content-management.md)
- **How the AI pipeline works** → [Technical Architecture: AI Pipeline](./technical-architecture.md#ai-pipeline)
- **Database schema** → [Technical Architecture: Database Schema](./technical-architecture.md#database-schema)
