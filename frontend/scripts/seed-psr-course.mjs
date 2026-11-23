// Seeds the Chapter 14 companion course (slug political-sustainability-of-reform) into Supabase.
// Lesson bodies are already in Sanity (frontend/content/_course_psr_t*.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug;
// lessons: track_id,slug), safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-psr-course.mjs --commit
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
  slug: "political-sustainability-of-reform",
  title: "Political Sustainability of Reform",
  subtitle: "Which parts of a health reform are hard to reverse, how to read early-warning signals, and how to protect investments across election cycles",
  description:
    "The companion course to Chapter 14 of Transforming Healthcare. No state's reform statute is permanent. This course teaches how to separate the durable from the exposed parts of a reform, using Vermont's Acts 167, 51 and 68 and the documented events of 2025 and 2026 as the worked case: the AHEAD withdrawal, the governor's veto of S.190, the Board's budget orders and the November election. It then builds the practitioner's toolkit: early-warning signals, disruption scenarios, investments that hold value under every outcome, data-grounded engagement with regulators, and how to document progress. It closes with how to build sustainability into a reform's design and a capstone political-risk register.",
  target_audience: [
    "Hospital and health-system executives and board members with plans that depend on policy continuity",
    "State agency staff, legislators and advisors designing or defending reform statutes",
    "Advocates, analysts and journalists who follow health policy",
    "Leaders in other states applying the framework to their own reform",
  ],
  prerequisites: ["Start Here (recommended)", "CMMI Models and Waiver Strategy (recommended)"],
  estimated_hours: 6.5,
  is_published: false, // flipped to true only when all lessons are written and linked
  version: "1",
  pillar: "policy",
  level: "intermediate",
  chapter_ref: "14",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "durability-analysis", "The Durability Analysis", "Separating political support from structural durability, and the durable and exposed elements of Vermont's reform.", [
    L(1, "psr-sustainability-as-risk", "Political Sustainability Is a Risk-Management Problem", 25,
      "Support versus durability, why the 2026 events test the framework, and the four-task risk-management sequence.",
      ["Distinguish political support from structural durability", "Describe the 2026 events that tested Vermont's reform", "State the four-task sequence for managing political risk"], ["political-risk", "durability", "act-68"]),
    L(2, "psr-what-is-hard-to-reverse", "What Is Hard to Reverse: Four Sources of Durability", 25,
      "Federal agreements, capital investments, the reform cascade and the financial crisis, tested against 2025-2026 events, with a four-question durability rule.",
      ["Name the four sources of durability and rate each", "Explain why federal agreements proved least durable", "Apply the four-question durability rule to an element of a reform"], ["durability", "ahead", "blueprint"]),
    L(3, "psr-what-is-exposed", "What Is Politically Exposed: Compliance Without Transformation", 25,
      "Where the statute leaves discretion on pricing methodology, budget levels, the Strategic Plan and federal Medicaid funding, and what the S.190 veto and the September budget order show.",
      ["Identify where Act 68 leaves regulatory discretion", "Explain regulatory-capture risk as calibration, not repeal", "Convert each exposed element into a watch item"], ["regulatory-capture", "act-68", "s190"]),
  ]),
  T(2, "vermonts-record", "Vermont's Record", "The history behind the cascade, the four events of 2026, and a close reading of the S.190 veto.", [
    L(4, "psr-vermont-reform-history", "Vermont's Reform History: Why the Cascade Was a Sustainability Design", 25,
      "Green Mountain Care and the 2014 retreat compared with Acts 167, 51 and 68, how the cascade makes failure visible, four design principles and what a cascade does not guarantee.",
      ["Compare the 2014 single-payer retreat with the Act 167-51-68 cascade", "State Chapter 14's four design principles", "Identify what a cascade does not guarantee"], ["history", "cascade", "act-167"]),
    L(5, "psr-the-2026-record", "The 2026 Record: Four Events and What Each Tested", 25,
      "The S.190 veto, the AHEAD withdrawal, the September budget order and the November election, what each tested and what the sources do not establish.",
      ["Describe the four 2026 events with their sources and limits", "Explain what stayed in force after each event", "Assess how the post-election configuration changes the risk picture"], ["2026", "s190", "election"]),
    L(6, "psr-reading-a-veto", "Reading a Veto: Who Should Capture the Savings?", 25,
      "The S.190 arguments in the words reported, tested against Act 68, a method for reading a policy dispute and four scenarios for the next session.",
      ["Separate factual, authority and values claims in a policy dispute", "Test authority claims against the enacted statute", "Plan for scenarios in the next legislative session"], ["veto", "reference-based-pricing", "analysis"]),
  ]),
  T(3, "early-warning-and-scenarios", "Early Warning, Scenarios and Monitoring", "The eight early-warning signals checked against 2026, scenario planning with a worked card, and the monitoring instruments.", [
    L(7, "psr-early-warning-signals", "Early-Warning Signals: Reading the Risk Before the Statute Changes", 25,
      "Chapter 14's eight signals, their status against the 2026 record, four general categories, and how to weigh severity, lead time and noise.",
      ["Name the eight signals and the sources that show them", "Distinguish fired, not observed and not assessed", "Link each signal to a decision in advance"], ["early-warning", "signals", "monitoring"]),
    L(8, "psr-disruption-scenarios", "Disruption Scenarios: Planning for Outcomes You Cannot Predict", 25,
      "The five parts of a scenario, Chapter 14's scenarios and what overtook them, post-election scenarios, a worked card and a scenario-by-investment test.",
      ["Write a scenario with condition, trigger, impact, response and owner", "Test a capital plan against a scenario set", "Maintain scenario plans on a review calendar"], ["scenario-planning", "risk", "capital-plan"]),
    L(9, "psr-monitoring-system", "Building the Monitoring System: The Wire, the Simulator and the Friction Index", 25,
      "What the bill tracker, the HTR Simulator and the Friction Index do and cannot do, a worked example across all three and a monthly routine.",
      ["Describe what each monitoring instrument shows and its limits", "Run a monthly monitoring routine", "Translate a bill into an exposure using the three instruments"], ["the-wire", "simulator", "friction-index"]),
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
