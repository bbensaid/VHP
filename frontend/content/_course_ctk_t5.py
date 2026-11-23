exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_ctk_common.py').read())

# Track 5 — Commitments, Tools and Capstone. Sources: Book Ch9 §9.8 (Fig 9.4), §9.9 (Fig 9.5), §9.10 (Fig 9.6); platform tool source read 2026-11-23:
# Clinical Quality Optimizer (4 tabs: HEDIS Simulator, CMS Stars Predictor, QPP/MIPS Optimizer, P4P ROI Calculator; benchmarks illustrative, not licensed NCQA data),
# High vs Low Value Care (synthetic Vermont patients; A1C/BP panel, Choosing Wisely scan, total cost of care), Risk Stratification Engine (HCC V24-based RAF calculator,
# population segmentation by tier, custom model, comorbidity clustering). Matrix cost ranges are the book's indicative ranges.

L13_SLUG = 'ctk-implementation-commitments'
L13_TITLE = 'Five Commitments and the Implementation Matrix'
L13 = [
    blk('intro1', "Chapter 9 ends its practical material with two linked tables. The first lists five clinical commitments that the Statewide Health Care Delivery Strategic Plan, due from the Agency of Human Services by January 2028, should contain. The second prices the main clinical investments and says when each is likely to pay off. Together they turn the preceding eight lessons into a plan: what must be true statewide, and what a practice or organization should expect to spend and wait for."),
    blk('intro2', "Every cost, timeline and crossover figure in the matrix is the book's own indicative range, and the chapter says so: costs vary by organizational size, existing infrastructure and approach. This lesson does not verify the ranges. It explains how to read them, how to replace them with quotes and how to sequence the investments so that early wins fund later ones."),
    blk('intro3', "The aim is a clear picture of what the chapter commits the state to, and what it asks of any organization that wants to be ready."),

    h2('s1h1', 'The Five Commitments'),
    blk('s1p1', "The chapter says the plan should contain five clinical implementation commitments. The first is PCMH transformation support for all Vermont primary care practices, which means maintaining and expanding Blueprint field staff capacity, through the Blueprint program, the Department of Vermont Health Access and the Agency, over 2025 to 2028. The second is collaborative care deployment at every PCMH practice: funded training for behavioral health care managers, a telepsychiatry consultation network and billing infrastructure in place at all Blueprint practices, carried by permanent funding for the mental health integration pilot through the Rural Health Transformation Program."),
    blk('s1p2', "The third is structured data capture standards across primary care, with record workflow redesign support through Blueprint field staff, exchange connectivity requirements for Blueprint practices and a hierarchical condition category gap analysis for attributed Medicare patients before the Act 68 global budgets begin for non-critical-access hospitals in fiscal year 2028. The fourth is care transition protocols at all hospitals for Blueprint-attributed patients: the community health team protocol at every Blueprint practice, an operational exchange admission notification for all hospitals and follow-up targets for behavioral health emergency visits. The fifth is clinical leader engagement in global budget governance and plan development, including a formal clinical advisory structure for the Health Care Delivery Advisory Committee and clinical input to quality targets."),
    blk('s1p3', "These map one-to-one onto earlier lessons: primary care transformation, behavioral health integration, the data foundation, care transitions and clinical leadership. Quality mechanics and risk-adjustment documentation sit inside the third and fifth commitments. The sequence of timelines is informative as well. Data and transition commitments are scheduled for 2025 to 2027, ahead of the 2028 global budget start, while the primary care, collaborative care and leadership commitments run through 2028."),
    callout('s1c1', "The commitments are the chapter's proposal for the plan's content. Whether the plan will contain them is the state's decision, not a fact."),

    h2('s2h1', 'Reading the Implementation Matrix'),
    blk('s2p1', "The matrix lists six investments with an estimated cost, timeline to value, return crossover point and a Vermont benchmark. Blueprint PCMH transformation through NCQA recognition is shown at $25,000 to $75,000 per practice, with value in 12 to 18 months and crossover in 18 to 24 months. Collaborative care, combining a behavioral health care manager and telepsychiatry, is $80,000 to $150,000 annually per practice, three to six months to set up and crossover in 12 to 18 months. Certified community behavioral health clinic certification is $500,000 to $2 million annually per entity, with value in 18 to 36 months and crossover in 24 to 48 months."),
    blk('s2p2', "Panel risk stratification and care management is $40,000 to $100,000 annually with three to six months to value and a crossover at 12 months. The care transition protocol is $20,000 to $50,000 to set up, three months to value and crossover in six to twelve months. Documentation improvement at the clinical level is $10,000 to $30,000 for training, one to two months to value and an immediate first-year risk-score gain. The Vermont benchmarks include the Blueprint return the chapter cites, which is a state estimate of expenditure reduction for its program, and which the Blueprint's own report treats as a comparison and not an exact saving. Treat such benchmarks as reasons to look, not guarantees."),
    table('s2t1', 'Chapter 9 implementation matrix (book indicative ranges, not verified)', [
        {'Investment': 'PCMH transformation (NCQA recognition)', 'Cost': '$25K-$75K per practice', 'Time_to_value': '12-18 months', 'ROI_crossover': '18-24 months'},
        {'Investment': 'Collaborative care (care manager plus telepsychiatry)', 'Cost': '$80K-$150K per year per practice', 'Time_to_value': '3-6 months setup', 'ROI_crossover': '12-18 months'},
        {'Investment': 'CCBHC certification', 'Cost': '$500K-$2M per year per entity', 'Time_to_value': '18-36 months', 'ROI_crossover': '24-48 months'},
        {'Investment': 'Panel risk stratification and care management', 'Cost': '$40K-$100K per year', 'Time_to_value': '3-6 months', 'ROI_crossover': '12 months'},
        {'Investment': 'Care transition protocol', 'Cost': '$20K-$50K setup', 'Time_to_value': '3 months', 'ROI_crossover': '6-12 months'},
        {'Investment': 'Documentation improvement (clinical)', 'Cost': '$10K-$30K training', 'Time_to_value': '1-2 months', 'ROI_crossover': 'Immediate, year 1 risk-score gain'},
    ]),

    h2('s3h1', 'Sequencing for Early Wins'),
    blk('s3p1', "The matrix itself suggests an order. The cheapest and fastest items, documentation training and the transition protocol, can pay back within a year and can fund or at least justify the slower ones. Risk stratification is a precondition for targeting the others, since it says who needs which program. Collaborative care and PCMH recognition take longer, and the certified clinic route is a multi-year organizational decision, not a project. A practice should therefore start with the shortest crossover items that fit its panel, add risk stratification early and phase the larger programs according to staffing and capital."),
    blk('s3p2', "Sequencing also depends on the payment contract. An organization in a contract with shared savings and quality gates will value quality mechanics first. A hospital under a global budget will weight transitions and avoidable utilization. A federally qualified health center may place certified clinic status and behavioral health integration higher. The lesson is not to follow the book's order mechanically, but to ask, for each investment, which payment it protects or earns and when."),
    blk('s3p3', "One caution applies to all sequencing: returns that depend on avoided utilization appear only if the avoided cost is actually captured. If a hospital's revenue falls when admissions fall and its budget does not adjust, the saving is a loss to that hospital. The chapter's discussion of the fee-for-service dependency makes the point, and the global budget is the mechanism that makes the saving visible. Before committing to an investment, confirm that the payment model will credit the result."),

    h2('s4h1', 'Replacing Ranges With Quotes'),
    steps('s4st1', 'Turning an indicative range into a budget', [
        ('List the cost components', 'Staff time, training, software, consultation fees, certification fees and lost visit time.'),
        ('Get two quotes where possible', 'From the Blueprint, vendors, peer practices or the exchange.'),
        ('Estimate benefit by payment stream', 'Quality bonus, shared savings, risk-score revenue or avoided cost.'),
        ('Compute a crossover month', 'The month when cumulative benefit passes cumulative cost.'),
        ('Stress the result', 'Cut the benefit by a third and delay it a quarter; see if the case survives.'),
    ]),
    blk('s4p1', "A range from a book is a starting point for a conversation with a finance officer, not an input to a budget. The steps above convert it. The stress test is the most useful: if a program works only when everything goes right, it is fragile, and the organization should either strengthen the case or stage the investment. Programs with short crossovers, such as the transition protocol and documentation training, usually survive the stress test, which is part of why the matrix places them early."),
    warning('s4w1', "Do not cite the matrix as evidence of cost or return", "It is the author's planning aid. Use it to structure a discussion and replace each number with your own data before presenting it to a board."),

    h2('s5h1', 'What the Commitments Leave Out'),
    blk('s5p1', "No plan covers everything, and a candid reading of the commitments identifies gaps. They say little about the workforce pipeline for care managers, nurses and community health workers beyond training funding. They are silent on how small practices will pay for the new functions if payment does not change in the same year. And the chapter's own account of Blueprint funding shows a state program under financial pressure, with Medicare's contribution ended and the legislature backfilling part of the gap, which means the first commitment depends on funding that is not guaranteed."),
    blk('s5p2', "A reader preparing for implementation should therefore treat the commitments as a map of where public support is likely to be focused, and plan for the parts that remain with the organization: staff, time and local relationships. The platform tools in the next lesson help with this, because they let a practice test the effect of its own choices on its own numbers."),

    takeaway('tw', [
        "Chapter 9 proposes five clinical commitments for the Statewide Health Care Delivery Strategic Plan: PCMH support, collaborative care, structured data capture, care transition protocols and clinical leader engagement.",
        "Data and transition commitments are timed for 2025 to 2027, before the 2028 global budget start for non-critical-access hospitals.",
        "The implementation matrix prices six investments with indicative ranges that the chapter itself says vary by organization; they are not verified.",
        "The shortest crossovers are documentation training and the transition protocol; risk stratification targets the rest; certification is a multi-year decision.",
        "Sequence by the payment each investment protects or earns, and confirm the contract will credit avoided utilization.",
        "Convert ranges to budgets with quotes, a crossover month and a stress test.",
        "The commitments leave open workforce supply, small-practice cash flow and the funding stability of the Blueprint itself.",
    ]),
    quiz('qz',
        "Which two investments in Chapter 9's matrix have the shortest stated crossovers?",
        [
            ("CCBHC certification and PCMH recognition", False),
            ("Documentation improvement (immediate year 1 gain) and the care transition protocol (6 to 12 months)", True),
            ("Collaborative care and CCBHC certification", False),
            ("PCMH recognition and panel risk stratification", False),
        ],
        "The matrix lists documentation improvement with an immediate first-year gain and the transition protocol with a crossover of six to twelve months, the shortest of the six."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.8 Figure 9.4: commitments for the Statewide Strategic Plan; §9.9 Figure 9.5: implementation matrix (indicative ranges)"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — global budgets and the Statewide Health Care Delivery Strategic Plan"),
    blk('src3', "[3] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — program funding and results framing"),
    blk('src4', "[4] HTR Research Lab, Policy and Quality Sciences — https://healthtransformationreview.org/research-lab/policy-quality — tools for modeling quality payment consequences"),
]

L14_SLUG = 'ctk-platform-tools-lab'
L14_TITLE = 'Platform Lab: Quality, Value and Risk Tools'
L14 = [
    blk('intro1', "Chapter 9 closes with three hands-on tools, listed in its Figure 9.6: the Clinical Quality Optimizer, High vs. Low Value Care and the Risk Stratification Engine. Each is meant to answer a specific practice question: what is a quality gain worth, where does care add cost without value and which of my patients are in a high-risk tier but not in care management. This lesson reads each tool as it is actually built, says what its inputs and outputs are, and notes what each can and cannot support."),
    blk('intro2', "The descriptions here come from reading the tools' source on the platform. The tools use illustrative or synthetic data in places, and each section says where. Use them to learn the logic and to rehearse a decision, and then replace the inputs with your own data."),
    blk('intro3', "A tool is only as good as the question it is asked, so each section begins with the question."),

    h2('s1h1', 'Clinical Quality Optimizer'),
    blk('s1p1', "The question is what a quality improvement is worth under different payment programs. The tool has four tabs. The HEDIS Simulator lets a user set an organization type and plan type, enter current performance on a list of measures and see the gap to the 90th percentile weighted by measure importance, with the largest opportunities ranked. The CMS Stars Predictor takes enrollment and measure performance and estimates a star rating by domain. The QPP and MIPS Optimizer models quality, promoting interoperability, improvement activities and cost scores for a clinician group, with a dollar impact estimate tied to Part B volume. The pay-for-performance ROI Calculator lets a user choose measures, targets, a timeline, staffing and technology costs and revenue streams and shows net return and a break-even month."),
    blk('s1p2', "Two cautions are printed in the tool itself. The percentile benchmarks and star cut points are illustrative approximations, not licensed NCQA or CMS data, so the output teaches the structure of the calculation and does not predict an organization's actual rating. And the Stars and plan-oriented tabs reflect health plan economics more than a primary care practice's, so a practice should use the HEDIS and ROI tabs most and treat the Stars output as context. A good exercise is to enter your own current rates, find the measure with the largest weighted gap and ask what the first improvement step would be, using the five-step method from Track 3."),
    callout('s1c1', "The optimizer shows the shape of the payment consequence. Your contract tells you the actual price."),

    h2('s2h1', 'High vs. Low Value Care'),
    blk('s2p1', "The question is where care adds cost without improving outcomes, and where a controlled panel creates value. The tool describes itself as a panel management and value analysis built on synthetic Vermont patient scenarios. Its A1C and blood pressure panel view lists patients with diabetes or hypertension, flags those whose latest value is above the control threshold, shows the trend and counts the uncontrolled. It attaches a simple value estimate, about $1,200 a year for moving an uncontrolled diabetes patient to controlled and about $800 for blood pressure, which the code labels a combination of quality bonus and utilization savings."),
    blk('s2p2', "A second part scans a set of Choosing Wisely recommendations, such as avoiding routine chest imaging in stable chronic lung disease, against the patients the recommendation affects, and a third decomposes a selected patient's total cost of care by service category against the average of the synthetic group. All of this is a teaching model. The per-patient values are assumptions embedded in the tool, not measured savings, and the patients are synthetic. The learning is in the workflow: identify who is uncontrolled, see the trend, estimate a value, check low-value services and look at where the money goes."),
    table('s2t1', 'What each part of the tool does', [
        {'Part': 'A1C and blood pressure panel', 'Input': 'Synthetic patient labs', 'Output': 'Controlled and uncontrolled lists, trends, simple value estimate'},
        {'Part': 'Choosing Wisely scan', 'Input': 'Recommendations and affected patients', 'Output': 'Flagged low-value services by patient'},
        {'Part': 'Total cost of care view', 'Input': 'Selected patient', 'Output': 'Cost by service category against the group average'},
    ]),

    h2('s3h1', 'Risk Stratification Engine'),
    blk('s3p1', "The question is which patients are in a high-risk tier and whether they are receiving care management. The tool has several parts. A risk score calculator uses a simplified model based on the CMS hierarchical condition category system, version 24, with a demographic base and additive condition factors, and says a score of 1.0 represents the average beneficiary. A population segmentation tab places a panel into tiers from very low to very high, with annual cost assumptions that run from $1,800 in the lowest tier to $68,000 in the highest, and lets the user enter how many patients in each tier are currently in care management. A model builder and a comorbidity clustering view round out the tool."),
    blk('s3p2', "The comparison of tier against care management is the point. Chapter 9 says this is where the tool shows patients in a high tier who are receiving no care management, a gap that quality measures do not surface. That is a fair description of what a segmentation tab can do when the user supplies the numbers. Two cautions apply. The tool's condition model follows an older version of the CMS system, and the 2026 payment year phases in the newer one, as Track 3 explained, so use it for structure and not for revenue forecasts. And tier costs are assumptions: they should be replaced with the organization's own claims-based distribution when available."),
    steps('s3st1', 'A working session with the segmentation tab', [
        ('Enter the panel by tier', 'Use counts from your own stratification, even if rough.'),
        ('Enter current care management coverage', 'How many patients in each tier have a named care manager or program.'),
        ('Read the gap', 'High and very high tier patients without care management are the first outreach list.'),
        ('Test an assumption', 'Change the tier cost assumptions and see how sensitive the result is.'),
        ('Take the list to the team', 'Turn the finding into patient names and a weekly review.'),
    ]),

    h2('s4h1', 'Using the Three Tools Together'),
    blk('s4p1', "The three tools line up with three steps of the Chapter 9 sequence. Risk stratification tells you whom to focus on. Value analysis tells you which services and which uncontrolled conditions to address. The quality optimizer tells you what the improvement is worth under the payment programs you face. A practice that works through them in that order will end with a short list of patients, a short list of measures and a rough estimate of return, which is exactly the input needed for the capstone plan in the next lesson."),
    blk('s4p2', "The tools also support a conversation with leadership. A board is more likely to approve a transition protocol if a manager can show the number of high-tier patients without care management, the cost assumptions behind the estimate and the break-even month under reasonable and pessimistic assumptions. The tools do not replace the organization's data, but they structure the question and show the arithmetic."),
    warning('s4w1', "Synthetic data cannot validate a program", "Use the tools to learn and rehearse. Any number that goes to a board or a payer must come from your own data and your own contract."),

    h2('s5h1', 'Checking Promises Against the Page'),
    blk('s5p1', "Chapter 9 tells readers that the Clinical Quality Optimizer shows the payment consequence of each quality decision, that High vs. Low Value Care shows where reducing volume improves both margin and outcomes and that the Risk Stratification Engine shows high-tier patients receiving no care management. The tools do deliver a payment consequence through the pay-for-performance and MIPS tabs, a low-value scan and a cost decomposition, and a tier-by-coverage comparison. They do not, however, use real Vermont claims, and the margin effect of reducing volume depends on the payment model, which the tool does not know. A reader should treat each as a worked example."),
    blk('s5p2', "That is a reasonable standard for a learning tool and the one the lesson recommends: understand the logic, rehearse it with the tool and then take it to your own numbers. The most useful habit is to write down, before using the tool, what decision the result might change. If no result could change the decision, the tool is not needed, and if some result could, then the inputs deserve the effort of real data."),

    takeaway('tw', [
        "Chapter 9's Figure 9.6 lists three tools: Clinical Quality Optimizer, High vs. Low Value Care and Risk Stratification Engine.",
        "The Quality Optimizer has HEDIS, Stars, MIPS and pay-for-performance ROI tabs; its percentiles and cut points are illustrative approximations, not licensed data.",
        "High vs. Low Value Care uses synthetic Vermont patients and embedded per-patient value assumptions of about $1,200 for A1C and $800 for blood pressure.",
        "The Risk Stratification Engine uses a simplified older CMS-HCC version and tier cost assumptions from $1,800 to $68,000; use it for structure, not revenue forecasts.",
        "Its tier-by-care-management comparison finds high-tier patients with no care management, if you enter your own counts.",
        "Work the tools in order: stratify, find value gaps, price the improvement, then bring real data.",
        "Synthetic or illustrative results cannot validate a program; they teach and rehearse.",
    ]),
    quiz('qz',
        "What is the main use of the Risk Stratification Engine's segmentation tab in this course?",
        [
            ("To predict a hospital's exact revenue", False),
            ("To compare risk tiers with current care management coverage and find high-tier patients without it", True),
            ("To replace the electronic record", False),
            ("To certify a clinic", False),
        ],
        "The tab lets a user enter panel counts by tier and the number in care management, which exposes high-tier patients receiving no care management, a gap quality measures do not surface."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.10 Figure 9.6: Work This Chapter on the Platform"),
    blk('src2', "[2] HTR Research Lab, Policy and Quality Sciences, Clinical Quality Optimizer — https://healthtransformationreview.org/research-lab/policy-quality?tab=quality — tool source read 2026-11-23"),
    blk('src3', "[3] HTR Research Lab, VBC and Clinical Quality, High vs. Low Value Care — https://healthtransformationreview.org/research-lab/vbc-clinical-quality?tab=value — tool source read 2026-11-23"),
    blk('src4', "[4] HTR Research Lab, Interoperability, Risk Stratification Engine — https://healthtransformationreview.org/research-lab/interoperability?tab=risk — tool source read 2026-11-23"),
]

L15_SLUG = 'ctk-capstone-practice-plan'
L15_TITLE = 'Capstone: A Practice Transformation Plan'
L15 = [
    blk('intro1', "This capstone asks you to write a one-page clinical transformation plan for a real or imagined practice, using the material from the previous fourteen lessons. A good plan is short, specific and honest about what it does not know. It names the patients and measures it will work on, the people who own each piece, the money it needs and the date by which it will know whether the plan is working."),
    blk('intro2', "The plan has six parts: baseline, priorities, program choices, owners and time, budget and measures. The sections below explain each part and give a worked example for a mid-sized rural primary care practice. The numbers in the example are illustrative and meant to show the logic, not to represent any real practice or to be quoted."),
    blk('intro3', "Write the plan for your own situation, and keep every number traceable to a source or a stated assumption."),

    h2('s1h1', 'Part One: Baseline'),
    blk('s1p1', "Start with what you know. How many patients are attributed to the practice, and under which payment programs? What is the current rate on your three most important quality measures? How many patients are in each risk tier, even roughly? What share of high-tier patients has a named care manager? How many discharges a month involve your patients, and what happens within seven days? Which structured fields are reliably captured, using the audit from Track 4? Write each answer as a number or a sentence that says it is unknown, because an unknown is a finding."),
    blk('s1p2', "The example practice has 6,000 attributed patients, mostly in Medicare and Medicaid programs, with a Blueprint-style recognition already in place. Its diabetes control rate is below its own target, its depression screening is recorded in free text for a third of visits, about 150 patients appear in the top risk tier and perhaps a third of them have a care manager, and nobody currently tracks post-discharge contact. These are plausible features of many practices, not data about one."),

    h2('s2h1', 'Part Two: Priorities'),
    blk('s2p1', "From the baseline, choose no more than three priorities. The example selects diabetes control because the measure affects payment and the patient list is concrete, post-discharge contact because it is cheap and fast and structured behavioral health screening because the chapter's collaborative care model depends on it. Each priority is stated as a measurable aim with a date: for instance, raise the share of diabetes patients with a recorded A1C under 8 percent by a stated number of points within a year, or contact eighty percent of discharged attributed patients within two business days within six months."),
    blk('s2p2', "Resist the temptation to add a fourth. Practices that try to do everything usually do little, and the evidence from improvement work is that one visible success makes the next change easier. Rank the priorities by value and ease, and start with the one that scores well on both."),

    h2('s3h1', 'Part Three: Program Choices'),
    blk('s3p1', "For each priority, choose the program from this course that addresses it and say what the first month looks like. Diabetes control maps to the five-step improvement method, a weekly huddle and a run chart. Post-discharge contact maps to the transition protocol and the transitional care codes where eligible. Behavioral health screening maps to the collaborative care model's first step, a structured screening score captured in the record, and to a consultation arrangement with a psychiatrist when the practice is ready. Each program gets one sentence on what will be done first and who does it."),
    steps('s3st1', 'A one-page plan structure', [
        ('Baseline', 'Five to eight numbers, with unknowns marked.'),
        ('Priorities', 'No more than three, each with a measurable aim and date.'),
        ('Programs', 'One program per priority and the first step.'),
        ('Owners and time', 'A named person and a protected share of time for each.'),
        ('Budget', 'Cost, expected benefit by payment stream and a crossover month.'),
        ('Measures and review', 'Process and outcome measures, with a quarterly review date.'),
    ]),

    h2('s4h1', 'Part Four: Owners, Budget and Measures'),
    blk('s4p1', "Each priority needs a named owner with protected time, and the plan should state how much. Leadership that is unnamed is not leadership. The budget should list costs from quotes where possible, using the indicative ranges in the implementation matrix only as a starting point, and should list the expected benefit by payment stream: quality bonus, shared savings, risk-score revenue or avoided cost. Compute the crossover month under a baseline and a pessimistic scenario, with the benefit cut by a third and delayed by a quarter."),
    blk('s4p2', "The measures should include at least one process measure and one outcome measure for each priority. For post-discharge contact, the process measure is the share contacted within two business days and the outcome measure is thirty-day readmission among those contacted. For diabetes control, the process measure is the share of patients with a visit and A1C in the last six months and the outcome measure is the control rate. Add an equity check, reporting each measure by language, insurance and geography, so that gains for easy-to-reach patients do not hide losses for others."),
    table('s4t1', 'Worked example: one priority in the plan (illustrative)', [
        {'Element': 'Priority', 'Content': 'Contact discharged attributed patients within two business days'},
        {'Element': 'Owner and time', 'Content': 'Practice nurse, 4 hours a week, with a named backup'},
        {'Element': 'First step', 'Content': 'Agree how the practice learns of discharges and who calls'},
        {'Element': 'Process measure', 'Content': 'Share of discharges with documented contact in two business days'},
        {'Element': 'Outcome measure', 'Content': 'Thirty-day readmission among contacted patients'},
        {'Element': 'Review', 'Content': 'Monthly huddle; formal review at one quarter'},
    ]),

    h2('s5h1', 'Part Five: Risks and Review'),
    blk('s5p1', "A good plan lists what could go wrong. The example names four risks: the nurse leaves, alerts from the exchange are incomplete, the electronic record cannot produce the diabetes list reliably and funding for a state program changes. For each, the plan names a mitigation: a trained backup, a patient question about recent hospital visits, a manual list for the first quarter and a decision date to revisit the budget. Naming risks is not pessimism. It is how a plan survives contact with real work."),
    blk('s5p2', "Finally, set a review date and decide in advance what will count as success, what will count as a reason to change course and what will count as a reason to stop. A plan that cannot be wrong cannot be learned from. After the review, update the plan, share it with the team and begin the next cycle with the same discipline. Done repeatedly, this is the clinical transformation capability the chapter calls under-resourced: not a single program, but the habit of choosing, owning, measuring and adjusting."),
    blk('s5p3', "Plan for communication as carefully as for measurement. A plan that lives in one manager's folder does not change daily work. Present the one page to the whole team at the start, explain why each priority was chosen and ask for objections, since frontline staff often know of obstacles that the baseline numbers hide. Post the run charts where staff can see them, and report results at each huddle in plain language: what moved, what did not and what the team will try next. When a measure improves, say who made it happen. When it does not, treat the result as information about the process and not as a verdict on the people."),
    blk('s5p4', "Be equally deliberate about the relationship with partners outside the practice. The community health team, the hospital's transition staff, the behavioral health agency and the state's Blueprint staff each hold part of what the plan needs. Write down, for each, what you will ask of them and what you will offer in return, such as timely referrals, complete information and feedback on outcomes. Partnerships that run on stated expectations survive staff turnover better than those that run on goodwill, and a practice that is a reliable partner is likely to receive better support in return."),
    blk('s5p5', "Finally, keep the plan proportionate. A five-clinician practice does not need a forty-page strategy, and a plan that takes longer to write than to start will not be read. If the one page cannot be completed in an afternoon with the data at hand, that is itself a finding about the data foundation, and the first priority may be to fix it. Return to the plan every quarter, cross out what is finished, add what is next and keep it short enough that anyone can read it between patients."),
    callout('s5c1', "The test of a plan is whether a new staff member could read one page and know who is doing what by when."),

    takeaway('tw', [
        "A practice transformation plan has six parts: baseline, priorities, program choices, owners and time, budget and measures, and risks and review.",
        "Start with the numbers you know and mark unknowns; an unknown is a finding.",
        "Choose no more than three priorities, each with a measurable aim and a date.",
        "Match each priority to a program from the course and state the first step and who does it.",
        "Name an owner with protected time for every priority; use quotes, not book ranges, for the budget, and stress the crossover month.",
        "Pair a process measure with an outcome measure for each priority and add an equity check.",
        "List risks with mitigations, set a review date and decide in advance what success and course correction look like.",
    ]),
    quiz('qz',
        "Why does the plan limit a practice to no more than three priorities?",
        [
            ("Because regulations forbid more", False),
            ("Because practices that try to do everything usually accomplish little, and one visible success makes the next change easier", True),
            ("Because three is the number of HEDIS measures", False),
            ("Because only three programs exist", False),
        ],
        "The lesson argues that focus and early visible success drive improvement, so a plan should rank priorities by value and ease and start with the one that scores well on both."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.8 to §9.10: commitments, matrix and platform tools; §9.12 Key Concepts"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — practice support and measurement context"),
    blk('src3', "[3] NCQA, HEDIS measures and technical specifications — https://www.ncqa.org/hedis/measures/"),
    blk('src4', "[4] HTR Research Lab, VBC Readiness Assessment — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness — organizational readiness domains"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
