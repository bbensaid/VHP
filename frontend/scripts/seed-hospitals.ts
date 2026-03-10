#!/usr/bin/env npx tsx
/**
 * scripts/seed-hospitals.ts
 *
 * Seeds hospital documents in Sanity from the static hospital-data.ts file.
 * Run once to migrate; after that, edit hospitals in the Sanity Studio.
 *
 * Usage:
 *   npx tsx scripts/seed-hospitals.ts
 *
 * Prerequisites:
 *   - SANITY_API_TOKEN (write token) in .env.local or shell env
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set
 */

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@sanity/client";
import { hospitalData } from "../lib/data/hospital-data";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  const allEntries = Object.entries(hospitalData);
  const totalHospitals = allEntries.reduce((acc, [, h]) => acc + h.length, 0);

  console.log(`Seeding ${totalHospitals} hospital documents across ${allEntries.length} states…`);

  let succeeded = 0;
  for (const [stateSlug, hospitals] of allEntries) {
    for (const h of hospitals) {
      const doc = {
        _id: `hospital-${h.id}`,
        _type: "hospital",
        name: h.name,
        stateSlug,
        city: h.city,
        type: h.type,
        totalDischarges: h.totalDischarges,
        avgLengthOfStay: h.avgLengthOfStay,
        qualityScore: h.qualityScore,
      };
      try {
        await sanity.createOrReplace(doc);
        console.log(`  ✓ [${stateSlug}] ${h.name}`);
        succeeded++;
      } catch (err: any) {
        console.error(`  ✗ [${stateSlug}] ${h.name}: ${err.message}`);
      }
    }
  }

  console.log(`\nDone. ${succeeded}/${totalHospitals} hospitals seeded.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
