// policyAnalysis cleanup (ecosystem audit — PLAN_SANITY_ECOSYSTEM.md):
//   1. Normalize non-canonical `pillar` values to the 6 canonical labels.
//   2. Delete confirmed junk: a DEBUG test doc, a truncated v2 stub, and
//      draft-shadow docs that have a published twin (the draft is redundant).
// Draft docs WITHOUT a published twin are intentionally left untouched.
// Bodies are backed up in /sanity-backups/. DRY RUN unless --commit.
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

// 1. Pillar normalization: id -> canonical label.
const PILLAR_FIX = {
  "clinical-rpm-rural-primary-care": "Clinical",          // was CLINICAL
  "equity-broadband-digital-determinants": "Equity",      // was EQUITY
  "tech-vhie-data-liquidity-fabric": "Technology",        // was TECHNOLOGY
  "alzheimers-drug-pipeline-costs": "Clinical",           // was Science
  "optimizing-care-maximizing-health-manifesto": "Economics", // was Innovation
};

// 2. Confirmed deletes (verified by body inspection / published-twin check).
const DELETE_IDS = [
  "debug-video-test",                                  // DEBUG test doc
  "the-triple-threat-v2",                              // 269-char truncated stub of the full essay
  "drafts.precision-medicine-clinical-scaling",        // draft shadow; published twin exists
  "drafts.technical-deflation-vermont-policy-2026-croftc1", // draft shadow; published twin exists
  "drafts.uninhabitable-math-vermont-healthcare-cliff",     // draft shadow; published twin exists
  // NOTE: drafts.strategic-implementation-rpm-vermont-rural-health has NO published
  // twin — deliberately NOT deleted (would lose content).
];

const mutations = [
  ...Object.entries(PILLAR_FIX).map(([id, pillar]) => ({
    patch: { id, set: { pillar } },
  })),
  ...DELETE_IDS.map((id) => ({ delete: { id } })),
];

console.log("Pillar normalizations:");
for (const [id, p] of Object.entries(PILLAR_FIX)) console.log(`   ${id.padEnd(48)} -> ${p}`);
console.log("\nDeletes:");
for (const id of DELETE_IDS) console.log(`   ${id}`);

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
console.log(`\n✅ Applied ${mutations.length} mutations (${Object.keys(PILLAR_FIX).length} patches, ${DELETE_IDS.length} deletes).`);
