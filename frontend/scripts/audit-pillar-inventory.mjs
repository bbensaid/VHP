// Read-only pillar inventory for the alignment audit.
// Usage: node scripts/audit-pillar-inventory.mjs <Pillar>   e.g. Technology
import { createClient } from "@sanity/client";
import { createClient as sbClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const PILLAR = process.argv[2];
if (!PILLAR) { console.error("Usage: node scripts/audit-pillar-inventory.mjs <Pillar>"); process.exit(1); }
const lower = PILLAR.toLowerCase();

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) =>
  (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");

const sanity = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2023-10-01",
  useCdn: false,
});

const docs = await sanity.fetch(
  `*[defined(pillar) && !(_id in path("drafts.**"))]{_type, pillar, title, "slug": slug.current, chapterRef}`
);
const mine = docs.filter((d) => String(d.pillar).toLowerCase() === lower);
console.log(`=== SANITY: ${PILLAR} editorial (${mine.length} docs) ===`);
const byType = {};
for (const d of mine) byType[d._type] = (byType[d._type] || 0) + 1;
console.log("by type:", JSON.stringify(byType));
for (const d of mine.sort((a, b) => (a._type + a.title > b._type + b.title ? 1 : -1))) {
  console.log(`  [${d._type}] ${String(d.title).slice(0, 76)}  /${d.slug ?? "?"}  ch=${d.chapterRef ?? "-"}`);
}

const db = sbClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));
const { data: courses } = await db.from("courses").select("*");
const cs = courses.filter((c) => String(c.pillar).toLowerCase() === lower);
console.log(`\n=== ACADEMY: ${PILLAR} courses (${cs.length}) ===`);
for (const c of cs) {
  const { data: tracks } = await db.from("tracks").select("*").eq("course_id", c.id).order("order");
  let total = 0;
  console.log(`\n--- ${c.slug}  (chapter_ref=${c.chapter_ref}, level=${c.level ?? "-"}) ---`);
  for (const t of tracks ?? []) {
    const { data: lessons } = await db
      .from("lessons").select('title, sanity_slug, "order"').eq("track_id", t.id).order("order");
    console.log(`  TRACK: ${t.title}`);
    for (const l of lessons ?? []) {
      total++;
      console.log(`    ${String(l.order).padStart(3)}. ${l.title}  [${l.sanity_slug ?? "NULL"}]`);
    }
  }
  console.log(`  (${total} lessons)`);
}
