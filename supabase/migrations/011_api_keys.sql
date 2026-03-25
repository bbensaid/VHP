-- Migration 011: Developer API keys
-- Authenticated API access for researchers and developers.

CREATE TABLE IF NOT EXISTS api_keys (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name         TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
    key_prefix   TEXT NOT NULL,                    -- first 8 chars shown in UI (e.g. "htr_a1b2")
    key_hash     TEXT NOT NULL UNIQUE,             -- SHA-256 hex of the full key
    tier         TEXT NOT NULL DEFAULT 'researcher'
                   CHECK (tier IN ('researcher', 'enterprise')),
    requests_today INT NOT NULL DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at   TIMESTAMPTZ                       -- NULL = active
);

CREATE INDEX IF NOT EXISTS api_keys_user_idx     ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS api_keys_hash_idx     ON api_keys(key_hash) WHERE revoked_at IS NULL;

-- Reset daily request counter (call via pg_cron or Supabase scheduled function)
CREATE OR REPLACE FUNCTION reset_api_key_daily_counters()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
    UPDATE api_keys SET requests_today = 0;
END;
$$;

-- RLS: users can only see and manage their own keys
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "api_keys_owner" ON api_keys
    FOR ALL USING (user_id = auth.uid());
