exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_vbcfm_common.py').read())

# Track 2 — Readiness and Contract Analysis. Sources: HTR book Chapter 7 §7.4-7.5; the platform's VBC Readiness Assessment
# (30 dimensions, 6 domains, 3 Vermont presets) and VBC Contract Review Checklist (65 provisions, 8 categories, 24 critical),
# whose component files were read and tallied on 2026-11-23. Preset scores are illustrative starting points built into the
# tool, not survey data. Scores below are this course's own arithmetic from those preset values.

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'vbcfm-readiness-domains'
L4_TITLE = 'APM Readiness: Six Domains and Thirty Dimensions'
L4 = [
    blk('intro1', "Most organizations that struggle in value-based contracts did not fail on arithmetic. They entered a contract without the data, the care teams, the partners or the revenue cycle to act on what the arithmetic showed them. Chapter 7 responds with a readiness framework: thirty dimensions in six domains, designed to find the gaps most likely to prevent shared savings or to produce shared losses before a contract is signed."),
    blk('intro2', "This lesson explains each domain, lists the five dimensions the platform's VBC Readiness Assessment uses to score it, and says why it matters in a risk contract. It uses Chapter 7 for the reasoning and the tool's own wording for the dimensions, so that a reader can score a real organization against the same definitions."),
    blk('intro3', "The next lesson turns the dimensions into scores and a binding-constraint diagnosis. This one is about knowing what each domain actually asks."),

    h2('s1h1', 'Why Readiness Is a Separate Question From Financial Terms'),
    blk('s1p1', "A contract can be well designed and still unmanageable for a particular organization. A hospital with a fair benchmark and no way to produce a monthly attributed list cannot find the patients to call. A hospital with excellent care managers and incomplete diagnosis coding will see a benchmark that understates its population's risk. The financial terms say what the contract pays; readiness says whether the organization can earn it."),
    blk('s1p2', "Chapter 7 states the stakes in one line about strategy: organizations that enter alternative payment models without genuine executive commitment, treating them as a compliance exercise and not a strategic priority, consistently underperform. The same logic applies to the other five domains. They are the organizational preconditions for every calculation in Lessons 1 to 3."),
    callout('s1c1', "Financial terms determine what a contract can pay. Readiness determines whether the organization can earn it. A signed contract with a gap in either is a risk."),

    h2('s2h1', 'Domain One: Strategic Clarity'),
    blk('s2p1', "Strategic Clarity asks whether the organization has a clear reason for taking part, an appropriate governance structure and leadership aligned on risk appetite and timeline. The tool scores five dimensions: executive commitment to value-based care, a board-approved multi-year roadmap with milestones and metrics, governance infrastructure with clinical, financial and operational representation, change management capability and a policy monitoring system that tracks federal and state developments affecting contract terms."),
    blk('s2p2', "Two of these deserve emphasis. The roadmap dimension asks for a documented plan with investment commitments, not an aspiration; an organization without one cannot say which investments in the other five domains come first. The policy monitoring dimension is the operational form of the habit in Lesson 13 of the CMMI course: contract terms are affected by rules that change, such as the 2026 changes to Shared Savings Program benchmarks and the end of Maryland's total cost of care model, and an organization that does not watch them will be surprised."),

    h2('s3h1', 'Domain Two: Data and Technology'),
    blk('s3p1', "Data and Technology covers the analytics infrastructure a value-based population needs. The tool's five dimensions are claims data access and integration across Medicare, Medicaid and commercial payers, patient attribution analytics that can run prospective and retrospective algorithms, total cost of care measurement against targets with trend analysis, risk stratification running continuously with outreach prioritization, and quality measure analytics, including stratified equity analysis."),
    blk('s3p2', "Chapter 7 calls this a significant gap for Vermont. Most community hospitals lack the internal analytics capability to use the state's claims database for population health management, and the joint Agency of Human Services and Green Mountain Care Board analytics vendor procurement addresses the statewide gap, but individual hospital capacity must be built alongside it. The practical test for a hospital is whether it can answer, today, how many attributed members it has, what they cost per member per month against target, and which fifty to call this week."),

    h2('s4h1', 'Domains Three and Four: Care Delivery and Network'),
    blk('s4p1', "Care Delivery Capability asks whether the organization has the clinical programs to act on what risk stratification finds. Its dimensions are primary care transformation toward a patient-centered medical home or equivalent, a care management program staffed with nurse case managers, community health workers and social workers, behavioral health integration, community health worker deployment and patient outreach and engagement capability. Chapter 7 notes that Vermont's Blueprint for Health patient-centered medical homes and community health teams are a strong foundation, and that the gap is in extending it to the more complex patients Act 68's population health requirements target."),
    blk('s4p2', "Network and Partnerships asks about the relationships that determine whether a high-risk patient gets coordinated care after a hospitalization or a specialist referral. Its dimensions are specialist integration through e-consults and co-management protocols, post-acute care management, community organization partnerships with defined referral pathways, care compacts or shared-savings arrangements with key partners and referral network leakage management. Chapter 7 connects it to Oliver Wyman's recommendation of regional centers of excellence. In a risk contract, spending a patient incurs outside the organization still counts against it, so a network gap is a financial gap."),

    h2('s5h1', 'Domains Five and Six: Revenue Cycle and Workforce'),
    blk('s5p1', "Revenue Cycle examines the billing and coding practices that determine whether contracts are financially managed correctly. The tool scores HCC coding completeness, risk adjustment factor gap identification, attribution denial management, reconciliation of value-based payments against contract terms and a regular coding audit and compliance process. Chapter 7 refers readers to Chapter 11 for depth. This domain is the least glamorous and, as the next lesson shows, often the weakest, even though it feeds directly into the benchmark."),
    blk('s5p2', "Workforce Operations asks whether the staffing model, credentialing efficiency, retention and training capability exist to run the care programs of Domain Three. The dimensions are a care team staffing model sized to the attributed population's risk profile and not generic ratios, credentialing and payer enrollment turnaround so new hires do not sit unbillable, retention and turnover management for care management and primary care staff, structured training and onboarding for value-based roles, and scheduling flexibility to shift capacity toward high-risk patients. Turnover in a care management team erodes the continuity that makes the program work."),
    table('s5t1', 'The six domains and the questions each asks', [
        {'Domain': 'Strategic Clarity', 'Core_question': 'Do we know why we are doing this, and does leadership own the risk?', 'Example_dimension': 'VBC strategic roadmap'},
        {'Domain': 'Data and Technology', 'Core_question': 'Can we see our population, its cost and its risk monthly?', 'Example_dimension': 'Total cost of care measurement'},
        {'Domain': 'Care Delivery Capability', 'Core_question': 'Can we act on what the data shows?', 'Example_dimension': 'Care management program'},
        {'Domain': 'Network and Partnerships', 'Core_question': 'Does care stay coordinated outside our walls?', 'Example_dimension': 'Referral network leakage management'},
        {'Domain': 'Revenue Cycle', 'Core_question': 'Are our coding and contract reconciliation accurate?', 'Example_dimension': 'HCC coding completeness'},
        {'Domain': 'Workforce Operations', 'Core_question': 'Can we staff and keep the teams the programs need?', 'Example_dimension': 'Care team staffing model'},
    ]),

    h2('s6h1', 'How to Use the Domains in Practice'),
    blk('s6p1', "Treat the six domains as a conversation structure for the leadership team and not as a form to complete once. Assign each domain an executive owner, ask the owner to score the five dimensions with evidence, and review the results together. The most revealing moment is usually disagreement: when the chief financial officer scores revenue cycle at two and the revenue cycle director scores it at four, the gap between those numbers is itself a finding about how well the organization sees its own capabilities."),
    blk('s6p2', "Repeat the assessment before each major contract decision and at least annually, since the dimensions move: a new analytics vendor lifts Data and Technology, while turnover in the care management team lowers Workforce Operations. The framework is most useful when the same people score the same dimensions over time, because the trend shows whether investments are working."),

    takeaway('tw', [
        "Chapter 7's readiness framework has thirty dimensions in six domains: Strategic Clarity, Data and Technology, Care Delivery Capability, Network and Partnerships, Revenue Cycle and Workforce Operations.",
        "Financial terms determine what a contract can pay; readiness determines whether the organization can earn it.",
        "Organizations that treat value-based contracts as a compliance exercise and not a strategic priority consistently underperform, according to Chapter 7.",
        "Most Vermont community hospitals lack the internal analytics to use the state's claims data for population health management, a gap the statewide analytics vendor does not fully close.",
        "Vermont's Blueprint for Health medical homes and community health teams are a strong care delivery base; the gap is serving the more complex patients Act 68 targets.",
        "Spending outside the organization still counts against it in a risk contract, so network and referral leakage gaps are financial gaps.",
        "Revenue cycle dimensions, including HCC coding completeness and RAF gap identification, feed the benchmark directly.",
    ]),
    quiz('qz',
        "Which of the six readiness domains includes HCC coding completeness and risk adjustment factor gap identification?",
        [
            ("Strategic Clarity", False),
            ("Network and Partnerships", False),
            ("Revenue Cycle", True),
            ("Workforce Operations", False),
        ],
        "The platform's VBC Readiness Assessment scores HCC coding completeness, RAF gap identification, attribution denial management, VBC contract payment reconciliation and coding audit and compliance under the Revenue Cycle domain. These directly affect the benchmark, since diagnoses that are not coded understate the population's expected cost."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.4 and §7.4.1: the 30-dimension readiness framework and the six domains"),
    blk('src2', "[2] HTR Research Lab, VBC Readiness Assessment — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness — the 30 dimensions and their definitions"),
    blk('src3', "[3] " + BOOK7 + " — §7.3 and Figure 7.2: Economics pillar implementation matrix (HCC gap analysis, readiness assessment costs and timelines)"),
    blk('src4', "[4] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — spending outside the ACO counts against it"),
]

# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'vbcfm-readiness-scoring'
L5_TITLE = 'Scoring Readiness and Finding the Binding Constraint'
L5 = [
    blk('intro1', "A readiness assessment produces numbers, and numbers invite misreading. An organization with a high average score can still be exposed, because under downside risk the contract is exposed to its weakest domain and not to its average. This lesson explains how the platform's assessment scores the thirty dimensions, what the bands mean, and why the weakest domain is the diagnosis that matters."),
    blk('intro2', "It then works through the three Vermont presets built into the tool, using arithmetic anyone can check. The presets are illustrative starting points, not survey data about real hospitals, and the lesson treats them that way. The point is to learn to read a profile, since the reading skill transfers to any organization's real scores."),
    blk('intro3', "The lesson also covers what to do with a gap list: the cheapest, fastest fixes first, sequenced by what each domain depends on."),

    h2('s1h1', 'The Scoring Rules'),
    blk('s1p1', "Each of the thirty dimensions is scored from 0 to 4: not started, early stage, in progress, advanced or optimized. The platform reports an overall readiness percentage, which is the average score across the dimensions answered, as a share of the maximum of four. It does not report a raw point total, so an organization that has scored only part of the framework still gets an interpretable result."),
    blk('s1p2', "Chapter 7 gives the interpretation: 80 percent or more indicates global budget readiness; 60 to 79 percent indicates an advanced stage with 12 to 18 months to readiness; and below 60 percent indicates the organization is not yet ready for full-risk value-based care, with the gap analysis identifying the highest-priority investments before contract entry. The tool refines the lower end into further bands for the same purpose: 40 to 59 percent is in progress, with two to three years to readiness; 20 to 39 percent is early stage, needing significant investment; and below 20 percent is not ready, with foundation work required."),
    table('s1t1', 'Readiness bands in the platform\'s assessment', [
        {'Overall_score': '80% or more', 'Reading': 'Global budget ready'},
        {'Overall_score': '60% to 79%', 'Reading': 'Advanced: 12 to 18 months to readiness'},
        {'Overall_score': '40% to 59%', 'Reading': 'In progress: 2 to 3 years to readiness'},
        {'Overall_score': '20% to 39%', 'Reading': 'Early stage: significant investment required'},
        {'Overall_score': 'Below 20%', 'Reading': 'Not ready: foundation work required'},
    ]),
    callout('s1c1', "The band describes the average. The binding constraint is the weakest fully scored domain, and under downside risk it matters more than the average does."),

    h2('s2h1', 'Why the Weakest Domain Rules'),
    blk('s2p1', "The assessment includes a binding-constraint reading: among domains that are fully scored, it compares the weakest with the strongest and tells the user that under downside risk the contract is exposed to the weakest domain, not the average. The logic follows from how risk contracts work. A contract is a chain: data finds the patients, care teams reach them, partners coordinate their care and revenue cycle reconciles the result. A break in any link cuts the whole chain, however strong the others."),
    blk('s2p2', "Only fully scored domains compete for the title, so a half-answered domain cannot win by default. That rule prevents a common error, in which an organization scores the sections it knows well and leaves the uncomfortable ones blank. A domain that has not been scored is a domain whose readiness is unknown, which for risk purposes is worse than a known low score."),

    h2('s3h1', 'Reading Three Illustrative Profiles'),
    blk('s3p1', "The tool ships with three presets. Each score below is the sum of five dimensions, each from 0 to 4, so a domain maximum is 20. These are illustrative profiles, calculated here from the preset values, and are not findings about any real organization."),
    blk('s3p2', "The first, labeled a Vermont hospital at Act 68 global budget entry in fiscal year 2028, totals 53 of 120 points, which is 44 percent and falls in the in-progress band. Its domain scores are 12 of 20 for Strategic Clarity (60 percent), 10 for Data and Technology (50 percent), 10 for Care Delivery (50 percent), 8 for Network and Partnerships (40 percent), 6 for Revenue Cycle (30 percent) and 7 for Workforce Operations (35 percent). The reading is clear: leadership is committed, but Revenue Cycle is the binding constraint at 30 percent, 30 points below the strongest domain. A hospital with that profile that signs a risk contract is exposed through its coding and reconciliation."),
    blk('s3p3', "The second, a Vermont critical access hospital in early transformation, totals 24 of 120, which is 20 percent and sits at the bottom of the early-stage band. Revenue Cycle again scores lowest, 1 of 20 or 5 percent. The third, an integrated health system labeled advanced, totals 108 of 120 or 90 percent, in the global budget ready band, with its weakest domain, Network and Partnerships, at 16 of 20 or 80 percent. The three profiles share something instructive: in each, revenue cycle or network is the lowest-scoring domain."),
    table('s3t1', 'Preset profiles: domain scores as percent of maximum (illustrative)', [
        {'Domain': 'Strategic Clarity', 'Act_68_entry': '60%', 'Critical_access': '35%', 'Advanced_system': '95%'},
        {'Domain': 'Data and Technology', 'Act_68_entry': '50%', 'Critical_access': '25%', 'Advanced_system': '95%'},
        {'Domain': 'Care Delivery', 'Act_68_entry': '50%', 'Critical_access': '30%', 'Advanced_system': '95%'},
        {'Domain': 'Network and Partnerships', 'Act_68_entry': '40%', 'Critical_access': '15%', 'Advanced_system': '80%'},
        {'Domain': 'Revenue Cycle', 'Act_68_entry': '30%', 'Critical_access': '5%', 'Advanced_system': '90%'},
        {'Domain': 'Workforce Operations', 'Act_68_entry': '35%', 'Critical_access': '10%', 'Advanced_system': '85%'},
        {'Domain': 'Overall', 'Act_68_entry': '44%', 'Critical_access': '20%', 'Advanced_system': '90%'},
    ]),
    warning('s3w1', "Presets are teaching profiles, not benchmarks", "The built-in profiles are starting points that show how a profile reads. Do not cite them as the readiness of Vermont hospitals. A real assessment needs the organization's own evidence for every dimension."),

    h2('s4h1', 'From Gap List to Investment Sequence'),
    blk('s4p1', "The assessment lists the dimensions that score lowest, with their domains. Chapter 7 gives indicative costs and timelines for the investments that follow. An HCC gap analysis and closure program costs $25,000 to $100,000 a year, with three to six months to set up. The readiness assessment itself costs $30,000 to $75,000 per organization over 60 to 90 days if done with outside help. Preparing for an alternative payment model's shared savings is $75,000 to $200,000 and six to nine months, with an ROI crossover at 12 to 24 months. Global budget financial modeling and stress testing costs $50,000 to $150,000 per hospital over three to six months. These are indicative ranges, not quotes."),
    blk('s4p2', "The right sequence follows dependency. Data and Technology and Revenue Cycle come first because they feed the benchmark and the attributed list on which everything else depends. Care Delivery builds on the data, and Network and Partnerships on care delivery. Workforce runs through all of them. Strategic Clarity must be in place before any investment is committed. This echoes the book's five-pillar argument that upstream constraints govern downstream results: spending on care managers before the organization can see its population or code it accurately produces cost with little return."),
    steps('s4st1', 'Turning a readiness profile into a plan', [
        ('Score every dimension with evidence', 'No blanks; note the document or system that supports each score.'),
        ('Find the weakest fully scored domain', 'That is the binding constraint and the first investment target.'),
        ('Check upstream dependencies', 'Fix data and revenue cycle gaps before scaling care programs that rely on them.'),
        ('Price and time the fixes', 'Use indicative ranges, then replace them with quotes.'),
        ('Set a go or no-go threshold', 'State the score and weakest-domain level required before accepting downside risk.'),
    ]),

    h2('s5h1', 'Pitfalls in Scoring'),
    blk('s5p1', "Three habits distort self-assessments. The first is optimism: scoring a dimension 'in progress' because a project exists, when the question is whether the capability works today. A useful rule is to score what is running and measured, and to give no credit for plans. The second is averaging across units: a system with one strong hospital and several weak ones will score a middling average that describes none of them, so assess each contracting entity separately. The third is scoring in isolation from the contract. A readiness profile that supports a Shared Savings Program arrangement in Basic level B may not support Enhanced track losses of up to 15 percent of benchmark, so state which contract the assessment is for."),
    blk('s5p2', "Evidence is the safeguard. For every score of three or four, record the artifact that supports it: the monthly attributed list, the audit report on coding, the staffing ratios by risk tier, the signed partner agreement. A score without an artifact should be treated as a hypothesis, and the gap list should include the work of producing the evidence."),

    takeaway('tw', [
        "Each of the 30 dimensions is scored 0 to 4, and the overall readiness is the average of answered dimensions as a percentage of the maximum.",
        "In the platform's bands, 80 percent or more is global budget ready, 60 to 79 percent is advanced with 12 to 18 months to go, and below 60 percent means not yet ready for full risk.",
        "Under downside risk the contract is exposed to the weakest fully scored domain, not the average.",
        "Only fully scored domains compete for the binding-constraint title, so leaving a domain blank does not hide a weakness; it leaves readiness unknown.",
        "The built-in Act 68 entry profile totals 53 of 120 points, or 44 percent, with Revenue Cycle at 30 percent as the binding constraint; the profiles are illustrative, not survey data.",
        "Chapter 7's indicative costs include HCC gap closure at $25,000 to $100,000 a year and global budget stress testing at $50,000 to $150,000 per hospital.",
        "Sequence fixes by dependency: data and revenue cycle first, then care delivery, then network, with workforce throughout.",
    ]),
    quiz('qz',
        "An organization scores 62 percent overall on the readiness assessment, but its Revenue Cycle domain scores 25 percent and all others score above 70 percent. What should it conclude?",
        [
            ("It is ready for full-risk contracts because 62 percent exceeds 60 percent", False),
            ("Revenue Cycle is the binding constraint and should be closed before accepting downside risk, whatever the overall score says", True),
            ("The score is invalid because domain scores must be equal", False),
            ("It should score only the strong domains", False),
        ],
        "The assessment treats the weakest fully scored domain as the exposure under downside risk. A strong average can hide a domain, such as coding and reconciliation, that will sink a risk contract, so the organization should address it before accepting losses."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.4.2: scoring and the 80/60 percent thresholds; §7.3 Figure 7.2: implementation matrix costs and timelines"),
    blk('src2', "[2] HTR Research Lab, VBC Readiness Assessment — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness — bands, binding-constraint rule and the three Vermont presets"),
    blk('src3', "[3] " + BOOK7 + " — §7.4.1: the six readiness domains and Vermont context"),
    blk('src4', "[4] " + BOOK7 + " — §7.9 Figure 7.6: platform tools for the Economics pillar"),
]

# ════════════════════════════════════════════════════════════════════════════
L6_SLUG = 'vbcfm-contract-review'
L6_TITLE = 'Reading an APM Contract for Financial Risk'
L6 = [
    blk('intro1', "The headline terms of a value-based contract, the sharing rate and the start date, rarely tell the story. The financial risk sits in provisions that look technical: how the benchmark is rebased, how patients are attributed, which services are carved out, when settlement happens and who can amend the terms. Chapter 7 says that an arrangement that looks attractive at the summary level may contain provisions that substantially change the financial calculus."),
    blk('intro2', "This lesson walks through the platform's VBC Contract Review Checklist, which covers 65 provisions in eight categories, 24 of them marked critical. It explains the questions each category asks, shows the arithmetic behind the quality withhold and the carve-out symmetry rule, and ends with a practical method for using the checklist in a negotiation."),
    blk('intro3', "The checklist is a framework for questions, not legal advice. A contract that matters should also go to counsel and an actuary."),

    h2('s1h1', 'Eight Categories, Sixty-Five Provisions'),
    blk('s1p1', "The checklist groups provisions into eight categories. Benchmark methodology has nine provisions, covering how target spend is set; attribution methodology has eight, covering who counts as the organization's patient; quality withhold and measurement has eight; risk corridors and stop-loss has eight; carve-outs and exclusions has eight; reconciliation timing and settlement has eight; data sharing and reporting has eight; and termination, renewal and governance has eight. Each provision carries a severity rating of critical, high or standard, and 24 are critical."),
    table('s1t1', 'The eight categories of the VBC Contract Review Checklist', [
        {'Category': 'Benchmark methodology', 'Provisions': '9', 'What_it_decides': 'How the target spend is set and reset'},
        {'Category': 'Attribution methodology', 'Provisions': '8', 'What_it_decides': 'Who counts as your patient, the denominator of cost and quality'},
        {'Category': 'Quality withhold and measurement', 'Provisions': '8', 'What_it_decides': 'How much earned savings is held back against quality'},
        {'Category': 'Risk corridors and stop-loss', 'Provisions': '8', 'What_it_decides': 'The worst plausible year'},
        {'Category': 'Carve-outs and exclusions', 'Provisions': '8', 'What_it_decides': 'What sits outside the risk pool'},
        {'Category': 'Reconciliation and settlement', 'Provisions': '8', 'What_it_decides': 'When money moves'},
        {'Category': 'Data sharing and reporting', 'Provisions': '8', 'What_it_decides': 'Whether the payer supplies what you need to act'},
        {'Category': 'Termination, renewal and governance', 'Provisions': '8', 'What_it_decides': 'The exit and who can change the terms'},
    ]),

    h2('s2h1', 'Benchmark and Attribution'),
    blk('s2p1', "The benchmark category asks the questions of Lesson 1 in contract form. The critical provisions are that the construction method is named explicitly, that the trend factor's source and update cadence are defined, that the risk adjustment model and its version are named, and that the rebasing schedule and ratchet protection are stated. The last is easy to underestimate: if a benchmark is rebased to include the organization's own prior savings and the contract gives no protection, success lowers the next year's target, and the better the organization performs the less room it has."),
    blk('s2p2', "The attribution category decides the denominator. Its critical provisions are whether attribution is prospective or retrospective, and whether the algorithm is reproducible from the contract. A prospective list is fixed before the year and is manageable; a retrospective list is assigned after it and is not. Reproducibility matters because an organization that cannot recompute its own attributed list cannot check the payer's work. Other provisions in the category ask how often the roster is refreshed, whether out-of-network care still counts against the organization and how members attributed under more than one arrangement are treated, so the same savings are not claimed twice."),

    h2('s3h1', 'Quality Withhold: The Arithmetic'),
    blk('s3p1', "Chapter 7 uses a quality withhold to show how contract terms compound. Suppose the contract gives the organization a 50 percent share of gross savings and withholds 30 percent of that share pending quality performance. The amount at stake is 30 percent of the organization's own payment, which is 15 percent of gross savings. If gross savings are $4 million, the organization's share is $2 million, the withhold is $600,000 and the amount at risk on quality is 15 percent of the $4 million, which is the same $600,000. Whether the withhold is taken from shared savings, from total payment or from the benchmark are three very different amounts, so the base must be named."),
    blk('s3p2', "The critical quality provisions follow from the arithmetic. The withhold percentage and its base must be stated. The measure set must be enumerated and version-locked, so the payer cannot change the measures by reference to a manual. And the performance thresholds and benchmark population must be fixed, whether against absolute targets or a percentile of a peer distribution. High-severity provisions add that improvement should earn credit alongside attainment, so an organization starting below the threshold has a reachable path, and that measure denominators should be small-population-aware."),
    steps('s3st1', 'Working a quality withhold', [
        ('Gross savings', 'Benchmark minus actual spending, here $4 million.'),
        ('Organization\'s share', 'Apply the sharing rate: 50 percent gives $2 million.'),
        ('Withhold', 'Apply the withhold to the organization\'s share: 30 percent gives $600,000.'),
        ('Released amount', 'The withhold is released only if the measures are met; otherwise the organization receives $1.4 million.'),
    ]),

    h2('s4h1', 'Risk Corridors, Carve-Outs and Settlement'),
    blk('s4p1', "The risk category decides the worst plausible year, which is the number the balance sheet has to survive. Its critical provisions are that both the minimum savings rate and the minimum loss rate are stated, that the sharing rate is stated in both directions with any asymmetry explicit, that the aggregate loss cap is expressed in dollars and modeled against a bad year, that the individual-member stop-loss threshold and its basis are defined, and that any financial guarantee, such as a letter of credit or escrow, is sized and its effect on days cash on hand is understood. A percentage cap on losses can hide a very large dollar figure for a large benchmark."),
    blk('s4p2', "The carve-out category protects the integrity of the benchmark. Its central critical provision is that carve-outs are applied symmetrically: any cost excluded from performance-year spending must also be excluded from the baseline used to build the benchmark. A carve-out that removes cost from performance but leaves it in the benchmark, or the reverse, silently rewrites the economics. Other critical provisions require every carve-out to be listed with its defining code set and the scope of pharmacy to be unambiguous, since drug cost is the commonest source of dispute."),
    blk('s4p3', "The reconciliation category is about cash. Its critical provisions are that the settlement date is fixed relative to year-end, and that the payer's right to reopen a completed reconciliation is bounded. A contract can be economically sound and still be unaffordable on its settlement schedule, particularly if losses are due in a lump sum rather than amortized or offset against future payments, which is a high-severity item."),
    callout('s4c1', "Check every carve-out on both sides of the equation. If a cost is excluded from this year's performance, it must also be excluded from the baseline that sets the benchmark."),

    h2('s5h1', 'Data, Termination and Using the Checklist'),
    blk('s5p1', "The data category is the operational half of the contract. Chapter 7 names data and analytics capability as the binding constraint on Vermont readiness, and these provisions decide whether the payer supplies what the constraint needs. The critical ones are that member-level claims files are contractually guaranteed, that data delivery lag is capped with a remedy, and that the settlement calculation is transparent, meaning the organization can receive the workbook with inputs and intermediate steps and reproduce it. Termination, renewal and governance has two critical provisions: that termination for convenience is mutual, and that unilateral amendment rights are constrained, since a payer able to change measures, rates or benchmark methodology by notice alone controls the contract."),
    blk('s5p2', "To use the checklist, review the contract against each provision and mark it present, partial or missing. Sort the gaps by severity and then by dollar impact, and take the critical gaps to the negotiation first. The tool summarizes gaps by category and lists open ones, so the negotiating list builds itself. A useful discipline is to price the three largest gaps: model what a bad year costs under the current terms and under the terms you want, and bring the difference to the table."),
    warning('s5w1', "Silence is a term", "A contract that does not state a provision, such as a rebasing schedule or a settlement deadline, leaves the answer to the payer's discretion or to later interpretation. Treat a missing provision as a risk, not a neutral."),

    takeaway('tw', [
        "The platform's checklist covers 65 provisions in eight categories, 24 of them critical: benchmark, attribution, quality withhold, risk corridors, carve-outs, reconciliation, data and termination.",
        "Unprotected rebasing means success lowers the next year's target; the rebasing schedule and ratchet protection are critical benchmark provisions.",
        "Prospective attribution is manageable and retrospective attribution is not; the algorithm should be reproducible from the contract.",
        "A 30 percent withhold on a 50 percent share puts 15 percent of gross savings at stake; the base of the withhold must be named.",
        "The aggregate loss cap should be stated as a dollar figure and modeled against a bad year, and any financial guarantee should be sized against days cash on hand.",
        "Carve-outs must be symmetric: cost excluded from performance must also be excluded from the baseline that sets the benchmark.",
        "Treat a missing provision as a risk, sort gaps by severity and dollar impact, and negotiate the critical ones first.",
    ]),
    quiz('qz',
        "A contract gives an organization 50 percent of gross savings and withholds 30 percent of that share pending quality. Gross savings are $4 million. How much is at risk on quality performance?",
        [
            ("$1.2 million", False),
            ("$600,000", True),
            ("$2 million", False),
            ("$120,000", False),
        ],
        "The organization's share is 50 percent of $4 million, which is $2 million. The withhold is 30 percent of that share, which is $600,000, equal to 15 percent of gross savings. If quality targets are missed, the organization receives $1.4 million."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.5 and Figure 7.3: contract analysis framework and the quality withhold example"),
    blk('src2', "[2] HTR Research Lab, VBC Contract Review Checklist — https://healthtransformationreview.org/research-lab/payment-models?tab=contract-review — 65 provisions, eight categories, severity ratings; counts tallied from the tool's source on 2026-11-23"),
    blk('src3', "[3] " + BOOK7 + " — §7.2.1-7.2.5: benchmark methods and the shared savings calculation that the contract provisions parameterize"),
    blk('src4', "[4] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — a public example of benchmark, assignment, quality and loss-limit terms"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5), (L6_SLUG, L6_TITLE, L6, 6)]
if __name__ == '__main__':
    run(LESSONS)
