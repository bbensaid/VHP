exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 3 — Federal Versus State: the walls a state cannot take down
# Facts: VERIFIED_FACTS_M4A.md §§ A, C, D, E, F, G; Act 48 §§ 1801(c), 1822(b), 1827(e)-(g), 1829, Sec. 9(e);
# 2013 plan pp. 15, 59; Avalere pp. 2-4, 8, 22; 2014 report pp. 7, 16-17, 19, 33-34, 40-41; 29 U.S.C. § 1144;
# 42 U.S.C. § 18052; S.1506 §§ 107, 701, 801-803, 901-902; GMCB FY27 Staff Overview p. 68; HTR book Ch. 1 (OneCare,
# Gobeille). Vermont AHEAD/All-Payer/Medicaid global budget facts: book-audit/deep/VERIFIED_FACTS.md. 2026-11-21.

for k in ('gmcbfy27',):
    assert k in SRC

# ════════════════════════════════════════════════════════════════════════════
L6_SLUG = 'm4a-medicare-wall'
L6_TITLE = 'The Medicare Wall: What a State Cannot Reach'
L6 = [
    blk('intro1', "Medicare is the largest payer for most hospitals, and it is entirely federal. Congress writes its rules, the federal government pays its bills, and no state can fold it into a state plan on its own authority. For a state attempting single payer, that makes Medicare the first wall."),
    blk('intro2', "This lesson shows how Act 48 handled the wall, how much of Vermont's health spending sat behind it, why that mattered for the savings a single payer is supposed to produce, how the same wall still shapes Vermont's reforms in 2026, and what S.1506 does that a state cannot."),

    h2('s1h1', 'How Act 48 Handled Medicare'),
    blk('s1p1', "Act 48 approached Medicare carefully. Its exchange provisions say that nothing in the chapter \"shall be construed to reduce, diminish, or otherwise infringe upon the benefits provided to eligible individuals under Medicare.\" Its Green Mountain Care provisions then set out a two-step approach. The Agency of Human Services \"shall seek permission from the Centers for Medicare and Medicaid Services to be the administrator for the Medicare program in Vermont.\" If that permission was not granted, Green Mountain Care would be the secondary payer for any service Medicare covers in whole or in part."),
    blk('s1p2', "The statute could ask, and it could arrange what happened if the answer was no. It could not compel the answer. The same is true of the Green Mountain Care Fund: Act 48 allowed federal Medicare money to be deposited in it only \"if authorized by a waiver from federal law.\""),
    blk('s1p3', "By the time the administration finished its 2014 design, the fallback had become the plan. Vermonters with Medicare would remain on Medicare, the supplemental market would stay active, and Medicare beneficiaries would not pay the public premium that financed Green Mountain Care. Any further integration of Medicare was postponed until the Board had settled Green Mountain Care's own primary coverage."),
    quote('s1q1', "\"The agency shall seek permission from the Centers for Medicare and Medicaid Services to be the administrator for the Medicare program in Vermont. If the agency is unsuccessful in obtaining such permission, Green Mountain Care shall be the secondary payer.\" (33 V.S.A. § 1827(e))"),

    h2('s2h1', 'How Much Sat Behind the Wall'),
    blk('s2p1', "The state's own numbers show the scale. The January 2013 financing plan estimated that Medicare would continue to pay about $1.6 billion ($1,613 million) in 2017 for Vermonters on Medicare, unchanged with or without Green Mountain Care. The total cost of Vermont's health system in that year was about $5.9 billion, so Medicare alone was more than a quarter of it."),
    blk('s2p2', "The December 2014 report counted people. Of Vermonters' primary coverage in 2017, 140,000 would be on Medicare under the Affordable Care Act baseline and 140,000 under Green Mountain Care: the state plan would not move a single Medicare beneficiary. The original Hsiao design had made the same assumption from the start, listing \"no change for Medicare beneficiaries\" among its parameters."),
    stat_grid('s2sg1', [
        ('$1,613M', 'Medicare spending in 2017, outside the state plan', '2013 financing plan, Table 7'),
        ('140,000', 'Vermonters remaining on Medicare in 2017', '2014 report, Table 1'),
        ('$5,916M', 'Total system cost with reform, 2017', '2013 financing plan, Table 7'),
        ('0', 'Medicare beneficiaries moved into the state plan', '2014 report: those with Medicare would remain on Medicare'),
    ]),

    h2('s3h1', 'Why the Wall Limits the Savings'),
    blk('s3p1', "Single payer is supposed to save money partly by simplifying administration: one set of rules, one claims system, one price list. A hospital that still bills Medicare under federal rules, alongside the state plan, keeps two sets of everything. Avalere's 2013 critique made exactly this point, arguing that providers might not realize the projected administrative savings because of their continued dealings with Medicare beneficiaries, with ERISA employer plans and with out-of-state patients, \"all of whom will be outside of Vermont's single-payer program.\""),
    blk('s3p2', "The administration's answer was an all-payer rate-setting system run by the Green Mountain Care Board. The 2014 report called it \"an essential underpinning\" of Green Mountain Care and noted that it would require an all-payer waiver from CMS, an agreement between the state, the federal government and providers on reasonable cost growth and payment methods. Under that system, Medicare and Medicaid would grow at the same rate as other payers. In other words, the plan to manage the Medicare wall was to ask the federal government for another permission."),
    analogy('s3an1', "Imagine a building manager trying to cut heating costs by installing one thermostat for the whole building, when the largest tenant owns its own furnace and the lease says the manager cannot touch it. The manager can heat everything else efficiently, but the building still runs two systems.", 'Why Medicare limits the savings of a state single payer'),

    h2('s4h1', 'The Same Wall, Still Standing in 2026'),
    blk('s4p1', "The Medicare wall did not disappear when Green Mountain Care ended. Vermont did obtain federal agreements after 2014: its All-Payer ACO Model with CMS ran from 2018 until the end of 2025, and it signed the federal AHEAD Model state agreement in January 2025. But it withdrew from AHEAD in July 2026, after CMS's renegotiation cut the expected federal upside from about $138 million to a cap of $10 million."),
    blk('s4p2', "The Green Mountain Care Board's August 2026 staff overview for FY2027 hospital budgets states the consequence plainly: there is \"No Option for Medicare GB at this time since state left AHEAD model; Medicaid Global Budgets are also no longer an option given Federal position on VT authority.\" Act 68 of 2025 anticipated this. It requires hospital global budgets to include Medicare only \"to the extent permitted under federal law.\""),
    blk('s4p3', "Fifteen years after Act 48 asked CMS for permission to run Medicare, Vermont is still in the position of asking. That is not a failure of Vermont's negotiators. It is the structure: Medicare belongs to the federal government, and a state can include it only on terms the federal government sets."),
    example('s4ex1', 'Vermont and Medicare, 2011-2026', "2011: Act 48 directs the state to seek CMS permission to administer Medicare, with Green Mountain Care as secondary payer if refused.\n2014: the final design leaves all 140,000 Medicare enrollees on Medicare and proposes an all-payer waiver from CMS.\n2018-2025: the All-Payer ACO Model runs under an agreement with CMS.\n2026: Vermont leaves AHEAD; GMCB's staff overview records no option for a Medicare global budget at this time."),

    h2('s5h1', 'Other Federal Coverage'),
    blk('s5p1', "Medicare is the largest federal wall but not the only one. Act 48 also made Green Mountain Care the secondary payer for services covered by federal health plans offered through the Veterans' Administration, the military or to federal employees, and Section 9 required the financing plans to consider strategies for people covered by the VA, TRICARE, the Federal Employees Health Benefits Program or a foreign government."),
    blk('s5p2', "The 2014 design resolved these groups differently. The 10,000 Vermonters with TRICARE or VA coverage would keep it. Federal employees, another 10,000 people, would move into Green Mountain Care for their primary coverage. The report does not set out its reasoning for treating the two groups differently, so the course does not guess at it."),
    table('s5t1', 'Federal coverage in the 2014 design (2017)', [
        {'Group': 'Medicare', 'People': '140,000', 'Under Green Mountain Care': 'Stay on Medicare'},
        {'Group': 'TRICARE and Veterans', 'People': '10,000', 'Under Green Mountain Care': 'Keep that coverage'},
        {'Group': 'Federal employees', 'People': '10,000', 'Under Green Mountain Care': 'Move into Green Mountain Care'},
    ]),

    h2('s6h1', 'What S.1506 Does That a State Cannot'),
    blk('s6p1', "A federal law can do what Act 48 could only request. Section 901 of S.1506 provides that, from the date the program's benefits begin, no benefits are available under Medicare (Title XVIII), no one is entitled to Medicaid or CHIP assistance, and no federal Medicaid or CHIP matching payments are made, for items or services furnished on or after that date. A transition rule continues benefits for anyone in a hospital or extended-care stay on that date until the stay ends."),
    blk('s6p2', "Section 701 then moves the money. The new Medicare for All Trust Fund receives an amount equal to the prior year's appropriations for Medicare (excluding premiums), Medicaid, the Federal Employees Health Benefits Program and several other federal health programs, adjusted for inflation, and any balances left in the Medicare Hospital Insurance and Supplementary Medical Insurance trust funds after their claims are paid. Coverage through the VA, TRICARE and the Indian Health Service is left unchanged."),
    blk('s6p3', "Two cautions belong with this. Folding Medicare in solves the reach problem; it does not by itself pay for covering everyone else, which is the subject of Lesson 8 and Track 4. And it means every Medicare beneficiary moves into a new program, which is an Operations challenge Track 5 takes up."),
    compare('s6cmp1', 'The Medicare wall: state versus federal',
        'Vermont, Act 48', ['Could only ask CMS to let it administer Medicare', 'Fallback: Green Mountain Care pays second', 'Medicare money enters the state fund only with a federal waiver', '140,000 people and $1.6B left outside'],
        'Federal, S.1506', ['Ends separate Medicare benefits on the start date (§ 901)', 'Moves Medicare\'s appropriation into the new trust fund (§ 701)', 'No waiver needed: Congress acts directly', 'VA, TRICARE and IHS left unchanged']),

    takeaway('tw', [
        "Act 48 could only ask CMS for permission to administer Medicare; without it, Green Mountain Care would pay second to Medicare.",
        "Federal Medicare money could enter the Green Mountain Care Fund only if a federal waiver allowed it.",
        "In the state's own estimates, about $1.6 billion of Medicare spending and all 140,000 Medicare enrollees stayed outside the plan.",
        "Payers outside a single-payer plan limit its administrative savings, which is why the 2014 design leaned on an all-payer waiver from CMS.",
        "The wall still stands: after leaving AHEAD in 2026, GMCB records no option for a Medicare global budget, and Act 68 includes Medicare only where federal law permits.",
        "S.1506 § 901 ends separate Medicare, Medicaid and CHIP benefits on the start date, and § 701 moves their funding into one trust fund.",
        "Folding Medicare in solves the reach problem but not the cost of covering everyone else.",
    ]),
    quiz('qz', "What does GMCB's August 2026 staff overview say about including Medicare in Vermont hospital global budgets?", [
        ("Medicare will join Vermont's global budgets automatically under Act 68 from FY2028", False),
        ("There is no option for a Medicare global budget at this time, since the state left the AHEAD model", True),
        ("Medicare global budgets began in 2018 under Act 48", False),
        ("CMS has approved Medicare participation through a Section 1332 waiver", False),
    ], "The staff overview states there is no option for a Medicare global budget at this time because Vermont left the AHEAD model. Act 68 itself includes Medicare in global budgets only to the extent permitted under federal law. Section 1332 waivers cover ACA exchange rules and cannot reach Medicare."),
    *sources(['act48', 'plan13', 'gmc14', 'avalere', 'gmcbfy27', 'act68', 's1506'], {
        'act48': "§ 1801(c) Medicare benefits protected; § 1827(e)-(f) Medicare administration request and secondary-payer rules; § 1829 waiver condition; Sec. 9(e) federal coverage strategies",
        'plan13': "Table 7: Medicare $1,613M and total system cost in 2017",
        'gmc14': "pp. 16-17 coverage table and Medicare treatment; pp. 33-34 all-payer system and CMS waiver",
        'avalere': "pp. 2-4: administrative savings limited by payers outside the plan",
        'gmcbfy27': "p. 68: no option for a Medicare global budget after leaving AHEAD",
        'act68': "hospital global budgets include Medicare to the extent permitted under federal law",
        's1506': "§ 901 relationship to Medicare, Medicaid and CHIP; § 701 trust fund appropriations; § 901(c) VA, TRICARE, IHS",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'm4a-erisa-wall'
L7_TITLE = 'The ERISA Wall: Employer Plans a State Cannot Compel'
L7 = [
    blk('intro1', "The second wall is a federal statute most people have never heard of. The Employee Retirement Income Security Act of 1974, ERISA, governs employee benefit plans, including employer health plans. For a state attempting single payer, its preemption clause decides whether the state can bring the largest employers' health plans into its system. For the most part, it cannot."),
    blk('intro2', "This lesson reads the statute's text, follows the wall through Vermont's single-payer design and its later OneCare experience, and then shows how S.1506 deals with ERISA by amending it, something only Congress can do."),

    h2('s1h1', 'What ERISA Preemption Says'),
    blk('s1p1', "ERISA's preemption clause, section 514(a), codified at 29 U.S.C. § 1144(a), is short and broad. ERISA \"shall supersede any and all State laws insofar as they may now or hereafter relate to any employee benefit plan\" covered by the Act. A state law that relates to an employer's benefit plan is, as a starting point, displaced by federal law."),
    blk('s1p2', "Two further clauses shape how this works for health coverage. The savings clause, section 514(b)(2)(A), preserves state laws that regulate insurance. The deemer clause, section 514(b)(2)(B), then says an employee benefit plan is not to be deemed an insurance company for the purposes of state insurance law. The result is a sharp line. When an employer buys insurance from an insurer, the state can regulate that insurance. When an employer pays its employees' claims itself, a self-insured plan, the state generally cannot reach the plan through insurance regulation."),
    blk('s1p3', "The statute contains one named exception for health coverage: Hawaii's Prepaid Health Care Act, and only as it stood on September 2, 1974. Later amendments to the Hawaii law are not exempt beyond the effective administration of the 1974 Act, and parts of ERISA still apply to Hawaii. No other state has a comparable statutory exemption."),
    callout('s1c1', "ERISA lets a state regulate the insurance an employer buys, but not, through insurance law, the health plan an employer funds itself. Only Hawaii's 1974 law is named as an exception."),
    table('s1t1', 'The three clauses that create the wall (29 U.S.C. § 1144)', [
        {'Clause': '514(a) Preemption', 'What it says': 'ERISA supersedes state laws that relate to employee benefit plans'},
        {'Clause': '514(b)(2)(A) Savings', 'What it says': 'State laws regulating insurance are preserved'},
        {'Clause': '514(b)(2)(B) Deemer', 'What it says': 'A benefit plan is not deemed an insurer for state insurance law'},
        {'Clause': '514(b)(5) Hawaii', 'What it says': 'The 1974 Hawaii Prepaid Health Care Act is excepted'},
    ]),

    h2('s2h1', 'The Wall in Vermont\'s Single-Payer Design'),
    blk('s2p1', "Self-insured plans were not a marginal group in Vermont. The state's 2013 financing plan counted 150,000 Vermonters in self-insured plans in 2010, nearly half of the 334,000 people with commercial coverage. The 2014 report noted that self-insuring is commonly done by large, multi-state or national businesses."),
    blk('s2p2', "The 2014 design accepted the limit. \"Any business could continue to provide health benefits to their employees as provided for under the federal Employment Retirement Income Security Act of 1974 (ERISA). This includes the ability to self-insure.\" Employees could choose Green Mountain Care and decline their employer's plan, or keep the employer's plan as primary coverage with Green Mountain Care as secondary. The report noted that such companies are commonly called \"ERISA companies\", although ERISA covers businesses of every size."),
    blk('s2p3', "Avalere's 2013 critique spelled out the consequence for multi-state employers. Such organizations \"cannot be required to participate in GMC as they are governed by the federal ERISA law, though they may still be called upon to help fund GMC since they conduct business in Vermont.\" It warned that this could create a disincentive to doing business in Vermont, and that such employers might seek exemption from any payroll tax meant to fund the plan, which could leave other employers or taxpayers carrying a larger share."),
    stat_grid('s2sg1', [
        ('150,000', 'Vermonters in self-insured plans (2010)', '2013 financing plan, Table 1'),
        ('334,000', 'Vermonters with commercial coverage (2010)', '2013 financing plan, Table 1'),
        ('296,000 → 31,000', 'People with employer coverage, 2017, before and after', '2014 report, Table 1'),
    ]),
    warning('s2w1', 'A question the sources leave open', "Avalere raised the possibility that self-insured employers would seek exemption from a payroll tax that funded Green Mountain Care. The documents in this course do not settle whether such a challenge would have succeeded, and the plan was abandoned before it could be tested. Treat it as a risk the state faced, not a legal conclusion."),

    h2('s3h1', 'The Same Wall in OneCare'),
    blk('s3p1', "The ERISA wall returned in Vermont's next reform. Chapter 1 of Transforming Healthcare identifies the most fundamental flaw in OneCare Vermont's design as attempting a population-level payment model without a policy foundation capable of enforcing full participation: Vermont lacked the authority to compel private commercial health plans into the model."),
    blk('s3p2', "The book traces the limit to its legal origin. In 2016, in Gobeille v. Liberty Mutual Insurance Co., the U.S. Supreme Court ruled 6-2 that ERISA preempts state laws requiring self-insured employer health plans to report claims data into state all-payer databases. Because payer participation in OneCare rested on voluntary contracts, the limit became concrete on January 1, 2023, when Blue Cross Blue Shield of Vermont, the state's largest private insurer, declined to renew its OneCare contract, removing about 93,000 enrollees."),
    quote('s3q1', "\"Because federal law limits state authority over self-insured employer plans, state policy cannot rely on voluntary insurer contracts; it must place its mandatory lever directly on hospital rate-setting and global budgets, where state statutory authority remains absolute.\" (Transforming Healthcare, Chapter 1)"),
    blk('s3p3', "That conclusion explains the shape of Vermont's current reforms. Act 68 of 2025 regulates what hospitals are paid and how they are budgeted, levers the state does control, rather than trying to compel every payer into a single arrangement."),

    h2('s4h1', 'Why This Wall Is Hard for Any State'),
    blk('s4p1', "Put the pieces together and the state's options narrow. It can regulate insured coverage. It can regulate hospitals and other providers it licenses. It can raise revenue through taxes. What it cannot do through its own law is require a self-insured employer plan to stop providing coverage or to join a state program. A state single payer therefore has to coexist with self-insured plans, which keeps a parallel payer system in place."),
    blk('s4p2', "Coexistence costs money in two ways. It limits administrative savings, because providers keep billing employer plans with their own rules. And it complicates financing, because a payroll tax that falls on employers who also keep paying for their own plans asks those employers to pay twice, which is exactly the pressure Avalere predicted."),
    steps('s4st1', 'What a state can and cannot do about employer plans', [
        ('Regulate insurance', 'A state can regulate the policies insurers sell, including to employers (ERISA savings clause).'),
        ('Regulate providers', 'A state can set hospital budgets and prices, as Vermont does through the GMCB and Act 68.'),
        ('Raise revenue', 'A state can levy taxes, though employers that keep their own plans may resist paying twice.'),
        ('Compel a self-insured plan', 'A state cannot, through insurance law, require a self-insured plan to join or stop covering workers (ERISA preemption and deemer clause).'),
    ]),

    h2('s5h1', 'What S.1506 Does: Amend ERISA Itself'),
    blk('s5p1', "Congress wrote ERISA, so Congress can change it. Title VIII of S.1506 does. Section 801 adds a new section 524 to ERISA: \"no employee benefit plan may provide benefits that duplicate payment for any items or services for which payment may be made under the Medicare for All Program.\" It also requires workers' compensation carriers to reimburse the program for workers' compensation services."),
    blk('s5p2', "Section 107 makes the same rule from the other side: from the start date it is unlawful for an employer to provide benefits that duplicate the program's. Neither provision bans supplemental coverage; employers may still offer benefits the program does not cover. Section 802 repeals ERISA's continuation-coverage requirements, the rules that let people keep employer coverage after leaving a job, which a universal program makes unnecessary. All of Title VIII takes effect on the date benefits first become available."),
    blk('s5p3', "Medicare for America takes the opposite approach. H.R.10924 keeps qualified employer-based coverage, so under that bill employer plans, including self-insured ones, would continue alongside the national program."),
    compare('s5cmp1', 'The ERISA wall: state versus federal',
        'Vermont, 2014 design', ['ERISA plans could continue, with GMC paying second', '150,000 people in self-insured plans (2010)', 'Employers might resist a payroll tax while keeping their plans', 'The state cannot amend federal law'],
        'Federal, S.1506', ['Adds ERISA § 524: no duplicative benefit plans (§ 801)', 'Employer duplicate coverage unlawful (§ 107)', 'Supplemental benefits still allowed', 'Continuation-coverage rules repealed (§ 802)']),

    takeaway('tw', [
        "ERISA § 514 supersedes state laws that relate to employee benefit plans; only Hawaii's 1974 law is named as an exception.",
        "The savings and deemer clauses mean a state can regulate insurance employers buy but not, through insurance law, plans employers fund themselves.",
        "Vermont counted 150,000 people in self-insured plans in 2010, nearly half of its commercially insured population.",
        "The 2014 design let ERISA plans continue, with Green Mountain Care paying second, and Avalere warned those employers might resist a payroll tax.",
        "The same wall shaped OneCare: the book traces it to Gobeille v. Liberty Mutual (2016) and Blue Cross Blue Shield of Vermont's 2023 exit.",
        "Vermont's response, in the book's words, is to place its mandatory lever on hospital rate-setting and global budgets.",
        "S.1506 removes the wall by amending ERISA itself (§ 801) and making duplicate employer coverage unlawful (§ 107); Medicare for America keeps employer plans.",
    ]),
    quiz('qz', "Why could Vermont not require self-insured employer plans to join Green Mountain Care, while S.1506 can bar them from duplicating Medicare for All benefits?", [
        ("Because self-insured plans are regulated by the Green Mountain Care Board, which opposed single payer", False),
        ("Because ERISA, a federal law, preempts state laws relating to employee benefit plans, and only Congress can amend ERISA, as S.1506 § 801 does", True),
        ("Because Vermont's constitution forbids regulating employers", False),
        ("Because S.1506 makes self-insured plans part of Medicaid", False),
    ], "ERISA § 514 supersedes state laws relating to employee benefit plans, and the deemer clause keeps self-insured plans outside state insurance regulation. A state cannot change that, but Congress can: S.1506 § 801 adds a new ERISA § 524 barring benefit plans that duplicate the program's coverage."),
    *sources(['erisa', 'plan13', 'gmc14', 'avalere', 'book1', 's1506', 'hr10924'], {
        'erisa': "§ 1144(a) preemption; (b)(2)(A) savings clause; (b)(2)(B) deemer clause; (b)(5) Hawaii exception",
        'plan13': "Table 1: 150,000 Vermonters in self-insured plans of 334,000 commercially insured (2010)",
        'gmc14': "p. 19: ERISA plans may continue, employee choice, GMC secondary; Table 1 employer coverage",
        'avalere': "pp. 8, 22: state officials' acknowledgement; multi-state employers cannot be required to participate; payroll-tax exemption risk",
        'book1': "OneCare's design flaw, Gobeille v. Liberty Mutual (2016, 6-2), Blue Cross Blue Shield of Vermont's exit, and the mandatory-lever conclusion",
        's1506': "§ 107 duplicate coverage; § 801 new ERISA § 524; § 802 continuation-coverage repeal; § 803 effective date",
        'hr10924': "qualified employer-based coverage kept",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'm4a-waiver-wall'
L8_TITLE = 'Waivers and Federal Dollars: Section 1332 and Section 1115'
L8 = [
    blk('intro1', "The third wall is about money. In the state's own projection for 2017, more than half of Vermont's health spending, about $3.1 billion of $5.95 billion, came from federal sources: Medicare, the federal share of Medicaid, ACA subsidies and other federal programs. A state single payer has to capture as much of that money as it can. The tools for doing so are waivers, and waivers have strict limits."),
    blk('intro2', "This lesson reads the waiver that mattered most for Act 48, ACA Section 1332, explains why it could only ever capture a small share of federal health spending, shows how the Medicaid waiver fits in, and then contrasts all of this with the federal route, in which Congress simply appropriates the money. It ends with the one wall the federal route does not remove."),

    h2('s1h1', 'What Section 1332 Lets a State Waive'),
    blk('s1p1', "Section 1332 of the Affordable Care Act, codified at 42 U.S.C. § 18052, lets a state apply to waive certain ACA requirements for plan years beginning on or after January 1, 2017. The list is specific. A state can waive the rules on qualified health plans and the exchanges (Parts A and B of the relevant subchapter), the cost-sharing reduction provisions, and three tax-code sections: the premium tax credit (§ 36B), the employer mandate (§ 4980H) and the individual mandate (§ 5000A)."),
    blk('s1p2', "That is the whole list. Section 1332 says nothing about Medicare, Medicaid or ERISA. It is a waiver of the ACA's marketplace machinery, and it lets a state replace that machinery with something else, provided the replacement does at least as well. Act 48 was built around it: the statute directed the Secretary of Administration to seek a waiver, \"as soon as allowed under federal law\", to suspend the state exchange and receive the federal money that would otherwise have paid premium tax credits, cost-sharing subsidies and small-business credits."),
    callout('s1c1', "Section 1332 can waive the ACA's marketplace rules and subsidies, nothing more. It cannot reach Medicare, Medicaid or ERISA."),
    table('s1t1', 'What Section 1332 can and cannot waive', [
        {'Can waive': 'Qualified health plan and exchange rules', 'Cannot waive': 'Medicare (Title XVIII)'},
        {'Can waive': 'Cost-sharing reductions (§ 18071)', 'Cannot waive': 'Medicaid (Title XIX); needs § 1115'},
        {'Can waive': 'Premium tax credit (IRC § 36B)', 'Cannot waive': 'ERISA preemption'},
        {'Can waive': 'Employer and individual mandates (IRC §§ 4980H, 5000A)', 'Cannot waive': 'Anything outside the ACA'},
    ]),

    h2('s2h1', 'The Four Guardrails'),
    blk('s2p1', "Federal officials may grant a Section 1332 waiver only if the state's plan meets four tests. It must provide coverage at least as comprehensive as the ACA's, as certified by the CMS Office of the Actuary. It must provide coverage and protection against out-of-pocket costs at least as affordable. It must cover at least a comparable number of residents. And it \"will not increase the Federal deficit.\""),
    blk('s2p2', "The last test is the binding one for a single payer. It means the federal government will not pay more under the waiver than it would have paid without it. A state cannot use Section 1332 to draw new federal money; it can only redirect money that would have been spent anyway, in the state, on the people the ACA's subsidies would have reached."),
    blk('s2p3', "The statute also anticipates states that want several waivers at once. It directs the Secretary to coordinate the Section 1332 process with waivers under Medicare, Medicaid and CHIP and to allow a single application. Coordination of process is not the same as power, though: each underlying waiver still has its own limits."),
    steps('s2st1', 'Section 1332 guardrails (42 U.S.C. § 18052(b))', [
        ('Comprehensive', 'Coverage at least as comprehensive as the ACA\'s, certified by the CMS Office of the Actuary.'),
        ('Affordable', 'Coverage and out-of-pocket protection at least as affordable.'),
        ('Comparable reach', 'Coverage for at least a comparable number of residents.'),
        ('Deficit neutral', 'The waiver will not increase the federal deficit.'),
    ]),

    h2('s3h1', 'How Much Money a Waiver Could Move'),
    blk('s3p1', "Under Section 1332, a state whose plan replaces the exchange receives, as a pass-through, the aggregate amount of premium tax credits and cost-sharing reductions that would have been paid on behalf of its residents. The statute does not say exactly how to calculate that. Vermont proposed using a modified version of the formula the federal government already used for the Basic Health Program, and the 2014 report notes that federal partners had not yet approved its methodology."),
    blk('s3p2', "The amount was modest and falling. The January 2013 plan assumed $267 million in 2017. The December 2014 report estimated $106 million, an estimate it says was based on discussions with multiple federal agencies. It also left out the small-business health care tax credit, because that credit is limited to two consecutive years and employers would likely have used it up before Green Mountain Care began."),
    blk('s3p3', "Set against a program costing $4,340 million in 2017, $106 million is about 2.4 percent. That is the structural point: the federal money a state can capture through Section 1332 is a small fraction of what a universal program costs, because most federal health spending runs through Medicare and Medicaid, not the ACA marketplace."),
    stat_grid('s3sg1', [
        ('$267M', 'ACA waiver money assumed for 2017', '2013 financing plan, Table 7'),
        ('$106M', 'The 2014 estimate for the same year', '2014 report, p. 40'),
        ('$4,340M', 'Cost of the program in 2017', '2014 report, Table 13'),
        ('~2.4%', 'Share of program cost the waiver would cover', 'HTR calculation from the 2014 report'),
    ]),

    h2('s4h1', 'Medicaid: A Different Waiver, Its Own Limits'),
    blk('s4p1', "Medicaid money comes through a different door. Act 48 allowed the state to seek a Section 1115 waiver to include Medicaid, and a CHIP waiver to include CHIP, in Green Mountain Care; without them, the plan would pay second to those programs. The 2014 design assumed the state's existing Section 1115 waiver terms would continue and estimated $1.31 billion of federal Medicaid match in 2017, $285 million more than without the plan, because nearly everyone eligible for Medicaid would actually enroll."),
    blk('s4p2', "That is a large sum, but it is still a federal match on state spending, governed by federal terms the state does not control. Vermont's recent experience shows how much those terms matter. Its Global Commitment waiver runs to December 31, 2027. Its six-hospital Medicaid global budget, launched on January 1, 2026, was not approved by CMS under the waiver's terms, payments stopped on July 31, 2026, and the January-to-July payments are being reprocessed as fee-for-service."),
    warning('s4w1', 'Federal match is not federal control', "Medicaid's federal match grows when a state spends more on eligible people, but the state's design must fit federal waiver terms. Vermont's 2026 Medicaid global budget shows a reform can be launched under state law and still be unwound by a federal determination."),

    h2('s5h1', 'The Federal Route: No Waiver Needed'),
    blk('s5p1', "A federal program does not need permission from itself. S.1506 does not apply for waivers; it changes the underlying laws. Section 902 terminates the federal and state exchanges on the date benefits begin, and any tax provision that depends on enrolling through an exchange ceases to have effect. Section 901 ends separate Medicare, Medicaid and CHIP benefits for covered services. Section 701 appropriates what those programs, the federal employees' plan and other federal health programs were receiving, into one trust fund."),
    blk('s5p2', "In effect, the money a state had to ask for, piece by piece and under guardrails, a federal law simply redirects. That is why the waiver wall, which limited Vermont to about $106 million of ACA money, does not exist in the same form for Congress."),
    compare('s5cmp1', 'The waiver wall: state versus federal',
        'Vermont, Act 48', ['§ 1332 waiver: ACA subsidies only', 'Deficit-neutrality guardrail', '$106M estimated pass-through for 2017', 'Medicaid match on federal § 1115 terms'],
        'Federal, S.1506', ['Exchanges terminated by statute (§ 902)', 'Medicare, Medicaid, CHIP benefits replaced (§ 901)', 'Existing appropriations moved to one trust fund (§ 701)', 'No waiver, no pass-through formula']),

    h2('s6h1', 'The Wall That Remains: Paying for Everyone Else'),
    blk('s6p1', "Moving existing federal money into one fund is not the same as paying for a universal program. Section 701's taxes paragraph appropriates \"100 percent of the net increase in revenues to the Treasury which is attributable to the amendments made by section 801 and section 902\", but neither of those sections levies a tax. The bill contains no revenue title. H.R.3069 has the same structure. Medicare for America, by contrast, includes a surtax and payroll and excise taxes."),
    blk('s6p2', "Vermont's single-payer plan did not die at the Medicare wall, the ERISA wall or the waiver wall. It stopped at financing: $2,580 million of new revenue in 2017 that the Governor would not ask Vermonters to pay. A federal law can take down the first three walls. Whether it can get past the fourth depends on a financing law Congress has not yet written. Track 4 examines what CBO has estimated about that cost."),
    highlight('s6hl1', "Three of Vermont's four walls (Medicare, ERISA, waivers) are federal and can be removed by Congress. The fourth, financing, ended Vermont's plan and is still standing at the federal level."),

    takeaway('tw', [
        "Section 1332 lets a state waive the ACA's exchange, cost-sharing reduction and three tax provisions, from plan year 2017, and nothing outside the ACA.",
        "A waiver requires comprehensive, affordable coverage for a comparable number of people, and it must not increase the federal deficit.",
        "Vermont's expected § 1332 pass-through fell from $267 million (2013) to $106 million (2014), about 2.4% of the program's 2017 cost.",
        "Medicaid money came through the separate § 1115 waiver, on federal terms the state does not control.",
        "Vermont's 2026 Medicaid global budget, stopped by CMS, shows how federal waiver terms can unwind a state reform.",
        "S.1506 needs no waiver: it terminates the exchanges, replaces Medicare, Medicaid and CHIP benefits, and moves their appropriations into one trust fund.",
        "Neither S.1506 nor H.R.3069 contains a revenue title, so the financing wall that stopped Vermont still stands federally.",
    ]),
    quiz('qz', "Why could a Section 1332 waiver never have funded most of Green Mountain Care?", [
        ("Because Section 1332 waivers were not available until 2030", False),
        ("Because a 1332 waiver can only redirect ACA marketplace subsidies, without increasing the federal deficit, while most federal health money flows through Medicare and Medicaid", True),
        ("Because Vermont was not allowed to apply for any federal waivers", False),
        ("Because Section 1332 requires states to spend all savings on Medicare", False),
    ], "Section 1332 covers only the ACA's exchange rules, cost-sharing reductions and three tax provisions, and the federal government may not pay more than it otherwise would. For Vermont that meant an estimated $106 million against a $4,340 million program in 2017; Medicare and Medicaid sit outside its reach."),
    *sources(['s1332', 'act48', 'plan13', 'gmc14', 's1506', 'hr3069', 'hr10924'], {
        's1332': "(a)(1)-(2) waivable provisions and 2017 start; (a)(3) pass-through; (a)(5) coordinated process; (b)(1) four guardrails",
        'act48': "§ 1822(b) waiver directive; § 1827(g) Medicaid and CHIP waivers",
        'plan13': "Table 7: $267M ACA waiver assumption",
        'gmc14': "pp. 40-41: $106M estimate, BHP-based method not yet approved, small-business credit excluded, $1.31B Medicaid match; Table 13 cost",
        's1506': "§ 701 trust fund and its taxes paragraph; § 901 program benefits; § 902 exchange termination",
        'hr3069': "§ 701: same no-revenue-title structure",
        'hr10924': "tax title: surtax, Medicare payroll tax, excise taxes",
    }),
]

run([(L6_SLUG, L6_TITLE, L6, 6), (L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8)])
