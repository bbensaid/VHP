// Phase 8b part 2 source-integrity ops (Medicare Fundamentals, Population Health Management, Revenue Cycle Management,
// Transformation Leadership, Value-Based Care). Same op shape as _phase8b_ops.mjs; spread into its OPS array.
const KFF101 = 'KFF Medicare Health Policy 101 (fetched 2026-10-09): 68 million people in 2024 (61M age 65+, 7M under 65); 2025 benefit payments est. $1.1T; 21.2% of NHE in 2023; ~13.5% of federal budget 2024; 54% of eligible in MA (2025); 11.6M duals 2022';
const PEAK65 = 'CBS News peak-65 article (fetched 2026-10-09), citing Alliance for Lifetime Income: ~4.1 million turn 65 each year 2024 through 2027; average ~11,000 a day in 2024';

export const OPS2 = [
  // ================= Medicare Fundamentals =================
  // ---------------- medicare-history-structure
  { id: 'medicare-history-structure', key: 's4p1', verdict: 'UNVERIFIABLE', sources: KFF101,
    claim: '68.9 million enrolled as of 2025 (SeniorLiving.org); 61.2 million had both Part A and Part B in 2024',
    pairs: [['As of 2025, about 68.9 million Americans are enrolled, and roughly 90 percent of them are age 65 or older; the rest qualify through disability, ESRD, or ALS. In 2024, about 61.2 million beneficiaries had both Part A and Part B.',
             'In 2024, Medicare covered about 68 million people: roughly 61 million (about 90 percent) age 65 or older and 7 million younger people who qualify through disability, ESRD, or ALS.']] },
  { id: 'medicare-history-structure', key: 's4p2', verdict: 'FABRICATED', sources: KFF101,
    claim: '13.5% of federal budget in 2024 and "in 2024 Medicare spending reached about $1.1 trillion — around 21 percent of NHE" ($1.1T is the 2025 estimate; 21% is 2023)',
    pairs: [['and in 2024 Medicare spending reached about $1.1 trillion — around 21 percent of all national health expenditures.',
             'Medicare benefit payments are estimated at about $1.1 trillion in 2025, and Medicare accounted for about 21 percent of all national health expenditures in 2023.']] },
  { id: 'medicare-history-structure', key: 's4p3', verdict: 'FABRICATED', sources: PEAK65,
    claim: '"Peak 65" in 2025 with a record 4.18 million turning 65 — about 11,400 every day',
    pairs: [['The United States hit "Peak 65" in 2025, with a record 4.18 million people turning 65 in a single year — an average of about 11,400 every day.',
             'The United States entered "Peak 65" in 2024: about 4.1 million people are turning 65 each year from 2024 through 2027 — roughly 11,000 every day.']] },
  { id: 'medicare-history-structure', key: 's4sg1', verdict: 'FABRICATED', sources: `${KFF101}; ${PEAK65}`,
    claim: 'stats: 68.9M enrolled 2025 (Senior Living); ~$1.1T 2024 spending; 11,400/day "record 4.18M"',
    statsByIndex: {
      0: { value: '68M', label: 'People Enrolled (2024)', context: 'About 61M are age 65+ and 7M are under 65 (KFF Medicare 101)' },
      1: { value: '~$1.1T', label: 'Benefit Payments (2025 est.)', context: 'Medicare was 21% of national health spending in 2023 (KFF / CMS NHE)' },
      3: { value: '~11,000', label: 'Turning 65 Per Day', context: '"Peak 65" — about 4.1M turn 65 each year, 2024–2027 (Alliance for Lifetime Income)' } } },
  { id: 'medicare-history-structure', key: 'tw', verdict: 'FABRICATED', sources: KFF101,
    claim: 'takeaways: 68.9 million enrolled as of 2025; ~$1.1 trillion in 2024 — about 21% of NHE',
    pairs: [['As of 2025, about 68.9 million people are enrolled, ~90% of them age 65 or older.', 'In 2024, about 68 million people were enrolled, ~90% of them age 65 or older.'],
            ['Medicare spent roughly $1.1 trillion in 2024 — about 21% of national health spending and ~13.5% of the federal budget —', 'Medicare benefit payments are estimated at about $1.1 trillion in 2025 — Medicare is about 21% of national health spending and ~13.5% of the federal budget —']] },
  { id: 'medicare-history-structure', key: 'src6', verdict: 'UNVERIFIABLE', sources: KFF101, claim: 'source: SeniorLiving.org for 68.9M enrolled in 2025',
    pairs: [['[6] Medicaid and Medicare Statistics in 2026 — SeniorLiving.org — https://www.seniorliving.org/medicare-medicaid/statistics/ — 68.9M enrolled in 2025, ~90% age 65+.',
             '[6] The Peak 65® Zone is Here — Alliance for Lifetime Income, Retirement Income Institute (January 2024) — more than 4.1 million Americans turning 65 each year through 2027 (over 11,200 a day).']] },
  { id: 'medicare-history-structure', key: 'src7', verdict: 'UPDATED', sources: KFF101, claim: 'source annotation: ~$1.1T spending, ~21% of NHE',
    pairs: [['— ~$1.1T spending, ~21% of NHE, ~13.5% of federal budget.', '— 68M enrolled (2024; 61M age 65+), ~$1.1T benefit payments (2025 est.), 21% of NHE (2023), ~13.5% of federal budget (2024).']] },
  { id: 'medicare-history-structure', key: 'src8', verdict: 'FABRICATED', sources: PEAK65, claim: 'source annotation: 4.18M turning 65, ~11,400/day (article says 4.1M and ~11,000/day)',
    pairs: [['— 4.18M turning 65, ~11,400/day.', '— ~4.1M turning 65 each year through 2027, ~11,000/day.']] },

  // ---------------- medicare-financing
  ...(() => { const W = 'Worker-to-beneficiary series 4.6 -> 2.9 -> ~2.5 by 2030 sourced only to SeniorLiving.org; not found in KFF FAQ on Medicare financing (fetched), CRFB 2025 Trustees analysis (fetched) or search of 2025 Trustees summary';
    const C = 'CRFB Analysis of the 2025 Medicare Trustees Report (fetched 2026-10-09): HI depletion 2033 vs 2036 prior; 89% payable, abrupt 11% cut; KFF Medicare financing FAQ (fetched): general revenue 71% and premiums 27% of Part B revenue in 2023';
    return [
      { id: 'medicare-financing', key: 's4p3', verdict: 'UNVERIFIABLE', sources: W, claim: 'worker-to-beneficiary ratio 4.6 at founding -> 2.9 today -> ~2.5 by 2030',
        pairs: [['The worker-to-beneficiary ratio has fallen from about 4.6 workers per beneficiary at Medicare’s founding to roughly 2.9 today, and is projected to drop to about 2.5 by 2030 as baby boomers retire.',
                 'The number of workers paying HI payroll taxes for each Medicare beneficiary has been falling and will keep falling as baby boomers retire.']] },
      { id: 'medicare-financing', key: 's4sg1', verdict: 'UNVERIFIABLE', sources: `${W}; ${C}`, claim: 'stats: 4.6 -> 2.9 workers per beneficiary (SSA / SeniorLiving); ~2.5 by 2030',
        statsByIndex: { 2: { value: '11%', label: 'Payment Shortfall at Depletion', context: 'An abrupt Part A cut unless Congress acts (CRFB analysis of the 2025 Trustees Report)' },
                        3: { value: '71% / 27%', label: 'Part B Revenue Mix (2023)', context: 'General revenue vs. beneficiary premiums (KFF)' } } },
      { id: 'medicare-financing', key: 'tw', verdict: 'UNVERIFIABLE', sources: W, claim: 'takeaway: ratio fallen from about 4.6 to 2.9, heading toward ~2.5 by 2030',
        pairs: [['The worker-to-beneficiary ratio has fallen from about 4.6 to 2.9 and is heading toward ~2.5 by 2030, which is', 'The falling number of workers per beneficiary is']] },
      { id: 'medicare-financing', key: 'src6', verdict: 'UNVERIFIABLE', sources: W, claim: 'source: SeniorLiving.org for worker ratio 4.6 -> 2.9, ~2.5 by 2030', removeBlock: true },
      { id: 'medicare-financing', key: 'src4', verdict: 'UPDATED', sources: C, claim: 'source annotation: 75/25 Part B split',
        pairs: [['— 75/25 Part B split, payroll tax detail.', '— Part B premiums set to cover ~25% of costs (general revenue 71%, premiums 27% of Part B revenue in 2023), payroll tax detail.']] },
    ]; })(),

  // ---------------- medicare-coverage-benefits
  { id: 'medicare-coverage-benefits', key: 's5p1', verdict: 'FABRICATED',
    sources: 'KFF, A Snapshot of Sources of Coverage Among Medicare Beneficiaries (fetched 2026-10-09): 43% of those in traditional Medicare (12.2 million) had Medigap in 2023; 13% had no supplemental coverage',
    claim: 'most traditional-Medicare beneficiaries buy a Medicare Supplement policy (Medigap)',
    pairs: [['most traditional-Medicare beneficiaries buy a Medicare Supplement policy, known as Medigap.', 'about 43 percent of traditional-Medicare beneficiaries (12.2 million people in 2023) buy a Medicare Supplement policy, known as Medigap; others rely on employer retiree coverage or Medicaid.']] },

  // ---------------- inpatient-pps-drg
  { id: 'inpatient-pps-drg', key: 's1p1', verdict: 'MISATTRIBUTED',
    sources: 'CHQPR Saving Rural Hospitals, Cost-Based Payment page (cited as source [5]; fetched 2026-10-09): does not contain "risk-free" or "nearly risk-free"; no other source found for the quoted phrase',
    claim: 'cost-based reimbursement was, in the words of analysts, a "nearly risk-free world" for hospitals',
    pairs: [['This cost-based reimbursement was, in the words of analysts, a "nearly risk-free world" for hospitals:', 'Under this cost-based reimbursement hospitals bore almost no financial risk:']] },
  { id: 'inpatient-pps-drg', key: 'src5', verdict: 'MISATTRIBUTED', sources: 'CHQPR Cost-Based Payment page (fetched): no "risk-free" wording', claim: 'source annotation: pre-1983 cost-based "risk-free" reimbursement',
    pairs: [['— pre-1983 cost-based "risk-free" reimbursement.', '— how cost-based reimbursement works.']] },

  // ---------------- post-acute-care-payment
  { id: 'post-acute-care-payment', key: 's2p1', verdict: 'UPDATED',
    sources: 'CMS SNF PPS history: SNF PPS and RUG case-mix began 1998; RUG-IV (66 groups) implemented FY2010 and replaced by PDPM Oct 1, 2019 — RUG-IV itself ran ~9 years, not "nearly two decades"',
    claim: 'For nearly two decades that rate was set by the Resource Utilization Groups, version IV (RUG-IV)',
    pairs: [['For nearly two decades that rate was set by the Resource Utilization Groups, version IV (RUG-IV), which based payment',
             'For two decades that rate was set by the Resource Utilization Groups system — most recently version IV (RUG-IV, from 2010) — which based payment']] },

  // ---------------- medicare-advantage-overview
  ...(() => { const M = 'MedPAC March 2024 Report, Ch. 12 MA status report (PDF fetched, gs text): "Medicare spends an estimated 22 percent more for MA enrollees ... a projected $83 billion in 2024"; MA risk scores ~20 percent above comparable FFS, 13 percent net of the 5.9 percent coding adjustment, "$50 billion in higher payments"; no separate dollar figure for favorable selection. Ch. 13 (fetched): "roughly 22 percent more"';
    const K = 'KFF Medicare Advantage in 2024 enrollment update: 32.8M, 54% of eligible; KFF Medicare 101 (fetched): 54% in 2025 vs 25% in 2010';
    return [
      { id: 'medicare-advantage-overview', key: 's2p1', verdict: 'FABRICATED', sources: K, claim: '54% enrolled "up from roughly 38 percent of Part A and B spending share not long before" (garbled, unsourced)',
        pairs: [['up from roughly 38 percent of Part A and B spending share not long before.', 'up from 25 percent in 2010.']] },
      { id: 'medicare-advantage-overview', key: 's2sg1', verdict: 'FABRICATED', sources: K, claim: 'stat: "38% → 54% MA Share of A&B Spending (KFF/MedPAC)"',
        statsByIndex: { 1: { value: '25% → 54%', label: 'MA Share of Eligible Beneficiaries', context: '2010 to 2024 (KFF)' } } },
      { id: 'medicare-advantage-overview', key: 's5p1', verdict: 'FABRICATED', sources: M, claim: 'MedPAC estimated 2024 MA spending about 23 percent higher than FFS — roughly $88 billion',
        pairs: [['estimated that 2024 MA spending was about 23 percent higher than fee-for-service — roughly $88 billion in a single year.', 'estimated that Medicare spends about 22 percent more for MA enrollees than it would if they were in fee-for-service — roughly $83 billion in 2024 alone.']] },
      { id: 'medicare-advantage-overview', key: 's5p2', verdict: 'FABRICATED', sources: M, claim: 'coding intensity ~20% higher risk scores worth roughly $54 billion; favorable selection roughly $36 billion',
        pairs: [['made MA risk scores about 20 percent higher than they would be in traditional Medicare, worth roughly $54 billion.', 'made MA risk scores about 20 percent higher than for comparable traditional-Medicare beneficiaries — about 13 percent even after CMS’s mandatory 5.9 percent coding adjustment, worth roughly $50 billion in 2024.'],
                ['added roughly $36 billion more.', 'accounts for most of the remainder.']] },
      { id: 'medicare-advantage-overview', key: 's5w1', verdict: 'FABRICATED', sources: M, claim: 'MedPAC: about $88 billion more in 2024',
        pairs: [['about $88 billion more than traditional Medicare in 2024', 'about $83 billion more than traditional Medicare in 2024']] },
      { id: 'medicare-advantage-overview', key: 'tw', verdict: 'FABRICATED', sources: M, claim: 'takeaway: ~23% more (~$88B), coding intensity (~$54B), favorable selection (~$36B)',
        pairs: [['MedPAC estimates MA cost taxpayers ~23% more than traditional Medicare in 2024 (~$88B), driven by coding intensity (~$54B) and favorable selection (~$36B).', 'MedPAC estimates Medicare spends ~22% more on MA enrollees than traditional Medicare would (~$83B in 2024), driven mainly by coding intensity (~$50B) and favorable selection.']] },
      { id: 'medicare-advantage-overview', key: 'src4', verdict: 'FABRICATED', sources: M, claim: 'source annotation: ~23% higher ($88B), coding intensity (~20%, $54B), favorable selection ($36B)',
        pairs: [['— ~23% higher spending ($88B), coding intensity (~20%, $54B), favorable selection ($36B).', '— ~22% higher payments for MA enrollees; companion Ch. 12 status report: $83B in 2024, coding intensity ~20% (13% net of the 5.9% adjustment), $50B.']] },
    ]; })(),

  // ---------------- medicare-advantage-market-dynamics
  ...(() => { const C = 'KFF, Most Medicare Advantage Markets are Dominated by One or Two Insurers (fetched 2026-10-09): "90% of eligible Medicare beneficiaries lived in a county where at least 50% of Medicare Advantage enrollees in that county were in plans sponsored by one or two insurers" (2024); 79% of counties highly concentrated; 39% of most rural counties very highly concentrated vs 6% urban';
    return [
      { id: 'medicare-advantage-market-dynamics', key: 's4p2', verdict: 'FABRICATED', sources: C, claim: '~90% of beneficiaries lived in a county where MA enrollees had plans from just one or two insurers',
        pairs: [['about 90 percent of Medicare beneficiaries lived in a county where MA enrollees had plans from just one or two insurers, and the great majority of counties were classified as highly or very highly concentrated. Rural counties were the most concentrated of all.',
                 'about 90 percent of eligible Medicare beneficiaries lived in a county where at least half of MA enrollees were in plans sponsored by just one or two insurers, and 79 percent of counties were classified as highly concentrated MA markets. Rural counties were the most concentrated of all: 39 percent of the most rural counties were very highly concentrated, versus 6 percent of urban counties.']] },
      { id: 'medicare-advantage-market-dynamics', key: 'tw', verdict: 'FABRICATED', sources: C, claim: 'takeaway: ~90% of beneficiaries live in counties dominated by one or two insurers',
        pairs: [['~90% of beneficiaries live in counties dominated by one or two insurers.', '~90% of beneficiaries live in counties where one or two insurers enroll at least half of MA members.']] },
      { id: 'medicare-advantage-market-dynamics', key: 'src5', verdict: 'UPDATED', sources: C, claim: 'source annotation: ~90% of beneficiaries in 1-2 insurer counties',
        pairs: [['— ~90% of beneficiaries in 1-2 insurer counties; concentration data.', '— 90% of beneficiaries in counties where 1-2 insurers enroll at least half of MA members; 79% of counties highly concentrated (2024).']] },
    ]; })(),

  // ---------------- hospital-vbp-hrrp-hacrp
  ...(() => { const H = 'CMS HACRP page (cited source [5]): six measures = CMS PSI 90 plus five CDC NHSN HAI measures — CLABSI, CAUTI, SSI (colon and abdominal hysterectomy), MRSA bacteremia, and Clostridioides difficile infection (CDI); HACRP established by ACA section 3008';
    return [
      { id: 'hospital-vbp-hrrp-hacrp', key: 's4p2', verdict: 'FABRICATED', sources: H, claim: 'five HAI measures listed as CLABSI, CAUTI, SSI colon/hysterectomy, MRSA (omits C. difficile)',
        pairs: [['surgical site infections (SSI) for colon surgery and hysterectomy, and MRSA bacteremia.', 'surgical site infections (SSI) for colon surgery and hysterectomy, MRSA bacteremia, and Clostridioides difficile infection (CDI).']] },
      { id: 'hospital-vbp-hrrp-hacrp', key: 'src5', verdict: 'FABRICATED', sources: H, claim: 'source annotation: six measures (PSI 90, CLABSI, CAUTI, SSI, MRSA)',
        pairs: [['six measures (PSI 90, CLABSI, CAUTI, SSI, MRSA).', 'six measures (PSI 90, CLABSI, CAUTI, SSI, MRSA, CDI).']] },
      { id: 'hospital-vbp-hrrp-hacrp', key: 's1p2', verdict: 'UPDATED', sources: H, claim: 'HACRP described as "added shortly after" the ACA programs (it was itself created by ACA s.3008)',
        pairs: [['and — added shortly after — the Hospital-Acquired Condition Reduction Program (HACRP).', 'and the Hospital-Acquired Condition Reduction Program (HACRP), which started two years later.']] },
    ]; })(),

  // ---------------- part-d-structure-formulary
  { id: 'part-d-structure-formulary', key: 's3sg1', verdict: 'UNVERIFIABLE',
    sources: 'No CMS source found for a "~30% average OOP savings in 2025" projection (CMS Part D redesign / negotiation fact sheets, KFF IRA explainer fetched 2026-10-09); KFF IRA explainer: insulin cost-sharing capped at $35/month from 2023',
    claim: 'stat: "~30% Avg. OOP Savings 2025 — Projected IRA savings on drug costs (CMS)"',
    statsByIndex: { 3: { value: '$35', label: 'Monthly Insulin Cap', context: 'Part D insulin cost-sharing cap since 2023 (IRA; KFF)' } } },

  // ================= Population Health Management =================
  // ---------------- what-is-population-health
  ...(() => { const K = 'Kindig & Stoddart, What Is Population Health? AJPH 2003 (PMC1447747, fetched 2026-10-09): "These determinants include medical care, public health interventions, aspects of the social environment (income, education, employment, social support, culture) and of the physical environment (urban design, clean air and water), genetics, and individual behavior" — the six categories in the lesson (personal health practices, coping skills, early development...) are not the paper\'s list';
    const I = 'IHI Triple Aim topic page (search 2026-10-09): the framework "has provided leaders with a North Star as they create new value-based, equity-centered models of care for populations" — the North Star image refers to the Triple Aim, not population health';
    return [
      { id: 'what-is-population-health', key: 's2p2', verdict: 'MISATTRIBUTED', sources: K, claim: 'K&S "named six categories": social/economic/physical environments; personal health practices; capacity and coping skills; biology; early development; access to health services',
        pairs: [['The authors named six categories: the social, economic, and physical environments; personal health practices; individual capacity and coping skills; biology; early developmental trajectory (early childhood); and access to health services. Strikingly, only one of those six — access to health services — is what we usually think of as "health care."',
                 'The authors list them as medical care, public health interventions, aspects of the social environment (income, education, employment, social support, culture), aspects of the physical environment (urban design, clean air and water), genetics, and individual behavior. Strikingly, only one of those six — medical care — is what we usually think of as "health care."']] },
      { id: 'what-is-population-health', key: 's3sg1', verdict: 'MISATTRIBUTED', sources: K, claim: 'stat: 6 determinant categories, only 1 health-care access',
        statsByIndex: { 1: { value: '6', label: 'Determinant Groups Named', context: 'Medical care is only one of them (Kindig & Stoddart)' } } },
      { id: 'what-is-population-health', key: 'tw', verdict: 'MISATTRIBUTED', sources: K, claim: 'takeaway: six determinant categories include ... capacity, biology, early development, and access',
        pairs: [['The six determinant categories include social/economic/physical environment, behaviors, capacity, biology, early development, and access — only one is health care.', 'Kindig and Stoddart’s determinants span medical care, public health interventions, the social and physical environments, genetics, and individual behavior — only one is health care.']] },
      { id: 'what-is-population-health', key: 's3p2', verdict: 'MISATTRIBUTED', sources: I, claim: 'Population health has been called the "North Star" of the Triple Aim',
        pairs: [['Population health has been called the "North Star" of the Triple Aim.', 'IHI describes the Triple Aim itself as having given leaders a "North Star" for building value-based models of care for populations.']] },
    ]; })(),

  // ---------------- determinants-of-health
  { id: 'determinants-of-health', key: 's2p3', verdict: 'MISATTRIBUTED',
    sources: 'Hood et al., County Health Rankings, AJPM 2016 (source [1]) derives factor weights only; the "poverty, racism, food insecurity, housing insecurity, ACEs" list comes from a CareJourney vendor blog (source [2]), not the CHR work',
    claim: 'The top drivers identified in this work include poverty, racism, food insecurity, housing insecurity, and ACEs',
    pairs: [['The top drivers identified in this work include poverty, racism, food insecurity, housing insecurity, and adverse childhood experiences.', 'Drivers commonly cited within these categories include poverty, racism, food insecurity, housing insecurity, and adverse childhood experiences.']] },

  // ---------------- risk-stratification-models
  ...(() => { const R = 'RAND, Multiple Chronic Conditions in the United States (Buttorff et al., 2017), as reported by Health Populi (fetched 2026-10-09): adults with 5+ chronic conditions are 12% of adults, 41% of spending, and "spend 14 times more on health care services than people with no chronic conditions"; no source found for 17x';
    return [
      { id: 'risk-stratification-models', key: 's2p2', verdict: 'FABRICATED', sources: R, claim: 'spending for people with five or more chronic conditions is roughly 17 times higher than for none',
        pairs: [['Spending for people with five or more chronic conditions is roughly 17 times higher than for people with no chronic conditions.', 'Adults with five or more chronic conditions spend about 14 times more on health care than adults with none, and make up 12 percent of adults but 41 percent of spending (RAND, 2017).']] },
      { id: 'risk-stratification-models', key: 's2sg1', verdict: 'FABRICATED', sources: R, claim: 'stat: 17x cost of complexity (research)',
        statsByIndex: { 2: { value: '14x', context: 'Spending for adults with 5+ chronic conditions vs none (RAND, 2017)' } } },
      { id: 'risk-stratification-models', key: 'tw', verdict: 'FABRICATED', sources: R, claim: 'takeaway: 5+ chronic conditions cost ~17x those with none',
        pairs: [['those with 5+ chronic conditions cost ~17x those with none.', 'adults with 5+ chronic conditions spend ~14x those with none (RAND).']] },
      { id: 'risk-stratification-models', key: 'src3', verdict: 'FABRICATED', sources: R, claim: 'source annotation: 17x cost of complexity',
        pairs: [['5%/50% and 20%/80% spending concentration; 17x cost of complexity', '5%/50% and 20%/80% spending concentration (consistent with AHRQ MEPS); RAND 2017 puts the 5+ chronic-condition multiple at 14x']] },
    ]; })(),

  // ---------------- care-gap-analysis
  ...(() => { const V = 'Veradigm "Closing gaps at the point of care" page (cited [4], fetched 2026-10-09): no 34% figure; Linear Health care-gap automation page (cited [5], fetched): no 63% figure, no 3x conversion claim, no NCQA mention; no other source found';
    const N = 'NCQA blog "Updates to Breast Cancer Screening Age Range for HEDIS MY 2025": BCS ages 40-74 (was 50-74); NCQA HEDIS page: 90+ measures across 6 domains; NCQA MY2022 changes: Comprehensive Diabetes Care split into separate measures (HbA1c control, eye exam, BP control) with kidney health evaluation; nephropathy indicator retired; COL ages 45-75';
    return [
      { id: 'care-gap-analysis', key: 's3p2', verdict: 'UNVERIFIABLE', sources: V, claim: 'Evidence shows pre-visit gap alerts increase in-visit gap closure by about 34 percent',
        pairs: [['Evidence shows pre-visit gap alerts increase in-visit gap closure by about 34 percent — catching the patient who is already in the building is far easier than chasing one who is not.', 'Catching the patient who is already in the building is far easier than chasing one who is not.']] },
      { id: 'care-gap-analysis', key: 's3p3', verdict: 'UNVERIFIABLE', sources: V, claim: 'outreach with a direct scheduling link converts roughly three times better',
        pairs: [['outreach that includes a direct scheduling link converts roughly three times better than outreach asking patients to call the office.', 'outreach that includes a direct self-scheduling link removes a step that outreach asking patients to call the office leaves in place.']] },
      { id: 'care-gap-analysis', key: 's3sg1', verdict: 'MISATTRIBUTED', sources: `${V}; ${N}`, claim: 'stats: 34% lift (industry); ~63% closeable by outreach (NCQA analysis); 3x direct-link conversion (industry)',
        statsByIndex: { 0: { value: '90+', label: 'HEDIS Measures', context: 'Across six domains of care (NCQA)' },
                        1: { value: '40–74', label: 'Breast Screening Ages (HEDIS)', context: 'Expanded from 50–74 for MY2025, following USPSTF (NCQA)' },
                        2: { value: '45–75', label: 'Colorectal Screening Ages (HEDIS)', context: 'Lowered from 50 to 45 for MY2022 (NCQA)' } } },
      { id: 'care-gap-analysis', key: 'tw', verdict: 'UNVERIFIABLE', sources: V, claim: 'takeaways: alerts lift in-visit closure ~34%; ~63% closeable by outreach alone; direct links convert ~3x',
        pairs: [['are especially high-leverage (alerts lift in-visit closure ~34%).', 'are especially high-leverage.'],
                ['Proactive outreach reaches patients not coming in; about 63% of gaps are closeable by outreach alone, and direct scheduling links convert ~3x better than "call the office."', 'Proactive outreach reaches patients not coming in, and direct self-scheduling links remove friction compared with "call the office."']] },
      { id: 'care-gap-analysis', key: 'src4', verdict: 'UNVERIFIABLE', sources: V, claim: 'source annotation: ~34% lift in in-visit closure', pairs: [['point-of-care alerts; ~34% lift in in-visit closure', 'point-of-care alerts for open gaps']] },
      { id: 'care-gap-analysis', key: 'src5', verdict: 'UNVERIFIABLE', sources: V, claim: 'source annotation: ~63% closeable by outreach; direct scheduling links 3x conversion', pairs: [['~63% closeable by outreach; direct scheduling links 3x conversion; end-to-end workflow', 'self-scheduling links and reminder sequences; end-to-end workflow']] },
      { id: 'care-gap-analysis', key: 's2p3', verdict: 'UPDATED', sources: N, claim: 'comprehensive diabetes care bundles HbA1c testing, BP control, eye exams, and nephropathy screening (retired/split MY2022)',
        pairs: [['chronic-disease management (like comprehensive diabetes care, which bundles HbA1c testing, blood pressure control, eye exams, and nephropathy screening)', 'chronic-disease management (like the diabetes measures — HbA1c control, blood pressure control, eye exams, and kidney health evaluation — which NCQA split out of the former Comprehensive Diabetes Care bundle in 2022)']] },
      { id: 'care-gap-analysis', key: 's4ex1', verdict: 'UPDATED', sources: N, claim: 'example: nephropathy screening gap; "comprehensive-diabetes-care measure"',
        pairs: [['a retinal eye exam, and nephropathy screening.', 'a retinal eye exam, and a kidney health evaluation.'],
                ["AND the organization's comprehensive-diabetes-care measure.", "AND the organization's diabetes quality measures."]] },
    ]; })(),

  // ---------------- diabetes-population-management
  ...(() => { const A = 'CDC "Only 1 in 4 Adults with Diagnosed Diabetes Achieve Combined Diabetes Care Goals" (archive.cdc.gov, fetched 2026-10-09), citing MMWR Nov 13 2020: 26% met A1C <8%, BP <140/90, non-HDL <130 and nonsmoking, 2017-2018; PMC5536329 (cited [6], fetched) has no ABCS percentage';
    const N = 'NCQA MY2022: Comprehensive Diabetes Care bundle split into separate measures (HbA1c control, eye exam, BP control); nephropathy indicator retired, Kidney Health Evaluation added';
    return [
      { id: 'diabetes-population-management', key: 's1p3', verdict: 'MISATTRIBUTED', sources: A, claim: 'only about 26% meet combined ABCS goals (attributed via source [6], which has no such figure)',
        pairs: [['nationally, only about 26 percent of adults with diabetes meet the combined "ABCS" goals (A1c, blood pressure, cholesterol, and smoking cessation).', 'nationally, only about 26 percent of adults with diagnosed diabetes met the combined "ABCS" goals (A1c, blood pressure, cholesterol, and not smoking) in 2017–2018, according to CDC.']] },
      { id: 'diabetes-population-management', key: 'src6', verdict: 'MISATTRIBUTED', sources: A, claim: 'source annotation: PMC5536329 gives ABCS goals figure',
        pairs: [['registry-based management; ABCS goals; addressing disparities and social drivers', 'registry-based management; addressing disparities and social drivers (the 26% ABCS figure is from CDC, MMWR Nov 2020)']] },
      { id: 'diabetes-population-management', key: 's3p2', verdict: 'UPDATED', sources: N, claim: 'comprehensive-diabetes-care care gaps incl. nephropathy screening',
        pairs: [['the team works the comprehensive-diabetes-care care gaps (from the previous lesson):', 'the team works the diabetes care gaps (from the previous lesson):'],
                ['who needs nephropathy screening.', 'who needs a kidney health evaluation.']] },
      { id: 'diabetes-population-management', key: 's3p3', verdict: 'UNVERIFIABLE', sources: 'No source given for "99 percent of the time"; commonly repeated without a study behind it', claim: 'diabetes is managed by the patient 99 percent of the time',
        pairs: [['diabetes is managed by the patient 99 percent of the time, between visits,', 'diabetes is managed by the patient almost all of the time, between visits,']] },
    ]; })(),

  // ---------------- heart-failure-hypertension-management
  ...(() => { const H = 'Smith et al., Remote Patient Monitoring Is Associated with Improved Outcomes in Hypertension, Healthcare (Basel) 2024 (PMC11353537, cited [5], fetched 2026-10-09): cellular BP monitors + registered-nurse care navigators; among 6,595 patients uncontrolled at baseline, uncontrolled share fell from 66.3% to 40.2% after a mean 289 days; no resistant-HTN, Bluetooth, pharmacist or 74% finding';
    const R = 'AJMC "Remote Monitoring Program Cuts Heart Failure Readmissions in Half" (cited [4], fetched): UMass Memorial Health–Harrington Hospital reported a 50% reduction in 30-day CHF readmissions (Oct 2024, Brook Health platform); "no accompanying study was made available"; no 10% vs 25% figures, no cost figures';
    return [
      { id: 'heart-failure-hypertension-management', key: 's2p3', verdict: 'MISATTRIBUTED', sources: H, claim: 'One program found 74% of resistant-HTN patients controlled within 12 months with Bluetooth monitor + pharmacist',
        pairs: [['The results are striking. One program found that 74 percent of patients with resistant high blood pressure gained control within 12 months using a Bluetooth-enabled home monitor combined with regular pharmacist interaction. This is the population health pattern: technology (home monitoring) plus team-based care (pharmacist titration)',
                 'The results can be substantial. In a 2024 retrospective study of 6,595 patients with uncontrolled hypertension enrolled in a remote monitoring program (cellular-connected home cuffs plus registered-nurse care navigators), the share still uncontrolled fell from 66 percent to 40 percent after an average of about nine and a half months. This is the population health pattern: technology (home monitoring) plus team-based care (nurse or pharmacist titration)']] },
      { id: 'heart-failure-hypertension-management', key: 's2ex1', verdict: 'MISATTRIBUTED', sources: H, claim: 'example: resistant-HTN program, Bluetooth cuff + pharmacist, ~74% controlled in 12 months',
        pairs: [['In a program for patients with hard-to-control (resistant) hypertension, patients used a Bluetooth-enabled blood-pressure cuff that transmitted home readings, while a pharmacist reviewed the data and adjusted medications regularly between physician visits.\nAbout 74% of these difficult patients achieved blood-pressure control within 12 months — far above the ~25% national control rate — by combining home monitoring, team-based titration, and continuous data rather than relying on sporadic office visits.',
                 'In a remote monitoring program studied in 2024 (Smith et al., Healthcare), patients with uncontrolled hypertension used cellular-connected blood-pressure cuffs that transmitted home readings, while registered-nurse care navigators reviewed the data and coordinated medication changes with clinicians between visits.\nAmong 6,595 patients uncontrolled at baseline, the share still uncontrolled fell from 66.3% to 40.2% after an average of 289 days — by combining home monitoring, team-based follow-up, and continuous data rather than relying on sporadic office visits.']] },
      { id: 'heart-failure-hypertension-management', key: 's4p3', verdict: 'FABRICATED', sources: R, claim: 'RPM programs cut HF readmissions roughly in half; one program 10% vs ~25% national; reduced monthly costs substantially',
        pairs: [['The evidence is strong. Remote monitoring programs have cut heart-failure 30-day readmission rates roughly in half — one program reported a 10 percent readmission rate versus the ~25 percent national rate — and reduced monthly costs substantially for monitored Medicare heart-failure patients. RPM is increasingly reimbursed and increasingly standard for high-risk heart-failure populations, exactly because the math is so favorable: a modest monitoring cost prevents a very expensive readmission.',
                 'The evidence is promising but uneven. In 2024 UMass Memorial Health–Harrington Hospital reported that its remote monitoring program cut 30-day heart-failure readmissions by 50 percent, though no peer-reviewed study accompanied the announcement, and results vary across programs. RPM is increasingly reimbursed for high-risk heart-failure populations because the logic is favorable: a modest monitoring cost can prevent a very expensive readmission.']] },
      { id: 'heart-failure-hypertension-management', key: 's4sg1', verdict: 'FABRICATED', sources: `${R}; ${H}`, claim: 'stats: RPM roughly halves HF readmissions (industry/research); ~10% readmission with RPM vs ~25% national (RPM study)',
        statsByIndex: { 1: { value: '50%', label: 'Reported HF Readmission Drop', context: 'One hospital RPM program, 2024; not peer-reviewed (AJMC)' },
                        2: { value: '66% → 40%', label: 'Uncontrolled HTN With RPM', context: '6,595 patients, mean 289 days (Smith et al., 2024)' } } },
      { id: 'heart-failure-hypertension-management', key: 'tw', verdict: 'FABRICATED', sources: `${R}; ${H}`, claim: 'takeaways: ~74% resistant-HTN controlled; RPM has roughly halved HF readmissions and lowered costs',
        pairs: [['One SMBP-plus-pharmacist program controlled ~74% of resistant-hypertension patients within 12 months, far above the national rate.', 'In one 2024 remote-monitoring study, the share of patients with uncontrolled hypertension fell from 66% to 40% within about nine and a half months.'],
                ['Remote monitoring (especially daily weight to catch fluid retention) has roughly halved heart-failure readmissions and lowered costs, making it increasingly standard.', 'Remote monitoring (especially daily weight to catch fluid retention) can reduce heart-failure readmissions — one hospital reported a 50% drop — though results vary across programs.']] },
      { id: 'heart-failure-hypertension-management', key: 'qz', verdict: 'FABRICATED', sources: R, claim: 'quiz explanation: RPM has roughly halved heart-failure readmissions',
        pairs: [['This anticipation is why RPM has roughly halved heart-failure readmissions.', 'This anticipation is why RPM can reduce heart-failure readmissions.']] },
      { id: 'heart-failure-hypertension-management', key: 'src4', verdict: 'FABRICATED', sources: R, claim: 'source annotation: RPM roughly halving HF readmissions; ~10% vs ~25%',
        pairs: [['— RPM roughly halving HF readmissions; ~10% vs ~25%', '— UMass Memorial Health–Harrington Hospital reports 50% fewer 30-day CHF readmissions (2024 announcement; no study published)']] },
      { id: 'heart-failure-hypertension-management', key: 'src5', verdict: 'MISATTRIBUTED', sources: H, claim: 'source annotation: SMBP/RPM with pharmacist; ~74% resistant-HTN control in 12 months',
        pairs: [['— SMBP/RPM with pharmacist; ~74% resistant-HTN control in 12 months', '— cellular BP monitors with RN care navigators; uncontrolled HTN fell from 66.3% to 40.2% over a mean 289 days (n=6,595)']] },
    ]; })(),

  // ---------------- behavioral-health-integration-population
  ...(() => { const P = 'APA "Learn About the Collaborative Care Model" (cited [2], fetched 2026-10-09): describes measurement-based treatment to target but gives no PHQ-9 threshold; UW AIMS Center evidence page (fetched): no threshold. Standard targets (NCQA Depression Remission or Response measure, CMS CoCM guidance): response = 50% PHQ-9 reduction, remission = PHQ-9 < 5';
    return [
      { id: 'behavioral-health-integration-population', key: 's3p2', verdict: 'MISATTRIBUTED', sources: P, claim: 'treat to target, e.g., aiming for a PHQ-9 score of 10 or lower, or a 50 percent reduction',
        pairs: [['for example, aiming for a PHQ-9 score of 10 or lower, or a 50 percent reduction.', 'for example, a 50 percent reduction in the PHQ-9 score (response) and ultimately a score below 5 (remission).']] },
      { id: 'behavioral-health-integration-population', key: 's4ex1', verdict: 'MISATTRIBUTED', sources: P, claim: 'example: target PHQ-9 ≤10',
        pairs: [['The team tracks the PHQ-9 down toward the target (≤10)', 'The team tracks the PHQ-9 down toward the target (at least a 50% drop, aiming for remission below 5)']] },
      { id: 'behavioral-health-integration-population', key: 'tw', verdict: 'MISATTRIBUTED', sources: P, claim: 'takeaway: treat to target (e.g., PHQ-9 ≤10)',
        pairs: [['the team treats "to target" (e.g., PHQ-9 ≤10),', 'the team treats "to target" (e.g., a 50% PHQ-9 reduction, aiming for remission below 5),']] },
      { id: 'behavioral-health-integration-population', key: 'src2', verdict: 'MISATTRIBUTED', sources: P, claim: 'source annotation: APA gives measurement-based treat-to-target (PHQ-9 ≤10)',
        pairs: [['measurement-based treat-to-target (PHQ-9 ≤10)', 'measurement-based treatment to target']] },
    ]; })(),

  // ---------------- care-manager-roles-models
  { id: 'care-manager-roles-models', key: 's4sg1', verdict: 'MISATTRIBUTED',
    sources: 'AHRQ Medicaid care management guide, Section 5 (fetched via curl 2026-10-09): "Care manager caseloads might be as high as 500 members to 1 care manager for only telephonic interventions or as low as 25 members to 1 care manager for intensive" — figures are AHRQ\'s, not "industry"; NACHC Care Management Action Guide (PDF fetched): RN caseload "likely to be in the range of 50-150 high-risk patients"',
    claim: 'stats: ~500:1 and ~25:1 caseloads attributed to "industry"',
    statsByIndex: { 1: { context: 'Upper end for purely telephonic programs (AHRQ)' }, 2: { context: 'Lower end for intensive in-person programs (AHRQ)' } } },

  // ---------------- total-cost-of-care-management
  ...(() => { const B = 'Baldwin high-cost-claimant blog (cited [3], fetched 2026-10-09): contains none of the <1%/~30% or 0.16%/9% figures (only an EBRI 5%/57% statistic); AHRQ MEPS statistical briefs (search): top 5% ~half and top 1% ~a fifth of spending';
    const E = 'EBRI Issue Brief #547 "Unlocking Health Benefits: Where Employer High-Cost Spending Often Goes" (cited [5], PDF fetched, gs text): no site-of-care savings figure; no source found for "4 to 36 percent"';
    const U = 'UnitedHealth Group 2019 analysis (search 2026-10-09): 18 million of 27 million ED visits by privately insured people are avoidable, costing ~$32 billion a year (~$1,800 per visit); Illustra blog (cited [6]) text not retrievable; no source found for "3 to 10 times" or "$1,500 to $3,000"';
    return [
      { id: 'total-cost-of-care-management', key: 's3p1', verdict: 'UNVERIFIABLE', sources: B, claim: '$100K+ claimants <1% of claimants but ~30% of spend; >$250K ~0.16% but ~9% of costs',
        pairs: [['patients with $100,000+ in annual claims are under 1 percent of claimants but nearly 30 percent of total medical and pharmacy expense, and the very highest-cost claimants (over $250,000/year) are around 0.16 percent of the insured population yet about 9 percent of all healthcare costs.',
                 'nationally, the top 5 percent of spenders account for roughly half of all health care spending, and the top 1 percent for about a fifth (AHRQ Medical Expenditure Panel Survey).']] },
      { id: 'total-cost-of-care-management', key: 's3p3', verdict: 'UNVERIFIABLE', sources: U, claim: '18M avoidable ED visits; ED 3-10x more expensive; $1,500-3,000 saved per prevented visit',
        pairs: [['An estimated 18 million avoidable ED visits occur each year, and treating the same problem in the ED is roughly 3 to 10 times more expensive than in urgent care, primary care, or telehealth. Each prevented avoidable ED visit can save on the order of $1,500 to $3,000.',
                 'UnitedHealth Group estimated in 2019 that 18 million of the 27 million ED visits made each year by privately insured people are avoidable, costing about $32 billion — roughly $1,800 per visit — because treating the same problem in the ED costs far more than in urgent care, primary care, or telehealth (other researchers estimate a smaller avoidable share).']] },
      { id: 'total-cost-of-care-management', key: 's3sg1', verdict: 'UNVERIFIABLE', sources: `${B}; ${U}`, claim: 'stats: <1%/~30% high-cost claimants (industry); ED 3-10x costlier (industry); $1.5-3K saved per prevented ED visit (industry)',
        statsByIndex: { 0: { value: '5% / ~50%', label: 'Top Spenders', context: 'Top 5% of people account for about half of spending (AHRQ MEPS)' },
                        2: { context: 'Of 27M ED visits by privately insured people (UnitedHealth Group, 2019)' },
                        3: { value: '~$32B', label: 'Cost of Avoidable ED Visits', context: 'Per year, about $1,800 per visit (UnitedHealth Group, 2019)' } } },
      { id: 'total-cost-of-care-management', key: 's4p2', verdict: 'UNVERIFIABLE', sources: E, claim: 'eliminating site-of-care differentials can save 4 to 36 percent',
        pairs: [[' Eliminating site-of-care price differentials for specialty drugs can save in the range of 4 to 36 percent depending on the medication.', ' The savings depend on the drug and on the price gap between settings.']] },
      { id: 'total-cost-of-care-management', key: 's4ex1', verdict: 'MISATTRIBUTED', sources: E, claim: 'example: "saving anywhere from a few percent to a third of the cost per the EBRI estimate"',
        pairs: [['— saving anywhere from a few percent to a third of the cost per the EBRI estimate, with no change', '— saving the price difference between settings, with no change']] },
      { id: 'total-cost-of-care-management', key: 'tw', verdict: 'UNVERIFIABLE', sources: `${B}; ${U}; ${E}`, claim: 'takeaways: <1%/~30% and 0.16%/~9%; ED 3-10x; site-of-care ~4-36%',
        pairs: [['Cost concentrates: high-cost claimants ($100K+) are <1% of people but ~30% of spend; the highest (>$250K) are ~0.16% but ~9% of all cost.', 'Cost concentrates: the top 5% of spenders account for about half of all health spending, and the top 1% for about a fifth (AHRQ MEPS).'],
                ['avoidable ED visits (~18M/year, 3-10x costlier than alternatives) are major drivers.', 'avoidable ED visits (an estimated 18M/year among the privately insured, ~$32B) are major drivers.'],
                ['Site-of-care steerage (e.g., moving infusions to lower-cost settings) can save ~4-36% on specialty drugs with no change to treatment.', 'Site-of-care steerage (e.g., moving infusions to lower-cost settings) captures the price gap between settings with no change to treatment.']] },
      { id: 'total-cost-of-care-management', key: 'src3', verdict: 'UNVERIFIABLE', sources: B, claim: 'source annotation: <1% / ~30%; >$250K ~0.16% / ~9%',
        pairs: [['— high-cost claimant concentration (<1% / ~30%; >$250K ~0.16% / ~9%)', '— employer approaches to managing high-cost claimants']] },
      { id: 'total-cost-of-care-management', key: 'src5', verdict: 'MISATTRIBUTED', sources: E, claim: 'source annotation: EBRI site-of-care steerage savings ~4-36%',
        pairs: [['— site-of-care steerage savings ~4-36%', '— where employer high-cost spending goes (EBRI Issue Brief #547, Oct 2025); specialty medications’ share rises in the highest-spending tiers']] },
      { id: 'total-cost-of-care-management', key: 'src6', verdict: 'UNVERIFIABLE', sources: U, claim: 'source annotation: ~18M avoidable ED visits; ED 3-10x costlier; ~$1,500-3,000 saved per prevented visit',
        pairs: [['— ~18M avoidable ED visits; ED 3-10x costlier; ~$1,500-3,000 saved per prevented visit', '— strategies to reduce avoidable ED use in value-based care (the 18M / $32B estimate is UnitedHealth Group’s, 2019)']] },
    ]; })(),

  // ---------------- community-health-workers-equity
  ...(() => { const L = 'Penn LDI "The Evidence on Community Health Workers" (cited [5], fetched 2026-10-09): reports 30% fewer hospitalizations in the multiple-chronic-condition trial and ~$2 return per $1 — no 65% / doubled-satisfaction figures; Penn press release on Newswise (cited [3], fetched): "reduced hospital stays by 65 percent and doubled the rate of patient satisfaction with primary care" in a multi-center trial; $2.47 ROI (Health Affairs 2020)';
    return [
      { id: 'community-health-workers-equity', key: 'src5', verdict: 'MISATTRIBUTED', sources: L, claim: 'source annotation: LDI page gives ~65% fewer hospital days, doubled satisfaction',
        pairs: [['— IMPaCT randomized-trial outcomes: ~65% fewer hospital days, doubled satisfaction', '— IMPaCT randomized-trial outcomes: 30% fewer hospitalizations in the multiple-chronic-condition trial; ~$2 return per $1']] },
      { id: 'community-health-workers-equity', key: 'src3', verdict: 'UPDATED', sources: L, claim: 'source annotation lacks the 65% / doubled-satisfaction figures it is the source for',
        pairs: [['— $2.47 ROI per Medicaid dollar; savings from reduced hospitalizations', '— $2.47 ROI per Medicaid dollar; savings from reduced hospitalizations; multi-center trial cut hospital stays 65% and doubled primary-care satisfaction']] },
    ]; })(),

  // ---------------- population-health-quality-improvement
  { id: 'population-health-quality-improvement', key: 's1p2', verdict: 'UPDATED',
    sources: 'Batalden P, Davidoff F. What is "quality improvement" and how can it transform healthcare? Qual Saf Health Care 2007;16(1):2-3 — the "combined and unceasing efforts of everyone" definition (unattributed in the lesson)',
    claim: 'QI "has been defined as the combined, unceasing efforts of everyone..." (definition unattributed)',
    pairs: [['Quality improvement has been defined as the combined, unceasing efforts of everyone', 'Paul Batalden and Frank Davidoff (2007) defined quality improvement as the combined and unceasing efforts of everyone']] },

  // ================= Revenue Cycle Management =================
  // ---------------- pre-registration-insurance-verification
  ...(() => { const R = 'Rivet Health "front-end issues cause about half of denials" blog (cited [3], fetched 2026-10-09): "Some 44% of claim denials are caused by problems on the front end" and "Registration/eligibility problems account for 24% of denials" (Change Healthcare Denials Index); Staffingly page (cited [4], fetched): no ">20% human input errors" statement; rework cost search: ~$25 per claim for practices (MGMA) and ~$118 per claim for hospitals (Change Healthcare 2017); no source found for $181';
    return [
      { id: 'pre-registration-insurance-verification', key: 's2p1', verdict: 'FABRICATED', sources: R, claim: 'front-end issues cause roughly half of denials; registration+eligibility a little over one-quarter',
        pairs: [['The data is blunt: front-end issues cause roughly half of all claim denials, and registration plus eligibility problems alone account for a little over one-quarter of denied claims.', 'The data is blunt: about 44 percent of claim denials stem from front-end problems, and registration and eligibility issues alone account for about 24 percent (Change Healthcare Denials Index).']] },
      { id: 'pre-registration-insurance-verification', key: 's2p2', verdict: 'UNVERIFIABLE', sources: R, claim: 'Over 20 percent of denied claims involve human input errors',
        pairs: [['Over 20 percent of denied claims involve human input errors — a mistyped member ID, a misspelled name, a wrong date of birth.', 'Many of them come down to human input errors — a mistyped member ID, a misspelled name, a wrong date of birth.']] },
      { id: 'pre-registration-insurance-verification', key: 's2p3', verdict: 'UNVERIFIABLE', sources: R, claim: 'cost of $25 to $181 per claim to rework',
        pairs: [['at a cost of $25 to $181 per claim and weeks of delay.', 'at an estimated cost of roughly $25 per claim for physician practices (MGMA) and about $118 for hospitals (Change Healthcare), plus weeks of delay.']] },
      { id: 'pre-registration-insurance-verification', key: 's2sg1', verdict: 'FABRICATED', sources: R, claim: 'stats: ~50% front-end (industry); ~25%+ registration/eligibility; >20% human input errors',
        statsByIndex: { 0: { value: '~44%', context: 'Share of denials caused by front-end problems (Change Healthcare Denials Index)' },
                        1: { value: '~24%', context: 'Share of denials from registration and eligibility (Change Healthcare Denials Index)' },
                        2: { value: '~$25 / ~$118', label: 'Cost to Rework a Denial', context: 'Per claim: physician practices (MGMA) / hospitals (Change Healthcare)' } } },
      { id: 'pre-registration-insurance-verification', key: 'tw', verdict: 'FABRICATED', sources: R, claim: 'takeaways: about half of denials front-end, over a quarter registration/eligibility; over 20% human input errors',
        pairs: [['front-end issues cause about half of denials, and registration/eligibility alone over a quarter.', 'front-end issues cause about 44% of denials, and registration/eligibility alone about 24%.'],
                ['Over 20% of denied claims stem from human input errors like mistyped member IDs — eligibility systems require an exact match to payer records.', 'Many denials stem from human input errors like mistyped member IDs — eligibility systems require an exact match to payer records.']] },
      { id: 'pre-registration-insurance-verification', key: 'src3', verdict: 'UPDATED', sources: R, claim: 'source annotation: front-end issues cause about half of denials', pairs: [['— front-end issues cause about half of denials', '— 44% of denials from front-end problems; 24% from registration/eligibility (Change Healthcare Denials Index)']] },
      { id: 'pre-registration-insurance-verification', key: 'src4', verdict: 'UNVERIFIABLE', sources: R, claim: 'source annotation: >20% human input errors', pairs: [['exact-match requirement; >20% human input errors', 'exact-match requirement']] },
      { id: 'pre-registration-insurance-verification', key: 'src5', verdict: 'UPDATED', sources: R, claim: 'source annotation: registration/eligibility ~one-quarter of denials', pairs: [['— registration/eligibility ~one-quarter of denials; preventability', '— registration problems behind claim rejections; preventability']] },
    ]; })(),

  // ---------------- prior-authorization
  ...(() => { const A = 'AMA press release "AMA survey indicates prior authorization wreaks havoc on patient care" (cited [1], fetched 2026-10-09) reports the EARLIER survey (released June 2024): 43 PAs/week, 12 hours, 94% delays, 78% abandonment, 95% burnout, 35% dedicated staff. AMA "Fixing prior auth: Nearly 40 prior authorizations a week" (cited [2], fetched) reports the late-2024 survey: 39 per physician per week, 13 hours, 40% dedicated staff, 89% burnout';
    return [
      { id: 'prior-authorization', key: 'src1', verdict: 'MISATTRIBUTED', sources: A, claim: 'source [1] annotated with 2024-survey figures (13 hrs, 39 PAs, 93%, 89%, 82%) but the linked release reports the earlier survey',
        pairs: [['[1] 2024 AMA Prior Authorization Physician Survey (AMA) — https://www.ama-assn.org/press-center/ama-press-releases/ama-survey-indicates-prior-authorization-wreaks-havoc-patient-care — 13 hrs/week; 39 PAs per physician per week; 93% care delays; 89% burnout; 82% abandonment',
                 '[1] AMA Survey Indicates Prior Authorization Wreaks Havoc on Patient Care (AMA, June 2024 release of the prior-year survey) — https://www.ama-assn.org/press-center/ama-press-releases/ama-survey-indicates-prior-authorization-wreaks-havoc-patient-care — earlier survey: 43 PAs per week, 12 hours, 94% care delays, 78% abandonment, 95% burnout']] },
      { id: 'prior-authorization', key: 'src2', verdict: 'UPDATED', sources: A, claim: 'source [2] is where the 2024-survey figures come from',
        pairs: [['— volume of PA requests; 40% have staff working exclusively on PA', '— late-2024 AMA survey: 39 PAs per physician per week, 13 hours, 40% have staff working exclusively on PA, 89% burnout']] },
    ]; })(),

  // ---------------- patient-financial-counseling
  { id: 'patient-financial-counseling', key: 's5p1', verdict: 'UNVERIFIABLE', sources: 'CarePayment vendor blog "Half of Hospital Bills Go Unpaid" (cited [6]) is the only support; no primary source found for half of patient balances going unpaid',
    claim: 'half of patient balances can go unpaid',
    pairs: [['once a patient leaves with a balance, the odds of collecting fall sharply, and half of patient balances can go unpaid.', 'once a patient leaves with a balance, the odds of collecting fall sharply, and a large share of patient balances ultimately go unpaid.']] },

  // ---------------- clean-claims
  { id: 'clean-claims', key: 's5p2', verdict: 'UNVERIFIABLE', sources: 'Rework cost search (2026-10-09): ~$25 per claim for practices (MGMA) and ~$118 per claim for hospitals (Change Healthcare 2017); no source found for $181', claim: 'rework at $25 to $181 per claim',
    pairs: [['— at $25 to $181 per rework —', '— at roughly $25 per claim for practices and about $118 for hospitals —']] },

  // ---------------- clearinghouses-edi
  ...(() => { const C = 'OFR Brief 24-05 on the Change Healthcare cyberattack (cited [6], PDF fetched 2026-10-09): Feb 21 2024; largest US medical claims clearinghouse; ~189,000 providers use its services; no "half of claims" figure and no ransom amount. UnitedHealth/Senate testimony coverage (search): Change processes ~15 billion health care transactions a year and touches ~1 in 3 US patient records; UnitedHealth paid a $22 million ransom';
    return [
      { id: 'clearinghouses-edi', key: 's5p1', verdict: 'UNVERIFIABLE', sources: C, claim: 'Change Healthcare handles roughly half of all U.S. medical claims',
        pairs: [['Change Healthcare handles roughly half of all U.S. medical claims, so the attack', 'Change Healthcare processes about 15 billion health care transactions a year and touches roughly one in three U.S. patient records, so the attack']] },
      { id: 'clearinghouses-edi', key: 's5ex1', verdict: 'UNVERIFIABLE', sources: C, claim: 'example: the largest U.S. clearinghouse, handling about 50% of medical claims',
        pairs: [['the largest U.S. clearinghouse, handling about 50% of medical claims —', 'the largest U.S. clearinghouse, processing about 15 billion transactions a year —']] },
      { id: 'clearinghouses-edi', key: 'tw', verdict: 'UNVERIFIABLE', sources: C, claim: 'takeaway: attack halted ~50% of U.S. claims processing',
        pairs: [['which halted ~50% of U.S. claims processing for weeks', 'which halted claims processing for a large share of U.S. providers for weeks']] },
      { id: 'clearinghouses-edi', key: 'src5', verdict: 'UNVERIFIABLE', sources: C, claim: 'source annotation: ~50% of U.S. claims', pairs: [['largest clearinghouse; ~50% of U.S. claims; sector-wide disruption', 'largest clearinghouse; sector-wide disruption']] },
      { id: 'clearinghouses-edi', key: 'src6', verdict: 'MISATTRIBUTED', sources: C, claim: 'source annotation: OFR brief gives ~$22M ransom', pairs: [['concentration/single-point-of-failure risk; ~$22M ransom', 'concentration/single-point-of-failure risk (the $22M ransom was confirmed by UnitedHealth in 2024)']] },
    ]; })(),

  // ---------------- payer-contracts
  { id: 'payer-contracts', key: 's5p2', verdict: 'UNVERIFIABLE', sources: 'Only vendor blogs (MD Clarity, MBW RCM) cited; no independent estimate found for "several percent of annual revenue" recoverable from underpayments',
    claim: 'Industry estimates suggest providers can recover several percent of annual revenue lost to underpayments',
    pairs: [['Industry estimates suggest providers can recover several percent of annual revenue lost to underpayments this way — real money that contract management surfaces.', 'Providers routinely find recoverable underpayments this way — real money that contract management surfaces.']] },
];
