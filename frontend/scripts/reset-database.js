// scripts/reset-database.js
const { createClient } = require("next-sanity");
const path = require("path");
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

async function nukeDatabase() {
  try {
    console.log("⚠️  STARTING DATABASE RESET...");

    // 1. Find all Policy Analysis documents
    const query = '*[_type == "policyAnalysis"]';
    const documents = await client.fetch(query);

    if (documents.length === 0) {
      console.log("✅ Database is already empty.");
      return;
    }

    console.log(`Found ${documents.length} documents. Deleting...`);

    // 2. Delete them in a transaction
    const transaction = client.transaction();
    documents.forEach((doc) => {
      transaction.delete(doc._id);
    });

    await transaction.commit();
    console.log(`🔥 SUCCESS: Deleted ${documents.length} articles.`);
    console.log("The database is now clean.");
  } catch (err) {
    console.error("❌ Reset Failed:", err.message);
  }
}

nukeDatabase();
