// scripts/seed-courses.mjs
// Run with: node scripts/seed-courses.mjs
// Reads .env.local for Supabase credentials, then upserts the full course seed.

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ── Load .env.local manually (no dotenv needed in Node 18+) ──────────────────
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

// ── Load seed data ────────────────────────────────────────────────────────────
// course_seed.json  → single course object (original onboarding course)
// courses_tier1.json → array of 4 Tier 1 courses
const seedPath      = join(__dir, "../content/course_seed.json");
const tier1Path     = join(__dir, "../content/courses_tier1.json");
const courseData    = JSON.parse(readFileSync(seedPath, "utf8"));
const tier1Courses  = JSON.parse(readFileSync(tier1Path, "utf8"));

// All courses to seed: original first, then the 4 tier-1 courses
const allCourses = [courseData, ...tier1Courses];

// ── Helpers ───────────────────────────────────────────────────────────────────
function check(label, error) {
  if (error) {
    console.error(`✗ ${label}:`, error.message);
    process.exit(1);
  }
}

// ── Seed one course ───────────────────────────────────────────────────────────
async function seed(courseData) {
  console.log(`\nSeeding: ${courseData.title} (${courseData.slug})`);

  // 1. Upsert course
  const { data: courseRow, error: courseErr } = await db
    .from("courses")
    .upsert({
      slug:             courseData.slug,
      title:            courseData.title,
      subtitle:         courseData.subtitle,
      description:      courseData.description,
      target_audience:  courseData.targetAudience,
      prerequisites:    courseData.prerequisites,
      estimated_hours:  courseData.estimatedHours,
      is_published:     courseData.isPublished,
      version:          courseData.version,
    }, { onConflict: "slug" })
    .select("id")
    .single();
  check("upsert course", courseErr);
  const courseId = courseRow.id;

  for (const track of courseData.tracks) {
    // 2. Upsert track
    const { data: trackRow, error: trackErr } = await db
      .from("tracks")
      .upsert({
        course_id:       courseId,
        pillar:          track.pillar,
        order:           track.order,
        slug:            track.slug,
        title:           track.title,
        description:     track.description,
        icon:            track.icon,
        target_audience: track.targetAudience,
        is_published:    track.isPublished,
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
          track_id:            trackId,
          pillar:              lesson.pillar,
          order:               lesson.order,
          slug:                lesson.slug,
          title:               lesson.title,
          summary:             lesson.summary,
          estimated_minutes:   lesson.estimatedMinutes,
          objectives:          lesson.objectives,
          content_blocks:      lesson.contentBlocks,
          tags:                lesson.tags,
          related_lesson_ids:  [],
          is_published:        lesson.isPublished,
        }, { onConflict: "track_id,slug" })
        .select("id")
        .single();
      check(`upsert lesson ${lesson.slug}`, lessonErr);
      const lessonId = lessonRow.id;

      // 4. Upsert audio_slots from content blocks
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
            uploaded_url:   block.uploadedUrl ?? null,
            transcript_url: block.transcriptUrl ?? null,
          }, { onConflict: "lesson_id,slot_key" });
        check(`upsert audio_slot ${slotKey}`, slotErr);
      }

      // 5. Upsert quiz
      if (lesson.quiz) {
        const quiz = lesson.quiz;
        const { data: quizRow, error: quizErr } = await db
          .from("quizzes")
          .upsert({
            lesson_id:       lessonId,
            title:           quiz.title ?? null,
            passing_score:   quiz.passingScore,
            shuffle_options: quiz.shuffleOptions ?? true,
          }, { onConflict: "lesson_id" })
          .select("id")
          .single();
        check(`upsert quiz for ${lesson.slug}`, quizErr);
        const quizId = quizRow.id;

        for (const [qi, question] of quiz.questions.entries()) {
          const { data: qRow, error: qErr } = await db
            .from("quiz_questions")
            .upsert({
              quiz_id:       quizId,
              order:         qi + 1,
              question_type: question.type,
              question:      question.question,
              explanation:   question.explanation ?? null,
              points:        question.points,
            }, { onConflict: "quiz_id,order" })
            .select("id")
            .single();
          check(`upsert question ${qi + 1}`, qErr);
          const questionId = qRow.id;

          for (const [oi, option] of question.options.entries()) {
            const { error: oErr } = await db
              .from("quiz_options")
              .upsert({
                question_id: questionId,
                order:       oi + 1,
                text:        option.text,
                is_correct:  option.isCorrect,
                explanation: option.explanation ?? null,
              }, { onConflict: "question_id,order" });
            check(`upsert option ${oi + 1}`, oErr);
          }
        }
      }

      console.log(`  ✓ lesson: ${lesson.slug}`);
    }
    console.log(`✓ track: ${track.slug}`);
  }

  console.log(`✅ Seeded "${courseData.title}" successfully.`);
}

async function main() {
  console.log(`Seeding ${allCourses.length} courses…`);
  for (const course of allCourses) {
    await seed(course);
  }
  console.log(`\n🎉 All ${allCourses.length} courses seeded.`);
}

main().catch(err => { console.error(err); process.exit(1); });
