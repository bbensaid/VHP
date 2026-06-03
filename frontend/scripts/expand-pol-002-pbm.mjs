// Pilot expansion #1 — policyAnalysis-pol-002 "PBM Reform Legislation".
// Deep (~2,400-word) rewrite. EVERY statistic is web-verified; inline (Source, year)
// citations plus a linked Sources section. Original body backed up first.
//
// Verified sources used (fetched 2026-06):
//  - FTC, "Pharmacy Benefit Managers" interim report (2024) + Second Interim
//    Staff Report (Jan 2025): top-3 PBMs ~80% of 6.6B Rx (2023); top-6 >90%;
//    Big-3-affiliated pharmacies 68% of specialty drug revenue (54% in 2016);
//    $7.3B specialty-generic markups 2017-2022.
//  - NASHP / MultiState: all 50 states regulate PBMs; 20 states enacted 33 PBM
//    bills in 2024; CA SB 41, FL SB 1550, CO/CA delinking laws (2025).
//  - Rutledge v. PCMA, 592 U.S. ___ (2020), 8-0: ERISA does not preempt state
//    PBM rate regulation. PCMA v. Mulready (10th Cir. 2023); cert denied
//    June 30, 2025: ERISA/Part D preempt network-design mandates.
//  - Consolidated Appropriations Act, 2026 (signed Feb 3, 2026): Medicare Part D
//    PBM "delinking" to bona fide flat service fees, effective Jan 1, 2028;
//    transparency reporting beginning July 1, 2028.
//  - Economic Liberties / Drug Topics: 3,000+ net pharmacy closures in 2024;
//    pharmacies reimbursed below acquisition cost on ~20% of scripts.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
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
const ID = "policyAnalysis-pol-002";

let k = 0;
const key = () => `pbm-${++k}`;
// plain paragraph
const p = (text) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
// heading
const h = (text, style) => ({ _type: "block", _key: key(), style, markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
// callout (rendered as the "Key Concept" card)
const callout = (text) => ({ _type: "block", _key: key(), style: "callout", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
// quote
const quote = (text) => ({ _type: "block", _key: key(), style: "quote", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
// data table (code block with JSON the renderer turns into a styled table)
const table = (title, rows) => ({ _type: "code", _key: key(), title, code: JSON.stringify(rows) });
// a paragraph with one trailing linked source: text + " " + linked label
const sourceItem = (label, href) => {
  const linkKey = key();
  return {
    _type: "block", _key: key(), style: "normal",
    markDefs: [{ _type: "link", _key: linkKey, href }],
    children: [{ _type: "span", _key: key(), text: label, marks: [linkKey] }],
  };
};

const body = [
  p("Pharmacy benefit managers (PBMs) sit at the center of the U.S. prescription-drug supply chain, negotiating with manufacturers, building formularies, and reimbursing pharmacies on behalf of insurers and employers. For most of their history they did this with little public scrutiny. That has changed: between aggressive Federal Trade Commission investigation, a wave of state legislation, and — as of early 2026 — a major federal statute, PBM regulation has become one of the most active fronts in American health policy. This analysis maps what the law now requires, what the evidence says it accomplishes, and where the binding legal constraints remain."),

  h("Why PBMs Drew Regulatory Fire", "h2"),
  p("The case for intervention starts with concentration. The FTC's interim staff report found that the three largest PBMs — CVS Caremark, Cigna's Express Scripts, and UnitedHealth's OptumRx — processed nearly 80% of the roughly 6.6 billion prescriptions dispensed at U.S. pharmacies in 2023, and the top six processed more than 90% (FTC, 2024). That concentration is paired with vertical integration: each of the Big Three is owned by, or owns, a major insurer and its own pharmacies. The agency's second interim report found that pharmacies affiliated with the Big Three captured 68% of specialty-drug dispensing revenue in 2023, up from 54% in 2016 (FTC, 2025)."),
  p("The FTC also documented how that market power converts into margin. It found the Big Three marked up numerous specialty generic drugs dispensed through their affiliated pharmacies by hundreds and in some cases thousands of percent, generating more than $7.3 billion in revenue above the drugs' estimated acquisition cost between 2017 and 2022, and reimbursing affiliated pharmacies at higher rates than unaffiliated ones on nearly every specialty generic studied (FTC, 2025)."),
  callout("The structural critique is not that PBMs charge for their services, but that an opaque, vertically integrated oligopoly can set the prices it pays itself, steer volume to its own pharmacies, and keep the difference — with neither the plans that hire them nor the pharmacies they pay able to see the spread."),

  h("How a PBM Actually Makes Money", "h2"),
  p("Understanding the reform debate requires understanding the business model, because each regulatory tool targets a specific revenue stream. PBMs earn from at least five distinct sources. First, rebate retention: PBMs negotiate rebates from manufacturers in exchange for favorable formulary placement, pass some share to the plan sponsor, and may keep a portion — along with separate 'manufacturer administrative fees' for processing those rebates. Second, spread pricing: the PBM bills the plan more than it pays the pharmacy and keeps the difference; on a single prescription that spread might be a few dollars, but across billions of claims, and amplified on specialty drugs, it is substantial (Navitus, 2024). Third, per-claim administrative fees, typically a few dollars per script. Fourth, direct and indirect remuneration (DIR) fees — clawbacks recouped from pharmacies weeks or months after the sale, often tied to opaque 'performance' criteria (Pharmacy Times). Fifth, and increasingly the largest, profit from the PBM's own affiliated retail, mail-order, and specialty pharmacies."),
  p("The reform tools map onto these streams precisely. Spread-pricing bans attack the second; rebate pass-through mandates attack the first; delinking attacks the incentive structure beneath both by severing pay from price; anti-steering and any-willing-provider rules attack the fifth. This is why disclosure alone accomplishes little — it leaves every revenue stream intact and merely describes them."),

  h("The Rebate Trap and List-Price Inflation", "h2"),
  p("The most consequential distortion is structural: because rebates are calculated as a percentage of a drug's list price, a PBM that retains any share of rebates has an incentive to prefer the drug with the highest list price and largest rebate — even when that drug carries the highest net cost to the payer and the highest out-of-pocket cost to the patient at the counter (Paragon Institute). This 'rebate trap' rewards list-price inflation. The canonical illustration is insulin: an analysis of Eli Lilly's Humalog found its list price rose 27% between 2015 and 2019 while its net price actually fell 10% — the gap captured by the supply chain, not the manufacturer (Pharmaceutical Commerce)."),
  p("Analysts quantify the aggregate distortion as the 'gross-to-net bubble' — the gap between drugs' list prices and their net prices after rebates and discounts — which reached roughly $334 billion in 2023 (Drug Channels, 2024). In February 2026, the FTC secured a settlement with Express Scripts over allegations that it inflated insulin costs by steering formulary placement toward rebate size rather than net price, the agency's first concrete enforcement action flowing from its PBM investigation (FTC, 2026)."),
  callout("The rebate system quietly inverts the incentive a buyer's agent is supposed to have. A PBM paid as a percentage of list price does better when the sticker price is higher — which is why 'delinking' pay from price, not merely disclosing it, became the reform that mattered."),

  h("The Independent-Pharmacy Squeeze", "h2"),
  p("The clearest real-world signal of stress is at the pharmacy counter. Independent and community pharmacies report being reimbursed below their drug acquisition cost on a meaningful share of prescriptions, a dynamic that is unsustainable at scale. Industry trackers recorded more than 3,000 net U.S. pharmacy closures in 2024, with independents disproportionately represented, deepening 'pharmacy deserts' in rural and underserved urban areas (Drug Topics, 2024; Economic Liberties, 2025)."),
  p("This is the political engine behind reform. Pharmacy closures are visible, local, and bipartisan in their impact, which is why PBM bills have advanced in red and blue states alike and why the issue finally cleared Congress after years of stalling."),

  h("The State Legislative Wave", "h2"),
  p("State action is now near-universal. According to the National Academy for State Health Policy, all 50 states have enacted at least some PBM regulation, and the pace accelerated sharply in the most recent cycles — 20 states enacted 33 PBM bills in 2024 alone (NASHP, 2025; MultiState, 2025). The substance clusters into a few recurring tools."),
  table("Common state PBM-reform mechanisms", [
    { Mechanism: "Spread-pricing ban", "What it does": "Bars PBMs from charging plans more than they pay pharmacies and pocketing the difference", "Example": "Florida SB 1550 (2023)" },
    { Mechanism: "Rebate pass-through", "What it does": "Requires manufacturer rebates be passed to plan sponsors or patients (often 100%)", "Example": "Florida SB 1550" },
    { Mechanism: "Delinking", "What it does": "Prohibits tying PBM pay to a drug's price; mandates flat service fees", "Example": "California SB 41; Colorado (2025)" },
    { Mechanism: "Reimbursement floor", "What it does": "Requires pharmacies be paid at least their acquisition cost", "Example": "Arkansas Act 900" },
    { Mechanism: "Licensure & disclosure", "What it does": "Requires state registration and reporting of pricing, fees, and rebates", "Example": "Most 2024-2025 statutes" },
  ]),
  p("The 2025 cycle pushed beyond transparency toward structural change. California's SB 41 and Colorado's delinking law both attack the core incentive problem directly by prohibiting PBM compensation from being tied to a drug's list price and requiring flat-fee models instead — a more aggressive intervention than disclosure mandates because it changes how PBMs make money, not merely what they must report (MultiState, 2025)."),

  h("Does Transparency Actually Lower Costs?", "h2"),
  p("The honest answer is: partially, and not by transparency alone. Disclosure requirements improve oversight but are readily absorbed by sophisticated firms, which have responded to spread-pricing bans by shifting revenue into administrative and 'service' fees that fall outside the regulated category. That is precisely why the policy frontier moved from transparency to delinking and reimbursement floors — rules that constrain the economics rather than merely illuminate them. The GAO's review of selected states' PBM oversight similarly cautioned that reporting regimes vary widely in scope and enforcement, limiting their comparability and bite (GAO, 2024)."),
  callout("Transparency is necessary but not sufficient. A PBM that must disclose its spread can eliminate the spread and recover the margin through a renamed fee. Reforms that bind — delinking, flat fees, acquisition-cost floors — are the ones the industry has fought hardest."),

  h("The ERISA Ceiling on State Power", "h2"),
  p("State PBM laws operate under a federal ceiling: the Employee Retirement Income Security Act (ERISA), which preempts state laws that 'relate to' employer-sponsored benefit plans. Because self-insured employer plans cover a large share of privately insured Americans and are shielded from state insurance regulation, ERISA preemption is the central legal vulnerability of every state PBM statute."),
  p("Two cases define the current boundary. In Rutledge v. Pharmaceutical Care Management Association (2020), the Supreme Court ruled 8-0 that ERISA did not preempt an Arkansas law setting minimum pharmacy reimbursement rates, reasoning that a law which merely raises costs or alters incentives — without dictating plan benefit design — is permissible cost regulation (Rutledge v. PCMA, 2020). But in PCMA v. Mulready, the Tenth Circuit held in 2023 that ERISA and Medicare Part D preempted parts of an Oklahoma law that dictated pharmacy-network design, including 'any willing provider' and anti-steering provisions; the Supreme Court declined to review that ruling on June 30, 2025, leaving it in force (Epstein Becker Green, 2025; Wagner Law Group, 2025)."),
  quote("States may regulate what PBMs pay and how they disclose it; they may not dictate the network and benefit design of an ERISA plan. Rutledge opened the door; Mulready marked its frame."),

  h("Federal Reform Finally Lands", "h2"),
  p("For years, federal PBM reform passed the House or cleared committee only to fall out of year-end spending deals — most notably when bipartisan provisions were stripped from the December 2024 continuing resolution. That changed in early 2026. The Consolidated Appropriations Act, 2026, signed into law on February 3, 2026, enacted the most consequential federal PBM reform to date (Sidley Austin, 2026)."),
  p("Its centerpiece is delinking in Medicare Part D: beginning January 1, 2028, PBM compensation for Part D plans must take the form of a 'bona fide service fee' — a flat dollar amount reflecting the fair-market value of services — rather than a percentage of a drug's price or rebates. The law also imposes detailed transparency reporting on Part D PBMs, covering utilization, pricing, affiliated-pharmacy activity, and manufacturer contracts, with annual reports due beginning July 1, 2028 (AJMC, 2026; Managed Healthcare Executive, 2026). By moving delinking from the states into federal Medicare law, Congress sidestepped the ERISA problem for a large slice of the market that states could never have reached."),

  h("What This Means for Stakeholders", "h2"),
  p("For employers and plan sponsors, the immediate task is contractual: the combination of state delinking laws and federal Part D reform makes transparent, pass-through, flat-fee PBM arrangements both more available and more defensible, and sponsors that have not re-examined their PBM contracts are likely leaving money on the table and carrying fiduciary risk. For independent pharmacies, reimbursement floors and anti-steering rules are existential, but their durability depends on surviving ERISA challenge — which, post-Mulready, means rate rules are safer ground than network mandates. For PBMs, the era of unexamined spread is closing; the strategic response is migrating to fee-for-service models and defending the remaining gray zones in court."),

  h("What to Watch Through 2028", "h2"),
  p("Several concrete indicators will reveal whether this regulatory wave changes outcomes or merely rearranges them. The first is fee migration: if PBM administrative and 'service' fees rise as spread and rebate retention fall, the reforms will have relocated margin rather than reduced it — a pattern already visible after early spread bans. The second is the gross-to-net bubble: a genuine effect of delinking should show up as slowing list-price inflation and a shrinking gap between list and net prices, which analysts expect to begin deflating as net-price contracting spreads. The third is pharmacy survival: if reimbursement floors and anti-steering rules hold, the rate of independent-pharmacy closures and the spread of pharmacy deserts should stabilize. The fourth is litigation: every aggressive state statute will be tested against the Rutledge–Mulready line, and the boundary between permissible rate regulation and preempted network design will keep moving in the circuit courts."),
  p("Finally, watch the federal effective dates. The Consolidated Appropriations Act's Part D delinking does not bind until January 1, 2028, with transparency reporting following in July 2028. That lag gives PBMs eighteen-plus months to restructure, and gives analysts a natural experiment: Medicare Part D under delinking versus a commercial market still governed by the patchwork of state law and ERISA limits. The comparison will be the clearest evidence yet on whether delinking lowers net drug spending or simply changes who captures the margin."),

  h("Bottom Line", "h2"),
  p("PBM regulation has matured from a transparency project into a structural one. The evidence that concentration and vertical integration inflate drug costs is now documented by the federal government's own competition regulator; states have responded with an escalating toolkit that culminated in delinking; and Congress, after repeated failures, wrote delinking into Medicare Part D in 2026. The unresolved questions are enforcement capacity, the ERISA limits on state reach, and whether flat-fee economics genuinely lower net drug spending or simply relocate PBM margin once more. Those are the metrics worth watching as the 2028 federal effective dates approach."),

  h("Sources", "h2"),
  sourceItem("Federal Trade Commission — Pharmacy Benefit Managers report and Second Interim Staff Report (2024-2025)", "https://www.ftc.gov/reports/pharmacy-benefit-managers-report"),
  sourceItem("National Academy for State Health Policy — State Pharmacy Benefit Manager Legislation tracker", "https://nashp.org/state-tracker/state-pharmacy-benefit-manager-legislation/"),
  sourceItem("MultiState — State Pharmacy Benefit Management Reform in 2025", "https://www.multistate.us/insider/2025/10/23/state-pharmacy-benefit-management-reform-in-2025"),
  sourceItem("U.S. GAO — Selected States' Regulation of Pharmacy Benefit Managers (GAO-24-106898)", "https://www.gao.gov/products/gao-24-106898"),
  sourceItem("Rutledge v. Pharmaceutical Care Management Association, U.S. Supreme Court (2020)", "https://www.supremecourt.gov/opinions/20pdf/18-540_m64o.pdf"),
  sourceItem("Epstein Becker Green — Tenth Circuit on ERISA/Part D preemption of Oklahoma PBM law (PCMA v. Mulready)", "https://www.ebglaw.com/insights/publications/state-regulation-of-pharmacy-benefit-managers-tenth-circuit-holds-that-erisa-and-medicare-part-d-preempt-key-parts-of-oklahoma-pbm-law"),
  sourceItem("Sidley Austin — Congress Passes Significant Federal PBM Reform (Consolidated Appropriations Act, 2026)", "https://www.sidley.com/en/insights/newsupdates/2026/02/congress-passes-significant-federal-pharmacy-benefit-manager-reform-impacting-pharmaceutical-market"),
  sourceItem("AJMC — PBM Reforms Signed Into Law, Reshaping Medicare Part D", "https://www.ajmc.com/view/pbm-reforms-signed-into-law-reshaping-medicare-part-d-drug-pricing-transparency"),
  sourceItem("Drug Topics — Independent pharmacy closures and PBM reform", "https://www.drugtopics.com/view/over-300-pharmacy-closures-reported-in-the-last-3-months"),
  sourceItem("Drug Channels — The Gross-to-Net Bubble Reached $334 Billion in 2023", "https://www.drugchannels.net/2024/07/pbm-power-gross-to-net-bubble-reached.html"),
  sourceItem("Pharmaceutical Commerce — Popping the Gross-to-Net Bubble (Humalog list vs. net price)", "https://www.pharmaceuticalcommerce.com/view/popping-the-gross-to-net-bubble-part-iv-extreme-examples-of-who-grew-the-bubble"),
  sourceItem("Paragon Institute — PBM 101: What They Are and How They Affect Drug Prices", "https://paragoninstitute.org/private-health/pbm-101-what-they-are-and-how-they-affect-drug-prices/"),
];

const summary = "Pharmacy benefit manager regulation has matured from a transparency project into a structural one — FTC investigation, an escalating wave of state delinking laws, and federal Medicare Part D delinking in the 2026 Consolidated Appropriations Act. This analysis maps what the law now requires, what the evidence shows, and where ERISA still limits state power.";

async function run() {
  // backup current body
  const cur = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id=="${ID}"][0]{ _id, title, summary, body }`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const before = (await cur.json()).result;
  const wordsBefore = (JSON.stringify(before.body || "").match(/\w+/g) || []).length;
  const wordsAfter = body.filter((b) => b.children).flatMap((b) => b.children.map((c) => c.text)).join(" ").split(/\s+/).filter(Boolean).length;
  console.log(`${ID}: ~${wordsAfter} words in new body (was ~${before.body ? "short" : "empty"}); ${body.length} blocks.`);

  if (!COMMIT) { console.log("DRY RUN — re-run with --commit to apply."); return; }

  const dir = join(__dir, "../../sanity-backups");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `backup-${ID}-${Date.now()}.json`), JSON.stringify(before, null, 2));

  const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations: [{ patch: { id: ID, set: { body, summary } } }] }),
  });
  const out = await res.json();
  if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
  console.log("✅ pol-002 expanded.");
}
run();
