-- Migration 026: Per-chapter private notes for the book reader.
-- Subscribers can annotate book chapters from /read/[slug]. Notes are
-- private to the author. Identified by the chapter's reader-mode slug
-- ("preface", "introduction", "chapter-01" … "chapter-20").

CREATE TABLE IF NOT EXISTS chapter_notes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    chapter_slug    TEXT NOT NULL,
    content         TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 4000),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chapter_notes_user_idx
    ON chapter_notes(user_id, chapter_slug, created_at DESC);

-- Keep updated_at fresh on edits
CREATE OR REPLACE FUNCTION update_chapter_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS chapter_notes_updated_at_trigger ON chapter_notes;
CREATE TRIGGER chapter_notes_updated_at_trigger
    BEFORE UPDATE ON chapter_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_chapter_notes_updated_at();

ALTER TABLE chapter_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chapter_notes_own" ON chapter_notes
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
