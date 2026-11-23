exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_vbcfm_common.py').read())

# Track 3 — Hospital Finance Under Global Budgets and Reference-Based Pricing.
# Verified 2026-11-23: Vermont Act 68 of 2025 as enacted (43 pages; text extracted from the PDF itself: global hospital
# budgets, reference-based pricing, premium monitoring). Stress Test inputs, formulas and source notes read from the
# platform's HospitalFinancialScorecard component. Worked numbers marked ILLUSTRATIVE are this course's own arithmetic.
# HTR book Chapter 7 §7.6 for the framework and Figure 7.4. Note for the author (not edited): the book places RBP
# "effective FY2028"; Act 68 text says the Board shall begin implementing RBP "not later than hospital fiscal year 2027".

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'vbcfm-global-budget-metrics'
L7_TITLE = 'Managing a Hospital Under a Global Budget: The Metrics That Change'
L7 = [
    blk('intro1', "A hospital finance team trained in fee-for-service has spent its career asking how to bring in more revenue per case and more cases. A global budget asks the opposite question: given a revenue amount that is fixed in advance, how do we deliver the best outcomes for the population at a cost we can sustain? Chapter 7 calls these fundamentally different financial disciplines and says Vermont hospital CFOs must make the transition as Act 68's global budgets arrive."),
    blk('intro2', "This lesson sets out what the statute actually requires, the eight metric swaps Chapter 7 describes, what a hospital may and may not do when it must cut a service to live within a budget, and how to rebuild a finance dashboard for the new environment."),
    blk('intro3', "It relies on the text of Act 68 as enacted, which this lesson read, and on Chapter 7's framework."),

    h2('s1h1', 'What Act 68 Requires of Global Budgets'),
    blk('s1p1', "Act 68 of 2025 directs the Green Mountain Care Board to review and establish hospital budgets, including standards for global hospital budgets that reflect the implementation of reference-based pricing and the total cost of care targets determined with federal partners and stakeholders or set by the Statewide Health Care Delivery Plan once it exists. The timetable is in the text: beginning not later than hospital fiscal year 2028, to the extent that resources are available, the Board shall establish global hospital budgets for one or more Vermont hospitals that are not critical access hospitals. By hospital fiscal year 2030, to the extent that resources are available, the Board shall establish them for all Vermont hospitals."),
    blk('s1p2', "Two features of the statute shape the finance task. First, the phrase 'to the extent that resources are available' makes the timetable conditional, so a hospital should plan for both the statutory dates and the possibility that the Board's capacity delays them. Second, the statute says that global hospital budgets shall include Medicare to the extent permitted under federal law but shall not include Medicaid. This matters because Vermont's Department of Vermont Health Access ran a separate Medicaid hospital global budget in 2026, which the CMS letter described in the CMMI course; Act 68's own global budgets are a different instrument, and they do not cover Medicaid."),
    blk('s1p3', "Hospitals also operate within an annual budget the Board establishes each year on or before September 15, followed by a written decision by October 1, and the statute says each hospital shall operate within the budget established. That sentence is the legal basis of the shift described next."),
    callout('s1c1', "Under Act 68, a global hospital budget covers Medicare where federal law permits, does not cover Medicaid, begins for non-critical-access hospitals not later than hospital fiscal year 2028 and for all hospitals by fiscal year 2030, to the extent resources are available."),

    h2('s2h1', 'Eight Metrics, Swapped'),
    blk('s2p1', "Chapter 7's Figure 7.4 sets the fee-for-service metrics beside their global budget counterparts. Revenue per discharge becomes cost per discharge, because the aim is to minimize unnecessary cost while maintaining quality. Admission volume becomes the avoidable admission rate, since every preventable admission is a cost and not revenue. Length of stay to be maximized becomes efficient length of stay, because unnecessary days are costs without offsetting revenue. Service line volume becomes the cost of population health per member per month. Payer mix to be optimized toward commercial cases becomes quality performance, since quality results shape budget adjustments. Denials management becomes the management of potentially avoidable utilization. Case mix index capture becomes community investment return, since programs that reduce utilization have direct financial return. And operating margin per adjusted discharge becomes operating margin within the global budget."),
    table('s2t1', 'Fee-for-service metrics and their global budget counterparts (HTR Figure 7.4)', [
        {'Fee_for_service_metric': 'Revenue per discharge', 'Global_budget_metric': 'Cost per discharge'},
        {'Fee_for_service_metric': 'Admission volume', 'Global_budget_metric': 'Avoidable admission rate'},
        {'Fee_for_service_metric': 'Length of stay (maximize revenue per stay)', 'Global_budget_metric': 'Efficient length of stay'},
        {'Fee_for_service_metric': 'Service line volume', 'Global_budget_metric': 'Population health cost per member per month'},
        {'Fee_for_service_metric': 'Payer mix', 'Global_budget_metric': 'Quality performance'},
        {'Fee_for_service_metric': 'Denials management', 'Global_budget_metric': 'Potentially avoidable utilization'},
        {'Fee_for_service_metric': 'Case mix index', 'Global_budget_metric': 'Community investment return'},
        {'Fee_for_service_metric': 'Operating margin per adjusted discharge', 'Global_budget_metric': 'Operating margin within the global budget'},
    ]),
    blk('s2p2', "The swap is not cosmetic. Under fee-for-service, a CFO who sees a surge in admissions has good news. Under a global budget the same surge is a cost against fixed revenue. A finance dashboard that still leads with volume will point management in the wrong direction. The first practical step is to rebuild the monthly report around the right-hand column."),

    h2('s3h1', 'The Service-Reduction Rule'),
    blk('s3p1', "Living within a budget can mean reducing services, and Act 68 regulates how. A hospital that proposes to reduce or eliminate any service in order to comply with a budget must give notice to the Board, the Agency of Human Services, the Office of the Health Care Advocate and the legislators who represent its service area at least 45 days before the reduction. The notice must explain the rationale and describe how the change is consistent with the Statewide Health Care Delivery Strategic Plan, once established, and with the hospital's most recent community health needs assessment."),
    blk('s3p2', "The Board may evaluate the proposal against the plan and the needs assessment, and may modify the hospital's budget or take other actions it deems appropriate to preserve access to necessary services. A separate provision treats services identified for reduction in connection with the state's transformation efforts differently, since those changes are already part of an agreed process. The practical consequence for a CFO is that service reductions are not a unilateral lever. A budget plan that depends on closing a service line must build in the 45-day notice and the Board's review, and must show the community need and strategic fit."),
    warning('s3w1', "A budget plan that assumes unilateral cuts is not a plan", "If balancing the hospital's global budget depends on reducing a service, the notice, rationale and Board review are part of the timeline and the risk. Model the budget with those steps included."),

    h2('s4h1', 'Rebuilding the Finance Dashboard'),
    blk('s4p1', "A dashboard for a global budget environment answers four questions each month. How are we tracking against the budget, in revenue received and in cost incurred? What is driving the cost: avoidable admissions, emergency visits that could have been managed in primary care, length of stay, or high-cost outliers? Are the programs we funded to reduce utilization working, with return measured as in Lesson 3? And is quality holding, since quality results can adjust the budget?"),
    steps('s4st1', 'A global budget monthly dashboard', [
        ('Budget tracking', 'Revenue and expense against the approved annual budget, with a forecast to year-end.'),
        ('Utilization drivers', 'Avoidable admissions and ED visits, length of stay, outlier cases, by service line and payer.'),
        ('Investment return', 'Care management, primary care and community programs against their expected avoided cost.'),
        ('Quality', 'The measures that feed budget adjustment, tracked monthly, not annually.'),
        ('Risk', 'Days cash on hand, debt service coverage and a stress case for the next two quarters.'),
    ]),
    blk('s4p2', "The analytics needed to produce this dashboard are not trivial, which connects to the readiness lessons. Chapter 3 warns that the global budget implementation plan must address the gap between Act 68's performance start and the deployment of the state's analytics vendor, which it says should be treated as a critical-path decision with a hard deadline. A hospital cannot wait for the state tool. Its own finance, quality and population health data should be integrated enough to produce the monthly view before the first global budget year begins."),

    h2('s5h1', 'What Does Not Change'),
    blk('s5p1', "Some fee-for-service discipline survives. Cost control, accurate coding and revenue integrity still matter, because the budget is built from a base and adjusted for risk and quality. Chapter 7's statement that risk adjustment is an open design question for the first non-critical-access budgets makes documentation more important, not less: a hospital that has not captured its population's true complexity may receive a budget that understates need. What changes is the purpose. Coding accuracy is no longer a way to raise revenue per case. It is a way to get the budget right."),
    blk('s5p2', "Likewise, commercial contracts continue to matter during the transition. Chapter 7 advises hospital executives to use every commercial contract renewal to negotiate terms that align with the global budget environment, including shared savings that capture the benefit of utilization reduction, quality measures aligned with those the Board will use, and administrative simplification. Hospitals that have aligned contracts before fiscal year 2028 will have a revenue model that reinforces transformation; those that have not will have one that still rewards volume, in conflict with the budget."),

    takeaway('tw', [
        "Act 68 requires global hospital budgets for one or more non-critical-access hospitals beginning not later than hospital fiscal year 2028 and for all hospitals by fiscal year 2030, to the extent resources are available.",
        "Act 68's global hospital budgets include Medicare to the extent federal law permits and do not include Medicaid; the Board sets each hospital's budget annually by September 15, with a written decision by October 1.",
        "Chapter 7's eight metric swaps replace volume and revenue-per-case measures with cost per discharge, avoidable admission rate, efficient length of stay, population cost per member per month, quality, avoidable utilization, community investment return and margin within the budget.",
        "A hospital proposing a service reduction to comply with a budget must give notice at least 45 days ahead, with a rationale tied to the strategic plan and community needs assessment, and the Board may modify the budget.",
        "A global budget dashboard tracks budget performance, utilization drivers, investment return, quality and financial risk monthly.",
        "Coding accuracy still matters under a global budget, but its purpose is to get the budget right, not to raise revenue per case.",
        "Align commercial contract renewals with the global budget environment before fiscal year 2028 to avoid a revenue model that rewards volume.",
    ]),
    quiz('qz',
        "According to Act 68 as enacted, which payers do Vermont's global hospital budgets include?",
        [
            ("Medicaid but not Medicare", False),
            ("Medicare to the extent permitted under federal law, but not Medicaid", True),
            ("Medicare and Medicaid equally", False),
            ("Commercial insurance only", False),
        ],
        "The statute says global hospital budgets established under it shall include Medicare to the extent permitted under federal law but shall not include Medicaid. DVHA's separate Medicaid hospital global budget, which CMS addressed in its July 7, 2026 letter, is a different arrangement."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — global hospital budget timetable, the Medicare-but-not-Medicaid scope, budget dates and the service-reduction notice"),
    blk('src2', "[2] " + BOOK7 + " — §7.6 and Figure 7.4: hospital financial modeling under global budgets and the metric swap"),
    blk('src3', "[3] " + BOOK7 + " — §7.10 (Implications for You): contract renewals and the global budget environment"),
    blk('src4', "[4] Health Transformation Review, Chapter 3 — https://healthtransformationreview.org/read/chapter-3 — §3.9: the analytics vendor timing and HCC documentation"),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'vbcfm-reference-based-pricing'
L8_TITLE = 'Reference-Based Pricing: What Act 68 Says and What It Does to a Hospital'
L8 = [
    blk('intro1', "Vermont is attempting something few states have: setting the maximum prices that hospitals may accept for care. Reference-based pricing ties those maximums to an external benchmark, usually a percentage of Medicare, instead of to what each hospital has historically charged. For a hospital finance team it is the most direct and immediate change in Act 68, and for a state it is the lever that links payment reform to premiums."),
    blk('intro2', "This lesson sets out what Act 68 says about reference-based pricing, using the enacted text, then shows how to estimate a hospital's exposure with a simple formula the platform's stress test uses. The worked numbers are illustrative arithmetic, not forecasts for any hospital, and the benchmark percentages are those named in Chapter 7 and the platform's source notes."),
    blk('intro3', "The final section lists what remains unknown, because several of the numbers that matter most had not been published when this lesson was written."),

    h2('s1h1', 'The Statute'),
    blk('s1p1', "Act 68 directs the Green Mountain Care Board to establish reference-based prices that represent the maximum amounts hospitals shall accept as payment in full for items and services delivered in Vermont. The Board may also set minimum amounts for services delivered outside a hospital by nonhospital professionals. The Board must consult with insurers, hospitals, other professionals, the Office of the Health Care Advocate and the Agency of Human Services, including on ways to achieve all-payer alignment, and must implement pricing in a way that does not allow professionals to charge or collect any amount above the reference amount from patients or insurers."),
    blk('s1p2', "The benchmark is set by statute in general terms: prices shall be based on a percentage of the Medicare reimbursement for the same or a similar item or service, or on another benchmark as appropriate. If the Board references Medicare, it may update prices over time using a reasonable rate of growth separate from Medicare rates, such as the Medicare Economic Index, to provide predictability and to protect against federal funding pressures. In setting a hospital's prices, the Board must consider the composition of the community served, including health, demographics, acuity, payer mix, labor costs and social risk factors, and the hospital's role in the system."),
    blk('s1p3', "The timetable is that the Board shall begin implementing reference-based pricing as soon as practicable but not later than hospital fiscal year 2027, by establishing the maximum amounts, and shall review each hospital's reference-based prices annually in the budget review. Chapter 7 describes the effective date as fiscal year 2028; the statute's wording is the earlier limit for beginning implementation, so a hospital should plan from the Board's published schedule and not from either secondary summary."),
    callout('s1c1', "Reference-based pricing sets a maximum, not a target. A hospital whose commercial prices already sit below the reference amount is not required to raise them."),

    h2('s2h1', 'Who Is and Is Not Covered'),
    blk('s2p1', "The statute is specific about boundaries. The Board's authority to set reference-based prices does not include the authority to set amounts applicable to patients enrolled in Medicare or Medicaid, which already have federally or state-set rates. In effect, the pricing constraint bites on commercial payers. Nothing in the subsection limits a professional's ability to accept less than the reference rate from an uninsured patient, or reduces the covered services of Medicare or Medicaid."),
    blk('s2p2', "A further provision lets the Board, with the Agency of Human Services and the steering committee for comprehensive primary health care, apply reference-based pricing to services outside the hospital, such as primary care, and to increase or decrease the percentage of Medicare or another benchmark, first to enhance access to primary care and later for alignment with the Statewide Health Care Delivery Strategic Plan. The Board can therefore use the same tool to raise payment for services it wants more of, and not only to cap payment for the ones it wants less of."),

    h2('s3h1', 'The Link to Premiums'),
    blk('s3p1', "The statute builds in accountability for the savings. The Board, in collaboration with the Department of Financial Regulation, shall monitor implementation to ensure that any decreases in amounts paid to hospitals also result in decreases in health insurance premiums, and shall post its findings on the alignment between price and premium decreases annually on its website. The Board must also identify factors that would require terminating or modifying reference-based pricing in one or more hospitals, such as a measurable reduction in access to or quality of care."),
    blk('s3p2', "These two provisions together are the policy's safeguards. The first answers the question of whether savings reach consumers, since price reductions that are absorbed in insurer margins would fail the policy's purpose. The second sets up an exit when the policy harms access. For a hospital, the second matters as a bargaining position: documented access or quality effects are the grounds on which modification can be sought."),

    h2('s4h1', 'Estimating Exposure'),
    blk('s4p1', "The platform's Hospital Financial Stress Test uses a transparent formula for the revenue effect. Commercial revenue falls by the commercial share of revenue multiplied by the proportional gap between today's commercial price, expressed as a percentage of Medicare, and the benchmark cap. A cap at or above today's price has no effect. In symbols, the loss as a share of net patient revenue equals the commercial share times one minus the cap divided by the current price."),
    blk('s4p2', "The tool offers two benchmarks. A cap of 200 percent of Medicare is the recommendation of Oliver Wyman's work for Act 167. A cap of 250 percent is the upper scenario the Board modeled in its December 2024 reference-based pricing report, according to Chapter 7. Illustrate with a hospital in which commercial payers account for 35 percent of net patient revenue, a share the tool uses as a mid-range default, and whose commercial prices are 300 percent of Medicare. At a 200 percent cap the revenue loss is 35 percent times one minus two-thirds, which is 11.7 percent of net patient revenue; on $100 million of revenue, about $11.7 million. At a 250 percent cap the loss is 35 percent times one minus five-sixths, which is 5.8 percent, about $5.8 million."),
    table('s4t1', 'Illustrative reference-based pricing exposure (35% commercial share, $100M net patient revenue)', [
        {'Current_commercial_price': '300% of Medicare', 'Cap': '200%', 'Revenue_loss': '11.7% (about $11.7M)'},
        {'Current_commercial_price': '300% of Medicare', 'Cap': '250%', 'Revenue_loss': '5.8% (about $5.8M)'},
        {'Current_commercial_price': '450% of Medicare', 'Cap': '200%', 'Revenue_loss': '19.4% (about $19.4M)'},
        {'Current_commercial_price': '450% of Medicare', 'Cap': '250%', 'Revenue_loss': '15.6% (about $15.6M)'},
    ]),
    blk('s4p3', "The tool's own source notes say that GMCB's price-transparency dashboard puts Vermont hospital commercial prices at roughly 279 to 697 percent of Medicare, and that no per-hospital figure is published for the stress test's purposes, so the current price is an input bounded by that range. Verify those figures against the Board's current publications before relying on them. The point of the exercise is the sensitivity: a hospital at 450 percent faces a loss almost twice as large as one at 300 percent under the same cap."),
    warning('s4w1', "The formula is a first-order estimate", "It treats the whole commercial book as repriced at once and ignores volume response, mix shifts, negotiated carve-outs, the Board's hospital-specific factors and any phase-in. Use it to rank exposure and size scenarios, not to forecast a budget."),

    h2('s5h1', 'What Is Still Unknown'),
    blk('s5p1', "Several inputs that determine real exposure were not public when this lesson was written. The percentage of Medicare the Board will adopt for each hospital, and whether it varies by hospital or service, depends on the community factors the statute lists. The phase-in, if any, is not specified. The treatment of critical access hospitals, whose Medicare payment is cost-based, differs, and Chapter 7 notes that the first global budgets apply to non-critical-access hospitals. And the interaction with the global budget, which the statute says must reflect reference-based pricing, is a design question, since a global budget built from a base that includes above-reference prices would need to adjust."),
    blk('s5p2', "A finance team should therefore run ranges and watch for the Board's rule and methodology publications. Chapter 7's guidance for hospital executives applies: model the position under each plausible methodology now, so the decision to invest, negotiate or reduce services is made on a range and not on a surprise."),

    takeaway('tw', [
        "Act 68 directs the Green Mountain Care Board to set reference-based prices as the maximum amounts hospitals accept as payment in full, as a percentage of Medicare or another benchmark.",
        "The Board must begin implementing reference-based pricing not later than hospital fiscal year 2027 and review each hospital's prices annually in the budget process; Chapter 7 describes the date as fiscal year 2028, so follow the Board's published schedule.",
        "The Board's authority does not extend to amounts for Medicare or Medicaid enrollees, so the constraint bites on commercial payers.",
        "The Board must monitor whether price decreases produce premium decreases and post findings annually, and must identify factors that would require modifying reference-based pricing, such as reduced access or quality.",
        "The Board may use reference-based pricing outside hospitals, including minimum amounts for primary care, to enhance access.",
        "The stress test's formula is loss equals commercial share times one minus the cap divided by the current price; at 35 percent commercial share and prices at 300 percent of Medicare, a 200 percent cap costs 11.7 percent of net patient revenue.",
        "The Board's percentages, any phase-in and the treatment of critical access hospitals were not public when this lesson was written; run ranges and watch the Board's publications.",
    ]),
    quiz('qz',
        "A hospital has a commercial share of 35 percent and commercial prices at 300 percent of Medicare. Using the stress test's formula, what share of net patient revenue is lost at a 200 percent reference-based cap?",
        [
            ("About 5.8 percent", False),
            ("About 11.7 percent", True),
            ("About 35 percent", False),
            ("There is no loss because Medicare is not affected", False),
        ],
        "The loss equals the commercial share times one minus the cap divided by the current price: 35 percent times (1 minus 200/300), which is 35 percent times one-third, or about 11.7 percent of net patient revenue. At a 250 percent cap the same hospital loses about 5.8 percent."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — reference-based pricing provisions, 18 V.S.A. § 9376(e)"),
    blk('src2', "[2] " + BOOK7 + " — §7.2.3 (RBP as a regional benchmark), §7.3 Figure 7.2 and §7.6.2 (200% and 250% scenarios)"),
    blk('src3', "[3] HTR Research Lab, Hospital Financial Stress Test — https://healthtransformationreview.org/research-lab/policy-quality?tab=scorecard — reference-based pricing formula and source notes"),
    blk('src4', "[4] Green Mountain Care Board, hospital price transparency and Act 68 updates — https://gmcboard.vermont.gov — as cited in the stress test's source notes; verify current figures"),
]

# ════════════════════════════════════════════════════════════════════════════
L9_SLUG = 'vbcfm-hospital-stress-test'
L9_TITLE = 'The Hospital Financial Stress Test: Four Scenarios, One Plan'
L9 = [
    blk('intro1', "A hospital rarely faces one pressure at a time. Vermont's hospitals face reference-based pricing, the arrival of global budgets, the Medicaid reductions in H.R. 1 and the cost of the investments transformation requires, in overlapping years. Chapter 7 advises a CFO to run each as a scenario and then look at the combination. The platform's Hospital Financial Stress Test is built for that."),
    blk('intro2', "This lesson explains the tool's four scenarios and how each moves the numbers, how to read the three outputs that matter most, which are operating margin, days cash on hand and debt service coverage, and how to build a staged plan from the results. It uses the tool's own documentation of its data sources, and it separates what the tool takes from published figures from what it estimates."),
    blk('intro3', "No hospital-specific conclusions are drawn here. The aim is to teach the method so that a finance team can run it on its own hospital."),

    h2('s1h1', 'The Starting Point: Real Baselines'),
    blk('s1p1', "According to the tool's source notes, its baselines for Vermont's 14 acute-care hospitals come from the Green Mountain Care Board's presentation of fiscal year 2025 actual financials, dated March 18, 2026. Total operating revenue, total operating expense and the salaries and benefits line are taken from each hospital's income summary, so each hospital's computed margin reproduces the Board's own published margin: for example, the notes cite Brattleboro Memorial at negative 3.1 percent, Rutland Regional at 5.6 percent and the University of Vermont Medical Center at 1.3 percent. The 14 rows sum to $4,375.6 million in operating revenue against the Board's system total of $4,375.4 million."),
    blk('s1p2', "Cash on hand and the current ratio are derived from the Board's published days cash on hand and current ratio, so the tool's baseline ratios equal the published ones. Current liabilities and annual debt service are estimated, because the Board does not publish dollar balance-sheet or debt-service figures in those decks. The tool also shows the Board's own fiscal year 2026 projected margin, days cash and current ratio for each hospital, drawn from its August 2026 staff overview, alongside the actuals and not as a replacement for them."),
    blk('s1p3', "That distinction between sourced and estimated inputs is a model for any stress test. Say which numbers come from a document, which are derived from one and which are assumptions, and label them so a reader can challenge each."),
    callout('s1c1', "A stress test is only as credible as its labeling. Every input should be marked as sourced, derived or estimated, with the document it came from."),

    h2('s2h1', 'The Four Scenarios'),
    blk('s2p1', "Chapter 7 describes four scenarios for Vermont hospitals. The reference-based pricing scenario asks what the hospital's position is if commercial prices are capped at 200 percent of Medicare or at 250 percent, and which service lines are furthest above the benchmark. The global budget scenario asks what operating margin results under a prospective revenue cap equal to current net patient revenue less some percentage, and what cost reductions or service redesign are needed for solvency. The Medicaid cut scenario asks what total revenue results as H.R. 1's reductions phase in from 2027 to 2032, under conservative, base and optimistic assumptions about payer mix. The transformation investment scenario asks what reduction in avoidable hospitalizations and emergency visits is required for positive return on a given investment in care management, community health workers and telehealth."),
    blk('s2p2', "The tool implements each with a stated rule. The reference-based pricing scenario uses the formula from Lesson 8. The Medicaid scenario applies a full-phase reduction of 12 percent to Medicaid revenue, which the tool treats as about 15 percent of net revenue, phased in sixths from 2027, when one-sixth applies, to 2032, when the full reduction applies. The transformation scenario amortizes the capital straight-line, adds the amortization to operating expense and debt service, and ramps recurring savings in over three years. The global budget scenario holds revenue fixed while allowing cost pressures such as labor to continue, modeled by lost volume upside and travel nurse cost increases."),
    table('s2t1', 'The four stress scenarios and how the tool models them', [
        {'Scenario': 'Reference-based pricing', 'Question': 'What if commercial prices are capped at 200% or 250% of Medicare?', 'Tool_mechanism': 'Revenue falls by commercial share x (1 - cap / current price)'},
        {'Scenario': 'Global budget', 'Question': 'What is our margin when revenue is fixed?', 'Tool_mechanism': 'Volume upside lost; labor and inflation pressure continue against capped revenue'},
        {'Scenario': 'H.R. 1 Medicaid cuts', 'Question': 'How much revenue do we lose from 2027 to 2032?', 'Tool_mechanism': '12% full-phase reduction on Medicaid revenue, phased by sixths'},
        {'Scenario': 'Transformation investment', 'Question': 'What return do we need to break even?', 'Tool_mechanism': 'Capital amortized into expense and debt service; savings ramp over three years'},
    ]),
    warning('s2w1', "The tool's parameters are assumptions you can change", "The 12 percent full-phase reduction, the 15 percent Medicaid share and the three-year savings ramp are the tool's defaults. A hospital should replace them with its own payer mix and its own program evidence."),

    h2('s3h1', 'Reading the Outputs'),
    blk('s3p1', "The tool reports operating margin, days cash on hand, debt service coverage, the current ratio and labor cost as a share of revenue. Operating margin is the stress result in one number, the net income after the scenario's adjustments as a share of adjusted revenue. Days cash on hand converts the cash balance into days of operating expense, and is the measure of how long the hospital can absorb a shortfall. Debt service coverage shows whether operating results cover debt payments, which matters for covenants and borrowing capacity."),
    blk('s3p2', "Read them together, not singly. A hospital can show a negative margin in a stress year and survive comfortably if its days cash on hand is high, as in the tool's own examples of hospitals with substantial cash reserves. A hospital with a small negative margin and low days cash may be closer to a covenant breach or a liquidity problem than one with a larger loss. The chapter notes that for most Vermont hospitals the thinnest years are fiscal years 2027 and 2028, not the 2030 destination, because the pressures arrive before transformation savings do."),
    steps('s3st1', 'Reading a stress result', [
        ('Margin', 'How large is the operating loss or gain in the stress year, and how much of it comes from each scenario?'),
        ('Days cash on hand', 'How many days of expenses could the hospital cover from reserves if the shortfall persisted?'),
        ('Debt service coverage', 'Do operating results still cover debt payments after the scenario?'),
        ('Timing', 'In which year is the position thinnest, and does recovery arrive before reserves run out?'),
    ]),

    h2('s4h1', 'From Scenarios to a Staged Plan'),
    blk('s4p1', "The most useful output of a stress test is a plan built around the years of greatest strain. A hospital should run each scenario alone to learn which one hurts most, run them in combination to find the worst plausible year and then ask what it would do in each. The plan has three layers. Actions that are valuable under every scenario, such as accurate coding, a better revenue cycle and early work on avoidable utilization, start immediately. Actions that are valuable only in some scenarios, such as service line redesign, are prepared with triggers and decision dates. And actions that are costly, such as closing a service, are sequenced with the 45-day notice and Board review of Lesson 7."),
    blk('s4p2', "Transformation investment is the scenario that can change the others. Lesson 3's discussion applies: the return depends on who captures the avoided cost. Under a global budget the hospital keeps all of it. Under shared savings it keeps a share. Under fee-for-service it loses revenue. A hospital considering a large care management investment should run it in the stress test under the payment arrangement it will actually face, with a range for prevented events, and see whether it improves the thin years or merely adds to them with its amortization cost."),
    blk('s4p3', "Finally, treat the results as a conversation instrument. Chapter 3 reports that the Act 167 analysis projected five-year cumulative hospital deficits of $700 million to $2.4 billion under its pre-H.R. 1 baseline, and says the Medicaid reductions accelerate the timeline for hospitals already distressed. A stress test lets a board see that statement as a number for its own hospital, in its own years, and decide what to do about it."),

    h2('s5h1', 'Common Mistakes'),
    blk('s5p1', "Four mistakes recur in hospital stress tests. The first is stacking every scenario at full strength in the same year, which overstates the problem because the phase-ins are staggered; the tool's year control for the Medicaid phase exists to avoid it. The second is ignoring the actions management would actually take, so that the stress case describes a hospital that does nothing, which is useful as a floor and misleading as a forecast. The third is treating the output as a prediction, when it is a sensitivity analysis whose value lies in comparing scenarios. The fourth is leaving the model with finance alone. The scenarios touch service lines, staffing, contracting and capital, and each of those owners should see the result and say which assumptions they would challenge."),
    blk('s5p2', "A short checklist helps: confirm the baseline against a published source, change one parameter at a time and record the effect, run the combined case and the staggered case, state the actions assumed, and write down the date of the run and the version of the inputs, since the figures will need updating when the Board publishes its methodology."),

    takeaway('tw', [
        "The stress test's baselines for 14 Vermont hospitals come from the Green Mountain Care Board's March 18, 2026 presentation of fiscal year 2025 actuals; liabilities and debt service are estimated and labeled as such.",
        "Chapter 7's four scenarios are reference-based pricing at 200 or 250 percent of Medicare, a global budget revenue cap, H.R. 1 Medicaid reductions phased in from 2027 to 2032 and a transformation investment.",
        "The tool phases a 12 percent full-phase Medicaid reduction in sixths and treats Medicaid as about 15 percent of net revenue; these are defaults to be replaced with a hospital's own data.",
        "Read operating margin, days cash on hand and debt service coverage together; a negative margin with high cash is a different risk from a small loss with low cash.",
        "For most Vermont hospitals the thinnest years are fiscal years 2027 and 2028, according to Chapter 7, not the 2030 destination.",
        "Build a staged plan: actions valuable under every scenario now, scenario-specific actions with triggers, and costly actions sequenced with notice requirements.",
        "Label every input as sourced, derived or estimated so a board can challenge each assumption.",
    ]),
    quiz('qz',
        "Why should days cash on hand be read together with operating margin in a stress test?",
        [
            ("Because days cash on hand is always the same as margin", False),
            ("Because a hospital with a negative margin but high days cash may be less at risk than one with a smaller loss and low cash", True),
            ("Because margin is not affected by the scenarios", False),
            ("Because days cash on hand only applies to critical access hospitals", False),
        ],
        "Margin shows the size of the stress-year result; days cash on hand shows how long reserves can absorb it. A large reserve lets a hospital survive a loss that would threaten one with little cash, so the two must be read together along with debt service coverage."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] HTR Research Lab, Hospital Financial Stress Test — https://healthtransformationreview.org/research-lab/policy-quality?tab=scorecard — scenarios, formulas and data-source notes read from the tool's source on 2026-11-23"),
    blk('src2', "[2] Green Mountain Care Board, Vermont Hospital System FY2025 Financials (actuals presentation, March 18, 2026), as cited in the stress test's source notes — https://gmcboard.vermont.gov/FY25Actuals"),
    blk('src3', "[3] Green Mountain Care Board, FY27 Hospital Budget Review, Staff Overview (August 2026), as cited in the stress test's source notes — https://gmcboard.vermont.gov/fy27-prof-staff-analysis"),
    blk('src4', "[4] " + BOOK7 + " — §7.6.2: the Hospital Financial Stress Test model and its four scenarios; §7.9 Figure 7.6"),
    blk('src5', "[5] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf"),
    blk('src6', "[6] Health Transformation Review, Chapter 3 — https://healthtransformationreview.org/read/chapter-3 — §3.6: Oliver Wyman's five-year cumulative deficit range of $700 million to $2.4 billion under the pre-H.R. 1 baseline"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
