// Read-only: what the Preface / Introduction / Chapter 1 say about the Academy vs what the database holds.
// Run from frontend/:  node scripts/audit-book-academy-refs.mjs
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

const { data: courses, error } = await db.from("courses").select("id,slug,title,is_published").order("slug");
if (error) throw error;
console.log(`COURSES (${courses.length}):`);
for (const c of courses) console.log(`  ${c.is_published ? "PUB " : "DRAFT"} ${c.slug}  —  ${c.title}`);

const fp = courses.find((c) => c.slug === "five-pillars-one-imperative");
const { data: tracks } = await db.from("tracks").select("id,title,order,is_published").eq("course_id", fp.id).order("order");
console.log(`\nTRACKS in five-pillars-one-imperative (${tracks.length}):`);
for (const t of tracks) console.log(`  ${t.order}. [${t.is_published ? "pub" : "DRAFT"}] ${t.title}`);

const t1 = tracks.find((t) => t.order === 1);
const { data: lessons } = await db.from("lessons").select("title,order,sanity_slug").eq("track_id", t1.id).order("order");
console.log(`\nTRACK 1 LESSONS (${lessons.length}):`);
for (const l of lessons) console.log(`  ${l.order}. ${l.title}   [sanity_slug: ${l.sanity_slug ?? "NONE"}]`);
