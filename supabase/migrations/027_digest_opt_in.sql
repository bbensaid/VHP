-- Migration 027: digest opt-in flag for the weekly email.
-- Sets the default to FALSE so existing users don't receive the digest
-- until they explicitly opt in (CAN-SPAM friendly). When a user opts in
-- via the account page, the flag flips to TRUE.

ALTER TABLE user_roles
    ADD COLUMN IF NOT EXISTS digest_opt_in BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE user_roles
    ADD COLUMN IF NOT EXISTS email TEXT;

-- Backfill email from auth.users where possible. Existing rows without an
-- email column populated will simply be skipped by the digest cron, which
-- short-circuits on `if (!u.email) continue;`.
UPDATE user_roles ur
SET email = au.email
FROM auth.users au
WHERE ur.user_id = au.id
  AND ur.email IS NULL;

CREATE INDEX IF NOT EXISTS user_roles_digest_opt_in_idx
    ON user_roles(digest_opt_in)
    WHERE digest_opt_in = TRUE;
