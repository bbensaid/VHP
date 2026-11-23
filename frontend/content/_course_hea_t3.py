exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_hea_common.py').read())

# Track 3 — Data and Access. Book Ch10 §10.5, §10.12.1, §10.16. Verified 2026-11-23 (search): RAND BISG (Fremont, Weissman, Hoch, Elliott, RAND Health Quarterly 2016: validation studies rate BISG well for
# measuring group race/ethnicity; advise against classifying a specific individual; accuracy varies by geography; struggles with some minority groups and small subpopulations; BIFSG adds first names);
# CMS cell size suppression policy (cells 1-10 not reported; zero allowed; percentages revealing small cells barred; complementary suppression); state BRFSS practice varies (e.g., Alaska: suppress if
# unweighted denominator <50 or RSE >50%, CDC treats RSE >30% unstable; NYC: suppress n<50, caution at RSE>=30%); KFF Jan 16 2026: 13 states cover GLP-1s for obesity under FFS (16 in Oct 2025; CA, NH, PA, SC
# eliminated; NC reinstated Dec 2025); CMS BALANCE Model (announced Dec 23 2025; Medicaid participation May 2026-Dec 2031; state applications through Jul 31 2026; start date May 1 2026-Jan 1 2027; Part D
# component delayed (AHA Apr 22 2026); Medicare GLP-1 Bridge). Vermont's BALANCE decision NOT found. Book-only/unverified: Vermont Medicaid excludes obesity indication; 15-20% weight loss; VHCURES race fields incomplete.

L10_SLUG = 'hea-race-ethnicity-data'
L10_TITLE = 'Seeing Who Is Missing: Race and Ethnicity Data Quality'
L10 = [
    blk('intro1', "Equity analysis begins with knowing who is in the data. Chapter 10 states plainly that stratified quality measurement requires race, ethnicity and other demographic information at the level of the individual patient, and that this is where Vermont's measurement infrastructure has a specific gap: demographic fields in the state's claims database are incomplete. Claims from commercial insurers typically lack race and ethnicity fields, Medicare collects them more recently and Medicaid has the most complete information. If a field is missing for a large share of people, any gap computed from it describes only those who have it."),
    blk('intro2', "This lesson explains how to audit demographic data, the three ways organizations fill the gaps, the strengths and limits of a widely used estimation method and how to report results honestly when data are imperfect. The chapter's statements about Vermont's claims database come from the book and a state health department report it cites, and were not verified here. The method descriptions draw on RAND's own published work as summarized in search results."),
    blk('intro3', "Missing data is not neutral. Who is missing is usually related to the very disparities being studied."),

    h2('s1h1', 'Why Missing Demographics Distort Gaps'),
    blk('s1p1', "Suppose a clinic computes diabetes control by race, and race is recorded for sixty percent of patients. The result describes the sixty percent. If patients whose race is recorded differ from those whose race is not, for example because front-desk practices or language barriers make recording less likely for some groups, the gap computed will be biased in a direction no one can see from the table. The bias could hide a disparity, exaggerate one or reverse it. The missing share is itself a finding and should appear in every equity report."),
    blk('s1p2', "Missingness is often patterned. People who use interpreters, people who are new to the system and people seen in settings with weaker registration processes are less likely to have complete records. Insurance sources differ too. The chapter's observation that commercial claims usually lack race and ethnicity while Medicaid data have the most complete demographic information means that an equity analysis across insurance types will be most complete for the population that already receives the most public attention, and least complete for the commercially insured. A report should say, for each source, what share of records have a usable value."),
    callout('s1c1', "Report the completeness of every demographic field beside the results. A gap without a completeness figure cannot be judged."),

    h2('s2h1', 'Three Ways to Fill the Gap'),
    blk('s2p1', "The chapter describes two approaches for Vermont: direct collection at the point of care, and indirect estimation using a validated method. A third, linkage, joins records from systems that already hold the information, for instance matching claims to enrollment files that record race and ethnicity. Each has strengths and costs."),
    blk('s2p2', "Direct collection by self-report is the gold standard. A person is asked how they identify, in their own words or from categories, and the answer is recorded. It requires training staff to ask respectfully and consistently, explaining why the information is requested, offering the person the option of not answering and storing the answer in a structured field. The chapter notes that national accreditation standards for plans and medical homes require demographic collection and reporting. Collection takes time to build into workflows, and it only reaches people who have contact with the practice."),
    blk('s2p3', "Linkage is cheaper and fast where it is possible, but only as good as the source. Enrollment records may be more complete for some programs than others, and categories may not match across systems. Linkage should be accompanied by an assessment of agreement where two sources overlap, which shows how reliable each is."),
    table('s2t1', 'Three approaches to demographic data and their cautions', [
        {'Approach': 'Direct self-report at point of care', 'Strength': 'Most accurate; respects self-identification', 'Caution': 'Needs workflow, training and trust; reaches only those who attend'},
        {'Approach': 'Linkage to enrollment or program files', 'Strength': 'Fast; broad coverage where files exist', 'Caution': 'Categories differ; quality varies by program'},
        {'Approach': 'Indirect estimation from name and address', 'Strength': 'Covers records with no demographic data', 'Caution': 'Probabilistic; best for groups, not individuals; weaker for small groups'},
    ]),

    h2('s3h1', 'Indirect Estimation: What It Can and Cannot Do'),
    blk('s3p1', "The chapter names one estimation method, which combines a person's surname with the characteristics of their census block to estimate the probability of belonging to each racial and ethnic group. It is known as Bayesian Improved Surname Geocoding and was developed by researchers at RAND. According to a RAND Health Quarterly article by Fremont, Weissman, Hoch and Elliott, validation studies rate such methods as performing well at measuring race and ethnicity for groups, and they are widely used by health plans for disparities reporting when self-reported data are unavailable."),
    blk('s3p2', "The same sources are clear about limits. RAND investigators advise against using the probabilistic estimates to classify a specific individual, because accuracy for any one person is lower than for the group. Accuracy varies by geography. The method struggles with some groups, such as people whose surnames are uncommon or missing from the census list, and research on small subpopulations has found poor relative accuracy, with errors that tend to run in the same direction within a group. The method also assumes that surname and location are unrelated once race is known, and it relies on census distributions that age. An extension that adds first names has been developed and is used in some federal analyses."),
    blk('s3p3', "The practical conclusion is to use estimation to measure group-level disparities where direct data are missing, to say that estimated data were used, to avoid using estimates for decisions about individuals and to be especially careful where a state's small populations are concerned. In a state like Vermont, where several groups are small and geographically dispersed, an estimation method trained on national distributions may perform worse than in large diverse states, which is a reason for local validation against self-reported data wherever it exists."),

    h2('s4h1', 'A Data Completeness Audit'),
    blk('s4p1', "Begin with the fields you need: race, ethnicity, preferred language, disability status, sexual orientation and gender identity, housing status and county or small-area geography. For each, in each data source, calculate the share of records with a valid value, the share marked unknown or declined and the share blank. Break these down by clinic, by insurance, by age group and by month, since completeness often differs sharply between sites and shifts after a system change."),
    steps('s4st1', 'A one-week demographic data audit', [
        ('List fields and sources', 'Identify each demographic field and every system that holds it.'),
        ('Compute completeness', 'Share valid, unknown, declined and blank, by site, payer and month.'),
        ('Check agreement', 'Where two sources overlap, compare values for the same people.'),
        ('Find the cause', 'Interview front-desk and registration staff about how and when it is asked.'),
        ('Fix and track', 'Retrain, redesign the form, add structured fields and report completeness monthly.'),
    ]),
    blk('s4p2', "The chapter's implementation matrix gives indicative costs for improving race and ethnicity data quality in the state claims database, a modest annual figure with a payback of about a year, and for a larger social risk adjustment design effort. These are the book's planning ranges and were not verified. What the audit adds is a way to learn quickly where the problem is and what it would take to fix it."),
    blk('s4p3', "Treat the people behind the data with respect. Collecting demographic information without explaining its purpose, or in settings where patients fear misuse, damages trust. Explain that the information is used to find and fix gaps in care, state who can see it and honor the option to decline. In small communities, where individuals are identifiable, protect privacy through small-cell rules, which the next lesson discusses."),

    h2('s5h1', 'Reporting Honestly With Imperfect Data'),
    blk('s5p1', "Every equity report should include a short data note: sources, periods, completeness of each demographic field, how missing values were handled and any estimation used. Present results for groups with sufficient data, mark those with insufficient data as not reportable, and do not impute silently. Where the missing share is large, give a sensitivity analysis showing how the gap would change under plausible assumptions about those missing."),
    blk('s5p2', "The chapter's architecture table for Vermont's equity analytics, which lists the best current source for each dimension and its limits, is a good model for a data note. For primary care access by race, it names the state survey, limited by the small sample of BIPOC respondents, and the Blueprint's provider relationship data for attributed patients. For chronic disease control, it names the Blueprint clinical registry, which is the most complete but covers only patients attributed to participating practices. Writing the limit beside the source makes plain what an analysis can and cannot say."),
    blk('s5p3', "The aim is not perfect data, which does not exist, but analysis whose limits are visible. A decision maker who knows that sixty percent of records have race recorded, and that the missing records lean toward a particular site, can discount the result appropriately and invest in better capture. One who is shown only a clean-looking gap will draw conclusions the data cannot support."),

    takeaway('tw', [
        "Chapter 10 says stratified measurement needs individual-level race and ethnicity data and that Vermont's claims data are incomplete; commercial claims typically lack the fields and Medicaid has the most complete data.",
        "Missing demographic data is patterned and can hide, exaggerate or reverse a gap; report completeness beside every result.",
        "Self-report at the point of care is the gold standard; linkage is fast but varies in quality; estimation fills gaps for groups.",
        "RAND's surname and geography method performs well for group-level measurement but is discouraged for classifying individuals and is weaker for small groups.",
        "Estimation should be validated locally against self-reported data, especially in a state with small, dispersed populations.",
        "A completeness audit examines each field by site, payer and month, checks agreement across sources and finds the cause with front-line staff.",
        "Include a data note in every equity report and mark groups with insufficient data as not reportable instead of imputing silently.",
    ]),
    quiz('qz',
        "How do RAND investigators advise using surname-and-geography race estimates?",
        [
            ("To classify each patient's race for clinical decisions", False),
            ("To measure group-level disparities where self-reported data are missing, not to classify specific individuals", True),
            ("To replace all self-reported data permanently", False),
            ("Only for the largest racial group", False),
        ],
        "The sources say the methods perform well for measuring group race and ethnicity, but advise against using the probabilistic estimates to classify a specific individual because accuracy for any one person is lower."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.12.1 The Data Collection Challenge; §10.16 Vermont's Population Health Equity Analytics Architecture"),
    blk('src2', "[2] Fremont A, Weissman JS, Hoch E, Elliott MN. When Race/Ethnicity Data Are Lacking. RAND Health Quarterly 2016 — https://www.rand.org/pubs/periodicals/health-quarterly/issues/v6/n1/16.html — as summarized in search results"),
    blk('src3', "[3] Elliott MN et al., RAND slides on Bayesian Improved Surname Geocoding — https://www.brookings.edu/wp-content/uploads/2012/04/01-Panel-C_Elliott_1_032410.pdf ; Imai K, Olivella S, Rosenman E, Improving the accuracy of BISG using a fully Bayesian approach — https://imai.fas.harvard.edu/research/files/racepred.pdf — limitations and extensions as summarized"),
    blk('src4', "[4] Vermont Statutes, 18 V.S.A. section 252 (Health Equity Advisory Commission; disaggregation requirement) — https://legislature.vermont.gov/statutes/section/18/006*/00252"),
]

L11_SLUG = 'hea-small-numbers'
L11_TITLE = 'Small Numbers, Big Stakes: Reporting Equity for Small Groups'
L11 = [
    blk('intro1', "Vermont is a small state, and equity analysis keeps running into the same problem: the groups of greatest concern are often too small to measure well. Chapter 10 acknowledges this repeatedly. State survey data on Black and American Indian adults rest on few respondents, the Indigenous population is small and dispersed and county-level data are available for only a few indicators. The temptation is either to publish unstable numbers as if they were firm, or to suppress them and leave the groups invisible. Neither serves equity."),
    blk('intro2', "This lesson teaches how sample size shapes uncertainty, with worked arithmetic; how suppression rules work and what they protect; techniques for making small-group data more useful, such as pooling years, combining categories and complementing numbers with qualitative evidence; and how to write about small-group results honestly. The rules cited are published practices of federal and state programs as summarized in search results, and they differ among programs, so a reader should confirm the rule that governs a particular dataset."),
    blk('intro3', "The goal is to be neither falsely precise nor silent."),

    h2('s1h1', 'How Sample Size Drives Uncertainty'),
    blk('s1p1', "A survey estimate is a guess about a whole population based on a sample, and the uncertainty of the guess depends mainly on how many people were sampled. For a proportion p measured on n people, the standard error is the square root of p times one minus p divided by n, and a rough ninety-five percent interval is the estimate plus or minus about two standard errors. Take an illustrative example. If seventy-eight percent of forty respondents in a group report having a personal provider, the standard error is about 6.5 percentage points and the interval runs from roughly 65 to 91 percent. The same estimate from four hundred respondents has a standard error of about 2 points and an interval of roughly 74 to 82 percent."),
    blk('s1p2', "The first interval includes the statewide average. A reader seeing only the point estimate would conclude that the group is well below the state, while the interval says the data are also compatible with no gap at all. That cuts both ways. A real gap can hide behind a wide interval, and a chance gap can look like a finding. The honest summary of the forty-person estimate is that it suggests a gap but cannot establish its size. Surveys with complex designs have wider intervals than this simple formula suggests, so the real uncertainty is usually larger."),
    table('s1t1', 'Illustrative precision of an estimate of 78 percent at different sample sizes', [
        {'Sample_size': '40', 'Standard_error': 'About 6.5 points', 'Rough_95_percent_interval': 'About 65 to 91 percent'},
        {'Sample_size': '100', 'Standard_error': 'About 4.1 points', 'Rough_95_percent_interval': 'About 70 to 86 percent'},
        {'Sample_size': '400', 'Standard_error': 'About 2.1 points', 'Rough_95_percent_interval': 'About 74 to 82 percent'},
    ]),
    callout('s1c1', "A gap with an interval that includes zero is not proof of equality. It is a sign that the data cannot yet say."),

    h2('s2h1', 'Suppression Rules and What They Protect'),
    blk('s2p1', "Suppression rules protect two things: privacy and reliability. The federal Medicare and Medicaid agency's data policy bars the display of cells containing values of one through ten in publicly reported tables, allows zero, and bars percentages or formulas that would reveal a small cell. Documents created with those data must follow the policy, and analysts must also suppress complementary cells that would allow the hidden value to be calculated by subtraction. The common workarounds are to collapse categories, coarsen the data or suppress cells."),
    blk('s2p2', "Reliability rules differ. State health survey programs often suppress an estimate when the unweighted number of respondents in the denominator is below fifty, and flag an estimate as unstable when its relative standard error exceeds thirty percent, a threshold the federal public health agency treats as unreliable. Some programs suppress at a higher relative error, and others use rules based on the numerator or the width of the interval. The specific rule for a given dataset is stated in its technical documentation, and an analyst should apply that rule and not borrow another."),
    blk('s2p3', "The relative standard error is the standard error divided by the estimate, so rare outcomes are especially unstable. A rate of ten percent measured on forty people has a standard error of about 4.7 points, a relative standard error near forty-seven percent, which would be flagged or suppressed under common rules. A rate of seventy-eight percent on the same forty people has a relative error of about eight percent and would pass. The same sample size can be adequate for a common outcome and inadequate for a rare one."),

    h2('s3h1', 'Making Small-Group Data More Useful'),
    blk('s3p1', "Several techniques extend what small samples can say. Pooling years combines two or three survey waves, which multiplies the sample, at the cost of hiding recent change. Combining categories, such as reporting all people of color together when separate groups are too small, gives a more stable estimate but obscures differences among groups, which can be large. Using smaller geographic areas only for outcomes that are common enough to estimate there, and larger areas for rare ones, balances detail and stability. Statistical smoothing methods that borrow strength from neighboring areas or years can stabilize estimates, though they require expertise and should be explained to readers."),
    blk('s3p2', "Each technique involves a trade-off, and the trade-off should be stated. A report that pools three years should say so and avoid describing the result as current. One that combines groups should name the groups included and note that the average may conceal meaningful differences. One that smooths estimates should describe the method in plain language. Choosing among techniques is a judgment about which error is worse: instability or blur."),
    blk('s3p3', "Other kinds of evidence also help. Administrative records may cover the entire population of a small group, which removes sampling error, though they may lack the demographic detail or measure something different. Community knowledge, interviews and focus groups can describe barriers that a survey cannot. Where a group is too small for numbers, qualitative evidence may be the most reliable guide and should be presented as evidence, not as a footnote."),

    h2('s4h1', 'Ethics: Visibility and Protection'),
    blk('s4p1', "Small-number rules set two values against each other. Suppression protects individuals in small communities from being identified, which matters when a table with a single person in a cell reveals that person's health condition. At the same time, suppression can erase the groups who most need attention. The chapter's concern that Vermont's data systems are not equipped to measure its Indigenous population well is an example of the second risk."),
    blk('s4p2', "Resolving the tension requires judgment and consultation. Some communities prefer to control how their data are used and shared, and an equity program should ask. Where privacy rules prevent publishing numbers, an organization can still use them internally under data agreements to guide action, report results in aggregated form with the community's agreement, or invest in better data collection through partnerships. The goal is to avoid both extremes: publishing identifiable data and leaving groups invisible."),
    steps('s4st1', 'Deciding how to report a small-group estimate', [
        ('Check the rule', 'Read the dataset documentation for suppression and reliability thresholds.'),
        ('Compute the interval', 'Report the estimate with its interval or relative error.'),
        ('Choose a technique', 'Pool, combine or smooth if needed and state the trade-off.'),
        ('Add other evidence', 'Pair numbers with administrative or qualitative evidence.'),
        ('Consult the community', 'Ask how the group wants its data used and shared.'),
    ]),

    h2('s5h1', 'Writing About Small Numbers'),
    blk('s5p1', "Language shapes interpretation. Avoid verbs such as proves or confirms for small-sample findings, and prefer suggests, is consistent with or cannot rule out. Always give the sample size. Place the interval or a plain-language statement of uncertainty next to the figure. Avoid ranking small groups against each other when intervals overlap, since the ranking will mislead. And avoid headlines that treat a change of a few points in a small group as a trend."),
    blk('s5p2', "A short template can be reused. State the finding. State the group and sample. Give the interval. Say what the estimate can and cannot tell the reader. Say what additional data would sharpen it. For example: Among Hispanic adults surveyed in the combined years, the estimated share with a personal provider was below the statewide share, but the sample was small and the interval includes the state average, so the data suggest a gap but cannot establish its size; pooled data from additional years would help. A reader can act on that sentence without being misled."),
    blk('s5p3', "Finally, treat small numbers as a reason to invest in data, not a reason to stop. Oversampling in surveys, partnerships with community organizations and structured collection in clinics can raise the quality of information about small groups over time. Equity measurement is a long-term investment, and the groups hardest to see are those for whom it matters most."),

    takeaway('tw', [
        "Uncertainty of a survey proportion depends mainly on sample size; an estimate of 78 percent on 40 people has an interval of roughly 65 to 91 percent in this illustration.",
        "A gap whose interval includes zero is not proof of equality; the data cannot yet say.",
        "The federal Medicare and Medicaid agency's policy bars display of cells with values from one to ten, with complementary suppression to prevent back-calculation.",
        "State survey programs commonly suppress estimates with fewer than 50 respondents and flag a relative standard error above 30 percent, but rules differ by dataset.",
        "Rare outcomes are less stable than common ones at the same sample size.",
        "Pooling years, combining categories and smoothing each trade stability for detail; state the trade-off.",
        "Suppression protects privacy but can erase small groups; consult communities, use other evidence and invest in better data.",
    ]),
    quiz('qz',
        "Why can an estimate of 78 percent from 40 respondents be consistent with no gap from a 91 percent state average?",
        [
            ("Because 78 is greater than 91", False),
            ("Because with so few respondents its interval is wide, roughly 65 to 91 percent, and so includes the state average", True),
            ("Because small samples are always accurate", False),
            ("Because the state average is not an estimate", False),
        ],
        "A proportion near 78 percent measured on 40 people has a standard error of about 6.5 points, giving an interval that reaches the state average. The data suggest a gap but cannot establish its size."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.2.2 Racial and Demographic Equity; §10.16 equity analytics architecture (small samples)"),
    blk('src2', "[2] Centers for Medicare and Medicaid Services, Cell Suppression Policy — https://www.hhs.gov/guidance/document/cms-cell-suppression-policy ; CMS Chronic Conditions Data Warehouse output review guidance — https://www2.ccwdata.org/documents/10280/19002246/ccw-output-review-dos-donts.pdf"),
    blk('src3', "[3] Alaska Division of Public Health, BRFSS methods and suppression guidance — https://health.alaska.gov/dph/Chronic/pages/brfss/method.aspx ; New York City Department of Health, Data reliability guidelines — https://www.nyc.gov/assets/doh/downloads/pdf/episrv/bes-data-reliability.pdf"),
    blk('src4', "[4] Vermont Department of Health, BRFSS populations in focus — https://www.healthvermont.gov/sites/default/files/document/hsi-brfss-populations-in-focus-2023-race.pdf — example of small-group reporting"),
]

L12_SLUG = 'hea-glp1-access-equity'
L12_TITLE = 'The GLP-1 Access Gap: Who Gets the New Obesity Drugs'
L12 = [
    blk('intro1', "Chapter 10 calls GLP-1 medications the most consequential new health equity issue since statins. The drugs, semaglutide and tirzepatide, are described as producing substantial weight loss and cardiovascular benefit, and the equity problem it identifies is price and coverage. At list prices above one thousand dollars a month, they are out of reach for most people who would benefit unless an insurer pays, and the people who would benefit most, with obesity, diabetes and heart disease concentrated in lower-income and rural communities, are often those with the least coverage. The chapter treats the decision whether to cover them as an equity policy decision, not only a budget decision."),
    blk('intro2', "This lesson separates what can be verified from what the chapter asserts, explains how coverage actually works, describes the federal BALANCE model that the chapter says offers a partial solution and sets out how an analyst should frame the equity question and the monitoring that follows a coverage decision. National coverage counts and the model's design come from the federal agency and a health policy foundation as read through search results. Vermont's own coverage policy and decision could not be confirmed."),
    blk('intro3', "Whatever the policy, the analytic task is the same: show who is eligible, who can pay and who ends up with the drug."),

    h2('s1h1', 'How Coverage Works'),
    blk('s1p1', "Coverage of GLP-1 drugs depends on the reason for prescribing. Medicaid programs generally cover them for indications that are medically accepted and approved, such as type 2 diabetes. Coverage for obesity treatment is optional for states. According to the foundation's January 2026 count, thirteen state Medicaid programs covered the drugs for obesity under fee-for-service, down from sixteen in October 2025: four states, California, New Hampshire, Pennsylvania and South Carolina, ended coverage, while North Carolina, which had dropped coverage in October, reinstated it in December. Cost was cited as the main factor in state decisions."),
    blk('s1p2', "The chapter says Vermont Medicaid covers these drugs for approved indications but excludes weight loss as a primary indication under its state plan. This lesson could not confirm the current Vermont policy and a reader should check it with the state Medicaid agency's pharmacy documents. If the chapter is right, the practical effect is a split. A person with obesity and diabetes can obtain the drug under the diabetes indication, while a person with obesity and risk factors but no diagnosed diabetes cannot, unless they pay the full price."),
    blk('s1p3', "That split is the heart of the chapter's equity concern. The patients for whom prevention might be most valuable, those with obesity and early risk factors, are the ones excluded, and the exclusion is based on a diagnosis that follows the disease and does not prevent it. It is also a reminder that coverage rules, not clinical need, determine access."),
    callout('s1c1', "When coverage depends on diagnosis, the people who are sick enough to qualify may be those for whom prevention came too late."),

    h2('s2h1', 'What the BALANCE Model Is'),
    blk('s2p1', "In December 2025 the federal innovation center announced the BALANCE model, a voluntary program that allows state Medicaid agencies and Medicare Part D plans to cover GLP-1 medications for obesity at prices negotiated with manufacturers. According to the agency's materials and secondary summaries, Medicaid participation runs from May 2026 through December 2031. States could apply through July 31, 2026, and could choose a start date between May 1, 2026 and January 1, 2027, with later participation only at the agency's discretion. Participating states can use the lower negotiated price for existing covered uses, such as diabetes, and extend coverage to weight loss."),
    blk('s2p2', "The Medicare side has been delayed. A hospital association report of April 22, 2026 described the agency postponing the Part D portion, and a separate short-term Medicare bridge program is described as a short-term bridge, which the chapter says carries a fixed monthly copayment. The chapter's three limits on the model are well founded. Manufacturer participation is voluntary. State participation is voluntary, and states under budget pressure may not join. And even negotiated prices may be a heavy burden for Medicaid budgets that face federal funding reductions. Commentators have also questioned whether the prices will be low enough to make participation affordable."),
    blk('s2p3', "The chapter states that applications from states were due on July 31, 2026, and calls Vermont's decision an equity policy decision. This lesson searched for Vermont's decision and found none, so it cannot say whether the state applied. The lesson's analytic framework applies either way: if the state applied, the questions concern implementation and monitoring, and if it did not, the questions concern what the state will do instead."),
    table('s2t1', 'BALANCE model: facts verified from federal and policy sources', [
        {'Item': 'Announcement', 'Detail': 'December 2025, voluntary model for state Medicaid and Medicare Part D'},
        {'Item': 'Medicaid timeline', 'Detail': 'Participation May 2026 through December 2031; applications through July 31, 2026'},
        {'Item': 'State start date', 'Detail': 'Chosen between May 1, 2026 and January 1, 2027'},
        {'Item': 'Medicare Part D', 'Detail': 'Portion delayed per April 2026 reporting; short-term Medicare bridge program in interim'},
        {'Item': 'Vermont decision', 'Detail': 'Not found in sources searched'},
    ]),

    h2('s3h1', 'Framing the Equity Analysis'),
    blk('s3p1', "An analyst can frame the question in four parts. First, who could benefit? Estimate the number of Medicaid enrollees who have obesity and related risk factors, stratified by county, income, race and ethnicity, disability and age. Second, who can currently obtain the drugs? Count those who qualify under diabetes or cardiovascular indications and those with commercial coverage that includes obesity treatment. The difference is the access gap. Third, what would coverage cost, and what might it save? Fourth, what would it take for coverage to translate into actual use by the people who need it?"),
    blk('s3p2', "On cost and savings, be cautious. The chapter argues that long-term fiscal benefits are strong while short-term budget pressure is real, and that the populations who would benefit most are those whose costs are likely to fall most. The first part is plausible but depends on assumptions about how many people start treatment, how long they stay on it, what happens when they stop and how much downstream cost is avoided. The lesson did not verify the chapter's claims about weight loss and cardiovascular benefit, and any estimate of net savings should be presented as a range under stated assumptions, with the share of the cost borne by the state budget separated from federal matching funds."),
    blk('s3p3', "Equity enters the cost analysis too. A coverage policy with burdensome prior authorization, narrow criteria or limited prescriber access will be used most by those best able to navigate it. That is why the fourth question matters. Coverage on paper can still leave the rural, the uninsured-recently and the less-connected without the drug."),

    h2('s4h1', 'Monitoring After a Coverage Decision'),
    blk('s4p1', "If coverage is adopted, monitoring should track the pipeline from eligibility to benefit. How many eligible people are prescribed the drug, by county, income, race and ethnicity? What share of prescriptions are filled, and how many are discontinued within six months? What is the time from request to approval? Are there pharmacies and prescribers in the rural counties, and do patients have the support, such as nutrition and activity programs, that accompany treatment in the trials? A stratified dashboard of this pipeline would show where the system loses people."),
    blk('s4p2', "A second set of measures tracks outcomes: weight, glycemic control, blood pressure and cardiovascular events over time, again stratified. Outcome measures take longer to emerge and are affected by many factors, so process measures should come first. A third set tracks unintended effects, such as shortages that disadvantage existing diabetes patients, cost shifts to other budget areas or reduced investment in lifestyle programs. The aim is to know early if coverage is reaching the intended population."),
    steps('s4st1', 'An equity monitoring plan for a new coverage decision', [
        ('Define the eligible population', 'Size it by county, income, race, ethnicity, disability and age.'),
        ('Track the pipeline', 'Request, approval, prescription, fill and persistence, stratified.'),
        ('Check access capacity', 'Prescribers, pharmacies and support programs by region.'),
        ('Measure outcomes', 'Clinical measures over time, stratified, with process measures first.'),
        ('Watch for harms', 'Shortages, cost shifting and displacement of other programs.'),
    ]),

    h2('s5h1', 'The Wider Lesson for Equity Analytics'),
    blk('s5p1', "The GLP-1 case illustrates a pattern that will recur as new treatments arrive: a therapy shows large benefit, its price limits access to those with generous insurance or high income, and the benefits accrue first to those already advantaged. The chapter ties this to a broader theme about pharmaceuticals and equity. An organization committed to equity should have a standing process for new high-cost therapies that asks who is eligible, who can pay and who will be left out, before the first coverage decision is made."),
    blk('s5p2', "It also illustrates why equity analysis must be paired with honest uncertainty. Claims about the benefits of a drug, its costs and its fiscal effects evolve quickly. Rely on primary sources for each number, label projections as projections and update the analysis as evidence and prices change. The chapter's framing, that this is an equity decision and not only a budget one, is best served by a transparent analysis that policymakers can read and challenge."),
    blk('s5p3', "Finally, remember that coverage is one lever among several. Food access, safe places to be active, primary care continuity and community programs also shape weight and metabolic health. A state that covers a drug but neglects those conditions will see uneven results, and one that invests in conditions but excludes effective treatment will leave some benefit unrealized. An equity strategy considers both."),

    takeaway('tw', [
        "Chapter 10 calls GLP-1 access the most consequential new equity issue because price and coverage limit these drugs to people with generous insurance or income.",
        "KFF counted 13 state Medicaid programs covering GLP-1s for obesity in January 2026, down from 16 in October 2025 after four states ended coverage and North Carolina reinstated it.",
        "The chapter says Vermont Medicaid excludes weight loss as a primary indication; the lesson could not confirm current Vermont policy or Vermont's BALANCE decision.",
        "The BALANCE model is voluntary for states and manufacturers; Medicaid participation runs May 2026 through December 2031 with applications through July 31, 2026, and the Medicare Part D portion was delayed.",
        "Frame the analysis by who could benefit, who can obtain the drug now, what coverage would cost and save, and what it takes to reach the intended population.",
        "Present net savings as a range under stated assumptions and separate state costs from federal matching funds.",
        "Monitor the pipeline from eligibility to persistence, stratified by county, income and race, and watch for unintended harms.",
    ]),
    quiz('qz',
        "What is the central equity concern Chapter 10 raises about GLP-1 coverage?",
        [
            ("That the drugs are ineffective", False),
            ("That price and coverage rules give access mainly to those with generous insurance or a qualifying diagnosis, while lower-income people with obesity may be excluded", True),
            ("That all states cover them for obesity", False),
            ("That only rural patients want them", False),
        ],
        "The chapter says the drugs are accessible mainly to people with commercial coverage and those with diabetes or cardiovascular disease, while lower-income patients with obesity but no qualifying diagnosis must pay full price."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.5 The GLP-1 Access Crisis; §10.6.2 (GLP-1 Medicaid coverage decision)"),
    blk('src2', "[2] KFF, Medicaid Coverage of and Spending on GLP-1s (January 16, 2026) — https://www.kff.org/medicaid/issue-brief/medicaid-coverage-of-and-spending-on-glp-1s/ — coverage counts as summarized by search"),
    blk('src3', "[3] Centers for Medicare and Medicaid Services, BALANCE Model — https://www.cms.gov/priorities/innovation/innovation-models/balance ; State Medicaid request for applications — https://www.cms.gov/priorities/innovation/files/balance-state-medicaid-rfa.pdf ; KFF, What to Know About the BALANCE Model — https://www.kff.org/medicare/what-to-know-about-the-balance-model-for-glp-1s-in-medicare-and-medicaid/"),
    blk('src4', "[4] American Hospital Association, CMS delays Part D portion of BALANCE model (April 22, 2026) — https://www.aha.org/news/headline/2026-04-22-cms-delays-part-d-portion-balance-model-expansion-glp-1-access"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
