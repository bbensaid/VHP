-- Migration 009: Referral program
-- Creates referral_codes and referral_events tables.
-- Referral logic:
--   1. Each user gets a unique referral code on first visit to /account/referrals.
--   2. When someone signs up via ?ref=CODE, a referral_event row is inserted.
--   3. When the referred user converts to a paid plan, the referrer earns credit.

-- ── Referral codes ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS referral_codes (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    code         TEXT NOT NULL UNIQUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS referral_codes_user_idx ON referral_codes(user_id);
CREATE INDEX IF NOT EXISTS referral_codes_code_idx  ON referral_codes(code);

-- ── Referral events ────────────────────────────────────────────────────────────

CREATE TYPE referral_status AS ENUM ('signed_up', 'converted', 'credited');

CREATE TABLE IF NOT EXISTS referral_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    referred_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    referral_code   TEXT NOT NULL,
    status          referral_status NOT NULL DEFAULT 'signed_up',
    reward_months   INT NOT NULL DEFAULT 0,   -- free months credited to referrer
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    converted_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS referral_events_referrer_idx ON referral_events(referrer_id);
CREATE INDEX IF NOT EXISTS referral_events_code_idx     ON referral_events(referral_code);

-- ── Row Level Security ─────────────────────────────────────────────────────────

ALTER TABLE referral_codes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;

-- Users can read and insert their own referral code
CREATE POLICY "referral_codes_own" ON referral_codes
    FOR ALL USING (user_id = auth.uid());

-- Referrers can see their own referral events
CREATE POLICY "referral_events_referrer" ON referral_events
    FOR SELECT USING (referrer_id = auth.uid());

-- ── Helper function: upsert referral code ──────────────────────────────────────

CREATE OR REPLACE FUNCTION get_or_create_referral_code(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    v_code TEXT;
BEGIN
    SELECT code INTO v_code FROM referral_codes WHERE user_id = p_user_id;
    IF v_code IS NULL THEN
        -- Generate a 6-char alphanumeric code (uppercase)
        v_code := upper(substring(encode(gen_random_bytes(6), 'base64') from 1 for 6));
        -- Replace + and / from base64 output
        v_code := replace(replace(v_code, '+', 'A'), '/', 'B');
        INSERT INTO referral_codes(user_id, code) VALUES (p_user_id, v_code);
    END IF;
    RETURN v_code;
END;
$$;

-- ── Helper function: record sign-up via referral ───────────────────────────────

CREATE OR REPLACE FUNCTION record_referral_signup(p_code TEXT, p_referred_id UUID)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    v_referrer_id UUID;
BEGIN
    SELECT user_id INTO v_referrer_id FROM referral_codes WHERE code = p_code;
    IF v_referrer_id IS NULL THEN RETURN; END IF;
    IF v_referrer_id = p_referred_id THEN RETURN; END IF; -- no self-referral

    INSERT INTO referral_events(referrer_id, referred_id, referral_code)
    VALUES (v_referrer_id, p_referred_id, p_code)
    ON CONFLICT DO NOTHING;
END;
$$;
