/**
 * HTI time-series data — Supabase data fetchers
 * Replaces: frontend/lib/data/hti-timeseries-data.ts
 */
import { db } from "./client";

export type QuarterlySnapshot = {
  quarter: string;
  composite: number;
  digital: number;
  vbc: number;
  equity: number;
  outcomes: number;
  experience: number;
  workforce: number;
};

export type StateTimeSeriesRow = {
  id: string;
  state_id: string;
  state_name: string;
  region: string;
  preventable_hospitalization_rate: number | null;
  maternal_mortality_rate: number | null;
  cancer_screening_rate: number | null;
  mental_health_access_rate: number | null;
  primary_care_density: number | null;
  opioid_overdose_deaths: number | null;
  uncompensated_care_ratio: number | null;
  spending_per_capita: number | null;
  medical_inflation_rate: number | null;
  uninsured_rate: number | null;
  medicaid_expansion: boolean | null;
  operating_margin_avg: number | null;
  payer_mix_commercial: number | null;
  workforce_turnover_rate: number | null;
  snapshots: QuarterlySnapshot[];
};

export async function getAllStateTimeSeries(): Promise<StateTimeSeriesRow[]> {
  const { data, error } = await db
    .from("state_time_series")
    .select("*")
    .order("state_name");

  if (error) {
    console.error("getAllStateTimeSeries:", error.message);
    return [];
  }
  return data as StateTimeSeriesRow[];
}

export async function getStateTimeSeries(
  stateId: string
): Promise<StateTimeSeriesRow | null> {
  const { data, error } = await db
    .from("state_time_series")
    .select("*")
    .eq("state_id", stateId)
    .single();

  if (error) {
    console.error(`getStateTimeSeries(${stateId}):`, error.message);
    return null;
  }
  return data as StateTimeSeriesRow;
}

export async function getNationalBenchmark(): Promise<QuarterlySnapshot[]> {
  const { data, error } = await db
    .from("national_benchmark")
    .select("snapshots")
    .limit(1)
    .single();

  if (error) {
    console.error("getNationalBenchmark:", error.message);
    return [];
  }
  return (data?.snapshots ?? []) as QuarterlySnapshot[];
}
