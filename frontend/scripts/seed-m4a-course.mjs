// Seeds "Medicare for All Through the Five-Pillar Test" (slug medicare-for-all-five-pillar-test) into Supabase:
// course, 7 tracks, 18 lessons. Lesson bodies are already in Sanity (frontend/content/_course_m4a_t1..t7.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug; lessons: track_id,slug),
// safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-m4a-course.mjs --commit
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
  slug: "medicare-for-all-five-pillar-test",
  title: "Medicare for All Through the Five-Pillar Test",
  subtitle: "Single payer, Vermont's Act 48 attempt, the federal bills, and what can be built before authority arrives",
  description:
    "What Medicare for All would actually require, tested with the book's five-pillar sequencing framework. The course defines single payer and the competing federal proposals (S.1506, H.R.3069, Medicare for America, Medicare at 50), reconstructs Vermont's Act 48 single-payer attempt from 2011 to its December 2014 stop using the state's own reports, and explains the three federal walls a state cannot take down (Medicare, ERISA and waiver limits) and the one a federal law leaves standing (financing). It reads the bills section by section, summarizes what CBO has and has not estimated, assesses each pillar's gate with evidence, models what a single payer would mean for each of Vermont's fourteen hospitals, and ends with the parallel work worth doing now and a capstone brief. Every assessment is a dated sequencing judgment, not a position for or against the policy.",
  target_audience: [
    "Legislators, staff and state health officials evaluating universal-coverage proposals",
    "Hospital and health-system leaders assessing what single payer would mean for their budgets",
    "Policy analysts, advocates and journalists covering Medicare for All",
    "Students of health policy who want the evidence behind the debate",
  ],
  prerequisites: ["Start Here (recommended)", "Medicare Fundamentals (recommended)", "Five Pillars, One Imperative, Track 1 (recommended)"],
  estimated_hours: 8,
  is_published: true,
  version: "1",
  pillar: "policy",
  level: "intermediate",
  chapter_ref: "2",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "foundations", "Foundations: Terms and the Test", "What single payer and Medicare for All mean, and how the five-pillar test is applied.", [
    L(1, "m4a-terms", "Single Payer, Medicare for All, and the Alternatives", 25,
      "Single payer as a financing design, the two Medicare for All bills, Medicare for America, buy-ins, and Vermont's Green Mountain Care.",
      ["Define single payer and distinguish it from a buy-in", "Describe what S.1506 and H.R.3069 do", "Explain how Medicare for America and Green Mountain Care differ"], ["single-payer", "medicare-for-all", "definitions"]),
    L(2, "m4a-sequencing-lens", "Reading a Reform Through the Five-Pillar Test", 25,
      "The five currencies, the gate rule, the three critical-path dependencies, the Equity Imperative, and what an HTR assessment is.",
      ["Name each pillar's currency", "Apply the gate test to a proposal", "Explain why a bill in committee has not issued authority"], ["five-pillars", "sequencing", "equity"]),
  ]),
  T(2, "vermont-act-48", "Vermont's Attempt, 2011-2014", "What Act 48 enacted, how the cost estimates grew, and why the Governor stopped.", [
    L(3, "m4a-act-48", "Act 48 of 2011: What Vermont Enacted", 25,
      "The Hsiao design, Act 48's principles, the Board and exchange it created, the benefits it promised, and the financing it deferred.",
      ["Describe the institutions Act 48 created", "Explain the five implementation conditions", "Identify what Act 48 left to a future financing law"], ["vermont", "act-48", "gmcb"]),
    L(4, "m4a-financing-2013-2014", "The Numbers: From $1.6 Billion to $2.6 Billion", 25,
      "The 2013 financing plan, Avalere's critique, the 2014 design and balance sheet, and why the estimate grew.",
      ["Read the 2013 and 2014 Vermont financing estimates", "Explain the drivers of the higher 2014 estimate", "Identify who stayed outside the state plan"], ["vermont", "financing", "payroll-tax"]),
    L(5, "m4a-why-vermont-stopped", "December 17, 2014: Why Vermont Stopped, and What Survived", 25,
      "The decision in the state's words, the small-business problem, rejected alternatives, the five-pillar reading, and the legacy in Act 68.",
      ["Explain why the Governor did not propose financing", "Read the stop as a Policy-to-Economics gate", "Trace what survived into Vermont's current reforms"], ["vermont", "act-48", "act-68"]),
  ]),
  T(3, "federal-vs-state", "Federal Versus State: The Walls", "Medicare, ERISA and waiver limits: what a state cannot reach and what a federal law changes.", [
    L(6, "m4a-medicare-wall", "The Medicare Wall: What a State Cannot Reach", 25,
      "How Act 48 handled Medicare, how much sat outside, why it limits savings, the wall in 2026, and what S.1506 does.",
      ["Explain why a state cannot fold Medicare into a state plan", "Quantify Medicare's share in Vermont's estimates", "Describe how S.1506 §§ 701 and 901 change this"], ["medicare", "federal-state", "ahead"]),
    L(7, "m4a-erisa-wall", "The ERISA Wall: Employer Plans a State Cannot Compel", 25,
      "ERISA preemption, savings and deemer clauses, the Hawaii exception, Vermont's self-insured plans, Gobeille, and S.1506's ERISA amendment.",
      ["Explain ERISA § 514's effect on state health reform", "Connect the ERISA wall to OneCare and Gobeille", "Describe how S.1506 § 801 amends ERISA"], ["erisa", "self-insured", "gobeille"]),
    L(8, "m4a-waiver-wall", "Waivers and Federal Dollars: Section 1332 and Section 1115", 25,
      "What § 1332 can waive, its guardrails, how little money it moved, Medicaid waivers, the federal route, and the financing wall that remains.",
      ["List what a § 1332 waiver can and cannot waive", "Explain the deficit-neutrality guardrail", "Distinguish the walls a federal law removes from the one it does not"], ["section-1332", "section-1115", "financing"]),
  ]),
  T(4, "bills-and-evidence", "The Federal Bills and the Evidence", "S.1506 and H.R.3069 in detail, the alternatives, and CBO's findings.", [
    L(9, "m4a-s1506", "Inside S.1506 and H.R.3069", 25,
      "Coverage and timing, benefits, provider payment, administration, transition changes to Medicare, and where the bills stand.",
      ["Describe the phase-in of S.1506 and H.R.3069", "Explain how S.1506 pays hospitals and clinicians", "State the bills' status and what they leave out"], ["s1506", "hr3069", "global-budgets"]),
    L(10, "m4a-alternatives", "The Alternatives: Medicare for America and Medicare at 50", 25,
      "H.R.10924's design, employer rules and taxes; the Medicare at 50 Act; the debate in November 2026; the alternatives through the five pillars.",
      ["Compare Medicare for America with Medicare for All", "Describe the Medicare at 50 Act", "Explain why the alternatives face different gates"], ["medicare-for-america", "buy-in", "alternatives"]),
    L(11, "m4a-cbo-evidence", "What CBO Has Estimated, and What It Has Not", 25,
      "CBO's five illustrative designs, the 2030 ranges, payment-rate scenarios, access and unmet demand, economic effects, and limits.",
      ["State CBO's 2030 ranges for federal and national spending", "Explain how payment rates drive the results", "Avoid presenting illustrative estimates as a bill's cost"], ["cbo", "costs", "evidence"]),
  ]),
  T(5, "five-pillar-assessment", "The Five-Pillar Assessment", "Each gate assessed with evidence, as of November 2026.", [
    L(12, "m4a-policy-gate", "Policy: Authority Not Yet Issued", 25,
      "The authority Medicare for All needs, where the bill stands, the politics after the 2026 midterms, what can be issued now, and the assessment.",
      ["Identify the authority Medicare for All requires", "Assess the Policy gate from current evidence", "Distinguish authority that can be issued now"], ["policy", "politics", "assessment"]),
    L(13, "m4a-tech-econ-gates", "Technology and Economics: The Information Exists, the Money Does Not", 25,
      "The information S.1506 needs and what already exists; the incentive design; the money; equity questions; the two assessments.",
      ["Assess the Technology gate and its gap", "Assess the Economics gate and what would open it", "Explain the Technology-to-Economics critical path"], ["technology", "economics", "vhcures"]),
    L(14, "m4a-clinical-ops-gates", "Clinical and Operations: Demand, Supply and Capacity", 25,
      "What changes for patients, CBO's unmet demand, the equity question, the capacity the transition needs, Vermont's evidence, and the assessments.",
      ["Explain why Clinical is not yet testable", "Identify the capacity the transition requires", "Assess the Operations gate"], ["clinical", "operations", "workforce"]),
  ]),
  T(6, "vermont-hospitals", "Vermont's Hospitals Under a Single Payer", "What a single rate and S.1506's global budgets would mean for each of Vermont's fourteen hospitals.", [
    L(15, "m4a-vermont-hospitals-rate", "One Rate for Every Patient: Vermont's Fourteen Hospitals", 25,
      "FY2027 budgets, commercial prices relative to Medicare, the model, Medicare rates, the revenue-neutral rate, the 200% benchmark, and limits.",
      ["Explain how a single rate redistributes hospital revenue", "Find and interpret the revenue-neutral rate", "State the model's limits"], ["vermont", "hospitals", "modeler"]),
    L(16, "m4a-vermont-hospitals-global", "Global Budgets Under S.1506, and Vermont's Own Experience", 25,
      "How § 611 pays hospitals, a cost-based model for Vermont, what the simplification hides, Vermont's global-budget history, and a Modeler exercise.",
      ["Describe S.1506's global-budget negotiation", "Compare rate-based and cost-based redistribution", "Explain why Vermont's own global budgets stalled"], ["global-budgets", "vermont", "act-68"]),
  ]),
  T(7, "build-now-capstone", "What to Build Now, and Capstone", "Parallel work worth doing before authority arrives, and a capstone brief.", [
    L(17, "m4a-what-to-build-now", "What to Build Before Authority Arrives", 25,
      "The parallel-work principle, and the information, payment design, workforce and authority that can proceed now under any reform.",
      ["Apply the parallel-work test", "Identify robust work in each pillar", "Distinguish design from premature deployment"], ["parallel-work", "workforce", "data"]),
    L(18, "m4a-capstone", "Capstone: Run the Five-Pillar Test Yourself", 60,
      "Name a design, assess each gate with evidence, model provider effects, apply the equity questions, and write a one-page brief.",
      ["Write a dated, sourced five-pillar assessment", "Test provider effects across assumptions", "Recommend do-now, wait and watch items"], ["capstone", "brief"]),
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
