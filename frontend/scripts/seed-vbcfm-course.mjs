// Seeds the Chapter 7 companion course (slug vbc-financial-modeling-apm-readiness) into Supabase.
// Lesson bodies are already in Sanity (frontend/content/_course_vbcfm_t*.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug;
// lessons: track_id,slug), safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-vbcfm-course.mjs --commit
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
  slug: "vbc-financial-modeling-apm-readiness",
  title: "VBC Financial Modeling and APM Readiness",
  subtitle: "Benchmarks, shared savings, contract analysis, readiness and the financial case for transformation",
  description:
    "The companion course to Chapter 7 of Transforming Healthcare. Value-based care asks different financial questions from fee-for-service: what is our total cost of care for an attributed population, where is it above the benchmark, and which investments will bring it below? This course teaches how benchmarks are built, how shared savings and losses are calculated under the Medicare Shared Savings Program's 2026 parameters, how to size the return on care management under different payment arrangements, how to assess readiness across six domains and read a contract for financial risk, how hospitals manage finances under global budgets, and how to build the financial case for transformation investment. It ends with a capstone on the platform's Economics tools.",
  target_audience: [
    "Hospital and health-system CFOs, finance and strategy leaders",
    "ACO, physician group and payer contracting and analytics staff",
    "State health agency and regulatory staff designing payment reform",
    "Students and analysts of value-based payment",
  ],
  prerequisites: ["Value-Based Care course (recommended)", "Hospital Finance course (recommended)"],
  estimated_hours: 6.5,
  is_published: false, // flipped to true only when all lessons are written and linked
  version: "1",
  pillar: "economics",
  level: "intermediate",
  chapter_ref: "7",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "benchmarks-and-savings", "Benchmarks, Shared Savings and Risk", "How benchmarks are built, how shared savings are calculated, and the return on care management.", [
    L(1, "vbcfm-benchmarks", "Benchmarks: The Most Consequential Number in a Value-Based Contract", 25,
      "Three ways to build a benchmark, the Shared Savings Program's baseline and three adjustments, risk adjustment and the coding question, and Vermont's open design questions.",
      ["Compare historical, regional and prospective benchmarks", "Describe how the Shared Savings Program sets its baseline and adjustments", "Apply a benchmark review checklist to a contract"], ["benchmark", "mssp", "risk-adjustment"]),
    L(2, "vbcfm-shared-savings-calculation", "The Shared Savings Calculation: A Working Model", 25,
      "The five-step calculation, the 2026 Shared Savings Program parameters by track, a worked example, assignment and glide-path terms, and the contrast with a global budget.",
      ["Compute shared savings and losses under a track's sharing rate, cap and quality gate", "Explain why a minimum savings rate matters", "Contrast shared savings with a global budget"], ["shared-savings", "mssp", "apm"]),
    L(3, "vbcfm-risk-stratification-roi", "Risk Stratification and the Return on Care Management", 25,
      "Stratifying a population, the chapter's worked example, why the return depends on who captures the savings, cautions about stratification bias and a decision process.",
      ["Distinguish benefit-to-cost ratio from return on investment", "Recalculate a care management return under shared savings versus a global budget", "Test a business case against a range of effects"], ["roi", "care-management", "risk-stratification"]),
  ]),
  T(2, "readiness-and-contracts", "Readiness and Contract Analysis", "Assessing organizational readiness for risk and reading an APM contract for financial exposure.", [
    L(4, "vbcfm-readiness-domains", "APM Readiness: Six Domains and Thirty Dimensions", 25,
      "Why readiness is separate from financial terms, and what each of the six domains and thirty dimensions asks, with Vermont context.",
      ["Name the six readiness domains and the dimensions in each", "Explain why readiness determines whether a contract's terms can be earned", "Use the domains as a leadership scoring conversation"], ["readiness", "vbc", "domains"]),
    L(5, "vbcfm-readiness-scoring", "Scoring Readiness and Finding the Binding Constraint", 25,
      "The 0-4 scoring, the readiness bands, why the weakest domain rules, a reading of three illustrative profiles, and turning a gap list into a sequence.",
      ["Score readiness with evidence and interpret the overall band", "Identify the binding constraint from a domain profile", "Sequence investments by dependency"], ["readiness", "scoring", "binding-constraint"]),
    L(6, "vbcfm-contract-review", "Reading an APM Contract for Financial Risk", 25,
      "The 65-provision, eight-category contract checklist, the quality withhold arithmetic, carve-out symmetry, risk corridors, settlement and how to use the checklist in negotiation.",
      ["Review a contract against the eight categories", "Calculate the amount at risk in a quality withhold", "Prioritize critical provisions by dollar impact"], ["contracts", "apm", "risk-corridor"]),
  ]),
  T(3, "global-budget-finance", "Hospital Finance Under Global Budgets and Reference-Based Pricing", "What Act 68 requires, the metrics that change, reference-based pricing exposure and the four-scenario stress test.", [
    L(7, "vbcfm-global-budget-metrics", "Managing a Hospital Under a Global Budget: The Metrics That Change", 25,
      "What Act 68 requires of global hospital budgets, the eight metric swaps from fee-for-service, the service-reduction notice rule and a monthly dashboard.",
      ["State what Act 68 requires of global hospital budgets and what they include", "Replace fee-for-service metrics with their global budget counterparts", "Plan service reductions within the statute's notice requirement"], ["global-budget", "act-68", "hospital-finance"]),
    L(8, "vbcfm-reference-based-pricing", "Reference-Based Pricing: What Act 68 Says and What It Does to a Hospital", 25,
      "The statute's provisions on maximum prices, benchmarks, coverage and premium monitoring, a transparent exposure formula and what remains unknown.",
      ["Summarize Act 68's reference-based pricing provisions", "Estimate revenue exposure with the stress test's formula", "Identify the unknowns to model as ranges"], ["reference-based-pricing", "act-68", "stress-test"]),
    L(9, "vbcfm-hospital-stress-test", "The Hospital Financial Stress Test: Four Scenarios, One Plan", 25,
      "The tool's sourced baselines, its four scenarios and mechanisms, how to read margin, days cash and debt coverage together, and a staged plan.",
      ["Describe the four stress scenarios and how the tool models each", "Read margin, days cash on hand and debt service coverage together", "Build a staged plan from stress results"], ["stress-test", "hospital-finance", "scenarios"]),
  ]),
  T(4, "the-financial-case", "The Financial Case", "Building the return on transformation, the primary care evidence, and making the case to boards, payers and legislatures.", [
    L(10, "vbcfm-transformation-roi", "The Return on Transformation: A Framework and Its Evidence Ladder", 25,
      "Chapter 7's five investment types, an evidence ladder for inputs, applying the share of savings, J-curve cash flow, breakeven analysis and presenting a range.",
      ["Apply the transformation ROI framework with the payment arrangement's share of savings", "Rank business-case inputs on an evidence ladder", "Compute a breakeven number of prevented events"], ["roi", "business-case", "breakeven"]),
    L(11, "vbcfm-primary-care-economics", "Primary Care Economics: What Vermont's Blueprint Evidence Shows and Does Not", 25,
      "The Blueprint's scale and cost, the provenance of its return figures, the 2025 annual report's risk-adjusted comparison and caveats, the Auditor's critique and the Medicare funding gap.",
      ["Describe the Blueprint's scale, funding and evidence with provenance", "Interpret a risk-adjusted comparison with its stated limits", "Explain the Medicare funding gap after the all-payer model agreement ended"], ["primary-care", "blueprint", "evidence"]),
    L(12, "vbcfm-making-the-case", "Making the Financial Case: To a Board, a Payer and a Legislature", 25,
      "The funding streams available, what a board, a payer and a legislature each need to see, honest answers to common objections and a one-page case template.",
      ["Tailor a financial case to a board, a payer or a legislature", "Plan financing after time-limited grants end", "Write a one-page case with a range, a stop trigger and a decision request"], ["business-case", "negotiation", "legislature"]),
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
