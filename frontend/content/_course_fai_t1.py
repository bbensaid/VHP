exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_fai_common.py').read())

# Course: FHIR, AI Governance and Clinical Decision Support in Practice (Chapter 5 companion). Track 1 — FHIR in Practice.
# Verified 2026-11-23: CMS-0057-F fact sheet (read earlier in the CMMI course); ASTP/ONC HTI-5 final-rule fact sheets dated
# Oct 26, 2026 (14 criteria removed, 7 revised; 170.315(b)(11) revised; (g)(10) not listed among removals/revisions; details of
# the DSI revision not confirmed); TEFCA figures via ASTP/Sequoia decks as surfaced by search (11 designated QHINs per a July
# 2026 RCE deck; Facilitated FHIR SOP v2.0, March 2026). Vermont facts (VHIE/Verato MPI, VITL, CIN) are HTR book Chapter 5 and
# are labelled as the book's. Book note (not edited): the platform's AI Governance Lab source notes call HTI-5 'not final as of
# Oct 2026'; ASTP/ONC's own fact sheets dated Oct 26, 2026 describe a final rule.

# ════════════════════════════════════════════════════════════════════════════
L1_SLUG = 'fai-fhir-reality'
L1_TITLE = 'FHIR Is a Standard, Not a Product: What Interoperability Actually Requires'
L1 = [
    blk('intro1', "Health IT leaders hear that their systems are FHIR compliant and conclude that data will flow. It will not, at least not automatically. Chapter 5 of Transforming Healthcare opens its discussion of implementation with a plain statement: FHIR R4 is a standard, not a product, and the existence of the standard does not mean that any two compliant systems can exchange useful data. This lesson explains why, what a working exchange actually requires and what the 2025 to 2026 federal changes mean for the plan."),
    blk('intro2', "It uses the chapter's worked example of a care coordinator in northeastern Vermont learning that a patient's out-of-state emergency visit has just been paid, the federal certification and trust-framework context, and the recent rule changes that affect it. Where a figure comes from the book alone, or from a source the lesson could read only in part, it says so."),
    blk('intro3', "The aim is a clear test for any FHIR project: does it deliver functional interoperability, or only compliance?"),

    h2('s1h1', 'What the Standard Does and Does Not Settle'),
    blk('s1p1', "FHIR, Fast Healthcare Interoperability Resources, is a family of specifications from HL7 for representing health data and exposing it through web interfaces. Release 4, or R4, is the version most regulations name. The standard defines resources, such as a patient, an observation or a medication request, and the ways applications can read and write them. It deliberately leaves room: which data elements a system populates, how it codes them, what business rules it applies and which workflows an exchange triggers are decisions of the implementer."),
    blk('s1p2', "Chapter 5 draws the consequence. A hospital's implementation from one large vendor and a critical access hospital's implementation from another may both be FHIR R4 compliant while exchanging data with different content, triggering different workflows and needing custom integration to work together. Compliance is a property of a system measured against a specification. Interoperability is a property of a relationship between two systems measured against a task. The first can be certified. The second has to be tested."),
    callout('s1c1', "FHIR compliance says a system can speak. Functional interoperability says two systems can hold a useful conversation about a patient. Plan and budget for the second."),

    h2('s2h1', 'The Chapter\'s Test Case'),
    blk('s2p1', "The chapter gives a concrete target. A care coordinator at Northeastern Vermont Regional Hospital should be able to see, in real time, that a patient's Medicaid claim for an emergency visit at a New Hampshire academic medical center has just been processed, so that a follow-up call can be made before the patient is discharged. The chapter notes that this outcome requires FHIR compliance plus patient matching plus event notifications plus care coordinator workflow integration. FHIR makes it theoretically possible, it says; the clinically integrated network's implementation makes it practically achievable."),
    blk('s2p2', "Each element of that list is a separate piece of work. FHIR compliance means the systems expose the right resources through supported interfaces. Patient matching, covered in Lesson 3, means the visit is attached to the right person across organizations. Event notification means someone or something is told when the claim or the encounter arrives, rather than waiting for a query. Workflow integration means the information appears in the coordinator's working screen at the moment a call can be made, and a task is created and tracked. A project that delivers the first and omits the other three will pass an audit and fail the coordinator."),
    steps('s2st1', 'The chain behind one useful alert', [
        ('Expose the data', 'Systems offer standards-based FHIR interfaces with the resources needed.'),
        ('Match the patient', 'Identity services link the encounter to the correct person across organizations.'),
        ('Detect the event', 'A notification or query pattern tells the right person that something happened.'),
        ('Put it in the workflow', 'The coordinator sees it where they work, with a task and a follow-up record.'),
    ]),

    h2('s3h1', 'The Federal Frame in 2026'),
    blk('s3p1', "Several federal instruments shape what organizations must do. The Office of the National Coordinator's certification program requires certified health IT to offer a standardized FHIR API for patient access under criterion 170.315(g)(10), and Chapter 5 notes that Medicare's Promoting Interoperability program reduces payment to hospitals that do not use certified technology meaningfully. CMS's 2024 interoperability and prior authorization rule, CMS-0057-F, requires certain payers to offer provider access, payer-to-payer and prior authorization APIs generally by January 1, 2027, as the CMMI course described."),
    blk('s3p2', "The framework is also moving. On October 26, 2026, the Assistant Secretary for Technology Policy and the ONC published fact sheets describing a final HTI-5 rule, a deregulatory action under which the final rule removed 14 certification criteria and revised seven. The fact sheets list the decision support criterion, 170.315(b)(11), as revised and the older clinical decision support criterion, 170.315(a)(9), as removed, and describe the rule as establishing a new foundation on which to build FHIR-based API requirements. The standardized FHIR API criterion, (g)(10), does not appear in the lists of removals and revisions that the lesson read. The fact sheets are not legal documents and give no calendar effective date, so a reader should confirm details in the Federal Register text."),
    blk('s3p3', "The trust framework layer has also matured. Under the Trusted Exchange Framework and Common Agreement, qualified health information networks connect participants nationally. A July 2026 update from the framework's recognized coordinating entity lists 11 designated networks, and ASTP materials describe a facilitated FHIR implementation standard that reached version 2.0 in March 2026. These figures come from agency and coordinator presentations surfaced by search, and counts change as networks are designated, so check the current list before citing."),
    warning('s3w1', "Dates and counts move", "Certification criteria, payer API deadlines and the number of designated networks have all changed within the last two years. Verify the current status of any federal requirement against the agency page before building a project plan around it."),

    h2('s4h1', 'A Test for Any FHIR Project'),
    blk('s4p1', "The chapter's lesson converts into a short test a project sponsor can apply before approval. Does the project name the task the exchange must support, such as an alert to a named role within a stated time? Does it list who matches patients and how well? Does it say how events reach the user? Does it specify the workflow change and who owns it? And does it include a measure of whether the task is happening, such as the share of eligible discharges for which a follow-up call occurred within two days?"),
    table('s4t1', 'Compliance versus functional interoperability', [
        {'Question': 'What is delivered?', 'Compliance_view': 'A certified interface and a published endpoint', 'Functional_view': 'A task completed for a patient, such as a timely follow-up call'},
        {'Question': 'How is success measured?', 'Compliance_view': 'Certification and audit results', 'Functional_view': 'Share of eligible events handled within a target time'},
        {'Question': 'Who is accountable?', 'Compliance_view': 'The vendor or the IT department', 'Functional_view': 'A named clinical or operations owner'},
        {'Question': 'What fails silently?', 'Compliance_view': 'Mismatched content, no workflow, no alerts', 'Functional_view': 'Little; failures show up as missed tasks'},
    ]),
    blk('s4p2', "Chapter 5's implementation matrix gives indicative figures for a FHIR R4 and API development effort: $150,000 to $500,000 per organization, 12 to 18 months to value and 18 to 24 months to a return crossover. These are the book's indicative ranges. The lesson that follows from them is that interoperability projects are measured in years and in clinical workflow, not in the weeks it takes to turn on an interface."),

    h2('s5h1', 'What Goes Wrong in Practice'),
    blk('s5p1', "Projects that pass certification still fail at predictable points. Terminology is one: two systems may record the same diagnosis, laboratory test or medication with different code sets, so data arrive but cannot be compared or acted on without mapping. Completeness is another: an interface may expose a resource in principle while the underlying system leaves key fields empty because staff never capture them in structured form. Version and profile differences matter, since an implementation guide updated after a system was built may expect elements the system does not supply. Performance and reliability matter too: a query that takes a minute to return will not be used during a clinical visit."),
    blk('s5p2', "Governance failures are as common as technical ones. No one owns the downstream task, consent rules are unclear, or the organization that holds the data has no business reason to answer queries quickly. The corrective is to test with real use: pick a small set of patients and a specific workflow, run it end to end, and record where it breaks. That test is cheaper than discovering the break after go-live."),

    takeaway('tw', [
        "FHIR R4 is a standard, not a product: two compliant systems can differ in the data they populate, the workflows they trigger and the integration they need.",
        "Compliance is measured against a specification; functional interoperability is measured against a task and must be tested.",
        "Chapter 5's example needs FHIR compliance, patient matching, event notifications and workflow integration to deliver one useful alert to a care coordinator.",
        "Certified health IT must offer a standardized FHIR API for patient access under 170.315(g)(10), and CMS-0057-F's payer APIs are generally due by January 1, 2027.",
        "ASTP/ONC's October 26, 2026 fact sheets describe a final HTI-5 rule that removed 14 criteria and revised seven, with details to be confirmed in the Federal Register.",
        "TEFCA networks and FHIR standards are still expanding: a July 2026 coordinator update lists 11 designated networks and the facilitated FHIR standard reached version 2.0 in March 2026.",
        "Before approving a FHIR project, name the task, the patient matching approach, the event path, the workflow owner and the outcome measure.",
    ]),
    quiz('qz',
        "What does Chapter 5 mean by saying FHIR R4 is 'a standard, not a product'?",
        [
            ("FHIR R4 cannot be implemented by hospitals", False),
            ("Compliant systems can still exchange data with different content and workflows, so compliance does not guarantee functional interoperability", True),
            ("FHIR is only used by payers", False),
            ("FHIR R4 has been replaced by a product", False),
        ],
        "A standard defines a framework. Which elements are populated, how they are coded and what workflows they trigger vary by implementation, so two FHIR R4 compliant systems may still need custom integration to work together."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.2.1 (the FHIR implementation reality), §5.6 Figure 5.3 (implementation matrix) and §5.9 (key concepts)"),
    blk('src2', "[2] ASTP/ONC, Health Data, Technology, and Interoperability: ONC Deregulatory Actions to Unleash Prosperity (HTI-5) Final Rule overview (October 26, 2026) — https://healthit.gov/resources/health-data-technology-and-interoperability-onc-deregulatory-actions-to-unleash-prosperity-hti-5-final-rule/ ; and HTI-5 final rule removals or revisions of certification criteria — https://healthit.gov/resources/hti-5-final-rule-removals-or-revisions-of-certification-criteria/"),
    blk('src3', "[3] CMS, CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) fact sheet (January 17, 2024) — https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f"),
    blk('src4', "[4] ASTP, TEFCA updates presentation (February 19, 2026) — https://healthit.gov/wp-content/uploads/2026/02/2026-02-19_TEFCA_Updates_Presentation_508.pdf ; Sequoia Project RCE information call (July 21, 2026) — https://rce.sequoiaproject.org/wp-content/uploads/2026/06/7.21.26-RCE-Info-Call_FINAL.pdf — designated networks and facilitated FHIR standard, as surfaced by search"),
]

# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'fai-three-use-cases'
L2_TITLE = 'Three FHIR Use Cases That Matter Most'
L2 = [
    blk('intro1', "A health system can spend years on interoperability and still not know what it is for. Chapter 5 proposes a discipline: pick the use cases that carry the most value for the transformation agenda and build to them. It names three for Vermont, patient access, provider-to-provider query for care coordination and the payer application programming interfaces that start in 2027. This lesson takes each in turn, with its requirements, its limits and the questions an organization should ask."),
    blk('intro2', "It also examines a policy idea from the chapter, that the state could require commercial plans outside the federal rule to match the federal API standard, and the trust-framework choices that sit under provider-to-provider exchange."),
    blk('intro3', "The three use cases are not unique to Vermont. They are the common core of a state's FHIR agenda."),

    h2('s1h1', 'Use Case One: Patient Access'),
    blk('s1p1', "The first use case is the one federal rules have made universal. Under the ONC certification criterion known as 170.315(g)(10), every certified electronic health record must offer a standardized FHIR R4 API, built on the US Core implementation guide, through which patients and the apps they choose can retrieve their records. The chapter notes that SMART App Launch authorization must be configured and that patient apps are not themselves certified, since the patient chooses them. Medicare's Promoting Interoperability program requires hospitals to use certified technology."),
    blk('s1p2', "For a hospital the task is baseline compliance: confirm the certified product version, check the published listing for the version actually running, configure authorization and publish the endpoint. The chapter flags a specific risk for smaller critical access hospitals, which may run older certified versions, so the check should be made rather than assumed. The value to patients is real but modest unless the data in the API are complete and current, and unless the organization can support patients who use it."),
    blk('s1p3', "Patient access also matters for the other two use cases. An organization that has configured authorization, mapped its data to the common profiles and tested the API has built much of the foundation for provider-facing exchange."),

    h2('s2h1', 'Use Case Two: Provider-to-Provider Query'),
    blk('s2p1', "The chapter calls this the highest-value use case for Vermont's clinically integrated network. It lets care coordinators in one organization query clinical records from another organization for shared patients, enabling real-time coordination across the network, and it underlies the regionalization the network is meant to support. The requirements are demanding: an EHR-to-EHR query capability, a master patient index so patients match across organizations, a trust framework and consent management."),
    blk('s2p2', "The trust framework is the part organizations most often underestimate. Chapter 5 lists eHealth Exchange, Carequality, CommonWell and the Trusted Exchange Framework and Common Agreement, whose designated networks must support facilitated FHIR exchange. These frameworks set the legal and technical rules under which one organization may ask another for a patient's record, including identity assurance, permitted purposes and audit. The book's key concepts add that Vermont's health information exchange connected through eHealth Exchange in 2024 to deliver continuity of care documents into the state's largest health network's EHR. Joining a framework is not the same as using it: the organization still has to configure queries, respond to requests and handle consent."),
    callout('s2c1', "Provider-to-provider query is a legal and operational arrangement as much as a technical one. Choose the trust framework first; the technical design follows from its rules."),

    h2('s3h1', 'Use Case Three: Payer APIs'),
    blk('s3p1', "The third use case starts in 2027. CMS-0057-F requires impacted payers to expose FHIR APIs that let in-network providers retrieve a patient's claims and clinical data and request prior authorization electronically, with the Da Vinci implementation guides for coverage requirements discovery, documentation templates and rules, and prior authorization support, generally by January 1, 2027. As the CMMI course set out, the impacted payers are Medicare Advantage organizations, state Medicaid and CHIP programs, Medicaid and CHIP managed care plans and qualified health plan issuers on the federally facilitated exchanges."),
    blk('s3p2', "Chapter 5 observes that in Vermont, the impacted payers are the state Medicaid program and Medicare Advantage plans, and that commercial plans sold through Vermont Health Connect, a state-based exchange, are not impacted payers under the rule. Its policy suggestion follows: because those plans fall outside the federal rule, the Green Mountain Care Board could require carriers to match the federal API standard as a condition of rate approval. That is the chapter's proposal, not an existing requirement, and the lesson did not find evidence that the Board has adopted it."),
    blk('s3p3', "For providers the question is whether the EHR can consume the payer APIs. A hospital whose EHR cannot will keep doing prior authorization by fax and phone, as the chapter puts it. The practical step is to ask the EHR vendor now which Da Vinci guides it supports, on what schedule and at what cost, and to ask each major payer for its API readiness plan."),
    table('s3t1', "The three use cases at a glance (HTR Figure 5.1, summarized)", [
        {'Use_case': 'Patient access (g)(10)', 'What_it_enables': 'Patients and their chosen apps retrieve records via FHIR R4 and US Core', 'Key_requirement': 'Certified EHR version; SMART authorization; published endpoint', 'Vermont_priority': 'Baseline compliance for every hospital; check smaller critical access hospitals\' versions'},
        {'Use_case': 'Provider-to-provider query', 'What_it_enables': 'Care coordinators query records from another organization for shared patients', 'Key_requirement': 'EHR-to-EHR query; patient matching; trust framework; consent', 'Vermont_priority': 'Highest value for the care network; priority for Rural Health Transformation IT investment'},
        {'Use_case': 'Payer APIs (CMS-0057-F)', 'What_it_enables': 'Providers retrieve claims data and submit electronic prior authorization', 'Key_requirement': 'EHR support for CRD, DTR and PAS; payer APIs by Jan 1, 2027', 'Vermont_priority': 'Administrative simplification; state exchange plans outside the rule'},
    ]),

    h2('s4h1', 'Sequencing the Three'),
    blk('s4p1', "The three build on one another. Patient access is the baseline and the easiest to complete. Provider-to-provider query depends on identity matching and a trust framework, and is where most of the value and most of the work lie. Payer APIs depend on the EHR's capabilities and on payers' timetables and so are partly outside the organization's control. A reasonable plan completes patient access first, builds provider query for the highest-volume shared-patient relationships, and prepares the EHR for payer APIs ahead of 2027."),
    blk('s4p2', "Whichever order is chosen, assign an owner for each and a date, and tie each to a measure of use: the share of eligible patients who have accessed their records, the share of care-coordination encounters that used an external query, the share of prior authorization requests submitted electronically. A use case with no measure of use is still a project."),

    h2('s5h1', 'Questions to Put to Vendors and Partners'),
    blk('s5p1', "Each use case generates a short list of questions for the parties who control the pieces. For patient access: which certified version are we running, is the listing current, what share of our patient data elements are exposed in the API and how many patients have connected an app? For provider query: which trust framework do we participate in, which organizations can we reach today, what is the response time and the failure rate, and who handles consent? For payer APIs: which Da Vinci implementation guides does our EHR support, on what schedule and for what price, and what are our largest payers' dates and test environments?"),
    blk('s5p2', "Write the answers down, with dates. The answers change, and a record of what a vendor promised in a given month is valuable when schedules slip. It is also the basis for contract language: a vendor that commits to a capability by a date should accept a remedy if it does not deliver, which is the same discipline the book applies to artificial intelligence vendors in later lessons."),
    blk('s5p3', "Notice that none of these questions is about the standard itself. They are about schedules, scope and use, which is where most interoperability projects succeed or fail."),
    table('s5t1', 'Example measures of use for each use case', [
        {'Use_case': 'Patient access', 'Example_measure': 'Share of patients with an active connected app; share of API calls returning complete data', 'Why_it_matters': 'Shows whether access is real, not just available'},
        {'Use_case': 'Provider query', 'Example_measure': 'Share of care coordination encounters using an external query; median response time', 'Why_it_matters': 'Shows whether the exchange is in the workflow'},
        {'Use_case': 'Payer APIs', 'Example_measure': 'Share of prior authorization requests submitted electronically; average decision time', 'Why_it_matters': 'Shows whether administrative burden is falling'},
    ]),

    takeaway('tw', [
        "Chapter 5 names three priority FHIR use cases: patient access, provider-to-provider query for care coordination and the payer APIs required from 2027.",
        "Patient access under 170.315(g)(10) requires a certified EHR version, SMART App Launch authorization and a published FHIR R4 endpoint; patient apps are not certified.",
        "Provider-to-provider query needs EHR-to-EHR query, a master patient index, a trust framework such as eHealth Exchange, Carequality, CommonWell or TEFCA, and consent management.",
        "The trust framework is the legal and operational foundation of provider query; choose it before designing the technical flow.",
        "CMS-0057-F's payer APIs are generally due by January 1, 2027; Vermont's impacted payers are Medicaid and Medicare Advantage, and state exchange plans are outside the rule.",
        "The chapter proposes that the Green Mountain Care Board could require carriers to match the federal API standard in rate approval; no adoption was found.",
        "Sequence the three, assign owners and measure use, not only delivery.",
    ]),
    quiz('qz',
        "Which payers does Chapter 5 say are NOT impacted payers under CMS-0057-F in Vermont?",
        [
            ("Vermont Medicaid", False),
            ("Medicare Advantage plans", False),
            ("Commercial plans sold through Vermont Health Connect, a state-based exchange", True),
            ("All payers, since the rule applies only outside Vermont", False),
        ],
        "The chapter states that the impacted payers in Vermont are Vermont Medicaid and Medicare Advantage plans, and that commercial plans sold through the state-based exchange fall outside CMS-0057-F, which is why it suggests the Green Mountain Care Board might require carriers to match the API standard."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.2.2 and Figure 5.1: the three priority FHIR use cases; §5.8 and §5.9"),
    blk('src2', "[2] CMS, CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) fact sheet (January 17, 2024) — https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f — impacted payers and API dates"),
    blk('src3', "[3] ASTP/ONC, certification criterion 170.315(g)(10), standardized API for patient and population services, and the HTI-5 final-rule criteria tables (October 26, 2026) — https://healthit.gov/resources/hti-5-final-rule-removals-or-revisions-of-certification-criteria/"),
    blk('src4', "[4] ASTP, TEFCA updates presentation (February 19, 2026) — https://healthit.gov/wp-content/uploads/2026/02/2026-02-19_TEFCA_Updates_Presentation_508.pdf"),
    blk('src5', "[5] HTR Research Lab, FHIR Implementation Guide — https://healthtransformationreview.org/research-lab/interoperability?tab=fhir-guide"),
]

# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'fai-master-patient-index'
L3_TITLE = 'The Master Patient Index: The Unglamorous Gate'
L3 = [
    blk('intro1', "Every use case in the previous lesson that moves records between organizations depends on one thing: knowing that two records belong to the same person. Chapter 5 treats the master patient index as Vermont's identity management challenge, and its Beyond Vermont box makes a broader claim that it is the piece of infrastructure every multi-organization care network eventually discovers it cannot do without. This lesson explains what an index does, why matching is hard, what Chapter 5 says about Vermont's situation and how to use identity as a go or no-go gate."),
    blk('intro2', "It relies on the chapter's account of Vermont's index, which the lesson could not independently verify, and on general principles of record linkage. It states no match-rate figures, because the chapter itself reports that Vermont's are not publicly documented."),
    blk('intro3', "The lesson ends with a short checklist for assessing an identity service before a care coordination project depends on it."),

    h2('s1h1', 'What the Index Does'),
    blk('s1p1', "A master patient index is a central service that maintains a consistent patient identity across several organizations. When a hospital, a primary care practice and a payer each hold a record for the same person, the index links them so that a query for one record can find the others. The chapter's example is a patient who appears as 'John Smith, born March 14, 1952' at a large academic hospital, the same name and date at a critical access hospital and 'Jonathan Smith' with the same birth date in a Medicaid enrollment file. A reliable index recognizes these as one person, and, just as important, does not wrongly merge two different people who share a name and a birth date."),
    blk('s1p2', "The failure modes are symmetric. A missed match splits one person across several records, so the care coordinator sees an incomplete picture and may miss a hospitalization or a medication. A false match merges two people, so one patient's information appears in another's chart, which is a safety and privacy event. Index design is a balance between these errors, and the balance is a clinical and legal choice, not only a technical one."),
    callout('s1c1', "A missed match hides information; a false match exposes it. An identity service must be judged on both errors, and the tolerance for each must be chosen on purpose."),

    h2('s2h1', 'Why Matching Is Hard'),
    blk('s2p1', "Names change with marriage, are spelled in several ways and are recorded differently across systems. Dates of birth are sometimes entered wrongly. Addresses change, and rural addresses may be informal. Newborns may not have names. People may give nicknames, use different surnames in different settings or have no fixed address. Identifiers such as a state Medicaid number are not shared across all organizations, and national identifiers are not generally available in health care."),
    blk('s2p2', "Three broad approaches exist. Deterministic matching requires exact agreement on chosen fields, which is simple and fast but misses variants. Probabilistic matching scores the likelihood that two records are the same person using many fields and tolerates spelling differences. Referential matching compares records with an external reference data set to resolve identity. Vendors combine them, and the vendor's method and thresholds affect the error rates. The chapter reports that Vermont's health information exchange runs an index built on a commercial vendor's platform for connected providers."),

    h2('s3h1', "Vermont's Situation, as the Chapter Describes It"),
    blk('s3p1', "Chapter 5 states that Vermont's exchange runs an index built on the Verato platform for connected providers, but that it does not cover all Vermont providers, does not include all out-of-state encounters and does not have validated match rates documented publicly. These are the book's statements, and the lesson did not find public documentation to confirm or refute them. If they are accurate, they imply that cross-organization coordination across the network is currently limited by identity as well as by data format."),
    blk('s3p2', "Its recommendation is to extend the existing identity service to every member of the clinically integrated network rather than build a second one, so that all members share one patient identity system. The reasoning is economic and technical: the cost is modest relative to the value, a single identity service avoids duplicate or conflicting identities, and a reliable index is the prerequisite for virtually every care coordination use case the network is meant to enable."),
    blk('s3p3', "The recommendation is also a statement about governance. A shared identity service needs a governance body that decides matching thresholds, handles disputed matches, controls who may query and audits use. Extending an index to many organizations without that structure moves the technical problem into a legal and operational one."),

    h2('s4h1', 'Identity as a Go or No-Go Gate'),
    blk('s4p1', "The chapter's Beyond Vermont box states the general lesson. Organizations invest first in visible technology such as a portal, a dashboard or an AI tool, and defer the index because it produces no demonstrable output by itself. Then they discover that every care coordination feature they wanted depends on it. The box concludes that a reliable index should be treated as a go or no-go gate for any care coordination initiative, in any state."),
    blk('s4p2', "Turning that into practice means asking, before funding a project that moves data between organizations, whether a reliable identity service exists, who operates it, what its documented match performance is and whether it covers the organizations in scope. If the answers are no, the first investment is identity and not the dashboard."),
    steps('s4st1', 'Assessing an identity service before a care coordination project', [
        ('Scope', 'Which organizations and which populations does the service cover, and which does it miss, such as out-of-state encounters?'),
        ('Performance', 'What are the documented rates of missed and false matches, how were they measured and when?'),
        ('Method', 'Is matching deterministic, probabilistic or referential, and are thresholds configurable and reviewed?'),
        ('Governance', 'Who decides disputed matches, who can query and how is use audited?'),
        ('Privacy and consent', 'How are consent-restricted records, such as substance use disorder records, handled?'),
        ('Operations', 'How are duplicates detected and repaired, and who is responsible?'),
    ]),
    warning('s4w1', "Do not accept a match rate without a definition", "A figure such as '98 percent' means little without the denominator, the sample, the reference standard and the split between missed and false matches. Ask for the method as well as the number."),

    h2('s5h1', 'Privacy, Consent and the Identity Layer'),
    blk('s5p1', "An identity service sits at the center of privacy controls. It decides which records belong together, which is exactly the information a privacy rule may restrict. Substance use disorder treatment records, for example, are subject to additional federal confidentiality rules, and an index that links them to a general medical record without regard to consent can create a compliance problem. Mental health notes, reproductive health information and records of minors raise similar questions under state and federal law."),
    blk('s5p2', "A well-governed service therefore separates two functions: knowing that records belong to the same person, and deciding who may see what. The first can be broad. The second must follow consent, purpose and role. The contract checklist in the finance course raised the same issue as data-sharing term for consent-restricted records, which a payer or an exchange may suppress, so that costs and events invisible to the organization still count against it."),
    blk('s5p3', "For a regional network the practical rule is to design consent handling into the identity project from the start. Retrofitting it after hundreds of thousands of patients have been linked is far harder than deciding the rules before the first load, and a single consent failure can set back public trust in the whole exchange."),
    h2('s6h1', 'Cost, Timing and Who Pays'),
    blk('s6p1', "Chapter 5 says the investment cost of extending an existing identity service is modest relative to its value but gives no figure, and this lesson did not find a public cost estimate. The practical consequence is that a network should obtain quotes before assuming the answer. Three cost drivers are the number of organizations to connect, the quality of each organization's demographic data, which determines how much cleanup is needed, and the volume of queries. Data cleanup is often the largest and least visible item."),
    blk('s6p2', "Who pays is a governance question. If the network funds the service centrally, small members benefit from a capability they could not afford. If each member pays per record or per query, the smallest hospitals may postpone joining. The Rural Health Transformation funds the chapter mentions for information technology investments are a possible source, subject to the time limits discussed in the political sustainability course."),

    takeaway('tw', [
        "A master patient index links records for the same person across organizations; it must avoid both missed matches, which hide information, and false matches, which expose it.",
        "Matching is hard because of name variants, date errors, address changes and the lack of a shared national identifier.",
        "Deterministic, probabilistic and referential methods trade simplicity against tolerance of variation; the method and thresholds affect error rates.",
        "Chapter 5 states that Vermont's exchange runs a commercial-vendor index for connected providers that does not cover all providers or all out-of-state encounters and has no publicly documented match rates; this lesson could not verify those statements.",
        "The chapter recommends extending the existing identity service to every network member and treating a reliable index as a go or no-go gate for any care coordination initiative.",
        "A shared identity service needs governance for thresholds, disputed matches, access and audit.",
        "Ask for the method and the definition behind any match rate before relying on it.",
    ]),
    quiz('qz',
        "Why does Chapter 5 recommend treating the master patient index as a go or no-go gate?",
        [
            ("Because it is the most visible technology investment", False),
            ("Because every care coordination feature depends on it and organizations that defer it discover this late", True),
            ("Because it generates the largest revenue", False),
            ("Because federal law requires a single national index", False),
        ],
        "The chapter's Beyond Vermont box says organizations invest first in visible technology and defer the index because it produces no demonstrable output, then find that every care coordination feature depends on it; so a reliable index should be a gate for any care coordination initiative."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.2.3 and the Beyond Vermont box: the master patient index, Vermont's identity management challenge"),
    blk('src2', "[2] " + BOOK5 + " — §5.9: master patient index, CommonWell and Carequality, TEFCA (key concepts)"),
    blk('src3', "[3] ASTP, TEFCA updates presentation (February 19, 2026) — https://healthit.gov/wp-content/uploads/2026/02/2026-02-19_TEFCA_Updates_Presentation_508.pdf — identity and exchange framework context"),
    blk('src4', "[4] HTR Research Lab, FHIR Interoperability Lab — https://healthtransformationreview.org/research-lab/interoperability?tab=fhir"),
]

LESSONS = [(L1_SLUG, L1_TITLE, L1, 1), (L2_SLUG, L2_TITLE, L2, 2), (L3_SLUG, L3_TITLE, L3, 3)]
if __name__ == '__main__':
    run(LESSONS)
