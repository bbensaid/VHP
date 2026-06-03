-- Book tie-in: link each course to a book chapter (chapters.ts `num`).
-- Stored as text to match the Sanity `chapterRef` field ("1"–"20", or
-- non-numeric "Preface"/"Introduction"). Single primary chapter per course;
-- courses spanning multiple chapters store the lead chapter here.

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS chapter_ref text;
