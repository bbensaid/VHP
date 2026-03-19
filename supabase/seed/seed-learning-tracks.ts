/**
 * Seed script: learning_tracks table
 * Usage: npx tsx seed-learning-tracks.ts
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

const envPath = path.resolve(__dirname, "../../frontend/.env.local");
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });
else dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const { learningTracks } = require("../../frontend/lib/data/learning-tracks-data");

async function main() {
  console.log("Seeding learning_tracks...");

  const rows = learningTracks.map((track: any, idx: number) => ({
    id: track.id,
    title: track.title,
    subtitle: track.subtitle ?? null,
    icon: track.icon ?? null,
    badge: track.badge ?? null,
    badge_color: track.badgeColor ?? null,
    target_audience: track.targetAudience ?? [],
    total_minutes: track.totalMinutes ?? 0,
    modules: track.modules ?? [],
    is_active: true,
    sort_order: idx,
  }));

  const { error } = await supabase
    .from("learning_tracks")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("❌ Failed:", error.message);
    process.exit(1);
  }

  console.log(`✅ ${rows.length} learning tracks seeded.`);
}

main();
