// Shared layout for the HTR printable guides (same look as the inventory).
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel,
  AlignmentType, WidthType, ShadingType, BorderStyle, LevelFormat, Footer, PageNumber,
} = require("./node_modules/docx");

const NAVY = "1F3A5F", INK = "222222", GREY = "666666", HEAD_FILL = "DCE6F1", NOTE_FILL = "FFF4E5",
  OK_FILL = "E8F5E9", WARN_FILL = "FDECEA", CODE_FILL = "F3F4F6";
const W = 9360;

function runs(text, opts = {}) {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s =>
    s.startsWith("**") ? new TextRun({ text: s.slice(2, -2), bold: true, color: INK, ...opts })
                       : new TextRun({ text: s, color: INK, ...opts }));
}
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run), spacing: { after: 120 }, ...o.para });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const B = (t, level = 0) => new Paragraph({ numbering: { reference: "bul", level }, children: runs(t), spacing: { after: 60 } });
let curList = 0;
const L = () => { curList++; return []; };
const N = t => new Paragraph({ numbering: { reference: "num", level: 0, instance: curList }, children: runs(t), spacing: { after: 60 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: "B0B7C3" };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, width, { head = false, fill } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA }, borders,
    shading: head ? { type: ShadingType.CLEAR, color: "auto", fill: HEAD_FILL } : fill ? { type: ShadingType.CLEAR, color: "auto", fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: String(text).split("\n").map(line => new Paragraph({ children: runs(line, { size: 18, bold: head || undefined }) })),
  });
}
function table(headers, rows, pct) {
  const widths = pct.map(p => Math.round(W * p / 100));
  widths[widths.length - 1] = W - widths.slice(0, -1).reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], { head: true })) }),
      ...rows.map(r => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, widths[i])) })),
    ],
  });
}
function box(title, lines, fill = NOTE_FILL) {
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: W, type: WidthType.DXA }, borders, shading: { type: ShadingType.CLEAR, color: "auto", fill },
      margins: { top: 120, bottom: 120, left: 160, right: 160 },
      children: [new Paragraph({ children: runs("**" + title + "**", { size: 20 }), spacing: { after: 80 } }),
        ...lines.map(l => new Paragraph({ children: runs(l, { size: 19 }), spacing: { after: 60 } }))],
    })] })],
  });
}
// A copy-and-paste block (prompt or command): monospace, grey, keeps its line breaks.
function code(title, text) {
  const lines = text.replace(/^\n+|\n+$/g, "").split("\n");
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: W, type: WidthType.DXA }, borders, shading: { type: ShadingType.CLEAR, color: "auto", fill: CODE_FILL },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      children: [
        ...(title ? [new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 18, color: NAVY, font: "Arial" })], spacing: { after: 80 } })] : []),
        ...lines.map(l => new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: l || " ", font: "Courier New", size: 17, color: INK })] })),
      ],
    })] })],
  });
}
const gap = () => new Paragraph({ children: [], spacing: { after: 80 } });

function titlePage(title, subtitle, intro) {
  return [
    new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
    new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: title, size: 34, color: NAVY, font: "Arial" })] }),
    ...intro.map(t => P(t)),
    P("**Prepared:** 14 November 2026, by Claude (Claude Code), for Bechir Ben Said. Facts were checked against the live platform, the code and the accounts on that date."),
    ...(subtitle ? [P(subtitle)] : []),
  ];
}

function build(out, docTitle, footerText, children) {
  const doc = new Document({
    creator: "Claude", title: docTitle,
    styles: {
      default: { document: { run: { font: "Arial", size: 21, color: INK } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { font: "Arial", size: 32, bold: true, color: NAVY }, paragraph: { spacing: { before: 240, after: 160 }, keepNext: true, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { font: "Arial", size: 26, bold: true, color: NAVY }, paragraph: { spacing: { before: 280, after: 120 }, keepNext: true, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { font: "Arial", size: 22, bold: true, color: NAVY }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true, outlineLevel: 2 } },
      ],
    },
    numbering: { config: [
      { reference: "bul", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1000, hanging: 270 } } } }] },
      { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
    ] },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: footerText + " · 14 November 2026 · page ", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY })] })] }) },
      children,
    }],
  });
  return Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log("wrote", out); });
}

module.exports = { P, H1, H2, H3, B, L, N, table, box, code, gap, titlePage, build, OK_FILL, WARN_FILL, NOTE_FILL };
