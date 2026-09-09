// scripts/post-five-pillars-to-sanity.mjs
//
// Converts Track 1's 5 lessons (frontend/content/course_five_pillars.json)
// from their Supabase content_blocks shape into Sanity portable text, and
// posts them as `academyModule` documents.
//
// Mapping used (verified against sanity/schemaTypes/blockContent.ts and the
// renderer in components/AcademyContent.tsx before writing this):
//   text            -> an h3 block (if heading) + one normal block per
//                       paragraph (split on blank lines)
//   key_stat        -> statGrid object (source folded into each stat's
//                       "context" field, since statGrid has no separate
//                       source field)
//   callout         -> a single block styled "callout", heading rendered as
//                       a bold leading span within the same block
//   comparison_table-> NOT mapped to comparisonBlock (that type is a fixed
//                       2-column layout with no per-row label — would lose
//                       structure). Rendered instead as a bulleted list,
//                       one item per row: **label** — left -> right.
//
// This is a REFORMAT of existing, already-written lesson content — no new
// text is generated here. Every word traces back to
// frontend/content/course_five_pillars.json.
//
// Idempotent: uses createOrReplace keyed on a deterministic _id
// (academyModule-five-pillars-<lessonSlug>), safe to re-run.
//
//   cd frontend && node scripts/post-five-pillars-to-sanity.mjs           # dry run
//   cd frontend && node scripts/post-five-pillars-to-sanity.mjs --commit  # writes

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { randomBytes } from "crypto";

const __dir = dirname(fileURLToPath(import.meta.url));
const COMMIT = process.argv.includes("--commit");

// ── env ─────────────────────────────────────────────────────────────────────
try {
  const envFile = readFileSync(join(__dir, "../.env.local"), "utf8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // rely on already-exported environment variables
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01";
const TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET / SANITY_API_TOKEN");
  process.exit(1);
}

const key = () => randomBytes(6).toString("hex");

// ── content_blocks -> portable text ─────────────────────────────────────────

function paragraphBlocks(text, style = "normal") {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({
      _type: "block",
      _key: key(),
      style,
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: p, marks: [] }],
    }));
}

function headingBlock(text, style = "h3") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function convertBlock(b) {
  switch (b.type) {
    case "text": {
      const out = [];
      if (b.heading) out.push(headingBlock(b.heading));
      out.push(...paragraphBlocks(b.body));
      return out;
    }

    case "key_stat":
      return [
        {
          _type: "statGrid",
          _key: key(),
          stats: b.stats.map((s) => ({
            _key: key(),
            value: s.value,
            label: s.label,
            context: s.source ? `Source: ${s.source}` : undefined,
          })),
        },
      ];

    case "callout": {
      const block = {
        _type: "block",
        _key: key(),
        style: "callout",
        markDefs: [],
        children: [],
      };
      if (b.heading) {
        block.children.push({ _type: "span", _key: key(), text: `${b.heading}\n`, marks: ["strong"] });
      }
      block.children.push({ _type: "span", _key: key(), text: b.body, marks: [] });
      return [block];
    }

    case "comparison_table": {
      const out = [];
      if (b.heading) out.push(headingBlock(b.heading, "h4"));
      for (const row of b.rows) {
        out.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [
            { _type: "span", _key: key(), text: `${row.label} — `, marks: ["strong"] },
            { _type: "span", _key: key(), text: `${row.left} → ${row.right}`, marks: [] },
          ],
        });
      }
      return out;
    }

    default:
      console.warn(`  ! unhandled block type "${b.type}" — skipped`);
      return [];
  }
}

function lessonToBody(lesson) {
  return lesson.contentBlocks.flatMap(convertBlock);
}

const PILLAR_MAP = {
  policy: "Policy",
  economics: "Economics",
  technology: "Technology",
  clinical: "Clinical",
  equity: "Equity",
  general: "All",
  all: "All",
};

// ── build documents ─────────────────────────────────────────────────────────

const course = JSON.parse(
  readFileSync(join(__dir, "../content/course_five_pillars.json"), "utf8"),
);
const track1 = course.tracks.find((t) => t.slug === "foundations-the-framework");
if (!track1) {
  console.error("✗ Track 'foundations-the-framework' not found in course_five_pillars.json");
  process.exit(1);
}

const docs = track1.lessons.map((lesson) => ({
  _id: `academyModule-five-pillars-${lesson.slug}`,
  _type: "academyModule",
  title: lesson.title,
  slug: { _type: "slug", current: lesson.slug },
  courseTitle: "Five Pillars, One Imperative",
  moduleNumber: lesson.order,
  totalModules: track1.lessons.length,
  prevModuleSlug: lesson.order > 1 ? track1.lessons[lesson.order - 2].slug : undefined,
  nextModuleSlug:
    lesson.order < track1.lessons.length ? track1.lessons[lesson.order].slug : undefined,
  pillar: PILLAR_MAP[lesson.pillar] || "All",
  level: "Foundational",
  estimatedReadTime: lesson.estimatedMinutes,
  learningObjectives: (lesson.objectives || []).map((o) => o.text),
  summary: lesson.summary,
  body: lessonToBody(lesson),
}));

// ── report / post ────────────────────────────────────────────────────────────

console.log(`\n${COMMIT ? "POSTING" : "DRY RUN"} — ${docs.length} academyModule documents\n`);
for (const d of docs) {
  console.log(`  ${d._id}`);
  console.log(`    title: ${d.title}`);
  console.log(`    pillar: ${d.pillar} | module ${d.moduleNumber}/${d.totalModules} | ${d.estimatedReadTime}min`);
  console.log(`    body blocks: ${d.body.length}`);
}

if (process.argv.includes("--debug")) {
  console.log(`\n--- full body of doc 1 (${docs[0]._id}) ---`);
  console.log(JSON.stringify(docs[0].body, null, 1));
}

if (!COMMIT) {
  console.log(`\nDry run only — nothing written. Re-run with --commit to post to Sanity.`);
  process.exit(0);
}

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
const mutations = docs.map((doc) => ({ createOrReplace: doc }));

const res = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ mutations }),
});

const json = await res.json();
if (!res.ok) {
  console.error(`\n✗ Sanity API error (HTTP ${res.status}):`, JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log(`\n✅ Posted ${docs.length} documents to Sanity.`);
console.log(`   Transaction ID: ${json.transactionId}`);
console.log(`\nNext:`);
console.log(`  1. Set each Supabase lesson's sanity_slug (matches the slugs above):`);
console.log(`       cd frontend && node scripts/link-sanity-slugs.mjs --commit`);
console.log(`  2. Verify: node scripts/audit-courses.mjs`);
console.log(`  3. Check the docs in Studio: /studio/desk/academyModule`);
