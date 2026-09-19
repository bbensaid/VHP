"""Track 5 — Clinical: Redesign Care on Aligned Incentives.

Two lessons for the "Five Pillars, One Imperative" course.
Source chapters: HTR_Book_v42 Chapter 8 (Clinical Pillar) and Chapter 9
(Clinical Pillar in Practice).

Every statistic, program name, statute, code and study in this file was
verified against a primary or near-primary source before it was written.
Source attributions appear inline in key_stat blocks and in prose.
"""

LESSONS = [
    {
        "id": "lesson_5p_care_model_redesign",
        "trackId": "track_5p_clinical",
        "pillar": "clinical",
        "order": 15,
        "slug": "care-model-redesign-under-global-budgets",
        "title": "Care Model Redesign Under Global Budgets",
        "summary": "When revenue is capped, every avoidable admission becomes a cost with no offsetting payment, which changes what a care model is for. This lesson works through the four redesigns that actually move utilization — primary care transformation, behavioral health integration, care management, and hospital-at-home — using Vermont's Blueprint for Health and the national Collaborative Care evidence base.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": [
            "clinical-pillar",
            "global-budgets",
            "primary-care",
            "behavioral-health-integration",
            "hospital-at-home",
        ],
        "relatedLessonIds": [],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {
                "id": "obj_5p15a",
                "text": "Explain why a fixed global budget inverts the business case for prevention, and what that inversion requires of primary care staffing and panel design.",
            },
            {
                "id": "obj_5p15b",
                "text": "Describe the three roles of the Collaborative Care Model, the evidence base behind it, and the operational prerequisites — registry, time tracking, psychiatric consultation — that determine whether it works.",
            },
            {
                "id": "obj_5p15c",
                "text": "Trace how Vermont's Blueprint for Health translates PMPM payment and Community Health Teams into measured reductions in hospitalization and outpatient facility use.",
            },
            {
                "id": "obj_5p15d",
                "text": "Identify the dependencies a clinical redesign carries into the Policy, Technology, Economics and Operations pillars, and the equity test each of them must pass.",
            },
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "What a Capped Budget Actually Changes",
                "body": "Under fee-for-service, an avoidable admission is revenue. Under a global budget, the same admission is a cost against a fixed envelope with no offsetting payment. Nothing about the clinical work changes when a payment model changes — the patient still arrives, the bed is still staffed, the medication is still administered. What changes is which clinical activity the organization can afford to be good at.\n\nThis is the Clinical pillar's diagnostic question: is it effective? Not \"is it evidence-based\" — nearly everything in this lesson has been evidence-based for two decades — but does the redesign actually change utilization in this population, at this scale, with this workforce. An intervention with strong trial evidence and no implementation capacity produces nothing.\n\nFour redesigns carry most of the load when revenue is capped: primary care transformation that prevents hospitalizations, behavioral health integration that reduces crisis presentations, care management that closes gaps before they become acute, and hospital-at-home that moves acute care out of the building. Each has a real evidence base. Each also has a dependency on one of the other four pillars that will break it if that pillar is not in place first.",
            },
            {
                "type": "text",
                "heading": "The Blueprint for Health: What Vermont Built",
                "body": "The Vermont Blueprint for Health was established in 2006 and reached statewide implementation by 2013. It is an all-payer program — Medicare, Medicaid and commercial insurers all pay into it — which is the structural feature that distinguishes it from the pilot-scale medical home programs most states ran in the same period. A practice does not have to run two care models, one for the payer that funds transformation and one for everyone else.\n\nThe Blueprint has three components. Practices earn NCQA Patient-Centered Medical Home recognition and receive per-member-per-month payments from all payers, with a base payment plus a performance component. Community Health Teams — social workers, nurses, community health workers and behavioral health staff — are funded separately and attached to practices, so that a small rural practice gets care management capacity it could never hire on its own panel revenue. Health information technology, through VITL and the VHCURES all-payer claims database, supplies the population-level reporting that makes proactive outreach possible.\n\nThe CHT is the piece most often missed by states that copy the model. The PMPM payment buys the practice's attention; the CHT buys the labor. A practice paid to manage a population that has no one to do the managing simply absorbs the payment into operating margin and changes nothing.",
            },
            {
                "type": "key_stat",
                "stats": [
                    {
                        "value": "$5.8M",
                        "label": "Medical expenditure reduction per $1M invested in the Blueprint, driven by lower hospitalization and outpatient facility use",
                        "source": "Population Health Management (2016), \"Vermont's Community-Oriented All-Payer Medical Home Model Reduces Expenditures and Utilization While Delivering High-Quality Care\"",
                    },
                    {
                        "value": "32.3%",
                        "label": "Share of Vermont emergency department visits classified as potentially avoidable",
                        "source": "Vermont AHS Health Care System Transformation Report, November 2025",
                    },
                    {
                        "value": "91%",
                        "label": "Vermont adults reporting a personal health care provider, against an 87% national benchmark",
                        "source": "Vermont AHS Health Care System Transformation Report, November 2025",
                    },
                    {
                        "value": "3-5%",
                        "label": "Share of a primary care panel in the highest-complexity tier — accounting for 30-40% of total cost of care for that panel",
                        "source": "Vermont Blueprint for Health practice support resources",
                    },
                ],
            },
            {
                "type": "comparison_table",
                "heading": "The Same Clinical Activity, Two Payment Environments",
                "rows": [
                    {
                        "label": "A prevented admission",
                        "left": "Fee-for-service: lost revenue, absorbed by the hospital that prevented it",
                        "right": "Global budget: retained margin inside a fixed envelope",
                    },
                    {
                        "label": "A care coordinator's salary",
                        "left": "Fee-for-service: unreimbursed overhead unless a billable code fits",
                        "right": "Global budget: an investment repaid by the utilization it avoids",
                    },
                    {
                        "label": "Panel outreach to patients not seeking care",
                        "left": "Fee-for-service: generates work with no encounter to bill",
                        "right": "Global budget: the highest-yield activity on the panel",
                    },
                    {
                        "label": "Behavioral health screening in primary care",
                        "left": "Fee-for-service: creates referral demand the specialty system cannot absorb",
                        "right": "Global budget: identifies the crisis presentations that drive ED and inpatient cost",
                    },
                    {
                        "label": "A patient who never comes in",
                        "left": "Fee-for-service: invisible until they arrive in the ED",
                        "right": "Global budget: attributed, costed, and the practice's problem now",
                    },
                    {
                        "label": "Site of care",
                        "left": "Fee-for-service: higher-acuity settings pay more",
                        "right": "Global budget: lowest clinically appropriate setting wins",
                    },
                ],
            },
            {
                "type": "text",
                "heading": "Primary Care Is a Productivity Problem Before It Is a Headcount Problem",
                "body": "The Oliver Wyman analysis behind Vermont's Act 167 work reached a conclusion most states resist: Vermont does not have a primary care physician shortage in the conventional sense. HRSA recognizes no Health Professional Shortage Areas in Vermont. What Vermont has is primary care operating in a care model that cannot use the clinicians it already employs.\n\nThe mechanism is panel capacity. A physician working without delegation manages roughly 1,100-1,200 patients. The same physician in a team-based model — medical assistant, care coordinator, behavioral health care manager, CHT connection, each person working at the top of their license — can carry 1,500-2,000. That is a 30-50% capacity gain with no new physicians, and it is achievable in a timeframe that physician recruitment is not.\n\nThe redesign that produces it is unglamorous: standing orders so that a medical assistant closes a screening gap without a physician touch, a registry that generates the outreach list, protocols that let the care coordinator adjust follow-up intervals, and a schedule that reserves physician time for the decisions only a physician can make. None of it requires new clinical science. All of it requires a practice to rewrite how a day works.",
            },
            {
                "type": "callout",
                "variant": "tip",
                "heading": "The arithmetic that funds a care manager",
                "body": "Panel risk stratification exists to point scarce care management at the patients whose utilization is actually movable. In a 2,000-patient panel, the 3-5% in the highest-complexity tier account for 30-40% of total cost of care. Preventing roughly one hospitalization a month in that tier avoids on the order of $180,000 a year — enough to fund a half-time care coordinator and still return margin, under any shared-savings or global-budget arrangement. The claim is not that care management pays for itself everywhere; it is that it pays for itself where cost is concentrated, and stratification is how you find out whether it is.",
            },
            {
                "type": "text",
                "heading": "Behavioral Health Integration: The Collaborative Care Model",
                "body": "Vermont's behavioral health data describes a system failing at the point of highest acuity: 245.5 emergency department visits per 10,000 population for suicide ideation and self-harm, with 30-day follow-up after a mental health ED visit reaching only 76% and after a substance use ED visit only 68% (Vermont AHS Transformation Report, November 2025). Those follow-up numbers are not a quality footnote. A crisis presentation that does not connect to ongoing care is a scheduled return visit.\n\nThe Collaborative Care Model is the response with the strongest evidence base, and it is deliberately not a referral model. A behavioral health care manager sits inside the primary care practice, maintains a registry of every patient in treatment, delivers brief structured interventions, and tracks response with validated instruments — PHQ-9 for depression, GAD-7 for anxiety. A consulting psychiatrist reviews that registry on a schedule, usually weekly, and advises on the patients who are not improving. The primary care physician remains the treating and billing provider.\n\nThe structural insight is in the psychiatrist's role. In a referral model, one psychiatrist can see one patient at a time and the practice's access is capped by that clinician's schedule. In CoCM, one psychiatrist reviews a caseload through the care manager and can support ten to fifteen practices, reserving direct evaluation for the genuinely complex. For a rural state with a psychiatric shortage, that difference is the whole model.",
            },
            {
                "type": "text",
                "heading": "The Evidence: IMPACT and What Followed",
                "body": "The foundational trial is IMPACT — Unützer and colleagues, JAMA, December 2002. It randomized 1,801 primary care patients aged 60 and older with major depression, dysthymia or both across 18 primary care clinics in eight health care organizations in five states, comparing collaborative care management to usual care. Collaborative care more than doubled the effectiveness of depression treatment relative to usual care. It remains one of the largest depression treatment trials ever conducted, and it is emphatically not a Vermont result.\n\nThe cost finding came later and matters more to a CFO. Unützer and colleagues followed the same cohort for four years and reported in the American Journal of Managed Care in February 2008 that IMPACT participants had lower mean total health care costs — $29,422 versus $32,785 for usual care, a difference of $3,363 per patient over four years, with a bootstrap analysis putting the probability of lower costs at 87%. Total costs, not depression-specific costs: the savings showed up in medical utilization.\n\nCoCM is also the only integrated behavioral health model with its own Medicare billing codes, which is why it survives outside grant funding. CPT 99492 covers the first calendar month of care management (70 minutes), 99493 each subsequent month (60 minutes), 99494 each additional 30 minutes, and HCPCS G2214 a 30-minute month for practices with lighter caseloads. As of January 1, 2026, CMS discontinued G0512; federally qualified health centers and rural health clinics now bill the same CPT codes and G2214 as everyone else, which removes a long-standing distortion for safety-net practices.",
            },
            {
                "type": "key_stat",
                "stats": [
                    {
                        "value": "1,801",
                        "label": "Patients aged 60+ randomized across 18 primary care clinics in five states in the IMPACT collaborative care trial",
                        "source": "Unützer et al., JAMA, December 2002",
                    },
                    {
                        "value": "$3,363",
                        "label": "Lower mean total health care costs per IMPACT participant over four years ($29,422 vs. $32,785 under usual care)",
                        "source": "Unützer et al., American Journal of Managed Care, February 2008",
                    },
                    {
                        "value": "76% / 68%",
                        "label": "Vermont 30-day follow-up rates after a mental health ED visit and after a substance use ED visit",
                        "source": "Vermont AHS Health Care System Transformation Report, November 2025",
                    },
                    {
                        "value": "99492-99494",
                        "label": "Medicare CPT codes for psychiatric collaborative care management, plus HCPCS G2214; G0512 discontinued January 1, 2026",
                        "source": "CMS behavioral health integration billing guidance, 2026",
                    },
                ],
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "CoCM fails on operations, not on evidence",
                "body": "Three prerequisites decide whether a CoCM launch survives its first year, and none of them is clinical. The registry: CoCM is registry-based management, and most EHRs can produce one only after deliberate configuration — a practice that tries to run CoCM out of the visit note is running referral care with extra paperwork. Time tracking: the billing codes are time-based per calendar month, so the practice needs a way to capture care manager and physician minutes before the first claim, not after the first denial. The psychiatric consultant: weekly case review has to be contracted and scheduled, usually by telepsychiatry, because a consultant who reviews the registry when convenient is not providing the supervision the model's evidence rests on.",
            },
            {
                "type": "text",
                "heading": "Vermont's Integration Layers — and the Sustainability Trap",
                "body": "Vermont is building behavioral health capacity in three layers. Integration in primary care is the first: the Blueprint's Mental Health Integration pilot embedded mental health clinicians and community health workers in primary care beginning in 2023, and the 2025 qualitative evaluation found improved access and engagement, with nearly 80% of administrative entities reporting increased Community Health Team staffing. Community capacity is the second: Vermont became a CCBHC demonstration state in 2024, has two active demonstration sites, and plans five additional certified entities — in Springfield, Burlington, St. Albans, Newport and Barre — to cover every Hospital Service Area. Crisis response is the third: mobile crisis has been operational since January 2024, dispatched through the 988 Suicide and Crisis Lifeline.\n\nThe MHI evaluation also found the failure mode. The pilot worked and its funding was temporary. Clinical redesign funded by a grant produces a documented improvement and then a documented regression, because the staff funded by the grant leave when it ends and the workflow they anchored collapses behind them.\n\nThis is why the Clinical pillar cannot be sequenced ahead of Economics. A care model is only as durable as the recurring payment underneath it. Vermont's answer is to move MHI onto permanent primary care payment through AHEAD rather than renew it as a pilot — which is a financing decision made to protect a clinical result.",
            },
            {
                "type": "text",
                "heading": "Care Management and the Transition That Fails",
                "body": "Vermont's 30-day all-cause readmission rate sits at 14.8%, and its 76% behavioral health follow-up rate reflects the same underlying defect: the hospital-to-community handoff is not systematic. The Transitional Care Model is the evidence-based countermeasure — identify high-risk patients before discharge, assign a transitional care nurse, make direct contact with the patient or caregiver within 24 to 48 hours, reconcile medications, and book the primary care follow-up before the patient leaves the building.\n\nVermont's implementation runs through the Community Health Teams, with a protocol that is deliberately mundane: CHT contact within 24 hours of a discharge notification, a 7-day follow-up visit that reviews discharge instructions and medication reconciliation and screens for the social needs that drive readmission, and a 30-day care plan review that either closes the episode or moves the patient into standing panel management.\n\nThe protocol depends on a notification. If the practice does not learn that its attributed patient was admitted, none of it triggers. VITL's admission notification is therefore not an IT convenience — it is the event that starts the clinical workflow, which is exactly the kind of dependency the Technology pillar exists to satisfy before the Clinical pillar can deliver. Blueprint practices that run the protocol for every attributed discharge, rather than for the patients whose physician happens to call, report readmission rates below the Vermont average.",
            },
            {
                "type": "comparison_table",
                "heading": "Panel Stratification: Matching Staffing to Risk",
                "rows": [
                    {
                        "label": "Tier 1 — Complex (3-5% of panel)",
                        "left": "Multiple chronic conditions, high prior utilization, behavioral health and social needs, frailty",
                        "right": "Intensive care management: CHT assignment, written care plan, scheduled outreach, named care manager",
                    },
                    {
                        "label": "Tier 2 — Moderate risk (15-20%)",
                        "left": "One or two chronic conditions with management difficulty, recent ED visit or admission",
                        "right": "Proactive chronic disease management: care gap outreach, behavioral health integration, medication management",
                    },
                    {
                        "label": "Tier 3 — Standard (50-60%)",
                        "left": "Healthy or stable chronic conditions, routine preventive needs",
                        "right": "Preventive care: wellness visit, immunization, screening, health coaching",
                    },
                    {
                        "label": "Tier 4 — Inactive (20-30%)",
                        "left": "Attributed but not engaged; may be getting care elsewhere or not at all",
                        "right": "Outreach and re-engagement: targeted contact, open-access scheduling, community health worker follow-up",
                    },
                ],
            },
            {
                "type": "text",
                "heading": "Hospital at Home: Moving the Building",
                "body": "The most direct way to reduce the cost of an inpatient stay under a capped budget is to deliver it somewhere cheaper. Medicare's Acute Hospital Care at Home initiative lets an approved hospital treat inpatient-level patients in their homes, waiving Conditions of Participation that would otherwise require 24/7 on-site nursing, with a combination of in-person and remote visits. By the American Medical Association's count, 366 programs across 139 health systems in 37 states have been approved.\n\nThe evidence predates the waiver. Levine and colleagues published a randomized controlled trial in Annals of Internal Medicine in 2020 comparing home hospital care with usual inpatient care at Brigham and Women's: adjusted cost of the acute episode was roughly 38% lower, and 30-day readmission was 7% in the home arm against 23% among inpatients. CMS's own study, delivered to Congress on September 30, 2024, found that AHCAH beneficiaries generally had lower 30-day mortality than comparable brick-and-mortar inpatients, with low escalation rates back to the hospital.\n\nHospital-at-home is also the clearest example in this lesson of a clinical model living on a policy authority. The waiver was scheduled to lapse on January 30, 2026. Section 6210 of the Consolidated Appropriations Act, 2026 (P.L. 119-75) amended Section 1866G(a)(1) of the Social Security Act to strike that date and substitute September 30, 2030, and appropriated $2.5 million for CMS to study hospital-at-home quality and cost against traditional inpatient care. Absent further action, every hospital with an active waiver must discharge or return its home inpatients on September 30, 2030.",
            },
            {
                "type": "callout",
                "variant": "info",
                "heading": "A four-year authority and a ten-year capital plan",
                "body": "Hospital-at-home requires capital and hiring — monitoring equipment, a command center, paramedic or nurse field teams, supply logistics — on a payment authority that currently expires in 2030. That is not an argument against building it; it is an argument for knowing which pillar the risk sits in. The Clinical question (is it effective?) is answered: the trial evidence and CMS's own study both support it. The open question is the Policy one (is it permissible, and for how long?). A board approving the capital should be told which of those two questions the decision actually turns on.",
            },
            {
                "type": "text",
                "heading": "Where the Clinical Pillar Depends on the Other Four",
                "body": "Every redesign in this lesson carries dependencies out of the Clinical pillar, and the dependency, not the clinical design, is usually what fails. Policy decides whether the work is permissible and payable: CoCM exists at scale because CMS created billing codes for it; hospital-at-home exists because Congress keeps extending a waiver. Technology decides whether it is possible: registry-based management, admission notifications and care gap reports are the operating substrate of every model described here, and a practice documenting blood pressure in free text cannot run any of them.\n\nEconomics decides whether it is sustainable: under fee-for-service, prevention destroys revenue, and the Blueprint's return only reads as a return to an organization that keeps what it does not spend. Operations decides whether it is executable: behavioral health care managers, community health workers and transitional care nurses are roles with no established training pipeline, and Vermont's practical answer — converting existing CHT staff with targeted training rather than recruiting new ones — is an operations decision that determines whether the clinical model launches this year or in three.\n\nThe sequencing matters in one direction. A payment reform without a care model produces cost-shifting; a care model without payment reform produces a pilot that ends. But a care model deployed before the data infrastructure exists produces nothing at all, because the clinical team cannot see the population it is accountable for.",
            },
            {
                "type": "text",
                "heading": "The Equity Imperative in Care Redesign",
                "body": "Is it just? Applied to care redesign, the question is not whether the program was offered to everyone. It is whether the people whose utilization the model is counting on reducing can actually reach it.\n\nVermont's own numbers make the point. 91% of Vermonters report a personal health care provider, which is four points above the national benchmark and genuinely good. In the same reporting period, 59% of Vermont primary care practices were accepting new Medicaid patients. A transformation strategy that runs entirely through primary care will, without a deliberate correction, deliver its gains to the population already attached to a practice and miss the population whose avoidable ED use is highest. The state average improves and the gap widens.\n\nThe same test applies to each redesign. A CoCM program reachable only by patients with a working phone and a stable address excludes the patients with the highest crisis presentation rates. Hospital-at-home requires a home that is safe, heated and connected — an eligibility criterion that quietly sorts by income and by housing stability. Community Health Team capacity distributed by practice size rather than by panel risk sends the fewest care managers to the practices carrying the most complex patients. None of these is a reason not to build the model. Each is a design question that has to be answered inside the Clinical pillar's own work, not deferred to a separate equity initiative that reports later and controls nothing.",
            },
            {
                "type": "text",
                "heading": "The Failure Modes Worth Naming",
                "body": "Grant-funded redesign. The pilot performs, the funding ends, the staff leave, the workflow reverts. Vermont's MHI evaluation documented exactly this risk and it is the most common way clinical transformation is lost.\n\nTransformation without field support. States that distribute a PCMH toolkit and wait get PCMH-badged practices that behave as they always did. Vermont's Blueprint puts a quality improvement facilitator in each of its 14 Hospital Service Areas to do readiness assessment, data coaching and workflow redesign inside the practice. That field staff line is the first thing cut in a budget transition and the least recoverable.\n\nRedesign that skips the panel. A practice that has not stratified its panel deploys care management by referral — meaning by which physician remembers to refer — and systematically misses the high-risk patients who are not currently in front of anyone. Tier 4, the attributed-but-inactive 20-30%, is invisible by definition and contains a disproportionate share of the people the model was built for.\n\nMeasurement built after the fact. If the practice cannot demonstrate the utilization change, the payer will not fund the next year of it — which is the subject of the next lesson.",
            },
        ],
        "quiz": {
            "id": "quiz_5p_care_model_redesign",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p15a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "The 2016 Population Health Management evaluation of Vermont's Blueprint for Health reported what relationship between program spending and medical expenditures?",
                    "explanation": "The peer-reviewed six-year evaluation using Vermont's all-payer claims data found medical expenditures fell by approximately $5.8 million for every $1 million invested in the Blueprint — a 5.8:1 return driven primarily by lower hospitalization and outpatient facility use.",
                    "options": [
                        {
                            "id": "o_5p15a1",
                            "text": "Medical expenditures decreased by approximately $5.8 million for every $1 million invested",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p15a2",
                            "text": "Medical expenditures decreased by approximately $1.20 for every $1 invested",
                            "isCorrect": False,
                            "explanation": "This understates the published finding by a factor of nearly five. The reported ratio was 5.8:1, not roughly break-even.",
                        },
                        {
                            "id": "o_5p15a3",
                            "text": "Program spending was cost-neutral; savings appeared only in patient-reported outcomes",
                            "isCorrect": False,
                            "explanation": "The study's central finding was financial. Expenditure and utilization both fell for Blueprint-attributed patients relative to non-PCMH primary care.",
                        },
                        {
                            "id": "o_5p15a4",
                            "text": "Savings were found only in the commercial population and not in Medicaid",
                            "isCorrect": False,
                            "explanation": "The evaluation found advantages across payer types, including Medicaid — which is why the result carries weight for equity as well as cost.",
                        },
                    ],
                },
                {
                    "id": "q_5p15b",
                    "type": "single_choice",
                    "points": 1,
                    "question": "What structural feature of the Collaborative Care Model makes it deployable in a state with a severe psychiatric workforce shortage?",
                    "explanation": "In CoCM the psychiatrist consults on a registry reviewed with the behavioral health care manager rather than seeing each patient directly. One consultant can therefore support ten to fifteen practices, reserving direct evaluation for the highest-acuity cases. Referral models cap access at the psychiatrist's own appointment schedule.",
                    "options": [
                        {
                            "id": "o_5p15b1",
                            "text": "The psychiatrist reviews a care manager's registry rather than seeing most patients directly, so one consultant can cover many practices",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p15b2",
                            "text": "It substitutes primary care physicians for psychiatrists entirely, eliminating the need for psychiatric input",
                            "isCorrect": False,
                            "explanation": "Psychiatric consultation is a defined component of the model, not an optional one. Removing it removes the supervision the trial evidence rests on.",
                        },
                        {
                            "id": "o_5p15b3",
                            "text": "It shortens the referral wait by giving primary care priority scheduling in the specialty system",
                            "isCorrect": False,
                            "explanation": "CoCM is explicitly not a referral model. Priority scheduling reallocates a fixed specialty supply; CoCM changes how that supply is used.",
                        },
                        {
                            "id": "o_5p15b4",
                            "text": "It relies on group therapy delivered by community health workers instead of individual treatment",
                            "isCorrect": False,
                            "explanation": "The care manager delivers brief individual interventions and tracks response with validated instruments such as the PHQ-9. Group therapy is not the mechanism.",
                        },
                    ],
                },
                {
                    "id": "q_5p15c",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A health system builds a hospital-at-home program: monitoring equipment, a command center, field nursing teams, a ten-year capital plan. The clinical outcomes match the published evidence. Two years later the program is at risk of shutting down. Which pillar most likely failed?",
                    "explanation": "Policy — is it permissible? Medicare's Acute Hospital Care at Home initiative exists under a waiver with a statutory end date, extended to September 30, 2030 by Section 6210 of the Consolidated Appropriations Act, 2026. The clinical model can perform exactly as designed and still stop if the authority underneath it lapses.",
                    "options": [
                        {
                            "id": "o_5p15c1",
                            "text": "Policy — the waiver authority that makes the model billable has a statutory expiration date",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p15c2",
                            "text": "Clinical — hospital-at-home lacks an evidence base for acute patients",
                            "isCorrect": False,
                            "explanation": "The evidence is strong: Levine et al. (Annals of Internal Medicine, 2020) found roughly 38% lower episode cost and 7% versus 23% 30-day readmission, and CMS's 2024 report to Congress found lower 30-day mortality than inpatient care.",
                        },
                        {
                            "id": "o_5p15c3",
                            "text": "Technology — remote monitoring equipment is not yet capable of supporting inpatient-level care",
                            "isCorrect": False,
                            "explanation": "The scenario states the clinical outcomes matched published evidence, so the monitoring worked. The threat is to the payment authority, not the equipment.",
                        },
                        {
                            "id": "o_5p15c4",
                            "text": "Economics — hospital-at-home costs more per episode than inpatient care",
                            "isCorrect": False,
                            "explanation": "The randomized evidence points the other way, with adjusted episode costs roughly 38% lower than usual inpatient care.",
                        },
                    ],
                },
                {
                    "id": "q_5p15d",
                    "type": "true_false",
                    "points": 1,
                    "question": "True or false: because 91% of Vermonters report having a personal health care provider, a transformation strategy delivered through primary care will reach the population with the highest avoidable emergency department use.",
                    "explanation": "False. In the same reporting period only 59% of Vermont primary care practices were accepting new Medicaid patients. A strategy delivered entirely through existing primary care attachments reaches the already-attached population first, so the state average can improve while the gap for the unattached widens. That is the Equity Imperative test applied inside the Clinical pillar.",
                    "options": [
                        {
                            "id": "o_5p15d1",
                            "text": "False",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p15d2",
                            "text": "True",
                            "isCorrect": False,
                            "explanation": "A high average attachment rate says nothing about who is unattached. The 59% Medicaid acceptance rate identifies exactly the access barrier the average conceals.",
                        },
                    ],
                },
                {
                    "id": "q_5p15e",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Vermont's 2025 evaluation of the Blueprint's Mental Health Integration pilot found improved access and engagement alongside a specific structural risk. What was it?",
                    "explanation": "The evaluation found the pilot worked but that its funding was temporary. Clinical redesign paid for by time-limited money produces an improvement that regresses when the staff funded by it leave — which is why Vermont's response is to move MHI onto recurring primary care payment rather than renew it as a pilot.",
                    "options": [
                        {
                            "id": "o_5p15e1",
                            "text": "Sustainability — the gains depended on temporary funding that would end",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p15e2",
                            "text": "Clinical safety — embedded mental health clinicians increased adverse events",
                            "isCorrect": False,
                            "explanation": "No safety finding was reported. The evaluation's concerns were about the durability of the funding, not the care.",
                        },
                        {
                            "id": "o_5p15e3",
                            "text": "Recruitment — no Vermont organization was willing to host embedded behavioral health staff",
                            "isCorrect": False,
                            "explanation": "Uptake was the opposite: nearly 80% of administrative entities reported increased Community Health Team staffing during the pilot.",
                        },
                        {
                            "id": "o_5p15e4",
                            "text": "Measurement — the pilot produced no usable data on access or engagement",
                            "isCorrect": False,
                            "explanation": "The evaluation reported improved access and engagement. The problem was what happens to those gains when the money stops.",
                        },
                    ],
                },
            ],
        },
    },
    {
        "id": "lesson_5p_quality_mechanics",
        "trackId": "track_5p_clinical",
        "pillar": "clinical",
        "order": 16,
        "slug": "quality-mechanics-hedis-hcc",
        "title": "Quality Mechanics — HEDIS, HCC, and Measuring What Matters",
        "summary": "HEDIS measures, HCC risk adjustment and star ratings are the machinery that decides whether clinical redesign is visible and payable. This lesson works through how each is constructed, how documentation-driven measurement diverges from care-driven measurement, and why an unstratified quality measure can improve on average while a subgroup gets worse.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": [
            "clinical-pillar",
            "hedis",
            "risk-adjustment",
            "quality-measurement",
            "equity-imperative",
        ],
        "relatedLessonIds": [],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {
                "id": "obj_5p16a",
                "text": "Explain how a HEDIS measure is constructed — initial population, exclusions, numerator, reporting method — and why the denominator definition determines what the measure rewards.",
            },
            {
                "id": "obj_5p16b",
                "text": "Describe what changed in the CMS-HCC V28 risk adjustment model, including constrained coefficients, and identify coding advice that V28 made obsolete.",
            },
            {
                "id": "obj_5p16c",
                "text": "Distinguish a measure that drives care from a measure that drives documentation, using evidence from OIG and MedPAC on risk-adjustment practice.",
            },
            {
                "id": "obj_5p16d",
                "text": "Apply the Equity Imperative to measurement: explain the mechanism by which an unstratified measure improves on average while a subgroup deteriorates, and what stratified reporting does about it.",
            },
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "Measurement Is Part of the Clinical Pillar, Not a Reporting Function",
                "body": "The previous lesson described care model redesign. This one describes the machinery that decides whether that redesign is visible to anyone who pays for it. Under fee-for-service, quality measurement is a compliance exercise: report the numbers, keep the accreditation. Under value-based payment and global budgets, measurement is how clinical work converts into revenue, and a redesign that cannot be demonstrated in the measure set is, financially, a redesign that did not happen.\n\nThree systems do most of that work. HEDIS defines what counts as good clinical care for a population. HCC risk adjustment defines how sick that population is, which sets the budget the care is judged against. Star ratings translate both into money for Medicare Advantage plans and, increasingly, into the contract terms a provider organization is offered.\n\nEach system can be improved by better care. Each can also be improved by better documentation of unchanged care. Telling those two apart is the central skill in this lesson, and it is a clinical skill, not an administrative one — because the difference between them is whether a patient's blood pressure actually came down.",
            },
            {
                "type": "text",
                "heading": "How a HEDIS Measure Is Actually Built",
                "body": "HEDIS is maintained by the National Committee for Quality Assurance and is the measurement language of commercial plans, Medicaid managed care, Medicare Advantage star ratings and, in Vermont, the Blueprint's practice-level quality reporting. A measure has four moving parts: the initial population (who is eligible), the denominator exclusions (who is removed), the numerator (what counts as the care being delivered), and the reporting method (where the data comes from).\n\nThe reporting method is where the measure's character is set. Administrative reporting uses claims alone. Hybrid reporting supplements claims with medical record abstraction on a sample — the annual chart chase. ECDS reporting, for Electronic Clinical Data Systems, pulls from structured clinical data rather than claims or chart review. NCQA is moving the whole measure set in that direction: the hybrid method is scheduled to be phased out by measurement year 2029, with HEDIS reporting fully digital by MY 2030, and NCQA has already delayed the new ECDS versions of Transitions of Care and Care for Older Adults to MY 2028 to allow more testing.\n\nThe measure set is not static, and treating last year's specification as current is a reliable way to misread performance. For MY 2026 NCQA added seven measures — four risk-adjusted measures of acute hospitalization following outpatient surgery (orthopedic, general, colonoscopy, urologic), a Disability Description of Membership measure, and two ECDS measures covering follow-up after acute and urgent care visits for asthma and tobacco use screening and cessation. It retired two: Asthma Medication Ratio and Medical Assistance With Smoking and Tobacco Use Cessation. The MY 2026 specifications were also restructured to align with FHIR, including a terminology change from \"eligible population\" to \"initial population\" and from \"required exclusions\" to \"denominator exclusions.\"",
            },
            {
                "type": "key_stat",
                "stats": [
                    {
                        "value": "7 added / 2 retired",
                        "label": "HEDIS MY 2026 measure changes, with specifications restructured to align with FHIR",
                        "source": "NCQA, HEDIS MY 2026 measure updates",
                    },
                    {
                        "value": "MY 2029",
                        "label": "Scheduled retirement of the HEDIS hybrid (chart abstraction) method, with fully digital reporting by MY 2030",
                        "source": "NCQA proposed timeline for retiring and replacing HEDIS hybrid measures",
                    },
                    {
                        "value": "24",
                        "label": "HEDIS measures that can be stratified by race and ethnicity as of measurement year 2027, up from five when stratification began in MY 2022",
                        "source": "NCQA, Data, Measurement and Equity",
                    },
                    {
                        "value": "115",
                        "label": "Payment HCC categories in the CMS-HCC V28 model, up from 86 in V24, with mapped ICD-10 codes cut from 9,797 to 7,770",
                        "source": "CMS 2024 Rate Announcement; CMS-HCC V28 model documentation",
                    },
                ],
            },
            {
                "type": "text",
                "heading": "The Denominator Is the Whole Argument",
                "body": "Most disputes about a quality score are really disputes about who is in the denominator. A practice that improves its hypertension control rate has either lowered blood pressure in patients who had high blood pressure, or changed who is counted. Both move the number. Only one moves the patient.\n\nThe legitimate levers are real and worth using: correcting the diagnosis list so that patients who do not have the condition are not counted as untreated, applying valid exclusions, and capturing results that were obtained but recorded where the measure cannot see them. A blood pressure taken at every visit but typed into a progress note instead of the structured vital signs field is care delivered and not counted, and fixing that is not gaming — it is repairing the instrument.\n\nThe illegitimate version is the same activity aimed at the number rather than the instrument: hunting exclusions for patients who are genuinely uncontrolled, re-measuring until a favorable reading appears, or concentrating outreach on patients who are a single point from the threshold while the patients furthest from goal are left alone. That last one is the most common, the hardest to see in a dashboard, and the mechanism behind the equity failure later in this lesson.\n\nThe practical test for a practice or a system: if this intervention were removed and the underlying care stayed the same, would the score fall back? If yes, the intervention was measurement work. That is sometimes necessary. It should never be mistaken for clinical improvement.",
            },
            {
                "type": "comparison_table",
                "heading": "A Measure That Drives Care vs. a Measure That Drives Documentation",
                "rows": [
                    {
                        "label": "What closes the gap",
                        "left": "Drives care: a clinical action — the drug titrated, the screening done, the follow-up visit held",
                        "right": "Drives documentation: a code, a field, an attestation, a retrospective chart review",
                    },
                    {
                        "label": "Where the work happens",
                        "left": "Drives care: at the point of care, in standing workflow",
                        "right": "Drives documentation: after the fact, in a measurement or coding department",
                    },
                    {
                        "label": "Effect on the patient",
                        "left": "Drives care: outcome changes whether or not anyone reports it",
                        "right": "Drives documentation: outcome is unchanged; only the record differs",
                    },
                    {
                        "label": "Durability",
                        "left": "Drives care: performance holds when the campaign ends, because the workflow changed",
                        "right": "Drives documentation: performance regresses the moment the abstraction effort stops",
                    },
                    {
                        "label": "Failure signature",
                        "left": "Drives care: utilization moves in the same direction as the score",
                        "right": "Drives documentation: the score improves while admissions, ED visits and costs do not",
                    },
                    {
                        "label": "The audit exposure",
                        "left": "Drives care: the clinical record supports the claim because the care happened",
                        "right": "Drives documentation: diagnoses appear with no corresponding treatment, test or follow-up",
                    },
                ],
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "The single best diagnostic question",
                "body": "Ask the team reporting a quality improvement: did total cost of care or utilization move in the same direction as the score? A real hypertension control gain shows up eventually in cardiovascular events and admissions. A documentation gain shows up nowhere else. Scores that improve while the utilization curve is flat are not necessarily fraudulent — but they are not yet clinical results either, and under a global budget only the second kind pays for itself.",
            },
            {
                "type": "text",
                "heading": "HCC Risk Adjustment: What It Is For",
                "body": "Risk adjustment exists to answer one question: how sick is this population relative to average? The CMS Hierarchical Condition Category model groups ICD-10 diagnoses into condition categories, assigns coefficients, and produces a risk adjustment factor score that scales payment. Without it, any prospective payment model — Medicare Advantage capitation, an ACO benchmark, a hospital global budget — rewards organizations for avoiding sick patients, because a fixed payment for a healthier panel is easier to live inside.\n\nThe clinical significance is that risk adjustment is driven by documentation of conditions the clinician diagnoses and manages. It is not a billing department function that can be bolted on afterwards. HCCs generally do not carry forward from year to year: a chronic condition has to be documented and coded in each payment year to count, which is why annual recapture rates are watched so closely. A patient with well-managed heart failure who was not seen and coded this year appears, to the model, to no longer have heart failure.\n\nThat creates a legitimate clinical imperative — see and document the complex patients — and an obvious temptation, which is the subject of the next two sections.",
            },
            {
                "type": "text",
                "heading": "V28 Changed the Rules, and Some Standard Advice Is Now Wrong",
                "body": "CMS finalized the V28 CMS-HCC model in the 2024 Rate Announcement and phased it in over three payment years: 33% in 2024, 67% in 2025, and 100% in 2026. Payment year 2026 is the first year with no V24 blend, so every submitted diagnosis is now evaluated against the V28 category map, hierarchy and coefficient set alone. Anyone working from a risk-adjustment playbook written before 2024 is working from a model that no longer exists.\n\nThe structural changes are large. V28 raised the number of payment HCC categories from 86 to 115 while cutting the ICD-10 codes that map to any HCC from 9,797 to 7,770 — more categories, fewer codes reaching them. CMS projected the model would lower average Medicare Advantage risk scores by about 3.12%. Conditions that were previously reliable RAF contributors were removed from payment status entirely.\n\nThe subtler change is constraining. CMS deliberately assigned identical coefficients to related categories so that the payment does not vary with a clinical distinction it does not trust to be coded consistently. Diabetes is the clearest case: the V28 diabetes categories carry the same community coefficient, so documenting diabetes with chronic complications rather than uncomplicated diabetes no longer raises the risk score within that category. Chronic kidney disease went the other way and became more stage-specific, with stage 3 split into its own categories.\n\nThis matters because \"document the diabetic complication to capture RAF value\" was standard coding advice for years, and under V28 it is no longer true as a payment statement. It remains true as a clinical statement: diabetic nephropathy, neuropathy and retinopathy belong in the problem list because they change management. The lesson is narrower and more useful than it looks — when the payment rationale for a documentation practice disappears and the clinical rationale does not, you find out quickly which rationale the organization was actually operating on.",
            },
            {
                "type": "callout",
                "variant": "tip",
                "heading": "What still legitimately moves a risk score",
                "body": "Annual recapture: chronic conditions must be re-documented and coded each payment year, so the highest-yield work is making sure complex patients are actually seen and their active conditions addressed at the visit. Specificity where V28 still pays for it: stage-specific chronic kidney disease is the current example, where the difference between an unstaged and a staged diagnosis is a real category difference. Documentation at the point of care, supported in the note by evaluation, treatment or a monitoring plan, rather than added retrospectively. Each of these is defensible in an audit precisely because a clinical encounter stands behind it.",
            },
            {
                "type": "text",
                "heading": "When Risk Adjustment Becomes Documentation Revenue",
                "body": "The evidence that this line is crossed routinely is not speculative. In October 2024 the HHS Office of Inspector General reported that CMS paid Medicare Advantage plans an estimated $7.5 billion in risk-adjusted payments for 2023 based on diagnoses reported only on health risk assessments or HRA-linked chart reviews — with no other visit, procedure, test or supply anywhere in the encounter data for those conditions, across roughly 1.7 million enrollees. In-home HRAs and HRA-linked chart reviews generated almost two-thirds of that total, and two companies accounted for more than $5.4 billion of it. OIG's recommendation was blunt: bar HRAs from being used to increase risk-adjusted payment.\n\nRead that finding clinically rather than financially. Either the diagnoses were wrong, in which case the payments were improper, or the diagnoses were right and 1.7 million people were recorded as having serious conditions that generated no treatment. OIG said exactly that. Both readings are a failure of the Clinical pillar, not just of compliance.\n\nMedPAC's March 2025 report to Congress puts the aggregate scale on it: coding intensity leaves Medicare Advantage risk scores roughly 16% higher than those of comparable fee-for-service beneficiaries, and MedPAC projected that Medicare would pay about 20% more for MA enrollees in 2025 than it would have paid for the same people in traditional Medicare — approximately $84 billion, of which favorable selection accounts for roughly $44 billion.\n\nThe design conclusion for anyone building a value-based program: a risk model is an instrument, and an instrument that can be moved without touching the patient will be. That is not a reason to abandon risk adjustment — without it, the incentive is to avoid sick people, which is worse. It is a reason to pair every risk-score target with a utilization or outcome target that documentation alone cannot satisfy.",
            },
            {
                "type": "text",
                "heading": "Star Ratings: Where the Measures Turn Into Money",
                "body": "Medicare Advantage and Part D star ratings aggregate HEDIS measures, CAHPS patient experience surveys, HOS health outcomes survey results, and administrative measures such as appeals timeliness into a single one-to-five rating per contract. The payment consequence is direct: contracts rated four stars or above qualify for a quality bonus payment that raises the plan's benchmark and increases the share of the difference between bid and benchmark that the plan keeps as rebate dollars for supplemental benefits.\n\nFor a provider organization that does not own a plan, this still determines the contract. A plan's star performance is built almost entirely out of measures that only clinicians can move — control of blood pressure and diabetes, screening completion, medication adherence, follow-up after hospitalization, patient experience of care. Plans pass that dependency downstream as quality gates in value-based contracts, which is why star-rated measures dominate the gap lists practices receive.\n\nThe concentration matters for prioritization. Measures are weighted, with outcome and patient-experience measures carrying more weight than process measures, and cut points move annually based on the distribution of all contracts. A practice that treats every measure as equally important spreads effort evenly across a set where the weights are not even, and an organization that plans against last year's cut points is planning against a moving target.",
            },
            {
                "type": "text",
                "heading": "The Equity Imperative: How an Average Improves While People Get Worse",
                "body": "Is it just? Applied to measurement, the question has a precise and uncomfortable mechanical answer. A population-level rate can rise while a subgroup's rate falls, and the standard quality report will show only the rise.\n\nThe mechanism is not mysterious. Quality improvement effort is finite, and the cheapest gains are in patients closest to the threshold — one missed refill, one overdue visit, one repeat blood pressure check. Those patients are, on average, the ones with stable housing, reliable transport, working phones and existing attachment to a practice. Concentrating effort there is rational under an unstratified measure and produces a genuine, reportable improvement. The patients furthest from goal — the ones with the most unmet social needs and the highest utilization — are the most expensive to reach per point of measure gain, and under an unstratified measure they are the rational place not to spend.\n\nThere is a second, quieter version. Denominators change. If the patients least engaged with the practice churn out of coverage, out of attribution, or out of the eligible population entirely, the measure improves because the hardest patients left the calculation. Nothing improved for them; they simply stopped being counted.\n\nThis is why the sixth question is a cross-cutting test rather than a sixth pillar. There is no separate equity measure that fixes an unstratified quality program. The fix is inside the measure itself — how it is stratified, reported and acted on — which is Clinical pillar work, done by the people who own the measure.",
            },
            {
                "type": "text",
                "heading": "Stratification in Practice, and How Fragile It Is",
                "body": "Stratified reporting is the direct countermeasure: compute the same measure separately by race, ethnicity, language, disability status, dual-eligible status or geography, and report the strata alongside the aggregate. NCQA began requiring race and ethnicity stratification with five HEDIS measures in measurement year 2022; as of MY 2027, 24 HEDIS measures can be stratified by race and ethnicity, spanning access, behavioral health, cardiovascular, diabetes, prevention and utilization. NCQA has also aligned its categories with the 2024 revision of OMB Statistical Policy Directive 15, which adds a Middle Eastern or North African category.\n\nStratification also changes who gets penalized, not just who gets counted. The 21st Century Cures Act required CMS to stratify the Hospital Readmissions Reduction Program: beginning in fiscal year 2019, hospitals are sorted into five peer groups by their share of patients dually eligible for Medicare and full-benefit Medicaid, and each hospital's excess readmission ratio is compared to the median of its own peer group rather than to a national average. Safety-net hospitals were being penalized for the population they served; Congress fixed the comparison, not the hospitals.\n\nAnd stratification is reversible. CMS finalized a Health Equity Index reward, later renamed the Excellent Health Outcomes for All reward, to begin with the 2027 star ratings and replace the existing reward factor — an explicit bonus for plans achieving good outcomes among enrollees with social risk factors. In the Contract Year 2027 final rule issued April 2, 2026, CMS decided not to implement it, stating that it would \"continue the historical reward factor that encourages consistently high performance for all enrollees across all quality measures.\"\n\nThe lesson is not about that policy choice. It is that equity accountability attached as a separate bonus is a line item, and line items are removable. Equity built into how the core measure is defined, stratified and reviewed is much harder to remove, because taking it out means changing the measure everyone is already managing to. That is the practical argument for treating the sixth question as a test each pillar must pass on its own terms.",
            },
            {
                "type": "comparison_table",
                "heading": "Unstratified vs. Stratified Measurement",
                "rows": [
                    {
                        "label": "What the report shows",
                        "left": "Unstratified: one population rate against a benchmark",
                        "right": "Stratified: the same rate computed within each subgroup, reported together",
                    },
                    {
                        "label": "Rational QI strategy it produces",
                        "left": "Unstratified: target patients nearest the threshold — cheapest points first",
                        "right": "Stratified: target the strata that are behind, because those are the ones visible",
                    },
                    {
                        "label": "What a widening gap looks like",
                        "left": "Unstratified: invisible; the aggregate can rise while a subgroup falls",
                        "right": "Stratified: a subgroup line moving the wrong way, in the same report",
                    },
                    {
                        "label": "Data requirement",
                        "left": "Unstratified: claims and clinical data only",
                        "right": "Stratified: reliable race, ethnicity, language, disability and dual-status data — usually the binding constraint",
                    },
                    {
                        "label": "Vermont's position",
                        "left": "Unstratified: hospital and plan reporting seen one payer at a time",
                        "right": "Stratified: VHCURES all-payer claims linked to the Blueprint registry allows disparities to be measured across the whole population, not one payer's book",
                    },
                ],
            },
            {
                "type": "callout",
                "variant": "info",
                "heading": "Vermont's structural advantage — and the gap it still has to close",
                "body": "Because Vermont measures across an all-payer claims database rather than one insurer's membership, it can see disparities that are invisible in single-payer reporting, and it can follow a patient who changes coverage. That advantage is only as good as the data reaching it: VITL connectivity remains voluntary and incomplete, particularly among community-based providers, and blood pressures recorded in free text cannot be stratified by anything. Vermont's quality measure landscape also runs several frameworks at once — Blueprint PCMH standards, AHEAD metrics, commercial HEDIS, GMCB hospital reporting — which is why the Blueprint's quality measure crosswalk exists. The crosswalk's useful output is not the overlaps; it is the gaps, where programs demand incompatible measures and the practices with the least data capacity absorb the cost of reporting both.",
            },
            {
                "type": "text",
                "heading": "Designing a Measure Set That Drives Care",
                "body": "Five tests are enough to screen most measure sets. First, can the measure be satisfied without the patient's condition changing? If yes, it is a documentation measure and should be paired with an outcome or utilization measure that cannot be.\n\nSecond, is it stratified, and is the stratified view reviewed by the same people who review the aggregate? A stratified report that nobody opens is not a control.\n\nThird, does the same measure serve more than one accountability program? Vermont's crosswalk logic applies anywhere: a practice installing a hypertension protocol should not be reporting three variants of the same measure to three programs, and where the programs genuinely conflict, that conflict is a fixable policy problem rather than a permanent cost of doing business.\n\nFourth, does the measure survive the end of the campaign? If performance regresses when the improvement project closes, the workflow never changed. Fifth, is the data captured as a by-product of care or as a separate act? Structured capture at the point of care scales; retrospective abstraction does not, which is the whole logic of NCQA's move away from the hybrid method.",
            },
            {
                "type": "text",
                "heading": "What This Means for the Five Pillars",
                "body": "Measurement is where the Clinical pillar becomes legible to the other four. Policy sets what must be reported and to whom, and can add or remove an equity accountability with a single rule — as the 2027 star ratings decision demonstrated. Technology determines whether the data exists in a form that can be measured at all, which is why structured capture and health information exchange connectivity are quality problems and not IT problems. Economics attaches the money, and the measure set it attaches money to is the one an organization will actually manage.\n\nOperations decides whether any of it is executable — whether there are people to run the registry, the outreach, the stratified review. And the Equity Imperative runs through all of it as a test rather than a workstream: a measure set that cannot show you who is being left behind will let you improve your average for years without noticing that you did.\n\nThe practical instruction is narrow. Pick measures whose numerators require a clinical act. Stratify them. Review the strata with the same seriousness as the aggregate. Pair every risk-score target with a utilization target. Then the clinical redesign in the previous lesson has a way to prove it worked — which is the only reason anyone funds the second year of it.",
            },
        ],
        "quiz": {
            "id": "quiz_5p_quality_mechanics",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p16a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "How was the CMS-HCC V28 risk adjustment model phased in, and what is different about payment year 2026?",
                    "explanation": "CMS finalized V28 in the 2024 Rate Announcement and blended it in at 33% in payment year 2024, 67% in 2025 and 100% in 2026. PY2026 is the first year with no V24 component, so every diagnosis is evaluated against the V28 category map, hierarchy and coefficients alone.",
                    "options": [
                        {
                            "id": "o_5p16a1",
                            "text": "Blended 33% in 2024, 67% in 2025 and 100% in 2026 — PY2026 is the first year with no V24 component",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p16a2",
                            "text": "Implemented in full in a single year, replacing V24 outright in 2024",
                            "isCorrect": False,
                            "explanation": "CMS used a three-year blend specifically to soften the revenue impact. A single-year cutover was not the finalized approach.",
                        },
                        {
                            "id": "o_5p16a3",
                            "text": "Applied only to new Medicare Advantage enrollees, with existing enrollees remaining on V24",
                            "isCorrect": False,
                            "explanation": "The blend applied to the risk score calculation across the population, not to a subset of enrollees by enrollment date.",
                        },
                        {
                            "id": "o_5p16a4",
                            "text": "Deferred indefinitely; V24 remains the operative model for 2026 payment",
                            "isCorrect": False,
                            "explanation": "V28 is fully in effect for payment year 2026. Working from V24 assumptions is the specific error this lesson warns about.",
                        },
                    ],
                },
                {
                    "id": "q_5p16b",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Under V28, why is \"document the diabetic complication to capture additional RAF value\" no longer accurate as a payment statement?",
                    "explanation": "CMS constrained the V28 diabetes categories to carry the same community coefficient, so coding diabetes with chronic complications rather than uncomplicated diabetes does not raise the risk score within that category. The clinical reason to document complications — they change management — is unaffected.",
                    "options": [
                        {
                            "id": "o_5p16b1",
                            "text": "The V28 diabetes categories are constrained to the same coefficient, so complication status no longer changes the score within that category",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p16b2",
                            "text": "Diabetes was removed from the HCC model entirely in V28",
                            "isCorrect": False,
                            "explanation": "Diabetes remains in the model with its own categories. What changed is that the categories share a coefficient rather than paying progressively.",
                        },
                        {
                            "id": "o_5p16b3",
                            "text": "Complications may now be coded only by the treating specialist, not by primary care",
                            "isCorrect": False,
                            "explanation": "V28 did not change who may code a condition. The change is in the coefficient structure of the model.",
                        },
                        {
                            "id": "o_5p16b4",
                            "text": "Documentation of complications is no longer clinically relevant",
                            "isCorrect": False,
                            "explanation": "The opposite: diabetic nephropathy, neuropathy and retinopathy change management and belong in the problem list. Only the payment rationale changed.",
                        },
                    ],
                },
                {
                    "id": "q_5p16c",
                    "type": "single_choice",
                    "points": 1,
                    "question": "What did the HHS Office of Inspector General report in October 2024 about Medicare Advantage health risk assessments?",
                    "explanation": "OIG estimated that CMS paid MA plans about $7.5 billion in risk-adjusted payments for 2023 based on diagnoses that appeared only on health risk assessments or HRA-linked chart reviews, with no other visit, procedure, test or supply in the encounter data for roughly 1.7 million enrollees — meaning either the diagnoses were wrong or the care was never delivered.",
                    "options": [
                        {
                            "id": "o_5p16c1",
                            "text": "About $7.5 billion in 2023 risk-adjusted payments rested on diagnoses reported only on HRAs or HRA-linked chart reviews, with no other associated care",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p16c2",
                            "text": "Health risk assessments were found to improve preventive screening completion across all MA plans",
                            "isCorrect": False,
                            "explanation": "The report's concern was the absence of follow-up care associated with HRA-reported diagnoses, not a screening benefit.",
                        },
                        {
                            "id": "o_5p16c3",
                            "text": "HRAs were found to be underused, and OIG recommended expanding their role in risk adjustment",
                            "isCorrect": False,
                            "explanation": "OIG recommended the reverse — that CMS bar HRAs from being used to increase risk-adjusted payments.",
                        },
                        {
                            "id": "o_5p16c4",
                            "text": "The findings applied only to small regional plans with limited encounter data systems",
                            "isCorrect": False,
                            "explanation": "Two of the largest national organizations accounted for more than $5.4 billion of the estimated $7.5 billion.",
                        },
                    ],
                },
                {
                    "id": "q_5p16d",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A health plan reports that its diabetes control measure improved three points year over year. Stratified review shows the rate fell for members with the highest social risk. What most likely happened?",
                    "explanation": "Quality improvement effort is finite and the cheapest gains are in patients closest to the threshold, who tend to be the most stably housed, connected and already engaged. Concentrating there raises the aggregate while patients furthest from goal are left alone — and under an unstratified measure, nothing in the report shows it. Denominator churn, where the least-engaged patients leave the eligible population, produces the same pattern.",
                    "options": [
                        {
                            "id": "o_5p16d1",
                            "text": "Improvement effort concentrated on patients nearest the measure threshold, which is the rational strategy under an unstratified measure",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p16d2",
                            "text": "The stratified figures must be a calculation error, since the aggregate rose",
                            "isCorrect": False,
                            "explanation": "An aggregate rate can rise while a subgroup rate falls. That divergence is the specific reason stratified reporting exists.",
                        },
                        {
                            "id": "o_5p16d3",
                            "text": "Risk adjustment was applied incorrectly to the quality measure",
                            "isCorrect": False,
                            "explanation": "Risk adjustment scales payment for population complexity; it does not explain a subgroup moving in the opposite direction from the aggregate on a clinical process or outcome measure.",
                        },
                        {
                            "id": "o_5p16d4",
                            "text": "The plan needs a separate equity program to run alongside its quality program",
                            "isCorrect": False,
                            "explanation": "A parallel program does not change the incentive that produced the result. The fix is inside the measure — stratified computation, reporting and review by the people who own it.",
                        },
                    ],
                },
                {
                    "id": "q_5p16e",
                    "type": "true_false",
                    "points": 1,
                    "question": "True or false: CMS implemented the Health Equity Index reward (later renamed the Excellent Health Outcomes for All reward) beginning with the 2027 star ratings, replacing the historical reward factor.",
                    "explanation": "False. CMS had finalized the reward to begin with the 2027 star ratings, but in the Contract Year 2027 final rule issued April 2, 2026 it decided not to implement it and to continue the historical reward factor instead. The point for lesson purposes: equity accountability attached as a separate bonus is removable, while equity built into how the core measure is defined and stratified is not.",
                    "options": [
                        {
                            "id": "o_5p16e1",
                            "text": "False",
                            "isCorrect": True,
                        },
                        {
                            "id": "o_5p16e2",
                            "text": "True",
                            "isCorrect": False,
                            "explanation": "The reward was finalized and then reversed. CMS's CY2027 final rule states it is not implementing the Excellent Health Outcomes for All reward and will continue the historical reward factor.",
                        },
                    ],
                },
            ],
        },
    },
]
