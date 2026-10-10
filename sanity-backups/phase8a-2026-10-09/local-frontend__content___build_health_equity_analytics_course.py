#!/usr/bin/env python3
"""
_build_health_equity_analytics_course.py — assembles
course_health_equity_analytics.json from the COURSE/TRACK/LESSONS defined
below.

This is the Supabase-facing structure + fallback content_blocks for the new
"Health Equity Analytics" course (methodology/measurement companion to the
existing "Health Equity & SDOH: From Awareness to Action" course). The rich
lesson bodies live in Sanity — see _lessons_health_equity_analytics.py, which
uses CONTENT_TEMPLATE.py's helpers and posts directly.

content_blocks here use the LEGACY Supabase block shapes that
ContentBlockRenderer.tsx actually supports (verified against the component
source before writing this):
  text             {heading?, body}                      (body = markdown)
  key_stat         {heading?, stats:[{value,label,source?}]}
  callout          {variant: info|warning|success, heading?, body}
  comparison_table {heading?, leftLabel, rightLabel, rows:[{label,left,right}]}

Rebuilds the whole file deterministically every run — never hand-edit
course_health_equity_analytics.json directly; edit this script and rerun.

Every statistic, program name, and named case in this file was verified via
WebSearch before writing (2026-09-22) — see Sources blocks in each lesson's
Sanity body (_lessons_health_equity_analytics.py) for the full citation list.
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE / "course_health_equity_analytics.json"

COURSE = {
    "id": "course_health_equity_analytics_v1",
    "slug": "health-equity-analytics",
    "title": "Health Equity Analytics",
    "subtitle": "Measuring Disparity, Scoring SDOH Burden, and Weighting Equity Into the Dollar",
    "description": (
        "A methods course, not an awareness course: how health equity actually gets "
        "measured. Covers disparity decomposition (rate ratios, rate differences, "
        "summary indices), stratified HEDIS/NCQA quality measurement, SDOH burden "
        "scoring (PRAPARE, the CDC/ATSDR Social Vulnerability Index, the Area "
        "Deprivation Index), and equity-weighted economic evaluation (distributional "
        "cost-effectiveness analysis). Built around this platform's own HEROI "
        "(Health Equity Return on Investment) composite score in the Health Equity "
        "Studio as a worked, hands-on example of the five-dimension framework the "
        "course teaches — Access, Quality, Outcome, SDOH Burden, and Trust & "
        "Engagement."
    ),
    "targetAudience": [
        "Population health and quality analysts",
        "Health equity officers and CMOs building an equity measurement program",
        "Data scientists building or auditing disparity/SDOH scoring tools",
        "CFOs and program evaluators assessing equity-focused investment",
        "Readers of Transforming Healthcare who want the Equity Imperative's measurement tools hands-on",
    ],
    "prerequisites": [],
    "estimatedHours": 5,
    "isPublished": False,
    "version": "1.0.0",
    "createdAt": "2026-09-22T00:00:00Z",
    "updatedAt": "2026-09-22T00:00:00Z",
}

TRACK = dict(
    id="track_hea_core", pillar="equity", order=1,
    slug="health-equity-analytics-core",
    title="Health Equity Analytics: Methods and Practice",
    description=(
        "The full measurement stack, in build order: decompose the disparity, "
        "stratify the quality measure, score the SDOH burden, weight it into an "
        "economic case, then close the loop from score to action."
    ),
    icon="chart-bar",
    targetAudience=["Analysts", "Equity officers", "Quality staff"],
    isPublished=True,
)

def obj(i, text):
    return {"id": f"obj_hea{i}", "text": text}

def q_single(qid, question, options, explanation):
    # options: list of (text, is_correct, wrong_explanation_or_None)
    opts = []
    for i, (text, correct, wrong_expl) in enumerate(options, 1):
        o = {"id": f"o_{qid}{i}", "text": text, "isCorrect": correct}
        if not correct and wrong_expl:
            o["explanation"] = wrong_expl
        opts.append(o)
    return {
        "id": f"q_{qid}", "type": "single_choice", "points": 1,
        "question": question, "explanation": explanation, "options": opts,
    }

def q_tf(qid, question, correct_is_false, explanation, wrong_expl):
    opts = [
        {"id": f"o_{qid}1", "text": "False", "isCorrect": correct_is_false},
        {"id": f"o_{qid}2", "text": "True", "isCorrect": not correct_is_false},
    ]
    if correct_is_false:
        opts[1]["explanation"] = wrong_expl
    else:
        opts[0]["explanation"] = wrong_expl
    return {"id": f"q_{qid}", "type": "true_false", "points": 1, "question": question, "explanation": explanation, "options": opts}


LESSONS = []

# ─────────────────────────────────────────────────────────────────────────
# Lesson 1 — Foundations
# ─────────────────────────────────────────────────────────────────────────
LESSONS.append({
    "id": "lesson_hea_measurement_foundations", "trackId": "track_hea_core", "pillar": "equity",
    "order": 1, "slug": "hea-measurement-foundations",
    "title": "From Awareness to Measurement: Why Health Equity Needs Analytics",
    "summary": "Naming a disparity is not the same as measuring it. This lesson introduces the five-dimension analytics framework (Access, Quality, Outcome, SDOH Burden, Trust) this course teaches, the federal measurement infrastructure now built around it, and the data-completeness problems that make measurement harder than it looks.",
    "estimatedMinutes": 20, "isPublished": True,
    "tags": ["measurement", "health-equity", "cms-framework", "ncqa"],
    "relatedLessonIds": [], "createdAt": "2026-09-22T00:00:00Z", "updatedAt": "2026-09-22T00:00:00Z",
    "objectives": [
        obj("1a", "Explain why measurement, not awareness, is the binding constraint on closing a health disparity."),
        obj("1b", "Name the five dimensions of this platform's HEROI composite and what each one measures."),
        obj("1c", "Describe the scale of the federal/NCQA measurement build-out since 2022 and where it has stalled."),
    ],
    "contentBlocks": [
        {"type": "text", "heading": "Measurement is the missing link", "body": "The companion course *Health Equity & SDOH* covers what a disparity is and why it matters. This course starts one step further down the pipeline: once a system has decided a disparity is unjust rather than inevitable, how does it actually measure it — reliably enough to act on, and honestly enough to know when the action worked?\n\nThat is a harder problem than it sounds. A disparity is a gap between two rates. Measuring it well requires a denominator, a reference group, a large enough sample to be confident the gap is real, and a decision about which of several defensible ways to summarize the gap you're going to report. Every one of those choices is a methods decision, and different defensible choices produce different-looking pictures of the same underlying reality."},
        {"type": "callout", "variant": "info", "heading": "Key Concept", "body": "This course treats health equity as a measurement discipline: five analytic dimensions — Access, Quality, Outcome, SDOH Burden, and Trust & Engagement — each with its own data source, its own known weaknesses, and its own place in a composite score."},
        {"type": "key_stat", "heading": "The Measurement Build-Out, 2022–2025", "stats": [
            {"value": "5", "label": "HEDIS measures NCQA required stratified by race/ethnicity, MY2022", "source": "NCQA"},
            {"value": "22", "label": "HEDIS measures stratified by race/ethnicity, MY2024", "source": "NCQA"},
            {"value": "5", "label": "Priorities in the CMS Framework for Health Equity 2022–2032", "source": "CMS Office of Minority Health"},
            {"value": "1.9%", "label": "Inpatient admissions coded with an SDOH Z-code despite CDC/WHO emphasis", "source": "PMC, SDOH Z-code adoption study"},
        ]},
        {"type": "text", "heading": "Five dimensions, one composite", "body": "This platform's own Health Equity Studio computes a HEROI score — Health Equity Return on Investment — as a weighted composite: Access (25%), Quality (25%), Outcome (25%), SDOH Burden (15%), and Trust & Engagement (10%). Every lesson in this course builds toward one of those five dimensions: Lesson 2 is the decomposition math underneath Access/Quality/Outcome, Lesson 3 is how Quality gets stratified in practice, Lesson 4 is SDOH Burden, and Lesson 5 is the weighting logic itself, using HEROI as the worked example.\n\nTry the tool directly at **/research-lab/population-equity?tab=equity** — open the HEROI Composite Score tab to see all five dimensions computed live from the same underlying disparity, geographic-access, and SDOH data this course teaches you to build."},
        {"type": "comparison_table", "heading": "Awareness Course vs. This Course", "leftLabel": "Health Equity & SDOH (awareness)", "rightLabel": "Health Equity Analytics (this course)", "rows": [
            {"label": "Core question", "left": "What is a disparity, and why is it unjust?", "right": "How do you measure it well enough to act on?"},
            {"label": "Primary artifact", "left": "Screening tools, policy requirements", "right": "Decomposed rates, stratified measures, composite scores"},
            {"label": "Audience", "left": "All clinical and policy staff", "right": "Analysts, quality staff, equity officers, CFOs"},
        ]},
        {"type": "callout", "variant": "warning", "heading": "Important", "body": "Federal incentive infrastructure for this measurement work is not moving in one direction. CMS's 2027 Medicare Advantage Star Ratings final rule declined to implement the previously proposed Health Equity Index reward, keeping the historical Reward Factor instead — even as NCQA's own stratification requirement keeps expanding. Measurement infrastructure and payment incentive are not the same thing, and they are not currently moving in lockstep."},
    ],
    "quiz": {
        "id": "quiz_hea_measurement_foundations", "passingScore": 75, "shuffleOptions": True,
        "questions": [
            q_single("hea1a", "Between Measurement Year 2022 and Measurement Year 2024, how many HEDIS measures did NCQA require to be stratified by race and ethnicity?",
                [("5 → 22", True, None), ("22 → 5 (a rollback)", False, "The direction is reversed — NCQA expanded stratification, it did not roll it back."), ("0 → 5", False, "MY2022 already required 5 measures stratified, not zero."), ("5 → 5 (unchanged)", False, "NCQA nearly quadrupled the stratified-measure count between MY2022 and MY2024.")],
                "NCQA started race/ethnicity stratification with 5 HEDIS measures in MY2022 and had expanded to 22 measures by MY2024 — real, rapid growth in the measurement infrastructure."),
            q_single("hea1b", "What are the five weighted dimensions of this platform's HEROI composite score?",
                [("Access, Quality, Outcome, SDOH Burden, Trust & Engagement", True, None), ("Cost, Quality, Access, Safety, Satisfaction", False, "Those are generic value-based-care dimensions, not HEROI's five."), ("Race, Ethnicity, Income, Geography, Language", False, "Those are demographic stratifiers used inside the dimensions, not the dimensions themselves."), ("Policy, Technology, Economics, Clinical, Operations", False, "That is the book's five-pillar framework, a different model.")],
                "HEROI weights Access and Quality and Outcome at 25% each, SDOH Burden at 15%, and Trust & Engagement at 10% — the exact structure this course is built around."),
            q_tf("hea1c", "CMS's 2027 Medicare Advantage Star Ratings final rule implemented a new Health Equity Index reward for plans.", True,
                "CMS declined to implement the previously proposed Health Equity Index reward (branded 'Excellent Health Outcomes for All') for 2027 and continued the historical Reward Factor instead.",
                "This is the opposite of what happened — the Health Equity Index reward was proposed but not adopted for 2027."),
            q_single("hea1d", "Why does the low rate of SDOH Z-code use (about 1.9% of inpatient admissions) matter for equity analytics?",
                [("A measurement system can only score what gets documented — under-coding creates a data gap, not an absence of need", True, None), ("It proves patients rarely have social risk factors", False, "The opposite is generally true; the gap is in documentation, not in underlying need."), ("It means Z-codes are not a real ICD-10 category", False, "Z55–Z65 are real, standard ICD-10-CM codes for SDOH."), ("It shows hospitals are legally barred from using them", False, "There is no such bar; CMS and the Gravity Project actively promote their use.")],
                "Any SDOH-burden score built from claims data inherits this documentation gap — a low Z-code rate understates need, it doesn't mean need is low."),
        ],
    },
})

# ─────────────────────────────────────────────────────────────────────────
# Lesson 2 — Disparity decomposition
# ─────────────────────────────────────────────────────────────────────────
LESSONS.append({
    "id": "lesson_hea_disparity_decomposition", "trackId": "track_hea_core", "pillar": "equity",
    "order": 2, "slug": "hea-disparity-decomposition",
    "title": "Disparity Decomposition: From Raw Gaps to Actionable Signals",
    "summary": "The same underlying gap can be reported as a rate difference, a rate ratio, or a summary index — and each tells a different story. This lesson works through the actual arithmetic AHRQ and CDC use, the reference-group choice that quietly shapes every result, and the small-numbers problem that breaks naive stratification.",
    "estimatedMinutes": 22, "isPublished": True,
    "tags": ["disparity-measurement", "ahrq", "index-of-disparity", "small-numbers"],
    "relatedLessonIds": [], "createdAt": "2026-09-22T00:00:00Z", "updatedAt": "2026-09-22T00:00:00Z",
    "objectives": [
        obj("2a", "Distinguish absolute disparity (rate difference) from relative disparity (rate ratio) and explain when each is the more honest metric."),
        obj("2b", "Describe the Pearcy-Keppel Index of Disparity as a summary measure across many subgroups."),
        obj("2c", "Explain why reference-group choice and small cell sizes can distort a disparity measurement, and what analysts do about it."),
    ],
    "contentBlocks": [
        {"type": "text", "heading": "Two ways to describe the same gap", "body": "Suppose Group A has an outcome rate of 20% and Group B has a rate of 10%. The **rate difference** is 10 percentage points. The **rate ratio** is 2.0 — Group A's rate is twice Group B's. Both are true simultaneously, and each is the more honest number in a different context: the rate difference tells you the absolute burden (how many more people in Group A are affected), while the rate ratio tells you the relative burden (how much more likely). AHRQ's National Healthcare Quality and Disparities Report (NHQDR), the federally mandated annual disparities report, computes rate ratios between each priority population and a reference group for its headline disparity tables.\n\nA disparity that looks small on one scale can look large on the other. A rate difference of 2 percentage points sounds modest; if the reference rate is 1%, that is a 3x rate ratio."},
        {"type": "callout", "variant": "info", "heading": "Key Concept", "body": "Absolute disparity (rate difference) and relative disparity (rate ratio) are both legitimate summaries of the same gap. Reporting only one — especially only the smaller-looking one — is a framing choice, not a neutral default."},
        {"type": "text", "heading": "Summarizing across many subgroups: the Index of Disparity", "body": "A single rate ratio compares two groups. But most real populations split into many subgroups — several racial/ethnic categories, income bands, education levels. Jeffrey Pearcy and Kenneth Keppel's 2002 *Public Health Reports* paper, written to help track progress toward the original Healthy People 2010 disparity-elimination goal, proposed the **Index of Disparity (ID)**: a modified coefficient of variation across all subgroup rates relative to a reference rate, expressed as a single percentage. It lets an analyst track whether disparity across an entire population is widening or narrowing over time — its authors found, for example, that gender disparity in cardiovascular deaths fell from 1989–1998 while racial/ethnic disparity in the same outcome stayed essentially flat."},
        {"type": "key_stat", "heading": "Two Federal Disparity Measurement Systems", "stats": [
            {"value": "1995", "label": "Year AHRQ's CAHPS patient-experience program began", "source": "AHRQ"},
            {"value": "2016", "label": "Year CMS launched the Mapping Medicare Disparities (MMD) Tool", "source": "CMS Office of Minority Health"},
            {"value": "18+", "label": "Chronic conditions the MMD Tool tracks by race/ethnicity, geography, and dual-eligibility", "source": "CMS OMH"},
        ]},
        {"type": "text", "heading": "The reference-group problem", "body": "Every disparity ratio needs a denominator group to compare against. AHRQ's own methodology documentation is explicit that this choice matters and is under continuous review: comparing every group to the population's best-performing group produces larger, more visible gaps; comparing every group to the population average produces smaller ones. Neither choice is 'wrong' — but a report that switches reference groups between years, or between measures, without saying so, can make progress (or its absence) look different than it is."},
        {"type": "comparison_table", "heading": "Reference-Group Choice Changes What You See", "leftLabel": "Best-performing group as reference", "rightLabel": "Population average as reference", "rows": [
            {"label": "Visible disparity size", "left": "Larger — every group is compared to the ceiling", "right": "Smaller — the average already includes the low-performing groups"},
            {"label": "Use case", "left": "Setting an aspirational target", "right": "Tracking year-over-year population-level change"},
            {"label": "Risk", "left": "Can look alarmist if not contextualized", "right": "Can understate the gap for the worst-off group"},
        ]},
        {"type": "callout", "variant": "warning", "heading": "Important", "body": "Small subgroups produce unstable rates. A rate computed from 20 patients can swing from a 5% disparity to a 25% disparity with two additional events. AHRQ and NCQA both apply minimum-cell-size suppression rules before publishing a stratified rate — a real methodological safeguard, not bureaucratic caution. Any equity dashboard built without a minimum-N rule will manufacture false disparities out of statistical noise."},
        {"type": "text", "heading": "Case study: the Mapping Medicare Disparities Tool", "body": "CMS's Office of Minority Health launched the Mapping Medicare Disparities (MMD) Tool in March 2016 specifically to solve the reference-group and small-numbers problems for public users. It offers two views — Population View and Hospital View — letting analysts filter by state or county, sex, age, dual-eligibility status, and race/ethnicity, and it tracks utilization and outcome measures (hospitalizations, readmissions, mortality) across 18-plus chronic conditions. Its design choices — a fixed set of comparison groups, pre-suppressed small cells, downloadable underlying tables — are a working example of the tradeoffs this lesson describes, made once by CMS so individual analysts don't have to remake them inconsistently."},
    ],
    "quiz": {
        "id": "quiz_hea_disparity_decomposition", "passingScore": 75, "shuffleOptions": True,
        "questions": [
            q_single("hea2a", "Group A has a 20% adverse-outcome rate and Group B has a 10% rate. What is the rate ratio?",
                [("2.0", True, None), ("10 percentage points", False, "That's the rate difference, not the rate ratio."), ("0.5", False, "That would be B relative to A, not A relative to B as usually reported."), ("200%", False, "The ratio is 2.0 (or '200% of Group B's rate' if phrased that way, but not '200%' alone as a ratio).")],
                "The rate ratio is Group A's rate divided by Group B's rate: 20% / 10% = 2.0 — Group A's rate is twice as high."),
            q_single("hea2b", "What did Pearcy and Keppel's 2002 Index of Disparity add that a single rate ratio cannot provide?",
                [("A single summary number for disparity across many subgroups at once, trackable over time", True, None), ("A legal standard for suing a health plan over disparities", False, "The Index of Disparity is a measurement tool, not a legal standard."), ("A replacement for collecting race and ethnicity data", False, "It's a way to summarize data that's already been collected, not a substitute for collecting it."), ("A method for predicting future disparities using machine learning", False, "It's a descriptive statistical summary, not a predictive model.")],
                "The Index of Disparity is a modified coefficient of variation across all subgroup rates relative to a reference — built to track whether disparity is widening or narrowing over time, across many groups at once."),
            q_tf("hea2c", "Comparing every subgroup to the population's best-performing group and comparing every subgroup to the population average will generally produce the same-looking disparity size.", True,
                "They produce systematically different pictures: comparing to the best-performing group makes gaps look larger (since the average already blends in lower-performing groups), which is why AHRQ documents this choice explicitly as a methods decision.",
                "This is backwards — the two reference choices produce different, not equivalent, disparity magnitudes."),
            q_single("hea2d", "Why do AHRQ and NCQA apply minimum-cell-size suppression before publishing a stratified rate?",
                [("Rates computed from very small subgroups are statistically unstable and can manufacture false disparities from noise", True, None), ("To hide disparities from the public", False, "The stated purpose is statistical reliability, not concealment — suppressed cells are flagged as suppressed, not silently dropped."), ("Because federal law requires all health data to be aggregated nationally", False, "No such blanket law exists; stratification down to county/subgroup level is exactly what these tools do, with suppression only for very small cells."), ("Because race and ethnicity data is not permitted to be published", False, "It is routinely published — MMD Tool, NHQDR, and NCQA stratified measures all publish it, subject to cell-size rules.")],
                "A rate from a handful of patients can swing wildly with one or two additional events — suppression rules prevent that noise from being reported as a real, actionable disparity."),
        ],
    },
})

# ─────────────────────────────────────────────────────────────────────────
# Lesson 3 — Stratified quality measurement
# ─────────────────────────────────────────────────────────────────────────
LESSONS.append({
    "id": "lesson_hea_stratified_quality", "trackId": "track_hea_core", "pillar": "equity",
    "order": 3, "slug": "hea-stratified-quality-measurement",
    "title": "Stratified Quality Measurement: HEDIS, NCQA, and the Star Ratings Fight",
    "summary": "Stratifying a quality measure means running the same HEDIS measure separately by race, ethnicity, and language — and it depends entirely on whether the underlying demographic data is even there. This lesson covers NCQA's build-out, the direct-vs-indirect data problem, and a live example of measurement outrunning payment incentive.",
    "estimatedMinutes": 22, "isPublished": True,
    "tags": ["hedis", "ncqa", "stratification", "star-ratings"],
    "relatedLessonIds": [], "createdAt": "2026-09-22T00:00:00Z", "updatedAt": "2026-09-22T00:00:00Z",
    "objectives": [
        obj("3a", "Explain what it means, operationally, to stratify a HEDIS measure."),
        obj("3b", "Distinguish direct (self-reported) from indirect (imputed) race/ethnicity data and the tradeoffs of each."),
        obj("3c", "Describe why CMS's 2027 decision not to implement a Health Equity Index reward is a live example of incentive lagging measurement."),
    ],
    "contentBlocks": [
        {"type": "text", "heading": "What 'stratified' means in practice", "body": "A standard HEDIS measure — say, colorectal cancer screening rates — reports one number for a whole plan. A **stratified** version of that same measure reports it separately by race, ethnicity, and (for some measures) language: the screening rate for Black members, for Hispanic members, for Asian members, for White members, side by side. Nothing about the clinical definition of the measure changes; what changes is that the plan can no longer average away a gap between subgroups.\n\nNCQA began requiring this for HEDIS measures in Measurement Year 2022, starting with 5 measures. By Measurement Year 2024 that had grown to 22 measures, with NCQA adding more each year as part of what it calls making health equity part of all its offerings."},
        {"type": "key_stat", "heading": "The Race and Ethnicity Stratification Learning Network", "stats": [
            {"value": "101", "label": "Health plan contracts studied in NCQA's RES Learning Network", "source": "NCQA"},
            {"value": "19M+", "label": "Covered lives represented across those contracts", "source": "NCQA"},
            {"value": "41%", "label": "Share of studied contracts that were Medicaid product lines", "source": "NCQA"},
        ]},
        {"type": "text", "heading": "Direct vs. indirect data — and why it matters", "body": "Stratification only works if a plan actually has race and ethnicity data on its members. NCQA's reporting requires plans to disclose, for every stratified value, whether it came from **direct data** (the member self-reported it, typically at enrollment or in a clinical encounter) or **indirect data** (an alternate source, such as geocoding a member's address against Census tract demographics, used to infer a probable value when no self-report exists).\n\nDirect data is more accurate for any individual member but is often incomplete — many members never self-report. Indirect data fills gaps at the population level but can misclassify individuals, especially in racially mixed neighborhoods. A plan reporting a stratified measure built mostly on indirect data is measuring something real, but with more noise than the same measure built on direct data — and NCQA's disclosure requirement exists so that difference is visible to anyone reading the result, not hidden inside a single clean-looking number."},
        {"type": "comparison_table", "heading": "Direct vs. Indirect Race/Ethnicity Data", "leftLabel": "Direct (self-reported)", "rightLabel": "Indirect (geocoded/imputed)", "rows": [
            {"label": "Source", "left": "Member self-report at enrollment or encounter", "right": "Inferred from address, surname, or other proxy against Census data"},
            {"label": "Individual accuracy", "left": "High — the member stated it", "right": "Probabilistic — can misclassify any given individual"},
            {"label": "Population completeness", "left": "Often incomplete — many members never report", "right": "Can fill most or all of the gap"},
            {"label": "NCQA requirement", "left": "Preferred; must be labeled as direct when used", "right": "Permitted; must be labeled as indirect when used"},
        ]},
        {"type": "callout", "variant": "warning", "heading": "Important — a live measurement-vs-incentive gap", "body": "CMS's Contract Year 2027 Medicare Advantage and Part D final rule did not implement the 'Excellent Health Outcomes for All' reward — the payment incentive that had been proposed as a Health Equity Index reward for Star Ratings — and instead continued the historical Reward Factor, which rewards consistently high performance for all enrollees rather than closing gaps between them. NCQA's own stratified-measure count kept growing in the same period. The measurement infrastructure to detect a disparity and the payment infrastructure to reward closing it are not the same system, and as of this course's writing, they are not moving at the same pace."},
        {"type": "text", "heading": "Case study: Rush University Medical Center", "body": "Rush University Medical Center's health equity strategy, described in a 2021 *NEJM Catalyst* case study, treated data stratification as a system-level strategy rather than a compliance exercise: Rush restructured its own operations around what stratified data showed about its West Side Chicago neighborhood, including forming a dedicated Anchor Mission committee to translate what the numbers found into hiring, purchasing, and investment decisions in the surrounding community — not just clinical protocol changes. It is a working example of what NCQA's stratification requirement is *for*: a plan or system can only act on a gap it can see by subgroup, and Rush built its strategy around making that visibility organizational, not just a report that quality staff filed once a year."},
    ],
    "quiz": {
        "id": "quiz_hea_stratified_quality", "passingScore": 75, "shuffleOptions": True,
        "questions": [
            q_single("hea3a", "What does it mean to 'stratify' a HEDIS measure?",
                [("Report the same measure separately by subgroup (e.g., race/ethnicity) instead of one blended plan-wide number", True, None), ("Raise the passing threshold for the measure", False, "Stratification changes how the result is reported, not the clinical passing bar."), ("Replace the measure with a new one focused only on equity", False, "The underlying clinical measure is unchanged — only the reporting breakdown changes."), ("Combine several unrelated HEDIS measures into one score", False, "That describes aggregation, the opposite of stratification.")],
                "Stratification keeps the same measure definition but reports it by subgroup, so a plan can no longer average away a gap between them."),
            q_single("hea3b", "A plan reports a stratified measure using 'indirect' race/ethnicity data. What does that mean?",
                [("The values were inferred (e.g., via geocoding), not self-reported by the member", True, None), ("The data was collected by a third-party auditor", False, "Indirect specifically refers to the SOURCE method (inference vs. self-report), not who collected it."), ("The measure itself is indirect, i.e., a proxy for a different clinical outcome", False, "The measure is a standard HEDIS measure; 'indirect' describes the demographic data source only."), ("The plan declined to report the measure at all", False, "Indirect data means it WAS reported, just via inference rather than self-report.")],
                "Indirect data comes from an alternate source, such as geocoding a member's address against Census demographics — used when a direct self-report isn't available."),
            q_tf("hea3c", "CMS's 2027 Medicare Advantage Star Ratings final rule expanded payment rewards specifically for closing health equity gaps.", True,
                "CMS did not implement the previously proposed Health Equity Index reward for 2027 and instead continued the historical Reward Factor, which is not equity-targeted — the opposite of what this statement claims.",
                "This did not happen — CMS declined to implement the equity-targeted reward for 2027."),
            q_single("hea3d", "What did Rush University Medical Center's equity strategy add beyond simply collecting stratified data?",
                [("It organized hiring, purchasing, and community investment decisions (an anchor-mission approach) around what the stratified data showed", True, None), ("It stopped collecting race/ethnicity data because it was too costly", False, "The opposite — Rush built its strategy around using that data operationally."), ("It outsourced all quality reporting to NCQA directly", False, "NCQA sets requirements; Rush's own operational response is what the case study describes."), ("It focused exclusively on clinical protocol changes with no community component", False, "The anchor-mission committee is explicitly a community-facing structural response, not only clinical.")],
                "Rush's case study is notable for translating what stratified data showed into structural, community-facing action (an anchor-mission committee) — not stopping at the report."),
        ],
    },
})

# ─────────────────────────────────────────────────────────────────────────
# Lesson 4 — SDOH burden scoring
# ─────────────────────────────────────────────────────────────────────────
LESSONS.append({
    "id": "lesson_hea_sdoh_burden_scoring", "trackId": "track_hea_core", "pillar": "equity",
    "order": 4, "slug": "hea-sdoh-burden-scoring",
    "title": "Scoring SDOH Burden: From PRAPARE to Composite Indices",
    "summary": "Individual-level screening tools and area-level composite indices answer different questions and are built by entirely different methods. This lesson covers PRAPARE, the CDC/ATSDR Social Vulnerability Index, and the Area Deprivation Index, then works through how a composite index is actually constructed — domain selection, standardization, and weighting.",
    "estimatedMinutes": 22, "isPublished": True,
    "tags": ["sdoh", "prapare", "social-vulnerability-index", "area-deprivation-index"],
    "relatedLessonIds": [], "createdAt": "2026-09-22T00:00:00Z", "updatedAt": "2026-09-22T00:00:00Z",
    "objectives": [
        obj("4a", "Distinguish individual-level SDOH screening from area-level deprivation indices and when each is the right tool."),
        obj("4b", "Describe the construction method behind a composite SDOH index: domain selection, standardization, and weighting."),
        obj("4c", "Explain the SDOH Z-code documentation gap and why it limits claims-based SDOH scoring."),
    ],
    "contentBlocks": [
        {"type": "text", "heading": "Two different questions, two different tools", "body": "'What social risks does this specific patient face?' and 'How socially deprived is this specific neighborhood?' sound similar but require different instruments. The first is answered by an **individual-level screening tool** administered to a patient. The second is answered by an **area-level composite index** built from public data about a geography, applied to every patient living there regardless of their individual circumstances.\n\nBoth are legitimate SDOH-burden inputs, and a real scoring system typically uses both — the individual tool where a patient encounter exists to administer it, and the area-level index as a population-level fallback or a broader planning signal."},
        {"type": "text", "heading": "PRAPARE — the individual-level standard", "body": "PRAPARE (Protocol for Responding to and Assessing Patients' Assets, Risks, and Experiences) was created in 2013 by the National Association of Community Health Centers (NACHC), in partnership with the Association of Asian Pacific Community Health Organizations and the Oregon Primary Care Association. It screens for 22 social determinants of health factors and is standardized against ICD-10, LOINC, and SNOMED codes so its results are documentable and interoperable in an EHR — a deliberate design choice that let it become one of the most widely adopted SDOH screening tools in U.S. community health centers, available free in most major EHR platforms and translated into 26 languages."},
        {"type": "key_stat", "heading": "Two Area-Level Composite Indices", "stats": [
            {"value": "16", "label": "Census variables in the CDC/ATSDR Social Vulnerability Index", "source": "CDC/ATSDR"},
            {"value": "4", "label": "SVI themes: socioeconomic status, household composition/disability, minority status/language, housing/transportation", "source": "CDC/ATSDR"},
            {"value": "17", "label": "Measures of education, housing quality, and poverty in the Area Deprivation Index", "source": "Kind & Buckingham, NEJM 2018"},
            {"value": "2013", "label": "Year NACHC's PRAPARE tool was developed", "source": "NACHC"},
        ]},
        {"type": "text", "heading": "The Area Deprivation Index and the Neighborhood Atlas", "body": "Amy Kind and William Buckingham published the Area Deprivation Index (ADI) methodology in a 2018 *New England Journal of Medicine* perspective, 'Making Neighborhood-Disadvantage Metrics Accessible.' The ADI ranks census block groups on 17 measures spanning income, education, employment, and housing quality, and Kind's team at the University of Wisconsin-Madison built the Neighborhood Atlas to make block-group-level rankings freely downloadable — turning what had been an academic construct into a tool any health system or researcher could plug a patient address into."},
        {"type": "steps", "title": "How a Composite Index Actually Gets Built", "items": [
            ("Domain selection", "Choose which underlying factors count — e.g., SVI's four themes (socioeconomic status, household composition, minority status/language, housing/transportation). This is a values choice: which social conditions are 'in scope' as deprivation."),
            ("Standardization", "Convert each raw variable (income, % without a vehicle, etc.) onto a common scale — typically a percentile rank or z-score — so factors measured in different units can be combined."),
            ("Weighting", "Decide how much each standardized domain contributes to the final score. Equal weighting is common and easy to defend, but is itself a choice, not a neutral default."),
            ("Aggregation", "Sum or average the weighted, standardized components into a single score or percentile, typically at the census tract or block-group level."),
        ]},
        {"type": "callout", "variant": "warning", "heading": "Important", "body": "Composite index construction involves real judgment calls at every stage — which domains, which standardization method, which weights. Two well-constructed indices covering the same underlying reality (like SVI and ADI) can rank the same neighborhood differently, because they made different domain and weighting choices. Neither is 'wrong'; an analyst using either should say which index, and be able to explain why that one."},
        {"type": "text", "heading": "The claims-data gap: SDOH Z-codes", "body": "ICD-10-CM diagnosis codes Z55 through Z65 exist specifically to document social determinants — housing instability, food insecurity, transportation barriers, and similar factors — inside a clinical encounter. The Gravity Project, working with the American Medical Association, has built out crosswalks mapping standardized SDOH screening questions (including CMS's own Accountable Health Communities screening tool) directly to the appropriate Z-code and SNOMED CT terms.\n\nDespite that infrastructure and explicit CDC and WHO emphasis on their use, one peer-reviewed study found only about 1.9% of inpatient hospital admissions carried an SDOH Z-code. Any equity-scoring system built primarily from claims data will underrepresent real social risk for exactly this reason — the code being rare does not mean the underlying need is rare."},
    ],
    "quiz": {
        "id": "quiz_hea_sdoh_burden_scoring", "passingScore": 75, "shuffleOptions": True,
        "questions": [
            q_single("hea4a", "What is the key difference between an individual-level SDOH screening tool like PRAPARE and an area-level index like the ADI or SVI?",
                [("PRAPARE assesses a specific patient's own circumstances; ADI/SVI assign a score to a geography that applies to everyone living there", True, None), ("PRAPARE is newer and has fully replaced area-level indices", False, "Both are in active, widespread use for different purposes; neither has replaced the other."), ("Area-level indices require a clinical encounter to administer", False, "The opposite — area-level indices need only an address, no encounter required."), ("PRAPARE only works for Medicaid patients", False, "PRAPARE is used across community health centers broadly, not limited to a single payer.")],
                "PRAPARE is administered to an individual patient; ADI and SVI are built from public geographic data and applied to anyone in that area, regardless of their individual situation."),
            q_single("hea4b", "In building a composite deprivation index, what does the 'standardization' step accomplish?",
                [("Converts raw variables measured in different units onto a common scale (like percentile rank or z-score) so they can be combined", True, None), ("Ensures every U.S. state uses the exact same raw threshold for poverty", False, "Standardization is about combining variables mathematically, not setting a uniform policy threshold."), ("Removes any variable that shows a racial disparity", False, "Standardization is a scaling step, not a filtering step based on disparity content."), ("Converts the index into a binary yes/no flag", False, "Standardization typically produces a continuous score or percentile, not a binary flag.")],
                "Standardization puts variables measured in different units (dollars, percentages, counts) onto a common scale so they can be meaningfully combined into one index."),
            q_tf("hea4c", "Because SVI and ADI both measure area-level social deprivation, they will always rank a given neighborhood identically.", True,
                "They can rank the same neighborhood differently, because each index makes its own domain-selection and weighting choices — a real methodological point, not a data error.",
                "This is false — different domain and weighting choices between the two indices can produce different rankings for the same place."),
            q_single("hea4d", "Why does a low rate of SDOH Z-code documentation (about 1.9% of inpatient admissions) limit a claims-based SDOH burden score?",
                [("The score can only reflect what got coded, so it will systematically understate real social need", True, None), ("It means SDOH Z-codes were only recently added to ICD-10", False, "Z55–Z65 have existed in ICD-10-CM for years; the issue is documentation rate, not code availability."), ("It means most patients genuinely have no social risk factors", False, "The gap is attributed to under-documentation, not an actual absence of need."), ("It has no effect, because claims data is not used for SDOH scoring", False, "Claims-derived Z-codes are one real input some SDOH scoring approaches use, so the documentation gap does matter.")],
                "A composite score built from claims can only see what was coded — a 1.9% Z-code rate means the vast majority of real social risk in a claims-only score would be invisible."),
        ],
    },
})

# ─────────────────────────────────────────────────────────────────────────
# Lesson 5 — Equity-weighted economics / HEROI
# ─────────────────────────────────────────────────────────────────────────
LESSONS.append({
    "id": "lesson_hea_equity_weighted_economics", "trackId": "track_hea_core", "pillar": "equity",
    "order": 5, "slug": "hea-equity-weighted-economics",
    "title": "Weighting Equity Into the Dollar: HEROI and Distributional Cost-Effectiveness",
    "summary": "Standard cost-effectiveness analysis treats a QALY gained by an advantaged group the same as one gained by a disadvantaged group. Distributional cost-effectiveness analysis (DCEA) does not — and this platform's own HEROI composite is a working, documented example of building an equity-weighted score, including an honest label on the one dimension it cannot yet measure directly.",
    "estimatedMinutes": 25, "isPublished": True,
    "tags": ["heroi", "dcea", "equity-weighting", "cost-effectiveness"],
    "relatedLessonIds": [], "createdAt": "2026-09-22T00:00:00Z", "updatedAt": "2026-09-22T00:00:00Z",
    "objectives": [
        obj("5a", "Explain why standard cost-effectiveness analysis can be equity-blind."),
        obj("5b", "Describe distributional cost-effectiveness analysis (DCEA) and the role of an inequality-aversion parameter."),
        obj("5c", "Walk through how HEROI's five weighted dimensions combine into a single composite score, including its documented proxy limitation."),
    ],
    "contentBlocks": [
        {"type": "text", "heading": "Standard cost-effectiveness analysis is equity-blind by design", "body": "Conventional cost-effectiveness analysis (CEA) asks one question: for a given budget, which intervention produces the most total health (usually measured in quality-adjusted life years, or QALYs)? A QALY gained by a well-off, easy-to-reach population counts exactly the same as a QALY gained by a disadvantaged, hard-to-reach population. That is a deliberate simplification that makes CEA tractable — and it is also the reason CEA, used alone, can systematically favor interventions that help people who are already relatively well off, simply because they are cheaper to reach."},
        {"type": "callout", "variant": "info", "heading": "Key Concept", "body": "Distributional cost-effectiveness analysis (DCEA) extends standard CEA by explicitly trading off total health gained against the reduction of health inequality — rather than maximizing total health alone."},
        {"type": "text", "heading": "Distributional cost-effectiveness analysis (DCEA)", "body": "Richard Cookson, Susan Griffin, Ole Norheim, and Anthony Culyer's 2020 Oxford University Press volume, *Distributional Cost-Effectiveness Analysis: Quantifying Health Equity Impacts and Trade-Offs*, formalized DCEA as a field. Its central mechanism is the **equity weight**, derived from the Atkinson index of inequality aversion, denoted ε. At ε = 0, there is no special priority for the worst-off — DCEA collapses back to standard CEA. Cookson and colleagues' 2017 illustrative work used ε = 0.5 as a default representing mild inequality aversion; larger values put sharply more weight on health gains for the worst-off group. The choice of ε is itself a value judgment that a DCEA analysis should state explicitly, not bury in a footnote."},
        {"type": "key_stat", "heading": "The HEROI Composite — This Platform's Worked Example", "stats": [
            {"value": "25%", "label": "Weight on Access Equity in the HEROI composite", "source": "Health Equity Studio, HEROI Composite Score tab"},
            {"value": "25%", "label": "Weight on Quality Equity", "source": "Health Equity Studio"},
            {"value": "25%", "label": "Weight on Outcome Equity", "source": "Health Equity Studio"},
            {"value": "15% + 10%", "label": "Weight on SDOH Burden, then Trust & Engagement", "source": "Health Equity Studio"},
        ]},
        {"type": "text", "heading": "How HEROI actually combines its five inputs", "body": "This platform's Health Equity Studio computes HEROI (Health Equity Return on Investment) as a weighted average of five 0–100 dimension scores, each fed by a different tab of the same tool. Access Equity blends the racial/ethnic disparity signal from the Disparity Calculator with the metro-vs-isolated-rural gap from the Geographic Access Gap Analyzer. Quality Equity and Outcome Equity are drawn from the same disparity-decomposition logic taught in Lesson 2, applied to quality and outcome measures respectively. SDOH Burden reuses the exact composite score built in the SDOH Composite & ROI tab — the same construction method taught in Lesson 4. Trust & Engagement is the fifth input.\n\nOpen the tool yourself at **/research-lab/population-equity?tab=equity** and select the HEROI Composite Score tab — the platform documents its own dimension notes inline, so you can see exactly which upstream tab feeds each weighted input, live, using whatever population profile you set on the Disparity Calculator tab."},
        {"type": "callout", "variant": "warning", "heading": "Important — an honestly labeled proxy", "body": "The Health Equity Studio's own documentation states plainly that its Trust & Engagement dimension is a documented proxy, pending real CAHPS (Consumer Assessment of Healthcare Providers and Systems) survey data — not a claim that it has already solved patient-trust measurement. This is the right way to handle a dimension you cannot yet measure directly: label the proxy, state what real data would replace it, and don't let the composite's clean final number imply more precision than the weakest input actually has."},
        {"type": "text", "heading": "Case study: system-wide equity as a management discipline", "body": "Kaiser Permanente received the American Hospital Association's 2017 Equity of Care Award for embedding disparity reduction into its operating structure — physicians, nurses, and staff across its integrated system working from shared disparity data rather than each department tracking equity independently. The lesson for anyone building or using a composite like HEROI is the same one Kaiser's recognition illustrates: a composite score is only as useful as the organizational structure that acts on what it shows. A HEROI score computed once and filed away is a number; a HEROI score reviewed on the same cadence as a financial scorecard is a management tool."},
    ],
    "quiz": {
        "id": "quiz_hea_equity_weighted_economics", "passingScore": 75, "shuffleOptions": True,
        "questions": [
            q_single("hea5a", "Why can standard cost-effectiveness analysis (CEA) be described as 'equity-blind'?",
                [("It counts a QALY gained by any group equally, regardless of that group's existing disadvantage", True, None), ("It cannot be used for any healthcare decision", False, "Standard CEA is widely used; the critique is about what it does and doesn't weigh, not whether it's usable."), ("It only applies to pharmaceutical interventions", False, "CEA applies broadly across healthcare interventions, not only drugs."), ("It requires race and ethnicity data that is usually unavailable", False, "Standard CEA doesn't require demographic data at all — that's exactly the point; it ignores who benefits.")],
                "Standard CEA maximizes total health (QALYs) without regard to who receives it — a QALY for an advantaged group and one for a disadvantaged group count identically."),
            q_single("hea5b", "In distributional cost-effectiveness analysis (DCEA), what does the equity weight parameter ε represent?",
                [("The degree of inequality aversion — ε = 0 means no extra priority for the worst-off; larger ε means more priority", True, None), ("The dollar cost of the intervention", False, "ε is about priority-weighting health gains, not a cost figure."), ("The number of demographic subgroups in the analysis", False, "ε is a single inequality-aversion parameter, not a subgroup count."), ("A fixed value set by federal regulation", False, "ε is a modeling choice made by the analyst/study, illustrated at 0.5 by Cookson et al. 2017, not a regulatory mandate.")],
                "ε, from the Atkinson index of inequality aversion, controls how much extra weight DCEA gives to health gains for the worst-off group; Cookson et al.'s illustrative work used ε = 0.5 as a mild-aversion default."),
            q_single("hea5c", "Which HEROI dimensions share weight equally at 25% each?",
                [("Access, Quality, and Outcome", True, None), ("Access, SDOH Burden, and Trust", False, "SDOH Burden is 15% and Trust is 10% — not equal to Access."), ("Quality, Trust, and SDOH Burden", False, "Trust (10%) and SDOH Burden (15%) are weighted lower than Quality (25%)."), ("All five dimensions are weighted equally", False, "They are not — Access/Quality/Outcome are 25% each, SDOH Burden is 15%, Trust is 10%.")],
                "Access Equity, Quality Equity, and Outcome Equity are each weighted 25%; SDOH Burden is 15% and Trust & Engagement is 10%."),
            q_tf("hea5d", "The Health Equity Studio presents its Trust & Engagement score as real, directly measured CAHPS survey data.", True,
                "The tool documents Trust & Engagement as a stated proxy pending real CAHPS data — the opposite of presenting it as directly measured.",
                "This is false — the platform explicitly labels this dimension a documented proxy, not real CAHPS data, precisely to avoid overstating its precision."),
        ],
    },
})

# ─────────────────────────────────────────────────────────────────────────
# Lesson 6 — From score to action
# ─────────────────────────────────────────────────────────────────────────
LESSONS.append({
    "id": "lesson_hea_from_score_to_action", "trackId": "track_hea_core", "pillar": "equity",
    "order": 6, "slug": "hea-from-score-to-action",
    "title": "From Score to Action: Trust, Governance, and Closing the Loop",
    "summary": "A dashboard that nobody acts on is not an equity program. This closing lesson covers CAHPS as the real data source behind the 'Trust' dimension every proxy is trying to approximate, the governance loop that turns a score into an intervention, and the 'so what' test every equity metric should have to pass before it ships.",
    "estimatedMinutes": 20, "isPublished": True,
    "tags": ["cahps", "governance", "equity-action-plan", "dashboards"],
    "relatedLessonIds": [], "createdAt": "2026-09-22T00:00:00Z", "updatedAt": "2026-09-22T00:00:00Z",
    "objectives": [
        obj("6a", "Describe CAHPS and why it is the reference data source the Trust & Engagement dimension is proxying for."),
        obj("6b", "Explain the 'measurement without action' failure mode documented in the disparity-dashboard literature."),
        obj("6c", "Apply a governance loop (measure → assess cause → act → re-measure) to turn an equity score into an accountability structure."),
    ],
    "contentBlocks": [
        {"type": "text", "heading": "What CAHPS actually measures", "body": "The Consumer Assessment of Healthcare Providers and Systems (CAHPS) program is an AHRQ initiative dating to 1995. It is not one survey but a family of standardized patient-experience surveys covering ambulatory clinician offices, hospitals, nursing homes, dialysis centers, surgical care, dental plans, home health, behavioral health, and care for American Indian populations — each asking patients to rate concrete aspects of their experience, such as how well providers communicated and how easy it was to get needed care.\n\nCAHPS is the reference standard the Trust & Engagement dimension in Lesson 5 is a proxy *for*. Real CAHPS data, stratified by race, ethnicity, and language the way Lesson 3's HEDIS measures are stratified, would let a Trust dimension measure what patients actually report about being heard and respected — rather than the indirect proxy signal a system without CAHPS access has to use instead."},
        {"type": "callout", "variant": "info", "heading": "Key Concept", "body": "CAHPS is patient-reported, not administratively derived — it is the closest thing in U.S. healthcare measurement to asking patients directly whether they were treated well, which is exactly why it is hard to substitute with a proxy."},
        {"type": "text", "heading": "The 'measurement without action' failure mode", "body": "A body of published research on disparity dashboards has converged on a consistent finding: dashboards that stratify data by race, ethnicity, or other subgroup are common, but dashboards that are demonstrably tied to a specific accountability structure — someone whose job it is to act when a gap appears — are much rarer. A stratified rate that nobody owns is a fact sitting in a report. The same rate, reviewed by a named committee with authority to change a staffing model, a referral pathway, or a screening protocol, is the beginning of an intervention."},
        {"type": "steps", "title": "The Governance Loop", "items": [
            ("Measure", "Compute the stratified rate, the composite SDOH score, or the HEROI dimension — using the methods from Lessons 2–5."),
            ("Assess cause", "Before acting, ask why the gap exists — a staffing gap, a referral-pathway gap, a documentation gap (recall Lesson 4's Z-code problem), or a genuine access barrier each call for a different fix. This maps directly to Priority 2 of the CMS Framework for Health Equity 2022–2032: assess causes of disparities within programs and operations, not just their existence."),
            ("Act", "Change something specific and attributable — staffing, a referral relationship, a screening workflow, a resource allocation — tied to the assessed cause."),
            ("Re-measure", "Run the same stratified measure again on the same cadence. If the gap didn't move, the assessed cause was probably wrong, or the action didn't address it — go back to step 2."),
        ]},
        {"type": "key_stat", "heading": "Turning Data Into Structural Action", "stats": [
            {"value": "1995", "label": "Year AHRQ's CAHPS program began", "source": "AHRQ"},
            {"value": "5", "label": "Priorities in the CMS Framework for Health Equity 2022–2032", "source": "CMS Office of Minority Health"},
        ]},
        {"type": "text", "heading": "Case study: from screening data to an anchor-mission committee", "body": "Rush University Medical Center's SDOH screening effort, built with community partners including Catholic Charities, the Greater Chicago Food Depository, and CommunityHealth (Chicago's largest free clinic), did not stop at collecting screening data. Rush formed a West Side Anchor Committee explicitly to convert what the screening and stratified quality data showed into standing operating processes — shared goals, common referral pathways, and joint investment decisions with those community partners. That committee is the 'someone whose job it is to act' this lesson's governance loop describes, made concrete."},
        {"type": "comparison_table", "heading": "The 'So What' Test for a New Equity Metric", "leftLabel": "Metric ships without this", "rightLabel": "Metric passes the 'so what' test", "rows": [
            {"label": "Owner", "left": "No one is accountable if it moves the wrong way", "right": "A named person or committee reviews it on a set cadence"},
            {"label": "Threshold", "left": "No defined trigger for action", "right": "A stated gap size or trend that triggers a specific response"},
            {"label": "Cause pathway", "left": "Gap is reported with no hypothesis about cause", "right": "At least one testable hypothesis about cause is attached"},
            {"label": "Re-measurement", "left": "One-time snapshot", "right": "Scheduled to be measured again after the action"},
        ]},
    ],
    "quiz": {
        "id": "quiz_hea_from_score_to_action", "passingScore": 75, "shuffleOptions": True,
        "questions": [
            q_single("hea6a", "What is CAHPS, and why is it relevant to the Trust & Engagement dimension covered in Lesson 5?",
                [("A family of AHRQ patient-experience surveys since 1995 — it's the real data source the Trust proxy is standing in for", True, None), ("A federal payment penalty program for low-performing hospitals", False, "CAHPS is a survey/measurement program, not a payment penalty mechanism."), ("A replacement for HEDIS measures", False, "CAHPS and HEDIS are complementary, not substitutes — HEDIS measures clinical quality, CAHPS measures patient experience."), ("A tool exclusively for measuring hospital financial performance", False, "CAHPS measures patient-reported experience, not financial metrics.")],
                "CAHPS has been AHRQ's patient-experience survey program since 1995 — real, stratifiable CAHPS data is exactly what a Trust & Engagement proxy is trying to approximate in its absence."),
            q_single("hea6b", "What does the disparity-dashboard research literature identify as the common failure mode?",
                [("Dashboards exist and stratify data, but lack a clear accountability structure to act on what they show", True, None), ("Dashboards are technically impossible to build with current data", False, "Dashboards are widely built; the finding is about what happens after they're built, not feasibility."), ("Dashboards always eliminate the disparities they measure automatically", False, "The literature finds the opposite — measurement alone does not automatically produce action or improvement."), ("Hospitals are legally prohibited from building disparity dashboards", False, "No such prohibition exists; disparity dashboards (e.g., Moffitt's) are actively built and used.")],
                "The consistent finding is that stratified dashboards are common, but ones tied to a real accountability structure that acts on the data are much rarer — measurement without an owner tends to just sit in a report."),
            q_single("hea6c", "In the governance loop (measure → assess cause → act → re-measure), what should happen if a re-measurement shows the gap did not move?",
                [("Return to the 'assess cause' step — the hypothesized cause or the action taken was probably wrong", True, None), ("Discontinue measuring that gap entirely", False, "The loop's purpose is iterative correction, not abandonment after one unsuccessful cycle."), ("Automatically conclude the metric itself is invalid", False, "An unmoved gap after one intervention doesn't necessarily invalidate the metric — it suggests revisiting the cause hypothesis first."), ("Report the same action again without changes", False, "Repeating an ineffective action without revisiting the cause hypothesis skips the loop's diagnostic step.")],
                "The loop is iterative: an unmoved gap after an intervention is a signal to revisit the cause hypothesis, not to abandon measurement or repeat the same action blindly."),
            q_tf("hea6d", "Rush University Medical Center's West Side Anchor Committee was formed specifically to convert SDOH screening and stratified quality data into standing operational decisions with community partners.", False,
                "This matches the case study directly: the committee was formed to translate what screening data showed into shared goals, referral pathways, and investment decisions with partners like Catholic Charities and the Greater Chicago Food Depository.",
                "This statement is actually accurate as described in the case study, so 'True' — not 'False' — is correct."),
        ],
    },
})

# ─────────────────────────────────────────────────────────────────────────
TRACK["lessons"] = LESSONS
COURSE["tracks"] = [TRACK]

OUT.write_text(json.dumps(COURSE, indent=2))
print(f"Wrote {OUT} — {len(LESSONS)} lessons in track '{TRACK['slug']}'")
