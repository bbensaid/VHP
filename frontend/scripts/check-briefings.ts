// Guards the homepage hero and /briefings against the defects the old hero had:
// unsourced figures, stale content, and links that promise what isn't there.
//
//   npm run check:briefings
//
// Exits 1 on any failure. Course checks need Supabase env vars (.env.local);
// without them the script says so and fails rather than silently passing.
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { BRIEFINGS, citationOrder } from "../lib/briefings/briefings";
import { SOURCES } from "../lib/briefings/sources";
import { BUILD_ORDER } from "../lib/framework/dependencies";
import { TOOLS } from "../lib/taxonomy/tools";
import { CHAPTERS } from "../lib/taxonomy/chapters";

const MAX_AGE_DAYS = 120;
const problems: string[] = [];
const fail = (m: string) => problems.push(m);

// 1. One briefing per pillar, in the book's execution sequence.
const order = BRIEFINGS.map((b) => b.pillar).join(",");
if (order !== BUILD_ORDER.join(",")) fail(`briefings must follow ${BUILD_ORDER.join(" → ")}; got ${order}`);

for (const b of BRIEFINGS) {
  const tag = `[${b.slug}]`;

  // 2. Every citation resolves; every source cited is listed.
  for (const id of citationOrder(b)) if (!SOURCES[id]) fail(`${tag} cites unknown source {${id}}`);
  for (const f of b.facts) {
    if (!f.cite.length) fail(`${tag} fact "${f.value}" has no source`);
    for (const id of f.cite) if (!SOURCES[id]) fail(`${tag} fact "${f.value}" cites unknown {${id}}`);
  }

  // 3. A paragraph that states a figure must cite something. ("Chapter 1" and
  //    the pillar sequence numbers don't count as figures.)
  const texts = [b.dek, ...b.sections.flatMap((s) => s.paragraphs)];
  for (const t of texts) {
    const figures = t.replace(/\{[a-z0-9-]+\}/g, "").replace(/Chapter \d+/g, "");
    if (/\d/.test(figures) && !/\{[a-z0-9-]+\}/.test(t)) fail(`${tag} uncited figure in: "${t.slice(0, 80)}…"`);
  }

  // 4. Freshness.
  const age = (Date.now() - new Date(`${b.asOf}T00:00:00Z`).getTime()) / 86_400_000;
  if (age > MAX_AGE_DAYS) fail(`${tag} is ${Math.floor(age)} days old (limit ${MAX_AGE_DAYS}); re-verify and update asOf`);

  // 5. Chapters exist; each tool exists and tags a chapter the briefing cites.
  for (const n of b.chapters) if (!CHAPTERS.some((c) => c.num === n)) fail(`${tag} cites missing chapter ${n}`);
  for (const id of b.tools) {
    const t = TOOLS.find((x) => x.id === id);
    if (!t) fail(`${tag} tool "${id}" is not in tools.ts`);
    else if (!t.chapters?.some((c) => b.chapters.includes(c))) fail(`${tag} tool "${id}" tags chapters ${t.chapters?.join(",")} — none of ${b.chapters.join(",")}`);
  }
}

// 6. Courses exist, are published, and carry the title the briefing prints.
async function checkCourses() {
  const envPath = path.resolve(__dirname, "../.env.local");
  const env = fs.existsSync(envPath)
    ? Object.fromEntries(fs.readFileSync(envPath, "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }))
    : process.env;
  const url = env.NEXT_PUBLIC_SUPABASE_URL, key = env.SUPABASE_SERVICE_ROLE_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) { fail("no Supabase credentials — course links not verified"); return; }
  const { data, error } = await createClient(url, key).from("courses").select("slug,title,is_published");
  if (error) { fail(`Supabase: ${error.message}`); return; }
  for (const b of BRIEFINGS) for (const c of b.courses) {
    const row = data!.find((r) => r.slug === c.slug);
    if (!row) fail(`[${b.slug}] course "${c.slug}" does not exist`);
    else if (!row.is_published) fail(`[${b.slug}] course "${c.slug}" is unpublished`);
    else if (row.title !== c.title) fail(`[${b.slug}] course title mismatch: "${c.title}" vs live "${row.title}"`);
  }
}

checkCourses().then(() => {
  if (problems.length) {
    console.error(`\nBRIEFINGS CHECK FAILED (${problems.length}):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(`briefings check: clean (${BRIEFINGS.length} briefings, ${new Set(BRIEFINGS.flatMap(citationOrder)).size} sources)`);
});
