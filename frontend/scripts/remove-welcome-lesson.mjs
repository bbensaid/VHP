// One-off: remove the `welcome-htr-framework` lesson row from the
// `hie-health-reform-onboarding` course (policy-legislation track) in Supabase.
// Upsert seed scripts have no delete logic, so this removes the orphaned membership.
// DRY RUN by default. Pass --commit to actually delete.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
// load .env.local
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) { console.error("Missing Supabase creds"); process.exit(1); }
const db = createClient(SUPABASE_URL, SERVICE_KEY);

const COMMIT = process.argv.includes("--commit");
const COURSE_SLUG = "hie-health-reform-onboarding";
const TRACK_SLUG  = "policy-legislation";
const LESSON_SLUG = "welcome-htr-framework";

const { data: course, error: ce } = await db.from("courses").select("id,slug,title").eq("slug", COURSE_SLUG).single();
if (ce) { console.error("course lookup failed:", ce.message); process.exit(1); }
console.log("Course:", course.title, `(${course.id})`);

const { data: track, error: te } = await db.from("tracks").select("id,slug,title").eq("course_id", course.id).eq("slug", TRACK_SLUG).single();
if (te) { console.error("track lookup failed:", te.message); process.exit(1); }
console.log("Track:", track.title, `(${track.id})`);

const { data: lessons, error: le } = await db.from("lessons").select("id,slug,title,order").eq("track_id", track.id).eq("slug", LESSON_SLUG);
if (le) { console.error("lesson lookup failed:", le.message); process.exit(1); }
console.log(`Matching lessons to remove (${lessons.length}):`, JSON.stringify(lessons, null, 2));

if (lessons.length !== 1) { console.error(`Expected exactly 1 lesson row, found ${lessons.length}. Aborting.`); process.exit(1); }
const lessonId = lessons[0].id;

// dependent quiz rows (quizzes -> quiz_questions -> quiz_options) and audio_slots
const { data: quizzes } = await db.from("quizzes").select("id").eq("lesson_id", lessonId);
const quizIds = (quizzes ?? []).map(q => q.id);
console.log("Dependent quizzes:", quizIds);

if (!COMMIT) {
  console.log("\nDRY RUN — no changes made. Re-run with --commit to delete the lesson row (and its quiz/audio dependents).");
  process.exit(0);
}

// delete dependents first to avoid FK orphans (best-effort; ignore if cascade handles it)
for (const qid of quizIds) {
  const { data: qs } = await db.from("quiz_questions").select("id").eq("quiz_id", qid);
  for (const q of qs ?? []) {
    await db.from("quiz_options").delete().eq("question_id", q.id);
  }
  await db.from("quiz_questions").delete().eq("quiz_id", qid);
}
if (quizIds.length) await db.from("quizzes").delete().eq("lesson_id", lessonId);
await db.from("audio_slots").delete().eq("lesson_id", lessonId);

const { error: de } = await db.from("lessons").delete().eq("id", lessonId);
if (de) { console.error("DELETE failed:", de.message); process.exit(1); }
console.log(`\n✅ Deleted lesson ${LESSON_SLUG} (${lessonId}) from track ${TRACK_SLUG} of course ${COURSE_SLUG}.`);

// verify gone
const { data: after } = await db.from("lessons").select("id").eq("track_id", track.id).eq("slug", LESSON_SLUG);
console.log("Verification — remaining matching rows:", after.length);
