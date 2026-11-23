// Adds tracks 2-5 (lessons 8-19) to the EXISTING course transformation-leadership (roadmap 2.1 #8).
// Lesson bodies are in Sanity (frontend/content/_course_tle_t*.py); sanity_slug = slug. Upsert-only; never touches the course row or track 1.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-tle-expansion.mjs --commit
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
  T(2, "implementation-science", "Implementation Science", "Why good plans fail: the CFIR diagnostic, the Model for Improvement and PDSA testing, and how innovations spread between organizations.", [
    L(8, "tl-implementation-science-cfir", "Why Good Plans Fail: Implementation Science and the CFIR", 25,
      "Implementation science, the CFIR and its 2022 update, a one-hour diagnostic and equity as a determinant.",
      ["Explain what implementation science asks", "Walk the five CFIR domains for a decision", "Add equity questions to an implementation diagnostic"], ["implementation-science", "cfir", "diagnostic"]),
    L(9, "tl-improvement-model-pdsa", "Testing Before Scaling: The Model for Improvement and PDSA", 25,
      "The three questions, the PDSA cycle, outcome, process and balancing measures, staged scaling and program-scale use.",
      ["State an aim and measures", "Run a PDSA cycle with a prediction", "Scale a test in stages with written standard work"], ["pdsa", "improvement", "testing"]),
    L(10, "tl-diffusion-and-spread", "Why Innovations Spread, or Do Not: Diffusion in Health Organizations", 25,
      "Diffusion versus dissemination, attributes that shape adoption, networks and influence, Vermont shared services and a spread plan.",
      ["Distinguish diffusion from implementation", "Apply adoption attributes to a design", "Write a spread plan"], ["diffusion", "spread", "shared-services"]),
  ]),
  T(3, "pace-and-capacity", "Pace and Capacity", "Hard, soft and external capacity constraints, triage and work plans when capacity is short, and contingency planning for federal shocks.", [
    L(11, "tl-capacity-constraints", "The Pace Problem: Hard, Soft and External Capacity Constraints", 25,
      "Chapter 12's three constraint types, Vermont contracting evidence from the May 2026 AHS report and a quarterly capacity assessment.",
      ["Distinguish hard, soft and external constraints", "Run a quarterly capacity assessment", "Report a capacity gap with options"], ["capacity", "pace", "planning"]),
    L(12, "tl-triage-and-work-plans", "Choosing What Not to Do: Triage, Dependencies and the Work Plan", 25,
      "Value and feasibility scoring, critical path and dependencies, work plans with deferred lists and equitable triage across hospitals.",
      ["Score work by value and feasibility", "Identify the critical path", "Communicate deferred work openly"], ["triage", "critical-path", "work-plan"]),
    L(13, "tl-shocks-and-contingency", "When the Ground Moves: Federal Shocks and Contingency Planning", 25,
      "The July 2026 CMS letter on the Medicaid hospital global budget, the AHEAD withdrawal, scenario planning, trigger points and decision logs.",
      ["Read a federal notice for its operational consequences", "Build a scenario table with triggers", "Respond to a shock in the first week"], ["contingency", "scenarios", "federal-shock"]),
  ]),
];

const SLUG = "transformation-leadership";
console.log(`${SLUG} expansion: ${TRACKS.length} tracks, ${TRACKS.reduce((n, t) => n + t.lessons.length, 0)} lessons`);
if (!COMMIT) { for (const t of TRACKS) console.log(` T${t.order} ${t.title}: ${t.lessons.map((l) => l.slug).join(", ")}`); console.log("DRY RUN — pass --commit"); process.exit(0); }

const { data: c, error: ce } = await db.from("courses").select("id,pillar,target_audience").eq("slug", SLUG).single();
die("course", ce);
for (const t of TRACKS) {
  const { data: tr, error: te } = await db.from("tracks").upsert({
    course_id: c.id, pillar: c.pillar, order: t.order, slug: t.slug, title: t.title,
    description: t.description, icon: null, target_audience: c.target_audience, is_published: true,
  }, { onConflict: "course_id,slug" }).select("id").single();
  die(`track ${t.slug}`, te);
  for (const l of t.lessons) {
    die(`lesson ${l.slug}`, (await db.from("lessons").upsert({
      track_id: tr.id, pillar: c.pillar, order: l.order, slug: l.slug, title: l.title, summary: l.summary,
      estimated_minutes: l.minutes, objectives: l.objectives.map((text, i) => ({ id: `obj_${l.order}_${i + 1}`, text })),
      content_blocks: [], tags: l.tags, related_lesson_ids: [], is_published: true, sanity_slug: l.slug,
    }, { onConflict: "track_id,slug" })).error);
  }
  console.log(`  ✓ track ${t.order} ${t.slug} (${t.lessons.length} lessons)`);
}
console.log("Done.");
