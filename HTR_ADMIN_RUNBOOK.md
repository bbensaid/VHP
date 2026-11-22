# HTR Ecosystem — Administration Runbook

**Last verified: 2026-11-15.** Everything here was checked against the running
system, the accounts (Vercel, Fly, Sanity, Supabase) or the code on that date,
not written from memory. Where something is unverified it says so.

The printable guides in `docs/` (dated 2026-11-14, kept current through
2026-11-15) cover the same ground for a non-technical reader:

| Document | Scope |
| :--- | :--- |
| `docs/HTR_Infrastructure_Inventory_2026-11-14.docx` | Every service, account, plan, cost, diagram; the Mac's tools and Python versions |
| `docs/HTR_Content_Production_Guide_2026-11-14.docx` | Creating content: Sanity, Academy, book; ready-made AI prompts |
| `docs/HTR_Ecosystem_User_Operations_Guide_2026-11-14.docx` | How people use the platform; admin tasks; maintenance; troubleshooting |
| [`BOOK_WORKFLOW.md`](BOOK_WORKFLOW.md) | Day-to-day book editing — read before touching the manuscript |
| [`CLAUDE.md`](CLAUDE.md) | Rules for AI assistants working in this repo |
| [`frontend/docs/auth.md`](frontend/docs/auth.md) | Beta gate + role-gating internals |

`frontend/docs/platform-documentation/` and `docs/01-03*.md` are older
architecture notes (June–October 2026). **When they disagree with this file,
trust this file.**

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
   4 domains ───────▶│  Vercel — Next.js 16 frontend │◀── Sanity webhook
                     │  (single deployment, all 4)   │    (on Publish)
                     └───────┬───────────────┬───────┘
                             │               │
   /api/chat proxy,          │               │ content reads
   /api/webhooks/sanity ──▶  ▼               ▼
                  ┌────────────────┐   ┌──────────────────────┐
                  │ Fly.io         │   │ Sanity (CMS)         │
                  │ vhp-backend    │   │ project fxz10xl7     │
                  │ FastAPI/Python │   │ dataset production   │
                  └───────┬────────┘   └──────────────────────┘
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
unset, Vercel calls `http://localhost:8000` — Vercel's own machine — and the AI
Analyst reports "backend is offline" (happened 2026-07-30). The same rule now
covers `/api/webhooks/sanity`, which forwards Sanity notifications to Fly.

---

## 2. Users and access codes

### How access works

The whole site sits behind an **access-code gate**. Separately, a few routes
(`/chat`, `/dashboard`, `/hti-dashboard`, `/advisory-hub`, `/account`,
`/onboarding`, `/admin`) are **role-gated**, but during the beta that check is
switched off with `ALLOW_AUTH_BYPASS=true` (set in Vercel production on
2026-11-14; it had been missing, which sent testers into a login loop). `/admin`
and the admin APIs check the admin role themselves, so they stay protected.

| Piece | Location |
| :--- | :--- |
| Gate page | `frontend/app/beta/page.tsx` |
| Verify endpoint | `frontend/app/api/beta/verify/route.ts` |
| Request filter (gate + role check) | `frontend/proxy.ts` (Next.js 16's name for middleware) |
| Admin UI | `/admin/access-codes` |
| Admin API | `frontend/app/api/admin/beta-codes/route.ts` |
| Table | Supabase `beta_access_codes` |
| Cookie | `htr_beta=granted:<host>`, **7-day** lifetime, **unsigned** (see §15) |

The only admin account is `bechir.bensaid@gmail.com` (verified 2026-11-15).

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
write.

### Adding, restricting, revoking

**Use `/admin/access-codes`** (sign in as the admin first): add a code with a
label and the domains it works on (all four are ticked by default); untick
domains, switch a code inactive, or delete it on the same page. No deploy is
needed. Prefer *inactive* over *delete* to keep the audit trail.

> ⚠️ **`allowed_domains` must contain the exact host.** On 2026-11-14, of the 12
> active codes, 11 worked only on `healthtransformationreview.org`; the
> remaining one works on all four domains.

> ⚠️ **Revocation is not immediate.** An existing `htr_beta` cookie stays valid
> for up to 7 days. For instant lockout, change the cookie name (`BETA_COOKIE`
> in `proxy.ts` and the verify route) and redeploy — this signs *everyone* out.

### Removing the gate at GA

Delete the beta-gate block in `frontend/proxy.ts` and the cookie check in
`app/layout.tsx`, and set `ALLOW_AUTH_BYPASS=false` (or remove it) in Vercel.

---

## 3. Running and deploying

### Local development

```bash
# Terminal 1 — backend (FastAPI, port 8000)
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2 — frontend (Next.js, port 3000)
cd frontend
npm run dev
```

Then use `http://localhost:3000`. To preview the Review brand locally, use
`review.localhost:3000`.

> `backend/venv` was originally copied from another project, so
> `venv/bin/pip` points into that project's environment. Always install with
> `venv/bin/python -m pip`. Never install or remove Python versions or run
> `brew install` without asking first (2026-11-14: a Homebrew autoremove deleted
> python@3.13 and broke four environments).

> **Running the backend locally does not help the live site.** Vercel cannot see
> your laptop.

### Frontend — Vercel

| | |
| :--- | :--- |
| Account | team `bechirbensaid-url`, project `vhp`, **Hobby (free)** plan |
| Trigger | push to `main` (builds take ~6–7 min) |
| Config | [`vercel.json`](vercel.json) |
| Region | `iad1` |
| Cron | `/api/cron/revalidate` daily at 00:00 |
| CLI | `vercel` is logged in on the Mac; the local `.vercel` link is stale, so pass `--project vhp` / `--scope bechirbensaid-url` |

Environment variables: Vercel → Settings → Environment Variables. After changing
one, **redeploy** (Deployments → ⋯ → Redeploy, or `vercel redeploy <url>`).

Production has 13 variables (read 2026-11-14/15):

| Variable | Purpose |
| :--- | :--- |
| `PYTHON_BACKEND_URL` | `https://vhp-backend.fly.dev` |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Supabase |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION`, `SANITY_API_TOKEN`, `SANITY_TELEMETRY_DISABLED` | Sanity |
| `ALLOW_AUTH_BYPASS` | `true` during beta |
| `INGEST_SECRET` | Vercel → Fly authorisation for AI-library updates |
| `SANITY_WEBHOOK_SECRET` | verifies Sanity's webhook signature |

**Not set:** `RESEND_API_KEY`, `LOOPS_API_KEY`, Stripe keys, Sentry DSN,
`CRON_SECRET`, `NEXT_PUBLIC_APP_URL` (on Vercel the build falls back to
`https://healthtransformationreview.org`).

### Backend — Fly.io

| | |
| :--- | :--- |
| App | `vhp-backend` (personal org, pay-as-you-go, billing status current) |
| Region | `sjc` |
| URL | `https://vhp-backend.fly.dev` |
| Machine | 1 × shared CPU, 1 GB |
| Config | [`backend/fly.toml`](backend/fly.toml) |
| Deploy | GitHub Action, **only on `backend/**` changes** |
| CLI | `fly` is logged in on the Mac |

```bash
fly status  -a vhp-backend
fly logs    -a vhp-backend --no-tail
fly secrets list -a vhp-backend
fly releases -a vhp-backend
```

**Idle behaviour.** Currently **scale-to-zero**: `auto_stop_machines = 'stop'`,
`min_machines_running = 0` (verified on the live machine 2026-11-14). The first
request after idle waited **20 s** (measured). `fly apps list` then shows the
app as "suspended", meaning no machine is running — not an account problem. To
keep it always on (~$5.70/mo, no cold start): set `min_machines_running = 1` and
`auto_stop_machines = 'off'` in `fly.toml` and push.

### Health checks

```bash
curl https://vhp-backend.fly.dev/health
curl -X POST https://healthtransformationreview.org/api/chat \
     -H "Content-Type: application/json" -d '{"message":"what is HIE?"}'
```

The `/api/chat` payload is `{"message": "..."}`. Full browser test suite (57
checks; 57/57 on 2026-11-15):

```bash
cd frontend && PLAYWRIGHT_BASE_URL=https://healthtransformationreview.org node_modules/.bin/playwright test
```

---

## 4. Content: Sanity

Project `fxz10xl7` ("HealthTransformationReview"), dataset `production`,
**free plan** (verified). Studio at `/studio` on any domain (exempt from the
access-code gate). Full guide: the Content Production Guide in `docs/`.

Schema types in `frontend/sanity/schemaTypes/` (19): `academyModule`,
`analystNote`, `audio`, `author`, `blockContent`, `caseStudy`, `category`,
`course`, `dailyInsight`, `definition`, `hospital`, `instructor`,
`investmentDeal`, `policyAnalysis`, `post`, `rhtState`, `subscriber`, `ticker`,
`webinar`.

Documents on 2026-11-15: 299 `academyModule` (one per Academy lesson), 73
`policyAnalysis`, 50 `rhtState`, 36 `definition`, 22 `investmentDeal`, 5
`caseStudy`; none of `webinar`, `post`, `course`, `instructor`, `analystNote`,
`audio`.

**Publishing → the site:** brief pages update within about a minute; lists 2 min;
lessons and deals 5 min; glossary 1 h; everything by the midnight revalidate.

**Publishing → the AI Analyst:** a Sanity webhook (sanity.io/manage → API →
Webhooks, "AI Analyst library update") calls `/api/webhooks/sanity`, which
verifies Sanity's `sanity-webhook-signature` with `SANITY_WEBHOOK_SECRET` and
forwards to Fly `/api/ingest/webhook` with `INGEST_SECRET`; that document's
passages are replaced. Tested end to end 2026-11-15 (≈5 s). Filter:
`policyAnalysis, post, academyModule, caseStudy, definition, analystNote,
webinar`; drafts off. Rejections are logged with a reason:
`vercel logs -p vhp --scope bechirbensaid-url --query sanity-webhook`.

> The secret saved in Sanity is the full string `SANITY_WEBHOOK_SECRET=<code>`
> (the whole env line was pasted on setup); Vercel and `frontend/.env.local`
> hold the same full string. If the webhook is re-created, generate a fresh
> secret and set it in both places.

> **Content rule:** missing or thin content is often *intentional* —
> unverifiable material was deliberately pulled. Do not restore without sign-off.

---

## 5. Content: Supabase

**Project:** `clryhwqaqhvdikgesjbc` · Postgres + pgvector · **Pro plan**, billed
through Vercel Marketplace (resource "Vermont-Health-Platform"). Database ≈1.1 GB
of the 8 GB included.

Holds: user profiles and roles, Academy structure (courses, tracks, lessons,
quizzes), the AI library (`data_rag_documents`), beta access codes, feedback,
bookmarks, ticker/Wire cache, narration audio (Storage bucket `narration-audio`).

**38 migrations** in `supabase/migrations/`, applied by hand in the Supabase SQL
Editor (no automated runner).

> ⚠️ The live RAG table is **`data_rag_documents`** (column `metadata_`).
> `rag_documents` is an empty legacy table; migrations 005/007 target it.

**Two keys:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` (browser-safe, RLS enforced) and
`SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS; server-side only).

---

## 6. AI Analyst: RAG, vectors, models

### Pipeline

```
question
  → OpenAI text-embedding-3-small          (embed)
  → Supabase pgvector + BM25, fused RRF    (retrieve)
  → FlashRank re-ranking                    (order)
  → sentence-window chunking, window 3     (assemble context; ~2,000 tokens)
  → Groq openai/gpt-oss-120b (subscribers), gpt-oss-20b (free)  (generate)
      └─ fallback: OpenAI gpt-4o-mini when Groq refuses or rate-limits
  → stream back through Vercel
```

`/health` on 2026-11-15: `model_subscriber: openai/gpt-oss-120b`,
`reranker: flashrank`, `retrieval: hybrid_bm25_vector_rrf`, `auth_enabled: false`.
Groq free tier measured 2026-11-14: 8,000 tokens/min, 1,000 requests/day per
model. No model runs locally.

The library: **60,299 passages** (2026-11-15): 35,427 from PDFs in
`backend/data/` (Vermont reports and laws, two health-economics reference
books), 20,111 Academy lessons, 4,048 analysis briefs, 539 book, 174 glossary /
case studies / briefings.

### Updating the library

| Source | How |
| :--- | :--- |
| Sanity documents | Automatic via the webhook (§4) |
| All Sanity documents at once | `cd backend && venv/bin/python scripts/reindex_sanity_to_rag.py` (inserts first, then deletes the older Sanity passages) |
| The book | `python3 book-build/refresh_md.py` then `book-build/ingest_book_to_rag.py` |
| Home-page briefings | `backend/venv/bin/python book-build/ingest_briefings_to_rag.py` |
| One PDF | put it in `backend/data/`, then `venv/bin/python scripts/ingest_pdf_to_rag.py "file.pdf"` |

> The Fly endpoints `/api/ingest`, `/api/ingest/status` and
> `/api/ingest/webhook` require `Authorization: Bearer $INGEST_SECRET` and refuse
> everything if the secret is unset (fixed 2026-11-14 — they had been open to
> anyone). Do not run a full rebuild on the 1 GB Fly machine; use the scripts
> above from the Mac.

> LlamaIndex overwrites a passage's `doc_id`/`ref_doc_id` with the Document's
> `id_`. Sanity documents are therefore created with `id_ = <Sanity _id>`, and
> updates look passages up by `metadata_->>'ref_doc_id'` (indexed).

---

## 7. Git and GitHub

| | |
| :--- | :--- |
| Remote | `https://github.com/bbensaid/VHP.git` (public) |
| Default branch | `main` |
| CI | `.github/workflows/ci.yml` |
| Backend deploy | `.github/workflows/fly-deploy.yml` (paths: `backend/**`) |

**Push protection is enabled.** If it fires: remove the secret, amend if it is
only in the latest unpushed commit, rewrite history only if never pushed, and
**rotate the key regardless**. Never use the "allow this secret" link.

`book-archive/` and `Book Latest Version/` are gitignored (local only). The
printable `.docx` guides in `docs/` are gitignored; their generators are in
`docs/generators/`.

---

## 8. Domains

Four domains, **one Vercel deployment**; the brand is resolved per request from
the `Host` header in `frontend/lib/brand.ts`.

| Domain | Brand | Advisory section | Expires | Auto-renew |
| :--- | :--- | :--- | :--- | :--- |
| healthtransformationreview.org | review | hidden (pages 404) | 2027-10-03 | on |
| healthtransformationreview.com | review | hidden (pages 404) | **2026-12-29** | **OFF** |
| healthtransformationsolutions.org | solutions | shown | 2027-05-31 | on |
| healthtransformationsolutions.com | solutions | shown | 2027-05-31 | on |

All four were bought through Vercel (registrar Name.com) and use Vercel DNS.
Renewal of the .com is $12.03/yr. The Review domains strip `www.`; the
Solutions domains add it. Unknown hosts default to `solutions`.

`ACCESS_DOMAINS` in `brand.ts` is the single source of truth for access-code
scoping.

**Email (Google Workspace, set up 2026-11-15).** One mailbox,
`contact@healthtransformationreview.org` (one paid user). The other three
domains are free **User alias domains** in admin.google.com → Account →
Domains, so `contact@` at any of the four lands in the same inbox. All four
have Google MX (`1 smtp.google.com`), SPF (`include:_spf.google.com ~all`),
DKIM (`google._domainkey`) and DMARC (`_dmarc` TXT `v=DMARC1; p=none`) in
Vercel DNS. mail-tester scored 10/10. To send as another domain: Gmail →
Settings → Accounts → "Send mail as".

The site shows `contact@<the domain being viewed>` on every Contact link
(`contactEmailFor(host)` in `brand.ts`; `useBrand().contactEmail` in client
components, `currentContactEmail()` on the server). Unknown hosts fall back to
`ADMIN_EMAIL` = contact@healthtransformationreview.org, which also receives
tester reports. Never hard-code an address anywhere else.

---

## 9. Services, costs, payment schedule

Plans verified in the accounts 2026-11-14/15. Invoice amounts are only on each
provider's billing page; check them monthly.

| Service | Purpose | Plan | Expected cost |
| :--- | :--- | :--- | :--- |
| **Supabase** | Postgres + pgvector + storage | Pro, via Vercel | ~$35/mo (2 active projects in the org: this one and ppm-platform; sommiPicks_Data suspended) |
| **Fly.io** | FastAPI backend | Pay-as-you-go | under $6/mo (scale-to-zero; ~12% uptime on a heavy test day) |
| **Vercel** | Frontend | Hobby (free) | $0 (Pro, $20/mo, needed before commercial use) |
| **Sanity** | CMS | Free | $0 |
| **OpenAI** | Embeddings, fallback answers, Personalized Learning audio | Prepaid | cents |
| **Groq** | Answers | Free | $0 |
| **GitHub** | Repo + Actions | Free | $0 |
| **Domains** ×4 | | Vercel / Name.com | ~$4/mo averaged |
| Resend, Loops, Stripe, Sentry, Anthropic | | Not configured in production | $0 |

Total ≈ **$40–45/month**.

**Fly has no spending-cap setting,** but the configuration bounds it: one 1 GB
shared machine × 24/7 ≈ $5.70/mo is the ceiling. It rises only if the config
changes (second machine, bigger machine, another region, Fly Postgres/volumes).

**Weekly balance reminder:** a launchd agent (`org.htr.fly-balance-reminder`,
still registered 2026-11-15) fires Mondays 09:14, opens the Fly billing page and
logs to `~/.htr-fly-reminder.log`. Script: `scripts/fly-balance-reminder.sh`.
Remove with
`launchctl unload -w ~/Library/LaunchAgents/org.htr.fly-balance-reminder.plist`.

---

## 10. The Book

**Read [`BOOK_WORKFLOW.md`](BOOK_WORKFLOW.md) and the book section of
[`CLAUDE.md`](CLAUDE.md) before touching the manuscript.** Summary:

- **`HTR_Book_v42.docx` is the book.** The live copy is the Google Doc; the
  author edits there and re-uploads as a new Google Doc each round.
- `HTR_Book_v42.md` is a disposable text mirror for searching, regenerated from
  the `.docx` by `python3 book-build/refresh_md.py` (which also rebuilds the web
  reader HTML). Truth flows `.docx → .md`, never back.
- `./book.sh` and the `md → docx` build are **retired**; never regenerate the
  `.docx`.
- Claude edits the `.docx` surgically (`book-build/patch_docx.py`), backs it up
  first, and checks layout with the renderer `python3 book-build/render_check.py`.
  Formatting audit: `python3 book-build/check_format.py`.

### Wiring to the platform

| Surface | Source of truth |
| :--- | :--- |
| Chapter structure | `frontend/lib/taxonomy/chapters.ts` (16 chapters) |
| Tool ↔ chapter map | `frontend/lib/taxonomy/tools.ts` (44 tools) |
| PDF | `frontend/public/HTR_Book_v42.pdf` (author exports from Google Docs) |
| Reader | `/book`, `/read/[slug]` (HTML from `book-build/make_reader_html.py`) |
| Audio | Supabase Storage bucket `narration-audio`, 18 files, re-recorded from the corrected text 2026-10-07 (Piper) |

Audio generators: `scripts/generate-narration-piper.sh` (or `-audio.sh` for
macOS `say`); upload with `frontend/scripts/migrate-narration-audio-to-supabase.mjs`.
A new file is not live until uploaded.

---

## 11. The Academy

### Data model

```
Supabase                          Sanity
  courses (19)                      academyModule (299)
    └─ tracks (105)
        └─ lessons (299) ──sanity_slug──▶ lesson body
```

Structure, ordering and membership live in **Supabase**; each lesson's body is
the Sanity module its `sanity_slug` names. Every module carries its lesson's
title, summary, course title, position and next/previous lesson (aligned
2026-11-15 by `frontend/scripts/academy-retire-old-content.mjs`).

**Routes:** the player is `/academy/tracks/<course>/<lesson>`; the course list
is `/academy/courses`. The legacy addresses `/academy/modules/<slug>` and
`/academy/courses/<slug>` **redirect** to the lesson or course (retired course
slugs map to their replacements; deleted duplicates are redirected in
`next.config.ts`).

### Working rules

- **Seed scripts are upsert-only.** To remove a lesson, delete the DB row. The
  seed sources in `frontend/content/*.json` were aligned with the live Academy
  on 2026-11-15 — keep them in step, or a re-seed resurrects deleted lessons.
- After posting a lesson body to Sanity, **set the lesson's `sanity_slug`**.
- Lesson scripts start with `exec(open('CONTENT_TEMPLATE.py').read())`.
- `node frontend/scripts/audit-courses.mjs` must show every course DONE
  (299/299 on 2026-11-15).
- `AcademyContent.tsx` is the gold-standard renderer.
- Tables are `code` blocks holding a JSON **string** (column order preserved). Never post
  them as object arrays: Sanity alphabetizes object keys (34 tables had to be re-posted
  2026-11-20 with `frontend/scripts/_fix_table_order.mjs`; check with
  `node frontend/scripts/_find_object_tables.mjs out.json` — expect 0).

### 11.1 RHT Program Review pages (`/rht-review`, added 2026-11-20)

Every figure comes from downloaded primary documents; nothing is typed by hand.

| Data file | Built by | From |
|---|---|---|
| `frontend/lib/data/rht-review/states.json` | `book-audit/deep/rht/extract_cms.py` → `build_states.py` | CMS award tables, CMS State Program Snapshots (BP2), CMS RHTP Obligated Funds Report |
| `frontend/lib/data/rht-review/vermont-year1.json` | `book-audit/deep/rht/build_vermont.py` | State of Vermont executed-agreements list, Jan 30 budget narrative, July JFC update |
| `frontend/lib/data/rht-review/state-notes.json` | edited directly | One opened source per note (CMS state press releases, state agencies, news); archived text in `book-audit/deep/sources/rht_states/` |

**Refresh when CMS updates its obligated-funds report** (it said it would after the
Nov 30, 2026 quarterly reports): download the new PDF into `book-audit/deep/sources/rht_vt/`,
point `extract_cms.py` at it, run `extract_cms.py` then `build_states.py`, check the
printed totals (each year must sum to $10.0B), and run `npx playwright test e2e/rht-review.spec.ts`
(it pins source figures, so a changed figure fails until the test is updated to the new source).
For Vermont, re-download the state's agreements page and run `build_vermont.py`
(it asserts the list total equals the state's printed total).

---

## 12. Toolchain

Verified 2026-11-15.

| Layer | Technology | Version |
| :--- | :--- | :--- |
| Frontend | Next.js (App Router) / React | ^16.1.6 / ^19 |
| Runtime | Node.js | v22.14.0 |
| Backend | FastAPI + Uvicorn (local venv) | Python 3.13.18 |
| RAG | LlamaIndex core | 0.14.10 |
| LLM | Groq `openai/gpt-oss-120b` / `gpt-oss-20b`; OpenAI `gpt-4o-mini` fallback | — |
| Embeddings | OpenAI `text-embedding-3-small` | — |
| Re-ranking | FlashRank (ONNX, `max_length=256`) | — |
| Database | Supabase Postgres + pgvector | — |
| CMS | Sanity | API 2023-10-01 |
| Book tooling | pandoc, python-docx, LibreOffice renderer | — |
| Audio | Piper, macOS `say`, ffmpeg, OpenAI TTS | — |
| Deploy | Vercel + Fly.io + GitHub Actions | — |
| CLIs | `vercel`, `fly` (both logged in) | — |

No torch/tensorflow/transformers in the backend; keep it that way.

---

## 13. Secrets and key rotation

### Where secrets live

| Location | Contents | In git? |
| :--- | :--- | :--- |
| `backend/.env` | Groq, OpenAI, Sanity, Supabase, `INGEST_SECRET` | No |
| `frontend/.env.local` | Sanity, Supabase, Resend (local only), `INGEST_SECRET`, `SANITY_WEBHOOK_SECRET` | No |
| Vercel env vars | 13 production variables (§3) | n/a |
| Fly secrets | 11: `FRONTEND_URL`, `GROQ_API_KEY`, `OPENAI_API_KEY`, 4 × Sanity, `SUPABASE_DB_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`, `INGEST_SECRET` | n/a |
| Sanity webhook | the webhook secret | n/a |

```bash
fly secrets list -a vhp-backend
fly secrets set KEY=value -a vhp-backend     # restarts the machine
```

### Rotation checklist

1. Revoke at the provider, create a new key
2. Update `backend/.env` / `frontend/.env.local`
3. Update Vercel → **redeploy**
4. Update Fly (`fly secrets set`) if the backend uses it
5. Confirm the old key is dead

The Resend key exposed on 2026-07-30 is dead (the three old strings were
rejected by Resend on 2026-11-14).

---

## 14. Emergency procedures

### AI Analyst says "backend is offline"

1. `curl https://vhp-backend.fly.dev/health` (allow 20 s for a cold start)
2. `fly status -a vhp-backend` — crashed? billing?
3. Crashed → `fly logs -a vhp-backend --no-tail`
4. Backend healthy but site failing → `PYTHON_BACKEND_URL` unset or wrong in
   Vercel. Set it and redeploy.

### New Sanity content not reaching the AI Analyst

`vercel logs -p vhp --scope bechirbensaid-url --since 1h --query sanity-webhook`
shows each rejected notification with its reason (secret mismatch, missing
signature, stale timestamp). Fly side: `fly logs` for "Sanity webhook".

### Testers sent to the login page

`ALLOW_AUTH_BYPASS` missing or not `true` in Vercel production → set it,
redeploy.

### Site down entirely

Check the Vercel deployment log. A failed build leaves the previous deployment
serving, so "down" is more often DNS or a domain (see the .com expiry in §8).

### Wrong PDF being served

Copy the correct export to `frontend/public/HTR_Book_v42.pdf` and push; compare
`curl -sI <url> | grep content-length` byte counts.

### Someone must lose access immediately

Deactivate the code, then change the cookie name in `proxy.ts` and redeploy —
this signs out everyone.

### Rolling back

- Website: Vercel → Deployments → last good one → Promote to Production (or
  `git revert <sha> && git push`)
- Backend: `fly releases -a vhp-backend`, then redeploy the previous image
- Sanity: document → History → restore; script changes also have JSON backups
  in `sanity-backups/`

---

## 15. Known gaps and risks

As of 2026-11-15.

| Risk | Detail | Mitigation |
| :--- | :--- | :--- |
| **.com domain expiry** | healthtransformationreview.com expires 2026-12-29, auto-renew OFF | Vercel → Domains → Auto Renew ($12.03/yr) |
| **Forgeable beta cookie** | `htr_beta=granted:<host>` is unsigned: anyone who knows the format skips the code | Sign it before inviting more testers (signs everyone out once) |
| **Role-gating bypassed** | `ALLOW_AUTH_BYPASS=true` | Intentional in beta; turn off before GA |
| **No email, payments or error tracking in production** | Resend, Loops, Stripe, Sentry keys not set | Configure before launch |
| **Vercel Hobby plan** | Non-commercial use only | Move to Pro before charging users |
| **Advisory engagement form** | `/advisory/contact` submit sends nothing | Connect or remove; Contact Us uses email |
| **Empty pages** | Webinars and Faculty have no content | Add content or hide |
| **Bed-capacity live data** | Page calls an unset `NEXT_PUBLIC_BACKEND_URL`; server returns baseline numbers anyway | Low priority |
| **No spending cap on Fly** | Config bounds it at ~$5.70/mo | Weekly reminder (§9) |
| **Revocation lag** | 7-day cookie | Rename cookie for instant lockout |
| **Groq free-tier limits** | 8k tokens/min; OpenAI fallback covers overflow | Monitor before public launch |
| **No automated DB migrations** | Applied by hand | Number and record every migration |
| **No staging environment** | `main` deploys straight to production | Use Vercel preview deployments |
| **Pirated PDF in old GitHub PR refs** | 18 Dependabot PR refs still hold the removed Dictionary PDF | GitHub Support request (author) |

### Recurring failure patterns

1. **Env var set but not redeployed** — redeploy after any Vercel variable change
2. **An unset URL variable silently falls back to localhost** — `PYTHON_BACKEND_URL`, `NEXT_PUBLIC_APP_URL`, `BACKEND_URL` have all done this
3. **Local backend won't serve the live site** — Vercel can't see your laptop
4. **Seed files drifting from the live Academy** — a re-seed resurrects deleted lessons
5. **Browser cache masking a fix** — verify with `curl`, not a reload

## 16. RHT review data (added 2026-11-22)

The `/rht-review` pages read JSON from `frontend/lib/data/rht-review/` (no database). Full description: `docs/HTR_Documentation_Addendum_3_2026-11-22.docx`.

| Task | How |
| :--- | :--- |
| Refresh CMS-based figures | `book-audit/deep/rht/extract_cms.py` → `build_states.py`; `extract_uses.py`; `extract_themes.py`; `build_vermont.py` |
| Add or update a state's award list | Save the source in `book-audit/deep/sources/rht_recipients/` (strip `<script>` from saved pages — GitHub push protection blocked a map token once), run/copy `book-audit/deep/rht/parse_recipients_<state>.py` (it asserts count/sum against the source), update `RecipientsNational.tsx` BASIS, the search ledger, `recipient-coverage.json`, and the row count in `frontend/e2e/rht-review.spec.ts` |
| Which states are itemized, and why not the others | `book-audit/deep/rht/recipient_search_ledger.json` |
| Verify after a deploy | `cd frontend && PLAYWRIGHT_BASE_URL=https://healthtransformationreview.org npx playwright test e2e/rht-review.spec.ts` (the local dev server is slow; use the live site) |
| Dev server memory | `npm run dev` grows (4.8 GB after two days); restart it when pages slow down |

Standing rules: Vermont first, California second in every multi-state view; never state that a state has no list without recording where it was searched.

---

*Everything technical here was checked against the running system and the
accounts on 2026-11-14/15. Verify invoice amounts on the providers' billing pages.*
