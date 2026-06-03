// Extract every stat-bearing sentence from the 51 low-stat (<3) remaining briefs,
// so each numeric claim can be verified or cut.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";

const rem = JSON.parse(readFileSync("/tmp/remaining79.json", "utf8")).filter((x) => x.stats < 3).map((x) => x._id);
const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id in $ids]{ _id, title, body }`)}&%24ids=${encodeURIComponent(JSON.stringify(rem))}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
const docs = (await r.json()).result;
// any sentence containing a digit (catch all stray numbers, not just %/$)
const numRe = /[^.!?]*\d[^.!?]*[.!?]/g;
let out = "";
let count = 0;
for (const d of docs) {
  const lines = [];
  for (const b of d.body || []) {
    if (b._type !== "block") continue;
    const t = (b.children || []).map((c) => c.text).join("");
    const s = (t.match(numRe) || []).map((x) => x.trim().replace(/\s+/g, " "))
      // skip pure citation years / section numbers with no real claim
      .filter((x) => /\d/.test(x) && x.length > 15);
    for (const x of s) { lines.push(`  {${b._key}} ${x}`); count++; }
  }
  if (lines.length) { out += `\n### ${d._id} — ${(d.title || "").slice(0, 50)}\n` + lines.join("\n") + "\n"; }
}
writeFileSync("/tmp/low51-claims.md", out);
console.log(`${rem.length} low-stat briefs scanned; ${count} number-bearing sentences across ${out.split("###").length - 1} docs -> /tmp/low51-claims.md`);
