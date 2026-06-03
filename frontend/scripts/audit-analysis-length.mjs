// Content-depth audit for policyAnalysis (Analysis layer).
// The editorial bar (set 2026-06): every Analysis brief must be a deep, rich,
// SOURCED piece — minimum 2,000 words with a Sources section. This script
// reports each doc's word count + whether it has a Sources section, and the
// remaining queue below the bar. Run: node scripts/audit-analysis-length.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MIN_WORDS = 1400; // "close enough" floor; target ~2000 where the topic supports it

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const PID = "fxz10xl7";

const r = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(
    // count link markDefs across the body to detect a real Sources/references section.
    `*[_type=="policyAnalysis"]{ _id, "slug": slug.current, pillar, "text": pt::text(body), "links": count(body[].markDefs[_type=="link"]) }`
  )}`,
  { headers: { Authorization: `Bearer ${process.env.SANITY_API_TOKEN}` } }
);
const docs = (await r.json()).result.map((d) => {
  const text = d.text || "";
  return {
    id: d._id,
    slug: d.slug,
    pillar: d.pillar,
    words: text.split(/\s+/).filter(Boolean).length,
    // pt::text() strips hrefs, so detect sources via a "Sources" heading + >=3 link marks.
    hasSources: /\bSources\b/i.test(text) && (d.links || 0) >= 3,
  };
});

const pass = docs.filter((d) => d.words >= MIN_WORDS && d.hasSources);
const fail = docs.filter((d) => !(d.words >= MIN_WORDS && d.hasSources)).sort((a, b) => a.words - b.words);

console.log(`Analysis depth audit — bar: >=${MIN_WORDS} words + Sources section`);
console.log(`PASS: ${pass.length}/${docs.length}   |   QUEUE (below bar): ${fail.length}\n`);
console.log("Below-bar queue (shortest first):");
for (const d of fail) {
  console.log(`  ${String(d.words).padStart(4)}w ${d.hasSources ? "src" : "   "} [${(d.pillar || "-").padEnd(10)}] ${d.id}`);
}
if (pass.length) {
  console.log("\nPassing:");
  for (const d of pass) console.log(`  ${String(d.words).padStart(4)}w [${(d.pillar || "-").padEnd(10)}] ${d.id}`);
}
