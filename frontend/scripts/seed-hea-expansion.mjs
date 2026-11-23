// Adds tracks 2-5 (lessons 7-18) to the EXISTING course health-equity-analytics (roadmap 2.1 #8).
// Lesson bodies are in Sanity (frontend/content/_course_hea_t*.py); sanity_slug = slug. Upsert-only; never touches the course row or track 1.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-hea-expansion.mjs --commit
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
try {
  for (const line of readFileSync(join(__dir, "../.env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch { /* rely on exported env */ }
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const COMMIT = process.argv.includes("--commit");
const die = (label, err) => { if (err) { console.error("ERR", label, err.message); process.exit(1); } };
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });
const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });

const TRACKS = [
  T(2, "vermonts-equity-landscape", "Vermont's Equity Landscape", "Reading Vermont's equity data, the five-category root cause taxonomy and the Northeast Kingdom test for rural equity.", [
    L(7, "hea-vermont-equity-landscape", "Reading Vermont's Equity Data: Geography First, Then Race and Income", 25,
      "Why averages mislead, the geographic picture, small-sample race and ethnicity estimates, social conditions and a five-step landscape method.",
      ["Explain why averages hide gaps", "Read a survey-based equity figure critically", "Build a stratified equity landscape"], ["equity", "vermont", "data"]),
    L(8, "hea-root-cause-taxonomy", "From Gap to Cause: The Five-Category Root Cause Taxonomy", 25,
      "Geographic, social needs, clinical practice, coverage and trust causes, compound causes, assigning causes with evidence and matching investment.",
      ["Name the five root cause categories", "Assign probable causes with evidence", "Match intervention size to cause"], ["root-cause", "taxonomy", "interventions"]),
    L(9, "hea-rural-equity-northeast-kingdom", "Rural Equity and the Northeast Kingdom Test", 25,
      "What is distinct about rural equity, the Northeast Kingdom constraint, the three-question test and the Rural Emergency Hospital option.",
      ["Apply the three-question test", "Describe the Rural Emergency Hospital designation", "Turn named scenarios into measurable standards"], ["rural", "northeast-kingdom", "access"]),
  ]),
  T(3, "data-and-access", "Data and Access", "Race and ethnicity data quality, reporting equity for small groups and the GLP-1 access gap.", [
    L(10, "hea-race-ethnicity-data", "Seeing Who Is Missing: Race and Ethnicity Data Quality", 25,
      "Why missing demographics distort gaps, three ways to fill them, what indirect estimation can and cannot do and a completeness audit.",
      ["Explain how missing data biases gaps", "Compare collection, linkage and estimation", "Run a demographic data completeness audit"], ["data-quality", "race-ethnicity", "bisg"]),
    L(11, "hea-small-numbers", "Small Numbers, Big Stakes: Reporting Equity for Small Groups", 25,
      "Sample size and uncertainty with worked arithmetic, suppression rules, pooling and smoothing, ethics and writing about small numbers.",
      ["Compute an interval for a small-group estimate", "Apply suppression and reliability rules", "Write about small numbers honestly"], ["small-numbers", "suppression", "uncertainty"]),
    L(12, "hea-glp1-access-equity", "The GLP-1 Access Gap: Who Gets the New Obesity Drugs", 25,
      "Coverage mechanics, the BALANCE model as verified, framing the equity analysis and monitoring after a coverage decision.",
      ["Explain how GLP-1 coverage depends on diagnosis", "Frame an equity analysis of a coverage decision", "Build a monitoring plan"], ["glp-1", "coverage", "balance-model"]),
  ]),
];

const SLUG = "health-equity-analytics";
console.log(`${SLUG} expansion: ${TRACKS.length} tracks, ${TRACKS.reduce((n, t) => n + t.lessons.length, 0)} lessons`);
if (!COMMIT) { for (const t of TRACKS) console.log(` T${t.order} ${t.title}: ${t.lessons.map((l) => l.slug).join(", ")}`); console.log("DRY RUN — pass --commit"); process.exit(0); }

const { data: c, error: ce } = await db.from("courses").select("id,pillar,target_audience").eq("slug", SLUG).single();
die("course", ce);
for (const t of TRACKS) {
  const { data: tr, error: te } = await db.from("tracks").upsert({
    course_id: c.id, pillar: "equity", order: t.order, slug: t.slug, title: t.title,
    description: t.description, icon: null, target_audience: c.target_audience, is_published: true,
  }, { onConflict: "course_id,slug" }).select("id").single();
  die(`track ${t.slug}`, te);
  for (const l of t.lessons) {
    die(`lesson ${l.slug}`, (await db.from("lessons").upsert({
      track_id: tr.id, pillar: "equity", order: l.order, slug: l.slug, title: l.title, summary: l.summary,
      estimated_minutes: l.minutes, objectives: l.objectives.map((text, i) => ({ id: `obj_${l.order}_${i + 1}`, text })),
      content_blocks: [], tags: l.tags, related_lesson_ids: [], is_published: true, sanity_slug: l.slug,
    }, { onConflict: "track_id,slug" })).error);
  }
  console.log(`  ✓ track ${t.order} ${t.slug} (${t.lessons.length} lessons)`);
}
console.log("Done.");
