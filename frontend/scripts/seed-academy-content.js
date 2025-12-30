// scripts/seed-academy-content.js
const fs = require("fs");
const path = require("path");
const { createClient } = require("next-sanity");

// --- 1. ROBUST ENV LOADING (Borrowed from your import.js) ---
function loadEnv() {
  const paths = [
    path.resolve(__dirname, ".env.local"),       // scripts/.env.local
    path.resolve(__dirname, "../.env.local"),    // frontend/.env.local
    path.resolve(__dirname, "../../.env.local"), // root/.env.local
  ];

  for (const p of paths) {
    if (fs.existsSync(p)) {
      console.log(`✅ Found config at: ${p}`);
      const content = fs.readFileSync(p, "utf8");
      content.split("\n").forEach((line) => {
        const [key, ...values] = line.split("=");
        if (key && values.length > 0) {
          const val = values.join("=").trim().replace(/^["']|["']$/g, "");
          process.env[key.trim()] = val;
        }
      });
      return; 
    }
  }
  console.warn("⚠️ Could not find .env.local in common locations.");
}

loadEnv();

// --- 2. CONFIGURATION ---
if (!process.env.SANITY_API_TOKEN) {
  console.error("❌ ERROR: SANITY_API_TOKEN is missing. Check your .env.local file.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // <--- Using your existing token variable
  apiVersion: "2023-10-01",
  useCdn: false,
});

// --- 3. DATA TO SEED ---
const facultyData = [
  { _id: "inst-aris", name: "Dr. Aris Thorne", role: "Chair of Technology Pillar", bio: "Former Chief Medical Information Officer at Mayo Clinic. Pioneer in clinical AI deployment.", tags: ["AI", "Clinical Ops"] },
  { _id: "inst-sarah", name: "Sarah Jenkins, MPH", role: "Chair of Policy Pillar", bio: "Served 10 years at CMS, architecting key components of the ACA and MACRA legislation.", tags: ["Regulation", "CMS"] },
  { _id: "inst-marcus", name: "Marcus Chen", role: "Visiting Fellow, Economics", bio: "Founder of 3 digital health unicorns. Expert in go-to-market strategy and venture finance.", tags: ["Venture Capital", "Strategy"] },
  { _id: "inst-elena", name: "Elena Roza", role: "Senior Fellow, Population Health", bio: "Designed value-based contracts for major national payer covering 15M lives.", tags: ["VBC", "Payer Strategy"] },
];

const courseData = [
  {
    title: "Certified Health AI Strategist (CHAIS)",
    slug: "chais",
    pillar: "Technology",
    type: "CERTIFICATION",
    description: "The industry standard for leading AI governance, deployment, and ethics in clinical settings.",
    meta: "8 Weeks • Cohort Begins Jan 15",
    price: "$2,995",
    instructors: [{ _type: "reference", _ref: "inst-aris" }],
  },
  {
    title: "Value-Based Care Executive (VBCE)",
    slug: "vbce",
    pillar: "Economics",
    type: "CERTIFICATION",
    description: "Master risk adjustment, capitation modeling, and population health finance.",
    meta: "6 Weeks • Self-Paced",
    price: "$1,895",
    instructors: [{ _type: "reference", _ref: "inst-marcus" }, { _type: "reference", _ref: "inst-elena" }],
  },
  {
    title: "Health Policy & Regulatory Analyst",
    slug: "hpra",
    pillar: "Policy",
    type: "CERTIFICATION",
    description: "Navigate the FDA, CMS, and global regulatory landscapes with confidence.",
    meta: "10 Weeks • Cohort Begins Feb 01",
    price: "$3,200",
    instructors: [{ _type: "reference", _ref: "inst-sarah" }],
  },
  {
    title: "2025 CMS Fee Schedule",
    slug: "cms-2025",
    pillar: "Policy",
    type: "COURSE",
    description: "Unpacking the new reimbursement rules for RPM and Telehealth.",
    meta: "3 Hours • Video",
    price: "$299",
  },
  {
    title: "Interoperability (FHIR) 101",
    slug: "fhir-101",
    pillar: "Technology",
    type: "COURSE",
    description: "A non-technical guide to data exchange standards.",
    meta: "4 Hours • Video",
    price: "$349",
  },
  {
    title: "Direct-to-Employer Contracting",
    slug: "direct-contracting",
    pillar: "Economics",
    type: "COURSE",
    description: "How health systems can bypass payers.",
    meta: "5 Hours • Workshop",
    price: "$499",
  },
  {
    title: "Cybersecurity for Execs",
    slug: "cyber-exec",
    pillar: "Technology",
    type: "COURSE",
    description: "Managing ransomware risk in hospital operations.",
    meta: "2 Hours • Video",
    price: "$199",
  },
];

// --- 4. EXECUTION ---
async function seed() {
  console.log("🏫 Hydrating HTR Academy Content...");
  const transaction = client.transaction();

  // Create Faculty
  facultyData.forEach((inst) => {
    transaction.createOrReplace({
      _type: "instructor",
      ...inst
    });
  });

  // Create Courses
  courseData.forEach((course) => {
    const { slug, ...data } = course;
    const docId = `course-${slug}`;
    transaction.createOrReplace({
      _id: docId,
      _type: "course",
      slug: { _type: "slug", current: slug },
      ...data,
      // Default body content so the [slug] page isn't empty
      overview: [
        {
          _type: "block",
          children: [{ _type: "span", text: `Welcome to ${course.title}. This course overview is managed in Sanity.` }],
          style: "normal"
        }
      ]
    });
  });

  try {
    await transaction.commit();
    console.log("✅ Success! Academy content has been migrated from code to database.");
  } catch (err) {
    console.error("❌ Transaction Failed:", err.message);
  }
}

seed();