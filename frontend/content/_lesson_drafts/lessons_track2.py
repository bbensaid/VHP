# -*- coding: utf-8 -*-
"""Five Pillars, One Imperative — Track 2: Policy — Establish the Mandate.

Three lessons (course orders 6, 7, 8) drawn from Chapters 2 and 3 of
HTR_Book_v42.md. Every statistic, statute, case and study named below was
verified against a primary or independent secondary source before it was
written; sources are named inline and in key_stat `source` fields.
"""

LESSONS = [
    # ------------------------------------------------------------------
    # Lesson 6 — Legislative Architecture: Act 167 -> Act 51 -> Act 68
    # ------------------------------------------------------------------
    {
        "id": "lesson_5p_legislative_architecture",
        "trackId": "track_5p_policy",
        "pillar": "policy",
        "order": 6,
        "slug": "legislative-architecture-reform-cascade",
        "title": "Legislative Architecture: Act 167 → Act 51 → Act 68",
        "summary": "Vermont built its reform mandate in three statutes over three years: a diagnostic act, a planning act, and an operational act with dated deadlines. This lesson takes each act apart to show what instrument it used, what it made possible next, and why reversing the sequence would have failed.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["policy-pillar", "act-167", "act-68", "reform-cascade", "vermont"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p6a", "text": "State what each of Act 167 (2022), Act 51 (2023) and Act 68 (2025) directed, and identify the policy instrument each one used"},
            {"id": "obj_5p6b", "text": "Explain why a public diagnostic mandate had to precede an operational mandate for the mandate to survive politically"},
            {"id": "obj_5p6c", "text": "Name the Act 68 statutory deadlines that gate work in the Technology, Economics, Clinical and Operations pillars"},
            {"id": "obj_5p6d", "text": "Recognize the same cascade pattern in a non-Vermont statutory sequence and diagnose what a given reform agenda is missing"},
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "Three statutes, one instrument each",
                "body": "Every state reform agenda eventually has to answer one question: which provisions are aspirational and which are binding? Vermont answered it across three legislative sessions, and the answer is legible in the statutes themselves. Act 167 of 2022 commissioned a diagnosis. Act 51 of 2023 authorized planning with a small number of hospitals. Act 68 of 2025 named specific payment tools and attached dated deadlines to them.\n\nEach act used a different instrument, and the instruments are not interchangeable. A diagnostic mandate buys evidence and public legitimacy. A planning mandate buys institutional capacity — people who have actually attempted the work and know where it breaks. An operational mandate spends both: it converts the evidence and the capacity into a legal obligation with a date on it.\n\nThis ordering is what policy scholars call a reform cascade — a legislatively structured process in which each intervention creates the conditions for the next. It is the Policy pillar doing the only job the Policy pillar can do: answering \"is it permissible?\" in a way the other four pillars can then build on. Technology, Economics, Clinical and Operations all execute inside the space a mandate defines. If that space is undefined, the other pillars have nothing to execute against.",
            },
            {
                "type": "text",
                "heading": "Act 167 of 2022 — the diagnostic mandate",
                "body": "Act 167 of 2022 directed the Green Mountain Care Board to analyze how to improve the sustainability of Vermont's hospital system, and to develop community- and data-informed options for transforming it. GMCB commissioned an independent consultant — Oliver Wyman — under a roughly $1 million engagement. The resulting report, *Act 167 Community Engagement: Recommendations*, was issued on September 18, 2024.\n\nThe process was deliberately slow and deliberately public. GMCB ran two rounds of community engagement, in October–November 2023 and again in July–August 2024, across all fourteen of Vermont's hospital service areas, with a data-analysis period in between. The engagement came before the recommendations, not after them — the meetings were structured as inputs to a shared diagnosis rather than as hearings on a finished plan.\n\nAct 167 also set five statutory goals that have functioned ever since as Vermont's accountability frame: reduce inefficiencies, lower costs, improve health outcomes, reduce health inequities, and increase access to essential services. Those five goals are not preamble language. AHS reports against them, GMCB's budget review references them, and Vermont's Rural Health Transformation Program application maps each proposed initiative to them. That is what well-designed statutory goal-setting produces — a persistent accountability structure that outlives the bill that created it.",
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "9 of 14", "label": "Vermont hospitals reporting operating losses in FY2023, with the worst at -8.9%", "source": "Oliver Wyman, Act 167 Community Engagement: Recommendations, September 2024"},
                    {"value": "$700M–$2.4B", "label": "Projected cumulative five-year hospital system deficit below break-even by 2028, depending on expense-growth scenario", "source": "Oliver Wyman Act 167 report, September 2024"},
                    {"value": "14", "label": "Hospital service areas covered by two full rounds of community engagement before any recommendation was published", "source": "Green Mountain Care Board, Act 167 community engagement record"},
                    {"value": "4", "label": "Hospitals for which the report recommended especially extensive restructuring: North Country, Gifford, Springfield, Grace Cottage", "source": "Oliver Wyman Act 167 report, as reported by VTDigger, October 2024"},
                ],
            },
            {
                "type": "text",
                "heading": "Why the diagnosis was built in public",
                "body": "Publishing a recommendation to close or restructure named services at named community hospitals is not analytically hard. It is politically treacherous. Communities organize around their local hospitals, and a consultant's report that arrives without a prior public process is trivially dismissed as an outsider's spreadsheet.\n\nVermont's sequence — listen first, diagnose second, recommend third — was designed to produce findings with enough legitimacy to survive the backlash. It did not eliminate the backlash. When the final report landed in late October 2024, several hospitals publicly disputed the accuracy of the underlying data, and the dispute was covered statewide. But the diagnosis held well enough to become the intellectual source material for Act 68 the following spring, which is the only test that mattered.",
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "A public diagnosis is contested by design — plan for that, not around it",
                "body": "Vermont's Act 167 report drew formal objections from hospitals over data accuracy within weeks of publication, and GMCB and Oliver Wyman both issued statements in response. A diagnostic process that generates no objections almost certainly did not say anything binding. The question to ask is not whether a diagnosis will be challenged but whether it was built so that a challenge to one data element does not collapse the whole finding.",
            },
            {
                "type": "text",
                "heading": "Act 51 of 2023 — the planning mandate",
                "body": "Act 51 of 2023 is the least discussed of the three acts and the easiest to underrate. It directed the Agency of Human Services to engage in transformation planning with up to four hospitals — or a different number if alternate funds allowed — to reduce inefficiencies, lower costs, improve population health outcomes, reduce health inequities, and increase access to essential services, while maintaining sufficient capacity for emergency management.\n\nNote what Act 51 did not do. It did not mandate an outcome, cap a price, or set a revenue envelope. It funded a small number of institutions to attempt the work and find out what breaks. That is the function of a planning mandate: it converts a diagnosis into operational knowledge inside the agency that will later have to administer a real mandate. A legislature that jumps from diagnosis straight to operation writes deadlines that nobody in the executive branch yet knows how to meet.",
            },
            {
                "type": "text",
                "heading": "Act 68 of 2025 — the operational mandate",
                "body": "Act 68 of 2025 (originating as S.126) is the operationalization of the Act 167 diagnosis. Its alignment with Oliver Wyman's recommendations is direct and traceable. Oliver Wyman recommended beginning movement to reference-based pricing at 200% of Medicare or less for PPS hospitals; Act 68 directs GMCB to implement reference-based pricing no later than hospital fiscal year 2027. Oliver Wyman recommended moving to global budgets when conditions for success are met; Act 68 requires global hospital budgets for non-critical-access hospitals by FY2028 and for all Vermont hospitals by 2030.\n\nThe statutory language is the point. Act 68 does not invite hospitals to experiment with alternative pricing. It directs GMCB to establish, by rule, the maximum amounts hospitals may receive for each service they provide, benchmarked to a percentage of Medicare reimbursement or another appropriate benchmark. Hospitals may not bill patients or insurers above the established reference price, which closes the billing workarounds that undermined earlier price-transparency efforts. Act 68's RBP provision is the most expansive of its kind in the country: it applies Medicare-benchmarked prices across the entire commercial market rather than to one purchaser's book of business.\n\nAct 68 also requires AHS to deliver a Statewide Health Care Delivery Strategic Plan to the legislature by December 2028, updated every three years, and establishes a Health Care Delivery Advisory Committee to support it. GMCB must report to the General Assembly on implementation, beginning with a February 2026 update and continuing through its annual reports.",
            },
            {
                "type": "comparison_table",
                "heading": "What each act directed, and what it made possible next",
                "rows": [
                    {"label": "Act 167 (2022)", "left": "Directed GMCB to analyze hospital system sustainability and develop community- and data-informed transformation options; set five statutory goals", "right": "Produced a public, contested-and-survived evidence base and an accountability frame that every later document maps to"},
                    {"label": "Act 51 (2023)", "left": "Directed AHS to conduct transformation planning with up to four hospitals against the same five goals", "right": "Built agency-side operational knowledge of what hospital transformation actually requires, before any deadline attached to it"},
                    {"label": "Act 68 (2025)", "left": "Directs GMCB to set maximum allowable hospital payments by rule (RBP) no later than FY2027 and global budgets for non-CAH hospitals by FY2028, all hospitals by 2030; requires a Statewide Strategic Plan by December 2028", "right": "Converts the diagnosis and the planning capacity into dated legal obligations that the other four pillars must execute against"},
                    {"label": "The cascade as a whole", "left": "Three sessions, three instruments, one continuous accountability frame", "right": "A mandate that is binding because it is evidenced, and executable because an agency already tried it at small scale"},
                ],
            },
            {
                "type": "text",
                "heading": "The price problem reference-based pricing is aimed at",
                "body": "Reference-based pricing is a response to measured variation, not to an abstract objection to hospital prices. RAND's Hospital Price Transparency Study, reported in Vermont in October 2020, found that commercial prices at the seven Vermont hospitals in its sample ranged from 178% of Medicare at Springfield Hospital to 358% of Medicare at the University of Vermont Medical Center. UVMMC's outpatient prices ran roughly 40% above the national benchmark.\n\nA nearly two-fold spread between the cheapest and most expensive hospital in a state of 650,000 people is not explained by case mix or quality. It is explained by negotiating leverage. Reference-based pricing removes the leverage from the equation by fixing the benchmark administratively — which is exactly why it requires statutory authority rather than a payer's willingness to walk away from a contract.",
            },
            {
                "type": "text",
                "heading": "Why global budgets follow reference-based pricing, and not the reverse",
                "body": "Total hospital spending is price multiplied by volume. Reference-based pricing controls the first term and leaves the second one free. A hospital facing lower per-service revenue can respond by delivering more services — more imaging, more procedures, admitting patients who could have been managed as outpatients. Oliver Wyman called this the balloon squeeze: press on one side of the system and it expands on the other.\n\nGlobal budgets close the loophole by capping total hospital revenue regardless of volume, which inverts the financial incentive from maximizing throughput to maximizing population health per dollar of revenue. Act 68's ordering — RBP in FY2027, global budgets for non-CAH hospitals in FY2028, all hospitals by 2030 — reflects that logic. Price discipline first, because it is administratively simpler and produces the price data a budget must be built on. Revenue envelopes second, because they require the analytics, the attribution and the clinical redesign that a hospital cannot stand up in a single year.",
            },
            {
                "type": "callout",
                "variant": "info",
                "heading": "The deadlines that gate the other four pillars",
                "body": "FY2027 (beginning October 2026): reference-based pricing becomes mandatory across the commercial market. FY2028: global budgets for non-critical-access hospitals. December 2028: the Statewide Health Care Delivery Strategic Plan is due to the legislature. 2030: global budgets for all Vermont hospitals, critical access included. Technology work (claims and clinical data infrastructure), Economics work (revenue modeling and APM readiness), Clinical work (care redesign that survives a fixed revenue envelope) and Operations work (the staffing and capital plans that follow) are all scheduled backward from these four dates. This is what it means for Policy to be the load-bearing pillar.",
            },
            {
                "type": "text",
                "heading": "The same cascade outside Vermont: Maryland and Massachusetts",
                "body": "Maryland's rate-setting system — the closest American analogue to what Act 68 is building — was itself a cascade, and a slower one. The Maryland legislature created the Health Services Cost Review Commission in 1971. The Commission began setting hospital rates in July 1974, after a three-year phase-in. Only in July 1977 did a federal waiver require Medicare and Medicaid to pay on the basis of HSCRC-approved rates, which is the step that made the system genuinely all-payer. Six years elapsed between the enabling statute and the authority that made it work.\n\nMassachusetts ran the same pattern with different instruments. Chapter 58 of 2006 established near-universal coverage and, in doing so, produced the enrollment and spending data that made the state's cost problem measurable. Chapter 224 of 2012 then set a statewide health care cost growth benchmark and created the Health Policy Commission to monitor it. Coverage first, cost discipline second — and the second act was possible because the first one had generated both the data and the political constituency.\n\nNeither state started with its binding instrument. In both, the binding instrument arrived years after a statute that did something less dramatic and more evidentiary. Vermont compressed the same sequence into three years, which is fast by this standard, not slow.",
            },
            {
                "type": "text",
                "heading": "What a reform cascade requires",
                "body": "Three conditions distinguish a cascade from a pile of unrelated bills. First, a continuous accountability frame: Vermont's five Act 167 goals appear unchanged in Act 68 and in every AHS report and federal application since. Reform agendas that redefine their goals each session cannot demonstrate progress, because the measuring stick keeps moving.\n\nSecond, evidence that is public before it is binding. Act 68's price and budget mandates are defensible because they implement recommendations that were developed in the open across fourteen hospital service areas over two years. A mandate of equal severity dropped without that record would face the same litigation with a much weaker administrative record behind it.\n\nThird, dated obligations with a named administrator. Act 68 does not say that Vermont should move toward global budgets. It names GMCB, names the rulemaking instrument, and names the fiscal years. The difference between a transformation that succeeds and one that produces documents is usually visible in whether the statute contains a date and a defendant.",
            },
            {
                "type": "callout",
                "variant": "tip",
                "heading": "Reading a reform statute as a practitioner",
                "body": "Four questions, in order. Who is directed to act — an agency with rulemaking authority, or nobody in particular? By when — a fiscal year, or \"as soon as practicable\"? Against what standard — a named benchmark like a percentage of Medicare, or a goal with no denominator? And what happens on non-compliance? A statute that answers all four is an operational mandate you must plan against. A statute that answers fewer than three is a signal of legislative intent, which is a different and much weaker thing.",
            },
        ],
        "quiz": {
            "id": "quiz_5p_legislative_architecture",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p6a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "What instrument did Act 167 of 2022 use, and what did it produce?",
                    "explanation": "Act 167 was a diagnostic mandate. It directed GMCB to analyze hospital system sustainability and develop community- and data-informed transformation options; the resulting Oliver Wyman report was issued September 18, 2024, after two rounds of engagement across all 14 hospital service areas.",
                    "options": [
                        {"id": "o_5p6a1", "text": "A diagnostic mandate — it commissioned an independent analysis of hospital system sustainability and set five statutory goals", "isCorrect": True},
                        {"id": "o_5p6a2", "text": "A price mandate — it capped commercial hospital payments at 200% of Medicare", "isCorrect": False, "explanation": "The reference-based pricing mandate is in Act 68 of 2025, effective no later than hospital fiscal year 2027. Act 167 set no prices."},
                        {"id": "o_5p6a3", "text": "A planning mandate — it directed AHS to conduct transformation planning with up to four hospitals", "isCorrect": False, "explanation": "That is Act 51 of 2023. Act 167 preceded it and produced the diagnosis Act 51's planning work drew on."},
                        {"id": "o_5p6a4", "text": "A governance mandate — it merged GMCB into the Agency of Human Services", "isCorrect": False, "explanation": "No Vermont act merged GMCB into AHS. The two remain separate bodies with distinct statutory roles under Act 68."},
                    ],
                },
                {
                    "id": "q_5p6b",
                    "type": "single_choice",
                    "points": 1,
                    "question": "According to the Oliver Wyman Act 167 report, how many of Vermont's 14 hospitals reported operating losses in FY2023?",
                    "explanation": "Nine of fourteen, with the worst operating margin at -8.9%. The same report projected a cumulative five-year system deficit of $700 million to $2.4 billion below break-even by 2028 depending on expense-growth assumptions.",
                    "options": [
                        {"id": "o_5p6b1", "text": "Nine", "isCorrect": True},
                        {"id": "o_5p6b2", "text": "Four", "isCorrect": False, "explanation": "Four is the number of hospitals — North Country, Gifford, Springfield and Grace Cottage — for which the report recommended especially extensive restructuring, not the number reporting losses."},
                        {"id": "o_5p6b3", "text": "Thirteen", "isCorrect": False, "explanation": "Thirteen of fourteen is the report's projection for 2028 under its conservative scenario, not the FY2023 actual."},
                        {"id": "o_5p6b4", "text": "Two", "isCorrect": False, "explanation": "Far too few. A majority of Vermont hospitals were already in operating loss in FY2023, which is why the report characterized the trajectory as systemic rather than institution-specific."},
                    ],
                },
                {
                    "id": "q_5p6c",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Why does Act 68 sequence reference-based pricing before global budgets rather than the reverse?",
                    "explanation": "This is the balloon squeeze problem. Total hospital spending is price times volume; RBP controls price and leaves volume free, so global budgets are required to close the loophole. RBP comes first because it is administratively simpler and generates the price data a revenue envelope must be built on.",
                    "options": [
                        {"id": "o_5p6c1", "text": "RBP controls unit price but not volume, so global budgets are needed to cap total revenue — and RBP produces the price data global budgets are built from", "isCorrect": True},
                        {"id": "o_5p6c2", "text": "Global budgets are federally prohibited until a state has operated RBP for at least one fiscal year", "isCorrect": False, "explanation": "No federal rule imposes that ordering. Maryland has operated hospital global budgets without a prior statewide commercial RBP mandate."},
                        {"id": "o_5p6c3", "text": "RBP applies to Medicaid and global budgets apply to commercial payers, so they must be staged separately", "isCorrect": False, "explanation": "Act 68's RBP applies across the commercial market, and the global budget requirement covers hospitals rather than a single payer type. The staging is about mechanism, not payer segmentation."},
                        {"id": "o_5p6c4", "text": "Global budgets are voluntary under Act 68, so they could not be scheduled first", "isCorrect": False, "explanation": "Act 68's global budget requirement is mandatory — non-critical-access hospitals by FY2028 and all Vermont hospitals by 2030. Eliminating the voluntary option is the act's central design choice."},
                    ],
                },
                {
                    "id": "q_5p6d",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A state legislature passes a bill declaring that hospitals \"shall work toward\" affordable pricing, with no named administrator, no benchmark and no date. Applying the four-question test from this lesson, what has it actually produced?",
                    "explanation": "A statement of legislative intent, not an operational mandate. Without a named administrator with rulemaking authority, a dated obligation, a measurable benchmark and a consequence for non-compliance, nothing downstream in the other four pillars can be scheduled against it.",
                    "options": [
                        {"id": "o_5p6d1", "text": "A signal of legislative intent — nothing the other four pillars can schedule work against", "isCorrect": True},
                        {"id": "o_5p6d2", "text": "An operational mandate, because the word \"shall\" makes the obligation binding", "isCorrect": False, "explanation": "\"Shall\" without an administrator, a benchmark or a date is unenforceable in practice. Act 68 is binding because it names GMCB, the rulemaking instrument, the Medicare benchmark and the fiscal years."},
                        {"id": "o_5p6d3", "text": "A diagnostic mandate equivalent to Act 167", "isCorrect": False, "explanation": "Act 167 commissioned an independent analysis with a funded engagement and a defined scope. A hortatory declaration commissions nothing."},
                        {"id": "o_5p6d4", "text": "A planning mandate equivalent to Act 51", "isCorrect": False, "explanation": "Act 51 directed a named agency to conduct transformation planning with a specified number of hospitals. A declaration with no administrator directs no one."},
                    ],
                },
                {
                    "id": "q_5p6e",
                    "type": "true_false",
                    "points": 1,
                    "question": "Maryland's all-payer hospital rate-setting system became binding on Medicare and Medicaid in the same year the legislature created the Health Services Cost Review Commission.",
                    "explanation": "False. The legislature created HSCRC in 1971; the Commission began setting rates in July 1974 after a three-year phase-in; and a federal waiver requiring Medicare and Medicaid to pay HSCRC-approved rates took effect in July 1977. Six years separated the enabling statute from the authority that made the system genuinely all-payer — the same cascade pattern Vermont compressed into three years.",
                    "options": [
                        {"id": "o_5p6e1", "text": "False", "isCorrect": True},
                        {"id": "o_5p6e2", "text": "True", "isCorrect": False, "explanation": "The 1971 statute created the Commission but did not bind federal payers. That required the 1977 Medicare waiver, six years later."},
                    ],
                },
            ],
        },
    },
    # ------------------------------------------------------------------
    # Lesson 7 — Voluntary vs. Mandatory
    # ------------------------------------------------------------------
    {
        "id": "lesson_5p_voluntary_vs_mandatory",
        "trackId": "track_5p_policy",
        "pillar": "policy",
        "order": 7,
        "slug": "voluntary-vs-mandatory-architecture",
        "title": "Voluntary vs. Mandatory — Why Architecture Beats Ambition",
        "summary": "A reform that depends on voluntary participation by the actors with the most to lose will be defeated by exactly those actors. This lesson traces the mechanism through Vermont's four failed global budget attempts, Maryland's mandatory rate-setting foundation, and Medicare's randomized mandatory-versus-voluntary bundled payment experiment.",
        "estimatedMinutes": 20,
        "isPublished": True,
        "tags": ["policy-pillar", "mandatory-participation", "onecare", "maryland", "selection-bias"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p7a", "text": "Explain the participation-selection mechanism by which voluntary payment models lose the population whose costs they were designed to manage"},
            {"id": "obj_5p7b", "text": "Trace Vermont's four attempts at hospital global budgets and identify the design feature common to every failure"},
            {"id": "obj_5p7c", "text": "Use Medicare's CJR randomization to explain why savings reported by a voluntary model are not evidence of what a mandate would achieve"},
            {"id": "obj_5p7d", "text": "Distinguish a mandate with defined carve-outs from a voluntary program, and assess the durability of each"},
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "The opt-out problem, stated precisely",
                "body": "The generic version of this argument is that voluntary programs let high-cost actors free-ride. That is close, but imprecise enough to be misleading. The actual mechanism is narrower and more damaging.\n\nIn a total-cost or global-budget arrangement, the model's financial logic depends on holding a defined population's spending against a benchmark. Participation is chosen by each payer and provider individually, and each one chooses on the basis of its own expected result. Organizations that expect to beat the benchmark join. Organizations that expect to lose against it — typically the highest-priced and highest-volume actors, whose current revenue depends on the thing the model is trying to change — decline, or join and then leave.\n\nWhat remains inside the model is not a random sample of the market. It is a sample selected on expected performance. Two consequences follow, and they are distinct. First, the model cannot deliver system-level savings, because the spending it most needed to reach is outside it. Second, whatever savings it does report cannot be attributed to the model, because the participants were selected on their expected ability to produce them. The first consequence is a policy failure; the second is an evidence failure; and a program suffering the second cannot prove it is not suffering the first.",
            },
            {
                "type": "text",
                "heading": "Vermont tried four times",
                "body": "Vermont has attempted a hospital global budget architecture four times in the past decade and a half: the GMCB net patient revenue cap in 2012, a Rutland Regional pilot proposed in 2014 that was never implemented, the Vermont All-Payer ACO Model from 2017 through 2025, and the current Act 167 / Act 68 mandate.\n\nThe first three shared one design feature. Participation was elective for at least one class of actor who mattered. A hospital could decline; a payer could decline; and the arrangement had no mechanism to hold the resulting gap.\n\nAct 68 is the first of the four to remove the option. It directs GMCB to establish reference-based prices by rule across the commercial market and global budgets for non-critical-access hospitals by FY2028 and all hospitals by 2030. That change — from an arrangement participants elect into, to a rule they operate under — is the single most important difference between Vermont's current trajectory and everything that preceded it.",
            },
            {
                "type": "text",
                "heading": "OneCare: what voluntary participation actually cost",
                "body": "OneCare Vermont was the lead accountable care organization under the Vermont All-Payer ACO Model. Its participation was voluntary, and the Oliver Wyman Act 167 report listed that plainly in its perception-versus-reality analysis: Vermont did not have a statewide ACO, it had a voluntary one that did not include several hospitals or many community-based providers. The same analysis noted that Vermont's \"all-payer\" model excluded fee-for-service Medicare and roughly 40% of commercially insured Vermonters — so the label described a minority of total health care spending.\n\nThe opt-out became concrete on January 1, 2023, when Blue Cross Blue Shield of Vermont, the state's largest insurer, declined to renew its OneCare contract. Roughly 93,000 enrollees — about a third of OneCare's total attributed population — left the model in a single step. No management decision inside OneCare could replace them, because the state had no authority to require the payer to stay.\n\nOneCare announced in November 2024 that it would wind down at the close of 2025, coinciding with the scheduled end of the All-Payer ACO Model. The lesson is not that ACOs do not work. It is that a model holding a population accountable for total cost cannot survive the unilateral departure of a third of that population, and a voluntary architecture guarantees that departure is always available.",
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "~93,000", "label": "Enrollees removed from OneCare Vermont in one step when Blue Cross Blue Shield of Vermont declined to renew, effective January 1, 2023 — about a third of its attributed population", "source": "Vermont Business Magazine / GMCB budget record"},
                    {"value": "$812", "label": "Savings per joint replacement episode under Medicare's mandatory CJR bundle — a 3.1% reduction, with no increase in complication rates", "source": "Barnett et al., New England Journal of Medicine, 2019"},
                    {"value": "67 of 196", "label": "Metropolitan statistical areas randomly assigned by Medicare to mandatory bundled payments in 2016, creating the randomization that makes CJR evaluable", "source": "CMS, Comprehensive Care for Joint Replacement Model final rule, 2015"},
                    {"value": "24 of 62", "label": "Oregon hospitals subject to the SB 1067 payment cap after rural and sole-community exemptions — all of which remained in network", "source": "Milbank Memorial Fund, 2024"},
                ],
            },
            {
                "type": "comparison_table",
                "heading": "Voluntary versus mandatory architecture",
                "rows": [
                    {"label": "Who participates", "left": "Voluntary: organizations that expect to beat the benchmark", "right": "Mandatory: every organization in the defined class, whatever it expects"},
                    {"label": "Population coverage", "left": "A selected subset; the highest-cost spending is frequently outside it", "right": "The full defined population, so the financial logic applies to the spending that matters"},
                    {"label": "Evidence value", "left": "Results confound program effect with selection — savings cannot be attributed to the design", "right": "Results are attributable, especially where assignment is random as in CJR"},
                    {"label": "Exit risk", "left": "Any participant may leave at renewal, and the largest ones have the most reason to", "right": "Exit requires changing the rule, which is a legislative or rulemaking act with a public record"},
                    {"label": "Characteristic failure mode", "left": "Erosion — the model shrinks toward the participants who needed it least", "right": "Litigation and carve-out pressure — the fight moves to the scope of the rule, in public"},
                ],
            },
            {
                "type": "text",
                "heading": "Maryland: the mandate underneath the model",
                "body": "Maryland is usually cited as the American proof that hospital global budgets work. The more useful point is what sits beneath them. Maryland has had mandatory all-payer hospital rate regulation since the Health Services Cost Review Commission began setting rates in 1974, made binding on federal payers by a 1977 Medicare waiver. Every payer in the state pays on the same basis, by law.\n\nWhen Maryland layered global budget revenue onto that foundation under its All-Payer Model in 2014, hospital participation in the global budget contracts was technically elective — and every hospital participated anyway. That is the part worth understanding. The election was not meaningful, because the alternative was operating outside a rate system that governed all of the hospital's payers. A mandate one level down made the choice one level up a formality.\n\nThe results are documented. Over the All-Payer Model's first five years, Maryland saved Medicare $1.4 billion in hospital expenditures, with hospital expenditure growth running 8.74% below the national rate since 2013, and $869 million in total cost of care including non-hospital spending. Under the successor Total Cost of Care Model, CMS's evaluation found Medicare fee-for-service spending reduced by 2.1% and hospital admissions down 16.2%, with $689 million in reduced total Medicare spending from 2019 to 2021.",
            },
            {
                "type": "text",
                "heading": "CJR versus BPCI: the cleanest natural experiment in U.S. payment policy",
                "body": "Medicare ran the controlled version of this question. In 2016, CMS randomly assigned hospitals in 67 of 196 metropolitan statistical areas to mandatory participation in the Comprehensive Care for Joint Replacement model. CMS was explicit about why: required participation avoids the selection bias inherent in any voluntary model. Because the CJR mandate captured hospitals with and without prior experience in the voluntary Bundled Payments for Care Improvement program, it also created a direct comparison between self-selected and compelled participants.\n\nThe two-year evaluation, published by Barnett and colleagues in the *New England Journal of Medicine* in 2019, found that mandatory bundles reduced spending by $812 per episode, a 3.1% decrease, driven almost entirely by reduced use of skilled nursing facilities after discharge, with no increase in complication rates.\n\nThat is a modest number, and its modesty is the finding. Voluntary bundled payment programs had reported larger effects. When the same intervention was applied to a randomly assigned set of hospitals — including hospitals with no interest in participating and no prior investment in post-acute redesign — the effect was real but small. The difference between the two figures is a measurement of how much of the voluntary result was selection rather than program.",
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "Voluntary-model results are not evidence of what a mandate would do",
                "body": "This is the most common analytical error in value-based care planning. A health system reads that a voluntary program produced an X% reduction, then builds a business case assuming a statewide mandate would produce the same. It will not, because the reported X came from organizations that chose to participate on the basis of expecting to achieve it. The only defensible way to estimate a mandate's effect is from a mandate — which is why the CJR randomization matters far more than its dollar figure suggests.",
            },
            {
                "type": "text",
                "heading": "Oregon: a mandate with carve-outs is still a mandate",
                "body": "Oregon's SB 1067, enacted in 2017 and effective in October 2019 for educators and January 2020 for public employees, capped hospital payments under the state employee plans at 200% of Medicare in network and 185% out of network. The legislature exempted small, rural, critical access and certain sole-community hospitals in counties under 70,000 people that drew at least 40% of revenue from Medicare. Only 24 of Oregon's 62 hospitals were subject to the cap.\n\nThe cap saved the state $107.5 million in its first 27 months. All of the hospitals subject to it remained in network, and researchers found no evidence that they raised prices for other commercial payers to compensate. Subsequent work published in *Health Affairs* found hospital revenues, expenses, margins, operations and patient experience essentially stable afterward. The design point is that a rule covering 39% of a state's hospitals with a clear exemption test behaves like a mandate for those hospitals. Carve-outs narrow a mandate's scope; they do not convert it into a voluntary program, as long as the covered class cannot elect out.",
            },
            {
                "type": "text",
                "heading": "Montana: the same policy without a statute",
                "body": "Montana shows what happens when the policy is right and the architecture is administrative. In July 2016 the state employee health plan, covering roughly 31,000 members, renegotiated contracts with all eleven of Montana's acute care hospitals using Medicare reference-based pricing. An independent analysis published through the National Academy for State Health Policy found the plan saved $47.8 million in the two years after implementation.\n\nBy October 2022 the state was publicly signaling a step back from the model, amid a change of third-party administrator and a new contract projecting a smaller $28 million in savings over three years with fewer specifics on how. Nothing about the underlying economics had changed. What the arrangement lacked was statutory grounding: it existed as a set of contracts a subsequent administration could renegotiate. Vermont's choice to legislate rather than demonstrate is a direct response to exactly this fragility.",
            },
            {
                "type": "text",
                "heading": "What Act 68 does differently",
                "body": "Act 68 places the obligation on the rule rather than on the contract. GMCB sets maximum allowable payments by rule; hospitals may not bill patients or insurers above them; global budgets follow on a statutory schedule. A hospital that objects does not exercise an opt-out, because there is none. It litigates, or it seeks an amendment in a legislative session — both of which happen in public, on the record, against an administrative record built over the Act 167 process.\n\nThat is the honest description of what a mandate buys. It does not eliminate opposition. It relocates opposition from a private renewal decision, where a single payer can remove a third of a model's population without a hearing, to a public forum where the burden falls on the party seeking the exception. For a Policy pillar whose diagnostic question is \"is it permissible?\", that relocation is the whole point.",
            },
            {
                "type": "callout",
                "variant": "info",
                "heading": "The counter-argument, taken seriously",
                "body": "Mandates carry their own failure modes and it is not honest to teach only one side. They invite litigation. They generate carve-out pressure that can, session by session, hollow out the covered class. They require an administrator with the resources to defend its own orders. And a mandate written against a wrong diagnosis is harder to correct than a voluntary program nobody joined. The claim is not that mandatory architecture is always right — it is that a voluntary architecture cannot hold a population-level financial commitment, because the participants who most affect the result are the ones most able to leave.",
            },
        ],
        "quiz": {
            "id": "quiz_5p_voluntary_vs_mandatory",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p7a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "What happened to OneCare Vermont's attributed population on January 1, 2023?",
                    "explanation": "Blue Cross Blue Shield of Vermont, the state's largest insurer, declined to renew its OneCare contract, removing roughly 93,000 enrollees — about a third of the total attributed population — in a single step. Vermont had no authority to compel the payer to remain.",
                    "options": [
                        {"id": "o_5p7a1", "text": "Blue Cross Blue Shield of Vermont declined to renew, removing roughly 93,000 enrollees at once", "isCorrect": True},
                        {"id": "o_5p7a2", "text": "CMS terminated Medicare attribution to the ACO", "isCorrect": False, "explanation": "Medicare attribution continued under the All-Payer ACO Model until its scheduled end. The 2023 departure was a commercial payer's contract decision."},
                        {"id": "o_5p7a3", "text": "Four hospitals withdrew simultaneously after the Act 167 report", "isCorrect": False, "explanation": "The Act 167 report was published in September 2024, after this event, and hospital participation was not the January 2023 issue."},
                        {"id": "o_5p7a4", "text": "The Green Mountain Care Board revoked OneCare's certification", "isCorrect": False, "explanation": "GMCB regulated and approved OneCare's budgets; it did not revoke certification. OneCare later announced a voluntary wind-down in November 2024."},
                    ],
                },
                {
                    "id": "q_5p7b",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Why does CMS's 2016 random assignment of 67 of 196 metropolitan areas to mandatory CJR bundles matter more than the size of the savings it produced?",
                    "explanation": "Random assignment removes participation selection. Savings reported by voluntary programs confound the program's effect with the fact that participants chose to join expecting to succeed. CJR's $812 per episode (3.1%) is smaller than voluntary-program figures precisely because it measures the program rather than the participants.",
                    "options": [
                        {"id": "o_5p7b1", "text": "Random assignment removes participation selection, so the measured effect is attributable to the design rather than to who chose to join", "isCorrect": True},
                        {"id": "o_5p7b2", "text": "It produced a larger savings estimate than any voluntary bundled payment program", "isCorrect": False, "explanation": "The opposite. CJR's 3.1% reduction was more modest than figures reported by voluntary programs, and that gap is itself the evidence of selection effects."},
                        {"id": "o_5p7b3", "text": "It was the first CMMI model to include downside risk", "isCorrect": False, "explanation": "Two-sided risk existed in earlier models. CJR's distinguishing feature was mandatory participation in randomly assigned geographies."},
                        {"id": "o_5p7b4", "text": "It applied to all Medicare service lines rather than one procedure type", "isCorrect": False, "explanation": "CJR covered lower-extremity joint replacement episodes specifically. Its narrow clinical scope is what made randomization across markets feasible."},
                    ],
                },
                {
                    "id": "q_5p7c",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Maryland hospitals' participation in global budget contracts under the 2014 All-Payer Model was technically elective, yet every hospital participated. What explains this?",
                    "explanation": "Mandatory all-payer rate regulation sat underneath. HSCRC has set hospital rates since 1974, binding on Medicare and Medicaid through a 1977 federal waiver. Opting out of the global budget contract would have meant operating outside the rate system governing all of a hospital's payers, so the election was a formality.",
                    "options": [
                        {"id": "o_5p7c1", "text": "Mandatory all-payer rate regulation underneath made the higher-level election a formality", "isCorrect": True},
                        {"id": "o_5p7c2", "text": "CMS conditioned all Medicare payment to Maryland hospitals on joining the 2014 model", "isCorrect": False, "explanation": "Medicare's participation ran through Maryland's long-standing waiver of federal payment rules, which predates the 2014 model by nearly four decades."},
                        {"id": "o_5p7c3", "text": "Maryland offered participation bonuses large enough to make opting out irrational", "isCorrect": False, "explanation": "The binding force was the rate-setting system, not an incentive payment. Maryland's model is the standard example of regulation rather than inducement."},
                        {"id": "o_5p7c4", "text": "Hospital participation was in fact legally mandatory under the 2014 agreement", "isCorrect": False, "explanation": "The global budget contracts themselves were elective. The point of the example is that a mandate one level down can make an elective choice one level up meaningless."},
                    ],
                },
                {
                    "id": "q_5p7d",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A state caps hospital payments for its public employee plan at 200% of Medicare, exempting small rural and sole-community hospitals so that only 24 of 62 hospitals are covered. Is this a voluntary program?",
                    "explanation": "No. Oregon's SB 1067 works exactly this way. Carve-outs narrow the covered class; they do not make participation elective for hospitals inside it. All 24 covered hospitals remained in network, the state saved $107.5 million in 27 months, and there was no evidence of price-shifting to other commercial payers.",
                    "options": [
                        {"id": "o_5p7d1", "text": "No — a defined carve-out narrows the scope of a mandate, but hospitals inside the covered class still cannot elect out", "isCorrect": True},
                        {"id": "o_5p7d2", "text": "Yes — covering fewer than half the state's hospitals makes participation effectively optional", "isCorrect": False, "explanation": "Scope and electiveness are different properties. The 24 covered Oregon hospitals had no opt-out, which is why all of them remained in network under the cap."},
                        {"id": "o_5p7d3", "text": "Yes — because hospitals could leave the network instead of accepting the capped rate", "isCorrect": False, "explanation": "That was the predicted response, and it did not occur. Every hospital subject to Oregon's cap stayed in network."},
                        {"id": "o_5p7d4", "text": "Only if the exemption criteria are written into statute rather than regulation", "isCorrect": False, "explanation": "Oregon's exemptions were statutory, but the instrument carrying the carve-out is not what determines whether covered entities can opt out."},
                    ],
                },
                {
                    "id": "q_5p7e",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Montana's state employee plan saved $47.8 million in two years using Medicare reference-based pricing, then began stepping back from the model by 2022. Which pillar-level weakness does this illustrate?",
                    "explanation": "A Policy-pillar weakness: the arrangement rested on contracts a later administration could renegotiate rather than on statute. The economics were sound; the architecture was not durable. Vermont's decision to legislate reference-based pricing in Act 68 rather than demonstrate it through contracts is a direct response.",
                    "options": [
                        {"id": "o_5p7e1", "text": "Policy — a sound design carried by contract rather than statute is only as durable as the next administration", "isCorrect": True},
                        {"id": "o_5p7e2", "text": "Economics — the savings estimate was not real", "isCorrect": False, "explanation": "The $47.8 million figure came from an independent analysis published through NASHP. The problem was durability, not measurement."},
                        {"id": "o_5p7e3", "text": "Clinical — hospitals could not sustain quality at the capped rates", "isCorrect": False, "explanation": "No quality deterioration was the documented reason for the retreat; the shift accompanied an administrator change and a renegotiated contract."},
                        {"id": "o_5p7e4", "text": "Technology — the plan lacked the analytics to price episodes correctly", "isCorrect": False, "explanation": "Reference-based pricing benchmarks to published Medicare rates and requires comparatively little analytic infrastructure. Analytics were not the binding constraint here."},
                    ],
                },
            ],
        },
    },
    # ------------------------------------------------------------------
    # Lesson 8 — CMMI Models, Waivers, and the Federal–State Interface
    # ------------------------------------------------------------------
    {
        "id": "lesson_5p_cmmi_waivers_federal_interface",
        "trackId": "track_5p_policy",
        "pillar": "policy",
        "order": 8,
        "slug": "cmmi-waivers-federal-state-interface",
        "title": "CMMI Models, Waivers, and the Federal–State Interface",
        "summary": "Section 1115 waivers and CMMI models are negotiated instruments, not applications, and both are bounded by what a state can legally compel. This lesson covers budget neutrality, the ERISA ceiling established by Gobeille v. Liberty Mutual, and Vermont's January 2025 AHEAD agreement and July 2026 withdrawal as a worked case of federal model risk.",
        "estimatedMinutes": 25,
        "isPublished": True,
        "tags": ["policy-pillar", "1115-waiver", "erisa", "ahead-model", "budget-neutrality"],
        "relatedLessonIds": [],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p8a", "text": "Describe what Section 1115 authority permits, how a waiver is negotiated, and why budget neutrality is the binding constraint"},
            {"id": "obj_5p8b", "text": "Explain the ERISA limit on state authority established by Gobeille v. Liberty Mutual (2016) and the narrower reading Rutledge v. PCMA (2020) left in place"},
            {"id": "obj_5p8c", "text": "Identify the four design features that separate CMMI models that produce results from those that do not"},
            {"id": "obj_5p8d", "text": "Use Vermont's AHEAD signature and withdrawal to assess federal model risk in a state transformation strategy"},
        ],
        "contentBlocks": [
            {
                "type": "text",
                "heading": "Two sovereigns, one delivery system",
                "body": "A state statute and the federal policy environment are different things, and the gap between them is where most reform agendas lose momentum. Vermont can direct the Green Mountain Care Board to set maximum hospital payments by rule. It cannot direct Medicare to pay them, it cannot compel a self-insured employer plan to report claims into its database, and it cannot spend federal Medicaid dollars on a benefit the state plan does not authorize.\n\nThree federal-facing instruments bridge that gap: Section 1115 Medicaid demonstration waivers, CMMI model agreements, and federal rulemaking a state can influence but not control. Each amplifies state authority in a specific direction and each carries conditions.\n\nThe practical skill is knowing, for any given reform objective, which of three categories it falls into: things the state can do on its own authority, things it can do only with federal agreement, and things it cannot do at all because a higher law forecloses them. Misclassifying an objective is expensive. Vermont has done all three, and this lesson works through each.",
            },
            {
                "type": "text",
                "heading": "Section 1115 — what the authority actually is",
                "body": "Section 1115 of the Social Security Act gives the Secretary of Health and Human Services authority to waive certain Medicaid requirements and to provide federal matching funds for experimental, pilot or demonstration projects that promote the objectives of the program. It is the most powerful federal tool a state has for Medicaid reform, because it lets a state build a program that standard federal rules would not permit.\n\nIn practice states use 1115 authority for four families of things. Coverage expansions beyond standard eligibility categories and benefit structures. Delivery system and payment reform — global budgets, ACO arrangements and alternative payment models that standard fee-for-service or managed care rules do not accommodate. Health-related social needs services, which CMS has permitted since 2021 for enrollees at risk of institutionalization or with complex social needs, including housing supports, food assistance and transportation. And, since H.R. 1 of 2025 resolved the prior legal uncertainty in favor of state authority, work and community engagement requirements for expansion adults.\n\nVermont's primary vehicle is the Global Commitment to Health demonstration, originally approved in 2005 and renewed and amended repeatedly since. It is the authority under which Vermont operates Medicaid hospital global budgets and extends benefits beyond standard state plan requirements. A state without an established 1115 demonstration is starting the Policy pillar's federal work from zero.",
            },
            {
                "type": "text",
                "heading": "Waivers are negotiated, not adjudicated",
                "body": "The most common misconception about 1115 waivers is that they are applications CMS approves or denies against a checklist. They are not. They are the product of sustained negotiation in which the state advocates for the design it wants and CMS negotiates conditions, monitoring requirements, evaluation obligations and financial protections.\n\nThis has a direct implication for how a state staffs the work. States that engage CMS early, as partners designing a demonstration, obtain better terms than states that submit a completed application and wait. The negotiating position is built from evidence — a state that can show what its own population costs, and what the demonstration would change, argues from data. A state that cannot, argues from assertion.",
            },
            {
                "type": "text",
                "heading": "Budget neutrality — the binding constraint",
                "body": "Every 1115 waiver carries a budget neutrality requirement: the federal government will not spend more under the demonstration than it would have spent without it. The comparison is against a negotiated \"without-waiver\" baseline, and it must hold over the demonstration period.\n\nThe baseline is a counterfactual, which means it is inherently uncertain and therefore inherently contestable. What would Medicaid spending have been if the state had done nothing? Trend assumptions, population projections and per-capita growth caps are all negotiable, and small differences in those assumptions compound into large differences in what the state can afford to do. This is why budget neutrality methodology, not the policy content of the demonstration, is frequently the hardest part of a waiver negotiation.\n\nThe sequencing implication is the one that matters for the five-pillar framework. A state that cannot produce a credible total-cost-of-care baseline will negotiate from a weaker position — not a different negotiation, a worse one. Building the claims and analytics infrastructure to support that argument is a Technology pillar investment that pays off in the Policy pillar, and it is one more reason Technology precedes Economics in the execution sequence.",
            },
            {
                "type": "callout",
                "variant": "info",
                "heading": "What to build before you negotiate",
                "body": "An all-payer claims database, a total-cost-of-care measurement capability, and a documented risk-adjustment methodology. Vermont entered its federal negotiations with VHCURES. A state arriving without equivalents will accept CMS's baseline assumptions because it has no basis on which to propose different ones — and those assumptions will govern the demonstration's finances for years.",
            },
            {
                "type": "comparison_table",
                "heading": "What a state can compel, and what it cannot",
                "rows": [
                    {"label": "Hospital rates in the commercial market", "left": "State authority, where the legislature grants it", "right": "Vermont's Act 68 directs GMCB to set maximum allowable payments by rule; Maryland's HSCRC has set rates since 1974"},
                    {"label": "Fully insured commercial plans", "left": "State insurance regulation reaches them", "right": "Rate review, benefit mandates and reporting requirements apply"},
                    {"label": "Self-insured employer (ERISA) plans", "left": "Largely beyond state reach", "right": "Gobeille v. Liberty Mutual (2016) held ERISA preempts state claims-reporting mandates as applied to self-funded plans"},
                    {"label": "Medicaid", "left": "State-administered within federal rules; expandable by waiver", "right": "Section 1115 demonstration authority, subject to budget neutrality"},
                    {"label": "Medicare fee-for-service", "left": "No state authority", "right": "Reachable only through a CMMI model agreement or a federal waiver, on CMS's terms and CMS's timeline"},
                ],
            },
            {
                "type": "text",
                "heading": "The ERISA ceiling — Gobeille v. Liberty Mutual (2016)",
                "body": "On February 29, 2016, the Supreme Court decided *Gobeille v. Liberty Mutual Insurance Co.* by a vote of 6–2, in an opinion by Justice Kennedy. The Court held that ERISA preempts Vermont's law requiring health plans — including self-insured employer plans — to report claims data into the state's all-payer claims database. Reporting and disclosure are core ERISA functions, and a patchwork of differing state requirements would impose exactly the burden ERISA's preemption clause was written to prevent.\n\nThe practical consequence is structural and permanent, absent congressional action. Under KFF's 2025 Employer Health Benefits Survey, 67% of covered workers are in self-funded plans — 80% at large firms. A state operating an all-payer claims database cannot compel the claims of a majority of commercially covered workers into it. Gobeille does not prohibit voluntary contribution, and many plans do contribute; but voluntary is the operative word, and it returns the state to the participation-selection problem from the previous lesson.\n\nThis is why Oliver Wyman's perception-versus-reality analysis had to correct the belief that Vermont has an all-payer model. It does not, and no state statute can create one, because the gap was created by a federal decision about federal law. Understanding this is what separates a reform design that can actually be executed from one that assumes authority the state does not have.",
            },
            {
                "type": "key_stat",
                "stats": [
                    {"value": "6–2", "label": "Gobeille v. Liberty Mutual (February 29, 2016) — ERISA preempts state claims-reporting mandates as applied to self-insured plans", "source": "U.S. Supreme Court, 577 U.S. 312 (2016)"},
                    {"value": "67%", "label": "Share of covered U.S. workers in self-funded health plans — 80% at large firms — largely beyond state reporting authority", "source": "KFF Employer Health Benefits Survey, 2025"},
                    {"value": "$138M → $10M", "label": "Additional federal funds Vermont projected from AHEAD, versus the cap after CMS renegotiated the terms", "source": "Vermont Public and VTDigger reporting, July 2026, citing information provided to state lawmakers"},
                    {"value": "18,000", "label": "Arkansas adults who lost Medicaid coverage under the state's 1115 work-requirement demonstration before a federal court halted it", "source": "Sommers et al., New England Journal of Medicine, 2019; KFF"},
                ],
            },
            {
                "type": "text",
                "heading": "Rutledge v. PCMA — where the ceiling stops",
                "body": "ERISA preemption is a ceiling on state authority, not a prohibition on state health policy, and the Court drew that line four years later. In *Rutledge v. Pharmaceutical Care Management Association*, decided December 10, 2020 by a vote of 8–0 in an opinion by Justice Sotomayor, the Court upheld Arkansas Act 900, which regulates the prices pharmacy benefit managers pay pharmacies for drugs covered by prescription-drug plans.\n\nThe reasoning is the part practitioners should carry forward. Act 900 was \"simple rate regulation\" with neither an impermissible connection to nor reference to ERISA, and ERISA does not preempt state rate regulations that merely increase costs or alter incentives for ERISA plans without forcing them to adopt a particular scheme of substantive coverage. That distinction — regulating the price of an input versus dictating plan administration or benefit design — is the doctrinal space in which state cost-control policy still operates. It is the space Act 68's reference-based pricing rule is designed to occupy.",
            },
            {
                "type": "text",
                "heading": "CMMI models — what separates the ones that work",
                "body": "The Center for Medicare and Medicaid Innovation has launched dozens of models since its creation under the ACA. Most did not produce statistically significant reductions in Medicare spending and most were discontinued. The ones that performed better share four design features, and the list is worth memorizing because it doubles as a checklist for evaluating any model a state is considering joining.\n\nFirst, mandatory or near-mandatory participation, so the financial logic reaches the full population rather than a self-selected subset — the CJR randomization and Maryland's rate-setting foundation are the clearest illustrations. Second, two-sided risk that is real, meaning downside exposure large enough to change organizational decisions; one-sided shared savings with minimal upside changes very little at scale. Third, adequate implementation support — technical assistance, analytics and enough runway to redesign care before being held accountable for outcomes the organization cannot yet control. Fourth, alignment with the state regulatory environment, because a federal model that duplicates or conflicts with state rate review and budget processes produces compliance work without producing change.\n\nNote what is absent from that list: the elegance of the payment formula. Model design fails on participation architecture and implementation capacity far more often than on the arithmetic of the benchmark.",
            },
            {
                "type": "text",
                "heading": "AHEAD — federal model risk, realized",
                "body": "Vermont signed a State Agreement to participate in the CMS AHEAD Model in January 2025; the Green Mountain Care Board joined the Governor and the Agency of Human Services in signing on January 21, 2025. AHEAD is a state-based total cost of care model built around hospital global budgets for Medicare fee-for-service and enhanced primary care payments, with a performance period running into the 2030s. Vermont entered as a Cohort 2 state, with performance scheduled to begin in 2028. The model was intended to continue funding for primary care, the Blueprint for Health and the Support and Services at Home program as OneCare wound down.\n\nState officials had calculated, in information provided to lawmakers, that participation could bring roughly $138 million in additional federal funds to Vermont health care. CMS subsequently renegotiated the model's terms, and the renegotiation capped additional payments at approximately $10 million. AHS Secretary Jenney Samuelson described the effect plainly: the overhaul meant greater complexity in Vermont's payment models and less money coming into Vermont.\n\nVermont notified CMS of its withdrawal on July 24, 2026, and announced it publicly the following week — before its performance period had ever begun. The state redirected its attention to the Rural Health Transformation Program, which is providing $195 million a year for five years. Vermont's Health Care Advocate, Mike Fisher, criticized the years spent pursuing the model.\n\nThe structural lesson is the one the book draws. Act 68 is unaffected. Vermont's reference-based pricing mandate, its global budget schedule and its December 2028 Strategic Plan deadline all rest on state statutory authority that never depended on AHEAD continuing. A state whose transformation strategy is a federal model has no strategy when the model's terms change. A state that uses a federal model to accelerate and fund a strategy it has independent authority to execute loses money when the model changes, and keeps the strategy.",
            },
            {
                "type": "callout",
                "variant": "warning",
                "heading": "Design for withdrawal before you sign",
                "body": "Vermont's AHEAD State Agreement was negotiated with explicit unilateral withdrawal rights — before launch on 30 days' notice, after launch on six months' notice — along with protections for GMCB's regulatory independence and provisions on methodology acceptance and dispute resolution. Those clauses looked like lawyerly caution in January 2025. In July 2026 they were the reason Vermont could exit cleanly when the federal economics collapsed. Multi-year federal commitments span administrations; negotiate the exit at the same time you negotiate the entry.",
            },
            {
                "type": "text",
                "heading": "Arkansas — a waiver that produced exactly what its design implied",
                "body": "Federal model risk runs in both directions: a state can be harmed by a federal change, and a state can use federal authority to do something whose consequences were foreseeable. In June 2018 Arkansas became the first state to implement Medicaid work requirements, under an 1115 demonstration, requiring adults aged 30 to 49 to work or engage in qualifying activities for twenty hours a week or document an exemption.\n\nBy the time a federal court halted the policy in spring 2019, roughly 18,000 adults had lost coverage. Sommers and colleagues, publishing in the *New England Journal of Medicine* in 2019, found the policy had not increased employment among the affected group but had raised the uninsured rate among adults aged 30 to 49. The coverage losses were concentrated among people who were working or exempt but failed to complete the monthly online reporting — an administrative failure, not an eligibility one.\n\nH.R. 1 of 2025 changed the legal posture by authorizing work and community engagement requirements of 80 hours a month for Medicaid expansion enrollees, with states required to implement by the end of 2026. It did not change the operational evidence. A reporting requirement that a large share of eligible enrollees cannot complete produces coverage loss among eligible people, regardless of whether a court has blessed the authority to impose it. That is an Operations pillar failure embedded in a Policy pillar instrument — and it is the kind of interaction the five-pillar sequence exists to surface before implementation, not after.",
            },
            {
                "type": "text",
                "heading": "The practitioner framework",
                "body": "Policy strategy for a health system or a state agency is not primarily advocacy. It is anticipation: knowing what the policy environment will require of the organization 18 to 36 months out, positioning to comply at manageable cost, and identifying which federal programs can fund work the organization intended to do anyway.\n\nThe minimum monitoring infrastructure has four components. Federal rulemaking surveillance through the Federal Register, where proposed rules give 60 to 90 days of advance notice and final rules typically take effect 60 days after publication. State legislative monitoring, because in a state like Vermont each annual session produces material new requirements. CMMI model pipeline monitoring, because application windows are narrow and organizations not watching for them miss participation on favorable terms. And regulatory intelligence on the state board — GMCB's budget guidance, reference-based pricing methodology updates and program decisions directly determine every Vermont hospital's financial plan.\n\nWhen something surfaces, the assessment is structured: exposure mapping (what does this specifically require of us, with what financial and operational implications, by when), scenario analysis (under what range of outcomes does our position change), response strategy (compliance roadmap, comment letter, model application, advocacy) and stakeholder communication (who needs to decide what, and when). The discipline is unglamorous. Organizations that skip it are consistently surprised by outputs that were publicly visible for a year.",
            },
            {
                "type": "callout",
                "variant": "tip",
                "heading": "Three questions before committing to any federal model",
                "body": "First: if this model disappears in three years, what survives? If the answer is nothing, the model is the strategy, and that is a strategic failure regardless of the model's merits. Second: what does the agreement say about unilateral withdrawal, methodology disputes and the state regulator's independence? Third: which pillar does this model actually strengthen? A model that funds primary care payments does not, by itself, build the analytics capability the Technology pillar requires, and a model that pays for analytics does not redesign care. Name the pillar, then check whether you already have the prerequisites that pillar depends on.",
            },
        ],
        "quiz": {
            "id": "quiz_5p_cmmi_waivers_federal_interface",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {
                    "id": "q_5p8a",
                    "type": "single_choice",
                    "points": 1,
                    "question": "What did the Supreme Court hold in Gobeille v. Liberty Mutual Insurance Co. (2016)?",
                    "explanation": "By 6–2, in an opinion by Justice Kennedy on February 29, 2016, the Court held that ERISA preempts Vermont's law requiring health plans, including self-insured employer plans, to report claims data into the state's all-payer claims database. Reporting and disclosure are core ERISA functions.",
                    "options": [
                        {"id": "o_5p8a1", "text": "ERISA preempts Vermont's claims-reporting mandate as applied to self-insured employer plans", "isCorrect": True},
                        {"id": "o_5p8a2", "text": "States may not regulate hospital prices for commercially insured patients", "isCorrect": False, "explanation": "Gobeille concerned data reporting, not price regulation. State authority over hospital rates — Maryland's HSCRC, Vermont's Act 68 — is unaffected by it."},
                        {"id": "o_5p8a3", "text": "Self-insured plans must contribute claims data to any state database that requests it", "isCorrect": False, "explanation": "The holding is the reverse. Self-insured plans may contribute voluntarily, but a state cannot compel them."},
                        {"id": "o_5p8a4", "text": "Section 1115 waivers may not be used to fund health-related social needs services", "isCorrect": False, "explanation": "That is unrelated to Gobeille. CMS has permitted health-related social needs services under 1115 authority since 2021."},
                    ],
                },
                {
                    "id": "q_5p8b",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Why is the \"without-waiver baseline\" the hardest part of most 1115 waiver negotiations?",
                    "explanation": "Budget neutrality requires that federal spending under the demonstration not exceed what it would have been without it — a counterfactual. Trend assumptions, population projections and per-capita growth caps are all negotiable, and small differences compound into large financial consequences for the state over the demonstration period.",
                    "options": [
                        {"id": "o_5p8b1", "text": "It is a counterfactual projection, so the assumptions behind it are contestable and small differences compound into large financial consequences", "isCorrect": True},
                        {"id": "o_5p8b2", "text": "Federal law requires it to be recalculated monthly throughout the demonstration", "isCorrect": False, "explanation": "Budget neutrality is assessed over the demonstration period against a negotiated baseline, not recomputed monthly."},
                        {"id": "o_5p8b3", "text": "CMS publishes a fixed national baseline that states may not dispute", "isCorrect": False, "explanation": "There is no fixed national baseline. Baseline methodology is negotiated state by state, which is precisely why evidentiary capacity matters."},
                        {"id": "o_5p8b4", "text": "It applies only to states that have expanded Medicaid", "isCorrect": False, "explanation": "Budget neutrality applies to every 1115 demonstration regardless of a state's expansion status."},
                    ],
                },
                {
                    "id": "q_5p8c",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Vermont signed the AHEAD State Agreement in January 2025 and withdrew in July 2026. What triggered the withdrawal?",
                    "explanation": "CMS renegotiated the model's terms. Vermont had projected roughly $138 million in additional federal funds; the renegotiation capped additional payments at approximately $10 million. The state withdrew before its 2028 performance period began and redirected to the Rural Health Transformation Program's $195 million per year.",
                    "options": [
                        {"id": "o_5p8c1", "text": "A CMS renegotiation cut Vermont's expected additional federal funding from roughly $138 million to a cap near $10 million", "isCorrect": True},
                        {"id": "o_5p8c2", "text": "The Vermont legislature repealed Act 68, removing the state authority AHEAD required", "isCorrect": False, "explanation": "Act 68 remains in force. Its reference-based pricing mandate, global budget schedule and December 2028 Strategic Plan deadline were unaffected by the withdrawal — which is the point of the example."},
                        {"id": "o_5p8c3", "text": "Vermont's hospitals failed their first AHEAD performance year", "isCorrect": False, "explanation": "Vermont's performance period, as a Cohort 2 state, was scheduled to begin in 2028. It never started."},
                        {"id": "o_5p8c4", "text": "A federal court enjoined the AHEAD Model nationally", "isCorrect": False, "explanation": "No injunction was involved. Other participating states continued in the model; Vermont's exit was its own decision under negotiated withdrawal rights."},
                    ],
                },
                {
                    "id": "q_5p8d",
                    "type": "single_choice",
                    "points": 1,
                    "question": "A state builds its entire transformation strategy around a CMMI model agreement, with no independent statutory authority for the payment changes it plans. CMS then alters the model's terms. Which pillar failed, and how?",
                    "explanation": "Policy failed at the architecture level. The state never established domestic authority answering \"is it permissible?\" on its own terms, so every downstream pillar's work was contingent on a federal agreement the state did not control. Vermont's contrasting position is that Act 68 stands whether or not AHEAD does.",
                    "options": [
                        {"id": "o_5p8d1", "text": "Policy — the state had no independent authority, so a change in federal terms removed the basis for all downstream work", "isCorrect": True},
                        {"id": "o_5p8d2", "text": "Economics — the financial model was miscalculated", "isCorrect": False, "explanation": "The arithmetic may have been correct at signature. The failure is that the authority to act was borrowed rather than owned."},
                        {"id": "o_5p8d3", "text": "Operations — the state could not execute the model's requirements", "isCorrect": False, "explanation": "Execution capability is not the issue when the mandate itself disappears. Operations is Stage 5 and depends on a mandate existing to execute."},
                        {"id": "o_5p8d4", "text": "Technology — the state lacked the analytics to meet federal reporting requirements", "isCorrect": False, "explanation": "Analytics gaps are a real risk in model participation, but they are not what a unilateral change in federal terms exposes."},
                    ],
                },
                {
                    "id": "q_5p8e",
                    "type": "single_choice",
                    "points": 1,
                    "question": "Arkansas implemented Medicaid work requirements under an 1115 demonstration in June 2018. What did the evidence show before a federal court halted the policy?",
                    "explanation": "Roughly 18,000 adults lost coverage. Sommers et al., NEJM 2019, found no increase in employment among the affected group and a higher uninsured rate among adults aged 30 to 49, with losses concentrated among people who were working or exempt but did not complete the monthly online reporting.",
                    "options": [
                        {"id": "o_5p8e1", "text": "About 18,000 adults lost coverage with no measured increase in employment — largely through failure to complete monthly reporting, not through ineligibility", "isCorrect": True},
                        {"id": "o_5p8e2", "text": "Employment rose sharply among affected enrollees while coverage held steady", "isCorrect": False, "explanation": "The NEJM study found no employment increase attributable to the policy, and the uninsured rate among adults aged 30 to 49 rose."},
                        {"id": "o_5p8e3", "text": "Coverage losses occurred but were confined to enrollees who were genuinely ineligible", "isCorrect": False, "explanation": "The documented pattern is the opposite: losses were concentrated among people who were working or exempt but failed the administrative reporting step."},
                        {"id": "o_5p8e4", "text": "The demonstration was never implemented because CMS withdrew approval before launch", "isCorrect": False, "explanation": "It was implemented in June 2018 and operated until a federal court halted it in spring 2019. The 18,000 coverage losses occurred in that window."},
                    ],
                },
            ],
        },
    },
]
