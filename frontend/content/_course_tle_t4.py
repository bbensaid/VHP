exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_tle_common.py').read())

# Track 4 — Knowledge Transfer. Sources: Book Ch12 §12.2, §12.7, §12.8; AHS May 2026 report (RHT $195,053,740 FFY26; $15M analytics/modeling; $27M transformation,
# innovation and regionalization grants; RHRC contract concluded Oct 9; new TA vendor); IHI Breakthrough Series white paper (2003) as summarized by search (learning sessions
# alternate with action periods; three sessions; 6-15 months; 12-160 teams; PDSA in action periods; summative congress); HTR Evidence Library tool source (25 CEA/CUA studies,
# 21 CMMI models, 15 policy briefs; source-type labels: peer-reviewed, agency self-report, HTR synthesis; consultant projection explained); CIN & Shared Services Modeler description.

L14_SLUG = 'tl-knowledge-infrastructure'
L14_TITLE = 'From Knowing to Doing: Building Knowledge-Transfer Infrastructure'
L14 = [
    blk('intro1', "Chapter 12 begins with a plain statement: knowledge of the five pillars does not by itself produce transformation. Someone has to run the program, manage the change and connect the analytical framework to the people doing the work. The chapter calls the machinery that does this the knowledge and implementation infrastructure, and says that an organization in any state should read its account as a checklist of functions to stand up, not as a description of institutions to copy by name."),
    blk('intro2', "This lesson turns that checklist into a design exercise. It identifies the functions a knowledge-transfer system performs, shows how Vermont's public reporting describes the pieces now being funded, and sets out questions for judging whether a given piece will actually move knowledge to the people who need it. The Vermont facts come from the Agency of Human Services May 2026 report to the Legislature, which this lesson read directly."),
    blk('intro3', "The test of such infrastructure is simple: does the person who needs a capability end up with it."),

    h2('s1h1', 'The Functions the Chapter Describes'),
    blk('s1p1', "Chapter 12 groups the platform's own contribution into four components: an intelligence feed, a suite of analytical tools, a curriculum and advisory services. Beneath that description sits a more general set of functions that any state or organization needs. Someone must scan and interpret developments, so that decision makers know what a new rule or ruling means for them. Someone must provide tools for turning frameworks into numbers about a specific organization. Someone must build individual and team skills. And someone must provide hands-on support for decisions and implementation, ideally in a way that leaves the organization more capable and not more dependent."),
    blk('s1p2', "The chapter's theory of why this matters is stated in three sentences. Consulting that produces recommendations without supporting execution is worth little. Technology that delivers tools without change management delivers data without insight. Education that builds individual knowledge without organizational capacity produces informed spectators rather than effective actors. Each sentence names a failure in which one function operates without the others, and the remedy it implies is integration: analysis, tools and change management delivered together."),
    callout('s1c1', "Knowledge transfer succeeds when the receiver can do something new afterward, not when the sender has published something."),

    h2('s2h1', 'Vermont\'s Pieces, as Reported'),
    blk('s2p1', "The Agency's May 2026 report lists how Vermont is paying for several of these functions. Under the 2025 budget adjustment, part of a Global Commitment investment appropriation was spent on work with the Rural Health Redesign Center, whose contract concluded on October 9, with remaining funds obligated to a new technical assistance vendor for hospitals. Under Act 68, two million dollars was provided for feasibility analysis and transformation plan development with hospitals, designated agencies, primary care organizations and other community-based providers, with part spent on a workforce leadership summit and part on contracted transformation support. A further two million dollars from the Health IT Fund went to grants for hospitals, of which, as of the report's date, five agreements were fully executed and eight were under negotiation."),
    blk('s2p2', "On the federal side, the report states that the Rural Health Transformation Program awarded Vermont $195,053,740 for federal fiscal year 2026 as the first year of a five-year program, and names two projects directly related to care transformation: $15 million in that year for additional transformation data analytics and modeling, and $27 million for transformation, innovation and regionalization support grants for Vermont providers. The report adds that the earlier-year innovation center funds under the AHEAD model, $1.2 million, would be returned within ninety days if the state did not participate in the model."),
    blk('s2p3', "Mapped onto the chapter's functions, these look like support for planning, technical assistance, analytics and grants, which together address the hands-on and tool functions. The report does not describe an intelligence function, a curriculum or a mechanism for moving lessons from one hospital to another, and it would be unfair to expect it to: it is a spending report. The mapping nonetheless suggests the questions to ask. Which functions are funded, by whom and for how long? Which are missing? And where funding is by short-term contract, what will remain when the contract ends?"),
    table('s2t1', 'Knowledge-transfer functions and where Vermont\'s May 2026 report shows funding', [
        {'Function': 'Scan and interpret developments', 'Reported_in_AHS_report': 'Not described'},
        {'Function': 'Analytical tools and data', 'Reported_in_AHS_report': 'Analytics contract under negotiation; $15M RHT analytics and modeling in FFY26'},
        {'Function': 'Skills and curriculum', 'Reported_in_AHS_report': 'Workforce leadership summit funded; no curriculum described'},
        {'Function': 'Hands-on technical assistance', 'Reported_in_AHS_report': 'New hospital technical assistance vendor; $27M RHT grants for transformation and regionalization'},
        {'Function': 'Peer-to-peer transfer', 'Reported_in_AHS_report': 'Not described; shared services appear as a common theme in hospital plans'},
    ]),

    h2('s3h1', 'Four Design Questions'),
    blk('s3p1', "A leader assessing a knowledge-transfer investment can ask four questions. The first is who the receiver is and what they will do differently. A tool built for analysts but needed by hospital finance teams will not be used unless someone teaches those teams. The second is how the knowledge reaches the receiver: through a document, a person, a tool, a community or some combination. Documents alone rarely change practice. The third is what the receiver's incentive is to use it. A shared service that costs more or takes more time than the current approach will be bypassed. The fourth is what happens after the funding ends, since a function that disappears with its grant leaves no capability behind."),
    blk('s3p2', "Chapter 12's warning about advisory dependence applies to all four. The chapter describes it as the failure in which an organization becomes reliant on outside help for ongoing analysis and implementation instead of building its own capability. A technical assistance contract that does its work well should leave the hospital more capable, with documented methods, trained staff and tools it owns. A contract that leaves the hospital needing another contract has transferred cost, not knowledge. Ask in advance how the engagement will build internal capacity and how that will be checked."),
    blk('s3p3', "There is also an equity dimension. The chapter observes that shared infrastructure is how investments made at more advanced hospitals become available to smaller, less resourced ones, and that larger systems have an obligation to take part. If knowledge-transfer resources flow mostly to organizations that already have capacity to absorb them, they will widen the gap they were meant to close. Targeting support at the hospitals least able to build capabilities themselves is therefore a design choice and should be made deliberately."),

    h2('s4h1', 'Shared Services as Infrastructure'),
    blk('s4p1', "The chapter points to the clinically integrated network of shared services funded by Vermont's Rural Health Transformation plan as an example of infrastructure that carries capability from stronger to weaker organizations. The platform's own modeling tool for it describes shared billing, coding, credentialing, human resources, information technology and group purchasing across the fourteen hospitals, set against an administrative cost premium per discharge cited in the book. The figure is the book's and was not verified here, and the tool is a model, not a plan the state has adopted."),
    blk('s4p2', "As infrastructure, shared services have features worth noting. They embed knowledge in a process, so that a hospital need not hire an expert to benefit from expertise. They create common data and workflows, which make comparison and learning easier. And they create dependency, which is acceptable if governance gives members a voice and a way out, and a problem if a single vendor or agency controls terms that members cannot influence. The questions in the previous section apply: who uses it, what do they gain and who maintains it after start-up money ends."),
    steps('s4st1', 'Assessing a knowledge-transfer investment', [
        ('Name the receiver', 'Who must do something differently, and what exactly?'),
        ('Trace the channel', 'Document, person, tool, community: how does the knowledge arrive?'),
        ('Check the incentive', 'Does using it save time, money or risk for the receiver?'),
        ('Plan the exit', 'What capability remains when the funding or contract ends?'),
        ('Target the gap', 'Does support reach the organizations with the least capacity?'),
    ]),

    h2('s5h1', 'Measuring Whether Knowledge Moved'),
    blk('s5p1', "Activity measures, such as the number of workshops held or tools released, show effort and not transfer. Better measures ask what changed. How many organizations now use a method they did not use a year ago? How long does it take a new hospital to adopt a protocol that others have tested? Do the least-resourced organizations adopt at similar rates to the best-resourced ones? Do teams that received assistance continue the work after assistance ends? Each of these can be measured with a short survey, a review of documents or a look at records."),
    blk('s5p2', "A knowledge-transfer program should also learn about itself. Collect brief feedback after each engagement on what was useful and what was not, and review it quarterly. Keep a short list of requests that could not be met, since they show where the function is missing. And write down what worked, in a form that another team could use, because the most common loss of knowledge occurs when the person who had it moves on. Chapter 12's emphasis on a program office and shared analytical tools is, in the end, an emphasis on making what is known by some people available to all."),

    takeaway('tw', [
        "Chapter 12 says knowledge of the pillars does not by itself produce transformation; infrastructure must connect frameworks to the people doing the work.",
        "Four functions are needed: interpreting developments, providing tools, building skills and providing hands-on support, delivered together.",
        "Vermont's May 2026 Agency report shows funding for planning, technical assistance, analytics and grants; it does not describe an intelligence function or peer-to-peer transfer.",
        "The report records $195,053,740 in federal fiscal year 2026 Rural Health Transformation funds, with $15 million for analytics and modeling and $27 million for transformation and regionalization grants.",
        "Ask who the receiver is, how knowledge reaches them, what their incentive is and what remains after funding ends.",
        "Advisory dependence is the failure mode in which an organization cannot function without outside help; engagements should build internal capability.",
        "Measure what changed in practice, including whether the least-resourced organizations adopt, not the number of workshops held.",
    ]),
    quiz('qz',
        "According to Chapter 12, what is advisory dependence?",
        [
            ("A requirement that hospitals hire advisors", False),
            ("A failure mode in which an organization relies on outside advisors for ongoing analysis and implementation instead of building its own capability", True),
            ("A kind of federal grant", False),
            ("A measure of how often advisors are consulted", False),
        ],
        "The chapter defines advisory dependence as reliance on external advisors for ongoing support rather than building internal organizational capability, which engagements should be designed to reduce."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.1, §12.2 and §12.8; Key Concepts (advisory dependence)"),
    blk('src2', "[2] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 (data as of April 30, 2026) — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — read directly"),
    blk('src3', "[3] HTR Research Lab, CIN and Shared Services Modeler — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=cin — tool description read 2026-11-23; the cost premium figure is the book's"),
    blk('src4', "[4] Vermont Rural Health Transformation Program — https://www.ruralhealthinfo.org/states/vermont/rhtp"),
]

L15_SLUG = 'tl-learning-collaboratives'
L15_TITLE = 'Learning Together: The Collaborative Improvement Model'
L15 = [
    blk('intro1', "One of the best-known methods for moving knowledge among organizations is the improvement collaborative. The Institute for Healthcare Improvement's Breakthrough Series, described in a 2003 white paper, brought teams from many hospitals or clinics together to work on the same problem, share what they learned and test changes in their own settings. Chapter 12 does not name this method, but it describes the problem the method answers: capable organizations hold knowledge that others need, and transfer does not happen by publication alone."),
    blk('intro2', "This lesson explains the model's structure, what makes it work, what its limits are and how Vermont's hospitals, practices and agencies might use it. The description of the model comes from the IHI white paper's public excerpts and from summaries by public health and professional bodies; the lesson did not obtain the white paper's full text, and its details should be checked against the original before a collaborative is designed. The Vermont application is the lesson's own proposal, not an existing program."),
    blk('intro3', "A collaborative is a deliberate way of making each participant's learning available to all the others."),

    h2('s1h1', 'How the Breakthrough Series Is Structured'),
    blk('s1p1', "The model alternates two kinds of event. In learning sessions, teams from all participating organizations come together to learn about a chosen topic and plan changes. In action periods, teams return to their organizations and test those changes in clinical settings, using the Model for Improvement and its Plan-Do-Study-Act cycles. According to summaries of the white paper, a typical collaborative has three face-to-face learning sessions, each followed by an action period, runs for roughly six to fifteen months and ends with a summative congress and a publication of results. Collaboratives are reported to range from about twelve to one hundred sixty organizational teams."),
    blk('s1p2', "Two features distinguish the method from a conference or training course. First, the work happens between the meetings: the learning sessions are for planning and sharing, but the improvement is made in the action periods, in each organization's own setting. Second, the participants are teams, not individuals. A team typically includes a clinical leader, a person with day-to-day responsibility and someone with authority to change processes, which helps changes survive the return to the home organization."),
    callout('s1c1', "The meetings are not the collaborative. The collaborative is what teams test and share between them."),

    h2('s2h1', 'What Makes It Work'),
    blk('s2p1', "Several design features recur in descriptions of effective collaboratives. A clear, narrow topic with an evidence-based set of changes, often called a change package, gives teams something concrete to test. Shared measures let teams compare results and see who is improving. Expert faculty provide technical content, but peers provide credibility and ideas. Regular reporting creates mild pressure to act between meetings. And a learning-focused tone, in which struggling teams are helped and not judged, keeps people honest about what is not working."),
    blk('s2p2', "These features line up with the diffusion factors discussed earlier in the course. A change package improves trialability and reduces complexity. Peer reports raise observability and credibility. Team participation addresses the problem of enthusiasts running pilots that others cannot copy. The method is therefore a practical way of acting on what the research on spread suggests. Chapter 12's concern that knowledge move from advanced hospitals to less-resourced ones is the kind of problem a collaborative is built for."),
    table('s2t1', 'Design features of a collaborative and what each supplies', [
        {'Feature': 'Narrow topic and change package', 'Supplies': 'A concrete set of changes to test'},
        {'Feature': 'Shared measures', 'Supplies': 'Comparison and motivation'},
        {'Feature': 'Team participation', 'Supplies': 'Authority and continuity back home'},
        {'Feature': 'Learning sessions', 'Supplies': 'Content, peer ideas and relationships'},
        {'Feature': 'Action periods', 'Supplies': 'Testing in the real setting'},
        {'Feature': 'Summative event and report', 'Supplies': 'Recorded results others can reuse'},
    ]),

    h2('s3h1', 'Limits and Cautions'),
    blk('s3p1', "Collaboratives have limits that a designer should know. They require sustained time from busy teams, and participation may be uneven. They work best on topics where there is a clear set of changes and measures, and less well on problems that are poorly defined. Evaluations of improvement collaboratives have generally found mixed results, with some teams improving substantially and others little, which suggests that the organizational context matters as much as the method. A collaborative is a mechanism for learning, not a guarantee of change."),
    blk('s3p2', "Cost and attention are real constraints. Funding for coordination, data collection, faculty and meetings must come from somewhere, and a sponsor that expects results without paying for the support will be disappointed. The measurement burden can also be heavy for small organizations, so the measures should be few and the reporting simple. Finally, the model tends to reward organizations that already have capacity to participate, which, if unaddressed, would exclude the hospitals Chapter 12 is most concerned about."),
    blk('s3p3', "None of this argues against the method. It argues for designing it with its weaknesses in view: selecting a topic with a clear change package, funding the coordination, simplifying the measures and recruiting the organizations with the greatest need, with extra support for those with the least capacity."),

    h2('s4h1', 'A Vermont Application, as a Proposal'),
    blk('s4p1', "Consider, as an illustration of design and not as a description of any existing effort, a collaborative on post-discharge transition for the fourteen hospitals and their affiliated primary care practices. The topic is narrow and has a change package: a call within two business days, a visit within seven days and a thirty-day review. The measures are few: the share of discharges contacted in two business days, the share with a seven-day visit and the thirty-day readmission rate. Teams from each hospital and one or two partner practices attend three sessions across nine months, testing in between."),
    blk('s4p2', "The Blueprint for Health already convenes practices and community health teams in regional settings, and its 2025 annual report records that 1,096 people attended pilot trainings during that year. That suggests an existing habit of convening, although training attendance is not the same as improvement collaboration, and the lesson does not claim that Blueprint meetings function as collaboratives. A design would build on that infrastructure and not duplicate it. It would also need a data channel: the most useful feature for teams is a simple monthly report that shows their results beside the group's."),
    blk('s4p3', "The design has to confront Vermont's capacity constraints. The state's hospitals and practices are already responding to planning, grants and payment changes, as the Agency's reporting shows. A collaborative that adds a heavy new burden may be declined. One that replaces a duplicative meeting and shows early practical benefit may be welcomed. The sponsor should therefore consider which existing meetings it can fold into the collaborative and how it can show returns within the first learning cycle."),
    steps('s4st1', 'Designing a collaborative in six steps', [
        ('Choose a narrow topic', 'One problem with a clear set of changes to test.'),
        ('Write the change package', 'Evidence-based changes teams can try, with tools and examples.'),
        ('Select a few measures', 'Three to five, simple to collect and reported monthly.'),
        ('Recruit teams', 'Include the organizations with the most need and offer them extra support.'),
        ('Run sessions and action periods', 'Alternate meetings with testing, with coaching between.'),
        ('Publish and hand over', 'Record results and methods so others can use them after the collaborative ends.'),
    ]),

    h2('s5h1', 'Sustaining What the Collaborative Starts'),
    blk('s5p1', "The weakest point of many collaboratives is what happens after they end. Gains made during a funded period can fade once the meetings stop and attention moves elsewhere, which echoes the diffusion literature's note that evidence on sustaining innovations is sparse. A design should plan for it from the start: embed the changes in standard work, assign owners, keep the measures flowing to a continuing group and decide who convenes alumni teams."),
    blk('s5p2', "A final test applies to the sponsor as well as the participants. Does the sponsor use what it learns? A collaborative generates information about which changes work, which barriers recur and where policy or payment gets in the way. If that information reaches the agencies that can act on it, the collaborative serves both as a learning vehicle and as a source of intelligence for policy. If it stops at a report, the same obstacle will be discovered again in the next program."),

    takeaway('tw', [
        "The Breakthrough Series alternates learning sessions, where teams share and plan, with action periods, where teams test changes in their own settings.",
        "Summaries of the 2003 white paper describe three learning sessions, a six to fifteen month timeline, a summative congress and collaboratives of about 12 to 160 teams.",
        "The method works through a narrow topic and change package, shared measures, team participation and peer learning.",
        "Evaluations of collaboratives have been mixed, so organizational context matters and the method does not guarantee change.",
        "Collaboratives favor organizations with capacity; recruit and support those with the least.",
        "A Vermont transition collaborative is the lesson's proposal, not an existing program; it should build on existing convening such as the Blueprint.",
        "Plan for sustaining gains after the collaborative ends and feed what is learned to the agencies that can act on it.",
    ]),
    quiz('qz',
        "What happens in the 'action periods' of an improvement collaborative?",
        [
            ("Teams attend lectures at a central location", False),
            ("Teams return to their organizations and test changes using PDSA cycles", True),
            ("Teams publish their final results", False),
            ("Faculty rewrite the change package", False),
        ],
        "Action periods are the intervals between learning sessions when teams test changes in their own clinical settings, using the Model for Improvement and PDSA cycles."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.8 Implications for You; §12.1 The Gap Between Understanding and Doing"),
    blk('src2', "[2] Institute for Healthcare Improvement, The Breakthrough Series: IHI's Collaborative Model for Achieving Breakthrough Improvement (Innovation Series white paper, 2003) — https://ihi.org/fr/node/22911 — public excerpts; full text not obtained"),
    blk('src3', "[3] American Academy of Pediatrics, Model for Improvement and Breakthrough Series Model — https://aap.org/en/quality-improvement/quality-network-change-packages/model-for-improvement-and-breakthrough-series-model — summary"),
    blk('src4', "[4] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — training attendance and regional convening"),
]


L16_SLUG = 'tl-evidence-appraisal'
L16_TITLE = 'Whose Number Is It? Appraising Evidence Before You Act On It'
L16 = [
    blk('intro1', "Chapter 12 sends readers to the platform's Evidence Library to check, before citing a claim, whether the underlying source is a peer-reviewed evaluation, a consultant projection or an agency self-report, a distinction the chapter says most transformation reading collapses. The distinction matters because transformation decisions are made on numbers, and the same figure carries very different weight depending on who produced it, for what purpose and with what comparison. A leader who cannot tell the difference will be moved by whichever number is most confidently stated."),
    blk('intro2', "This lesson sets out a practical way to appraise evidence quickly, without becoming a methodologist. It uses the Library's own source-type labels as a starting classification, applies a short set of questions to any claim and shows how to cite and handle uncertainty. The tool's counts and labels come from reading its source on the platform; the book's own acknowledgements about underperforming models come from its text."),
    blk('intro3', "The goal is not to distrust every number, but to know how much each one can bear."),

    h2('s1h1', 'Four Kinds of Source'),
    blk('s1p1', "The Evidence Library labels each of its collections by source type and says so before a reader cites anything. Its cost-effectiveness collection is labelled a peer-reviewed evaluation: every row cites the journal that published it, and a column grades the strength of the design. Its collection of federal innovation models is labelled an agency self-report: model status and savings figures come from the sponsoring agency's announcements and the evaluations it commissions, and the tool tells readers to treat a savings figure as the agency's account of its own program until an independent, peer-reviewed evaluation confirms it. Its policy briefs are labelled the platform's own synthesis, a secondary source, and readers are told to cite the underlying study or agency report and not the brief."),
    blk('s1p2', "A fourth kind, the consultant projection, is explained alongside these in the tool: an estimate prepared by a firm for a client or sponsor, usually about the future, based on assumptions the reader may not see. The 2024 hospital financial projections that prompted Vermont's reform are of this kind: a firm's estimate prepared for a client, whose assumptions a reader must examine. A projection can be valuable, since the future cannot be observed, but its reliability depends on its assumptions, and no one has yet checked it against outcomes."),
    callout('s1c1', "The same figure means different things as a journal finding, a sponsor announcement, a consultant forecast and a summary on a website."),

    h2('s2h1', 'Why the Source Type Matters'),
    blk('s2p1', "Each source type has characteristic strengths and risks. Peer-reviewed evaluations have been examined by independent reviewers and usually describe their methods, but they can be small, dated or conducted in settings unlike yours, and publication favors positive results. Agency self-reports are timely and based on real program data, but the agency has an interest in the program's success, and the comparison group may be chosen in ways that favor it. Consultant projections can be tailored to the question and the data, but they depend on assumptions and are produced for a purpose. Summaries are convenient and can be accurate, but they may omit caveats and errors can be repeated."),
    blk('s2p2', "The book is candid about one case. In the Introduction, answering a critic, it concedes that federal payment models have generally underperformed their projections, and that several have been redesigned or discontinued mid-course. That is a reason to treat model savings projections with caution, even when they are official. It does not mean that such models are worthless, but it does mean that a decision resting on a projected saving should be tested against what has happened elsewhere, and should include a plan for the case in which the saving is smaller than announced."),
    table('s2t1', 'Source types, strengths and cautions (summarized from the Evidence Library labels and general practice)', [
        {'Source_type': 'Peer-reviewed evaluation', 'Strength': 'Independent review; methods described', 'Caution': 'Setting, date and sample may not match yours'},
        {'Source_type': 'Agency self-report', 'Strength': 'Timely; real program data', 'Caution': 'Sponsor has an interest; comparison may favor the program'},
        {'Source_type': 'Consultant projection', 'Strength': 'Tailored to the question', 'Caution': 'Rests on assumptions; not yet checked against outcomes'},
        {'Source_type': 'Platform or press synthesis', 'Strength': 'Convenient overview', 'Caution': 'Secondary; cite and check the underlying source'},
    ]),

    h2('s3h1', 'Six Questions for Any Claim'),
    blk('s3p1', "A short set of questions can be asked of nearly any claim. Who produced it, and who paid for it? What exactly was measured, and over what period? What was it compared with, and how were the comparison cases chosen? How large was the effect, and how uncertain? Does the setting resemble mine? And who benefits if I believe it? None of these questions requires technical training, and a leader who asks them routinely will catch most of the problems that matter."),
    blk('s3p2', "Consider the question of comparison. A claim that a program saved money is only as good as the estimate of what would have happened without it. If participants were healthier or more engaged to begin with, the program may be credited with differences that existed before it started. If the comparison was a historical period, other changes over the same time may explain the difference. The Vermont Blueprint's reported savings, for instance, are described by the program's own report as a comparison and not an exact measure of savings, which is the kind of caveat a careful reader should carry into any citation."),
    blk('s3p3', "Consider also the question of size and uncertainty. A statement that an intervention reduces readmissions is less useful than a statement of how much, in whom and with what range of uncertainty. Where a source gives a range, report the range. Where it gives a single number with no uncertainty, treat that as a warning and ask how the number was derived."),
    steps('s3st1', 'A five-minute claim check', [
        ('Find the original', 'Locate the study, report or data behind the statement.'),
        ('Classify the source', 'Peer-reviewed, agency self-report, consultant projection or synthesis.'),
        ('Ask the six questions', 'Who, what, compared with what, how large, how like mine, who benefits.'),
        ('Check the arithmetic', 'Confirm denominators, periods and units; recompute one figure.'),
        ('State the confidence', 'Write what you would stake on it: strong, moderate or tentative.'),
    ]),

    h2('s4h1', 'Citing and Carrying Uncertainty'),
    blk('s4p1', "When you use a figure in your own work, cite the original and say what kind of source it is. A sentence such as, according to the federal agency's own evaluation, savings were a given amount, tells the reader exactly how much weight to give it. A sentence that states the same figure as fact conceals the source and invites a challenge. The Library's advice to cite the underlying study, not the platform brief, follows the same principle: a chain of summaries loses information at every step."),
    blk('s4p2', "Uncertainty should be carried forward into decisions, not removed. If a business case rests on a projected saving, show what happens if the saving is half as large, or arrives a year late. If a policy recommendation depends on a study from another country, say so and say what would need to be true for it to apply. Chapter 12 describes the platform as a set of tools for making analytical frameworks concrete, and that includes the discipline of making assumptions visible, so that a reader can change them."),
    blk('s4p3', "A related habit is to separate what is known, what is estimated and what is assumed in every document. Known facts, such as a statutory date, can be stated flatly. Estimates, such as a projected deficit, should carry their source and range. Assumptions, such as that a payment model will be approved on schedule, should be listed as assumptions. A short section with these three headings makes a report more useful than a longer one that blends them."),

    h2('s5h1', 'Using the Tools, Including AI Assistants'),
    blk('s5p1', "The Library holds, according to its description, twenty-five landmark cost-effectiveness studies, twenty-one federal innovation models with summaries of lessons learned and fifteen policy briefs. Its use is as a starting point: find the study, read the source-type label, then go to the original for details before relying on it. The Research Workspace described in the same chapter lets users save scenarios and manage citations, which supports keeping the source attached to the number."),
    blk('s5p2', "The chapter also describes an AI assistant that routes a plain-language question to the relevant framework, chapter and tool. Such tools can speed up orientation, and the chapter calls the assistant a change-management aid for bringing a colleague up to speed. They should be used with the same discipline as any secondary source. Ask for the underlying citation, open it and confirm that it says what the summary says. An assistant that supplies a confident figure with no checkable source has given you a claim to verify, not a fact."),
    blk('s5p3', "Over time, an organization can build a small evidence habit: a shared list of the sources it relies on, each tagged by type and date, with a note of when it was last checked. When a number is challenged in a meeting, the answer is then immediate. That habit costs little and is among the most practical forms of the knowledge infrastructure this chapter describes."),

    takeaway('tw', [
        "Chapter 12 sends readers to the Evidence Library to check whether a source is a peer-reviewed evaluation, a consultant projection or an agency self-report.",
        "The Library labels its collections: peer-reviewed cost-effectiveness studies, agency self-reports on federal models and the platform's own synthesis in policy briefs.",
        "A consultant projection rests on assumptions and has not been checked against outcomes; the book concedes that federal models have generally underperformed their projections.",
        "Ask six questions of any claim: who produced it, what was measured, compared with what, how large, how like mine and who benefits.",
        "The Blueprint's reported savings are described by its own report as a comparison, not an exact measure of savings.",
        "Cite the original source, say what kind it is and carry uncertainty into decisions.",
        "Treat AI assistants as orientation aids; open the citation and confirm it says what the summary says.",
    ]),
    quiz('qz',
        "Why does the Evidence Library label its federal innovation model collection an 'agency self-report'?",
        [
            ("Because the models were never evaluated", False),
            ("Because the savings figures come from the sponsoring agency's own announcements and commissioned evaluations, so they are the agency's account of its own program until independently confirmed", True),
            ("Because the Library was written by CMS", False),
            ("Because peer-reviewed studies cannot examine federal models", False),
        ],
        "The tool says model status and savings figures come from CMS announcements and its own commissioned evaluations, so they should be treated as the sponsor's account until an independent, peer-reviewed evaluation confirms them."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.7 Work This Chapter on the Platform (Evidence Library)"),
    blk('src2', "[2] HTR Research Lab, Evidence Library — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=evidence — tool source read 2026-11-23: source-type labels and collection counts"),
    blk('src3', "[3] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — description of reported savings as a comparison"),
    blk('src4', "[4] Health Transformation Review, Transforming Healthcare (HTR book v42), Introduction — the book's acknowledgement that federal models have generally underperformed projections"),
]

LESSONS = [(L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15), (L16_SLUG, L16_TITLE, L16, 16)]
if __name__ == '__main__':
    run(LESSONS)
