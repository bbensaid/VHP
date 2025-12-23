// scripts/import.js
const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");

// Load env from root
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error("❌ ERROR: SANITY_WRITE_TOKEN is missing.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2023-10-01",
  useCdn: false,
});

// 1. GET FILE NAME
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ Usage: node scripts/import.js <filename.json>");
  console.error("   Note: The file must exist inside 'sanity/content/'");
  process.exit(1);
}

const fileName = args[0];

// 2. RESOLVE PATH (Enforced: sanity/content/)
const contentDir = path.resolve(process.cwd(), "sanity", "content");
const filePath = path.join(contentDir, fileName);

async function runImport() {
  try {
    // Ensure content directory exists
    if (!fs.existsSync(contentDir)) {
      console.error(`❌ Directory missing. Creating: ${contentDir}`);
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // Read File
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found in ${contentDir}: ${fileName}`);
    }

    const rawData = fs.readFileSync(filePath, "utf8");
    const articleData = JSON.parse(rawData);

    // Validate
    if (!articleData.title || !articleData.body) {
      throw new Error("Invalid JSON: Missing 'title' or 'body'.");
    }

    console.log(`🚀 Importing: "${articleData.title}"...`);

    // Delete existing slug to prevent duplicates (Upsert logic)
    await client.delete({
      query: `*[_type == "policyAnalysis" && slug.current == "${articleData.slug.current}"]`,
    });

    // Create
    const result = await client.create({
      _type: "policyAnalysis",
      ...articleData,
    });

    console.log(`✅ Success! Article Live. ID: ${result._id}`);
  } catch (err) {
    console.error("❌ Import Failed:", err.message);
  }
}

runImport();
