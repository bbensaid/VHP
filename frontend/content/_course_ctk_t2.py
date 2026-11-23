exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_ctk_common.py').read())

# Track 2 — Behavioral Health Integration. Verified 2026-11-23: CMS MLN909432 Behavioral Health Integration Services booklet
# (January 2026), read from the PDF (99492 first 70 minutes of first month; 99493 first 60 minutes subsequent months; 99494
# each additional 30 minutes; G2214 first 30 minutes; 99484 and G0323 general BHI at least 20 minutes; optional add-on HCPCS
# G0568/G0569 (CoCM) and G0570 (general BHI) from Jan 1 2026 with APCM base codes G0556-G0558, not time-based); CMS MLN
# MM14315 summary of the CY2026 PFS final rule; Blueprint 2025 Annual Report (MHI pilot staffing; the report text does not use the
# terms 'CoCM' or 'collaborative care'); WCAX July 24 and Oct 12, 2026 and VermontBiz July 22, 2026 on Vermont's CCBHCs;
# SAMHSA CCBHC criteria (2023) via search. Book-only: '90+ randomized trials' for CoCM; one psychiatrist supporting 10-15
# practices; BHCM pipeline description; CCBHC matrix cost ($500K-$2M a year per entity; 18-36 months).

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'ctk-cocm-readiness'
L4_TITLE = 'Deploying the Collaborative Care Model: Readiness and Billing in 2026'
L4 = [
    blk('intro1', "The Collaborative Care Model is the best-established way to integrate behavioral health into primary care. Chapter 9 says its evidence base, which it puts at more than 90 randomized controlled trials, plus designated Medicare billing codes, make it the clinical standard for behavioral health integration. It also says that the evidence does not implement the model: a practice has to prepare, set up a registry, build a workflow and learn to bill. This lesson covers those practical steps and the 2026 billing rules, which changed."),
    blk('intro2', "The billing facts come from CMS's January 2026 booklet on behavioral health integration services and from CMS's summary of the 2026 physician fee schedule final rule, both read for this lesson. The 90-trial figure is the book's, and this lesson did not independently verify it."),
    blk('intro3', "A practice's first question is not whether collaborative care works. It is whether the practice can run it."),

    h2('s1h1', 'What the Model Is'),
    blk('s1p1', "In collaborative care, a primary care provider treats the patient and is the billing provider. A behavioral health care manager, working under the provider's direction, keeps a registry of patients, contacts them regularly, delivers brief evidence-based interventions and tracks response with validated rating scales. A psychiatric consultant reviews the registry with the care manager, typically weekly, and advises the primary care provider on treatment changes, seeing patients directly only when needed. The model is registry-based and measurement-based: patients who are not improving are identified by their scores and their treatment is adjusted."),
    blk('s1p2', "Chapter 9's component table lists the three roles. The primary care provider identifies patients by validated screening such as the PHQ-9 and GAD-7, makes warm handoffs and bills monthly. The care manager maintains the registry, provides brief interventions, monitors response and escalates. The consultant provides case review and recommendations and is not the primary provider for most patients. Registry-based management is what separates collaborative care from an ordinary behavioral health referral."),
    callout('s1c1', "Collaborative care is a team workflow around a registry. Without the registry, the weekly review and the scores, it is only a referral with extra steps."),

    h2('s2h1', 'The Four-Dimension Readiness Assessment'),
    blk('s2p1', "Chapter 9 says a practice must assess readiness across four operational dimensions before starting. The first is EHR integration, because the model requires a registry of every patient receiving the service, with current treatment status, validated outcome scores and care manager contact information. Most record systems can produce it if configured properly, and the chapter notes that many Vermont practices have not configured theirs for registry-based management, so registry setup within the existing record is the first implementation step."),
    blk('s2p2', "The other three dimensions are physical space, workflow protocols and billing setup. Space matters because care managers need a place to take calls and to see patients, and because warm handoffs require proximity. Workflow protocols define how patients are identified, who introduces the care manager, how the weekly consultation is scheduled and prepared and how patients who are not improving are flagged. Billing setup matters because the service is paid by the month on documented time, which most practices have no way to track until they add a tool or workflow."),
    steps('s2st1', 'A readiness checklist for a practice', [
        ('Registry', 'Configure the record to list every enrolled patient with status, scores and contact details; test with real patients.'),
        ('Space and equipment', 'Secure space and phones for the care manager and a way to run the weekly consultation.'),
        ('Workflows', 'Write who screens, who refers, who introduces the care manager, how scores are recorded and how non-responders are flagged.'),
        ('Billing and time tracking', 'Decide which codes apply and set up monthly time tracking by the care manager and the billing provider.'),
        ('Roles and training', 'Name the care manager, the consultant and the billing provider; train on the model and on measurement.'),
    ]),

    h2('s3h1', 'Billing in 2026'),
    blk('s3p1', "CMS's January 2026 booklet sets out the coding. CPT code 99492 covers the first 70 minutes in the first calendar month of behavioral health care manager activities in consultation with a psychiatric consultant, directed by the billing provider. Code 99493 covers the first 60 minutes in a subsequent month, and 99494 is an add-on for each additional 30 minutes in a month. The required elements include outreach and engagement, an initial assessment with validated rating scales and an individualized treatment plan, review by the psychiatric consultant, registry entry and tracking and weekly caseload consultation. CMS also describes an alternative HCPCS code, G2214, for the first 30 minutes of care manager time in a month, which is lower than the CPT code's threshold."),
    blk('s3p2', "General behavioral health integration, a simpler service without the psychiatric consultant, is billed with 99484 for at least 20 minutes of clinical staff time a month, or G0323 for at least 20 minutes of clinical psychologist or social worker time. And from January 1, 2026 CMS added three optional add-on codes, G0568 and G0569 for collaborative care and G0570 for general integration, for patients who also receive advanced primary care management. These are not time-based and require that the practice bill one of the advanced primary care management base codes, G0556, G0557 or G0558, in the same month. Some trade summaries describe the new codes as replacing the older ones, and CMS's own booklet does not: it lists both sets. A practice should confirm which codes its payers accept."),
    table('s3t1', 'Behavioral health integration codes, CMS booklet of January 2026', [
        {'Code': '99492', 'Service': 'Initial psychiatric collaborative care', 'Threshold': 'First 70 minutes of care manager activity in the first month'},
        {'Code': '99493', 'Service': 'Subsequent psychiatric collaborative care', 'Threshold': 'First 60 minutes in a subsequent month'},
        {'Code': '99494', 'Service': 'Add-on for additional collaborative care time', 'Threshold': 'Each additional 30 minutes in a month'},
        {'Code': 'G2214', 'Service': 'Initial or subsequent psychiatric collaborative care', 'Threshold': 'First 30 minutes of care manager time in a month'},
        {'Code': '99484 / G0323', 'Service': 'General behavioral health integration', 'Threshold': 'At least 20 minutes of clinical staff time (99484) or clinical psychologist or social worker time (G0323) in a month'},
        {'Code': 'G0568, G0569, G0570', 'Service': 'Optional add-ons for patients also receiving advanced primary care management (from Jan 1, 2026)', 'Threshold': 'Not time-based; require an advanced primary care management base code in the same month'},
    ]),
    warning('s3w1', "Codes and rates change every year", "The 2026 coding differs from earlier years. Check the current CMS booklet and each payer's policy before building a revenue model. This lesson reports codes and thresholds and no payment amounts, which should come from the current fee schedule."),

    h2('s4h1', 'Where Vermont Stands'),
    blk('s4p1', "Chapter 9's matrix gives indicative costs for deploying collaborative care of $80,000 to $150,000 a year per practice, with three to six months to set up and a return crossover at 12 to 18 months, and notes that Blueprint medical homes are the natural deployment sites because they already have the population management and quality reporting infrastructure. These are the book's figures, to be replaced by quotes. The chapter links the model to the Blueprint's Mental Health Integration pilot, whose staffing the previous track described."),
    blk('s4p2', "One observation from the primary source: the Blueprint's 2025 annual report, as extracted for this course, describes the pilot as placing community health workers and mental health and substance use team members in practices, but it does not use the terms collaborative care or CoCM. The pilot and the model are related in purpose and may overlap in practice, but the report does not say that practices are billing the collaborative care codes or running the registry-based workflow. A reader should ask the Blueprint how many practices actually deliver registry-based collaborative care, as distinct from having integrated staff."),
    blk('s4p3', "The question matters because the two are different investments. An integrated staff member who takes warm handoffs improves access. The registry-based model adds systematic follow-up and treatment adjustment, which is where the trial evidence is strongest. A practice should say which it is building and measure accordingly."),

    h2('s5h1', 'Measurement-Based Care and What to Track'),
    blk('s5p1', "Collaborative care succeeds or fails on measurement. At enrollment the care manager records a validated score, usually the PHQ-9 for depression or the GAD-7 for anxiety, and repeats it at regular intervals. A common convention treats a drop of half or more from the baseline as a response and a very low score as remission, and a patient whose score has not improved after several weeks is flagged for the consultant's review. Treatment to target means changing the plan until the patient improves, which is what distinguishes the model from open-ended counseling or medication management."),
    blk('s5p2', "A practice should track a short list of program measures: the number of patients enrolled, the share with a follow-up score in the last period, the share improving by the chosen threshold, the share of non-responders reviewed by the consultant within a set time and the time the care manager spends against the billing thresholds. These measures let the practice see whether the workflow is running, and whether the codes it bills correspond to services it delivers. They also supply the evidence that funders and payers will ask for, as in the political sustainability course."),

    takeaway('tw', [
        "Collaborative care uses a primary care provider, a behavioral health care manager and a psychiatric consultant around a registry; Chapter 9 cites more than 90 randomized trials, a figure this lesson could not verify.",
        "The chapter's four readiness dimensions are EHR registry configuration, physical space, workflow protocols and billing setup.",
        "In CMS's January 2026 booklet, 99492 is the first 70 minutes in the first month, 99493 the first 60 minutes in later months and 99494 each additional 30 minutes.",
        "G2214 covers the first 30 minutes in a month; 99484 and G0323 cover general behavioral health integration at 20 minutes or more.",
        "From January 1, 2026 three optional, non-time-based add-on codes, G0568, G0569 and G0570, apply for patients also receiving advanced primary care management.",
        "The Blueprint's 2025 annual report does not use the terms collaborative care or CoCM; ask how many practices run the registry-based workflow.",
        "Chapter 9's indicative cost is $80,000 to $150,000 a year per practice; replace with quotes and confirm payer coverage.",
    ]),
    quiz('qz',
        "In CMS's January 2026 booklet, what does CPT code 99492 cover?",
        [
            ("Each additional 30 minutes of collaborative care in a month", False),
            ("The first 70 minutes of behavioral health care manager activity in the first calendar month of collaborative care", True),
            ("General behavioral health integration with at least 20 minutes of clinical staff time", False),
            ("Remote physiologic monitoring setup", False),
        ],
        "CMS describes 99492 as initial psychiatric collaborative care covering the first 70 minutes in the first calendar month of care manager activities, in consultation with a psychiatric consultant and directed by the billing provider."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS, Behavioral Health Integration Services, MLN909432 (January 2026) — https://cms.gov/files/document/mln909432-behavioral-health-integration-services.pdf — CoCM and general BHI codes, thresholds and the 2026 add-on codes"),
    blk('src2', "[2] CMS, MLN Matters MM14315, Medicare Physician Fee Schedule final rule summary for CY 2026 — https://www.cms.gov/files/document/mm14315-medicare-physician-fee-schedule-final-rule-summary-cy-2026.pdf — optional APCM add-on codes G0568, G0569 and G0570"),
    blk('src3', "[3] " + BOOK9 + " — §9.3.1 (site readiness), Figure 9.3 (CoCM components) and §9.9 Figure 9.5 (implementation matrix)"),
    blk('src4', "[4] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — mental health integration pilot description"),
]

# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'ctk-consultation-workforce'
L5_TITLE = 'The Psychiatric Consultation Model and the Care Manager Pipeline'
L5 = [
    blk('intro1', "Collaborative care needs two scarce people: a psychiatric consultant and a care manager. Chapter 9 treats the consultant as a workforce multiplier and the care manager as a pipeline problem, since no standard credential trains for the role. This lesson looks at both, applies the chapter's figures with the care that unverified numbers deserve, and then uses the Blueprint's 2025 staffing data to size the realistic pool."),
    blk('intro2', "The chapter's claims about psychiatric workforce shortages and about one consultant supporting 10 to 15 practices are the book's and could not be independently verified here. The staffing numbers from the Blueprint's report are primary."),
    blk('intro3', "The aim is a way to estimate whether a practice or a region can staff the model, not a promise that it can."),

    h2('s1h1', 'The Consultant as a Multiplier'),
    blk('s1p1', "The chapter says Vermont's psychiatric workforce shortage creates a specific problem for collaborative care: where does the psychiatric consultant come from? Its answer is telepsychiatry. A remote consultant can provide the weekly case review the model requires without being present at every primary care site. In the consultation model, it says, one psychiatrist can support 10 to 15 primary care practices at once, monitoring care managers' caseloads through weekly calls, recommending treatment changes without seeing most patients and reserving direct appointments for the highest-acuity cases."),
    blk('s1p2', "The efficiency comes from the structure. A psychiatrist who sees patients directly serves a few dozen new patients a month at most. A consultant who reviews a registry sees many more patients indirectly, because the care manager and the primary care provider do the contact. The cost is that the consultant's advice depends on the quality of the care manager's information, which is why registry data and validated scores are not optional extras."),
    callout('s1c1', "The multiplier works only if the registry is good. A consultant reviewing incomplete data gives incomplete advice to many practices at once."),

    h2('s2h1', 'What the Consultation Needs in Practice'),
    blk('s2p1', "A weekly case review has a rhythm. The care manager prepares a list of new patients, patients who have not improved by a set interval and patients with safety concerns, with scores and a brief summary. The consultant reviews each, recommends a change or confirms the current plan and documents the advice. The primary care provider receives the recommendations and decides whether to act. The time for preparation and documentation counts toward the monthly time thresholds of the billing codes, so the workflow should record it."),
    blk('s2p2', "Capacity can be sketched with one assumption stated openly. If one consultant serves 12 practices, the middle of the book's range, and each practice has one care manager, the consultant meets 12 care managers weekly. If each meeting is 30 minutes, that is about six hours a week, which is well within the capacity of a part-time role. The sketch shows why the model scales, and also what could break it: if the care managers' caseloads grow, meetings lengthen, and the consultant's time becomes the limit. A region should track meeting length and consultant hours as a check on the assumption."),
    table('s2t1', 'A capacity sketch for one telepsychiatry consultant (illustrative, using the book\'s 10-15 practice range)', [
        {'Practices_served': '10', 'Weekly_meeting_per_practice': '30 minutes', 'Consultant_hours_per_week': '5.0'},
        {'Practices_served': '12', 'Weekly_meeting_per_practice': '30 minutes', 'Consultant_hours_per_week': '6.0'},
        {'Practices_served': '15', 'Weekly_meeting_per_practice': '30 minutes', 'Consultant_hours_per_week': '7.5'},
        {'Practices_served': '15', 'Weekly_meeting_per_practice': '60 minutes', 'Consultant_hours_per_week': '15.0'},
    ]),

    h2('s3h1', 'The Care Manager Pipeline'),
    blk('s3p1', "The care manager keeps the registry, makes most patient contacts, monitors response and prepares the consultation. Chapter 9 notes that no standard credential trains for the full role: care managers usually come from social work, nursing, counseling or community health, and the specific skills of registry management, brief evidence-based intervention, measurement and consultation preparation are not covered together in any standard program. Its proposed solution is to convert existing community health team staff with the right clinical background, through targeted training in collaborative care skills, rather than recruit externally."),
    blk('s3p2', "That is a reasonable strategy, and the Blueprint's 2025 report shows what the pool looks like. As of November 15, 2025, the mental health integration pilot funded 62.2 full-time equivalent positions, of which 36.2 were community health workers and 21.6 were team members working in mental health or substance use care. The report also records that team staff providing mental health or substance use care rose from 8.3 FTE in 2023 to 28.1 FTE as of December 2025, and that 1,096 people attended pilot training programs in 2025, including programs in motivational interviewing and community health worker skills in primary care."),
    blk('s3p3', "The chapter reads the 62.2 FTE as showing that the care manager workforce exists. The report's breakdown suggests a more careful reading: the 21.6 FTE of mental health and substance use team members, and perhaps the 28.1 FTE total, are the nearer pool for care manager roles, while the community health workers do related but different work. At 119 attesting practices, 28.1 FTE across the state is about one-quarter of an FTE per practice, which would not cover a care manager in every practice even if every one were converted. The comparison is rough, since staff serve more than one practice and the report does not say how many are trained or available for collaborative care, but it shows why the pipeline is a real constraint."),
    stat_grid('s3sg1', [
        ('62.2', 'FTE funded by the mental health integration pilot', 'Blueprint 2025 Annual Report, Nov 15, 2025'),
        ('36.2', 'of which community health workers', 'Blueprint 2025 Annual Report'),
        ('28.1', 'FTE team staff in mental health or substance use care, Dec 2025', 'Blueprint 2025 Annual Report; was 8.3 in 2023'),
        ('119', 'Practices attesting to pilot year 2 (93% of medical homes)', 'Blueprint 2025 Annual Report'),
    ]),

    h2('s4h1', 'Designing the Role and Protecting the Workforce'),
    blk('s4p1', "Two design choices decide whether the pipeline works. The first is the role definition. A care manager who is also expected to be a general case manager, a navigator and a scheduler cannot run a registry. The role needs a protected caseload, a clear set of tasks, training in measurement-based care and supervision from the consultant. The second is the funding source. The chapter notes that team staff funded by a pilot face a sustainability challenge when pilot funding ends, and that is a real risk for a role built on conversion of pilot-funded positions."),
    blk('s4p2', "Shared roles can help small practices. A care manager may serve several practices in a region, travel or work remotely and bill under each practice's supervising provider where the rules allow. A regional model puts the consultant, the care managers and the training under one structure, and gives small practices access they could not support alone. The cost is coordination, and the billing and supervision rules for shared staff have to be worked out with counsel and payers."),
    steps('s4st1', 'Staffing a collaborative care service', [
        ('Estimate need', 'Count patients likely to be enrolled, set a protected caseload per care manager and compute the FTE required.'),
        ('Identify the pool', 'List current staff with relevant backgrounds by role, not by headcount, and who could convert.'),
        ('Train for the specific skills', 'Registry management, brief interventions, rating scales and consultation preparation.'),
        ('Secure the consultant', 'Contract a telepsychiatry consultant with a defined weekly time and a shared registry view.'),
        ('Fund beyond the pilot', 'Match each role to a recurring revenue source, such as the codes billed or a payer contract.'),
    ]),
    warning('s4w1', "Headcount is not capacity", "A count of staff in behavioral health roles says little about how many are trained, available and protected to do collaborative care. Count the role, the caseload and the funding."),

    h2('s5h1', 'Safety, Scope and Language'),
    blk('s5p1', "A consultation model must say what happens when a patient is at risk. The care manager needs a written protocol for suicidal ideation and other emergencies that does not wait for the weekly meeting: who is called, how quickly, and how the primary care provider and the consultant are told. The consultant's role is advisory and the provider remains responsible for treatment, so the documentation of advice and of the provider's decision matters for clinical clarity and for liability."),
    blk('s5p2', "Language and access need attention. A telepsychiatry consultant who does not share the patient's language works through the care manager and the primary care team, so interpreter use and the care manager's own language skills decide the quality of the contact. Rural patients may have limited broadband or private space for calls, and care managers should plan alternatives such as phone contact or visits at the practice. These are small matters of design that determine whether the model reaches the patients the state's equity goals name."),

    takeaway('tw', [
        "Chapter 9 says telepsychiatry lets one consultant support 10 to 15 practices through weekly case review; the figure is the book's and unverified here.",
        "The multiplier depends on a good registry with validated scores.",
        "A capacity sketch at 30 minutes per practice per week puts 10 to 15 practices at 5 to 7.5 consultant hours a week; longer meetings quickly raise the load.",
        "No standard credential trains for the care manager role; the chapter proposes converting community health team staff with targeted training.",
        "The Blueprint's 2025 report shows 62.2 pilot-funded FTE, of which 36.2 are community health workers, and 28.1 FTE of team staff in mental health or substance use care by December 2025.",
        "At 119 attesting practices, 28.1 FTE statewide is about a quarter of an FTE per practice, a rough comparison that shows the pipeline is a constraint.",
        "Protect the care manager role with a defined caseload, train for the specific skills and match each position to a recurring funding source.",
    ]),
    quiz('qz',
        "Why does the lesson caution against reading the 62.2 FTE as a ready pool of behavioral health care managers?",
        [
            ("Because the number is not reported in any source", False),
            ("Because 36.2 of those FTE are community health workers who do different work, and the mental health and substance use staff number 21.6", True),
            ("Because the Blueprint has no staff in behavioral health", False),
            ("Because collaborative care does not use care managers", False),
        ],
        "The Blueprint's 2025 report breaks the 62.2 FTE into 36.2 FTE of community health workers and 21.6 FTE of mental health or substance use team members, so the nearer pool for care manager roles is smaller than the headline number."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.3.2 (the psychiatric consultation model) and §9.3.3 (the care manager workforce pipeline), Figure 9.3"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — pilot staffing, training and practice attestation"),
    blk('src3', "[3] CMS, Behavioral Health Integration Services, MLN909432 (January 2026) — https://cms.gov/files/document/mln909432-behavioral-health-integration-services.pdf — time thresholds and the consultation requirement"),
    blk('src4', "[4] HTR Political Sustainability course, Lesson 10 — /academy/tracks/political-sustainability-of-reform — the operating-funding test for staff funded by time-limited money"),
]

# ════════════════════════════════════════════════════════════════════════════
L6_SLUG = 'ctk-ccbhc'
L6_TITLE = "Certified Community Behavioral Health Clinics: Vermont's Six and What Certification Requires"
L6 = [
    blk('intro1', "Collaborative care puts behavioral health into primary care. Certified community behavioral health clinics work from the other side: they bring comprehensive mental health, substance use and crisis services, with links to physical health care, into one accountable organization. Chapter 9 treats them as the second layer of the behavioral health system Vermont is building, and says the warm handoff between these clinics and primary care care managers is its operational linchpin."),
    blk('intro2', "This lesson reports where Vermont stands according to news and agency announcements from July and October 2026, what the federal certification criteria require, how the clinics are paid and what a legislator or an operator should ask. Vermont calls its program Certified Community-Based Integrated Health Centers, though press coverage uses both names. The lesson could not read the state's own program page, which refused automated access, so it relies on press accounts of the state's announcements and flags that."),
    blk('intro3', "A recurring theme is that certification is a clinical standard that some organizations may not meet, which is the chapter's warning to the legislature."),

    h2('s1h1', "Vermont's Six"),
    blk('s1p1', "A Vermont Department of Mental Health and Department of Health press release dated July 22, 2026, as published by VermontBiz, says four agencies were officially certified on July 1, 2026: Northeast Kingdom Human Services, serving Caledonia, Essex and Orleans counties; the Howard Center in Chittenden County; Northwestern Counseling and Support Services in Franklin and Grand Isle counties; and Health Care and Rehabilitation Services in Windsor and Windham counties. They join the Clara Martin Center and Rutland Mental Health Services, for a total of six, and the release says 75 percent of Vermonters are now served by one of the clinics. It adds that the full certification process began in December 2024."),
    blk('s1p2', "WCAX reported the certifications on July 24, quoting one of the agencies as saying it should be able to increase the staff needed to meet community needs. In October 2026 WCAX reported that Washington County Mental Health Services in Montpelier had received a new federal designation as a clinic, following cuts to inpatient psychiatric capacity, and that the Department of Mental Health said these clinics now cover nearly 80 percent of the state. The agency had posted 40 job openings for the expansion. The article quotes the requirement that the clinics provide 24-hour crisis access and cannot keep waiting lists or turn people away because they lack insurance."),
    blk('s1p3', "These accounts differ in small ways, which is worth noting: 75 percent in July and nearly 80 percent in October, and two names for the program. The dates are consistent with Chapter 9's matrix, which gives 18 to 36 months to value for certification and says Vermont had six certified clinics with four added July 1, 2026, a figure the press accounts confirm. The chapter's matrix also says Vermont's program benefits from an enhanced federal match for the demonstration, and a national summary says participating states receive an enhanced match set at their children's health insurance enhanced rate, applying only to services for people enrolled in Medicaid. The lesson did not verify Vermont's specific match."),
    table('s1t1', "Vermont's six certified clinics (press accounts, July 2026)", [
        {'Agency': 'Clara Martin Center', 'Certified': 'Before July 2026 (one source dates full certification to July 1, 2025)', 'Area': 'Not stated in the accounts read'},
        {'Agency': 'Rutland Mental Health Services', 'Certified': 'Before July 2026 (same source)', 'Area': 'Rutland County'},
        {'Agency': 'Northeast Kingdom Human Services', 'Certified': 'July 1, 2026', 'Area': 'Caledonia, Essex, Orleans'},
        {'Agency': 'Howard Center', 'Certified': 'July 1, 2026', 'Area': 'Chittenden'},
        {'Agency': 'Northwestern Counseling and Support Services', 'Certified': 'July 1, 2026', 'Area': 'Franklin, Grand Isle'},
        {'Agency': 'Health Care and Rehabilitation Services', 'Certified': 'July 1, 2026', 'Area': 'Windsor, Windham'},
    ]),

    h2('s2h1', 'What Federal Certification Requires'),
    blk('s2p1', "The federal framework comes from SAMHSA's certification criteria, last updated in 2023 and reflected on the agency's page in January 2026. The criteria are organized into program areas, and the scope of services covers nine required services, among them crisis behavioral health services, outpatient mental health and substance use services, psychiatric rehabilitation and screening, diagnosis and risk assessment, with the others covering areas such as primary care screening and monitoring and care coordination. Because the sources read for this lesson listed only some of the nine by name, the reader should consult the criteria for the full list. A clinic may deliver a required service directly or through a designated collaborating organization, and it remains responsible for ensuring access either way."),
    blk('s2p2', "Chapter 9 says certification requires specific staffing ratios, service requirements and quality measurement, and warns that it is not a check-box exercise but a clinical quality standard that some currently operating behavioral health organizations may not meet. Its matrix gives $500,000 to $2 million a year per entity, 18 to 36 months to value and 24 to 48 months to a return crossover. These are the book's indicative ranges. The pattern of a certification process beginning in December 2024 and ending with certification in July 2026 is consistent with the lower end of that timeline."),
    callout('s2c1', "Certification is a standard to be met, not a designation to be requested. The legislature's budget has to fund the transformation work as well as the operations."),

    h2('s3h1', 'The Warm Handoff With Primary Care'),
    blk('s3p1', "The chapter calls the warm handoff between clinic case managers and primary care care managers the operational linchpin of the continuum. A warm handoff is a direct, synchronous transfer of responsibility between two clinicians or coordinators, not a referral letter. For a patient with a serious mental illness and a chronic physical condition, the handoff decides whether the two systems act as one."),
    blk('s3p2', "The practical design questions are who initiates the handoff, how the receiving team confirms it, what information travels with the patient and how the patient's status is tracked after the transfer. Without data exchange between the clinic and the practice, a handoff depends on phone calls and good will. The interoperability and identity work of the previous course supplies the underlying infrastructure, and the quality measure on follow-up after a mental health emergency visit supplies a test of whether the handoff is working."),

    h2('s4h1', 'Questions for Operators and Legislators'),
    steps('s4st1', 'Questions to ask about a certified clinic expansion', [
        ('What does the clinic deliver directly, and through whom otherwise?', 'List each required service, who provides it and how access is guaranteed.'),
        ('What staff does it need and can it hire them?', 'Compare staffing requirements with current workforce; note job postings and vacancies.'),
        ('How is it paid and for which patients?', 'Understand the payment model and the enhanced match, and which services and enrollees it covers.'),
        ('How will the handoff with primary care work?', 'Define the process, the data exchange and the follow-up measure.'),
        ('What happens to inpatient and crisis capacity?', 'The October report says the clinics do not replace inpatient care; confirm the plan for beds.'),
    ]),
    blk('s4p1', "The October account of Washington County is a reminder that the clinics are filling gaps created by other changes: it reports the state cut four inpatient beds at the Vermont Psychiatric Hospital and that a hospital closed its inpatient unit in January 2025, and says the clinic program does not replace inpatient care. A system that expands community services while losing inpatient capacity needs a plan for the patients who need hospital-level care, and an honest account of what the new clinics can and cannot absorb."),
    warning('s4w1', "Coverage figures describe where clinics exist, not who gets care", "A statement that a clinic serves 75 or 80 percent of Vermonters describes the area covered. Ask for the number of people served, wait times and outcomes."),

    h2('s5h1', 'Financial and Operational Risks'),
    blk('s5p1', "Three risks deserve attention. The first is workforce: the clinics must hire clinicians, peers, crisis staff and care coordinators in a market with shortages, and the October account of 40 openings at a single agency shows the scale. Without staff the certification is a promise. The second is financing. The enhanced match applies to services for Medicaid enrollees, so coverage losses from federal changes to Medicaid eligibility, which the CMMI course covered, reduce the population for whom the enhanced payment flows. A national analysis from Georgetown's Center for Children and Families, published in June 2026, carries a headline warning that H.R. 1 puts the demonstration's success at risk; this lesson read only the headline and flags it for follow-up."),
    blk('s5p2', "The third risk is integration. A clinic can meet every criterion and still not coordinate with the primary care practices, hospitals and community services around it. Measuring the handoff, the follow-up after emergency visits and the share of clients who also have a primary care visit, shows whether the integration is real. The state's report on the clinics' first year of full operation, whenever it appears, should include such measures, and legislators and operators should ask for them."),

    takeaway('tw', [
        "Four agencies were certified on July 1, 2026, Northeast Kingdom Human Services, the Howard Center, Northwestern Counseling and Support Services and Health Care and Rehabilitation Services, joining Clara Martin Center and Rutland Mental Health Services for six, according to a state press release as published by VermontBiz.",
        "The state said 75 percent of Vermonters are served in July and the Department of Mental Health said nearly 80 percent in October after Washington County Mental Health Services received a new designation.",
        "Press reports describe requirements of 24-hour crisis access, no waiting lists and no turning people away for lack of insurance.",
        "SAMHSA's 2023 criteria require nine services, directly or through designated collaborating organizations, with the clinic remaining responsible.",
        "Chapter 9's matrix gives $500,000 to $2 million a year per entity and 18 to 36 months to value; the process in Vermont began in December 2024 and ended in July 2026.",
        "The warm handoff between clinics and primary care is the operational linchpin; design it with a named initiator, confirmation, shared data and a follow-up measure.",
        "Coverage percentages describe geography, not people served; ask for served counts, wait times and outcomes.",
    ]),
    quiz('qz',
        "How many certified community behavioral health clinics, which Vermont calls Certified Community-Based Integrated Health Centers, did the state's July 2026 announcement report?",
        [
            ("Two", False),
            ("Six, after four agencies were certified on July 1, 2026", True),
            ("Twelve", False),
            ("None, because the program ended", False),
        ],
        "The July 22, 2026 press release says four agencies were officially certified on July 1, 2026 and join the Clara Martin Center and Rutland Mental Health Services, for six clinics in Vermont."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] VermontBiz, Four more agencies to become a Certified Community-Based Integrated Health Center in Vermont (state press release of July 22, 2026) — https://vermontbiz.com/node/244256"),
    blk('src2', "[2] WCAX, Four Vermont health centers receive federal certification to expand mental health, substance use services (July 24, 2026) — https://www.wcax.com/2026/07/24/four-vermont-health-centers-receive-federal-certification-expand-mental-health-substance-use-services/ ; WCAX, New federal designation expands community-based mental health care in Central Vermont (October 12, 2026) — https://www.wcax.com/2026/10/12/new-federal-designation-expands-community-based-mental-health-care-central-vermont/"),
    blk('src3', "[3] SAMHSA, Certified Community Behavioral Health Clinic criteria (2023) — https://www.samhsa.gov/communities/certified-community-behavioral-health-clinics/ccbhc-certification-criteria ; CCBHC FAQs — https://www.samhsa.gov/communities/certified-community-behavioral-health-clinics/ccbhc-faqs"),
    blk('src4', "[4] " + BOOK9 + " — §9.9 Figure 9.5 and §9.11 (Implications for You): CCBHC certification and the legislature; Georgetown CCF, Ten new states join the CCBHC Medicaid demonstration — https://ccf.georgetown.edu/2026/06/29/ten-new-states-join-the-ccbhc-medicaid-demonstration-h-r-1-puts-its-success-at-risk/ (national summary of the enhanced match)"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5), (L6_SLUG, L6_TITLE, L6, 6)]
if __name__ == '__main__':
    run(LESSONS)
