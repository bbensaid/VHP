exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_psr_common.py').read())

# Track 3 — Early Warning, Scenarios and Monitoring. Book Figures 14.1-14.2 are HTR's April 2026 assessment; the lessons
# annotate each with what the 2026 record (lessons 4-6 sources) shows and say 'not observed in the sources read' where a
# signal could not be checked. Tool facts read from source on 2026-11-23: lib/wire/vt-bills.ts (seven tracked bills,
# verified by the tool's author 2026-10-09), components/framework/FrictionScorer.tsx (bands, browser-local snapshot),
# lib/framework/sequence-engine.ts (the Vermont, Fall 2026 preset: policy 80, technology 45, economics 55, clinical 65,
# operations 50).

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'psr-early-warning-signals'
L7_TITLE = 'Early-Warning Signals: Reading the Risk Before the Statute Changes'
L7 = [
    blk('intro1', "A reform is rarely weakened in one move. The weakening shows first as behavior: lobbying aimed at the methodology, bills that move a deadline, budgets set near current prices, a plan that slips. Chapter 14 turns these into a table of eight early-warning signals, each with a severity and a place to watch. An organization that watches them has lead time. One that does not learns of the change when it is law."),
    blk('intro2', "This lesson reproduces the signals, explains how to read each, and then does something the chapter could not do when it was written: it checks each against the 2026 record. For some the answer is clear from the sources read. For others the sources are silent, and the lesson says so instead of guessing."),
    blk('intro3', "It also presents the four general categories that make the framework usable outside Vermont."),

    h2('s1h1', 'The Eight Signals'),
    table('s1t1', 'Early-warning signals of political risk (HTR Figure 14.1, April 2026)', [
        {'Signal': 'Hospital lobbying focused on RBP methodology rather than the mandate', 'Indicates': 'Effort to hollow out RBP through the regulatory process', 'Severity': 'High', 'Watch': 'Board docket; hospital association statements'},
        {'Signal': 'Bills to extend RBP or global-budget deadlines', 'Indicates': 'Direct challenge to the mandatory timeline', 'Severity': 'Very high', 'Watch': 'Legislature bill tracker; advisory committee testimony'},
        {'Signal': 'Global budget levels set within 5% of current commercial rates', 'Indicates': 'Regulatory capture; budgets without pressure', 'Severity': 'High', 'Watch': 'Board budget guidance'},
        {'Signal': 'Strategic Plan described as in progress in December 2027', 'Indicates': 'Operations failure; deadline unlikely to be met', 'Severity': 'High', 'Watch': 'Agency transformation reports'},
        {'Signal': 'CMS AHEAD modification request', 'Indicates': 'Pressure to weaken AHEAD accountability', 'Severity': 'Very high', 'Watch': 'CMS and Agency communications'},
        {'Signal': 'Governor candidate platforms including RBP repeal or delay', 'Indicates': 'Political threat in the 2026 cycle', 'Severity': 'Very high', 'Watch': 'Campaign coverage; candidate statements'},
        {'Signal': 'EAST Fund spending well below authorized levels', 'Indicates': 'Resistance to transformation investment', 'Severity': 'Moderate', 'Watch': 'DVHA reports; Board documentation'},
        {'Signal': 'Advisory committee fails to reach consensus on the Strategic Plan framework', 'Indicates': 'Governance breakdown', 'Severity': 'High', 'Watch': 'Committee minutes; Agency reporting'},
    ]),
    blk('s1p1', "The table has a structure worth noticing. Each signal pairs an observable event with an inference, and each names a source where the event would appear. That is the format of a usable indicator: it can be checked on a date by a named person. The severity ratings are the chapter's judgments, expressing how directly the event would threaten the mandate."),
    blk('s1p2', "The chapter's own caveat matters: it records the April 2026 assessment, and its signals tied to AHEAD were overtaken in July 2026 when Vermont withdrew. A signal list is a living document, and the first task of a monitor is to retire signals that events have made moot and to add the ones events have revealed."),

    h2('s2h1', 'Checking the Signals Against 2026'),
    blk('s2p1', "The sources read for this course allow some signals to be assessed. The signal about budgets set close to current commercial rates was not observed in the case examined: in September the Board voted 3 to 2 to order a 4.4 percent cut to the University of Vermont Medical Center's commercial prices, a visible reduction and not a no-change budget, although the sources read do not give the full level of the budget against a no-change position. The signal about a CMS modification request was overtaken by the withdrawal. The signal about bills to extend deadlines was not observed in the sources read: S.190, the 2026 reference-based pricing bill, would have started pricing for two groups sooner, not later."),
    blk('s2p2', "The signal about governor candidate platforms did not fire in the form described. The reporting read described the Democratic and Progressive candidate as supporting publicly funded universal primary health care and tax increases on high earners, and the incumbent as focused on affordability, with no reference found in those articles to repeal or delay of Act 68's pricing mandate. The remaining signals, hospital lobbying aimed at methodology, spending below authorized levels, the Strategic Plan's progress and advisory committee consensus, could not be assessed from the sources read."),
    table('s2t2', 'Status of the signals as of late November 2026 (from the sources read for this course)', [
        {'Signal': 'Hospital lobbying on methodology', 'Status': 'Not assessed: no source read'},
        {'Signal': 'Bills to extend deadlines', 'Status': 'Not observed in the sources read; S.190 would have accelerated pricing for two groups'},
        {'Signal': 'Budgets near current commercial rates', 'Status': 'Not observed in the instance read: 4.4% commercial price cut ordered for the Medical Center in September'},
        {'Signal': 'Strategic Plan slipping', 'Status': 'Not assessable until 2027 reports; due January 15, 2028'},
        {'Signal': 'CMS AHEAD modification', 'Status': 'Overtaken: Vermont withdrew in July 2026'},
        {'Signal': 'Governor candidate platforms', 'Status': 'Not observed in the articles read'},
        {'Signal': 'EAST Fund spending', 'Status': 'Overtaken: the fund is tied to AHEAD participation'},
        {'Signal': 'Advisory committee consensus', 'Status': 'Not assessed: minutes not read'},
    ]),
    callout('s2c1', "A signal that has not fired is not evidence of safety; it may simply be unmonitored. Record 'not assessed' separately from 'not observed'."),

    h2('s3h1', 'Four General Categories'),
    blk('s3p1', "Chapter 14 abstracts the eight signals into four categories that precede the unwinding of a comparable reform in any state. A change in the governing party's posture toward the reform. A high-profile enforcement challenge, which in Vermont was the University of Vermont Medical Center's dispute with the Board. A hospital-sector coalition campaign. And a federal policy shift that changes the reform's financial assumptions."),
    blk('s3p2', "A reader in another state should identify who plays each role. The most politically influential health system is the actor most likely to generate the enforcement challenge. The hospital association is the likely coalition. The governor's office and the legislative leadership signal the party posture. And federal developments, such as CMS model changes, Medicaid financing law and waiver policy, supply the fourth category. The 2026 record shows examples of three of the four in Vermont: the federal shift in the AHEAD funding change, the enforcement dispute in the Medical Center budget orders and a change in the political configuration in the election."),

    h2('s4h1', 'Using the Signals'),
    steps('s4st1', 'Operating a signal list', [
        ('Assign an owner and a date', 'Each signal has a named person who checks the source on a fixed schedule.'),
        ('Record the evidence', 'Log what was seen, the date and the document, even when the answer is nothing.'),
        ('Distinguish three states', 'Fired, not observed, and not assessed; never merge the last two.'),
        ('Link each signal to a decision', 'Say what the organization would do if it fires, so the signal changes behavior and not only awareness.'),
        ('Retire and add', 'Remove signals events have overtaken and add new ones events reveal.'),
    ]),
    blk('s4p1', "The last step is the most neglected. A signal that does not connect to a decision is information without use. The scenarios of the next lesson supply the decisions."),

    h2('s5h1', 'Severity, Lead Time and Noise'),
    blk('s5p1', "A signal is useful in proportion to the lead time it gives and the noise it carries. Lead time is the interval between the signal and the decision it should inform. A bill to extend a deadline gives months, since legislation moves through hearings and votes. A budget order gives days. A court ruling may give hours. The severity ratings in the chapter's table express how directly an event threatens the mandate, but an organization should add its own column: how much time does this signal give us, and what is the earliest decision it should trigger?"),
    blk('s5p2', "Noise is the other half. A single statement from a hospital association is common and rarely decisive; a sustained campaign focused on the methodology docket, with filed comments and meetings with Board members, is a different thing. The practical rule is to look for two independent signals pointing the same way before changing a plan, such as hospital lobbying on methodology together with a bill that would delay a deadline, and to treat one signal as a reason to look harder. Equally, one very high severity signal, such as a bill that directly extends a statutory deadline, justifies acting on its own because the cost of waiting is large."),
    blk('s5p2c', "Finally, share the list. A signal log that sits with one analyst helps one person. A log circulated to the chief executive, the chief financial officer, the head of government relations and the board chair, with a short monthly note, spreads the same information across the people who will make the decisions, and it exposes disagreements about interpretation early, when they are cheap to resolve."),
    blk('s5p2b', "A related discipline is to date the baseline. When a monitor first sets up the list, it should record the state of each signal on that day, so that later changes are visible against a known starting point. A budget order that cuts commercial prices by 4.4 percent means something different to an organization that was expecting a 2 percent cut than to one expecting none. Baselines turn news into signals by saying what was expected, and they make it possible to tell, a year later, whether the environment moved toward the reform or away from it."),
    blk('s5p3', "Write the decision beside each signal in advance. If a deadline-extension bill is introduced, the organization will model the delay scenario within a week. If the Board publishes budget guidance within a narrow band of current prices, it will test whether its own investment case still holds without the pricing pressure. If the Strategic Plan draft lacks numeric targets by mid-2027, it will brief its board and engage the Agency. A signal list with decisions attached is a decision tool. Without them it is a news clipping service."),

    takeaway('tw', [
        "Chapter 14's eight early-warning signals pair an observable event with an inference, a severity and a source to watch.",
        "The signals were assessed in April 2026; those tied to AHEAD were overtaken by the July 2026 withdrawal, so a signal list must be maintained.",
        "Against the sources read, the CMS AHEAD signal was overtaken and the signals on deadline-extension bills, budgets near current rates and gubernatorial platforms were not observed; several others could not be assessed.",
        "Record 'not assessed' separately from 'not observed': a signal that has not fired may simply be unmonitored.",
        "The four general categories are a change in party posture, a high-profile enforcement challenge, a hospital-sector coalition campaign and a federal policy shift.",
        "The 2026 record shows a federal shift, an enforcement dispute and a change in political configuration in Vermont.",
        "Link every signal to a decision so that it changes behavior and not only awareness.",
    ]),
    quiz('qz',
        "Why does the lesson recommend keeping 'not assessed' separate from 'not observed' on a signal list?",
        [
            ("Because they mean the same thing", False),
            ("Because a signal that has not fired may simply be unmonitored, so absence of evidence must not be recorded as safety", True),
            ("Because only observed signals matter", False),
            ("Because signals should only be assessed once", False),
        ],
        "A signal marked 'not observed' means someone looked and saw nothing; 'not assessed' means no one looked. Merging them can create false reassurance."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.3 and Figure 14.1: early-warning signals; Beyond Vermont box"),
    blk('src2', "[2] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
    blk('src3', "[3] Vermont Public, Phil Scott wins historic sixth term as Vermont governor (November 3, 2026) — https://www.vermontpublic.org/local-news/2026-11-03/phil-scott-wins-historic-sixth-term-as-vermont-governor"),
    blk('src4', "[4] Vermont Public, Gov. Phil Scott vetoes 'soft opening' for hospital pricing reforms (June 16, 2026) — https://www.vermontpublic.org/local-news/2026-06-16/gov-phil-scott-vetoes-soft-opening-for-hospital-pricing-reforms"),
    blk('src5', "[5] Vermont Agency of Human Services announcement of July 24, 2026 on AHEAD, as published by VermontBiz — https://vermontbiz.com/news/2026/july/24/vermont-withdraws-ahead-commits-rural-health-transformation"),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'psr-disruption-scenarios'
L8_TITLE = 'Disruption Scenarios: Planning for Outcomes You Cannot Predict'
L8 = [
    blk('intro1', "A scenario plan is not a forecast. It is a way of deciding in advance what to do under specified conditions, so that when one arrives the organization acts in days and not months. Chapter 14 recommends that every Vermont organization exposed to Act 68's timelines maintain scenario plans for at least three disruptions and presents five scenarios with HTR's April 2026 probability assessment."),
    blk('intro2', "This lesson explains the method, reproduces the chapter's scenario table with its caveat that the probabilities were overtaken in part by events, and then builds an updated scenario set for the position after the November election. The updated scenarios are this course's own, labeled as such, and carry no published probabilities."),
    blk('intro3', "The aim is a plan an organization can maintain, review and act on."),

    h2('s1h1', 'The Method'),
    blk('s1p1', "A scenario has five parts. A condition, stated so that it is clear whether it has occurred. A trigger, the observable event that will tell the organization it has occurred or is about to. An impact, the effect on revenue, cost or capacity. A response, what the organization will do in the first ninety days. And an owner, the person responsible for monitoring the trigger and starting the response. A scenario without a trigger and an owner is a story."),
    blk('s1p2', "Probabilities help but are not essential. Chapter 14 attaches HTR's own assessments to its scenarios, from 10 to 15 percent for the least likely to 35 to 45 percent for the most, and calls them planning inputs, not predictions. Their function is to focus effort. A scenario that is both likely and damaging deserves detailed planning, and one that is unlikely and mild deserves a line in the plan."),
    callout('s1c1', "The test of a scenario plan is whether, on the day the trigger fires, a named person knows what to do first."),

    h2('s2h1', "Chapter 14's Scenarios and What Overtook Them"),
    table('s2t1', 'Disruption scenarios (HTR Figure 14.2, April 2026 assessment)', [
        {'Scenario': 'RBP delayed 18+ months', 'HTR_probability': 'Moderate (25-35%)', 'Impact': 'Commercial revenue maintained longer; urgency reduced', 'Response': 'Maintain investments; use extra time to build clinical infrastructure'},
        {'Scenario': 'Global budgets within 5% of current commercial rates', 'HTR_probability': 'Low to moderate (15-25%)', 'Impact': 'Minimal financial pressure; accountability without incentive', 'Response': 'Engage the methodology process; document cost structure'},
        {'Scenario': 'EAST Fund cut 30%+', 'HTR_probability': 'Moderate to high (35-45%)', 'Impact': 'Primary care and behavioral health investment capacity reduced', 'Response': 'Prioritize highest-return investments; diversify funding'},
        {'Scenario': '2026 governor committed to Act 68 modification', 'HTR_probability': 'Low (10-15%)', 'Impact': 'Legislative challenge in 2027 session', 'Response': 'Build legislative relationships; document progress'},
        {'Scenario': 'CMS AHEAD modification reducing accountability', 'HTR_probability': 'Low (10-20%)', 'Impact': 'Reduced federal accountability', 'Response': 'Maintain state accountability via the Board'},
    ]),
    blk('s2p1', "Two points of caution. The EAST Fund scenario and the AHEAD scenario were overtaken in July 2026: the funding cut the chapter put at 35 to 45 percent in April was realized, and Vermont then withdrew. The book itself records this. The probabilities were also assessments made before the veto, the budget order and the election. The lesson reproduces them as an example of the form, not as current estimates."),
    blk('s2p2', "What the table shows well is the pairing of each condition with a response that holds up. The responses on the right mostly say the same thing: keep investing in capabilities that serve under any scenario, engage the process with data and diversify funding. That is the chapter's advice in Lesson 10's terms, structural irreversibility."),

    h2('s3h1', 'An Updated Scenario Set (This Course\'s Own)'),
    blk('s3p1', "After the November election several conditions are plausible that the April table did not include. This lesson proposes five, without probabilities. First, the legislature enacts, over a veto if necessary, pricing across all commercial payers on an accelerated schedule. Second, the legislature and the governor agree a compromise that sets a phase-in and protections for critical access hospitals. Third, no legislation passes and the Board continues to reduce hospital revenue through budget orders. Fourth, the Board's membership and posture change, shifting the pace of budget reductions. Fifth, the expiry of time-limited funding, including the state's appropriation for Medicare's share of Blueprint payments, which covered 2026, leaves programs short in 2027."),
    table('s3t1', 'Post-election scenarios, with triggers and first responses (this course\'s illustration)', [
        {'Scenario': 'Accelerated all-payer repricing enacted', 'Trigger': 'Bill passes both chambers; veto override vote', 'First_ninety_days': 'Re-run the stress test at the new price caps; freeze discretionary capital; open payer talks'},
        {'Scenario': 'Negotiated phase-in', 'Trigger': 'Joint announcement or conference report with a schedule', 'First_ninety_days': 'Model phase-in years; line up the investments that help most in the early years'},
        {'Scenario': 'Budget orders continue without new law', 'Trigger': 'Board guidance for the next budget year', 'First_ninety_days': 'Prepare the budget submission with the cost and utilization data the Board will weigh'},
        {'Scenario': 'Board composition or posture shifts', 'Trigger': 'Appointments; changes in split votes', 'First_ninety_days': 'Brief new members with data; watch voting patterns'},
        {'Scenario': 'Funding gap for a program in 2027', 'Trigger': 'No appropriation or agreement before the budget is set', 'First_ninety_days': 'Identify staff and services at risk; seek bridge funding; document outcomes'},
    ]),
    warning('s3w1', "These are illustrations, not forecasts", "The scenarios above are this course's examples of the form. They carry no probabilities because no source read supports any. An organization should write its own, tied to its own plan."),

    h2('s4h1', 'Making the Plan Work'),
    blk('s4p1', "Three habits make a scenario plan useful. Review it on a fixed calendar, quarterly at least, and at once when a trigger fires. Test it: run each scenario through the organization's financial model, using tools such as the Hospital Financial Stress Test from the finance course, so that impacts are numbers and not adjectives. And connect it to decisions: for each investment in the capital plan, state which scenarios it survives, using the structural-irreversibility test of the next track."),
    blk('s4p2', "The most common failure is a plan written once for a board and never updated. The 2026 events changed the scenario landscape three times in six months. A plan that was current in April was out of date by July."),

    h2('s5h1', 'Writing a Scenario Card: A Worked Example'),
    blk('s5p1', "Take the first post-election scenario, accelerated all-payer repricing. A card for a hospital might read as follows. Condition: the legislature enacts, over a veto if necessary, a cap on commercial hospital prices across all payers beginning in the next budget year. Trigger: a bill passes both chambers, or the Board publishes a rule setting maximum prices. Impact: use the stress test's formula. If commercial payers are 35 percent of net patient revenue and prices are 300 percent of Medicare, a cap at 200 percent reduces revenue by about 11.7 percent, which on $100 million of revenue is about $11.7 million a year, and a cap at 250 percent about 5.8 percent. These are illustrative inputs, not any hospital's figures."),
    blk('s5p2', "Response in the first ninety days: re-run the stress test with the hospital's own payer mix and price level; identify the three largest service lines by commercial revenue and their margins; freeze new discretionary capital that depends on commercial revenue growth; open a conversation with the Board about methodology and with payers about contract terms; and brief the board of directors on the range. Owner: the chief financial officer, with the chief executive named as decision-maker. A card of this kind takes an hour to draft and turns a headline into a plan."),
    blk('s5p2b', "Cards should be kept short, a page at most, and stored where the people who need them can find them in a hurry. Each should carry the date it was written and the date of its last review, because a card that has not been reviewed since the last major event is likely to describe a world that has changed."),
    blk('s5p3', "Notice what the card does not contain: a prediction that the scenario will happen. Its value lies in the preparation. The hospital that has already identified its three largest commercial service lines, and has a draft briefing for its board, loses weeks that an unprepared peer spends gathering data while the Board's schedule moves on. Cards also create a shared vocabulary. When an executive says the repricing scenario has fired, everyone knows which card to pull and which tasks begin, which shortens the time between the news and the decision."),
    h2('s6h1', 'Linking Scenarios to the Capital Plan'),
    blk('s6p1', "The most valuable use of the scenario set is to test each planned investment against it. List the investments in the capital plan on one axis and the scenarios on the other, and mark each cell as holds value, loses value or depends. An investment in a care management program with an analytics platform that serves global budgets, commercial contracts and the next federal model will hold value in most cells. An investment that exists only to meet a specific model's reporting requirement will lose value if that model ends, as AHEAD-specific compliance did."),
    table('s6t1', 'A scenario-by-investment test (illustrative)', [
        {'Investment': 'Population health analytics platform', 'Accelerated_repricing': 'Holds value', 'Phase_in': 'Holds value', 'Budget_orders_only': 'Holds value', 'Funding_gap': 'Depends on operating funds'},
        {'Investment': 'Care management team', 'Accelerated_repricing': 'Holds value if funded', 'Phase_in': 'Holds value', 'Budget_orders_only': 'Holds value', 'Funding_gap': 'At risk'},
        {'Investment': 'Reporting built to one federal model\'s rules', 'Accelerated_repricing': 'Depends', 'Phase_in': 'Depends', 'Budget_orders_only': 'Depends', 'Funding_gap': 'Loses value if the model ends'},
        {'Investment': 'Service line expansion reliant on commercial growth', 'Accelerated_repricing': 'Loses value', 'Phase_in': 'Depends', 'Budget_orders_only': 'Depends', 'Funding_gap': 'Depends'},
    ]),
    blk('s6p2', "Cells marked 'loses value' are the ones to challenge before committing capital. The exercise does not need probabilities. It needs honesty about which investments are bets on a particular outcome."),

    takeaway('tw', [
        "A scenario has a condition, a trigger, an impact, a first-ninety-day response and an owner; without a trigger and an owner it is a story.",
        "Chapter 14 attaches HTR's April 2026 probabilities, from 10 to 15 percent to 35 to 45 percent, as planning inputs, not predictions.",
        "The EAST Fund and AHEAD scenarios were overtaken in July 2026; the probabilities predate the veto, the budget order and the election.",
        "The chapter's responses converge on three moves: keep investing in capabilities that hold value under any scenario, engage the process with data and diversify funding.",
        "This course proposes five post-election scenarios, none with a probability: accelerated all-payer repricing, a negotiated phase-in, budget orders without new law, a shift in the Board and a program funding gap.",
        "Test each scenario in the organization's financial model so impacts are numbers, and review the plan quarterly and whenever a trigger fires.",
        "A plan current in April was out of date by July; scenario plans need a maintenance calendar.",
    ]),
    quiz('qz',
        "What are the five parts of a usable scenario, as set out in this lesson?",
        [
            ("Probability, headline, cost, poll and owner", False),
            ("Condition, trigger, impact, first-ninety-day response and owner", True),
            ("Cause, blame, remedy, deadline and budget", False),
            ("Forecast, confidence, range, date and source", False),
        ],
        "A scenario needs a condition stated clearly, a trigger that signals it, an impact, a response for the first ninety days and an owner who monitors the trigger and starts the response."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.4.3 and Figure 14.2: scenario planning and HTR's April 2026 probability assessment"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — the 2026 appropriation covering Medicare's share"),
    blk('src3', "[3] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
    blk('src4', "[4] HTR Research Lab, Hospital Financial Stress Test — https://healthtransformationreview.org/research-lab/policy-quality?tab=scorecard"),
]

# ════════════════════════════════════════════════════════════════════════════
L9_SLUG = 'psr-monitoring-system'
L9_TITLE = 'Building the Monitoring System: The Wire, the Simulator and the Friction Index'
L9 = [
    blk('intro1', "Signals and scenarios need instruments. Chapter 14 points to three on the platform: The Wire, which tracks Vermont's health-reform bills; the HTR Simulator, which shows how withdrawing support from one pillar spreads to the others; and the Transformation Friction Index, which lets you score friction by pillar and re-score over time. This lesson explains what each does, from the tools' own documentation, and sets out a monthly routine that uses them."),
    blk('intro2', "It is specific about what each tool can and cannot show. The bill tracker reads public legislative status pages; the simulator is a model of dependency; the friction index is a scoring worksheet with a browser-local snapshot. None is an oracle, and each is useful in proportion to the care taken with its inputs."),
    blk('intro3', "The routine at the end is deliberately small, so that it gets done."),

    h2('s1h1', 'The Wire: Tracking Bills'),
    blk('s1p1', "The Wire carries a Vermont health-reform bill tracker, built, according to its source notes, to follow the kinds of bills Chapter 14 names: bills that would amend Act 68, change the Board's duties or shift its enforcement posture. It reads each tracked bill's public status page on the Vermont Legislature's website, parses the bill number, title, last recorded action and date, and caches the result. It observes the site's crawl delay, fetches at most one bill per call and refreshes each bill at most once a day. If a field cannot be parsed, it keeps the last good status marked with its check date and never invents one."),
    blk('s1p2', "The curated list for the 2025 to 2026 biennium has seven bills: S.126, Act 68 itself; S.190, the reference-based pricing bill vetoed in June; S.63, which modifies the Board's regulatory duties; H.482, on the Board's authority to adjust a hospital's reimbursement rates and appoint a hospital observer; S.189, on the process for eliminating hospital services; S.197, on primary care reform including insurer primary care spending and regional models; and H.266, on 340B drug pricing protections. The notes say new session bills must be added as they are introduced, so the list needs a maintainer when the 2027 session opens."),
    callout('s1c1', "A bill tracker is only as good as its list. When a new session begins, the first monitoring task is to decide which bills belong on it."),

    h2('s2h1', 'The HTR Simulator: How Risk Spreads'),
    blk('s2p1', "The framework's dependency engine underlies the simulator. Its Vermont, Fall 2026 preset sets pillar scores of 80 for Policy, 45 for Technology, 55 for Economics, 65 for Clinical and 50 for Operations, and describes the policy gate as open on state authority but narrower than planned after July 2026, when AHEAD was withdrawn and the Medicaid hospital global budget was halted. The book's use of the simulator is to drop the Policy score and watch Economics fall with it, which demonstrates why political risk to one pillar is not contained to that pillar."),
    blk('s2p2', "For a monitoring routine the simulator answers a specific question: if a given political outcome occurs, which pillars fall and how far? Translate a scenario into a change in the Policy score, for example a delay in reference-based pricing lowering the Policy gate's strength, and read the downstream effect. The result is a qualitative sense of dependency, not a financial forecast, and the preset scores are the platform's reference state, not measurements."),

    h2('s3h1', 'The Transformation Friction Index'),
    blk('s3p1', "The Friction Index scores friction in each of five pillars, with bands: below 40 is manageable, 40 to 69 is significant and 70 or more is severe. Its default scoring for Vermont, Fall 2026, sets Policy friction at 10, Technology at 60, Economics at 45, Clinical at 35 and Operations at 50, with an equity friction input at 40. The tool lets a user save a scoring in the browser and re-score later to see which pillar's friction is rising, and the notes cite Chapter 14's point that rising friction tends to appear in operating data before it becomes a legislative problem."),
    blk('s3p2', "The snapshot is stored only in the user's browser, a per-viewer convenience and not shared or backed up, so a team that wants a record should copy the scores into its own log. Used monthly, the index turns an impression, that things are getting harder in operations, into a number with a date."),
    table('s3t1', 'The three instruments', [
        {'Instrument': 'The Wire: Vermont bill tracker', 'Answers': 'What is happening to the bills that could change Act 68?', 'Limit': 'Seven curated bills; status from public pages, refreshed daily'},
        {'Instrument': 'HTR Simulator', 'Answers': 'If one pillar loses support, which others fall?', 'Limit': 'Reference scores, not measurements; qualitative dependency'},
        {'Instrument': 'Transformation Friction Index', 'Answers': 'Where is friction rising?', 'Limit': 'Scores are the user\'s judgments; snapshot saved only in one browser'},
    ]),

    h2('s4h1', 'A Monthly Routine'),
    steps('s4st1', 'A one-hour monthly monitoring routine', [
        ('Scan the bill tracker', 'Note any status change in the seven bills and any new bill that belongs on the list.'),
        ('Check the regulator', 'Read the Board\'s latest budget guidance, orders and agenda; record changes in methodology or levels.'),
        ('Check the federal channel', 'Look at CMS model pages, Medicaid guidance and the work requirement timeline for changes that affect your assumptions.'),
        ('Update the signal list', 'Mark each of the eight signals fired, not observed or not assessed, with the evidence.'),
        ('Re-score friction and run the simulator', 'Record the friction scores and test the leading scenario in the simulator.'),
        ('Decide', 'Say whether any scenario trigger has fired and, if so, start its response.'),
    ]),
    blk('s4p1', "The routine produces a one-page note each month: what changed, which signals moved, which scenario triggers are near and what decision, if any, is needed. Over a year, those notes become the evidence base for the organization's regulatory engagement and its board reporting, which Track 4 covers."),
    warning('s4w1', "Tools extend attention; they do not replace it", "A tracker shows a bill's status and not its meaning. Someone still has to read the bill, understand the amendment and judge its effect on the plan."),

    h2('s5h1', 'A Worked Example Across the Three Tools'),
    blk('s5p1', "Suppose the tracker shows a new bill in the 2027 session that would apply reference-based pricing to all commercial payers on an accelerated schedule. Step one is to read the bill and record its effective date and scope. Step two is to translate it into the Simulator: the Policy gate is strengthened in the near term, so the question becomes what happens downstream, since Economics rises in pressure and Operations and Technology must absorb a faster timetable. Step three is to re-score friction for the organization: Economic Friction rises, and if the organization's data and staffing are not ready, Technology and Operational Friction will be the binding constraints, which Chapter 14's point about rising friction in operating data anticipates."),
    blk('s5p2', "Step four is to move from instruments to decisions. The organization updates its signal list, marks the scenario trigger for accelerated repricing as fired or imminent and starts the ninety-day response from its scenario card. The three tools together turned a bill number into a quantified exposure and a started plan within a day."),
    blk('s5p3', "The same worked example can be run backward as a check on the instruments. If the tracker shows a bill's status changing and the Simulator and index inputs do not move, either the bill is not material or the instruments are not capturing the channel through which it matters. Asking that question each quarter is how a monitoring system improves."),
    h2('s6h1', 'What the Instruments Cannot Do'),
    blk('s6p1', "Each instrument has a boundary, and a good monitor states it. The bill tracker does not read the substance of an amendment, does not capture regulatory dockets and does not track executive action, such as the governor's stated intention to advance parts of his own package administratively. The Simulator describes dependency among pillars from the framework's logic, so it cannot tell you the size of a financial effect. The Friction Index holds the user's own scores, so two people scoring the same organization may differ, which is why the score should be made by a small group and recorded with its reasoning."),
    blk('s6p2', "The remedy for these gaps is the documents themselves: the Board's orders and dockets, the Agency's reports, the legislature's bill text and the courts' dockets. Treat the instruments as the index to those documents and not as a replacement for them."),

    takeaway('tw', [
        "The Wire's Vermont bill tracker follows seven curated bills for the 2025-2026 biennium, including S.126 (Act 68), S.190, S.63, H.482, S.189, S.197 and H.266, and must be updated when a new session begins.",
        "The tracker reads public legislative status pages, respects the site's crawl delay, refreshes each bill at most daily and never invents a status.",
        "The HTR Simulator's Vermont, Fall 2026 preset scores Policy 80, Technology 45, Economics 55, Clinical 65 and Operations 50, and shows how withdrawing support from one pillar affects the others.",
        "The Friction Index bands are below 40 manageable, 40 to 69 significant and 70 or more severe, with a browser-local snapshot for re-scoring.",
        "The Friction Index snapshot is stored only in one browser, so teams should copy scores into their own log.",
        "A monthly routine scans bills, the regulator and the federal channel, updates the signal list, re-scores friction and decides whether a scenario trigger has fired.",
        "Tools extend attention but do not replace reading the underlying documents.",
    ]),
    quiz('qz',
        "What does the Transformation Friction Index let a user do over time?",
        [
            ("Predict election outcomes", False),
            ("Save a scoring in the browser and re-score later to see which pillar's friction is rising", True),
            ("Automatically file comments with the Board", False),
            ("Replace the Simulator", False),
        ],
        "The index scores friction by pillar with bands, and lets users save a snapshot in their browser and re-score later to see which pillar's friction is rising. The snapshot is local to one browser, so a team should keep its own log."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.6 and Figure 14.3: platform tools for monitoring political risk"),
    blk('src2', "[2] HTR, The Wire — https://healthtransformationreview.org/the-wire — Vermont bill tracker; source notes in lib/wire/vt-bills.ts read 2026-11-23"),
    blk('src3', "[3] HTR Simulator — https://healthtransformationreview.org/htr-simulator — Vermont, Fall 2026 preset from the framework's sequence engine"),
    blk('src4', "[4] HTR Transformation Friction Index — https://healthtransformationreview.org/transformation-friction-index — bands and snapshot behavior read from the tool's source"),
    blk('src5', "[5] Vermont Legislature, bill status pages — https://legislature.vermont.gov/bill/status/2026/S.190 — the public pages the tracker reads"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
