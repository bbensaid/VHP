exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_portfolio_common.py').read())

# Track 1 — Foundations: Why Transformation Is a Portfolio
# Vermont facts: HTR book Chapter 15 (§15.1-15.3, Figures 15.1-15.3). PMI facts verified 2026-10-27
# against pmi.org (standards pages, certification pages) and the search record in the session log.
# HealthCare.gov facts: GAO-14-694 (July 30, 2014) summary; HHS OIG OEI-06-14-00350 (Feb 2016) summary.

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'tpm-project-management-gap'
L1_TITLE = 'The Project-Management Gap in Healthcare Transformation'
L1 = [
    blk('intro1', "Healthcare transformation is usually discussed as a problem of policy design: the right payment model, the right mandate, the right technology. Chapter 15 of Transforming Healthcare makes a different argument. Once the design is settled, transformation becomes a problem of delivery, and delivery at this scale is a discipline with its own standards, roles and tools. Most transformation efforts never adopt that discipline, and the gap shows up as missed deadlines, stranded investments and reforms that exist on paper but not in practice."),
    blk('intro2', "This opening lesson makes the case that the gap is real and costly. It shows how every concept in the five-pillar framework maps onto a project-management discipline, what the evidence says about the cost of poor delivery, what a well-documented federal health program failure looked like from the inside, and how the same gap appears in Vermont's transformation today."),
    blk('intro3', "The rest of the course then builds the discipline step by step: defining the portfolio, staffing and governing it, scheduling it by dependency, managing its risks, tracing its benefits, and making the case for paying for it."),

    h2('s1h1', 'Every Framework Concept Is a Management Discipline'),
    blk('s1p1', "Chapter 15 opens with an observation that reframes the whole book. Every concept introduced in the earlier chapters maps to an established project-management discipline, whether or not it was presented in those terms. Defining the five pillars is scope management: deciding what is in and out of each body of work. The execution sequence is schedule management with dependency logic. The failure cascade, in which a weak upstream pillar degrades everything downstream, is risk management. The implementation matrix is cost and resource management. The Vermont Scorecard is benefits-realization management."),
    blk('s1p2', "Put those together and the five-pillar framework is, in its entirety, a portfolio-management architecture. The book's diagnosis of Vermont follows directly: the state has the analytical architecture but is not managing its transformation as a portfolio. The analysis exists; the operating machinery to act on it does not."),
    blk('s1p3', "This matters because analysis and delivery fail differently. A flawed analysis can be corrected by better analysis. A delivery gap cannot: no amount of additional insight will coordinate nineteen components owned by different agencies against a single statutory deadline. That takes people with the authority and the tools to do it."),
    callout('s1c1', "The five-pillar framework tells you what has to be built and in what order. Portfolio management is the discipline that makes sure it actually gets built in that order, by people accountable for the result."),
    table('s1t1', 'Framework concepts and the disciplines that manage them', [
        {'Framework concept': 'Pillar definition', 'Management discipline': 'Scope management'},
        {'Framework concept': 'Execution sequence', 'Management discipline': 'Schedule management with dependency logic'},
        {'Framework concept': 'Failure cascade', 'Management discipline': 'Risk management'},
        {'Framework concept': 'Implementation matrix', 'Management discipline': 'Cost and resource management'},
        {'Framework concept': 'Vermont Scorecard', 'Management discipline': 'Benefits-realization management'},
    ]),

    h2('s2h1', 'What Poor Delivery Costs'),
    blk('s2p1', "The Project Management Institute (PMI) surveys organizations every year on how their projects perform, in a report called Pulse of the Profession. Its 2017 edition put the cost of poor project performance at about 9.7% of project spending: roughly $97 million wasted for every $1 billion invested. The 2018 edition put it at 9.9%. These are cross-industry averages, not healthcare-specific figures, but they set the order of magnitude: a meaningful share of every transformation budget is at risk from how the work is managed, not from what the work is."),
    blk('s2p2', "The same research program has consistently found large differences between organizations that manage delivery well and those that do not. PMI's 2014 report, The High Cost of Low Performance, found that high-performing organizations completed 89% of their projects successfully against 36% for low performers, and that projects aligned to organizational strategy succeeded more often than misaligned ones. Alignment to strategy is precisely what portfolio management exists to provide."),
    blk('s2p3', "Treat these figures with appropriate care. They are self-reported survey results, the definitions of success have shifted between editions, and none of them is a forecast for any particular program. Their value is directional: across thousands of organizations, the way work is governed shows up in whether it delivers."),
    stat_grid('s2sg1', [
        ('9.7%', 'Project spending wasted through poor performance', 'PMI, Pulse of the Profession 2017 ($97M per $1B invested)'),
        ('9.9%', 'The same measure a year later', 'PMI, Pulse of the Profession 2018'),
        ('89% vs 36%', 'Projects completed successfully, high vs low performers', 'PMI, Pulse of the Profession 2014: The High Cost of Low Performance'),
        ('1 in 3', 'Organizations reporting high benefits-realization maturity', 'PMI, Pulse of the Profession 2018, as cited by PMI'),
    ]),

    h2('s3h1', 'A Health Case From the Inside: HealthCare.gov'),
    blk('s3p1', "The most thoroughly documented delivery failure in recent American health policy is the October 2013 launch of HealthCare.gov, the federal insurance marketplace created under the Affordable Care Act. Two federal reviews examined what went wrong, and both describe management failures rather than a flawed policy idea."),
    blk('s3p2', "The Government Accountability Office's July 2014 report, GAO-14-694, found that the Centers for Medicare & Medicaid Services (CMS) began building the marketplace systems without effective planning or oversight. Task orders were issued while key requirements were still unknown, including how many states would use the federal marketplace and how many people might enroll. Unclear guidance left confusion over who had authority to approve contractor requests to spend funds. Key governance reviews were delayed, and the site launched without verification that it met its performance requirements. The HHS Office of Inspector General's 2016 case study, based on interviews with 86 officials, staff and contractors, reached a similar picture and also recorded the recovery: CMS restored the site for high consumer use within two months and adopted more effective organizational practices."),
    blk('s3p3', "Every element of that list is a portfolio-management failure. Requirements were not defined before work began. Authority was not assigned. Governance checkpoints were skipped. Nobody verified that the component everything else depended on was ready before the date arrived. The recovery, equally, came from putting integrated management in place, not from changing the policy."),
    example('s3ex1', 'HealthCare.gov, 2013-2014', "GAO-14-694 found that CMS issued task orders before key technical requirements were known, that unclear guidance caused confusion over who could approve contractor spending, that key governance reviews were delayed, and that the site launched without verification that it met performance requirements.\nThe HHS Inspector General's case study (OEI-06-14-00350) found that CMS recovered the website for high consumer use within two months and adopted more effective organizational practices, and called on the agency to keep applying those lessons."),
    warning('s3w1', "The lesson is not 'technology projects fail'", "HealthCare.gov is often filed as an IT failure. The federal reviews describe something more general: a program with a fixed public deadline, many contractors and no single point of integrated accountability. That description fits most state health-transformation efforts, whatever their technology content."),

    h2('s4h1', "Vermont's Version of the Gap"),
    blk('s4p1', "Chapter 15 applies the same lens to Vermont. The Agency of Human Services (AHS) is managing the state's transformation as a collection of projects without the program or portfolio infrastructure to coordinate them, so work is sequenced by who is available rather than by what the portfolio needs. The book is explicit that this is not a criticism of AHS staff, who are executing an extraordinary mandate with insufficient capacity. It is a structural observation: the capacity does not yet exist."),
    blk('s4p2', "The need was identified early. Oliver Wyman's Act 167 report recommended in 2024 that AHS establish a dedicated project-management function, and the November 2025 transformation report repeated the finding. Chapter 15's contribution is to define that function precisely, using PMI's standards, and to schedule it against the January 15, 2028 deadline for the Statewide Health Care Delivery Strategic Plan."),
    blk('s4p3', "The scale is what makes the gap dangerous. Chapter 15 counts 19 components in the transformation portfolio, ten scored risks in its register, and fourteen hospital transformation plans the portfolio must coordinate. No component manager, however capable, can see across all of that from inside one component."),
    stat_grid('s4sg1', [
        ('19', 'Components in Vermont\'s transformation portfolio', 'HTR inventory, Chapter 15, Figure 15.3'),
        ('10', 'Scored risks in the portfolio register', 'Chapter 15, Figure 15.6'),
        ('14', 'Hospital transformation plans to coordinate', 'Act 68 of 2025; Chapter 15, Figure 15.1'),
        ('Jan 15, 2028', 'Statewide Strategic Plan due', 'Act 68 of 2025; Chapter 15, §15.12'),
    ]),

    h2('s5h1', 'What This Course Covers'),
    blk('s5p1', "The course follows the order in which a portfolio function is actually built. Track 1, which you are in now, establishes the levels of management and how to define a portfolio by inventorying its components. Track 2 staffs and governs it: the Portfolio Manager, the five pillar program managers, the governance tiers and the ten knowledge areas a portfolio office has to run."),
    blk('s5p2', "Track 3 schedules the portfolio by dependency rather than by deadline, chooses predictive, adaptive or hybrid management for each component, and measures progress with earned value. Track 4 builds and reads the risk register and traces every component to the benefits that justify it. Track 5 makes the business case, answers the standard objections, and ends with a capstone in which you build and run a portfolio of your own on the platform's tools."),
    blk('s5p3', "Two companion resources sit alongside this course. Five Pillars, One Imperative introduces the portfolio argument in a single Track 8 lesson, and the Transformation Leadership course includes a hands-on workshop on running the sequencing test. This course goes deeper on the management system itself; the workshop is the best place to practise one technique in isolation."),
    highlight('s5hl1', "A useful test to carry through the course comes from the chapter's advice to legislators and boards: which component is currently the binding constraint on all the others, who owns it, and what would it take to accelerate it? An organization managing a real portfolio can answer in one sentence."),

    takeaway('tw', [
        "Every concept in the five-pillar framework maps to a project-management discipline: scope, schedule, risk, cost and resources, and benefits realization.",
        "PMI's Pulse of the Profession put waste from poor project performance at about 9.7% of project spending in 2017 and 9.9% in 2018, across industries.",
        "High-performing organizations complete far more projects successfully than low performers, and strategic alignment, the core job of portfolio management, is part of the difference.",
        "GAO found that HealthCare.gov was built without effective planning or oversight: undefined requirements, unclear authority, delayed governance reviews and no verification before launch.",
        "Vermont's transformation is being managed as a collection of projects; Oliver Wyman recommended a project-management function in 2024 and the November 2025 report repeated it.",
        "Vermont's portfolio has 19 components, ten scored risks and fourteen hospital plans converging on the January 15, 2028 Strategic Plan.",
        "The test of a real portfolio is whether its managers can name the binding constraint, its owner and what would accelerate it in one sentence.",
    ]),
    quiz('qz',
        "According to GAO's review, which of the following was a cause of HealthCare.gov's failed launch?",
        [
            ("The Affordable Care Act's policy design made a federal marketplace impossible to build", False),
            ("Work began before key requirements were known, authority over contractor spending was unclear, and governance reviews were delayed", True),
            ("CMS refused to use contractors and built the system entirely in-house", False),
            ("The site was delayed for two years to complete testing", False),
        ],
        "GAO-14-694 describes management failures: task orders issued while key requirements were unknown, confusion over who could approve contractor spending, delayed governance reviews, and a launch without verification against performance requirements. These are the failures portfolio and program management exist to prevent, which is why the case is a lesson for any large health transformation."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.1-15.3, Figures 15.1-15.3: the framework-to-discipline mapping, Vermont's management gap, Oliver Wyman's recommendation, portfolio scale"),
    blk('src2', "[2] U.S. Government Accountability Office, Healthcare.gov: Ineffective Planning and Oversight Practices Underscore the Need for Improved Contract Management, GAO-14-694 (July 30, 2014) — https://www.gao.gov/products/gao-14-694 — planning, authority, governance-review and verification findings"),
    blk('src3', "[3] HHS Office of Inspector General, HealthCare.gov: Case Study of CMS Management of the Federal Marketplace, OEI-06-14-00350 (February 2016) — https://oig.hhs.gov/reports/all/2016/healthcaregov-case-study-of-cms-management-of-the-federal-marketplace — 86 interviews; recovery within two months"),
    blk('src4', "[4] Project Management Institute, Pulse of the Profession 2017 (survey report) — https://sitsd.mt.gov/_docs/ITMC/SMPMAW/2017.08.23/PMIs-Pulse-of-the-Profession-2017-Survey.pdf — 9.7% of project spending wasted ($97M per $1B); Pulse 2018 media release — https://blog.westerndigital.com/wp-content/uploads/2022/10/pdf-post25167-Pulse-of-the-Profession-2018-Media-Release.pdf — 9.9%"),
    blk('src5', "[5] Project Management Institute, Pulse of the Profession 2014: The High Cost of Low Performance — https://www.pmi.org/learning/library/2022/11/02/21/05/es-2014-the-highcost-13551 — 89% vs 36% project success, high vs low performers; strategic alignment"),
    blk('src6', "[6] Project Management Institute, Benefits Realization Management: A Practice Guide — https://www.pmi.org/standards/benefits-realization — cites Pulse 2018: one in three organizations report high benefits-realization maturity"),
]

# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'tpm-project-program-portfolio'
L2_TITLE = 'Project, Program, Portfolio: Getting the Levels Right'
L2 = [
    blk('intro1', "The single most common error in managing a large transformation is managing it at the wrong level. A collection of interdependent programs gets run as a list of projects, each on time and on budget by its own measures, while the whole fails to produce what it was for. Avoiding that error starts with three words that are used loosely in everyday speech and precisely in professional practice: project, program and portfolio."),
    blk('intro2', "This lesson defines the three levels as PMI's standards define them, introduces the current editions of those standards, applies the hierarchy to Vermont's transformation, and gives you a quick diagnostic for the level at which your own work is being managed."),
    blk('intro3', "None of this is bureaucracy for its own sake. Each level answers a different question and is judged by a different measure of success, and choosing the wrong level means asking the wrong question of the work."),

    h2('s1h1', 'Three Levels, Three Questions'),
    blk('s1p1', "In PMI's hierarchy, a project is a temporary endeavor that creates a unique result, with a defined scope, schedule and budget. A program is a group of related projects managed together to produce benefits that none of them could produce alone. A portfolio is a collection of programs, projects and operations managed as a group to achieve an organization's strategy."),
    blk('s1p2', "Each level asks a different question. A project asks whether the deliverable was produced as specified. A program asks whether the related projects together produced the intended benefit. A portfolio asks whether the organization is doing the right things, in the right order, with its resources, to achieve its strategy. A project can succeed while its program fails, and a program can succeed while the portfolio fails, if the program was the wrong one to run or was run at the wrong time."),
    blk('s1p3', "The levels also differ in what they manage. Projects manage tasks and deliverables. Programs manage the interdependencies between projects and the benefits they produce together. Portfolios manage priorities, resource allocation and strategic alignment across everything, including the decision to start, pause or stop programs."),
    blk('s1p4', "The levels are not ranks of importance. A brilliant project manager and a mediocre portfolio manager can coexist, and the transformation will still suffer, because each level does work the others cannot. What matters is that every level exists, is staffed, and knows which decisions belong to it."),
    analogy('s1an1', "Think of a hospital building program. Pouring the foundation is a project. Building, equipping and staffing the new emergency department is a program: several projects that only deliver value when all are done. Deciding whether the system builds the emergency department this year, or a primary-care network first, and moving capital between them as conditions change, is portfolio management.", "Project, program and portfolio"),
    compare('s1cmp1', 'How success is judged',
        'Project', [
            'Scope, schedule and budget met',
            'Deliverable accepted',
            'Managed by a project manager',
        ],
        'Portfolio', [
            'Strategic objectives achieved',
            'Resources allocated to the right work in the right order',
            'Managed by a portfolio manager with authority across components',
        ]),

    h2('s2h1', 'The Standards Behind the Levels'),
    blk('s2p1', "PMI publishes a separate standard for each level, and each has moved on since the book's sources were first assembled. The PMBOK Guide, the project-level reference, reached its eighth edition in November 2025. That edition condenses the seventh edition's twelve principles into six, organizes practice into seven performance domains, and brings back process-level guidance as flexible reference material for predictive, agile and hybrid work."),
    blk('s2p2', "The Standard for Program Management reached its fifth edition in 2024. It is principle-led, identifying eight principles that guide program management, and adds a Collaboration performance domain. The Standard for Portfolio Management is still in its fourth edition, published in November 2017; PMI has a fifth edition in development and ran public comment periods on drafts during 2026, but as of this lesson it has not been published."),
    blk('s2p3', "Chapter 15 cites the fourth editions of the portfolio and program standards and the sixth through eighth editions of the PMBOK Guide. The definitions used in this course are stable across those editions; what has changed is mainly how the standards are organized, with recent editions moving from prescriptive processes toward principles and performance domains."),
    table('s2t1', 'PMI standards by level, current editions (October 2026)', [
        {'Level': 'Project', 'Standard': 'PMBOK Guide', 'Current edition': '8th edition, November 2025'},
        {'Level': 'Program', 'Standard': 'The Standard for Program Management', 'Current edition': '5th edition, 2024'},
        {'Level': 'Portfolio', 'Standard': 'The Standard for Portfolio Management', 'Current edition': '4th edition, November 2017 (5th in development)'},
    ]),
    callout('s2c1', "Standards give a shared vocabulary. When a state agency, a hospital PMO and a federal partner all mean the same thing by 'program' and 'benefit', coordination becomes much easier. That shared vocabulary is a large part of their value."),

    h2('s3h1', "Vermont's Transformation at Three Levels"),
    blk('s3p1', "Figure 15.2 of the book applies the hierarchy to Vermont. At the project level are bounded pieces of work with a deliverable: deploying the analytics vendor that gives AHS and the Green Mountain Care Board access to VHCURES claims data, closing coding gaps at a single hospital, deploying the Collaborative Care Model at one Blueprint practice, or completing the rulemaking for reference-based pricing."),
    blk('s3p2', "At the program level are groups of related projects that only deliver value together: the Technology pillar program, combining VHCURES analytics, the VITL health information exchange, the Care Integration Network and AI governance; the Blueprint patient-centered medical home expansion across thirteen health-service-area projects; and the design and implementation of hospital global budgets. At the portfolio level is the whole: all 19 components across the five pillars, aligned to Act 167's five goals and the January 2028 Strategic Plan."),
    blk('s3p3', "The book's finding is that Vermont operates at all three levels but has management infrastructure only at the first. Projects have managers. Programs mostly do not have program managers. The portfolio has no portfolio manager. Work is therefore coordinated, where it is coordinated at all, through the goodwill and spare capacity of people whose formal job is a single project."),
    table('s3t1', 'The PMI hierarchy applied to Vermont (from Figure 15.2)', [
        {'Level': 'Project', 'Vermont example': 'Analytics-vendor deployment; RBP rulemaking; CoCM at one practice', 'Managed by': 'Project manager', 'Success measure': 'On scope, schedule, budget; deliverable accepted'},
        {'Level': 'Program', 'Vermont example': 'Technology pillar program; Blueprint PCMH expansion; global-budget program', 'Managed by': 'Pillar program manager', 'Success measure': 'Benefits realized; interdependencies managed'},
        {'Level': 'Portfolio', 'Vermont example': 'All 19 components, aligned to Act 167 and the Jan 2028 plan', 'Managed by': 'Portfolio manager', 'Success measure': 'Strategic objectives achieved; resources optimally allocated'},
    ]),

    h2('s4h1', 'The Level Error and Its Symptoms'),
    blk('s4p1', "Managing a portfolio as a set of projects produces recognizable symptoms. Status reports are long lists of green, amber and red projects with no view of which matters most. Two components compete for the same scarce staff and the conflict is settled by whoever escalates loudest. A component finishes on time but cannot be used because the work it depended on is not ready. Nobody has the authority to stop or pause a component, so the portfolio only ever grows."),
    blk('s4p2', "The most dangerous symptom is that every individual manager can be doing well. When each project is measured only against its own scope, schedule and budget, a portfolio can be failing while every dashboard is green. The failure lives in the spaces between projects, where no one is measured."),
    blk('s4p3', "The cure is not more reporting. It is assigning someone the job, and the authority, of managing the spaces between projects: first at the program level within each pillar, and then at the portfolio level across all five."),
    blk('s4p4', "The level error is also expensive in a quieter way. Without a portfolio layer, nothing is ever stopped. Components that have lost their purpose, because a federal model was withdrawn or a better approach emerged, keep consuming staff and money because no one has the authority to end them. PMI's portfolio standard treats terminating components as a normal, healthy decision; Chapter 15 gives Vermont's Portfolio Manager the duty of recommending termination when a component's benefits are no longer achievable."),
    warning('s4w1', "Green dashboards, failing portfolio", "If every component in your status report is on track and the transformation as a whole is still slipping, you are almost certainly managing at the wrong level. The question to ask is not which project is late, but which dependency between projects nobody owns."),

    h2('s5h1', 'Diagnose the Level of Your Own Work'),
    blk('s5p1', "You can tell the level at which your organization is managing its transformation by asking a few direct questions. The answers usually reveal whether a program and portfolio layer exists in practice, regardless of what the organization chart says."),
    blk('s5p2', "If the answers point to project-level management only, the next lesson's exercise, building a complete inventory of components, is the place to start. A portfolio cannot be managed until it has been defined."),
    steps('s5st1', 'Five diagnostic questions', [
        ("Who decides between components?", "When two components need the same people or money, who decides, and on what basis?"),
        ("Who can stop work?", "Has any component ever been paused or stopped because of the portfolio's needs rather than its own problems?"),
        ("Who owns the dependencies?", "For your most important dependency between two components, can you name the person accountable for it?"),
        ("What is measured?", "Do reports measure deliverables only, or also benefits and strategic objectives?"),
        ("Is there one view?", "Is there a single place where every component, its owner, its status and its dependencies are visible together?"),
    ]),

    takeaway('tw', [
        "A project produces a deliverable, a program coordinates related projects for benefits none could produce alone, and a portfolio aligns everything with strategy.",
        "Each level asks a different question and is judged by a different measure of success.",
        "The PMBOK Guide is in its 8th edition (November 2025), the Program Management standard in its 5th (2024), and the Portfolio Management standard in its 4th (2017), with a 5th in development.",
        "Vermont's transformation operates at all three levels but has management infrastructure only at the project level.",
        "Managing a portfolio as projects lets every dashboard show green while the whole fails, because the failures live in the dependencies between projects.",
        "The cure is assigning ownership and authority for the spaces between projects, at program and portfolio level.",
        "Five questions about decisions, stopping work, dependencies, measures and a single view reveal the level at which work is really managed.",
    ]),
    quiz('qz',
        "Every project in a transformation reports green on scope, schedule and budget, yet the transformation is slipping. What is the most likely explanation?",
        [
            ("The project managers are misreporting their status", False),
            ("The work is being managed only at project level, so failures in the dependencies between projects are not owned or measured", True),
            ("The transformation has too few projects", False),
            ("Green status reports always indicate success", False),
        ],
        "Project-level measures only judge each piece of work against its own plan. When projects depend on one another, the portfolio can fail through those dependencies even while each project meets its own targets. Program and portfolio management exist to own and measure exactly those spaces between projects."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.2 and Figure 15.2: the PMI hierarchy applied to Vermont"),
    blk('src2', "[2] Project Management Institute, The Standard for Portfolio Management, 4th edition (November 2017) — https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — portfolio definition; 5th edition in development"),
    blk('src3', "[3] Project Management Institute, The Standard for Program Management, 5th edition (2024) — https://www.pmi.org/standards/program-management-fifth-edition — eight principles; Collaboration performance domain"),
    blk('src4', "[4] Project Management Institute, A Guide to the Project Management Body of Knowledge (PMBOK Guide), 8th edition (November 2025) — https://www.pmi.org/standards/pmbok — six principles, seven performance domains"),
    blk('src5', "[5] Project Management Institute, The Standards Evolution — https://www.pmi.org/pmbok-guide-standards/about — standards development process and comment periods"),
]

# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'tpm-defining-the-portfolio'
L3_TITLE = 'Defining the Portfolio: The Component Inventory'
L3 = [
    blk('intro1', "A portfolio that has not been defined cannot be managed. PMI's portfolio standard requires every component to be identified, classified and assigned governance before anything else is done with it. That sounds obvious, yet most organizations running a transformation have never written down the complete list of what they are running."),
    blk('intro2', "Chapter 15 does that work for Vermont, producing a 19-component inventory. This lesson shows how the inventory was built, how each component is classified, what the exercise typically reveals, and how to build the same inventory for your own organization or state."),
    blk('intro3', "The book calls this exercise often the single highest-value first step toward portfolio governance. It costs little, needs no new authority, and almost always changes how leaders understand the scale of what they are doing."),

    h2('s1h1', 'Why Definition Comes First'),
    blk('s1p1', "Every later portfolio decision depends on the inventory. You cannot schedule components by dependency if you have not listed them. You cannot resolve resource conflicts between components you do not know exist. You cannot trace benefits to goals, or score risks against components, without a complete list to work from."),
    blk('s1p2', "Vermont, the book notes, has never published such a definition. Its transformation arrives through several channels at once: statutes, a federal model agreement and its closeout, a federal grant program, and a series of agency reports. Each channel carries its own obligations and deadlines, and each tends to be owned by a different unit. Without an inventory, nobody sees them as one body of work."),
    blk('s1p3', "That is not unique to Vermont. Initiatives in large organizations are usually owned by different departments that do not otherwise compare notes, so the total is invisible from any single seat. Defining the portfolio is the act of making it visible from one seat."),
    blk('s1p4', "Definition also protects against double counting and silent gaps. Two units can each believe the other owns a piece of work, or both can be doing it. Writing every component down, once, with one owner, is the simplest way to find both problems before they cost a deadline."),
    callout('s1c1', "The portfolio inventory is the foundation document of portfolio management: every component, its pillar, its owner, its type, its priority and its next stage gate, in one place."),

    h2('s2h1', "How Vermont's 19 Components Were Found"),
    blk('s2p1', "The inventory in Figure 15.3 is HTR's own, not an official state document. It was assembled by reading Act 68, the AHEAD State Agreement, Vermont's Rural Health Transformation Program application and the AHS transformation reports, and listing every initiative that carries a named owner and a dated obligation. Each was then assigned to the pillar whose function it serves."),
    blk('s2p2', "Two rules made the exercise work. First, an initiative only counts if it has an owner and a date; aspirations without either are not components yet. Second, each component goes to exactly one pillar, chosen by function: a data platform is Technology even if it is funded through a payment program. Applied in early 2026, the exercise produced nineteen components."),
    blk('s2p3', "The book is careful about what the number means. Nineteen is what the exercise produced at that date. It is not a number Vermont has adopted, and anyone repeating the exercise against later reports should expect it to move, as components finish, new obligations arrive or, as happened in July 2026, a federal agreement is withdrawn and becomes a closeout obligation instead."),
    steps('s2st1', 'The inventory method', [
        ("Gather the sources", "Collect every statute, agreement, grant and agency plan that imposes transformation obligations."),
        ("Extract candidates", "List every initiative that has a named owner and a dated obligation."),
        ("Assign a pillar", "Place each component in the one pillar whose function it serves."),
        ("Classify it", "Record its type, priority, lead and current stage gate."),
        ("Date the inventory", "Record when it was built; it is a snapshot, and it will change."),
    ]),

    h2('s3h1', 'Classifying the Components'),
    blk('s3p1', "Figure 15.3 classifies each component on five attributes. Type distinguishes compliance projects, strategic projects, operational programs, analytical projects and organizational projects; the type tells you how the component should be managed. Priority is critical, high or medium. Lead names the accountable organization. The status and stage-gate column records where the component is now and the next point at which it must demonstrate progress."),
    blk('s3p2', "The pillar column matters most for scheduling. Because the components are grouped by pillar, each inherits that pillar's inbound dependencies from the five-pillar framework. An Economics component such as reference-based-pricing implementation cannot be productively implemented before the Technology components that make it measurable, however close its own deadline is. Track 3 of this course turns that observation into scheduling rules."),
    blk('s3p3', "The sample below shows one component from each pillar as the book recorded it for 2026. The full inventory is in Figure 15.3, and the Portfolio Sequencing Test on the platform loads all nineteen as its Vermont preset."),
    table('s3t1', 'One component per pillar (from Figure 15.3, 2026)', [
        {'Pillar': 'Policy', 'Component': 'Statewide Strategic Plan development', 'Type': 'Strategic project', 'Priority': 'Critical', 'Next gate': 'January 2028'},
        {'Pillar': 'Technology', 'Component': 'AHS-GMCB analytics-vendor deployment', 'Type': 'Strategic project', 'Priority': 'Critical', 'Next gate': 'Operational January 2027'},
        {'Pillar': 'Economics', 'Component': 'Social-risk-adjustment methodology', 'Type': 'Analytical project', 'Priority': 'High', 'Next gate': 'FY2028 adoption'},
        {'Pillar': 'Clinical', 'Component': 'Collaborative Care Model statewide deployment', 'Type': 'Operational program', 'Priority': 'High', 'Next gate': '80%+ of practices, FY2028'},
        {'Pillar': 'Operations', 'Component': 'AHS PMO establishment', 'Type': 'Organizational project', 'Priority': 'Critical', 'Next gate': 'Operational Q2 2027'},
    ]),

    h2('s4h1', 'What the Inventory Usually Reveals'),
    blk('s4p1', "The book's Implications section describes what organizations typically discover when they build their first inventory. They are running more simultaneous transformation components than they had counted. Several components have no named owner. And two or three components sit downstream of a dependency nobody is tracking."),
    blk('s4p2', "Vermont's inventory carries one more lesson: the portfolio function itself is a component. AHS PMO establishment appears in the Operations pillar with a critical priority and a target of being operational in the second quarter of 2027. A portfolio can, and here does, contain the component responsible for managing the portfolio, and if that component slips, everything else is managed less well."),
    blk('s4p3', "None of these findings requires new data or new authority to produce. They come from reading documents the organization already has and writing the results in one table. That is why the book recommends the inventory as the first step for any state or organization, wherever it is in its transformation."),
    blk('s4p4', "The inventory also changes conversations with oversight bodies. A legislature or board that receives component-by-component reports sees activity; one that receives the inventory sees the shape of the whole, including which components carry critical priority, which share a deadline, and which have no owner. That shift from activity to shape is the first sign that a portfolio is being managed rather than merely reported."),
    example('s4ex1', 'Beyond Vermont', "Chapter 15 presents the inventory method as directly repeatable by any organization or state agency: list every statute, grant, model agreement and initiative touching the five pillars, then map each to a pillar and an owner. The number of components will differ; the book's point is that most organizations underestimate their portfolio until they do this, because no single department sees the whole."),
    highlight('s4hl1', "An initiative without a named owner is not a component; it is a risk. Record it, and make assigning an owner the first action against it."),

    h2('s5h1', 'Build Your Own Inventory'),
    blk('s5p1', "You can build a first inventory in an afternoon. Start from the documents that impose obligations on your organization: statutes and regulations, contracts and grant agreements, board-approved plans and any regulator's directives. For a hospital, that includes payer contracts with value-based terms, state reporting obligations, and capital projects tied to the transformation."),
    blk('s5p2', "Then enter your components into the Portfolio Sequencing Test at /portfolio-sequencing-test. The tool starts with Vermont's nineteen components; you can remove them, add your own with the + Add component button, and set each one's pillar, status and calendar target. In Track 3 you will use the same tool to run the sequencing test on your inventory. For now, the goal is a complete list with an owner and a pillar for every line."),
    blk('s5p3', "Keep the inventory dated and revisit it at a fixed interval. A portfolio is not static: components finish, new obligations arrive, and some components should be stopped. The inventory is the document in which those changes become visible."),
    steps('s5st1', 'Your first inventory', [
        ("List the sources", "Write down every document that imposes a transformation obligation on your organization."),
        ("Extract components", "From each, list initiatives with an owner and a date."),
        ("Fill five attributes", "Pillar, type, priority, lead, next stage gate."),
        ("Flag the gaps", "Mark every component without an owner and every dependency without a tracker."),
        ("Enter it on the platform", "Load your components into /portfolio-sequencing-test, replacing the Vermont preset."),
    ]),

    takeaway('tw', [
        "A portfolio must be defined before it can be managed: every component identified, classified and assigned governance.",
        "Vermont has never published a portfolio definition; HTR's 19-component inventory was built from Act 68, the AHEAD agreement, the RHT application and AHS reports.",
        "A component counts only if it has a named owner and a dated obligation, and each goes to the one pillar whose function it serves.",
        "Each component is classified by pillar, type, priority, lead and next stage gate; the pillar determines its inbound dependencies.",
        "Nineteen is a dated snapshot, not an official number; the inventory changes as components finish, arrive or are withdrawn.",
        "First inventories typically reveal more components than expected, components with no owner, and untracked dependencies.",
        "The Portfolio Sequencing Test lets you replace Vermont's components with your own and becomes the base for the sequencing work in Track 3.",
    ]),
    quiz('qz',
        "Under the inventory method in Chapter 15, which of these qualifies as a portfolio component?",
        [
            ("A goal in a strategic plan to 'improve population health', with no owner or date", False),
            ("An initiative with a named owner and a dated obligation, assigned to the pillar whose function it serves", True),
            ("Every meeting held by the transformation steering committee", False),
            ("Any initiative mentioned in a news story about the reform", False),
        ],
        "The book's method counts an initiative only if it has a named owner and a dated obligation, and assigns it to exactly one pillar by function. Aspirations without an owner or date are not yet components; if they matter, assigning an owner is the first action, and until then they belong on the risk register."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.3, Figure 15.3 (the 19-component inventory and its method), Beyond Vermont box, §15.15 Implications for You"),
    blk('src2', "[2] Project Management Institute, The Standard for Portfolio Management, 4th edition (2017) — https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — portfolio definition and component identification"),
    blk('src3', "[3] Vermont Act 68 of 2025, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — statutory obligations behind several components"),
    blk('src4', "[4] HTR Portfolio Sequencing Test — https://healthtransformationreview.org/portfolio-sequencing-test — Vermont preset of the 19 components; add, edit and remove components"),
    blk('src5', "[5] Centers for Medicare & Medicaid Services, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — the federal model agreement whose closeout is a Policy component"),
]

LESSONS = [(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2), (L3_SLUG, L3_TITLE, L3, 3)]
if __name__ == '__main__':
    run(LESSONS)
