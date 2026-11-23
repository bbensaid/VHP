// Seeds the Chapter 3 companion course (slug cmmi-models-waiver-strategy) into Supabase.
// Lesson bodies are already in Sanity (frontend/content/_course_cmmi_t*.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug;
// lessons: track_id,slug), safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-cmmi-course.mjs --commit
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
  slug: "cmmi-models-waiver-strategy",
  title: "CMMI Models and Waiver Strategy",
  subtitle: "How the federal-state interface works: Innovation Center models, section 1115 waivers, prior authorization rules and H.R. 1",
  description:
    "The companion course to Chapter 3 of Transforming Healthcare. Every state reform runs through the federal-state interface. This course covers what the CMS Innovation Center is allowed to do and what its record shows, the 2026 model landscape, AHEAD and Vermont's experience with it, section 1115 waivers and budget neutrality, the federal prior authorization rule, the Medicaid provisions of H.R. 1, and a practitioner's framework for monitoring and assessing federal policy. It ends with a capstone on the platform's Medicaid policy tools.",
  target_audience: [
    "State health agency and Medicaid staff negotiating models and waivers",
    "Hospital and health-system strategy, finance and policy leaders",
    "Legislators, board members and advisors who oversee a state reform",
    "Policy analysts and students of health policy",
  ],
  prerequisites: ["Start Here (recommended)", "Medicaid 101 (recommended)"],
  estimated_hours: 6.5,
  is_published: false, // flipped to true only when all lessons are written and linked
  version: "1",
  pillar: "policy",
  level: "intermediate",
  chapter_ref: "3",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "innovation-center", "The Innovation Center: Authority, Record and Landscape", "What CMMI may do under section 1115A, what its record shows, and the 2026 model landscape.", [
    L(1, "cmmi-authority-and-record", "What the Innovation Center Is, and What Its Record Says", 25,
      "Section 1115A authority, the expansion test, CBO and GAO scorecards, the four design characteristics of stronger models, and Vermont's AHEAD experience.",
      ["Describe the Innovation Center's statutory authority and limits on review", "State the three conditions for expanding a model nationwide", "Use CBO and GAO findings as a base rate for new model announcements"], ["cmmi", "1115a", "gao", "cbo"]),
    L(2, "cmmi-2026-model-landscape", "The 2026 Model Landscape: What Is Live, What Ended, What Is Next", 25,
      "The four model families, the 2025 early endings, AHEAD, LEAD, TEAM and BALANCE as of late 2026, and a routine for checking any model's current status.",
      ["Place any CMMI model in one of four families", "State the current status of AHEAD, ACO REACH and LEAD, TEAM and BALANCE", "Apply a four-step routine to a new model announcement"], ["cmmi", "ahead", "lead", "team", "balance"]),
    L(3, "cmmi-scoring-a-model", "Scoring a Model Before You Commit: A Practitioner Scorecard", 25,
      "Six questions for any model: who must participate, is the risk real, is there support, does it fit state regulation, how do we exit, and what else must hold. Tested on Shared Savings Program and Vermont All-Payer results.",
      ["Apply the six-question scorecard to a new model announcement", "Interpret Shared Savings Program 2024 results by ACO type", "Identify exit and dependency risks in a federal model agreement"], ["cmmi", "evaluation", "mssp", "vtapm"]),
  ]),
  T(2, "state-models", "State Models: Global Budgets, AHEAD and Episodes", "Hospital global budgets from Maryland to AHEAD, Vermont's AHEAD agreement and withdrawal, and mandatory episode models.", [
    L(4, "cmmi-global-budgets-maryland-to-ahead", "Hospital Global Budgets: From Maryland to AHEAD", 25,
      "How a global budget works, what Maryland's evidence shows, AHEAD's components and 2025 changes, the prerequisites for a state, and Vermont's Act 68.",
      ["Explain how a hospital global budget changes incentives", "Summarize the evidence from Maryland's all-payer and total cost of care models", "List the prerequisites a state needs before it can run global budgets"], ["global-budget", "maryland", "ahead", "act-68"]),
    L(5, "cmmi-vermont-ahead-agreement", "Vermont and AHEAD: Reading a State Agreement and a Withdrawal", 25,
      "The timeline from signing to withdrawal, the clauses that made exit possible, two accounts of the same event, what Act 68 preserves, and a checklist for any state.",
      ["Describe what Vermont's AHEAD State Agreement was built to protect", "Compare the state's and CMS's accounts of the withdrawal and separate sourced from unsourced figures", "Apply a pre-signing checklist to a federal model agreement"], ["ahead", "vermont", "state-agreement", "withdrawal"]),
    L(6, "cmmi-team-mandatory-episodes", "Mandatory Episodes: How TEAM Works and How to Prepare", 25,
      "Who must participate, the five surgical episodes, the three risk tracks, target prices, reconciliation and quality, and a preparation sequence.",
      ["Identify which hospitals TEAM covers and which are excluded", "Compare the three TEAM risk tracks and the default assignment rule", "Explain how target prices, quality scores and stop limits determine reconciliation"], ["team", "episodes", "mandatory", "bundled-payments"]),
  ]),
  T(3, "section-1115-waivers", "Section 1115 Waivers", "The authority and process behind 1115 demonstrations, budget neutrality under the 2027 rewrite, and Vermont's Global Commitment demonstration.", [
    L(7, "cmmi-1115-authority-and-process", "Section 1115 Waivers: Authority, Process and What States Use Them For", 25,
      "The two powers in section 1115, the path from proposal to approval, the four common uses, and how the March 2025 HRSN reversal shows federal policy risk.",
      ["Distinguish waiver authority from expenditure authority", "Describe the public process and negotiation steps for a demonstration", "Explain why approval does not guarantee renewal"], ["1115", "waivers", "medicaid", "hrsn"]),
    L(8, "cmmi-budget-neutrality", "Budget Neutrality: The Old Test and the 2027 Rewrite", 25,
      "The with-waiver versus without-waiver test, section 1115(g) and the Chief Actuary certification from January 1, 2027, MAPS and 1115-only activities, savings and renewals.",
      ["Explain the old with-waiver and without-waiver budget neutrality test", "Describe what section 1115(g) requires from January 1, 2027", "Classify demonstration activities as MAPS or 1115-only"], ["1115", "budget-neutrality", "chief-actuary", "maps"]),
    L(9, "cmmi-vermont-global-commitment", "Vermont's Global Commitment to Health: A Worked Case", 25,
      "The demonstration and its special terms and conditions, the January 2025 amendment, the Medicaid hospital global budget, and CMS's July 7, 2026 compliance letter and corrective actions.",
      ["Explain why special terms and conditions are the binding rules of a demonstration", "Describe the corrective actions and consequences in CMS's July 7, 2026 letter to Vermont", "Apply four rules for launching a payment arrangement under a demonstration"], ["1115", "vermont", "global-commitment", "stc"]),
  ]),
  T(4, "prior-auth-and-hr1", "Prior Authorization and H.R. 1", "The federal prior authorization rule and 2027 APIs, and what H.R. 1 changes in Medicaid.", [
    L(10, "cmmi-prior-authorization-rule", "Prior Authorization: The Federal Rule, the 2027 APIs and the State Role", 25,
      "The physician-reported burden, what CMS-0057-F requires from 2026 and 2027, what it leaves untouched, and Vermont's Act 167.",
      ["State the decision timeframes and which payers they cover", "Describe the four 2027 API requirements", "Distinguish prior authorization policy reform from operational burden reduction"], ["prior-authorization", "cms-0057-f", "act-167"]),
    L(11, "cmmi-hr1-medicaid-provisions", "H.R. 1 and Medicaid: Provisions, Dates and Dollars", 25,
      "Section by section: work requirements, six-month renewals, retroactive coverage, provider taxes, state directed payments and cost sharing, with effective dates and CBO estimates.",
      ["Match each major H.R. 1 Medicaid provision to its section, date and CBO estimate", "Explain why coverage loss arises mainly from administrative churn", "Build a dated implementation timeline for a state Medicaid agency"], ["hr1", "medicaid", "provider-tax", "state-directed-payments"]),
    L(12, "cmmi-work-requirements-implementation", "Medicaid Work Requirements: The Rule, the Delay and the Court", 25,
      "The statute, CMS's June 2026 interim final rule, the October court ruling on medical frailty and the November optional hold harmless period through June 30, 2027.",
      ["Describe what the interim final rule requires of states and enrollees", "Explain the court ruling and the hold harmless period and what remains unsettled", "Plan a state or organizational response while the rules are changing"], ["work-requirements", "hr1", "interim-final-rule", "medicaid"]),
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
