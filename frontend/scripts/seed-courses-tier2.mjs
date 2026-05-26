// scripts/seed-courses-tier2.mjs
// Seeds the 4 Tier 2 courses into Supabase.
// Run with: node scripts/seed-courses-tier2.mjs

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

const tier2Path = join(__dir, "../content/courses_tier2.json");
const tier2Courses = JSON.parse(readFileSync(tier2Path, "utf8"));

function check(label, error) {
  if (error) {
    console.error(`✗ ${label}:`, error.message);
    process.exit(1);
  }
}

async function seed(courseData) {
  console.log(`\nSeeding: ${courseData.title} (${courseData.slug})`);

  // 1. Upsert course
  const { data: courseRow, error: courseErr } = await db
    .from("courses")
    .upsert({
      slug:            courseData.slug,
      title:           courseData.title,
      subtitle:        courseData.subtitle ?? null,
      description:     courseData.description ?? null,
      estimated_hours: courseData.estimatedHours ?? null,
      is_published:    true,
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
        course_id:   courseId,
        pillar:      track.pillar,
        order:       track.order,
        slug:        track.slug,
        title:       track.title,
        is_published: true,
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
          summary:            lesson.summary ?? null,
          estimated_minutes:  lesson.estimatedMinutes ?? null,
          objectives:         lesson.objectives ?? [],
          content_blocks:     lesson.contentBlocks ?? [],
          related_lesson_ids: [],
          is_published:       true,
        }, { onConflict: "track_id,slug" })
        .select("id")
        .single();
      check(`upsert lesson ${lesson.slug}`, lessonErr);
      const lessonId = lessonRow.id;

      // 4. Upsert quiz (simplified format: questions[].text, options[].id, correctId)
      if (lesson.quiz) {
        const quiz = lesson.quiz;
        const { data: quizRow, error: quizErr } = await db
          .from("quizzes")
          .upsert({
            lesson_id:       lessonId,
            title:           null,
            passing_score:   null,
            shuffle_options: true,
          }, { onConflict: "lesson_id" })
          .select("id")
          .single();
        check(`upsert quiz for ${lesson.slug}`, quizErr);
        const quizId = quizRow.id;

        for (const [qi, question] of quiz.questions.entries()) {
          // Support both question formats:
          //   Format A (interoperability): { prompt, options[].isCorrect }
          //   Format B (pop health / medicare / bh): { text, correctId, options[].id }
          const questionText = question.text ?? question.prompt;
          const { data: qRow, error: qErr } = await db
            .from("quiz_questions")
            .upsert({
              quiz_id:       quizId,
              order:         qi + 1,
              question_type: "single_choice",
              question:      questionText,
              explanation:   question.explanation ?? null,
              points:        null,
            }, { onConflict: "quiz_id,order" })
            .select("id")
            .single();
          check(`upsert question ${qi + 1}`, qErr);
          const questionId = qRow.id;

          for (const [oi, option] of question.options.entries()) {
            const isCorrect = "isCorrect" in option
              ? option.isCorrect
              : option.id === question.correctId;
            const { error: oErr } = await db
              .from("quiz_options")
              .upsert({
                question_id: questionId,
                order:       oi + 1,
                text:        option.text,
                is_correct:  isCorrect,
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
  console.log(`Seeding ${tier2Courses.length} Tier 2 courses…`);
  for (const course of tier2Courses) {
    await seed(course);
  }
  console.log(`\n🎉 All ${tier2Courses.length} Tier 2 courses seeded.`);
}

main().catch(err => { console.error(err); process.exit(1); });
