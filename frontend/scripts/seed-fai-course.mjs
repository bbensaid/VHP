// Seeds the Chapter 5 companion course (slug fhir-ai-governance-cds-in-practice) into Supabase.
// Lesson bodies are already in Sanity (frontend/content/_course_fai_t*.py);
// each lesson's sanity_slug = its slug. Upsert-only (course: slug; tracks: course_id,slug;
// lessons: track_id,slug), safe to re-run. DRY RUN by default; --commit to write.
//   cd frontend && NODE_USE_ENV_PROXY=1 node scripts/seed-fai-course.mjs --commit
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
  slug: "fhir-ai-governance-cds-in-practice",
  title: "FHIR, AI Governance and Clinical Decision Support in Practice",
  subtitle: "From standards to working systems: interoperability, governing clinical AI, designing decision support and defending rural health infrastructure",
  description:
    "The companion course to Chapter 5 of Transforming Healthcare. Health IT buildouts meet the same implementation risks in roughly the same order: interoperability that is compliant but not functional, clinical AI that arrives before governance, decision support that clinicians learn to ignore, and a larger attack surface with too little security staff. This course teaches how to turn the FHIR standard into working exchange, how to govern clinical AI across its lifecycle and read the shifting federal rules, how to design decision support that clinicians use, how to build cybersecurity through shared services, and how to sequence the investments. It ends with a capstone that runs an AI deployment through the platform's governance lab as a go or no-go gate.",
  target_audience: [
    "Hospital and health-system CIOs, CMIOs, CISOs and informatics leaders",
    "Clinical leaders and quality staff who sponsor or oversee AI and decision support",
    "State health IT, Medicaid and regulatory staff planning exchange and governance",
    "Network and shared-services leaders in rural and independent hospitals",
  ],
  prerequisites: ["Start Here (recommended)", "AI and Machine Learning in Healthcare (recommended)", "Interoperability and Data Exchange (recommended)"],
  estimated_hours: 6.5,
  is_published: false, // flipped to true only when all lessons are written and linked
  version: "1",
  pillar: "technology",
  level: "intermediate",
  chapter_ref: "5",
  is_featured: false,
};

const T = (order, slug, title, description, lessons) => ({ order, slug, title, description, lessons });
const L = (order, slug, title, minutes, summary, objectives, tags) => ({ order, slug, title, minutes, summary, objectives, tags });

const TRACKS = [
  T(1, "fhir-in-practice", "FHIR in Practice", "The gap between compliance and functional interoperability, the three priority use cases and the master patient index.", [
    L(1, "fai-fhir-reality", "FHIR Is a Standard, Not a Product: What Interoperability Actually Requires", 25,
      "Why compliant systems may not interoperate, the chain behind one useful alert, the 2026 federal frame including the HTI-5 final rule and a test for any FHIR project.",
      ["Distinguish FHIR compliance from functional interoperability", "Describe the chain needed to deliver a useful alert to a care coordinator", "Apply a five-question test to a FHIR project"], ["fhir", "interoperability", "hti-5"]),
    L(2, "fai-three-use-cases", "Three FHIR Use Cases That Matter Most", 25,
      "Patient access, provider-to-provider query and the payer APIs due in 2027: requirements, trust frameworks, sequencing and measures of use.",
      ["Describe the requirements of each priority FHIR use case", "Explain why the trust framework comes first for provider query", "Sequence and measure the three use cases"], ["fhir", "tefca", "cms-0057-f"]),
    L(3, "fai-master-patient-index", "The Master Patient Index: The Unglamorous Gate", 25,
      "What an index does, why matching is hard, Vermont's situation as the chapter describes it, privacy at the identity layer and a go or no-go assessment.",
      ["Explain missed and false matches and their consequences", "Assess an identity service before a care coordination project", "Describe governance and consent needs for a shared index"], ["mpi", "identity", "care-coordination"]),
  ]),
  T(2, "ai-governance", "AI Governance", "The federal landscape for clinical AI, the four-stage governance lifecycle, and rural challenges with the scribe evidence.", [
    L(4, "fai-ai-regulatory-landscape", "The Federal Landscape for Clinical AI: Four Instruments, Four Statuses", 25,
      "FDA predetermined change control plans, ONC decision support transparency and the HTI-5 final rule, Section 1557 in 2026, Medicare Advantage algorithm guidance and an obligations register.",
      ["Describe four federal instruments that touch clinical AI and their verified status", "Explain what a buyer should require by contract when transparency rules change", "Build a one-page obligations register for a clinical AI tool"], ["ai-regulation", "fda", "hti-5", "section-1557"]),
    L(5, "fai-governance-lifecycle", "The Four-Stage AI Governance Lifecycle", 25,
      "Pre-deployment evaluation, implementation and training, active monitoring and vendor management, a sample monitoring plan and the platform's 62-item domain-gated checklist.",
      ["Apply the four lifecycle stages to a clinical AI tool", "Write a monitoring plan with owners and triggers", "Explain why a governance gate is evaluated by domain"], ["ai-governance", "lifecycle", "monitoring"]),
    L(6, "fai-rural-ai-and-scribes", "AI in Rural Hospitals: Three Challenges and What the Scribe Evidence Shows", 25,
      "Training data representativeness, monitoring capacity, multilingual scribes, two recent studies of ambient scribes and a measurement plan for grant-funded rollouts.",
      ["Describe the three rural AI governance challenges", "Summarize what two recent scribe studies show and their limits", "Design a measurement plan for a scribe rollout"], ["rural", "scribes", "evidence"]),
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
