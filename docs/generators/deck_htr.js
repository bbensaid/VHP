// HTR ecosystem presentation deck (partners / clients / employees). Numbers come from data/inventory_2026-11-23.json and data/taxonomy_2026-11-23.json.
// Needs pptxgenjs, react-icons, react, react-dom, sharp (NODE_PATH may point at a scratch install).
// Run: NODE_PATH=<dir with node_modules> node deck_htr.js ../HTR_Ecosystem_Deck_2026-11-23.pptx
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require("/Users/baba/.claude/skills/synced/35695cc5-252a-4914-84f5-86b3f4a5e7b5_afd6a1c3-8d71-4eab-b8af-a5f29b5e7535/pptx/scripts/apply_theme.js");

const INV = JSON.parse(fs.readFileSync(path.join(__dirname, "data/inventory_2026-11-23.json"), "utf8"));
const TAX = JSON.parse(fs.readFileSync(path.join(__dirname, "data/taxonomy_2026-11-23.json"), "utf8"));
const S = INV.supabase, T = S.totals;
const tool = Object.fromEntries(TAX.tools.map(t => [t.id, t]));

const THEME = {
  name: "HTR Ecosystem", headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: { dk1: "1A2B44", lt1: "FFFFFF", dk2: "14304F", lt2: "EDF2F8", accent1: "1C9C8C", accent2: "D9A21B", accent3: "3B6FB6", accent4: "C8553D", accent5: "6B5CA5", accent6: "4E9F50", hlink: "1C6FB6", folHlink: "6B5CA5" },
};
const HEX = { policy: "3B6FB6", technology: "1C9C8C", economics: "D9A21B", clinical: "C8553D", operations: "6B5CA5", equity: "4E9F50" };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.title = "Health Transformation Review: the HTR ecosystem";
pres.author = "Health Transformation Review";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const PC = { policy: C.accent3, technology: C.accent1, economics: C.accent2, clinical: C.accent4, operations: C.accent5, equity: C.accent6 };

pres.defineSlideMaster({
  title: "TITLE", background: { color: C.text2 },
  objects: [{ placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.9, w: 6.2, h: 1.9, fontSize: 36, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } }],
});
pres.defineSlideMaster({
  title: "CONTENT", background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 32, bold: true, color: C.text2, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { text: { text: "Health Transformation Review", options: { x: 0.5, y: 5.2, w: 4, h: 0.3, fontSize: 10, color: C.text1, margin: 0 } } },
  ],
  slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 10, color: C.text1 },
});
pres.defineSlideMaster({
  title: "DARK", background: { color: C.text2 },
  objects: [{ placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.4, w: 8.8, h: 0.9, fontSize: 34, bold: true, color: C.background1, valign: "middle", align: "left", margin: 0 }, text: "" } }],
});

async function icon(name, color = "FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[name], { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const shadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.12 });
let n = 0;
const nm = s => `${s}-${++n}`;

// circle with icon
async function badge(slide, x, y, d, fillColor, iconName) {
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fillColor }, line: { color: fillColor, width: 0 }, objectName: nm("badge") });
  const pad = d * 0.26;
  slide.addImage({ data: await icon(iconName), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, objectName: nm("icon"), altText: iconName });
}
function card(slide, x, y, w, h, fill = C.lt2 === undefined ? C.background2 : C.background2) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: fill, width: 0 }, shadow: shadow(), objectName: nm("card") });
}
const T_ = (slide, text, o) => slide.addText(text, Object.assign({ isTextBox: true, margin: 0, color: C.text1 }, o));

(async () => {
  // ───────────── 1 Title
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
  s.addText("Health Transformation Review", { placeholder: "title" });
  T_(s, "One framework for transforming a state health system, delivered four ways: book, Academy, platform and AI Analyst", { x: 0.6, y: 3.1, w: 5.8, h: 1.3, fontSize: 18, color: C.background2, valign: "top" });
  T_(s, "Partner, client and team briefing  |  23 November 2026", { x: 0.6, y: 4.85, w: 6, h: 0.3, fontSize: 12, color: C.background2 });
  const labels = [["P", "policy", "Policy"], ["T", "technology", "Technology"], ["E", "economics", "Economics"], ["C", "clinical", "Clinical"], ["O", "operations", "Operations"]];
  labels.forEach((l, i) => {
    const y = 0.75 + i * 0.78;
    s.addShape(pres.ShapeType.ellipse, { x: 7.2, y, w: 0.62, h: 0.62, fill: { color: PC[l[1]] }, line: { color: PC[l[1]], width: 0 }, objectName: nm("pillar-dot") });
    T_(s, l[0], { x: 7.2, y, w: 0.62, h: 0.62, fontSize: 20, bold: true, color: C.background1, align: "center", valign: "middle" });
    T_(s, l[2], { x: 8.0, y, w: 1.7, h: 0.62, fontSize: 16, color: C.background1, valign: "middle" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 7.2, y: 4.75, w: 2.5, h: 0.45, rectRadius: 0.2, fill: { color: C.accent6 }, line: { color: C.accent6, width: 0 }, objectName: nm("equity-pill") });
  T_(s, "Equity Imperative, across all five", { x: 7.2, y: 4.75, w: 2.5, h: 0.45, fontSize: 12, bold: true, color: C.background1, align: "center", valign: "middle" });
  s.addNotes("Open with the idea, not the product. HTR is one framework (five pillars, executed in sequence, held to an Equity Imperative) delivered as a book, an Academy, a platform of tools and an AI Analyst. Vermont is the worked example because it has mandated payment reform on a statutory timeline. Say who is in the room and what you want them to take away: a clear picture of the four parts and one thing they could try this week.");

  // ───────────── 2 Framework
  pres.addSection({ title: "The idea" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The idea" });
  s.addText("Reform fails when pillars run out of order", { placeholder: "title" });
  const pn = [["policy", "Policy", "Authority and mandate"], ["technology", "Technology", "Information"], ["economics", "Economics", "Payment and capital"], ["clinical", "Clinical", "Care delivery"], ["operations", "Operations", "Execution capacity"]];
  pn.forEach((p, i) => {
    const x = 0.55 + i * 1.8;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.35, y: 1.5, w: 0.9, h: 0.9, fill: { color: PC[p[0]] }, line: { color: PC[p[0]], width: 0 }, objectName: nm("pillar-circle") });
    T_(s, String(i + 1), { x: x + 0.35, y: 1.5, w: 0.9, h: 0.9, fontSize: 28, bold: true, color: C.background1, align: "center", valign: "middle" });
    T_(s, p[1], { x, y: 2.5, w: 1.6, h: 0.35, fontSize: 18, bold: true, color: C.text2, align: "center" });
    T_(s, p[2], { x, y: 2.85, w: 1.6, h: 0.5, fontSize: 13, align: "center", valign: "top" });
    if (i < 4) s.addShape(pres.ShapeType.rightArrow, { x: x + 1.42, y: 1.8, w: 0.4, h: 0.3, fill: { color: C.text2 }, line: { color: C.text2, width: 0 }, objectName: nm("arrow") });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.55, y: 3.55, w: 8.9, h: 0.5, rectRadius: 0.2, fill: { color: C.accent6 }, line: { color: C.accent6, width: 0 }, objectName: nm("equity-band") });
  T_(s, "Equity Imperative: a lens applied to every pillar, not a sixth pillar", { x: 0.55, y: 3.55, w: 8.9, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle" });
  T_(s, "Each pillar issues something the next depends on. Fund Technology before Policy has delivered authority, or Clinical before Economics has delivered payment, and money is spent without producing change. Vermont is the worked example; the method travels.", { x: 0.55, y: 4.25, w: 8.9, h: 0.85, fontSize: 14, valign: "top" });
  s.addNotes("This is the core argument of the book. Policy issues authority, Technology issues information, Economics issues payment and capital, Clinical delivers care, Operations supplies execution capacity. Each depends on what the upstream pillar delivers. Equity is applied across all five. The platform turns this claim into something testable: later slides show the sequencing checks.");

  // ───────────── 3 Four components
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The idea" });
  s.addText("One framework, four ways to use it", { placeholder: "title" });
  const comps = [
    ["FaBook", C.accent3, "The book", "The full argument: Preface, Introduction, 16 chapters, Conclusion and Appendices A to H. Web reader, PDF and 18 audio narrations."],
    ["FaGraduationCap", C.accent1, "The Academy", `${T.courses} courses, ${T.tracks} tracks and ${T.lessons} lessons, each with objectives, takeaways, a knowledge check and sources.`],
    ["FaTools", C.accent2, "The platform", "45 tools, 73 policy analyses, live headlines, a 50-state dashboard and the Rural Health Transformation review."],
    ["FaRobot", C.accent5, "The AI Analyst", `Answers from the whole library (${S.t_data_rag_documents.toLocaleString("en-US")} passages) and shows its sources.`],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.95;
    card(s, x, y, 4.4, 1.75);
    await badge(s, x + 0.2, y + 0.25, 0.7, comps[i][1], comps[i][0]);
    T_(s, comps[i][2], { x: x + 1.1, y: y + 0.2, w: 3.1, h: 0.4, fontSize: 20, bold: true, color: C.text2 });
    T_(s, comps[i][3], { x: x + 1.1, y: y + 0.65, w: 3.1, h: 1.0, fontSize: 13, valign: "top" });
  }
  s.addNotes("Four ways in, one framework. Each part links to the others: every book chapter ends by naming the tools and courses to use; each course shows its chapter; the tools carry chapter tags; the AI Analyst answers from all of them and cites sources. Someone can start anywhere.");

  // ───────────── 4 Numbers
  pres.addSection({ title: "What is inside" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What is inside" });
  s.addText("What exists today, in numbers", { placeholder: "title" });
  const stats = [[String(T.courses), "Academy courses"], [String(T.lessons), "Published lessons, each with sources"], ["45", "Registered tools"], ["73", "Policy analyses"], [S.t_data_rag_documents.toLocaleString("en-US"), "AI library passages"], ["16", "Book chapters, plus 8 appendices"]];
  stats.forEach((st, i) => {
    const x = 0.5 + (i % 3) * 3.05, y = 1.35 + Math.floor(i / 3) * 1.85;
    card(s, x, y, 2.85, 1.6);
    T_(s, st[0], { x: x + 0.2, y: y + 0.15, w: 2.45, h: 0.85, fontSize: 44, bold: true, color: C.accent1, valign: "middle" });
    T_(s, st[1], { x: x + 0.2, y: y + 1.0, w: 2.45, h: 0.5, fontSize: 14, valign: "top" });
  });
  T_(s, "Counts read from the live accounts and code on 23 November 2026.", { x: 0.5, y: 5.0, w: 8, h: 0.25, fontSize: 10 });
  s.addNotes("Every number here was read from the live Supabase and Sanity accounts and from the code on 23 November 2026. Between 14 and 23 November the Academy grew from 19 courses and 299 lessons to 25 courses and 416 lessons. If asked, the AI library figure is the number of searchable passages, not documents.");

  // ───────────── 5 Book
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What is inside" });
  s.addText("The book makes the argument", { placeholder: "title" });
  s.addText([
    { text: "Preface, Introduction, 16 chapters, Conclusion, Appendices A to H", options: { bullet: true, breakLine: true } },
    { text: "Read as a PDF, in a chapter-by-chapter web reader, or listen to 18 audio narrations", options: { bullet: true, breakLine: true } },
    { text: "Every chapter ends by naming the tools and Academy courses to use", options: { bullet: true, breakLine: true } },
    { text: "Vermont as the worked example; Appendix G shows how to adapt the framework to another state", options: { bullet: true } },
  ], { isTextBox: true, x: 0.5, y: 1.35, w: 4.6, h: 3.4, fontSize: 16, color: C.text1, valign: "top", paraSpaceAfter: 10, margin: 0 });
  const groups = [["Foundations", C.text2], ["Policy", C.accent3], ["Technology", C.accent1], ["Economics", C.accent2], ["Clinical", C.accent4], ["Equity", C.accent6], ["Operations", C.accent5], ["Future and strategy", C.text2]];
  groups.forEach((g, i) => {
    const y = 1.3 + i * 0.47;
    s.addShape(pres.ShapeType.roundRect, { x: 5.5, y, w: 4.0, h: 0.4, rectRadius: 0.12, fill: { color: g[1] }, line: { color: g[1], width: 0 }, objectName: nm("chapter-chip") });
    T_(s, g[0], { x: 5.7, y, w: 3.6, h: 0.4, fontSize: 14, bold: true, color: C.background1, valign: "middle" });
  });
  s.addNotes("The book is the master document; the platform follows it. If a lesson or tool disagrees with the book, the lesson or tool is extended; differences discovered against primary sources are reported to the author and the book is edited only on instruction. Chapters group into Foundations, one block per pillar, the Equity Imperative and Future and Strategy (knowledge transfer, the future, political sustainability, portfolio management, the AHS restructuring roadmap).");

  // ───────────── 6 Academy chart
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What is inside" });
  s.addText(`Academy: ${T.lessons} lessons, every pillar`, { placeholder: "title" });
  const bp = {}; S.courses.forEach(c => { const p = c.pillar || "cross"; bp[p] = (bp[p] || 0) + c.lessons; });
  const order = [["policy", "Policy"], ["technology", "Technology"], ["economics", "Economics"], ["clinical", "Clinical"], ["operations", "Operations"], ["equity", "Equity"], ["cross", "Cross-pillar"]];
  s.addChart(pres.charts.BAR, [{ name: "Lessons", labels: order.map(o => o[1]), values: order.map(o => bp[o[0]] || 0) }], {
    x: 0.5, y: 1.3, w: 5.4, h: 3.7, barDir: "bar", chartColors: [HEX.policy, HEX.technology, HEX.economics, HEX.clinical, HEX.operations, HEX.equity, "1A2B44"], varyColors: true,
    showTitle: true, title: "Lessons by pillar", titleFontSize: 14, titleColor: THEME.colors.dk1, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 12, dataLabelColor: THEME.colors.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: THEME.colors.dk1, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, catAxisOrientation: "maxMin",
  });
  s.addText([
    { text: `${T.courses} courses, ${T.tracks} tracks`, options: { bullet: true, breakLine: true } },
    { text: "Each lesson: objectives, the lesson, takeaways, a knowledge check, numbered sources", options: { bullet: true, breakLine: true } },
    { text: "Five new courses and two expanded ones added on 23 November", options: { bullet: true, breakLine: true } },
    { text: "Course certificates with a public check link", options: { bullet: true } },
  ], { isTextBox: true, x: 6.2, y: 1.45, w: 3.3, h: 3.4, fontSize: 14, color: C.text1, valign: "top", paraSpaceAfter: 8, margin: 0 });
  s.addNotes("Policy has the most lessons because it carries the Medicaid, Medicare, CMMI, waiver and Medicare-for-All courses. Cross-pillar is Five Pillars, One Imperative (24 lessons) and Health Equity Analytics (18). Every lesson was written from the book and checked against primary sources; where a source disagreed with the book, the difference was reported and not edited.");

  // ───────────── 7 Lesson anatomy
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What is inside" });
  s.addText("Every lesson is built the same way", { placeholder: "title" });
  const steps = [["FaBullseye", "Objectives", "What you will be able to do"], ["FaBookOpen", "The lesson", "Five or more sections, at least 1,200 words"], ["FaListUl", "Takeaways", "Six to eight points to keep"], ["FaQuestionCircle", "Knowledge check", "One question with an explained answer"], ["FaLink", "Sources", "Numbered, with links, tied to claims"]];
  for (let i = 0; i < 5; i++) {
    const x = 0.5 + i * 1.82;
    await badge(s, x + 0.45, 1.4, 0.8, PC[["policy", "technology", "economics", "clinical", "operations"][i]], steps[i][0]);
    T_(s, steps[i][1], { x, y: 2.35, w: 1.7, h: 0.4, fontSize: 16, bold: true, color: C.text2, align: "center" });
    T_(s, steps[i][2], { x, y: 2.8, w: 1.7, h: 0.8, fontSize: 13, align: "center", valign: "top" });
  }
  card(s, 0.5, 3.85, 9, 1.1);
  T_(s, "Personalized Learning builds a week-by-week path from a learner's role and goals, with spoken audio. Completing a course while signed in issues a certificate anyone can verify at a public link.", { x: 0.75, y: 3.95, w: 8.5, h: 0.9, fontSize: 14, valign: "middle" });
  s.addNotes("The quality bar is the same for every lesson. Sources are numbered and tied to claims so a learner can follow them. Personalized Learning is an AI-generated path from a visitor's role and goals. Certificates have a public verification link, which matters for employers and partners who want proof of completion.");

  // ───────────── 8 Platform chart
  pres.addSection({ title: "The platform" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The platform" });
  s.addText("45 tools that turn ideas into numbers", { placeholder: "title" });
  const tp = {}; TAX.tools.forEach(t => { tp[t.pillars[0]] = (tp[t.pillars[0]] || 0) + 1; });
  const ord2 = ["policy", "technology", "economics", "clinical", "operations", "equity"];
  s.addChart(pres.charts.BAR, [{ name: "Tools", labels: ord2.map(p => p[0].toUpperCase() + p.slice(1)), values: ord2.map(p => tp[p] || 0) }], {
    x: 0.5, y: 1.3, w: 4.9, h: 3.7, barDir: "col", chartColors: ord2.map(p => HEX[p]), varyColors: true,
    showTitle: true, title: "Tools by pillar", titleFontSize: 14, titleColor: THEME.colors.dk1, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 12, dataLabelColor: THEME.colors.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: THEME.colors.dk1, catAxisLabelFontSize: 11, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false,
  });
  s.addText([
    { text: "Research Lab: calculators, stress tests, simulators and governance labs", options: { bullet: true, breakLine: true } },
    { text: "73 policy analyses and a live headline feed", options: { bullet: true, breakLine: true } },
    { text: "50-state rural health dashboard and Vermont program pages", options: { bullet: true, breakLine: true } },
    { text: "Medicare for All hub and a Vermont single-payer modeler", options: { bullet: true, breakLine: true } },
    { text: "Tools teach the logic; users bring their own numbers", options: { bullet: true } },
  ], { isTextBox: true, x: 5.7, y: 1.45, w: 3.8, h: 3.5, fontSize: 14, color: C.text1, valign: "top", paraSpaceAfter: 8, margin: 0 });
  s.addNotes("Counted by each tool's first-listed pillar. Be explicit about limits: some tools use illustrative benchmarks or synthetic patients and say so on the page. They are for learning and rehearsing a decision. Real analysis uses the user's own data.");

  // ───────────── 9 Flagship tools
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The platform" });
  s.addText("Six tools to try first", { placeholder: "title" });
  const fl = [["hospital-stress-test", "FaHospital", "economics"], ["shared-savings-calc", "FaCoins", "economics"], ["vbc-readiness", "FaClipboardCheck", "operations"], ["risk-stratification-engine", "FaUserMd", "clinical"], ["equity-studio", "FaBalanceScale", "equity"], ["single-payer-modeler", "FaLandmark", "policy"]];
  const SHORT = { "hospital-stress-test": "Stress-test hospital finances against payer mix, Medicaid cuts and global budgets.", "shared-savings-calc": "Model shared savings and loss under MSSP, ACO REACH and global budgets.", "vbc-readiness": "30 dimensions in 6 domains give a readiness score and ranked gaps.", "risk-stratification-engine": "Score patients with a simplified CMS-HCC model and segment a panel by risk tier.", "equity-studio": "Measure disparities across outcomes and compute equity-weighted results.", "single-payer-modeler": "Model a single-payer rate for each of Vermont's 14 hospitals." };
  for (let i = 0; i < 6; i++) {
    const t = tool[fl[i][0]];
    const x = 0.5 + (i % 3) * 3.05, y = 1.3 + Math.floor(i / 3) * 1.9;
    card(s, x, y, 2.85, 1.75);
    await badge(s, x + 0.15, y + 0.15, 0.5, PC[fl[i][2]], fl[i][1]);
    T_(s, t.label, { x: x + 0.75, y: y + 0.12, w: 2.0, h: 0.56, fontSize: 14, bold: true, color: C.text2, valign: "middle" });
    const d = SHORT[fl[i][0]];
    T_(s, d, { x: x + 0.15, y: y + 0.78, w: 2.55, h: 0.9, fontSize: 12, valign: "top" });
  }
  s.addNotes("Pick the tool closest to your audience. For hospital finance, the Hospital Financial Stress Test; for contracts, the APM Shared Savings Calculator; for readiness, the 30-dimension VBC Readiness Assessment; for clinical leaders, the Risk Stratification Engine; for equity, the Health Equity Studio; for policy staff, the Vermont single-payer modeler (a lens, not a forecast). Descriptions are the one-line text each tool carries in the code.");

  // ───────────── 10 Sequencing
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The platform" });
  s.addText("The argument is testable on your own plan", { placeholder: "title" });
  const sq = [["FaProjectDiagram", C.accent1, "Portfolio Sequencing Test", "Checks your own initiatives against each pillar's limiting gate."], ["FaSearchDollar", C.accent2, "Investment Sequencing Check", "Compares investment deals with Vermont's gate status."], ["FaChartLine", C.accent3, "HTR Simulator", "Scores a transformation strategy across the five pillars and the sequence."]];
  for (let i = 0; i < 3; i++) {
    const x = 0.5 + i * 3.05;
    card(s, x, 1.35, 2.85, 2.5);
    await badge(s, x + 0.2, 1.55, 0.7, sq[i][1], sq[i][0]);
    T_(s, sq[i][2], { x: x + 0.2, y: 2.4, w: 2.45, h: 0.5, fontSize: 16, bold: true, color: C.text2, valign: "top" });
    T_(s, sq[i][3], { x: x + 0.2, y: 2.95, w: 2.45, h: 0.8, fontSize: 13, valign: "top" });
  }
  T_(s, "A shared gate engine encodes the nine dependencies between pillars and is covered by automated tests that assert the book's own claims.", { x: 0.5, y: 4.1, w: 9, h: 0.8, fontSize: 15, valign: "top" });
  s.addNotes("This is what separates HTR from a reading list. The book claims pillars must be sequenced. The gate engine in the platform encodes the nine dependencies, and automated tests assert the book's claims, so the argument is checked in code. A visitor can run the Portfolio Sequencing Test on their own list of initiatives.");

  // ───────────── 11 AI Analyst
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The platform" });
  s.addText("The AI Analyst answers with sources", { placeholder: "title" });
  const fl2 = [["Ask", "A question, on any page or at /chat"], ["Search", "Meaning and keywords across the library"], ["Re-rank", "The best five passages are kept"], ["Answer", "Written from those passages, with links"]];
  fl2.forEach((f, i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.4, w: 2.0, h: 1.9, rectRadius: 0.08, fill: { color: i === 3 ? C.accent5 : C.text2 }, line: { color: C.text2, width: 0 }, shadow: shadow(), objectName: nm("step") });
    T_(s, f[0], { x: x + 0.15, y: 1.55, w: 1.7, h: 0.45, fontSize: 20, bold: true, color: C.background1 });
    T_(s, f[1], { x: x + 0.15, y: 2.1, w: 1.7, h: 1.1, fontSize: 13, color: C.background1, valign: "top" });
    if (i < 3) s.addShape(pres.ShapeType.rightArrow, { x: x + 2.03, y: 2.2, w: 0.24, h: 0.3, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 }, objectName: nm("flow-arrow") });
  });
  s.addText([
    { text: `${S.t_data_rag_documents.toLocaleString("en-US")} passages: the book, every lesson, analyses, the glossary and reference reports`, options: { bullet: true, breakLine: true } },
    { text: "Published Sanity edits reach the library in about a minute", options: { bullet: true, breakLine: true } },
    { text: "Answers are written by free open models, with a paid backup only when needed", options: { bullet: true } },
  ], { isTextBox: true, x: 0.5, y: 3.6, w: 9, h: 1.4, fontSize: 14, color: C.text1, valign: "top", paraSpaceAfter: 6, margin: 0 });
  s.addNotes("The AI Analyst answers only from the HTR library and lists its sources under each answer, so every claim can be checked. It is a research aid, not an authority. After a quiet period the first answer can take about 20 seconds while the server wakes. Typical cost is effectively zero; the paid backup is under a tenth of a cent per question.");

  // ───────────── 12 RHT review
  pres.addSection({ title: "Proof" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Proof" });
  s.addText("Proof of method: the 50-state RHT review", { placeholder: "title" });
  card(s, 0.5, 1.3, 4.4, 3.2);
  T_(s, "Vermont's Rural Health Transformation award", { x: 0.75, y: 1.4, w: 3.9, h: 0.4, fontSize: 14, bold: true, color: C.text2 });
  T_(s, "$195.1M", { x: 0.75, y: 1.85, w: 1.9, h: 0.7, fontSize: 32, bold: true, color: C.accent1, valign: "middle" });
  T_(s, "Year 1 (FY2026)", { x: 0.75, y: 2.55, w: 1.9, h: 0.3, fontSize: 12 });
  T_(s, "$190.0M", { x: 2.85, y: 1.85, w: 1.9, h: 0.7, fontSize: 32, bold: true, color: C.accent3, valign: "middle" });
  T_(s, "Year 2 (FY2027)", { x: 2.85, y: 2.55, w: 1.9, h: 0.3, fontSize: 12 });
  T_(s, "242 signed agreements totaling $182.2M matched the state's own total; $28.4M was reported as put to work by 31 July 2026.", { x: 0.75, y: 3.1, w: 3.9, h: 1.7, fontSize: 14, valign: "top" });
  s.addText([
    { text: "All 50 states compared on spending, plan themes and policy commitments", options: { bullet: true, breakLine: true } },
    { text: "Itemized award lists for 27 states", options: { bullet: true, breakLine: true } },
    { text: "Figures check themselves: each year must total $10.0 billion", options: { bullet: true, breakLine: true } },
    { text: "Honest limits on the page: committed is not spent, and no outcomes are reported yet", options: { bullet: true } },
  ], { isTextBox: true, x: 5.2, y: 1.45, w: 4.3, h: 3.5, fontSize: 14, color: C.text1, valign: "top", paraSpaceAfter: 8, margin: 0 });
  s.addNotes("Use this as proof of rigor, not as a headline. The review was built from CMS documents and state agency lists, the totals reconcile to the state's own printed total, and the pages say what the data cannot show. The Year 2 change is a decrease of about 2.6 percent; CMS does not explain individual state changes, so the review does not claim a cause.");

  // ───────────── 13 Method
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Proof" });
  s.addText("Why you can trust what you read", { placeholder: "title" });
  const mt = [["FaSearch", C.accent1, "Verified before published", "Every fact is checked against a citable primary source."], ["FaTrashAlt", C.accent4, "Unverified means deleted", "A claim that cannot be verified is removed, not softened."], ["FaListOl", C.accent3, "Sources on every lesson", "Numbered sources with links, each tied to a claim."], ["FaExclamationTriangle", C.accent2, "Differences are reported", "Where a source disagrees with the book, the author is told and the book is edited only on instruction."]];
  for (let i = 0; i < 4; i++) {
    const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.95;
    await badge(s, x, y + 0.1, 0.7, mt[i][1], mt[i][0]);
    T_(s, mt[i][2], { x: x + 0.9, y: y + 0.05, w: 3.5, h: 0.45, fontSize: 18, bold: true, color: C.text2 });
    T_(s, mt[i][3], { x: x + 0.9, y: y + 0.55, w: 3.5, h: 1.0, fontSize: 14, valign: "top" });
  }
  s.addNotes("This is the answer to the question every partner asks: how do I know it is right? The 23 November courses are an example. Each was written from the book and checked against primary documents such as statutes, federal letters and agency reports; the differences found were listed for the author and the book was left unedited.");

  // ───────────── 14 Who for
  pres.addSection({ title: "Using it" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Using it" });
  s.addText("Who uses it, and where they start", { placeholder: "title" });
  const who = [["FaUserTie", "Hospital executive", "Hospital Finance course; Hospital Financial Stress Test"], ["FaLandmark", "Policy analyst or state official", "CMMI course; Policy Simulator; RHT review"], ["FaStethoscope", "Clinician or quality leader", "Clinical Transformation Toolkit; Quality Optimizer"], ["FaMicrochip", "Technology or data leader", "FHIR and AI Governance course; AI Governance Lab"], ["FaUserGraduate", "Student or new hire", "Start Here; Five Pillars, One Imperative"], ["FaBriefcase", "Investor or consultant", "Investment Tracker; Portfolio Management course"]];
  const cols = [C.accent2, C.accent3, C.accent4, C.accent1, C.accent6, C.accent5];
  for (let i = 0; i < 6; i++) {
    const x = 0.5 + (i % 2) * 4.6, y = 1.25 + Math.floor(i / 2) * 1.25;
    await badge(s, x, y + 0.1, 0.65, cols[i], who[i][0]);
    T_(s, who[i][1], { x: x + 0.85, y: y + 0.05, w: 3.5, h: 0.35, fontSize: 16, bold: true, color: C.text2 });
    T_(s, who[i][2], { x: x + 0.85, y: y + 0.42, w: 3.5, h: 0.6, fontSize: 13, valign: "top" });
  }
  s.addNotes("The master documentation has a full first-hour, first-week and first-month playbook for each of these six roles. Use whichever matches the audience in the room.");

  // ───────────── 15 Honest status
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Using it" });
  s.addText("Where we are today, honestly", { placeholder: "title" });
  card(s, 0.5, 1.3, 4.4, 3.0);
  card(s, 5.1, 1.3, 4.4, 3.0);
  T_(s, "Live now", { x: 0.75, y: 1.4, w: 3.9, h: 0.4, fontSize: 20, bold: true, color: C.accent6 });
  s.addText([
    { text: "Closed beta on four web addresses, two brands", options: { bullet: true, breakLine: true } },
    { text: "Full book, Academy, tools and AI Analyst", options: { bullet: true, breakLine: true } },
    { text: "One shared contact inbox for all four domains", options: { bullet: true, breakLine: true } },
    { text: "Running cost about $40 to $45 a month", options: { bullet: true } },
  ], { isTextBox: true, x: 0.75, y: 1.9, w: 3.9, h: 3.0, fontSize: 14, color: C.text1, valign: "top", paraSpaceAfter: 8, margin: 0 });
  T_(s, "Not yet", { x: 5.35, y: 1.4, w: 3.9, h: 0.4, fontSize: 20, bold: true, color: C.accent4 });
  s.addText([
    { text: "Public launch; access is by code today", options: { bullet: true, breakLine: true } },
    { text: "Payments and automatic email are built but switched off", options: { bullet: true, breakLine: true } },
    { text: "Advisory engagement form on the Solutions brand is not connected", options: { bullet: true, breakLine: true } },
    { text: "Webinars and faculty pages have no content yet", options: { bullet: true } },
  ], { isTextBox: true, x: 5.35, y: 1.9, w: 3.9, h: 3.0, fontSize: 14, color: C.text1, valign: "top", paraSpaceAfter: 8, margin: 0 });
  s.addNotes("Say this before anyone asks. It builds trust and keeps expectations right. Everything in the left column is verified; everything in the right column is on the open-items list in the master documentation. Licensing or white-labelling is an open decision for the author and is not promised here.");

  // ───────────── 16 Next steps (dark)
  pres.addSection({ title: "Next steps" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Next steps" });
  s.addText("What happens next", { placeholder: "title" });
  const nx = [["1", "Get an access code", "Request a trial code for the domains you need."], ["2", "Take the 20-minute path", "Book, one lesson, one tool and one AI question."], ["3", "Pick your playbook", "A first hour, week and month for your role."], ["4", "Scope a pilot together", "A course cohort, a chapter workshop or a tool session."]];
  nx.forEach((x0, i) => {
    const x = 0.6 + (i % 2) * 4.5, y = 1.55 + Math.floor(i / 2) * 1.5;
    s.addShape(pres.ShapeType.ellipse, { x, y, w: 0.7, h: 0.7, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 }, objectName: nm("step-dot") });
    T_(s, x0[0], { x, y, w: 0.7, h: 0.7, fontSize: 24, bold: true, color: C.background1, align: "center", valign: "middle" });
    T_(s, x0[1], { x: x + 0.9, y: y - 0.02, w: 3.4, h: 0.4, fontSize: 18, bold: true, color: C.background1 });
    T_(s, x0[2], { x: x + 0.9, y: y + 0.4, w: 3.4, h: 0.7, fontSize: 14, color: C.background2, valign: "top" });
  });
  T_(s, "contact@healthtransformationreview.org", { x: 0.6, y: 4.75, w: 8.8, h: 0.4, fontSize: 18, bold: true, color: C.background1 });
  s.addNotes("Close on a small, concrete ask. The contact address reaches one shared inbox on all four domains. Tailor step four to the audience: for an employer, a cohort taking one course; for a partner, a joint workshop around a chapter; for a client, a tool session on their own numbers. Do not promise licensing, pricing or advisory terms in this deck.");

  // ───────────── 17 Appendix demo path
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Next steps" });
  s.addText("Appendix: a 20-minute demonstration", { placeholder: "title" });
  const hdr = o => ({ text: o, options: { bold: true, color: "FFFFFF", fill: { color: THEME.colors.dk2 }, fontSize: 13 } });
  const row = r => r.map((c, i) => ({ text: c, options: { fontSize: 12, color: THEME.colors.dk1 } }));
  s.addTable([
    [hdr("Minutes"), hdr("Show"), hdr("Where")],
    row(["0 to 3", "The framework", "Home page and the Five-Pillar Map"]),
    row(["3 to 7", "The book", "/book, then the web reader"]),
    row(["7 to 11", "The Academy", "/academy: one track and one lesson with its sources"]),
    row(["11 to 15", "A tool, live", "Hospital Financial Stress Test or Shared Savings Calculator"]),
    row(["15 to 18", "The AI Analyst", "/chat: a known-answer question, then its sources"]),
    row(["18 to 20", "Proof of rigor", "/rht-review/vermont"]),
  ], { x: 0.5, y: 1.3, w: 9, colW: [1.3, 2.4, 5.3], rowH: 0.5, border: { type: "solid", pt: 0.5, color: "C9D3E0" }, fontFace: "Calibri", valign: "middle" });
  s.addNotes("This table mirrors the demonstration in the master documentation, section 17.4. Use the addresses on whichever of the four domains the audience has access to.");

  const out = process.argv[2] || "../HTR_Ecosystem_Deck_2026-11-23.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
})().catch(e => { console.error(e); process.exit(1); });
