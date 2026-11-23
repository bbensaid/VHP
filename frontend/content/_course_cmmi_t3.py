exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_cmmi_common.py').read())

# Track 3 — Section 1115 Waivers
# Facts verified 2026-11-23: CMS State Medicaid Director Letter SMD #26-003 (June 11, 2026), read from the PDF itself
# (34 pages); CMS press release of June 11, 2026 and KFF "1115 Waiver Watch: A Look at Budget Neutrality Policy Changes"
# (Nov 5, 2026), both read; CMS informational bulletin of March 4, 2025 on HRSN guidance and KFF's section 1115 basics,
# via search summaries. Vermont facts: HTR book Chapter 3 §3.3.

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'cmmi-1115-authority-and-process'
L7_TITLE = 'Section 1115 Waivers: Authority, Process and What States Use Them For'
L7 = [
    blk('intro1', "Where the Innovation Center tests models that CMS designs, the section 1115 demonstration is a tool the state designs. A state proposes a change to its Medicaid program that federal law does not otherwise allow, and CMS decides whether to approve it and on what terms. For comprehensive reform, Chapter 3 calls the 1115 waiver the most powerful federal policy tool a state has."),
    blk('intro2', "This lesson covers the legal authority behind 1115 demonstrations, the two separate powers it contains, how a proposal moves from state to federal approval, what states use it for, and how quickly federal policy toward it can change. It uses CMS's June 2026 State Medicaid Director letter, which restates the authority in plain terms, and the March 2025 reversal of federal guidance on health-related social needs, which shows the policy risk."),
    blk('intro3', "The lesson that follows covers budget neutrality, the financial test every demonstration must pass and the one that changed most in 2026."),

    h2('s1h1', 'The Authority in the Statute'),
    blk('s1p1', "Section 1115(a) of the Social Security Act gives the Secretary of Health and Human Services authority to approve experimental, pilot or demonstration projects that are likely to assist in promoting the objectives of the Medicaid program. CMS's June 2026 letter describes these demonstrations as giving states additional flexibility to design and improve their programs and as helping the federal government and states evaluate state-specific policy approaches."),
    blk('s1p2', "The test the Secretary applies is judgment, not a checklist. The letter states that CMS performs a case-by-case review of each state proposal, and that the Secretary approves a demonstration only if he determines that it is likely to assist in promoting the objectives of the Medicaid statute. Budget neutrality is a key component of that review but not the whole of it. This is what Chapter 3 means when it says 1115 waivers are negotiated instruments rather than applications approved or denied by a checklist."),
    blk('s1p3', "Section 1115 demonstrations also differ from CMMI models in a way that matters for planning: they are state-initiated, they apply to Medicaid (and, separately, CHIP), and their terms are written into a document called the special terms and conditions that the state and CMS negotiate and that governs the approval period. A state can propose, negotiate and, within the limits of those terms, adapt."),

    h2('s2h1', 'Two Powers in One Section'),
    blk('s2p1', "The June 2026 letter spells out that section 1115 gives the Secretary two distinct powers. Under section 1115(a)(1), the Secretary may waive provisions of section 1902 of the Act, which lists what a state's Medicaid plan must include, such as provisions on eligibility, beneficiary protections, benefits, services and premiums. Under section 1115(a)(2)(A), the Secretary may authorize federal matching funds for state expenditures that would not otherwise qualify for federal funding under section 1903, which governs payments to states. CMS calls the second power expenditure authority."),
    blk('s2p2', "The difference is practical. A waiver relaxes a rule: a state may do something its plan would otherwise be required to do differently. Expenditure authority opens the federal checkbook for something not otherwise matchable: a state may claim federal match for a service or population Medicaid does not ordinarily cover. Many demonstrations use both. As Lesson 8 shows, the 2026 budget neutrality changes treat the two very differently, so it pays to know which authority a given proposal depends on."),
    compare('s2cmp1', 'The two powers of section 1115',
        'Waiver authority, 1115(a)(1)', [
            'Waives requirements of section 1902 (what a state plan must include)',
            'Relaxes a rule; a state does something differently',
            'CMS expects activities under waiver authority alone to be mostly within what a state could otherwise do',
        ],
        'Expenditure authority, 1115(a)(2)(A)', [
            'Allows federal matching for costs not otherwise matchable under section 1903',
            'Opens funding for populations or services not ordinarily covered',
            'CMS expects most activities that can only be authorized under section 1115 to rest on this authority',
        ]),

    h2('s3h1', 'The Path From Proposal to Approval'),
    blk('s3p1', "Federal rules, put in place in 2012 under the Affordable Care Act, require public input at two levels. Before submitting an application or extension, a state must hold a 30-day public notice and comment period and at least two public hearings. After submission, CMS checks the application for completeness and sends a notice of receipt that starts a federal 30-day comment period. KFF notes that these procedures were not always enforced in the same way across administrations, so a state should confirm the current requirements with CMS."),
    steps('s3st1', 'How a demonstration moves from idea to approval', [
        ('State design', 'The state defines the goals, the populations and services affected, and the authorities it needs.'),
        ('Public process', 'A 30-day state comment period and at least two public hearings before submission.'),
        ('Federal completeness and comment', 'CMS confirms the application is complete and opens a 30-day federal comment period.'),
        ('Negotiation', 'State and CMS negotiate scope, monitoring, evaluation and the financial terms, including budget neutrality.'),
        ('Approval and special terms and conditions', 'The approval sets the period, the authorities and the conditions the state must meet.'),
        ('Renewal, amendment or extension', 'Changes during or after the period require further CMS review; renewals recur on a cycle commonly of up to five years.'),
    ]),
    blk('s3p2', "Negotiation is the stage where states win or lose ground. Chapter 3 observes that states which engage CMS as partners in designing innovative demonstrations get better terms than states that submit standard applications. The negotiation is also where the evidence a state brings carries the most weight, which is why Chapter 3 treats data infrastructure, such as an all-payer claims database, as a prerequisite for strong waiver terms."),

    h2('s4h1', 'What States Use 1115 Demonstrations For'),
    blk('s4p1', "Chapter 3 groups the common uses into four. Coverage expansions beyond standard Medicaid categories include populations not otherwise eligible, non-traditional benefit structures and premium assistance. Delivery system and payment reform lets states implement global budgets, ACO arrangements and alternative payment models that standard Medicaid fee-for-service or managed care rules do not permit. Investments in health-related social needs use Medicaid funds for housing supports, food assistance and transportation for enrollees at risk of institutionalization or with complex needs. And work requirement programs, which are subject to legal and policy uncertainty and, from 2027, to a federal mandate for expansion adults under H.R. 1."),
    blk('s4p2', "Vermont's Global Commitment to Health demonstration is the book's worked example. Approved originally in 2005 and renewed and amended repeatedly, it extends coverage and benefits beyond the standard state plan, enabling health-related social needs services, expanded developmental disability benefits and substance use disorder treatment models. Its current authorization runs through December 2027, and a January 2025 amendment added housing services for health-related social needs. Lesson 9 returns to it in detail."),

    h2('s5h1', 'Policy Risk: The HRSN Reversal'),
    blk('s5p1', "A demonstration lasts years, but federal policy toward it can change in a day. The clearest recent example is health-related social needs. From 2022, CMS approved 1115 waivers that used Medicaid funds for services such as housing supports and food assistance. On March 4, 2025, CMS issued an informational bulletin rescinding its 2023 and 2024 guidance on the topic and a related framework. The bulletin said the rescission did not negate existing approvals, and CMS stated that it would evaluate new requests case by case without relying on the rescinded documents."),
    blk('s5p2', "KFF reported that, as of February 7, 2025, 25 states had received approval for 1115 demonstrations including HRSN coverage. Existing approvals were not revoked, but the concern was renewal. Demonstrations must be renewed periodically, and a state whose HRSN authority expires faces a federal agency that no longer endorses the framework it was approved under. Vermont's January 2025 amendment, approved shortly before the rescission, is an example of an approval that stands but whose renewal environment changed."),
    warning('s5w1', "Approval is not permanence", "An approved demonstration is a set of terms for a defined period. The surrounding federal policy can change mid-period, and renewal is a new negotiation under whatever policy applies then. Plan program design, financing and staffing with the renewal date in view."),

    h2('s6h1', 'Putting It to Work'),
    blk('s6p1', "A state or an organization working with one should ask four questions of any proposed or existing demonstration. Which of the two powers does each element rely on? Who must be consulted in the public process and when? Which terms are fixed by the approval and which can change by amendment? And what federal policy conditions apply at renewal? The answers decide how much of the design is secure and how much depends on future federal choices."),
    blk('s6p2', "The next lesson takes up the financial test, budget neutrality, which sits behind every one of those questions and which Congress rewrote in 2025."),

    takeaway('tw', [
        "Section 1115(a) lets the Secretary approve experimental, pilot or demonstration projects likely to promote Medicaid's objectives, reviewed case by case.",
        "Section 1115 contains two powers: waiving requirements of section 1902 under 1115(a)(1) and authorizing federal match for otherwise unmatchable spending under 1115(a)(2)(A), called expenditure authority.",
        "States must hold a 30-day public comment period and at least two public hearings before submission, followed by a 30-day federal comment period.",
        "Chapter 3's four uses are coverage expansions, delivery system and payment reform, health-related social needs investments and work requirement programs.",
        "Vermont's Global Commitment to Health demonstration, approved in 2005, runs through December 2027 and was amended in January 2025 to add housing services for health-related social needs.",
        "On March 4, 2025, CMS rescinded its HRSN guidance but said existing approvals stand and new requests will be reviewed case by case.",
        "Approval fixes terms for a period; renewal is a new negotiation under whatever federal policy applies at that time.",
    ]),
    quiz('qz',
        "What is the difference between waiver authority and expenditure authority under section 1115?",
        [
            ("Waiver authority applies to Medicare and expenditure authority to Medicaid", False),
            ("Waiver authority relaxes requirements of section 1902, while expenditure authority allows federal match for spending not otherwise matchable under section 1903", True),
            ("Waiver authority is permanent and expenditure authority expires after one year", False),
            ("There is no difference; they are two names for the same power", False),
        ],
        "CMS's June 2026 State Medicaid Director letter describes the two separately: under section 1115(a)(1) the Secretary may waive provisions of section 1902 (what a state plan must include), and under section 1115(a)(2)(A) the Secretary may authorize federal financial participation for expenditures that would not otherwise qualify under section 1903. CMS expects the two to be treated differently under the new budget neutrality approach."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS, State Medicaid Director Letter SMD #26-003, Budget Neutrality and Certification by the Chief Actuary of CMS for Section 1115 Medicaid Demonstration Projects (June 11, 2026) — https://www.medicaid.gov/federal-policy-guidance/downloads/smd26003.pdf — authority, the two powers, case-by-case review"),
    blk('src2', "[2] KFF, Medicaid Section 1115 Waivers: The Basics — https://www.kff.org/medicaid/issue-brief/medicaid-section-1115-waivers-the-basics/ — public notice and comment requirements"),
    blk('src3', "[3] CMS, Informational Bulletin, Rescission of Guidance on Health-Related Social Needs (March 4, 2025) — https://www.medicaid.gov/federal-policy-guidance/downloads/cib03042025.pdf — existing approvals not negated; case-by-case review"),
    blk('src4', "[4] KFF, 1115 Waiver Watch: A Look at Budget Neutrality Policy Changes (November 5, 2026) — https://www.kff.org/medicaid/issue-brief/1115-waiver-watch-a-look-at-budget-neutrality-policy-changes/ — renewal environment and the changes to review"),
    blk('src5', "[5] " + BOOK3 + " — §3.3.1-3.3.3: what 1115 waivers can and cannot do, uses, and Vermont's Global Commitment to Health demonstration"),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'cmmi-budget-neutrality'
L8_TITLE = 'Budget Neutrality: The Old Test and the 2027 Rewrite'
L8 = [
    blk('intro1', "Every section 1115 demonstration has to pass one financial test: the federal government must not end up spending more than it otherwise would have. For two decades that test was an agency policy that CMS applied through negotiation. In 2025 Congress put it into the statute, and in June 2026 CMS announced how it will apply the new law, starting with approvals on or after January 1, 2027."),
    blk('intro2', "This lesson explains the test as it has worked, what the 2025 law changed, how the new approach sorts a demonstration's activities, what happens to savings, and what it means for a state that must renew in the next two years. It is built from the text of CMS's June 11, 2026 State Medicaid Director letter, SMD #26-003, which the lesson read in full, and from KFF's analysis of it."),
    blk('intro3', "This is also a place where Chapter 3's account is out of date. The chapter describes budget neutrality as a calculation against a negotiated without-waiver baseline, which is correct for the approach used until the end of 2026. The 2027 change is covered here so that you can read the chapter's description as the old test, not the current one."),

    h2('s1h1', 'The Old Test: With Waiver Against Without Waiver'),
    blk('s1p1', "Under long-standing practice, CMS generally did not approve a demonstration unless it was expected to be budget neutral to the federal government, meaning it would not cost more than the federal government's Medicaid costs likely would have been without it. The mechanics, as the letter summarizes them, compare two projections. The without-waiver expenditures are what spending would likely have been absent the demonstration, and they set the expenditure limit. The with-waiver expenditures are the actual spending under it. The difference between the two aggregates measures any savings or overage. If a state exceeds its limit, it must return the excess federal funds to CMS."),
    blk('s1p2', "The test was determined retrospectively, after the demonstration period, although CMS made a preliminary judgment before approval. The without-waiver baseline was inherently a counterfactual, which is why Chapter 3 observes that states and CMS frequently negotiate over baseline methodology. The old approach also allowed midcourse corrections and rebasing when circumstances outside the state's control changed."),
    blk('s1p3', "Two features made the old test generous in practice. Spending on certain populations and services was treated as hypothetical, meaning the state could have covered them under its plan or another authority, so they needed no offsetting savings. And a state could accumulate savings and carry them forward, with the letter recording a rollover of up to ten years of legacy savings that could offset costs not otherwise matchable."),
    callout('s1c1', "Under the old test, the question was: did actual spending stay at or below a negotiated limit over the demonstration period? Under the new law, the question is: can the CMS Chief Actuary certify before approval that the project is not expected to raise federal spending?"),

    h2('s2h1', 'What Congress Changed'),
    blk('s2p1', "Section 71118 of Public Law 119-21, the 2025 reconciliation law that CMS calls the Working Families Tax Cut legislation, adds budget neutrality as a statutory requirement at section 1115(g) of the Social Security Act. From January 1, 2027, the Secretary may not approve an application for, or an amendment or renewal of, a Medicaid demonstration unless the Chief Actuary of CMS certifies that the project is not expected to increase federal expenditures compared with what they would otherwise be in the absence of the project. The provision applies in all states and territories. It does not apply to CHIP demonstrations."),
    blk('s2p2', "The statute adds two rules. Expenditures for populations and services that a state could have provided under its plan or other Medicaid authority, including expenditures that would be allowable but for a different site of service, count as expenditures in the absence of the project. And if a state spends less than it otherwise would during an approval period, the Secretary must specify how the difference is taken into account in the next approval period."),
    blk('s2p3', "The Chief Actuary's new role matters. Before the law, the Chief Actuary had no part in reviewing demonstrations. CMS interprets the statute to require an actuarial opinion that meets professional standards, and states that the current methodology is not based on actuarial methods and that the data states now submit are not detailed enough for the certification. That is why the approach has to change."),

    h2('s3h1', 'The New Approach: Classify, Analyze, Certify'),
    blk('s3p1', "CMS's letter describes the approach it intends to propose in a rule, to be applied provisionally from January 1, 2027 if the final rule is not yet in effect. There are no with-waiver and without-waiver baselines and no expenditure limit. A demonstration expected to increase federal spending is not approved. Instead, a state classifies each demonstration activity into one of two categories."),
    blk('s3p2', "Medicaid Authorizable Populations and Services, or MAPS, are activities for populations and services the state could otherwise have covered under its plan or another Medicaid authority. They are treated as having a net financial impact of zero. A state does not have to provide a detailed financial analysis for them, but must show that they could have been provided another way and attest that payment terms are not different under the demonstration. CMS does not allow savings to be generated from MAPS activities. Services in a different site of service, such as treatment in an institution for mental diseases or pre-release services for incarcerated people, are MAPS, but reentry infrastructure is not."),
    blk('s3p3', "Section 1115-only activities are those that could not be implemented any other way, and CMS expects most to rest on expenditure authority. For each, the state must analyze cost and savings impacts, including administrative costs, which the old approach did not count. The net financial impact across all 1115-only activities is what the Chief Actuary certifies."),
    blk('s3p4', "One change in definition is easy to miss. Section 1115(g) says populations and services, using 'and', and CMS reads this to mean an activity is MAPS only when the specific combination of population and service could have been covered. Providing a service to a population that could not otherwise be eligible for it would no longer be treated as hypothetical. CMS gave as an example assistive technology under a home and community-based services waiver offered to state plan beneficiaries who cannot be eligible for that waiver."),
    table('s3t1', 'The old and new approaches (SMD #26-003, Table 1, abridged)', [
        {'Topic': 'Determination', 'Current_approach': 'With-waiver and without-waiver expenditures; assessed after the period', 'New_approach': 'Prospective actuarial analysis; Chief Actuary certifies before approval'},
        {'Topic': 'Expenditure limit', 'Current_approach': 'Limit published in terms; excess returned to CMS', 'New_approach': 'No limit or cap; demonstrations expected to raise federal spending are not approved'},
        {'Topic': 'Hypothetical spending', 'Current_approach': 'Population or services the state could otherwise cover', 'New_approach': 'MAPS: the specific combination could have been covered'},
        {'Topic': 'Administrative costs', 'Current_approach': 'Not counted', 'New_approach': 'Included in the analysis'},
        {'Topic': 'Savings rollover', 'Current_approach': 'Up to 10 years of legacy savings', 'New_approach': 'Previous period savings limited to 5 years; MAPS generate none'},
    ]),

    h2('s4h1', 'Monitoring, Savings and Renewals'),
    blk('s4p1', "Without limits, the state still has to manage within guardrails. The letter says states would monitor key indicators, program outcomes and expenditures, with new special terms and conditions on monitoring, and would complete corrective actions if expenditures deviate substantially from the state's projection. CMS also says its approach is expected to reduce overall expenditures in demonstrations and reduce the savings available to states."),
    blk('s4p2', "For renewals, the statute requires that the Chief Actuary certify the duration of the preceding waiver. If actual spending during the current period resulted in a net increase in federal spending, the state would need to show how the demonstration would be budget neutral for the upcoming period, which might require changes to the demonstration. Current-period savings plus rollover savings from a previous period, limited to five years, may offset current-period costs. CMS also states that it expects to continue current review practices for approvals issued before January 1, 2027."),
    blk('s4p3', "KFF's November 2026 analysis adds the practical consequences: mid-demonstration amendments would trigger full review under the new rules, CMS rescinded its fast-track renewal process, and states with demonstrations up for renewal in 2027 may need to take additional steps. CMS says it will provide technical assistance and details before January 1, 2027, and a proposed rule is expected in early 2027."),

    h2('s5h1', 'What It Means for Vermont and Other States'),
    blk('s5p1', "Chapter 3 reports that Vermont's Global Commitment to Health authorization runs through December 2027. A renewal request submitted for approval after January 1, 2027 would therefore be certified under the new approach. The state's existing activities would need to be sorted into MAPS and 1115-only categories, administrative costs would need to be counted, and the evidence for each 1115-only activity would need to be actuarial in character."),
    blk('s5p2', "For any state, the planning questions are the same. Which of our current activities are really MAPS, and can we show it? Which depend on expenditure authority and need an actuarial case? What savings have we accumulated, and how many years of them will count? And do we have the data, including the all-payer claims data that Chapter 3 highlights, to support an actuarial analysis? A state that cannot answer those questions will find the new test harder than the old one."),
    warning('s5w1', "Treat this as the direction of travel, not the final rule", "CMS issued its letter to give early notice of what it intends to propose. A proposed rule is expected in early 2027, and CMS says it would renegotiate budget neutrality for approvals issued before a final rule if the methodology changes. Confirm the current status on the CMS website before relying on any detail in this lesson."),

    takeaway('tw', [
        "Under the old test, CMS compared with-waiver and without-waiver expenditures and states had to return federal funds that exceeded the limit; Chapter 3 describes this approach.",
        "Section 71118 of Public Law 119-21 adds section 1115(g): from January 1, 2027 the CMS Chief Actuary must certify that a demonstration is not expected to increase federal spending before CMS approves it, amends it or renews it.",
        "CMS's June 11, 2026 letter, SMD #26-003, replaces expenditure limits with a prospective actuarial analysis and says demonstrations expected to raise federal spending would not be approved.",
        "States classify activities as MAPS, with zero net impact and no savings, or as section 1115-only, which need a detailed analysis including administrative costs.",
        "The new definition of MAPS asks whether the specific population and service combination could have been covered, so some previously hypothetical spending will no longer qualify.",
        "Rollover of prior-period savings is limited to five years under the new approach, against ten years of legacy savings under the old.",
        "Vermont's Global Commitment authorization runs through December 2027, so its renewal falls under the new approach; Chapter 3's description of budget neutrality reflects the pre-2027 test.",
    ]),
    quiz('qz',
        "What does section 1115(g), added by Public Law 119-21, require beginning January 1, 2027?",
        [
            ("States must return any federal funds spent above a negotiated baseline at the end of the demonstration", False),
            ("The CMS Chief Actuary must certify that a demonstration is not expected to increase federal Medicaid expenditures before approval, amendment or renewal", True),
            ("All section 1115 demonstrations are eliminated", False),
            ("Budget neutrality applies only to CHIP demonstrations", False),
        ],
        "Section 1115(g) bars approval of an application, amendment or renewal unless the Chief Actuary certifies that the project is not expected to increase federal expenditures compared with the absence of the project. It applies to Medicaid demonstrations in all states and territories and not to CHIP demonstrations. CMS says this replaces expenditure limits with a prospective actuarial analysis."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS, State Medicaid Director Letter SMD #26-003, Budget Neutrality and Certification by the Chief Actuary of CMS for Section 1115 Medicaid Demonstration Projects (June 11, 2026) — https://www.medicaid.gov/federal-policy-guidance/downloads/smd26003.pdf — the statutory text of section 1115(g), the old and new approaches, MAPS, administrative costs, savings"),
    blk('src2', "[2] CMS, press release, CMS Takes Bold New Approach to Stewarding Medicaid Demonstration Project Spending (June 11, 2026) — https://www.cms.gov/newsroom/press-releases/cms-takes-bold-new-approach-stewarding-medicaid-demonstration-project-spending"),
    blk('src3', "[3] KFF, 1115 Waiver Watch: A Look at Budget Neutrality Policy Changes (November 5, 2026) — https://www.kff.org/medicaid/issue-brief/1115-waiver-watch-a-look-at-budget-neutrality-policy-changes/ — amendments, fast-track renewal, renewals in 2027"),
    blk('src4', "[4] Public Law 119-21, section 71118 (the 2025 reconciliation law), as cited in SMD #26-003"),
    blk('src5', "[5] " + BOOK3 + " — §3.3.3-3.3.4: Vermont's 1115 portfolio and the budget neutrality constraint as it worked through 2026"),
]

# ════════════════════════════════════════════════════════════════════════════
# Lesson 9 facts: CMS letter to Vermont AHS dated July 7, 2026 (3 pages, read from the PDF itself); CMS approval of the
# January 2, 2025 Global Commitment amendment and approval period July 1, 2022 - Dec 31, 2027 (medicaid.gov, via search
# summaries); Vermont AHS Global Commitment Register listing (GCR 26-014, GCR 26-089, via search summaries; the AHS page
# itself returned 403 to the fetch tool); DVHA budget book (six hospitals committing, via search summary).
L9_SLUG = 'cmmi-vermont-global-commitment'
L9_TITLE = "Vermont's Global Commitment to Health: A Worked Case"
L9 = [
    blk('intro1', "The earlier lessons treated authority, approval and budget neutrality in general terms. This one follows a single demonstration, Vermont's Global Commitment to Health, and a single decision inside it, the Medicaid hospital global budget, to show how the general rules play out in a real file. The case has everything: a long-running waiver, a recent amendment, a state decision to move ahead, and a federal letter that stopped it."),
    blk('intro2', "The lesson is built from primary documents where they could be read: CMS's July 7, 2026 letter to Vermont, which this lesson read in full, and CMS's approval materials for the demonstration. Where the evidence is a state web page that could not be retrieved directly, or a report of one, the lesson says so."),
    blk('intro3', "The point of the case is not to assign blame. It is to show where, in a demonstration's special terms and conditions, the binding rules sit, and why reading them before acting is the cheapest form of risk management a state has."),

    h2('s1h1', 'The Demonstration and Its Terms'),
    blk('s1p1', "Global Commitment to Health is Vermont's primary section 1115 demonstration, originally approved in 2005. In CMS's records, its current approval period runs from July 1, 2022 through December 31, 2027, following a 2022 renewal of about five and a half years. CMS's letter identifies it as project number 11-W-00194/1. Chapter 3 describes it as extending coverage and benefits beyond the standard state plan, including health-related social needs services, expanded developmental disability benefits and substance use disorder treatment models."),
    blk('s1p2', "The binding text of any demonstration is its special terms and conditions, usually shortened to STCs. They set what the state may do, what it must report, how payments are made and what approvals it must obtain first. Lesson 7 introduced them as the document the state and CMS negotiate. This case shows that they are also the document CMS enforces: the July 2026 letter cites two specific STCs, 6.3(a) and 6.4(i)(iii), and nothing else about the demonstration's general purposes."),
    callout('s1c1', "The STCs, not the state's reform plans and not the demonstration's name, are the rules a state is held to. Anything a state wants to do that touches payment, rates or eligibility needs to be checked against them before it starts."),

    h2('s2h1', 'The January 2025 Amendment'),
    blk('s2p1', "CMS approved an amendment to the demonstration on January 2, 2025, effective January 1, 2025, acting on a request Vermont submitted on April 30, 2024. The approval included health-related social needs services and infrastructure, and an initiative to close a gap in substance use disorder coverage. CMS's acceptance letter authorizes the state to provide HRSN services, specifically housing supports, to eligible Medicaid enrollees, and the approval also covers recuperative care, which Chapter 3 describes as short-term medical respite for homeless enrollees."),
    blk('s2p2', "A later CMS letter, dated January 10, 2025, approved the methodologies Vermont will use for the HRSN benefits. Approval of an amendment and approval of the way a state will pay for it are separate steps, and states sometimes treat the first as the last. The amendment is a clean example of the process described in Lesson 7: the state designed, took public comment, submitted, negotiated and obtained approval, then followed with implementation documents."),
    blk('s2p3', "The amendment also falls on the far side of the March 2025 rescission of federal HRSN guidance. As Lesson 7 notes, CMS said existing approvals stand. The amendment's authority is therefore in place through the approval period, and the question for Vermont is what the renewal environment will be when the demonstration's period ends in December 2027."),

    h2('s3h1', 'The Hospital Global Budget'),
    blk('s3p1', "Separately from the amendment, Vermont's Department of Vermont Health Access launched a voluntary Medicaid hospital global budget for 2026. According to DVHA's annual report and budget book for state fiscal year 2027, six Vermont hospitals committed to the model, and the payment functionality was implemented in the claims system in January 2026. The state's own Global Commitment Register shows a policy proposal for the model, GCR 26-014, whose public comment period closed on January 31, 2026 with no comments received."),
    blk('s3p2', "The design was a prospectively set annual payment replacing fee-for-service claims for eligible services at participating hospitals, the same concept as the Medicare-side global budgets in Lesson 4. Chapter 3 explains the motive: Vermont's Act 68 requires global budgets under the Green Mountain Care Board, and a Medicaid global budget was the first piece the state could build on its own."),
    blk('s3p3', "The decision to start in January 2026 rested on a state conclusion about what the demonstration permitted. Chapter 3 states the problem in one sentence: the Medicaid hospital global budget was launched on state, not AHEAD, authority, and CMS later ruled that the demonstration's terms had not authorized it."),

    h2('s4h1', "CMS's July 7, 2026 Letter"),
    blk('s4p1', "On July 7, 2026, the Acting Director of CMS's State Demonstrations Group wrote to Secretary Jenney Samuelson of the Agency of Human Services. The letter notifies the state that the Medicaid hospital global budget implemented by DVHA has not been approved by CMS in accordance with the demonstration's special terms and conditions. It recognizes the state's interest and commitment to value-based payment arrangements such as a global budget, and then states the requirement."),
    blk('s4p2', "The two provisions are specific. STC 6.4(i)(iii) requires that any payment arrangement between AHS or DVHA and providers that is a value-based-payment style fee schedule meet the prior approval requirements for state directed payments in federal managed care regulations at 42 CFR 438.6(c). STC 6.3(a) requires compliance with the actuarial soundness and rate development standards in 42 CFR 438.4 through 438.7. CMS's reasoning is that, without authority for the global budget, those standards prohibit the state from including the global budget's impact in its certified capitation rates. The letter serves as written notice that the state is not compliant with both STCs."),
    steps('s4st1', 'The corrective actions CMS requested', [
        ('Within 60 days', 'DVHA ceases making global budget payments to participating hospitals and pays them under the methodology used for non-participating providers.'),
        ('Within 60 days', 'AHS removes the global budget payments from the applicable calendar year 2026 capitation rates and submits a revised rate certification.'),
        ('Within 6 months', 'DVHA reprocesses all global budget payments made since January 1, 2026 under the non-global-budget methodology, with encounter and financial data corrected and any federal claiming adjusted.'),
        ('Within 30 days of each action', 'The state sends CMS written confirmation that the corrective action is complete.'),
    ]),
    blk('s4p3', "The stakes are stated plainly. If the state does not act, CMS says it will not be able to find the state's calendar year 2026 capitation rates actuarially sound, which federal regulations require, and may initiate procedures under 42 CFR 431.420(d)(1) to terminate or suspend the demonstration for failure to comply. The letter also says historical encounter data under the global budget may not be used for future capitation rate development unless CMS gives prior approval."),
    warning('s4w1', "The point of law is narrow, and the consequences are wide", "CMS's objection is procedural: prior approval for state directed payments and actuarial soundness of capitation rates. It does not say a global budget is bad policy. But because the demonstration is Vermont's main Medicaid authority, a compliance failure puts the whole instrument, not just one program, at risk."),

    h2('s5h1', 'What Followed'),
    blk('s5p1', "Within weeks, Vermont's own web listings show movement. The Agency of Human Services Global Commitment Register lists GCR 26-089, Discontinuation of the Hospital Global Budget Payment Model, with a public comment period from July 21 to August 21, 2026. The Agency of Human Services announced its withdrawal from AHEAD on July 24. On July 28, WCAX reported Secretary Samuelson as still committed to the long-term goal of global budgets but not ready to implement them yet."),
    blk('s5p2', "This lesson could not confirm from primary documents how the state finalized the discontinuation or whether corrective actions were completed within the stated deadlines, because the state web pages that list the proposal could not be retrieved directly. A reader who needs the current status should check the Global Commitment Register, the Medicaid.gov page for the demonstration and DVHA's notices."),
    blk('s5p3', "What the sequence does show is the order of operations Vermont now faces. The Medicare side of a global budget needs a federal vehicle, since AHEAD is no longer one. The Medicaid side needs the demonstration's STCs to authorize the payment arrangement and the capitation rate process to account for it. Act 68's statutory timetable continues to run in the meantime."),

    h2('s6h1', 'Lessons for Any State'),
    blk('s6p1', "Four practical rules emerge. Read the STCs for the payment arrangement before launching it, and obtain written CMS approval where they require it. Treat managed care capitation rates as part of the same decision, since a payment arrangement that changes provider payments changes the rates the actuary must certify. Distinguish state authority, which can authorize a program under state law, from federal authority, which governs whether federal Medicaid matching funds may be claimed. And keep a record of what CMS has actually approved, in writing, so that the state and its providers are clear about what is authorized."),
    blk('s6p2', "These rules are also the safeguards against the problem Chapter 3 puts at the center of its account of 1115 waivers: negotiated instruments reward a state that does the negotiation first and the implementation second. Vermont's case shows the cost of reversing that order, and it also shows that the order can be restored. The demonstration remains in place, its January 2025 amendment stands, and the state's statutory path to global budgets under Act 68 is unchanged."),

    takeaway('tw', [
        "Vermont's Global Commitment to Health demonstration, project 11-W-00194/1, was first approved in 2005 and is approved by CMS from July 1, 2022 through December 31, 2027.",
        "CMS approved a January 2025 amendment, effective January 1, 2025, adding health-related social needs services including housing supports and recuperative care.",
        "DVHA launched a voluntary Medicaid hospital global budget in January 2026, with six hospitals committed according to its budget book.",
        "On July 7, 2026, CMS notified Vermont that the hospital global budget had not been approved under STC 6.4(i)(iii), which requires prior approval for state directed payments, and STC 6.3(a), which requires actuarially sound capitation rates.",
        "CMS asked the state to cease global budget payments and revise its calendar year 2026 capitation rates within 60 days and to reprocess payments made since January 1, 2026 within six months.",
        "CMS said it could not find the 2026 capitation rates actuarially sound if the state did not act, and could begin procedures to terminate or suspend the demonstration.",
        "The special terms and conditions, not the demonstration's purposes, are the rules a state is held to; check them and obtain written approval before launching a payment arrangement.",
    ]),
    quiz('qz',
        "On what basis did CMS's July 7, 2026 letter say Vermont's Medicaid hospital global budget was out of compliance?",
        [
            ("CMS found that global budgets are not permitted in any Medicaid program", False),
            ("The arrangement had not received the prior approval the demonstration's special terms and conditions require for state directed payments, and its effect on capitation rates could not be certified as actuarially sound", True),
            ("Vermont had withdrawn from the Global Commitment to Health demonstration", False),
            ("The global budget was authorized only for Medicare, not Medicaid", False),
        ],
        "The letter cites STC 6.4(i)(iii), which requires prior approval of value-based-payment style arrangements as state directed payments under 42 CFR 438.6(c), and STC 6.3(a), which requires compliance with actuarial soundness and rate development rules in 42 CFR 438.4 through 438.7. CMS's objection was procedural; it expressly recognized the state's interest in value-based payment."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] CMS State Demonstrations Group, letter to Secretary Jenney Samuelson, Vermont Agency of Human Services (July 7, 2026) — https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-gch-stc-compl-lttr-07072026.pdf — notice of noncompliance with STCs 6.3(a) and 6.4(i)(iii); corrective actions"),
    blk('src2', "[2] CMS, Vermont Global Commitment to Health approval of amendment (January 2, 2025) — https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-global-commitment-to-health-appvl-01022025.pdf — HRSN services and infrastructure; approval period through December 31, 2027"),
    blk('src3', "[3] CMS, Vermont Global Commitment to Health acceptance letter (January 30, 2025) — https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-global-commitment-to-health-accept-ltr-01302025.pdf — authorization of housing supports"),
    blk('src4', "[4] Vermont Department of Vermont Health Access, 2025 Annual Report and Governor's Recommended Budget for State Fiscal Year 2027 — https://dvha.vermont.gov/sites/dvha/files/documents/DVHA-25-27-annual-report-and-budget-book.pdf — launch of the voluntary hospital global budget and six committed hospitals"),
    blk('src5', "[5] Vermont Agency of Human Services, 2026 Proposed Policies (Global Commitment Register) — https://humanservices.vermont.gov/2026-proposed-policies — GCR 26-014 and GCR 26-089, as reported in search results; the page itself could not be retrieved by the tool used for this lesson"),
    blk('src6', "[6] " + BOOK3 + " — §3.2.2, §3.3.3: the Global Commitment portfolio, the January 2025 amendment and the July 2026 compliance notice"),
    blk('src7', "[7] WCAX, Vermont drops AHEAD healthcare model; shifts to $195M rural health fund (July 28, 2026) — https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
