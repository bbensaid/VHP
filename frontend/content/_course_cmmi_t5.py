exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_cmmi_common.py').read())

# Track 5 — The Practitioner Framework
# Built on HTR book Chapter 3 §3.7 (policy monitoring and policy impact assessment) and on the dated, primary-source cases
# verified in lessons 1-12 of this course. Platform tools confirmed to exist in the repo 2026-11-23:
# /research-lab/policy-quality?tab=policy-impact (Policy Impact Assessment Framework), ?tab=medicaid-wr, ?tab=hr1-cliff,
# and /medicaid-eligibility-simulator.

# ════════════════════════════════════════════════════════════════════════════
L13_SLUG = 'cmmi-policy-monitoring'
L13_TITLE = 'Policy Monitoring: Four Functions and a Weekly Routine'
L13 = [
    blk('intro1', "The first twelve lessons covered a great deal of policy, and the single most important fact about them is how fast it moved. Between March 2025 and November 2026, the Innovation Center ended models, restructured its flagship state model and announced a new one; Congress rewrote the budget neutrality test for waivers; CMS issued a budget neutrality letter, a prior authorization deadline passed, a work requirement rule was issued, challenged in court and softened by an enforcement delay. Anyone who tracked this by occasionally reading the news was surprised several times."),
    blk('intro2', "Chapter 3 says that policy strategy is primarily about anticipation: understanding what the environment will require 18 to 36 months from now and positioning the organization to comply at manageable cost. Anticipation needs a standing monitoring system. This lesson sets out the four functions Chapter 3 recommends, the sources behind each, a weekly routine that fits a small team and the verification habits the earlier lessons showed to be necessary."),
    blk('intro3', "It also uses the corrections found while building this course as evidence for why the habits matter."),

    h2('s1h1', 'Twenty Months in One Table'),
    blk('s1p1', "The sequence below is drawn from the primary documents the earlier lessons read. It is not complete, but it shows the tempo a monitoring system must match: a significant federal change roughly every two months, from different agencies, in different forms."),
    table('s1t1', 'Federal changes that affected state health policy, March 2025 to November 2026', [
        {'Date': 'Mar 4, 2025', 'Change': 'CMS rescinds HRSN guidance; existing 1115 approvals stand', 'Form': 'Informational bulletin'},
        {'Date': 'Mar 12, 2025', 'Change': 'CMS announces four models to end early, including Maryland TCOC and Making Care Primary', 'Form': 'Fact sheet'},
        {'Date': 'Sep 3, 2025', 'Change': 'AHEAD changed: Cohort 2 and 3 performance start moves to Jan 1, 2028', 'Form': 'Model announcement'},
        {'Date': 'Dec 18, 2025', 'Change': 'LEAD announced as successor to ACO REACH', 'Form': 'Model announcement'},
        {'Date': 'Jan 1, 2026', 'Change': 'TEAM begins; prior authorization decision times take effect', 'Form': 'Final rules'},
        {'Date': 'Jun 1, 2026', 'Change': 'Interim final rule on Medicaid work requirements', 'Form': 'Interim final rule'},
        {'Date': 'Jun 11, 2026', 'Change': 'Budget neutrality letter SMD #26-003 under section 1115(g)', 'Form': 'State Medicaid Director letter'},
        {'Date': 'Jul 7, 2026', 'Change': 'CMS notifies Vermont that its Medicaid hospital global budget is out of compliance', 'Form': 'Compliance letter'},
        {'Date': 'Oct 29, 2026', 'Change': 'Federal court vacates the interim rule\'s medical frailty definition', 'Form': 'Court ruling'},
        {'Date': 'Nov 13, 2026', 'Change': 'Optional hold harmless period for work requirements through June 30, 2027', 'Form': 'Press release and guidance'},
    ]),
    blk('s1p2', "Notice the variety of forms: bulletins, fact sheets, rules, letters, court rulings. A system that watches only the Federal Register would have missed several of the most consequential. The state-specific letter of July 7 appears on a CMS demonstrations page, not in any regular publication."),

    h2('s2h1', "Chapter 3's Four Functions"),
    blk('s2p1', "Chapter 3 proposes a minimum viable monitoring framework with four functions, proportionate to an organization's size and regulatory exposure. Federal rulemaking surveillance tracks proposed rules from CMS, ONC and other agencies through the Federal Register notice and comment process; Chapter 3 notes that final rules generally take effect 30 to 60 days after publication and that proposed rules typically open comment periods of 30 to 60 days that can be used for impact assessment and comment letters."),
    blk('s2p2', "State legislative monitoring tracks legislation through the session. Chapter 3 observes that Vermont produces significant health legislation every year, and that organizations not engaged in the legislative process are consistently surprised by it. CMMI model pipeline monitoring tracks announcements, application deadlines and eligibility criteria; new models often have narrow application windows. Regulatory intelligence tracks the decisions and guidance of regulators and agencies, including the Green Mountain Care Board's hospital budget guidance and methodology updates, and CMS guidance documents."),
    blk('s2p3', "The table above suggests a fifth thread the book does not name separately: enforcement and litigation. The July compliance letter and the October ruling were not rulemaking and not legislation, yet each changed what a state or provider could do. Treat enforcement notices, court decisions and agency FAQ updates as part of regulatory intelligence, and assign them an owner."),
    compare('s2cmp1', 'Where the signal appears',
        'Scheduled and public', [
            'Federal Register proposed and final rules, with comment periods',
            'State legislative bills and hearings',
            'CMS model pages and announced application windows',
        ],
        'Unscheduled and targeted', [
            'State Medicaid Director letters and informational bulletins',
            'State-specific compliance or approval letters',
            'Court decisions and agency FAQ updates',
        ]),

    h2('s3h1', 'A Source Map'),
    steps('s3st1', 'Where to look, by function', [
        ('Federal rules', 'The Federal Register and the CMS rulemaking pages, including interim final rules, which take effect before comments close.'),
        ('Models', 'Each Innovation Center model has its own page with participants, performance periods and amendments; check them monthly.'),
        ('Medicaid guidance', 'The medicaid.gov federal policy guidance and section 1115 demonstration pages, where State Medicaid Director letters and state-specific approvals and letters are posted.'),
        ('State', 'The Vermont legislature, the Green Mountain Care Board and the Agency of Human Services, including its Global Commitment Register of proposed policies and comment periods.'),
        ('Courts and trade press', 'Federal court rulings and the reports of KFF, the American Hospital Association and the AMA, used to find primary documents, not to replace them.'),
    ]),
    blk('s3p1', "Secondary sources are indispensable for finding what happened and unreliable for what exactly it says. Each time this course relied on a summary, a primary document later changed or sharpened the detail. The lesson on the July 2026 letter illustrates it best: reports described the event loosely, while the letter itself named the specific special terms and conditions and the 60-day and six-month deadlines."),

    h2('s4h1', 'The Verification Habit'),
    blk('s4p1', "Three findings from building this course show why a monitoring system needs a verification step. Chapter 3 lists Maryland's Total Cost of Care model as a current example of a stronger design; CMS announced in March 2025 that it would end early. Chapter 3 says the 72-hour and seven-day prior authorization response times apply to federal-exchange plans; CMS's fact sheet says they apply to all impacted payers except qualified health plan issuers on the federal exchanges. And Chapter 3 describes budget neutrality as a negotiated without-waiver calculation; the statute and CMS's June 2026 letter replace that approach from 2027."),
    blk('s4p2', "None of these is a failure of care by the book's authors. They show how a document ages, and how a secondary or earlier source can carry a detail forward after the primary source has changed. The same applies to every briefing a policy team produces. The remedy is a rule: before a detail goes into a decision memo, a comment letter or a board slide, someone confirms it against the primary document and records the date and URL."),
    warning('s4w1', "Date every fact you rely on", "A policy fact has a shelf life. Record the source, the date you read it and the date it takes effect. When one of those changes, the fact needs review."),

    h2('s5h1', 'A Weekly Routine'),
    blk('s5p1', "A routine that fits a small team has four parts. A weekly scan, thirty minutes, checks the sources in the map for anything new and logs each item with its type, date, effective date and owner. A triage step rates each item on a three-level scale: act now, watch, or file. A monthly review looks at the open items and the calendar of upcoming dates, such as comment deadlines, effective dates and renewal windows. A quarterly look-ahead compares the calendar with the organization's plans for the next 18 to 36 months."),
    blk('s5p2', "The log should hold a few fields only: what the item is, its source and date, who it affects in the organization, the next dated event and the person responsible for the next step. The Policy Impact Assessment Framework, covered in the next lesson, takes over for items rated act now."),
    blk('s5p3', "For a state agency the same structure applies with different owners. Medicaid operations watches guidance and letters, the finance office watches financing provisions, the legislative liaison watches bills, and a single coordinator owns the log and the calendar."),

    h2('s6h1', 'Triage in Practice: Three Items From the Table'),
    blk('s6p1', "Triage is easier to learn from examples. Take the October 29, 2026 court ruling. For a state Medicaid agency preparing for January 1, 2027, it is act now: the definition of medical frailty determines how exemptions are identified, and the scope of the relief and any appeal are unresolved. The first action is to obtain the opinion and CMS's follow-up guidance, and the owner is the Medicaid eligibility director. The next dated event is January 1, 2027."),
    blk('s6p2', "Take the December 18, 2025 announcement of LEAD. For a hospital-owned accountable care organization in ACO REACH, the item is act now, because REACH ends after 2026 and LEAD begins January 1, 2027. For a rural critical access hospital with no ACO, it is file: note it, and revisit if a partner proposes joining. Take the March 2025 decision to end Making Care Primary. For a state that built a regional strategy around that model, it was act now in 2025; for a state that never participated, it is a file item that still teaches the lesson about model durability. The same event can carry three different ratings depending on the organization, which is why the log records who is affected and not just what happened."),

    takeaway('tw', [
        "Between March 2025 and November 2026, significant federal changes arrived roughly every two months, in forms ranging from bulletins and letters to rules and court rulings.",
        "Chapter 3's four functions are federal rulemaking surveillance, state legislative monitoring, CMMI model pipeline monitoring and regulatory intelligence.",
        "Enforcement notices, court decisions and agency FAQ updates are part of regulatory intelligence and need a named owner.",
        "State-specific letters, such as CMS's July 7, 2026 letter to Vermont, appear on demonstration pages and not in regular publications, so a Federal Register-only system will miss them.",
        "Use secondary sources to find what happened and primary documents to learn what exactly it says.",
        "Three details in Chapter 3 had aged by late 2026: Maryland's model, the prior authorization timeframes' scope and the budget neutrality description; verify before you cite.",
        "A weekly scan, a three-level triage, a monthly review and a quarterly look-ahead fit a small team.",
    ]),
    quiz('qz',
        "Why might a monitoring system that watches only the Federal Register miss important changes?",
        [
            ("The Federal Register is not a reliable source", False),
            ("Some consequential changes arrive as letters, bulletins, state-specific notices and court rulings that are not published as rules", True),
            ("CMS never publishes rules in the Federal Register", False),
            ("Federal Register notices are always delayed by a year", False),
        ],
        "The timeline of 2025 and 2026 shows consequential changes in the form of informational bulletins, fact sheets, State Medicaid Director letters, a state-specific compliance letter, a court ruling and press releases, in addition to rules. A system built only on the Federal Register would have missed several of them."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.7.1: the policy monitoring framework (four functions; comment and effective-date periods)"),
    blk('src2', "[2] Federal Register, Medicaid Program; Community Engagement Requirement for Certain Individuals (June 3, 2026) — https://www.federalregister.gov/documents/2026/06/03/2026-11094/medicaid-program-community-engagement-requirement-for-certain-individuals — an example of an interim final rule notice"),
    blk('src3', "[3] CMS, State Medicaid Director Letter SMD #26-003 (June 11, 2026) — https://www.medicaid.gov/federal-policy-guidance/downloads/smd26003.pdf — example of guidance outside the Federal Register"),
    blk('src4', "[4] CMS State Demonstrations Group letter to Vermont (July 7, 2026) — https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-gch-stc-compl-lttr-07072026.pdf — example of a state-specific notice"),
    blk('src5', "[5] CMS Innovation Center model pages — https://www.cms.gov/priorities/innovation/innovation-models — per-model status and amendments"),
]

# ════════════════════════════════════════════════════════════════════════════
L14_SLUG = 'cmmi-policy-impact-assessment'
L14_TITLE = 'Policy Impact Assessment: From a New Rule to a One-Page Brief'
L14 = [
    blk('intro1', "Monitoring finds the change. Impact assessment decides what to do about it. Chapter 3 provides a four-step structure for the second job, and the Research Lab's Policy Impact Assessment Framework turns that structure into a worksheet that produces a one-page brief for decision-makers."),
    blk('intro2', "This lesson explains each step, applies them to a worked example built from the primary documents in this course, and shows how the five-pillar framework adds a layer the generic structure lacks. The worked example is the budget neutrality change in CMS's June 2026 letter, SMD #26-003, assessed for a state whose demonstration comes up for renewal in 2027."),
    blk('intro3', "The example is illustrative: it uses facts from the CMS letter and Vermont's published approval period, and its judgments are the kind a policy team would make, labeled as such."),

    h2('s1h1', 'The Four Steps'),
    blk('s1p1', "Chapter 3's framework has four steps. Exposure mapping asks what specifically the policy requires of the organization, what the financial, operational and compliance implications are and what the timeline is. Scenario analysis asks under what range of outcomes the organization's strategic position changes, such as a final rule that differs from the proposal, delayed implementation or changed model parameters. Response strategy asks what the best response is: a compliance roadmap, comment letter participation, a model application or advocacy engagement. Stakeholder communication asks who needs to know and what decisions the change requires of the board, executives, clinical leaders and the finance team."),
    blk('s1p2', "The platform's worksheet adds one dimension: a map of which of the five pillars the policy affects and how heavily, with a prompt that the first upstream pillar affected is where a response should begin. That fits the book's argument that upstream pillars constrain downstream ones, and it keeps the assessment from being only financial."),
    steps('s1st1', 'The four-step assessment', [
        ('Exposure mapping', 'What does this require of us, what does it cost, and by when?'),
        ('Scenario analysis', 'How does our position change if the final rule differs, is delayed, or the parameters change?'),
        ('Response strategy', 'Comply, comment, apply or advocate, and in what order?'),
        ('Stakeholder communication', 'Who must hear this, and what decision do we need from them?'),
    ]),

    h2('s2h1', 'Worked Example, Step One: Exposure'),
    blk('s2p1', "Policy: CMS's June 11, 2026 letter on budget neutrality. Type: guidance announcing the approach CMS intends to propose in a rule. Key date: January 1, 2027, when section 1115(g) requires Chief Actuary certification for new approvals, amendments and renewals. Subject organization: a state Medicaid agency whose demonstration's approval period ends December 31, 2027, as Vermont's does."),
    blk('s2p2', "Financial exposure is high. CMS expects the approach to reduce the savings available to states and to count administrative costs, which the old test did not. Savings that can be rolled over fall from ten years to five, and spending classified as hypothetical may become section 1115-only spending that needs offsets. Operational exposure is high: the state must classify each activity as MAPS or 1115-only, build an actuarial financial impact analysis for each 1115-only activity and set up monitoring against its own projections. Compliance exposure is high: no approval, amendment or renewal after January 1, 2027 without certification."),
    table('s2t1', 'Five-pillar exposure map (illustrative judgments for the worked example)', [
        {'Pillar': 'Policy', 'Question': 'Is it permissible?', 'Exposure': 'High: the statute makes certification a precondition of approval'},
        {'Pillar': 'Technology', 'Question': 'Is it possible?', 'Exposure': 'High: the analysis needs detailed, activity-level cost and eligibility data'},
        {'Pillar': 'Economics', 'Question': 'Is it sustainable?', 'Exposure': 'High: less savings, administrative costs counted, shorter rollover'},
        {'Pillar': 'Clinical', 'Question': 'Is it effective?', 'Exposure': 'Medium: some services may need redesign if they cannot be offset'},
        {'Pillar': 'Operations', 'Question': 'Is it executable?', 'Exposure': 'High: new classification, monitoring and corrective-action processes'},
    ]),
    blk('s2p3', "The first upstream pillar with high exposure is Policy, which says the response should begin with the legal and regulatory work: read the letter, inventory the demonstration's activities and prepare to work with CMS on classification. The Technology exposure follows from it, since the data that supports classification and analysis has to exist before it can be used."),

    h2('s3h1', 'Step Two: Scenarios'),
    blk('s3p1', "The worksheet offers four standard scenarios. If the final rule matches the proposal, the state plans for the approach in the letter as written. If the final rule differs, the state's classification and analysis may need to change, and CMS has said it would renegotiate budget neutrality for approvals before a final rule if the methodology changes. If implementation is delayed, the letter itself says that, if a final rule is not effective by January 1, 2027, CMS expects to apply the approach on a provisional and temporary basis, so a delay in the rule does not delay the requirement. If parameters change after launch, the state needs flexibility in its monitoring and a plan for corrective actions."),
    blk('s3p2', "The assessment's most useful finding here is that the delay scenario does not give the state relief. This is the kind of result scenario analysis exists to expose: an assumption that a rulemaking delay buys time is wrong in this case, according to CMS's own letter."),

    h2('s4h1', 'Steps Three and Four: Response and Communication'),
    blk('s4p1', "The response options map onto the worksheet's four choices. Compliance roadmap: inventory all demonstration activities, classify them, and prepare the first actuarial analyses before the renewal application. Comment letter participation: when CMS publishes its proposed rule, which the letter says it intends to do, the state can comment on classification, the treatment of administrative costs and the savings rollover. CMMI model application does not apply here. Advocacy engagement: work with other states and associations, since the change affects every Medicaid demonstration."),
    blk('s4p2', "Stakeholder communication follows the worksheet's four audiences. The board or secretary needs to know that renewal is now a certification event and that there is no retrospective safety net. The executive team needs the work plan and the staffing it requires. Clinical leadership needs to know which services may be reclassified. The finance team needs the revised savings assumptions and the administrative-cost accounting. The one-page brief puts each audience's message, the decision requested and the next dated event on a single page."),
    callout('s4c1', "The test of an impact assessment is whether a decision-maker can act on one page: what is changing, by when, how much it matters, what scenarios could change that and what is being asked of them."),

    h2('s5h1', 'A Second Example: Choosing a TEAM Track'),
    blk('s5p1', "The same four steps work for an organization-level decision. Take a hospital in a mandatory TEAM area that must choose a track before performance year one. Exposure: five surgical episode categories, a 30-day window, target prices built from a three-year regional baseline with a 1.5 or 2 percent discount, and track options of upside-only with a 10 percent stop-gain, or two-sided with 5 percent or 20 percent stop-gain and stop-loss limits. Failing to choose places the hospital in Track 1 for year one and Track 3 for later years."),
    blk('s5p2', "Scenario analysis asks what changes the hospital's choice. If its historical spending is above the regional baseline, the target price may be hard to beat, and Track 1's absence of downside matters. If it has strong discharge planning and post-acute partnerships, Track 3's larger upside may be worth its larger risk. If the rules change in a later payment rule, the hospital's track options in years two to five depend on its hospital type, which the CMS participation tracks fact sheet sets out. The response is a compliance roadmap with a deliberate track decision date, and the communication step is a board paper stating the choice, the exposure and the stop-gain and stop-loss limits in dollars."),
    blk('s5p3', "This second example shows the framework's range. A federal letter that affects a whole state program and a track selection that affects one hospital's surgical service line are different in scale and identical in structure: what is required, what could change, what to do and who must decide."),
    h2('s6h1', 'Using the Worksheet Well'),
    blk('s6p1', "Three habits make the platform worksheet more than a form. Name a single owner for the assessment and a date by which it must be complete. Attach the primary document, with its date, to the assessment so that a reader can verify the facts in a minute. And review the assessment when a dated event occurs, such as a comment deadline, a final rule or a court decision, since each can change the scenario that applies. The worksheet stores nothing between sessions, so copying the brief into the organization's own records is part of the process."),

    takeaway('tw', [
        "Chapter 3's impact assessment has four steps: exposure mapping, scenario analysis, response strategy and stakeholder communication.",
        "The platform's Policy Impact Assessment Framework adds a five-pillar exposure map and produces a one-page brief.",
        "In the worked example, the first upstream pillar with high exposure is Policy, so the response begins with reading the letter and classifying activities.",
        "CMS's June 2026 letter says that if a final rule is not effective by January 1, 2027, it will apply the new approach provisionally, so a rulemaking delay gives no relief.",
        "Standard scenarios are: the final rule matches the proposal, it differs, implementation is delayed, or parameters change after launch.",
        "Response options are a compliance roadmap, comment letter participation, a CMMI model application or advocacy engagement.",
        "Judgments in the worked example are illustrative; a real assessment should use the organization's own data and a named owner for each step.",
    ]),
    quiz('qz',
        "In the worked example, why does a delay in CMS's final rule on budget neutrality not give a state relief?",
        [
            ("Because the statute does not apply until the rule is final", False),
            ("Because CMS says it would apply the approach provisionally from January 1, 2027 if a final rule is not yet effective", True),
            ("Because states can renew without Chief Actuary certification", False),
            ("Because budget neutrality no longer applies to renewals", False),
        ],
        "SMD #26-003 states that if a final rule is not effective before January 1, 2027, CMS expects to begin applying the approach on a provisional and temporary basis to new demonstration, amendment and renewal approvals, given the statutory language requiring Chief Actuary certification on or after that date."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.7.2: the Policy Impact Assessment Framework (exposure mapping, scenario analysis, response strategy, stakeholder communication)"),
    blk('src2', "[2] HTR Research Lab, Policy Impact Assessment Framework — https://healthtransformationreview.org/research-lab/policy-quality?tab=policy-impact — worksheet with five-pillar exposure map, scenarios and one-page brief"),
    blk('src3', "[3] CMS, State Medicaid Director Letter SMD #26-003 (June 11, 2026) — https://www.medicaid.gov/federal-policy-guidance/downloads/smd26003.pdf — the policy assessed in the worked example"),
    blk('src4', "[4] CMS, Vermont Global Commitment to Health approval (January 2, 2025) — https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-global-commitment-to-health-appvl-01022025.pdf — approval period through December 31, 2027"),
]

# ════════════════════════════════════════════════════════════════════════════
L15_SLUG = 'cmmi-capstone-policy-brief'
L15_TITLE = 'Capstone: Assess a Federal Change and Brief Your Decision-Makers'
L15 = [
    blk('intro1', "The capstone puts the course to work on one real federal change. You will choose a policy from the course, test its effect with the platform's Policy tools, run a full impact assessment and write the one-page brief that a board, a secretary or a legislative committee could act on. The deliverable is the brief; the process is what the previous fourteen lessons prepared you for."),
    blk('intro2', "The capstone is designed to take about an hour. It uses three tools in the Research Lab's Policy and Quality bench and the Medicaid Eligibility Simulator, all of which Chapter 3 lists for this chapter. Because the work-requirement rules and the budget neutrality approach changed during 2026, part of the exercise is checking the tools' assumptions against the primary sources."),
    blk('intro3', "Choose your own organization, whether a state agency, a hospital, a health plan or an advisory team, and hold it fixed through all steps."),

    h2('s1h1', 'Step One: Choose the Change and the Organization'),
    blk('s1p1', "Pick one of three changes from the course, or a fourth that you have confirmed from a primary source. The first is the Medicaid work requirement, with the June 2026 rule, the October ruling and the November hold harmless period. The second is the budget neutrality change under section 1115(g) for a demonstration renewing in 2027. The third is a Medicare model decision, such as whether a hospital should take Track 1, 2 or 3 in TEAM, or a state should pursue a model in the AHEAD family."),
    blk('s1p2', "Write one sentence stating the change, its type and its key date, and one sentence naming the organization and its exposure. A good sentence is specific enough that a colleague could check it against a document. For example: 'CMS announced an optional hold harmless period for work requirements through June 30, 2027; our state Medicaid agency must decide whether to use it.'"),

    h2('s2h1', 'Step Two: Quantify with the Tools'),
    blk('s2p1', "Open the tool that fits your choice. For the work requirement, use the Work Requirements Calculator in the Research Lab's Policy and Quality bench to estimate coverage loss under H.R. 1's work requirement and eligibility provisions, and compare the nominal exemptions with the loss from administrative churn that Chapter 3 emphasizes. For financing and federal-policy shifts, use the H.R. 1 Cliff Scenario to model the point at which one-time Rural Health Transformation investment expires while Medicaid reductions take permanent effect. For household-level effects, use the Medicaid Eligibility Simulator to see where coverage transitions create gaps."),
    blk('s2p2', "Record three numbers from the tool, with the assumptions behind them. Then check the assumptions against the primary sources: does the tool's treatment of exemptions, look-back periods and start dates match CMS's June 2026 fact sheet, the October ruling and the November hold harmless period? Note each mismatch. This step tests whether you can use a model without taking it on trust, and the notes feed directly into the brief's caveats."),
    steps('s2st1', 'Quantification checklist', [
        ('Pick the tool', 'Work Requirements Calculator, H.R. 1 Cliff Scenario or Medicaid Eligibility Simulator.'),
        ('Record the inputs', 'Write down every assumption you set, with the source of each.'),
        ('Record three outputs', 'For example: people at risk, revenue exposed, or the year the gap opens.'),
        ('Check against primary sources', 'Compare the tool\'s assumptions with the CMS, court and statutory documents.'),
        ('List mismatches', 'Each mismatch becomes a caveat in the brief.'),
    ]),

    h2('s3h1', 'Step Three: Run the Assessment'),
    blk('s3p1', "Open the Policy Impact Assessment Framework and work the change through its four steps. Fill in exposure on the financial, operational and compliance dimensions and mark each of the five pillars. Note the first upstream pillar the worksheet identifies, since that is where the response should start. Mark which of the four scenarios would change your position and say how. Choose the responses and write one sentence for each of the four audiences."),
    blk('s3p2', "As you work, resist two temptations. The first is to treat every pillar as high exposure; the framework is only useful if it discriminates. The second is to write scenario notes that merely restate the base case; a scenario note should say what you would do differently."),

    h2('s4h1', 'Step Four: Write the One-Page Brief'),
    blk('s4p1', "The worksheet assembles a draft brief, which you should edit by hand. A good brief has five elements: what is changing and by when, stated in one or two sentences with the source and date; how much it matters, using your three tool outputs with their caveats; what could change the picture, naming the scenarios that matter; what you recommend; and the decision you are asking for and its deadline. Keep it to one page and cite every fact to a primary document."),
    table('s4t1', 'Brief checklist', [
        {'Element': 'What and when', 'Test': 'Could a colleague check it against a dated primary document?'},
        {'Element': 'How much it matters', 'Test': 'Are three numbers shown, each with its assumptions and caveats?'},
        {'Element': 'What could change it', 'Test': 'Do scenario notes say what you would do differently?'},
        {'Element': 'Recommendation', 'Test': 'Is there one clear recommended response, not a menu?'},
        {'Element': 'Decision and deadline', 'Test': 'Does the reader know exactly what is asked of them and by when?'},
    ]),
    warning('s4w1', "Do not invent numbers to fill the page", "If the tool output does not support a figure, say so and state what data would. A brief that marks its gaps honestly is more useful to a decision-maker than one that fills them."),

    h2('s5h1', 'Review and Reflection'),
    blk('s5p1', "Review your brief against the course's themes. Did you identify the right federal channel, a CMMI model, a section 1115 demonstration, a rule or a statute, and its legal limits? Did you separate what the statute fixes from what CMS guidance and courts have changed? Did you check the details of the key facts against primary documents, as the monitoring lesson required? And did you treat the state's independent authority, as Chapter 3 does, as the thing that makes a state's strategy resilient to federal change?"),
    blk('s5p1b', "Three pitfalls recur in capstone briefs. The first is false precision: reporting a coverage-loss figure to the last person when the inputs are estimates. Round and give a range. The second is mixing dates: citing a statutory deadline, a rule's deadline and an enforcement date as if they were the same event, when this course showed that the work requirement alone has all three. The third is stating a recommendation as an option list. A decision-maker who receives a menu has received no recommendation, so choose one response, say why, and name the runner-up only to show what would change your mind."),
    blk('s5p2', "Then save the brief and the log of caveats. When the facts change, as they did repeatedly in 2026, the log tells you what to revisit. A policy team's most durable asset is not any one brief but the habit of dating its facts and revisiting them."),

    h2('s6h1', 'Worked Prompts for Each Choice'),
    blk('s6p1', "If you chose the work requirement, the Work Requirements Calculator works from scenario presets that set an exemption rate, an administrative error rate and an enforcement delay in months, and lets you override them. Use the delay setting to model the optional hold harmless period, which CMS set through June 30, 2027, and compare outcomes with and without it. The calculator's own framing, that paperwork and not the policy text decides who keeps coverage, is the point your brief should make with numbers. Check whether your exemption rate is plausible against the list of exemptions CMS published, and say so if the medical frailty definition could change it."),
    blk('s6p2', "If you chose budget neutrality, there is no calculator for the Chief Actuary's analysis, so the exercise is classification. List the activities in a demonstration, such as housing supports, recuperative care, substance use disorder coverage and a hospital global budget, and for each decide whether it is MAPS or section 1115-only using the definitions in Lesson 8. Mark the ones you are unsure about. Your brief should state how many activities fall in each group and which need an actuarial case. For a Medicare model choice, use the scorecard from Lesson 3 and the track comparison from Lesson 6, and state the dollars at risk under each option."),
    blk('s6p3', "Whichever you choose, finish by stating what you could not verify. A brief that says which parts rest on documents read and which rest on summaries is one a decision-maker can trust."),

    takeaway('tw', [
        "The capstone produces a one-page brief on a real federal change, using the Work Requirements Calculator, the H.R. 1 Cliff Scenario or the Medicaid Eligibility Simulator and the Policy Impact Assessment Framework.",
        "State the change, its type and its key date in one sentence that a colleague could check against a primary document.",
        "Record the tool's assumptions and compare them with current primary sources; each mismatch becomes a caveat.",
        "Use the framework's five-pillar map to find the first upstream pillar affected, which is where the response starts.",
        "Scenario notes should say what you would do differently, not restate the base case.",
        "A strong brief shows what is changing and by when, how much it matters, what could change it, the recommendation and the decision requested.",
        "Do not fill gaps with invented figures; mark them and say what data would fill them.",
    ]),
    quiz('qz',
        "In the capstone, what should you do when the tool's assumptions differ from current primary sources?",
        [
            ("Use the tool's assumptions without comment since they are built in", False),
            ("Note each mismatch and carry it into the brief as a caveat", True),
            ("Discard the tool and avoid quantifying the change", False),
            ("Change the primary sources to match the tool", False),
        ],
        "The capstone tests whether you can use a model without taking it on trust. Record each mismatch between the tool's assumptions and the primary sources, and carry it into the brief as a caveat so the decision-maker knows what the numbers rest on."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.8: Work This Chapter on the Platform (Figure 3.5) and §3.7: the practitioner framework"),
    blk('src2', "[2] HTR Research Lab, Work Requirements Calculator — https://healthtransformationreview.org/research-lab/policy-quality?tab=medicaid-wr"),
    blk('src3', "[3] HTR Research Lab, H.R. 1 Cliff Scenario — https://healthtransformationreview.org/research-lab/policy-quality?tab=hr1-cliff"),
    blk('src4', "[4] HTR Research Lab, Policy Impact Assessment Framework — https://healthtransformationreview.org/research-lab/policy-quality?tab=policy-impact"),
    blk('src5', "[5] HTR Medicaid Eligibility Simulator — https://healthtransformationreview.org/medicaid-eligibility-simulator"),
    blk('src6', "[6] CMS, Medicaid community engagement interim final rule fact sheet (June 1, 2026) and hold harmless press release (November 13, 2026) — https://www.cms.gov/newsroom/fact-sheets/medicaid-community-engagement-requirement-certain-individuals-interim-final-rule-comment-period-cms"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
