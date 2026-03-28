/**
 * RHT state profiles — Supabase data fetchers
 * Replaces: frontend/lib/data/rht-program.ts
 */
import { db } from "./client";

export type RhtProfileRow = {
  id: string;
  state_id: string;
  state_name: string;
  award_amount: string;
  status: string | null;
  strategic_focus: string;
  description: string | null;
  initiatives: Array<{
    title: string;
    description: string;
    status?: "Active" | "Planned" | "Completed";
  }>;
  metrics: Array<{
    label: string;
    value?: string;
    trend?: "up" | "down" | "neutral";
    status: string;
    target?: string;
  }>;
  simulation: Record<string, unknown> | null;
};

export async function getAllRhtProfiles(): Promise<RhtProfileRow[]> {
  const { data, error } = await db
    .from("rht_state_profiles")
    .select("*")
    .order("state_name");

  if (error) {
    console.error("getAllRhtProfiles:", error.message);
    return [];
  }
  return data as RhtProfileRow[];
}

export async function getRhtProfile(
  stateId: string
): Promise<RhtProfileRow | null> {
  const { data, error } = await db
    .from("rht_state_profiles")
    .select("*")
    .eq("state_id", stateId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(`getRhtProfile(${stateId}):`, error.message);
    return null;
  }
  return data as RhtProfileRow;
}

/** Keyed record — same shape as old rhtProgramData */
export async function getRhtProfilesMap(): Promise<
  Record<string, RhtProfileRow>
> {
  const profiles = await getAllRhtProfiles();
  return Object.fromEntries(profiles.map((p) => [p.state_id, p]));
}
