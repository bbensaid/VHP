// Phase 8b source-integrity corrections (Medicaid 101, Medicaid Managed Care Operations, Medicare Fundamentals,
// Population Health Management, Revenue Cycle Management, Transformation Leadership, Value-Based Care courses).
// Same op shape as _phase7b_ops.mjs: each op targets one Sanity academyModule body block by _key; `pairs` are exact
// substring replacements (old must occur exactly once in the block, or already be replaced); `statsByIndex` sets
// statGrid stat fields. Applied by _phase8b_apply.mjs; ledger docs/audits/phase8b_sources_2026-10.jsonl.

const CMS24 = 'CMS, Medicaid Managed Care Enrollment and Program Characteristics, 2024 (medicaid.gov PDF, fetched 2026-10-09): 73,670,122 (84.8%) in any managed care; 67,932,939 (78.2%) in comprehensive MCOs incl. PACE';
const KFF10 = 'KFF, 10 Things to Know About Medicaid Managed Care (fetched 2026-10-09): 42 states incl. DC contract with comprehensive MCOs as of July 2025; 78% of enrollees in MCOs July 2024';

export const OPS = [
  // ---------------- medicaid-managed-care-organizations
  { id: 'medicaid-managed-care-organizations', key: 's1p3', verdict: 'UNVERIFIABLE', sources: KFF10,
    claim: 'comprehensive risk-based managed care is now the primary delivery system in nearly three-quarters of states',
    pairs: [['and comprehensive risk-based managed care is now the primary delivery system in nearly three-quarters of states.',
             'and as of July 2025, 42 states (including DC) contracted with comprehensive, risk-based managed care plans.']] },
  { id: 'medicaid-managed-care-organizations', key: 's3sg1', verdict: 'FABRICATED', sources: `${CMS24}; ${KFF10}; MACPAC types-of-managed-care page has no 1995 figure`,
    claim: 'stat: ~70% in comprehensive MCOs "up from ~15% in 1995 (MACPAC)"; ~3 of 4 states use MCOs as primary model (MACPAC)',
    statsByIndex: {
      1: { value: '~78%', label: 'in Comprehensive MCOs', context: 'Of all Medicaid enrollees, July 2024 (CMS managed care enrollment report)' },
      2: { value: '42', label: 'States (incl. DC) Contracting with Comprehensive MCOs', context: 'As of July 2025 (KFF)' } } },
  { id: 'medicaid-managed-care-organizations', key: 'tw', verdict: 'FABRICATED', sources: CMS24, claim: '~70% are in comprehensive risk-based MCOs',
    pairs: [['and ~70% are in comprehensive risk-based MCOs.', 'and about 78% are in comprehensive risk-based MCOs.']] },
  { id: 'medicaid-managed-care-organizations', key: 'src3', verdict: 'FABRICATED', sources: 'MACPAC types-of-managed-care-arrangements page (fetched): gives 68% for 2016, no ~70% growth series',
    claim: 'source annotation: "growth to ~70%"',
    pairs: [['limited-benefit plans; growth to ~70%', 'limited-benefit plans']] },
  { id: 'medicaid-managed-care-organizations', key: 'src6', verdict: 'UPDATED', sources: KFF10, claim: 'source list lacks the source for the 42-state / 78% figures',
    pairs: [['[6] A Look at Medicaid Enrollment and Finances of the Five Largest Medicaid Managed Care Plans — https://www.kff.org/medicaid/a-look-at-medicaid-enrollment-and-finances-of-the-five-largest-medicaid-managed-care-plans/ — scale of large private Medicaid plans',
             '[6] 10 Things to Know About Medicaid Managed Care (KFF) — https://www.kff.org/medicaid/10-things-to-know-about-medicaid-managed-care/ — 42 states (incl. DC) contract with comprehensive MCOs (July 2025); five largest parent firms hold 47% of MCO enrollment']] },

  // ---------------- medicaid-1115-waivers
  ...(() => { const S = 'KFF Medicaid Waiver Tracker and its state-indicator page (fetched 2026-10-09): "Nearly all states have at least one active Section 1115 waiver and some states have multiple" — no 64/47 count published; search found no source for it';
    const C = 'roughly 64 approved waivers spanning about 47 states as of 2024';
    return [
      { id: 'medicaid-1115-waivers', key: 's5p3', verdict: 'UNVERIFIABLE', sources: S, claim: C,
        pairs: [['Across the country, 1115 demonstrations are now widespread: there were roughly 64 approved waivers spanning about 47 states as of 2024. That near-universal adoption',
                 'Across the country, 1115 demonstrations are now widespread: nearly every state has at least one active Section 1115 waiver, and some have several. That near-universal adoption']] },
      { id: 'medicaid-1115-waivers', key: 'tw', verdict: 'UNVERIFIABLE', sources: S, claim: C,
        pairs: [['1115 waivers are nearly universal (roughly 64 approved waivers across about 47 states in 2024),', '1115 waivers are nearly universal (nearly every state has at least one active waiver),']] },
      { id: 'medicaid-1115-waivers', key: 'src6', verdict: 'UNVERIFIABLE', sources: S, claim: 'source annotation: ~64 approved waivers across ~47 states',
        pairs: [['— ~64 approved waivers across ~47 states; Texas and New York DSRIP examples', '— nearly all states have at least one active Section 1115 waiver']] },
    ]; })(),

  // ---------------- medicaid-hcbs-waivers
  ...(() => { const W = 'KFF "Key Questions About Medicaid HCBS Waiver Waiting Lists" (fetched): over 707,000 on waiting lists in 2017 (+8% over 2016), I/DD ~two-thirds; KFF "A Look at Waiting Lists ... 2016 to 2024" (fetched): over 710,000 in 2024 (waiting + interest lists), I/DD 73%';
    const L = 'Mathematica/CMS Medicaid LTSS Annual Expenditures Report FFY 2020: HCBS $124.6B (62.5%), institutional $74.8B (37.5%); 1999 baseline 27% HCBS per U.S. Senate HELP Committee Olmstead report (2013); Disability Justice page (fetched) contains no spending figures';
    return [
      { id: 'medicaid-hcbs-waivers', key: 's4p2', verdict: 'FABRICATED', sources: L, claim: 'By 2020 around 63 percent of LTSS spending went to HCBS and only about 38 percent to institutions (sums to 101%)',
        pairs: [['around 63 percent of LTSS spending went to HCBS and only about 38 percent to institutions.', '62.5 percent of LTSS spending went to HCBS and 37.5 percent to institutions.']] },
      { id: 'medicaid-hcbs-waivers', key: 's4sg1', verdict: 'FABRICATED', sources: L, claim: 'stat source attributed to "KFF / Disability Justice"; 73% → 38%',
        statsByIndex: { 2: { value: '27% → 62.5%', context: 'Shift from 1999 to FY2020 (Senate HELP Committee; CMS/Mathematica)' },
                        3: { value: '73% → 37.5%', context: 'Declined over the same period (CMS/Mathematica FY2020 report)' } } },
      { id: 'medicaid-hcbs-waivers', key: 'tw', verdict: 'FABRICATED', sources: `${L}; ${W}`, claim: 'roughly 63% by 2020; roughly 700,000 on waiting lists, about two-thirds I/DD',
        pairs: [['to roughly 63% by 2020,', 'to 62.5% by 2020,'],
                ['roughly 700,000 people sit on HCBS waiting lists, about two-thirds of them people with intellectual/developmental disabilities.', 'more than 700,000 people sit on HCBS waiting lists, nearly three-quarters of them people with intellectual/developmental disabilities.']] },
      { id: 'medicaid-hcbs-waivers', key: 's5p2', verdict: 'FABRICATED', sources: W, claim: 'Roughly 700,000 on waiting lists in 2016 and about 710,000 in 2023; I/DD about two-thirds',
        pairs: [['Roughly 700,000 people were on HCBS waiver waiting lists in 2016, and about 710,000 in 2023 —', 'More than 707,000 people were on HCBS waiver waiting lists in 2017, and more than 710,000 were on waiting or interest lists in 2024 —'],
                ['People with intellectual and developmental disabilities (I/DD) make up about two-thirds of those waiting.', 'People with intellectual and developmental disabilities (I/DD) make up most of those waiting — about two-thirds in 2017 and 73 percent in 2024.']] },
      { id: 'medicaid-hcbs-waivers', key: 'src4', verdict: 'FABRICATED', sources: L, claim: 'source: Disability Justice page cited for 27%→63% (page has no such figures)',
        pairs: [['[4] Olmstead v. L.C. — Disability Justice — https://disabilityjustice.org/olmstead-v-lc/ — HCBS share of LTSS spending rose from 27% (1999) to 63% (2020)',
                 '[4] Medicaid Long Term Services and Supports Annual Expenditures Report, FFY 2020 (Mathematica for CMS) — https://www.mathematica.org/publications/medicaid-long-term-services-and-supports-annual-expenditures-report-federal-fiscal-year-2020 — HCBS 62.5% / institutional 37.5% of $199.4B LTSS spending in FY2020']] },
      { id: 'medicaid-hcbs-waivers', key: 'src5', verdict: 'FABRICATED', sources: W, claim: 'source annotation: ~700,000 on waiting lists',
        pairs: [['— ~700,000 on waiting lists; states cap waiver slots', '— over 710,000 on waiting or interest lists in 2024; I/DD 73%; states cap waiver slots']] },
      { id: 'medicaid-hcbs-waivers', key: 'src6', verdict: 'UPDATED', sources: W, claim: 'source annotation: I/DD ~two-thirds (year missing)',
        pairs: [['— people with I/DD ~two-thirds of waiting-list enrollment', '— over 707,000 waiting in 2017; people with I/DD ~two-thirds of waiting-list enrollment']] },
    ]; })(),

  // ---------------- medicaid-quality-measures
  ...(() => { const H = 'NCQA HEDIS page (fetched 2026-10-09): "HEDIS includes more than 90 measures across 6 domains of care"; NCQA HEDIS measures page: "More than 235 million people are enrolled in plans that report HEDIS results"';
    const A = 'No source found for "up to 40 states use the HEDIS Audit" (NCQA HEDIS pages, NCQA Medicaid nonduplication slides, web search); NCQA slides (wpcdn.ncqa.org, fetched) state states use the plan-paid HEDIS audit for performance measure validation under nonduplication';
    return [
      { id: 'medicaid-quality-measures', key: 's2p2', verdict: 'UPDATED', sources: H, claim: 'HEDIS consists of more than 70 measures',
        pairs: [['HEDIS consists of more than 70 measures spanning the full spectrum of care — prevention, acute care, and chronic care.', 'HEDIS includes more than 90 measures across six domains of care, spanning prevention, acute care, and chronic care.']] },
      { id: 'medicaid-quality-measures', key: 's2sg1', verdict: 'UNVERIFIABLE', sources: `${H}; ${A}`, claim: 'stats: 70+ HEDIS measures; "Up to 40 states use HEDIS Compliance Audits (NCQA)"',
        statsByIndex: { 0: { value: '90+', context: 'Across six domains of care (NCQA)' },
                        3: { value: '235M+', label: 'People in Plans Reporting HEDIS', context: 'Enrolled in health plans that report HEDIS results (NCQA)' } } },
      { id: 'medicaid-quality-measures', key: 's3cmp1', verdict: 'UPDATED', sources: H, claim: '70+ process and outcome measures', pairs: [['70+ process and outcome measures', '90+ measures across six domains']] },
      { id: 'medicaid-quality-measures', key: 's5p2', verdict: 'UNVERIFIABLE', sources: A, claim: 'Up to 40 states use the HEDIS Audit for exactly this purpose.',
        pairs: [['Up to 40 states use the HEDIS Audit for exactly this purpose.', 'Under the federal "nonduplication" option, many states let the plan-funded HEDIS Audit satisfy the external review\'s performance-measure validation requirement.']] },
      { id: 'medicaid-quality-measures', key: 'tw', verdict: 'UPDATED', sources: H, claim: 'over 70 process and outcome measures',
        pairs: [['over 70 process and outcome measures spanning prevention, acute, and chronic care.', 'more than 90 measures across six domains spanning prevention, acute, and chronic care.']] },
      { id: 'medicaid-quality-measures', key: 'src3', verdict: 'UNVERIFIABLE', sources: `${H}; ${A}`, claim: 'source annotation: 70+ measures; HEDIS Compliance Audit used by up to 40 states',
        pairs: [['— HEDIS developed by NCQA; 70+ measures; HEDIS Compliance Audit used by up to 40 states', '— HEDIS developed by NCQA; more than 90 measures across 6 domains; 235M+ people in plans reporting HEDIS']] },
    ]; })(),

  // ================= Medicaid Managed Care Operations =================
  // ---------------- contract-requirements
  ...(() => { const E = 'eCFR 42 CFR 438.68(b)(1) (fetched 2026-10-09): "a State must develop a quantitative network adequacy standard, other than appointment wait times" — time-and-distance is no longer mandated (2020 rule); 438.66(e) MCPAR includes a summary of grievances, appeals and state fair hearings; no "since 2022" separate annual appeals report found';
    return [
      { id: 'contract-requirements', key: 's2p1', verdict: 'FABRICATED', sources: E, claim: 'Under 438.68 states must develop and publish quantitative time-and-distance standards',
        pairs: [['states must develop and publish quantitative time-and-distance standards for a defined set of provider types', 'states must develop and publish a quantitative network adequacy standard (other than appointment wait times — often time-and-distance or provider-to-enrollee ratios) for a defined set of provider types'],
                ['so adequacy is now judged by both geography and timeliness.', 'so adequacy is now judged by both the state’s quantitative standards and timeliness.']] },
      { id: 'contract-requirements', key: 's4p2', verdict: 'UNVERIFIABLE', sources: E, claim: 'since 2022 states must report certain appeals and grievance data to CMS annually',
        pairs: [['and since 2022 states must report certain appeals and grievance data to CMS annually, so the state can spot', 'and states must summarize each plan’s appeals, grievances, and state fair hearings for CMS in the annual MCPAR, so the state can spot']] },
      { id: 'contract-requirements', key: 'tk', verdict: 'FABRICATED', sources: E, claim: 'takeaways: 438.68 time-and-distance standards; appeals data reported to CMS annually since 2022',
        pairs: [['include quantitative time-and-distance standards for specified provider types', 'include quantitative standards (such as time-and-distance or provider ratios) for specified provider types'],
                ['(reported to CMS annually since 2022)', '(summarized for CMS in the annual MCPAR)']] },
    ]; })(),

  // ---------------- monitoring-oversight-eqro
  ...(() => { const E = 'eCFR 42 CFR 438.358(b)(1) (fetched 2026-10-09): four mandatory activities — PIP validation, performance measure validation, compliance review within the previous 3 years, and validation of network adequacy; (c) optional: encounter data validation, consumer/provider surveys, extra measures/PIPs, focused studies, QRS assistance, evaluations. MACPAC accountability page: the 438.66 report is the annual managed care program report (MCPAR); 438.74 MLR summary reports; 438.207(d) state assurance of network adequacy';
    return [
      { id: 'monitoring-oversight-eqro', key: 's3p1', verdict: 'FABRICATED', sources: E, claim: 'mandatory EQR activities listed as three (network adequacy validation omitted / later called optional)',
        pairs: [['A third is the validation of performance improvement projects (PIPs) that are part of the plan’s QAPI program.', 'A third is the validation of performance improvement projects (PIPs) that are part of the plan’s QAPI program. A fourth, added by the 2016 rule, is validation of each plan’s network adequacy against the state’s §438.68 standards.']] },
      { id: 'monitoring-oversight-eqro', key: 's3p2', verdict: 'FABRICATED', sources: E, claim: 'optional activities ... including validation related to network adequacy (it is mandatory)',
        pairs: [['Beyond the mandatory activities, federal rules also define optional activities states may add, and the 2024 final rule and updated EQR protocols expanded the toolkit, including validation related to network adequacy.', 'Beyond the mandatory activities, federal rules also define optional activities states may add — such as validating encounter data, administering or validating consumer and provider surveys, and conducting focused quality studies — and the 2024 final rule added EQRO help with the new managed care quality ratings.']] },
      { id: 'monitoring-oversight-eqro', key: 's3steps1', verdict: 'FABRICATED', sources: E, claim: 'step: optional activities "such as validation related to network adequacy"',
        pairs: [['States may add further reviews, such as validation related to network adequacy, to tailor oversight.', 'Validate each plan’s network against the state’s §438.68 standards (mandatory); states may add optional reviews such as encounter data validation, consumer surveys, or focused quality studies.'],
                ['(Plus optional activities)', 'Validation of network adequacy (plus optional activities)']] },
      { id: 'monitoring-oversight-eqro', key: 's5p1', verdict: 'FABRICATED', sources: E, claim: 'report names: "Annual Program Oversight Report", "Medical Loss Ratio Summary Report", "Access Standards Report"',
        pairs: [['the Annual Program Oversight Report under 42 CFR § 438.66(e), the Medical Loss Ratio Summary Report, and the Access Standards Report', 'the Managed Care Program Annual Report (MCPAR) under 42 CFR § 438.66(e), the medical loss ratio summary reports under § 438.74, and the network adequacy assurance under § 438.207(d)']] },
      { id: 'monitoring-oversight-eqro', key: 'tk', verdict: 'FABRICATED', sources: E, claim: 'takeaways: network-adequacy validation optional; report names',
        pairs: [['and validation of performance improvement projects (PIPs); states may add optional activities such as network-adequacy validation.', 'validation of performance improvement projects (PIPs), and validation of network adequacy; states may add optional activities such as encounter data validation or consumer surveys.'],
                ['(Annual Program Oversight Report under 438.66(e), MLR Summary Report, Access Standards Report)', '(the Managed Care Program Annual Report under 438.66(e), MLR summary reports under 438.74, and network adequacy assurances under 438.207(d))']] },
      { id: 'monitoring-oversight-eqro', key: 'src6', verdict: 'FABRICATED', sources: E, claim: 'source annotation: report names',
        pairs: [['(438.66(e) Annual Program Oversight Report, MLR Summary, Access Standards Report)', '(the 438.66(e) annual managed care program report)']] },
    ]; })(),

  // ---------------- risk-adjustment-medicaid
  ...(() => { const E = 'PMC10871574 "Updating the Chronic Illness and Disability Payment System" (Medical Care, 2024): "Of the 38 Medicaid programs that risk adjust ..., 33 use CDPS" (search-confirmed); IMI CDPS fact sheet (fetched PDF) describes CDPS+Rx version 7.0 but does not state the 33/38 count';
    return [
      { id: 'risk-adjustment-medicaid', key: 's1sg1', verdict: 'MISATTRIBUTED', sources: E, claim: 'stat "33 of 38" attributed to Institute for Medicaid Innovation fact sheet',
        pairs: [['(Institute for Medicaid Innovation)', '(Medical Care, 2024 — UC San Diego and the Institute for Medicaid Innovation)']] },
      { id: 'risk-adjustment-medicaid', key: 'src2', verdict: 'MISATTRIBUTED', sources: E, claim: 'source annotation: IMI fact sheet says 33 of 38 use CDPS',
        pairs: [['— 33 of 38 risk-adjusting Medicaid programs use CDPS; how risk-adjusted capitation works.', '— the CDPS+Rx version 7.0 update built on national Medicaid managed care data; how risk-adjusted capitation works.']] },
      { id: 'risk-adjustment-medicaid', key: 'src3', verdict: 'MISATTRIBUTED', sources: E, claim: 'source annotation missing the 33/38 figure',
        pairs: [['— CDPS+Rx version update using national Medicaid managed care data;', '— 33 of the 38 Medicaid programs that risk-adjust MCO payments use CDPS; CDPS+Rx version update using national Medicaid managed care data;']] },
    ]; })(),

  // ---------------- covered-benefits-carveins-carveouts
  ...(() => { const E = 'CHCS Better Care Playbook BH-integration roundup 2024 (fetched): "A significant majority of states with Medicaid managed care now carve-in services for at least some of their Medicaid enrollees" — no 23/17, "quadrupling", or 13->9 figures (23/17 traces to an older Health Affairs Forefront piece); KFF 10 Things (fetched): no pharmacy carve-in counts, frequently carved out = dental, NEMT, behavioral health; over two-thirds of MCO enrollees also in a limited-benefit plan and/or FFS in 2023; KFF state indicator (fetched): pharmacy carved in 35 / out 4 as of July 2019; KFF budget survey: six states (CA, MO, ND, TN, WV, WI) carved pharmacy out as of July 2022; NY carved out April 2023 (NYRx)';
    return [
      { id: 'covered-benefits-carveins-carveouts', key: 's1sg1', verdict: 'UNVERIFIABLE', sources: E, claim: 'stats: 23 states carve in BH (+17 carve-up) "(industry analyses)"; 28 states + DC carve in pharmacy vs 7 (KFF / AHIP)',
        statsByIndex: {
          0: { value: '2/3+', label: 'MCO Enrollees Also Using Carved-Out Care', context: 'In 2023, over two-thirds of comprehensive MCO enrollees were also in at least one limited-benefit plan and/or received fee-for-service care outside their MCO (KFF)' },
          1: { value: '7 states', label: 'Carving Pharmacy Out of MCOs', context: 'California, Missouri, North Dakota, Tennessee, West Virginia, and Wisconsin as of July 2022 (KFF), plus New York from April 2023' } } },
      { id: 'covered-benefits-carveins-carveouts', key: 's3p1', verdict: 'UNVERIFIABLE', sources: E, claim: 'BH carve-ins "more than quadrupling in a single recent year"; ~23 states carve in, 17 carve-up; horizontal carve-outs 13 (2011) -> 9',
        pairs: [['The shift in behavioral health is striking: the number of states with behavioral health carve-in arrangements grew rapidly, more than quadrupling in a single recent year, and today roughly 23 states carve behavioral health into their MCOs, with another 17 using mixed "carve-up" approaches. Meanwhile, primary "horizontal" behavioral health carve-outs to separate care-management organizations have declined — from about 13 states in 2011 to roughly 9 — driven by a clear policy preference for integration.',
                 'The shift in behavioral health is striking: over the last decade many states moved from carving behavioral health out to carving it in, and a significant majority of states with Medicaid managed care now carve in behavioral health services for at least some enrollees, while others use mixed "carve-up" approaches that carve in some populations or services and carve out others — driven by a clear policy preference for integration.']] },
      { id: 'covered-benefits-carveins-carveouts', key: 's3p2', verdict: 'UNVERIFIABLE', sources: E, claim: '28 states and DC carve pharmacy in vs 7 carve out',
        pairs: [['Pharmacy shows the same integrationist tilt: 28 states and the District of Columbia carve pharmacy into their MCOs, compared with just 7 that carve prescription drugs out.', 'Pharmacy is the notable exception: most MCO states still carve pharmacy in, but a handful — including California (2022) and New York (2023) — have carved prescription drugs out of MCO contracts to centralize purchasing.']] },
      { id: 'covered-benefits-carveins-carveouts', key: 'tk', verdict: 'UNVERIFIABLE', sources: E, claim: 'takeaway: 23 states / 17 carve-up / 13->9 / 28+DC vs 7',
        pairs: [['about 23 states now carve in behavioral health (with 17 mixed "carve-up" approaches), horizontal BH carve-outs fell from ~13 states in 2011 to ~9, and 28 states plus DC carve in pharmacy versus 7 that carve it out.', 'a significant majority of managed care states now carve in behavioral health for at least some enrollees (others use mixed "carve-up" approaches), though pharmacy has moved the other way in a few states such as California and New York.']] },
      { id: 'covered-benefits-carveins-carveouts', key: 'src2', verdict: 'UNVERIFIABLE', sources: E, claim: 'source annotation: KFF gives pharmacy carve-in counts (28 + DC vs 7)',
        pairs: [['and pharmacy carve-in counts (28 states + DC vs. 7).', 'and the share of MCO enrollees also served through limited-benefit plans or fee-for-service.']] },
      { id: 'covered-benefits-carveins-carveouts', key: 'src3', verdict: 'UNVERIFIABLE', sources: E, claim: 'source annotation: CHCS gives ~23 carve-in states, 17 carve-up, decline of horizontal carve-outs',
        pairs: [['— ~23 states carving in behavioral health, 17 "carve-up" models, decline of horizontal carve-outs, and mixed integration evidence.', '— a significant majority of managed care states carving in behavioral health for at least some enrollees, New York and Oregon findings, and mixed integration evidence.']] },
    ]; })(),

  // ---------------- network-adequacy-standards
  ...(() => { const E = 'Lown Institute, Dec 2 2025 (fetched): the "five letters 2016-2022 / no sanctions as of 2024" finding is a KFF Health News inquiry about MEDICARE ADVANTAGE network adequacy, not Medicaid; KFF ACA network-adequacy brief (fetched) contains neither figure; eCFR 438.358(b)(1)(iv): network adequacy validation is a mandatory EQR activity';
    return [
      { id: 'network-adequacy-standards', key: 's4p3', verdict: 'MISATTRIBUTED', sources: E, claim: 'Medicaid enforcement: CMS sent letters to only five insurers 2016-2022 and imposed no sanctions as of 2024; "Penalties often fail to produce sustained change"',
        pairs: [['Enforcement of network adequacy standards has been notably limited: from 2016 to 2022, CMS sent letters to only five insurers whose plans failed network adequacy requirements, and had imposed no sanctions for network adequacy failures as of 2024. Penalties, when assessed, often fail to produce sustained change.',
                 'In Medicare Advantage, where CMS enforces network rules directly, a KFF Health News inquiry found that CMS sent letters to only five insurers whose plans failed network adequacy requirements from 2016 to 2022, and had imposed no sanctions for network failures as of 2024. In Medicaid managed care, enforcement rests with each state, and its strength varies with each state’s contract terms and willingness to use them.']] },
      { id: 'network-adequacy-standards', key: 'tk', verdict: 'MISATTRIBUTED', sources: E, claim: 'takeaway: CMS sent only five network-adequacy letters 2016-2022 (presented as Medicaid)',
        pairs: [['Enforcement has been weak — CMS sent only five network-adequacy letters from 2016–2022 and had imposed no sanctions as of 2024', 'Enforcement has been weak — in Medicare Advantage, CMS sent only five network-adequacy letters from 2016–2022 and had imposed no sanctions as of 2024, and Medicaid enforcement depends on each state']] },
      { id: 'network-adequacy-standards', key: 'src4', verdict: 'MISATTRIBUTED', sources: E, claim: 'source annotation lacks the enforcement finding',
        pairs: [['— more than one-third of Medicaid network doctors not providing care to Medicaid patients in 2023.', '— more than one-third of Medicaid network doctors not providing care to Medicaid patients in 2023; KFF Health News finding that CMS sent only five Medicare Advantage network-adequacy letters in 2016–2022 and imposed no sanctions as of 2024.']] },
      { id: 'network-adequacy-standards', key: 'src6', verdict: 'MISATTRIBUTED', sources: E, claim: 'source: KFF ACA brief cited for enforcement record and mandatory EQR validation (contains neither)',
        pairs: [['[6] KFF: "Network Adequacy Standards and Enforcement" — https://www.kff.org/affordable-care-act/issue-brief/network-adequacy-standards-and-enforcement/ — weak enforcement record (five CMS letters 2016–2022, no sanctions as of 2024) and network adequacy validation as a mandatory EQR activity.',
                 '[6] eCFR: "42 CFR 438.358 — Activities related to external quality review" — https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-438/subpart-E/section-438.358 — validation of network adequacy as a mandatory EQR-related activity.']] },
    ]; })(),

  // ---------------- hedis-medicaid-reporting
  ...(() => { const E = 'NCQA HEDIS page (fetched 2026-10-09): "more than 90 measures across 6 domains" and "More than 235 million people are enrolled in plans that report HEDIS results"; no "over 90% of U.S. health plans" statement on current NCQA pages';
    return [
      { id: 'hedis-medicaid-reporting', key: 's1sg1', verdict: 'UNVERIFIABLE', sources: E, claim: 'HEDIS "used by over 90% of U.S. health plans (NCQA)"',
        pairs: [['used by over 90% of U.S. health plans (NCQA)', 'reported by plans covering more than 235 million people (NCQA)']] },
      { id: 'hedis-medicaid-reporting', key: 'tk', verdict: 'UNVERIFIABLE', sources: E, claim: 'over 90% of U.S. plans use it',
        pairs: [['over 90% of U.S. plans use it.', 'plans covering more than 235 million people report it.']] },
      { id: 'hedis-medicaid-reporting', key: 'src2', verdict: 'UNVERIFIABLE', sources: E, claim: 'source annotation: 90%+ of plans using it',
        pairs: [['235M+ people in plans reporting HEDIS, 90%+ of plans using it, and', '235M+ people in plans reporting HEDIS, and']] },
    ]; })(),

  // ---------------- value-based-purchasing-medicaid
  ...(() => { const E = 'MACPAC 2020 VBP strategies report (fetched PDF): no Arizona content; CHCS Feb 2016 VBP brief (search-confirmed): Arizona MCO VBP share 5% (2013), 10% (2014), 20% (2015-2016)';
    return [
      { id: 'value-based-purchasing-medicaid', key: 'src2', verdict: 'MISATTRIBUTED', sources: E, claim: 'source annotation: MACPAC report gives Arizona 5%->20% ramp',
        pairs: [['and Arizona’s 5%→20% saturation ramp.', 'and New York’s 80% VBP target for MCOs by 2020.']] },
      { id: 'value-based-purchasing-medicaid', key: 'src3', verdict: 'MISATTRIBUTED', sources: E, claim: 'source annotation missing Arizona ramp',
        pairs: [['and the HCP-LAN framework.', 'and the HCP-LAN framework; Arizona’s MCO VBP requirement rising from 5% (2013) to 20% (2015–2016).']] },
    ]; })(),
  ...OPS2, // part 2 (Medicare, Population Health, RCM, Transformation Leadership, VBC) — _phase8b_ops2.mjs
];
import { OPS2 } from './_phase8b_ops2.mjs';
