exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_cmmi_common.py').read())

# Track 1 — The Innovation Center: Authority, Record and the 2026 Landscape
# Federal facts verified 2026-11-23: 42 U.S.C. 1315a (Cornell LII text); CBO "Federal Budgetary Effects of the
# Activities of the Center for Medicare & Medicaid Innovation" (Sept 2023); GAO-26-107953 (Mar 27, 2026).
# Vermont/AHEAD facts: HTR book Chapter 3 (§3.2-3.5).

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'cmmi-authority-and-record'
L1_TITLE = 'What the Innovation Center Is, and What Its Record Says'
L1 = [
    blk('intro1', "A state that wants to change how its hospitals and doctors are paid cannot do it with state law alone. Most of the money is federal, the payment rules are federal, and the permission to depart from those rules has to come from Washington. Two federal channels carry that permission: the Center for Medicare and Medicaid Innovation, usually called CMMI or the Innovation Center, and the Medicaid section 1115 waiver. Chapter 3 of Transforming Healthcare treats them as the two main tools of the federal-state interface."),
    blk('intro2', "This first lesson is about the Innovation Center itself. It covers what the law lets the Center do, what the law makes it prove before a model can spread, what the budget scorekeepers and the Government Accountability Office say about its record, and what that record means for a state such as Vermont deciding whether to build a strategy around a federal model."),
    blk('intro3', "The aim is not to be for or against the Center. It is to read its announcements the way an experienced policy practitioner does: knowing what is legally possible, what has usually happened, and which design features separate the models that worked from the ones that did not."),

    h2('s1h1', 'Where the Center Comes From'),
    blk('s1p1', "The Innovation Center was created by section 1115A of the Social Security Act, which section 3021 of the Affordable Care Act added in 2010. The statute directs the Secretary of Health and Human Services to create a center within the Centers for Medicare & Medicaid Services (CMS) to test innovative payment and service delivery models. The models are meant to reduce program spending under Medicare, Medicaid and the Children's Health Insurance Program while preserving or enhancing the quality of care."),
    blk('s1p2', "The statute also tells the Secretary where to look. Models are to address a defined population for which there are deficits in care leading to poor clinical outcomes or potentially avoidable expenditures, and the Secretary is to focus on models expected to reduce program costs while preserving or improving quality. The Center is therefore a testing body with a financial purpose written into its charter, not a general grant-maker."),
    blk('s1p3', "Congress also gave the Center a dedicated, multi-year appropriation. Section 1115A(f) provides $5 million for fiscal year 2010 and $10 billion for fiscal years 2011 through 2019, available until expended, and the same $10 billion for each later ten-year period beginning with fiscal year 2020. That funding is part of why the Center can operate on a different rhythm from an ordinary program office: it does not wait on annual appropriations to launch a model."),
    callout('s1c1', "The Innovation Center is a statutory testing body. It exists to try payment and delivery changes on a defined population, measure whether they cut spending without hurting quality, and expand only the ones that pass."),

    h2('s2h1', 'What the Law Lets the Center Do'),
    blk('s2p1', "Section 1115A gives the Center unusual legal room. Under subsection (d)(1) the Secretary may waive requirements of titles XI and XVIII of the Social Security Act, and of specified provisions of title XIX, solely for the purpose of testing models. That is how a hospital global budget, which ordinary Medicare payment rules do not allow, can be tested at all."),
    blk('s2p2', "Subsection (d)(2) then limits who can challenge the Center's choices. There is no administrative or judicial review of the selection of models for testing or expansion, the selection of participants, the elements, parameters, scope and duration of a model, determinations about budget neutrality, the termination or modification of a model, or determinations about expansion. A separate provision exempts testing and evaluation from the Paperwork Reduction Act. Together these give the Center the ability to design, change and end models faster than a conventional rulemaking process allows."),
    blk('s2p3', "For a state, the practical consequence is that the terms of a federal model are largely the Center's to set and to change. A participating state can negotiate the agreement it signs, and Vermont did, but it cannot appeal to a court if the Center later revises the parameters of the model. This is the legal background to the point Chapter 3 makes about federal policy risk: a federal model is a permission the Center grants and can reshape, not a right the state holds."),
    warning('s2w1', "Do not confuse the two federal channels", "A CMMI model is tested under section 1115A and applies to Medicare, Medicaid and CHIP as the model specifies. A section 1115 waiver is a separate authority, covered in Track 3, that applies to Medicaid and CHIP. States often need both for a comprehensive reform, and they run on different timelines and under different budget tests."),

    h2('s3h1', 'The Expansion Test: What a Model Must Prove'),
    blk('s3p1', "A model that works in a test is not automatically allowed to spread. Subsection (c) lets the Secretary expand a model's duration and scope, including nationwide, only through rulemaking and only if three conditions are met. The Secretary must determine that expansion is expected to reduce spending without reducing the quality of care, or to improve quality without increasing spending. The Chief Actuary of CMS must certify that expansion would reduce, or at least not increase, net program spending. And the Secretary must determine that expansion would not deny or limit the coverage or provision of benefits."),
    blk('s3p2', "The actuarial certification is the demanding one. It is made by the Chief Actuary in CMS's Office of the Actuary, and it asks for a net result across the whole program, including the cost of running the model. A model can improve quality, delight participants and still fail to be expanded because the actuaries cannot certify that it saves money."),
    steps('s3st1', 'The three conditions for expanding a model', [
        ('Spending and quality', 'The Secretary determines that expansion is expected to reduce spending without reducing quality, or to improve quality without increasing spending.'),
        ('Actuarial certification', 'The CMS Chief Actuary certifies that expansion would reduce, or would not increase, net program spending.'),
        ('Coverage protection', 'The Secretary determines that expansion would not deny or limit coverage or the provision of benefits for the people the model affects.'),
    ]),

    h2('s4h1', 'The Record: Two Independent Scorecards'),
    blk('s4p1', "Two federal bodies have assessed how the Center has done. The Congressional Budget Office (CBO) published an analysis in September 2023 of the Center's first decade. It reviewed published evaluations of 49 models begun between 2011 and 2020 and compared the results with its own earlier projection. CBO estimated that the Center's activities increased direct federal spending by $5.4 billion over that decade. That is a net figure: the Center spent about $7.9 billion to run its models, including staff, infrastructure and evaluation, and the models reduced spending on benefits by about $2.6 billion. CBO had previously expected a net saving of about $2.8 billion, built on an expected $10.3 billion reduction in benefit spending. CBO also projected a further $1.3 billion increase in the second decade and cautioned that its estimates carry considerable uncertainty."),
    blk('s4p2', "The Government Accountability Office (GAO) took a different cut in March 2026, in report GAO-26-107953, titled CMS Innovation Center: Obligations and Model Testing Progress. GAO found that the Center obligated $11.4 billion from 2011 through 2024, and that it has tested or is testing 70 models, 24 of which were being tested as of January 2025. Of those 70, the Center has expanded four to nationwide implementation, and GAO reports that those four achieved net savings during their testing period."),
    blk('s4p3', "The two reports measure different things and should not be added together. CBO estimates the budget effect of the whole portfolio over a fixed decade; GAO counts models and obligations over a longer window. What they share is the pattern that matters for planning: most models are tested and then ended or reshaped, a small minority are expanded, and the aggregate budget effect has so far been a cost, not a saving."),
    stat_grid('s4sg1', [
        ('+$5.4B', 'Net federal spending increase, 2011-2020', 'CBO, September 2023: $7.9B operating cost less $2.6B reduced benefit spending'),
        ('70', 'Models tested or being tested', 'GAO-26-107953, March 2026; 24 active as of January 2025'),
        ('4 of 70', 'Models expanded nationwide', 'GAO-26-107953; the four achieved net savings during testing'),
        ('$11.4B', 'Obligated by the Center, 2011-2024', 'GAO-26-107953'),
    ]),
    highlight('s4hl1', "Read the record as a base rate. When the Center announces a new model, the historical odds that it will be expanded nationwide are four in seventy. That is not a reason to ignore models; it is a reason to ask what is different about this one before building a state strategy on it."),

    h2('s5h1', 'What Separates the Models That Work'),
    blk('s5p1', "Chapter 3 does not stop at the discouraging totals. It identifies four design characteristics that distinguish stronger models from weaker ones, drawing on the evaluation literature and CMS documentation. The first is mandatory or near-mandatory participation: when high-cost, high-volume providers cannot opt out, the model's financial logic reaches the whole population, whereas voluntary models let the actors who benefit most from the status quo stay out. The second is two-sided risk that is real, with enough downside to change behavior. The third is adequate implementation support, including technical assistance and runway before accountability begins. The fourth is alignment with the state's own regulatory environment."),
    table('s5t1', 'Four design characteristics (HTR Figure 3.1)', [
        {'Characteristic': 'Mandatory or near-mandatory participation', 'Stronger_examples': 'Maryland All-Payer Model; Vermont Act 68', 'Weaker_examples': 'Most voluntary ACO models; MSSP Track 1; most demonstrations'},
        {'Characteristic': 'Two-sided risk that is real', 'Stronger_examples': 'ACO REACH; hospital global budgets; AHEAD', 'Weaker_examples': 'MSSP Track 1 (upside only); Primary Care First'},
        {'Characteristic': 'Adequate implementation support', 'Stronger_examples': 'AHEAD pre-performance period and cooperative agreement funds; Making Care Primary support', 'Weaker_examples': 'Early models launched without operational support'},
        {'Characteristic': 'Alignment with state regulation', 'Stronger_examples': 'AHEAD federal-state partnership; Maryland total cost of care built on HSCRC authority', 'Weaker_examples': 'Models imposed without coordination with Medicaid, insurance and hospital-budget regulators'},
    ]),
    blk('s5p2', "These four characteristics are a practical checklist. Given any new model announcement, a policy team can score it against them in an afternoon. A voluntary, one-sided, unsupported model that duplicates a state process is a poor foundation for a transformation strategy, however attractive its headline funding. A mandatory, two-sided, supported model co-designed with the state regulator is a different proposition, and the rest of this course looks at the models and waivers that come closest to that description."),
    example('s5ex1', 'Vermont and the AHEAD model, 2025-2026', "Vermont signed for AHEAD Cohort 2 in January 2025. The agreement it negotiated gave it rights to withdraw: before launch with 30 days' notice, after launch with six months' notice, and it contained provisions protecting the Green Mountain Care Board's regulatory independence and setting out methodology acceptance and dispute resolution.\nIn July 2026, after CMS cut the expected EAST Fund from an estimated $138 million in the first performance year to a cap of about $10 million, Vermont withdrew. Chapter 3 treats the episode as evidence of the risk a voluntary federal model carries, and as a reason for the state to keep independent statutory authority, which Vermont has in Act 68 of 2025."),

    h2('s6h1', 'What a State Should Take From This'),
    blk('s6p1', "Three working rules follow. First, treat a federal model as an accelerator for a state-designed reform, not as the reform. Vermont's Act 68 gives the state statutory authority over hospital global budgets that does not depend on any CMS model continuing, which is what made withdrawal from AHEAD survivable. Second, negotiate the exits as carefully as the entrances: withdrawal rights, notice periods, methodology acceptance and dispute resolution are the clauses that matter when a federal parameter changes. Third, build the evidence base early. States with a strong all-payer claims database enter model and waiver negotiations with a stronger hand."),
    blk('s6p2', "The next lesson turns from the Center's authority and record to its current portfolio, the models that are live or recently ended in 2026, and what each means for a state or a provider organization."),

    takeaway('tw', [
        "The Innovation Center was created by section 1115A of the Social Security Act, added by section 3021 of the Affordable Care Act, to test payment and delivery models that reduce spending while preserving or improving quality.",
        "Section 1115A lets the Secretary waive specified Medicare, Medicaid and CHIP requirements for testing, and limits administrative and judicial review of model selection, parameters, termination and expansion.",
        "A model can be expanded only through rulemaking, after the Secretary's spending-and-quality determination, the Chief Actuary's certification of no net spending increase, and a finding that coverage is not reduced.",
        "CBO estimated in September 2023 that the Center increased net federal spending by $5.4 billion from 2011 to 2020: $7.9 billion in operating cost less $2.6 billion in reduced benefit spending.",
        "GAO reported in March 2026 that the Center has tested or is testing 70 models, has obligated $11.4 billion from 2011 through 2024, and has expanded four models nationwide.",
        "Chapter 3's four success characteristics are mandatory participation, real two-sided risk, adequate implementation support, and alignment with the state's regulatory environment.",
        "Vermont signed for AHEAD in January 2025 with withdrawal rights and withdrew in July 2026 after CMS cut the expected EAST Fund; Act 68 gives the state authority that does not depend on the model.",
    ]),
    quiz('qz',
        "Under section 1115A, which of the following must be true before the Secretary can expand a CMMI model nationwide?",
        [
            ("The model has been tested in at least ten states", False),
            ("The CMS Chief Actuary certifies that expansion would reduce, or not increase, net program spending", True),
            ("Congress passes a new law approving the specific model", False),
            ("A federal court reviews the model's evaluation results", False),
        ],
        "Section 1115A(c) requires rulemaking plus three conditions: the Secretary's determination on spending and quality, the Chief Actuary's certification that net program spending would fall or at least not rise, and the Secretary's determination that coverage and benefits would not be limited. There is no minimum number of test states, no requirement for a new act of Congress, and the statute bars administrative and judicial review of expansion determinations."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.2.1, Figure 3.1 (success characteristics) and §3.5.1 (Vermont's AHEAD agreement, withdrawal rights and July 2026 withdrawal)"),
    blk('src2', "[2] Social Security Act §1115A, 42 U.S.C. 1315a (Center for Medicare and Medicaid Innovation) — https://www.law.cornell.edu/uscode/text/42/1315a — models, waiver authority, limits on review, expansion conditions and appropriations"),
    blk('src3', "[3] Congressional Budget Office, Federal Budgetary Effects of the Activities of the Center for Medicare & Medicaid Innovation (September 2023) — https://www.cbo.gov/system/files/2023-09/59274-CMMI.pdf — $5.4 billion net increase, 2011-2020; 49 models reviewed"),
    blk('src4', "[4] U.S. Government Accountability Office, CMS Innovation Center: Obligations and Model Testing Progress, GAO-26-107953 (March 27, 2026) — https://www.gao.gov/products/gao-26-107953 — 70 models, four expanded nationwide, $11.4 billion obligated 2011-2024"),
    blk('src5', "[5] CMS Office of the Actuary, CMMI Model Certifications — https://www.cms.gov/data-research/research/actuarial-studies/cmmi-model-certifications — the Chief Actuary's certifications for expansion"),
]

# ════════════════════════════════════════════════════════════════════════════
# Lesson 2 facts verified 2026-11-23: CMS fact sheet of Mar 12, 2025 (models ended early); CMS AHEAD, TEAM and
# BALANCE pages; CMS LEAD Model Overview (PDF); KFF BALANCE brief. Vermont facts: HTR book Chapter 3 §3.2.2.
L2_SLUG = 'cmmi-2026-model-landscape'
L2_TITLE = 'The 2026 Model Landscape: What Is Live, What Ended, What Is Next'
L2 = [
    blk('intro1', "The Innovation Center's portfolio changes faster than most state strategies can. In March 2025 the Center announced that it would end four models early. In September 2025 it changed the timetable for its flagship state model. In December 2025 it announced a ten-year successor to its main accountable care organization model and launched a drug-access model. Anyone relying on a list of models that is more than a year old is likely to be wrong about at least one of them."),
    blk('intro2', "This lesson maps the portfolio as it stood in late 2026, organized by what each model asks of a participant rather than by announcement date. It is built from the Center's own pages and fact sheets, with Chapter 3's Figure 3.2 as the Vermont lens. Because the portfolio moves, the lesson also ends with a routine for checking the current status of any model."),
    blk('intro3', "The point is not to memorize the list. It is to be able to place any model, new or old, into one of four families and to know what questions that family usually raises."),

    h2('s1h1', 'A Portfolio That Was Cut Back in 2025'),
    blk('s1p1', "On March 12, 2025, CMS published a fact sheet titled as an announcement of model portfolio changes to protect taxpayers. It listed four models identified to end early: Maryland Total Cost of Care (original period 2019 to 2026), Primary Care First (2021 to 2026), ESRD Treatment Choices (2021 to 2027, to be ended through rulemaking) and Making Care Primary (2024 to 2034). The Center stated that it aimed to end them by December 31, 2025. It also said it would reduce or change the Integrated Care for Kids model and dropped two models before implementation."),
    blk('s1p2', "Chapter 3 records the practical result for Making Care Primary: a multi-payer primary care model launched in 2024 in eight states was ended early, after launching in 2024 as a ten-year model. Bundled Payments for Care Improvement Advanced, the voluntary episode model, also ended on December 31, 2025. These endings are the clearest recent evidence for the point made in Lesson 1: a model is a permission the Center can shorten, and a participant's multi-year investment plan can end on the Center's timetable."),
    warning('s1w1', "Check before citing an older source", "Earlier editions of many health policy guides, and some of this book's own figure captions, describe Maryland's Total Cost of Care model as the long-running benchmark. It was scheduled to end early. Maryland now participates in AHEAD as its Cohort 1 state. Always confirm a model's current status on the CMS page before relying on a secondary source."),

    h2('s2h1', 'Family One: State Total-Cost-of-Care Models (AHEAD)'),
    blk('s2p1', "AHEAD, the Achieving Healthcare Efficiency through Accountable Design model, is the Innovation Center's state-level model. The CMS model page lists five state participants in three cohorts: Maryland in Cohort 1, Connecticut and Hawaii in Cohort 2, and Rhode Island and New York in Cohort 3. The model runs through December 31, 2035. CMS describes it as building on earlier state-based models, naming the Vermont All-Payer ACO Model and the Maryland Total Cost of Care Model."),
    blk('s2p2', "AHEAD has three working parts. Hospital global budgets give hospitals a predictable amount of revenue for the coming year. Primary care AHEAD provides a prospective, risk-adjusted enhanced primary care payment with four pathways. And the state itself is accountable for meeting total cost of care and quality targets across its population. That state-level accountability is what separates AHEAD from the provider-level models below it."),
    blk('s2p3', "On September 3, 2025, CMS announced changes that apply across all cohorts from January 2026, including a later start: the performance period for Cohorts 2 and 3 now begins January 1, 2028. Vermont had signed for Cohort 2 in January 2025 and, according to Chapter 3, withdrew in July 2026 after CMS reduced the expected EAST Fund from an estimated $138 million in the first performance year to a cap of about $10 million. Vermont is therefore not among the five states the CMS page lists."),
    callout('s2c1', "AHEAD is the only model in the portfolio that holds a whole state accountable for total cost of care. That is why it matters for state reform, and why its terms are negotiated state by state."),

    h2('s3h1', 'Family Two: Accountable Care Organization Models'),
    blk('s3p1', "ACO models hold a group of providers accountable for the cost and quality of care for an attributed population of Medicare beneficiaries. The Center's ACO REACH model, the successor to Direct Contracting, carries mandatory two-sided risk and an equity focus, and runs through its final performance year, 2026."),
    blk('s3p2', "Its successor, the Long-term Enhanced ACO Design (LEAD) model, was announced on December 18, 2025. The CMS overview describes LEAD as a ten-year voluntary ACO model beginning January 1, 2027, with a ten-year performance period without rebasing, which CMS calls the longest ever tested by the Innovation Center. It offers Primary Care and Total Care Capitation, and Professional and Global risk-sharing options: the Professional option shares up to 50 percent of savings and losses, the Global option up to 100 percent. It adds options for ACOs to contract with specialists through episode-based risk arrangements, Part B cost-sharing support, and a Part D premium buy-down planned by 2029. LEAD is open to organizations new to ACOs, to current REACH participants, and to ACOs serving high-needs and dually eligible patients."),
    blk('s3p3', "The long performance period without rebasing is the design feature to watch. Frequent rebasing of benchmarks, CMS argues, penalizes ACOs that succeed. A ten-year fixed track gives participants time to recover an investment, which speaks directly to the implementation-runway characteristic from Lesson 1. It also locks both sides into a long commitment under a federal model the Center may still reshape."),

    h2('s4h1', 'Family Three: Episode-Based Models (TEAM)'),
    blk('s4p1', "Episode models pay for a defined clinical event and everything around it. TEAM, the Transforming Episode Accountability Model, began on January 1, 2026 and runs for five performance years through December 31, 2030. CMS states plainly that TEAM is a mandatory model: acute care hospitals in selected core-based statistical areas must participate. The episodes run from surgery through 30 days after the hospital stay and cover lower extremity joint replacement, surgical hip and femur fracture treatment, spinal fusion, coronary artery bypass graft, and major bowel procedures."),
    blk('s4p2', "TEAM replaced the voluntary Bundled Payments for Care Improvement Advanced model. It is a clear example of the first design characteristic from Lesson 1: mandatory participation. Hospitals cannot opt out of the financial logic if they are in a selected area, which is why it generates strong reactions. Hospitals in Maryland are exempt from mandatory participation, as are Indian Health Service and tribal hospitals, according to CMS-linked coverage of the model."),

    h2('s5h1', 'Family Four: Drug-Access Models (BALANCE)'),
    blk('s5p1', "A fourth family has appeared: models that use Innovation Center authority to negotiate with manufacturers on behalf of public programs. BALANCE, announced in December 2025, is a voluntary model in which CMS negotiates GLP-1 obesity-drug prices with manufacturers for state Medicaid programs and Medicare Part D plans, with coverage tied to lifestyle supports. The Medicaid side could begin as early as May 2026, with states joining on a rolling basis."),
    blk('s5p2', "The Medicare side has been less stable. On April 21, 2026, CMS announced that it would delay the Part D portion of BALANCE and extend the Medicare GLP-1 Bridge demonstration through December 31, 2027, without giving a new Part D start date. The Bridge allows eligible beneficiaries to obtain covered GLP-1 drugs for $50 a month outside the Part D benefit. For a state Medicaid agency, BALANCE is a clear case of a model whose terms depend on third-party participation, here manufacturers and Part D sponsors, that the state cannot control."),

    table('s5t1', 'The late-2026 portfolio by family', [
        {'Family': 'State total cost of care', 'Model': 'AHEAD', 'Status_and_participation': 'Five states; runs through Dec 31, 2035; Cohorts 2 and 3 performance period begins Jan 1, 2028'},
        {'Family': 'ACO', 'Model': 'ACO REACH, then LEAD', 'Status_and_participation': 'REACH final year 2026; LEAD voluntary, ten years from Jan 1, 2027'},
        {'Family': 'Episode', 'Model': 'TEAM', 'Status_and_participation': 'Mandatory in selected areas; Jan 1, 2026 to Dec 31, 2030'},
        {'Family': 'Drug access', 'Model': 'BALANCE', 'Status_and_participation': 'Voluntary; Medicaid from May 2026; Part D portion delayed; Bridge through Dec 31, 2027'},
        {'Family': 'Ended early (2025)', 'Model': 'Maryland TCOC, Primary Care First, Making Care Primary, ESRD Treatment Choices, BPCI-A', 'Status_and_participation': 'CMS aimed to end the first four by Dec 31, 2025; BPCI-A ended Dec 31, 2025'},
    ]),

    h2('s6h1', 'A Routine for Staying Current'),
    blk('s6p1', "Because the portfolio moves, a standing routine matters more than any snapshot. The CMS Innovation Center publishes every model on its own page, and each page states the current performance period, participants and any amendments. Checking those pages monthly, and the Federal Register for related rulemaking, is the minimum. Chapter 3's policy monitoring framework, which Track 5 covers, builds this into a four-function routine."),
    steps('s6st1', 'Placing a new model announcement', [
        ('Name the family', 'Is it state-level, ACO, episode or drug access? The family tells you who carries the risk.'),
        ('Score the four characteristics', 'Mandatory or voluntary, real two-sided risk, implementation support, and alignment with state regulation.'),
        ('Read the end date and the exit clauses', 'Check the performance period and what the participant can do if the Center changes parameters.'),
        ('Ask who else must participate', 'Models that depend on manufacturers, plans or other states can stall for reasons the participant cannot control.'),
    ]),

    takeaway('tw', [
        "On March 12, 2025 CMS announced that Maryland Total Cost of Care, Primary Care First, ESRD Treatment Choices and Making Care Primary would end early, aiming for December 31, 2025.",
        "AHEAD has five state participants in three cohorts, runs through December 31, 2035, and its Cohort 2 and 3 performance period begins January 1, 2028.",
        "Vermont signed for AHEAD Cohort 2 in January 2025 and withdrew in July 2026 after CMS reduced the expected EAST Fund, according to Chapter 3.",
        "LEAD is a ten-year voluntary ACO model starting January 1, 2027, with a ten-year performance period without rebasing and Professional and Global risk options.",
        "TEAM is a mandatory five-year episode model running January 1, 2026 to December 31, 2030 for hospitals in selected areas.",
        "BALANCE is a voluntary GLP-1 model; CMS delayed its Part D portion on April 21, 2026 and extended the Medicare GLP-1 Bridge through December 31, 2027.",
        "Place any new model in one of four families, score it on the four design characteristics, and read its end date and exit clauses before building a strategy on it.",
    ]),
    quiz('qz',
        "Which statement about TEAM, the Transforming Episode Accountability Model, is correct according to CMS?",
        [
            ("It is a voluntary model for any hospital that wishes to join", False),
            ("It is a mandatory five-year model, starting January 1, 2026, for hospitals in selected core-based statistical areas", True),
            ("It is a state-level total cost of care model that replaced AHEAD", False),
            ("It ended on December 31, 2025 along with Making Care Primary", False),
        ],
        "CMS states that TEAM is a mandatory model running for five performance years from January 1, 2026 to December 31, 2030 in selected core-based statistical areas. It covers five surgical episodes and replaced the voluntary BPCI Advanced model, which ended December 31, 2025."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.2.2 and Figure 3.2: the model landscape, Vermont's AHEAD signing and July 2026 withdrawal, MCP, BPCI-A and TEAM"),
    blk('src2', "[2] CMS, Innovation Center Announces Model Portfolio Changes (fact sheet, March 12, 2025) — https://www.cms.gov/newsroom/fact-sheets/cms-innovation-center-announces-model-portfolio-changes-better-protect-taxpayers-help-americans-live — models identified to end early"),
    blk('src3', "[3] CMS, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — five state participants, cohorts, September 3, 2025 changes, run through December 31, 2035"),
    blk('src4', "[4] CMS, LEAD Model Overview — https://www.cms.gov/priorities/innovation/files/lead-model-overview.pdf — ten-year voluntary ACO model beginning January 1, 2027; risk options; eligibility"),
    blk('src5', "[5] CMS, Transforming Episode Accountability Model (TEAM) — https://www.cms.gov/priorities/innovation/innovation-models/team-model — mandatory; five performance years January 1, 2026 to December 31, 2030; five surgical episodes"),
    blk('src6', "[6] KFF, What to Know About the BALANCE Model for GLP-1s in Medicare and Medicaid and the Medicare GLP-1 Bridge — https://www.kff.org/medicare/issue-brief/what-to-know-about-the-balance-model-for-glp-1s-in-medicare-and-medicaid/ — Part D delay of April 21, 2026 and Bridge extension; CMS BALANCE page — https://www.cms.gov/priorities/innovation/innovation-models/balance"),
]

LESSONS = [(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2)]
if __name__ == '__main__':
    run(LESSONS)
