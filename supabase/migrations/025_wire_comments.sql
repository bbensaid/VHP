-- Migration 025: Wire article discussion threads
-- Lightweight per-article comment threads tied to The Wire RSS feed.
-- Articles are identified by their canonical URL (the RSS <link> value).
-- Supabase Realtime is enabled so comment drawers update live without polling.

-- ── Comments table ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.wire_comments (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    article_url   TEXT        NOT NULL,
    article_title TEXT        NOT NULL DEFAULT '',
    user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    body          TEXT        NOT NULL CHECK (char_length(body) BETWEEN 2 AND 2000),
    upvotes       INT         NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS wire_comments_article_idx ON wire_comments(article_url);
CREATE INDEX IF NOT EXISTS wire_comments_user_idx    ON wire_comments(user_id);
CREATE INDEX IF NOT EXISTS wire_comments_created_idx ON wire_comments(created_at DESC);

-- ── Comment upvotes (one per user per comment) ────────────────────────────────

CREATE TABLE IF NOT EXISTS public.wire_comment_upvotes (
    user_id    UUID NOT NULL REFERENCES auth.users(id)      ON DELETE CASCADE,
    comment_id UUID NOT NULL REFERENCES wire_comments(id)   ON DELETE CASCADE,
    PRIMARY KEY (user_id, comment_id)
);

-- ── Trigger: keep upvotes counter in sync ─────────────────────────────────────

CREATE OR REPLACE FUNCTION sync_wire_comment_upvotes()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE wire_comments SET upvotes = upvotes + 1 WHERE id = NEW.comment_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE wire_comments SET upvotes = upvotes - 1 WHERE id = OLD.comment_id;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_wire_upvote ON wire_comment_upvotes;
CREATE TRIGGER trg_wire_upvote
AFTER INSERT OR DELETE ON wire_comment_upvotes
FOR EACH ROW EXECUTE FUNCTION sync_wire_comment_upvotes();

-- ── Per-article comment count view (used for badge counts in the feed) ─────────

CREATE OR REPLACE VIEW wire_comment_counts AS
SELECT article_url, COUNT(*) AS comment_count
FROM wire_comments
GROUP BY article_url;

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE wire_comments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE wire_comment_upvotes ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments (including anonymous visitors)
CREATE POLICY "wire_comments_public_read"
    ON wire_comments FOR SELECT USING (true);

-- Only authenticated users can post
CREATE POLICY "wire_comments_insert"
    ON wire_comments FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Authors can delete their own comments
CREATE POLICY "wire_comments_delete"
    ON wire_comments FOR DELETE
    USING (auth.uid() = user_id);

-- Upvotes: own row only
CREATE POLICY "wire_upvotes_own"
    ON wire_comment_upvotes FOR ALL
    USING (user_id = auth.uid());

-- ── Enable Realtime ───────────────────────────────────────────────────────────
-- Allows client subscriptions to receive INSERT/DELETE events without polling.
ALTER PUBLICATION supabase_realtime ADD TABLE wire_comments;
