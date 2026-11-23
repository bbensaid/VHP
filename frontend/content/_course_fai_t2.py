exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_fai_common.py').read())

# Track 2 — AI Governance. Verified 2026-11-23: FDA final PCCP guidance of Dec 4, 2024 (Federal Register 2024-28361, via
# search summaries); ONC HTI-1 DSI requirements (13 source attributes evidence-based, 31 predictive; FAVES intent) via ONC
# and AHIMA summaries; HTI-5 final rule fact sheets of Oct 26, 2026 (read); 45 CFR 92.210 (applicable May 1, 2025; not among the
# provisions in the HHS/CMS Notice of Vacatur of June 2, 2026, 91 FR 32887, which says other provisions remain in force; read);
# CMS MA FAQ of Feb 6, 2024 (law-firm summaries only; the FAQ itself not read); Lukac et al., NEJM AI (Nov 2025) via UCLA/
# PubMed summaries (the PubMed page itself could not be read); Rotenstein et al., JAMA 2026;335(16):1408-1417 (read, first
# ~40% verbatim). Clinical-governance lifecycle and rural issues: HTR book Chapter 5 §5.3. Platform AI Governance Lab: 62 items,
# eight domains (Clinical Validation 8, Data Quality 8, Bias & Equity 8, Transparency 9, Oversight & Monitoring 9,
# Ethics & Patient Rights 7, Vendor & Third-Party Governance 6, Security & Incident Response 7), counted from source.

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'fai-ai-regulatory-landscape'
L4_TITLE = 'The Federal Landscape for Clinical AI: Four Instruments, Four Statuses'
L4 = [
    blk('intro1', "A hospital deploying a clinical AI tool asks whether it is regulated, by whom and what it must do. The honest answer is that several federal instruments touch it from different directions, each with its own scope and its own status, and that two of them changed during the last year. Chapter 5 puts it in one line: federal expectations are real but unsettled, which is why an organization or a state cannot simply defer to them."),
    blk('intro2', "This lesson sets out four instruments the chapter names: the Food and Drug Administration's regulation of AI-enabled device software, the Office of the National Coordinator's decision support transparency requirements, the Section 1557 nondiscrimination rule's provision on patient care decision support tools, and Medicare Advantage guidance on algorithms in coverage decisions. For each it gives what it requires, its status as far as this course could verify it, and what an organization should do about it."),
    blk('intro3', "Where the lesson relied on summaries instead of the primary document, it says so, since this is an area in which an out-of-date statement can mislead."),

    h2('s1h1', 'Instrument One: FDA and AI-Enabled Device Software'),
    blk('s1p1', "The FDA regulates software that performs a medical function, diagnosing, treating, mitigating or preventing disease, as software as a medical device. Chapter 5's glossary notes that clinical AI tools that influence clinical decisions may fall in this category and need clearance. The question that matters to a buyer is whether the specific tool has a clearance, authorization or de novo classification for the use the hospital intends."),
    blk('s1p2', "The December 2024 development is the agency's final guidance on predetermined change control plans, published in the Federal Register on December 4, 2024 under the title Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions. The final guidance covers all AI-enabled device software functions, where the earlier draft had covered machine-learning devices. A plan lets a manufacturer pre-authorize described modifications, such as retraining a model on new data within specified limits, without a new submission for each. The guidance expects labeling to tell users when a device incorporates machine learning and has an authorized plan, so that users know updates may change performance. Law firm summaries report that it also changed the data language from training and testing to training, tuning and testing and added a section on version control."),
    blk('s1p3', "For a hospital the relevance is concrete. A model that updates under a predetermined plan will change behavior without a new purchase decision. The contract should therefore require advance notice of updates and a right to re-evaluate, which is the vendor-management stage covered in the next lesson. Not every AI tool is a regulated device: administrative tools, scheduling and some documentation tools are outside the device framework, which is why the other instruments matter."),

    h2('s2h1', 'Instrument Two: ONC and Decision Support Transparency'),
    blk('s2p1', "ONC's HTI-1 final rule, published in January 2024, created a certification criterion for decision support interventions, 170.315(b)(11), that requires certified health IT developers to give users access to source attributes of the decision support the developer supplies. Agency and association summaries describe 13 source attributes for evidence-based interventions and 31 for predictive interventions, which are those that derive relationships from training data. ONC's stated intent was that the attributes would help organizations judge whether a predictive tool is fair, appropriate, valid, effective and safe. The requirement applies to interventions created by the developer of certified technology, not to third-party tools."),
    blk('s2p2', "Chapter 5 notes that the December 2025 proposal known as HTI-5 would remove most of that requirement. The status has since moved. ASTP and ONC published fact sheets on October 26, 2026 describing a final HTI-5 rule that removed 14 certification criteria and revised seven. Those fact sheets list the decision support criterion as revised, effective on the final rule's effective date, and the older clinical decision support criterion as removed. The proposed rule had stated that the revision would remove the model-card requirements for artificial intelligence, and the final fact sheets do not confirm whether that part was finalized, so a reader should consult the Federal Register text."),
    callout('s2c1', "A transparency requirement that a developer must meet does not remove the buyer's need for the information. If source attributes are no longer required of every developer, the hospital must ask for them in the contract."),

    h2('s3h1', 'Instrument Three: Section 1557 and Decision Support Tools'),
    blk('s3p1', "The nondiscrimination rule issued under Section 1557 of the Affordable Care Act includes a provision at 45 CFR 92.210 on patient care decision support tools. Covered health programs and activities must make reasonable efforts to identify tools in their care that use protected characteristics as inputs, and to mitigate the risk of discrimination from their use. Sources report that the provision became applicable on May 1, 2025."),
    blk('s3p2', "Its 2026 status can be stated with care. On June 2, 2026 HHS and CMS published a notice of vacatur in the Federal Register, 91 FR 32887, implementing a federal court's final judgment in Tennessee v. Kennedy. The notice lists the provisions vacated, which concern gender identity, and says the other provisions of the 2024 rule remain in force. Section 92.210 does not appear in the notice's list of vacated provisions. A hospital should therefore treat 92.210 as in force while checking for later changes."),
    blk('s3p3', "The obligation is practical but demanding. It asks the organization to inventory its decision support tools, find those that use race, ethnicity, age, sex or disability as inputs, and decide what to do about them. The platform's AI governance checklist, covered in later lessons, includes bias and equity items that map to this work."),

    h2('s4h1', 'Instrument Four: Medicare Advantage and Algorithms'),
    blk('s4p1', "In February 2024 CMS issued frequently asked questions for Medicare Advantage organizations that address algorithms and artificial intelligence in coverage decisions. Law firm summaries, the only sources this lesson read, report that CMS allows tools to assist decisions if they comply with the coverage rules, that decisions must be based on each patient's individual circumstances, that an algorithm cannot be the sole basis for denying an inpatient admission or downgrading to observation, and that CMS is concerned about tools that perpetuate bias. Chapter 5 summarizes the guidance as saying algorithms cannot replace the individualized medical-necessity review that coverage rules require."),
    blk('s4p2', "This instrument is mostly the payer's concern, but providers feel its effects. A hospital that sees a pattern of denials that look algorithmic can cite the guidance in appeals and in contract discussions. A hospital that builds its own utilization management tools should apply the same standard to them, and should expect payers to ask."),
    table('s4t1', 'Four federal instruments for clinical AI (status as far as verified for this course)', [
        {'Instrument': 'FDA: AI-enabled device software and predetermined change control plans', 'Applies_to': 'Software that performs a medical device function', 'Status': 'Final PCCP guidance published Dec 4, 2024 (Federal Register)', 'Buyer_action': 'Confirm clearance for the intended use; require update notice'},
        {'Instrument': 'ONC decision support interventions, 170.315(b)(11)', 'Applies_to': 'Developers of certified health IT, for their own interventions', 'Status': 'HTI-1 (2024) set 13 and 31 source attributes; HTI-5 final rule fact sheets of Oct 26, 2026 list the criterion as revised', 'Buyer_action': 'Ask for the information in the contract; confirm the final text'},
        {'Instrument': 'Section 1557, 45 CFR 92.210', 'Applies_to': 'Covered health programs using patient care decision support tools', 'Status': 'Applicable May 1, 2025; not listed among provisions vacated in the June 2, 2026 notice', 'Buyer_action': 'Inventory tools that use protected characteristics; mitigate risk'},
        {'Instrument': 'CMS Medicare Advantage FAQs on algorithms (Feb 2024)', 'Applies_to': 'Medicare Advantage organizations', 'Status': 'Guidance; read through law firm summaries only', 'Buyer_action': 'Use in appeals and contracting; apply the standard to your own tools'},
    ]),

    h2('s5h1', 'Turning the Landscape Into a Register'),
    blk('s5p1', "A practical way to cope with a moving landscape is a one-page register of obligations. For each clinical AI tool, record whether it is a regulated device and its clearance status, whether the developer is a certified health IT developer and what source information it supplies, whether it uses protected characteristics as inputs, and whether it is used by or against a Medicare Advantage plan in coverage decisions. Review the register when a rule changes. The 2026 changes to the ONC criterion show why: a tool that came with detailed source attributes under one rule may not under the next, while the buyer's need for the information stays the same."),
    blk('s5p2', "The register also gives the governance committee a starting point. The four-stage lifecycle in the next lesson asks questions that the register helps answer: is the tool cleared, what do we know about its training data, how will we monitor it and what has the vendor committed to?"),

    takeaway('tw', [
        "Chapter 5 says federal expectations for clinical AI are real but unsettled, so an organization cannot simply defer to them.",
        "FDA's final guidance of December 4, 2024 on predetermined change control plans covers all AI-enabled device software functions and expects labeling to disclose machine learning and an authorized plan.",
        "ONC's HTI-1 set 13 source attributes for evidence-based and 31 for predictive decision support interventions created by certified developers; HTI-5 fact sheets of October 26, 2026 describe a final rule that revised that criterion, with details to be confirmed.",
        "Section 1557's 45 CFR 92.210 has applied since May 1, 2025 and does not appear among the provisions vacated in the June 2, 2026 notice, which says other provisions remain in force.",
        "CMS's February 2024 Medicare Advantage FAQs, as summarized by law firms, require individualized decisions and bar algorithm-only denials of inpatient admissions.",
        "If a developer is no longer required to supply transparency information, the buyer should require it by contract.",
        "Keep a one-page obligations register per clinical AI tool and review it whenever a rule changes.",
    ]),
    quiz('qz',
        "What does the June 2, 2026 Federal Register notice on Section 1557 say about 45 CFR 92.210?",
        [
            ("It vacates 92.210 in its entirety", False),
            ("It does not list 92.210 among the vacated provisions and says the 2024 rule's other provisions remain in force", True),
            ("It extends the compliance date for 92.210 to 2030", False),
            ("It replaces 92.210 with a new FDA requirement", False),
        ],
        "The notice implements a court judgment vacating certain provisions related to gender identity. It does not list 92.210 and states that the other provisions of the 2024 rule remain in force, so the decision support provision is treated as in force."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.3 (AI clinical governance) and §5.9 (SaMD, 45 CFR 92.210)"),
    blk('src2', "[2] FDA, Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions, final guidance, Federal Register notice of December 4, 2024 — https://www.govinfo.gov/content/pkg/FR-2024-12-04/html/2024-28361.htm"),
    blk('src3', "[3] ASTP/ONC, HTI-5 final rule overview and criteria tables (October 26, 2026) — https://healthit.gov/resources/hti-5-final-rule-removals-or-revisions-of-certification-criteria/ ; HTI-1 decision support interventions fact sheet — https://www.healthit.gov/sites/default/files/page/2023-12/HTI-1_DSI_fact sheet_508.pdf"),
    blk('src4', "[4] HHS and CMS, Notice of Vacatur Regarding Certain Provisions of the 2024 Nondiscrimination in Health Programs and Activities Final Rule, 91 Fed. Reg. 32887 (June 2, 2026) — https://www.govinfo.gov/content/pkg/FR-2026-06-02/html/2026-11015.htm"),
    blk('src5', "[5] DLA Piper, CMS Issues FAQ to Medicare Advantage Organizations (February 2024) — https://www.dlapiper.com/insights/publications/2024/02/cms-issues-faq-to-medicare-advantage-organizations — summary of the CMS FAQ; the FAQ itself was not read"),
]

# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'fai-governance-lifecycle'
L5_TITLE = 'The Four-Stage AI Governance Lifecycle'
L5 = [
    blk('intro1', "Governance of a clinical AI tool is not a single approval. It is a lifecycle that begins before purchase and continues for as long as the tool is in use. Chapter 5 organizes the work into four stages: pre-deployment evaluation, implementation and training, active monitoring, and vendor management. This lesson walks through each, explains the reasoning behind the chapter's questions and shows how they connect to the platform's 62-item governance checklist."),
    blk('intro2', "The framework is generic. A hospital anywhere can use it for an ambient scribe, a sepsis alert, a readmission predictor or an imaging algorithm. Its power is in sequence: each stage produces information the next needs, and skipping one leaves the organization unable to answer questions it will be asked after something goes wrong."),
    blk('intro3', "The lesson ends with a short example of a monitoring plan and a note on what the checklist adds."),

    h2('s1h1', 'Stage One: Pre-Deployment Evaluation'),
    blk('s1p1', "Before any clinical AI tool is deployed, the chapter says the organization must evaluate five things. First, regulatory status: is the tool a software as a medical device, and if so, what FDA clearance or de novo classification has it received? Second, training data provenance: was the model trained on data representative of the population, including rural Medicare beneficiaries and elderly patients with several conditions? Third, bias testing: has the developer tested and published performance stratified by race and ethnicity, age, sex and disability? Fourth, clinical validation: has the tool been validated in a setting comparable to the deployment setting, not only in the academic centers where most AI research is done? Fifth, intended use: is the use case unambiguous, and is it the one for which the tool was designed and validated?"),
    blk('s1p2', "These questions are about evidence and fit. A model with excellent published accuracy on a large academic population may perform differently in a small rural hospital whose patients, coding and workflows differ. A tool cleared for one use may be pushed into another by an enthusiastic vendor. Asking the five questions in writing, and keeping the answers, creates the record a governance committee needs to approve, defer or decline."),
    callout('s1c1', "Pre-deployment evaluation is where a hospital can say no cheaply. After go-live, saying no means removing a tool people rely on."),

    h2('s2h1', 'Stage Two: Implementation and Training'),
    blk('s2p1', "Deployment is where many tools succeed or fail. The chapter lists four requirements. Workflow integration planning: where does the output appear, and how does the clinician interact with it? A tool whose alerts are ignored by busy clinicians adds no value and may add risk. Clinician training that goes beyond how to use the tool to what it does and does not know, where it performs well and poorly and how to recognize unreliable output. Override protocols that document when and how clinicians should override a recommendation. And baseline performance measurement, which establishes pre-deployment metrics against which later performance can be compared."),
    blk('s2p2', "The last item is the most often skipped, and it is what makes the next stage possible. Without a baseline, an organization cannot say whether documentation time fell, whether readmissions changed or whether a prediction tool's accuracy has drifted. A baseline need not be elaborate: a few months of the relevant measure, defined in advance, from the same data source that will be used afterward."),

    h2('s3h1', 'Stage Three: Active Monitoring'),
    blk('s3p1', "Models change in effect even when their code does not, because the population and practice around them change. The chapter lists four monitoring duties. Performance drift monitoring against the pre-deployment baseline, monthly or quarterly, to detect degradation early. Equity monitoring, tracking performance separately for priority populations, since average metrics can hide differential performance. Adverse event reporting, a formal route for clinicians to report cases in which AI output contributed to harm, delayed care or was clearly wrong. And override rate tracking, since consistently high override rates signal that the output is not clinically trustworthy."),
    blk('s3p2', "Override rates deserve a note. A high override rate may mean a poor tool, a poor workflow or a clinician who has learned to ignore alerts, and these have different remedies. Reading the rate alongside the reasons clinicians give, and alongside outcomes, helps separate them. The next track returns to alert fatigue in decision support."),
    table('s3t1', 'A sample monitoring plan for a predictive tool (illustrative)', [
        {'Measure': 'Discrimination or accuracy against the baseline', 'Frequency': 'Monthly', 'Owner': 'Clinical informatics', 'Trigger_for_review': 'Fall beyond a pre-set band from baseline'},
        {'Measure': 'Performance by subgroup (age, sex, race and ethnicity, language, rurality, disability)', 'Frequency': 'Quarterly', 'Owner': 'Quality and equity lead', 'Trigger_for_review': 'Gap between any subgroup and the overall rate above a set threshold'},
        {'Measure': 'Override rate and recorded reasons', 'Frequency': 'Monthly', 'Owner': 'Service line clinical lead', 'Trigger_for_review': 'Sustained high or rising override rate'},
        {'Measure': 'Adverse event and near-miss reports', 'Frequency': 'Continuous; reviewed monthly', 'Owner': 'Patient safety officer', 'Trigger_for_review': 'Any event linked to AI output'},
        {'Measure': 'Vendor update notices', 'Frequency': 'As issued', 'Owner': 'IT vendor manager', 'Trigger_for_review': 'Any model update before it is deployed'},
    ]),

    h2('s4h1', 'Stage Four: Vendor Management'),
    blk('s4p1', "The vendor holds much of the information the governance program needs, so contract terms are the control. The chapter lists four. Performance service levels with meaningful remedies, specific accuracy thresholds with financial consequences, not best-efforts commitments. Update notification, so the organization hears of a model update in advance and can re-evaluate before it is deployed. Bias testing disclosure, with demographic performance data for any clinical AI tool deployed. And data use transparency, clear terms on what patient data the vendor collects, how it is used and whether it is used to train future versions."),
    blk('s4p2', "The change control plans described in the previous lesson give these terms added weight. A model that updates under an authorized plan will change behavior in service. Contract language that requires notice before an update and a right to re-test, with a remedy if performance falls, is the buyer's counterpart to the manufacturer's plan."),
    steps('s4st1', 'The four-stage lifecycle in one view', [
        ('Pre-deployment evaluation', 'Regulatory status, training data, bias testing, clinical validation, intended use.'),
        ('Implementation and training', 'Workflow integration, clinician training, override protocols, baseline measurement.'),
        ('Active monitoring', 'Drift, equity, adverse events, override rates.'),
        ('Vendor management', 'Service levels with remedies, update notice, bias disclosure, data use terms.'),
    ]),

    h2('s5h1', 'From Lifecycle to Checklist'),
    blk('s5p1', "The platform's AI Clinical Governance Lab organizes the same material as a 62-item checklist across eight domains: clinical validation with eight items, data quality with eight, bias and equity with eight, transparency with nine, oversight and monitoring with nine, ethics and patient rights with seven, vendor and third-party governance with six, and security and incident response with seven. Its source notes cite published frameworks, among them good machine learning practice principles, the 45 CFR 92.210 provision, the ONC transparency requirements, the NIST AI Risk Management Framework, health-system governance playbooks and the World Health Organization's guidance."),
    blk('s5p2', "Chapter 5 uses the checklist as a go or no-go gate, and the tool implements that idea: its deployment gate is evaluated by domain and not by average, with every domain required to clear 80 percent, so one weak domain blocks go-live however strong the others. The reasoning is the same as the binding-constraint rule in the finance course. A tool with excellent validation and no incident response plan is not ready."),
    blk('s5p2b', "A final practice is to keep a decision log. Each time the committee approves, conditions, defers or declines a tool, record the date, the evidence reviewed and the reasoning. When a regulator, a payer or a patient later asks why a tool was in use, the log is the answer, and it also shows the committee its own pattern of decisions over time."),
    blk('s5p3', "Who sits on the committee matters as much as the checklist. A workable group includes a clinician who will use the tool, a clinical informaticist, a quality or patient safety lead, someone responsible for equity, a privacy and security officer and a finance representative who can price the monitoring. A committee made only of technologists tends to ask technical questions, and one made only of executives tends to ask about cost. The lifecycle questions are clinical and operational, and the people who can answer them have to be in the room."),
    warning('s5w1', "A checklist is not a substitute for judgment", "Passing 62 items does not make a tool safe. It shows that the organization has asked the questions and recorded answers. The committee still has to read the answers."),

    takeaway('tw', [
        "Chapter 5's lifecycle has four stages: pre-deployment evaluation, implementation and training, active monitoring and vendor management.",
        "Pre-deployment evaluation covers regulatory status, training data provenance, bias testing, clinical validation in a comparable setting and intended use.",
        "Implementation requires workflow integration, training on what the tool does not know, override protocols and a baseline measurement.",
        "Monitoring covers performance drift, equity by subgroup, adverse event reporting and override rates, and a baseline is needed to detect change.",
        "Vendor terms should include performance service levels with remedies, advance notice of updates, bias testing disclosure and data use transparency.",
        "The platform's checklist has 62 items in eight domains and gates deployment domain by domain, with every domain required to reach 80 percent.",
        "A checklist records that questions were asked; the committee must still read the answers and decide.",
    ]),
    quiz('qz',
        "Why does the platform's AI governance gate evaluate each domain rather than the average?",
        [
            ("Because averages cannot be calculated", False),
            ("Because one weak domain, such as incident response, can make a tool unsafe to deploy however strong the other domains are", True),
            ("Because domains are weighted equally by law", False),
            ("Because the FDA requires domain scoring", False),
        ],
        "The tool follows the chapter's go or no-go idea: every domain must clear the 80 percent bar, so a weakness in one domain blocks deployment even if the average is high."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.3.1-5.3.5: the four-stage AI clinical governance lifecycle"),
    blk('src2', "[2] HTR Research Lab, AI Clinical Governance Lab — https://healthtransformationreview.org/research-lab/technology-ai?tab=ai — 62-item checklist, eight domains and deployment gate, counted from the tool's source on 2026-11-23"),
    blk('src3', "[3] FDA, final guidance on predetermined change control plans for AI-enabled device software functions (December 4, 2024) — https://www.govinfo.gov/content/pkg/FR-2024-12-04/html/2024-28361.htm"),
    blk('src4', "[4] " + BOOK5 + " — §5.7 and Figure 5.4: platform tools for the Technology pillar in practice"),
]

# ════════════════════════════════════════════════════════════════════════════
L6_SLUG = 'fai-rural-ai-and-scribes'
L6_TITLE = 'AI in Rural Hospitals: Three Challenges and What the Scribe Evidence Shows'
L6 = [
    blk('intro1', "Most clinical AI is built and tested in large academic centers and sold to everyone. Chapter 5 argues that rural hospitals face three governance challenges that are more acute than in the settings where the tools were developed: whether the training data represent their patients, whether they have the staff to monitor what they deploy, and, for ambient scribes, whether the tool works for patients who do not speak English. This lesson takes each in turn."),
    blk('intro2', "It then looks at the evidence on ambient documentation scribes, the AI tool most Vermont hospitals are actually buying with grant money. Two recent studies, a randomized trial published in NEJM AI in late 2025 and a multisite cohort study in JAMA in April 2026, give the best current picture, and both have limits that matter for a small rural hospital. The lesson reports what each found, from the sources read, and what it does not show."),
    blk('intro3', "The conclusion is not that scribes do not work. It is that the size of the benefit is modest, uneven and measured mostly in academic settings, so a rural hospital should plan to measure its own."),

    h2('s1h1', 'Challenge One: Whose Patients Were in the Training Data?'),
    blk('s1p1', "Chapter 5 observes that most clinical AI is trained on datasets from large urban academic medical centers. The patients at a small rural hospital are, on average, older, more likely to have agricultural occupational exposures, differ in comorbidity patterns and face different social determinants. A model trained elsewhere may perform differently on them, and the difference may not be visible in the developer's published accuracy. The chapter's recommendation is that the clinically integrated network require training data documentation as a condition of any network-funded AI deployment."),
    blk('s1p2', "The practical response is to ask the vendor for the composition of the training and validation data, to ask whether performance has been reported for rural and older populations, and to run a local validation before relying on the tool: compare its output with outcomes on a sample of the hospital's own patients. A small hospital rarely has the numbers for a robust study, which is itself a reason to pool validation across the network."),

    h2('s2h1', 'Challenge Two: Who Monitors the Tool?'),
    blk('s2p1', "The lifecycle in the previous lesson assumes people to run it: someone to calculate drift, stratify performance, review adverse events and track vendor updates. Chapter 5 points out that a small rural hospital with one information technology staff member cannot build that infrastructure. Its answer is the network's shared services model: a shared AI governance function within the network that monitors all member hospitals' AI deployments with professional analytics staff that no single hospital could afford. It recommends that Rural Health Transformation technology grants allow network AI governance infrastructure as an eligible use."),
    blk('s2p2', "A shared function changes the economics but not the accountability. Each hospital remains responsible for the clinical use of a tool in its own setting, so the shared team supplies measurement and review while the hospital's clinical leaders decide what to do with the results. Contracts and data-sharing agreements need to say so."),
    callout('s2c1', "A small hospital can buy the tool and still be unable to govern it. Fund the governance function with the tool, not after it."),

    h2('s3h1', 'Challenge Three: Language'),
    blk('s3p1', "Ambient scribes transcribe clinical conversations, and many perform best in English. Chapter 5 notes that Vermont has a growing multilingual population, including immigrant communities in the Burlington area and seasonal agricultural workers, and that scribe tools not trained on multilingual clinical conversations will perform poorly for these patients. Its recommendation is that Rural Health Transformation scribe grants require multilingual capability documentation as an evaluation criterion."),
    blk('s3p2', "The risk goes beyond poor transcription. When a visit uses an interpreter, a scribe may capture the interpreter's English speech and miss the patient's own words, or may fail altogether. A note that looks complete but omits what the patient said is worse than no note, because it is trusted. The equity monitoring stage of the lifecycle exists for this: compare note accuracy and clinician edit rates for visits with and without interpreters."),

    h2('s4h1', 'What the Scribe Evidence Shows'),
    blk('s4p1', "The NEJM AI randomized trial by Lukac and colleagues, published in November 2025, randomized 238 outpatient physicians across 14 specialties at one academic medical center to one of two ambient scribe products or to usual care, from November 2024 to January 2025. According to summaries from the investigators' institution and the database record, physicians using one product had a 9.5 percent decrease in time spent in the note against controls, a statistically significant result, while those using the other showed no significant change. Survey measures of burnout and workload suggested possible improvements for both, which the authors said need confirmation in larger, multicenter trials. Physicians reported occasional clinically significant inaccuracies in the generated notes, most often omissions. The primary page for the paper could not be read for this lesson, so these details rest on those summaries."),
    blk('s4p2', "The JAMA study by Rotenstein and colleagues, published online on April 1, 2026, is a multisite cohort study at five academic health systems that introduced scribes between June 2023 and August 2025. It compared 1,809 clinicians who adopted scribes with 6,772 who did not, using a difference-in-differences design. The reported effects, normalized to eight scheduled patient hours, were 13.4 fewer minutes of total electronic health record time and 16.0 fewer minutes of documentation time, along with 0.49 more weekly visits. After-hours record time did not change significantly. The abstract calls the changes modest. The effects were larger in primary care and among clinicians who used scribes for at least half of their notes, who were about a third of adopters."),
    table('s4t1', 'Two studies of ambient scribes, as read for this course', [
        {'Item': 'Design', 'Lukac et al., NEJM AI (Nov 2025)': 'Randomized trial, 3 arms, one academic center', 'Rotenstein et al., JAMA (Apr 2026)': 'Observational difference-in-differences cohort, five academic systems'},
        {'Item': 'Sample', 'Lukac et al., NEJM AI (Nov 2025)': '238 outpatient physicians, 14 specialties', 'Rotenstein et al., JAMA (Apr 2026)': '8,581 clinicians; 1,809 adopters'},
        {'Item': 'Main finding', 'Lukac et al., NEJM AI (Nov 2025)': 'Time in note down 9.5% with one product; no significant change with the other', 'Rotenstein et al., JAMA (Apr 2026)': '13.4 fewer EHR minutes and 16.0 fewer documentation minutes per 8 scheduled patient hours; 0.49 more visits per week'},
        {'Item': 'Notable limits', 'Lukac et al., NEJM AI (Nov 2025)': 'Single academic center; short period; occasional inaccuracies reported', 'Rotenstein et al., JAMA (Apr 2026)': 'Observational; academic settings; follow-up up to about five months; burnout not measured; vary by site'},
    ]),
    blk('s4p3', "Chapter 5's implementation matrix cites the JAMA result as about 16 fewer documentation minutes per eight patient hours, which matches the study's documentation-time estimate. Neither study took place in a rural critical access hospital. The benefit may be larger or smaller in a setting with different visit types, less structured workflows and fewer interpreters or scribes in the loop. That is a reason to treat a grant-funded rollout as a measurement opportunity: define the baseline in advance, track documentation time, note accuracy and clinician edits, and report by subgroup."),
    warning('s4w1', "Do not promise more than the evidence", "The published effects are modest and measured in academic settings. A business case or grant narrative that assumes a large, uniform time saving for a rural hospital goes beyond what these studies show."),

    h2('s5h1', 'A Measurement Plan for a Grant-Funded Rollout'),
    blk('s5p1', "A hospital that receives grant funds for scribes can turn the rollout into evidence. Before go-live, record three months of baseline measures: documentation time per visit from the record system's audit data, the share of notes completed after hours and clinician-reported workload on a short, repeated survey. After go-live, track the same measures monthly, along with the proportion of notes the clinician edits substantially and any reported inaccuracies. Break results out by clinician type, visit type and, where the data allow, language and interpreter use."),
    blk('s5p2', "Report the results plainly, including a null or negative result. The JAMA study found that the time savings were uneven and that fewer than a third of adopters used the tool for more than half of their notes. If a rural hospital finds similar patterns, the right response is to ask why use is low, and whether training, workflow or the product is the cause, before concluding that the tool failed or succeeded. A funder who sees honest measurement is more likely to renew than one who sees promised savings that never appear."),

    takeaway('tw', [
        "Chapter 5 names three rural AI challenges: training data that may not represent rural patients, too few staff to monitor tools and scribes that may perform poorly in other languages.",
        "Require training data documentation, run local validation and pool validation across the network where a single hospital lacks the numbers.",
        "A shared AI governance function in the network can monitor all members' deployments, but each hospital remains responsible for the clinical use of a tool in its setting.",
        "Require multilingual capability documentation for scribe tools and monitor note accuracy for interpreter-assisted visits.",
        "A randomized trial published in NEJM AI in late 2025 found a 9.5 percent decrease in note time with one of two scribe products and no significant change with the other, in 238 physicians at one academic center, with occasional inaccuracies reported.",
        "A JAMA cohort study published April 1, 2026 across five academic systems found 16.0 fewer documentation minutes and 13.4 fewer EHR minutes per eight scheduled patient hours and 0.49 more weekly visits, which the authors called modest.",
        "Neither study was in a rural critical access hospital; plan to measure your own baseline and effects.",
    ]),
    quiz('qz',
        "What does Chapter 5 recommend about multilingual capability for ambient scribe grants?",
        [
            ("Ignore it because scribes work equally well in all languages", False),
            ("Require multilingual capability documentation as an evaluation criterion for Rural Health Transformation scribe grants", True),
            ("Ban scribes in hospitals with immigrant patients", False),
            ("Use scribes only for English-speaking visits without any documentation", False),
        ],
        "The chapter notes that scribes not trained on multilingual clinical conversations will perform poorly for multilingual patients and recommends that Vermont's scribe grants require multilingual capability documentation as an evaluation criterion."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — §5.3.6: AI-specific issues for Vermont rural hospitals; §5.6 Figure 5.3: implementation matrix"),
    blk('src2', "[2] Rotenstein LS et al., Changes in Clinician Time Expenditure and Visit Quantity With Adoption of Artificial Intelligence-Powered Scribes: A Multisite Study, JAMA 2026;335(16):1408-1417 (online April 1, 2026) — https://jamanetwork.com/journals/jama/fullarticle/2847319"),
    blk('src3', "[3] Lukac PJ et al., Ambient AI Scribes in Clinical Practice: A Randomized Trial, NEJM AI (published online November 2025) — https://pubmed.ncbi.nlm.nih.gov/41497288/ ; UCLA Health, UCLA study finds AI scribes may reduce documentation time and improve physician well-being — https://www.uclahealth.org/news/release/ucla-study-finds-ai-scribes-may-reduce-documentation-time — summaries relied on because the article page could not be read"),
    blk('src4', "[4] HTR Research Lab, Digital Health Lab — https://healthtransformationreview.org/research-lab/technology-ai?tab=digital"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4), (L5_SLUG, L5_TITLE, L5, 5), (L6_SLUG, L6_TITLE, L6, 6)]
if __name__ == '__main__':
    run(LESSONS)
