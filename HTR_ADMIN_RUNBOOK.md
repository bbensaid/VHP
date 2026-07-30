# HTR Ecosystem — Administration Runbook

**Last verified: 2026-07-30.** Everything here was checked against the running
system on that date, not written from memory. Where something is unverified or
uncertain it says so explicitly.

This is the operational companion to
[`frontend/docs/platform-documentation/`](frontend/docs/platform-documentation/00-README-INDEX.md)
(architecture, written 2026-06-06 and partly stale). **When the two disagree,
trust this file** — it was verified more recently.

Related documents that remain authoritative in their own scope:

| Document | Scope |
| :--- | :--- |
| [`BOOK_WORKFLOW.md`](BOOK_WORKFLOW.md) | Day-to-day book editing — read before touching the manuscript |
| [`CLAUDE.md`](CLAUDE.md) | Rules for AI assistants working in this repo |
| [`frontend/docs/auth.md`](frontend/docs/auth.md) | Beta gate + role-gating internals |

---

## Table of contents

1. [System map](#1-system-map)
2. [Users and access codes](#2-users-and-access-codes)
3. [Running and deploying](#3-running-and-deploying)
4. [Content: Sanity](#4-content-sanity)
5. [Content: Supabase](#5-content-supabase)
6. [AI Analyst: RAG, vectors, models](#6-ai-analyst-rag-vectors-models)
7. [Git and GitHub](#7-git-and-github)
8. [Domains](#8-domains)
9. [Services, costs, payment schedule](#9-services-costs-payment-schedule)
10. [The Book](#10-the-book)
11. [The Academy](#11-the-academy)
12. [Toolchain](#12-toolchain)
13. [Secrets and key rotation](#13-secrets-and-key-rotation)
14. [Emergency procedures](#14-emergency-procedures)
15. [Known gaps and risks](#15-known-gaps-and-risks)

---

## 1. System map

Five services. Four are hosted; one is a repo.

```
                     ┌───────────────────────────────┐
   4 domains ───────▶│  Vercel — Next.js 16 frontend │
                     │  (single deployment, all 4)   │
                     └───────┬───────────────┬───────┘
                             │               │
             /api/chat proxy │               │ content reads
                             ▼               ▼
                  ┌────────────────┐   ┌──────────────────┐
                  │ Fly.io         │   │ Sanity (CMS)     │
                  │ vhp-backend    │   │ project: editorial│
                  │ FastAPI/Python │   └──────────────────┘
                  └───────┬────────┘
                          │ embeddings + pgvector
                          ▼
                  ┌──────────────────────────────────┐
                  │ Supabase — Postgres + pgvector   │
                  │ clryhwqaqhvdikgesjbc             │
                  │ auth · app data · RAG vectors    │
                  └──────────────────────────────────┘

  GitHub (bbensaid/VHP) ──▶ Vercel (auto-deploy on main)
                        └─▶ Fly (Action, only on backend/** changes)
```

**The critical wiring detail:** the browser never talks to Fly directly. It calls
`/api/chat` on Vercel, which proxies to `PYTHON_BACKEND_URL`. If that env var is
unset, Vercel calls `http://localhost:8000` — meaning *Vercel's own machine* —
and the AI Analyst reports "backend is offline." This exact failure occurred on
2026-07-30.

---

## 2. Users and access codes

### How access actually works

There is **no per-user login** in beta. The whole site sits behind an
access-code gate. Anyone holding a valid code gets in.

| Piece | Location |
| :--- | :--- |
| Gate page | `frontend/app/beta/page.tsx` |
| Verify endpoint | `frontend/app/api/beta/verify/route.ts` |
| Admin UI | `frontend/app/admin/access-codes/` |
| Admin API | `frontend/app/api/admin/beta-codes/route.ts` |
| Table | Supabase `beta_access_codes` |
| Cookie | `htr_beta=granted`, **7-day** lifetime |

Two independent gates exist. The **beta gate** (above) is active. **Role-gating**
(`free → subscriber → student → professional → advisory → admin`) is written but
bypassed while `ALLOW_AUTH_BYPASS=true`. See `frontend/docs/auth.md`.

### Table schema

```sql
beta_access_codes (
  id              uuid PRIMARY KEY,
  code            text UNIQUE NOT NULL,   -- convention: Firstname_L_0.0.0
  label           text,                   -- human name, e.g. "Jane S."
  is_active       boolean NOT NULL DEFAULT true,
  allowed_domains text[] NOT NULL,        -- REQUIRED in production
  created_at      timestamptz NOT NULL DEFAULT now()
)
```

RLS is on with **no public policies** — only the service-role key can read or
write. The verify route uses `dbAdmin` (service-role), so no policy is needed.

### Adding a user

**Preferred:** the admin UI at `/admin/access-codes`.

**Or SQL** (Supabase → SQL Editor):

```sql
INSERT INTO beta_access_codes (code, label, allowed_domains)
VALUES ('Jane_S_0.0.0', 'Jane S.', ARRAY['healthtransformationreview.org'])
ON CONFLICT (code) DO NOTHING;
```

> ⚠️ **`allowed_domains` must contain the exact host.** An empty array is
> rejected in production. A code scoped only to `.org` will not work on `.com`.
> Your own code (`Bechir_B_0.0.0`) is scoped to all four domains; everyone
> else's is scoped to `healthtransformationreview.org` only.

**No deploy is needed.** The verify route reads Supabase live.

### Revoking

```sql
UPDATE beta_access_codes SET is_active = false WHERE code = 'Jane_S_0.0.0';
```

Set `is_active = false` — **do not delete**, so the audit trail survives.

> ⚠️ **Revocation is not immediate.** An existing `htr_beta` cookie stays valid
> until it expires, so someone already inside keeps access for **up to 7 days**.
> There is currently no session-invalidation mechanism. If you need to lock
> someone out immediately you must change the cookie name in `middleware.ts` and
> redeploy, which signs *everyone* out.

### Current roster (verified 2026-07-30)

12 active codes: Bechir B. (all 4 domains), and — scoped to
`healthtransformationreview.org` — Will D., Mahesh T., Inna P., Joe L.,
Suellen B., Steve D., Tim T., Eli H., Alice S., Jenney S., Geoff B.

`Kristin_M_0.0.0` appears in the original migration seed but is **not** in the
table; it was removed at some point.

### Removing the gate at GA

Delete the `// Beta gate` block in `middleware.ts` and the cookie check in
`app/layout.tsx`. Keep `/beta` and the verify route if you want code-based
onboarding for a preview channel.

---

## 3. Running and deploying

### Local development

Two processes, two terminals.

```bash
# Terminal 1 — backend (FastAPI, port 8000)
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2 — frontend (Next.js, port 3000)
cd frontend
npm run dev
```

Then use **`http://localhost:3000`**. Both must run for the AI Analyst to work
locally.

Expected backend startup log:

```
🚀 HTR AI Brain v4.2.0 starting...
LLM: Groq llama-3.3-70b-versatile | Embeddings: OpenAI text-embedding-3-small
✅ PG vector store (Supabase pgvector) initialized
✅ Loaded existing index from Supabase pgvector
✅ Catalog semantic index ready (67 entries)
```

Harmless warnings you can ignore: `PyTorch/TensorFlow not found` (no local model
is used — everything is a remote API), `slowapi not installed` (rate limiting
off locally), `FlashRank unavailable` (re-ranking disabled).

> **Running the backend locally does not help the live site.** Vercel's servers
> cannot see your laptop. Local backend serves `localhost:3000` only.

### Frontend — Vercel

| | |
| :--- | :--- |
| Trigger | push to `main` |
| Config | [`vercel.json`](vercel.json) |
| Build | `cd frontend && next build` |
| Region | `iad1` |
| Cron | `/api/cron/revalidate` daily at 00:00 |

**Environment variables** live in Vercel → Settings → Environment Variables.
They are read **at build time**, so after changing one you must redeploy
(Deployments → ⋯ → Redeploy). Changing a variable alone does nothing.

Required in Vercel:

| Variable | Value |
| :--- | :--- |
| `PYTHON_BACKEND_URL` | `https://vhp-backend.fly.dev` |
| `NEXT_PUBLIC_SUPABASE_URL` | the Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | service-role key |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION` | Sanity |
| `SANITY_API_TOKEN` | Sanity write token |
| `RESEND_API_KEY` | transactional email |
| `ALLOW_AUTH_BYPASS` | `true` during beta |

### Backend — Fly.io

| | |
| :--- | :--- |
| App | `vhp-backend` |
| Region | `sjc` |
| URL | `https://vhp-backend.fly.dev` |
| Machine | `shared-1x-cpu@1024MB`, 1 machine |
| Config | [`backend/fly.toml`](backend/fly.toml) |
| Deploy | GitHub Action, **only on `backend/**` changes** |

```bash
flyctl auth login                    # browser session ≠ CLI session
flyctl status  -a vhp-backend
flyctl logs    -a vhp-backend
flyctl machine start -a vhp-backend
flyctl deploy  -a vhp-backend        # manual deploy
```

**Cold starts.** As of 2026-07-30 the config is `min_machines_running = 1` and
`auto_stop_machines = 'off'` — one machine stays warm. This was changed
deliberately: with scale-to-zero the first request after idle took 5–15s and
could exceed Vercel's 60s function limit, surfacing as
`FUNCTION_INVOCATION_TIMEOUT`. Cost of the change: ~$1–3/mo → ~$5.70/mo.

**To revert to scale-to-zero** (cheaper, cold starts return): set
`min_machines_running = 0` and `auto_stop_machines = 'stop'` in `fly.toml`, then
push. Revert steps are also written into the file's own comments.

### Health checks

```bash
curl https://vhp-backend.fly.dev/health
curl -X POST https://healthtransformationreview.org/api/chat \
     -H "Content-Type: application/json" -d '{"message":"what is HIE?"}'
```

The `/api/chat` payload is `{"message": "..."}` — **not** an OpenAI-style
`messages` array. Sending the wrong shape returns 400.

---

## 4. Content: Sanity

Editorial content — articles, definitions, courses, reports. 21 schema types in
`frontend/sanity/schemaTypes/`:

`academyModule` · `analystNote` · `audio` · `author` · `blockContent` ·
`caseStudy` · `category` · `course` · `dailyInsight` · `definition` ·
`hospital` · `instructor` · `investmentDeal` · `policyAnalysis` · `post` ·
`report` · `rhtState` · `statePerformanceIndex` · `subscriber` · `ticker` ·
`webinar`

**Studio:** `/studio` on any deployment, or `localhost:3000/studio`.

Content is fetched with GROQ queries in `frontend/lib/sanity/`. Publishing in the
Studio makes content live — the daily `/api/cron/revalidate` job refreshes cached
pages, or you can redeploy to force it.

> **Content rule, from `CLAUDE.md`:** missing or thin content is often
> *intentional* — unverifiable material was deliberately pulled. Do not
> "restore" or re-link content without explicit sign-off.

---

## 5. Content: Supabase

**Project:** `clryhwqaqhvdikgesjbc` · Postgres 15 + pgvector.

Holds: user profiles and roles, academy course/track/lesson structure, RAG
vectors, beta access codes, feedback, bookmarks, ticker cache, audit logs.

**36 migrations** in `supabase/migrations/`, applied via the Supabase SQL Editor
(there is no automated migration runner). Notable ones:

| File | Purpose |
| :--- | :--- |
| `001_profiles_and_roles.sql` | user roles |
| `003_academy.sql`, `028_course_schema.sql` | Academy structure |
| `005_rag_vectors.sql`, `007_hybrid_search.sql` | RAG storage + hybrid search |
| `021_pgvector_hnsw_maintenance.sql` | vector index upkeep |
| `20260411_beta_access_codes.sql` | access-code gate |
| `20260704_beta_access_codes_domain_scope.sql` | per-domain scoping |

**Two keys, very different powers:**

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — browser-safe, RLS enforced
- `SUPABASE_SERVICE_ROLE_KEY` — **bypasses RLS entirely**; server-side only,
  never in a `NEXT_PUBLIC_*` variable

---

## 6. AI Analyst: RAG, vectors, models

### Pipeline

```
question
  → OpenAI text-embedding-3-small        (embed)
  → Supabase pgvector + BM25, fused RRF  (retrieve)
  → sentence-window chunking, window 3   (assemble context)
  → Groq llama-3.3-70b-versatile         (generate)
  → stream back through Vercel
```

Verified from `/health` on 2026-07-30:

```json
{"status":"ok","version":"4.2.0","index_ready":true,
 "model_subscriber":"llama-3.3-70b-versatile",
 "embedding_model":"text-embedding-3-small",
 "vector_store":"pgvector","auth_enabled":false,
 "reranker":"disabled","retrieval":"hybrid_bm25_vector_rrf",
 "chunking":"sentence_window_3"}
```

No model runs locally. Both the LLM and the embeddings are remote APIs, which is
why a 1GB machine is ample.

### Re-indexing after content changes

```bash
curl -X POST http://localhost:8000/api/ingest
```

> **Run ingestion locally, not against Fly.** Parsing large documents spikes
> memory and is the one operation that could exhaust the machine. Routine chat
> never will.

### Re-ranking is off

FlashRank isn't installed (`No module named 'flashrank'`). Retrieval quality is
adequate without it; installing it would improve result ordering at the cost of
memory and cold-start time.

---

## 7. Git and GitHub

| | |
| :--- | :--- |
| Remote | `https://github.com/bbensaid/VHP.git` |
| Default branch | `main` |
| CI | `.github/workflows/ci.yml` |
| Backend deploy | `.github/workflows/fly-deploy.yml` (paths: `backend/**`) |

**Push protection is enabled.** GitHub blocks any push containing a detected
secret. This fired on 2026-07-30 when a Resend API key appeared inside a `curl`
command recorded in `.claude/settings.json`'s permission allowlist.

If it fires:

1. Find the offending commit and path from the error output
2. Remove the secret from the file
3. If it's in the most recent commit: `git add <file> && git commit --amend --no-edit`
4. If it's deeper in history, the commit must be rewritten (`git rebase -i` or
   `git filter-repo`) — **only safe if the commit has never been pushed**
5. **Rotate the key regardless.** A secret that reached your disk in a tracked
   file must be treated as compromised.

Never use GitHub's "allow this secret" bypass link for a live credential.

### Archiving

`book-archive/` holds pre-change snapshots of the manuscript and Google Docs
downloads. It is **gitignored** — local only, never pushed. `Book Latest
Version/` is likewise gitignored.

---

## 8. Domains

Four domains, **one Vercel deployment**. The brand is resolved per request from
the `Host` header in `frontend/lib/brand.ts`.

| Domain | Brand | Wordmark | Advisory section |
| :--- | :--- | :--- | :--- |
| healthtransformationsolutions.org | `solutions` | SOLUTIONS | **shown** |
| healthtransformationsolutions.com | `solutions` | SOLUTIONS | **shown** |
| healthtransformationreview.org | `review` | REVIEW | hidden |
| healthtransformationreview.com | `review` | REVIEW | hidden |

**99% of the app is identical across all four.** Only three things differ: the
logo wordmark, the display name, and whether Advisory Services appears in the
nav.

Unknown hosts (localhost, Vercel preview URLs) default to `solutions` — the
full-functionality variant. To preview the reduced variant locally, use a host
starting with `review.` (e.g. `review.localhost:3000`).

`ACCESS_DOMAINS` in the same file is the single source of truth for access-code
scoping, referenced by the verify route, the admin UI, and the SQL migration.

---

## 9. Services, costs, payment schedule

> ⚠️ **Verify every figure against your own billing dashboards.** Amounts below
> are what the configuration implies, not invoices I have seen. Only the Fly
> machine size and Supabase project were verified directly.

| Service | Purpose | Plan | Est. cost | Billing |
| :--- | :--- | :--- | :--- | :--- |
| **Fly.io** | FastAPI backend | Pay-as-you-go | **~$5.70/mo** | monthly, by machine-second |
| **Vercel** | Frontend | Hobby or Pro | $0 or $20/mo | monthly |
| **Supabase** | Postgres + pgvector | Free or Pro | $0 or $25/mo | monthly |
| **Sanity** | CMS | Free tier likely | $0 | monthly |
| **OpenAI** | Embeddings | Pay-as-you-go | cents/mo | usage |
| **Groq** | LLM inference | Free tier | $0 | usage |
| **Resend** | Email | Free tier | $0 | monthly |
| **GitHub** | Repo + Actions | Free | $0 | — |
| **Domains** ×4 | DNS | registrar | ~$15/yr each | annual |

### Fly cost detail

Billed by **machine uptime, not by users or requests**. Ten testers cost exactly
what one does.

- `shared-1x-cpu@1024MB` ≈ **$5.70/month** running 24/7
- Currently pinned to always-on (`min_machines_running = 1`)
- Reverting to scale-to-zero drops it to ~$1–3/mo and reintroduces cold starts
- Halving to 512MB would roughly halve the cost; the workload fits, since no
  local model is loaded

**On the "no spending cap" caveat.** Fly does not offer a setting that stops
billing at a dollar limit. That is not the same as an unbounded bill. What you
run is one machine, and its 24/7 rate — **~$5.70/mo** — is the arithmetic
ceiling. Traffic does not move it: Fly bills machine-seconds, not requests, so
ten testers and ten thousand cost the same.

The bill can only exceed that if the **configuration** changes:

- a second machine (`flyctl scale count`, or `min_machines_running > 1`)
- a larger machine (the `[[vm]]` block in `backend/fly.toml`)
- an additional region
- adding a Fly-hosted service — Postgres, volumes, object storage

None of those happen on their own. Review `backend/fly.toml` before any change
touching `[[vm]]`, `min_machines_running`, or regions, and check the Fly
dashboard monthly for the first few months.

### Free tiers to watch

Groq's free tier has rate limits that a public launch could exceed. OpenAI
embeddings are pay-as-you-go and only charged during ingestion, which is rare.
Supabase's free tier pauses a project after ~1 week of inactivity — that would
take down both the app data and the RAG vectors.

---

## 10. The Book

**Read [`BOOK_WORKFLOW.md`](BOOK_WORKFLOW.md) before editing the manuscript.**
Summary only here.

### The two files

| File | Role | Who edits |
| :--- | :--- | :--- |
| `HTR_Book_v42.docx` | **The book.** Read, edit, export to PDF. | You, in Google Docs |
| `HTR_Book_v42.md` | Build input. Regenerates the styled `.docx`. | Claude / the build |

`./book.sh` is the only command needed:

```bash
./book.sh          # detect download, capture widths, list edits, rebuild
./book.sh build    # rebuild only
./book.sh check    # report only
./book.sh who|mine|claude   # handoff — one editor at a time
```

### Things that will bite you

- **A rebuild regenerates the `.docx` from the `.md`.** Anything living only in
  the `.docx` is lost unless the pipeline reproduces it.
- **Table column widths** are captured automatically on download into
  `book-build/table_widths.json`, keyed by header row. 114 tables covered; the
  49 uncovered ones are single-column callout boxes with nothing to size.
- **Google Docs rewrites `keepNext`** on import (a build ships ~123 on; the
  round-trip returns ~76 on / ~1058 off). Layout fixes based on `keepNext`
  cannot survive the round trip.
- **`WIDE_TABLE_MIN_COLS` must stay at 6.** At 4 it wrapped ordinary tables in a
  portrait→landscape→portrait section sandwich whose leading break rendered as
  the blank space above every table.
- **There is no renderer in this environment.** Any claim about pages, gaps, or
  layout is an estimate until you look at the document.

### Wiring to the platform

| Surface | Source of truth |
| :--- | :--- |
| Chapter structure | `frontend/lib/taxonomy/chapters.ts` (16 chapters) |
| Tool ↔ chapter map | `frontend/lib/taxonomy/tools.ts` (39 tools, 44 pairs) |
| PDF | `frontend/public/HTR_Book_v42.pdf`, referenced from 5 places |
| Reader | `/book`, `/read/[slug]` |
| Audio | `frontend/public/audio/narration/` — 18 `.m4a` + `.txt` |

**Exporting a PDF:** upload the current `.docx` to Google Docs → File → Download
→ PDF → save to repo root → copy to `frontend/public/`.

> ⚠️ **Check the TOC before shipping a PDF.** Word/Docs writes page numbers as
> fields. If they haven't been refreshed, every entry reads "1". This shipped to
> production once on 2026-07-30. In Word: select the TOC → F9 → update entire
> table.

### Audio narration

```bash
python3 book-build/make_transcripts.py            # .txt from the manuscript
./scripts/generate-narration-audio.sh             # macOS `say` (free, robotic)
./scripts/generate-narration-piper.sh             # Piper (free, better)
```

Current audio is **OpenAI `gpt-4o-mini-tts`, voice `nova`**, generated
2026-07-27 for preface / introduction / chapter 1. Cost was ~$0.80 for those
three. The remaining 15 chapters still carry the older macOS `say` recording.

Cost model: **one-time per generation.** The `.m4a` files are static assets —
listeners cost nothing, there is no per-play fee, and nothing regenerates
automatically.

---

## 11. The Academy

### Data model

Content is **split across two systems**, and this trips people up:

```
Supabase                          Sanity
  courses                           academyModule
    └─ tracks                       course
        └─ lessons ──sanity_slug──▶ (lesson body, rich content)
```

Structure, ordering, and membership live in **Supabase**. Lesson *body* content
lives in **Sanity**, joined by the lesson row's `sanity_slug`.

> ⚠️ **If `sanity_slug` is null or wrong, the app silently renders thin legacy
> `content_blocks` instead of the real lesson.** After posting content to
> Sanity, always set the slug. Use `frontend/scripts/link-sanity-slugs.mjs` —
> and note it must live in `frontend/scripts/` so Node can resolve
> `@supabase/supabase-js`.

### Working rules

- **Seed scripts are upsert-only — they never delete.** To remove a lesson from
  a course, delete the DB row directly, then check every track for duplicates
  and orphans.
- **Write one lesson at a time**, fully, before starting the next.
- Every lesson script starts with `exec(open('CONTENT_TEMPLATE.py').read())` —
  never reimplement the block helpers inline.
- `AcademyContent.tsx` is the gold-standard renderer.

Migrations: `003_academy.sql`, `028_course_schema.sql`, `029_course_pillar_level`,
`030_course_featured`, `031_lesson_sanity_slug`, `032/033_course_chapter_ref`.

Book integration: each course links to chapters via `course_chapter_ref`;
chapters link back through the "Work This Chapter on the Platform" tables.

---

## 12. Toolchain

Verified 2026-07-30.

| Layer | Technology | Version |
| :--- | :--- | :--- |
| Frontend | Next.js (App Router) | ^16.1.6 |
| Language | TypeScript / React | — |
| Runtime | Node.js | v22.14.0 |
| Backend | FastAPI + Uvicorn | Python 3.14.5 |
| RAG | LlamaIndex core | 0.14.10 |
| LLM | Groq `llama-3.3-70b-versatile` | — |
| Embeddings | OpenAI `text-embedding-3-small` | — |
| Database | Supabase Postgres + pgvector | — |
| CMS | Sanity | API 2023-10-01 |
| Book build | pandoc 3.3 + python-docx | — |
| Audio | ffmpeg, Piper, macOS `say`, OpenAI TTS | — |
| Deploy | Vercel + Fly.io + GitHub Actions | — |

**Python backend dependencies are deliberately thin** — `llama-index-core` plus
API clients. No torch, no tensorflow, no transformers. Keep it that way; adding
a local model would change the machine sizing and the cost model.

### Local prerequisites

```bash
node -v          # ≥ 22
python3 -V       # ≥ 3.11
pandoc --version # ≥ 3
ffmpeg -version
flyctl version
```

---

## 13. Secrets and key rotation

### Where secrets live

| Location | Contents | In git? |
| :--- | :--- | :--- |
| `backend/.env` | Groq, OpenAI, Sanity, Supabase | **No** (gitignored) |
| `frontend/.env.local` | Sanity, Supabase, Resend | **No** (gitignored) |
| Vercel env vars | production frontend secrets | n/a |
| Fly secrets | production backend secrets | n/a |

```bash
flyctl secrets list -a vhp-backend
flyctl secrets set KEY=value -a vhp-backend     # triggers a redeploy
```

### Rotation checklist

When a key is exposed, rotate it in **all** places:

1. Revoke at the provider, create a new key
2. Update the local `.env` / `.env.local`
3. Update Vercel (Settings → Environment Variables) → **redeploy**
4. Update Fly (`flyctl secrets set`) if the backend uses it
5. Confirm the old key is dead

> **Outstanding:** the Resend key exposed on 2026-07-30 should be rotated if it
> has not been already. It was removed from the repo, but it sat in a tracked
> file and must be treated as compromised.

---

## 14. Emergency procedures

### AI Analyst says "backend is offline"

1. `curl https://vhp-backend.fly.dev/health` — if this fails, the backend is down
2. `flyctl status -a vhp-backend` — suspended? crashed?
3. Suspended for billing → add a payment method; it resumes automatically
   (the dashboard badge may stay stale — trust the health check)
4. Crashed → `flyctl logs -a vhp-backend`
5. Backend healthy but site still failing → **`PYTHON_BACKEND_URL` is unset or
   wrong in Vercel.** Set it and redeploy.

### Site down entirely

Check the Vercel deployment log first. A failed build leaves the previous
deployment serving, so a "down" site is more often DNS or a domain
misconfiguration than a bad build.

### Wrong PDF being served

The file, not the reference — all five references already point at
`HTR_Book_v42.pdf`. Copy the correct export to `frontend/public/` and push.
Verify with `curl -sI <url> | grep content-length` and compare byte counts.

### Someone must lose access immediately

`is_active = false` takes up to 7 days because of the cookie. For instant
lockout, change the cookie name in `middleware.ts` and redeploy — this signs out
everyone.

### Rolling back

```bash
git revert <sha> && git push origin main    # frontend, via Vercel
flyctl releases -a vhp-backend               # backend
flyctl deploy --image <previous> -a vhp-backend
```

Vercel also offers instant rollback to any prior deployment in its dashboard.

---

## 15. Known gaps and risks

Honest list as of 2026-07-30.

| Risk | Detail | Mitigation |
| :--- | :--- | :--- |
| **No spending-cap *feature* on Fly** | Fly has no setting where you cap the bill at $N and it stops. The *configuration* still bounds it: one `shared-1x-cpu@1024MB` machine × 24/7 = **~$5.70/mo**, regardless of users or requests. | Cost can only rise if the CONFIG changes — a second machine, a larger machine, another region, or adding a Fly service (Postgres, volumes, object storage). Review `backend/fly.toml` before any change that touches `[[vm]]`, `min_machines_running`, or regions. |
| **Revocation lag** | 7-day cookie | Change cookie name for instant lockout |
| **Role-gating bypassed** | `ALLOW_AUTH_BYPASS=true` | Intentional in beta; must flip before GA |
| **No automated DB migrations** | Applied by hand in the SQL editor | Track carefully; migrations are numbered |
| **Supabase free tier pauses** | ~1 week idle → project paused | Upgrade before any quiet period |
| **Groq rate limits** | Free tier | Monitor; upgrade before public launch |
| **Stale architecture docs** | `platform-documentation/` is from 2026-06-06 | This runbook supersedes it where they conflict |
| **15 chapters of old audio** | Only preface/intro/ch1 re-recorded | ~$3 to redo the rest |
| **Book claims drift** | Tool counts etc. go stale as the platform grows | Re-audit after adding tools |
| **No staging environment** | `main` deploys straight to production | Use Vercel preview deployments |
| **Single region** | Fly `sjc` only | Fine for current scale |

### Recurring failure patterns

Four things have caused real problems more than once. All are documented above,
repeated here because they will recur:

1. **Env var set but not redeployed** — Vercel reads them at build time
2. **Local backend won't serve the live site** — Vercel can't see your laptop
3. **Book edits lost to a rebuild** — the `.docx` is generated output
4. **Browser cache masking a fix** — always verify with `curl`, not a reload

---

*Verify anything cost-related against your own dashboards. Everything technical
here was checked against the running system on 2026-07-30.*
