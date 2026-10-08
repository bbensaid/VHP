// Phase 6 task 1: VBC Fundamentals Module 3 (economics pillar) — BPCI-A figures, fabricated ROI table,
// unsourced $312/$87 MSSP claim, Direct Contracting / ACO REACH present tense.
// Targets: Sanity academyModule + policyAnalysis docs, Supabase lessons fallback rows carrying the same body
// (vbc-fundamentals-module-3-economics-pillar and aco-basics), and the local source JSON files.
// Usage: node scripts/_phase6_task1_module3.mjs [--commit]
import fs from 'fs';
import { COMMIT, db, getDoc, mutate, bkSafe, append, walk, detectFmt, emit, ROOT } from './_phase6_lib.mjs';

const SRC_BPCI = 'The Lewin Group for CMS, "Bundled Payments for Care Improvement Advanced Model: Final Evaluation Report" (August 2026), cms.gov/priorities/innovation/data-and-reports/2026/bpci-adv-ar7 (net savings ~$800M; $915.8M MY4-6, $85.8M MY7-8, losses $65.7M MY1-2 and $113.7M MY3; -$743/episode MY1-2, ~-$1,000 MY3-6; SNF -$500/episode; SNF LOS -2.66/-3.50 days; institutional PAC discharge -1.45pp; similar readmissions; less favorable functional status MY7-8); CMS Innovation Insight "BPCI Advanced Final Evaluation Shows $800M in Net Savings" (2026-09-23: did not meet expansion criteria; lessons carried into TEAM, launched 2026-01-01); CMS BPCI Advanced model page (2018-10-01 to 2025-12-31; 29 inpatient + 3 outpatient episodes)';
const SRC_ROI = 'Coleman EA et al., "The Care Transitions Intervention: results of a randomized controlled trial," Arch Intern Med 2006;166:1822-8 (PubMed 17000937): 30-day rehospitalization 8.3% vs 11.9%, 180-day mean hospital costs $2,058 vs $2,546; Kangovi S et al., Health Affairs 2020 (Penn Medicine release 2020-02: IMPaCT returned $2.47 per $1 invested by Medicaid annually, $1,401,308 saved); Mathematica, "Independent Evaluation of CPC+: Final Report" (Dec 2023): fewer ED visits/hospitalizations but no net Medicare savings after enhanced payments; Mathematica, "Evaluation of Primary Care First: Third Annual Report" executive summary (2025, cms.gov pcf-third-eval-es-rpt): PCF did not reduce acute hospitalizations and increased Medicare expenditures (including model payments) by 1 percent, PY2021-2022';
const SRC_MSSP = 'CMS Fact Sheet, "Medicare Shared Savings Program ACOs: Updated Performance Year 2024 Financial and Quality Results" (2025-09-29): 476 ACOs, 75% earned performance payments; $651 gross / $245 net per capita savings; low-revenue $319 vs high-revenue $180 net per capita';
const SRC_REACH = 'CMS ACO REACH model page (REACH replaced Global and Professional Direct Contracting from 2023-01-01; ends 2026-12-31); CMS LEAD Model announcement / RFA 2026-03-31 (Long-term Enhanced ACO Design, 10-year model starting 2027-01-01, succeeding ACO REACH); Foley & Lardner, "LEAD-ing the Future of ACOs" (Jan 2026)';

const PAIRS = [
  { src: SRC_BPCI, note: 'BPCI-A "$2,100 per episode" and "$900 million net savings 2018-2023" match no CMS evaluation; "a 2024 CMS evaluation" and "strongest evidence of any CMS APM" unsupported; "maintaining or improving quality" overstated (MY7-8 functional status worse); "current" model ended 2025-12-31. Replaced with Final Evaluation Report figures.',
    old: 'BPCI Advanced, CMS’s current bundled payment program, covers 32 clinical episodes ranging from major joint replacement and cardiac surgery to pneumonia and chronic obstructive pulmonary disease hospitalizations. The program has generated the strongest evidence of any CMS alternative payment model for procedural episodes: a 2024 CMS evaluation found that BPCI Advanced participants reduced episode spending by an average of $2,100 per episode for major joint replacement while maintaining or improving quality outcomes, generating net Medicare savings of $900 million between 2018 and 2023. Critically, these savings came primarily from reductions in post-acute care spending — fewer days in skilled nursing facilities and more patients discharged directly home with home health services — rather than from reductions in the procedural care itself, confirming the bundled payment hypothesis that the primary driver of unnecessary cost in high-volume procedures is the post-acute care tail, not the procedure.',
    new: 'BPCI Advanced, CMS’s voluntary bundled payment model, ran from October 1, 2018 through December 31, 2025, with 29 inpatient and 3 outpatient clinical episode categories at launch, ranging from major joint replacement and cardiac procedures to pneumonia and chronic obstructive pulmonary disease hospitalizations. Its final evaluation (The Lewin Group for CMS, August 2026) found that participants reduced Medicare episode payments in every model year — by $743 per episode on average in Model Years 1 and 2 and by about $1,000 per episode in Model Years 3 through 6 — and that the model produced about $800 million in net Medicare savings across its eight model years: net losses in Model Years 1–3, when reconciliation payments to participants exceeded the spending reductions, were outweighed by net savings once CMS redesigned target pricing in Model Year 4 (2021). Readmission rates were similar to the comparison group, although patients in Model Years 7–8 reported less favorable changes in functional status. Critically, the savings came primarily from post-acute care — fewer patients discharged to skilled nursing or inpatient rehabilitation facilities, skilled nursing stays about three days shorter, and skilled nursing payments about $500 lower per episode — rather than from reductions in the procedural care itself, confirming the bundled payment hypothesis that the primary driver of unnecessary cost in high-volume episodes is the post-acute care tail, not the procedure. CMS concluded that BPCI Advanced did not meet its criteria for expansion, and carried its lessons into the mandatory Transforming Episode Accountability Model (TEAM), which began January 1, 2026.' },
  { src: SRC_REACH, note: 'Direct Contracting ended 2022 (replaced by ACO REACH 2023); ACO REACH ends 2026-12-31, LEAD follows 2027.',
    old: 'Two-sided arrangements (MSSP ENHANCED Track, Direct Contracting, ACO REACH) offer',
    new: 'Two-sided arrangements (the MSSP ENHANCED Track, and CMMI’s ACO REACH Model — the 2023 successor to Global and Professional Direct Contracting, which runs through December 31, 2026 and is to be succeeded by the Long-term Enhanced ACO Design (LEAD) Model from January 1, 2027) offer' },
  { src: SRC_MSSP, note: '"$312 per beneficiary vs $87 investment, 3.6:1, fifth-year MSSP ACOs" matches no CMS/MedPAC publication. Replaced with CMS PY2024 per-capita results.',
    old: 'The financial literature on mature ACO performance consistently shows that organizations reaching their fifth year of MSSP participation generate shared savings payments averaging $312 per attributed beneficiary annually, compared to an average investment cost of $87 per beneficiary in care management infrastructure — a return on investment of approximately 3.6 to 1.',
    new: 'CMS’s own results show what is achievable at scale: in Performance Year 2024, Shared Savings Program ACOs generated gross savings of $651 per assigned beneficiary (shared between ACOs and Medicare) and net Medicare savings of $245, and 75% of the 476 participating ACOs earned performance payments. CMS publishes no standard figure for what ACOs spend on care management infrastructure, so the return on that investment has to be modeled from each organization’s own cost base.' },
  { src: SRC_MSSP, note: 'Same unsourced $312/$87 3.6:1 claim restated in the summary.',
    old: 'The economic case for making these investments nonetheless is clear in the mature ACO data: organizations in their fifth year of MSSP participation generate average shared savings payments of $312 per beneficiary at an investment cost of $87 per beneficiary, a 3.6-to-1 return that compounds as the care management infrastructure matures and the organization’s ability to identify and target high-risk patients improves.',
    new: 'The economic case for making these investments nonetheless is visible in CMS’s own results: in Performance Year 2024, Shared Savings Program ACOs generated gross savings of $651 per assigned beneficiary and net Medicare savings of $245, with physician-led, low-revenue ACOs outperforming hospital-led ones ($319 versus $180 net per beneficiary) — returns that depend on care management infrastructure maturing and on the organization’s ability to identify and target high-risk patients.' },
  { src: SRC_REACH, note: 'Recommending ACO REACH entry is stale: REACH ends 2026-12-31; LEAD is the successor from 2027.',
    old: 'a formal analysis of ENHANCED track or ACO REACH participation is warranted.',
    new: 'a formal analysis of ENHANCED track participation, or of CMMI’s LEAD Model (the ACO REACH successor beginning January 1, 2027), is warranted.' },
  { src: SRC_ROI, note: 'Caveat paragraph described the fabricated table as "population-level averages from mature ACOs"; rewritten to the verified evidence.',
    old: 'The ROI data in the table above carries an important caveat: these are population-level averages from mature ACOs that have already built the data infrastructure to identify high-risk patients, target interventions appropriately, and measure outcomes accurately.',
    new: 'The evidence in the table above carries an important lesson: the interventions that paid for themselves in trials were targeted ones — transition coaching for patients leaving the hospital, community health workers for patients with documented unmet social needs — while broad primary care payment models that spread enhanced payments across whole practice panels reduced hospital use without producing net Medicare savings.' },
  { src: SRC_ROI, note: '"Highest absolute savings per dollar" came from the fabricated table; comparative claim removed.',
    old: 'Care coordinators assigned to high-risk patients generate the highest absolute savings per dollar invested, but their effectiveness depends entirely on a functioning risk stratification system',
    new: 'Care coordination works when it is aimed at the right patients: its effectiveness depends on a functioning risk stratification system' },
  { src: SRC_ROI, note: '"4.6x ROI" for 72-hour follow-up came from the fabricated table; replaced with the Coleman RCT result.',
    old: 'Post-discharge follow-up programs have the highest ROI ratio of any single intervention (4.6x) because the cost of a 72-hour phone call is minimal relative to the cost of a readmission, and the evidence that timely follow-up reduces readmissions is among the strongest in care management research.',
    new: 'Post-discharge transition support has some of the strongest trial evidence in care management: in Coleman’s randomized trial of 750 older adults, transition coaching cut 30-day rehospitalizations from 11.9% to 8.3% and lowered six-month hospital costs, because the cost of coaching is small relative to the cost of a readmission.' },
  { src: SRC_ROI, note: '"$1,260 net benefit" for CHWs came from the fabricated table; replaced with the IMPaCT RCT economic result.',
    old: 'Community health worker integration produces the largest absolute savings per patient ($1,260 net benefit annually) and is the intervention most directly connected to social determinants of health — addressing food insecurity, housing instability, and transportation barriers that drive utilization patterns that clinical care alone cannot change.',
    new: 'Community health worker programs are the intervention most directly connected to social determinants of health — addressing food insecurity, housing instability, and transportation barriers that drive utilization patterns that clinical care alone cannot change — and Penn’s IMPaCT program returned $2.47 to Medicaid for every dollar invested, within a single fiscal year.' },
  { src: SRC_ROI, note: '"$580 investment / $2,140 savings" for advanced primary care attributed to a PCF evaluation that actually found a 1% spending increase; replaced with CPC+/PCF findings.',
    old: 'Advanced primary care transformation has the highest total annual investment per patient ($580) but also the highest total annual savings ($2,140), making it the most comprehensive single intervention for organizations ready to redesign their primary care delivery model rather than simply add discrete programs to an unchanged clinical workflow.',
    new: 'Advanced primary care transformation is the most comprehensive intervention, but the federal evidence is sobering: neither CPC+ nor Primary Care First produced net Medicare savings once their enhanced payments were counted, and CPC+ practices with incentives to control total cost of care, such as Shared Savings Program participants, did better at lowering costs — which is why primary care investment pays off most reliably inside a total-cost-of-care arrangement rather than as a stand-alone add-on.' },
  { src: SRC_ROI, note: 'Action item referred to "ROI data" from the replaced table.',
    old: 'Review the ROI data from the care management intervention table in this module',
    new: 'Review the evidence in the care management intervention table in this module' },
  { src: SRC_ROI, note: 'Learning objective promised ROI calculation for six intervention categories "using CMS benchmark data" that does not exist.',
    old: 'Calculate the return on investment for six categories of care management intervention using CMS benchmark data.',
    new: 'Weigh the published trial and CMS evaluation evidence on care management interventions against what they cost to build.' },
];

const OLD_TITLE = 'Return on Investment Analysis: Care Management Interventions in Mature ACOs, CMS Data 2024';
const NEW_TITLE = 'Care Management Interventions: What the Published Evaluations Found';
const NEW_ROWS = [
  { Intervention: 'Transition coaching after discharge (Care Transitions Intervention)', Study: 'Coleman et al., Archives of Internal Medicine, 2006 — randomized trial, 750 adults aged 65+', Finding: '30-day rehospitalization 8.3% vs 11.9% for controls; mean hospital costs at 180 days $2,058 vs $2,546', 'Financial result': 'About $488 lower hospital cost per patient over 180 days (program cost not netted out)' },
  { Intervention: 'Community health workers (Penn IMPaCT)', Study: 'Kangovi et al., Health Affairs, 2020 — economic analysis of a randomized trial', Finding: 'Fewer hospitalizations among Medicaid patients; about $1.4 million saved to Medicaid', 'Financial result': '$2.47 returned to Medicaid for every $1 invested, within one fiscal year' },
  { Intervention: 'Enhanced primary care payments (CPC+)', Study: 'Mathematica, CPC+ Final Evaluation Report, December 2023 — five model years', Finding: 'Fewer ED visits and acute hospitalizations; lower acute inpatient spending', 'Financial result': 'No net Medicare savings once enhanced CPC+ payments are counted' },
  { Intervention: 'Primary Care First', Study: 'Mathematica, PCF Third Annual Report, 2025 — performance years 2021–2022', Finding: 'No reduction in acute hospitalizations', 'Financial result': 'Medicare expenditures up 1% including model payments — a net cost, not savings' },
];
const isTable = v => v && typeof v === 'object' && !Array.isArray(v) && v._type === 'code' && v.title === OLD_TITLE;
const tableHook = v => isTable(v) ? { ...v, title: NEW_TITLE, code: typeof v.code === 'string' ? JSON.stringify(NEW_ROWS, null, 2) : NEW_ROWS } : undefined;
const TABLE_NOTE = 'ROI table cited six "evaluations" (MSSP Benchmark Performance Data 2024, CMMI Bundled Payment Evaluation 2024, MSSP Quality and Financial Report 2024, CMS Innovation Center Equity-Focused ACO Evaluation 2025, NCQA Health Plan Accreditation VBC Data 2025, CMS Primary Care First Model Evaluation 2025) that publish no such per-intervention ROI figures; the PCF evaluation found a net spending increase. All six fabricated rows replaced by four verified rows (same code-table block, new columns).';

const apply = v => { const counts = {}; const out = walk(v, PAIRS.map(p => [p.old, p.new]), tableHook, counts); return { out, counts }; };
const report = (label, counts) => console.log(label, 'table:', counts.__hook || 0, 'pairs:', PAIRS.map((p, i) => `${i}:${counts[p.old] || 0}`).join(' '));
const logPairs = (target, counts, ok, bk) => {
  PAIRS.forEach(p => { if (counts[p.old]) append({ target, old: p.old, new: p.new, sources: p.src, status: ok ? 'FIXED' : 'LEFT', note: `${p.note} ${counts[p.old]} occurrence(s). Backup: ${bk}; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}.` }); });
  if (counts.__hook) append({ target: `${target} code table "${OLD_TITLE}"`, old: 'six fabricated ROI rows', new: JSON.stringify(NEW_ROWS), sources: SRC_ROI, status: ok ? 'FIXED' : 'LEFT', note: `${TABLE_NOTE} ${counts.__hook} table(s). Backup: ${bk}.` });
};
const residue = s => ['$2,100 per episode', '$312 per', 'Direct Contracting, ACO REACH', 'MSSP Benchmark Performance Data', 'CMS’s current bundled', "CMS's current bundled"].filter(x => s.includes(x));

// ---- Sanity
for (const id of ['academyModule-vbc-fundamentals-module-3-economics-pillar', 'vbc-fundamentals-module-3-economics-pillar']) {
  const doc = await getDoc(id);
  const { out: body, counts: cb } = apply(doc.body);
  const lo = doc.learningObjectives ? apply(doc.learningObjectives) : null;
  const counts = { ...cb }; if (lo) for (const [k, v] of Object.entries(lo.counts)) counts[k] = (counts[k] || 0) + v;
  report(`SANITY ${doc._type} ${id}`, counts);
  const sets = {};
  doc.body.forEach((b, i) => { if (JSON.stringify(b) !== JSON.stringify(body[i])) sets[`body[_key=="${b._key}"]`] = body[i]; });
  if (lo && JSON.stringify(lo.out) !== JSON.stringify(doc.learningObjectives)) sets.learningObjectives = lo.out;
  console.log('  patch keys:', Object.keys(sets).join(', '));
  if (!COMMIT) continue;
  const bk = bkSafe(`sanity-${id}.json`, JSON.stringify(doc, null, 2));
  await mutate([{ patch: { id, ifRevisionID: doc._rev, set: sets } }]);
  const back = await getDoc(id);
  const ok = Object.entries(sets).every(([k, v]) => k === 'learningObjectives' ? JSON.stringify(back.learningObjectives) === JSON.stringify(v) : JSON.stringify(back.body.find(b => b._key === v._key)) === JSON.stringify(v)) && residue(JSON.stringify(back)).length === 0;
  console.log('  verify', ok, residue(JSON.stringify(back)));
  logPairs(`sanity ${doc._type} ${id}`, counts, ok, bk);
}

// ---- Supabase fallback rows
const { data: rows, error } = await db.from('lessons').select('*').in('slug', ['vbc-fundamentals-module-3-economics-pillar', 'aco-basics']);
if (error) throw error;
for (const row of rows) {
  const { out: cbNew, counts } = apply(row.content_blocks);
  report(`SUPABASE lessons ${row.id} ${row.slug}`, counts);
  if (!COMMIT) continue;
  const bk = bkSafe(`supabase-lesson-${row.id}.json`, JSON.stringify(row, null, 2));
  const { error: ue } = await db.from('lessons').update({ content_blocks: cbNew }).eq('id', row.id);
  if (ue) throw ue;
  const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single();
  const ok = JSON.stringify(r2.content_blocks) === JSON.stringify(cbNew) && residue(JSON.stringify(r2.content_blocks)).length === 0;
  console.log('  verify', ok);
  logPairs(`supabase lessons ${row.id} (${row.slug}) content_blocks`, counts, ok, bk);
}

// ---- Local sources
for (const f of ['frontend/content/courses_tier1.json', 'frontend/content/course_value_based_care.json', 'frontend/sanity/content/academy/vbc_economics.json', 'frontend/sanity/temp_holder/VBC_Economics.json']) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8');
  const fmt = detectFmt(t); if (!fmt) throw new Error('format not reproducible: ' + f);
  const { out, counts } = apply(JSON.parse(t));
  const nt = emit(out, fmt);
  report(`LOCAL ${f}`, counts);
  console.log('  residue after:', residue(JSON.stringify(out)));
  if (!COMMIT || nt === t) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8');
  let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  logPairs(`local ${f}`, counts, ok, bk);
}
