-- ============================================================
-- MIGRATION 005: RAG Vector Store (pgvector)
-- Replaces local LlamaIndex JSON storage in backend/storage/
-- ============================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ─── RAG DOCUMENTS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.rag_documents (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type     TEXT    NOT NULL,   -- 'pdf' | 'sanity_post' | 'sanity_policy' | etc.
  source_id       TEXT    NOT NULL,   -- Sanity _id or PDF filename
  title           TEXT,
  chunk_text      TEXT    NOT NULL,
  chunk_index     INTEGER DEFAULT 0,
  embedding       VECTOR(768),        -- text-embedding-004 produces 768-dim vectors
  pillar          TEXT,               -- 'Policy'|'Economics'|'Technology'|'Clinical'|'Equity'
  url             TEXT,               -- canonical URL for citations
  last_indexed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  metadata        JSONB   DEFAULT '{}'::jsonb,
  UNIQUE(source_id, chunk_index)
);

-- HNSW index for fast approximate cosine similarity search
CREATE INDEX IF NOT EXISTS idx_rag_embedding
  ON public.rag_documents
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_rag_source  ON public.rag_documents(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_rag_pillar  ON public.rag_documents(pillar);

-- ─── MATCH FUNCTION ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.match_rag_documents(
  query_embedding VECTOR(768),
  match_threshold FLOAT   DEFAULT 0.7,
  match_count     INT     DEFAULT 8,
  filter_pillar   TEXT    DEFAULT NULL
)
RETURNS TABLE (
  id          UUID,
  source_type TEXT,
  source_id   TEXT,
  title       TEXT,
  chunk_text  TEXT,
  pillar      TEXT,
  url         TEXT,
  similarity  FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.source_type,
    r.source_id,
    r.title,
    r.chunk_text,
    r.pillar,
    r.url,
    1 - (r.embedding <=> query_embedding) AS similarity
  FROM public.rag_documents r
  WHERE
    r.embedding IS NOT NULL
    AND 1 - (r.embedding <=> query_embedding) > match_threshold
    AND (filter_pillar IS NULL OR r.pillar = filter_pillar)
  ORDER BY r.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
