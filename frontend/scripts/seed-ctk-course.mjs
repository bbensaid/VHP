// Seeds the Chapter 9 companion course (slug clinical-transformation-toolkit) into Supabase.
// Lesson bodies are already in Sanity (frontend/content/_course_ctk_t*.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug;
// lessons: track_id,slug), safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-ctk-course.mjs --commit
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

const COURSE = {
  slug: "clinical-transformation-toolkit",
  title: "Clinical Transformation Toolkit",
  subtitle: "Medical homes, collaborative care, quality improvement, clinical data and care transitions: how clinical programs are actually implemented",
  description:
    "The companion course to Chapter 9 of Transforming Healthcare. Under value-based payment, clinical improvement asks how to redesign care so an attributed population stays healthier and uses fewer avoidable services. This course teaches the implementation layer that national specifications leave abstract: what patient-centered medical home recognition requires and how Vermont's Blueprint supports practices, how to size and stratify a panel, how to deploy the Collaborative Care Model and certified community behavioral health clinics, how to run a quality improvement method for HEDIS measures and get risk-adjustment documentation right, how to build the clinical data foundation and a care transition protocol, and how to lead the change. It ends with a capstone that builds a practice transformation plan.",
  target_audience: [
    "Primary care practice leaders, medical directors and practice managers",
    "Hospital and health-system clinical, quality and population health leaders",
    "Care managers, community health team and behavioral health program staff",
    "State health agency staff and advisors supporting practice transformation",
  ],
  prerequisites: ["Start Here (recommended)", "Clinical Quality Measurement (recommended)", "Population Health Management (recommended)"],
  estimated_hours: 6.5,
  is_published: false, // flipped to true only when all lessons are written and linked
  version: "1",
  pillar: "clinical",
  level: "intermediate",
  chapter_ref: "9",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "primary-care-transformation", "Primary Care Transformation", "Medical home recognition, the support infrastructure around it, and panel management.", [
    L(1, "ctk-pcmh-recognition", "Patient-Centered Medical Home Recognition: What It Actually Requires", 25,
      "The six concept areas, where small rural practices struggle, the 2026 standards and 2027 proposals, cost and time, and a path to recognition.",
      ["Describe NCQA's six PCMH concept areas operationally", "Explain where small rural practices find recognition hardest", "Plan renewal six to nine months ahead"], ["pcmh", "ncqa", "blueprint"]),
    L(2, "ctk-blueprint-field-staff", "The Blueprint's Support Infrastructure: Field Staff, Community Health Teams and the Mental Health Pilot", 25,
      "What field staff do, the community health team model, the mental health pilot's staffing as reported, protecting support through a payment transition and the evidence gap.",
      ["Describe the Blueprint's field staff and community health team functions", "Read pilot staffing by role and not by headline", "Ask how each support source is funded"], ["blueprint", "field-staff", "chts"]),
    L(3, "ctk-panel-stratification", "The Practice Panel: Right-Sizing, Risk Tiers and Where the Money Is", 25,
      "Panel size from a modeling study, concentrated spending, the four-tier framework, the worked example with its caveats and a first stratification exercise.",
      ["State where the panel-size range comes from and its limits", "Apply a four-tier stratification and match care models", "Check stratification for equity"], ["panel", "risk-stratification", "tiers"]),
  ]),
];

console.log(`${COURSE.title}: ${TRACKS.length} tracks, ${TRACKS.reduce((n, t) => n + t.lessons.length, 0)} lessons`);
if (!COMMIT) { for (const t of TRACKS) console.log(` T${t.order} ${t.title}: ${t.lessons.map((l) => l.slug).join(", ")}`); console.log("DRY RUN — pass --commit"); process.exit(0); }

const { data: c, error: ce } = await db.from("courses").upsert(COURSE, { onConflict: "slug" }).select("id").single();
die("course", ce);
for (const t of TRACKS) {
  const { data: tr, error: te } = await db.from("tracks").upsert({
    course_id: c.id, pillar: "policy", order: t.order, slug: t.slug, title: t.title,
    description: t.description, icon: null, target_audience: COURSE.target_audience, is_published: true,
  }, { onConflict: "course_id,slug" }).select("id").single();
  die(`track ${t.slug}`, te);
  for (const l of t.lessons) {
    die(`lesson ${l.slug}`, (await db.from("lessons").upsert({
      track_id: tr.id, pillar: "policy", order: l.order, slug: l.slug, title: l.title, summary: l.summary,
      estimated_minutes: l.minutes, objectives: l.objectives.map((text, i) => ({ id: `obj_${l.order}_${i + 1}`, text })),
      content_blocks: [], tags: l.tags, related_lesson_ids: [], is_published: true, sanity_slug: l.slug,
    }, { onConflict: "track_id,slug" })).error);
  }
  console.log(`  ✓ track ${t.order} ${t.slug} (${t.lessons.length} lessons)`);
}
console.log("Done.");
