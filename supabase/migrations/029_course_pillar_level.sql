-- Add pillar and level columns to courses table.
-- Pillar reuses the existing htr_pillar enum. Level uses a new enum.

DO $$ BEGIN
  CREATE TYPE course_level AS ENUM ('foundational','intermediate','advanced');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS pillar htr_pillar,
  ADD COLUMN IF NOT EXISTS level  course_level;
