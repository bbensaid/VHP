/**
 * lib/sanity-dashboard-queries.ts
 *
 * GROQ queries for rhtState and statePerformanceIndex documents.
 * Projections are shaped to match the existing TypeScript types so
 * consuming components need no changes.
 */

import { client } from "./sanity";
import type { RHTProfile } from "./data/rht-program";
import type { PerformanceIndexProfile } from "./data/performance-index-data";

// ── RHT State ─────────────────────────────────────────────────────────────────

const RHT_FIELDS = `
  "id": stateId.current,
  stateName,
  awardAmount,
  status,
  strategicFocus,
  description,
  "initiatives": initiatives[]{ title, description },
  "metrics": metrics[]{ label, status, "target": coalesce(target, "") }
`;

export async function getRhtState(stateId: string): Promise<RHTProfile | null> {
  return client.fetch(
    `*[_type == "rhtState" && stateId.current == $stateId][0]{ ${RHT_FIELDS} }`,
    { stateId }
  );
}

export async function getAllRhtStates(): Promise<Record<string, RHTProfile>> {
  const docs: RHTProfile[] = await client.fetch(
    `*[_type == "rhtState"] | order(stateName asc) { ${RHT_FIELDS} }`
  );
  return Object.fromEntries(docs.map((d) => [d.id, d]));
}

// ── Performance Index ─────────────────────────────────────────────────────────

const PERF_FIELDS = `
  "id": stateId.current,
  stateName,
  performanceScore,
  status,
  "metrics": {
    "policy": {
      "vbpAdoption":      policyMetrics.vbpAdoption,
      "telehealth":       policyMetrics.telehealth,
      "scopeOfPractice":  policyMetrics.scopeOfPractice
    },
    "economics": {
      "spendingPerCapita":  economicsMetrics.spendingPerCapita,
      "workforceGaps":      economicsMetrics.workforceGaps,
      "insuranceCoverage":  economicsMetrics.insuranceCoverage
    },
    "technology": {
      "hieAdoption":     technologyMetrics.hieAdoption,
      "broadbandAccess": technologyMetrics.broadbandAccess,
      "ehrAdoption":     technologyMetrics.ehrAdoption
    },
    "clinical": {
      "preventiveCare":         coalesce(clinicalMetrics.preventiveCare, 0),
      "readmissionRate":        coalesce(clinicalMetrics.readmissionRate, 0),
      "chronicDiseaseControl":  coalesce(clinicalMetrics.chronicDiseaseControl, 0)
    },
    "equity": {
      "racialEquityGap":   coalesce(equityMetrics.racialEquityGap, 0),
      "ruralUrbanGap":     coalesce(equityMetrics.ruralUrbanGap, 0),
      "sdohIntegration":   coalesce(equityMetrics.sdohIntegration, 0)
    }
  },
  "narrative": {
    "title":   narrativeTitle,
    "summary": narrativeSummary
  }
`;

export async function getPerformanceIndex(
  stateId: string
): Promise<PerformanceIndexProfile | null> {
  return client.fetch(
    `*[_type == "statePerformanceIndex" && stateId.current == $stateId][0]{ ${PERF_FIELDS} }`,
    { stateId }
  );
}

export async function getAllPerformanceIndexes(): Promise<
  Record<string, PerformanceIndexProfile>
> {
  const docs: PerformanceIndexProfile[] = await client.fetch(
    `*[_type == "statePerformanceIndex"] | order(stateName asc) { ${PERF_FIELDS} }`
  );
  return Object.fromEntries(docs.map((d) => [d.id, d]));
}

// ── Hospitals ─────────────────────────────────────────────────────────────────

export type SanityHospital = {
  id: string;
  name: string;
  city: string;
  type: "Critical Access" | "Rural PPS" | "Urban";
  totalDischarges: number;
  avgLengthOfStay: number;
  qualityScore: number;
};

export async function getHospitalsByState(stateSlug: string): Promise<SanityHospital[]> {
  return client.fetch(
    `*[_type == "hospital" && stateSlug == $stateSlug] | order(name asc) {
      "id": _id,
      name,
      city,
      type,
      totalDischarges,
      avgLengthOfStay,
      qualityScore
    }`,
    { stateSlug }
  );
}
