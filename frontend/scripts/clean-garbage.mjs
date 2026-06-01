// Clean confirmed garbage only:
//  (1) 10 stale Medicaid-101 seed-extra lesson rows NOT in the live course JSON (thin
//      content_blocks, sanity_slug=null) — delete the lesson rows + dependent quiz/audio.
//  (2) 2 orphaned Sanity "course"-type docs not used by the live academy catalog.
// Does NOT touch: empty-shell courses, interop rows (real content under different slug),
// genomics/pop-health rows (have content_blocks). DRY RUN unless --commit.
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
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
const COMMIT = process.argv.includes("--commit");

const MEDICAID_GARBAGE = [
  "chip-childrens-health-insurance","dual-eligibles-medicare-medicaid","medicaid-value-based-payment",
  "medicaid-prior-authorization","medicaid-state-budget-pressure","medicaid-behavioral-health-coverage",
  "medicaid-dsh-supplemental-payments","medicaid-network-adequacy-access","medicaid-1915b-managed-care-waivers",
  "medicaid-equity-quality",
];
const ORPHAN_SANITY_COURSE_SLUGS = ["precision-medicine-fundamentals","value-based-care-fundamentals"];

// ── 1. Medicaid-101 garbage lesson rows ───────────────────────────────────────
const { data: c } = await db.from("courses").select("id").eq("slug", "medicaid-101").single();
const { data: tracks } = await db.from("tracks").select("id").eq("course_id", c.id);
const trackIds = tracks.map(t => t.id);
const { data: rows } = await db.from("lessons").select("id,slug").in("track_id", trackIds).in("slug", MEDICAID_GARBAGE);
console.log(`Medicaid-101 garbage lesson rows found: ${rows.length}`);
for (const r of rows) console.log("   - " + r.slug);

// ── 2. Orphan Sanity course docs ──────────────────────────────────────────────
async function sanityQuery(groq) {
  const url = "https://fxz10xl7.api.sanity.io/v2021-06-07/data/query/production?query=" + encodeURIComponent(groq);
  return (await (await fetch(url)).json()).result;
}
const orphanIds = await sanityQuery(`*[_type=="course" && slug.current in ${JSON.stringify(ORPHAN_SANITY_COURSE_SLUGS)}]._id`);
console.log(`\nOrphan Sanity course docs found: ${orphanIds.length}`);
for (const id of orphanIds) console.log("   - " + id);

if (!COMMIT) {
  console.log("\nDRY RUN — re-run with --commit to delete the above (and only the above).");
  process.exit(0);
}

// ── delete Supabase lesson rows + dependents ──────────────────────────────────
let deleted = 0;
for (const r of rows) {
  const { data: quizzes } = await db.from("quizzes").select("id").eq("lesson_id", r.id);
  for (const q of quizzes ?? []) {
    const { data: qs } = await db.from("quiz_questions").select("id").eq("quiz_id", q.id);
    for (const qq of qs ?? []) await db.from("quiz_options").delete().eq("question_id", qq.id);
    await db.from("quiz_questions").delete().eq("quiz_id", q.id);
  }
  if ((quizzes ?? []).length) await db.from("quizzes").delete().eq("lesson_id", r.id);
  await db.from("audio_slots").delete().eq("lesson_id", r.id);
  const { error } = await db.from("lessons").delete().eq("id", r.id);
  if (error) console.error("FAIL lesson " + r.slug, error.message); else deleted++;
}
console.log(`\n✅ Deleted ${deleted} Medicaid-101 garbage lesson rows.`);

// ── delete orphan Sanity course docs ──────────────────────────────────────────
if (orphanIds.length && SANITY_TOKEN) {
  const mutations = orphanIds.map(id => ({ delete: { id } }));
  const res = await fetch("https://fxz10xl7.api.sanity.io/v2021-06-07/data/mutate/production", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SANITY_TOKEN}` },
    body: JSON.stringify({ mutations }),
  });
  console.log(res.ok ? `✅ Deleted ${orphanIds.length} orphan Sanity course docs.` : `Sanity delete failed: ${await res.text()}`);
} else if (orphanIds.length) {
  console.log("⚠️  SANITY_API_TOKEN not found in env — skipped Sanity course-doc deletion.");
}

// ── verify ────────────────────────────────────────────────────────────────────
const { data: after } = await db.from("lessons").select("slug").in("track_id", trackIds);
console.log(`\nMedicaid-101 lessons remaining: ${after.length} (should be 9): ${after.map(l => l.slug).sort().join(", ")}`);
