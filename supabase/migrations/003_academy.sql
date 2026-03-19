-- ============================================================
-- MIGRATION 003: Academy — Enrollments, Progress, Certifications
-- ============================================================

-- ─── COURSE ENROLLMENTS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id            UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug   TEXT    NOT NULL,    -- Sanity course document slug
  enrolled_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at  TIMESTAMPTZ,
  progress_pct  INTEGER NOT NULL DEFAULT 0
    CHECK (progress_pct >= 0 AND progress_pct <= 100),
  updated_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, course_slug)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user   ON public.course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.course_enrollments(course_slug);

DROP TRIGGER IF EXISTS set_enrollments_updated_at ON public.course_enrollments;
CREATE TRIGGER set_enrollments_updated_at
  BEFORE UPDATE ON public.course_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── MODULE PROGRESS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.module_progress (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug         TEXT NOT NULL,   -- Sanity academyModule slug
  course_slug         TEXT,            -- parent course (optional)
  started_at          TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at        TIMESTAMPTZ,
  time_spent_seconds  INTEGER DEFAULT 0,
  UNIQUE(user_id, module_slug)
);

CREATE INDEX IF NOT EXISTS idx_module_progress_user ON public.module_progress(user_id);

-- ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.certifications (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cert_name         TEXT NOT NULL,
  cert_type         TEXT NOT NULL DEFAULT 'completion',  -- 'completion'|'professional'|'cme'
  course_slug       TEXT,
  issued_at         TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at        TIMESTAMPTZ,
  cert_url          TEXT,              -- Supabase Storage URL for PDF
  verification_hash TEXT UNIQUE,       -- for public /verify/[hash] page
  metadata          JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_certifications_user ON public.certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_hash ON public.certifications(verification_hash);
