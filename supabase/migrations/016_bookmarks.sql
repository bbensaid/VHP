-- Migration 016: Article bookmarks and reading list (§5.9)
-- Users can bookmark articles (Sanity content identified by slug)
-- and add personal notes (annotations).

CREATE TABLE IF NOT EXISTS bookmarks (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Sanity document reference
    sanity_id   TEXT NOT NULL,          -- Sanity document _id
    slug        TEXT NOT NULL,          -- URL slug
    title       TEXT NOT NULL,
    pillar      TEXT,                   -- 'policy', 'economics', etc.
    content_type TEXT,                  -- 'policyAnalysis', 'caseStudy', etc.
    note        TEXT CHECK (char_length(note) <= 2000),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, sanity_id)
);

CREATE INDEX IF NOT EXISTS bookmarks_user_idx ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS bookmarks_pillar_idx ON bookmarks(user_id, pillar);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks_own" ON bookmarks
    FOR ALL USING (user_id = auth.uid());
