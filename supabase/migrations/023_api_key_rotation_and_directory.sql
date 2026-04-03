-- Migration 023: API key rotation + professional directory
-- Adds key rotation support (expires_at, rotated_from) and opt-in
-- professional profile directory for subscribers.

-- ── API key rotation ──────────────────────────────────────────────────────────

ALTER TABLE api_keys
    ADD COLUMN IF NOT EXISTS expires_at    TIMESTAMPTZ,          -- NULL = never expires
    ADD COLUMN IF NOT EXISTS rotated_from  UUID REFERENCES api_keys(id) ON DELETE SET NULL;

-- Index for expiry cleanup cron
CREATE INDEX IF NOT EXISTS api_keys_expires_idx ON api_keys(expires_at)
    WHERE expires_at IS NOT NULL AND revoked_at IS NULL;

-- Cleanup function: auto-revoke expired keys (call via pg_cron hourly)
CREATE OR REPLACE FUNCTION revoke_expired_api_keys()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
    UPDATE api_keys
    SET    revoked_at = NOW()
    WHERE  expires_at < NOW()
    AND    revoked_at IS NULL;
END;
$$;

-- ── Professional directory ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS professional_profiles (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name      TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 80),
    title             TEXT CHECK (char_length(title) <= 120),
    organization      TEXT CHECK (char_length(organization) <= 120),
    organization_type TEXT CHECK (organization_type IN (
                          'health_system', 'health_plan', 'state_agency', 'federal_agency',
                          'aco', 'fqhc', 'cah', 'amc', 'consulting', 'vendor', 'nonprofit',
                          'academia', 'other')),
    bio               TEXT CHECK (char_length(bio) <= 600),
    linkedin_url      TEXT CHECK (char_length(linkedin_url) <= 300),
    pillars           TEXT[] DEFAULT '{}',   -- interests: policy, economics, technology, clinical, equity
    state             TEXT,                  -- US state slug (e.g. "vermont")
    is_public         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS prof_profiles_user_idx   ON professional_profiles(user_id);
CREATE INDEX IF NOT EXISTS prof_profiles_org_type_idx ON professional_profiles(organization_type)
    WHERE is_public = TRUE;
CREATE INDEX IF NOT EXISTS prof_profiles_state_idx  ON professional_profiles(state)
    WHERE is_public = TRUE;

-- Trigger: keep updated_at current
CREATE OR REPLACE FUNCTION touch_professional_profile()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_touch_profile
    BEFORE UPDATE ON professional_profiles
    FOR EACH ROW EXECUTE FUNCTION touch_professional_profile();

-- RLS
ALTER TABLE professional_profiles ENABLE ROW LEVEL SECURITY;

-- Public members can read public profiles
CREATE POLICY "profiles_public_read" ON professional_profiles
    FOR SELECT USING (is_public = TRUE);

-- Authenticated users can see all profiles (including non-public for their own row)
CREATE POLICY "profiles_own_read" ON professional_profiles
    FOR SELECT USING (user_id = auth.uid());

-- Users manage their own profile
CREATE POLICY "profiles_own_write" ON professional_profiles
    FOR ALL USING (user_id = auth.uid());
