exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_psr_common.py').read())

# Course: Political Sustainability of Reform (Chapter 14 companion). Track 1 — The Durability Analysis.
# Verified 2026-11-23: Vermont Act 68 of 2025 text (read from the PDF: RBP, global budget, Strategic Plan provisions);
# VTDigger June 17, 2026 on the S.190 veto, Vermont Public Nov 3, 2026 and WCAX Nov 4, 2026 on the election, Vermont Public
# Sept 14, 2026 on the GMCB's UVMMC budget order (all read by the web-fetch tool; the last two only partly verbatim).
# Book claims not independently verified: Oliver Wyman's "13 of 14 hospitals in operating losses by 2028"; the EAST Fund
# figures; probabilities in Figure 14.2 (HTR's own April 2026 assessment). Labelled as such below.

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'psr-sustainability-as-risk'
L1_TITLE = 'Political Sustainability Is a Risk-Management Problem'
L1 = [
    blk('intro1', "A reform statute is not permanent. Every mandatory structure in Vermont's health reform exists because a legislature passed it and continues to exist only as long as a legislature, a governor and a regulator keep enforcing it. Chapter 14 of Transforming Healthcare treats that fact as an analytical problem and not only a political one: if you know which parts of a reform are hard to reverse and which are exposed, you can manage the risk to the investments that depend on it."),
    blk('intro2', "This lesson sets out the idea, separates political support from structural durability, and uses the events of 2026 as a test. In one year Vermont withdrew from a federal model, saw a governor veto a hospital pricing bill and re-elected that governor while giving the opposing party legislative supermajorities. Each event is documented, and together they show why a single forecast of the political environment is the wrong tool."),
    blk('intro3', "The chapter is explicit that this is not about advocacy. It is about what an organization should do when its plans rest on a policy that may change."),

    h2('s1h1', 'Support Versus Durability'),
    blk('s1p1', "Chapter 14 defines political sustainability as the capacity of a reform architecture to keep its essential functions across election cycles, budget battles and shifts in the environment. It distinguishes this from political support. A reform can lose majority support and remain structurally durable if it has built enough institutional and organizational constituencies, and a reform with majority support can be fragile if nothing about it is hard to undo."),
    blk('s1p2', "The distinction changes how an organization plans. Polling and election results measure support, which moves. Durability is a property of the design: whether deadlines sit in statute, whether institutions with staff and missions depend on the reform, whether capital has been spent that would be costly to strand, and whether the problem the reform addresses is real and persistent. An organization can read durability from documents, whereas it can only guess at support."),
    callout('s1c1', "Support is how many people favor a reform today. Durability is how costly it would be to undo. Plan around durability and watch support."),

    h2('s2h1', 'The Chapter\'s Starting Claim, and Why It Is Provisional'),
    blk('s2p1', "Chapter 14 observes that the book treats the Policy pillar as settled, since Acts 167 and 68 are law, but that this is analytically correct and politically provisional. The statute's own wording shows how much room remains. Act 68 requires the Green Mountain Care Board to begin implementing reference-based pricing not later than hospital fiscal year 2027, to establish global hospital budgets for one or more non-critical-access hospitals not later than hospital fiscal year 2028 and for all hospitals by fiscal year 2030, but the global budget dates are qualified by the phrase 'to the extent that resources are available'."),
    blk('s2p2', "The statute also requires the Agency of Human Services to provide the Statewide Health Care Delivery Strategic Plan to the legislative committees on or before January 15, 2028, and to update it every three years. The deadlines are real, which makes them valuable, and the qualifications and the regulatory discretion around them are where change can enter."),

    h2('s3h1', '2026 as a Test'),
    blk('s3p1', "Three documented events from 2026 show the range of pressures. In July, Vermont formally notified CMS that it was withdrawing from the AHEAD model after new federal guidance substantially reduced anticipated funding, as the CMMI course describes. A federal agreement that had looked like the most durable element of the reform proved the least."),
    blk('s3p2', "In June, Governor Phil Scott vetoed S.190, a bill that would have let the Green Mountain Care Board direct hospitals to use reference-based pricing for two groups only, public school employees and people buying marketplace coverage. In his letter he wrote that Vermont will not solve its affordability crisis by directing savings to some payers while excluding others. He argued that the Board already has authority over hospital prices and that Act 68 already codified reference-based pricing. The statute he cited was untouched by the veto: Act 68's mandate remains law, according to Vermont Public's reporting."),
    blk('s3p3', "In November, Scott won a sixth term, beating Democrat and Progressive candidate Amanda Janoo by about seven points with nearly all votes counted, while Democrats and Progressives regained supermajorities in both chambers of the legislature, according to Vermont Public. WCAX reported them armed with 22 Senate seats and 112 House seats. The veto-proof legislature and the re-elected governor now face each other over a reform whose core is already in statute."),
    table('s3t1', 'Three 2026 events and what each tests', [
        {'Event': 'July: Vermont withdraws from AHEAD', 'What_it_tests': 'The durability of a federal agreement', 'Result': 'Agreement ended; Act 68 authority continued'},
        {'Event': 'June: Governor vetoes S.190', 'What_it_tests': 'Whether a narrower pricing bill could pass the executive', 'Result': 'Vetoed; Act 68 pricing mandate unchanged'},
        {'Event': 'November: election', 'What_it_tests': 'Support for the governor and for legislative majorities', 'Result': 'Governor re-elected; legislative supermajorities for the opposing parties'},
    ]),
    blk('s3p4', "A forecaster would have struggled to predict that combination, which is why Chapter 14 does not try. It asks what an organization should do under each of several outcomes, and it directs attention to the structural question of what survives."),

    h2('s4h1', 'Four Tasks'),
    steps('s4st1', 'The chapter\'s risk-management sequence', [
        ('Separate durable from exposed', 'Identify which elements of the reform are hard to reverse and which depend on continuing political will or regulatory choices.'),
        ('Watch early-warning signals', 'Monitor observable indicators that a risk is materializing before it becomes a statutory or regulatory change.'),
        ('Plan for disruption scenarios', 'Specify political conditions and model the effect on the organization\'s investment portfolio.'),
        ('Act on what holds value', 'Prioritize investments that retain value under every scenario, engage the regulatory process with data, and document progress.'),
    ]),
    blk('s4p1', "The rest of this course follows that sequence. The next two lessons separate the durable from the exposed. Track 2 reads the 2026 record closely. Track 3 builds the signal and scenario toolkit, Track 4 covers organizational strategies, and Track 5 shows how to build sustainability into a reform design and ends with a capstone risk register."),
    warning('s4w1', "Do not forecast elections to make a capital decision", "A capital plan that depends on guessing an election is a bet. A plan that identifies which investments hold value across outcomes is a risk-management decision."),

    blk('s4p2', "Two cautions about the framework. First, durable does not mean good: a reform can be hard to reverse and still be badly designed, and the chapter's tools are meant to protect investments in reforms an organization has judged worthwhile, not to settle whether the reform is right. Second, the ratings are judgments that should be revisited as facts change. The 2026 events moved several of them within a single year, and an organization that rated AHEAD as durable in early 2026 had to revise the rating by July."),
    h2('s5h1', 'Why a Single Forecast Fails'),
    blk('s5p1', "It is tempting to respond to political uncertainty by asking who will win. The 2026 record shows why that question is less useful than it seems. A re-elected governor and a legislature with supermajorities of the opposing parties produce neither continuity nor repeal of the reform, and the combinations that can follow from that sit in different places on a map of outcomes: veto showdowns, negotiated compromises, executive action or stalemate. Each leaves different parts of Act 68 exposed. An organization that planned around one of them would have been wrong about several."),
    blk('s5p2', "A better practice is to define the outcomes that matter to the organization's own plan, such as a delay in reference-based pricing, budgets that apply little pressure or a cut in expected federal funding, assign each a rough probability, and decide in advance what the organization will do. The probabilities need not be precise. They exist to focus planning on the outcomes most likely to change a decision. Track 3 develops the method."),
    blk('s5p3', "The question for any capital plan is therefore not 'will the policy hold?' but 'which of these investments keep their value if it does not?'. Lesson 10 returns to that question under the heading of structural irreversibility."),

    takeaway('tw', [
        "Chapter 14 defines political sustainability as a reform's capacity to keep its essential functions across election cycles and environment shifts, distinct from political support.",
        "A reform can lose majority support and remain durable if it has built institutional and organizational constituencies; durability can be read from documents, support can only be guessed.",
        "Act 68 requires reference-based pricing to begin not later than hospital fiscal year 2027 and global budgets for some hospitals by fiscal year 2028 and all by 2030, to the extent resources are available.",
        "The Statewide Health Care Delivery Strategic Plan is due to legislative committees by January 15, 2028 and every three years after.",
        "In 2026 Vermont withdrew from AHEAD, the governor vetoed S.190, and voters re-elected the governor while giving Democrats and Progressives supermajorities.",
        "The veto left Act 68's pricing mandate in place, which illustrates how statutory authority differs from a narrower follow-on bill.",
        "Plan by separating durable from exposed elements, watching early-warning signals, modeling disruption scenarios and prioritizing investments that hold value in all of them.",
    ]),
    quiz('qz',
        "How does Chapter 14 distinguish political sustainability from political support?",
        [
            ("They are the same thing measured differently", False),
            ("Sustainability is the capacity to keep essential functions across cycles through institutional and organizational constituencies; a reform can lose majority support and remain durable", True),
            ("Support determines whether a reform is legally in force", False),
            ("Sustainability applies only to federal programs", False),
        ],
        "The chapter defines political sustainability as the capacity of a reform architecture to maintain its essential functions across election cycles, budget battles and environment shifts, and notes that a reform can lose majority support and remain structurally durable if it has built sufficient constituencies."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — introduction, §14.1 and §14.8: framing, 2026 events and key concepts"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — reference-based pricing, global hospital budgets and Strategic Plan provisions"),
    blk('src3', "[3] VTDigger, Scott vetoes Legislature's latest attempt at healthcare reform (June 17, 2026) — https://vtdigger.org/2026/06/17/scott-vetoes-legislatures-latest-attempt-at-healthcare-reform/ — what S.190 would have done and the governor's reasons"),
    blk('src4', "[4] Vermont Public, Phil Scott wins historic sixth term as Vermont governor (November 3, 2026) — https://www.vermontpublic.org/local-news/2026-11-03/phil-scott-wins-historic-sixth-term-as-vermont-governor; WCAX, Scott readies for veto showdowns as newly empowered Democratic supermajority takes shape (November 4, 2026) — https://www.wcax.com/2026/11/04/scott-readies-veto-showdowns-newly-empowered-democratic-supermajority-takes-shape/"),
    blk('src5', "[5] Vermont Agency of Human Services announcement of July 24, 2026 on withdrawing from AHEAD, as published by VermontBiz — https://vermontbiz.com/news/2026/july/24/vermont-withdraws-ahead-commits-rural-health-transformation"),
]

# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'psr-what-is-hard-to-reverse'
L2_TITLE = 'What Is Hard to Reverse: Four Sources of Durability'
L2 = [
    blk('intro1', "If you want to protect an investment from political change, the first question is what makes a reform hard to undo. Chapter 14 names four sources of durability in Vermont's reform architecture: federal agreements, capital investments, the reform cascade and the financial crisis itself. Each has a different character, and one of them failed its test in 2026, which makes the lesson more useful."),
    blk('intro2', "This lesson takes the four in turn, tests each against the documented events of 2025 and 2026, and draws a general rule for rating the durability of any element of a reform. It also marks which claims are the book's own and could not be independently confirmed."),
    blk('intro3', "A durable element is not one that cannot be changed. It is one whose reversal would impose visible costs on actors with the power to resist."),

    h2('s1h1', 'Federal Agreements: The Counter-Example'),
    blk('s1p1', "Chapter 14 begins with the element that was expected to be most durable. The AHEAD State Agreement, signed in January 2025, was a binding federal-state agreement with an eight-year performance period and enhanced federal funding attached. The chapter reports that it proved the least durable: after a CMS renegotiation cut the expected EAST Fund from about $138 million to a cap near $10 million, Vermont formally notified CMS and exited in July 2026, before the performance period began. The dollar figures are the book's own; the state's announcement, as published, says new guidance substantially reduced anticipated funding without giving amounts."),
    blk('s1p2', "The chapter's conclusion is that a federal agreement insulates a reform only while its economics hold for both parties. A second example comes from the Blueprint for Health. Its 2025 annual report records that Medicare could contribute to practice and community health team payments only while the all-payer model agreement with CMS was in force, that the agreement ended in December 2025 and that the legislature had to appropriate more than $5 million, about a quarter of annual funding, to cover Medicare's share for 2026. Both cases show the pattern: federal money flows through an agreement, and when the agreement ends the money can stop even though the program remains."),
    callout('s1c1', "A federal agreement is durable only while it is economically attractive to both sides and while it exists. Treat it as a financing arrangement with an expiry, not as a foundation."),

    h2('s2h1', 'Capital Investments'),
    blk('s2p1', "Capital already spent is hard to reverse. Chapter 14 points to the Rural Health Transformation Program's first-year award of $195 million to Vermont, the clinically integrated network infrastructure, information technology upgrades and analytics platforms. Once built, these create constituencies for their continuation and are difficult to defund without visible harm to rural communities that are politically protected."),
    blk('s2p2', "There are two cautions. Capital that is built can still be left without operating funds, so a platform that exists but is not staffed is a stranded asset and not a durable one. And program money that is time-limited creates its own cliff. Chapter 3 notes that the national Rural Health Transformation fund expires in 2030 while Medicaid reductions under H.R. 1 accelerate afterward. Durability here depends on whether the investment is wired into operations and budgets before the money ends."),

    h2('s3h1', 'The Reform Cascade'),
    blk('s3p1', "Vermont's sequence of Act 167, Act 51 and Act 68 built legitimacy step by step. Each act created institutions that became constituencies for the next. The Health Care Delivery Advisory Committee, the expanded authority of the Green Mountain Care Board and the Agency of Human Services' hospital transformation engagements all have staff, missions and legislative relationships. Chapter 14 argues that dismantling Act 68 would mean dismantling these institutions."),
    blk('s3p2', "Act 68's text shows the mechanism. It creates the Statewide Health Care Delivery Strategic Plan, with content the statute prescribes: annual targets for total cost of care, targets for the share of spending on primary care, mental health and prevention, a phased implementation timeline with milestones and regular reporting. It creates the Health Care Delivery Advisory Committee and requires updates every three years. Each of these is a standing obligation that someone must perform, which is the practical meaning of institutional durability."),

    h2('s4h1', 'The Financial Crisis Itself'),
    blk('s4p1', "The fourth source is the least institutional and the most basic. Chapter 14 argues that the case for transformation rests on a reality that is not politically manufactured: Oliver Wyman's projection that 13 of 14 hospitals would be in operating losses by 2028 absent structural change has not gone away, so if global budgets were weakened the hospitals would still face the same trajectory. The projection is the book's account of the consultant's analysis, and the lesson did not independently verify the figure, so it should be checked against the report before being quoted."),
    blk('s4p2', "The logic is worth keeping even without the number. A reform that responds to a problem that persists regardless of who governs is more durable than one that responds to a problem only one side recognizes. The September 2026 budget order for the University of Vermont Medical Center shows the same pressure from another angle: the Board voted 3 to 2 to order a 4.4 percent cut to the hospital's commercial prices for the budget year beginning October 1, and the hospital's chief executive said it was on track to lose $75 million. Whatever one thinks of the order, it shows that the financial pressure on hospitals is real and visible, and so is the conflict over how to resolve it."),

    blk('s4p3', "The same logic explains why the crisis is only a partial protection. A real problem creates pressure for change, but not necessarily for the particular change a reform makes. Hospital losses can be answered by price increases, by subsidy or by service cuts, each with different political constituencies, so the persistence of the problem makes some response likely without fixing which one. The durability of the problem is therefore a reason the reform will be revisited, and not by itself a reason that it will survive in its present form."),

    blk('s4p4', "A practical consequence follows for planners. Tie each assumption in a capital plan to the durability source that supports it, and write down which source it is. An assumption that rests on a federal agreement should be flagged as exposed; one that rests on a statutory deadline and standing institutions can carry more weight. The exercise often reveals that a plan labelled as reform-dependent actually rests on a single weak source."),
    h2('s5h1', 'A Rule for Rating Durability'),
    table('s5t1', 'Durability of each source, as tested by 2025-2026 events', [
        {'Source': 'Federal agreement', 'Test_in_2026': 'AHEAD exit; Blueprint Medicare funding gap', 'Rating': 'Low: expires when economics or the agreement change'},
        {'Source': 'Capital investment', 'Test_in_2026': 'Rural Health Transformation funds flowing', 'Rating': 'Moderate to high while operating funds continue; time-limited money needs a plan'},
        {'Source': 'Reform cascade', 'Test_in_2026': 'Act 68 pricing mandate intact after the S.190 veto', 'Rating': 'High: statute and institutions in place'},
        {'Source': 'Financial crisis', 'Test_in_2026': 'Continuing hospital budget conflict', 'Rating': 'High as a driver; not a policy instrument'},
    ]),
    blk('s5p1', "A working rule follows. An element is durable to the extent that reversing it would be costly, visible and opposed by actors with power. Check each element on four questions: Is it in statute with a date? Do institutions with staff depend on it? Has capital been committed that would be stranded? And does it answer a problem that persists? The more yes answers, the more durable. A voluntary program, a plan without a statutory deadline or a grant with no operating follow-through scores low on all four."),

    takeaway('tw', [
        "Chapter 14 names four sources of durability: federal agreements, capital investments, the reform cascade and the financial crisis itself.",
        "Federal agreements proved least durable: AHEAD ended in 2026, and Medicare's contribution to the Blueprint stopped when the all-payer model agreement ended in December 2025, requiring a state appropriation of more than $5 million for 2026.",
        "The figures for the AHEAD EAST Fund reduction are the book's; the state's announcement gives no dollar amounts.",
        "Capital investments are durable when wired into operations and budgets; time-limited money, such as Rural Health Transformation funds expiring in 2030, needs a post-grant plan.",
        "The reform cascade created institutions and standing obligations, such as the Strategic Plan with prescribed targets and three-year updates, that make reversal costly.",
        "The financial pressure on hospitals is a driver the reform did not invent; the Oliver Wyman projection of 13 of 14 hospitals in losses by 2028 is the book's account and should be checked at source.",
        "Rate any element on four questions: in statute with a date, institutions depend on it, capital would be stranded, and it answers a persistent problem.",
    ]),
    quiz('qz',
        "Why did Chapter 14 conclude that a federal agreement is the least durable element of Vermont's reform architecture?",
        [
            ("Because federal agreements cannot be signed by states", False),
            ("Because it insulates a reform only while its economics hold for both parties; AHEAD ended after the expected funding was cut", True),
            ("Because federal agreements are always shorter than one year", False),
            ("Because the state legislature controls all federal funding", False),
        ],
        "Chapter 14 reports that the AHEAD agreement, expected to be the most durable element, proved the least: after CMS reduced the expected funding, Vermont exited in July 2026. What carried the reform through was Act 68's state authority."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.2.1: what is hard to reverse"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report (January 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — the Medicare participation change and the legislative appropriation"),
    blk('src3', "[3] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — Strategic Plan content (§ 9403), Health Care Delivery Advisory Committee (§ 9403a)"),
    blk('src4', "[4] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
    blk('src5', "[5] Health Transformation Review, Chapter 3 — https://healthtransformationreview.org/read/chapter-3 — §3.6 on the timing of Rural Health Transformation funds and Medicaid reductions"),
]

# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'psr-what-is-exposed'
L3_TITLE = 'What Is Politically Exposed: Compliance Without Transformation'
L3 = [
    blk('intro1', "The most likely way for a reform to fail is not repeal. It is hollowing out. A statute stays on the books, the deadlines are formally met and the mandate is formally intact, while the choices that give it force are made in a way that removes the pressure. Chapter 14 calls this regulatory-capture risk and identifies four places in Vermont's architecture where it could occur."),
    blk('intro2', "This lesson names them, reads the relevant statutory text to show where the discretion sits, and then looks at two 2026 events, the S.190 veto and the September budget order, for what they show about how the contest is actually being fought. It treats the chapter's judgments as a framework to apply, not a forecast."),
    blk('intro3', "The practical point is that an organization should watch the methodology and the levels, not just the mandate."),

    h2('s1h1', 'Where the Discretion Sits'),
    blk('s1p1', "Chapter 14 identifies four exposed elements. The methodology for reference-based pricing is a Board determination, and it can be set so close to current commercial rates that little repricing occurs, or with exemptions so broad that few hospitals are constrained. The levels of global budgets are set by the Board, and levels that require no behavioral change produce no transformation. The scope of the Strategic Plan could be descriptive and not committal. And federal Medicaid funding, shaped by H.R. 1, pressures the financing of the primary care, behavioral health and long-term care investments on which global budgets depend."),
    blk('s1p2', "The chapter's point about the first three is that the risk is not repeal. It is calibration. Hospital lobbying, it argues, will focus on methodology and not on overturning the mandate, because the methodology is where outcomes are decided and where a data-rich participant has the most influence."),
    callout('s1c1', "Capture rarely looks like repeal. It looks like a compliant process that produces a result with no force: reference prices near current prices, budgets requiring no change, a plan with no commitments."),

    h2('s2h1', 'Reading the Statute for Discretion'),
    blk('s2p1', "Act 68's text shows how much is left to the Board. For reference-based pricing, the Board shall establish maximum amounts based on a percentage of Medicare or on another benchmark as appropriate. In setting a hospital's prices it must consider the composition of the community served, including health, demographics, acuity, payer mix, labor costs and social risk factors, and the hospital's role in the system. The statute names no percentage. It requires the Board to monitor whether price decreases reach premiums and to identify factors that would require modifying pricing, such as a measurable reduction in access or quality."),
    blk('s2p2', "For global budgets, the Board shall establish them for one or more non-critical-access hospitals not later than hospital fiscal year 2028 and for all hospitals by fiscal year 2030, to the extent that resources are available, and they shall include Medicare to the extent permitted under federal law and shall not include Medicaid. The statute does not state the level, and the budgets must reflect reference-based pricing and the total cost of care targets. The qualifier 'to the extent that resources are available' is a further source of flexibility."),
    blk('s2p3', "The Strategic Plan is more prescribed than Chapter 14 suggests. The statute says the plan shall define shared goals with benchmarks for evaluating progress, identify the resources and infrastructure needed, provide a phased implementation timeline with milestones and regular reporting, and provide annual targets for total cost of care and targets for the percentage of spending on primary care, mental health and prevention. A plan that did none of these would not satisfy the statute. The residual risk is in the quality of the targets and whether they bind anything, since the statute does not say what consequence follows from missing them."),

    h2('s3h1', 'What the 2026 Record Shows'),
    blk('s3p1', "The veto of S.190 is a case of the executive using its power over a narrower bill while leaving the broad statute alone. The bill would have let the Board direct reference-based pricing for two groups, school employees and marketplace enrollees. Scott's stated objection was fairness: savings should not be directed to some payers while excluding others. He said he would use executive action on parts of his own insurance reform bill, H.585, which died in the Senate, and urged the Board to get comparable savings from its hospital revenue cuts."),
    blk('s3p2', "The September budget order shows regulatory discretion at work. The Board voted 3 to 2 on the University of Vermont Medical Center's budget, ordering a 4.4 percent cut in its commercial prices compared with the current year. The Board's chair and one other member dissented. The hospital's chief executive said it could not afford another $32 million of cuts and that it was on track for a $75 million loss. Here the decisive variable was not the statute but the Board's judgment on levels, which is exactly where Chapter 14 locates the exposure."),
    blk('s3p3', "The same event shows the contest is two-directional. A methodology that is too soft would hollow the reform, while one that is too hard produces litigation, hospital distress and political backlash. A durable reform needs both a process that can withstand pressure from hospitals and a pace the system can absorb."),

    h2('s4h1', 'Federal Medicaid Funding'),
    blk('s4p1', "The fourth exposed element is outside Vermont's control. H.R. 1's changes, covered in the CMMI course, reduce federal Medicaid funding through provider tax limits, state directed payment caps and eligibility changes that start in 2026 and take effect through 2028. Chapter 14 observes that Vermont's investments in primary care, behavioral health and long-term care are partly financed through federal Medicaid matching funds, so a significant fall in federal funding makes those investments harder to sustain and reduces the clinical capacity that makes global budgets viable. This is the dependency Vermont cannot fully insulate itself against."),
    blk('s4p2', "For planning, this is the exposure that most resembles a market risk. It cannot be lobbied away at the state level, and the response is diversification: funding programs from several sources, and prioritizing investments whose value does not depend on one payer."),
    table('s4t1', 'Exposed elements, where the discretion sits and the 2026 evidence', [
        {'Element': 'Reference-based pricing methodology', 'Where_discretion_sits': 'Board sets percentage and hospital factors; statute names none', 'Evidence': 'S.190 veto left the statute in place'},
        {'Element': 'Global budget levels', 'Where_discretion_sits': 'Board sets levels; start dates qualified by available resources', 'Evidence': 'September 2026 UVMMC budget order, 3-2 vote, 4.4% commercial price cut'},
        {'Element': 'Strategic Plan', 'Where_discretion_sits': 'Statute prescribes content; consequences for missing targets unstated', 'Evidence': 'Plan due January 15, 2028'},
        {'Element': 'Federal Medicaid funding', 'Where_discretion_sits': 'Congress and CMS, outside the state', 'Evidence': 'H.R. 1 provisions phasing in 2026 to 2028'},
    ]),

    h2('s5h1', 'Turning Exposure Into Watch Items'),
    blk('s5p1', "Each exposed element implies a specific thing to watch. For the reference-based pricing methodology, watch the Board's published methodology, the percentages and hospital-specific factors it adopts and any exemptions, and compare them with current commercial prices. For global budgets, watch the Board's budget guidance and whether proposed levels leave any pressure on cost per case or utilization. For the Strategic Plan, watch whether the 2027 drafts contain numeric annual targets and consequences. For federal Medicaid funding, watch the implementation of provider tax and state directed payment limits and the state's own Medicaid financing plan."),
    blk('s5p2', "These watch items turn a vague worry into a checklist that can be reviewed monthly. They also show where an organization's own data can matter: hospitals hold the cost, utilization and population data that the Board needs to set viable methodologies, and the chapter argues that data-grounded participation buys more influence than public opposition. Track 4 returns to that point."),

    takeaway('tw', [
        "Chapter 14 identifies four exposed elements: the reference-based pricing methodology, global budget levels, the Strategic Plan's scope and federal Medicaid funding.",
        "The principal risk is calibration, not repeal: a compliant process whose result has no force.",
        "Act 68 names no percentage of Medicare for reference-based pricing and requires the Board to consider community and hospital factors and to monitor whether price decreases reach premiums.",
        "Global budget start dates are qualified by 'to the extent that resources are available', and the statute does not state budget levels.",
        "The Strategic Plan statute requires goals with benchmarks, a phased timeline with milestones and annual total cost of care targets; the residual risk is whether the targets bind anything.",
        "In June 2026 the governor vetoed S.190 on fairness grounds and left Act 68 in place; in September the Board voted 3 to 2 for a 4.4 percent cut in the Medical Center's commercial prices.",
        "Federal Medicaid funding is the exposure the state cannot lobby away; respond by diversifying funding and prioritizing investments that hold value across payers.",
    ]),
    quiz('qz',
        "According to Chapter 14, where is the main risk to Act 68's mandatory architecture likely to arise?",
        [
            ("In outright repeal of the statute", False),
            ("In methodology and level-setting that could hollow out the mandate while it remains formally intact", True),
            ("In the federal government banning state payment reform", False),
            ("In hospitals voluntarily exceeding the mandate", False),
        ],
        "The chapter argues that hospital lobbying will focus on reference-based pricing methodology and global budget levels, not on overturning the mandate, because those regulatory determinations can neutralize the structural change while the statute remains in force."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.2.2: what is politically exposed; §14.8: regulatory-capture risk"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — reference-based pricing (18 V.S.A. § 9376(e)), global hospital budgets (hospital budget review provisions, 18 V.S.A. chapter 221), Strategic Plan (§ 9403)"),
    blk('src3', "[3] VTDigger, Scott vetoes Legislature's latest attempt at healthcare reform (June 17, 2026) — https://vtdigger.org/2026/06/17/scott-vetoes-legislatures-latest-attempt-at-healthcare-reform/"),
    blk('src4', "[4] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
    blk('src5', "[5] KFF, Health Provisions in the 2025 Federal Budget Reconciliation Law — https://www.kff.org/medicaid/issue-brief/health-provisions-in-the-2025-federal-budget-reconciliation-law/ — Medicaid provisions and effective dates"),
]

LESSONS = [(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2), (L3_SLUG, L3_TITLE, L3, 3)]
if __name__ == '__main__':
    run(LESSONS)
