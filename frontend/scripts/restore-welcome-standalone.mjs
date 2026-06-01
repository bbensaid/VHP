// Restore "Welcome & the HTR Framework" as its OWN standalone single-lesson course.
// Reuses the original lesson content from git HEAD (saved to /tmp/welcome_lesson_original.json).
// NOT under hie-health-reform-onboarding. DRY RUN unless --commit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const COMMIT = process.argv.includes("--commit");
const check = (label, err) => { if (err) { console.error("ERR", label, err.message); process.exit(1); } };

const lesson = JSON.parse(readFileSync("/tmp/welcome_lesson_original.json", "utf8"));

// New standalone course definition
const COURSE_SLUG = "welcome-htr-framework";
const course = {
  slug: COURSE_SLUG,
  title: "Welcome & the HTR Framework",
  subtitle: "Your orientation to the six-pillar framework",
  description: "A standalone orientation to the HTR six-pillar framework and your role in the health reform ecosystem. This lesson stands on its own and is not part of any other course.",
  targetAudience: ["Anyone new to HTR"],
  prerequisites: [],
  estimatedHours: 0.25,
  isPublished: true,
  version: 1,
};
const TRACK_SLUG = "welcome";

console.log("Will create standalone course:", course.slug, "|", course.title);
console.log("  track:", TRACK_SLUG);
console.log("  lesson:", lesson.slug, "|", lesson.title, "| blocks:", (lesson.contentBlocks||[]).length, "| quiz qs:", lesson.quiz?.questions?.length||0);

if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit to create it."); process.exit(0); }

// 1. course
const { data: courseRow, error: ce } = await db.from("courses").upsert({
  slug: course.slug, title: course.title, subtitle: course.subtitle, description: course.description,
  target_audience: course.targetAudience, prerequisites: course.prerequisites,
  estimated_hours: course.estimatedHours, is_published: course.isPublished, version: course.version,
}, { onConflict: "slug" }).select("id").single();
check("course", ce);

// 2. track
const { data: trackRow, error: te } = await db.from("tracks").upsert({
  course_id: courseRow.id, pillar: lesson.pillar, order: 1, slug: TRACK_SLUG,
  title: "Welcome", description: "Orientation", icon: null,
  target_audience: course.targetAudience, is_published: true,
}, { onConflict: "course_id,slug" }).select("id").single();
check("track", te);

// 3. lesson (reuse original content verbatim, order 1)
const { data: lessonRow, error: le } = await db.from("lessons").upsert({
  track_id: trackRow.id, pillar: lesson.pillar, order: 1, slug: lesson.slug, title: lesson.title,
  summary: lesson.summary, estimated_minutes: lesson.estimatedMinutes, objectives: lesson.objectives,
  content_blocks: lesson.contentBlocks, tags: lesson.tags, related_lesson_ids: [], is_published: lesson.isPublished,
}, { onConflict: "track_id,slug" }).select("id").single();
check("lesson", le);
const lessonId = lessonRow.id;

// 4. quiz
if (lesson.quiz) {
  const { data: quizRow, error: qe } = await db.from("quizzes").upsert({
    lesson_id: lessonId, title: lesson.quiz.title ?? null,
    passing_score: lesson.quiz.passingScore, shuffle_options: lesson.quiz.shuffleOptions ?? true,
  }, { onConflict: "lesson_id" }).select("id").single();
  check("quiz", qe);
  for (const [qi, question] of lesson.quiz.questions.entries()) {
    const { data: qRow, error: qqe } = await db.from("quiz_questions").upsert({
      quiz_id: quizRow.id, order: qi + 1, question_type: question.type, question: question.question,
      explanation: question.explanation ?? null, points: question.points,
    }, { onConflict: "quiz_id,order" }).select("id").single();
    check("question", qqe);
    for (const [oi, option] of question.options.entries()) {
      const { error: oe } = await db.from("quiz_options").upsert({
        question_id: qRow.id, order: oi + 1, text: option.text,
        is_correct: option.isCorrect, explanation: option.explanation ?? null,
      }, { onConflict: "question_id,order" });
      check("option", oe);
    }
  }
}

console.log(`\n✅ Created standalone course "${course.title}" (${course.slug}) with lesson ${lesson.slug}.`);
// verify
const { data: verify } = await db.from("lessons").select("slug,title").eq("track_id", trackRow.id);
console.log("Lessons in new course track:", JSON.stringify(verify));
