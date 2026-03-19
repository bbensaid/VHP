# Supabase Seeds

Run these scripts to populate the database from the existing static data files.

## Prerequisites

1. Run all migrations in `supabase/migrations/` against your Supabase project
2. Ensure `frontend/.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

## Running

```bash
cd supabase/seed

# Install tsx if not present
npm install -g tsx

# Seed all content (state metrics, hospitals, RHT profiles, etc.)
npx tsx seed-content.ts

# Seed learning tracks
npx tsx seed-learning-tracks.ts
```

## Order

1. `seed-content.ts` — state_health_metrics, state_time_series, national_benchmark,
   rht_state_profiles, hospitals, state_initiatives
2. `seed-learning-tracks.ts` — learning_tracks

## Notes

- All scripts use `upsert` with `onConflict` — safe to re-run
- Uses `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS) — never expose in frontend
- Static `.ts` data files in `frontend/lib/data/` remain as the source of truth
  until live data feeds replace them (Roadmap item #4)
