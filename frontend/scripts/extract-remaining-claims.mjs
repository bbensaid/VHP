import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const rem = JSON.parse(readFileSync("/tmp/remaining79.json", "utf8")).filter((x) => x.stats >= 3).map((x) => x._id);
const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id in $ids]{ _id, title, body }`)}&%24ids=${encodeURIComponent(JSON.stringify(rem))}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
const docs = (await r.json()).result;
const statRe = /[^.!?]*?(\$\s?\d[\d,.]*\s?(?:billion|million|trillion|B\b|M\b|K\b)?|\d+(?:\.\d+)?\s?%|\b\d+(?:\.\d+)?[-\s]?(?:x|fold|times)\b|\b\d{1,3}(?:,\d{3})+\b)[^.!?]*[.!?]/gi;
let out = "";
for (const d of docs) {
  out += `\n### ${d._id} — ${d.title}\n`;
  for (const b of d.body || []) {
    if (b._type !== "block") continue;
    const t = (b.children || []).map((c) => c.text).join("");
    const s = [...new Set(t.match(statRe) || [])].map((x) => x.trim().replace(/\s+/g, " "));
    for (const x of s) out += `  {${b._key}} ${x}\n`;
  }
}
writeFileSync("/tmp/remaining-claims.md", out);
console.log("wrote /tmp/remaining-claims.md —", docs.length, "docs,", out.length, "chars");
