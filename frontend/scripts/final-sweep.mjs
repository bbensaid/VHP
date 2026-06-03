import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_type=="policyAnalysis"]{ _id, "t": pt::text(body) }`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
const docs = (await r.json()).result;
const markers = [
  /An HTR audit/i, /HTR['’]s own modeling/i, /An HTR (financial )?model/i, /HTR['’]s (fiscal|regulatory) /i,
  /our ACO network/i, /We modeled the impact/i,
  /555%/, /94% of U\.?S\.? pharmacies/i, /\$14\.1B over 10 years/, /grown 340%/,
  /legally in effect beginning/i, /23\.8 per 100,000/, /52 million visits per week/,
];
let total = 0;
for (const d of docs) for (const m of markers) if (m.test(d.t || "")) { console.log("STILL PRESENT:", m, "in", d._id); total++; }
console.log(total === 0 ? "\n✓ all targeted fabrication markers cleared across 109 briefs" : `\n✗ ${total} remaining`);
const htr = docs.filter((d) => /\bHTR\b/.test(d.t || "")).map((d) => d._id);
console.log("briefs still literally mentioning 'HTR':", htr.length, htr.join(", ") || "none");
