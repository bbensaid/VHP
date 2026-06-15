// EMR/EHR Lab academy integration. DRY RUN unless --commit.
//
// 1. New lesson "The EHR Business Case: TCO & 5-Year ROI" in the EHR Systems &
//    Integration track (order 4): Sanity academyModule body + Supabase row.
// 2. Appends an "Apply it in the EMR/EHR Lab" callout to 4 existing lesson
//    bodies, each deep-linking to the matching tool mode.
//
// Idempotent: skips a callout if the lesson already has the "Apply it" heading;
// upserts the new lesson on (track_id, slug). Never deletes. Mirrors the
// portable-text + mutate pattern from append-vbc-sources.mjs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const env = fs.readFileSync(path.join(__dir, "../.env.local"), "utf8");
for (const l of env.split("\n")) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const PID = "fxz10xl7";
const TOKEN = process.env.SANITY_API_TOKEN;
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const COMMIT = process.argv.includes("--commit");

// ── portable-text helpers (same shape as append-vbc-sources.mjs) ──────────────
let keyc = 0;
const key = () => `e${Date.now().toString(36)}${(keyc++).toString(36)}`;
const h = (text, style = "h2") => ({ _key: key(), _type: "block", style, markDefs: [], children: [{ _key: key(), _type: "span", text, marks: [] }] });
const p = (text) => ({ _key: key(), _type: "block", style: "normal", markDefs: [], children: [{ _key: key(), _type: "span", text, marks: [] }] });
const link = (text, href) => { const mk = key(); return { _key: key(), _type: "block", style: "normal", markDefs: [{ _key: mk, _type: "link", href }], children: [{ _key: key(), _type: "span", text, marks: [mk] }] }; };

const TOOL = "/research-lab/interoperability?tab=emr";
const APPLY_HEADING = "Apply It in the EMR/EHR Lab";

// ── Part A: callouts on existing lessons ──────────────────────────────────────
const CALLOUTS = {
  "interop-ehr-market": { mode: "vendors", text: "Open the EMR/EHR Lab's Vendor Comparison and weight interoperability, usability, cost, and ambulatory fit for your own situation — watch Epic, Oracle Health, MEDITECH, and athenahealth re-rank as the priorities shift." },
  "interop-ehr-burden": { mode: "workflow", text: "Use the EMR/EHR Lab's Workflow Sim to model a clinician's daily EHR time by vendor and patient panel, then toggle scribes, ambient AI, and team-based care to see documentation burden and burnout cost fall against the ~360 min/day national benchmark." },
  "ehr-data-quality":   { mode: "quality",  text: "Audit a mock record in the EMR/EHR Lab's Data Quality mode: see how a vendor's interoperability profile drives which USCDI classes come out present and coded versus free-text." },
  "interop-uscdi":      { mode: "quality",  text: "Try the EMR/EHR Lab's Data Quality mode to audit a record against the ten USCDI classes and see how completeness and coded-rate change as data is added or left as free text." },
};

async function getDoc(id) {
  const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id=="${id}"][0]{_id,body}`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await r.json()).result;
}
async function patchBody(id, body) {
  const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations: [{ patch: { id, set: { body } } }] }),
  });
  return r.json();
}
async function createOrReplaceDoc(doc) {
  const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
  });
  return r.json();
}

console.log(`=== ${COMMIT ? "COMMIT" : "DRY RUN"} ===\n`);
console.log("Part A — callouts on existing lessons:");
for (const [id, { mode, text }] of Object.entries(CALLOUTS)) {
  const doc = await getDoc(id);
  if (!doc) { console.log(`  ${id}: MISSING — skip`); continue; }
  const body = (doc.body || []).filter((b) => b && b._type);
  if (body.some((b) => b.style === "h2" && (b.children || []).some((c) => /apply it in the emr\/ehr lab/i.test(c.text || "")))) {
    console.log(`  ${id}: already has callout — skip`); continue;
  }
  const add = [h(APPLY_HEADING, "h2"), p(text), link(`Open the EMR/EHR Lab → ${mode} mode`, `${TOOL}&mode=${mode}`)];
  if (!COMMIT) { console.log(`  ${id}: would append callout (mode=${mode})`); continue; }
  const j = await patchBody(id, [...body, ...add]);
  console.log(`  ${id}: ${j.results ? "✅ callout appended" : "ERR " + JSON.stringify(j)}`);
}

// ── Part B: new ROI lesson ────────────────────────────────────────────────────
const NEW_SLUG = "ehr-business-case-roi";
const TRACK_SLUG = "ehr-integration";
const NEW_BODY = [
  p("Choosing and adopting an EHR is one of the largest capital and operational decisions a health system makes — and the business case is notoriously hard to build. The benefits are diffuse and delayed; the costs are concentrated and immediate. This module breaks the decision into the numbers that actually drive it: total cost of ownership, the go-live productivity dip, and the multi-year return."),
  h("Why the EHR business case is hard", "h2"),
  p("Unlike a piece of revenue-generating equipment, an EHR's return shows up indirectly — through better coding capture, fewer duplicate orders, reduced transcription, and downstream quality incentives — and it shows up over years, not quarters. Meanwhile the costs hit all at once: licensing, implementation, hardware or cloud subscription, training, and a temporary drop in clinical throughput during go-live. A credible business case has to make those diffuse benefits explicit and time-phased."),
  h("The cost components", "h2"),
  p("Total cost of ownership has four parts. (1) Implementation — configuration, data migration, interface build, and vendor professional services, typically the largest one-time line. (2) Licensing or subscription — per-provider annual cost, higher for on-premise capex-heavy models, recurring for cloud/SaaS. (3) Training — scaled to headcount and to how long the rollout runs. (4) The go-live productivity loss — see below. Hosting model (cloud, on-premise, or hybrid) shifts the balance between upfront capex and recurring opex."),
  h("The go-live productivity dip", "h2"),
  p("During the weeks around go-live, clinicians see fewer patients while they learn the system. A common planning assumption is a peak dip of around 25% in the first weeks, recovering to baseline over the rollout window. That lost clinical revenue is a real cost of adoption — often underestimated — and it scales with both the number of providers and the length of the go-live."),
  h("Modeling five-year ROI and break-even", "h2"),
  p("A defensible model phases the benefit stream: little to no benefit in year one (while the organization is still climbing the learning curve), ramping to a steady state — frequently modeled as a few percent of clinical revenue — by year two or three. Subtract annual cost from annual benefit, accumulate, and find the year the cumulative net turns positive. That break-even year, not the sticker price, is the number executives should anchor on."),
  h("What to take away", "h2"),
  p("The EHR decision is a financial model, not just a feature comparison. Vendor choice and hosting model change the cost profile; the go-live plan changes the productivity loss; and the benefit assumptions determine whether — and when — the investment pays back. Build the model explicitly, stress-test the assumptions, and revisit the hosting and timeline levers before signing."),
  h(APPLY_HEADING, "h2"),
  p("Build this exact model in the EMR/EHR Lab's Adoption & Cost mode: set provider count, timeline, hosting, and revenue per provider, pick a vendor, and read off the five-year cost-versus-benefit table and the modeled break-even year."),
  link("Open the EMR/EHR Lab → Adoption & Cost mode", `${TOOL}&mode=cost`),
];

const newDoc = {
  _id: NEW_SLUG,
  _type: "academyModule",
  title: "The EHR Business Case: Total Cost of Ownership & 5-Year ROI",
  slug: { _type: "slug", current: NEW_SLUG },
  courseTitle: "Healthcare Interoperability & Data Exchange",
  moduleNumber: 4,
  pillar: "Technology",
  level: "Intermediate",
  estimatedReadTime: 20,
  summary: "Build the business case for an EHR: total cost of ownership, the go-live productivity dip, and a five-year ROI model with break-even. Complements the EHR market and burden modules with the financial decision they leave out.",
  learningObjectives: [
    "Break down EHR total cost of ownership: implementation, licensing, training, and go-live productivity loss",
    "Explain and quantify the go-live productivity dip",
    "Model a phased five-year benefit stream and identify the break-even year",
    "Relate hosting model and vendor choice to the financial profile",
  ],
  body: NEW_BODY,
  publishedAt: new Date().toISOString(),
};

const NEW_LESSON = {
  slug: NEW_SLUG,
  sanity_slug: NEW_SLUG,
  title: newDoc.title,
  summary: newDoc.summary,
  pillar: "technology",
  estimated_minutes: 20,
  objectives: newDoc.learningObjectives.map((text, i) => ({ id: `o${i + 1}`, text })),
};

console.log("\nPart B — new ROI lesson:");
const { data: track } = await db.from("tracks").select("id,title,course_id").eq("slug", TRACK_SLUG).single();
const { data: existing } = await db.from("lessons").select("slug,order").eq("track_id", track.id).order("order");
const maxOrder = Math.max(0, ...existing.map((l) => l.order || 0));
const order = (existing.find((l) => l.slug === NEW_SLUG)?.order) ?? maxOrder + 1;
console.log(`  Track "${track.title}" has ${existing.length} lessons; new lesson goes to order ${order} (already present: ${!!existing.find((l) => l.slug === NEW_SLUG)})`);

if (!COMMIT) {
  console.log(`  Would createOrReplace Sanity doc "${NEW_SLUG}" (${NEW_BODY.length} blocks) + upsert Supabase lesson row.`);
  console.log("\nDRY RUN complete — re-run with --commit.");
  process.exit(0);
}

const sj = await createOrReplaceDoc(newDoc);
console.log(`  Sanity doc: ${sj.results ? "✅ created" : "ERR " + JSON.stringify(sj)}`);

const { error } = await db.from("lessons").upsert({
  track_id: track.id, pillar: NEW_LESSON.pillar, order, slug: NEW_LESSON.slug, title: NEW_LESSON.title,
  summary: NEW_LESSON.summary, estimated_minutes: NEW_LESSON.estimated_minutes, objectives: NEW_LESSON.objectives,
  content_blocks: [], tags: ["ehr", "business-case", "roi", "adoption"], related_lesson_ids: [],
  is_published: true, sanity_slug: NEW_LESSON.sanity_slug,
}, { onConflict: "track_id,slug" });
console.log(`  Supabase row: ${error ? "ERR " + error.message : "✅ upserted"}`);
