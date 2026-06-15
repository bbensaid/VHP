// READ-ONLY: back up the 4 lesson bodies we're about to edit + the target track
// state, before any EMR/EHR academy write. Writes JSON to ../sanity-backups/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const env = fs.readFileSync(path.join(__dir, "../.env.local"), "utf8");
for (const l of env.split("\n")) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const PID = "fxz10xl7";
const TOKEN = process.env.SANITY_API_TOKEN;
const db = createClient(process.env.NEXT_PUBLIC_SANITY_DATASET ? process.env.NEXT_PUBLIC_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const CALLOUT_SANITY_SLUGS = ["interop-ehr-market", "interop-ehr-burden", "ehr-data-quality", "interop-uscdi"];
const EHR_TRACK_SLUG = "ehr-integration";

async function sanityDoc(id) {
  const r = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id=="${id}"][0]{_id,_type,title,body}`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await r.json()).result;
}

const out = { takenAt: new Date().toISOString(), sanityBodies: {}, ehrTrack: null };

for (const slug of CALLOUT_SANITY_SLUGS) {
  const doc = await sanityDoc(slug);
  out.sanityBodies[slug] = doc || "MISSING";
  console.log(`Sanity ${slug}: ${doc ? `${(doc.body || []).length} blocks` : "MISSING"}`);
}

const { data: track } = await db.from("tracks").select("id,title,slug,course_id").eq("slug", EHR_TRACK_SLUG).single();
const { data: lessons } = await db.from("lessons").select("id,slug,title,order,sanity_slug,pillar").eq("track_id", track.id).order("order");
out.ehrTrack = { track, lessons };
console.log(`\nTrack "${track.title}" lessons (order):`);
for (const l of lessons) console.log(`  ${l.order}. ${l.title} (slug=${l.slug}, sanity=${l.sanity_slug})`);

const backupDir = path.join(__dir, "../../sanity-backups");
fs.mkdirSync(backupDir, { recursive: true });
const file = path.join(backupDir, `emr-academy-pre-write-${Date.now()}.json`);
fs.writeFileSync(file, JSON.stringify(out, null, 2));
console.log(`\n✅ Backup written: ${file}`);
