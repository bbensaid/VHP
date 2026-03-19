-- ============================================================
-- MIGRATION 002: Content Data Tables
-- Replaces all static TypeScript data files
-- ============================================================

-- ─── STATE HEALTH METRICS ────────────────────────────────────────────────────
-- Merges states.ts + performance-index-data.ts
CREATE TABLE IF NOT EXISTS public.state_health_metrics (
  id                        UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id                  TEXT    NOT NULL UNIQUE,   -- 'vermont', 'california'
  state_name                TEXT    NOT NULL,
  state_code                TEXT    NOT NULL,           -- 'VT', 'CA'

  -- From states.ts
  health_status             TEXT    NOT NULL,           -- 'Critical'|'Warning'|'Stable'|'Improving'
  trend                     TEXT    NOT NULL,           -- 'up'|'down'|'flat'
  composite_score           INTEGER NOT NULL,
  hospital_margin           NUMERIC(6,2),
  uninsured_rate            NUMERIC(5,2),

  -- From performance-index-data.ts
  performance_score         INTEGER,
  performance_status        TEXT,                       -- 'Leading'|'Improving'|'Stable'|'At Risk'

  -- Policy pillar sub-scores (0-100)
  policy_vbp_adoption       INTEGER,
  policy_telehealth         INTEGER,
  policy_scope_of_practice  INTEGER,

  -- Economics pillar sub-scores
  econ_spending_per_capita  INTEGER,
  econ_workforce_gaps       INTEGER,
  econ_insurance_coverage   INTEGER,

  -- Technology pillar sub-scores
  tech_hie_adoption         INTEGER,
  tech_broadband_access     INTEGER,
  tech_ehr_adoption         INTEGER,

  -- Clinical pillar sub-scores
  clinical_preventive_care  INTEGER,
  clinical_readmission_rate INTEGER,
  clinical_chronic_disease  INTEGER,

  -- Equity pillar sub-scores
  equity_racial_gap         INTEGER,
  equity_rural_urban_gap    INTEGER,
  equity_sdoh_integration   INTEGER,

  -- Narrative
  narrative_title           TEXT,
  narrative_summary         TEXT,

  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_state_metrics_code ON public.state_health_metrics(state_code);

-- ─── STATE TIME SERIES ───────────────────────────────────────────────────────
-- From hti-timeseries-data.ts
CREATE TABLE IF NOT EXISTS public.state_time_series (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id    TEXT NOT NULL UNIQUE,
  state_name  TEXT NOT NULL,
  region      TEXT NOT NULL,

  -- Clinical metrics (latest values)
  preventable_hospitalization_rate  NUMERIC(8,2),
  maternal_mortality_rate           NUMERIC(8,2),
  cancer_screening_rate             NUMERIC(5,2),
  mental_health_access_rate         NUMERIC(5,2),
  primary_care_density              NUMERIC(5,2),
  opioid_overdose_deaths            NUMERIC(5,2),
  uncompensated_care_ratio          NUMERIC(5,2),

  -- Economic metrics (latest values)
  spending_per_capita     INTEGER,
  medical_inflation_rate  NUMERIC(5,2),
  uninsured_rate          NUMERIC(5,2),
  medicaid_expansion      BOOLEAN,
  operating_margin_avg    NUMERIC(5,2),
  payer_mix_commercial    NUMERIC(5,2),
  workforce_turnover_rate NUMERIC(5,2),

  -- Quarterly snapshots: [{quarter, composite, digital, vbc, equity, outcomes, experience, workforce}]
  snapshots   JSONB NOT NULL DEFAULT '[]'::jsonb,

  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── RHT STATE PROFILES ──────────────────────────────────────────────────────
-- From rht-program.ts
CREATE TABLE IF NOT EXISTS public.rht_state_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id        TEXT NOT NULL UNIQUE,
  state_name      TEXT NOT NULL,
  award_amount    TEXT NOT NULL,
  status          TEXT,                -- 'Active'|'Pending'|'At Risk'
  strategic_focus TEXT NOT NULL,
  description     TEXT,
  -- [{title, description, status?}]
  initiatives     JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- [{label, value?, trend?, status, target?}]
  metrics         JSONB NOT NULL DEFAULT '[]'::jsonb,
  simulation      JSONB,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── HOSPITALS ───────────────────────────────────────────────────────────────
-- From hospital-data.ts
CREATE TABLE IF NOT EXISTS public.hospitals (
  id                  TEXT    PRIMARY KEY,        -- 'vt-1', 'ca-2'
  name                TEXT    NOT NULL,
  city                TEXT    NOT NULL,
  state_id            TEXT    NOT NULL,            -- 'vermont', 'california'
  state_code          TEXT,                        -- 'VT', 'CA'
  hospital_type       TEXT    NOT NULL,            -- 'Critical Access'|'Rural PPS'|'Urban'
  total_discharges    INTEGER NOT NULL,
  avg_length_of_stay  NUMERIC(4,1) NOT NULL,
  quality_score       INTEGER NOT NULL,
  updated_at          TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hospitals_state ON public.hospitals(state_id);
CREATE INDEX IF NOT EXISTS idx_hospitals_type  ON public.hospitals(hospital_type);

-- ─── LEARNING TRACKS ─────────────────────────────────────────────────────────
-- From learning-tracks-data.ts
CREATE TABLE IF NOT EXISTS public.learning_tracks (
  id              TEXT    PRIMARY KEY,   -- 'health-economics-foundations'
  title           TEXT    NOT NULL,
  subtitle        TEXT,
  icon            TEXT,
  badge           TEXT,
  badge_color     TEXT,
  target_audience TEXT[]  DEFAULT '{}',
  total_minutes   INTEGER NOT NULL DEFAULT 0,
  -- [{slug, title, estimatedMinutes, level, summary, learningObjectives[]}]
  modules         JSONB   NOT NULL DEFAULT '[]'::jsonb,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── STATE INITIATIVES ───────────────────────────────────────────────────────
-- From state-initiatives-data.ts
CREATE TABLE IF NOT EXISTS public.state_initiatives (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id      TEXT NOT NULL UNIQUE,
  state_name    TEXT NOT NULL,
  region        TEXT,
  internal_link TEXT,     -- e.g. '/vermont-act-167'
  -- [{id, title, description, type, status, year?, amount?, externalUrl?, internalLink?}]
  initiatives   JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── NATIONAL BENCHMARK (time series) ───────────────────────────────────────
-- Stored as a single row
CREATE TABLE IF NOT EXISTS public.national_benchmark (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- [{quarter, composite, digital, vbc, equity, outcomes, experience, workforce}]
  snapshots   JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
