#!/usr/bin/env npx tsx
/**
 * scripts/seed-sanity-rht.ts
 *
 * Seeds rhtState documents in Sanity from the static rht-program.ts data.
 * Run once to migrate; after that, edit RHT state profiles in the Sanity Studio.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity-rht.ts
 *
 * Prerequisites:
 *   - SANITY_API_TOKEN (write token) must be in .env.local or shell env.
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set.
 *   - Run this AFTER deploying the rhtState schema to Sanity Studio.
 */

import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@sanity/client";
import { rhtProgramData } from "../lib/data/rht-program";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  const states = Object.values(rhtProgramData);
  console.log(`Seeding ${states.length} rhtState documents…`);

  for (const state of states) {
    const docId = `rhtState-${state.id}`;
    const doc = {
      _id: docId,
      _type: "rhtState",
      stateId: { _type: "slug", current: state.id },
      stateName: state.stateName,
      awardAmount: state.awardAmount,
      status: state.status ?? "Active",
      strategicFocus: Array.isArray(state.strategicFocus)
        ? state.strategicFocus.join(", ")
        : state.strategicFocus,
      description: state.description,
      initiatives: (state.initiatives ?? []).map((ini, i) => ({
        _key: `ini-${i}`,
        title: ini.title,
        description: ini.description,
      })),
      metrics: (state.metrics ?? []).map((m, i) => ({
        _key: `metric-${i}`,
        label: m.label,
        status: m.status,
        target: m.target ?? "",
      })),
    };

    await sanity.createOrReplace(doc);
    console.log(`  ✓ ${state.stateName}`);
  }

  console.log("\nDone. All rhtState documents seeded.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
