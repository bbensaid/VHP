// scripts/import_course.js
// Auto-creates a `course` document in Sanity for each unique courseTitle
// found among your imported academyModule documents.
//
// Usage: node scripts/import_course.js
// No arguments needed — it reads directly from Sanity.

const { createClient } = require("@sanity/client");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const { SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET } = process.env;

if (!SANITY_API_TOKEN) {
  console.error("❌ SANITY_API_TOKEN is missing from .env.local");
  process.exit(1);
}
if (!NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing from .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  token: SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Valid pillar values for the `course` schema
const COURSE_PILLARS = ["Policy", "Economics", "Technology", "Operations"];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function run() {
  // Fetch all imported academy modules
  const modules = await client.fetch(
    `*[_type == "academyModule"] | order(moduleNumber asc) {
      _id,
      title,
      courseTitle,
      moduleNumber,
      pillar,
      level,
      summary
    }`
  );

  if (modules.length === 0) {
    console.error("❌ No academyModule documents found in Sanity. Import modules first.");
    process.exit(1);
  }

  // Group modules by courseTitle
  const grouped = modules.reduce((acc, mod) => {
    const key = mod.courseTitle;
    if (!acc[key]) acc[key] = [];
    acc[key].push(mod);
    return acc;
  }, {});

  console.log(`Found ${Object.keys(grouped).length} course(s) across ${modules.length} modules:\n`);

  for (const [courseTitle, mods] of Object.entries(grouped)) {
    const slug = slugify(courseTitle);
    const docId = `course-${slug}`;

    // Use the first module's pillar if it's valid for courses, otherwise leave unset
    const rawPillar = mods[0]?.pillar;
    const pillar = COURSE_PILLARS.includes(rawPillar) ? rawPillar : undefined;

    const doc = {
      _id: docId,
      _type: "course",
      title: courseTitle,
      slug: { _type: "slug", current: slug },
      description: mods[0]?.summary ?? "",
      type: "COURSE",
      meta: `${mods.length} Module${mods.length !== 1 ? "s" : ""} • Self-Paced`,
      ...(pillar && { pillar }),
      // Reference each module in order; _key required on all array items in Sanity
      modules: mods.map((m) => ({
        _type: "reference",
        _ref: m._id,
        _key: Math.random().toString(36).slice(2, 10),
      })),
    };

    await client.createOrReplace(doc);

    console.log(`✅ "${courseTitle}"`);
    console.log(`   ID    : ${docId}`);
    console.log(`   Slug  : /academy/courses/${slug}`);
    console.log(`   Modules: ${mods.map((m) => `#${m.moduleNumber}`).join(", ")}\n`);
  }

  console.log("Done. Open /academy?tab=courses to see your courses.");
}

run().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
