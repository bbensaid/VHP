exec(open('/Users/baba/Vermont-Health-Platform/CONTENT_TEMPLATE.py').read())

# ══════════════════════════════════════════════════════════════════════════════
# "Transformation Leadership" course — rich Sanity lesson bodies.
# Slugs MUST match frontend/content/course_transformation_leadership.json
# lesson slugs exactly (that's what sanity_slug gets linked to).
#
# Every claim below was web-searched before writing (searches run 2026-09-22):
# PMI Pulse of the Profession research; John Kotter, Leading Change (1996);
# a rural-Kentucky FQHC Kotter case study (PMC6716404); a 41-month ICU
# hand-hygiene Kotter case study (PubMed 39561482 / ScienceDirect
# S0964339724002623); Maryland HSCRC / All-Payer & TCOC Models (PMC8903109,
# Commonwealth Fund 2024, HSCRC.maryland.gov); Oregon Coordinated Care
# Organizations (KFF CCO FAQ, NASHP); the Massachusetts Alternative Quality
# Contract (Health Affairs 2010, Commonwealth Fund, BCBS MA 2019 release);
# CMS's Comprehensive Care for Joint Replacement model (Commonwealth Fund
# 2021, CMS CJR annual reports); the VA's 1995-99 VISN restructuring under
# Kenneth Kizer (Annual Review of Public Health, businessofgovernment.org);
# the NHS's National Programme for IT (NAO/Parliament Public Accounts
# Committee report, multiple case-study retrospectives); PMI's Benefits
# Realization Management standard.
# ══════════════════════════════════════════════════════════════════════════════

lessons_posted = []

def post_and_track(slug, title, body):
    post(slug, title, body)
    lessons_posted.append((slug, title, len(body)))


# ────────────────────────────────────────────────────────────────────────────
# LESSON 1 — Why Change Management Determines Transformation Success
# ────────────────────────────────────────────────────────────────────────────
LESSON_1_SLUG = "tl-why-change-management-matters"
LESSON_1_TITLE = "Why Change Management Determines Transformation Success"

lesson_1_body = [

    h2('s1h1', 'The Execution Gap'),
    blk('s1p1',
        'Healthcare transformation programs rarely fail because the underlying analysis was wrong. The '
        'financial case for value-based payment, the clinical case for care coordination, and the equity '
        'case for closing measured disparities are each backed by decades of published evidence. Boards '
        'approve the strategy. Consultants deliver the report. Legislatures pass the statute. And then, '
        'in a large share of cases, very little actually changes in how the organization operates two years '
        'later.'),
    blk('s1p2',
        'What fails, far more often than the analysis, is the organizational change process: the sequencing, '
        'pacing, and management of the human and institutional change that structural reform actually '
        'requires. A hospital can have an airtight financial model for entering a global budget and still '
        'fail to execute it, because the model says nothing about how department heads will react when told '
        'that growing volume no longer grows revenue, or how a governing board will react to ceding rate-'
        'setting authority to an outside commission. This course is about that second problem — the one '
        'the analytical frameworks in a strategy deck do not solve.'),
    callout('s1c1',
        'Change management, project management, and portfolio management are related but distinct '
        'disciplines. Project management delivers a defined scope on schedule and budget. Program '
        'management coordinates related projects to produce benefits no single project could achieve alone. '
        'Portfolio management aligns the whole collection of programs and projects with organizational '
        'strategy. Change management is the layer underneath all three: the discipline of managing how '
        'people and institutions actually adopt the new state, regardless of how well the plan above them '
        'is built.'),
    stat_grid('s1sg1', [
        ('$135M', 'Lost per $1B in failed projects', 'PMI, Pulse of the Profession — unrecoverable loss on projects that fail outright'),
        ('$20M vs. $280M', 'Risk per $1B spent, high- vs. low-performers', 'PMI — the gap between organizations with strong project delivery discipline and those without'),
        ('38%', 'More projects delivered on time and on budget', 'PMI — organizations with an established Project Management Office (PMO) vs. those without one'),
        ('67%', 'More projects fail outright', 'PMI — organizations that treat project management as a non-strategic function'),
    ]),

    h2('s2h1', 'Two Failure Modes, Not One'),
    blk('s2p1',
        'It is useful to separate transformation failure into two distinct modes. An analytical failure means '
        'the underlying plan was wrong — the payment model does not actually align incentives, the clinical '
        'redesign does not actually improve outcomes, the technology does not actually do what the vendor '
        'promised. An execution failure means the plan was sound but the organization could not, or did not, '
        'actually carry it out: stakeholders were not brought along, governance never caught up with scope, '
        'or the change was announced but never institutionalized. Healthcare transformation research and '
        'practice consistently find the second failure mode is more common than the first.'),
    blk('s2p2',
        'The United Kingdom\'s National Programme for IT (NPfIT) is one of the most thoroughly studied examples '
        'of a pure execution failure in a health system context. Launched in the early 2000s to build a '
        'single national electronic health record and supporting IT infrastructure for the National Health '
        'Service, NPfIT was stopped early in 2011 after the UK government had spent an estimated £9.8 billion '
        'on it — with independent reviews and retrospectives placing total realized and sunk costs as high as '
        '£10–12.7 billion once contract terminations and write-offs are included. The core information-'
        'technology problem the programme set out to solve — clinicians across a national health system '
        'unable to share patient records — was a real and analytically sound problem to solve. What collapsed '
        'was execution.'),
    example('s2ex1', 'The NHS National Programme for IT (NPfIT)',
        'The UK\'s National Audit Office and Parliament\'s Public Accounts Committee both examined NPfIT\'s '
        'collapse in detail. Their findings center on governance, not technology: the programme\'s structure '
        'separated central decision-making authority from the local NHS organizations responsible for actually '
        'implementing the systems, creating a persistent gap between the people who designed the programme and '
        'the people who had to make it work in a hospital or clinic. Reviewers also found insufficient '
        'engagement with clinicians and other frontline stakeholders during design, and risk assessments that '
        'were produced and then set aside rather than acted on.\n'
        'The National Audit Office\'s later assessment made a second finding that matters directly for this '
        'course: the lessons from NPfIT\'s failure were not being captured or applied systematically even in '
        'the UK government\'s subsequent digital transformation programmes — meaning the same governance gap '
        'was positioned to repeat itself elsewhere.'),

    h2('s3h1', 'What Makes Healthcare\'s Change Problem Specifically Harder'),
    blk('s3p1',
        'Every organization undergoing major change faces resistance, competing priorities, and limited '
        'bandwidth. Healthcare transformation adds structural features that a typical corporate change '
        'program does not have to manage. Clinical governance is legally and professionally separate from '
        'administrative governance — a hospital CEO cannot simply direct medical staff the way a corporate '
        'executive directs a business unit, because clinical decision-making authority sits with licensed '
        'professionals and medical staff bylaws, not the org chart. Patient safety obligations mean some '
        'changes cannot be piloted the way a retail company pilots a new store format; a clinical process '
        'change that fails silently can hurt someone before anyone notices the failure.'),
    blk('s3p2',
        'Authority is also unusually distributed. A single transformation initiative in a state like Vermont '
        'can simultaneously involve an independent state regulator, a federal agency, a state legislature, a '
        'hospital\'s own governing board — which typically includes community members with political '
        'relationships to local legislators — and, in many markets, organized labor. A corporate change '
        'leader answers to one board and one set of shareholders. A healthcare transformation leader is '
        'answering to several genuinely independent sources of authority at once, none of which can be '
        'overruled by the others.'),
    compare('s3cmp1', 'Corporate Change vs. Healthcare Transformation',
        'Typical Corporate Change', [
            'Single governing board and shareholder base',
            'Management has direct authority over most affected staff',
            'Pilots can fail safely and be rolled back',
            'Timeline is set internally and can be renegotiated',
        ],
        'Healthcare Transformation Under Mandatory Reform', [
            'Overlapping authority: regulator, legislature, board, medical staff',
            'Clinical decision-making authority sits outside the org chart',
            'A failed pilot can mean patient harm, not just a rollback',
            'Statutory deadlines are set externally and cannot be renegotiated',
        ]),
    warning('s3w1', 'A Mandate Does Not Remove the Change-Management Problem',
        'A statutory deadline changes the urgency calculation — the transformation is happening regardless — '
        'but it does not remove the need to build a coalition, communicate a vision, or manage resistance. '
        'Organizations that treat a legal mandate as a substitute for change leadership tend to produce '
        'exactly the compliance-only, minimally-adopted version of reform that shows up in the data years '
        'later as underperformance.'),

    h2('s4h1', 'What This Course Covers'),
    blk('s4p1',
        'The five lessons that follow work through the change-leadership toolkit a healthcare transformation '
        'leader actually needs, in the order a real transformation program encounters them: first the '
        'framework for sequencing organizational change itself (Kotter\'s eight steps), then the governance '
        'infrastructure that keeps a multi-year, multi-component transformation from fragmenting into '
        'disconnected initiatives (the PMO and portfolio management), then the specific skill of managing '
        'governing boards and external stakeholders who did not choose the reform, then the specific and '
        'predictable resistance patterns that a fixed-revenue-envelope transition produces, and finally the '
        'discipline of making a transformation\'s gains durable instead of letting them erode once leadership '
        'attention moves elsewhere.'),
    steps('s4st1', 'What Comes Next', [
        ('Kotter\'s Eight Steps', 'Applying the classic change-management framework to a mandatory reform timeline, evidenced by two independent healthcare studies.'),
        ('Building the PMO', 'The project/program/portfolio hierarchy, using the VA\'s 1990s restructuring and the NHS\'s NPfIT as opposite case studies.'),
        ('Stakeholder and Board Management', 'Three real governance designs — Maryland, Oregon, Massachusetts — for building buy-in from stakeholders who did not choose the reform.'),
        ('Managing Resistance', 'The predictable resistance patterns a fixed-revenue-envelope transition produces, evidenced by CMS\'s mandatory bundled-payment experience.'),
        ('Sustaining the Change', 'Benefits realization management and what separates a durable transformation from one that quietly reverses.'),
    ]),
    highlight('s4hl1',
        'A statutory deadline is not negotiable, but the change-management work required to meet it well — '
        'rather than merely on paper — is exactly the same work described in this course, whether the '
        'reform is voluntary or mandatory.'),

    takeaway('tw', [
        'Healthcare transformation programs more often fail from execution and change-management gaps than from flawed analysis.',
        'Project, program, portfolio, and change management are related but distinct disciplines; change management is the layer that determines whether people and institutions actually adopt the new state.',
        'PMI\'s research finds organizations without a PMO complete fewer projects on time and on budget, and organizations that treat project management as non-strategic see far higher outright failure rates.',
        'The NHS\'s National Programme for IT is a canonical example of a pure execution failure: the underlying goal was sound, but centralized governance separated from local implementation authority caused the collapse.',
        'Healthcare transformation is structurally harder to lead than typical corporate change because clinical governance sits outside the administrative org chart and authority is distributed across regulators, legislatures, boards, and medical staff.',
        'A legal mandate changes the urgency calculation for a reform but does not remove the need for a guiding coalition, a communicated vision, or active resistance management.',
        'This course builds the change-leadership toolkit in the order a real transformation encounters it: sequencing change, building governance, managing stakeholders, managing resistance, and sustaining the result.',
    ]),

    quiz('qz',
        'According to PMI\'s Pulse of the Profession research, what distinguishes organizations that treat '
        'project management as a strategic competency from those that do not?',
        [
            ('There is no measurable difference in project outcomes', False),
            ('Organizations that undervalue project management report 67% more projects failing outright', True),
            ('Organizations with a PMO complete fewer projects on time', False),
            ('Project management discipline only matters for IT projects', False),
        ],
        'PMI\'s research found organizations that do not treat project management as a strategic competency '
        'report an average of 67% more of their projects failing outright, and separately found PMO '
        'organizations complete 38% more projects on time and on budget than those without one.'),

    h2('src', 'Sources'),
    blk('src1', '[1] PMI, Pulse of the Profession research (multiple years) — https://www.pmi.org/learning/library/2022/07/01/21/01/en-2013-pulse-high-cost-low-performance-13511 — cost-of-poor-performance and PMO-value statistics'),
    blk('src2', '[2] National Audit Office / Parliament Public Accounts Committee, "The dismantled National Programme for IT in the NHS" — https://publications.parliament.uk/pa/cm201314/cmselect/cmpubacc/294/294.pdf — NPfIT governance failure findings and cost'),
    blk('src3', '[3] Panorama Consulting, "Reasons Behind The NHS IT System & Project Failure Case Study" — https://www.panorama-consulting.com/nhs-it-system-failure/ — NPfIT cost and governance analysis'),
    blk('src4', '[4] Health Transformation Review, Transforming American Healthcare, Chapter 12 §12.4 ("The Change Management Science Behind Healthcare Transformation") — internal manuscript, book\'s own framing of the execution-gap argument'),
]

post_and_track(LESSON_1_SLUG, LESSON_1_TITLE, lesson_1_body)


# ────────────────────────────────────────────────────────────────────────────
# LESSON 2 — Kotter's Eight-Step Framework Applied to Mandatory Payment Reform
# ────────────────────────────────────────────────────────────────────────────
LESSON_2_SLUG = "tl-kotters-eight-steps"
LESSON_2_TITLE = "Kotter's Eight-Step Framework Applied to Mandatory Payment Reform"

lesson_2_body = [

    h2('s1h1', 'A Corporate Model With a Healthcare Track Record'),
    blk('s1p1',
        'John Kotter published his eight-step change model in "Leading Change" (Harvard Business School '
        'Press, 1996) after studying more than 100 corporate transformation efforts and finding a consistent '
        'pattern in why most of them fell short. The steps are: create urgency, form a guiding coalition, '
        'develop a vision, communicate the vision, remove obstacles, create short-term wins, sustain '
        'acceleration, and institute the change in culture and systems.'),
    blk('s1p2',
        'Nearly thirty years after publication, the model has moved well beyond its corporate origins and now '
        'has a real healthcare research literature behind it — not case studies written by consultants, but '
        'independently designed and published quality-improvement and health-services research. This lesson '
        'uses two of those published applications directly, rather than treating the framework as a piece of '
        'management theory imported without evidence.'),
    callout('s1c1',
        'Kotter\'s Eight Steps: (1) create urgency, (2) form a guiding coalition, (3) develop a vision, '
        '(4) communicate the vision, (5) remove obstacles, (6) create short-term wins, (7) sustain '
        'acceleration, (8) institute the change in culture and systems.'),

    h2('s2h1', 'Steps 1–4: What Changes Under a Mandatory Deadline'),
    blk('s2p1',
        'Mandatory reform changes what several of the early steps mean in practice. Step 1, create urgency, '
        'is not a persuasion exercise when a legislature has already set a statutory deadline — the urgency '
        'exists whether or not leadership manufactures it. The analytical task shifts from creating urgency '
        'to presenting already-real urgency in terms specific and credible enough to produce organizational '
        'action rather than paralysis or denial. A public, well-documented financial presentation showing '
        'exactly how fragile a hospital system\'s finances are tends to do this far better than a general '
        'appeal to the importance of change.'),
    blk('s2p2',
        'Step 2, form a guiding coalition, is where the most consequential healthcare-specific risk '
        'concentrates. A coalition built only from administrative and financial leadership will produce a '
        'transformation plan that clinical staff can quietly decline to implement, regardless of how legally '
        'binding the underlying mandate is — because clinical decision-making authority in a hospital sits '
        'with medical staff governance, not the administrative org chart. Step 3, develop a vision, has to be '
        'specific enough to guide real decisions: an aspiration like "high-quality, affordable, equitable '
        'care for everyone" cannot be operationalized, while a specific target — a named percentage of '
        'patients in a coordinated-care model, a specific quality-measure benchmark, a specific network '
        'design — can be. Step 4, communicate the vision, has to reach several genuinely distinct audiences '
        '— clinical staff, administrators, the community, legislators, payers — each of whom needs the '
        'message calibrated to what they actually decide.'),
    example('s2ex1', 'A Rural Kentucky Federally Qualified Health Center',
        'Researchers studying a federally qualified health center in rural Kentucky applied Kotter\'s eight-'
        'step framework to understand how the clinic implemented a proactive-office-encounter model aimed at '
        'closing preventive-care gaps and reducing health disparities, and published the analysis in a peer-'
        'reviewed case study. The study found clear evidence of Steps 1 through 7 in the clinic\'s actual '
        'implementation process — urgency was established, a coalition formed, a vision developed and '
        'communicated, obstacles removed, and short-term wins produced and sustained. Step 8, institutionalizing '
        'the change in the clinic\'s permanent culture and systems, was the one area the researchers identified '
        'as still needing work at the time of publication — a finding that previews this lesson\'s later point '
        'about which step healthcare change efforts most often fail to complete.'),

    h2('s3h1', 'Steps 5–8: Where Reform Efforts Actually Break'),
    blk('s3p1',
        'Step 5, remove obstacles, means clearing the barriers within the coalition\'s actual control — '
        'administrative complexity like prior-authorization requirements or certificate-of-need processes, '
        'organizational silos between departments that never share data, and contracting structures that '
        'still financially reward volume even after a value-based strategy has been announced on paper. Step '
        '6, create short-term wins, requires results that are genuine, visible, and clearly attributable to '
        'the transformation effort — not cherry-picked metrics or coincidental improvements that would have '
        'happened anyway. Step 7, sustain acceleration, is specifically about surviving the multi-year span '
        'most healthcare reforms require, across multiple budget cycles, at least one election cycle, and '
        'the inevitable setbacks that occur along the way.'),
    example('s2ex2', 'A 41-Month ICU Hand-Hygiene Improvement Study',
        'A prospective, longitudinal quality-improvement study applied Kotter\'s eight-step model to hand-'
        'hygiene compliance in an intensive care unit over 41 months and published the results. Compliance '
        'rose from 35.71% at baseline to 87.75% by the end of the study period — an increase of roughly '
        '146%. The researchers attributed the result specifically to the model\'s systematic structure: it '
        'changed how ICU staff perceived hand hygiene as a practice and built an environment that both '
        'advocated for and sustained the improved behavior over more than three years, rather than producing '
        'a short-lived spike immediately after a training session.'),
    warning('s3w1', 'A "Short-Term Win" That Is Not Genuine Backfires',
        'Announcing a metric as a transformation success when it was not actually caused by the '
        'transformation — or when it reflects a small, favorable subgroup rather than the whole population — '
        'tends to be noticed by exactly the staff whose buy-in the win was meant to build, and it damages '
        'trust in every subsequent claim of progress.'),

    h2('s4h1', 'The Step Healthcare Skips'),
    analogy('s4an1',
        'Institutionalizing a change is like converting a temporary detour into the new permanent road. The '
        'detour sign, the barriers, and the construction crew are all Steps 1 through 7 — visible, '
        'attention-getting, and clearly temporary. Institutionalization is quietly repaving the detour into '
        'the map itself, so that ten years later a new driver has no idea a different road ever existed. '
        'Most organizations tear down the detour signs the moment traffic starts flowing smoothly, long '
        'before the new route has actually become "just how people get there."',
        'Kotter\'s Step 8 — instituting change in organizational culture and systems'),
    blk('s4p1',
        'Step 8 is the step with no natural finish line to celebrate. Steps 1 through 7 each have a visible '
        'event attached — a launch, an early win, a period of acceleration. Institutionalization is instead '
        'the absence of an event: the new behavior simply continuing to be normal long after the program that '
        'created it has stopped being anyone\'s active, named project. Both the Kentucky FQHC study and the '
        'general pattern in healthcare change-management research point to this as the step most often left '
        'incomplete, which is why Lesson 6 of this course returns to it directly under the heading of '
        'benefits realization and sustainment.'),

    h2('s5h1', 'Applying the Framework to Your Own Organization'),
    blk('s5p1',
        'The eight steps translate into a diagnostic an organization can run on itself at any point in a '
        'transformation, not only at the beginning. The questions below are ordered to match the framework '
        'and are deliberately specific enough to have a real yes-or-no answer, rather than an aspirational one.'),
    steps('s5st1', 'An Eight-Step Diagnostic', [
        ('Urgency', 'Is there a specific, credible, publicly presented case for why change is needed now — not a general appeal to importance?'),
        ('Coalition', 'Does the guiding coalition include clinical leadership with real influence over medical staff, not only administrative and financial leaders?'),
        ('Vision', 'Is the vision specific enough that two people could independently evaluate whether a given decision is consistent with it?'),
        ('Communication', 'Has the vision been communicated in language calibrated to each distinct audience — clinical staff, administrators, community, legislators, payers?'),
        ('Obstacle removal', 'Have at least one administrative, one organizational, and one contracting obstacle been identified and actually removed?'),
        ('Short-term wins', 'Is there a genuine, attributable, visible result to point to yet — not a projection of a future result?'),
        ('Sustained acceleration', 'Is there a plan for maintaining momentum across the next budget cycle and the next election cycle, not just the next quarter?'),
        ('Institutionalization', 'If the transformation\'s named leader left tomorrow, would the new behavior continue without them?'),
    ]),

    takeaway('tw', [
        'Kotter\'s eight-step model — urgency, coalition, vision, communication, obstacle removal, short-term wins, sustained acceleration, institutionalization — was developed from more than 100 corporate cases and has since been validated in independently published healthcare studies.',
        'Under a mandatory reform, Step 1 (urgency) already exists by statute; the task shifts to presenting it credibly rather than manufacturing it.',
        'Step 2 (coalition) carries the highest healthcare-specific risk: a coalition without real clinical leadership will not produce implementation, regardless of legal mandate.',
        'A published Kentucky FQHC case study found evidence of Steps 1–7 in a real preventive-care transformation, with Step 8 identified as the remaining gap.',
        'A 41-month ICU study found Kotter\'s model raised hand-hygiene compliance from 35.71% to 87.75%, evidence specifically for the model\'s ability to sustain change, not just launch it.',
        'Step 8, institutionalization, is the step most healthcare change efforts skip, because unlike the other seven it has no visible launch event to mark its completion.',
        'The eight steps convert into a concrete diagnostic that can be run on any transformation at any point, not only at its start.',
    ]),

    quiz('qz',
        'A 41-month ICU quality-improvement study found Kotter\'s model raised hand-hygiene compliance from '
        '35.71% to 87.75%. Which step of the framework is this sustained, multi-year result most directly '
        'evidence for?',
        [
            ('Step 1: create urgency', False),
            ('Step 8: institute the change in culture and systems', True),
            ('Step 3: develop a vision', False),
            ('Step 5: remove obstacles', False),
        ],
        'A durable, multi-year compliance gain — rather than a short-lived spike right after training — is '
        'exactly what Step 8 is meant to produce: the new behavior becoming the sustained default rather than '
        'a temporary intervention effect.'),

    h2('src', 'Sources'),
    blk('src1', '[1] Kotter, J.P. (1996), Leading Change, Harvard Business School Press — the original eight-step framework'),
    blk('src2', '[2] "A Change-Management Approach to Closing Care Gaps in a Federally Qualified Health Center: A Rural Kentucky Case Study" — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6716404/ — Kotter\'s model applied to a real FQHC preventive-care initiative'),
    blk('src3', '[3] "Kotter\'s 8-step change model to improve hand hygiene compliance in intensive care unit: A 41-month prospective longitudinal quality improvement study" — https://pubmed.ncbi.nlm.nih.gov/39561482/ — the ICU compliance results cited above'),
    blk('src4', '[4] Health Transformation Review, Transforming American Healthcare, Chapter 12 §12.4.1 ("Kotter\'s Framework Applied to Healthcare Transformation") — internal manuscript, the book\'s own Vermont-specific application of the eight steps'),
]

post_and_track(LESSON_2_SLUG, LESSON_2_TITLE, lesson_2_body)


# ────────────────────────────────────────────────────────────────────────────
# LESSON 3 — Building the PMO: Portfolio Governance for a Multi-Year Transformation
# ────────────────────────────────────────────────────────────────────────────
LESSON_3_SLUG = "tl-building-the-pmo"
LESSON_3_TITLE = "Building the PMO: Portfolio Governance for a Multi-Year Transformation"

lesson_3_body = [

    h2('s1h1', 'Getting the Levels Right'),
    blk('s1p1',
        'The Project Management Institute draws a hierarchy that most healthcare transformation programs '
        'never observe explicitly. A project is a temporary undertaking that produces a defined, unique '
        'result on a defined scope, schedule, and budget — deploying a new analytics vendor, certifying a '
        'single clinic as a behavioral-health home. A program is a set of related projects managed together '
        'to produce benefits that no single project could achieve alone — a technology pillar\'s combined '
        'health-information-exchange and AI-governance work, for example. A portfolio is the full collection '
        'of programs, projects, and ongoing operations managed together to achieve organizational strategy — '
        'the entire multi-year transformation agenda across every pillar.'),
    blk('s1p2',
        'Most healthcare systems run their transformation agenda as a flat list of initiatives with no '
        'portfolio layer above the individual projects. That absence has a specific, predictable cost: no one '
        'is positioned to notice that two initiatives are competing for the same handful of data analysts, or '
        'that a delay in one workstream has silently invalidated the timeline of another that depends on it. '
        'A portfolio manager\'s entire job is to see across that boundary; without the role, the boundary '
        'simply goes unmonitored.'),
    stat_grid('s1sg1', [
        ('$2T', 'Wasted worldwide annually', 'PMI, Pulse of the Profession — roughly 11.4% of every dollar invested lost to poor project performance'),
        ('38%', 'More on-time/on-budget delivery', 'PMI — comparing organizations with an established PMO to those without one'),
    ]),

    h2('s2h1', 'What a PMO Actually Does'),
    blk('s2p1',
        'A Project (or Portfolio) Management Office is not a layer of bureaucratic sign-off. Its core '
        'functions are specific and largely invisible when done well: maintaining a single register of every '
        'active initiative with a named owner and a dated obligation, maintaining a risk register that is '
        'actually reviewed rather than filed and forgotten, defining stage gates that a component must pass '
        'before moving to the next phase, resolving resource conflicts between components competing for the '
        'same limited staff, and producing a single consolidated report that lets an executive or a '
        'legislature see the whole portfolio\'s status at once rather than piecing it together from a dozen '
        'separate updates.'),
    callout('s2c1',
        'PMI defines the ten project management knowledge areas — integration, scope, schedule, cost, '
        'quality, resource, communications, risk, procurement, and stakeholder management — as the complete '
        'set a mature PMO has to address. A transformation program can have strong analytical content in '
        'every one of these areas and still lack the operational infrastructure to manage them day to day; '
        'that gap between analytical coverage and operational capacity is precisely what a PMO is built to '
        'close.'),

    h2('s3h1', 'What Worked: The VA\'s VISN Restructuring'),
    blk('s3p1',
        'By the mid-1990s, the U.S. Department of Veterans Affairs\' health system was widely criticized for '
        'delivering fragmented, unpredictable care that was expensive and difficult to access. Dr. Kenneth '
        'Kizer, a physician trained in emergency medicine and public health, was appointed Director of the '
        'Veterans Health Administration in 1994 specifically to modernize the system. In 1995 he launched a '
        'restructuring plan that decentralized the VA\'s national operations into 22 geographically defined '
        'Veterans Integrated Service Networks, known as VISNs, and drove the reorganization through 1999.'),
    example('s3ex1', 'Kenneth Kizer\'s VA Restructuring, 1995–1999',
        'The VISN restructuring focused on five things simultaneously: management accountability, care '
        'coordination, quality improvement, resource allocation, and information management. Rather than '
        'managing the whole VA system as one centralized bureaucracy, Kizer pushed real operational '
        'accountability down to the 22 regional networks while holding each one to consistent, measurable '
        'standards from the center. Published assessments of the transformation — including analyses in the '
        'Annual Review of Public Health — found the restructuring produced dramatically improved quality, '
        'service, and operational efficiency, to the point that VA care quality later came to be regarded as '
        'among the best in the American health system and the transformation itself is frequently cited as a '
        'model for large-scale health-system reform.'),

    h2('s4h1', 'What Failed: The NHS\'s National Programme for IT'),
    blk('s4p1',
        'The contrast with the NHS\'s National Programme for IT is direct and instructive precisely because '
        'both were large-scale, centrally initiated attempts to transform a national health system\'s '
        'operations. NPfIT, launched in the early 2000s, retained centralized decision-making authority at the '
        'national level while leaving the NHS trusts and local organizations responsible for actually '
        'implementing the systems those central decisions had specified — the opposite structural choice from '
        'the VA\'s decentralized-with-accountability model. The National Audit Office found this separation of '
        'authority from accountability, combined with insufficient engagement of frontline clinicians during '
        'design and risk assessments that were produced and then not acted on, to be the core drivers of the '
        'programme\'s collapse. It was stopped in 2011 after an estimated £9.8 billion in direct government '
        'spending, with independent retrospectives placing total realized costs, once write-offs are '
        'included, as high as £10–12.7 billion.'),
    compare('s4cmp1', 'What Separated the VA\'s Success From NPfIT\'s Failure',
        'VA VISN Restructuring (Worked)', [
            'Decentralized operational authority to 22 regional networks',
            'Held networks accountable to consistent, measurable standards from the center',
            'Reorganization phased over roughly four years (1995–1999)',
            'Later assessed as producing measurably improved quality and efficiency',
        ],
        'NHS NPfIT (Failed)', [
            'Centralized decision-making, separated from local implementation authority',
            'Insufficient engagement of clinicians and frontline stakeholders in design',
            'Risk assessments produced but not acted on',
            'Dismantled in 2011 after ~£9.8B in direct spend; total realized cost estimated up to £10–12.7B',
        ]),

    h2('s5h1', 'Designing Your Own PMO'),
    blk('s5p1',
        'A transformation PMO does not need to be built from a blank page. The first and highest-value step, '
        'usable by an organization of any size, is a portfolio inventory: listing every statute, grant, model '
        'agreement, and initiative touching the transformation, and assigning each one a pillar and a named '
        'owner. Most organizations underestimate their own portfolio\'s real size until they run this '
        'exercise, because individual initiatives are typically owned by different departments that do not '
        'otherwise compare notes with each other.'),
    steps('s5st1', 'Building a Transformation PMO', [
        ('Charter the office', 'Define the PMO\'s authority, reporting line, and scope in writing before staffing it.'),
        ('Inventory the portfolio', 'List every initiative touching the transformation with a named owner and dated obligation — repeatable regardless of how many components it turns up.'),
        ('Build the risk register', 'Capture material risks per component and, critically, review it on a fixed cadence rather than filing it once.'),
        ('Set the reporting cadence', 'Produce one consolidated portfolio report on a fixed schedule for the executive or legislative audience, rather than per-component updates.'),
        ('Staff for the ten knowledge areas', 'Assign clear ownership for integration, schedule, resource, risk, and stakeholder management — the areas most often left informal.'),
    ]),
    highlight('s5hl1',
        'The portfolio inventory exercise is repeatable by any organization regardless of how many components '
        'it turns up. The specific number is never the point — the point is that most organizations discover '
        'their portfolio is larger and more interdependent than any single department realized before the '
        'inventory was done.'),

    takeaway('tw', [
        'PMI\'s hierarchy — project, program, portfolio — gives transformation leaders a precise vocabulary for a coordination problem healthcare usually manages informally.',
        'A missing portfolio layer has a specific, predictable cost: resource conflicts and cross-component dependencies go unmonitored until they cause a visible failure.',
        'PMI research finds organizations with an established PMO complete 38% more projects on time and on budget than those without one.',
        'The VA\'s 1995–99 VISN restructuring under Kenneth Kizer decentralized operational authority to 22 regional networks while holding them to consistent central standards — and is widely credited with producing durable quality gains.',
        'The NHS\'s National Programme for IT made the opposite structural choice — centralizing decision-making while leaving local organizations accountable for implementation — and collapsed at an estimated cost of up to £10–12.7 billion.',
        'A PMO\'s core functions are a maintained portfolio register, a genuinely reviewed risk register, defined stage gates, resource-conflict resolution, and one consolidated report.',
        'The single highest-value first step for any organization building this capability is a full portfolio inventory — every initiative, assigned an owner and a pillar.',
    ]),

    quiz('qz',
        'What is the key structural difference between the VA\'s 1995–99 VISN restructuring (widely regarded '
        'as successful) and the NHS\'s National Programme for IT (widely regarded as a failure)?',
        [
            ('The VA had a larger budget than the NHS programme', False),
            ('The VA decentralized operational authority while holding networks to central standards; NPfIT centralized decisions while leaving implementation accountability local', True),
            ('The VA restructuring involved no new technology', False),
            ('NPfIT had strong clinician engagement while the VA restructuring did not', False),
        ],
        'The VA pushed real operational authority down to 22 regional networks while maintaining consistent '
        'central standards and accountability. NPfIT did the opposite — it kept decision-making centralized '
        'while leaving NHS trusts accountable for implementing decisions they had little role in shaping, '
        'which reviewers identified as the core governance failure.'),

    h2('src', 'Sources'),
    blk('src1', '[1] PMI, Pulse of the Profession research — https://www.pmi.org/learning/library/2022/07/01/21/01/en-2013-pulse-high-cost-low-performance-13511 — PMO value and cost-of-poor-performance statistics'),
    blk('src2', '[2] "Extreme Makeover: Transformation of the Veterans Health Care System" (Annual Review of Public Health) — https://www.annualreviews.org/content/journals/10.1146/annurev.publhealth.29.020907.090940 — VA VISN restructuring under Kenneth Kizer'),
    blk('src3', '[3] "The Revitalization of the Veterans Health Administration" — https://www.businessofgovernment.org/sites/default/files/TransformingVHA.pdf — Kizer\'s 1995 "Vision for Change" restructuring plan'),
    blk('src4', '[4] National Audit Office / Parliament Public Accounts Committee, "The dismantled National Programme for IT in the NHS" — https://publications.parliament.uk/pa/cm201314/cmselect/cmpubacc/294/294.pdf — NPfIT governance failure and cost findings'),
    blk('src5', '[5] Health Transformation Review, Transforming American Healthcare, Chapter 15 §15.2–15.6 — internal manuscript, the book\'s own PMI-grounded portfolio governance design for Vermont'),
]

post_and_track(LESSON_3_SLUG, LESSON_3_TITLE, lesson_3_body)


# ────────────────────────────────────────────────────────────────────────────
# LESSON 4 — Stakeholder and Governing Board Management Under Mandatory Payment Reform
# ────────────────────────────────────────────────────────────────────────────
LESSON_4_SLUG = "tl-stakeholder-board-management"
LESSON_4_TITLE = "Stakeholder and Governing Board Management Under Mandatory Payment Reform"

lesson_4_body = [

    h2('s1h1', 'A Different Kind of Board Problem'),
    blk('s1p1',
        'A hospital governing board asked to approve a discretionary strategic initiative retains a real '
        'option: it can decline, delay, or scale it back. A board operating under mandatory payment reform — '
        'where an independent regulator has already set the rate methodology and a legislature has already '
        'set the deadline — is instead being asked to accept and implement a transformation it did not choose '
        'and cannot stop. That distinction changes what board management has to accomplish. The task is no '
        'longer persuasion toward a yes-or-no decision; it is education and engagement toward effective '
        'implementation of a decision that has already been made elsewhere.'),
    blk('s1p2',
        'Hospital community boards typically include members with genuine political relationships to local '
        'legislators, which means board management under mandatory reform is never purely an internal '
        'governance exercise — it is simultaneously a channel through which political and community sentiment '
        'about the reform reaches the legislature that mandated it. Three real transformation programs built '
        'three different governance designs to manage exactly this problem, and each offers a distinct, '
        'evidenced lesson.'),

    h2('s2h1', 'Maryland: Naming the Sea Change Explicitly'),
    blk('s2p1',
        'Maryland\'s Health Services Cost Review Commission, an independent state agency, has held hospital '
        'rate-setting authority since a 1971 state statute, expanded to private payers in 1974 and to Medicare '
        'and Medicaid under a 1977 federal waiver. In 2014, working with CMS and the CMS Innovation Center, '
        'the state converted all acute-care hospitals to global budgets under the Maryland All-Payer Model — '
        'fixing each hospital\'s total annual revenue in advance rather than paying by volume of services '
        'delivered.'),
    example('s2ex1', 'Maryland\'s Global Budget Conversion',
        'A published qualitative study of Maryland health care leaders\' perspectives on the All-Payer Model '
        'found the global budget conversion was described directly as "a monumental change, a sea change, in '
        'the way that hospitals thought about raising revenue." The leaders interviewed identified a specific '
        'set of governance themes as necessary to manage that shift: setting achievable expectations rather '
        'than overpromising immediate results, protecting hospital autonomy rather than dictating operational '
        'decisions from the regulator, maintaining close and continuous communication between the commission '
        'and hospital leadership, using actionable data that hospitals could act on rather than only report, '
        'carefully calibrating each hospital\'s budget rather than applying a single formula uniformly, and '
        'building a shared commitment to the change across the state\'s hospital sector rather than treating '
        'compliance as adversarial. In 2019, Maryland and CMS extended the model into the Total Cost of Care '
        'Model, adding incentives for hospitals to help manage spending on services delivered by other, non-'
        'hospital providers — a sign the original governance approach had built enough durability to support '
        'expansion rather than retrenchment.'),
    callout('s2c1',
        'Naming a change explicitly as a "sea change" rather than downplaying its magnitude — and then '
        'organizing governance specifically around not overpromising, protecting existing autonomy where '
        'possible, and communicating continuously — is itself a stakeholder-management strategy documented in '
        'Maryland\'s own case, not just a description of what the reform felt like from the outside.'),

    h2('s3h1', 'Oregon: Building Community Governance Into the Structure'),
    blk('s3p1',
        'Oregon took a structurally different governance approach for its Medicaid Coordinated Care '
        'Organizations, launched under a 2012 state reform. Rather than a top-down regulator managing '
        'provider compliance, each CCO is governed as a required partnership among health care providers, '
        'community members, and other stakeholders in the health system who share in the financial risk of a '
        'single global budget covering physical, mental, and dental health care.'),
    example('s3ex1', 'Oregon\'s Coordinated Care Organizations',
        'Each Oregon CCO is required to maintain a Community Advisory Committee, which produces a Community '
        'Health Assessment and a Community Health Improvement Plan for its region. Community stakeholders and '
        'Medicaid members themselves play a formal governance role that is substantially larger than in a '
        'traditional managed-care organization. The design deliberately trades some administrative simplicity '
        'for community legitimacy: a CCO\'s budget and priorities are shaped, in part, by the people who use '
        'the care it finances, not only by the providers and payers who deliver and fund it.'),

    h2('s4h1', 'Massachusetts: Co-Designing the Reform Before Launch'),
    blk('s4p1',
        'Blue Cross Blue Shield of Massachusetts took a third approach when it launched the Alternative '
        'Quality Contract in January 2009 — a global-budget-based commercial payment model combining a fixed '
        'per-patient payment, adjusted annually for health status and inflation, with substantial performance '
        'incentives tied to nationally accepted quality, effectiveness, and patient-experience measures.'),
    example('s4ex1', 'The Massachusetts Alternative Quality Contract',
        'Rather than designing the contract internally and then presenting it to providers as a finished '
        'product, BCBS Massachusetts built a team of physicians, finance experts, and measurement scientists '
        'and tested the contract concept directly with key hospital and physician leaders, local and national '
        'policy experts, employers, and other purchasers throughout the design process — before the contract '
        'was finalized. The framework explicitly linked payment reform, quality measurement, public '
        'engagement, legislative and regulatory strategy, organizational governance, and information '
        'technology as connected levers rather than treating the payment change in isolation. A Harvard '
        'Medical School study published in 2019 found the AQC slowed the growth rate of medical spending by '
        'up to 12% while improving patient care over eight years of operation, and the contract now covers '
        'more than 80% of the physicians and hospitals in the BCBS Massachusetts network.'),

    h2('s5h1', 'A Stakeholder Management Framework for Mandatory Reform'),
    blk('s5p1',
        'The three cases point to a common structural lesson despite their different designs: each built a '
        'formal mechanism for a non-payer stakeholder group — hospital leadership in Maryland, community '
        'members in Oregon, physician and hospital leaders in Massachusetts — to shape the reform\'s design or '
        'governance, rather than only receiving it after the fact. The book\'s own account of Vermont\'s '
        'transformation coalition identifies exactly the gap this points to: Vermont\'s guiding coalition of '
        'AHS leadership, the state regulator, hospital CEOs, and the legislature\'s health reform oversight '
        'committee is missing systematic clinical leadership integration — the same gap Kotter\'s Step 2 '
        'identifies as fatal if left unaddressed.'),
    warning('s5w1', 'The Missing Coalition Seat Is a Named, Current Gap — Not a Hypothetical',
        'This is not a hypothetical risk drawn from general change-management theory. The book\'s own '
        'analysis of Vermont\'s actual transformation coalition names clinical leadership engagement as its '
        'current, unresolved gap — precisely the coalition-composition risk Maryland, Oregon, and '
        'Massachusetts each built formal structures to avoid.'),
    steps('s5st1', 'Building a Stakeholder Management Plan', [
        ('Map authority and interest', 'Identify every group with real authority over implementation — regulator, legislature, board, medical staff, community — not only the group that holds legal sign-off.'),
        ('Give clinical leadership a real coalition seat', 'Not a consultation role — a seat with actual influence over medical staff, matching what Kotter\'s Step 2 requires.'),
        ('Build a board education timeline', 'Boards under mandatory reform need sustained education on what is and is not still within their control, not a single approval meeting.'),
        ('Create a genuine feedback loop', 'A channel for stakeholder concerns to actually change implementation details, even when the reform itself cannot be stopped.'),
        ('Report on a fixed public cadence', 'Vermont\'s own Chapter 12 argues the legislature should require a consolidated transformation dashboard reported at every legislative cycle — visible, regular reporting is itself a stakeholder-management tool.'),
    ]),

    takeaway('tw', [
        'A governing board under mandatory reform is being asked to implement a decision it did not make and cannot reverse — board management has to shift from persuasion to education and engagement.',
        'Maryland\'s hospital leaders described their 2014 global budget conversion as "a monumental change, a sea change," and named achievable expectations, protected autonomy, close communication, actionable data, calibrated budgets, and shared commitment as the governance themes that managed it.',
        'Oregon built formal community governance directly into its Coordinated Care Organizations through required Community Advisory Committees and shared financial risk.',
        'Massachusetts\'s BCBS tested its Alternative Quality Contract concept with hospital and physician leaders, policy experts, and employers before finalizing it — treating payment, quality measurement, governance, and public engagement as linked levers.',
        'All three cases built a formal mechanism for a non-payer stakeholder group to shape the reform before or during rollout, not only after launch.',
        'Vermont\'s own transformation coalition, per the book\'s own account, is missing exactly this kind of systematic clinical leadership integration — a current, named gap rather than a hypothetical risk.',
        'A working stakeholder plan maps authority and interest, gives clinical leadership a real coalition seat, sustains board education over time, builds a genuine feedback loop, and reports on a fixed public cadence.',
    ]),

    quiz('qz',
        'What structural feature is common to Oregon\'s Coordinated Care Organizations and the Massachusetts '
        'Alternative Quality Contract, despite their very different designs?',
        [
            ('Both eliminated financial risk for providers', False),
            ('Both built formal mechanisms for non-payer stakeholders to shape the reform\'s design or governance', True),
            ('Both were launched without any stakeholder engagement', False),
            ('Both are federal CMS models', False),
        ],
        'Oregon required Community Advisory Committees and shared financial governance with community members; '
        'Massachusetts tested its contract concept directly with hospital and physician leaders and policy '
        'experts before finalizing it. Both built formal, pre-launch stakeholder shaping into the reform '
        'rather than presenting a finished design after the fact.'),

    h2('src', 'Sources'),
    blk('src1', '[1] "Health Care Leaders\' Perspectives on the Maryland All-Payer Model" — https://pmc.ncbi.nlm.nih.gov/articles/PMC8903109/ — the "sea change" quote and governance themes'),
    blk('src2', '[2] Commonwealth Fund, "Hospital Global Budgeting: Lessons from Maryland and Selected Nations" (2024) — https://www.commonwealthfund.org/publications/fund-reports/2024/jun/hospital-global-budgeting-lessons-maryland-selected-nations — Maryland model history and 2019 TCOC extension'),
    blk('src3', '[3] Kaiser Family Foundation, "Coordinated Care Organizations: Frequently Asked Questions" — https://www.kff.org/wp-content/uploads/sites/2/2012/05/cco-faq.pdf — Oregon CCO governance structure'),
    blk('src4', '[4] Health Affairs, "Private-Payer Innovation In Massachusetts: The \'Alternative Quality Contract\'" (2010) — https://healthaffairs.org/doi/full/10.1377/hlthaff.2010.0980 — AQC design and co-development process'),
    blk('src5', '[5] BCBS Massachusetts newsroom, "New Harvard Medical School Study Finds... Alternative Quality Contract Slowed Spending, Improved Care Over 8 Years" (July 2019) — https://newsroom.bluecrossma.com/2019-07-17-New-Harvard-Medical-School-Study-Finds-Blue-Cross-Blue-Shield-of-Massachusetts-Alternative-Quality-Contract-Slowed-Spending-Improved-Care-Over-8-Years — AQC outcomes and network coverage'),
    blk('src6', '[6] Health Transformation Review, Transforming American Healthcare, Chapter 12 §12.4.1, Step 2 — internal manuscript, Vermont\'s named clinical-leadership coalition gap'),
]

post_and_track(LESSON_4_SLUG, LESSON_4_TITLE, lesson_4_body)


# ────────────────────────────────────────────────────────────────────────────
# LESSON 5 — Managing Organizational Resistance in a Fixed-Revenue-Envelope Transition
# ────────────────────────────────────────────────────────────────────────────
LESSON_5_SLUG = "tl-managing-resistance-global-budgets"
LESSON_5_TITLE = "Managing Organizational Resistance in a Fixed-Revenue-Envelope Transition"

lesson_5_body = [

    h2('s1h1', 'Why This Reform Type Is Different'),
    blk('s1p1',
        'A payment reform that adds a bonus on top of existing fee-for-service revenue asks an organization '
        'to do something extra for more money — a relatively easy sell. A global budget or a mandatory bundle '
        'asks an organization to accept that growing volume no longer grows revenue at all. That is a zero-sum '
        'reframing of every department\'s underlying incentive to do more, and it is why fixed-revenue reforms '
        'produce a resistance pattern that milder value-based arrangements typically do not: the threat to an '
        'individual department, service line, or physician group\'s existing model is not hypothetical or '
        'marginal. It is structural and immediate.'),
    blk('s1p2',
        'Resistance under this specific reform type tends to follow a small number of predictable patterns '
        'rather than a diffuse, unstructured objection to change in general. Naming those patterns in advance '
        '— rather than discovering them in the first year\'s performance data — is the difference between '
        'managing resistance proactively and reacting to it after it has already produced a measurable result.'),

    h2('s2h1', 'Pattern One: Gaming the Boundary'),
    blk('s2p1',
        'CMS\'s Comprehensive Care for Joint Replacement model made a 90-day bundled payment mandatory for '
        'lower-extremity joint replacement in a defined set of metropolitan statistical areas, launching in '
        'April 2016. It is one of the most directly documented examples in Medicare policy of how '
        'organizations respond, in practice, to a hard payment boundary imposed on them rather than one they '
        'chose.'),
    example('s2ex1', 'CMS\'s Mandatory CJR Bundle',
        'Research on hospital behavior under CJR found that in the metropolitan areas where participation was '
        'mandatory, hospitals tended to treat healthier patients on average than in areas without the '
        'mandate, and were more likely to perform knee replacements in the inpatient setting — which the '
        'bundle covered — even when the same procedure performed outpatient, which the bundle did not cover, '
        'would have been the less costly option. Roughly 77% of CJR participant hospitals earned reconciliation '
        'payments in one or both of the model\'s first two performance years. Once CMS subsequently made '
        'participation voluntary for some hospitals and separately made outpatient total knee replacement '
        'billable nationally outside the bundle, the boundary-optimization incentive weakened — and CJR\'s '
        'measured savings were no longer statistically significant by the fourth performance year.'),
    callout('s2c1',
        'The CJR pattern is not evidence of bad faith. It is evidence that organizations respond rationally to '
        'whatever boundary a payment reform draws. A fixed-revenue or fixed-bundle boundary will be optimized '
        'around unless the reform\'s design anticipates that response — which is why monitoring for '
        'boundary-shifting behavior has to be built into a transformation from its first year, not added '
        'after the data has already revealed a problem.'),

    h2('s3h1', 'Pattern Two: Autonomy Anxiety'),
    blk('s3p1',
        'The second predictable pattern is resistance driven not by the financial mechanics of the reform but '
        'by the perceived loss of institutional independence — a hospital board or leadership team\'s anxiety '
        'about ceding operational control to an outside regulator, even when the regulator has no intention of '
        'dictating day-to-day decisions.'),
    blk('s3p2',
        'Maryland\'s own governance design, discussed in the previous lesson, treated this directly: '
        '"protecting hospital autonomy" was named explicitly, alongside close communication and calibrated '
        'budgets, as one of the specific themes leaders identified as necessary to manage the shift to global '
        'budgets. The lesson generalizes: a regulator or state agency that can credibly demonstrate it is not '
        'seeking to control operational decisions beyond the budget itself will face measurably less '
        'resistance than one whose intentions on that point remain ambiguous to the organizations being '
        'regulated.'),

    h2('s4h1', 'Pattern Three: The Missing Coalition Seat'),
    blk('s4p1',
        'The third pattern connects directly back to Kotter\'s Step 2. Clinical staff who have no real seat in '
        'the guiding coalition — who experience the reform as something decided about them rather than with '
        'them — will disengage from implementation even when they have no legal ability to block the mandate '
        'itself. Disengagement is quieter than open opposition and correspondingly harder to detect: a '
        'clinician who simply does not change documentation habits, does not refer into a new care-management '
        'program, or does not flag early warning signs of a process breaking down produces exactly the kind '
        'of silent underperformance that shows up in outcome data a year later with no obvious single cause.'),
    warning('s4w1', 'A Mandate Cannot Substitute for Coalition Membership',
        'Transformation that clinical leaders oppose will fail regardless of administrative mandate, because '
        'clinical decision-making authority in a hospital sits with medical staff governance, not the '
        'administrative org chart that issued the mandate.'),

    h2('s5h1', 'A Resistance-Management Playbook'),
    blk('s5p1',
        'The three patterns above point toward a common structural response: name the zero-sum trade-off '
        'explicitly rather than letting departments discover it on their own, build a data-informed '
        'reallocation process instead of an opaque top-down cut, create a visible pipeline of genuine early '
        'wins, monitor for boundary-shifting behavior from the reform\'s first year rather than its third, and '
        'formalize clinical leadership\'s coalition seat rather than treating clinical input as optional '
        'consultation.'),
    compare('s5cmp1', 'Resistance Symptom vs. Underlying Driver', 'Observed Symptom', [
        'Coding or site-of-service patterns shift right after go-live',
        'Board delays or repeatedly requests more information before approving next steps',
        'Clinicians disengage from new workflows without open objection',
    ], 'Underlying Driver', [
        'Boundary-optimization incentive — the reform drew a line and the organization is responding to it rationally',
        'Autonomy anxiety — perceived loss of institutional independence, not necessarily disagreement with the reform\'s goals',
        'No genuine coalition seat — the change was decided about them, not with them',
    ]),
    steps('s5st1', 'A Resistance-Management Playbook', [
        ('Name the trade-off', 'State explicitly, in writing, what department or service line loses under the new revenue structure — do not let it be discovered informally.'),
        ('Build a reallocation process', 'Give departments a transparent, data-informed process for adjusting to the new envelope rather than an opaque top-down cut.'),
        ('Create a short-term-win pipeline', 'Identify genuine early wins specifically for the groups most exposed to the reform\'s downside, not only system-level wins.'),
        ('Monitor for boundary behavior early', 'Build the CJR-style monitoring — service-mix shifts, site-of-care shifts, patient-selection patterns — into year one, not year three.'),
        ('Formalize the clinical coalition seat', 'Give clinical leadership real influence over implementation decisions, not a consultative role added after the design is set.'),
    ]),

    takeaway('tw', [
        'A fixed-revenue-envelope reform reframes every department\'s incentive to grow volume into a zero-sum trade-off, producing more resistance than a bonus-on-top value-based arrangement.',
        'CMS\'s mandatory CJR bundle produced documented boundary-gaming: hospitals selected healthier patients and shifted procedures into the inpatient setting the bundle covered.',
        'CJR\'s measured savings were no longer statistically significant by year four once the mandatory boundary was loosened — direct evidence the earlier savings were partly an artifact of the boundary itself.',
        'A second resistance pattern is autonomy anxiety — Maryland\'s own governance design named "protecting hospital autonomy" explicitly as a necessary theme for managing its global budget conversion.',
        'A third pattern is quiet clinical disengagement when clinical leadership lacks a genuine coalition seat — harder to detect than open opposition because it produces no formal objection.',
        'A working playbook names the zero-sum trade-off explicitly, builds a transparent reallocation process, creates genuine early wins, monitors for boundary behavior from year one, and formalizes a real clinical coalition seat.',
        'Resistance under this reform type is predictable, not random — the goal is to anticipate the pattern rather than discover it in the second or third year\'s performance data.',
    ]),

    quiz('qz',
        'What happened to CMS\'s measured savings under the mandatory CJR bundled-payment model after '
        'outpatient total knee replacement was made billable nationally outside the bundle?',
        [
            ('Savings increased further', False),
            ('Savings were no longer statistically significant by the fourth performance year', True),
            ('The model was cancelled immediately', False),
            ('Hospital participation became mandatory nationwide', False),
        ],
        'Once outpatient TKA was excluded from the bundle nationally and some hospitals\' participation became '
        'voluntary, the boundary-optimization incentive weakened, and CJR\'s measured savings were no longer '
        'statistically significant by the fourth year — evidence that part of the earlier savings reflected '
        'boundary-gaming rather than genuine efficiency gains.'),

    h2('src', 'Sources'),
    blk('src1', '[1] Commonwealth Fund, "How Hospitals Respond to Incentives: Bundled Payment for Joint Surgery" (2021) — https://www.commonwealthfund.org/publications/journal-article/2021/may/hospital-incentives-bundled-payment-joint-surgery — CJR boundary-gaming findings'),
    blk('src2', '[2] CMS, "Findings at a Glance: Comprehensive Care for Joint Replacement (CJR) Model" — https://www.cms.gov/files/document/cjr-fg-secondannrptpdf.pdf — CJR participation and reconciliation-payment data'),
    blk('src3', '[3] "Health Care Leaders\' Perspectives on the Maryland All-Payer Model" — https://pmc.ncbi.nlm.nih.gov/articles/PMC8903109/ — the "protecting hospital autonomy" governance theme'),
    blk('src4', '[4] Health Transformation Review, Transforming American Healthcare, Chapter 12 §12.4.1, Step 2 — internal manuscript, the coalition-seat argument applied to Vermont'),
]

post_and_track(LESSON_5_SLUG, LESSON_5_TITLE, lesson_5_body)


# ────────────────────────────────────────────────────────────────────────────
# LESSON 6 — Sustaining the Change: Benefits Realization and Avoiding Reform Fatigue
# ────────────────────────────────────────────────────────────────────────────
LESSON_6_SLUG = "tl-sustaining-change-benefits-realization"
LESSON_6_TITLE = "Sustaining the Change: Benefits Realization and Avoiding Reform Fatigue"

lesson_6_body = [

    h2('s1h1', 'The Step With No Finish Line'),
    blk('s1p1',
        'Kotter\'s eighth step — institute the change in culture and systems — is the step this course has '
        'now flagged twice as the one most transformation efforts skip, and it is worth being precise about '
        'why. Steps 1 through 7 each have a visible event attached: a public presentation that creates '
        'urgency, a coalition\'s first meeting, a launch, an early win, a period of visible acceleration. '
        'Institutionalization has no equivalent event to point to. It is the absence of an event — the new '
        'behavior simply continuing to be normal long after the program that created it has stopped being '
        'anyone\'s actively managed project.'),
    blk('s1p2',
        'That absence of a natural finish line is precisely why sustainment has to be planned and budgeted '
        'for deliberately, rather than assumed to happen automatically once a transformation has launched '
        'successfully. The Project Management Institute\'s benefits realization management standard gives '
        'this planning a formal structure.'),

    h2('s2h1', 'PMI\'s Three-Part Discipline'),
    blk('s2p1',
        'Benefits realization management is the process of planning, tracking, realizing, and sustaining the '
        'strategic benefits a project, program, or portfolio is meant to produce. PMI\'s standard treats it as '
        'a tool within the broader discipline of portfolio performance management, and defines three core '
        'elements: identify the benefits a program is meant to produce, execute the changes needed to produce '
        'them, and sustain those benefits after the program has formally concluded.'),
    callout('s2c1',
        'The third element — sustain — is the one most transformation plans never explicitly budget for. Most '
        'plans identify a target benefit clearly and execute a defined set of changes to reach it. Far fewer '
        'plans assign a named owner, a review cadence, and a monitoring mechanism to the period after the '
        'program has officially closed — which is exactly when a hard-won gain is most vulnerable to quietly '
        'reversing.'),
    stat_grid('s2sg1', [
        ('1971', 'Maryland\'s rate-setting authority created', 'Maryland General Assembly — the HSCRC\'s founding statute'),
        ('2014', 'Global budgets extended to all acute hospitals', 'CMS/CMMI + HSCRC — the All-Payer Model'),
        ('2019', 'Extended to Total Cost of Care', 'Maryland TCOC Model — added non-hospital spending incentives'),
    ], ),

    h2('s3h1', 'Case Study in Durability: Maryland\'s Five-Decade Run'),
    blk('s3p1',
        'Maryland\'s hospital rate-setting authority has operated continuously since a 1971 state statute — '
        'more than five decades, spanning multiple governors, legislatures, and federal administrations. The '
        'model has not been static across that period. It has been repeatedly revised: extended to private '
        'payers in 1974, to Medicare and Medicaid in 1977, converted to global budgets for all acute-care '
        'hospitals in 2014, and extended again into a Total Cost of Care model covering non-hospital spending '
        'in 2019. Published assessments describe the model as having performed favorably over its most recent '
        'decade, but explicitly note this has required "continual course correction by CMS, HSCRC, and '
        'hospitals" rather than a single design that has simply run unchanged.'),
    example('s3ex1', 'Maryland as the Institutionalization Benchmark',
        'The relevant lesson from Maryland is not that its original 1971 or 2014 design was perfect and '
        'therefore never needed to change. It is the opposite: the model survived and expanded specifically '
        'because it had a standing structure — the HSCRC as a permanent independent commission, with an '
        'ongoing relationship to CMS — that could keep making course corrections indefinitely, long after the '
        'original 1971 or 2014 launch events were no longer news. Durability came from a standing governance '
        'structure built to keep adjusting, not from getting the design right once and leaving it alone.'),

    h2('s4h1', 'Case Study in Sustainment Infrastructure: CPC+\'s Learning Collaboratives'),
    blk('s4p1',
        'CMS\'s Comprehensive Primary Care Plus model, a national advanced primary care medical home model '
        'that launched in 2017 across 14 regions and expanded to 18 by 2018, built its sustainment mechanism '
        'directly into the program\'s design rather than treating it as a follow-up activity after launch.'),
    example('s4ex1', 'CPC+\'s Learning System',
        'CPC+ included a standing national and regional learning system — in-person and web-based learning '
        'communities, national webinars, an annual national stakeholder meeting, cross-region collaboration, '
        'and individualized on-site coaching — organized around five core primary-care functions: access and '
        'continuity, care management, comprehensiveness and coordination, patient and caregiver engagement, '
        'and planned care and population health. The infrastructure did not end when a practice completed its '
        'initial transformation; it continued operating for the life of the model precisely so that gains made '
        'in year one did not depend on a single training event holding permanently.'),

    h2('s5h1', 'Case Study in Collapse: What Happens Without Sustainment Infrastructure'),
    blk('s5p1',
        'The NHS\'s National Programme for IT, examined in Lesson 3 for its governance-structure failure, '
        'offers a second, distinct lesson here about sustainment specifically. The UK\'s National Audit Office '
        'found not only that the programme itself failed, but that the lessons from its failure were not '
        'being captured or applied systematically — meaning the same structural risks remained live in the '
        'government\'s later digital transformation programmes. A program that has no mechanism for sustaining '
        'even its own institutional learning is unlikely to have a mechanism for sustaining the operational '
        'benefits it was originally built to produce.'),
    compare('s5cmp1', 'What Sustains a Transformation vs. What Lets It Collapse',
        'Sustained (Maryland, CPC+)', [
            'A standing governance body empowered to keep making course corrections indefinitely',
            'A learning/coaching infrastructure that continues after initial go-live',
            'A named review cadence that outlives the original launch team',
        ],
        'Collapsed (NPfIT)', [
            'Governance structured around a single centralized launch, not ongoing local adjustment',
            'No standing mechanism to capture and apply lessons after failure began to show',
            'Institutional learning not systematically transferred to later programs',
        ]),

    h2('s6h1', 'Building a Sustainment Plan'),
    blk('s6p1',
        'A transformation\'s launch team should not be the same body responsible for its indefinite '
        'maintenance — the skills, incentives, and attention span required are different. A concrete '
        'sustainment plan names a benefit owner for each targeted gain, sets a review cadence that continues '
        'well past go-live, keeps the risk register open rather than closing the file at launch, and budgets '
        'ongoing resources for the kind of learning-collaborative-style support CPC+ built in, rather than '
        'treating training as a one-time event.'),
    steps('s6st1', 'A Sustainment Plan', [
        ('Name a benefit owner', 'Assign a specific, named individual responsible for each targeted benefit continuing to hold — not the launch project manager by default.'),
        ('Set a post-launch review cadence', 'Schedule reviews on a fixed calendar that extends well beyond the program\'s formal close date.'),
        ('Keep the risk register open', 'Do not close the risk register at go-live; the risks to a benefit holding are often different from the risks to launching it.'),
        ('Budget for ongoing learning support', 'Fund coaching, cross-site collaboration, or a learning community the way CPC+ did, rather than a single training event.'),
        ('Report on a fixed public cadence indefinitely', 'The book\'s own recommendation for Vermont — a consolidated dashboard reported at every legislative cycle — is a sustainment mechanism, not only a launch-phase accountability tool.'),
    ]),
    highlight('s6hl1',
        'If the dashboard does not exist, the transformation is not being managed. If it exists but the '
        'milestones are consistently incomplete, the transformation is not on track — and either way, the '
        'legislature, board, or executive sponsor needs to know before the gap becomes irreversible.'),

    takeaway('tw', [
        'Kotter\'s Step 8, institutionalization, has no natural finish-line event, which is exactly why it is the step most healthcare transformations leave incomplete.',
        'PMI\'s benefits realization management standard defines three core elements — identify, execute, sustain — and most transformation plans budget for the first two but not the third.',
        'Maryland\'s hospital rate-setting model has operated continuously since 1971 and expanded through 2014 and 2019 specifically because a standing governance body kept making course corrections, not because the original design was static.',
        'CMS\'s CPC+ built a standing national and regional learning-collaborative infrastructure directly into the model, so gains did not depend on a single training event.',
        'The NHS\'s National Audit Office found NPfIT\'s failure lessons were not systematically captured even by later government digital programs — a sustainment failure layered on top of the original governance failure.',
        'A concrete sustainment plan names a benefit owner, sets a post-launch review cadence, keeps the risk register open, and budgets ongoing learning support rather than a one-time launch event.',
        'A fixed, public reporting cadence — the book\'s own recommendation for Vermont\'s legislature — functions as a sustainment mechanism, not just an accountability tool for the launch phase.',
    ]),

    quiz('qz',
        'Per PMI\'s benefits realization management standard, which of the three core elements — identify, '
        'execute, sustain — does this lesson identify as the one most transformation plans fail to budget '
        'for?',
        [
            ('Identify the benefits', False),
            ('Execute the changes needed to produce the benefits', False),
            ('Sustain the benefits after the program ends', True),
            ('Market the benefits externally', False),
        ],
        'Most transformation plans do identify a target benefit and execute a defined set of changes to reach '
        'it. Far fewer assign a named owner, review cadence, and monitoring mechanism for the period after the '
        'program formally closes — exactly the gap the NHS\'s own National Audit Office found in NPfIT\'s '
        'aftermath.'),

    h2('src', 'Sources'),
    blk('src1', '[1] PMI, "Benefits Realization Management Framework" — https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/benefits-realization-management-framework.pdf — the identify/execute/sustain framework'),
    blk('src2', '[2] Commonwealth Fund, "Hospital Global Budgeting: Lessons from Maryland and Selected Nations" (2024) — https://www.commonwealthfund.org/publications/fund-reports/2024/jun/hospital-global-budgeting-lessons-maryland-selected-nations — Maryland\'s multi-decade course-correction history'),
    blk('src3', '[3] CMS, "CPC+ Annual Report" and Primary Care Collaborative overview — https://www.cms.gov/priorities/innovation/data-and-reports/2022/cpc-annual-report-2-cms-perspective — CPC+ learning-collaborative infrastructure'),
    blk('src4', '[4] National Audit Office / Parliament Public Accounts Committee, "The dismantled National Programme for IT in the NHS" — https://publications.parliament.uk/pa/cm201314/cmselect/cmpubacc/294/294.pdf — the finding that NPfIT\'s lessons were not systematically captured'),
    blk('src5', '[5] Health Transformation Review, Transforming American Healthcare, Chapter 12 §12.9 — internal manuscript, the legislative-dashboard sustainment recommendation'),
]

post_and_track(LESSON_6_SLUG, LESSON_6_TITLE, lesson_6_body)


print("\n=== Summary ===")
for slug, title, n_blocks in lessons_posted:
    print(f"{slug}: {n_blocks} top-level body items — {title}")
