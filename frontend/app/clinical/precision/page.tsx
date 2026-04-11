import CategoryPage from "@/components/CategoryPage";

function PrecisionMedicineHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 rounded-full px-3 py-1 mb-4">
          Clinical · Precision Medicine
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">
          Precision & Personalized Medicine
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Targeted therapies, biomarker-driven treatment selection, companion diagnostics, and the
          operational infrastructure needed to deliver individualized care at scale.
        </p>
      </div>
    </div>
  );
}

function PrecisionMedicineBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Oncotype DX / Genomic Assay Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🧬</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Genomic Assay Comparison — Breast Cancer</h2>
            <p className="text-sm text-slate-500">FDA-cleared or NCCN Category 1 assays for early-stage breast cancer treatment decisions</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-36">Assay</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Genes</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Population</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Output</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Key Trial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { assay: "Oncotype DX", genes: "21-gene RT-PCR", pop: "ER+/HER2-, N0–N1 (1–3 nodes)", output: "Recurrence Score 0–100", trial: "TAILORx (RS ≤25: chemo no benefit)" },
                { assay: "MammaPrint", genes: "70-gene microarray", pop: "ER+, HER2-, early stage, age <70", output: "Low / High risk genomic", trial: "MINDACT (low genomic risk: chemo omission safe)" },
                { assay: "Prosigna (PAM50)", genes: "50-gene expression", pop: "ER+, HER2-, post-menopausal, N0–N1", output: "ROR score + intrinsic subtype", trial: "ABCSG-8 validation" },
                { assay: "EndoPredict (EPclin)", genes: "12-gene + tumor size + nodes", pop: "ER+, HER2-, N0–N1", output: "EPclin score: Low/High 10-yr DR", trial: "TransATAC, ABCSG-8 (European)" },
                { assay: "Breast Cancer Index", genes: "7-gene molecular subtype + HOXB13/IL17BR", pop: "ER+, N0, post-menopausal", output: "BCI score — Late recurrence risk (5–10yr)", trial: "MA.14, Stockholm" },
              ].map((row) => (
                <tr key={row.assay} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-rose-700">{row.assay}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.genes}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.pop}</td>
                  <td className="py-3 pr-4 text-slate-700 text-xs font-medium">{row.output}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.trial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">NCCN = National Comprehensive Cancer Network. DR = Distant Recurrence. All assays require ER/PR+ HER2- invasive breast cancer. Coverage: Medicare (MolDX), most commercial payers.</p>
      </div>

      {/* Precision Medicine Economics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Targeted Therapy Pricing Landscape</h3>
          <p className="text-sm text-slate-500 mb-5">Annual cost of select precision oncology agents (WAC, 2024)</p>
          <div className="space-y-3">
            {[
              { drug: "Osimertinib (Tagrisso)", indication: "EGFR+ NSCLC", cost: 211000, badge: "AstraZeneca" },
              { drug: "Sotorasib (Lumakras)", indication: "KRAS G12C NSCLC", cost: 180000, badge: "Amgen" },
              { drug: "Pembrolizumab (Keytruda)", indication: "PD-L1+, various", cost: 212000, badge: "Merck" },
              { drug: "Olaparib (Lynparza)", indication: "BRCA+ ovarian/breast", cost: 174000, badge: "AZ/MSD" },
              { drug: "Palbociclib (Ibrance)", indication: "HR+/HER2- breast", cost: 168000, badge: "Pfizer" },
              { drug: "Entrectinib (Rozlytrek)", indication: "NTRK fusion, ROS1", cost: 192000, badge: "Roche" },
            ].map((row) => (
              <div key={row.drug} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{row.drug}</div>
                  <div className="text-xs text-slate-500">{row.indication} · {row.badge}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-rose-600 text-lg">${Math.round(row.cost / 1000)}k</div>
                  <div className="text-[10px] text-slate-400">annual WAC</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">WAC = Wholesale Acquisition Cost. Net price after rebates typically 30–60% lower. Sources: SSR Health, Drug Channels.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Value Frameworks for Precision Therapy</h3>
          <p className="text-sm text-slate-500 mb-5">How ICER, ASCO, and ESMO assess clinical value</p>
          <div className="space-y-4">
            {[
              {
                framework: "ICER (Institute for Clinical and Economic Review)",
                badge: "bg-indigo-100 text-indigo-700",
                criteria: ["Cost per QALY threshold: $100K–$150K", "Net health benefit (NHB) rating: A–D", "Evidentiary basis: RCT vs. single-arm required", "Often sets PBM/payer prior auth benchmarks"],
              },
              {
                framework: "ASCO Value Framework",
                badge: "bg-rose-100 text-rose-700",
                criteria: ["Clinical benefit score (CBS): 0–130 for metastatic", "Toxicity penalty: −20 pts for Grade 3/4 events", "Bonus: tail of curve (LT survival), QoL improvement", "Net Health Benefit score drives value box"],
              },
              {
                framework: "ESMO-MCBS (Magnitude of Clinical Benefit Scale)",
                badge: "bg-emerald-100 text-emerald-700",
                criteria: ["Grades 1–5 (curative) or A–C (palliative)", "Grade 4–5 / A–B = high clinical benefit", "Threshold: ≥1.2 HR improvement OR median OS gain", "Used by EU HTA agencies for reimbursement decisions"],
              },
            ].map((fw) => (
              <div key={fw.framework} className="border border-slate-200 rounded-xl p-4">
                <div className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${fw.badge}`}>{fw.framework}</div>
                <ul className="space-y-1">
                  {fw.criteria.map((c) => (
                    <li key={c} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-slate-400 mt-0.5">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🎯",
            title: "Targeted Oncology Therapies",
            items: [
              "EGFR inhibitors (osimertinib): 1st-line NSCLC, T790M resistance mechanism",
              "ALK/ROS1 inhibitors (alectinib, crizotinib): rearrangement testing required",
              "HER2-directed: trastuzumab, pertuzumab, T-DM1 — breast, gastric, lung HER2+",
              "BRAF V600E: vemurafenib, dabrafenib + trametinib in melanoma/CRC",
              "KRAS G12C: sotorasib, adagrasib — first druggable KRAS mutations",
              "CDK4/6 inhibitors (palbociclib): HR+/HER2- breast; biomarker: ER/PR status",
            ],
          },
          {
            icon: "🧪",
            title: "Companion Diagnostics (CDx)",
            items: [
              "FDA CDx definition: test + therapy approved together as a unit",
              "PD-L1 IHC 22C3 (Dako): pembrolizumab eligibility in NSCLC, HNSCC, cervical",
              "MSI/dMMR testing: universal colorectal + pembrolizumab tumor-agnostic approval",
              "BRCA1/2 (BRACAnalysis CDx): olaparib/rucaparib eligibility in BRCA+ cancers",
              "NTRK fusion (Pan-Trk IHC): larotrectinib/entrectinib tumor-agnostic CDx",
              "HRD assay (Myriad myChoice): niraparib eligibility in HRD+ ovarian cancer",
            ],
          },
          {
            icon: "🩸",
            title: "Liquid Biopsy & ctDNA",
            items: [
              "Cell-free DNA (cfDNA) capture: Guardant360, FoundationOne Liquid CDx (FDA cleared)",
              "Circulating tumor DNA (ctDNA): detects somatic mutations, fusions, CNVs in plasma",
              "Minimal residual disease (MRD): Signatera, clonoSEQ — post-surgery clearance",
              "Treatment monitoring: rising ctDNA precedes radiographic progression by ~3 months",
              "Tumor mutational burden (bTMB): liquid proxy for solid tumor TMB immunotherapy prediction",
              "Limitations: low sensitivity early-stage; false-negatives from low shedding tumors",
            ],
          },
          {
            icon: "🔬",
            title: "Multi-Omics Integration",
            items: [
              "Proteomics: mass spectrometry protein expression profiling (CPTAC consortium)",
              "Metabolomics: disease-specific metabolite signatures for early detection",
              "Epigenomics: DNA methylation profiling — tissue of origin, cancer early detection",
              "Transcriptomics (RNA-seq): Oncotype DX, Mammaprint — breast recurrence prediction",
              "Spatial transcriptomics: 10x Visium — single-cell gene expression in tissue context",
              "Multi-omic integration platforms: TCGA, GDC, ICGC — federated genomic analysis",
            ],
          },
          {
            icon: "💊",
            title: "Pharmacogenomics in Practice",
            items: [
              "Pre-emptive PGx testing: panel ordered once, results embedded in EHR for lifetime use",
              "CDS integration: Epic Genomics, Cerner Genomics — alert fires at point of prescribing",
              "CPIC guidelines: 24 gene-drug pairs with actionable clinical recommendations",
              "Right Drug Right Dose (RDRD) model: Vanderbilt, Mayo, UCSF — population-scale PGx",
              "Payer coverage: BCBS, UHC covering pre-emptive PGx for Medicare Advantage (2024)",
              "ROI model: $800–$2,400 saved per patient by avoiding ADEs + failed therapeutic trials",
            ],
          },
          {
            icon: "🤖",
            title: "AI & Digital Biomarkers",
            items: [
              "Radiomics: extracting 1,000s of image features from CT/MRI — texture, shape, intensity",
              "PathAI, Paige.AI: deep learning pathology for HER2 scoring, tumor infiltrating lymphocytes",
              "Digital pathology: whole-slide imaging (WSI) + AI — Leica AIVIA, Hamamatsu NDP.serve",
              "Digital biomarkers: wearable-derived HRV, gait, voice for neurodegenerative monitoring",
              "Polygenic risk integration: 23andMe + Tempus — population + molecular risk combo",
              "FDA-cleared AI: OncotypeDX algorithm, Paige Prostate (FDA cleared DL for PCa Dx)",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-rose-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Implementation Imperatives */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Precision Medicine Program Imperatives</h2>
        <p className="text-slate-500 text-sm mb-6">What high-performing precision medicine programs get right</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              num: "01",
              title: "Molecular Tumor Board",
              body: "Weekly multidisciplinary review of complex genomic results — medical oncologist, pathologist, geneticist, bioinformatician. Essential for VUS interpretation and off-label CDx decisions.",
              color: "bg-white border-rose-200",
            },
            {
              num: "02",
              title: "Lab & CDx Infrastructure",
              body: "In-house NGS vs. send-out lab decision. Turnaround time (TAT) target: ≤7 days for somatic panels. CLIA/CAP accreditation + FDA-cleared CDx for reimbursable indications.",
              color: "bg-white border-amber-200",
            },
            {
              num: "03",
              title: "EHR Genomics Integration",
              body: "Structured genomic result storage (HL7 FHIR genomics IG). CDS alerts at prescribing. Longitudinal tracking of variant reclassifications. Epic Genomics or Syapse integration.",
              color: "bg-white border-sky-200",
            },
            {
              num: "04",
              title: "Financial Clearance Workflow",
              body: "Pre-authorization for CDx and targeted therapy simultaneously. Benefits investigation team. Patient assistance programs (PAP) for $0 copay programs. Appeals strategy for off-label use.",
              color: "bg-white border-emerald-200",
            },
          ].map((item) => (
            <div key={item.num} className={`rounded-xl p-5 border ${item.color}`}>
              <div className="text-2xl font-black text-slate-300 mb-2">{item.num}</div>
              <div className="font-bold text-slate-800 text-sm mb-2">{item.title}</div>
              <div className="text-slate-600 text-xs leading-relaxed">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function Page() {
  return (
    <>
      <PrecisionMedicineHero />
      <CategoryPage
        pillar="Clinical"
        title="Precision Medicine"
        description="Targeted therapies, companion diagnostics, liquid biopsy, and multi-omics integration."
        colorClass="text-rose-700"
        category="Precision"
        hideHeader
      />
      <PrecisionMedicineBody />
    </>
  );
}
