# 04 — Content & Data: Supabase

> **Verified against:** `supabase/migrations/001…033` + dated migrations, `backend/services/db.py`, `frontend/lib/supabase.ts`, `frontend/lib/auth.ts`.

Supabase is the **application database, auth provider, file storage, and vector store**. Sanity holds prose; Supabase holds *people, permissions, progress, money, and embeddings.*

## Table of contents
1. [What Supabase provides](#1-what-supabase-provides)
2. [Migrations: the source of schema truth](#2-migrations-the-source-of-schema-truth)
3. [Identity, roles & subscriptions](#3-identity-roles--subscriptions)
4. [The Academy data tables](#4-the-academy-data-tables)
5. [RAG / pgvector tables](#5-rag--pgvector-tables)
6. [Community, bookmarks, notes, referrals](#6-community-bookmarks-notes-referrals)
7. [Row-Level Security (RLS)](#7-row-level-security-rls)
8. [Storage buckets](#8-storage-buckets)
9. [Common admin operations](#9-common-admin-operations)
10. [Seeding & data loaders](#10-seeding--data-loaders)

---

## 1. What Supabase provides

| Capability | Used for |
|---|---|
| **Postgres** | All relational app data (tables below) |
| **Auth (GoTrue)** | Email/password + session JWTs (`auth.users`) |
| **Storage** | Certificate PDFs, audio uploads, report files |
| **pgvector** | RAG semantic search (HNSW index) |
| **RLS** | Per-user data isolation enforced in the DB |

Clients:
- Frontend server/client: `frontend/lib/supabase.ts` (`@supabase/ssr`), anon key for the browser, service-role key for privileged server work.
- Backend: `backend/services/db.py` — a service-role Supabase singleton; also a direct Postgres URL (`SUPABASE_DB_URL`) for pgvector.

## 2. Migrations: the source of schema truth

`supabase/migrations/` contains **34 ordered, append-only** SQL files. The schema is whatever these produce when run in order.

| # | Migration | Adds |
|---|---|---|
| 001 | profiles_and_roles | `profiles`, `user_roles` (enum `user_role`), `subscriptions` (enum `subscription_status`), `set_updated_at()` trigger |
| 002 | content_data | hospitals, state metrics, benchmarks, time-series |
| 003 | academy | `course_enrollments`, `module_progress`, `certifications` |
| 004 | advisory | advisory clients & reports |
| 005 | rag_vectors | pgvector store (`rag_documents`) |
| 006 | rls_policies | base RLS |
| 007 | hybrid_search | hybrid (vector+keyword) search SQL function |
| 008 | rls_audit | RLS audit |
| 009 | referrals | `referral_codes`, `referral_events` |
| 010 | community | `community_*` tables |
| 011 | api_keys | developer API keys |
| 012 | survey | survey editions/responses |
| 013 | role_audit | role change auditing |
| 014 | webhook_inbox | inbound webhook log |
| 015 | rag_query_log | log of RAG queries |
| 016 | bookmarks | `bookmarks` |
| 017 | ticker_cache | cached ticker metrics |
| 018 | role_change_log | role change log |
| 019 | user_learning_paths | personalized learning paths |
| 020 | rag_query_log_pruning | retention |
| 021 | pgvector_hnsw_maintenance | HNSW index maintenance |
| 022 | hti_scores | Health Tech Index scores |
| 023 | api_key_rotation_and_directory | key rotation + member directory |
| 024 | rag_feedback | thumbs up/down on RAG answers |
| 025 | wire_comments | The Wire comments |
| 026 | chapter_notes | book chapter notes |
| 027 | digest_opt_in | email digest preference |
| 028 | course_schema | **new course player:** `courses`, `tracks`, `lessons`, `quizzes`, `quiz_questions`, `quiz_options`, `audio_slots`, progress + attempts tables |
| 029 | course_pillar_level | pillar/level on courses |
| 030 | course_featured | featured flag |
| 031 | lesson_sanity_slug | `lessons.sanity_slug` (link to Sanity body) |
| 032 | course_chapter_ref | course↔book chapter |
| 033 | course_chapter_ref_backfill | backfill above |
| 2026-04-11 | beta_access_codes | `beta_access_codes` |

> **Rule:** never edit a migration that has shipped. To change schema, add the next-numbered file. Apply with `supabase db push` or `psql "$SUPABASE_DB_URL" -f <file>`.

## 3. Identity, roles & subscriptions

**`profiles`** — one row per `auth.users` id: `email`, `full_name`, `avatar_url`, `org_name`, `bio`, timestamps. Auto-`updated_at` via trigger.

**`user_roles`** — `role` (enum `user_role`, default `free`), `expires_at` (NULL = permanent), `granted_by` (admin who granted). The role ladder: `free` → `subscriber` → `professional` → `advisory` → `admin`. Role changes are logged to `role_change_log` (auditing in `/admin/role-changes`).

**`subscriptions`** — one row per user: `stripe_customer_id`, `stripe_subscription_id`, `plan`, `status` (enum), `current_period_*`, `cancel_at_period_end`. This **mirrors Stripe** — the Stripe webhook (`/api/stripe/webhook`) keeps it in sync. `stripe_customers` and `stripe_events` track the raw Stripe side; `stripe_events` provides idempotency.

> **Source of truth for billing is Stripe.** Supabase is a fast-read mirror. Never edit `subscriptions` by hand to grant access — either change Stripe or grant a role in `user_roles`.

## 4. The Academy data tables

There are **two generations** of Academy schema, both present:

- **Legacy/CMS-driven (mig. 003):** `course_enrollments`, `module_progress`, `certifications` — keyed to Sanity slugs (`course_slug`, `module_slug`).
- **Course Player (mig. 028+):** a fully relational model:
  - `courses` → `tracks` → `lessons` (FK chain, cascade delete).
  - `lessons` columns: `track_id`, `pillar` (`htr_pillar` enum), `order`, `slug`, `title`, `summary`, `estimated_minutes`, `objectives` (JSONB), `content_blocks` (JSONB — *legacy thin content*), `tags`, `related_lesson_ids`, `is_published`, and **`sanity_slug`** (mig. 031 — links to the rich Sanity body).
  - `quizzes` → `quiz_questions` → `quiz_options`.
  - `audio_slots`, `learner_audio_uploads` — narration & learner audio.
  - Progress/attempts: `course_player_enrollments`, `course_lesson_progress`, `course_quiz_attempts`.
  - `lesson_bookmarks`, `lesson_notes`.

> **The `sanity_slug` rule (critical):** if a lesson's `sanity_slug` is empty, the app renders the thin `content_blocks` JSON instead of the rich Sanity body. After posting lesson content to Sanity, set each lesson row's `sanity_slug` = the Sanity slug/`_id` using `frontend/scripts/link-sanity-slugs.mjs`. Full Academy mechanics in [Doc 05](./05-academy-system.md).

**`certifications`** — `cert_name`, `cert_type` (completion/professional/cme), `course_slug`, `issued_at`, `expires_at`, `cert_url` (Storage PDF), `verification_hash` (powers the public `/verify/[hash]` page), `metadata`.

## 5. RAG / pgvector tables

- `rag_documents` — chunked, embedded content (vector column + metadata: source slug, type, pillar). HNSW index maintained by migration 021.
- `rag_query_log` — every RAG query (pruned by 020).
- `rag_feedback` — thumbs up/down per answer (024).
- Hybrid search SQL function (007) combines vector similarity with keyword match; the backend `HybridRetriever` calls it. See [Doc 06](./06-ai-analyst-rag.md).

## 6. Community, bookmarks, notes, referrals

| Feature | Tables | Surfaces at |
|---|---|---|
| Community forums | `community_categories`, `community_threads`, `community_posts`, `community_upvotes` | `/community`, `/connect/forums` |
| The Wire comments | `wire_comments`, `wire_comment_upvotes` | `/the-wire` |
| Bookmarks | `bookmarks`, `lesson_bookmarks` | `/saved`, `/account/bookmarks` |
| Notes | `lesson_notes`, `chapter_notes` | lessons, book reader |
| Referrals | `referral_codes`, `referral_events` | `/account/referrals` |
| Survey | `survey_editions`, `survey_responses` | `/survey` |
| Developer API | `api_keys` (HMAC-hashed, rotatable) | `/account/api-keys`, `/api/v1/*` |
| Digest | `digest_opt_in` column | email digest cron |
| Beta gating | `beta_access_codes` | `/beta`, `/api/beta/verify` |

## 7. Row-Level Security (RLS)

RLS is **on** for user-owned tables (migrations 006, 008). The pattern:
- A user may `select`/`insert`/`update` only rows where `user_id = auth.uid()`.
- Service-role (backend, server route handlers) bypasses RLS — so privileged operations run server-side with `SUPABASE_SERVICE_ROLE_KEY`, never from the browser.
- Admin reads (e.g. `/admin/users`) go through server route handlers using the service role + an in-app role check.

> ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. It is server-only.

## 8. Storage buckets

Supabase Storage holds binary artifacts:
- Certificate PDFs (`certifications.cert_url`).
- Learner audio uploads (`learner_audio_uploads`).
- Report files where not stored in Sanity.

## 9. Common admin operations

**Grant a role to a user** (e.g. comp a subscription) — preferred over editing `subscriptions`:

```sql
INSERT INTO public.user_roles (user_id, role, granted_by)
VALUES ('<user-uuid>', 'professional', '<admin-uuid>')
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role, granted_at = NOW();
-- (also logged via role_change_log; prefer the /admin/users UI which logs automatically)
```

**Look up a user's effective access:**

```sql
SELECT p.email, r.role, r.expires_at, s.plan, s.status, s.current_period_end
FROM profiles p
LEFT JOIN user_roles r   ON r.user_id = p.id
LEFT JOIN subscriptions s ON s.user_id = p.id
WHERE p.email = '<email>';
```

**Issue/verify a beta code:** insert into `beta_access_codes`; users redeem at `/beta`.

Prefer the **Admin UI** (`/admin/users`, `/admin/access-codes`, `/admin/role-changes`) — it writes audit rows for you.

## 10. Seeding & data loaders

| Goal | Script |
|---|---|
| Seed Academy courses (structure) | `frontend/scripts/seed-courses.mjs` (also `npm run seed:courses`), `seed-all-courses.mjs`, `seed-courses-tier2.mjs` |
| Link lesson rows to Sanity bodies | `frontend/scripts/link-sanity-slugs.mjs` |
| Load CMS hospital data | `backend/scripts/load_cms_hospitals.py`, `sync_hospitals.py` |
| Load CMS quality scores / HTI | `backend/scripts/load_cms_quality_scores.py`, `sync_hti_scores.py` |
| Seed Supabase content | `frontend/scripts/seed-supabase.js`, `seed-content.ts` |
| Reset DB (⚠️ destructive) | `frontend/scripts/reset-database.js` |

> ⚠️ **Seed scripts are upsert-only (no delete) by design.** Course membership lives in Supabase. To *remove* a lesson from a course you must delete the DB row directly (and check all tracks for dupes/orphans) — re-running a seed will not remove it. See [Doc 05](./05-academy-system.md).

Continue to → [05 — The Academy System](./05-academy-system.md)
