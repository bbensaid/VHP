import Link from "next/link";
import CategoryPage from "@/components/CategoryPage";

function GenomicsContent() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      {/* Hero */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 rounded-full px-3 py-1 mb-4">
          Clinical · Genomics & Precision Medicine
        </span>
        <h1 className="text-4xl font-black text-slate-900 mb-3">
          Genomics & Predictive Medicine
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          From germline sequencing and pharmacogenomics to polygenic risk scores and AI-driven
          clinical decision support — the molecular frontier of preventive and personalized care.
        </p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🧬",
            title: "Germline Genomics & Hereditary Risk",
            items: [
              "BRCA1/BRCA2: hereditary breast & ovarian cancer syndrome",
              "Lynch syndrome: MLH1, MSH2, MSH6, PMS2, EPCAM",
              "Hereditary cardiovascular: LDLR, APOB, PCSK9 (FH), MYH7/MYBPC3 (HCM)",
              "Hereditary colorectal: APC, MUTYH, STK11",
              "Multi-gene panel testing: when to order vs. sequential testing",
              "Variant classification: Pathogenic → Benign (ACMG/AMP 5-tier system)",
            ],
          },
          {
            icon: "💊",
            title: "Pharmacogenomics (PGx)",
            items: [
              "CYP2D6: codeine, tamoxifen, TCAs, opioids — poor/ultra-rapid metabolizers",
              "CYP2C19: clopidogrel, SSRIs, PPIs — loss-of-function alleles",
              "TPMT/NUDT15: thiopurines (azathioprine, 6-MP) — myelosuppression risk",
              "SLCO1B1: statin-induced myopathy risk stratification",
              "HLA-B*5701: abacavir hypersensitivity screening",
              "DPYD: fluorouracil/capecitabine severe toxicity prevention",
            ],
          },
          {
            icon: "📊",
            title: "Polygenic Risk Scores (PRS)",
            items: [
              "Methodology: GWAS-derived allele weights, LD pruning, validation cohorts",
              "Coronary artery disease PRS: 10-fold risk stratification improvement",
              "Breast cancer PRS: refining absolute risk with BRCA carriers",
              "Type 2 diabetes PRS: early lifestyle intervention targeting",
              "Population screening applications vs. individual clinical utility",
              "Limitations: ancestry-specific bias, low penetrance variants",
            ],
          },
          {
            icon: "🔬",
            title: "Somatic / Tumor Genomics",
            items: [
              "Next-generation sequencing (NGS) tumor panels: MSK-IMPACT, FoundationOne",
              "Tumor mutational burden (TMB): immunotherapy response prediction",
              "Microsatellite instability (MSI): Lynch screening + pembrolizumab eligibility",
              "KRAS/NRAS/BRAF: colorectal and lung targeted therapy selection",
              "HER2, EGFR, ALK, ROS1: breast and lung actionable alterations",
              "Liquid biopsy (ctDNA): treatment monitoring, MRD detection",
            ],
          },
          {
            icon: "🤖",
            title: "AI in Clinical Genomics",
            items: [
              "Variant interpretation: AI-assisted ACMG classification (Alamut, InterVar)",
              "Phenotype-to-gene matching: Face2Gene, Phenomizer for rare disease",
              "Radiogenomics: imaging features correlating with molecular subtypes",
              "AI-driven sepsis prediction: Epic Sepsis Model, Johns Hopkins ACG",
              "Deterioration early warning: NEWS2, MEWS, Epic Deterioration Index",
              "Real-time clinical decision support integration in EHR workflows",
            ],
          },
          {
            icon: "💰",
            title: "Reimbursement & Implementation",
            items: [
              "CPT codes: 81161 (BRCA1/2), 81206-81208 (BCR-ABL), 81455 (solid tumor panels)",
              "LCD/NCD coverage: MolDX program, ADLT/MAAA code pathways",
              "Prior authorization burden: 74% of genomic tests require PA",
              "Preventive vs. diagnostic billing: USPSTF grade A/B implications",
              "Program economics: lab build vs. buy, reference lab partnerships",
              "Informed consent, re-contact obligations, return of incidental findings",
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

      {/* PGx Gene-Drug Reference Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💊</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pharmacogenomics Quick Reference</h2>
            <p className="text-sm text-slate-500">High-impact gene-drug interactions with clinical action recommendations (CPIC Guidelines)</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-28">Gene</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Drug(s)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Phenotype Risk</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">CPIC Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { gene: "CYP2D6", drugs: "Codeine, Oxycodone, Tamoxifen", risk: "PM: no effect; UM: toxicity", action: "Avoid codeine in PM/UM; alternative opioid", severity: "high" },
                { gene: "CYP2C19", drugs: "Clopidogrel, Escitalopram, PPIs", risk: "PM/IM: reduced clopidogrel activation → MACE risk", action: "Use prasugrel/ticagrelor in PM/IM for ACS", severity: "high" },
                { gene: "TPMT / NUDT15", drugs: "Azathioprine, 6-MP, Thioguanine", risk: "Poor metabolizer: severe myelosuppression", action: "Reduce dose 10-fold or use alternative in PM", severity: "high" },
                { gene: "SLCO1B1", drugs: "Simvastatin, Atorvastatin", risk: "c.521T>C: statin myopathy / rhabdomyolysis", action: "Use ≤20mg simvastatin or switch to pravastatin", severity: "moderate" },
                { gene: "HLA-B*5701", drugs: "Abacavir (HIV)", risk: "Carriers: severe hypersensitivity reaction (HSR)", action: "Do NOT use abacavir in HLA-B*5701 carriers", severity: "high" },
                { gene: "DPYD", drugs: "5-Fluorouracil, Capecitabine", risk: "Variant carriers: severe/fatal toxicity", action: "Reduce starting dose 50% in heterozygotes", severity: "high" },
                { gene: "UGT1A1", drugs: "Irinotecan, Belinostat", risk: "*28 homozygous: severe neutropenia", action: "Reduce starting dose; increase monitoring", severity: "moderate" },
                { gene: "CYP2C9 + VKORC1", drugs: "Warfarin", risk: "Combined variants alter therapeutic dose range", action: "Use CPIC/FDA pharmacogenomic dosing algorithm", severity: "moderate" },
              ].map((row) => (
                <tr key={row.gene} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-rose-700">{row.gene}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.drugs}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.risk}</td>
                  <td className="py-3">
                    <div className="flex items-start gap-2">
                      <span className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${row.severity === "high" ? "bg-rose-500" : "bg-amber-400"}`} />
                      <span className="text-slate-700 text-xs leading-snug">{row.action}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Source: CPIC Guidelines (cpicpgx.org), FDA Table of Pharmacogenomic Biomarkers. PM = Poor Metabolizer, UM = Ultra-Rapid Metabolizer, IM = Intermediate Metabolizer.</p>
      </div>

      {/* Genomic Testing ROI Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Carrier Screening Economics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Carrier Screening Program Economics</h3>
          <p className="text-sm text-slate-500 mb-5">Cost per case identified — population-level analysis</p>
          <div className="space-y-4">
            {[
              { condition: "BRCA1/2 (expanded criteria)", costPerTest: 250, prevalence: 1, casesPerK: 10, costPerCase: 25000 },
              { condition: "Cystic Fibrosis carrier", costPerTest: 180, prevalence: 4, casesPerK: 40, costPerCase: 4500 },
              { condition: "Spinal Muscular Atrophy", costPerTest: 195, prevalence: 0.54, casesPerK: 5.4, costPerCase: 36111 },
              { condition: "Fragile X syndrome", costPerTest: 210, prevalence: 0.4, casesPerK: 4, costPerCase: 52500 },
            ].map((row) => (
              <div key={row.condition} className="p-3 bg-slate-50 rounded-xl">
                <div className="font-medium text-slate-800 text-sm mb-2">{row.condition}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-base font-black text-rose-600">${row.costPerTest}</div>
                    <div className="text-[10px] text-slate-400">Cost/test</div>
                  </div>
                  <div>
                    <div className="text-base font-black text-indigo-600">1 in {Math.round(1000 / row.casesPerK)}</div>
                    <div className="text-[10px] text-slate-400">Prevalence</div>
                  </div>
                  <div>
                    <div className="text-base font-black text-emerald-600">${(row.costPerCase / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-slate-400">Cost/case ID</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Medicine Tools */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">AI Predictive Medicine Toolbox</h3>
          <p className="text-sm text-slate-500 mb-5">Validated clinical AI models in active clinical use</p>
          <div className="space-y-3">
            {[
              {
                tool: "Epic Sepsis Model (ESM)",
                use: "ICU/floor early sepsis detection",
                auc: "0.74",
                sensitivity: "63%",
                implementation: "Epic EHR — real-time alert",
                badge: "bg-rose-100 text-rose-700",
              },
              {
                tool: "CMS Hierarchical Condition Cat. (HCC)",
                use: "Annual risk score for Medicare Advantage",
                auc: "~0.87",
                sensitivity: "Population-level",
                implementation: "CMS payment methodology",
                badge: "bg-sky-100 text-sky-700",
              },
              {
                tool: "Epic Deterioration Index (EDI)",
                use: "General ward rapid deterioration risk",
                auc: "0.87",
                sensitivity: "79%",
                implementation: "Epic EHR — NEWS2 successor",
                badge: "bg-emerald-100 text-emerald-700",
              },
              {
                tool: "Optum Clinical Risk Grouper",
                use: "Population stratification, care management",
                auc: "0.82",
                sensitivity: "Predictive cost",
                implementation: "Payer/ACO analytics platform",
                badge: "bg-indigo-100 text-indigo-700",
              },
            ].map((tool) => (
              <div key={tool.tool} className="p-3 rounded-xl border border-slate-200">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-slate-800 text-sm">{tool.tool}</div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tool.badge}`}>AUC {tool.auc}</span>
                </div>
                <div className="text-xs text-slate-500">{tool.use}</div>
                <div className="text-[10px] text-slate-400 mt-1">{tool.implementation} · Sensitivity: {tool.sensitivity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACMG Variant Classification Framework */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-2">ACMG/AMP Variant Classification Framework</h2>
        <p className="text-slate-400 text-sm mb-6">Five-tier system for germline variant interpretation — used by all clinical genomics labs</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { tier: "1", label: "Pathogenic", abbr: "P", color: "bg-rose-600", desc: "Strong evidence of disease causation. Clinical action warranted.", action: "Report + Act" },
            { tier: "2", label: "Likely Pathogenic", abbr: "LP", color: "bg-orange-500", desc: ">90% probability of pathogenicity. Treat as pathogenic.", action: "Report + Act" },
            { tier: "3", label: "Variant of Uncertain Significance", abbr: "VUS", color: "bg-amber-500", desc: "Insufficient evidence to classify. Do NOT use for clinical decisions.", action: "Monitor/Reclassify" },
            { tier: "4", label: "Likely Benign", abbr: "LB", color: "bg-sky-500", desc: ">90% probability of benign. No clinical action needed.", action: "No Action" },
            { tier: "5", label: "Benign", abbr: "B", color: "bg-emerald-500", desc: "Strong evidence of benign status. No clinical implications.", action: "No Action" },
          ].map((v) => (
            <div key={v.tier} className="bg-white/10 rounded-xl p-4">
              <div className={`w-10 h-10 rounded-full ${v.color} flex items-center justify-center text-white font-black text-sm mb-3`}>{v.abbr}</div>
              <div className="font-bold text-white text-sm mb-1">{v.label}</div>
              <div className="text-slate-300 text-xs leading-snug mb-2">{v.desc}</div>
              <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${v.action === "Report + Act" ? "bg-rose-500/30 text-rose-300" : v.action === "Monitor/Reclassify" ? "bg-amber-500/30 text-amber-300" : "bg-emerald-500/30 text-emerald-300"}`}>
                {v.action}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4">Richards et al., Genet Med 2015. VUS rate varies: ~40% in BRCA panels for unaffected individuals, ~10% for high-risk probands.</p>
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Latest Analysis & Research</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <GenomicsContent />
      <CategoryPage
        pillar="Clinical"
        title="Genomics & Predictive Medicine"
        description="Germline sequencing, pharmacogenomics, and AI-driven clinical prediction."
        colorClass="text-rose-700"
        category="Genomics"
        hideHeader
      />
    </>
  );
}
