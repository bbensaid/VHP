"""
Builds frontend/content/course_transformation_leadership.json

The "Transformation Leadership" Academy course — the platform-side build that
makes Chapter 12's HTR Academy claim real (see
memory/project_tool_extension_queue... and the 2026-09-22 build brief).

One track, six lessons. Grounded in:
  - Kotter's eight-step change framework (named in the book, Ch12 §12.10 /
    §12.4.1) — John Kotter, "Leading Change" (HBS Press, 1996)
  - PMO / portfolio governance and benefits realization (book Ch15)
  - Stakeholder / governing-board management under mandatory payment reform
  - Managing organizational resistance in a fixed-revenue-envelope transition
    (global budgets, Ch1/Ch6 material)

Rich lesson BODY content (the 20+ Sanity block "rich" bar) is written
separately in frontend/content/_lessons_transformation_leadership.py using
CONTENT_TEMPLATE.py's helpers and posted straight to Sanity. What lives here
is the Supabase-side structure and the simple content_blocks fallback that
renders even before/without the Sanity body (matches
components/course/ContentBlockRenderer.tsx's actual supported block shapes:
text / key_stat / callout, with correct field names — `source` not `context`,
`heading` not `title`, variant one of info|tip|warning|success).

Run:  python3 _build_transformation_leadership_course.py
Then: node ../scripts/seed-transformation-leadership-course.mjs
"""

import json
from pathlib import Path

COURSE = {
    "id": "course_transformation_leadership_v1",
    "slug": "transformation-leadership",
    "title": "Transformation Leadership",
    "subtitle": "Change Management, Portfolio Governance, and Stakeholder Leadership for Mandatory Payment Reform",
    "description": (
        "A practitioner course in leading healthcare payment and delivery transformation once the "
        "analysis is done and the mandate is real: applying Kotter's eight-step change framework to "
        "a statutory reform timeline, building the PMO and portfolio governance that makes a multi-year "
        "transformation executable, managing governing boards and stakeholders who did not choose the "
        "reform, and handling the organizational resistance a fixed-revenue-envelope transition "
        "predictably produces. Grounded throughout in named, sourced transformation case studies — "
        "Maryland's HSCRC global budgets, Oregon's Coordinated Care Organizations, the Massachusetts "
        "Alternative Quality Contract, the VA's 1990s VISN restructuring, CMS's mandatory bundled-payment "
        "models, and the NHS's National Programme for IT as the field's most-studied governance failure."
    ),
    "targetAudience": [
        "Hospital and health-system executives leading transformation planning under a statutory deadline",
        "State health agency and regulatory officials (AHS-, GMCB-, HSCRC-type roles) managing a transformation portfolio",
        "Healthcare PMO staff, program managers, and portfolio managers new to the sector",
        "Academy learners who completed \"Five Pillars, One Imperative\" and want the execution/leadership layer",
    ],
    "prerequisites": [],
    "estimatedHours": 5,
    "isPublished": False,
    "version": "1.0.0",
    "createdAt": "2026-09-22T00:00:00Z",
    "updatedAt": "2026-09-22T00:00:00Z",
    # courses table columns not present in the five-pillars builder but present
    # in every other seeded course — set to match sibling courses.
    "pillar": "operations",
    "level": "advanced",
    "chapterRef": "12",
    "isFeatured": False,
}

TRACK = {
    "id": "track_tl_core",
    "slug": "leading-mandatory-transformation",
    "title": "Leading Mandatory Transformation",
    "description": (
        "Change leadership, portfolio governance, stakeholder management, and resistance management for "
        "healthcare organizations executing transformation under a fixed statutory timeline."
    ),
    "pillar": "operations",
    "order": 1,
    "icon": "🧭",
    "targetAudience": COURSE["targetAudience"],
    "isPublished": True,
}


def obj(prefix, texts):
    return [{"id": f"obj_{prefix}{i}", "text": t} for i, t in enumerate(texts, 1)]


def q_opts(prefix, opts):
    # opts: list of (text, isCorrect, explanation_or_None)
    out = []
    for i, (t, correct, expl) in enumerate(opts, 1):
        o = {"id": f"o_{prefix}{i}", "text": t, "isCorrect": correct}
        if expl:
            o["explanation"] = expl
        out.append(o)
    return out


def quiz(qid, question, explanation, options, points=1, passing=75):
    return {
        "id": f"quiz_{qid}",
        "passingScore": passing,
        "shuffleOptions": True,
        "questions": [
            {
                "id": f"q_{qid}",
                "type": "single_choice",
                "points": points,
                "question": question,
                "explanation": explanation,
                "options": q_opts(qid, options),
            }
        ],
    }


def text_block(body, heading=None):
    b = {"type": "text", "body": body}
    if heading:
        b["heading"] = heading
    return b


def key_stat_block(stats, heading=None):
    b = {
        "type": "key_stat",
        "stats": [{"value": v, "label": l, "source": s} for (v, l, s) in stats],
    }
    if heading:
        b["heading"] = heading
    return b


def callout_block(body, variant="info", heading=None):
    b = {"type": "callout", "variant": variant, "body": body}
    if heading:
        b["heading"] = heading
    return b


LESSONS = [
    {
        "id": "lesson_tl_01",
        "trackId": TRACK["id"],
        "pillar": "operations",
        "order": 1,
        "slug": "tl-why-change-management-matters",
        "title": "Why Change Management Determines Transformation Success",
        "summary": (
            "The evidence base for healthcare payment reform is usually adequate. What fails is the "
            "organizational change process. This lesson frames the course: why analytically sound "
            "transformations still fail, what makes healthcare's change problem specifically harder "
            "than a corporate one, and what a statutory deadline changes about the whole exercise."
        ),
        "estimatedMinutes": 22,
        "isPublished": True,
        "tags": ["change-management", "transformation-leadership", "PMO", "project-management"],
        "objectives": obj("tl1", [
            "Explain why healthcare transformation more often fails from change-management gaps than analytical ones",
            "State the PMI evidence on the cost of poor project performance and what a PMO changes about it",
            "Identify at least three structural features that make healthcare change harder to lead than a typical corporate change program",
        ]),
        "content_blocks": [
            text_block(
                "Healthcare transformation programs rarely fail because the underlying analysis was wrong. "
                "The financial case for value-based payment, the clinical case for care coordination, and "
                "the equity case for closing measured disparities are each well evidenced. What fails, far "
                "more often, is the organizational change process: the sequencing, pacing, and management "
                "of the human and institutional change that structural reform actually requires.",
                heading="The Execution Gap",
            ),
            key_stat_block(
                [
                    ("$135M", "Lost per $1B in failed projects", "PMI, Pulse of the Profession — unrecoverable loss on failed initiatives"),
                    ("38%", "More projects on time/budget", "PMI — organizations with a PMO vs. those without one"),
                    ("67%", "More projects fail outright", "PMI — organizations that treat project management as non-strategic"),
                ],
                heading="The Cost of Skipping This",
            ),
            callout_block(
                "Change management, project management, and portfolio management are related but distinct: "
                "project management delivers a defined scope on schedule and budget; program management "
                "coordinates related projects for benefits no single project could produce alone; portfolio "
                "management aligns the whole collection with strategy. Change management is the layer "
                "underneath all three — the discipline of managing how people and institutions actually "
                "adopt the new state.",
                heading="Definitions That Matter",
            ),
        ],
        "quiz": quiz(
            "tl1",
            "According to PMI's Pulse of the Profession research, what happens to organizations that treat "
            "project management as a non-strategic function?",
            "PMI's research found these organizations report 67% more of their projects failing outright — "
            "treating execution discipline as optional carries a measurable, large penalty.",
            [
                ("They see no measurable difference in outcomes", False, "The research found a large, measurable penalty."),
                ("They report 67% more project failures", True, None),
                ("They save money by avoiding PMO overhead", False, "PMO organizations complete 38% more projects on time and budget — the opposite conclusion."),
                ("They complete projects faster on average", False, "The finding is about failure rate, not speed."),
            ],
        ),
    },
    {
        "id": "lesson_tl_02",
        "trackId": TRACK["id"],
        "pillar": "operations",
        "order": 2,
        "slug": "tl-kotters-eight-steps",
        "title": "Kotter's Eight-Step Framework Applied to Mandatory Payment Reform",
        "summary": (
            "John Kotter's eight-step change model, developed for corporate transformation, applies to "
            "healthcare with real modification. This lesson works through all eight steps against "
            "mandatory reform conditions, using a Vermont-style statutory transformation and two "
            "independently published healthcare applications of the model as evidence."
        ),
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["kotter", "change-management", "transformation-leadership"],
        "objectives": obj("tl2", [
            "List Kotter's eight steps in order and state what each requires in a healthcare-specific context",
            "Explain why Step 8 (institutionalization) is the step most healthcare change efforts skip",
            "Apply the framework's diagnostic questions to assess an organization's own change readiness",
        ]),
        "content_blocks": [
            text_block(
                "John Kotter published his eight-step change model in \"Leading Change\" (Harvard Business "
                "School Press, 1996) after studying more than 100 corporate transformation efforts. The "
                "model has since been applied, tested, and published on in healthcare settings ranging from "
                "a single ICU's hand-hygiene program to a rural Kentucky health center's care-gap closure "
                "initiative — evidence this lesson uses directly rather than treating the framework as "
                "theoretical.",
                heading="A Corporate Model With a Healthcare Track Record",
            ),
            text_block(
                "Mandatory reform changes what several of the eight steps mean in practice. Step 1, create "
                "urgency, is not a persuasion exercise when a legislature has already set a deadline — the "
                "urgency exists whether or not leadership manufactures it, and the analytical task shifts to "
                "presenting it in terms that produce organizational action rather than paralysis or denial. "
                "Step 2, form a guiding coalition, is where healthcare-specific risk concentrates: a coalition "
                "of administrative and financial leadership without clinical leadership will produce a plan "
                "that clinical staff can quietly refuse to implement, regardless of how legally binding the "
                "mandate is."
            ),
            callout_block(
                "Steps 1–8: create urgency, form a guiding coalition, develop a vision, communicate the vision, "
                "remove obstacles, create short-term wins, sustain acceleration, institute the change in "
                "culture and systems.",
                heading="Kotter's Eight Steps",
            ),
        ],
        "quiz": quiz(
            "tl2",
            "A 41-month ICU quality-improvement study found Kotter's model raised hand-hygiene compliance "
            "from 35.71% to 87.75%. Which step is this result most directly evidence for?",
            "Sustained, multi-year compliance gains — not a one-time spike — are what Step 8 (instituting "
            "the change in culture and systems) is meant to produce; the 41-month duration is the point.",
            [
                ("Step 1: create urgency", False, "Urgency explains why the program started, not why it lasted 41 months."),
                ("Step 8: institute the change in culture and systems", True, None),
                ("Step 3: develop a vision", False, "A vision explains the target, not the sustained result."),
                ("Step 5: remove obstacles", False, "Obstacle removal is a mid-process step, not what a 41-month durability result demonstrates."),
            ],
        ),
    },
    {
        "id": "lesson_tl_03",
        "trackId": TRACK["id"],
        "pillar": "operations",
        "order": 3,
        "slug": "tl-building-the-pmo",
        "title": "Building the PMO: Portfolio Governance for a Multi-Year Transformation",
        "summary": (
            "PMI's project/program/portfolio hierarchy gives transformation leaders a precise vocabulary "
            "for a problem healthcare usually manages informally. This lesson contrasts a large-scale "
            "health-system portfolio restructuring that worked (the VA's 1990s VISN reorganization) with "
            "one that collapsed under its own governance design (the NHS's National Programme for IT), "
            "then walks through what a transformation PMO actually needs to do."
        ),
        "estimatedMinutes": 26,
        "isPublished": True,
        "tags": ["PMO", "portfolio-management", "governance", "transformation-leadership"],
        "objectives": obj("tl3", [
            "Distinguish project, program, and portfolio management using PMI's own hierarchy",
            "Identify the specific governance failure that made the NHS's NPfIT a canonical failure case",
            "Identify the specific structural choices that made the VA's VISN restructuring a durable success",
        ]),
        "content_blocks": [
            text_block(
                "PMI draws a hierarchy that healthcare transformation programs rarely observe explicitly: "
                "projects produce a defined deliverable; programs coordinate related projects to produce "
                "benefits no single project could deliver alone; portfolios align the whole collection with "
                "organizational strategy. Most healthcare systems run their transformation agenda as a flat "
                "list of initiatives with no portfolio layer — which means no one is positioned to see that "
                "two initiatives are competing for the same analysts, or that a delay in one silently "
                "invalidates the timeline of another.",
                heading="Getting the Levels Right",
            ),
            key_stat_block(
                [
                    ("$2T", "Wasted annually worldwide", "PMI, Pulse of the Profession — roughly 11.4% of every dollar invested lost to poor project performance"),
                    ("38%", "More on-time/on-budget delivery", "PMI — organizations with an established PMO"),
                ],
                heading="What a PMO Is Worth",
            ),
            callout_block(
                "The VA's Veterans Health Administration reorganized into 22 geographic Veterans Integrated "
                "Service Networks (VISNs) between 1995 and 1999 under Director Kenneth Kizer, decentralizing "
                "authority while holding networks accountable for management, care coordination, quality, and "
                "resource allocation. The result is widely cited as having produced measurably better VA care "
                "quality — a rare example of a government health system transformation that stuck.",
                heading="What Worked: The VA's VISN Restructuring",
            ),
        ],
        "quiz": quiz(
            "tl3",
            "The NHS's National Programme for IT (NPfIT), which cost the UK government more than £10 billion "
            "before being dismantled in 2011, is most often cited as a failure of which specific kind?",
            "Multiple independent reviews, including the National Audit Office, found NPfIT's governance "
            "separated central decision-making from the local organizations responsible for implementation — "
            "a structural governance failure, not primarily a technology failure.",
            [
                ("The underlying software technology did not work", False, "Reviews point to governance and stakeholder engagement, not core technology, as the primary failure."),
                ("Centralized decision-making was separated from operational accountability", True, None),
                ("The program was too small in scope to matter", False, "It was one of the largest civilian IT programs in the world at the time."),
                ("Clinicians were over-consulted in the design process", False, "Reviews found the opposite: insufficient clinician engagement."),
            ],
        ),
    },
    {
        "id": "lesson_tl_04",
        "trackId": TRACK["id"],
        "pillar": "operations",
        "order": 4,
        "slug": "tl-stakeholder-board-management",
        "title": "Stakeholder and Governing Board Management Under Mandatory Payment Reform",
        "summary": (
            "Governing boards under mandatory reform are being asked to accept a transformation they did "
            "not choose. This lesson draws on three governance designs — Maryland's global budget "
            "conversion, Oregon's community-governed Coordinated Care Organizations, and the co-designed "
            "Massachusetts Alternative Quality Contract — to build a stakeholder-management framework."
        ),
        "estimatedMinutes": 24,
        "isPublished": True,
        "tags": ["governance", "stakeholder-management", "boards", "transformation-leadership"],
        "objectives": obj("tl4", [
            "Explain why hospital governing boards under mandatory reform need different management than boards asked to approve a discretionary initiative",
            "Describe the governance design choices Maryland, Oregon, and Massachusetts made to build stakeholder buy-in",
            "Build a stakeholder engagement plan that gives clinical leadership a genuine coalition seat",
        ]),
        "content_blocks": [
            text_block(
                "A hospital governing board asked to approve a discretionary strategic initiative can simply "
                "decline. A board operating under a mandatory payment reform — an independent regulator has "
                "already set the rate methodology, a legislature has already set the deadline — is instead "
                "being asked to accept a transformation it did not choose and cannot stop. That distinction "
                "changes what board management has to accomplish: not persuasion toward a yes/no decision, "
                "but education and engagement toward effective implementation of a decision already made "
                "elsewhere.",
                heading="A Different Kind of Board Problem",
            ),
            callout_block(
                "Maryland's conversion of its hospitals to global budgets in 2014 was described by health "
                "care leaders studied afterward as \"a monumental change, a sea change, in the way that "
                "hospitals thought about raising revenue.\" The themes leaders cited as necessary to manage "
                "that shift: setting achievable expectations, protecting hospital autonomy, close "
                "communication between stakeholders, actionable data, carefully calibrated budgets, and a "
                "shared commitment to change.",
                heading="Maryland: Naming the Sea Change",
            ),
            text_block(
                "Oregon took a different governance path for its Medicaid Coordinated Care Organizations: "
                "each CCO is governed by a required partnership of providers, community members, and other "
                "stakeholders who share the financial risk, and each must maintain a Community Advisory "
                "Committee that produces a Community Health Assessment and Community Health Improvement Plan. "
                "Massachusetts took a third path for its Alternative Quality Contract: Blue Cross Blue Shield "
                "of Massachusetts tested the global-budget contract concept directly with hospital and "
                "physician leaders, policy experts, and employers before launch, engaging payment, quality "
                "measurement, public engagement, legislation, governance, and IT as linked levers rather than "
                "a payment change alone. The contract now covers more than 80% of the BCBS Massachusetts "
                "network."
            ),
        ],
        "quiz": quiz(
            "tl4",
            "What structural feature is common to both Oregon's Coordinated Care Organizations and the "
            "Massachusetts Alternative Quality Contract, despite their different designs?",
            "Both built formal mechanisms for non-payer stakeholders — community members in Oregon, "
            "physician and hospital leaders in Massachusetts — to shape the reform's design before or "
            "during rollout, rather than only receiving it after the fact.",
            [
                ("Both eliminated financial risk for providers", False, "Both models put providers at financial risk under a budget."),
                ("Both built formal stakeholder input into the design or governance process", True, None),
                ("Both were implemented without any pilot testing", False, "Massachusetts explicitly tested the concept with leaders before launch."),
                ("Both are federal CMS models", False, "Oregon's CCOs are a state Medicaid program design; the AQC is a private commercial payer contract."),
            ],
        ),
    },
    {
        "id": "lesson_tl_05",
        "trackId": TRACK["id"],
        "pillar": "operations",
        "order": 5,
        "slug": "tl-managing-resistance-global-budgets",
        "title": "Managing Organizational Resistance in a Fixed-Revenue-Envelope Transition",
        "summary": (
            "Global budgets and mandatory bundled payments trigger a specific, predictable kind of "
            "resistance: departments and hospitals optimize around the new boundary instead of accepting "
            "the intended incentive. This lesson uses CMS's mandatory joint-replacement bundle as direct "
            "evidence and builds a playbook for managing resistance before it produces boundary-gaming."
        ),
        "estimatedMinutes": 24,
        "isPublished": True,
        "tags": ["resistance-management", "global-budgets", "bundled-payments", "transformation-leadership"],
        "objectives": obj("tl5", [
            "Explain why a fixed-revenue-envelope reform produces more organizational resistance than a volume-based incentive change",
            "Describe the documented boundary-gaming behavior hospitals showed under CMS's mandatory CJR bundle",
            "Apply a resistance-management playbook that names zero-sum trade-offs explicitly instead of concealing them",
        ]),
        "content_blocks": [
            text_block(
                "A payment reform that adds a bonus on top of existing fee-for-service revenue asks an "
                "organization to do something extra for more money. A global budget or mandatory bundle asks "
                "an organization to accept that growing volume no longer grows revenue at all — a zero-sum "
                "reframing of every department's incentive to do more. That difference is why fixed-revenue "
                "reforms produce resistance patterns that milder value-based arrangements do not: the "
                "threat is not hypothetical or marginal, it is structural and immediate.",
                heading="Why This Reform Type Is Different",
            ),
            callout_block(
                "CMS's Comprehensive Care for Joint Replacement (CJR) model made a 90-day bundled payment "
                "mandatory for lower-extremity joint replacement in selected metropolitan areas starting "
                "April 2016. Research found that in the mandatory areas, hospitals responded by treating "
                "healthier patients on average and by shifting more knee replacements into the inpatient "
                "setting — which the bundle covered — when the same procedure performed outpatient, which the "
                "bundle did not cover, would have cost less. Once CMS made participation voluntary for some "
                "hospitals and made outpatient total knee replacement nationally billable outside the bundle, "
                "the measured savings from CJR were no longer statistically significant by the fourth year.",
                heading="Boundary-Gaming: CMS's Mandatory Bundle",
            ),
            text_block(
                "The CJR pattern is not evidence that hospitals act in bad faith; it is evidence that "
                "organizations rationally respond to whatever boundary a reform draws, and a fixed-revenue "
                "or fixed-bundle boundary will be optimized around unless the organization design "
                "anticipates it. The same logic applies to global budgets: a hospital under a fixed annual "
                "revenue cap has a rational incentive to reclassify, re-time, or re-site services in ways "
                "that preserve revenue without technically violating the budget's terms — which is why "
                "monitoring for boundary behavior has to be built into the transformation from the start, "
                "not added after the first year's data reveals it."
            ),
        ],
        "quiz": quiz(
            "tl5",
            "What happened to CMS's measured savings from the mandatory CJR bundled-payment model after "
            "outpatient total knee replacement was made nationally billable outside the bundle?",
            "Once outpatient TKA was excluded from the bundle nationally and some hospitals' participation "
            "became voluntary, the boundary-gaming incentive weakened and CJR's savings were no longer "
            "statistically significant by the fourth performance year — direct evidence that the earlier "
            "savings were partly an artifact of the mandatory boundary itself.",
            [
                ("Savings increased further", False, "The opposite occurred — measured savings shrank."),
                ("Savings were no longer statistically significant by year four", True, None),
                ("The model was cancelled immediately", False, "CMS reduced its mandatory geographic scope rather than cancelling it outright."),
                ("Hospital participation became mandatory nationwide", False, "CMS moved toward voluntary participation for some hospitals, not full national mandate."),
            ],
        ),
    },
    {
        "id": "lesson_tl_06",
        "trackId": TRACK["id"],
        "pillar": "operations",
        "order": 6,
        "slug": "tl-sustaining-change-benefits-realization",
        "title": "Sustaining the Change: Benefits Realization and Avoiding Reform Fatigue",
        "summary": (
            "Most transformation programs achieve visible early wins and then stall once leadership "
            "attention moves elsewhere. This closing lesson uses PMI's benefits realization management "
            "discipline, Maryland's five-decade regulatory durability, and CMS's CPC+ learning-collaborative "
            "infrastructure to show what sustaining a transformation actually requires — set against NPfIT "
            "as the counter-example of what happens when no sustainment infrastructure exists."
        ),
        "estimatedMinutes": 24,
        "isPublished": True,
        "tags": ["benefits-realization", "sustainability", "PMO", "transformation-leadership"],
        "objectives": obj("tl6", [
            "Define benefits realization management and its three core elements per PMI's standard",
            "Explain what made Maryland's global-budget model durable across five decades of course correction",
            "Design a sustainment plan that keeps reporting and review running after a transformation's launch phase ends",
        ]),
        "content_blocks": [
            text_block(
                "Kotter's eighth step — institute the change in culture and systems — is the step most "
                "transformation efforts skip, not because it is theoretically obscure but because it has no "
                "natural end point to celebrate. Steps 1 through 7 all have a visible event: a launch, an "
                "early win, an acceleration. Institutionalization is the absence of an event — the new "
                "behavior simply continuing to be normal five, ten, twenty years after the program that "
                "created it stopped being anyone's active project.",
                heading="The Step With No Finish Line",
            ),
            key_stat_block(
                [
                    ("1971", "Maryland's rate-setting authority created", "Maryland General Assembly — the HSCRC's founding statute"),
                    ("2014", "Global budgets extended to all acute hospitals", "CMS/CMMI + HSCRC — the All-Payer Model"),
                    ("2019", "Extended to Total Cost of Care", "Maryland TCOC Model — added non-hospital spending incentives"),
                ],
                heading="Five Decades of Course Correction, Not Collapse",
            ),
            callout_block(
                "PMI's benefits realization management standard defines three core elements: identify the "
                "benefits a program is meant to produce, execute the changes needed to produce them, and "
                "sustain those benefits after the program formally ends. The third element is the one most "
                "transformation plans never budget for — and it is the exact element the NHS's National "
                "Audit Office found missing from NPfIT, concluding that lessons from the failure were not "
                "being systematically captured even by the government's later digital programs.",
                heading="PMI's Three-Part Discipline",
            ),
        ],
        "quiz": quiz(
            "tl6",
            "Per PMI's benefits realization management standard, what is the third of the three core "
            "elements — the one this lesson identifies as most often missing from transformation plans?",
            "Identify and execute are the two elements most transformation plans do carry out; sustain — "
            "keeping the benefit in place and monitored after the program formally closes — is the element "
            "most often skipped, which is exactly the gap the NHS's own National Audit Office identified.",
            [
                ("Identify the benefits", False, "Most transformation plans do this part — they define a target benefit up front."),
                ("Execute the changes needed to produce the benefits", False, "Most plans reach execution; the gap comes after."),
                ("Sustain the benefits after the program ends", True, None),
                ("Market the benefits externally", False, "Not one of PMI's three defined elements."),
            ],
        ),
    },
]

course_out = dict(COURSE)
course_out["tracks"] = [dict(TRACK, lessons=LESSONS)]

out_path = Path(__file__).parent / "course_transformation_leadership.json"
out_path.write_text(json.dumps(course_out, indent=2))
print(f"Wrote {out_path} — {len(LESSONS)} lessons in 1 track.")
