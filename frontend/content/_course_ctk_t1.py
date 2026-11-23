exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_ctk_common.py').read())

# Course: Clinical Transformation Toolkit (Chapter 9 companion). Track 1 — Primary Care Transformation.
# Verified 2026-11-23: Vermont Blueprint for Health 2025 Annual Report (read from the PDF: 126 recognized practices; 201 CHT staff;
# MHI pilot 62.2 FTE as of Nov 15 2025 = 36.2 CHW + 21.6 mental health/SUD team members; 119 practices (93% of PCMHs) attested
# for pilot year 2; QI Facilitators line $1,120,000; CHT mental health/SUD FTE 8.3 in 2023 -> 28.1 Dec 2025; Medicare funding gap);
# NCQA PCMH 2026 standards and 2027 proposed updates (via NCQA pages surfaced by search; final 2027 text not confirmed);
# Altschuler et al., Ann Fam Med 2012;10(5):396-400 (modeled panels of 1,947/1,523/1,387 under three delegation assumptions;
# baseline 2,500-patient panel needing 21.7 hours a day; via PMC/Annals summary); AHRQ MEPS statistical briefs (top 5% of the
# population: 48.3% of expenditures in 2018, 50.4% in 2014). Book figures (6-9 month renewal prep; $25K-$75K per practice; 5.8:1
# ROI; $180,000 illustration) are labelled the book's.

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'ctk-pcmh-recognition'
L1_TITLE = 'Patient-Centered Medical Home Recognition: What It Actually Requires'
L1 = [
    blk('intro1', "Chapter 9 of Transforming Healthcare turns from the architecture of Vermont's clinical pillar to its practice: how a primary care office, a hospital or a network actually builds the programs that produce results under value-based payment. Its starting point is the patient-centered medical home. National Committee for Quality Assurance recognition is the organizational prerequisite for participation in Vermont's Blueprint for Health and for its enhanced primary care payments, and the chapter says that for a practice new to recognition the process is operationally intensive."),
    blk('intro2', "This lesson explains what recognition requires in each of NCQA's six concept areas, what changed in the 2026 standards, what is proposed for 2027 and where Vermont's small rural practices find the requirements hardest. It uses the chapter's account of those challenges and the Blueprint's 2025 annual report for what the state's program looks like now."),
    blk('intro3', "The aim is a practical reading of recognition: not a certificate to display, but a set of operating capabilities to build and keep."),

    h2('s1h1', 'Why Recognition Matters in Vermont'),
    blk('s1p1', "The Blueprint's 2025 annual report records that 126 practices achieved or sustained recognition as patient-centered medical homes in 2025, within a program Vermont has run since 2008. Recognition is how the state decides which practices receive enhanced payments and community health team support, and it is the base on which other programs, such as the mental health integration pilot and the primary care components of future payment models, are built. In the chapter's words, understanding what recognition requires operationally is the starting point for any primary care practice or health system leader managing this transition."),
    blk('s1p2', "The chapter adds a practical note about timing: even recognized Vermont practices typically begin preparing six to nine months before each annual renewal. That figure is the book's, not a requirement of the standards, but it reflects the reality that recognition is a continuing process of reporting and improvement and not a one-time award. A practice that treats renewal as a weekend project will find it is not."),
    callout('s1c1', "Recognition is evidence that a practice has built certain systems. If the systems are not working day to day, the paperwork does not rescue the renewal and does not help patients."),

    h2('s2h1', 'The Six Concept Areas'),
    blk('s2p1', "Chapter 9 organizes the requirements into six concept areas that together define a transformed primary care practice, following NCQA's 2023 standards, which practices are updating to the 2026 requirements. The first, team-based care and practice organization, asks for defined roles, written policies, staff training and patient involvement in care planning. The second, knowing and managing your patients, asks for comprehensive data collection, a registry for population management, proactive outreach for preventive and chronic care and stratification by risk. The third, patient-centered access and continuity, asks for same-day appointments for urgent needs, round-the-clock advice access, continuity with a personal clinician and timely responses to messages."),
    blk('s2p2', "The fourth, care management and support, asks for systematic identification of patients for care management, care plans for high-risk patients, screening for social needs with connection to resources and coordination across providers and settings. The fifth, care coordination and care transitions, asks for timely follow-up after discharge, medication reconciliation, coordination with specialists and behavioral health and referral tracking that closes the loop. The sixth, performance measurement and quality improvement, asks for systematic data collection on quality measures, regular improvement activity, use of patient experience data and reporting on quality and utilization."),
    table('s2t1', 'The six concept areas and Vermont implementation challenges (HTR Figure 9.1, summarized)', [
        {'Concept_area': 'Team-based care and practice organization', 'Operational_requirement': 'Defined roles, written policies, training, patient engagement in care planning', 'Vermont_challenge_per_book': 'Small rural teams where the clinician does work that should be delegated; needs workflow redesign, not just policy'},
        {'Concept_area': 'Knowing and managing your patients', 'Operational_requirement': 'Data collection, registry-based outreach, risk stratification', 'Vermont_challenge_per_book': 'Registry outreach needs data infrastructure small practices lack; field staff and the state exchange help'},
        {'Concept_area': 'Patient-centered access and continuity', 'Operational_requirement': 'Same-day urgent access, 24/7 advice, continuity, timely responses', 'Vermont_challenge_per_book': 'After-hours access is hardest for small rural practices; shared advice lines are one answer'},
        {'Concept_area': 'Care management and support', 'Operational_requirement': 'Identify patients, care plans, social needs screening, coordination', 'Vermont_challenge_per_book': 'Community health team staff supply much of this function'},
        {'Concept_area': 'Care coordination and transitions', 'Operational_requirement': 'Post-discharge follow-up, medication reconciliation, referral tracking', 'Vermont_challenge_per_book': 'Low behavioral health follow-up after emergency visits is a coordination failure'},
        {'Concept_area': 'Performance measurement and improvement', 'Operational_requirement': 'Quality data, improvement cycles, patient experience, reporting', 'Vermont_challenge_per_book': 'Needs data capacity; Blueprint measure support and the state analytics vendor help'},
    ]),

    h2('s3h1', 'Where Small Rural Practices Struggle'),
    blk('s3p1', "The chapter identifies the pressure points. Team-based care is hard when the team is two or three people and the physician or advanced practice nurse is also the person who rooms patients and refills prescriptions: defining roles on paper does not move tasks off the clinician without redesigning the day. Registry-based outreach requires structured data, which Lesson 10 returns to, and software configured to produce lists. After-hours access is the most operationally challenging requirement for a small practice that cannot staff a night line, and the chapter's answer is a shared service, an after-hours telephone advice line used by several practices."),
    blk('s3p2', "Care management is where the Vermont model differs from many states. Community health teams, funded by commercial and public payers through the Blueprint, provide much of the care management function, so a practice need not hire all its care managers if it is connected to a team. That is a concrete advantage, and it is also a dependency: the Blueprint's 2025 report records that Medicare's contribution to practice and team payments stopped when the all-payer model agreement ended in December 2025, and that the legislature appropriated more than $5 million, about a quarter of annual funding, to cover 2026. A practice that relies on community health team capacity should know whether that capacity is secure."),

    h2('s4h1', 'The 2026 Standards and the 2027 Proposals'),
    blk('s4p1', "NCQA updates the program regularly. Its pages say the changes for 2025 reporting appear in the published 2026 Standards and Guidelines. Its refresh slides list eight criteria removed because they no longer add value, among them external collaborations, medical home information, patient materials and a controlled substance review criterion, and changes such as setting annual medication review as a frequency threshold. For evaluations beginning in 2027, NCQA released proposed updates in early 2026 with a comment period that closed on April 17, 2026. One proposal asks whether a care management criterion should change from patients 'identified for' care management to patients 'engaged in' it, and another would reduce the number of evidence categories for pediatric-specific sites. This lesson could not confirm which proposals were finalized."),
    blk('s4p2', "The point for a practice is to track NCQA's current requirements directly, not rely on a book or a course, and to ask its Blueprint field staff which changes matter for the next renewal. A change from identified to engaged, if adopted, would convert a list-building exercise into an outcome requirement and would raise the importance of care management capacity."),
    warning('s4w1', "Standards change every year", "The chapter describes the 2023 standards and the 2026 update. Confirm the standards that apply to your next recognition date on NCQA's site before building a plan."),

    h2('s5h1', 'Cost, Time and What It Buys'),
    blk('s5p1', "Chapter 9's implementation matrix gives indicative figures for Blueprint PCMH transformation: $25,000 to $75,000 per practice, 12 to 18 months to value and 18 to 24 months to a return crossover, with a reported benchmark of 5.8 to 1 return documented for the Blueprint on 2008 to 2013 data. The cost range is the book's indicative figure. The return figure is the one the finance course examined: the Blueprint's own 2025 report describes its risk-adjusted comparison as evidence of lower relative cost but not as an exact dollar saving, and says it cannot predict what would happen if members used other practices. A practice should use the return figure as context and not as a promise."),
    blk('s5p2', "For a practice weighing recognition, a more useful calculation is local. What would enhanced payments and team support be worth to us, what would the work cost in staff time and what capabilities would we build that serve our patients under any payment model? The last is the question the political sustainability course called structural irreversibility, and recognition is one of the chapter's examples of an investment that holds value across scenarios."),
    steps('s5st1', 'A practical path to recognition or renewal', [
        ('Choose the standards year and map your gaps', 'Use the current NCQA guidelines; ask field staff for a readiness review.'),
        ('Assign an owner per concept area', 'One named person for each of the six areas, with a monthly check-in.'),
        ('Fix workflows before documents', 'Redesign roles, outreach and access first; write policies that describe what is actually done.'),
        ('Build the registry and measures', 'Structured data capture and a working population list before the reporting period.'),
        ('Start six to nine months ahead', 'Treat renewal as a standing process, not a project.'),
    ]),

    takeaway('tw', [
        "NCQA recognition is the prerequisite for Vermont Blueprint participation and enhanced primary care payments; 126 practices achieved or sustained recognition in 2025, according to the Blueprint's annual report.",
        "The six concept areas are team-based care, knowing and managing patients, access and continuity, care management and support, care coordination and transitions, and performance measurement and improvement.",
        "Small rural practices struggle most with delegation in tiny teams, registry-based outreach without data infrastructure and after-hours access; shared services and community health teams are the answers.",
        "Community health team capacity depends on funding that changed in 2026: Medicare's contribution stopped when the all-payer model agreement ended and the legislature covered more than $5 million for the year.",
        "NCQA's 2026 standards removed eight criteria; proposals for 2027 went to comment through April 17, 2026 and their final form was not confirmed here.",
        "The book's indicative cost is $25,000 to $75,000 per practice and its Blueprint return figure is context, not a promise; the program's own report says its comparison is not an exact saving.",
        "Start renewal preparation six to nine months ahead, fix workflows before writing policies and track NCQA's current standards.",
    ]),
    quiz('qz',
        "Which concept area does Chapter 9 say is the most operationally challenging for small rural Vermont practices to meet?",
        [
            ("Performance measurement", False),
            ("Patient-centered access and continuity, especially after-hours access", True),
            ("Team-based care in large hospitals", False),
            ("Care coordination with out-of-state hospitals", False),
        ],
        "The chapter says after-hours access is the most operationally challenging requirement for small rural practices, and suggests shared after-hours telephone advice lines as a shared-service solution."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.2.1 and Figure 9.1: NCQA PCMH recognition, six concept areas and Vermont challenges; §9.9 Figure 9.5: implementation matrix"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report (January 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — recognized practices, community health team staffing, Medicare participation change"),
    blk('src3', "[3] NCQA, Patient-Centered Medical Home (PCMH) program page and What's New with PCMH 2026 — https://www.ncqa.org/pcmh/ ; https://www.ncqa.org/blog/whats-new-with-pcmh-2026 ; 2027 PCMH Recognition Updates Overview Memo — https://wpcdn.ncqa.org/www-prod/wp-content/uploads/2027-PCMH-Recognition-Updates_Overview-Memo.pdf — as surfaced by search; check current status"),
    blk('src4', "[4] HTR book Chapter 7 §7.8 and the finance course's lesson on Blueprint evidence — https://healthtransformationreview.org/read/chapter-7"),
]

# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'ctk-blueprint-field-staff'
L2_TITLE = "The Blueprint's Support Infrastructure: Field Staff, Community Health Teams and the Mental Health Pilot"
L2 = [
    blk('intro1', "Most states that want primary care transformation distribute toolkits and hope practices implement them. Chapter 9 argues that Vermont's Blueprint has done something different and underappreciated: it pays people whose full-time job is to help practices transform. This lesson looks at that support infrastructure, using the Blueprint's own 2025 annual report for what is funded and what has grown, and at the chapter's argument that protecting it is the condition for everything else."),
    blk('intro2', "It also corrects a detail. The chapter describes the staff hired through the Mental Health Integration pilot as the natural pool for behavioral health care managers. The annual report's breakdown is more specific, and the lesson sets out what it shows."),
    blk('intro3', "The practical question for any organization is what support a transforming practice actually needs, and who pays for it when the payment model changes."),

    h2('s1h1', 'What Field Staff Do'),
    blk('s1p1', "The chapter says each of Vermont's 13 Hospital Service Areas has at least one Blueprint field staff member, typically a quality improvement facilitator, who supports participating practices. It lists four functions. Practice readiness assessment identifies gaps in workflow, data infrastructure and team structure before a formal recognition submission. Data coaching helps practices interpret their quality measure reports, care gap analyses and claims-based population reports and turn them into specific changes. Workflow redesign support runs redesign sessions inside practices to find where current workflows block outreach and coordination. And payment transition support helps practices absorb changes in the funding they receive."),
    blk('s1p2', "The Blueprint's 2025 report shows the scale. Its annual budget table lists quality improvement facilitators at $1,120,000 a year, funded through Medicaid and described as in-practice coaching for NCQA recognition, accountable care organization priorities and practice priorities, delivered through grants to a local hospital or health center or by contract. The report also describes how, at the request of the Agency of Human Services in 2025, the Blueprint used its network of program managers and facilitators to organize regional meetings that brought together hospitals, the Agency and community partners, which shows the field network doubling as a community convening structure."),
    callout('s1c1', "Support staff are not overhead. In the chapter's argument they are the mechanism that turns a standard into changed workflows in small practices."),

    h2('s2h1', 'Community Health Teams'),
    blk('s2p1', "Community health teams are the other half of the infrastructure. The 2025 report describes them as funded by commercial and public payers and as providing services to patients that are not generally covered by insurance, including care coordination, brief mental health interventions, connection to other services and other help free of charge and regardless of insurance status. It records 201 staff, equal to 115.76 full-time equivalents, working as team members: nurses, social workers, mental health counselors, health educators, dietitians, community health workers, panel managers and others."),
    blk('s2p2', "For a practice, a team is a way to obtain care management capacity without hiring it. The chapter's concept-area table notes that team staff provide much of the care management function in Vermont's model, so the practice does not need to hire all care management staff itself if the connection to a team is established. That also means a practice's capability partly depends on a resource the practice does not control, which is why the funding questions covered in the finance and political sustainability courses matter to clinical operations."),

    h2('s3h1', 'The Mental Health Integration Pilot, as Reported'),
    blk('s3p1', "In 2023 the Blueprint added a Mental Health Integration into Primary Care pilot to address mental health, substance use disorder and social needs within primary care. The 2025 report states that as of November 15, 2025, 119 practices, 93 percent of the state's medical homes, had attested to participate in the pilot's second year. It records 62.2 full-time equivalent staff positions providing care through the pilot's funding, of which 36.2 are community health workers and 21.6 are team members working in mental health or substance use care, with every service area having hired staff. It also reports that the number of active team staff providing mental health or substance use care, counting those paid through the pilot or otherwise, more than tripled, from 8.3 FTE in 2023 to 28.1 FTE as of December 2025."),
    blk('s3p2', "The detail matters because Chapter 9 describes the 62.2 pilot-funded positions as suggesting that the behavioral health care manager workforce exists and needs formalization and training. The report shows that more than half of those positions are community health workers, who do different work from a behavioral health care manager in the collaborative care model, and that the mental health and substance use team members number 21.6 FTE in the pilot and 28.1 FTE in total. The potential pool for care manager roles is therefore smaller than the headline number suggests, and Lesson 5 returns to that."),
    table('s3t1', 'Blueprint mental health integration pilot staffing, as reported (2025 annual report)', [
        {'Measure': 'Practices attesting to pilot year 2', 'Value': '119 (93% of medical homes)'},
        {'Measure': 'Pilot-funded FTE, as of Nov 15, 2025', 'Value': '62.2'},
        {'Measure': 'of which community health workers', 'Value': '36.2 FTE'},
        {'Measure': 'of which mental health or substance use team members', 'Value': '21.6 FTE'},
        {'Measure': 'Team FTE providing mental health or substance use care, all funding', 'Value': '8.3 in 2023 to 28.1 as of Dec 2025'},
        {'Measure': 'People attending MHI training programs in 2025', 'Value': '1,096'},
    ]),

    h2('s4h1', 'Protecting the Infrastructure Through a Payment Transition'),
    blk('s4p1', "Chapter 9 warns that if field staff capacity is reduced during a payment model transition, the support infrastructure collapses and practices revert to old patterns. Its text says Medicare's Blueprint payments ended with the all-payer model and that state funds offset them in 2026, with no federal replacement since Vermont withdrew from AHEAD. The Blueprint's own report puts the 2026 gap at more than $5 million appropriated by the legislature, about one quarter of annual funding for practices and community health teams, and warns that loss of the funding could significantly reduce team staff."),
    blk('s4p2', "The field staff line is separate and Medicaid-funded, so the sources read do not show whether it is directly exposed. The general point holds, though: support roles are often the first cut in a financing squeeze because their effect is indirect, and they are the roles whose loss is hardest to see until practices begin to fail renewals or revert to old workflows. The Blueprint's strategic plan, delivered to the Agency in December 2025 with implementation beginning in 2026, is where a statement of how the support infrastructure will be funded should appear."),
    steps('s4st1', 'What a transforming practice should ask about support', [
        ('Who is our field contact and what do they do?', 'Name, role, how often they visit and what they offered in the last year.'),
        ('Which team supports us and at what capacity?', 'Team staff assigned, panel covered, referral turnaround.'),
        ('How is each source funded and until when?', 'Medicaid, commercial, Medicare backfill, grants.'),
        ('What would we do if a source ended?', 'A one-page contingency: which functions move in-house, which stop.'),
    ]),
    warning('s4w1', "Do not plan on the headline number", "A staffing figure that counts several kinds of roles together can overstate the capacity for one of them. Ask for the breakdown by role before building a workflow on a pool of staff."),

    h2('s5h1', 'A Support Model Other States Could Borrow, and the Evidence Gap'),
    blk('s5p1', "The chapter presents the field staff model as a competitive advantage that most states lack, and the design is simple enough to copy. Place dedicated staff in each region whose job is to help practices change how they work, not to audit them. Give them a standard set of services: readiness reviews, data coaching and workflow redesign. Fund them through the payers that benefit, so the cost is shared. And connect them to a team that provides care management so practices can act on what they learn."),
    blk('s5p2', "An honest reading adds a caution. The sources read for this course describe what the support staff do and what they cost, but none isolated how much of Vermont's practice performance they explain. The Blueprint's own report is careful on this point in a related area, saying that its risk-adjusted cost comparison does not give an exact saving and cannot predict what would happen under other arrangements. A state or network copying the model should therefore build its own evaluation from the start: define the measures, collect a baseline and compare supported with unsupported practices where it can."),

    takeaway('tw', [
        "Chapter 9 says Blueprint field staff, typically quality improvement facilitators, provide readiness assessment, data coaching, workflow redesign support and payment transition support in each service area.",
        "The Blueprint's 2025 budget table lists quality improvement facilitators at $1,120,000 a year, funded through Medicaid.",
        "Community health teams, funded by commercial and public payers, had 201 staff equal to 115.76 FTE and provide care coordination and brief mental health interventions free of charge.",
        "As of November 15, 2025, 119 practices, 93 percent of medical homes, attested for the mental health integration pilot's second year; it funds 62.2 FTE, of which 36.2 are community health workers and 21.6 mental health or substance use team members.",
        "Team staff providing mental health or substance use care rose from 8.3 FTE in 2023 to 28.1 FTE in December 2025.",
        "The chapter's reading of the 62.2 FTE as a care manager pool overstates it; most of the pilot-funded roles are community health workers.",
        "Ask each support source how it is funded and what happens if it ends; support roles are easy to cut and hard to rebuild.",
    ]),
    quiz('qz',
        "According to the Blueprint's 2025 annual report, what makes up most of the 62.2 FTE funded through the mental health integration pilot?",
        [
            ("Psychiatrists", False),
            ("Community health workers, at 36.2 FTE", True),
            ("Behavioral health care managers only", False),
            ("Billing staff", False),
        ],
        "The report records 62.2 FTE as of November 15, 2025, including 36.2 FTE of community health workers and 21.6 FTE of team members working in mental health or substance use care."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.2.2: the Blueprint field staff model; §9.3.3: the behavioral health care manager workforce pipeline"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report (January 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — budget table, community health team data, mental health integration pilot staffing, Medicare change, strategic plan"),
    blk('src3', "[3] " + BOOK9 + " — §9.8 and Figure 9.4: implementation commitments including Blueprint field staff capacity"),
    blk('src4', "[4] HTR Political Sustainability course, Lesson 10 (structural irreversibility and the stranded-asset test) — /academy/tracks/political-sustainability-of-reform"),
]

# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'ctk-panel-stratification'
L3_TITLE = 'The Practice Panel: Right-Sizing, Risk Tiers and Where the Money Is'
L3 = [
    blk('intro1', "Every population health program starts with a list: who is on the panel, and what do they need? Chapter 9 calls panel management the foundation of everything else in practice transformation. It makes two linked claims. A care team can safely carry a larger panel than most practices assume if tasks are properly delegated, and the panel is best managed by sorting patients into risk tiers so that scarce staff time goes where it can do most good."),
    blk('intro2', "This lesson examines both, with the evidence behind the panel-size figure, the national data on how concentrated health spending is, the chapter's four-tier framework and its worked example of the value of preventing one admission a month. It also adds two cautions the chapter does not make: the panel-size figure is a modeling result, and stratification can fail certain patients."),
    blk('intro3', "The platform's Risk Stratification Engine lets a practice run its own panel against such tiers, and the lesson closes with how to use it."),

    h2('s1h1', 'How Big Can a Panel Be?'),
    blk('s1p1', "Chapter 9 states that under team-based care with full delegation of non-physician tasks, a primary care physician with appropriate support can manage a panel of roughly 1,400 to 1,900 patients, depending on how much preventive and chronic care is delegated, citing Altschuler and colleagues in 2012. It links the figure to Oliver Wyman's finding that Vermont's primary care supply problem is largely a productivity and care model problem and not a physician shortage, since practices that adopt team-based models can expand effective capacity without adding physicians."),
    blk('s1p2', "The source is a modeling study published in the Annals of Family Medicine in 2012. Starting from a baseline panel of 2,500 patients, the authors estimated that a physician would need 21.7 hours a day to deliver all recommended acute, chronic and preventive care, and then modeled the effect of delegating shares of preventive and chronic care to non-physician team members. Under three delegation assumptions, from 77 percent of preventive and 47 percent of chronic care delegated down to 50 percent and 25 percent, the estimated reasonable panel for a team was 1,947, 1,523 or 1,387 patients. The chapter's range rounds those results. The study estimates what would be possible, not what practices achieve, and it depends on delegating work that many practices are not yet organized to delegate."),
    callout('s1c1', "The panel-size range is a modeled capacity under assumed delegation. Whether a given practice can reach it depends on whether it has actually changed who does what."),

    h2('s2h1', 'Why Stratify: Concentrated Spending'),
    blk('s2p1', "The financial logic for tiering is that spending is concentrated. The chapter says the costliest 5 percent of people account for about half of all health spending nationally, citing the federal Medical Expenditure Panel Survey. The Agency for Healthcare Research and Quality's statistical briefs report the same pattern across years: the top 5 percent of the population accounted for 50.4 percent of total expenditures in the 2014 data and 48.3 percent in the 2018 data, with an annual mean expenditure of $58,609 for that group in 2018. A 2025 brief using 2022 data reports that the top 1 percent alone accounted for 21.7 percent of spending."),
    blk('s2p2', "Concentration does not mean the same people stay in the top group year after year, and many of the highest spenders in a given year are patients with an acute event rather than persistent complexity. That is one reason stratification tools combine risk scores with clinical judgment and re-score patients regularly. It does mean that a practice cannot treat every patient with the same intensity, and that a small number of patients carry large potential for avoidable events."),

    h2('s3h1', 'The Four Tiers'),
    table('s3t1', 'Panel risk stratification framework (HTR Figure 9.2)', [
        {'Tier': 'Tier 1: Complex', 'Share_of_panel': '3-5%', 'Characteristics': 'Multiple chronic conditions, high prior use, behavioral health and social needs, frailty', 'Care_model': 'Intensive care management: team assignment, care plan, regular outreach, a direct care manager relationship'},
        {'Tier': 'Tier 2: Moderate risk', 'Share_of_panel': '15-20%', 'Characteristics': 'One or two chronic conditions that are hard to manage, behavioral health needs, recent hospital or ED use', 'Care_model': 'Proactive chronic disease management: care gap outreach, behavioral health integration, medication management'},
        {'Tier': 'Tier 3: Standard', 'Share_of_panel': '50-60%', 'Characteristics': 'Healthy or stable chronic conditions, routine preventive needs', 'Care_model': 'Preventive care: wellness visits, immunizations, screening, coaching'},
        {'Tier': 'Tier 4: Inactive', 'Share_of_panel': '20-30%', 'Characteristics': 'Attributed but not engaged; may use care elsewhere or none', 'Care_model': 'Outreach and re-engagement: contact campaigns, open access scheduling, community health worker outreach'},
    ]),
    blk('s3p1', "The framework's strength is proportion: staff intensity matches risk. Its tier shares are the chapter's starting reference for Vermont and are, as its Beyond Vermont box says, calibrated to Vermont's payer mix and rural geography; a practice in a denser market or with a different payer mix should expect different panel sizes and ratios. The framework transfers: stratify, match intensity to tier and build the workflow around the highest-risk patients first."),
    blk('s3p2', "Tier 4 deserves attention because it is where quality measures hide. A panel that includes many attributed but unengaged patients can show good rates among those seen while leaving a large group with no care. Re-engagement is a separate task from chronic disease management, often best done by community health workers who can reach people where they are."),

    h2('s4h1', 'The Chapter\'s Worked Example, With Care'),
    blk('s4p1', "The chapter illustrates the value of Tier 1 management: a care management program that prevents one hospitalization a month among Tier 1 patients in a 2,000-patient panel generates about $180,000 a year in avoided cost at roughly $15,000 per admission, and so would fund the entire stratification and care management program costed in its matrix several times over. The arithmetic is simple, twelve admissions at $15,000. The assumptions are the book's illustrations."),
    blk('s4p2', "The finance course showed why such an example needs qualification. The $15,000 is an assumed unit cost. The prevented admission is an assumed effect, and in a 2,000-patient panel one prevented admission a month is a sizeable effect. The avoided cost accrues to the organization only in proportion to the share it keeps under its payment arrangement, a full amount under a global budget and a fraction under shared savings. A practice should therefore estimate the break-even number of prevented admissions for its own cost and its own arrangement before it commits, and track the actual number afterward."),
    blk('s4p3', "The matrix in Chapter 9 gives $40,000 to $100,000 a year for panel risk stratification and care management, with three to six months to start and a return crossover at about 12 months. On the example's figures, even a small fraction of the assumed effect would cover that cost, which is a reason the chapter treats it as a priority. It is also a reason to measure: if the effect is half the assumption, the case still holds under a global budget but may not under a one-sided shared savings contract."),
    warning('s4w1', "Stratification can miss the patients who need it most", "Tools trained on cost or prior use tend to under-identify patients who face barriers to care. Published research on one widely used algorithm found that it under-identified Black patients with the same illness burden because less had been spent on their care. Review who is in and out of Tier 1 by race, language, rurality and disability, and repeat the review each time the model or its inputs change."),

    h2('s5h1', 'Using the Risk Stratification Engine'),
    blk('s5p1', "The platform's Risk Stratification Engine, described in Chapter 9's platform tools table, runs a risk stratification against a panel and compares the tiers with the current care management assignment. The question it is designed to answer is which patients in a high tier are receiving no care management, the gap that quality measures do not surface. A practice can use it on a sample panel to see how many Tier 1 and Tier 2 patients have no assigned care manager, how many Tier 4 patients are unengaged and how its panel size compares with the framework."),
    blk('s5p2', "Keep the exercise small and repeatable. A practice that runs it once and files the result has learned something; one that runs it every quarter and moves staff time in response has built a capability. The tiers should also be reviewed by the clinicians who know the patients, since a risk score cannot see the neighbor who just moved in or the patient who stopped coming after a family death."),
    steps('s5st1', 'A first stratification exercise for a practice', [
        ('Define the panel', 'List attributed or empaneled patients, with age, diagnoses and recent use.'),
        ('Score and tier', 'Use a documented method; review the tier assignments with clinicians.'),
        ('Compare to care management assignment', 'Find high-tier patients with no care manager, and low-tier patients receiving intensive support.'),
        ('Check equity', 'Compare tier assignment and engagement across demographic and geographic groups.'),
        ('Reassign and track', 'Move staff time toward the gap; recheck monthly and recompute the tiers quarterly.'),
    ]),

    takeaway('tw', [
        "Chapter 9 puts a team-supported primary care panel at roughly 1,400 to 1,900 patients, citing a 2012 modeling study whose estimates were 1,947, 1,523 or 1,387 depending on how much care is delegated.",
        "The modeling study started from a 2,500-patient panel needing 21.7 physician hours a day; panel capacity depends on actually delegating tasks.",
        "AHRQ's briefs report that the top 5 percent of the population accounts for about half of spending, 50.4 percent in 2014 data and 48.3 percent in 2018 data.",
        "The four tiers are Complex, Moderate risk, Standard and Inactive, with care models of intensive management, proactive chronic care, prevention and re-engagement.",
        "Tier shares are Vermont reference points; other markets should expect different figures but the same method.",
        "The $180,000 example assumes $15,000 per admission and one prevented admission a month; estimate your own break-even and check who keeps the savings.",
        "Check stratification for subgroup performance and use the Risk Stratification Engine to find high-risk patients with no care management.",
    ]),
    quiz('qz',
        "What is the source of Chapter 9's panel-size range of roughly 1,400 to 1,900 patients?",
        [
            ("A measured national average of actual practices", False),
            ("A 2012 modeling study estimating reasonable panel sizes under different assumptions about delegating care to team members", True),
            ("A Vermont statute", False),
            ("The Blueprint's enrollment counts", False),
        ],
        "The range rounds the results of Altschuler and colleagues' modeling study in the Annals of Family Medicine, which estimated panels of 1,947, 1,523 or 1,387 under three assumptions about how much preventive and chronic care is delegated."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.2.3 and Figure 9.2: panel right-sizing and risk stratification; §9.9 Figure 9.5: implementation matrix"),
    blk('src2', "[2] Altschuler J, Margolius D, Bodenheimer T, Grumbach K. Estimating a reasonable patient panel size for primary care physicians with team-based task delegation. Ann Fam Med 2012;10(5):396-400 — https://www.annfammed.org/content/10/5/396 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC3438206"),
    blk('src3', "[3] Agency for Healthcare Research and Quality, MEPS Statistical Briefs on the concentration of health care expenditures — https://meps.ahrq.gov/data_files/publications/st533/stat533.pdf (2018 data); https://meps.ahrq.gov/mepsweb/data_files/publications/st497/stat497.shtml (2014 data); https://meps.ahrq.gov/data_files/publications/st560/stat560.pdf (2022 data)"),
    blk('src4', "[4] Obermeyer Z, Powers B, Vogeli C, Mullainathan S. Dissecting racial bias in an algorithm used to manage the health of populations. Science 2019;366(6464):447-453 — https://doi.org/10.1126/science.aax2342 ; HTR Research Lab, Risk Stratification Engine — https://healthtransformationreview.org/research-lab/interoperability?tab=risk"),
]

LESSONS = [(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2), (L3_SLUG, L3_TITLE, L3, 3)]
if __name__ == '__main__':
    run(LESSONS)
