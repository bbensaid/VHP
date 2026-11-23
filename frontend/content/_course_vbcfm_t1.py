exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_vbcfm_common.py').read())

# Course: VBC Financial Modeling and APM Readiness (Chapter 7 companion). Track 1 — Benchmarks, Shared Savings, Risk.
# Primary source for MSSP mechanics: MedPAC "Payment Basics: Accountable Care Organization Payment Systems" (revised
# October 2026; policies current as of September 30, 2026), read from the PDF itself. CMS PY2024 fact sheet read earlier.
# Worked numbers marked ILLUSTRATIVE are this course's own arithmetic, not data. Vermont facts: HTR book Chapter 7 §7.2.

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'vbcfm-benchmarks'
L1_TITLE = 'Benchmarks: The Most Consequential Number in a Value-Based Contract'
L1 = [
    blk('intro1', "Every value-based payment model has a number at its center: the benchmark, the expected cost of care for the attributed population. Everything else, the savings, the losses, the quality adjustment, is measured against it. Chapter 7 of Transforming Healthcare says that getting the benchmark right, or negotiating favorable methodology, is often the most important financial decision in contract entry. This lesson explains why and shows how real programs construct it."),
    blk('intro2', "It covers the three basic ways to build a benchmark and who each helps and hurts, then walks through the benchmark in the Medicare Shared Savings Program in detail, using the Medicare Payment Advisory Commission's October 2026 description of the policies in force on September 30, 2026. It closes with the Vermont contexts Chapter 7 gives for each method and a checklist of questions to ask about any benchmark."),
    blk('intro3', "Lessons 2 and 3 then use the benchmark to compute shared savings and to size the return on care management. Nothing in them works unless the benchmark is understood first."),

    h2('s1h1', 'What a Benchmark Is For'),
    blk('s1p1', "A benchmark answers one question: what would care for this population cost if nothing changed? If actual spending lands below it, there are savings to share. If it lands above, there are losses. Chapter 7 describes the structure plainly: shared savings or shared losses are calculated relative to the benchmark, and the benchmark is built from one of a small number of methods with different financial implications for the organization entering the contract."),
    blk('s1p2', "The benchmark does two jobs at once. It is a forecast, an estimate of expected spending, and it is a bargaining position, because the methodology that produces the forecast is negotiated or set by rule, and each choice moves money between the payer and the provider. The same underlying care can produce large savings under one methodology and a loss under another, which is why an organization that has not examined the benchmark has not understood the contract."),
    callout('s1c1', "A benchmark is both a forecast and a negotiated rule. Before asking whether you can beat it, ask how it was built, who it favors and when it gets reset."),

    h2('s2h1', 'Three Ways to Build One'),
    blk('s2p1', "Chapter 7 describes three construction methods. A historical baseline sets the benchmark at the organization's own past cost of care, usually with a trend adjustment. Organizations with high historical spending start with a generous benchmark and find savings easy; organizations that were already efficient face a lower benchmark and less room, which the chapter calls the efficient provider disadvantage. A regional benchmark sets the target at the regional average instead, which removes the efficient provider disadvantage but penalizes organizations in high-cost regions that compete against a lower number than their history would give. A prospective benchmark is set at the start of the year from projected population needs, as in global budgets and capitation. It provides revenue certainty, and its fairness depends on risk adjustment: a poor risk adjuster produces winners and losers based on case mix and not on care management."),
    table('s2t1', 'Benchmark construction methods (HTR Chapter 7)', [
        {'Method': 'Historical baseline', 'Helps': 'Organizations with high past spending', 'Hurts': 'Already-efficient organizations (the efficient provider disadvantage)'},
        {'Method': 'Regional benchmark', 'Helps': 'Efficient organizations in high-cost areas of the benchmark', 'Hurts': 'Organizations in high-cost regions competing with a lower average'},
        {'Method': 'Prospective benchmark', 'Helps': 'Organizations that need revenue certainty and have accurate risk adjustment', 'Hurts': 'Organizations whose case mix the risk adjuster misses'},
    ]),
    blk('s2p2', "Real programs blend methods. A pure historical benchmark rewards inefficiency and a pure regional one ignores a provider's own circumstances, so most programs combine them, shifting weight over time. The Shared Savings Program shows how."),

    h2('s3h1', 'The Shared Savings Program Benchmark, Step by Step'),
    blk('s3p1', "According to MedPAC's October 2026 payment basics, which reflects policies current as of September 30, 2026, Medicare's Shared Savings Program sets an ACO's benchmark from the total Part A and Part B spending of beneficiaries who would have been assigned to the ACO during a baseline period. The baseline period is the three years before the start of the contract. Spending is averaged over the three years, with more recent years weighted more heavily."),
    blk('s3p2', "That historical baseline is then adjusted upward by one of three adjustments, with the ACO receiving the highest of the three, and the adjustment capped at a dollar amount equal to 5 percent of national per capita mean expenditures for the assignable population. The first is a positive regional adjustment that blends the ACO's historical baseline with the risk-adjusted fee-for-service spending of all assignable beneficiaries in its region. The second is a prior-savings adjustment, available to ACOs entering at least their second agreement period, that lets an ACO receive 50 percent of its average shared-savings bonuses from the three performance years before the new period begins. The third, for agreement periods starting in 2025 or later, is a population adjustment based on the share of assigned beneficiaries with low incomes, measured by Part D low-income subsidy enrollment or dual eligibility, and only ACOs with a share of 15 percent or more receive it."),
    blk('s3p3', "Each of the three has a purpose. The regional adjustment softens the efficient provider disadvantage. The prior-savings adjustment keeps a successful ACO from being fully penalized by a benchmark reset. The low-income adjustment recognizes that serving a poorer population costs more in ways risk scores may not capture. Together they show how a mature program patches the weaknesses of its first-generation benchmark."),
    steps('s3st1', 'How the MSSP benchmark is assembled', [
        ('Set the baseline', 'Average spending of beneficiaries who would have been assigned, over the three years before the contract, weighting recent years more.'),
        ('Apply the highest eligible upward adjustment', 'Regional, prior-savings or low-income population adjustment, capped at 5 percent of national per capita mean spending.'),
        ('Trend and risk-adjust', 'Update to the performance year and account for changes in the population\'s documented health.'),
        ('Limit risk score growth', 'Cap the increase in the ACO\'s average risk score at 3 percentage points above the change driven by demographics alone.'),
    ]),

    h2('s4h1', 'Risk Adjustment and the Coding Question'),
    blk('s4p1', "Risk adjustment is what lets a benchmark compare populations of different health. MedPAC explains that the Shared Savings Program uses hierarchical condition category risk scores of assigned beneficiaries to account for change in reported health conditions since the baseline. Because some change in reported conditions reflects coding practice and not real illness, CMS adjusts for the change in risk scores across all fee-for-service beneficiaries eligible for assignment, and then limits the increase in an ACO's average risk score to 3 percentage points above the change attributable to demographics alone."),
    blk('s4p2', "Chapter 7 names the other side of the problem, the RAF gap. A risk adjustment factor multiplies the benchmark to reflect the population's health status. Accurate coding is essential: diagnoses that should be coded but are not create a benchmark that understates expected cost and produces apparent savings that disappear when coding is corrected. The program-level cap on risk score growth is the payer's defense against coding that outruns illness. For an organization entering a contract, the two combine into a plan: close genuine documentation gaps early, since the benchmark is built from the baseline, and expect the growth cap to limit what coding improvement alone can produce."),
    warning('s4w1', "Coding is not a savings strategy", "Documentation that records real illness more completely is necessary for a fair benchmark. Documentation that merely raises risk scores will be limited by growth caps and by statewide risk score adjustments, and it will not change what care costs."),

    h2('s5h1', 'Vermont Contexts From Chapter 7'),
    blk('s5p1', "Chapter 7 gives each construction method a Vermont setting. Under AHEAD, CMS would have set prospective Medicare fee-for-service global budgets for hospitals. Because Vermont withdrew, Act 68 now directs the Green Mountain Care Board to set global budget standards reflecting reference-based pricing and the state's total cost of care targets. The chapter notes that the revenue-setting methodology had not been published when it was written, and that Vermont hospitals with historically low spending may face benchmarks that limit their upside, the efficient provider disadvantage again."),
    blk('s5p2', "The Board's reference-based pricing uses Medicare rates as an external benchmark and not Vermont hospital historical prices, which the chapter identifies as a regional or national benchmark approach that addresses the problem of benchmarks built on historically high prices. And because Act 68 does not prescribe how a global budget is adjusted for patient complexity, risk adjustment remains a key open design question for the first non-critical-access global budgets. A Vermont hospital CFO therefore has a concrete task before the methodology arrives: understand which of the three construction methods the Board is likely to blend, and model the hospital's position under each."),

    h2('s6h1', 'Questions to Ask About Any Benchmark'),
    steps('s6st1', 'A benchmark review checklist', [
        ('How is it built?', 'Historical, regional, prospective or a blend, and with what weights?'),
        ('What is the baseline period?', 'How many years, how weighted, and does the period include unusual years?'),
        ('How is it trended and risk-adjusted?', 'Which index, which risk model, and what caps on risk score growth?'),
        ('When is it reset?', 'Does the organization keep the benefit of demonstrated improvement or start over?'),
        ('What adjustments exist?', 'Regional, prior savings, population mix, and what are their limits?'),
    ]),

    takeaway('tw', [
        "A benchmark is the expected cost of care for an attributed population; shared savings and losses are measured against it, and its methodology is often the most important financial decision in contract entry.",
        "Chapter 7's three construction methods are historical baseline, regional benchmark and prospective benchmark, each favoring and hurting different organizations.",
        "The efficient provider disadvantage is the problem that historical baselines give already-efficient organizations a lower benchmark and less room for savings.",
        "The Shared Savings Program baseline is three years of spending before the contract, with more recent years weighted more, plus the highest of a regional, prior-savings or low-income population adjustment, capped at 5 percent of national per capita mean spending.",
        "The program limits growth in an ACO's average risk score to 3 percentage points above the demographic change, which constrains gains from coding alone.",
        "Under Act 68, Vermont's global budget benchmark methodology was not yet published when Chapter 7 was written, and risk adjustment is a key open question.",
        "Ask how a benchmark is built, what baseline it uses, how it is trended and risk-adjusted, when it resets and what adjustments exist.",
    ]),
    quiz('qz',
        "According to MedPAC's October 2026 description, how does the Shared Savings Program set an ACO's baseline?",
        [
            ("From the ACO's spending in a single prior year, with no weighting", False),
            ("From three years of spending before the contract, with more recent years weighted more heavily, then adjusted upward by the highest of three eligible adjustments", True),
            ("From the national average alone, ignoring the ACO's history", False),
            ("From a negotiated amount that has no formula", False),
        ],
        "MedPAC reports that the baseline is the three years before the contract start, averaged with more recent expenditures weighted more, and then adjusted by the highest of a regional adjustment, a prior-savings adjustment or, from 2025, a low-income population adjustment, each capped at 5 percent of national per capita mean expenditures."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.2.1-7.2.4: benchmark construction methods, Vermont AHEAD, RBP and global budget contexts"),
    blk('src2', "[2] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — baseline, adjustments, risk score cap, assignment"),
    blk('src3', "[3] CMS, Medicare Shared Savings Program, shared savings and losses, assignment and quality performance standard methodology specifications — https://www.cms.gov/files/document/medicare-shared-savings-program-shared-savings-and-losses-and-assignment-methodology-specifications.pdf-3 — cited by MedPAC as the source for program parameters"),
    blk('src4', "[4] 42 CFR 425.605, Establishing, adjusting, and updating the benchmark — https://www.law.cornell.edu/cfr/text/42/425.605"),
]

# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'vbcfm-shared-savings-calculation'
L2_TITLE = 'The Shared Savings Calculation: A Working Model'
L2 = [
    blk('intro1', "Once the benchmark is set, the arithmetic of shared savings is short: compare actual spending with the benchmark, apply thresholds, apply the sharing rate and apply the caps. The difficulty is in the details, because each step contains a design choice that moves money. This lesson builds the calculation from Chapter 7's five-step framework and attaches real program parameters to each step."),
    blk('intro2', "The Medicare Shared Savings Program is the reference case. Its parameters in 2026, as MedPAC reports them, set the maximum sharing rates and loss limits by track and level. The lesson then applies the model to an illustrative example with round numbers so the mechanics are visible, and it states what changes under a global budget, where there is no shared savings calculation because the savings are the margin under a fixed payment."),
    blk('intro3', "The numbers in the worked example are this course's own arithmetic, chosen for clarity. They are not data about any organization."),

    h2('s1h1', 'The Five Steps'),
    blk('s1p1', "Chapter 7 gives the calculation as five steps. First, benchmark setting: the benchmark per member per month, multiplied by attributed member months, gives total benchmark spending, which is the budget the organization is measured against. Second, performance measurement: actual total cost of care for the attributed population, including all Medicare Part A and Part B spending regardless of where care is delivered, so out-of-network spending counts against the ACO. Third, the savings calculation: benchmark minus actual spending is gross savings, or a gross loss if negative."),
    blk('s1p2', "Fourth, the minimum savings rate. In most shared savings models, savings must exceed a threshold before the organization shares in them, to protect against natural year-to-year variation triggering payments or losses that do not reflect genuine performance change. Chapter 7 gives the one-sided Shared Savings Program rate as 2.0 to 3.9 percent of benchmark depending on ACO size. Fifth, the shared savings payment: gross savings multiplied by the sharing rate, subject to a cap and to quality."),
    steps('s1st1', 'The shared savings calculation (HTR Chapter 7, Figure 7.1)', [
        ('Set the benchmark', 'Benchmark per member per month times attributed member months equals total benchmark spending.'),
        ('Measure performance', 'Total Part A and B cost of care for the attributed population, wherever delivered.'),
        ('Compute gross savings or loss', 'Benchmark minus actual spending.'),
        ('Apply the minimum savings rate', 'Savings must exceed the threshold before any is shared.'),
        ('Apply the sharing rate, cap and quality', 'Gross savings times the sharing rate, limited by the cap and adjusted for quality.'),
    ]),

    h2('s2h1', 'Real Parameters: The 2026 Shared Savings Program'),
    blk('s2p1', "MedPAC's Table 1 sets out the program's parameters by track and level for 2026. In the one-sided Basic levels A and B the maximum sharing rate is 40 percent, with savings limited to 10 percent of benchmark, and there are no shared losses. In Basic levels C, D and E the maximum sharing rate is 50 percent with the same 10 percent savings limit, and the maximum shared loss rate is 30 percent, with loss limits that rise by level: 2 percent of revenue or 1 percent of benchmark in level C, 4 percent of revenue or 2 percent of benchmark in level D, and 8 percent of revenue or 4 percent of benchmark in level E, in each case the lower of the two. In the Enhanced track the maximum sharing rate is 75 percent with savings limited to 20 percent of benchmark, and the maximum shared loss rate ranges from 40 to 75 percent, set at one minus the maximum savings rate adjusted for quality, with a loss limit of 15 percent of benchmark."),
    table('s2t1', 'MSSP parameters by track and level, 2026 (MedPAC Table 1)', [
        {'Parameter': 'Maximum shared savings rate', 'BASIC_A_B': '40%', 'BASIC_C_to_E': '50%', 'ENHANCED': '75%'},
        {'Parameter': 'Savings limit', 'BASIC_A_B': '10% of benchmark', 'BASIC_C_to_E': '10% of benchmark', 'ENHANCED': '20% of benchmark'},
        {'Parameter': 'Maximum shared loss rate', 'BASIC_A_B': 'None', 'BASIC_C_to_E': '30%', 'ENHANCED': '40% to 75%'},
        {'Parameter': 'Loss limit', 'BASIC_A_B': 'None', 'BASIC_C_to_E': 'C: 2% of revenue or 1% of benchmark; D: 4% or 2%; E: 8% or 4% (lower of the two)', 'ENHANCED': '15% of benchmark'},
    ]),
    blk('s2p2', "Two further rules matter. Quality gates the payment: ACOs must meet a minimum quality performance threshold to share in savings, and in two-sided models a higher quality score lowers the shared loss rate. And level E of the Basic track, like the Enhanced track and ACO REACH, qualifies as an advanced alternative payment model, which MedPAC says carries a 1.88 percent incentive payment for participating clinicians in 2026. As of January 2026, 121 ACOs were in one-sided risk arrangements and 390 in two-sided arrangements, and the program served 12.6 million beneficiaries."),
    callout('s2c1', "The risk a contract carries is set by three numbers together: the sharing rate, the cap on savings and loss, and the quality gate. Reading the headline sharing rate alone misses most of the exposure."),

    h2('s3h1', 'A Worked Example (Illustrative Numbers)'),
    blk('s3p1', "Suppose an ACO has 10,000 attributed beneficiaries and a benchmark of $12,000 per beneficiary for the year, so total benchmark spending of $120 million. These numbers are illustrative. Suppose actual spending is $116 million. Gross savings are $4 million, or 3.3 percent of benchmark. If the ACO is in a two-sided Basic level with a 50 percent maximum sharing rate and the savings clear the minimum savings rate, and its quality score gives it 90 percent of the maximum rate, the final sharing rate is 45 percent and the shared savings payment is $1.8 million."),
    blk('s3p2', "Now suppose actual spending is $124 million instead. The gross loss is $4 million. In Basic level C, with a 30 percent maximum shared loss rate, the calculated loss is $1.2 million, and the 1 percent of benchmark limit is also $1.2 million, so the ACO owes $1.2 million, unless 2 percent of its Medicare revenue is lower. In the Enhanced track the same $4 million gross loss would carry a loss rate between 40 and 75 percent depending on quality, which is $1.6 million to $3 million, with a limit of 15 percent of benchmark, or $18 million. The example shows why track choice matters: the same performance produces very different outcomes."),
    table('s3t1', 'Illustrative outcomes for a $4 million swing on a $120 million benchmark', [
        {'Scenario': 'Savings of $4M, Basic level C, 90% quality score', 'Calculation': '$4M x (50% x 90%)', 'Result': 'ACO receives $1.8M'},
        {'Scenario': 'Loss of $4M, Basic level C', 'Calculation': '30% x $4M, limit 1% of benchmark ($1.2M)', 'Result': 'ACO owes $1.2M'},
        {'Scenario': 'Loss of $4M, Enhanced', 'Calculation': '40% to 75% x $4M, limit 15% of benchmark', 'Result': 'ACO owes $1.6M to $3.0M'},
    ]),
    blk('s3p3', "A third lesson from the example is the effect of the minimum savings rate. If the threshold were, say, 2 percent of benchmark, savings of $2.4 million would be required before anything is shared. Savings below the threshold produce nothing, however real they are, which is why the threshold matters most for small ACOs with volatile spending."),

    h2('s3h2', 'Terms That Sit Outside the Formula'),
    blk('s3b1', "Several design choices determine who is in the denominator and how fast risk rises, and they do not appear in the sharing-rate table. MedPAC reports that all models in both the Basic and Enhanced tracks let an ACO choose each year between prospective and retrospective assignment, and that all require a minimum of 5,000 assigned beneficiaries. Under prospective assignment the ACO knows its panel before the year starts and can direct care management at named patients; under retrospective assignment the panel is provisional until the year ends, so the ACO is managing a population it cannot yet fully name."),
    blk('s3b2', "The Basic track is also a glide path. MedPAC notes that ACOs in it generally must move up at least one level each year until they reach the highest level of risk, level E. An organization entering at level A in a one-sided arrangement is therefore committing to take on losses within a few years, whether or not its care management is ready. Contracts run five years, and since July 2019 have been five years long, where they were previously three. These terms belong in the same financial model as the sharing rate."),

    h2('s4h1', 'What Changes Under a Global Budget'),
    blk('s4p1', "Chapter 7 contrasts the shared savings model with the global budget. Under a global budget the hospital receives its fixed prospective payment regardless of what it spends, so there is no savings calculation, no minimum savings rate and no sharing rate. The savings are the margin between efficient population health management and the fixed budget. The hospital keeps all of the favorable difference and bears all of the unfavorable one, a 100 percent sharing rate in both directions."),
    blk('s4p2', "That raises the stakes on the benchmark. In a shared savings model an error in the benchmark moves a fraction of the money, since the sharing rate applies. In a global budget the same error moves all of it. This is why Chapter 7 treats risk adjustment and benchmark methodology as the core design question for Vermont's first global budgets, and why LEAD, whose Global option shares up to 100 percent of savings and losses, is a different financial proposition from a Basic-track ACO."),
    warning('s4w1', "Do not compare sharing rates in isolation", "A 75 percent sharing rate with a 20 percent savings limit and 40 to 75 percent losses is a different bet from a 50 percent rate with a 10 percent limit and 30 percent losses. Model the contract's three numbers together with your own volatility."),

    takeaway('tw', [
        "Chapter 7's five steps are benchmark setting, performance measurement, the savings calculation, the minimum savings rate and the shared savings calculation.",
        "In the 2026 Shared Savings Program, the maximum sharing rate is 40 percent in Basic levels A and B, 50 percent in Basic levels C to E and 75 percent in the Enhanced track.",
        "Savings are limited to 10 percent of benchmark in Basic and 20 percent in Enhanced; shared losses are 30 percent in Basic levels C to E and 40 to 75 percent in Enhanced.",
        "Quality gates the payment: ACOs must meet a minimum quality threshold to share in savings, and higher quality lowers the shared loss rate in two-sided models.",
        "As of January 2026, 121 ACOs were in one-sided and 390 in two-sided arrangements, serving 12.6 million beneficiaries, according to MedPAC.",
        "Under a global budget there is no sharing rate or minimum savings rate: the hospital keeps the margin and bears the shortfall.",
        "The worked example uses illustrative numbers; the lesson is that the same $4 million swing produces very different outcomes by track.",
    ]),
    quiz('qz',
        "In the Shared Savings Program in 2026, which track has a maximum shared savings rate of 75 percent?",
        [
            ("BASIC levels A and B", False),
            ("BASIC levels C to E", False),
            ("ENHANCED", True),
            ("None; the maximum is 40 percent in all tracks", False),
        ],
        "MedPAC's Table 1 shows a maximum shared savings rate of 40 percent in Basic levels A and B, 50 percent in Basic levels C, D and E and 75 percent in the Enhanced track, with savings limits of 10 percent of benchmark in Basic and 20 percent in Enhanced."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.2.5 and Figure 7.1: the five-step shared savings framework; §7.11: benchmark, MSR and sharing-rate definitions"),
    blk('src2', "[2] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — Table 1 parameters, quality, advanced APM status, ACO counts"),
    blk('src3', "[3] CMS, Medicare Shared Savings Program Shared Savings Program Fast Facts, as of January 1, 2026 — https://www.cms.gov/files/document/2026-shared-savings-program-fast-facts.pdf — ACO counts by track"),
    blk('src4', "[4] CMS, Medicare Shared Savings Program: shared savings and losses, assignment and quality performance standard methodology — https://www.cms.gov/files/document/medicare-shared-savings-program-shared-savings-and-losses-and-assignment-methodology-specifications.pdf-3"),
    blk('src5', "[5] HTR Research Lab, APM Shared Savings Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=apm-calc"),
]

# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'vbcfm-risk-stratification-roi'
L3_TITLE = 'Risk Stratification and the Return on Care Management'
L3 = [
    blk('intro1', "Under fee-for-service, the financial value of finding a high-risk patient before a crisis is limited, because the organization can bill for the extra services. Under value-based care the value can be large: a hospitalization prevented is a cost avoided against a fixed budget or a benchmark. Chapter 7 uses this to explain why population health management is economically rational under value-based payment and often economically irrational under fee-for-service."),
    blk('intro2', "This lesson follows the chapter's worked example, then tests it. It shows how risk stratification sorts a population by need, how to compute the return on a care management program, what the chapter's example assumes about who captures the savings, and how to turn the result into a decision. The example numbers are the book's illustrations; the lesson corrects one common misreading and adds a more cautious version."),
    blk('intro3', "The conclusion is not that care management does not pay. It is that its payoff depends on contract design as much as on clinical effect."),

    h2('s1h1', 'Why Risk Stratification Comes First'),
    blk('s1p1', "A care management program cannot reach everyone. Its staff are scarce and its effect is concentrated in patients at high risk of avoidable events. Risk stratification sorts an attributed population into tiers, using claims, diagnoses, prior utilization and, increasingly, social needs data, so that outreach goes where prevention is most likely to change an outcome. The accuracy of the tiering determines whether the program's dollars buy avoided hospitalizations or merely contact with patients who would have done well anyway."),
    blk('s1p2', "The same data sorts the population for the benchmark. The hierarchical condition category scores that risk-adjust a benchmark, covered in Lesson 1, are also the starting point for stratification. An organization that has complete, accurate diagnosis data has both a fairer benchmark and a better list of whom to call. That connection is why Chapter 7 lists HCC gap analysis as the cheapest Economics investment, an indicative annual cost of $25,000 to $100,000."),

    h2('s2h1', "The Chapter's Worked Example"),
    blk('s2p1', "Chapter 7 gives a clear illustration. A care management program prevents 50 hospitalizations in a population of 10,000 Medicare beneficiaries, at an average cost of $15,000 per hospitalization, generating $750,000 of avoided cost. The program costs $200,000 to operate. The chapter calculates a return of approximately 3.75 to 1, which it describes as a 275 percent return on investment."),
    blk('s2p2', "The two ways of stating it are both correct and often confused. The benefit-to-cost ratio is $750,000 divided by $200,000, which is 3.75. The return on investment is the net benefit, $750,000 minus $200,000, divided by cost, which is 2.75 or 275 percent. A leader reading a business case should know which is being reported, because a ratio of 3.75 and a return of 275 percent describe the same program and sound like different claims."),
    stat_grid('s2sg1', [
        ('50', 'Hospitalizations prevented in the example', 'HTR Chapter 7 worked example, population of 10,000'),
        ('$15,000', 'Assumed cost per hospitalization', 'HTR Chapter 7; an assumption, not a measured figure'),
        ('3.75 : 1', 'Benefit-to-cost ratio', '$750,000 avoided cost divided by $200,000 program cost'),
        ('275%', 'Return on investment', '(Benefit minus cost) divided by cost'),
    ]),

    h2('s3h1', 'Who Captures the Savings?'),
    blk('s3p1', "The example credits the full $750,000 to the organization, which holds only if the organization bears the whole cost of the avoided hospitalizations. That is true of a hospital under a global budget, where a prevented admission frees capacity within revenue that is fixed, or of an organization in a full-risk arrangement. It is not true in a shared savings contract, where the organization receives only the sharing rate of the savings above the minimum threshold, nor under fee-for-service, where the prevented admission reduces revenue."),
    blk('s3p2', "Apply the 2026 Shared Savings Program parameters from Lesson 2 to the same program. If the ACO is in a Basic level with a 50 percent sharing rate, it receives at most $375,000 of the $750,000, and a quality score below the maximum reduces that. Against a $200,000 program cost, the return is about 1.9 to 1, a net return of about 88 percent, still positive but far from 275 percent. If the sharing rate is 40 percent, the ACO receives $300,000 against $200,000 and the ratio is 1.5. And if the ACO's overall savings do not clear its minimum savings rate, nothing is paid however many hospitalizations the program prevented."),
    table('s3t1', 'The same program under different payment arrangements (illustrative arithmetic on the chapter\'s numbers)', [
        {'Arrangement': 'Global budget or full risk', 'Share_of_avoided_cost': '100% ($750,000)', 'Benefit_to_cost': '3.75 : 1', 'Net_return': '275%'},
        {'Arrangement': 'Shared savings, 50% rate', 'Share_of_avoided_cost': '50% ($375,000)', 'Benefit_to_cost': 'About 1.9 : 1', 'Net_return': 'About 88%'},
        {'Arrangement': 'Shared savings, 40% rate', 'Share_of_avoided_cost': '40% ($300,000)', 'Benefit_to_cost': '1.5 : 1', 'Net_return': '50%'},
        {'Arrangement': 'Fee-for-service', 'Share_of_avoided_cost': 'Negative: lost revenue', 'Benefit_to_cost': 'Below 1 : 1', 'Net_return': 'Negative'},
    ]),
    callout('s3c1', "The same program has a different return in each payment arrangement. Before approving a care management investment, find out which share of the avoided cost the contract lets the organization keep."),

    h2('s4h1', 'What the Example Assumes About Effect'),
    blk('s4p1', "The example takes the number of prevented hospitalizations as given. In practice it is the most uncertain input. Chapter 7 gives a measure of the opportunity in Vermont: 32.3 percent of emergency department visits are potentially avoidable, and it illustrates a community health team preventing 500 avoidable emergency visits a year at an assumed $1,800 each, a saving of $900,000 against a $300,000 cost. These are the book's illustrations, built from assumed unit costs. They show the form of the calculation and should not be read as measured results for any program."),
    blk('s4p2', "A decision-grade version replaces the assumptions with local evidence: the organization's own cost per avoided event, the program's measured effect on a comparable group, and the number of patients the program can reach. It also tests sensitivity. If the program prevents only half of the assumed hospitalizations, the benefit-to-cost ratio under a global budget falls from 3.75 to about 1.9, and under a 50 percent sharing rate it falls below 1, which is a loss. The platform's Cost-Effectiveness Analysis Calculator and Shared Savings Calculator are built for exactly this kind of range testing."),

    h2('s4h2', 'Cautions on Stratification Itself'),
    blk('s4b1', "Stratification can fail in a way that is easy to miss. Many tiering tools predict future cost, because cost is what claims data records well. Cost is a proxy for need, and a poor one for patients who face barriers to care: people who use less care because of access, transportation, cost or distrust look healthier on paper than they are. A well-known 2019 study in Science by Obermeyer and colleagues found that a widely used algorithm that used cost as its target systematically under-identified Black patients with the same level of illness, because less had been spent on their care. The lesson for a care management program is to check whom a tiering method misses, and to combine claims-based risk with clinical judgment and with screening for social needs."),
    blk('s4b2', "For a Vermont organization this connects to equity requirements elsewhere in the framework. A program that measures its return only on the patients the algorithm flags may produce a good ratio while leaving the highest-need patients unreached. Report the return together with who was reached, by the demographic and geographic groups the organization is accountable for."),

    h2('s5h1', 'From Return to Decision'),
    steps('s5st1', 'A decision process for a care management investment', [
        ('Define the population and tiers', 'Stratify with complete diagnosis and utilization data and choose the tier where prevention is most plausible.'),
        ('Estimate prevented events with a range', 'Use local evidence and test half and double the central estimate.'),
        ('Price the event', 'Use the organization\'s own cost per hospitalization or visit, not a national average.'),
        ('Apply the contract\'s share and thresholds', 'Multiply by the sharing rate, check the minimum savings rate and quality gate, and apply the caps.'),
        ('Compare with program cost and decide', 'Report both the benefit-to-cost ratio and the net return, and state the payback period.'),
    ]),
    blk('s5p1', "The result informs but does not settle the decision. A program with a modest financial return may still be justified by quality, equity or access goals, and a program with a strong projected return may fail if implementation is poor. What the calculation prevents is the common mistake of approving an investment on the strength of a ratio that the contract will never deliver."),

    takeaway('tw', [
        "Risk stratification sorts an attributed population into tiers so care management reaches patients where prevention is most plausible, and it uses the same diagnosis data that risk-adjusts the benchmark.",
        "Chapter 7's example: 50 hospitalizations prevented at $15,000 each is $750,000 of avoided cost against a $200,000 program, a 3.75 to 1 ratio and a 275 percent return.",
        "Benefit-to-cost ratio and return on investment are different measures of the same program; know which one a business case reports.",
        "The full return holds only when the organization keeps all the avoided cost, as in a global budget or full risk; shared savings pay only the sharing rate and only above the minimum savings rate.",
        "At a 50 percent sharing rate the chapter's example returns about 1.9 to 1, and at 40 percent 1.5 to 1.",
        "Unit costs and prevented-event counts in the chapter are illustrations; replace them with local evidence and test the result at half and double.",
        "Approve a care management investment only after applying the contract's share, thresholds and caps to a range of outcomes.",
    ]),
    quiz('qz',
        "A care management program costs $200,000 and prevents hospitalizations worth $750,000. Under a shared savings contract with a 50 percent sharing rate, and assuming the minimum savings rate is met, what is the approximate benefit-to-cost ratio to the organization?",
        [
            ("3.75 to 1", False),
            ("About 1.9 to 1", True),
            ("About 0.5 to 1", False),
            ("Cannot be determined without knowing the program's staffing", False),
        ],
        "At a 50 percent sharing rate the organization receives $375,000 of the $750,000, which is about 1.9 times the $200,000 cost. The chapter's 3.75 to 1 holds only when the organization keeps all of the avoided cost, as under a global budget."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.2.6 (risk stratification and the care management ROI calculation), §7.3 Figure 7.2 (implementation matrix) and §7.7.1 Figure 7.5 (transformation ROI framework)"),
    blk('src2', "[2] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — sharing rates and quality gating"),
    blk('src3', "[3] HTR Research Lab, Cost-Effectiveness Analysis Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=cea; APM Shared Savings Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=apm-calc"),
    blk('src4', "[4] CMS, Medicare Shared Savings Program Performance Year 2024 Financial and Quality Results (fact sheet, updated September 29, 2025) — https://www.cms.gov/files/document/fact-sheet-ssp-py24-financial-and-quality-results.pdf"),
    blk('src5', "[5] Obermeyer Z, Powers B, Vogeli C, Mullainathan S. Dissecting racial bias in an algorithm used to manage the health of populations. Science 2019;366(6464):447-453 — https://doi.org/10.1126/science.aax2342"),
]

LESSONS = [(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2), (L3_SLUG, L3_TITLE, L3, 3)]
if __name__ == '__main__':
    run(LESSONS)
