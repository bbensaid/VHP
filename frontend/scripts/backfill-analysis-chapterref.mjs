// Phase 2 (PLAN_SANITY_ECOSYSTEM.md §6/§7): backfill policyAnalysis.chapterRef
// by pillar -> the pillar's LEAD book chapter. Crude-but-reversible default;
// refine per-doc later. Only sets chapterRef where it is currently unset, so
// re-runs are idempotent and never clobber a hand-curated value.
// DRY RUN unless --commit.
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

// Pillar (canonical label used in Sanity) -> lead chapter "num" from chapters.ts.
// Mirrors the course->chapter lead-chapter choices in §6 / migration 033.
const LEAD_CHAPTER = {
  Policy:     "5",
  Economics:  "8",
  Technology: "6",
  Clinical:   "10",
  Equity:     "12",
  Operations: "14",
};

async function groq(query) {
  const r = await fetch(
    `https://${PID}.apicdn.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const j = await r.json();
  if (!r.ok) { console.error("GROQ failed:", JSON.stringify(j)); process.exit(1); }
  return j.result;
}

// Only docs that don't already have a chapterRef.
const docs = await groq(`*[_type=="policyAnalysis" && !defined(chapterRef)]{ _id, pillar }`);

const mutations = [];
const skipped = [];
for (const d of docs) {
  const ch = LEAD_CHAPTER[d.pillar];
  if (!ch) { skipped.push(d); continue; }
  mutations.push({ patch: { id: d._id, set: { chapterRef: ch } } });
}

const byCh = {};
for (const m of mutations) byCh[m.patch.set.chapterRef] = (byCh[m.patch.set.chapterRef] || 0) + 1;
console.log(`policyAnalysis missing chapterRef: ${docs.length}`);
console.log("Planned sets by chapter:", JSON.stringify(byCh));
if (skipped.length) console.log(`Skipped (unknown/empty pillar): ${skipped.length} -> ${skipped.map((s) => s._id).join(", ")}`);

if (!COMMIT) {
  console.log("\nDRY RUN — re-run with --commit to apply.");
  process.exit(0);
}

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
console.log(`\n✅ Applied ${mutations.length} chapterRef patches.`);
