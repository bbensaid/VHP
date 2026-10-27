exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_portfolio_common.py').read())

# Track 4 — Risk and Benefits
# Vermont facts: HTR book Chapter 15 (§15.9-15.10, Figures 15.6-15.8, §15.14) and Chapter 1.
# Risk-response strategies (escalate, avoid, transfer, mitigate, accept): PMI practice as summarized
# by PMI's projectmanagement.com and standard PMP references (verified 2026-10-27).
# BRM: PMI, Benefits Realization Management: A Practice Guide (standards page, Dec 2018 / Jan 2019).
# HTR Simulator behaviour: lib/framework/sequence-engine.ts (cascade through delivered values).

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'tpm-risk-register'
L10_TITLE = 'Building the Portfolio Risk Register'
L10 = [
    blk('intro1', "Every chapter of Transforming Healthcare analyzes risk: what happens if a mandate is weakened, if data infrastructure is late, if federal funding falls. Chapter 15 observes that Vermont analyzes these risks but does not manage them operationally, because no maintained register exists. Analysis that lives in reports is not management. Management means a named owner, a chosen response, and a regular review."),
    blk('intro2', "This lesson builds the portfolio risk register the way Chapter 15 does: what goes in each column, how risks are scored, which response strategies are available, and how Vermont's ten risks look when written in that format. The next lesson reads the finished register for what it says about the portfolio as a whole."),
    blk('intro3', "A portfolio register differs from a project register in one important way. Its risks usually span more than one component and often more than one pillar, and the most serious ones concern the dependencies between pillars rather than the work inside any single component."),

    h2('s1h1', 'What a Portfolio Register Records'),
    blk('s1p1', "Figure 15.6 of the book uses a standard format with eight columns. Each risk has an identifier and a plain statement of what might happen and what it would cause. It records the pillars affected, the probability and the impact, a score combining the two, the response chosen, and the owner accountable for carrying out the response."),
    blk('s1p2', "Writing the risk statement well matters more than it seems. Good statements name a cause and a consequence: the analytics vendor is not operational by January 2027, so hospitals enter Act 68 global budgets without financial-management capability. A vague statement such as 'data problems' cannot be owned, scored or responded to, because no one can tell when it has happened or what would prevent it."),
    blk('s1p3', "The pillars column is what makes the register a portfolio register. Six of Vermont's ten risks touch two pillars, and one touches all five. Those cross-pillar risks are exactly the ones no single component manager would put on their own register, because no single component owns them."),
    blk('s1p4', "The owner column deserves the same care as the risk statement. An owner must be a person or role with the authority to carry out the response, not a committee or an organization. Where the book names two owners, such as a program manager together with the Portfolio Manager, it is signalling that the response needs both the pillar's expertise and the portfolio's authority over resources."),
    table('s1t1', 'Columns of the portfolio risk register (Figure 15.6)', [
        {'Column': 'ID', 'What it holds': 'A stable identifier, such as R-01'},
        {'Column': 'Risk', 'What it holds': 'Cause and consequence, in one sentence'},
        {'Column': 'Pillars', 'What it holds': 'Every pillar the risk affects'},
        {'Column': 'Probability and impact', 'What it holds': 'Rated on fixed scales'},
        {'Column': 'Score', 'What it holds': 'Probability × impact'},
        {'Column': 'Response', 'What it holds': 'Strategy and specific actions'},
        {'Column': 'Owner', 'What it holds': 'The person accountable for the response'},
    ]),

    h2('s2h1', 'Scoring: Probability Times Impact'),
    blk('s2p1', "Chapter 15 scores each risk as probability multiplied by impact. Probability is rated Low (1), Low to Medium (2.5), Medium (3), Medium to High (3.75) or High (4). Impact is rated Low (1), Medium (3), High (4) or Critical (5). Bands that straddle two levels are scored at the midpoint, which is why some scores are not whole numbers."),
    blk('s2p2', "On that scale the highest possible score is 20: a high-probability risk with critical impact. Two of Vermont's risks reach it. R-01 is the analytics vendor not being operational by January 2027. R-10 is the portfolio-management infrastructure itself not being established before the 2027 deadlines, leaving the transformation managed as a collection of projects."),
    blk('s2p3', "Scores rank risks for attention; they are not precise measurements. The value of a fixed scale is consistency: two people scoring the same risk should land close together, and a risk's score can be compared from month to month as conditions change."),
    stat_grid('s2sg1', [
        ('20', 'R-01: analytics vendor not operational by Jan 2027', 'Chapter 15, Figure 15.6 (High × Critical)'),
        ('20', 'R-10: portfolio infrastructure not established in time', 'Chapter 15, Figure 15.6 (High × Critical)'),
        ('16', 'R-03 and R-06: descriptive Strategic Plan; VITL connectivity gaps', 'Chapter 15, Figure 15.6 (High × High)'),
        ('12', 'R-08: social-risk adjustment not adopted in time', 'Chapter 15, Figure 15.6 (Medium × High)'),
    ]),

    h2('s3h1', 'Five Ways to Respond'),
    blk('s3p1', "PMI practice recognizes five responses to a threat. Avoid changes the plan so the risk cannot occur. Mitigate reduces its probability or its impact. Transfer shifts its consequences to another party, typically through a contract or insurance. Accept takes no proactive action beyond monitoring, sometimes with a contingency reserve. Escalate hands the risk to a higher level, such as the portfolio or the governance body, when it is beyond the current owner's authority."),
    blk('s3p2', "Vermont's register uses several of these and pairs each with specific actions. R-10 is to be avoided by putting a Portfolio Manager in seat by January 2027 and the portfolio office in operation by the second quarter of 2027. R-04, a governor committed to modifying Act 68, is accepted and monitored, with actions to build irreversibility and maintain legislative relationships, because the portfolio cannot remove a political risk. Most other risks are mitigated."),
    blk('s3p3', "The register also uses accelerate as a response for two risks, R-01 and R-08. Acceleration is a form of mitigation aimed at time: for R-01, a parallel route to claims data and compensating investment in coding accuracy; for R-08, making the Economics program manager lead social-risk adjustment as co-equal with global-budget design."),
    blk('s3p4', "A response is only real if it has actions, an owner and a date. 'Mitigate' written alone in the response column is a label, not a plan. Each of Vermont's responses lists concrete actions, such as scenario planning for a 30% reduction in Medicaid-funded investment under R-05, which is what allows the monthly review to check whether the response is actually under way."),
    steps('s3st1', 'Threat responses (PMI practice)', [
        ("Avoid", "Change the plan so the risk cannot occur. Example: R-10, by staffing the portfolio function before 2027."),
        ("Mitigate", "Reduce probability or impact. Example: R-06, using Care Integration Network shared services for small providers."),
        ("Transfer", "Shift consequences to another party, usually by contract or insurance."),
        ("Accept", "Monitor without proactive action, perhaps with a reserve. Example: R-04, a political risk the portfolio cannot remove."),
        ("Escalate", "Refer to a higher level when the risk exceeds the owner's authority."),
    ]),

    h2('s4h1', "Vermont's Ten Risks"),
    blk('s4p1', "Read as a whole, Vermont's register is dominated by dependency and capacity. Two risks concern Technology readiness: the analytics vendor (R-01) and persistent gaps in connectivity through VITL, the state's health information exchange (R-06). Two concern capacity to manage the transformation: an overcommitted agency producing a non-binding Strategic Plan (R-03) and the absence of portfolio infrastructure (R-10). Others concern the payment design itself, the external environment and clinical ownership."),
    blk('s4p2', "The external risks are worth noting because they cannot be managed away. Federal Medicaid cuts under H.R. 1 constrain Medicaid-funded clinical investments, with no EAST Fund backstop after Vermont's withdrawal from the AHEAD model (R-05). A change of governor could put the mandatory architecture at risk (R-04). For risks like these, the portfolio's job is to plan scenarios and build resilience, not to promise prevention."),
    blk('s4p3', "Every risk has a named owner, and the owners are mostly program managers and the Portfolio Manager. That is not an accident: a risk whose owner does not yet exist cannot be managed, which is one more reason R-10, the missing portfolio function, sits at the top of the register."),
    table('s4t1', "Vermont's portfolio risk register, condensed (Figure 15.6)", [
        {'ID': 'R-01', 'Risk': 'Analytics vendor not operational by Jan 2027', 'Pillars': 'Tech, Econ', 'Score': '20', 'Response': 'Accelerate'},
        {'ID': 'R-02', 'Risk': 'RBP methodology hollowed by regulatory process', 'Pillars': 'Policy, Econ', 'Score': '15', 'Response': 'Mitigate'},
        {'ID': 'R-03', 'Risk': 'Overcommitment yields a non-binding Strategic Plan', 'Pillars': 'Ops, Policy', 'Score': '16', 'Response': 'Mitigate'},
        {'ID': 'R-04', 'Risk': 'New governor modifies Act 68', 'Pillars': 'Policy', 'Score': '12.5', 'Response': 'Accept + monitor'},
        {'ID': 'R-05', 'Risk': 'H.R. 1 Medicaid cuts; no EAST Fund backstop', 'Pillars': 'Clin, Econ', 'Score': '15', 'Response': 'Mitigate'},
        {'ID': 'R-06', 'Risk': 'VITL connectivity gaps persist', 'Pillars': 'Tech, Clin', 'Score': '16', 'Response': 'Mitigate'},
        {'ID': 'R-07', 'Risk': 'Hospital-planning support not replaced', 'Pillars': 'Ops', 'Score': '15', 'Response': 'Mitigate'},
        {'ID': 'R-08', 'Risk': 'Social-risk adjustment not adopted before FY2028', 'Pillars': 'Econ', 'Score': '12', 'Response': 'Accelerate'},
        {'ID': 'R-09', 'Risk': 'Insufficient clinical-leader engagement', 'Pillars': 'Clinical', 'Score': '12', 'Response': 'Mitigate'},
        {'ID': 'R-10', 'Risk': 'Portfolio infrastructure not established before 2027', 'Pillars': 'All', 'Score': '20', 'Response': 'Avoid'},
    ]),

    h2('s5h1', 'Build Your Own Register'),
    blk('s5p1', "Start from the inventory and the sequencing results from earlier lessons. The richest source of portfolio risks is the list of components where schedule pressure belongs: each gating component that might be late is a risk to everything waiting behind it. Add risks to the mandate, to funding, to capacity and to engagement, and write each as cause and consequence."),
    blk('s5p2', "Score with a fixed scale, such as the one in Figure 15.6, and agree it in advance so scores are comparable. Then choose a response and a named owner for every risk scoring above a threshold you set. A risk without an owner should itself be escalated to the governance body, since an unowned risk is a governance failure."),
    blk('s5p3', "Finally, set the cadence. The book's portfolio runs monthly governance reviews, and the register should be reviewed at each one: new risks added, scores updated, responses checked for whether they are actually happening. A register updated once a year is a document; one reviewed monthly is a management tool."),
    steps('s5st1', 'Build the register in five steps', [
        ("Mine your pressure points", "Every gating component that might slip is a risk to the components behind it."),
        ("Add structural risks", "Mandate, funding, capacity, engagement and external policy."),
        ("Write cause and consequence", "One sentence each, specific enough to tell when it has happened."),
        ("Score and respond", "Fixed probability and impact scales; a strategy, actions and an owner for each."),
        ("Review monthly", "Update scores and check that responses are really under way."),
    ]),

    takeaway('tw', [
        "Analysis is not management: a risk is managed only when it has an owner, a chosen response and a regular review.",
        "Vermont's register (Figure 15.6) records ID, risk, pillars, probability, impact, score, response and owner for ten risks.",
        "Risks are scored as probability (1 to 4) times impact (1 to 5); the maximum of 20 is reached by R-01 (analytics vendor) and R-10 (no portfolio infrastructure).",
        "Good risk statements name a cause and a consequence; vague statements cannot be owned or scored.",
        "PMI practice offers five threat responses: avoid, mitigate, transfer, accept and escalate; the register also uses acceleration as time-focused mitigation.",
        "Cross-pillar risks dominate the portfolio register and are the ones no single component would record.",
        "Build a register from your sequencing pressure points, score it on a fixed scale, assign owners and review it monthly.",
    ]),
    quiz('qz',
        "Why does R-04, a new governor committed to modifying Act 68, carry the response 'accept and monitor' rather than 'avoid'?",
        [
            ("Because its score is the lowest on the register", False),
            ("Because the portfolio cannot remove a political risk; it can only monitor it and build resilience, such as irreversibility and legislative relationships", True),
            ("Because Act 68 cannot legally be modified", False),
            ("Because political risks are always transferred to the Legislature", False),
        ],
        "Avoidance requires changing the plan so the risk cannot occur, which is impossible for an election outcome. The register accepts the risk and pairs monitoring with actions that reduce its consequences: building irreversibility, documenting progress and maintaining legislative relationships."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.9 and Figure 15.6: the portfolio risk register, scoring method, responses and owners"),
    blk('src2', "[2] Project Management Institute, projectmanagement.com, 5 Strategies for Dealing With Threats — https://www.projectmanagement.com/blog-post/68098/5-strategies-for-dealing-with-threats — escalate, avoid, transfer, mitigate, accept"),
    blk('src3', "[3] Project Management Institute, The Standard for Portfolio Management, 4th edition (2017) — https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — portfolio risk management"),
    blk('src4', "[4] Vermont Act 68 of 2025, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — the global-budget and pricing mandate several risks concern"),
]

# ════════════════════════════════════════════════════════════════════════════
L11_SLUG = 'tpm-reading-the-register'
L11_TITLE = 'Reading the Register: Heat Maps, Shared Causes and Escalation'
L11 = [
    blk('intro1', "A risk register is a list. A portfolio manager needs to see a shape: which risks cluster, which share a cause, which would trigger others, and which are scored modestly but still demand action now. Chapter 15 makes that shift by plotting the register by probability and impact, and by reading it against the dependency logic of the whole book."),
    blk('intro2', "This lesson reads Vermont's register the way the book does: as a heat map, as a set of risks with shared causes, and as a set of signals that should trigger escalation. It then shows how the platform's simulators turn the register's two Technology risks into something you can watch happen."),
    blk('intro3', "The aim is to move from asking how big each risk is to asking what the risks together say about where the portfolio is fragile."),

    h2('s1h1', 'The Heat Map'),
    blk('s1p1', "Figure 15.7 plots each risk on a grid, probability on one axis and impact on the other. The book's comment is that the register's shape is clearer than its rows. The two risks scored 20 share the critical corner of the map, high probability and critical impact, and one of them is the absence of the portfolio function itself."),
    blk('s1p2', "That observation carries the chapter's whole argument. The single most dangerous condition in the portfolio is not a technical failure or a budget shortfall. It is the lack of anyone positioned to manage the other risks. A register whose top risk is 'nobody is managing this register' is telling its readers what to do first."),
    blk('s1p3', "The map also shows what sits in the middle. Social-risk adjustment (R-08) scores 12, mid-map. The book's reminder is that a moderate score is not a licence to wait: the sequencing test says this component has no upstream blocker and should already be running. Risk score and dependency status answer different questions, and the portfolio manager needs both."),
    callout('s1c1', "Risk score tells you how bad a risk would be. Dependency status tells you whether the work that prevents it can start now. A moderate risk whose prevention is unblocked deserves action before a severe risk whose prevention must wait."),

    h2('s2h1', 'Shared Causes and Correlated Risks'),
    blk('s2p1', "Risks on a register are often treated as independent, but in a five-pillar portfolio many share a cause. R-01, the analytics vendor not being operational, and R-06, persistent VITL connectivity gaps, are both failures of the Technology pillar. If Technology slips, both are likely to materialize together, and through the dependency chain they then degrade Economics and Clinical work at the same time."),
    blk('s2p2', "Correlation changes how risks should be managed. Two risks that would each be survivable alone can be overwhelming together. A portfolio manager who mitigates R-01 and R-06 separately, with different owners and no shared plan, may miss that the most effective mitigation for both is the same: protecting and resourcing the Technology program as a whole."),
    blk('s2p3', "Capacity risks correlate too. R-03, an overcommitted agency producing a non-binding Strategic Plan, and R-10, no portfolio infrastructure, both stem from the same shortage of management capacity. The book's response to R-03 includes establishing the portfolio office, the same action that avoids R-10. One well-chosen response can retire several risks."),
    blk('s2p4', "Correlation also runs through external risks. Federal Medicaid cuts (R-05) and the loss of the EAST Fund backstop after the AHEAD withdrawal hit the same Clinical and Economics components at once. Scenario planning that assumes both happen together is more honest than planning for each separately and hoping they do not coincide."),
    compare('s2cmp1', 'Two ways to read the same register',
        'Risk by risk', [
            'Each risk scored and owned separately',
            'Separate mitigation plans',
            'Combined exposure invisible',
        ],
        'By shared cause', [
            'Risks grouped by the pillar or capacity they depend on',
            'One response can retire several risks',
            'Combined exposure visible and planned for',
        ]),

    h2('s3h1', 'Watching a Risk Happen in the Simulators'),
    blk('s3p1', "Chapter 15's platform guide suggests a direct way to see why the Technology risks dominate. Open the HTR Simulator at /htr-simulator, load the Vermont, Fall 2026 scenario, and lower the Technology score. Economics and Clinical fall with it. The book calls this the risk register's R-01 and R-06 in visual form."),
    blk('s3p2', "The effect comes from how the simulator models dependency. Each pillar is gated on the delivered strength of the pillars upstream of it, not on their nominal scores, so a weaker Technology pillar caps Economics, and the capped Economics in turn caps Clinical. A risk that materializes in one pillar propagates down the chain, which is exactly why cross-pillar risks belong on the portfolio register."),
    blk('s3p3', "The Impact Simulation at /impact-simulation lets you model what a single component slipping does to the rest of the portfolio, and shows which components have no slack: the ones whose slip moves other pillars' outcomes. Together the two tools turn an abstract score into a visible consequence, which is often what a governance body needs before it will fund a mitigation."),
    steps('s3st1', 'See R-01 and R-06 in the simulator', [
        ("Open the simulator", "Go to /htr-simulator and load Vermont, Fall 2026."),
        ("Note the baseline", "Record delivered readiness for Economics and Clinical."),
        ("Lower Technology", "Reduce the Technology score by 15 points."),
        ("Read the cascade", "Note how far Economics and Clinical fall, and the change in delivered readiness."),
        ("Model a slip", "Use /impact-simulation to see which components have no slack."),
    ]),

    h2('s4h1', 'When to Escalate'),
    blk('s4p1', "Escalation is a response in its own right: referring a risk to a higher level when it exceeds the current owner's authority. In a portfolio, escalation paths follow the governance tiers from Track 2. A component lead escalates to the pillar program manager, the program manager to the Portfolio Manager, and the Portfolio Manager to the governance body, which for Vermont is the AHS Secretary with the HCAC and the Green Mountain Care Board."),
    blk('s4p2', "Good escalation is triggered by rules agreed in advance, not by frustration. Typical triggers are a score crossing a threshold, a risk spanning pillars owned by different program managers, a response that needs resources the owner does not control, and a risk to a component on the portfolio's true critical path. Writing these triggers down protects owners from being blamed for escalating and protects the governance body from surprises."),
    blk('s4p3', "R-10 shows the limit of escalation. Its owner in the register is the AHS Secretary, the top of the structure, because the risk concerns whether the structure exists at all. When the highest-scored risk is owned at the top, the governance body cannot delegate it; it has to act."),
    blk('s4p4', "Escalation should also flow downward. When the governance body decides on an escalated risk, the decision and its reasoning need to return to the people who raised it, so the same risk is not escalated again next month and so owners learn what the governance body will and will not decide."),
    warning('s4w1', "Escalation is not abdication", "Escalating a risk moves the decision to someone with more authority. It does not remove the original owner's responsibility to supply the analysis, the options and the consequences of inaction. An escalation without those is just a complaint."),

    h2('s5h1', 'A Monthly Reading Routine'),
    blk('s5p1', "Each month, before the governance review, the portfolio office should read the register in three passes. First, the heat map: what has moved toward the critical corner, and why? Second, shared causes: which risks have the same root, and is there a single response that addresses several? Third, dependency status: which risks can be reduced by work that is unblocked today, regardless of score?"),
    blk('s5p2', "The output is short: the two or three risks that need a decision from the governance body this month, with options and consequences. That is what turns a register from a compliance artifact into the main agenda of portfolio governance."),
    blk('s5p3', "Keep a record of how each month's top risks were handled. Over a year, that record is evidence for federal partners, legislators and auditors that the portfolio was actively managed, which is itself one of the benefits the book claims for a portfolio office."),
    highlight('s5hl1', "The register's best monthly output is not the full table. It is two or three decisions the governance body must make now, each with options and the cost of not deciding."),

    takeaway('tw', [
        "Plotting the register by probability and impact reveals its shape; Vermont's two risks scored 20 share the critical corner.",
        "One of the two top risks is the absence of the portfolio function itself, which tells readers what to do first.",
        "A moderate score is not a licence to wait: social-risk adjustment scores 12 but has no upstream blocker and should already be running.",
        "Many portfolio risks share causes; R-01 and R-06 are both Technology failures, and R-03 and R-10 both stem from missing management capacity.",
        "Lowering Technology in the HTR Simulator shows R-01 and R-06 propagating to Economics and Clinical, because each pillar is gated on delivered upstream strength.",
        "Escalation should follow the governance tiers and pre-agreed triggers, and must carry analysis, options and consequences.",
        "A monthly three-pass reading (heat map, shared causes, dependency status) produces the two or three decisions governance must make.",
    ]),
    quiz('qz',
        "R-01 and R-06 are both Technology-pillar risks. What does this lesson recommend about mitigating them?",
        [
            ("Assign them to different owners so each gets full attention", False),
            ("Recognize the shared cause: protecting and resourcing the Technology program as a whole may mitigate both", True),
            ("Accept both, since Technology risks are outside the portfolio's control", False),
            ("Transfer both to the analytics vendor by contract", False),
        ],
        "Risks with a shared cause are likely to materialize together and, through the dependency chain, to degrade Economics and Clinical at the same time. Managing them separately can miss that the most effective response is common to both. Reading the register by shared cause makes that response visible."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.9, Figures 15.6-15.7 (risk register and heat map), §15.14 (HTR Simulator and Impact Simulation guidance)"),
    blk('src2', "[2] HTR Simulator — https://healthtransformationreview.org/htr-simulator — dependency cascade through delivered pillar values; Vermont, Fall 2026 preset"),
    blk('src3', "[3] HTR Impact Simulation — https://healthtransformationreview.org/impact-simulation — modelling a component slip across pillars"),
    blk('src4', "[4] Project Management Institute, projectmanagement.com, 5 Strategies for Dealing With Threats — https://www.projectmanagement.com/blog-post/68098/5-strategies-for-dealing-with-threats — escalation to program, portfolio or upper management"),
]

# ════════════════════════════════════════════════════════════════════════════
L12_SLUG = 'tpm-benefits-realization'
L12_TITLE = 'Benefits Realization: Tracing Every Component to a Goal'
L12 = [
    blk('intro1', "A portfolio exists to produce benefits, not deliverables. A completed analytics platform, a certified clinic or a new pricing rule matters only because of what it makes possible: affordable premiums, solvent hospitals, better access, a stronger workforce, narrower gaps. Benefits-realization management is the discipline of tracing each component to the benefits it serves and checking that those benefits actually arrive."),
    blk('intro2', "Chapter 15 makes this the Portfolio Manager's core purpose: ensure every component can trace its contribution to one or more of Act 167's five statutory goals, and that the portfolio as a whole produces the benefits that justify its cost. This lesson builds that trace, using the book's benefits-realization plan and PMI's practice guide."),
    blk('intro3', "The Transformation Leadership course covers how to sustain benefits after a reform launches. This lesson concentrates on the earlier step: designing the trace from components to goals, choosing the measures, and using it to make portfolio decisions."),

    h2('s1h1', 'Benefits, Not Deliverables'),
    blk('s1p1', "PMI's Benefits Realization Management: A Practice Guide describes benefits realization as the thread that runs from organizational strategy through project deliverables to the benefits they contribute, across portfolio, program and project management. It sets out shared terminology, core principles and a life cycle for identifying, planning, realizing and sustaining benefits."),
    blk('s1p2', "PMI's own research suggests the discipline is rare. The guide cites the 2018 Pulse of the Profession finding that only one in three organizations report high benefits-realization maturity. Most organizations can say what they delivered; far fewer can say what it achieved."),
    blk('s1p3', "For a transformation, the gap between delivery and benefit is where reforms quietly fail. A global budget can be implemented on time and still fail to slow cost growth. A medical-home program can reach full coverage and still leave access gaps unchanged. Without a benefits trace, the portfolio will report success on every component while the goals that justified it go unmet."),
    blk('s1p4', "Benefits also take longer to appear than deliverables, and they are harder to attribute. Premiums respond to many forces besides one pricing rule; access gaps respond to staffing, transport and income as well as to clinical programs. A benefits plan does not need perfect attribution, but it does need agreed measures and agreed expectations about timing, set before results arrive, so that the portfolio is judged against a standard rather than a story."),
    callout('s1c1', "A deliverable is something the portfolio produces. A benefit is a change in the world the deliverable makes possible. Portfolios are justified by benefits and should be judged by them."),

    h2('s2h1', "Tracing to Act 167's Five Goals"),
    blk('s2p1', "Vermont's portfolio already has its goals in statute. Act 167 of 2022 set five: high-quality, accessible care; financial sustainability; affordability; a robust workforce; and health equity. Figure 15.8 of the book maps the portfolio's components to each goal, names a measurement metric and sets a 2028 target."),
    blk('s2p2', "The mapping shows how benefits depend on combinations of components. High-quality, accessible care draws on the Blueprint medical homes, Certified Community Behavioral Health Clinics, the HEROI equity methodology and the Care Integration Network. Affordability draws on reference-based pricing and global budgets. Health equity draws on HEROI, health-related social-need screening, social-risk adjustment and social-determinants data. No single component delivers any goal alone, which is why benefits have to be managed at portfolio level."),
    blk('s2p3', "The targets are concrete enough to check. For accessible care, 90% or better follow-up within 30 days after behavioral-health hospitalization and readmissions below 12%. For affordability, commercial premium growth below 5% a year and total-cost-of-care growth below inflation plus one point. For the workforce, a primary-care staffing gap below 200 full-time equivalents, from 370."),
    table('s2t1', "Benefits-realization plan (condensed from Figure 15.8)", [
        {'Act 167 goal': 'High-quality, accessible care', 'Contributing components': 'Blueprint PCMH; CCBHC; HEROI; CIN', '2028 target': '90%+ BH follow-up; readmission <12%; access gap <6 pts'},
        {'Act 167 goal': 'Financial sustainability', 'Contributing components': 'RBP; global budgets; HCC gap closure; PMO', '2028 target': 'No hospital in structural operating loss; deficit trajectory reversed'},
        {'Act 167 goal': 'Affordability', 'Contributing components': 'RBP methodology; global budgets', '2028 target': 'Premium growth <5%/yr; TCOC growth below CPI+1%'},
        {'Act 167 goal': 'Robust workforce', 'Contributing components': 'RHT workforce investments; AI-scribe grants', '2028 target': 'Primary-care FTE gap <200 (from 370); travel-nurse cost <5% of labor'},
        {'Act 167 goal': 'Health equity', 'Contributing components': 'HEROI; HRSN screening; social-risk adjustment; SDOH data', '2028 target': 'BIPOC access >87%; NEK uninsurance <5%; gaps documented and targeted'},
    ]),

    h2('s3h1', 'Choosing Measures: Leading and Lagging'),
    blk('s3p1', "The 2028 targets in Figure 15.8 are lagging indicators: they show whether benefits arrived, but only after the fact. A portfolio office also needs leading indicators that show early whether benefits are on course. For affordability, a leading indicator might be the share of hospital revenue under the new pricing methodology; for equity, the share of hospitals using stratified quality data in their plans."),
    blk('s3p2', "Leading indicators should be tied to the components that produce the benefit and measured on the portfolio's monthly or quarterly cadence. Lagging indicators are reviewed less often, typically quarterly against the Vermont Scorecard and annually at portfolio rebalancing, which is the cadence the book's roadmap sets."),
    blk('s3p3', "Equity measures need special care. Chapter 10's principle, calibrate for the gap and not the average, applies here: a portfolio can raise an average while widening a gap. Benefits for equity should therefore be measured as gaps between groups or regions, as Figure 15.8 does with the BIPOC access target and Northeast Kingdom uninsurance, not as statewide averages."),
    compare('s3cmp1', 'Two kinds of benefit measure',
        'Leading', [
            'Early signals that a benefit is on course',
            'Tied to specific components',
            'Reviewed monthly or quarterly',
        ],
        'Lagging', [
            'Confirm that the benefit arrived',
            'Tied to the statutory goals',
            'Reviewed quarterly and at annual rebalancing',
        ]),

    h2('s4h1', 'Using Benefits to Make Portfolio Decisions'),
    blk('s4p1', "The benefits trace is a decision tool. It tells the Portfolio Manager which components are essential to which goals, so that when resources are short the portfolio protects the components on which the most benefit depends. It also reveals goals served by few components, which are more fragile: the workforce goal, for example, depends on a narrow set of investments."),
    blk('s4p2', "Most importantly, it supports the hardest portfolio decision: stopping work. Chapter 15 gives the Portfolio Manager the duty of tracking benefits realization and recommending that a component be terminated when its benefits are no longer achievable. Without a benefits trace, that judgment cannot be made on evidence, and components continue on momentum."),
    blk('s4p3', "The trace also connects the portfolio to its overseers. Legislators and boards care about the five goals, not the nineteen components. Reporting progress goal by goal, with the contributing components underneath, gives them the view they need and makes the portfolio's purpose visible in every report."),
    blk('s4p4', "Benefits also guide sequencing at the margin. When two components compete for the same scarce resource and both are unblocked, the one contributing to more goals, or to a goal with fewer other contributors, usually has the stronger claim. The dependency logic decides what can run; the benefits trace helps decide what should run first among the things that can."),
    example('s4ex1', "Chapter 15's benefits-realization plan", "Figure 15.8 maps Vermont's components to Act 167's five goals with a measurement metric and a 2028 target for each. Financial sustainability, for instance, draws on reference-based pricing, global budgets, coding-gap closure and the portfolio office itself, and is measured by operating margin, deficit trajectory and administrative cost per discharge, with a 2028 target of no hospital in structural operating loss and the deficit trajectory reversed."),

    h2('s5h1', 'Build Your Own Benefits Trace'),
    blk('s5p1', "Start from your goals, not your components. Write down the outcomes your transformation exists to achieve, in the form your overseers would recognize: statutory goals, board-approved strategic aims or contractual targets. Then, for each goal, list the components that contribute to it and how."),
    blk('s5p2', "Every component should appear under at least one goal. A component that serves no goal is a candidate for stopping. A goal with no contributing component is a gap in the portfolio. For each goal, choose one or two lagging measures with a target and date, and one or two leading measures you can track on the portfolio's regular cadence."),
    blk('s5p3', "Review the trace at each quarterly performance review and at the annual rebalancing. When a benefit is drifting off course, the trace shows which components to examine first; when a component is no longer able to deliver its benefit, the trace supplies the evidence for a decision to stop or redesign it."),
    blk('s5p4', "Share the trace with the people who run the components. Component leads who can see which goals their work serves make better day-to-day choices, and they are the first to notice when a deliverable is on track but its benefit is not."),
    steps('s5st1', 'A benefits trace in five steps', [
        ("List the goals", "In the terms your overseers use."),
        ("Map components to goals", "Every component under at least one goal; flag orphans and gaps."),
        ("Set lagging measures", "One or two per goal, with a target and a date."),
        ("Add leading measures", "Early signals tied to the contributing components."),
        ("Review on cadence", "Quarterly performance reviews and annual rebalancing; recommend stopping components whose benefit is no longer achievable."),
    ]),

    takeaway('tw', [
        "Portfolios are justified by benefits, not deliverables; benefits realization traces each component to the change it is meant to produce.",
        "PMI's Benefits Realization Management practice guide links strategy, deliverables and benefits across portfolio, program and project.",
        "PMI reports that only one in three organizations have high benefits-realization maturity (Pulse of the Profession 2018).",
        "Chapter 15 maps Vermont's components to Act 167's five goals, each with a metric and a 2028 target (Figure 15.8).",
        "Pair lagging measures that confirm benefits with leading measures that show early whether they are on course; measure equity as gaps, not averages.",
        "The trace supports portfolio decisions, including recommending termination when a component's benefit is no longer achievable.",
        "Every component should serve at least one goal and every goal should have contributing components; orphans and gaps are both findings.",
    ]),
    quiz('qz',
        "In building a benefits trace, you find a component that contributes to none of the portfolio's goals. What does this lesson suggest?",
        [
            ("Keep it, since it is already in the inventory", False),
            ("Treat it as a candidate for stopping, or find and document the goal it truly serves", True),
            ("Create a new goal so the component has one", False),
            ("Move it to another pillar", False),
        ],
        "Every component should trace to at least one goal. A component that serves none either has an undocumented purpose, which should be made explicit, or is consuming resources without contributing to the portfolio's benefits, which makes it a candidate for termination. Inventing a goal to fit a component reverses the logic of benefits realization."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.10 and Figure 15.8 (benefits-realization plan), §15.4 (termination duty), §15.12 (review cadence)"),
    blk('src2', "[2] Project Management Institute, Benefits Realization Management: A Practice Guide — https://www.pmi.org/standards/benefits-realization — benefits life cycle; cites Pulse 2018: one in three organizations report high benefits-realization maturity"),
    blk('src3', "[3] Vermont Act 167 of 2022, as enacted — https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf — the five statutory goals"),
    blk('src4', "[4] Health Transformation Review, Transforming Healthcare, Chapter 10 and Appendix E — https://healthtransformationreview.org/read/chapter-10 — calibrating for the gap, not the average; the Vermont Scorecard"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
