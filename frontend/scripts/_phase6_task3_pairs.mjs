// Phase 6 task 3 replacement pairs (shared by the Sanity sweep and the Supabase fallback pass).
export const S_VT = 'CMS "Vermont All-Payer ACO Model" page (2017-01-01 to 2025-12-31); VTDigger 2026-03-13 "Vermont\'s 8-year all-payer health care experiment sunset at the end of 2025"; OneCare Vermont wind-down announced Nov 2024, effective end of 2025; WCAX / Vermont Public 2026-07-28 (Vermont withdrew from AHEAD); Vermont Act 68 (2025) Act Summary, legislature.vermont.gov (GMCB to establish global hospital budgets for one or more non-CAH hospitals by HFY2027 and all hospitals by HFY2030; reference-based prices by HFY2027; Strategic Plan due January 15, 2028)';
export const S_AHEAD = 'CMS AHEAD Model page (5 state participants: Cohort 1 Maryland; Cohort 2 Connecticut and Hawaii; Cohort 3 Rhode Island and New York; Sept 3 2025 changes: Cohort 2-3 performance period begins 2028-01-01; model through 2035-12-31); CMS Maryland TCOC page (transitioned to AHEAD, implementation from January 2026); WCAX / Vermont Public 2026-07-28 (Vermont withdrawal)';
export const S_PA = 'CMS "Pennsylvania Rural Health Model" page: 2017-01-01 to 2024-12-31; all-payer global budgets in performance years 2019-2024';
export const S_BPCI = 'The Lewin Group for CMS, BPCI Advanced Final Evaluation Report (August 2026): ~$800M net Medicare savings over 8 model years, losses MY1-3; ~$1,000/episode reduction MY3-6; readmissions similar to comparison group; less favorable functional status MY7-8. CMS BPCI Advanced Fifth Annual Report executive summary (2024): "Savings in Model Year 5 totaled $344 million". CMS BPCI Advanced page: model ended 2025-12-31. CMS TEAM page: began 2026-01-01, runs through 2030-12-31';
export const S_OBBBA = 'Public Law 119-21 (One Big Beautiful Bill Act, signed 2025-07-04): community engagement requirements for Medicaid expansion adults 19-64 effective January 1, 2027 (NACo, "CMS Issues Interim Final Rule on Medicaid Community Engagement Requirements"; Norton Rose Fulbright, "Medicaid community engagement guidance")';
export const S_SP = 'Vermont Act 68 (2025) Act Summary, legislature.vermont.gov: Statewide Health Care Delivery Strategic Plan "is due to the General Assembly by January 15, 2028"';

export const R = (old, nw, src, note) => ({ old, new: nw, src, note });
export const groups = [
  { ids: ['ahead-model-year-one-financial-outcomes'], pairs: [
    R('AHEAD enlists six states across three cohorts: Maryland (Cohort 1, building on its mature existing model), Connecticut, Hawaii, and Vermont (Cohort 2), and Rhode Island and New York (Cohort 3), with implementation beginning in 2026 and rolling forward,',
      'AHEAD now has five state participants across three cohorts: Maryland (Cohort 1, building on its mature existing model), Connecticut and Hawaii (Cohort 2), and Rhode Island and New York (Cohort 3); Vermont signed as a Cohort 2 state in January 2025 but withdrew in July 2026. Maryland began in January 2026, and after CMS\'s September 2025 changes the performance period for Cohorts 2 and 3 begins January 1, 2028,',
      S_AHEAD, 'Roster listed Vermont as a current participant (withdrew July 2026) and implied all cohorts begin 2026.'),
    R('it includes Maryland (the global-budget pioneer) and Vermont (independently pursuing global budgets through Act 167), alongside states newer to the approach',
      'it pairs Maryland (the global-budget pioneer) with states newer to the approach', S_AHEAD, 'Vermont is no longer on the roster.'),
    R('six states (Maryland, Connecticut, Hawaii, Vermont, Rhode Island, New York) committing', 'five states (Maryland, Connecticut, Hawaii, Rhode Island, New York) committing', S_AHEAD, 'Six-state roster including Vermont is stale.'),
    R('enlisting six states to put hospitals on fixed budgets', 'enlisting five states to put hospitals on fixed budgets', S_AHEAD, 'Six-state roster including Vermont is stale.'),
    R('AHEAD is young — early cohorts only begin performance in 2026 —', 'AHEAD is young — Maryland entered in January 2026 and Cohorts 2 and 3 begin performance on January 1, 2028 —', S_AHEAD, 'Cohort 2-3 performance start moved to 2028 (Sept 2025).'),
    R('Maryland, Connecticut, Hawaii, Vermont, Rhode Island, New York (3 cohorts)', 'Maryland, Connecticut, Hawaii, Rhode Island, New York (3 cohorts; Vermont withdrew July 2026)', S_AHEAD, 'Table roster stale.'),
    R('Through Dec 31, 2035; performance begins 2026', 'Through Dec 31, 2035; Maryland from 2026, Cohorts 2-3 performance from Jan 1, 2028', S_AHEAD, 'Table timeline stale.'),
    R('how Vermont\'s AHEAD participation interacts with its independent Act 167 global-budget effort;', 'whether other states follow Vermont, which withdrew in July 2026 to pursue hospital global budgets under its own state law (Act 68);', S_AHEAD, 'Key signal presumed ongoing Vermont participation.'),
  ] },
  { ids: ['capitation-mechanics-rvu-volume'], pairs: [
    R('through AHEAD\'s six states and Vermont\'s statewide effort', 'through AHEAD\'s five participating states and Vermont\'s statewide effort under its own state law', S_AHEAD, 'AHEAD has five participants after Vermont withdrew.'),
  ] },
  { ids: ['uninhabitable-math-vermont-healthcare-cliff'], pairs: [
    R('Vermont\'s central tools are hospital global budgets and reference-based pricing, pursued alongside the federal AHEAD model, which pairs hospital global budgets with statewide cost-growth targets.',
      'Vermont\'s central tools are hospital global budgets and reference-based pricing, which Vermont planned to pursue alongside the federal AHEAD model (pairing hospital global budgets with statewide cost-growth targets) until it withdrew from AHEAD in July 2026; both now rest on state law, Act 68 of 2025.',
      S_VT, 'Presented AHEAD as Vermont\'s current vehicle; Vermont withdrew July 2026.'),
    R('driving global budgets and reference-based pricing under AHEAD.', 'driving global budgets and reference-based pricing, now under state law (Act 68) after Vermont\'s July 2026 withdrawal from AHEAD.', S_VT, 'Summary presented AHEAD as current for Vermont.'),
  ] },
  { ids: ['health-economics-fundamentals-vermont-act-167'], pairs: [
    R('hospital global budgets, reference-based pricing, and the multi-state AHEAD model —', 'hospital global budgets, reference-based pricing, and, until Vermont withdrew in July 2026, the multi-state AHEAD model —', S_VT, 'AHEAD listed as a current Vermont reform.'),
    R('The fix must be cost-saving structural reform (global budgets, AHEAD), not cost-shifting', 'The fix must be cost-saving structural reform (global budgets, reference-based pricing), not cost-shifting', S_VT, 'Summary listed AHEAD as a current Vermont reform.'),
  ] },
  { ids: ['global-budget-models-international-lessons-rural-us'], pairs: [
    R('specifically for critical access and rural hospitals, operating from 2019.', 'specifically for critical access and rural hospitals, operating from 2019 through 2024.', S_PA, 'PA Rural Health Model ended 2024-12-31.'),
    R('whether the Pennsylvania Rural Health Model is extended or replicated by other states after its initial authorization;', 'whether the Pennsylvania Rural Health Model, which ended in 2024, is replicated by other states;', S_PA, 'Key signal treated the ended model as possibly extendable.'),
  ] },
  { ids: ['academyModule-vbc-clinical-m5'], pairs: [
    R('Vermont\'s All-Payer Model tracks outcomes like', 'Vermont\'s All-Payer ACO Model (2017–2025) tracked outcomes like', S_VT, 'Model ended 2025-12-31.'),
    R('Vermont\'s All-Payer Model, which launched in 2017 and runs through 2029, takes this further. OneCare Vermont — the state\'s accountable care organization — holds a global budget covering roughly a third of Vermont residents. Practices within OneCare are responsible for',
      'Vermont\'s All-Payer ACO Model, which ran from 2017 through December 31, 2025, took this further. OneCare Vermont — the state\'s accountable care organization until it wound down at the end of 2025 — held a global budget covering roughly a third of Vermont residents. Practices within OneCare were responsible for',
      S_VT, '"Runs through 2029" is false (ended 2025-12-31); OneCare wound down end of 2025.'),
    R('As a member of OneCare Vermont, Copley participates in', 'As a member of OneCare Vermont, Copley participated in', S_VT, 'OneCare ended 2025.'),
    R('Vermont\'s Blueprint for Health and All-Payer Model demonstrate', 'Vermont\'s Blueprint for Health and its All-Payer ACO Model (2017–2025) demonstrate', S_VT, 'Model ended 2025-12-31.'),
  ] },
  { ids: ['academyModule-precision-medicine-m1'], pairs: [
    R('as it develops reimbursement policy for genomic tests under the state\'s all-payer model.', 'as it develops reimbursement policy for genomic tests under the state\'s all-payer reforms.', S_VT, 'All-Payer ACO Model ended 2025-12-31.'),
    R('Vermont\'s all-payer model, which already rewards outcomes over volume, creates an unusually favorable environment for this calculus.',
      'Vermont\'s all-payer reforms — the All-Payer ACO Model through 2025, and now the hospital global budgets Act 68 of 2025 directs the Green Mountain Care Board to establish — create an unusually favorable environment for this calculus because they reward outcomes over volume.', S_VT, 'Present tense for ended model.'),
    R('Vermont\'s Green Mountain Care Board oversees the state\'s all-payer model, which sets unified payment rates and population health budgets across payers.',
      'Vermont\'s Green Mountain Care Board oversees the state\'s all-payer reforms, including hospital budget review and the hospital global budgets Act 68 of 2025 requires it to establish.', S_VT, 'Present tense for ended model; GMCB does not set unified payment rates across payers.'),
    R('OneCare Vermont, the state\'s accountable care organization, manages care for approximately 190,000 Vermonters under the all-payer model. OneCare\'s population health analytics platform tracks utilization patterns and outcome metrics across its attributed population. As pharmacogenomic testing data becomes linkable to claims and EHR data, OneCare is positioned to evaluate precision medicine interventions',
      'OneCare Vermont, the state\'s accountable care organization under the All-Payer ACO Model, managed care for approximately 190,000 Vermonters until both the model and OneCare wound down at the end of 2025. OneCare\'s population health analytics platform tracked utilization patterns and outcome metrics across its attributed population — the kind of capability that, as pharmacogenomic testing data becomes linkable to claims and EHR data, would let an accountable entity evaluate precision medicine interventions',
      S_VT, 'OneCare presented as operating; it wound down end of 2025.'),
    R('integrated health system, all-payer payment model, and health information exchange', 'integrated health system, all-payer reform history, and health information exchange', S_VT, 'Ended model presented as current.'),
    R('Vermont\'s all-payer model is often cited as an advantage', 'Vermont\'s all-payer approach is often cited as an advantage', S_VT, 'Ended model presented as current (knowledge-check question).'),
    R('Vermont\'s all-payer model creates financial alignment', 'Vermont\'s all-payer approach (the All-Payer ACO Model through 2025; Act 68 hospital global budgets now) creates financial alignment', S_VT, 'Ended model presented as current (knowledge-check answer).'),
    R('the all-payer model\'s population health budgets are calibrated', 'global and population health budgets are calibrated', S_VT, 'Ended model presented as current (knowledge-check answer).'),
    R('Vermont\'s all-payer model and health information exchange infrastructure create', 'Vermont\'s all-payer reform history and health information exchange infrastructure create', S_VT, 'Ended model presented as current (takeaway).'),
  ] },
  { ids: ['academyModule-precision-medicine-m3-economics'], pairs: [
    R('Vermont\'s All-Payer Model — one of the most advanced value-based payment systems in the United States — gives the state practical infrastructure', 'Vermont\'s All-Payer ACO Model (2017–2025), one of the most advanced value-based payment systems in the United States, left the state practical infrastructure', S_VT, 'Ended model presented as current.'),
    R('Vermont\'s Green Mountain Care Board and All-Payer Model infrastructure make it', 'Vermont\'s Green Mountain Care Board and the infrastructure built under its All-Payer ACO Model (2017–2025) make it', S_VT, 'Ended model presented as current.'),
    R('In Vermont\'s All-Payer Model, where the hospital receives a global budget tied to population health outcomes,', 'Under the hospital global budgets Vermont\'s Act 68 of 2025 requires (successor to the All-Payer ACO Model, which ended in 2025), where the hospital receives a fixed annual budget,', S_VT, 'Ended model presented as current.'),
    R('Vermont\'s All-Payer Model provides structural advantages', 'Vermont\'s all-payer reform infrastructure — built under the All-Payer ACO Model (2017–2025) and carried forward by Act 68 hospital global budgets — provides structural advantages', S_VT, 'Ended model presented as current (takeaway).'),
  ] },
  { ids: ['interop-vermont-vitl'], pairs: [
    R('OneCare Vermont — the state\'s All-Payer ACO — uses VHIE data to support care management for its attributed population.', 'OneCare Vermont — the state\'s All-Payer ACO until the model ended and OneCare wound down at the end of 2025 — used VHIE data to support care management for its attributed population.', S_VT, 'OneCare presented as operating.'),
  ] },
  { ids: ['aco-medicaid-commercial'], pairs: [
    R('A primary care physician in the OneCare network has the same incentive', 'A primary care physician in the OneCare network had the same incentive', S_VT, 'OneCare ended 2025.'),
    R('Implementation has been iterative—participation by commercial payers and providers has grown over the years since launch, and the model has been modified through renegotiation with CMS.',
      'Implementation was iterative—the model was modified through renegotiation with CMS before it ended on December 31, 2025.', S_VT, 'Present-perfect for ended model; "commercial participation has grown" contradicts BCBSVT\'s 2023 exit (about 93,000 enrollees).'),
    R('Vermont\'s all-payer model gives everyone the same rulebook, so the referee—and the players—can play a coherent game.', 'Vermont\'s all-payer model gave everyone the same rulebook, so the referee—and the players—could play a coherent game.', S_VT, 'Ended model presented as current (analogy).'),
  ] },
  { ids: ['vbc-fundamentals-m1'], pairs: [
    R('Maryland\'s hospital global budget program and Vermont\'s All-Payer ACO model are the most prominent examples.', 'Maryland\'s hospital global budget program and Vermont\'s All-Payer ACO Model (2017–2025) have been the most prominent examples.', S_VT, 'Ended model presented as current.'),
    R('Vermont\'s All-Payer ACO Model, launched in 2018, is particularly noteworthy', 'Vermont\'s All-Payer ACO Model, which ran from 2017 (performance years from 2018) through December 31, 2025, is particularly noteworthy', S_VT, 'Model start/end dates.'),
    R('The model has driven significant investment in primary care infrastructure and care coordination in Vermont, and it offers a potential blueprint for other states', 'The model drove significant investment in primary care infrastructure and care coordination in Vermont, and its record offers lessons for other states', S_VT, 'Ended model presented as current.'),
  ] },
  { ids: ['academyModule-vbc-aco-medicaid'], pairs: [
    R('Vermont\'s OneCare Vermont represents the most ambitious', 'Vermont\'s OneCare Vermont was the most ambitious', S_VT, 'OneCare wound down end of 2025.'),
    R('OneCare is the state\'s single ACO, operating under', 'OneCare was the state\'s single ACO, operating under', S_VT, 'OneCare wound down end of 2025.'),
    R('OneCare holds a population-based global budget that covers the vast majority of Vermonters across Medicare, Medicaid, and commercial insurance within a single accountability structure — an approach with no direct parallel elsewhere in the country.',
      'OneCare held a population-based global budget covering its attributed Vermonters across Medicare, Medicaid, and commercial insurance within a single accountability structure — an approach with no direct parallel elsewhere in the country. OneCare wound down at the end of 2025, when the model ended.', S_VT, 'Present tense for ended ACO; "vast majority of Vermonters" contradicts the lesson\'s own ~160,000 attributed (of ~650,000).'),
    R('Under the Vermont model, OneCare receives', 'Under the Vermont model, OneCare received', S_VT, 'OneCare ended 2025.'),
    R('The ACO is responsible for managing total cost of care across all payers for its attributed population — approximately 160,000 Vermonters as of 2023 — and must invest', 'The ACO was responsible for managing total cost of care across all payers for its attributed population — approximately 160,000 Vermonters as of 2023 — and had to invest', S_VT, 'OneCare ended 2025.'),
  ] },
  { ids: ['bundled-payment-mechanics'], pairs: [
    R('CMS BPCI Advanced covers 31 inpatient and 4 outpatient clinical episode types', 'CMS BPCI Advanced (2018–2025) covered 31 inpatient and 4 outpatient clinical episode types', S_BPCI, 'Ended model in present tense.'),
    R('BPCI Advanced generated ~$344 million in savings by end of Model Year 5 — CMS BPCI Advanced Evaluation Report 2023', 'BPCI Advanced saved Medicare a net ~$344 million in Model Year 5 (2022) alone; about $800 million net across all eight model years — CMS BPCI Advanced evaluation reports (2024; final report 2026)', S_BPCI, '$344M was Model Year 5 savings, not cumulative "by end of Model Year 5" (cumulative through MY5 was lower: MY1-3 were net losses).'),
    R('Estimated BPCI Advanced Savings by Year 5', 'BPCI Advanced Net Savings, Model Year 5', S_BPCI, 'Same mischaracterization in stat label.'),
    R('Under BPCI Advanced, two entity types can participate', 'Under BPCI Advanced, two entity types could participate', S_BPCI, 'Ended model in present tense.'),
    R('generating an estimated $344 million in total program savings.', 'while the model as a whole saved Medicare an estimated net $344 million in Model Year 5 (about $800 million net across all eight model years, per the 2026 final evaluation).', S_BPCI, '$344M was Model Year 5 only, not total program savings.'),
    R('CMS\'s TEAM model launches Jan 2026, covers 5 procedure types', 'CMS\'s TEAM model began Jan 1, 2026, covering 5 procedure types', S_BPCI, 'TEAM has started.'),
    R('finalized by CMS to launch on January 1, 2026, and run through December 31, 2030. TEAM will require', 'which CMS launched on January 1, 2026, to run through December 31, 2030. TEAM requires', S_BPCI, 'TEAM has started.'),
    R('BPCI Advanced generated approximately $344 million in savings and a $1,014 average per-episode spending reduction by Year 5,', 'BPCI Advanced saved Medicare a net ~$344 million in Model Year 5 alone and about $800 million net across its eight model years, with roughly $1,000 lower spending per episode,', S_BPCI, '$344M was Model Year 5 only.'),
    R('TEAM launches January 1, 2026, covering', 'TEAM began January 1, 2026, covering', S_BPCI, 'TEAM has started.'),
  ] },
  { ids: ['bundled-payment-evidence'], pairs: [
    R('Through Model Year 5 (ending 2022), BPCI Advanced generated approximately $344 million in gross savings', 'In Model Year 5 (2022), BPCI Advanced generated approximately $344 million in net Medicare savings', S_BPCI, '$344M was Model Year 5 net savings, not cumulative gross savings.'),
    R('Per-episode spending declined by an average of $1,014.', 'Per-episode spending declined by an average of $1,014. The model ended on December 31, 2025, and its final evaluation (August 2026) put net Medicare savings at about $800 million across all eight model years, after net losses in Model Years 1–3.', S_BPCI, 'Added end date and final-evaluation total so the ended model is not read as ongoing.'),
    R('The model has consistently attracted', 'The model consistently attracted', S_BPCI, 'Ended model in present perfect.'),
    R('BPCI Advanced generated approximately $344 million in gross savings through Year 5,', 'BPCI Advanced generated approximately $344 million in net Medicare savings in Model Year 5 and about $800 million net across all eight model years (2018–2025),', S_BPCI, '$344M was Model Year 5 net savings.'),
  ] },
  { ids: ['academyModule-vbc-bundled-mechanics'], pairs: [
    R('BPCI-Advanced, which launched in 2018 and has been extended multiple times, is a voluntary two-sided risk model covering 32 clinical episodes — both inpatient and, uniquely, outpatient procedure episodes. It is considered an Advanced APM under MACRA, meaning qualifying participants earn the 5% APM bonus and are exempt from MIPS reporting. BPCI-Advanced uses retrospective reconciliation: providers continue to receive standard Medicare fee-for-service payments during the performance period, and then CMS reconciles actual episode spending against the target price annually. If actual spending is below target (minus a minimum savings requirement), the participant earns a reconciliation payment. If spending exceeds the target price, the participant owes a repayment.',
      'BPCI-Advanced, which launched in 2018 and, after several extensions, ended on December 31, 2025, was a voluntary two-sided risk model covering 32 clinical episodes at launch — both inpatient and, uniquely, outpatient procedure episodes. It qualified as an Advanced APM under MACRA, meaning qualifying participants could earn the APM incentive payment and were exempt from MIPS reporting. BPCI-Advanced used retrospective reconciliation: providers continued to receive standard Medicare fee-for-service payments during the performance period, and then CMS reconciled actual episode spending against the target price. If actual spending was below target, the participant earned a reconciliation payment; if spending exceeded the target price, the participant owed a repayment. For hospitals, its successor is the mandatory Transforming Episode Accountability Model (TEAM), which began January 1, 2026.',
      S_BPCI, 'Presented BPCI-A as ongoing ("has been extended", "is", "earn the 5% APM bonus" — the APM incentive was 5% only through the 2024 payment year).'),
    R('CMS permits convener organizations to serve as the legal participant in BPCI-Advanced', 'CMS permitted convener organizations to serve as the legal participant in BPCI-Advanced', S_BPCI, 'Ended model in present tense.'),
    R('Major convener organizations in BPCI-Advanced include', 'Major convener organizations in BPCI-Advanced included', S_BPCI, 'Ended model in present tense.'),
  ] },
  { ids: ['vbc-fundamentals-module-5-clinical-equity-pillars'], pairs: [
    R('The BPCI Advanced evaluation found consistent quality improvement on 30-day complication rates and 90-day functional outcome scores for major joint replacement episodes, alongside the cost reductions documented in Module 3.',
      'BPCI Advanced\'s final evaluation (2026) found readmission rates similar to the comparison group rather than improved, and patients in the model\'s last two years reported less favorable changes in functional status, alongside the cost reductions documented in Module 3.', S_BPCI, 'Claimed "consistent quality improvement" in complications and functional outcomes; the final evaluation found similar readmissions and worse self-reported functional status in MY7-8.'),
    R('$2,100 episode savings; reduced SNF utilization; 30-day complication rates maintained or improved', '~$1,000 lower Medicare spending per episode (Model Years 3–6, all episodes); ~$500 lower SNF spending per episode; readmissions similar to comparison group', S_BPCI, 'Same unverifiable "$2,100 per episode" figure as Module 3.'),
    R('"BPCI Advanced Evaluation 2024"', '"BPCI Advanced Final Evaluation Report (Lewin Group for CMS, 2026)"', S_BPCI, 'No 2024 evaluation reports $2,100; replaced with the final report.'),
  ] },
];

