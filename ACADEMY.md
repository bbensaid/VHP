# HTR Academy — Developer & Content Authoring Guide

This document is the authoritative reference for anyone building, modifying, or extending the HTR Academy course system. It covers the data model, content JSON schema, supported block types, database seeding, and the end-to-end workflow for adding new courses.

_Last verified against code and live Supabase/Sanity: 2026-10-07._

---

## The Rules (read before touching Academy data)

These are the facts that have caused real breakage when forgotten. Each was verified against code on 2026-10-07.

1. **Two stores, two jobs.** Supabase holds *structure and state* (`courses` → `tracks` → `lessons`, quizzes, enrollment, progress). Sanity holds the *rich lesson body* (`academyModule` documents, Portable Text). Neither replaced the other.
2. **`lessons.sanity_slug` is the join.** The lesson page (`app/academy/tracks/[courseSlug]/[lessonSlug]/page.tsx`, `hydrateWithSanityContent`) fetches the Sanity `academyModule` whose `slug.current` equals the lesson's `sanity_slug` and injects it as `sanityBody`. If `sanity_slug` is empty the player falls back to the thin Supabase `content_blocks`. **After posting a lesson to Sanity, set that lesson row's `sanity_slug`** (`frontend/scripts/link-sanity-slugs.mjs`).
3. **`is_published` is filtered at three levels.** `getCourseWithProgress()` in `frontend/lib/course-api.ts` requires `is_published = true` on the course, **and** on each track, **and** on each lesson. A published course whose tracks are unpublished renders empty. Check all three.
4. **The ordering column is `order`** (on `tracks`, `lessons`, `quiz_questions`, `quiz_options`) — not `order_index`. A wrong column name returns `data: null` plus an error; always destructure and print `{ data, error }`.
5. **The real course player is `/academy/tracks/<courseSlug>`** (and `/academy/tracks/<courseSlug>/<lessonSlug>`). `/academy/courses` re-exports the `/academy/tracks` catalogue, and `/academy/courses/<slug>` is a **legacy Sanity** route (`*[_type == "course"]`) — Supabase courses are not there. Never link a Supabase course under `/academy/courses/`.
6. **Seed scripts are upsert-only.** Courses upsert on `slug`, tracks on `course_id,slug`, lessons on `track_id,slug`, quizzes on `lesson_id`, questions on `quiz_id,order`, options on `question_id,order`. They never delete: removing a lesson means deleting the Supabase row directly. Changing a slug creates a duplicate row.
7. **Node scripts that use Supabase must live in `frontend/scripts/`**, or node cannot resolve `@supabase/supabase-js`. Env comes from `frontend/.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SANITY_API_TOKEN`).
8. **Python lesson-writing scripts must start with `exec(open('CONTENT_TEMPLATE.py').read())`** (repo root). The template's helpers (`blk`, `h2`, `h3`, `callout`, `highlight`, `quote`, `analogy`, …) are the only block shapes `components/AcademyContent.tsx` renders. Never hand-roll block JSON.
9. **The "rich" bar is 20 Sanity blocks.** `frontend/scripts/audit-courses.mjs` (`RICH_MIN = 20`) counts a lesson as rich only if `sanity_slug` is set **and** its `academyModule.body` has ≥ 20 blocks. Established courses run ~64–75 blocks per lesson; 20 is the floor, not the target. Run it after every Sanity post — not the poster script's own summary.
10. **Writing Academy/Sanity content needs the owner's sign-off each time.** Thin or missing lessons are often deliberate (unverifiable content was pulled) — do not auto-restore.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Course JSON Schema](#course-json-schema)
4. [Content Block Types](#content-block-types)
5. [Quiz Format](#quiz-format)
6. [Pillar and Level Values](#pillar-and-level-values)
7. [Adding a New Course — End-to-End Workflow](#adding-a-new-course--end-to-end-workflow)
8. [Seed Scripts](#seed-scripts)
9. [Course Catalog (Current)](#course-catalog-current)
10. [Database Schema Summary](#database-schema-summary)
11. [Frontend Route Map](#frontend-route-map)
12. [Known Issues and Decisions](#known-issues-and-decisions)

---

## System Overview

The HTR Academy delivers structured self-paced courses through a **course player** — a full-screen, sidebar-driven learning interface. Courses are organized as (Supabase):

```
Course
  └── Track (a themed module, e.g. "Medicare Advantage")
        └── Lesson (a single learning unit, 15–30 min)
              ├── sanity_slug → Sanity academyModule.body (the rich body, when set)
              ├── Content Blocks (Supabase fallback: text, callouts, timelines, etc.)
              └── Quiz (optional, single-choice questions)
```

Progress is tracked per user in Supabase. Logged-in users are auto-enrolled on first visit to a course or lesson page; anonymous visitors can read published lessons without progress tracking.

---

## Architecture

### Data Flow

```
frontend/content/course_*.json  (+ _build_*.py generators)   ← source for structure + fallback content
       ↓  (seed script, upsert-only)
Supabase (courses, tracks, lessons, quizzes …)
       ↓  (lib/course-api.ts getCourseWithProgress — is_published at all 3 levels)
/academy/tracks/[courseSlug]/[lessonSlug]
       ↓  hydrateWithSanityContent: lessons.sanity_slug → Sanity academyModule.body
       ↓  (CoursePlayer → LessonView: sanityBody › legacy sanity_portable_text block › content_blocks)
User browser

Rich bodies are written to Sanity by Python scripts that exec CONTENT_TEMPLATE.py,
or by node posters such as frontend/scripts/post-five-pillars-to-sanity.mjs
(dry run by default; --commit to write).
```

### Key Files

| File | Purpose |
|------|---------|
| `frontend/content/course_*.json` | Source JSON for each course |
| `frontend/content/courses_tier1.json` | Combined array of 4 Tier-1 courses (rebuilt by merge-expansions.py) |
| `frontend/content/courses_tier2.json` | Combined array of 4 Tier-2 courses (rebuilt manually) |
| `frontend/scripts/seed-courses.mjs` | Seeds original onboarding course + Tier 1 |
| `frontend/scripts/seed-courses-tier2.mjs` | Seeds Tier 2 courses |
| `frontend/scripts/merge-expansions.py` | Merges expand_*.json files into Tier-1 course JSONs |
| `frontend/lib/course-api.ts` | Supabase queries — getCourseWithProgress, enrollUser |
| `frontend/app/actions/course.ts` | Server actions — markLessonProgress, submitQuizAttempt |
| `frontend/types/course.ts` | TypeScript types for the full course data model |
| `frontend/components/course/` | All course UI components |
| `frontend/app/academy/tracks/` | Next.js route pages (the real course player) |
| `CONTENT_TEMPLATE.py` (repo root) | Block helpers + Sanity mutate wiring for lesson-writing scripts |
| `frontend/components/AcademyContent.tsx` | Renders Sanity lesson bodies (the gold-standard renderer) |
| `frontend/sanity/schemaTypes/academyModule.ts`, `blockContent.ts` | Sanity schema for lesson bodies |
| `frontend/scripts/link-sanity-slugs.mjs` | Sets `lessons.sanity_slug` |
| `frontend/scripts/audit-courses.mjs` | Read-only rich/total report per course (the 20-block bar) |
| `frontend/scripts/seed-all-courses.mjs` | Upserts courses/tracks/lessons/quizzes from the content JSON |

---

## Course JSON Schema

Each course lives in its own file: `frontend/content/course_<slug>.json`.

### Top-Level Fields

```json
{
  "id": "course-behavioral-health",          // unique, kebab-case, "course-" prefix
  "slug": "behavioral-health-integration",   // URL slug — used in /academy/tracks/[slug]
  "title": "Behavioral Health Integration",  // display title
  "subtitle": "Mental health, substance use, and integration models",
  "description": "Full paragraph description shown on course overview page.",
  "pillar": "clinical",                      // primary pillar (see Pillar Values)
  "level": "intermediate",                   // "foundational" | "intermediate" | "advanced"
  "estimatedHours": 8,                       // integer
  "thumbnailUrl": null,                      // null until image assets are added
  "tracks": [ ... ]                          // array of Track objects
}
```

### Track Object

```json
{
  "id": "track-bh-landscape",               // unique within course
  "slug": "behavioral-health-landscape",    // URL-safe, unique within course
  "title": "The Behavioral Health Landscape",
  "pillar": "clinical",                     // can differ from course pillar
  "order": 1,                               // integer, 1-indexed
  "lessons": [ ... ]                        // array of Lesson objects
}
```

### Lesson Object

```json
{
  "id": "lesson-bh-001",                    // unique across ALL courses
  "slug": "behavioral-health-burden",       // unique within track
  "title": "The Burden of Behavioral Health Conditions",
  "pillar": "clinical",                     // can differ from track pillar
  "order": 1,                               // integer, 1-indexed within track
  "estimatedMinutes": 20,                   // integer
  "summary": "1-2 sentence description shown in sidebar and course overview.",
  "objectives": [                           // learning objectives
    { "id": "obj-bh-001-1", "text": "Describe the prevalence and economic impact..." },
    { "id": "obj-bh-001-2", "text": "Explain how behavioral health conditions amplify..." }
  ],
  "contentBlocks": [ ... ],                 // array of ContentBlock objects (see below)
  "quiz": { ... }                           // optional Quiz object (see below), or null
}
```

**Required fields:** `id`, `slug`, `title`, `pillar`, `order`, `estimatedMinutes`, `summary`, `objectives`, `contentBlocks`

**Optional:** `quiz` (null = no quiz)

---

## Content Block Types

All blocks have a `"type"` discriminator field. The renderer (`ContentBlockRenderer.tsx`) handles 9 types:

### `text` — Prose content
The most common block. Body supports **markdown** (bold, italic, bullet lists, numbered lists, inline code).

```json
{
  "type": "text",
  "body": "Population health is the study and practice of improving health outcomes for **defined groups**.\n\n- Point one\n- Point two"
}
```

Also accepts an optional `heading` field (rendered as `<h2>`):

```json
{
  "type": "text",
  "heading": "The Triple Aim",
  "body": "..."
}
```

> **Note:** Alternatively, use a dedicated `heading` block (not a registered renderer type — embed headings inside text blocks using the `heading` field, or use markdown `##` syntax in the body).

### `callout` — Highlighted box
Use for important asides, warnings, Vermont-specific context, or caveats.

```json
{
  "type": "callout",
  "variant": "info",           // "info" | "warning" | "success" | "tip"
  "title": "Vermont Context",  // optional
  "body": "Vermont's Blueprint for Health program..."
}
```

Variants render with distinct color schemes: info=blue, warning=amber, success=green, tip=indigo.

### `key_stat` — Statistics callout
For 1–4 headline numbers.

```json
{
  "type": "key_stat",
  "stats": [
    { "value": "67M", "label": "Medicare beneficiaries", "source": "CMS 2024" },
    { "value": "20%", "label": "of national health spending", "source": "CMS 2024" }
  ]
}
```

### `timeline` — Chronological events
```json
{
  "type": "timeline",
  "heading": "The Opioid Epidemic: Three Waves",
  "items": [
    { "year": "1990s–2010", "title": "Wave 1: Prescription Opioids", "body": "OxyContin, hydrocodone...", "pillar": "clinical" },
    { "year": "2010s",      "title": "Wave 2: Heroin Surge",         "body": "As prescription opioids became less accessible...", "pillar": "clinical" }
  ]
}
```

### `concepts_grid` — Icon + title + description cards
```json
{
  "type": "concepts_grid",
  "heading": "Triple Aim Components",
  "items": [
    { "icon": "ti-heart", "title": "Patient Experience", "body": "Quality and satisfaction of care" },
    { "icon": "ti-users", "title": "Population Health",  "body": "Outcomes for defined populations" },
    { "icon": "ti-coin",  "title": "Per-Capita Cost",    "body": "Reducing spending per beneficiary" }
  ]
}
```

Icons are Tabler icon class names (see [tabler-icons.io](https://tabler-icons.io)).

### `comparison_table` — Side-by-side comparison
```json
{
  "type": "comparison_table",
  "heading": "Fee-for-Service vs. Value-Based Care",
  "leftLabel": "Fee-for-Service",
  "rightLabel": "Value-Based Care",
  "rows": [
    { "label": "Payment unit",  "left": "Per service",       "right": "Per outcome/episode" },
    { "label": "Incentive",     "left": "Volume",            "right": "Quality + efficiency" },
    { "label": "Risk bearer",   "left": "Payer",             "right": "Shared or provider" }
  ]
}
```

### `glossary_terms` — Defined terms
```json
{
  "type": "glossary_terms",
  "heading": "Key Terms",
  "terms": [
    { "term": "HCC", "definition": "Hierarchical Condition Category — CMS risk model for Medicare Advantage.", "pillar": "economics" },
    { "term": "PDPM", "definition": "Patient Driven Payment Model — SNF payment system since Oct 2019.", "pillar": "economics" }
  ]
}
```

### `video` — Embedded video
```json
{
  "type": "video",
  "mediaType": "youtube",       // "youtube" | "vimeo" | "upload" | "external"
  "videoId": "dQw4w9WgXcQ",    // YouTube/Vimeo ID
  "caption": "Introduction to Medicare Part A",
  "durationSeconds": 342
}
```

### `audio_slot` — Admin audio upload placeholder
Used in the original onboarding course. Admin uploads audio via the Studio interface.

```json
{
  "type": "audio_slot",
  "label": "Introduction Narration",
  "hint": "2-3 minute welcome message from the instructor",
  "uploadedUrl": null,          // populated after upload
  "transcriptUrl": null
}
```

---

## Quiz Format

Each lesson can have at most one quiz. The **canonical format** (used in all Tier-2 courses and going forward):

```json
"quiz": {
  "id": "quiz-bh-001",
  "questions": [
    {
      "id": "q-bh-001-1",
      "text": "What proportion of U.S. adults experience a mental health condition annually?",
      "options": [
        { "id": "a", "text": "1 in 20" },
        { "id": "b", "text": "1 in 10" },
        { "id": "c", "text": "1 in 5" },
        { "id": "d", "text": "1 in 3" }
      ],
      "correctId": "c",
      "explanation": "Approximately 1 in 5 U.S. adults experience a mental health condition each year."
    }
  ]
}
```

**Rules:**
- 2–4 options per question (typically 4)
- `correctId` must match one option's `id`
- `explanation` is shown to users after they answer
- All questions are single-choice (one correct answer)
- `quiz` can be `null` — not all lessons need a quiz

> **Legacy format note:** The original onboarding course (`course_seed.json`) and the Tier-1 courses use a different format (`prompt` field instead of `text`, `isCorrect: true/false` on each option, no `correctId`). The `seed-courses-tier2.mjs` script handles both. For all new courses, use the canonical format above.

---

## Pillar and Level Values

### Pillars (`pillar` field on course, track, and lesson)

| Value | Color | Meaning |
|-------|-------|---------|
| `"general"` | slate | Cross-cutting, not pillar-specific |
| `"policy"` | blue | Regulation, legislation, government programs |
| `"economics"` | amber | Payment models, finance, cost, reimbursement |
| `"technology"` | emerald | EHR, interoperability, AI, data systems |
| `"clinical"` | pink | Care delivery, chronic disease, patient outcomes |
| `"equity"` | purple | SDOH, disparities, access, health equity |
| `"operations"` | green | Workforce, revenue cycle, care management workflows |

Pillar values cascade — a lesson's pillar can differ from its track's, which can differ from the course's. This enables cross-pillar courses (like Population Health, which spans clinical, technology, and economics).

### Levels (`level` field on course only)

| Value | Meaning |
|-------|---------|
| `"foundational"` | No assumed domain knowledge — good for onboarding |
| `"intermediate"` | Assumes familiarity with basic healthcare concepts |
| `"advanced"` | Assumes professional-level background knowledge |

---

## Adding a New Course — End-to-End Workflow

### Step 1: Create the course JSON file

Create `frontend/content/course_<your-slug>.json` following the schema above.

**Naming conventions:**
- File: `course_<topic>.json` (underscores in filename)
- `"slug"` field: `<topic-kebab-case>` (hyphens in URL slug)
- `"id"` field: `"course-<topic-kebab-case>"`
- Lesson IDs: `"lesson-<abbrev>-<NNN>"` (e.g., `"lesson-rc-001"`)
- Track IDs: `"track-<abbrev>-<topic>"` (e.g., `"track-rc-billing"`)

**ID uniqueness:** Lesson IDs must be globally unique across all courses. Use a consistent prefix tied to the course abbreviation.

### Step 2: Add the course to courses_tier2.json (or a new tier file)

```python
# One-liner to rebuild courses_tier2.json with your new course added:
python3 -c "
import json
files = [
    'content/courses_tier2_existing.json',  # or list individual files
    'content/course_<your-slug>.json',
]
# ... or just edit courses_tier2.json directly by appending the course object
"
```

Or manually append the course object to the `courses_tier2.json` array.

### Step 3: Seed to Supabase

```bash
cd frontend
node scripts/seed-courses-tier2.mjs
```

This script upserts all courses in `courses_tier2.json`. It is **idempotent** — safe to run multiple times. Existing records are updated, not duplicated (based on slug for courses, `course_id+slug` for tracks, `track_id+slug` for lessons).

### Step 4: Verify

Visit `/academy/tracks` — your course should appear in the catalog grid.
Visit `/academy/tracks/<your-slug>` — redirects logged-in users to the first lesson.
Visit `/academy/tracks/<your-slug>/<first-lesson-slug>` — opens the course player.

---

## Seed Scripts

### `seed-courses.mjs`
Seeds the original onboarding course (`course_seed.json`) + all 4 Tier-1 courses from `courses_tier1.json`.

```bash
cd frontend && node scripts/seed-courses.mjs
```

Handles the legacy quiz format (options have `isCorrect: true/false`, questions use `question.question` and `question.type`).

### `seed-courses-tier2.mjs`
Seeds all 4 Tier-2 courses from `courses_tier2.json`.

```bash
cd frontend && node scripts/seed-courses-tier2.mjs
```

Handles the canonical quiz format (`text` + `correctId`). Also handles the legacy format for backward compatibility.

### `merge-expansions.py`
Merges the `expand_*.json` expansion packs into the Tier-1 course JSON files, then rebuilds `courses_tier1.json`.

```bash
cd frontend && python3 scripts/merge-expansions.py
```

Expansion packs add additional lessons to existing tracks without modifying the original file by hand. After merging, re-run `seed-courses.mjs` to push the additions to Supabase.

### `generate_course5.py`
A Python script that generated the AI in Healthcare course JSON. Not intended for repeated use — kept for reference.

---

## Course Catalog (Current)

Live Supabase query, 2026-10-07: **18 courses (all published), 100 tracks (all published), 279 lessons (277 published)**. `audit-courses.mjs` the same day: **265 / 279 lessons rich**. Re-run `node frontend/scripts/audit-courses.mjs` for the current table — do not trust these numbers past their date.

| Slug | Title | Tracks | Lessons | Rich | Pillar | Level | Book ch. |
|------|-------|--------|---------|------|--------|-------|----------|
| `ai-machine-learning-healthcare` | AI & Machine Learning in Healthcare | 7 | 18 | 18 | technology | intermediate | 4 |
| `behavioral-health-integration` | Behavioral Health Integration | 6 | 13 | 13 | clinical | intermediate | 8 |
| `clinical-quality-measurement` | Clinical Quality Measurement | 6 | 18 | 18 | clinical | intermediate | 8 |
| `five-pillars-one-imperative` | Five Pillars, One Imperative | 8 | 24 | 24 | — | — | — |
| `genomics-precision-medicine` | Genomics & Precision Medicine | 7 | 21 | 15 | clinical | intermediate | 8 |
| `health-equity-analytics` | Health Equity Analytics | 1 | 6 | 6 | — | — | — |
| `health-equity-sdoh` | Health Equity & SDOH: From Awareness to Action | 6 | 16 | 16 | equity | foundational | 10 |
| `hie-health-reform-onboarding` | HIE & Health Reform | 6 | 13 | 13 | policy | — | 16 |
| `hospital-finance` | Hospital Finance | 6 | 18 | 18 | economics | intermediate | 6 |
| `interoperability-data-exchange` | Healthcare Interoperability & Data Exchange | 7 | 26 | 25 | technology | intermediate | 4 |
| `medicaid-101` | Medicaid 101: How America's Safety Net Works | 6 | 9 | 9 | policy | foundational | 2 |
| `medicaid-managed-care-operations` | Medicaid Managed Care Operations | 6 | 17 | 17 | policy | intermediate | 2 |
| `medicare-fundamentals` | Medicare Fundamentals | 5 | 12 | 12 | policy | foundational | 2 |
| `population-health-management` | Population Health Management | 7 | 17 | 17 | clinical | intermediate | 8 |
| `revenue-cycle-management` | Revenue Cycle Management | 7 | 21 | 21 | operations | intermediate | 11 |
| `transformation-leadership` | Transformation Leadership | 1 | 6 | 6 | operations | advanced | 12 |
| `value-based-care` | Value-Based Care: From Fee-for-Service to Outcomes | 7 | 23 (21 published) | 17 | economics | intermediate | 6 |
| `welcome-htr-framework` | Welcome & the HTR Framework | 1 | 1 | 0 | technology | — | 1 |

"Book ch." is `courses.chapter_ref` (migration 032). The partial courses (genomics, interoperability, value-based-care) and the empty `welcome-htr-framework` shell are open owner decisions (RELEASE_AUDIT CONTENT-1/2) — thin lessons may be deliberate.

---

## Database Schema Summary

All tables are in the `public` schema in Supabase.

```
courses
  id (uuid PK)
  slug (text, unique)
  title, subtitle, description (text)
  estimated_hours (int)
  pillar (htr_pillar), level (course_level)   -- migration 029
  is_featured (bool)                          -- migration 030
  chapter_ref (text, book chapter)            -- migration 032
  is_published (bool)
  created_at, updated_at

tracks
  id (uuid PK)
  course_id (uuid FK → courses.id)
  slug (text)  UNIQUE: (course_id, slug)
  title, pillar (text)
  order (int)
  is_published (bool)

lessons
  id (uuid PK)
  track_id (uuid FK → tracks.id)
  slug (text)  UNIQUE: (track_id, slug)
  title, summary, pillar (text)
  order, estimated_minutes (int)
  objectives (jsonb)
  content_blocks (jsonb)
  related_lesson_ids (uuid[])
  sanity_slug (text, nullable)   -- migration 031; → Sanity academyModule.slug.current
  is_published (bool)

quizzes
  id (uuid PK)
  lesson_id (uuid FK → lessons.id, unique)
  title (text, nullable)
  passing_score (int, nullable)
  shuffle_options (bool)

quiz_questions
  id (uuid PK)
  quiz_id (uuid FK → quizzes.id)
  order (int)  UNIQUE: (quiz_id, order)
  question_type (enum: single_choice, multi_choice, true_false)
  question (text)
  explanation (text, nullable)
  points (int, nullable)

quiz_options
  id (uuid PK)
  question_id (uuid FK → quiz_questions.id)
  order (int)  UNIQUE: (question_id, order)
  text (text)
  is_correct (bool)
  explanation (text, nullable)

course_player_enrollments
  id (uuid PK)
  user_id (uuid FK → auth.users)
  course_id (uuid FK → courses.id)
  UNIQUE: (user_id, course_id)
  status (enum: not_started, in_progress, completed, paused)
  percent_complete (numeric)
  current_lesson_id (uuid FK → lessons.id, nullable)
  enrolled_at, completed_at (timestamptz)

course_lesson_progress
  id (uuid PK)
  enrollment_id (uuid FK → course_player_enrollments.id)
  lesson_id (uuid FK → lessons.id)
  UNIQUE: (enrollment_id, lesson_id)
  status (enum: not_started, in_progress, completed)
  started_at, completed_at (timestamptz)

course_quiz_attempts
  id (uuid PK)
  enrollment_id (uuid FK → course_player_enrollments.id)
  quiz_id (uuid FK → quizzes.id)
  answers (jsonb)
  score (numeric 0–100)
  passed (bool)
  completed_at (timestamptz)

audio_slots
  id (uuid PK)
  lesson_id (uuid FK → lessons.id)
  slot_key (text)  UNIQUE: (lesson_id, slot_key)
  label, hint (text)
  uploaded_url, transcript_url (text, nullable)

-- also in migration 028: learner_audio_uploads, lesson_bookmarks, lesson_notes
-- (all 13 tables: supabase/migrations/028_course_schema.sql)
```

---

## Frontend Route Map

| Route | File | Description |
|-------|------|-------------|
| `/academy` | `app/academy/page.tsx` | Academy hub — featured courses, quick links |
| `/academy/tracks` | `app/academy/tracks/page.tsx` | Full course catalog grid |
| `/academy/tracks/[courseSlug]` | `app/academy/tracks/[courseSlug]/page.tsx` | Course overview + track listing (auto-enrolls logged-in users; no redirect) |
| `/academy/tracks/[courseSlug]/[lessonSlug]` | `app/academy/tracks/[courseSlug]/[lessonSlug]/page.tsx` | Course player; injects Sanity bodies via `sanity_slug`; auto-enrolls logged-in users |
| `/academy/courses` | `app/academy/courses/page.tsx` | Re-exports the `/academy/tracks` catalogue (duplicate URL) |
| `/academy/courses/[slug]` | `app/academy/courses/[slug]/page.tsx` | **Legacy Sanity** `course` documents — NOT the Supabase courses |
| `/academy/modules/[slug]` | `app/academy/modules/[slug]/page.tsx` | Standalone Sanity `academyModule` view (legacy module engine; the only path that calls `/api/academy/certificates`) |

### AppShell behavior on course pages

Course pages (`/academy/tracks/[courseSlug]/[lessonSlug]`) receive special treatment in `AppShell.tsx`:
- Both sidebars are auto-collapsed on navigation to a course page
- No breadcrumbs, no ticker strip
- The AppShell uses `h-full overflow-hidden` (instead of the standard scrollable layout) so the `CoursePlayer`'s internal lesson scroll area is the only scroll surface
- The floating "Ask AI" button and BottomNav are still rendered but sit above the player

### Key components

| Component | Description |
|-----------|-------------|
| `CoursePlayer` | Top-level player: sidebar + lesson area + prev/next nav |
| `CourseSidebar` | Left panel: collapsible tracks, pillar dots, progress bar |
| `LessonView` | Main content area: header, objectives, content blocks, quiz, mark-complete |
| `ContentBlockRenderer` | Dispatches to individual block renderers by `block.type` |
| `LessonQuiz` | Single-choice quiz with submit/reveal cycle |
| `CourseProgressBar` | Shared progress bar component (used in sidebar and bottom nav) |
| `PillarBadge` | Colored pill badge for pillar identity |

---

## Known Issues and Decisions

### Quiz format inconsistency (historical)
The seed course and Tier-1 courses use a legacy quiz format (`prompt`/`isCorrect` style). Tier-2 and all future courses use the canonical format (`text`/`correctId` style). The `seed-courses-tier2.mjs` script detects and handles both. **For new content, always use the canonical format.**

### Missing top-level `pillar` and `level` on Tier-1 courses
The four Tier-1 course JSON files (`course_medicaid_101.json`, etc.) were generated without `pillar` or `level` top-level fields. These are stored in Supabase but not currently used by any frontend display. When adding or editing these fields, re-run the appropriate seed script.

### Completion flow not yet built
The Supabase course player has no "Course Complete" celebration/certificate UI. When a user marks the last lesson complete, the player stays on that lesson. (`POST /api/academy/certificates` exists, but only the legacy Sanity module engine at `/academy/modules/[slug]` calls it.)

### Mobile sidebar
The mobile course sidebar (hamburger toggle) is wired up but hasn't been tested end-to-end on real devices. The overlay and translate animation should work but layout on small viewports needs verification.

### No full-text search across lessons
Lesson content is stored as JSONB in Supabase. There is no tsvector index or search interface for finding content within courses. A future enhancement could add `pg_search` or a separate search index.

### `heading` block type not implemented
The TypeScript types don't define a `heading` block type. Headings within lessons should be written using the `heading` field on a `text` block, or using `##` markdown syntax in the body field. Do not create a `{ "type": "heading" }` block — it will be silently dropped by the renderer.
