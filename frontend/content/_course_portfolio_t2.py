exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_portfolio_common.py').read())

# Track 2 — Structure: Roles, Governance and Authority
# Vermont facts: HTR book Chapter 15 (§15.4-15.6, Figures 15.4-15.5, §15.13, §15.15).
# Credential facts verified 2026-10-27 on pmi.org certification pages (PfMP, PMP, PMI-ACP).
# GAO Schedule Assessment Guide GAO-16-89G (Dec 2015): ten best practices, four characteristics.

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'tpm-portfolio-manager'
L4_TITLE = 'The Portfolio Manager: Role, Authority and Credentials'
L4 = [
    blk('intro1', "Nineteen components, shared stage gates, one January 2028 deadline, three statutory predecessors and the closeout obligations of a withdrawn federal agreement. Chapter 15 concludes that this is not a problem component managers can solve by working harder or coordinating better among themselves. It needs a single designated authority with the mandate and the access to manage the transformation as a whole: a Portfolio Manager."),
    blk('intro2', "This lesson defines that role as the book does: what the Portfolio Manager does, the authority the role must carry to be useful, the credential that fits it, and where the role should sit. It also explains why contracted support, however expert, cannot fill it."),
    blk('intro3', "The central message is that the role is defined by its authority more than its tasks. Many people can maintain a register or chair a meeting. Only a role with the power to sequence work can change what the portfolio delivers."),

    h2('s1h1', 'Why One Integrator'),
    blk('s1p1', "Component managers optimize their components. That is their job, and they should do it well. But a portfolio's most important decisions are the ones no component manager can make: which component gets scarce staff this quarter, which one should wait for an upstream dependency, which one should be stopped because its benefits are no longer achievable. Left to negotiation among peers, those decisions default to whoever has the nearest deadline or the loudest sponsor."),
    blk('s1p2', "Chapter 15's Implications section puts the point sharply for state leaders. Vermont does not lack oversight: it has the Health Care Advisory Committee (HCAC), monthly legislative reporting and federal review. What it lacks is an integrator, one role accountable for the portfolio as a whole, with authority to resolve resource conflicts between components that today are managed by different units against different deadlines."),
    blk('s1p3', "The idea is not new to Vermont. Oliver Wyman's Act 167 report recommended a dedicated project-management function to manage the state's transformation portfolio, the November 2025 transformation report repeated the finding, and the AHS restructuring analysis in Chapter 16 identifies establishing a portfolio office as a critical organizational project. Chapter 15's contribution is a precise definition of the role."),
    quote('s1q1', "The single most consequential decision is not whether to hire a Portfolio Manager but whether that role is given authority over sequencing. (Transforming Healthcare, Chapter 15)"),

    h2('s2h1', 'What the Portfolio Manager Does'),
    blk('s2p1', "The book lists the role's responsibilities in summary. The Portfolio Manager chairs the monthly portfolio review board and maintains the portfolio register and the risk register. The role authorizes components being added to or removed from the portfolio, keeps every component aligned to Act 167's five statutory goals, and resolves resource conflicts between components."),
    blk('s2p2', "The role also faces outward. It owns the Vermont Scorecard reporting to the HCAC and the AHS Secretary, manages portfolio-level relationships with the HCAC, the Green Mountain Care Board, hospital chief executives, the Legislature and CMS, and tracks benefits realization, recommending that a component be terminated when its benefits are no longer achievable."),
    blk('s2p3', "Read the list for what is missing as much as what is present. The Portfolio Manager does not run components, write rules, design payment models or manage hospitals. Every duty concerns the portfolio as a whole: its composition, its alignment, its resources, its risks, its benefits and its story to the people who oversee it."),
    table('s2t1', 'Portfolio Manager responsibilities (Chapter 15, §15.4)', [
        {'Area': 'Governance', 'Responsibility': 'Chair the monthly portfolio review board'},
        {'Area': 'Composition', 'Responsibility': 'Maintain the portfolio register; authorize adding and removing components'},
        {'Area': 'Alignment', 'Responsibility': "Keep every component aligned to Act 167's five goals"},
        {'Area': 'Resources', 'Responsibility': 'Resolve cross-component resource conflicts'},
        {'Area': 'Risk', 'Responsibility': 'Maintain the portfolio risk register'},
        {'Area': 'Benefits', 'Responsibility': 'Track benefits realization; recommend terminating components whose benefits are no longer achievable'},
        {'Area': 'Reporting and stakeholders', 'Responsibility': 'Own Scorecard reporting; manage relationships with HCAC, GMCB, hospitals, the Legislature and CMS'},
    ]),

    h2('s3h1', 'Authority Is the Job'),
    blk('s3p1', "A Portfolio Manager without authority becomes a reporting function: it documents the portfolio's problems without being able to fix them. The book specifies the authority the role needs. It reports directly to the AHS Secretary, with a co-reporting relationship to the Green Mountain Care Board. It holds budget authority over the transformation PMO. And it can require reporting from all nineteen component leads."),
    blk('s3p2', "The most important power is over sequencing. The book is direct: a portfolio office that reports status without the power to hold a component back until its upstream gate opens will document the failure cascade rather than prevent it. Holding a component back is uncomfortable, because the component's sponsors will see it as a delay. It is also the single decision that most distinguishes a managed portfolio from a list of projects."),
    blk('s3p3', "Authority also has limits, and the book draws them clearly when answering the objection that hospitals will not accept being managed by AHS. The Portfolio Manager does not manage the hospitals. It manages AHS's contribution to the portfolio. Hospital plans are produced by hospitals, approved by AHS and monitored through the Green Mountain Care Board. The role is an orchestrator, not a controller."),
    compare('s3cmp1', 'Two versions of the same job title',
        'Reporting function', [
            'Collects status from components',
            'Escalates conflicts to someone else',
            'Cannot pause or stop a component',
            'Documents the failure cascade',
        ],
        'Portfolio Manager with authority', [
            'Sets the portfolio register and its priorities',
            'Resolves resource conflicts',
            'Can hold a component until its upstream gate opens',
            'Prevents the failure cascade',
        ]),

    h2('s4h1', 'The Credential: PMI Portfolio Management Professional'),
    blk('s4p1', "The book names PMI's Portfolio Management Professional (PfMP) credential as the appropriate one for the role, together with substantial program or portfolio experience and experience in health systems or large-scale government programs. The PfMP is PMI's credential for practitioners who manage portfolios aligned to organizational strategy."),
    blk('s4p2', "PMI's current eligibility rules offer three paths, all requiring 96 months (eight years) of professional business experience within the past fifteen years. With a secondary diploma, a candidate also needs 84 months of portfolio-management experience. With a bachelor's degree or higher, the requirement is 48 months. With a degree from a program accredited by PMI's Global Accreditation Center, it is 36 months. Requirements change, so check PMI's current exam content outline before relying on these figures."),
    blk('s4p3', "A credential is evidence of method, not a substitute for judgment. For a state transformation, the book pairs it with health-system or government program experience, because the hardest parts of the job are political and institutional: persuading agencies to share resources, telling a sponsor that their component must wait, and explaining the portfolio's logic to a legislature."),
    table('s4t1', 'PfMP eligibility paths (PMI, as of October 2026)', [
        {'Path': 'A', 'Education': 'Secondary diploma or equivalent', 'Portfolio-management experience': '84 months within 15 years', 'Business experience': '96 months within 15 years'},
        {'Path': 'B', 'Education': "Bachelor's degree or higher", 'Portfolio-management experience': '48 months within 15 years', 'Business experience': '96 months within 15 years'},
        {'Path': 'C', 'Education': 'Degree from a GAC-accredited program', 'Portfolio-management experience': '36 months within 15 years', 'Business experience': '96 months within 15 years'},
    ]),

    h2('s5h1', 'Where the Role Sits, and What Contractors Cannot Do'),
    blk('s5p1', "For Vermont, the book places the role at the level of the AHS Secretary, or as a dedicated chief portfolio officer. For a hospital or health system, the equivalent sits close to the chief executive or chief strategy officer, above the individual program leads. In either case the test is the same: can the role move resources and change the order of work across organizational boundaries? If not, it is placed too low."),
    blk('s5p2', "The fifth objection the book answers is that AHS already has expert help. Its March 2026 Act 68 report lists contracted transformation support from Manatt, Phelps & Phillips, a new hospital technical-assistance vendor, and analytics support under negotiation. The book's reply is that a contractor delivers a defined scope. It cannot hold a state component back until its upstream gate opens, reassign agency staff between components, or answer to the Legislature for the portfolio as a whole."),
    blk('s5p3', "Contracted support adds capacity, not authority. Worse, every new contract is one more component, with its own deliverables and deadline, that someone has to sequence. The more expert help a transformation buys, the more it needs a portfolio manager to integrate it."),
    blk('s5p4', "Timing matters as much as placement. The book's roadmap puts a Portfolio Manager in the seat by January 2027, nine months before FY2028 hospital budgets take effect in October 2027, so the role is running before the Technology gate it is meant to protect. A portfolio manager hired after the gating decisions have been made can only report on their consequences."),
    warning('s5w1', "Do not appoint a coordinator and call it a portfolio manager", "A coordinator who schedules meetings and compiles reports is useful, but it is not the role Chapter 15 describes. If the person cannot resolve a resource conflict or hold a component back, the portfolio still has no integrator."),

    takeaway('tw', [
        "A transformation of Vermont's scale needs a single integrator, because the portfolio's key decisions cannot be made by component managers negotiating among themselves.",
        "Vermont has oversight bodies but no integrator: no role accountable for the whole with authority over resource conflicts between components.",
        "The Portfolio Manager chairs the review board, maintains the portfolio and risk registers, keeps components aligned to Act 167's goals, resolves resource conflicts, owns Scorecard reporting and tracks benefits.",
        "The role needs authority: a direct report to the AHS Secretary, a GMCB co-reporting line, budget authority over the PMO and power to require reporting from every component lead.",
        "The decisive power is over sequencing: without it, a portfolio office documents the failure cascade instead of preventing it.",
        "PMI's PfMP requires 96 months of business experience plus 84, 48 or 36 months of portfolio experience depending on education.",
        "Contractors add capacity, not authority, and each new contract is another component someone has to sequence.",
    ]),
    quiz('qz',
        "Which power most distinguishes the Portfolio Manager Chapter 15 describes from a reporting function?",
        [
            ("The power to produce monthly status reports for the Legislature", False),
            ("The authority to hold a component back until its upstream gate opens, and to resolve resource conflicts between components", True),
            ("The power to approve or reject each hospital's transformation plan directly", False),
            ("The power to hire contractors for each component", False),
        ],
        "The book is explicit that a portfolio office reporting status without power over sequencing will document the failure cascade rather than prevent it. Hospital plans are approved by AHS and monitored through the GMCB, not run by the Portfolio Manager, and contractors add capacity rather than authority."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.4 (role and authority), §15.13 objections 4 and 5, §15.15 Implications for You"),
    blk('src2', "[2] Project Management Institute, Portfolio Management Professional (PfMP) — https://www.pmi.org/certifications/portfolio-management-pfmp — eligibility paths and experience requirements"),
    blk('src3', "[3] Project Management Institute, The Standard for Portfolio Management, 4th edition (2017) — https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — the portfolio manager's role"),
    blk('src4', "[4] Oliver Wyman, Act 167 Community Engagement and recommendations to the Green Mountain Care Board (2024) — https://gmcboard.vermont.gov/hospitalsustainability — recommendation for a dedicated project-management function"),
]

# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'tpm-program-managers-governance'
L5_TITLE = 'Pillar Program Managers and the Three Governance Tiers'
L5 = [
    blk('intro1', "A Portfolio Manager cannot manage nineteen components directly. Below the portfolio sits the program level, and in the five-pillar framework the programs are the pillars themselves. Each pillar needs a program manager who manages its components as a coherent whole and answers to the Portfolio Manager for them."),
    blk('intro2', "This lesson describes the five pillar program manager roles in Chapter 15, the credentials that fit them, and the three-tier governance structure PMI defines for a portfolio. It closes with what changes when the same structure is built inside a hospital rather than a state agency."),
    blk('intro3', "Structure is the part of portfolio management that organizations most often skip, because it feels like overhead. The book's argument is that it is the opposite: without it, the coordination work still has to happen, but it happens informally, inconsistently and invisibly."),

    h2('s1h1', 'Each Pillar Is a Program'),
    blk('s1p1', "In PMI's terms, a program is a group of related projects managed together for benefits no single project could deliver. Chapter 15 treats each pillar as exactly that. The Technology pillar's components, the analytics platform, the health information exchange, the Care Integration Network and the AI-governance framework, only produce a usable data substrate together. The Economics pillar's components only change hospital incentives together."),
    blk('s1p2', "So each pillar needs a designated accountability point with the skills and authority to manage its components as one program. The book is careful that these roles are not exclusive to the state agency. For hospital-owned components, the program manager may sit in a hospital's project office; for state-administered components, in AHS. What matters is that every pillar has one."),
    blk('s1p3', "The pillar program manager's distinctive job is managing interdependencies inside the pillar and reporting the pillar's readiness upward, because the pillar's readiness is what opens or closes the gate for the pillars downstream of it."),
    callout('s1c1', "A pillar program manager owns two things a project manager does not: the dependencies between the pillar's own components, and the pillar's readiness as an input to every pillar downstream."),

    h2('s2h1', 'Five Roles, One Framework'),
    blk('s2p1', "Figure 15.4 of the book sets out the five roles. Each pairs a project-management credential with domain experience, names the key deliverables the role is accountable for, and specifies a dual reporting line: to the Portfolio Manager for the portfolio, and to the domain leader who owns the pillar's subject matter."),
    blk('s2p2', "The dual reporting is deliberate. The Payment Reform Program Manager answers both to the Portfolio Manager and to the Green Mountain Care Board's executive director, because the board owns hospital budgets and pricing. The Clinical Transformation Program Manager answers to the Portfolio Manager and to the Blueprint director and Medicaid medical director, because clinical programs run through them. Dual reporting keeps the program manager connected to both the portfolio's logic and the domain's expertise."),
    blk('s2p3', "Notice that the deliverables are dated and specific: analytics vendor operational by January 2027, reference-based-pricing rates in effect for FY2028, 100% patient-centered medical home coverage by FY2028, the portfolio office operational by the second quarter of 2027. A program manager is accountable for outcomes with dates, not for activity."),
    table('s2t1', 'Pillar program manager roles (from Figure 15.4)', [
        {'Pillar': 'Policy', 'Role': 'Policy Transformation Program Manager', 'Credential': 'PMP + health-policy experience; PMI-ACP for agile rulemaking', 'Key deliverables': 'RBP methodology (FY2027); Strategic Plan (Jan 2028)'},
        {'Pillar': 'Technology', 'Role': 'Health IT Program Manager', 'Credential': 'PMP + health informatics; PMI-ACP', 'Key deliverables': 'Analytics vendor operational (Jan 2027); CIN Phase 1 (FY2028)'},
        {'Pillar': 'Economics', 'Role': 'Payment Reform Program Manager', 'Credential': 'PMP + healthcare finance; financial-modeling skills', 'Key deliverables': 'RBP rates in effect (FY2028); non-CAH global budgets (FY2028)'},
        {'Pillar': 'Clinical', 'Role': 'Clinical Transformation Program Manager', 'Credential': 'PMP + clinical background (RN/LCSW)', 'Key deliverables': '100% PCMH (FY2028); CoCM 80%+ (FY2028)'},
        {'Pillar': 'Operations', 'Role': 'Hospital Transformation Program Manager', 'Credential': 'PMP + hospital-operations or turnaround experience', 'Key deliverables': '14 hospital plans implemented; PMO operational (Q2 2027)'},
    ]),

    h2('s3h1', 'The Credentials: PMP and PMI-ACP'),
    blk('s3p1', "The book recommends PMI's Project Management Professional (PMP) credential for every pillar role, with PMI's Agile Certified Practitioner (PMI-ACP) credential added where a pillar's work is adaptive. The PMP is the general credential for leading projects. PMI's current eligibility rules offer three paths: a secondary diploma with 60 months of project-management experience; a bachelor's degree with 36 months; or a degree from a GAC-accredited program with 24 months. The first two also require 35 hours of project-management education, which a CAPM certification can satisfy, and experience counts within the past eight years."),
    blk('s3p2', "The PMI-ACP covers agile methods. PMI requires 21 contact hours of formal training in agile practices together with agile project experience; published summaries of the exact experience rules differ, so candidates should check PMI's current handbook. Lesson 8 of this course explains why the book pairs PMI-ACP with the Technology and Policy roles in particular: the AI-governance framework, the Care Integration Network build-out and parts of rulemaking evolve faster than a fixed plan can anticipate."),
    blk('s3p3', "As with the PfMP, the credential signals method rather than guaranteeing results. The book's pairing of each credential with specific domain experience, health policy, informatics, finance, clinical practice or hospital turnaround, reflects that pillar program managers have to understand the substance of their components well enough to judge when one is truly ready."),
    stat_grid('s3sg1', [
        ('36 months', 'PMP project experience with a bachelor\'s degree', 'PMI PMP eligibility (60 months with a secondary diploma; 24 with a GAC-accredited degree)'),
        ('35 hours', 'Project-management education for the PMP', 'PMI PMP eligibility (paths A and B)'),
        ('21 hours', 'Agile training for the PMI-ACP', 'PMI PMI-ACP eligibility'),
        ('5', 'Pillar program manager roles in Vermont\'s design', 'Chapter 15, Figure 15.4'),
    ]),

    h2('s4h1', 'Three Governance Tiers'),
    blk('s4p1', "PMI defines three tiers of portfolio governance. The Portfolio Governance Body provides strategic oversight: it sets direction, approves the portfolio's composition and makes decisions above the Portfolio Manager's authority. For Vermont, the book identifies this body as the AHS Secretary together with the HCAC and the Green Mountain Care Board. The Portfolio Management Office provides operational coordination; in Vermont that is currently the under-resourced AHS Health Reform Office. The component level is the individual programs and projects."),
    blk('s4p2', "The first of the five objections answered in Chapter 15 turns on this distinction. Asked whether the HCAC and monthly reports already provide portfolio management, the book replies that the HCAC is a governance body, not a portfolio office. It provides oversight, not an integrated master schedule, resource-conflict resolution, a maintained risk register or earned-value tracking. The HCAC is the governance tier; it needs a Portfolio Manager and an office to give it the data to govern."),
    blk('s4p3', "The book lists the gaps that establishing the portfolio office must fill: a dedicated Portfolio Manager with the PfMP credential, two PMO analysts, portfolio-management software, standardized reporting, the five pillar program managers, and formal project leads for all nineteen components."),
    steps('s4st1', 'The three tiers in Vermont', [
        ("Portfolio Governance Body", "AHS Secretary, HCAC and GMCB: strategic oversight and decisions above the Portfolio Manager's authority."),
        ("Portfolio Management Office", "Today the under-resourced AHS Health Reform Office; needs a Portfolio Manager, two analysts, software and standard reporting."),
        ("Pillar programs", "Five program managers, each managing a pillar's components as one program."),
        ("Components", "Formal leads for all nineteen components, reporting through their pillar program."),
    ]),

    h2('s5h1', 'The Same Structure Inside a Hospital'),
    blk('s5p1', "A hospital or health system running its own transformation faces the same structural problem at smaller scale. Its governance body is the board or a board committee. Its portfolio office is the transformation or strategy office. Its programs may map to the five pillars, or to service lines with the pillars as a cross-check. What carries over is the principle: each level exists, is staffed, and knows which decisions belong to it."),
    blk('s5p2', "The book's advice to hospital project-office leaders is to treat Figure 15.3 as a template. Build the inventory, assign each component a pillar, an owner, a type and a stage gate, and then assign each pillar an accountable program lead. Small organizations can combine roles, one person leading two pillars, but should not leave a pillar without a named lead."),
    blk('s5p3', "Hospitals also sit inside the state's portfolio. Several of Vermont's components are hospital-owned, and the fourteen hospital transformation plans are a single Operations program at state level. A hospital whose own portfolio office maps cleanly onto the state's pillars makes coordination with the state far easier, because both sides then speak about the same components in the same terms."),
    highlight('s5hl1', "Combining roles is acceptable in a small organization. Leaving a pillar with no named program lead is not; that pillar's dependencies will go unmanaged."),

    takeaway('tw', [
        "In the five-pillar framework each pillar is a program: its components only deliver their benefit together.",
        "Every pillar needs a designated program manager, who may sit in the state agency or in a hospital project office depending on who owns the components.",
        "The five roles in Figure 15.4 pair a PMP with domain experience, carry dated deliverables and report both to the Portfolio Manager and to a domain leader.",
        "PMP eligibility requires 60, 36 or 24 months of project experience depending on education; PMI-ACP requires 21 hours of agile training plus agile experience.",
        "PMI's three governance tiers are the governance body, the portfolio office and the component level; Vermont's governance body is the AHS Secretary with the HCAC and GMCB.",
        "The HCAC is a governance body, not a portfolio office; it needs a Portfolio Manager and an office to supply the data it governs with.",
        "Hospitals can mirror the same structure at smaller scale, combining roles if needed but never leaving a pillar without a named lead.",
    ]),
    quiz('qz',
        "Why does Chapter 15 say the HCAC and monthly reports are not a substitute for a portfolio office?",
        [
            ("Because the HCAC has no legal standing under Act 68", False),
            ("Because the HCAC is a governance body that provides oversight, not an integrated master schedule, resource-conflict resolution, a risk register or earned-value tracking", True),
            ("Because monthly reports are not shared with the Legislature", False),
            ("Because the HCAC should be replaced by the Portfolio Manager", False),
        ],
        "PMI separates the governance tier, which provides oversight and makes strategic decisions, from the portfolio office, which runs the operational machinery. The book's answer is that the HCAC is the right governance body but needs a Portfolio Manager and an office to give it the data it needs to govern; it does not replace either."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.5 and Figure 15.4 (pillar roles), §15.6 (governance tiers and PMO gaps), §15.13 objection 1, §15.15"),
    blk('src2', "[2] Project Management Institute, Project Management Professional (PMP) — https://www.pmi.org/certifications/types/project-management-pmp — eligibility paths, education hours and experience window"),
    blk('src3', "[3] Project Management Institute, PMI Agile Certified Practitioner (PMI-ACP) — https://www.pmi.org/acp — agile training and experience requirements"),
    blk('src4', "[4] Project Management Institute, The Standard for Portfolio Management, 4th edition (2017) — https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — portfolio governance tiers"),
    blk('src5', "[5] Project Management Institute, The Standard for Program Management, 5th edition (2024) — https://www.pmi.org/standards/program-management-fifth-edition — programs as coordinated projects producing benefits"),
]

# ════════════════════════════════════════════════════════════════════════════
L6_SLUG = 'tpm-ten-knowledge-areas'
L6_TITLE = 'The Ten Knowledge Areas as a Portfolio-Office Checklist'
L6 = [
    blk('intro1', "What does a portfolio office actually have to run? The PMBOK Guide's sixth edition, published in 2017, organized project management into ten knowledge areas. Later editions reorganized the same ground into principles and performance domains, but Chapter 15 argues that the ten areas remain the clearest checklist of the machinery a portfolio office has to operate."),
    blk('intro2', "This lesson walks the ten areas against Vermont's operational capacity, as Figure 15.5 of the book does. The pattern is consistent: the book addresses every area analytically, but the state lacks the operating machinery to manage it. The lesson then looks closely at integration and scheduling, where federal guidance offers practical standards, and closes with a way to use the checklist on your own organization."),
    blk('intro3', "Use the ten areas as an audit, not as a curriculum. The question for each is not whether your organization understands it but whether someone is actually running it, every month, across the whole portfolio."),

    h2('s1h1', 'From Knowledge Areas to Principles'),
    blk('s1p1', "The ten knowledge areas of the PMBOK Guide's sixth edition are integration, scope, schedule, cost, quality, resource, communications, risk, procurement and stakeholder management. Each describes a body of practice a project or portfolio needs. The seventh edition, published in 2021, moved away from that structure toward principles and performance domains. The eighth edition, published in November 2025, condensed the seventh edition's twelve principles into six, organized practice into seven performance domains, and restored process-level guidance as flexible reference material."),
    blk('s1p2', "The book acknowledges the change and keeps the ten areas for a practical reason. As a checklist, they are concrete. A portfolio office either maintains an integrated master schedule or it does not; it either has a portfolio-level procurement strategy or it lets contracts one at a time. The principles-based editions are better guides to judgment, but the ten areas are a better audit of capacity."),
    blk('s1p3', "Nothing in the later editions makes the ten areas wrong. They describe the same work organized differently. Using the older list as a checklist while reading the newer editions for method is a sensible way to combine the two."),
    callout('s1c1', "A knowledge area is covered only when someone runs it across the whole portfolio on a regular cadence. Understanding it, or running it component by component, does not count."),

    h2('s2h1', "Vermont's Gap, Area by Area"),
    blk('s2p1', "Figure 15.5 reads each area against Vermont's operational capacity. In integration, the dependency map, execution sequence and scorecard exist on paper, but operational integration does not. In scope, no pillar has a formal work-breakdown structure. In schedule, statutory deadlines are tracked in isolation rather than as an integrated master schedule. In cost, Rural Health Transformation Program spending is tracked for federal compliance, not for portfolio performance."),
    blk('s2p2', "The remaining six follow the same pattern. Quality is measured program by program, with no portfolio aggregation. Resources are overcommitted, with no formal leveling across components. Communications and stakeholder engagement run component by component, with no portfolio-level strategy for hospitals, the Green Mountain Care Board, the HCAC, the Legislature or CMS. Risk is analyzed in the book but not managed operationally through a maintained register. Procurement lets contracts for analytics and technical assistance one component at a time."),
    blk('s2p3', "The common thread is the absence of a portfolio layer. Each area is handled, if at all, inside individual components, and so the interactions between components, where the portfolio's real risks live, go unmanaged in all ten."),
    table('s2t1', "The ten knowledge areas against Vermont's operational capacity (Figure 15.5)", [
        {'Knowledge area': 'Integration', 'Operational gap': 'Dependency map, sequence and scorecard exist analytically; operational integration does not'},
        {'Knowledge area': 'Scope', 'Operational gap': 'No formal work-breakdown structure for any pillar'},
        {'Knowledge area': 'Schedule', 'Operational gap': 'Statutory deadlines tracked in isolation, not as an integrated master schedule'},
        {'Knowledge area': 'Cost', 'Operational gap': 'RHT spending tracked for federal compliance, not portfolio performance'},
        {'Knowledge area': 'Quality', 'Operational gap': 'Measured program by program, no portfolio aggregation'},
        {'Knowledge area': 'Resource', 'Operational gap': 'Staff overcommitted, no formal resource leveling'},
        {'Knowledge area': 'Communications', 'Operational gap': 'Reporting runs component by component'},
        {'Knowledge area': 'Risk', 'Operational gap': 'Analyzed but not managed through a maintained register'},
        {'Knowledge area': 'Procurement', 'Operational gap': 'Contracts let one component at a time'},
        {'Knowledge area': 'Stakeholder', 'Operational gap': 'Stakeholders engaged component by component'},
    ]),

    h2('s3h1', 'Integration and Schedule: The Master Schedule'),
    blk('s3p1', "Of the ten areas, integration and schedule matter most for a transformation with a single statutory deadline, and both converge on one artifact: the integrated master schedule. It brings every component's activities into one schedule, with the dependencies between them, so that the effect of one slip on everything downstream can be seen and managed."),
    blk('s3p2', "The U.S. Government Accountability Office publishes the most widely used public standard for judging a schedule. Its Schedule Assessment Guide (GAO-16-89G), issued in December 2015, sets out ten best practices and four characteristics of a reliable schedule: comprehensive, well-constructed, credible and controlled. The practices include capturing and sequencing all activities, assigning resources, confirming that the critical path is valid, conducting a schedule risk analysis, updating the schedule with actual progress, and maintaining a baseline."),
    blk('s3p3', "For a five-pillar portfolio, one addition matters: the schedule's logic must include the dependencies between pillars, not just between activities inside a component. A master schedule that links tasks within each component but treats the pillars as independent will produce a critical path that looks valid and is wrong, because it misses the gates. Track 3 returns to this point in detail."),
    steps('s3st1', "GAO's ten schedule best practices (GAO-16-89G)", [
        ("Capture all activities", "Every activity needed to deliver the work is in the schedule."),
        ("Sequence all activities", "Activities are linked in the order they must happen."),
        ("Assign resources", "Each activity has the resources it needs."),
        ("Establish durations", "Each activity has a realistic duration."),
        ("Trace horizontally and vertically", "The schedule connects across activities and across levels of detail."),
        ("Confirm a valid critical path", "The longest path through the work is identified and credible."),
        ("Ensure reasonable float", "Slack is realistic, not artificially large or small."),
        ("Analyze schedule risk", "Uncertainty in durations is tested."),
        ("Update with actual progress", "The schedule reflects reality, using progress and logic."),
        ("Maintain a baseline", "A baseline exists to measure performance against."),
    ]),

    h2('s4h1', 'Resources, Procurement and Stakeholders'),
    blk('s4p1', "Three of the ten areas are where portfolios most often fail quietly. Resource management at portfolio level means knowing that the same few analysts at the state agency are assigned to five components at once, and leveling that load deliberately rather than letting each component assume it has them. Without leveling, every component's schedule is optimistic, because each counts on people who are also counted elsewhere."),
    blk('s4p2', "Procurement at portfolio level means designing contracts so that they fit the dependency structure: not letting a technical-assistance contract whose work depends on analytics capability before the analytics contract is in place, and avoiding several overlapping contracts each delivering part of the same capability. Stakeholder management at portfolio level means hospitals, regulators, the Legislature and federal partners hear one coherent account of the transformation rather than nineteen separate ones."),
    blk('s4p3', "All three are invisible from inside a component. A component manager sees their own staff, their own contract and their own stakeholders. Only a portfolio view shows the double-booked analyst, the contract sequenced ahead of its dependency, or the hospital chief executive receiving conflicting messages from three state programs in the same week."),
    warning('s4w1', "Each new contract is a new component", "Buying external help without portfolio-level procurement adds work to the portfolio. Every contract has deliverables, deadlines and dependencies that must be sequenced, which is why the book warns that contracted support adds capacity but not authority."),

    h2('s5h1', 'Use the Checklist on Your Own Organization'),
    blk('s5p1', "The ten areas make a fast, honest audit of portfolio capacity. For each area, ask the same two questions: is it being run across the whole portfolio, and on what cadence? An area run inside each component but not across them counts as a gap, because that is where the portfolio's interactions are unmanaged."),
    blk('s5p2', "Most organizations will find, as Vermont did, that they understand all ten and run few of them at portfolio level. That is not a failure of knowledge. It is the predictable result of having no portfolio layer, and it points directly at what a portfolio office has to take on first: usually integration, schedule, resource and risk, because those are where dependency failures show up earliest."),
    blk('s5p3', "Record the audit alongside your component inventory from Lesson 3. Together they describe both what the portfolio contains and how well it is managed, and they form the baseline against which the portfolio office's progress can be measured."),
    steps('s5st1', 'A one-hour capacity audit', [
        ("List the ten areas", "Integration, scope, schedule, cost, quality, resource, communications, risk, procurement, stakeholder."),
        ("Ask two questions per area", "Is it run across the whole portfolio? On what cadence?"),
        ("Name the owner", "Who runs it today? If no one, mark it as a gap."),
        ("Rank the gaps", "Start with integration, schedule, resource and risk."),
        ("Date the audit", "Repeat it quarterly as the portfolio office is built."),
    ]),

    takeaway('tw', [
        "The PMBOK Guide's sixth edition organized project management into ten knowledge areas; the seventh and eighth editions reorganized the same ground into principles and performance domains.",
        "The book keeps the ten areas as a practical checklist of the machinery a portfolio office must run.",
        "Vermont addresses all ten analytically but runs none of them across the whole portfolio.",
        "Integration and schedule converge on the integrated master schedule, which must include dependencies between pillars, not only within components.",
        "GAO's Schedule Assessment Guide sets ten best practices and four characteristics of a reliable schedule: comprehensive, well-constructed, credible and controlled.",
        "Resource, procurement and stakeholder failures are invisible from inside a component and only show at portfolio level.",
        "A one-hour audit asking whether each area is run across the portfolio, by whom and how often, reveals what a portfolio office must take on first.",
    ]),
    quiz('qz',
        "A portfolio's master schedule links every activity inside each component, but treats the five pillars as independent. What is the main risk?",
        [
            ("The schedule will have too many activities to read", False),
            ("The critical path will look valid but be wrong, because it misses the dependencies between pillars", True),
            ("The schedule will fail GAO's requirement to maintain a baseline", False),
            ("Resource leveling becomes impossible", False),
        ],
        "A critical path is only as valid as the logic linking the work. If the gates between pillars are left out, the schedule will show components as able to proceed when their upstream pillar is not ready, so the path it identifies will not be the portfolio's true critical path. Track 3 builds the dependency logic into scheduling decisions."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK15 + " — §15.6 and Figure 15.5: governance architecture and the ten knowledge areas against Vermont's capacity"),
    blk('src2', "[2] U.S. Government Accountability Office, Schedule Assessment Guide: Best Practices for Project Schedules, GAO-16-89G (December 2015) — https://www.gao.gov/products/gao-16-89g — ten best practices; four characteristics of a reliable schedule"),
    blk('src3', "[3] Project Management Institute, A Guide to the Project Management Body of Knowledge, 8th edition (November 2025) — https://www.pmi.org/standards/pmbok — six principles, seven performance domains, process guidance"),
    blk('src4', "[4] Project Management Institute, The Standards Evolution — https://www.pmi.org/pmbok-guide-standards/about — the move from knowledge areas to principles and performance domains"),
    blk('src5', "[5] GAO Innovation Lab, Schedule Guide: Ten Best Practices — https://gaoinnovations.gov/schedule-guide/concepts.html — the practices in summary"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5), (L6_SLUG, L6_TITLE, L6, 6)]
if __name__ == '__main__':
    run(LESSONS)
