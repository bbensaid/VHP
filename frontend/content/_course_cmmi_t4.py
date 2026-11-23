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

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10)]
if __name__ == '__main__':
    run(LESSONS)
