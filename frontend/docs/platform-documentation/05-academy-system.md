# 05 — The Academy System

> **Verified against:** `supabase/migrations/028…033`, `frontend/lib/course-api.ts`, `frontend/components/AcademyContent.tsx`, `frontend/app/academy/*`, `frontend/app/api/academy/certificates/route.ts`, `CONTENT_TEMPLATE.py`, `frontend/scripts/seed-courses.mjs`, `frontend/scripts/link-sanity-slugs.mjs`.

The Academy is the learning side of the platform: courses, tracks, lessons, quizzes, progress tracking, certificates, and personalized learning paths. It is the most intricate subsystem because it spans **Supabase (structure + progress)** and **Sanity (rich lesson bodies)** simultaneously.

## Table of contents
1. [The hybrid data model](#1-the-hybrid-data-model)
2. [Academy routes](#2-academy-routes)
3. [The course-api layer](#3-the-course-api-layer)
4. [Authoring a lesson — the canonical workflow](#4-authoring-a-lesson--the-canonical-workflow)
5. [The CONTENT_TEMPLATE block system](#5-the-content_template-block-system)
6. [Quizzes](#6-quizzes)
7. [Progress, enrollment & certificates](#7-progress-enrollment--certificates)
8. [Personalized Learning](#8-personalized-learning)
9. [Seeding courses & linking Sanity bodies](#9-seeding-courses--linking-sanity-bodies)
10. [Maintenance gotchas (read before touching)](#10-maintenance-gotchas-read-before-touching)

---

## 1. The hybrid data model

```
SUPABASE                                   SANITY
─────────                                  ────────
courses ──┐
          ├─< tracks ──< lessons ──┐       academyModule / policyAnalysis
          │                        │  link  (the rich Portable Text BODY)
          │     lessons.sanity_slug├──────►  document.slug / _id
          │                        │
          └─< quizzes ──< quiz_questions ──< quiz_options

course_player_enrollments      ← who's enrolled
course_lesson_progress         ← which lessons completed
course_quiz_attempts           ← quiz scores
certifications                 ← issued certs (PDF in Storage)
```

**The golden rule:** a `lesson` row in Supabase carries metadata (title, order, pillar, objectives) and a `sanity_slug`. The lesson's *displayed content* comes from the Sanity document whose slug equals `sanity_slug`. If `sanity_slug` is blank, the renderer falls back to the thin legacy `content_blocks` JSON on the row.

## 2. Academy routes

| Route | Purpose |
|---|---|
| `/academy` | Academy home |
| `/academy/courses` | Course catalog |
| `/academy/tracks` | Learning tracks |
| `/academy/modules` | Modules |
| `/academy/case-studies` | Case studies (Sanity `caseStudy`) |
| `/academy/faculty` | Instructors (Sanity `instructor`) |
| `/academy/glossary` | Definitions (Sanity `definition`) |
| `/academy/webinars` | Events (Sanity `webinar`) |
| `/academy/getting-started` | Onboarding |
| `/academy/personalized-learning` | Standalone personalized path page (not a tab) |
| `/academy/medicaid` | Medicaid course area |
| `/account/courses` | A learner's enrolled courses + progress |
| `/verify/[hash]` | Public certificate verification |

## 3. The course-api layer

`frontend/lib/course-api.ts` is the typed gateway to the course player. Key functions:

| Function | Does |
|---|---|
| `getCourseWithProgress(...)` | Loads a course + its tracks/lessons + the caller's progress |
| `enrollUser(...)` | Creates a `course_player_enrollments` row |
| `updateLessonProgress(...)` | Marks lesson complete / records time |
| `recordQuizAttempt(...)` | Writes a `course_quiz_attempts` row |
| `updateAudioSlot(...)` | Updates narration audio for a lesson slot |
| `searchLessons(query, limit)` | Full-text lesson search |
| `getCoursesByPillar(pillar)` | Catalog filtered by pillar |
| `getCoursesByChapter()` | Courses grouped by book chapter |
| `seedCourseFromJson(courseData)` | Programmatic course seeding |

The rendering of a lesson body is done by **`frontend/components/AcademyContent.tsx`** — the *gold-standard renderer*. Any programmatic content you create must produce blocks this component understands.

## 4. Authoring a lesson — the canonical workflow

This is the proven, repeatable process. **Do one lesson fully, end-to-end, before starting the next** — never batch.

1. **Write the lesson body** as a Python script that imports the block helpers:
   ```python
   exec(open('CONTENT_TEMPLATE.py').read())   # ALWAYS start with this line
   # ...build blocks with blk(), h2(), callout(), stat_grid(), etc...
   ```
   Never reimplement block helpers inline — always `exec` the template.
2. **Web-verify every claim** in the lesson. Cite sources. No fabricated statistics.
3. **POST the body to Sanity** (the script pushes a document with a stable slug).
4. **Set the Supabase link:** update the lesson row's `sanity_slug` = the Sanity slug via `frontend/scripts/link-sanity-slugs.mjs`. Without this, the app shows thin legacy content.
5. **Verify in the app:** open the course player, confirm the rich body renders via `AcademyContent.tsx`.
6. Repeat for the next lesson.

> **Why one-at-a-time:** batching wastes credits reconstructing state after session limits, and makes it hard to verify each lesson. This is a hard project rule.

## 5. The CONTENT_TEMPLATE block system

`CONTENT_TEMPLATE.py` defines the **only** block types the renderer supports. Inventing new block shapes breaks rendering. The vocabulary:

**Text & structure**
- `blk()` — paragraph.
- `h2()` — section header (auto-numbered "SECTION #1…", indigo separator).
- `h3()` — sub-section header (small caps, indigo bullet).
- `callout()` — 💡 KEY CONCEPT card.
- `highlight()` — 📌 REMEMBER THIS (amber).
- `quote()` — pullquote (dark slate card).

**Visual learning**
- `analogy()` — 🔗 ANALOGY (violet). **Max once per lesson.**
- `stat_grid()` — 📊 2–4 stat cards (big number + label + context). **Max 4.**
- `example()` — 🌍 REAL-WORLD EXAMPLE (teal). **Named real orgs/cases only.**
- `steps()` — 📋 numbered process steps.
- `compare()` — ⚖️ two-column comparison (rose vs emerald).
- `warning()` — ⚠️ caveats / common mistakes.

**Media** — image/audio/video blocks (see the rest of `CONTENT_TEMPLATE.py`).

There is also an **editorial** variant `CONTENT_TEMPLATE_EDITORIAL.py` + `CONTENT_PROMPT_EDITORIAL.md` for editorial (non-lesson) pieces.

## 6. Quizzes

Schema (mig. 028): `quizzes` → `quiz_questions` → `quiz_options`. A quiz attaches to a course/lesson; questions have ordered options with a correct flag. Learner attempts land in `course_quiz_attempts` (score, timestamp). The quiz format is fixed — match existing seeded quizzes when adding new ones.

## 7. Progress, enrollment & certificates

- **Enroll:** `enrollUser` → `course_player_enrollments`.
- **Progress:** `updateLessonProgress` → `course_lesson_progress`; course completion % rolls up.
- **Certificate:** `POST /api/academy/certificates` issues a certificate. It is **idempotent** (returns the existing one if already issued), writes a `certifications` row with a `verification_hash`, stores the PDF URL in `cert_url`, and emails the learner via **Loops** (`sendEvent`). The certificate is publicly verifiable at `/verify/[hash]`.

## 8. Personalized Learning

- Frontend: standalone page `/academy/personalized-learning` (it is a **page, not a tab**).
- API: `/api/personalized-learning` (+ `/audio`) → backend router `backend/routers/personalized_learning.py`.
- Data: `user_learning_paths` (mig. 019). The backend tailors a path from the user's role/interests and can generate narration audio.

## 9. Seeding courses & linking Sanity bodies

| Step | Command (run from `frontend/`) |
|---|---|
| Seed course structure | `node scripts/seed-courses.mjs` (or `npm run seed:courses`) |
| Seed tier-2 / all courses | `node scripts/seed-courses-tier2.mjs`, `node scripts/seed-all-courses.mjs` |
| Link lesson rows → Sanity bodies | `node scripts/link-sanity-slugs.mjs` |
| Audit course integrity | `node scripts/audit-courses.mjs` |
| Remove redundant modules | `node scripts/delete-redundant-academy-modules.mjs` |

> 🔑 These scripts read `SUPABASE_SERVICE_ROLE_KEY` and `SANITY_API_TOKEN` from `frontend/.env.local`, and **must run from inside `frontend/scripts/`** so node resolves `@supabase/supabase-js`.

## 10. Maintenance gotchas (read before touching)

1. **Seed scripts are upsert-only — they never delete.** To remove a lesson from a course, delete the **DB row** directly, then check *all* tracks for duplicates/orphans. Re-seeding will not clean up.
2. **`sanity_slug` must be set** after posting content, or the app renders thin legacy `content_blocks`. Run `link-sanity-slugs.mjs`.
3. The linking `.mjs` **must live in `frontend/scripts/`** (not `/tmp`) or node can't resolve dependencies.
4. **Never batch lesson authoring.** One lesson fully (write → verify → POST → link → confirm) before the next.
5. **Always** start lesson scripts with `exec(open('CONTENT_TEMPLATE.py').read())`. Don't reinvent block helpers.
6. Course membership lives in **Supabase**, not Sanity — deleting a Sanity doc doesn't unenroll anyone or remove the lesson row.

Continue to → [06 — The AI Analyst & RAG Backend](./06-ai-analyst-rag.md)
