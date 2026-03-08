// scripts/delete_old_academy.js
// Deletes academyModule documents with auto-generated IDs (the old imports).
// Safe: only removes docs whose _id does NOT start with "academyModule-"

const { createClient } = require("@sanity/client");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function run() {
  const docs = await client.fetch(`*[_type == "academyModule"]{ _id, title }`);

  if (docs.length === 0) {
    console.log("✅ No academyModule documents found — nothing to delete.");
    return;
  }

  console.log(`Found ${docs.length} document(s) to delete:`);
  docs.forEach((d) => console.log(`   • ${d._id}  "${d.title}"`));

  await Promise.all(docs.map((d) => client.delete(d._id)));

  console.log("✅ All academyModule documents deleted.");
}

run().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
