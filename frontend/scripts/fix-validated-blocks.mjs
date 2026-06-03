// §5 validation — block-level corrections to specific verified-wrong claims.
// Each entry replaces the text of ONE single-span block (matched by _id + _key).
// Every change is backed by a web-verified source noted in the comment.
// Idempotent-ish: it only writes if the current text still matches `expectContains`.
// Bodies backed up in /sanity-backups/. DRY RUN unless --commit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const TOKEN = process.env.SANITY_API_TOKEN;
const PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

// id -> [ { key, expectContains, text } ]
const FIXES = {
  // CDC 2024 final: US maternal mortality = 17.9/100k (not 23.8). Australia ~3,
  // Canada ~8.4, so "more than triple Canada/UK" is false. (CDC NCHS, WHO, OWID)
  "policyAnalysis-clin-005": [{
    key: "k267",
    expectContains: "23.8 per 100,000",
    text: "The United States recorded a maternal mortality rate of 17.9 per 100,000 live births in 2024 (CDC NCHS final data) — the highest among comparably resourced nations. That is roughly double Canada's rate (about 8 per 100,000) and several times the rates of Australia and the United Kingdom (roughly 3–6 per 100,000). After years of deterioration that peaked during the pandemic, the rate has eased modestly but remains far above its high-income peers.",
  }],

  // Travel-RN cost & shortage projections are explicitly HTR's own model — label them.
  // ($1,820/wk Q3 2025 is corroborated by ZipRecruiter; the 450k/$38.7B are house projections.)
  "policyAnalysis-eco-003": [{
    key: "k115",
    expectContains: "An HTR analysis projects a net shortage of 450,000",
    text: "HTR’s own modeling projects a net shortage on the order of 450,000 RNs by 2030 under the current trajectory; this is an HTR estimate, not a published government figure. The economic cost of unfilled nursing positions — accounting for vacancy costs, overtime premiums, and quality-of-care impacts — is, on HTR’s assumptions, roughly $86,000 per unfilled FTE annually, implying a burden in the tens of billions of dollars per year on U.S. hospitals.",
  }],

  // "$1.2 trillion" is a national economic-output figure (IHS Markit), not an HRSA
  // "rural hospital nursing shortage cost 2026-2035." Reframe honestly.
  "rural-nurse-retention-economic-model-2026": [{
    key: "blk001",
    expectContains: "$1.2 trillion between 2026 and 2035",
    text: "Workforce analysts have warned that nursing shortages could cost the U.S. economy on the order of $1.2 trillion in lost output by 2030 (an IHS Markit projection of nationwide economic impact, not a rural-hospital-specific figure). For individual rural hospitals, HTR estimates the workforce cost premium driven by vacancies and agency staffing at roughly $1.8M to $3.2M per year above pre-pandemic baselines — an HTR modeled range, not a published HRSA number.",
  }],

  // HITECH: $27B correct; better-sourced adoption figure is ~10% (2008) -> 96% (2021),
  // not "88% / from 9%". (Health Affairs / AHA / Commonwealth Fund)
  "vbc-fundamentals-module-4-technology-pillar": [
    {
      key: "blk005",
      expectContains: "88% of hospitals and 78% of office-based physicians",
      text: "The United States made a massive federal investment in EHR adoption through the HITECH Act of 2009, which appropriated $27 billion in Medicare and Medicaid incentive payments to encourage providers to implement certified EHR systems and demonstrate “meaningful use” — a defined set of capabilities including electronic prescribing, clinical decision support, and patient portal access. Certified EHR adoption among non-federal acute-care hospitals rose from roughly 10% in 2008 to about 96% by 2021 (Health Affairs; ONC), one of the most rapid technology adoption curves in any industry, and it created the clinical data foundation that value-based care analytics requires. However, adoption rates mask significant quality variation that is directly relevant to VBC capability. Having a certified EHR does not mean having a fully configured, fully utilized EHR that generates high-quality structured data. Many providers, particularly smaller rural practices and critical access hospitals, implemented EHR systems at the minimum level required to qualify for HITECH incentive payments, resulting in installations that function primarily as billing and documentation tools rather than population health data platforms.",
    },
    {
      // Telehealth "840k -> 52M visits/week, 6,100%" is unsupported. Documented figure:
      // telehealth went from 0.2% to 50.7% of outpatient E&M visits in April 2020,
      // ~78x the February 2020 level. (CDC MMWR; ASPE)
      key: "blk022",
      expectContains: "52 million visits per week",
      text: "The COVID-19 pandemic produced one technology outcome that has proven durably beneficial for value-based care: the rapid normalization of telehealth as a routine care delivery modality. Between March and June 2020, CMS issued emergency waivers that allowed Medicare to reimburse telehealth visits at parity with in-person visits, removed geographic restrictions that had historically limited telehealth to rural areas, and authorized audio-only visits for patients without video capability. Telehealth surged from about 0.2% of outpatient evaluation-and-management visits in February 2020 to a peak of roughly 50.7% in April 2020 — on the order of 78 times the pre-pandemic level (CDC MMWR; HHS ASPE) — demonstrating both latent demand and the clinical feasibility of delivering much of primary care and chronic disease management by video or phone. For value-based care organizations, telehealth is a care management efficiency multiplier: it lets care coordinators and physicians conduct follow-ups, medication reviews, and chronic disease check-ins at a fraction of the cost and scheduling friction of in-person visits, enabling more frequent contact with high-risk patients than a purely in-person model allows.",
    },
  ],

  // UVMMC MRI: $6,520 vs $1,799 = a 262% markup (verified, VTDigger/BCBSVT). The
  // "262% to 555%" range and "555% markup" are unsupported — the CT pair is ~304%,
  // never 555%. Standardize to 262% (≈3.6x).
  "vermont-payer-provider-war-economics-19-percent": [{
    key: "gp7o3glp",
    expectContains: "262% to 555%",
    text: "The insurer’s campaign relies on a stark economic reality: price dispersion for commoditized services. In a functional market, the 'Law of One Price' suggests that identical goods (like a standard 3T MRI scan) should have similar costs. In Vermont, this law has been broken by market power. Recent disclosures show UVMMC charging roughly 262% more than independent competitors for identical diagnostic work — about $6,520 versus $1,799 for the same MRI.",
  }],
  "zero-sum-battlefield-fee-for-service-failure-vermont": [
    {
      key: "c6127p6f",
      expectContains: "This 262% to 555% markup",
      text: "The conflict began when BCBSVT, facing a $62.1 million deficit after paying out $35 million a week in claims, launched the 'VT Affordable Care' campaign. This initiative explicitly encourages patients to seek care at independent facilities rather than the academic medical center. The insurer's data reveals price variances that are hard to explain by clinical quality alone. For example, a standard MRI costs $6,520 at UVMMC, compared to $1,799 at independent sites — a 262% markup, the hallmark of a 'Differentiated Oligopoly' flexing its market power.",
    },
    {
      key: "prqrmkk3",
      expectContains: "555% markup arbitrage",
      text: "To fix this, Vermont must abandon FFS for **Global Budgets**. Under this model (successfully used in Maryland), the hospital gets a fixed annual revenue cap to care for the population. Crucially, this flips the incentive: an MRI becomes a *cost* to the hospital, not a profit. The hospital would suddenly *want* to partner with cheaper independent centers to save its own budget. Combined with 'Site Neutrality' laws (mandating equal pay for equal work regardless of location), this would structurally end the markup arbitrage.",
    },
  ],
};

async function groq(query, params) {
  const u = `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}${params ? "&" + params : ""}`;
  const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const j = await r.json();
  if (!r.ok) { console.error(JSON.stringify(j)); process.exit(1); }
  return j.result;
}

const ids = Object.keys(FIXES);
const docs = await groq(`*[_id in $ids]{ _id, body }`, `%24ids=${encodeURIComponent(JSON.stringify(ids))}`);
const byId = Object.fromEntries(docs.map((d) => [d._id, d]));

const mutations = [];
for (const [id, fixes] of Object.entries(FIXES)) {
  const doc = byId[id];
  if (!doc) { console.log(`MISSING doc ${id}`); continue; }
  const body = doc.body.map((b) => ({ ...b }));
  for (const fix of fixes) {
    const idx = body.findIndex((b) => b._key === fix.key);
    if (idx < 0) { console.log(`  ${id} {${fix.key}} NOT FOUND`); continue; }
    const cur = (body[idx].children || []).map((c) => c.text).join("");
    if (!cur.includes(fix.expectContains)) {
      console.log(`  ${id} {${fix.key}} SKIP (already fixed / text changed)`);
      continue;
    }
    body[idx] = { ...body[idx], children: [{ _type: "span", _key: `${fix.key}-s`, text: fix.text, marks: [] }] };
    console.log(`  ${id} {${fix.key}} -> corrected`);
    mutations.push({ id });
  }
  // de-dupe: one patch per doc with the fully rebuilt body
  byId[id]._newBody = body;
}

const seen = new Set();
const patches = [];
for (const { id } of mutations) {
  if (seen.has(id)) continue;
  seen.add(id);
  patches.push({ patch: { id, set: { body: byId[id]._newBody } } });
}

console.log(`\n${patches.length} docs to patch.`);
if (!COMMIT) { console.log("DRY RUN — re-run with --commit to apply."); process.exit(0); }

const res = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`,
  { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: patches }) }
);
const out = await res.json();
if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`✅ Applied ${patches.length} document patches.`);
