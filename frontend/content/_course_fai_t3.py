exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_fai_common.py').read())

# Track 3 — Clinical Decision Support. Evidence on alert override rates comes from review articles surfaced by search on
# 2026-11-23 (Poly et al., JMIR Med Inform 2020: 23 articles, override rates 46.2%-96.2%; a preprint meta-analysis by
# O'Sullivan, Starkey and Pirmohamed pooling 44 studies for drug-drug interaction alerts at 79.8% (95% CI 73.0-86.7%),
# NOT peer reviewed; Ray et al. 2026 systematic review of reviews on inconsistent definitions; Hussain et al., JAMIA 2019 on
# role-tailoring). The summaries, not the articles, were read; figures are labelled accordingly. Population health CDS types
# and Vermont applications are HTR book Chapter 5 §5.4 and are labelled the book's. RPM rates are the platform Digital Health
# Lab's CY2026 values (read from source, noted there as verified 2026-10-12 against CY2026 PFS billing summaries); revenue
# arithmetic below is this course's own, at stated illustrative percentages.

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'fai-alert-fatigue'
L7_TITLE = 'Alert Fatigue: Why Most Decision Support Is Ignored'
L7 = [
    blk('intro1', "Clinical decision support is any technology that uses data to influence a clinical decision at the point of care. It ranges from a simple allergy warning every record system includes to a model that predicts which patients will be hospitalized in the next month. Chapter 5 says the challenge is not building it but building it well enough that clinicians use it instead of ignoring it, and it names alert fatigue as one of the most documented failures of health information technology."),
    blk('intro2', "This lesson reviews what the research literature says about how often alerts are overridden, the chapter's claim that alert fatigue is a design problem and not a clinician behavior problem, three design principles and how to measure and fix an alert portfolio. It is candid about the evidence: the studies the lesson draws on were read as summaries, one pooled estimate comes from a preprint, and the field itself lacks a consistent definition."),
    blk('intro3', "The practical outcome is an alert inventory method any hospital can run."),

    h2('s1h1', 'How Often Are Alerts Overridden?'),
    blk('s1p1', "Reviews of the literature report high override rates with wide variation. A peer-reviewed systematic review of alerts in computerized order entry, published in JMIR Medical Informatics in 2020 and covering 23 articles, reported average override rates between 46.2 and 96.2 percent and concluded that override rates are high and that some categories of override were more often inappropriate. Another review cited in a hospital governance paper put the range for drug safety alerts at 49 to 96 percent. A 2025 preprint that pooled 44 studies of drug interaction alerts estimated an overall override rate of 79.8 percent, with individual studies from 55.4 to 95.7 percent, but because the preprint has not been peer reviewed the figure should be treated cautiously."),
    blk('s1p2', "The most important finding may be about the field itself. A 2026 systematic review of systematic reviews found that alert fatigue is inconsistently defined across the literature, so pooled override percentages may not be directly comparable. Override is also not by itself a measure of harm: some overrides are correct, since an alert may fire in a case where the clinician knows better. The consistent message is that a large majority of alerts in many settings are dismissed, and that this is a signal about the alerts."),
    callout('s1c1', "A high override rate does not prove clinicians are careless. In most cases it shows the alert fires too often, too early or too vaguely to be useful."),

    h2('s2h1', 'A Design Problem, Not a Behavior Problem'),
    blk('s2p1', "Chapter 5 states the position directly: alert fatigue is not a clinician behavior problem but a design problem. When most alerts are overridden, the alerts are generating noise instead of signal, and the alert system has failed. The framing matters for what an organization does. If the cause is clinician behavior, the response is education and exhortation. If the cause is design, the response is to change the alerts, which is something the organization controls."),
    blk('s2p2', "The chapter gives three principles that most record-system default configurations violate. Specificity: alerts should fire only when the evidence strongly supports action, not whenever a vague threshold is crossed. Actionability: every alert should offer a recommended action that the clinician can take immediately with minimal additional clicks. Workflow integration: alerts should appear at the moment when the clinician is making the relevant decision, not before or after it. An alert that violates any one of these will be overridden whatever its clinical merit."),
    steps('s2st1', 'Three principles of effective decision support (HTR Chapter 5)', [
        ('Specific', 'Fire only when the evidence strongly supports action, not on a vague threshold.'),
        ('Actionable', 'Offer a recommended action the clinician can take at once, with minimal clicks.'),
        ('Integrated', 'Appear at the moment of the relevant decision, in the relevant screen.'),
    ]),

    h2('s3h1', 'What the Research Says Works'),
    blk('s3p1', "The literature offers a few consistent design lessons. A 2019 systematic review in the Journal of the American Medical Informatics Association by Hussain and colleagues, which looked at how interaction design and tailoring by clinical role affect alert acceptance, found that giving prescribers and pharmacists different alerts was the most successful approach for reducing alert fatigue. In general, tiering alerts by severity, so that only the highest-risk interruptions stop the clinician, and sending lower-risk information to a passive display, reduces interruption without removing information."),
    blk('s3p2', "Other practical measures follow from the principles. Suppress alerts that duplicate each other. Retire alerts with very high override rates and no evidence of benefit. Tune thresholds using local data instead of vendor defaults. And involve the clinicians who receive the alerts in deciding which to keep, since they know which ones are ignored and why. These measures need governance: someone has to own the alert portfolio, and the committee that approves a new alert should also approve retiring an old one."),

    h2('s4h1', 'An Alert Inventory Method'),
    blk('s4p1', "A hospital can improve its decision support without buying anything by running an inventory. List every interruptive alert in the record system, with its owner, its trigger and its target user. For each, pull three months of data: how often it fired, how often it was overridden or ignored, how long it took and what happened afterward, such as whether the recommended order was placed. Rank by volume and by override rate. The alerts at the top of both lists are the first candidates for redesign or retirement."),
    table('s4t1', 'An alert inventory worksheet', [
        {'Column': 'Alert and owner', 'Question': 'What is it, who approved it and who is responsible for its content?'},
        {'Column': 'Volume', 'Question': 'How many times a month does it fire, and for how many clinicians?'},
        {'Column': 'Override and acceptance', 'Question': 'What share are overridden, and what reasons are given?'},
        {'Column': 'Evidence', 'Question': 'Is there evidence the alert improves outcomes, and for which patients?'},
        {'Column': 'Action', 'Question': 'Keep, tune, tier, redirect to a passive display, or retire?'},
    ]),
    blk('s4p2', "Measure what happens after changes. Track the number of interruptive alerts per clinician per shift, the override rate of the retained alerts and, where possible, the clinical outcome the alert is meant to affect. A reduction in volume with no loss of clinical effect is a success. A reduction with a loss of effect means a useful alert was removed and should be restored in a better form."),
    warning('s4w1', "Do not cut alerts on override rates alone", "A low-volume alert with a high override rate might be catching rare, serious events. Look at the clinical stakes before retiring it, and involve a clinician in the decision."),

    h2('s5h1', 'Governing the Alert Portfolio'),
    blk('s5p1', "Alert fatigue persists because no one owns the total. Each department asks for an alert that solves its problem, each seems reasonable on its own and the clinician receives all of them. A governance structure for decision support addresses this directly. A committee with clinicians, pharmacists, nurses, informatics staff and quality leaders approves each new interruptive alert against criteria: the evidence, the expected action, the expected volume and an owner who will review it after a trial period. It also reviews the existing portfolio on a schedule, so that approval and retirement come from the same table."),
    blk('s5p2', "A useful rule is an alert budget. Decide how many interruptive alerts a clinician can reasonably receive per shift, measure the current number and require any proposed addition to offset itself by retiring or tiering another. The rule makes the cost of an alert visible. It also protects against a failure the research shows: an organization that adds alerts over years without removing any ends with a system in which the important ones are lost among the rest."),
    blk('s5p3', "The same discipline applies to artificial intelligence outputs delivered in the workflow. A model that adds an alert should pass the same tests, and its sponsors should be able to say what existing alert it replaces. Treating AI as a source of alerts, not a separate category, keeps the clinician's experience in view."),

    takeaway('tw', [
        "Reviews report override rates for decision support alerts commonly between roughly 50 and 96 percent, with a pooled preprint estimate of 79.8 percent for drug interaction alerts that has not been peer reviewed.",
        "Alert fatigue is inconsistently defined in the literature, so pooled percentages may not be directly comparable.",
        "Chapter 5 says alert fatigue is a design problem, not a clinician behavior problem; effective decision support is specific, actionable and integrated into the workflow.",
        "Research on interaction design found that giving prescribers and pharmacists different alerts was the most successful approach to reducing alert fatigue.",
        "Run an alert inventory: list interruptive alerts, measure volume, override and outcome, and keep, tune, tier or retire each.",
        "Assign an owner to the alert portfolio so that approving a new alert also means reviewing an old one.",
        "Do not retire a low-volume, high-override alert without checking whether it catches rare, serious events.",
    ]),
    quiz('qz',
        "How does Chapter 5 characterize alert fatigue?",
        [
            ("As a clinician behavior problem solved by training", False),
            ("As a design problem: when most alerts are overridden, the alerts generate noise rather than signal", True),
            ("As a problem that only affects rural hospitals", False),
            ("As an unavoidable feature of electronic records", False),
        ],
        "The chapter says alert fatigue is not a clinician behavior problem but a design problem. Effective alerts are specific, actionable and integrated into the workflow."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.4 and §5.4.1: clinical decision support and alert fatigue; §5.9: key concepts"),
    blk('src2', "[2] Poly TN et al., Appropriateness of Overridden Alerts in Computerized Physician Order Entry: Systematic Review, JMIR Medical Informatics 2020 — https://medinform.jmir.org/2020/7/e15653/ — override rate range 46.2-96.2 percent across 23 articles, as summarized by search"),
    blk('src3', "[3] Hussain and colleagues, systematic review of interaction design and clinical role tailoring in alert acceptance, J Am Med Inform Assoc 2019 — summary surfaced by search; O'Sullivan, Starkey and Pirmohamed, preprint meta-analysis of drug interaction alert overrides (2025) — https://preprints.jmir.org/ (not peer reviewed)"),
    blk('src4', "[4] Ray et al., systematic review of systematic reviews of alert fatigue (2026) — https://www.metrohealth.org/globalassets/metrohealth-documents/population-health-research-institute/ray-wilson-et-al-2026-alert-fatigue-systematic-review.pdf — inconsistent definitions, as summarized by search"),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'fai-population-health-cds'
L8_TITLE = 'Population Health Decision Support: Four Types and Their Vermont Applications'
L8 = [
    blk('intro1', "The decision support most hospitals know is medication alerts and order sets. Chapter 5 argues that for a transformation agenda the highest-value application is different: population health intelligence that finds patients likely to deteriorate, flags care gaps before patients present in crisis, screens for social needs at the moment of a visit and watches medication safety across several prescribers. This lesson describes the four types, what each requires, the Vermont applications the chapter gives and where each can go wrong."),
    blk('intro2', "The Vermont applications are the book's descriptions, and this lesson did not independently verify the current state of Blueprint screening or of the statewide claims database. Where a claim about equity or effectiveness draws on a study, the lesson cites it."),
    blk('intro3', "A theme runs through all four: the technology is the easy part. Each depends on a workflow and an owner who will act on the output."),

    h2('s1h1', 'Type One: Predictive Risk Stratification'),
    blk('s1p1', "Risk stratification uses machine learning on claims, record and demographic data to predict which patients are likely to be hospitalized or visit the emergency department in the next 30 to 90 days, generating a risk score and a recommended care management action. The requirements are attribution data, historical claims, access to the record, a trained risk model and, critically, a care management workflow to receive and act on the high-risk list. Chapter 5's Vermont application is risk stratification of the attributed Medicare population using the state's all-payer claims data, identifying the top 5 percent highest-risk patients for intensive community health team engagement before global budgets take effect."),
    blk('s1p2', "The finance course showed why the workflow matters: the return on care management depends on how many events are actually prevented and on who keeps the savings. A model that identifies a risk list nobody calls creates cost and no benefit. The course also noted a caution from published research on a widely used algorithm that used cost as its target and under-identified Black patients with the same illness burden because less had been spent on their care. A stratification model should be checked for subgroup performance before it directs scarce staff time."),

    h2('s2h1', 'Type Two: Care Gap Identification'),
    blk('s2p1', "Care gap tools identify patients due for preventive services, overdue for chronic disease follow-up or missing guideline-recommended medications, and surface the gap at the moment of a primary care visit. The requirements are record integration, measure definitions such as those for quality reporting, and a registry that tracks the date of each patient's last service. The chapter's Vermont example is a care gap report generated for each scheduled patient appointment in a Blueprint medical home practice, so a care coordinator can prepare outreach materials before the visit."),
    blk('s2p2', "This type is less glamorous than prediction and often more useful, because the action is clear and the evidence for most preventive measures is strong. The pitfalls are data accuracy and burden. A gap that is wrongly flagged, because a service was done elsewhere and not recorded, wastes time and teaches staff to distrust the tool. Reconciliation of outside records, which depends on the interoperability work in Track 1, directly improves the tool."),
    callout('s2c1', "Care gap tools are only as good as the data behind them. A wrong gap costs a visit's time and some of the clinician's trust."),

    h2('s3h1', 'Type Three: Social Needs Screening and Navigation'),
    blk('s3p1', "Screening tools present standardized questions about housing, food, transportation and similar needs at the right point in a visit, flag positive screens for follow-up by a community health team and track whether the referral was completed. The requirements are an integrated screening tool, a team workflow to receive referrals and a community resource directory. The chapter describes universal health-related social needs screening as operational in Vermont's medical home practices, and identifies a gap: follow-up completion tracking and outcome measurement are not consistently linked back to the clinical record."),
    blk('s3p2', "That gap is the difference between screening and care. A screen that finds a need and sends it nowhere has recorded a problem. The measure that matters is the share of positive screens that reach a navigator, the share of referrals that result in the service and the effect on the patient's outcomes, and the tool should make each visible. Federal policy for funding such services also changed in 2025, as the finance and CMMI courses described: existing approvals stand, and new requests are considered case by case, so the screening program may have to rest on state and local funding."),

    h2('s4h1', 'Type Four: Medication Safety and Adherence'),
    blk('s4p1', "The fourth type identifies adherence gaps from pharmacy claims and flags potential interactions from concurrent prescriptions across multiple providers. It requires pharmacy claims access and a prescriber notification workflow. The chapter's Vermont application links state claims data on pharmacy fills to primary care records for adherence alerts, which is particularly valuable for high-complexity older patients with many prescribers."),
    blk('s4p2', "This is the type in which claims data adds something the record cannot. A clinician sees what they prescribed; claims show what the patient actually filled, and from whom. The cost is latency, since claims arrive after the fact, and consent and privacy limits on certain categories of data. Because the alerts go to prescribers, the lessons about specificity and alert volume from the previous lesson apply fully."),
    table('s4t1', 'Four types of population health decision support (HTR Figure 5.2, summarized)', [
        {'Type': 'Predictive risk stratification', 'What_it_does': 'Predicts hospitalization or ED use in 30-90 days; recommends care management', 'Needs': 'Attribution, claims, record access, trained model, care management workflow', 'Vermont_application_per_book': 'Claims-based stratification of attributed Medicare patients; top 5% for intensive team engagement'},
        {'Type': 'Care gap identification', 'What_it_does': 'Flags overdue preventive and chronic care at the visit', 'Needs': 'Record integration, measure definitions, registry with last service dates', 'Vermont_application_per_book': 'Care gap report for each scheduled appointment in medical home practices'},
        {'Type': 'Social needs screening and navigation', 'What_it_does': 'Screens at the visit; flags positives for team follow-up; tracks referrals', 'Needs': 'Integrated screening tool, team workflow, resource directory', 'Vermont_application_per_book': 'Universal screening operational; gap in follow-up tracking'},
        {'Type': 'Medication safety and adherence', 'What_it_does': 'Finds fill gaps and interaction risks across prescribers', 'Needs': 'Pharmacy claims, prescriber notification workflow', 'Vermont_application_per_book': 'Claims-linked adherence alerts for complex older patients'},
    ]),

    blk('s4p3', "Across all four types the output has to reach a person at a time they can act. A risk list delivered monthly to a team that meets quarterly, a care gap report available only after the visit, or an adherence alert sent to a prescriber who has no way to respond are all examples of a technically correct output arriving too late or in the wrong place. Mapping the time from signal to action, and shortening it, is as important as improving the model."),
    blk('s4p4', "Consider what the clinician sees in each case. In a primary care visit, a care gap report, a positive social needs screen and a medication adherence flag might all appear for one patient. If each arrives as a separate pop-up, the clinician will dismiss them. If they arrive as a single, prioritized pre-visit summary prepared by a care coordinator, the clinician sees what matters in one place. Part of the design of population health support is deciding who prepares the information and in what form, which is a workflow question more than a software question."),
    h2('s5h1', 'Common Requirements and Common Failures'),
    blk('s5p1', "Across the four types, three requirements recur. A defined population, because every type depends on knowing whom the organization is responsible for. A workflow owner, a named team that receives the output and acts. And a feedback loop, so that results of the action return to the system and improve it. The common failures mirror them: tools built for a population that is not attributed to the organization, outputs delivered to people with no capacity to act, and no measurement of whether the action changed anything."),
    blk('s5p2', "Equity is the cross-cutting concern. A tool that works better for patients who already use care will widen gaps. The governance lifecycle from Track 2 applies: baseline, subgroup monitoring and a way to report problems. Chapter 5 also asks that tools be evaluated for whether they perpetuate or reduce the disparities Vermont's transformation is designed to close."),

    takeaway('tw', [
        "Chapter 5 says the highest-value decision support for transformation is population health intelligence, not medication alerts.",
        "Predictive risk stratification needs attribution data, claims, a trained model and a care management workflow; the chapter's Vermont use is identifying the top 5 percent highest-risk attributed Medicare patients.",
        "Care gap tools need record integration and a registry; wrong gaps waste time and erode trust, so reconcile outside records.",
        "Social needs screening is operational in Vermont medical homes according to the chapter, with a gap in tracking follow-up completion and outcomes.",
        "Medication safety tools link pharmacy claims to prescribing; they add what the record cannot but suffer latency and privacy limits.",
        "Each type needs a defined population, a workflow owner and a feedback loop.",
        "Check every tool for subgroup performance and for whether it narrows or widens existing disparities.",
    ]),
    quiz('qz',
        "What gap does Chapter 5 identify in Vermont's social needs screening?",
        [
            ("There is no screening in any practice", False),
            ("Follow-up completion tracking and outcome measurement are not consistently linked back to the clinical record", True),
            ("Screening is not permitted by federal law", False),
            ("Screens are only offered in emergency departments", False),
        ],
        "The chapter says universal screening is operational in medical home practices but that tracking whether referrals are completed, and what happens afterward, is not consistently linked back to the clinical record."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.4.2 and Figure 5.2: population health decision support types and Vermont applications"),
    blk('src2', "[2] Obermeyer Z, Powers B, Vogeli C, Mullainathan S. Dissecting racial bias in an algorithm used to manage the health of populations. Science 2019;366(6464):447-453 — https://doi.org/10.1126/science.aax2342"),
    blk('src3', "[3] CMS, Informational Bulletin rescinding guidance on health-related social needs (March 4, 2025) — https://www.medicaid.gov/federal-policy-guidance/downloads/cib03042025.pdf — existing approvals stand; new requests case by case"),
    blk('src4', "[4] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — medical home practices and community health teams"),
]

# ════════════════════════════════════════════════════════════════════════════
L9_SLUG = 'fai-digital-health-and-rollout'
L9_TITLE = 'Digital Health and Decision Support in Rollout: A Worked RPM Example'
L9 = [
    blk('intro1', "Remote patient monitoring is a good case for the whole chapter in miniature. It is a technology with billing codes that make its economics visible, a clinical workflow that decides whether it works, a governance question about the algorithms in the devices and a decision support question about what the clinician does with the readings. This lesson uses the platform's Digital Health Lab to work an example, then turns it into a checklist for rolling out any decision support tool."),
    blk('intro2', "The reimbursement rates are those recorded in the Digital Health Lab's source notes as the Medicare Physician Fee Schedule national non-facility rates for calendar year 2026, which the tool's authors say were checked in October 2026 against billing summaries. Localities differ, and rates and codes change every year. The arithmetic in the worked example is this course's own, with stated illustrative assumptions."),
    blk('intro3', "The lesson's point is the structure of the analysis: revenue is only one side, and the clinical effect is what decides whether the program is worth running."),

    h2('s1h1', 'What Medicare Pays For'),
    blk('s1p1', "The Digital Health Lab models remote physiologic monitoring with the 2026 codes. Device setup, code 99453, pays $21.71 once. Device supply for 16 or more days of readings in a month, code 99454, pays $52.11 a month; a new code for 2026, 99445, covers 2 to 15 days and pays the same. Management by clinical staff, code 99457, covers the first 20 minutes of interactive time in a month and pays $51.77; another new 2026 code, 99470, pays $26.05 for 10 to 19 minutes with a real-time interaction and cannot be billed with 99457 in the same month. Code 99458 pays $41.42 for each additional 20 minutes."),
    blk('s1p2', "Those rules mean revenue depends on use. A patient who transmits only a few days of readings does not generate the 16-day supply payment under the full code, and management payments require documented interactive time. A program that enrolls patients and does not engage them earns little."),

    h2('s2h1', 'A Worked Example'),
    blk('s2p1', "Take 200 patients enrolled for a full year, with 70 percent of patients having a month with 20 or more minutes of management, and 40 percent having an additional 20-minute increment, and ignore the new 2026 codes and any other revenue. Per patient per year, the setup payment is $21.71. The supply payment is $52.11 times 12, which is $625.32. Management at 70 percent of months is 0.70 times $51.77 times 12, which is $434.87. Additional time at 40 percent of months is 0.40 times $41.42 times 12, which is $198.82. The total is about $1,281 per patient, or about $256,000 for 200 patients."),
    blk('s2p2', "This is revenue, not margin. Against it the program has device costs, staff time for monitoring and outreach, software, training and billing overhead, none of which this lesson has numbers for. The tool lets a user enter these. The test is whether revenue plus avoided costs exceeds cost under the organization's own payment arrangement."),
    blk('s2p3', "Chapter 7's cost-saving illustration, in the finance chapter, is a heart failure program: in a population of 200 high-risk patients, preventing 10 percent of 30-day readmissions at a 30 percent readmission rate prevents about six readmissions, which at an assumed $15,000 each saves $90,000 a year. These are the book's illustrative assumptions. In a fee-for-service setting the avoided readmissions reduce hospital revenue, while under a global budget the hospital keeps the saving, as the finance course explained. The same program can therefore look very different to different payers and providers."),
    table('s2t1', 'Illustrative RPM economics for 200 patients (this course\'s arithmetic)', [
        {'Line': 'Setup (99453), one time', 'Calculation': '200 x $21.71', 'Annual_amount': '$4,342'},
        {'Line': 'Device supply (99454), 12 months', 'Calculation': '200 x $52.11 x 12', 'Annual_amount': '$125,064'},
        {'Line': 'Management (99457) in 70% of months', 'Calculation': '200 x 0.70 x $51.77 x 12', 'Annual_amount': '$86,974'},
        {'Line': 'Additional time (99458) in 40% of months', 'Calculation': '200 x 0.40 x $41.42 x 12', 'Annual_amount': '$39,763'},
        {'Line': 'Total revenue, before costs', 'Calculation': 'Sum', 'Annual_amount': 'About $256,143'},
    ]),
    warning('s2w1', "Revenue is not value", "A monitoring program that bills well but does not reduce admissions has produced paperwork. A program that reduces admissions but cannot cover its staff cost has produced a deficit. Evaluate both."),

    h2('s3h1', 'From Readings to Decisions'),
    blk('s3p1', "Monitoring generates data, and decision support turns data into action. A reading outside a threshold should reach a named clinician, with the patient's context and a suggested response, and the response should be recorded. A system that sends every out-of-range reading as an interruptive alert reproduces the alert fatigue problem of the first lesson of this track. Tiering helps: an urgent threshold alerts a nurse at once, a trend over several days appears in a daily review list, and a routine reading is stored."),
    blk('s3p2', "The device's own algorithms raise governance questions. If the vendor uses a model to flag deterioration, the lifecycle questions apply: what is its validation, is it a regulated device, how is its performance monitored and is it tested for subgroups. A rural population with different baselines, older ages and limited broadband may behave differently than the device was validated on."),

    h2('s4h1', 'A Rollout Checklist'),
    steps('s4st1', 'Rolling out a decision support or monitoring tool', [
        ('Define the population and the outcome', 'Whom is it for, and what change will count as success, with a baseline?'),
        ('Name the workflow and the owner', 'Who receives the output, what do they do and how is it recorded?'),
        ('Set the alert and escalation design', 'Specific, actionable and integrated; tiered by urgency; reviewed after a month.'),
        ('Run the governance lifecycle', 'Pre-deployment questions, training, monitoring and vendor terms.'),
        ('Model the economics under your payment arrangement', 'Revenue, cost and avoided cost with the share the organization keeps.'),
        ('Pilot, measure and decide', 'A small pilot with prespecified measures and a decision date to expand, change or stop.'),
    ]),
    blk('s4p1', "The checklist ties the course's themes together: the standard and the data from Track 1, the governance lifecycle from Track 2, the design principles from this track and the finance course's attention to who keeps the savings. A pilot that has all six steps is cheap to run and produces something a board or a funder can use."),

    h2('s5h1', 'Telehealth, Broadband and the Rural Setting'),
    blk('s5p1', "The Digital Health Lab also models telehealth utilization under CMS policy scenarios, and the policy side matters for rural planning. Medicare payment for telehealth has depended on temporary flexibilities that Congress has extended in stages, so a program that relies on them needs a plan for the case in which they lapse. This lesson did not verify the current status of those flexibilities, and a reader should check the CMS telehealth page and the latest legislation before building a business case."),
    blk('s5p2', "Practical constraints matter as much as payment. Remote monitoring needs reliable broadband or cellular coverage in the patient's home, devices the patient can use, support when they fail and a plan for patients who cannot participate. In a rural area, a program that enrolls the patients who are easiest to reach may skew toward those with the best connectivity and the lowest risk, and so deliver less benefit than expected. The equity monitoring of the governance lifecycle applies: track who is enrolled, who drops out and who is never offered the service."),
    blk('s5p3', "Another practical point is staffing. Management payments require clinical staff time with documented interactive contact, so the program is only as scalable as the nurse or care manager capacity behind it. A hospital that enrolls 200 patients should know how many staff hours a month the monitoring needs and who will do it when someone is on leave."),
    h2('s6h1', 'Deciding to Expand, Change or Stop'),
    blk('s6p1', "A pilot earns its keep by forcing a decision. Before it starts, write down the thresholds: the enrollment and engagement level, the clinical measure that must move and the cost per patient that is acceptable. At the end of the pilot period, compare actual results with the thresholds. If the thresholds are met, expand with a staffing and funding plan. If engagement is good but outcomes are flat, change the clinical protocol or the target population. If engagement is poor, study why before spending more. If nothing works, stop and record what was learned."),
    blk('s6p2', "The record matters. The same hospital may be asked in two years why it ran a program, what happened and why it stopped. A one-page pilot report with the thresholds, the results and the decision is cheap to write and valuable to a successor. It is also the kind of evidence a funder or regulator will trust, which is the point of the political sustainability course's advice on documenting progress."),

    takeaway('tw', [
        "The Digital Health Lab uses calendar year 2026 national non-facility rates: setup 99453 at $21.71, supply 99454 and 99445 at $52.11, management 99457 at $51.77, 99470 at $26.05 and additional time 99458 at $41.42, as recorded in its source notes.",
        "Revenue depends on use: supply payment needs 16 or more reading days for the full code and management payments need documented interactive time.",
        "At the stated illustrative assumptions, 200 patients generate about $1,281 each, or about $256,000, before program costs.",
        "Chapter 7's illustration of about six prevented readmissions at an assumed $15,000 each saves $90,000 a year; who keeps that saving depends on the payment arrangement.",
        "Tier monitoring alerts by urgency to avoid alert fatigue, and route readings to a named clinician with a recorded response.",
        "Device algorithms raise the same governance questions as any clinical AI: validation, regulatory status, monitoring and subgroup performance.",
        "Roll out with a defined population, a workflow owner, alert design, governance, economics under your payment arrangement and a pilot with a decision date.",
    ]),
    quiz('qz',
        "In the worked example, why is the roughly $256,000 not a measure of the program's profit?",
        [
            ("Because Medicare does not pay for remote monitoring", False),
            ("Because it is revenue only; device, staff, software and billing costs are not included", True),
            ("Because the rates are for a different year", False),
            ("Because it counts only the setup payment", False),
        ],
        "The figure sums the modeled reimbursement for 200 patients. The program's costs for devices, clinical staff, software, training and billing must be subtracted, and avoided costs added where the organization keeps them, before judging value."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] HTR Research Lab, Digital Health Lab — https://healthtransformationreview.org/research-lab/technology-ai?tab=digital — CY2026 remote physiologic monitoring rates and model, read from the tool's source on 2026-11-23"),
    blk('src2', "[2] " + BOOK5 + " — §5.4 and §5.7: decision support and platform tools; HTR book Chapter 7 §7.7 (Figure 7.5) for the remote monitoring illustration"),
    blk('src3', "[3] CMS, Calendar Year 2026 Physician Fee Schedule final rule (CMS-1832-F) — https://www.cms.gov/newsroom/fact-sheets/calendar-year-cy-2026-medicare-physician-fee-schedule-final-rule-cms-1832-f-medicare-shared-savings — the rule behind the 2026 rates, as cited in the tool's notes; check codes and rates for the current year"),
    blk('src4', "[4] FDA, final guidance on predetermined change control plans for AI-enabled device software functions (December 4, 2024) — https://www.govinfo.gov/content/pkg/FR-2024-12-04/html/2024-28361.htm — relevant to devices whose algorithms update"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
