"""
Track 7 — "The Equity Imperative" (2 lessons)
trackId: track_5p_equity | pillar: equity
Source: Chapter 10 of HTR_Book_v42.md, "The Equity Imperative — Closing Gaps, Not Just Averaging Them"

CRITICAL FRAMING carried through both lessons: the Equity Imperative is a cross-cutting
test applied to each of the five pillars (Policy, Technology, Economics, Clinical,
Operations) — NOT a sixth pillar competing with them. It has its own track because it
needs depth, not because it is a peer of the five.
"""

LESSONS = [
    {
        "id": "lesson_5p_calibrate_gap",
        "trackId": "track_5p_equity",
        "pillar": "equity",
        "order": 19,
        "slug": "calibrate-for-the-gap-not-the-average",
        "title": "Calibrate for the Gap, Not the Average",
        "summary": "An aggregate metric can improve while the gap between the best-served and worst-served population widens underneath it — because the average has no memory of who moved. This lesson applies that test to each of the five pillars in turn, using the Northeast Kingdom's equity constraint on Vermont's hospital regionalization as the book's own worked example.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["equity-imperative", "northeast-kingdom", "health-disparities", "five-pillar-framework", "social-risk"],
        "relatedLessonIds": ["lesson_5p_heroi_hedis_vbc"],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p19a", "text": "Explain why a rising system-wide average can coexist with a widening subgroup disparity, and identify disaggregation as the analytic move that exposes it."},
            {"id": "obj_5p19b", "text": "State precisely why the Equity Imperative is a cross-cutting test applied to each of the five pillars, not a sixth pillar competing with them for budget and attention."},
            {"id": "obj_5p19c", "text": "Apply the justice test to each of the five pillars using verified, named examples of the test failing and the test being designed in."},
            {"id": "obj_5p19d", "text": "Explain how the Northeast Kingdom's equity status functions as a binding sequencing constraint — not a soft consideration — on Vermont's hospital regionalization."},
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "The Optimization Trap: Averages Can Rise While Gaps Widen",
                "body": (
                    "A system that improves its average readmission rate, primary care access rate, or chronic disease control rate can be getting worse for its worst-served population at the same time. The average is a single number produced by summing outcomes across every subgroup and dividing by the total. It has no memory of who improved and who did not. A payment reform, a new technology deployment, or a clinical protocol can move the average up while the gap between the best-served and worst-served populations grows — and the published metric will still show success.\n\n"
                    "This is not a hypothetical failure mode. It is the default failure mode of quality improvement, because most interventions are easiest to implement, adopt, and sustain in populations that already have the fewest structural barriers — reliable transportation, stable housing, broadband, insurance literacy, trust in the health system. An intervention rolled out uniformly will, absent a specific design choice to prevent it, produce its fastest gains exactly where the fewest gains were needed.\n\n"
                    "The five-pillar framework's sixth question — is it just? — exists to catch this failure mode before it reaches publication. It asks, for every policy, technology, economic design, clinical model, and operational change: who moved, and who did not?"
                ),
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "91% vs. 80%", "label": "Vermont adults with a personal primary care provider, statewide vs. BIPOC adults — an 11-point gap concealed by the statewide figure", "source": "Vermont Department of Health, Health Equity Data Report, January 2025"},
                    {"value": "1.2–1.4M", "label": "US adults in the ACA Medicaid ‘coverage gap’ — too much income to qualify for Medicaid, too little for marketplace subsidies, in states that have not expanded Medicaid", "source": "KFF, 2026"},
                ],
            },
            {
                "type": "text",
                "heading": "Why This Is Not a Sixth Pillar",
                "body": (
                    "It would be easier to manage equity as a sixth pillar — a dedicated workstream with its own budget line, its own staff, its own initiatives, sitting alongside policy, technology, economics, clinical, and operations. It would also be a mistake, and it is the single most consequential design choice in how a health system organizes its equity work.\n\n"
                    "A sixth pillar competes with the other five for funding, attention, and organizational priority — and it reliably loses that competition when budgets tighten, because it is treated as an add-on to the “real” transformation work rather than as a property the real work must have. The Equity Imperative is not a competing workstream. It is a test applied to each of the five pillars on its own terms: does this policy design permit the outcome for every population it touches, not just the average one? Does this technology perform for the populations most likely to be poorly served by biased data? Does this economic design sustain the providers serving the highest-need populations, not just the lowest-cost ones? Does this clinical model work for patients without broadband, without transportation, without a native English speaker in the household? Can this operational change actually be executed in the community with the fewest resources to absorb its disruption?\n\n"
                    "Get this distinction wrong and the practical consequence is immediate: equity work becomes a report that documents disparities without institutional power to change the policy, technology, budget, clinical protocol, or operating plan that produced them. Get it right and equity becomes a design constraint on every decision the other five pillars make — which is the only way gaps actually close."
                ),
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "Say This, Not That",
                "body": "There are five pillars and one cross-cutting test, not six pillars. Equity is not ‘the equity pillar.’ It has its own two-lesson track here because it requires depth, not because it is a peer of policy, technology, economics, clinical, and operations — it is applied to each of them.",
            },
            {
                "type": "comparison_table",
                "heading": "The Justice Test, Applied to Each Pillar",
                "rows": [
                    {
                        "label": "Policy — is it permissible, and for whom?",
                        "left": "Risk: uniform eligibility rules that look neutral on their face can leave a defined population out entirely. An estimated 1.2–1.4 million adults fall into the ACA ‘coverage gap’ in the roughly nine states that have not expanded Medicaid — too much income to qualify for Medicaid, too little to qualify for marketplace subsidies (KFF, 2026).",
                        "right": "Opportunity: Vermont's Act 68 requires that hospital budget review (RBP) account for each hospital's community context, payer mix, and social risk factors rather than applying one uniform benchmark statewide.",
                    },
                    {
                        "label": "Technology — is it possible, and for whom does it work?",
                        "left": "Risk: a clinical calculator embedded in the EHR can encode bias directly into a treatment decision. Before 2021, the standard eGFR kidney-function equation applied a race coefficient that produced systematically higher — less severe — estimated kidney function for Black patients, delaying transplant referral and specialist care.",
                        "right": "Opportunity: the NKF-ASN Task Force's September 2021 recommendation adopted a race-free CKD-EPI creatinine equation, removing the coefficient from the calculation used nationwide.",
                    },
                    {
                        "label": "Economics — is it sustainable, and for whom?",
                        "left": "Risk: a payment or scoring model that does not adjust for who a provider serves can penalize the providers doing the hardest work. Before 2017, Medicare Advantage Star Ratings did not adjust for enrollee socioeconomic status, systematically lowering scores for plans serving more dual-eligible and disabled beneficiaries.",
                        "right": "Opportunity: CMS's Categorical Adjustment Index, in place since the 2017 Star Ratings, adds or subtracts up to 0.10–0.20 stars based on a contract's share of dual-eligible, low-income-subsidy, and disabled enrollees.",
                    },
                    {
                        "label": "Clinical — is it effective, and for whom?",
                        "left": "Risk: a clinical decision tool can steer care away from patients before a clinician ever weighs in. The original VBAC (vaginal birth after cesarean) success calculator, published in 2007, used a race and ethnicity correction that systematically predicted lower success for Black and Hispanic patients — making clinicians less likely to offer a trial of labor.",
                        "right": "Opportunity: the NICHD/MFMU Network's May 2021 calculator update removed race and ethnicity; predicted VBAC success no longer differs significantly by race.",
                    },
                    {
                        "label": "Operations — is it executable, and for whom?",
                        "left": "Risk: consolidating inpatient services at regional hubs on a financial-sustainability timeline, without sequencing replacement access first, can leave an entire region without timely emergency care.",
                        "right": "Opportunity: Vermont's Northeast Kingdom equity constraint requires EMS capacity, telehealth infrastructure, and community paramedicine investment to precede or accompany any reduction in inpatient services at North Country Hospital or Northeastern Vermont Regional Hospital.",
                    },
                ],
            },
            {
                "type": "text",
                "heading": "Policy Pillar, in Depth: The Coverage Gap No One Designed on Purpose",
                "body": (
                    "The ACA Medicaid coverage gap is not evenly distributed. Texas alone accounts for roughly 42% of the people caught in it, and about 97% of the national total lives in the South, concentrated in the same states that declined Medicaid expansion. No policymaker set out to build a gap between two eligibility thresholds; it is the byproduct of a permissible, individually defensible state-level choice, repeated across nine or ten states, that in aggregate leaves over a million working-age adults with no affordable coverage option at all.\n\n"
                    "This is the policy pillar's justice test in its cleanest form: a law can be permissible — states retain the constitutional right to decline Medicaid expansion — while still failing the equity test for the specific population it excludes. Permissibility and justice are different questions, and the five-pillar framework's first pillar answers only the first one.\n\n"
                    "Vermont expanded Medicaid and reports 97% overall coverage — a policy pillar pass at the state level. Yet Essex County, in the Northeast Kingdom, still runs an 8% uninsured rate, nearly three times the statewide average. Passing the aggregate test does not mean every county, or every population within a state, has passed it too."
                ),
            },
            {
                "type": "text",
                "heading": "Technology Pillar, in Depth: When the Algorithm Is the Barrier",
                "body": (
                    "The eGFR race coefficient originated from population-level research suggesting Black patients had, on average, higher serum creatinine levels, and the equation adjusted for that by mathematically inflating the estimated kidney function reported for any patient coded as Black — regardless of that individual patient's actual physiology. The clinical consequence ran in one direction: patients whose true kidney function was worse than their eGFR reading suggested were referred for transplant evaluation and specialist nephrology care later than they should have been.\n\n"
                    "The fix did not require inventing new technology. It required removing an assumption already embedded in a formula that labs and EHRs across the country had been running without examining it for two decades. That is the technology pillar's justice test in practice: not only “does the tool exist and function,” but “does the tool perform equally across every population it is applied to, or does it embed an assumption that only some patients pay for.”\n\n"
                    "Removing the coefficient was not costless. Clinical laboratories had to re-implement the CKD-EPI 2021 race-free equation and manage a transition in which some patients' reported kidney function changed overnight — a reminder that correcting a biased technology tool is itself an operations and clinical-pillar problem, and that the five pillars interlock even when only one of them originally failed the test."
                ),
            },
            {
                "type": "text",
                "heading": "Clinical Pillar, in Depth: The Calculator That Predicted Away Access",
                "body": (
                    "The 2007 VBAC success calculator, developed by the Maternal-Fetal Medicine Units Network, included a statistical correction for race and ethnicity built directly from its original research cohort. In practice, this meant a Black or Hispanic patient with an otherwise identical clinical profile to a white patient — same age, same prior deliveries, same indication for the earlier cesarean — received a lower predicted probability of a successful vaginal birth.\n\n"
                    "That predicted probability fed directly into a clinical conversation: a lower predicted success rate made clinicians less likely to offer a trial of labor at all, steering more Black and Hispanic patients toward repeat cesarean delivery — with its longer recovery, higher complication risk in future pregnancies, and higher cost — not because of their actual clinical presentation, but because of a coefficient attached to their race in a formula.\n\n"
                    "NICHD and the MFMU Network released a race-free calculator in May 2021, and predicted VBAC success no longer differs significantly by race once the correction is removed. But removing the calculator's bias does not automatically undo years of a referral pattern shaped by it — which is why the book's own root-cause taxonomy treats trust and engagement as a separate barrier from clinical practice variation. Fixing the tool is necessary. It is not sufficient on its own."
                ),
            },
            {
                "type": "text",
                "heading": "Economics Pillar, in Depth: Scoring the Provider, Not Just the Outcome",
                "body": (
                    "Before 2017, Medicare Advantage Star Ratings scored every contract against the same bar regardless of who it served. A plan with a large share of dual-eligible, low-income-subsidy, or disabled enrollees — populations with, on average, more complex medication regimens, more social barriers to appointment attendance, and more difficulty meeting preventive-care benchmarks — was scored as though its enrollees looked like any other plan's. The plans doing the hardest work showed up with the lowest scores.\n\n"
                    "CMS's Categorical Adjustment Index, introduced with the 2017 Star Ratings, does not change what is measured. It changes what counts as a good score for a given enrollee mix, adding or subtracting up to 0.10–0.20 stars based on a contract's share of dual-eligible, low-income-subsidy, and disabled enrollees. That is the economics pillar's justice test working as designed: sustainability cannot be judged the same way for a provider serving a harder population as for one that is not, and a payment or scoring model that ignores the difference will always undercount the providers who most need accurate recognition."
                ),
            },
            {
                "type": "callout",
                "variant": "tip",
                "heading": "The Pattern Across All Four",
                "body": "Coverage gap, eGFR, VBAC calculator, Star Ratings — in every case, the harm was not visible in the aggregate number. Coverage looked fine at 97% statewide. Kidney function estimation looked like ordinary lab math. The VBAC calculator looked like evidence-based obstetrics. Star Ratings looked like an objective quality score. The gap was only visible once someone disaggregated by the population that bore it.",
            },
            {
                "type": "text",
                "heading": "Operations Pillar and the Northeast Kingdom Constraint",
                "body": (
                    "The Northeast Kingdom — Caledonia, Essex, and Orleans counties — is Vermont's clearest and most severe equity priority: some of the lowest population densities in the eastern United States, unemployment above the state average, high disability rates, limited broadband, and the highest uninsurance rates in Vermont. North Country Hospital in Newport and Northeastern Vermont Regional Hospital in St. Johnsbury are among the state's most financially distressed facilities, and both are candidates for Tier 3 designation under the Oliver Wyman regionalization blueprint — meaning they may not be able to sustain full inpatient operations long term.\n\n"
                    "Vermont's Agency of Human Services must be explicit, in its Statewide Strategic Plan, that the Northeast Kingdom is an equity priority that constrains the pace and structure of regionalization. The financial logic of consolidating services at hospitals in Burlington, Rutland, or Bennington cannot override the equity obligation to maintain emergency access in the most rural, most isolated communities in the state. This is a constraint on the operations pillar, not a footnote to it.\n\n"
                    "The constraint has a specific sequencing rule: investments in EMS capacity, telehealth infrastructure, and community paramedicine must precede or accompany any reduction in inpatient services — not follow it. Rural Emergency Hospital designation is a viable path precisely because it maintains 24/7 emergency access while eliminating unsustainable inpatient infrastructure.\n\n"
                    "The operations-pillar justice test, applied here, is concrete rather than abstract: after a given transformation, can a 70-year-old resident of Canaan having a heart attack at 2 a.m. still receive timely emergency care? Can a person with serious mental illness in Newport reach a CCBHC without a two-hour drive? Can a child in Lyndonville see a primary care provider within 14 days? Those three questions, not a statewide access percentage, are the pass/fail bar."
                ),
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "8% vs. 3%", "label": "Uninsured rate, Essex County (Northeast Kingdom) vs. statewide Vermont — nearly 3x", "source": "AHS November 2025 Transformation Report; Vermont Rural Health Transformation Program Application"},
                    {"value": "3 counties", "label": "Caledonia, Essex, and Orleans — the Northeast Kingdom, Vermont's highest-priority equity geography", "source": "Vermont Department of Health"},
                ],
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "Sequencing Is the Safeguard, Not a Slogan",
                "body": "The equity constraint on Northeast Kingdom hospitals does not freeze them in place. It orders the steps. EMS, telehealth, and community paramedicine investment first, or at minimum concurrent — inpatient service reduction second, and only through a path like Rural Emergency Hospital designation that preserves 24/7 emergency access. Reverse that order and a financially rational consolidation becomes, in the book's own words, a catastrophic equity regression.",
            },
            {
                "type": "text",
                "heading": "Beyond Vermont: The Same Test, a Different Map",
                "body": (
                    "The Northeast Kingdom's pattern — a population separated from timely emergency, behavioral health, and primary care by distance and provider shortage — is not unique to Vermont. It recurs as the defining rural equity challenge in the Mountain West, the rural South, Appalachia, and the Great Plains, and in a different geometry in underserved tribal health systems and dense urban cores, where fragmentation and capacity constraints replace distance as the access barrier.\n\n"
                    "The diagnostic question travels intact across every one of those geographies: for a specific, named person in the underserved population, can they get the care they need within a clinically meaningful timeframe? Substitute the place name and the population, and the justice test still works — which is exactly why it belongs to all five pillars rather than to a separate equity workstream tied to one region's geography."
                ),
            },
            {
                "type": "text",
                "heading": "Applying the Test Yourself",
                "body": (
                    "Consider a hypothetical statewide diabetes-control initiative — used here only to illustrate the mechanism, not as a reported result — that raises the overall share of patients with controlled HbA1c from 68% to 75% over three years, a genuine seven-point aggregate gain. If that gain is concentrated entirely among commercially insured, urban patients, and the rate among rural Medicaid patients does not move, the reported aggregate success conceals a widened gap: two groups that started six points apart may now be fourteen points apart. Disaggregating the same data by insurance type and geography is the only way to see it.\n\n"
                    "The test is the same five questions, asked with one addition each time: not just “is this policy permissible,” but permissible for whom, and who is excluded? Not just “is this technology possible,” but does it perform equally for the population most likely to be poorly represented in its training or reference data? Not just “is this economically sustainable,” but sustainable for the providers serving the hardest populations, not only the least complex ones? Not just “is this clinically effective,” but effective for patients without the resources the study population had? Not just “is this executable,” but executable without leaving the highest-need population until last?"
                ),
            },
            {
                "type": "text",
                "heading": "Summary: One Test, Applied Five Times",
                "body": (
                    "The Equity Imperative does not add a sixth question to the five-pillar framework's checklist. It multiplies each of the five existing questions by “for whom” — and it requires the answer to be checked against the worst-served subgroup, not the statewide average.\n\n"
                    "Vermont's Northeast Kingdom, the eGFR calculator, the VBAC calculator, the Medicaid coverage gap, and the Star Ratings adjustment are five different pillars failing, or being fixed, in five different ways. The test that catches or corrects each one is the same test, asked five times."
                ),
            },
        ],
        "quiz": {
            "id": "quiz_5p_calibrate_gap",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p19a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "According to the Vermont Department of Health's January 2025 Health Equity Data Report, what is the approximate gap between Vermont's overall primary care access rate and the rate for BIPOC Vermont adults?",
                    "explanation": "Vermont's statewide personal-provider rate is roughly 91%, while the rate for BIPOC adults runs 79–81% — an 11-point gap concealed by the statewide average.",
                    "options": [
                        {"id": "o_5p19a1", "text": "About 11 percentage points (roughly 91% overall vs. 79–81% for BIPOC adults)", "isCorrect": True},
                        {"id": "o_5p19a2", "text": "About 2 percentage points — coverage and access track closely", "isCorrect": False, "explanation": "Vermont's near-universal coverage does not close its access gap; the two move separately, and the access gap is far larger than 2 points."},
                        {"id": "o_5p19a3", "text": "About 30 percentage points — Vermont's access gap is among the largest in the country", "isCorrect": False, "explanation": "Vermont's gap is real and consequential but smaller than this; overstating it is as misleading as ignoring it."},
                        {"id": "o_5p19a4", "text": "There is no measurable gap once insurance coverage is accounted for", "isCorrect": False, "explanation": "These gaps persist even where coverage is not the barrier — they reflect structural access barriers, not just insurance status."},
                    ],
                },
                {
                    "id": "q_5p19b",
                    "type": "true_false",
                    "points": 1,
                    "question": "In the five-pillar framework, the Equity Imperative is best understood as a sixth pillar, equal in status to Policy, Technology, Economics, Clinical, and Operations.",
                    "explanation": "The Equity Imperative is a cross-cutting test applied to each of the five pillars, not a sixth pillar competing with them for budget, staff, and attention.",
                    "options": [
                        {"id": "o_5p19b1", "text": "False", "isCorrect": True},
                        {"id": "o_5p19b2", "text": "True", "isCorrect": False, "explanation": "Treating equity as a sixth, competing pillar is the exact design mistake this lesson warns against — it turns equity into a workstream that loses budget and attention when things get tight, instead of a test every pillar must pass."},
                    ],
                },
                {
                    "id": "q_5p19c",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A statewide diabetes program raises the overall rate of controlled HbA1c from 68% to 75% over three years. Over the same period, the gap between commercially insured urban patients and rural Medicaid patients widens from 6 points to 14 points. Has the program passed the Equity Imperative's test?",
                    "explanation": "The aggregate gain conceals a widening disparity — the exact failure mode the Equity Imperative is designed to catch.",
                    "options": [
                        {"id": "o_5p19c1", "text": "No — the aggregate gain conceals a widening disparity, which is exactly the failure mode the Equity Imperative is designed to catch", "isCorrect": True},
                        {"id": "o_5p19c2", "text": "Yes — a 7-point aggregate improvement is a clear success by any reasonable quality standard", "isCorrect": False, "explanation": "This is the average-optimization trap described in the lesson: the aggregate number improved because gains concentrated in the already-better-served group, while the rural Medicaid population did not move at all."},
                        {"id": "o_5p19c3", "text": "It's impossible to say without knowing the total number of patients enrolled", "isCorrect": False, "explanation": "Sample size affects statistical confidence, not the substantive finding here: a widening 6-to-14-point gap is a disparity finding regardless of population size."},
                        {"id": "o_5p19c4", "text": "Yes, because the program was never designed to address disparities in the first place", "isCorrect": False, "explanation": "A program's original design intent doesn't exempt it from the equity test — every pillar's decisions are evaluated for who they help and who they leave behind, whether or not equity was an explicit design goal."},
                    ],
                },
                {
                    "id": "q_5p19d",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Before 2021, the standard eGFR (kidney function) equation used a race coefficient that produced systematically higher — less severe — estimated kidney function for Black patients. Which pillar's justice test does this example primarily illustrate failing?",
                    "explanation": "The eGFR equation is a technology embedded in clinical software and lab workflows; it failed the technology pillar's test that a tool must perform equally across the populations it is applied to.",
                    "options": [
                        {"id": "o_5p19d1", "text": "Technology — a tool embedded in clinical software performed unequally across a population it was applied to", "isCorrect": True},
                        {"id": "o_5p19d2", "text": "Economics — the equation was designed to reduce Medicare spending on dialysis", "isCorrect": False, "explanation": "The eGFR race coefficient originated from an assumption about population-level creatinine physiology, not a cost-control design choice."},
                        {"id": "o_5p19d3", "text": "Policy — the coefficient was mandated by federal statute", "isCorrect": False, "explanation": "No statute required the race coefficient; it was embedded in the clinical equation itself and removed by a professional task force recommendation, not a change in law."},
                        {"id": "o_5p19d4", "text": "Operations — the issue was that hospitals implemented the equation inconsistently", "isCorrect": False, "explanation": "The problem was in the equation's design, applied consistently everywhere it was used — consistency is what made the bias systematic rather than accidental."},
                    ],
                },
                {
                    "id": "q_5p19e",
                    "type": "single_choice",
                    "points": 1,
                    "question": "According to the Northeast Kingdom equity constraint described in this lesson, what must happen before or alongside any reduction in inpatient services at Northeast Kingdom hospitals?",
                    "explanation": "The constraint requires EMS, telehealth, and community paramedicine investment to precede or accompany any reduction in inpatient services — sequencing, not prohibition.",
                    "options": [
                        {"id": "o_5p19e1", "text": "Investment in EMS capacity, telehealth infrastructure, and community paramedicine", "isCorrect": True},
                        {"id": "o_5p19e2", "text": "A statewide referendum approving the specific hospital's transition plan", "isCorrect": False, "explanation": "The equity constraint is about sequencing physical and telehealth access investments, not about a referendum requirement."},
                        {"id": "o_5p19e3", "text": "A demonstrated increase in the Northeast Kingdom's population", "isCorrect": False, "explanation": "Population growth is not the equity condition; the constraint is about maintaining genuine access regardless of population trends."},
                        {"id": "o_5p19e4", "text": "Full inpatient closure followed by a retrospective access review", "isCorrect": False, "explanation": "This reverses the required sequence. Reversing this order turns a financially rational consolidation into what the book calls a catastrophic equity regression."},
                    ],
                },
            ],
        },
    },
    {
        "id": "lesson_5p_heroi_hedis_vbc",
        "trackId": "track_5p_equity",
        "pillar": "equity",
        "order": 20,
        "slug": "heroi-stratified-hedis-vbc-safeguards",
        "title": "HEROI, Stratified HEDIS, and VBC Equity Safeguards",
        "summary": "Stratified HEDIS shows where a disparity exists; HEROI scores whether an organization is closing disparities across five dimensions at once; social risk adjustment and peer grouping keep a value-based contract from penalizing providers who serve higher-social-risk populations. This lesson also explains what equity-weighting an incremental cost-effectiveness ratio actually does, and checks the current — shifting — federal policy ground under all of it.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["equity-imperative", "value-based-care", "stratified-hedis", "social-risk-adjustment", "heroi"],
        "relatedLessonIds": ["lesson_5p_calibrate_gap"],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p20a", "text": "Explain what stratified HEDIS reporting reveals that a standard, plan-wide HEDIS average cannot, and identify NCQA's current stratification requirements."},
            {"id": "obj_5p20b", "text": "Describe HEROI's five weighted components and explain why a composite equity score is necessary when disparities can move independently across dimensions."},
            {"id": "obj_5p20c", "text": "Explain what equity-weighting an incremental cost-effectiveness ratio (ICER) actually does, using distributional cost-effectiveness analysis, and distinguish it from HEROI."},
            {"id": "obj_5p20d", "text": "Identify social risk adjustment and peer/risk grouping as the two families of VBC equity safeguards, and evaluate their current federal trajectory using named 2025–2026 CMS policy actions."},
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "From Measuring Disparities to Closing Them",
                "body": (
                    "Lesson one showed why an improving average can conceal a widening gap. This lesson is the toolkit for catching that failure before it reaches a board report, a rate-setting decision, or a value-based contract: stratified measurement, a composite equity score, and the specific payment-design safeguards that keep value-based contracts from punishing the providers serving the hardest populations.\n\n"
                    "None of what follows is a sixth pillar either. Stratified HEDIS is a measurement technique applied inside the Clinical and Technology pillars. HEROI is a scoring framework that sits across all five. Social risk adjustment and peer grouping are Economics-pillar payment-design mechanisms. The instrumentation changes; the underlying test — who moved, and who did not — does not."
                ),
            },
            {
                "type": "text",
                "heading": "Stratified HEDIS: Splitting the Average Back Apart",
                "body": (
                    "HEDIS — the Healthcare Effectiveness Data and Information Set — is the most widely used quality measurement system in American healthcare, covering measures from cancer screening rates to diabetes control to postpartum follow-up. In its standard form, HEDIS reports one number per measure per plan or provider population: the share of patients who received the recommended screening, hit the target blood pressure, or returned for a follow-up visit. That number is an average, and it has the same blind spot as any average — it cannot show whether the gain is broadly shared or concentrated.\n\n"
                    "Stratified HEDIS reporting breaks that average back into its component subgroups — by race, ethnicity, income, geography, language, and disability status — and reports performance separately for each. The National Committee for Quality Assurance (NCQA), which develops and maintains HEDIS, has been steadily expanding stratification requirements: as of Measurement Year 2024, 22 HEDIS measures are stratified by race and ethnicity, and NCQA's 2026 Health Equity Accreditation standards require organizations to report stratified results across measures spanning cancer screening, immunizations, blood pressure control, diabetes assessment, postpartum care, and substance use disorder treatment initiation.\n\n"
                    "Vermont's Health Equity Studio implements this same stratification methodology against VHCURES claims data and the Blueprint for Health clinical registry — the state-level equivalent of what NCQA requires nationally. The result, in both cases, is the same kind of information lesson one's diabetes example needed: not “did the average improve,” but “did every subgroup improve, and by how much.”"
                ),
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "22", "label": "HEDIS measures NCQA stratifies by race and ethnicity, as of Measurement Year 2024", "source": "NCQA"},
                    {"value": "91% vs. 79–81%", "label": "Vermont primary care access rate, statewide vs. BIPOC adults — the gap stratification exists to surface", "source": "Vermont Department of Health, January 2025"},
                ],
            },
            {
                "type": "comparison_table",
                "heading": "Standard HEDIS vs. Stratified HEDIS",
                "rows": [
                    {"label": "What is reported", "left": "One rate per measure per plan or practice — a single average", "right": "Separate rates for the same measure, broken out by race, ethnicity, income, geography, language, or disability"},
                    {"label": "What it can hide", "left": "A subgroup with flat or worsening performance, as long as another subgroup's gains are large enough to move the average", "right": "Nothing at the subgroup level — but it depends entirely on complete demographic data being attached to the claim or chart"},
                    {"label": "Where the data comes from", "left": "Claims and clinical registries already collected for standard reporting", "right": "The same sources, plus race/ethnicity/language fields that are frequently incomplete, especially in commercial claims"},
                    {"label": "Example measure", "left": "Colorectal cancer screening rate: 72% of eligible patients screened", "right": "Colorectal cancer screening rate: 78% of white patients, 61% of Black patients, 58% of Hispanic patients screened"},
                    {"label": "Who is accountable for the gap", "left": "No one — the average looks acceptable", "right": "Whoever owns the population health strategy for the lagging subgroup, by name, with a target and a timeline"},
                ],
            },
            {
                "type": "text",
                "heading": "The Data Problem Underneath Stratification",
                "body": (
                    "Stratification is only as good as the demographic data attached to the underlying record, and that data is uneven. Medicaid claims tend to have the most complete race and ethnicity fields; commercial insurance claims typically lack them; Medicare added standardized race and ethnicity collection more recently than either. Vermont's own VHCURES all-payer claims database has documented gaps in race and ethnicity fields for exactly this reason.\n\n"
                    "Two approaches close the gap. Direct collection asks the patient at the point of care — the NCQA standard that Blueprint for Health practices and FQHCs already follow. Indirect imputation estimates race and ethnicity probabilistically from surname and census-block characteristics, using methods such as RAND's Bayesian Improved Surname Geocoding (BISG). Neither replaces the other: direct collection is more accurate where it exists, and imputation fills gaps where it does not, at the cost of estimation error concentrated in exactly the small, geographically dispersed populations — Vermont's Abenaki communities, for instance — that most need accurate measurement.\n\n"
                    "This is not a Vermont-specific problem. Every state and national payer stratifying HEDIS measures is working against the same incomplete-demographic-data constraint, which is why NCQA's stratification requirements have expanded gradually rather than all at once — the measurement infrastructure has to be built before the measure can be reported reliably."
                ),
            },
            {
                "type": "text",
                "heading": "HEROI: Turning Five Independent Disparities Into One Number",
                "body": (
                    "A single stratified measure — even 22 of them — creates a new problem: an organization can close the gap on one measure while it widens on another, and no individual metric will show overall equity performance improving or declining. The Health Equity Return on Investment (HEROI) framework is the Health Equity Studio's response — a composite score that combines five equity dimensions into one number, so that trade-offs across dimensions are visible rather than hidden inside a stack of separate reports.\n\n"
                    "The five components are weighted by health impact and evidence strength: access equity (25%) — the gap in primary care, specialty, and emergency care utilization between advantaged and disadvantaged subpopulations; quality equity (25%) — the gap in HEDIS performance across the same subpopulations for the highest-burden chronic disease measures; outcome equity (25%) — the gap in avoidable hospitalizations, ED visits, and readmissions; SDOH burden (15%) — the prevalence of unmet health-related social needs and the completeness of screening for them; and trust and engagement (10%) — patient experience, measured through CAHPS survey data stratified by race and income.\n\n"
                    "A score of 80 or above indicates equity achieved across all five dimensions simultaneously. A score of 60–80 flags material disparity in at least one dimension requiring targeted intervention. Below 60 indicates disparities pervasive enough to require a comprehensive redesign of the equity program, not an incremental fix. Vermont's own statewide HEROI score has not yet been formally computed — it depends on the analytics vendor procurement the state has underway — a reminder that a scoring framework is only as real as the data pipeline feeding it."
                ),
            },
            {
                "type": "callout",
                "variant": "info",
                "heading": "Why One Score Instead of Five Reports",
                "body": "Five separate stratified reports let an organization improve on the measures it finds easiest and quietly stall on the rest — and still claim equity progress by pointing to whichever report looks best. A weighted composite forces the trade-off into view: an organization cannot raise its HEROI score by improving access equity alone if quality and outcome equity are flat or falling, because those two dimensions are 65% of the score between them.",
            },
            {
                "type": "text",
                "heading": "What ‘Equity-Weighting an ICER’ Actually Means",
                "body": (
                    "A different, older, and more formal tool addresses a related but distinct question: not “how equitably is this organization performing,” but “should this specific intervention's cost-effectiveness be judged differently depending on who benefits from it.” An incremental cost-effectiveness ratio (ICER) is the standard health-economics measure of value — the additional cost of an intervention divided by the additional health benefit it produces, typically expressed as cost per quality-adjusted life year (QALY). A conventional ICER treats a QALY gained by a wealthy, urban patient and a QALY gained by a low-income, rural patient as worth exactly the same amount.\n\n"
                    "Distributional cost-effectiveness analysis (DCEA) — developed principally by Richard Cookson, Susan Griffin, Ole Norheim, and Anthony Culyer, and applied using tools like the “equity impact plane” — rejects that assumption. Equity-weighting an ICER means applying explicit weights to the health gains in the calculation based on the socioeconomic position of who receives them, so a health gain concentrated among a disadvantaged population counts for more in the ratio than the identical clinical gain concentrated among an advantaged one. The practical effect: an intervention that looks only marginally cost-effective under a conventional, unweighted ICER can look clearly cost-effective — or the reverse — once the distribution of who benefits is built into the number itself, rather than reported separately as a footnote.\n\n"
                    "HEROI and an equity-weighted ICER are not the same tool, and this lesson does not conflate them. HEROI scores an organization's ongoing performance across five dimensions of disparity. An equity-weighted ICER scores a single proposed intervention's value before it is adopted, using the same underlying principle — a unit of health benefit is not automatically worth the same regardless of who receives it — applied at the point of decision rather than the point of measurement."
                ),
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "Don't Conflate the Two Tools",
                "body": "HEROI is the Health Equity Studio's organizational scorecard, not an ICER of any kind — it has no cost term. An equity-weighted ICER, from the distributional cost-effectiveness analysis literature, is an intervention-appraisal tool with an explicit cost-per-benefit calculation. If you're asked to compute a HEROI 'ratio,' that's a category error — HEROI is a weighted composite score, not a ratio of cost to benefit.",
            },
            {
                "type": "text",
                "heading": "VBC Safeguard One: Social Risk Adjustment",
                "body": (
                    "Value-based contracts create a specific equity risk when they don't account for who a provider serves: a shared savings or global budget target set without adjusting for the social risk of the attributed population rewards providers with healthier, lower-cost, more socially stable patients and penalizes providers serving higher-need populations for the same quality of care. Social risk adjustment corrects the benchmark itself, before performance is measured against it.\n\n"
                    "CMS built exactly this mechanism into the ACO REACH model beginning performance year 2023, through a Health Equity Benchmark Adjustment that combined a beneficiary's Area Deprivation Index score with dual-Medicaid-eligibility status to adjust ACOs' financial benchmarks. The adjustment grew more aggressive in 2024 — moving from a downward adjustment on the bottom 50% of the deprivation distribution to the bottom 30%, and from -$6 to -$10 per member per month for providers serving the least-deprived populations, effectively increasing the relative benchmark advantage for ACOs serving higher-need beneficiaries.\n\n"
                    "That trajectory reversed in 2025. CMS's Innovation Center released a new strategic direction in May 2025 that dropped “health equity” from its stated priorities entirely, and CMS confirmed the Health Equity Benchmark Adjustment is being removed from ACO REACH quality scoring starting performance year 2026 — the model's final year. The mechanics of adjusting for social risk have not disappeared from federal payment policy, but the explicit equity framing that named and justified them at the federal level is being withdrawn at the same time state programs like Vermont's are being asked to build their own versions."
                ),
            },
            {
                "type": "text",
                "heading": "VBC Safeguard Two: Peer and Risk Grouping",
                "body": (
                    "Where social risk adjustment corrects a payment benchmark before the fact, peer and risk grouping corrects a quality score after the fact — by giving credit for serving a harder population rather than adjusting the target itself. Two current CMS mechanisms illustrate the approach. The Merit-based Incentive Payment System's Complex Patient Bonus awards clinicians up to 10 additional points when their Medicare patient population's average HCC risk score or dual-eligibility share is at or above the prior year's median — a direct recognition that a clinician serving more medically and socially complex patients should not be scored as if their patients were average.\n\n"
                    "The Skilled Nursing Facility Value-Based Purchasing program adopted a comparable mechanism for a later start date: beginning fiscal year 2027, high-performing SNFs whose resident population is at least 20% dually eligible receive bonus points under a Health Equity Adjustment, alongside an increase in the program's payback percentage from 60% to 66%. Both mechanisms reward performing well while serving a harder population, rather than exempting that population from measurement altogether — the distinction that keeps a safeguard from becoming a loophole.\n\n"
                    "Neither mechanism is exactly the peer-quintile stratification used elsewhere in Medicare payment reform, and that is deliberate: risk-score-based bonuses and population-share thresholds are two different technical routes to the same equity objective, and a state or a value-based contract does not need to pick only one. Vermont's AHEAD global budget methodology, which must resolve hospital-level social risk adjustment before benchmarks are finalized, can draw on either approach — or, as the book's own framing insists it should, both together."
                ),
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "-$6 → -$10 PMPM", "label": "ACO REACH's Health Equity Benchmark Adjustment for the least-deprived population share, 2023 to 2024 — before its removal from quality scoring in PY2026", "source": "CMS, ACO REACH PY2026 model update"},
                    {"value": "≥20%", "label": "Dual-eligible resident share required for a Skilled Nursing Facility to qualify for the FY2027 Health Equity Adjustment bonus", "source": "CMS, SNF VBP Program"},
                    {"value": "10 pts", "label": "Maximum MIPS Complex Patient Bonus for clinicians with high HCC risk or dual-eligible caseloads", "source": "CMS, MIPS Complex Patient Bonus Fact Sheet"},
                ],
            },
            {
                "type": "comparison_table",
                "heading": "Federal VBC Equity Safeguards — Mechanism and Current Status",
                "rows": [
                    {"label": "MIPS Complex Patient Bonus", "left": "Mechanism: up to 10 bonus points based on average HCC risk score and dual-eligible share, methodology updated for PY2022", "right": "Status: active"},
                    {"label": "ACO REACH Health Equity Benchmark Adjustment", "left": "Mechanism: Area Deprivation Index + dual-Medicaid status adjust ACO financial benchmarks, added PY2023", "right": "Status: being removed from quality scoring starting PY2026; the model itself ends December 31, 2026"},
                    {"label": "SNF VBP Health Equity Adjustment", "left": "Mechanism: bonus points for high-performing SNFs with ≥20% dual-eligible residents", "right": "Status: begins FY2027"},
                    {"label": "CMS-HCC risk adjustment model, Version 28", "left": "Mechanism: risk scores incorporate differential cost patterns for dual-eligible beneficiaries", "right": "Status: active, fully phased in for 2026 payment"},
                ],
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "The Ground Is Shifting Under Federal Equity Adjustment",
                "body": "CMMI's May 2025 strategic direction dropped 'health equity' as an explicit named priority, and the one CMS model built around a named health equity benchmark adjustment is losing that adjustment the year before the model itself ends. The underlying mechanics — adjusting for dual-eligibility, deprivation, and risk score — have not vanished from federal payment policy, but the framing that justified and protected them federally is being withdrawn at the same moment state programs are being asked to build their own. That raises the stakes on Vermont's AHEAD design question. It does not lower them.",
            },
            {
                "type": "text",
                "heading": "What This Means for Vermont's AHEAD Global Budgets",
                "body": (
                    "Vermont's AHEAD program must resolve hospital-level social risk adjustment as an explicit design question — ensuring that hospitals serving the Northeast Kingdom's high-SDOH population are not penalized relative to Burlington-area hospitals with a more favorable social risk profile, for delivering the same quality of care to a harder population. As of early 2026, this is an active, unresolved design question inside AHEAD, not a settled feature of the program.\n\n"
                    "The federal retreat from explicit health-equity framing does not resolve that question for Vermont; it makes AHS and GMCB's own resolution of it more consequential, because a state-designed safeguard can no longer assume it will be reinforced or modeled by a federal equivalent that is being wound down in the same period. HEROI, stratified HEDIS, and Vermont's own social risk adjustment methodology are, in that sense, doing work that a federal program was starting to do and is now stepping back from."
                ),
            },
            {
                "type": "comparison_table",
                "heading": "The VBC Equity Audit — Six Questions Before Signing",
                "rows": [
                    {"label": "Attribution equity", "left": "Does the attribution methodology exclude high-SDOH patients who lack a qualifying primary care visit?", "right": "A methodology that requires a visit to attribute a patient systematically drops the patients least able to get one"},
                    {"label": "Social risk adjustment", "left": "Is the benchmark adjusted for the social risk profile of the attributed population?", "right": "Without it, providers serving higher-need populations are held to the same target as providers serving lower-need ones"},
                    {"label": "Quality measure equity", "left": "Are quality measures stratified by race, ethnicity, and income, with equity improvement rewarded, not just average improvement?", "right": "An unstratified quality score can rise while the underlying disparity widens — exactly lesson one's failure mode"},
                    {"label": "SDOH investment incentives", "left": "Does the contract give financial credit for SDOH investments that reduce long-term utilization?", "right": "Without credit, SDOH investment is a cost center with no contractual upside, so it gets cut first under budget pressure"},
                    {"label": "Care management intensity", "left": "Are care management resources allocated by SDOH burden and disparity level, not just clinical risk score?", "right": "Clinical risk alone misses social complexity that drives cost and poor outcomes independent of diagnosis"},
                    {"label": "Beneficiary protections", "left": "Are there protections against providers avoiding high-complexity, high-SDOH patients?", "right": "A capitated or shared-savings contract without this protection creates a direct financial incentive to under-serve the hardest patients"},
                ],
            },
            {
                "type": "text",
                "heading": "Putting the Toolkit Together",
                "body": (
                    "Stratified HEDIS shows where a disparity exists. HEROI scores whether an organization is closing disparities across all five dimensions at once, not just the easiest one. An equity-weighted ICER decides, before an intervention is adopted, whether its value calculation should account for who benefits. Social risk adjustment and peer/risk grouping keep the payment contract itself from punishing the providers doing the hardest work.\n\n"
                    "None of these four tools is a sixth pillar, and none of them works alone. A hospital with a strong HEROI score but no social risk adjustment in its AHEAD budget is still exposed to a benchmark that doesn't reflect its population. A state with excellent stratified HEDIS data but no HEROI-style composite can watch one disparity close while another widens and call it progress. The toolkit only does what lesson one's justice test requires — closing the gap, not just moving the average — when all four pieces operate together, inside whichever of the five pillars a given decision touches."
                ),
            },
        ],
        "quiz": {
            "id": "quiz_5p_heroi_hedis_vbc",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p20a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "As of Measurement Year 2024, how many HEDIS measures does NCQA stratify by race and ethnicity?",
                    "explanation": "NCQA stratifies 22 HEDIS measures by race and ethnicity as of MY2024, with additional measures proposed for later years.",
                    "options": [
                        {"id": "o_5p20a1", "text": "22", "isCorrect": True},
                        {"id": "o_5p20a2", "text": "5", "isCorrect": False, "explanation": "5 is roughly the number of new measures NCQA proposed adding for MY2025, not the total already stratified."},
                        {"id": "o_5p20a3", "text": "100", "isCorrect": False, "explanation": "HEDIS as a whole includes fewer than 100 measures total; NCQA's stratification effort, while expanding, covers a meaningful subset, not the full set."},
                        {"id": "o_5p20a4", "text": "0 — HEDIS does not currently support stratification", "isCorrect": False, "explanation": "NCQA has been expanding stratified reporting for several years; the lesson names the current MY2024 count explicitly."},
                    ],
                },
                {
                    "id": "q_5p20b",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Which HEROI component carries the lowest weight in the composite score?",
                    "explanation": "Trust and engagement is weighted at 10%, the lowest of HEROI's five components; access, quality, and outcome equity are each weighted 25%, and SDOH burden 15%.",
                    "options": [
                        {"id": "o_5p20b1", "text": "Trust and engagement (10%)", "isCorrect": True},
                        {"id": "o_5p20b2", "text": "Access equity (25%)", "isCorrect": False, "explanation": "Access equity is one of the three components tied for the highest weight, at 25%."},
                        {"id": "o_5p20b3", "text": "SDOH burden (15%)", "isCorrect": False, "explanation": "SDOH burden is weighted higher than trust and engagement — 15% versus 10%."},
                        {"id": "o_5p20b4", "text": "Quality equity (25%)", "isCorrect": False, "explanation": "Quality equity is tied for the highest weight in the composite, at 25%."},
                    ],
                },
                {
                    "id": "q_5p20c",
                    "type": "true_false",
                    "points": 1,
                    "question": "Equity-weighting an ICER, as in distributional cost-effectiveness analysis, means a health gain delivered to a more disadvantaged population is given greater weight in the cost-effectiveness calculation than the identical clinical gain delivered to a more advantaged population.",
                    "explanation": "This is exactly what equity-weighting does — it rejects the conventional ICER's assumption that a QALY is worth the same regardless of who receives it, and applies explicit weights based on socioeconomic position instead.",
                    "options": [
                        {"id": "o_5p20c1", "text": "True", "isCorrect": True},
                        {"id": "o_5p20c2", "text": "False", "isCorrect": False, "explanation": "This is exactly what equity-weighting does — it rejects the conventional ICER's assumption that a QALY is worth the same regardless of who receives it, and applies explicit weights based on socioeconomic position instead."},
                    ],
                },
                {
                    "id": "q_5p20d",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A value-based contract sets a single shared-savings benchmark for all attributed ACOs statewide, with no adjustment for the social risk profile of each ACO's patient population. An ACO serving a high-poverty, high-SDOH-burden region consistently misses the benchmark despite strong care management. Which safeguard would most directly address this specific problem?",
                    "explanation": "The benchmark itself is mis-calibrated for this ACO's population; social risk adjustment corrects the benchmark before performance is measured against it.",
                    "options": [
                        {"id": "o_5p20d1", "text": "Social risk adjustment to the benchmark itself", "isCorrect": True},
                        {"id": "o_5p20d2", "text": "Stratified HEDIS reporting", "isCorrect": False, "explanation": "Stratified HEDIS would reveal a quality disparity by subgroup, but this scenario is about the financial benchmark being wrong for the whole population, not about a subgroup gap within one ACO's measures."},
                        {"id": "o_5p20d3", "text": "A higher HEROI trust and engagement score", "isCorrect": False, "explanation": "Trust and engagement measures patient experience; it does not correct a mis-calibrated financial benchmark."},
                        {"id": "o_5p20d4", "text": "Removing the ACO from the value-based contract", "isCorrect": False, "explanation": "Removing the ACO does not fix the underlying design flaw and would likely worsen access for the population it serves."},
                    ],
                },
                {
                    "id": "q_5p20e",
                    "type": "single_choice",
                    "points": 1,
                    "question": "What happened to ACO REACH's Health Equity Benchmark Adjustment under CMS's 2025–2026 policy direction?",
                    "explanation": "CMMI's May 2025 strategy dropped 'health equity' as a named priority, and CMS confirmed the Health Equity Benchmark Adjustment is being removed from ACO REACH quality scoring starting PY2026 — the model's final year.",
                    "options": [
                        {"id": "o_5p20e1", "text": "It is being removed from quality scoring starting performance year 2026, alongside CMMI dropping 'health equity' from its stated priorities in May 2025", "isCorrect": True},
                        {"id": "o_5p20e2", "text": "It was expanded and made mandatory for every Medicare ACO", "isCorrect": False, "explanation": "The opposite occurred — the adjustment is being removed from quality scoring, not expanded or extended beyond ACO REACH."},
                        {"id": "o_5p20e3", "text": "It was renamed HEROI and adopted nationally", "isCorrect": False, "explanation": "HEROI is the Health Equity Studio's own state-level composite score, unrelated to and not derived from the ACO REACH federal adjustment."},
                        {"id": "o_5p20e4", "text": "It was replaced by a stronger adjustment based on race and ethnicity directly", "isCorrect": False, "explanation": "The adjustment used Area Deprivation Index and dual-Medicaid status, not race or ethnicity directly, and it is being withdrawn, not strengthened."},
                    ],
                },
            ],
        },
    },
]
