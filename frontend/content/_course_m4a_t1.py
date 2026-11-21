exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 1 — Foundations: the terms, and the lens
# Facts: book-audit/deep/sources/m4a/VERIFIED_FACTS_M4A.md §§ A, B, G, I, I2; HTR book Chapter 1 (§1.3, §1.4,
# "What Earns a Place in the Matrix", §1.12.1). Written 2026-11-21.

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'm4a-terms'
L1_TITLE = 'Single Payer, Medicare for All, and the Alternatives'
L1 = [
    blk('intro1', "\"Medicare for All\" is used to mean several different things: a specific pair of federal bills, single-payer financing in general, and sometimes almost any plan that lets more people into Medicare. Those are not interchangeable. The differences between them decide who is covered, who pays, what happens to employer insurance, and which of Vermont's problems from 2011 to 2014 would come back at the national level."),
    blk('intro2', "This lesson sets out the vocabulary the rest of the course uses. It defines single payer, describes what the two Medicare for All bills actually do, separates them from the two leading alternatives in Congress, and explains why Vermont's Green Mountain Care belongs in its own category. Each definition is tied to the text of a statute or a bill, not to how the term is used in debate."),
    blk('intro3', "Get the terms right first. Every later lesson, from the federal-versus-state comparison to the five-pillar assessment, depends on being clear about which design is being tested."),

    h2('s1h1', 'What "Single Payer" Means'),
    blk('s1p1', "In a single-payer system, one public plan pays for covered care for everyone in a jurisdiction, replacing private insurers for those benefits. The term describes how care is financed, not who delivers it. Hospitals and clinicians can stay public or private; what changes is that the bills for covered services go to one payer instead of many."),
    blk('s1p2', "Vermont's own design work shows that \"single payer\" itself covers a range. The report the state commissioned under Act 128 of 2010, led by William Hsiao and released in January 2011, was asked to design three options: a government-run single payer, a public option that would compete with private plans, and a public-private single payer. Hsiao recommended the third: one publicly governed plan, with an independent board, contracting out claims administration and provider relations to private organizations."),
    blk('s1p3', "That distinction matters later in this course. A public-private single payer can still be single payer. What makes a design single payer is that one plan pays for the covered benefit package for everyone in scope, not who processes the claims."),
    callout('s1c1', "Single payer is a financing design: one public plan pays for covered care for everyone in a jurisdiction. Who administers claims, and who owns the hospitals, are separate questions."),
    example('s1ex1', "The Hsiao report's three options (Vermont, January 2011)", "Act 128 of 2010 asked a team led by William Hsiao to design options for Vermont: a government-run single payer, a public option, and a public-private single payer. Hsiao recommended the public-private single payer, financed by a payroll tax and governed by an independent board.\nThe report estimated accumulated savings of 16.1% to 25.3% depending on the option, and itself called those savings \"inherently uncertain\". Lesson 4 follows what happened to those estimates once the state tried to finance the plan."),

    h2('s2h1', 'The Medicare for All Bills'),
    blk('s2p1', "\"Medicare for All\" in the narrow sense is a specific federal single-payer design, introduced in the 119th Congress as S.1506 in the Senate (Sen. Bernie Sanders) and H.R.3069 in the House (Rep. Pramila Jayapal), both on April 29, 2025. Both bills establish one national health insurance program and entitle every resident of the United States to its benefits."),
    blk('s2p2', "The core features are shared. There are no premiums and no cost-sharing, except that S.1506 lets the Secretary set an evidence-based cost-sharing schedule for prescription drugs. From the date benefits begin, it becomes unlawful for an insurer to sell, or an employer to provide, coverage that duplicates the program's benefits, although supplemental coverage remains legal. Separate Medicare, Medicaid and CHIP benefits end, and their funding moves into the new program's trust fund. Coverage through the Department of Veterans Affairs, TRICARE and the Indian Health Service is left unchanged."),
    blk('s2p3', "The bills differ in pace and in long-term care. S.1506 phases in over four years, covering children in its first year and opening a Medicare buy-in at ages 55, then 45, then 35 on the way. It leaves institutional long-term care in state Medicaid programs. H.R.3069 starts full benefits two years after enactment and makes both institutional and home-based long-term services a federal benefit. Lesson 9 works through both bills section by section."),
    highlight('s2hl1', "In this course, \"Medicare for All\" means S.1506 and H.R.3069 specifically: one national program, no premiums, duplicate private coverage unlawful, Medicare and Medicaid folded in."),
    table('s2t1', 'Medicare for All: the two bills at a glance', [
        {'Feature': 'Sponsor', 'S.1506': 'Sen. Sanders (I-VT)', 'H.R.3069': 'Rep. Jayapal (D-WA)'},
        {'Feature': 'Introduced', 'S.1506': 'April 29, 2025', 'H.R.3069': 'April 29, 2025'},
        {'Feature': 'Full benefits begin', 'S.1506': 'Jan 1 of the 4th calendar year after enactment', 'H.R.3069': '2 years after enactment'},
        {'Feature': 'Cost-sharing', 'S.1506': 'None, except an optional drug schedule', 'H.R.3069': 'None'},
        {'Feature': 'Institutional long-term care', 'S.1506': 'Stays in state Medicaid', 'H.R.3069': 'Federal benefit'},
    ]),

    h2('s3h1', 'Medicare for America: Universal, but Not Single Payer'),
    blk('s3p1', "On October 29, 2026, Rep. Rosa DeLauro introduced H.R.10924, the Medicare for America Act of 2026. Like the Medicare for All bills, it creates a national program covering all U.S. residents and would be fully implemented in 2028, with a transitional public option on the health insurance exchanges in 2028 and 2029."),
    blk('s3p2', "It is not single payer, because employer coverage survives. The bill keeps \"qualified employer-based coverage\" and allows Medicare Advantage-style private plans within the program. People pay premiums, capped at 8% of income and set to zero below 200% of the federal poverty level. Small employers, defined by payroll or headcount, either provide coverage or enroll their staff. Unlike S.1506 and H.R.3069, it also carries its own taxes: a surtax, a Medicare payroll tax, changes to the net investment income tax, and excise taxes on tobacco, alcohol and sugared drinks."),
    blk('s3p3', "Those two differences, keeping employer coverage and naming its revenue, matter more than the shared name suggests. They are exactly the two design choices that Vermont struggled with, as Tracks 2 and 3 show."),
    compare('s3cmp1', 'Two universal designs',
        'Medicare for All (S.1506 / H.R.3069)', ['One public plan for covered benefits', 'Duplicate employer coverage unlawful', 'No premiums', 'No revenue title in the bill'],
        'Medicare for America (H.R.10924)', ['National program plus private plans within it', 'Qualified employer coverage kept', 'Premiums capped at 8% of income', 'Surtax, payroll and excise taxes in the bill']),

    h2('s4h1', 'Buy-Ins: Expanding Medicare Without Universal Coverage'),
    blk('s4p1', "A Medicare buy-in lets people join Medicare before age 65. It is not universal coverage and not single payer: private insurance and employer coverage continue for everyone who does not choose to buy in. Buy-ins appear in two places in current legislation."),
    blk('s4p2', "First, S.1506 itself uses a temporary buy-in as a bridge: during its transition, people aged 55 and over, then 45, then 35 can enroll in a Medicare option before the full program begins. Second, on November 10, 2026, Sen. Tammy Baldwin and nine Democratic colleagues introduced the Medicare at 50 Act, which would let people aged 50 to 64 buy into Medicare, with the same benefits as Parts A, B and D, the option of a Medicare Advantage plan, and the same premium tax credits and cost-sharing help they could get on the ACA marketplace."),
    blk('s4p3', "Baldwin's release explains the motivation in cost terms: it says that in 2026 marketplace premiums for people aged 50 to 64 doubled and enrollment in that age group fell by 6%. A buy-in addresses that group directly, without restructuring how hospitals are paid. Lesson 10 compares the alternatives in more depth."),
    warning('s4w1', "Don't confuse a buy-in with Medicare for All", "A buy-in adds an option; Medicare for All replaces the insurance system for covered benefits. A buy-in can pass on its own, and S.1506 contains one, but the two make very different demands on hospitals, employers and federal financing."),

    h2('s5h1', 'Green Mountain Care: A State Plan With Federal Limits'),
    blk('s5p1', "Vermont's Act 48 of 2011 created Green Mountain Care, a universal, publicly financed plan for which \"all Vermont residents shall be eligible ... regardless of whether an employer offers health insurance.\" It was designed as single payer for Vermonters, but a state cannot override federal programs or federal law. Act 48 therefore made Green Mountain Care the secondary payer to Medicare (unless CMS let the state administer Medicare), to federal employee, military and veterans' coverage, and to private and employer plans. Without federal waivers it would also have been secondary to Medicaid and CHIP."),
    blk('s5p2', "So Green Mountain Care was single payer only for the people and the dollars a state can reach. That boundary, and not the idea of single payer, is the subject of Track 3. The plan was never implemented. The Green Mountain Care Board that Act 48 created on July 1, 2011 survived, and is today the state's hospital budget regulator."),
    blk('s5p3', "One practical note on the name. The old greenmountaincare.org address now redirects to the Department of Vermont Health Access's Medicaid pages, and the Green Mountain Care Board is a regulator, not an insurer. When you read \"Green Mountain Care\" in a document, check whether it means the 2011 plan, the Board, or current state coverage."),
    quote('s5q1', "\"Upon implementation, all Vermont residents shall be eligible for Green Mountain Care, regardless of whether an employer offers health insurance for which they are eligible.\" (Act 48 of 2011, 33 V.S.A. § 1824)"),
    table('s5t1', 'Five designs on one page', [
        {'Design': 'Single payer (general)', 'Who is covered': 'Everyone in the jurisdiction', 'Employer coverage': 'Replaced for covered benefits', 'Example': 'Hsiao option 3 (2011)'},
        {'Design': 'Medicare for All', 'Who is covered': 'Every U.S. resident', 'Employer coverage': 'Duplicate coverage unlawful', 'Example': 'S.1506, H.R.3069'},
        {'Design': 'Medicare for America', 'Who is covered': 'All U.S. residents', 'Employer coverage': 'Qualified coverage kept', 'Example': 'H.R.10924'},
        {'Design': 'Medicare buy-in', 'Who is covered': 'Those who choose to buy in', 'Employer coverage': 'Unchanged', 'Example': 'Medicare at 50 Act'},
        {'Design': 'Green Mountain Care', 'Who is covered': 'Vermont residents', 'Employer coverage': 'Allowed; GMC pays second', 'Example': 'Act 48 of 2011'},
    ]),

    h2('s6h1', 'Why the Definitions Change the Analysis'),
    blk('s6p1', "Every design above makes a different demand on the five pillars. A buy-in needs authority and money for one age group; Medicare for All needs authority to amend federal employee-benefit law, to fold two federal programs together, and to raise or redirect several trillion dollars a year. Treating them as the same thing produces analysis that is either too pessimistic about the small step or too optimistic about the large one."),
    blk('s6p2', "The rest of the course keeps the designs apart. When a lesson tests \"Medicare for All\", it means S.1506 or H.R.3069. When it discusses Vermont, it means Act 48's Green Mountain Care. When it compares alternatives, it names them."),
    callout('s6c1', "Before you evaluate a reform, name the design: who is covered, what happens to employer coverage, who pays, and which existing programs it absorbs."),

    takeaway('tw', [
        "Single payer is a financing design: one public plan pays for covered care for everyone in a jurisdiction, while providers can remain private.",
        "Vermont's 2011 Hsiao report designed three options and recommended a public-private single payer financed by a payroll tax.",
        "Medicare for All means S.1506 and H.R.3069: a national program for every resident, no premiums, duplicate private coverage unlawful, Medicare and Medicaid folded in.",
        "S.1506 phases in over four years and leaves institutional long-term care with state Medicaid; H.R.3069 takes two years and makes long-term care federal.",
        "Medicare for America (H.R.10924) is universal but keeps employer coverage, charges premiums capped at 8% of income, and names its taxes.",
        "A buy-in, such as the Medicare at 50 Act, adds an option for an age group and leaves the rest of the system in place.",
        "Green Mountain Care was single payer only for what a state can reach: by law it paid second to Medicare, federal plans and private or employer coverage.",
    ]),
    quiz('qz', "Which feature most clearly separates Medicare for America (H.R.10924) from Medicare for All (S.1506 / H.R.3069)?", [
        ("Medicare for America covers only people aged 50 to 64", False),
        ("Medicare for America keeps qualified employer coverage, charges income-capped premiums and includes its own taxes", True),
        ("Medicare for America leaves Medicaid and CHIP untouched and covers only the uninsured", False),
        ("Medicare for America is a state program modelled on Vermont's Act 48", False),
    ], "H.R.10924 covers all U.S. residents but keeps qualified employer-based coverage, caps premiums at 8% of income, and carries a tax title, while S.1506 and H.R.3069 make duplicate coverage unlawful, charge no premiums and contain no revenue provisions. The buy-in for ages 50 to 64 is Sen. Baldwin's Medicare at 50 Act, a different bill."),
    *sources(['hsiao', 's1506', 'hr3069', 'hr10924', 'baldwin', 'act48', 'act48page'], {
        'hsiao': "the three options, Hsiao's recommendation, payroll financing, the 16.1%-25.3% savings estimate",
        's1506': "§§ 102, 106, 107, 202, 204, 701, 901, 1011: entitlement, phase-in, duplicate coverage, cost-sharing, long-term care, trust fund, buy-in",
        'hr3069': "§ 106 two-year start; § 204 long-term services as a federal benefit",
        'hr10924': "employer coverage kept, 8% premium cap, 2028 implementation, transitional public option, tax title",
        'baldwin': "Medicare at 50 Act: ages 50-64, Parts A, B, D and MA option, ACA-level subsidies, 2026 premium and enrollment figures",
        'act48': "§ 1824 eligibility; § 1827(e)-(g) secondary-payer rules; § 9374 Board created July 1, 2011",
        'act48page': "the greenmountaincare.org redirect and the Board's current role",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'm4a-sequencing-lens'
L2_TITLE = 'Reading a Reform Through the Five-Pillar Test'
L2 = [
    blk('intro1', "Most arguments about Medicare for All are arguments about whether it is a good idea. This course asks a different question: in what order would it have to be built, and which parts of that order are in place today? That is the question the five-pillar framework in Chapter 1 of Transforming Healthcare is designed to answer."),
    blk('intro2', "This lesson sets up the tool. It recaps the five pillars and what each one issues, the rule for when one pillar depends on another, the three dependencies the book treats as non-negotiable, and the Equity Imperative each pillar must pass. It then shows how the course turns those ideas into an assessment of Medicare for All, and what kind of judgment that assessment is."),
    blk('intro3', "If you have taken Five Pillars, One Imperative, much of this will be review. The new part is the application: a federal reform of this size has not been run through the framework before on this platform."),

    h2('s1h1', 'Five Pillars, Five Currencies'),
    blk('s1p1', "The framework divides any health transformation into five pillars: Policy, Technology, Economics, Clinical and Operations. Each has a diagnostic question. Policy asks whether a reform is permissible, Technology whether it is possible, Economics whether it is sustainable, Clinical whether it is effective, and Operations whether it is executable."),
    blk('s1p2', "Chapter 1 adds a sharper idea: each pillar issues exactly one thing, its currency. Policy issues AUTHORITY: mandates, prohibitions, statutory deadlines and the power to appropriate. Technology issues INFORMATION: trustworthy data, fast enough to act on. Economics issues INCENTIVES: the financial consequences attached to behaviour, such as reference-based pricing or global budgets. Clinical issues OUTCOMES: care delivered and its measured result. Operations issues CAPACITY: people, credentials, management infrastructure and project discipline."),
    blk('s1p3', "The currencies are what make the pillars distinct rather than five labels for important things. They also make the framework testable. For any reform, you can ask of each pillar: has it issued its currency yet, or only promised to?"),
    table('s1t1', 'The five currencies (HTR book, Chapter 1)', [
        {'Pillar': 'Policy', 'Question': 'Is it permissible?', 'Currency': 'Authority'},
        {'Pillar': 'Technology', 'Question': 'Is it possible?', 'Currency': 'Information'},
        {'Pillar': 'Economics', 'Question': 'Is it sustainable?', 'Currency': 'Incentives'},
        {'Pillar': 'Clinical', 'Question': 'Is it effective?', 'Currency': 'Outcomes'},
        {'Pillar': 'Operations', 'Question': 'Is it executable?', 'Currency': 'Capacity'},
    ]),

    h2('s2h1', 'Gates: When One Pillar Waits for Another'),
    blk('s2p1', "Chapter 1 sets a narrow rule for when one pillar depends on another: a dependency exists when the downstream pillar cannot produce its intended result until the upstream pillar delivers something specific and nameable. \"Cannot\" means genuinely stuck, not merely better off. \"Intended result\" means the downstream pillar's own output."),
    blk('s2p2', "Each dependency acts like a gate. Until the upstream pillar has issued its currency, the gate is closed, and work downstream of it cannot deliver what it is meant to deliver, however much effort goes into it. The test is simple to state: name what flows, then ask which pillar issues it. If the upstream pillar issues it, the dependency is real."),
    blk('s2p3', "Three dependencies are treated as non-negotiable. Section 1.12.1 names them: Policy enables Economics, Economics drives Clinical, and Technology enables Economics-as-management. The book is blunt about violating them: it \"does not produce suboptimal results; it produces failed interventions that generate political resistance to the correct interventions that follow.\" A critical-path gate cannot be shortcut by putting more resources downstream."),
    callout('s2c1', "A gate is open only when the upstream pillar has actually issued its currency. A bill in committee has not issued authority. A plan to raise money has not issued incentives."),
    steps('s2st1', 'Testing a dependency', [
        ('Name what flows', 'State exactly what the downstream pillar needs, e.g. "a law requiring all payers to participate".'),
        ('Find its issuer', 'Ask which pillar issues that currency. A legal requirement is authority, so it comes from Policy.'),
        ('Check whether it has been issued', 'Look for the enacted statute, the running data feed or the funded payment, not the proposal.'),
        ('Read the gate', 'Issued means open. Promised, proposed or pending means closed.'),
    ]),

    h2('s3h1', 'What Each Pillar Would Have to Issue for Medicare for All'),
    blk('s3p1', "Applied to Medicare for All, the currencies become concrete. Policy would have to issue an enacted statute: the universal entitlement, the ban on duplicate coverage, the amendment to federal employee-benefit law, the merger of Medicare and Medicaid funding and, as Vermont shows, a financing law. Technology would have to issue the information needed to set a national budget and pay thousands of institutions: historical volume, costs and outcomes for every provider."),
    blk('s3p2', "Economics would have to issue incentives that are real, which means a payment design and the money behind it. Clinical would have to issue outcomes: care that actually changes and can be measured. Operations would have to issue the capacity to run the transition: staff, regional administration, a workforce pipeline and help for the workers whose jobs the transition removes."),
    blk('s3p3', "Track 5 takes each pillar in turn and asks whether that currency exists today. The answers are not all the same. Some of what Medicare for All needs already exists in Medicare's own systems; some of it does not exist anywhere yet."),
    compare('s3cmp1', 'Promised versus issued',
        'Promised (gate closed)', ['A bill referred to committee', 'A financing plan with no named revenue', 'A care model in a design document', 'A hiring plan'],
        'Issued (gate open)', ['An enacted statute', 'A financing law and appropriations', 'Care being delivered and measured', 'Staff in post and systems running']),

    h2('s4h1', "Vermont's Act 48 as a Worked Example"),
    blk('s4p1', "Vermont's Act 48 shows the difference between issuing authority and promising it, because the statute did both. It issued real authority for an institution: the Green Mountain Care Board came into existence on July 1, 2011, with a chair and four members. It did not issue authority for the plan itself. Green Mountain Care could begin only 90 days after the last of five conditions was met, one of which was a separate law establishing its financing."),
    blk('s4p2', "In the framework's terms, Policy issued one currency and withheld another. The Board, whose authority was real, survived and became the regulator that sets Vermont's hospital budgets. The plan, whose financing authority was never issued, stopped at that gate in December 2014. Track 2 tells that story in detail."),
    example('s4ex1', 'Act 48 of 2011: one gate opened, one left closed', "Act 48 created the Green Mountain Care Board on July 1, 2011 (18 V.S.A. § 9374) and made Green Mountain Care conditional on five triggers in 33 V.S.A. § 1822: a federal § 1332 waiver, a law establishing the financing, Board approval of the benefit package, appropriations, and a set of Board findings, including that the plan would not harm Vermont's economy.\nThe Board was created on schedule. The financing law was never proposed: on December 17, 2014, the Governor announced he could not recommend public financing."),

    h2('s5h1', 'The Equity Imperative on Every Pillar'),
    blk('s5p1', "The framework has a sixth question, and it is deliberately not a sixth pillar: is it just? Chapter 1 calls this the Equity Imperative, a test each pillar must pass on its own terms. A reform can be permissible, possible, sustainable, effective and executable and still fail it."),
    blk('s5p2', "Each pillar carries its own version of the question. Does the mandate close disparities or widen them? Does the data make disparities visible or bury them in averages? Do the incentives reward serving the hardest-to-reach, or penalize it? Is care effective, and effective for whom? Is the change executable everywhere, including in rural and under-resourced places?"),
    blk('s5p3', "Medicare for All is often argued for on equity grounds, and universal coverage with no cost-sharing does close two gaps by design: who is covered and whether price stops people getting care. The pillar-by-pillar questions keep that from becoming the whole answer. Track 5 asks all five for every pillar."),
    highlight('s5hl1', "Equity is not a sixth pillar. It is the question every pillar must answer: is it just?"),

    h2('s6h1', 'What an HTR Assessment Is, and Is Not'),
    blk('s6p1', "Each pillar lesson in Track 5 ends with an HTR assessment: CLOSED, CONDITIONALLY OPEN, NOT YET TESTABLE, or OPEN. These are sequencing judgments. They say whether a pillar can issue what the pillars downstream of it need, now, given the evidence. They are not a verdict on whether Medicare for All is a good policy."),
    blk('s6p2', "Two consequences follow. First, a CLOSED gate is not an argument against the reform. It says where the work is. Second, the assessments can change as facts change: an enacted statute would open the Policy gate overnight. The course records the evidence date for each assessment so a reader can tell when it needs to be revisited."),
    warning('s6w1', 'A sequencing judgment is not a policy position', "The course takes no side on whether the United States should adopt Medicare for All. It asks which gates are open, which are closed, and what would open them, using the same test the book applies to Vermont's own reforms."),
    blk('s6p3', "You can run the same test yourself on the platform. The Medicare for All hub sets out the assessments with their sources, and the Single-Payer Modeler shows what one of the hardest gates, Economics, would mean for Vermont's fourteen hospitals."),

    takeaway('tw', [
        "The five pillars ask whether a reform is permissible, possible, sustainable, effective and executable.",
        "Each pillar issues one currency: Policy authority, Technology information, Economics incentives, Clinical outcomes, Operations capacity.",
        "A dependency exists when a downstream pillar cannot produce its intended result until an upstream pillar delivers something specific and nameable.",
        "Three dependencies are critical path: Policy enables Economics, Economics drives Clinical, and Technology enables Economics-as-management.",
        "A gate is open only when the currency has been issued: an enacted law, running data, funded payment. Proposals do not open gates.",
        "Act 48 issued authority for the Green Mountain Care Board but not for the plan's financing, and the plan stopped at that gate.",
        "HTR assessments are sequencing judgments, dated and revisable, not positions for or against Medicare for All.",
    ]),
    quiz('qz', "Under the five-pillar test, why is the Policy gate for Medicare for All not open, even though S.1506 contains a detailed universal entitlement?", [
        ("Because Policy is not on the critical path for single-payer reform", False),
        ("Because the bill text has not been enacted, so the authority it describes has not been issued", True),
        ("Because Technology must open before Policy can", False),
        ("Because universal coverage fails the Equity Imperative", False),
    ], "A gate opens only when the upstream pillar has actually issued its currency. For Policy that currency is authority, which a bill in committee describes but does not confer. Policy enables Economics is one of the three critical-path dependencies, so this gate matters a great deal."),
    *sources(['book1', 'act48', 'gmc14', 's1506', 'hub'], {
        'book1': "the five diagnostic questions; the currencies table and 'What Earns a Place in the Matrix'; §1.12.1 critical-path dependencies; the Equity Imperative",
        'act48': "§ 9374 Board created July 1, 2011; § 1822 five implementation conditions",
        'gmc14': "p. 6: the Governor's December 17, 2014 announcement",
        's1506': "the universal entitlement and other provisions a statute would have to enact",
        'hub': "HTR's five-pillar assessments of Medicare for All with sources",
    }),
]

run([(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2)])
