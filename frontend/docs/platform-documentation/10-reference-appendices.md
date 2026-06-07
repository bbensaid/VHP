# 10 — Reference Appendices

> **Verified against:** `frontend/app/**`, `supabase/migrations/*`, `backend/config.py`, `frontend/.env.production.example`, `frontend/sanity/schemaTypes/*`.

Lookup tables for the whole platform: environment variables, API routes, page routes, Sanity schema, Supabase tables, and a glossary.

## Table of contents
- [A. Environment variables](#a-environment-variables)
- [B. Next.js API routes (`/api/*`)](#b-nextjs-api-routes-api)
- [C. Backend (FastAPI) endpoints](#c-backend-fastapi-endpoints)
- [D. Page routes (full sitemap)](#d-page-routes-full-sitemap)
- [E. Sanity schema types](#e-sanity-schema-types)
- [F. Supabase tables](#f-supabase-tables)
- [G. Glossary of project terms](#g-glossary-of-project-terms)

---

## A. Environment variables

### Frontend (`frontend/.env.local` / Vercel)

| Var | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | public | App base URL |
| `ALLOW_AUTH_BYPASS` | server | Dev/CI only — skip auth gating |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon client key |
| `SUPABASE_SERVICE_ROLE_KEY` | **server-only** | Privileged DB access |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | public | `fxz10xl7` |
| `NEXT_PUBLIC_SANITY_DATASET` | public | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | public | `2023-10-01` |
| `SANITY_API_TOKEN` | server | Sanity write token |
| `SANITY_WEBHOOK_SECRET` | server | Verify Sanity webhooks |
| `INGEST_SECRET` | server | Sanity→backend ingest bridge (matches backend) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | public | Stripe.js |
| `STRIPE_SECRET_KEY` | server | Stripe API |
| `STRIPE_WEBHOOK_SECRET` | server | Verify Stripe webhooks |
| `STRIPE_PRICE_SUBSCRIBER_MONTHLY` / `_YEARLY` | server | Price IDs |
| `STRIPE_PRICE_STUDENT_MONTHLY` / `_YEARLY` | server | Price IDs |
| `STRIPE_PRICE_PROFESSIONAL_MONTHLY` / `_YEARLY` | server | Price IDs |
| `LOOPS_API_KEY` | server | Email |
| `LOOPS_TEMPLATE_WELCOME` / `_DIGEST` / `_PAYMENT_FAILED` / `_TRIAL_ENDING` / `_SURVEY_RESULTS` | server | Email templates |
| `API_KEY_HMAC_SECRET` | server | Hash developer API keys |
| `PYTHON_BACKEND_URL` / `BACKEND_URL` | server | Backend base URL for proxying |
| `NEXT_PUBLIC_SENTRY_DSN` | public | Sentry |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | server | Sentry source maps |

### Backend (`backend/.env` / Fly secrets) — from `backend/config.py`

| Var | Default | Purpose |
|---|---|---|
| `GROQ_API_KEY` | — | Default LLM |
| `ANTHROPIC_API_KEY` | — | Advisory/admin LLM (optional) |
| `OPENAI_API_KEY` | — | Embeddings + last-resort LLM |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Subscriber model |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | — | DB |
| `SUPABASE_SERVICE_ROLE_KEY` | — | Privileged DB |
| `SUPABASE_JWT_SECRET` | — | Verify session JWTs |
| `SUPABASE_DB_URL` | — | Direct Postgres (pgvector) |
| `SANITY_PROJECT_ID` | — | Pull content for ingest |
| `SANITY_DATASET` | `production` | Dataset |
| `SANITY_API_TOKEN` | — | Read content |
| `SANITY_API_VERSION` | `2023-10-01` | API version |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allow-list |
| `INGEST_SECRET` | — | Ingest auth (matches frontend) |
| `SENTRY_DSN` | — | Monitoring |
| `ENVIRONMENT` | `production` | Sentry environment tag |

(Also referenced in `config.py`: `MODEL_FREE`, `MODEL_SUBSCRIBER`, `MODEL_ADVISORY`, `EMBEDDING_MODEL`, `MAX_SYSTEM_PROMPT_LEN`.)

## B. Next.js API routes (`/api/*`)

`frontend/app/api/**/route.ts`:

| Route | Purpose |
|---|---|
| `academy/certificates` | Issue/return a course certificate (idempotent) |
| `admin/beta-codes` | Manage beta access codes |
| `admin/users` | Admin user management |
| `beta/verify`, `beta/clear` | Beta gate |
| `bookmarks` | CRUD bookmarks |
| `chapter-notes` | Book chapter notes |
| `chat` | Proxy to backend RAG chat |
| `suggest` | Follow-up suggestions |
| `cron/digest`, `digest`, `digest/preview` | Email digest |
| `directory` | Member directory |
| `feedback` | Feedback capture |
| `health` | Proxy backend `/health` |
| `hospitals` | Hospital data |
| `hti-scores` | Health Tech Index |
| `keys/create`, `keys/revoke`, `keys/rotate` | Developer API keys |
| `learning-paths` | Learning paths |
| `loops/welcome` | Loops welcome email |
| `personalized-learning`, `personalized-learning/audio` | Personalized learning |
| `rht-states` | RHT state data |
| `role-content` | Role-gated content |
| `search` | Search |
| `state-metrics` | State metrics |
| `stripe/checkout`, `stripe/portal`, `stripe/team-checkout`, `stripe/webhook` | Billing |
| `subscribe` | Newsletter subscribe |
| `tester-report` | Tester reports |
| `webhooks/sanity` | Sanity→backend ingest bridge |
| `wire`, `wire/comments`, `wire/comments/[id]`, `wire/comments/counts` | The Wire + comments |

## C. Backend (FastAPI) endpoints

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /health` | open | Liveness + `index_ready` |
| `POST /api/chat` | subscriber+ | Streaming RAG/agentic chat |
| `POST /api/suggest` | open | Follow-up questions |
| `POST /api/ingest` (202) | `INGEST_SECRET` | Full re-index job |
| `GET /api/ingest/status` | `INGEST_SECRET` | Job status |
| `POST /api/ingest/webhook` (202) | Bearer `INGEST_SECRET` | Incremental ingest |
| `GET /api/v1/states` | API key | All state profiles |
| `GET /api/v1/states/{state_id}` | API key | One state profile |
| `GET /api/v1/survey/results` | API key | Aggregated survey |
| `GET /vermont/bed-capacity` | subscriber+ | Bed capacity |
| `PATCH /vermont/bed-capacity/{hospital_id}` | subscriber+ | Update capacity |
| `GET /vermont/alerts` | subscriber+ | Capacity alerts |
| `POST /vermont/transfer-log` | subscriber+ | Log a transfer |
| `GET /vermont/transfer-log` | subscriber+ | Read transfers |
| `/api/personalized-learning*` | subscriber+ | Personalized path generation |

## D. Page routes (full sitemap)

> ~160 page routes. Dynamic segments shown as `[param]`.

**Top-level / marketing:** `/`, `/about`, `/about/framework`, `/about/methodology`, `/mission`, `/values`, `/pricing`, `/subscribe`, `/upgrade`, `/faq`, `/changelog`, `/developers`, `/privacy`, `/terms`, `/site-map`, `/search`, `/setup`, `/welcome`, `/start`, `/onboarding`, `/tester`.

**Auth:** `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/beta`, `/verify/[hash]`.

**Six pillars:** `/policy` (+ `/[slug]`, regulation, mandates, global, feasibility) · `/economics` (+ `/[slug]`, value, market, investment, cea) · `/technology` (+ `/[slug]`, ai, digital, security, workflow) · `/clinical` (+ `/[slug]`, hah, precision, virtual, population, genomics) · `/equity` (+ `/[slug]`, sdoh, bias, access) · `/operations` (+ `/[slug]`, revenue-cycle, supply-chain, workforce, compliance, payer-network).

**Articles/reading:** `/articles/[slug]`, `/read/[slug]`, `/library`.

**Academy:** `/academy`, `/academy/courses` (+ `/[slug]`), `/academy/tracks` (+ `/[courseSlug]` + `/[lessonSlug]`), `/academy/modules/[slug]`, `/academy/case-studies` (+ `/[slug]`), `/academy/faculty`, `/academy/glossary`, `/academy/webinars` (+ `/[slug]`), `/academy/getting-started` (+ `/research-lab`), `/academy/personalized-learning`, `/academy/medicaid` (+ `/glossary`).

**Account:** `/account`, `/account/{profile,billing,subscription,courses,bookmarks,referrals,api-keys}`, `/saved`.

**Admin:** `/admin`, `/admin/{users,analytics,revenue,access-codes,role-changes,ingest}`.

**Advisory:** `/advisory`, `/advisory-hub`, `/advisory/{approach,capability-assessment,consulting,contact,financial-audit,independent-review,it-consulting,regulatory,reports,research,services,training}`.

**Dashboards / states / simulators:** `/states` (+ `/[state]`), `/dashboard` (+ `/[state]` + `/hospitals` + `/hospitals/[hospital]`, `/compare`, `/simulator`, `/vermont/hospitals/...`), `/compare-states`, `/htr-index`, `/htr-simulator`, `/hti-dashboard`, `/impact-simulation`, `/investment-tracker`, `/transformation-friction-index`, `/bed-capacity`, `/ahead-model`.

**Vermont-specific:** `/vermont-act-167` (+ `/hospitals/[slug]`, `/simulator`), `/vermont-act-68` (+ `/simulator`), `/vermont-rht-program`, `/vermont-blueprint`, `/vermont-medicaid`, `/vermont-sash`, `/vermont-sdoh`, `/vermont-vcci`, `/vermont-designated-agencies`, `/vermont-legislative-resources`.

**Other states:** `/california-calaim` (+ `/simulator`), `/oregon-cco` (+ `/simulator`), `/medicaid-eligibility-simulator`.

**Research Lab:** `/research-lab` (+ `interoperability`, `knowledge-workspace`, `payment-models`, `policy-quality`, `population-equity`, `technology-ai`, `vbc-clinical-quality`).

**Content/media/community:** `/the-wire`, `/trending-topics`, `/book` (+ `/listen`), `/media/videos`, `/multimedia`, `/community` (+ `/[slug]`, `/new`, `/thread/[id]`), `/connect` (+ `alerts`, `apply`, `ask`, `directory`, `forums`, `register-office-hours`, `toolkits`), `/connect-hub`, `/survey` (+ `/results`, `/thank-you`), `/system-vitals`.

**CMS:** `/studio/[[...index]]` (embedded Sanity Studio).

## E. Sanity schema types

22 types, registered in `frontend/sanity/schemaTypes/index.ts`:

`blockContent` (object), `category`, `post`, `author`, `policyAnalysis` (Analysis), `hospital`, `academyModule`, `caseStudy`, `course`, `webinar`, `report`, `ticker`, `dailyInsight`, `analystNote`, `instructor`, `definition`, `audio`, `rhtState`, `statePerformanceIndex`, `subscriber`, `investmentDeal`.

Field details in [Doc 03 §3–§6](./03-content-sanity.md).

## F. Supabase tables

58 `CREATE TABLE` statements across 34 migrations. Grouped:

- **Identity/billing:** `profiles`, `user_roles`, `subscriptions`, `stripe_customers`, `stripe_events`, `role_change_log`, `beta_access_codes`.
- **Academy (legacy):** `course_enrollments`, `module_progress`, `certifications`, `learning_tracks`.
- **Academy (player):** `courses`, `tracks`, `lessons`, `quizzes`, `quiz_questions`, `quiz_options`, `audio_slots`, `course_player_enrollments`, `course_lesson_progress`, `course_quiz_attempts`, `learner_audio_uploads`, `lesson_bookmarks`, `lesson_notes`.
- **RAG:** `rag_documents`, `rag_query_log`, `rag_feedback`.
- **Content data:** `hospitals`, `hospitals_cms`, `hti_scores`, `state_health_metrics`, `state_initiatives`, `state_time_series`, `national_benchmark`, `rht_state_profiles`, `ticker_cache`.
- **Community/engagement:** `community_categories`, `community_threads`, `community_posts`, `community_upvotes`, `wire_comments`, `wire_comment_upvotes`, `bookmarks`, `chapter_notes`, `professional_profiles`.
- **Growth/ops:** `referral_codes`, `referral_events`, `api_keys`, `survey_editions`, `survey_responses`, `webhook_inbox`, `user_learning_paths`, `conversations`, `conversation_messages`.
- **Advisory:** `advisory_clients`, `advisory_reports`.

Schema details in [Doc 04](./04-content-supabase.md).

## G. Glossary of project terms

| Term | Meaning |
|---|---|
| **HTR** | Healthcare Transformation Roadmap — the internal name for the platform/brand |
| **AI Brain** | The FastAPI backend (`backend/`), title "HTR AI Brain" |
| **Six-Pillar Framework** | Policy, Economics, Technology, Clinical, Equity, Operations |
| **Analysis** | A research brief (`policyAnalysis` in Sanity) |
| **The Wire** | Live news/insight feed (`/the-wire`) |
| **RHT** | Rural Health Transformation (program) — `rhtState` profiles |
| **HTI** | Health Tech Index — `hti_scores` |
| **RAG** | Retrieval-Augmented Generation — the AI Analyst's grounding method |
| **Course Player** | The relational Academy model (migration 028+): courses→tracks→lessons |
| **`sanity_slug`** | The lesson column linking a Supabase lesson to its rich Sanity body |
| **Ingest** | The pipeline that copies published Sanity content into the RAG vector store |
| **AHEAD model** | A CMS state total-cost-of-care model (`/ahead-model`) |
| **CalAIM / CCO** | California / Oregon Medicaid transformation programs (simulators) |
| **Act 167 / Act 68** | Vermont legislation modeled by simulators |

---

*End of the Vermont Health Platform documentation set. Return to → [Index](./00-README-INDEX.md).*
