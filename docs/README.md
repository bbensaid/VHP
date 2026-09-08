# Health Transformation Platform — Documentation

Written from scratch on **2026-09-07** by reading the actual codebase, the
live Sanity dataset, and the running configuration. The code and the book are
the source of truth here, not any earlier documentation.

## The set

| # | Document | Read it when you need to… |
| :--- | :--- | :--- |
| **1** | [Technical Architecture](01-TECHNICAL-ARCHITECTURE.md) | Understand what every vendor and module does and how they connect |
| **2** | [Infrastructure & Maintenance](02-INFRASTRUCTURE-AND-MAINTENANCE.md) | Work on the database, hosting, AI models, or CMS — or upgrade anything |
| **3** | [User Guide](03-USER-GUIDE.md) | Understand what the product does, or perform a routine operational task |

## The 60-second orientation

**One Next.js app on Vercel**, serving four domains from a single deployment.
Behind it: **Supabase** (Postgres + auth + the AI's vector store), **Sanity**
(CMS, editable at `/studio`), and a **FastAPI service on Fly.io** that powers
the AI Analyst.

Three AI vendors, doing three different jobs: **Groq** writes most chat
answers, **Anthropic** handles the advisory tier, and **OpenAI** supplies
embeddings, text-to-speech, and a fallback model. If OpenAI runs out of
credit, chat keeps working but search quality degrades — a quiet failure worth
knowing about.

A book, *Transforming Healthcare*, is the intellectual source. It lives in
this repo as Markdown with its own build pipeline (`./book.sh`), and its
framework — **five pillars held to the Equity Imperative** — drives the site's
taxonomy from `frontend/lib/taxonomy/pillars.ts`.

## Related documents kept elsewhere

| File | Purpose |
| :--- | :--- |
| `CLAUDE.md` (repo root) | Working notes and hard rules, especially for the book |
| `BOOK_WORKFLOW.md` | The author's Google Docs ↔ Markdown round-trip |
| `HTR_ADMIN_RUNBOOK.md` | Older ops runbook — useful, but verify against doc 2 |
| `book-build/README.md` | The book styling/build pipeline in detail |

## Superseded

`frontend/docs/platform-documentation/` (files `00`–`10`) predates major
changes to the platform and the book's framework. Treat it as historical.
Where it conflicts with this set, this set is correct.
