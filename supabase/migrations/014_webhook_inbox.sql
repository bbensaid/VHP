-- Migration 014: Webhook dead letter queue (§4.4)
-- All incoming webhooks are stored immediately before processing.
-- Failed webhooks are retried with exponential backoff.

CREATE TABLE IF NOT EXISTS webhook_inbox (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source          TEXT NOT NULL,       -- 'stripe', 'sanity', 'loops'
    event_type      TEXT NOT NULL,
    payload         JSONB NOT NULL,
    headers         JSONB,               -- store signature headers for re-verification
    status          TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'processing', 'processed', 'failed', 'dead')),
    attempts        INT NOT NULL DEFAULT 0,
    next_retry_at   TIMESTAMPTZ,
    processed_at    TIMESTAMPTZ,
    error_message   TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS webhook_inbox_status_idx     ON webhook_inbox(status, next_retry_at)
    WHERE status IN ('pending', 'failed');
CREATE INDEX IF NOT EXISTS webhook_inbox_source_idx     ON webhook_inbox(source);
CREATE INDEX IF NOT EXISTS webhook_inbox_created_idx    ON webhook_inbox(created_at DESC);

-- Auto-mark as dead after 5 failed attempts
CREATE OR REPLACE FUNCTION webhook_inbox_mark_dead()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.attempts >= 5 AND NEW.status = 'failed' THEN
        NEW.status := 'dead';
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_webhook_dead
BEFORE UPDATE ON webhook_inbox
FOR EACH ROW EXECUTE FUNCTION webhook_inbox_mark_dead();

-- RLS: only service role can access (no user-facing RLS policies)
ALTER TABLE webhook_inbox ENABLE ROW LEVEL SECURITY;
