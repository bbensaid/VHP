exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_psr_common.py').read())

# Track 5 — Designing for Durability, a Comparison, and the Capstone. Facts used: HTR book Chapter 14 §14.5 and §14.7;
# CMS AHEAD page (Maryland Cohort 1; Maryland keeps its Medicare hospital global budget methodology for 2026-2027 and
# moves to the AHEAD methodology in 2028, per CMS fall 2025 AHEAD material read earlier); CMS March 12, 2025 fact sheet
# (Maryland Total Cost of Care identified to end early); RTI and Milbank summaries of Maryland (Maryland's all-payer hospital
# rate setting dates to the 1970s). No source was read on other states' reversals; the lessons say so.

# ════════════════════════════════════════════════════════════════════════════
L13_SLUG = 'psr-designing-for-durability'
L13_TITLE = 'Designing a Reform to Survive: Lessons for Other States'
L13 = [
    blk('intro1', "Every state that attempts payment or delivery reform faces the problem this course has examined: the reform is a statute, and statutes can be changed. Chapter 14 states a design implication for other states, that sustainability should be built into the reform from the start. This lesson turns that into a checklist a legislator, an agency or an advocate can apply to a reform in any state."),
    blk('intro2', "It uses Vermont's cascade as the worked example, adds the chapter's guidance for four audiences, and then tests the checklist on the three kinds of provision that proved most and least durable in 2026: statutory deadlines, federal agreements and regulatory discretion. The aim is a way of reading a reform's design, not a template to copy."),
    blk('intro3', "No source read for this course describes another state's reform being unwound, so the lesson does not claim a comparative record. It offers the framework and invites the reader to apply it to their own state's facts."),

    h2('s1h1', 'Chapter 14\'s Design Implications'),
    blk('s1p1', "The chapter ends its analysis with advice that is as much about how to legislate as about what to legislate. States that attempt the whole architecture in a single bill give opponents one target instead of three. The cascade of a diagnostic act, an enabling act and an operational act is a political-sustainability structure as much as a policy one, because each act makes the next harder to reverse. The chapter lists four design features: diagnosis before legislation, public process before mandate, incremental capacity-building before full accountability, and continuous public reporting that makes progress and failure equally visible."),
    blk('s1p2', "It also gives guidance by audience. A state official or legislator should recognize that the durability of the reform rests on structure and not goodwill, mandatory statutory architecture and staggered effective dates, so that protecting transformation across an election cycle is mostly work done before the cycle. A leader of a healthcare organization should treat political risk to the reform as operational risk and hold a stated position on what the organization does if a date moves. An advocate should know that the most durable protections were not the most rhetorically forceful ones: mandatory participation and statutory deadlines survive changes of government, while federal-state agreements, strategic plans and voluntary commitments generally do not."),

    h2('s2h1', 'A Design Checklist'),
    steps('s2st1', 'Questions to ask of any reform statute', [
        ('Is the problem established in the public record?', 'Has an open process, with data and community input, defined the problem before a remedy is proposed?'),
        ('Are the obligations dated and placed in statute?', 'Do deadlines and responsible institutions appear in the text, so that they do not depend on a future administration\'s enthusiasm?'),
        ('Does each step create institutions and constituencies?', 'Will a committee, an office or a funded program exist that has a stake in the next step?'),
        ('Is the discretion bounded?', 'Where regulators set levels and methods, does the statute name the factors, the data and the reporting that constrain them?'),
        ('Is failure visible?', 'Are there fixed public reports, annual reviews and dates that make a missed deadline or a softened method obvious?'),
        ('Does authority rest on the state?', 'If a federal agreement ends, does the reform continue under state authority?'),
    ]),
    blk('s2p1', "Apply the list to Vermont's Act 68 and the pattern of strength and exposure shows. The problem was established through the Act 167 process. Deadlines are in statute. Institutions were created: the Strategic Plan, the Health Care Delivery Advisory Committee and the steering committee for primary care. Failure is visible through annual premium monitoring, the budget calendar and the Strategic Plan date. Authority rests on the state, as the AHEAD withdrawal demonstrated. The weakest answer is the fourth: discretion is wide, since the statute names no percentage for reference-based pricing and qualifies the global budget dates by the phrase 'to the extent that resources are available'."),

    h2('s3h1', 'Provisions Rated by Durability'),
    blk('s3p1', "The 2026 record supports a rough ranking of provision types. Statutory deadlines with named responsible parties proved durable: nothing in the year repealed or delayed Act 68's dates. State authority proved durable: the reform continued after the federal agreement ended. Federal agreements proved fragile, whether the AHEAD agreement or the all-payer model agreement through which Medicare funded Blueprint payments. Regulatory discretion proved contested, as the Board's split vote and the governor's veto of a narrower pricing bill showed. And time-limited funding proved a cliff to be managed."),
    table('s3t1', 'Provision types and what the 2026 record suggests', [
        {'Provision_type': 'Statutory deadline with a responsible institution', 'Observed_in_2026': 'Act 68 dates unchanged after veto, withdrawal and election', 'Durability': 'High'},
        {'Provision_type': 'State authority independent of federal programs', 'Observed_in_2026': 'Reform continued after AHEAD ended', 'Durability': 'High'},
        {'Provision_type': 'Federal-state agreement', 'Observed_in_2026': 'AHEAD ended; Medicare funding for the Blueprint stopped when its agreement ended', 'Durability': 'Low'},
        {'Provision_type': 'Regulatory methodology and levels', 'Observed_in_2026': 'Board split 3-2 on a hospital budget; governor vetoed a narrower pricing bill', 'Durability': 'Contested'},
        {'Provision_type': 'Time-limited funding', 'Observed_in_2026': 'Rural Health Transformation funds expire in 2030; state backfilled one year of Medicare\'s Blueprint share', 'Durability': 'Moderate; needs a plan'},
    ]),
    callout('s3c1', "A reform's durability is the durability of its weakest necessary provision. A strong deadline cannot protect a program whose operating funding sits in an agreement that can end."),

    h2('s4h1', 'Adapting the Framework to Another State'),
    blk('s4p1', "The chapter's Beyond Vermont box gives the translation rule: substitute the relevant election calendar, the relevant regulatory body and the relevant provider coalition, and the framework holds. A reader elsewhere should identify four things. The regulatory body that sets prices or budgets, and how it is appointed and removed. The most politically influential health system, which the chapter says is the actor most likely to generate an enforcement challenge. The hospital association or coalition and its history of campaigns. And the federal dependencies: which waivers, models or Medicaid financing arrangements the reform relies on, with their end dates."),
    blk('s4p2', "Then run the exercise of this course on those facts: rate each element's durability, list the early-warning signals with their sources, write three or four disruption scenarios with triggers and owners, and screen the capital plan for investments that hold value in all of them. The output is a risk register, which Lesson 15 builds."),
    warning('s4w1', "Do not import Vermont's conclusions", "Vermont's facts, a small state with one dominant health system and a strong regulator, shaped its results. Use the method, and gather your own state's facts before drawing conclusions."),

    h2('s5h1', 'Applying the Checklist to a Hypothetical State'),
    blk('s5p1', "Imagine a state that passes one large bill creating a hospital price cap, a global budget requirement and a new federal waiver arrangement, all effective the same year. The bill has no prior public diagnosis, so the problem is contested. Its deadlines are in statute, which helps. But its institutions are new and unstaffed, its regulator is given wide discretion without named factors and its financing depends on a waiver the state has not yet negotiated. Run the six questions and the answers are mixed: the dated obligations pass, the problem definition fails, the discretion is unbounded, failure is not visible because no reporting is specified and authority rests partly on a federal agreement."),
    blk('s5p1b', "The exercise also shows why order matters. The same provisions in three separate acts, a diagnostic act first, an enabling act next and an operational act last, would score better on the first and third questions without changing what the state eventually does. Sequencing is a design variable and costs nothing except time, which is the price Vermont paid and which an impatient state may be tempted to avoid."),
    blk('s5p2', "The checklist does not say the bill is bad. It says where the risk sits and what to fix before enactment: add a public diagnostic step, name the factors the regulator must consider, require annual public reporting and make the state's authority independent of the waiver. A legislator or advocate who sees these gaps in time can amend the bill. One who sees them after the first election cycle is left to manage them."),
    h2('s6h1', 'Who Does What'),
    blk('s6p1', "Each audience has a specific task. Legislators write deadlines, institutions, bounded discretion and reporting into the statute and stage effective dates so that no single vote undoes the whole. Agencies build the data, staff and public reports that make progress and failure visible, and keep state authority independent of federal agreements where they can. Organizations sort their capital plans by durability, engage the regulator with data and keep scenario plans current. Advocates concentrate on the provisions that survive changes of government, mandatory participation and dated obligations, and on keeping reporting honest, rather than on rhetorical force."),
    blk('s6p2', "The common thread is that durability is designed, and mostly before the contest begins. The 2026 events in Vermont tested a design made in 2022 to 2025. Where the design was sound, the reform held. Where it left discretion open, the contest moved there. A state planning its own reform has the advantage of seeing both outcomes before it writes the first section, and should use it."),

    takeaway('tw', [
        "Chapter 14 advises building sustainability into a reform from the start: diagnosis before legislation, public process before mandate, incremental capacity before accountability and continuous public reporting.",
        "States that attempt the whole architecture in one bill give opponents one target instead of three; a cascade spreads the political cost.",
        "Mandatory participation and statutory deadlines survive changes of government; federal-state agreements, strategic plans and voluntary commitments generally do not, according to the chapter.",
        "A six-question checklist tests a reform's design: established problem, dated obligations in statute, institutions and constituencies, bounded discretion, visible failure and state-based authority.",
        "Vermont's Act 68 is strongest on deadlines, institutions, visibility and state authority and weakest on bounded discretion.",
        "The 2026 record rates statutory deadlines and state authority as durable, federal agreements as fragile, regulatory discretion as contested and time-limited funding as a cliff.",
        "To adapt the framework, identify your state's regulator, dominant health system, provider coalition and federal dependencies; do not import Vermont's conclusions.",
    ]),
    quiz('qz',
        "According to Chapter 14, which kinds of provision tend to survive changes of government?",
        [
            ("Federal-state agreements and voluntary commitments", False),
            ("Mandatory participation and statutory deadlines", True),
            ("Strategic plans without deadlines", False),
            ("Provisions that depend on a particular administration's priorities", False),
        ],
        "The chapter states that mandatory participation and statutory deadlines survive changes of government, while federal-state agreements last only while their economics hold, and strategic plans and voluntary commitments generally do not."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.5 (the reform cascade), §14.7 (Implications for You) and the Beyond Vermont box"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — deadlines, institutions, reporting and discretion"),
    blk('src3', "[3] Vermont Public, Phil Scott wins historic sixth term (November 3, 2026) — https://www.vermontpublic.org/local-news/2026-11-03/phil-scott-wins-historic-sixth-term-as-vermont-governor; Gov. Phil Scott vetoes 'soft opening' for hospital pricing reforms (June 16, 2026) — https://www.vermontpublic.org/local-news/2026-06-16/gov-phil-scott-vetoes-soft-opening-for-hospital-pricing-reforms"),
    blk('src4', "[4] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf"),
]

# ════════════════════════════════════════════════════════════════════════════
L14_SLUG = 'psr-maryland-comparison'
L14_TITLE = "A Comparison: Maryland's Durable Authority and the End of a Federal Model"
L14 = [
    blk('intro1', "Vermont's 2026 events carry a lesson about state authority and federal agreements. A second state offers a test of the same idea from a different angle. Maryland has regulated hospital rates under its own commission since the 1970s, built a series of federal models on top of that authority, and saw the federal Total Cost of Care model identified to end early in 2025. If Chapter 14's argument is right, Maryland's hospital payment system should have continued through the end of the federal model. This lesson checks what the sources show."),
    blk('intro2', "It relies on CMS's own materials, read for this course, and on RTI's and the Milbank Memorial Fund's summaries of the Maryland model, which the finance course cited. It is a short case, not a full history, and it says where the sources stop."),
    blk('intro3', "The point is to test the framework against a second example and to show how a practitioner uses a comparison without overclaiming."),

    h2('s1h1', 'Authority That Predates the Models'),
    blk('s1p1', "Maryland's hospitals have been paid under an all-payer rate-setting system administered by a state commission, the Health Services Cost Review Commission, since the 1970s, in which all payers pay the same hospital rates. In 2014 the state and CMS added hospital-specific global budgets in the Maryland All-Payer Model, and in 2019 the arrangement was extended into the Total Cost of Care Model. The federal models were built on top of a state regulatory authority that already existed."),
    blk('s1p2', "The point has two sides. The long history gave the system a deep institutional base: staff, methods, relationships with hospitals and a body of data. And it meant that the federal models were amendments to an existing system and not its foundation. Chapter 3 credits the Maryland model with alignment with the state regulatory environment for this reason, since it was built on the state's existing authority."),

    h2('s2h1', 'The Federal Model Ends'),
    blk('s2p1', "On March 12, 2025, CMS published a fact sheet identifying four models to end early, among them Maryland Total Cost of Care, with an original period of 2019 to 2026. CMS stated that it aimed to end them by December 31, 2025, and said it would advise participants in state-specific total cost of care models of other regulatory options. The fact sheet did not state what would replace Maryland's model."),
    blk('s2p2', "CMS's current AHEAD material fills in part of the answer. Maryland is listed as the Cohort 1 participant in AHEAD, which CMS says builds on earlier state-based models including the Maryland Total Cost of Care Model and Vermont's All-Payer ACO Model. CMS's fall 2025 overview states that Maryland will keep using its existing Medicare hospital global budget methodology for 2026 and 2027 and then move to the AHEAD methodology in 2028. In other words, the federal model ended, the state's system continued and a successor federal arrangement is being layered on."),
    callout('s2c1', "When a federal model ended, Maryland's hospital payment system did not stop, because its authority is the state's. That is the mirror image of Vermont's 2026 experience."),

    h2('s3h1', 'What the Comparison Shows, and What It Does Not'),
    blk('s3p1', "The comparison supports the chapter's central contrast. In both states, a federal agreement was the least durable element and state authority the most durable. Vermont's reform continued after AHEAD under Act 68; Maryland's payment system continued after its Total Cost of Care model under its own commission. Both illustrate that a reform that depends entirely on a federal model is exposed, while one that has independent authority is resilient."),
    blk('s3p2', "It does not show more. Maryland's authority is decades old, and Vermont's is a few years old and was created by statute in 2025, so Vermont's reform has not yet had time to build the institutional depth Maryland's has. The two states also differ in size, structure and the number of hospitals. And this lesson did not read evidence on whether Maryland's results have been sustained or on the details of its transition, so it does not claim that the transition was smooth. The Maryland evidence on cost and quality is mixed, as the finance course noted: RTI reported Medicare savings in the early years, while other studies found weaker effects on utilization and mixed results on quality."),
    table('s3t1', 'Two states, same pattern', [
        {'Question': 'What was the federal vehicle?', 'Vermont': 'AHEAD agreement signed January 2025', 'Maryland': 'Total Cost of Care Model, 2019 onward'},
        {'Question': 'What happened to it?', 'Vermont': 'State withdrew in July 2026 after anticipated funding was reduced', 'Maryland': 'CMS identified it to end early, by December 31, 2025'},
        {'Question': 'What carried on?', 'Vermont': 'Act 68 reference-based pricing and global budget authority', 'Maryland': 'State hospital rate-setting; Medicare global budget methodology kept for 2026 and 2027'},
        {'Question': 'What is next?', 'Vermont': 'Federal vehicle for Medicare undecided', 'Maryland': 'Moves to the AHEAD methodology in 2028'},
        {'Question': 'Age of the state authority', 'Vermont': 'Act 68 (2025), building on Act 167 (2022)', 'Maryland': 'Since the 1970s'},
    ]),

    h2('s4h1', 'Lessons for the Practitioner'),
    blk('s4p1', "Three lessons follow. First, authority beats agreement: when planning around a reform, identify whose authority it rests on, and treat dependence on a federal agreement as a risk. Second, institutional depth takes time, so a young reform should invest early in the offices, methods and data that give it staying power, and should expect to be more exposed than an old one while it does. Third, a comparison is evidence of a pattern and not proof: use it to sharpen questions about your own state, and mark clearly what you did and did not verify."),
    blk('s4p2', "For a Vermont organization the comparison offers some reassurance and a caution. The reassurance is that a reform built on state authority can outlast a federal model. The caution is that Maryland's authority is mature and Vermont's is not, and that Vermont's regulator, in 2026, was visibly divided on how fast to move."),
    warning('s4w1', "A single comparison cannot establish a rule", "Maryland and Vermont both fit the pattern, but two cases are an illustration. Look for cases that do not fit before treating the pattern as general."),

    h2('s5h1', 'Questions the Comparison Raises'),
    blk('s5p1', "A careful reader will want to know how a young authority acquires the depth of an old one. The sources suggest a list. Staff and methods: Vermont's Board has hospital budget review and a rule in process, and the statute creates positions for reference-based pricing. Data: the state's all-payer claims data and the Agency's outcome measures. Relationships with providers and payers: built through annual budget hearings and the Act 167 process. And a record of decisions: each order, with its reasoning, becomes precedent. Depth comes from repetition, and the 2026 budget order was one more repetition."),
    blk('s5p2', "Another question is how a state's authority fares when its regulator is divided. Maryland's commission is long-established, and the sources read for this lesson do not describe its internal votes. Vermont's Board split 3 to 2 on a major order in September, which suggests that young authority may be contested even within the regulator. A reader should watch whether the Board's membership and approach stabilize, since the pace of its decisions will set much of the reform's effect on hospitals."),
    blk('s5p2b', "It is also fair to ask what the comparison does not control for. Maryland began its regulatory system under different federal rules, in a different decade and with a different mix of hospitals, and Vermont's reform arrived in a very different financial and public-health environment. The pattern is suggestive, and the cases differ in ways that could matter."),
    blk('s5p3', "A final question for the practitioner is what to watch in 2028, when Maryland moves to the AHEAD methodology and the remaining AHEAD states begin their performance periods. The result will show whether a mature state authority can absorb a new federal design without losing its character, which bears on how far a state like Vermont should depend on any federal vehicle for its Medicare payments, and on whether a federal design can be adapted to a state's own methods."),

    takeaway('tw', [
        "Maryland has regulated hospital rates through a state commission since the 1970s and layered federal models, the All-Payer Model in 2014 and the Total Cost of Care Model in 2019, on top of that authority.",
        "On March 12, 2025 CMS identified Maryland Total Cost of Care to end early, aiming for December 31, 2025.",
        "CMS lists Maryland as AHEAD's Cohort 1 and says it will keep its Medicare hospital global budget methodology for 2026 and 2027 and move to the AHEAD methodology in 2028.",
        "In both Maryland and Vermont a federal model ended while state authority continued, which supports Chapter 14's contrast between federal agreements and statutory authority.",
        "The comparison does not show that Maryland's transition was smooth or that its results were sustained; evidence on Maryland's cost and quality effects is mixed.",
        "Maryland's authority is decades old and Vermont's is new, so Vermont has less institutional depth and may be more exposed.",
        "Treat a comparison as evidence of a pattern, mark what was verified and look for cases that do not fit.",
    ]),
    quiz('qz',
        "What does the Maryland comparison illustrate about Chapter 14's argument?",
        [
            ("That federal models are more durable than state authority", False),
            ("That a federal model can end while state hospital rate-setting authority continues, supporting the contrast between federal agreements and state authority", True),
            ("That Maryland's results were fully sustained after the model ended", False),
            ("That reform cannot be reversed in any state", False),
        ],
        "Maryland's Total Cost of Care Model was identified to end early, while its state hospital rate-setting system continued and a successor federal arrangement, AHEAD, is being layered on. This parallels Vermont's experience and supports the chapter's contrast, without proving more."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS, Innovation Center Announces Model Portfolio Changes (fact sheet, March 12, 2025) — https://www.cms.gov/newsroom/fact-sheets/cms-innovation-center-announces-model-portfolio-changes-better-protect-taxpayers-help-americans-live"),
    blk('src2', "[2] CMS, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — Maryland as Cohort 1; AHEAD builds on the Maryland and Vermont models"),
    blk('src3', "[3] CMS, AHEAD Overview, fall 2025 slides — https://www.cms.gov/priorities/innovation/files/ahead-overview-fall2025-slides.pdf — Maryland's methodology for 2026 and 2027 and move to the AHEAD methodology in 2028, as reported in the course's finance lessons"),
    blk('src4', "[4] RTI International, New Hospital Payment Model Reduces Costs for Medicare Beneficiaries in Maryland — https://rti.org/news/new-hospital-payment-model-reduces-costs-medicare-beneficiaries-maryland; Milbank Memorial Fund, Uniquely Similar — https://www.milbank.org/publications/uniquely-similar-new-results-from-marylands-all-payer-model-and-paths-forward-for-value-based-care/"),
    blk('src5', "[5] " + BOOK14 + " — §14.2.1 and §14.7: the contrast between federal agreements and state authority"),
]

# ════════════════════════════════════════════════════════════════════════════
L15_SLUG = 'psr-capstone-risk-register'
L15_TITLE = 'Capstone: Build a Political-Risk Register'
L15 = [
    blk('intro1', "The capstone asks you to apply the course to a real organization, or to Vermont as a reference case, and produce a political-risk register: a one-to-three page document that rates the durability of the reform elements the organization depends on, lists its early-warning signals with owners, sets out disruption scenarios with triggers and first responses, screens its capital plan, and states the evidence it will supply. It is the practical output of the framework."),
    blk('intro2', "The exercise takes about an hour if the facts are at hand and longer if you have to look them up. It uses the platform's Wire bill tracker, the HTR Simulator and the Friction Index from Lesson 9, the Hospital Financial Stress Test from the finance course if you are a hospital, and the primary sources the course has cited."),
    blk('intro3', "A good register is short, dated and honest about what you could not verify. Choose your organization and keep it fixed."),

    h2('s1h1', 'Step One: Define the Reform and Your Dependencies'),
    blk('s1p1', "Write a one-paragraph statement of the reform your plans depend on: the statute or program, its key dates and the regulator. For a Vermont hospital this would be Act 68's reference-based pricing and global hospital budgets. Then list your dependencies: which elements of the reform your capital plan, revenue assumptions and staffing rely on. For example: a revenue assumption that commercial prices will not fall below a given level before a given year; a program funded by time-limited money; a federal agreement that supplies an income stream."),
    blk('s1p2', "State each dependency in a form that can be checked, with a date. A dependency stated as 'we rely on the reform continuing' cannot be monitored. One stated as 'our fiscal year 2028 budget assumes global budgets do not begin for us before fiscal year 2029' can."),

    h2('s2h1', 'Step Two: Rate Durability'),
    blk('s2p1', "For each dependency, rate its durability using the four questions from Lesson 2: is it in statute with a date, do institutions with staff depend on it, would capital be stranded by reversal and does it answer a persistent problem? Mark each as durable, contested or exposed, and cite the evidence. Use the 2026 record from Track 2 for Vermont facts and your own sources for others."),
    table('s2t1', 'A durability rating table (format)', [
        {'Dependency': 'Example: our budget assumes no global budget before FY2029', 'In_statute_with_date': 'No: statute sets FY2028 for one or more non-critical-access hospitals, FY2030 for all, to the extent resources are available', 'Institutions': 'Board; Agency', 'Rating': 'Exposed'},
        {'Dependency': 'Example: community health team staff funded by an all-payer program', 'In_statute_with_date': 'Partly: funding source changed when the federal agreement ended', 'Institutions': 'Blueprint', 'Rating': 'Contested'},
    ]),
    blk('s2p2', "The examples in the table are formats. Replace them with your own, and expect to find that at least one assumption in your plan rests on something exposed."),

    h2('s3h1', 'Step Three: Signals, Scenarios and Investments'),
    blk('s3p1', "List the signals you will watch, with an owner and a source for each, using the eight in Chapter 14 as a starting point and adding those specific to your dependencies. Mark each fired, not observed or not assessed, with the date. Then write three to five scenarios as cards, each with a condition, a trigger, an impact, a first-ninety-day response and an owner. Where you are a hospital, size the impact with the stress test's reference-based pricing formula or its other scenarios, and label the inputs as your own assumptions."),
    blk('s3p2', "Then screen your capital plan using Lesson 10's two tests. For each major investment, mark whether it holds value under each scenario and whether it has operating funding in year three, and sort into fund now, fund after a funding plan and minimize as compliance."),
    steps('s3st1', 'What the register must contain', [
        ('Reform and dependencies', 'Dated, checkable statements of what your plan relies on.'),
        ('Durability ratings', 'Durable, contested or exposed, with evidence.'),
        ('Signals', 'Owner, source, status and date for each.'),
        ('Scenario cards', 'Three to five, with triggers, impacts, responses and owners.'),
        ('Capital-plan screen', 'Each investment sorted into three groups.'),
        ('Evidence plan', 'The measures you will report, to whom and how often.'),
    ]),

    h2('s4h1', 'Step Four: Use the Instruments'),
    blk('s4p1', "Run a monitoring cycle as a test. Check the bill tracker and note any change in the tracked bills; read the Board's latest budget guidance or order; check the federal channel for changes that affect your assumptions. Score friction in the Friction Index and save the snapshot, copying the scores into your own log, since the tool keeps it only in your browser. Run the Simulator for your leading scenario and note which pillars move. The result is the first entry in your monitoring log."),
    blk('s4p2', "Be especially careful with dates. The course's facts are current to late November 2026, and several, the status of the Medical Center's appeal, the vote counts on S.190, the legislature's January agenda, could not be confirmed. State which of your facts are verified, which are secondhand and which are unknown."),

    h2('s5h1', 'Step Five: Write the Evidence Plan and Review'),
    blk('s5p1', "Close the register with a short evidence plan: three or four measures tied to the five Act 167 goals, with baselines, a comparison, the reporting dates and the audience. Then review the register against the course's lessons. Did you separate support from durability? Did you rate the strongest and weakest provisions honestly? Did you separate not observed from not assessed in your signal list? Did each scenario have a trigger and an owner? Did you screen the capital plan on operating funding as well as capability? And did you mark what you could not verify?"),
    table('s5t1', 'Self-review rubric', [
        {'Criterion': 'Dependencies', 'Test': 'Is each stated so it can be checked against a date or a document?'},
        {'Criterion': 'Ratings', 'Test': 'Is each durability rating supported by evidence, with weak points named?'},
        {'Criterion': 'Signals', 'Test': 'Does each have an owner, source, status and date, with three states kept distinct?'},
        {'Criterion': 'Scenarios', 'Test': 'Does each have a condition, trigger, impact, response and owner?'},
        {'Criterion': 'Capital plan', 'Test': 'Is each investment sorted by capability and operating funding?'},
        {'Criterion': 'Honesty', 'Test': 'Are unverified facts marked, and are no probabilities invented?'},
    ]),
    warning('s5w1', "Do not invent probabilities", "If you cannot support a probability from evidence, leave it out and rank scenarios by how much they would change your decisions."),

    h2('s6h1', 'Keeping the Register Alive'),
    blk('s6p1', "A register is useful only if it is maintained. Set a review calendar: a monthly check of signals, a quarterly review of scenarios and the capital screen, and an immediate review whenever a trigger fires. Assign the owner, and record changes with dates so the register shows how your view evolved. When the 2027 session opens, the first review should compare the legislature's agenda with your scenario cards. When the Board publishes its next methodology or order, compare it with your assumptions."),
    blk('s6p2', "The deepest purpose of the exercise is not prediction. It is to make an organization's plans robust to a political environment it cannot control, and to let it act quickly when the environment moves. The 2026 record showed three major shifts in six months. An organization that has done this work meets the next one with a plan."),

    h2('s7h1', 'An Excerpt, for Format'),
    blk('s7p1', "To show the shape, here is an excerpt from a hypothetical register for a small critical access hospital, with every figure a placeholder. Dependency: the hospital's FY2028 plan assumes a flat commercial price level through FY2029. Rating: exposed, because Act 68 requires reference-based pricing to begin by hospital fiscal year 2027 and the Board names no percentage. Signal: Board guidance on methodology, owner chief financial officer, source the Board's budget review page, status not assessed as of the date written. Scenario card: accelerated all-payer repricing, trigger a bill passing both chambers, first response to re-run the stress test and freeze discretionary capital. Capital screen: a care management team passes the capability test and needs a funding plan; a reporting build for one federal model is minimized. Evidence plan: avoidable admissions and same-day primary care access, reported quarterly to the board and the local legislators."),
    blk('s7p2', "The excerpt is a page. A real register adds the organization's own numbers and sources, but a page that is checkable and dated is more useful than a long document that is not, and it is far more likely to be kept current. If you can hand the register to a new chief financial officer and they can act on it in a week, it is working."),

    takeaway('tw', [
        "The capstone produces a one-to-three page political-risk register with dependencies, durability ratings, signals, scenario cards, a capital-plan screen and an evidence plan.",
        "State each dependency in a checkable form with a date; a vague dependency cannot be monitored.",
        "Rate each dependency's durability on the four questions: in statute with a date, institutions depend on it, capital would be stranded and it answers a persistent problem.",
        "List signals with owner, source, status and date, keeping fired, not observed and not assessed distinct.",
        "Write three to five scenario cards with a condition, trigger, impact, first-ninety-day response and owner, and size impacts with your own assumptions.",
        "Screen the capital plan on capability and operating funding, and sort investments into fund now, fund after a plan and minimize.",
        "Mark what you could not verify, invent no probabilities and review the register monthly, quarterly and whenever a trigger fires.",
    ]),
    quiz('qz',
        "Which of the following is a checkable statement of a dependency for the register?",
        [
            ("We rely on the reform continuing", False),
            ("Our fiscal year 2028 budget assumes global budgets do not begin for us before fiscal year 2029", True),
            ("We hope the legislature supports us", False),
            ("Politics may change", False),
        ],
        "A dependency should be stated in a form that can be monitored against a date or a document. The statement about the fiscal year 2028 budget names an assumption and a date, so it can be checked against the Board's schedule and the statute."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.2-14.4 and Figures 14.1-14.2: durability analysis, signals and scenarios"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — dates, reporting sections and discretion"),
    blk('src3', "[3] HTR, The Wire — https://healthtransformationreview.org/the-wire; HTR Simulator — https://healthtransformationreview.org/htr-simulator; Transformation Friction Index — https://healthtransformationreview.org/transformation-friction-index"),
    blk('src4', "[4] HTR Research Lab, Hospital Financial Stress Test — https://healthtransformationreview.org/research-lab/policy-quality?tab=scorecard"),
    blk('src5', "[5] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget; VTDigger, Scott vetoes Legislature's latest attempt at healthcare reform (June 17, 2026) — https://vtdigger.org/2026/06/17/scott-vetoes-legislatures-latest-attempt-at-healthcare-reform/"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
