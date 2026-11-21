exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 2 — Vermont's Attempt, 2011-2014
# Facts: VERIFIED_FACTS_M4A.md §§ A-E; Act 48 text (Sec. 1a, §§ 1821, 1822, 1824, 1825, 1827, 1828, 1829, 9374,
# Sec. 9, Sec. 34); 2013 plan pp. 3, 15, 59; Avalere pp. 1-4, 8, 22; 2014 report pp. 6-7, 9, 15-16, 19-20, 40, 45, 51;
# Lunge/Costa Jan 14, 2015 deck; HTR book Appendix A (GMCB). Written 2026-11-21.

# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'm4a-act-48'
L3_TITLE = 'Act 48 of 2011: What Vermont Enacted'
L3 = [
    blk('intro1', "Act 48 of 2011 wrote a path to a universal, publicly financed health plan into Vermont law. It was approved on May 26, 2011. It created institutions that still shape Vermont's health system, set out principles for how health care should be financed, defined a universal plan called Green Mountain Care, and then made that plan wait on conditions the state would have to meet later."),
    blk('intro2', "This lesson reads the statute itself. It covers the design work that came before it, the principles and purpose the legislature wrote into law, the institutions it created, the benefits it promised, and the parts it deliberately left for later. The conditions it set for starting Green Mountain Care are treated briefly here, because Lessons 4 and 5 follow what happened when the state tried to meet them."),

    h2('s1h1', 'The Design Work Behind the Law'),
    blk('s1p1', "Act 48 followed a design study. Act 128 of 2010 had asked a team led by William Hsiao to develop options for Vermont, and the report, released in January 2011, recommended a public-private single payer. Its design parameters are worth knowing, because several of them did not survive contact with the financing work three years later."),
    blk('s1p2', "The Hsiao models assumed the system would start in 2015. They assumed no overall increase in health spending, with the money needed coming from savings, no overall increase in spending for employers and workers, and no reduction in overall net income for physicians, hospitals and other providers. Medicare beneficiaries would see no change. Financing would come from a payroll tax on employers and employees, with payroll capped at $106,800, the Social Security wage base at the time. The plan would also capture a federal grant equal to the exchange subsidies and small-business tax credits Vermont would otherwise receive under the Affordable Care Act."),
    blk('s1p3', "Those assumptions describe a reform that pays for itself. The Joint Fiscal Office's later summary noted that the report itself called its savings \"inherently uncertain\", and that some savings would arrive immediately while others would take years."),
    stat_grid('s1sg1', [
        ('3', 'Options designed', 'Government-run single payer, public option, public-private single payer (Hsiao report, Jan 2011)'),
        ('16.1-25.3%', 'Estimated accumulated savings', 'Range across the three options (JFO overview of the Hsiao report)'),
        ('2015', 'Assumed start year', 'Hsiao design parameters (JFO overview)'),
        ('$106,800', 'Payroll cap in the financing design', 'Same as the Social Security cap at the time (JFO overview)'),
    ]),

    h2('s2h1', 'Principles and Purpose Written Into Law'),
    blk('s2p1', "Section 1a of Act 48 lists the principles Vermont's health system must meet. One of them governs this whole course: \"The financing of health care in Vermont must be sufficient, fair, predictable, transparent, sustainable, and shared equitably.\" Another requires mechanisms for containing all system costs, including by reducing administrative costs. A third says the system must let health care professionals \"provide, on a solvent basis, effective and efficient health services.\""),
    blk('s2p2', "The purpose section for Green Mountain Care (33 V.S.A. § 1821) defines the plan as coverage provided \"as a public good\": comprehensive, affordable, high-quality, publicly financed health coverage for all Vermont residents, regardless of income, assets, health status or other coverage. It names four ways the plan would contain costs: incentives for residents to avoid preventable conditions and unnecessary emergency visits; innovative payment mechanisms such as global payments; managing services through the Blueprint for Health; and reducing unnecessary administrative spending."),
    blk('s2p3', "Notice how much of today's Vermont reform agenda is already in that list. Global payments to providers reappear fourteen years later as the hospital global budgets of Act 68 of 2025. The Blueprint for Health, the third tool on the list, still operates today."),
    quote('s2q1', "\"The financing of health care in Vermont must be sufficient, fair, predictable, transparent, sustainable, and shared equitably.\" (Act 48 of 2011, Sec. 1a, principle 11)"),

    h2('s3h1', 'The Institutions Act 48 Created'),
    blk('s3p1', "Act 48 built three things. The first was the Green Mountain Care Board, created on July 1, 2011 with a chair and four members. They are nominated by a nominating committee using qualifications set in statute, appointed and confirmed in the same way as a superior judge, and paid on that scale. The Board was given duties over payment reform, benefits and, later, the approval of the Green Mountain Care benefit package and budget."),
    blk('s3p2', "The second was the Vermont health benefit exchange, the state's Affordable Care Act marketplace. The statute required it to begin enrolling people by November 1, 2013 and to be fully operational by January 1, 2014, and it described the exchange as the mechanism that would, \"to the extent allowable under federal law or a waiver of federal law\", become the vehicle for Green Mountain Care."),
    blk('s3p3', "The third was Green Mountain Care itself, a plan for which all residents would be eligible, \"regardless of whether an employer offers health insurance for which they are eligible.\" Non-residents would not be eligible, and the statute set penalties for knowingly giving false information to qualify."),
    example('s3ex1', 'The Green Mountain Care Board, from 2011 to today', "Act 48 created the Board on July 1, 2011 (18 V.S.A. § 9374). The HTR book's Appendix A describes what it became: an independent body that, since taking over hospital budget review for FY2013, does not merely review hospital budgets but establishes them, and enforces them by reducing future commercial-rate approvals.\nFor FY2025 the Board capped system-wide hospital net patient revenue at $3.7 billion and enforced FY2023 overages against UVM Medical Center and Rutland Regional, according to Appendix A. The plan it was created to oversee was never implemented; the regulator was."),

    h2('s4h1', 'The Benefits the Statute Promised'),
    blk('s4p1', "Section 1825 sets the floor for what Green Mountain Care would cover: primary care, preventive care, chronic care, acute episodic care and hospital services, and at least the services in the lowest-cost Catamount Health plan offered on January 1, 2011. It states the legislature's intent that the plan's benefits be actuarially equivalent to at least 87 percent of the full value of covered services. Coverage could not be limited for pre-existing conditions."),
    blk('s4p2', "Much was left to the Board. It was to consider whether to impose cost-sharing, whether to make it income-sensitive, and whether to waive it for evidence-based primary and preventive care, palliative care and chronic care management. It was to consider whether to include dental, vision and hearing benefits, and whether to include long-term care. The 2014 design later answered most of these questions: about 94% actuarial value, average out-of-pocket costs of 6%, and no long-term care, adult dental, adult vision or hearing coverage."),
    highlight('s4hl1', "Act 48 set an intent of 87% actuarial value but required only 80% before the plan could start. The 2014 design aimed at about 94%."),
    compare('s4cmp1', 'What the statute fixed and what it left open',
        'Fixed in Act 48', ['Primary, preventive, chronic, acute and hospital care', 'At least the lowest-cost Catamount plan\'s services', 'No pre-existing condition limits', 'Intent: at least 87% actuarial value'],
        'Left to the Board', ['Whether to charge cost-sharing, and how', 'Dental, vision and hearing', 'Long-term care', 'The final benefit package, which needed its approval']),

    h2('s5h1', 'What Act 48 Deliberately Left Undone: Financing'),
    blk('s5p1', "Act 48 did not raise a dollar for Green Mountain Care. Instead, Section 9 ordered the Secretary of Administration to recommend two financing plans to the legislature by January 15, 2013. One would finance whatever had to be in place by January 1, 2014 to cover all Vermonters if no federal waiver was available. The other would finance Green Mountain Care itself, and would recommend whether non-residents employed by Vermont businesses should be eligible. The same section required strategies for people covered by the VA, TRICARE and the federal employees' plan."),
    blk('s5p2', "Two further provisions set up the machinery. Section 1828 made the Board, with the agencies of administration and human services, responsible for a three-year Green Mountain Care budget each year, including recommended appropriations, revenue estimates and changes to tax rates. Section 1829 created the Green Mountain Care Fund as \"the single source to finance health care coverage for Green Mountain Care\", into which federal Medicaid, Medicare and exchange money could flow only \"if authorized by a waiver from federal law.\""),
    blk('s5p3', "In other words, the statute built the account and the process for filling it, and then left the filling to a future law. Lessons 4 and 5 show what happened when that future law had to be written."),
    warning('s5w1', 'A fund is not financing', "Creating the Green Mountain Care Fund made a place for money to go. It did not create the money. Act 48's own implementation conditions recognized this by requiring a separate law establishing the financing."),

    h2('s6h1', 'Five Conditions Before the Plan Could Start'),
    blk('s6p1', "Under 33 V.S.A. § 1822, Green Mountain Care would begin 90 days after the last of five conditions was met: receipt of an ACA § 1332 waiver; enactment of a law establishing the financing; Board approval of the initial benefit package; enactment of appropriations for it; and a Board determination that six conditions would hold. Those six were benefits of at least 80% actuarial value for every resident; no negative aggregate effect on Vermont's economy; sustainable financing; lower administrative expenses; slower growth in per-capita health spending; and provider payment high enough to recruit and retain professionals."),
    blk('s6p2', "That design is unusual and, in hindsight, important. It made the plan's start depend on evidence rather than on a date. When the financing evidence came in, the statute already told everyone what had to be true before the state could proceed."),
    steps('s6st1', 'Act 48\'s path to implementation (33 V.S.A. § 1822)', [
        ('Federal waiver', 'Obtain an ACA § 1332 waiver to suspend the exchange and receive the subsidy money directly.'),
        ('Financing law', 'Enact a law establishing how Green Mountain Care will be paid for.'),
        ('Benefit package', 'The Board approves the initial benefit package.'),
        ('Appropriations', 'The legislature appropriates the money for that package.'),
        ('Board findings', 'The Board finds the six conditions will hold, including no harm to the economy and sustainable financing; the plan starts 90 days after the last step.'),
    ]),

    takeaway('tw', [
        "Act 48 was signed on May 26, 2011, after the Hsiao report recommended a public-private single payer financed by a payroll tax.",
        "Its principles require financing that is sufficient, fair, predictable, transparent, sustainable and shared equitably.",
        "It created the Green Mountain Care Board on July 1, 2011, the state exchange, and the Green Mountain Care plan for all residents.",
        "The statute set a benefit floor and an 87% actuarial-value intent, and left cost-sharing, dental, vision, hearing and long-term care to the Board.",
        "It created a Green Mountain Care Fund but raised no money, ordering financing plans by January 15, 2013 instead.",
        "Federal Medicare, Medicaid and exchange money could enter the fund only if a federal waiver allowed it.",
        "The plan could start only after five conditions, including a financing law and a Board finding of no harm to the economy.",
    ]),
    quiz('qz', "What did Act 48 do about financing Green Mountain Care?", [
        ("It levied an 11.5% payroll tax effective in 2014", False),
        ("It created a fund and a budget process, ordered financing plans, and made a separate financing law a condition of starting the plan", True),
        ("It relied entirely on a federal block grant approved in 2011", False),
        ("It required employers to pay premiums directly to the Green Mountain Care Board", False),
    ], "Act 48 created the Green Mountain Care Fund (§ 1829) and an annual budget process (§ 1828), ordered financing plans by January 15, 2013 (Sec. 9), and listed enactment of a financing law among the conditions for implementation (§ 1822). The 11.5% payroll tax appeared only in the administration's December 2014 analysis, and was never enacted."),
    *sources(['act48', 'hsiao', 'gmc14', 'bookA', 'book2', 'act48page'], {
        'act48': "Sec. 1a principles; §§ 1801, 1821, 1822, 1824, 1825, 1828, 1829, 9374; Sec. 9 financing plans; Sec. 34 exchange dates; approval May 26, 2011",
        'hsiao': "design parameters, payroll cap, savings range and caveats",
        'gmc14': "pp. 7, 20: the 2014 design's ~94% actuarial value, 6% out-of-pocket and excluded benefits",
        'bookA': "the Green Mountain Care Board's budget-setting role, FY2025 cap and enforcement",
        'book2': "the book's own account of Act 48 and why the plan stopped",
        'act48page': "timeline and conditions table on the platform",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'm4a-financing-2013-2014'
L4_TITLE = 'The Numbers: From $1.6 Billion to $2.6 Billion'
L4 = [
    blk('intro1', "Between January 2013 and December 2014, Vermont produced three serious estimates of what Green Mountain Care would cost the state's taxpayers. Each was larger than the one before. This lesson walks through them in order: the state's first financing plan, an outside critique paid for by providers and employers, and the administration's final report."),
    blk('intro2', "The point is not that one estimate was right. It is that the gap between estimates was driven by specific, identifiable assumptions: how much federal money the state could capture, how much administrative cost it could cut and how fast, and what the state would have to give up to make the transition fair. Those assumptions return at the federal level in Track 4."),

    h2('s1h1', 'January 2013: The First Financing Plan'),
    blk('s1p1', "The Agency of Administration delivered the plan Act 48 required on January 24, 2013, with analysis by the University of Massachusetts Medical School and Wakely Consulting. It modelled 2017, the first year the plan might operate, and estimated that total health spending in Vermont would be slightly lower with Green Mountain Care than without it: $5,916 million against $5,952 million. Over 2017 to 2019 it projected cumulative savings of $281 million, growing each year as lower administrative costs and slower cost growth took effect."),
    blk('s1p2', "The headline number was the amount the state would have to raise: $1,611 million in 2017. The plan described this as a portion of what employers and individuals were already paying in premiums, and it did not designate where the money would come from. That was by design: the Governor was to recommend revenue sources in a 2014 report, for the legislature to consider in early 2015."),
    blk('s1p3', "The plan also made clear how much would stay outside the state's control. Medicare would continue to cover about $1.6 billion in costs for Medicare beneficiaries. Other federal sources, such as the federal employees' plan and the VA, would spend another $209 million. The plan counted on $267 million through an ACA waiver, assuming the federal government agreed to pass through what it would otherwise have spent in Vermont, and on $1.2 billion of federal Medicaid match, assuming the state's Section 1115 waiver terms continued."),
    table('s1t1', 'Sources of funds in 2017, 2013 plan ($ millions)', [
        {'Source': 'Individuals and employers', 'Without_reform': '2,228', 'With_reform': '332'},
        {'Source': 'Federal: Medicare', 'Without_reform': '1,613', 'With_reform': '1,613'},
        {'Source': 'Federal: Medicaid match', 'Without_reform': '998', 'With_reform': '1,247'},
        {'Source': 'Federal: ACA waiver', 'Without_reform': '267', 'With_reform': '267'},
        {'Source': 'Federal: other', 'Without_reform': '209', 'With_reform': '209'},
        {'Source': 'State Medicaid', 'Without_reform': '637', 'With_reform': '637'},
        {'Source': 'Amount to be financed', 'Without_reform': '—', 'With_reform': '1,611'},
    ]),

    h2('s2h1', 'Who Was Already Outside the Plan'),
    blk('s2p1', "The 2013 plan began from a picture of how Vermonters were insured in 2010. Of 334,000 people with commercial coverage, 150,000 were in self-insured employer plans, 105,000 in the large-group market, 61,000 in small-group plans and 18,000 in the individual market. Another 54,000 were uninsured."),
    blk('s2p2', "Two of those groups sit at the heart of Track 3. Medicare beneficiaries could not be moved into a state plan without federal permission. Self-insured employer plans are governed by federal law, not state insurance law, so a state cannot require them to join. A single-payer plan that cannot reach those groups is single payer for everyone else, and its administrative savings are limited, because hospitals keep billing the payers outside it."),
    stat_grid('s2sg1', [
        ('150,000', 'Vermonters in self-insured plans (2010)', '2013 financing plan, Table 1'),
        ('54,000', 'Uninsured Vermonters (2010)', '2013 financing plan, Table 1'),
        ('$1,613M', 'Medicare spending outside the state plan (2017)', '2013 financing plan, Table 7'),
        ('$281M', 'Projected savings, 2017-2019', '2013 financing plan, Table 6'),
    ]),

    h2('s3h1', 'November 2013: An Outside Critique'),
    blk('s3p1', "In November 2013, Avalere Health published an evaluation of the plan. Avalere was retained by Vermont Partners for Health Care Reform, a coalition of providers and employers, so its conclusions should be read as those of an interested party. It did not build its own model. Instead it re-ran the plan's own alternatives for provider payment rates and administrative savings, and concluded that a more appropriate cost, at the same scale, could be $1.9 to $2.2 billion, about 20 to 35 percent above the state's figure."),
    blk('s3p2', "Avalere's reasons are more useful than its number. It argued that providers might not realize the projected administrative savings, because they would keep dealing with Medicare beneficiaries, with people in employer plans exempt from state regulation under ERISA, and with out-of-state patients, all outside the state plan. It noted that the plan assumed nearly 70 percent of residents would have Green Mountain Care as primary coverage by 2017, and it recorded that \"State officials acknowledge that Vermont has no power to regulate the actions of self-insured employers.\""),
    warning('s3w1', 'Read interested-party analysis for its reasoning', "Avalere's estimate was commissioned by a coalition with a stake in the outcome. Its mechanisms, such as administrative savings eroding because payers outside the plan remain, can be checked against the state's own later report, which is how this course uses it."),

    h2('s4h1', 'December 2014: The Final Design'),
    blk('s4p1', "The administration's final report, dated December 30, 2014, described a more generous and more complete plan than earlier work. Green Mountain Care would cover all Vermonters except those on Medicare or TRICARE, plus out-of-state employees who commute to work at Vermont businesses. Benefits would average about 94% actuarial value, with Vermonters paying an average of 6% of costs out of pocket, roughly what state employees and teachers had at the time."),
    blk('s4p2', "Enrollment would reach 544,000 at maturity in year three. The coverage table for 2017 shows what that meant: 519,000 people in Green Mountain Care, while 140,000 remained on Medicare and 10,000 on TRICARE or VA coverage. Employer coverage would fall from 296,000 people to 31,000. Medicaid, the individual market, the uninsured and 61,000 non-resident commuters would all move into the plan."),
    table('s4t1', 'Source of primary coverage, 2017 (2014 report, Table 1)', [
        {'Coverage': 'Green Mountain Care', 'Under_ACA': 'n/a', 'Under_GMC': '519,000'},
        {'Coverage': 'Medicare', 'Under_ACA': '140,000', 'Under_GMC': '140,000'},
        {'Coverage': 'TRICARE and Veterans', 'Under_ACA': '10,000', 'Under_GMC': '10,000'},
        {'Coverage': 'Employer coverage', 'Under_ACA': '296,000', 'Under_GMC': '31,000'},
        {'Coverage': 'Medicaid', 'Under_ACA': '141,000', 'Under_GMC': 'in GMC'},
        {'Coverage': 'Non-resident commuters', 'Under_ACA': '61,000', 'Under_GMC': 'in GMC'},
    ]),

    h2('s5h1', 'The Balance Sheet'),
    blk('s5p1', "The report's balance sheet is the single most important table in Vermont's single-payer history. In 2017 the plan would cost $4,340 million. Federal Medicaid match ($1,310 million), federal ACA waiver money ($106 million) and state Medicaid funding ($344 million) would cover part of it, leaving $2,580 million of new revenue to raise. By 2021 that gap would grow to $3,174 million."),
    blk('s5p2', "The report proposed to fill it with two new taxes. An 11.5 percent payroll tax on all Vermont employers would raise $1,510 million in 2017. A \"public premium\" on individuals, a sliding scale from 0 to 9.5 percent of income, capped at $27,500 for the highest earners, would raise $1,247 million. The report estimated that more than 74.5 percent of Vermonters would pay less than $5,000 a year and that 1.2 percent of taxpayers, 4,349 households, would pay the maximum."),
    blk('s5p3', "Even so, the fund would run a surplus of $177 million in 2017 and $92 million in 2018, then a deficit of $2 million in 2019, $95 million in 2020 and $154 million in 2021. And those figures did not include a phase-in of the payroll tax for small businesses, which the report called a policy priority of the Governor's."),
    stat_grid('s5sg1', [
        ('$4,340M', 'Cost of coverage and operations, 2017', '2014 report, Table 13'),
        ('$2,580M', 'New revenue needed, 2017', '2014 report, Table 13'),
        ('11.5%', 'Payroll tax on all Vermont employers', '2014 report, p. 9 and Table 13'),
        ('−$154M', 'Fund position in 2021', '2014 report, Table 13, before any small-business phase-in'),
    ]),

    h2('s6h1', 'Why the Number Grew'),
    blk('s6p1', "The administration explained the growth itself in its presentation to the House Ways and Means Committee on January 14, 2015. The ACA waiver estimate had fallen from $267 million to $106 million, a $161 million reduction. State Medicaid funding came in $150 million below the 2013 estimate. Both earlier reports had assumed hundreds of millions of dollars in administrative savings in the first year; the administration now called that \"not practical to achieve\". Both had kept the provider taxes that fund part of Medicaid; replacing them would cost $158 million, but keeping them was, in the administration's words, bad policy in a universal system."),
    blk('s6p2', "The economy added pressure: a slower recovery than expected, and a $75 million reduction in the General Fund over fiscal years 2016 and 2017. Each of these changes was defensible on its own. Together they moved the new revenue needed from about $1.6 billion to about $2.6 billion."),
    analogy('s6an1', "It is like costing a house from the architect's drawings and then from the builder's quote. Nothing about the house changed; the second estimate simply priced in the things the first one assumed would be free.", 'Why single-payer estimates rose as Vermont got closer to enactment'),
    callout('s6c1', "Every Vermont estimate rose as it came closer to becoming law. The drivers were federal money the state could not secure, savings that could not arrive in year one, and transition costs that fairness required."),

    takeaway('tw', [
        "The January 2013 plan put the amount Vermont would have to raise at $1,611 million in 2017, without naming revenue sources.",
        "It projected $281 million in savings over 2017 to 2019 and left about $1.6 billion of Medicare spending outside the plan.",
        "In 2010, 150,000 Vermonters were in self-insured employer plans that a state cannot compel to join.",
        "Avalere, paid by a provider and employer coalition, put the cost 20 to 35 percent higher and doubted the administrative savings.",
        "The December 2014 design covered everyone except Medicare and TRICARE enrollees, at about 94% actuarial value.",
        "It needed $2,580 million of new revenue in 2017 from an 11.5% payroll tax and a public premium of up to 9.5% of income.",
        "Even then the fund went into deficit from 2019, before any phase-in for small businesses.",
    ]),
    quiz('qz', "According to the administration's own January 2015 explanation, which change contributed to the higher 2014 estimate?", [
        ("A decision to include long-term care in the benefit package", False),
        ("The expected federal ACA waiver money falling from $267 million to $106 million", True),
        ("A federal requirement to cover Medicare beneficiaries in the state plan", False),
        ("An increase in the number of uninsured Vermonters", False),
    ], "The administration listed lower federal and state funding (including the ACA waiver estimate falling by $161 million and state Medicaid funding coming in $150 million lower), the cost of replacing provider taxes, and administrative savings that could not arrive in year one. The 2014 design excluded long-term care and left Medicare beneficiaries on Medicare."),
    *sources(['plan13', 'avalere', 'gmc14', 'lunge15', 'act48page'], {
        'plan13': "pp. 3, 15, 59: $1,611M to be financed, Table 6 savings, Table 7 sources, 2010 coverage table",
        'avalere': "pp. 1-4, 8, 22: commissioning, $1.9-2.2B estimate, administrative-savings and ERISA reasoning",
        'gmc14': "pp. 7, 9, 15-16, 40, 45, 51: design, coverage table, taxes, distribution, balance sheet",
        'lunge15': "the drivers of the higher estimate: waiver, state Medicaid, provider taxes, savings timing, General Fund",
        'act48page': "the balance sheet as presented on the platform",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'm4a-why-vermont-stopped'
L5_TITLE = 'December 17, 2014: Why Vermont Stopped, and What Survived'
L5 = [
    blk('intro1', "On December 17, 2014, Governor Shumlin announced that he would not ask the legislature to finance Green Mountain Care. The state had spent four years building toward that moment. This lesson reads the decision in the administration's own words, looks at the choices it weighed and rejected, interprets the stop through the five-pillar framework, and follows what Act 48 left behind."),
    blk('intro2', "The lesson treats the decision as a sequencing event, not a verdict on single payer. Vermont did not discover that universal coverage was impossible. It reached a specific gate, financing, found it could not open it on acceptable terms, and stopped there, as its own statute required."),

    h2('s1h1', 'The Decision, in the State\'s Words'),
    blk('s1p1', "The December 30, 2014 report opens with the decision. \"On December 17, 2014, after receiving our recommendations on the policy choices necessary to implement public financing, the Governor announced that he could not recommend that the legislature move forward with public financing at this time. Given the current economic climate and other factors, the risk of economic shock is too high.\""),
    blk('s1p2', "The report explains which choices made the difference. The policy choices that were necessary, \"such as a transition plan for small businesses that this report will show to be absolutely critical\", were not affordable at the time. Lower-cost alternative plans that removed those features were not acceptable to the Governor. He nevertheless chose to publish the complete analysis, to show what Green Mountain Care could be \"as a future step\" and to give the public full information."),
    quote('s1q1', "\"Given the current economic climate and other factors, the risk of economic shock is too high.\" (Green Mountain Care report, December 30, 2014)"),

    h2('s2h1', 'The Small-Business Problem'),
    blk('s2p1', "The single hardest issue was the transition for small employers. Under the plan, every Vermont employer would pay the same 11.5 percent payroll tax on qualifying Vermont payroll, \"no exceptions and no transitions\", in the administration's own description of the balance sheet. The Governor's priority was to bring small businesses in gradually rather than all at once."),
    blk('s2p2', "The administration costed that priority. Its January 2015 presentation to the House Ways and Means Committee says that the balance sheet \"provides no transition for small companies\" and that helping small businesses would reduce revenue by more than $500 million, \"equivalent to 4% more payroll or 50% increase in income tax for residents.\" The balance sheet already ran deficits from 2019 without that help. Adding it would have meant either much higher taxes elsewhere or a plan that could not pay its bills."),
    stat_grid('s2sg1', [
        ('$500M+', 'Revenue lost by transitioning small businesses', 'Lunge and Costa, House Ways and Means, Jan 14, 2015'),
        ('4%', 'Extra payroll tax needed to replace it', 'Same presentation'),
        ('50%', 'Or the increase in income tax for residents', 'Same presentation'),
        ('2019', 'First year in deficit, even without the transition', '2014 report, Table 13'),
    ]),

    h2('s3h1', 'The Alternatives It Rejected'),
    blk('s3p1', "The administration looked at ways to bring the cost down and explained why it did not take them. A lower benefit plan, at 80 percent actuarial value, was rejected because it would be a step down in benefits for many Vermonters, would reduce many families' net income, and was only 14 percent less expensive."),
    blk('s3p2', "Excluding out-of-state employees who commute to Vermont businesses would save more than $200 million but add \"enormous complexity\" for businesses. Keeping the provider taxes would save $160 million but, in the administration's words, continue \"a hidden tax that is circular in a universal system\". Each option traded money for a design flaw the administration was not willing to accept."),
    compare('s3cmp1', 'The trade-offs, as the administration framed them',
        'Option', ['80% actuarial-value plan', 'Exclude commuting employees', 'Keep provider taxes'],
        'Why it was rejected', ['Only 14% cheaper; a benefit cut for many', 'Saves $200M+ but enormous complexity for employers', 'Saves $160M but a hidden, circular tax']),

    h2('s4h1', 'Reading the Stop Through the Five Pillars'),
    blk('s4p1', "In the framework's terms, Vermont stopped at the Policy-to-Economics gate, which Chapter 1 counts among the three critical-path dependencies. Act 48 had issued authority for an institution, the Board, but made authority for the plan's financing conditional on a future law. Without that law, the Economics pillar could not issue real incentives: a payment system with no revenue behind it is a design, not an incentive."),
    blk('s4p2', "The statute's fifth condition made the same test explicit from the other direction. Before the plan could start, the Board had to find that it would not harm Vermont's economy and that its financing was sustainable. The administration's own balance sheet, with deficits from 2019 before any small-business help, could not support that finding. So the stop was not a political reversal of the statute; it was the statute working as designed."),
    blk('s4p3', "That is the lesson the course carries into the federal analysis. A reform can have strong Policy authority for its institutions, a finished benefit design and real Technology foundations, and still stop at financing. The federal bills face that same gate, as Track 5 shows."),
    callout('s4c1', "Vermont's single-payer plan stopped where its own statute said it must: at the condition requiring a financing law and a finding that the financing was sustainable and would not harm the economy."),

    h2('s5h1', 'What Survived'),
    blk('s5p1', "The plan ended. Much of the architecture Act 48 built did not. The Green Mountain Care Board became the state's hospital budget regulator; the HTR book's Appendix A describes it as the regulatory engine that converts legislative mandates into binding obligations for the hospital system, establishing hospital budgets rather than merely reviewing them."),
    blk('s5p2', "Act 48's list of cost-containment tools also outlived it. Global payments to providers, one of the four mechanisms in § 1821, became hospital global budgets under Act 68 of 2025, which requires them for one or more non-critical-access hospitals from hospital fiscal year 2028, \"to the extent that resources are available\", and for all hospitals by 2030. Act 68 also directs the Board to set reference-based prices for hospitals."),
    blk('s5p3', "Not every successor has gone smoothly. Vermont's six-hospital Medicaid global budget, launched on January 1, 2026, was not approved by CMS under the state's Global Commitment waiver terms; payments stopped on July 31, 2026. The lesson Vermont keeps relearning is the one Act 48 taught: a payment reform needs both state authority and federal agreement before it can run."),
    example('s5ex1', 'From Act 48 to Act 68', "Act 48 (2011) named global payments as a way Green Mountain Care would contain costs and created the Board that would oversee them. Act 68 (2025) requires hospital global budgets, beginning for one or more non-critical-access hospitals no later than hospital fiscal year 2028 to the extent resources allow, includes Medicare \"to the extent permitted under federal law\", and excludes Medicaid.\nThe Board that Act 48 created is the body carrying out Act 68's pricing and budget mandates."),

    h2('s6h1', 'What Other States Can Take From It'),
    blk('s6p1', "Three points generalize. First, separate the institution from the financing. Vermont's statute created a durable regulator in 2011 and deferred the financing; the regulator proved valuable whether or not the plan went ahead."),
    blk('s6p2', "Second, conditional implementation is a feature. Because Act 48 tied the start to evidence, the decision to stop was orderly and transparent, and the state published the full analysis. Third, the walls a state hits are partly federal: Medicare, ERISA and the limits of waivers. Track 3 examines each one, and asks which of them a federal law could remove."),
    blk('s6p3', "Finally, publish the analysis. The Governor released the full December 2014 report even though he had decided not to proceed, so that, in the report's words, the public would have complete information and could see the plan's promise \"as a future step\". That record is why this course can reconstruct the decision from primary documents a decade later, and why its numbers can be tested rather than taken on trust. A state that stops a reform without publishing its reasons leaves the next attempt to start from nothing."),
    warning('s6w1', 'Do not over-read one state', "Vermont is small, and its 2014 numbers reflect 2014 conditions. The durable findings are structural: which costs a state can reach, which it cannot, and what a financing law has to do. Those carry over; the dollar figures do not."),

    takeaway('tw', [
        "On December 17, 2014, Governor Shumlin said he could not recommend public financing because the risk of economic shock was too high.",
        "The decisive issue was a transition for small businesses, which the report called absolutely critical and the administration costed at more than $500 million in lost revenue.",
        "Cheaper alternatives were rejected: an 80% plan was only 14% cheaper, and excluding commuters or keeping provider taxes created design flaws.",
        "In five-pillar terms, Vermont stopped at the Policy-to-Economics gate, one of the book's three critical-path dependencies.",
        "Act 48's own conditions required a financing law and a finding of no harm to the economy, so the stop was the statute working as designed.",
        "The Green Mountain Care Board survived and now sets hospital budgets; global payments returned as Act 68's hospital global budgets.",
        "Vermont's 2026 Medicaid global budget, stopped by CMS, shows that payment reform still needs both state authority and federal agreement.",
    ]),
    quiz('qz', "Why does this course describe Vermont's December 2014 stop as \"the statute working as designed\"?", [
        ("Because Act 48 set a fixed end date of December 2014 for the single-payer effort", False),
        ("Because Act 48 made implementation conditional on a financing law and a Board finding that the financing was sustainable and would not harm the economy", True),
        ("Because federal law prohibited Vermont from enacting a payroll tax", False),
        ("Because the Green Mountain Care Board voted to reject the benefit package", False),
    ], "Act 48 (33 V.S.A. § 1822) required, among other things, a law establishing the financing and a Board determination that the plan would not have a negative aggregate impact on Vermont's economy and that its financing was sustainable. The administration's own balance sheet could not support those findings, so the plan stopped at that condition."),
    *sources(['gmc14', 'lunge15', 'act48', 'book1', 'bookA', 'book2', 'act68'], {
        'gmc14': "p. 6 decision and rationale; Table 13 deficits from 2019",
        'lunge15': "small-business transition cost; rejected alternatives (80% plan, commuters, provider taxes)",
        'act48': "§ 1821 cost-containment tools; § 1822 implementation conditions",
        'book1': "§1.12.1: Policy enables Economics as a critical-path dependency",
        'bookA': "the Green Mountain Care Board's role today",
        'book2': "the Policy-to-Economics reading of the stop, in the book",
        'act68': "hospital global budgets from HFY2028 to the extent resources allow, Medicare included where federal law permits, Medicaid excluded; reference-based pricing",
    }),
]

run([(L3_SLUG, L3_TITLE, L3, 3), (L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5)])
