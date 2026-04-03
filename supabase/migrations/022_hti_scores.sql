-- Migration 022: HTI (Health Transformation Index) scores table
-- Replaces the hardcoded data in lib/data/hti-timeseries-data.ts with
-- a Supabase-backed store that can be updated via admin dashboard or
-- the sync_hti_scores.py backend script without a frontend redeploy.

CREATE TABLE IF NOT EXISTS public.hti_scores (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id        TEXT NOT NULL,          -- e.g. "vermont", "california"
  state_name      TEXT NOT NULL,
  region          TEXT,
  quarter         TEXT NOT NULL,          -- e.g. "Q1-2025"
  composite       NUMERIC(5,2),
  digital         NUMERIC(5,2),
  vbc             NUMERIC(5,2),
  equity          NUMERIC(5,2),
  outcomes        NUMERIC(5,2),
  experience      NUMERIC(5,2),
  workforce       NUMERIC(5,2),
  -- Clinical metrics
  preventable_hospitalization_rate NUMERIC(8,2),
  maternal_mortality_rate          NUMERIC(6,2),
  cancer_screening_rate            NUMERIC(5,2),
  mental_health_access_rate        NUMERIC(5,2),
  primary_care_density             NUMERIC(6,2),
  opioid_overdose_deaths           NUMERIC(6,2),
  uncompensated_care_ratio         NUMERIC(5,2),
  -- Economic metrics
  spending_per_capita              INTEGER,
  medical_inflation_rate           NUMERIC(5,2),
  uninsured_rate                   NUMERIC(5,2),
  medicaid_expansion               BOOLEAN DEFAULT false,
  operating_margin_avg             NUMERIC(5,2),
  payer_mix_commercial             NUMERIC(5,2),
  workforce_turnover_rate          NUMERIC(5,2),
  -- Metadata
  data_source     TEXT DEFAULT 'manual',  -- 'cms_qpp' | 'onc' | 'ncqa' | 'manual'
  fetched_at      TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (state_id, quarter)
);

-- Index for common queries: by state, by quarter
CREATE INDEX IF NOT EXISTS idx_hti_scores_state_id ON public.hti_scores(state_id);
CREATE INDEX IF NOT EXISTS idx_hti_scores_quarter  ON public.hti_scores(quarter);

-- RLS: readable by all authenticated users; writable only via service role
ALTER TABLE public.hti_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hti_scores_read"
  ON public.hti_scores FOR SELECT
  USING (true);  -- Public read (scores are not sensitive)

-- Admin-only Next.js API route for manual entry (/api/admin/hti-scores)
-- uses dbAdmin (service role) which bypasses RLS — no INSERT/UPDATE policy needed.

COMMENT ON TABLE public.hti_scores IS
  'HTI quarterly scores per state. Populated by sync_hti_scores.py (CMS QPP / ONC / NCQA) or manual admin entry. Frontend falls back to static data in lib/data/hti-timeseries-data.ts when empty.';

-- ─── Hospital data table ───────────────────────────────────────────────────────
-- Stores CMS Provider of Services data synced by sync_hospitals.py
-- The Sanity hospital schema handles narrative/editorial data;
-- this table handles bulk CMS operational data.

CREATE TABLE IF NOT EXISTS public.hospitals_cms (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cms_provider_id       TEXT NOT NULL UNIQUE,   -- CMS certification number
  name                  TEXT NOT NULL,
  state                 TEXT NOT NULL,           -- lowercase slug, e.g. "vermont"
  city                  TEXT,
  county                TEXT,
  zip                   TEXT,
  hospital_type         TEXT,                   -- e.g. "Short-Term Acute Care"
  ownership             TEXT,                   -- "Government - State", "Voluntary non-profit - Church", etc.
  beds                  INTEGER,
  emergency_services    BOOLEAN DEFAULT false,
  cms_star_rating       INTEGER,                -- 1-5 overall star rating
  readmission_rate      NUMERIC(5,2),           -- % 30-day all-cause
  mortality_rate        NUMERIC(5,2),           -- % 30-day
  safety_score          TEXT,                   -- Leapfrog grade: A/B/C/D/F
  data_year             INTEGER,
  fetched_at            TIMESTAMPTZ DEFAULT NOW(),
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hospitals_cms_state ON public.hospitals_cms(state);

ALTER TABLE public.hospitals_cms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hospitals_cms_read"
  ON public.hospitals_cms FOR SELECT
  USING (true);

COMMENT ON TABLE public.hospitals_cms IS
  'CMS Provider of Services hospital data. Synced quarterly by backend/scripts/sync_hospitals.py. Supplements editorial hospital data in Sanity.';
