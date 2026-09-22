// Read-only: check Chapter 12's HTR Academy topic claims against the actual Supabase courses/tracks/lessons.
// Run from frontend/:  node scripts/audit-ch12-academy-claims.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(join(__dir, "../.env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data: courses, error } = await db.from("courses").select("id,slug,title,is_published,description").order("slug");
if (error) throw error;
console.log(`COURSES (${courses.length}):`);
for (const c of courses) console.log(`  ${c.is_published ? "PUB " : "DRAFT"} ${c.slug}  —  ${c.title}`);

const { data: allTracks, error: e2 } = await db.from("tracks").select("id,course_id,title,order,is_published");
if (e2) throw e2;
console.log(`\nALL TRACKS (${allTracks.length}):`);
for (const t of allTracks) {
  const course = courses.find(c => c.id === t.course_id);
  console.log(`  [${t.is_published ? "pub" : "DRAFT"}] (${course?.slug}) ${t.order}. ${t.title}`);
}

const { data: allLessons, error: e3 } = await db.from("lessons").select("id,track_id,title,order");
if (e3) throw e3;
console.log(`\nTOTAL LESSONS: ${allLessons.length}`);

// Keyword search across course titles/descriptions, track titles, lesson titles
const KEYWORDS = [
  "APM mechanic", "APM", "HEDIS", "global budget", "health equity analytic",
  "transformation leadership", "CEU", "continuing education", "quality measurement"
];

function scan(label, rows, fields) {
  console.log(`\n--- Matches in ${label} ---`);
  for (const kw of KEYWORDS) {
    const hits = rows.filter(r => fields.some(f => (r[f] || "").toLowerCase().includes(kw.toLowerCase())));
    if (hits.length) {
      console.log(`  "${kw}": ${hits.length} hit(s)`);
      for (const h of hits.slice(0, 5)) console.log(`      - ${fields.map(f => h[f]).filter(Boolean).join(" | ")}`);
    } else {
      console.log(`  "${kw}": 0 hits`);
    }
  }
}

scan("courses (title+description)", courses, ["title", "description"]);
scan("tracks (title)", allTracks, ["title"]);
scan("lessons (title)", allLessons, ["title"]);

// CEU check: look for a ceu / continuing education flag on courses or a dedicated table
console.log("\n--- CEU column check ---");
console.log("courses columns sample:", Object.keys(courses[0] || {}));
