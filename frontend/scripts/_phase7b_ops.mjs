// Phase 7b source-integrity corrections (non-VBC Academy lessons). Each op targets one Sanity academyModule
// body block by _key. `pairs` are exact substring replacements inside that block's strings (each `old` must
// occur exactly once in the block, or be already replaced); `stats` replaces whole statGrid stat fields by stat _key.
// Every finding (claim, verdict, sources) is logged in docs/audits/phase7b_sources_2026-10.jsonl.

const SH = 'Shrank et al. (JAMA, 2019)';

export const OPS = [
  // ---------------- aiml-llm-clinical
  { id: 'aiml-llm-clinical', key: 's1stats', stats: {
      s1: { context: 'Nori and colleagues (Microsoft, 2023) found GPT-4 exceeded the USMLE passing score by more than 20 points without any medical fine-tuning or specialized prompting.',
            label: 'GPT-4 Margin Above USMLE Passing Score (Nori et al., Microsoft 2023)', value: '20+ pts' },
      s4: { context: 'A study of 263 clinicians across 6 US health systems using the Abridge ambient AI scribe found burnout fell from 51.9% to 38.8% (13.1 percentage points) and severe burnout fell 6.2 percentage points after 30 days.',
            label: 'Burnout Reduction with Ambient AI Scribe (JAMA Network Open, 2025)', value: '13.1pp' } },
    pairs: [['Med-PaLM 2 Accuracy on MedQA (Nature Medicine, 2024)', 'Med-PaLM 2 Accuracy on MedQA (Nature Medicine, 2025)']] },
  { id: 'aiml-llm-clinical', key: 'takeaways', pairs: [
      ['GPT-4 at approximately the 90th percentile on USMLE (Nori et al., Microsoft 2023) and Med-PaLM 2 at 86.5% accuracy on MedQA (Nature Medicine, 2024)',
       'GPT-4 exceeding the USMLE passing score by more than 20 points (Nori et al., Microsoft 2023) and Med-PaLM 2 at 86.5% accuracy on MedQA (Nature Medicine, 2025)'],
      ['A JAMA Network Open 2024 study of 186 clinicians across 6 health systems found a net 13.9 percentage-point reduction in burnout after one month of using the Abridge ambient AI scribe, with significant reductions in after-hours documentation time.',
       'A JAMA Network Open 2025 study of 263 clinicians across 6 health systems found burnout fell from 51.9% to 38.8% after 30 days of using the Abridge ambient AI scribe, with less after-hours documentation time.']] },
  { id: 'aiml-llm-clinical', key: 's1p3', pairs: [['the follow-on Med-PaLM 2 paper in Nature Medicine (2024)', 'the follow-on Med-PaLM 2 paper in Nature Medicine (2025)']] },
  { id: 'aiml-llm-clinical', key: 's2p2', pairs: [
      ['A Microsoft survey of 879 clinicians in 2024 found an average of 5 minutes saved per encounter; other implementations have reported up to 50% reductions in documentation time, with some institutions reporting 7 minutes saved per visit. Nuance\'s own data showed a 70% reduction in feelings of burnout and fatigue among DAX users.',
       'Microsoft reports that clinicians using DAX Copilot save an average of five minutes per encounter and that 70% of clinicians report reduced feelings of burnout and fatigue — vendor-reported figures that independent evaluations are still testing.']] },
  { id: 'aiml-llm-clinical', key: 's2example', pairs: [
      ['MUSC Health reported a 20% reduction in documentation time following DAX Copilot adoption.',
       'MUSC Health reported that providers who used DAX Copilot for five months saw a 20% decrease in time spent charting outside of work hours.']] },

  // ---------------- aiml-change-management
  { id: 'aiml-change-management', key: 's1p1', pairs: [
      ['A widely cited analysis drawing on data from RAND Corporation and McKinsey found that nearly 79 percent of healthcare AI initiatives fail to deliver their intended value.',
       'A 2024 RAND Corporation study, based on interviews with experienced data scientists and engineers, found that more than 80 percent of AI projects across industries fail — twice the failure rate of IT projects that do not involve AI.']] },
  { id: 'aiml-change-management', key: 's2p1', pairs: [
      ['No single factor predicts AI implementation success more reliably than the presence of engaged clinical champions. A 2022 systematic review published in Implementation Science Communications screened over 7,500 records and synthesized 35 studies on champion effectiveness across healthcare innovation deployments. The review found that champions serve as promoters and cultural translators — bridging the language gap between technology teams and frontline clinicians, and lending social credibility to tools that might otherwise be viewed with suspicion. The most effective champions shared a specific profile: they were respected peers at the clinical level, possessed genuine subject-matter expertise, and carried formal backing from executive leadership.',
       'Clinical champions are one of the most widely used implementation strategies, and the evidence for them is encouraging but thinner than their popularity suggests. A 2022 systematic review published in Implementation Science Communications screened 7,566 records and included 35 quantitative studies of champions in health care. In a subset of seven studies, five found that exposure to champions was associated with increased organizational use of best practices, programs, or technologies; evidence on use by individual clinicians and patients, and on outcomes, was mixed or scarce. The practical lesson for AI deployment: appoint champions, but define what they do and evaluate whether it works.']] },
  { id: 'aiml-change-management', key: 's2ex', pairs: [
      ['During EHR-based predictive model deployments studied in a 2020 PMC systematic review, 22 of 32 studies (69%) that included structured clinical engagement demonstrated improvement in patient outcomes after model implementation. Systems that lacked designated clinical advocates showed consistently lower adoption rates and higher rates of alert fatigue — clinicians learned to dismiss AI outputs reflexively rather than engage with them thoughtfully.',
       'A 2020 systematic review of predictive models embedded in EHRs (Lee et al., Informatics) found that of 32 implementations that reported effects on clinical outcomes, 22 (69%) showed improvement after the model went live. The barriers the review catalogued — alert fatigue, lack of training, and added workload for the care team — are exactly the problems a clinical champion exists to surface and manage.']] },
  { id: 'aiml-change-management', key: 's3p3', pairs: [
      ['A 2022 PubMed-indexed study applying FMEA to an automated clinical contouring and treatment planning tool identified 126 distinct workflow errors — the leading categories were automation bias, operator error, and software error — none of which would have been visible without prospective analysis.',
       'A 2019 FMEA of the Radiation Planning Assistant, an automated contouring and treatment-planning tool, identified 290 failure modes, 126 of them unique to the automated workflow; the ten highest-risk failure modes were driven by automation bias, operator error, and software error — none of which would have been visible without prospective analysis.']] },
  { id: 'aiml-change-management', key: 's5p2', pairs: [
      ['The AHRQ 2018 Patient Safety Survey found that 47 percent of respondents felt that unsafe event reports were held against them,',
       'In AHRQ\'s 2018 Hospital Survey on Patient Safety Culture database, covering more than half a million staff in 1,128 hospitals, "nonpunitive response to error" was the lowest-scoring dimension — only 47 percent responded positively, meaning roughly half of staff feel their mistakes and event reports are held against them —']] },
  { id: 'aiml-change-management', key: 's5sg', stats: {
      s1: { context: 'AHRQ Hospital Survey on Patient Safety Culture, 2018 database (lowest-scoring dimension)', label: 'Staff responding positively on "nonpunitive response to error"', value: '47%' },
      s3: { context: 'Lee et al., Informatics, 2020 — 22 of 32 EHR-embedded predictive models that reported clinical outcomes', label: 'of EHR-embedded predictive models showed improved outcomes', value: '69%' } } },

  // ---------------- aiml-clinical-decision-support
  { id: 'aiml-clinical-decision-support', key: 's2p2', pairs: [['A 2024 meta-analysis of randomized controlled trials found', 'A 2025 meta-analysis of randomized controlled trials found']] },

  // ---------------- aiml-deterioration-models
  { id: 'aiml-deterioration-models', key: 's4p2', pairs: [
      ['A 2017 BMC Medical Informatics study found that if a clinician overrode an alert the first time, subsequent identical alerts for the same patient were overridden at a rate of 87.9%.',
       'A 2017 study in BMC Medical Informatics and Decision Making found that the likelihood of a clinician accepting a reminder fell by 30% for each additional reminder in an encounter, and by 10% for each 5-point rise in the share of reminders that were repeats for the same patient.']] },
  { id: 'aiml-deterioration-models', key: 's5ex', pairs: [
      ['The prospective feasibility study by Churpek et al., published in CHEST (2016),', 'The prospective feasibility study by Kang, Churpek and colleagues, published in Critical Care Medicine (2016),'],
      ['In the subsequent Australian validation across 107,000+ patients, eCART (AUROC 0.801) consistently outperformed NEWS (0.718) and MEWS (0.698) on the same composite outcome',
       'In a subsequent comparison across 107,868 admissions at five U.S. hospitals (Green et al., Resuscitation, 2018), eCART (AUROC 0.801) outperformed NEWS (0.718), MEWS (0.698), and Australia\'s Between the Flags criteria (0.663) on the same composite outcome']] },

  // ---------------- aiml-fda-cleared-cases
  { id: 'aiml-fda-cleared-cases', key: 's5p2', pairs: [
      ['However, a 2024 scoping review published in npj Digital Medicine examined 903 FDA-cleared AI-enabled medical devices and found that only 55.9 percent had publicly available clinical performance data at the time of their clearance. Only 9.0 percent of cleared devices included a prospective post-market surveillance plan. Only 1.9 percent provided a link to a peer-reviewed scientific publication with full safety and efficacy data.',
       'However, a 2025 cross-sectional study in JAMA Network Open examined all 903 AI-enabled medical devices on the FDA\'s list as of August 2024 and found that clinical performance studies were reported for only 505 (55.9 percent); 218 (24.1 percent) explicitly stated that no performance study was conducted. Of the studies reported, only 8.1 percent were prospective and 2.4 percent randomized.']] },
  { id: 'aiml-fda-cleared-cases', key: 's5sg', stats: {
      s1: { context: 'Windecker et al., JAMA Network Open 2025 — all 903 FDA-listed AI devices as of Aug 2024', label: 'Cleared AI devices reporting a clinical performance study', value: '55.9%' },
      s2: { context: 'Windecker et al., JAMA Network Open 2025 — most evidence is retrospective', label: 'Reported performance studies that were prospective', value: '8.1%' } } },

  // ---------------- interop
  { id: 'interop-hie-models', key: 's5p3', pairs: [
      ['and 78 percent of countries with electronic health data exchange regulations now mandate or advise FHIR.',
       'and 78 percent reported regulations for electronic health data exchange, with 73 percent saying FHIR is mandated or formally advised.']] },
  { id: 'interop-vermont-vitl', key: 's2_p5', pairs: [["Under Beth Anderson's leadership as CEO (2020-2025)", "Under Beth Anderson's leadership as CEO (2019-2025)"]] },
  { id: 'interop-vermont-vitl', key: 's5_p6', pairs: [
      ["The 2025 VITL Annual Report (submitted to the Vermont Legislature in January 2026) noted that the VITL team spent the end of 2025 mapping a new strategic future — exploring new technologies and interoperability approaches to meet the health system's evolving needs in 2026 and beyond. With a new CEO in place following Beth Anderson's departure in July 2025,",
       "With Randy Farmer — previously chief operating officer of the Delaware Health Information Network — in place as president and CEO since December 2025, following Beth Anderson's departure in July 2025,"]] },
  { id: 'interop-ehr-burden', key: 's1p2', pairs: [
      ['A 2024 study published in the Annals of Family Medicine found that for every 8 hours of scheduled patient visits, primary care physicians logged 5.3 additional hours in the EHR — 2.1 of those hours devoted exclusively to clinical documentation.',
       'A 2024 study of 141 academic primary care physicians, published in the Annals of Family Medicine, found that their EHR time per 8 hours of scheduled appointments kept rising after the pandemic — up 28.4 minutes (7.8%) between 2019–20 and 2022–23, driven by order entry (+58.9%) and the inbox (+24.4%).']] },
  { id: 'interop-ehr-burden', key: 'qz1', pairs: [
      ['The 2024 AMA survey of 1,000 practicing physicians found that approximately 24 percent — nearly one in four — reported',
       'The 2024 AMA survey of 1,000 practicing physicians found that 29 percent — more than one in four — reported'],
      ['19% cited delays causing hospitalization, 13% identified life-threatening events, and 7% reported disability or death as downstream consequences of authorization delays.',
       '8% reported that prior authorization led to a patient\'s disability, permanent bodily damage, or death.'],
      ['About 24% — nearly one in four physicians have seen serious patient harm from prior auth delays', 'About 29% — more than one in four physicians have seen serious patient harm from prior auth delays']] },
  { id: 'interop-ehr-burden', key: 'tkwy', pairs: [['and 24% report it has led to serious patient harm.', 'and 29% report it has led to serious patient harm.']] },
  { id: 'interop-ehr-burden', key: 's3sg', pairs: [['"value":"24%"', null]], stats: { __byLabel: { 'Physicians: prior auth caused serious harm': { value: '29%' } } } },
  { id: 'interop-why-it-matters', key: 's1sg', stats: { __byLabel: { 'Redundant Testing Waste Per Year': {
      context: 'Among 85 patients transferred between two hospitals with incompatible EHRs, 32% had a test repeated within 12 hours and 20% at least one duplicate that was not clinically indicated (Stewart et al., JAMIA, 2010)',
      label: 'Transferred Patients With Duplicate Tests Within 12 Hours', value: '32%' } } } },
  { id: 'interop-why-it-matters', key: 's2p3', pairs: [
      ['A landmark study published in BMC Medical Informatics found that duplication of testing',
       'A study of 85 patients transferred between two hospitals with incompatible EHRs, published in the Journal of the American Medical Informatics Association in 2010, found that duplication of testing'],
      [' Across the system, redundant testing alone is estimated to waste up to $5 billion annually in the United States.', '']] },
  { id: 'interop-why-it-matters', key: 's2hl', pairs: [
      ['Duplicate and redundant medical testing — driven largely by inaccessible prior records — wastes an estimated $5 billion per year in the United States, according to research published in BMC Medical Informatics and affiliated studies.',
       'Duplicate testing follows inaccessible records: when two hospitals\' EHRs could not exchange data, nearly one in three transferred patients had a test repeated within 12 hours (Stewart et al., JAMIA, 2010).']] },
  { id: 'interop-why-it-matters', key: 's8tk', pairs: [
      [', with redundant testing alone costing up to $5 billion per year in the United States.', ', and duplicate testing rises when records cannot follow the patient across incompatible EHRs.']] },
  { id: 'interop-why-it-matters', key: 's8qz', pairs: [
      ['while $5 billion estimates annual duplicate testing waste and $42 billion is the WHO\'s estimate of global annual medication error costs.',
       '$42 billion is the WHO\'s estimate of global annual medication error costs, and $5 billion is not a CAQH figure.']] },
  { id: 'interop-why-it-matters', key: 's9s3', pairs: [
      ['Vest JR, Kern LM, Silver MD, Kaushal R. "The Potential For Increased Use Of Health Information Exchange To Reduce Costs And Improve Quality." Health Affairs.',
       'Chen M, Guo S, Tan X. "Does Health Information Exchange Improve Patient Outcomes? Empirical Evidence From Florida Hospitals." Health Affairs, 2019;38(2):197-204.']] },
  { id: 'interop-why-it-matters', key: 's9s5', pairs: [
      ['van Walraven C, Rokosh E. "What is necessary for high-quality discharge summaries?" American Journal of Medical Quality. PMC preliminary look at duplicate testing:',
       'Stewart BA, Fernandes S, Rodriguez-Huertas E, Landzberg M. "A preliminary look at duplicate testing associated with lack of electronic health record interoperability for transferred patients." Journal of the American Medical Informatics Association, 2010.']] },
  { id: 'interop-davinci-gravity', key: 's3example', pairs: [['At HIMSS 2025, MultiCare', 'At HIMSS23, MultiCare']] },
  { id: 'hie-21st-century-cures', key: 's5ex', pairs: [
      ['Epic Systems — the largest EHR vendor in the United States, used by roughly 35% of U.S. hospitals — built its "App Orchard" ecosystem directly in response to the Cures Act interoperability mandates. App Orchard is a marketplace where third-party developers publish SMART on FHIR applications that connect to Epic\'s FHIR R4 API.',
       'Epic Systems — the largest EHR vendor in the United States, used by about 42% of U.S. acute care hospitals at the end of 2024 (KLAS) — had launched its App Orchard developer marketplace around 2017, before the Cures Act rules took effect; App Orchard was renamed App Market in 2021 and shut in December 2022, replaced by Connection Hub, Vendor Services, and later Showroom. What the Cures Act changed was the floor: ONC\'s 2020 rule required certified EHRs to expose a standardized FHIR R4 API that third-party SMART on FHIR applications can connect to.']] },

  // ---------------- readmissions, quality, payment
  { id: 'aiml-readmission-prediction', key: 's1p3', pairs: [
      ['According to CMS projections for fiscal year 2026, the HRRP penalty is estimated to affect approximately 82.8 percent of all eligible hospitals — roughly 2,828 hospitals — making it one of the most broadly applied financial penalties in Medicare.',
       'Preliminary CMS data for fiscal year 2026 show only 641 hospitals (21.8 percent) escaping a penalty — so about 78 percent of evaluated hospitals are penalized, and 240 (8.1 percent) face reductions of 1 percent or more — making it one of the most broadly applied financial penalties in Medicare.']] },
  { id: 'aiml-readmission-prediction', key: 's5sg2', stats: { __byLabel: { 'Hospitals Penalized Under HRRP (FY2026)': {
      context: 'Preliminary CMS FY2026 data: only 641 hospitals (21.8%) avoid a penalty; 240 (8.1%) face cuts of 1% or more', value: '~78%' } } } },
  { id: 'social-risk-adjustment', key: 's2ex1', pairs: [
      ['The Hospital Readmissions Reduction Program (HRRP), established by the ACA in 2012,', 'The Hospital Readmissions Reduction Program (HRRP), created by the ACA in 2010 with penalties beginning in fiscal year 2013,'],
      ["A 2016 Health Affairs analysis found that safety-net hospitals were three times more likely to receive the maximum readmission penalty than non-safety-net hospitals, despite evidence that their readmission rates were largely driven by patients' social circumstances rather than poor hospital care. Congress partially addressed this in the Consolidated Appropriations Act of 2021, which created a peer-grouping system",
       "Critics argued that much of the gap reflected patients' social circumstances rather than poor hospital care. Congress partially addressed this in the 21st Century Cures Act of 2016, which required a peer-grouping system — applied from fiscal year 2019 —"]] },
  { id: 'fee-for-service-origins', key: 's2p2', pairs: [['A survey published in JAMA Internal Medicine found that physicians themselves reported', 'A 2017 survey of 2,106 physicians published in PLOS ONE found that physicians themselves reported']] },
  { id: 'bundled-payment-evidence', key: 's2sg1', stats: { __byLabel: {
      'Avg. Per-Episode Cost Reduction': { context: 'Hip and knee replacement under BPCI Model 2 — Dummit et al., JAMA 2016' },
      'CJR Mandatory Model Savings': { context: 'Net Medicare savings from Comprehensive Care for Joint Replacement, performance years 2016–2018, after reconciliation payments — CMS third annual evaluation', value: '$61.6M' },
      'Patient Satisfaction (CJR)': { context: 'CMS evaluation: CJR and control patients reported similar satisfaction with recovery and care management', label: 'Patient Satisfaction (CJR vs. control)', value: 'Similar' },
      'Lower Medical Costs vs. FFS': { context: 'Gross reduction in CJR episode payments, PY2016–2018, before $90.5M in reconciliation payments — CMS third annual evaluation', label: 'CJR Gross Medicare Savings', value: '$152.1M' } } } },
  { id: 'bundled-payment-evidence', key: 's3p1', pairs: [
      ['A rigorous study published in JAMA Internal Medicine evaluating BPCI Model 2 participation for heart failure', 'A 2024 study published in JAMA Cardiology evaluating BPCI Model 2 participation for heart failure (18 BPCI hospitals versus 211 comparison hospitals)'],
      ['In other words, the bundle had no detectable effect on either cost or quality for this high-volume condition.', 'In other words, the bundle had no detectable effect on quality or outcomes for this high-volume condition.']] },
  { id: 'bundled-payment-evidence', key: 's3ex1', pairs: [['A study published in early 2024 analyzing BPCI participation', 'A study published in JAMA Cardiology in early 2024 analyzing BPCI participation']] },
  { id: 'bundled-payment-mechanics', key: 's4ex1', pairs: [
      ['found that per-episode spending declined on average by $1,014 — approximately a 4% reduction — by Model Year 5, while the model as a whole saved Medicare',
       'are a large part of why the model as a whole saved Medicare']] },
  { id: 'bundled-payments-and-innovation', key: 's5p1', pairs: [
      ['found that only six produced statistically significant savings — and none exceeded about $220 million in annual savings. Factoring in CMMI’s operating budget, its net budgetary impact has been only marginally negative.',
       'found that only six of the 49 models it examined produced statistically significant savings, and that over 2011–2020 CMMI increased federal direct spending by about $5.4 billion — roughly 0.1 percent of net Medicare spending — once its operating costs were counted.']] },
  { id: 'chargemaster-gross-net-revenue', key: 's4ex1', pairs: [
      ['— yet CMS had fined only 18 hospitals nationwide.', '— yet by February 2024 CMS had issued only 14 civil monetary penalties, totaling about $4 million.']] },
  { id: 'aiml-population-health-ai', key: 's3ex', pairs: [
      ['A 12-provider rural ACO', 'Consider a hypothetical illustration: a 12-provider rural ACO'],
      ['A Regional ACO Closes Diabetic Retinal Exam Gaps', 'Illustrative Scenario: A Regional ACO Closes Diabetic Retinal Exam Gaps']] },

  // ---------------- Five Pillars course
  { id: 'academyModule-five-pillars-apm-readiness-vbc-financial-modeling', key: 'dcdf27455202', pairs: [
      ["Vermont's critical access hospitals carry an average 12% HCC coding gap, according to a 2025 Rural Health Redesign Center assessment -- real revenue and accuracy left on the table simply because documentation does not capture patients' actual complexity.",
       "Every uncoded condition is real revenue and accuracy left on the table simply because documentation does not capture patients' actual complexity."]] },
  { id: 'academyModule-five-pillars-knowledge-infrastructure-technical-assistance', key: '1362965736bb', removeStats: ['9659c63ce567'] },
  { id: 'academyModule-five-pillars-workforce-as-the-binding-constraint', key: '29c7bd6054a2', stats: {
      '771b1576790f': { context: 'Source: HTR book, operations metrics framework (a proposed target, not an AHS figure)', label: 'Target range for travel nursing as a share of total hospital labour cost in the HTR operations metrics framework' } } },
  { id: 'academyModule-five-pillars-voluntary-vs-mandatory-architecture', key: '34111ebafa9e', pairs: [
      ['found the plan saved $47.8 million in the two years after implementation.', 'found the plan saved an estimated $47.8 million in inpatient and outpatient costs over its first three years, state fiscal years 2017 through 2019.']] },

  // ---------------- Precision medicine course
  { id: 'academyModule-precision-medicine-m1', key: 'ae7statgrid3', stats: {
      ae7sg3s1: { context: 'Illness and death from non-optimized medication therapy cost an estimated $528.4 billion in 2016 — about 16% of US health spending. Genetic variation in drug response is one contributor pharmacogenomics can address. Source: Watanabe, McInnis & Hirsch, Annals of Pharmacotherapy, 2018.',
                  label: 'Estimated annual US cost of non-optimized medication therapy (2016)' } }, statsByIndex: { 2: {
                  context: 'Roughly 75,000 genetic tests were on the US market, with about ten new tests entering every day. Source: Phillips et al., Health Affairs, 2018.',
                  label: 'Genetic tests on the US market', value: '~75,000' } } },
  { id: 'academyModule-precision-medicine-m1', key: 'ae6example2', pairs: [
      ['managed care for approximately 190,000 Vermonters until both the model and OneCare wound down at the end of 2025.', 'coordinated care for Vermonters attributed through Medicare, Medicaid, and commercial payers until both the model and OneCare wound down at the end of 2025.'],
      ['OneCare Vermont 2025 Annual Report; Vermont Health Information Exchange overview.', 'OneCare Vermont wind-down announcement (November 7, 2024), reported by VTDigger; Vermont Health Information Exchange overview.']] },
  { id: 'academyModule-precision-medicine-m1', key: 'ad4example1', pairs: [
      ['Among patients with actionable CYP2C19 variants, the program increased prescribing of alternative antiplatelet agents from 4.5% to 72.9%, demonstrating that pre-emptive genotyping with EHR integration can successfully redirect prescribing before harm occurs.',
       'Among 2,676 genotyped patients, 514 (19.2%) carried a CYP2C19 variant affecting clopidogrel; within 12 months, 57.6% of poor metabolizers and 33.2% of intermediate metabolizers had been switched to an alternative antiplatelet drug, and genotype was the strongest predictor of switching — showing that pre-emptive genotyping with EHR integration can redirect prescribing before harm occurs.'],
      ['Pulley et al., Clinical Pharmacology & Therapeutics, 2012; Vanderbilt PREDICT Program reports.', 'Pulley et al., Clinical Pharmacology & Therapeutics, 2012; Peterson et al., Clinical Pharmacology & Therapeutics, 2016.']] },
  { id: 'academyModule-precision-medicine-m3-economics', key: 'm3sg0003', stats: {
      m3st0007: { context: `${SH} estimated $760B–$935B in annual waste — about a quarter of US health spending — including $102B–$166B from failures of care delivery and $27B–$78B from failures of care coordination, the domains precision medicine can address.`,
                  label: 'Annual waste in U.S. healthcare (2019 estimate)', value: '$760B–$935B' },
      m3st0008: { context: `The same analysis put overtreatment and low-value care — including treatments that do not work for the patient receiving them — at $75.7B–$101.2B a year. (${SH})`,
                  label: 'Annual cost of overtreatment and low-value care', value: '$76B–$101B' },
      m3st0009: { context: 'Average insurer-allowed costs in the year after diagnosis were $82,121 for stage I/II breast cancer versus $134,682 for stage IV, making early detection an economic as well as clinical imperative. (Blumen et al., American Health & Drug Benefits, 2016)',
                  label: 'Cost differential: Stage I/II vs. Stage IV breast cancer treatment', value: '1.6x' } } },
  { id: 'academyModule-precision-medicine-m4-technology', key: 'm4ex0001', pairs: [
      ['Ambry Genetics, a major clinical genomics laboratory, published a landmark study tracking the reclassification of VUSs in hereditary cancer genes (BRCA1, BRCA2, and others) over a 5-year period. Of VUSs identified between 2012–2017, approximately 38% were subsequently reclassified — and the vast majority were reclassified as benign or likely benign rather than pathogenic.',
       'Mersch and colleagues examined hereditary cancer testing of 1.45 million people at a single large commercial laboratory between 2006 and 2016. Of 26,670 unique variants of uncertain significance, 7.7% were reclassified during follow-up — and 91.2% of those were downgraded to benign or likely benign rather than upgraded to pathogenic. Because many VUSs recur across patients, 24.9% of all VUS results reported to individuals were eventually reclassified.'],
      ['Ambry Genetics: Tracking VUS Reclassification Over Time', 'Tracking VUS Reclassification Over Time']] },
  { id: 'academyModule-precision-medicine-m4-technology', key: 'm4ex0002', pairs: [
      ['Over 14,000 patients were enrolled in the first phase.', 'Almost 15,000 patients had been genotyped through PREDICT as part of routine care by the mid-2010s.'],
      ['CDS alerts fired appropriately in 96% of relevant prescribing encounters, and the program demonstrated that pre-emptive PGx testing with EHR integration was technically feasible and clinically effective at scale — a model replicated by over 60 health systems including UVM Medical Center.',
       'The program demonstrated that pre-emptive PGx testing with EHR integration was feasible in routine care and changed prescribing: in a 2016 analysis of 2,676 genotyped patients, CYP2C19 status was the strongest predictor of switching away from clopidogrel.'],
      ["Dunnenberger HM et al., 'Preemptive Clinical Pharmacogenomics Testing: Mayo-Vanderbilt Collaborative Research Program,' Mayo Clinic Proceedings 2015", 'Pulley JM et al., Clinical Pharmacology & Therapeutics, 2012; Peterson JF et al., Clinical Pharmacology & Therapeutics, 2016']] },
  { id: 'academyModule-precision-medicine-m5-clinical', key: 'm5sg0002', stats: {
      m5st002a: { context: 'Varies by ancestry: about 2% of people of European ancestry, 4% of African Americans, and 14% of Chinese individuals are poor metabolizers who do not effectively activate clopidogrel. (NCBI Medical Genetics Summaries: Clopidogrel Therapy and CYP2C19 Genotype)',
                  label: 'CYP2C19 poor metabolizers, by ancestry', value: '2–14%' },
      m5st002b: { context: 'Prospective HLA-B*5701 screening before abacavir prescribing has virtually eliminated this life-threatening drug reaction. (Mallal et al., New England Journal of Medicine, 2008)' },
      m5st002c: { context: 'In 487,409 UK Biobank participants, 99.5% carried at least one genotype predicting an atypical response to a drug covered by CPIC guidance. (McInnes et al., Clinical Pharmacology & Therapeutics, 2021)' } } },
  { id: 'academyModule-precision-medicine-m6-equity', key: 'm6sg0001', stats: {
      m6st001a: { context: 'As of 2018, 78% of genome-wide association study participants were of European ancestry, 10% Asian, and 2% African. (Sirugo, Williams & Tishkoff, Cell, 2019)', label: 'GWAS participants of European ancestry (2018)' },
      m6st001b: { context: 'People of African ancestry — the most genetically diverse population on Earth — made up about 2% of GWAS participants as of 2018. (Sirugo, Williams & Tishkoff, Cell, 2019)', label: 'GWAS participants of African ancestry (2018)', value: '2%' },
      m6st001c: { context: 'Polygenic scores built from UK Biobank data predicted disease risk about 4.5 times more accurately for people of European ancestry than for people of African ancestry. (Martin et al., Nature Genetics, 2019)', label: 'PRS accuracy gap, European vs. African ancestry', value: '4.5x' } } },
  { id: 'academyModule-precision-medicine-m6-equity', key: 'm6blk009', pairs: [
      ['A 2019 study in Cell found that PRS trained on European populations had substantially lower predictive accuracy when applied to non-European populations — and that the gap was largest for individuals of African ancestry, who were farthest from the training population genetically.',
       'A 2019 study in Nature Genetics (Martin et al.) found that polygenic scores built from predominantly European data predicted risk about 4.5 times more accurately for people of European ancestry than for people of African ancestry, who are genetically farthest from the training population.']] },
  { id: 'academyModule-precision-medicine-m6-equity', key: 'm6blk040', pairs: [
      ['Rural patients with cancer face documented disparities in receiving tumor genomic profiling — the first step in precision oncology. A study published in JNCI Cancer Spectrum in 2023 found that rural cancer patients were significantly less likely to receive comprehensive genomic profiling than urban patients, even after controlling for insurance status, cancer stage, and cancer type. This means rural patients are less likely to be identified as candidates for targeted therapies they might benefit from.',
       'Rural patients with cancer have historically had less access to tumor genomic profiling — the first step in precision oncology — because testing and molecular expertise concentrate in academic centers. Programs that bring testing to community practices can close that gap: a 2024 study in JNCI Cancer Spectrum of 1,258 patients in the Maine Cancer Genomics Initiative, which deployed tumor testing through community and rural oncology practices, found that rurality was not associated with receipt of genome-matched treatment. Access, not geography itself, is the barrier.']] },
];
