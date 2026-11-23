exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_ctk_common.py').read())

# Track 4 — Clinical Data, Care Transitions and Clinical Leadership. Verified 2026-11-23: CMS TCM rules (99495 moderate MDM,
# face-to-face within 14 days; 99496 high MDM, within 7 days; interactive contact within 2 business days; CMS MLN908628 Aug 2025,
# via search summaries); Naylor et al., JAMA 1999 randomized trial of an APN-led transitional care protocol (363 patients over 65;
# significantly fewer readmissions in the intervention group, no significant differences in post-discharge acute care visits,
# function, depression or satisfaction; summary-level); VITL network includes all Vermont hospitals (VermontBiz, via search);
# Blueprint 2025 Annual Report (community health worker FTE and trainings). Book-only and unverified here: Vermont 14.8% 30-day
# readmission, 76% follow-up, the VITL ADT feed and VITLAccess descriptions, 35 provider meetings vs 57 hospital meetings in the
# Oliver Wyman process, HSA Coordinator proposal.

# ════════════════════════════════════════════════════════════════════════════
L10_SLUG = 'ctk-clinical-data-model'
L10_TITLE = 'The Clinical Data Foundation: Capture, Aggregate, Manage'
L10 = [
    blk('intro1', "A practice can do good clinical work and still do poorly under value-based payment if its data cannot show it. Chapter 9 describes a three-step clinical data model that connects an individual encounter to population management across the state, and it names the stage where Vermont is weakest: the first two. This lesson explains each step, shows how a small failure in step one, a blood pressure typed into a note, cascades through every later report, and sets out a practical audit a practice can run."),
    blk('intro2', "The chapter's descriptions of the state's exchange and analytics vendor are the book's; the lesson could not verify the specific features of the exchange's portal and notification feeds, and says so. It does verify from a public announcement that the exchange's participant network includes all Vermont hospitals."),
    blk('intro3', "The principle is simple and often ignored: analytics cannot analyze what was never captured or shared."),

    h2('s1h1', 'Step One: Point-of-Care Capture'),
    blk('s1p1', "The encounter generates the data: blood pressure readings, laboratory results, screening scores, medication lists, closed care gaps. Chapter 9 says the quality of every later performance measure depends on the completeness and accuracy of this first capture. If a blood pressure is measured but recorded in free text, it cannot be extracted for the quality measure or the care gap report. The reading was taken and the patient was seen, and the measure still counts the visit as having no reading."),
    blk('s1p2', "The chapter identifies Vermont's gap: many practices, especially small rural ones, have inconsistent structured data capture, because staff document in free text when the structured field takes longer at the point of care. The apparent efficiency creates a downstream measurement failure that costs the practice in quality performance and in care gap identification. Its remedy is Blueprint field staff training on structured capture, with record workflow redesign as the vehicle."),
    callout('s1c1', "If a fact is not in a structured field, the system does not know it. A faster note can be a slower measure."),

    h2('s2h1', 'Step Two: Practice-Level Aggregation'),
    blk('s2p1', "The record aggregates encounter data across the panel to produce the registry, the care gap report and the measure dashboard. The chapter adds that claims-based practice profiles show, in summary form, the use the practice's patients incur outside its walls, such as emergency visits, hospitalizations and specialist encounters, and that the patient-level view needed to act on them comes through the state exchange: clinicians viewing records from other settings in the exchange's portal, or receiving admission, discharge and transfer alerts built on its feed."),
    blk('s2p2', "A public announcement from the exchange organization, reported by VermontBiz, describes a participant network that includes health systems, payers, emergency medical services agencies, ambulatory practices, public health agencies, federally qualified health centers, home health agencies and all of Vermont's hospitals. The chapter's particular claims about the portal and the notification feed are not covered by that announcement, and this lesson did not verify them. A practice should ask the exchange which notification services are live, which of its patients they cover and how alerts reach staff."),
    table('s2t1', 'Where each kind of information comes from (HTR Chapter 9, summarized)', [
        {'Need': 'Which of my patients have open gaps?', 'Source': 'Practice registry from structured record data', 'Failure_if_missing': 'Free-text entries; unconfigured registry'},
        {'Need': 'How much care do my patients use outside my practice?', 'Source': 'Claims-based practice profile', 'Failure_if_missing': 'Summary only; delayed; no patient-level detail'},
        {'Need': 'Which of my patients was just admitted or discharged?', 'Source': 'Exchange admission, discharge and transfer alerts', 'Failure_if_missing': 'Practice learns of events late or never'},
        {'Need': 'What happened in another organization\'s record?', 'Source': 'Exchange portal or query', 'Failure_if_missing': 'Fragmented view; duplicate work'},
    ]),

    h2('s3h1', 'Step Three: System-Level Management'),
    blk('s3p1', "The third step is aggregation across practices to the service area and the state, which the chapter says the state's analytics vendor will do once deployed, enabling population health management under global budgets. The chapter's conclusion is that Vermont's most critical current gap is at steps one and two, incomplete structured capture and incomplete exchange connectivity, because the vendor cannot analyze data that was not captured or not shared. Investment in practice-level infrastructure is therefore the clinical prerequisite for effective management under global budgets."),
    blk('s3p2', "The status of the vendor procurement was discussed in the previous course: public listings show solicitations and a contract under negotiation, with no award found. The practice-level implication does not depend on the outcome. Whatever the state builds, it will draw on practice data, and a practice with clean structured data and exchange connections will be able to use the tool, and also to manage without it."),

    h2('s4h1', 'A Structured-Data Audit'),
    blk('s4p1', "A practice can test its own foundation in a few hours. Choose five measures that matter, for example blood pressure, A1c, depression screening score, body mass index and a social needs screen. For each, pull a sample of recent visits and check three things: was the value recorded at all, was it in a structured field, and does the report that is supposed to count it actually find it? The third check is the one that surprises: a field can be filled and still miss the report because the report looks in a different field, a different code or a different date range."),
    blk('s4p2', "Findings usually fall into a few types. Workflow causes, such as staff entering values where it is convenient. Configuration causes, such as a report built on the wrong field. Template causes, where the visit template has no place for the value. And training causes, where staff do not know why the field matters. Each has a cheap fix, and Chapter 5's implementation matrix gives $15,000 to $40,000 per practice for record optimization for structured data capture, with one to three months to value and a return crossover at about six months, which are indicative figures that the practice should replace with quotes."),
    steps('s4st1', 'Running a structured-data audit', [
        ('Pick five measures', 'Choose measures tied to payment or quality reporting.'),
        ('Sample visits', 'Take a recent sample across clinicians and visit types.'),
        ('Check capture, structure and counting', 'Was it recorded, in a structured field, and found by the report?'),
        ('Classify the cause', 'Workflow, configuration, template or training.'),
        ('Fix and retest', 'Make the smallest fix, then re-sample in a month.'),
    ]),
    warning('s4w1', "Do not ask clinicians to do more clicking without removing something", "Structured capture takes time. Redesign the visit so the extra field replaces a free-text step, and let staff other than the clinician enter routine values."),

    h2('s5h1', 'Putting the Foundation in Sequence'),
    blk('s5p1', "Practices rarely have the budget to fix everything at once, so sequence matters. Start with the measures tied most directly to payment, since those return value soonest and make the case for the next step. Fix capture before building dashboards: a dashboard on poor data only displays the problem more attractively. Then connect to the exchange, ask which alerts and views are live, and decide who in the practice receives and acts on them. Only after those steps does it make sense to invest in more elaborate analytics, whether a practice-level tool or the state's eventual platform."),
    blk('s5p2', "Ownership is the other half of sequence. A data foundation needs a named person, often a nurse or practice manager with protected time, who owns the registry, reviews the care gap report with clinicians each month and reports failures in capture back to the front line. Without that person, structured fields drift back to free text within months, because the incentive at the point of care has not changed. The audit described above should therefore be repeated on a schedule, quarterly for the first year, so the practice can see whether gains hold, and so that new staff and new templates do not quietly erode them."),
    blk('s5p3', "Finally, treat the data work as part of clinical care and not as an administrative burden placed on clinicians. When a clinician sees that a clean registry produces a list of patients overdue for a visit, and that the list is right, the habit of structured entry reinforces itself. When the registry is wrong because earlier entries were sloppy, the habit collapses. The first few months decide which of those paths a practice takes, and the cheapest intervention is to show clinicians early, concrete examples of a correct list helping them reach a patient they would otherwise have missed."),
    takeaway('tw', [
        "Chapter 9's three-step clinical data model is point-of-care capture, practice-level aggregation and system-level management.",
        "A value recorded in free text cannot be counted by quality measures or care gap reports, so a faster note can cost a practice performance.",
        "The chapter says Vermont's critical gap is at steps one and two: incomplete structured capture and incomplete exchange connectivity.",
        "The exchange organization says its participant network includes all of Vermont's hospitals; the chapter's descriptions of the portal and notification feed were not verified here.",
        "The state analytics vendor cannot analyze data that was not captured or shared; practice-level infrastructure is the prerequisite.",
        "A structured-data audit checks whether a value was recorded, in a structured field and found by the report that should count it.",
        "Chapter 5's indicative cost for record optimization is $15,000 to $40,000 per practice with a return crossover at about six months; replace with quotes.",
    ]),
    quiz('qz',
        "Why can a blood pressure reading that was taken still fail to count in a quality measure?",
        [
            ("Because blood pressure is not a quality measure", False),
            ("Because it was recorded in free text, not a structured field that reports can extract", True),
            ("Because only emergency departments record blood pressure", False),
            ("Because HEDIS ignores primary care visits", False),
        ],
        "The chapter says that if a measurement is documented in free text it cannot be extracted for quality reporting or care gap analysis, so the measure counts the visit as having no reading."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.5.1: Vermont's three-step clinical data model; §9.12: structured data capture"),
    blk('src2', "[2] VermontBiz, VITL partners with Outcome Healthcare to strengthen Vermont's health data network — https://vermontbiz.com/node/244231 — participant network includes all of Vermont's hospitals"),
    blk('src3', "[3] Health Transformation Review, Chapter 5 — https://healthtransformationreview.org/read/chapter-5 — §5.6 Figure 5.3: EHR optimization for structured data capture"),
    blk('src4', "[4] Green Mountain Care Board, open and closed requests for proposals — https://gmcboard.vermont.gov/node/199 — analytics solicitations, as surfaced by search; no award found"),
]

# ════════════════════════════════════════════════════════════════════════════
L11_SLUG = 'ctk-care-transitions'
L11_TITLE = 'Closing the Loop: The Care Transition Protocol'
L11 = [
    blk('intro1', "The period after a hospital stay is when many avoidable returns begin. Chapter 9 reports that Vermont's 14.8 percent 30-day readmission rate and its 76 percent 30-day follow-up rate after behavioral health emergency visits both reflect failures at the transition from hospital to community. Its remedy is the Transitional Care Model, implemented through Vermont's community health teams with an admission notification from the state exchange. This lesson sets out the model's components, the evidence behind it, the Medicare billing codes that pay for part of it, and the chapter's concrete protocol."),
    blk('intro2', "The readmission and follow-up rates are the book's figures and could not be verified here. The evidence on the Transitional Care Model is from a randomized trial reported in 1999 and later work, read through summaries. The billing rules are from Medicare transitional care management guidance as summarized by professional organizations."),
    blk('intro3', "The aim is a protocol a practice or a team can run for every attributed patient discharged, not only for the ones whose clinician happens to call."),

    h2('s1h1', 'The Transitional Care Model'),
    blk('s1p1', "Chapter 9 describes the model's components: identifying high-risk patients before discharge, assigning a transitional care nurse, direct contact with the patient and caregiver within 24 to 48 hours of discharge, home visits for the highest-risk patients, medication reconciliation and scheduling of primary care follow-up before the patient leaves. The model was developed and tested by a nursing research group. A 1999 randomized trial in JAMA, as summarized in public sources, assigned 363 patients over 65 either to a protocol led by an advanced practice nurse, with discharge planning and home follow-up, or to routine care. It found significantly fewer readmissions in the intervention group, and no significant group differences in post-discharge acute care visits, functional status, depression or patient satisfaction."),
    blk('s1p2', "That result is worth reading with its limits in mind. It is one trial, in a particular era and setting, with a specific intervention led by advanced practice nurses. The same research group noted that heart failure patients did not fare as well in the study, and later trials of transitional care for heart failure tested modified versions. A later compendium reports that two randomized trials documented fewer rehospitalizations, lower overall costs and better satisfaction with the model. The reasonable conclusion is that structured, nurse-led transitional support can reduce readmissions, and that the details of the intervention and the patient group matter."),
    callout('s1c1', "Transition programs work through attention, not magic: someone calls early, checks medications and makes sure a visit is booked."),

    h2('s2h1', 'What Medicare Pays For'),
    blk('s2p1', "Medicare pays for part of this work through transitional care management codes. Both codes, 99495 and 99496, require an interactive contact with the patient or caregiver within two business days of discharge, medication reconciliation and management during the 30-day service period and a face-to-face visit. Code 99495 requires at least moderate complexity of medical decision making and a visit within 14 days. Code 99496 requires high complexity and a visit within 7 days. Professional summaries note that CMS allows some leeway on the initial contact where attempts are documented, and that the codes can be furnished by telehealth, though a practice should confirm details with the current CMS booklet."),
    blk('s2p2', "The billing rules shape the protocol. A practice that builds its workflow around the two-business-day contact and the seven-day visit meets the clinical goal and the payment requirement together. A practice that treats the codes as the program may miss patients who are not eligible or whose clinicians do not bill."),
    table('s2t1', 'Transitional care management codes (professional summaries of CMS guidance)', [
        {'Code': '99495', 'Decision_making': 'At least moderate complexity', 'Contact': 'Interactive contact within 2 business days of discharge', 'Face_to_face_visit': 'Within 14 days of discharge'},
        {'Code': '99496', 'Decision_making': 'High complexity', 'Contact': 'Interactive contact within 2 business days of discharge', 'Face_to_face_visit': 'Within 7 days of discharge'},
    ]),

    h2('s3h1', "The Chapter's Community Health Team Protocol"),
    blk('s3p1', "Chapter 9's Vermont in Practice box describes a protocol built on community health teams. Within 24 hours of the hospital discharge notification, the team's care coordinator contacts the patient or caregiver by phone to assess immediate needs, confirm understanding of medications and schedule the seven-day follow-up appointment. The seven-day visit reviews discharge instructions, confirms medication reconciliation, identifies early warning signs of deterioration and assesses social needs that could drive readmission. The 30-day care plan review documents whether care plan goals were met and moves the patient from active transition management back to standard tier one or tier two panel management."),
    blk('s3p2', "The chapter's point is systematic implementation: the protocol runs for every attributed patient discharged from a Vermont hospital, not only the ones whose primary care provider happens to call the team. It depends on a trigger, which is why it ties the protocol to the exchange's admission notification. When a patient attributed to a practice is admitted, the practice should be told, so that transition planning begins during the stay and not after discharge. The chapter's matrix gives $20,000 to $50,000 to set up the protocol with the team and the notification, three months to value and a return crossover at six to twelve months, indicative figures to be replaced by quotes."),
    steps('s3st1', 'The community health team transition protocol (HTR Chapter 9)', [
        ('Notification', 'The practice and team learn of the admission or discharge from the exchange alert.'),
        ('Within 24 hours of discharge', 'Phone contact: immediate needs, medication understanding, schedule the 7-day visit.'),
        ('Seven-day visit', 'Review discharge instructions, reconcile medications, check warning signs and social needs.'),
        ('Thirty-day review', 'Document goal attainment; return the patient to standard panel management.'),
    ]),

    h2('s4h1', 'Measuring Whether It Works'),
    blk('s4p1', "A transition program should track a small set of measures. The share of eligible discharges for which the first contact occurred within 24 or 48 hours. The share with a seven-day visit. The 30-day readmission rate among enrolled patients compared with a reasonable comparison group or the practice's own baseline. And, for behavioral health emergency visits, the share with a follow-up visit within seven and thirty days. The process measures show whether the protocol is running, and the outcome measures show whether it matters, with the caution that patients selected for intervention differ from those who are not."),
    blk('s4p2', "Equity applies here too: the patients most likely to be lost between hospital and home are those with no phone, unstable housing, language barriers or no usual practice. A protocol that reaches the patients who are easiest to reach will post good process numbers and leave the highest-risk patients without support. Check contact rates by language, insurance, housing status and whether the patient has a primary care practice, and add outreach, such as community health worker visits, for those who are missed."),
    warning('s4w1', "A notification is not a transition", "An alert that no one acts on is a log entry. Assign a named person, a time standard and a record of what was done for each notified discharge."),

    h2('s5h1', 'Running the Protocol at Small-Practice Scale'),
    blk('s5p1', "A small rural practice cannot staff a dedicated transitional care nurse, which is why the chapter routes the protocol through community health teams. The practice's job is narrower: make sure it learns of every admission and discharge, hand the patient to the team or its own care coordinator without delay and keep the seven-day visit slot protected. A practice that holds two or three same-week appointments open for post-discharge patients, and that has agreed in advance who calls whom, can meet the standards without new staff."),
    blk('s5p2', "The hardest cases are the ones the alert system cannot see: patients discharged from out-of-state hospitals, patients who are seen in an emergency department and never admitted, and patients who change addresses or phone numbers. A reasonable practice policy is to ask at every visit whether the patient has been to an emergency department or hospital since the last one, to record the answer in a structured field and to feed it into the same outreach routine. This does not replace the exchange's feed, but it catches events that the feed misses and teaches staff to treat utilization outside the practice as routine information."),
    blk('s5p3', "Finally, be honest about what the evidence says. The best-known trial tested a nurse-led intervention in older adults, and it reduced readmissions but did not change several other outcomes. A practice should therefore define success modestly and measure it: contact made, visit completed, medications reconciled, readmission avoided. If the numbers do not move after two or three quarters, examine the process before concluding the model does not work, because the most common failure is a protocol that exists on paper and reaches only a fraction of the patients it was written for."),
    takeaway('tw', [
        "Chapter 9 reports Vermont's 14.8 percent 30-day readmission rate and 76 percent follow-up rate after behavioral health emergency visits as transition failures; both are the book's figures.",
        "The Transitional Care Model identifies high-risk patients before discharge, assigns a nurse, makes contact within 24 to 48 hours, visits the highest-risk patients, reconciles medications and books follow-up.",
        "A 1999 randomized trial of 363 older patients found significantly fewer readmissions with an advanced practice nurse-led protocol and no significant differences in several other outcomes; heart failure patients did less well in that study.",
        "Medicare's transitional care management codes require an interactive contact within two business days, with a visit within 14 days for 99495 and within 7 days for 99496.",
        "The chapter's protocol runs for every attributed discharged patient: call within 24 hours, visit within 7 days, review at 30 days, triggered by exchange notification.",
        "Track contact timeliness, seven-day visits, readmissions and follow-up after behavioral health emergency visits, with equity checks.",
        "Assign a named person and a time standard to every notification; an unacted alert is only a log entry.",
    ]),
    quiz('qz',
        "What is the difference between CPT codes 99495 and 99496 for transitional care management?",
        [
            ("99495 is for children and 99496 for adults", False),
            ("99495 requires at least moderate decision making and a visit within 14 days; 99496 requires high complexity and a visit within 7 days", True),
            ("99495 does not require a face-to-face visit", False),
            ("They are identical", False),
        ],
        "Both require interactive contact within two business days of discharge. Code 99495 needs moderate complexity decision making with a visit within 14 days; code 99496 needs high complexity with a visit within 7 days."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.6 and the Vermont in Practice box: the care transition protocol; §9.9 Figure 9.5; §9.12 Transitional Care Model"),
    blk('src2', "[2] Naylor MD et al., Comprehensive discharge planning and home follow-up of hospitalized elders: a randomized clinical trial, JAMA 1999 — https://www.commonwealthfund.org/sites/default/files/documents/_usr_doc_JAMA_1999_article.pdf — as summarized in public sources"),
    blk('src3', "[3] CMS, Transitional Care Management Services, MLN908628 (August 2025) — https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/mln908628_08_2025_transitional_care_management_final.pdf ; AAFP, Transitional care management: Medicare codes and toolkit — https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management — as summarized by search"),
    blk('src4', "[4] NCQA, HEDIS measure description for Follow-Up After Emergency Department Visit for Mental Illness — https://www.ncqa.org/hedis/measures/"),
]

# ════════════════════════════════════════════════════════════════════════════
L12_SLUG = 'ctk-clinical-leadership'
L12_TITLE = 'Clinical Leadership: The Under-Resourced Capability'
L12 = [
    blk('intro1', "Every program in this course fails the same way if clinicians do not lead it. Chapter 9 closes its implementation material with a claim about people: clinical transformation cannot be implemented by administrators alone, and clinical leaders need a defined role in the transformation itself, not only a seat in a consultant's listening sessions. It calls clinical leadership the under-resourced capability and says that converting framework, financial incentive and capital into clinical change is a leadership task."),
    blk('intro2', "This lesson sets out what the chapter asks for, what structures give clinical leaders real authority, the role of community health workers and regional coordinators the chapter highlights and the practical skills of change leadership. It draws on the chapter's argument and on the Blueprint's staffing data for community health workers, and flags the chapter's descriptions of the consultant's process, which were not verified here."),
    blk('intro3', "The question for any organization is who, specifically, owns the clinical change, with what authority and what time."),

    h2('s1h1', 'The Chapter\'s Argument'),
    blk('s1p1', "Chapter 9 notes that the Act 167 engagement included 35 provider meetings alongside 57 with hospital leadership and boards, and says that taking part in a consultant's listening process is not the same as leading implementation. Physician chiefs, medical staff presidents and nursing directors need a defined role in the transformation. Global budgets' clinical accountability requirements, such as population health management, quality achievement and behavioral health integration, cannot be met by administrative compliance. They need clinical champions who understand the evidence, communicate credibly with clinical staff and can drive culture change in organizations where physician culture has historically resisted administrative mandates."),
    blk('s1p2', "The chapter's framing is that the Blueprint provides the framework, global budgets provide the financial incentive and the Rural Health Transformation Program provides the capital, and that leadership is what turns these three into change. It asks the Agency of Human Services and hospital systems to create structures for clinical leader engagement in global budget implementation and the Strategic Plan, including a formal clinical advisory structure for the Health Care Delivery Advisory Committee and physician and nursing leadership in hospital global budget governance."),
    callout('s1c1', "A clinical champion needs three things: authority to change a workflow, protected time to do it and a seat where the budget is decided."),

    h2('s2h1', 'Structures That Give Leaders Real Authority'),
    blk('s2p1', "Leadership roles fail when they are titles without time or authority. Several structural features help. A clinical lead for each major program, such as collaborative care or transitions, with a named share of their week protected for it. A clinical advisory body that reviews budgets, quality targets and workflow changes before they are decided, not afterward. Joint accountability for quality and finance, so that clinical leaders see the budget consequences of their decisions and financial leaders see the clinical ones. And a path for frontline staff, nurses, medical assistants and community health workers, to propose and test changes."),
    blk('s2p2', "In a hospital under a global budget, the governance question is concrete. If a service line's budget is set without its clinicians, the first sign of trouble will be resistance. If clinicians participate in setting quality targets, they have reasons to own them. The Act 68 text requires a hospital that proposes to reduce a service in order to comply with its budget to give notice with a rationale tied to the strategic plan and community needs assessment, which means someone with clinical authority has to write that rationale credibly."),
    table('s2t1', 'Leadership structures and what each provides', [
        {'Structure': 'Program clinical lead with protected time', 'What_it_provides': 'A named owner who can change workflows and answer for results'},
        {'Structure': 'Clinical advisory body with a role before decisions', 'What_it_provides': 'Early clinical input on budgets, targets and redesign'},
        {'Structure': 'Joint quality and finance accountability', 'What_it_provides': 'Shared understanding of clinical and financial consequences'},
        {'Structure': 'Frontline improvement path', 'What_it_provides': 'Changes that come from the people who do the work'},
        {'Structure': 'Regional coordination role', 'What_it_provides': 'A link between the state, practices and community organizations'},
    ]),

    h2('s3h1', 'Community Health Workers and Regional Coordinators'),
    blk('s3p1', "The chapter's implications for executives and for state officials name two roles. For hospital executives, it says that investment in community health workers before fiscal year 2028 is a direct investment in global budget performance, because they reduce high-cost use by addressing the social and behavioral factors behind emergency visits, avoidable admissions and readmissions. It adds that the question is not whether such programs are worth investing in but whether there is a workforce pipeline to deploy them at scale and clinical workflows designed to use their referrals. The Blueprint's 2025 report shows what exists: 36.2 FTE of community health workers funded through the mental health integration pilot as of November 2025, and 1,096 people attending pilot trainings in 2025, including trainings on community health workers in a primary care setting."),
    blk('s3p2', "For state officials the chapter points to Vermont's hospital service areas as the geographic unit for both hospital transformation planning and equity monitoring, and proposes, in a later chapter, regional coordinators who would connect the state to the community organizations, primary care practices and social service providers that deliver the care. It argues that they are not administrators but the connection that turns system-level policy into community-level implementation, and that their budget is a transformation necessity and not overhead. The proposal is the book's, and this lesson found no evidence that it has been adopted."),
    blk('s3p3', "The workflow point deserves emphasis. Community health workers help only when referrals reach them and results return to the care team. A practice that adds workers without defining who refers, for what and how the outcome is recorded will see the capacity underused. The same lesson applies to every role this course has covered."),

    h2('s4h1', 'Practical Change Leadership'),
    steps('s4st1', 'A clinical leader\'s first ninety days on a transformation program', [
        ('Define the problem in clinical terms', 'Use measures clinicians respect, with patient lists and examples.'),
        ('Recruit a small coalition', 'Two or three respected colleagues, including a nurse and a front-desk or medical assistant voice.'),
        ('Pick one visible change', 'A change that makes the day easier for staff and shows results within weeks.'),
        ('Show results to peers', 'Share run charts and patient stories at medical staff meetings.'),
        ('Embed and spread', 'Write the change into standard work, then take on the next one.'),
    ]),
    blk('s4p1', "Leading clinical change is a skill with a literature of its own, and the platform's readiness assessment cites an urgency-driver idea from change management, treating the statutory timetable as a source of urgency instead of an optional strategy. For a clinician the working advice is plain. Speak in clinical terms, show data that colleagues trust, make the change easy, respect the workload and keep going after the first enthusiasm fades. Physician culture that resists administrative mandates is often responding to changes that add work without clear benefit, and a leader who removes work while improving care builds credibility."),
    blk('s4p2', "Organizations should also plan for leaders' time and succession. A transformation that depends on one champion's goodwill stops when the champion moves. Build a second leader into each program, pay for the time and recognize the work in evaluations and promotions. This is cheap relative to the programs it protects, and the chapter's call to resource clinical leadership is, in the end, a call to count it as a cost of the program."),
    warning('s4w1', "Leadership cannot substitute for capacity", "A champion working nights and weekends to run a program without staff, data or time will burn out. Pair every leadership role with the resources the program needs."),

    h2('s5h1', 'Measuring Leadership Capacity'),
    blk('s5p1', "Leadership is hard to measure, but its preconditions are not. An organization can count how many of its major programs have a named clinical lead, what share of that lead's week is protected, whether a clinical advisory body meets on a regular schedule and sees budgets before they are final, and whether the lead can point to a decision they changed. These are not outcome measures, but they show whether the structure exists. When a program is failing, the first question is usually whether anyone with authority and time owned it."),
    blk('s5p2', "A second set of indicators concerns frontline voice: how many improvement ideas came from staff other than managers, how many were tested and how many were adopted. A system in which ideas rarely travel upward is a system in which leaders will find out about problems late. Short, regular huddles and visible run charts are cheap ways to keep the signal flowing, and they help clinicians see that their time spent on improvement leads to something."),
    blk('s5p3', "For executives and state officials, the practical question is budget. Protected clinical time, regional coordination and community health worker pipelines all cost money, and none of them appear as a line that produces revenue. The chapter's argument is that they should be counted as transformation costs and funded accordingly, in the same way that capital for a building or a software system is. Organizations that fund the people and the tools together will see the programs in this course take hold, and those that fund only the tools will generally find the tools underused."),
    takeaway('tw', [
        "Chapter 9 says clinical transformation cannot be implemented by administrators alone and that clinical leaders need a defined role, not only a place in a consultant's listening sessions.",
        "The chapter asks for a formal clinical advisory structure for the Health Care Delivery Advisory Committee and physician and nursing leadership in hospital global budget governance.",
        "Effective structures include protected-time program leads, clinical review before decisions, joint quality and finance accountability, a frontline improvement path and regional coordination.",
        "The Blueprint's 2025 report records 36.2 FTE of community health workers funded by the mental health integration pilot and 1,096 training attendees in 2025.",
        "Community health workers help only when referrals reach them and results return to the care team; define who refers, for what and how outcomes are recorded.",
        "The regional coordinator proposal is the book's; no evidence of adoption was found.",
        "Plan leaders' time and succession, speak in clinical terms, make changes easy and pair leadership roles with capacity.",
    ]),
    quiz('qz',
        "Why does Chapter 9 say global budgets' clinical accountability requirements cannot be met through administrative compliance?",
        [
            ("Because clinical accountability is optional", False),
            ("Because they require clinical champions who understand the evidence and can drive culture change in organizations where physicians may resist administrative mandates", True),
            ("Because administrators are not allowed to manage budgets", False),
            ("Because global budgets do not involve quality", False),
        ],
        "The chapter says population health management, quality achievement and behavioral health integration need clinical champions with credibility who can change practice, which administrative compliance cannot supply."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.7: clinical leadership in transformation; §9.11 (Implications for You); §9.8 and Figure 9.4"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — community health worker FTE and training attendance"),
    blk('src3', "[3] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — service reduction notice and the Health Care Delivery Advisory Committee"),
    blk('src4', "[4] HTR Research Lab, VBC Readiness Assessment — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness — strategic clarity domain and the urgency-driver note"),
]

LESSONS = [(L10_SLUG, L10_TITLE, L10, 10), (L11_SLUG, L11_TITLE, L11, 11), (L12_SLUG, L12_TITLE, L12, 12)]
if __name__ == '__main__':
    run(LESSONS)
