// Regression guard for ALIGNMENT_AUDIT_FINDINGS.md §3 C-1.
//
// Asserts that every chapterRef (Sanity) and chapter_ref (Supabase course)
// resolves to a chapter in chapters.ts whose pillar matches the document's own
// pillar. The original bug — every ref 2 chapters too high, because Preface and
// Introduction were counted as chapters 1 and 2 — was silent: the refs all
// resolved to real chapters, just the wrong ones. Only a pillar cross-check
// catches that.
//
// Exit 0 = clean, 1 = drift found. Safe to run in CI.
//
// Known exceptions: cross-cutting courses deliberately pointed at a non-pillar
// chapter. Add a slug here only with the author's sign-off.
import { createClient } from "@sanity/client";
import { createClient as sbClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const ALLOWED_NON_PILLAR_COURSES = new Set([
  "hie-health-reform-onboarding", // ch 16 — AHS Restructuring, spans all pillars
  "welcome-htr-framework",        // ch 1  — Six-Pillar Framework overview
]);

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) =>
  (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");

const chSrc = readFileSync(new URL("../lib/taxonomy/chapters.ts", import.meta.url), "utf8");
const chRe = /num:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"[\s\S]*?pillar:\s*(?:"([a-z]+)"|null)/g;
const CH_PILLAR = {};
let m;
while ((m = chRe.exec(chSrc))) CH_PILLAR[m[1]] = m[3] ?? null;

const norm = (p) => String(p ?? "").toLowerCase();
const failures = [];

const sanity = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2023-10-01",
  useCdn: false,
});

const docs = await sanity.fetch(
  `*[defined(chapterRef) && !(_id in path("drafts.**"))]{_id, _type, title, pillar, chapterRef}`
);
for (const d of docs) {
  if (!d.pillar) continue; // no pillar to cross-check against
  if (!(d.chapterRef in CH_PILLAR)) {
    failures.push(`SANITY ${d._type} "${String(d.title ?? d._id).slice(0, 44)}" -> ch ${d.chapterRef} does not exist`);
  } else if (CH_PILLAR[d.chapterRef] !== norm(d.pillar)) {
    failures.push(
      `SANITY ${d._type} "${String(d.title ?? d._id).slice(0, 44)}" pillar=${d.pillar} -> ch ${d.chapterRef} (pillar ${CH_PILLAR[d.chapterRef] ?? "none"})`
    );
  }
}

const db = sbClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));
const { data: courses, error } = await db.from("courses").select("slug, pillar, chapter_ref");
if (error) throw error;
for (const c of courses) {
  if (c.chapter_ref == null || ALLOWED_NON_PILLAR_COURSES.has(c.slug)) continue;
  if (CH_PILLAR[c.chapter_ref] !== norm(c.pillar)) {
    failures.push(
      `COURSE ${c.slug} pillar=${c.pillar} -> ch ${c.chapter_ref} (pillar ${CH_PILLAR[c.chapter_ref] ?? "none"})`
    );
  }
}

console.log(`Checked ${docs.length} Sanity docs + ${courses.length} courses against chapters.ts.`);
if (failures.length) {
  console.error(`\n❌ ${failures.length} chapter reference(s) point at the wrong pillar:\n`);
  failures.forEach((f) => console.error("  " + f));
  console.error("\nSee ALIGNMENT_AUDIT_FINDINGS.md §3 C-1. Fix: node scripts/fix-chapterref-offset.mjs");
  process.exit(1);
}
console.log("✅ All chapter references resolve to a chapter of the matching pillar.");
