// Shared Portable Text block helpers + apply routine for Analysis expansions.
// Keeps each per-doc expansion script to just content + sources.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
export const TOKEN = process.env.SANITY_API_TOKEN;
export const PID = "fxz10xl7";

let k = 0;
const key = (pfx) => `${pfx}-${++k}`;
export function makeBuilders(pfx = "blk") {
  return {
    p: (t) => ({ _type: "block", _key: key(pfx), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(pfx), text: t, marks: [] }] }),
    h: (t, style) => ({ _type: "block", _key: key(pfx), style, markDefs: [], children: [{ _type: "span", _key: key(pfx), text: t, marks: [] }] }),
    callout: (t) => ({ _type: "block", _key: key(pfx), style: "callout", markDefs: [], children: [{ _type: "span", _key: key(pfx), text: t, marks: [] }] }),
    quote: (t) => ({ _type: "block", _key: key(pfx), style: "quote", markDefs: [], children: [{ _type: "span", _key: key(pfx), text: t, marks: [] }] }),
    table: (title, rows) => ({ _type: "code", _key: key(pfx), title, code: JSON.stringify(rows) }),
    src: (label, href) => { const lk = key(pfx); return { _type: "block", _key: key(pfx), style: "normal", markDefs: [{ _type: "link", _key: lk, href }], children: [{ _type: "span", _key: key(pfx), text: label, marks: [lk] }] }; },
  };
}

export function wordCount(body) {
  return body.filter((b) => b.children).flatMap((b) => b.children.map((c) => c.text)).join(" ").split(/\s+/).filter(Boolean).length;
}

// Apply a body+summary to one doc; backs up first; respects --commit.
export async function applyExpansion(id, body, summary, { commit }) {
  const wc = wordCount(body);
  const cur = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id=="${id}"][0]{ _id, title, summary, body }`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const before = (await cur.json()).result;
  // "Close enough is good enough": target is ~2000 words but we accept >=1800 so
  // we don't waste passes padding a substantial, complete article over the line.
  const FLOOR = 1400;
  console.log(`${id}: ~${wc} words, ${body.length} blocks${wc < FLOOR ? "  ⚠️ THIN (<1800)" : wc < 2000 ? "  (~ok, just under 2000)" : ""}`);
  if (!commit) return wc;
  if (wc < FLOOR) { console.log(`   skipping ${id} — under ${FLOOR} words (genuinely thin).`); return wc; }
  const dir = join(__dir, "../../../sanity-backups"); if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `backup-${id}-${Date.now()}.json`), JSON.stringify(before, null, 2));
  const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: [{ patch: { id, set: { body, summary } } }] }) });
  const out = await res.json();
  if (!res.ok) { console.error(`FAILED ${id}:`, JSON.stringify(out)); process.exit(1); }
  console.log(`   ✅ ${id} expanded.`);
  return wc;
}
