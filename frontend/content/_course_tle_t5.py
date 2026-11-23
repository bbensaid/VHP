exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_tle_common.py').read())

# Track 5 — Advisory Support, Accountability and Capstone. Sources: Book Ch12 §12.3, §12.5, §12.6, §12.8; AHS May 2026 report (contracts; Appendix A outcome measures mapped to
# Act 167 goals: reduce inefficiencies, lower costs, improve access, improve outcomes, reduce inequities); Transformation Scorecard tool source (self-scored pillar sliders,
# milestone status complete/active/upcoming with Vermont notes); Act 68 monthly reporting (reports listed Nov 2025-Jun 2026 by search).

L17_SLUG = 'tl-selecting-advisory-support'
L17_TITLE = 'Hiring Help Well: Selecting and Managing Advisory Support'
L17 = [
    blk('intro1', "Chapter 12 does not claim that every organization needs outside help. It says that many of the book's analytical frameworks can be run by capable internal teams with access to the platform's tools, and it lists four situations where external advisors add value: when a decision carries significant financial or political risk and benefits from independent validation, when the organization lacks specific technical expertise and cannot build it in time, when multi-stakeholder dynamics benefit from a neutral facilitator and when the regulatory environment moves faster than internal monitoring can track."),
    blk('intro2', "This lesson turns that framework into a buyer's guide. It covers how to decide whether to engage an advisor, how to scope and select one, how to protect against the failure the chapter calls most common, which is engaging consultants for analysis and stopping before implementation, and how to avoid advisory dependence. It applies the guide to the authors of the book as well: the chapter describes the platform's own advisory services, and a reader should apply to them the same tests as to any other provider."),
    blk('intro3', "A good engagement leaves the client more capable, with a decision made and a method owned."),

    h2('s1h1', 'Deciding Whether to Engage Anyone'),
    blk('s1p1', "The first question is whether outside help is needed. The chapter's four conditions are a reasonable screen. Independence matters when internal analysis may be subject to confirmation bias, as when a hospital considers full-risk contracting for the first time and the people who favor it prepared the model. Expertise matters when the skill is rare and the decision date is near. Facilitation matters when several organizations must agree and none is trusted to chair. Intelligence matters when the rules are changing too fast to track. If none of these applies, the organization may do better to build its own capacity."),
    blk('s1p2', "A second screen is the cost of delay and of error. A decision with large irreversible consequences deserves a second pair of eyes. A decision that can be reversed cheaply deserves a small test, not a consultant. A third is the organization's own bandwidth: an advisor needs access to people and data, and an organization too stretched to supply them will receive a generic report. The Agency's May 2026 report on state transformation spending is a reminder that even a state agency relies on contractors for capacity it cannot hire quickly, and the same logic applies to hospitals. Using outside help to fill a gap is reasonable. Doing it without a plan to build the capacity is the trap."),
    callout('s1c1', "Ask first whether the need is judgment, skill, neutrality or information. Each points to a different kind of help."),

    h2('s2h1', 'Scoping the Engagement'),
    blk('s2p1', "The chapter describes engagements structured in phases, for instance a landscape and exposure assessment, an options analysis and implementation support. That structure illustrates a general principle: scope the work so that it ends in a decision and, where needed, in implementation, and not in a report. A scope of work should state the question to be answered, the decision it will inform, the deliverables, the data and staff the client will supply, the timeline and what happens after delivery. If implementation support is wanted, it should be named, since the chapter says the most common failure is stopping before it."),
    blk('s2p2', "A useful discipline is to write the decision memo first. Before engaging anyone, draft a one-page statement of the decision the board or leadership must make, the options and what information would change the choice. The advisor's task is then to supply that information with a stated level of confidence. This protects against studies commissioned to gather facts that no one will use. It also makes it easier to judge proposals: the best is the one that most directly addresses the decision."),
    table('s2t1', 'Elements of a scope of work', [
        {'Element': 'Question and decision', 'What_to_state': 'What will be decided, by whom, by when'},
        {'Element': 'Deliverables', 'What_to_state': 'Documents, models and sessions, with acceptance criteria'},
        {'Element': 'Client inputs', 'What_to_state': 'Data, people and time the organization will supply'},
        {'Element': 'Capability transfer', 'What_to_state': 'Training, documentation and tools the client keeps'},
        {'Element': 'Implementation support', 'What_to_state': 'Whether and how the advisor helps carry out the decision'},
        {'Element': 'Exit and review', 'What_to_state': 'End date, handover and a check after delivery'},
    ]),

    h2('s3h1', 'Selecting and Testing an Advisor'),
    blk('s3p1', "Selection should test what matters. Ask for examples of similar work and speak to former clients about whether the advice was used. Ask who will do the work, since the people presenting a proposal are not always the people doing the analysis. Ask how the advisor handles disagreement with the client and what happens when the data do not support the preferred answer. Ask what the advisor would not recommend doing, which reveals judgment. And ask how the engagement will leave the organization more capable: what will be documented, taught and handed over."),
    blk('s3p2', "Conflicts of interest deserve direct questions. An advisor paid on the basis of a decision, such as a percentage of identified savings or a fee tied to implementing a product, has an incentive to favor that decision. An advisor who also sells software or services may recommend them. Neither is automatically disqualifying, but both should be disclosed and weighed. The same applies to this course's source. The book describes the platform's own advisory services alongside its free tools and curriculum, and a reader deciding whether to purchase them should apply the same questions: what is the scope, who does the work, what will be left behind and what would you recommend if our interests were not aligned."),
    blk('s3p3', "Public bodies add procurement rules, which shape timing. The Agency's May 2026 report shows contracts for transformation support in various states: some concluded, some in force and some under negotiation. A buyer should factor procurement time into the schedule and should be wary of fast-track arrangements that skip comparison. Competition improves proposals and prices, and a written rationale for the choice protects the buyer in later review."),

    h2('s4h1', 'Managing the Engagement'),
    blk('s4p1', "Value is created or lost during the engagement. A named internal owner with authority should work with the advisor weekly, supply data promptly and decide quickly when asked. Interim reviews should test findings while there is still time to redirect. Staff who will carry out the decision should be involved from the beginning, since a recommendation developed without them is likely to be resisted. And the client should keep a record of what the advisor taught, so that the next analysis can be done internally."),
    blk('s4p2', "Chapter 12's discussion of advisory dependence describes an organization that becomes reliant on outside help for continuing analysis and implementation. The signs are recognizable: the same questions are sent to the advisor each quarter, internal staff cannot reproduce the models, and the advisor is the only one who understands how the numbers were built. The remedy is built into the contract: require model files and documentation, include training, assign an internal counterpart to every analyst and set a date by which the client will run the process alone."),
    steps('s4st1', 'A buyer\'s checklist from need to handover', [
        ('Name the need', 'Judgment, skill, neutrality or information.'),
        ('Draft the decision memo', 'State the decision, options and what would change the choice.'),
        ('Write the scope', 'Question, deliverables, client inputs, capability transfer and exit.'),
        ('Select with tests', 'Examples, references, named staff, conflicts and what they would not do.'),
        ('Manage weekly', 'Internal owner, interim reviews and staff involvement.'),
        ('Hand over', 'Models, documentation and a date to run it yourselves.'),
    ]),

    h2('s5h1', 'Evaluating the Result'),
    blk('s5p1', "After the engagement, ask whether the decision was made, whether it was better informed and whether anyone is now doing something differently. A report that sits on a shelf has failed, however sound its analysis. If the work was good, record why: what the scope, the people and the process contributed. If it was poor, record that too, and share it with the others in your region who may be considering the same advisor. A small community of buyers who exchange honest assessments is a form of knowledge infrastructure in its own right."),
    blk('s5p2', "Finally, remember what the chapter says is the aim: organizational capability, not dependence. The best measure of an advisory engagement may be how little the organization needs the advisor at the next decision. Chapter 12 sets out the aim as an integrated model of analysis, tools and change management that produces capability. A buyer who insists on those three elements, and on a visible plan for the day the advisor leaves, is applying the chapter correctly."),

    takeaway('tw', [
        "Chapter 12 says many organizations can implement the frameworks internally and lists four conditions for external help: independence, missing expertise, neutral facilitation and fast-moving regulation.",
        "The most common advisory failure, according to the chapter, is paying for analysis and stopping before implementation.",
        "Write the decision memo first, then scope the engagement so it ends in a decision and, if needed, implementation support.",
        "Select with tests: similar work, references, named staff, conflicts of interest and what the advisor would not recommend.",
        "Apply the same tests to the platform's own advisory services that the book describes; disclose and weigh any aligned interests.",
        "Guard against advisory dependence by requiring documentation, training, an internal counterpart and a handover date.",
        "Evaluate afterward whether a decision was made and behavior changed, not whether a report was delivered.",
    ]),
    quiz('qz',
        "According to Chapter 12, what is the most common advisory failure in healthcare transformation?",
        [
            ("Choosing an advisor who charges too little", False),
            ("Engaging consultants for analysis and stopping before implementation", True),
            ("Using internal teams for analysis", False),
            ("Asking for documentation", False),
        ],
        "The chapter says a report with recommendations but no support for implementing them usually yields a brief period of attention followed by quiet shelving."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.3 The Transformation Advisory Domains; §12.6 A Framework for Selecting Advisory Support; Key Concepts (advisory dependence)"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — contracted transformation support, concluded and pending contracts"),
    blk('src3', "[3] HTR Research Lab, Transformation Scorecard and Research Workspace — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=scorecard — tools for internal analysis before engaging outside help"),
    blk('src4', "[4] HTR Advisory contact page — https://healthtransformationreview.org/advisory/contact — the platform's own advisory services as named in Chapter 12; apply the lesson's tests to them"),
]

L18_SLUG = 'tl-transformation-dashboard'
L18_TITLE = 'Managing by Evidence: The Transformation Dashboard'
L18 = [
    blk('intro1', "Chapter 12 advises legislators to require the Agency of Human Services to maintain and report on a consolidated transformation dashboard, tracking milestones across all five pillars against the statutory timeline, and to present it at each reporting cycle. Its reasoning is blunt: if the dashboard does not exist, the transformation is not being managed, and if it exists but milestones are consistently incomplete, the transformation is not on track and the legislature needs to know. This lesson teaches how to design such a dashboard, using Vermont's own reporting and the platform's Transformation Scorecard as examples."),
    blk('intro2', "It covers what to track, how to define status honestly, how to combine milestones with outcomes, how to report to a board or legislature and how to avoid the common failures of dashboards. The Vermont facts come from the Agency's May 2026 report to the Legislature, read directly, and from the scorecard tool's source."),
    blk('intro3', "A dashboard is useful only if it can say bad news plainly."),

    h2('s1h1', 'What the Chapter Asks For'),
    blk('s1p1', "The chapter's argument is that transformation will be managed as a collection of independent programs unless some function tracks milestones across the pillars, manages dependencies between the analytics vendor, hospital plans and clinic certifications and reports to leadership on the timeline's status. It names a program management office as the operational spine. The legislator's version of the same idea is oversight: a consolidated view that lets elected officials see whether the work is on schedule without reading a dozen separate reports."),
    blk('s1p2', "A dashboard serves three audiences with different needs. Executives need to know what is at risk and what decision is needed. Operational teams need to see their dependencies. Oversight bodies need a stable, comparable view over time. A single page rarely serves all three, so a good design has a short summary for executives and oversight and a detailed view for managers, built from the same data so they cannot contradict each other."),
    callout('s1c1', "If every item is green every month, either the work is perfect or the definition of green is too generous."),

    h2('s2h1', 'Milestones and Outcomes Together'),
    blk('s2p1', "Two kinds of indicator belong on a dashboard. Milestones show whether planned work is happening: a plan submitted, a contract signed, a rule adopted. Outcomes show whether the work is producing results: readmission rates, avoidable emergency visits, access and equity measures. Milestones alone can show a program busy and failing. Outcomes alone arrive late and cannot say whether the program was carried out. Together they let managers ask both whether the plan is on schedule and whether it is working."),
    blk('s2p2', "The Agency's May 2026 report is built along these lines. It reports on activities, such as the hospital grant program and the status of agreements, and it includes an appendix of outcome measures mapped to the goals of Act 167: reduce inefficiencies, lower costs, improve access, improve outcomes and reduce inequities. Among the measures listed in the portion this lesson read are the thirty-day all-cause readmission rate and potentially avoidable emergency visits as a percentage of all emergency visits, each with a stated data source and period. The report also states that the share of emergency visits related to suicidal ideation, self-harm or opioid overdose aligned with previous reports."),
    blk('s2p3', "The platform's Transformation Scorecard takes a related but different approach. It lets a user score an organization from zero to one hundred percent on each of the five pillars, with benchmark questions listed for each, and it lists milestones for each pillar, tagged complete, active or upcoming, with notes about the Vermont situation. It is a self-assessment and milestone tracker, so its scores reflect the user's judgment and not independent measurement. As an example of structure, it shows a useful pattern: benchmarks, a score and dated milestones in one view."),
    table('s2t1', 'Milestone indicators and outcome indicators', [
        {'Kind': 'Milestone', 'Example': 'Hospital plans submitted; grant agreements executed; analytics contract signed', 'Tells_you': 'Whether planned work is happening'},
        {'Kind': 'Outcome', 'Example': 'Thirty-day readmission rate; avoidable emergency visits', 'Tells_you': 'Whether the work is producing results'},
        {'Kind': 'Dependency', 'Example': 'Regional analytics needed before regional plans', 'Tells_you': 'Where a delay will spread'},
        {'Kind': 'Risk', 'Example': 'Federal approval pending; funding condition unresolved', 'Tells_you': 'What could change the plan'},
    ]),

    h2('s3h1', 'Defining Status Honestly'),
    blk('s3p1', "Status labels need definitions or they become matters of mood. A common scheme uses green, amber and red. A workable definition is that green means on track with no help needed, amber means at risk with a plan to recover and red means off track or blocked with a decision needed from someone named. Each item should have an owner, a due date, a status and, for any item not green, a note stating what is wrong and what is being done. Moving an item to red should be treated as information and not as a failure, or people will hide problems."),
    blk('s3p2', "Honest status also depends on counting what has really happened. A contract under negotiation is not a signed contract; an application submitted is not an approved grant. The Agency's May 2026 report models this well in one respect: it corrected an earlier statement, noting that the previous edition had incorrectly stated that seven hospital grant agreements were fully executed when the correct number was five. Such corrections are a sign of a reporting culture that values accuracy, and a dashboard should have a clear way of showing them."),
    blk('s3p3', "Beware of measures that look good for the wrong reasons. A milestone that is easy to complete can create the impression of progress while the hard work is untouched. Define milestones by deliverables with acceptance criteria, such as an executed agreement or an adopted rule, and not by activity, such as holding a meeting."),

    h2('s4h1', 'Designing the Report'),
    blk('s4p1', "A reporting page should answer five questions in order. What is the overall status? What changed since last time? What is at risk and why? What decisions or help are needed, from whom? What is coming in the next period? Everything else belongs in an appendix. A page that answers these questions fits a board packet or a legislative hearing, and its consistency over time lets readers see patterns without relearning the format."),
    steps('s4st1', 'The five-question reporting page', [
        ('Overall status', 'One sentence and one color, with the definition in a footnote.'),
        ('Changes since last report', 'The few items that moved, in either direction.'),
        ('Risks and causes', 'Items amber or red, with what is wrong and what is being done.'),
        ('Decisions needed', 'Specific asks with names and dates.'),
        ('Next period', 'Milestones due, with owners.'),
    ]),
    blk('s4p2', "Equity belongs on the page. The Act 167 goals include reducing inequities, and the Agency's measure list is mapped to them. A dashboard that reports averages only can show improvement while gaps widen. Include at least one stratified measure, by geography, insurance or race and ethnicity where data allow, and say when data are insufficient to stratify. The chapter on equity in the book makes this the test of whether a program serves the whole population."),

    h2('s5h1', 'Common Failures'),
    blk('s5p1', "Dashboards fail in predictable ways. They track too many indicators and bury the few that matter. They rely on manual updates that lapse when staff are busy. They show data without owners, so no one acts. They report only the good news. They change definitions without notice, destroying comparability. And they are built once and never revisited, so they continue to report measures that no longer reflect the work. The remedies are modest: choose few indicators, automate collection where possible, name an owner for each, insist on the definitions and review the dashboard itself each quarter."),
    blk('s5p2', "A final point concerns who owns the dashboard. If it belongs to the team being measured, it may be shaded. If it belongs to a distant oversight body, it may be ignored. The chapter's idea of a program office with a reporting line to leadership, and a legislature that expects regular, comparable reports, is an attempt to place ownership where both honesty and action are possible. Whatever form it takes, the test is the same: can the people responsible read it and know what to do tomorrow?"),

    takeaway('tw', [
        "Chapter 12 advises legislators to require a consolidated transformation dashboard tracking milestones across all five pillars against the statutory timeline.",
        "A dashboard needs both milestone indicators, which show whether work is happening, and outcome indicators, which show whether it is working.",
        "Vermont's May 2026 Agency report pairs activity reporting with an appendix of outcome measures mapped to the Act 167 goals, including readmissions and potentially avoidable emergency visits.",
        "The platform's Transformation Scorecard is a self-scored pillar assessment with milestone tracking, not independent measurement.",
        "Define status colors, name owners and dates and count only what has actually happened; the Agency's report corrected an earlier overstatement of executed grant agreements from seven to five.",
        "Use a five-question reporting page and include at least one stratified equity measure.",
        "Avoid dashboards that track too much, hide bad news, change definitions silently or are never reviewed.",
    ]),
    quiz('qz',
        "Why should a dashboard include both milestone and outcome indicators?",
        [
            ("Because regulators require two columns", False),
            ("Because milestones show whether planned work is happening and outcomes show whether it is producing results", True),
            ("Because outcomes are always available immediately", False),
            ("Because milestones are more accurate than outcomes", False),
        ],
        "Milestones alone can show a program busy and failing; outcomes alone arrive late and cannot tell whether the program was carried out. Together they show both progress and effect."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.8 Implications for You (AHS and GMCB officials; Vermont legislators)"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — activity reporting, grant status correction and Appendix A outcome measures"),
    blk('src3', "[3] HTR Research Lab, Transformation Scorecard — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=scorecard — tool source read 2026-11-23"),
    blk('src4', "[4] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — reporting requirements and Strategic Plan deadline"),
]

L19_SLUG = 'tl-capstone-leadership-plan'
L19_TITLE = 'Capstone: A Transformation Leadership Plan'
L19 = [
    blk('intro1', "This capstone brings the course's tools together into a single plan for leading a real or imagined transformation effort. The effort might be a hospital preparing for a payment change, a practice network adopting a new care model or a state office managing a portfolio. The plan is a working document of about three pages that a leadership team could use: it diagnoses the setting, sizes capacity, sets priorities, prepares for shocks, arranges knowledge transfer, handles evidence and outside help and defines how progress will be reported."),
    blk('intro2', "Each section below corresponds to one part of the course and asks for a short, specific product. The worked example is illustrative and invented, and its numbers are placeholders meant to show structure, not to represent any organization. In your own plan, every number should be traceable to a source or marked as an assumption."),
    blk('intro3', "A leadership plan is good when a new member of the team could read it and know what is being done, by whom and why."),

    h2('s1h1', 'Part One: Diagnose and Frame'),
    blk('s1p1', "Start with the change itself. Write one sentence describing what will be different for patients, staff and finances, and the date by which it must happen. Then walk the five implementation domains from the first lessons of this track: the innovation, the outer setting, the inner setting, the individuals and the process. For each, list the two or three most important helps and hindrances, and mark which are within your control. Add the equity questions: who will be reached last, who may be disadvantaged and what data will show it."),
    blk('s1p2', "The example organization is a small rural hospital preparing for a fixed-revenue payment model. Its helps are a supportive board and a strong primary care partner. Its hindrances are a billing system built for volume, a medical staff that has not been engaged and uncertain federal timing. The first two hindrances are within its control, and the plan treats them as priorities; the third is external and is handled in Part Four."),
    callout('s1c1', "A diagnosis that separates what you control from what you do not already contains half the plan."),

    h2('s2h1', 'Part Two: Capacity and Priorities'),
    blk('s2p1', "Next, size the capacity. List the work packages the change requires, estimate the qualified hours needed each quarter and count the supply, including contracts only from the date they take effect. Note the decisions required, the bodies that must make them and when they meet. The difference between demand and supply is the gap. Present it with three options: add capacity, narrow scope or delay, and the cost of each."),
    blk('s2p2', "Then triage. Score each work package on value and feasibility, mark the critical path and decide what to fund first. Write the deferred list with a reason and a date for reconsideration. In the example, the hospital finds a gap of roughly one full-time equivalent in finance analysis for two quarters. It chooses to hire a part-time analyst and to defer a new service-line study, listing the study as deferred until the second quarter. The point of the exercise is the explicit choice."),
    table('s2t1', 'Worked example: a capacity gap and the choice (illustrative)', [
        {'Item': 'Demand (finance analysis, per quarter)', 'Value': 'About 1.5 full-time equivalents'},
        {'Item': 'Supply', 'Value': 'About 0.5 full-time equivalent after other duties'},
        {'Item': 'Gap', 'Value': 'About 1.0 full-time equivalent for two quarters'},
        {'Item': 'Options', 'Value': 'Add a part-time analyst; narrow scope; delay the model by a quarter'},
        {'Item': 'Decision', 'Value': 'Hire part-time analyst; defer service-line study to Q2'},
    ]),

    h2('s3h1', 'Part Three: Testing, Spread and Knowledge'),
    blk('s3p1', "Choose a small number of changes and design a first test for each using the Model for Improvement: an aim, an outcome, a process and a balancing measure and a first cycle with a prediction. Then plan for spread. State the core of each change, the permitted variations, who else in your network could adopt it and what would make adoption easy. If other organizations face the same problem, consider whether a small collaborative, or a standing peer exchange, could help, and who would coordinate it."),
    blk('s3p2', "Plan the knowledge-transfer functions you need. Who will scan for developments that affect you, and how will they be interpreted for the board? Which tools and data will you rely on? Which skills must staff acquire, and how? Where will you need hands-on help? For each, say whether it will be provided internally, by a partner or by a contractor, and what remains when that arrangement ends. The example hospital decides to share a finance analyst with a nearby hospital and to join a regional peer exchange, so that neither builds the capability alone."),

    h2('s4h1', 'Part Four: Shocks, Evidence and Outside Help'),
    blk('s4p1', "Write a scenario table with three scenarios, the trigger that would tell you each has occurred and the response. Keep it to one page. Agree who is authorized to act when a trigger is met and how quickly the board will be informed. Start a decision log, and record in it the assumptions behind the plan, so that when a shock arrives you know which decisions to reopen."),
    blk('s4p2', "List the sources the plan relies on, tagged by type: peer-reviewed, agency self-report, consultant projection or synthesis, with a date and a confidence level. Mark any figure that is a projection and show what happens if it is half as large. Decide whether outside help is needed, and if so, write the decision memo and the scope using the buyer's checklist from the previous lesson, including the handover date. If you decide against outside help, say how the internal team will obtain independent challenge to its own analysis."),
    steps('s4st1', 'The capstone plan in eight parts', [
        ('Frame the change', 'One sentence, one date, five-domain diagnosis, equity questions.'),
        ('Size capacity', 'Demand, supply, gap and options.'),
        ('Triage', 'Value and feasibility, critical path and deferred list.'),
        ('Test and spread', 'First tests, core and variations, spread plan.'),
        ('Knowledge functions', 'Who does what, and what remains after contracts end.'),
        ('Scenarios and triggers', 'Three scenarios, triggers, responses and a decision log.'),
        ('Evidence and advice', 'Source log with types and a scope for any outside help.'),
        ('Dashboard', 'Milestones, outcomes, definitions, owners and a reporting page.'),
    ]),

    h2('s5h1', 'Part Five: Dashboard and Review'),
    blk('s5p1', "Close the plan with a dashboard. Choose five to eight milestones with deliverables and dates, and three to five outcome measures, at least one stratified by a relevant group. Define the status colors. Name an owner for every line. Set the reporting rhythm and the page format, and commit to the five-question reporting page. State the date of the first review and what it will examine: whether the diagnosis was right, whether the capacity estimate held and whether the scenarios still describe the world."),
    blk('s5p2', "The review is the part most plans lack. After one quarter, compare what happened with what the plan predicted. Where it differed, write down why, and update the plan. A plan revised honestly every quarter is more useful than a perfect plan that is never reread. This is the habit Chapter 12 describes when it says that transformation does not manage itself, and that the organizational infrastructure for managing it must be in place before the workload peaks."),
    blk('s5p3', "When you finish, test the plan with someone outside the team. Ask them to read the three pages and say what is being done, by whom, by when and what would make the team change course. If they cannot, the plan is not yet clear enough. Revise it until a new colleague could take it up and begin work the same day, which is the practical meaning of leadership infrastructure."),

    blk('s5p4', "Keep a short list of the plan's weakest assumptions on the last page, such as that a contract will be signed by a certain date or that a board will approve a change in one meeting. Review that list first at every check-in. Most plans that fail do so because one or two of these assumptions proved wrong and no one was watching them, and a list of three lines is cheap insurance against that outcome."),
    takeaway('tw', [
        "A transformation leadership plan has eight parts: frame the change, size capacity, triage, test and spread, knowledge functions, scenarios and triggers, evidence and advice, and a dashboard.",
        "Start with a one-sentence change, a date and a five-domain diagnosis that separates what you control from what you do not.",
        "Present the capacity gap with three options (add, narrow, delay) and list deferred items with reasons.",
        "Design first tests with an aim, outcome, process and balancing measures, and write down the core of each change and how it will spread.",
        "Write scenarios with triggers and a decision log, and tag every source by type and confidence.",
        "Decide whether outside help is needed; if so, write the decision memo, the scope and the handover date.",
        "Report on a five-question page with milestones, outcomes and at least one stratified measure, and review the plan every quarter.",
    ]),
    quiz('qz',
        "What should a capacity assessment present to leaders beyond the size of the gap?",
        [
            ("A request for more time without explanation", False),
            ("Options for closing it: adding capacity, narrowing scope or delaying, with the cost of each", True),
            ("A list of staff to be dismissed", False),
            ("Only a warning that the plan is unrealistic", False),
        ],
        "Leaders are better served by being shown the choices and their costs than by being told the plan is unrealistic; the three options are adding capacity, narrowing scope or delaying."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.4 Change Management; §12.6 Selecting Advisory Support; §12.8 Implications for You"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — example of activity and outcome reporting"),
    blk('src3', "[3] HTR Research Lab, VBC Readiness Assessment and Transformation Scorecard — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness — tools to support the diagnosis and dashboard steps"),
    blk('src4', "[4] Institute for Healthcare Improvement, Model for Improvement — https://www.ihi.org/resources/how-to-improve — test design for Part Three"),
]

LESSONS = [(L17_SLUG, L17_TITLE, L17, 17), (L18_SLUG, L18_TITLE, L18, 18), (L19_SLUG, L19_TITLE, L19, 19)]
if __name__ == '__main__':
    run(LESSONS)
