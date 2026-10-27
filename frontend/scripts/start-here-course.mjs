// Turn the single-lesson `welcome-htr-framework` course into the five-lesson "Start Here"
// course (author's decision 2026-10-26). Keeps the slug so existing links keep working.
// Lesson 1 (welcome-htr-framework) is unchanged; lessons 2-5 are new, with bodies already
// posted to Sanity by frontend/content/_course_start_here.py.
// Backup of the pre-change rows: sanity-backups/start-here-pre-supabase-*.json
// DRY RUN by default. Pass --commit to write.
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
const die = (label, err) => { if (err) { console.error("ERR", label, err.message); process.exit(1); } };

const COURSE = {
  title: "Start Here",
  subtitle: "How the book, the platform and the Academy work together, and where to begin",
  description:
    "The orientation course for everyone new to HTR. Lesson 1 introduces the five-pillar framework, the Equity Imperative and the execution sequence. Lessons 2-5 are hands-on: reading the book with the platform open, running the dependency logic yourself in the Research Lab, getting answers you can trust from the AI Analyst, and choosing a learning path for your role, ending with the book's own Lab Workbook.",
  target_audience: ["Anyone new to HTR", "Readers of Transforming Healthcare"],
  estimated_hours: 2.0,
  level: "foundational",
};
const TRACK = { title: "Start Here", description: "Orientation: the framework, the book, the tools, the AI Analyst and your path" };

const NEW_LESSONS = [
  {
    order: 2, slug: "start-here-reading-the-book", title: "Reading the Book With the Platform Open", estimated_minutes: 20,
    summary: "The web reader and PDF, the reader's sidebar, the section that closes every chapter, the From the Book links that run back from the tools, and a read-run-ask-learn routine for every chapter.",
    objectives: [
      "Use the web reader's sidebar to navigate, annotate, bookmark and reach a chapter's platform tools",
      "Use Work This Chapter on the Platform to turn a chapter's argument into a specific exercise",
      "Apply the read, run, ask, learn routine to any chapter",
    ],
    tags: ["orientation", "book", "reader"],
  },
  {
    order: 3, slug: "start-here-first-research-lab-session", title: "Your First Research Lab Session: Run the Sequence Yourself", estimated_minutes: 30,
    summary: "Run the HTR Simulator on its three built-in scenarios, read On paper versus Delivered and the binding constraint, see the same logic applied to capital and friction, and score a system you know.",
    objectives: [
      "Explain how gate status cascades through the five pillars in the HTR Simulator",
      "Distinguish nominal (On paper) from delivered readiness and identify the binding constraint",
      "Use the Investment Tracker's portfolio check to find initiatives funded ahead of their gate",
    ],
    tags: ["orientation", "research-lab", "htr-simulator"],
  },
  {
    order: 4, slug: "start-here-ai-analyst", title: "Getting Good Answers From the AI Analyst", estimated_minutes: 25,
    summary: "How the AI Analyst retrieves and cites its sources, how to set it up for your role, how to ask questions that retrieve the right documents, and how to check an answer before relying on it.",
    objectives: [
      "Describe how the AI Analyst retrieves sources and cites them under each answer",
      "Write specific questions that name the state, program, year and decision",
      "Verify an answer against its listed sources before relying on it",
    ],
    tags: ["orientation", "ai-analyst"],
  },
  {
    order: 5, slug: "start-here-your-learning-path", title: "Your Learning Path and the Lab Workbook", estimated_minutes: 30,
    summary: "The backbone course, recommended courses by role, Personalized Learning, and the book's HTR Lab Workbook, which reproduces the book's argument in two to three hours of modeling.",
    objectives: [
      "Choose the backbone and first specialist course for your role",
      "Build a weekly learning plan sized to your time",
      "Work the HTR Lab Workbook stages in the book's execution order",
    ],
    tags: ["orientation", "learning-path", "workbook"],
  },
];

const { data: course, error: ce } = await db.from("courses").select("id,slug,title").eq("slug", "welcome-htr-framework").single();
die("course", ce);
const { data: tracks, error: te } = await db.from("tracks").select("id,slug,title").eq("course_id", course.id);
die("tracks", te);
if (tracks.length !== 1) { console.error("expected exactly 1 track, found", tracks.length); process.exit(1); }
const track = tracks[0];
const { data: existing, error: le } = await db.from("lessons").select("slug,order").eq("track_id", track.id);
die("lessons", le);
console.log(`Course ${course.title} -> "${COURSE.title}"; track ${track.title} -> "${TRACK.title}"; existing lessons:`, existing.map((l) => `${l.order}:${l.slug}`).join(", "));

const rows = NEW_LESSONS.map((l) => ({
  track_id: track.id,
  pillar: "policy",
  order: l.order,
  slug: l.slug,
  title: l.title,
  summary: l.summary,
  estimated_minutes: l.estimated_minutes,
  objectives: l.objectives.map((text, i) => ({ id: `obj_${l.order}_${i + 1}`, text })),
  content_blocks: [],
  tags: l.tags,
  related_lesson_ids: [],
  is_published: true,
  sanity_slug: l.slug,
}));
for (const r of rows) console.log(`  + ${r.order}: ${r.slug} (sanity_slug=${r.sanity_slug})`);

if (!COMMIT) { console.log("DRY RUN — pass --commit to write"); process.exit(0); }

die("course update", (await db.from("courses").update(COURSE).eq("id", course.id)).error);
die("track update", (await db.from("tracks").update(TRACK).eq("id", track.id)).error);
const have = new Set(existing.map((l) => l.slug));
const toInsert = rows.filter((r) => !have.has(r.slug));
if (toInsert.length) die("lessons insert", (await db.from("lessons").insert(toInsert)).error);
console.log("inserted", toInsert.length);

const { data: after } = await db.from("lessons").select("order,slug,sanity_slug,is_published").eq("track_id", track.id).order("order");
console.log("After:", after);
