#!/usr/bin/env node
/**
 * Audit (and optionally repair) the live Supabase + Sanity copies of the two
 * Five Pillars lessons whose Academy copy carried the arithmetically-impossible
 * "/12 per domain" and "60 of 120" VBC readiness figures.
 *
 * Ground truth: frontend/components/research/VBCReadinessAssessment.tsx is
 * 6 domains x 5 dimensions scored 0-4 => max 20 per domain, reported as a
 * percentage. The book (HTR_Book_v42 ch.7 s7.4.2) states the corrected form:
 *   Domain 2 (Data and Technology) 25-45%
 *   Domain 3 (care delivery)       40-60%
 *   bands: 80%+ Global Budget Readiness / 60-79% Advanced / below 60% not ready
 *
 * Usage (from frontend/):
 *   node scripts/audit-vbc-scale-live.mjs            # read-only audit
 *   node scripts/audit-vbc-scale-live.mjs --commit   # also repair Supabase+Sanity
 *
 * MUST live in frontend/scripts/ so node can resolve @supabase/supabase-js.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const COMMIT = process.argv.includes("--commit");

// ---------- env (tolerant: `KEY =value`, `KEY=value`, quoted) ----------
function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}
const env = loadEnv(join(ROOT, ".env.local"));

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const SANITY_PROJECT = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_VERSION = env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01";
const SANITY_TOKEN = env.SANITY_API_TOKEN;

for (const [k, v] of Object.entries({
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY,
  NEXT_PUBLIC_SANITY_PROJECT_ID: SANITY_PROJECT,
  SANITY_API_TOKEN: SANITY_TOKEN,
})) {
  if (!v) throw new Error(`Missing credential: ${k}`);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ---------- the stale patterns we are hunting ----------
const STALE = [
  /out of 12/gi,
  /of a possible 12/gi,
  /3-7 ?\/ ?12/gi,
  /of 120/gi,
  /\b3 to 7\b/gi,
  /\b8 to 12\b/gi,
  /\b8-12\b/gi,
  // report s3 fixed this in source but it was never re-published: the tool's
  // scale starts at 0 ("Not Started"), not 1.
  /each rated 1 to 4/gi,
];

function staleHits(text) {
  const hits = [];
  for (const re of STALE) {
    const m = String(text).match(re);
    if (m) hits.push(...m);
  }
  return hits;
}

function scan(obj, path = "", out = []) {
  if (typeof obj === "string") {
    const h = staleHits(obj);
    if (h.length) out.push({ path, hits: h, text: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => scan(v, `${path}[${i}]`, out));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) scan(v, path ? `${path}.${k}` : k, out);
  }
  return out;
}

// ---------- the corrected source of truth ----------
const COURSE = JSON.parse(
  readFileSync(join(ROOT, "content", "course_five_pillars.json"), "utf8"),
);
const LESSON_SLUGS = [
  "apm-readiness-vbc-financial-modeling",
  "economics-as-design-vs-management",
];
const sourceLessons = new Map();
for (const t of COURSE.tracks) {
  for (const l of t.lessons) {
    if (LESSON_SLUGS.includes(l.slug)) sourceLessons.set(l.slug, l);
  }
}

// ---------- Sanity helpers ----------
async function groq(query) {
  const url =
    `https://${SANITY_PROJECT}.api.sanity.io/v${SANITY_VERSION}/data/query/` +
    `${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } });
  if (!r.ok) throw new Error(`Sanity query ${r.status}: ${await r.text()}`);
  return (await r.json()).result;
}

async function mutate(mutations) {
  const url =
    `https://${SANITY_PROJECT}.api.sanity.io/v${SANITY_VERSION}/data/mutate/` +
    `${SANITY_DATASET}?returnIds=true`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SANITY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });
  if (!r.ok) throw new Error(`Sanity mutate ${r.status}: ${await r.text()}`);
  return r.json();
}

// ---------- text-level repair, mirroring the source fix exactly ----------
const TEXT_FIXES = [
  [
    /A total score below 60 of 120 signals the organization is not ready for full downside risk\./g,
    "The platform reports an overall readiness percentage -- the average across all " +
      "answered dimensions -- rather than a raw point total: 80%+ indicates Global Budget " +
      "Readiness, 60-79% indicates Advanced stage (12-18 months to readiness), and below " +
      "60% signals the organization is not ready for full downside risk.",
  ],
  [
    /most Vermont hospitals score only 3 to 7 of a possible 12 points in this domain, while Blueprint-participating patient-centered medical homes with active Community Health Team support score 8 to 12 in Domain 3 \(care delivery\)/g,
    "most Vermont hospitals score only 25-45% in this domain, while Blueprint-participating " +
      "patient-centered medical homes with active Community Health Team support score " +
      "40-60% in Domain 3 (care delivery)",
  ],
  [
    /Community Health Team support score 8-12 out of 12 on the care-delivery readiness domain/g,
    "Community Health Team support score 40-60% on the care-delivery readiness domain",
  ],
  [
    /Most Vermont hospitals score only 3-7 out of 12 on the data-and-technology domain/g,
    "Most Vermont hospitals score only 25-45% on the data-and-technology domain",
  ],
  [
    /most Vermont hospitals score only 3 to 7 out of 12 possible points on the Data and Technology domain/g,
    "most Vermont hospitals score only 25-45% on the Data and Technology domain",
  ],
  [
    /most hospitals scoring 3-7 out of 12 on the data-and-technology domain/g,
    "most hospitals scoring 25-45% on the data-and-technology domain",
  ],
  [/^3-7 \/ 12$/g, "25-45%"],
  // report s3: the tool's scale is 0-4 ("Not Started" = 0), not 1-4. Fixed in
  // source, never published — repair it live in the same pass.
  [/each rated 1 to 4/g, "each rated 0 to 4"],
];

function repairText(s) {
  let out = String(s);
  for (const [re, to] of TEXT_FIXES) out = out.replace(re, to);
  return out;
}

function repairDeep(node) {
  if (typeof node === "string") return repairText(node);
  if (Array.isArray(node)) return node.map(repairDeep);
  if (node && typeof node === "object") {
    const o = {};
    for (const [k, v] of Object.entries(node)) o[k] = repairDeep(v);
    return o;
  }
  return node;
}

// ---------- main ----------
const line = (c = "-") => console.log(c.repeat(78));

console.log(`\nVBC readiness scale — LIVE audit${COMMIT ? " + REPAIR" : " (read-only)"}`);
line("=");

// --- Supabase ---
const { data: lessons, error: lErr } = await db
  .from("lessons")
  .select("id, slug, title, sanity_slug, is_published, content_blocks, track_id")
  .in("slug", LESSON_SLUGS);
if (lErr) throw new Error(`Supabase lessons: ${lErr.message}`);

console.log(`\nSUPABASE — lessons matching the two affected slugs: ${lessons.length}`);
let supabaseStale = 0;
for (const l of lessons) {
  const found = scan(l.content_blocks ?? []);
  supabaseStale += found.length;
  console.log(
    `  ${l.slug}\n    row id=${l.id}  published=${l.is_published}  sanity_slug=${l.sanity_slug ?? "NULL"}` +
      `\n    stale content_blocks strings: ${found.length}`,
  );
  for (const f of found) console.log(`      - ${f.path}: ${JSON.stringify(f.hits)}`);
}

// --- Supabase quizzes (a SEPARATE table tree: quizzes -> quiz_questions ->
//     quiz_options). The quiz explanation text carries the same figure and is
//     NOT part of content_blocks, so it must be audited independently. ---
const lessonIds = lessons.map((l) => l.id);
const { data: quizzes, error: qErr } = await db
  .from("quizzes")
  .select("id, lesson_id")
  .in("lesson_id", lessonIds);
if (qErr) throw new Error(`Supabase quizzes: ${qErr.message}`);
const quizIds = (quizzes ?? []).map((q) => q.id);

const { data: questions, error: qqErr } = await db
  .from("quiz_questions")
  .select("id, quiz_id, question, explanation")
  .in("quiz_id", quizIds);
if (qqErr) throw new Error(`Supabase quiz_questions: ${qqErr.message}`);

const { data: options, error: qoErr } = await db
  .from("quiz_options")
  .select("id, question_id, text, explanation")
  .in("question_id", (questions ?? []).map((q) => q.id));
if (qoErr) throw new Error(`Supabase quiz_options: ${qoErr.message}`);

const staleQuestions = (questions ?? [])
  .map((r) => ({ row: r, found: scan({ question: r.question, explanation: r.explanation }) }))
  .filter((x) => x.found.length);
const staleOptions = (options ?? [])
  .map((r) => ({ row: r, found: scan({ text: r.text, explanation: r.explanation }) }))
  .filter((x) => x.found.length);

console.log(
  `\nSUPABASE QUIZZES — quizzes=${quizzes?.length ?? 0} questions=${questions?.length ?? 0} options=${options?.length ?? 0}`,
);
console.log(`  stale quiz_questions rows: ${staleQuestions.length}`);
for (const x of staleQuestions)
  for (const f of x.found) console.log(`    - q:${x.row.id} ${f.path}: ${JSON.stringify(f.hits)}`);
console.log(`  stale quiz_options rows: ${staleOptions.length}`);
for (const x of staleOptions)
  for (const f of x.found) console.log(`    - o:${x.row.id} ${f.path}: ${JSON.stringify(f.hits)}`);

const quizStale = staleQuestions.length + staleOptions.length;

// --- Sanity ---
const ids = LESSON_SLUGS.map((s) => `academyModule-five-pillars-${s}`);
const docs = await groq(
  `*[_type == "academyModule" && _id in ${JSON.stringify(ids)}]`,
);
console.log(`\nSANITY — academyModule docs found: ${docs.length} of ${ids.length}`);
let sanityStale = 0;
for (const d of docs) {
  const found = scan(d.body ?? []);
  sanityStale += found.length;
  console.log(
    `  ${d._id}\n    title=${JSON.stringify(d.title)}  blocks=${(d.body ?? []).length}` +
      `\n    stale body strings: ${found.length}`,
  );
  for (const f of found) console.log(`      - ${f.path}: ${JSON.stringify(f.hits)}`);
}

// Also sweep the WHOLE dataset so we do not miss a copy under another id.
// NOTE: GROQ `match` is token-based ("*of 120*" matches the bare word "of"),
// so it cannot be used here. Pull every academyModule body and regex in JS
// against the SPECIFIC VBC-readiness phrasings only.
const WIDE_PATTERNS = [
  /\bout of 12\b/i,
  /\bof a possible 12\b/i,
  /3-7\s*\/\s*12/i,
  /below 60 of 120/i,
  /score[sd]?\s+(only\s+)?3[- ]?(to\s+)?7\b/i,
  /score[sd]?\s+8[- ]?(to\s+)?12\b/i,
];
const allModules = await groq(
  `*[_type == "academyModule"]{_id, title, "txt": pt::text(body), body}`,
);
const wide = allModules.filter((d) => {
  const hay = `${d.txt ?? ""} ${JSON.stringify(d.body ?? [])}`;
  return WIDE_PATTERNS.some((re) => re.test(hay));
});
console.log(
  `\nSANITY — scanned ${allModules.length} academyModule docs dataset-wide;` +
    ` docs still carrying a VBC-readiness stale pattern: ${wide.length}`,
);
for (const d of wide) console.log(`  - ${d._id} :: ${d.title}`);

line("=");
console.log(
  `TOTALS  supabase_stale_strings=${supabaseStale}  supabase_quiz_stale_rows=${quizStale}` +
    `  sanity_stale_strings=${sanityStale}  sanity_wide_docs=${wide.length}`,
);

// ---------- preview: show exactly what the repair WOULD do ----------
function preview(label, found) {
  for (const f of found) {
    const after = repairText(f.text);
    const ok = staleHits(after).length === 0;
    console.log(`\n  ${label} ${f.path}   ${ok ? "[resolves]" : "[!! STILL STALE]"}`);
    console.log(`    BEFORE: ${f.text.slice(0, 320)}${f.text.length > 320 ? "…" : ""}`);
    console.log(`    AFTER : ${after.slice(0, 320)}${after.length > 320 ? "…" : ""}`);
  }
}

line("=");
console.log("REPAIR PREVIEW");
for (const l of lessons) preview(`supabase/${l.slug}`, scan(l.content_blocks ?? []));
for (const d of docs) preview(`sanity/${d._id}`, scan(d.body ?? []));

if (!COMMIT) {
  console.log("\n(read-only — pass --commit to repair)");
  process.exit(0);
}

// ---------- repair ----------
if (supabaseStale === 0 && quizStale === 0 && sanityStale === 0 && wide.length === 0) {
  console.log("\nNothing stale live. No write performed.");
  process.exit(0);
}

line("=");
console.log("REPAIRING\n");

// Supabase: SURGICAL text repair of the live content_blocks. We deliberately do
// NOT overwrite content_blocks wholesale from course_five_pillars.json — the live
// rows may carry unrelated drift, and replacing them would be a large unreviewed
// change. Only the stale VBC-readiness strings are rewritten.
//
// sanity_slug is NOT touched: lib/sanity-fetch.ts resolves bodies by
// `slug.current in $slugs`, and both rows already hold the correct bare lesson
// slug. Rewriting it to the Sanity _id would BREAK the link.
for (const l of lessons) {
  const repaired = repairDeep(l.content_blocks ?? []);
  if (JSON.stringify(repaired) === JSON.stringify(l.content_blocks ?? [])) {
    console.log(`  supabase: ${l.slug} unchanged`);
    continue;
  }
  const { error } = await db
    .from("lessons")
    .update({ content_blocks: repaired })
    .eq("id", l.id);
  if (error) throw new Error(`Supabase update ${l.slug}: ${error.message}`);
  console.log(`  supabase: ${l.slug} content_blocks surgically repaired`);

  if (!l.sanity_slug) {
    console.log(`  !! supabase: ${l.slug} has NULL sanity_slug — app would render thin blocks`);
  }
}

// Supabase quizzes: surgical text repair of question/explanation text.
for (const { row } of staleQuestions) {
  const patch = {
    question: repairText(row.question ?? ""),
    explanation: repairText(row.explanation ?? ""),
  };
  const { error } = await db.from("quiz_questions").update(patch).eq("id", row.id);
  if (error) throw new Error(`Supabase quiz_questions ${row.id}: ${error.message}`);
  console.log(`  supabase: quiz_question ${row.id} repaired`);
}
for (const { row } of staleOptions) {
  const patch = {
    text: repairText(row.text ?? ""),
    explanation: repairText(row.explanation ?? ""),
  };
  const { error } = await db.from("quiz_options").update(patch).eq("id", row.id);
  if (error) throw new Error(`Supabase quiz_options ${row.id}: ${error.message}`);
  console.log(`  supabase: quiz_option ${row.id} repaired`);
}

// Sanity: surgical text repair of the existing body (preserves _key/_type and
// every block the renderer depends on — no re-conversion, no block churn).
const muts = [];
for (const d of docs) {
  const repaired = repairDeep(d);
  if (JSON.stringify(repaired) !== JSON.stringify(d)) {
    muts.push({ createOrReplace: repaired });
    console.log(`  sanity: ${d._id} queued (surgical text repair)`);
  } else {
    console.log(`  sanity: ${d._id} unchanged`);
  }
}
if (muts.length) {
  const res = await mutate(muts);
  console.log(`  sanity: mutation applied, ids=${JSON.stringify(res.results?.map((r) => r.id) ?? [])}`);
}

console.log("\nRepair complete — re-run without --commit to verify.");
