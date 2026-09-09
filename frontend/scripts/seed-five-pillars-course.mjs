// scripts/seed-five-pillars-course.mjs
//
// Seeds ONLY the "Five Pillars, One Imperative" course
// (frontend/content/course_five_pillars.json) into Supabase.
//
// This is the book's companion course — Chapter 1's "GO DEEPER — ACADEMY"
// section cites Track 1's five lessons by name, so those rows must exist in
// Supabase for the citation to resolve for a reader.
//
// Deliberately scoped to this one course: it does NOT touch course_seed.json,
// courses_tier1/2/3.json, or any other course. Upsert-only, no deletes, safe
// to re-run (matches on slug / composite keys).
//
//   cd frontend && node scripts/seed-five-pillars-course.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, read from
// .env.local automatically.

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));

// ── env ─────────────────────────────────────────────────────────────────────
try {
  const envFile = readFileSync(join(__dir, "../.env.local"), "utf8");
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
  // rely on already-exported environment variables
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY);

const course = JSON.parse(
  readFileSync(join(__dir, "../content/course_five_pillars.json"), "utf8"),
);

function check(label, error) {
  if (error) {
    console.error(`✗ ${label}: ${error.message}`);
    process.exit(1);
  }
}

async function seed() {
  const written = (course.tracks ?? []).filter((t) => (t.lessons ?? []).length > 0);
  const empty = (course.tracks ?? []).length - written.length;

  console.log(`\nSeeding: ${course.title} (${course.slug})`);
  console.log(
    `  ${written.length} track(s) with lessons, ${empty} still empty — ` +
      `empty tracks are created as structure and filled by a later run.\n`,
  );

  // ── course ────────────────────────────────────────────────────────────────
  const { data: courseRow, error: courseErr } = await db
    .from("courses")
    .upsert(
      {
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        target_audience: course.targetAudience,
        prerequisites: course.prerequisites,
        estimated_hours: course.estimatedHours,
        is_published: course.isPublished,
        version: course.version,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();
  check("upsert course", courseErr);
  const courseId = courseRow.id;

  let nTracks = 0;
  let nLessons = 0;
  let nQuizzes = 0;

  for (const track of course.tracks ?? []) {
    const { data: trackRow, error: trackErr } = await db
      .from("tracks")
      .upsert(
        {
          course_id: courseId,
          pillar: track.pillar,
          order: track.order,
          slug: track.slug,
          title: track.title,
          description: track.description,
          icon: track.icon,
          target_audience: track.targetAudience,
          is_published: track.isPublished,
        },
        { onConflict: "course_id,slug" },
      )
      .select("id")
      .single();
    check(`upsert track ${track.slug}`, trackErr);
    nTracks++;
    const trackId = trackRow.id;

    for (const lesson of track.lessons ?? []) {
      const { data: lessonRow, error: lessonErr } = await db
        .from("lessons")
        .upsert(
          {
            track_id: trackId,
            pillar: lesson.pillar,
            order: lesson.order,
            slug: lesson.slug,
            title: lesson.title,
            summary: lesson.summary,
            estimated_minutes: lesson.estimatedMinutes,
            objectives: lesson.objectives,
            content_blocks: lesson.contentBlocks,
            tags: lesson.tags,
            related_lesson_ids: [],
            is_published: lesson.isPublished,
          },
          { onConflict: "track_id,slug" },
        )
        .select("id")
        .single();
      check(`upsert lesson ${lesson.slug}`, lessonErr);
      nLessons++;
      const lessonId = lessonRow.id;

      if (lesson.quiz) {
        const quiz = lesson.quiz;
        const { data: quizRow, error: quizErr } = await db
          .from("quizzes")
          .upsert(
            {
              lesson_id: lessonId,
              title: quiz.title ?? null,
              passing_score: quiz.passingScore,
              shuffle_options: quiz.shuffleOptions ?? true,
            },
            { onConflict: "lesson_id" },
          )
          .select("id")
          .single();
        check(`upsert quiz for ${lesson.slug}`, quizErr);
        nQuizzes++;
        const quizId = quizRow.id;

        for (const [qi, question] of (quiz.questions ?? []).entries()) {
          const { data: qRow, error: qErr } = await db
            .from("quiz_questions")
            .upsert(
              {
                quiz_id: quizId,
                order: qi + 1,
                question_type: question.type,
                question: question.question,
                explanation: question.explanation ?? null,
                points: question.points,
              },
              { onConflict: "quiz_id,order" },
            )
            .select("id")
            .single();
          check(`upsert question ${qi + 1} (${lesson.slug})`, qErr);

          for (const [oi, option] of (question.options ?? []).entries()) {
            const { error: oErr } = await db.from("quiz_options").upsert(
              {
                question_id: qRow.id,
                order: oi + 1,
                text: option.text,
                is_correct: option.isCorrect,
                explanation: option.explanation ?? null,
              },
              { onConflict: "question_id,order" },
            );
            check(`upsert option ${oi + 1} (${lesson.slug})`, oErr);
          }
        }
      }

      console.log(`  ✓ lesson ${lesson.order}: ${lesson.title}`);
    }
    if ((track.lessons ?? []).length) console.log(`✓ track: ${track.title}\n`);
  }

  console.log(
    `✅ Done — ${nTracks} tracks, ${nLessons} lessons, ${nQuizzes} quizzes.\n` +
      `   Next: lesson bodies live in Sanity. Link them with:\n` +
      `     node scripts/link-sanity-slugs.mjs --commit\n` +
      `   Then verify:\n` +
      `     node scripts/audit-courses.mjs\n`,
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
