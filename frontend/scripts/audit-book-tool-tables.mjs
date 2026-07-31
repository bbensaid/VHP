// Read-only: cross-check every tool named in a chapter's "Work This Chapter on
// the Platform" table against tools.ts.
//
// Catches the C-8 class of defect: a chapter features a tool that the registry
// does not map to that chapter or that pillar, so the tool is invisible in
// chapter/pillar listings even though the book sends readers to it.
//
// Usage: node scripts/audit-book-tool-tables.mjs
import { readFileSync } from "fs";

const BOOK = "/Users/baba/Vermont-Health-Platform/HTR_Book_v42.md";
const base = new URL("../", import.meta.url);

// ── tools.ts ───────────────────────────────────────────────────────────────
const toolSrc = readFileSync(new URL("lib/taxonomy/tools.ts", base), "utf8");
const tools = [];
for (const b of toolSrc.split(/\n  \{\n/).slice(1)) {
  const g = (k) => (b.match(new RegExp(k + ':\\s*"([^"]*)"')) || [])[1] ?? "";
  const arr = (k) => {
    const m = b.match(new RegExp(k + ":\\s*\\[([^\\]]*)\\]", "s"));
    return m ? m[1].replace(/["\s']/g, "").split(",").filter(Boolean) : [];
  };
  const id = g("id");
  if (id) tools.push({ id, label: g("label"), href: g("href"), pillars: arr("pillars"), chapters: arr("chapters") });
}

// ── chapters.ts: chapter -> pillar ─────────────────────────────────────────
const chSrc = readFileSync(new URL("lib/taxonomy/chapters.ts", base), "utf8");
const CH_PILLAR = {};
const chRe = /num:\s*"([^"]+)",\s*\n\s*title:\s*"[^"]+"[\s\S]*?pillar:\s*(?:"([a-z]+)"|null)/g;
let cm;
while ((cm = chRe.exec(chSrc))) CH_PILLAR[cm[1]] = cm[2] ?? null;

// ── book: chapter -> tools named in its platform table ─────────────────────
const lines = readFileSync(BOOK, "utf8").split("\n");
let current = null, inTable = false;
const byChapter = {};
for (const l of lines) {
  const h = l.match(/^# \*\*Chapter (\d+)/);
  if (h) { current = h[1]; inTable = false; continue; }
  if (!current) continue;
  if (l.includes("Work This Chapter on the Platform")) { inTable = true; continue; }
  if (inTable && l.startsWith("*Figure")) { inTable = false; continue; }
  if (inTable && l.startsWith("|")) {
    // Two forms are used in the manuscript:
    //   **Label** — `/href`                    (most chapters)
    //   **[Label](https://…/href)**            (chs 12, 14, 16)
    for (const m of l.matchAll(/\*\*([^*]+)\*\*\s*—\s*`([^`]+)`/g)) {
      (byChapter[current] ??= []).push({ label: m[1].trim(), href: m[2].trim() });
    }
    for (const m of l.matchAll(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g)) {
      (byChapter[current] ??= []).push({ label: m[1].trim(), href: m[2].trim() });
    }
  }
}

const norm = (h) => h.replace(/^https?:\/\/[^/]+/, "").trim();

// Chapter tables also point at ordinary content routes (statute pages, pillar
// overviews). Those are legitimately not in tools.ts — only flag a missing
// entry if the href looks like a Research Lab tool.
const isToolHref = (h) => /^\/(research-lab|htr-simulator|hti-dashboard|impact-simulation|investment-tracker|transformation-friction-index|medicaid-eligibility-simulator|the-wire|about\/framework)/.test(norm(h));

const problems = [];
let checked = 0;

for (const ch of Object.keys(byChapter).sort((a, b) => +a - +b)) {
  const pillar = CH_PILLAR[ch];
  for (const ref of byChapter[ch]) {
    checked++;
    const t =
      tools.find((x) => norm(x.href) === norm(ref.href)) ??
      tools.find((x) => x.label.toLowerCase() === ref.label.toLowerCase());
    if (!t) {
      if (isToolHref(ref.href)) {
        problems.push(`ch ${ch}: "${ref.label}" (${ref.href}) — NOT IN tools.ts`);
      }
      continue;
    }
    if (!t.chapters.includes(ch)) {
      problems.push(`ch ${ch}: "${t.label}" featured but tools.ts maps it to ch [${t.chapters.join(", ") || "none"}]`);
    }
    if (pillar && !t.pillars.includes(pillar)) {
      problems.push(`ch ${ch}: "${t.label}" featured in a ${pillar} chapter but tagged [${t.pillars.join(", ")}]`);
    }
  }
}

console.log(`Checked ${checked} tool references across ${Object.keys(byChapter).length} chapter tables.\n`);
if (problems.length) {
  console.log(`${problems.length} mismatch(es):\n`);
  problems.forEach((p) => console.log("  " + p));
  process.exit(1);
}
console.log("✅ Every tool named in a chapter table is mapped to that chapter and pillar.");
