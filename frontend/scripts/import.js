const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");
const { v4: uuidv4 } = require("uuid");

// --- 1. CONFIGURATION LOADING ---
// Manually scans for .env.local to ensure reliability across environments
function loadEnv() {
  const paths = [
    path.resolve(__dirname, ".env.local"), // scripts/.env.local
    path.resolve(__dirname, "../.env.local"), // frontend/.env.local
    path.resolve(__dirname, "../../.env.local"), // root/.env.local
  ];

  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      content.split("\n").forEach((line) => {
        const [key, ...values] = line.split("=");
        if (key && values.length > 0) {
          // Strip quotes and whitespace
          const val = values
            .join("=")
            .trim()
            .replace(/^["']|["']$/g, "");
          process.env[key.trim()] = val;
        }
      });
      return; // Stop once found
    }
  }
}

loadEnv();

// --- 2. VALIDATION ---
if (!process.env.SANITY_API_TOKEN) {
  console.error("❌ Error: .env.local found, but SANITY_API_TOKEN is missing.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const CONTENT_DIR = path.join(__dirname, "../sanity/content");

// --- 3. HELPER: Data Sanitization ---
function sanitizeBlock(block) {
  // Ensure unique keys for Sanity
  if (!block._key) block._key = uuidv4().substring(0, 8);

  // Convert AI "Clean Arrays" to Sanity "Stringified JSON"
  if (block._type === "code") {
    if (Array.isArray(block.code)) block.code = JSON.stringify(block.code);
    if (!block.language) block.language = "json";
  }

  // Recurse for children
  if (block.children && Array.isArray(block.children)) {
    block.children = block.children.map((child) => {
      if (!child._key) child._key = uuidv4().substring(0, 8);
      return child;
    });
  }
  return block;
}

// --- 4. MAIN EXECUTION ---
async function importDocs() {
  const targetFile = process.argv[2];

  if (!targetFile) {
    console.error("❌ Usage: node scripts/import.js <filename.json>");
    process.exit(1);
  }

  const fullPath = path.join(CONTENT_DIR, targetFile);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Error: File not found at ${fullPath}`);
    process.exit(1);
  }

  console.log(`Processing: ${targetFile}...`);
  try {
    const rawData = fs.readFileSync(fullPath, "utf8");

    // Extract valid JSON from potential AI wrapper text
    const firstBrace = rawData.indexOf("{");
    const lastBrace = rawData.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1)
      throw new Error("No valid JSON object found.");

    const doc = JSON.parse(rawData.substring(firstBrace, lastBrace + 1));

    // Process Body
    if (doc.body && Array.isArray(doc.body)) {
      doc.body = doc.body.map(sanitizeBlock);
    }

    // Upload to Sanity
    const res = await client.createOrReplace({
      _id: `drafts.${doc.slug.current}`,
      _type: "policyAnalysis",
      ...doc,
    });

    console.log(`✅ Imported: "${doc.title}"`);
  } catch (err) {
    console.error(`❌ Failed: ${err.message}`);
    if (err.message.includes("Insufficient permissions")) {
      console.error(
        "   -> Hint: Check if your token has 'Editor' permissions."
      );
    }
  }
}

importDocs();
