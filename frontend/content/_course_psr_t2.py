exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_psr_common.py').read())

# Track 2 — Vermont's Record: History and 2026. Sources read 2026-11-23: Vermont Public (June 16, Sept 14, Nov 3, 2026),
# VermontBiz (June 17, 2026), VTDigger (June 17, 2026), WCAX (Nov 4, 2026); Act 68 text; search summaries for the 2014
# single-payer retreat and Acts 51/167 (secondary; flagged). Numbers for the 2014 financing plan are as reported at the time.
# Book-only and unverified here: "230+ meetings, 3,100+ participants" for Act 167's process.

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'psr-vermont-reform-history'
L4_TITLE = "Vermont's Reform History: Why the Cascade Was a Sustainability Design"
L4 = [
    blk('intro1', "Vermont has been through a failed ambition and a rebuilt strategy, and the difference between them is a lesson in political sustainability. The failed ambition was Green Mountain Care, the single-payer system authorized in 2011 and abandoned in December 2014. The rebuilt strategy is the sequence of Act 167 of 2022, Act 51 of 2023 and Act 68 of 2025 that Chapter 14 calls a reform cascade. This lesson compares the two."),
    blk('intro2', "It is not an argument that one approach was right and the other wrong. It is an analysis of design: what each approach asked of the political system at each step, how much it could survive and what a reader in another state can take from the contrast. The 2014 figures are as reported at the time by news organizations, and the cascade's descriptions come from the statutes and the chapter."),
    blk('intro3', "The aim is to extract the design principles that Chapter 14 states for other states: diagnosis before legislation, public process before mandate, incremental capacity before full accountability and continuous public reporting."),

    h2('s1h1', 'The First Attempt: Green Mountain Care and the 2014 Retreat'),
    blk('s1p1', "Act 48 of 2011 set up Green Mountain Care, a path toward a publicly financed health system. The central political task was a financing plan, and it was the one the state could not complete. News coverage of December 2014 reported that Governor Peter Shumlin missed two deadlines for developing it, then concluded that paying for the system would require a new payroll tax of about 11.5 percent on businesses plus a new income tax of up to 9.5 percent, and that the new revenue required had grown to about $2.6 billion. The same reports said the federal money expected from opting out of the Affordable Care Act had shrunk to $106 million from $267 million and that administrative savings once projected were now considered impractical to achieve."),
    blk('s1p2', "On December 17, 2014, the governor announced that it was not the right time to ask the legislature to pass a financing plan, and said he would instead strengthen the Green Mountain Care Board's power over spending and pursue a federal waiver for delivery-system reform. Reports noted that he had come close to losing re-election that year amid voter frustration over the missing financing plan. These are accounts from news coverage at the time, and the fiscal figures were not disputed in the sources reviewed, but a reader who needs precision should consult the administration's own December 2014 documents."),
    blk('s1p3', "From a sustainability perspective the pattern is clear. The reform asked the political system for its largest decision, a new tax system, before the facts supporting it were settled, and made the case dependent on estimates that proved optimistic. When the estimates failed, there was little else to fall back on."),
    callout('s1c1', "A reform that stakes everything on one large decision gives opponents a single target and leaves nothing standing if the decision fails."),

    h2('s2h1', 'The Second Strategy: A Cascade'),
    blk('s2p1', "The sequence that followed was built in steps. Act 167 of 2022 set up a diagnostic process, a community engagement effort that led to the consultant report commonly called the Oliver Wyman report, formally Act 167 Community Engagement: Recommendations, which identified the transformation needed to sustain the health system. Act 51 of 2023 added a section to Act 167 directing the Agency of Human Services to engage in transformation planning with up to four hospitals and giving the Green Mountain Care Board a role in hospital system transformation and pilot projects. Act 68 of 2025, bill S.126, then deployed mandatory requirements: reference-based pricing, global hospital budgets and the Statewide Health Care Delivery Strategic Plan."),
    blk('s2p2', "Chapter 14 reports that the diagnostic process involved more than 230 meetings and more than 3,100 participants. This lesson could not confirm those figures from public sources, so they should be treated as the book's account. The principle does not depend on the exact numbers. A process that is public and community-grounded builds legitimacy for what follows, since communities that helped identify the problems are less susceptible to campaigns claiming the problems do not exist."),
    blk('s2p3', "Each step also created institutions and obligations. Act 68's text creates the Health Care Delivery Advisory Committee, a Vermont Steering Committee for Comprehensive Primary Health Care and a Strategic Plan with required content and three-year updates. A reversal of Act 68 would require dismantling bodies with their own staff, missions and legislative relationships."),

    h2('s3h1', 'Making Failure Visible'),
    blk('s3p1', "Chapter 14 identifies a second sustainability feature in Act 68: it makes failure visible. The statute requires the Board to monitor whether reference-based pricing reductions produce premium reductions and to post findings annually. It requires budget decisions on a fixed annual calendar, with a decision by September 15 and a written order by October 1. And it sets a Strategic Plan due date of January 15, 2028. The chapter adds monthly transformation reports from the Agency of Human Services, which this lesson did not locate in the statute text, so that detail is the book's."),
    blk('s3p2', "The effect is an accountability trail. If a deadline is missed, a methodology is softened or a target is dropped, the change appears in a public record. Chapter 14 argues that this makes deliberate erosion more costly than quiet drift, and the 2026 events illustrate it: the veto, the vote on the Medical Center's budget and the withdrawal from AHEAD were all announced publicly and debated in the press."),

    h2('s4h1', 'Four Principles for Other States'),
    steps('s4st1', "Chapter 14's design principles", [
        ('Diagnosis before legislation', 'Establish the facts publicly so the problem is not contested before the remedy is proposed.'),
        ('Public process before mandate', 'Involve affected communities so the mandate has legitimacy when it arrives.'),
        ('Incremental capacity before full accountability', 'Build institutions and data before attaching consequences, so accountability is workable.'),
        ('Continuous public reporting', 'Make progress and failure equally visible so erosion leaves a trail.'),
    ]),
    blk('s4p1', "The chapter adds a point about bill design: states that attempt the whole architecture in a single bill give opponents one target instead of three. The Vermont sequence spread the political cost across three acts over three years, each of which could be defended on its own terms."),
    blk('s4p2', "Two cautions. The cascade is slower, and slow reform carries its own risk: conditions can change, as the 2026 events show, before the last step is fully in force. And a cascade does not guarantee durability, since its final step still depends on regulatory choices. The sequence improves the odds, and Lesson 3 showed where the remaining exposure sits."),

    h2('s5h1', 'What a Cascade Does Not Guarantee'),
    blk('s5p1', "Comparing the two approaches should not flatter the second. The cascade's early steps were comparatively easy to pass because they asked for study, planning and capacity. The hard decisions, how low prices should go and how tight budgets should be, were deferred to the final step and then to regulators. That deferral is a strength, because it lets the facts mature, and a weakness, because it moves the contest to a forum with fewer public eyes and more organized interests."),
    blk('s5p2', "The 2014 episode also left a legacy that the later strategy had to manage: voters who had been promised one thing and saw it withdrawn are slower to trust a new promise. A reform strategy has to account for the memory of earlier failures, and the open, incremental approach of the cascade can be read partly as a response to it. For a reader in another state, the question to ask is what earlier failed or abandoned reform sits in the public's memory, and how the new design addresses it."),

    takeaway('tw', [
        "Act 48 of 2011 authorized Green Mountain Care; on December 17, 2014 the governor announced he would not ask the legislature to pass a financing plan, according to news coverage at the time.",
        "Reports of the 2014 decision cited a financing plan requiring an 11.5 percent payroll tax and an income tax of up to 9.5 percent, about $2.6 billion in new revenue and a federal contribution that had shrunk from $267 million to $106 million.",
        "The 2014 approach staked the reform on one large decision whose supporting estimates proved optimistic, leaving little standing when it failed.",
        "The later cascade of Act 167 (2022), Act 51 (2023) and Act 68 (2025, bill S.126) spread the political cost across three steps and created institutions and standing obligations at each.",
        "Chapter 14 reports 230 meetings and 3,100 participants in Act 167's process; this lesson could not confirm those figures.",
        "Act 68 makes failure visible through annual premium monitoring, a fixed budget calendar and a Strategic Plan deadline of January 15, 2028.",
        "The four design principles are diagnosis before legislation, public process before mandate, incremental capacity before accountability and continuous public reporting.",
    ]),
    quiz('qz',
        "Which feature of Vermont's reform cascade does Chapter 14 identify as a sustainability design?",
        [
            ("Passing all reforms in a single bill to prevent debate", False),
            ("Each act created facts, institutions and constituencies that made the next more viable and its reversal more costly", True),
            ("Keeping all reform decisions secret until implementation", False),
            ("Relying entirely on federal agreements for authority", False),
        ],
        "The chapter argues that Act 167's diagnosis, Act 51's capacity-building and Act 68's mandates each created institutions and legitimacy that made the next step more viable and reversal more costly, in contrast to a single-bill approach that gives opponents one target."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK14 + " — §14.5: Vermont's reform cascade as political-sustainability architecture; §14.7"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — Strategic Plan, Health Care Delivery Advisory Committee, premium monitoring and budget calendar"),
    blk('src3', "[3] Vermont Legislature, Act 51 of 2023 summary — https://legislature.vermont.gov/Documents/2024/Docs/ACTS/ACT051/ACT051%20Act%20Summary.pdf — hospital transformation planning added to Act 167"),
    blk('src4', "[4] Contemporary news coverage of the December 17, 2014 decision, including Star Tribune, Vermont Gov. Peter Shumlin says he won't seek single payer health care in 2015 — https://www.startribune.com/governor-abandons-single-payer-health-care-plan/286150891 and KFF Health News, Vermont Gov. Drops Plan For Single-Payer Health System — https://kffhealthnews.org/morning-breakout/vermont-gov-drops-plan-for-single-payer-health-system/"),
]

# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'psr-the-2026-record'
L5_TITLE = 'The 2026 Record: Four Events and What Each Tested'
L5 = [
    blk('intro1', "The year 2026 gave Vermont's reform four public tests within five months. A federal agreement ended, a governor vetoed a pricing bill, regulators cut a hospital's budget on a split vote and voters returned the governor while handing the opposing parties legislative supermajorities. The events are documented in the press, the statute and agency announcements, and together they are the best available evidence for the durability analysis of Track 1."),
    blk('intro2', "This lesson sets out each event in order, notes what the sources do and do not establish, and reads them against the chapter's framework. It also states what remains unknown as of late November 2026, since the 2027 legislative session has not begun."),
    blk('intro3', "Where an account comes from one source, the lesson says so. It takes no side on whether the policies were right."),

    h2('s1h1', 'June: The S.190 Veto'),
    blk('s1p1', "S.190 would have let the Green Mountain Care Board apply reference-based pricing to two groups: plans sold through the state's marketplace and plans offered to school employees. Its House health committee chair, Representative Alyssa Black, called it a soft opening, a dry run of the whole-market pricing that Act 68 envisions. Supporters argued that health costs drive school spending and property taxes and that marketplace plans had lost thousands of participants after enhanced federal subsidies expired."),
    blk('s1p2', "On June 16 Governor Phil Scott vetoed it. His letter said the bill would exclude most payers from the affordability gains achieved in fiscal year 2027, and that Vermont will not solve its affordability crisis by directing savings to some payers while excluding others. He said the bill conflicted with the Board's statutory purpose, in 18 V.S.A. section 9372, of reductions across all payers, that Department of Financial Regulation analysis showed advocates' savings claims did not hold up, that the Board already has authority to reduce hospital prices and revenue, and that several rural critical access hospitals opposed the bill. He said he would advance several provisions of his own insurance package, H.585, through executive action. Board chair Owen Foster backed the bill and said there are not enough savings to go around for 2027, and the sponsor, Senator Ginny Lyons, said the governor wanted to protect insurers."),
    blk('s1p3', "What the sources do not establish is the vote count in either chamber, whether an override was planned, or hospital association and insurer positions. This lesson did not find them."),

    h2('s2h1', 'July: The AHEAD Withdrawal'),
    blk('s2p1', "On July 24 the Agency of Human Services announced that Vermont had formally notified CMS it was withdrawing from AHEAD after new policy and operational guidance substantially reduced anticipated funding. The Green Mountain Care Board's chair supported the withdrawal, saying nothing changes for hospitals and providers because the state never began the model. The Agency's secretary said the decision would not increase costs or reduce access and pointed to the Rural Health Transformation Program, reported at $195 million a year for five years."),
    blk('s2p2', "The event tested the durability of a federal agreement, with a clear result: it did not hold, but the state's own authority did. That is the chapter's central contrast between federal and statutory foundations."),

    h2('s3h1', 'September: The Medical Center Budget Order'),
    blk('s3p1', "On September 14 the Board voted 3 to 2 on the University of Vermont Medical Center's budget for the year beginning October 1, ordering a 4.4 percent cut to its commercial prices compared with the current year. The Board's chair and one other member dissented, while another member argued the hospital should be well placed to continue price reductions. The hospital's submitted plan was about $2.5 billion and already included a $43 million loss. Its chief executive said it could not afford another $32 million cut, that it was on track to lose $75 million this fiscal year and that the order would likely mean another $75 million loss next year. The year before, in 2025, the Board had cut $88 million from the same budget unanimously."),
    blk('s3p2', "The event tested the Board's willingness to use its budget authority, and the split vote shows a regulator that is itself divided over pace. This lesson did not find a report that the hospital had filed a new court challenge to the September order. The book refers to the Medical Center's court challenge to the Board's enforcement, and a search found coverage saying the UVM Health Network announced in 2025 that it would appeal the earlier budget decision to the Vermont Supreme Court. The outcome of that appeal could not be confirmed here, so a reader needs to check the court's docket."),

    h2('s4h1', 'November: The Election'),
    blk('s4p1', "On November 3 Governor Scott won a sixth consecutive term, defeating Democrat and Progressive candidate Amanda Janoo, who supported publicly funded universal primary health care, by about seven points with 99 percent counted. Democrats and Progressives regained supermajorities in both chambers, and WCAX reported them with 22 Senate seats and 112 House seats. Democrat Molly Gray defeated the incumbent Republican lieutenant governor. Vermont Public reported that Scott's party would need 11 Senate seats and 51 House seats to sustain a veto, according to the Republican chair's statement as paraphrased in the article."),
    blk('s4p2', "Senate Democrats said they wanted to use their regained power to address health care and housing. WCAX's account of the governor's reaction describes him preparing for veto showdowns. Whether health reform bills such as a successor to S.190 will be the first test is not known as of this writing, and the sources read did not report any specific bill planned for January. The legislature convenes in January, so a first test could come quickly, and organizations should have their scenario plans ready before the session starts."),
    table('s4t1', 'Four 2026 events and what each tested', [
        {'Month': 'June', 'Event': 'Governor vetoes S.190', 'Tested': 'Executive power over a narrower pricing bill', 'Outcome': 'Veto; Act 68 mandate unchanged'},
        {'Month': 'July', 'Event': 'Vermont withdraws from AHEAD', 'Tested': 'Durability of a federal agreement', 'Outcome': 'Agreement ended; state authority continued'},
        {'Month': 'September', 'Event': 'Board orders a 4.4% commercial price cut at the Medical Center, 3-2', 'Tested': 'Regulatory resolve and division', 'Outcome': 'Order issued; hospital warns of losses'},
        {'Month': 'November', 'Event': 'Governor re-elected; opposing supermajorities in the legislature', 'Tested': 'Political support', 'Outcome': 'Divided government with veto-proof legislature'},
    ]),

    h2('s5h1', 'Reading the Pattern'),
    blk('s5p1', "Three observations follow. First, nothing that happened repealed or delayed the statutory core of Act 68. The mandate for reference-based pricing and the schedule for global budgets stand. Second, the contested ground was the application, which groups the pricing covers, how fast the Board moves and how much a specific hospital must cut. Third, the political configuration after November, a governor of one party and a legislature able to override him, makes the next session unusual: legislation that the governor would veto may now become law."),
    blk('s5p1b', "A fourth observation concerns timing. The events were spread across five months and each was reported separately, so a reader following only one of them would have seen a partial picture. Following all four together shows that the reform's financing, its regulation and its politics were moving at the same time."),
    blk('s5p2', "For an organization, that third point is the main change in the risk picture. Before the election, a planner could regard a hospital-pricing bill as likely to be vetoed. After it, a planner has to treat the possibility that more aggressive legislation passes, which raises the probability of faster repricing, while the governor retains regulatory and executive tools. Track 3 turns this into scenarios."),
    warning('s5w1', "Snapshot, not forecast", "These facts are current to late November 2026. The legislature convenes in January, courts may rule and the Board will publish further orders. Check the sources before relying on any of them for a decision, and re-check them when the new session opens."),

    takeaway('tw', [
        "S.190 would have let the Board apply reference-based pricing to marketplace and school employee plans; the governor vetoed it on June 16 on fairness and authority grounds, and Act 68's mandate was unaffected.",
        "On July 24 Vermont announced its withdrawal from AHEAD after anticipated funding was substantially reduced; the Board's chair said nothing changes for hospitals because the state never began the model.",
        "On September 14 the Board voted 3 to 2 to order a 4.4 percent cut in the Medical Center's commercial prices, with the hospital warning of $75 million in losses.",
        "On November 3 the governor won a sixth term by about seven points while Democrats and Progressives regained supermajorities, reported as 22 Senate and 112 House seats.",
        "Nothing in 2026 repealed or delayed the statutory core of Act 68; the contested ground was application, pace and scope.",
        "After the election, legislation the governor would veto may become law, raising the probability of faster repricing; the governor keeps regulatory and executive tools.",
        "Vote counts on S.190, the status of the Medical Center's appeal and hospital and insurer positions could not be confirmed from the sources read.",
    ]),
    quiz('qz',
        "What did nothing in the 2026 events change about Act 68?",
        [
            ("The legislature repealed reference-based pricing", False),
            ("Its statutory core: the mandate for reference-based pricing and the global budget schedule remained in law", True),
            ("The statute's Strategic Plan was cancelled", False),
            ("The Board lost authority over hospital budgets", False),
        ],
        "The S.190 veto, the AHEAD withdrawal, the Board's September order and the election did not repeal or delay Act 68's reference-based pricing mandate or its global budget schedule. The contested questions were the application, pace and scope of the Board's actions."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] Vermont Public, Gov. Phil Scott vetoes 'soft opening' for hospital pricing reforms (June 16, 2026) — https://www.vermontpublic.org/local-news/2026-06-16/gov-phil-scott-vetoes-soft-opening-for-hospital-pricing-reforms; VermontBiz, Scott signs 16 bills, vetoes S.190 on reference-based pricing (June 17, 2026) — https://vermontbiz.com/news/2026/june/17/scott-signs-16-bills-vetoes-s190-reference-based-pricing; VTDigger (June 17, 2026) — https://vtdigger.org/2026/06/17/scott-vetoes-legislatures-latest-attempt-at-healthcare-reform/"),
    blk('src2', "[2] Vermont Agency of Human Services announcement of July 24, 2026, as published by VermontBiz — https://vermontbiz.com/news/2026/july/24/vermont-withdraws-ahead-commits-rural-health-transformation; WCAX (July 28, 2026) — https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/"),
    blk('src3', "[3] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
    blk('src4', "[4] Vermont Public, Phil Scott wins historic sixth term as Vermont governor (November 3, 2026) — https://www.vermontpublic.org/local-news/2026-11-03/phil-scott-wins-historic-sixth-term-as-vermont-governor; WCAX, Scott readies for veto showdowns (November 4, 2026) — https://www.wcax.com/2026/11/04/scott-readies-veto-showdowns-newly-empowered-democratic-supermajority-takes-shape/"),
    blk('src5', "[5] " + BOOK14 + " — §14.1: the 2026 events as the chapter records them"),
]

# ════════════════════════════════════════════════════════════════════════════
L6_SLUG = 'psr-reading-a-veto'
L6_TITLE = 'Reading a Veto: Who Should Capture the Savings?'
L6 = [
    blk('intro1', "The S.190 debate is a good case for a practitioner to study because both sides made arguments that can be tested against the statute and the data. The bill and the veto turned on a question that sits inside every pricing reform: when a price cap produces savings, who should receive them, and in what sequence? This lesson reads the dispute analytically, as an example of how a reform's design questions turn into political fights."),
    blk('intro2', "It sets out the arguments in the words of those who made them, as reported, tests each against Act 68's text, identifies what a reader would need to know to judge them and draws lessons for organizations whose plans depend on the outcome. It does not decide who was right."),
    blk('intro3', "The point is method: how to read a political dispute for the facts and assumptions on which it depends."),

    h2('s1h1', 'The Question Underneath'),
    blk('s1p1', "Reference-based pricing reduces what hospitals receive from commercial payers. The reduction becomes a saving for insurers and, in principle, for the people and employers who pay premiums. Whether it reaches premiums depends on what insurers do with it. Act 68 anticipates the issue: it requires the Board, with the Department of Financial Regulation, to monitor implementation to ensure that decreases in amounts paid to hospitals also result in decreases in premiums, and to post findings annually."),
    blk('s1p2', "S.190 proposed a way to make sure the savings reached particular groups: apply the pricing first to plans where the payer is the public school system or the individual market, in which the Board and the state have a more direct line to premiums. The governor proposed the opposite sequence: spread the savings across all payers through the Board's existing authority. Both are answers to the same problem, the risk that savings are absorbed in the system without reaching consumers."),

    h2('s2h1', 'The Arguments, as Reported'),
    table('s2t1', 'S.190: arguments for and against, in the words reported', [
        {'Position': 'Supporters', 'Argument': 'Soft opening or dry run of whole-market pricing; health costs drive school spending and property taxes; marketplace plans lost thousands of participants after federal subsidies expired; the Board chair called the individual market a market of last resort and said savings are limited for 2027', 'Source': 'Vermont Public'},
        {'Position': 'Governor', 'Argument': 'Savings would exclude most payers; the Board\'s statutory purpose calls for reductions across all payers; the Department of Financial Regulation found advocates\' savings claims do not hold up; Act 68 already codified pricing; rural critical access hospitals opposed', 'Source': 'Veto letter, as reported by Vermont Public and VermontBiz'},
        {'Position': 'Department of Financial Regulation', 'Argument': 'A significant hospital revenue reduction focused on a minority of Vermonters was problematic', 'Source': 'VTDigger (statement made in May)'},
        {'Position': 'Sponsor', 'Argument': 'The governor apparently wants to protect insurance companies rather than Vermonters struggling to pay for health care', 'Source': 'VermontBiz'},
    ]),
    blk('s2p1', "Notice that each argument contains a factual claim that could in principle be checked: whether the savings from the narrower approach would be smaller or larger than the governor's alternative, whether critical access hospitals would have been affected, whether the Board's existing authority could achieve the same result and whether the Board has room to cut further. The sources read did not give the underlying numbers, so this lesson does not adjudicate them."),

    h2('s3h1', 'Testing the Claims Against the Statute'),
    blk('s3p1', "Two of the governor's claims can be read against Act 68. He said Act 68 already codified reference-based pricing, which is accurate: the statute directs the Board to set reference-based prices and to begin not later than hospital fiscal year 2027. He said the Board's statutory purpose is reductions across all payers, citing 18 V.S.A. section 9372, which this lesson did not read directly. The supporters' reply, as reported, was practical: the Board's remaining room is limited, and a targeted start would deliver savings where the state has most leverage."),
    blk('s3p2', "A third point concerns scope. Act 68's reference-based pricing authority, as enacted, does not extend to setting amounts for Medicare or Medicaid enrollees, so the debate was always about commercial prices, which is also where the hospital's revenue loss would occur. Foster said the Board can reduce next year's hospital budgets with or without S.190, but cannot cut much more without risking the hospital system's finances, which links the pricing dispute directly to hospital solvency."),
    callout('s3c1', "A pricing reform has two ledgers: what hospitals lose and who gains. The political fight is mostly about the second ledger, but the financial risk to hospitals depends on the first."),

    h2('s4h1', 'What a Practitioner Should Take From It'),
    blk('s4p1', "First, identify the factual claims inside each argument and ask for the numbers. A claim that savings 'do not hold up' or that 'there would be no discernible effect' needs an analysis behind it, and a careful reader asks to see it. Second, notice which elements of the dispute are about design, such as which payers and in what sequence, and which are about authority, such as whether the Board can already act. Third, recognize that a veto leaves the underlying statute in place, so the practical question becomes what the regulator does next."),
    blk('s4p2', "For a hospital, the dispute shows that the pace of repricing is contested within the state's own leadership. The Board's chair and the governor disagreed on sequencing but both accepted that hospital revenue is being reduced through the budget review. The September order for the Medical Center, with its 4.4 percent commercial price cut, suggests the Board continued to reduce revenue through the budget process. A hospital planning around a delay in pricing should recognize that budget orders can deliver reductions without a new statute."),
    blk('s4p3', "For an insurer or an employer, the dispute shows that premium effects are what the public will measure the reform by, and that the statute's annual monitoring requirement is the vehicle. For a legislator, the post-election arithmetic changes the calculation: a successor bill that addresses the governor's fairness objection, for example by applying savings to all commercial payers, could be both more defensible and more durable than one that can only pass over a veto."),
    steps('s4st1', 'A method for reading a policy dispute', [
        ('List the claims', 'Separate factual claims from claims about values or authority.'),
        ('Find the numbers', 'Ask for the analysis behind each factual claim and note which are missing.'),
        ('Check the statute', 'Test authority claims against the enacted text.'),
        ('Identify what remains in force', 'A veto or a failed bill leaves existing authority in place; ask what the regulator will do next.'),
        ('Map the effect on your plan', 'Decide which of your assumptions depend on the outcome and how.'),
    ]),

    h2('s5h1', 'Scenarios for the Next Session'),
    blk('s5p1', "With a legislature able to override, the S.190 dispute may return in one of several forms, and an organization can plan for each. In the first, the legislature passes a similar bill and overrides a veto, giving the Board explicit direction to start pricing in the individual and school employee markets. The financial effect on hospitals would be a targeted revenue reduction from those payers, probably phased in with the next budget cycle. In the second, the legislature passes a revised bill that applies pricing to all commercial payers, answering the fairness objection, which would mean broader repricing, sooner, than the narrower version."),
    blk('s5p3', "In the third, the legislature and governor negotiate a compromise, perhaps one that sets a schedule, adds protections for critical access hospitals or ties the pace to the Board's premium monitoring. In the fourth, no bill passes and the Board proceeds through its existing authority, with its budget orders and its reference-based pricing rule as the main vehicles. Each scenario has different consequences for a hospital's commercial revenue, and the probabilities are matters of judgment. Track 3 shows how to assign them and how to decide which investments to protect."),
    blk('s5p5', "Finally, remember that the Board is a fifth actor in every scenario. Even a bill that passes will be implemented by a five-member board that split three to two on its most recent major budget decision, and whose membership changes over time, since the reporting noted one member's departure. The practical meaning is that implementation choices, pace and exceptions will carry as much weight as the statute."),
    blk('s5p4', "None of these scenarios has a published probability from the sources read, and this lesson assigns none. The useful exercise is to write down, for each, what the organization would do in the first ninety days and which of its current commitments would still make sense."),

    takeaway('tw', [
        "S.190 and the veto turned on a question inside every pricing reform: who should capture the savings, and in what sequence.",
        "Act 68 requires the Board and the Department of Financial Regulation to monitor whether hospital price decreases produce premium decreases and to post findings annually.",
        "Supporters argued for a targeted start for marketplace and school employee plans; the governor argued for savings across all payers and that Act 68 already codified pricing.",
        "Each argument contains factual claims that the sources read did not support with numbers, so this lesson does not adjudicate them.",
        "Act 68's pricing authority does not extend to amounts for Medicare or Medicaid enrollees, so the dispute concerns commercial prices.",
        "A veto leaves the statute in place, and budget orders can deliver reductions without new legislation, as the Medical Center order shows.",
        "A successor bill that addresses the fairness objection could be more defensible and more durable than one that passes only over a veto.",
    ]),
    quiz('qz',
        "After a veto of a narrower pricing bill, what remains the regulator's authority?",
        [
            ("None; the veto cancels all pricing authority", False),
            ("Act 68's existing authority to set reference-based prices and review hospital budgets remains in force", True),
            ("Only authority over Medicare and Medicaid prices", False),
            ("The authority passes to the governor alone", False),
        ],
        "The veto of S.190 left Act 68 in place. The Board continues to have authority to set reference-based prices, review hospital budgets annually and monitor premium effects, and its September order for the Medical Center shows it using budget authority."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] Vermont Public, Gov. Phil Scott vetoes 'soft opening' for hospital pricing reforms (June 16, 2026) — https://www.vermontpublic.org/local-news/2026-06-16/gov-phil-scott-vetoes-soft-opening-for-hospital-pricing-reforms"),
    blk('src2', "[2] VermontBiz, Scott signs 16 bills, vetoes S.190 on reference-based pricing (June 17, 2026) — https://vermontbiz.com/news/2026/june/17/scott-signs-16-bills-vetoes-s190-reference-based-pricing"),
    blk('src3', "[3] VTDigger, Scott vetoes Legislature's latest attempt at healthcare reform (June 17, 2026) — https://vtdigger.org/2026/06/17/scott-vetoes-legislatures-latest-attempt-at-healthcare-reform/"),
    blk('src4', "[4] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — reference-based pricing (18 V.S.A. § 9376(e)) and premium monitoring"),
    blk('src5', "[5] Vermont Public, In split vote, regulators again cut into the University of Vermont Medical Center's budget (September 14, 2026) — https://www.vermontpublic.org/local-news/2026-09-14/in-split-vote-regulators-again-cut-into-uvmmcs-budget"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5), (L6_SLUG, L6_TITLE, L6, 6)]
if __name__ == '__main__':
    run(LESSONS)
