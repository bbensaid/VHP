// scripts/seed-all-courses.mjs
// Seeds ALL HTR Academy courses: onboarding + Tier 1 + Tier 2 + Tier 3.
// Run with: node scripts/seed-all-courses.mjs
//
// Idempotent — upserts on conflict, safe to run multiple times.
// Handles both quiz formats:
//   Legacy (Tier-1/seed): question.prompt + option.isCorrect
//   Canonical (Tier-2+):  question.text  + question.correctId

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, "../.env.local");

try {
  const envFile = readFileSync(envPath, "utf8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local missing — rely on environment variables already set
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY);

// ── Load all courses ──────────────────────────────────────────────────────────
const seedCourse  = JSON.parse(readFileSync(join(__dir, "../content/course_seed.json"),  "utf8"));
const tier1       = JSON.parse(readFileSync(join(__dir, "../content/courses_tier1.json"), "utf8"));
const tier2       = JSON.parse(readFileSync(join(__dir, "../content/courses_tier2.json"), "utf8"));
const tier3       = JSON.parse(readFileSync(join(__dir, "../content/courses_tier3.json"), "utf8"));

const ALL_COURSES = [seedCourse, ...tier1, ...tier2, ...tier3];

// ── Helpers ───────────────────────────────────────────────────────────────────
function check(label, error) {
  if (error) {
    console.error(`✗ ${label}:`, error.message);
    process.exit(1);
  }
}

// Normalise a quiz question to a common shape regardless of source format.
// Legacy:    { prompt, type, options[].isCorrect }
// Canonical: { text, correctId, options[] }
function normaliseQuestion(q) {
  const text = q.text ?? q.prompt ?? q.question ?? "";
  const opts  = (q.options ?? []).map((o, idx) => ({
    id:        o.id ?? String.fromCharCode(97 + idx),  // a, b, c, d…
    text:      o.text,
    isCorrect: "isCorrect" in o ? o.isCorrect : (o.id === q.correctId),
    explanation: o.explanation ?? null,
  }));
  return { text, explanation: q.explanation ?? null, options: opts };
}

// ── Probe whether pillar/level columns exist on courses ───────────────────────
let courseHasPillar = null;
let courseHasLevel  = null;

async function probeCourseColumns() {
  if (courseHasPillar !== null) return;
  const { error } = await db.from("courses").select("pillar,level").limit(1);
  if (!error) {
    courseHasPillar = true;
    courseHasLevel  = true;
  } else {
    courseHasPillar = false;
    courseHasLevel  = false;
    console.warn("⚠️  courses.pillar / courses.level columns not found — skipping.");
    console.warn("   Run supabase/migrations/029_course_pillar_level.sql in the Supabase SQL editor.");
  }
}

// ── Seed one course ───────────────────────────────────────────────────────────
async function seed(courseData) {
  console.log(`\nSeeding: ${courseData.title} (${courseData.slug})`);
  await probeCourseColumns();

  // 1. Upsert course — include pillar + level only if columns exist
  const coursePayload = {
    slug:            courseData.slug,
    title:           courseData.title,
    subtitle:        courseData.subtitle        ?? null,
    description:     courseData.description     ?? null,
    target_audience: courseData.targetAudience  ?? [],
    prerequisites:   courseData.prerequisites   ?? [],
    estimated_hours: courseData.estimatedHours  ?? null,
    is_published:    courseData.isPublished      ?? true,
    version:         courseData.version          ?? "1.0.0",
  };
  if (courseData.pillar && courseHasPillar) coursePayload.pillar = courseData.pillar;
  if (courseData.level  && courseHasLevel)  coursePayload.level  = courseData.level;

  const { data: courseRow, error: courseErr } = await db
    .from("courses")
    .upsert(coursePayload, { onConflict: "slug" })
    .select("id")
    .single();
  check("upsert course", courseErr);
  const courseId = courseRow.id;

  for (const track of courseData.tracks) {
    // 2. Upsert track
    const { data: trackRow, error: trackErr } = await db
      .from("tracks")
      .upsert({
        course_id:    courseId,
        pillar:       track.pillar,
        order:        track.order,
        slug:         track.slug,
        title:        track.title,
        description:  track.description  ?? null,
        icon:         track.icon         ?? null,
        target_audience: track.targetAudience ?? [],
        is_published: track.isPublished  ?? true,
      }, { onConflict: "course_id,slug" })
      .select("id")
      .single();
    check(`upsert track ${track.slug}`, trackErr);
    const trackId = trackRow.id;

    for (const lesson of track.lessons) {
      // 3. Upsert lesson
      const { data: lessonRow, error: lessonErr } = await db
        .from("lessons")
        .upsert({
          track_id:           trackId,
          pillar:             lesson.pillar,
          order:              lesson.order,
          slug:               lesson.slug,
          title:              lesson.title,
          summary:            lesson.summary            ?? null,
          estimated_minutes:  lesson.estimatedMinutes   ?? null,
          objectives:         lesson.objectives         ?? [],
          content_blocks:     lesson.sanityBody
                                ? [{ type: "sanity_portable_text", body: lesson.sanityBody }, ...(lesson.contentBlocks ?? [])]
                                : (lesson.contentBlocks ?? []),
          tags:               lesson.tags               ?? [],
          related_lesson_ids: [],
          is_published:       lesson.isPublished        ?? true,
        }, { onConflict: "track_id,slug" })
        .select("id")
        .single();
      check(`upsert lesson ${lesson.slug}`, lessonErr);
      const lessonId = lessonRow.id;

      // 4. Upsert audio_slots
      const audioBlocks = (lesson.contentBlocks ?? []).filter(b => b.type === "audio_slot");
      for (const block of audioBlocks) {
        const slotKey = block.label.toLowerCase().replace(/\s+/g, "_");
        const { error: slotErr } = await db
          .from("audio_slots")
          .upsert({
            lesson_id:      lessonId,
            slot_key:       slotKey,
            label:          block.label,
            hint:           block.hint,
            uploaded_url:   block.uploadedUrl  ?? null,
            transcript_url: block.transcriptUrl ?? null,
          }, { onConflict: "lesson_id,slot_key" });
        check(`upsert audio_slot ${slotKey}`, slotErr);
      }

      // 5. Upsert quiz (handles both legacy and canonical formats)
      if (lesson.quiz) {
        const quiz = lesson.quiz;
        const { data: quizRow, error: quizErr } = await db
          .from("quizzes")
          .upsert({
            lesson_id:       lessonId,
            title:           quiz.title        ?? null,
            passing_score:   quiz.passingScore ?? null,
            shuffle_options: quiz.shuffleOptions ?? true,
          }, { onConflict: "lesson_id" })
          .select("id")
          .single();
        check(`upsert quiz for ${lesson.slug}`, quizErr);
        const quizId = quizRow.id;

        for (const [qi, rawQuestion] of quiz.questions.entries()) {
          const q = normaliseQuestion(rawQuestion);
          const { data: qRow, error: qErr } = await db
            .from("quiz_questions")
            .upsert({
              quiz_id:       quizId,
              order:         qi + 1,
              question_type: "single_choice",
              question:      q.text,
              explanation:   q.explanation,
              points:        rawQuestion.points ?? null,
            }, { onConflict: "quiz_id,order" })
            .select("id")
            .single();
          check(`upsert question ${qi + 1}`, qErr);
          const questionId = qRow.id;

          for (const [oi, option] of q.options.entries()) {
            const { error: oErr } = await db
              .from("quiz_options")
              .upsert({
                question_id: questionId,
                order:       oi + 1,
                text:        option.text,
                is_correct:  option.isCorrect,
                explanation: option.explanation,
              }, { onConflict: "question_id,order" });
            check(`upsert option ${oi + 1}`, oErr);
          }
        }
      }

      console.log(`  ✓ lesson: ${lesson.slug}`);
    }
    console.log(`✓ track: ${track.slug}`);
  }

  console.log(`✅ Seeded "${courseData.title}"`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // Optional: run only specific courses by passing slugs as args
  const filter = process.argv.slice(2);
  const courses = filter.length
    ? ALL_COURSES.filter(c => filter.includes(c.slug))
    : ALL_COURSES;

  console.log(`Seeding ${courses.length} course(s)…`);
  for (const course of courses) {
    await seed(course);
  }
  console.log(`\n🎉 Done — ${courses.length} course(s) seeded.`);
}

main().catch(err => { console.error(err); process.exit(1); });
