// §5 — corrections to verified-wrong claims in the remaining (non-top-30) briefs.
// Each replaces one block's text with a web-sourced version. Backups in /sanity-backups/.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

const FIXES = {
  // SEP-1 national compliance is ~50-60% (CMS/literature), not 76%. Drop the
  // unsourced academic-vs-CAH split.
  "policyAnalysis-clin-004": [{
    key: "k255", expect: "76% in 2025",
    text: "CMS's Severe Sepsis and Septic Shock Early Management Bundle (SEP-1) measures compliance with six specific interventions within prescribed time windows. National compliance has risen from roughly 49% when the measure was introduced in 2015 to about 57% in recent reporting (CMS), and the measure was added to the Hospital Value-Based Purchasing Program for FY2024 — making compliance financially consequential for the first time. Compliance still varies widely by hospital, with critical access and lower-volume hospitals generally lagging larger academic centers.",
  }],
  // MSSP record $2.1B was 2023; 2024 was ~$2.48B. The doc dated it 2025.
  "policyAnalysis-eco-001": [{
    key: "k79", expect: "$2.1B in net savings to the Medicare Trust Fund in 2025",
    text: "The Medicare Shared Savings Program (MSSP) posted a then-record $2.1B in net savings to Medicare in 2023, and a new record of roughly $2.5B in 2024 (CMS) — the program's eighth consecutive year of savings. ACO participation has continued to grow, and the distribution of savings remains skewed toward Enhanced Track participants taking on greater downside risk.",
  }],
  // "Vermont lowest procedural disenrollment nationally at 8%" is an unsupported
  // superlative (Maine ~22% was among the lowest). Keep the directional point.
  "policyAnalysis-pol-003": [{
    key: "k47", expect: "lowest procedural disenrollment rate nationally at 8%",
    text: "State outcomes varied dramatically during the Medicaid unwinding. States with ex parte (automatic) renewal processes and robust data-sharing retained far more eligible enrollees than states relying on returned mail, where procedural (paperwork-driven) disenrollments ran high — nationally about 69% of all disenrollments were procedural (KFF). Vermont was among the better-performing states, renewing the majority of enrollees and keeping procedural terminations comparatively low.",
  }],
  // Change Healthcare: ~40% of US claims / >90% of pharmacies affected — NOT
  // "94% of US pharmacies." H-ISAC "847 incidents/78%" not verifiable — soften.
  "policyAnalysis-tech-003": [{
    key: "k175", expect: "94% of U.S. pharmacies",
    text: "Healthcare has become one of the most targeted sectors for ransomware. The February 2024 Change Healthcare attack demonstrated systemic fragility: Change processes roughly 40% of all U.S. medical claims, and its compromise disrupted claims and payment processing for more than 90% of the nation's pharmacies, forcing many patients to pay out of pocket and starving providers of cash flow for weeks (UnitedHealth Group; AHA).",
  }],
  // "555% markups" unsupported — verified UVMMC markup is ~262%.
  "vermont-affordability-crisis-oligopoly-problem": [{
    key: "uwr4rc35", expect: "today's 555% markups",
    text: "The Wyman Report and economic theory suggest a definitive path forward: breaking the Fee-For-Service addiction. The proposed shift to 'Global Budgets' (modeled after Maryland) would cap total hospital revenue, flipping the incentive: suddenly, an MRI becomes a cost to manage rather than a product to sell. Furthermore, enforcing 'Site Neutrality' would mandate that a check-up costs the same whether performed in a hospital tower or a strip mall, dismantling the price arbitrage (UVMMC charges roughly 262% more than independent sites for the same MRI) that drives the crisis.",
  }],
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
    if (!cur.includes(f.expect)) { console.log(`  ${id} {${f.key}} SKIP (text changed)`); continue; }
    body[idx] = { ...body[idx], markDefs: [], children: [{ _type: "span", _key: `${f.key}-s`, text: f.text, marks: [] }] };
    console.log(`  ${id} {${f.key}} -> corrected`); changed = true;
  }
  if (changed) patches.push({ patch: { id, set: { body } } });
}
console.log(`\n${patches.length} docs to patch.`);
if (!COMMIT) { console.log("DRY RUN."); process.exit(0); }
const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: patches }) });
const out = await res.json(); if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`✅ Applied ${patches.length} patches.`);
