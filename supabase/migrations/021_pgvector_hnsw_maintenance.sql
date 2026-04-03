-- Migration 021: pgvector HNSW index maintenance
-- Schedules a quarterly REINDEX CONCURRENTLY on the embedding index to prevent
-- index bloat and maintain ANN recall quality as the rag_documents table grows.
--
-- Requires pg_cron (enabled in migration 020).
-- REINDEX CONCURRENTLY is non-blocking: reads and writes continue normally.

-- Ensure the HNSW index exists with the right parameters
-- (idempotent — skips if already present with identical definition)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'rag_documents'
      AND indexname = 'idx_rag_embedding'
  ) THEN
    CREATE INDEX idx_rag_embedding
      ON public.rag_documents
      USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64);
  END IF;
END $$;

-- Schedule quarterly REINDEX at 02:00 UTC on the 1st of Jan, Apr, Jul, Oct
SELECT cron.schedule(
  'reindex-rag-embedding',
  '0 2 1 1,4,7,10 *',
  $$REINDEX INDEX CONCURRENTLY idx_rag_embedding;$$
);

COMMENT ON INDEX idx_rag_embedding IS
  'HNSW index for cosine ANN search on rag_documents. Rebuilt quarterly by pg_cron job "reindex-rag-embedding".';
