// §5 — strip fabricated/unverifiable precise statistics from the remaining briefs.
// Keeps the legitimate qualitative point; removes invented study citations,
// suspiciously exact figures, and fabricated CBO/Act dollar amounts that no public
// source supports. Backups in /sanity-backups/.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

const FIXES = {
  // Fabricated "HTR's 2025 survey ... 4.2 minutes per patient" — remove the invented survey.
  "policyAnalysis-tech-002": [
    { key: "k171", expect: "survey", text: "The core challenge is not data exchange but workflow integration. Clinicians routinely spend meaningful time reconciling information from external sources — a documentation burden that undermines the efficiency rationale for interoperability and contributes to burnout. EHR vendors also face commercial incentives that do not always align with frictionless external data exchange." },
  ],
  // Invented CIHI/NHS/Japan evaluation percentages -> keep the directional finding,
  // drop the fabricated precise figures + fake study citations.
  "global-budget-models-international-lessons-rural-us": [
    { key: "blk003", expect: "22% lower rates", text: "Ontario’s Health Services Restructuring Commission introduced global operating budgets for rural and small community hospitals in the late 1990s. Evaluations have generally found that budget flexibility let hospitals invest in post-acute and home-care coordination, which is associated with fewer avoidable hospitalizations — though the magnitude varies by study and setting." },
    { key: "blk006", expect: "fell 9% in the first two operational years", text: "England’s 42 Integrated Care Systems, operational since July 2022, are the closest structural analog to what AHEAD is attempting: they cover defined geographies, hold a combined population budget, and are accountable for both individual care and population health. Early assessments suggest population-budget models can modestly reduce emergency admissions, but they have not, on their own, resolved the underlying rural workforce shortage — GP and nurse vacancies persist regardless of the payment model." },
    { key: "blk010", expect: "31% reduction in avoidable hospitalization", text: "Japan’s Community-Based Integrated Care system assigns each municipality a population health budget covering medical, nursing, preventive, and housing costs together — the most ambitious model and the most relevant to rapidly aging rural regions. Its proponents report reductions in avoidable hospitalization where it is fully implemented, but it requires roughly a decade of infrastructure buildout to reach maturity." },
  ],
  // RPM "340% growth" — no public source for the precise figure. Soften.
  "policyAnalysis-tech-004": [
    { key: "k187", expect: "grown 340% since 2021", text: "Remote patient monitoring billing under CPT codes 99453, 99454, 99457, and 99458 has grown rapidly since 2020, when CMS clarified telehealth-era reimbursement policies and made RPM one of the more financially viable Medicare care-management programs. Adoption is concentrated in chronic conditions including hypertension, diabetes, and heart failure." },
  ],
  // NCI "3.4x / $150B by 2030" + "5,600 counselors, 4% rural" + Epic "23% ADE
  // reduction" — invented precision. Keep the real gap, drop the fake numbers.
  "precision-medicine-rural-access-barriers-genomics-2026": [
    { key: "blk001", expect: "3.4 times the rate", text: "Rural cancer patients receive tumor molecular profiling and pharmacogenomic testing at markedly lower rates than urban patients — a well-documented disparity in the cancer-care and genomics literature. As precision oncology and pharmacogenomics become standard of care, that rural access gap is both an equity failure and an opportunity for health systems that build the infrastructure early." },
    { key: "blk004", expect: "approximately 5,600 certified genetic counselors", text: "Barrier Two is genetic-counselor availability. Certified genetic counselors are scarce and overwhelmingly concentrated in urban academic centers, so rural patients who receive a meaningful result — a BRCA variant, a pharmacogenomic flag, a hereditary cancer syndrome — often cannot get the follow-up counseling that makes the result clinically actionable. Without it, the test result is clinically inert." },
    { key: "blk009", expect: "23% reduction in adverse drug events", text: "The second is pharmacogenomics at the point of prescribing: embedding panel results directly in the EHR as a persistent drug-gene interaction alert. Several health systems have piloted this through their EHR’s genomics module, with the goal of reducing adverse drug events among tested patients." },
  ],
  // "83% of rural systems" + "2025 JAMA analysis of 87,000 patients" with exact ORs
  // — unverifiable. Keep the substantive point, drop the invented citation/figures.
  "rural-chronic-disease-registry-population-health-2026": [
    { key: "blk003", expect: "Eighty-three percent", text: "The foundational technology for population health management in rural settings does not require a six-figure population health platform. Many rural health systems run their disease registries on their existing EHR’s built-in panel-management or registry tools. The technology is rarely the binding constraint; the binding constraints are data completeness (SDOH data is seldom in the EHR) and care-coordinator capacity." },
    { key: "blk007", expect: "2025 JAMA Internal Medicine analysis of 87,000", text: "The SDOH factors most predictive of avoidable acute-care utilization in rural populations are consistently food insecurity, transportation barriers, and social isolation. None of these are captured in the HCC risk model, so they must be added as explicit data elements if a registry is to stratify risk accurately." },
  ],
  // Rock Health "$4.8B / 42/31/19%" + "Fifteen systems … 34% readmission cut" —
  // invented precision. Keep the thesis, drop the fabricated splits.
  "rural-health-venture-capital-investment-surge-2026": [
    { key: "blk003", expect: "42% of deal flow", text: "Rural-focused health-tech investment has concentrated in a few categories: AI-enabled diagnostic and decision-support tools for rural primary care, remote patient monitoring and chronic-disease-management platforms, and telehealth specialty-access networks, with smaller amounts going to pharmacy technology, workforce platforms, and behavioral health." },
    { key: "blk006", expect: "34% reduction in 30-day readmissions", text: "Remote patient monitoring is the investment category most likely to reach meaningful rural deployment in the near term: the evidence base is comparatively mature, reimbursement codes (CPT 99453–99458) are established, the FDA pathway for most RPM devices is well understood, and the main barrier — rural broadband — is being addressed by parallel federal investment. Early rural RPM pilots report reductions in 30-day readmissions, though results vary by program." },
  ],
  // "Rural Hospital Regulatory Relief Act of 2026" + "$2.1B annually" + AHA "$680k"
  // — no verifiable Act or scores. Reframe as a proposal, drop invented dollar figures.
  "rural-hospital-regulatory-relief-act-2026": [
    { key: "blk001", expect: "$2.1 billion annually", text: "Proposals to provide rural-hospital regulatory relief would matter for the roughly 1,360 Critical Access Hospitals operating nationwide. After years of incremental waivers and temporary pandemic-era flexibilities, the policy goal is to make several of those flexibilities permanent — changes that, in aggregate, would return meaningful operating-budget relief to rural hospitals, though specific dollar estimates depend on the final legislative text and CMS implementation." },
    { key: "blk004", expect: "$680,000 in annual revenue", text: "One frequently proposed change expands the CAH swing-bed program to include observation-status patients, closing a longstanding gap that excludes a growing share of rural admissions from swing-bed cost-based reimbursement. Hospital groups have argued this single change would add meaningful annual revenue at eligible facilities." },
  ],
  // CONNECT "$14.1B CBO score" is wrong/unverifiable (real telehealth extensions
  // score ~$3.8-4B/2yr; CONNECT proponents claim savings). Reframe.
  "telehealth-reimbursement-cliff-2026-rural-hospitals": [
    { key: "blk005", expect: "$14.1B over 10 years", text: "As of early 2026, telehealth-extension bills — including the CONNECT for Health Act (permanent extension) and narrower two-year extensions — remain in play. The fiscal scoring of these bills is contested: CBO has scored short-term telehealth extensions in the range of a few billion dollars over two years, while CONNECT’s sponsors argue it would generate net savings. That disagreement over cost has repeatedly stalled permanent action despite bipartisan support." },
  ],
};

async function groq(query, params) {
  const u = `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}${params ? "&" + params : ""}`;
  const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const j = await r.json(); if (!r.ok) { console.error(JSON.stringify(j)); process.exit(1); } return j.result;
}
const ids = Object.keys(FIXES);
const docs = await groq(`*[_id in $ids]{ _id, body }`, `%24ids=${encodeURIComponent(JSON.stringify(ids))}`);
const byId = Object.fromEntries(docs.map((d) => [d._id, d]));
const patches = [];
for (const [id, fixes] of Object.entries(FIXES)) {
  const doc = byId[id]; if (!doc) { console.log(`MISSING ${id}`); continue; }
  const body = doc.body.map((b) => ({ ...b }));
  let changed = false;
  for (const f of fixes) {
    const idx = body.findIndex((b) => b._key === f.key);
    if (idx < 0) { console.log(`  ${id} {${f.key}} NOT FOUND`); continue; }
    const cur = (body[idx].children || []).map((c) => c.text).join("");
    if (!cur.includes(f.expect)) { console.log(`  ${id} {${f.key}} SKIP`); continue; }
    body[idx] = { ...body[idx], markDefs: [], children: [{ _type: "span", _key: `${f.key}-s`, text: f.text, marks: [] }] };
    console.log(`  ${id} {${f.key}} -> neutralized`); changed = true;
  }
  if (changed) patches.push({ patch: { id, set: { body } } });
}
console.log(`\n${patches.length} docs to patch.`);
if (!COMMIT) { console.log("DRY RUN."); process.exit(0); }
const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: patches }) });
const out = await res.json(); if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`✅ Applied ${patches.length} patches.`);
