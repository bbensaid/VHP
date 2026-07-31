// One-time corrective pass for ALIGNMENT_AUDIT_FINDINGS.md §3 C-1.
//
// Every chapterRef (Sanity) and chapter_ref (Supabase courses) was set from a
// lead-chapter map that counted Preface + Introduction as chapters 1 and 2,
// putting every pillar 2 chapters too high. This repoints each document at its
// pillar's true lead chapter.
//
// Truth is derived from chapters.ts at runtime — nothing is hardcoded, so this
// stays correct if the book is restructured.
//
// DRY RUN unless --commit is passed.
//
// Deliberately NOT touched (author's decision, 2026-07-31): the two
// cross-cutting courses below, whose refs were likely set by hand rather than
// by the broken backfill.
import { createClient } from "@sanity/client";
import { createClient as sbClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const COMMIT = process.argv.includes("--commit");
const HOLD_OUT_COURSES = new Set(["hie-health-reform-onboarding", "welcome-htr-framework"]);

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) =>
  (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");

// SANITY_API_TOKEN in frontend/.env.local is empty; the write-capable (role:
// editor) token lives in backend/.env. Reads work without either — only the
// mutations below need it.
const backendEnv = readFileSync(new URL("../../backend/.env", import.meta.url), "utf8");
const SANITY_WRITE_TOKEN = (backendEnv.match(/^SANITY_API_TOKEN=(.*)$/m) || [])[1]
  ?.trim()
  .replace(/^["']|["']$/g, "");

// ── Derive the true lead chapter per pillar from chapters.ts ────────────────
const chSrc = readFileSync(new URL("../lib/taxonomy/chapters.ts", import.meta.url), "utf8");
const chRe = /num:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"[\s\S]*?pillar:\s*(?:"([a-z]+)"|null)/g;
const CHAPTERS = [];
let m;
while ((m = chRe.exec(chSrc))) CHAPTERS.push({ num: m[1], title: m[2], pillar: m[3] ?? null });

const LEAD = {}; // lowercase pillar -> first chapter num carrying it
for (const c of CHAPTERS) if (c.pillar && !(c.pillar in LEAD)) LEAD[c.pillar] = c.num;
const CH_PILLAR = Object.fromEntries(CHAPTERS.map((c) => [c.num, c.pillar]));

console.log(`Parsed ${CHAPTERS.length} chapter entries from chapters.ts`);
console.log("True lead chapter per pillar:", LEAD, "\n");
if (Object.keys(LEAD).length !== 6) {
  console.error("Expected 6 pillars from chapters.ts — aborting.");
  process.exit(1);
}

const norm = (p) => String(p ?? "").toLowerCase();
let sanityFixed = 0, sanitySkipped = 0, courseFixed = 0, courseHeld = 0;

// ── 1. Sanity editorial ────────────────────────────────────────────────────
const sanity = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2023-10-01",
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

const docs = await sanity.fetch(
  `*[defined(chapterRef) && !(_id in path("drafts.**"))]{_id, _type, title, pillar, chapterRef}`
);
console.log(`=== SANITY: ${docs.length} docs carry a chapterRef ===`);

const patches = [];
for (const d of docs) {
  const want = LEAD[norm(d.pillar)];
  if (!want) { sanitySkipped++; console.log(`  SKIP (no/unknown pillar) ${d._type} ${d._id}`); continue; }
  if (d.chapterRef === want) { sanitySkipped++; continue; }
  patches.push({ patch: { id: d._id, set: { chapterRef: want } } });
  sanityFixed++;
  if (sanityFixed <= 8) {
    console.log(`  ${String(d.chapterRef).padStart(2)} -> ${want}  [${d.pillar}] ${String(d.title ?? d._id).slice(0, 52)}`);
  }
}
if (sanityFixed > 8) console.log(`  … and ${sanityFixed - 8} more`);
console.log(`  to fix: ${sanityFixed}   unchanged: ${sanitySkipped}\n`);

// ── 2. Supabase courses ────────────────────────────────────────────────────
const db = sbClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));
const { data: courses, error } = await db.from("courses").select("id, slug, pillar, chapter_ref");
if (error) throw error;

console.log(`=== SUPABASE: ${courses.length} courses ===`);
const courseUpdates = [];
for (const c of courses) {
  if (HOLD_OUT_COURSES.has(c.slug)) {
    courseHeld++;
    const lands = CH_PILLAR[c.chapter_ref] ?? "(non-pillar chapter)";
    console.log(`  HELD ${c.slug.padEnd(34)} ref=${c.chapter_ref} (${lands}) — left as-is per author`);
    continue;
  }
  const want = LEAD[norm(c.pillar)];
  if (!want || c.chapter_ref === want) continue;
  courseUpdates.push({ id: c.id, slug: c.slug, from: c.chapter_ref, to: want });
  courseFixed++;
  console.log(`  ${String(c.chapter_ref).padStart(2)} -> ${want}  [${c.pillar}] ${c.slug}`);
}
console.log(`  to fix: ${courseFixed}   held back: ${courseHeld}\n`);

// ── Apply ──────────────────────────────────────────────────────────────────
if (!COMMIT) {
  console.log(`DRY RUN — would patch ${sanityFixed} Sanity docs and ${courseFixed} courses.`);
  console.log("Re-run with --commit to apply.");
  process.exit(0);
}

if (patches.length) {
  const res = await sanity.mutate(patches.map((p) => p.patch ? { patch: p.patch } : p));
  console.log(`✅ Sanity: applied ${patches.length} patches.`);
} else console.log("Sanity: nothing to do.");

for (const u of courseUpdates) {
  const { error: e } = await db.from("courses").update({ chapter_ref: u.to }).eq("id", u.id);
  if (e) { console.error(`❌ ${u.slug}:`, e.message); process.exit(1); }
}
console.log(`✅ Supabase: updated ${courseUpdates.length} courses.`);
