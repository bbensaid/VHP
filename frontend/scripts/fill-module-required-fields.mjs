// Fill the Sanity academyModule fields the Studio marks required but that
// script-posted lessons never set: summary, courseTitle, moduleNumber (and
// totalModules, optional, for "Module X of Y"). Author-approved 2026-11-15.
//
// Values come from the Academy structure in Supabase, which the site already
// shows: the lesson row whose sanity_slug = the module's slug gives the course
// title, the lesson summary, and the position (course-wide: tracks by order,
// then lessons by order). Only EMPTY fields are filled (setIfMissing); nothing
// already set is changed. Every document is backed up to sanity-backups/ first.
//
//   node scripts/fill-module-required-fields.mjs            # dry run
//   node scripts/fill-module-required-fields.mjs --commit
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(join(__dir, "../.env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const COMMIT = process.argv.includes("--commit");
const TOKEN = process.env.SANITY_API_TOKEN;
const API = "https://fxz10xl7.api.sanity.io/v2023-10-01/data";
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function groq(query) {
  const r = await fetch(`${API}/query/production?query=${encodeURIComponent(query)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!r.ok) throw new Error(`query ${r.status}`);
  return (await r.json()).result;
}

// ── Academy structure from Supabase ────────────────────────────────────────
const { data: courses } = await db.from("courses").select("id,title");
const { data: tracks } = await db.from("tracks").select("id,course_id,order");
const { data: lessons } = await db.from("lessons").select("id,track_id,order,slug,sanity_slug,summary,title");
const courseById = Object.fromEntries(courses.map((c) => [c.id, c]));
const trackById = Object.fromEntries(tracks.map((t) => [t.id, t]));

const byCourse = {};
for (const l of lessons) {
  const t = trackById[l.track_id];
  if (!t) continue;
  (byCourse[t.course_id] ??= []).push({ ...l, trackOrder: t.order });
}
const bySanitySlug = {};
for (const [courseId, list] of Object.entries(byCourse)) {
  list.sort((a, b) => a.trackOrder - b.trackOrder || a.order - b.order);
  list.forEach((l, i) => {
    if (!l.sanity_slug) return;
    (bySanitySlug[l.sanity_slug] ??= []).push({
      courseTitle: courseById[courseId]?.title,
      moduleNumber: i + 1,
      totalModules: list.length,
      summary: (l.summary ?? "").trim(),
    });
  });
}

// --check: confirm this numbering matches the modules that are already complete
if (process.argv.includes("--check")) {
  const done = await groq(`*[_type=="academyModule" && defined(moduleNumber) && defined(courseTitle)]{"slug": slug.current, courseTitle, moduleNumber, totalModules}`);
  let same = 0;
  for (const m of done) {
    const h = (bySanitySlug[m.slug] ?? [])[0];
    const ok = h && h.moduleNumber === m.moduleNumber && h.courseTitle === m.courseTitle && h.totalModules === m.totalModules;
    if (ok) same++;
    else console.log(" differs:", m.slug, `| Sanity: ${m.courseTitle} ${m.moduleNumber}/${m.totalModules}`, h ? `| Supabase: ${h.courseTitle} ${h.moduleNumber}/${h.totalModules}` : "| not linked");
  }
  console.log(`already-complete modules: ${done.length}, same numbering: ${same}`);
  process.exit(0);
}

// ── Sanity modules missing a required field ────────────────────────────────
const mods = await groq(`*[_type=="academyModule" && (!defined(summary) || !defined(courseTitle) || !defined(moduleNumber))]{
  _id, title, "slug": slug.current, summary, courseTitle, moduleNumber, totalModules }`);
console.log(`modules missing a required field: ${mods.length}`);

const plan = [], problems = [];
for (const m of mods) {
  const hits = bySanitySlug[m.slug] ?? [];
  if (hits.length !== 1) {
    problems.push({ id: m._id, slug: m.slug, reason: hits.length ? `linked from ${hits.length} lessons` : "no Supabase lesson links to it" });
    continue;
  }
  const h = hits[0];
  const set = {};
  if (!m.courseTitle && h.courseTitle) set.courseTitle = h.courseTitle;
  if (m.moduleNumber == null) set.moduleNumber = h.moduleNumber;
  if (m.totalModules == null) set.totalModules = h.totalModules;
  if (!m.summary && h.summary) set.summary = h.summary;
  const stillMissing = ["summary", "courseTitle", "moduleNumber"].filter((k) => m[k] == null && set[k] == null);
  if (stillMissing.length) problems.push({ id: m._id, slug: m.slug, reason: `no source value for ${stillMissing.join(", ")}` });
  if (Object.keys(set).length) plan.push({ id: m._id, set });
}

console.log(`will patch: ${plan.length}   cannot fill fully: ${problems.length}`);
for (const p of plan.slice(0, 4)) console.log(" e.g.", p.id, JSON.stringify(p.set).slice(0, 220));
for (const p of problems) console.log(" PROBLEM", p.id, p.slug, "-", p.reason);
const count = (k) => plan.filter((p) => k in p.set).length;
console.log(`fields: summary ${count("summary")}, courseTitle ${count("courseTitle")}, moduleNumber ${count("moduleNumber")}, totalModules ${count("totalModules")}`);
if (!COMMIT) process.exit(0);

// ── Back up, then patch in batches ─────────────────────────────────────────
const backupDir = join(__dir, "../../sanity-backups");
mkdirSync(backupDir, { recursive: true });
const ids = plan.map((p) => p.id);
const full = await groq(`*[_id in ${JSON.stringify(ids)}]`);
const stamp = Date.now();
writeFileSync(join(backupDir, `fill-module-required-fields-${stamp}.json`), JSON.stringify(full, null, 1));
console.log(`backed up ${full.length} documents to sanity-backups/fill-module-required-fields-${stamp}.json`);

for (let i = 0; i < plan.length; i += 50) {
  const mutations = plan.slice(i, i + 50).map((p) => ({ patch: { id: p.id, setIfMissing: p.set } }));
  const r = await fetch(`${API}/mutate/production`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  });
  if (!r.ok) throw new Error(`mutate ${r.status}: ${await r.text()}`);
  console.log(`patched ${Math.min(i + 50, plan.length)}/${plan.length}`);
}
const left = await groq(`count(*[_type=="academyModule" && (!defined(summary) || !defined(courseTitle) || !defined(moduleNumber))])`);
console.log(`modules still missing a required field: ${left}`);
