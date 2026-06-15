#!/usr/bin/env python3
"""
add_handson.py — insert "Work This Chapter on the Platform" sections into pillar
chapters 2-11 of HTR_Book_v41.md, immediately before that chapter's
"## **Implications for You**" heading. Idempotent (skips if already present).

Tool labels/hrefs verified against frontend/lib/taxonomy/tools.ts.
"""
import re

PATH='HTR_Book_v41.md'
text=open(PATH,encoding='utf-8').read()

# Each block: (chapter_number, markdown). Figure numbers follow chapter.
BLOCKS = {
 "2": ("""## **Work This Chapter on the Platform**

Chapter 2's legislative architecture becomes concrete when you model it. The platform lets you stress-test the policy choices Vermont made — mandatory vs. voluntary participation, waiver design, and the budget-neutrality math CMS requires.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Model an 1115 waiver or all-payer global budget design against a pre-loaded state scenario | **Policy Simulator** — `/research-lab/policy-quality?tab=policy` | Compare a "more funding, same structure" path against a structural-reform path — the Oliver Wyman three-imperatives test. |
| Trace how a statutory mandate cascades into operational deadlines | **Vermont Act 167** — `/vermont-act-167` and **Act 68** — `/vermont-act-68` | Map each statutory deadline to the pillar it gates. |

*Figure 2.H — Hands-on platform tools for the Policy Pillar.*

""", "Implications"),

 "3": ("""## **Work This Chapter on the Platform**

Chapter 3 moves from policy architecture to federal-state practice. These tools quantify the waiver and Medicaid-policy decisions the chapter analyzes.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Estimate Medicaid coverage loss under H.R. 1's work-requirement and eligibility provisions | **Work Requirements Calculator** — `/research-lab/policy-quality?tab=medicaid-wr` | The gap between nominal exemptions and real-world coverage loss from administrative churn. |
| Model the H.R. 1 funding cliff for a state's Medicaid program | **H.R. 1 Cliff Scenario** — `/research-lab/policy-quality?tab=hr1-cliff` | How federal policy shifts the financial assumptions every downstream pillar depends on. |
| Test eligibility outcomes for a specific household | **Medicaid Eligibility Simulator** — `/medicaid-eligibility-simulator` | Where coverage transitions create gaps the clinical and equity pillars must absorb. |

*Figure 3.H — Hands-on platform tools for the Policy Pillar in practice.*

""", "Implications"),

 "4": ("""## **Work This Chapter on the Platform**

Chapter 4's data-infrastructure argument is best understood by building on the actual standards. The FHIR Lab turns the interoperability discussion into working resources.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Build FHIR R4 resources and map terminology across ICD-10, SNOMED, LOINC, RxNorm | **FHIR Interoperability Lab** — `/research-lab/interoperability?tab=fhir` | How a working data exchange differs from a data asset that merely "exists." |
| Stratify a population by CMS-HCC risk and see the attribution that global budgets require | **Risk Stratification Engine** — `/research-lab/interoperability?tab=risk` | Why technology must precede economics: you cannot manage a budget for a population you cannot see. |

*Figure 4.H — Hands-on platform tools for the Technology Pillar.*

""", "Implications"),

 "5": ("""## **Work This Chapter on the Platform**

Chapter 5's implementation reality — AI governance, CDS, and clinical data exchange — maps to three working labs.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Build an AI clinical governance framework across the model lifecycle | **AI Clinical Governance Lab** — `/research-lab/technology-ai?tab=ai` | The 65-item checklist as a go/no-go gate before any clinical AI deployment. |
| Model RPM and telehealth ROI by condition and CPT code | **Digital Health Lab** — `/research-lab/technology-ai?tab=digital` | Where digital health earns its cost — and where it adds alert fatigue without value. |
| Exercise clinical data exchange and HL7 messaging | **Clinical Data Exchange Lab** — `/research-lab/vbc-clinical-quality?tab=hl7` | The integration work that makes near-real-time care management possible. |

*Figure 5.H — Hands-on platform tools for the Technology Pillar in practice.*

""", "Implications"),

 "6": ("""## **Work This Chapter on the Platform**

Chapter 6's payment-reform argument — reference-based pricing, global budgets, the fee-for-service trap — is fully modelable. Reproduce the chapter's Vermont numbers and then run your own.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Design an APM and model a 5-year global-budget transition with Vermont's All-Payer TCOC preset | **APM Design Lab** — `/research-lab/payment-models?tab=apm-design` and **Global Budget Transition Modeler** — `/research-lab/payment-models?tab=gb-transition` | How a binding revenue envelope changes the volume incentive the chapter describes. |
| Stress-test a hospital's finances under RBP, global-budget, and Medicaid-cut scenarios | **Hospital Financial Stress Test** — `/research-lab/policy-quality?tab=scorecard` | Reproduce the Oliver Wyman finding: 13 of 14 hospitals in operating loss by 2028 under the conservative scenario. |

*Figure 6.H — Hands-on platform tools for the Economics Pillar.*

""", "Implications"),

 "7": ("""## **Work This Chapter on the Platform**

Chapter 7's VBC financial mechanics — shared savings, risk, contract analysis, readiness — are exactly what these calculators do.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Model shared savings/loss under any APM contract (benchmark PMPM, sharing rate, MSR, stop-loss) | **Shared Savings Calculator** — `/research-lab/payment-models?tab=apm-calc` | Pessimistic/base/optimistic spread — the difference between a viable contract and a "managing blind" one. |
| Score an organization's value-based-care readiness across six domains | **VBC Readiness Assessment** — `/research-lab/knowledge-workspace?tab=readiness` | Which domain is the binding constraint before assuming downside risk. |
| Run a cost-effectiveness analysis on a proposed intervention | **CEA Calculator** — `/research-lab/payment-models?tab=cea` | Whether the ROI case survives contact with the numbers. |

*Figure 7.H — Hands-on platform tools for the Economics Pillar in practice.*

""", "Implications"),

 "8": ("""## **Work This Chapter on the Platform**

Chapter 8's clinical-redesign argument — the Blueprint, Collaborative Care, panel risk — rests on stratification and quality measurement you can run directly.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Stratify a clinical panel by risk tier and match staffing intensity | **Risk Stratification Methodology** — `/research-lab/vbc-clinical-quality?tab=risk` | How panel design changes when staffing follows risk rather than volume. |
| Model HEDIS measure performance against NCQA benchmarks | **VBC Quality Measures** — `/research-lab/vbc-clinical-quality?tab=quality` | Which measures move population outcomes vs. which only move scores. |

*Figure 8.H — Hands-on platform tools for the Clinical Pillar.*

""", "Implications"),

 "9": ("""## **Work This Chapter on the Platform**

Chapter 9's quality mechanics — HEDIS improvement, value vs. waste, optimization — map to the clinical-quality bench.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Optimize HEDIS, Star Ratings, and MIPS performance with payment-adjustment estimates | **Clinical Quality Optimizer** — `/research-lab/policy-quality?tab=quality` | The payment consequence of each quality decision under value-based contracts. |
| Separate high-value from low-value care across services | **High vs. Low Value Care** — `/research-lab/vbc-clinical-quality?tab=value` | Where reducing volume improves both margin and outcomes. |

*Figure 9.H — Hands-on platform tools for the Clinical Pillar in practice.*

""", "Implications"),

 "10": ("""## **Work This Chapter on the Platform**

Chapter 10's equity argument — closing gaps rather than averaging them — is exactly what the Health Equity Studio measures.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Compute the HEROI composite across access, quality, outcome, SDOH burden, and trust | **Health Equity Studio** — `/research-lab/population-equity?tab=equity` | Whether an intervention closes the gap or just raises the average while the gap persists. |
| Model disease progression and intervention ROI for a defined cohort | **Population Health Modeler** — `/research-lab/population-equity?tab=population` | How upstream SDOH investment changes 5–10 year outcomes for the highest-risk segment. |

*Figure 10.H — Hands-on platform tools for the Equity Pillar.*

""", "Implications"),

 "11": ("""## **Work This Chapter on the Platform**

Chapter 11's operations argument — administrative cost, workforce, execution — is measurable on the knowledge-and-workspace bench.

| Do this | On this tool | What to look for |
| :---- | :---- | :---- |
| Track six-pillar transformation status against baseline and target | **Transformation Scorecard** — `/research-lab/knowledge-workspace?tab=scorecard` | Whether operational capacity is keeping pace with the statutory execution timeline. |
| Project physician and nurse supply/demand and the cost of turnover | **Workforce Modeler** — `/research-lab/knowledge-workspace?tab=workforce` | The workforce gap that the $1,303 per-discharge administrative-cost gap must fund closing. |

*Figure 11.H — Hands-on platform tools for the Operations Pillar.*

""", "Implications"),
}

# Insert each block before the FIRST "## **Implications for You**" that follows
# that chapter's "# **Chapter N:**" heading.
def chapter_span(num):
    m=re.search(rf'^# \*\*Chapter {num}:', text, re.M)
    if not m: return None,None
    start=m.start()
    nxt=re.search(r'^# \*\*(Chapter|Conclusion|Appendix)', text[m.end():], re.M)
    end=m.end()+nxt.start() if nxt else len(text)
    return start,end

inserted=[]
for num,(block,_) in BLOCKS.items():
    if f"## **Work This Chapter on the Platform**\n\n"+block.split('\n',2)[2][:40] in text:
        pass
    start,end=chapter_span(num)
    if start is None: continue
    seg=text[start:end]
    if "Work This Chapter on the Platform" in seg:
        continue  # already inserted
    mi=re.search(r'^## \*\*Implications for You\*\*', seg, re.M)
    if not mi:
        print(f"  Ch{num}: no Implications heading found — SKIPPED"); continue
    abs_at=start+mi.start()
    text=text[:abs_at]+block+text[abs_at:]
    inserted.append(num)

open(PATH,'w',encoding='utf-8').write(text)
print("Inserted hands-on sections for chapters:", inserted)
