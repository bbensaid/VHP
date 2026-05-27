-- Add sanity_slug to lessons: points to the Sanity academyModule slug.
-- When set, the course player fetches lesson body from Sanity at runtime
-- instead of reading content_blocks from this table.
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS sanity_slug text;
