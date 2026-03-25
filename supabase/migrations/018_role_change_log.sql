-- Migration 018: Role change audit log (§3.2)
-- Automatically records every change to a user's role in user_roles,
-- providing an immutable audit trail for billing disputes and security reviews.

CREATE TABLE IF NOT EXISTS role_change_log (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    old_role    TEXT,
    new_role    TEXT NOT NULL,
    changed_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    changed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    reason      TEXT  -- e.g. 'stripe_webhook', 'admin_override', 'signup_default'
);

CREATE INDEX IF NOT EXISTS role_change_log_user_idx ON role_change_log(user_id);
CREATE INDEX IF NOT EXISTS role_change_log_time_idx ON role_change_log(changed_at DESC);

-- RLS: users can read their own history; service role sees all
ALTER TABLE role_change_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "role_change_log_own_read" ON role_change_log
    FOR SELECT USING (user_id = auth.uid());

-- Trigger function: fires automatically on every UPDATE to user_roles
CREATE OR REPLACE FUNCTION log_role_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only log if the role actually changed
    IF OLD.role IS DISTINCT FROM NEW.role THEN
        INSERT INTO role_change_log (user_id, old_role, new_role, reason)
        VALUES (NEW.user_id, OLD.role, NEW.role, 'trigger');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_role_change
    AFTER UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION log_role_change();
