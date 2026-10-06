// Prints the 2026 pillar briefings and their sources as JSON on stdout, straight
// from the TS source of truth, so the RAG ingest never works from a hand-copied
// duplicate that can drift.
//
//   cd frontend && npx tsx scripts/export-briefings.ts
//
// Consumed by book-build/ingest_briefings_to_rag.py.
import { BRIEFINGS, citationOrder } from "../lib/briefings/briefings";
import { SOURCES } from "../lib/briefings/sources";
import { getPillar } from "../lib/taxonomy/pillars";

const out = {
  briefings: BRIEFINGS.map((b) => ({
    ...b,
    pillarLabel: getPillar(b.pillar).label,
    citationOrder: citationOrder(b),
  })),
  sources: SOURCES,
};
process.stdout.write(JSON.stringify(out));
