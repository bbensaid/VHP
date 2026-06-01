// Add the new "What Is Health Information Exchange?" lesson as the FIRST lesson
// of the HIE course's Policy & Legislation track. Content lives in Sanity
// (sanity_slug = hie-intro-what-is-hie); this creates the Supabase lesson row.
// DRY RUN unless --commit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const COMMIT = process.argv.includes("--commit");

const COURSE_SLUG = "hie-health-reform-onboarding";
const TRACK_SLUG = "policy-legislation";
const NEW = {
  slug: "hie-intro-what-is-hie",
  sanity_slug: "hie-intro-what-is-hie",
  title: "What Is Health Information Exchange?",
  summary: "Start here: a plain-language introduction to HIE — what it is, the problem it solves, the three ways information is exchanged, and why it matters.",
  pillar: "policy",
  estimated_minutes: 15,
  objectives: [
    { id: "o1", text: "Explain in plain language what health information exchange is" },
    { id: "o2", text: "Describe the fragmentation problem HIE is designed to solve" },
    { id: "o3", text: "Distinguish directed, query-based, and consumer-mediated exchange" },
  ],
};

const { data: course } = await db.from("courses").select("id").eq("slug", COURSE_SLUG).single();
const { data: track } = await db.from("tracks").select("id").eq("course_id", course.id).eq("slug", TRACK_SLUG).single();
const { data: existing } = await db.from("lessons").select("slug,order").eq("track_id", track.id).order("order");
console.log("Policy track current lessons:", JSON.stringify(existing));
console.log("Will insert new lesson at order 1:", NEW.slug, "(sanity_slug:", NEW.sanity_slug + ")");
const already = existing.find(l => l.slug === NEW.slug);
console.log("Already present?:", !!already);

if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit. (Existing lessons already start at order 2, so order 1 is free; no reorder needed.)"); process.exit(0); }

const { error } = await db.from("lessons").upsert({
  track_id: track.id, pillar: NEW.pillar, order: 1, slug: NEW.slug, title: NEW.title,
  summary: NEW.summary, estimated_minutes: NEW.estimated_minutes, objectives: NEW.objectives,
  content_blocks: [], tags: ["introduction", "hie-basics"], related_lesson_ids: [],
  is_published: true, sanity_slug: NEW.sanity_slug,
}, { onConflict: "track_id,slug" });
if (error) { console.error("ERR", error.message); process.exit(1); }

const { data: after } = await db.from("lessons").select("slug,order,sanity_slug").eq("track_id", track.id).order("order");
console.log("\n✅ Policy track now:", JSON.stringify(after, null, 2));
