import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const DONE = ["policyAnalysis-pol-002", "policyAnalysis-clin-001", "policyAnalysis-equ-003", "vbc-fundamentals-module-4-technology-pillar"];
const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_type=="policyAnalysis"]{ _id, title, pillar, category, "slug": slug.current, summary, "text": pt::text(body) } | order(pillar asc)`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
const docs = (await r.json()).result
  .filter((d) => !DONE.includes(d._id))
  .map((d) => ({ id: d._id, title: d.title || "(untitled)", pillar: d.pillar || "-", category: d.category || "", slug: d.slug || "", words: (d.text || "").split(/\s+/).filter(Boolean).length, snippet: (d.text || "").slice(0, 110).replace(/\s+/g, " ") }));
// write machine-readable
writeFileSync("/tmp/queue.json", JSON.stringify(docs, null, 2));
// print grouped by pillar
const byPillar = {};
for (const d of docs) (byPillar[d.pillar] ??= []).push(d);
for (const pil of Object.keys(byPillar).sort()) {
  console.log(`\n===== ${pil} (${byPillar[pil].length}) =====`);
  for (const d of byPillar[pil].sort((a, b) => a.words - b.words)) {
    console.log(`${String(d.words).padStart(4)}w | ${d.id}`);
    console.log(`       title: ${d.title.slice(0, 70)}`);
    console.log(`       snip:  ${d.snippet}`);
  }
}
console.log(`\nTOTAL queue: ${docs.length}`);
