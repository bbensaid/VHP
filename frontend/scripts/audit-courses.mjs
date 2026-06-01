// Audit every Academy course: how many lessons have RICH content actually wired to display.
// "rich" = lesson row has sanity_slug set AND its Sanity academyModule body has >= 20 blocks.
// Reads Supabase (courses/tracks/lessons) + Sanity (academyModule body counts). Read-only.
// Run from frontend/:  node scripts/audit-courses.mjs
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
const RICH_MIN = 20;

// Sanity: slug -> body block count
const groq = '*[_type=="academyModule" && defined(body)]{"s":slug.current,"n":count(body)}';
const url = "https://fxz10xl7.api.sanity.io/v2021-06-07/data/query/production?query=" + encodeURIComponent(groq);
const sanity = {};
for (const x of (await (await fetch(url)).json()).result) sanity[x.s] = x.n;

const { data: courses } = await db.from("courses").select("id,slug,is_published").order("slug");
let totalRich = 0, totalLessons = 0;
console.log("\nCOURSE".padEnd(40) + "RICH/TOTAL   STATUS");
console.log("-".repeat(70));
for (const c of courses) {
  const { data: tr } = await db.from("tracks").select("id").eq("course_id", c.id);
  if (!tr.length) { console.log(c.slug.padEnd(40) + "  0/0       (no tracks)"); continue; }
  const { data: ls } = await db.from("lessons").select("slug,sanity_slug").in("track_id", tr.map(t => t.id));
  const rich = ls.filter(l => l.sanity_slug && (sanity[l.sanity_slug] || 0) >= RICH_MIN).length;
  totalRich += rich; totalLessons += ls.length;
  const status = rich === ls.length ? "✅ DONE" : rich === 0 ? "❌ EMPTY" : "⚠️  PARTIAL";
  const pub = c.is_published ? "" : " [DRAFT]";
  console.log(c.slug.padEnd(40) + `${String(rich).padStart(3)}/${String(ls.length).padEnd(3)}    ${status}${pub}`);
}
console.log("-".repeat(70));
console.log(`TOTAL: ${totalRich}/${totalLessons} lessons have rich content wired to display (rich = sanity_slug set + >=${RICH_MIN} Sanity blocks).`);
