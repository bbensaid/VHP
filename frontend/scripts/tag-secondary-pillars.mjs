// Adds `secondaryPillars` to policyAnalysis docs that legitimately belong to a
// second pillar. See ALIGNMENT_AUDIT_FINDINGS.md — Operations had 2 docs against
// Economics' 41, because operational content was filed under its money angle.
//
// `pillar` (home pillar) is never changed — this is additive only, so nothing
// disappears from the page it is on today.
//
// Selections below are BY HAND, not keyword-matched: a keyword sweep pulled in
// pieces like "Algorithmic Bias in Clinical AI" that are not operational.
// Each entry names the operational substance that justifies the tag.
//
// DRY RUN unless --commit.
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const COMMIT = process.argv.includes("--commit");
const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const backendEnv = readFileSync(new URL("../../backend/.env", import.meta.url), "utf8");
const g = (k) => (env.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");
const TOKEN = (backendEnv.match(/^SANITY_API_TOKEN=(.*)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, "");

const client = createClient({
  projectId: g("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: g("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2023-10-01",
  token: TOKEN,
  useCdn: false,
});

// slug -> { add: [pillars], why }
const PLAN = {
  // ── Workforce economics: staffing supply, turnover, agency spend ────────
  "nursing-shortage-travel-nurse-workforce-economics": { add: ["Operations"], why: "travel-nurse rate normalisation and long-term staffing strategy" },
  "rural-nurse-retention-economic-model-2026": { add: ["Operations"], why: "workforce supply/demand and the retention pipeline" },
  "rural-precipice-nursing-workforce-vermont": { add: ["Operations"], why: "Vermont nursing workforce structural decay" },
  "fiscal-impact-locum-tenens-rural-vermont": { add: ["Operations"], why: "locum reliance is a staffing-model decision" },
  "nursing-workforce-crisis-economics": { add: ["Economics"], why: "retention economics vs agency spend — already Operations, the money angle is Economics" },
  "great-resignation-primary-care-firing-hospital": { add: ["Operations"], why: "physician retention and employment model" },

  // ── Care-model operations ──────────────────────────────────────────────
  "virtual-nursing-rural-hospitals-model-2026": { add: ["Operations"], why: "hub-and-spoke staffing model addressing the nursing gap" },
  "hospital-at-home-rural-implementation-guide-2026": { add: ["Operations"], why: "implementation economics and capacity redesign" },
  "hospital-at-home-cms-waiver-outcomes-2025": { add: ["Operations"], why: "acute-care-at-home capacity and staffing model" },

  // ── Administrative / shared services ───────────────────────────────────
  "strategic-pivot-vhie-crisp-shared-services": { add: ["Operations"], why: "shared-services utility model — administrative consolidation" },
  "hospital-services-optimization-vermont-act-167-deep-dive": { add: ["Operations"], why: "service-line optimisation and regionalisation" },
  "generative-ai-healthcare-administration-governance": { add: ["Operations"], why: "administrative workflow automation" },
  "ambient-ai-documentation-rural-primary-care-2026": { add: ["Operations"], why: "documentation burden — clinician time is an operational cost" },

  // ── Revenue cycle / billing ────────────────────────────────────────────
  "surprise-billing-no-surprises-act-enforcement-2026": { add: ["Operations"], why: "billing compliance and denial handling" },
  "remote-patient-monitoring-reimbursement-cpt-adoption": { add: ["Operations"], why: "CPT coding and billing workflow" },

  // ── Access / capacity with an operational lever ────────────────────────
  "rural-healthcare-access-closures-workforce-broadband": { add: ["Operations"], why: "facility closures and workforce gaps" },
  "vermont-rural-health-transformation-2026": { add: ["Operations"], why: "CAH transformation delivery" },
  "health-system-cybersecurity-ransomware-hipaa-2026": { add: ["Operations"], why: "downtime procedures and business continuity" },
  "rural-hospital-cybersecurity-ransomware-2026": { add: ["Operations"], why: "operational continuity under ransomware" },
};

const slugs = Object.keys(PLAN);
const docs = await client.fetch(
  `*[_type == "policyAnalysis" && slug.current in $slugs && !(_id in path("drafts.**"))]{_id, title, pillar, secondaryPillars, "slug": slug.current}`,
  { slugs }
);

const found = new Set(docs.map((d) => d.slug));
const missing = slugs.filter((s) => !found.has(s));

const patches = [];
console.log(`Planned: ${slugs.length}   matched in Sanity: ${docs.length}\n`);
for (const d of docs) {
  const plan = PLAN[d.slug];
  const existing = Array.isArray(d.secondaryPillars) ? d.secondaryPillars : [];
  // never duplicate, never re-add the home pillar
  const merged = [...new Set([...existing, ...plan.add])].filter((p) => p !== d.pillar);
  if (JSON.stringify(merged) === JSON.stringify(existing)) {
    console.log(`  = ${d.slug} — already correct`);
    continue;
  }
  patches.push({ id: d._id, set: { secondaryPillars: merged } });
  console.log(`  + [${d.pillar}] ${String(d.title).slice(0, 62)}`);
  console.log(`      -> also ${merged.join(", ")}   (${plan.why})`);
}

if (missing.length) {
  console.log(`\n⚠️  ${missing.length} planned slug(s) not found — skipped, not created:`);
  missing.forEach((s) => console.log("    " + s));
}

console.log(`\n${patches.length} doc(s) to patch.`);
if (!COMMIT) {
  console.log("DRY RUN — re-run with --commit to apply.");
  process.exit(0);
}
if (!patches.length) process.exit(0);

await client.mutate(patches.map((p) => ({ patch: { id: p.id, set: p.set } })));
console.log(`✅ Applied ${patches.length} patches.`);
