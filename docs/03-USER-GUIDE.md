# 3 — Functional & Operational User Guide

**What this document is:** what the platform actually does from a user's seat
— every major area, who can access it, and how the day-to-day operational
tasks are performed.

**Verified against the running codebase on 2026-09-07.**

---

## 3.1 What this platform is

Three things that reinforce each other:

1. **The book** — *Transforming Healthcare: A Five-Pillar Framework with
   Vermont as the National Proving Ground.* The intellectual foundation.
2. **The platform** — pillar intelligence hubs, a Research Lab of interactive
   analytical tools, state dashboards, and an AI Analyst grounded in the
   book's evidence base.
3. **The Academy** — structured courses, tracks, and certifications.

The organising idea running through all three: **five pillars**
(Policy → Technology → Economics → Clinical → Operations), each held to a
cross-cutting **Equity Imperative** ("is it just?").

---

## 3.2 Getting in

### The beta gate
The site currently sits behind a beta gate. A valid code (checked against the
`beta_access_codes` table) sets a cookie and unlocks the site. Codes can be
scoped to a specific domain.

### Accounts and tiers
Sign up at `/signup`, log in at `/login`, reset via `/forgot-password`.

| Tier | Price | What it adds |
| :--- | :--- | :--- |
| **Free** | — | Public content, limited AI |
| **Student** | $19/mo · $180/yr | Academy courses and certifications |
| **Subscriber** | $29/mo · $279/yr | All articles, reports, AI Analyst, dashboards |
| **Professional** | $99/mo · $959/yr | Certification tracks, CME credits |
| **Team** | $23/seat/mo (2–25 seats) | Subscriber access, centrally billed |
| **Advisory / Admin** | Internal | Advisory tooling; admin console |

Access is strictly hierarchical — each tier includes everything below it.
Hitting a gated feature redirects to `/upgrade`. Billing is managed at
`/account` and `/billing-policy` (Stripe customer portal).

---

## 3.3 The five pillar hubs

Each pillar has an intelligence hub with topic cards, tools, courses, latest
reports, and a "From the Book" callout linking to the relevant chapters.

| Hub | Question it answers | Path |
| :--- | :--- | :--- |
| **Policy** | Is it permissible? | `/policy` |
| **Technology** | Is it possible? | `/technology` |
| **Economics** | Is it sustainable? | `/economics` |
| **Clinical** | Is it effective? | `/clinical` |
| **Operations** | Is it executable? | `/operations` |
| **The Equity Imperative** | **Is it just?** | `/equity` |

The Equity Imperative is deliberately **not** presented as a sixth pillar —
it appears as a cross-cutting test applied to all five, in the navigation, on
the framework map, and in the scoring tools.

**`/about/framework`** is the interactive Five-Pillar Map: five nodes, nine
directed dependencies, with the Equity Imperative drawn as the ring enclosing
them. Click any pillar to trace what it enables, drives, or requires.

---

## 3.4 The Research Lab

**`/research-lab`** — 39 registered interactive tools, grouped into benches:

| Bench | Contains |
| :--- | :--- |
| `policy-quality` | Policy Simulator, H.R. 1 Cliff, Work Requirements Calculator, Hospital Stress Test, Clinical Quality Optimizer |
| `payment-models` | APM Design Lab, Global Budget Modeler, Shared Savings Calculator, CEA Calculator |
| `interoperability` | FHIR Lab, Risk Stratification Engine, EMR/EHR Lab, Statewide EHR Modeler |
| `technology-ai` | AI Clinical Governance Lab, Digital Health Lab |
| `vbc-clinical-quality` | Clinical Data Exchange, VBC Quality Measures, High vs. Low Value Care |
| `population-equity` | **Health Equity Studio (HEROI)**, Population Health Modeler — the Equity Imperative's cross-cutting group |
| `knowledge-workspace` | Transformation Scorecard, VBC Readiness Assessment, Workforce Modeler, CIN & EMS Modelers, Evidence Library |

**Top-level simulators and dashboards**
- `/htr-simulator` — score a transformation scenario across the five pillars,
  with the Equity Imperative applied as a justice check.
- `/impact-simulation` — model a scenario (hospital restructuring, global
  budgets, Hospital-at-Home, EMS regionalization) and see it propagate.
- `/transformation-friction-index` — quantify implementation barriers.
- `/hti-dashboard` — Health Transformation Index scoring engine.
- `/dashboard`, `/states`, `/compare-states` — 50-state performance data.
- `/bed-capacity` — live Vermont bed availability and transfer routing.
- `/investment-tracker` — M&A, VC, and PE activity.

---

## 3.5 The AI Analyst

Available as a **sidebar widget** throughout the site and as a **full chat at
`/chat`**.

**What it's good at**
- Vermont operational questions — it calls live data tools for hospital
  financials, bed capacity, Act 167 recommendations, transfer routing, and
  HSA population data.
- Policy and framework questions grounded in the book and platform content,
  with citations.
- Pointing you to the right tool or page for a task.

**How it behaves**
- Classifies your question first (Vermont-operational / Vermont-policy /
  national), then answers accordingly.
- Answer quality scales with your tier — higher tiers route to stronger models.
- It is instructed never to fabricate statistics or citations; if it doesn't
  know, it should say so and point to a resource.

**Expected quirk:** the very first message after a quiet period may take
5–15 seconds while the backend wakes from sleep. Subsequent messages are fast.
This is a deliberate cost tradeoff.

---

## 3.6 The Academy

**`/academy`** — 14 courses, all with rich content.

| Area | Path |
| :--- | :--- |
| Course catalog / tracks | `/academy/tracks` |
| Getting started (role-personalized) | `/academy/getting-started` |
| Personalized learning | `/academy/personalized-learning` |
| Case studies | `/academy/case-studies` |
| Webinars | `/academy/webinars` |
| Glossary | `/academy/glossary` |
| Faculty | `/academy/faculty` |

**Courses include:** Medicaid 101 · Value-Based Care · Health Equity & SDOH ·
AI & Machine Learning in Healthcare · Interoperability & Data Exchange ·
Population Health Management · Medicare Fundamentals · Behavioral Health
Integration · Revenue Cycle Management · Hospital Finance · Clinical Quality
Measurement · Medicaid Managed Care Operations · Genomics & Precision
Medicine · HIE & Health Reform (onboarding).

**Learner features:** progress tracking, quizzes with passing scores,
bookmarks, lesson notes, audio slots, and certificates
(`/api/academy/certificates`).

---

## 3.7 The book on the platform

| Feature | Path |
| :--- | :--- |
| Book landing page + chapter browser | `/book` |
| Reader mode (chapter by chapter) | `/read/[slug]` |
| Audio narration | `/book/listen` |
| Saved chapters and notes | `/saved`, `/library` |

Every chapter maps to platform tools through "Work This Chapter on the
Platform" tables, and pillar pages carry "From the Book" callouts pointing
back to the relevant chapters. `frontend/lib/taxonomy/chapters.ts` is the
single source of truth for that mapping.

---

## 3.8 Other user-facing areas

| Area | Path | Notes |
| :--- | :--- | :--- |
| **The Wire** | `/the-wire` | News feed with comments and upvotes |
| **Community** | `/community` | Threads, posts, upvotes |
| **Connect** | `/connect` | Peer cohorts, expert office hours, pillar circles, grant finder |
| **Advisory** | `/advisory` | 8 practice areas — **hidden on the `review` brand** |
| **Vermont programs** | `/vermont-act-167`, `/vermont-act-68`, `/vermont-medicaid`, `/vermont-blueprint`, `/vermont-rht-program`, and more | Program deep-dives |
| **Medicaid eligibility simulator** | `/medicaid-eligibility-simulator` | Step-through eligibility screening |
| **Search** | `/search` | Site-wide |
| **Admin console** | `/admin` | Beta codes, user management |
| **System vitals** | `/system-vitals` | Platform health |
| **Sanity Studio** | `/studio` | Content editing (embedded) |

---

## 3.9 Operational runbook — routine tasks

### Publish new editorial content
1. Open **`/studio`**, create/edit the document, publish.
2. The Sanity webhook fires ingestion automatically, so the AI Analyst picks
   it up. Verify with `curl https://vhp-backend.fly.dev/api/ingest/status`.
3. If the AI still can't find it, that content type may not be in
   `SANITY_QUERIES` (`backend/services/indexing.py`).

### Add or update an Academy lesson
1. Write the lesson body in Sanity (`academyModule`).
2. Ensure the Supabase lesson row's **`sanity_slug`** matches the Sanity slug —
   otherwise learners see thin placeholder content:
   ```bash
   cd frontend
   node scripts/link-sanity-slugs.mjs            # dry run
   node scripts/link-sanity-slugs.mjs --commit
   node scripts/audit-courses.mjs                # verify rich/total
   ```

### Push course structure changes live
Course structure lives in `frontend/content/*.json`. After editing:
```bash
cd frontend
node scripts/seed-all-courses.mjs     # upsert-only, safe to re-run
```
This writes to the **production** database. It never deletes — removing a
course or lesson means deleting Supabase rows directly.

### Rebuild the AI's knowledge index
```bash
curl -X POST https://vhp-backend.fly.dev/api/ingest \
     -H "Authorization: Bearer $INGEST_SECRET"
```
Run after backend deploys, bulk content imports, or embedding model changes.

### Grant or change a user's access
Roles live in the `user_roles` table; a user gets the **highest** role they
have a row for. Paid roles are normally set automatically by the Stripe
webhook. Manual overrides go through `/admin` or a direct DB update.

### Issue beta access codes
`/admin/beta-codes` (or the `beta_access_codes` table). Codes can be
domain-scoped.

### Publish a new edition of the book
1. `./book.sh check` — surface any Google Docs edits not yet in the Markdown.
2. Fold those edits into `HTR_Book_v42.md`.
3. `python3 book-build/check_manuscript.py` — must report 0 errors.
4. `./book.sh build` — regenerate the `.docx`.
5. Upload that `.docx` to Google Docs → Download as PDF → save over
   `HTR_Book_v42.pdf`.
6. Copy the PDF to `frontend/public/` so `/book` and `/read` serve the
   current edition.

> Verify the PDF is actually current before wiring it in — a stale export has
> shipped before.

---

## 3.10 Deploying changes

| Change to | How it ships |
| :--- | :--- |
| Anything under `frontend/` | Push to `main` → Vercel auto-deploys |
| Anything under `backend/` | Push to `main` → GitHub Action deploys to Fly |
| Database schema | **Manual** — apply the migration in Supabase |
| Content (Sanity) | Publish in Studio — live immediately |
| Course structure | Run the seed script manually |

**Before pushing**, run the local gate:
```bash
cd frontend && npm run smoke     # typecheck + lint + build + bundle budget
```

---

## 3.11 If something looks wrong

| What you see | Likely cause |
| :--- | :--- |
| First AI message is slow | Backend cold start — normal |
| AI gives vague answers, misses recent content | Index not rebuilt, or OpenAI credit exhausted |
| Academy lesson looks thin/placeholder | `sanity_slug` not linked |
| Paid feature still locked after payment | Stripe webhook didn't land — check `stripe_events` |
| Advisory section missing | Expected on the `review` brand domains |
| New Sanity content invisible to the AI | Content type not in the ingestion queries |

**Quick health checks**
```bash
curl https://vhp-backend.fly.dev/health
flyctl status -a vhp-backend
cd frontend && node scripts/audit-courses.mjs
```
