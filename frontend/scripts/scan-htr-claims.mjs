// Scan all 109 policyAnalysis briefs for HTR self-attributed / unverifiable
// stat claims. Backs up all bodies, then writes a candidate list to /tmp.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
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

const r = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_type=="policyAnalysis"]{ _id, title, body }`)}`,
  { headers: { Authorization: `Bearer ${TOKEN}` } }
);
const docs = (await r.json()).result;

const backupDir = join(__dir, "../../sanity-backups");
if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });
const backupPath = join(backupDir, `backup-all-briefs-${Date.now()}.json`);
writeFileSync(backupPath, JSON.stringify(docs, null, 2));

// HTR self-attribution: house modeling/analysis/audit/estimate/projection presented
// as data, and first-person "our/we" analytic claims.
const HTR_SELF = /\bHTR['’]?s?\b[^.]{0,90}\b(model|modeling|analysis|analy[sz]|audit|estimat|projec|fiscal|regulatory|intelligence|assess|advisory|forecast|unit|team)/i;
const FIRST_PERSON = /\b(our|we)\s+(model|estimate[ds]?|project|analy[sz]|audit|identif|forecast|assess)/i;
const HTR_MENTION = /\bHTR\b/;

const hits = [];
for (const d of docs) {
  (d.body || []).forEach((b, i) => {
    if (b._type !== "block") return;
    const t = (b.children || []).map((c) => c.text).join("");
    const self = HTR_SELF.test(t) || FIRST_PERSON.test(t);
    const mention = HTR_MENTION.test(t);
    if (self || mention) {
      hits.push({ id: d._id, key: b._key, idx: i, self, mention, text: t });
    }
  });
}

writeFileSync("/tmp/htr-hits.json", JSON.stringify(hits, null, 2));
console.log("briefs:", docs.length, "| backup:", backupPath.replace(/.*sanity-backups/, "sanity-backups"));
console.log("blocks mentioning HTR:", hits.length, "| of which self-attributed claims:", hits.filter((h) => h.self).length);
console.log("\n--- HTR self-attributed claim blocks ---");
for (const h of hits.filter((x) => x.self)) {
  console.log(`\n[${h.id}] {${h.key}}\n  ${h.text.slice(0, 240)}`);
}
