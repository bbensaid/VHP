-- ============================================================
-- MIGRATION 034: Hybrid Search against the table that actually holds the corpus
--
-- WHY THIS EXISTS
--   Migration 007 created hybrid_search_rag() against public.rag_documents —
--   the hand-written table from migration 005, which holds 0 rows. The live
--   corpus (51,906 rows) lives in public.data_rag_documents, created by
--   LlamaIndex's PGVectorStore, which prefixes "data_" onto its configured
--   table_name ("rag_documents").
--
--   007 was never applied. As a result hybrid_search_rag() did not exist at
--   all, so HybridRetriever._retrieve() raised PGRST202 on every single call,
--   swallowed it in its own except-block, and returned []. routers/chat.py
--   then fell back to index.as_retriever(). The AI Analyst has therefore been
--   running on plain vector search with no BM25 and no RRF, silently, with no
--   error surfaced anywhere.
--
--   Applying 007 as written would NOT have fixed this: it would have created
--   the function against the empty table, which returns 0 rows, which still
--   trips chat.py's `if not nodes` fallback. Same degraded behaviour, just
--   without the log line.
--
-- WHAT THIS DOES
--   1. Adds content_fts to public.data_rag_documents, maintained by trigger.
--   2. GIN index on content_fts for BM25.
--   3. Creates hybrid_search_rag() against data_rag_documents, with the
--      LlamaIndex column layout: there are no source_type/title/pillar/url
--      COLUMNS on this table — they live inside the metadata_ JSON — so they
--      are projected out of metadata_ here. This matters: retrieval.py
--      overwrites meta["title"|"source_type"|"pillar"|"url"] with the
--      top-level row values, so returning NULLs would blank out correct
--      metadata and break citations.
--
-- WHY A TRIGGER AND NOT A GENERATED COLUMN
--   A STORED generated column is self-maintaining and was the first choice,
--   but ADD COLUMN ... GENERATED ... STORED rewrites the entire table under
--   ACCESS EXCLUSIVE, which also rebuilds the HNSW index over 51,906
--   1536-dim vectors. Against the live database that exceeded Supabase's
--   2-minute statement_timeout and was cancelled (cleanly — nothing applied).
--   A plain nullable column is a metadata-only change, and the backfill can
--   then be batched so no single statement holds a long lock.
--
-- APPLYING TO A LIVE DATABASE
--   This file is the canonical schema for a fresh environment and is safe to
--   replay inside a transaction. Against a populated live database, apply the
--   same steps online instead:
--     - run section 1 (instant, metadata-only)
--     - backfill content_fts in batches of ~2,000 by id, one txn per batch
--       (a single full UPDATE re-versions every row and re-indexes the HNSW
--       entries, which will hit the same timeout)
--     - build the indexes in section 2 with CREATE INDEX CONCURRENTLY
--     - then sections 3-4
--   That is exactly how it was applied on 2026-09-28.
--
--   The HNSW build needs care on a small instance: at
--   maintenance_work_mem=512MB it died with
--   "could not resize shared memory segment ... No space left on device",
--   because /dev/shm cannot back parallel index-build workers that large.
--   It succeeded with max_parallel_maintenance_workers=0 and
--   maintenance_work_mem=128MB. Note also that a failed CREATE INDEX
--   CONCURRENTLY leaves an INVALID index behind which must be dropped before
--   retrying — IF NOT EXISTS will otherwise happily skip the rebuild and
--   leave the index unusable.
-- ============================================================

-- ─── 1. FULL-TEXT SEARCH COLUMN + TRIGGER ────────────────────────────────────
ALTER TABLE public.data_rag_documents
  ADD COLUMN IF NOT EXISTS content_fts TSVECTOR;

CREATE OR REPLACE FUNCTION public.update_data_rag_content_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.content_fts := to_tsvector('english', COALESCE(NEW.text, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS data_rag_content_fts_trigger ON public.data_rag_documents;
CREATE TRIGGER data_rag_content_fts_trigger
  BEFORE INSERT OR UPDATE OF text ON public.data_rag_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_data_rag_content_fts();

-- Backfill (batch this by id against a live database — see header).
UPDATE public.data_rag_documents
SET content_fts = to_tsvector('english', COALESCE(text, ''))
WHERE content_fts IS NULL;

-- ─── 2. INDEXES ──────────────────────────────────────────────────────────────
-- Use CREATE INDEX CONCURRENTLY against a live database (cannot run inside a
-- transaction, so it is not written that way here).

-- THE VECTOR INDEX WAS MISSING ENTIRELY.
--   Migration 005 created idx_rag_embedding on public.rag_documents — the
--   empty table. public.data_rag_documents, which LlamaIndex actually writes
--   to, was created by PGVectorStore and only ever got a btree on
--   metadata_->>'ref_doc_id' (confusingly named "rag_documents_idx_1").
--   So every vector search — both hybrid_search_rag and the
--   index.as_retriever() fallback chat.py has been relying on — was a
--   sequential scan computing 51,906 1536-dim cosine distances. That is what
--   made hybrid_search_rag exceed PostgREST's per-role statement_timeout
--   (anon 3s, authenticated 8s) once it existed.
CREATE INDEX IF NOT EXISTS idx_data_rag_embedding_hnsw
  ON public.data_rag_documents
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_data_rag_fts
  ON public.data_rag_documents USING GIN(content_fts);

-- Supports the metadata_->>'pillar' filter without a full scan.
CREATE INDEX IF NOT EXISTS idx_data_rag_pillar
  ON public.data_rag_documents ((metadata_->>'pillar'));

-- ─── 3. hybrid_search_rag (BM25 + vector + RRF) ──────────────────────────────
DROP FUNCTION IF EXISTS public.hybrid_search_rag(TEXT, VECTOR(1536), INT, TEXT, INT);

CREATE FUNCTION public.hybrid_search_rag(
  query_text      TEXT,
  query_embedding VECTOR(1536),
  match_count     INT  DEFAULT 10,
  filter_pillar   TEXT DEFAULT NULL,
  rrf_k           INT  DEFAULT 60
)
RETURNS TABLE (
  id          BIGINT,
  node_id     TEXT,
  text        TEXT,
  metadata_   JSON,
  source_type TEXT,
  title       TEXT,
  pillar      TEXT,
  url         TEXT,
  rrf_score   DOUBLE PRECISION
)
LANGUAGE SQL
STABLE
AS $$
  WITH vector_results AS (
    -- LIMIT inside the subquery so the HNSW index drives the top-20, then rank.
    -- 007 applied ROW_NUMBER() across the whole table and LIMITed afterwards,
    -- which returns an arbitrary 20 rows rather than the 20 nearest.
    SELECT v.id, ROW_NUMBER() OVER (ORDER BY v.dist) AS rank
    FROM (
      SELECT d.id, (d.embedding <=> query_embedding) AS dist
      FROM public.data_rag_documents d
      WHERE d.embedding IS NOT NULL
        AND (filter_pillar IS NULL OR d.metadata_->>'pillar' = filter_pillar)
      ORDER BY d.embedding <=> query_embedding
      LIMIT 20
    ) v
  ),
  bm25_results AS (
    SELECT b.id, ROW_NUMBER() OVER (ORDER BY b.ts DESC) AS rank
    FROM (
      SELECT d.id,
             ts_rank_cd(d.content_fts, websearch_to_tsquery('english', query_text)) AS ts
      FROM public.data_rag_documents d
      WHERE d.content_fts @@ websearch_to_tsquery('english', query_text)
        AND (filter_pillar IS NULL OR d.metadata_->>'pillar' = filter_pillar)
      ORDER BY ts DESC
      LIMIT 20
    ) b
  ),
  rrf_scores AS (
    SELECT
      COALESCE(v.id, b.id) AS id,
      COALESCE(1.0 / (rrf_k + v.rank), 0.0)
        + COALESCE(1.0 / (rrf_k + b.rank), 0.0) AS rrf_score
    FROM vector_results v
    FULL OUTER JOIN bm25_results b ON v.id = b.id
  )
  SELECT
    d.id,
    d.node_id::TEXT,
    d.text::TEXT,
    d.metadata_,
    d.metadata_->>'source_type' AS source_type,
    d.metadata_->>'title'       AS title,
    d.metadata_->>'pillar'      AS pillar,
    d.metadata_->>'url'         AS url,
    s.rrf_score::DOUBLE PRECISION
  FROM rrf_scores s
  JOIN public.data_rag_documents d ON d.id = s.id
  ORDER BY s.rrf_score DESC
  LIMIT match_count;
$$;

-- ─── 4. EXPOSE VIA POSTGREST ─────────────────────────────────────────────────
GRANT EXECUTE ON FUNCTION public.hybrid_search_rag(TEXT, VECTOR(1536), INT, TEXT, INT)
  TO anon, authenticated, service_role;

-- PostgREST caches the schema; without this the new RPC 404s until the next
-- cache reload.
NOTIFY pgrst, 'reload schema';
