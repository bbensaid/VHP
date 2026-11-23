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

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8)]
if __name__ == '__main__':
    run(LESSONS)
