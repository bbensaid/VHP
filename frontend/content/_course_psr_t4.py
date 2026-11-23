exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_psr_common.py').read())

# Track 4 — Organizational Strategies. Verified 2026-11-23 from the Act 68 text (read from the PDF): Sec. 11a (hospital
# spending reductions of not less than 2.5 percent for hospital fiscal year 2026; AHS updates on the first day of each month of
# hospital fiscal year 2026 beginning October 1, 2025; collaborative process with state-action immunity), Sec. 11b (outcome
# measures for the five Act 167 goals), Sec. 18 (appropriations), plus search summaries for the Board's budget calendar.
# NOTE for the author (not edited): the book (§14.4.4) calls AHS's reports 'monthly transformation reports required by Act 68';
# the statute's monthly updates are tied to months of hospital fiscal year 2026, which ended September 30, 2026.

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'psr-irreversible-investments'
L10_TITLE = 'Build Investments That Hold Value Under Every Scenario'
L10 = [
    blk('intro1', "The first of Chapter 14's four organizational strategies is also the most powerful: build investments that are hard to reverse. An organization cannot control the election, the Board's next order or a federal agreement's economics. It can choose to spend its capital on capabilities whose value does not depend on any one of them. The chapter calls the result structural irreversibility."),
    blk('intro2', "This lesson states the principle, gives the chapter's examples, adds a stranded-asset test that the 2026 record makes necessary, and shows how to apply a scenario-by-investment screen to a capital plan. It draws on the Blueprint for Health's 2025 annual report for a real case of capacity that exists but whose operating funding is exposed."),
    blk('intro3', "The conclusion is practical: rank each investment by how many futures it survives, and fund the survivors first."),

    h2('s1h1', 'The Principle'),
    blk('s1p1', "Chapter 14 defines structural irreversibility as the condition in which a transformation investment is so embedded in operations that reversal is costly regardless of the political environment. Its examples are National Committee for Quality Assurance recognition as a patient-centered medical home, deployment of the Collaborative Care Model for behavioral health, and population health analytics. Hiring the staff, building the workflows, establishing the data infrastructure and changing the care model create facts on the ground."),
    blk('s1p2', "The chapter's guiding rule is to invest in pillar capabilities that hold value across several payment-model scenarios and not only in compliance infrastructure for one design. An organization that builds population health management capability is positioned for global budgets, for commercial value-based contracts and for whatever federal model follows. One that builds only to a single model's specification is exposed if the model changes, as Vermont's July 2026 withdrawal from AHEAD showed."),
    callout('s1c1', "Compliance infrastructure for one program can be stranded when the program ends. Capabilities that serve the population under any payment model are not."),

    h2('s2h1', 'The Chapter\'s Examples, and Why They Qualify'),
    blk('s2p1', "Practice recognition as a medical home builds clinical infrastructure that serves patients under any model. The Blueprint's 2025 report records 126 practices achieving or sustaining recognition in 2025. Its value does not depend on AHEAD: the recognition reflects team-based care, proactive outreach, care coordination and panel management that improve chronic disease management for the practice's population regardless of how the practice is paid."),
    blk('s2p2', "The Collaborative Care Model integrates behavioral health into primary care. Its capability, a care manager, a consulting psychiatrist and a registry, produces value under fee-for-service, value-based contracts and global budgets, because it addresses a population need and reduces downstream use, as the transformation ROI lesson in the finance course described. Population health analytics, including the identification of risk and attribution of patients, serve every risk-bearing arrangement. And coding and documentation improvement for risk adjustment improves accuracy under Medicare and commercial arrangements alike."),
    blk('s2p3', "What these examples share is that the benefit flows from the capability, not from a program's rules. If the program changes, the capability remains and can be redeployed. That is the test the chapter implies."),

    h2('s3h1', 'The Stranded-Asset Test'),
    blk('s3p1', "The 2026 record adds a second test: does the capability have operating funding that does not depend on the same source as the capital? The Blueprint shows the issue. Its community health teams, staffed by 201 people equal to 115.76 full-time equivalents, are an established capability. Yet the 2025 annual report records that Medicare could contribute to team and practice payments only while the all-payer model agreement was in force, that the agreement ended in December 2025, and that the legislature appropriated more than $5 million, about a quarter of annual funding, to cover Medicare's share for 2026. The report warns that loss of the funding could mean a significant reduction in team staff."),
    blk('s3p2', "A capability can be hard to reverse in design and easy to lose in finance. Chapter 3 notes that the Rural Health Transformation fund expires in 2030 while Medicaid reductions accelerate. An investment built from time-limited money has the same exposure unless it is wired into recurring budgets, payer contracts or captured savings before the money ends. The stranded-asset test therefore asks, of each investment, who pays for it in year three and what happens if that source disappears."),
    table('s3t1', 'The two tests for irreversibility', [
        {'Test': 'Capability test', 'Question': 'Does the benefit flow from the capability and serve the population under any payment model?', 'Example_that_passes': 'Medical home recognition; collaborative care; population analytics', 'Example_that_fails': 'Reporting built only to one model\'s template'},
        {'Test': 'Operating-funding test', 'Question': 'Is there recurring funding that does not depend on the same program or grant as the capital?', 'Example_that_passes': 'Staff funded through all-payer payments or a contract', 'Example_that_fails': 'Staff funded by a time-limited grant with no successor'},
    ]),

    h2('s4h1', 'Applying the Screen'),
    blk('s4p1', "Take a hospital's capital and operating plan and list each investment of consequence. For each, mark whether it passes the capability test across at least three scenarios from Lesson 8, such as accelerated repricing, a negotiated phase-in and budget orders without new law. Then mark whether it passes the operating-funding test through the next three years. An investment that passes both goes first. One that passes the capability test and fails the funding test needs a funding plan before it starts. One that fails the capability test should be treated as a compliance cost, kept as small as the requirement allows."),
    steps('s4st1', 'A capital-plan screen for political risk', [
        ('List the investments', 'Everything over a threshold in the capital and operating plan, with cost and timing.'),
        ('Run the capability test', 'Does it hold value in each scenario, or only under one program\'s rules?'),
        ('Run the operating-funding test', 'Who pays in year three, and from what source?'),
        ('Sort into three groups', 'Fund now; fund after a funding plan; minimize as compliance.'),
        ('Revisit when a trigger fires', 'Re-run the screen whenever a scenario trigger or signal changes.'),
    ]),
    blk('s4p2', "The screen has a political side effect worth naming. Investments that are embedded, staffed and producing results become constituencies, which Chapter 14 lists among the sources of durability. A community health team that serves a region's patients has patients, clinicians and local officials who will defend it. Building such constituencies is itself a protective strategy."),
    warning('s4w1', "Irreversible is not the same as good", "An embedded investment that does not improve outcomes or finances is a durable waste. Apply the evidence ladder from the finance course to the benefit as well as the screen to the risk."),

    h2('s5h1', 'A Worked Screen (Illustrative)'),
    blk('s5p1', "Consider a hypothetical regional hospital with five investments in its three-year plan. A care management team funded from operating margin passes the capability test, since it serves patients under any model, and passes the funding test only if the hospital captures savings or has a payer contract, so it goes into the group that needs a funding plan. A population analytics platform passes both tests if it is built on the hospital's own data and licensed from operating funds, and goes first. An electronic reporting build specified to one federal model's template fails the capability test and goes into the minimize group. A service line expansion that relies on commercial revenue growth passes neither test if repricing arrives, since its revenue premise is exposed. A medical home recognition effort at the hospital's owned primary care practices passes both."),
    table('s5t1', 'A hypothetical capital plan screened for political risk (illustrative)', [
        {'Investment': 'Population analytics platform', 'Capability_test': 'Passes', 'Funding_test': 'Passes if licensed from operating funds', 'Group': 'Fund now'},
        {'Investment': 'Medical home recognition for owned practices', 'Capability_test': 'Passes', 'Funding_test': 'Passes', 'Group': 'Fund now'},
        {'Investment': 'Care management team', 'Capability_test': 'Passes', 'Funding_test': 'Needs a captured-savings or contract source', 'Group': 'Fund after a funding plan'},
        {'Investment': 'Reporting build for one federal model', 'Capability_test': 'Fails', 'Funding_test': 'Not applicable', 'Group': 'Minimize as compliance'},
        {'Investment': 'Commercial-growth service line expansion', 'Capability_test': 'Depends on repricing', 'Funding_test': 'Exposed', 'Group': 'Defer or redesign'},
    ]),
    blk('s5p1b', "Two refinements strengthen the screen. First, weight each investment by the size of the commitment, since a small reporting build matters less than a large analytics contract. Second, record the assumption that makes each investment pass: for the care management team, that a savings share or contract will exist by year two; for the analytics platform, that licensing is covered by operating funds. When an assumption fails, the investment moves to a different group, and the record shows why."),
    blk('s5p2', "The hypothetical makes a point worth stating: the screen does not tell an organization to stop investing. It tells it which investments to protect, which to prepare and which to keep small. In a year when federal models ended, a governor vetoed a pricing bill and a Board split on a hospital's budget, an organization that had sorted its plan this way would have been better placed than one that had not."),

    takeaway('tw', [
        "Structural irreversibility means an investment is so embedded in operations that reversal is costly regardless of the political environment.",
        "Chapter 14's examples are medical home recognition, Collaborative Care Model deployment, population health analytics and risk-adjustment documentation, which hold value across payment models.",
        "Invest in capabilities that serve under any model; compliance infrastructure for one program can be stranded when the program ends.",
        "The Blueprint's 2025 report shows an established capability, 201 community health team staff, whose Medicare funding stopped when the all-payer model agreement ended in December 2025 and required a state appropriation of more than $5 million for 2026.",
        "Apply two tests: the capability test, and the operating-funding test, which asks who pays in year three.",
        "Sort investments into fund now, fund after a funding plan and minimize as compliance; re-run the screen when a trigger fires.",
        "Embedded investments create constituencies, a source of durability; irreversible is not the same as good, so test the benefit too.",
    ]),
    quiz('qz',
        "What does the operating-funding test add to the capability test?",
        [
            ("It checks whether the investment is popular", False),
            ("It asks whether recurring funding exists that does not depend on the same program or grant as the capital, so a good capability is not stranded", True),
            ("It replaces the need for scenario planning", False),
            ("It measures the age of the equipment", False),
        ],
        "A capability can be well designed and still be lost if its operating funding ends. The test asks who pays in year three and whether that source is independent of the program or grant that funded the capital."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.4.1: Strategy 1, build investments that are hard to reverse; §14.8: structural irreversibility"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — practices, community health team staffing and the Medicare participation change"),
    blk('src3', "[3] Health Transformation Review, Chapter 3 — https://healthtransformationreview.org/read/chapter-3 — §3.6: Rural Health Transformation funds and the timing of Medicaid reductions"),
    blk('src4', "[4] Vermont Agency of Human Services announcement of July 24, 2026 on AHEAD, as published by VermontBiz — https://vermontbiz.com/news/2026/july/24/vermont-withdraws-ahead-commits-rural-health-transformation"),
]

# ════════════════════════════════════════════════════════════════════════════
L11_SLUG = 'psr-regulatory-engagement'
L11_TITLE = 'Engaging the Regulatory Process: Data Over Opposition'
L11 = [
    blk('intro1', "Chapter 14 argues that the decisions that matter most for a hospital under Act 68 are made not in the legislature but in the Green Mountain Care Board's regulatory process: how reference-based pricing is calibrated and where global budgets are set. Organizations that participate substantively, with data, shape those decisions more than those that engage only through public opposition. This lesson sets out why, how the process works and what substantive participation looks like."),
    blk('intro2', "It draws on the Board's statutory calendar, the Act 68 provisions that tell the Board what to consider, and the public record of the Board's September 2026 order. It does not recommend positions on any methodology; it describes how to make a position credible."),
    blk('intro3', "The guiding idea is that a regulator under pressure from many directions listens most to the party that makes its job easier."),

    h2('s1h1', 'Why the Regulator Is the Arena'),
    blk('s1p1', "The statute leaves the Board much to decide. For reference-based pricing it names no percentage, directs the Board to consider the community's health, demographics, acuity, payer mix, labor costs and social risk factors, and requires annual review of each hospital's prices in the budget process. For global budgets it requires the Board to establish them, reflecting reference-based pricing and total cost of care targets, without stating the level. The September 2026 order for the University of Vermont Medical Center shows the Board making hospital-specific judgments through a 3 to 2 vote."),
    blk('s1p2', "Chapter 14 observes that Vermont hospitals hold the granular cost, utilization and population data that the Board needs to set methodologies that are viable for hospitals while achieving the repricing the system needs. Constructive, data-grounded engagement buys more influence than political argument, it says, and the point is a practical one: a regulator deciding between two methodologies chooses the one it can defend with evidence."),
    callout('s1c1', "Statutes set direction; regulators set numbers. The numbers are decided on the record the Board assembles, so the party that supplies the best evidence shapes them."),

    h2('s2h1', 'The Process and Its Calendar'),
    blk('s2p1', "The Board's cycle is set by statute and by its own materials. Act 68's text states that the Board establishes a budget for each hospital annually on or before September 15, followed by a written decision by October 1, and that each hospital shall operate within its budget. The Board's own descriptions, as reported in search results, place hospital budget submissions on July 1, staff review in July and hearings in August. The Board also writes rules: a rule on hospital budget review, Rule 3.000, was in the rulemaking process in 2026 with a public comment window that has closed, which is a reminder that methodology can be set through rule as well as through annual orders."),
    blk('s2p2', "The calendar gives an organization natural moments to engage. Before submission, it can prepare data and ask for clarification of guidance. During review, it can answer staff questions and prepare hearing testimony. At the hearing, it can present its case in public. After the order, it can seek reconsideration or appeal where the law allows. Between cycles, when the Board writes guidance and rules, it can comment. The most influential moments are usually the quiet ones, when staff are drafting guidance, and not the loud ones, when the Board votes."),
    table('s2t1', 'Where an organization can engage, by stage', [
        {'Stage': 'Rulemaking and guidance (between cycles)', 'What_to_offer': 'Written comments with data on how a methodology would operate', 'Why_it_matters': 'Sets the rules for every later decision'},
        {'Stage': 'Budget submission (July)', 'What_to_offer': 'Complete, reconciled cost, utilization and population data', 'Why_it_matters': 'The submission is the evidence base'},
        {'Stage': 'Staff review (July to August)', 'What_to_offer': 'Prompt answers and clarifications', 'Why_it_matters': 'Staff analyses frame the Board\'s deliberation'},
        {'Stage': 'Hearings (August)', 'What_to_offer': 'A concise public case tied to the statutory factors', 'Why_it_matters': 'The Board hears directly and the public record is created'},
        {'Stage': 'Decision (by September 15, written order by October 1)', 'What_to_offer': 'Response, reconsideration or appeal where available', 'Why_it_matters': 'Orders bind the next year\'s operations'},
    ]),

    h2('s3h1', 'What Substantive Participation Looks Like'),
    blk('s3p1', "Chapter 14 gives three ingredients: actual financial data, modeling of the effect of specific methodology choices on the organization's population, and engagement with the equity implications of different approaches. In practice, an organization presents its own cost structure, shows what a proposed reference price would mean for each major service line, and explains which of the statute's factors, such as acuity, payer mix, labor costs or social risk, explain differences between its costs and the benchmark."),
    blk('s3p2', "The second ingredient can use the tools from the finance course. A hospital can run the stress test's reference-based pricing formula at several caps and present the revenue effects with its assumptions stated. It can show how a proposal interacts with its Medicaid mix and the federal Medicaid changes. A Board member weighing a methodology wants to know who gains, who loses and what the mechanism is, and an organization that supplies a clear, checkable answer is useful whether or not its view prevails."),
    blk('s3p3', "The third ingredient, equity, is easy to neglect. A methodology that looks neutral can affect hospitals with higher social risk or more complex populations differently, and the statute directs the Board to consider social risk factors. Evidence about who the hospital serves, and how a methodology treats them, speaks to a statutory factor, which is more persuasive than an appeal to hardship."),
    steps('s3st1', 'Preparing a data-grounded submission', [
        ('Reconcile the numbers', 'Ensure the figures match the budget filing and audited statements, and note differences.'),
        ('State the question', 'Tie the submission to a specific methodology choice or budget issue.'),
        ('Model the options', 'Show the effect of each plausible option on revenue, margin and services, with assumptions.'),
        ('Address the statutory factors', 'Explain acuity, payer mix, labor cost and social risk in terms of the hospital\'s population.'),
        ('Offer a constructive alternative', 'Where the proposed approach is a problem, propose a workable one and show its effect.'),
    ]),

    h2('s4h1', 'What Opposition Alone Costs'),
    blk('s4p1', "The 2026 record shows both styles. The Medical Center's chief executive argued publicly that the hospital could not afford another $32 million of cuts and was on track to lose $75 million. Those statements put the hospital's position on the record, and the Board majority nonetheless ordered a 4.4 percent cut to commercial prices, with two members dissenting. The sources read do not show the content of the hospital's formal submissions, so no conclusion is drawn about their effect."),
    blk('s4p2', "The comparison the chapter draws is general: public opposition raises the profile of a position, while data changes the number. An organization can do both, and often must, but it should recognize that the second is what a regulator can use when writing an order that will be reviewed by courts and the press. A Board member in the minority needs an evidence-based reason to dissent, and one in the majority needs an evidence-based reason to stay the course."),
    warning('s4w1', "Do not mistake access for influence", "Meetings with the regulator matter only if they supply information it cannot get elsewhere. A submission that merely restates a position adds little; one that gives the Board a number it can cite adds a lot."),

    h2('s5h1', 'Anatomy of a Good Written Comment'),
    blk('s5p1', "A written comment on a methodology works best when it follows a fixed structure. It opens with a one-paragraph statement of the issue and the organization's position, so a staff reader knows at once what is being asked. It then gives the evidence: the organization's data, the method used and the assumptions, with sources. It explains the effects of the proposal and of at least one alternative, with numbers. It addresses the statutory factors the Board must consider and says how the evidence bears on each. It ends with a specific request, such as a particular adjustment, a transition period or a clarification of how a term will be applied."),
    blk('s5p2', "Tone matters as much as structure. A comment that acknowledges the goals of the statute, recognizes the pressures on the Board and identifies what the organization can do to help is read differently from one that opposes the policy as a whole. The Board's members are accountable to the public as well as to hospitals, and a position framed as a way to meet the statutory purpose at lower risk to access is easier to adopt than one framed as a way to avoid it."),
    blk('s5p3', "Keep a record of each submission, with its date and the response received. Over time that record shows which kinds of evidence the Board uses and which it sets aside, and it becomes part of the organization's institutional memory when staff change."),

    takeaway('tw', [
        "Reference-based pricing percentages and global budget levels are set through the Board's regulatory process, not in the statute, which makes it the arena for the decisions that matter.",
        "The Board sets a budget for each hospital on or before September 15, issues a written decision by October 1, and each hospital must operate within its budget.",
        "The Board also writes rules, such as the hospital budget review rule in process in 2026, so methodology can be set outside annual orders.",
        "Chapter 14's three ingredients are actual financial data, modeling of specific methodology choices on the organization's population and engagement with equity implications.",
        "The most influential moments are quiet ones, such as guidance drafting and staff review, not only public hearings.",
        "Model reference-based pricing at several caps with stated assumptions, using the finance course's formula, so the Board can check the answer.",
        "Public opposition raises the profile of a position; data changes the number a regulator can defend.",
    ]),
    quiz('qz',
        "According to Chapter 14, why does constructive, data-grounded engagement buy more influence than political argument?",
        [
            ("Because regulators do not read public statements", False),
            ("Because hospitals hold granular cost, utilization and population data the Board needs, and a regulator chooses the methodology it can defend with evidence", True),
            ("Because the legislature has no role", False),
            ("Because the Board is required to adopt hospital proposals", False),
        ],
        "The chapter argues that hospitals hold the data needed to set viable methodologies and that engagement with actual data, modeling and equity analysis shapes outcomes more effectively than engaging only through public opposition."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.4.2: Strategy 2, engage the regulatory process early and substantively"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — factors the Board must consider, budget calendar, global budgets and reference-based pricing"),
    blk('src3', "[3] Green Mountain Care Board, hospital budget review — https://gmcboard.vermont.gov/hospital-budget-review — schedule and guide, as listed in search results; verify current dates on the page"),
    blk('src4', "[4] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
    blk('src5', "[5] HTR Research Lab, Hospital Financial Stress Test — https://healthtransformationreview.org/research-lab/policy-quality?tab=scorecard — reference-based pricing formula used for methodology modeling"),
]

# ════════════════════════════════════════════════════════════════════════════
L12_SLUG = 'psr-documenting-progress'
L12_TITLE = 'Documenting Progress: Evidence as Political Protection'
L12 = [
    blk('intro1', "The fourth strategy in Chapter 14 is the most durable: show that the reform is working. The chapter argues that, at the organizational level, the political sustainability of Vermont's reform rests on one thing, evidence that it is working, demonstrated with the metrics in Act 167's five goals and Act 68's reporting requirements. This lesson explains what the statute requires the state to report, what an organization can contribute, and why the quality of the evidence matters as much as the result."),
    blk('intro2', "It uses the text of Act 68's reporting sections, which this lesson read, and the Blueprint for Health's 2025 annual report as an example of candid evidence reporting. It also flags a detail about the monthly reports: the statute ties its monthly updates to the months of hospital fiscal year 2026, which ended on September 30, 2026, so a reader should check what reporting continues."),
    blk('intro3', "The practical aim is for an organization to produce evidence that a legislator, regulator or journalist can verify."),

    h2('s1h1', 'What the Statute Requires the State to Report'),
    blk('s1p1', "Section 11a of Act 68 directs the Agency of Human Services to work with hospitals and other providers to identify opportunities to improve efficiency and quality, reduce prescription drug spending and increase access to essential services while reducing hospital spending for hospital fiscal year 2026 by not less than 2.5 percent. It provides that the Agency supervise the process so that the collaboration is afforded state-action immunity under antitrust law, and that the Agency report on the approved reductions, with timing and accountability measures, by July 1, 2025. On the first day of each month of hospital fiscal year 2026, beginning October 1, 2025, it must update the Health Reform Oversight Committee and the Joint Fiscal Committee, or the health committees when the legislature is in session, on progress."),
    blk('s1p2', "Section 11b requires the Agency to identify specific outcome measures for determining whether, when and to what extent each of the five goals of its transformation efforts under Act 167 has been met: reduce inefficiencies, lower costs, improve health outcomes, reduce health inequities and increase access to essential services. It must report the measures with a timeline, how it will determine progress, including how it will determine the savings attributable to each inefficiency reduced and evaluate increases in access, and the impact each hospital's transformation decision has or will have on the system, including on costs and premiums."),
    blk('s1p3', "Act 68 also appropriates $2 million from the Health IT Fund for grants to hospitals for collaborative efforts to reduce costs and expand access, on a first-come, first-served basis, and requires a report on how much was obligated and disbursed as of November 15, 2025. The statute thus builds a reporting spine: goals, measures, a timeline, a method for attributing savings and hospital-level impacts."),
    callout('s1c1', "The state's reports are only as good as the data hospitals supply. An organization that supplies clear, verifiable data strengthens the evidence on which the reform stands."),

    h2('s2h1', 'A Caution on the Monthly Updates'),
    blk('s2p1', "Chapter 14 describes the Agency's monthly transformation reports as the primary vehicle for communicating progress. The statutory text read for this lesson ties the monthly updates to each month of hospital fiscal year 2026, which began October 1, 2025 and ended September 30, 2026. Search results show the Agency issuing reports on health care spending reductions in January, April and May of 2026 and earlier. Whether the Agency continues monthly updates into fiscal year 2027 under other authority was not established by the sources read."),
    blk('s2p2', "The practical lesson is to check what reporting is required now and where it appears, rather than assuming the 2026 pattern continues. If the monthly cadence ended, the reporting that remains, the outcome measures of section 11b, the Board's annual budget and premium reports and the Strategic Plan due in January 2028, becomes more important as the visible evidence trail."),

    h2('s3h1', 'What an Organization Can Document'),
    blk('s3p1', "Chapter 14 names four kinds of evidence: hospital stabilization, primary care access improvement, cost-growth moderation and behavioral health capacity expansion, demonstrated with the metrics in Act 167's five goals. For an organization the task is to translate each goal into measures it already collects and can verify. For reducing inefficiencies, measures such as avoidable admissions, length of stay and duplicate services. For lowering costs, cost per case and total cost of care for attributed populations. For health outcomes, chronic disease control and quality measures. For equity, the same measures stratified by the groups the organization serves. For access, wait times, same-day availability and service availability by region."),
    blk('s3p2', "The Blueprint's 2025 annual report is a model of how to present evidence. It compares Blueprint-attributed members with others on risk-adjusted expenditure, shows measures that favor the program and measures that do not, states that its numbers are not an exact saving and flags areas needing work. That candor makes the favorable findings more credible, and it is the opposite of the overstatement that draws criticism. The State Auditor's February 2025 audit of the program, as reported, concluded that it was not demonstrating whether it improves outcomes or controls costs, which shows that even long-standing programs are held to a standard of demonstrated results."),
    table('s3t1', 'Translating the five Act 167 goals into organizational evidence', [
        {'Goal': 'Reduce inefficiencies', 'Example_measures': 'Avoidable admissions; length of stay; duplicate services removed', 'Verification': 'Claims and discharge data; before and after with a comparison'},
        {'Goal': 'Lower costs', 'Example_measures': 'Cost per case; total cost of care for an attributed group', 'Verification': 'Audited financials; claims; risk adjustment'},
        {'Goal': 'Improve health outcomes', 'Example_measures': 'Blood pressure control; diabetes control; readmissions', 'Verification': 'Quality measure specifications; stated denominators'},
        {'Goal': 'Reduce health inequities', 'Example_measures': 'The same measures by race, ethnicity, language, disability, rurality', 'Verification': 'Data sources for stratification stated; small numbers flagged'},
        {'Goal': 'Increase access', 'Example_measures': 'Wait times; same-day access; service availability by region', 'Verification': 'Scheduling data; community needs assessment'},
    ]),

    h2('s4h1', 'Making Evidence Credible'),
    steps('s4st1', 'Rules for evidence that can be defended', [
        ('Define the measure and the denominator', 'State exactly what is counted, for whom and over what period.'),
        ('Show a comparison', 'Before and after, or against a comparable group, with the method stated.'),
        ('State the uncertainty', 'Give ranges or margins of error and say what the data cannot show.'),
        ('Report unfavorable results', 'Include measures that did not improve and say what will be done.'),
        ('Date and source everything', 'Record when and from what document each figure was taken.'),
    ]),
    blk('s4p1', "The reason for these rules is political as well as scientific. A figure that cannot be verified invites a challenge, and a challenge that succeeds damages every other figure the organization has offered. A figure that is modest, clear and verified accumulates trust. Over a few years, a record of such figures is the protection Chapter 14 describes."),
    blk('s4p2', "Decide also who receives the evidence. The statute's reports go to the legislature's oversight committees, and the Board's budget process receives hospital data each summer. An organization that sends a short, regular evidence summary to its own legislators, its Board contacts and its community, tied to the five goals, builds the relationships that Chapter 14's scenarios assume it will need if the political environment turns."),

    h2('s5h1', 'A Quarterly Evidence Brief'),
    blk('s5p1', "A short, regular document is the practical form of this strategy. A quarterly evidence brief of one or two pages, written for legislators, Board staff, community leaders and the organization's own board, makes the organization's progress visible without waiting for a hearing. It has five parts: three or four headline measures tied to the five Act 167 goals, each with the baseline, the current value, the comparison and the date; one program or change that explains the movement; one unfavorable measure and what is being done; one equity measure, stratified; and one request or offer, such as a conversation about a methodology or a site visit."),
    blk('s5p2', "The brief serves three purposes. It builds an evidence record over time. It builds relationships, because legislators and regulators who receive short, reliable updates come to treat the organization as a source. And it prepares the organization to respond quickly when a scenario trigger fires, because the data and the audience are already in place. A reform's defenders are most effective when they have been supplying evidence for years before they are asked for it."),
    blk('s5p3', "Keep the brief honest. Chapter 14's strategy rests on evidence that the reform is working, and an organization cannot demonstrate that if its measures are not moving. The brief is also the discipline that tells management early when they are not."),

    takeaway('tw', [
        "Chapter 14 argues that the political sustainability of the reform rests on evidence that it is working, shown with the metrics in Act 167's five goals and Act 68's reporting requirements.",
        "Act 68 section 11a calls for hospital spending reductions of not less than 2.5 percent for hospital fiscal year 2026, with monthly updates to oversight committees on the first of each month of that fiscal year beginning October 1, 2025.",
        "Section 11b requires outcome measures for five goals: reduce inefficiencies, lower costs, improve health outcomes, reduce health inequities and increase access, with a method for attributing savings.",
        "The statute's monthly updates are tied to hospital fiscal year 2026, which ended September 30, 2026; check what reporting continues rather than assuming the pattern persists.",
        "Translate each of the five goals into measures the organization already collects and can verify, stratified for equity.",
        "The Blueprint's 2025 annual report models credible evidence: it shows favorable and unfavorable measures and states that risk-adjusted differences are not an exact saving.",
        "Define measures and denominators, show a comparison, state uncertainty, report unfavorable results and date every source.",
    ]),
    quiz('qz',
        "What does Act 68 section 11b require the Agency of Human Services to do?",
        [
            ("Close hospitals that fail to reduce spending", False),
            ("Identify specific outcome measures for whether each of the five Act 167 transformation goals has been met, and report how it will determine progress and savings", True),
            ("Set reference-based prices for each hospital", False),
            ("Replace the Green Mountain Care Board's budget review", False),
        ],
        "Section 11b directs the Agency to identify outcome measures for the five goals of reducing inefficiencies, lowering costs, improving health outcomes, reducing health inequities and increasing access to essential services, and to report the measures, a timeline and how progress and savings will be determined."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.4.4: Strategy 4, document and communicate transformation progress"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — Secs. 11a, 11b and 18"),
    blk('src3', "[3] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — a model of candid evidence reporting; reference to the State Auditor's 2025 audit"),
    blk('src4', "[4] Vermont Legislature, Agency of Human Services legislative reports — https://legislature.vermont.gov/assets/Legislative-Reports/Apr-2026_Act-68-HC-Spending-Report-from-AHS.pdf; https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-Spending-Report-from-AHS.pdf — examples of the Agency's 2026 reports, as listed by the legislature"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
