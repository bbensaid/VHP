exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 5 — The Five-Pillar Test, pillar by pillar
# Facts: VERIFIED_FACTS_M4A.md §§ E, G, H, I; S.1506 §§ 106, 202, 204, 401, 403, 501, 601-602, 611-617;
# Roll Call 2026-11-18; Yahoo 2026-11-20; billstatus; CBO testimony 2022-05-12; HTR book Ch. 1 (§1.12.1, §1.12.2,
# 'What Earns a Place in the Matrix', OneCare/Gobeille), Ch. 8 (VHCURES); Act 48 Sec. 27; GMCB FY27 staff overview
# (margins p. 31, p. 68); book-audit/deep/VERIFIED_FACTS.md (Oliver Wyman; GCR 26-089; Act 68). 2026-11-21.
# Assessments match frontend/lib/data/medicare-for-all.ts M4A_PILLARS (the hub). Keep them in sync.

# ════════════════════════════════════════════════════════════════════════════
L12_SLUG = 'm4a-policy-gate'
L12_TITLE = 'Policy: Authority Not Yet Issued'
L12 = [
    blk('intro1', "Policy comes first in the five-pillar sequence because it issues authority: the mandates, prohibitions, deadlines and appropriations that make action required rather than advisable. Policy enables Economics is one of the three critical-path dependencies in Chapter 1. If the Policy gate is closed, the reform's payment design cannot start, however well it is drawn."),
    blk('intro2', "This lesson assesses the Policy gate for Medicare for All as of November 2026. It identifies exactly what authority the reform needs, compares that with what exists, examines the political situation after the 2026 midterm elections, asks the Equity Imperative's Policy question, and ends with the HTR assessment and what would change it."),

    h2('s1h1', 'What Authority Medicare for All Needs'),
    blk('s1p1', "Lesson 9 described S.1506's provisions. Seen as authority, they fall into five kinds. A universal entitlement for every resident (§ 102). A prohibition on insurers and employers providing duplicate coverage (§ 107), backed by an amendment to ERISA (§ 801). The termination of separate Medicare, Medicaid and CHIP benefits and of the ACA exchanges (§§ 901-902). The power to appropriate those programs' funding into one trust fund (§ 701). And the administrative powers to set a national budget, pay providers and run regional offices (Titles IV and VI)."),
    blk('s1p2', "Vermont's experience adds a sixth: authority for the financing. Act 48 had most of the other kinds of authority a state can have, but it made the plan's start depend on a separate financing law, and that law was never written. S.1506 is in the same position. It contains no revenue title, so even an enacted S.1506 would leave the financing authority still to be issued."),
    table('s1t1', 'The authority Medicare for All needs', [
        {'Authority': 'Universal entitlement', 'Where in S.1506': '§ 102', 'Issued?': 'No: bill not enacted'},
        {'Authority': 'Ban on duplicate coverage; ERISA amended', 'Where in S.1506': '§§ 107, 801', 'Issued?': 'No'},
        {'Authority': 'End Medicare, Medicaid, CHIP benefits and exchanges', 'Where in S.1506': '§§ 901, 902', 'Issued?': 'No'},
        {'Authority': 'Move existing appropriations to one trust fund', 'Where in S.1506': '§ 701', 'Issued?': 'No'},
        {'Authority': 'Financing for the new costs', 'Where in S.1506': 'Not in the bill', 'Issued?': 'No: not yet written'},
    ]),

    h2('s2h1', 'Where the Bill Stands'),
    blk('s2p1', "S.1506 was introduced on April 29, 2025 and referred to the Senate Finance Committee. As of the official bill-status record updated November 20, 2026, it has had no further action. It has 19 cosponsors, all Democrats, including Sen. Wyden and Vermont's Sen. Welch. In the House, H.R.3069 has 118 cosponsors and has been referred to seven committees."),
    blk('s2p2', "Cosponsorship is not a vote count, and many members who did not cosponsor might vote for a bill that reached the floor. But it is the best public evidence of commitment, and it shows a gap. Twenty senators, the sponsor and 19 cosponsors, have attached their names to S.1506, against the 56 seats Democrats will hold in the next Senate."),
    stat_grid('s2sg1', [
        ('19', 'Senate cosponsors of S.1506', 'Bill status, Nov 20, 2026'),
        ('56', 'Democratic Senate seats from January 2027', 'Yahoo News, Nov 20, 2026; Roll Call, Nov 18, 2026'),
        ('118', 'House cosponsors of H.R.3069', 'Bill status, Oct 23, 2026'),
        ('Apr 29, 2025', 'Last action on S.1506: referral to Finance', 'Bill status, Nov 20, 2026'),
    ]),

    h2('s3h1', 'The Political Situation After November 2026'),
    blk('s3p1', "The 2026 midterm elections changed the landscape. Democrats won control of the Senate with 56 seats to 44, their largest majority since 2011, and at least 257 House seats. Roll Call reported on November 18 that Sanders would prioritize Medicare for All if he chairs the Senate HELP committee, as expected, and that he said Democrats \"could bring it about through the filibuster-proof budget reconciliation process.\""),
    blk('s3p2', "The constraints remain. Yahoo News's account of the results notes that despite their majorities, Democrats will be limited in what they can pass: \"Trump still has veto power, and Senate Republicans still hold enough seats to filibuster most bills.\" It also notes that many incoming Democrats are relative moderates from Republican-leaning states and districts. And Democrats are themselves debating alternatives: Baldwin's Medicare at 50 Act, and House leader Jeffries's description of the Medicare age as \"part of an ongoing conversation\"."),
    blk('s3p3', "Reconciliation deserves a caution. Whether provisions like the ban on duplicate employer coverage or the ERISA amendment could pass through the reconciliation process, which is designed for budgetary legislation, is a parliamentary question this course has no source on. It should be treated as open, not assumed either way."),
    warning('s3w1', 'An open question, not an answer', "Sanders has named budget reconciliation as a route. Whether S.1506's non-budgetary provisions could survive that process is not established by any source used in this course, so the course does not predict it."),

    h2('s4h1', 'What Policy Can Issue Now'),
    blk('s4p1', "The Policy gate is not one gate for every proposal. A Medicare buy-in, such as the Medicare at 50 Act or the age-lowering in S.1506's own first year, needs far less authority: eligibility for an age group, a premium rule, and subsidies. It does not need to amend ERISA, terminate Medicaid or rebuild hospital payment. Chapter 1's principle on parallel work applies: work that does not sit behind a closed critical-path gate can proceed now."),
    blk('s4p2', "Vermont shows the same distinction. Act 48 issued authority for the Green Mountain Care Board in 2011, and that authority has been used ever since, even though the plan it was meant to serve never started. Issuing the authority that can be issued, and is useful on its own, is not the same as giving up on the larger reform."),
    compare('s4cmp1', 'Authority that can be issued now versus later',
        'Smaller, now', ['A Medicare buy-in for an age group', 'New Medicare benefits (dental, vision, hearing)', 'Data-reporting standards', 'Institutions that can serve any end state'],
        'Larger, later', ['A universal entitlement', 'A ban on duplicate employer coverage', 'Ending separate Medicare and Medicaid', 'A financing law for the new costs']),

    h2('s5h1', 'The Equity Question for Policy'),
    blk('s5p1', "The Equity Imperative asks of Policy: is the reform permissible, and does the mandate close disparities or widen them? On paper, S.1506 closes two disparities by design. Every resident is covered, so no resident is uninsured because of income or because of where, or whether, they work. And there is no cost-sharing apart from an optional drug schedule, so price does not keep people from care."),
    blk('s5p2', "The equity risk in this pillar is sequencing. A mandate that promises universal coverage without the financing law to pay for it can raise expectations it cannot meet, and its collapse falls hardest on the people who were promised most. Vermont's Act 48 had exactly that gap, and the book's general warning applies: violating a critical-path dependency produces \"failed interventions that generate political resistance to the correct interventions that follow.\""),
    callout('s5c1', "On equity, Medicare for All's mandate is strong on paper. The risk is not the mandate but a mandate without the financing to honor it."),

    h2('s6h1', 'HTR Assessment: CLOSED'),
    blk('s6p1', "HTR assessment: CLOSED (authority not issued). The authority Medicare for All needs exists in bill text, not in law. Because Policy enables Economics is a critical-path dependency, no payment reform built on S.1506 can begin while this gate is closed."),
    blk('s6p2', "Analysis: with the presidential veto and the Senate filibuster in place, the realistic window for the full bill is after the current presidential term ends in January 2029, unless a narrower measure, such as a buy-in or a lower Medicare age, is enacted first. What would open the gate is an enacted statute with an enacted financing title. Vermont shows that both halves are needed: authority for the program without authority for its money stops at the next gate."),
    highlight('s6hl1', "Policy: CLOSED. Opens with an enacted statute carrying an enacted financing title, or, for a narrower reform, an enacted buy-in."),

    takeaway('tw', [
        "Medicare for All needs authority for a universal entitlement, a ban on duplicate coverage with ERISA amended, the end of separate Medicare and Medicaid, a merged trust fund, and financing.",
        "S.1506 has been in the Finance Committee since April 29, 2025 with no further action and 19 cosponsors.",
        "After the 2026 midterms Democrats hold 56 Senate seats, but the presidential veto and the filibuster remain.",
        "Sanders has named reconciliation as a route; whether S.1506's non-budgetary provisions could pass that way is an open question.",
        "Smaller authority, such as a buy-in, can be issued without passing the larger reform's gates.",
        "The equity risk is a universal mandate enacted without the financing to honor it.",
        "HTR assessment: CLOSED. It opens with an enacted statute that includes a financing title.",
    ]),
    quiz('qz', "Why does the course rate the Policy gate for Medicare for All as CLOSED rather than CONDITIONALLY OPEN after the 2026 midterms?", [
        ("Because the 2026 elections reduced the number of Democratic senators", False),
        ("Because the authority exists only in bill text; S.1506 has had no action since referral, the veto and filibuster remain, and no financing title has been written", True),
        ("Because Policy is not on the critical path for single payer", False),
        ("Because S.1506 lacks a universal entitlement", False),
    ], "A gate opens only when its currency is issued. For Policy that means enacted authority. S.1506 is in committee with no action since April 2025, the presidential veto and filibuster still apply, and the bill has no revenue title, so the financing authority would still be missing even if it passed."),
    *sources(['s1506', 's1506status', 'hr3069', 'yahoo', 'rollcall', 'baldwin', 'book1', 'act48'], {
        's1506': "§§ 102, 107, 701, 801, 901-902; Titles IV and VI; no revenue title",
        's1506status': "referral to Finance, no further action, 19 cosponsors incl. Wyden and Welch",
        'hr3069': "118 cosponsors and seven committee referrals (bill status, Oct 23, 2026)",
        'yahoo': "56-44 Senate, 257 House seats, veto and filibuster, moderate incoming members",
        'rollcall': "Sanders's HELP priority and reconciliation remark; 56-44; Jeffries",
        'baldwin': "Medicare at 50 Act as a narrower alternative",
        'book1': "Policy enables Economics (critical path); §1.12.2 parallel work; the warning on violating critical-path dependencies",
        'act48': "the Board's authority issued in 2011; the financing condition never met",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L13_SLUG = 'm4a-tech-econ-gates'
L13_TITLE = 'Technology and Economics: The Information Exists, the Money Does Not'
L13 = [
    blk('intro1', "Technology and Economics are joined by one of the book's three critical-path dependencies: Technology enables Economics-as-management. A payment model cannot be managed without the information to set it, monitor it and dispute it. Chapter 1 gives the example directly: a hospital that signs a full-risk global budget before its analytics are working \"has exposed itself to financial losses it cannot explain, cannot dispute, and cannot manage.\""),
    blk('intro2', "This lesson assesses both pillars for Medicare for All. It finds them in very different states. Much of the information a national single payer would need already exists, because the bill builds on Medicare's machinery. The incentives do not yet exist in any meaningful sense, because the money behind them has not been raised."),

    h2('s1h1', 'Technology: What Information the Program Needs'),
    blk('s1p1', "To set a national health budget and pay thousands of institutions, the program needs to know what each provider does and what it costs. S.1506 is specific. Hospital global budgets are negotiated from \"the historical volume of items and services provided for each item and service in the previous 3-year period\", from each provider's expenditures in its most recent Medicare cost report compared with other providers and with normative rates, and from projected volume, wages and capacity (§ 611(b)(2)). Clinicians are paid from a national fee schedule set using Medicare's existing payment processes (§ 612)."),
    blk('s1p2', "Section 401(b) adds a reporting mandate: uniform state and provider reporting requirements and national standards for \"an adequate national database\" on practitioners, approved providers, costs, quality, outcomes and \"the equity of health among population groups.\" In the book's terms, the information currency is defined in law, even if the bill has not been enacted."),
    callout('s1c1', "S.1506 does not ask for a new data system from scratch. It builds budgets on Medicare cost reports and historical volume, prices clinicians through Medicare's fee-schedule machinery, and adds a national reporting mandate."),

    h2('s2h1', 'Technology: What Already Exists, and the Gap'),
    blk('s2p1', "Much of that information exists today. Medicare cost reports are filed by hospitals every year; the platform's own Single-Payer Modeler uses the CMS Hospital Provider Cost Report for each Vermont hospital's uncompensated care. Medicare's fee schedule and its payment processes run nationally. That gives a national program a large head start on the information side."),
    blk('s2p2', "The gap is volume and cost for patients who are privately insured today. That information sits with insurers and employers, and federal law has limited how far states can collect it: the book recounts that in Gobeille v. Liberty Mutual (2016), the Supreme Court held that ERISA preempts state laws requiring self-insured plans to report claims data to state all-payer databases. Vermont's own all-payer claims database, VHCURES, which Act 48 directed to serve the Green Mountain Care Board, is the model for what a national system would need. Chapter 8 notes that VHCURES, linked to the Blueprint clinical registry, enables quality measurement across the full population."),
    example('s2ex1', 'VHCURES: a working model of all-payer information', "Act 48 of 2011 (Sec. 27) amended 18 V.S.A. § 9410 so that Vermont's unified health care database would serve both the commissioner and the new Green Mountain Care Board, including for comparing costs between treatment settings.\nThe HTR book (Chapter 8) describes VHCURES, linked to the Blueprint clinical data registry, as enabling HEDIS measurement across the full population, while noting that the clinical side depends on VITL connectivity that remains voluntary and incomplete."),
    blk('s2p3', "HTR assessment for Technology: CONDITIONALLY OPEN. The information Economics needs mostly exists in Medicare's systems, and the bill reuses them. The gate opens fully only when private-payer volume and cost data are brought under the § 401 reporting standards, work that could begin before authority arrives."),

    h2('s3h1', 'Economics: The Incentive Design'),
    blk('s3p1', "S.1506's incentive design is clear. Institutions receive negotiated quarterly global budgets that cover operating expenses (§ 611), so a hospital's revenue no longer depends on the volume of billable services. Clinicians are paid by fee schedule (§ 612). Drug prices are negotiated (§ 614). Capital is allocated separately by application, with priority for underserved areas, and payments may not fund marketing or \"the profit or net revenue of the provider\" (§ 615)."),
    blk('s3p2', "That design points the same way as Vermont's own reforms. Act 68 of 2025 requires hospital global budgets, beginning no later than hospital fiscal year 2028 for one or more non-critical-access hospitals, \"to the extent that resources are available\", and has the Board set reference-based prices for hospitals. The question for the Economics gate is not whether the design is coherent. It is whether the incentives can be issued, which requires money."),
    table('s3t1', 'S.1506\'s incentive architecture', [
        {'Who': 'Hospitals, SNFs, dialysis', 'How paid': 'Quarterly global budget for operating costs', 'Section': '§ 611'},
        {'Who': 'Individual providers', 'How paid': 'National fee schedule', 'Section': '§ 612'},
        {'Who': 'Drugs, devices, equipment', 'How paid': 'Annually negotiated prices; formulary', 'Section': '§ 614'},
        {'Who': 'Capital', 'How paid': 'Separate budget, priority to underserved areas; no profit or marketing', 'Section': '§ 615'},
    ]),

    h2('s4h1', 'Economics: The Money'),
    blk('s4p1', "The money does not exist yet. S.1506 has no revenue title. CBO's analysis of five illustrative designs found federal health subsidies rising by $1.5 to $3.0 trillion in 2030, and GDP about 1 to 10 percent lower by 2030 if the cost were met with payroll or income taxes; permanent borrowing would be \"unsustainable.\" An incentive that has not been funded is a design, not an incentive."),
    blk('s4p2', "Vermont's evidence on global budgets adds two cautions. Hospitals are not starting from strength: Oliver Wyman found nine of Vermont's fourteen hospitals with operating losses in 2023, and GMCB's August 2026 staff overview shows five of the thirteen hospitals it tracks submitting negative operating margins for FY2027. And federal agreement matters: Vermont's six-hospital Medicaid global budget, launched January 1, 2026, was not approved by CMS under the state's waiver terms, and its payments stopped on July 31, 2026."),
    stat_grid('s4sg1', [
        ('$1.5-3.0T', 'Added federal subsidies in 2030', 'CBO, May 12, 2022'),
        ('None', 'Revenue title in S.1506', 'S.1506, introduced text'),
        ('9 of 14', 'Vermont hospitals with operating losses in 2023', 'Oliver Wyman, Act 167 report'),
        ('5 of 13', 'Hospitals submitting negative FY27 operating margins', 'GMCB FY27 Staff Overview, p. 31'),
    ]),

    h2('s5h1', 'The Equity Questions for Technology and Economics'),
    blk('s5p1', "For Technology, the Equity Imperative asks whether the data make disparities visible or bury them in averages. Section 401(b) requires the national database to cover \"the equity of health among population groups\", and section 616 creates an Office of Health Equity. The practical test is whether small rural hospitals are reported on their own or averaged into a region, since regional directors negotiate the global budgets."),
    blk('s5p2', "For Economics, it asks whether the incentives reward serving the hardest-to-reach or penalize it. S.1506 lets a hospital's budget be adjusted for efforts to reduce disparities in rural areas and in health professional shortage areas (§ 611(b)(2)(G)) and gives capital priority to underserved areas (§ 615(b)(2)). Analysis: the risk lies in the rate level. If budgets are set from Medicare-level costs, hospitals already running deficits start the global budget behind, and Track 6 shows which Vermont hospitals those are."),
    callout('s5c1', "Data equity depends on reporting small and rural providers separately. Payment equity depends on whether budgets start from a level those providers can survive on."),

    h2('s6h1', 'HTR Assessment: Technology Conditionally Open, Economics Closed'),
    blk('s6p1', "HTR assessment for Economics: CLOSED (no financing; design untested at scale). The incentive architecture is specific and consistent with Vermont's own Act 68 direction, but no money has been raised to issue it. Two gates feed Economics, and both are short of open: Policy enables Economics is closed, and Technology enables Economics is only conditionally open."),
    blk('s6p2', "What would open them: for Technology, private-payer volume and cost data brought under national reporting standards; for Economics, a named source of revenue and a global-budget method shown to work for small and rural hospitals. Vermont's 2014 report is the precedent for the second: the design was finished, and the financing could not be found."),
    compare('s6cmp1', 'Two connected gates',
        'Technology: CONDITIONALLY OPEN', ['Medicare cost reports and fee schedule exist', 'National reporting mandate in § 401(b)', 'Gap: private-payer volume and cost', 'Work can start before authority'],
        'Economics: CLOSED', ['Coherent design: global budgets, fee schedule, drug negotiation', 'No revenue title; CBO +$1.5-3.0T federal', 'Vermont hospitals start weak', 'Opens with named revenue and a tested method']),

    takeaway('tw', [
        "Technology enables Economics-as-management is a critical-path dependency: payment models cannot be managed without information.",
        "S.1506 builds budgets on three years of volume and Medicare cost reports, prices clinicians through Medicare's processes, and mandates a national database.",
        "Most of that information exists in Medicare's systems; the gap is volume and cost for the privately insured, which ERISA limits states from collecting.",
        "Vermont's VHCURES all-payer database is a working model of the information a national system would need.",
        "S.1506's incentives (global budgets, fee schedule, drug negotiation, separate capital, no profit) are coherent and match Vermont's Act 68 direction.",
        "The money does not exist: no revenue title, CBO's +$1.5-3.0 trillion, and Vermont hospitals already in deficit.",
        "HTR assessments: Technology CONDITIONALLY OPEN; Economics CLOSED.",
    ]),
    quiz('qz', "Why is the Technology gate rated CONDITIONALLY OPEN rather than CLOSED?", [
        ("Because S.1506 has been enacted and its database is running", False),
        ("Because the information Economics needs mostly exists in Medicare's cost reports and payment systems, which the bill reuses, with a gap for privately insured patients", True),
        ("Because Technology is not on the critical path", False),
        ("Because every state already collects claims from self-insured plans", False),
    ], "S.1506 negotiates budgets from historical volume and Medicare cost reports and pays clinicians through Medicare's processes, so much of the information already exists. The gap is private-payer data, which ERISA has limited states from collecting (Gobeille, 2016), and which the § 401 reporting standards would need to cover."),
    *sources(['s1506', 'book1', 'book8', 'act48', 'cbo', 'gmcbfy27', 'act68', 'modeler'], {
        's1506': "§§ 401(b), 611-616: information inputs, reporting mandate, incentive design, equity adjustments",
        'book1': "Technology enables Economics (critical path) and the global-budget-before-analytics example; Gobeille v. Liberty Mutual",
        'book8': "VHCURES linked to the Blueprint registry enables full-population measurement",
        'act48': "Sec. 27: the unified health care database to serve the Green Mountain Care Board",
        'cbo': "federal subsidies +$1.5-3.0T in 2030; GDP effects; borrowing unsustainable",
        'gmcbfy27': "p. 31: FY27 submitted operating margins",
        'act68': "hospital global budgets and reference-based pricing",
        'modeler': "use of the CMS cost report; Vermont hospital effects",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L14_SLUG = 'm4a-clinical-ops-gates'
L14_TITLE = 'Clinical and Operations: Demand, Supply and Capacity'
L14 = [
    blk('intro1', "The last two pillars are where a reform reaches people. Clinical issues outcomes, care actually delivered and its measured result. Operations issues capacity, the people, credentials and management infrastructure to run what the other pillars design. Economics drives Clinical is the third critical-path dependency, so Clinical cannot open while Economics is closed."),
    blk('intro2', "This lesson asks what Medicare for All would demand of both pillars, what the evidence says about whether they could meet it, and what the equity questions reveal. It ends with the HTR assessments and what would change them."),

    h2('s1h1', 'Clinical: What Would Change for Patients'),
    blk('s1p1', "For patients, S.1506's most immediate clinical change is the removal of price at the point of care. Section 202 bars deductibles, coinsurance and copayments, apart from an optional, evidence-based drug schedule that cannot apply to preventive drugs. Benefits are broad, from primary and preventive care to mental health, oral health, vision and audiology, and home- and community-based long-term care."),
    blk('s1p2', "The bill also builds clinical infrastructure. Quality standards and measures are implemented through CMS's Center for Clinical Standards and Quality in coordination with AHRQ (§ 501). A new Office of Primary Health Care must publish national goals within a year to increase access to high-quality primary care, especially in underserved areas, and to address disparities (§ 617). Long-term care is split, as Lesson 9 described: S.1506 keeps institutional care in state Medicaid, while H.R.3069 makes it federal."),
    blk('s1p3', "Long-term care deserves particular attention, because CBO identifies it as the biggest swing factor on the clinical side. Increased use of care is the most important force raising national spending under a single payer, \"especially if long-term services and supports are a covered benefit.\" CBO also describes what covering them would do: further reduce out-of-pocket spending, pay for care that is currently unpaid, raise wages among workers who provide that care, and let some unpaid family caregivers work more hours in their main jobs. S.1506 covers home- and community-based services federally and leaves institutional care with state Medicaid; H.R.3069 covers both. Each choice has clinical consequences for the people who need long-term care and for the families who now provide it without pay."),
    callout('s1c1', "Medicare for All's clinical promise is access without price barriers. Its clinical risk is that access may grow faster than the capacity to provide it."),

    h2('s2h1', 'Clinical: Demand Outruns Supply'),
    blk('s2p1', "CBO's analysis is the best available evidence on what would happen to care. Coverage would become nearly universal and total out-of-pocket costs would fall. The supply of care would increase, because of fewer restrictions on use, less administrative time and money, and providers responding to demand. People would use more care."),
    blk('s2p2', "But \"the increase in demand for personal health care would exceed the increase in supply, resulting in greater unmet demand than the amount under current law.\" That unmet demand would mean \"increased congestion in the health care system, including delays and forgone care.\" In CBO's lower-rate scenario, the supply of care fell by a further 2 percent, raising unmet demand by 2 percentage points. Payment rates, an Economics decision, directly shape clinical access."),
    stat_grid('s2sg1', [
        ('~100%', 'Residents enrolled', 'CBO: virtually all U.S. residents would be enrolled'),
        ('↓', 'Total out-of-pocket costs', 'CBO, May 12, 2022'),
        ('Demand > supply', 'More unmet demand than under current law', 'CBO: delays and forgone care'),
        ('−2%', 'Supply of care, lower-rate vs higher-rate scenario', 'CBO, same testimony'),
    ]),

    h2('s3h1', 'Clinical: The Equity Question'),
    blk('s3p1', "The Equity Imperative asks of Clinical: effective, and effective for whom? Removing cost-sharing helps most the people who now skip care because of price, which is a strong equity gain. Universal enrollment removes the coverage gap entirely."),
    blk('s3p2', "The congestion CBO projects is the equity risk. When demand outruns supply, the shortfall lands first where clinicians are already scarce. S.1506's answers are the primary-care goals in § 617 and budget adjustments for rural areas and health professional shortage areas in § 611. Whether those are enough cannot be known until payment is running."),
    blk('s3p3', "HTR assessment for Clinical: NOT YET TESTABLE. Economics drives Clinical is a critical-path dependency, and Economics is closed. No clinical outcome can be credited to a program whose payment model has not started. The design flags the right risk, supply, and CBO quantifies its direction."),
    warning('s3w1', 'Coverage is not the same as care', "Universal coverage closes the insurance gap immediately. Whether it closes the care gap depends on supply, which CBO expects to lag demand, especially if payment rates are set low."),

    h2('s4h1', 'Operations: The Capacity the Transition Needs'),
    blk('s4p1', "Operations is where Medicare for All's scale is most visible. The program would move every resident into one system, end separate Medicare, Medicaid and CHIP benefits and the ACA exchanges, and phase out most private health insurance for covered benefits, all within four years under S.1506 or two under H.R.3069."),
    blk('s4p2', "The bill funds pieces of the capacity this requires. At least 1 percent of the national health budget, for up to five years, goes to assistance for workers in insurance administration and related functions who lose jobs, including wage replacement, retirement benefits, retraining and preferential hiring (§ 602). Regional offices, built where possible on CMS's own administrative processes, carry out regional needs assessments and budget negotiations (§ 403). The national health budget includes a component for health-professional education (§ 601)."),
    steps('s4st1', 'What Operations must build before benefits begin', [
        ('Enroll everyone', 'Automatic enrollment, residency rules and a card for every resident (§ 105).'),
        ('Stand up regions', 'Regional offices and directors able to negotiate thousands of institutional budgets (§ 403, § 611).'),
        ('Transition workers', 'Assistance for displaced insurance and billing staff, at least 1% of the budget for up to five years (§ 602).'),
        ('Grow the workforce', 'Health-professional education funded to meet the rise in demand CBO projects (§ 601).'),
    ]),

    h2('s5h1', 'Operations: What Vermont\'s Evidence Shows'),
    blk('s5p1', "Vermont's single-payer attempt found that the transition, not the end state, was the hardest part to pay for. The administration's January 2015 presentation costed a transition for small businesses at more than $500 million in lost revenue, and the 2014 report called such a transition \"absolutely critical\". Vermont also starts with limited capacity: Oliver Wyman projected thirteen of its fourteen hospitals in operating loss by 2028."),
    blk('s5p2', "CBO adds a long-run warning. Payments lower than projected under current law \"might cause fewer people to enter health care professions\", and providers that could not adjust \"could cease to operate, possibly leading to greater congestion.\" Capacity is the last gate in the sequence, and it inherits every weakness upstream."),
    example('s5ex1', 'Vermont, 2014: the transition was the cost', "The December 2014 balance sheet assumed an 11.5% payroll tax on all employers with no transition. The administration estimated that easing small businesses in would cost more than $500 million in revenue, equivalent to 4% more payroll tax or a 50% increase in residents' income tax. Without that transition the plan was unacceptable to the Governor; with it, unaffordable."),

    h2('s6h1', 'HTR Assessment: Operations Closed'),
    blk('s6p1', "The Equity Imperative asks of Operations: executable everywhere, including in rural and under-resourced places? The capacity gap is widest where hospitals are smallest and furthest apart. A national program run through regional offices must show it can negotiate a sustainable budget for a critical-access hospital, not only for an academic medical center."),
    blk('s6p2', "HTR assessment for Operations: CLOSED (capacity not yet built). The bill funds the worker transition and the regional offices, but capacity is the last gate, and it inherits every closed gate upstream. What would open it is a workforce pipeline, the worker transition and regional administration in place before benefits begin. Workforce is also the lever a state like Vermont can pull today without any federal action, which is the subject of Lesson 17."),
    table('s6t1', 'The five-pillar assessment of Medicare for All (November 2026)', [
        {'Pillar': 'Policy', 'Currency': 'Authority', 'Assessment': 'CLOSED'},
        {'Pillar': 'Technology', 'Currency': 'Information', 'Assessment': 'CONDITIONALLY OPEN'},
        {'Pillar': 'Economics', 'Currency': 'Incentives', 'Assessment': 'CLOSED'},
        {'Pillar': 'Clinical', 'Currency': 'Outcomes', 'Assessment': 'NOT YET TESTABLE'},
        {'Pillar': 'Operations', 'Currency': 'Capacity', 'Assessment': 'CLOSED'},
    ]),

    takeaway('tw', [
        "S.1506 removes price at the point of care, covers broad benefits, and builds quality and primary-care infrastructure through CMS and a new Office of Primary Health Care.",
        "CBO expects near-universal coverage and lower out-of-pocket costs, but demand that outruns supply, producing delays and forgone care.",
        "Lower payment rates reduce supply further, so an Economics decision shapes clinical access.",
        "Clinical is NOT YET TESTABLE: Economics drives Clinical on the critical path, and Economics is closed.",
        "Operations must enroll everyone, stand up regional offices, transition displaced workers and grow the workforce, within two to four years.",
        "Vermont found the transition was the cost; Oliver Wyman projects 13 of 14 Vermont hospitals in loss by 2028; CBO warns of fewer entrants to health professions.",
        "Operations is CLOSED: the last gate inherits every closed gate upstream, though workforce work can begin now.",
    ]),
    quiz('qz', "According to CBO, what would happen to access to care under the single-payer designs it analyzed?", [
        ("Supply would rise faster than demand, eliminating waiting times", False),
        ("People would use more care, but demand would rise faster than supply, increasing delays and forgone care", True),
        ("Use of care would fall because of new cost-sharing", False),
        ("Access would be unchanged because coverage would stay the same", False),
    ], "CBO projected nearly universal enrollment, lower out-of-pocket costs and more care used, but also that demand would exceed the increase in supply, producing more unmet demand than under current law, with delays and forgone care. Lower payment rates widen that gap."),
    *sources(['s1506', 'hr3069', 'cbo', 'gmc14', 'lunge15', 'book1', 'hub'], {
        's1506': "§§ 105, 106, 202, 204, 403, 501, 601-602, 611, 617",
        'hr3069': "§ 106 two-year start; § 204 federal long-term care",
        'cbo': "coverage, out-of-pocket costs, supply, unmet demand, lower-rate scenario, workforce warning",
        'gmc14': "p. 6: a small-business transition was absolutely critical",
        'lunge15': "small-business transition cost: $500M+, 4% payroll or 50% income tax",
        'book1': "Economics drives Clinical (critical path); the Equity Imperative questions for Clinical and Operations",
        'hub': "the five-pillar assessment table, kept in sync with this course",
    }),
]

run([(L12_SLUG, L12_TITLE, L12, 12), (L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14)])
