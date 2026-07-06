-- Migration: beta_access_codes domain scoping
-- Purpose: Scope each beta access code to specific domains so an authorized
--   user is no longer granted access to all four domains by a single code.
-- Run this in the Supabase SQL editor.
--
-- Access domains (canonical, lowercase, no port, no "www."):
--   healthtransformationreview.org      healthtransformationreview.com
--   healthtransformationsolutions.org   healthtransformationsolutions.com
--
-- A code is valid on a domain only if that domain appears in allowed_domains.
-- Kept in sync with ACCESS_DOMAINS in frontend/lib/brand.ts.

ALTER TABLE beta_access_codes
  ADD COLUMN IF NOT EXISTS allowed_domains text[] NOT NULL DEFAULT '{}';

-- Non-disruptive backfill: existing codes keep working on all four domains.
-- Only touches rows that were created before this column existed (empty array).
UPDATE beta_access_codes
  SET allowed_domains = ARRAY[
    'healthtransformationreview.org',
    'healthtransformationreview.com',
    'healthtransformationsolutions.org',
    'healthtransformationsolutions.com'
  ]
  WHERE allowed_domains = '{}';
