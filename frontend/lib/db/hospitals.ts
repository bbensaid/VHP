/**
 * Hospital data — Supabase data fetchers
 * Replaces: frontend/lib/data/hospital-data.ts
 */
import { db } from "./client";

export type HospitalRow = {
  id: string;
  name: string;
  city: string;
  state_id: string;
  state_code: string | null;
  hospital_type: string;
  total_discharges: number;
  avg_length_of_stay: number;
  quality_score: number;
};

/** All hospitals, optionally filtered by state_id. */
export async function getHospitals(stateId?: string): Promise<HospitalRow[]> {
  let query = db.from("hospitals").select("*").order("name");
  if (stateId) query = query.eq("state_id", stateId);

  const { data, error } = await query;
  if (error) {
    console.error("getHospitals:", error.message);
    return [];
  }
  return data as HospitalRow[];
}

/** Grouped by state_id — same shape as the old hospitalData Record<string, Hospital[]> */
export async function getHospitalsByState(): Promise<
  Record<string, HospitalRow[]>
> {
  const hospitals = await getHospitals();
  return hospitals.reduce<Record<string, HospitalRow[]>>((acc, h) => {
    if (!acc[h.state_id]) acc[h.state_id] = [];
    acc[h.state_id].push(h);
    return acc;
  }, {});
}
