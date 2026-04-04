import { notFound } from "next/navigation";
import { getRhtState, getPerformanceIndex, getHospitalsByState } from "@/lib/sanity-dashboard-queries";
import { getStateMetrics, type StateHealthRow } from "@/lib/db/states";
import { getRhtProfile, type RhtProfileRow } from "@/lib/db/rht-profiles";
import { getHospitals, type HospitalRow } from "@/lib/db/hospitals";
import { performanceIndexData } from "@/lib/data/performance-index-data";
import { rhtProgramData } from "@/lib/data/rht-program";
import StateDetailClientPage from "./StateDetailClientPage";
import type { PerformanceIndexProfile } from "@/lib/data/performance-index-data";
import type { RHTProfile } from "@/lib/data/rht-program";

export const revalidate = 3600;

/** Adapt Supabase StateHealthRow → PerformanceIndexProfile shape */
function adaptMetricsToIndex(r: StateHealthRow): PerformanceIndexProfile {
  return {
    id: r.state_id,
    stateName: r.state_name,
    performanceScore: r.performance_score ?? r.composite_score,
    status: (r.performance_status as PerformanceIndexProfile["status"]) ?? "Stable",
    metrics: {
      policy: {
        vbpAdoption: r.policy_vbp_adoption ?? 0,
        telehealth: r.policy_telehealth ?? 0,
        scopeOfPractice: r.policy_scope_of_practice ?? 0,
      },
      economics: {
        spendingPerCapita: r.econ_spending_per_capita ?? 0,
        workforceGaps: r.econ_workforce_gaps ?? 0,
        insuranceCoverage: r.econ_insurance_coverage ?? 0,
      },
      technology: {
        hieAdoption: r.tech_hie_adoption ?? 0,
        broadbandAccess: r.tech_broadband_access ?? 0,
        ehrAdoption: r.tech_ehr_adoption ?? 0,
      },
      clinical: {
        preventiveCare: r.clinical_preventive_care ?? 0,
        readmissionRate: r.clinical_readmission_rate ?? 0,
        chronicDiseaseControl: r.clinical_chronic_disease ?? 0,
      },
      equity: {
        racialEquityGap: r.equity_racial_gap ?? 0,
        ruralUrbanGap: r.equity_rural_urban_gap ?? 0,
        sdohIntegration: r.equity_sdoh_integration ?? 0,
      },
    },
    narrative: {
      title: r.narrative_title ?? r.state_name,
      summary: r.narrative_summary ?? "",
    },
  };
}

/** Adapt Supabase RhtProfileRow → RHTProfile shape */
function adaptProfileToRht(r: RhtProfileRow): RHTProfile {
  return {
    id: r.state_id,
    stateName: r.state_name,
    awardAmount: r.award_amount,
    status: r.status as RHTProfile["status"],
    strategicFocus: r.strategic_focus,
    description: r.description ?? undefined,
    initiatives: r.initiatives,
    metrics: r.metrics as RHTProfile["metrics"],
    simulation: r.simulation as unknown as RHTProfile["simulation"],
  };
}

export default async function DynamicStatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state.toLowerCase();

  const [sanityIndex, sanityProgram, sanityHospitals, dbMetrics, dbProfile, dbHospitals] =
    await Promise.all([
      getPerformanceIndex(stateSlug),
      getRhtState(stateSlug),
      getHospitalsByState(stateSlug),
      getStateMetrics(stateSlug),
      getRhtProfile(stateSlug),
      getHospitals(stateSlug),
    ]);

  // Prefer Sanity hospitals; fall back to CMS-loaded Supabase data
  const hospitals = sanityHospitals.length > 0
    ? sanityHospitals
    : dbHospitals.map((h: HospitalRow) => ({
        id:               h.id,
        name:             h.name,
        city:             h.city,
        type:             h.hospital_type as "Critical Access" | "Rural PPS" | "Urban",
        totalDischarges:  h.total_discharges,
        avgLengthOfStay:  h.avg_length_of_stay,
        qualityScore:     h.quality_score,
      }));

  // Priority: Sanity CMS → Supabase DB → static data file → 404
  const indexData =
    sanityIndex ??
    (dbMetrics ? adaptMetricsToIndex(dbMetrics) : null) ??
    performanceIndexData[stateSlug] ??
    null;
  const programData =
    sanityProgram ??
    (dbProfile ? adaptProfileToRht(dbProfile) : null) ??
    rhtProgramData[stateSlug] ??
    null;

  if (!indexData && !programData) return notFound();

  return (
    <StateDetailClientPage
      indexData={indexData}
      programData={programData}
      stateSlug={stateSlug}
      hospitals={hospitals}
    />
  );
}
