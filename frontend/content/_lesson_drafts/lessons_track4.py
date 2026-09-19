"""
Five Pillars, One Imperative -- Track 4: Economics -- Put Incentives on a
Visible System.

Source chapters: HTR_Book_v42.md Chapter 6 (The Economics Pillar -- Global
Budgets, Reference-Based Pricing, and Financial Reform) and Chapter 7 (The
Economics Pillar in Practice -- VBC Financial Modeling and APM Readiness).
"""

LESSONS = [
    {
        "id": "lesson_5p_global_budgets_rbp",
        "trackId": "track_5p_economics",
        "pillar": "economics",
        "order": 12,
        "slug": "global-budgets-reference-based-pricing",
        "title": "Global Budgets and Reference-Based Pricing",
        "summary": "Reference-based pricing caps what a hospital may charge; a global budget caps what a hospital may collect in total, regardless of volume. Together they are the two mechanisms Vermont uses to break the fee-for-service incentive, and Maryland's decade of results shows what each does and does not achieve on its own.",
        "estimatedMinutes": 30,
        "isPublished": True,
        "tags": ["reference-based-pricing", "global-budgets", "vermont-act-68", "maryland-all-payer-model", "hospital-revenue"],
        "relatedLessonIds": ["lesson_5p_apm_readiness", "lesson_5p_design_vs_management"],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p12a", "text": "Explain the mechanical difference between fee-for-service and a global budget, and why the change flips a hospital's incentive to prevent an admission."},
            {"id": "obj_5p12b", "text": "Describe how reference-based pricing sets a binding price ceiling and why Vermont set that ceiling at roughly 200% of Medicare."},
            {"id": "obj_5p12c", "text": "Use Maryland's decade of all-payer global budget results to evaluate what mandatory global budgets can and cannot achieve on their own."},
            {"id": "obj_5p12d", "text": "Identify why Vermont's three prior voluntary payment-reform attempts failed and what Act 68 changed structurally."},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "Fee-for-Service Pays for the Wrong Thing", "body":
                "Fee-for-service payment is the foundational economic structure of American healthcare: providers are paid for each service delivered, at rates set by negotiated contracts or government schedules. The logic is simple and, transaction by transaction, entirely rational: more services delivered means more revenue.\n\n"
                "That rationality at the individual transaction level produces irrational outcomes at the system level. Under fee-for-service, a hospital that prevents a hospitalization loses revenue. A hospital that prevents a readmission loses revenue. A hospital that manages a chronic condition well enough that a patient never reaches the emergency department loses revenue. This is not a criticism of individual clinicians or managers, who are generally motivated by genuine commitment to patient care -- it is an observation about the incentive built into the payment architecture itself. When the financial incentive and the clinical incentive point in opposite directions, the financial incentive wins systematically, at scale, even if not in every individual case.\n\n"
                "This is also why fifteen years of voluntary value-based care programs have moved the needle on payment reform without fundamentally changing hospital behavior: as long as the underlying chassis is still fee-for-service, volume remains the path of least resistance to revenue."
            },
            {"type": "text", "heading": "Vermont's Price Extraction Problem, in Numbers", "body":
                "Fee-for-service creates a second structural problem distinct from the volume incentive: in concentrated hospital markets -- which describes the majority of U.S. hospital markets, and all of Vermont's -- it lets hospitals with market power charge commercial payers far above their actual cost of care. Vermont's data, documented in the Green Mountain Care Board's February 2026 report, is among the most extreme in the country: UVMMC's commercial prices run 358% of Medicare (RAND, 2018-2020 data), the average Vermont hospital charges commercial payers 250-300% of Medicare, and the approximate break-even point is roughly 136% of Medicare.\n\n"
                "The consequence for insurance premiums is direct and arithmetically straightforward. Vermont's average monthly silver marketplace premium rose from $456 in 2018 to $948 in 2024 -- a 108% increase in six years -- tracking hospital charge growth with high fidelity (Oliver Wyman Act 167 Report; GMCB analysis). These are not coincidental trends; they are the mathematical output of a price structure with no regulatory discipline.\n\n"
                "Oliver Wyman's analysis found no relationship between price and quality across Vermont's hospital system. The gap between break-even and actual commercial charges is not explained by complexity or outcomes. It is market power -- the ability of a dominant provider to demand above-cost prices from payers with no viable network alternative."
            },
            {"type": "text", "heading": "What Reference-Based Pricing Actually Does, Mechanically", "body":
                "Reference-based pricing (RBP) addresses the price extraction problem directly. Rather than letting hospitals and payers negotiate bilaterally -- where hospital market power determines the outcome -- RBP establishes a transparent external benchmark, typically a percentage of Medicare reimbursement, as the maximum a hospital may accept as payment in full. Vermont's Act 68 directs the GMCB to implement mandatory RBP for commercial payers no later than hospital fiscal year 2027, targeting roughly 200% of Medicare -- the level Oliver Wyman's Act 167 study recommended as sufficient to move the system toward a sustainable trajectory while still covering hospitals' actual costs.\n\n"
                "Act 68's architecture rests on four design principles: mandatory, not voluntary, for every hospital and every commercial payer; a binding ceiling, not advisory guidance, meaning hospitals cannot charge or collect more than the established rate; a transparent, nationally comparable Medicare benchmark; and premium passthrough monitoring, so GMCB and Vermont's Department of Financial Regulation can verify that price reductions actually reach premiums rather than being absorbed as insurer margin.\n\n"
                "GMCB's February 2026 report added a refinement reflecting Vermont's varied 14-hospital system: rather than one statewide multiplier, GMCB will weigh each hospital's payer mix, labor costs, social risk factors, and role in the system -- a critical access hospital serving a largely Medicaid and Medicare rural population has different cost economics than a large academic medical center, even under one binding ceiling principle."
            },
            {"type": "text", "heading": "The Cross-State Evidence Behind Vermont's 200%", "body":
                "Vermont is not designing RBP in a vacuum. Oregon implemented RBP for its state employee health plans in 2019, capping in-network payments at 200% of Medicare and out-of-network at 185%, covering roughly 300,000 lives. A Health Affairs study found the program saved an estimated $107.5 million over its first 27 months -- and, critically, all 24 hospitals affected by the cap remained in-network. That finding directly answers the most common objection to RBP: that hospitals will simply walk away from a regulated rate. At 200% of Medicare, they did not, because 200% of Medicare is still substantially above their actual cost of care.\n\n"
                "Montana's 2016 state-employee-plan RBP program produced roughly $48 million in initial savings but proved politically fragile without a statutory mandate behind it -- a cautionary data point that helps explain why Vermont chose to legislate RBP rather than negotiate a smaller demonstration. Washington's 'Cascade Care' public option caps participating network payments at 160% of Medicare and is expanding toward state employee plans.\n\n"
                "None of these programs, however, is a full statewide, all-hospital, all-commercial-payer mandate. Vermont's Act 68 is: it is the most specific mandatory all-payer price target enacted by any state to date."
            },
            {"type": "text", "heading": "What RBP Fixes -- and What It Leaves Standing", "body":
                "GMCB's February 2026 report was precise about scope. RBP reduces hospital leverage to demand excessive commercial prices, narrows unjustified price variation for the same service, protects affordability with a binding ceiling, and incentivizes operational efficiency over price increases as the remaining margin lever. It also establishes the price denominator that a global budget needs to function.\n\n"
                "RBP does not control total hospital spending -- it caps price, not volume. It does not guarantee that savings reach consumers without explicit passthrough monitoring. It does not restructure incentives around prevention or population health. And it does not solve the cross-subsidy collapse driven by Vermont's aging demographics, in which a shrinking commercially insured base must bear a growing share of below-cost Medicare and Medicaid patients.\n\n"
                "This is why Act 68 sequences RBP first and global budgets second. RBP is a necessary but insufficient tool; global budgets are built to address what RBP leaves unresolved."
            },
            {"type": "text", "heading": "What a Global Budget Actually Is, Mechanically", "body":
                "A hospital global budget is a prospectively set annual revenue cap: an amount fixed before the fiscal year begins, based on population health needs and past performance, not on the volume of services a hospital happens to deliver during the year. Under a global budget, the hospital receives that fixed total regardless of how many patients it sees or procedures it performs.\n\n"
                "This is a different lever than RBP. RBP caps the price of each unit of care; a global budget caps total revenue across all units combined, for the year, in advance. A Vermont hospital operating under a global budget knows its annual revenue before the year starts -- something fee-for-service, with its dependence on volume, acuity mix, and billing accuracy, can never provide.\n\n"
                "That predictability is not a secondary benefit. For Vermont's financially distressed rural hospitals, knowing next year's revenue today is what makes multi-year capital planning and workforce investment possible at all."
            },
            {"type": "text", "heading": "The Incentive Flip: Why an Avoided Admission Becomes a Margin Gain", "body":
                "Under fee-for-service, revenue equals price times volume: the only way to grow revenue is to deliver more services or charge more per service. Under a global budget, revenue is fixed by construction. The only lever left to improve financial performance is reducing cost -- which means managing population health better, preventing hospitalizations, cutting avoidable readmissions, and delivering care in less expensive settings.\n\n"
                "This flips the admission-avoidance calculus completely. Under fee-for-service, an avoided admission is lost revenue. Under a global budget, the same avoided admission reduces the cost side of a fixed-revenue equation -- which is, arithmetically, improved margin. The clinical success and the financial success point the same direction for the first time.\n\n"
                "A Maryland state regulator, quoted in a JAMA Network Open study of the state's all-payer model, described the effect directly: the global budget \"flipped the incentives for hospitals in the right direction. It was such a monumental change, a sea change, in the way that hospitals thought about raising revenue.\" This is not a theoretical claim -- it is a documented behavioral shift, from strategies that chase volume to strategies built around population health management."
            },
            {"type": "text", "heading": "Maryland: A Decade of Global Budget Evidence", "body":
                "Maryland's Health Services Cost Review Commission (HSCRC) was established in 1972 with a unique statutory authority to set hospital rates for all commercial payers, and received a Medicare demonstration waiver in 1977 to extend that authority to Medicare as well. The current Global Budget Revenue (GBR) methodology, operating under a renegotiated federal waiver since 2014, fixes each hospital's total annual revenue before the year begins; prices for individual services then adjust during the year to hit that fixed target.\n\n"
                "Maryland is the only U.S. state to have run mandatory all-payer hospital global budgets for more than a decade, and its results are the closest empirical evidence available for what Vermont is attempting: roughly $1.4 billion in Medicare hospital savings relative to the projected national trend, a 7% reduction in hospital admissions for Medicare patients (with avoidable admissions down more than 6%), and an estimated $800 million reduction in Medicare Part A and B spending (CMS evaluation).\n\n"
                "The model's accountability structure extends beyond the budget cap itself: a Medicare Performance Adjustment worth 1% of Medicare revenue tied to total cost of care, and a Quality Based Reimbursement program worth 2% of all-payer revenue tied to patient experience, safety, and outcomes. The budget constraint is non-negotiable; the quality components are calibrated to reward the population-health behavior the fixed budget is designed to produce."
            },
            {"type": "text", "heading": "What Maryland Also Proves: A Global Budget Alone Doesn't Fix Population Health", "body":
                "The Milbank Memorial Fund's evaluation of Maryland's model is not uniformly positive, and intellectual honesty requires presenting the limits alongside the achievements: it found mixed results on quality metrics and no improvement in population-level measures like smoking rates or obesity prevalence.\n\n"
                "The reason is analytically important. A global budget creates a powerful incentive to reduce hospital utilization, but it does not automatically create the community infrastructure -- primary care capacity, behavioral health access, housing, transportation -- that addresses what drives that utilization in the first place. When Maryland's avoidable admissions fell, the reduction was concentrated among healthier patients who, with adequate primary care, would not have needed hospitalization. The sickest patients kept arriving at emergency departments, and hospitals spent more time treating them once there.\n\n"
                "Vermont built this lesson into its design from the start rather than adding it years later, as Maryland did. The AHEAD State Agreement links hospital global budgets to the Equity, Access, and Statewide Transformation (EAST) Fund, intended to provide up to $150 million annually beginning in 2027 for primary care, mental health, home health, and long-term care investment, and the Rural Health Transformation Program separately provides $195 million per year for five years in transformation capital for workforce, telehealth, and community infrastructure."
            },
            {"type": "text", "heading": "Vermont's Four Attempts, and the One Lesson", "body":
                "Vermont has tried some version of hospital global budgeting for over a decade, and the pattern across the attempts is instructive. GMCB's net patient revenue cap, in place since 2012, partially constrained individual hospital revenue growth but did not align incentives across payers or address volume gaming. A 2014 pilot proposed for Rutland Regional Medical Center -- payments based on historical revenue plus inflation, adjusted for demographics -- was never implemented; hospital opposition and implementation complexity stopped it before launch.\n\n"
                "The Vermont All-Payer ACO Model (2017-2025) went further: a voluntary arrangement aligning hospital global payments across Medicare, Medicaid, and commercial payers based on historical spend. But because participation was voluntary, the state's highest-cost commercial payers opted out, and OneCare Vermont -- the ACO administering the model -- could not compel them to join. The model produced modest results but never achieved the all-payer alignment that makes global budgets work, and it expired at the end of 2025.\n\n"
                "The lesson across all three attempts is unambiguous: a global budget that is optional for the highest-price hospital or the highest-leverage payer in a market is not a global budget -- it is a demonstration project. Act 68's statutory mandate, requiring non-CAH hospital global budgets by FY2028 and all Vermont hospitals by FY2030, removes the opt-out. That is the design difference that matters, and it is the reason Act 68 looks structurally different from everything that came before it."
            },
            {"type": "text", "heading": "The AHEAD Episode: A Model Vermont Signed, Then Left", "body":
                "In January 2025, Vermont signed the AHEAD (Achieving Healthcare Efficiency through Accountable Design) State Agreement with CMS, a federal model intended to bring Medicare fee-for-service hospitals under global budgets alongside Act 68's commercial reforms. Vermont expected roughly $138 million in additional federal funds to reinvest in primary care and community services as part of the deal.\n\n"
                "A subsequent CMS renegotiation, imposed to align Vermont's terms with those of other AHEAD states, cut that expectation to a cap of about $10 million. With most of the money that had justified joining gone, but the model's administrative complexity and downside risk unchanged, Vermont formally notified CMS of its withdrawal in July 2026.\n\n"
                "Because the performance period had not yet begun, the withdrawal changed nothing operationally for Vermont hospitals or providers: Act 68's global budget mandate rests on state statutory authority, not the federal AHEAD agreement, and Vermont's near-term transformation capital comes from the Rural Health Transformation Program, which does not depend on AHEAD either. The episode is a concrete illustration of a risk this course takes seriously -- because Vermont anchored its reform in state authority rather than a federal model, it could exit a bad federal deal without derailing the reform itself."
            },
            {"type": "text", "heading": "Before Your Next Contract Cycle", "body":
                "For a hospital executive, the practical task is to model your cost structure under a fixed-revenue scenario now, not after FY2028 arrives: what does cost per adjusted discharge look like at current volume, at 5% lower volume, at 10% lower volume? What administrative cost-reduction opportunities exist that are simply invisible under a volume-growth financial model?\n\n"
                "The transition window is short. RBP rates take effect for commercial payers in FY2027; non-CAH global budgets follow in FY2028 -- roughly two budget cycles away. Contracts negotiated today should already assume the fixed-revenue environment that is coming, not the volume-driven environment that is ending.\n\n"
                "Payment reform is the master variable the rest of this course's framework depends on financially -- but a global budget only produces the incentive flip this lesson describes if the organization can actually measure and manage a fixed budget in practice. That is the subject of the next lesson."
            },
            {"type": "key_stat", "stats": [
                {"value": "358%", "label": "UVMMC commercial hospital prices as a share of Medicare", "source": "RAND Hospital Price Transparency Study, 2018-2020 data"},
                {"value": "~136%", "label": "Approximate break-even point for Vermont hospitals", "source": "GMCB Act 68 Update, February 2026"},
                {"value": "108%", "label": "Increase in Vermont's average silver marketplace premium, 2018-2024 ($456 to $948)", "source": "Oliver Wyman Act 167 Report / GMCB analysis"},
            ]},
            {"type": "callout", "variant": "warning", "heading": "Voluntary Models Fail", "body":
                "Vermont's own All-Payer ACO Model (2017-2025) proves this concretely: OneCare Vermont could not compel the state's highest-cost commercial payers to participate, so the model never achieved the all-payer alignment that makes global budgets work, and it expired at the end of 2025. This is why Act 68 made participation mandatory rather than trying to improve the voluntary model."},
            {"type": "text", "heading": "Maryland's Global Budget Results, and Their Limits", "body":
                "Maryland's decade-plus track record gives Vermont something no other state can offer: a mandatory, all-payer, statewide global budget program old enough to show both what it achieves and where it needs help. The savings and utilization results are real and independently evaluated by CMS, HSCRC, and outside researchers.\n\n"
                "The population-health limits are equally real, and Vermont's response -- pairing the budget with the EAST Fund and Rural Health Transformation Program from day one -- is a direct answer to the specific gap Maryland's evaluators identified."
            },
            {"type": "key_stat", "stats": [
                {"value": "$1.4B", "label": "Medicare hospital savings versus the projected national trend since 2014", "source": "HSCRC / CMS evaluation"},
                {"value": "7%", "label": "Reduction in hospital admissions for Medicare patients (avoidable admissions down over 6%)", "source": "CMS / Commonwealth Fund"},
                {"value": "$800M", "label": "Reduction in Medicare Part A and B hospital spending", "source": "CMS evaluation"},
            ]},
            {"type": "callout", "variant": "info", "heading": "The Oregon Counter-Evidence", "body":
                "The most common objection to reference-based pricing is that hospitals will simply refuse the regulated rate and exit commercial networks, cutting off patient access. Oregon's experience directly refutes this at 200% of Medicare: all 24 hospitals affected by the state's 2019 employee-plan RBP program remained in-network, because 200% of Medicare is still well above their actual cost of care."},
            {"type": "callout", "variant": "tip", "heading": "A Global Budget Without Primary Care Is Half a Reform", "body":
                "Maryland's Milbank Fund evaluation found the global budget model reduced hospital utilization but did not, by itself, improve population health measures like smoking or obesity rates -- the reduction in admissions was concentrated among healthier patients. Vermont built the lesson into its design from day one: the EAST Fund and Rural Health Transformation Program pair the fixed-revenue budget with community investment, rather than adding it years later as Maryland did."},
            {"type": "comparison_table", "heading": "Reference-Based Pricing and Rate Regulation: Cross-State Comparison", "rows": [
                {"label": "Oregon (2019)", "left": "200% of Medicare in-network / 185% out-of-network; state employee plan, ~300,000 covered lives", "right": "$107.5M saved in 27 months (Health Affairs); all 24 affected hospitals stayed in-network"},
                {"label": "Montana (2016)", "left": "Direct contracting at a percentage of Medicare for the state employee plan", "right": "$48M initial savings; politically fragile without a statutory mandate behind it"},
                {"label": "Washington (2021)", "left": "'Cascade Care' public option at 160% of Medicare", "right": "Voluntary; expanding to state employee plans and growing commercial adoption"},
                {"label": "Maryland (2014-present)", "left": "All-payer rate setting; fixed annual global budget revenue; Medicare waiver", "right": "$1.4B Medicare savings; 7% fewer admissions; $800M spending reduction"},
                {"label": "Vermont Act 68 (FY2027)", "left": "Mandatory statewide RBP at roughly 200% of Medicare; commercial payers first, all hospitals", "right": "Implementation underway; a negative 1% commercial rate benchmark already in effect FY2026 as a transition step"},
            ]},
            {"type": "comparison_table", "heading": "Fee-for-Service vs. Global Budget: What Changes When Revenue Is Fixed", "rows": [
                {"label": "Revenue formula", "left": "Price x volume -- more services delivered means more revenue", "right": "A fixed annual amount set before the year begins, independent of volume"},
                {"label": "An avoided admission", "left": "Lost revenue -- the hospital is paid for services it no longer delivers", "right": "Reduced cost against a fixed revenue base -- in other words, improved margin"},
                {"label": "Planning horizon", "left": "Revenue depends on volume, acuity, and billing accuracy -- variable and partly outside the hospital's control", "right": "Annual revenue is known before the year starts, enabling capital and workforce planning"},
                {"label": "What improves financial performance", "left": "More services, higher-acuity coding, higher prices", "right": "Lower cost of care: prevention, fewer readmissions, efficient length of stay"},
            ]},
        ],
        "quiz": {
            "id": "quiz_5p_global_budgets_rbp",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {"id": "q_5p12a", "type": "single_choice", "points": 1,
                 "question": "Under Vermont Act 68, roughly what percentage of Medicare reimbursement is GMCB's reference-based pricing target for commercial hospital prices?",
                 "explanation": "Act 68 targets roughly 200% of Medicare -- the level Oliver Wyman's Act 167 study identified as high enough to cover hospitals' actual costs while eliminating the excessive markup driving premium inflation.",
                 "options": [
                     {"id": "o_5p12a1", "text": "~136%", "isCorrect": False, "explanation": "136% is Vermont's approximate break-even point, not the RBP target -- it is the floor, not the ceiling."},
                     {"id": "o_5p12a2", "text": "~200%", "isCorrect": True},
                     {"id": "o_5p12a3", "text": "~300%", "isCorrect": False, "explanation": "300% is close to the current average Vermont commercial rate -- the problem RBP is designed to fix, not the target it is designed to reach."},
                     {"id": "o_5p12a4", "text": "~358%", "isCorrect": False, "explanation": "358% is UVMMC's current commercial rate versus Medicare (RAND), the highest in Vermont -- again the problem, not the target."},
                 ]},
                {"id": "q_5p12b", "type": "single_choice", "points": 1,
                 "question": "Why does a global budget change a hospital's incentive to prevent an avoidable admission, compared with fee-for-service?",
                 "explanation": "Because global budget revenue is fixed regardless of volume, the only way to improve financial performance is to reduce cost -- so a prevented admission lowers cost without touching revenue, which is a margin gain rather than a loss.",
                 "options": [
                     {"id": "o_5p12b1", "text": "Because revenue is fixed regardless of volume, an avoided admission lowers cost without lowering revenue, improving margin", "isCorrect": True},
                     {"id": "o_5p12b2", "text": "Because global budgets pay a bonus rate for every admission that occurs", "isCorrect": False, "explanation": "Global budgets fix total revenue; they do not pay per admission at all, bonus or otherwise."},
                     {"id": "o_5p12b3", "text": "Because global budgets eliminate Medicare reimbursement to the hospital entirely", "isCorrect": False, "explanation": "Global budgets restructure how revenue is calculated; they do not eliminate payer reimbursement."},
                     {"id": "o_5p12b4", "text": "Because global budgets require hospitals to hit a minimum admission quota each year", "isCorrect": False, "explanation": "There is no admission quota under a global budget -- the incentive runs the opposite direction, toward reducing avoidable admissions."},
                 ]},
                {"id": "q_5p12c", "type": "single_choice", "points": 1,
                 "question": "Approximately how much has Maryland's all-payer global budget model saved Medicare in hospital spending relative to the projected national trend since 2014?",
                 "explanation": "HSCRC and CMS evaluations put Medicare hospital savings at approximately $1.4 billion relative to the projected national trend -- the headline result of over a decade of mandatory all-payer global budgets.",
                 "options": [
                     {"id": "o_5p12c1", "text": "$14 million", "isCorrect": False, "explanation": "This understates the documented figure by two orders of magnitude."},
                     {"id": "o_5p12c2", "text": "$140 million", "isCorrect": False, "explanation": "This understates the documented figure by a factor of ten."},
                     {"id": "o_5p12c3", "text": "$1.4 billion", "isCorrect": True},
                     {"id": "o_5p12c4", "text": "$14 billion", "isCorrect": False, "explanation": "This overstates the documented figure by a factor of ten."},
                 ]},
                {"id": "q_5p12d", "type": "single_choice", "points": 1,
                 "question": "A state designs a mandatory global budget for hospitals but exempts one hospital that objects, letting it remain on fee-for-service voluntarily. Based on Vermont's own history with the All-Payer ACO Model, what is the most likely outcome?",
                 "explanation": "Vermont's All-Payer ACO Model (2017-2025) failed for exactly this reason: OneCare Vermont could not compel the highest-cost commercial payers to participate, so the model never achieved all-payer alignment and produced only modest results before expiring.",
                 "options": [
                     {"id": "o_5p12d1", "text": "The holdout hospital, likely the one with the most market leverage, undermines the model's overall effectiveness -- as happened with Vermont's own voluntary ACO experience", "isCorrect": True},
                     {"id": "o_5p12d2", "text": "The voluntary hospital will lose all its revenue and be forced to close within a year", "isCorrect": False, "explanation": "Nothing in Vermont's or Maryland's experience supports this -- opting out of a mandate does not, by itself, collapse a hospital's revenue."},
                     {"id": "o_5p12d3", "text": "Nothing changes, because federal law prohibits any hospital from remaining on fee-for-service", "isCorrect": False, "explanation": "No federal law bars fee-for-service payment; global budgets are adopted through state statute or negotiated agreement, not a federal prohibition on FFS."},
                     {"id": "o_5p12d4", "text": "The model succeeds regardless, because Medicare independently enforces participation in state-designed global budgets", "isCorrect": False, "explanation": "Medicare participation in a state's global budget requires a separate federal agreement (as with Vermont's AHEAD Model); it is not automatic or self-enforcing."},
                 ]},
                {"id": "q_5p12e", "type": "true_false", "points": 1,
                 "question": "The Milbank Memorial Fund's evaluation found that Maryland's global budget model, on its own, improved population-level health measures like smoking rates and obesity prevalence.",
                 "explanation": "Milbank's evaluation found mixed quality results and no improvement in these population-level measures -- the global budget reduced hospital utilization but did not by itself build the primary care and social infrastructure needed to improve population health, which is exactly why Vermont paired its budget with the EAST Fund and Rural Health Transformation Program from the start.",
                 "options": [
                     {"id": "o_5p12e1", "text": "True", "isCorrect": False, "explanation": "Milbank found no improvement in these measures -- reductions in admissions were concentrated among healthier patients, not evidence of broader population health gains."},
                     {"id": "o_5p12e2", "text": "False", "isCorrect": True},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_apm_readiness",
        "trackId": "track_5p_economics",
        "pillar": "economics",
        "order": 13,
        "slug": "apm-readiness-vbc-financial-modeling",
        "title": "APM Readiness and VBC Financial Modeling",
        "summary": "Attribution, benchmarking, and risk adjustment determine an organization's financial exposure before it delivers a single service under a value-based contract. This lesson works through the mechanics -- benchmarks, minimum savings rates, HCC coding, shared savings math -- that a CFO must be able to model before signing.",
        "estimatedMinutes": 30,
        "isPublished": True,
        "tags": ["value-based-care", "risk-adjustment", "shared-savings", "apm-readiness", "hcc-coding"],
        "relatedLessonIds": ["lesson_5p_global_budgets_rbp", "lesson_5p_design_vs_management"],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p13a", "text": "Explain how attribution and benchmark methodology determine an organization's financial exposure before it delivers any care."},
            {"id": "obj_5p13b", "text": "Describe the mechanics of the HCC/RAF risk-adjustment system and why coding accuracy is a financial control, not an administrative task."},
            {"id": "obj_5p13c", "text": "Calculate a basic shared-savings and care-management ROI scenario using benchmark, minimum savings rate, and sharing rate."},
            {"id": "obj_5p13d", "text": "Identify the contract provisions that most often turn an attractive-looking shared-savings deal into a financial loss."},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "From Revenue Optimization to Population Cost Management", "body":
                "Chapter 6 established the payment architecture -- reference-based pricing and global budgets. This lesson turns from architecture to practice: how do organizations actually model the financial impact of alternative payment models before they sign one?\n\n"
                "Under fee-for-service, the financial questions are about revenue optimization: how do we maximize reimbursement for the volume we deliver? Under value-based care, the questions are fundamentally different: what is our total cost of care for our attributed population, where is it higher than the benchmark and why, and what investment reduces it below the benchmark? These are population health economics questions, and they require different data infrastructure and different management skills than a revenue cycle department was built to provide."
            },
            {"type": "text", "heading": "Attribution: Defining Your Denominator Before the Year Starts", "body":
                "Attribution is the process of assigning patients to an organization for purposes of measuring shared savings or shared losses. It can be prospective -- the organization knows its panel before the performance year begins -- or retrospective, where the panel is only known after the year is over based on where care was actually delivered.\n\n"
                "The methodology matters as much as the concept: attribution based on plurality of primary care visits produces a different, and typically more stable, population than attribution based on which provider billed the most for a patient. Prospective attribution enables proactive care management, because the organization can act on its panel during the year it is being measured against; retrospective attribution creates genuine uncertainty, since the organization is managing a population it cannot fully identify until the year is already over.\n\n"
                "In Vermont, the AHEAD Model tracks total cost of care for Medicare fee-for-service beneficiaries attributed to Vermont hospitals across all payer settings, using the state's VHCURES all-payer claims database as the underlying data source. Having the database is not the same as having the internal analytics capability to use it -- and many Vermont hospitals still lack that capability."
            },
            {"type": "text", "heading": "Benchmarking: The Number Everything Is Measured Against", "body":
                "Every alternative payment model is built around a benchmark: the expected cost of care against which actual performance is measured. Getting the benchmark methodology right -- or negotiating a favorable one -- is often the single most consequential financial decision in APM contract entry.\n\n"
                "A historical spending baseline, the most common approach, sets the benchmark from the organization's own past cost, typically with a trend adjustment. This creates the 'efficient provider disadvantage': an organization that is already lean and efficient starts with a lower benchmark and less room to generate savings than a historically high-spending competitor entering the same model.\n\n"
                "A regional benchmark uses area-wide average cost instead of an organization's own history, which eliminates the efficient-provider disadvantage but can penalize an organization operating in a genuinely high-cost region relative to its own trend. Vermont's reference-based pricing takes this approach at the price level: it anchors to Medicare rates rather than Vermont hospitals' own historical prices, directly addressing the problem of benchmarks built on historically inflated charges.\n\n"
                "A prospective benchmark, used in global budgets and capitation, is set at the start of the year from projected population needs. It provides revenue certainty for planning, but its fairness depends entirely on the quality of the risk adjustment behind it -- which is the subject of the next section."
            },
            {"type": "text", "heading": "Risk Adjustment: The HCC Mechanism and Why It's a Financial Control", "body":
                "CMS's Hierarchical Condition Category (HCC) model translates a patient's diagnosis codes into a Risk Adjustment Factor (RAF) -- a multiplier applied to the benchmark to reflect that patient's expected cost of care. Accurate coding produces an accurate benchmark. RAF gaps -- diagnoses a patient actually has but that go uncoded -- understate the population's expected cost, producing apparent savings that disappear the moment coding is corrected. Vermont's critical access hospitals carry an average 12% HCC coding gap, according to a 2025 Rural Health Redesign Center assessment -- real revenue and accuracy left on the table simply because documentation does not capture patients' actual complexity.\n\n"
                "The opposite failure mode is worse. In January 2026, Kaiser Permanente affiliates agreed to pay $556 million -- the largest False Claims Act settlement to date involving Medicare Advantage -- to resolve Department of Justice allegations that employees in California and Colorado added diagnosis codes to patient charts after visits, codes the treating physicians had not identified or addressed at the visit itself, systematically inflating risk scores. The government alleged the practice drew roughly $1 billion in federal payments between 2009 and 2018.\n\n"
                "The lesson for a CFO sits between these two cases. HCC coding accuracy is not a back-office administrative task; it is a financial control with legal exposure at one extreme and left-on-the-table accuracy at the other. Both point to the same underlying requirement: documentation that reflects real patient complexity, audited regularly against actual clinical records -- not managed as a number to be moved in either direction."
            },
            {"type": "text", "heading": "Shared Savings vs. Downside Risk: The Contract Mechanics", "body":
                "The core shared-savings calculation runs in steps. First, benchmark PMPM (per member per month) multiplied by attributed member-months sets the total benchmark -- the budget the organization is measured against. Second, actual total cost of care for the attributed population is measured, including out-of-network spending. Third, benchmark minus actual cost equals gross savings, or gross loss if actual spending exceeds the benchmark.\n\n"
                "Before any payment changes hands, most models apply a minimum savings rate (MSR): under CMS's Medicare Shared Savings Program, this runs roughly 2% to 3.9% of the benchmark depending on the size of the attributed population, protecting against ordinary year-to-year cost variation triggering payments that do not reflect genuine performance change.\n\n"
                "Once savings clear the MSR, a sharing rate applies. Under MSSP's one-sided track, with no downside risk, an organization can earn up to 50% of savings based on quality performance; under two-sided tracks that accept downside risk, sharing can reach 60%, and higher-risk tracks can share losses at 40% to 75%. The structural tradeoff is explicit: more upside sharing requires accepting more downside exposure."
            },
            {"type": "text", "heading": "The Care Management ROI Math", "body":
                "A care management program that prevents 50 hospitalizations in a population of 10,000 Medicare beneficiaries, at an average cost of $15,000 per hospitalization, avoids $750,000 in cost. If that program costs $200,000 a year to operate, the return is roughly 275%.\n\n"
                "This math only works under value-based care. Under fee-for-service, the same prevented hospitalization is foregone revenue -- the identical clinical success becomes a financial loss. Vermont's data adds a second lever: 32.3% of Vermont emergency department visits are classified as potentially avoidable, at an average cost of $1,800 per visit.\n\n"
                "This is not a hypothetical illustration -- it is the specific arithmetic reason population health management is financially rational under shared savings and financially irrational under fee-for-service, and it is why a CFO evaluating a transformation investment needs the avoided-event count and per-event cost, not a general sense that prevention 'should' pay off."
            },
            {"type": "text", "heading": "The Pioneer ACO Lesson: Benchmark Design Determines Survival", "body":
                "CMS's Pioneer ACO Model launched in 2012 with 32 participating health systems, selected specifically because they already had experience taking on financial risk. The benchmark combined each ACO's own historical spending with the national Medicare expenditure trend -- a design similar in spirit to today's historical-baseline approach.\n\n"
                "Participation fell sharply over the model's life: down to 19 organizations by 2014, and to just 8 by the program's final performance year in 2016. Twenty-four organizations left over the model's life -- some for insufficient savings, some for outright losses, several moving to the less risky Medicare Shared Savings Program instead.\n\n"
                "The lesson for any organization evaluating a new risk contract: a benchmark that looks reasonable on paper can still be the difference between an organization that thrives under risk and one that cannot sustain the model. A CFO's first question about any risk contract should be about benchmark mechanics, not the headline sharing rate."
            },
            {"type": "text", "heading": "Reading a Contract for the Risk That Isn't in the Headline Terms", "body":
                "A shared-savings contract's real financial risk often sits in provisions that don't appear in the summary terms: benchmark reset rules, attribution methodology, quality withholds, stop-loss thresholds, carve-outs, and reconciliation timing.\n\n"
                "Work the math before you sign: a 30% quality withhold on 50% of gross savings means quality performance alone determines 15% of the total financial outcome. An organization that cannot yet reliably report the specific measures being withheld against is accepting risk on a number it cannot currently produce.\n\n"
                "Carve-outs -- high-cost drugs, mental health, specialty services excluded from the shared-savings calculation -- reduce an organization's ability to manage total cost of care and shrink the addressable savings opportunity. Every carve-out is a place cost can shift without the organization being able to manage it."
            },
            {"type": "text", "heading": "The Readiness Domain That Actually Predicts Success", "body":
                "The VBC Transformation Readiness Assessment scores an organization across 30 dimensions in six domains -- strategic clarity, data and technology, care delivery capability, network and partnerships, revenue cycle, and workforce operations -- each rated 1 to 4. A total score below 60 of 120 signals the organization is not ready for full downside risk.\n\n"
                "For Vermont specifically, Domain 2 (Data and Technology) is the binding constraint: most Vermont hospitals score only 3 to 7 of a possible 12 points in this domain, while Blueprint-participating patient-centered medical homes with active Community Health Team support score 8 to 12 in Domain 3 (care delivery) -- strong by national standards. The gap is not clinical capability; it is the analytics infrastructure needed to act on what clinical teams already know how to do.\n\n"
                "An organization should score itself against this framework, or an equivalent one, before signing a downside-risk contract -- not after the first year-end reconciliation reveals the gap the hard way."
            },
            {"type": "text", "heading": "Before Your Next Contract Cycle", "body":
                "The pre-signature checklist for a CFO: model your own benchmark under at least two methodologies (historical versus regional); run an HCC coding gap audit against actual clinical documentation; calculate minimum-savings-rate and sharing-rate outcomes at pessimistic, base, and optimistic total-cost-of-care performance; and list every carve-out in the contract and what it removes from your addressable savings.\n\n"
                "Organizations that negotiate aligned VBC contracts ahead of Vermont's FY2028 global budget mandate will have a financial model that reinforces the transformation already underway. Organizations that wait will carry a commercial revenue model still built to reward volume -- in direct conflict with the fixed-budget environment the rest of their business is entering."
            },
            {"type": "key_stat", "stats": [
                {"value": "$15,000", "label": "Average inpatient hospitalization cost prevented", "source": "HTR Economics pillar framework / CMS cost data"},
                {"value": "$1,800", "label": "Average cost of a preventable emergency department visit", "source": "HTR Economics pillar framework"},
                {"value": "32.3%", "label": "Share of Vermont ED visits classified as potentially avoidable", "source": "Vermont Agency of Human Services Transformation Reports"},
            ]},
            {"type": "callout", "variant": "warning", "heading": "The Kaiser Permanente Warning", "body":
                "In January 2026, Kaiser Permanente affiliates agreed to pay $556 million -- the largest False Claims Act settlement to date in Medicare Advantage -- after the DOJ alleged employees added inaccurate diagnosis codes to patient charts after visits, inflating risk scores across California and Colorado and drawing roughly $1 billion in federal payments from 2009 to 2018. Risk-adjustment accuracy is a compliance-grade financial control, not a coding optimization exercise."},
            {"type": "key_stat", "stats": [
                {"value": "2-3.9%", "label": "Minimum savings rate before an ACO shares in savings (MSSP one-sided track)", "source": "CMS Medicare Shared Savings Program methodology"},
                {"value": "50-60%", "label": "Maximum shared-savings rate, one-sided vs. two-sided MSSP tracks", "source": "CMS ACO model documentation"},
                {"value": "12%", "label": "Average HCC coding gap at Vermont critical access hospitals", "source": "2025 Vermont Rural Health Redesign Center assessment"},
            ]},
            {"type": "callout", "variant": "info", "heading": "What Pioneer ACO's Attrition Actually Shows", "body":
                "CMS's Pioneer ACO Model began in 2012 with 32 organizations chosen for their risk experience; only 8 remained by the program's final performance year in 2016. Several exits were driven by benchmark design and financial losses, not clinical failure -- a reminder that a well-run clinical program can still fail financially under a poorly fitted benchmark."},
            {"type": "callout", "variant": "tip", "heading": "Vermont's Binding Constraint Isn't Clinical", "body":
                "Blueprint-participating PCMH practices with active Community Health Team support score 8-12 out of 12 on the care-delivery readiness domain -- strong by national standards. Most Vermont hospitals score only 3-7 out of 12 on the data-and-technology domain. Before assuming downside risk, close the second gap, not the first -- it is already closed."},
            {"type": "comparison_table", "heading": "Benchmark Construction Methods", "rows": [
                {"label": "Historical baseline", "left": "Advantage: high past spenders get more savings headroom to work with", "right": "Disadvantage: already-efficient organizations face the 'efficient provider disadvantage' -- a lower benchmark, less room to save"},
                {"label": "Regional benchmark", "left": "Advantage: eliminates the efficient-provider disadvantage", "right": "Disadvantage: organizations in genuinely high-cost regions compete against a benchmark lower than their own cost history"},
                {"label": "Prospective benchmark", "left": "Advantage: revenue certainty, set before the year begins", "right": "Disadvantage: fairness depends entirely on risk-adjustment quality -- poor adjustment rewards case mix, not care management"},
            ]},
            {"type": "comparison_table", "heading": "Shared Savings, Step by Step", "rows": [
                {"label": "1. Set the benchmark", "left": "Benchmark PMPM x attributed member-months", "right": "= total benchmark spending -- the budget you are measured against"},
                {"label": "2. Measure performance", "left": "Actual total cost of care for the attributed population", "right": "Includes all spending, even out-of-network care"},
                {"label": "3. Calculate gross savings/loss", "left": "Benchmark minus actual total cost of care", "right": "Positive = gross savings; negative = gross loss"},
                {"label": "4. Apply the minimum savings rate", "left": "Savings must clear roughly 2-3.9% before any payment", "right": "Filters out normal year-to-year variance from genuine performance"},
                {"label": "5. Apply the sharing rate", "left": "Gross savings x sharing rate (50-60%+ depending on risk track)", "right": "= the organization's shared savings payment"},
            ]},
        ],
        "quiz": {
            "id": "quiz_5p_apm_readiness",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {"id": "q_5p13a", "type": "single_choice", "points": 1,
                 "question": "Under the Medicare Shared Savings Program's one-sided track (no downside risk), what is the maximum shared-savings rate an ACO can earn based on quality performance?",
                 "explanation": "CMS ACO model documentation sets the one-sided track's maximum sharing rate at 50%; two-sided tracks that accept downside risk can reach 60%.",
                 "options": [
                     {"id": "o_5p13a1", "text": "50%", "isCorrect": True},
                     {"id": "o_5p13a2", "text": "100%", "isCorrect": False, "explanation": "No MSSP track shares 100% of savings with the organization -- CMS retains a portion in every track."},
                     {"id": "o_5p13a3", "text": "25%", "isCorrect": False, "explanation": "This understates the actual one-sided maximum of 50%."},
                     {"id": "o_5p13a4", "text": "80%", "isCorrect": False, "explanation": "80% is closer to the loss-sharing ceiling in some higher-risk, two-sided tracks -- not the one-sided savings rate."},
                 ]},
                {"id": "q_5p13b", "type": "single_choice", "points": 1,
                 "question": "What is the 'efficient provider disadvantage' in APM benchmark design?",
                 "explanation": "A historical benchmark rewards organizations with high past spending by giving them more room to generate savings, while already-efficient organizations get a lower benchmark and less room to save -- penalizing exactly the performance the model is supposed to encourage.",
                 "options": [
                     {"id": "o_5p13b1", "text": "Organizations with historically low-cost, efficient care get a lower benchmark, leaving less room to generate savings", "isCorrect": True},
                     {"id": "o_5p13b2", "text": "Efficient providers are automatically excluded from entering APM contracts", "isCorrect": False, "explanation": "Nothing in APM contract design excludes efficient providers from participating; the disadvantage is financial, not a barrier to entry."},
                     {"id": "o_5p13b3", "text": "Efficient providers receive an automatic bonus payment for past performance", "isCorrect": False, "explanation": "This is the opposite of the disadvantage -- efficient providers get a lower benchmark, not a bonus."},
                     {"id": "o_5p13b4", "text": "It refers to higher malpractice insurance premiums for high-performing providers", "isCorrect": False, "explanation": "The efficient provider disadvantage is a benchmark-design problem in payment models, unrelated to malpractice insurance."},
                 ]},
                {"id": "q_5p13c", "type": "single_choice", "points": 1,
                 "question": "The Pioneer ACO Model began in 2012 with 32 participating organizations. How many remained by the program's final performance year in 2016?",
                 "explanation": "Participation fell to 19 organizations by 2014 and to 8 by the program's final year in 2016, as organizations left over insufficient savings, financial losses, or a move to the less risky Medicare Shared Savings Program.",
                 "options": [
                     {"id": "o_5p13c1", "text": "8", "isCorrect": True},
                     {"id": "o_5p13c2", "text": "19", "isCorrect": False, "explanation": "19 was the participant count around 2014, partway through the program's attrition -- not the final-year count."},
                     {"id": "o_5p13c3", "text": "32", "isCorrect": False, "explanation": "32 was the number of organizations that started the program in 2012, before any attrition."},
                     {"id": "o_5p13c4", "text": "24", "isCorrect": False, "explanation": "24 is the cumulative number of organizations that eventually left the program over its life -- not the number that remained."},
                 ]},
                {"id": "q_5p13d", "type": "single_choice", "points": 1,
                 "question": "A hospital signs a shared-savings contract with a 30% quality withhold on 50% of gross savings, but does not currently track the withheld quality measures reliably. What is the financial risk?",
                 "explanation": "A 30% withhold on 50% of gross savings means quality performance determines 15% of the total financial outcome (30% x 50%) -- and an organization that cannot report those measures reliably is accepting risk on a number it cannot yet produce.",
                 "options": [
                     {"id": "o_5p13d1", "text": "Up to 15% of the total financial outcome is determined by quality measures the hospital cannot yet reliably report", "isCorrect": True},
                     {"id": "o_5p13d2", "text": "There is no risk, because quality withholds are automatically waived for first-time APM entrants", "isCorrect": False, "explanation": "Quality withholds are contractual terms, not automatically waived based on an organization's experience level."},
                     {"id": "o_5p13d3", "text": "The hospital automatically forfeits its entire shared-savings payment regardless of quality performance", "isCorrect": False, "explanation": "Only the withheld portion (here, 15% of the total outcome) is at risk from quality performance -- not the entire payment."},
                     {"id": "o_5p13d4", "text": "Quality withholds apply only to Medicaid populations and are irrelevant to this contract", "isCorrect": False, "explanation": "Quality withholds are a standard feature of commercial and Medicare shared-savings contracts alike, not a Medicaid-specific provision."},
                 ]},
                {"id": "q_5p13e", "type": "true_false", "points": 1,
                 "question": "Identifying a high-risk patient before a health crisis occurs has roughly the same financial value to an organization under fee-for-service as it does under value-based care.",
                 "explanation": "Under fee-for-service, the financial value of identifying a high-risk patient is limited to billing more for additional services; under value-based care, preventing that patient's hospitalization saves the organization the full cost of the event -- an enormous difference in financial value, not a similar one.",
                 "options": [
                     {"id": "o_5p13e1", "text": "True", "isCorrect": False, "explanation": "The financial value is far higher under value-based care, where a prevented hospitalization is a direct, full-cost saving rather than just foregone additional billing."},
                     {"id": "o_5p13e2", "text": "False", "isCorrect": True},
                 ]},
            ],
        },
    },
    {
        "id": "lesson_5p_design_vs_management",
        "trackId": "track_5p_economics",
        "pillar": "economics",
        "order": 14,
        "slug": "economics-as-design-vs-management",
        "title": "Economics-as-Design vs. Economics-as-Management",
        "summary": "Designing a payment model is a policy and actuarial exercise; managing one is an analytics and operations exercise, and Vermont's own data show the second is well behind the first. A payment model an organization cannot measure is a payment model it cannot manage, no matter how well it was designed.",
        "estimatedMinutes": 20,
        "isPublished": True,
        "tags": ["payment-model-design", "data-infrastructure", "economics-pillar", "technology-pillar", "vbc-readiness"],
        "relatedLessonIds": ["lesson_5p_global_budgets_rbp", "lesson_5p_apm_readiness"],
        "createdAt": "2026-09-18T00:00:00Z",
        "updatedAt": "2026-09-18T00:00:00Z",
        "objectives": [
            {"id": "obj_5p14a", "text": "Distinguish what designing a payment model requires (statutory authority, benchmark and budget architecture) from what managing one requires (measurement, attribution, ongoing analytics)."},
            {"id": "obj_5p14b", "text": "Explain why the Technology pillar is a precondition for executing an Economics pillar policy, using Vermont's own data-infrastructure gap as the example."},
            {"id": "obj_5p14c", "text": "Use Maryland's and Massachusetts's experience to show that management capability can be built after design, but at a cost in delayed population-health improvement."},
            {"id": "obj_5p14d", "text": "Identify a documented case in which the incentive to manage a measurement, rather than the care it describes, produced a compliance and financial failure."},
        ],
        "contentBlocks": [
            {"type": "text", "heading": "Two Different Jobs Wearing One Name", "body":
                "Chapters 6 and 7 together make a distinction this course treats as load-bearing: designing a payment model and managing one are different disciplines, done by different people, on different timelines. Act 68's statutory mandate, GMCB's rulemaking, and the five design dimensions every global budget must resolve -- scope, population adjustment, volume treatment, quality linkage, and flexibility mechanisms -- are design work, largely finished once GMCB's methodology is final.\n\n"
                "What happens after the methodology is final -- attribution, PMPM tracking, HCC coding, potentially avoidable utilization monitoring, board reporting rebuilt around a fixed-revenue metric set -- is management work, and it is not finished anywhere in Vermont's hospital system yet. A reader who treats Act 68's passage, or GMCB's final rule, as the end of the transformation has confused the two jobs."
            },
            {"type": "text", "heading": "What Design Requires", "body":
                "Design is a policy and actuarial exercise: statutory authority (Act 68), a regulator with rulemaking power (GMCB), and resolution of the five dimensions every global budget methodology must address -- what services are in scope, how population differences are adjusted for, whether the budget moves with volume, how quality links to payment, and what flexibility exists for mid-year revision.\n\n"
                "Vermont's GMCB is still resolving several of these dimensions as of its February 2026 update -- scope and population adjustment in particular are both still working through rulemaking. That is not a failure of the process; getting a global budget's design right takes years, and Vermont has been working through some version of it since the Act 167 diagnostic."
            },
            {"type": "text", "heading": "What Management Requires", "body":
                "Management is an analytics and operations exercise that starts from a different premise: the payment rules already exist, and the job is to hit the target they set. That requires accurate patient attribution, PMPM cost tracking against the budget cap, potentially avoidable utilization monitoring, HCC coding accurate enough that the benchmark reflects real patient complexity, and finance leadership that has rebuilt its own reporting around a different metric set -- cost per discharge instead of revenue per discharge, avoidable admission rate instead of admission volume.\n\n"
                "A board dashboard still built around net patient revenue growth and case mix index tells a global-budget-era finance committee almost nothing useful; it answers questions from the payment model the hospital is leaving, not the one it is entering.\n\n"
                "None of this exists automatically once a global budget is signed into law. It has to be built, and building it typically takes longer than the design phase everyone spent years negotiating -- which is exactly the mismatch this lesson is about."
            },
            {"type": "text", "heading": "The Technology Gate: A Metric You Cannot See You Cannot Manage", "body":
                "This is where the Economics pillar runs directly into the Technology pillar's precondition. Vermont's own readiness data makes the point concretely: most Vermont hospitals score only 3 to 7 out of 12 possible points on the Data and Technology domain of the VBC Transformation Readiness Assessment -- the domain covering attribution list generation and total cost of care measurement. A hospital that cannot accurately attribute its patient population cannot manage a global budget, regardless of how well GMCB designs the budget itself.\n\n"
                "VHCURES, Vermont's all-payer claims database, is the data infrastructure that makes this measurement possible in principle. But having the database is not the same as having the internal analytics capability to use it -- precisely the gap the joint AHS-GMCB analytics vendor procurement is meant to close, and precisely the gap that determines whether a well-designed budget produces the incentive change this course describes, or just confusion at the first year-end reconciliation.\n\n"
                "The deadline is not abstract. This is Vermont's own stated framing of Domain 2: the gap must be closed before FY2027, when reference-based pricing takes effect for commercial payers -- not after, once the first year of binding prices has already exposed which hospitals could not see their own numbers."
            },
            {"type": "text", "heading": "Maryland Designed It Right in 2014 and Still Had to Learn to Manage It", "body":
                "Maryland's HSCRC had every design advantage: a unique, decades-old statutory authority and a federal waiver dating to 1977. Its 2014 Global Budget Revenue methodology is, on the design side, the most mature all-payer model in the country. But the Milbank Fund's evaluation found the model's early years reduced hospital utilization without improving population health measures like smoking or obesity rates -- because the accountability structure connecting quality and community outcomes to the budget, the Medicare Performance Adjustment and the Quality Based Reimbursement program, was strengthened over years of operation, not fully present at launch.\n\n"
                "Maryland's management capability -- the systems and incentives that actually connect a fixed budget to better population health, not just less hospital utilization -- was built after the design was already in force. That sequencing cost Maryland years in which the budget produced cost control without the health improvement it was meant to enable."
            },
            {"type": "text", "heading": "Massachusetts: A Global Payment Model Managed Well From the Start", "body":
                "Blue Cross Blue Shield of Massachusetts's Alternative Quality Contract, launched in 2009 with seven provider groups, is a non-Vermont, non-Maryland case of the same distinction resolving in the other direction. The contract's design -- a global budget with pay-for-performance quality measures -- was not fundamentally different from other global payment experiments running at the time.\n\n"
                "What distinguished the AQC was that participating physician groups invested early in management infrastructure: patient registries, care management staff, and internal reporting aligned to the contract's own cost and quality measures. A Health Affairs study documented savings building from 1.9% in year one to 3.3% in year two; a subsequent New England Journal of Medicine study by Song, Chernew, and colleagues found the reduction in spending growth persisted through four years of the contract. The design was unremarkable; the early management investment is what produced results that compounded rather than evaporated."
            },
            {"type": "text", "heading": "When the Incentive to Manage the Measurement Replaces Managing the Care", "body":
                "There is a failure mode on the management side distinct from simply lacking capability: building the capability to manage the measurement itself, rather than the underlying care. In January 2026, Kaiser Permanente affiliates agreed to pay $556 million to settle Department of Justice allegations that employees in California and Colorado added diagnosis codes to patient charts after visits -- codes the treating physicians had not identified or addressed at the visit itself -- systematically inflating Medicare Advantage risk scores. The government alleged the practice drew roughly $1 billion in federal payments between 2009 and 2018.\n\n"
                "HCC coding accuracy is supposed to be a management tool: it makes the benchmark reflect a population's real complexity, so a risk contract's savings measure genuine efficiency rather than an artifact of who a plan enrolled. The Kaiser case shows what happens when an organization builds the capability to move the number instead of the capability to manage the population that number is supposed to describe -- the same infrastructure investment, aimed at the wrong target.\n\n"
                "The settlement, the largest False Claims Act recovery in Medicare Advantage history to date, is a warning specifically relevant to any organization about to accept downside risk under an HCC-adjusted benchmark: the audit and compliance infrastructure needed to code accurately is inseparable from the analytics infrastructure needed to manage a risk contract well. An organization cannot outsource this distinction to its coding vendor and consider the management job done."
            },
            {"type": "text", "heading": "One Instance of the Framework's Dependency Structure", "body":
                "The five-pillar framework holds nine dependency relationships among its pillars, not because the order is arbitrary but because certain capabilities are genuine preconditions for others. Technology preceding Economics in execution is one of those nine: a global budget is, mechanically, an agreement to measure and cap total revenue against a population's cost -- which is impossible without the attribution, claims, and analytics infrastructure the Technology pillar is responsible for building.\n\n"
                "This is also why the Equity Imperative is not a sixth pillar competing with Economics for the same budget line. Equity is the cross-cutting test each pillar must pass on its own terms -- here, whether a global budget's population adjustment fairly accounts for the social risk factors of the hospitals serving Vermont's poorest and most rural communities. A benchmark that ignores social risk fails the Economics pillar's own sustainability test; it is not a separate workstream's problem to solve later."
            },
            {"type": "text", "heading": "Before Your Next Contract Cycle", "body":
                "The practical test for any organization entering a Vermont global budget, an AHEAD-adjacent arrangement, or any APM elsewhere: can you already produce, today, the attribution list, the PMPM trend, the potentially avoidable utilization rate, and the HCC-adjusted benchmark the contract will be measured against? If the honest answer is no, the organization is agreeing to be measured by a number it cannot yet see -- and a payment model you cannot measure is a payment model you cannot manage, no matter how well it was designed.\n\n"
                "This is also why this course sequences Technology before Economics: the data infrastructure, attribution capability, and analytics maturity a global budget or APM contract requires are not something an organization builds in the six months before go-live. Organizations that start that build now, ahead of Vermont's FY2027-2028 deadlines, will manage the model the legislature designed. Organizations that wait will have a well-designed policy and no way to operate inside it."
            },
            {"type": "key_stat", "stats": [
                {"value": "3-7 / 12", "label": "Most Vermont hospitals' score on the Data and Technology readiness domain", "source": "HTR VBC Readiness Assessment / AHEAD preparation baseline"},
                {"value": "12%", "label": "Average HCC coding gap at Vermont critical access hospitals", "source": "2025 Vermont Rural Health Redesign Center assessment"},
                {"value": "$556M", "label": "Kaiser Permanente DOJ settlement for Medicare Advantage risk-adjustment fraud, January 2026", "source": "U.S. Department of Justice"},
            ]},
            {"type": "callout", "variant": "warning", "heading": "Design Without Management Is Not Transformation", "body":
                "\"If the model is not adequately regulated and sufficiently resourced, it will fail dramatically and harm patients and harm our health system.\" -- Owen Foster, Chair of the Vermont Green Mountain Care Board, on signing the AHEAD State Agreement, January 2025. Regulation is design; resourcing is management. Foster's warning names both halves as necessary."},
            {"type": "callout", "variant": "info", "heading": "1.9% to 3.3%: Savings That Compounded", "body":
                "The Massachusetts Alternative Quality Contract's documented savings grew from 1.9% in its first year to 3.3% in its second, and a four-year NEJM study found the reduction in spending growth persisted. That trajectory -- savings building over time rather than appearing once and fading -- is what management capability maturing alongside a payment model looks like."},
            {"type": "callout", "variant": "tip", "heading": "The Test to Run Before You Sign", "body":
                "Can you produce, today, an accurate attribution list, a PMPM cost trend, and an HCC-adjusted benchmark for the specific population a contract will measure? If not, do not sign until you can -- a well-designed contract does not compensate for an organization's inability to see the number it is being measured against."},
            {"type": "comparison_table", "heading": "Design Question vs. Management Question", "rows": [
                {"label": "Scope", "left": "Design: which services are inside the budget?", "right": "Management: can you track cost for exactly those services, and only those, every month?"},
                {"label": "Population adjustment", "left": "Design: how are demographics and social risk weighted?", "right": "Management: is your HCC/RAF coding accurate enough that the adjustment reflects real patient complexity?"},
                {"label": "Volume treatment", "left": "Design: does the budget move if patient volume changes?", "right": "Management: can you detect a volume shift in-year, before it appears in a year-end reconciliation?"},
                {"label": "Quality linkage", "left": "Design: what share of payment depends on quality metrics?", "right": "Management: can you report those exact metrics reliably today, or only after the fact?"},
                {"label": "Flexibility mechanisms", "left": "Design: what triggers a mid-year adjustment?", "right": "Management: do you have monitoring in place to notice you've hit a trigger?"},
            ]},
        ],
        "quiz": {
            "id": "quiz_5p_design_vs_management",
            "passingScore": 75,
            "shuffleOptions": True,
            "questions": [
                {"id": "q_5p14a", "type": "single_choice", "points": 1,
                 "question": "What did the Department of Justice allege in its $556 million settlement with Kaiser Permanente regarding Medicare Advantage risk adjustment?",
                 "explanation": "The DOJ alleged that Kaiser employees in California and Colorado added diagnosis codes to patient charts after visits -- codes the treating physicians had not identified or addressed -- systematically inflating Medicare Advantage risk scores and drawing roughly $1 billion in federal payments from 2009 to 2018.",
                 "options": [
                     {"id": "o_5p14a1", "text": "Employees added inaccurate diagnosis codes to patient charts after visits to inflate risk scores", "isCorrect": True},
                     {"id": "o_5p14a2", "text": "Kaiser refused to submit any diagnosis codes to CMS for years", "isCorrect": False, "explanation": "The allegation was about adding inaccurate codes after the fact, not refusing to submit codes."},
                     {"id": "o_5p14a3", "text": "Kaiser systematically under-billed Medicare for a decade", "isCorrect": False, "explanation": "The allegation was the opposite: inflating risk scores to draw more federal payment, not under-billing."},
                     {"id": "o_5p14a4", "text": "Kaiser exceeded its state-mandated hospital global budget", "isCorrect": False, "explanation": "This settlement concerned Medicare Advantage risk-adjustment coding, not a hospital global budget violation."},
                 ]},
                {"id": "q_5p14b", "type": "single_choice", "points": 1,
                 "question": "What is the core distinction this lesson draws between 'economics-as-design' and 'economics-as-management'?",
                 "explanation": "Design sets the payment rules -- who is covered, how a benchmark or budget is calculated, what statutory authority backs it. Management is the separate, ongoing job of measuring and operating within those rules: attribution, PMPM tracking, coding accuracy, and reporting built around the new metrics.",
                 "options": [
                     {"id": "o_5p14b1", "text": "Design sets the payment rules; management requires the ongoing measurement and analytics capability to operate within those rules", "isCorrect": True},
                     {"id": "o_5p14b2", "text": "Design is done by hospitals; management is done exclusively by state regulators", "isCorrect": False, "explanation": "This reverses the actual roles -- regulators like GMCB do the design work, while hospitals and health systems do the ongoing management work."},
                     {"id": "o_5p14b3", "text": "There is no meaningful distinction; both terms describe the same activity", "isCorrect": False, "explanation": "The lesson's central point is that these are different disciplines, often performed years apart by different people -- Maryland's experience shows the gap between them directly."},
                     {"id": "o_5p14b4", "text": "Design applies only to Medicare programs; management applies only to commercial payer contracts", "isCorrect": False, "explanation": "Both design and management apply across payer types -- Vermont's RBP, global budgets, and AHEAD all involve both design and management regardless of payer."},
                 ]},
                {"id": "q_5p14c", "type": "single_choice", "points": 1,
                 "question": "In the Massachusetts Alternative Quality Contract, a New England Journal of Medicine study by Song, Chernew, and colleagues found reduced spending growth persisting over what period?",
                 "explanation": "The NEJM study found the AQC's reduction in medical spending growth persisted through four years of the contract, following a Health Affairs study that documented savings building from 1.9% in year one to 3.3% in year two.",
                 "options": [
                     {"id": "o_5p14c1", "text": "Four years", "isCorrect": True},
                     {"id": "o_5p14c2", "text": "Ten years", "isCorrect": False, "explanation": "The documented NEJM study period was four years, not ten."},
                     {"id": "o_5p14c3", "text": "Six months", "isCorrect": False, "explanation": "Six months is far shorter than the multi-year study period the NEJM research actually covered."},
                     {"id": "o_5p14c4", "text": "One year, with no measurable effect afterward", "isCorrect": False, "explanation": "The opposite is true -- savings grew from year one to year two and the spending-growth reduction persisted through year four."},
                 ]},
                {"id": "q_5p14d", "type": "single_choice", "points": 1,
                 "question": "A state legislates a global budget methodology (design), but its hospitals lack the analytics to attribute patients or track potentially avoidable utilization (management). Which pillar's precondition is unmet, even though the Economics pillar's policy is technically in force?",
                 "explanation": "The framework holds nine dependency relationships among pillars, and Technology preceding Economics in execution is one of them: a global budget cannot function as designed without the attribution and analytics infrastructure the Technology pillar is responsible for building.",
                 "options": [
                     {"id": "o_5p14d1", "text": "Technology", "isCorrect": True},
                     {"id": "o_5p14d2", "text": "Clinical", "isCorrect": False, "explanation": "The gap described -- attribution and utilization tracking -- is a data and analytics gap, which is the Technology pillar's domain, not the Clinical pillar's."},
                     {"id": "o_5p14d3", "text": "Operations", "isCorrect": False, "explanation": "Operations concerns executability of the broader program; the specific gap here is measurement infrastructure, which sits with Technology."},
                     {"id": "o_5p14d4", "text": "Equity, treated as a sixth pillar", "isCorrect": False, "explanation": "Equity is deliberately not a sixth pillar in this framework -- it is a cross-cutting test each of the five pillars must pass, not a separate pillar that can be 'unmet' on its own."},
                 ]},
                {"id": "q_5p14e", "type": "true_false", "points": 1,
                 "question": "According to this lesson, a payment model an organization cannot measure is a payment model it cannot manage, regardless of how well it was designed.",
                 "explanation": "This is the lesson's central argument: Vermont's own readiness data show most hospitals scoring 3-7 out of 12 on the data-and-technology domain, meaning the measurement capability required to manage a well-designed global budget or APM is the actual binding constraint, not the design itself.",
                 "options": [
                     {"id": "o_5p14e1", "text": "True", "isCorrect": True},
                     {"id": "o_5p14e2", "text": "False", "isCorrect": False, "explanation": "This lesson argues exactly the opposite -- design quality cannot substitute for the measurement and analytics capability needed to manage a payment model in practice."},
                 ]},
            ],
        },
    },
]
