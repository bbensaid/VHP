const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");

// Robust Env Loading
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
          process.env[key.trim()] = values.join("=").trim().replace(/^["']|["']$/g, "");
        }
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

const reports = [
  {
    title: "The State of Health AI 2025",
    subtitle: "Adoption rates, ROI models, and liability frameworks.",
    publishedAt: "2024-11-15",
    accessLevel: "Public",
    summary: "Our flagship annual review of generative AI in clinical settings. Based on surveys of 500+ CIOs.",
    topics: ["Technology", "Strategy"],
  },
  {
    title: "Vermont Health System Solvency Audit",
    subtitle: "The crisis in rural independent hospitals.",
    publishedAt: "2024-10-01",
    accessLevel: "Client Only",
    summary: "A deep dive into the operating margins of Vermont's critical access hospitals and the path forward.",
    topics: ["Economics", "Policy"],
  },
  {
    title: "The 2026 CMS Fee Schedule Forecast",
    subtitle: "Winners and losers in the proposed rule.",
    publishedAt: "2024-09-20",
    accessLevel: "Enterprise",
    summary: "Detailed impact analysis of the proposed physician fee schedule and RVU adjustments.",
    topics: ["Policy", "Reimbursement"],
  },
  {
    title: "Direct-to-Employer Contracting Playbook",
    subtitle: "Bypassing payers to capture margin.",
    publishedAt: "2024-08-05",
    accessLevel: "Client Only",
    summary: "Case studies and contract templates for health systems looking to engage local employers directly.",
    topics: ["Economics", "Strategy"],
  }
];

async function seedReports() {
  console.log("📑 Seeding Impact Reports...");
  const transaction = client.transaction();

  reports.forEach((item) => {
    const docId = `report-${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    transaction.createOrReplace({
      _id: docId,
      _type: "report",
      ...item
    });
  });

  try {
    await transaction.commit();
    console.log("✅ Reports library populated.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

seedReports();