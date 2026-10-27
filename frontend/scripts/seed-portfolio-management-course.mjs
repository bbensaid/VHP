// Seeds the Chapter 15 companion course "Transformation as Portfolio Management"
// (slug transformation-portfolio-management) into Supabase: course, 5 tracks, 15 lessons.
// Lesson bodies are already in Sanity (frontend/content/_course_portfolio_t1..t5.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug;
// lessons: track_id,slug), safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-portfolio-management-course.mjs --commit
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
  slug: "transformation-portfolio-management",
  title: "Portfolio Management for Healthcare Transformation",
  subtitle: "PMI standards for running a five-pillar transformation: roles, sequencing, risk, benefits and the business case",
  description:
    "The companion course to Chapter 15 of Transforming Healthcare. A healthcare transformation is not a project or a single program; it is a portfolio of interdependent programs that must be built in dependency order against fixed deadlines. This course applies PMI's portfolio, program and project standards to that problem, using Vermont's 19-component transformation as the worked case: defining the portfolio, staffing and governing it, scheduling it by dependency rather than by deadline, choosing predictive or adaptive management per component, measuring progress with earned value, building and reading the portfolio risk register, tracing every component to Act 167's goals, and making the business case for a portfolio office. It ends with a capstone in which you build and run a portfolio of your own on the platform's tools.",
  target_audience: [
    "State health agency and regulatory staff managing a transformation portfolio",
    "Hospital and health-system transformation, strategy and PMO leaders",
    "Project and program managers new to healthcare transformation",
    "Legislators, board members and advisors who oversee a transformation",
  ],
  prerequisites: ["Start Here (recommended)", "Five Pillars, One Imperative, Track 1 (recommended)"],
  estimated_hours: 6.5,
  is_published: true,
  version: "1",
  pillar: "operations",
  level: "intermediate",
  chapter_ref: "15",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "foundations", "Foundations: Why Transformation Is a Portfolio", "The project-management gap, the three levels of management, and defining the portfolio.", [
    L(1, "tpm-project-management-gap", "The Project-Management Gap in Healthcare Transformation", 25,
      "How every five-pillar concept maps to a management discipline, what poor delivery costs, what HealthCare.gov's launch shows, and Vermont's version of the gap.",
      ["Map the five-pillar framework's concepts to project-management disciplines", "Explain the evidence on the cost of poor project delivery", "Describe the management failures GAO found in HealthCare.gov's launch"], ["portfolio", "pmi", "healthcare-gov"]),
    L(2, "tpm-project-program-portfolio", "Project, Program, Portfolio: Getting the Levels Right", 25,
      "PMI's three levels, the current editions of their standards, Vermont's transformation at each level, and how to diagnose the level at which work is really managed.",
      ["Distinguish projects, programs and portfolios and how each is judged", "Name the current editions of PMI's project, program and portfolio standards", "Diagnose the level at which an organization manages its transformation"], ["portfolio", "pmi", "standards"]),
    L(3, "tpm-defining-the-portfolio", "Defining the Portfolio: The Component Inventory", 25,
      "How HTR built Vermont's 19-component inventory, how components are classified, what first inventories reveal, and how to build your own.",
      ["Apply the inventory method: owner, dated obligation, one pillar", "Classify components by pillar, type, priority, lead and stage gate", "Build a first inventory and load it into the Portfolio Sequencing Test"], ["portfolio", "inventory"]),
  ]),
  T(2, "structure", "Structure: Roles, Governance and Authority", "The Portfolio Manager, the pillar program managers, the governance tiers and the ten knowledge areas.", [
    L(4, "tpm-portfolio-manager", "The Portfolio Manager: Role, Authority and Credentials", 25,
      "Why a transformation needs one integrator, what the role does, the authority it needs, the PfMP credential, and why contractors cannot fill it.",
      ["Describe the Portfolio Manager's responsibilities and required authority", "Explain why authority over sequencing is decisive", "State the PfMP eligibility paths"], ["portfolio", "roles", "pfmp"]),
    L(5, "tpm-program-managers-governance", "Pillar Program Managers and the Three Governance Tiers", 25,
      "Each pillar as a program, the five program manager roles, the PMP and PMI-ACP credentials, PMI's three governance tiers, and the same structure inside a hospital.",
      ["Describe the five pillar program manager roles and their dual reporting", "Distinguish the governance body, the portfolio office and the component level", "Adapt the structure to a hospital or health system"], ["program", "governance", "pmp"]),
    L(6, "tpm-ten-knowledge-areas", "The Ten Knowledge Areas as a Portfolio-Office Checklist", 25,
      "The ten PMBOK knowledge areas against Vermont's capacity, the integrated master schedule and GAO's schedule best practices, and a one-hour capacity audit.",
      ["Use the ten knowledge areas to audit portfolio-office capacity", "Apply GAO's schedule best practices to an integrated master schedule", "Identify resource, procurement and stakeholder gaps visible only at portfolio level"], ["pmbok", "schedule", "gao"]),
  ]),
  T(3, "sequencing-scheduling", "Sequencing and Scheduling", "Scheduling by dependency, choosing the management approach, and measuring progress with earned value.", [
    L(7, "tpm-dependency-sequence", "Portfolio Sequence Is Dependency Sequence", 25,
      "Why deadlines are the wrong organizing principle, the two decision rules, gates versus the critical path, and what the Portfolio Sequencing Test finds in Vermont.",
      ["Apply the two dependency decision rules", "Run the Portfolio Manager's Sequencing Test", "Identify where schedule pressure belongs in a portfolio"], ["sequencing", "dependency", "critical-path"]),
    L(8, "tpm-predictive-adaptive-hybrid", "Predictive, Adaptive or Hybrid: Choosing the Approach per Component", 25,
      "The three approaches, how Chapter 15 classifies Vermont's components, why the choice matters, and how to govern a mixed portfolio.",
      ["Choose predictive, adaptive or hybrid management for a component", "Report each component on the measure that fits its approach", "Govern a portfolio that mixes approaches"], ["agile", "predictive", "hybrid"]),
    L(9, "tpm-earned-value-schedule-health", "Measuring Progress: Earned Value and Schedule Health", 25,
      "Planned value, earned value and actual cost; SPI and CPI; a worked illustration; federal EVM standards; and what earned value cannot see.",
      ["Calculate schedule and cost variance, SPI and CPI", "Explain federal EVM practice under GAO-20-195G and EIA-748", "Read earned value alongside sequencing verdicts and benefits"], ["evm", "performance", "gao"]),
  ]),
  T(4, "risk-benefits", "Risk and Benefits", "Building and reading the portfolio risk register, and tracing every component to a goal.", [
    L(10, "tpm-risk-register", "Building the Portfolio Risk Register", 25,
      "The register's columns, probability-times-impact scoring, the five threat responses, Vermont's ten risks, and building your own register.",
      ["Write risk statements with cause and consequence", "Score risks on a fixed probability and impact scale", "Choose among avoid, mitigate, transfer, accept and escalate"], ["risk", "register"]),
    L(11, "tpm-reading-the-register", "Reading the Register: Heat Maps, Shared Causes and Escalation", 25,
      "The heat map, correlated risks with shared causes, watching a risk propagate in the simulators, escalation rules, and a monthly reading routine.",
      ["Read a risk register as a heat map and by shared cause", "Use the HTR Simulator to show a risk propagating across pillars", "Design escalation triggers along the governance tiers"], ["risk", "heat-map", "escalation"]),
    L(12, "tpm-benefits-realization", "Benefits Realization: Tracing Every Component to a Goal", 25,
      "Benefits versus deliverables, tracing components to Act 167's five goals, leading and lagging measures, and using benefits to make portfolio decisions.",
      ["Trace portfolio components to statutory or strategic goals", "Pair leading and lagging benefit measures; measure equity as gaps", "Use a benefits trace to recommend stopping a component"], ["benefits", "act-167"]),
  ]),
  T(5, "case-and-capstone", "Making the Case and Making It Stick", "The business case, the five objections and the roadmap, and a capstone on the platform's tools.", [
    L(13, "tpm-business-case", "The Business Case for a Portfolio Office", 25,
      "What the office costs, the cost of failure, framing avoided losses as risk reduction, making the case in a hospital, and testing the case.",
      ["Cost a portfolio office and compare it with the investment it coordinates", "Tie each cost line to the scored risks it reduces", "State the cost of failure conservatively"], ["business-case", "pmo"]),
    L(14, "tpm-objections-and-oversight", "Answering the Objections, and the Question Oversight Should Ask", 25,
      "The five objections and their answers, the roadmap scheduled backward from January 2028, and the one question oversight bodies should ask.",
      ["Answer the five standard objections to a portfolio office", "Schedule a portfolio office backward from a fixed deadline", "Ask and answer the binding-constraint oversight question"], ["objections", "oversight", "roadmap"]),
    L(15, "tpm-capstone", "Capstone: Build and Run Your Own Transformation Portfolio", 60,
      "Define, sequence, stress-test and govern a real or Vermont portfolio end to end on the platform's tools, ending with a one-page portfolio brief.",
      ["Run the Portfolio Sequencing Test, Friction Index and Investment Tracker on one portfolio", "Build a risk register and benefits trace for it", "Write a one-page portfolio brief for a governance body"], ["capstone", "portfolio"]),
  ]),
];

console.log(`${COURSE.title}: ${TRACKS.length} tracks, ${TRACKS.reduce((n, t) => n + t.lessons.length, 0)} lessons`);
if (!COMMIT) { for (const t of TRACKS) console.log(` T${t.order} ${t.title}: ${t.lessons.map((l) => l.slug).join(", ")}`); console.log("DRY RUN — pass --commit"); process.exit(0); }

const { data: c, error: ce } = await db.from("courses").upsert(COURSE, { onConflict: "slug" }).select("id").single();
die("course", ce);
for (const t of TRACKS) {
  const { data: tr, error: te } = await db.from("tracks").upsert({
    course_id: c.id, pillar: "operations", order: t.order, slug: t.slug, title: t.title,
    description: t.description, icon: null, target_audience: COURSE.target_audience, is_published: true,
  }, { onConflict: "course_id,slug" }).select("id").single();
  die(`track ${t.slug}`, te);
  for (const l of t.lessons) {
    die(`lesson ${l.slug}`, (await db.from("lessons").upsert({
      track_id: tr.id, pillar: "operations", order: l.order, slug: l.slug, title: l.title, summary: l.summary,
      estimated_minutes: l.minutes, objectives: l.objectives.map((text, i) => ({ id: `obj_${l.order}_${i + 1}`, text })),
      content_blocks: [], tags: l.tags, related_lesson_ids: [], is_published: true, sanity_slug: l.slug,
    }, { onConflict: "track_id,slug" })).error);
  }
  console.log(`  ✓ track ${t.order} ${t.slug} (${t.lessons.length} lessons)`);
}
console.log("Done.");
