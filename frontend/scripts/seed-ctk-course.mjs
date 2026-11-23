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
  is_published: true,
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
  T(2, "behavioral-health-integration", "Behavioral Health Integration", "Collaborative care readiness and 2026 billing, the consultation model and workforce, and certified community behavioral health clinics.", [
    L(4, "ctk-cocm-readiness", "Deploying the Collaborative Care Model: Readiness and Billing in 2026", 25,
      "The model's roles, the four-dimension readiness assessment, measurement-based care, the 2026 CMS billing codes and what Vermont's source documents do and do not say.",
      ["Describe the roles and registry of collaborative care", "Apply a readiness checklist and set up time tracking", "State the 2026 CoCM and general BHI code thresholds"], ["cocm", "behavioral-health", "billing"]),
    L(5, "ctk-consultation-workforce", "The Psychiatric Consultation Model and the Care Manager Pipeline", 25,
      "Telepsychiatry as a multiplier, a capacity sketch, the care manager pipeline sized from the Blueprint's staffing data, role design and safeguards.",
      ["Sketch consultant capacity for a region", "Read pilot staffing by role to size the care manager pool", "Define protected care manager roles and safety protocols"], ["workforce", "telepsychiatry", "care-manager"]),
    L(6, "ctk-ccbhc", "Certified Community Behavioral Health Clinics: Vermont's Six and What Certification Requires", 25,
      "The six certified clinics as announced in 2026, the federal criteria, the warm handoff with primary care, questions for operators and legislators and the main risks.",
      ["List Vermont's certified clinics and the announced coverage", "Describe what federal certification requires", "Design a warm handoff with primary care and a measure of it"], ["ccbhc", "behavioral-health", "vermont"]),
  ]),
  T(3, "quality-mechanics", "Quality Mechanics", "A five-step HEDIS improvement method, reading Vermont's quality gaps, and risk-adjustment documentation as clinical practice.", [
    L(7, "ctk-hedis-improvement-method", "A Five-Step Method for Improving a HEDIS Measure", 25,
      "Baseline, gap count, root cause, intervention and sustainable workflow, with a worked hypertension example, CY2023 Blueprint measures and a weekly improvement huddle.",
      ["Apply the five-step method to a measure", "Convert a rate into a patient list", "Run a weekly huddle with a run chart"], ["hedis", "quality-improvement", "method"]),
    L(8, "ctk-vermont-hedis-gaps", "Reading Vermont's Quality Gaps: Diabetes, Follow-Up After Emergency Visits and Equity", 25,
      "Diabetes from rate to count, follow-up after emergency visits as a process gap, equity in the numbers, choosing priorities and building a local dashboard.",
      ["Extrapolate a rate to a population count without overclaiming", "Explain why follow-up after emergency visits is a process gap", "Build a stratified local quality dashboard"], ["hedis", "diabetes", "equity"]),
    L(9, "ctk-hcc-documentation", "Risk-Adjustment Documentation as Clinical Practice", 25,
      "Why documentation is clinical, three common opportunities, the 2026 V28 phase-in, the compliance boundary and a documentation program with safeguards.",
      ["Explain how documented conditions shape risk adjustment", "Describe three documentation opportunities and their workflow fixes", "Build a documentation program with compliance safeguards"], ["hcc", "risk-adjustment", "documentation"]),
  ]),
  T(4, "data-and-transitions", "Data and Transitions", "The clinical data foundation, the care transition protocol and the clinical leadership that turns programs into change.", [
    L(10, "ctk-clinical-data-model", "The Clinical Data Foundation: Capture, Aggregate, Manage", 25,
      "Chapter 9's three-step data model, why free text defeats measures, exchange and claims views, a structured-data audit and sequencing the foundation.",
      ["Explain the three-step clinical data model", "Run a structured-data audit", "Sequence data investments and assign ownership"], ["data", "structured-capture", "exchange"]),
    L(11, "ctk-care-transitions", "Closing the Loop: The Care Transition Protocol", 25,
      "The Transitional Care Model, its trial evidence, Medicare TCM codes 99495 and 99496, the community health team protocol and equity checks.",
      ["Describe the Transitional Care Model and its evidence", "Distinguish TCM codes 99495 and 99496", "Run a transition protocol at small-practice scale"], ["transitions", "readmissions", "tcm"]),
    L(12, "ctk-clinical-leadership", "Clinical Leadership: The Under-Resourced Capability", 25,
      "Why administrators cannot implement clinical change alone, structures that give leaders authority, community health workers and a first ninety days.",
      ["Explain Chapter 9's argument for clinical leadership", "Design structures that give leaders time and authority", "Plan a first ninety days on a program"], ["leadership", "chw", "governance"]),
  ]),
  T(5, "commitments-and-capstone", "Commitments, Tools and Capstone", "The five clinical commitments and implementation matrix, the platform quality, value and risk tools, and a one-page practice transformation plan.", [
    L(13, "ctk-implementation-commitments", "Five Commitments and the Implementation Matrix", 25,
      "The five clinical commitments for the Strategic Plan, how to read the implementation matrix, sequencing for early wins and turning ranges into quotes.",
      ["List the five clinical commitments", "Read the implementation matrix critically", "Sequence investments by payment and crossover"], ["implementation", "matrix", "strategic-plan"]),
    L(14, "ctk-platform-tools-lab", "Platform Lab: Quality, Value and Risk Tools", 25,
      "The Clinical Quality Optimizer, High vs. Low Value Care and Risk Stratification Engine: inputs, outputs, limits and a working order.",
      ["Describe what each tool models and its data limits", "Run a tier-by-care-management comparison", "Use the tools in sequence without over-claiming"], ["tools", "risk-stratification", "quality"]),
    L(15, "ctk-capstone-practice-plan", "Capstone: A Practice Transformation Plan", 30,
      "A six-part one-page plan: baseline, priorities, programs, owners, budget and measures, risks and review, with a worked example.",
      ["Write a baseline with unknowns marked", "Choose three priorities with measurable aims", "Set owners, budget, measures and a review date"], ["capstone", "planning", "practice"]),
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
