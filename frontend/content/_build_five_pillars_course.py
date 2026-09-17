#!/usr/bin/env python3
"""
_build_five_pillars_course.py — assembles course_five_pillars.json from the
COURSE metadata + TRACKS + LESSONS_BY_TRACK defined below.

Rebuilds the whole file deterministically every run (safe to re-run; never
hand-edit course_five_pillars.json directly — edit this script and rerun).
Not a Sanity/Supabase writer — this only produces the local JSON artifact
for review, matching the schema seed-onboarding-course-only.mjs expects.
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE / "course_five_pillars.json"

COURSE = {
    "id": "course_five_pillars_v1",
    "slug": "five-pillars-one-imperative",
    "title": "Five Pillars, One Imperative",
    "subtitle": "The Framework and Execution Sequence for Healthcare Transformation",
    "description": (
        "The book's own framework, taught the way it's argued: five interdependent "
        "pillars — Policy, Technology, Economics, Clinical, Operations — built in a "
        "load-bearing sequence, each held to a single cross-cutting Equity Imperative. "
        "Built on Vermont's Act 167/Act 68 transformation and the OneCare Vermont "
        "failure as the worked case throughout."
    ),
    "targetAudience": [
        "Readers of Transforming Healthcare who want to work the framework hands-on",
        "State health officials and hospital executives designing transformation strategy",
        "Academy learners who completed onboarding and want the book's core argument",
    ],
    "prerequisites": [],
    "estimatedHours": 10,
    "isPublished": False,
    "version": "1.0.0-draft",
    "createdAt": "2026-09-07T00:00:00Z",
    "updatedAt": "2026-09-07T00:00:00Z",
}

TRACKS_META = [
    dict(id="track_5p_foundations", pillar="general", order=1,
         slug="foundations-the-framework", title="Foundations: The Framework",
         description="Why single-pillar reform fails, what the five pillars are, how the Equity Imperative applies to all of them, and how dependency logic sets the build order — using OneCare Vermont's collapse as the diagnostic case.",
         icon="compass", targetAudience=["All learners"]),
    dict(id="track_5p_policy", pillar="policy", order=2,
         slug="policy-establish-the-mandate", title="Policy — Establish the Mandate",
         description="Why mandatory architecture beats voluntary ambition, and how Vermont's reform cascade (Act 167 → Act 51 → Act 68) plus the federal CMMI/waiver landscape set the terms every other pillar operates under.",
         icon="scale", targetAudience=["State officials", "Policy analysts"]),
    dict(id="track_5p_technology", pillar="technology", order=3,
         slug="technology-build-the-substrate", title="Technology — Build the Substrate",
         description="Why data infrastructure is the gate every downstream pillar waits on, and what FHIR interoperability and AI governance require in practice.",
         icon="database", targetAudience=["Health IT leaders", "Analytics teams"]),
    dict(id="track_5p_economics", pillar="economics", order=4,
         slug="economics-visible-incentives", title="Economics — Put Incentives on a Visible System",
         description="Global budgets, reference-based pricing, and APM financial modeling — and the distinction between designing a payment model and being able to manage one.",
         icon="scale-balance", targetAudience=["CFOs", "Payer strategy teams"]),
    dict(id="track_5p_clinical", pillar="clinical", order=5,
         slug="clinical-redesign-on-incentives", title="Clinical — Redesign Care on Aligned Incentives",
         description="How payment incentives translate into care-model redesign, and the quality-measurement mechanics (HEDIS, HCC) that make the redesign visible.",
         icon="stethoscope", targetAudience=["Clinical leaders", "Quality officers"]),
    dict(id="track_5p_operations", pillar="operations", order=6,
         slug="operations-close-the-gap", title="Operations — Close the Execution Gap",
         description="Regionalizing a 14-hospital system and confronting the workforce constraint that determines whether any of the other four pillars' plans survive contact with delivery.",
         icon="gears", targetAudience=["Hospital operations leaders", "Program managers"]),
    dict(id="track_5p_equity", pillar="equity", order=7,
         slug="the-equity-imperative", title="The Equity Imperative",
         description="Why the target is the gap, not the average — and the measurement tools (HEROI, stratified HEDIS, VBC safeguards) that make disparities visible instead of averaging them away.",
         icon="scale-equity", targetAudience=["Equity officers", "Population health teams"]),
    dict(id="track_5p_sustain", pillar="general", order=8,
         slug="sustaining-the-transformation", title="Sustaining the Transformation",
         description="Running the whole framework as a portfolio, protecting it across election cycles, and applying it to your own system — the capstone.",
         icon="flag", targetAudience=["Executive sponsors", "PMO leaders"]),
]

# Populated lesson by lesson. Each list item is a full lesson dict matching
# the schema in course_value_based_care.json (objectives/contentBlocks/quiz).
FOUNDATIONS = [
    {
        "id": "lesson_5p_single_pillar",
        "trackId": "track_5p_foundations",
        "pillar": "general",
        "order": 1,
        "slug": "why-single-pillar-thinking-fails",
        "title": "Why Single-Pillar Thinking Fails",
        "summary": "Fifteen years of federal payment and delivery reform show the same pattern: interventions that touch only one part of the system run into constraints created by the parts they ignore. This lesson builds the case for treating transformation as a system problem.",
        "estimatedMinutes": 20,
        "isPublished": True,
        "tags": ["five-pillar-framework", "cmmi", "systems-thinking", "healthcare-reform"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p1a", "text": "Explain why single-pillar interventions in CMMI's model portfolio ran into constraints created by the pillars they ignored"},
            {"id": "obj_5p1b", "text": "State CMMI's actual track record: how many models were tested, how many met the bar for nationwide expansion, and the net budgetary result"},
            {"id": "obj_5p1c", "text": "Identify which pillar an intervention addresses and predict what happens when the others are left unaddressed"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "A fifteen-year natural experiment",
             "body": "In 2010, the Affordable Care Act created the Center for Medicare and Medicaid Innovation (CMMI) with a mandate to test new payment and delivery models and scale what worked. Over the next fifteen years, CMMI ran the largest natural experiment in American healthcare reform: dozens of models, billions of dollars, thousands of participating organizations, each testing a theory of what would fix the system.\n\nThe results are unusually well documented, because CMMI models are evaluated against the same statutory bar: does the model improve quality without increasing spending, reduce spending without reducing quality, or do both? A model that clears that bar is eligible for nationwide expansion. That is a clean, falsifiable test — and it produced a clear pattern.\n\nThat pattern is the subject of this lesson, and it holds up whether you look at the portfolio in aggregate or at any single model in detail. The next two sections do both: the aggregate scorecard, then two named models worth knowing by name, because you will hear them cited — correctly and incorrectly — for the rest of your career in this field."},
            {"type": "key_stat", "stats": [
                {"value": "70", "label": "Models CMMI tested, 2011–2024", "source": "GAO"},
                {"value": "4", "label": "Models that met the bar for nationwide expansion", "source": "GAO"},
                {"value": "$7.9B", "label": "Spent by CMMI to operate its models", "source": "CBO, Sept. 2023"},
                {"value": "$5.4B", "label": "Net increase in federal spending, 2011–2020", "source": "CBO, Sept. 2023"},
            ]},
            {"type": "text", "heading": "Not a failure of effort — a failure of scope",
             "body": "Read that scorecard carefully before drawing the wrong conclusion. It is not that payment reform doesn't work, or that CMMI wasted fifteen years. It's that the models were, almost without exception, narrow. Each one addressed a single part of the system while leaving the others unchanged — and the parts left unchanged determined the outcome.\n\nModels that changed only what Medicare paid, without changing how care was delivered or whether providers had the infrastructure to respond, generated financial pressure with no behavioral change to show for it. Models that redesigned care coordination produced real clinical improvements — that the payment system then penalized, because better coordination usually means fewer billable services. Models that required new technology — EHRs, population health platforms, data exchange — ran into providers who had the tool but not the operational capacity to use it.\n\nEach of these is a single-pillar intervention hitting a constraint created by a different pillar. That is the pattern this course exists to name and to fix."},
            {"type": "text", "heading": "Case study one: Comprehensive Primary Care Plus",
             "body": "CPC+ launched in 2017 as CMMI's largest primary care model to date — over 3,000 practices, more than 17 million patients, running five full years before ending in 2021. Its theory of change was squarely Clinical: pay primary care practices more, and enhance that payment specifically to fund care coordination, and practices will manage their populations well enough to keep patients out of the hospital.\n\nThe independent evaluation confirmed the clinical half of the theory. CPC+ practices reduced emergency department visits, hospitalizations, and hospitalization spending relative to comparison practices — a real, measured clinical effect, not a rounding error.\n\nIt did not reduce total Medicare spending. The enhanced payments CMS made to fund the care coordination, plus increases in spending elsewhere in the care continuum, more than offset the utilization reductions the model achieved. CPC+ is the cleanest available illustration of Clinical pillar success that never becomes Economics pillar success, because the payment model funding the intervention was never redesigned to capture the savings the intervention produced."},
            {"type": "text", "heading": "Case study two: the Medicare Diabetes Prevention Program",
             "body": "MDPP is the more uncomfortable example, because on paper it is one of CMMI's four unambiguous successes — its pilot met the statutory bar and CMS expanded it nationwide starting in 2018, the coverage decision that defines success in this framework's terms.\n\nExpansion did not translate into reach. Only about 38% of primary care physicians were aware the program existed, and only 23% referred an eligible patient to it. The reimbursement structure paid so little, on such a delayed and performance-contingent schedule, that community organizations found it barely worth the administrative burden of becoming a supplier — producing a nationwide undersupply of physical sites offering the program. CMS's original design did not recognize telehealth delivery, which excluded exactly the rural beneficiaries who had the least access to an in-person site in the first place.\n\nMDPP passed the evaluation CMMI uses to define success — the narrow Clinical-and-Economics question the statute asks. It failed on Policy (a reimbursement structure nobody wanted to operate under), on Operations (no supply of delivery sites), and on the Equity Imperative specifically (the access gap fell hardest on rural Medicare beneficiaries, the population with the fewest alternative options). A model can clear CMMI's bar and still fail the five-question test this course teaches — because the bar only asks two of the five questions."},
            {"type": "callout", "variant": "info", "heading": "The diagnostic test",
             "body": "For any transformation initiative — a CMMI model, a state Medicaid waiver, a hospital's own value-based care strategy — ask five questions: Is it permissible (Policy)? Is it possible (Technology)? Is it sustainable (Economics)? Is it effective (Clinical)? Is it executable (Operations)? An initiative that fails even one of these questions will underperform regardless of how well it answers the others."},
            {"type": "text", "heading": "The Equity Imperative is not a sixth question",
             "body": "There is a sixth question running underneath all five: is it just? Does the answer hold up the same way for a rural Medicaid patient as it does for an urban commercially-insured one? This is not a separate pillar competing for its own resources and its own success metric — it is a test applied to each of the five. A payment model can be permissible, possible, sustainable, effective, and executable, and still fail if it improves the average while widening the gap between the best-served and worst-served populations.\n\nMDPP is the case study to hold onto here: a program CMS itself certified as a success produced an access pattern that concentrated its benefit in exactly the populations least likely to need it most, and left rural, lower-resource communities to figure out a program that had almost nowhere nearby to actually deliver it. You will see this Equity Imperative applied concretely, pillar by pillar, in Track 7 of this course and in Chapter 10 of the book."},
            {"type": "comparison_table", "heading": "What CMMI's pattern predicts", "rows": [
                {"label": "Economics only", "left": "Payment changes, delivery doesn't", "right": "Financial pressure with no behavior change"},
                {"label": "Clinical only (CPC+)", "left": "Care coordination improves, utilization falls", "right": "Payment model never redesigned to capture the savings — no net reduction in spending"},
                {"label": "Technology only", "left": "New systems deployed", "right": "Providers lack operational capacity to use them"},
                {"label": "Clinical + Economics only (MDPP)", "left": "Pilot meets the statutory bar, model expands nationwide", "right": "No Policy fix to reimbursement, no Operations base of delivery sites — reach collapses"},
                {"label": "Equity Imperative unapplied (MDPP)", "left": "Program certified a national success", "right": "Access concentrated away from the rural beneficiaries who needed it most"},
                {"label": "All five, in sequence", "left": "Mandate → data → incentive → care redesign → execution", "right": "Each stage removes the constraint blocking the next"},
            ]},
            {"type": "callout", "variant": "warning", "heading": "Passing the evaluation is not the same as working",
             "body": "MDPP is proof that clearing CMMI's own statutory bar does not mean a model works at the scale and reach that matters to patients. Before you cite any pilot result — CMMI's or your own organization's — ask which of the five questions the evaluation actually measured, and which ones it silently assumed away."},
            {"type": "callout", "variant": "tip", "heading": "How to use this pattern",
             "body": "The next time someone hands you a successful pilot result, don't ask 'did it work?' Ask 'which of the five questions did this evaluation answer, and which did it never ask?' CPC+ answered the Clinical question and never closed the Economics loop. MDPP answered the Clinical and Economics questions and never asked the Policy, Operations, or Equity ones. The gap between a pilot's finding and a program's real-world result is almost always one of the questions nobody thought to ask."},
        ],
        "quiz": {
            "id": "quiz_5p_single_pillar", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p1a", "type": "single_choice", "points": 1,
                 "question": "Of the 70 CMMI models tested from 2011–2024, how many met the statutory bar for nationwide expansion?",
                 "explanation": "GAO found only 4 of 70 tested models — about 5.7% — met the criteria of improving quality without raising spending, reducing spending without harming quality, or both.",
                 "options": [
                     {"id": "o_5p1a1", "text": "4", "isCorrect": True},
                     {"id": "o_5p1a2", "text": "25", "isCorrect": False, "explanation": "Well above the actual count — this overstates CMMI's success rate."},
                     {"id": "o_5p1a3", "text": "35 (half)", "isCorrect": False, "explanation": "Far above the actual figure."},
                     {"id": "o_5p1a4", "text": "0", "isCorrect": False, "explanation": "Close in spirit, but four models did clear the statutory bar."},
                 ]},
                {"id": "q_5p1b", "type": "single_choice", "points": 1,
                 "question": "A model redesigns care coordination and produces measurable clinical improvement, but participating providers lose revenue because they deliver fewer billable services. Which pillar was left unaddressed?",
                 "explanation": "This is the Economics pillar failing to align with a Clinical-pillar intervention — the payment system still rewards volume, so better coordination is financially self-defeating.",
                 "options": [
                     {"id": "o_5p1b1", "text": "Economics — the payment model wasn't changed to match the new care model", "isCorrect": True},
                     {"id": "o_5p1b2", "text": "Technology — the EHR wasn't upgraded", "isCorrect": False, "explanation": "The scenario describes a payment misalignment, not a technology gap."},
                     {"id": "o_5p1b3", "text": "Operations — the providers weren't trained", "isCorrect": False, "explanation": "The care improvement did happen; the problem is what the payment system did in response."},
                     {"id": "o_5p1b4", "text": "Policy — there was no legislative mandate", "isCorrect": False, "explanation": "This scenario is about incentive alignment, not the presence of a mandate."},
                 ]},
                {"id": "q_5p1c", "type": "true_false", "points": 1,
                 "question": "The Equity Imperative functions as a sixth pillar, scored and resourced alongside the other five.",
                 "explanation": "The Equity Imperative is a cross-cutting test — 'is it just?' — applied to each of the five pillars, not a sixth item competing with them for its own budget line.",
                 "options": [
                     {"id": "o_5p1c1", "text": "False", "isCorrect": True},
                     {"id": "o_5p1c2", "text": "True", "isCorrect": False, "explanation": "This is the exact misreading this course is designed to correct."},
                 ]},
                {"id": "q_5p1d", "type": "single_choice", "points": 1,
                 "question": "The Medicare Diabetes Prevention Program (MDPP) met CMMI's statutory bar and was expanded nationwide in 2018, yet only ~23% of eligible patients whose doctors knew about it were referred, and rural beneficiaries had the least access. What does this best illustrate?",
                 "explanation": "MDPP passed the two questions CMMI's evaluation bar actually measures — Clinical effectiveness and Economics viability — but failed the Policy question (a reimbursement design providers didn't want to operate under), the Operations question (no supply of delivery sites), and the Equity Imperative (access concentrated away from the population that needed it most). Clearing the statutory bar is not the same as passing all five questions.",
                 "options": [
                     {"id": "o_5p1d1", "text": "A model can meet CMMI's own success bar and still fail the Policy, Operations, and Equity questions the bar doesn't ask", "isCorrect": True},
                     {"id": "o_5p1d2", "text": "MDPP proves CMMI's evaluation methodology was flawed and should be discarded", "isCorrect": False, "explanation": "The evaluation correctly measured what it was designed to measure — the problem is that it only measures two of the five questions."},
                     {"id": "o_5p1d3", "text": "MDPP shows that Clinical-only interventions never produce real health benefits", "isCorrect": False, "explanation": "The opposite — MDPP's clinical/economic case was real. The failure was in reach, not in the underlying model."},
                     {"id": "o_5p1d4", "text": "Rural beneficiaries were simply less interested in diabetes prevention", "isCorrect": False, "explanation": "The evidence points to supply and design barriers — provider awareness, reimbursement structure, and the initial exclusion of telehealth — not patient interest."},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_five_questions",
        "trackId": "track_5p_foundations",
        "pillar": "general",
        "order": 2,
        "slug": "five-pillars-diagnostic-questions",
        "title": "The Five Pillars and Their Diagnostic Questions",
        "summary": "Each pillar answers one question, plays one structural role, and produces one class of result when it is working. This lesson defines all five precisely enough to diagnose which one is failing in a real initiative.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["five-pillar-framework", "policy", "technology", "economics", "clinical", "operations"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p2a", "text": "State each pillar's diagnostic question and structural role from memory"},
            {"id": "obj_5p2b", "text": "Name what each pillar produces when it is functioning, and the failure signature when it is not"},
            {"id": "obj_5p2c", "text": "Diagnose which pillar is the binding constraint in a described initiative"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "Five questions, asked in order",
             "body": "The framework's usefulness comes from precision. Each pillar is defined by a single diagnostic question, and the five questions are not interchangeable — they interrogate genuinely different things about the same initiative.\n\nPolicy asks: is it permissible? Technology asks: is it possible? Economics asks: is it sustainable? Clinical asks: is it effective? Operations asks: is it executable? An honest 'no' to any one of them predicts underperformance regardless of the other four answers."},
            {"type": "comparison_table", "heading": "The five pillars", "rows": [
                {"label": "Policy", "left": "Is it permissible?", "right": "The mandatory architecture — converts aspirational reform into binding requirements. Without it, the highest-cost actors opt out."},
                {"label": "Technology", "left": "Is it possible?", "right": "The data substrate — makes population health management, VBC execution, and equity measurement analytically feasible."},
                {"label": "Economics", "left": "Is it sustainable?", "right": "The incentive architecture — determines whether organizations have a financial reason to behave differently."},
                {"label": "Clinical", "left": "Is it effective?", "right": "The mechanism of change — payment changes incentives; clinical redesign changes behavior."},
                {"label": "Operations", "left": "Is it executable?", "right": "The execution layer — translates mandates, models, platforms and programs into organizational reality."},
            ]},
            {"type": "text", "heading": "What each pillar produces when it works",
             "body": "A pillar is not an abstraction; it has outputs you can look for. Policy produces statutory mandates that eliminate voluntary opt-out, and accountability timelines that cannot be deferred. Technology produces attribution lists, total-cost-of-care measurement, HEDIS stratification, risk stratification and care-gap identification. Economics produces payment models in which population health management is financially rational, and accountability for total cost rather than encounter volume. Clinical produces primary care transformation that prevents hospitalizations, behavioral health integration that reduces crisis presentations, and care management that closes gaps before they become acute. Operations produces transformation plans that are implemented rather than filed, and project-management infrastructure that tracks progress against real deadlines.\n\nIf you cannot point to the output, the pillar is not working — whatever the org chart says."},
            {"type": "callout", "variant": "info", "heading": "Vermont in one line per pillar",
             "body": "Policy: Acts 167 and 68 make reference-based pricing and global budgets binding on all hospitals. Technology: VHCURES, VITL/VHIE, and the AHS–GMCB analytics capability. Economics: mandatory RBP from FY2027 and hospital global budgets from FY2028. Clinical: Blueprint PCMHs, the Collaborative Care Model, CCBHCs, and community health teams. Operations: the 14-hospital transformation planning process, RHRC technical assistance, the HSA Coordinator model, and EMS regionalization."},
            {"type": "text", "heading": "Case study: Economics as the binding constraint — the Pioneer ACO exodus",
             "body": "CMS's Pioneer ACO Model, launched in 2012, tested what the most advanced accountable care organizations in the country could do under two-sided financial risk — sharing not just in savings but in losses. CMS did not select novices: the 32 founding Pioneer ACOs were chosen specifically because they already had the care-coordination infrastructure most ACOs were still building. On the Clinical question — is it effective? — these were, by CMS's own selection criteria, the strongest answers available in the program.\n\nThe Economics pillar is what broke. Thirteen of the 32 Pioneer ACOs left the model in 2013 or 2014, and CMS confirmed by name that Franciscan Alliance (Indianapolis), Genesys PHO (Flint, Michigan), and Renaissance Health Network (Wayne, Pennsylvania) were among them. Genesys PHO owed Medicare $1.9 million in repayment after failing to hold down spending in its second year under the downside-risk formula. By 2016, only 9 of the original 32 remained.\n\nNone of this reflects a Clinical failure — the organizations that left were not clinically weaker than the ones that stayed. The reason most commonly cited for leaving was that the two-sided risk model was unsustainable even for already-efficient organizations: an ACO that has already wrung out the easy savings has less room left to keep beating its own benchmark year after year. That is a pure Economics-pillar failure — 'is it sustainable?' answered no — while Policy, Technology, Clinical, and Operations were, comparatively, in reasonable shape. More care coordination would not have kept them in the program."},
            {"type": "text", "heading": "Case study: Technology as the binding constraint — before and after ProvenCare",
             "body": "Geisinger Health System's ProvenCare program, launched in 2006, bundled the entire cost of elective coronary artery bypass graft (CABG) surgery into a single warrantied price and built the protocol around 40 evidence-based best-practice steps — things like correct pre-admission documentation and correct post-operative beta-blocker dosing. None of these 40 steps were new medical knowledge; every one was already an established best practice before ProvenCare existed.\n\nWhat was new was hardwiring all 40 steps into the electronic health record so it could prompt clinicians in real time, and so Geisinger could monitor compliance across every patient rather than audit a sample after the fact. The published results (Casale et al., Annals of Surgery, 2007) show why that mattered: at launch, only 59% of patients received all 40 components — the same gap between known best practice and actual bedside practice that shows up everywhere in medicine. Within three months of the EHR-based prompting and monitoring going live, full-bundle compliance reached 100% and, after one dip to 86%, stayed there for the rest of the study period. Patients treated under the completed protocol had a 16% shorter hospital stay than the conventional-care comparison group.\n\nPolicy allowed this — nothing barred Geisinger from doing it. Economics rewarded it — the bundled price gave Geisinger a direct financial reason to eliminate variation. Clinical knowledge was not the constraint — the 40 steps were already known and written down. What was missing until the EHR build was Technology: a way to make 'is it possible to do this reliably on every patient' actually true. That is the diagnostic signature of a Technology-pillar constraint — the incentive and the know-how both exist, but nothing enforces or verifies the behavior at the point of care."},
            {"type": "text", "heading": "Diagnosing the binding constraint",
             "body": "In practice you rarely find all five failing at once. You find one that is blocking the others — the binding constraint. The diagnostic move is to walk the five questions in order and stop at the first honest 'no.'\n\nAn organization with a signed value-based contract, a redesigned care model, and no real-time cost data has an Economics pillar that exists on paper and a Technology pillar that cannot support it. Adding clinical staff will not help. Renegotiating the contract will not help. The constraint is data, and until it is relieved, investment in the other pillars produces less than it should."},
            {"type": "comparison_table", "heading": "Reading the failure signature", "rows": [
                {"label": "Policy", "left": "Signal", "right": "Participation is voluntary, and the organizations most likely to lose money opt out or never join at all"},
                {"label": "Technology", "left": "Signal", "right": "The incentive and the clinical know-how both exist, but frontline compliance is inconsistent because nothing prompts or verifies it in real time"},
                {"label": "Economics", "left": "Signal", "right": "Clinically strong, well-run organizations exit or underperform specifically once real financial risk is introduced"},
                {"label": "Clinical", "left": "Signal", "right": "Data, mandate, and payment all line up, but the care team's actual practice at the bedside doesn't change"},
                {"label": "Operations", "left": "Signal", "right": "A funded plan with a real deadline exists on paper but is never actually implemented or tracked"},
            ]},
            {"type": "callout", "variant": "tip", "heading": "Using the failure signature in practice",
             "body": "When you're handed an initiative that isn't performing, resist the urge to add more of whatever it already has plenty of. The Pioneer ACO exits didn't need better clinical protocols — they had those. Pre-EHR ProvenCare didn't need a bigger financial incentive or a better-written protocol — it had both. In each case, the fix was in the pillar with the honest 'no,' not the pillar that was easiest to invest in further."},
        ],
        "quiz": {
            "id": "quiz_5p_five_questions", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p2a", "type": "single_choice", "points": 1,
                 "question": "Which pillar's diagnostic question is 'Is it sustainable?'",
                 "explanation": "Economics is the incentive architecture — it asks whether organizations have a durable financial reason to behave differently.",
                 "options": [
                     {"id": "o_5p2a1", "text": "Economics", "isCorrect": True},
                     {"id": "o_5p2a2", "text": "Operations", "isCorrect": False, "explanation": "Operations asks 'Is it executable?'"},
                     {"id": "o_5p2a3", "text": "Policy", "isCorrect": False, "explanation": "Policy asks 'Is it permissible?'"},
                     {"id": "o_5p2a4", "text": "Clinical", "isCorrect": False, "explanation": "Clinical asks 'Is it effective?'"},
                 ]},
                {"id": "q_5p2b", "type": "single_choice", "points": 1,
                 "question": "An ACO has a signed total-cost-of-care contract and a redesigned care model, but its cost data arrives 60–90 days after care is delivered. Which pillar is the binding constraint?",
                 "explanation": "The Economics instrument exists and the Clinical redesign is done — but neither can be managed without a timely data substrate. Technology is the constraint.",
                 "options": [
                     {"id": "o_5p2b1", "text": "Technology", "isCorrect": True},
                     {"id": "o_5p2b2", "text": "Economics", "isCorrect": False, "explanation": "The contract exists; the problem is the inability to see performance under it."},
                     {"id": "o_5p2b3", "text": "Clinical", "isCorrect": False, "explanation": "The care model has already been redesigned."},
                     {"id": "o_5p2b4", "text": "Policy", "isCorrect": False, "explanation": "Nothing in the scenario indicates a missing mandate."},
                 ]},
                {"id": "q_5p2c", "type": "single_choice", "points": 1,
                 "question": "Which of these is an output of a functioning Operations pillar?",
                 "explanation": "Operations is the execution layer — its signature output is plans that get implemented and tracked, not designed and filed.",
                 "options": [
                     {"id": "o_5p2c1", "text": "Project-management infrastructure that tracks progress against statutory deadlines", "isCorrect": True},
                     {"id": "o_5p2c2", "text": "Attribution lists and risk stratification", "isCorrect": False, "explanation": "Those are Technology pillar outputs."},
                     {"id": "o_5p2c3", "text": "Statutory mandates that eliminate voluntary opt-out", "isCorrect": False, "explanation": "That is a Policy pillar output."},
                     {"id": "o_5p2c4", "text": "Payment models that reward total cost accountability", "isCorrect": False, "explanation": "That is an Economics pillar output."},
                 ]},
                {"id": "q_5p2d", "type": "single_choice", "points": 1,
                 "question": "Thirteen Pioneer ACOs left CMS's model in 2013–2014, including organizations CMS had originally selected for their advanced care-coordination capability. Which pillar's failure best explains the exodus?",
                 "explanation": "These were clinically strong organizations by CMS's own selection criteria. What they couldn't sustain was the two-sided financial risk itself — a pure Economics-pillar failure, not a Clinical one.",
                 "options": [
                     {"id": "o_5p2d1", "text": "Economics — the downside-risk model wasn't sustainable, even for efficient organizations", "isCorrect": True},
                     {"id": "o_5p2d2", "text": "Clinical — the organizations weren't actually good at care coordination", "isCorrect": False, "explanation": "CMS selected these specific organizations because their care coordination was already advanced."},
                     {"id": "o_5p2d3", "text": "Technology — they lacked the data systems to manage the contract", "isCorrect": False, "explanation": "The commonly cited reason for exit was financial risk, not a data or systems gap."},
                     {"id": "o_5p2d4", "text": "Operations — they couldn't implement the required care redesign", "isCorrect": False, "explanation": "The care redesign was already in place; that's why CMS chose them as Pioneers."},
                 ]},
                {"id": "q_5p2e", "type": "single_choice", "points": 1,
                 "question": "Geisinger's ProvenCare CABG protocol contained no new medical knowledge — all 40 steps were already established best practice — yet compliance rose from 59% to 100% only after the steps were built into the EHR with real-time prompts and monitoring. Which pillar was the binding constraint before that build?",
                 "explanation": "The incentive (bundled payment) and the clinical knowledge (the 40 steps) already existed. What was missing was a way to reliably enforce and verify the behavior at the point of care for every patient — the Technology pillar's question, 'is it possible?'",
                 "options": [
                     {"id": "o_5p2e1", "text": "Technology", "isCorrect": True},
                     {"id": "o_5p2e2", "text": "Clinical — the best-practice steps hadn't been defined yet", "isCorrect": False, "explanation": "All 40 steps were already established best practice before the EHR build."},
                     {"id": "o_5p2e3", "text": "Economics — the bundled payment didn't reward the right behavior", "isCorrect": False, "explanation": "The bundled price already gave Geisinger a direct financial reason to eliminate variation."},
                     {"id": "o_5p2e4", "text": "Policy — Geisinger wasn't permitted to run the program", "isCorrect": False, "explanation": "Nothing in the scenario suggests a permissibility problem."},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_equity_imperative_intro",
        "trackId": "track_5p_foundations",
        "pillar": "equity",
        "order": 3,
        "slug": "the-equity-imperative-is-it-just",
        "title": "The Equity Imperative: Is It Just?",
        "summary": "Equity is not a sixth pillar competing for budget. It is the test each of the five must pass. This lesson shows what the justice question asks of each pillar, and why a reform that improves the average can still fail.",
        "estimatedMinutes": 20,
        "isPublished": True,
        "tags": ["equity-imperative", "disparities", "health-equity", "five-pillar-framework"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p3a", "text": "Explain why Equity is framed as an Imperative rather than a sixth pillar"},
            {"id": "obj_5p3b", "text": "State the equity question that attaches to each of the five pillars"},
            {"id": "obj_5p3c", "text": "Recognize when an average-improving reform is widening a gap"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "Why not a sixth pillar",
             "body": "Making equity a sixth pillar sounds generous and is quietly destructive. A sixth pillar has its own budget line, its own staff, its own success metric, and its own place in the queue — which means it can be sequenced last, funded least, and reported separately from the work that actually determines whether disparities close.\n\nTreating it as an Imperative changes the structure. There is no separate equity workstream to defer, because every pillar's own deliverable carries an equity condition it must satisfy. The question is not 'did we do the equity project?' It is 'does this mandate, this data platform, this payment model, this care model, this implementation plan hold up for the people the current system serves worst?'"},
            {"type": "comparison_table", "heading": "The justice question, pillar by pillar", "rows": [
                {"label": "Policy", "left": "Is it permissible?", "right": "…and does the mandate close disparities or widen them?"},
                {"label": "Technology", "left": "Is it possible?", "right": "…and does the data make disparities visible, or bury them in averages?"},
                {"label": "Economics", "left": "Is it sustainable?", "right": "…and do the incentives reward serving the hardest-to-reach, or penalize it?"},
                {"label": "Clinical", "left": "Is it effective?", "right": "…and effective for whom?"},
                {"label": "Operations", "left": "Is it executable?", "right": "…and executable everywhere, including the rural and under-resourced?"},
            ]},
            {"type": "callout", "variant": "warning", "heading": "The average that hides the gap",
             "body": "Vermont's primary care access rate is roughly 91% — about four points above the national benchmark, and a genuine achievement. It also conceals an 11-point gap between white Vermont adults and BIPOC Vermont adults. Nothing in the aggregate number reveals that gap. It becomes visible only when the underlying data is stratified by race and ethnicity — which is a Technology pillar capability, not a good intention."},
            {"type": "text", "heading": "Case study: Economics as the equity failure — the Hospital Readmissions Reduction Program",
             "body": "CMS's Hospital Readmissions Reduction Program, in effect since 2012, answers the Economics pillar's own question cleanly: it is sustainable, in the narrow sense that it gives hospitals a real financial reason to reduce 30-day readmissions, and it has moved behavior. What its original design never asked was the Imperative's question — does the incentive reward serving the hardest-to-reach, or penalize it?\n\nThe initial risk-adjustment formula did not account for patients' socioeconomic status or social risk factors, which are strongly associated with readmission regardless of the quality of care a hospital delivers. The predictable result: safety-net hospitals serving disproportionately low-income and dually eligible (Medicare and Medicaid) patients were penalized far more consistently than others — one multi-year analysis found 72% of safety-net hospitals penalized in every one of four post-HRRP years studied, versus 59% of non-safety-net hospitals.\n\nCongress fixed this in the 21st Century Cures Act (2016), which required CMS to stop comparing every hospital against the same national benchmark and instead sort hospitals into five peer quintiles by their share of dual-eligible patients, comparing readmission performance only within each quintile — a change that took effect in FY2019, seven years after the program began penalizing hospitals under the original design. The Economics pillar had been 'sustainable' and functioning exactly as built the entire time; the equity failure was invisible to its own diagnostic question, and it took a separate act of Congress to retrofit the fix."},
            {"type": "text", "heading": "Case study: Technology as the equity failure — pulse oximetry",
             "body": "Pulse oximeters are about as close to invisible infrastructure as medical technology gets: a clip on a fingertip, a number on a monitor, deployed in essentially every hospital room and used to make real-time decisions about who needs supplemental oxygen. On average, across the population the devices were validated on, they are accurate. Average accuracy is exactly the kind of result that can look like the Technology question — is it possible? — has been answered yes.\n\nA 2020 New England Journal of Medicine study (Sjoding et al.) stratified that same 'accurate on average' technology by patient race and found it was not equally accurate at all. Across a multicenter cohort of 37,308 paired measurements from 178 hospitals, occult hypoxemia — a true blood oxygen level below 88% that the pulse oximeter was still reading as a reassuring 92–96% — occurred in 17.0% of Black patients versus 6.2% of white patients: nearly three times the rate. Patients were being screened as fine by the device precisely when they most needed intervention, and the pattern fell almost entirely on one racial group.\n\nNothing about this required new medical knowledge to fix once it was found — it required looking. The device had been in near-universal use for years; the disparity was invisible until someone deliberately stratified the data by race instead of reading the aggregate accuracy number and calling the Technology question closed. That is the Imperative's Technology-pillar question in its starkest form: does the data make disparities visible, or bury them in an average that looks fine?"},
            {"type": "text", "heading": "Designed in, not reviewed in",
             "body": "The most common way equity fails is not opposition — it is sequencing. An equity review that happens at the approval stage, after the payment methodology is designed, can flag a problem but cannot cheaply fix one. By then the rate structure, the risk model and the measurement approach are already built around assumptions that did not include social risk.\n\nThe alternative is an equity constraint embedded in the design process itself. A reference-based-pricing methodology that sets rates uniformly, without adjusting for the conditions facing hospitals in underserved communities, is technically correct and practically inequitable — and it is far cheaper to catch that while the methodology is being written than after it is adopted."},
            {"type": "comparison_table", "heading": "Same failure, two pillars", "rows": [
                {"label": "HRRP (Economics)", "left": "Looked solved: incentive cut aggregate readmissions and paid for itself", "right": "Hidden: safety-net hospitals penalized far more, for who they treat, not care quality"},
                {"label": "Pulse oximetry (Technology)", "left": "Looked solved: validated accurate on average, decades of routine use", "right": "Hidden: occult hypoxemia missed in Black patients at nearly 3x the white-patient rate"},
            ]},
            {"type": "callout", "variant": "tip", "heading": "The equity test to run before calling something done",
             "body": "Both failures above passed their pillar's own question for years before anyone caught them — because nobody had stratified the result by the population most likely to be underserved. Before you call a payment model sustainable or a technology validated, ask the version of the question this lesson is built around: sustainable, accurate, effective for whom, specifically — not just on average? That one stratification step is usually cheap. Finding the gap after a statute or a published study forces the fix is not."},
        ],
        "quiz": {
            "id": "quiz_5p_equity_intro", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p3a", "type": "single_choice", "points": 1,
                 "question": "What is the structural risk of designating Equity as a sixth pillar?",
                 "explanation": "A sixth pillar has its own queue position and budget line — which means it can be sequenced last, funded least, and reported separately from the work that determines whether disparities actually close.",
                 "options": [
                     {"id": "o_5p3a1", "text": "It becomes a separable workstream that can be deferred, underfunded, and reported apart from the real work", "isCorrect": True},
                     {"id": "o_5p3a2", "text": "It would require a sixth diagnostic question", "isCorrect": False, "explanation": "The number of questions isn't the problem — separability is."},
                     {"id": "o_5p3a3", "text": "It would conflict with federal reporting requirements", "isCorrect": False, "explanation": "The objection is structural, not regulatory."},
                     {"id": "o_5p3a4", "text": "It would make the framework harder to teach", "isCorrect": False, "explanation": "Teachability isn't the argument."},
                 ]},
                {"id": "q_5p3b", "type": "single_choice", "points": 1,
                 "question": "Vermont's ~91% primary care access rate sits above the national benchmark but conceals an 11-point gap between white and BIPOC adults. Which pillar's capability is required to see that gap at all?",
                 "explanation": "Disparities hidden in aggregates only become visible through demographic stratification of the underlying data — a Technology pillar capability.",
                 "options": [
                     {"id": "o_5p3b1", "text": "Technology — demographic stratification of the data", "isCorrect": True},
                     {"id": "o_5p3b2", "text": "Clinical — more primary care providers", "isCorrect": False, "explanation": "Expanding access may help close the gap, but it does not make the gap measurable."},
                     {"id": "o_5p3b3", "text": "Policy — an equity statute", "isCorrect": False, "explanation": "A mandate can require measurement, but the measurement capability itself is Technology."},
                     {"id": "o_5p3b4", "text": "Operations — more staff", "isCorrect": False, "explanation": "Staffing does not produce stratified data."},
                 ]},
                {"id": "q_5p3c", "type": "true_false", "points": 1,
                 "question": "A transformation that reduces average costs while widening disparities has still satisfied the Equity Imperative.",
                 "explanation": "It has failed the Equity Imperative — however permissible, possible, sustainable, effective and executable it may otherwise be.",
                 "options": [
                     {"id": "o_5p3c1", "text": "False", "isCorrect": True},
                     {"id": "o_5p3c2", "text": "True", "isCorrect": False, "explanation": "Average improvement is exactly the result the Imperative is designed to interrogate."},
                 ]},
                {"id": "q_5p3d", "type": "single_choice", "points": 1,
                 "question": "CMS's Hospital Readmissions Reduction Program penalized safety-net hospitals far more often than others in its early years, even though the payment incentive was working exactly as designed. What does this best illustrate?",
                 "explanation": "The Economics pillar's own question — is it sustainable? — was satisfied; the program reduced readmissions and functioned as built. The equity failure was in who it penalized, a question that design never asked until the 21st Century Cures Act forced a fix via peer-quintile comparison.",
                 "options": [
                     {"id": "o_5p3d1", "text": "A pillar can pass its own diagnostic question and still fail the Equity Imperative", "isCorrect": True},
                     {"id": "o_5p3d2", "text": "The HRRP failed the Economics pillar's own sustainability question", "isCorrect": False, "explanation": "It didn't — the program was financially sustainable and changed behavior exactly as designed. That's precisely what made the equity failure easy to miss."},
                     {"id": "o_5p3d3", "text": "Safety-net hospitals provided objectively worse clinical care", "isCorrect": False, "explanation": "The disparity tracked social risk factors excluded from the original risk-adjustment formula, not a documented difference in care quality."},
                     {"id": "o_5p3d4", "text": "The program should have been eliminated rather than fixed", "isCorrect": False, "explanation": "Congress's actual response was to retrofit peer-quintile risk adjustment via the 21st Century Cures Act, not to end the program."},
                 ]},
                {"id": "q_5p3e", "type": "single_choice", "points": 1,
                 "question": "Pulse oximeters were validated as accurate 'on average' and used for years before a 2020 study found occult hypoxemia occurred in 17.0% of Black patients versus 6.2% of white patients. What made the disparity visible?",
                 "explanation": "The disparity existed the entire time the devices were in routine use. It became visible only when researchers stratified outcomes by race instead of relying on the aggregate accuracy figure — the exact move the Equity Imperative asks of the Technology pillar.",
                 "options": [
                     {"id": "o_5p3e1", "text": "Stratifying the outcome data by patient race, rather than relying on the aggregate accuracy figure", "isCorrect": True},
                     {"id": "o_5p3e2", "text": "A hardware redesign of the pulse oximeter", "isCorrect": False, "explanation": "No redesign preceded the finding — the disparity was found in devices already in routine use."},
                     {"id": "o_5p3e3", "text": "A new FDA approval requirement", "isCorrect": False, "explanation": "Guidance changes followed the finding; they didn't produce it."},
                     {"id": "o_5p3e4", "text": "Patient complaints about inaccurate readings", "isCorrect": False, "explanation": "The finding came from a retrospective, stratified data analysis, not patient-reported complaints."},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_dependency_logic",
        "trackId": "track_5p_foundations",
        "pillar": "general",
        "order": 4,
        "slug": "dependency-logic-execution-sequence",
        "title": "Dependency Logic and the Execution Sequence",
        "summary": "The pillars are not a checklist — they are a directed graph. This lesson covers the dependency matrix, the difference between ENABLES, REQUIRES and DRIVES, and why the build order is Policy → Technology → Economics → Clinical → Operations.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["dependency-logic", "sequencing", "critical-path", "five-pillar-framework"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p4a", "text": "Read the dependency matrix and distinguish ENABLES, REQUIRES, DRIVES and feedback relationships"},
            {"id": "obj_5p4b", "text": "Explain why the execution sequence is determined by dependency, not by importance"},
            {"id": "obj_5p4c", "text": "Apply the critical-path gate test to decide whether an investment can proceed now"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "Order is not a ranking",
             "body": "The sequence Policy → Technology → Economics → Clinical → Operations is the single most misread part of the framework. It is not a statement that Policy matters most and Operations matters least. It is a statement about what has to exist before what else can work.\n\nDependency logic is the principle that some investments cannot produce results until an upstream enabling investment is in place. The order falls out of the dependencies; it is not chosen for emphasis."},
            {"type": "callout", "variant": "info", "heading": "Three kinds of dependency, plus feedback",
             "body": "ENABLES — makes something possible that was not possible before (Policy enables binding payment reform; Technology enables analytics-driven payment management). REQUIRES — cannot function without (VBC contracts require data infrastructure; care models require execution infrastructure). DRIVES — actively forces change (payment incentives drive care redesign; statutory deadlines drive execution capacity). And ⟲ marks feedback: relationships that run backward once the system is live, such as implementation data informing the next round of policy design."},
            {"type": "text", "heading": "The critical-path gate test",
             "body": "A gate is a prerequisite that must be complete before a downstream investment can be productive. A gate is open when the work is finished and closed while it is unfinished — and this is the part organizations get wrong: a gate is opened by completing the work, never by deciding to proceed.\n\nThe test for whether something is on the critical path or can run in parallel is a single question: could this investment produce its full intended value today, with the upstream pillars in their current state? If yes, it is parallel work and should proceed now. If no, it is behind a closed gate, and starting it early buys optionality at best and unmanaged risk at worst."},
            {"type": "comparison_table", "heading": "Selected dependencies from the matrix", "rows": [
                {"label": "Policy → Economics", "left": "ENABLES (critical path)", "right": "Mandatory authority makes structural payment reform binding. Voluntary payment reform produces voluntary results."},
                {"label": "Policy → Operations", "left": "DRIVES (critical path)", "right": "Statutory deadlines force organizations to build execution capacity they otherwise defer indefinitely."},
                {"label": "Technology → Economics", "left": "ENABLES", "right": "Analytics make VBC financial management possible. The contract can exist without them; performance under it cannot be managed."},
                {"label": "Economics → Clinical", "left": "DRIVES (critical path)", "right": "Payment incentives reshape care delivery. Under global budgets, a prevented admission becomes margin instead of lost revenue."},
                {"label": "Clinical → Operations", "left": "REQUIRES", "right": "A care model is a diagram until it has workforce, credentialing and management infrastructure."},
                {"label": "Operations → Policy", "left": "INFORMS ⟲ (feedback)", "right": "Implementation data feeds back into policy design, making the architecture self-correcting rather than purely top-down."},
            ]},
            {"type": "text", "heading": "Case study: skipping the gate — Massachusetts' 2006 coverage expansion",
             "body": "Massachusetts' 2006 reform (Chapter 58) is usually remembered as the template for the Affordable Care Act: an individual mandate paired with subsidized coverage, moving the state to near-universal insurance. Judged purely on the Policy and Economics questions — is it permissible, is it sustainable — it worked, and utilization data later confirmed real gains: more residents used primary and preventive care, and reliance on the emergency room as a usual source of care fell over time.\n\nWhat the reform did not do first was build primary care capacity to absorb the newly insured. In the years immediately after passage, roughly one in five Massachusetts adults reported being told a doctor's office or clinic was not accepting new patients or not accepting their type of coverage — a pattern researchers linked to lower reimbursement under the state's public programs and limited provider networks colliding with a sudden demand surge. Reports of dramatically longer wait times circulated widely at the time; the rigorous data on exactly how much waits lengthened is thinner than the anecdote, which is itself a useful caution against overstating a real effect you can't fully quantify.\n\nRead through the dependency matrix, this is a downstream pillar — Economics, in the form of expanded coverage — being pushed live while an upstream-in-sequence pillar it depends on for full effect, primary care Operations and Clinical capacity, was still behind its own gate. Coverage is necessary but not sufficient; it converts into access only if there is a functioning system on the other end of it, built on the same timeline."},
            {"type": "text", "heading": "Case study: opening the gate — HITECH and the EHR adoption curve",
             "body": "Contrast that with a Policy-drives-Technology relationship that worked close to how the framework predicts. Before 2009, hospital EHR adoption in the United States crawled forward at roughly 3.2% a year among the hospitals that would later become eligible for federal incentives — total adoption was still only in the 10–20% range as of 2008.\n\nThe HITECH Act (2009) tied real Medicare and Medicaid incentive payments to demonstrating 'meaningful use' of certified EHR technology — a Policy and Economics instrument aimed squarely at forcing a Technology build. After it took effect, annual EHR adoption growth among eligible hospitals jumped to about 14.2% a year, versus 3.3% a year at hospitals that weren't eligible for the incentive — a difference-in-differences of roughly 7.9 percentage points directly attributable to the program. By 2015–2017, more than 95% of U.S. hospitals had adopted an EHR.\n\nThis is the DRIVES relationship from the matrix operating close to as designed: a statutory incentive did not just encourage a downstream investment, it multiplied its pace by more than four times. It is also a reminder that 'Technology adopted' and 'Technology pillar functioning' are not the same claim — HITECH proves the adoption curve can be forced; later chapters of this course (and the book) return to how much further interoperability had to travel after adoption before that Technology base actually supported analytics-driven care."},
            {"type": "text", "heading": "Design can run ahead of management",
             "body": "One refinement prevents a common overcorrection. Sequencing does not mean four pillars sit idle while the first one finishes.\n\nThe useful distinction is between Economics-as-design and Economics-as-management. Defining a payment architecture — the rate methodology, the risk model, the equity constraints — can and should proceed in parallel with the technology build. Operating that model, with real money and real downside risk, requires the technology substrate to be live. Confusing the two is how organizations end up having signed something they cannot run."},
            {"type": "callout", "variant": "tip", "heading": "The same test, run on both case studies",
             "body": "Massachusetts and HITECH answer the same question — could this downstream investment produce its full intended value today, given the upstream pillars' current state? — in opposite directions. Coverage expansion's answer was no: primary care capacity wasn't there yet, and access strain followed. HITECH's incentive answer was yes: it didn't need a downstream pillar to be ready first, because Policy sits upstream of Technology in the sequence — its job was to force that build, and it did. Before committing to a downstream investment, run this test rather than assuming momentum or good intentions will close the gap."},
        ],
        "quiz": {
            "id": "quiz_5p_dependency", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p4a", "type": "single_choice", "points": 1,
                 "question": "What determines the five-pillar execution sequence?",
                 "explanation": "The order falls out of structural dependency — what must exist before what else can function — not from a judgment about which pillar matters most.",
                 "options": [
                     {"id": "o_5p4a1", "text": "Structural dependency between the pillars", "isCorrect": True},
                     {"id": "o_5p4a2", "text": "The relative importance of each pillar", "isCorrect": False, "explanation": "This is the most common misreading — the sequence is not a ranking."},
                     {"id": "o_5p4a3", "text": "The cost of each pillar's investments", "isCorrect": False, "explanation": "Cost does not set the order."},
                     {"id": "o_5p4a4", "text": "Which pillar has political support", "isCorrect": False, "explanation": "Political feasibility affects what gets done, not the dependency structure."},
                 ]},
                {"id": "q_5p4b", "type": "single_choice", "points": 1,
                 "question": "Which question correctly tests whether an investment is parallel work rather than blocked behind a closed gate?",
                 "explanation": "The parallel-work test is whether the investment could deliver its full intended value today, given the current state of upstream pillars.",
                 "options": [
                     {"id": "o_5p4b1", "text": "Could this investment produce its full intended value today, with upstream pillars in their current state?", "isCorrect": True},
                     {"id": "o_5p4b2", "text": "Is there budget available for it this fiscal year?", "isCorrect": False, "explanation": "Funding availability says nothing about dependency."},
                     {"id": "o_5p4b3", "text": "Has leadership approved proceeding?", "isCorrect": False, "explanation": "A gate is opened by completing upstream work, never by deciding to proceed."},
                     {"id": "o_5p4b4", "text": "Is it in the current strategic plan?", "isCorrect": False, "explanation": "Inclusion in a plan does not open a gate."},
                 ]},
                {"id": "q_5p4c", "type": "single_choice", "points": 1,
                 "question": "Which activity can legitimately proceed in parallel with the technology build?",
                 "explanation": "Economics-as-design (defining the payment architecture) can run in parallel; Economics-as-management — operating the model under real risk — requires the data substrate to be live.",
                 "options": [
                     {"id": "o_5p4c1", "text": "Designing the payment model's rate methodology and risk adjustment", "isCorrect": True},
                     {"id": "o_5p4c2", "text": "Assuming downside financial risk under a total-cost-of-care contract", "isCorrect": False, "explanation": "That is Economics-as-management, which requires live analytics."},
                     {"id": "o_5p4c3", "text": "Managing hospital global budgets in production", "isCorrect": False, "explanation": "Managing a budget requires the data to monitor it."},
                     {"id": "o_5p4c4", "text": "Disputing a payer's shared-savings calculation", "isCorrect": False, "explanation": "Disputing a calculation requires the analytics to contest it."},
                 ]},
                {"id": "q_5p4d", "type": "single_choice", "points": 1,
                 "question": "Massachusetts' 2006 reform expanded insurance coverage before primary care capacity had grown to match, and roughly one in five adults later reported being turned away by a doctor's office or clinic. Which dependency-logic mistake does this illustrate?",
                 "explanation": "Coverage (Economics) went live while the Operations/Clinical capacity it depends on for full effect was still behind its own gate — a downstream pillar pushed ahead of a pillar it needs in order to actually deliver access.",
                 "options": [
                     {"id": "o_5p4d1", "text": "A downstream pillar was pushed live before the capacity pillar it depends on had caught up", "isCorrect": True},
                     {"id": "o_5p4d2", "text": "The mandate wasn't legally binding enough", "isCorrect": False, "explanation": "The Policy question — is it permissible and binding — was answered; the problem was on the delivery-capacity side."},
                     {"id": "o_5p4d3", "text": "Residents didn't want the new coverage", "isCorrect": False, "explanation": "Coverage increased utilization overall; the friction was in finding an available provider, not in demand for coverage itself."},
                     {"id": "o_5p4d4", "text": "The reform never should have included subsidies", "isCorrect": False, "explanation": "Subsidies are part of what made coverage sustainable; they aren't the sequencing failure being illustrated."},
                 ]},
                {"id": "q_5p4e", "type": "single_choice", "points": 1,
                 "question": "After the HITECH Act tied Medicare/Medicaid incentive payments to 'meaningful use,' annual EHR adoption growth at eligible hospitals rose from about 3.2% to about 14.2% a year, versus a much smaller rise at ineligible hospitals. What does this best demonstrate?",
                 "explanation": "This is a DRIVES relationship in the matrix — Policy and Economics forcing a Technology build — working close to as designed, with the difference-in-differences isolating the incentive's own effect from background adoption trends.",
                 "options": [
                     {"id": "o_5p4e1", "text": "A Policy/Economics incentive can drive a downstream Technology build at a multiplied pace", "isCorrect": True},
                     {"id": "o_5p4e2", "text": "Hospitals would have adopted EHRs just as fast without the incentive", "isCorrect": False, "explanation": "The much smaller growth rate at ineligible hospitals over the same period shows the incentive itself drove the difference."},
                     {"id": "o_5p4e3", "text": "EHR adoption alone proves the Technology pillar was fully functioning", "isCorrect": False, "explanation": "Adoption is necessary but not sufficient — interoperability and analytics readiness are a separate, later question this course returns to."},
                     {"id": "o_5p4e4", "text": "The incentive mainly affected hospitals that were already planning to adopt EHRs", "isCorrect": False, "explanation": "The pre/post change in the ineligible-hospital comparison group is what isolates the incentive's real effect."},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_onecare_autopsy",
        "trackId": "track_5p_foundations",
        "pillar": "general",
        "order": 5,
        "slug": "onecare-sequencing-autopsy",
        "title": "Sequencing Failure — The OneCare Autopsy",
        "summary": "OneCare Vermont's decade-long collapse is the clearest documented sequencing failure in recent US health policy. This lesson dissects the three compounding errors and shows how Act 68 was written as the direct structural response.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["onecare", "vermont", "sequencing-failure", "aco", "act-68"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p5a", "text": "Identify the three sequencing failures in OneCare's design and the pillar each corresponds to"},
            {"id": "obj_5p5b", "text": "Explain the 'Managing Blind' failure mode and why data timeliness is as critical as data integration"},
            {"id": "obj_5p5c", "text": "Trace how the three failures compounded into a self-reinforcing cascade"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "A failure worth reading precisely",
             "body": "OneCare Vermont was founded in 2013 by the University of Vermont Medical Center and Dartmouth-Hitchcock Medical Center as a shared ACO vehicle, later becoming the lead entity under Vermont's federal All-Payer ACO Model — a Total Cost of Care arrangement holding the ACO financially accountable for the spending of an attributed Vermont population. It wound down at the close of 2025, twelve years after founding; the federal all-payer agreement that defined its most consequential years ran about eight of those years before its scheduled sunset.\n\nThe useful conclusion is not the popular, generic version of this story — 'an ACO with voluntary participation inevitably lets high-cost actors free-ride.' That is a plausible-sounding mechanism, but it is not what the documented record shows happened in Vermont specifically. The real mechanisms were more specific, more structural, and more instructive: a federal court ruling that limited how far Vermont's mandate could legally reach, one very large and named payer's documented exit, and an analytics gap the organization itself admitted to regulators. Naming the real mechanisms precisely is what makes this case instructive rather than merely cautionary."},
            {"type": "text", "heading": "Failure 1 — a Policy foundation the state could not fully build",
             "body": "In 2016, the U.S. Supreme Court decided Gobeille v. Liberty Mutual Insurance Co., 6–2, holding that ERISA preempts a Vermont law requiring health plans — including self-insured employer plans — to report claims data into the state's all-payer claims database. The practical effect: Vermont could not compel every private payer to participate in its data and payment infrastructure the way it could compel state-regulated entities. The 'all-payer' concept had a hole in it from a federal constitutional ruling, years before OneCare's later troubles, and no subsequent Vermont statute could legislate around it.\n\nThat structural gap became concrete on January 1, 2023, when Blue Cross Blue Shield of Vermont — the state's largest insurer — declined to renew its OneCare contract, removing roughly 93,000 enrollees, about a third of OneCare's total enrollment, in a single step. Blue Cross's stated reasons were specific: it objected to OneCare's plan to subcontract data analytics to UVM Health Network, a competitor, without what it considered adequate contractual protection for its members' claims data, and it reported seeing no evidence among its members of progress on health outcomes or cost of care.\n\nThis is a real Policy-pillar failure, but not the one the generic story tells. It was not a hospital quietly protecting admission revenue. It was a federal ruling constraining how binding Vermont's own mandate could be, followed by the state's single largest payer making a documented, reasoned exit that removed a third of the population the model needed to manage."},
            {"type": "text", "heading": "Failure 2 — Economics without Technology: 'Managing Blind'",
             "body": "OneCare took on real total-cost-of-care financial risk without the mature integrated analytics that risk requires to manage well. This is documented from two directions rather than one invented statistic. First, OneCare's own staff told Green Mountain Care Board regulators, in a budget presentation, that its data analytics system was not as effective as newer software UVM Health Network was in the process of adopting — an admission of the gap from inside the organization, not an outside estimate.\n\nSecond, the state auditor's office documented what that gap produced. A 2019 audit found OneCare 'did not reliably monitor or accurately report' the community-based programs it had promised to fund — fresh produce for patients, housing assistance for homeless families, care coordination — producing no evidence of results from investments it had already made. A subsequent analysis found that Vermonters attributed to OneCare visited the emergency department at a rate roughly 36% higher than peer ACOs nationally, had about 18% fewer primary care visits, and paid roughly 30% more for prescription drugs — the utilization signature of a population that was not, in practice, being proactively managed.\n\nThat is the Managing Blind failure mode in its documented form: real financial risk assumed under a total-cost model, next to an analytics capability the organization's own regulators and its own staff acknowledged was not adequate to manage that risk."},
            {"type": "text", "heading": "Why timeliness is not a lesser form of accuracy",
             "body": "The mechanism behind Managing Blind is general even where a specific day-count for OneCare's own claims lag isn't independently documented: consider, hypothetically, a care manager responsible for 500 high-risk patients under a total-cost model. If her data arrives two months late, she learns in March that a patient was hospitalized in January; the intervention window closed before she knew it existed.\n\nIf integrated clinical and claims feeds update daily instead, the same care manager sees that a patient filled a new prescription last week, had an abnormal lab result three days ago, and has not seen their primary care provider in six months. She can call today, before the admission. Same patient, same data elements, entirely different program — the variable is latency. OneCare's documented utilization pattern (elevated ED use, reduced primary care contact) is consistent with exactly this failure mode, whatever the organization's precise internal lag turned out to be."},
            {"type": "comparison_table", "heading": "Failure 3 — the cascade", "rows": [
                {"label": "Policy gap", "left": "Gobeille v. Liberty Mutual (2016) limited how far Vermont's mandate could legally reach into self-insured plans", "right": "Blue Cross Blue Shield of Vermont exits (Jan. 2023) → ~93,000 enrollees, about a third of the total, removed at once"},
                {"label": "Technology gap", "left": "OneCare's own staff told GMCB its analytics lagged newer available systems", "right": "36% higher ED visits and 18% fewer primary care visits than peer ACOs — care managed reactively, not proactively"},
                {"label": "Economics gap", "left": "Real total-cost risk assumed on top of both gaps above", "right": "Financial results become genuinely contested across analyses → harder to justify further investment in the missing capability"},
                {"label": "System-level", "left": "Three gaps compounding over the federal agreement's ~8-year run", "right": "Wind-down at the close of 2025. The failure was structural — no single management decision could reverse a federal court ruling or rebuild analytics overnight."},
            ]},
            {"type": "text", "heading": "The financial verdict is contested, not clean",
             "body": "It would be tidy to end this case with a single number. The documented record does not offer one. OneCare's administrative costs ran $70.35 million from 2018 through 2022. One projection found the ACO's total cost of care ran $42.28 million higher than a no-ACO counterfactual over the period studied — $89.56 million higher excluding the pandemic-distorted year. Vermont's State Auditor separately found more than $25 million in additional spending on ACO operations from 2017 through 2020 compared with traditional fee-for-service.\n\nOther analyses, measured differently, point the other way. One calculation found $18.23 million in net savings — though excluding 2020 from that same calculation flips it to a $32.38 million cost. A Medicaid-specific measure found $21.43 million in savings under that program alone. These are not rounding differences; they come from genuinely different methodological choices about which years, which payers, and which cost categories to include.\n\nThe honest conclusion is not 'OneCare saved money' or 'OneCare wasted money' — it is that a Total Cost of Care model without a fully resolved Policy mandate and a fully resolved Technology base produced a record ambiguous enough that reasonable, independent analyses reached opposite headline conclusions from the same underlying program."},
            {"type": "text", "heading": "Act 68 as the structural answer — and what it doesn't answer",
             "body": "Vermont's legislative response is the clearest evidence the state read this history and drew a structural conclusion. Act 68 of 2025 makes reference-based pricing mandatory for all Vermont hospitals beginning FY2027, and hospital global budgets mandatory beginning FY2028. This is not an incremental improvement on OneCare's voluntary model — it eliminates the hospital-side opt-out that made the earlier model's cost control incomplete.\n\nWhat Act 68 cannot do is repeal Gobeille v. Liberty Mutual. It binds Vermont hospitals; it has no power to compel a self-insured employer plan to participate in the state's data or payment infrastructure, because that limit is a matter of federal ERISA preemption, not state statute. Vermont's mandate is now real and binding on the hospital side — the Policy failure this lesson opened with — while the payer-side gap that let Blue Cross Blue Shield walk away in 2023 remains a standing federal constraint no state law can close on its own. Whether the AHS–GMCB analytics capability is genuinely operational before FY2028 global budgets take effect is the second open question the framework tells you to watch."},
            {"type": "callout", "variant": "tip", "heading": "The lesson underneath the lesson",
             "body": "Notice what changed between the popular version of this story ('voluntary participation let costly actors free-ride') and the documented one (a 2016 Supreme Court ruling, a named payer's exit with stated reasons, an organization's own admission to its regulator). The generic version isn't unreasonable as a general principle — it's the same logic tested in this course's other case studies — but it is not what the record shows happened here, in this level of specific detail. Before you cite a failure as your evidence for a diagnostic claim, ask whether you have the documented mechanism or the convenient one. They are not always the same story."},
        ],
        "quiz": {
            "id": "quiz_5p_onecare", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p5a", "type": "single_choice", "points": 1,
                 "question": "What was the documented, named event behind OneCare's Policy-pillar failure — as opposed to the generic 'voluntary participation lets costly actors free-ride' story?",
                 "explanation": "Gobeille v. Liberty Mutual (2016) limited how far Vermont's mandate could legally reach into self-insured plans, and Blue Cross Blue Shield of Vermont — the state's largest insurer — declined to renew for 2023, removing about 93,000 enrollees (roughly a third of OneCare's total) in one step, citing data-protection concerns and a lack of evidence of improved outcomes or cost.",
                 "options": [
                     {"id": "o_5p5a1", "text": "A 2016 Supreme Court ruling constrained the mandate's reach, and Vermont's largest insurer then exited, removing about a third of enrollment", "isCorrect": True},
                     {"id": "o_5p5a2", "text": "A large Vermont hospital withdrew from OneCare to protect its admission revenue", "isCorrect": False, "explanation": "No such hospital withdrawal is documented in the record — this is the plausible-sounding but unverified version of the story."},
                     {"id": "o_5p5a3", "text": "CMS terminated the federal all-payer agreement early", "isCorrect": False, "explanation": "The federal All-Payer Model agreement ran its planned course and sunset at the end of 2025 — it wasn't cut short by CMS."},
                     {"id": "o_5p5a4", "text": "Providers were never given the option to join", "isCorrect": False, "explanation": "Participation was voluntary and, at its peak, included all of Vermont's hospitals and thousands of providers — the failure was in payer participation, not provider access."},
                 ]},
                {"id": "q_5p5b", "type": "single_choice", "points": 1,
                 "question": "What documented evidence supports OneCare's 'Managing Blind' failure mode?",
                 "explanation": "OneCare's own staff told GMCB regulators its analytics lagged newer available systems, and the State Auditor found OneCare-attributed patients had about 36% higher ED visit rates and 18% fewer primary care visits than peer ACOs — the utilization signature of reactive rather than proactive care management.",
                 "options": [
                     {"id": "o_5p5b1", "text": "OneCare's own admission of an analytics gap, plus auditor-documented ED and primary-care utilization patterns", "isCorrect": True},
                     {"id": "o_5p5b2", "text": "A published, precise claims-lag figure specific to OneCare's own systems", "isCorrect": False, "explanation": "No independently documented day-count for OneCare's specific claims lag exists in the public record — the evidence is the utilization pattern and the organization's own admission, not a specific lag statistic."},
                     {"id": "o_5p5b3", "text": "A finding that OneCare lacked a board-approved strategic plan", "isCorrect": False, "explanation": "The documented failure is analytical capacity, not governance structure."},
                     {"id": "o_5p5b4", "text": "A finding that OneCare contracted with too few payers", "isCorrect": False, "explanation": "Payer count is not the documented mechanism — losing one very large payer's enrollment is a separate, Policy-pillar issue."},
                 ]},
                {"id": "q_5p5c", "type": "single_choice", "points": 1,
                 "question": "Act 68 makes reference-based pricing and hospital global budgets mandatory for all Vermont hospitals. Which part of OneCare's documented Policy failure does this leave unresolved?",
                 "explanation": "Act 68 binds Vermont hospitals, but it cannot override Gobeille v. Liberty Mutual's federal ERISA preemption — Vermont still cannot compel a self-insured employer plan to participate in the state's data or payment infrastructure the way it can now compel hospitals.",
                 "options": [
                     {"id": "o_5p5c1", "text": "The payer-side gap exposed by Gobeille v. Liberty Mutual — Vermont still cannot compel self-insured plans to participate", "isCorrect": True},
                     {"id": "o_5p5c2", "text": "Nothing — Act 68 resolves every mandate gap OneCare exposed", "isCorrect": False, "explanation": "Act 68 is a state statute binding Vermont hospitals; it has no authority over federal ERISA preemption of self-insured plans."},
                     {"id": "o_5p5c3", "text": "The requirement that hospitals report cost data to VHCURES", "isCorrect": False, "explanation": "VHCURES reporting is a separate, already-established requirement, not the gap this lesson is about."},
                     {"id": "o_5p5c4", "text": "Whether hospitals can set their own prices", "isCorrect": False, "explanation": "Reference-based pricing is precisely the mechanism that ends hospitals setting their own prices — that gap is what Act 68 does resolve."},
                 ]},
                {"id": "q_5p5d", "type": "single_choice", "points": 1,
                 "question": "Independent analyses of OneCare's financial record reached different headline conclusions — one found $18.23 million in savings, while excluding 2020 from that same calculation showed a $32.38 million cost, and the State Auditor separately found more than $25 million in extra ACO operating costs from 2017–2020. What is the most defensible summary?",
                 "explanation": "These are not rounding differences — they reflect genuinely different methodological choices about which years and cost categories to include. The honest conclusion is that the record is contested, not a clean success or a clean failure.",
                 "options": [
                     {"id": "o_5p5d1", "text": "The financial record is genuinely mixed and sensitive to methodology — not a clean success or failure", "isCorrect": True},
                     {"id": "o_5p5d2", "text": "OneCare conclusively saved Vermont money overall", "isCorrect": False, "explanation": "At least one measure, excluding 2020, shows a net cost rather than savings under the same methodology."},
                     {"id": "o_5p5d3", "text": "OneCare conclusively cost Vermont money with no offsetting benefit", "isCorrect": False, "explanation": "A Medicaid-specific measure found $21.43 million in savings — the record isn't uniformly negative either."},
                     {"id": "o_5p5d4", "text": "The financial results were never independently studied", "isCorrect": False, "explanation": "Multiple independent analyses — the State Auditor, outside evaluators, and Vermont's own regulators — studied the program repeatedly over its run."},
                 ]},
                {"id": "q_5p5e", "type": "single_choice", "points": 1,
                 "question": "What did Gobeille v. Liberty Mutual (2016) establish, and why does it matter for a state-level all-payer mandate?",
                 "explanation": "The Supreme Court held that ERISA preempts a state law compelling self-insured health plans to report claims data to a state database — meaning a state cannot legally force every private payer into its all-payer data and payment infrastructure, regardless of how the state statute is written.",
                 "options": [
                     {"id": "o_5p5e1", "text": "ERISA preempts states from compelling self-insured health plans to report claims data to a state database", "isCorrect": True},
                     {"id": "o_5p5e2", "text": "States may require any health plan, including self-insured ones, to join a state ACO model", "isCorrect": False, "explanation": "This is the opposite of the ruling — the Court limited state authority over self-insured plans."},
                     {"id": "o_5p5e3", "text": "Hospitals may set their own reimbursement rates without state oversight", "isCorrect": False, "explanation": "The ruling concerns payer data-reporting mandates under ERISA, not hospital pricing authority."},
                     {"id": "o_5p5e4", "text": "CMS must approve every state all-payer model before it can begin", "isCorrect": False, "explanation": "The ruling is about ERISA preemption of state law, not about a federal approval process for all-payer models."},
                 ]},
            ],
        },
    },
]

POLICY = [
    {
        "id": "lesson_5p_reform_cascade",
        "trackId": "track_5p_policy",
        "pillar": "policy",
        "order": 1,
        "slug": "legislative-architecture-reform-cascade",
        "title": "Legislative Architecture: Act 167 → Act 51 → Act 68",
        "summary": "Vermont built its mandate in three deliberate steps — diagnose, pilot, compel. This lesson traces the reform cascade and shows why each act created the political capacity for the next.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["act-167", "act-68", "act-51", "vermont", "reform-cascade", "policy"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p6a", "text": "Describe what each of Acts 167, 51 and 68 did, and why the order mattered"},
            {"id": "obj_5p6b", "text": "Explain how the Oliver Wyman diagnostic process built the legitimacy that made a binding mandate survivable"},
            {"id": "obj_5p6c", "text": "Recognize a reform cascade as a transferable design pattern, not a Vermont accident"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "The question every reform eventually faces",
             "body": "Every state's reform effort confronts the same architectural question: which provisions are aspirational, and which are binding? A reform agenda that depends on voluntary participation by the actors with the most to lose will, with near certainty, be defeated by exactly those actors.\n\nThis is not a Vermont-specific risk. It is the central design problem of structural healthcare reform anywhere, and it is why the Policy pillar comes first in the sequence. What makes Vermont worth studying in detail is that Acts 167, 51 and 68 show with unusual legislative specificity what it takes to convert aspiration into something binding."},
            {"type": "comparison_table", "heading": "The cascade", "rows": [
                {"label": "Act 167 (2022)", "left": "The diagnostic mandate", "right": "Commissioned a system-wide analysis, directed AHS/GMCB to develop a federal multi-payer model proposal, and mandated design work on hospital global budgets."},
                {"label": "Act 51 (2023)", "left": "The planning mandate", "right": "Authorized AHS hospital transformation planning pilots with up to four hospitals — moving from diagnosis to structured planning."},
                {"label": "Act 68 (2025)", "left": "The operational mandate", "right": "Made reference-based pricing mandatory (FY2027) and hospital global budgets mandatory (FY2028), with a December 2028 Statewide Strategic Plan deadline."},
            ]},
            {"type": "text", "heading": "Why the diagnosis had to come first",
             "body": "Act 167's three directives were analytically linked. You cannot design a credible global budget without understanding each hospital's actual cost structure and community role, and you cannot negotiate a federal model without a clear picture of total cost of care and where it diverges from benchmarks.\n\nBut the deeper reason for sequencing diagnosis ahead of mandate is political, not analytical. Publishing recommendations to close or restructure named services at named community hospitals is not analytically difficult — it is politically treacherous. Communities organize around their local hospitals."},
            {"type": "key_stat", "stats": [
                {"value": "$1.05M", "label": "Fixed-price Oliver Wyman engagement, Aug 2023–Sept 2024", "source": "GMCB"},
                {"value": "230+", "label": "Meetings across all 14 Hospital Service Areas", "source": "Oliver Wyman"},
                {"value": "3,100+", "label": "Participants from over 100 organizations", "source": "Oliver Wyman"},
                {"value": "9 of 14", "label": "Vermont hospitals documented in operating losses", "source": "Oliver Wyman, Aug 2024"},
            ]},
            {"type": "callout", "variant": "info", "heading": "Listen first, diagnose second, recommend third",
             "body": "The Vermont process front-loaded community engagement before recommendations — establishing community meetings not as forums for defending the status quo, but as inputs to a shared diagnosis. That sequencing produced findings with enough public legitimacy to survive the inevitable backlash from hospitals whose specific services were named for restructuring. The design philosophy is transferable: move from hospital-centered point solutions to systematic redesign, from individual stakeholder consultation to community-driven process, and from post-crisis remedy to pre-planned transformation."},
            {"type": "text", "heading": "Goals that outlive the bill",
             "body": "Act 167 established five statutory goals: reduce inefficiencies; lower costs; improve health outcomes; reduce health inequities; and increase access to essential services.\n\nThese matter not as aspirational language but as operational accountability criteria embedded in everything downstream. AHS's monthly reports to the legislature track progress against them. The GMCB hospital budget review references them. The Rural Health Transformation Program application maps each proposed initiative to them. Act 68's Statewide Strategic Plan will be measured against them. That is how statutory goal-setting works when properly designed — not as a preamble, but as a persistent accountability structure that outlives the bill that created it."},
        ],
        "quiz": {
            "id": "quiz_5p_cascade", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p6a", "type": "single_choice", "points": 1,
                 "question": "What was the primary function of Act 167 (2022) in Vermont's reform cascade?",
                 "explanation": "Act 167 was the diagnostic mandate — commissioning the system-wide analysis and directing design work that later acts would operationalize.",
                 "options": [
                     {"id": "o_5p6a1", "text": "Commissioning a system-wide diagnostic and mandating global budget design work", "isCorrect": True},
                     {"id": "o_5p6a2", "text": "Making global budgets mandatory for all hospitals", "isCorrect": False, "explanation": "That was Act 68, three years later."},
                     {"id": "o_5p6a3", "text": "Authorizing transformation pilots with four hospitals", "isCorrect": False, "explanation": "That was Act 51 of 2023."},
                     {"id": "o_5p6a4", "text": "Signing Vermont into the federal AHEAD model", "isCorrect": False, "explanation": "The AHEAD State Agreement was a separate federal action in January 2025."},
                 ]},
                {"id": "q_5p6b", "type": "single_choice", "points": 1,
                 "question": "Why did the Oliver Wyman process front-load community engagement before publishing recommendations?",
                 "explanation": "Recommending closure or restructuring of named services at named community hospitals is politically treacherous; engaging communities as inputs to a shared diagnosis gave the findings enough legitimacy to survive the backlash.",
                 "options": [
                     {"id": "o_5p6b1", "text": "To build enough public legitimacy for the findings to survive predictable political backlash", "isCorrect": True},
                     {"id": "o_5p6b2", "text": "To satisfy a federal public-comment requirement", "isCorrect": False, "explanation": "The driver was political legitimacy, not a federal procedural rule."},
                     {"id": "o_5p6b3", "text": "To reduce the cost of the engagement", "isCorrect": False, "explanation": "230+ meetings increased cost; the rationale was legitimacy."},
                     {"id": "o_5p6b4", "text": "Because hospitals refused to participate otherwise", "isCorrect": False, "explanation": "Hospital leadership sessions were part of the process, not a precondition for it."},
                 ]},
                {"id": "q_5p6c", "type": "true_false", "points": 1,
                 "question": "Act 167's five statutory goals functioned mainly as preamble language with no operational role after the bill passed.",
                 "explanation": "The opposite: they became the persistent accountability framework used in AHS's monthly legislative reports, GMCB budget review, the RHT application, and the Statewide Strategic Plan.",
                 "options": [
                     {"id": "o_5p6c1", "text": "False", "isCorrect": True},
                     {"id": "o_5p6c2", "text": "True", "isCorrect": False, "explanation": "They are referenced as operational accountability criteria across every downstream process."},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_mandatory_architecture",
        "trackId": "track_5p_policy",
        "pillar": "policy",
        "order": 2,
        "slug": "voluntary-vs-mandatory-architecture",
        "title": "Voluntary vs. Mandatory — Why Architecture Beats Ambition",
        "summary": "Act 68's reference-based pricing provisions are the sharpest available example of converting reform from invitation to requirement. This lesson examines the pricing problem it addresses and what 'mandatory' means in practice.",
        "estimatedMinutes": 20,
        "isPublished": True,
        "tags": ["act-68", "reference-based-pricing", "mandatory-architecture", "hospital-pricing", "policy"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p7a", "text": "Explain the difference between inviting and directing, in statutory language"},
            {"id": "obj_5p7b", "text": "Describe the commercial pricing variation that reference-based pricing is designed to compress"},
            {"id": "obj_5p7c", "text": "Read a statutory deadline as an organizational forcing function"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "The act does not invite",
             "body": "Act 68's reference-based pricing provisions represent a departure from the voluntary, incentive-based payment reform that dominated American health policy for the previous fifteen years. The act does not invite hospitals to experiment with alternative pricing — it directs the Green Mountain Care Board to establish, by rule, maximum amounts that hospitals shall accept as payment in full, not later than hospital fiscal year 2027.\n\nThe language is mandatory and statewide. That single grammatical difference — shall accept, rather than may elect — is the entire Policy pillar in miniature."},
            {"type": "text", "heading": "The pricing problem underneath",
             "body": "The problem RBP addresses is more severe than most national discussion of hospital pricing acknowledges. Vermont hospitals charge commercial payers roughly 250–300% of Medicare rates on average — but that average conceals extraordinary variation.\n\nOutpatient imaging at some Vermont hospitals reaches 715–944% of Medicare. Inpatient mental health services at the same hospitals range from 123% to 409%. UVMMC outpatient charges averaged 417% of Medicare in 2022 — among the highest in the nation. Hospitals are not clustered near a rational break-even point; they are distributed from roughly profitable to wildly extractive, with no relationship between price and quality."},
            {"type": "key_stat", "stats": [
                {"value": "250–300%", "label": "Average Vermont commercial prices as share of Medicare", "source": "GMCB, Feb 2026"},
                {"value": "715–944%", "label": "Outpatient imaging at some hospitals, vs. Medicare", "source": "GMCB"},
                {"value": "417%", "label": "UVMMC outpatient average, 2022", "source": "GMCB"},
                {"value": "136%", "label": "Approximate rational break-even benchmark", "source": "GMCB"},
            ]},
            {"type": "callout", "variant": "info", "heading": "Deadlines as forcing functions",
             "body": "Act 68's timeline is deliberately irreversible: reference-based pricing mandatory for commercial payers in FY2027; commercial hospital global budgets effective January 2028; global budgets for non-Critical Access Hospitals in FY2028; the Statewide Strategic Plan delivered to the Legislature in December 2028; and global budgets for all hospitals including CAHs by FY2030. Organizations build the capacity to execute complex initiatives when they have non-negotiable deadlines, not when they have good intentions. This is the Policy → Operations dependency at work."},
            {"type": "text", "heading": "Traceable to the diagnosis",
             "body": "Signed by Governor Scott on June 12, 2025, Act 68 is the legislative operationalization of the Oliver Wyman diagnosis, and the mapping is direct. Oliver Wyman recommended moving to reference-based pricing at 200% of Medicare or less; Act 68 mandated it by FY2027. Oliver Wyman recommended global budgets once conditions for success were met; Act 68 required them for non-CAH hospitals by FY2028 and all hospitals by FY2030. Oliver Wyman recommended GMCB add a Division of Planning and Effectiveness; Act 68 authorized three new permanent classified positions. Oliver Wyman recommended reviewing AHS structure; Act 68 directed the Statewide Strategic Plan.\n\nThis traceability is what a functioning Policy pillar looks like: a diagnosis that produces specific recommendations, and legislation that converts each one into a binding requirement with a date attached."},
        ],
        "quiz": {
            "id": "quiz_5p_mandatory", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p7a", "type": "single_choice", "points": 1,
                 "question": "What makes Act 68's reference-based pricing provision structurally different from fifteen years of prior payment reform?",
                 "explanation": "It directs GMCB to set maximum amounts hospitals shall accept as payment in full — mandatory and statewide, rather than an invitation to participate voluntarily.",
                 "options": [
                     {"id": "o_5p7a1", "text": "It is mandatory and statewide rather than voluntary and incentive-based", "isCorrect": True},
                     {"id": "o_5p7a2", "text": "It applies only to Medicare patients", "isCorrect": False, "explanation": "The FY2027 mandate applies to commercial payers."},
                     {"id": "o_5p7a3", "text": "It offers larger financial incentives for participation", "isCorrect": False, "explanation": "It removes the choice rather than sweetening it."},
                     {"id": "o_5p7a4", "text": "It was negotiated directly with individual hospitals", "isCorrect": False, "explanation": "It is established by GMCB rule, statewide."},
                 ]},
                {"id": "q_5p7b", "type": "single_choice", "points": 1,
                 "question": "What does the range from 123% to 944% of Medicare across Vermont hospital services primarily demonstrate?",
                 "explanation": "The variation shows prices are not clustered around a rational break-even point and bear no consistent relationship to quality — which is the case for compressing them toward a reference.",
                 "options": [
                     {"id": "o_5p7b1", "text": "Prices vary enormously with no consistent relationship to quality", "isCorrect": True},
                     {"id": "o_5p7b2", "text": "Higher-priced hospitals deliver measurably better outcomes", "isCorrect": False, "explanation": "The data shows no such relationship."},
                     {"id": "o_5p7b3", "text": "Medicare rates are set too low across the board", "isCorrect": False, "explanation": "The point is variation among commercial prices, not the Medicare benchmark."},
                     {"id": "o_5p7b4", "text": "Most hospitals price near the 136% break-even benchmark", "isCorrect": False, "explanation": "They are distributed far above it, not clustered near it."},
                 ]},
                {"id": "q_5p7c", "type": "single_choice", "points": 1,
                 "question": "In five-pillar terms, what is the function of Act 68's non-negotiable statutory deadlines?",
                 "explanation": "Policy → Operations: statutory deadlines are organizational forcing functions that compel agencies to build execution capacity they would otherwise defer.",
                 "options": [
                     {"id": "o_5p7c1", "text": "They force the Operations pillar to build execution capacity on a fixed timetable", "isCorrect": True},
                     {"id": "o_5p7c2", "text": "They allow hospitals to phase participation voluntarily", "isCorrect": False, "explanation": "The deadlines are deliberately irreversible."},
                     {"id": "o_5p7c3", "text": "They satisfy CMS reporting conditions for AHEAD", "isCorrect": False, "explanation": "They are state statutory deadlines, not federal reporting conditions."},
                     {"id": "o_5p7c4", "text": "They give GMCB discretion over the implementation date", "isCorrect": False, "explanation": "The dates are fixed in statute."},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_federal_interface",
        "trackId": "track_5p_policy",
        "pillar": "policy",
        "order": 3,
        "slug": "cmmi-waivers-federal-state-interface",
        "title": "CMMI Models, Waivers, and the Federal–State Interface",
        "summary": "State reform runs on federal authority and federal money. This lesson covers Section 1115 waiver power, what it can and cannot do, and why transformation capital is a Policy-pillar outcome rather than an Economics one.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["1115-waiver", "cmmi", "ahead-model", "federal-state", "medicaid", "policy"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-07T00:00:00Z",
        "updatedAt": "2026-09-07T00:00:00Z",
        "objectives": [
            {"id": "obj_5p8a", "text": "Describe what Section 1115 waiver authority enables and where its limits sit"},
            {"id": "obj_5p8b", "text": "Explain why transformation capital is a Policy-pillar outcome, not an Economics-pillar one"},
            {"id": "obj_5p8c", "text": "Distinguish transformation capital from incentive architecture, and say why conflating them produces unsustainable programs"},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "The most powerful federal tool a state has",
             "body": "Section 1115 of the Social Security Act gives CMS authority to waive certain Medicaid requirements and provide federal matching funds for experimental programs that promote program objectives. For a state attempting comprehensive reform, the 1115 waiver is the most powerful federal policy tool available — it lets a state design Medicaid programs that standard federal rules would not permit, test new benefits and delivery models, and demonstrate approaches that can become national policy if they work.\n\nVermont's Global Commitment to Health demonstration extends coverage and benefits beyond standard state plan requirements, enabling health-related social needs services, expanded developmental disability benefits, and substance use disorder treatment models unavailable under the standard state plan."},
            {"type": "callout", "variant": "info", "heading": "Capital comes from policy, not from the payment model",
             "body": "Vermont's AHEAD State Agreement (January 2025) committed the state to Cohort 2 with up to $150M per year in EAST Fund support over an eight-year performance period. The $195 million Rural Health Transformation award is likewise a Policy-pillar outcome, not an Economics-pillar one. Transformation capital comes from policy and regulatory relationships — waiver negotiations, model agreements, grant awards — not from the payment model itself. Organizations that expect the payment model to fund its own build have misread where the money originates."},
            {"type": "text", "heading": "Two kinds of money, easily confused",
             "body": "The distinction that matters most here is between transformation capital and incentive architecture.\n\nTransformation capital — the RHT award, the EAST Fund — is time-limited bridge funding for infrastructure. It builds the thing. Incentive architecture — global budgets, reference-based pricing — is permanent structural change to the payment environment. It changes the financial logic organizations operate under, indefinitely.\n\nConfusing the two produces unsustainable programs: an organization funds recurring operating costs from a time-limited award, then faces a cliff when the award ends and no structural change has occurred to carry the cost."},
            {"type": "comparison_table", "heading": "Transformation capital vs. incentive architecture", "rows": [
                {"label": "Transformation capital", "left": "RHT award, EAST Fund, grant programs", "right": "Time-limited bridge funding for infrastructure. Builds capability. Ends."},
                {"label": "Incentive architecture", "left": "Global budgets, reference-based pricing", "right": "Permanent change to the payment environment. Reshapes financial logic. Persists."},
                {"label": "Failure mode", "left": "Funding operations from capital", "right": "Cliff when the award ends and nothing structural has changed to carry the cost."},
            ]},
            {"type": "text", "heading": "Reading the federal environment as a constraint",
             "body": "The federal interface is not only a source of authority and funding — it is also a source of risk that state strategy has to absorb. H.R. 1, signed July 4, 2025, carries roughly $911 billion in Medicaid reductions over ten years along with work requirements, with projections of about 10 million additional uninsured by 2034.\n\nA state reform architecture that assumes a stable federal financing environment is fragile by construction. The Policy pillar's job is not only to obtain authority and capital, but to build a structure that survives changes in both."},
        ],
        "quiz": {
            "id": "quiz_5p_federal", "passingScore": 75, "shuffleOptions": True,
            "questions": [
                {"id": "q_5p8a", "type": "single_choice", "points": 1,
                 "question": "Vermont's $195M Rural Health Transformation award is best classified as an outcome of which pillar?",
                 "explanation": "Transformation capital comes from policy and regulatory relationships — waiver negotiations, model agreements, grant awards — not from the payment model itself.",
                 "options": [
                     {"id": "o_5p8a1", "text": "Policy", "isCorrect": True},
                     {"id": "o_5p8a2", "text": "Economics", "isCorrect": False, "explanation": "The payment model did not generate this capital; a policy relationship did."},
                     {"id": "o_5p8a3", "text": "Operations", "isCorrect": False, "explanation": "Operations will spend it, but Policy secured it."},
                     {"id": "o_5p8a4", "text": "Technology", "isCorrect": False, "explanation": "Some of it funds technology, but the award itself is a policy outcome."},
                 ]},
                {"id": "q_5p8b", "type": "single_choice", "points": 1,
                 "question": "What is the characteristic failure produced by confusing transformation capital with incentive architecture?",
                 "explanation": "Funding recurring operating costs from time-limited bridge funding creates a cliff: the award ends, and no structural change has occurred to carry the cost.",
                 "options": [
                     {"id": "o_5p8b1", "text": "Recurring costs get funded from time-limited money, producing a cliff when it ends", "isCorrect": True},
                     {"id": "o_5p8b2", "text": "The state loses federal matching funds", "isCorrect": False, "explanation": "The failure is about sustainability, not match eligibility."},
                     {"id": "o_5p8b3", "text": "Hospitals refuse to participate in the payment model", "isCorrect": False, "explanation": "Participation is a separate, Policy-mandate question."},
                     {"id": "o_5p8b4", "text": "Quality measures cannot be reported", "isCorrect": False, "explanation": "Unrelated to the capital/architecture distinction."},
                 ]},
                {"id": "q_5p8c", "type": "single_choice", "points": 1,
                 "question": "Which is a legitimate use of Section 1115 waiver authority?",
                 "explanation": "1115 waivers permit coverage expansions and benefit structures beyond the standard state plan — Vermont's Global Commitment demonstration enables HRSN services and expanded SUD treatment models.",
                 "options": [
                     {"id": "o_5p8c1", "text": "Enabling health-related social needs services not available under the standard state plan", "isCorrect": True},
                     {"id": "o_5p8c2", "text": "Overriding a state's own hospital rate-setting statute", "isCorrect": False, "explanation": "1115 waives federal Medicaid requirements, not state law."},
                     {"id": "o_5p8c3", "text": "Exempting a state from all federal reporting", "isCorrect": False, "explanation": "Waivers carry their own substantial reporting and evaluation obligations."},
                     {"id": "o_5p8c4", "text": "Converting Medicaid to a block grant unilaterally", "isCorrect": False, "explanation": "That is beyond 1115 demonstration authority."},
                 ]},
            ],
        },
    },
]

LESSONS_BY_TRACK = {
    "track_5p_foundations": FOUNDATIONS,
    "track_5p_policy": POLICY,
    "track_5p_technology": [],
    "track_5p_economics": [],
    "track_5p_clinical": [],
    "track_5p_operations": [],
    "track_5p_equity": [],
    "track_5p_sustain": [],
}


# ── Book cross-references ───────────────────────────────────────────────────
# The book points into the Academy through each chapter's "GO DEEPER — ACADEMY"
# section. This closes the other half of that loop: every lesson ends with a
# pointer back to the chapter it teaches, so the two halves of the ecosystem
# reference each other rather than the book linking one way into silence.
#
# Keyed by lesson slug. Chapter slugs follow /read/[slug] — numeric chapters are
# zero-padded ("chapter-01"), per chapterToSlug() in lib/narration.ts.
BOOK_REFS = {
    "why-single-pillar-thinking-fails": (
        "Chapter 1",
        "chapter-01",
        "This lesson works the opening argument of Chapter 1 — the CMMI record and why "
        "interventions that address a single pillar keep running into the constraints of "
        "the ones they ignore.",
    ),
    "five-pillars-diagnostic-questions": (
        "Chapter 1",
        "chapter-01",
        "Chapter 1 defines each pillar's diagnostic question and its structural role. "
        "Figure 1.2 is the reference table for what each pillar produces when it is working.",
    ),
    "the-equity-imperative-is-it-just": (
        "Chapters 1 and 10",
        "chapter-10",
        "Chapter 1 introduces the Equity Imperative as the test applied to all five pillars. "
        "Chapter 10 develops it in full — stratified HEDIS, the HEROI Index, and the VBC "
        "equity safeguards that keep payment design from penalizing the providers serving "
        "the hardest-to-reach populations.",
    ),
    "dependency-logic-execution-sequence": (
        "Chapter 1",
        "chapter-01",
        "The dependency matrix in Figure 1.3 is this lesson's source — nine directed "
        "relationships, read row-pillar to column-pillar, with ENABLES, REQUIRES, DRIVES "
        "and the two feedback loops that make the system self-correcting.",
    ),
    "onecare-sequencing-autopsy": (
        "Chapter 1",
        "chapter-01",
        "Chapter 1 works the OneCare Vermont collapse as three compounding sequencing "
        "failures and the cascade they produced. It is the canonical case the whole "
        "framework is built to explain.",
    ),
    "legislative-architecture-reform-cascade": (
        "Chapter 2",
        "chapter-02",
        "Chapter 2 is the full legislative history — Act 167's diagnostic mandate, Act 51's "
        "planning authority, and Act 68's operational mandate, plus the Oliver Wyman "
        "engagement that produced the evidence base for all three.",
    ),
    "voluntary-vs-mandatory-architecture": (
        "Chapter 2",
        "chapter-02",
        "Chapter 2 covers the enforcement mechanics behind the mandate — what 'mandatory' "
        "means in practice, what GMCB can actually do, and the reference-based pricing "
        "design that eliminates the opt-out.",
    ),
    "cmmi-waivers-federal-state-interface": (
        "Chapter 3",
        "chapter-03",
        "Chapter 3 is the practitioner's guide to the federal interface — the CMMI model "
        "landscape, Section 1115 waiver negotiation, budget neutrality, and how H.R. 1 "
        "reshaped the Medicaid environment states now operate in.",
    ),
}


def _with_book_ref(lesson):
    """Append the 'From the Book' callout to a lesson, if one is mapped for it.

    Idempotent: re-running the build never stacks duplicate callouts, because the
    block is appended to a fresh copy of the lesson's block list each time.
    """
    ref = BOOK_REFS.get(lesson["slug"])
    if not ref:
        return lesson
    chapter_label, chapter_slug, body = ref
    out = dict(lesson)
    blocks = [b for b in lesson.get("contentBlocks", []) if b.get("_bookRef") is not True]
    blocks.append(
        {
            "type": "callout",
            "variant": "info",
            "heading": f"From the Book — {chapter_label}",
            "body": f"{body}\n\nRead it at /read/{chapter_slug}.",
            "_bookRef": True,
        }
    )
    out["contentBlocks"] = blocks
    return out


def build():
    course = dict(COURSE)
    tracks = []
    for tm in TRACKS_META:
        t = dict(tm)
        t["courseId"] = COURSE["id"]
        t["isPublished"] = False
        t["createdAt"] = "2026-09-07T00:00:00Z"
        t["updatedAt"] = "2026-09-07T00:00:00Z"
        t["lessons"] = [_with_book_ref(l) for l in LESSONS_BY_TRACK[t["id"]]]
        tracks.append(t)
    course["tracks"] = tracks
    OUT.write_text(json.dumps(course, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    total_lessons = sum(len(v) for v in LESSONS_BY_TRACK.values())
    print(f"Wrote {OUT.name}: {len(tracks)} tracks, {total_lessons} lessons.")


if __name__ == "__main__":
    build()
