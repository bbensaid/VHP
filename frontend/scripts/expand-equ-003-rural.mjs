// Pilot #3 — policyAnalysis-equ-003 "Rural Healthcare Access". Deep (~2,200w),
// every stat web-verified, inline (Source, year) + linked Sources section.
//
// Verified sources (fetched 2026-06):
//  - UNC Sheps Center: 153 rural hospital closures since 2010; inpatient care
//    ended in 182 rural communities (closures + conversions).
//  - Chartis 2025 Rural Health State of the State: 432 rural hospitals vulnerable
//    to closure; ~46% operating with a negative margin; non-expansion states worse.
//  - Primary care density: rural 39.8 vs urban 53.3 PCPs per 100,000.
//  - Maternity: 59% of rural counties are maternity care deserts; 238 rural
//    hospitals lost OB services 2010-2022; 52.4% of rural hospitals lacked OB by
//    2022 (up from 43.1% in 2010) (Penn LDI; GAO-23-105515; March of Dimes).
//  - Broadband: ~28% of rural Americans lack 100/20 Mbps (vs ~2% urban); ~72%
//    rural vs ~98% urban coverage; BEAD program = $42.45B (NTIA; FCC; Brookings).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const TOKEN = process.env.SANITY_API_TOKEN, PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");
const ID = "policyAnalysis-equ-003";

let k = 0; const key = () => `rur-${++k}`;
const p = (t) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const h = (t, style) => ({ _type: "block", _key: key(), style, markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const callout = (t) => ({ _type: "block", _key: key(), style: "callout", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const quote = (t) => ({ _type: "block", _key: key(), style: "quote", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] });
const table = (title, rows) => ({ _type: "code", _key: key(), title, code: JSON.stringify(rows) });
const sourceItem = (label, href) => { const lk = key(); return { _type: "block", _key: key(), style: "normal", markDefs: [{ _type: "link", _key: lk, href }], children: [{ _type: "span", _key: key(), text: label, marks: [lk] }] }; };

const body = [
  p("Rural Americans live sicker and die younger than their urban counterparts, and the gap is widening. The cause is not a single failure but a compounding one: hospitals close, the clinicians who remain are spread thinner, whole service lines like obstetrics disappear, and the broadband that might bridge the distance is itself missing. This analysis quantifies each layer of the rural access crisis — facility closures, workforce shortages, the collapse of maternity care, and the digital divide — and assesses the federal responses now in play."),

  h("The Closure Crisis", "h2"),
  p("The most visible symptom is the disappearing hospital. The University of North Carolina's Sheps Center, which maintains the authoritative count, documents 153 rural hospital closures since 2010; counting facilities that converted away from inpatient care, acute inpatient access has ended in 182 rural communities over that period (Sheps Center). The pipeline of risk is larger still: the Chartis Center for Rural Health's 2025 analysis found 432 rural hospitals vulnerable to closure and roughly 46% of all rural hospitals operating with a negative margin — the weakest financial position the sector has been in since tracking began (Chartis, 2025)."),
  p("The damage is geographically concentrated in the South and Midwest, and within those regions in counties that are sparsely populated, lower-income, and disproportionately Black — meaning closures fall hardest where baseline health is already worst. And the harm radiates beyond healthcare: a rural hospital is frequently one of its county's largest employers, so a closure removes both medical access and economic anchor at once."),
  callout("A rural hospital closure is rarely just the loss of beds. It severs emergency stabilization, erases local jobs, and forces every future emergency — a heart attack, a car crash, a difficult birth — into a longer drive that the clock does not forgive."),

  h("Why Rural Hospital Economics Break", "h2"),
  p("The closures are not the result of bad management so much as a structural economic trap. Rural hospitals combine low patient volume with high fixed costs — an emergency department, imaging, and 24/7 staffing cost roughly the same whether they serve 5 patients a day or 50 — so when volume falls below the level that covers those fixed costs, losses are mechanical (Saving Rural Hospitals). Layered on top is an unfavorable payer mix: Medicare and Medicaid covered about 72% of rural inpatient discharges in 2023, and both typically reimburse below the cost of care, leaving rural hospitals with little commercial revenue to cross-subsidize the shortfall (Commonwealth Fund, 2026)."),
  p("The numbers are stark. MedPAC pegged the Medicare fee-for-service operating margin at roughly negative 12% in 2024; more than 700 rural hospitals lost money that year, and nearly 400 had losses of 5% or more (MedPAC; Commonwealth Fund). With thin reserves and little negotiating leverage against commercial insurers, a single bad year — a service-line loss, a labor-cost spike, a Medicaid rate that lags inflation — can push a marginal rural hospital from precarious to insolvent. This is also why Medicaid expansion matters so much: it converts uninsured, uncompensated patients into paying ones, and rural hospitals in non-expansion states run measurably worse margins as a result."),

  h("The Workforce Gap", "h2"),
  p("Even where facilities survive, the clinicians do not follow the need. Rural areas have about 39.8 primary care physicians per 100,000 residents, against 53.3 in urban areas — roughly a quarter fewer doctors for a population that is older, poorer, and more burdened by chronic disease (Rural Health Information Hub). The maldistribution is starker for specialists and for behavioral health, where rural counties frequently have no psychiatrist within a long drive at all. The result is longer waits, longer travel, and care deferred until it becomes an emergency."),
  p("This is partly a pipeline problem — physicians tend to settle near where they train, and training is overwhelmingly urban — and partly an economics problem: rural practice often means lower reimbursement, less call coverage, and professional isolation. It is why scope-of-practice expansion for nurse practitioners and physician assistants, loan-repayment programs tied to rural service, and community-paramedicine models have all moved to the center of the rural workforce debate. None individually closes the gap."),

  h("Maternity Care: The Sharpest Edge", "h2"),
  p("Nowhere is the access collapse more acute, or more dangerous, than in childbirth. By 2022, more than half of rural hospitals — 52.4% — no longer offered obstetric services, up from 43.1% in 2010, as 238 rural hospitals shed labor-and-delivery units over that period (Penn LDI). The downstream geography is stark: roughly 59% of rural counties are now classified as maternity care deserts, leaving an estimated several million women of childbearing age to travel long distances for prenatal and delivery care (March of Dimes; GAO, 2023)."),
  p("The clinical consequences are not theoretical. When the nearest delivery unit is an hour or more away, the rate of out-of-hospital and pre-term births rises, prenatal visits fall, and obstetric emergencies — hemorrhage, eclampsia — arrive at emergency departments that are not equipped to manage them. Maternity-unit closures are concentrated in exactly the low-income, higher-minority rural counties that already have the worst maternal outcomes, so the closures widen an existing disparity rather than creating a new one."),
  table("Rural access gaps at a glance", [
    { Dimension: "Hospital closures (since 2010)", Rural: "153 closed; 182 communities lost inpatient care", Source: "Sheps Center" },
    { Dimension: "Hospitals vulnerable to closure", Rural: "432; ~46% running negative margins", Source: "Chartis 2025" },
    { Dimension: "Primary care physicians / 100k", Rural: "39.8 (vs 53.3 urban)", Source: "RHIhub" },
    { Dimension: "Hospitals without obstetric care (2022)", Rural: "52.4% (up from 43.1% in 2010)", Source: "Penn LDI" },
    { Dimension: "Maternity care deserts", Rural: "59% of rural counties", Source: "March of Dimes" },
    { Dimension: "Lack 100/20 Mbps broadband", Rural: "~28% (vs ~2% urban)", Source: "NTIA / FCC" },
  ]),

  h("The Cost of Distance", "h2"),
  p("When access disappears, distance becomes a clinical variable. Rural EMS call times average 92.8 minutes across all severity levels, against 74.1 minutes nationally, and the interval from a 911 call to an ambulance arriving on scene roughly doubles — about 14 minutes in rural settings versus 7 nationally (American College of Surgeons, 2025). Each rural hospital closure makes this worse: studies find closures add roughly 2.6 minutes to EMS transport time and over 7 minutes to total activation time, with the next-nearest hospital averaging about 12 miles farther away (PMC, 2020)."),
  p("Those minutes are not abstract. Rural residents are significantly more likely than urban residents to die following traumatic injury, the fatality rate from a vehicle crash in a rural area is nearly double the urban rate, and survival from out-of-hospital cardiac arrest is lower — outcomes driven substantially by travel time to definitive care (RHIhub). In time-critical emergencies, the distance created by closures and the absence of nearby trauma capability is itself a cause of death."),

  h("The Digital Divide Undercuts the Obvious Fix", "h2"),
  p("Telehealth is the intuitive answer to distance — and for many services it genuinely works — but it runs into the rural access crisis's quietest layer: connectivity. Roughly 28% of rural Americans lack access to fixed broadband at the 100/20 Mbps benchmark, against about 2% of urban residents; coverage is roughly 72% rural versus 98% urban, and in 32 states the urban-rural broadband gap actually widened in 2024 (NTIA; FCC; Route Fifty, 2024). Where the signal is weak, remote monitoring devices fail, video visits drop, and the very tool meant to compensate for the missing hospital cannot be deployed."),
  p("This is why broadband is now treated as health infrastructure. The $42.45 billion federal Broadband Equity, Access, and Deployment (BEAD) program, administered by the NTIA through the states, is the largest attempt yet to close the gap (NTIA; Brookings). But construction timelines are long, and prior subsidy programs have shown that connectivity can fade once funding ends — so broadband investment is necessary for telehealth-based rural access strategies but is years, not months, from delivering them."),
  quote("Telehealth can substitute for the hospital that closed only where the broadband exists to carry it. In much of rural America, the two failures overlap — the place that lost its hospital is also the place that cannot get online."),

  h("What Is Being Tried", "h2"),
  p("Federal and state responses fall into four buckets. On facility survival, the Rural Emergency Hospital (REH) designation — created by Congress and effective in 2023 — lets a struggling rural hospital drop inpatient services in exchange for enhanced outpatient and emergency payments, preserving emergency access where full inpatient care is no longer viable; uptake has been cautious. On payment, Medicaid expansion remains the single largest lever, because rural hospitals in non-expansion states carry far more uncompensated care and run worse margins than those in expansion states. On workforce, the tools are loan repayment, rural residency slots, scope-of-practice expansion, and telehealth-enabled specialty support. On connectivity, BEAD and related programs aim to make telehealth feasible in the first place."),
  p("Each addresses one layer, and none addresses the interaction among them — which is the core analytical point. A broadband grant does not help a county whose hospital has closed and whose physicians have left; a new REH preserves an emergency room but not obstetrics or specialty care; Medicaid expansion improves margins but does not by itself rebuild a maternity unit once the staff have scattered. Rural access is a system failure, and piecemeal fixes produce piecemeal results."),

  h("The Compounding Nature of the Crisis", "h2"),
  p("The defining feature of rural access decline is that the layers feed one another, producing a downward spiral that no single intervention reverses. A hospital running negative margins cuts its least-profitable service line first — almost always obstetrics, which is expensive to staff around the clock for relatively few deliveries. Losing obstetrics drives young families away and removes a reason for a primary-care physician to stay, deepening the workforce gap. Fewer clinicians and services mean lower volume, which worsens the fixed-cost math that threatened the hospital in the first place. If the hospital ultimately closes, EMS transport times lengthen, the county loses one of its largest employers, the local tax base erodes, and the population that remains skews older and sicker — raising the share of Medicare and Medicaid patients and making any successor facility even harder to sustain."),
  p("Broadband sits awkwardly across this spiral: it is the one fix that could partially substitute for lost physical access through telehealth, but it is least available exactly where the spiral has run furthest. The communities that most need a virtual bridge to specialists, mental-health providers, and monitoring are the ones least likely to have the connectivity to build it. That overlap is why rural health and rural broadband policy have converged, and why neither succeeds alone."),

  h("What to Watch", "h2"),
  p("Several indicators will show whether the trajectory bends. The first is the closure and conversion count: whether the REH pathway and any new rural funding slow the loss of inpatient and emergency access, or merely convert closures into a different label. The second is the maternity-desert map: whether obstetric-unit losses level off or continue, since this is the gap with the most immediate mortality stakes. The third is broadband buildout versus usage: not just miles of fiber laid under BEAD, but whether rural telehealth utilization actually rises and persists after the subsidies end. The fourth is the expansion gap: whether the remaining non-expansion states act, given that their rural hospitals remain the most financially exposed in the country."),

  h("Bottom Line", "h2"),
  p("Rural health access is not deteriorating along one axis but several at once — facilities, workforce, maternity care, and connectivity — and the layers reinforce each other, which is why single-program fixes keep underperforming. The data is unambiguous: 153 hospital closures since 2010 and 432 more at risk, a quarter fewer primary care physicians than urban areas, a majority of rural hospitals no longer delivering babies, and more than one in four rural residents without adequate broadband. The federal response — REH designations, BEAD, the standing pressure for Medicaid expansion — is real but uncoordinated. The communities that recover will be the ones where payment, workforce, and connectivity interventions land together rather than in isolation; the ones that do not will keep converting the abstraction of 'access' into the concrete reality of a longer, sometimes fatal, drive."),

  h("Sources", "h2"),
  sourceItem("UNC Sheps Center — Rural Hospital Closures (authoritative count)", "https://www.shepscenter.unc.edu/programs-projects/rural-health/rural-hospital-closures/"),
  sourceItem("Chartis — 2025 Rural Health State of the State (432 vulnerable; ~46% negative margin)", "https://www.chartis.com/insights/2025-rural-health-state-state"),
  sourceItem("Rural Health Information Hub — Rural Maternal Health & workforce overview", "https://www.ruralhealthinfo.org/topics/maternal-health"),
  sourceItem("Penn LDI — Over 500 U.S. hospitals have stopped delivering babies since 2010", "https://ldi.upenn.edu/our-work/research-updates/over-500-u-s-hospitals-have-stopped-delivering-babies-since-2010/"),
  sourceItem("U.S. GAO — Availability of Hospital-Based Obstetric Care in Rural Areas (GAO-23-105515)", "https://www.gao.gov/products/gao-23-105515"),
  sourceItem("Route Fifty / FCC — New broadband standard and the urban-rural gap (2024)", "https://www.route-fifty.com/digital-government/2024/04/new-fcc-broadband-standard-increases-number-underserved-households-america/395486/"),
  sourceItem("Brookings — Maximizing new federal investments in broadband for rural America (BEAD)", "https://www.brookings.edu/articles/maximizing-new-federal-investments-in-broadband-for-rural-america/"),
  sourceItem("American College of Surgeons — EMS call times in rural areas take at least 20 minutes longer (2025)", "https://www.facs.org/media-center/press-releases/2025/ems-call-times-in-rural-areas-take-at-least-20-minutes-longer-than-national-average/"),
  sourceItem("PMC — Effect of rural hospital closures on EMS response and transport times", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7080401/"),
  sourceItem("Commonwealth Fund — Why Rural Hospitals Face a Funding Crisis (payer mix, MedPAC margins)", "https://www.commonwealthfund.org/publications/explainer/2026/feb/why-rural-hospitals-face-funding-crisis-how-it-could-get-worse"),
];

const summary = "Rural health access is failing on four reinforcing fronts at once — 153 hospital closures since 2010 with 432 more at risk, a quarter fewer primary care physicians than urban areas, a majority of rural hospitals no longer delivering babies, and more than 1 in 4 rural residents without adequate broadband. This analysis quantifies each layer and assesses the federal responses.";

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
  console.log("✅ equ-003 expanded.");
}
run();
