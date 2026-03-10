// lib/rag.ts
// RAG helpers: embed a query with Google text-embedding-004, then
// retrieve the most similar content chunks from Supabase pgvector.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContentChunk {
  id: string;
  content_id: string;
  content_type: string;
  title: string | null;
  content: string;
  url: string | null;
  pillar: string | null;
  similarity: number;
}

// ── Embed a query string ──────────────────────────────────────────────────────

export async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// ── Search for similar content in Supabase ────────────────────────────────────

export async function searchSimilar(
  queryEmbedding: number[],
  {
    matchThreshold = 0.5,
    matchCount = 5,
  }: { matchThreshold?: number; matchCount?: number } = {}
): Promise<ContentChunk[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
  });

  if (error) {
    console.error("Supabase RAG error:", error.message);
    return [];
  }

  return (data as ContentChunk[]) ?? [];
}

// ── Build a context block to inject into the AI prompt ───────────────────────

export function buildContextBlock(chunks: ContentChunk[]): string {
  if (chunks.length === 0) return "";

  const sections = chunks.map((c, i) => {
    const source = c.title ? `"${c.title}"` : c.content_type;
    const pillarTag = c.pillar ? ` [${c.pillar}]` : "";
    const urlNote = c.url ? ` (${c.url})` : "";
    return `[${i + 1}] ${source}${pillarTag}${urlNote}\n${c.content.slice(0, 1200)}`;
  });

  return (
    "RELEVANT HTR CONTENT (use this to inform your answer):\n\n" +
    sections.join("\n\n---\n\n")
  );
}
