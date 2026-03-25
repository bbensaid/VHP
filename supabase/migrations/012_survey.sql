-- Migration 012: Annual "State of Healthcare Transformation" survey
-- Collect structured responses for HTR's flagship annual research report.

CREATE TABLE IF NOT EXISTS survey_editions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year        INT NOT NULL UNIQUE,
    title       TEXT NOT NULL,
    open_at     TIMESTAMPTZ NOT NULL,
    close_at    TIMESTAMPTZ NOT NULL,
    published   BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO survey_editions (year, title, open_at, close_at)
VALUES (2026,
        'State of Healthcare Transformation 2026',
        NOW(),
        '2026-06-30 23:59:59+00')
ON CONFLICT (year) DO NOTHING;

CREATE TABLE IF NOT EXISTS survey_responses (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_id     UUID NOT NULL REFERENCES survey_editions(id),
    user_id        UUID REFERENCES auth.users(id) ON DELETE SET NULL,  -- nullable = anonymous allowed
    -- Step 1: Respondent profile
    respondent_role       TEXT NOT NULL,   -- "hospital_exec", "state_official", "consultant", "researcher", "payer", "other"
    org_type              TEXT NOT NULL,   -- "hospital_system", "state_agency", "federal_agency", "consulting", "payer", "nonprofit", "academic", "other"
    org_size              TEXT,            -- "under_100", "100_999", "1000_4999", "5000_plus"
    state_focus           TEXT,            -- US state abbreviation or "national"
    -- Step 2: Transformation readiness
    transformation_readiness  INT CHECK (transformation_readiness BETWEEN 1 AND 5),
    biggest_barrier           TEXT,        -- "funding", "workforce", "technology", "policy", "culture", "data", "other"
    biggest_opportunity       TEXT,        -- "vbc", "ai_analytics", "telehealth", "interoperability", "sdoh", "workforce", "other"
    -- Step 3: Technology & AI
    ai_adoption_score         INT CHECK (ai_adoption_score BETWEEN 1 AND 5),
    ehr_satisfaction          INT CHECK (ehr_satisfaction BETWEEN 1 AND 5),
    interop_readiness         INT CHECK (interop_readiness BETWEEN 1 AND 5),
    -- Step 4: Policy priorities (free-text + ranked)
    top_federal_priority      TEXT,
    top_state_priority        TEXT,
    open_comments             TEXT CHECK (char_length(open_comments) <= 2000),
    -- Metadata
    completed                 BOOLEAN NOT NULL DEFAULT FALSE,
    created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS survey_responses_edition_idx ON survey_responses(edition_id);
CREATE INDEX IF NOT EXISTS survey_responses_user_idx    ON survey_responses(user_id);

-- Prevent duplicate submissions per user per edition
CREATE UNIQUE INDEX IF NOT EXISTS survey_responses_one_per_user
    ON survey_responses(edition_id, user_id)
    WHERE user_id IS NOT NULL;

-- RLS
ALTER TABLE survey_editions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Editions: public read
CREATE POLICY "survey_editions_read" ON survey_editions FOR SELECT USING (true);

-- Responses: insert open to all (anonymous ok); users can read their own; no update/delete
CREATE POLICY "survey_responses_insert" ON survey_responses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "survey_responses_own_read" ON survey_responses
    FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

-- Aggregate view (no PII) — used by the public results page
CREATE OR REPLACE VIEW survey_aggregate AS
SELECT
    e.year,
    e.title,
    COUNT(r.id) FILTER (WHERE r.completed) AS total_responses,
    ROUND(AVG(r.transformation_readiness) FILTER (WHERE r.completed), 2) AS avg_readiness,
    ROUND(AVG(r.ai_adoption_score) FILTER (WHERE r.completed), 2) AS avg_ai_adoption,
    ROUND(AVG(r.ehr_satisfaction) FILTER (WHERE r.completed), 2) AS avg_ehr_satisfaction,
    ROUND(AVG(r.interop_readiness) FILTER (WHERE r.completed), 2) AS avg_interop_readiness,
    MODE() WITHIN GROUP (ORDER BY r.biggest_barrier) AS top_barrier,
    MODE() WITHIN GROUP (ORDER BY r.biggest_opportunity) AS top_opportunity,
    MODE() WITHIN GROUP (ORDER BY r.respondent_role) AS top_respondent_role
FROM survey_editions e
LEFT JOIN survey_responses r ON r.edition_id = e.id
GROUP BY e.id, e.year, e.title;

-- Grant anon SELECT on aggregate view
GRANT SELECT ON survey_aggregate TO anon, authenticated;
