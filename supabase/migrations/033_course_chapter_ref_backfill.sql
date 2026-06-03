-- Backfill courses.chapter_ref from the course→chapter map in
-- PLAN_SANITY_ECOSYSTEM.md §6 (derived from chapters.ts pillar groupings).
-- Where the plan lists multiple chapters, the LEAD chapter is stored.
-- Run AFTER 032_course_chapter_ref.sql.

UPDATE courses SET chapter_ref = m.chapter_ref
FROM (VALUES
  ('medicaid-101',                     '5'),
  ('medicare-fundamentals',            '5'),
  ('medicaid-managed-care-operations', '5'),
  ('value-based-care',                 '8'),   -- 8, 9
  ('hospital-finance',                 '8'),   -- 8, 9
  ('ai-machine-learning-healthcare',   '6'),   -- 6, 7
  ('interoperability-data-exchange',   '6'),   -- 6, 7
  ('clinical-quality-measurement',     '11'),
  ('population-health-management',     '10'),  -- 10, 11
  ('behavioral-health-integration',    '10'),
  ('genomics-precision-medicine',      '7'),   -- 7, 10 (lead = tech/genomics)
  ('health-equity-sdoh',               '12'),  -- 12, 13
  ('revenue-cycle-management',         '14'),  -- 14, 15
  ('hie-health-reform-onboarding',     '16'),  -- Knowledge Transfer
  ('welcome-htr-framework',            '1')    -- Framework
) AS m(slug, chapter_ref)
WHERE courses.slug = m.slug;
