// Read-only alignment audit helper: Policy pillar.
// Dumps course metadata (pillar, chapter ref) and lesson titles for policy courses.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim();

const db = createClient(
  get("NEXT_PUBLIC_SUPABASE_URL"),
  get("SUPABASE_SERVICE_ROLE_KEY")
);

const { data: courses, error } = await db.from("courses").select("*");
if (error) throw error;

console.log("=== ALL COURSES: pillar / chapter ref ===");
for (const c of courses.sort((a, b) => (a.slug > b.slug ? 1 : -1))) {
  const keys = Object.keys(c);
  const pillar = c.pillar ?? c.pillar_id ?? "(none)";
  const chap = c.chapter_ref ?? c.course_chapter_ref ?? c.chapter ?? "(none)";
  console.log(
    `${c.slug.padEnd(36)} pillar=${String(pillar).padEnd(12)} chapters=${JSON.stringify(chap)} level=${c.level ?? "-"}`
  );
}
console.log("\ncourse columns:", Object.keys(courses[0]).join(", "));

// Lessons for policy-relevant courses
const policySlugs = courses
  .filter((c) => String(c.pillar ?? c.pillar_id ?? "").includes("policy"))
  .map((c) => c.slug);
console.log("\n=== POLICY-PILLAR COURSES ===", policySlugs);

for (const slug of policySlugs) {
  const c = courses.find((x) => x.slug === slug);
  const { data: tracks } = await db.from("tracks").select("*").eq("course_id", c.id);
  console.log(`\n--- ${slug} (${tracks?.length ?? 0} tracks) ---`);
  for (const t of tracks ?? []) {
    const { data: lessons } = await db
      .from("lessons")
      .select('title, slug, sanity_slug, "order"')
      .eq("track_id", t.id)
      .order("order");
    console.log(`  TRACK: ${t.title}`);
    for (const l of lessons ?? []) {
      console.log(`    ${String(l.order).padStart(3)}. ${l.title}  [sanity_slug=${l.sanity_slug ?? "NULL"}]`);
    }
  }
}
