// Master documentation set, 23 Nov 2026. Consolidates the three 14 Nov guides, Addenda 1-3 and the Academy work of 23 Nov.
// Run from docs/generators (needs ./node_modules/docx):  node master_docs.js ../HTR_Master_Documentation_2026-11-23.docx
const fs = require("fs");
const path = require("path");
const { Paragraph, TextRun } = require("./node_modules/docx");
const H = require("./docstyle");
const { P, box, gap, build, OK_FILL } = H;
const NAVY = "1F3A5F";
const D = JSON.parse(fs.readFileSync(path.join(__dirname, "data/inventory_2026-11-23.json"), "utf8"));
const c = [];
const add = (...x) => c.push(...x.flat());
const ctx = { D, S: D.supabase, T: D.supabase.totals, SC: D.sanity_counts, H, add };

add(
  new Paragraph({ spacing: { before: 400, after: 160 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 280 }, children: [new TextRun({ text: "Master Documentation Set", size: 36, color: NAVY, font: "Arial" })] }),
  P("One consolidated, current reference for the whole HTR ecosystem: the four domains, the book, the Academy, the platform and its tools, the AI Analyst, the content inventory, user and administrator guides, technical documentation, infrastructure and costs, content production, and what is still open."),
  P("**Prepared:** 23 November 2026, by Claude (Claude Code), for Bechir Ben Said. It is the single place to start; the three guides of 14 November and Addenda 1–3 stay on file as detailed references (Section 13). Counts were read from the live Supabase and Sanity accounts and from the code on 23 November, and the AI server and all four domains were tested live the same day. Facts that only an account login can show (Vercel plan, invoices, Workspace billing) are carried forward from the date given and marked."),
  box("In short", [
    `**The ecosystem today:** ${ctx.T.courses} Academy courses · ${ctx.T.tracks} tracks · ${ctx.T.lessons} lessons (every lesson published, every lesson with a full Sanity body) · 45 registered tools · 198 website pages · a ${ctx.S.t_data_rag_documents.toLocaleString("en-US")}-passage AI library · the book (Preface, Introduction, 16 chapters, Conclusion, Appendices A–H).`,
    "**Since 14 November:** one Workspace inbox for all four domains; Sanity connected to the AI Analyst; the old Academy content retired; the RHT Program Review (50 states) and Year 2 awards; the Medicare for All hub, modeler and course; and on 23 November five new courses plus two expanded ones (roadmap items #3–#8 complete).",
    "**Running cost:** about $40–45 a month plus one Google Workspace user (unchanged; invoices not re-read).",
    "**Needs you:** Section 11.5. The most time-sensitive item is healthtransformationreview.com, which expires 29 December 2026 (auto-renew was OFF on 14 November).",
  ], OK_FILL),
  gap(),
  P("**Contents:** 1 The ecosystem · 2 The four domains · 3 The book · 4 The Academy · 5 The platform and tools · 6 Content inventory · 7 The AI Analyst · 8 User guide · 9 Administrator and operations guide · 10 Technical documentation · 11 Infrastructure, costs and open items · 12 Content production · 13 Document index and glossary"),
);

require("./master_a")(ctx);
require("./master_b")(ctx);
require("./master_c")(ctx);

const out = process.argv[2] || "../HTR_Master_Documentation_2026-11-23.docx";
build(out, "HTR Master Documentation Set", "HTR Master Documentation", c, "23 November 2026");
