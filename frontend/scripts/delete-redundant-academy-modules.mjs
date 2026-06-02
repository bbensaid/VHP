// Delete redundant/superseded Sanity academyModule docs identified by the
// ecosystem audit (PLAN_SANITY_ECOSYSTEM.md). The id list lives in
// scripts/delete_ids.json. Every id was verified to be:
//   - NOT referenced by any live Supabase lesson (post broken-link repair), AND
//   - either an exact-title twin of a live lesson, or a thin (<800w) legacy
//     module whose topic is owned by a richer live lesson.
//
// SAFETY: re-checks the live lesson reference set at run time and refuses to
// delete any id that has become referenced. Full bodies are already backed up
// in /sanity-backups/. DRY RUN unless --commit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
const PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

const ids = JSON.parse(readFileSync(join(__dir, "delete_ids.json"), "utf8"));

// Live safety re-check: which of these ids are referenced by a Supabase lesson NOW?
const { data: lessons } = await db.from("lessons").select("sanity_slug");
const referenced = new Set(lessons.map((l) => l.sanity_slug).filter(Boolean));
const blocked = ids.filter((id) => referenced.has(id));
const toDelete = ids.filter((id) => !referenced.has(id));

console.log(`Delete candidates: ${ids.length}`);
if (blocked.length) {
  console.log(`\n⛔ BLOCKED (now referenced by a live lesson — will NOT delete): ${blocked.length}`);
  for (const b of blocked) console.log(`   ${b}`);
}
console.log(`\nWill delete: ${toDelete.length}`);
for (const id of toDelete) console.log(`   ${id}`);

if (!COMMIT) {
  console.log("\nDRY RUN — re-run with --commit to delete from Sanity.");
  process.exit(0);
}

// Sanity mutation: delete in one transaction.
const mutations = toDelete.map((id) => ({ delete: { id } }));
const res = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${SANITY_TOKEN}` },
    body: JSON.stringify({ mutations }),
  }
);
const out = await res.json();
if (!res.ok) {
  console.error("Sanity mutate FAILED:", JSON.stringify(out));
  process.exit(1);
}
console.log(`\n✅ Deleted ${out.results?.length ?? toDelete.length} docs from Sanity.`);
