exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_cmmi_common.py').read())

# Track 4 — Prior Authorization and H.R. 1
# Lesson 10 facts verified 2026-11-23: CMS fact sheet for CMS-0057-F (Jan 17, 2024), read in full; AMA leadership
# viewpoint of June 4, 2026 on the 2025 AMA prior authorization physician survey, read in full. Vermont and policy-vs-
# operations framing: HTR book Chapter 3 §3.4. Note for the author (not edited): the book says the 72-hour/7-day
# timeframes apply to federal-exchange plans; the CMS fact sheet says they apply to all impacted payers EXCEPT QHP issuers
# on the federal exchanges.

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'cmmi-prior-authorization-rule'
L10_TITLE = 'Prior Authorization: The Federal Rule, the 2027 APIs and the State Role'
L10 = [
    blk('intro1', "Prior authorization is the requirement that a clinician obtain a health plan's approval before delivering a service. It is one of the most visible administrative burdens in American health care, and it is also one of the few areas where federal rulemaking has produced concrete, dated requirements in the last few years. Chapter 3 treats it as the administrative pillar of policy strategy."),
    blk('intro2', "This lesson covers the burden as physicians report it, what CMS's 2024 interoperability and prior authorization rule requires and from when, what the rule leaves untouched, and where states fit. It uses CMS's own fact sheet for the rule, read in full, and the American Medical Association's 2025 physician survey as summarized by its leadership in June 2026."),
    blk('intro3', "One of its points corrects a detail in Chapter 3. The book says the new response times apply to federal-exchange plans. CMS's fact sheet says they apply to every impacted payer except qualified health plan issuers on the federal exchanges. The lesson follows CMS."),

    h2('s1h1', 'The Burden, as Physicians Report It'),
    blk('s1p1', "The AMA's 2025 prior authorization physician survey, with 1,000 practicing physicians responding, is the most recent large survey, and AMA's Immediate Past President wrote about it in June 2026. The findings are stark. Each physician completes about 40 prior authorization requests every week, using around 13 hours of physician and staff time. Nearly one-third of physicians said their requests are often or always denied. More than a quarter reported that prior authorization directly led to serious adverse events for patients, including hospitalizations, permanent harm and death. Nearly four in five have seen patients abandon treatment because of these barriers."),
    blk('s1p2', "These are physician-reported figures from a survey of one profession's views, and the AMA is an advocate on the issue. They should be read as the profession's account of its experience, not as measured outcomes. Chapter 3 uses the 13-hour figure, and the lesson keeps the figure with its source for that reason. The 2024 edition of the survey reported about 39 requests a week, so the two editions should not be mixed."),
    blk('s1p3', "The AMA also reports on insurers' own response. It says insurers made a pledge to change practices, with changes intended before January 1, 2027, and that just one in three physicians believe the latest pledge will make a meaningful difference. Only one in four said medical-necessity denials are actually reviewed by a licensed, qualified clinician as insurers promised. The pledge is voluntary, which is the context for the binding federal requirements below."),

    h2('s2h1', "What CMS's 2024 Rule Requires"),
    blk('s2p1', "On January 17, 2024, CMS published the Interoperability and Prior Authorization final rule, CMS-0057-F. It applies to what CMS calls impacted payers: Medicare Advantage organizations, state Medicaid and CHIP fee-for-service programs, Medicaid managed care plans, CHIP managed care entities and qualified health plan issuers on the federal exchanges. It does not apply to commercial employer plans outside those categories, and it excludes prior authorization for drugs from most of its provisions."),
    blk('s2p2', "Starting generally January 1, 2026, impacted payers must decide expedited prior authorization requests within 72 hours and standard requests within seven calendar days. Qualified health plan issuers on the federal exchanges are excluded from this requirement. Also beginning in 2026, payers must give a specific reason when they deny a request, and must publicly report certain prior authorization metrics annually on their websites, with the first set due by March 31, 2026."),
    blk('s2p3', "The comparison with earlier practice is the rule's strongest argument. Chapter 3 notes that standard reviews could previously take weeks. A seven-day maximum and a mandatory denial reason convert a vague burden into a measurable obligation. Public metrics add something else: for the first time, a hospital or a state can compare payers on how often they approve, deny and reverse requests, from data the payers must publish."),
    table('s2t1', 'What CMS-0057-F requires, by date (CMS fact sheet, January 17, 2024)', [
        {'Requirement': 'Decision within 72 hours (expedited) and 7 calendar days (standard)', 'Applies_to': 'Impacted payers except QHP issuers on the federal exchanges', 'From': 'January 1, 2026'},
        {'Requirement': 'Specific reason for any denial', 'Applies_to': 'Impacted payers', 'From': '2026'},
        {'Requirement': 'Annual public reporting of prior authorization metrics', 'Applies_to': 'Impacted payers', 'From': 'First set by March 31, 2026'},
        {'Requirement': 'Prior Authorization API; Provider Access API; Payer-to-Payer API; prior authorization data in the Patient Access API', 'Applies_to': 'Impacted payers', 'From': 'January 1, 2027'},
    ]),

    h2('s3h1', 'The 2027 Technology Layer'),
    blk('s3p1', "The rule's second half is about data exchange. By January 1, 2027, impacted payers must stand up four application programming interfaces. A Prior Authorization API lets a provider find a payer's list of covered items and services and submit requests, and it must communicate an approval with its end date or circumstances, a denial with a specific reason, or a request for more information. A Provider Access API gives providers a patient's data, using an attribution process and a patient opt-out. A Payer-to-Payer API lets a new plan receive data from a patient's earlier plan, with the patient's opt-in and covering data from the previous five years. And the existing Patient Access API is expanded to include prior authorization information, excluding drugs."),
    blk('s3p2', "This is where the Policy pillar meets the Technology pillar. The decision times are a rule of conduct, but making them achievable at scale needs standardized electronic exchange. CMS announced enforcement discretion for the HIPAA X12 278 transaction so that an interface built on FHIR, the modern health data standard, can satisfy the rule alone. A hospital or practice that has built FHIR connections and integrated them into its workflow will be positioned to use the Prior Authorization APIs when payers launch them; one that has not will find the 2027 changes mostly invisible."),
    callout('s3c1', "The 2026 requirements change what payers owe providers. The 2027 requirements change how requests and data move. The first depends on the second to be practical at scale."),

    h2('s4h1', 'What the Rule Does Not Do'),
    blk('s4p1', "The federal rule narrows the burden but does not remove it. Chapter 3 records that the Improving Seniors' Timely Access to Care Act passed the House by voice vote in 2022 but died in the Senate, and that CMS achieved much of its substance through rulemaking instead. H.R. 1 did not include prior authorization reform. Proposals for public reporting of denial rates by service type, required disclosure of the clinical criteria used and stronger external appeal rights remain pending legislation, not law. Full elimination of prior authorization for evidence-based, guideline-concordant care remains aspirational."),
    blk('s4p2', "The rule also leaves out important ground. It does not cover most commercial insurance plans outside the federal exchanges, and it excludes drugs from most provisions. And a faster decision is not necessarily a better one: the AMA's concern about the qualifications of reviewers and the frequency of denials is not addressed by a response-time rule alone."),

    h2('s5h1', "The State Role: Vermont's Act 167"),
    blk('s5p1', "States regulate the parts of the market federal rules do not reach, and they can add requirements for state-regulated plans. Chapter 3 draws a clear line between two kinds of work. Prior authorization reform, meaning changing the rule itself, is a Policy pillar issue that requires federal rulemaking or state legislation. Reducing the burden of the rules already in force is an Operations pillar task. Individual payers reforming voluntarily have limited impact because the burden comes from the aggregate of requirements across dozens of payers with different criteria, forms and timelines."),
    blk('s5p2', "Vermont's Act 167 of 2022 included prior authorization as a covered domain. It directed the Department of Financial Regulation to analyze insurers' prior authorization data and, with the Green Mountain Care Board, to recommend statutory changes to align and streamline prior authorization across insurers. Oliver Wyman's community engagement findings, as Chapter 3 summarizes them, linked long approval processes to cost-effective contracts that could not be secured, and its recommendations called for further simplifying prior authorization, the certificate of need process and Medicaid billing. The book treats administrative simplification as work that enables every other transformation initiative."),
    blk('s5p3', "This lesson did not verify whether Vermont has since enacted additional prior authorization legislation, so a reader who needs the current state of Vermont law should check the legislature's website. The principle holds either way: federal rules set a floor for impacted payers, and state law is the lever for everything else."),

    h2('s6h1', 'What Organizations Should Do'),
    steps('s6st1', 'A practical response to the prior authorization rule', [
        ('Track the payers', 'Read the public metrics each impacted payer posts, and record approval, denial and reversal rates by payer and service.'),
        ('Audit turnaround', 'Check whether decisions arrive within 72 hours and seven days; document and report breaches.'),
        ('Use the denial reasons', 'Turn the mandatory specific reasons into a feedback loop for documentation and appeals.'),
        ('Prepare for the APIs', 'Plan FHIR connections and workflow integration well before January 1, 2027.'),
        ('Feed policy', 'Bring the pattern of denials into comment letters, legislative testimony and payer contracting.'),
    ]),

    takeaway('tw', [
        "The AMA's 2025 survey of 1,000 physicians reports about 40 prior authorization requests per physician per week and around 13 hours of physician and staff time; these are physician-reported figures.",
        "CMS-0057-F, published January 17, 2024, applies to Medicare Advantage, Medicaid and CHIP fee-for-service and managed care, and qualified health plan issuers on the federal exchanges.",
        "From January 1, 2026, impacted payers except federal-exchange QHP issuers must decide expedited requests in 72 hours and standard requests in seven calendar days.",
        "From 2026, payers must give a specific denial reason and post prior authorization metrics annually, with the first set due by March 31, 2026.",
        "By January 1, 2027, payers must have Prior Authorization, Provider Access and Payer-to-Payer APIs and add prior authorization data to the Patient Access API, excluding drugs.",
        "The rule does not eliminate prior authorization, does not reach most commercial plans outside its categories, and mostly excludes drugs; related bills remain pending, not law.",
        "Vermont's Act 167 directed the Department of Financial Regulation and the Green Mountain Care Board to analyze prior authorization data and recommend statutory changes.",
    ]),
    quiz('qz',
        "According to CMS's fact sheet for CMS-0057-F, which payers are not subject to the 72-hour and seven-day decision timeframes?",
        [
            ("Medicare Advantage organizations", False),
            ("Medicaid managed care plans", False),
            ("Qualified health plan issuers on the federal exchanges", True),
            ("State Medicaid fee-for-service programs", False),
        ],
        "CMS states that the 72-hour expedited and seven-calendar-day standard decision timeframes apply to all impacted payers except qualified health plan issuers on the federal exchanges. Medicare Advantage organizations, Medicaid and CHIP fee-for-service programs and managed care plans are all subject to them."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS, CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) fact sheet (January 17, 2024) — https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f — impacted payers, timeframes, denial reasons, public metrics, 2027 APIs"),
    blk('src2', "[2] American Medical Association, Latest prior auth survey shows promised reform remains elusive (Bobby Mukkamala, MD, June 4, 2026) — https://www.ama-assn.org/about/leadership/latest-prior-auth-survey-shows-promised-reform-remains-elusive — the 2025 AMA prior authorization physician survey"),
    blk('src3', "[3] " + BOOK3 + " — §3.4.1-3.4.2: federal prior authorization reform, the Improving Seniors' Timely Access to Care Act, Vermont's Act 167 and the Oliver Wyman findings"),
    blk('src4', "[4] Vermont Act 167 of 2022, as summarized in Chapter 3 — directing the Department of Financial Regulation and the Green Mountain Care Board on prior authorization"),
]

# ════════════════════════════════════════════════════════════════════════════
# Lesson 11 facts: KFF "Health Provisions in the 2025 Federal Budget Reconciliation Law" (Aug 22, 2025, updated), the
# first ~40,000 characters read verbatim (section numbers, dates and CBO estimates quoted below come from that text); SMD
# #26-003 for section 71118. Vermont and rural fund items: HTR book Chapter 3 §3.6.
L11_SLUG = 'cmmi-hr1-medicaid-provisions'
L11_TITLE = 'H.R. 1 and Medicaid: Provisions, Dates and Dollars'
L11 = [
    blk('intro1', "Public Law 119-21, the 2025 reconciliation law known as H.R. 1 or the One Big Beautiful Bill Act, is the largest change to Medicaid financing and eligibility since the Affordable Care Act. Its provisions start on different dates, from October 2026 through 2028, and they affect states, hospitals and enrollees in different ways. Chapter 3 gives the practitioner a map of them; this lesson fills in the statute's section numbers, dates and the budget scorekeeper's estimates."),
    blk('intro2', "It uses KFF's section-by-section analysis of the law, whose text this lesson read, and the CMS letter on budget neutrality from Lesson 8. The numbers quoted are CBO estimates as KFF reports them, and they are estimates of effect compared with a baseline, not forecasts of any state's experience."),
    blk('intro3', "A general rule applies throughout: the statute sets the dates, but CMS guidance and court decisions have been changing how the dates work in practice. Lesson 12 covers that for work requirements, which have moved the most."),

    h2('s1h1', 'Where the Law Reaches Medicaid'),
    blk('s1p1', "KFF's overview states the law's overall effect: it reduces federal health spending by over a trillion dollars and increases the number of uninsured by about 10 million. The Medicaid provisions fall into four groups. Eligibility and enrollment provisions govern who is covered and how often they must prove it. Financing provisions limit the ways states raise their share and pay providers. Cost-sharing and coverage-scope provisions change what enrollees pay and what is covered. And a rural fund provides $50 billion in grants to states between fiscal years 2026 and 2030, which Chapter 3 treats as a time-limited offset."),
    blk('s1p2', "Chapter 3 summarizes the combined effect for Vermont: all 14 hospitals face reduced Medicaid revenue, with the most severe effect on critical access hospitals that have a high Medicaid payer mix. It also notes that the rural fund expires in 2030 while Medicaid reductions accelerate after 2030, so the arithmetic is unforgiving."),
    callout('s1c1', "H.R. 1 changes Medicaid in two directions at once: it narrows eligibility and enrollment, and it tightens the financing that states and hospitals use to fund their share."),

    h2('s2h1', 'Eligibility and Enrollment Provisions'),
    blk('s2p1', "The work and community engagement requirement, section 71119, applies to adults aged 19 to 64 in the expansion group or covered by an expansion waiver. They must show at least 80 hours per month of work, community service or similar activity, or attend school at least half-time. The statute exempts, among others, parents of children 13 and under, people who are medically frail and people in substance use disorder treatment. It is effective not later than December 31, 2026, or earlier at state option, and the Secretary may exempt a state for good faith until no later than December 31, 2028. KFF reports CBO's estimate of a $326 billion reduction in federal Medicaid spending over ten years and 5.3 million more uninsured in 2034 from this provision."),
    blk('s2p2', "Section 71107 requires eligibility redeterminations every six months for expansion adults, for renewals scheduled on or after December 31, 2026. CBO estimated a $63 billion federal reduction and 700,000 more uninsured in 2034. Section 71112 limits retroactive coverage to one month before application for expansion enrollees and two months for traditional enrollees, effective January 1, 2027, with a $4 billion reduction and 100,000 more uninsured. Section 71109 narrows eligibility for certain immigrants, effective October 1, 2026, with a $6 billion reduction and 100,000 more uninsured."),
    blk('s2p3', "The pattern across these provisions is that eligibility is not lost by a single decision but by administrative failure: enrollees who still qualify lose coverage because they cannot document hours, miss a renewal notice or cannot show an exemption. Chapter 3 calls this coverage churn and notes that it falls hardest on working families. It is also why Medicaid agencies, not just enrollees, are the object of the law: staffing, notices, data matching and appeals processes decide how many eligible people are retained."),

    h2('s3h1', 'Financing Provisions'),
    blk('s3p1', "Section 71115 freezes new or increased provider taxes for all states and reduces the safe harbor for existing taxes in expansion states by 0.5 percent annually starting in fiscal year 2028, with a reduction effective October 1, 2027, until it reaches 3.5 percent in fiscal year 2032. CBO estimated a $191 billion federal reduction and 1.1 million more uninsured. Provider taxes are how many states raise the state share of Medicaid, so limiting them reduces the funding available to match federal dollars."),
    blk('s3p2', "Section 71116 caps state directed payments for inpatient hospital and nursing facility services at 100 percent of Medicare for expansion states and 110 percent for non-expansion states. Payments approved after May 1, 2025 above the limit do not take effect, except for rural hospitals. Existing payments above the limit are reduced by 10 percentage points each year until they reach the new limit, with reductions beginning January 1, 2028. CBO estimated a $149 billion federal reduction. State directed payments are how many states pay hospitals above standard Medicaid rates, so safety-net hospitals feel this provision most."),
    blk('s3p3', "Section 71118, which Lesson 8 covered, adds statutory budget neutrality for section 1115 demonstrations from January 1, 2027. Read together, the financing provisions reduce how much a state can raise, how much it can pay hospitals above base rates and how much flexibility it has through waivers."),

    h2('s4h1', 'Cost Sharing and Dates at a Glance'),
    blk('s4p1', "Section 71120 allows cost sharing of up to $35 per service for expansion adults with incomes between 100 and 138 percent of the federal poverty level, effective October 1, 2028. CBO estimated a $7 billion reduction. For enrollees at the margin of affordability, cost sharing becomes another place where coverage exists on paper but use falls."),
    table('s4t1', 'H.R. 1 Medicaid provisions: sections, dates and CBO estimates (KFF)', [
        {'Provision': 'Work and community engagement requirement (71119)', 'Effective': 'Not later than Dec 31, 2026; good-faith exemption to Dec 31, 2028', 'CBO_estimate': '$326B federal reduction; 5.3M more uninsured in 2034'},
        {'Provision': 'Six-month redeterminations for expansion adults (71107)', 'Effective': 'Renewals on or after Dec 31, 2026', 'CBO_estimate': '$63B; 700,000 more uninsured'},
        {'Provision': 'Retroactive coverage limits (71112)', 'Effective': 'Jan 1, 2027', 'CBO_estimate': '$4B; 100,000 more uninsured'},
        {'Provision': 'Immigrant eligibility (71109)', 'Effective': 'Oct 1, 2026', 'CBO_estimate': '$6B; 100,000 more uninsured'},
        {'Provision': 'Provider tax freeze and phase-down (71115)', 'Effective': 'Phase-down from Oct 1, 2027 (fiscal year 2028)', 'CBO_estimate': '$191B; 1.1M more uninsured'},
        {'Provision': 'State directed payment caps (71116)', 'Effective': 'New payments at enactment; reductions from Jan 1, 2028', 'CBO_estimate': '$149B'},
        {'Provision': 'Cost sharing for expansion adults (71120)', 'Effective': 'Oct 1, 2028', 'CBO_estimate': '$7B'},
    ]),
    warning('s4w1', "Do not add the table up", "CBO's provision-by-provision estimates overlap and interact, so their sum is not the law's total effect. Use them to compare provisions with one another, and use CBO's overall figures for the total."),

    h2('s5h1', 'What It Means in Practice'),
    blk('s5p1', "For a state Medicaid agency, the sequence is a project plan. October 2026 brought the immigrant eligibility change. The end of 2026 and January 2027 bring work requirements, six-month renewals and retroactive coverage limits. October 2027 begins the provider tax safe harbor reduction, and January 2028 begins the state directed payment step-downs. Each requires systems, staffing, notices and communication with enrollees and providers."),
    blk('s5p2', "For a hospital, the question is financial exposure. Which of the hospital's revenue streams depend on provider taxes or state directed payments? How many of its Medicaid patients are expansion adults who could lose coverage through churn? And what happens to uncompensated care if they do? Chapter 3 recommends building these exposures into hospital financial sustainability modeling, and the platform's H.R. 1 Cliff Scenario tool in the Research Lab is designed for the state-level version of the same question."),
    blk('s5p3', "For policy practitioners, the lesson is to watch implementation rather than only the statute. The law fixed the dates, but the rules for work requirements were set by an interim final rule in June 2026, an optional enforcement delay was announced in November 2026 and a federal court ruled on part of the rule in October 2026. Lesson 12 follows that sequence."),

    takeaway('tw', [
        "H.R. 1, Public Law 119-21, reduces federal health spending by over $1 trillion and increases the uninsured by about 10 million, according to CBO figures reported by KFF.",
        "The work requirement (section 71119) covers expansion adults aged 19 to 64, requires 80 hours a month, is effective by December 31, 2026, and allows a good-faith exemption to December 31, 2028.",
        "Section 71107 requires six-month renewals for expansion adults, and section 71112 limits retroactive coverage to one month for expansion enrollees from January 1, 2027.",
        "Section 71115 freezes new provider taxes and reduces the expansion-state safe harbor by 0.5 percent a year from fiscal year 2028 to 3.5 percent in fiscal year 2032.",
        "Section 71116 caps state directed payments at 100 percent of Medicare in expansion states and 110 percent elsewhere, with existing excess payments cut 10 percentage points a year from January 1, 2028.",
        "Section 71120 allows up to $35 per service cost sharing for expansion adults between 100 and 138 percent of poverty from October 1, 2028.",
        "CBO's provision estimates overlap and should not be summed; coverage losses arise mainly from administrative churn, so implementation capacity determines outcomes.",
    ]),
    quiz('qz',
        "What does section 71116 of H.R. 1 do?",
        [
            ("Requires 80 hours a month of work for expansion adults", False),
            ("Caps state directed payments at 100 percent of Medicare in expansion states and 110 percent in non-expansion states, phasing down existing excess payments", True),
            ("Allows up to $35 cost sharing per service for expansion adults", False),
            ("Requires budget neutrality certification for section 1115 demonstrations", False),
        ],
        "Section 71116 caps state directed payments for inpatient hospital and nursing facility services, at 100 percent of Medicare for expansion states and 110 percent for non-expansion states. Existing payments above the limit are reduced by 10 percentage points each year from January 1, 2028. The work requirement is section 71119, cost sharing is section 71120 and budget neutrality is section 71118."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] KFF, Health Provisions in the 2025 Federal Budget Reconciliation Law (August 22, 2025, updated) — https://www.kff.org/medicaid/issue-brief/health-provisions-in-the-2025-federal-budget-reconciliation-law/ — section numbers, effective dates and CBO estimates"),
    blk('src2', "[2] CMS, State Medicaid Director Letter SMD #26-003 (June 11, 2026) — https://www.medicaid.gov/federal-policy-guidance/downloads/smd26003.pdf — section 71118 and budget neutrality"),
    blk('src3', "[3] " + BOOK3 + " — §3.6 and Figure 3.4: H.R. 1 provisions, timeline, financial impact and Vermont implications"),
    blk('src4', "[4] Public Law 119-21 (the 2025 reconciliation law), Title VII, Subtitle B (Medicaid) — as cited by KFF and CMS"),
    blk('src5', "[5] HTR Research Lab, H.R. 1 Cliff Scenario — https://healthtransformationreview.org/research-lab/policy-quality?tab=hr1-cliff"),
]

# ════════════════════════════════════════════════════════════════════════════
# Lesson 12 facts: CMS fact sheet for the June 1, 2026 interim final rule (CMS-2454-IFC), read; CMS press release of
# Nov 13, 2026 (hold harmless through June 30, 2027), read; AHA News article of Oct 30, 2026 on the District of
# Massachusetts ruling, read; KFF (statute text). The CMS guidance letter SMD #26-006 and the court opinion itself were
# not read. Vermont: HTR book Chapter 3 §3.3.2 and §3.6 (DVHA notifying members).
L12_SLUG = 'cmmi-work-requirements-implementation'
L12_TITLE = 'Medicaid Work Requirements: The Rule, the Delay and the Court'
L12 = [
    blk('intro1', "No part of H.R. 1 has moved as much since enactment as the Medicaid work requirement. The statute set a start date and a framework. CMS then issued an interim final rule in June 2026, a federal court vacated part of that rule in October, and in November CMS announced an optional enforcement delay. A state official or hospital planner who read only the statute would be wrong about what applies on January 1, 2027."),
    blk('intro2', "This lesson reconstructs the sequence from CMS's fact sheet on the rule, CMS's November 2026 press release and the report of the court decision, each of which the lesson read. It then sets out what the rule requires, what remains open, and what a state or organization should do while it does."),
    blk('intro3', "Because the rule and its court challenge are still developing, treat this lesson as a dated snapshot, current to late November 2026, and check the sources before acting on any detail."),

    h2('s1h1', 'The Statutory Starting Point'),
    blk('s1p1', "Section 71119 of H.R. 1, as Lesson 11 showed, requires adults aged 19 to 64 in the Medicaid expansion group or an expansion waiver to show at least 80 hours a month of work or similar activity, or half-time school attendance. The statute lists exemptions, including parents of children 13 and under, the medically frail and people in substance use disorder treatment, and sets an effective date of not later than December 31, 2026. The Secretary may grant a good-faith exemption to a state until no later than December 31, 2028."),
    blk('s1p2', "Chapter 3 applies the statute to Vermont: as an expansion state it must apply the requirement from January 1, 2027, and the Department of Vermont Health Access had begun notifying members. The statute left details open: how to verify compliance, what counts as qualifying activity, how to define medical frailty and what procedural protections apply. The interim final rule addressed those."),

    h2('s2h1', 'What the June 2026 Rule Requires'),
    blk('s2p1', "CMS issued the interim final rule on June 1, 2026. Its fact sheet says the requirement applies to non-pregnant adults aged 19 to 64 who are not entitled to or enrolled in Medicare, in the Medicaid adult group or certain section 1115 demonstrations, and names 43 states and the District of Columbia as affected, with territories excluded. Other analysts counted the affected states differently, so a state should confirm its own status."),
    blk('s2p2', "The 80-hour requirement can be met in several ways. Qualifying options include work, an educational program at least half-time, a combination of activities, or income of at least the federal minimum wage multiplied by 80 hours, which CMS puts at $580 a month in 2026. Exemptions include pregnant and postpartum people, people who are disabled or medically frail, parents and caretakers of a child under 14, American Indians and Alaska Natives, former foster youth, veterans with a total disability, people in substance use disorder treatment and inmates. States may add short-term hardship exceptions, including for counties with unemployment of at least 8 percent or 1.5 times the national average."),
    blk('s2p3', "Verification is where the work lies. New applicants must meet the requirement for at least one month before the month they apply; existing enrollees must meet it for one or more months between renewals. States verify at application and renewal, and may verify more often. If compliance cannot be verified, the state sends a notice and gives the person 30 calendar days to show compliance or an exemption. CMS set a state implementation deadline of no later than January 1, 2027, and comments on the interim rule were due July 31, 2026."),
    steps('s2st1', 'The verification path under the interim final rule', [
        ('Screen for exclusions', 'Check whether the person is exempt, such as pregnant, medically frail, caring for a child under 14 or in treatment.'),
        ('Verify activity', 'Use data matching and documents to confirm 80 hours, school attendance or qualifying income.'),
        ('Notice', 'If compliance cannot be verified, send a notice.'),
        ('30 days to respond', 'The person has 30 calendar days to show compliance or an exemption.'),
        ('Decision', 'Only after that process may coverage be affected, subject to the state\'s procedures and any hold harmless period.'),
    ]),

    h2('s3h1', 'The October Court Ruling'),
    blk('s3p1', "The rule's definition of medical frailty drew the sharpest dispute. KFF reported that the rule requires a more restrictive definition than states expected, with the person having to demonstrate a qualifying condition that significantly impairs their ability to meet the requirement. Twenty-five states and the District of Columbia challenged the definition in the U.S. District Court for the District of Massachusetts."),
    blk('s3p2', "According to the American Hospital Association's report, Judge Richard Stearns ruled on October 29, 2026 to vacate CMS's definition, saying CMS went beyond its scope in authorizing and narrowing it. The report states that the remaining provisions of the community engagement requirements will be enforced beginning January 1, 2027. The report does not say whether the relief applies nationwide or only to the plaintiff states, and this lesson did not read the court's opinion. Whether the federal government appeals is unknown as of this lesson's sources."),
    warning('s3w1', "What the ruling does and does not settle", "Based on the sources read, the medically frail definition was vacated and the remaining provisions stand. The scope of the relief, the status of any appeal and what definition states should use meanwhile are open questions. Read the opinion and CMS's follow-up guidance before building an exemption process."),

    h2('s4h1', 'The November Hold Harmless Period'),
    blk('s4p1', "On November 13, 2026, CMS announced an optional hold harmless period through and including June 30, 2027. States that implement it will assess whether individuals meet the work requirement or are excluded, but will not deny applications or disenroll otherwise eligible individuals solely for failure to meet the requirement. The work requirement still starts on January 1, 2027, and CMS strongly encourages states to use the period to maximize automated verification, make the process clear and easy to navigate, test and strengthen end-to-end processes and promote its Paths to Prosperity effort."),
    blk('s4p2', "The press release does not say whether a state must request approval or submit an attestation. It points to a CMS State Medicaid Director letter, SMD #26-006, for the mechanism, which this lesson did not read. A state or advisor should read that letter to know the conditions. The period is optional, so states may choose to begin enforcement on January 1."),
    blk('s4p3', "The practical effect is a six-month rehearsal for states that opt in. Systems, notices and appeals run, and coverage is not lost for non-compliance alone, which gives agencies time to find and fix errors before anyone loses coverage. It does not change the underlying statute, which still sets the requirement and the good-faith exemption process."),

    h2('s5h1', 'What Vermont and Other States Should Do Now'),
    blk('s5p1', "The planning problem has four parts. First, decide whether to use the hold harmless period, after reading SMD #26-006. Second, build or confirm the verification pipeline, including data matching against wage, tax and benefit records, since the rule rewards automated verification. Third, design exemption identification, particularly for medical frailty, in a way that will survive whichever definition ultimately applies. Fourth, communicate with enrollees early and often, since coverage loss from this provision comes largely from people who qualify but cannot document it."),
    blk('s5p2', "For hospitals and community organizations, the implications are equally concrete. Expect enrollees to need help with documentation, and consider whether the organization can assist with activity verification. Model the financial effect of coverage loss with the platform's Work Requirements Calculator and the H.R. 1 Cliff Scenario, and use the Medicaid Eligibility Simulator to test how specific households move between coverage categories. Chapter 3 lists all three tools for this chapter."),
    blk('s5p3', "Because the platform's calculators were built before the interim final rule, the November delay and the court ruling, their assumptions about exemptions, look-back and timing should be compared with the sources in this lesson before the outputs are relied on."),

    takeaway('tw', [
        "Section 71119 sets an 80-hour monthly requirement for expansion adults aged 19 to 64, effective not later than December 31, 2026, with a good-faith state exemption possible to December 31, 2028.",
        "CMS's June 1, 2026 interim final rule applies the requirement to adults 19 to 64 in the adult group or certain 1115 demonstrations and lists qualifying activities, exemptions and verification steps; the state deadline is January 1, 2027.",
        "The rule's qualifying income alternative is the federal minimum wage times 80 hours, which CMS puts at $580 a month in 2026.",
        "If compliance cannot be verified, a state sends a notice and the person has 30 calendar days to show compliance or an exemption.",
        "On October 29, 2026 a federal district court in Massachusetts vacated CMS's definition of medically frail, according to the AHA; the scope of relief and any appeal were not stated.",
        "On November 13, 2026 CMS announced an optional hold harmless period through June 30, 2027, during which states will not deny applications or disenroll eligible people solely for failure to meet the requirement.",
        "Check SMD #26-006 and the court opinion before relying on any detail; the situation is changing and the platform's calculators should be reviewed against current rules.",
    ]),
    quiz('qz',
        "What does CMS's optional hold harmless period, announced November 13, 2026, allow states to do?",
        [
            ("Skip assessing whether individuals meet the work requirement at all", False),
            ("Assess whether individuals meet the requirement or are excluded, without denying applications or disenrolling otherwise eligible people solely for failing to meet it, through June 30, 2027", True),
            ("Delay the statutory start of the work requirement to 2029", False),
            ("Apply the work requirement to Medicare beneficiaries", False),
        ],
        "The CMS press release says states that implement the hold harmless period will assess whether individuals meet the work requirement or are excluded but will not deny applications or disenroll otherwise eligible individuals solely for failure to meet the requirement, through and including June 30, 2027. The requirement itself still starts January 1, 2027."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS, fact sheet on the interim final rule, Medicaid Community Engagement Requirement for Certain Individuals (June 1, 2026) — https://www.cms.gov/newsroom/fact-sheets/medicaid-community-engagement-requirement-certain-individuals-interim-final-rule-comment-period-cms — who must comply, 80 hours, exemptions, look-back, verification, state deadline"),
    blk('src2', "[2] CMS, press release, CMS Announces a Hold Harmless Period to Strengthen Medicaid Work Requirement Systems and Improve Beneficiary Experience (November 13, 2026) — https://www.cms.gov/newsroom/press-releases/cms-announces-hold-harmless-period-strengthen-medicaid-work-requirement-systems-improve-beneficiary"),
    blk('src3', "[3] American Hospital Association News, Court strikes medically frail definition in Medicaid community engagement requirements (October 30, 2026) — https://www.aha.org/news/headline/2026-10-30-court-strikes-medically-frail-definition-medicaid-community-engagement-requirements"),
    blk('src4', "[4] KFF, The Medical Frailty Exemption from Medicaid Work Requirements: Key Takeaways from the CMS Interim Final Rule — https://www.kff.org/medicaid/the-medical-frailty-exemption-from-medicaid-work-requirements-key-takeaways-from-the-cms-interim-final-rule/"),
    blk('src5', "[5] KFF, Health Provisions in the 2025 Federal Budget Reconciliation Law — https://www.kff.org/medicaid/issue-brief/health-provisions-in-the-2025-federal-budget-reconciliation-law/ — section 71119 text and effective date"),
    blk('src6', "[6] " + BOOK3 + " — §3.3.2 and §3.6: work requirements and Vermont's January 1, 2027 start; Figure 3.5 platform tools"),
    blk('src7', "[7] HTR Research Lab, Work Requirements Calculator — https://healthtransformationreview.org/research-lab/policy-quality?tab=medicaid-wr; Medicaid Eligibility Simulator — https://healthtransformationreview.org/medicaid-eligibility-simulator"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
