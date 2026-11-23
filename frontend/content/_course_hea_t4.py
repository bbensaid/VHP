exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_hea_common.py').read())

# Track 4 — Accountability and Contracts. Book Ch10 §10.6, §10.7, §10.8, §10.15. Verified 2026-11-23: Act 68 of 2025 text read directly (Sec. 11b: AHS must identify outcome measures for the five Act 167 goals
# (reduce inefficiencies; lower costs; improve health outcomes; reduce health inequities; increase access to essential services), report them with a timeline to the Health Reform Oversight Committee and
# Joint Fiscal Committee, monthly from Aug 1 2025 through Jan 1 2027; Health Care Delivery Advisory Committee must consult the Health Equity Advisory Commission; reference-based pricing: Board shall consider
# community composition incl. health of population, demographics, acuity, payer mix, labor costs, social risk factors; "social risk" appears only once in the enacted text). AHS May 2026 report Appendix A maps
# outcome measures to the goals. ACO REACH Health Equity Benchmark Adjustment (CMS slides, Health Affairs Forefront; summarized by search): raises benchmarks using ADI and dual eligibility; applied after
# benchmark calculation, not subject to discount or quality withhold; CMS simulations ~0.5-1% bump for ACOs with many underserved beneficiaries; PY2025 changed the ADI measure. Book-only: indicator targets,
# eight-category audit, global budget SRA open design question, equity impact assessment cost ranges, HCAC naming.

L13_SLUG = 'hea-accountability-framework'
L13_TITLE = 'Making Equity Accountable: Indicators, Targets and Owners'
L13 = [
    blk('intro1', "Chapter 10 says Vermont's Statewide Strategic Plan must contain a specific equity accountability framework: measurable indicators, geographic stratifications and intervention commitments that turn the equity goal of the state's reform laws from an aspiration into a task. It offers a table of eight indicators as the minimum structure and lays down two principles. Indicators must be disaggregated and not presented as averages, and every indicator must be paired with the interventions designed to move it, a responsible agency and a timeline."),
    blk('intro2', "This lesson teaches how to build such a framework: how to write an indicator so that it can be measured and owned, how to set targets that close gaps and do not simply lower expectations and how to make accountability real. It verifies the legal basis in the text of Act 68, which the lesson read directly, and treats the chapter's table of indicators and targets as the book's proposal, not as adopted state policy."),
    blk('intro3', "An indicator without an owner, a target and a response when it moves the wrong way is only a statistic."),

    h2('s1h1', 'The Legal Hook'),
    blk('s1p1', "Act 68 of 2025 creates a reporting duty that makes equity part of transformation accountability. Section 11b directs the Agency of Human Services to identify specific outcome measures for determining whether, when and to what extent each of five goals from the earlier Act 167 has been met. The goals are to reduce inefficiencies, lower costs, improve health outcomes, reduce health inequities and increase access to essential services. The Agency must report the measures, with a timeline, to the Health Reform Oversight Committee and the Joint Fiscal Committee, explain how it will determine its progress and report monthly from August 1, 2025 through January 1, 2027."),
    blk('s1p2', "The Agency's May 2026 report to the legislature follows that structure. Its appendix lists outcome measures and maps each to the five goals, with a stated data source and period. Among them are the thirty-day all-cause readmission rate and potentially avoidable emergency department visits as a share of all emergency visits. The equity goal appears as one of five columns, so a measure can be tagged as bearing on inequities. What the portion of the report that this lesson read does not show is stratified results, that is, the same measures broken down by group or place. Mapping a measure to the equity goal is a first step, and stratified reporting is the second."),
    callout('s1c1', "A law that names equity as a goal creates a duty to measure. It does not by itself say how the gap will be reported or closed."),

    h2('s2h1', 'Writing an Indicator That Can Be Owned'),
    blk('s2p1', "The chapter's table lists, for each indicator, the stratification required, a target direction with a date and a data source. Examples include the uninsured rate by county, age and income, the share of adults with a personal provider by race and ethnicity and county, potentially avoidable emergency visits by county and income, follow-up after a behavioral health emergency visit by county, race and insurance, completion of social needs screening by service area and patient race and ethnicity, access to GLP-1 therapy for Medicaid enrollees with obesity, emergency response time by county and time of day, and compliance with cultural competency standards. These are the book's proposal, and the target values attached to them are the book's and not adopted policy."),
    blk('s2p2', "Whatever the indicators, each should be specified in a standard sheet. Name the measure and its definition. State the numerator and the denominator. List the strata and the minimum cell size below which results are not reported. Give the data source, its period and its known limits. Identify a reference group or standard against which gaps are measured. Set the target in terms of the gap and the level. Name the accountable owner and the interventions designed to move the indicator. Without these elements, an indicator is open to dispute, and no one is responsible when it moves."),
    table('s2t1', 'An indicator specification sheet (example with the chapter\'s personal provider measure)', [
        {'Element': 'Definition', 'Example': 'Share of adults reporting a personal health care provider'},
        {'Element': 'Strata', 'Example': 'Race and ethnicity; county; income; with a minimum sample for reporting'},
        {'Element': 'Source and limits', 'Example': 'State survey; self-report; small samples for several groups'},
        {'Element': 'Reference', 'Example': 'Statewide rate and the highest-performing group'},
        {'Element': 'Target', 'Example': 'Reduce the gap by a stated number of points by a stated date without lowering the reference'},
        {'Element': 'Owner and interventions', 'Example': 'Named agency; community health workers, language access, outreach'},
    ]),

    h2('s3h1', 'Targets That Close Gaps'),
    blk('s3p1', "Targets are where equity frameworks often fail. A target set as an improvement in the state average can be met while a gap widens. A target set as a gap size can be met by lowering the best-performing group. Good targets are stated in both terms: raise the lowest-performing group by a stated amount while maintaining or improving the reference group. The chapter's examples, such as moving the rate for Hispanic adults toward the statewide rate, are directional and say toward and not to, which is an honest recognition that closing a gap fully may take longer than a planning period."),
    blk('s3p2', "Baselines matter. The chapter proposes that for emergency response time in the Northeast Kingdom the first step is to establish a baseline, since none exists. That is sound practice: a target without a baseline cannot be assessed. Equally important is the measurement interval. An annual survey cannot detect a mid-year change, so a framework should combine slower survey indicators with faster administrative ones, such as monthly claims-based measures, to provide earlier signals."),
    blk('s3p3', "Finally, be careful with uncertainty. A target of closing a gap by two points is meaningless if the group's estimate has an interval of plus or minus twelve. In that case the framework should specify how progress will be judged: pooled years, a smaller set of groups or an administrative measure with less noise. Linking targets to the small-number methods of the previous track keeps the framework from setting goals the data cannot evaluate."),

    h2('s4h1', 'Pairing Indicators With Interventions'),
    blk('s4p1', "The chapter's second principle is that a disparity measure without a corresponding intervention commitment is a measurement of failure and not a strategy for success. Each indicator should be paired with the programs designed to move it, the responsible agency and the expected time for observable improvement. In the chapter's examples, the personal provider gap for Hispanic adults might be paired with community health workers from the served communities and language access, while the avoidable emergency visit rate in the Northeast Kingdom might be paired with emergency medical services investments and telehealth."),
    blk('s4p2', "The pairing makes accountability concrete. If the indicator does not move within the stated time, the owner is expected to explain whether the intervention was implemented, whether it reached the target group and whether the cause attribution was wrong. That is the loop between measurement, intervention and outcome that the chapter says distinguishes an equity program from an equity report. The root cause taxonomy from the previous track supplies the vocabulary for the explanation."),
    steps('s4st1', 'Closing the accountability loop', [
        ('Measure', 'Report the indicator by stratum with uncertainty and completeness.'),
        ('Compare', 'Check against baseline, target and the reference group.'),
        ('Explain', 'If the gap is not closing, state whether implementation, reach or cause was the problem.'),
        ('Decide', 'Continue, redesign or replace the intervention, with an owner and date.'),
        ('Report', 'Publish the decision with the data, to the body that holds the owner accountable.'),
    ]),

    h2('s5h1', 'Who Holds Whom Accountable'),
    blk('s5p1', "Accountability needs an audience. Act 68 makes the Health Reform Oversight Committee and the Joint Fiscal Committee the recipients of the Agency's reports, and requires the Health Care Delivery Advisory Committee to consult the Health Equity Advisory Commission, according to the enacted text. The chapter adds that the legislature should require the Agency to report annually on the equity metrics in the Strategic Plan and to explain what is being done when metrics show gaps widening. Whether those expectations are formalized is a matter for the legislature and the Agency, and this lesson did not find evidence that they have been."),
    blk('s5p2', "Within organizations the same principle applies. A hospital board should receive stratified quality measures, and a named executive should be accountable for any gap that persists. Community members and advisory bodies should see the data too, since they are best placed to judge whether the numbers match what they observe. An accountability framework works when the people who can change conditions are told, in plain terms, who is not doing well and what is being done."),
    blk('s5p3', "Keep the framework small enough to run. Eight indicators that are well specified, owned and reported are worth more than thirty that are not. Start with the ones for which data exist and the cause is well understood, add others as data improve and review the set each year. The framework is a living instrument, and its credibility depends on the visible follow-through it generates."),

    takeaway('tw', [
        "Act 68 Section 11b requires the Agency to identify outcome measures for the five Act 167 goals, including reducing health inequities, and to report them monthly from August 2025 through January 2027.",
        "The Agency's May 2026 report maps measures to the goals; the portion read does not show stratified results, which is the next step.",
        "Chapter 10's table of eight indicators, with strata and targets, is the book's proposal, not adopted policy.",
        "Specify every indicator with definition, numerator, denominator, strata, minimum cell size, source, reference group, target, owner and paired interventions.",
        "State targets as both a gap and a level, so a gap cannot close by lowering the best-performing group.",
        "Set baselines where none exist and combine slow survey measures with faster administrative ones.",
        "Pair each indicator with interventions and an explanation duty; accountability needs an audience that can act.",
    ]),
    quiz('qz',
        "Why should an equity target be stated both as a gap and as a level?",
        [
            ("Because it makes the report longer", False),
            ("Because a gap alone can close by lowering the best-performing group, and a level alone can improve while the gap widens", True),
            ("Because the law requires two numbers", False),
            ("Because levels cannot be measured", False),
        ],
        "A target that tracks only the gap can be met by worsening the reference group, while a target on the average can be met as the gap widens. Stating both prevents either failure."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.8 Vermont's Equity Accountability Framework (Figure 10.6); §10.10 From Identifying Disparities to Eliminating Them"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted, Sec. 11b and the Health Care Delivery Advisory Committee provision — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — read directly"),
    blk('src3', "[3] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — Appendix A, outcome measures mapped to Act 167 goals"),
    blk('src4', "[4] Vermont Statutes, 18 V.S.A. section 252 (Health Equity Advisory Commission) — https://legislature.vermont.gov/statutes/section/18/006*/00252"),
]

L14_SLUG = 'hea-vbc-equity-audit'
L14_TITLE = 'Protecting Equity in Value-Based Contracts: The Eight-Category Audit'
L14 = [
    blk('intro1', "Chapter 10 warns that value-based contracts can worsen equity if designed without explicit protections. It lists the mechanisms: global budgets or capitation rates that do not adjust for social risk can reward providers for avoiding high-need patients, shared savings contracts that pay for utilization reduction can reward avoiding care for complex patients and quality measures can be harder to meet for organizations serving disadvantaged populations even when they deliver excellent care relative to what their patients can access. It proposes an eight-category equity audit for every contract, before and after signing."),
    blk('intro2', "This lesson explains the risks, works through the eight categories, describes how the federal ACO REACH model's equity benchmark adjustment functions as verified from federal and policy sources and checks what the enacted Act 68 text says about social risk. The audit checklist is the book's. The federal model details are from agency slides and policy commentary as summarized in search results."),
    blk('intro3', "A contract that rewards savings and ignores who is served will, over time, favor those who are easiest to serve."),

    h2('s1h1', 'How Payment Design Can Worsen Equity'),
    blk('s1p1', "Under fee-for-service, a provider is paid for each service, so serving complex patients is not penalized financially, although it may be unprofitable if payment does not cover costs. Under capitation, global budgets and shared savings, the provider takes on some of the risk of costs, and the payment is fixed in advance or compared with a benchmark. If the benchmark does not reflect the extra costs of caring for patients with greater social and medical needs, then serving them is financially unattractive. Three behaviors follow in theory: avoiding enrollment of high-need patients, providing less care to those enrolled and withdrawing from high-need areas."),
    blk('s1p2', "A fourth risk is quieter. If quality measures are compared across organizations without adjustment, those serving poorer populations will tend to score lower, and may be penalized or lose bonuses, even if they do as well as others relative to their patients' circumstances. Over time, this can drain resources from the organizations that most need them. The chapter's concern is that a contract can look neutral and still produce these effects."),
    callout('s1c1', "Equity protection in a contract is a design requirement, not a favor to the organizations serving the hardest populations."),

    h2('s2h1', 'The Eight Categories'),
    blk('s2p1', "The audit examines a contract in eight areas. Attribution equity asks whether the method of assigning patients to the provider systematically excludes high-need patients who lack a qualifying primary care visit. Social risk adjustment asks whether the benchmark is adjusted for the social risk of the attributed population. Quality measure equity asks whether measures are stratified by race, ethnicity and income and whether performance is rewarded for equity improvement, not just average improvement. Social needs investment asks whether the contract gives financial credit for investments in programs that reduce long-term utilization."),
    blk('s2p2', "Care management intensity asks whether care management resources are allocated in proportion to social burden and disparity, not just clinical risk. Beneficiary protections asks whether there are safeguards against avoiding high-complexity, high-need patients. Community benefit requirements asks, for global budgets, whether the contract requires community health investment. Equity performance reporting asks whether equity results are reported publicly, with minimum standards below which an organization cannot be considered performing. The eight questions can be scored as met, partly met or not met, with a note on the evidence and the fix."),
    table('s2t1', 'The eight-category audit (the book\'s checklist)', [
        {'Category': 'Attribution equity', 'Question': 'Does attribution exclude high-need patients who lack a qualifying visit?'},
        {'Category': 'Social risk adjustment', 'Question': 'Is the benchmark adjusted for social risk of the attributed population?'},
        {'Category': 'Quality measure equity', 'Question': 'Are measures stratified and equity improvement rewarded?'},
        {'Category': 'Social needs investment', 'Question': 'Does the contract credit investment in social needs programs?'},
        {'Category': 'Care management intensity', 'Question': 'Is care management allocated by social burden as well as clinical risk?'},
        {'Category': 'Beneficiary protections', 'Question': 'Are there safeguards against avoiding complex, high-need patients?'},
        {'Category': 'Community benefit', 'Question': 'For global budgets, is community health investment required?'},
        {'Category': 'Equity reporting', 'Question': 'Is equity performance public, with minimum standards?'},
    ]),

    h2('s3h1', 'Social Risk Adjustment in Practice'),
    blk('s3p1', "The federal ACO REACH model offers a worked example. According to the agency's slides and policy commentary, it created a health equity benchmark adjustment to address a disincentive: benchmarks based on historical spending can lock in past underspending for underserved groups. The adjustment raises the financial benchmark for organizations whose beneficiaries carry higher costs for clinical and social reasons. It uses a composite of area-level deprivation, measured by the Area Deprivation Index national percentile, and individual low-income status, measured by dual eligibility for Medicare and Medicaid. It is applied after the benchmark is otherwise calculated and is not subject to the discount or quality withhold."),
    blk('s3p2', "According to the agency's simulations as reported, most organizations saw small changes, around plus or minus two tenths of a percent of the benchmark, while those serving high shares of underserved beneficiaries saw increases of roughly half to one percent. The measure was revised for later program years, and the program year 2025 version replaced a blended national and state deprivation measure with a different area-level measure, so a reader needing current details should consult the program's current financial methodology. A commentary in Health Affairs Forefront, as indicated by its address, raises the concern that benchmarks based on the deprivation index may mask inequities. That is a reminder that a technical adjustment is itself a design choice with trade-offs."),
    blk('s3p3', "Social risk adjustment is debated. Supporters argue that without it, organizations serving poorer populations are penalized for conditions they do not control. Critics argue that adjusting quality targets for social risk can excuse worse outcomes for disadvantaged groups and hide disparities. A common compromise is to adjust financial benchmarks, which reflect cost, while reporting quality for each group without adjustment so gaps remain visible, and to reward improvement within groups. The lesson's own reading is that the two aims, fair payment and visible gaps, need different instruments."),

    h2('s4h1', 'What Act 68 Says'),
    blk('s4p1', "The chapter calls social risk adjustment in global budgets an open design question that the Agency of Human Services and the Green Mountain Care Board must resolve explicitly. It also says Act 68 requires reference-based pricing to consider each hospital's community context, payer mix and social risk factors. The enacted text supports that second statement: in setting reference-based prices for a hospital, the Board must consider the composition of the communities served, including the health of the population, demographic characteristics, acuity, payer mix, labor costs and social risk factors, along with the hospital's role in the state's system."),
    blk('s4p2', "This lesson searched the enacted text for the term social risk and found it once, in that pricing provision. That finding supports the chapter's view that how social risk will enter the global budget methodology is not settled in the statute, and it is a reminder to read the statute and not rely on summaries. The Board's methods, rules and decisions, rather than the act's text, will determine how social risk adjustment works in practice. Anyone analyzing a hospital's budget should look for the Board's methodology documents and check what they say about social risk."),
    blk('s4p3', "The same reading discipline applies to contracts. A clause that mentions equity, such as a reporting requirement, is not the same as an adjustment of the benchmark or a protection against avoidance. Score each audit category on what the contract actually requires and how it will be enforced."),

    h2('s5h1', 'Running the Audit'),
    steps('s5st1', 'Applying the eight-category audit', [
        ('Collect the documents', 'Contract, benchmark method, attribution rules, quality measure specifications and reporting terms.'),
        ('Score each category', 'Met, partly met or not met, citing the clause and its enforcement.'),
        ('Test with data', 'Check whether attributed patients differ from the population in the ways the audit fears.'),
        ('Propose fixes', 'Suggest specific contract language or monitoring for each gap.'),
        ('Monitor after signing', 'Track panel composition, access and stratified quality, and repeat the audit annually.'),
    ]),
    blk('s5p1', "Monitoring after signing is as important as the audit before. A contract can look sound on paper and still produce avoidance in practice. Compare the attributed panel with the community: are high-need patients as likely to be attributed and retained as others? Track who leaves, who is discharged from care management and how long people wait for appointments. Stratified quality results should be reviewed quarterly, and sharp divergences investigated."),
    blk('s5p2', "Finally, share the audit. Providers, payers and community groups can all use it as a language for negotiation. A hospital serving a high-need region can use it to justify an adjustment or a community benefit provision. A payer can use it to show it has considered equity. A regulator can use it to decide what to require. An audit that stays in a file does not protect anyone."),

    takeaway('tw', [
        "Chapter 10 says value-based contracts can worsen equity through avoidance of high-need patients, reduced care and quality measures that penalize organizations serving disadvantaged populations.",
        "The eight-category audit covers attribution, social risk adjustment, quality measure equity, social needs investment, care management intensity, beneficiary protections, community benefit and equity reporting.",
        "ACO REACH's equity benchmark adjustment uses area deprivation and dual eligibility and is applied after the benchmark is set, not subject to the discount or quality withhold.",
        "Agency simulations reported small effects for most organizations and roughly half to one percent for those serving many underserved beneficiaries; current program-year details should be checked.",
        "Adjust financial benchmarks for social risk but report quality by group unadjusted so gaps stay visible.",
        "Act 68's enacted text mentions social risk factors once, in the reference-based pricing provision; social risk adjustment in global budgets is not settled in the statute.",
        "Monitor panel composition, access and stratified quality after signing and repeat the audit annually.",
    ]),
    quiz('qz',
        "What does the ACO REACH health equity benchmark adjustment do?",
        [
            ("Lowers benchmarks for ACOs serving wealthier areas", False),
            ("Raises the financial benchmark for organizations whose beneficiaries carry higher costs for clinical and social reasons, using area deprivation and dual eligibility", True),
            ("Eliminates quality reporting", False),
            ("Replaces risk adjustment entirely", False),
        ],
        "The adjustment raises benchmarks for ACOs serving underserved beneficiaries, using a composite of area-level deprivation and dual-eligibility status, and is applied after the benchmark is calculated."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.15 Equity in VBC Contracting; §10.15.2 The VBC Equity Audit"),
    blk('src2', "[2] Centers for Medicare and Medicaid Services, ACO REACH health equity slides — https://cms.gov/priorities/innovation/media/document/aco-reach-health-equity-slides ; Health Affairs Forefront, Embedding Equity in Financial Benchmarks — https://www.healthaffairs.org/content/forefront/embedding-equity-financial-benchmarks-changes-health-equity-benchmark-adjustment — as summarized by search"),
    blk('src3', "[3] Health Affairs Forefront commentary on area deprivation benchmarks — https://www.healthaffairs.org/content/forefront/aco-benchmarks-based-area-deprivation-index-mask-inequities — title as shown in the address; not read in full"),
    blk('src4', "[4] Vermont Act 68 of 2025 as enacted, reference-based pricing provision — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — read directly"),
]

L15_SLUG = 'hea-equity-across-pillars'
L15_TITLE = 'Equity Is Not a Program: The Equity Impact Assessment'
L15 = [
    blk('intro1', "Chapter 10 identifies a common mistake in equity strategy: treating equity as a separate program that runs beside the main transformation agenda. Such programs, it says, are reliably underfunded, deprioritized when budgets tighten and disconnected from the structural changes that determine health outcomes. The alternative is to treat equity as a cross-cutting dimension of every pillar, a lens applied to every policy decision, payment design, technology investment, clinical model and operational change. The chapter gives a table of equity risks and opportunities for each of the five pillars, and an implementation matrix that includes a health equity impact assessment process."),
    blk('intro2', "This lesson turns that principle into a procedure. It explains the five-pillar equity lens, defines an equity impact assessment, works through an example of a proposed service change and checks what Vermont already has in place. Statutory facts come from Act 68's enacted text and from the statute creating the state's equity commission, both read or searched for this lesson; the chapter's list of other Vermont equity programs is the book's and was not verified."),
    blk('intro3', "The question for any decision is simple to state: who gains, who loses, and how will we know."),

    h2('s1h1', 'The Five-Pillar Equity Lens'),
    blk('s1p1', "The chapter pairs each pillar with an equity risk if neglected and an equity opportunity if designed well. In policy, the risk is a payment or mandate design that protects high-price urban hospitals while reducing access in rural and low-income communities, and the opportunity is requirements that take each hospital's community context into account. In technology, the risk is analytics that measure average performance and hide disparities, and artificial intelligence tools trained on biased data. In economics, the risk is global budgets that reward avoiding high-need people, and savings that accrue to the commercially insured while Medicaid access shrinks."),
    blk('s1p2', "In the clinical pillar, the risk is that medical home practices are concentrated in better-resourced communities, and that a collaborative care program that needs broadband and devices leaves rural patients out. In operations, the risk is hospital plans that optimize finances without equity impact analysis, for example closing inpatient services in rural communities before alternatives exist. For each risk there is a design response: disaggregated analytics, bias testing of tools, social risk adjustment and monitoring of premium savings, expansion of primary care to all service areas and telephone-based options for patients without broadband, and an equity impact assessment for every plan."),
    callout('s1c1', "Equity added at the end is an exception to the plan. Equity built in is part of the plan."),

    h2('s2h1', 'What an Equity Impact Assessment Is'),
    blk('s2p1', "An equity impact assessment is a short, structured review of a proposed decision, carried out before the decision is made. It asks who is affected, how the effects differ by group, what the proposal assumes about access and what would reduce harm or increase benefit. It is not a lengthy research project. For most decisions it can be a few pages, produced in weeks, with the depth proportionate to the stakes. The chapter's matrix gives indicative costs for setting up an assessment process, which are the book's planning ranges and were not verified."),
    blk('s2p2', "The chapter says that Act 68 requires the Health Care Delivery Advisory Committee to consult with the Health Equity Advisory Commission, embedding equity input in the governance of transformation. The enacted text confirms the consultation requirement: it states that the Advisory Committee shall consult with and solicit input from the Commission, along with other groups. That is a structural hook for assessment, because a consultation requirement without a method tends to produce a meeting and not an analysis. The assessment gives the consultation something to examine."),
    table('s2t1', 'Five-pillar equity lens: where to look first', [
        {'Pillar': 'Policy', 'Equity_question': 'Does the rule or payment design treat communities with different needs and costs fairly?'},
        {'Pillar': 'Technology', 'Equity_question': 'Do data and tools show results by group, and have algorithms been tested for bias?'},
        {'Pillar': 'Economics', 'Equity_question': 'Does the payment model reward avoiding high-need patients, and who gets the savings?'},
        {'Pillar': 'Clinical', 'Equity_question': 'Do programs reach underserved areas and patients without broadband or transport?'},
        {'Pillar': 'Operations', 'Equity_question': 'Are service changes sequenced so that alternatives exist before services end?'},
    ]),

    h2('s3h1', 'Running an Assessment'),
    blk('s3p1', "A workable assessment follows four steps. Screen: identify decisions that could plausibly affect access, cost or outcomes for groups, such as service reductions, payment changes, new technology and eligibility rules. Analyze: for each, describe who is affected, using data by group and place, and describe the plausible differential effects using the root cause categories. Mitigate: propose changes to the decision or accompanying measures that reduce harm or increase benefit, with owners and dates. Monitor: define indicators to check that the expected effects, and not worse ones, occur, and set a review date."),
    blk('s3p2', "Consider an illustrative example, which is the lesson's own invention. A rural hospital proposes ending its inpatient obstetric unit to stay solvent. The screening step flags a reduction in a service with limited alternatives. The analysis finds that most of the hospital's births are to Medicaid-insured women, that the nearest alternative unit is more than an hour away and that the area has weak public transportation. The plausible differential effects are more births in transit, later prenatal care and worse outcomes for women without a vehicle. Mitigation might include transport support, group prenatal care at the local clinic, a transfer agreement and a timeline that does not close the unit until these are in place. Monitoring might track travel time at delivery, prenatal visit timing and outcomes by insurance and county."),
    blk('s3p3', "The point of the example is that the assessment changed the sequence and added measures. It need not have blocked the closure. A decision made with its effects understood is better than one discovered afterward, and an organization that shows it considered the question carries more credibility with the community."),

    h2('s4h1', 'What Vermont Already Has'),
    blk('s4p1', "The chapter lists existing equity infrastructure in Vermont: social needs screening in the state's primary care program, a health department grant program for community organizations working on disparities, the standing equity advisory body, an access policy for community behavioral health clinics and the equity goals of the reform acts. Two of these can be verified from public law. The Health Equity Advisory Commission was created by Act 33 of 2021 and codified in title 18, section 252, with thirty members and an annual report due January 15. Act 68's section 11b makes reducing health inequities one of five goals with required outcome measures."),
    blk('s4p2', "The chapter's table of what must still be built is a useful gap analysis: county-level equity data, a workforce that reflects the state's diversity, a decision about GLP-1 coverage, resilience of services in the Northeast Kingdom and sustained trust-building with underserved communities. Each can be turned into a project with an owner, a timeline and indicators. Where the chapter gives investment ranges or dates, those are the book's, and some, such as the dates for specific certifications and decisions, should be checked against current sources before being repeated."),
    blk('s4p3', "A practical use of the list is to ask, for any proposal, which existing equity structures it uses and which gaps it leaves open. A hospital transformation plan that proposes service changes could be required to describe how it will use the commission's input, what data it will stratify and how it will keep to the Northeast Kingdom constraint where relevant. That ties the chapter's general principle to specific obligations."),

    h2('s5h1', 'Making the Lens a Habit'),
    steps('s5st1', 'Embedding the equity lens', [
        ('Add a standing question', 'Put who gains, who loses and how we will know on every decision template.'),
        ('Screen early', 'Apply the screen when a proposal is first drafted, not at final approval.'),
        ('Keep it proportionate', 'Match depth to stakes; most assessments need only a few pages.'),
        ('Involve affected groups', 'Include community members and advisory bodies in the analysis.'),
        ('Follow through', 'Track the mitigations and indicators; report back.'),
    ]),
    blk('s5p1', "Habits form when the practice is easy and visible. A one-page template, a named reviewer and a place in the decision calendar are enough to begin. Over time, the organization builds a library of past assessments, which become a source of evidence about what works and a way to train new staff. It should also record when an assessment led to a change, which shows the value of the practice."),
    blk('s5p2', "Beware of two failure modes. One is the tick-box assessment, completed after the decision and never read. The other is paralysis, in which every proposal is delayed by analysis. Guard against the first by requiring that assessments precede decisions and be reviewed by someone with authority to change them. Guard against the second by scaling effort to risk and setting time limits. The goal is better decisions, not slower ones."),

    takeaway('tw', [
        "Chapter 10 says equity treated as a separate program is underfunded and disconnected, and proposes an equity lens applied to every pillar's decisions.",
        "The lens pairs each pillar with an equity risk and a design response, such as disaggregated analytics, bias testing and social risk adjustment.",
        "An equity impact assessment is a short structured review before a decision: screen, analyze, mitigate and monitor.",
        "Act 68's enacted text requires the Health Care Delivery Advisory Committee to consult the Health Equity Advisory Commission, which gives assessments a governance hook.",
        "The Commission was created by Act 33 of 2021; Act 68 Section 11b makes reducing health inequities one of five goals with required outcome measures.",
        "The chapter's list of what must still be built is a usable gap analysis, though its dates and cost ranges should be checked.",
        "Make the lens a habit with a standing question, early screening, proportionate effort, community involvement and follow-through.",
    ]),
    quiz('qz',
        "What are the four steps of an equity impact assessment as taught in this lesson?",
        [
            ("Announce, defend, implement, forget", False),
            ("Screen, analyze, mitigate and monitor", True),
            ("Fund, build, launch, evaluate", False),
            ("Measure, report, publish, archive", False),
        ],
        "The assessment screens for decisions that could affect groups differently, analyzes who is affected and how, proposes mitigations and defines monitoring indicators."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.6 Vermont's Equity Architecture; §10.7 Equity and the Five-Pillar Framework; §10.12 Implementation Matrix"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — Health Care Delivery Advisory Committee consultation; Sec. 11b outcome measures; read directly"),
    blk('src3', "[3] Vermont Statutes, 18 V.S.A. section 252 — https://legislature.vermont.gov/statutes/section/18/006*/00252 ; Health Equity Advisory Committee annual report, January 2026 — https://legislature.vermont.gov/Documents/2026/Workgroups/Senate%20Appropriations/Reports%20and%20Resources/W~Health%20Equity%20Advisory%20Committee~2026%20annual%20report~1-9-2026.pdf — listed by search; not read in full"),
    blk('src4', "[4] HTR Research Lab, Health Equity Studio — https://healthtransformationreview.org/research-lab/population-equity?tab=equity — stratified analysis tool paired with this chapter"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
