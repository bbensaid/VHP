// scripts/import_academy.js
// Usage: node scripts/import_academy.js <filename.json>
// File must exist inside sanity/content/academy/

const { createClient } = require("@sanity/client");
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

// ── Env validation ────────────────────────────────────────────────────────────
const { SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET } = process.env;

if (!SANITY_API_TOKEN) {
  console.error("❌ SANITY_API_TOKEN is missing from .env.local");
  process.exit(1);
}
if (!NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing from .env.local");
  process.exit(1);
}

// ── Sanity client ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  token: SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Argument parsing ──────────────────────────────────────────────────────────
const [filename] = process.argv.slice(2);
if (!filename) {
  console.error("❌ Usage: node scripts/import_academy.js <filename.json>");
  console.error("   File must exist inside: sanity/content/academy/");
  process.exit(1);
}

const CONTENT_DIR = path.resolve(__dirname, "../sanity/content/academy");
const filePath = path.join(CONTENT_DIR, filename);

// ── Constants ─────────────────────────────────────────────────────────────────
const REQUIRED_FIELDS = ["title", "slug", "courseTitle", "moduleNumber", "summary", "body"];
const VALID_PILLARS   = ["Policy", "Economics", "Technology", "Clinical", "Equity", "All"];
const VALID_LEVELS    = ["Foundational", "Intermediate", "Advanced"];
const MIN_BODY_BLOCKS = 35;

// ── Sanitize body ─────────────────────────────────────────────────────────────
// Must run BEFORE validation so checks operate on clean data.
//
// Two things to fix in AI-generated content:
//   1. Missing _key on blocks/children (Sanity requires unique keys on all array items)
//   2. `code` blocks where AI emits an array of objects instead of a string.
//      Sanity attribute names must match /^\$?[a-zA-Z0-9_-]+$/ — human-readable
//      keys like "Typical U.S. Adoption" are rejected. Serialize to JSON string.
function sanitizeBody(body) {
  return body.map((block) => {
    if (!block._key) block._key = Math.random().toString(36).slice(2, 10);

    if (block._type === "code" && Array.isArray(block.code)) {
      block.code = JSON.stringify(block.code, null, 2);
      if (!block.language) block.language = "json";
    }

    if (Array.isArray(block.children)) {
      block.children = block.children.map((child) => ({
        ...child,
        _key: child._key || Math.random().toString(36).slice(2, 10),
      }));
    }

    return block;
  });
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(data) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) errors.push(`Missing required field: "${field}"`);
  }

  if (data.pillar && !VALID_PILLARS.includes(data.pillar)) {
    errors.push(`Invalid pillar "${data.pillar}". Must be one of: ${VALID_PILLARS.join(", ")}`);
  }

  if (data.level && !VALID_LEVELS.includes(data.level)) {
    errors.push(`Invalid level "${data.level}". Must be one of: ${VALID_LEVELS.join(", ")}`);
  }

  if (!Array.isArray(data.body) || data.body.length < MIN_BODY_BLOCKS) {
    errors.push(
      `Body must have at least ${MIN_BODY_BLOCKS} blocks (found ${
        Array.isArray(data.body) ? data.body.length : 0
      })`
    );
  }

  if (Array.isArray(data.body)) {
    const keys = data.body.map((b) => b._key);
    if (new Set(keys).size !== keys.length) {
      errors.push("Body blocks contain duplicate _key values");
    }
  }

  return errors;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function run() {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  let moduleData;
  try {
    moduleData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`❌ Invalid JSON in ${filename}: ${err.message}`);
    process.exit(1);
  }

  moduleData._type = "academyModule";

  if (Array.isArray(moduleData.body)) {
    moduleData.body = sanitizeBody(moduleData.body);
  }

  const errors = validate(moduleData);
  if (errors.length > 0) {
    console.error("❌ Validation failed:");
    errors.forEach((e) => console.error(`   • ${e}`));
    process.exit(1);
  }

  console.log(`🎓 Importing: "${moduleData.title}"`);
  console.log(`   Course  : ${moduleData.courseTitle}`);
  console.log(`   Module# : ${moduleData.moduleNumber}`);
  console.log(`   Pillar  : ${moduleData.pillar || "not set"}`);
  console.log(`   Blocks  : ${moduleData.body.length}`);

  try {
    // createOrReplace is atomic and idempotent — safe to re-run without data loss.
    // delete+create is not: if create fails, the document is already gone.
    const docId = `academyModule-${moduleData.slug.current}`;
    const result = await client.createOrReplace({ _id: docId, ...moduleData });
    console.log(`✅ Imported. Sanity ID: ${result._id}`);
    console.log(`   Preview: /academy/modules/${moduleData.slug.current}`);
  } catch (err) {
    console.error(`❌ Sanity error: ${err.message}`);
    if (err.message.includes("Insufficient permissions")) {
      console.error("   → Check that your token has Editor permissions.");
    }
    process.exit(1);
  }
}

run();
