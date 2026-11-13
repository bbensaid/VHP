-- Migration 035 — applied by hand 2026-11-13 (records what was run)
--
-- 1. public.rag_documents (migration 005) was never used: LlamaIndex's
--    PGVectorStore writes to data_rag_documents. It held 0 rows. Dropped.
--    Migrations 005, 007 and 021 targeted it and are superseded (see 034).
-- 2. data_rag_documents had 24,726 exact-duplicate rows because every full
--    rebuild re-inserted the whole corpus without removing the previous copy.
--    Duplicates (same source file/slug + same text + same window) were deleted,
--    keeping the oldest row and re-applying the newest copy's metadata.
--    backend/services/indexing.py now removes the previous build's rows after
--    a successful rebuild.
-- 3. A pirated reference book (from a shadow library) was removed from the
--    corpus: 9,722 rows.
-- Backup taken first: ~/HTR_db_backups/rag_tables_2026-11-13.dump (pg_dump -Fc).
-- Result: database 1,236 MB -> ~805 MB (HNSW index rebuilt, 326 MB).

DROP TABLE IF EXISTS public.rag_documents;

-- The one-off cleanup statements, for the record (idempotent):
-- DELETE FROM data_rag_documents d USING (
--   SELECT id FROM (SELECT id, row_number() OVER (PARTITION BY
--     coalesce(metadata_->>'file_name', metadata_->>'filename', metadata_->>'slug', metadata_->>'source_type', ''),
--     md5(text), md5(coalesce(metadata_->>'window',''))) ORDER BY id) rn
--   FROM data_rag_documents) x WHERE rn > 1) u WHERE d.id = u.id;
-- VACUUM FULL ANALYZE data_rag_documents;
-- SET maintenance_work_mem = '128MB'; SET max_parallel_maintenance_workers = 0;
-- CREATE INDEX idx_data_rag_embedding_hnsw ON public.data_rag_documents
--   USING hnsw (embedding vector_cosine_ops) WITH (m='16', ef_construction='64');
