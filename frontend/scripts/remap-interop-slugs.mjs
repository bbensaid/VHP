// Re-map Interoperability lesson rows to the CORRECT existing Sanity doc slugs.
// The rows had sanity_slug values pointing at non-existent slugs; the real rich
// content lives under interop-* docs with slightly different names. DRY RUN unless --commit.
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
const COMMIT = process.argv.includes("--commit");

const MAP = {
  "hie-models-overview": "interop-hie-models",
  "hipaa-security-rule": "interop-hipaa-security",
  "why-interoperability-matters": "interop-why-it-matters",
  "ehr-market-landscape": "interop-ehr-market",
  "snomed-loinc-rxnorm": "interop-snomed-loinc-rxnorm",
  "21st-century-cures-act-overview": "interop-cures-act",
  "smart-on-fhir-authorization": "interop-smart-fhir",
  "hipaa-deidentification-methods": "interop-deidentification",
  "cms-patient-access-api": "interop-cms-patient-access-api",
  "uscdi-us-core-data": "interop-uscdi",
  "vitl-vermont-hie": "interop-vermont-vitl",
  "information-blocking-rules": "interop-info-blocking",
  "interface-engines-integration": "interop-interface-engines",
  "hl7-v2-legacy-messaging": "interop-hl7-v2",
  "davinci-gravity-use-cases": "interop-davinci-gravity",
  "hl7-fhir-introduction": "interop-fhir-intro",
  "certified-ehr-technology-requirements": "interop-cehrt",
  "hie-data-governance-frameworks": "interop-data-governance",
  "payer-to-payer-exchange": "interop-payer-to-payer",
  "query-vs-event-driven-exchange": "interop-query-vs-event",
  "ehr-physician-burden": "interop-ehr-burden",
  "patient-access-rights-hipaa": "interop-patient-access",
  "cda-ccda-clinical-documents": "interop-cda-ccda",
  "bulk-fhir-population-data": "interop-bulk-fhir",
  "hie-consent-models": "interop-consent-models",
};

// Verify every TARGET slug exists in Sanity with a real body.
const targets = [...new Set(Object.values(MAP))];
const groq = `*[_type=="academyModule" && slug.current in ${JSON.stringify(targets)}]{"s":slug.current,"n":count(body)}`;
const url = "https://fxz10xl7.api.sanity.io/v2021-06-07/data/query/production?query=" + encodeURIComponent(groq);
const found = {}; for (const x of (await (await fetch(url)).json()).result) found[x.s] = x.n;
const missing = targets.filter(t => !(found[t] >= 20));
if (missing.length) { console.error("ABORT — these target docs are missing or thin:", missing); process.exit(1); }

const { data: c } = await db.from("courses").select("id").eq("slug", "interoperability-data-exchange").single();
const { data: tr } = await db.from("tracks").select("id").eq("course_id", c.id);
const { data: ls } = await db.from("lessons").select("id,slug,sanity_slug").in("track_id", tr.map(t => t.id));

let plan = [];
for (const l of ls) {
  const target = MAP[l.slug];
  if (!target) { console.log("  (no mapping for " + l.slug + " — skipped)"); continue; }
  plan.push({ id: l.id, slug: l.slug, from: l.sanity_slug, to: target, blocks: found[target] });
}
console.log(`Will remap ${plan.length} interop lessons (all targets verified rich):`);
for (const p of plan) console.log(`  ${p.slug.padEnd(40)} ${String(p.from).padEnd(32)} -> ${p.to} [${p.blocks}]`);

if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit to apply."); process.exit(0); }

let ok = 0;
for (const p of plan) {
  const { error } = await db.from("lessons").update({ sanity_slug: p.to }).eq("id", p.id);
  if (error) console.error("FAIL " + p.slug, error.message); else ok++;
}
console.log(`\n✅ Remapped ${ok} interop lessons.`);
