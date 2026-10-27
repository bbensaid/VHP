exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_portfolio_common.py').read())

# Track 3 — Sequencing and Scheduling
# Vermont facts: HTR book Chapter 15 (§15.7-15.8, §15.12, Figure 15.6) and Chapter 1 (§1.4, §1.11.2).
# Portfolio Sequencing Test results: produced 2026-10-27 by running runPortfolioTest(VERMONT_PORTFOLIO,
# vermont-2026 preset) from frontend/lib/framework/portfolio-test.ts.
# Agile Practice Guide (PMI and Agile Alliance, 2017): life-cycle chapter (predictive, iterative,
# incremental, agile, hybrid). GAO Cost Estimating and Assessment Guide GAO-20-195G (March 2020): EVM.

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'tpm-dependency-sequence'
L7_TITLE = 'Portfolio Sequence Is Dependency Sequence'
L7 = [
    blk('intro1', "Conventional scheduling orders work by deadline and by resource availability. Chapter 15 argues that a five-pillar portfolio has a third, overriding constraint: the dependency structure from Chapter 1. Each component inherits the inbound dependencies of its pillar, so an Economics component cannot be productively implemented before the Technology work that makes it measurable, however near its deadline."),
    blk('intro2', "This lesson explains why that constraint changes the portfolio manager's job, sets out the two decision rules the book derives from it, shows how gate status differs from a conventional critical path, and walks through what the platform's Portfolio Sequencing Test finds when it is run on Vermont's nineteen components."),
    blk('intro3', "The Transformation Leadership course includes a hands-on workshop that runs the same test step by step. This lesson concentrates on the scheduling logic behind it, which is what you need to apply the test to a portfolio the tool has never seen."),

    h2('s1h1', 'Why Deadlines Are the Wrong Organizing Principle'),
    blk('s1p1', "A statutory deadline tells you when something must be finished. It says nothing about whether the work it depends on will be ready in time. A portfolio scheduled by deadline alone will push hardest on whichever component is due soonest, even when that component cannot yet produce anything usable because its upstream pillar is still being built."),
    blk('s1p2', "Chapter 15 ties this directly to the failure that opens the book. OneCare Vermont, the all-payer accountable care organization, advanced its payment model on a voluntary mandate without the integrated real-time data that would have made it manageable. In portfolio terms, an Economics component was implemented ahead of its Technology gate. The book's point is that a portfolio manager who schedules Vermont's current components by statutory date alone will reproduce exactly that failure."),
    blk('s1p3', "The alternative is to schedule by dependency first and deadline second. The deadline still matters: it tells you how much time the dependency chain has. But the order of work comes from the chain, not from the calendar."),
    callout('s1c1', "Design work is the important exception. Economics-as-design, the modeling and methodology that prepare a payment change, runs in parallel with Technology work. Only implementation waits for the gate (Chapter 1, §1.11.2)."),

    h2('s2h1', 'Two Decision Rules a Gantt Chart Does Not Give You'),
    blk('s2p1', "The first rule: a component whose upstream pillar gate is still closed is not behind schedule. It is correctly waiting. Accelerating it consumes budget and political capital to produce output nobody can use. The book's clearest case is the AHS and Green Mountain Care Board analytics-vendor deployment, which carries the register's highest delivery-risk score, 20, tied only with the risk that the portfolio function itself is not established. It scores so high not because its own deadline is nearest, but because three downstream components converge on it."),
    blk('s2p2', "The second rule is the inverse: a component with no unmet upstream dependency should be running now, however distant its deadline. Social-risk adjustment, the methodology that keeps global budgets from penalizing hospitals serving sicker and poorer populations, has a FY2028 target and no upstream blocker. Treating it as a FY2028 problem because that is when it is due is, in the book's words, the scheduling error that leaves equity work perpetually late."),
    blk('s2p3', "Together the two rules reverse a common instinct. They tell the portfolio manager to relieve pressure on some components that look late and to add pressure to some that look early. Neither move makes sense on a deadline-ordered chart; both make sense once the dependencies are drawn."),
    compare('s2cmp1', 'Two components, two misleading calendars',
        'Looks late, is correct', [
            'Upstream gate still closed',
            'Not yet started or still in design',
            'Right action: resource the gating component instead',
        ],
        'Looks early, is late', [
            'No unmet upstream dependency',
            'Not yet running',
            'Right action: start it now, whatever its deadline',
        ]),

    h2('s3h1', 'Gates Versus the Critical Path'),
    blk('s3p1', "Conventional schedule analysis finds the critical path: the longest chain of linked activities, which sets the earliest possible finish. The five-pillar framework adds gates. A gate opens when the enabling work in an upstream pillar is actually finished, not when a milestone is declared (Chapter 1, §1.4). A component can sit on a schedule's critical path and still be the wrong thing to accelerate, if its gate is closed."),
    blk('s3p2', "The book compresses this into the Portfolio Manager's Sequencing Test, four questions applied to every component in order. Which pillar does it belong to? Is that pillar's upstream gate open? If closed, what is the gating component, and is it resourced? If open, is this component running? Applied across all nineteen components, the test produces the portfolio's true critical path, which will not match the order of statutory deadlines."),
    blk('s3p3', "The third question carries the managerial insight. When a component is waiting on a closed gate, schedule pressure belongs on the gating component, not on the waiting one. Moving pressure upstream to where the constraint actually sits is the most useful thing a portfolio manager does with a schedule."),
    steps('s3st1', "The Portfolio Manager's Sequencing Test (Chapter 15, §15.7)", [
        ("Which pillar?", "Assign the component to its pillar, as in the inventory."),
        ("Is the upstream gate open?", "Open means the enabling work is finished, not that a milestone was declared. Design work and care-model work that produces value on its own do not wait."),
        ("If closed, what is gating it?", "Name the gating component and check that it is resourced. Schedule pressure belongs there."),
        ("If open, is it running?", "If not, it is late by dependency order even when it is early by calendar."),
    ]),

    h2('s4h1', "What the Test Finds in Vermont's Portfolio"),
    blk('s4p1', "The platform's Portfolio Sequencing Test at /portfolio-sequencing-test runs these four questions on Vermont's nineteen components, using the same dependency engine as the HTR Simulator and Vermont's Fall 2026 readiness scores. With those inputs the Policy and Technology gates are open, while Economics is blocked by a Technology pillar that is only partly built, and Clinical and Operations are blocked further down the chain."),
    blk('s4p2', "The verdicts follow. Twelve components are on track. Reference-based-pricing implementation and global-budget design are doing design work in parallel under a closed gate, which the test marks as correct. The Care Integration Network build-out is ready to implement: its gate is open but it is still in design. RHT Program deployment is implementing ahead of its gate. And three components are late by dependency order because nothing upstream is holding them and they have not started: the statewide AI-governance framework, the AHS restructuring work and the portfolio office itself."),
    blk('s4p3', "The test also names where schedule pressure belongs. The four unfinished Technology components, the analytics deployment, the Care Integration Network, the health information exchange expansion and the AI-governance framework, each hold three Economics components waiting behind them. Those four, not the Economics components with nearer deadlines, are where a portfolio manager's attention should go."),
    stat_grid('s4sg1', [
        ('12', 'Components on track', 'Portfolio Sequencing Test, Vermont preset, Fall 2026 scores'),
        ('3', 'Late by dependency order', 'AI-governance framework, AHS restructuring, PMO establishment'),
        ('1', 'Running ahead of its gate', 'RHT Program deployment (Economics, gate held by Technology)'),
        ('4', 'Technology components where pressure belongs', 'Each holds three Economics components waiting'),
    ]),
    warning('s4w1', "A verdict is a prompt, not a ruling", "The test applies the book's dependency logic to the statuses and gate judgments entered. RHT deployment running ahead of its gate, for example, may be justified by federal spending deadlines. The test's job is to make that trade-off visible and deliberate, not to forbid it."),

    h2('s5h1', 'Applying the Logic to a Portfolio of Your Own'),
    blk('s5p1', "To run the test on your own portfolio, load your inventory from Lesson 3 into the Portfolio Sequencing Test, replacing Vermont's components. For each component set its pillar and status, and decide whether its implementation genuinely needs the pillar's upstream gate. Care-model programs that produce value on their own, and analytical methodologies with no upstream blocker, are usually not gated; the tool lets you mark them so."),
    blk('s5p2', "Then score the five pillars' current readiness, or start from the Vermont preset and adjust it. Read the verdicts in two passes. First, look for components running ahead of their gate and decide whether each is a deliberate trade-off or a mistake. Second, look at the list of components where schedule pressure belongs and compare it with where your leadership's attention actually is. The gap between those two lists is the most useful finding the test produces."),
    blk('s5p3', "Repeat the test whenever a gate status changes. A portfolio's critical path moves as upstream work finishes, and the components that were correctly waiting last quarter may be late this quarter if they did not start when their gate opened."),
    steps('s5st1', 'Run the test on your portfolio', [
        ("Load your inventory", "Replace the Vermont preset at /portfolio-sequencing-test with your components."),
        ("Mark the gating", "For each component, decide whether implementation needs the upstream gate."),
        ("Score readiness", "Set the five pillars' readiness, or adjust the Vermont preset."),
        ("Read ahead-of-gate verdicts", "Decide which are deliberate trade-offs and which are mistakes."),
        ("Compare pressure lists", "Set where pressure belongs against where attention is today."),
        ("Re-run on gate changes", "The critical path moves as upstream work finishes."),
    ]),

    takeaway('tw', [
        "In a five-pillar portfolio each component inherits its pillar's inbound dependencies, so order comes from the dependency chain, not the calendar.",
        "Scheduling Economics components by deadline ahead of their Technology gate repeats the OneCare failure in portfolio form.",
        "Rule one: a component behind a closed gate is correctly waiting, not behind schedule; pressure belongs on the gating component.",
        "Rule two: a component with no unmet dependency should be running now, whatever its deadline; social-risk adjustment is the book's example.",
        "Design work runs in parallel under a closed gate; only implementation waits.",
        "On Vermont's Fall 2026 inputs the test finds 12 components on track, one running ahead of its gate, three late by dependency, and four Technology components where pressure belongs.",
        "Re-run the test whenever a gate status changes, because the portfolio's true critical path moves.",
    ]),
    quiz('qz',
        "Social-risk-adjustment methodology is due in FY2028 and has no unmet upstream dependency. According to Chapter 15, what should the portfolio manager do?",
        [
            ("Schedule it for FY2027, a year before its deadline", False),
            ("Start it now, because a component with no unmet dependency is late by dependency order if it is not running", True),
            ("Wait until the Technology gate opens", False),
            ("Remove it from the portfolio until FY2028 budgets are set", False),
        ],
        "The book's second decision rule says a component with no unmet upstream dependency should be running now regardless of how distant its deadline is. Treating social-risk adjustment as a FY2028 problem because that is when it is due is the scheduling error the book says leaves equity work perpetually late."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.7 (Portfolio Sequence Is Dependency Sequence; the Sequencing Test), Figure 15.6 (R-01 and R-08 scores)"),
    blk('src2', "[2] Health Transformation Review, Transforming Healthcare, Chapter 1 — https://healthtransformationreview.org/read/chapter-01 — §1.2 OneCare autopsy, §1.4 gate definition, §1.11.2 Economics-as-design"),
    blk('src3', "[3] HTR Portfolio Sequencing Test — https://healthtransformationreview.org/portfolio-sequencing-test — verdicts and pressure points for the Vermont preset, Fall 2026 scores"),
    blk('src4', "[4] U.S. Government Accountability Office, Schedule Assessment Guide, GAO-16-89G (December 2015) — https://www.gao.gov/products/gao-16-89g — critical path and schedule logic"),
    blk('src5', "[5] HTR Academy, Transformation Leadership: Running the Sequencing Test: A Portfolio Register Workshop — https://healthtransformationreview.org/academy/tracks/transformation-leadership — the companion workshop"),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'tpm-predictive-adaptive-hybrid'
L8_TITLE = 'Predictive, Adaptive or Hybrid: Choosing the Approach per Component'
L8 = [
    blk('intro1', "Not every component of a transformation should be managed the same way. Some have a fixed legal deadline and a well-defined deliverable; a detailed plan, followed carefully, is exactly right for them. Others are trying to hit a target that is still moving, where the best plan is a short cycle of building, testing and adjusting. Managing both kinds identically guarantees that one of them is managed badly."),
    blk('intro2', "Chapter 15 assigns each of Vermont's components to a predictive, adaptive or hybrid approach. This lesson explains the three approaches as PMI's guidance describes them, shows how the book classifies the components and why, and sets out how a portfolio office governs a portfolio that mixes all three."),
    blk('intro3', "The choice is not a matter of fashion. It follows from two properties of each component: how stable its requirements are, and how much is gained by learning quickly from early results."),

    h2('s1h1', 'Three Approaches'),
    blk('s1p1', "A predictive approach, often called waterfall, defines scope, schedule and cost early and manages change through formal control. It suits work whose requirements are well understood and whose deadline is fixed. An adaptive approach, which includes agile methods, plans in short cycles, delivers in increments and expects requirements to change as the team learns. It suits work whose requirements cannot be fully known in advance."),
    blk('s1p2', "Between them lies the hybrid approach: a component with fixed deliverables at its boundary and adaptive work inside it, or a mostly predictive plan with some agile elements. PMI's Agile Practice Guide, developed with the Agile Alliance and published in 2017, treats hybrid life cycles as a legitimate fit-for-purpose choice rather than a compromise, and describes combinations ranging from predominantly predictive with some agile components to largely agile with a predictive component."),
    blk('s1p3', "PMI's recent standards have moved further in the same direction. The PMBOK Guide's eighth edition presents its process guidance as reference material that applies to predictive, agile and hybrid work alike. The choice of approach is now treated as one of the first decisions in managing any piece of work, not a matter of organizational style."),
    table('s1t1', 'Choosing an approach', [
        {'Property': 'Requirements', 'Predictive': 'Stable and well defined', 'Adaptive': 'Evolving; learned during delivery'},
        {'Property': 'Deadline and deliverable', 'Predictive': 'Fixed by statute or contract', 'Adaptive': 'Outcome fixed; path flexible'},
        {'Property': 'Planning', 'Predictive': 'Detailed up front; change controlled', 'Adaptive': 'Short cycles; replanned each cycle'},
        {'Property': 'Credential fit (Chapter 15)', 'Predictive': 'PMP', 'Adaptive': 'PMI-ACP'},
    ]),

    h2('s2h1', 'How Chapter 15 Classifies Vermont\'s Components'),
    blk('s2p1', "The book assigns predictive management to components with fixed statutory deadlines and well-defined deliverables: the reference-based-pricing methodology rulemaking, the Statewide Strategic Plan (with adaptive elements), the analytics-vendor deployment, Certified Community Behavioral Health Clinic certification, and AHS restructuring. Each has a defined end product and a date that cannot move."),
    blk('s2p2', "Adaptive management goes to components where requirements evolve and rapid learning beats adherence to a fixed plan. The statewide AI-governance framework is the clearest case, because the regulatory landscape is changing faster than any fixed plan could anticipate. The Care Integration Network build-out depends on vendor outputs and an evolving FHIR ecosystem. Blueprint medical-home expansion proceeds practice by practice. And the HEROI equity-scoring methodology iterates as data quality improves."),
    blk('s2p3', "The fourteen-hospital transformation planning effort is the book's hybrid example: fixed deliverables, because each hospital's plan is due on a schedule, with hospital-specific content developed iteratively inside that frame."),
    table('s2t1', "Vermont's components by approach (Chapter 15, §15.8)", [
        {'Approach': 'Predictive', 'Components': 'RBP-methodology rulemaking; Strategic Plan (with adaptive elements); analytics-vendor deployment; CCBHC certification; AHS restructuring'},
        {'Approach': 'Adaptive', 'Components': 'AI-governance framework; CIN build-out; Blueprint PCMH expansion; HEROI methodology'},
        {'Approach': 'Hybrid', 'Components': '14-hospital transformation planning'},
    ]),

    h2('s3h1', 'Why the Distinction Matters for the Portfolio'),
    blk('s3p1', "Using the wrong approach fails in predictable ways. Managing an adaptive component predictively produces a detailed plan that is out of date before it is approved, followed by a series of change requests that consume more effort than the work. Managing a predictive component adaptively risks missing a statutory deliverable while the team iterates on details that were never in question."),
    blk('s3p2', "For the portfolio office, the approach also determines what progress looks like. A predictive component reports against its baseline: activities done, milestones met, earned value. An adaptive component reports learning and increments delivered: what was built this cycle, what was tested, what changed in the plan as a result. Holding an adaptive component to a baseline it was never meant to have will show it as permanently late; holding a predictive component only to increments will hide a slipping legal deadline."),
    blk('s3p3', "The approach also interacts with the dependency logic from Lesson 7. Adaptive components upstream of a gate are especially important to watch, because their finish date is less certain by design. The Care Integration Network is adaptive and sits in the Technology pillar that gates Economics. A portfolio manager should track its increments closely, because the gate opens when enough of the network is genuinely usable, not when a planned date arrives."),
    blk('s3p4', "Hybrid components need the most care, because they carry both risks. The fourteen hospital plans have fixed due dates, so the portfolio office must track them predictively at the boundary. Inside each plan, content is developed iteratively with each hospital, so the office should expect revisions and judge each plan by whether it is converging on a usable result rather than by whether it matches an early draft."),
    analogy('s3an1', "Building a bridge and designing a new clinical workflow are both projects, but nobody would manage them the same way. The bridge needs a complete design before the first pour, because changing it halfway is ruinous. The workflow is best tried with a few clinicians, adjusted and tried again, because no one can predict in advance how it will feel at 3 a.m. on a busy unit.", "Predictive and adaptive approaches"),

    h2('s4h1', 'Governing a Mixed Portfolio'),
    blk('s4p1', "A portfolio that mixes approaches needs governance that respects both. The book's roadmap sets a fixed cadence for the whole portfolio: monthly governance reviews, quarterly performance reviews against the Vermont Scorecard, and annual portfolio rebalancing. Within that cadence, predictive components are reviewed against their baselines and stage gates, and adaptive components against their cycle outputs and the outcomes they are aiming at."),
    blk('s4p2', "Two practices make the mix workable. First, every component, whatever its approach, states the outcome it exists to produce and the date by which the portfolio needs it, so adaptive work cannot drift indefinitely. Second, adaptive components declare in advance what evidence will show they are ready to open the next gate, so the decision is made on agreed criteria rather than on a plan date or a mood."),
    blk('s4p3', "The book's credential mapping follows from the same distinction: PMP for the predictive components, PMI-ACP for the adaptive ones, which is why it recommends both for the Policy and Technology program managers whose pillars contain both kinds of work."),
    steps('s4st1', 'Governing predictive and adaptive components together', [
        ("Classify every component", "Predictive, adaptive or hybrid, recorded in the inventory."),
        ("Set the shared cadence", "Monthly governance, quarterly performance review, annual rebalancing."),
        ("Report on the right measure", "Baselines and stage gates for predictive; cycle outputs and outcomes for adaptive."),
        ("Fix outcomes and need-by dates", "Every component, whatever its approach, states what it must produce and when."),
        ("Agree gate evidence in advance", "Adaptive components define what proves they are ready to open the next gate."),
    ]),

    h2('s5h1', 'Classify Your Own Components'),
    blk('s5p1', "Take the inventory from Lesson 3 and add an approach column. For each component ask two questions: are its requirements stable enough to plan in detail now, and is there a fixed external deadline for a defined deliverable? Two yes answers point to predictive management. Two no answers point to adaptive. Mixed answers usually point to hybrid: fixed boundaries with iterative content inside them."),
    blk('s5p2', "Then check your staffing against the classification. Teams experienced only in predictive delivery often struggle with adaptive components and vice versa. Where a pillar contains both, its program lead needs fluency in both, which is the logic behind the book's dual-credential recommendation for Policy and Technology."),
    blk('s5p3', "Finally, check your reporting. If every component reports the same metrics in the same format, the portfolio office is probably holding some components to the wrong measure. Adjusting the report template to the approach is a small change that removes a large source of false alarms and false comfort."),
    highlight('s5hl1', "A component reported as permanently late may simply be adaptive work held to a predictive baseline. Check the approach before you check the team."),

    takeaway('tw', [
        "Predictive management suits stable requirements and fixed deadlines; adaptive management suits evolving requirements and fast learning; hybrid combines fixed boundaries with iterative content.",
        "PMI's Agile Practice Guide, developed with the Agile Alliance in 2017, treats hybrid life cycles as a legitimate fit-for-purpose choice.",
        "Chapter 15 manages rulemaking, the Strategic Plan, the analytics deployment, CCBHC certification and AHS restructuring predictively.",
        "The AI-governance framework, CIN build-out, Blueprint expansion and HEROI methodology are adaptive; the 14-hospital planning effort is hybrid.",
        "The wrong approach fails predictably: stale plans and change-request overload, or missed legal deadlines.",
        "A mixed portfolio shares one governance cadence but reports each component on the measure that fits its approach, with need-by dates and agreed gate evidence.",
        "The book maps PMP to predictive work and PMI-ACP to adaptive work, which is why Policy and Technology leads need both.",
    ]),
    quiz('qz',
        "The statewide AI-governance framework is reported as late every month against a detailed baseline set two years ago. What does this lesson suggest checking first?",
        [
            ("Whether the team should be replaced", False),
            ("Whether an adaptive component is being held to a predictive baseline it was never meant to have", True),
            ("Whether the framework should be removed from the portfolio", False),
            ("Whether the baseline should be extended by another two years", False),
        ],
        "The book classifies the AI-governance framework as adaptive because the regulatory landscape evolves faster than any fixed plan. Reporting it against a detailed predictive baseline will show it as permanently late regardless of progress. It should report cycle outputs against its outcome and need-by date, with agreed evidence for readiness."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.8 (predictive vs adaptive approaches; component classification; PMP and PMI-ACP mapping), §15.12 (governance cadence)"),
    blk('src2', "[2] Project Management Institute and Agile Alliance, Agile Practice Guide (2017) — https://www.pmi.org/shop/p-/book/agile-practice-guide-%28english%29/00101602301 — predictive, iterative, incremental, agile and hybrid life cycles"),
    blk('src3', "[3] Project Management Institute, PMBOK Guide, 8th edition (November 2025) — https://www.pmi.org/standards/pmbok — process guidance applicable to predictive, agile and hybrid work"),
    blk('src4', "[4] Project Management Institute, PMI Agile Certified Practitioner (PMI-ACP) — https://www.pmi.org/acp — the adaptive-practice credential"),
]

# ════════════════════════════════════════════════════════════════════════════
L9_SLUG = 'tpm-earned-value-schedule-health'
L9_TITLE = 'Measuring Progress: Earned Value and Schedule Health'
L9 = [
    blk('intro1', "Chapter 15's first objection ends with a list of what the existing oversight arrangements do not provide, and earned-value tracking is on it. The book's point is that monthly reports track activities, not performance. They say what was done, not whether the work is delivering the value planned for the money and time spent."),
    blk('intro2', "Earned value management (EVM) is the standard technique for measuring performance in that sense. This lesson explains its three core quantities and four basic indicators, works through an illustrative example, sets out the federal standards that govern it, and then marks its limits: what EVM cannot tell a five-pillar portfolio manager, and what has to be read alongside it."),
    blk('intro3', "EVM is most useful for predictive components with a baseline. For adaptive components, Lesson 8's cycle-output measures fit better. A portfolio office uses each where it fits."),

    h2('s1h1', 'The Three Core Quantities'),
    blk('s1p1', "Earned value compares three numbers at any point in time. Planned value (PV) is the budgeted cost of the work scheduled to be done by now. Earned value (EV) is the budgeted cost of the work actually completed by now. Actual cost (AC) is what has really been spent to complete that work."),
    blk('s1p2', "The insight of EVM is that progress is measured in the budget's own units. A component that has spent half its money has not necessarily done half its work; earned value asks how much of the planned work, valued at its planned cost, is genuinely complete. Comparing earned value with planned value shows whether the component is ahead of or behind schedule. Comparing earned value with actual cost shows whether it is over or under budget for the work done."),
    blk('s1p3', "EVM depends on a baseline: a scope broken into measurable pieces, each with a planned cost and a planned date. That is why it fits predictive components and why the book's finding that no pillar has a formal work-breakdown structure (Lesson 6) matters. Without a baseline there is nothing to earn value against."),
    callout('s1c1', "Planned value is what you said you would have done. Earned value is what you have actually done, valued at plan. Actual cost is what it really cost. Every EVM indicator is a comparison of two of these three numbers."),

    h2('s2h1', 'Four Basic Indicators'),
    blk('s2p1', "Schedule variance is earned value minus planned value: negative means less work is done than planned. Cost variance is earned value minus actual cost: negative means the work done cost more than planned. The two performance indices express the same comparisons as ratios. The schedule performance index (SPI) is earned value divided by planned value, and the cost performance index (CPI) is earned value divided by actual cost. A value of 1.0 means on plan; below 1.0 means behind schedule or over cost."),
    blk('s2p2', "Ratios are useful at portfolio level because they let components of very different sizes be compared on one scale. A component with an SPI of 0.8 is delivering eighty percent of its planned work rate, whether its budget is two hundred thousand dollars or twenty million."),
    blk('s2p3', "The indices also support forecasting. If a component's cost performance has been stable, dividing its total budget by its CPI gives a rough estimate at completion. Forecasts like this are only as good as the stability of past performance, but they are far more informative than a status of 'in progress'."),
    table('s2t1', 'Earned value indicators', [
        {'Indicator': 'Schedule variance (SV)', 'Formula': 'EV − PV', 'Reading': 'Negative: behind schedule'},
        {'Indicator': 'Cost variance (CV)', 'Formula': 'EV − AC', 'Reading': 'Negative: over cost for work done'},
        {'Indicator': 'Schedule performance index (SPI)', 'Formula': 'EV ÷ PV', 'Reading': 'Below 1.0: behind schedule'},
        {'Indicator': 'Cost performance index (CPI)', 'Formula': 'EV ÷ AC', 'Reading': 'Below 1.0: over cost'},
        {'Indicator': 'Estimate at completion (simple)', 'Formula': 'Total budget ÷ CPI', 'Reading': 'Forecast final cost if performance holds'},
    ]),

    h2('s3h1', 'An Illustrative Calculation'),
    blk('s3p1', "Consider a hypothetical analytics deployment with a total budget of $2.0 million. These figures are invented to show the arithmetic; they are not Vermont's. Six months in, the plan said $1.0 million of work would be complete, so planned value is $1.0 million. Measured against the work breakdown, the work actually finished was budgeted at $0.8 million, so earned value is $0.8 million. Actual spending to date is $1.0 million."),
    blk('s3p2', "Schedule variance is $0.8 million minus $1.0 million, or minus $0.2 million, and the SPI is 0.8: the component has delivered eighty percent of the work it planned to deliver by now. Cost variance is $0.8 million minus $1.0 million, also minus $0.2 million, and the CPI is 0.8: each dollar spent has bought eighty cents of planned work. If that cost performance holds, the simple estimate at completion is $2.0 million divided by 0.8, or $2.5 million."),
    blk('s3p3', "A monthly activity report for the same component might read 'vendor onboarded, data feeds in testing, on track for go-live'. Both can be true at once. The earned-value view shows what the activity view hides: the component is behind and over cost, and the gap will grow unless something changes."),
    table('s3t1', 'Hypothetical example (illustration only, not Vermont data)', [
        {'Measure': 'Total budget', 'Value': '$2.0M'},
        {'Measure': 'Planned value at month 6 (PV)', 'Value': '$1.0M'},
        {'Measure': 'Earned value at month 6 (EV)', 'Value': '$0.8M'},
        {'Measure': 'Actual cost at month 6 (AC)', 'Value': '$1.0M'},
        {'Measure': 'SPI = EV ÷ PV', 'Value': '0.80'},
        {'Measure': 'CPI = EV ÷ AC', 'Value': '0.80'},
        {'Measure': 'Estimate at completion = budget ÷ CPI', 'Value': '$2.5M'},
    ]),

    h2('s4h1', 'Federal Standards and Expectations'),
    blk('s4p1', "Earned value is not an exotic private-sector technique; it is embedded in federal practice. The Government Accountability Office's Cost Estimating and Assessment Guide (GAO-20-195G), issued in March 2020 as the first update to its 2009 guide, sets out best practices for managing program cost through earned value management, including how an EVM system is set up, executed and validated. Federal agencies implement EVM systems against the industry guidelines in the EIA-748 standard."),
    blk('s4p2', "This matters for a state transformation funded partly by federal programs. Federal partners and auditors are used to performance measured this way, and a portfolio office that can report schedule and cost performance indices for its major components speaks their language. Chapter 15's second objection makes the related point that a time-bounded, outcome-specified, heavily financed portfolio with legally binding deadlines is exactly the kind of work that federal partners expect to be professionally managed."),
    blk('s4p3', "A state need not adopt a full certified EVM system to benefit. Applying the core quantities to the handful of large predictive components, with a simple monthly calculation, captures most of the value at little cost."),
    highlight('s4hl1', "Start small: the three or four largest predictive components, a baseline for each, and a monthly SPI and CPI. That alone turns an activity report into a performance report."),

    h2('s5h1', 'What Earned Value Cannot See'),
    blk('s5p1', "Earned value measures adherence to plan. It cannot tell whether the plan respects the portfolio's dependencies. A component can report an SPI of 1.0, perfectly on schedule, while it is running ahead of its upstream gate and producing output nobody can yet use. In the terms of Lesson 7, earned value would score such a component as healthy while the sequencing test flags it as a problem."),
    blk('s5p2', "Nor does earned value measure benefits. A component can be delivered on time and on budget and still fail to produce the benefit that justified it, which is why Track 4 adds benefits-realization tracking. And for adaptive components, whose plans are meant to change, a fixed baseline is the wrong yardstick altogether."),
    blk('s5p3', "The portfolio office therefore reads three things together each month: earned value for the predictive components, the sequencing verdicts for every component, and benefits indicators against the goals the portfolio serves. Each catches failures the others miss."),
    compare('s5cmp1', 'What each measure catches',
        'Earned value catches', [
            'Work slipping against its plan',
            'Costs running ahead of work done',
            'Likely final cost if performance holds',
        ],
        'Earned value misses', [
            'Work running ahead of its dependency gate',
            'Delivered work that produces no benefit',
            'Progress on adaptive components without a fixed baseline',
        ]),

    takeaway('tw', [
        "Monthly activity reports describe what was done; earned value measures performance against plan in the budget's own units.",
        "Planned value is work scheduled, earned value is work completed at planned cost, and actual cost is what was really spent.",
        "SPI = EV ÷ PV and CPI = EV ÷ AC; values below 1.0 mean behind schedule or over cost, and budget ÷ CPI gives a simple estimate at completion.",
        "EVM needs a baseline, which is why it fits predictive components and why a missing work-breakdown structure is a real gap.",
        "GAO's Cost Estimating and Assessment Guide (GAO-20-195G, March 2020) sets federal best practice for EVM, implemented against the EIA-748 guidelines.",
        "Earned value cannot see dependency violations, unrealized benefits or progress on adaptive work.",
        "Read earned value, sequencing verdicts and benefits indicators together each month; each catches failures the others miss.",
    ]),
    quiz('qz',
        "A component reports SPI = 1.0 and CPI = 1.0, but the Portfolio Sequencing Test marks it 'running ahead of its gate'. What is the right interpretation?",
        [
            ("The component is healthy; earned value overrides the sequencing test", False),
            ("The component is on plan, but the plan itself ignores a dependency: it may be producing output nobody can yet use", True),
            ("The earned value calculation must be wrong", False),
            ("The sequencing test only applies to adaptive components", False),
        ],
        "Earned value measures adherence to the component's own plan, not whether that plan respects the portfolio's dependencies. A perfectly on-plan component can still be implementing ahead of a closed upstream gate. That is why the portfolio office reads earned value and sequencing verdicts together."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.13 objections 1 and 2 (earned-value tracking; federal expectations), §15.6 (no work-breakdown structure), §15.16 Key Concepts (EVM)"),
    blk('src2', "[2] U.S. Government Accountability Office, Cost Estimating and Assessment Guide, GAO-20-195G (March 2020) — https://www.gao.gov/products/gao-20-195g — earned value management process, execution and validation"),
    blk('src3', "[3] GAO Innovation Lab, Federal and Industry Guidelines for Implementing EVM — https://gaoinnovations.gov/cost-guide/federal-and-industry-guidelines-for-implementing-evm.html — EIA-748 guidelines and agency implementation"),
    blk('src4', "[4] Project Management Institute, PMBOK Guide, 8th edition (November 2025) — https://www.pmi.org/standards/pmbok — performance measurement in project management"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
