-- ============================================================
-- HTR RAG Setup: pgvector + content_embeddings
-- Run this once in your Supabase SQL Editor.
-- ============================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the embeddings table
--    Google text-embedding-004 produces 768-dimensional vectors.
CREATE TABLE IF NOT EXISTS content_embeddings (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id   TEXT        NOT NULL,        -- Sanity document _id
  content_type TEXT        NOT NULL,        -- post | policyAnalysis | academyModule | caseStudy | definition | analystNote | webinar | report
  title        TEXT,
  content      TEXT        NOT NULL,        -- plain-text chunk that was embedded
  url          TEXT,                        -- canonical URL on the HTR site
  pillar       TEXT,                        -- Policy | Economics | Technology | Clinical | Equity
  embedding    VECTOR(768),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Unique index so upserts work by content_id
CREATE UNIQUE INDEX IF NOT EXISTS content_embeddings_content_id_idx
  ON content_embeddings (content_id);

-- 4. HNSW index for fast approximate nearest-neighbour search (cosine distance)
CREATE INDEX IF NOT EXISTS content_embeddings_hnsw_idx
  ON content_embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- 5. Helper function used by the RAG query at chat time
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.5,
  match_count     INT   DEFAULT 5
)
RETURNS TABLE (
  id           UUID,
  content_id   TEXT,
  content_type TEXT,
  title        TEXT,
  content      TEXT,
  url          TEXT,
  pillar       TEXT,
  similarity   FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content_id,
    content_type,
    title,
    content,
    url,
    pillar,
    1 - (embedding <=> query_embedding) AS similarity
  FROM content_embeddings
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- ============================================================
-- Done. Now run scripts/sync-embeddings.ts to populate the table.
-- ============================================================
