// Read-only: inventory Sanity editorial content tagged to the Policy pillar.
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim();

const client = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2023-10-01",
  token: get("SANITY_API_TOKEN"),
  useCdn: false,
});

// 1. Counts by document type
const counts = await client.fetch(`*[!(_id in path("drafts.**"))]{_type} | {"t": _type}`);
const byType = {};
for (const d of counts) byType[d.t] = (byType[d.t] || 0) + 1;
console.log("=== ALL PUBLISHED DOCS BY TYPE ===");
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(String(n).padStart(5), t));

// 2. Everything carrying a pillar field, grouped
const withPillar = await client.fetch(
  `*[defined(pillar) && !(_id in path("drafts.**"))]{_type, pillar, title, "slug": slug.current, chapterRef}`
);
console.log("\n=== DOCS WITH A pillar FIELD ===", withPillar.length);
const pillarCount = {};
for (const d of withPillar) {
  const key = `${d._type} / ${d.pillar}`;
  pillarCount[key] = (pillarCount[key] || 0) + 1;
}
Object.entries(pillarCount).sort().forEach(([k, n]) => console.log(String(n).padStart(5), k));

console.log("\n=== POLICY-PILLAR EDITORIAL DOCS ===");
const pol = withPillar.filter((d) => String(d.pillar).toLowerCase() === "policy");
console.log("count:", pol.length);
for (const d of pol.sort((a, b) => (a._type > b._type ? 1 : -1))) {
  console.log(`  [${d._type}] ${d.title} — /${d.slug ?? "?"} chapterRef=${JSON.stringify(d.chapterRef ?? null)}`);
}
