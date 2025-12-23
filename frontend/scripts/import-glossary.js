// scripts/import-glossary.js
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

const fileName = "glossary_seed.json";
const filePath = path.resolve(process.cwd(), "sanity/content", fileName);

async function importGlossary() {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `File not found: ${filePath}. Make sure glossary_seed.json is in sanity/content/`
      );
    }

    const rawData = fs.readFileSync(filePath, "utf8");
    const terms = JSON.parse(rawData);

    console.log(`🚀 Importing ${terms.length} glossary terms...`);

    // Create a transaction to do it in one batch
    const transaction = client.transaction();

    terms.forEach((item) => {
      // Create a deterministic ID based on the term (prevents duplicates)
      const docId = `glossary-${item.term
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")}`;

      transaction.createOrReplace({
        _id: docId,
        _type: "definition",
        term: item.term,
        description: item.description,
      });
    });

    await transaction.commit();
    console.log(`✅ Success! Imported ${terms.length} terms.`);
  } catch (err) {
    console.error("❌ Import Failed:", err.message);
  }
}

importGlossary();
