-- ============================================================
-- HTR Course System — PostgreSQL Schema (idempotent)
-- Run order: 028 (after 003_academy.sql)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ── ENUMS (safe to re-run) ────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE htr_pillar AS ENUM ('policy','technology','economics','clinical','equity','operations');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE enrollment_status AS ENUM ('not_started','in_progress','completed','paused');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE lesson_progress_status AS ENUM ('not_started','in_progress','completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE quiz_question_type AS ENUM ('single_choice','multi_choice','true_false');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE media_type AS ENUM ('youtube','vimeo','upload','external');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── COURSES ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS courses (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  subtitle          TEXT,
  description       TEXT,
  cover_image_url   TEXT,
  target_audience   TEXT[]       DEFAULT '{}',
  prerequisites     TEXT[]       DEFAULT '{}',
  estimated_hours   NUMERIC(5,1) DEFAULT 0,
  is_published      BOOLEAN      DEFAULT false,
  version           TEXT         DEFAULT '1.0.0',
  created_at        TIMESTAMPTZ  DEFAULT NOW(),
  updated_at        TIMESTAMPTZ  DEFAULT NOW()
);

-- ── TRACKS ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tracks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  pillar          htr_pillar NOT NULL,
  "order"         SMALLINT NOT NULL,
  slug            TEXT NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  icon            TEXT,
  target_audience TEXT[]  DEFAULT '{}',
  is_published    BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (course_id, slug),
  UNIQUE (course_id, "order")
);

-- ── LESSONS ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS lessons (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id          UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  pillar            htr_pillar NOT NULL,
  "order"           SMALLINT NOT NULL,
  slug              TEXT NOT NULL,
  title             TEXT NOT NULL,
  summary           TEXT,
  estimated_minutes SMALLINT DEFAULT 10,
  objectives        JSONB DEFAULT '[]',
  content_blocks    JSONB DEFAULT '[]',
  tags              TEXT[] DEFAULT '{}',
  related_lesson_ids UUID[] DEFAULT '{}',
  is_published      BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (track_id, slug),
  UNIQUE (track_id, "order")
);

-- ── QUIZZES ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS quizzes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id       UUID NOT NULL UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
  title           TEXT,
  passing_score   SMALLINT DEFAULT 70 CHECK (passing_score BETWEEN 0 AND 100),
  shuffle_options BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id       UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  "order"       SMALLINT NOT NULL,
  question_type quiz_question_type NOT NULL,
  question      TEXT NOT NULL,
  explanation   TEXT,
  points        SMALLINT DEFAULT 1 CHECK (points BETWEEN 1 AND 10),
  UNIQUE (quiz_id, "order")
);

CREATE TABLE IF NOT EXISTS quiz_options (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  "order"     SMALLINT NOT NULL,
  text        TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL DEFAULT false,
  explanation TEXT,
  UNIQUE (question_id, "order")
);

-- ── AUDIO SLOTS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS audio_slots (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id      UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  slot_key       TEXT NOT NULL,
  label          TEXT NOT NULL,
  hint           TEXT,
  uploaded_url   TEXT,
  transcript_url TEXT,
  uploaded_by    UUID,
  uploaded_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (lesson_id, slot_key)
);

-- ── ENROLLMENTS ──────────────────────────────────────────────
-- Named "course_enrollments" to avoid collision with any pre-existing "enrollments" table.

CREATE TABLE IF NOT EXISTS course_player_enrollments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL,
  course_id         UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status            enrollment_status DEFAULT 'not_started',
  enrolled_at       TIMESTAMPTZ DEFAULT NOW(),
  completed_at      TIMESTAMPTZ,
  percent_complete  NUMERIC(5,2) DEFAULT 0 CHECK (percent_complete BETWEEN 0 AND 100),
  current_lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  UNIQUE (user_id, course_id)
);

-- ── LESSON PROGRESS ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS course_lesson_progress (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id            UUID NOT NULL,
  lesson_id          UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  enrollment_id      UUID NOT NULL REFERENCES course_player_enrollments(id) ON DELETE CASCADE,
  status             lesson_progress_status DEFAULT 'not_started',
  started_at         TIMESTAMPTZ,
  completed_at       TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE (user_id, lesson_id)
);

-- ── QUIZ ATTEMPTS ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS course_quiz_attempts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL,
  quiz_id      UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  answers      JSONB NOT NULL DEFAULT '{}',
  score        NUMERIC(5,2) CHECK (score BETWEEN 0 AND 100),
  passed       BOOLEAN,
  attempt_num  SMALLINT DEFAULT 1,
  started_at   TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ── AUDIO UPLOADS BY LEARNER ─────────────────────────────────

CREATE TABLE IF NOT EXISTS learner_audio_uploads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL,
  lesson_id   UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  slot_key    TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  file_name   TEXT,
  file_size   INTEGER,
  mime_type   TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── BOOKMARKS ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS lesson_bookmarks (
  user_id    UUID NOT NULL,
  lesson_id  UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

-- ── NOTES ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS lesson_notes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL,
  lesson_id  UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_tracks_course_id        ON tracks(course_id);
CREATE INDEX IF NOT EXISTS idx_tracks_pillar            ON tracks(pillar);
CREATE INDEX IF NOT EXISTS idx_lessons_track_id         ON lessons(track_id);
CREATE INDEX IF NOT EXISTS idx_lessons_pillar           ON lessons(pillar);
CREATE INDEX IF NOT EXISTS idx_lessons_tags             ON lessons USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_lessons_title_trgm       ON lessons USING GIN(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_cpe_user_id              ON course_player_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_cpe_course_id            ON course_player_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_clp_user                 ON course_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_clp_lesson               ON course_lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_cqa_user                 ON course_quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_cqa_quiz                 ON course_quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_audio_slots_lesson       ON audio_slots(lesson_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user           ON lesson_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_lesson        ON lesson_notes(user_id, lesson_id);

-- ============================================================
-- UPDATED_AT TRIGGER
-- Uses CREATE OR REPLACE so it's safe if set_updated_at already exists.
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_courses_updated_at   ON courses;
DROP TRIGGER IF EXISTS trg_tracks_updated_at    ON tracks;
DROP TRIGGER IF EXISTS trg_lessons_updated_at   ON lessons;
DROP TRIGGER IF EXISTS trg_quizzes_updated_at   ON quizzes;
DROP TRIGGER IF EXISTS trg_notes_updated_at     ON lesson_notes;

CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON courses      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_tracks_updated_at  BEFORE UPDATE ON tracks       FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON lessons      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_quizzes_updated_at BEFORE UPDATE ON quizzes      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_notes_updated_at   BEFORE UPDATE ON lesson_notes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- AUTO-RECALCULATE enrollment percent_complete
-- ============================================================

CREATE OR REPLACE FUNCTION recalculate_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_total  INTEGER;
  v_done   INTEGER;
  v_pct    NUMERIC;
  v_status enrollment_status;
BEGIN
  SELECT COUNT(*) INTO v_total
  FROM lessons l
  JOIN tracks t ON l.track_id = t.id
  JOIN course_player_enrollments e ON t.course_id = e.course_id
  WHERE e.id = NEW.enrollment_id AND l.is_published = true;

  SELECT COUNT(*) INTO v_done
  FROM course_lesson_progress lp
  WHERE lp.enrollment_id = NEW.enrollment_id AND lp.status = 'completed';

  v_pct    := CASE WHEN v_total = 0 THEN 0 ELSE ROUND((v_done::NUMERIC / v_total) * 100, 2) END;
  v_status := CASE WHEN v_pct = 0 THEN 'not_started' WHEN v_pct = 100 THEN 'completed' ELSE 'in_progress' END;

  UPDATE course_player_enrollments
  SET percent_complete = v_pct,
      status           = v_status,
      completed_at     = CASE WHEN v_pct = 100 THEN NOW() ELSE NULL END
  WHERE id = NEW.enrollment_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enrollment_progress ON course_lesson_progress;
CREATE TRIGGER trg_enrollment_progress
  AFTER INSERT OR UPDATE OF status ON course_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION recalculate_enrollment_progress();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE course_player_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lesson_progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_quiz_attempts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_audio_uploads     ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_bookmarks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_notes              ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own_enrollments"     ON course_player_enrollments;
DROP POLICY IF EXISTS "own_lesson_progress" ON course_lesson_progress;
DROP POLICY IF EXISTS "own_quiz_attempts"   ON course_quiz_attempts;
DROP POLICY IF EXISTS "own_audio_uploads"   ON learner_audio_uploads;
DROP POLICY IF EXISTS "own_bookmarks"       ON lesson_bookmarks;
DROP POLICY IF EXISTS "own_notes"           ON lesson_notes;
DROP POLICY IF EXISTS "published_courses"   ON courses;
DROP POLICY IF EXISTS "published_tracks"    ON tracks;
DROP POLICY IF EXISTS "published_lessons"   ON lessons;

CREATE POLICY "own_enrollments"     ON course_player_enrollments FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own_lesson_progress" ON course_lesson_progress    FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own_quiz_attempts"   ON course_quiz_attempts      FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own_audio_uploads"   ON learner_audio_uploads     FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own_bookmarks"       ON lesson_bookmarks          FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own_notes"           ON lesson_notes              FOR ALL USING (user_id = auth.uid());

CREATE POLICY "published_courses"   ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "published_tracks"    ON tracks  FOR SELECT USING (is_published = true);
CREATE POLICY "published_lessons"   ON lessons FOR SELECT USING (is_published = true);

-- ============================================================
-- VIEWS
-- ============================================================

CREATE OR REPLACE VIEW course_lesson_summary AS
SELECT
  c.id    AS course_id,   c.title AS course_title,
  t.id    AS track_id,    t.title AS track_title,   t.pillar, t."order" AS track_order,
  l.id    AS lesson_id,   l.title AS lesson_title,  l."order" AS lesson_order,
  l.estimated_minutes, l.is_published,
  EXISTS (SELECT 1 FROM quizzes q WHERE q.lesson_id = l.id) AS has_quiz
FROM courses c
JOIN tracks  t ON t.course_id = c.id
JOIN lessons l ON l.track_id  = t.id
ORDER BY c.id, t."order", l."order";

CREATE OR REPLACE VIEW user_course_progress AS
SELECT
  e.user_id, e.course_id, c.title AS course_title,
  e.status, e.percent_complete, e.enrolled_at, e.completed_at,
  COUNT(lp.id) AS lessons_started,
  SUM(CASE WHEN lp.status = 'completed' THEN 1 ELSE 0 END) AS lessons_completed
FROM course_player_enrollments e
JOIN courses c ON c.id = e.course_id
LEFT JOIN course_lesson_progress lp ON lp.enrollment_id = e.id
GROUP BY e.user_id, e.course_id, c.title, e.status, e.percent_complete, e.enrolled_at, e.completed_at;
