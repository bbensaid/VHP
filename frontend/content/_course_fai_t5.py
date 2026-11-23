exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_fai_common.py').read())

# Track 5 — Sequencing, Vermont Policy and Capstone. Verified 2026-11-23: Vermont Act 101 of 2026 (H.814; signed May 18,
# 2026) and Act 156 of 2026 (H.816; signed June 17, 2026), both read in full from the enacted PDFs; GMCB/AHS analytics
# solicitations from search results (no award found); HTR book Chapter 5 §5.6 implementation matrix (indicative ranges,
# the book's); the platform's AI Clinical Governance Lab (62 items, 8 domains; deployment gate per domain at 80 percent).

# ════════════════════════════════════════════════════════════════════════════
L13_SLUG = 'fai-sequencing-and-matrix'
L13_TITLE = 'Sequencing the Technology Pillar: The Matrix and the Analytics Gap'
L13 = [
    blk('intro1', "Chapter 5 begins by saying that FHIR interoperability, AI clinical governance and cybersecurity are three implementation risks that any organization building on a data infrastructure foundation will meet, in roughly that order, as the foundation comes online. A standards mandate without governance produces ungoverned clinical AI. A connected, data-rich system without security produces a larger attack surface. The order is a planning principle and not a calendar, and this lesson turns it into one."),
    blk('intro2', "It uses the chapter's implementation matrix, six investments with indicative cost, time to value, return crossover and Vermont benchmarks, and the chapter's headline sequencing concern: the analytics capability that must be in place before global budgets begin. The matrix figures are the book's indicative ranges, and the lesson asks the reader to replace them with quotes. The analytics status is drawn from public procurement listings and a state report, which show activity but no award."),
    blk('intro3', "The lesson ends with a method for building a three-year technology plan that respects dependencies and funding limits."),

    h2('s1h1', 'The Implementation Matrix'),
    table('s1t1', 'Technology pillar implementation matrix (HTR Figure 5.3; indicative ranges from the book)', [
        {'Investment': 'FHIR R4 compliance and API development', 'Estimated_cost': '$150K-$500K per organization', 'Time_to_value': '12-18 months', 'ROI_crossover': '18-24 months', 'Vermont_benchmark': 'ONC 170.315(g)(10) certification; CMS-0057-F payer APIs from 2027'},
        {'Investment': 'Clinical AI deployment with a governance framework', 'Estimated_cost': '$200K-$1M setup', 'Time_to_value': '6-12 months', 'ROI_crossover': '12-24 months', 'Vermont_benchmark': 'Rural Health Transformation scribe grants'},
        {'Investment': 'State claims analytics platform access and training', 'Estimated_cost': '$20K-$60K annually', 'Time_to_value': '3-6 months', 'ROI_crossover': '6 months', 'Vermont_benchmark': 'Pre-global-budget risk coding gap analysis; attribution modeling'},
        {'Investment': 'Network shared analytics infrastructure', 'Estimated_cost': '$500K-$2M network cost', 'Time_to_value': '18-36 months', 'ROI_crossover': '36-48 months', 'Vermont_benchmark': 'Rural Health Transformation-funded shared analytics'},
        {'Investment': 'EHR optimization for structured data capture', 'Estimated_cost': '$15K-$40K per practice', 'Time_to_value': '1-3 months', 'ROI_crossover': '6 months', 'Vermont_benchmark': 'Medical home prerequisite; quality measure accuracy'},
        {'Investment': 'Cybersecurity assessment and hardening', 'Estimated_cost': '$50K-$200K per organization', 'Time_to_value': '3-6 months', 'ROI_crossover': 'Risk avoidance immediate', 'Vermont_benchmark': '2020 ransomware: about four weeks to restore the EHR'},
    ]),
    blk('s1p1', "Read the matrix for its structure, not its precision. Three investments pay back quickly and cheaply: EHR optimization for structured data capture, which makes everything else work; access to the state claims platform; and cybersecurity assessment, whose return is risk avoidance from the start. Three pay back slowly: FHIR and API development at 18 to 24 months to crossover, clinical AI at 12 to 24 months and shared analytics at 36 to 48 months. The cheap ones are prerequisites for the expensive ones, which suggests an order."),
    blk('s1p2', "The ranges are the chapter's indicative figures, 'indicative ranges' in its words, and actual costs vary with the organization's size, existing infrastructure and approach. They should be replaced with vendor quotes before they enter a budget, and the finance course's guidance on evidence applies: label each figure as assumption, published estimate, local estimate or measured result."),

    h2('s2h1', 'A Defensible Order'),
    blk('s2p1', "Combine the matrix with the dependencies from the earlier tracks. Start with data capture and security, because they are cheap, quick and underlie the rest: structured data capture makes the FHIR interface worth connecting to, and a security baseline reduces the risk of everything that follows. Add identity, the master patient index of Track 1, before provider-to-provider exchange. Build the FHIR interfaces for patient access and provider query next, then prepare for the payer APIs due in 2027. Put the AI governance framework in place before the first clinical AI deployment, not afterward, and adopt decision support design principles before adding alerts."),
    blk('s2p2', "Shared analytics comes last in elapsed time not because it matters least but because it depends on the others: it needs clean data, identity and exchange. It also has the longest payback, so a network that starts late will not have it when it is needed. That tension, between a long lead time and a dependency on earlier work, is the sequencing problem the chapter identifies."),
    steps('s2st1', 'A three-year order of work (this course\'s synthesis of the chapter)', [
        ('Year 1, first half', 'Security baseline and assessment; EHR structured data capture; identity service scope and governance.'),
        ('Year 1, second half', 'Patient access API compliance check; AI governance committee and checklist; alert inventory.'),
        ('Year 2', 'Provider query with the chosen trust framework; first governed AI deployments with baselines; EHR readiness for payer APIs.'),
        ('Year 2 to 3', 'Payer APIs live; shared analytics build; monitoring and equity reporting in steady state.'),
    ]),

    h2('s3h1', 'The Analytics Gap Before Global Budgets'),
    blk('s3p1', "Chapter 5 opens by calling the sequencing vulnerability the analytics vendor gap that must close before global budgets take effect in fiscal year 2028. Chapter 3 repeats the warning, saying the Agency of Human Services and Green Mountain Care Board analytics vendor procurement should be treated as a critical-path decision with a hard deadline, because Vermont cannot repeat at the system level the experience of organizations assuming financial risk without analytics to manage it."),
    blk('s3p2', "The public record this lesson could find shows activity, not an award. The Board's website lists a data analytics solicitation among closed requests awaiting award, seeking vendors for health care expenditure and ad hoc analyses, though the page is undated. A March 2026 state report on health care system transformation says funds remain for a contractor to provide analytics supporting regional plans that will inform the Strategic Plan, and that this contract was under negotiation. A May 2026 request for proposals issued by the Agency of Digital Services for the Board concerns modernizing the Board's data infrastructure, including configuring its environment within the Statewide Data Lake. Hospital pricing and budget data standardization solicitations were posted in early 2026. None of the results showed a named award."),
    blk('s3p3', "The fair reading is that procurement is under way and that its completion date is not known from the sources read. For a hospital that is exactly the situation to plan around. If the state tool arrives late or incomplete, the hospital's own analytics, and the network's, are what stand between it and a budget set without the information it needs."),
    callout('s3c1', "When a critical dependency's date is uncertain, plan a version of your own that does not wait for it, even if it is smaller."),

    h2('s4h1', 'Funding the Plan'),
    blk('s4p1', "The funding sources the chapter names are Rural Health Transformation grants, which Vermont's program reportedly allocates at $195 million a year for five years, with information technology investments including cybersecurity and shared analytics, and the hospital's own operating budget. The political sustainability course's operating-funding test applies: for each investment, who pays in year three? Grants can fund the build. They rarely fund the maintenance, licensing and staffing that keep an interface or a monitoring service alive."),
    blk('s4p2', "A technology plan should therefore show two budgets side by side: the build cost by year and the recurring cost that begins when each element goes live. The recurring costs are what a board must be asked to accept. Showing them at the start avoids the surprise, a year after a grant-funded launch, that the program needs $400,000 a year to keep running."),
    table('s4t1', 'A two-budget view for one investment (illustrative format)', [
        {'Item': 'Build or setup cost', 'Year_1': 'Grant-funded', 'Year_2': 'Grant-funded', 'Year_3': 'None'},
        {'Item': 'Recurring licensing, hosting and support', 'Year_1': 'Partial', 'Year_2': 'Full', 'Year_3': 'Full, from operating budget'},
        {'Item': 'Staff to operate and monitor', 'Year_1': 'Partial', 'Year_2': 'Full', 'Year_3': 'Full, from operating budget or network fee'},
        {'Item': 'Value realized', 'Year_1': 'Low', 'Year_2': 'Moderate', 'Year_3': 'Full, measured against baseline'},
    ]),

    blk('s4p3', "One more discipline helps: review the plan each quarter against what actually happened. Compare planned and actual dates, spending and measures of use, and ask whether the sequence still makes sense. Plans drift, and a review that notices drift early costs far less than one that finds it at the end of a funding period."),
    h2('s5h1', 'Risks to the Sequence'),
    blk('s5p1', "Any three-year plan meets interruptions. A vendor slips a release that the payer APIs depend on. The one staff member who understood the interface leaves. A grant is delayed or cut. A security incident forces the team to redirect months of effort. A sequencing plan should therefore name its critical path, the chain of dependent items that determines the end date, and its single points of failure, whether people, vendors or funds. Protect the critical path first: cross-train the staff, write down the interface documentation and hold contingency in the schedule."),
    blk('s5p2', "It also helps to define decision points where the plan can change. If the identity service is not ready by a stated date, provider query is postponed and the team works on payer API readiness instead. If the state's analytics contract is not awarded by a stated date, the network builds its minimum viable analytics. Writing the rule in advance avoids a debate about whether to slip when a delay becomes visible, and it keeps effort from stalling behind a dependency that is out of the organization's hands."),

    takeaway('tw', [
        "Chapter 5 says FHIR, AI governance and cybersecurity are three implementation risks met in roughly that order as a data foundation comes online.",
        "The matrix's quick, cheap investments, structured data capture, claims platform access and a security assessment, are prerequisites for the slower ones: FHIR and APIs, clinical AI and shared analytics.",
        "Matrix cost ranges are the book's indicative figures; replace them with quotes and label each by its evidence rung.",
        "A defensible order starts with security, data capture and identity, then builds exchange, adds governance before AI deployment and finishes with shared analytics.",
        "The analytics vendor gap before fiscal year 2028 global budgets is the chapter's headline sequencing risk; public listings show solicitations and a contract under negotiation but no award in the sources read.",
        "When a critical dependency's date is uncertain, plan a smaller version that does not wait for it.",
        "Show build cost and recurring cost side by side, and answer who pays in year three before accepting grant funding.",
    ]),
    quiz('qz',
        "According to Chapter 5, what is the headline sequencing vulnerability in Vermont's technology plan?",
        [
            ("The lack of any FHIR standard", False),
            ("The analytics vendor gap that must close before global budgets take effect in fiscal year 2028", True),
            ("The absence of electronic health records in all hospitals", False),
            ("The cost of cybersecurity insurance", False),
        ],
        "The chapter's opening epigraph names the analytics vendor gap that must close before global budgets take effect in fiscal year 2028 as the technology pillar's most consequential sequencing vulnerability."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK5 + " — introduction, §5.6 and Figure 5.3: the implementation matrix and the sequencing argument"),
    blk('src2', "[2] Health Transformation Review, Chapter 3 — https://healthtransformationreview.org/read/chapter-3 — §3.9 on treating the analytics vendor selection as a critical-path decision"),
    blk('src3', "[3] Green Mountain Care Board, open and closed requests for proposals — https://gmcboard.vermont.gov/node/199 ; Vermont Agency of Human Services, Health Care System Transformation Report (March 10, 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Office%20of%20Health%20Care%20Reform~Health%20Care%20System%20Transformation%20Report%20~3-10-2026.pdf — as surfaced by search; no award found"),
    blk('src4', "[4] WCAX, Vermont drops AHEAD healthcare model; shifts to $195M rural health fund (July 28, 2026) — https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/"),
]

# ════════════════════════════════════════════════════════════════════════════
L14_SLUG = 'fai-vermont-ai-policy'
L14_TITLE = "Vermont's 2026 AI Laws: Acts 101 and 156 and What Remains Open"
L14 = [
    blk('intro1', "Chapter 5 told Vermont's legislators that the state's AI governance gap was an opportunity and that the legislature had already asked for the blueprint. In 2026 the legislature enacted two laws that address AI in health care: Act 101, on neurological rights and the use of artificial intelligence in health and human services, and Act 156, on regulating AI in mental health services. This lesson reads both from their enacted text, which it was able to extract in full, and sets out what each requires, what each leaves for the Advisory Council's January 15, 2027 reports and what remains open for clinical AI generally."),
    blk('intro2', "The reading is of the statutes' words. It does not predict the Council's recommendations, and it notes where the book's description differs from the text. It is also not legal advice: a hospital's counsel should review how each act applies to its own tools."),
    blk('intro3', "A theme is that the new laws regulate specific uses, not clinical AI as a whole. The general governance work still sits with the organization."),

    h2('s1h1', 'Act 101: Intent, Neurological Rights and the Council'),
    blk('s1p1', "Act 101 of 2026, which began as bill H.814 and was signed on May 18, 2026, takes effect on passage. Its intent section states that the General Assembly means to protect human rights, promote equity, increase efficiency, enhance accessibility, create transparency and guarantee accountability in health care and human services through the ethical and responsible use of artificial intelligence, maximizing benefits and minimizing risks, preventing harm and improving quality of care and the experience of patients, providers and payers."),
    blk('s1p2', "It adds a chapter to Title 18 on neurological rights, recognizing each individual's right to mental and neural data privacy, freedom of thought, nondiscrimination in the development and application of neurotechnologies, the right to change a decision about neurotechnology, protection from unauthorized access to or manipulation of brain activity and protection from unauthorized neurotechnological alterations in mental functions critical to personality. It also amends the statute that creates the Artificial Intelligence Advisory Council, changing its membership, which now includes the Secretary of Human Services or a designee and a member with health care experience appointed by the state medical society, and it extends the Council's repeal date from June 30, 2027 to 2030."),
    callout('s1c1', "Act 101 states purposes and rights and builds a study process. It does not, in the text read, impose operating requirements on hospitals' clinical AI tools."),

    h2('s2h1', "What Act 101's Report Must Cover"),
    blk('s2p1', "Section 4 directs the Council, with the Director of the Division of Artificial Intelligence, to review guidelines and recommendations from the American Medical Association, social work and education associations and other professional organizations on AI in health care, human services, education, public participation and public finance, to research uses in public participation and public finance and to create opportunities for public education and engagement. By January 15, 2027, it must submit a written report to the General Assembly recommending additional statutory changes needed to further the act's purposes, including protections for neurological rights and proposed definitions, guidance on the use of generative AI by regulated professions and regulating the use of artificial and augmented intelligence in health insurance utilization review. It must also summarize other ways government can promote ethical AI in health, human services and education, propose pilot projects for public finance and identify any reasons for further delaying or removing the new 2030 sunset."),
    blk('s2p2', "Chapter 5's text says the act requires the Council to recommend statutory changes and urges that the report cover clinical AI bought with public money, such as the scribe, diagnostic and monitoring tools funded through the Rural Health Transformation Program, and not only mental-health chatbots and utilization review. The enacted list in Section 4 names utilization review and generative AI by regulated professions but does not name publicly funded clinical AI tools. The chapter's concern is therefore still open: the Council has authority to recommend, and stakeholders can ask it to take up clinical AI governance."),

    h2('s3h1', 'Act 156: Mental Health Services and AI'),
    blk('s3p1', "Act 156 of 2026, bill H.816, signed June 17, 2026, takes effect on passage. Its stated purpose is to safeguard individuals seeking mental health services from psychological harm, including death by suicide, by ensuring that these services are delivered by mental health professionals and not independently by AI systems. It adds a section to Title 18 that defines artificial intelligence as an engineered or machine-based system that varies in its level of autonomy and can infer from its input how to generate outputs that influence physical or virtual environments."),
    blk('s3p2', "The operative rule is in the new section 7115. A corporation or entity shall not provide, advertise or otherwise offer mental health services, including through the use of AI, to the public unless the services are provided by a mental health professional or are part of an approved institutional review board or privacy board study. A violation by an entity is a violation of the state's Consumer Protection Act, with the Attorney General and private parties having the same powers and remedies as under that act. The act also makes engaging in the prohibited use of AI unprofessional conduct for licensed mental health professionals and for the relevant professional board."),
    blk('s3p3', "One subsection protects ordinary clinical use. Nothing in the section precludes a mental health professional operating within their scope of practice from using AI tools that comply with the federal health privacy law, provided the professional reviews and approves any mental health services. This includes a software-based medical product, such as a digital therapeutic or software as a medical device that the FDA has authorized, cleared or approved, if a mental health professional prescribes or recommends its use. The act also adds the Director of Professional Regulation and the executive director of the Board of Medical Practice to the Advisory Council, and requires the Council to report by January 15, 2027 on the regulation of AI use by mental health professionals, with recommendations for legislative action."),
    table('s3t1', 'Acts 101 and 156 compared (enacted text)', [
        {'Item': 'Bill and signature', 'Act_101': 'H.814; signed May 18, 2026', 'Act_156': 'H.816; signed June 17, 2026'},
        {'Item': 'Subject', 'Act_101': 'Neurological rights and AI in health and human services', 'Act_156': 'AI in the provision of mental health services'},
        {'Item': 'Main operative content', 'Act_101': 'Intent; neurological rights chapter; Advisory Council membership and 2030 sunset; study and report', 'Act_156': 'Entities may not offer mental health services, including through AI, unless provided by a mental health professional or part of an approved research study'},
        {'Item': 'Enforcement', 'Act_101': 'None in the text read', 'Act_156': 'Consumer Protection Act; professional discipline'},
        {'Item': 'Protected use', 'Act_101': 'Not applicable', 'Act_156': 'Professionals may use HIPAA-compliant AI tools if they review and approve services; cleared devices if recommended by a professional'},
        {'Item': 'Report due', 'Act_101': 'January 15, 2027, to the General Assembly', 'Act_156': 'January 15, 2027, to the named House and Senate committees'},
    ]),

    h2('s4h1', 'What Remains Open for Clinical AI'),
    blk('s4p1', "Neither act sets governance standards for hospitals' clinical AI, such as scribes, risk models and diagnostic tools. Act 156 regulates AI that delivers mental health services directly to the public. Act 101 builds a process and rights. The questions Chapter 5 asked of state officials remain unanswered by statute: how a tool's performance is validated before deployment, who is accountable when it produces a clinically consequential error and how tools are evaluated for equity impact. The Council's January 2027 reports are the next place where such questions could be taken up."),
    blk('s4p2', "In the meantime, the governance lifecycle of Track 2 fills the gap, and several federal instruments apply, as Lesson 4 set out. Hospitals should also watch for the Council's recommendations, since a bill drawing on them could reach the 2027 session, and for the new act's definitions, which may become the basis for later rules. A hospital with mental health services should ask its counsel now how Act 156's prohibition and its professional-review exception apply to any chatbot, triage or documentation tool in use."),
    steps('s4st1', 'What a Vermont health organization should do about the 2026 AI laws', [
        ('Inventory tools that touch mental health services', 'Identify any AI tool that interacts directly with patients about mental health, and any that supports clinicians.'),
        ('Confirm professional review', 'Ensure a licensed professional reviews and approves any service delivered with AI assistance, as Act 156 contemplates.'),
        ('Check device status', 'For digital therapeutics and similar products, confirm FDA authorization and that a professional recommends use.'),
        ('Engage the Council', 'Offer data and experience for the January 2027 reports, including on clinical AI bought with public funds.'),
        ('Keep the lifecycle', 'Run the four-stage governance regardless of whether a statute requires it.'),
    ]),
    warning('s4w1', "Read the statute, not a summary", "This lesson read the enacted text of both acts, but how they apply to a particular tool is a legal question. Consult counsel for any tool that interacts with patients about mental health."),

    h2('s5h1', 'Four Illustrative Cases (Not Legal Advice)'),
    blk('s5p1', "Applying a statute to a tool is a matter of reading the text against the facts. Consider four illustrations, each a hypothetical. A clinic uses an ambient scribe in therapy visits, with the therapist reviewing and signing every note: the tool supports a professional who approves the output, which is the pattern Act 156's exception describes, though privacy and consent for recording are separate questions. An organization offers an unsupervised chatbot that provides counseling to the public: this is the use the act's main prohibition addresses, unless it is within an approved research study."),
    blk('s5p2', "A psychiatrist prescribes a digital therapeutic that the FDA has cleared: the act's exception covers a cleared product whose use a professional prescribes or recommends. A health plan uses an algorithm to prioritize utilization review requests for mental health authorizations: neither act, on the text read, bars that, but Act 101 directs the Council to address the use of AI in utilization review, so the area is likely to see further rules, and federal guidance on Medicare Advantage algorithms already requires individualized decisions. These illustrations show the pattern: the law distinguishes AI that supports a professional from AI that stands in for one, and it leaves much else to the Council's reports."),

    takeaway('tw', [
        "Act 101 of 2026 (H.814), signed May 18, 2026, states an intent to use AI ethically in health and human services, adds a neurological rights chapter and extends the Artificial Intelligence Advisory Council's repeal date to 2030.",
        "Act 101 requires the Council to report by January 15, 2027, including on neurological rights, generative AI use by regulated professions and AI in health insurance utilization review.",
        "The enacted list in Act 101's report section does not name clinical AI bought with public money, so Chapter 5's concern about covering it remains open.",
        "Act 156 of 2026 (H.816), signed June 17, 2026, bars entities from offering mental health services, including through AI, unless provided by a mental health professional or part of an approved study.",
        "Act 156 allows professionals to use HIPAA-compliant AI tools if they review and approve services, and cleared devices that a professional recommends; violations fall under the Consumer Protection Act and professional discipline.",
        "Neither act sets governance standards for hospital clinical AI; the four-stage lifecycle and federal instruments fill the gap.",
        "Hospitals should inventory tools that touch mental health services, confirm professional review and offer data to the Council.",
    ]),
    quiz('qz',
        "What does Act 156 of 2026 prohibit?",
        [
            ("Any use of AI by any health professional", False),
            ("Entities offering mental health services to the public, including through AI, unless the services are provided by a mental health professional or are part of an approved research study", True),
            ("The use of electronic health records in mental health practices", False),
            ("All FDA-cleared digital therapeutics", False),
        ],
        "Act 156 adds 18 V.S.A. section 7115, which bars entities from providing, advertising or offering mental health services, including through AI, unless provided by a mental health professional or part of an approved IRB or privacy board study. It expressly allows professionals to use compliant AI tools if they review and approve the services."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] Vermont Act 101 of 2026 (H.814), An act relating to neurological rights and the use of artificial intelligence technology in health and human services, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT101/ACT101%20As%20Enacted.pdf"),
    blk('src2', "[2] Vermont Act 156 of 2026 (H.816), An act relating to regulating the use of artificial intelligence in the provision of mental health services, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT156/ACT156%20As%20Enacted.pdf"),
    blk('src3', "[3] " + BOOK5 + " — §5.8 (Implications for You): the state's AI governance gap and Act 101"),
    blk('src4', "[4] Vermont Legislature, bill status pages for H.814 and H.816 — https://legislature.vermont.gov/bill/status/2026/H.0814 ; https://legislature.vermont.gov/bill/status/2026/H.816"),
]

# ════════════════════════════════════════════════════════════════════════════
L15_SLUG = 'fai-capstone-ai-go-no-go'
L15_TITLE = 'Capstone: Take a Clinical AI Tool Through a Go or No-Go Review'
L15 = [
    blk('intro1', "The capstone puts the course's four tracks to work on a single decision. You will choose a clinical AI or decision support tool, real or proposed, and take it through a go or no-go review: the federal obligations register, the four-stage lifecycle, the platform's 62-item governance checklist with its domain gate, a decision support design check, a security review and a short pilot and monitoring plan. The deliverable is a two-page review that a governance committee could act on."),
    blk('intro2', "It uses the platform's AI Clinical Governance Lab and the Digital Health Lab, and it draws on the sources the course has cited. It should take about an hour with the facts at hand. If a fact is not available, record it as unknown and say what would resolve it, because an unknown in a go or no-go review is itself a finding."),
    blk('intro3', "Pick a tool and keep it fixed. Good choices are an ambient documentation scribe, a risk prediction model, a remote monitoring platform with its own algorithm or a sepsis alert."),

    h2('s1h1', 'Step One: Describe the Tool and the Decision'),
    blk('s1p1', "Write a half-page description. What does the tool do and for whom? What clinical decision or task does it support or replace? What data does it use and where does it run? Who is the vendor? What is the intended use as the vendor describes it, and does your intended use match? Who in the organization is sponsoring it and who would be accountable for its use? State the decision the committee must make: deploy now, deploy as a limited pilot, defer pending specific information or decline."),
    blk('s1p2', "Be explicit about whether the tool interacts directly with patients. Under Act 156, an AI system that offers mental health services directly to the public is prohibited unless provided by a mental health professional or within an approved study, so a tool that talks with patients about mental health is a different matter from one that supports a clinician who reviews and approves the output."),

    h2('s2h1', 'Step Two: The Obligations Register'),
    blk('s2p1', "Using Lesson 4, fill in a one-page register. Is the tool a regulated device, and what is its clearance status for your intended use? If it updates under a predetermined change control plan, what notice will you get? Is the vendor a certified health IT developer, and what source information does it supply about its decision support, given that the federal criterion was revised in 2026? Does the tool use protected characteristics as inputs, and what have you done to identify and mitigate discrimination risk under the nondiscrimination rule's decision support provision, which the course found still in force? If the tool touches coverage decisions for Medicare Advantage members, does it respect the requirement for individualized review?"),
    blk('s2p2', "Add the Vermont layer. Does the tool touch mental health services? Does Act 156's professional-review condition apply? Does it use neurotechnology or neural data, which Act 101 recognizes as a protected category of privacy? Note any open points for counsel."),

    h2('s3h1', 'Step Three: The Lifecycle and the Checklist'),
    blk('s3p1', "Open the AI Clinical Governance Lab's governance builder. Work through the 62 items in eight domains: clinical validation, data quality, bias and equity, transparency, oversight and monitoring, ethics and patient rights, vendor and third-party governance, and security and incident response. For each item answer yes, partial or no, with evidence you could show a reviewer. The tool reports a score by domain and gates deployment by domain: every domain must reach 80 percent for the gate to pass, and the tool lists the domains below the bar."),
    blk('s3p2', "Then map the result to the four-stage lifecycle. Stage one corresponds mostly to clinical validation, data quality and bias. Stage two to oversight, training and ethics. Stage three to monitoring and equity. Stage four to vendor governance and security. Where a domain is below 80 percent, write the specific action, owner and date that would close it. A go decision requires either that the gate is passed or that the committee explicitly accepts a named gap with a plan."),
    steps('s3st1', 'Working the governance checklist', [
        ('Score honestly with evidence', 'Yes only if you can produce the document, test result or contract term.'),
        ('Read the domain results', 'Find every domain under 80 percent; the lowest is the binding constraint.'),
        ('Write the closing action', 'For each gap: action, owner, date and cost.'),
        ('Map to lifecycle stages', 'Show which stage each gap belongs to, so the plan follows the sequence.'),
        ('Decide', 'Pass the gate, or accept a named gap with a plan and a review date.'),
    ]),

    h2('s4h1', 'Step Four: Decision Support Design and Security'),
    blk('s4p1', "If the tool generates alerts or recommendations, run the three-principle design check: is it specific, actionable and integrated into the workflow? Estimate the expected alert volume per clinician and say which existing alert it replaces, using the alert budget idea. Identify the workflow owner and the recorded response. For a population health tool, name the defined population, the team that acts and the feedback loop."),
    blk('s4p2', "Then run the security review. Which vendors and connections does the tool add, and what data does it hold? Does the vendor require multifactor authentication, state where data are stored and which subcontractors it uses, commit to breach notification and provide a current independent security assessment? Does it become a single point of failure, and what is the downtime plan if it is unavailable? Where the tool introduces a new dependency, add it to the vendor inventory and set a recovery time objective."),
    callout('s4c1', "A tool that is excellent clinically and unprotected technically is a no-go. A single failed domain is enough."),

    h2('s5h1', 'Step Five: The Pilot and Monitoring Plan'),
    blk('s5p1', "If the decision is to pilot, write the plan in a half-page. The population and sites. The baseline measures and how long they will be collected. The outcomes and their thresholds for expand, change or stop. The monitoring schedule: drift or accuracy monthly, subgroup performance quarterly, override rates and adverse events continuously reviewed. The owner for each measure. The vendor update notice process. And the date of the committee's decision. For a scribe, include documentation time, note accuracy and edit rates, and results for interpreter-assisted visits. For a risk model, include the share of flagged patients reached and the outcome among them, and performance by subgroup."),
    blk('s5p1b', "Assign the pilot a sponsor who can stop it. A pilot that no one is empowered to end tends to continue by default. The sponsor should commit in advance to report the measures at the decision date whatever they show, which is the practice the Blueprint's candid annual report models and the political sustainability course recommends."),
    blk('s5p2', "State what you expect honestly. The two scribe studies reviewed in the course found modest time savings in academic settings. A pilot in a rural hospital should plan to measure its own effect and should not promise a larger saving than the evidence supports. If the tool is a monitoring platform, run the revenue and cost model from Lesson 9 and state clearly who keeps any avoided cost under your payment arrangement."),

    h2('s6h1', 'Step Six: Write the Two-Page Review'),
    table('s6t1', 'Structure of the review', [
        {'Section': '1. Tool and decision', 'Contents': 'What it is, intended use, sponsor, accountable owner, decision requested'},
        {'Section': '2. Obligations register', 'Contents': 'Regulatory status, transparency information, nondiscrimination review, Vermont acts, open legal points'},
        {'Section': '3. Governance result', 'Contents': 'Domain scores, gate result, binding constraint, closing actions with owners and dates'},
        {'Section': '4. Design and security', 'Contents': 'Alert design check, workflow owner, vendor and connection risks, downtime plan'},
        {'Section': '5. Pilot and monitoring plan', 'Contents': 'Baseline, measures, thresholds, owners, decision date'},
        {'Section': '6. Recommendation', 'Contents': 'Deploy, pilot, defer or decline, with conditions and the reasons'},
    ]),
    blk('s6p1', "Close with one recommendation, not a menu, and the conditions that attach to it. If the gate is not passed, the recommendation is defer with a dated plan, or decline. If it is passed, pilot with the monitoring plan. Mark every fact you could not verify, date the review and keep the evidence behind each yes in a folder the committee can open. A governance committee that receives such a review can decide in one meeting, and a regulator or payer that asks later can see what the organization knew and when."),
    warning('s6w1', "Do not score yourself into a pass", "A checklist can be gamed by answering yes without evidence. If the committee cannot see the document behind a yes, treat it as no."),

    takeaway('tw', [
        "The capstone is a two-page go or no-go review of one clinical AI or decision support tool, covering obligations, the governance checklist, design and security, and a pilot plan.",
        "Describe the tool, its intended use, its sponsor and the decision, and say whether it interacts directly with patients, since Act 156 restricts AI that offers mental health services directly to the public.",
        "Fill in the obligations register: device status, transparency information, nondiscrimination review, Medicare Advantage use and the Vermont acts.",
        "Work the 62-item checklist with evidence; the gate passes only when every domain reaches 80 percent, and the lowest domain is the binding constraint.",
        "Check alert design for specificity, actionability and integration, and run a security and vendor review with a downtime plan.",
        "Write a pilot plan with baselines, measures, thresholds, owners and a decision date, without promising more than the evidence shows.",
        "End with one recommendation and its conditions, mark unverified facts and date the review.",
    ]),
    quiz('qz',
        "In the capstone, what makes the platform's governance gate pass?",
        [
            ("An average score of 62 across items", False),
            ("Every one of the eight domains reaching at least 80 percent", True),
            ("Passing the clinical validation domain only", False),
            ("Having a vendor contract", False),
        ],
        "The Lab's deployment gate evaluates each domain, requiring every domain to clear 80 percent. A single weak domain, such as security and incident response, blocks go-live regardless of the average."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] HTR Research Lab, AI Clinical Governance Lab — https://healthtransformationreview.org/research-lab/technology-ai?tab=ai ; Digital Health Lab — https://healthtransformationreview.org/research-lab/technology-ai?tab=digital"),
    blk('src2', "[2] Vermont Act 101 of 2026 — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT101/ACT101%20As%20Enacted.pdf ; Act 156 of 2026 — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT156/ACT156%20As%20Enacted.pdf"),
    blk('src3', "[3] FDA, final guidance on predetermined change control plans for AI-enabled device software functions (December 4, 2024) — https://www.govinfo.gov/content/pkg/FR-2024-12-04/html/2024-28361.htm ; HHS and CMS notice of vacatur, 91 Fed. Reg. 32887 (June 2, 2026) — https://www.govinfo.gov/content/pkg/FR-2026-06-02/html/2026-11015.htm"),
    blk('src4', "[4] " + BOOK5 + " — §5.3 (AI clinical governance), §5.4 (decision support), §5.5 (cybersecurity) and §5.7 (platform tools)"),
    blk('src5', "[5] Rotenstein LS et al., JAMA 2026;335(16):1408-1417 — https://jamanetwork.com/journals/jama/fullarticle/2847319 ; HHS Cybersecurity Performance Goals — https://hhscyber.hhs.gov/cybersecurity-performance-goals.html"),
]

LESSONS = [(L13_SLUG, L13_TITLE, L13, 13), (L14_SLUG, L14_TITLE, L14, 14), (L15_SLUG, L15_TITLE, L15, 15)]
if __name__ == '__main__':
    run(LESSONS)
