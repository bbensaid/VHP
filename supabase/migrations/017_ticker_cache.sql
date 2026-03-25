CREATE TABLE IF NOT EXISTS ticker_cache (
    id TEXT PRIMARY KEY DEFAULT 'latest',
    headlines JSONB NOT NULL,
    fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE ticker_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ticker_public_read" ON ticker_cache FOR SELECT USING (true);
