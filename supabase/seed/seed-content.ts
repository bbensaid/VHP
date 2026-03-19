/**
 * Seed script: content data tables
 * Seeds state_health_metrics, state_time_series, rht_state_profiles,
 * hospitals, state_initiatives, and national_benchmark.
 *
 * Usage:
 *   cd supabase/seed
 *   npx tsx seed-content.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment.
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load env from frontend/.env.local
const envPath = path.resolve(__dirname, "../../frontend/.env.local");
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });
else dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Import source data ───────────────────────────────────────────────────────
// We dynamically require these to avoid ts-node resolution issues
const { US_STATES_DATA } = require("../../frontend/lib/data/states");
const { performanceIndexData } = require("../../frontend/lib/data/performance-index-data");
const { stateTimeSeries, nationalBenchmark } = require("../../frontend/lib/data/hti-timeseries-data");
const { rhtProgramData } = require("../../frontend/lib/data/rht-program");
const { hospitalData } = require("../../frontend/lib/data/hospital-data");
const { STATE_INITIATIVES } = require("../../frontend/lib/data/state-initiatives-data");

// State name → ID mapping helper
function toStateId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "_");
}

// ─── 1. state_health_metrics ──────────────────────────────────────────────────
async function seedStateMetrics() {
  console.log("Seeding state_health_metrics...");
  const rows = US_STATES_DATA.map((s: any) => {
    const id = toStateId(s.name);
    const perf = performanceIndexData[id];
    return {
      state_id: id,
      state_name: s.name,
      state_code: s.code,
      health_status: s.status,
      trend: s.trend,
      composite_score: s.score,
      hospital_margin: s.hospitalMargin,
      uninsured_rate: s.uninsuredRate,
      performance_score: perf?.performanceScore ?? null,
      performance_status: perf?.status ?? null,
      policy_vbp_adoption: perf?.metrics?.policy?.vbpAdoption ?? null,
      policy_telehealth: perf?.metrics?.policy?.telehealth ?? null,
      policy_scope_of_practice: perf?.metrics?.policy?.scopeOfPractice ?? null,
      econ_spending_per_capita: perf?.metrics?.economics?.spendingPerCapita ?? null,
      econ_workforce_gaps: perf?.metrics?.economics?.workforceGaps ?? null,
      econ_insurance_coverage: perf?.metrics?.economics?.insuranceCoverage ?? null,
      tech_hie_adoption: perf?.metrics?.technology?.hieAdoption ?? null,
      tech_broadband_access: perf?.metrics?.technology?.broadbandAccess ?? null,
      tech_ehr_adoption: perf?.metrics?.technology?.ehrAdoption ?? null,
      clinical_preventive_care: perf?.metrics?.clinical?.preventiveCare ?? null,
      clinical_readmission_rate: perf?.metrics?.clinical?.readmissionRate ?? null,
      clinical_chronic_disease: perf?.metrics?.clinical?.chronicDiseaseControl ?? null,
      equity_racial_gap: perf?.metrics?.equity?.racialEquityGap ?? null,
      equity_rural_urban_gap: perf?.metrics?.equity?.ruralUrbanGap ?? null,
      equity_sdoh_integration: perf?.metrics?.equity?.sdohIntegration ?? null,
      narrative_title: perf?.narrative?.title ?? null,
      narrative_summary: perf?.narrative?.summary ?? null,
    };
  });

  const { error } = await supabase
    .from("state_health_metrics")
    .upsert(rows, { onConflict: "state_id" });
  if (error) throw new Error(`state_health_metrics: ${error.message}`);
  console.log(`  ✓ ${rows.length} state metrics upserted`);
}

// ─── 2. state_time_series ─────────────────────────────────────────────────────
async function seedTimeSeries() {
  console.log("Seeding state_time_series...");
  const rows = stateTimeSeries.map((s: any) => ({
    state_id: s.stateId,
    state_name: s.stateName,
    region: s.region,
    preventable_hospitalization_rate: s.clinicalMetrics?.preventableHospitalizationRate ?? null,
    maternal_mortality_rate: s.clinicalMetrics?.maternalMortalityRate ?? null,
    cancer_screening_rate: s.clinicalMetrics?.cancerScreeningRate ?? null,
    mental_health_access_rate: s.clinicalMetrics?.mentalHealthAccessRate ?? null,
    primary_care_density: s.clinicalMetrics?.primaryCareDensity ?? null,
    opioid_overdose_deaths: s.clinicalMetrics?.opioidOverdoseDeaths ?? null,
    uncompensated_care_ratio: s.clinicalMetrics?.uncompensatedCareRatio ?? null,
    spending_per_capita: s.economicMetrics?.spendingPerCapita ?? null,
    medical_inflation_rate: s.economicMetrics?.medicalInflationRate ?? null,
    uninsured_rate: s.economicMetrics?.uninsuredRate ?? null,
    medicaid_expansion: s.economicMetrics?.medicaidExpansion ?? null,
    operating_margin_avg: s.economicMetrics?.operatingMarginAvg ?? null,
    payer_mix_commercial: s.economicMetrics?.payerMixCommercial ?? null,
    workforce_turnover_rate: s.economicMetrics?.workforceTurnoverRate ?? null,
    snapshots: s.snapshots ?? [],
  }));

  const { error } = await supabase
    .from("state_time_series")
    .upsert(rows, { onConflict: "state_id" });
  if (error) throw new Error(`state_time_series: ${error.message}`);
  console.log(`  ✓ ${rows.length} state time-series upserted`);
}

// ─── 3. national_benchmark ────────────────────────────────────────────────────
async function seedNationalBenchmark() {
  console.log("Seeding national_benchmark...");
  // Delete + re-insert (single row)
  await supabase.from("national_benchmark").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase
    .from("national_benchmark")
    .insert({ snapshots: nationalBenchmark });
  if (error) throw new Error(`national_benchmark: ${error.message}`);
  console.log("  ✓ national benchmark upserted");
}

// ─── 4. rht_state_profiles ───────────────────────────────────────────────────
async function seedRhtProfiles() {
  console.log("Seeding rht_state_profiles...");
  const rows = Object.values(rhtProgramData).map((p: any) => ({
    state_id: p.id,
    state_name: p.stateName,
    award_amount: p.awardAmount,
    status: p.status ?? null,
    strategic_focus: Array.isArray(p.strategicFocus)
      ? p.strategicFocus.join(", ")
      : p.strategicFocus,
    description: p.description ?? null,
    initiatives: p.initiatives ?? [],
    metrics: p.metrics ?? [],
    simulation: p.simulation ?? null,
  }));

  const { error } = await supabase
    .from("rht_state_profiles")
    .upsert(rows, { onConflict: "state_id" });
  if (error) throw new Error(`rht_state_profiles: ${error.message}`);
  console.log(`  ✓ ${rows.length} RHT profiles upserted`);
}

// ─── 5. hospitals ─────────────────────────────────────────────────────────────
async function seedHospitals() {
  console.log("Seeding hospitals...");
  const STATE_CODE_MAP: Record<string, string> = {
    vermont: "VT", maine: "ME", new_hampshire: "NH", massachusetts: "MA",
    connecticut: "CT", rhode_island: "RI", new_york: "NY", pennsylvania: "PA",
    new_jersey: "NJ", delaware: "DE", maryland: "MD", texas: "TX",
    florida: "FL", georgia: "GA", north_carolina: "NC", virginia: "VA",
    west_virginia: "WV", alabama: "AL", mississippi: "MS", louisiana: "LA",
    tennessee: "TN", kentucky: "KY", south_carolina: "SC", arkansas: "AR",
    oklahoma: "OK", ohio: "OH", michigan: "MI", indiana: "IN",
    illinois: "IL", wisconsin: "WI", minnesota: "MN", iowa: "IA",
    missouri: "MO", kansas: "KS", nebraska: "NE", north_dakota: "ND",
    south_dakota: "SD", california: "CA", washington: "WA", oregon: "OR",
    idaho: "ID", montana: "MT", wyoming: "WY", colorado: "CO",
    utah: "UT", nevada: "NV", arizona: "AZ", new_mexico: "NM",
    alaska: "AK", hawaii: "HI",
  };

  const rows: any[] = [];
  for (const [stateId, hospitals] of Object.entries(hospitalData)) {
    for (const h of hospitals as any[]) {
      rows.push({
        id: h.id,
        name: h.name,
        city: h.city,
        state_id: stateId,
        state_code: STATE_CODE_MAP[stateId] ?? null,
        hospital_type: h.type,
        total_discharges: h.totalDischarges,
        avg_length_of_stay: h.avgLengthOfStay,
        quality_score: h.qualityScore,
      });
    }
  }

  const { error } = await supabase
    .from("hospitals")
    .upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`hospitals: ${error.message}`);
  console.log(`  ✓ ${rows.length} hospitals upserted`);
}

// ─── 6. state_initiatives ─────────────────────────────────────────────────────
async function seedStateInitiatives() {
  console.log("Seeding state_initiatives...");
  const rows = Object.values(STATE_INITIATIVES).map((s: any) => ({
    state_id: s.stateId,
    state_name: s.stateName,
    region: s.region ?? null,
    internal_link: s.internalLink ?? null,
    initiatives: s.initiatives ?? [],
  }));

  const { error } = await supabase
    .from("state_initiatives")
    .upsert(rows, { onConflict: "state_id" });
  if (error) throw new Error(`state_initiatives: ${error.message}`);
  console.log(`  ✓ ${rows.length} state initiative profiles upserted`);
}

// ─── Run all seeders ──────────────────────────────────────────────────────────
async function main() {
  console.log("Starting content data seed...\n");
  try {
    await seedStateMetrics();
    await seedTimeSeries();
    await seedNationalBenchmark();
    await seedRhtProfiles();
    await seedHospitals();
    await seedStateInitiatives();
    console.log("\n✅ All content data seeded successfully.");
  } catch (err) {
    console.error("\n❌ Seed failed:", err);
    process.exit(1);
  }
}

main();
