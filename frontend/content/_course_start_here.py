exec(open('CONTENT_TEMPLATE.py').read())

# Start Here — the orientation course that replaces the single-lesson `welcome-htr-framework`
# course (author's decision, 2026-10-26). Lesson 1 is the existing 47-block "Welcome & the HTR
# Framework" lesson, unchanged. This file adds lessons 2-5.
#
# Run from the repo root:  python3 frontend/content/_course_start_here.py [--commit]
#
# Every platform claim below was checked against the code on 2026-10-27:
#   /read/[slug]/page.tsx (sidebar: In this chapter, ChapterNotes, Platform companion, Listen to
#   this chapter -> /book/listen, Download full book PDF); BookmarkChapterButton -> /saved;
#   ToolBookCallout ("From the Book"); lib/framework/sequence-engine.ts (gate thresholds 70/40,
#   PRESETS — the figures quoted were produced by running runSequence on each preset);
#   SequenceSimulator.tsx labels; FrictionScorer.tsx; InvestmentSequencingCheck.tsx;
#   lib/taxonomy/tools.ts (35 Research Lab tools; every ?tab= link quoted is registered there);
#   app/chat/page.tsx (role cards, Sources citations, export .txt, Change my role);
#   backend/services/auth.py require_subscriber (Subscriber plan or higher);
#   backend/routers/chat.py pipeline docstring; app/welcome/page.tsx role labels.
# Course catalogue figures (hours, levels) are the live Supabase `courses` rows, 2026-10-27.
# Book claims quote HTR_Book_v42 (Appendix F, Appendix H, Chapter 1, Chapter 7).

import sys

COURSE = 'welcome-htr-framework'

BOOK = "[1] Health Transformation Review, Transforming Healthcare (HTR book v42) — https://healthtransformationreview.org/book"

# ════════════════════════════════════════════════════════════════════════════
# LESSON 2 — Reading the Book With the Platform Open
# ════════════════════════════════════════════════════════════════════════════
L2_SLUG = 'start-here-reading-the-book'
L2_TITLE = 'Reading the Book With the Platform Open'
L2 = [
    blk('intro1', "Transforming Healthcare was written to be read with the platform open beside it. The book makes an argument: that healthcare transformation fails when any one part of the system is changed in isolation, and that the five pillars have to be built in a specific order. The platform lets you test that argument against real data and your own organization. Read on their own, each is half of the design."),
    blk('intro2', "This lesson shows you how the two connect. You will learn the two ways to read the book on the platform, what the reader's sidebar does, how to use the section that closes every chapter, and a simple four-step routine (read, run, ask, learn) that turns a chapter into practice. It takes about twenty minutes, and at the end you will have worked through one chapter the way the book intends."),
    blk('intro3', "A word on why this matters. Most readers of policy books never act on them, not because the arguments fail to persuade, but because the step from agreeing with an argument to applying it is left to the reader. The platform closes that step. Each chapter's argument has at least one tool that lets you test it, and the book tells you which one."),

    h2('s1h1', 'Two Ways In: The Web Reader and the PDF'),
    blk('s1p1', "The book's home on the platform is /book. From there you can open any section in the web reader, which lives at /read followed by the section's name: /read/preface, /read/introduction, and /read/chapter-01 through /read/chapter-16. The web reader is typeset directly from the manuscript, so its text, figures and tables are the book's own, not a summary."),
    blk('s1p2', "Every reader page also offers the alternatives. In the sidebar, Listen to this chapter opens the audio player at /book/listen on that chapter, and Download full book PDF gives you the complete book as a single file for offline reading, printing or annotation in your own software. Use the web reader when you want to move between the book and the tools; use the PDF when you want the book as a continuous document."),
    blk('s1p3', 'Both forms carry the same text. The web reader is generated from the same manuscript file the PDF is exported from, so a correction made to the book appears in both. If you have an older PDF saved from an earlier visit, download it again before quoting from it; the web reader is always the current text.'),
    callout('s1c1', "The web reader is the better choice whenever you plan to act on what you read. Its sidebar puts the chapter's platform tools one click away, and a link from the book to a tool is only useful if you can follow it without losing your place."),
    table('s1t1', 'Where the book lives on the platform', [
        {'What': 'Book home and chapter list', 'Where': '/book'},
        {'What': 'Web reader, one section per page', 'Where': '/read/preface, /read/introduction, /read/chapter-01 … /read/chapter-16'},
        {'What': 'Audio narration', 'Where': '/book/listen (or Listen to this chapter in the reader sidebar)'},
        {'What': 'Full book as one file', 'Where': 'Download full book PDF, in the reader sidebar'},
        {'What': 'Your saved chapters', 'Where': '/saved'},
    ]),

    h2('s2h1', "The Reader's Sidebar: Contents, Notes, Bookmarks and the Platform Companion"),
    blk('s2p1', "The sidebar on each reader page carries four tools. In this chapter lists the chapter's sections, so you can jump straight to the one you need; chapters run long, and the contents list is the fastest way to find, say, the OneCare autopsy in Chapter 1. Below it is a private notes panel: once you are signed in, you can attach notes to the chapter, and only you can see them. The bookmark button saves the chapter to /saved, where it sits alongside anything else you have saved on the platform."),
    blk('s2p2', "The fourth panel, Platform companion, is the bridge to the rest of HTR. It lists the tools and pages that apply this chapter, drawn from the same chapter registry the rest of the platform uses, so the list stays in step with the book. When a chapter argues a point you want to test, the Platform companion is where you find the tool that tests it."),
    blk('s2p3', "The sidebar is also where you can tell how a chapter is organized before you read it. A chapter whose contents list ends with Work This Chapter on the Platform, Implications for You and Key Concepts in This Chapter, as every chapter's does, is telling you that the argument comes first and the application comes last. Skim the contents, read the argument, and then spend as much time on the closing sections as on the argument itself."),
    highlight('s2hl1', "Notes are private to your account and need you to be signed in. A note written while signed out is not saved; sign in first if you intend to annotate."),
    steps('s2st1', 'Set up a chapter for active reading', [
        ("Open the chapter", "Open /read/chapter-01 and sign in."),
        ("Jump to your section", "Use In this chapter to jump to the section you are working on."),
        ("Bookmark it", "Bookmark the chapter so it appears in /saved."),
        ("Write your question", "Add a note with the question you want the chapter to answer for your organization."),
        ("Open the companion tool", "Open the first tool in Platform companion in a new tab, so the book and the tool sit side by side."),
    ]),

    h2('s3h1', 'The Section That Closes Every Chapter'),
    blk('s3p1', "Every chapter ends the same way, and the ending is where reading turns into work. Work This Chapter on the Platform is a table: each row states a task the chapter has prepared you for, names the platform tool that performs it, and says what the tool will show you. Implications for You translates the chapter's argument into consequences for different readers. Key Concepts in This Chapter collects the vocabulary, and a Sources paragraph lists the evidence."),
    blk('s3p2', "Each chapter also names its Academy companion in a paragraph that begins In the Academy, pointing to the specific track and lessons that teach the chapter's method, and to the full courses that go deeper. Chapter 8, for example, points to Track 5 of Five Pillars, One Imperative and to the Behavioral Health Integration and Population Health Management courses."),
    blk('s3p3', 'The four closing sections serve different readers. Implications for You is written for decision-makers who need to know what to do differently on Monday. Key Concepts in This Chapter is for anyone who needs to explain the chapter to a colleague. The Sources paragraph is for anyone who needs to check a claim. Work This Chapter on the Platform is for everyone, because it is where the reading becomes practice.'),
    example('s3ex1', 'One row from Chapter 7', "Chapter 7's Work This Chapter on the Platform table includes this task: track the capital committed against each pillar and find where funding runs ahead of dependency order. The tool it names is the Investment Tracker (/investment-tracker), and the row explains why it matters: money moving faster than the sequence is the early signal of premature investment.\nOpen the Investment Tracker and you will find exactly that check. A Sequencing check panel sums the disclosed value of the deals on the page for each pillar and tests it against Vermont's current gate status, labelling each pillar Ahead of sequence or In sequence. A second panel does the same for initiatives you enter yourself."),
    warning('s3w1', "Do not skip the closing section", "Readers who stop at the end of a chapter's argument miss the part designed for them to use. The Work This Chapter on the Platform table is not a list of further reading; each row is an exercise with a stated purpose and a named tool."),

    h2('s4h1', 'From the Book: Links That Run Both Ways'),
    blk('s4p1', "The connection between the book and the platform runs in both directions. The book's closing sections send you to the tools; the tools send you back to the book. Research Lab tool pages carry a From the Book link that names the chapters each tool implements and opens them in the web reader. Those links are generated from the platform's tool registry and chapter list rather than written by hand, so when a chapter is renumbered or retitled, every link follows."),
    blk('s4p2', "This matters most when you arrive at a tool first, from a search, a colleague's link or the Research Lab hub, and a result surprises you. The From the Book link takes you to the chapter that explains the logic behind the tool's output, so you can tell whether the surprise is a finding or a misread input."),
    blk('s4p3', "Treat a disagreement between the book and a tool as information. If a chapter says a pillar should be the bottleneck and the tool, with your inputs, names a different one, either your inputs differ from the book's case in a way worth understanding, or one of them is wrong. Both outcomes are useful, and the From the Book link is the fastest way to find out which."),
    analogy('s4an1', "Think of the book as the textbook and the platform as the laboratory down the hall. The textbook explains why an experiment should come out a certain way; the laboratory lets you run it and see whether it does. A good student keeps a finger in the textbook while running the experiment, and a good laboratory posts the relevant textbook page next to each bench.", "The two-way link between book chapters and platform tools"),
    compare('s4cmp1', 'Two ways to arrive at a tool',
        'From the book', [
            'You know the argument before you see the output',
            'The Work This Chapter row tells you what to look for',
            'Best for testing a specific claim',
        ],
        'From the tool', [
            'You see the output before the argument',
            'The From the Book link explains the logic behind it',
            'Best for checking whether a surprising result is real',
        ]),

    h2('s5h1', 'A Routine for Every Chapter: Read, Run, Ask, Learn'),
    blk('s5p1', "The platform rewards a consistent routine more than heroic sessions. The one below takes a chapter from argument to practice in four moves, and it is the same routine whether you are a hospital executive reading Chapter 7 on financial modeling or a student reading Chapter 2 on legislative architecture."),
    blk('s5p2', "Read the chapter in the web reader, noting in the notes panel the claim that matters most to you. Run the first relevant row of Work This Chapter on the Platform, using your own state or organization where the tool allows it. Ask the AI Analyst at /chat to explain anything in the output you cannot account for, and to point you to the chapter or lesson that covers it. Learn the method properly in the Academy track named in the chapter's In the Academy paragraph."),
    blk('s5p3', "The routine scales. A board member with an hour can read one chapter's Implications for You and run one tool. A policy team can assign one chapter a week, with each member bringing the result of one Work This Chapter row to the meeting. A student can work the whole book this way over a semester. The order stays the same: argument first, then the tool, then the question, then the method."),
    steps('s5st1', 'Read, run, ask, learn', [
        ("Read", "Open the chapter at /read and write your key question in the notes panel."),
        ("Run", "Work the first row of Work This Chapter on the Platform with your own inputs."),
        ("Ask", "Take anything you cannot explain to the AI Analyst at /chat and check the sources it cites."),
        ("Learn", "Complete the Academy track named in the chapter's In the Academy paragraph."),
    ]),
    quote('s5q1', "The book provides the enduring framework; the platform provides the current state of the field within that framework. The two are designed to be used together. (Transforming Healthcare, Appendix F)"),

    takeaway('tw', [
        "The book is on the platform in two forms: the web reader at /read for working sessions, and the full-book PDF for continuous reading.",
        "The reader sidebar gives each chapter a contents list, private notes, a bookmark that saves to /saved, and a Platform companion list of tools.",
        "Every chapter closes with Work This Chapter on the Platform, Implications for You, Key Concepts in This Chapter and Sources.",
        "Each row of Work This Chapter on the Platform is an exercise: a task, the tool that performs it, and what the tool will show.",
        "Each chapter's In the Academy paragraph names the track and lessons that teach its method.",
        "Research Lab tools carry From the Book links back to the chapters they implement, generated from the platform's registry so they stay current.",
        "The routine that works is read, run, ask, learn: one chapter, one tool, one question, one track.",
    ]),
    quiz('qz',
        "You have just finished reading a chapter's argument. Where does the book tell you which platform tool applies it, and what the tool will show?",
        [
            ("In the Key Concepts in This Chapter list", False),
            ("In the Work This Chapter on the Platform table at the end of the chapter", True),
            ("Only in Appendix D, at the back of the book", False),
            ("Nowhere: you have to search the Research Lab yourself", False),
        ],
        "Work This Chapter on the Platform is the table that closes every chapter. Each row pairs a task the chapter prepares you for with the tool that performs it and a description of what the tool will show, so it is the direct route from the argument to practice. The reader sidebar's Platform companion list offers the same tools from inside the chapter."
    ),
    h2('src', 'Sources'),
    blk('src1', BOOK + " — Appendix F (the reader's guide to the platform), the closing sections of every chapter, Chapter 7's Work This Chapter on the Platform table, Chapter 8's In the Academy paragraph"),
    blk('src2', "[2] HTR web reader — https://healthtransformationreview.org/read/chapter-01 — reader sidebar: In this chapter, notes, bookmark, Platform companion, Listen to this chapter, Download full book PDF"),
    blk('src3', "[3] HTR audio narration — https://healthtransformationreview.org/book/listen — per-chapter narration"),
    blk('src4', "[4] HTR Investment Tracker — https://healthtransformationreview.org/investment-tracker — Sequencing check panels (deal feed and your own portfolio)"),
    blk('src5', "[5] HTR Research Lab — https://healthtransformationreview.org/research-lab — From the Book links on tool pages"),
]

# ════════════════════════════════════════════════════════════════════════════
# LESSON 3 — Your First Research Lab Session
# ════════════════════════════════════════════════════════════════════════════
L3_SLUG = 'start-here-first-research-lab-session'
L3_TITLE = 'Your First Research Lab Session: Run the Sequence Yourself'
L3 = [
    blk('intro1', "The book's central claim is that the five pillars must be built in order, Policy, Technology, Economics, Clinical, Operations, because each one depends on the ones before it. A claim like that is easy to agree with and hard to feel. The Research Lab exists so you can feel it: you set the inputs, and the platform shows you what the dependency logic does to them."),
    blk('intro2', "In this lesson you will run the HTR Simulator on the three scenarios it ships with, learn to read its output, see the same logic applied to money in the Investment Tracker and to friction in the Friction Index, and then run a version of your own. Allow thirty minutes and keep /htr-simulator open as you read."),
    blk('intro3', 'You need no data and no account to follow along. The simulator runs entirely in your browser on the scores you enter, and nothing you enter is saved. That makes it a safe place to try extreme settings and see what breaks.'),

    h2('s1h1', 'What the Research Lab Is'),
    blk('s1p1', "The Research Lab is the platform's working environment: 35 interactive tools, grouped into benches that follow the book's structure. The benches are Policy & Quality, Payment Models, Technology & AI, Interoperability, VBC, Clinical & Quality, Population & Equity, and Knowledge & Workspace, each at its own address under /research-lab. The hub at /research-lab lists every tool with a one-line description."),
    blk('s1p2', "Alongside the benches sit three tools that apply the book's framework directly and are the best place to start: the HTR Simulator (/htr-simulator), the Transformation Friction Index (/transformation-friction-index) and the Investment Tracker (/investment-tracker). All three read from the same dependency engine, so they never disagree about which pillar is holding another back."),
    blk('s1p3', 'Start with the framework tools even if your interest is specialist. They take minutes, they show you the dependency logic every other tool assumes, and they tell you which bench to visit next: if the simulator names Technology as your binding constraint, the Interoperability and Technology & AI benches are where the detailed work is.'),
    callout('s1c1', "The Research Lab tools are working environments for modeling and scenario planning, not reference pages. The book's Appendix F describes them that way, and the useful habit follows from it: change an input and watch what moves."),

    h2('s2h1', 'The HTR Simulator: Score Five Pillars, Watch the Sequence'),
    blk('s2p1', "Open /htr-simulator. You set a readiness score from 0 to 100 for each of the five pillars. The simulator then runs those scores through the book's dependency graph. Each pillar can only deliver what its upstream gates allow: if the pillar it depends on is weak, part of the capability you scored is paid for but not delivered. The simulator shows each pillar's score as a ghost bar with the delivered portion drawn solid on top, and states the points lost."),
    blk('s2p2', "A gate's status depends on the delivered strength of the pillar upstream of it. At 70 or above the gate is open; between 40 and 69 it is partial; below 40 it is closed. Because each pillar reads its upstream pillars' delivered values rather than their nominal ones, damage cascades: weak Policy caps Technology, and the capped Technology, not the score you entered, is what Economics is then gated on."),
    blk('s2p3', "The three scenarios are worth loading in order. The first reproduces the profile the book opens with, OneCare Vermont in 2013. The second keeps OneCare's ambition and changes only the order in which it was built. The third is the book's reading of Vermont in the fall of 2026, sourced to Acts 167, 51 and 68 and to the developments of July 2026, when the AHEAD agreement was withdrawn and the Medicaid hospital global budget was halted."),
    table('s2t1', 'The three built-in scenarios, as the simulator scores them', [
        {'Scenario': 'OneCare Vermont (2013)', 'On paper': '47', 'Delivered': '24.3', 'Lost to sequencing': '22.7', 'Binding constraint': 'Technology'},
        {'Scenario': 'The same ambition, in order', 'On paper': '72', 'Delivered': '63.3', 'Lost to sequencing': '8.7', 'Binding constraint': 'Technology'},
        {'Scenario': 'Vermont, Fall 2026', 'On paper': '59', 'Delivered': '42.9', 'Lost to sequencing': '16.1', 'Binding constraint': 'Technology'},
    ]),
    highlight('s2hl1', "In the OneCare scenario, Economics is scored at 85 but delivers about 26.5. The money was real; the data infrastructure it depended on was not. That gap between what was paid for and what was delivered is the book's argument in one number."),

    h2('s3h1', 'Reading the Output'),
    blk('s3p1', "The simulator reports two composites. On paper is the average of the five scores you entered, what the investment looks like in a budget document. Delivered is the average of what each pillar can actually deliver behind its gates. The difference is the readiness lost to building out of order. In the OneCare scenario nearly half the paper value disappears; in the reordered scenario, where only Policy and Technology were raised, the loss falls from 22.7 points to 8.7."),
    blk('s3p2', "Below the composites the simulator names the binding constraint: the pillar whose improvement would lift delivered readiness more than raising any other. In all three built-in scenarios it is Technology. For Vermont in Fall 2026, that matches the book's own reading in Chapter 1, §1.14: the Policy gate is open on state authority, but Technology is only partly built and is still the bottleneck, with Economics staged behind it. Finally, the simulator asks the Equity Imperative's question of each pillar and reports whether the design passes on all five."),
    blk('s3p3', "Each pillar's row also tells you which upstream gate is holding it back and by how much. In the Vermont scenario, Clinical is scored at 65 but delivers about 28, because the Economics pillar it depends on is itself held back by Technology. The row-by-row view is where you see the cascade: one weak pillar early in the sequence shows up as lost capability in every pillar after it."),
    compare('s3cmp1', 'Two numbers that look alike and are not',
        'On paper', [
            'The average of the scores you entered',
            'What a budget or plan claims',
            'Ignores dependency order',
        ],
        'Delivered', [
            'The average of what each pillar can deliver behind its gates',
            'What the system can actually do',
            'Penalizes every pillar built ahead of its gate',
        ]),
    example('s3ex1', 'OneCare, reordered', "The book's Chapter 1 opens with OneCare Vermont, the all-payer ACO that launched with high economic ambition on a voluntary mandate and without integrated real-time data. Load the OneCare Vermont (2013) preset and the simulator reproduces that profile: Economics at 85, Policy at 25, Technology at 20, delivered readiness 24.3.\nNow load The same ambition, in order. The Economics, Clinical and Operations inputs are identical; only Policy (90) and Technology (80) move. Delivered readiness rises to 63.3. Nothing about the payment model changed. The upstream gates opened, and the same spending finally delivered."),

    h2('s4h1', 'The Same Logic, Applied to Money and to Friction'),
    blk('s4p1', "The Investment Tracker (/investment-tracker) applies the dependency engine to capital. Its Sequencing check panel totals the disclosed value of the deals on the page for each pillar and checks each total against Vermont's Fall 2026 gate status, labelling a pillar Ahead of sequence when money is flowing into it behind a gate that is not yet open. A second panel does the same for your own initiatives: enter each one's pillar and committed capital, adjust the pillar scores if your situation differs from Vermont's, and see which initiatives are funded ahead of their upstream gate. Nothing you enter there is stored; it is a worksheet."),
    blk('s4p2', "The Transformation Friction Index (/transformation-friction-index) asks a related question from the other side: where is the friction in a transformation, and what is binding? It scores the inputs it uses, shows whether friction is rising, and reports equity measures separately rather than averaging them into the index, so a worsening gap cannot be hidden by an improving average."),
    blk('s4p3', 'Using the three tools together gives you three views of the same problem. The simulator shows where readiness is lost. The Investment Tracker shows whether money is flowing into the pillars that can use it. The Friction Index shows where the effort is meeting resistance. When all three point at the same pillar, you have found the place to act.'),
    warning('s4w1', "These are reasoning tools, not forecasts", "The simulator and its companions apply the book's dependency logic to the scores you give them. They do not predict a state's budget or a hospital's margin. The value is in the comparison: the same inputs in a different order, or one pillar raised while the others hold still."),

    h2('s5h1', 'Your Turn: A Fifteen-Minute Session'),
    blk('s5p1', "Now run the simulator on a system you know: your state, your hospital, or a program you have studied. You do not need precise numbers. A rough score for each pillar is enough, because the lesson is in what the dependency logic does to your scores, not in the scores themselves."),
    blk('s5p2', "When you are done, write down two things in your own notes: the binding constraint the simulator named, and the single change that recovered the most delivered readiness. Those are the two facts a board, a legislature or a funder most needs to hear, and you now have a way to produce them in minutes."),
    blk('s5p3', 'If you are working with a team, run the session together and score the pillars independently first. Disagreements about the scores are often more revealing than the result: a team that cannot agree whether its data infrastructure is a 40 or a 70 has found the conversation it most needs to have.'),
    steps('s5st1', 'Run your own scenario', [
        ("Start from Vermont", "Open /htr-simulator and load Vermont, Fall 2026 as a starting point."),
        ("Enter your scores", "Move each slider to your own estimate for the system you know."),
        ("Read the result", "Note On paper, Delivered and the binding constraint."),
        ("Raise the constraint", "Raise the binding-constraint pillar by 10 points and note how much Delivered rises."),
        ("Raise a downstream pillar", "Reset, then raise a downstream pillar such as Clinical by the same 10 points and compare."),
        ("Test equity", "Answer the Equity Imperative question for each pillar."),
        ("Check your portfolio", "Open /investment-tracker and enter two or three of your real initiatives in the portfolio check."),
    ]),

    takeaway('tw', [
        "The Research Lab holds 35 working tools on benches that follow the book's pillars, listed at /research-lab.",
        "The HTR Simulator, Friction Index and Investment Tracker all run on the same dependency engine and never disagree about which pillar is binding.",
        "A gate is open at 70 or above, partial from 40 to 69 and closed below 40, measured on the delivered strength of the upstream pillar.",
        "Damage cascades because each pillar is gated on its upstream pillars' delivered values, not the scores entered.",
        "On paper is what a plan claims; Delivered is what the system can do; the gap is readiness lost to sequencing.",
        "In the OneCare preset, raising only Policy and Technology lifts delivered readiness from 24.3 to 63.3 without touching the payment model.",
        "The binding constraint is the pillar whose improvement lifts delivered readiness most; in all three presets, including Vermont in Fall 2026, it is Technology.",
    ]),
    quiz('qz',
        "In the HTR Simulator, you raise Clinical by 10 points and Delivered barely moves; you raise Technology by 10 points and Delivered rises sharply. What does this tell you?",
        [
            ("The simulator weights Technology more heavily than Clinical by design", False),
            ("Technology is the binding constraint: Clinical's capability sits behind gates that Technology holds closed", True),
            ("Clinical investment never matters in healthcare transformation", False),
            ("The Clinical slider is not connected to the model", False),
        ],
        "Each pillar can only deliver what its upstream gates allow, and the gates read the delivered strength of the pillars before them. When Technology is weak it caps Economics, and the capped Economics caps Clinical, so extra Clinical capability is paid for but not delivered. Raising the binding constraint opens the gates for everything downstream, which is why the simulator names it."
    ),
    h2('src', 'Sources'),
    blk('src1', BOOK + " — Chapter 1 (§1.2 The OneCare Failure: A Sequencing Autopsy; §1.12.1 The Critical Path Is Non-Negotiable; §1.14 Vermont's Implementation Timeline) and Appendix F §F.5"),
    blk('src2', "[2] HTR Simulator — https://healthtransformationreview.org/htr-simulator — five-pillar scoring, gate status, On paper vs Delivered, binding constraint, Equity Imperative; the three preset results quoted in this lesson"),
    blk('src3', "[3] HTR Investment Tracker — https://healthtransformationreview.org/investment-tracker — Sequencing check (deal feed) and portfolio check (your initiatives)"),
    blk('src4', "[4] Transformation Friction Index — https://healthtransformationreview.org/transformation-friction-index — friction scoring, trend, equity reported separately"),
    blk('src5', "[5] HTR Research Lab hub — https://healthtransformationreview.org/research-lab — the 35 tools and their benches"),
]

# ════════════════════════════════════════════════════════════════════════════
# LESSON 4 — Getting Good Answers From the AI Analyst
# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'start-here-ai-analyst'
L4_TITLE = 'Getting Good Answers From the AI Analyst'
L4 = [
    blk('intro1', "The AI Analyst at /chat is a research assistant built into the platform. It answers questions about healthcare policy, payment, technology, clinical care and operations, and it shows you the sources it drew on for each answer. Used well, it is the fastest way to get from a question to the right chapter, tool or document. Used carelessly, it is a confident voice you have no reason to trust."),
    blk('intro2', "This lesson covers what the Analyst is and how it finds its answers, how to set it up for your role, how to ask questions that produce useful answers, how to read and check what comes back, and where its limits are. The Analyst is available on Subscriber plans and above; the plans are listed at /pricing."),
    blk('intro3', 'The difference between those two outcomes is mostly in how you ask and how you read. Neither takes long to learn, and both are the same skills you would use with a human research assistant: give a clear brief, and check the work before you rely on it.'),

    h2('s1h1', 'How the Analyst Finds Its Answers'),
    blk('s1p1', "The Analyst does not answer from memory alone. When you send a question, it first rewrites it into a standalone search query, using your earlier messages for context, so that a follow-up such as \"what about Medicaid?\" is searched as a complete question. It then searches the platform's document library using both keyword and meaning-based matching, re-ranks the best matches, and writes its answer from the passages it found."),
    blk('s1p2', "After the answer, it lists those passages as Sources. This is the most important design choice for you as a reader: every answer comes with the evidence it was built from, so you can check it. An answer whose sources do not support it is a signal to rephrase, narrow the question, or go to the document yourself."),
    blk('s1p3', "The document library is broad. It holds federal and state policy documents, research reports, reference works, and the platform's own published analysis, tagged by pillar so the Analyst can tell you which part of the framework each source belongs to. It is not the open internet, and it is not updated the moment a rule changes, which is one more reason to check the date of any source an answer relies on."),
    callout('s1c1', "Retrieval-based means grounded, not infallible. The Analyst answers from the passages it retrieves. If the right document is not in its library, or the question is phrased so the search misses it, the answer will be weaker, and the Sources list is how you will notice."),
    steps('s1st1', 'What happens when you press Enter', [
        ("Rewrite", "Your question is rewritten into a standalone search query, using the conversation so far."),
        ("Search", "The document library is searched by keyword and by meaning."),
        ("Re-rank", "The best matches are re-ranked and the top passages are kept."),
        ("Answer", "The answer is written from those passages and streamed to you."),
        ("Cite", "The passages are listed under the answer as Sources."),
    ]),

    h2('s2h1', 'Set It Up for Your Role'),
    blk('s2p1', "The first time you open /chat you can pick a topic card or type your own question. If you tell the platform your role, at /welcome, the opening screen changes to four starting points chosen for that role, and your role is passed to the Analyst with each question so it can pitch the answer at the right level. The roles offered are Hospital / Health System Executive, Policy Analyst / Government Official, Clinician (MD, NP, PA), Health Economist / Actuary, Health Tech Professional, Medicaid / Compliance Officer, Student / Researcher, and Investor / Consultant."),
    blk('s2p2', "You can change your role at any time with Change my role on the chat screen. If your work spans two roles, pick the one whose questions you ask most often; the role shapes the starting suggestions and the framing of answers, not what the Analyst is allowed to tell you."),
    blk('s2p3', 'The role does not lock you out of anything. A clinician can ask about actuarial methods and an investor about clinical quality measures; the Analyst answers both. What the role changes is the default level and framing, for example whether an answer about a payment model leads with its effect on hospital margins or on patient care.'),
    table('s2t1', 'Chat screen controls', [
        {'Control': 'Tell us your role / Change my role', 'What it does': 'Sets your role (stored on this device) and personalizes starting cards and answer framing'},
        {'Control': 'Sources (under each answer)', 'What it does': 'Lists the passages the answer was built from, with their pillar'},
        {'Control': 'Try it in the HTR Lab', 'What it does': 'Links from an answer to the Research Lab tool that applies it'},
        {'Control': 'Save (Download transcript)', 'What it does': 'Downloads the conversation as a text file'},
        {'Control': 'Clear', 'What it does': 'Deletes the messages from this device'},
    ]),

    h2('s3h1', 'Ask Questions That Produce Useful Answers'),
    blk('s3p1', "The Analyst's search works best on specific questions. Name the state, the program, the year and the decision you are facing. \"How do global budgets work?\" returns a textbook answer. \"What would a hospital global budget under Vermont's Act 68 mean for a critical access hospital's commercial revenue, and which chapter of the book covers it?\" returns an answer anchored in the right documents, with a pointer back into the book."),
    blk('s3p2', "Use follow-ups rather than starting again. Because each question is rewritten with the conversation in mind, you can narrow step by step: ask for the overview, then the evidence, then the counterargument, then the tool that tests it. Ask it to compare two named options rather than to recommend one, and ask which source supports each part of its answer when the Sources list is long."),
    blk('s3p3', "Ask the Analyst to point you onward. It knows the platform's structure, so questions such as which Research Lab tool models this, or which Academy course covers it, usually return a specific link. Its answers can also include a Try it in the HTR Lab link that opens the relevant tool directly. This is often the most valuable thing it does: not answering the question itself, but routing you to the place where you can work it out properly."),
    compare('s3cmp1', 'Weak and strong questions',
        'Weak', [
            '"Tell me about value-based care."',
            '"Is reference-based pricing good?"',
            '"What should my hospital do?"',
        ],
        'Strong', [
            '"What are the MSSP tracks, and which carry downside risk?"',
            '"What happened to commercial prices in states that adopted reference-based pricing, and which chapter covers it?"',
            '"For a 25-bed critical access hospital, which pillar should we fix first, and which Research Lab tool would show it?"',
        ]),
    analogy('s3an1', "Asking the Analyst a vague question is like asking a reference librarian for \"something on healthcare.\" You will get a book, but probably not the one you needed. Tell the librarian what you are trying to decide, and they walk you to the right shelf and open the right page.", "Why specific questions retrieve better sources"),

    h2('s4h1', 'Read the Answer Like an Analyst'),
    blk('s4p1', "Treat every answer as a draft from a well-read colleague. Check that the claims you intend to rely on appear in the listed Sources, that the sources are current enough for the decision (a 2023 rule may have been replaced), and that numbers carry their year and their scope, national or state, Medicare or commercial. Where an answer points to a chapter, open it in the web reader; where it points to a tool, run it."),
    blk('s4p2', "When an answer is useful, save the conversation with the Save button (Download transcript). The text file keeps the question, the answer and the attribution together, which is what you need when you bring the finding to a meeting. When an answer is weak, the fix is usually in the question: narrow it, name the source type you want, or ask what the Analyst does not know."),
    blk('s4p3', 'Be especially careful with three kinds of claim: numbers, dates and legal status. A figure can be right for one year and wrong for the next; a rule can be proposed, finalized, delayed or vacated; a program can be announced and then withdrawn. The Sources list tells you which document a claim came from, and the document tells you its date.'),
    warning('s4w1', "Not professional advice", "The Analyst is a research assistant. Its answers are not legal, financial, actuarial or clinical advice, and they can be wrong or out of date. Verify anything you will act on against the cited source and, where the stakes warrant it, with a qualified professional."),
    highlight('s4hl1', "The habit that matters most: before you repeat a number from the Analyst, find it in a listed source. If you cannot, do not repeat it."),

    h2('s5h1', 'Where the Analyst Fits in Your Routine'),
    blk('s5p1', "The Analyst is the Ask step in the read, run, ask, learn routine from the previous lessons. Its best uses are explaining a Research Lab result you did not expect, finding which chapter or Academy lesson covers a topic, comparing named policies or programs, and drafting a summary of evidence you will then check. Its weakest use is replacing the book's argument or the tool's calculation: it can explain both, but it should not stand in for either."),
    blk('s5p2', "A good test of a session is whether it ended somewhere concrete: a chapter section you will read, a tool you will run with your own inputs, or a source you will cite. If a conversation ends with only the Analyst's own words, ask one more question: which document should I read to confirm this?"),
    blk('s5p3', 'Used this way, the Analyst makes the rest of the platform faster rather than replacing it. Most readers find that their best sessions are short: a few precise questions that end with a chapter section to read and a tool to run, rather than a long conversation that ends with a long answer.'),
    steps('s5st1', 'A ten-minute practice session', [
        ("Set your role", "Set your role at /welcome."),
        ("Ask specifically", "Ask a question about a decision you face, naming the state, program and year."),
        ("Check two sources", "Open two of the listed Sources and confirm they support the answer."),
        ("Follow up", "Ask which chapter of the book covers this, and which tool tests it."),
        ("Open both", "Open the chapter in /read and the tool in the Research Lab."),
        ("Save it", "Save the conversation (Download transcript) for your records."),
    ]),

    takeaway('tw', [
        "The AI Analyst at /chat answers from passages it retrieves from the platform's document library and lists them as Sources under each answer.",
        "Each question is rewritten with the conversation's context before the search, so follow-ups work better than starting over.",
        "Setting your role at /welcome personalizes the starting cards and the framing of answers; Change my role switches it.",
        "Specific questions that name the state, program, year and decision retrieve better sources than general ones.",
        "Check every claim you will rely on against a listed source, and check that the source is current enough for the decision.",
        "Save downloads a conversation as a text file; Clear deletes it from your device.",
        "The Analyst is a research assistant, not professional advice; it explains the book and the tools but does not replace them.",
    ]),
    quiz('qz',
        "The Analyst gives you a precise statistic that would strengthen your board presentation, but none of the listed Sources contains it. What should you do?",
        [
            ("Use it, since the Analyst is grounded in the platform's documents", False),
            ("Do not repeat it until you have found it in a source; ask the Analyst where it comes from or search the documents yourself", True),
            ("Round it so that it is approximately right", False),
            ("Ask the same question again until the number appears in a source", False),
        ],
        "The Sources list is the evidence the answer was built from. A number that does not appear there may come from the model's general knowledge, may be out of date, or may be wrong, and the Analyst's answers are not professional advice. The safe practice is to trace any figure you will rely on to a source you can cite."
    ),
    h2('src', 'Sources'),
    blk('src1', BOOK + " — Appendix F §F.7 (the AI Analyst as a research assistant embedded throughout the platform)"),
    blk('src2', "[2] HTR AI Analyst — https://healthtransformationreview.org/chat — role cards, Sources citations, Try it in the HTR Lab links, Save (Download transcript) and Clear controls"),
    blk('src3', "[3] HTR role setup — https://healthtransformationreview.org/welcome — the eight roles offered"),
    blk('src4', "[4] HTR plans — https://healthtransformationreview.org/pricing — the AI Analyst requires a Subscriber plan or higher"),
]

# ════════════════════════════════════════════════════════════════════════════
# LESSON 5 — Your Learning Path and the Lab Workbook
# ════════════════════════════════════════════════════════════════════════════
L5_SLUG = 'start-here-your-learning-path'
L5_TITLE = 'Your Learning Path and the Lab Workbook'
L5 = [
    blk('intro1', "HTR has more than any one reader needs: a sixteen-chapter book, 35 Research Lab tools and eighteen Academy courses. The way through is a path chosen for your role, not a march through everything. This final Start Here lesson gives you that path, shows you how the Academy can build one for you, and ends with the book's own practicum, the HTR Lab Workbook, which reproduces the book's argument in two to three hours of hands-on modeling."),
    blk('intro2', "By the end you will know which course to take next, how many hours it asks of you, and how to prove to yourself that you understand the framework by running it end to end."),
    blk('intro3', 'Nothing in this lesson requires you to commit to a long program. The paths are suggestions built from the courses that exist today, and every course can be started, paused and resumed; your progress is saved as you go when you are signed in.'),

    h2('s1h1', 'Start With the Backbone Course'),
    blk('s1p1', "Whatever your role, the book's companion course is the backbone: Five Pillars, One Imperative, eight tracks and twenty-four lessons, about ten hours, at /academy/tracks/five-pillars-one-imperative. It follows the book's own sequence: Foundations, then one track for each pillar in build order, then the Equity Imperative, then Sustaining the Transformation, ending with a capstone in which you apply the framework to your own system."),
    blk('s1p2', "You do not have to take it in one sitting, and you do not have to finish it before starting a specialist course. A practical rhythm is one track a week alongside the matching book chapters, with a specialist course added once you know which pillar your work depends on most."),
    blk('s1p3', 'The backbone course is also the best preparation for the specialist ones. Each specialist course goes deep on one field, and the backbone tells you where that field sits in the sequence: which pillars it depends on and which depend on it. A revenue-cycle specialist who knows that Operations is gated on Clinical, and Clinical on Economics, reads a payment-model change very differently from one who does not.'),
    callout('s1c1', "Five Pillars, One Imperative teaches the framework; the specialist courses teach the field each pillar governs. Take the first to learn how the pieces fit, and the second to learn the piece you are responsible for."),

    h2('s2h1', 'Paths by Role'),
    blk('s2p1', "Appendix F of the book sets out reader profiles and the platform areas each should start with. The table below extends those profiles into the Academy, using the courses currently published and their estimated hours. Start with the first course listed for your role, then the second."),
    blk('s2p2', "The hours are the courses' own estimates. Most specialist courses are intermediate level and assume you know the basic vocabulary; the foundational courses, Medicaid 101, Medicare Fundamentals, and Health Equity & SDOH, assume nothing."),
    blk('s2p3', 'If your role is not listed, choose the row whose first course names the pillar you work in, or the pillar you are trying to move. If you are unsure which pillar that is, run the HTR Simulator from the previous lesson on your own organization; the binding constraint it names is usually the right place to start learning.'),
    table('s2t1', 'Recommended courses by role', [
        {'Role': 'Policy professional', 'First': 'Medicaid 101 (10 h, foundational)', 'Then': 'Medicare Fundamentals (8 h), then Medicaid Managed Care Operations (5.5 h)'},
        {'Role': 'Executive or administrator', 'First': 'Value-Based Care (11 h)', 'Then': 'Hospital Finance (6 h), then Transformation Leadership (5 h, advanced)'},
        {'Role': 'Clinician leader', 'First': 'Population Health Management (9 h)', 'Then': 'Clinical Quality Measurement (5.5 h), then Behavioral Health Integration (8 h)'},
        {'Role': 'Health technology professional', 'First': 'Healthcare Interoperability & Data Exchange (9 h)', 'Then': 'AI & Machine Learning in Healthcare (12 h)'},
        {'Role': 'Operations or revenue cycle', 'First': 'Revenue Cycle Management (6.5 h)', 'Then': 'Hospital Finance (6 h)'},
        {'Role': 'Equity or community health', 'First': 'Health Equity & SDOH (10 h, foundational)', 'Then': 'Health Equity Analytics (5 h)'},
        {'Role': 'Vermont practitioner', 'First': 'HIE & Health Reform (8 h)', 'Then': 'Medicaid 101 (10 h), with the Vermont Act 167 and Vermont Medicaid pages'},
        {'Role': 'Student or new to the field', 'First': 'Five Pillars, One Imperative in order (10 h)', 'Then': 'Personalized Learning to choose your specialty'},
    ]),

    h2('s3h1', 'Let the Academy Build a Path for You'),
    blk('s3p1', "If none of the profiles fits, use Personalized Learning at /academy/personalized-learning. It asks about your role, goals, knowledge level and the hours you can give each week, and builds a week-by-week plan from the platform's courses, tools and readings, sized to your time budget. It is the starting point the book recommends for students and for readers new to the field."),
    blk('s3p2', "Two habits make any path stick. Save what you want to come back to, chapters, articles and tools, so it collects in /saved. And keep the Glossary at /academy/glossary open in a tab while you read; the field's vocabulary is the first barrier for newcomers, and the book's Key Concepts lists draw on the same terms."),
    blk('s3p3', "The plan is a starting point, not a contract. Courses outside your plan remain open to you, and you can take items in a different order when your work demands it. What the plan adds is order: it puts foundational material before the material that assumes it."),
    steps('s3st1', 'Build your plan in fifteen minutes', [
        ("Set your role", "Set your role at /welcome."),
        ("Get a plan", "Open /academy/personalized-learning and answer the questions honestly, especially the hours per week."),
        ("Enroll", "Start Five Pillars, One Imperative and the first course for your role."),
        ("Bookmark the chapters", "Bookmark the book chapters your first course is anchored to."),
        ("Schedule it", "Put one weekly session in your calendar for the next four weeks."),
    ]),
    highlight('s3hl1', "A path that fits your week beats an ambitious one you abandon. Two lessons a week, every week, finishes the backbone course in about three months."),

    h2('s4h1', 'The HTR Lab Workbook: The Book in Your Own Hands'),
    blk('s4p1', "Appendix H of the book is a practicum. It takes a single hospital through the platform's tools in the book's execution order, Policy, Technology, Economics, Clinical, Operations, with the Equity Imperative tested along the way. Use a real organization if you have the data, or the fictional Green Mountain Community Hospital, a 25-bed critical access hospital, if you do not. The steps are cumulative: the population you stratify in the Technology stage is the population you budget in the Economics stage and redesign care for in the Clinical stage."),
    blk('s4p2', "Each stage ends with a question you must answer before moving on. Stage 1 asks whether a binding mandate keeps the highest-revenue actors inside the model. Stage 2 asks whether you can see your population in time to act. Stage 3 asks whether the hospital is solvent under a fixed revenue envelope, and which assumptions break it. Stage 4 asks whether the redesigned care model pays for itself under that budget. Stage 5 asks whether operational capacity is keeping pace with the statutory timeline."),
    blk('s4p3', "Allow two to three hours for the whole Workbook, and do it in one or two sittings rather than spread over weeks; the stages build on each other, and the point is to see the dependency logic operate across them. If you only have time for one stage, do Stage 2, the Technology stage. It is the stage most organizations find hardest, and the book's Vermont case suggests it is where most transformations stall."),
    table('s4t1', 'The Workbook stages and their tools', [
        {'Stage': '1 Policy', 'Tools': 'Policy Simulator (/research-lab/policy-quality?tab=policy)'},
        {'Stage': '2 Technology', 'Tools': 'Risk Stratification Engine (/research-lab/interoperability?tab=risk), FHIR Interoperability Lab (?tab=fhir)'},
        {'Stage': '3 Economics', 'Tools': 'Global Budget Transition Modeler (/research-lab/payment-models?tab=gb-transition), Hospital Financial Stress Test (/research-lab/policy-quality?tab=scorecard)'},
        {'Stage': '4 Clinical', 'Tools': 'Risk Stratification Methodology (/research-lab/vbc-clinical-quality?tab=risk), VBC Quality Measures (?tab=quality)'},
        {'Stage': 'Equity', 'Tools': 'Health Equity Studio (/research-lab/population-equity?tab=equity)'},
        {'Stage': '5 Operations', 'Tools': 'Transformation Scorecard (/research-lab/knowledge-workspace?tab=scorecard), Workforce Modeler (?tab=workforce)'},
    ]),
    example('s4ex1', 'The capstone: run the sequence backwards', "The Workbook ends by asking you to break the order deliberately. Keep a strong Economics budget model and a strong Clinical care model, but score Policy as a voluntary model would score it and leave Technology unbuilt, then re-run the Transformation Scorecard. The effective composite collapses, not because the economic or clinical work is weak, but because the platform enforces the same dependency logic that sank OneCare.\nThe book calls that collapse its entire argument, reproduced by your own hand. It is also the clearest evidence you can have that you understand the framework."),

    h2('s5h1', 'What Comes After Start Here'),
    blk('s5p1', "You now have the full orientation: the framework and its sequence from Lesson 1, the book and its platform links from Lesson 2, the dependency engine in your own hands from Lesson 3, the AI Analyst from Lesson 4, and a path from this lesson. The next step is the first track of Five Pillars, One Imperative, Foundations: The Framework, which teaches in depth what Lesson 1 introduced."),
    blk('s5p2', "Come back to this course whenever the platform grows. The paths here are built from the courses published today, and new courses will be added to them as they are released. The method does not change: read the chapter, run the tool, ask the Analyst, learn the track, and test your understanding by running the sequence yourself."),
    blk('s5p3', "If you are responsible for others, consider running the Workbook as a team exercise. Assign one stage to each person, have each bring the answer to their stage's question, and run the capstone together. The disagreements that surface, about whether the mandate binds, whether the data exists, whether the budget holds, are the conversations a real transformation will have to resolve."),
    quote('s5q1', "The point is not any single number. It is to feel the dependency logic of Chapter 1 in your own hands, where a weak upstream pillar makes every downstream model unreliable. (Transforming Healthcare, Appendix H)"),

    takeaway('tw', [
        "Five Pillars, One Imperative (about ten hours, eight tracks) is the backbone course for every role and follows the book's sequence.",
        "Specialist courses teach the field each pillar governs; take one for the pillar your work depends on most.",
        "The role paths extend the book's Appendix F reader profiles into the Academy, using the published courses and their estimated hours.",
        "Personalized Learning builds a week-by-week plan sized to the time you say you have.",
        "Save chapters and tools to /saved and keep the Glossary open while you read.",
        "The HTR Lab Workbook (Appendix H) takes one hospital through the tools in build order, each stage gated by a question you must answer first.",
        "The Workbook's capstone, running the sequence backwards, reproduces the book's whole argument by your own hand.",
    ]),
    quiz('qz',
        "In the Lab Workbook capstone, you keep strong Economics and Clinical models but score Policy as voluntary and leave Technology unbuilt. Why does the Transformation Scorecard's effective composite collapse?",
        [
            ("Because the Economics and Clinical models contain errors", False),
            ("Because the platform enforces the dependency logic: downstream pillars cannot deliver behind closed upstream gates", True),
            ("Because the Scorecard only counts the Policy and Technology pillars", False),
            ("Because voluntary models are always scored as zero", False),
        ],
        "The downstream work is as strong as before; what changed is that its upstream gates are now closed. The Scorecard applies the same dependency logic the book uses to explain OneCare's failure, so capability built ahead of its gates is not delivered. That is why the book calls the collapse its entire argument, reproduced by your own hand."
    ),
    h2('src', 'Sources'),
    blk('src1', BOOK + " — Appendix F §F.4 and §F.8 (the Academy and reader profiles) and Appendix H (the HTR Lab Workbook, stages, questions and capstone)"),
    blk('src2', "[2] HTR Academy course catalogue — https://healthtransformationreview.org/academy/courses — published courses, levels and estimated hours"),
    blk('src3', "[3] Five Pillars, One Imperative — https://healthtransformationreview.org/academy/tracks/five-pillars-one-imperative — the book's companion course"),
    blk('src4', "[4] Personalized Learning — https://healthtransformationreview.org/academy/personalized-learning — role- and time-based learning plans"),
    blk('src5', "[5] HTR Research Lab — https://healthtransformationreview.org/research-lab — the Workbook tools listed above"),
]

LESSONS = [
    (L2_SLUG, L2_TITLE, L2, 2),
    (L3_SLUG, L3_TITLE, L3, 3),
    (L4_SLUG, L4_TITLE, L4, 4),
    (L5_SLUG, L5_TITLE, L5, 5),
]

def _words(body):
    n = 0
    for b in body:
        if b.get('_type') == 'block' and b.get('style') == 'normal':
            n += len(b['children'][0]['text'].split())
    return n

if __name__ == '__main__':
    ok = True
    for slug, title, body, order in LESSONS:
        keys = [b['_key'] for b in body]
        h2s = sum(1 for b in body if b.get('style') == 'h2') - 1
        srcs = sum(1 for b in body if b['_key'].startswith('src') and b['_key'] != 'src')
        dup = len(keys) != len(set(keys))
        print(f"{slug}: blocks={len(body)} sections={h2s} prose_words={_words(body)} sources={srcs} dup_keys={dup}")
        ok &= (not dup) and len(body) >= 20 and h2s >= 5 and srcs >= 4
    if not ok:
        raise SystemExit('quality bar not met')
    if '--commit' in sys.argv:
        for slug, title, body, order in LESSONS:
            post(slug, title, body, course_slug=COURSE, order=order)
