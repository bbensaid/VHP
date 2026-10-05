// Renders the book-cover artwork from the SAME component the platform uses
// (components/framework/FrameworkMapDiagram), so the cover can never drift from
// /about/framework or the homepage hero.
//
//   npx tsx scripts/render-cover.tsx
//
// Writes to ../book-build/cover/:
//   cover_map_square.svg / .jpg  — 1890×1890 (6.3 in @ 300 dpi), drop-in for the
//                                   manuscript's word/media/image1.jpg (same square frame)
//   cover_a.svg / .png           — full Cover A (6×9 in @ 200 dpi) for /book and the hero
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "playwright";
import FrameworkMapDiagram from "../components/framework/FrameworkMapDiagram";

const OUT = path.resolve(__dirname, "../../book-build/cover");
fs.mkdirSync(OUT, { recursive: true });

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,600;1,400&family=Inter:ital,wght@0,400;0,700;0,800;1,400&display=swap">`;

// Map with every edge lit (no pillar selected). Inner viewBox is 520×450.
const map = renderToStaticMarkup(React.createElement(FrameworkMapDiagram, { lit: true, idPrefix: "cover" }));
const inner = (x: number, y: number, w: number, h: number) =>
  map.replace("<svg ", `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);

// 1) Square artwork for the manuscript: the map centred on white, 35px margin top and bottom.
const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" width="1890" height="1890" font-family="Inter, sans-serif">
  <rect width="520" height="520" fill="#ffffff"/>
  ${inner(0, 35, 520, 450)}
</svg>`;

// 2) Full Cover A: the current cover's layout, with the map in place of the old diagram.
const coverA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="1200" height="1800" font-family="Inter, sans-serif">
  <rect width="600" height="900" fill="#ffffff"/>
  <g font-family="'EB Garamond', Garamond, serif" fill="#1f2a5c">
    <text x="60" y="118" font-size="50" font-weight="600" letter-spacing="1.5">TRANSFORMING</text>
    <text x="60" y="180" font-size="50" font-weight="600" letter-spacing="1.5">HEALTHCARE</text>
  </g>
  <line x1="60" x2="540" y1="206" y2="206" stroke="#1f2a5c" stroke-width="2.5"/>
  <g font-family="'EB Garamond', Garamond, serif" font-style="italic" font-size="21" fill="#334155">
    <text x="60" y="242">A Five-Pillar Framework with Vermont</text>
    <text x="60" y="268">as the National Proving Ground</text>
  </g>
  ${inner(22, 318, 556, 481)}
  <text x="300" y="858" text-anchor="middle" font-family="'EB Garamond', Garamond, serif" font-size="24" font-weight="500" letter-spacing="3" fill="#1f2a5c">BECHIR BENSAID</text>
</svg>`;

async function rasterize(svg: string, w: number, h: number, file: string, type: "png" | "jpeg") {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head>${FONTS}<style>html,body{margin:0;background:#fff}svg{display:block}</style></head><body>${svg}</body></html>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, type, quality: type === "jpeg" ? 92 : undefined, clip: { x: 0, y: 0, width: w, height: h } });
  await browser.close();
}

(async () => {
  fs.writeFileSync(path.join(OUT, "cover_map_square.svg"), square);
  fs.writeFileSync(path.join(OUT, "cover_a.svg"), coverA);
  await rasterize(square, 1890, 1890, path.join(OUT, "cover_map_square.jpg"), "jpeg");
  await rasterize(coverA, 1200, 1800, path.join(OUT, "cover_a.png"), "png");
  console.log("wrote", fs.readdirSync(OUT).join(", "));
})();
