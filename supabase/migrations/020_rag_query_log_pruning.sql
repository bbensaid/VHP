-- Migration 020: Automated pruning for rag_query_log
-- Deletes rows older than 90 days to prevent unbounded table growth.
-- Runs nightly via pg_cron (requires pg_cron extension enabled in Supabase dashboard).

-- Enable pg_cron if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage to postgres role (required by pg_cron)
GRANT USAGE ON SCHEMA cron TO postgres;

-- Schedule nightly pruning at 03:00 UTC
SELECT cron.schedule(
  'prune-rag-query-log',           -- job name (idempotent on re-run)
  '0 3 * * *',                     -- cron: every day at 03:00 UTC
  $$
    DELETE FROM rag_query_log
    WHERE created_at < NOW() - INTERVAL '90 days';
  $$
);

-- Add a partial index to speed up the delete (if not already present)
CREATE INDEX IF NOT EXISTS rag_query_log_old_rows_idx
  ON rag_query_log (created_at)
  WHERE created_at < NOW() - INTERVAL '90 days';

COMMENT ON TABLE rag_query_log IS
  'AI query observability log. Rows older than 90 days are pruned nightly by pg_cron job "prune-rag-query-log".';
