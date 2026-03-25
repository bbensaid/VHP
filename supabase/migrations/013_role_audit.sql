-- Migration 013: Role change audit log (§3.2)
-- Records every change to user_roles for billing disputes, security investigations,
-- and compliance audits. Zero-touch: a trigger fires automatically on every UPDATE.

CREATE TABLE IF NOT EXISTS role_change_log (
    id           BIGSERIAL PRIMARY KEY,
    user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    old_role     TEXT,
    new_role     TEXT        NOT NULL,
    changed_by   UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
    reason       TEXT        NOT NULL DEFAULT 'trigger',
    -- ^ possible values: 'stripe_webhook', 'admin_override', 'signup_default',
    --                    'trial_start', 'trial_end', 'trigger'
    changed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS role_change_log_user_idx ON role_change_log(user_id);
CREATE INDEX IF NOT EXISTS role_change_log_time_idx ON role_change_log(changed_at DESC);

-- ── Trigger: fires on every row UPDATE to user_roles ──────────────────────────

CREATE OR REPLACE FUNCTION log_role_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    -- Only log when the role actually changed
    IF OLD.role IS DISTINCT FROM NEW.role THEN
        INSERT INTO role_change_log (user_id, old_role, new_role, reason)
        VALUES (NEW.user_id, OLD.role, NEW.role, 'trigger');
    END IF;
    RETURN NEW;
END;
$$;

-- Also log INSERT (first-time role assignment)
CREATE OR REPLACE FUNCTION log_role_insert()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO role_change_log (user_id, old_role, new_role, reason)
    VALUES (NEW.user_id, NULL, NEW.role, 'signup_default');
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_role_change  ON user_roles;
DROP TRIGGER IF EXISTS on_role_insert  ON user_roles;

CREATE TRIGGER on_role_change
AFTER UPDATE ON user_roles
FOR EACH ROW EXECUTE FUNCTION log_role_change();

CREATE TRIGGER on_role_insert
AFTER INSERT ON user_roles
FOR EACH ROW EXECUTE FUNCTION log_role_insert();

-- ── RLS: admins can read all; users can read their own ─────────────────────────

ALTER TABLE role_change_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "role_log_own_read" ON role_change_log
    FOR SELECT USING (user_id = auth.uid());

-- Admin read via service role key (no RLS policy needed — service key bypasses RLS)
