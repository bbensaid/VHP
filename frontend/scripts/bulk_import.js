const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// --- 1. CONFIGURATION LOADING ---
function loadEnv() {
  const paths = [
    path.resolve(__dirname, ".env.local"),
    path.resolve(__dirname, "../.env.local"),
    path.resolve(__dirname, "../../.env.local"),
  ];

  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      content.split("\n").forEach((line) => {
        const [key, ...values] = line.split("=");
        if (key && values.length > 0) {
          const val = values.join("=").trim().replace(/^["']|["']$/g, "");
          process.env[key.trim()] = val;
        }
      });
      return;
    }
  }
}

loadEnv();

if (!process.env.SANITY_API_TOKEN) {
  console.error("❌ Error: SANITY_API_TOKEN is missing in .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2026-02-19",
  useCdn: false,
});

// Adjusted to look for /sanity/content relative to the script location
const CONTENT_DIR = path.join(__dirname, "../sanity/content");

function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

// --- 2. HELPER: Data Sanitization (Maintained from your original) ---
function sanitizeBlock(block) {
  if (!block._key) block._key = generateKey();

  if (block._type === "code") {
    if (Array.isArray(block.code)) {
      block.code = JSON.stringify(block.code, null, 2);
    }
    if (!block.language) block.language = "json";
  }

  if (block._type === "video" && block.url && block.url.startsWith("[")) {
    const match = block.url.match(/\((https?:\/\/[^)]+)\)/);
    if (match && match[1]) block.url = match[1];
  }

  if (block.children && Array.isArray(block.children)) {
    block.children = block.children.map((child) => {
      if (!child._key) child._key = generateKey();
      return child;
    });
  }
  return block;
}

// --- 3. BULK EXECUTION LOGIC ---
async function bulkImport() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Error: Content directory not found at ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith(".json"));
  
  if (files.length === 0) {
    console.log("⚠️ No JSON files found in sanity/content.");
    return;
  }

  console.log(`🚀 Found ${files.length} files. Starting bulk upload...`);

  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    
    try {
      const rawData = fs.readFileSync(fullPath, "utf8");
      const firstBrace = rawData.indexOf("{");
      const lastBrace = rawData.lastIndexOf("}");
      
      if (firstBrace === -1 || lastBrace === -1) {
        console.warn(`⏩ Skipping ${file}: No valid JSON object found.`);
        continue;
      }

      const doc = JSON.parse(rawData.substring(firstBrace, lastBrace + 1));

      // Use slug as _id to ensure 'createOrReplace' performs an overwrite
      const documentId = doc.slug?.current || file.replace(".json", "");

      if (doc.body && Array.isArray(doc.body)) {
        doc.body = doc.body.map(sanitizeBlock);
      }

      await client.createOrReplace({
        _id: documentId,
        _type: "policyAnalysis",
        ...doc,
      });

      console.log(`✅ Imported/Updated: "${doc.title}" (${file})`);
    } catch (err) {
      console.error(`❌ Failed ${file}: ${err.message}`);
    }
  }

  console.log("\n✨ Bulk import process complete.");
}

bulkImport();