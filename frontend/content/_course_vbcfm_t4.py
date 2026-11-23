exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_vbcfm_common.py').read())

# Track 4 — The Financial Case: ROI, Primary Care and Making the Case.
# Primary source read 2026-11-23: Vermont Blueprint for Health 2025 Annual Report (dated Jan 26-28, 2026; 74 pages; text
# extracted from the PDF itself): practice and CHT counts, annual budget by element, CY2023 risk-adjusted measures with the
# report's own cautions, and the Medicare participation change when the all-payer model agreement ended in Dec 2025.
# The State Auditor's Feb 2025 conclusion is cited from the Blueprint report's own reference to the audit and from search
# summaries (the Auditor's PDF returned 403 to the fetch tool). ROI figures of 5.8, 3.0-3.8 and 4.49 are the book's and the
# state's own reports' figures; the lesson labels their provenance. Worked numbers marked ILLUSTRATIVE are this course's.

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'vbcfm-transformation-roi'
L10_TITLE = 'The Return on Transformation: A Framework and Its Evidence Ladder'
L10 = [
    blk('intro1', "Every transformation investment needs a financial justification. Under fee-for-service it is hard to construct, because an investment that reduces utilization also reduces revenue. Under value-based care and global budgets the case can be much stronger, and Chapter 7 gives a framework for building it: an investment type, the mechanism by which it saves money, a calculation approach and a Vermont example."),
    blk('intro2', "This lesson walks through the framework, then asks the question that separates a business case from a wish: how good is the evidence behind each number? It introduces an evidence ladder, applies the sharing-rate discipline of Lesson 3, and shows how to present a range. The framework's Vermont examples are the book's illustrations, built on assumed unit costs, and the lesson treats them that way."),
    blk('intro3', "The aim is a business case that a skeptical board or payer could test and still find sound."),

    h2('s1h1', "Chapter 7's Framework"),
    blk('s1p1', "The framework covers five investment types. A care management program prevents hospitalizations and emergency visits; the calculation is prevented events times average cost per event, minus program operating cost. Behavioral health integration through collaborative care reduces downstream high-cost use by giving patients earlier mental health treatment. A social needs program reduces avoidable utilization driven by unmet needs such as housing, food and transportation. Enhanced primary care payments reduce hospitalizations and specialty care through better chronic disease management. And telehealth and remote monitoring reduce transport costs and allow earlier intervention before a crisis."),
    table('s1t1', 'Transformation investment types (HTR Figure 7.5, summarized)', [
        {'Investment': 'Care management', 'Mechanism': 'Prevents hospitalizations and avoidable ED visits', 'Calculation': '(Prevented events x cost per event) minus program cost'},
        {'Investment': 'Behavioral health integration', 'Mechanism': 'Earlier treatment reduces downstream high-cost use', 'Calculation': 'Estimated reduction in MH-related ED visits and admissions vs usual care'},
        {'Investment': 'Social needs program', 'Mechanism': 'Reduces avoidable use driven by unmet needs', 'Calculation': 'Reduction in avoidable use for high-burden groups, from program-specific evidence'},
        {'Investment': 'Primary care investment', 'Mechanism': 'Better chronic disease management lowers hospital and specialty use', 'Calculation': 'Return per dollar of enhanced payment, from evaluation'},
        {'Investment': 'Telehealth and remote monitoring', 'Mechanism': 'Avoids transport and enables early intervention', 'Calculation': 'Travel savings plus avoided admissions less program cost'},
    ]),
    blk('s1p2', "The chapter's Vermont examples are written to show the arithmetic. A community health team that prevents 500 avoidable emergency visits a year at an assumed $1,800 each saves $900,000, and if the team costs $300,000 the return is 200 percent. Remote monitoring that prevents 10 percent of 30-day heart failure readmissions in 200 high-risk patients with a 30 percent readmission rate saves $90,000 a year at an assumed $15,000 per readmission, and is worthwhile only if the program costs less than that. Both examples show the form of the calculation and nothing more: the unit costs and effect sizes are assumptions."),

    h2('s2h1', 'The Evidence Ladder'),
    blk('s2p1', "A number in a business case can rest on very different foundations, and a reader should know which. This lesson proposes a four-rung ladder. The lowest rung is an assumption: a figure chosen to show how the calculation works. The next is a published estimate from another setting, such as a national evaluation of a similar program. Above that is a local estimate, from the organization's own pilot or claims data for a comparable group. At the top is a measured result, from the organization's own program with a credible comparison."),
    blk('s2p2', "Most real business cases are mixed, with some inputs at the top of the ladder and others at the bottom. The discipline is to mark each input with its rung, and to concentrate review on the inputs that are both low on the ladder and large in their effect on the result. A case that is sensitive to an assumed prevented-event count deserves a pilot to measure it before full commitment."),
    steps('s2st1', 'The evidence ladder, from weakest to strongest', [
        ('Assumption', 'A figure chosen for illustration or because no data exist; label it and test a range.'),
        ('Published estimate from elsewhere', 'Evidence from another setting; check similarity of population and program.'),
        ('Local estimate', 'The organization\'s own claims or pilot data for a comparable group.'),
        ('Measured result', 'The organization\'s own program with a credible comparison group and a stated margin of error.'),
    ]),
    callout('s2c1', "Mark every input in a business case with its rung on the evidence ladder. Review hardest the inputs that are low on the ladder and move the answer most."),

    h2('s3h1', 'Apply Who Captures the Savings'),
    blk('s3p1', "Lesson 3 showed that the same program has a different return under each payment arrangement. The framework's examples quietly assume the organization keeps all of the avoided cost. A hospital under a global budget does. A practice in a shared savings contract keeps only the sharing rate of savings above the minimum threshold, and an organization in fee-for-service loses the revenue. Before using any row of the framework, state the payment arrangement and apply its share."),
    blk('s3p2', "Timing matters as much as share. Most investments cost money before they save it, so the cash flow has a J-curve: spending in the first period, partial savings in the second and full savings only when the program matures. Chapter 7's implementation matrix gives return crossover points of 12 to 24 months for shared savings preparation, and describes the readiness assessment as having immediate prioritization value. A business case should show cumulative cash by quarter, name the payback quarter and state what happens if the savings arrive a year late."),
    table('s3t1', 'Illustrative cumulative cash for a $300,000-a-year program with savings ramping over three years (arithmetic only)', [
        {'Year': 'Year 1', 'Cost': '$300,000', 'Savings_at_full_share': '$300,000 (33% of full run rate)', 'Cumulative': '$0 net'},
        {'Year': 'Year 2', 'Cost': '$300,000', 'Savings_at_full_share': '$600,000 (67% of run rate)', 'Cumulative': '+$300,000'},
        {'Year': 'Year 3', 'Cost': '$300,000', 'Savings_at_full_share': '$900,000 (full run rate)', 'Cumulative': '+$900,000'},
    ]),
    blk('s3p3', "In this illustration, a program whose full-run-rate savings are $900,000 a year only breaks even in year 1 and does not show its return until year 2. If the organization receives only half of those savings, the program loses $150,000 in year 1 and breaks even only in year 2. The numbers are made up; the pattern is general."),

    h2('s4h1', 'Presenting a Range, Not a Point'),
    blk('s4p1', "A single return figure invites a single objection. A range invites a discussion. A defensible presentation shows three cases: a pessimistic case with half the central effect and a late ramp, a central case and an optimistic case with the program performing as well as the best published evidence. For each it states the return, the payback period and the share of the avoided cost the organization keeps."),
    blk('s4p2', "The platform's Cost-Effectiveness Analysis Calculator and Shared Savings Calculator are built to run exactly this kind of range. Chapter 7 describes the first as testing whether the return case survives contact with the numbers. The practical test is whether the pessimistic case still clears the organization's threshold, or whether the organization is betting on the central estimate."),
    blk('s4p3', "State the assumptions in a table beside the result so a reviewer can change them and watch the answer move, and record who owns each assumption and when it will be reviewed against actual results."),
    warning('s4w1', "Do not carry an illustration into a board paper", "The framework's figures, such as $1,800 per avoidable emergency visit and $15,000 per hospitalization, are assumptions to show the method. Replace them with the organization's own costs before using them to justify spending."),

    h2('s5h1', 'Breakeven: How Much Effect Do You Need?'),
    blk('s5p1', "A useful alternative to estimating an effect is to ask how large it must be. The breakeven number of prevented events equals the program cost divided by the avoided cost per event multiplied by the share of that cost the organization keeps. For the care management program in Lesson 3, with a $200,000 cost and an assumed $15,000 per hospitalization, breakeven under a global budget is about 13 prevented hospitalizations, because $200,000 divided by $15,000 is 13.3. Under a 50 percent share the organization needs about 27, since the share halves the value of each prevented event. In a population of 10,000 beneficiaries, 27 prevented hospitalizations is a small fraction of the roughly 50 the chapter's example assumes."),
    blk('s5p2', "Framed this way the question becomes whether the program can plausibly prevent that many events among the patients it can reach. That is a question clinicians and care managers can answer with their own panels, and it avoids the false precision of a point estimate. A board can be asked to approve a program on the grounds that it needs to prevent 27 hospitalizations a year to break even, with a measure and a review date, which is a more accountable commitment than a promised 275 percent return."),
    steps('s5st1', 'Computing a breakeven', [
        ('Program cost', 'Annual cost including staff, systems, training and overhead.'),
        ('Avoided cost per event', 'The organization\'s own cost per avoided admission or visit.'),
        ('Share kept', 'The payment arrangement\'s share of the avoided cost.'),
        ('Breakeven events', 'Program cost divided by avoided cost per event times share kept.'),
        ('Plausibility check', 'Compare with the events the program can realistically reach and prevent.'),
    ]),

    takeaway('tw', [
        "Chapter 7's framework covers five investment types: care management, behavioral health integration, social needs programs, primary care investment and telehealth with remote monitoring.",
        "The framework's Vermont examples use assumed unit costs and effect sizes; they illustrate the calculation and are not measured results.",
        "An evidence ladder ranks inputs from assumption to published estimate to local estimate to measured result; mark every input with its rung.",
        "Review hardest the inputs that are low on the ladder and move the answer most; consider a pilot to measure them.",
        "Apply the payment arrangement's share of savings before using any row of the framework; only a global budget or full risk lets the organization keep all of the avoided cost.",
        "Investments have a J-curve: costs come first, so show cumulative cash by quarter and the payback period, including a case where savings arrive a year late.",
        "Present a pessimistic, central and optimistic case rather than a single return figure.",
    ]),
    quiz('qz',
        "What is the purpose of marking each input in a business case with its rung on the evidence ladder?",
        [
            ("To make the case look more rigorous without changing its content", False),
            ("To show which inputs are assumptions and which are measured, so review can focus on weak inputs that matter most", True),
            ("To eliminate any input that is not a measured result", False),
            ("To replace the need for sensitivity analysis", False),
        ],
        "The ladder separates assumptions from published estimates, local estimates and measured results. Reviewers can then concentrate on inputs that are both weakly supported and influential, and decide whether a pilot should measure them before the organization commits."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.7 and Figure 7.5: the transformation ROI framework and Vermont examples; §7.3 Figure 7.2: implementation matrix timelines and crossover points"),
    blk('src2', "[2] " + BOOK7 + " — §7.2.6: the care management return calculation (see Lesson 3 of this course)"),
    blk('src3', "[3] HTR Research Lab, Cost-Effectiveness Analysis Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=cea; APM Shared Savings Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=apm-calc"),
    blk('src4', "[4] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — sharing rates that determine the share of savings an organization keeps"),
]

# ════════════════════════════════════════════════════════════════════════════
L11_SLUG = 'vbcfm-primary-care-economics'
L11_TITLE = "Primary Care Economics: What Vermont's Blueprint Evidence Shows and Does Not"
L11 = [
    blk('intro1', "The economic argument for primary care is that a dollar spent upstream can prevent many dollars of hospital and specialty spending. Chapter 7 makes it the foundation of its discussion of primary care investment, and uses Vermont's Blueprint for Health as the evidence. This lesson looks at that evidence closely, because it is the strongest single support for the argument in Vermont, and because the program's own latest annual report is careful about what it does and does not show."),
    blk('intro2', "It covers what the Blueprint is and how it is paid for, the return-on-investment figures reported over time and their provenance, what the 2025 annual report's risk-adjusted comparison says and the caveats it attaches, the 2025 State Auditor's critique, and the funding gap that opened when Medicare's participation ended with the all-payer model agreement in December 2025."),
    blk('intro3', "The conclusion is not that primary care investment does not pay. It is that the evidence is suggestive, the claims should be sized to it, and the financing is fragile."),

    h2('s1h1', 'What the Blueprint Is and What It Costs'),
    blk('s1p1', "The Blueprint for Health pays for three components: patient-centered medical homes, community health teams and related support programs. According to its 2025 annual report, 126 practices achieved or sustained recognition as patient-centered medical homes in 2025, and 201 staff, equal to 115.76 full-time equivalents, work as members of community health teams across the state. The teams include nurses, social workers, mental health counselors, health educators, dietitians, community health workers and panel managers, and provide services free of charge regardless of insurance status."),
    blk('s1p2', "The annual report's budget table shows what the core program costs. Per-member-per-month payments and quality payments to medical home practices were about $11.9 million, funded by all payers including Medicare, and the core community health teams were about $9.9 million, also funded by all payers. The Medicaid-funded elements add more: embedded mental health and substance use staff at federally qualified health centers and hospitals cost about $5.3 million, and spoke staff supporting medication for opioid use disorder cost about $6.0 million. The two core payer-funded elements, medical home payments and core community health teams, together come to about $21.8 million a year."),
    stat_grid('s1sg1', [
        ('126', 'Practices recognized as medical homes, 2025', 'Blueprint for Health 2025 Annual Report'),
        ('201', 'Community health team staff (115.76 FTE)', 'Blueprint for Health 2025 Annual Report'),
        ('$11.9M', 'Medical home payments, annualized', 'Blueprint 2025 Annual Report, all payers including Medicare'),
        ('$9.9M', 'Core community health teams, annualized', 'Blueprint 2025 Annual Report, all payers including Medicare'),
    ]),

    h2('s2h1', 'The Return-on-Investment Figures and Their Provenance'),
    blk('s2p1', "Chapter 7 reports three figures. A peer-reviewed analysis by Jones and colleagues of 2008 to 2013 data found about $5.80 less in medical spending for every dollar spent on the Blueprint. The Blueprint's 2016 annual report estimated $3.00 to $3.80 per dollar. And the federal multi-payer advanced primary care practice evaluation found a return of 4.49 on Medicare's fees. These are the book's figures, and the Blueprint's own materials show how much the number depends on method."),
    blk('s2p2', "State documents that summarize the program describe a 2016 estimate of $3 saved for each dollar spent including special Medicaid services, and $3.80 excluding them. A 2016 state presentation reported an all-payer return on investment of 5.8 for calendar year 2014 and, for Medicaid alone, figures of 0.9 and 3.0, which the slide does not label. These sources are the program's own administrators, not independent evaluators, and the calculation changed between reports. The figures are therefore best read as a range of estimates, from roughly breakeven for some payers to several dollars returned per dollar for the all-payer population, with the method changing the answer."),
    blk('s2p3', "A reader building a business case should carry the range and its provenance, not the highest number. Saying that Vermont's own program evaluations have estimated returns of roughly $3 to nearly $6 per dollar, with large uncertainty and some payer-specific estimates near breakeven, is accurate. Saying that the Blueprint returns $5.80 per dollar is not."),

    h2('s3h1', 'What the 2025 Annual Report Shows and Says About Itself'),
    blk('s3p1', "The latest report compares calendar year 2023 outcomes for members attributed to Blueprint practices with members attributed to other primary care practices. The risk-adjusted total expenditure per member per year was $8,126.80 for Blueprint-attributed members and $9,325.20 for others, a difference of about $1,200 or 13 percent. Hypertension control was 77.0 percent versus 72.3 percent, and child and adolescent well-care visits were 67.9 percent versus 49.9 percent. Other measures were similar or favored the comparison group: emergency department visits per thousand were 362.0 versus 352.4, and heart failure admissions per 100,000 were 3.6 versus 3.2."),
    blk('s3p2', "The report is explicit about limits. It says that, with risk adjustment, Blueprint-attributed members have lower expenditure given their relative medical needs, but that since the values are risk-adjusted they do not reflect an exact dollar amount of savings. It adds that it is impossible to predict from the data whether the members' expenditures would increase, or by how much, if they saw other providers, and cautions that past performance cannot guarantee future results. It also names two areas that need work: screening for chlamydia, and reasons for increased admissions for heart failure and chronic lung disease."),
    table('s3t1', 'Blueprint-attributed versus other primary care attributed members, CY2023 (2025 Annual Report)', [
        {'Measure': 'Total expenditure per member per year (risk-adjusted)', 'Blueprint_PCMH': '$8,126.80', 'Other_primary_care': '$9,325.20'},
        {'Measure': 'Hypertension with blood pressure in control', 'Blueprint_PCMH': '77.0%', 'Other_primary_care': '72.3%'},
        {'Measure': 'Child and adolescent well-care visits, ages 3-21', 'Blueprint_PCMH': '67.9%', 'Other_primary_care': '49.9%'},
        {'Measure': 'Outpatient ED visits per 1,000 member years (risk-adjusted)', 'Blueprint_PCMH': '362.0', 'Other_primary_care': '352.4'},
        {'Measure': 'Heart failure admissions per 100,000', 'Blueprint_PCMH': '3.6', 'Other_primary_care': '3.2'},
    ]),
    callout('s3c1', "The program's own report says the lower risk-adjusted cost is evidence that relative costs are lower, not a measure of dollars saved, and that it cannot say what would happen if members used other practices."),

    h2('s4h1', "The Auditor's Critique"),
    blk('s4p1', "The 2025 report notes that the State Auditor's Office conducted a performance audit of the Blueprint in 2024, focused on its annual reports to the legislature and statutory requirements, with the report published in February 2025. Search coverage and the Auditor's headline describe its conclusion as finding that the Blueprint was not demonstrating whether it is improving health outcomes or controlling health care costs. This lesson could not retrieve the Auditor's report directly, so the characterization is secondhand and should be checked against the report itself."),
    blk('s4p2', "The Blueprint's response, as the annual report records, was to change the report to improve readability and program evaluation and to complete a strategic plan delivered to the Agency of Human Services Secretary in December 2025, with implementation beginning in 2026. For a reader assessing the evidence, the Auditor's critique and the program's own caveats point in the same direction: the Blueprint is a long-running, widely supported program whose causal effect on cost is hard to isolate, so claims about its return should be framed as estimates."),

    h2('s5h1', 'The Funding Gap'),
    blk('s5p1', "The most consequential finding in the 2025 report is financial. Medicare contributed to the Blueprint's practice and community health team payments under the all-payer model agreement with CMS, which ended in December 2025. The report says that once the agreement ends, Medicare can no longer contribute until another agreement is signed, that Vermont had applied to participate in AHEAD, then the only available agreement, with payments expected to begin in 2028, and that the legislature appropriated funding to cover more than $5 million of Medicare payments for calendar year 2026, approximately one-quarter of the total annual funding for practices and community health teams. The report warns that loss of this funding could significantly reduce community health team staffing."),
    blk('s5p2', "Vermont's July 2026 withdrawal from AHEAD, described in the CMMI course, removed the vehicle the report expected. As a result, the state faces a gap in the federal agreement through which Medicare would resume its contribution, and the Blueprint's strategic plan has to address it. For an organization that relies on community health team services, the practical question is whether state funding continues beyond 2026. For a state, it is a case study in how a successful program can be left exposed when a federal model ends."),
    blk('s5p3', "Chapter 7 also notes that AHEAD was designed to measure primary care investment as a percentage of total spending, an explicit accountability framework for the primary care argument, and that Vermont's withdrawal means AHEAD will not be the vehicle that applies it. Act 68 offers an alternative lever: it allows the Green Mountain Care Board, with the Agency of Human Services, to apply reference-based pricing to services outside the hospital, including setting minimum amounts for primary care, in order to enhance access."),

    takeaway('tw', [
        "In 2025, 126 practices were recognized as Blueprint medical homes and 201 staff, equal to 115.76 FTE, worked on community health teams, according to the Blueprint's 2025 annual report.",
        "Chapter 7 reports Blueprint returns of $5.80 per dollar from a peer-reviewed analysis, $3.00 to $3.80 from the 2016 annual report and 4.49 from the federal MAPCP evaluation; state documents show payer-specific estimates as low as roughly breakeven.",
        "The 2025 report finds risk-adjusted total expenditure of $8,126.80 per member per year for Blueprint-attributed members against $9,325.20 for others in CY2023, and says this is evidence of lower relative cost, not an exact dollar saving.",
        "Some CY2023 measures favored the comparison group, including ED visits per thousand and heart failure admissions, which the report flags for further work.",
        "The State Auditor's February 2025 audit, as reported, concluded the Blueprint was not demonstrating whether it improves outcomes or controls costs; this lesson could not retrieve the audit directly.",
        "Medicare stopped contributing when the all-payer model agreement ended in December 2025; the legislature covered more than $5 million, about one-quarter of annual funding, for 2026.",
        "Frame primary care returns as estimates with provenance, and plan the financing, since the federal vehicle for Medicare's contribution is not in place.",
    ]),
    quiz('qz',
        "What does the Blueprint's 2025 annual report say about interpreting the lower risk-adjusted expenditure of Blueprint-attributed members?",
        [
            ("It proves that each Blueprint dollar saves exactly $5.80", False),
            ("It is evidence of lower relative cost, but because values are risk-adjusted it does not give an exact dollar saving, and the report cannot predict what would happen if members used other providers", True),
            ("It shows the program should be defunded", False),
            ("It is irrelevant because expenditures are not measured", False),
        ],
        "The report states that, with risk adjustment, Blueprint-attributed members have lower per-member expenditure given their relative needs, but that since the values are risk-adjusted they do not reflect an exact dollar amount of savings, and that it is impossible to predict from the data how expenditures would change if members saw other providers."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] Vermont Blueprint for Health, 2025 Annual Report (January 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — practices, community health team staff, budget by element, CY2023 measures, Medicare participation change, audit reference"),
    blk('src2', "[2] " + BOOK7 + " — §7.8: Vermont's primary care economics; §7.7.1 Figure 7.5"),
    blk('src3', "[3] Vermont Agency of Human Services, Blueprint for Health Return on Investment (testimony, January 20, 2023) — https://legislature.vermont.gov/Documents/2024/WorkGroups/Senate%20Health%20and%20Welfare/Agency%20of%20Human%20Services/Blueprint%20for%20Health/W~John%20Saroyan~Blueprint%20for%20Health%20Return%20on%20Investment~1-20-2023.pdf — state summary of return estimates; Blueprint presentation of February 5, 2016 by Craig Jones, MD, as listed by the legislature"),
    blk('src4', "[4] Vermont State Auditor, performance audit of the Blueprint for Health (February 2025) — https://auditor.vermont.gov/sites/auditor/files/documents/Blueprint%20Final%20Report.pdf — cited as described in the Blueprint's report and search coverage; the PDF could not be retrieved for this lesson"),
    blk('src5', "[5] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — reference-based pricing outside the hospital, including primary care minimum amounts"),
]

# ════════════════════════════════════════════════════════════════════════════
L12_SLUG = 'vbcfm-making-the-case'
L12_TITLE = 'Making the Financial Case: To a Board, a Payer and a Legislature'
L12 = [
    blk('intro1', "A good analysis does not win a decision by itself. The same business case needs to be told differently to a board that governs a hospital, to a payer deciding whether to share savings and to a legislature deciding whether to appropriate money. Chapter 7 ends with implications for each audience; this lesson turns them into a working method."),
    blk('intro2', "It starts from the money available to Vermont organizations in 2026 and 2027, which shapes what a case can propose, then sets out what each audience needs to see, how to handle the objections each is likely to raise, and how to write the decision request. The sources for the funding facts are the book and recent press coverage, and the lesson says where a number is the book's alone."),
    blk('intro3', "The last section is a one-page template. Lesson 15's capstone uses it."),

    h2('s1h1', 'The Money Available, and Its Limits'),
    blk('s1p1', "Three funding streams shape the cases Vermont organizations can make. The first is the Rural Health Transformation Program, which local reporting says allocates $195 million a year for five years to Vermont, with priorities including primary care, mental health and keeping rural hospitals open. Chapter 7 includes remote monitoring grants from the program in its examples, and Chapter 3 notes the program's national funds, $50 billion, expire in 2030 while Medicaid reductions accelerate afterward. The money is real and time-limited, so a case funded by it needs a plan for what happens after 2030."),
    blk('s1p2', "The second is the savings the payment system itself creates: shared savings under contracts, margin under global budgets and the savings from reference-based pricing that the statute requires to reach premiums. The third is state appropriations, as the Blueprint's Medicare backfill shows: the legislature can fund a gap, once, if the case is compelling. Each stream has a different timing and a different owner, which matters when a case proposes to sustain a program beyond a grant."),
    callout('s1c1', "A case funded by time-limited money must show how the program is financed when the money ends: through savings captured, a payer contract or a state appropriation."),

    h2('s2h1', 'The Board: Risk and Capital'),
    blk('s2p1', "A hospital board asks three questions: what does it cost, what is the risk and what happens if we do nothing? The case should lead with the last. Under reference-based pricing, the global budget timeline and H.R. 1, doing nothing has a modeled cost, which the Hospital Financial Stress Test of Lesson 9 quantifies. The proposal then appears as a way to reduce that exposure, not as discretionary spending."),
    blk('s2p2', "Then it should show the three-case return from Lesson 10 with the share-of-savings adjustment, the payback period and the readiness gaps from Lessons 4 and 5. A board is most persuaded by a plan that spends first on the binding constraint. If the readiness assessment shows revenue cycle at 30 percent, funding care managers before fixing coding and attribution invites a failure the board will later attribute to the proposal."),
    blk('s2p3', "Finally, state the decision and the control: the amount, the milestones that release each tranche, the measures reported to the board quarterly and the trigger for stopping. Boards approve investments they can steer."),

    blk('s2p4', "A board will also ask how the proposal fits with commitments already made. Show the capital plan with the proposal in it, the effect on days cash on hand and debt service coverage using the stress test's measures, and the effect on covenants if the first year runs below plan. A proposal that quietly pushes the hospital toward a covenant threshold will be rejected, however strong its long-run return, and it is better for the proposer to raise the issue first and show how the tranches release only as the milestones are met."),

    h2('s3h1', 'The Payer: Alignment and Fairness'),
    blk('s3p1', "A payer wants a contract that reduces its costs without taking on risk it cannot manage. Chapter 7 advises hospital executives to use every commercial contract renewal to negotiate three things: shared savings arrangements that let the hospital capture the benefit of the utilization reduction its investments produce, quality measurement aligned with HEDIS and the Green Mountain Care Board's global budget measures instead of payer-specific measures, and administrative simplification, including consolidated reporting, standardized prior authorization and reduced documentation."),
    blk('s3p2', "The negotiation uses the contract checklist of Lesson 6. A hospital arguing for a fair benchmark should have its own baseline analysis, a position on rebasing and ratchet protection and a stated view on carve-out symmetry. It should also be ready for the payer's counter-argument, which is that a hospital's savings come from the payer's own price reductions under reference-based pricing. Chapter 7 treats that tension openly: reference-based pricing is itself a savings stream for payers, and the statute requires the Board to monitor that price decreases reach premiums."),
    blk('s3p3', "Chapter 7 also notes a structural difficulty for the legislature to consider: Vermont's commercial market is concentrated in a small number of large insurers, which creates negotiating dynamics that global budgets do not resolve, and the Board has authority over hospital rates but not over insurer behavior in these negotiations."),

    h2('s4h1', 'The Legislature: Public Value and Accountability'),
    blk('s4p1', "A legislative committee asks different questions again: who benefits, what does it cost the state, how will we know it worked and what happens if it does not? The Blueprint's Medicare backfill is a useful model. The legislature appropriated more than $5 million to cover one year's gap, a decision that rested on the program's established role, its funding structure and the warning that loss of funding could significantly reduce community health team staffing."),
    blk('s4p2', "A strong legislative case therefore names the beneficiaries and the number of people served, states the appropriation and its duration, shows the measures that will be reported and when, and acknowledges the limits of the evidence. The Blueprint's own annual report, which is candid about what its risk-adjusted comparison does and does not show, is an example of the tone that earns trust. Overstated returns invite the kind of audit critique the program received."),

    blk('s4p3', "Legislatures also care about equity and geography. A case that shows who is reached, by region and by the groups the state is accountable for, is stronger than one that reports only an average. It should also say what the state would give up by acting later: reference-based pricing and the global budget timetable are statutory, so delay shifts risk to hospitals and, if they fail, to patients and communities."),

    h2('s5h1', 'Objections and the One-Page Case'),
    steps('s5st1', 'Likely objections and honest answers', [
        ('"The return is overstated."', 'Show the evidence ladder, the range and the share of savings the organization keeps.'),
        ('"We cannot afford it now."', 'Show the cost of doing nothing from the stress test and the payback period.'),
        ('"We are not ready."', 'Show the readiness profile, the binding constraint and the sequence that fixes it first.'),
        ('"What happens when the grant ends?"', 'Show the post-grant financing: captured savings, a payer contract or an appropriation.'),
        ('"How will we know it worked?"', 'Name the measures, the comparison group, the reporting dates and the stop trigger.'),
    ]),
    blk('s5p1', "The one-page case has six parts. The problem and its cost if unaddressed, with a source. The proposal and its cost, including the financing after any grant. The return as a range, with the evidence rung for each input and the share of savings kept. The readiness and risk position, naming the binding constraint and what is done about it. The measures and the stop trigger. And the decision requested, with the date it is needed. Everything else belongs in an appendix."),
    warning('s5w1', "A single number is not a case", "A one-page case that gives one return figure and no range, no share-of-savings adjustment and no financing plan after the grant will not survive a skeptical reader."),

    takeaway('tw', [
        "Vermont's time-limited funding, reported at $195 million a year for five years from the Rural Health Transformation Program, requires a plan for financing after the money ends.",
        "To a board, lead with the modeled cost of doing nothing, show a three-case return with the share of savings kept, and spend first on the binding readiness constraint.",
        "To a payer, use contract renewals to negotiate shared savings, aligned quality measures and administrative simplification, with a clear position on benchmarks and carve-outs.",
        "Reference-based pricing is itself a savings stream for payers, and the statute requires the Board to monitor whether price decreases reach premiums.",
        "To a legislature, name the beneficiaries, the appropriation and duration, the measures and reporting dates, and acknowledge the limits of the evidence.",
        "The Blueprint's Medicare backfill of more than $5 million for 2026 shows a legislature can fund a gap once, when the case is compelling.",
        "A one-page case has six parts: problem, proposal and financing, return as a range, readiness and risk, measures and stop trigger, and the decision requested.",
    ]),
    quiz('qz',
        "Why should a business case funded by time-limited grant money show a post-grant financing plan?",
        [
            ("Because grant funds always last indefinitely", False),
            ("Because the program must be sustained through captured savings, a payer contract or an appropriation after the money ends, or it will fail when funding stops", True),
            ("Because payers refuse to contract with grant-funded programs", False),
            ("Because financing plans are required by the Green Mountain Care Board for all grants", False),
        ],
        "Time-limited funds such as the Rural Health Transformation Program expire, and Chapter 3 notes Medicaid reductions accelerate after 2030. A case that does not show how the program is financed afterward invites the question of what happens when the grant ends."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.10 (Implications for You) and §7.3 Figure 7.2: negotiating contract renewals, administrative simplification, the commercial market concentration issue"),
    blk('src2', "[2] WCAX, Vermont drops AHEAD healthcare model; shifts to $195M rural health fund (July 28, 2026) — https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/ — Rural Health Transformation Program amounts and priorities"),
    blk('src3', "[3] Health Transformation Review, Chapter 3 — https://healthtransformationreview.org/read/chapter-3 — §3.6: Rural Health Transformation funds and the timing of Medicaid reductions"),
    blk('src4', "[4] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — the Medicare funding gap and legislative appropriation"),
    blk('src5', "[5] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — premium monitoring of reference-based pricing"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
