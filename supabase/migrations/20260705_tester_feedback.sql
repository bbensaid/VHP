-- Migration: tester_feedback
-- Purpose: Persist every beta tester feedback submission so a submission is
--   never lost (previously feedback was email-only via Resend; a failed or
--   unconfigured email meant the report vanished). The email is still sent,
--   but the DB row is the durable record and the source for an admin view.
-- Run this in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS tester_feedback (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  tester_name   text        NOT NULL,
  domain        text,                          -- host the feedback was submitted from
  total         integer     NOT NULL DEFAULT 0,
  works         integer     NOT NULL DEFAULT 0,
  issues        integer     NOT NULL DEFAULT 0,
  broken        integer     NOT NULL DEFAULT 0,
  low_detail    boolean     NOT NULL DEFAULT false, -- true if any issues/broken lacked a note
  feedback      jsonb       NOT NULL DEFAULT '{}'::jsonb, -- { "/href": { rating, note } }
  email_sent    boolean     NOT NULL DEFAULT false, -- did the Resend email succeed?
  user_agent    text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tester_feedback_created_at_idx
  ON tester_feedback (created_at DESC);

-- RLS: only the service-role key (dbAdmin) reads/writes. The API route uses it;
-- anon has no access.
ALTER TABLE tester_feedback ENABLE ROW LEVEL SECURITY;
-- No public policies — service-role bypasses RLS entirely.
