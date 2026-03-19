/**
 * State health metrics — Supabase data fetchers
 * Replaces: frontend/lib/data/states.ts + performance-index-data.ts
 */
import { db } from "./client";

export type StateHealthRow = {
  state_id: string;
  state_name: string;
  state_code: string;
  health_status: string;
  trend: string;
  composite_score: number;
  hospital_margin: number | null;
  uninsured_rate: number | null;
  performance_score: number | null;
  performance_status: string | null;
  policy_vbp_adoption: number | null;
  policy_telehealth: number | null;
  policy_scope_of_practice: number | null;
  econ_spending_per_capita: number | null;
  econ_workforce_gaps: number | null;
  econ_insurance_coverage: number | null;
  tech_hie_adoption: number | null;
  tech_broadband_access: number | null;
  tech_ehr_adoption: number | null;
  clinical_preventive_care: number | null;
  clinical_readmission_rate: number | null;
  clinical_chronic_disease: number | null;
  equity_racial_gap: number | null;
  equity_rural_urban_gap: number | null;
  equity_sdoh_integration: number | null;
  narrative_title: string | null;
  narrative_summary: string | null;
};

/** All 50 states + DC, ordered by state name. Cached 1 hour (ISR-safe). */
export async function getAllStateMetrics(): Promise<StateHealthRow[]> {
  const { data, error } = await db
    .from("state_health_metrics")
    .select("*")
    .order("state_name");

  if (error) {
    console.error("getAllStateMetrics:", error.message);
    return [];
  }
  return data as StateHealthRow[];
}

/** Single state by state_id (e.g. 'vermont'). */
export async function getStateMetrics(
  stateId: string
): Promise<StateHealthRow | null> {
  const { data, error } = await db
    .from("state_health_metrics")
    .select("*")
    .eq("state_id", stateId)
    .single();

  if (error) {
    console.error(`getStateMetrics(${stateId}):`, error.message);
    return null;
  }
  return data as StateHealthRow;
}

/** Compatibility shim: returns data shaped like the old US_STATES_DATA array */
export async function getUSStatesData() {
  const rows = await getAllStateMetrics();
  return rows.map((r) => ({
    name: r.state_name,
    code: r.state_code,
    status: r.health_status,
    trend: r.trend,
    score: r.composite_score,
    hospitalMargin: r.hospital_margin,
    uninsuredRate: r.uninsured_rate,
  }));
}
