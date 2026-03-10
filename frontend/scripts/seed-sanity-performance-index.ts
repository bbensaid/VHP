#!/usr/bin/env npx tsx
/**
 * scripts/seed-sanity-performance-index.ts
 *
 * Seeds statePerformanceIndex documents in Sanity from the static
 * performance-index-data.ts file.
 * Run once to migrate; after that, edit scores in the Sanity Studio.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity-performance-index.ts
 *
 * Prerequisites:
 *   - SANITY_API_TOKEN (write token) must be in .env.local or shell env.
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set.
 *   - Run this AFTER deploying the statePerformanceIndex schema to Sanity Studio.
 */

import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@sanity/client";
import { performanceIndexData } from "../lib/data/performance-index-data";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  const states = Object.values(performanceIndexData);
  console.log(`Seeding ${states.length} statePerformanceIndex documents…`);

  for (const state of states) {
    const docId = `perfIndex-${state.id}`;
    const doc = {
      _id: docId,
      _type: "statePerformanceIndex",
      stateId: { _type: "slug", current: state.id },
      stateName: state.stateName,
      performanceScore: state.performanceScore,
      status: state.status,
      policyMetrics: {
        vbpAdoption: state.metrics.policy.vbpAdoption,
        telehealth: state.metrics.policy.telehealth,
        scopeOfPractice: state.metrics.policy.scopeOfPractice,
      },
      economicsMetrics: {
        spendingPerCapita: state.metrics.economics.spendingPerCapita,
        workforceGaps: state.metrics.economics.workforceGaps,
        insuranceCoverage: state.metrics.economics.insuranceCoverage,
      },
      technologyMetrics: {
        hieAdoption: state.metrics.technology.hieAdoption,
        broadbandAccess: state.metrics.technology.broadbandAccess,
        ehrAdoption: state.metrics.technology.ehrAdoption,
      },
      narrativeTitle: state.narrative.title,
      narrativeSummary: state.narrative.summary,
    };

    await sanity.createOrReplace(doc);
    console.log(`  ✓ ${state.stateName} (${state.performanceScore})`);
  }

  console.log("\nDone. All statePerformanceIndex documents seeded.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
