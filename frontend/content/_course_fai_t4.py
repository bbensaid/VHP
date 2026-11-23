exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_fai_common.py').read())

# Track 4 — Cybersecurity in Rural Health Infrastructure. Verified 2026-11-23 via search summaries (primary pages not all
# readable): AHA survey on the Change Healthcare cyberattack (fielded March 9-12, 2024, about 1,000 hospitals; 94% financial
# impact; AHA release 82% cash flow impact; more than 33% impact on more than half of revenue; nearly 60% revenue impact of
# $1M per day or more; 74% direct patient care impact; 67% say switching clearinghouses is difficult); UVM Health Network
# October 2020 ransomware (UVM statement and Becker's date the attack October 28; HIPAA Journal October 25; EHR restored over the
# weekend before Nov 23, 2020 = roughly four weeks; ~$63 million reported in secondary coverage; insured for $30 million;
# $1.5 million a day estimate; GMCB said costs would surpass coverage); HHS Cybersecurity Performance Goals January 2024
# (voluntary; 10 essential, 10 enhanced); HIPAA Security Rule NPRM published Jan 6, 2025, moved to Long-Term Actions in the
# Fall 2026 Unified Agenda with anticipated final action July 2027. Book (Ch5 §5.5): 28 days to restore; ~$63-65M cost.

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'fai-rural-cyber-risk'
L10_TITLE = 'Why Rural Hospitals Are Exposed: Two Cases and a Growing Attack Surface'
L10 = [
    blk('intro1', "Cybersecurity is the technology investment that does not generate efficiency or quality gains. It generates insurance against catastrophic failure. Chapter 5 says rural health care cybersecurity is a specific and serious national vulnerability and uses two cases to make the point: the 2024 attack on Change Healthcare, which disrupted claims processing for thousands of providers, and the October 2020 ransomware attack on the University of Vermont Health Network. This lesson reviews both with the evidence this course could verify and explains why rural hospitals are disproportionately exposed."),
    blk('intro2', "It also covers a feature of the current moment: as hospitals add scribes, remote monitoring and telehealth and connect to shared data infrastructure, they are enlarging the attack surface at the same time as they are digitizing. The chapter treats that coincidence as the central planning problem."),
    blk('intro3', "Where figures differ between sources, the lesson reports the difference. Cybersecurity numbers are often reported loosely."),

    h2('s1h1', 'Three Reasons Rural Hospitals Are More Vulnerable'),
    blk('s1p1', "Chapter 5 gives three. Rural hospitals have limited internal information technology staff, who cannot maintain enterprise-level security operations: a hospital with one or two technologists cannot staff a round-the-clock monitoring function. Many run legacy record and financial systems that may not receive regular security patches, because the systems are old, the vendor has moved on or the hospital cannot afford the downtime to update them. And their data are high value: patient records and financial systems are what criminals specifically target, and a small hospital that pays quickly may be an attractive target."),
    blk('s1p2', "A fourth factor sits behind the three. Small hospitals have thin financial margins and depend on the continuous flow of claims revenue, so a disruption that a large system could absorb can threaten solvency. The finance course described days cash on hand as the measure of how long a hospital can absorb a shortfall. For a cyber event the shortfall can begin the same day, and the cash cushion of a small hospital is often measured in weeks."),
    callout('s1c1', "For a small hospital a cyber incident is a liquidity event as well as an operational one. Plan for the cash as well as the computers."),

    h2('s2h1', 'Case One: Change Healthcare, 2024'),
    blk('s2p1', "In February 2024, a cyberattack on Change Healthcare, a claims processing subsidiary of UnitedHealth Group, disrupted claims processing nationally for months. The American Hospital Association surveyed hospitals on March 9 to 12, 2024, about a month after the attack, and received roughly 1,000 responses. It reported that 94 percent of hospitals were experiencing a financial impact, with more than half reporting a significant or serious impact. Its own release said 82 percent reported an effect on cash flow, though another source rounds the figure to 83 percent. More than a third reported an effect on more than half of their revenue, nearly 60 percent reported a revenue impact of $1 million a day or more, 74 percent reported direct patient care impacts and 67 percent said it was difficult or very difficult to switch clearinghouses."),
    blk('s2p2', "The survey covered hospitals nationwide and the sources this lesson read give no rural breakdown. Chapter 5 states that the attack caused cash flow crises at rural hospitals already operating on thin margins, which fits the general findings, but the rural-specific claim is the book's. The structural lesson is more important than the figures: a single vulnerability in a widely used vendor cascaded across the system. Resilience requires knowing which vendors the organization cannot operate without, and what it will do if one fails."),

    h2('s3h1', "Case Two: Vermont's 2020 Attack"),
    blk('s3p1', "In October 2020 the UVM Health Network suffered a ransomware attack. The network's own statement and trade press date it to October 28, while one outlet gives October 25. UVM took down its Epic electronic health record, including the patient portal, as a containment step, and access was restored over the weekend before November 23, about four weeks later, with many connected applications still offline according to VTDigger. Chapter 5 says the Medical Center was on paper for nearly a month and that it took 28 days to restore the record; counting from October 28 gives about 26 days, so the figure is better read as roughly four weeks."),
    blk('s3p2', "Cost reports vary. Secondary coverage reports losses of upwards of $63 million. The network's chief executive estimated early on that the attack cost about $1.5 million a day in lost revenue and recovery costs, and press reports said the network was insured for $30 million and would cover the rest. The Green Mountain Care Board said the cost would surely exceed insurance coverage. This lesson found no primary Board document confirming the total, so $63 million is a reported estimate, not an audited figure. The Board also pushed back the network's planned Epic rollout dates pending its approval, a reminder that an incident has regulatory and budget consequences beyond the immediate recovery."),
    table('s3t1', 'The two cases, as far as the sources read allow', [
        {'Item': 'What happened', 'Change_Healthcare_2024': 'Cyberattack on a claims processing vendor disrupts national claims flow', 'UVM_Health_Network_2020': 'Ransomware attack; EHR taken down as containment'},
        {'Item': 'Duration or reach', 'Change_Healthcare_2024': 'Months of disruption nationally', 'UVM_Health_Network_2020': 'About four weeks to restore the EHR; some applications longer'},
        {'Item': 'Financial effect reported', 'Change_Healthcare_2024': 'AHA survey: 94% of hospitals affected; 82% cash flow impact; nearly 60% report $1M or more per day', 'UVM_Health_Network_2020': 'About $63M reported in secondary coverage; insured for $30M; early estimate of $1.5M per day'},
        {'Item': 'Lesson', 'Change_Healthcare_2024': 'A single vendor can cascade across the system', 'UVM_Health_Network_2020': 'Even a large network can be on paper for weeks'},
    ]),

    h2('s4h1', 'The Attack Surface Is Growing'),
    blk('s4p1', "The chapter's most forward-looking point is about timing. Rural hospitals are simultaneously digitizing, with scribes, remote monitoring and telehealth, and connecting to shared data infrastructure, the state exchange and network analytics. Each added system, vendor connection and data feed is a new route into the organization, and each shared platform is a target whose compromise reaches many members. The cybersecurity capability needs to grow at the same rate as the attack surface, and the chapter says it is not an optional add-on."),
    blk('s4p2', "A practical way to see the problem is to inventory the connections. List every vendor with network access or patient data, every device that connects to the network, every cloud service and every external data feed. Rank them by how much damage a compromise would do and how easily it could be detected. The result is usually longer than the organization expected, and it shows where to put limited security effort first."),
    steps('s4st1', 'A first-pass exposure inventory', [
        ('List the vendors and connections', 'Every third party with access to systems or data, including billing, clearinghouse, cloud, devices and remote monitoring.'),
        ('Mark the single points of failure', 'Which vendors would stop revenue or care if they failed for a month?'),
        ('Check patching and support', 'Which systems are out of support or cannot be patched on schedule?'),
        ('Estimate downtime tolerance', 'How long can each clinical and financial system be down before care or cash is at risk?'),
        ('Rank and fund', 'Put the first dollars where compromise would be worst and detection weakest.'),
    ]),
    warning('s4w1', "Do not rely on a single reported number", "Figures for cyber incident costs and durations vary by source and are often reported loosely. Use them to illustrate scale, and base your own planning on your own downtime and cash analysis."),

    h2('s5h1', 'Security Questions for Every New Tool'),
    blk('s5p1', "Because every new digital tool enlarges the attack surface, procurement is the cheapest place to apply security. A short set of questions should accompany any purchase of a scribe, a monitoring platform or a data connection. Does the vendor require multifactor authentication for administrators and for clinicians? How does it protect data in transit and at rest? Which subcontractors and cloud services does it use, and where is the data stored? What is its record on past incidents, and how quickly does it commit to notify the hospital of a breach? Can the hospital get a copy of its latest independent security assessment? And what happens to the hospital's data if the contract ends?"),
    blk('s5p2', "The answers belong in the contract, not in a sales conversation. They also connect to the AI governance checklist of Track 2, whose security and incident response domain has seven items and whose vendor domain asks for contractual disclosure obligations. A scribe vendor that records patient conversations holds some of the most sensitive data in the building, and the hospital should understand its security posture as it would a bank's."),
    blk('s5p3', "Reviewing existing vendors is harder but valuable. Start with those that would stop care or cash if they failed and those that hold the most sensitive data. A small network can share the review work, which is one reason the shared model in the next lesson matters."),

    takeaway('tw', [
        "Chapter 5 gives three reasons rural hospitals are more vulnerable: limited IT staff, legacy systems with patching problems and high-value data that criminals target.",
        "Thin margins mean a cyber incident is also a liquidity event for a small hospital.",
        "An AHA survey fielded March 9-12, 2024 found 94 percent of hospitals financially affected by the Change Healthcare attack and 82 percent affected in cash flow; the survey gave no rural breakdown in the sources read.",
        "The October 2020 UVM Health Network ransomware attack took the EHR down for about four weeks according to press reports; the book says 28 days.",
        "Reported costs of about $63 million for the 2020 attack come from secondary coverage; the network was reported insured for $30 million.",
        "The attack surface grows as hospitals add scribes, remote monitoring and telehealth and connect to shared infrastructure.",
        "Inventory vendors and connections, mark single points of failure and tolerate no unknown dependencies.",
    ]),
    quiz('qz',
        "What structural lesson does the Change Healthcare attack illustrate?",
        [
            ("Only large hospitals are targeted", False),
            ("A single vulnerability in a widely used vendor can cascade across the entire healthcare system", True),
            ("Cyberattacks always cost exactly the same amount", False),
            ("Claims clearinghouses cannot be changed", False),
        ],
        "The chapter uses the attack to show systemic exposure: one widely used vendor's failure disrupted claims processing for thousands of providers for months, with cash flow effects on hospitals with thin margins."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.5: cybersecurity in rural health infrastructure; §5.6 Figure 5.3"),
    blk('src2', "[2] American Hospital Association, AHA Survey: Change Healthcare Cyberattack Significantly Disrupts Patient Care, Hospitals' Finances (March 15, 2024) — https://www.aha.org/2024-03-15-aha-survey-change-healthcare-cyberattack-significantly-disrupts-patient-care-hospitals-finances"),
    blk('src3', "[3] VTDigger, A month after cyberattack, UVM Medical Center restores access to electronic records (November 23, 2020) — https://vtdigger.org/2020/11/23/a-month-after-cyberattack-uvm-medical-center-restores-access-to-electronic-records ; UVM Health Network statement — https://www.uvmhealth.org/news/uvmhn/statement-uvm-health-network-cyberattack ; HIPAA Journal — https://www.hipaajournal.com/uvm-health-restores-electronic-health-record-system-one-month-after-ransomware-attack/"),
    blk('src4', "[4] Becker's Hospital Review, Ransomware attack, COVID-19 response delay Epic EHR rollout at UVM Health — https://www.beckershospitalreview.com/ehrs/ransomware-attack-covid-19-response-delay-epic-ehr-rollout-at-uvm-health.html ; Infosecurity Magazine, Ransomware Attack Costs Health Network $1.5m a Day — https://www.infosecurity-magazine.com/news/ransomware-attack-costs-health/"),
]

# ════════════════════════════════════════════════════════════════════════════
L11_SLUG = 'fai-shared-security-services'
L11_TITLE = 'Shared Security Services: A Network Model and the Federal Frame'
L11 = [
    blk('intro1', "A critical access hospital cannot afford a staffed security operations center. A network of hospitals can. Chapter 5 therefore proposes cybersecurity as a shared service of the clinically integrated network, with five components: monitoring, endpoint detection, vendor risk management, incident response planning and staff training. This lesson describes each, sets them against the voluntary federal performance goals and the status of the proposed HIPAA Security Rule update, and discusses how a network should buy, govern and measure the service."),
    blk('intro2', "The federal picture is partly in flux. HHS published voluntary performance goals in January 2024. It proposed a stronger HIPAA Security Rule in January 2025, and as of the fall 2026 regulatory agenda that rule has moved to a long-term list with a July 2027 date. The existing rule remains in force. A network should plan against both facts."),
    blk('intro3', "The sources for the federal items are agency listings and trade and law firm summaries, noted below."),

    h2('s1h1', 'The Five Components'),
    blk('s1p1', "Chapter 5 lists what a shared model provides. Security operations center monitoring watches networks around the clock for intrusion attempts, malware and anomalous activity, usually contracted through a healthcare-specialized managed security service provider. Endpoint detection and response puts software on connected devices that detects and responds to threats automatically and escalates to the center when needed. Vendor risk management assesses every third-party technology vendor used by member hospitals for security posture and contractual security requirements. Incident response planning documents procedures for ransomware, breach and outage scenarios, with regular tabletop exercises and recovery time objectives for critical clinical systems. Staff training provides phishing simulation and security awareness, since most attacks begin with a staff member clicking a link."),
    blk('s1p2', "Each component answers a gap that a small hospital cannot close alone. Monitoring and endpoint response need staff and tooling that run at all hours. Vendor risk management is a specialist function that benefits from scale: one assessment of a widely used vendor can serve every member, instead of each hospital negotiating security terms separately. Incident response planning benefits from shared templates and joint exercises. Training is cheap to deliver across a network and valuable in each hospital."),
    table('s1t1', 'Shared services components (HTR Chapter 5, §5.5.1)', [
        {'Component': 'Security operations center monitoring', 'What_it_does': '24/7 monitoring for intrusion, malware and anomalies', 'Why_shared': 'A small hospital cannot staff round-the-clock monitoring'},
        {'Component': 'Endpoint detection and response', 'What_it_does': 'Detects and responds to threats on connected devices; escalates', 'Why_shared': 'Tooling and expertise are costly per site'},
        {'Component': 'Vendor risk management', 'What_it_does': 'Assesses the security posture and contract terms of third-party vendors', 'Why_shared': 'One assessment serves all members'},
        {'Component': 'Incident response planning', 'What_it_does': 'Procedures, tabletop exercises and recovery time objectives', 'Why_shared': 'Shared templates and joint exercises'},
        {'Component': 'Staff training', 'What_it_does': 'Phishing simulation and awareness training', 'Why_shared': 'Low cost at network scale'},
    ]),

    h2('s2h1', 'The Federal Frame: Voluntary Goals and a Delayed Rule'),
    blk('s2p1', "In January 2024 HHS published voluntary healthcare-specific Cybersecurity Performance Goals, organized into 10 essential goals and 10 enhanced goals. The essential goals, which HHS describes as a floor of minimum safeguards against common vulnerabilities, include bolstering email security, multifactor authentication, encryption across electronic systems and identification and mitigation of risks tied to third-party products and services. The enhanced goals, for organizations that have met the essential ones, include cybersecurity testing, mitigation, network segmentation and configuration management. HHS describes the goals as voluntary, and the agency's cybersecurity web page is the source for the full lists and mappings."),
    blk('s2p2', "In January 2025 HHS proposed amendments to the HIPAA Security Rule that would tighten requirements. Trade and law firm reporting on the Fall 2026 Unified Agenda says HHS moved the proposal, identified by regulatory identification number 0945-AA22, to its Long-Term Actions list and gave July 2027 as the anticipated time for final action, which generally means HHS does not expect a final rule within twelve months. The earlier agenda had listed May 2026. The existing Security Rule remains fully in force and enforceable. Agenda dates are planning estimates, and the rule could be finalized earlier, changed or withdrawn, so a network should check the current status before relying on any date."),
    callout('s2c1', "Do not wait for the rule. The voluntary goals and the existing HIPAA Security Rule already describe what a prudent organization does; a final rule would raise the floor, not create the need."),

    h2('s3h1', 'Buying and Governing the Service'),
    blk('s3p1', "A network buying shared security services has several choices. It can contract with a managed security service provider for monitoring and response, build a small internal team, or combine the two. The chapter's implementation matrix gives indicative costs for a security assessment and hardening of $50,000 to $200,000 per organization over three to six months, with the benefit being risk avoidance from the start. Those are the book's indicative ranges, and a network should obtain quotes for its own scope. The shared cost of monitoring across members depends on the number of endpoints and the service level."),
    blk('s3p2', "Governance decisions are as important as the contract. Who decides what the service monitors and in what order? Who is authorized to isolate a member's network during an incident? How are costs allocated among members of very different size? What does each member remain responsible for, such as patching its own systems and training its own staff? A written shared responsibility matrix, agreed before an incident, prevents the delay and conflict that otherwise follow one."),
    blk('s3p3', "Funding is a further question. The chapter notes that Vermont's Rural Health Transformation information technology investments explicitly include cybersecurity capability development. Time-limited funding raises the issue the political sustainability course addressed: the service has to be financed from operating budgets when the grant ends, since attackers do not stop when a grant does."),

    h2('s4h1', 'Measuring the Service'),
    blk('s4p1', "Security services need measures that a board can read. Useful ones include the share of endpoints with active detection software, the time to detect and the time to contain events in exercises, the share of staff who fall for simulated phishing and the share who report it, the share of critical vendors with a completed risk assessment and the share of critical systems with a tested recovery time. None of these proves that no breach will occur. Together they show whether the controls that make breaches less likely and less damaging are in place and working."),
    steps('s4st1', 'A starting package for a small hospital within a network', [
        ('Adopt the essential goals as the baseline', 'Score each essential goal; prioritize multifactor authentication, email security and third-party risk.'),
        ('Join the shared monitoring service', 'Confirm which systems and endpoints are covered and who responds.'),
        ('Agree the responsibility matrix', 'Document who does what in an incident, in writing, before one.'),
        ('Assess the critical vendors', 'Start with billing, clearinghouse, record and remote monitoring vendors.'),
        ('Train and test', 'Run phishing simulations and one tabletop exercise within the first year.'),
    ]),

    h2('s5h1', 'Common Mistakes in Shared Security Programs'),
    blk('s5p1', "Shared programs fail in recognizable ways. The first is buying monitoring without the capacity to respond: a center that sends alerts to a hospital with no one to read them at night has bought a log. Contracts should define who acts, in what time and with what authority. The second is covering the network perimeter and ignoring the medical devices, building systems and vendor connections inside it, which are often the weakest points. The third is treating the service as a project that ends: threats, staff and systems change, so the program needs a standing budget and a review cycle."),
    blk('s5p2', "A fourth mistake is unequal participation. A network is only as secure as its weakest member, since an attacker who compromises a poorly protected hospital may reach shared systems. Minimum standards for membership, and support to meet them, protect everyone. A fifth is neglecting identity: most compromises involve stolen or misused credentials, so multifactor authentication and tight control of privileged accounts deserve early attention, which is why they head the essential goals."),
    blk('s5p3', "Finally, programs often skip measurement and are surprised when a board asks what it has bought. The measures listed above, kept simple and reported quarterly, answer that question and also show where to improve. A network that can show a rising share of covered endpoints, a falling time to contain in exercises and a shrinking list of unassessed critical vendors has evidence for its next budget request."),

    takeaway('tw', [
        "A shared network model can provide round-the-clock monitoring, endpoint detection, vendor risk management, incident response planning and staff training that individual rural hospitals cannot afford alone.",
        "HHS's voluntary Cybersecurity Performance Goals of January 2024 have 10 essential and 10 enhanced goals; essential goals include multifactor authentication, email security, encryption and third-party risk.",
        "HHS proposed HIPAA Security Rule amendments in January 2025; the Fall 2026 agenda moved them to long-term actions with July 2027 as the anticipated final action, and the current rule remains in force.",
        "The chapter's indicative cost for a security assessment and hardening is $50,000 to $200,000 per organization over three to six months.",
        "Agree a written shared responsibility matrix covering monitoring scope, authority to isolate a network, cost allocation and member duties before any incident.",
        "Plan for the end of grant funding; security services must be financed from operating budgets over time.",
        "Measure the service with endpoint coverage, time to detect and contain, phishing results, vendor assessments and tested recovery times.",
    ]),
    quiz('qz',
        "What is the status of HHS's proposed HIPAA Security Rule overhaul, as reported in the Fall 2026 regulatory agenda?",
        [
            ("It was finalized in 2026", False),
            ("It was moved to long-term actions with July 2027 as the anticipated final action; the existing rule remains in force", True),
            ("It was repealed with no replacement", False),
            ("It applies only to federal agencies", False),
        ],
        "Trade and law firm reports say HHS moved the January 2025 proposal to its Long-Term Actions agenda and gave July 2027 as the anticipated timeframe for final action. The existing Security Rule remains fully in effect."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.5.1 (the CIN cybersecurity shared services model), §5.6 Figure 5.3 and §5.5 (federal developments)"),
    blk('src2', "[2] HHS, Healthcare and Public Health Sector Cybersecurity Performance Goals — https://hhscyber.hhs.gov/cybersecurity-performance-goals.html ; summaries by Jones Day (February 2024) — https://www.jonesday.com/en/insights/2024/02/hhs-releases-cybersecurity-performance-goals-for-the-health-care-sector"),
    blk('src3', "[3] Davis Wright Tremaine, HHS updates HIPAA rulemaking timeframes (July 2026) — https://www.dwt.com/blogs/privacy--security-law-blog/2026/07/hhs-updates-hipaa-rulemaking-timeframes ; Alston & Bird, HHS delays HIPAA Security Rule to 2027 (July 10, 2026) — https://www.alston.com/en/insights/publications/2026/07/hhs-delays-hipaa-security-rule-2027 — status of RIN 0945-AA22"),
    blk('src4', "[4] Vermont Rural Health Transformation Program, as summarized in " + BOOK5 + " — §5.5.1 on information technology advance investments including cybersecurity"),
]

# ════════════════════════════════════════════════════════════════════════════
L12_SLUG = 'fai-incident-response'
L12_TITLE = 'Incident Response and Recovery: Planning for the Bad Day'
L12 = [
    blk('intro1', "Prevention fails sometimes. What distinguishes a hospital that recovers in days from one that recovers in weeks is mostly what it prepared before the incident. Chapter 5 includes incident response planning in the shared services model, with documented procedures for ransomware, data breach and system outage scenarios, regular tabletop exercises and recovery time objectives for critical clinical systems. This lesson turns that into a working plan."),
    blk('intro2', "The two cases of the previous lesson are the backdrop. The Change Healthcare attack showed what happens when a vendor fails: claims stop and cash flow follows. The 2020 UVM Health Network attack showed what happens when the record system itself goes down: weeks on paper, regulatory consequences and costs that exceeded insurance. A response plan has to cover both an internal failure and a vendor failure."),
    blk('intro3', "The lesson is generic by design. It gives a structure a hospital can adopt and test, not a template for any specific tool or product."),

    h2('s1h1', 'Start With What Must Keep Running'),
    blk('s1p1', "A response plan begins with business impact: which clinical and financial functions must continue, and for how long can each be unavailable before patients or cash are at risk? The emergency department registration, the medication administration record, laboratory and imaging orders, the pharmacy, the billing and claims systems and communications are typical candidates. For each, define a recovery time objective, the longest outage the organization can tolerate, and a recovery point objective, the most data it can afford to lose."),
    blk('s1p2', "The exercise forces honest conversations. A hospital may learn that its backups cannot restore the record system in less than two weeks while its leadership assumed two days. It may find that the downtime procedures exist on paper in a binder no one has opened in years. It may learn that a billing vendor, whose failure would stop the claims flow, has no tested recovery plan. These discoveries are the point of the exercise, and they are far cheaper to make before an incident than during one."),
    callout('s1c1', "A recovery time objective that has never been tested is a hope. Test restoring the systems that matter most, and record how long it actually takes."),

    h2('s2h1', 'Downtime Operations'),
    blk('s2p1', "When the record system is unavailable, care continues on paper, and the paper process needs to be rehearsed. Chapter 5 reports that the Medical Center was on paper for nearly a month in 2020. A downtime plan covers how patients are identified and registered, how orders and results move, how medications are administered and documented, how diagnostic images and labs are accessed, how staff communicate and how information entered on paper is later reconciled into the electronic record."),
    blk('s2p2', "Rehearsal matters because staff who have never worked without the system will lose time and may make errors. A regular, short downtime drill on each unit, supported by forms that are current and printed and by a reference sheet for key phone numbers and procedures, reduces both. The drill should also test whether the downtime forms and systems are available when the network is down, since a plan stored only on the network is unreachable when it is needed."),

    h2('s3h1', 'Vendor Failure and Financial Resilience'),
    blk('s3p1', "The Change Healthcare attack shows a different scenario: the hospital's own systems work, but the entity that processes its claims does not. A plan for this case identifies critical vendors, whether alternatives exist and how quickly the organization could switch, the AHA survey reporting that two-thirds of hospitals found switching clearinghouses difficult or very difficult. It sets a trigger for acting, such as a stated number of days of disrupted claims flow, and a set of financial actions: drawing on a credit line, accelerating collections from other sources, negotiating advance payments with major payers and communicating with lenders and the board."),
    blk('s3p2', "Cyber insurance is part of the plan but not the whole. The 2020 case is a reminder: the network was reported insured for $30 million, and the Green Mountain Care Board said the costs would surely exceed coverage. A hospital should know its policy's limits, sub-limits for business interruption and ransomware, its conditions, such as required security controls, and the notice and approved-vendor requirements for responding to an incident. Insurers increasingly require specific controls, so the services of the previous lesson also affect insurability and price."),
    table('s3t1', 'Two failure scenarios and what the plan must cover', [
        {'Scenario': 'Internal failure: record system down', 'Clinical_focus': 'Downtime procedures; recovery time objectives; restoration order', 'Financial_focus': 'Lost revenue and recovery cost; insurance limits; Board and lender notice'},
        {'Scenario': 'Vendor failure: claims clearinghouse down', 'Clinical_focus': 'Usually limited; watch authorization and eligibility workflows', 'Financial_focus': 'Cash flow bridge; payer advances; alternative clearinghouse; trigger date for action'},
    ]),

    h2('s4h1', 'Governance, Communication and Exercises'),
    blk('s4p1', "An incident is decided in hours. The plan should name an incident commander with authority, a clinical lead, a technical lead, a communications lead and a legal and privacy lead, with deputies, and say who can order a system isolated. It should say how staff, patients, regulators, payers and the public are told, and who approves the message. In Vermont, as the political sustainability course noted, the Board's budget authority gives a regulator a stake in a major financial event, so the plan should include notice to the Board and the Agency."),
    blk('s4p2', "Tabletop exercises are the cheapest way to find the gaps. A facilitator presents a scenario in stages, such as ransomware found at 2 a.m., the record system down by 6 a.m. and a ransom demand by noon, and the group states what it would do at each stage. Include leadership and board members, since decisions about payment, public statements and diverting ambulances belong to them. Record the gaps, assign owners and run the exercise again within the year. Chapter 5's shared model makes exercises easier: a network can run a joint exercise and share lessons across members."),
    steps('s4st1', 'A one-page incident response structure', [
        ('Detect and declare', 'Define what triggers an incident declaration and who declares it.'),
        ('Contain', 'Isolate affected systems; preserve evidence; decide on external help and law enforcement notice.'),
        ('Operate in downtime', 'Activate paper procedures; prioritize clinical systems for restoration.'),
        ('Communicate', 'Notify staff, patients, payers, regulators and insurers per the plan.'),
        ('Recover and review', 'Restore in priority order; reconcile paper records; hold a review and update the plan.'),
    ]),
    warning('s4w1', "A plan in a binder is not a plan", "Test it, keep a copy that works when the network is down and update it after every exercise and every real event."),

    h2('s5h1', 'After the Incident: Notification, Review and Learning'),
    blk('s5p1', "Recovery ends with obligations. When a breach exposes protected health information, federal breach notification rules require covered entities to notify affected individuals without unreasonable delay and within 60 days of discovery, to notify HHS and, for larger breaches, to notify the media, with different timing for smaller breaches. State law may add requirements. The plan should say who determines whether an event is a reportable breach, who drafts the notices and who handles questions, and counsel should be involved early. The HHS breach notification page is the starting reference, and a hospital should confirm current requirements with its counsel."),
    blk('s5p2', "A structured review follows. What happened, how was it detected and when, what slowed the response and what would have shortened it? Which controls worked and which did not? The review should produce a short list of changes with owners and dates, and the board should see it. A hospital that treats an incident as a source of information becomes harder to attack twice. One that treats it as an embarrassment is likely to lose the lessons."),
    blk('s5p3', "Insurance and regulators need updates, and so do patients and staff. A clear, honest and timely message sustains trust, and the plan's communications section should include templates that counsel has reviewed in advance, so the facts can be filled in quickly."),

    takeaway('tw', [
        "A response plan starts with business impact: which functions must run, with a recovery time objective and a recovery point objective for each.",
        "Test restoration of critical systems and record the real time; an untested objective is a hope.",
        "Downtime operations on paper must be rehearsed and available when the network is down; Chapter 5 reports the Medical Center was on paper for nearly a month in 2020.",
        "Vendor failure needs its own plan: identify critical vendors, alternatives, a trigger date and a set of financial actions, since switching clearinghouses is difficult for most hospitals.",
        "Know your cyber insurance limits and conditions; the 2020 attack was reported to exceed the network's $30 million coverage.",
        "Name an incident commander and communications roles; include notice to regulators and payers.",
        "Run tabletop exercises with leadership and the board, record gaps, assign owners and repeat within the year.",
    ]),
    quiz('qz',
        "Why does the lesson recommend a separate plan for vendor failure in addition to internal failure?",
        [
            ("Because vendor failures cannot affect hospitals", False),
            ("Because a vendor failure such as a claims clearinghouse outage can stop cash flow even when the hospital's own systems work", True),
            ("Because insurance covers vendor failures completely", False),
            ("Because vendors always recover within a day", False),
        ],
        "The Change Healthcare attack showed that a failure in a claims processing vendor can disrupt hospitals' cash flow for months while their own systems function, and most hospitals found it hard to switch clearinghouses."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.5.1: incident response planning within the shared services model"),
    blk('src2', "[2] American Hospital Association, AHA Survey: Change Healthcare Cyberattack Significantly Disrupts Patient Care, Hospitals' Finances (March 15, 2024) — https://www.aha.org/2024-03-15-aha-survey-change-healthcare-cyberattack-significantly-disrupts-patient-care-hospitals-finances"),
    blk('src3', "[3] VTDigger, A month after cyberattack, UVM Medical Center restores access to electronic records (November 23, 2020) — https://vtdigger.org/2020/11/23/a-month-after-cyberattack-uvm-medical-center-restores-access-to-electronic-records ; Becker's Hospital Review — https://www.beckershospitalreview.com/ehrs/ransomware-attack-covid-19-response-delay-epic-ehr-rollout-at-uvm-health.html — Board statement on costs and insurance"),
    blk('src4', "[4] HHS, Healthcare and Public Health Sector Cybersecurity Performance Goals — https://hhscyber.hhs.gov/cybersecurity-performance-goals.html ; HHS Office for Civil Rights, Breach Notification Rule — https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html — check current requirements with counsel"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
