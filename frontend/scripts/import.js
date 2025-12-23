// scripts/import.js (UPDATED FOR BATCH PROCESSING)
const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");
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

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ Usage: node scripts/import.js <filename.json>");
  process.exit(1);
}

const fileName = args[0];
const contentDir = path.resolve(process.cwd(), "sanity", "content");
const filePath = path.join(contentDir, fileName);

async function runImport() {
  try {
    if (!fs.existsSync(filePath))
      throw new Error(`File not found: ${filePath}`);

    const rawData = fs.readFileSync(filePath, "utf8");
    const inputData = JSON.parse(rawData);

    // Convert single object to array for consistent processing
    const articles = Array.isArray(inputData) ? inputData : [inputData];

    console.log(`🚀 Found ${articles.length} articles to import...`);

    for (const article of articles) {
      if (!article.title || !article.body) {
        console.warn(`⚠️ Skipping invalid article: Missing title or body`);
        continue;
      }

      console.log(`   Processing: "${article.title}"...`);

      // Delete existing to prevent duplicates
      await client.delete({
        query: `*[_type == "policyAnalysis" && slug.current == "${article.slug.current}"]`,
      });

      // Create new
      await client.create({
        _type: "policyAnalysis",
        ...article,
      });
    }

    console.log(`✅ Batch Complete!`);
  } catch (err) {
    console.error("❌ Import Failed:", err.message);
  }
}

runImport();
