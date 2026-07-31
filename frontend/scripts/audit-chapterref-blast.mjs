// Read-only: quantify the chapterRef off-by-two across ALL pillars (Sanity + Supabase).
import { createClient } from "@sanity/client";
import { createClient as sb } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim();

// truth table from chapters.ts
const TRUE_LEAD = { Policy: "2", Technology: "4", Economics: "6", Clinical: "8", Equity: "10", Operations: "11" };
const CH_PILLAR = { "2": "Policy", "3": "Policy", "4": "Technology", "5": "Technology", "6": "Economics",
  "7": "Economics", "8": "Clinical", "9": "Clinical", "10": "Equity", "11": "Operations" };

const client = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2023-10-01", token: get("SANITY_API_TOKEN"), useCdn: false,
});

const docs = await client.fetch(
  `*[defined(chapterRef) && !(_id in path("drafts.**"))]{_type, title, pillar, chapterRef}`
);
console.log("=== SANITY docs carrying chapterRef:", docs.length, "===");
let bad = 0, ok = 0;
const byPillar = {};
for (const d of docs) {
  const p = d.pillar;
  if (!p) continue;
  const expected = TRUE_LEAD[p];
  const landsOn = CH_PILLAR[d.chapterRef] ?? "(non-pillar chapter)";
  const correct = d.chapterRef === expected;
  correct ? ok++ : bad++;
  const k = `${p}: ref=${d.chapterRef} -> lands on ${landsOn} (should be ch ${expected})`;
  byPillar[k] = (byPillar[k] || 0) + 1;
}
console.log(`  correct: ${ok}   mispointed: ${bad}`);
Object.entries(byPillar).sort().forEach(([k, n]) => console.log(String(n).padStart(5), k));

// Which of these render on /book (policyAnalysis, caseStudy, webinar)
const onBook = docs.filter((d) => ["policyAnalysis", "caseStudy", "webinar"].includes(d._type));
console.log(`\n=== rendered on /book page: ${onBook.length} docs ===`);

// Supabase courses
const db = sb(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));
const { data: courses } = await db.from("courses").select("slug, pillar, chapter_ref");
console.log("\n=== SUPABASE courses: chapter_ref vs pillar ===");
for (const c of courses.sort((a, b) => (a.pillar > b.pillar ? 1 : -1))) {
  const landsOn = CH_PILLAR[c.chapter_ref] ?? "(non-pillar chapter)";
  const cap = c.pillar ? c.pillar[0].toUpperCase() + c.pillar.slice(1) : null;
  const expected = TRUE_LEAD[cap] ?? "?";
  const flag = String(landsOn).toLowerCase() === String(c.pillar).toLowerCase() ? "OK" : "<-- MISMATCH";
  console.log(`${c.slug.padEnd(36)} pillar=${String(c.pillar).padEnd(11)} ref=${String(c.chapter_ref).padEnd(3)} lands on ${String(landsOn).padEnd(22)} ${flag}`);
}
