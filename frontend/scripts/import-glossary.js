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

const glossaryData = [
  { 
    term: "Accountable Care Organization (ACO)", 
    description: "A group of providers who come together voluntarily to give coordinated high-quality care to their Medicare patients.", 
    pillars: ["Policy", "Economics"] 
  },
  { 
    term: "Interoperability", 
    description: "The ability of different information systems to access, exchange, integrate and cooperatively use data.", 
    pillars: ["Technology"] 
  },
  { 
    term: "Relative Value Unit (RVU)", 
    description: "A measure of value used in the United States Medicare reimbursement formula for physician services.", 
    pillars: ["Economics"] 
  },
  { 
    term: "Value-Based Care", 
    description: "A healthcare delivery model in which providers are paid based on patient health outcomes.", 
    pillars: ["Policy", "Economics"] 
  },
  {
    term: "Machine Learning (ML)",
    description: "The use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.",
    pillars: ["Technology"]
  },
  {
    term: "Certificate of Need (CON)",
    description: "A legal document required in many states before proposed acquisitions, expansions, or creations of facilities are allowed.",
    pillars: ["Policy"]
  }
];

async function seedGlossary() {
  console.log("📖 Seeding Glossary...");
  const transaction = client.transaction();

  glossaryData.forEach((item) => {
    const docId = `glossary-${item.term.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    transaction.createOrReplace({
      _id: docId,
      _type: "definition",
      term: item.term,
      description: item.description,
      pillars: item.pillars
    });
  });

  try {
    await transaction.commit();
    console.log("✅ Glossary updated.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

seedGlossary();