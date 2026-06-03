// Identify the remaining 79 briefs (excluding the top-30 already processed) and
// rank by stat density + flag fabrication-prone patterns (invented studies,
// suspiciously precise N's, HTR/our-model language).
import { readFileSync, writeFileSync } from "node:fs";
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

const scored = JSON.parse(readFileSync("/tmp/brief-scores.json", "utf8"));
const top30 = new Set(scored.slice(0, 30).map((s) => s._id));

const r = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_type=="policyAnalysis"]{ _id, title, "text": pt::text(body) }`)}`,
  { headers: { Authorization: `Bearer ${TOKEN}` } }
);
const docs = (await r.json()).result.filter((d) => !top30.has(d._id));

// fabrication-prone signals
const FAB = [
  /\bHTR\b/i,
  /\b(our|we)\s+(model|estimate|project|analy|audit|found|identif)/i,
  /\ba (20\d\d|recent) [A-Z][a-z]+ (study|report|analysis|survey) (found|shows|reveal)/, // "a 2024 Foo study found"
];
const STAT = /\d+(\.\d+)?\s?%|\$\s?\d[\d,.]*\s?(billion|million|trillion|B|M|K)?|\b\d{1,3}(,\d{3})+\b|\b\d+(\.\d+)?[-\s]?(x|fold|times)\b/gi;

const out = docs.map((d) => {
  const t = d.text || "";
  const stats = (t.match(STAT) || []).length;
  const fab = FAB.some((re) => re.test(t));
  const words = t.split(/\s+/).filter(Boolean).length;
  return { _id: d._id, title: (d.title || "").slice(0, 50), words, stats, fab };
});
out.sort((a, b) => b.stats - a.stats);
writeFileSync("/tmp/remaining79.json", JSON.stringify(out, null, 2));

console.log("remaining briefs:", out.length);
console.log("with >=3 stats:", out.filter((x) => x.stats >= 3).length, "| pure/low-stat (<3):", out.filter((x) => x.stats < 3).length);
console.log("flagged HTR/our-model/invented-study:", out.filter((x) => x.fab).length);
console.log("\n--- stat-bearing remaining briefs (stats>=3) ---");
for (const x of out.filter((x) => x.stats >= 3)) {
  console.log(`stats=${String(x.stats).padStart(3)} ${x.fab ? "FAB " : "    "} [${x._id}] ${x.title}`);
}
