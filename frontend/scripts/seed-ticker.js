const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");

// Load Environment Variables (Same helper as before)
function loadEnv() {
  const paths = [path.resolve(__dirname, ".env.local"), path.resolve(__dirname, "../.env.local")];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      content.split("\n").forEach((line) => {
        const [key, ...values] = line.split("=");
        if (key) process.env[key.trim()] = values.join("=").trim().replace(/^["']|["']$/g, "");
      });
      return;
    }
  }
}
loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-10-01",
  useCdn: false,
});

const metrics = [
  { label: "ER Wait Time (Avg)", value: "242 Min", trend: "Critical Strain", status: "critical" },
  { label: "Inpatient Bed Capacity", value: "94%", trend: "< 5 Beds Avail", status: "warning" },
  { label: "30-Day Readmission", value: "14.2%", trend: "Improving (-1%)", status: "good" },
  { label: "MSSP Shared Savings", value: "$324 PMPY", trend: "Above Benchmark", status: "good" },
  { label: "Labor Expense Ratio", value: "54% Net Rev", trend: "Unsustainable", status: "critical" },
  { label: "Ambulatory Visits", value: "12,405", trend: "+8% YoY", status: "neutral" }
];

async function seedTicker() {
  console.log("🏥 Seeding System Vitals...");
  
  // Clear old ticker items first to avoid duplicates
  await client.delete({query: '*[_type == "ticker"]'});

  const transaction = client.transaction();
  metrics.forEach(m => {
    transaction.create({
      _type: 'ticker',
      ...m
    });
  });

  await transaction.commit();
  console.log("✅ Ticker updated with real clinical metrics.");
}

seedTicker();