-- ============================================================
-- MIGRATION 007: Hybrid Search (BM25 + vector RRF) + Schema Alignment
--
-- Changes:
--   1. Add LlamaIndex-compatible columns (text, metadata_, node_id)
--      so LlamaIndex PGVectorStore can write to this table.
--   2. Fix embedding dimension: 768 → 1536 (text-embedding-3-small)
--   3. Add content_fts tsvector column + GIN index for BM25 search.
--   4. Create FTS trigger to keep content_fts updated automatically.
--   5. Update match_rag_documents() to use 1536-dim embeddings.
--   6. Add hybrid_search_rag() RPC function (BM25 + vector + RRF).
--
-- After running this migration, re-trigger /api/ingest to repopulate
-- the index with correct 1536-dim embeddings.
-- ============================================================

-- ─── 1. SCHEMA ALIGNMENT ──────────────────────────────────────────────────────
-- Add columns for both LlamaIndex schema (text, metadata_, node_id)
-- and custom schema (chunk_text, metadata) so COALESCE works either way.

ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS text        TEXT;
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS metadata_   JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS node_id     TEXT;
-- Ensure chunk_text exists even if table was created by LlamaIndex
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS chunk_text  TEXT;
-- Ensure source_type and title exist even if table was created by LlamaIndex
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS source_type TEXT;
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS title       TEXT;
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS pillar      TEXT;
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS url         TEXT;

-- ─── 2. FIX EMBEDDING DIMENSION (768 → 1536) ─────────────────────────────────
-- Drop old HNSW index (required before altering the vector column)
DROP INDEX IF EXISTS public.idx_rag_embedding;

-- Drop old 768-dim embedding column and recreate at 1536-dim.
-- NOTE: This clears all stored embeddings. Re-run /api/ingest after deploying.
ALTER TABLE public.rag_documents DROP COLUMN IF EXISTS embedding;
ALTER TABLE public.rag_documents ADD COLUMN embedding VECTOR(1536);

-- ─── 3. FULL-TEXT SEARCH COLUMN ───────────────────────────────────────────────
ALTER TABLE public.rag_documents ADD COLUMN IF NOT EXISTS content_fts TSVECTOR;

-- Backfill FTS for any existing rows
UPDATE public.rag_documents
SET content_fts = to_tsvector('english', COALESCE(text, chunk_text, ''))
WHERE content_fts IS NULL;

-- ─── 4. FTS TRIGGER ───────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_rag_content_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.content_fts := to_tsvector('english',
    COALESCE(NEW.text, NEW.chunk_text, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS rag_content_fts_trigger ON public.rag_documents;
CREATE TRIGGER rag_content_fts_trigger
  BEFORE INSERT OR UPDATE ON public.rag_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_rag_content_fts();

-- ─── 5. INDEXES ───────────────────────────────────────────────────────────────
-- GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS idx_rag_fts
  ON public.rag_documents USING GIN(content_fts);

-- HNSW index for fast cosine vector search (1536-dim)
CREATE INDEX IF NOT EXISTS idx_rag_embedding
  ON public.rag_documents
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Index on node_id for LlamaIndex lookups
CREATE INDEX IF NOT EXISTS idx_rag_node_id ON public.rag_documents(node_id);

-- ─── 6. UPDATE match_rag_documents (1536-dim) ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.match_rag_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT   DEFAULT 0.7,
  match_count     INT     DEFAULT 8,
  filter_pillar   TEXT    DEFAULT NULL
)
RETURNS TABLE (
  id          UUID,
  node_id     TEXT,
  text        TEXT,
  metadata_   JSONB,
  source_type TEXT,
  title       TEXT,
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
    r.node_id,
    COALESCE(r.text, r.chunk_text)      AS text,
    COALESCE(r.metadata_, r.metadata)   AS metadata_,
    r.source_type,
    r.title,
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

-- ─── 7. hybrid_search_rag (BM25 + vector + RRF) ───────────────────────────────
-- Combines:
--   - Dense vector ANN search (cosine similarity, HNSW)
--   - Sparse BM25 full-text search (PostgreSQL tsvector)
-- Merges rankings using Reciprocal Rank Fusion (RRF).
CREATE OR REPLACE FUNCTION public.hybrid_search_rag(
  query_text      TEXT,
  query_embedding VECTOR(1536),
  match_count     INT  DEFAULT 10,
  filter_pillar   TEXT DEFAULT NULL,
  rrf_k           INT  DEFAULT 60
)
RETURNS TABLE (
  id          UUID,
  node_id     TEXT,
  text        TEXT,
  metadata_   JSONB,
  source_type TEXT,
  title       TEXT,
  pillar      TEXT,
  url         TEXT,
  rrf_score   FLOAT
)
LANGUAGE SQL
STABLE
AS $$
  WITH vector_results AS (
    -- Top-20 by cosine similarity
    SELECT
      r.id,
      ROW_NUMBER() OVER (ORDER BY r.embedding <=> query_embedding) AS rank
    FROM public.rag_documents r
    WHERE
      r.embedding IS NOT NULL
      AND (filter_pillar IS NULL OR r.pillar = filter_pillar)
    LIMIT 20
  ),
  bm25_results AS (
    -- Top-20 by BM25 (ts_rank_cd on tsvector)
    SELECT
      r.id,
      ROW_NUMBER() OVER (
        ORDER BY ts_rank_cd(
          r.content_fts,
          websearch_to_tsquery('english', query_text)
        ) DESC
      ) AS rank
    FROM public.rag_documents r
    WHERE
      r.content_fts @@ websearch_to_tsquery('english', query_text)
      AND (filter_pillar IS NULL OR r.pillar = filter_pillar)
    LIMIT 20
  ),
  rrf_scores AS (
    -- Reciprocal Rank Fusion: score = 1/(k+rank_v) + 1/(k+rank_b)
    SELECT
      COALESCE(v.id, b.id)                              AS id,
      COALESCE(1.0 / (rrf_k + v.rank), 0.0)
        + COALESCE(1.0 / (rrf_k + b.rank), 0.0)        AS rrf_score
    FROM vector_results  v
    FULL OUTER JOIN bm25_results b ON v.id = b.id
  )
  SELECT
    r.id,
    r.node_id,
    COALESCE(r.text, r.chunk_text)    AS text,
    COALESCE(r.metadata_, r.metadata) AS metadata_,
    r.source_type,
    r.title,
    r.pillar,
    r.url,
    s.rrf_score
  FROM rrf_scores s
  JOIN public.rag_documents r ON r.id = s.id
  ORDER BY s.rrf_score DESC
  LIMIT match_count;
$$;
