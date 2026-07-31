// Read-only check for ALIGNMENT_AUDIT_FINDINGS.md C-6.
//
// FromTheBookForPillar renders two things on the same card: a chapter range
// COMPUTED from chapters.ts, and a hardcoded excerpt whose prose names chapter
// numbers by hand. Nothing keeps the two in agreement, so the card can — and
// currently does — contradict itself on every pillar page.
//
// This compares the chapter numbers cited in each excerpt against the chapters
// chapters.ts actually assigns to that pillar. Exit 1 on any mismatch.
import { readFileSync } from "fs";

const base = new URL("../", import.meta.url);
const chSrc = readFileSync(new URL("lib/taxonomy/chapters.ts", base), "utf8");
const compSrc = readFileSync(new URL("components/FromTheBookForPillar.tsx", base), "utf8");

const chRe = /num:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"[\s\S]*?pillar:\s*(?:"([a-z]+)"|null)/g;
const byPillar = {};
let m;
while ((m = chRe.exec(chSrc))) if (m[3]) (byPillar[m[3]] ??= []).push(m[1]);

const blockRe = /(\w+):\s*\{\s*title:\s*"[^"]*",\s*excerpt:\s*\n?\s*"((?:[^"\\]|\\.)*)",?\s*\},/g;
const rows = [];
let b;
while ((b = blockRe.exec(compSrc))) {
  const [, pillar, excerpt] = b;
  if (!byPillar[pillar]) continue;
  const cited = [...excerpt.matchAll(/Chapters?\s+(\d+)/g)].map((x) => x[1]);
  const truth = byPillar[pillar];
  rows.push({ pillar, cited, truth, ok: JSON.stringify(cited) === JSON.stringify(truth) });
}

if (rows.length !== 6) {
  console.error(`Parsed ${rows.length} pillar excerpts, expected 6 — parser may be stale.`);
  process.exit(1);
}

console.log("pillar      | chapters.ts | excerpt cites | verdict");
console.log("-".repeat(64));
for (const r of rows) {
  const verdict = r.ok
    ? "OK"
    : r.cited.length > r.truth.length
      ? `MISMATCH — also cites ${r.cited.length - r.truth.length} chapter(s) this pillar does not have`
      : "MISMATCH";
  console.log(
    `${r.pillar.padEnd(11)} | ${r.truth.join(", ").padEnd(11)} | ${r.cited.join(", ").padEnd(13)} | ${verdict}`
  );
}

const bad = rows.filter((r) => !r.ok);
if (bad.length) {
  console.error(
    `\n❌ ${bad.length} of 6 pillar excerpts cite chapters that disagree with chapters.ts.`
  );
  console.error("   Each renders beside a heading computed from the same taxonomy, so the");
  console.error("   card contradicts itself. See ALIGNMENT_AUDIT_FINDINGS.md C-6.");
  process.exit(1);
}
console.log("\n✅ All pillar excerpts agree with chapters.ts.");
