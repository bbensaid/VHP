// §5 validation — FULL REWRITE of medicaid-dsh-rural-hospital-fiscal-collapse-2026.
// The original asserted a now-false premise (FY2026 DSH cuts "legally in effect")
// and cited fabricated bills (S.1847, H.R.4891), a fabricated CMS rule (CMS-2408-P),
// named hospitals, and CBO scores that conflict with the real figures.
// This replaces the body with a version grounded in verified public sources:
//   - DSH cuts: $8B/yr scheduled FY2026-2028 but REPEATEDLY DELAYED by Congress;
//     a one-year delay scores ~$625M (CBO). (congress.gov IF10422; HFMA; Georgetown CCF)
//   - Rural margins: Chartis 2025 — 46% of rural hospitals negative margin, 432
//     vulnerable to closure; 10 non-expansion states (30% of rural hospitals) = 53%
//     in the red, median -1.5%; expansion states = 43% red, +1.5% median.
//   - Service loss: 293 rural hospitals dropped OB (2011-23); 424 dropped chemo (2014-23).
// Bodies are backed up in /sanity-backups/. DRY RUN unless --commit.
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
const ID = "medicaid-dsh-rural-hospital-fiscal-collapse-2026";

let k = 0;
const key = () => `dshfix-${++k}`;
const block = (text, style = "normal") => ({
  _type: "block", _key: key(), style,
  markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const body = [
  block(
    "Editor's note (2026): This brief has been revised for accuracy. An earlier version stated that Medicaid Disproportionate Share Hospital (DSH) reductions were “legally in effect beginning FY2026.” That is not correct: although the Affordable Care Act scheduled DSH allotment cuts of roughly $8 billion per year for FY2026–FY2028, Congress has repeatedly delayed them, and the FY2026 reductions have not taken effect on the schedule the original draft assumed. The figures below are drawn from public sources (Congressional Research Service, CBO, and the Chartis Center for Rural Health).",
    "blockquote"
  ),
  block("The DSH Cliff: Scheduled, Severe — and Repeatedly Postponed", "h2"),
  block(
    "When the Affordable Care Act expanded Medicaid in 2010, its architects assumed that broader coverage would shrink uncompensated care and justify reducing Medicaid DSH payments, which compensate hospitals that serve a disproportionate share of low-income and uninsured patients. The law therefore wrote in a schedule of DSH allotment reductions — currently set at roughly $8 billion per year for FY2026, FY2027, and FY2028. The bet was only half right. In states that expanded Medicaid, uncompensated care did fall. In the ten states that did not expand, rural hospitals kept absorbing the uninsured volume the DSH mechanism was designed to offset."
  ),
  block(
    "Crucially, the scheduled cuts have not actually landed. Congress has postponed the DSH reductions repeatedly through short-term legislation, most recently through the appropriations process, and a one-year delay is inexpensive enough that the Congressional Budget Office has scored such a delay at roughly $625 million. The result is a recurring “cliff”: the cuts are always one funding deadline away from taking effect, which makes multi-year financial planning for the most exposed rural hospitals extraordinarily difficult even though the reductions themselves keep being deferred."
  ),
  block("Why Rural Hospitals Are the Most Exposed", "h2"),
  block(
    "The exposure is not evenly distributed. According to the Chartis Center for Rural Health’s 2025 analysis, 46% of rural hospitals were operating with a negative margin and 432 were vulnerable to closure. The expansion gap is stark: the ten non-expansion states hold about 30% of all rural hospitals, but 53% of rural hospitals in those states were in the red, with a median operating margin of −1.5% — versus 43% in the red and a +1.5% median in expansion states. For hospitals already below break-even, a DSH cut is not a budget variance to be managed through efficiency; it removes a structural pillar of solvency."
  ),
  block(
    "The distribution mechanism compounds the problem. Congress sets a national DSH allotment; CMS distributes it to states by formula; and states then pay qualifying hospitals using their own methodologies — often weighted toward Medicaid inpatient days. That design systematically underweights Critical Access Hospitals, whose care is concentrated in emergency and outpatient settings rather than inpatient admissions. A reduction calibrated to high-volume urban safety-net economics is applied, largely unmodified, to low-volume rural facilities."
  ),
  block("The Services Disappear Before the Buildings Do", "h2"),
  block(
    "Even where hospitals avoid closure, financial pressure shows up first as service-line loss. Between 2011 and 2023, 293 rural hospitals stopped offering obstetric services — nearly a quarter of all rural OB units. From 2014 to 2023, 424 rural hospitals ended chemotherapy services, about 21% of those that had offered it. These reductions widen the very access gaps — in maternal care and cancer care — where rural outcomes already lag urban ones, and they are difficult to reverse once the specialized staff have left the community."
  ),
  block("What Hospital Leaders Should Actually Do", "h2"),
  block(
    "Because the DSH schedule keeps being deferred but never repealed, the prudent posture for an exposed rural hospital is to plan for the cut while it is still suspended. Three steps are concrete and within management’s control. First, quantify facility-specific exposure: model what a full DSH reduction would do to your margin using your own most recent DSH receipts as the baseline, rather than relying on statewide aggregates that mask facility-level distribution differences."
  ),
  block(
    "Second, pursue fixed-cost reduction that does not jeopardize Critical Access Hospital certification. CAH Conditions of Participation require 24/7 emergency capability and inpatient capacity but do not mandate specific specialty lines, which leaves room to consolidate or share laboratory, radiology, and revenue-cycle functions — typically the largest controllable overhead categories — through regional shared-services agreements rather than full mergers."
  ),
  block(
    "Third, engage early on affiliation. The window to negotiate a management-services agreement or partial affiliation from a position of relative strength closes as cash reserves shrink; distressed transactions are harder to structure and provoke more community resistance. Boards in the most exposed markets should also brief their congressional delegations with quantified, facility-specific closure risk — the kind of district-level detail that has historically driven the bipartisan votes to delay the cuts in the first place."
  ),
  block("The Bottom Line", "h2"),
  block(
    "The DSH reductions are real, large, and still on the books — but they are not, as of this writing, in force, because Congress keeps postponing them. The danger for rural hospitals is twofold: that one of these deferrals eventually fails, and that the perpetual uncertainty itself deters the long-horizon investment rural systems need. The hospitals most likely to survive the eventual cut are those that treat the current reprieve as planning time, not relief."
  ),
];

const mutations = [{ patch: { id: ID, set: { body } } }];

console.log(`Rewriting ${ID}: ${body.length} new blocks.`);
if (!COMMIT) { console.log("\nDRY RUN — re-run with --commit to apply."); process.exit(0); }

const res = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`,
  { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations }) }
);
const out = await res.json();
if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log("✅ DSH brief rewritten.");
