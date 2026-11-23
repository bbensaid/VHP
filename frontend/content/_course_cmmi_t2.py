exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_cmmi_common.py').read())

# Track 2 — State Models: Global Budgets, AHEAD and Episodes
# Lesson 4 facts verified 2026-11-23 by search of CMS AHEAD overview/FAQ material (fall 2025), RTI and Health Affairs
# summaries of the Maryland All-Payer Model, and HTR book Chapter 3 §3.2-3.5, §3.9.

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'cmmi-global-budgets-maryland-to-ahead'
L4_TITLE = 'Hospital Global Budgets: From Maryland to AHEAD'
L4 = [
    blk('intro1', "A hospital global budget replaces payment per admission or per visit with a predictable annual revenue amount. The hospital keeps what it does not spend by keeping people healthy and out of the hospital, and it absorbs the cost of volume it cannot justify. The idea is simple to state and hard to run, and one state has been running it for more than a decade."),
    blk('intro2', "This lesson follows the idea from Maryland, where it was proven in practice, to AHEAD, where the Innovation Center tries to extend it to other states, and then to Vermont's Act 68, which makes hospital global budgets state law. It explains how the budget works, what the Maryland evidence does and does not show, and what changed in AHEAD's design in 2025."),
    blk('intro3', "Chapter 3 treats Maryland as the clearest example of the first success characteristic, near-mandatory participation, and treats AHEAD as the federal vehicle meant to carry that logic to other states."),

    h2('s1h1', 'How a Global Budget Works'),
    blk('s1p1', "Under fee-for-service payment, a hospital's revenue rises with every admission, test and procedure. A global budget fixes the hospital's expected revenue for the coming year, usually set from historical revenue adjusted for population change, quality, and agreed policy factors, and pays it in regular installments. CMS describes it in the AHEAD material as giving hospitals a predictable amount of revenue for the upcoming year."),
    blk('s1p2', "The incentive flips. A hospital that treats fewer avoidable cases does not lose revenue, so it can invest in prevention, primary care and care coordination. A hospital that grows volume without a justified population reason does not gain revenue. Because the budget is fixed in advance, finance leaders can plan, and because it is set against a defined population, it ties the hospital to the health of the community rather than the throughput of its beds."),
    blk('s1p3', "The design carries its own risks, which later lessons return to. If the budget is set from a base that already embeds inefficiency, the hospital is paid for it. If the risk adjustment misses how sick the attributed population really is, the budget will understate need and the hospital will absorb the difference. Chapter 3 states this directly for Vermont: documentation of the population's risk drives the benchmark, and a hospital with incomplete documentation will be held accountable for costs the benchmark does not reflect."),
    callout('s1c1', "A global budget is a prospective, population-based revenue amount for a hospital. It rewards keeping people well and penalizes unjustified volume, which is why its benchmark and risk adjustment are where the financial stakes sit."),

    h2('s2h1', 'Maryland: The Proof of Concept'),
    blk('s2p1', "Maryland's hospitals have been paid under an all-payer rate-setting system administered by the state's Health Services Cost Review Commission since the 1970s, in which all payers pay the same hospital rates. In 2014 the state and CMS added hospital-specific global budgets on top of that system in the Maryland All-Payer Model. In 2019 the arrangement was extended into the Total Cost of Care Model, which encouraged hospitals to use savings under the global budget to fund incentives for non-hospital providers."),
    blk('s2p2', "The evidence is favorable but not unanimous. RTI's evaluation for CMS found aggregate Medicare hospital savings of $554 million over the first three years of global budgets, 2014 to 2016, and $679 million in total Medicare savings, about 3 percent of baseline spending. A Health Affairs commentary put the savings over the four and a half years to mid-2018 at nearly $1 billion on a risk-adjusted basis. CMS's first report on the Total Cost of Care Model concluded that Maryland reduced total spending relative to national trends by $365 million in 2019. Not every study agrees: one study found no effect of global budgets on use, and the Milbank Memorial Fund reported modest quality effects and mixed results on readmissions."),
    blk('s2p3', "Two readings are both reasonable. Maryland is the strongest case in the country that mandatory, all-payer hospital budgeting can slow spending growth without destabilizing hospitals. It is also a state with a long-established regulatory authority that most other states do not have, which is why its model is hard to copy. Chapter 3 credits the Maryland model with the alignment characteristic precisely because it was built on the state's existing authority."),
    example('s2ex1', 'Maryland All-Payer Model, 2014-2018', "The model replaced fee-for-service hospital payment with hospital-specific global budgets inside Maryland's all-payer system. RTI found $554 million in aggregate Medicare hospital savings over the first three years and $679 million in total Medicare savings.\nIts limits are as instructive as its results: the evidence on utilization and quality is mixed, and Maryland's regulatory authority is unusual, so the lesson for other states is to build on what authority they have rather than assume Maryland's can be copied."),

    h2('s3h1', 'AHEAD: Taking the Idea to Other States'),
    blk('s3p1', "AHEAD asks each participating state to do something Maryland did over decades, on a shorter timetable and with federal participation. CMS's fall 2025 overview of the model describes three linked components for Cohort 2 and 3 states: Medicare fee-for-service hospital global budgets, Primary Care AHEAD, and a state Medicaid advanced primary care program. A new geographic ACO component, Geo AHEAD, is added from 2028 for Medicare beneficiaries in AHEAD regions not aligned with other CMS value-based programs."),
    blk('s3p2', "The state, not the hospital, is the accountable party. Targets apply to the whole state or a defined sub-state region regardless of how many hospitals take part in a global budget, and are written into the State Agreement between the state and CMS. They include Medicare fee-for-service and all-payer total cost of care growth and primary care investment goals. States must also bring Medicaid in as an aligned payer in hospital global budgets and primary care, and from 2029 at least one commercial payer in each state is to implement a commercial hospital global budget methodology."),
    blk('s3p3', "In September 2025 CMS changed the model. It moved the performance period for Cohorts 2 and 3 back a year, to January 1, 2028 through December 31, 2035, to give states more time for planning and for securing the legislative authority they need. It removed the option for states with their own hospital rate-setting authority to design their own Medicare fee-for-service global budget methodology, with Maryland the exception: it keeps its methodology for 2026 and 2027 and moves to the AHEAD methodology in 2028. It also said it would provide cooperative agreement funding for state planning activities."),
    compare('s3cmp1', 'Maryland model versus AHEAD',
        'Maryland (2014 onward)', [
            'Built on an existing, decades-old all-payer rate-setting authority',
            'Hospital global budgets inside a state-run system',
            'Mandatory for Maryland hospitals',
        ],
        'AHEAD (Cohorts 2 and 3, from 2028)', [
            'State negotiates a State Agreement with CMS and builds the authority it needs',
            'CMS-designed Medicare fee-for-service global budget methodology',
            'State accountable for targets whatever the hospital participation level',
        ]),

    h2('s3h2', 'What a State Needs Before It Can Run Global Budgets'),
    blk('s3b1', "Reading the Maryland and AHEAD material side by side suggests a short list of prerequisites. A state needs legal authority over hospital budgets or rates, since a federal model cannot supply what state law does not. It needs a data foundation, ideally an all-payer claims database, to set a credible baseline and to measure total cost of care. It needs a risk adjustment method that its hospitals and regulators accept. It needs payers beyond Medicare to take part, because AHEAD expects Medicaid alignment and, from 2029, at least one commercial payer. And it needs an analytics capability that can show each hospital its budget performance during the year, not after it."),
    blk('s3b2', "Chapter 3's Beyond Vermont box makes the data point explicitly: a state without an all-payer claims database enters the budget-neutrality negotiation with a weaker evidentiary position, not a different negotiation. That is one reason the book places the Technology pillar before the Economics pillar in the five-pillar sequence. Chapter 3 applies the same logic to Vermont's own plan, warning that the global budget timeline must account for the gap between the Act 68 performance start and the deployment of the analytics vendor, which it says should be treated as a critical-path decision with a hard deadline."),
    steps('s3st1', 'Prerequisites checklist for hospital global budgets', [
        ('Authority', 'State law or regulation giving a regulator power over hospital budgets or rates.'),
        ('Data', 'An all-payer claims database and a baseline that CMS and hospitals accept.'),
        ('Risk adjustment', 'A method that reflects the attributed population\'s documented risk.'),
        ('Payer alignment', 'Medicaid in from the start; commercial payers by the model timetable.'),
        ('Analytics', 'In-year reporting so hospitals can manage to the budget before the year ends.'),
    ]),

    h2('s4h1', "Vermont's Act 68: Global Budgets in State Law"),
    blk('s4p1', "Vermont's route is different from AHEAD's, and the difference is the point of Chapter 3's argument about independent authority. Act 68 of 2025 requires prospective hospital global budgets under the Green Mountain Care Board: one or more hospitals from hospital fiscal year 2028 and all by fiscal year 2030, to the extent resources are available. The state's authority does not rest on a federal model."),
    blk('s4p2', "That structure is what let Vermont stay on its path after leaving AHEAD. The signed model gave the state rights to withdraw, and when CMS cut the expected EAST Fund from an estimated $138 million in the first performance year to a cap of about $10 million, Vermont used them in July 2026. The state's global budget law remained."),
    blk('s4p3', "Chapter 3 draws a practical lesson for hospital executives: begin the work that determines the benchmark now. Act 68 does not specify a risk adjustment method, and the Board's methodology is still being designed. If it adjusts for population risk, as most budget models do, the benchmark will reflect the attributed population's documented risk, so Chapter 3 advises starting hierarchical condition category documentation gap closure well before the performance start."),
    warning('s4w1', "State authority and federal permission are different things", "A state can legislate global budgets for its hospitals, but applying them to Medicare and Medicaid payments needs federal approval, through a model such as AHEAD or a waiver. Chapter 3 records that Vermont's Medicaid global budget, launched in January 2026 on state rather than AHEAD authority, drew a July 2026 CMS notice that it had not been approved under the Global Commitment demonstration's terms and that payments should stop. Track 3 returns to this case."),

    takeaway('tw', [
        "A hospital global budget is a prospective annual revenue amount tied to a population, which rewards avoided care and penalizes unjustified volume.",
        "Maryland has used all-payer hospital rate setting since the 1970s, added hospital global budgets in 2014 and extended to the Total Cost of Care Model in 2019.",
        "RTI found $554 million in Medicare hospital savings in Maryland's first three global-budget years and $679 million in total Medicare savings; other studies found weaker or mixed effects on use and quality.",
        "AHEAD makes the state accountable for total cost of care and primary care investment targets across the state or sub-state region, set out in the State Agreement.",
        "In September 2025 CMS moved the Cohort 2 and 3 performance period to January 1, 2028 through December 31, 2035 and removed state-designed Medicare fee-for-service global budget methodologies, except Maryland's through 2027.",
        "Vermont's Act 68 requires hospital global budgets from fiscal year 2028 (one or more hospitals) and for all hospitals by fiscal year 2030, to the extent resources are available.",
        "Because the benchmark reflects documented population risk, hospitals should begin documentation gap closure before the performance period starts.",
    ]),
    quiz('qz',
        "What distinguishes AHEAD's accountability structure from a hospital-only global budget program?",
        [
            ("Only hospitals, not the state, are accountable for total cost of care targets", False),
            ("The state is accountable for total cost of care and primary care investment targets across the state or region, regardless of hospital participation level", True),
            ("Participation is mandatory for every hospital in the country", False),
            ("It applies only to commercial insurance", False),
        ],
        "In AHEAD, targets apply to the entire state or sub-state region and are set in the State Agreement between the state and CMS, whatever the level of hospital participation. That is what separates it from provider-level models, and it is why states need legislative and regulatory authority to deliver it."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.2.2, §3.5.1, §3.9: Maryland, AHEAD, Vermont's Act 68 global budgets and the July 2026 withdrawal and compliance notice"),
    blk('src2', "[2] CMS, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — cohorts, September 3, 2025 changes"),
    blk('src3', "[3] CMS, AHEAD Overview, fall 2025 slides and transcript — https://www.cms.gov/priorities/innovation/files/ahead-overview-fall2025-slides.pdf — Cohort 2 and 3 components, targets, Medicaid and commercial alignment, Geo AHEAD"),
    blk('src4', "[4] CMS, AHEAD Model Frequently Asked Questions — https://www.cms.gov/priorities/innovation/ahead/faqs"),
    blk('src5', "[5] RTI International, New Hospital Payment Model Reduces Costs for Medicare Beneficiaries in Maryland — https://rti.org/news/new-hospital-payment-model-reduces-costs-medicare-beneficiaries-maryland — $554 million and $679 million findings"),
    blk('src6', "[6] Milbank Memorial Fund, Uniquely Similar: New Results from Maryland's All-Payer Model and Paths Forward for Value-Based Care — https://www.milbank.org/publications/uniquely-similar-new-results-from-marylands-all-payer-model-and-paths-forward-for-value-based-care/"),
    blk('src7', "[7] Health Affairs Forefront, Another Look at the Evidence on Hospital Global Budgets in Maryland — https://www.healthaffairs.org/content/forefront/another-look-evidence-hospital-global-budgets-maryland-have-they-reduced-expenditures"),
]

# ════════════════════════════════════════════════════════════════════════════
# Lesson 5 facts: HTR book Chapter 3 §3.2.2, §3.5.1; AHS announcement of July 24, 2026 as published by VermontBiz;
# WCAX report of July 28, 2026; CMS AHEAD page and FAQ. The state press release URL returned 403 to the fetch tool,
# so the dollar figures below are the book's (EAST Fund ~$138M to ~$10M) and are labelled as such.
L5_SLUG = 'cmmi-vermont-ahead-agreement'
L5_TITLE = "Vermont and AHEAD: Reading a State Agreement and a Withdrawal"
L5 = [
    blk('intro1', "Vermont's AHEAD story is the most useful case study in this course because it contains every stage a state goes through with a federal model: attraction, negotiation, signature, a change in federal terms, and exit. It also shows how two honest accounts of the same event can differ, which is a skill in itself for anyone who works in policy."),
    blk('intro2', "This lesson sets out what Vermont signed, what the agreement was designed to protect, what changed in 2025 and 2026, how the state announced its decision, and what the episode teaches other states. It relies on Chapter 3's account of the agreement and on the state's own announcement as reported in the press. It separates what each source says, and it notes where a number appears in only one place."),
    blk('intro3', "The aim is not to judge Vermont's decision. It is to show how a practitioner reads a federal agreement before signing it and reads the federal documents that follow it."),

    h2('s1h1', 'A Timeline in Four Moves'),
    blk('s1p1', "Vermont pursued AHEAD as the successor to its All-Payer ACO Model, which was due to end in 2024 and which CMS itself describes as one of the state-based models AHEAD builds on. According to Chapter 3, the state signed for Cohort 2 in January 2025 under a State Agreement it had negotiated with CMS."),
    blk('s1p2', "On September 3, 2025, CMS changed the model for all states. The performance period for Cohorts 2 and 3 moved back a year to begin January 1, 2028, and states with their own hospital rate-setting authority lost the option to design their own Medicare fee-for-service global budget methodology, with Maryland the exception. These changes brought states into alignment with one federal design, which Vermont later cited."),
    blk('s1p3', "On July 24, 2026, the Agency of Human Services announced that Vermont had formally notified CMS that it was withdrawing from AHEAD. Its stated reason, as published, was that new policy and operational guidance to bring Vermont in line with other AHEAD states substantially reduced anticipated funding that was to be reinvested in providers such as primary care practices."),
    blk('s1p4', "Chapter 3 puts a number on that reduction: the expected EAST Fund fell from an estimated $138 million in the first performance year to a cap of about $10 million. That figure comes from the book; the published accounts of the announcement describe the reduction without giving dollar amounts, so treat the figure as the book's, to be checked against the signed agreement and CMS documents when they are public."),
    table('s1t1', 'The timeline', [
        {'Date': 'January 2025', 'Event': 'Vermont signs for AHEAD Cohort 2 (HTR book, Chapter 3)'},
        {'Date': 'September 3, 2025', 'Event': 'CMS changes AHEAD: Cohort 2 and 3 performance starts January 1, 2028; state-designed Medicare FFS global budget methodology removed'},
        {'Date': 'January 2026', 'Event': 'Vermont launches a Medicaid hospital global budget on state authority (HTR book, Chapter 3)'},
        {'Date': 'July 2026', 'Event': 'CMS notifies Vermont that the Medicaid global budget was not approved under the Global Commitment demonstration terms'},
        {'Date': 'July 24, 2026', 'Event': 'AHS announces withdrawal from AHEAD after anticipated funding is reduced'},
    ]),

    h2('s2h1', 'What the Agreement Was Built to Protect'),
    blk('s2p1', "Chapter 3 calls Vermont's AHEAD State Agreement an example of sophisticated federal policy risk management, and lists what it contains. The state could withdraw unilaterally, with 30 days' notice before launch and six months' notice after launch. The agreement protected the independence of the Green Mountain Care Board, Vermont's hospital budget regulator. It set out provisions on methodology acceptance, meaning what the state agrees to accept as the baseline calculation, and on dispute resolution."),
    blk('s2p2', "Vermont negotiated these protections for a reason that Chapter 3 states plainly: an eight-year commitment to a federal model carries real policy risk. The model could change under a future administration, the methodology could produce unexpected financial outcomes, or a federal change could make participation financially unsustainable. All three risks were named in advance, and the withdrawal clause was the state's answer to them."),
    blk('s2p3', "The clause did its job. Because section 1115A bars administrative and judicial review of most model decisions, as Lesson 1 showed, the contract was the state's only protection against a change in terms. Vermont did not need to litigate. It gave notice and left, and the state's own statements say the decision did not increase costs for Vermonters or reduce their access to services."),
    callout('s2c1', "Notice rights, regulatory independence, methodology acceptance and dispute resolution are the clauses that matter when a federal model changes. Vermont negotiated all four before signing, which is why exit was an option and not a crisis."),

    h2('s3h1', 'Two Accounts of the Same Event'),
    blk('s3p1', "The state's account is that the federal terms changed in a way that reduced the funding on which its plan depended. Agency of Human Services Secretary Jenney Samuelson said the decision was not made lightly. Medicaid and Health Systems Director Jill Mazza Olson said the state remained optimistic about future opportunities to partner with the federal government on innovative models. Green Mountain Care Board Chair Owen Foster supported the withdrawal, saying that nothing changes for hospitals or providers because the state never began the model and that the last thing Vermont needs is additional administrative cost."),
    blk('s3p2', "Later reporting on a CMS advisory committee meeting, as summarized in search coverage, describes the same decision from the federal side: CMS officials said the Innovation Center revised Vermont-specific financial terms, reducing a baseline credit and funding named PATH, and described the discussions as mutual. That reporting was not available in primary form, so this lesson treats it as an indication that CMS frames the event differently, not as a finding."),
    blk('s3p3', "Reading two accounts side by side is a discipline worth practicing. Neither contradicts the other on the central facts: the terms changed, the funding fell, Vermont left. They differ on responsibility and on how to describe it, which is normal when each party has to explain its decision to its own audience."),
    warning('s3w1', "When sources give no number, do not supply one", "The published accounts of Vermont's announcement do not state the dollar amounts of the funding change. Chapter 3 gives $138 million falling to about $10 million for the EAST Fund. Use that figure only with its attribution, and verify it against the signed State Agreement and CMS documents before repeating it in a decision memo."),

    h2('s4h1', 'What Did Not Change'),
    blk('s4p1', "Withdrawal did not remove Vermont's statutory path. Act 68 of 2025 requires prospective hospital global budgets under the Green Mountain Care Board, from hospital fiscal year 2028 for one or more hospitals and for all by fiscal year 2030, to the extent resources are available. Secretary Samuelson said she remains committed to the long-term goal of global budgets but that the state is not ready to implement them yet."),
    blk('s4p2', "That is the benefit of independent authority that Chapter 3 emphasizes. States that design their transformation to depend entirely on a federal model are strategically exposed; states that use federal models to accelerate and fund a state-designed transformation with its own statutory authority are more resilient. Vermont's experience with AHEAD is a practical test of the second design, and the state's position after withdrawal supports the book's argument."),
    blk('s4p3', "What did change is the financing and federal approval pathway for the Medicare side of the plan. Without AHEAD, Vermont has no CMS-designed Medicare global budget methodology and no AHEAD cooperative agreement funding. The state will need a different federal vehicle, a waiver or a future model, to apply global budgets to Medicare payments."),

    h2('s5h1', 'The Pivot to the Rural Health Transformation Program'),
    blk('s5p1', "The state's announcement paired the withdrawal with a commitment to the Rural Health Transformation Program. Local reporting says the program allocates $195 million a year for five years to Vermont, with priorities including primary care, mental health and keeping rural hospitals open, and that further detail would follow. Secretary Samuelson called it a once-in-a-lifetime opportunity to bring federal dollars into the state."),
    blk('s5p2', "The comparison with AHEAD is instructive. AHEAD was a long-term, model-based commitment tied to total cost of care targets through 2035. The Rural Health Transformation Program is a time-limited funding stream. Chapter 3 notes that the program's funds expire in 2030 while Medicaid cuts under H.R. 1 accelerate after 2030, which is why the book calls the arithmetic unforgiving. The funds can accelerate transformation, but they are not a payment model."),

    h2('s6h1', 'Lessons for Any State'),
    steps('s6st1', 'What a state should do before signing a federal model agreement', [
        ('Negotiate the exit first', 'Secure notice rights before and after launch, and write down what the state owes on exit.'),
        ('Protect your regulator', 'Include language preserving the independence of the state body that sets hospital budgets or rates.'),
        ('Fix the methodology in writing', 'Agree how baselines are calculated and how disputes will be resolved, since federal review is barred.'),
        ('Keep independent authority', 'Pass state law that does not depend on the model continuing.'),
        ('Do not budget on an estimate', 'Treat expected federal funding as unconfirmed until it is in the signed terms.'),
    ]),
    takeaway('tw', [
        "Vermont signed for AHEAD Cohort 2 in January 2025 under a State Agreement it negotiated with CMS.",
        "On September 3, 2025, CMS moved the Cohort 2 and 3 performance start to January 1, 2028 and removed state-designed Medicare fee-for-service global budget methodologies.",
        "The Agency of Human Services announced Vermont's withdrawal on July 24, 2026, citing new guidance that substantially reduced anticipated funding for reinvestment in providers such as primary care practices.",
        "Chapter 3 reports the expected EAST Fund fell from about $138 million in the first performance year to a cap of about $10 million; the published accounts give no dollar amounts.",
        "The agreement gave Vermont withdrawal rights (30 days before launch, six months after), protection for the Green Mountain Care Board's independence, and methodology and dispute provisions.",
        "Act 68 of 2025 keeps hospital global budgets on Vermont's own statutory timetable regardless of AHEAD, and state officials say the withdrawal does not increase costs or reduce access.",
        "The Rural Health Transformation Program, reported at $195 million a year for five years, is a time-limited funding stream and not a payment model.",
    ]),
    quiz('qz',
        "Why was Vermont able to withdraw from AHEAD without legal action, according to Chapter 3?",
        [
            ("Section 1115A guarantees states a right to appeal model changes in court", False),
            ("The State Agreement included negotiated withdrawal rights, with notice periods before and after launch", True),
            ("CMS ended AHEAD for all states in July 2026", False),
            ("Act 68 prohibited Vermont from participating in federal models", False),
        ],
        "Section 1115A bars administrative and judicial review of most model decisions, so the contract is the participant's protection. Vermont negotiated unilateral withdrawal rights, with 30 days' notice before launch and six months' notice after, and used them when anticipated funding was reduced."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.2.2, §3.3.3, §3.5.1: the AHEAD signing, State Agreement protections, EAST Fund figures, Act 68 and the July 2026 withdrawal"),
    blk('src2', "[2] Vermont Agency of Human Services announcement of July 24, 2026, as published by VermontBiz — https://vermontbiz.com/news/2026/july/24/vermont-withdraws-ahead-commits-rural-health-transformation — reasons for withdrawal; statements by Secretary Samuelson and Director Olson. (The original release at healthcarereform.vermont.gov/ahead-model-press-release-7-24-2026 could not be retrieved by the automated fetch used for this lesson.)"),
    blk('src3', "[3] WCAX, Vermont drops AHEAD healthcare model; shifts to $195M rural health fund (July 28, 2026) — https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/ — statements by Secretary Samuelson and GMCB Chair Foster; Rural Health Transformation amounts"),
    blk('src4', "[4] CMS, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — September 2025 changes; model through December 31, 2035"),
    blk('src5', "[5] CMS, AHEAD Model Frequently Asked Questions — https://www.cms.gov/priorities/innovation/ahead/faqs — state targets and CMS approval; removal of the state-designed Medicare FFS methodology"),
    blk('src6', "[6] Vermont Act 68 of 2025 (hospital global budgets), as summarized in Chapter 3 — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf"),
]

# ════════════════════════════════════════════════════════════════════════════
# Lesson 6 facts: read from CMS "TEAM Model Overview" (updated September 2026) and CMS "Participation Tracks in TEAM"
# fact sheet, both extracted from the PDFs themselves on 2026-11-23. Vermont application from HTR book Chapter 3 §3.2.2.
L6_SLUG = 'cmmi-team-mandatory-episodes'
L6_TITLE = 'Mandatory Episodes: How TEAM Works and How to Prepare'
L6 = [
    blk('intro1', "TEAM, the Transforming Episode Accountability Model, is the Innovation Center's mandatory episode-based payment model for surgical care. Where AHEAD asks a state to take on accountability for a whole population over several years, TEAM asks a hospital to take on accountability for a single surgical episode, starting on a fixed date and without a choice about whether to take part."),
    blk('intro2', "This lesson explains who TEAM applies to, what an episode contains, how the three risk tracks differ, how target prices and reconciliation work, how quality changes the payment, and what a hospital or state should do to prepare. It draws on CMS's own model overview, last updated in September 2026, and on its participation-tracks fact sheet."),
    blk('intro3', "Episode models matter beyond the hospitals they cover. They are the clearest example of mandatory participation in the current portfolio, and they teach the mechanics of target prices and reconciliation that appear in many other models."),

    h2('s1h1', 'What TEAM Is For'),
    blk('s1p1', "CMS finalized TEAM in August 2024 as a mandatory model. It holds acute care hospitals accountable for quality and spending during a patient's hospital stay or outpatient procedure and the 30 days that follow discharge. CMS's stated problem is fragmented care: patients who have surgery in a hospital may experience complications, avoidable hospitalizations and higher spending because no one is responsible for the whole recovery."),
    blk('s1p2', "The model has five performance years, 2026 through 2030. Its goals, as CMS lists them, include improving the patient experience from surgery through recovery, reducing readmissions and emergency department use, shortening recovery time, reducing avoidable items and services, and promoting collaboration with longitudinal care providers. In practice, hospitals redesign discharge planning, post-acute referrals and follow-up so that the 30 days after surgery are managed, not just the day of the operation."),
    blk('s1p3', "Chapter 3 places TEAM beside AHEAD, ACO REACH and BALANCE as the models most relevant to a Vermont-style transformation, and records that it replaced the voluntary Bundled Payments for Care Improvement Advanced model. The move from voluntary to mandatory is the central design choice, and it is the reason TEAM is controversial."),

    h2('s2h1', 'Who Must Participate'),
    blk('s2p1', "A TEAM participant is an acute care hospital that initiates episodes, is paid under the inpatient and outpatient prospective payment systems, and has a CMS Certification Number address located in one of the mandatory core-based statistical areas selected for the model. The FY2025 inpatient payment final rule identifies those areas, and CMS publishes a list of the hospitals required to participate and those that volunteered."),
    blk('s2p2', "The overview lists three important boundaries. Indian Health Service and tribal hospitals are excluded. Hospitals in Maryland are excluded, which reflects Maryland's own all-payer global budget system. And hospitals that open in a mandatory area, or that begin to satisfy the definition of a participant after December 31, 2024, are not required to participate immediately; they have at least one full performance year of deferment."),
    blk('s2p3', "There was also a voluntary route. Hospitals outside the mandatory areas could opt in during January 2025 if they had been in the Comprehensive Care for Joint Replacement model through the end of 2024 or in BPCI Advanced through its final period, which ended December 31, 2025. TEAM may overlap with most other CMS models. A hospital in an accountable care organization can still have TEAM episodes, and a TEAM participant may also take part in AHEAD."),
    warning('s2w1', "Check the list, not the headline", "Whether a particular hospital is a TEAM participant depends on the CCN address and the published CMS list. The lesson cannot tell you from the model description whether a given Vermont hospital is covered. Look up the hospital's CCN on the CMS TEAM participant list before assuming either way."),

    h2('s3h1', 'What an Episode Contains'),
    blk('s3p1', "An episode starts with an anchor hospitalization or an anchor procedure and runs for 30 days after the date of the procedure or after discharge. All Medicare Part A and B services are included unless specifically excluded: physician services, inpatient and outpatient hospital care, readmissions, post-acute care in skilled nursing, rehabilitation, long-term care and home health, therapy, laboratory, durable equipment, Part B drugs and hospice."),
    blk('s3p2', "There are five surgical episode categories, and every participant is accountable for all of them unless an exclusion applies: lower extremity joint replacement, which can be inpatient or outpatient; surgical hip and femur fracture treatment; spinal fusion, inpatient or outpatient; coronary artery bypass graft; and major bowel procedures. The overview adds that three additional spinal fusion diagnosis-related groups become episode triggers on October 1, 2026."),
    blk('s3p3', "Some things are carved out: inpatient admissions in categories such as oncology, trauma medical, organ transplant and ventricular shunt, certain major diagnostic categories, device pass-through payments, new technology add-on payments, hemophilia clotting factors and high-cost Part B drugs. Beneficiaries are included only if they are in original Medicare with Parts A and B, are not enrolled in a managed care plan such as Medicare Advantage, have Medicare as their primary payer, and are not eligible on the basis of end-stage renal disease. An episode is cancelled if the patient dies during the anchor stay or if extreme and uncontrollable circumstances, such as a declared disaster, apply."),

    h2('s4h1', 'Three Tracks, Three Risk Levels'),
    blk('s4p1', "TEAM offers three participation tracks that differ in how much a hospital can win or lose. The CMS fact sheet describes them as a way to let hospitals build care management infrastructure before taking downside risk, to give hospitals time to analyze data, and, at the other end, to provide the maximum levels of risk and reward."),
    table('s4t1', 'TEAM participation tracks (CMS participation tracks fact sheet)', [
        {'Feature': 'Risk', 'Track_1': 'Upside only', 'Track_2': 'Upside and downside', 'Track_3': 'Upside and downside'},
        {'Feature': 'Stop-gain and stop-loss limit', 'Track_1': '10% stop-gain; no stop-loss', 'Track_2': '5% each', 'Track_3': '20% each'},
        {'Feature': 'Quality adjustment, positive reconciliation', 'Track_1': 'Up to 10%', 'Track_2': 'Up to 10%', 'Track_3': 'Up to 10%'},
        {'Feature': 'Quality adjustment, negative reconciliation', 'Track_1': 'Not applicable', 'Track_2': 'Up to 15%', 'Track_3': 'Up to 10%'},
        {'Feature': 'Who may choose it', 'Track_1': 'All participants in year 1; safety-net hospitals in years 1 to 3', 'Track_2': 'Years 2 to 5: safety-net, rural, sole community, Medicare-dependent and essential access hospitals', 'Track_3': 'All participants, years 1 to 5'},
    ]),
    blk('s4p2', "Track selection is a decision a hospital has to make before each performance year. A participant that fails to choose is assigned to Track 1 for the first year and to Track 3 for later years, so inaction becomes a choice. CMS also noted that it might provide an interactive tool that participants could use to simulate their potential performance under each track, for scenario planning only."),
    callout('s4c1', "Stop-gain and stop-loss limits cap the total a hospital can receive or owe. They are the model's insurance against a bad year, and they are largest in Track 3: 20 percent in either direction."),

    h2('s5h1', 'Target Prices, Reconciliation and Quality'),
    blk('s5p1', "Hospitals keep billing Medicare fee-for-service, but receive a preliminary target price before each performance year for each episode category. The price is based on non-excluded Part A and B spending, and is prospectively trended, normalized and risk adjusted. The baseline is a three-year period that rolls forward annually, for example January 2022 through December 2024 for the first year. Target prices use 100 percent regional data, with regions defined by the nine census divisions, and episode spending is capped at the 99th percentile to protect participants from unusually costly cases."),
    blk('s5p2', "Target prices include a discount that is intended to reflect Medicare's expected savings: 1.5 percent for coronary bypass and major bowel episodes and 2 percent for joint replacement, hip and femur fracture and spinal fusion episodes. Final target prices add a retrospective trend adjustment capped at 3 percent and a normalization factor capped at 5 percent, so that risk adjustment by itself neither raises nor lowers average prices. The risk adjustment accounts for patient factors such as age and social risk, and hospital factors such as bed size."),
    blk('s5p3', "Reconciliation compares total performance-year fee-for-service spending for attributed episodes with the final target price. The result is adjusted by a composite quality score, then limited by the track's stop-gain or stop-loss. CMS also tracks spending in the 30 days after each episode and, if a participant's average post-episode spending is more than three standard deviations above the regional average, subtracts the excess, which discourages shifting costs outside the episode window. A participant with fewer than 31 baseline episodes in a category is reconciled but is not held accountable for spending above target in that category."),
    blk('s5p4', "Quality counts. The first-year measures are a hybrid hospital-wide all-cause readmission measure, a patient-reported outcome measure for hip and knee replacement, and a patient safety composite; later years replace the safety composite with three harm measures and add a patient-reported information-transfer measure from year 3. A participant with no or incomplete score on a measure receives a neutral score of 50."),

    h2('s6h1', 'Preparing, and What It Means for States'),
    steps('s6st1', 'A hospital preparation sequence for an episode model', [
        ('Confirm status', 'Check the CMS participant list for your CCN, the deferment rules and your voluntary or mandatory status.'),
        ('Understand your baseline', 'Review your three-year baseline claims and the regional target prices for each of the five episode categories.'),
        ('Choose the track deliberately', 'Compare Tracks 1, 2 and 3 against your capability; remember the default if you do not choose.'),
        ('Redesign the 30 days', 'Map discharge planning, post-acute placement, readmission prevention and the required primary care referral.'),
        ('Build the quality position', 'Prepare for the readmission, patient-reported outcome and safety measures that adjust payment.'),
    ]),
    blk('s6p1', "For a state, TEAM is partly a constraint and partly an opportunity. It sits outside any state agreement, so state officials cannot negotiate its terms the way Vermont negotiated AHEAD, but TEAM's episode data and tools can inform state plans for hospital budgets. The model also shows what a mandatory federal design looks like in practice: fixed start, published rules, limited ability to opt out and risk tracks that scale with capability."),
    blk('s6p2', "TEAM and AHEAD illustrate two different answers to the same question of how to hold hospitals accountable. One makes a state accountable for whole-population spending and gives it years to build authority and data. The other makes a hospital accountable for a defined clinical event on a date set in advance. A hospital system that operates in both worlds needs the management discipline that Chapter 15's portfolio approach describes."),

    takeaway('tw', [
        "TEAM is a mandatory five-year episode model, 2026 through 2030, holding acute care hospitals in selected core-based statistical areas accountable for a surgical stay or procedure and the 30 days after discharge.",
        "Indian Health Service and tribal hospitals and hospitals in Maryland are excluded, and hospitals that open or newly qualify in a mandatory area have at least one performance year of deferment.",
        "The five episode categories are lower extremity joint replacement, surgical hip and femur fracture treatment, spinal fusion, coronary artery bypass graft and major bowel procedures.",
        "Track 1 is upside only with a 10 percent stop-gain; Track 2 has 5 percent stop-gain and stop-loss limits; Track 3 has 20 percent limits; a participant that makes no choice is assigned Track 1 for year 1 and Track 3 afterward.",
        "Target prices use three-year regional baselines, a 99th percentile outlier cap and discounts of 1.5 or 2 percent, with final adjustments capped at 3 percent for trend and 5 percent for normalization.",
        "Reconciliation adjusts for a composite quality score, applies stop-gain and stop-loss limits, and subtracts excess post-episode spending above three standard deviations from the regional average.",
        "Whether a given hospital is covered depends on its CCN address and the CMS participant list, which a hospital should verify directly.",
    ]),
    quiz('qz',
        "A TEAM participant makes no track selection before performance year 2. What happens?",
        [
            ("It is assigned to Track 1, upside risk only", False),
            ("It is assigned to Track 3, the track with 20 percent stop-gain and stop-loss limits", True),
            ("It is removed from the model", False),
            ("It is assigned to Track 2 with 5 percent limits", False),
        ],
        "CMS's participation tracks fact sheet states that a participant that fails to notify CMS of its track selection ahead of each performance year from year 2 onward is assigned to Track 3. Participants that make no choice for year 1 are assigned to Track 1. Inaction is therefore a decision, and a hospital should choose its track deliberately."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS Innovation Center, Transforming Episode Accountability Model (TEAM) Model Overview (updated September 2026) — https://www.cms.gov/priorities/innovation/files/team-overview-updated.pdf — participants, episodes, tracks, pricing, reconciliation, quality measures, waivers"),
    blk('src2', "[2] CMS Innovation Center, Participation Tracks in the Transforming Episode Accountability Model (TEAM) — https://www.cms.gov/files/document/team-participation-tracks-fact-sheet.pdf — track features and eligibility, default assignment"),
    blk('src3', "[3] CMS, Transforming Episode Accountability Model (TEAM) — https://www.cms.gov/priorities/innovation/innovation-models/team-model — five performance years, 2026 to 2030; mandatory model"),
    blk('src4', "[4] " + BOOK3 + " — §3.2.2 and Figure 3.2: TEAM as the successor to BPCI Advanced"),
    blk('src5', "[5] CMS, FY 2025, FY 2026 and FY 2027 Inpatient Prospective Payment System/Long-Term Care Hospital PPS final rules, the rules that establish and amend TEAM; the CMS overview lists their Federal Register document numbers as 2024-17021, 2025-14681 and 2026-15833 — see the CMS TEAM page (https://www.cms.gov/priorities/innovation/innovation-models/team-model) for the current participant list"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5), (L6_SLUG, L6_TITLE, L6, 6)]
if __name__ == '__main__':
    run(LESSONS)
