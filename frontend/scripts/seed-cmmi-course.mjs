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
