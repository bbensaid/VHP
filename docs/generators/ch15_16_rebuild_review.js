// Review document for the Chapter 15 / 16 / Appendices A-E rebuild (2026-11-25).
// Converts the two Markdown drafts in book-audit/rebuild_2026-11-25/ into the house .docx style.
// Usage (from docs/generators): node ch15_16_rebuild_review.js
const fs = require("fs");
const path = require("path");
const { Paragraph, TextRun } = require("./node_modules/docx");
const { P, H1, H2, H3, B, table, box, build, NOTE_FILL } = require("./docstyle");

const ROOT = path.resolve(__dirname, "../..");
const DIR = path.join(ROOT, "book-audit/rebuild_2026-11-25");
const NAVY = "1F3A5F";

function mdToBlocks(md) {
  const out = [];
  const lines = md.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    if (l.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i]); i++; }
      i--;
      const cells = rows.filter(r => !/^\|[\s:|-]+\|$/.test(r.trim()))
        .map(r => r.trim().replace(/^\||\|$/g, "").split("|").map(s => s.trim()));
      const head = cells[0], body = cells.slice(1);
      const n = head.length, pct = Array(n).fill(Math.floor(100 / n));
      out.push(table(head, body, pct));
      continue;
    }
    let m;
    if ((m = l.match(/^# (.*)/))) out.push(H1(m[1].replace(/\*\*/g, "")));
    else if ((m = l.match(/^## (.*)/))) out.push(H2(m[1].replace(/\*\*/g, "")));
    else if ((m = l.match(/^### (.*)/))) out.push(H3(m[1].replace(/\*\*/g, "")));
    else if ((m = l.match(/^> \*(.*)\*$/))) out.push(P(m[1], { run: { italics: true } }));
    else if ((m = l.match(/^- (.*)/))) out.push(B(m[1]));
    else if ((m = l.match(/^\d+\. (.*)/))) out.push(B(m[1]));
    else if ((m = l.match(/^\*(.*)\*$/))) out.push(P(m[1], { run: { italics: true, size: 18 } }));
    else out.push(P(l));
  }
  return out;
}

const c = [];
c.push(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: "Chapters 15–16 and Appendices A–E: Rebuild for Review", size: 34, color: NAVY, font: "Arial" })] }),
  P("**Prepared:** 25 November 2026 (revision 2), by Claude (Claude Code), for the author's review. **Nothing in this document has been written into HTR_Book_v42.docx yet.** On your go-ahead it will be applied with the usual backup, format check and render."),
  box("What this rebuild does", [
    "**Chapter 15** is replaced: the PMI material (project vs program vs portfolio, knowledge areas, predictive vs adaptive) gives way to Vermont's five reform workstreams — hospital transformation and finances, GMCB price and budget regulation, the Blueprint for Health, clinical and claims data integration, and the RHT program — and the institutions and people who carry them, drawn from the statutes, Oliver Wyman, GMCB, AHS and the State's own reports.",
    "**Chapter 16** keeps its structure and gains what it was missing: a factual fix (ADS is not an AHS program), the gap between GMCB's price regulation and AHS's transformation work, AHS's antitrust-supervision duty, the statutory reform coordinator, and the Act 119 findings on decision rights and staffing.",
    "**Appendices A, B, E** gain an execution-institutions profile, the AHS deadlines missing from the Act 68 timeline, and execution-capacity indicators. Appendix C is unchanged; Appendix D waits for the platform work.",
    "**Every fact** comes from a document opened for this work; the saved copies are in book-audit/deep/sources/statutes and /execution.",
  ], NOTE_FILL),
  H1("Part 1 — The new Chapter 15 (full text)"),
);
c.push(...mdToBlocks(fs.readFileSync(path.join(DIR, "ch15_new.md"), "utf8")));
c.push(H1("Part 2 — Chapter 16 and Appendices A–E: proposed changes"));
c.push(...mdToBlocks(fs.readFileSync(path.join(DIR, "ch16_appendices_changes.md"), "utf8").replace(/^# .*\n/, "")));

build(path.join(ROOT, "docs/HTR_Ch15-16_Appendices_Rebuild_Review_2026-11-25.docx"),
  "Chapters 15–16 and Appendices A–E: Rebuild for Review", "HTR — Ch15–16 rebuild review", c, "25 November 2026");
