exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 4 — The Federal Bills and the Evidence
# Facts: S.1506 §§ 101-107, 201-206, 301, 303, 401, 403, 601-602, 611-617, 701, 801-803, 901-902, 1001-1005,
# 1011-1012 (introduced text); H.R.3069 §§ 106, 204, 611, 701, 1001; H.R.10924 (text + CRS summary: §§ 104, 126,
# Title II, Title III, rates 2028-2033, large employers); billstatus files; Baldwin release (read via fetch agent);
# Roll Call 2026-11-18; CBO Swagel testimony 2022-05-12. VERIFIED_FACTS_M4A.md §§ G, H, I. 2026-11-21.

# ════════════════════════════════════════════════════════════════════════════
L9_SLUG = 'm4a-s1506'
L9_TITLE = 'Inside S.1506 and H.R.3069'
L9 = [
    blk('intro1', "Most people who argue about Medicare for All have not read the bill. This lesson reads it, section by section, so that the later assessment rests on what S.1506 and its House companion H.R.3069 actually say: who is covered and when, what is covered, how providers are paid, how the program is run, and how the transition works."),
    blk('intro2', "Track 3 already covered the provisions that take down Vermont's three federal walls: folding in Medicare and Medicaid (§§ 701, 901), amending ERISA (§ 801) and replacing the exchanges (§ 902). This lesson covers the rest of the bill and refers back where they meet."),

    h2('s1h1', 'Who Is Covered, and When'),
    blk('s1p1', "Section 102 entitles every resident of the United States to the program's benefits, with residency defined by rule. The Secretary may extend eligibility to others, and must write a rule, consistent with immigration law, to prevent people travelling to the United States solely to obtain care. Section 105 requires automatic enrollment at birth or on establishing residency, and a Medicare for All card for each enrollee. Section 103 gives every enrollee the right to obtain care from any qualified participating provider, and section 104 prohibits discrimination on a long list of grounds, including previous or existing medical conditions."),
    blk('s1p2', "The timetable is the main difference between the two bills. Under S.1506, full benefits begin on January 1 of the fourth calendar year after enactment; children under 19 are covered from January 1 of the first calendar year after enactment. In the meantime, a temporary Medicare buy-in opens to people aged 55 and over in the first year, 45 in the second and 35 in the third (§ 1011), and a public \"Medicare Transition plan\" is offered on the exchanges (§ 1012). H.R.3069 moves faster: full benefits two years after enactment, with under-19s and people aged 55 and over covered after one year."),
    analogy('s1an1', "S.1506 is like moving a whole city onto a new water system one neighbourhood at a time: children first, then older residents, then the rest, with a temporary connection for anyone waiting. H.R.3069 moves everyone in two years.", 'The S.1506 and H.R.3069 phase-ins'),
    table('s1t1', 'Phase-in, S.1506 (illustrative: law enacted during 2027)', [
        {'When': '2028', 'What happens': 'Children under 19 covered; Medicare buy-in opens at age 55'},
        {'When': '2029', 'What happens': 'Buy-in age falls to 45'},
        {'When': '2030', 'What happens': 'Buy-in age falls to 35'},
        {'When': 'Jan 1, 2031', 'What happens': 'Full benefits for every resident (4th calendar year after enactment)'},
    ]),

    h2('s2h1', 'What Is Covered'),
    blk('s2p1', "Section 201 lists the covered benefits, payable when \"medically necessary or appropriate\". They include hospital services, ambulatory and primary and preventive care, prescription drugs and devices including all FDA-approved contraceptives, mental health and substance use treatment, laboratory and diagnostic services, comprehensive reproductive care including abortion, maternity and newborn care, gender-affirming care, oral health, audiology and vision, rehabilitative and habilitative services, emergency services and transportation, pediatric screening and treatment, necessary transportation for people with disabilities, older people with functional limits and low-income people, and home- and community-based long-term services and supports."),
    blk('s2p2', "Section 202 bars deductibles, coinsurance, copayments and similar charges, with one exception: the Secretary may set an evidence-based cost-sharing schedule for prescription drugs that encourages generics and does not apply to preventive drugs. Section 203 limits benefits to items meeting the Secretary's standards, with national coverage determinations for experimental services and an appeals process modelled on Medicare's. Section 206 lets states add standards for eligibility, benefits and providers, as long as they do not restrict eligibility or reduce access."),
    blk('s2p3', "Long-term care is split. Home- and community-based services are federal benefits under § 201. Institutional long-term care stays with state Medicaid programs under § 204, with a maintenance-of-effort requirement. H.R.3069 instead makes long-term services and supports, in institutions and at home, a federal benefit."),
    compare('s2cmp1', 'Benefits compared with Vermont\'s 2014 design',
        'Green Mountain Care (2014 design)', ['About 94% actuarial value; average 6% out of pocket', 'No long-term care', 'No adult dental, adult vision or hearing', 'Dental and vision to age 21 only'],
        'S.1506', ['No cost-sharing except an optional drug schedule', 'Home and community long-term care federal; institutional care in Medicaid', 'Oral health, audiology and vision covered', 'Reproductive and gender-affirming care listed']),

    h2('s3h1', 'How Providers Are Paid'),
    blk('s3p1', "Title VI sets up the payment system. Each year the Secretary sets a national health budget with components for operating costs, capital, special projects, quality assessment, health-professional education, administration, a reserve, and prevention and public health (§ 601). Institutions (hospitals, skilled nursing facilities and independent dialysis facilities) are paid a quarterly lump-sum global budget, \"payment in full for all operating expenses\", negotiated with a regional director from factors including three years of historical volume, the provider's Medicare cost report compared with peers, projected volume, wages and staffing, and capacity (§ 611). H.R.3069's version also lists federally qualified health centers."),
    blk('s3p2', "Individual providers are paid fee-for-service under a national fee schedule that takes Medicare's amounts into account and uses Medicare's existing payment processes (§ 612). Drug, supply and equipment prices are negotiated annually, with a formulary that promotes generics (§ 614). Capital is funded separately, by application, with priority for underserved areas and health disparities, and no payment may be used for marketing or for \"the profit or net revenue of the provider\" (§ 615)."),
    callout('s3c1', "S.1506 pays institutions a negotiated operating budget, pays clinicians from a national fee schedule, funds capital separately, and bars payments toward profit. Track 6 shows what the institutional part would mean for Vermont's hospitals."),

    h2('s4h1', 'How the Program Is Run'),
    blk('s4p1', "The Secretary of Health and Human Services administers the program (§ 401), with duties ranging from eligibility rules to planning for capital and health-professional education, and must set uniform reporting standards for a national database on practitioners, costs, quality, outcomes and health equity. Regional offices, built where possible on CMS's own, each have a regional director, a deputy for tribal health and a deputy for home- and community-based services, and each submits an annual regional needs assessment (§ 403). A beneficiary ombudsman handles complaints (§ 404)."),
    blk('s4p2', "Providers must meet participation standards and sign participation agreements (§ 301), and may contract privately with patients only for services billed entirely outside the program (§ 303). Quality standards run through CMS's Center for Clinical Standards and Quality (§ 501). New offices for health equity (§ 616) and primary health care (§ 617) sit within HHS. For workers in insurance administration who may lose jobs, at least 1% of the national budget is set aside for up to five years (§ 602)."),
    stat_grid('s4sg1', [
        ('8', 'Components of the national health budget', 'S.1506 § 601(a)(2)'),
        ('Quarterly', 'Global budget payments to institutions', 'S.1506 § 611(a)'),
        ('≥1%', 'Of the budget for displaced workers, up to 5 years', 'S.1506 § 602'),
        ('3 years', 'Of historical volume used in budget negotiations', 'S.1506 § 611(b)(2)(A)'),
    ]),

    h2('s5h1', 'Improving Medicare Along the Way'),
    blk('s5p1', "Title X of S.1506 changes the existing Medicare program during the transition, before the new program starts. It adds out-of-pocket protection for fee-for-service beneficiaries (§ 1001), lowers the Part D out-of-pocket threshold (§ 1002), adds dental, vision and hearing coverage to Part B (§ 1003), eliminates the 24-month waiting period for people with disabilities (§ 1004), and guarantees issue of Medigap policies (§ 1005). It also adds the temporary buy-in (§ 1011) and the transition plan (§ 1012), and includes provisions to minimize disruptions to patient care (§ 1021)."),
    blk('s5p2', "These provisions matter for the political analysis in Track 5. They are discrete, near-term changes to an existing program, and several closely resemble standalone proposals. Sanders, speaking to Roll Call in November 2026, described the bill's first year as lowering the Medicare age to 55 and adding dental, hearing and vision care."),
    warning('s5w1', 'The transition is most of the bill\'s first years', "Between enactment and the start date, the bill operates mainly through Medicare: a buy-in, new Part B benefits, and a transition plan on the exchanges. Anyone assessing feasibility has to assess that transition, not just the end state."),

    h2('s6h1', 'Where the Bills Stand, and What They Leave Out'),
    blk('s6p1', "S.1506 was introduced by Sen. Sanders on April 29, 2025 and referred to the Senate Finance Committee. The official bill-status record, updated November 20, 2026, shows no further action and 19 cosponsors, all Democrats, 15 of them original; the most recent were Sen. Wyden in September 2026 and Sen. Duckworth on November 19, 2026. Vermont's Sen. Welch is a cosponsor. H.R.3069, introduced the same day by Rep. Jayapal, has 118 Democratic cosponsors, including Vermont's Rep. Balint, and has been referred to Energy and Commerce and six other committees."),
    blk('s6p2', "As Lesson 8 showed, neither bill contains a revenue title. Section 701 funds the trust fund from the existing appropriations for the programs it absorbs, plus the net revenue attributable to two sections that levy no tax. The financing question, which ended Vermont's plan, is left to future legislation. Lesson 11 looks at what CBO has said about the cost."),
    highlight('s6hl1', "S.1506: 19 Senate cosponsors, in the Finance Committee since April 29, 2025, no revenue title. H.R.3069: 118 House cosponsors."),

    takeaway('tw', [
        "S.1506 entitles every U.S. resident, enrolls people automatically, and guarantees free choice of any participating provider.",
        "Full benefits start on January 1 of the fourth calendar year after enactment, with children covered in year one and a buy-in at 55, 45 and 35; H.R.3069 takes two years.",
        "Benefits are broad, from hospital care to oral health and home-based long-term care, with no cost-sharing except an optional drug schedule.",
        "Institutions get quarterly global budgets negotiated from volume, Medicare cost reports, wages and capacity; clinicians are paid from a national fee schedule.",
        "Capital is funded separately and payments may not fund marketing or provider profit.",
        "The Secretary runs the program through regional offices built on CMS's, with at least 1% of the budget for displaced workers for up to five years.",
        "S.1506 has 19 Senate cosponsors and no action since referral; neither bill has a revenue title.",
    ]),
    quiz('qz', "Under S.1506, how are hospitals paid once the program is running?", [
        ("Fee-for-service at commercial rates negotiated hospital by hospital", False),
        ("A quarterly lump-sum global budget covering operating expenses, negotiated with a regional director, with capital funded separately", True),
        ("Capitation payments from private insurers that contract with HHS", False),
        ("A fixed percentage of each hospital's 2025 revenue, adjusted for inflation", False),
    ], "Section 611 pays institutional providers a quarterly lump sum that is payment in full for operating expenses, negotiated using factors such as historical volume, Medicare cost reports, wages and capacity. Section 615 funds capital separately and bars payments for profit or marketing; § 612's fee schedule applies to individual providers."),
    *sources(['s1506', 's1506status', 'hr3069', 'gmc14', 'rollcall'], {
        's1506': "§§ 101-105, 106, 201-206, 301, 303, 401, 403-404, 501, 601-602, 611-617, 701, 1001-1005, 1011-1012, 1021",
        's1506status': "referral to Finance, no further action, 19 cosponsors (15 original), most recent additions, Sen. Welch",
        'hr3069': "§ 106 two-year start; § 204 federal long-term care; § 611 including FQHCs; 118 cosponsors and committee referrals (bill status, Oct 23, 2026)",
        'gmc14': "pp. 7, 20: Green Mountain Care's 2014 benefits for comparison",
        'rollcall': "Sanders's description of the bill's first year",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'm4a-alternatives'
L10_TITLE = 'The Alternatives: Medicare for America and Medicare at 50'
L10 = [
    blk('intro1', "Medicare for All is not the only universal-coverage bill in the 119th Congress, and not the only proposal to expand Medicare. Two alternatives arrived in the autumn of 2026: Rep. Rosa DeLauro's Medicare for America Act of 2026 (H.R.10924), introduced October 29, and Sen. Tammy Baldwin's Medicare at 50 Act, introduced November 10."),
    blk('intro2', "This lesson describes each one, compares how they answer the questions Vermont could not, and explains why they fare differently under the five-pillar test. The comparison is not a ranking. It shows that the design choices, especially on employer coverage and financing, decide which gates a reform must pass."),

    h2('s1h1', 'Medicare for America: The Design'),
    blk('s1p1', "H.R.10924 establishes a national health insurance program covering all U.S. residents, with hospital services, prescription drugs, dental services and home- and community-based long-term care, to be fully implemented in 2028. During 2028 and 2029 a transitional public health option is offered on the individual market through the exchanges. Members of Congress and their staff are enrolled from plan year 2028."),
    blk('s1p2', "The program sits alongside private coverage. Private insurers may not sell coverage duplicating the program's benefits, but the bill carves out two exceptions: Medicare Advantage for America plans offered under Part C, and qualified employer-based coverage. Premiums are set by rating area and capped so that no household pays more than 8 percent of adjusted gross income, with zero premiums below 200 percent of the federal poverty level. The Secretary must review twice a year whether the program's payment rates are creating barriers to care, and may raise them."),
    callout('s1c1', "Medicare for America is universal without being single payer: everyone is covered, but employer plans and private Medicare Advantage for America plans continue, and enrollees pay income-capped premiums."),

    h2('s2h1', 'Medicare for America: Employers and Taxes'),
    blk('s2p1', "Employer rules are where the bill differs most from S.1506. A large employer, one with at least 100 employees or payroll above $2 million, must either offer each full-time employee a qualifying employer-sponsored plan or contribute 8 percent of its annual payroll to the Medicare Trust Fund. Employees may opt out of their employer's plan to enroll in Medicare for America, with the employer still contributing. From plan year 2031, a process lets large employers enroll their employees in the program. Small employers either provide coverage or enroll their staff."),
    blk('s2p2', "The bill also names its revenue. Title II includes a surtax, changes to the basis of inherited property, a Medicare payroll tax, changes to the net investment income tax, the end of the deduction for health savings account contributions, higher excise taxes on tobacco and alcohol, a tax on sugared drinks, and repeal of the excise tax on high-cost employer coverage. It also sunsets Public Laws 115-97 and 119-21; the CRS summary notes that the first of these had repealed the penalty for not maintaining coverage. During 2028 to 2033, the federal government pays the difference between Medicare for America rates and Medicaid and CHIP rates."),
    blk('s2p3', "Title III creates a prescription drug and medical device review board that sets a formula for identifying an \"excessive price\" and enforces a prohibition on charging one, and places a moratorium on direct-to-consumer drug advertising."),
    stat_grid('s2sg1', [
        ('8%', 'Cap on premiums, as share of income', 'H.R.10924 § 104'),
        ('8%', 'Payroll contribution for large employers that do not offer a plan', 'H.R.10924'),
        ('2028', 'Full implementation', 'H.R.10924, CRS summary'),
        ('2028-2033', 'Federal payment of the gap between program and Medicaid/CHIP rates', 'H.R.10924'),
    ]),
    example('s2ex1', 'Two payroll levies a decade apart', "Vermont's 2014 Green Mountain Care design required an 11.5% payroll tax on all Vermont employers on their qualifying Vermont payroll, \"no exceptions and no transitions\", alongside an income-based premium of up to 9.5%.\nMedicare for America asks a large employer that does not offer a qualifying plan to contribute 8% of annual payroll, and caps household premiums at 8% of income. The two are not directly comparable, because the federal bill also has other taxes and keeps employer plans, but both show how central a payroll levy is to financing universal coverage."),

    h2('s3h1', 'Medicare at 50: A Buy-In'),
    blk('s3p1', "On November 10, 2026, in what her office called her first bill after the midterm election, Sen. Baldwin introduced the Medicare at 50 Act with nine Democratic cosponsors: Senators Blumenthal, Merkley, Van Hollen, Reed, Duckworth, Kim, Booker, Markey and Gillibrand. The bill lowers the age at which people can buy into Medicare to 50, giving people aged 50 to 64 the same benefits and protections as Medicare Parts A, B and D, with the option of a Medicare Advantage plan, and the same premium tax credits and cost-sharing help they would get through the ACA marketplace."),
    blk('s3p2', "The release grounds the bill in costs: it says marketplace premiums for people aged 50 to 64 doubled in 2026 and enrollment in that age group fell by 6 percent. The bill does not change coverage for anyone else, does not touch employer plans, and does not restructure provider payment. Its bill number had not yet been published when this course was written."),
    warning('s3w1', 'Source note', "The Medicare at 50 Act's text was not available when this lesson was written. Its description here comes from Sen. Baldwin's November 10, 2026 release as republished by Urban Milwaukee. Check the bill text once it is published."),

    h2('s4h1', 'Where the Debate Stands'),
    blk('s4p1', "All three proposals are now part of the same conversation. Roll Call reported on November 18, 2026 that Sanders would make Medicare for All a priority as expected chair of the Senate HELP committee, and that Baldwin's plan had been offered the week before as \"an alternative Medicare expansion plan\". Asked how far Democrats want to lower the Medicare eligibility age, House Minority Leader Hakeem Jeffries, nominated to be speaker, said: \"that's all part of an ongoing conversation.\""),
    blk('s4p2', "Yahoo News's account of the final midterm results lists expanding Medicare, by lowering the eligibility age and adding vision, hearing and dental coverage, among priorities under discussion, alongside reinstating the ACA subsidies that expired and reversing recent Medicaid cuts. Lowering the eligibility age appears, in different forms, in S.1506's buy-in, in Medicare at 50, and in Sanders's own description of his bill's first year."),
    quote('s4q1', "\"That's all part of an ongoing conversation.\" (House Minority Leader Hakeem Jeffries, asked how far to lower the Medicare eligibility age; Roll Call, November 18, 2026)"),

    h2('s5h1', 'The Alternatives Through the Five Pillars'),
    blk('s5p1', "The five-pillar test treats these proposals very differently, because they ask different things of each pillar. Medicare at 50 needs Policy authority for one age group and money for subsidies, and it runs through Medicare's existing technology, payment rules and administration. Few gates stand between enactment and operation."),
    blk('s5p2', "Medicare for America needs more: a new national program, rules for employers, a drug-pricing board and a large tax package. But by keeping employer plans it does not have to bar them, as S.1506 does, and by naming its revenue it addresses the gate that stopped Vermont. Medicare for All needs the most authority of all three, removes the most walls, and leaves the financing gate open."),
    blk('s5p3', "Analysis: none of this makes one proposal right. It makes them different sequencing problems. A buy-in can be built on the current system. A universal program has to build or replace it, and the more it replaces, the more gates it must pass and the more its financing law matters."),
    table('s5t1', 'What each proposal asks of the pillars', [
        {'Proposal': 'Medicare at 50', 'Policy': 'Authority for ages 50-64', 'Economics': 'Subsidies; Medicare rates unchanged', 'Employer plans': 'Unchanged'},
        {'Proposal': 'Medicare for America', 'Policy': 'New national program, employer rules, drug board', 'Economics': 'Named taxes; Medicaid rate gap paid 2028-33', 'Employer plans': 'Kept, or 8% payroll contribution'},
        {'Proposal': 'Medicare for All', 'Policy': 'Universal entitlement, ERISA amended, Medicare/Medicaid merged', 'Economics': 'Global budgets and fee schedule; no revenue title', 'Employer plans': 'Duplicative plans unlawful'},
    ]),

    h2('s6h1', 'What Vermont\'s Experience Suggests'),
    blk('s6p1', "Vermont faced the same choices in miniature. Its 2014 design kept ERISA plans because it had to, and named its revenue because Act 48 required a financing law. It then found the revenue too large to ask for. Medicare for America keeps employer plans by choice and names its revenue up front; Medicare for All removes employer plans and defers revenue; Medicare at 50 sidesteps both questions by staying small."),
    blk('s6p2', "Analysis: Vermont's record suggests the financing question is not one to leave for later. When Act 48 deferred it, the design advanced for three years and then stopped at the last gate. A federal proposal that names its revenue faces a harder first vote and an easier last one."),
    callout('s6c1', "Every universal design has to answer two questions Vermont faced: what happens to employer coverage, and where the money comes from. The alternatives answer them differently, and the answers determine which gates they must pass."),

    takeaway('tw', [
        "Medicare for America (H.R.10924, Oct 29, 2026) covers all residents from 2028 but keeps qualified employer plans and Medicare Advantage for America plans.",
        "Its premiums are capped at 8% of income, zero below 200% of poverty, and large employers either offer a qualifying plan or contribute 8% of payroll.",
        "It names its revenue, including a surtax, a Medicare payroll tax and excise taxes, and creates a drug and device review board.",
        "The Medicare at 50 Act (Baldwin and nine colleagues, Nov 10, 2026) lets people aged 50-64 buy into Medicare with ACA-level subsidies.",
        "Roll Call reports Sanders prioritizing Medicare for All while Jeffries calls the eligibility age an ongoing conversation.",
        "Under the five-pillar test, a buy-in faces few gates, Medicare for America more, and Medicare for All the most, while leaving financing open.",
        "Vermont's experience suggests deferring the financing question moves a design forward and then stops it at the last gate.",
    ]),
    quiz('qz', "How does Medicare for America (H.R.10924) treat a large employer that does not offer its full-time employees a qualifying plan?", [
        ("It must pay an 11.5% payroll tax to the state", False),
        ("It must contribute 8% of its annual payroll to the Medicare Trust Fund", True),
        ("It is barred from operating in states with a public option", False),
        ("Its employees lose eligibility for the national program", False),
    ], "H.R.10924 requires a large employer to either offer a qualifying employer-sponsored plan or contribute 8% of annual payroll to the Medicare Trust Fund, and lets employees opt out of an employer plan to enroll in Medicare for America. The 11.5% figure is Vermont's 2014 payroll tax design."),
    *sources(['hr10924', 'baldwin', 'rollcall', 'yahoo', 'gmc14', 'lunge15', 's1506'], {
        'hr10924': "program design, 2028 implementation, transitional option, premiums (§ 104), employer rules, Title II taxes, Title III drug board, Medicaid/CHIP rate gap 2028-2033; CRS summary",
        'baldwin': "Medicare at 50 Act: cosponsors, ages 50-64, benefits, subsidies, 2026 premium and enrollment figures",
        'rollcall': "Sanders's HELP priority, Baldwin's alternative, Jeffries's comment",
        'yahoo': "priorities under discussion after the 2026 midterms",
        'gmc14': "11.5% payroll tax and public premium in the 2014 design",
        'lunge15': "\"no exceptions and no transitions\"",
        's1506': "comparison points: duplicate coverage, ERISA amendment, no revenue title",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L11_SLUG = 'm4a-cbo-evidence'
L11_TITLE = 'What CBO Has Estimated, and What It Has Not'
L11 = [
    blk('intro1', "The Congressional Budget Office is the nonpartisan body that estimates the cost of legislation for Congress. On single payer, it has done careful work, but not the work most people assume. It has never scored a Sanders Medicare for All bill. What it has done is analyze five illustrative single-payer designs based on Medicare's fee-for-service program."),
    blk('intro2', "This lesson reports what CBO found, using the summary its Director, Phillip Swagel, gave the Senate Budget Committee on May 12, 2022. It covers the effects on federal spending and national health spending, the role of payment rates, the effects on access and on the wider economy, and what CBO's work cannot tell us about S.1506."),

    h2('s1h1', 'What CBO Analyzed, and What It Did Not'),
    blk('s1p1', "CBO's Director told the committee that the agency had \"analyzed five options in detail among many possibilities\", designed to illustrate the effects of differences in providers' payment rates, patients' cost sharing and the system's coverage of long-term services and supports. The work appeared in a December 2020 working paper on costs and a February 2022 working paper on economic effects, building on a 2019 report on key design choices."),
    blk('s1p2', "He was explicit about the limit: the Medicare for All Act of 2019, S.1129, \"is like the options in some ways and different in others; CBO has not analyzed S. 1129.\" No CBO score of the current bills, S.1506 and H.R.3069, appears in the sources this course relies on. And CBO's own position is neutral: \"neither the working papers nor this testimony makes any recommendations.\""),
    blk('s1p3', "The three publications behind the testimony are worth knowing by name, because later debate often cites them loosely. The first is Key Design Components and Considerations for Establishing a Single-Payer Health Care System (May 2019), which sets out the choices any single payer must make. The second is How CBO Analyzes the Costs of Proposals for Single-Payer Health Care Systems That Are Based on Medicare's Fee-for-Service Program, Working Paper 2020-08 (December 2020). The third is Economic Effects of Five Illustrative Single-Payer Health Care Systems, Working Paper 2022-02 (February 2022). CBO also published Policies to Achieve Near-Universal Health Insurance Coverage in October 2020, which treats single payer as one route among several."),
    warning('s1w1', 'Not a score of S.1506', "CBO's estimates describe illustrative designs, not the bill in Congress. Use them as ranges for the kinds of effects a single payer would have, not as the cost of S.1506. This course has not read the working papers' option-by-option tables and does not quote them."),

    h2('s2h1', 'The Headline Numbers'),
    blk('s2p1', "For the options analyzed, compared with what would happen under current law in 2030, CBO found that federal subsidies for health care would be significantly larger, increasing by $1.5 trillion to $3.0 trillion in that year. National health expenditures, all health spending in the country, public and private, would change by amounts ranging from a decrease of $0.7 trillion to an increase of $0.3 trillion, depending on the design."),
    blk('s2p2', "The difference between those two numbers is the heart of the debate. A single payer moves spending from private payers, employers and households, to the federal government. Whether total spending rises or falls depends on design. CBO named the main forces: lower payment rates for providers and lower administrative spending push national spending down; more use of care, \"especially if long-term services and supports are a covered benefit\", pushes it up."),
    stat_grid('s2sg1', [
        ('+$1.5T to +$3.0T', 'Federal health subsidies in 2030', 'CBO, May 12, 2022, five illustrative designs'),
        ('−$0.7T to +$0.3T', 'National health expenditures in 2030', 'CBO, same testimony'),
        ('0', 'CBO scores of S.1129 (2019) or the current bills cited', 'CBO: "has not analyzed S. 1129"'),
        ('5', 'Illustrative designs analyzed in detail', 'CBO working papers 2020-08 and 2022-02'),
    ]),

    h2('s3h1', 'Payment Rates Decide a Great Deal'),
    blk('s3p1', "To show how much payment rates matter, CBO compared two scenarios that differed only in rates. In the higher-rate scenario, average payment rates were \"close to the average of the rates that the agency projects for all payers in 2030 under current law.\" In the lower-rate scenario, rates were 13 percent lower for hospitals and 7 percent lower for physicians, on average, and drug prices were 23 percent lower."),
    blk('s3p2', "Relative to the higher-rate scenario, the lower-rate scenario cut federal subsidies by 12 percent and national health expenditures by 9 percent. But it also reduced the supply of care by 2 percent, with demand roughly unchanged, so unmet demand rose by 2 percentage points. In the long term, CBO warned, payments lower than projected \"might cause fewer people to enter health care professions and fewer new drugs to be developed\", and providers unable to adjust \"could cease to operate\"."),
    compare('s3cmp1', 'CBO\'s two rate scenarios',
        'Higher-rate scenario', ['Rates near the 2030 all-payer average', 'Higher federal subsidies', 'More supply of care', 'Less unmet demand'],
        'Lower-rate scenario', ['Hospitals −13%, physicians −7%, drugs −23%', 'Federal subsidies −12%, national spending −9%', 'Supply of care −2%', 'Unmet demand +2 percentage points']),

    h2('s4h1', 'Access: More Care, and More Waiting'),
    blk('s4p1', "CBO found that health insurance coverage would increase, \"as virtually all U.S. residents would be enrolled in the system\", and that total out-of-pocket costs would fall. The supply of care would rise, because of fewer restrictions on use, less time and money spent on administration, and providers responding to more demand. People would use more care, so in that sense access would be greater."),
    blk('s4p2', "But demand would rise faster than supply. CBO projected greater unmet demand than under current law, which would \"correspond to increased congestion in the health care system, including delays and forgone care.\" It stressed that both effects would happen at once: people would use more care, and would have used even more if it had been available."),
    callout('s4c1', "CBO expects a single payer to increase both the care people get and the care they wait for. Coverage becomes nearly universal; capacity becomes the constraint."),

    h2('s5h1', 'Effects on the Economy'),
    blk('s5p1', "CBO's economic analysis assumed the system was financed by either a payroll tax or an income tax. On that basis it projected gross domestic product about 1 percent to 10 percent lower by 2030 than under current law, and aggregate non-health consumption per person changing by anywhere from a 3 percent increase to a 7 percent decline. Lifetime non-health consumption would rise for lower-income households and fall for higher-income households, and most households would choose to work fewer hours over their lifetimes."),
    blk('s5p2', "The main cause of lower GDP is the taxes, not the health system. Higher taxes on labor reduce hours worked; higher taxes on capital reduce saving and investment. Other financing would produce different results, and CBO added that perpetually financing any of these systems through borrowing, without new revenue or spending cuts at some point, \"would be unsustainable.\" Against those costs, CBO listed gains: employers passing benefit savings into taxable wages, the end of household premiums, lower administrative costs freeing resources for other sectors, and longer lives and higher productivity as health improves."),
    table('s5t1', 'CBO on the economy (2030, vs current law)', [
        {'Measure': 'GDP', 'Effect': 'About 1% to 10% lower, if financed by payroll or income tax'},
        {'Measure': 'Non-health consumption per person', 'Effect': '+3% to −7%'},
        {'Measure': 'Lifetime consumption', 'Effect': 'Up for lower-income households, down for higher-income'},
        {'Measure': 'Borrowing as permanent financing', 'Effect': '"Would be unsustainable"'},
    ]),

    h2('s6h1', 'Reading CBO Alongside Vermont'),
    blk('s6p1', "Vermont's numbers and CBO's point in the same direction. In Vermont's 2013 plan, payments by individuals and employers fell from $2,228 million to $332 million in 2017, replaced by public financing that the 2014 design raised through an 11.5% payroll tax and an income-based premium. Nationally, CBO finds federal subsidies rising by trillions of dollars even where total spending falls. In both, financing is the decisive question, and the choice of tax shapes the economic effects."),
    blk('s6p2', "Vermont also illustrates CBO's payment-rate point. A single payer paying Medicare-level rates would sharply cut the revenue of hospitals now paid much more by commercial insurers; Track 6 uses the platform's Single-Payer Modeler to show what that would mean for each of Vermont's fourteen hospitals, and why a revenue-neutral rate sits well above Medicare's."),
    highlight('s6hl1', "CBO's central lesson for this course: a single payer shifts spending to the federal government in every design it analyzed, and payment rates largely decide whether national spending rises or falls."),

    takeaway('tw', [
        "CBO analyzed five illustrative single-payer designs based on Medicare fee-for-service; it has not analyzed S.1129, and no score of S.1506 is cited here.",
        "Across those designs, federal health subsidies rise by $1.5 to $3.0 trillion in 2030 while national spending changes by −$0.7 to +$0.3 trillion.",
        "Lower provider payment and administrative savings reduce national spending; more use of care, especially long-term care, increases it.",
        "CBO's lower-rate scenario (hospitals −13%, physicians −7%, drugs −23%) cut national spending 9% but reduced the supply of care 2%.",
        "Coverage becomes nearly universal and out-of-pocket costs fall, but demand outpaces supply, bringing delays and forgone care.",
        "Financed by payroll or income taxes, GDP would be about 1% to 10% lower by 2030, and permanent borrowing would be unsustainable.",
        "CBO makes no recommendation; its work frames the ranges, not the answer for any particular bill.",
    ]),
    quiz('qz', "Which statement about CBO's single-payer work is accurate?", [
        ("CBO scored S.1506 and found it would cut federal spending", False),
        ("CBO analyzed five illustrative designs and found federal subsidies rising by $1.5-3.0 trillion in 2030, while national spending could fall or rise depending on design", True),
        ("CBO found national health spending would rise by $3 trillion under every design", False),
        ("CBO recommended a payroll tax as the best way to finance single payer", False),
    ], "CBO analyzed illustrative designs, not S.1506, and did not analyze S.1129. It found federal subsidies rising by $1.5-3.0 trillion in 2030 and national health expenditures changing by −$0.7 to +$0.3 trillion depending on payment rates, cost sharing and long-term care. Its testimony makes no recommendations."),
    *sources(['cbo', 'gmc14', 'modeler', 'hub'], {
        'cbo': "five options; S.1129 not analyzed; 2030 ranges; rate scenarios; access, supply and unmet demand; economic effects; no recommendations",
        'gmc14': "Vermont's financing requirement, for comparison",
        'modeler': "Vermont hospital effects of a single rate, and the revenue-neutral rate",
        'hub': "how the platform uses CBO's ranges in the five-pillar assessment",
    }),
]

run([(L9_SLUG, L9_TITLE, L9, 9), (L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11)])
