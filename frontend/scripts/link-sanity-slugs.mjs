// Link Supabase lesson rows to their Sanity content docs by setting sanity_slug = slug,
// for courses whose rich content was posted to Sanity but never linked.
// Only sets sanity_slug when a matching Sanity academyModule doc actually exists.
// DRY RUN unless --commit.
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
// All courses. For each lesson with a null sanity_slug, link it ONLY when a Sanity
// academyModule doc with a non-empty body exists at the same slug. Leaves lessons
// with no Sanity content untouched (they keep their existing content_blocks).
async function allCourseSlugs() {
  const { data } = await db.from("courses").select("slug").order("slug");
  return data.map(c => c.slug);
}
const COURSES = await allCourseSlugs();

// Fetch the set of Sanity academyModule slugs that have a non-empty body.
async function sanitySlugsWithBody() {
  const groq = '*[_type=="academyModule" && defined(body) && count(body) > 0].slug.current';
  const url = "https://fxz10xl7.api.sanity.io/v2021-06-07/data/query/production?query=" + encodeURIComponent(groq);
  const r = await (await fetch(url)).json();
  return new Set(r.result || []);
}

const sanitySet = await sanitySlugsWithBody();
let toUpdate = [], skipped = [];

for (const cslug of COURSES) {
  const { data: course } = await db.from("courses").select("id").eq("slug", cslug).single();
  const { data: tracks } = await db.from("tracks").select("id").eq("course_id", course.id);
  const trackIds = tracks.map(t => t.id);
  const { data: lessons } = await db.from("lessons").select("id,slug,sanity_slug").in("track_id", trackIds);
  for (const lesson of lessons) {
    if (lesson.sanity_slug) continue; // already linked
    if (sanitySet.has(lesson.slug)) toUpdate.push({ course: cslug, ...lesson });
    else skipped.push({ course: cslug, slug: lesson.slug, reason: "no Sanity doc with body" });
  }
}

console.log(`Lessons to link (sanity_slug = slug): ${toUpdate.length}`);
for (const u of toUpdate) console.log(`  ${u.course} | ${u.slug}`);
if (skipped.length) {
  console.log(`\nSkipped (no matching Sanity doc — would NOT get linked): ${skipped.length}`);
  for (const s of skipped) console.log(`  ${s.course} | ${s.slug}`);
}

if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit to set sanity_slug."); process.exit(0); }

let ok = 0, fail = 0;
for (const u of toUpdate) {
  const { error } = await db.from("lessons").update({ sanity_slug: u.slug }).eq("id", u.id);
  if (error) { fail++; console.error("FAIL", u.slug, error.message); } else ok++;
}
console.log(`\n✅ Linked ${ok} lessons${fail ? `, ${fail} failed` : ""}.`);
