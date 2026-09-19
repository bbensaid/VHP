#!/usr/bin/env node
/**
 * Regression guard for the five-pillar framework.
 *
 * WHY THIS EXISTS
 * ───────────────
 * The book moved to five pillars + the Equity Imperative. The taxonomy
 * (lib/taxonomy/pillars.ts) moved with it. The rest of the app did not — about
 * sixty surfaces had hardcoded their own pillar lists, and most still carried
 * the six-pillar shape months later. Nothing checked them, so nothing caught it.
 *
 * Two failure modes, and the second is the one that actually broke things:
 *
 *   1. Equity rendered as a peer pillar (a six-item list, a grid-cols-6 pillar
 *      row, "six pillars" in prose).
 *   2. OPERATIONS SILENTLY DROPPED. Over and over, a five-item list turned out
 *      to be Policy/Economics/Technology/Clinical/Equity — Equity had taken
 *      Operations' seat. That shipped real bugs: the chat API rejected
 *      pillar="operations" outright, and the default content role never
 *      surfaced a single Operations document.
 *
 * Exit 0 = clean, 1 = drift found. Safe to run in CI.
 *
 *   node scripts/check-pillar-doctrine.mjs
 *
 * Adding a legitimate exception? Put it in ALLOWED below WITH A REASON. The
 * allowlist is the record of what is deliberate; everything else is drift.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, sep } from "path";
import { fileURLToPath } from "url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", "dist", "build", "coverage",
  "docs",            // prose documentation, swept separately
  "sanity-backups",
]);

const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".svg"]);

/**
 * Paths (repo-relative, prefix match) exempt from a given rule, each with the
 * reason it is legitimate. Never add one to silence a real finding.
 */
const ALLOWED = {
  // "six pillars" / "sixth pillar" prose that is CORRECT doctrine or unrelated.
  sixPillars: [
    ["lib/taxonomy/pillars.ts",                  "states the doctrine itself"],
    ["app/about/framework/page.tsx",             "teaches 'not a sixth pillar alongside them'"],
    ["app/faq/page.tsx",                         "answers 'is equity a sixth pillar?'"],
    ["app/mission/page.tsx",                     "'a sixth question... deliberately not a pillar'"],
    ["lib/data/pillar-topics.ts",                "equity hub tagline: 'not a sixth pillar'"],
    ["app/equity/page.tsx",                      "page metadata: 'not a sixth pillar'"],
    ["app/california-calaim/page.tsx",           "CalAIM's own six pillars — a different framework"],
    ["lib/data/changelog.ts",                    "historical changelog entry, accurate as written"],
    ["content/course_five_pillars.json",         "quiz distractors that teach the distinction"],
    ["content/_build_five_pillars_course.py",    "generator for the above"],
    ["content/SPECIMEN_lesson_01.json",          "lesson content teaching the distinction"],
    ["content/lesson_preview.html",              "preview of the above"],
    ["content/courses_tier3.json",               "'six pillars of precision medicine' — unrelated"],
    ["content/course_seed.json",                 "'six HIE pillars' — unrelated"],
    ["public/book-cover.svg",                    "comment explaining the beam is not a sixth pillar"],
    ["scripts/check-pillar-doctrine.mjs",        "this file"],
    ["components/research_text/",                "unimported .txt reference copies — flagged for deletion"],
  ],
  // Six-item pillar lists that are legitimately six FRAMEWORK ids
  // (5 pillars + the Equity Imperative), not six pillars.
  sixItemList: [
    ["lib/taxonomy/",                            "FrameworkId tagging — pillars + imperative"],
    ["app/api/chat/route.ts",                    "accepted scopes: 5 pillars + equity"],
    ["app/api/role-content/route.ts",            "content scopes: 5 pillars + equity"],
    ["scripts/import_academy.js",                "import tags: 5 pillars + equity + All"],
    ["scripts/import_course.js",                 "import tags: 5 pillars + equity"],
    ["sanity/schemaTypes/",                      "editor dropdowns: 5 pillars + the imperative"],
    ["app/advisory/training/page.tsx",           "built from PILLAR_IDS + equity"],
    ["app/academy/glossary/GlossaryClient.tsx",  "filter facet: 5 pillars + imperative last"],
    ["app/academy/courses/CoursesClient.tsx",    "filter facet: 5 pillars + imperative last"],
    ["app/connect/directory/DirectoryClient.tsx","filter facet: 5 pillars + imperative last"],
    ["app/connect/ask/AskHTRClient.tsx",         "picker: 5 pillars + imperative + General"],
    ["components/VideoLibrary.tsx",              "grouping: 5 pillars + imperative + General"],
    ["components/academy/AcademyCard.tsx",       "style map keyed by label, needs all six keys"],
    ["components/templates/ArticleEngine.tsx",   "style map keyed by label, needs all six keys"],
    ["components/templates/PillarHub.tsx",       "theme map, needs the imperative's own theme"],
    ["components/PillarSidebar.tsx",             "routing config; PILLAR_IDS filters equity out"],
    ["components/Footer.tsx",                    "equityImperative declared separately"],
    ["components/HomeContent.tsx",               "built from PILLARS + separate imperative"],
    ["app/the-wire/WireFeed.tsx",                "PILLAR_LABELS + separate equity flag"],
    ["scripts/check-pillar-doctrine.mjs",        "this file"],
    ["components/research_text/",                "unimported .txt reference copies"],
    ["lib/advisory-data.ts",                     "service tags: 5 pillars + the imperative"],
    ["components/EmailCaptureBar.tsx",           "segmentation contexts: 5 pillars + imperative"],
    ["scripts/audit-chapterref-blast.mjs",       "chapter->framework-id map; ch.10 is the imperative"],
  ],
  /**
   * Per-simulator scoring axes that merely share some words with the pillars.
   * The tell is "financial" where the framework says "economics" — these are
   * program-specific rubrics (Act 167, Act 68, CalAIM, Oregon CCO, CMS Rural),
   * not the HTR framework, and must not be conformed to it.
   */
  otherVocabulary: [
    ["app/vermont-act-167/",     "Act 167 simulator scoring axes"],
    ["app/vermont-act-68/",      "Act 68 simulator scoring axes"],
    ["app/california-calaim/",   "CalAIM simulator scoring axes"],
    ["app/oregon-cco/",          "Oregon CCO simulator scoring axes"],
    ["app/dashboard/simulator/", "CMS Rural simulator scoring axes"],
    ["app/htr-simulator/",       "uses 'financial' for its economics input axis"],
  ],
};

const PILLARS = ["policy", "technology", "economics", "clinical", "operations"];

const failures = [];
const allowed = (rule, rel) =>
  ALLOWED[rule].some(([prefix]) => rel.startsWith(prefix));

// ─── 1. The taxonomy itself must hold exactly five ──────────────────────────
{
  const src = readFileSync(join(ROOT, "lib/taxonomy/pillars.ts"), "utf8");
  const arr = src.match(/export const PILLARS[\s\S]*?\n\] as const;/);
  if (!arr) {
    failures.push("lib/taxonomy/pillars.ts: could not find the PILLARS array");
  } else {
    const ids = [...arr[0].matchAll(/^\s{4}id: "([a-z]+)",/gm)].map((m) => m[1]);
    if (ids.length !== 5) {
      failures.push(`lib/taxonomy/pillars.ts: PILLARS has ${ids.length} entries, expected 5 — got ${ids.join(", ")}`);
    }
    if (ids.includes("equity")) {
      failures.push("lib/taxonomy/pillars.ts: 'equity' is inside PILLARS — it must stay in EQUITY_IMPERATIVE");
    }
    for (const p of PILLARS) {
      if (!ids.includes(p)) failures.push(`lib/taxonomy/pillars.ts: PILLARS is missing '${p}'`);
    }
  }
  if (!src.includes("export const EQUITY_IMPERATIVE")) {
    failures.push("lib/taxonomy/pillars.ts: EQUITY_IMPERATIVE is no longer exported separately");
  }
}

// ─── 2. Walk the tree ───────────────────────────────────────────────────────
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const SIX_PILLARS_RE = /\b(six[- ]pillars?|6[- ]pillars?|sixth pillar|equity pillar)\b/i;

/**
 * "...not a sixth pillar" is the doctrine being STATED, not violated, and the
 * codebase says it deliberately in a dozen places. Only flag the phrase when
 * it is used affirmatively.
 */
const NEGATED_RE =
  /\b(not|never|no longer|rather than|instead of|isn't|is not|nor)\b[^.]{0,60}\b(six[- ]pillars?|sixth pillar|equity pillar)\b|\b(six[- ]pillars?|sixth pillar|equity pillar)\b[^.]{0,40}\b(is not|are not|no longer|superseded|deprecated)\b/i;

/** "6 framework ids" and "five-pillar" phrasings are correct, not drift. */
const FRAMEWORK_ID_RE = /framework ids?|five[- ]pillars?/i;

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const dot = file.slice(file.lastIndexOf("."));
  if (!EXTS.has(dot) && !rel.endsWith(".json")) continue;
  if (rel.endsWith(".json") && !rel.startsWith("content/")) continue;

  // This file quotes the patterns it hunts for; checking it finds only itself.
  if (rel === "scripts/check-pillar-doctrine.mjs") continue;

  let src;
  try { src = readFileSync(file, "utf8"); } catch { continue; }
  const lines = src.split("\n");

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;

    // (a) Stale prose.
    if (
      SIX_PILLARS_RE.test(line) &&
      !NEGATED_RE.test(line) &&
      !FRAMEWORK_ID_RE.test(line) &&
      !allowed("sixPillars", rel)
    ) {
      failures.push(`${at}: six-pillar language — "${line.trim().slice(0, 100)}"`);
    }

    // (b) A pillar list containing equity as a peer.
    const lower = line.toLowerCase();
    const named = PILLARS.filter((p) => lower.includes(`"${p}"`) || lower.includes(`'${p}'`));
    const hasEquity = lower.includes('"equity"') || lower.includes("'equity'");

    if (named.length >= 3 && !(allowed("otherVocabulary", rel) && lower.includes("financial"))) {
      if (hasEquity && !allowed("sixItemList", rel)) {
        failures.push(`${at}: pillar list includes "equity" as a peer — "${line.trim().slice(0, 100)}"`);
      }
      // (c) The Operations-dropped bug: four+ pillars named, equity present,
      //     operations absent. This is the shape that shipped real bugs.
      if (named.length >= 3 && hasEquity && !named.includes("operations")) {
        failures.push(
          `${at}: OPERATIONS MISSING from a pillar list that includes equity — "${line.trim().slice(0, 100)}"`
        );
      }
    }

    // (d) A six-column grid in a pillar context.
    if (/grid-cols-6/.test(line) && /pillar/i.test(lines.slice(Math.max(0, i - 6), i + 7).join("\n"))) {
      failures.push(`${at}: grid-cols-6 in a pillar context — a pillar row has five columns`);
    }
  });
}

// ─── Report ─────────────────────────────────────────────────────────────────
if (failures.length) {
  console.error(`\n❌ ${failures.length} pillar-doctrine violation(s):\n`);
  for (const f of failures) console.error(`  ${f}`);
  console.error(
    "\nThe framework is five pillars — Policy, Technology, Economics, Clinical,\n" +
    "Operations — each held to the Equity Imperative, which is a cross-cutting\n" +
    "test and never a sixth pillar. Build lists from PILLARS / PILLAR_IDS in\n" +
    "lib/taxonomy/pillars.ts rather than writing another literal.\n"
  );
  process.exit(1);
}
console.log("✅ Pillar doctrine clean: five pillars, Equity Imperative separate, Operations present.");
