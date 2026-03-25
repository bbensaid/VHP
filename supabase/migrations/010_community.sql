-- Migration 010: Community forum
-- Lightweight discussion threads for the HTR member community.
-- Structure: categories → threads → posts

-- ── Categories ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS community_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        TEXT NOT NULL UNIQUE,
    name        TEXT NOT NULL,
    description TEXT,
    icon        TEXT,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO community_categories (slug, name, description, icon, sort_order) VALUES
  ('policy',       'Policy & Regulation',    'Discuss state and federal health policy developments.',    '📋', 1),
  ('economics',    'Economics & VBC',        'Value-based care, payment models, and health economics.',  '💰', 2),
  ('technology',   'Technology & AI',        'EHR, interoperability, AI in health, digital health.',     '🤖', 3),
  ('research',     'Research & Evidence',    'Share findings, ask for sources, discuss methodologies.',  '🔬', 4),
  ('tools',        'Research Lab Help',      'Tips and questions about HTR Research Lab tools.',         '🛠️', 5),
  ('general',      'General Discussion',     'Off-topic, introductions, and anything else.',             '💬', 6)
ON CONFLICT (slug) DO NOTHING;

-- ── Threads ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS community_threads (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id  UUID NOT NULL REFERENCES community_categories(id) ON DELETE CASCADE,
    author_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title        TEXT NOT NULL CHECK (char_length(title) BETWEEN 5 AND 200),
    body         TEXT NOT NULL CHECK (char_length(body) BETWEEN 10 AND 10000),
    pinned       BOOLEAN NOT NULL DEFAULT FALSE,
    locked       BOOLEAN NOT NULL DEFAULT FALSE,
    reply_count  INT NOT NULL DEFAULT 0,
    view_count   INT NOT NULL DEFAULT 0,
    last_reply_at TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS community_threads_category_idx ON community_threads(category_id);
CREATE INDEX IF NOT EXISTS community_threads_author_idx   ON community_threads(author_id);
CREATE INDEX IF NOT EXISTS community_threads_created_idx  ON community_threads(created_at DESC);

-- ── Posts (replies) ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS community_posts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id  UUID NOT NULL REFERENCES community_threads(id) ON DELETE CASCADE,
    author_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    body       TEXT NOT NULL CHECK (char_length(body) BETWEEN 2 AND 10000),
    upvotes    INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS community_posts_thread_idx ON community_posts(thread_id);
CREATE INDEX IF NOT EXISTS community_posts_author_idx ON community_posts(author_id);

-- ── Upvotes ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS community_upvotes (
    user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id  UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, post_id)
);

-- ── Trigger: update reply_count + last_reply_at on new post ──────────────────

CREATE OR REPLACE FUNCTION update_thread_on_new_post()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    UPDATE community_threads
    SET reply_count  = reply_count + 1,
        last_reply_at = NOW()
    WHERE id = NEW.thread_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_update_thread_on_post
AFTER INSERT ON community_posts
FOR EACH ROW EXECUTE FUNCTION update_thread_on_new_post();

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE community_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_threads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_upvotes    ENABLE ROW LEVEL SECURITY;

-- Categories: public read
CREATE POLICY "categories_public_read" ON community_categories
    FOR SELECT USING (true);

-- Threads: subscribers can read and create; authors can edit/delete own
CREATE POLICY "threads_read"   ON community_threads FOR SELECT USING (true);
CREATE POLICY "threads_insert" ON community_threads FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "threads_update" ON community_threads FOR UPDATE USING (author_id = auth.uid());
CREATE POLICY "threads_delete" ON community_threads FOR DELETE USING (author_id = auth.uid());

-- Posts: same pattern
CREATE POLICY "posts_read"   ON community_posts FOR SELECT USING (true);
CREATE POLICY "posts_insert" ON community_posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "posts_update" ON community_posts FOR UPDATE USING (author_id = auth.uid());
CREATE POLICY "posts_delete" ON community_posts FOR DELETE USING (author_id = auth.uid());

-- Upvotes: own only
CREATE POLICY "upvotes_own" ON community_upvotes
    FOR ALL USING (user_id = auth.uid());
