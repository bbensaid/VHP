-- ============================================================
-- MIGRATION 004: Advisory Clients & Reports
-- ============================================================

-- ─── ADVISORY CLIENTS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.advisory_clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name    TEXT NOT NULL,
  contact_name    TEXT,
  contact_title   TEXT,
  tier            TEXT NOT NULL DEFAULT 'standard',  -- 'standard'|'premium'|'enterprise'
  contract_start  TIMESTAMPTZ,
  contract_end    TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT TRUE,
  notes           TEXT,                               -- internal admin notes
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_advisory_clients_updated_at ON public.advisory_clients;
CREATE TRIGGER set_advisory_clients_updated_at
  BEFORE UPDATE ON public.advisory_clients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── ADVISORY REPORTS ────────────────────────────────────────────────────────
-- Custom/exclusive reports available to advisory clients or publicly
CREATE TABLE IF NOT EXISTS public.advisory_reports (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  report_url   TEXT,                       -- Supabase Storage signed URL or external
  -- NULL client_id = available to all advisory clients; specific id = exclusive
  client_id    UUID REFERENCES public.advisory_clients(id) ON DELETE SET NULL,
  is_public    BOOLEAN DEFAULT FALSE,      -- TRUE = anyone can access
  pillar       TEXT,
  tags         TEXT[]  DEFAULT '{}',
  published_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_advisory_reports_client ON public.advisory_reports(client_id);
CREATE INDEX IF NOT EXISTS idx_advisory_reports_public ON public.advisory_reports(is_public);
