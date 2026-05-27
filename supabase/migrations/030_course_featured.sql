ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
UPDATE courses SET is_featured = true WHERE slug = 'hie-health-reform-onboarding';
