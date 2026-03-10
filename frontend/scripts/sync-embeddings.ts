#!/usr/bin/env npx tsx
/**
 * scripts/sync-embeddings.ts
 *
 * Syncs HTR content from Sanity → Supabase pgvector.
 * Run once initially, then whenever content is updated.
 *
 * Usage:
 *   npx tsx scripts/sync-embeddings.ts
 *
 * Prerequisites:
 *   - Run supabase/setup-rag.sql in the Supabase dashboard first.
 *   - Ensure .env.local has GEMINI_API_KEY, SANITY_API_TOKEN,
 *     NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SUPABASE_URL,
 *     SUPABASE_SERVICE_ROLE_KEY.
 */

import * as dotenv from "dotenv";
import path from "path";

// Load .env.local from the frontend directory
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient as createSanityClient } from "@sanity/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Clients ───────────────────────────────────────────────────────────────────

const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Use service role key so we can write to Supabase (bypasses RLS)
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Extract plain text from Sanity Portable Text blocks. */
function portableTextToPlain(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .map((b) =>
      b.children
        .filter((span: any) => typeof span.text === "string")
        .map((span: any) => span.text)
        .join("")
    )
    .join("\n");
}

/** Truncate text to stay within embedding API limits. */
function truncate(text: string, maxChars = 8000): string {
  return text.length > maxChars ? text.slice(0, maxChars) : text;
}

async function embed(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(truncate(text));
  return result.embedding.values;
}

/** Rate-limit: small delay between embedding API calls. */
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Content extractors ────────────────────────────────────────────────────────

interface ContentRecord {
  content_id: string;
  content_type: string;
  title: string | null;
  content: string;
  url: string | null;
  pillar: string | null;
}

async function fetchPolicyAnalyses(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "policyAnalysis" && defined(slug.current)]{
      _id, title, slug, pillar, summary, body
    }
  `);
  return docs.map((d: any) => {
    const bodyText = portableTextToPlain(d.body ?? []);
    const content = [d.summary, bodyText].filter(Boolean).join("\n\n");
    const pillarSlug = (d.pillar ?? "").toLowerCase();
    return {
      content_id: d._id,
      content_type: "policyAnalysis",
      title: d.title ?? null,
      content: truncate(content),
      url: `/${pillarSlug}/${d.slug?.current}`,
      pillar: d.pillar ?? null,
    };
  });
}

async function fetchPosts(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "post" && defined(slug.current)]{
      _id, title, slug, body
    }
  `);
  return docs.map((d: any) => ({
    content_id: d._id,
    content_type: "post",
    title: d.title ?? null,
    content: truncate(portableTextToPlain(d.body ?? [])),
    url: `/post/${d.slug?.current}`,
    pillar: null,
  }));
}

async function fetchAcademyModules(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "academyModule" && defined(slug.current)]{
      _id, title, slug, pillar, summary, learningObjectives, body
    }
  `);
  return docs.map((d: any) => {
    const objectives = Array.isArray(d.learningObjectives)
      ? d.learningObjectives.join(". ")
      : "";
    const bodyText = portableTextToPlain(d.body ?? []);
    const content = [d.summary, objectives, bodyText]
      .filter(Boolean)
      .join("\n\n");
    return {
      content_id: d._id,
      content_type: "academyModule",
      title: d.title ?? null,
      content: truncate(content),
      url: `/academy/modules/${d.slug?.current}`,
      pillar: d.pillar ?? null,
    };
  });
}

async function fetchCaseStudies(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "caseStudy" && defined(slug.current)]{
      _id, title, slug, pillar, body
    }
  `);
  return docs.map((d: any) => ({
    content_id: d._id,
    content_type: "caseStudy",
    title: d.title ?? null,
    content: truncate(portableTextToPlain(d.body ?? [])),
    url: `/academy/case-studies/${d.slug?.current}`,
    pillar: d.pillar ?? null,
  }));
}

async function fetchDefinitions(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "definition"]{
      _id, term, description, pillars
    }
  `);
  return docs.map((d: any) => ({
    content_id: d._id,
    content_type: "definition",
    title: d.term ?? null,
    content: truncate(`${d.term}: ${d.description ?? ""}`),
    url: `/academy/glossary`,
    pillar: Array.isArray(d.pillars) ? d.pillars[0] ?? null : null,
  }));
}

async function fetchAnalystNotes(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "analystNote"]{
      _id, title, pillar, body
    }
  `);
  return docs.map((d: any) => ({
    content_id: d._id,
    content_type: "analystNote",
    title: d.title ?? null,
    content: truncate(portableTextToPlain(d.body ?? [])),
    url: null,
    pillar: d.pillar ?? null,
  }));
}

async function fetchWebinars(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "webinar" && defined(slug.current)]{
      _id, title, slug, pillar, description
    }
  `);
  return docs.map((d: any) => ({
    content_id: d._id,
    content_type: "webinar",
    title: d.title ?? null,
    content: truncate(`${d.title ?? ""}\n${d.description ?? ""}`),
    url: `/academy/webinars/${d.slug?.current}`,
    pillar: d.pillar ?? null,
  }));
}

async function fetchReports(): Promise<ContentRecord[]> {
  const docs = await sanity.fetch(`
    *[_type == "report" && defined(slug.current)]{
      _id, title, slug, pillar, abstract
    }
  `);
  return docs.map((d: any) => ({
    content_id: d._id,
    content_type: "report",
    title: d.title ?? null,
    content: truncate(`${d.title ?? ""}\n${d.abstract ?? ""}`),
    url: `/report/${d.slug?.current}`,
    pillar: d.pillar ?? null,
  }));
}

// ── Main sync ─────────────────────────────────────────────────────────────────

async function syncAll() {
  console.log("Fetching content from Sanity...");

  const allRecords: ContentRecord[] = [
    ...(await fetchPolicyAnalyses()),
    ...(await fetchPosts()),
    ...(await fetchAcademyModules()),
    ...(await fetchCaseStudies()),
    ...(await fetchDefinitions()),
    ...(await fetchAnalystNotes()),
    ...(await fetchWebinars()),
    ...(await fetchReports()),
  ].filter((r) => r.content.trim().length > 20); // Skip near-empty docs

  console.log(`Found ${allRecords.length} documents to embed.`);

  let synced = 0;
  let skipped = 0;
  let errors = 0;

  for (const record of allRecords) {
    try {
      const embedding = await embed(record.content);

      const { error } = await supabase
        .from("content_embeddings")
        .upsert(
          {
            content_id: record.content_id,
            content_type: record.content_type,
            title: record.title,
            content: record.content,
            url: record.url,
            pillar: record.pillar,
            embedding,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "content_id" }
        );

      if (error) {
        console.error(`  ✗ ${record.content_id}: ${error.message}`);
        errors++;
      } else {
        console.log(`  ✓ [${record.content_type}] ${record.title ?? record.content_id}`);
        synced++;
      }

      // Stay within Gemini free-tier rate limits (~60 req/min)
      await sleep(1000);
    } catch (err: any) {
      console.error(`  ✗ ${record.content_id}: ${err.message}`);
      errors++;
      await sleep(2000); // Back off on errors
    }
  }

  console.log(`\nDone. ${synced} synced, ${skipped} skipped, ${errors} errors.`);
}

syncAll().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
