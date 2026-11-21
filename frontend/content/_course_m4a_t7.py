exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 7 — What to Build Now, and Capstone
# Facts: HTR book Ch. 1 §1.12.1, §1.12.2 (parallel work, quoted), Ch. 8 (VHCURES); Act 48; Act 68 (VERIFIED_FACTS.md:
# global budgets HFY2028, Strategic Plan Jan 15, 2028, primary-care spending targets § 9403(b)(7)); S.1506 §§ 401, 602,
# 611; CBO 2022; Vermont RHT Year 1 signed agreements by initiative (frontend/lib/data/rht-review/vermont-year1.json,
# state list of Oct 30, 2026); Modeler outputs (Track 6); tools.ts descriptions for platform tools. 2026-11-21.

SRC['rhtreview'] = "HTR, RHT Program Review: Vermont Year 1 (from the State of Vermont's list of executed agreements, Oct 30, 2026) — https://healthtransformationreview.org/rht-review/vermont"
SRC['sim'] = "HTR Simulator — https://healthtransformationreview.org/htr-simulator"

# ════════════════════════════════════════════════════════════════════════════
L17_SLUG = 'm4a-what-to-build-now'
L17_TITLE = 'What to Build Before Authority Arrives'
L17 = [
    blk('intro1', "Track 5 found the Policy gate for Medicare for All closed, and with it the Economics, Clinical and Operations gates downstream. It would be easy to conclude that nothing can be done until Congress acts. Chapter 1 of Transforming Healthcare says otherwise, and this lesson applies its reasoning."),
    blk('intro2', "The lesson sets out the book's principle on parallel work, then identifies the work in each pillar that does not depend on a closed gate: data, payment design, workforce and institutions. It shows that each is valuable whatever the eventual reform is, and that Vermont is already doing some of it."),

    h2('s1h1', 'The Principle: Parallel Work, Not Premature Work'),
    blk('s1p1', "Section 1.12.2 of the book states the principle: \"The critical path is sequential by definition. But the framework does not require that all work be sequential. Many investments can proceed in parallel, as long as none of the parallel tracks violates a critical-path dependency.\" Its diagnostic question for any proposed investment is: \"does it have an unmet upstream dependency?\""),
    blk('s1p2', "If the answer is yes, the book says, \"it is not parallel work. It is premature work that will produce either wasted results or results that cannot be used until the upstream dependency is met.\" If the answer is no, the work can proceed now and will deliver its full value whenever the gate ahead of it opens. The book's Vermont examples include designing a social risk adjustment methodology for global budgets and training hospital transformation teams while the Technology gate is still being opened."),
    quote('s1q1', "\"The diagnostic question for any proposed parallel investment: does it have an unmet upstream dependency?\" (Transforming Healthcare, §1.12.2)"),
    compare('s1cmp1', 'Parallel work versus premature work',
        'Parallel: proceed now', ['Delivers its value without the closed gate', 'Useful under any eventual reform', 'Example: designing a payment method', 'Example: training a workforce'],
        'Premature: wait', ['Depends on a gate that is still closed', 'Wasted or unusable until then', 'Example: signing full-risk contracts before analytics work', 'Example: promising coverage before financing exists']),

    h2('s2h1', 'Technology: Build the Information Now'),
    blk('s2p1', "The Technology gate is the one Track 5 rated conditionally open. The missing piece is volume and cost information for patients who are privately insured, which any national budget, any global budget and any rate-setting system needs. Building it does not depend on Congress passing Medicare for All. It serves Vermont's Act 68 global budgets, reference-based pricing and the Statewide Health Care Delivery Strategic Plan just as well."),
    blk('s2p2', "Vermont already has the core of it. Act 48 directed the state's unified health care database, VHCURES, to serve the Green Mountain Care Board, and Chapter 8 of the book describes VHCURES, linked to the Blueprint clinical registry, as enabling quality measurement across the full population. The constraint is legal: the book recounts that Gobeille v. Liberty Mutual (2016) held that ERISA preempts state requirements for self-insured plans to report claims to all-payer databases. Work within that limit, through voluntary reporting and insured-market data, is parallel work; a national reporting standard like S.1506's § 401(b) is what would eventually close the gap."),
    callout('s2c1', "Information about privately insured volume and cost is needed under every reform on the table. Building it is parallel work, not premature work."),

    h2('s3h1', 'Economics: Design the Method, Do Not Deploy It Early'),
    blk('s3p1', "The Economics gate is closed because there is no money behind the incentives. Designing the incentives is a different matter. A global-budget method that works for small and rural hospitals is needed whether the payer is a federal single payer, a federal-state agreement or Vermont's own Act 68 regime, which requires hospital global budgets from hospital fiscal year 2028 to the extent resources allow."),
    blk('s3p2', "Track 6 showed why the design question is hard. A single rate redistributes revenue by payer mix, hitting the hospital with the highest commercial share; a cost-based budget redistributes by margin, removing surpluses and rescuing deficits. A method that is fair to a critical-access hospital and still rewards efficiency is a real design problem, and solving it now is parallel work. Deploying it as a full-risk contract before the information is in place would be premature work, exactly the error Chapter 1 warns of when a hospital signs a global budget before its analytics are operational."),
    warning('s3w1', 'Design is parallel; deployment is not', "Working out how global budgets should be set for small hospitals can proceed now. Putting hospitals at full financial risk under them before the data and the money exist would violate two critical-path dependencies at once."),

    h2('s4h1', 'Operations: Build the Workforce'),
    blk('s4p1', "Operations is the last gate and was rated closed. But workforce is a capacity every reform needs, and the evidence says it is the binding constraint under a single payer: CBO projects demand rising faster than supply, and warns that lower payments might mean fewer people entering the health professions. S.1506 itself sets aside money for displaced insurance workers and budgets for health-professional education, but only once it is enacted."),
    blk('s4p2', "Vermont is already doing some of this work without any federal reform. Its Rural Health Transformation Program has a Health Care Workforce Development initiative; the state's list of executed Year 1 agreements, as compiled in the platform's RHT review, shows about $26.7 million signed under it by October 30, 2026. Training and retaining clinicians, especially in rural areas, delivers its value under Act 68, under a buy-in, or under Medicare for All."),
    stat_grid('s4sg1', [
        ('$26.7M', 'Signed Year 1 RHT agreements, Workforce Development', 'State of Vermont agreement list (Oct 30, 2026), via HTR RHT review'),
        ('Demand > supply', 'CBO\'s projection under single payer', 'CBO, May 12, 2022'),
        ('Jan 15, 2028', 'Vermont Statewide Health Care Delivery Strategic Plan due', 'Act 68 of 2025, 18 V.S.A. § 9403(d)(3)'),
    ]),

    h2('s5h1', 'Policy: Issue the Authority That Can Be Issued'),
    blk('s5p1', "The Policy gate for the full reform is closed, but not every piece of authority waits on it. A buy-in for an age group can be enacted on its own, as the Medicare at 50 Act proposes. Reporting standards and institutions can be created without settling the end state."),
    blk('s5p2', "Act 48 is the precedent. Its most durable achievement was authority for an institution, the Green Mountain Care Board, which proved useful whether or not the single-payer plan went ahead. Act 68's Statewide Health Care Delivery Strategic Plan, due January 15, 2028 and required to include annual targets for total cost of care and for the share of spending on primary care, is another piece of authority that will matter under any federal outcome."),
    steps('s5st1', 'Applying the parallel-work test to a proposal', [
        ('Name the work', 'For example: a statewide standard for reporting hospital volume and cost by payer.'),
        ('List its upstream dependencies', 'What must already be true for it to deliver its value?'),
        ('Check each gate', 'Is any of those dependencies behind a closed gate?'),
        ('Decide', 'If none is, proceed now. If one is, it is premature: wait, or redesign it so it does not depend on that gate.'),
    ]),

    h2('s6h1', 'Why This Work Is Robust'),
    blk('s6p1', "Each item above has the same property: it pays off under Medicare for All, under Medicare for America, under a Medicare buy-in and under Vermont's existing Act 68 reforms. That is what makes it robust. A state or health system that builds it is not betting on the outcome of the federal debate; it is preparing for whichever outcome arrives."),
    blk('s6p2', "The equity case is just as strong. Information that reports small and rural hospitals separately, a payment method that keeps them open, and a workforce pipeline into under-served areas are the conditions under which universal coverage turns into universal care. Chapter 1's third principle treats equity as a design constraint rather than a downstream filter, and the work in this lesson is where that constraint is met."),
    analogy('s6an1', "A town that expects a new bridge but does not know which year it will be funded can still build the access roads, train the crews and survey the riverbanks. All of that work is needed whichever design is chosen, and none of it is wasted if the funding is late.", 'Parallel work before authority arrives'),

    takeaway('tw', [
        "Chapter 1's §1.12.2 allows parallel work that does not depend on a closed critical-path gate, and rejects premature work that does.",
        "The test for any investment is whether it has an unmet upstream dependency.",
        "Private-payer volume and cost information is needed under every reform; building it, within ERISA's limits, is parallel work.",
        "Designing a global-budget method that works for small hospitals is parallel work; deploying full risk before data and money is premature.",
        "Workforce is the binding constraint CBO identifies, and Vermont's RHT program already has about $26.7 million signed for workforce development.",
        "Authority that stands alone, such as a buy-in, reporting standards or institutions like the GMCB, can be issued without waiting for the full reform.",
        "This work is robust: it pays off under Medicare for All, Medicare for America, a buy-in or Act 68.",
    ]),
    quiz('qz', "Under the book's parallel-work principle, which of these should proceed now, before Medicare for All is enacted?", [
        ("Signing full-risk global budget contracts with every hospital", False),
        ("Designing a global-budget method that works for small rural hospitals", True),
        ("Ending employer health plans by state regulation", False),
        ("Promising universal coverage before a financing law is written", False),
    ], "Designing a payment method has no unmet upstream dependency: it delivers value whenever the gate opens, under any reform. Signing full-risk contracts before data and money exist, promising coverage without financing, and attempting to end employer plans by state law all depend on gates that are closed, so they are premature."),
    *sources(['book1', 'book8', 'act48', 'act68', 's1506', 'cbo', 'rhtreview', 'baldwin'], {
        'book1': "§1.12.1 critical path; §1.12.2 parallel versus premature work (quoted); global budget before analytics; Gobeille; §1.12.3 equity as a design constraint",
        'book8': "VHCURES and full-population measurement",
        'act48': "Sec. 27 database; the Board as durable authority",
        'act68': "hospital global budgets from HFY2028; Strategic Plan due Jan 15, 2028 with TCOC and primary-care targets",
        's1506': "§ 401(b) reporting; § 601 education; § 602 worker assistance",
        'cbo': "demand outpacing supply; workforce entry",
        'rhtreview': "Health Care Workforce Development signed agreements",
        'baldwin': "a buy-in as standalone authority",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L18_SLUG = 'm4a-capstone'
L18_TITLE = 'Capstone: Run the Five-Pillar Test Yourself'
L18 = [
    blk('intro1', "This capstone asks you to do what the course has modeled: take a health reform proposal, run it through the five-pillar test with evidence, look at its effect on real providers, apply the equity questions, and write a one-page brief recommending what to do now."),
    blk('intro2', "You can use Medicare for All, one of the alternatives, or a reform in your own state. The platform's tools support each step. Plan on about an hour. The output is the kind of brief a legislative committee, a hospital board or a state agency could act on."),

    h2('s1h1', 'Step 1: Name the Design Precisely'),
    blk('s1p1', "Lesson 1 showed that \"Medicare for All\" can mean very different things. Start your brief by stating the design in four lines: who is covered; what happens to employer coverage; who pays, and through what revenue; and which existing programs it absorbs or leaves alone. If you cannot fill in a line from the proposal's text, say so. A missing revenue source, for example, is a finding, not an omission."),
    blk('s1p2', "Then name the evidence you will rely on: the bill or statute text, official cost estimates, and any comparable experience. For Medicare for All, that means S.1506 or H.R.3069, CBO's 2022 testimony and Vermont's Act 48 record. Avoid relying on summaries when the primary text is available."),
    table('s1t1', 'Design summary template', [
        {'Question': 'Who is covered?', 'Your answer': '', 'Source': ''},
        {'Question': 'What happens to employer coverage?', 'Your answer': '', 'Source': ''},
        {'Question': 'Who pays, through what revenue?', 'Your answer': '', 'Source': ''},
        {'Question': 'Which programs are absorbed or left alone?', 'Your answer': '', 'Source': ''},
    ]),

    h2('s2h1', 'Step 2: Assess Each Gate With Evidence'),
    blk('s2p1', "For each pillar, write what the proposal needs it to issue, what has actually been issued, and your assessment: open, conditionally open, not yet testable, or closed. Use the test from Lesson 2. Name what flows, find its issuer, and check whether it exists, not whether it has been proposed."),
    blk('s2p2', "Give special attention to the three critical-path dependencies: Policy enables Economics, Technology enables Economics-as-management, and Economics drives Clinical. If any of these is closed, say which downstream work is therefore premature. The Medicare for All hub shows a completed version of this table with its sources, which you can use as a model and check your reasoning against."),
    blk('s2p3', "It helps to run the test on two proposals side by side. A Medicare buy-in for people aged 50 to 64 needs authority for one age group and subsidies, and it runs on Medicare's existing information systems, payment rules and administration. Its Technology and Operations needs rest largely on systems Medicare already runs, and its Economics need is a subsidy rather than a new payment system; its Policy gate is the main one. Medicare for All needs new authority of every kind, a national information mandate, a payment system and its financing, a transition for every resident and a new workforce. Writing both assessments next to each other shows how much of a proposal's difficulty comes from its scope rather than its goal."),
    steps('s2st1', 'For each of the five pillars', [
        ('Currency', 'Write what this pillar must issue for the reform: authority, information, incentives, outcomes or capacity.'),
        ('Evidence', 'Cite what exists today: an enacted law, a running system, funded payment, measured care, staff in post.'),
        ('Assessment', 'Open, conditionally open, not yet testable, or closed, with the date of your evidence.'),
        ('What would open it', 'Name the specific action or fact that would change your assessment.'),
    ]),

    h2('s3h1', 'Step 3: Look at Real Providers'),
    blk('s3p1', "A reform's effect on named institutions is where abstract arguments meet budgets. If your proposal changes how hospitals are paid, use the Single-Payer Modeler, or the equivalent data for your state, to see what it would do to each one. Record the statewide change, which hospitals gain and lose, and how many would run an operating loss."),
    blk('s3p2', "Then test your result's sensitivity. Change the commercial price assumption among the three published presets. Find the revenue-neutral rate. Compare the rate-based and global-budget lenses. A finding that holds across assumptions, such as the hospital with the highest commercial share losing under any single rate, is robust; one that flips is not, and your brief should say so."),
    callout('s3c1', "Report what holds across assumptions, and flag what does not. A brief that rests on one scenario is a forecast; one that shows the range is analysis."),
    example('s3ex1', 'A worked example from the Modeler', "At Medicare rates (RAND's 283% commercial price), Vermont's fourteen hospitals lose about $1.19 billion and all thirteen with data run losses. At the revenue-neutral rate of about 149%, total revenue is unchanged, but UVM Medical Center loses about $76 million while Grace Cottage gains about 25%.\nUnder S.1506-style cost-based budgets, the thirteen reporting hospitals change by about +$44 million, deficit hospitals are made whole, and Porter gives up about $12.4 million. The finding that holds across lenses: a single payer redistributes among Vermont hospitals, and who wins depends on the design."),

    h2('s4h1', 'Step 4: Apply the Equity Questions'),
    blk('s4p1', "Ask the Equity Imperative's question of each pillar. Does the mandate close disparities or widen them? Does the data show disparities or average them away? Do the incentives reward serving the hardest-to-reach? Is care effective, and for whom? Is the reform executable everywhere, including rural and under-resourced places?"),
    blk('s4p2', "Answer with specifics from steps 2 and 3. For Medicare for All, that means noting both the strong equity gains (universal coverage, no cost-sharing) and the risks the evidence identifies: a mandate without financing, unmet demand concentrated where clinicians are scarce, and budgets that could squeeze hospitals already in deficit. The HTR Simulator lets you model readiness across the five pillars with equity as a cross-cutting check, for any organization or state."),
    highlight('s4hl1', "Equity is not a separate section of the brief. It is a line in every pillar's assessment."),

    h2('s5h1', 'Step 5: Recommend What to Build Now'),
    blk('s5p1', "Finish with a recommendation organized by the parallel-work test from Lesson 17. List the work that can proceed now because it has no unmet upstream dependency, the work that is premature and should wait, and the specific facts that would change your assessment. Keep it to one page. A good brief tells its reader what to do on Monday."),
    blk('s5p2', "Be clear about what kind of judgment you are making. A sequencing brief does not have to take a side on whether the reform is a good idea. It tells a decision-maker which gates are open, which are closed, what would open them, and what is worth building in the meantime. That is useful to supporters and opponents alike."),
    blk('s5p3', "For Medicare for All, this course's own answer would read roughly as follows. Do now: build private-payer volume and cost reporting within ERISA's limits; design a global-budget method that keeps small and rural hospitals viable; train and retain the clinical workforce; issue standalone authority such as reporting standards. Wait: full-risk contracts before data and money exist, and any promise of coverage without a financing law. Watch: an enacted statute with a revenue title, which would open the Policy gate; a CBO estimate of the bill itself; and federal action on a buy-in, which would test Medicare's capacity to absorb new enrollees. Your brief should reach its own conclusions, but this is the level of specificity to aim for."),
    table('s5t1', 'One-page brief outline', [
        {'Section': '1. The design', 'Length': '4 lines', 'Content': 'Coverage, employer plans, revenue, programs absorbed'},
        {'Section': '2. The gates', 'Length': '5 rows', 'Content': 'Currency, evidence, assessment, what would open it'},
        {'Section': '3. Real providers', 'Length': '3-4 lines', 'Content': 'Statewide effect, winners and losers, robustness'},
        {'Section': '4. Equity', 'Length': 'Within each row', 'Content': 'The pillar\'s equity question, answered'},
        {'Section': '5. Do now / wait / watch', 'Length': '3 short lists', 'Content': 'Parallel work, premature work, triggers'},
    ]),

    h2('s6h1', 'How to Check Your Brief'),
    blk('s6p1', "Before you share the brief, check it against the habits this course has tried to model. Every number has a source you could open. Every assessment has a date, because the evidence will change. Interpretation is labelled as such, separately from what the sources say. Interested-party analysis, like Avalere's 2013 critique of Vermont's plan, is identified as such."),
    blk('s6p2', "Finally, check that the brief would still be useful if the political outcome surprised you. If an enacted statute appeared tomorrow, would your \"what would open it\" column tell the reader what to do next? If the reform stalled for years, would your \"do now\" list still pay off? A brief built on the five-pillar test should pass both checks."),
    warning('s6w1', 'Common mistakes', "Treating a bill as authority before it is enacted. Treating a design as an incentive before it is funded. Quoting a cost estimate for a different design as if it were the bill's. Leaving the equity questions to a closing paragraph. Each of these appeared somewhere in the history this course reviewed."),

    takeaway('tw', [
        "Start a reform brief by naming the design: coverage, employer plans, revenue and programs absorbed, and treat any blank as a finding.",
        "Assess each pillar's gate from evidence of what has been issued, with a date and what would change the assessment.",
        "Give special weight to the three critical-path dependencies, and name downstream work they make premature.",
        "Test provider effects across assumptions, and report what holds and what flips.",
        "Answer the equity question inside every pillar, not as a separate section.",
        "Recommend parallel work to do now, premature work to defer, and the triggers to watch.",
        "Check that every number is sourced, every judgment dated, and interpretation labelled.",
    ]),
    quiz('qz', "A brief cites a CBO estimate for an illustrative single-payer design as \"the cost of S.1506\". What is wrong with that?", [
        ("Nothing; CBO's illustrative designs are the same as S.1506", False),
        ("CBO analyzed illustrative designs, not S.1506 (and said it had not analyzed S.1129), so the estimate describes a range of designs, not the bill", True),
        ("CBO estimates are always partisan and should never be cited", False),
        ("CBO only estimates state programs, not federal bills", False),
    ], "CBO's 2022 testimony summarized five illustrative designs and stated that it had not analyzed S.1129, the 2019 Sanders bill. Using its ranges is legitimate, but presenting them as the cost of a specific bill is one of the common mistakes the capstone asks you to avoid."),
    *sources(['hub', 'modeler', 'sim', 'book1', 's1506', 'cbo', 'avalere'], {
        'hub': "a completed five-pillar assessment with sources, as a model",
        'modeler': "provider-level effects under two payment designs",
        'sim': "readiness modeling across the five pillars with equity as a cross-cutting check",
        'book1': "the currencies, the gate test, the critical path and the Equity Imperative",
        's1506': "the design summary for the course's main case",
        'cbo': "illustrative designs; S.1129 not analyzed",
        'avalere': "an example of interested-party analysis to label as such",
    }),
]

run([(L17_SLUG, L17_TITLE, L17, 17), (L18_SLUG, L18_TITLE, L18, 18)])
