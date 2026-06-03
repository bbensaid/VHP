// Phase 3 (PLAN_SANITY_ECOSYSTEM.md §8): backfill pillar + chapterRef on the
// supporting editorial types.
//   - caseStudy, webinar: already have a pillar -> set chapterRef = pillar lead.
//   - report, analystNote: assign pillar explicitly (below) -> then lead chapter.
// instructor docs are people (reference data) -> intentionally LEFT untouched.
// Idempotent: only sets fields that are currently unset. DRY RUN unless --commit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const TOKEN = process.env.SANITY_API_TOKEN;
const PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

const LEAD_CHAPTER = {
  Policy: "5", Economics: "8", Technology: "6", Clinical: "10", Equity: "12", Operations: "14",
};

// Explicit pillar assignments for the types that lack a pillar.
// report — by title; analystNote — by content (classified by hand).
const PILLAR_ASSIGN = {
  // report
  "Direct-to-Employer Contracting Playbook": "Economics",
  "The 2026 CMS Fee Schedule Forecast": "Economics",   // confirmed: payment-rate angle
  "The State of Health AI 2025": "Technology",
  "Vermont Health System Solvency Audit": "Economics",
  // analystNote (keyed by _id since titles are absent)
  "analystNote-001": "Economics",   // MA margins / HCC recalibration
  "analystNote-002": "Clinical",    // SEP-1 quality measure / mortality
  "analystNote-003": "Operations",  // travel RN rates / staffing
  "analystNote-004": "Technology",  // ambient AI documentation errors
  "analystNote-005": "Policy",      // Act 167 / CMS 1115 waiver
};

async function groq(query) {
  const r = await fetch(
    `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const j = await r.json();
  if (!r.ok) { console.error("GROQ failed:", JSON.stringify(j)); process.exit(1); }
  return j.result;
}

const docs = await groq(
  `*[_type in ["caseStudy","webinar","report","analystNote"]]{ _id, _type, title, pillar, chapterRef }`
);

const mutations = [];
const log = [];
for (const d of docs) {
  // Resolve pillar: existing, else explicit assignment by title or _id.
  const pillar = d.pillar || PILLAR_ASSIGN[d.title] || PILLAR_ASSIGN[d._id];
  if (!pillar) { log.push(`SKIP (no pillar) ${d._type} ${d._id}`); continue; }

  const set = {};
  if (!d.pillar) set.pillar = pillar;
  if (!d.chapterRef && LEAD_CHAPTER[pillar]) set.chapterRef = LEAD_CHAPTER[pillar];
  if (Object.keys(set).length === 0) { log.push(`OK (already set) ${d._type} ${d._id}`); continue; }

  mutations.push({ patch: { id: d._id, set } });
  log.push(`SET ${d._type.padEnd(11)} ${(d.title ?? d._id).slice(0, 44).padEnd(44)} ${JSON.stringify(set)}`);
}

console.log(log.join("\n"));
console.log(`\n${mutations.length} patches across ${docs.length} editorial docs.`);

if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit to apply."); process.exit(0); }

const res = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  }
);
const out = await res.json();
if (!res.ok) { console.error("Sanity mutate FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`\n✅ Applied ${mutations.length} patches.`);
