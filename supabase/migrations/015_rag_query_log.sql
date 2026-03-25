-- Migration 015: RAG query observability log (§1.5)
-- Log every query, retrieved chunks, and response latency for
-- evaluation (Ragas), content gap analysis, and performance monitoring.

CREATE TABLE IF NOT EXISTS rag_query_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id      TEXT,               -- frontend conversation ID
    query           TEXT NOT NULL,
    role            TEXT,               -- user's tier at query time
    model_used      TEXT,
    retrieved_doc_ids   TEXT[],         -- IDs of retrieved rag_documents
    retrieved_scores    FLOAT[],        -- cosine similarity scores
    response_preview    TEXT,           -- first 500 chars of response
    latency_ms          INT,
    tokens_used         INT,
    was_zero_result     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rag_query_log_user_idx    ON rag_query_log(user_id);
CREATE INDEX IF NOT EXISTS rag_query_log_time_idx    ON rag_query_log(created_at DESC);
CREATE INDEX IF NOT EXISTS rag_query_log_zero_idx    ON rag_query_log(was_zero_result)
    WHERE was_zero_result = TRUE;

-- RLS: users see only their own; service role sees all
ALTER TABLE rag_query_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rag_log_own_read" ON rag_query_log
    FOR SELECT USING (user_id = auth.uid());

-- Aggregate view for admin dashboards
CREATE OR REPLACE VIEW rag_query_stats AS
SELECT
    DATE_TRUNC('day', created_at) AS day,
    COUNT(*) AS total_queries,
    COUNT(*) FILTER (WHERE was_zero_result) AS zero_result_queries,
    ROUND(AVG(latency_ms)) AS avg_latency_ms,
    ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms)) AS p95_latency_ms,
    COUNT(DISTINCT user_id) AS unique_users
FROM rag_query_log
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day DESC;

GRANT SELECT ON rag_query_stats TO authenticated;
