/**
 * Learning tracks — Supabase data fetchers
 * Replaces: frontend/lib/data/learning-tracks-data.ts
 */
import { db } from "./client";

export type TrackModule = {
  slug: string;
  title: string;
  estimatedMinutes: number;
  level: "Foundational" | "Intermediate" | "Advanced";
  summary: string;
  learningObjectives: string[];
};

export type LearningTrackRow = {
  id: string;
  title: string;
  subtitle: string | null;
  icon: string | null;
  badge: string | null;
  badge_color: string | null;
  target_audience: string[];
  total_minutes: number;
  modules: TrackModule[];
  is_active: boolean;
  sort_order: number;
};

export async function getAllLearningTracks(): Promise<LearningTrackRow[]> {
  const { data, error } = await db
    .from("learning_tracks")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("getAllLearningTracks:", error.message);
    return [];
  }
  return data as LearningTrackRow[];
}

export async function getLearningTrack(
  id: string
): Promise<LearningTrackRow | null> {
  const { data, error } = await db
    .from("learning_tracks")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error(`getLearningTrack(${id}):`, error.message);
    return null;
  }
  return data as LearningTrackRow;
}
