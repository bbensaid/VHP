// Retire the leftovers of the old Academy courses (author's instruction,
// 2026-11-15: "correct them AND anything else that uses any OLD stuff; you can
// delete if you need to").
//
// Supabase (the Academy structure, source of truth):
//   - drop the "Value-Based Care Fundamentals — Module N: " prefix from lesson titles
//   - lessons parked at order 99 move to the end of their track
// Sanity:
//   - delete the 8 orphan academyModule docs no lesson uses (each duplicates a
//     current lesson of the same title)
//   - delete the 4 policyAnalysis docs that are units of the retired
//     "Value-Based Care Fundamentals" course (their addresses redirect to the
//     matching lessons, see next.config.ts)
//   - every academyModule gets its lesson's current title, summary, course,
//     position (moduleNumber/totalModules) and prev/next lesson
//   - two "next/previous module" sentences that point at the wrong lesson
// Everything touched in Sanity is backed up to sanity-backups/ first.
//
//   node scripts/academy-retire-old-content.mjs           # dry run
//   node scripts/academy-retire-old-content.mjs --commit
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
const groq = async (q) => {
  const r = await fetch(`${API}/query/production?query=${encodeURIComponent(q)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!r.ok) throw new Error(`query ${r.status}`);
  return (await r.json()).result;
};
async function mutate(mutations) {
  for (let i = 0; i < mutations.length; i += 50) {
    const r = await fetch(`${API}/mutate/production`, {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ mutations: mutations.slice(i, i + 50) }),
    });
    if (!r.ok) throw new Error(`mutate ${r.status}: ${await r.text()}`);
  }
}

const OLD_PREFIX = /^Value-Based Care Fundamentals — Module \d+:\s*/;
const ORPHANS = [
  "academyModule-vbc-aco-evidence", "academyModule-vbc-aco-medicaid", "academyModule-vbc-bundled-evidence",
  "academyModule-vbc-bundled-mechanics", "academyModule-vbc-mips", "academyModule-vbc-oncology",
  "academyModule-vbc-rvu", "academyModule-vbc-social-risk",
];
const OLD_BRIEFS = [
  "vbc-fundamentals-module-2-policy-pillar", "vbc-fundamentals-module-3-economics-pillar",
  "vbc-fundamentals-module-4-technology-pillar", "vbc-fundamentals-module-5-clinical-equity-pillars",
];
const SENTENCE_FIXES = [
  ["hedis-medicaid-reporting", "covered in the next module", "covered in a later module"],
  ["population-health-dashboards", "social risk (the previous module)", "social risk (covered earlier in this course)"],
];

// ── 1. Supabase: titles and parked orders ──────────────────────────────────
const { data: lessons0 } = await db.from("lessons").select("id,track_id,order,slug,title,sanity_slug,summary,content_blocks");
const titleFixes = lessons0.filter((l) => OLD_PREFIX.test(l.title)).map((l) => ({ id: l.id, slug: l.slug, from: l.title, to: l.title.replace(OLD_PREFIX, "") }));
const orderFixes = [];
for (const l of lessons0.filter((l) => l.order >= 99)) {
  const peers = lessons0.filter((p) => p.track_id === l.track_id && p.order < 99);
  orderFixes.push({ id: l.id, slug: l.slug, from: l.order, to: Math.max(0, ...peers.map((p) => p.order)) + 1 });
}
// Same sentence fixes in the Supabase fallback text, if present
const fallbackFixes = [];
for (const [sanitySlug, from, to] of SENTENCE_FIXES) {
  const l = lessons0.find((x) => x.sanity_slug === sanitySlug);
  const s = JSON.stringify(l?.content_blocks ?? null);
  if (l && s.includes(from)) fallbackFixes.push({ id: l.id, blocks: JSON.parse(s.split(from).join(to)) });
}
console.log("Supabase title fixes:", titleFixes.map((t) => `${t.slug}: "${t.to}"`));
console.log("Supabase order fixes:", orderFixes.map((o) => `${o.slug}: ${o.from} -> ${o.to}`));
console.log("Supabase fallback-text sentence fixes:", fallbackFixes.length);
if (COMMIT) {
  for (const t of titleFixes) { const { error } = await db.from("lessons").update({ title: t.to }).eq("id", t.id); if (error) throw error; }
  for (const o of orderFixes) { const { error } = await db.from("lessons").update({ order: o.to }).eq("id", o.id); if (error) throw error; }
  for (const f of fallbackFixes) { const { error } = await db.from("lessons").update({ content_blocks: f.blocks }).eq("id", f.id); if (error) throw error; }
}

// ── 2. Course structure after the fixes ─────────────────────────────────────
const lessons = lessons0.map((l) => ({
  ...l,
  title: titleFixes.find((t) => t.id === l.id)?.to ?? l.title,
  order: orderFixes.find((o) => o.id === l.id)?.to ?? l.order,
}));
const { data: courses } = await db.from("courses").select("id,title");
const { data: tracks } = await db.from("tracks").select("id,course_id,order");
const courseById = Object.fromEntries(courses.map((c) => [c.id, c]));
const trackById = Object.fromEntries(tracks.map((t) => [t.id, t]));
const target = {};
const byCourse = {};
for (const l of lessons) { const t = trackById[l.track_id]; if (t) (byCourse[t.course_id] ??= []).push({ ...l, trackOrder: t.order }); }
for (const [cid, list] of Object.entries(byCourse)) {
  list.sort((a, b) => a.trackOrder - b.trackOrder || a.order - b.order);
  list.forEach((l, i) => {
    if (!l.sanity_slug) return;
    target[l.sanity_slug] = {
      title: l.title.trim(),
      summary: (l.summary ?? "").trim(),
      courseTitle: courseById[cid].title,
      moduleNumber: i + 1,
      totalModules: list.length,
      prevModuleSlug: list[i - 1]?.sanity_slug ?? null,
      nextModuleSlug: list[i + 1]?.sanity_slug ?? null,
    };
  });
}

// ── 3. Sanity ───────────────────────────────────────────────────────────────
const mods = await groq(`*[_type=="academyModule"]{_id,"slug":slug.current,title,summary,courseTitle,moduleNumber,totalModules,prevModuleSlug,nextModuleSlug}`);
const toDelete = [...ORPHANS, ...OLD_BRIEFS];
const existingDelete = await groq(`*[_id in ${JSON.stringify(toDelete)}]{_id,_type,title}`);
console.log(`Sanity deletions: ${existingDelete.length}`); existingDelete.forEach((d) => console.log("   delete", d._type, d._id));
const safety = mods.filter((m) => ORPHANS.includes(m._id) && target[m.slug]);
if (safety.length) throw new Error("an orphan is actually linked: " + safety.map((m) => m._id));

const patches = [];
const unlinked = [];
let changedFields = 0;
for (const m of mods.filter((m) => !ORPHANS.includes(m._id))) {
  const t = target[m.slug];
  if (!t) { unlinked.push(m._id); continue; }
  const set = {}, unset = [];
  for (const k of ["title", "summary", "courseTitle", "moduleNumber", "totalModules", "prevModuleSlug", "nextModuleSlug"]) {
    if (k === "summary" && !t.summary) continue;
    if (t[k] === null) { if (m[k] != null) unset.push(k); continue; }
    if (m[k] !== t[k]) set[k] = t[k];
  }
  changedFields += Object.keys(set).length + unset.length;
  if (Object.keys(set).length || unset.length) patches.push({ id: m._id, set, unset });
}
if (unlinked.length) console.log("WARNING modules with no lesson (not changed):", unlinked);
const byField = {};
for (const p of patches) for (const k of [...Object.keys(p.set), ...p.unset]) byField[k] = (byField[k] ?? 0) + 1;
console.log(`module patches: ${patches.length} docs, ${changedFields} field changes`, byField);

// sentence fixes in Sanity bodies
const bodyPatches = [];
for (const [slug, from, to] of SENTENCE_FIXES) {
  const doc = await groq(`*[_type=="academyModule" && slug.current=="${slug}"][0]{_id,body}`);
  let n = 0;
  for (const b of doc?.body ?? []) for (const c of b.children ?? []) {
    if (typeof c.text === "string" && c.text.includes(from)) {
      bodyPatches.push({ id: doc._id, path: `body[_key=="${b._key}"].children[_key=="${c._key}"].text`, value: c.text.split(from).join(to) });
      n++;
    }
  }
  console.log(`sentence fix in ${slug}: ${n} span(s)`);
}
if (!COMMIT) process.exit(0);

// ── backup, then write ──────────────────────────────────────────────────────
const backupDir = join(__dir, "../../sanity-backups");
mkdirSync(backupDir, { recursive: true });
const ids = [...new Set([...toDelete, ...patches.map((p) => p.id), ...bodyPatches.map((p) => p.id)])];
const full = await groq(`*[_id in ${JSON.stringify(ids)}]`);
const stamp = Date.now();
writeFileSync(join(backupDir, `academy-retire-old-content-${stamp}.json`), JSON.stringify(full, null, 1));
console.log(`backed up ${full.length} Sanity documents`);

await mutate(patches.map((p) => ({ patch: { id: p.id, ...(Object.keys(p.set).length ? { set: p.set } : {}), ...(p.unset.length ? { unset: p.unset } : {}) } })));
await mutate(bodyPatches.map((p) => ({ patch: { id: p.id, set: { [p.path]: p.value } } })));
await mutate(existingDelete.map((d) => ({ delete: { id: d._id } })));
console.log("Sanity written");

const left = await groq(`{"stale": count(*[_type=="academyModule" && courseTitle in ["Value-Based Care Fundamentals","Precision Medicine Fundamentals","Welcome & the HTR Framework"]]),
  "deletedStillThere": count(*[_id in ${JSON.stringify(toDelete)}]), "modules": count(*[_type=="academyModule"]), "briefs": count(*[_type=="policyAnalysis"])}`);
console.log("after:", left);
