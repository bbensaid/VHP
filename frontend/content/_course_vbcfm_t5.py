exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_vbcfm_common.py').read())

# Track 5 — Tools and Capstone. The worked numbers below were computed 2026-11-23 from the platform tools' own rules
# (read from APMCalculator.tsx, APMDesignLab.models.ts and CEACalculator.tsx) at their default inputs; they are this
# course's arithmetic, labelled as such, and show how the tools behave rather than describing any real organization.

# ════════════════════════════════════════════════════════════════════════════
L13_SLUG = 'vbcfm-shared-savings-lab'
L13_TITLE = 'Lab: Running the APM Shared Savings Calculator'
L13 = [
    blk('intro1', "The previous lessons built the shared savings calculation by hand. This lab runs it on the platform's APM Shared Savings Calculator, using its default inputs, and reads the results the way a finance leader would: not as a forecast, but as a sensitivity analysis that shows where a contract is fragile. The numbers below were computed from the tool's own rules and can be reproduced by opening the tool and entering the same inputs."),
    blk('intro2', "The lab has three runs. The first uses a one-sided Shared Savings Program track and shows the minimum savings rate acting as a cliff. The second runs the same performance in the two-sided Enhanced track and shows what the extra sharing rate buys and costs. The third pushes spending above the benchmark to expose the loss side."),
    blk('intro3', "It ends with the tool's limits. A calculator simplifies, and a finance leader should know exactly where."),

    h2('s1h1', 'What the Tool Models'),
    blk('s1p1', "The calculator takes an attributed population, a benchmark per member per month, actual spending as a percentage of the benchmark, a quality score and an administrative cost per member per month. It then applies a chosen model's parameters: the minimum savings rate, the sharing rate, the cap on payment as a share of benchmark, the loss share and the stop-loss ceiling. Its models include the one-sided Shared Savings Program Basic levels A and B, the two-sided Enhanced track, ACO REACH's Global option and a custom model you can define."),
    blk('s1p2', "The tool's source notes record that its parameters were corrected to the governing CMS rules in October 2026. For the one-sided Basic track the sharing rate is up to 40 percent, with a payment cap of 10 percent of benchmark and a minimum savings rate that slides with the number of attributed lives, from 3.9 percent at 5,000 lives to 2.0 percent at 60,000. For the Enhanced track the sharing rate is up to 75 percent with a 20 percent cap, a loss rate of one minus 0.75 times the quality score bounded between 40 and 75 percent, and a loss ceiling of 15 percent of benchmark. These match the parameters in MedPAC's October 2026 table covered in Lesson 2."),
    blk('s1p3', "The tool also reports a pessimistic, base and optimistic spread. It flexes the savings margin, the distance of spending from the benchmark, by 20 percent in each direction, with a floor of one percentage point, so that the range never collapses when the base case sits near the benchmark. That spread is the most useful output for a finance leader because it shows how a plausible swing changes the payment."),

    h2('s2h1', 'Run One: A One-Sided Contract and the Cliff'),
    blk('s2p1', "Use the tool's defaults: 8,000 attributed lives, a benchmark of $1,050 per member per month, spending at 96 percent of benchmark, a quality score of 85 and administrative cost of $18 per member per month, with the one-sided Basic model. The annual benchmark is 8,000 times $1,050 times 12, which is $100.8 million. Spending at 96 percent is $96.768 million, so gross savings are $4.032 million, or 4.0 percent."),
    blk('s2p2', "At 8,000 lives the minimum savings rate is 3.2 percent, so savings of 4.0 percent clear it. The organization receives 40 percent of $4.032 million, which is $1.6128 million. But administrative cost is $18 times 8,000 times 12, which is $1.728 million. The net position is a loss of about $115,000. A genuinely good year in cost terms, 4 percent below benchmark, does not cover the cost of administering the contract at this sharing rate."),
    blk('s2p3', "Now look at the spread. In the pessimistic case spending rises to 97 percent of benchmark. Savings fall to 3.0 percent, below the 3.2 percent minimum, and the payment is zero, leaving a net loss of $1.728 million, all of it administrative cost. In the optimistic case spending falls to 95 percent, savings are 5.0 percent, the payment is 40 percent of $5.04 million, which is $2.016 million, and the net position is a gain of $288,000. A one-point swing in spending, about $1 million, moves the net position from a $1.7 million loss to a $288,000 gain, because the minimum savings rate turns a modest shortfall into a complete loss of the payment."),
    table('s2t1', 'Run one: one-sided Basic track, 8,000 lives, $1,050 PMPM, $18 PMPM administrative cost (computed from the tool\'s rules)', [
        {'Case': 'Pessimistic (spend 97% of benchmark)', 'Gross_savings': '$3.024M (3.0%)', 'Payment': '$0 (below 3.2% MSR)', 'Net_after_admin': '-$1.728M'},
        {'Case': 'Base (96%)', 'Gross_savings': '$4.032M (4.0%)', 'Payment': '$1.613M', 'Net_after_admin': '-$0.115M'},
        {'Case': 'Optimistic (95%)', 'Gross_savings': '$5.040M (5.0%)', 'Payment': '$2.016M', 'Net_after_admin': '+$0.288M'},
    ]),
    callout('s2c1', "The minimum savings rate is a cliff, not a slope. Savings just below it earn nothing, so a contract's value is highly sensitive to where performance lands relative to the threshold."),

    h2('s3h1', 'Run Two: The Enhanced Track'),
    blk('s3p1', "Switch the model to the Enhanced track with the same inputs. The tool's default minimum savings rate for this track is 2 percent, the elected symmetric threshold. At base, 4.0 percent savings clear it, and the organization receives 75 percent of $4.032 million, which is $3.024 million. After the same $1.728 million of administrative cost, the net position is a gain of about $1.296 million. In the pessimistic case, savings of 3.0 percent still clear the 2 percent threshold, the payment is 75 percent of $3.024 million, or $2.268 million, and the net position is $540,000. In the optimistic case the payment is $3.78 million and the net position about $2.05 million."),
    blk('s3p2', "The Enhanced track pays much more for the same performance, because the sharing rate is higher and the threshold lower. The price is on the other side. Now set spending at 102 percent of benchmark. Gross loss is $2.016 million, or 2.0 percent, just meeting the symmetric threshold. With a quality score of 85 the loss rate formula gives 36 percent, which the tool bounds up to 40 percent, so the organization owes about $806,000, and with administrative cost its net position is about negative $2.5 million. The loss ceiling of 15 percent of benchmark, $15.1 million, is far above this."),
    table('s3t1', 'Run two: Enhanced track, same inputs (computed from the tool\'s rules)', [
        {'Case': 'Pessimistic (97%)', 'Payment_or_loss': '+$2.268M', 'Net_after_admin': '+$0.540M'},
        {'Case': 'Base (96%)', 'Payment_or_loss': '+$3.024M', 'Net_after_admin': '+$1.296M'},
        {'Case': 'Optimistic (95%)', 'Payment_or_loss': '+$3.780M', 'Net_after_admin': '+$2.052M'},
        {'Case': 'Spending 102% of benchmark', 'Payment_or_loss': '-$0.806M (40% of $2.016M)', 'Net_after_admin': '-$2.534M'},
    ]),
    blk('s3p3', "Read the two runs together. For an organization confident of spending below 97 percent of benchmark, the Enhanced track is attractive. For one whose spending could land anywhere from 95 to 102 percent, the one-sided track limits the downside at the cost of a cliff and a low sharing rate, and the Enhanced track exposes it to losses that its administrative cost compounds. That is the decision the readiness assessment of Lesson 5 is meant to inform."),

    h2('s4h1', "The Tool's Limits"),
    blk('s4p1', "The calculator is a teaching and screening tool, and several simplifications matter. It treats quality as a threshold: below a score of 70 a withhold applies, and at or above it the full payment is made. MedPAC describes the program as requiring a minimum quality performance level to share in savings and lowering the shared loss rate as quality rises, so the tool's treatment is coarser than the program's. It adds administrative cost as a flat amount per member per month, which is a useful reminder that contracts cost money to run, but real costs depend on the organization. It does not model risk score growth caps, benchmark adjustments, regional or prior-savings effects, or prospective versus retrospective attribution."),
    blk('s4p2', "Use it, therefore, to understand structure, such as the cliff, the effect of a sharing rate, the cap and the loss ceiling, and to run ranges. Do not use its output as the contract's value without checking the current CMS specifications and the organization's own benchmark."),
    warning('s4w1', "Computed figures are illustrations of tool behavior", "The numbers in this lab come from the tool's default inputs. Real attributed lives, benchmarks, risk scores and costs will differ, and the program's rules change; confirm current parameters in CMS documents before relying on any result."),

    h2('s5h1', 'Using the Results in a Decision'),
    blk('s5p1', "Translate the runs into questions for management. How likely is spending to land above the minimum savings rate, and what does the organization's own history say about year-to-year variation in cost for a population of this size? How much of the payment is consumed by the cost of running the contract, and can that cost be reduced, perhaps by sharing analytics across contracts? Does the organization have the care management capacity and the data to move spending by the amount the base case assumes? And what would the organization do in the year it lands in the pessimistic case, since a contract that cannot be survived in its worst plausible year should not be signed, whatever its average."),
    blk('s5p2', "The calculator also shows why the contract checklist of Lesson 6 matters. The minimum savings rate, the sharing rate, the cap and the loss ceiling are all contract terms, and the runs above show that small differences in them change the outcome by more than the clinical work does. A team that spends months on care management and an afternoon on the contract has it backwards."),

    takeaway('tw', [
        "With the tool's defaults, 8,000 lives and a $1,050 PMPM benchmark give an annual benchmark of $100.8 million; spending at 96 percent produces $4.032 million of gross savings.",
        "In the one-sided Basic track the minimum savings rate at 8,000 lives is 3.2 percent, so a 4.0 percent saving earns a payment of about $1.613 million.",
        "With $18 PMPM of administrative cost, equal to $1.728 million a year, that payment leaves a net loss of about $115,000.",
        "Moving spending from 96 to 97 percent of benchmark drops savings below the minimum savings rate and the payment to zero, a cliff, leaving a net loss of $1.728 million.",
        "In the Enhanced track the same performance pays about $3.024 million and nets about $1.296 million, but spending at 102 percent of benchmark costs about $806,000 in shared losses and nets about negative $2.5 million.",
        "The tool treats quality as a threshold at 70 and omits risk score caps and regional adjustments, so use it for structure and ranges, not as a contract valuation.",
        "Choose a track by comparing the spread of outcomes with the organization's readiness and volatility, not by comparing sharing rates alone.",
    ]),
    quiz('qz',
        "In run one, why does the net position fall from about negative $115,000 to negative $1.73 million when spending rises from 96 to 97 percent of benchmark?",
        [
            ("Because the sharing rate falls from 40 percent to 0 percent", False),
            ("Because savings drop to 3.0 percent, below the 3.2 percent minimum savings rate, so the payment is zero and only administrative cost remains", True),
            ("Because the quality score falls below 70", False),
            ("Because the benchmark itself is reduced", False),
        ],
        "At 97 percent of benchmark savings are 3.0 percent, below the 3.2 percent minimum savings rate for 8,000 lives, so nothing is paid and the organization bears the $1.728 million administrative cost. The sharing rate and quality score are unchanged."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] HTR Research Lab, APM Shared Savings Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=apm-calc — models, inputs, spread and source notes read from the tool on 2026-11-23"),
    blk('src2', "[2] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — Table 1 parameters and quality treatment"),
    blk('src3', "[3] " + BOOK7 + " — §7.2.5 and §7.9: the shared savings framework and the platform tools"),
    blk('src4', "[4] 42 CFR 425.605 and 425.610 (benchmark, savings and loss) — https://www.law.cornell.edu/cfr/text/42/425.605 — cited by the tool's source notes for the sharing and loss rules"),
]

# ════════════════════════════════════════════════════════════════════════════
L14_SLUG = 'vbcfm-cost-effectiveness-vs-roi'
L14_TITLE = 'Cost-Effectiveness Versus Budget Return: Two Different Questions'
L14 = [
    blk('intro1', "Two questions get confused in health care finance. Is this intervention worth buying for the health it produces? And will it pay for itself in the budget? The first is a cost-effectiveness question and the second is a budget return question. An intervention can be excellent value for the health it buys and still raise spending, and an intervention can cut spending and still not be worth much to patients. A leader who runs only one calculation will sometimes make the wrong decision."),
    blk('intro2', "This lesson explains the two measures, uses the platform's Cost-Effectiveness Analysis Calculator to compute an incremental cost-effectiveness ratio with the tool's own formulas, shows where the tool's thresholds come from and where they are contested, and gives a rule for when each question governs. It also describes the tool's Investment Tracker companion, which checks whether capital is running ahead of the framework's dependency order."),
    blk('intro3', "All the figures in the lesson are from the tool's illustrative presets, which the tool itself labels as illustrative starting points and not values from a particular study."),

    h2('s1h1', 'Two Measures'),
    blk('s1p1', "Cost-effectiveness analysis compares the incremental cost of an intervention with the incremental health it produces, usually in quality-adjusted life years, abbreviated QALYs. The result is an incremental cost-effectiveness ratio, or ICER: cost per QALY gained. It answers whether the health gain is worth its price against a threshold of willingness to pay. It does not say whether the budget is better off."),
    blk('s1p2', "Budget return compares the cost of an intervention with the spending it avoids for a particular payer over a particular period, as Lessons 3 and 10 did. It answers whether the organization's finances improve. It does not say whether the health gain is worth the money, and it ignores benefits that do not show up as avoided spending, such as a longer, better life."),
    callout('s1c1', "Cost-effectiveness asks whether the health gain is worth the price. Budget return asks whether the money comes back. A program can pass one test and fail the other."),

    h2('s2h1', 'How the Calculator Works'),
    blk('s2p1', "The Cost-Effectiveness Analysis Calculator takes a cost per patient, an efficacy rate, a QALY gain per responder, a population size, a time horizon, a discount rate and an optional comparator cost per patient. It computes the number of responders as the population times the efficacy rate, total program cost as cost per patient times population, incremental cost after subtracting the comparator, total QALYs as responders times QALY gain, and discounted QALYs using an annuity factor over the time horizon at the chosen discount rate. The ICER is incremental cost divided by discounted QALYs."),
    blk('s2p2', "Take the tool's heart failure remote monitoring preset. It uses a cost of $2,800 per patient, an efficacy rate of 45 percent and a gain of 0.22 QALYs per responder. For a population of 10,000, a five-year horizon and a 3 percent discount rate, the number of responders is 4,500, total cost is $28 million, total QALYs are 990 and the discounted QALYs are about 907, since the five-year annuity factor at 3 percent is about 4.58. The ICER is about $30,900 per QALY. The tool labels that cost-effective at its standard threshold, because it falls between $30,000 and $100,000."),
    table('s2t1', 'Illustrative ICERs from the calculator\'s presets (10,000 patients, 5-year horizon, 3% discount, no comparator cost)', [
        {'Preset': 'Hypertension: community pharmacist program', 'Cost_per_patient': '$420', 'Efficacy': '70%', 'QALY_gain': '0.12', 'ICER_per_QALY': 'About $5,500'},
        {'Preset': 'Opioid use disorder: MOUD', 'Cost_per_patient': '$5,600', 'Efficacy': '50%', 'QALY_gain': '0.45', 'ICER_per_QALY': 'About $27,200'},
        {'Preset': 'Heart failure: remote monitoring', 'Cost_per_patient': '$2,800', 'Efficacy': '45%', 'QALY_gain': '0.22', 'ICER_per_QALY': 'About $30,900'},
        {'Preset': 'Sepsis: early warning AI system', 'Cost_per_patient': '$6,800', 'Efficacy': '38%', 'QALY_gain': '0.62', 'ICER_per_QALY': 'About $31,500'},
    ]),
    warning('s2w1', "The presets are illustrative, not study results", "The tool states that the preset costs, efficacy rates and QALY gains cite no study. Replace them with evidence for your program before drawing any conclusion from the ICER."),

    h2('s3h1', 'Thresholds Are Judgments'),
    blk('s3p1', "The tool compares the ICER with four reference lines: an upper bound near 30,000 pounds used by the United Kingdom's NICE, a standard of $100,000 per QALY, a higher line of $150,000 and a line it labels informal CMS at $200,000. These are conventions. No single threshold is a law of economics, and the right line depends on the decision maker's budget and values. Medicare generally does not apply a cost-per-QALY threshold in its coverage decisions, so the label on the highest line should be read as the tool's reference and not as a CMS rule."),
    blk('s3p2', "Three further cautions apply. The ICER is only as good as the efficacy rate and QALY gain, which come from evidence the user supplies. The tool counts a program cost and not the downstream spending the program avoids, unless the user enters it through the comparator input, so an intervention that saves money is understated. And the discounting is a simplification, so the output is a screening estimate and not a full health-economic model."),

    blk('s3p3', "A related caution concerns time. The calculator spreads QALYs over the time horizon and discounts them, but treats program cost as a single amount. A program that must be funded every year, such as a staffed care team, has a cost that recurs, so a five-year horizon with a one-time cost understates it. When using the tool for a recurring program, enter the cost per patient over the whole horizon, not the annual cost, or the ICER will look better than it actually is, which a skeptical reviewer will notice quickly."),

    h2('s4h1', 'Which Question Governs?'),
    blk('s4p1', "The answer depends on who is deciding and what they are accountable for. A hospital under a global budget is accountable for staying within a fixed revenue amount, and a program that does not return its cost in avoided spending reduces its margin, however many QALYs it produces. For that decision budget return governs, subject to quality and equity commitments. A public payer or a state deciding what to cover is accountable for health produced per dollar across a population, so cost-effectiveness governs. A health system deciding whether to invest in a program that adds value but costs money should be explicit that it is buying health, and should find the money elsewhere."),
    blk('s4p2', "Sometimes the two agree. An intervention that avoids more spending than it costs and also improves health is a clear yes on both. When they disagree the leader should say so and decide deliberately. Hiding a program that costs money behind a budget return that includes assumed savings is the error this lesson is meant to prevent."),
    steps('s4st1', 'A rule for combining the two', [
        ('Compute budget return under the real payment arrangement', 'Apply the sharing rate and thresholds from Lessons 2 and 3.'),
        ('Compute the ICER with evidence-based inputs', 'Enter local costs, response rates and QALY gains, and include avoided spending in the comparator.'),
        ('Classify the result', 'Pays for itself and cost-effective; cost-effective but not self-financing; self-financing but low value; neither.'),
        ('Decide who funds what', 'For cost-effective but not self-financing programs, name the funding source and why it should pay.'),
    ]),

    h2('s5h1', 'Checking That Capital Follows the Sequence'),
    blk('s5p1', "Chapter 7 lists the platform's Investment Tracker among its Economics tools, with the aim of tracking capital committed against each pillar and finding where funding runs ahead of dependency order. The tracker itself is a feed of healthcare merger, private equity and venture deals drawn from a content system, and the platform adds a dependency check alongside it: it sums each pillar's disclosed deal value and runs it against a reference state for Vermont, to show which pillars have capital behind a gate that is not yet open. The tool states that it is Vermont-specific by construction."),
    blk('s5p2', "The relevance to finance leaders is the principle behind it. In the book's framework, downstream investments yield little if upstream constraints are unresolved. A hospital spending heavily on care management before it can identify its attributed population, or a state funding clinical programs before the analytics exist, is moving money faster than the sequence. The readiness assessment of Lesson 5 is the organization-level version of the same check."),

    takeaway('tw', [
        "Cost-effectiveness asks whether a health gain is worth its price in cost per QALY; budget return asks whether the spending comes back; a program can pass one and fail the other.",
        "The calculator computes the ICER as incremental cost divided by discounted QALYs, using responders, QALY gain per responder, the time horizon and the discount rate.",
        "With the heart failure remote monitoring preset, 10,000 patients, five years and 3 percent discounting, the ICER is about $30,900 per QALY; the preset values are illustrative, not from a study.",
        "The tool's reference thresholds, including NICE's upper bound near 30,000 pounds and $100,000, $150,000 and $200,000 per QALY, are conventions; Medicare generally does not apply a cost-per-QALY threshold in coverage decisions.",
        "The tool counts program cost but not avoided downstream spending unless entered through the comparator input, so it understates interventions that save money.",
        "Budget return governs a hospital's decision under a global budget; cost-effectiveness governs a payer's or state's coverage decision; say which question you are answering.",
        "The Investment Tracker's dependency check applies the same principle at the capital level: money moving faster than the sequence is an early warning.",
    ]),
    quiz('qz',
        "A program is highly cost-effective at $20,000 per QALY but does not reduce the hospital's spending enough to cover its cost under a global budget. What is the right conclusion?",
        [
            ("It must be rejected because it does not pay for itself", False),
            ("It buys health at good value but is not self-financing, so the organization should decide deliberately who funds it and why", True),
            ("It must be adopted because every cost-effective program pays for itself", False),
            ("The two measures always agree, so one of them must be miscalculated", False),
        ],
        "Cost-effectiveness and budget return answer different questions. A program can deliver good value for health produced and still raise spending. The honest approach is to classify it as cost-effective but not self-financing and to name the funding source."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] HTR Research Lab, Cost-Effectiveness Analysis Calculator — https://healthtransformationreview.org/research-lab/payment-models?tab=cea — formulas, presets and thresholds read from the tool on 2026-11-23"),
    blk('src2', "[2] HTR Investment Tracker — https://healthtransformationreview.org/investment-tracker — deal feed and dependency-order check; source notes read from the component on 2026-11-23"),
    blk('src3', "[3] " + BOOK7 + " — §7.9 and Figure 7.6: platform tools for the Economics pillar; §7.7: the transformation ROI framework"),
    blk('src4', "[4] Health Transformation Review, framework dependency engine — https://healthtransformationreview.org/htr-simulator — the sequence logic the tracker's check uses"),
]

# ════════════════════════════════════════════════════════════════════════════
L15_SLUG = 'vbcfm-capstone-financial-case'
L15_TITLE = 'Capstone: Build and Defend a Financial Case'
L15 = [
    blk('intro1', "The capstone ties the course together. You will choose an organization and a transformation investment, assess readiness, review a contract, model the contract's shared savings, stress-test the organization's finances, size the return and write the one-page case that Lesson 12 described. The deliverable is the case. The process is the one a finance leader would follow before asking a board or a payer to commit money."),
    blk('intro2', "It is designed to take about an hour with the platform's tools open, and it uses six of them: the VBC Readiness Assessment, the VBC Contract Review Checklist, the APM Shared Savings Calculator, the Hospital Financial Stress Test, the Cost-Effectiveness Analysis Calculator and the Investment Tracker. Where an input is not available, state it as an assumption and give its rung on the evidence ladder."),
    blk('intro3', "Choose a real organization you know, or Vermont as a reference case. Keep the choice fixed through every step."),

    h2('s1h1', 'Step One: Choose the Organization and the Investment'),
    blk('s1p1', "Write two sentences. The first names the organization, its type and its payment exposure: a Vermont hospital approaching a global budget, an independent physician group considering an ACO track, a health system negotiating a commercial contract. The second names one investment you propose, such as a care management program, a community health team expansion, a remote monitoring program or a coding and documentation improvement program, with its approximate annual cost."),
    blk('s1p2', "A good choice is specific enough that its costs and effects can be estimated, and important enough that a decision-maker would care about the answer. Avoid proposing everything at once. A capstone case for a single investment is stronger than a plan for a transformation."),

    h2('s2h1', 'Step Two: Readiness and Contract'),
    blk('s2p1', "Open the VBC Readiness Assessment and score the organization across the thirty dimensions, writing down for each score above two the evidence that supports it. Record the overall percentage, the band and the weakest fully scored domain. State whether the investment you proposed addresses that domain, or depends on it. If the weakest domain is Revenue Cycle or Data and Technology and the investment is a care management program, say plainly that the sequence needs a different first step, or justify why the program can go ahead."),
    blk('s2p2', "Open the VBC Contract Review Checklist and review the contract the organization has or would sign. If no contract is available, use a summary of one, such as MedPAC's description of Shared Savings Program terms. Mark each provision present, partial or missing, and list the open critical gaps by category. Pick the three with the largest dollar effect and price each: what would a bad year cost under the current term and under the term you want?"),

    h2('s3h1', 'Step Three: Model the Contract and Stress the Organization'),
    blk('s3p1', "Open the APM Shared Savings Calculator and enter the organization's attributed lives, benchmark per member per month and administrative cost. Run the base case and read the pessimistic and optimistic spread. Note whether the minimum savings rate acts as a cliff, whether the cap or the loss ceiling binds, and how the net position changes after administrative cost. Compare at least two tracks or models, as Lesson 13 did, and say which fits the organization's readiness and volatility."),
    blk('s3p2', "Then open the Hospital Financial Stress Test for a hospital, or build the equivalent for another organization from its own financials. Run the scenario that fits: reference-based pricing at 200 and 250 percent of Medicare, the global budget revenue cap, the H.R. 1 Medicaid phase-in or the transformation investment. Record operating margin, days cash on hand and debt service coverage, and name the thinnest year. State whether your proposed investment improves or worsens that year, including its amortization cost."),
    steps('s3st1', 'What to record from the tools', [
        ('Readiness', 'Overall percent, band and the weakest fully scored domain, with evidence for scores above two.'),
        ('Contract', 'Open critical gaps by category and the dollar effect of the three largest.'),
        ('Shared savings', 'Net position in pessimistic, base and optimistic cases; the cliff, cap and loss ceiling.'),
        ('Stress test', 'Margin, days cash on hand and debt service coverage in the thinnest year, with and without the investment.'),
    ]),

    h2('s4h1', 'Step Four: Size the Return, Honestly'),
    blk('s4p1', "Use Lesson 10's framework. List every input in the return calculation, mark each with its rung on the evidence ladder and show the share of the avoided cost the organization keeps under the real payment arrangement. Compute the breakeven number of prevented events. Show cumulative cash by year and the payback period, and present a pessimistic, central and optimistic case. If the investment buys health more than it saves money, run the Cost-Effectiveness Analysis Calculator with your own inputs and state whether it is cost-effective but not self-financing."),
    blk('s4p2', "Be especially careful with the figures that come from the book's examples or the tools' presets. State plainly if a number is an assumption, and do not let an illustration slip into the case as a finding. If you cite Vermont's Blueprint returns, give the range and the provenance, and quote the program's own caution about its risk-adjusted comparison."),

    h2('s5h1', 'Step Five: Write the One-Page Case'),
    blk('s5p1', "Use the six-part structure from Lesson 12. State the problem and its cost if unaddressed, with a source. State the proposal, its cost and how it is financed after any grant. Show the return as a range with the evidence rung and the share of savings kept. State the readiness and risk position, naming the binding constraint and what is being done about it. State the measures, the review dates and the stop trigger. And state the decision requested and the date it is needed. Everything else goes in an appendix."),
    table('s5t1', 'Self-review rubric', [
        {'Criterion': 'Sources', 'Test': 'Is every figure traced to a document, a tool run or a labeled assumption?'},
        {'Criterion': 'Range', 'Test': 'Are there three cases and a breakeven, not a single number?'},
        {'Criterion': 'Share of savings', 'Test': 'Is the return stated under the real payment arrangement?'},
        {'Criterion': 'Readiness', 'Test': 'Does the proposal address or respect the binding constraint?'},
        {'Criterion': 'Risk', 'Test': 'Does it show the thinnest year and the effect of the investment on it?'},
        {'Criterion': 'Decision', 'Test': 'Is there one recommendation, a stop trigger and a decision date?'},
    ]),
    warning('s5w1', "Mark what you could not verify", "If an input could not be confirmed from a document, say so in the case. A decision-maker can work with a flagged assumption; a hidden one is a trap."),

    blk('s5p2', "Finally, say what you would do if the case is approved and what you would do if it is not. A decision-maker is more likely to approve a proposal that has a clear fallback, such as a smaller pilot with a defined measure, than one that asks for an all-or-nothing commitment. Name the first ninety days: who is hired or reassigned, what data is connected, which measure is reported first and when the board will see it. A case that ends with a plan for the first quarter is a case that expects to be acted on."),
    blk('s5p3', "If you are presenting to a board, a payer or a legislature, adapt the framing to the audience as Lesson 12 describes while keeping the numbers identical. The most damaging mistake in a financial case is telling different audiences different numbers, which is quickly discovered and costs the proposer's credibility on everything else."),

    h2('s6h1', 'Reflection'),
    blk('s6p1', "When the case is written, test it against the course's main ideas. Did you identify how the benchmark is built and who it favors? Did you apply the contract's sharing rate, thresholds and caps instead of assuming the organization keeps all the savings? Did you check readiness before proposing a program that depends on it? Did you stress-test the organization in its thinnest years? And did you separate what is measured from what is assumed?"),
    blk('s6p2', "A finance leader's credibility is built on a record of cases that held up. Keep the case, the tool runs and the list of assumptions together, and revisit them when the Board publishes its methodology, when a contract is amended or when actual results arrive. The assumptions that turn out wrong are the most valuable data you will collect."),

    takeaway('tw', [
        "The capstone builds a one-page financial case for a single investment using six platform tools: readiness, contract review, shared savings, stress test, cost-effectiveness and the investment tracker.",
        "Score readiness with evidence for any score above two and identify the weakest fully scored domain before proposing a program that depends on it.",
        "Review the contract against the eight categories, and price the three largest critical gaps in dollars for a bad year.",
        "Model at least two tracks in the shared savings calculator, noting the minimum savings rate cliff, the cap and the loss ceiling.",
        "Stress-test the organization and show whether the investment improves or worsens the thinnest year.",
        "Size the return with the evidence ladder, the share of savings kept, a breakeven and a three-case range, and say whether the program is self-financing.",
        "Write the one-page case with six parts and mark every assumption you could not verify.",
    ]),
    quiz('qz',
        "Which of the following best describes how the capstone expects you to treat an input taken from a tool preset or a book example?",
        [
            ("Treat it as a verified finding and cite it as fact", False),
            ("State plainly that it is an assumption, mark its rung on the evidence ladder and test a range around it", True),
            ("Omit it from the case entirely", False),
            ("Replace it with the highest figure available to strengthen the case", False),
        ],
        "Presets and book examples are illustrations. The capstone asks you to label them as assumptions, mark their rung on the evidence ladder and test the answer across a range, so a decision-maker can see what the case rests on."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK7 + " — §7.9 Figure 7.6: the platform tools for the Economics pillar"),
    blk('src2', "[2] HTR Research Lab — VBC Readiness Assessment (https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness); VBC Contract Review Checklist (https://healthtransformationreview.org/research-lab/payment-models?tab=contract-review); APM Shared Savings Calculator (https://healthtransformationreview.org/research-lab/payment-models?tab=apm-calc); Cost-Effectiveness Analysis Calculator (https://healthtransformationreview.org/research-lab/payment-models?tab=cea)"),
    blk('src3', "[3] HTR Research Lab, Hospital Financial Stress Test — https://healthtransformationreview.org/research-lab/policy-quality?tab=scorecard; HTR Investment Tracker — https://healthtransformationreview.org/investment-tracker"),
    blk('src4', "[4] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — a public example of contract terms for step two"),
    blk('src5', "[5] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — a worked example of reporting an evidence limit candidly"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
