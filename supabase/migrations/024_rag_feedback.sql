-- Migration 024: AI response feedback (thumbs up / thumbs down)
-- Stores per-message quality signals from users for RAG quality monitoring.
-- Feeds the admin AI Analytics dashboard with answer quality metrics.

CREATE TABLE IF NOT EXISTS public.rag_feedback (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_id   TEXT        NOT NULL,          -- client-generated message UUID
  rating       TEXT        NOT NULL CHECK (rating IN ('up', 'down')),
  query        TEXT,                          -- the user's question (for analysis)
  response     TEXT,                          -- first 500 chars of AI response
  pillar       TEXT,                          -- active pillar at time of feedback
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One feedback per user per message (upsert-safe)
  UNIQUE (user_id, message_id)
);

-- Indexes for admin analytics queries
CREATE INDEX IF NOT EXISTS rag_feedback_user_idx    ON public.rag_feedback (user_id);
CREATE INDEX IF NOT EXISTS rag_feedback_rating_idx  ON public.rag_feedback (rating);
CREATE INDEX IF NOT EXISTS rag_feedback_created_idx ON public.rag_feedback (created_at DESC);

-- RLS: users can read/write only their own feedback
ALTER TABLE public.rag_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feedback_own_read" ON public.rag_feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "feedback_own_write" ON public.rag_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "feedback_own_update" ON public.rag_feedback
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin view: aggregate feedback stats (used by /admin/analytics)
CREATE OR REPLACE VIEW public.rag_feedback_stats AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  rating,
  COUNT(*)                       AS count,
  pillar
FROM public.rag_feedback
GROUP BY 1, 2, 4
ORDER BY 1 DESC, 2;

COMMENT ON TABLE public.rag_feedback IS
  'Per-message thumbs up/down feedback from users. One row per user per message. Used to monitor RAG answer quality.';
