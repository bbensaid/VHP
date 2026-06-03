// §content-triage — delete junk/test stubs + duplicate-cluster losers from the
// Analysis layer, so expansion effort goes only to genuine, distinct topics.
// Every deleted doc's full body is backed up first. DRY RUN unless --commit.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

// 1) Junk / test stubs / placeholders / course-dupes / marketing (~13)
const JUNK = [
  "clinical-rpm-rural-primary-care",                       // 4w stub
  "iron-triangle-render-fix-v1",                           // render-fix test
  "technical-deflation-vermont-policy-2026-croftc1",       // test ("croftc1")
  "technical-deflation-vermont-infrastructure-2026-gemini5", // test ("gemini5")
  "vhie-evolution-2026-v1",                                // test ("v1")
  "vermont-health-platform-tech-report-2026",              // internal status note
  "audio-brief-policy-2026",                               // audio placeholder
  "doc-vbc-fundamentals-101",                              // dupe of VBC course
  "drafts.strategic-implementation-rpm-vermont-rural-health", // draft shadow
  "optimizing-care-maximizing-health-manifesto",           // marketing manifesto
  "digital-pulse-technology-role-2025",                    // fluff
  "precision-medicine-clinical-scaling",                   // 89w stub
];

// 2) Duplicate-cluster LOSERS (keepers listed in comments, NOT deleted)
const DUPES = [
  // Vermont payer-war cluster — KEEP: zero-sum-battlefield-payers-providers-patients
  "zero-sum-suicide-economic-autopsy",
  "zero-sum-war-economic-autopsy-vermont",
  "zero-sum-battlefield-fee-for-service-failure-vermont",
  "zero-sum-battlefield-educational-guide-v3",
  "vermont-19-6-percent-trap-allocative-failure",
  "vermont-payer-provider-war-economics-19-percent",
  "vermont-affordability-crisis-oligopoly-problem",
  "the-premium-spike-breaking-point",
  // VHIE cluster — KEEP: strategic-pivot-vhie-crisp-shared-services (governance)
  //                 and architecting-resilience-vhie-rural-health (rural resilience)
  "tech-vhie-data-liquidity-fabric",
  "vermont-healthcare-interoperability-vhie-2026",
  "vermont-health-information-exchange-data-liquidity",
  "end-of-builder-era-vermont-hie-css",
  "vermont-vhie-transition-vitl-to-crisp",
  // Triad cluster — KEEP: structural-triad-us-healthcare-transformation
  "triad-of-transformation-us-healthcare",
  "convergence-of-crisis-us-healthcare-analysis",
  "the-triple-threat-navigating-policy-economics-and-technology-in-us-healthcare",
  // RPM-rural cluster — KEEP: policyAnalysis-tech-004 (CPT/reimbursement)
  "fiscal-optimization-remote-patient-monitoring",
  "rpm-dividend-virtual-care-rural",
  "remote-patient-monitoring-vermont-rural-scaling",
  // Act-167 hospital-services — KEEP: hospital-services-optimization-vermont-act-167-deep-dive
  "hospital-services-optimization-vermont-act-167",
];

const ALL = [...JUNK, ...DUPES];

async function groq(q, params) {
  const u = `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(q)}${params ? "&" + params : ""}`;
  const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const j = await r.json(); if (!r.ok) { console.error(JSON.stringify(j)); process.exit(1); } return j.result;
}

// backup full docs
const docs = await groq(`*[_id in $ids]{...}`, `%24ids=${encodeURIComponent(JSON.stringify(ALL))}`);
const found = new Set(docs.map((d) => d._id));
console.log(`To delete: ${ALL.length} (junk ${JUNK.length} + dupes ${DUPES.length}). Found in dataset: ${docs.length}`);
const missing = ALL.filter((id) => !found.has(id));
if (missing.length) console.log("NOT FOUND (already gone?):", missing.join(", "));

if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit to back up + delete."); process.exit(0); }

const dir = join(__dir, "../../sanity-backups"); if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `backup-triage-deletes-${Date.now()}.json`), JSON.stringify(docs, null, 2));

const mutations = ALL.filter((id) => found.has(id)).map((id) => ({ delete: { id } }));
const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, {
  method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations }),
});
const out = await res.json();
if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`\n✅ Deleted ${mutations.length} docs (backed up first).`);
