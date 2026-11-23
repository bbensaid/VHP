exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_ctk_common.py').read())

# Track 3 — Quality Mechanics. Verified 2026-11-23: Blueprint for Health 2025 Annual Report, CY2023 statewide measures (read
# from the PDF; values quoted as printed, each with its margin of error in the report); CMS CY2026 Rate Announcement via search
# summaries (CMS-HCC V28 phase-in complete for non-PACE MA organizations in 2026; vendor blogs differ on other figures). Book-only
# and unverified here: Vermont's 76% (30-day) and 68% (alcohol) follow-up after emergency visits, the 'November 2025' Blueprint
# HEDIS data, 14.8% readmission rate, BRFSS 9% diabetes prevalence arithmetic. Worked numbers marked ILLUSTRATIVE are this course's.

# ════════════════════════════════════════════════════════════════════════════
L7_SLUG = 'ctk-hedis-improvement-method'
L7_TITLE = 'A Five-Step Method for Improving a HEDIS Measure'
L7 = [
    blk('intro1', "HEDIS is the common measurement language of Vermont's Blueprint, of commercial insurers and of the quality terms in value-based contracts. Chapter 9 says practices that want to improve their performance, and their results under quality-adjusted payment, need a systematic method and not a measurement committee. It offers five steps. This lesson walks through them with a worked example, shows what the Blueprint's own 2025 report reveals about where Vermont stands on several measures and explains why most improvement campaigns fade."),
    blk('intro2', "The method is generic and transfers to any measure in any state. The Vermont data are drawn from the Blueprint's annual report for calendar year 2023, read from the source, with the report's own cautions about interpretation. Figures the chapter gives from other data are labeled the book's."),
    blk('intro3', "A theme runs through the five steps: improvement is a change in standing workflow, not a campaign."),

    h2('s1h1', 'Step One: Know Your Baseline'),
    blk('s1p1', "The first step is to know where the practice stands against a benchmark. The chapter says the Blueprint's HEDIS report gives practices measure-level performance compared with NCQA's national 50th and 90th percentile benchmarks, and that the starting question is which measures are below the 50th percentile. A baseline needs a clear definition of the measure, the denominator, the time period and the data source, and should be kept in a form that can be compared with later periods."),
    blk('s1p2', "The Blueprint's 2025 report shows what a statewide baseline looks like. For calendar year 2023 it reports, for members attributed to Blueprint practices, diabetes with hemoglobin A1c not in control, meaning above 9 percent, at 21.8 percent where lower is better; hypertension with blood pressure in control, below 140 over 90, at 77.0 percent; child and adolescent well-care visits for ages 3 to 21 at 67.9 percent; and chlamydia screening in women ages 16 to 24 at 43.5 percent. For members attributed to other primary care practices the corresponding figures were 22.0, 72.3, 49.9 and 48.9 percent. The report prints margins of error for each, and says differences should be read with caution."),
    table('s1t1', 'Selected statewide measures, calendar year 2023 (Blueprint 2025 Annual Report)', [
        {'Measure': 'Diabetes: HbA1c not in control (>9.0); lower is better', 'Blueprint_practices': '21.8%', 'Other_primary_care': '22.0%'},
        {'Measure': 'Hypertension: blood pressure in control (<140/90)', 'Blueprint_practices': '77.0%', 'Other_primary_care': '72.3%'},
        {'Measure': 'Child and adolescent well-care visits, ages 3-21', 'Blueprint_practices': '67.9%', 'Other_primary_care': '49.9%'},
        {'Measure': 'Chlamydia screening, women 16-24', 'Blueprint_practices': '43.5%', 'Other_primary_care': '48.9%'},
        {'Measure': 'Heart failure admissions per 100,000', 'Blueprint_practices': '3.6', 'Other_primary_care': '3.2'},
    ]),

    h2('s2h1', 'Step Two: Count the Gap'),
    blk('s2p1', "The second step turns a percentage into a number of patients. The chapter's example is a practice with a hypertension control rate of 62 percent that needs to know how many patients with diagnosed hypertension have a reading above 140 over 90: the numerator gap, the number who must move into the controlled group to reach a target rate. The practice's own registry supplies the patient-level count, while claims-based profiles add summary context on use and cost."),
    blk('s2p2', "A worked illustration, with invented numbers: a practice has 600 patients with hypertension, 372 of them in control, which is 62 percent. To reach 75 percent it needs 450, so 78 more patients must come into control. That is a tractable list. Seventy-eight patients can be called, scheduled and followed, and the practice can see in a month how many have moved. A rate of 62 percent, by contrast, invites a meeting. Counting also reveals whether the gap is mostly uncontrolled readings or patients with no recent reading, which require different fixes."),
    callout('s2c1', "Convert every rate to a list of patients. A list can be worked; a percentage can only be discussed."),

    h2('s3h1', 'Steps Three and Four: Find the Cause, Match the Intervention'),
    blk('s3p1', "Root cause analysis asks why patients are out of control. The chapter says the answer is almost always multi-factorial: medication non-adherence, inadequate follow-up, social barriers, clinical inertia in prescribing and missed measurement opportunities. It sorts causes into four types: clinical, operational, data-related and driven by social needs, each needing a different response. A practice should sample the gap list, review a few dozen charts and talk to a few patients and the staff who see them, instead of assuming the cause."),
    blk('s3p2', "Intervention design then matches each cause. Clinical inertia, where treatment is not intensified despite readings above goal, calls for a prescribing protocol embedded in the record that prompts intensification. Missed measurement calls for a blood pressure protocol at every visit, including a repeat reading when the first is high. Social barriers call for referral to the community health team for medication assistance and food access. Data problems, such as readings recorded in free text, call for structured capture. A package that addresses the commonest causes in the practice's own sample is more likely to work than a generic campaign."),
    table('s3t1', 'Matching intervention to root cause (HTR Chapter 9, hypertension example)', [
        {'Root_cause_type': 'Clinical inertia', 'Example': 'Readings above goal with no medication change', 'Intervention': 'Record-embedded prompt to intensify treatment; prescribing protocol'},
        {'Root_cause_type': 'Operational', 'Example': 'No blood pressure taken or repeated at visits', 'Intervention': 'Measurement protocol at every encounter, including a repeat for high readings'},
        {'Root_cause_type': 'Social needs', 'Example': 'Cannot afford medication or lacks healthy food', 'Intervention': 'Community health team referral to medication assistance and food access'},
        {'Root_cause_type': 'Data', 'Example': 'Readings entered as free text', 'Intervention': 'Structured field capture so readings are counted'},
    ]),

    h2('s4h1', 'Step Five: Make It Standing Workflow'),
    blk('s4p1', "The chapter calls the commonest failure mode the improvement campaign that produces a short-term spike followed by regression to baseline. Sustainable improvement requires embedding the intervention in standing workflow instead of treating it as a project. The blood pressure protocol must become the default for every visit, not a special push for the measurement period. In practical terms, that means changing the visit template, the rooming workflow, the standing orders and the staff's job descriptions, so the new behavior does not depend on someone remembering."),
    blk('s4p2', "Sustaining also needs monitoring and ownership. Name a person who owns the measure, review it monthly on a run chart and set a trigger for review if it slips. When staff change, the new person should be trained into the workflow. The finance course's evidence ladder applies here: report the measure honestly, including when it does not improve, because a record of honest measurement builds credibility with payers and funders."),
    steps('s4st1', 'The five-step HEDIS improvement method (HTR Chapter 9)', [
        ('Performance baseline', 'Where are we against the 50th and 90th percentile benchmarks?'),
        ('Gap analysis', 'How many patients have open gaps; who are they?'),
        ('Root cause analysis', 'Why: clinical, operational, data or social needs?'),
        ('Intervention design', 'Match each cause to a specific, standing change.'),
        ('Sustainable systems change', 'Embed in workflow; assign an owner; monitor monthly.'),
    ]),
    warning('s4w1', "A better rate is not always a better outcome", "Measures can be improved by documentation and measurement changes without changing patients' health. That is useful when measurement was the problem, but be clear which you are doing and track outcomes as well as rates."),

    h2('s5h1', 'Running the Method as a Team'),
    blk('s5p1', "A method needs a rhythm and owners. A small improvement team, usually a clinician lead, a nurse or medical assistant who knows the workflow, someone who can pull the registry data and a practice manager, meets weekly for a short huddle. The team keeps a list of the patients in the gap, assigns outreach, reviews what happened to those contacted the previous week and records what it learned. It tests changes in small cycles of plan, do, study and act: try a new rooming step with one clinician for two weeks, look at the readings, then adopt, adapt or drop it."),
    blk('s5p2', "A run chart of the measure by month is the team's most important picture. It shows whether a change moved the rate, whether the improvement is holding and whether a seasonal pattern or a staffing change explains a dip. Resist reporting only the latest point. A single month's rate bounces, and a practice with a few hundred patients in a denominator will see swings that mean little. Look for sustained shifts over several months before declaring success or failure."),
    blk('s5p3', "Spread comes last. Once a change works in one clinician's workflow, the team writes it into the standard work for everyone, trains the staff and checks adherence after a month. Most of the failures the chapter describes happen at this step, when a good pilot is never made the default. The Blueprint's field staff exist to support this stage, and a practice that is not using them is leaving help unused."),
    blk('s5p4', "Keep the team small and its meetings short. Fifteen focused minutes a week produces more change than a monthly hour of review, because tasks are assigned and checked before they are forgotten."),
    steps('s5st1', 'A weekly improvement huddle', [
        ('Review the list', 'Who is still in the gap, who was contacted, who moved?'),
        ('Review the chart', 'Has the measure shifted over several months, or only bounced?'),
        ('Check the test', 'What small change are we trying, with whom, and what do we expect?'),
        ('Assign the week', 'Name the outreach and the owner for each patient or task.'),
        ('Record the learning', 'What worked, what did not, what to adopt or drop.'),
    ]),

    takeaway('tw', [
        "Chapter 9's five steps are baseline, gap analysis, root cause analysis, intervention design and sustainable systems change.",
        "The Blueprint's 2025 report shows calendar year 2023 measures, such as hypertension in control at 77.0 percent for Blueprint practices against 72.3 percent for others, each with margins of error.",
        "Convert a rate to a list of patients: in an illustrative practice, moving from 62 to 75 percent control among 600 patients means 78 more patients in control.",
        "Root causes are clinical, operational, data-related or driven by social needs, and each needs a different intervention.",
        "Most campaigns regress to baseline because they are projects; embed the change in standing workflow with an owner and monthly monitoring.",
        "Track outcomes as well as rates; measurement fixes can improve a score without improving health.",
        "Report results honestly, including when a measure does not improve.",
    ]),
    quiz('qz',
        "What does Chapter 9 identify as the most common HEDIS improvement failure mode?",
        [
            ("Setting targets that are too low", False),
            ("A campaign that produces a short-term spike in performance followed by regression to baseline because it was not embedded in standing workflow", True),
            ("Measuring too many patients", False),
            ("Using validated measures", False),
        ],
        "The chapter says sustainable improvement requires embedding the intervention in standing workflow, such as making a blood pressure protocol the default for every visit, instead of treating it as a project tied to the measurement period."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.4.1: the five-step HEDIS improvement framework"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — statewide measures for CY2023"),
    blk('src3', "[3] NCQA, HEDIS and Quality Compass benchmarks — https://www.ncqa.org/hedis/ — national percentile benchmarks used in the Blueprint's practice reports, as described in the chapter"),
    blk('src4', "[4] HTR Research Lab, Clinical Quality Optimizer — https://healthtransformationreview.org/research-lab/policy-quality?tab=quality"),
]

# ════════════════════════════════════════════════════════════════════════════
L8_SLUG = 'ctk-vermont-hedis-gaps'
L8_TITLE = "Reading Vermont's Quality Gaps: Diabetes, Follow-Up After Emergency Visits and Equity"
L8 = [
    blk('intro1', "Chapter 9 names three Vermont opportunity areas for quality improvement: diabetes management, follow-up after behavioral health emergency visits and cervical cancer screening. This lesson looks at each with care for what the sources do and do not show. The Blueprint's 2025 report provides primary data for calendar year 2023 on diabetes and several other measures. The chapter's own figures for follow-up after emergency visits come from a data source this lesson could not read, and the lesson says so."),
    blk('intro2', "It also shows how to extrapolate from a measured rate to a population count without overclaiming, as the chapter does for diabetes, and why the Blueprint report's own areas flagged for further work, chlamydia screening and admissions for heart failure and chronic lung disease, belong beside the chapter's list."),
    blk('intro3', "The point is method: read a gap as a number of people, a cause and an equity question at once."),

    h2('s1h1', 'Diabetes: From a Rate to a Count'),
    blk('s1p1', "Chapter 9 reports that 22 percent of Vermont's Blueprint patients with diabetes have a hemoglobin A1c that is not in control. It adds that 9 percent of Vermont adults, roughly 45,000 to 50,000 people, have been diagnosed with diabetes in the state's behavioral risk survey for 2023, and that applying the Blueprint-measured rate to the statewide population implies on the order of 10,000 to 11,000 people with inadequately controlled diabetes. The multiplication is correct: 22 percent of 45,000 is about 9,900 and of 50,000 is 11,000."),
    blk('s1p2', "The Blueprint's 2025 report supports the rate. For calendar year 2023 it shows 21.8 percent of diabetic patients with A1c above 9 percent among Blueprint-attributed members and 22.0 percent among others, a difference smaller than the margins of error. The extrapolation is the part to handle with care. The Blueprint population is not the whole state, the diagnosed count depends on a survey with its own margin, and a rate from a claims-and-record measure differs from one from a survey. The result, around 10,000 people, is a reasonable order of magnitude and should be presented as one."),
    callout('s1c1', "An extrapolation is a way to see scale, not a count. Say what population the rate came from and what it is being applied to."),

    h2('s2h1', 'Follow-Up After Emergency Visits for Mental Illness'),
    blk('s2p1', "The chapter highlights a measure called follow-up after emergency department visit for mental illness, abbreviated FUM, which tracks the share of such visits followed by a clinical visit within 7 days and within 30 days. It reports Vermont rates of 76 percent for 30-day follow-up after mental health emergency visits and 68 percent after alcohol-use visits, and calls every patient without timely follow-up one at elevated risk of a return emergency visit, hospitalization or worse. It also describes the 76 percent as a care coordination failure for which patient-centered medical home recognition requires systems. These figures are the book's; the sources read for this lesson did not include the underlying data."),
    blk('s2p2', "The measure is a good example of a quality gap that is mostly a process problem. The patient leaves the emergency department with an instruction to follow up, and nobody is responsible for making sure it happens. Closing the gap needs three things working together: the clinic or primary care practice has to know the patient was in the emergency department, someone has to contact the patient within days, and an appointment has to be available. The first depends on admission and discharge notification, the second on a named person and the third on access, which is why the care transition protocol in the next track addresses it."),

    h2('s3h1', 'Equity in the Numbers'),
    blk('s3p1', "Cervical cancer screening is the chapter's third area, and its note is about equity: the patients most likely to be under-screened are those with the most transportation barriers and the least consistent primary care engagement. The same logic applies across the Blueprint report's other measures. For calendar year 2023 child and adolescent well-care visits were at 67.9 percent for Blueprint-attributed members and 49.9 percent for others, a gap of 18 points that says something about practice patterns, though it cannot say whether the Blueprint caused it. Chlamydia screening in young women was 43.5 percent for Blueprint practices and 48.9 percent for others, and the report itself says work remains to improve screening rates."),
    blk('s3p2', "The report also notes that heart failure admissions per 100,000 were 3.6 for Blueprint-attributed members and 3.2 for others, and says reasons for increased admissions for heart failure and chronic lung disease should be investigated. These are not the chapter's three areas, and they show how a state's own program reporting can point to additional priorities. A practice should look at its own data stratified by race, ethnicity, language, rurality and disability, since averages hide gaps, and the Blueprint report's statewide figures do not give such a breakdown."),
    table('s3t1', 'Three of the chapter\'s priority areas with what the sources show', [
        {'Area': 'Diabetes HbA1c control', 'Chapter_9_claim': '22% of Blueprint diabetic patients not in control; roughly 10,000-11,000 statewide by extrapolation', 'Primary_source_check': 'Blueprint 2025 report, CY2023: 21.8% (Blueprint) and 22.0% (other); extrapolation uses survey prevalence'},
        {'Area': 'Follow-up after emergency visits for mental illness', 'Chapter_9_claim': '76% at 30 days; 68% after alcohol-use visits', 'Primary_source_check': 'Not verified; data source not read for this lesson'},
        {'Area': 'Cervical cancer screening', 'Chapter_9_claim': 'Under-screened patients have the most barriers; an equity issue', 'Primary_source_check': 'No statewide rate in the sources read'},
    ]),

    h2('s4h1', 'Choosing Where to Start'),
    blk('s4p1', "A practice cannot work every measure at once. The chapter suggests choosing priorities with the highest population health and financial return under value-based payment. A useful way to rank is to combine four factors for each measure: the size of the gap in patients, the strength of evidence that closing it improves outcomes, how many of the causes the practice can address with its own workflow and how much a payer contract or the Blueprint rewards improvement. Diabetes control scores high on size and evidence. Follow-up after emergency visits scores high on controllability, since it is mostly process, and on linkage to hospital reductions in repeat visits."),
    blk('s4p2', "Revisit the ranking each year. Payers change their measure sets, practices close gaps and new gaps open, and a priority that was right last year may no longer be the largest this year."),
    steps('s4st1', 'Ranking measures for a practice', [
        ('Size the gap in patients', 'Count the numerator gap for each measure from the registry.'),
        ('Check the evidence of benefit', 'Prefer measures whose improvement is linked to better outcomes or lower avoidable use.'),
        ('Judge controllability', 'Count the causes the practice can fix with its own workflow.'),
        ('Check the payment link', 'Note whether contracts or the Blueprint reward improvement.'),
        ('Pick two or three and commit', 'Run the five-step method on a small set; finish before adding more.'),
    ]),
    warning('s4w1', "Do not copy another state's gaps into your plan", "The Vermont measures here illustrate method. A practice elsewhere should start from its own baseline, its own payers' measure sets and its own patient mix."),

    h2('s5h1', 'Building a Local Quality Dashboard'),
    blk('s5p1', "The statewide numbers are context. A practice needs its own view, and a simple dashboard can be built from the registry. For each priority measure it should show the denominator, the numerator, the rate, the numerator gap, the trend over the last year and the patients in the gap. It should then split the same figures by the groups the practice serves: race and ethnicity where recorded, preferred language, age group, insurance type, and location or distance from the practice. A gap that is small overall and large in one group is the kind that average figures hide."),
    blk('s5p2', "Data quality limits the stratification. Race, ethnicity and language fields are often incomplete, and small groups produce unstable rates, so the dashboard should show counts alongside percentages and flag cells with too few patients to interpret. Where fields are missing, improving their capture is itself an equity task, and the structured data capture work of the next track supports it. The Blueprint report's own statewide figures carry margins of error, which is a model for how to show uncertainty."),
    blk('s5p3', "Use the dashboard in the weekly huddle and the quarterly review. It should answer three questions at a glance: where are we furthest from our target in patients, who is being left out and what is moving? A dashboard that nobody opens is a reporting project, and one used weekly becomes the practice's picture of itself."),

    takeaway('tw', [
        "Chapter 9's priority areas are diabetes control, follow-up after behavioral health emergency visits and cervical cancer screening.",
        "The Blueprint's 2025 report shows CY2023 diabetes A1c not in control at 21.8 percent for Blueprint-attributed members and 22.0 percent for others, within the report's margins of error.",
        "Extrapolating the rate to the roughly 45,000 to 50,000 adults diagnosed with diabetes gives about 10,000 to 11,000 people, an order of magnitude and not a count.",
        "The chapter's 76 percent and 68 percent follow-up rates after emergency visits are the book's figures; the data source was not read for this lesson.",
        "Follow-up after emergency visits is mostly a process gap: knowing the patient was there, a named person to call and an available appointment.",
        "The report flags chlamydia screening and admissions for heart failure and chronic lung disease for further work; well-care visits were 67.9 and 49.9 percent for Blueprint and other practices.",
        "Rank measures by gap size, evidence of benefit, controllability and payment link, and stratify results by equity dimensions.",
    ]),
    quiz('qz',
        "Why should the statewide estimate of 10,000 to 11,000 people with inadequately controlled diabetes be presented as an order of magnitude?",
        [
            ("Because the arithmetic is wrong", False),
            ("Because it applies a rate measured in the Blueprint population to a survey-based statewide count of people with diabetes, each with its own uncertainty", True),
            ("Because diabetes is not measured by HEDIS", False),
            ("Because the Blueprint report gives no diabetes data", False),
        ],
        "The estimate multiplies a Blueprint-population A1c rate by a statewide diagnosed-diabetes count from a survey. The populations differ and each figure has uncertainty, so the result shows scale and not an exact number."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.4.2: Vermont-specific HEDIS opportunity areas"),
    blk('src2', "[2] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — CY2023 statewide measures and the report's own flagged areas"),
    blk('src3', "[3] NCQA, HEDIS measure descriptions, including Follow-Up After Emergency Department Visit for Mental Illness — https://www.ncqa.org/hedis/measures/"),
    blk('src4', "[4] " + BOOK9 + " — §9.12: definitions of HEDIS FUM and structured data capture"),
]

# ════════════════════════════════════════════════════════════════════════════
L9_SLUG = 'ctk-hcc-documentation'
L9_TITLE = 'Risk-Adjustment Documentation as Clinical Practice'
L9 = [
    blk('intro1', "Hierarchical condition category coding is usually filed under revenue cycle. Chapter 9 argues that under value-based payment it is equally a clinical function, because the accuracy of a patient's documented conditions determines the risk adjustment factor that shapes payments under value-based contracts and could shape global budgets if the Green Mountain Care Board's methodology adjusts for patient complexity. This lesson explains that argument, the three documentation opportunities the chapter highlights, the 2026 change in the Medicare Advantage model and the compliance boundary a clinician must respect."),
    blk('intro2', "The finance course covered how risk adjustment enters benchmarks. This lesson is about what clinicians and practices do at the bedside and in the chart. It is not a coding manual: codes, weights and rules change, and a practice should work with certified coders and current guidance."),
    blk('intro3', "One principle governs the lesson: documentation must describe what is true and supported in the record, no more and no less."),

    h2('s1h1', 'Why Documentation Is a Clinical Task'),
    blk('s1p1', "A risk adjustment model predicts expected cost from diagnoses and demographics. The diagnoses come from claims and records, and so from what clinicians write. If a patient has chronic kidney disease and the chart says only that, the model sees less illness than there is. The patient's care needs are the same; the payment or benchmark that follows them is lower. Chapter 9's example is a clinician who documents a patient's diabetes as type 2 diabetes without the complications it has caused, such as diabetic kidney disease, which carries its own condition category, leaving risk value uncaptured and so producing a lower risk-adjusted payment than the patient's actual burden warrants."),
    blk('s1p2', "The chapter's framing for Vermont is that global-budget preparation requires a systematic gap analysis for every practice's Medicare-attributed population before Act 68's global budgets begin. It also notes the uncertainty: Act 68 does not specify a risk adjustment method for global budgets, and the Board's methodology is still being designed. If it adjusts for population risk, the benchmark will reflect documented risk, so a population with incomplete documentation would receive a benchmark below its true need while the hospital is held accountable for the costs."),
    callout('s1c1', "Documenting complexity accurately does not create illness. It stops the record from understating the illness that is there."),

    h2('s2h1', 'Three Common Opportunities'),
    blk('s2p1', "The chapter names three documentation opportunities in primary care. The first is chronic kidney disease staging. Kidney disease is often documented as present without a stage, and stage three and above have distinct condition categories with progressively higher risk values, so the stage matters. A clinician who reviews recent laboratory results and documents the stage, with the supporting values, closes the gap honestly. The second is diabetes complications, which the chapter says matter chiefly under the older model, while the newer model weights the diabetes categories equally, although complications such as kidney disease still carry their own categories. The chapter says complications should be documented at every appropriate encounter but often are not when a specialist manages them."),
    blk('s2p2', "The third is morbid obesity. A body mass index over 40 has its own category, and systematic documentation of body mass index at annual wellness visits requires both a clinical measurement and structured entry in the record. In each case the opportunity is the same: the clinical fact is present, and the documentation is missing, incomplete or not in a form that is captured. The fix is a workflow, with a prompt, a template or a standing review, and not a sudden change in clinical judgment."),
    table('s2t1', 'Three documentation opportunities (HTR Chapter 9, summarized)', [
        {'Opportunity': 'Chronic kidney disease staging', 'The_gap': 'Present but stage not specified; stages 3 and above have distinct condition categories', 'Workflow_fix': 'Review recent labs at visits; template with stage and supporting values'},
        {'Opportunity': 'Diabetes complications', 'The_gap': 'Complication managed by a specialist so not documented by primary care', 'Workflow_fix': 'Complication review in the chronic disease visit template; document at each appropriate encounter'},
        {'Opportunity': 'Morbid obesity (BMI over 40)', 'The_gap': 'BMI not captured in a structured field at annual visits', 'Workflow_fix': 'Measure and enter BMI in structured fields; clinical review when over threshold'},
    ]),

    h2('s3h1', 'The 2026 Model Change'),
    blk('s3p1', "The Medicare Advantage risk model changed in recent years. CMS's CY 2026 rate announcement, as summarized in search results, completed the three-year phase-in of the model known as V28 for non-PACE organizations: for 2026 CMS calculates 100 percent of risk scores with the 2024 CMS-HCC model, which is V28, and none with the older V24. The chapter reflects this, saying V28 is in full use from 2026 and that it weights all diabetes categories equally. A practice should therefore not use older guidance about which conditions carry the most value, and should check which model its payers and programs use, since other programs may use different versions."),
    blk('s3p2', "One consequence is that the value of documentation moves in different directions for different conditions. Some categories that carried high weights under the older model carry less now, and the practical advice for clinicians is unchanged: document what is true and supported. The financial argument for documentation depends on the model and the contract, which the finance course showed, and it is the reason documentation programs should be sized with current figures. The chapter's matrix gives $10,000 to $30,000 for training and one to two months to value, with a first-year gain in risk adjustment factor, and these are indicative."),

    h2('s4h1', 'Compliance: The Boundary'),
    blk('s4p1', "Documentation programs carry a risk. A diagnosis that appears in a claim but is not supported by the record can expose a clinician or organization to penalties, and regulators review risk-adjusted payments for unsupported diagnoses. Every code should be supported by the clinical record from a face-to-face or qualifying encounter, with evidence that the condition was monitored, evaluated, assessed or treated. A program aimed only at raising scores, with incentives tied to the number of diagnoses captured, invites the kind of problem that audit and enforcement exist to catch."),
    blk('s4p2', "Good programs build in safeguards. They train clinicians on what the record must show and not on a list of codes to find. They separate identification of possible gaps from the clinician's independent decision to document. They audit a sample of coded diagnoses for support. And they monitor their own patterns: a sudden jump in a category deserves a look before an outside party notices it. The MSSP risk score growth cap from the finance course, which limits an accountable care organization's average risk score growth, is a related guardrail, and regulators watch for coding growth that outpaces illness."),
    steps('s4st1', 'A documentation program with safeguards', [
        ('Identify possible gaps from claims and labs', 'Use data to prompt a review, not to dictate a code.'),
        ('Clinician evaluates at the visit', 'The clinician assesses the condition and documents what is true, with evidence.'),
        ('Structured entry', 'Record diagnoses and measures in fields that can be counted.'),
        ('Audit a sample', 'Coders check that each coded diagnosis is supported by the record.'),
        ('Monitor patterns', 'Look for unexplained jumps by clinician, condition or site and investigate.'),
    ]),
    warning('s4w1', "Never document to the code", "A diagnosis is a clinical judgment recorded with its evidence. Using a payment target to decide what to write is a compliance problem, whatever the model."),

    h2('s5h1', 'Working With Coders and Specialists'),
    blk('s5p1', "Documentation works best as a partnership. Certified coders know the current rules and can review charts to find where the record is ambiguous, but they cannot add a diagnosis. Clinicians know what is true and can resolve ambiguity, but they do not carry the coding rules in their heads. A regular case review between the two, a few charts a month, builds shared understanding and finds the templates that need repair. Coders should send queries that ask a question and not suggest an answer, and clinicians should respond in the record."),
    blk('s5p2', "The specialist gap deserves a specific workflow. When a nephrologist or endocrinologist manages a complication, the primary care chart may never record it. The practice can request specialist notes, reconcile them at the visit and document the condition and its status in its own assessment when the clinician has evaluated it. The interoperability work of the previous course helps: with a query or a feed from the specialist's system, the primary care team can see what the specialist found. The same discipline applies to behavioral health conditions, where a clinic's documentation and the practice's may differ."),

    takeaway('tw', [
        "Chapter 9 treats HCC coding as a clinical function because documented conditions determine the risk adjustment factor that shapes risk-adjusted payments and could shape global budgets.",
        "Act 68 does not specify a risk adjustment method for global budgets; if the Board adjusts for population risk, the benchmark will reflect documented risk.",
        "The chapter's three opportunities are chronic kidney disease staging, diabetes complications and morbid obesity documentation with structured body mass index entry.",
        "CMS's CY 2026 rate announcement completed the phase-in of the V28 model for non-PACE Medicare Advantage organizations, with 100 percent of risk scores from V28 in 2026.",
        "Fix gaps with workflow changes such as templates and prompts, not with changes in clinical judgment.",
        "Every code must be supported by the clinical record; programs aimed only at raising scores invite audit and enforcement problems.",
        "Build safeguards: train on what the record must show, let the clinician decide, audit a sample and monitor patterns.",
    ]),
    quiz('qz',
        "What governing principle does the lesson give for risk-adjustment documentation?",
        [
            ("Capture as many diagnoses as the model rewards", False),
            ("Documentation must describe what is true and supported in the clinical record, no more and no less", True),
            ("Documentation is only a billing function", False),
            ("Coders should decide diagnoses without clinician input", False),
        ],
        "Accurate documentation prevents the record from understating real illness, but every diagnosis must be supported by the record. Programs built only to raise scores risk compliance problems."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK9 + " — §9.5.2: HCC coding excellence; §9.9 Figure 9.5: documentation improvement matrix row; §9.12: HCC gap analysis"),
    blk('src2', "[2] CMS, 2026 Medicare Advantage and Part D Rate Announcement — https://www.cms.gov/newsroom/fact-sheets/2026-medicare-advantage-part-d-rate-announcement — completion of the V28 phase-in, as summarized by search"),
    blk('src3', "[3] Medicare Payment Advisory Commission, Payment Basics: Accountable Care Organization Payment Systems (revised October 2026) — https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_ACOs_FINAL_SEC.pdf — limit on risk score growth in the Shared Savings Program"),
    blk('src4', "[4] Vermont Act 68 of 2025 as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — global hospital budgets and the Board's methodology"),
]

LESSONS = [(L7_SLUG, L7_TITLE, L7, 7), (L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9)]
if __name__ == '__main__':
    run(LESSONS)
