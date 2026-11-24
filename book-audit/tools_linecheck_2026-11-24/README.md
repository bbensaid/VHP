# Research Lab tools line check — 2026-11-24

## Scope and method

`scan_tools.py` starts from every tool route in `lib/taxonomy/tools.ts`: the research-lab benches and the 10
standalone tool pages. It follows imports to collect the 171 files those routes render.

**Pass 1** flags every display line that carries a figure with no source marker within two lines: 158 lines in
39 files (`flags.json`).

**Pass 2** repeats the scan but no longer accepts weak markers such as "default", "scenario" or "input" as a
source. That surfaced 53 more lines.

**Pass 3** greps the same files for unsourced superlatives and social proof ("first", "only", "proven",
"clients", "trusted by").

Every flagged line was read. Each was confirmed against its source document (CMS RVU26D file, PubMed via
E-utilities, GMCB reports), corrected, labelled as a model assumption, or deleted.

## Fixed

### Invented, removed

- **LabAdvisoryCTA** showed "97% client satisfaction", "35+ states served" and "5 days to proposal". There are
  no clients, so all three are deleted.
- **ActuarialLab, Part D:** the LIS toggle applied invented "85%" and "30%" out-of-pocket reductions. The
  "partial subsidy" tier no longer exists, because the IRA merged it into full Extra Help up to 150% FPL from
  2024. Toggle and multipliers removed; a factual note replaces them.

### Contradicted the evidence

- **DigitalHealthLab:** "AI-Assisted Documentation saves 40–60 min/day" became 8–22 min/day. That is the range
  from two 2025 RCTs: Lukac (about 23 seconds per note, net of control) and Afshar (0.36 hours a day). Every
  other intervention's time saving and cost is now labelled a model assumption.

### Wrong citations (checked on PubMed)

- **HTAStudio threshold:**
  - "Kemp et al. (BMJ 2015)" corrected to Kemp & Prasad (BMC Med 2017).
  - "Haslam et al. (JAMA Oncol 2019)" corrected to Eur J Cancer 2019.
  - "Prasad & Gale (JAMA Oncol 2016)" was a leukemia paper; replaced with Prasad, Kim & Burotto (JAMA Intern
    Med 2015).
  - UKPDS 35 and Stratton 2000 were the same paper listed twice; merged.

### Model parameters stated as fact

These are now labelled as model parameters or assumptions:

- HTA: ORR at 0.003 QALY, and ~30% fracture-risk reduction per SD.
- ActuarialLab: the "40% death-spiral threshold" and "mandate cuts exit rate ~30%".
- DigitalHealth: unit costs of $150, $400, $250, $12 and $0.50.
- Impact simulation: broadband costs of $20M and $50M+.
- Risk-tier population and cost shares, now marked illustrative.

### Unsourced claims removed

- AI fairness: AUC-cost percentages.
- VBC: "identify $1M+ in modifiable spend in your ACO".
- Workforce: "Typical range 50–200% above staff rate".
- Risk methodology: "CMS-HCC used for all Medicare VBC contracts" now names the programs that use it.

### Stale facts

- The Medicaid eligibility simulator said Dr. Dynasaur has "small premiums above 225% FPL". Vermont Health
  Connect says premiums are currently suspended.

### Citations added

- VCCI's ~39% of Medicaid spend from the top 5%, historically (DVHA, 2017).
- Impact simulation: the 108% silver premium rise (Oliver Wyman: $456 in 2018 to $948 in 2024) and 65+ above
  30% by 2040 (Oliver Wyman, as cited in the book).
- DigitalHealth: the RPM rate table now names its source.

## Confirmed and kept

- **RPM rates** match the CMS CY2026 RVU file × $33.4009: $21.71, $52.11, $52.11, $51.77, $26.05 and $41.42.
- **PolicySimulator site-neutral rates** carry CMS CY2026 PFS, OPPS, ASC and CLFS file sources.
- **Part D:** 2023 parameters ($505, $7,400) and 2026 parameters ($615, $2,100).
- **ACA rating rules:** AV tiers 60/70/80/90, 3:1 age rating, 50% tobacco surcharge, CSR 87%/94%.
- **MSSP Basic:** 40% sharing, 10% cap, MSR 2.0–3.9%.
- **Study figures:** CTT 22% per mmol/L; UKPDS 35 at 21% and 37%; Larochelle 59% and 38%; Levine 38%; Birkmeyer.
- **Oregon RBP:** more than $100M in the first 27 months (GMCB Act 68 report, checked in the PDF).
- **Other sourced figures:** $1,303 per discharge (book Ch11 and AHS); RHTP $10B a year and $195M; CBO $911B;
  NSI 16.4% turnover.
- **Labelled content:** scorecard benchmarks are shown as "HTR suggested target"; synthetic teaching patients
  and scenario sliders are labelled.

## Policy articles

One correction to the policy-analysis line check. Batch 3 removed "65+ above 30% by 2040" from the
rural-precipice article as unconfirmed, but it is Oliver Wyman's projection and is cited in the book.
`batch5_restore.json` puts it back with the attribution.
