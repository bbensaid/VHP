#!/usr/bin/env npx ts-node --project tsconfig.json
// One-time seed: npm run seed:courses
// Reads content/course_seed.json and upserts into Supabase via service-role key.

import "dotenv/config";
import { seedCourseFromJson } from "../lib/course-api";
import courseData from "../content/course_seed.json";
import type { Course } from "../types/course";

async function main() {
  console.log("Seeding course data…");
  await seedCourseFromJson(courseData as unknown as Course);
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
