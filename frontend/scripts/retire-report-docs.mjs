// One-off (2026-10-04): retire the four empty `report` documents that fed the
// old homepage hero. Backs every document up to ../sanity-backups/ first.
import { createClient } from "@sanity/client";
import fs from "fs";
const read = (f) => Object.fromEntries(fs.readFileSync(f, "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }));
const env = { ...read(".env.local"), ...read("../backend/.env") };
const c = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2023-10-01", useCdn: false, token: env.SANITY_API_TOKEN });
const docs = await c.fetch(`*[_type == "report"]`);
console.log("found", docs.length, docs.map((d) => d._id));
const out = `../sanity-backups/report-docs-retired-${Date.now()}.json`;
fs.writeFileSync(out, JSON.stringify(docs, null, 2));
console.log("backup ->", out, fs.statSync(out).size, "bytes");
if (process.argv.includes("--delete")) {
  const tx = c.transaction();
  for (const d of docs) tx.delete(d._id);
  await tx.commit();
  console.log("deleted", docs.length, "; remaining:", await c.fetch(`count(*[_type == "report"])`));
}
