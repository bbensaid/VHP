exec(open('/Users/baba/Vermont-Health-Platform/CONTENT_TEMPLATE.py').read())

# ══════════════════════════════════════════════════════════════════════════════
# Transformation Leadership — Lesson 4 (inserted 2026-10-12):
# "Running the Sequencing Test: A Portfolio Register Workshop"
# Hands-on companion to book Chapter 15 §15.7 and the platform's
# /portfolio-sequencing-test tool. Posted on its own so re-running it never
# re-posts the other six lessons in _lessons_transformation_leadership.py.
#
# Verified 2026-10-12 before writing:
#  - HHS OIG, "HealthCare.gov: Case Study of CMS Management of the Federal
#    Marketplace" (OEI-06-14-00350, Feb 22 2016) — read from the report PDF:
#    "absence of clear leadership"; no entity "serving formally as systems
#    integrator to coordinate these functions"; QSSI hired as technical systems
#    integrator; site recovered "for high consumer use within 2 months";
#    "poor coordination between policy and technical work".
#  - First Data review of Cover Oregon (commissioned by Gov. Kitzhaber; 67
#    interviews, 3,200+ documents; Oracle on time-and-materials; the
#    "system integrator with a stronger financial incentive" quote) — PCWorld,
#    Mar 21 2014. Board vote to move to HealthCare.gov, Apr 25 2014 —
#    Commonwealth Fund / NPR.
#  - Vermont hospital fiscal year begins Oct 1 — VTDigger, Aug 14 2025 (quoted).
#  - AHS Act 68 report, March 2026 (contracted support; analytics contract
#    under negotiation) — read from the PDF.
#  - Vermont figures (19 components, statuses, R-01/R-10/R-08 scores) are the
#    book's Figure 15.3 / 15.6 as corrected 2026-10-12; tool outputs are from
#    lib/framework/portfolio-test.ts on the "Vermont, Fall 2026" preset
#    (asserted in scripts/test-portfolio-test.cjs).
# ══════════════════════════════════════════════════════════════════════════════

LESSON_SLUG = "tl-running-the-sequencing-test"
LESSON_TITLE = "Running the Sequencing Test: A Portfolio Register Workshop"

body = [

    # ── SECTION 1 ──────────────────────────────────────────────────────────────
    h2('s1h1', 'Start With the Register'),
    blk('s1p1',
        'The previous lesson made the case for a portfolio office. This one is the first thing that office '
        'should do in its first month: build the register and run the sequencing test against it. Neither '
        'step needs software, a consultant, or a budget line. Both need someone with the standing to ask '
        'every department what it is running, and the discipline to write the answers down in one place.'),
    blk('s1p2',
        "PMI's Standard for Portfolio Management treats portfolio definition as the foundational act: every "
        'component identified, classified, and assigned governance. Vermont has never published such a '
        "definition, so the book's Chapter 15 assembled one by reading Act 68, the AHEAD State Agreement, the "
        'Rural Health Transformation Program application, and the AHS transformation reports for every '
        'initiative carrying a named owner and a dated obligation. The exercise produced nineteen components '
        'across the five pillars. That number is not the point; the method is.'),
    blk('s1p3',
        'A register entry needs five fields, and each one does work. The pillar tells you which gate the '
        'component sits behind. The owner tells you who answers for it. The type separates compliance '
        'projects from strategic programs. The status says whether it is not started, in design, implementing, '
        'or done. And the calendar target records the statutory or contractual date — which, as the rest of '
        'this lesson shows, is the field you should trust least when deciding what to work on next.'),
    blk('s1p4',
        'Expect the register to move. Vermont withdrew from the AHEAD State Agreement in July 2026, which turned '
        'one component from a live program into a closeout obligation, and hospital transformation plans moved '
        'from submission to implementation after final plans were due in March 2026. A register that is not '
        'revisited at every governance review quietly becomes a record of last year\'s portfolio.'),
    callout('s1c1',
        'A portfolio register is not a status report. A status report lists what is happening. A register '
        'lists everything that has to happen, who owns it, and which pillar it depends on — so that the '
        'question "what should we work on next?" can be answered by dependency rather than by deadline.'),
    steps('s1st1', 'Building the register in one pass', [
        ('Inventory the obligations', 'List every statute, grant, model agreement, and funded initiative that '
         'carries a named owner and a dated obligation. Read the source documents; do not rely on memory.'),
        ('Assign each a pillar', 'Place each component in the pillar whose function it serves — Policy, '
         'Technology, Economics, Clinical, or Operations.'),
        ('Name an owner', 'One accountable lead per component. Components with no owner are a finding in '
         'themselves.'),
        ('Record status honestly', 'Not started, design, implementing, or done. "Design" and "implementing" '
         'are different statuses, and the difference decides the test.'),
        ('Note the calendar target last', 'Keep the deadline, but treat it as context — it never decides '
         'whether a component should be running.'),
    ]),

    # ── SECTION 2 ──────────────────────────────────────────────────────────────
    h2('s2h1', 'The Four Steps, Turned Into Verdicts'),
    blk('s2p1',
        "The book's sequencing test asks four questions of every component, in order. Which pillar does it "
        "belong to? Is that pillar's upstream gate open? If the gate is closed, what is gating it, and is that "
        'resourced? If the gate is open, is this component actually running? The definition of an open gate '
        'comes from Chapter 1: open means the enabling work is finished, not that a milestone was declared.'),
    blk('s2p2',
        'Run against a register, those four questions produce a small set of verdicts, and the vocabulary '
        'matters because it changes the conversation. A component behind a closed gate that has not started '
        'is not "behind schedule" — it is correctly waiting. A component with nothing upstream holding it that '
        'has not started is late, even if its deadline is two years away. A component implementing while its '
        'gate is closed is spending money on output nobody can use yet.'),
    blk('s2p3',
        'Two qualifications come from Chapter 1 and keep the test from becoming a blunt instrument. First, '
        'design never waits for a gate: specifying what a payment model must measure is precisely what tells '
        'the technology build what to deliver, so Economics-as-design runs in parallel with the Technology '
        'stage. Second, some components produce value on their own. The book says Blueprint PCMH expansion, '
        'CCBHC certification, and Collaborative Care deployment proceed in parallel with Technology work — '
        'correctly — because they deliver value whether or not the downstream gates have opened.'),
    blk('s2p4',
        'Notice what the test does not use: the deadline. Calendar targets stay in the register because '
        'statutes and grants impose them, and a portfolio office has to report against them. But a verdict '
        'that changed with the deadline would just be the old status report under a new name. The test is '
        'useful precisely because two components with the same due date can receive opposite verdicts — one '
        'correctly waiting, one already late.'),
    highlight('s2hl1',
        'Only implementation waits for a gate. Design work, and care-model work that produces value on its '
        'own, should be running now.'),
    table('s2t1', 'The seven verdicts the test produces', [
        {'Verdict': 'Correctly waiting', 'Gate': 'Closed', 'Status': 'Not started', 'Meaning': 'Not behind schedule; pressure belongs upstream'},
        {'Verdict': 'Design in parallel', 'Gate': 'Closed', 'Status': 'Design', 'Meaning': 'Allowed and useful (Economics-as-design)'},
        {'Verdict': 'Running ahead of its gate', 'Gate': 'Closed', 'Status': 'Implementing', 'Meaning': 'Budget spent on output nobody can use yet'},
        {'Verdict': 'Ready to implement', 'Gate': 'Open', 'Status': 'Design', 'Meaning': 'Move it into implementation'},
        {'Verdict': 'On track', 'Gate': 'Open or not needed', 'Status': 'Implementing', 'Meaning': 'Nothing upstream holds it'},
        {'Verdict': 'Late by dependency order', 'Gate': 'Open or not needed', 'Status': 'Not started', 'Meaning': 'Late even if early by calendar'},
        {'Verdict': 'Done', 'Gate': 'Any', 'Status': 'Done', 'Meaning': 'Finished'},
    ]),

    # ── SECTION 3 ──────────────────────────────────────────────────────────────
    h2('s3h1', 'Worked Example: Vermont, Fall 2026'),
    blk('s3p1',
        "Load the book's nineteen components with their Fall 2026 statuses into the platform's Portfolio "
        'Sequencing Test and use the same gate profile the HTR Simulator uses for Vermont: the Policy gate open '
        'on the strength of Acts 167, 51, and 68, and Technology only partly delivered. The Economics gate is '
        'therefore not open. The AHS-GMCB analytics vendor, which the book records as in procurement with a '
        'January 2027 operational target, is not yet running — and AHS reported in March 2026 that an '
        'analytics contract for regional planning was still under negotiation.'),
    blk('s3p2',
        'The test then sorts the portfolio. Thirteen components are on track. Two Economics components — RBP '
        'implementation and global-budget design and implementation — are in design, which is exactly what '
        'Chapter 1 says they should be doing while the Technology gate is closed. One, the Vermont CIN build-out, '
        'sits behind an open gate but is still only in design. Two are late by dependency order despite '
        'distant deadlines: the statewide AI-governance framework, which nothing upstream is holding, and — '
        'pointedly — the AHS PMO itself.'),
    blk('s3p3',
        'One component is flagged as running ahead of its gate: RHT Program deployment, which the book places '
        'in the Economics pillar and describes as active. That is not a verdict that the money is wasted. It '
        'is a prompt to ask which parts of the deployment depend on analytics that do not yet exist, and to '
        'hold those parts until they do. Finally, step three of the test names where schedule pressure belongs: '
        'the four unfinished Technology components, each of which holds the same three gated Economics '
        'components behind it.'),
    stat_grid('s3sg1', [
        ('19', 'Components in the register', "Source: book Chapter 15, Figure 15.3 (HTR inventory, early 2026)"),
        ('4', 'Pressure points (Technology)', 'Source: Portfolio Sequencing Test, Vermont Fall 2026 preset'),
        ('2', 'Late by dependency order', 'AI-governance framework and the AHS PMO — Source: same tool run'),
        ('Oct 2027', 'FY2028 hospital budgets take effect', 'Vermont hospital fiscal years begin October 1 — Source: VTDigger, Aug 2025'),
    ]),
    warning('s3w1', 'The deadline list would have told you the opposite',
        'Sorted by statutory date, the AI-governance framework (FY2028 adoption) and the PMO (Q2 2027) look '
        'like later problems, and the analytics vendor looks like one deadline among many. Sorted by dependency, '
        'the PMO and AI governance are already late, and the analytics vendor is the single component the whole '
        'Economics pillar is waiting on.'),

    # ── SECTION 4 ──────────────────────────────────────────────────────────────
    h2('s4h1', 'What Happens When Nobody Owns the Sequence'),
    blk('s4p1',
        'The sequencing test assumes someone has the authority to act on its answers — to hold a component '
        'back, or to move resources to the one that gates everything else. The clearest public record of what '
        'happens without that authority comes from two health-insurance marketplace launches in 2013, each '
        'investigated afterward in detail.'),
    blk('s4p2',
        "The federal Office of Inspector General's case study of HealthCare.gov found that the most critical "
        'misstep was the absence of clear leadership, which delayed decisions, and that there was no entity '
        'serving formally as systems integrator to coordinate the separately contracted pieces of the build. '
        'It also documented poor coordination between policy and technical work and resistance to hearing bad '
        'news. Oregon, building its own exchange, made a structurally similar choice and did not recover.'),
    example('s4ex1', 'HealthCare.gov (federal marketplace, 2013)',
        "The HHS Office of Inspector General's February 2016 case study (OEI-06-14-00350) found that the "
        '"absence of clear leadership" delayed decisionmaking, and that no entity was formally serving as '
        'systems integrator to coordinate key functions built by different contractors.\n'
        'After the failed October 2013 launch, CMS hired QSSI as technical systems integrator to coordinate '
        'technical tasks and resources, and the OIG reports that CMS recovered the website for high consumer '
        'use within two months — once one party owned the integration.'),
    example('s4ex2', 'Cover Oregon (state marketplace, 2013–2014)',
        'An independent review by First Data, commissioned by Governor John Kitzhaber and based on 67 '
        'interviews and more than 3,200 documents, found that Oracle had been hired on a time-and-materials '
        'basis, which contributed to a lack of scope control, delayed requirements, and unrealistic delivery '
        'expectations. "A system integrator with a stronger financial incentive for ensuring performance most '
        'likely would have pushed harder," the review said.\n'
        "On April 25, 2014, Cover Oregon's board voted to abandon its own enrollment site and move to "
        'HealthCare.gov.'),
    blk('s4p3',
        'The lesson for a state portfolio is not that contractors are the problem. Vermont\'s own March 2026 '
        'Act 68 report lists contracted transformation support, a new hospital technical-assistance vendor, and '
        'an analytics contract under negotiation — sensible ways to add capacity. The question both marketplace '
        'reviews raise is different: when those contractors\' deliverables depend on one another, who decides '
        'which one waits? A contractor delivers a defined scope. Only an owner with authority over the whole '
        'portfolio can hold one component back so that another can finish first.'),
    quote('s4q1',
        'Most critical was the absence of clear leadership, which caused delays in decisionmaking. — HHS '
        'Office of Inspector General, HealthCare.gov case study, 2016'),

    # ── SECTION 5 ──────────────────────────────────────────────────────────────
    h2('s5h1', 'Reading Risk Alongside Sequence'),
    blk('s5p1',
        "Chapter 15's risk register scores each risk as probability times impact. Two risks tie for the top "
        'score of 20: the analytics vendor not being operational by January 2027 (R-01), and portfolio-management '
        'infrastructure not being established before the 2027 deadlines (R-10). The sequencing test and the '
        'register point at the same place — the analytics gate — from two directions, which is a useful '
        'cross-check: if your pressure points and your highest risks disagree, one of the two is wrong.'),
    blk('s5p2',
        'The register also shows why a moderate risk score is not a licence to wait. Social-risk adjustment '
        'not being adopted before the FY2028 budgets (R-08) scores 12 — a medium probability times a high '
        'impact. Yet the sequencing test says this methodology has no upstream blocker and should already be '
        'running. Treating it as a FY2028 problem because that is when it is due is the scheduling error that '
        'leaves equity work perpetually late.'),
    blk('s5p3',
        'In practice, bring both artifacts to the same governance meeting. Start with the components that '
        'appear in both places — a pressure point in the sequencing test that also carries a top-scored risk. '
        'Those are the decisions the board should make first, and they are usually few. Then look for the '
        'opposite pattern: unblocked work with a middling risk score and a distant deadline. That is where '
        'equity and governance work tends to hide, because nothing on either list makes it feel urgent.'),
    compare('s5cp1', 'Two ways to read the same portfolio',
        'Calendar view', [
            'Sorts components by statutory or contractual date',
            'Treats a waiting component as "behind schedule"',
            'Leaves distant-deadline work (AI governance, social-risk adjustment) for later',
            'Spreads pressure across every component with a near deadline',
        ],
        'Dependency view', [
            'Sorts components by whether their upstream gate is open',
            'Treats a waiting component as correctly waiting',
            'Starts unblocked work now, whatever its deadline',
            'Concentrates pressure on the few components holding closed gates',
        ]),

    # ── SECTION 6 ──────────────────────────────────────────────────────────────
    h2('s6h1', 'Run It on Your Own Portfolio'),
    blk('s6p1',
        "The platform's Portfolio Sequencing Test takes either Vermont's register or yours. Start a blank "
        'register, enter your components with their pillar and status, and decide for each one whether its '
        'implementation genuinely depends on the upstream pillar — the "gated" flag. Then set how much of each '
        "pillar's enabling work is actually delivered. The tool uses the same dependency engine as the HTR "
        'Simulator and the Friction Index, so a gate opens at the same threshold everywhere on the platform.'),
    blk('s6p2',
        'Expect the first run to be uncomfortable. Most organizations find components with no owner, '
        'components running ahead of gates nobody had named, and at least one piece of unblocked work that '
        'has been parked because its deadline felt distant. The value is not the verdicts themselves but the '
        'conversation they force: who has the authority to act on them, and is that authority real?'),
    blk('s6p3',
        'A useful test of whether the review is working comes from the book\'s advice to legislators and board '
        'members. Ask one question: which component is currently the binding constraint on all the others, who '
        'owns it, and what would it take to accelerate it? An organization running a genuine portfolio answers '
        'in a sentence. An organization running a list answers with a status summary of everything — which is '
        'itself the finding.'),
    analogy('s6an1',
        'A kitchen does not start plating the main course because the dinner reservation is at eight; it '
        'starts when the sauce it depends on is ready. A good expediter watches what each dish is waiting on, '
        'not the clock on the wall — and moves cooks to whatever is holding everything else up.',
        'Scheduling by dependency rather than by deadline'),
    steps('s6st1', 'Your first sequencing review', [
        ('Load your register', 'Open /portfolio-sequencing-test, choose "Start my own register," and enter '
         'each component with its pillar, status, and calendar target.'),
        ('Set the gates honestly', "Score each pillar's delivered enabling work. A declared milestone is not "
         'delivered work.'),
        ('Mark what truly depends on a gate', 'Uncheck "gated" only for design work and for components that '
         'produce value on their own.'),
        ('Read step 3 first', 'The pressure-point list is where resources should move this quarter.'),
        ('Act on the late list', 'Every component that is late by dependency order should have a start date '
         'and an owner by the next review.'),
    ]),

    # ── SUMMARY ────────────────────────────────────────────────────────────────
    takeaway('tw', [
        "A portfolio register — every component with a pillar, an owner, a type, a status, and a target — is "
        "a portfolio office's first deliverable, and it needs no software to build.",
        "The sequencing test's verdicts change the conversation: a component behind a closed gate is correctly "
        'waiting, not behind schedule.',
        'Only implementation waits for a gate; design work and care-model work that produces value on its own '
        'should run now (book Chapter 1).',
        'In Vermont, Fall 2026, the test puts schedule pressure on the four unfinished Technology components '
        'and flags the AHS PMO itself as late by dependency order.',
        'HealthCare.gov and Cover Oregon both lacked a single party owning integration; the federal site '
        'recovered within two months once one was in place, and Oregon moved to HealthCare.gov.',
        "The risk register and the sequencing test should point at the same place; when they disagree, one "
        'of them is wrong.',
        'A moderate risk score is not a licence to wait: social-risk adjustment scores 12 but has no upstream '
        'blocker and should already be running.',
    ]),
    quiz('qz',
        'In the Vermont, Fall 2026 run of the sequencing test, the statewide AI-governance framework has a '
        'FY2028 adoption target and has not started. Its Technology gate is open. What does the test conclude?',
        [
            ('It is correctly waiting, because its deadline is two years away', False),
            ('It is late by dependency order, because nothing upstream is holding it', True),
            ('It is running ahead of its gate', False),
            ('It cannot be assessed until the Economics gate opens', False),
        ],
        'The test never uses the calendar target to decide a verdict. A component whose upstream gate is open '
        'and that is not running is late by dependency order, however distant its deadline — the same logic '
        'that flags the AHS PMO itself. "Correctly waiting" applies only when the upstream gate is closed.'),

    h2('src', 'Sources'),
    blk('src1', '[1] HHS Office of Inspector General, "HealthCare.gov: Case Study of CMS Management of the '
        'Federal Marketplace," OEI-06-14-00350, February 2016 — '
        'https://oig.hhs.gov/reports/all/2016/healthcaregov-case-study-of-cms-management-of-the-federal-marketplace '
        '— absence of clear leadership; no formal systems integrator; QSSI hired; recovery within 2 months.'),
    blk('src2', '[2] PCWorld, "Reforms promised, officials removed following audit of troubled Obamacare site '
        'built by Oracle," March 21, 2014 — '
        'https://www.pcworld.com/article/2110880/reforms-promised-officials-removed-following-audit-of-troubled-obamacare-site-built-by-oracle.html '
        '— First Data review: commissioned by Gov. Kitzhaber, 67 interviews, 3,200+ documents, '
        'time-and-materials contract, the systems-integrator quote.'),
    blk('src3', '[3] Commonwealth Fund, "Oregon Votes to Switch Enrollment to Federal Health Insurance '
        'Exchange," April 2014 — '
        'https://www.commonwealthfund.org/publications/newsletter-article/oregon-votes-switch-enrollment-federal-health-insurance-exchange '
        '— the board vote to move to HealthCare.gov.'),
    blk('src4', '[4] Health Transformation Review, Transforming American Healthcare, Chapter 15 (Figures '
        '15.3, 15.6 and §15.7) and Chapter 1 (§1.11.2, Figure 1.8) — /read/chapter-15 — the 19-component '
        'register, risk scores, the sequencing test, Economics-as-design, and Clinical work in parallel.'),
    blk('src5', '[5] Vermont Agency of Human Services, Act 68 Health Care System Transformation Report, '
        'March 2026 — '
        'https://healthcarereform.vermont.gov/sites/hcr/files/documents/Mar%202026_Act%2068%20HC%20System%20Transformation%20Report%20from%20AHS.pdf '
        '— analytics contract for regional planning under negotiation.'),
    blk('src6', '[6] VTDigger, "Amid health insurance affordability crisis, most Vermont hospitals seek moderate '
        'budget changes at annual hearings," August 14, 2025 — '
        'https://vtdigger.org/2025/08/14/amid-health-insurance-affordability-crisis-most-vermont-hospitals-seek-moderate-budget-changes-at-annual-hearings/ '
        '— "The fiscal year for hospitals in the state begins Oct 1."'),
    blk('src7', '[7] Project Management Institute, The Standard for Portfolio Management, 4th ed. (2017) — '
        'https://www.pmi.org/pmbok-guide-standards/foundational/standard-for-portfolio-management — '
        'portfolio definition as the foundational portfolio-management act.'),
]

if __name__ == '__main__':
    import sys
    words = sum(len(b['children'][0]['text'].split()) for b in body
                if b.get('_type') == 'block' and b.get('style') == 'normal' and not b['_key'].startswith('src'))
    print(f'{len(body)} blocks, {sum(1 for b in body if b.get("_type")=="block" and b.get("style")=="h2")} h2, ~{words} prose words')
    keys = [b['_key'] for b in body]
    assert len(keys) == len(set(keys)), 'duplicate _key'
    if '--post' in sys.argv:
        post(LESSON_SLUG, LESSON_TITLE, body)
