/**
 * State initiatives — Supabase data fetchers
 * Replaces: frontend/lib/data/state-initiatives-data.ts
 */
import { db } from "./client";

export type StateInitiativeRow = {
  id: string;
  state_id: string;
  state_name: string;
  region: string | null;
  internal_link: string | null;
  initiatives: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    year?: number;
    amount?: string;
    externalUrl?: string;
    internalLink?: string;
  }>;
};

export async function getAllStateInitiatives(): Promise<StateInitiativeRow[]> {
  const { data, error } = await db
    .from("state_initiatives")
    .select("*")
    .order("state_name");

  if (error) {
    console.error("getAllStateInitiatives:", error.message);
    return [];
  }
  return data as StateInitiativeRow[];
}

export async function getStateInitiatives(
  stateId: string
): Promise<StateInitiativeRow | null> {
  const { data, error } = await db
    .from("state_initiatives")
    .select("*")
    .eq("state_id", stateId)
    .single();

  if (error) {
    console.error(`getStateInitiatives(${stateId}):`, error.message);
    return null;
  }
  return data as StateInitiativeRow;
}
