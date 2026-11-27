-- get_or_create_referral_code (009) is SECURITY DEFINER and trusted its
-- p_user_id argument, so any caller could read or create another user's code.
-- Restrict to the caller (service role may still act for anyone), and pin the
-- search_path so gen_random_bytes (pgcrypto, in `extensions`) always resolves.
CREATE OR REPLACE FUNCTION get_or_create_referral_code(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_code TEXT;
BEGIN
    IF auth.role() IS DISTINCT FROM 'service_role' AND p_user_id IS DISTINCT FROM auth.uid() THEN
        RAISE EXCEPTION 'not allowed';
    END IF;
    SELECT code INTO v_code FROM referral_codes WHERE user_id = p_user_id;
    IF v_code IS NULL THEN
        v_code := upper(substring(encode(gen_random_bytes(6), 'base64') from 1 for 6));
        v_code := replace(replace(v_code, '+', 'A'), '/', 'B');
        INSERT INTO referral_codes(user_id, code) VALUES (p_user_id, v_code);
    END IF;
    RETURN v_code;
END;
$$;
