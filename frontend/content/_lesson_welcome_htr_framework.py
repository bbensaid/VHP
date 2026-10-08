exec(open('CONTENT_TEMPLATE.py').read())

# Welcome & the HTR Framework: the standalone orientation lesson
# (Supabase course `welcome-htr-framework`, track `welcome`, lesson slug `welcome-htr-framework`).
# Run from the repo root:  python3 frontend/content/_lesson_welcome_htr_framework.py [--commit]
# Every figure is taken from the book's Preface and Introduction (HTR_Book_v42), which carry their
# own sourcing (Oliver Wyman Act 167 analysis, GMCB, RAND, Vermont Department of Health).
# Platform routes named here were checked against frontend/app/ on 2026-10-07.

import sys

LESSON_SLUG = 'welcome-htr-framework'
LESSON_TITLE = 'Welcome & the HTR Framework'

body = [
    # ── Opening ────────────────────────────────────────────────────────────────
    blk('intro1', "Health Transformation Review (HTR) is built around one argument: healthcare transformation fails when it addresses any single part of the system in isolation. Payment reform without clinical redesign produces savings that evaporate when care models do not change. Clinical quality improvement without payment reform produces better care that the financial system immediately discourages. Technology investment without operational readiness produces platforms no one uses. Equity goals without structural investment produce aspirations without outcomes."),
    blk('intro2', "This orientation gives you the map that the rest of HTR uses: the five pillars, the Equity Imperative that tests each of them, the order in which they have to be built, and the way the book, the platform and the Academy fit together. It takes about fifteen minutes. Every later course assumes the vocabulary introduced here."),

    # ── Section 1: Why HTR exists ──────────────────────────────────────────────
    h2('s1h1', 'Why HTR Exists: A Room in Vermont, September 2024'),
    blk('s1p1', "On September 18, 2024, the Green Mountain Care Board (GMCB) convened a public meeting at which Oliver Wyman presented a year-long, $1 million statewide hospital systems analysis commissioned under Act 167 of 2022. The engagement behind it had run more than 230 meetings across all 14 of Vermont's Hospital Service Areas, with over 3,100 participants from more than 100 organizations. The people in the room had come because they suspected what was about to be confirmed."),
    blk('s1p2', "The findings were stark. Nine of Vermont's fourteen hospitals were already reporting operating losses, and thirteen of fourteen would be in the red by 2028 if current trends continued. The cumulative five-year system deficit ranged from $700 million to $2.4 billion. The average silver exchange premium had risen 108% between 2018 and 2024, while median household income grew 22% between 2018 and 2022. The working-age population that funds the commercial cross-subsidy keeping rural hospitals open was projected to fall 13% by 2040, as the over-65 share of the state climbed toward 30%."),
    blk('s1p3', "That room is the origin of HTR. Not because Vermont is uniquely troubled, but because it is early: early in its demographic aging, early in its hospital financial fragility, and early in its willingness to mandate structural change in statute (Acts 167, 51 and 68) rather than wait for voluntary reform to work."),
    blk('s1p4', "Price was part of the story. The University of Vermont Medical Center, with roughly half of the state's hospital market, was charging commercial payers about 358% of Medicare rates, RAND's published figure for inpatient and outpatient services drawn from 2018 to 2020 claims. Statewide, Vermont hospitals charge commercial payers 250% to 300% of Medicare on average. Those prices flow directly into the premiums Vermont families pay."),
    stat_grid('s1sg1', [
        ('9 of 14', 'Vermont hospitals already losing money (2024)', 'Source: Oliver Wyman Act 167 analysis, presented to the GMCB September 18, 2024 (HTR book, Introduction)'),
        ('13 of 14', 'Projected in operating losses by 2028 absent structural change', 'Source: Oliver Wyman Act 167 analysis (HTR book, Introduction)'),
        ('+108%', 'Average silver exchange premium, 2018 to 2024 ($456 to $948/month)', 'Source: Oliver Wyman / GMCB (HTR book, Introduction)'),
        ('$0.7B to $2.4B', 'Cumulative five-year system deficit range', 'Source: Oliver Wyman Act 167 analysis (HTR book, Preface)'),
    ]),
    highlight('s1hl1', "Vermont is not an outlier. It is a preview. The forces behind its crisis (an aging population eroding the commercial cross-subsidy, voluntary payment reform that never reached a tipping point, pricing opacity that lets dominant hospitals charge several times Medicare) are national. Vermont simply meets them first."),

    # ── Section 2: What transformation means ───────────────────────────────────
    h2('s2h1', 'What "Transformation" Means Here'),
    blk('s2p1', "Few words in healthcare are used more loosely than reform and transformation. HTR uses transformation in a precise sense: structural change that alters the fundamental incentives, relationships and capabilities of a system, producing different behaviors and different outcomes rather than incremental improvement within the existing structure."),
    blk('s2p2', "By that definition, much of what has been called transformation over the past fifteen years does not qualify. A voluntary ACO program that high-cost providers can decline to join is not transformation. Electronic health record adoption that digitizes paper processes without changing care delivery is not transformation. Quality reporting that never touches payment is not transformation."),
    blk('s2p3', "What does qualify looks like what Vermont is attempting: mandatory reference-based pricing that removes the ability of dominant hospitals to charge commercial payers three to four times Medicare; statutory hospital global budgets that change every hospital's incentive from maximizing volume to managing population health; a Statewide Health Care Delivery Strategic Plan with specific, measurable commitments; and Rural Health Transformation Program capital to build the community infrastructure that payment reform needs."),
    compare('s2cmp1', 'Improvement vs. Transformation',
        'Incremental improvement', [
            'Voluntary programs that high-cost providers can decline',
            'Shared savings for utilization reductions that would have happened anyway',
            'Digitizing paper processes without changing care',
            'Quality reports that never affect payment',
        ],
        'Structural transformation', [
            'Mandatory participation set in statute',
            'Global budgets that remove the volume incentive',
            'Reference-based pricing that caps commercial price multiples',
            'Capital for the community capacity payment reform depends on',
        ]),

    # ── Section 3: The five pillars ────────────────────────────────────────────
    h2('s3h1', 'The Five Pillars and Their Diagnostic Questions'),
    blk('s3p1', "HTR's central framework divides any transformation effort into five pillars: Policy, Technology, Economics, Clinical and Operations. They are not a checklist of good things to do. They are an integrated architecture for seeing why reforms underperform when one pillar is missing or disconnected from the others."),
    blk('s3p2', "Each pillar is defined by a single diagnostic question. An honest no to any one of them puts the whole transformation at risk, however confidently the other four answer yes. When you read a reform proposal, a hospital plan or a vendor pitch, these five questions are the fastest way to find where it will break."),
    table('s3t1', 'The Five Pillars at a Glance', [
        {'Pillar': 'Policy', 'Diagnostic_Question': 'Is it permissible?', 'What_It_Delivers': 'Authority: the mandate, statute or regulation that makes the change required rather than optional'},
        {'Pillar': 'Technology', 'Diagnostic_Question': 'Is it possible?', 'What_It_Delivers': 'Information: the data infrastructure that makes performance visible and measurable'},
        {'Pillar': 'Economics', 'Diagnostic_Question': 'Is it sustainable?', 'What_It_Delivers': 'Incentives: payment that rewards the intended behavior instead of volume'},
        {'Pillar': 'Clinical', 'Diagnostic_Question': 'Is it effective?', 'What_It_Delivers': 'Outcomes: care models that actually improve health under the new incentives'},
        {'Pillar': 'Operations', 'Diagnostic_Question': 'Is it executable?', 'What_It_Delivers': 'Capacity: the workforce, governance and management systems that carry it out'},
    ]),
    callout('s3c1', "The pillars are not independent. A decision about data architecture (Technology) determines what a payment model can measure (Economics), which determines whether a care redesign is rewarded (Clinical), which depends on whether the workforce exists to deliver it (Operations), all inside what the law permits (Policy). Always think across pillars."),

    # ── Section 4: The Equity Imperative ───────────────────────────────────────
    h2('s4h1', 'The Equity Imperative: A Test, Not a Sixth Pillar'),
    blk('s4p1', "There is a sixth question, and it is deliberately not a sixth pillar: is it just? This is the Equity Imperative, a single justice test that each of the five pillars must pass on its own terms. The distinction is structural. A sixth pillar could be sequenced last, funded separately or treated as an adjunct. An imperative has none of those escape hatches, because each pillar's deliverable carries an equity condition it must satisfy."),
    blk('s4p2', "The reason it matters is that a reform can improve the average while widening the gap. Vermont's primary care access rate is roughly 91%, four points above the national benchmark. Yet that aggregate conceals an 11-point gap between white and BIPOC Vermont adults, visible only when the data is stratified by race and ethnicity (Vermont Department of Health, Health Equity Data Report). A reform that passes every other test can still fail this one."),
    blk('s4p3', "Each chapter of the book applies this test to its own pillar, and Chapter 10 applies it in depth across all five. In the Academy, the Equity Imperative has its own track in Five Pillars, One Imperative, placed after the five pillar tracks because it is the test applied to each of them, not a stage in the sequence."),
    steps('s4st1', 'Applying the Equity Imperative to Each Pillar', [
        ('Policy', 'Does the mandate close disparities or widen them?'),
        ('Technology', 'Does the data make disparities visible, or bury them in averages?'),
        ('Economics', 'Do the incentives reward serving the hardest-to-reach populations, or penalize it?'),
        ('Clinical', 'Effective, but effective for whom?'),
        ('Operations', 'Executable everywhere, including in rural and under-resourced settings?'),
    ]),
    warning('s4w1', "Don't confuse an average with equity", "An improving statewide average is not evidence that a reform is just. Ask for the stratified numbers (by race and ethnicity, income, geography and disability) before accepting any claim that a program works."),

    # ── Section 5: Sequence ────────────────────────────────────────────────────
    h2('s5h1', 'Why Order Matters: The Execution Sequence'),
    blk('s5p1', "The five pillars are listed in the order transformation has to be built: Policy, then Technology, then Economics, then Clinical, then Operations. The order is set by dependency, not by importance. Payment reform cannot be measured or trusted without the data infrastructure that comes before it, and clinical redesign cannot be sustained until the incentives it depends on are in place."),
    blk('s5p2', "Vermont's own history is the worked example. Its All-Payer ACO Model (2017 to 2025) relied on voluntary participation and, by the book's account, produced modest results. Acts 167 and 68 made participation in global budgets and reference-based pricing mandatory, so the reform no longer depends on any federal model: when Vermont withdrew from the CMS AHEAD Model in July 2026, the state framework stayed fully in force. Chapter 1 of the book develops the dependency logic in full; the Five Pillars, One Imperative course teaches it lesson by lesson."),
    analogy('s5an1', "Building a house: you cannot hang drywall before the framing is up, and you cannot frame before the foundation has cured. Nobody argues that the foundation is more important than the roof. It simply has to come first, because everything above it bears on it.", 'Dependency-driven execution sequence'),
    quote('s5q1', "The five pillars must move together, which means the people responsible for each pillar must understand all the others."),

    # ── Section 6: The ecosystem ───────────────────────────────────────────────
    h2('s6h1', 'How HTR Works: The Book, the Platform and the Academy'),
    blk('s6p1', "HTR is one ecosystem in three parts. The book is the intellectual foundation: the framework, the dependency logic, the Vermont evidence and the national comparisons, readable online with audio narration at /book. The platform turns the book's arguments into working tools: five pillar hubs, a Research Lab of interactive analytical tools at /research-lab, a fifty-state dashboard at /dashboard, and an AI Analyst at /chat grounded in the book and Vermont's public source documents."),
    blk('s6p2', "The Academy is the hands-on layer. Five Pillars, One Imperative is the book's companion course: eight tracks that follow the book's own sequence, from Foundations through each pillar, the Equity Imperative and Sustaining the Transformation, at /academy/tracks/five-pillars-one-imperative. The connections run in every direction: each book chapter ends with a guide to the platform tools and Academy lessons that apply it, and the tools carry From the Book callouts pointing back to the chapters that explain them."),
    example('s6ex1', 'Running a claim instead of just reading it', "Say the book argues that a state cannot move to global budgets before its data infrastructure is ready. You can test that claim rather than take it on trust: model a state's readiness in the HTR Simulator (/htr-simulator), benchmark it on the fifty-state dashboard (/dashboard), and ask the AI Analyst (/chat) which chapter and lesson cover the gap it finds.\nThis is the pattern HTR is designed around: the book makes the argument, the platform lets you run it against your own state or organization, and the Academy teaches the method."),

    # ── Section 7: Where to start ──────────────────────────────────────────────
    h2('s7h1', 'Where to Go Next, by Role'),
    blk('s7p1', "HTR rewards a path calibrated to your role rather than a linear march through everything. If you want the platform to tailor what it shows you first, declare your role at /academy/getting-started. Otherwise, the starting points below follow the book's own reader profiles."),
    blk('s7p2', "Whatever your role, take the Foundations track of Five Pillars, One Imperative next. It turns this orientation's map into the working tools (the dependency matrix, the diagnostic questions and the OneCare sequencing autopsy) that every later lesson uses."),
    table('s7t1', 'Recommended Starting Points', [
        {'Role': 'Policy professional', 'On_the_Platform': 'HTR Simulator, fifty-state dashboard, Policy & Quality Sciences bench (/research-lab/policy-quality)', 'In_the_Academy': 'Five Pillars, One Imperative, Track 2: Policy, Establish the Mandate'},
        {'Role': 'Executive or administrator', 'On_the_Platform': 'Payment Models & VBC bench (/research-lab/payment-models)', 'In_the_Academy': 'Five Pillars, One Imperative, Track 4: Economics, Put Incentives on a Visible System'},
        {'Role': 'Vermont practitioner', 'On_the_Platform': 'Act 167, Act 68 and AHEAD pages; Vermont hospital dashboard (/dashboard/vermont/hospitals)', 'In_the_Academy': 'Track 2 (Policy) and Track 6 (Operations, Close the Execution Gap)'},
        {'Role': 'Student or researcher', 'On_the_Platform': 'The full Research Lab as a sandbox for reproducing the book\'s analyses', 'In_the_Academy': 'Start at /academy/getting-started, then the whole course in order'},
    ]),

    # ── End of lesson ──────────────────────────────────────────────────────────
    takeaway('tw', [
        "HTR exists because Vermont's 2024 Act 167 findings showed a hospital system heading for structural failure, and Vermont is a preview of forces every state faces.",
        "Transformation means structural change to incentives, relationships and capabilities, not incremental improvement inside the existing system.",
        "The five pillars are Policy, Technology, Economics, Clinical and Operations, each defined by one diagnostic question: permissible, possible, sustainable, effective, executable.",
        "Equity is not a sixth pillar; the Equity Imperative (is it just?) is a test each of the five pillars must pass on its own terms.",
        "An improving average can hide a widening gap: Vermont's 91% primary care access rate conceals an 11-point white–BIPOC gap.",
        "The pillars are built in dependency order, Policy through Operations, because each one bears on what comes before it.",
        "The book makes the argument, the platform lets you run it, and the Academy's Five Pillars, One Imperative course teaches it, starting with the Foundations track.",
    ]),
    quiz('qz',
        "Why does HTR treat equity as the Equity Imperative rather than as a sixth pillar?",
        [
            ("Because equity is less important than the five operational pillars", False),
            ("Because a separate pillar could be sequenced last or funded separately, whereas an imperative is a test every pillar's deliverable must pass", True),
            ("Because equity is already fully measured by statewide averages", False),
            ("Because only the Clinical pillar affects who benefits from reform", False),
        ],
        "A sixth pillar would compete with the others for budget and attention and could be pushed to the end of the sequence. Making equity an imperative attaches an equity condition to each pillar's own deliverable, so a reform that improves the average while widening a gap fails the test."
    ),

    h2('src', 'Sources'),
    blk('src1', "[1] Health Transformation Review, Transforming Healthcare (HTR book), Preface and Introduction — https://healthtransformationreview.org/book — Act 167 findings, RAND price figures, definition of transformation, five pillars and diagnostic questions, Equity Imperative, primary care access gap, the HTR ecosystem and reader profiles"),
    blk('src2', "[2] Oliver Wyman, Act 167 Community Engagement: Executive Summary Report (revised October 21, 2024) — https://gmcboard.vermont.gov/sites/gmcb/files/documents/Act%20167%20Community%20Engagement_OW%20Exec%20Summary%20Report%20-%20revised%2010.21.2024.pdf — hospital losses, deficit range, engagement scale"),
    blk('src3', "[3] Green Mountain Care Board, Hospital Sustainability (Act 167) — https://gmcboard.vermont.gov/hospitalsustainability — the Act 167 process and the September 2024 presentation"),
    blk('src4', "[4] Act 167 of 2022, as enacted — https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf — the diagnostic mandate and its five goals"),
    blk('src5', "[5] Act 68 of 2025, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — mandatory hospital global budgets and reference-based pricing"),
    blk('src6', "[6] Centers for Medicare & Medicaid Services, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — the federal model Vermont signed in January 2025 and withdrew from in July 2026"),
]

if __name__ == '__main__':
    print('blocks:', len(body))
    words = sum(len(b['children'][0]['text'].split()) for b in body if b.get('_type') == 'block' and b.get('style') == 'normal')
    print('prose words (normal blocks):', words)
    keys = [b['_key'] for b in body]
    assert len(keys) == len(set(keys)), 'duplicate _key'
    if '--commit' in sys.argv:
        post(LESSON_SLUG, LESSON_TITLE, body)
