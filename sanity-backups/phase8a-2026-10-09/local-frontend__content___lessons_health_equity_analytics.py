"""
_lessons_health_equity_analytics.py — rich Sanity bodies for the
"Health Equity Analytics" course (6 lessons, single track
health-equity-analytics-core).

Every statistic, program name, and named case below was WebSearched and
verified 2026-09-22 before writing. Sources are listed at the end of each
lesson body. Companion Supabase structure/fallback content:
_build_health_equity_analytics_course.py -> course_health_equity_analytics.json

Run from the repo root:
    python3 frontend/content/_lessons_health_equity_analytics.py
"""
exec(open('CONTENT_TEMPLATE.py').read())

COURSE_SLUG = "health-equity-analytics"
TOOL_URL = "/research-lab/population-equity?tab=equity"

# ════════════════════════════════════════════════════════════════════════
# LESSON 1 — From Awareness to Measurement
# ════════════════════════════════════════════════════════════════════════
L1_SLUG = "hea-measurement-foundations"
L1_TITLE = "From Awareness to Measurement: Why Health Equity Needs Analytics"

l1 = [
    h2('l1s1h', 'Naming a Gap Is Not Measuring It'),
    blk('l1s1p1', 'A companion course on this platform, "Health Equity & SDOH: From Awareness to Action," covers what a disparity is, why the United States has more of them than peer nations, and why they are treated as unjust rather than inevitable. This course starts one step further down the pipeline. Assume a system has already accepted that a disparity is a problem worth solving. The next question is entirely different in kind: how do you measure it reliably enough to act on, and honestly enough to know later whether the action actually worked?'),
    blk('l1s1p2', 'That turns out to be a genuinely hard analytic problem, not a simple counting exercise. Every disparity measurement requires a numerator, a denominator, a reference group to compare against, a sample large enough to trust, and a choice among several defensible ways to summarize the resulting gap. Different defensible choices, applied to the exact same underlying reality, produce different-looking pictures of it. This course is about making those choices well and disclosing them honestly — the discipline the book calls the Equity Imperative, translated into method.'),
    callout('l1s1c1', 'Health equity analytics is the set of methods for turning a suspected disparity into a defensible, actionable number — and for being explicit about every judgment call embedded in that number.'),
    stat_grid('l1s1sg1', [
        ('5 → 22', 'NCQA HEDIS measures stratified by race/ethnicity, MY2022 → MY2024', 'NCQA — nearly a 4.4x expansion in two measurement years'),
        ('5', 'Priorities in the CMS Framework for Health Equity 2022–2032', 'CMS Office of Minority Health'),
        ('1.9%', 'Inpatient admissions coded with an SDOH Z-code', 'Peer-reviewed SDOH Z-code adoption study, PMC'),
        ('2016', 'Year CMS launched the Mapping Medicare Disparities Tool', 'CMS Office of Minority Health'),
    ]),

    h2('l1s2h', 'The Five-Dimension Framework This Course Teaches'),
    blk('l1s2p1', 'This platform\'s own Health Equity Studio computes a composite it calls HEROI — Health Equity Return on Investment — as a weighted average across five dimensions: Access Equity (25%), Quality Equity (25%), Outcome Equity (25%), SDOH Burden (15%), and Trust & Engagement (10%). Those five weights are not arbitrary; they come from the book\'s own definition of the metric (Chapter 10, section 13.1) and they map directly onto the five lessons in this course.'),
    blk('l1s2p2', 'Lesson 2 covers the decomposition arithmetic underneath Access, Quality, and Outcome equity — rate differences, rate ratios, and summary indices. Lesson 3 covers how quality gets stratified in practice through HEDIS and NCQA reporting. Lesson 4 covers how SDOH Burden actually gets scored, from individual screening tools to area-level composite indices. Lesson 5 covers the weighting logic itself — how five separate 0–100 scores become one number — using HEROI as a fully worked, hands-on example. Lesson 6 closes the loop from score to organizational action.'),
    example('l1ex1', 'Try the Tool Directly',
        f'This platform\'s Health Equity Studio implements the exact five-dimension framework this course teaches, live, in the Research Lab. Open {TOOL_URL} and select the "HEROI Composite Score" tab.\n'
        'You will see all five dimensions computed from the same underlying disparity, geographic-access, and SDOH data — with the tool\'s own inline notes documenting exactly which upstream tab feeds each weighted input. Adjust the population sliders on the Disparity Calculator tab first, then return to the HEROI tab to see the composite update. Treat this as a running reference through the rest of the course, not a one-time visit.'),

    h2('l1s3h', 'The Measurement Build-Out — and Where It Has Stalled'),
    blk('l1s3p1', 'The infrastructure for this kind of measurement has expanded rapidly since 2022. NCQA began requiring race and ethnicity stratification for HEDIS measures in Measurement Year 2022, starting with 5 measures; that grew to 22 measures by Measurement Year 2024, part of what NCQA describes as folding health equity into all of its offerings rather than treating it as a side program. Separately, the CMS Office of Minority Health published a ten-year Framework for Health Equity 2022–2032, organized around five priorities, the first of which is expanding the collection, reporting, and analysis of standardized demographic data — the raw material every method in this course depends on.'),
    blk('l1s3p2', 'But measurement infrastructure and payment incentive are not the same system, and they are not currently moving at the same speed. CMS\'s Contract Year 2027 Medicare Advantage and Part D final rule did not implement the previously proposed Health Equity Index reward for Star Ratings — a reward that would have specifically incentivized closing gaps for disadvantaged enrollees. Instead, CMS continued the historical Reward Factor, which rewards consistently high performance across all enrollees rather than the narrowing of gaps between them. NCQA\'s own stratification requirement kept expanding in the same period. A careful analyst reads both facts together: the ability to see a disparity is not the same as an entity being financially rewarded for closing it.'),
    warning('l1w1', 'A Recurring Pattern', 'Watch for this pattern across every lesson in this course: measurement infrastructure (the ability to see a gap) tends to move ahead of incentive infrastructure (a financial or regulatory reason to close it). A well-built analytic tool can tell you precisely how large a disparity is without anyone being obligated to act on the number.'),
    table('l1t1', 'CMS Framework for Health Equity 2022–2032 — Five Priorities', [
        {'Priority': '1', 'Focus': 'Expand the collection, reporting, and analysis of standardized demographic data'},
        {'Priority': '2', 'Focus': 'Assess causes of disparities within CMS programs; address inequities in policies and operations'},
        {'Priority': '3', 'Focus': 'Build capacity of health care organizations and the workforce to reduce disparities'},
        {'Priority': '4', 'Focus': 'Advance language access, health literacy, and culturally tailored services'},
        {'Priority': '5', 'Focus': 'Increase all forms of accessibility to health care services and coverage'},
    ]),
    analogy('l1an1',
        'A home inspector does not issue one overall "condition score" for a house. They check the roof, the foundation, the wiring, and the plumbing separately, because a house can be sound in three of those and failing in the fourth — and averaging the four into one number would hide exactly the failure a buyer needs to know about.',
        'Why health equity analytics scores five separate dimensions (Access, Quality, Outcome, SDOH Burden, Trust) instead of one blended equity number'),

    h2('l1s4h', 'Why Data Completeness Breaks Naive Measurement'),
    blk('l1s4p1', 'Every method in this course depends on demographic and social-risk data actually existing for the population being measured — and that data is frequently incomplete in ways that are easy to miss. Race and ethnicity fields go unanswered at enrollment. Social risk factors go undocumented in a clinical encounter even when a patient discloses them verbally, because documenting them requires an extra coding step a busy clinician may skip.'),
    blk('l1s4p2', 'The scale of that gap is measurable in its own right. ICD-10-CM has carried a dedicated block of diagnosis codes for social determinants — Z55 through Z65, covering housing instability, food insecurity, transportation barriers, and similar factors — for years, and the Gravity Project has partnered with the American Medical Association to build standardized crosswalks from common screening tools directly to those codes. Despite that infrastructure, one peer-reviewed study found that only about 1.9% of inpatient hospital admissions carried an SDOH Z-code. A scoring system built on top of that data does not see zero social risk where a code is absent — it sees an absence of documentation, and it will systematically understate the true burden unless it corrects for that gap.'),
    compare('l1cmp1', 'Two Ways a Measurement Program Can Fail',
        'Under-measurement', ['Real disparities go undetected because demographic/SDOH data is incomplete', 'A composite score looks better than the underlying reality because bad news never gets coded', 'Resources get allocated as if the problem does not exist'],
        'Over-interpretation', ['A rate built from a handful of patients is treated as a stable, real disparity', 'Small-cell noise gets reported as an actionable finding', 'An analyst chases a "gap" that disappears with the next quarter\'s data']),

    takeaway('l1tw', [
        'Health equity analytics is the discipline of measuring a disparity reliably and honestly, not just naming that one exists.',
        'This platform\'s HEROI composite weights five dimensions — Access (25%), Quality (25%), Outcome (25%), SDOH Burden (15%), Trust & Engagement (10%) — and this course is built lesson-by-lesson around those five dimensions.',
        'NCQA expanded race/ethnicity-stratified HEDIS measures from 5 (MY2022) to 22 (MY2024), a real and rapid build-out of measurement infrastructure.',
        'CMS declined to implement a proposed Health Equity Index reward for 2027 Medicare Advantage Star Ratings, continuing the historical Reward Factor instead — measurement and incentive are not moving at the same pace.',
        'Only about 1.9% of inpatient admissions carry an SDOH Z-code despite the codes and crosswalks existing — a documentation gap that will understate any claims-based social-risk score.',
        'Both under-measurement (missing real gaps due to incomplete data) and over-interpretation (treating small-sample noise as a real finding) are failure modes this course teaches you to guard against.',
        'The Health Equity Studio\'s HEROI Composite Score tab is a live, hands-on implementation of the framework this course teaches — use it throughout, not just once.',
    ]),

    quiz('l1qz',
        'A hospital reports that only 2% of its admissions carry an SDOH Z-code. What is the most defensible interpretation?',
        [
            ('Only 2% of patients have any social risk factors', False),
            ('The documentation rate is low; the true prevalence of social risk is very likely higher than the coded rate suggests', True),
            ('SDOH Z-codes are not a real part of ICD-10-CM', False),
            ('The hospital is legally barred from coding social risk factors', False),
        ],
        'National data shows SDOH Z-code use around 1.9% of inpatient admissions despite CDC/WHO emphasis on their use and active crosswalk tools from the Gravity Project and AMA — the low rate reflects a documentation gap, not a true absence of need.'),

    h2('src', 'Sources'),
    blk('src1', '[1] NCQA, Race and Ethnicity Stratification of HEDIS Measures — https://www.ncqa.org/health-equity/data-and-measurement/ — MY2022 (5 measures) to MY2024 (22 measures) stratification expansion'),
    blk('src2', '[2] CMS Office of Minority Health, CMS Framework for Health Equity 2022–2032 — https://www.cms.gov/files/document/cms-framework-health-equity.pdf — the five priorities'),
    blk('src3', '[3] CMS, Contract Year 2027 Medicare Advantage and Part D Final Rule Fact Sheet — https://www.cms.gov/newsroom/fact-sheets/contract-year-2027-medicare-advantage-part-d-final-rule — Health Equity Index reward not implemented; historical Reward Factor continued'),
    blk('src4', '[4] SDOH ICD-10 Z-code adoption study — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12608873/ — ~1.9% of inpatient admissions coded with an SDOH Z-code'),
    blk('src5', '[5] CMS, Mapping Medicare Disparities (MMD) Tool — https://www.cms.gov/priorities/health-equity/minority-health/research-data/mapping-medicare-disparities-tool-mmd — launched March 2016'),
]

# ════════════════════════════════════════════════════════════════════════
# LESSON 2 — Disparity Decomposition
# ════════════════════════════════════════════════════════════════════════
L2_SLUG = "hea-disparity-decomposition"
L2_TITLE = "Disparity Decomposition: From Raw Gaps to Actionable Signals"

l2 = [
    h2('l2s1h', 'Two Honest Ways to Describe the Same Gap'),
    blk('l2s1p1', 'Suppose Group A has an adverse-outcome rate of 20% and Group B has a rate of 10%. The rate difference — the absolute disparity — is 10 percentage points. The rate ratio — the relative disparity — is 2.0: Group A\'s rate is twice Group B\'s. Both descriptions are simultaneously true of the identical underlying data, and each is more informative in a different context.'),
    blk('l2s1p2', 'The rate difference answers "how many more people in Group A are affected, in absolute terms?" The rate ratio answers "how much more likely is Group A to be affected, relative to Group B?" A disparity that looks modest on one scale can look large on the other: a rate difference of 2 percentage points sounds small, but if the reference rate is only 1%, that same gap is a 3x rate ratio. AHRQ\'s National Healthcare Quality and Disparities Report — the federally mandated annual disparities report — computes rate ratios between each priority population and a reference group as its headline disparity statistic.'),
    callout('l2s1c1', 'Absolute disparity (rate difference) and relative disparity (rate ratio) are both legitimate summaries of the same underlying gap. Reporting only the smaller-looking one is a framing choice, not a neutral default.'),
    table('l2t1', 'Worked Example: Two Ways to Report the Same Gap', [
        {'Scenario': 'Group A 20% vs. Group B 10%', 'Rate_Difference': '10 percentage points', 'Rate_Ratio': '2.0x'},
        {'Scenario': 'Group A 3% vs. Group B 1%', 'Rate_Difference': '2 percentage points', 'Rate_Ratio': '3.0x'},
        {'Scenario': 'Group A 55% vs. Group B 45%', 'Rate_Difference': '10 percentage points', 'Rate_Ratio': '1.2x'},
    ]),
    blk('l2s1p3', 'Notice the second and third rows: an identical 10-point rate difference (row 1 and row 3) produces very different rate ratios (2.0x vs. 1.2x) depending on the baseline rate, and a small 2-point difference (row 2) can still be a 3x ratio when the baseline is low. This is exactly why AHRQ\'s NHQDR reports rate ratios rather than differences alone — the ratio surfaces gaps that a raw percentage-point comparison can hide.'),

    h2('l2s2h', 'Summarizing Disparity Across Many Subgroups'),
    blk('l2s2p1', 'A single rate ratio compares exactly two groups. Real populations usually split into many subgroups at once — several racial and ethnic categories, multiple income bands, several education levels — and tracking a dozen separate two-group ratios over time gets unwieldy fast. Jeffrey Pearcy and Kenneth Keppel addressed this directly in a 2002 Public Health Reports paper written to help track progress toward the original Healthy People 2010 disparity-elimination goal.'),
    blk('l2s2p2', 'Their proposed Index of Disparity (ID) is a modified coefficient of variation computed across all subgroup rates relative to a chosen reference rate, expressed as a single percentage that can be tracked over time. Applying it, they found that gender disparity in cardiovascular disease deaths declined between 1989 and 1998, while racial and ethnic disparity in the same outcome stayed essentially unchanged over the same period — a single index number carrying two very different underlying trends, disaggregated by which grouping variable you choose.'),
    stat_grid('l2s2sg1', [
        ('2002', 'Year Pearcy & Keppel published the Index of Disparity', 'Public Health Reports, Vol. 117'),
        ('1995', 'Year AHRQ\'s CAHPS patient-experience survey program began', 'AHRQ'),
        ('2016', 'Year CMS launched the Mapping Medicare Disparities Tool', 'CMS Office of Minority Health'),
    ]),

    h2('l2s3h', 'The Reference-Group Problem'),
    blk('l2s3p1', 'Every disparity ratio needs something to compare against, and that choice of reference group is not neutral. AHRQ\'s own methodology documentation is explicit that reference-group selection is an ongoing, actively reviewed methods decision, not a fixed convention: comparing every subgroup to the population\'s single best-performing group makes every gap look as large as possible, since the comparison point is the ceiling. Comparing every subgroup to the overall population average makes gaps look smaller, because the average already has the lower-performing groups folded into it.'),
    blk('l2s3p2', 'Neither choice is wrong on its own terms. A best-group reference is more useful for setting an aspirational target — it shows exactly how far the furthest-behind group is from what is demonstrably achievable elsewhere in the same population. A population-average reference is more useful for tracking whether the population as a whole is converging over time. The failure mode is switching between them across years or across measures without disclosing the switch, which can make progress — or the absence of it — look different than it actually is.'),
    compare('l2cmp1', 'Reference-Group Choice Changes What You See',
        'Best-performing group as reference', ['Larger, more visible gaps', 'Best for setting an aspirational target', 'Can look alarmist without context'],
        'Population average as reference', ['Smaller-looking gaps', 'Best for tracking population-wide trend', 'Can understate the worst-off group\'s true gap']),

    h2('l2s4h', 'Small Numbers Break Naive Stratification'),
    blk('l2s4p1', 'Stratifying a rate by subgroup necessarily shrinks each subgroup\'s sample size relative to the whole population. A rate computed from 20 patients can swing from a 5% disparity to a 25% disparity with just two additional events — noise, not a real change in underlying risk. AHRQ and NCQA both apply minimum-cell-size suppression rules before publishing a stratified rate, withholding or flagging any cell too small to be statistically reliable rather than publishing an unstable number as if it were solid.'),
    highlight('l2hl1', 'A disparity dashboard built without a minimum-N suppression rule will manufacture false disparities out of pure statistical noise in its smallest subgroups — this is a design requirement, not an optional refinement.'),

    h2('l2s5h', 'Case Study: The Mapping Medicare Disparities Tool'),
    example('l2ex1', 'CMS Mapping Medicare Disparities (MMD) Tool',
        'CMS\'s Office of Minority Health launched the MMD Tool in March 2016 to make the reference-group and small-numbers problems this lesson describes solvable for public users without requiring each analyst to make those calls independently. It offers two views: a Population View, identifying disparities between subgroups (race/ethnicity, sex, age, dual-eligibility status) in outcomes, utilization, and spending; and a Hospital View for facility-level comparisons.\n'
        'The tool tracks prevalence across 18-plus chronic conditions plus end-stage renal disease and disability status, along with Medicare spending, hospital and emergency-department utilization, preventable hospitalizations, readmissions, and mortality — and it applies its own pre-set suppression rules and reference-group conventions consistently across all of that, so a researcher or advocate downloading its tables inherits a defensible, disclosed set of methods choices rather than having to invent one from scratch.'),

    takeaway('l2tw', [
        'The rate difference (absolute disparity) and the rate ratio (relative disparity) describe the same gap differently — both are legitimate, and reporting only one is a framing choice.',
        'Pearcy and Keppel\'s 2002 Index of Disparity summarizes a gap across many subgroups at once into a single trackable percentage, developed to monitor progress toward Healthy People 2010\'s disparity-elimination goal.',
        'Choosing a best-performing-group reference makes disparities look larger; choosing a population-average reference makes them look smaller — both are defensible, but the choice must be disclosed and held constant to track real change.',
        'Small subgroup sample sizes produce statistically unstable rates; AHRQ and NCQA apply minimum-cell-size suppression rules specifically to prevent noise from being reported as a real disparity.',
        'CMS\'s Mapping Medicare Disparities Tool (2016) is a working example of solving these problems once, centrally, rather than leaving every downstream analyst to remake the same methods decisions inconsistently.',
        'These decomposition methods are the arithmetic underneath the Access, Quality, and Outcome dimensions of this platform\'s HEROI composite, covered in Lesson 5.',
    ]),

    quiz('l2qz',
        'An analyst compares every racial/ethnic subgroup\'s screening rate to the single highest-performing subgroup, rather than to the population average. What is the most likely effect on the reported disparities?',
        [
            ('They will look larger than if the population average had been used as the reference', True),
            ('They will look smaller than if the population average had been used', False),
            ('The choice of reference group has no effect on the reported disparity size', False),
            ('This comparison is statistically invalid and cannot be computed', False),
        ],
        'Comparing every group to the ceiling (the best-performing group) produces larger visible gaps than comparing to a population average, because the average already blends in the lower-performing groups — this is exactly the reference-group effect AHRQ\'s methodology documentation flags as a disclosed choice.'),

    h2('src', 'Sources'),
    blk('src1', '[1] Pearcy JN, Keppel KG. A Summary Measure of Health Disparity. Public Health Reports 2002;117(3):273 — https://journals.sagepub.com/doi/abs/10.1093/phr/117.3.273 — the Index of Disparity methodology'),
    blk('src2', '[2] AHRQ, Methods of the National Healthcare Quality and Disparities Report — https://www.ncbi.nlm.nih.gov/books/NBK600456/ — rate ratio methodology and reference-group documentation'),
    blk('src3', '[3] CMS, Mapping Medicare Disparities (MMD) Tool — https://www.cms.gov/priorities/health-equity/minority-health/research-data/mapping-medicare-disparities-tool-mmd — launched 2016, Population and Hospital views'),
    blk('src4', '[4] AHRQ, About the CAHPS Program — https://www.ahrq.gov/cahps/about-cahps/index.html — program began 1995'),
]

# ════════════════════════════════════════════════════════════════════════
# LESSON 3 — Stratified Quality Measurement
# ════════════════════════════════════════════════════════════════════════
L3_SLUG = "hea-stratified-quality-measurement"
L3_TITLE = "Stratified Quality Measurement: HEDIS, NCQA, and the Star Ratings Fight"

l3 = [
    h2('l3s1h', 'What "Stratified" Means, Operationally'),
    blk('l3s1p1', 'A standard HEDIS measure reports a single plan-wide number — for example, the share of eligible members who received a colorectal cancer screening. A stratified version of that same measure reports it separately by race, ethnicity, and, for some measures, language: the screening rate for Black members, for Hispanic members, for Asian members, for White members, side by side. Nothing about the clinical definition of the measure changes. What changes is that a plan can no longer average away a gap between subgroups inside one clean headline number.'),
    blk('l3s1p2', 'NCQA began requiring this for HEDIS measures in Measurement Year 2022, starting with 5 measures. By Measurement Year 2024, that had grown to 22 measures, and NCQA continued proposing further additions and revisions for Measurement Year 2025 — part of a stated strategy of building health equity into all of its measurement offerings rather than running it as a separate initiative alongside standard HEDIS.'),
    stat_grid('l3s1sg1', [
        ('5', 'HEDIS measures stratified by race/ethnicity, MY2022', 'NCQA'),
        ('22', 'HEDIS measures stratified by race/ethnicity, MY2024', 'NCQA'),
        ('101', 'Health plan contracts studied in NCQA\'s Race and Ethnicity Stratification Learning Network', 'NCQA'),
        ('19M+', 'Covered lives represented across those 101 contracts', 'NCQA'),
    ]),

    h2('l3s2h', 'Direct vs. Indirect Race and Ethnicity Data'),
    blk('l3s2p1', 'Stratification only works if a plan actually has race and ethnicity data on its members, and much of that data is missing at the individual level. NCQA\'s reporting requirement addresses this directly: for every stratified value, plans must disclose whether it came from direct data (the member self-reported it, typically at enrollment or during a clinical encounter) or indirect data (an alternate source, most commonly geocoding a member\'s address against Census tract demographics, used to infer a probable value when no self-report exists).'),
    blk('l3s2p2', 'Direct data is more accurate for any given individual — the member stated it — but is frequently incomplete, since many members never answer a demographic question at all. Indirect data can fill most or all of the population-level gap but introduces real risk of individual misclassification, especially in racially and ethnically mixed neighborhoods where geocoding a single address to a single inferred race is a much blunter instrument than an actual self-report. The disclosure requirement exists precisely so a reader of a stratified result can tell how much of the underlying data is a self-report versus an inference, rather than being handed one clean-looking number that hides the difference.'),
    compare('l3cmp1', 'Direct vs. Indirect Race/Ethnicity Data',
        'Direct (self-reported)', ['High individual accuracy — the member stated it', 'Often incomplete — many members never respond', 'NCQA\'s preferred source when available'],
        'Indirect (geocoded/imputed)', ['Can fill most of the population-level gap', 'Probabilistic — can misclassify any given individual', 'Must be labeled as indirect under NCQA reporting rules']),
    callout('l3s2c1', 'A stratified measure built mostly on indirect data is measuring something real, but with materially more individual-level noise than the same measure built on direct self-report — and that difference must be disclosed, not absorbed silently into a single clean-looking rate.'),
    analogy('l3an1',
        'Sorting a town\'s mail by zip code before delivery, instead of dumping every letter for the whole county into one bin, does not change what any single letter says. It changes whether a mail carrier can see that one zip code\'s mail keeps arriving late while the rest of the county\'s does not.',
        'What stratifying a HEDIS measure by race and ethnicity does — and does not — change about the underlying clinical measure'),

    h2('l3s3h', 'A Live Example: Measurement Outrunning Incentive'),
    blk('l3s3p1', 'CMS proposed a Health Equity Index reward — initially branded the "Excellent Health Outcomes for All" reward — as a new Medicare Advantage Star Ratings incentive specifically designed to reward plans for improving performance among disadvantaged subsets of their enrollees, rather than rewarding uniformly high performance across everyone. In the Contract Year 2027 Medicare Advantage and Part D final rule, CMS did not implement that reward, choosing instead to continue the pre-existing, non-equity-targeted Reward Factor, which rewards plans for consistently high performance across all enrollees regardless of whether gaps between subgroups are narrowing.'),
    blk('l3s3p2', 'Meanwhile, NCQA\'s own stratified-measure requirement kept expanding across the same period, from 5 measures to 22. Put those two facts side by side and a clear pattern emerges: the analytic capacity to detect a quality-measure disparity by race and ethnicity is expanding faster than the financial infrastructure to reward a plan specifically for closing it. Anyone building an equity analytics program on top of HEDIS stratification should understand that the measurement they are building has not, at least as of this writing, been matched by a comparable payment lever at the federal level.'),
    warning('l3w1', 'Do Not Confuse Measurement With Incentive', 'A plan can be fully compliant with every NCQA stratification requirement and still face no direct Star Ratings financial reward specifically tied to closing the gaps that stratification reveals. Measurement compliance and equity-focused payment incentive are two separate systems, moving on two separate timelines.'),

    h2('l3s4h', 'Case Study: Rush University Medical Center'),
    example('l3ex1', 'Rush University Medical Center — Data Into System Strategy',
        'Rush University Medical Center\'s health equity approach, documented in a 2021 NEJM Catalyst case study titled "Health Equity as a System Strategy," treated stratified data as an organizing principle for the whole institution rather than a compliance artifact filed once a year by the quality department. Rush built its strategy around what stratified quality and screening data showed about its surrounding West Side Chicago neighborhood.\n'
        'Concretely, that meant forming a dedicated Anchor Mission structure — the West Side Anchor Committee — explicitly tasked with translating what the data showed into hiring, purchasing, and community-investment decisions, not only clinical protocol changes. It is a working illustration of what NCQA\'s stratification requirement exists to make possible: an organization can only act on a gap it can see broken out by subgroup, and Rush\'s case shows that visibility becoming an organizational structure rather than staying a static report.'),

    takeaway('l3tw', [
        'Stratifying a HEDIS measure means reporting the identical clinical measure separately by subgroup (race, ethnicity, sometimes language) instead of one blended number.',
        'NCQA grew its stratified-measure requirement from 5 measures (MY2022) to 22 measures (MY2024), covering 101 studied contracts and 19M+ covered lives in its Learning Network.',
        'Direct (self-reported) race/ethnicity data is individually more accurate but often incomplete; indirect (geocoded/imputed) data fills population gaps but risks individual misclassification — NCQA requires both to be labeled, not blended silently.',
        'CMS declined to implement a proposed Health Equity Index reward for 2027 Medicare Advantage Star Ratings, continuing the non-equity-targeted historical Reward Factor instead — a real, current example of measurement outrunning incentive.',
        'Rush University Medical Center converted stratified data into an Anchor Mission committee with authority over hiring, purchasing, and community investment — not just a clinical protocol change.',
        'A quality-measurement program can be fully compliant with stratification requirements and still lack any specific federal financial reward for closing the gaps that stratification reveals.',
    ]),

    quiz('l3qz',
        'A health plan reports a stratified HEDIS measure where most of the race/ethnicity values came from geocoding member addresses against Census data, because few members self-reported. Under NCQA rules, how must this be handled?',
        [
            ('The plan should blend it with any direct data and report one unlabeled number', False),
            ('The plan must disclose this as indirect data, separate from any direct self-reported values', True),
            ('The plan cannot report the stratified measure at all in this case', False),
            ('The plan must exclude those members from the measure entirely', False),
        ],
        'NCQA requires plans to label each stratified value by its data source — direct (self-reported) or indirect (e.g., geocoded) — so a reader can see how much of the result rests on inference rather than self-report.'),

    h2('src', 'Sources'),
    blk('src1', '[1] NCQA, Expansion of Race and Ethnicity Stratification — https://wpcdn.ncqa.org/www-prod/wp-content/uploads/2023/02/02.-Race-Ethnicity.pdf — MY2022→MY2024 measure count growth, direct vs. indirect data requirement'),
    blk('src2', '[2] NCQA Race and Ethnicity Stratification Learning Network — https://res.ncqa.org/ — 101 contracts, 19M+ covered lives'),
    blk('src3', '[3] CMS, Contract Year 2027 Medicare Advantage and Part D Final Rule Fact Sheet — https://www.cms.gov/newsroom/fact-sheets/contract-year-2027-medicare-advantage-part-d-final-rule — Health Equity Index reward not implemented for 2027'),
    blk('src4', '[4] Rush University Medical Center, "Health Equity as a System Strategy," NEJM Catalyst 2021 — https://catalyst.nejm.org/doi/full/10.1056/CAT.20.0674 — West Side Anchor Committee case study'),
]

# ════════════════════════════════════════════════════════════════════════
# LESSON 4 — SDOH Burden Scoring
# ════════════════════════════════════════════════════════════════════════
L4_SLUG = "hea-sdoh-burden-scoring"
L4_TITLE = "Scoring SDOH Burden: From PRAPARE to Composite Indices"

l4 = [
    h2('l4s1h', 'Two Different Questions, Two Different Tools'),
    blk('l4s1p1', '"What social risks does this specific patient face?" and "how socially deprived is this specific neighborhood?" sound similar but require entirely different instruments. The first is answered by an individual-level screening tool, administered directly to a patient during an encounter. The second is answered by an area-level composite index, built once from public data about a geography and then applied to every patient who lives there, regardless of their individual circumstances.'),
    blk('l4s1p2', 'Both are legitimate inputs to an SDOH burden score, and a well-built scoring system typically uses both: the individual tool wherever a clinical encounter exists to administer it, and the area-level index as a population-level signal or a fallback for patients who were never screened directly.'),
    callout('l4s1c1', 'An area-level deprivation score is not a substitute for individual screening — it is a different instrument answering a different question, useful precisely where individual screening data does not yet exist.'),

    h2('l4s2h', 'PRAPARE — the Individual-Level Standard'),
    blk('l4s2p1', 'PRAPARE (the Protocol for Responding to and Assessing Patients\' Assets, Risks, and Experiences) was developed in 2013 by the National Association of Community Health Centers, in partnership with the Association of Asian Pacific Community Health Organizations and the Oregon Primary Care Association. It screens for 22 distinct social determinants of health factors — housing, food security, transportation, income, and more.'),
    blk('l4s2p2', 'A deliberate design choice made PRAPARE unusually easy to adopt at scale: it was standardized against ICD-10, LOINC, and SNOMED CT codes from the start, so a clinician\'s answers translate directly into documentable, interoperable data rather than a free-text note. That standardization is a large part of why PRAPARE became one of the most widely used SDOH screening tools in U.S. community health centers, is available free in most major EHR platforms, and has been translated into 26 languages.'),
    example('l4ex1', 'PRAPARE\'s Design Choice as a Case Study', 'PRAPARE\'s codification against LOINC, SNOMED CT, and ICD-10 (including the SDOH Z-codes covered later in this lesson) is precisely what let it scale into "most major EHR platforms" rather than remaining a paper form or a locally built questionnaire. A screening tool that produces answers a system cannot store, query, or aggregate is much harder to turn into a population-level score — the standardization decision made at PRAPARE\'s creation in 2013 is inseparable from its later adoption.'),

    h2('l4s3h', 'Area-Level Composite Indices'),
    blk('l4s3p1', 'The CDC/ATSDR Social Vulnerability Index (SVI) uses 16 variables drawn from the 5-year American Community Survey, grouped into four themes — socioeconomic status; household composition and disability; minority status and language; and housing type and transportation — combined into a single percentile ranking (0 to 1, higher meaning more vulnerable) at the census-tract level. It was originally built to help identify communities needing support before, during, and after disasters, and has since been adopted more broadly as a general area-level deprivation signal.'),
    blk('l4s3p2', 'Amy Kind and William Buckingham published a distinct approach, the Area Deprivation Index (ADI), in a 2018 New England Journal of Medicine perspective, "Making Neighborhood-Disadvantage Metrics Accessible." The ADI ranks census block groups on 17 measures spanning income, education, employment, and housing quality. Kind\'s team at the University of Wisconsin–Madison built the accompanying Neighborhood Atlas specifically to make block-group-level rankings freely downloadable, turning what had been an academic construct into a tool any health system, researcher, or policymaker could apply to a patient address.'),
    stat_grid('l4s4sg1', [
        ('22', 'Social determinants of health factors PRAPARE screens for', 'NACHC'),
        ('26', 'Languages PRAPARE has been translated into', 'NACHC'),
        ('16', 'Census variables in the CDC/ATSDR Social Vulnerability Index', 'CDC/ATSDR'),
        ('17', 'Measures in the Area Deprivation Index', 'Kind & Buckingham, NEJM 2018'),
    ]),

    h2('l4s5h', 'How a Composite Index Actually Gets Built'),
    steps('l4st1', 'Composite Index Construction', [
        ('Domain selection', 'Choose which underlying factors count toward deprivation — SVI\'s four themes, or the ADI\'s 17 measures. This is a values choice about which social conditions are in scope, not a purely technical one.'),
        ('Standardization', 'Convert each raw variable (income, percent without a vehicle, educational attainment, and so on) onto a common scale — typically a percentile rank or z-score — so measures in different units can be combined meaningfully.'),
        ('Weighting', 'Decide how much each standardized domain contributes to the final score. Equal weighting across domains is common and easy to defend, but it is a choice, not a neutral default — a different weighting scheme is equally defensible and would produce different rankings.'),
        ('Aggregation', 'Sum or average the weighted, standardized components into one score or percentile, typically reported at the census tract or block-group level.'),
    ]),
    warning('l4w1', 'Two Valid Indices Can Disagree', 'SVI and ADI both measure area-level social deprivation, using different domains and different weighting choices. They can — and sometimes do — rank the exact same neighborhood differently. Neither ranking is "wrong"; an analyst using either index should say which one and be able to explain why that one was chosen for the task at hand.'),
    table('l4t1', 'Three SDOH Instruments, Side by Side', [
        {'Tool': 'PRAPARE', 'Level': 'Individual patient', 'Built_By': 'NACHC (2013)', 'Factors': '22 SDOH factors'},
        {'Tool': 'CDC/ATSDR SVI', 'Level': 'Census tract', 'Built_By': 'CDC/ATSDR', 'Factors': '16 variables, 4 themes'},
        {'Tool': 'Area Deprivation Index', 'Level': 'Census block group', 'Built_By': 'Kind & Buckingham, U. Wisconsin', 'Factors': '17 measures'},
    ]),

    h2('l4s6h', 'The Claims-Data Gap: SDOH Z-Codes'),
    blk('l4s6p1', 'ICD-10-CM diagnosis codes Z55 through Z65 exist specifically to document social determinants of health inside a clinical encounter — housing instability, food insecurity, transportation barriers, and related factors. The Gravity Project, working with the American Medical Association, has built standardized crosswalks mapping common SDOH screening questions, including CMS\'s own Accountable Health Communities screening tool, directly to the appropriate Z-code and SNOMED CT terms.'),
    blk('l4s6p2', 'Despite that infrastructure and explicit CDC and WHO emphasis on using these codes, one peer-reviewed study found only about 1.9% of inpatient hospital admissions carried an SDOH Z-code. Any SDOH burden score built primarily from claims data will systematically understate real social risk for exactly this reason — the code being rare in the data does not mean the underlying social need is rare in the population; it means it mostly is not being documented.'),

    takeaway('l4tw', [
        'Individual-level screening (PRAPARE) and area-level composite indices (SVI, ADI) answer different questions and are built by entirely different methods — a strong SDOH scoring system typically uses both.',
        'PRAPARE (NACHC, 2013) screens 22 SDOH factors, is codified against ICD-10/LOINC/SNOMED, is free in most EHRs, and is translated into 26 languages — its standardization is a large part of why it scaled.',
        'The CDC/ATSDR Social Vulnerability Index uses 16 variables across 4 themes; the Area Deprivation Index (Kind & Buckingham, NEJM 2018) uses 17 measures via the Neighborhood Atlas — different, equally valid area-level approaches.',
        'Building any composite index requires four real judgment calls: domain selection, standardization method, weighting scheme, and aggregation — none of them purely neutral or purely technical.',
        'Two well-built indices covering the same reality (SVI and ADI) can rank the same neighborhood differently because of these judgment calls — that is a methods fact, not an error in either index.',
        'Only about 1.9% of inpatient admissions carry an SDOH Z-code, so any claims-based SDOH burden score will understate true social risk unless it corrects for this documentation gap.',
        'This lesson\'s SDOH scoring methodology is the direct input to the SDOH Burden dimension (15% weight) of this platform\'s HEROI composite, covered next in Lesson 5.',
    ]),

    quiz('l4qz',
        'A health system wants to estimate social risk for patients who have never completed a PRAPARE screening. What is the most appropriate approach from this lesson?',
        [
            ('Assume those patients have no social risk factors, since none were reported', False),
            ('Apply an area-level composite index (like SVI or ADI) based on the patient\'s home address as a population-level proxy', True),
            ('Wait until every patient completes a PRAPARE screening before scoring anyone', False),
            ('Use the hospital\'s overall average PRAPARE score for every unscreened patient regardless of where they live', False),
        ],
        'Area-level indices like SVI and ADI exist precisely for this situation — they provide a defensible population-level social-risk signal from an address alone, without requiring an individual screening encounter, though they are a different (coarser) instrument than direct screening.'),

    h2('src', 'Sources'),
    blk('src1', '[1] NACHC, PRAPARE — https://www.nachc.org/resource/prapare/ — 22 factors, developed 2013, EHR availability and language translations'),
    blk('src2', '[2] CDC/ATSDR, Social Vulnerability Index — https://www.atsdr.cdc.gov/place-health/php/svi/index.html — 16 variables, 4 themes'),
    blk('src3', '[3] Kind AJH, Buckingham WR. Making Neighborhood-Disadvantage Metrics Accessible — The Neighborhood Atlas. NEJM 2018;378:2456-2458 — https://www.nejm.org/doi/10.1056/NEJMp1802313 — Area Deprivation Index, 17 measures'),
    blk('src4', '[4] SDOH ICD-10 Z-code adoption study — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12608873/ — ~1.9% of inpatient admissions coded'),
    blk('src5', '[5] CMS/Gravity Project SDOH Z-code resource — https://www.cms.gov/files/document/cms-2023-omh-z-code-resource.pdf — Z55–Z65 crosswalks'),
]

# ════════════════════════════════════════════════════════════════════════
# LESSON 5 — Equity-Weighted Economics / HEROI
# ════════════════════════════════════════════════════════════════════════
L5_SLUG = "hea-equity-weighted-economics"
L5_TITLE = "Weighting Equity Into the Dollar: HEROI and Distributional Cost-Effectiveness"

l5 = [
    h2('l5s1h', 'Standard Cost-Effectiveness Analysis Is Equity-Blind by Design'),
    blk('l5s1p1', 'Conventional cost-effectiveness analysis (CEA) asks one question: for a given budget, which intervention produces the most total health, usually measured in quality-adjusted life years (QALYs)? A QALY gained by a well-off, easy-to-reach population counts exactly the same in that arithmetic as a QALY gained by a disadvantaged, harder-to-reach population.'),
    blk('l5s1p2', 'That is a deliberate simplification that makes standard CEA tractable, and it is also precisely why CEA used alone can systematically favor interventions that help people who are already relatively well off — simply because they are cheaper and easier to reach, not because helping them produces more total value than helping someone worse off.'),
    callout('l5s1c1', 'Distributional cost-effectiveness analysis (DCEA) extends standard CEA by explicitly trading off total health gained against the reduction of health inequality, rather than maximizing total health alone.'),

    h2('l5s2h', 'Distributional Cost-Effectiveness Analysis and the Equity Weight'),
    blk('l5s2p1', 'Richard Cookson, Susan Griffin, Ole Norheim, and Anthony Culyer formalized this field in their 2020 Oxford University Press volume, Distributional Cost-Effectiveness Analysis: Quantifying Health Equity Impacts and Trade-Offs. Its central mechanism is an equity weight derived from the Atkinson index of inequality aversion, denoted ε (epsilon).'),
    blk('l5s2p2', 'At ε = 0, there is no special priority given to the worst-off group, and DCEA collapses back to standard CEA. Cookson and colleagues\' 2017 illustrative work used ε = 0.5 as a default representing mild inequality aversion; larger values place sharply more priority on health gains for the worst-off group. The critical methodological point is that ε is a value judgment, not a measured fact — a rigorous DCEA analysis states its chosen ε explicitly, rather than burying that judgment call inside an unexplained final number.'),
    analogy('l5an1',
        'A thumb placed lightly on one side of a balance scale (ε = 0.5) tips the result somewhat toward that side without ignoring the other; a thumb pressed down hard (a large ε) can outweigh almost anything on the other side. No thumb at all (ε = 0) means the scale reads exactly as if the two sides were never distinguished — which is what standard, equity-blind cost-effectiveness analysis does.',
        'What the equity-weight parameter ε does inside distributional cost-effectiveness analysis'),
    stat_grid('l5s3sg1', [
        ('2020', 'Year Cookson, Griffin, Norheim & Culyer\'s DCEA volume was published (Oxford)', 'Oxford University Press'),
        ('0', 'ε value at which DCEA collapses to standard, equity-blind CEA', 'Cookson et al.'),
        ('0.5', 'Illustrative default ε (mild inequality aversion) used in Cookson et al. 2017', 'Cookson et al., 2017'),
    ]),

    h2('l5s4h', 'HEROI — This Platform\'s Worked Example'),
    blk('l5s4p1', 'This platform\'s Health Equity Studio computes HEROI (Health Equity Return on Investment) as a weighted average of five 0–100 dimension scores, each fed by a different tab of the same tool: Access Equity (25%), Quality Equity (25%), Outcome Equity (25%), SDOH Burden (15%), and Trust & Engagement (10%).'),
    blk('l5s4p2', 'Access Equity blends the racial and ethnic disparity signal from the tool\'s Disparity Calculator with the metro-versus-isolated-rural gap computed by its Geographic Access Gap Analyzer. Quality Equity and Outcome Equity apply the same disparity-decomposition logic taught in Lesson 2 to quality and outcome measures, respectively. SDOH Burden reuses the exact composite-scoring method built in the tool\'s SDOH Composite & ROI tab — the same construction method taught in Lesson 4 of this course. Each dimension, in other words, is not an independent invention; it is this course\'s own methodology, applied consistently, then combined by weighted average into one number.'),
    steps('l5st1', 'How HEROI Combines Its Five Inputs', [
        ('Access Equity (25%)', 'Racial/ethnic disparity signal (Disparity Calculator) blended with the geographic access gap (Geographic Access Gap Analyzer).'),
        ('Quality Equity (25%)', 'Disparity decomposition (Lesson 2 methods) applied to stratified quality measures.'),
        ('Outcome Equity (25%)', 'The same disparity decomposition applied to outcome measures.'),
        ('SDOH Burden (15%)', 'The composite SDOH score from the SDOH Composite & ROI tab, built via the domain-selection/standardization/weighting method taught in Lesson 4.'),
        ('Trust & Engagement (10%)', 'A documented proxy pending real CAHPS survey data — see the warning below.'),
    ]),
    example('l5ex1', 'Open the Tool',
        f'Open {TOOL_URL} and select the "HEROI Composite Score" tab. The platform documents its own dimension notes inline — you can see exactly which upstream tab feeds each weighted input, computed live from whatever population profile you set on the Disparity Calculator tab. This is the same tool referenced in Lesson 1; by this point in the course, every one of its five dimensions should be traceable to a method you have now learned.'),

    h2('l5s5h', 'An Honestly Labeled Proxy'),
    blk('l5s5p1', 'The Health Equity Studio\'s own documentation states plainly that its Trust & Engagement dimension is a documented proxy, pending real CAHPS (Consumer Assessment of Healthcare Providers and Systems) survey data — not a claim that patient-trust measurement has already been solved. CAHPS is an AHRQ program dating to 1995, covering standardized patient-experience surveys across ambulatory care, hospitals, and other settings; it is the reference standard the proxy is standing in for, and it is covered directly in Lesson 6.'),
    warning('l5w1', 'Why Labeling the Proxy Matters', 'A composite score that presents its weakest input with the same visual confidence as its strongest input misleads anyone reading only the final number. Labeling a proxy explicitly — and naming what real data would replace it — is not a weakness of the HEROI score; it is what keeps the other four, better-grounded dimensions from being wrongly discounted alongside the one that is not yet fully real.'),

    h2('l5s6h', 'Case Study: Equity as a Management Discipline, Not a One-Time Score'),
    example('l5ex2', 'Kaiser Permanente — Equity of Care Award, 2017',
        'Kaiser Permanente received the American Hospital Association\'s 2017 Equity of Care Award for embedding disparity reduction into its operating structure system-wide — physicians, nurses, and staff across its integrated system working from shared disparity data rather than each department tracking equity independently and inconsistently.\n'
        'The lesson for anyone building or using a composite like HEROI is the one Kaiser\'s recognition illustrates directly: a composite score is only as useful as the organizational structure built around acting on what it shows. A HEROI score computed once and filed away is a number. A HEROI score reviewed on the same cadence as a financial scorecard, by people with the authority to act on it, is a management tool — the same distinction this course returns to in its final lesson.'),

    takeaway('l5tw', [
        'Standard cost-effectiveness analysis treats a QALY gained by any group identically, regardless of that group\'s existing disadvantage — it is equity-blind by design, not by oversight.',
        'Distributional cost-effectiveness analysis (Cookson, Griffin, Norheim & Culyer, 2020) extends CEA with an equity weight derived from the Atkinson index of inequality aversion, denoted ε.',
        'At ε = 0, DCEA collapses to standard CEA; Cookson et al.\'s 2017 illustrative work used ε = 0.5 as a mild-aversion default — the chosen value is a stated judgment call, not a measured fact.',
        'This platform\'s HEROI composite weights Access, Quality, and Outcome Equity at 25% each, SDOH Burden at 15%, and Trust & Engagement at 10%, combining five dimension scores this course teaches how to build.',
        'The Health Equity Studio explicitly documents its Trust & Engagement dimension as a proxy pending real CAHPS data — an example of honest labeling rather than overstating precision.',
        'Kaiser Permanente\'s 2017 AHA Equity of Care Award illustrates that a composite equity score is only as useful as the management structure built to act on it.',
    ]),

    quiz('l5qz',
        'In distributional cost-effectiveness analysis, what happens to the equity weight when the inequality-aversion parameter ε is set to 0?',
        [
            ('DCEA collapses back to standard, equity-blind cost-effectiveness analysis', True),
            ('The analysis becomes undefined and cannot be computed', False),
            ('The worst-off group receives maximum priority', False),
            ('ε = 0 is not a valid value in DCEA', False),
        ],
        'At ε = 0 there is no special priority for the worst-off group, so DCEA mathematically reduces to standard CEA — larger ε values, not smaller, are what shift weight toward the worst-off.'),

    h2('src', 'Sources'),
    blk('src1', '[1] Cookson R, Griffin S, Norheim OF, Culyer AJ (eds). Distributional Cost-Effectiveness Analysis: Quantifying Health Equity Impacts and Trade-Offs. Oxford University Press, 2020 — https://global.oup.com/academic/product/distributional-cost-effectiveness-analysis-9780198838197'),
    blk('src2', '[2] Distributional Cost-Effectiveness Analysis Comes of Age — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7813213/ — equity weights, Atkinson index, ε=0.5 illustrative default from Cookson et al. 2017'),
    blk('src3', '[3] American Hospital Association, AHA Recognizes Kaiser Permanente with 2017 Equity of Care Award — https://www.aha.org/press-releases/2017-06-20-aha-recognizes-kaiser-permanente-2017-equity-care-award'),
    blk('src4', '[4] AHRQ, About the CAHPS Program — https://www.ahrq.gov/cahps/about-cahps/index.html — program began 1995'),
]

# ════════════════════════════════════════════════════════════════════════
# LESSON 6 — From Score to Action
# ════════════════════════════════════════════════════════════════════════
L6_SLUG = "hea-from-score-to-action"
L6_TITLE = "From Score to Action: Trust, Governance, and Closing the Loop"

l6 = [
    h2('l6s1h', 'What CAHPS Actually Measures'),
    blk('l6s1p1', 'The Consumer Assessment of Healthcare Providers and Systems (CAHPS) program is an AHRQ initiative dating to 1995. It is not a single survey but a family of standardized patient-experience surveys covering ambulatory clinician offices, hospitals, nursing homes, dialysis centers, surgical care, dental plans, home health, behavioral health plans and clinics, and care for American Indian populations — each asking patients to rate concrete aspects of their own experience, such as how well a provider communicated or how easy it was to get needed care.'),
    blk('l6s1p2', 'CAHPS is the reference standard Lesson 5\'s Trust & Engagement proxy is standing in for. Real CAHPS data, stratified by race, ethnicity, and language the way Lesson 3\'s HEDIS measures are stratified, would let a Trust dimension measure what patients actually report about being heard and treated with respect — rather than the indirect signal a system without direct CAHPS access has to substitute in its place.'),
    callout('l6s1c1', 'CAHPS is patient-reported, not administratively derived — it is the closest thing in U.S. healthcare measurement to asking patients directly whether they were treated well, which is exactly why it is difficult to substitute with any proxy.'),

    h2('l6s2h', 'The "Measurement Without Action" Failure Mode'),
    blk('l6s2p1', 'A body of published research on disparity dashboards has converged on a consistent finding: dashboards that stratify data by race, ethnicity, or other subgroup are increasingly common, but dashboards demonstrably tied to a specific accountability structure — someone whose job it is to act when a gap appears — are much rarer. A stratified rate that nobody owns is a fact sitting in a report. The same rate, reviewed by a named committee with the authority to change a staffing model, a referral pathway, or a screening protocol, is the beginning of an actual intervention.'),
    blk('l6s2p2', 'Moffitt Cancer Center\'s Disparities Dashboard is a documented example on the more structured end of this spectrum: it uses hospital clinical metrics stratified by race, ethnicity, gender, and language preference specifically to identify, monitor, and address disparities in patient care outcomes — built as an operational tool for ongoing monitoring, not a one-time report.'),

    h2('l6s3h', 'The Governance Loop'),
    steps('l6st1', 'Measure → Assess Cause → Act → Re-Measure', [
        ('Measure', 'Compute the stratified rate, the composite SDOH score, or the HEROI dimension, using the methods from Lessons 2 through 5.'),
        ('Assess cause', 'Before acting, ask why the gap exists. A staffing gap, a referral-pathway gap, a documentation gap (recall Lesson 4\'s SDOH Z-code problem), and a genuine access barrier each call for a different fix. This maps directly onto Priority 2 of the CMS Framework for Health Equity 2022–2032: assess causes of disparities within an organization\'s own programs and operations, not just document their existence.'),
        ('Act', 'Change something specific and attributable — a staffing decision, a referral relationship, a screening workflow, a resource allocation — tied to the cause identified in the previous step, not to the symptom alone.'),
        ('Re-measure', 'Run the same stratified measure again on the same cadence. If the gap did not move, the assessed cause was probably wrong, or the action taken did not address it — return to the assess-cause step rather than abandoning measurement.'),
    ]),
    highlight('l6hl1', 'An unmoved gap after an intervention is a diagnostic signal to revisit your cause hypothesis — it is not, by itself, evidence that the underlying metric is wrong or that the disparity is unfixable.'),
    analogy('l6an1',
        'A thermostat does not just display the room temperature and stop. It compares the reading to a target, triggers the furnace or air conditioner when they diverge, and checks the temperature again afterward to see whether the action worked. A dashboard that only displays a stratified rate, with no target, no trigger, and no recheck, is a thermometer nailed to the wall — accurate, and inert.',
        'Why the measure → assess cause → act → re-measure governance loop is the operational difference between a dashboard and a management tool'),

    h2('l6s4h', 'Case Study: From Screening Data to an Anchor-Mission Committee'),
    example('l6ex1', 'Rush University Medical Center — West Side Anchor Committee',
        'Rush University Medical Center\'s SDOH screening effort, built with community partners including Catholic Charities, the Greater Chicago Food Depository, and CommunityHealth (Chicago\'s largest free clinic), did not stop at collecting screening data. Rush formed a West Side Anchor Committee explicitly to convert what the screening and stratified quality data showed into standing operating processes — shared goals, common referral pathways, and joint investment decisions with those community partners.\n'
        'That committee is this lesson\'s governance loop made concrete: a named structure whose job is to act when the data shows something, not a report that circulates and is filed.'),

    h2('l6s5h', 'The "So What" Test for a New Equity Metric'),
    blk('l6s5p1', 'Before any new stratified rate, SDOH score, or composite index ships into a dashboard, it is worth applying a simple test: if this number moves in the wrong direction next quarter, what specifically happens? If the honest answer is "nothing, because no one is assigned to look at it," the metric is not yet operationally ready, regardless of how methodologically sound its construction is.'),
    compare('l6cmp1', 'The "So What" Test',
        'Metric ships without this', ['No one is accountable if it moves the wrong way', 'No defined trigger for action exists', 'The gap is reported with no hypothesis about its cause', 'It is measured once and never revisited'],
        'Metric passes the test', ['A named person or committee reviews it on a set cadence', 'A stated gap size or trend triggers a specific response', 'At least one testable hypothesis about cause is attached', 'It is scheduled to be re-measured after the action']),

    quote('l6q1', 'A composite score computed once and filed away is a number. The same score reviewed on the same cadence as a financial scorecard, by people with the authority to act on it, is a management tool.'),

    takeaway('l6tw', [
        'CAHPS (AHRQ, since 1995) is the real, patient-reported data source that Lesson 5\'s Trust & Engagement proxy is standing in for — it measures what patients actually report, not what a proxy infers.',
        'Published research on disparity dashboards finds that stratified dashboards are common, but dashboards tied to a real accountability structure that acts on the data are much rarer — measurement alone does not produce action.',
        'The governance loop — measure, assess cause, act, re-measure — turns a static number into an iterative accountability process; an unmoved gap sends you back to reassessing the cause, not to abandoning the metric.',
        'CMS\'s Framework for Health Equity 2022–2032 explicitly calls for assessing causes of disparities within an organization\'s own programs and operations, not only documenting that disparities exist.',
        'Rush University Medical Center\'s West Side Anchor Committee is a concrete, named structure that converted SDOH and quality data into standing operational decisions with community partners.',
        'The "so what" test — does a named owner, a trigger threshold, a cause hypothesis, and a re-measurement plan exist for this metric — is a practical gate before any new equity metric ships.',
        'Across all six lessons of this course, the same thread holds: a defensible number (Lessons 2–5) only becomes an equity outcome once it is owned, acted on, and re-measured (Lesson 6).',
    ]),

    quiz('l6qz',
        'A new disparity dashboard is proposed with a stratified readmission rate by race and ethnicity, but no committee or individual is assigned to review it regularly. According to this lesson, what is the main risk?',
        [
            ('The stratified rate will be measured without a mechanism to turn it into any action — the "measurement without action" failure mode', True),
            ('Stratifying readmission rates by race and ethnicity is not statistically valid', False),
            ('The dashboard will automatically violate NCQA reporting requirements', False),
            ('There is no risk, since the stratified data itself will drive change once it is visible', False),
        ],
        'The disparity-dashboard research literature specifically identifies dashboards lacking a defined accountability structure as prone to sitting unused — visibility alone does not reliably produce action without an owner and a governance loop.'),

    h2('src', 'Sources'),
    blk('src1', '[1] AHRQ, About the CAHPS Program — https://www.ahrq.gov/cahps/about-cahps/index.html — program began 1995, survey coverage'),
    blk('src2', '[2] Disparity dashboards: an evaluation of the literature and framework for health equity improvement — https://pmc.ncbi.nlm.nih.gov/articles/PMC10639125/ — the measurement-without-action finding; Moffitt Cancer Center Disparities Dashboard'),
    blk('src3', '[3] CMS Office of Minority Health, CMS Framework for Health Equity 2022–2032 — https://www.cms.gov/files/document/cms-framework-health-equity.pdf — Priority 2, assessing causes of disparities'),
    blk('src4', '[4] Rush University Medical Center, "Health Equity as a System Strategy," NEJM Catalyst 2021 — https://catalyst.nejm.org/doi/full/10.1056/CAT.20.0674 — West Side Anchor Committee'),
]

# ════════════════════════════════════════════════════════════════════════
# POST ALL LESSONS
# ════════════════════════════════════════════════════════════════════════
if __name__ == '__main__':
    post(L1_SLUG, L1_TITLE, l1, course_slug=COURSE_SLUG, order=1)
    post(L2_SLUG, L2_TITLE, l2, course_slug=COURSE_SLUG, order=2)
    post(L3_SLUG, L3_TITLE, l3, course_slug=COURSE_SLUG, order=3)
    post(L4_SLUG, L4_TITLE, l4, course_slug=COURSE_SLUG, order=4)
    post(L5_SLUG, L5_TITLE, l5, course_slug=COURSE_SLUG, order=5)
    post(L6_SLUG, L6_TITLE, l6, course_slug=COURSE_SLUG, order=6)
