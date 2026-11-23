exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_hea_common.py').read())

# Track 2 — Vermont's Equity Landscape. Book Ch10 §10.1-10.4. Verified 2026-11-23 (search): Health Equity Advisory Commission created by Act 33 of 2021 (18 V.S.A. s.252), 30 members, annual report
# by Jan 15, data disaggregation duty (search of statute); VDH BRFSS 2022-23: 90% of adults have a personal provider, Hispanic 82% (PDF extraction; flagged), BRFSS 2024 summary: BIPOC adults less
# likely to have a personal provider; Rural Emergency Hospital rules (CMS: former CAH or rural <=50 beds as of Dec 27 2020; 24-hour emergency; no inpatient; monthly facility payment; 105% OPPS).
# Book-only (NOT verified): 78% Hispanic / 91% statewide (BRFSS 2023-24, published Mar 2026), 82% Black coverage, 94% white population, 4.5% foreign-born, SDOH table, NEK hospital tiers.

L7_SLUG = 'hea-vermont-equity-landscape'
L7_TITLE = "Reading Vermont's Equity Data: Geography First, Then Race and Income"
L7 = [
    blk('intro1', "Chapter 10 begins by correcting a common assumption. National equity debates are often framed around racial gaps in large, diverse cities, and Vermont, which the chapter describes as roughly 94 percent white, does not fit that picture. The chapter argues that Vermont's dominant equity challenge is geographic: the gap between Chittenden County, with the state's economic and medical center, and the rural counties, especially the Northeast Kingdom. It does not say racial equity is unimportant. It says the state must work on both dimensions at once, and use the same method for each: identify the disparity, trace it to a cause and design an intervention that addresses the cause."),
    blk('intro2', "This lesson is about reading the data that supports that argument. It sets out what the chapter reports, what a reader can and cannot verify, and how to handle numbers that come from surveys of small groups. The state's survey figures can be checked against public Department of Health documents, and the lesson did so where it could. Several figures in the chapter could not be confirmed, and the lesson says which."),
    blk('intro3', "Careful reading of equity data is itself an equity skill, since the groups with the smallest samples are the ones whose numbers are least stable."),

    h2('s1h1', 'Why Averages Mislead'),
    blk('s1p1', "The chapter's opening principle is that the most common failure in quality measurement is optimizing for the average. A system can improve its average readmission rate, its average primary care access or its average chronic disease control while the gap between its best-served and worst-served populations stays the same or grows. In that case the system has achieved statistical improvement without quality improvement in the sense that matters. The chapter's target is different: every population segment should have access to the conditions that support health, and disparities attributable to race, income, geography, disability, language, sexual orientation or gender identity should be eliminated and not averaged away."),
    blk('s1p2', "Averages can mislead in two ways. They can hide a group whose results are far below the mean, when that group is a small share of the total. And they can show improvement when the improvement is concentrated among people who were already doing well. A rate that rises from 88 to 90 percent in a population where one group stays at 78 percent has improved on average and left the gap untouched. Whenever a report gives only an average, the first question should be who is below it, and by how much."),
    callout('s1c1', "An equity question always has two numbers: how the group is doing, and how it compares with a reference group."),

    h2('s2h1', 'The Geographic Picture'),
    blk('s2p1', "The chapter describes the Northeast Kingdom, made up of Caledonia, Essex and Orleans counties, as concentrating the state's most severe coverage and poverty disparities. It reports that Essex County had the highest uninsured rate in the last county-level household survey, a figure the chapter dates to 2014, and that the same counties have limited broadband, unreliable transportation and scarce providers. It sets this against Burlington, where a low-income resident faces affordability barriers but can reach a large academic medical center, a network of community health centers and public transportation."),
    blk('s2p2', "The chapter's most useful analytical point is that these barriers compound. A resident of a remote county faces the same cost barriers as a resident of Burlington, plus long drives, weak broadband that limits telehealth and a thin rental market. Oliver Wyman's community engagement, as described in the chapter, found a pattern of care avoidance tied to cost, long ambulance waits, difficult travel and long emergency department waits. Because the chapter relies on a 2014 survey figure for the uninsured rate in Essex County, a reader should treat that number as dated and look for more recent county estimates before using it in a current analysis."),
    blk('s2p3', "The chapter also notes that behavioral health crisis burdens do not map onto the same counties. According to the chapter's figure, suicide and self-harm emergency visits are above the state rate in Rutland and Windham counties, and opioid overdose visits are concentrated in Chittenden, Bennington and Windham. That is an important caution. Geography is the dominant theme, but it is not one map. Different problems concentrate in different places, so an equity analysis needs one map per problem."),

    h2('s3h1', 'Race, Ethnicity and Small Samples'),
    blk('s3p1', "The chapter reports that, among Vermont adults, 94 percent have health insurance but only 82 percent of Black adults do, according to the Department of Health's January 2025 equity report. It also reports newer survey figures, published in March 2026 and covering 2023 and 2024: 91 percent of Vermont adults have a personal health care provider, compared with 78 percent of Hispanic adults, the only group the chapter describes as statistically below the state, with lower rates for Black and American Indian or Alaska Native adults as well. The chapter uses the gap between 78 and 91 percent as its signature example."),
    blk('s3p2', "This lesson could not confirm those specific figures. A search of public Department of Health documents found a 2022 and 2023 statewide survey summary in which, as read from a document extraction that should be checked against the original, about 90 percent of adults had a personal provider and the Hispanic figure was 82 percent. The state's 2024 summary says that men, younger adults, people with less education or lower income and BIPOC adults are less likely to have a personal provider. These sources point in the same direction as the chapter, with Hispanic adults below the state average, while the size of the gap differs by period. That difference is itself instructive: survey estimates for small groups move from year to year, partly from sampling error, and a single published gap should be quoted with its source and period."),
    blk('s3p3', "The chapter also acknowledges measurement limits. Vermont's Indigenous population, mostly Abenaki, is small and dispersed, and the chapter says state data systems are not yet equipped to measure its health status well. A state report based on 2021 and 2022 survey data documented disparities for American Indian and Alaska Native people, but small numbers make estimates unstable, and the chapter reports that some Indigenous organizations had not been in contact with the Health Department. Invisible does not mean fine. The groups least visible in the data are often those with the greatest unmet need, which is why the next tracks give extra attention to small numbers and to data quality."),
    table('s3t1', 'Reading a survey-based equity figure', [
        {'Check': 'Source and period', 'Why_it_matters': 'Estimates for small groups change from year to year'},
        {'Check': 'Reference group', 'Why_it_matters': 'Gap against the state average differs from gap against another group'},
        {'Check': 'Sample size and interval', 'Why_it_matters': 'A wide interval means the gap may be larger or smaller than reported'},
        {'Check': 'Measure definition', 'Why_it_matters': 'Having a provider is not the same as receiving care'},
        {'Check': 'Self-report', 'Why_it_matters': 'Surveys capture what people say, which can differ from records'},
    ]),

    h2('s4h1', 'Social Conditions and the Equity Burden'),
    blk('s4p1', "The chapter pairs the health data with a set of social indicators drawn from the state's Rural Health Transformation application and the Act 167 consultant report: a rental vacancy rate of about 3 percent against about 5 percent in a healthy market, about half of renters cost-burdened, a per capita homelessness rate among the highest in the country, broadband access of about 80 percent outside Chittenden County against 85 percent inside it, 9 percent of residents food insecure and unreliable public transportation in most rural counties. It argues that these conditions are both risk factors for illness and barriers to getting care, since an unhoused person cannot reliably attend scheduled appointments and a family without transportation cannot use a nearby clinic."),
    blk('s4p2', "None of these indicators was verified for this lesson, and some are subject to revision, so a reader building an analysis should go to the underlying sources, which the chapter names, such as housing data from the federal housing department and the state broadband office. What the table does well is show a method. For each social condition, it states the statistic, the mechanism by which it affects health and the equity implication. An analyst can reuse that three-part structure for any indicator: what is the number, how does it reach health and who is affected most."),
    blk('s4p3', "The Health Equity Advisory Commission is the standing body on these questions. A search of the statute found that it was created by Act 33 of 2021, codified at title 18, section 252 of the Vermont statutes, that it has thirty members drawn from state staff, advocacy organizations and community members and that it must submit an annual written report by January 15 to the relevant legislative committees. The same act requires state entities that collect health-related individual data to disaggregate it by race, ethnicity, gender identity, age and other factors. The disaggregation duty is the legal foundation for the analytics this course teaches."),

    h2('s5h1', 'A Method for Equity Landscape Analysis'),
    steps('s5st1', 'Building an equity landscape in five steps', [
        ('Choose the outcome', 'Pick one measure that matters, such as having a personal provider or a controlled blood pressure.'),
        ('Stratify', 'Break it down by geography first, then income, race and ethnicity, disability and language.'),
        ('Check the numbers', 'Record source, period, sample size and interval for every group.'),
        ('Add the context', 'Place each gap beside the social conditions that plausibly explain it.'),
        ('State what is unknown', 'List groups too small or invisible in the data, and plan how to see them.'),
    ]),
    blk('s5p1', "The method is deliberately modest. It does not claim to explain the gaps, and it keeps the reader honest about how firm each number is. Explanation comes later, in the root cause work of the next lesson. A common error is to jump straight to interventions from a single survey figure. The better sequence is to stratify, check, contextualize and only then hypothesize about causes."),
    blk('s5p2', "The chapter's final framing for the section is that Vermont's equity agenda must address the geographic and the demographic dimensions together. An analyst should resist two temptations: to treat the rural story as a substitute for racial equity analysis because the state is small and mostly white, or to import an urban racial equity template without checking whether it fits. The honest path is to measure both, say how firm each measurement is and design for each where the evidence supports it."),

    takeaway('tw', [
        "Chapter 10 says Vermont's dominant equity challenge is geographic, the gap between Chittenden County and the rural counties, especially the Northeast Kingdom, while racial and other gaps remain real.",
        "Averages can hide small groups and can show improvement when gains accrue to people already doing well; always ask who is below the average.",
        "Barriers compound in remote areas: cost, distance, broadband, transportation and housing together.",
        "Different problems concentrate in different counties; behavioral health crisis burdens in the chapter map differently from uninsurance.",
        "The chapter's 78 percent versus 91 percent figure for Hispanic adults was not verified; an earlier survey summary showed 82 percent for Hispanic adults, in the same direction.",
        "Small-group survey estimates are unstable; cite source, period, sample size and interval, and note groups too small to measure.",
        "The Health Equity Advisory Commission, created by Act 33 of 2021, advises on equity, and the act requires data to be disaggregated by race, ethnicity and other factors.",
    ]),
    quiz('qz',
        "Why does Chapter 10 say optimizing for the average is the most common failure in quality measurement?",
        [
            ("Because averages are always calculated incorrectly", False),
            ("Because a system can improve its average while the gap between best-served and worst-served groups stays the same or widens", True),
            ("Because averages cannot be computed for small states", False),
            ("Because equity is unrelated to quality", False),
        ],
        "The chapter says improving the average while allowing or widening the gap between best-served and worst-served populations achieves statistical improvement while perpetuating the inequity that produces the worst outcomes."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.1 The Equity Imperative; §10.2 Vermont's Equity Landscape"),
    blk('src2', "[2] Vermont Department of Health, BRFSS data summaries and populations in focus — https://www.healthvermont.gov/sites/default/files/document/hsi-brfss-2024-datasummary.pdf ; https://healthvermont.gov/sites/default/files/document/hsi-brfss-2023-datasummary.pdf — as surfaced by search; figures to be checked against originals"),
    blk('src3', "[3] Vermont Statutes, 18 V.S.A. section 252 (Health Equity Advisory Commission; Act 33 of 2021) — https://legislature.vermont.gov/statutes/section/18/006*/00252"),
    blk('src4', "[4] Vermont Department of Health, Health Equity Data, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Human%20Services/Reports%20and%20Resources/W~Vermont%20Department%20of%20Health~Health%20Equity%20Data,%202025%20Annual%20Report~1-17-2025.pdf — listed by search; not read in full"),
]

L8_SLUG = 'hea-root-cause-taxonomy'
L8_TITLE = 'From Gap to Cause: The Five-Category Root Cause Taxonomy'
L8 = [
    blk('intro1', "Finding a disparity is the beginning of equity work and not the end. Chapter 10 makes the point sharply: the same gap in access or outcome can arise from entirely different causes, and an intervention aimed at the wrong cause will not close it. Its remedy is a taxonomy of five root cause categories, geographic access barriers, social needs barriers, clinical practice variation, insurance and coverage barriers, and trust and engagement barriers, with Vermont mechanisms and interventions listed for each."),
    blk('intro2', "This lesson teaches the taxonomy as a working tool. It explains each category with its mechanism, shows how one gap can have several causes at once, gives a method for assigning probable causes with evidence, and offers a check on the chapter's own claims. The taxonomy is the book's framework, adapted from a general health equity framework, and the Vermont programs it lists are the book's descriptions, which this lesson did not independently verify."),
    blk('intro3', "The practical aim is to avoid the most common failure in equity programs: spending money on the wrong cause."),

    h2('s1h1', 'The Five Categories'),
    blk('s1p1', "Geographic access barriers are the physical and structural distance between a person and care: miles to a provider, inadequate transportation, shortages of clinicians in rural areas, broadband gaps that limit telehealth and limited hours at the facilities that exist. Social needs barriers are the conditions of daily life that interfere with care: unstable housing, food insecurity, transportation, economic stress that forces people to delay care and lack of internet. Clinical practice variation is differential treatment quality by race, ethnicity, disability or body weight, including differences in pain management, referrals and communication, which the chapter says community meetings documented in Vermont as weight bias and which national research documents for race."),
    blk('s1p2', "Insurance and coverage barriers are the gaps that remain even in a state with high coverage. The chapter cites a coverage rate of 97 percent for all ages and notes that uninsurance concentrates in particular counties and among adults with incomes just above Medicaid eligibility, and that high deductibles cause care avoidance even among the insured. Trust and engagement barriers come from historical and ongoing experiences of discrimination in health care settings, documented, the chapter says, for LGBTQ+ Vermonters, BIPOC Vermonters and Vermonters with disabilities, and from a lack of culturally competent care and stigma."),
    callout('s1c1', "The same gap in diabetes control could come from distance, from cost, from unequal treatment or from distrust. The cure differs for each."),

    h2('s2h1', 'Compound Causes'),
    blk('s2p1', "The chapter notes that categories overlap. A Black rural resident of a southern county might face geographic barriers, social needs barriers and trust barriers simultaneously. Interventions are most effective, it says, when designed to address more than one cause for people with compound burdens, and less effective when each category is addressed separately. That claim is plausible and consistent with the broader literature on social needs and care access, though the chapter does not give a measured effect in this section."),
    blk('s2p2', "Compounding matters for analysis. If three causes each account for a share of a gap, closing one will reduce the gap by only that share. A program that sets out to close a gap through transportation alone, when transportation explains a third of it, will achieve at most a third of the aim even if it works perfectly. Setting expectations by the share of the gap each cause explains protects programs from being judged failures when they were never designed to close the whole gap."),
    table('s2t1', 'Five root cause categories and the evidence that points to each (illustrative signals)', [
        {'Category': 'Geographic access', 'Signals': 'Gap follows distance or county; telehealth use low where broadband is weak', 'Typical_response': 'Closer sites, transport, broadband, telehealth with devices'},
        {'Category': 'Social needs', 'Signals': 'Missed appointments cluster among unstably housed or food insecure patients', 'Typical_response': 'Screening with warm handoffs, community health workers, housing and food partnerships'},
        {'Category': 'Clinical practice variation', 'Signals': 'Gap persists within the same clinic after adjusting for clinical factors', 'Typical_response': 'Standard protocols, bias training, workforce diversity, audit and feedback'},
        {'Category': 'Coverage', 'Signals': 'Gap concentrates among uninsured or underinsured patients', 'Typical_response': 'Enrollment outreach, eligibility screening, cost-sharing review'},
        {'Category': 'Trust and engagement', 'Signals': 'Low use of preventive care despite access; poor experience scores in specific groups', 'Typical_response': 'Community-rooted staff, partnerships, language access, patient councils'},
    ]),

    h2('s3h1', 'Assigning Probable Causes With Evidence'),
    blk('s3p1', "A taxonomy is only useful if it is applied to evidence. For a given disparity, the analyst can look for signals that point to each category. If the gap follows distance and disappears among people living near the clinic, geography is a likely cause. If the gap persists within a single clinic after adjusting for illness severity and insurance, practice variation or trust deserves attention. If patients in the disadvantaged group report cost-related delays at high rates, coverage and affordability are involved. If missed visits cluster among patients with unstable housing, social needs are involved."),
    blk('s3p2', "The decomposition methods taught in the first track estimate how much of a gap is explained by measured differences, such as coverage, access and clinical quality. Those methods are useful but depend on having the right data, and some causes, especially trust and practice variation, are difficult to measure from claims. The chapter's own process therefore combines statistical analysis with direct listening: surveys of the affected group and focus groups with the staff who see the barriers in practice. The qualitative evidence is not a lesser substitute. It often identifies a cause that the data cannot show."),
    blk('s3p3', "A discipline worth adopting is to write each causal hypothesis as a claim that could be wrong, with the evidence that supports it, the evidence against it and what would change the conclusion. The chapter's example is a disparity in diabetes control: causes might be medication adherence, a gap in care management, social needs or access to primary care, each with a different remedy. Writing the hypotheses forces the team to say which cause it believes is largest, and why."),

    h2('s4h1', 'Matching Investment to Cause'),
    blk('s4p1', "The chapter's rule for portfolio design is to match investment size to root cause contribution and not to fund a transportation program for a disparity driven mainly by clinical variation. It is a simple rule that is often broken, because programs are launched where funding or enthusiasm exists and not where the evidence points. The rule suggests a discipline: before funding an intervention, state which cause it addresses, what share of the gap that cause is believed to explain and what change in the gap is expected."),
    blk('s4p2', "Vermont examples in the chapter illustrate the match. For trust and access in behavioral health, certified community behavioral health clinics, which the chapter says must serve all patients regardless of insurance or location. For social needs, community health workers drawn from the communities served and universal screening with warm handoffs. For clinical variation, protocols and bias training as a condition of participation in the state's primary care program. For coverage, enrollment outreach and affordability measures. For geography, regional transport and telehealth supported by broadband. These are the book's descriptions and were not verified for this lesson; they are best read as examples of matching, not as a list of operating programs."),
    steps('s4st1', 'Matching an intervention to a cause', [
        ('State the gap', 'Group, measure, size and source.'),
        ('List hypothesized causes', 'Use the five categories and write the evidence for each.'),
        ('Estimate shares', 'Use decomposition and local knowledge to rank causes.'),
        ('Pick interventions by cause', 'Fund the largest causes first and say what change is expected.'),
        ('Test and revise', 'If the gap does not move, revisit the cause attribution before the intervention.'),
    ]),

    h2('s5h1', 'Limits of the Taxonomy'),
    blk('s5p1', "Any taxonomy simplifies. The five categories overlap, and some mechanisms, such as stigma, could be placed in more than one. Categories also describe causes at the level of the system and may miss individual circumstances. And the taxonomy is strongest for gaps between groups and weaker for explaining why a particular patient did not receive care. Use it for program design and population analysis, not as a way to label individuals."),
    blk('s5p2', "There is also a risk of using the taxonomy to avoid difficult causes. It is easier to fund a screening program than to examine whether the organization's own practices treat patients differently. A rigorous equity effort includes a look at its own contribution to the gap. That may mean auditing referral patterns, reviewing complaints and examining whether language services are actually available when needed. The chapter lists clinical practice variation as a root cause because it is one, and because it is within the control of the organization doing the analysis."),
    blk('s5p3', "Finally, the taxonomy should be revisited as evidence accumulates. Programs that do not move a gap are a source of information about whether the cause attribution was right. An organization that records its hypotheses, interventions and results will learn faster than one that records only activities, and over time its own data will refine or replace the starting taxonomy."),

    takeaway('tw', [
        "Chapter 10 says the same disparity can have different causes, and an intervention aimed at the wrong cause will not close it.",
        "The five root cause categories are geographic access, social needs, clinical practice variation, coverage barriers, and trust and engagement barriers.",
        "Causes compound; a program that addresses one cause can close only the share of the gap that cause explains.",
        "Look for signals that point to each category, combining statistical decomposition with surveys and staff focus groups.",
        "Match investment to the largest causes, and state the expected change in the gap before funding an intervention.",
        "The Vermont programs the chapter lists for each category are the book's descriptions and were not verified here.",
        "Include the organization's own practices in the analysis; clinical practice variation is a cause within an organization's control.",
    ]),
    quiz('qz',
        "What is the chapter's rule for designing an equity intervention portfolio?",
        [
            ("Fund whichever program has the most political support", False),
            ("Match the size of investment to each root cause's contribution to the disparity", True),
            ("Fund transportation first in every case", False),
            ("Avoid addressing more than one cause at a time", False),
        ],
        "The chapter says to match investment size to root cause contribution, for example not funding transportation programs for a disparity primarily driven by clinical variation."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.3 The Disparity Root Cause Taxonomy; §10.14 Root Cause Analytics"),
    blk('src2', "[2] HTR Academy, Health Equity Analytics, Track 1 lesson Disparity Decomposition — /academy/tracks/health-equity-analytics/hea-disparity-decomposition"),
    blk('src3', "[3] Vermont Department of Health, Health Equity Data, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Human%20Services/Reports%20and%20Resources/W~Vermont%20Department%20of%20Health~Health%20Equity%20Data,%202025%20Annual%20Report~1-17-2025.pdf — listed by search; not read in full"),
    blk('src4', "[4] HTR Research Lab, Health Equity Studio — https://healthtransformationreview.org/research-lab/population-equity?tab=equity — the tool Chapter 10 pairs with this method"),
]

L9_SLUG = 'hea-rural-equity-northeast-kingdom'
L9_TITLE = 'Rural Equity and the Northeast Kingdom Test'
L9 = [
    blk('intro1', "Chapter 10 argues that Vermont's rural equity challenge deserves attention beyond the state because it is a type of disparity often underweighted in frameworks shaped by urban racial equity narratives. Rural disparities, it says, are not less serious than urban ones. They differ in character, mechanism and remedy. The chapter's most concrete proposal is that the Northeast Kingdom be treated as an equity priority that constrains the pace and structure of hospital regionalization, and it offers three plain questions as the test any proposal should pass."),
    blk('intro2', "This lesson explains the argument, applies the chapter's three-question test, checks one policy instrument it relies on, the federal Rural Emergency Hospital designation, against public federal sources and shows how to turn the test into an analytic tool for any region. The chapter's descriptions of particular hospitals and regionalization tiers come from the state's consultant report as described in the book and were not verified in this lesson."),
    blk('intro3', "The test is meant to be portable: substitute your own population and place names, and it still works."),

    h2('s1h1', 'What Is Distinct About Rural Equity'),
    blk('s1p1', "Rural disadvantage is often described through proxies such as income or insurance, but its core is distance. A rural resident may have coverage and a provider on the map and still be unable to receive timely care because of a forty-five minute drive, an unreliable road in winter, a clinic open on limited hours or broadband too weak for video visits. The chapter lists the priorities that follow: invest in social and economic determinants and not only clinical delivery, recruit providers who reflect community demographics and culture, pair telehealth with the broadband and devices that make it usable, treat community organizations as partners in design and disaggregate data to county and sub-county levels because state averages mask rural severity."),
    blk('s1p2', "The last point is analytical and important. A state average that blends Burlington and Essex County will describe neither. Equity analysis for rural populations therefore needs data at a smaller scale than most routine reports provide, and it needs ways of handling the small numbers that result, which the next track discusses. Without both, rural disparities will be real and invisible."),
    callout('s1c1', "Rural equity is about time and distance to care, not only about coverage and income."),

    h2('s2h1', 'The Northeast Kingdom Equity Constraint'),
    blk('s2p1', "The chapter calls the three counties of the Northeast Kingdom Vermont's clearest equity priority: the most rural, economically distressed, underserved and distant from the main academic medical center. It describes the region's hospitals as among the most financially distressed in the state and says that, in the consultant's regionalization blueprint, some are assigned to tiers that leave their long-term inpatient future open. It argues that any move away from inpatient services without robust conversion to a rural emergency model and investment in emergency medical services and telehealth would be a serious regression for the communities served."),
    blk('s2p2', "The chapter then states an explicit rule. The state's strategic plan should say that the Northeast Kingdom is an equity priority that constrains the pace and structure of regionalization, because the financial logic of consolidating services at larger hospitals cannot override the obligation to maintain emergency access in the most isolated communities. It acknowledges that the tension between system financial sustainability and rural access equity is genuine and adds that pretending it is not does not resolve it. Whether one agrees with the rule, the chapter is clear about the trade-off it is choosing."),
    blk('s2p3', "The sequence matters, according to the chapter: investments in emergency medical services, telehealth and community paramedicine should precede or accompany any reduction in inpatient services. That is an operational claim that can be checked in any plan. Look at the timeline and ask whether the replacement capacity is scheduled to exist before the service ends, and whether anyone is accountable if it does not."),

    h2('s3h1', 'The Three-Question Test'),
    blk('s3p1', "The chapter's test replaces abstract metrics with named situations. After this change, can a seventy-year-old resident of a small border town who has a heart attack at two in the morning receive timely emergency care? Can a person with serious mental illness in the region's largest town reach a community behavioral health clinic without a two-hour drive? Can a child in a small northern town see a primary care provider within fourteen days? Each question names a person, a place, a time and a standard. They are minimum conditions for health equity in rural Vermont, the chapter says, and a proposal that fails them fails the equity test the state's laws embed."),
    blk('s3p2', "The strength of the test is that it can be answered with data and with maps. Emergency medical service response and transport times can be measured, travel distances to clinics calculated, appointment waits sampled. Where the answer is no, the test has identified a specific gap and a specific standard, which gives planners something to fix. Where the answer is yes only under assumptions, such as that a helicopter is available at night, the assumptions should be made explicit and monitored."),
    table('s3t1', 'Turning the three-question test into measurable standards (examples)', [
        {'Question': 'Timely emergency care for a cardiac event at night', 'Possible_measure': 'EMS response and transport time by community and time of day', 'Data_needed': 'Dispatch records'},
        {'Question': 'Behavioral health access without a long drive', 'Possible_measure': 'Share of residents within a set drive time of a clinic with crisis services', 'Data_needed': 'Facility locations; road network'},
        {'Question': 'Primary care for a child within 14 days', 'Possible_measure': 'Median wait for a new-problem pediatric visit by region', 'Data_needed': 'Appointment audit or scheduling data'},
    ]),

    h2('s4h1', 'The Rural Emergency Hospital Option'),
    blk('s4p1', "The chapter points to the Rural Emergency Hospital designation as a path that maintains round-the-clock emergency access while eliminating unsustainable inpatient infrastructure. Federal sources describe the designation as follows. A facility is eligible if it was a critical access hospital, or a rural hospital with fifty or fewer beds, as of December 27, 2020. It must provide emergency services around the clock, may provide observation care and optional outpatient services and must end acute inpatient services, with an exception for certain post-hospital extended care. It receives its outpatient Medicare payments at a premium of five percent above the standard rate plus a fixed monthly facility payment."),
    blk('s4p2', "A secondary summary reports that the 2026 monthly payment is roughly three hundred thousand dollars, and that converting ends cost-based critical access reimbursement and the facility's eligibility for a federal drug discount program, but those details should be confirmed from the current federal fact sheet before being used in a financial analysis. For equity analysis, the point is structural. The designation preserves emergency capacity, which the Northeast Kingdom test treats as essential, while removing inpatient beds, which the test does not by itself address. Whether the conversion is equitable depends on what replaces inpatient care: transport agreements, telehealth, post-acute and observation capacity and a plan for patients who need admission."),
    blk('s4p3', "The same logic applies outside Vermont. A conversion can be a lifeline for a hospital that would otherwise close, or a quiet reduction in service for a community. The deciding factors are the quality of the replacement plan and whether the community had a voice in it. The chapter's rule that investments in emergency services and telehealth precede or accompany service reductions is a practical way to hold a plan to account."),

    h2('s5h1', 'Using the Test Elsewhere'),
    blk('s5p1', "The chapter notes that the Northeast Kingdom is Vermont's version of a pattern that recurs in the Mountain West, the rural South, Appalachia and the Great Plains: a population separated from emergency, behavioral health and primary care by distance and provider shortage. It adds that the taxonomy applies in a different geometry to dense urban cores and to underserved tribal health systems, where fragmentation, capacity constraints or jurisdictional gaps replace distance as the barrier. The diagnostic question is the same everywhere: for a specific, named person in the underserved population, can they get the care they need within a clinically meaningful time?"),
    blk('s5p2', "To apply it, choose three or four named, realistic scenarios in your area, write the standard for each and find the data that would answer it. Then test any proposed change against the scenarios before and after. Present the results with maps and plain language, so that community members can judge them. The test is not a substitute for broader analysis, but it keeps a plan honest about the people who bear its consequences, and it gives communities a language in which to challenge a decision."),
    blk('s5p3', "Finally, remember that equity constraints and financial constraints interact. A region's hospitals may be fragile because the population is small and poor, which is the reason the equity constraint exists. A plan that ignores the finance will fail, and one that ignores the equity will fail the community. The chapter's honest framing is that the tension must be named, and the practical task is to design transitions in which both constraints are met, with time, capital and clear accountability."),

    takeaway('tw', [
        "Chapter 10 says rural disparities differ in character from urban racial disparities and require different interventions, including county and sub-county data.",
        "The chapter proposes that the Northeast Kingdom be an explicit equity priority that constrains the pace and structure of regionalization.",
        "It says investments in emergency medical services, telehealth and community paramedicine should precede or accompany any reduction in inpatient services.",
        "Its three-question test names a person, place, time and standard: emergency care at night, behavioral health access and primary care within 14 days.",
        "Federal sources describe the Rural Emergency Hospital designation as 24-hour emergency care with no inpatient services, with a monthly facility payment and a premium on outpatient payments.",
        "Whether conversion is equitable depends on what replaces inpatient care and whether the community had a voice.",
        "The test is portable: substitute your own population and places, define standards and test plans before and after.",
    ]),
    quiz('qz',
        "What must a Rural Emergency Hospital do under the federal designation?",
        [
            ("Provide inpatient surgery", False),
            ("Provide emergency services around the clock and end acute inpatient services", True),
            ("Close its emergency department", False),
            ("Merge with an academic medical center", False),
        ],
        "The designation requires 24-hour emergency services, allows observation and outpatient services and ends acute inpatient care, with a limited exception for certain post-hospital extended care."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.4 Rural Equity: Vermont's Defining Challenge; the Northeast Kingdom Equity Constraint and Beyond Vermont boxes"),
    blk('src2', "[2] Centers for Medicare and Medicaid Services, Rural Emergency Hospitals — https://www.cms.gov/medicare/health-safety-standards/certification-compliance/rural-emergency-hospitals ; MLN fact sheet MLN2259384 — https://www.cms.gov/files/document/mln2259384-rural-emergency-hospitals.pdf"),
    blk('src3', "[3] Vermont Rural Health Transformation Program — https://www.ruralhealthinfo.org/states/vermont/rhtp — emergency medical services and telehealth investments as described publicly"),
    blk('src4', "[4] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, May 2026 — https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf — hospital plans and regional context"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
