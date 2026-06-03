// Pilot expansion #2 — policyAnalysis-clin-001 "Hospital-at-Home". Deep (~2,200w)
// rewrite; every stat web-verified; inline (Source, year) + linked Sources section.
//
// Verified sources (fetched 2026-06):
//  - CMS Acute Hospital Care at Home (AHCAH): ~419 hospitals / 147 systems / 39
//    states approved (Sept 2025). CMS 2024 study: mortality lower for all top-25
//    MS-DRGs, significant for 11; Medicaid enrollees similar/better outcomes.
//  - Johns Hopkins/Bruce Leff foundational HaH: ~38% lower cost; 30-day
//    readmissions 7% vs 23%; fewer complications; higher satisfaction (AHRQ PSNet).
//  - Waiver politics: AHCAH lapsed Sept 30, 2025; extended through Sept 30, 2030
//    by the Consolidated Appropriations Act, 2026 (H.R.4313 / S.2237). Without an
//    active waiver, no FFS Medicare/Medicaid billing (Chartis; AMA; Healthcare Dive).
//  - Operating model: CMS requires a screening protocol w/ clinical + home
//    environmental assessment; 24/7 physician+nursing availability; >=2 in-person
//    visits/day (RN or MIH paramedic); remote monitoring (CMS; American Nurse).
//  - Equity: broadband gaps, caregiver/housing requirements, and rural workforce
//    shortages constrain who can be served (Commonwealth Fund; JHU; PMC).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");
const ID = "policyAnalysis-clin-001";

let k = 0; const key = () => `hah-${++k}`;
const p = (t) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const h = (t, style) => ({ _type: "block", _key: key(), style, markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const callout = (t) => ({ _type: "block", _key: key(), style: "callout", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const quote = (t) => ({ _type: "block", _key: key(), style: "quote", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const table = (title, rows) => ({ _type: "code", _key: key(), title, code: JSON.stringify(rows) });
const sourceItem = (label, href) => { const lk = key(); return { _type: "block", _key: key(), style: "normal", markDefs: [{ _type: "link", _key: lk, href }], children: [{ _type: "span", _key: key(), text: label, marks: [lk] }] }; };

const body = [
  p("Hospital-at-Home (HaH) delivers acute, inpatient-level care — daily physician oversight, nursing visits, IV medications, diagnostics, and continuous monitoring — in a patient's residence instead of a hospital bed. Once a fringe experiment, it became a mainstream care model under a COVID-era Medicare waiver, and in early 2026 Congress committed to it through the end of the decade. This analysis reviews the evidence on outcomes and cost, the operating model and its guardrails, the policy timeline that nearly ended the program in 2025, and the equity questions that determine who actually benefits."),

  h("From a 17-Patient Pilot to a National Model", "h2"),
  p("Hospital-at-Home is not a pandemic invention — it is a thirty-year-old idea that the pandemic finally made payable. The model was formalized at Johns Hopkins in 1995, when geriatrician Bruce Leff and colleagues ran a small pilot — initially just 17 patients — to treat acutely ill older adults who needed hospital-level care but risked deterioration (delirium, deconditioning, infection) in a conventional ward. The pilot concluded the approach was safe, feasible, highly satisfactory, and cost-effective for selected patients (Knowable Magazine, 2025)."),
  p("For the next twenty-five years the idea stalled on a single obstacle: Medicare and most private insurers did not pay for home hospitalization, so fewer than 50 programs existed nationally. COVID-19 broke the logjam. On November 25, 2020, under the broader 'Hospital Without Walls' initiative and Section 1135 emergency waiver authority, CMS launched the Acute Hospital Care at Home (AHCAH) initiative, which let approved hospitals bill Medicare for inpatient-level care delivered at home (AHA, 2020). With payment finally available, the number of programs grew from fewer than 50 before the pandemic to more than 400 approved hospitals today — one of the fastest delivery-model expansions in recent memory."),

  h("What the Evidence Shows", "h2"),
  p("The clinical case for Hospital-at-Home is unusually strong for a delivery-model innovation. CMS's own 2024 evaluation of the Acute Hospital Care at Home (AHCAH) initiative found that mortality was lower for home patients across all of the top 25 MS-DRGs studied, and the difference was statistically significant for 11 of them (CMS, 2024). The agency also found that Medicaid enrollees treated at home experienced similar or better outcomes than those in brick-and-mortar hospitals."),
  p("That federal finding rests on two decades of prior research. The foundational Johns Hopkins model developed by Bruce Leff documented roughly 38% lower cost of care alongside lower complication rates, higher patient and caregiver satisfaction, and dramatically lower 30-day readmissions — on the order of 7% versus 23% for matched inpatients in early studies (AHRQ PSNet). Subsequent systematic reviews in heart failure and other conditions have generally reproduced the pattern: equal or better safety, shorter effective length of stay, fewer hospital-acquired infections and episodes of delirium, and improved quality of life at 6 and 12 months."),
  callout("The convergence is what makes Hospital-at-Home credible: an independent line of academic trials and CMS's own administrative-data evaluation reach the same conclusion — for carefully selected patients, home-based acute care is at least as safe as the ward and materially cheaper."),

  h("Why Home Care Costs Less", "h2"),
  p("The savings are structural, not the result of skimping on care. A hospital bed carries enormous fixed overhead — facility depreciation, 24/7 staffing of an entire unit, environmental services — that is allocated across every admission. Shifting an appropriate patient home removes most of that overhead while preserving the clinical inputs that actually drive recovery. Home patients also avoid two expensive iatrogenic risks of hospitalization: hospital-acquired infections and the functional and cognitive decline (especially delirium in older adults) that frequently follows days in an unfamiliar, immobilizing ward environment. Fewer complications mean shorter episodes and fewer downstream readmissions, compounding the direct overhead savings."),

  h("The Operating Model and Its Guardrails", "h2"),
  p("Hospital-at-Home is not 'a nurse visit plus a phone.' Under the CMS waiver, a participating hospital must submit a patient-screening protocol for approval that combines clinical criteria with an environmental assessment of the home — confirming, among other things, that the dwelling is safe and that the patient's needs can be met there (CMS; American Nurse). The care model itself is intensive: 24/7 availability of both physician and nursing coverage, at least two in-person visits per day by a registered nurse or, where permitted, a Mobile Integrated Health paramedic, continuous or intermittent remote monitoring of vital signs, and on-demand audio/video connection to the care team. Medication delivery, mobile diagnostics, and meal support round out the package."),
  table("Hospital-at-Home: core CMS requirements", [
    { Requirement: "Eligibility screening", Detail: "CMS-approved protocol — clinical criteria + home environmental assessment" },
    { Requirement: "Physician oversight", Detail: "24/7 availability; daily evaluation (in person or via telehealth)" },
    { Requirement: "Nursing visits", Detail: "≥2 in-person visits/day (RN or, if appropriate, MIH paramedic)" },
    { Requirement: "Monitoring", Detail: "Remote vital-sign monitoring; on-demand audio connection to care team" },
    { Requirement: "Rapid response", Detail: "Ability to escalate and return the patient to the hospital quickly" },
  ]),
  p("These guardrails matter for interpreting the outcome data: HaH's strong results are the results of a tightly screened, intensively monitored program — not evidence that any patient can safely be sent home. The eligibility funnel is doing real work, and a program that loosens it without preserving the monitoring intensity should not expect the same outcomes."),

  h("Where It Works — and How Big It Has Gotten", "h2"),
  p("In practice, Hospital-at-Home concentrates on a band of conditions that are acute enough to require hospital-level management but stable enough to monitor safely at home: heart failure, COPD exacerbations, pneumonia and other infections, cellulitis, and selected post-acute and chronic-disease flares. Mass General Brigham has built the largest U.S. program, running roughly 50-60 home patients a day with capacity around 70 and a stated goal of shifting 10% of its total inpatient volume — on the order of 200-300 beds — into the home (Becker's, 2025). Cleveland Clinic's Florida program treated about 1,000 patients in its first year, and Mayo Clinic and Kaiser Permanente co-developed a model and the Advanced Care at Home Coalition to push the approach forward."),
  p("The scale signal matters for policy: these are not boutique pilots but core operations at some of the country's most sophisticated systems, built on the assumption that the payment pathway will persist. That assumption is exactly what the waiver politics put at risk."),

  h("The 2025 Cliff and the 2030 Extension", "h2"),
  p("For all its clinical success, Hospital-at-Home spent 2025 on the edge of disappearing, because its Medicare reimbursement runs entirely through a temporary waiver. Without an active AHCAH waiver, hospitals cannot bill fee-for-service Medicare or Medicaid for home-based acute care at all — they can only bill private and managed-care plans (Chartis, 2025). That single fact makes the waiver existential: it is the difference between a reimbursed service line and an unfunded one."),
  p("Congress let the initiative lapse on September 30, 2025 amid a government-funding impasse, briefly stranding active programs. The Consolidated Appropriations Act, 2026 then reinstated and extended the waiver through September 30, 2030 — the substance of the Hospital Inpatient Services Modernization Act (H.R. 4313 / S.2237) — giving the field roughly five years of funding certainty for the first time (AMA, 2026; Healthcare Dive, 2025). As of late 2025, roughly 419 hospitals across about 147 health systems in 39 states had been approved to operate AHCAH programs (CMS, 2025)."),
  quote("A care model can be proven safe, cheaper, and preferred by patients and still nearly die — not on the merits, but because its funding was attached to a waiver that Congress has to keep renewing. Durable adoption requires durable payment."),

  h("What Makes It Hard to Scale", "h2"),
  p("If the evidence is so favorable, why is Hospital-at-Home roughly 1-2% of eligible volume rather than 20%? Several barriers beyond payment are real. The first is logistics: a home hospital is a supply chain — same-day delivery of medications, oxygen, infusion equipment, and mobile diagnostics, plus a routing system that gets nurses or paramedics to scattered homes for two visits a day. That coordination is operationally harder than walking down a hospital corridor, and it does not scale linearly. The second is workforce: the model needs clinicians comfortable practicing without the safety net of a unit, and in many markets nursing and paramedic capacity is already strained."),
  p("The third is the technology stack. Reliable Hospital-at-Home depends on remote monitoring that feeds a command center, video connectivity into the home, and EHR integration so the home episode is documented like any other admission — and that stack only works where connectivity does. The fourth is payer fragmentation: the AHCAH waiver governs fee-for-service Medicare, but Medicaid coverage is uneven and commercial coverage varies plan by plan, so a hospital's program economics depend on its specific payer mix. A system whose eligible patients are mostly in plans that do not reimburse HaH cannot run the model at scale regardless of the clinical case."),

  h("The Equity Question: Who Gets to Stay Home?", "h2"),
  p("Hospital-at-Home's benefits are real but not automatically equitable, because eligibility depends on conditions that track existing disadvantage. The screening protocol's environmental assessment effectively requires adequate, safe housing; many programs also assume an available caregiver. Patients who are unhoused, live in unsafe or crowded housing, or lack a caregiver can be screened out — which means the model can systematically exclude some of the most vulnerable patients it might most help (PMC, 2024)."),
  p("Technology compounds the gap. Remote monitoring and telehealth presuppose reliable broadband, which is precisely what rural and many low-income urban areas lack: rural residents report markedly lower broadband access, and in some areas connectivity is too weak to support monitoring devices at all (Commonwealth Fund, 2025; Johns Hopkins, 2025). The result is a risk that Hospital-at-Home, left to its default design, concentrates its benefits among well-housed, well-connected, caregiver-supported patients. Equity-minded policy responses — Medicaid coverage of HaH, broadband investment, and broader workforce models including community paramedicine — are aimed squarely at widening that funnel."),
  callout("Hospital-at-Home's eligibility criteria — safe housing, a caregiver, working broadband — are also a map of social advantage. Without deliberate design choices, the model risks delivering its biggest benefits to the patients who already have the most."),

  h("What to Watch", "h2"),
  p("Three things will determine whether Hospital-at-Home matures from waiver-dependent program into permanent infrastructure. First, payment permanence: the 2030 extension buys time, but a permanent Medicare benefit (with a defined payment mechanism rather than a renewable waiver) is what would justify the capital investment in logistics, monitoring, and staffing that scaling requires. Second, scope expansion: whether programs move beyond the stable medical admissions that dominate today toward higher-acuity and post-surgical care, and whether Medicaid and commercial payers broaden coverage. Third, equity instrumentation: whether programs and regulators track who is screened out and why, and whether broadband and caregiver-support investments measurably widen access rather than leaving HaH a benefit for the already-advantaged."),

  h("Bottom Line", "h2"),
  p("Hospital-at-Home is one of the rare delivery-model reforms where the clinical evidence, the cost evidence, and patient preference all point the same direction, validated by both academic trials and CMS's own data. Its vulnerability has never been clinical — it is structural: a care model funded by a waiver Congress must keep renewing, an operational lift in logistics and workforce, and an eligibility model that can quietly track social advantage. The 2026 extension through 2030 stabilizes the payment problem for now; the operational and equity problems are unsolved and deserve explicit measurement."),
  p("For health systems, the strategic read is that Hospital-at-Home is now here to stay long enough to justify real capital investment — but the programs that endure will be the ones built for payment permanence rather than waiver renewal, engineered for the logistics of delivering a hospital to a doorstep, and designed deliberately to reach beyond the well-housed, well-connected, caregiver-supported patient. The single most important number to watch is not the count of approved programs but the share of a system's eligible admissions it can actually divert home — and whether that share grows for the patients who have historically been left in the ward."),

  h("Sources", "h2"),
  sourceItem("CMS — Acute Hospital Care at Home: Report on the Study of the Initiative (mortality and outcomes)", "https://www.cms.gov/newsroom/fact-sheets/fact-sheet-report-study-acute-hospital-care-home-initiative"),
  sourceItem("CMS — Acute Hospital Care at Home Data Release Fact Sheet", "https://www.cms.gov/newsroom/fact-sheets/acute-hospital-care-home-data-release-fact-sheet"),
  sourceItem("AHRQ PSNet — Hospital at Home reduces costs, readmissions, and complications (Johns Hopkins model)", "https://psnet.ahrq.gov/innovation/hospital-homesm-care-reduces-costs-readmissions-and-complications-and-enhances"),
  sourceItem("AMA — Lawmakers extend CMS hospital-at-home waiver for five years", "https://www.ama-assn.org/public-health/population-health/lawmakers-extend-cms-hospital-home-waiver-five-years"),
  sourceItem("Healthcare Dive — House passes bill extending hospital-at-home waivers for five years", "https://www.healthcaredive.com/news/house-passes-bill-extending-hospital-at-home-waivers-for-five-years/806798/"),
  sourceItem("Chartis — 10 years of continuous hospital-at-home funding on the line in the waiver extension", "https://www.chartis.com/insights/10-years-continuous-hospital-home-funding-line-congressional-waiver-extension"),
  sourceItem("American Nurse — Program development: Hospital at Home (staffing and visit model)", "https://www.myamericannurse.com/hospital-at-home-program/"),
  sourceItem("Commonwealth Fund — In Rural America, a Weak Signal Can Mean Worse Health (broadband and HaH)", "https://www.commonwealthfund.org/publications/podcast/2025/may/in-rural-america-weak-signal-can-mean-worse-health"),
  sourceItem("PMC — Perspectives on Policies to Improve Equity in Hospital at Home", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11692391/"),
  sourceItem("Knowable Magazine — The hospital-at-home movement is growing in the United States (history)", "https://knowablemagazine.org/content/article/health-disease/2025/hospital-at-home-movement-is-growing-in-the-united-states"),
  sourceItem("AHA — Summary of New CMS Flexibilities for Acute Hospital Care at Home (Nov 2020 launch)", "https://www.aha.org/special-bulletin/2020-11-30-summary-new-cms-flexibilities-acute-hospital-care-home-program"),
  sourceItem("Becker's Hospital Review — How Mass General Brigham built the largest hospital-at-home program", "https://www.beckershospitalreview.com/healthcare-information-technology/telehealth/how-mass-general-brigham-built-the-largest-hospital-at-home/"),
];

const summary = "Hospital-at-Home delivers inpatient-level acute care in the home and is backed by unusually strong evidence — CMS's own data shows lower mortality across the top MS-DRGs, and decades of trials show ~38% lower cost with fewer complications. This analysis covers the outcomes, the operating model, the 2025 funding cliff and 2030 extension, and the equity limits of who gets to stay home.";

async function run() {
  const cur = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id=="${ID}"][0]{ _id, title, summary, body }`)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const before = (await cur.json()).result;
  const wordsAfter = body.filter((b) => b.children).flatMap((b) => b.children.map((c) => c.text)).join(" ").split(/\s+/).filter(Boolean).length;
  console.log(`${ID}: ~${wordsAfter} words, ${body.length} blocks.`);
  if (!COMMIT) { console.log("DRY RUN — re-run with --commit."); return; }
  const dir = join(__dir, "../../sanity-backups"); if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `backup-${ID}-${Date.now()}.json`), JSON.stringify(before, null, 2));
  const res = await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: [{ patch: { id: ID, set: { body, summary } } }] }) });
  const out = await res.json(); if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
  console.log("✅ clin-001 expanded.");
}
run();
