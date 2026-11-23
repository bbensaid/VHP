exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_tle_common.py').read())

# Track 3 — Pace and Capacity. Primary sources read 2026-11-23: AHS Act 68 Health Care System Transformation Report, May 2026 (data as of Apr 30 2026; 14 hospital plans;
# $2M Health IT Fund grants: 13 eligible hospitals applied, five fully executed grants, eight under negotiation; RHRC contract concluded Oct 9, remaining funds obligated to a new
# technical assistance vendor; Manatt Phelps and Dr. Craig Jones contracted; analytics contract under negotiation; AHEAD $1.2M CMMI funds from Cooperative Agreement Year 3 (2027),
# unspent funds returnable within 90 days if the State does not participate; RHT $195,053,740 FFY26, $15M data analytics and modeling, $27M transformation/regionalization grants);
# CMS letter to AHS Secretary Samuelson, July 7 2026 (HGB not approved under STCs 6.3(a), 6.4(i)(iii); corrective actions at 60 days and 6 months);
# WCAX Jul 28 2026 (state abandons AHEAD after federal funding cuts; Samuelson: committed to global budgets long term but not ready; Foster quote).

L11_SLUG = 'tl-capacity-constraints'
L11_TITLE = 'The Pace Problem: Hard, Soft and External Capacity Constraints'
L11 = [
    blk('intro1', "Chapter 12 poses a question that statutory deadlines tend to hide: how fast can an organization or a system realistically change, and what happens when the required pace exceeds the capacity available? It names three kinds of constraint. Hard constraints are the staff and money needed to do the work. Soft constraints are the cultures, boards and communities that cannot be rushed without damaging the quality of the change. External constraints are decisions and events outside the organization's control, such as federal program decisions and financial emergencies."),
    blk('intro2', "This lesson turns the chapter's three categories into a capacity assessment that a leader can run before accepting a timeline. It uses Vermont's own reporting to Legislature as evidence of what capacity looks like in practice: an Agency of Human Services report on transformation spending, current as of April 30, 2026, which this lesson read directly. Where the lesson draws inferences from that report, it says so."),
    blk('intro3', "A deadline is a fixed point. Capacity is a variable, and a leader who does not measure it will learn its limits by missing the deadline."),

    h2('s1h1', 'Hard Constraints: People, Money and Contracts'),
    blk('s1p1', "The chapter's example of a hard constraint is concrete. If the Agency lacks the staff to manage fourteen hospital transformation plans at once, the plans will be managed in sequence, which means some hospitals will have well-supported plans and others rushed ones. Hiring enough people to manage the portfolio on the statutory timeline, it says, is not optional. The point generalizes: a plan's quality is bounded by the attention available to review, support and correct it, and attention is finite."),
    blk('s1p2', "The Agency's May 2026 report offers a window into how a state fills capacity gaps when it cannot hire quickly. It lists the state funds received for care transformation as of April 30, 2026, and shows that much of the work is carried out through contracts. A portion of one appropriation went to work with the Rural Health Redesign Center, whose contract the report says concluded on October 9, with the remaining funds obligated to a new contract with a technical assistance vendor for hospitals. Another appropriation of two million dollars is described as spent or obligated for contracted transformation support from a law firm and a physician advisor, with remaining funds meant to pay a contractor for analytics, a contract the report describes as under negotiation."),
    blk('s1p3', "Contracting is a legitimate way to add capacity, but it carries its own constraints. A contract takes time to negotiate and award. Its scope is fixed at signing. Knowledge that lives with the contractor may leave when the contract ends. And the state still needs staff capable of directing and evaluating the work. A leader assessing hard capacity should therefore ask not only how many people are assigned, but how many are under contract and how long those contracts take to set up, since those delays are a real part of the schedule."),
    callout('s1c1', "Capacity is not the number of people on an organization chart. It is the number of qualified hours available this quarter for this work."),

    h2('s2h1', 'Soft Constraints: Boards, Cultures and Communities'),
    blk('s2p1', "Chapter 12 describes soft constraints as organizational cultures that process change slowly, governing boards that must be educated before they can decide and community stakeholders whose input must be genuinely gathered and considered. It adds that these cannot be accelerated without compromising the quality of the process, and that a process failing to achieve community buy-in will be politically reversed even if it is technically correct. This is the part of capacity that spreadsheets miss, because the time needed is not proportional to the amount of work."),
    blk('s2p2', "A board that meets monthly can make a decision in a month at the earliest, whatever the urgency. A medical staff that learned of a change late may need weeks to accept it. A community that has seen service cuts announced without warning will treat any new announcement with suspicion, and will need more engagement, not less. Vermont's own process shows the pattern in its structure: the Agency's report describes hospital plans developed across five regions with engagement from all hospitals, and says that transformation is an ongoing process whose goals will continue to evolve as capacity, partnerships and resources develop. Whatever else that language implies, it acknowledges that the plans are an early stage."),
    blk('s2p3', "A practical test for soft capacity is to list the decisions the plan requires and, for each, the body that must approve it, its meeting schedule, the information it needs and the history it brings. A timeline that assumes decisions are made faster than the calendar of the decision-making bodies allows is unrealistic from the start. Where the deadline cannot move, the solution is to begin earlier, to prepare boards in advance or to change who decides, not to assume the board will move quickly."),

    h2('s3h1', 'External Constraints: What You Do Not Control'),
    blk('s3p1', "The chapter's third category is external. Its example is federal program decisions: a federal finding about the Medicaid hospital global budget, which it says was a federal and not a Vermont decision. Others include hospital finances that force emergency decisions ahead of plans, and the political relationships of institutions that are among the state's largest employers. The next lesson takes up a specific federal action in detail. Here the point is how to treat such constraints in a capacity assessment."),
    blk('s3p2', "An external constraint cannot be managed, but its consequences can be planned for. The Agency's report offers an example of a conditional funding commitment: federal innovation center funds of one million two hundred thousand dollars for health system transformation grants were approved from the third year of the cooperative agreement, in 2027, and the report says that if the state chose not to participate in the model, any unspent funds would need to be returned within ninety days. A manager reading that sentence learns that the funding stream was conditional on a decision outside the transformation office's control, and that a contingency was needed. Good capacity planning lists such conditions explicitly."),
    table('s3t1', 'Three kinds of capacity constraint (Chapter 12) and how to assess each', [
        {'Constraint': 'Hard', 'Examples': 'Staff, funds, contract lead times, analytic tools', 'Assessment_question': 'How many qualified hours are available per quarter, and how long to add more?'},
        {'Constraint': 'Soft', 'Examples': 'Board calendars, culture, community engagement', 'Assessment_question': 'Which decisions need which bodies, and when do they meet?'},
        {'Constraint': 'External', 'Examples': 'Federal approvals, funding conditions, financial shocks', 'Assessment_question': 'What conditions could change, and what is our response for each?'},
    ]),

    h2('s4h1', 'Running a Capacity Assessment'),
    blk('s4p1', "A capacity assessment starts with a list of the work packages the plan requires and ends with a comparison between demand and supply by quarter. For each work package, estimate the qualified hours needed, the skills required and the decisions that must be made. For supply, count staff and contractors with their actual availability, subtract their other duties and add contracts only from the date they are expected to be in force. The difference is a gap, and the gap is the most important output, because it tells leaders where the timeline is not credible."),
    steps('s4st1', 'A quarterly capacity assessment', [
        ('List the work packages', 'Break the plan into pieces with a deliverable, an owner and a due date.'),
        ('Estimate demand', 'Qualified hours and skills needed per quarter for each package.'),
        ('Count real supply', 'Staff time available after other duties; contractors only after the contract date.'),
        ('Map the decisions', 'For each package, who decides, when they meet and what they need.'),
        ('List external conditions', 'What could change, who decides and what our fallback is.'),
        ('Report the gap', 'Show leaders where demand exceeds supply and the options: add, delay, narrow.'),
    ]),
    blk('s4p2', "The assessment should end with options and not only a warning. A gap can be closed by adding capacity, which costs money and time. It can be narrowed by reducing scope, which risks leaving something undone. It can be delayed, which has consequences if the deadline is fixed in law. Leaders are better served by being shown the three choices and their costs than by being told that the plan is unrealistic. Chapter 12 states that the pace problem is the critical execution uncertainty, and that statement is best answered with a plan to manage it."),
    warning('s4w1', "Do not count planned hires or pending contracts as capacity", "Count them when they are in force. A contract under negotiation is a hope; reporting it as capacity is how timelines become fictions."),

    h2('s5h1', 'What the Evidence Does Not Show'),
    blk('s5p1', "A balanced reading of Vermont's report avoids two mistakes. The first is to treat contracting and delayed awards as proof of failure. Public agencies normally contract and normally take months to do so, and the report's tone is of work in progress. The second is to treat the activity as proof of success. The report documents plans developed, applications submitted and money obligated, and these are inputs and processes. It does not show outcomes, and it is explicit that grant agreements were still being negotiated with some hospitals as of its date. Nothing in it shows whether capacity matches the timeline."),
    blk('s5p2', "That is a reminder of what capacity assessment is for. It does not predict whether a transformation will succeed. It tells leaders where the plan depends on assumptions they have not checked. A hospital CEO reading the Agency's report might ask: is our grant agreement executed, who is our technical assistance contact now that the earlier center's contract has ended and what is our fallback if the analytics contractor is late? Each question points to a specific action, which is what the capacity assessment is meant to produce."),

    takeaway('tw', [
        "Chapter 12 names three kinds of capacity constraint on transformation pace: hard (staff and money), soft (cultures, boards, communities) and external (federal decisions, financial shocks).",
        "If the Agency cannot staff fourteen hospital plans at once, some will be well supported and others rushed; the chapter says hiring is not optional.",
        "Vermont's May 2026 Agency report shows much transformation capacity supplied by contractors, including a technical assistance vendor and an analytics contract under negotiation.",
        "Contracts add capacity only from the date they are in force; count them accordingly.",
        "Soft constraints are set by the calendars and trust of boards, medical staffs and communities, and cannot be compressed by urgency.",
        "External conditions, such as funding that must be returned within ninety days if the state does not participate in a federal model, should be listed explicitly with a fallback for each.",
        "A capacity assessment ends in options: add capacity, narrow scope or delay, with the cost of each.",
    ]),
    quiz('qz',
        "According to Chapter 12, why can soft capacity constraints not simply be accelerated?",
        [
            ("Because they are unimportant", False),
            ("Because rushing boards, cultures and community input compromises the quality of the transformation and risks political reversal", True),
            ("Because federal law forbids faster decisions", False),
            ("Because soft constraints refer only to computer software", False),
        ],
        "The chapter says cultures, boards and community stakeholders cannot be accelerated without compromising quality, and a process that lacks community buy-in will be politically reversed even if technically correct."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.4.2 The Transformation Pace Problem"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 (data as of April 30, 2026) — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — read directly"),
    blk('src3', "[3] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf"),
    blk('src4', "[4] Vermont Agency of Human Services, State Transformation Update (April 15, 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Miscellaneous/W~Katelyn%20Carrell~State%20Transformation%20Update~4-15-2026.pdf — listed by search; not read in full"),
]

L12_SLUG = 'tl-triage-and-work-plans'
L12_TITLE = 'Choosing What Not to Do: Triage, Dependencies and the Work Plan'
L12 = [
    blk('intro1', "When capacity falls short of the timeline, something must give. Leaders can add capacity, delay or narrow the work. Of these, narrowing is the most neglected, because it requires saying openly what will not be done in the period. This lesson sets out a method for deciding: how to rank work by value and feasibility, how to find the dependencies that make some tasks more urgent than they look, how to build a work plan with a short critical path and how to communicate what has been deferred so that the decision does not look like drift."),
    blk('intro2', "The method draws on standard portfolio and project practice and on Chapter 12's observation that, if capacity is short, hospitals will be supported unevenly. Vermont's May 2026 report on transformation supplies the example: fourteen hospital plans, with common themes, at an early stage. The sequencing exercise in the first track of this course covers the portfolio-register approach, and this lesson complements it by focusing on triage when capacity is tight."),
    blk('intro3', "The question for every task is whether it is on the path to the deadline, and if not, what it displaces."),

    h2('s1h1', 'Value and Feasibility'),
    blk('s1p1', "The simplest triage tool ranks each piece of work on two scales. Value asks how much the work contributes to the aims, which in a statutory transformation means the requirements and the outcomes the law seeks. Feasibility asks how likely the work is to be completed in the period given available capacity, decisions and external conditions. Work that is high in both goes first. Work that is high in value and low in feasibility needs a plan to make it feasible, such as hiring, a decision or a dependency cleared. Work that is low in value and high in feasibility is tempting, because it produces visible progress, and should be resisted unless it unlocks something else."),
    blk('s1p2', "Scores should be argued, not assigned. A short meeting in which owners present their work, and others challenge the ratings, usually exposes assumptions: that a data feed will be available, that a board will approve or that a contractor will start on time. Writing those assumptions next to the score turns the exercise into a risk register. Revisit the scores each quarter, since feasibility changes as contracts are awarded, decisions are made and funding conditions resolve."),
    callout('s1c1', "Easy work with low value feels like progress. It is the most common way capacity is lost."),

    h2('s2h1', 'Dependencies and the Critical Path'),
    blk('s2p1', "Chapter 12's discussion of the Transformation Program Office stresses managing dependencies between the analytics vendor, the hospital transformation plans and clinic certifications. Dependencies determine which tasks are urgent. If regional plans depend on analytics that a contractor will supply, the analytics contract is on the critical path to the regional plans and thus to the strategic plan that follows. A delay there delays everything after it, whereas a delay in a task with slack does not. The Agency's May report describes the analytics contract as under negotiation and says that the analytics will support development of regional plans that inform the strategic plan, which is exactly this kind of chain."),
    blk('s2p2', "To find the critical path, list the tasks, note which tasks must finish before others can start and estimate durations. The longest chain from now to the deadline is the critical path, and any slip on it moves the deadline. Tasks off the path have slack and can be deferred without harm up to the slack available. This is ordinary project management, and it is also the clearest way to decide what not to do: work off the critical path with ample slack can wait, and work on the path cannot."),
    table('s2t1', 'A chain of dependencies in the May 2026 report (illustrative reading)', [
        {'Step': 'Analytics contract signed', 'Depends_on': 'Negotiation completed; funds obligated', 'Enables': 'Regional analysis'},
        {'Step': 'Regional analysis', 'Depends_on': 'Analytics contractor and hospital data', 'Enables': 'Regional plans'},
        {'Step': 'Regional plans', 'Depends_on': 'Regional analysis and hospital plans', 'Enables': 'Statewide Health Care Delivery Strategic Plan'},
    ]),

    h2('s3h1', 'Building the Work Plan'),
    blk('s3p1', "A work plan that survives contact with reality has a few features. It is organized by deliverable and not by activity, so that progress can be judged by what exists. It names one accountable owner for each deliverable. It states the capacity assumed, in hours or people, and the dependencies on others. It shows the critical path visibly. And it has a short list of deferred items, each with a stated reason and a date for reconsideration."),
    blk('s3p2', "The deferred list is the part most often omitted, and it is the most useful. A leader who can show that eight items were deliberately postponed, and why, is in a much stronger position than one whose plan quietly stopped mentioning them. It protects the team from being blamed for failing to do things it was never resourced to do, and it prompts a decision about whether to fund them if conditions change. Done openly, it also helps boards and legislators understand that the plan reflects choices, not an inability to plan."),
    steps('s3st1', 'A triage session in four steps', [
        ('List all work packages', 'Include the requirements in law and the commitments made to partners.'),
        ('Score value and feasibility', 'Argue the scores and write the assumptions next to them.'),
        ('Mark the critical path', 'Show the chain of dependencies to the next hard deadline.'),
        ('Decide and record', 'Fund the top items, plan to unblock the next, and list deferred items with reasons.'),
    ]),

    h2('s4h1', 'Triage Across a Portfolio of Hospitals'),
    blk('s4p1', "The chapter's worry about fourteen hospital plans suggests a form of triage that is specific to a portfolio. Not every hospital needs the same support. Some have strong management and capital, and can proceed with light-touch oversight. Some are financially fragile, and cannot afford delay. Some face a decision, such as a service reduction, that is time-sensitive and consequential. A program office with limited staff can differentiate: a lighter touch for the strong, intensive support for the fragile and rapid decision support for those facing time-bound choices."),
    blk('s4p2', "That approach has a cost, which is the appearance of unequal treatment. Hospitals may object if they believe others receive more help, and communities may fear that lighter support means less attention. The remedy is transparency about the criteria and about what each tier receives, and a commitment to review tiers as conditions change. Chapter 12's warning that uneven support produces uneven plans can be read as an argument for deliberate, explained differentiation over accidental unevenness."),
    blk('s4p3', "Equity enters here as well. A triage rule based on size or finances may deprioritize small, rural hospitals that serve the most vulnerable populations and have the least capacity of their own. Criteria should therefore include the needs of the population served, so that triage does not simply reproduce existing advantage. The same applies inside an organization: the services for patients with the fewest alternatives should not be the first to be deferred because they have the weakest internal advocates."),

    h2('s5h1', 'Communicating What Is Deferred'),
    blk('s5p1', "Deferral is a decision and should be communicated as one. A short note to the governing body, the staff and partners can state what has been prioritized, what has been deferred and what would cause the decision to be revisited. It should avoid blame and euphemism: describe the trade-off in plain words. It should also say what the deferral does not mean, to avoid rumors that a program has been cancelled."),
    blk('s5p2', "Leaders sometimes fear that admitting limits will reduce confidence or funding. The experience of improvement work suggests the reverse. Credibility comes from commitments kept, and a plan that promises less and delivers it builds more trust than one that promises everything and slips. Legislators and boards that receive consistent, honest reports about what is on track, what is at risk and what has been deferred are better able to supply the support, whether money, authority or patience, that the program needs."),

    takeaway('tw', [
        "When capacity is short, leaders can add capacity, delay or narrow; narrowing requires saying openly what will not be done.",
        "Rank work by value and feasibility, argue the scores and write the assumptions next to them.",
        "Easy, low-value work feels like progress and is a common way capacity is lost.",
        "Dependencies set urgency: tasks on the critical path cannot slip without moving the deadline, while tasks with slack can wait.",
        "Vermont's May 2026 report describes an analytics contract under negotiation that feeds regional plans and the strategic plan, a dependency chain.",
        "A good work plan is organized by deliverable, names owners, shows the critical path and includes a list of deferred items with reasons.",
        "Triage across hospitals should be explained and should include the needs of populations served so it does not reproduce advantage.",
    ]),
    quiz('qz',
        "What is the critical path in a work plan?",
        [
            ("The cheapest tasks", False),
            ("The longest chain of dependent tasks to the deadline, on which any delay moves the deadline", True),
            ("The tasks the board prefers", False),
            ("The tasks completed most recently", False),
        ],
        "The critical path is the longest chain of dependent tasks from now to the deadline. Tasks on it have no slack, so any slip on it delays the whole."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.4.2 The Transformation Pace Problem; §12.8 Implications for You (AHS and GMCB officials)"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — analytics contract, plans and funding status as of April 30, 2026"),
    blk('src3', "[3] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf"),
    blk('src4', "[4] HTR Academy, Transformation Leadership, Track 1 lesson Running the Sequencing Test — /academy/tracks/transformation-leadership/tl-running-the-sequencing-test"),
]

L13_SLUG = 'tl-shocks-and-contingency'
L13_TITLE = 'When the Ground Moves: Federal Shocks and Contingency Planning'
L13 = [
    blk('intro1', "Transformation plans meet events their authors did not schedule. Chapter 12 lists federal program decisions among the external constraints on pace, and 2026 supplied two. In July, the federal Centers for Medicare and Medicaid Services told Vermont in writing that its Medicaid hospital global budget had not been approved under the terms of the state's waiver. Later that month, the state announced that it was leaving the federal AHEAD model, citing cuts in federal funding. Both events changed the environment in which hospitals and agencies were planning."),
    blk('intro2', "This lesson uses these events as case studies in contingency planning. It reads the federal letter directly, reports the news account of the AHEAD withdrawal with its limits and draws out general methods: scenario planning, trigger points, decision logs and communication under uncertainty. It does not judge the merits of either decision, and it does not report what happened after the sources' dates, which it could not verify."),
    blk('intro3', "The aim is to equip a leader to respond to a shock with a plan and not a scramble."),

    h2('s1h1', 'The July 2026 Federal Letter'),
    blk('s1p1', "On July 7, 2026, the State Demonstrations Group at CMS wrote to the secretary of the Agency of Human Services. The letter says that the Medicaid hospital global budget implemented by the Department of Vermont Health Access has not been approved by CMS under the requirements of the state's Global Commitment to Health waiver. It cites the waiver's special terms and conditions, which require that payment arrangements between the state and providers that function like a value-based fee schedule meet the prior approval requirements for state directed payments, and that capitation rates meet actuarial soundness standards. It says the state is not compliant with two of those terms."),
    blk('s1p2', "The letter gives a reason this matters for rates: without authority for the global budget, federal rules prohibit the state from including its impact in the certified capitation rates. It requests three corrective actions. Within sixty days, the state's Medicaid agency should stop making the global budget payments and pay participating hospitals under the methodology used for non-participating providers. Within sixty days, the Agency should remove the global budget payments from the calendar year 2026 capitation rates and submit a revised rate certification. Within six months, the Medicaid agency should reprocess all global budget payments made since January 1, 2026. The letter warns that, if the state does not act, CMS will not be able to find the 2026 capitation rates actuarially sound and may begin procedures to terminate or suspend the demonstration."),
    blk('s1p3', "Those are the letter's words as read in the primary document. What the state did in response, whether it sought approval, and how hospitals were paid afterward are not in the letter, and this lesson did not verify them. The case is useful because it shows how quickly a payment arrangement can be affected by a procedural requirement, and how large the operational consequences are: stopping payments, revising rates and reprocessing months of claims, all within fixed periods."),
    callout('s1c1', "A federal letter turns a planning assumption into a deadline, with consequences, in a single page."),

    h2('s2h1', 'The AHEAD Withdrawal'),
    blk('s2p1', "On July 28, 2026, a Vermont television station reported that the state was abandoning the federal AHEAD model, which it had joined the previous year, after cuts in federal funding. According to the report, changes at the federal level significantly cut the amount of money the state could invest from Medicare. The report quoted the human services secretary as saying that the state remains committed to the long-term goal of global budgets but is not ready to implement them yet, and quoted the chair of the Green Mountain Care Board favoring withdrawal and saying that nothing actually changes for hospitals or providers, because the state never started the model."),
    blk('s2p2', "The report describes the Rural Health Transformation Program as the state's other major federal source and quotes the secretary's statement that details of spending will come in the coming months. It does not give a formal decision-maker or a timeline for global budgets, and the lesson takes no position on the decision. What it adds to the case is the earlier note in the Agency's May report that the innovation center's one million two hundred thousand dollars for transformation grants would have to be returned within ninety days if the state chose not to participate. The announcement therefore had a financial consequence that a reader of the earlier report could have anticipated."),
    blk('s2p3', "The two events together illustrate a typical pattern. A plan is built on several federal levers, such as a payment model, a waiver and a grant program. When one lever changes, the others may not move in step, and the plan has to be reassembled. The question for a leader is not whether such events will occur, but how prepared the organization is to respond when they do."),

    h2('s3h1', 'Scenario Planning and Trigger Points'),
    blk('s3p1', "Scenario planning replaces a single forecast with a small number of coherent futures. For a hospital, the scenarios might be framed by the status of fixed-revenue payment: it proceeds as planned, it is delayed for a defined period or it is replaced by a different arrangement. For each scenario, the organization writes what it would do, what it would stop doing and what it would need. The purpose is not to guess correctly but to be able to move quickly because the thinking was done in advance."),
    blk('s3p2', "Trigger points connect scenarios to action. A trigger is an observable event that tells the organization to shift from one plan to another: a written federal notice, a legislative vote, a cash balance falling below a set number of days. Agreeing on triggers in advance reduces argument in the moment, since the decision to act has already been taken. It also prevents two failure modes, reacting to every rumor and ignoring a real warning because it came without announcement."),
    table('s3t1', 'A scenario table for a payment-timeline shock (illustrative)', [
        {'Scenario': 'Fixed-revenue payment proceeds on schedule', 'Trigger': 'Federal and state approvals confirmed in writing', 'Response': 'Continue transformation spending; finalize budget model'},
        {'Scenario': 'Fixed-revenue payment delayed', 'Trigger': 'Written notice of delay or non-approval', 'Response': 'Protect core transformation work; defer new fixed costs; update cash forecast'},
        {'Scenario': 'Different arrangement replaces it', 'Trigger': 'Formal announcement of replacement terms', 'Response': 'Re-run financial model; renegotiate contracts; brief board and staff'},
    ]),

    h2('s4h1', 'Decision Logs and Communication'),
    blk('s4p1', "Under uncertainty, decisions are made with incomplete information, and it is easy to forget later why a choice was made. A decision log records, for each significant decision, the date, the options considered, the information available, the choice and the assumptions it relied on. When a shock arrives, the log shows which decisions depended on assumptions that have now changed, and therefore need review. It also protects leaders from hindsight, since it shows what they knew at the time."),
    blk('s4p2', "Communication during a shock should be prompt, plain and honest about uncertainty. Staff, boards and partners should hear what happened from the organization before they read it elsewhere. The message should state what is known, what is not known, what the organization is doing and when it will provide the next update. It should avoid both false reassurance and alarm. The quote in the news account that nothing actually changes for hospitals is an example of a message calibrated to a specific audience; whether it fully captures the situation depends on the details of each organization's contracts and budgets."),
    steps('s4st1', 'Responding to an external shock in the first week', [
        ('Read the primary document', 'Get the actual letter, notice or text, not a summary.'),
        ('Identify what depends on it', 'List decisions, contracts and budgets that rest on the changed assumption.'),
        ('Check the scenario table', 'Find the matching scenario and trigger; confirm the response.'),
        ('Inform people', 'Tell staff, board and partners what is known and when the next update comes.'),
        ('Log and review', 'Record decisions made and set a date to revisit them.'),
    ]),

    h2('s5h1', 'Building Resilience Before the Shock'),
    blk('s5p1', "Some resilience can be built in advance. Diversify funding where possible, so that no single lever carries the whole plan. Keep contracts flexible, with termination and scope-change provisions. Maintain a cash reserve consistent with the organization's risk. Keep the data and relationships that would be needed under any scenario, such as accurate cost data and working links with regulators. And build the habit of reading primary documents, since summaries in the press are often incomplete or simplified."),
    blk('s5p2', "Finally, remember that a shock is also an opportunity to learn. After the event, hold a short review: what did we know, when did we know it, how did we respond and what would we do differently? Write down the answers and revise the scenario table. Organizations that review their responses become faster over time, and those that do not repeat the scramble. Chapter 12's final theme, that transformation infrastructure must be in place before the workload peaks, applies to contingency as much as to program management."),

    takeaway('tw', [
        "On July 7, 2026, CMS wrote that Vermont's Medicaid hospital global budget had not been approved under its Global Commitment waiver terms and requested corrective actions within 60 days and six months.",
        "The letter warned that without action CMS could not find the 2026 capitation rates actuarially sound and might begin procedures to terminate or suspend the demonstration.",
        "On July 28, 2026, a Vermont news report said the state was leaving the AHEAD model after federal funding cuts; the secretary said the state remains committed to global budgets but is not ready.",
        "The Agency's May 2026 report had noted that $1.2 million in AHEAD transformation grant funds would have to be returned within 90 days if the state did not participate.",
        "Scenario planning and agreed trigger points let an organization respond quickly without guessing the future.",
        "A decision log records what was known and assumed, so a shock shows which decisions need review.",
        "Read primary documents, communicate promptly and honestly, and review each response afterward.",
    ]),
    quiz('qz',
        "What is the purpose of a trigger point in contingency planning?",
        [
            ("To predict which scenario will occur", False),
            ("To provide an agreed, observable event that tells the organization to shift from one plan to another", True),
            ("To blame the person who missed an earlier warning", False),
            ("To replace the need for a budget", False),
        ],
        "Triggers link scenarios to action, so the decision to act is made in advance and the organization neither reacts to every rumor nor ignores a real warning."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.4.2 The Transformation Pace Problem (external constraints)"),
    blk('src2', "[2] Centers for Medicare and Medicaid Services, State Demonstrations Group, letter to the Vermont Agency of Human Services, July 7, 2026 — https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-gch-stc-compl-lttr-07072026.pdf — read directly"),
    blk('src3', "[3] WCAX, Vermont drops AHEAD healthcare model; shifts to $195M rural health fund, July 28, 2026 — https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/ — news report; quotations as reported"),
    blk('src4', "[4] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — AHEAD funds and return condition"),
]

LESSONS = [(L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12), (L13_SLUG, L13_TITLE, L13, 13)]
if __name__ == '__main__':
    run(LESSONS)
