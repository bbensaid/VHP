// §5 — sweep the 51 low-stat briefs: cut first-person fabricated operational
// stats and invented studies/rules; correct the verifiable ones to sourced values.
// op "del" removes the block; "text" replaces it. Backups in /sanity-backups/.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

const A = {
  // ── Verifiable → corrected to sourced numbers ──────────────────────────
  // NSA: 1.46M disputes initiated in 2024 (CRS), vs ~22k CMS first projection.
  "policyAnalysis-pol-005": [{ key: "k67", expect: "exceeded 700,000 in 2024",
    text: "The No Surprises Act (NSA), effective January 2022, was designed to protect patients from unexpected out-of-network bills. Its independent dispute resolution (IDR) mechanism lets payers and providers arbitrate payment disputes. Volume has dwarfed expectations: against an initial CMS estimate of roughly 22,000 disputes a year, more than 1.46 million federal IDR disputes were initiated in 2024 (CRS), overwhelming the system and producing a large backlog that arbiters only began clearing in 2025." }],
  // FDA: ~1,016 AI/ML devices authorized by Dec 2024 (FDA list); drop the
  // unverifiable "312 in 2024" and the "47 De Novo / 340%" precision.
  "policyAnalysis-tech-001": [
    { key: "k147", expect: "more than 950 AI-enabled medical devices",
      text: "The FDA had authorized roughly 1,000 AI/ML-enabled medical devices by the end of 2024 (FDA's authorized-device list), with the pace of clearances rising sharply in recent years. The 2025 final guidance on Predetermined Change Control Plans (PCCPs) establishes a framework allowing AI/ML software to learn and adapt post-market without a new 510(k) submission for each modification." },
    { key: "k155", expect: "340% increase from 2022",
      text: "Novel AI applications in pathology, radiology, and genomics frequently lack adequate predicate devices for 510(k) substantial equivalence, pushing more of them onto the De Novo pathway. De Novo authorization typically takes substantially longer than a 510(k) clearance." },
  ],
  // MA V28: keep the verified ~3.1-3.3% score reduction; cut the unverifiable
  // "$31B AHIP" and "43 counties / highest since 2014" fabrications.
  "policyAnalysis-eco-004": [
    { key: "k123", expect: "approximately 3.4%",
      text: "CMS began phasing in the recalibrated V28 CMS-HCC risk adjustment model in 2024, rebasing it to more recent fee-for-service data and trimming certain condition coefficients. CMS projected the transition would reduce average MA risk scores by roughly 3.1–3.3%, lowering per-member-per-month payments to plans." },
    { key: "k127", expect: "cumulative payment reductions of $31B",
      text: "Insurers warned the change would pressure margins; large national plans (UnitedHealth, Humana, CVS/Aetna) have more scale to absorb it through efficiencies and supplemental-benefit trims, while smaller regional plans face greater strain. CMS framed the recalibration as restoring payment accuracy and protecting the Medicare Trust Fund." },
    { key: "k131", expect: "Forty-three counties",
      text: "The tighter payment environment has contributed to MA plans exiting some markets and trimming benefits for 2026, with rural counties — where MA margins are thinnest — among the most exposed to reduced plan choice." },
  ],
  // TEFCA: plausible but unsourced precise figures → soften.
  "policyAnalysis-tech-002": [
    { key: "k163", expect: "73% of U.S",
      text: "The Office of the National Coordinator for Health IT (ONC) designated a first cohort of Qualified Health Information Networks (QHINs) under TEFCA, and the major EHR vendors — Epic, Oracle Health, and MEDITECH — have each connected to at least one QHIN, giving the framework broad nominal reach across U.S. hospital beds." },
    { key: "k167", expect: "2.1M patient record requests per month",
      text: "Despite broad participation, actual clinical data exchange under TEFCA remains modest relative to the volume of care delivered, and query response rates from some participating organizations are still low — a reminder that network designation is not the same as routine, usable interoperability at the point of care." },
  ],
  // Tennessee "SB 1204 / one REH in 18 months" unverifiable specifics → generalize.
  "policyAnalysis-pol-004": [{ key: "k63", expect: "Tennessee's SB 1204",
    text: "A rural-exception model has emerged in some states, carving out CON-free zones for sparsely populated counties or areas far from the nearest hospital, on the theory that CON review deters investment where access is already scarce. Early results are limited, and evidence on whether these carve-outs meaningfully expand rural capacity is still thin." }],

  // ── First-person fabricated / invented → DELETE the block ───────────────
  "clinical-rpm-rural-primary-care": [{ key: "d8fa2lt1", del: true }],         // "we reduce ED 22%"
  "fiscal-optimization-remote-patient-monitoring": [{ key: "8ztsgyut", del: true }], // "40% of savings"
  "fiscal-impact-locum-tenens-rural-vermont": [{ key: "45cdz3a4",
    text: "In parts of the Northeast Kingdom, a large share of clinical shifts are now covered by temporary locum staff. This dependency disrupts continuity of care and introduces significant price volatility into hospital budgets: the wage gap between full-time employees and contracted providers has widened to a point that threatens the long-term viability of small rural medical centers." }],
  "alzheimers-drug-pipeline-costs": [{ key: "if77f59z", del: true }],          // fabricated "12% MRI throughput"
  "sdoh-integration-strategy": [{ key: "qycf7pw2",
    text: "Roughly 80% of health outcomes are driven by factors outside the clinical setting — housing stability, food security, transportation access. Treating that social data with the same technical rigor as a lab result — ingesting Z-codes from primary care and matching them with social-service datasets — makes it possible to build a social-risk view that drives preventive resource allocation before a crisis occurs." }],
  "vermont-health-economics-roadmap-2026": [{ key: "1v6an6ty",
    text: "A central goal of Vermont's 2026 health-data strategy is to sharply increase real-time clinical data liquidity, reducing the 'friction tax' of manual records retrieval across the state's rural health districts." }],
  "vermont-vhie-transition-vitl-to-crisp": [{ key: "3w7yr7xn",
    text: "Proponents of the shared-services pivot argue that maintaining the current standalone VITL contract carries meaningful avoidable cost in technical debt and redundant maintenance relative to multi-state shared-service benchmarks." }],
  // Virtual nursing: real model, fabricated precise N's/effect sizes → strip figures.
  "virtual-nursing-rural-hospitals-model-2026": [
    { key: "blk001", expect: "23 rural health systems across 11 states",
      text: "The rural nursing staffing crisis has created the conditions for a structural change that would have been impractical a few years ago. Hub-and-spoke virtual nursing — in which a centralized telenursing hub provides remote monitoring, clinical decision support, and patient education to bedside staff at several spoke rural hospitals simultaneously — is now in production at a growing number of rural health systems." },
    { key: "blk007", expect: "31% better adverse event outcomes",
      text: "EHR integration is the most technically complex and most frequently underestimated requirement. Hub RNs documenting in a separate system from bedside staff create dangerous documentation gaps; native integration — where hub and spoke staff document in the same record with clear role identifiers — is consistently associated with better, safer outcomes than parallel-documentation setups." },
    { key: "blk009", expect: "11% adverse event reduction",
      text: "IMPLEMENTATION PRIORITY: EHR integration quality is the single most important technical decision in a virtual-nursing deployment. Require vendors to demonstrate same-system documentation (not parallel documentation) with your specific EHR before signing. The safety benefit of well-integrated programs largely disappears in parallel-documentation deployments." },
  ],
  // Maternal mandate: invented Dec-2025 CMS-HRSA rule + $12M RMOMS + 89-county.
  // Reframe as the real, ongoing policy concern without asserting a fabricated rule.
  "maternal-health-mandate-rural-ed-requirements-2026": [
    { key: "blk001", expect: "finalized in December 2025",
      text: "Rural maternal care deserts — counties with no hospital obstetric unit — have expanded sharply as rural hospitals close labor-and-delivery services, leaving emergency departments to handle obstetric emergencies without dedicated OB capability. This has driven policy proposals to set minimum obstetric-emergency standards for hospital EDs even where no labor-and-delivery unit exists." },
    { key: "blk003", expect: "By July 1, 2026, every participating hospital",
      text: "The capabilities such proposals typically call for are concrete: a stocked obstetric-emergency cart aligned with the ACOG hemorrhage bundle (uterotonics, compression sutures, neonatal resuscitation equipment); at least one nurse per shift trained in obstetric/neonatal emergency response (e.g., ALSO or NRP); and a documented transfer agreement with a facility providing comprehensive obstetric care within a defined transport time." },
    { key: "blk010", del: true }, // fabricated "$12M RMOMS reserved / applications open Mar 15 2026"
  ],
  // Scope of practice: invented "2025 Health Affairs meta of 14 studies / 12% / $85k".
  "scope-of-practice-expansion-rural-feasibility-2026": [
    { key: "blk003", expect: "2025 Health Affairs meta-analysis of 14 studies",
      text: "The research on full practice authority (FPA) for nurse practitioners generally finds that loosening scope-of-practice restrictions modestly improves access to primary care in underserved areas, with the largest gains where FPA is paired with Medicaid reimbursement parity; where parity is absent, measured access gains are smaller and less consistent." },
    { key: "blk008", expect: "exceeding $85,000 above urban equivalents",
      text: "Multiple states have active FPA legislation, and some rural hospital associations that historically opposed these bills have shifted to support them — a change driven largely by how expensive and difficult physician recruitment in rural markets has become." },
  ],
};

async function groq(query, params) {
  const u = `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}${params ? "&" + params : ""}`;
  const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const j = await r.json(); if (!r.ok) { console.error(JSON.stringify(j)); process.exit(1); } return j.result;
}
const ids = Object.keys(A);
const docs = await groq(`*[_id in $ids]{ _id, body }`, `%24ids=${encodeURIComponent(JSON.stringify(ids))}`);
const byId = Object.fromEntries(docs.map((d) => [d._id, d]));
const patches = [];
for (const [id, acts] of Object.entries(A)) {
  const doc = byId[id]; if (!doc) { console.log(`MISSING ${id}`); continue; }
  let body = doc.body.map((b) => ({ ...b }));
  let changed = false;
  for (const act of acts) {
    const idx = body.findIndex((b) => b._key === act.key);
    if (idx < 0) { console.log(`  ${id} {${act.key}} NOT FOUND`); continue; }
    if (!act.del) {
      const cur = (body[idx].children || []).map((c) => c.text).join("");
      if (act.expect && !cur.includes(act.expect)) { console.log(`  ${id} {${act.key}} SKIP (text changed)`); continue; }
    }
    if (act.del) { body[idx] = null; console.log(`  ${id} {${act.key}} DELETE`); }
    else { body[idx] = { ...body[idx], markDefs: [], children: [{ _type: "span", _key: `${act.key}-s`, text: act.text, marks: [] }] }; console.log(`  ${id} {${act.key}} rewrite`); }
    changed = true;
  }
  if (changed) { body = body.filter(Boolean); patches.push({ patch: { id, set: { body } } }); }
}
console.log(`\n${patches.length} docs to patch.`);
if (!COMMIT) { console.log("DRY RUN."); process.exit(0); }
const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: patches }) });
const out = await res.json(); if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`✅ Applied ${patches.length} patches.`);
