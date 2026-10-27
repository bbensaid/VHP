exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_portfolio_common.py').read())

# Track 5 — Making the Case and Making It Stick
# Vermont facts: HTR book Chapter 15 (§15.11-15.15, Figures 15.9-15.11).
# Platform routes checked 2026-10-27: /portfolio-sequencing-test, /transformation-friction-index,
# /investment-tracker, /impact-simulation, /htr-simulator, /research-lab/knowledge-workspace?tab=scorecard
# (registered in lib/taxonomy/tools.ts), /hti-dashboard (Subscriber plan, proxy.ts).
# PMI Pulse 2017 waste figure verified 2026-10-27 (9.7%).

# ════════════════════════════════════════════════════════════════════════════
L13_SLUG = 'tpm-business-case'
L13_TITLE = 'The Business Case for a Portfolio Office'
L13 = [
    blk('intro1', "The objection to building a portfolio office is almost always the same: we cannot afford it. Chapter 15 answers it directly with a cost-benefit table, and then makes a harder point: the table omits the most important number, the cost of failure. This lesson works through the book's business case, explains how to frame the cost of failure honestly, and gives you a structure for making the same case in your own organization."),
    blk('intro2', "A business case for management infrastructure is unusual because its benefits are mostly avoided losses. Nothing new appears when a portfolio office works; things simply stop going wrong. That makes the case easy to dismiss and important to make carefully."),
    blk('intro3', "The aim is a case that a budget office, a board or a legislature can test: costs that are explicit, benefits tied to specific risks, and a clear statement of what is assumed."),

    h2('s1h1', 'What the Portfolio Office Costs'),
    blk('s1p1', "Figure 15.9 of the book costs a staffed portfolio office for Vermont at about $0.85 million to $1.3 million a year, or roughly $4 million to $6.4 million over four to five years. The largest line is the five pillar program managers, shared across agencies and hospitals, at $500,000 to $850,000 a year. The senior Portfolio Manager, with the PfMP credential, is costed at $180,000 to $220,000 a year; two analysts at $120,000 to $160,000; and portfolio-management software at $50,000 to $100,000."),
    blk('s1p2', "Each line is paired with the benefit it buys. The Portfolio Manager provides single accountability for the January 2028 deadline and directly avoids R-10, the risk that the transformation is managed as a collection of projects. The analysts maintain the master schedule, the risk register and the dashboard. The software provides real-time visibility, resource optimization and an audit trail for Act 68. The program managers carry delivery accountability and critical-path management within each pillar."),
    blk('s1p3', "The book's comparison is with the money the office coordinates. At under 1% a year of the $195 million first-year Rural Health Transformation Program award alone, before counting any savings from reference-based pricing, the office is a small fraction of the investment it protects."),
    table('s1t1', 'Business case for portfolio-management investment (Figure 15.9)', [
        {'Investment': 'Portfolio Manager (PfMP, senior)', 'Annual cost': '$180K-$220K', 'Total (4-5 yr)': '~$0.9M-$1.1M', 'Benefit': 'R-10 avoided; single accountability for Jan 2028'},
        {'Investment': 'Two PMO analysts', 'Annual cost': '$120K-$160K', 'Total (4-5 yr)': '~$0.48M-$0.64M', 'Benefit': 'Master schedule; risk register; dashboard'},
        {'Investment': 'Portfolio-management software', 'Annual cost': '$50K-$100K', 'Total (4-5 yr)': '~$0.25M-$0.5M', 'Benefit': 'Visibility; resource optimization; Act 68 audit trail'},
        {'Investment': 'Five pillar program managers (shared)', 'Annual cost': '$500K-$850K', 'Total (4-5 yr)': '~$2.5M-$4.2M', 'Benefit': 'Pillar delivery accountability; critical-path management'},
        {'Investment': 'Total', 'Annual cost': '~$850K-$1.3M', 'Total (4-5 yr)': '~$4M-$6.4M', 'Benefit': 'Under 1% a year of the $195M first-year RHT award'},
    ]),

    h2('s2h1', 'The Cost of Failure'),
    blk('s2p1', "The book's central argument is that the cost-benefit table leaves out the cost of failure. Without adequate portfolio infrastructure, Vermont risks delivering the January 2028 Strategic Plan as a descriptive document rather than a binding commitment, which the book's chapter on political sustainability identifies as the most dangerous failure mode. That outcome is not free. In the book's words, it is a multi-billion-dollar one: the continuation of the deficit trajectory Oliver Wyman projected, the failure of thirteen of fourteen hospitals to reach sustainability, and the loss of the political window that the mandatory architecture has opened."),
    blk('s2p2', "Cross-industry evidence points the same way at smaller scale. PMI's 2017 Pulse of the Profession put the waste from poor project performance at about 9.7% of project spending. That is an average across industries and organizations, not a forecast for any Vermont program, so it should not be multiplied into a precise saving. Its use in a business case is to establish order of magnitude: typical waste from poor delivery is several times larger, as a share of spending, than the cost of the office proposed here."),
    blk('s2p3', "There is also federal money at stake. The book notes in answering the third objection that Rural Health Transformation Program funds are contingent on demonstrated progress, so a portfolio that misses its components risks clawback. The office's cost, it argues, is less than 2% of a single year of the value it protects."),
    warning('s2w1', "Do not overclaim savings", "A business case for management infrastructure is most credible when it is conservative. State costs as ranges, tie benefits to named risks, use cross-industry figures for scale only, and say plainly which benefits are avoided losses rather than new savings."),

    h2('s3h1', 'Framing Avoided Losses'),
    blk('s3p1', "Because most of a portfolio office's value is avoided loss, the strongest framing ties each cost line to the specific risks it reduces. The risk register from Track 4 supplies this. The Portfolio Manager is costed against R-10 and, through the portfolio office, R-03. The Technology program manager is costed against R-01 and R-06, the two Technology risks that propagate into Economics and Clinical. The Economics program manager is costed against R-08, the risk that safety-net hospitals are penalized because social-risk adjustment arrives too late."),
    blk('s3p2', "Linking costs to risks lets a decision-maker ask the right question. Not whether the office is affordable in the abstract, but whether paying for a given role is worth the reduction in a specific, scored risk. A $200,000 role that materially reduces a risk scored 20 on a portfolio worth hundreds of millions is an easy decision once the link is drawn."),
    blk('s3p3', "The same logic answers the question of timing. A portfolio office hired after the critical gating decisions are made can only report on their consequences. Its value is highest before the gates it protects, which is why the book's roadmap puts the Portfolio Manager in seat by January 2027, nine months before FY2028 hospital budgets take effect."),
    compare('s3cmp1', 'Two ways to present the same office',
        'As overhead', [
            'A cost line in the administrative budget',
            'Compared with other administrative costs',
            'Easy to cut in a tight year',
        ],
        'As risk reduction', [
            'Each role tied to scored risks it reduces',
            'Compared with the value those risks threaten',
            'Cutting it visibly raises named risks',
        ]),

    h2('s4h1', 'Making the Case in a Hospital or Health System'),
    blk('s4p1', "The structure transfers directly to a hospital or health system. Inventory the transformation components and their combined budget. Build the risk register and identify the cross-component risks no single program owns. Cost the portfolio function at the scale your organization needs, which may be one portfolio lead and shared program leads rather than a full office. Then present the cost as a share of the investment it coordinates and tie each role to the risks it reduces."),
    blk('s4p2', "Hospitals have one advantage in making the case: their financial exposure to transformation is direct and visible. Under a global budget, a hospital whose payment and clinical redesign are out of sequence feels the result in its operating margin, often within a year. Linking the portfolio function to protecting that margin is usually more persuasive to a board than any general argument about governance."),
    blk('s4p3', "Whatever the setting, include the cost of doing nothing. A business case that only lists the cost of the office invites the answer 'not this year'. One that also states, with appropriate caution, what the organization stands to lose without it, invites a real decision."),
    steps('s4st1', 'A business case in five parts', [
        ("Scope", "The components coordinated and the total investment at stake."),
        ("Costs", "Each role and tool as a range, annual and over the life of the portfolio."),
        ("Risk links", "Each cost line tied to the scored risks it reduces."),
        ("Cost of failure", "What is at stake without the function, stated conservatively."),
        ("Timing", "Why the function is worth most before the gates it protects."),
    ]),

    h2('s5h1', 'Testing the Case Before You Present It'),
    blk('s5p1', "Before presenting, test the case the way a skeptical budget office would. Are the costs complete, including software, training and the time of people seconded to the office? Are the risks it claims to reduce on a real register with real scores? Are cross-industry figures used for scale only? Is the comparison base, the investment coordinated, stated accurately and current?"),
    blk('s5p2', "Then test it against the objections in the next lesson. The most common, that existing governance already covers this, is best answered inside the business case itself, by showing what the governance body cannot do without a portfolio office to supply it with data."),
    blk('s5p3', "A case that survives these tests is short. It fits on one page: the investment coordinated, the cost of the office as a share of it, the three or four top risks it reduces, and the date by which it must exist to be useful."),
    highlight('s5hl1', "The one-page version: the portfolio office costs under 1% a year of what it coordinates, directly reduces the portfolio's highest-scored risks, and is worth most if it exists before the gates it protects."),

    takeaway('tw', [
        "Chapter 15 costs a staffed Vermont portfolio office at about $0.85M to $1.3M a year, or $4M to $6.4M over four to five years.",
        "That is under 1% a year of the $195M first-year Rural Health Transformation Program award it coordinates, before counting pricing savings.",
        "The table omits the cost of failure, which the book describes as multi-billion-dollar: a non-binding plan, a continuing deficit trajectory and lost political momentum.",
        "Cross-industry waste of about 9.7% of project spending (PMI, 2017) establishes scale but should not be turned into a precise forecast.",
        "The strongest framing ties each cost line to the scored risks it reduces, turning overhead into risk reduction.",
        "The office is worth most before the gates it protects, which is why the roadmap puts a Portfolio Manager in seat by January 2027.",
        "Hospitals can use the same five-part structure, linking the portfolio function to protecting their operating margin under a global budget.",
    ]),
    quiz('qz',
        "Which framing of the portfolio office's cost does this lesson recommend?",
        [
            ("As an administrative overhead line compared with other administrative costs", False),
            ("As risk reduction: each role tied to the scored risks it reduces, compared with the value those risks threaten", True),
            ("As a guaranteed saving of 9.7% of the transformation budget", False),
            ("As a cost that should be deferred until the transformation is complete", False),
        ],
        "Presented as overhead, the office is easy to cut. Tied to specific, scored risks and compared with the value those risks threaten, its cost becomes a visible trade-off. Cross-industry waste figures establish scale but are not a forecast, and deferring the office removes most of its value because it matters most before the gates it protects."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.11 and Figure 15.9 (business case and cost of failure), §15.12 (roadmap timing), §15.13 objection 3"),
    blk('src2', "[2] Project Management Institute, Pulse of the Profession 2017 (survey report) — https://sitsd.mt.gov/_docs/ITMC/SMPMAW/2017.08.23/PMIs-Pulse-of-the-Profession-2017-Survey.pdf — about 9.7% of project spending wasted through poor performance"),
    blk('src3', "[3] Health Transformation Review, Transforming Healthcare, Chapter 14 — https://healthtransformationreview.org/read/chapter-14 — political sustainability and the descriptive-plan failure mode"),
    blk('src4', "[4] Centers for Medicare & Medicaid Services, Rural Health Transformation Program — https://www.cms.gov/priorities/rural-health-transformation-rht-program/overview — the federal program whose award the office coordinates"),
]

# ════════════════════════════════════════════════════════════════════════════
L14_SLUG = 'tpm-objections-and-oversight'
L14_TITLE = 'Answering the Objections, and the Question Oversight Should Ask'
L14 = [
    blk('intro1', "Proposals for a portfolio office meet the same objections in almost every public organization. Chapter 15 anticipates five and answers each. This lesson works through them, then turns to the implementation roadmap the book schedules backward from the January 2028 deadline, and ends with the single question the book recommends to legislators and board members who oversee a transformation."),
    blk('intro2', "Knowing the objections in advance matters because each contains a partial truth. A good answer acknowledges what is right in the objection before explaining why the conclusion does not follow."),
    blk('intro3', "The objections are written for Vermont, but each has an equivalent in a hospital boardroom or another state's agency, and the answers transfer with them."),

    h2('s1h1', "Objections One and Two: 'We Already Manage This' and 'This Is Government'"),
    blk('s1p1', "The first objection is that existing arrangements already cover the work: the Health Care Advisory Committee and monthly reports. The partial truth is that these provide real oversight. The book's answer is that the HCAC is a governance body, not a portfolio office. It provides oversight, not an integrated master schedule, resource-conflict resolution, a maintained risk register or earned-value tracking, and the monthly reports track activities rather than performance. The HCAC is the right governance body; it needs a portfolio office to give it the data to govern."),
    blk('s1p2', "The second objection is that government does not run projects like the private sector. The partial truth is that public programs have different accountabilities. The book's answer is that Vermont's transformation is a time-bounded, outcome-specified, heavily financed portfolio of interdependent programs with legally binding deadlines. The Rural Health Transformation Program is a federal grant with deliverables and reporting obligations; the withdrawn AHEAD agreement still carries federal closeout requirements; Act 68 has a statutory deliverable in January 2028. Federal partners expect professional management of exactly this kind of work."),
    blk('s1p3', "Both answers share a pattern: they accept the premise and show that it does not reach the conclusion. Yes, there is oversight; no, oversight is not management. Yes, this is government; that is precisely why its obligations demand professional delivery."),
    callout('s1c1', "Oversight asks whether the work is going well. Management makes it go well. A portfolio needs both, and one cannot substitute for the other."),

    h2('s2h1', 'Objections Three, Four and Five: Cost, Hospitals and Consultants'),
    blk('s2p1', "The third objection is cost in a year of budget cuts. Lesson 13 gave the full answer: Rural Health Transformation Program funds depend on demonstrated progress, the office costs a small fraction of the value it protects, and the alternative is a partial transformation that costs far more. The fourth is that hospitals will not accept being managed by AHS. The book's answer clarifies the role: the Portfolio Manager does not manage hospitals but manages AHS's contribution to the portfolio. Hospital plans are produced by hospitals, approved by AHS and monitored through the Green Mountain Care Board."),
    blk('s2p2', "The fifth objection is the newest: AHS already has expert help. Its March 2026 Act 68 report lists contracted support from Manatt, Phelps & Phillips, a new hospital technical-assistance vendor and analytics support under negotiation. The book's answer is that a contractor delivers a defined scope. It cannot hold a state component back until its upstream gate opens, reassign agency staff between components, or answer to the Legislature for the portfolio as a whole. Contracted support adds capacity, not authority, and every new contract is another component that someone has to sequence."),
    blk('s2p3', "Taken together, the five answers define the role by contrast. It is not oversight, not a private-sector import, not an unaffordable luxury, not control over hospitals and not something a contractor can supply. It is the integrating authority that none of the existing arrangements provides."),
    table('s2t1', 'The five objections and the short answer to each (Chapter 15, §15.13)', [
        {'Objection': 'We already manage this (HCAC, monthly reports)', 'Short answer': 'The HCAC is a governance body; it needs a portfolio office to supply schedule, risk, resource and earned-value data'},
        {'Objection': "Government doesn't run projects like the private sector", 'Short answer': 'A time-bounded, financed portfolio with binding deadlines and federal obligations needs professional delivery'},
        {'Objection': "We can't afford it", 'Short answer': 'RHT funds depend on progress; the office is a small fraction of the value it protects'},
        {'Objection': "Hospitals won't accept being managed by AHS", 'Short answer': "The Portfolio Manager manages AHS's contribution, not the hospitals"},
        {'Objection': 'We already have consultants', 'Short answer': 'Contractors add capacity, not authority, and each contract is another component to sequence'},
    ]),

    h2('s3h1', 'The Implementation Roadmap'),
    blk('s3p1', "The book anchors its roadmap to the one date that cannot move: the Statewide Strategic Plan, due January 15, 2028. Figure 15.10 schedules the portfolio office's build-out backward from that deadline and against the components it exists to sequence. A Portfolio Manager hired by January 2027 has nine months before FY2028 hospital budgets take effect in October 2027, which the book judges enough only if the office is running before the Technology gate it is meant to protect."),
    blk('s3p2', "From mid-2027 the office runs on a fixed cadence: monthly governance reviews, quarterly performance reviews against the Vermont Scorecard, and annual portfolio rebalancing. The book's aim is that the January 2028 plan arrives with portfolio-management evidence, benefits tracked, risks managed and resources deployed in dependency order, after which the office carries the portfolio into the plan's three-year update cycle."),
    blk('s3p3', "Scheduling backward from a fixed deadline is itself a portfolio technique. It exposes how little time remains for each step and makes the cost of delay concrete: every month the portfolio office is late is a month of gating decisions made without it."),
    steps('s3st1', 'The roadmap, scheduled backward (Chapter 15, §15.12)', [
        ("By January 2027", "Portfolio Manager in seat."),
        ("By Q2 2027", "Portfolio office operational: analysts, software, standard reporting, pillar program managers."),
        ("October 2027", "FY2028 hospital budgets take effect; the office must already be running."),
        ("From mid-2027", "Monthly governance reviews, quarterly Scorecard reviews, annual rebalancing."),
        ("January 15, 2028", "Strategic Plan delivered with portfolio-management evidence; three-year update cycle follows."),
    ]),

    h2('s4h1', 'The Question Oversight Should Ask'),
    blk('s4p1', "Chapter 15's advice to legislators and board members is a single question that separates a real portfolio from a reporting exercise: which component is currently the binding constraint on all the others, who owns it, and what would it take to accelerate it? An organization managing a genuine portfolio can answer in one sentence. An organization managing a list will answer with a status summary of all nineteen components."),
    blk('s4p2', "The question works because it can only be answered by someone who sees the dependencies. Identifying the binding constraint requires knowing which upstream work is holding back the most downstream value. Naming its owner requires that ownership be assigned. Saying what would accelerate it requires having thought about resources across components. A reporting function cannot answer it; a portfolio function answers it routinely."),
    blk('s4p3', "Oversight bodies can ask the question at every review and track whether the answer changes. If the binding constraint never moves, either the portfolio is not acting on it or the answer is not being given honestly. Both are findings an oversight body should want to know."),
    quote('s4q1', "Which component is currently the binding constraint on all the others, who owns it, and what would it take to accelerate it? (Transforming Healthcare, Chapter 15)"),

    h2('s5h1', 'Preparing for the Objections in Your Own Setting'),
    blk('s5p1', "Before proposing a portfolio function, write down the objections you expect, in the words your organization will use. In a hospital they may be that the executive team already coordinates, that service-line leaders own their own changes, or that the transformation office would duplicate finance and quality. Each usually maps to one of the book's five."),
    blk('s5p2', "For each, prepare the partial truth and the answer, with evidence from your own inventory, sequencing results, risk register and benefits trace. Objections are answered most convincingly not by argument about governance but by showing a specific dependency nobody owns, a specific risk nobody manages, or a specific component running ahead of its gate."),
    blk('s5p3', "Finally, prepare your own answer to the oversight question. If you cannot yet say which component is your portfolio's binding constraint, who owns it and what would accelerate it, that inability is the strongest argument for the function you are proposing."),
    highlight('s5hl1', "The most persuasive answer to any objection is a concrete example from your own portfolio: an unowned dependency, an unmanaged cross-pillar risk, or a component running ahead of its gate."),

    takeaway('tw', [
        "Chapter 15 answers five objections: existing governance, government is different, cost, hospital acceptance and existing consultants.",
        "The HCAC is a governance body; oversight is not management, and it needs a portfolio office to supply the data it governs with.",
        "The Portfolio Manager manages AHS's contribution to the portfolio, not the hospitals, whose plans are approved by AHS and monitored through the GMCB.",
        "Contractors add capacity, not authority; they cannot hold components back, reassign staff or answer for the whole portfolio.",
        "The roadmap is scheduled backward from January 15, 2028: Portfolio Manager by January 2027, office operational by Q2 2027, before FY2028 budgets in October 2027.",
        "From mid-2027 the office runs monthly governance, quarterly Scorecard reviews and annual rebalancing.",
        "The oversight question is which component is the binding constraint, who owns it and what would accelerate it; a real portfolio answers in one sentence.",
    ]),
    quiz('qz',
        "A legislator asks a transformation agency which component is the binding constraint on the portfolio. The agency replies with a status summary of all nineteen components. What does Chapter 15 suggest this reveals?",
        [
            ("That the agency is being transparent and thorough", False),
            ("That the agency is probably managing a list rather than a portfolio, since a real portfolio can name the constraint, its owner and what would accelerate it in one sentence", True),
            ("That the portfolio has no binding constraint", False),
            ("That the legislator asked the wrong question", False),
        ],
        "The book offers this question precisely because only a portfolio function can answer it briefly: it requires knowing the dependencies, having assigned ownership and having considered resources across components. A status summary of every component is the characteristic answer of an organization managing a list."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.12 (implementation roadmap, Figure 15.10), §15.13 (the five objections), §15.15 (Implications for legislators and board members)"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report (March 2026), as cited in Chapter 15 — https://humanservices.vermont.gov — contracted transformation support"),
    blk('src3', "[3] Vermont Act 68 of 2025, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — the January 2028 Strategic Plan obligation"),
    blk('src4', "[4] Project Management Institute, The Standard for Portfolio Management, 4th edition (2017) — https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — governance body and portfolio office roles"),
]

# ════════════════════════════════════════════════════════════════════════════
L15_SLUG = 'tpm-capstone'
L15_TITLE = 'Capstone: Build and Run Your Own Transformation Portfolio'
L15 = [
    blk('intro1', "This capstone brings the course together into one exercise. You will define a transformation portfolio, sequence it by dependency, find its binding constraint, check its capital against its gates, model what a slip would do, build its risk register and benefits trace, and finish with a one-page portfolio brief that answers the oversight question from Lesson 14."),
    blk('intro2', "Use a real organization if you can: your hospital, your agency, your state or a program you know well. If you cannot, use Vermont's portfolio as Chapter 15 records it; the platform's tools load it as a preset. Allow three to four hours, in one or two sittings."),
    blk('intro3', "Every step uses a platform tool, and each tool corresponds to a row of Chapter 15's Work This Chapter on the Platform table. By the end you will have done, at small scale, the core work of a portfolio office."),

    h2('s1h1', 'Step 1: Define and Sequence the Portfolio'),
    blk('s1p1', "Begin with the inventory method from Lesson 3. List every component with a named owner and a dated obligation, assign each to one pillar, and record its type, priority, lead and next stage gate. Then open the Portfolio Sequencing Test at /portfolio-sequencing-test, replace the Vermont preset with your components, and set each component's status and whether its implementation needs the pillar's upstream gate."),
    blk('s1p2', "Score the five pillars' current readiness and read the verdicts. Note which components are correctly waiting, which are late by dependency order, which are running ahead of a closed gate, and which unfinished components the test identifies as the places where schedule pressure belongs. Compare that list with where your organization's attention actually is today."),
    blk('s1p3', "If you are using Vermont's portfolio with the Fall 2026 scores, you should find twelve components on track, the RHT Program deployment running ahead of its gate, three components late by dependency order, and the four Technology components as the pressure points. If your results differ, check the gate settings before the scores."),
    steps('s1st1', 'Define and sequence', [
        ("Inventory", "Every component with an owner and a date; pillar, type, priority, lead, next gate."),
        ("Load the tool", "Enter your components in /portfolio-sequencing-test."),
        ("Mark gating", "Decide which components' implementation needs the upstream gate."),
        ("Score readiness", "Set the five pillars, or adjust the Vermont preset."),
        ("Record verdicts", "Correctly waiting, late by dependency, ahead of gate, and pressure points."),
    ]),

    h2('s2h1', 'Step 2: Find the Binding Constraint and Check the Capital'),
    blk('s2p1', "Open the Transformation Friction Index at /transformation-friction-index and score your organization or state on each pillar. Chapter 15 notes that the tool finds the binding constraint by sensitivity rather than by the highest bar: the pillar whose improvement would lift delivered readiness most is where the portfolio manager's attention belongs. Then list your three most urgent initiatives by deadline. If none sits in the binding-constraint pillar, your portfolio is being scheduled by calendar rather than by dependency."),
    blk('s2p2', "Next, open the Investment Tracker at /investment-tracker and use the portfolio check to enter your components' committed capital by pillar. The tool checks each against its pillar's limiting gate and flags components funded ahead of their upstream gate. The book calls money moving faster than dependency order the early signal of premature investment."),
    blk('s2p3', "Record three facts from this step: the binding-constraint pillar, whether your most urgent initiatives sit in it, and which components are funded ahead of their gate. These become the centre of your portfolio brief."),
    callout('s2c1', "The binding constraint is found by sensitivity, not by the weakest score. Ask which pillar's improvement would lift delivered readiness most; that is where the next dollar and the next hour belong."),

    h2('s3h1', 'Step 3: Model a Slip and Score the Portfolio'),
    blk('s3p1', "Open the HTR Simulator at /htr-simulator, enter your pillar scores, and lower the binding-constraint pillar by fifteen points. Watch the downstream pillars fall with it. Then use the Impact Simulation at /impact-simulation to model what a single component slipping does to the rest of the portfolio and identify the components with no slack, the ones whose slip moves other pillars' outcomes."),
    blk('s3p2', "Then score the portfolio the way an outside reviewer would, using the Transformation Scorecard at /research-lab/knowledge-workspace?tab=scorecard. Chapter 15 makes a pointed observation about this step: divergence between what the portfolio office reports and what the scorecard shows is itself a governance finding. If your own status reports describe the portfolio as healthier than the scorecard does, note where and why."),
    blk('s3p3', "If you have a Subscriber plan, the HTI Dashboard at /hti-dashboard shows Vermont's five-pillar status moving over time rather than at a single date, which is the trend a monthly report cannot show. Use it to compare your portfolio's direction of travel with Vermont's."),
    steps('s3st1', 'Model and score', [
        ("Drop the constraint", "In /htr-simulator, lower the binding-constraint pillar by 15 points and watch the cascade."),
        ("Find no-slack components", "In /impact-simulation, model a single component's slip."),
        ("Score as an outsider", "Use the Transformation Scorecard and compare it with your own reporting."),
        ("Check the trend", "With a Subscriber plan, compare against Vermont's movement on /hti-dashboard."),
    ]),

    h2('s4h1', 'Step 4: Register the Risks and Trace the Benefits'),
    blk('s4p1', "Build a risk register using Lesson 10's format. Start with the pressure points and the no-slack components from the first three steps: each is a risk to everything that depends on it. Add structural risks to the mandate, funding, capacity and engagement. Score each on a fixed probability and impact scale, choose a response, and name an owner. Then read the register as Lesson 11 does: plot it, group risks by shared cause, and check which can be reduced by work that is unblocked today."),
    blk('s4p2', "Build the benefits trace from Lesson 12. List the goals your transformation serves, map every component to at least one, and choose a lagging measure with a target and a date, plus a leading measure, for each goal. Flag components that serve no goal and goals that no component serves."),
    blk('s4p3', "Together, the register and the trace complete the picture: what the portfolio contains, in what order it must run, what threatens it, and what it is for. That is the information a governance body needs and rarely receives."),
    warning('s4w1', "Keep the register honest", "It is tempting to leave the most uncomfortable risks off a register you will show to others, especially risks about leadership, capacity or political will. Chapter 15's own register puts the absence of the portfolio function at the top. An honest register is the only useful one."),

    h2('s5h1', 'Step 5: Write the One-Page Portfolio Brief'),
    blk('s5p1', "Finish with a one-page brief for your governance body. Open with the answer to the oversight question: which component is the binding constraint, who owns it, and what would it take to accelerate it. Follow with the sequencing findings, components running ahead of their gate and components late by dependency, and the capital funded ahead of its gate."),
    blk('s5p2', "Then give the two or three risks that need a decision now, each with options and the cost of not deciding, and a benefits summary showing whether each goal is on course. Close with the management infrastructure the portfolio needs, costed as a share of what it coordinates and tied to the risks it reduces, as in Lesson 13."),
    blk('s5p3', "If you can write that page with confidence, you have done what Chapter 15 argues Vermont, and most organizations running a transformation, have not yet done: managed the transformation as a portfolio. Revisit the brief quarterly. The binding constraint will move, and the brief is how you will know."),
    table('s5t1', 'The one-page portfolio brief', [
        {'Section': 'Oversight answer', 'Content': 'Binding constraint, its owner, and what would accelerate it'},
        {'Section': 'Sequencing', 'Content': 'Components ahead of their gate; components late by dependency; capital ahead of its gate'},
        {'Section': 'Decisions needed', 'Content': 'Two or three risks, each with options and the cost of not deciding'},
        {'Section': 'Benefits', 'Content': 'Each goal: on course or not, with leading and lagging measures'},
        {'Section': 'Infrastructure', 'Content': 'Management capacity needed, costed and tied to the risks it reduces'},
    ]),

    takeaway('tw', [
        "The capstone runs the core work of a portfolio office end to end on a real or Vermont portfolio.",
        "The Portfolio Sequencing Test turns the inventory into verdicts and identifies where schedule pressure belongs.",
        "The Friction Index finds the binding constraint by sensitivity, and the Investment Tracker's portfolio check flags capital funded ahead of its gate.",
        "The HTR Simulator and Impact Simulation show how a slip propagates and which components have no slack.",
        "Divergence between internal status reporting and the Transformation Scorecard is itself a governance finding.",
        "The risk register and benefits trace complete the picture of what the portfolio contains, threatens and is for.",
        "The one-page brief opens with the oversight answer: the binding constraint, its owner and what would accelerate it.",
    ]),
    quiz('qz',
        "In Step 2 you find that none of your three most urgent initiatives by deadline sits in the binding-constraint pillar the Friction Index identifies. What does Chapter 15 say this indicates?",
        [
            ("That the Friction Index is miscalibrated for your organization", False),
            ("That the portfolio is being scheduled by calendar rather than by dependency, the failure the chapter is written to prevent", True),
            ("That the binding constraint does not need attention until its deadline", False),
            ("That the portfolio has no dependencies", False),
        ],
        "Chapter 15's Try This exercise makes exactly this comparison. If urgency is driven by deadlines that all fall outside the binding-constraint pillar, attention and resources are going where the calendar points rather than where the dependency logic says delivered readiness is being held back."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.14 Work This Chapter on the Platform (Figure 15.11) and the Try This exercise; §15.15 Implications for You"),
    blk('src2', "[2] HTR Portfolio Sequencing Test — https://healthtransformationreview.org/portfolio-sequencing-test — verdicts and pressure points"),
    blk('src3', "[3] Transformation Friction Index — https://healthtransformationreview.org/transformation-friction-index — binding constraint by sensitivity"),
    blk('src4', "[4] HTR Investment Tracker — https://healthtransformationreview.org/investment-tracker — portfolio check of capital against gates"),
    blk('src5', "[5] HTR Simulator and Impact Simulation — https://healthtransformationreview.org/htr-simulator and https://healthtransformationreview.org/impact-simulation — cascade and slip modelling"),
    blk('src6', "[6] HTR Transformation Scorecard — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=scorecard — outside-reviewer scoring of five-pillar status"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
