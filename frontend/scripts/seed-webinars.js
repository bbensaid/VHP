const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");

// Robust Env Loader
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

// Future Dates for demonstration
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
const twoMonths = new Date();
twoMonths.setMonth(twoMonths.getMonth() + 2);

const webinarData = [
  {
    title: "The Future of Telehealth Reimbursement (2025 Outlook)",
    slug: "telehealth-2025",
    pillar: "Policy",
    description: "A critical town-hall style meeting regarding the expiring telehealth waivers and what the new fee schedule means for digital health companies.",
    date: nextMonth.toISOString(), // Next Month
    duration: "90 Min"
  },
  {
    title: "Generative AI in the ER",
    slug: "gen-ai-er",
    pillar: "Technology",
    description: "Case study with Mercy Health on reducing triage times.",
    date: new Date(nextMonth.getTime() + 86400000 * 5).toISOString(), // 5 days later
    duration: "60 Min"
  },
  {
    title: "Antitrust in Healthcare",
    slug: "antitrust-healthcare",
    pillar: "Policy",
    description: "The FTC's new stance on cross-market mergers.",
    date: new Date(nextMonth.getTime() + 86400000 * 12).toISOString(), // 12 days later
    duration: "45 Min"
  },
  {
    title: "The Cost of GLP-1s",
    slug: "glp1-cost",
    pillar: "Economics",
    description: "Employer coverage strategies for high-cost weight loss drugs.",
    date: twoMonths.toISOString(), // 2 Months out
    duration: "60 Min"
  }
];

async function seedWebinars() {
  console.log("📅 Seeding Webinars...");
  const transaction = client.transaction();

  webinarData.forEach((item) => {
    const docId = `webinar-${item.slug}`;
    const { slug, ...data } = item;
    
    transaction.createOrReplace({
      _id: docId,
      _type: "webinar",
      slug: { _type: "slug", current: slug },
      ...data
    });
  });

  try {
    await transaction.commit();
    console.log("✅ Webinars created successfully.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

seedWebinars();