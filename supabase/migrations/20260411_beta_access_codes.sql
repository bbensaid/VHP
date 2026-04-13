-- Migration: beta_access_codes
-- Purpose: Store MVP beta access codes for early-tester gate.
-- Run this in the Supabase SQL editor before deploying the beta gate.

CREATE TABLE IF NOT EXISTS beta_access_codes (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  code       text        UNIQUE NOT NULL,
  label      text,                          -- human-readable label, e.g. "Will D."
  is_active  boolean     NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Seed initial authorized codes
INSERT INTO beta_access_codes (code, label) VALUES
  ('Will_D_0.0.0',    'Will D.'),
  ('Kristin_M_0.0.0', 'Kristin M.'),
  ('Bechir_B_0.0.0',  'Bechir B.')
ON CONFLICT (code) DO NOTHING;

-- RLS: only the service-role key can read/write (anon cannot)
ALTER TABLE beta_access_codes ENABLE ROW LEVEL SECURITY;

-- No public policies — service-role bypasses RLS entirely.
-- The verify API route uses dbAdmin (service-role key), so no policy needed.
