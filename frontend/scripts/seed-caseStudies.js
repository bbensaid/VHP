const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");

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

const caseStudies = [
  {
    title: "Saving Mercy Regional",
    slug: "saving-mercy-regional",
    pillar: "Economics",
    clientType: "Rural Hospital",
    summary: "How a rural Vermont hospital avoided closure through strategic service line consolidation and payer renegotiation.",
    metrics: ["$12M OpEx Reduction", "Negotiated Rates +15%"],
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Mercy Regional was facing a $4M annual deficit..." }],
        style: "normal"
      }
    ]
  },
  {
    title: "AI in the ED",
    slug: "ai-in-ed",
    pillar: "Technology",
    clientType: "Academic Medical Center",
    summary: "Reducing triage times by 40% using predictive machine learning models for patient intake.",
    metrics: ["40% Faster Triage", "LWBS reduced by 60%"],
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Overcrowding in the ED led to record 'Left Without Being Seen' rates..." }],
        style: "normal"
      }
    ]
  }
];

async function seed() {
  console.log("💼 Seeding Case Studies...");
  const transaction = client.transaction();

  caseStudies.forEach((item) => {
    const { slug, ...data } = item;
    const docId = `case-${slug}`;
    transaction.createOrReplace({
      _id: docId,
      _type: "caseStudy",
      slug: { _type: "slug", current: slug },
      ...data
    });
  });

  await transaction.commit();
  console.log("✅ Case Studies Live.");
}

seed();