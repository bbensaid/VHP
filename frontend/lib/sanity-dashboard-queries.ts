/**
 * lib/sanity-dashboard-queries.ts
 *
 * GROQ queries for rhtState documents.
 * Projections are shaped to match the existing TypeScript types so
 * consuming components need no changes.
 */

import { client } from "./sanity";
import type { RHTProfile } from "./data/rht-program";

// ── RHT State ─────────────────────────────────────────────────────────────────

const RHT_FIELDS = `
  "id": stateId.current,
  stateName,
  awardAmount,
  status,
  strategicFocus,
  description,
  "initiatives": initiatives[]{ title, description },
  "metrics": metrics[]{ label, status, "target": coalesce(target, "") }
`;

export async function getRhtState(stateId: string): Promise<RHTProfile | null> {
  return client.fetch(
    `*[_type == "rhtState" && stateId.current == $stateId][0]{ ${RHT_FIELDS} }`,
    { stateId }
  );
}

export async function getAllRhtStates(): Promise<Record<string, RHTProfile>> {
  const docs: RHTProfile[] = await client.fetch(
    `*[_type == "rhtState"] | order(stateName asc) { ${RHT_FIELDS} }`
  );
  return Object.fromEntries(docs.map((d) => [d.id, d]));
}
