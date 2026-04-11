import Link from "next/link";

export const metadata = {
  title: "How We Work | HTR Advisory",
  description:
    "HTR Advisory's engagement methodology: Evidence-First, Practitioner-Led. 5-stage process, team composition, independence guarantee, quality assurance, and communication standards.",
};

export default function ApproachPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-8 border-b border-indigo-800">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs mb-4 block">HTR Advisory</span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 leading-tight">How We Work</h1>
          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            The best consulting advice in the world is worthless if you can&apos;t trust the process that produced it. HTR Advisory operates on a single principle: <strong className="text-white">Evidence-First, Practitioner-Led</strong> — and complete transparency about how we get to our conclusions.
          </p>
        </div>
      </div>

      {/* ── PHILOSOPHY ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🔬</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Evidence-First</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">Every recommendation traces to a specific piece of evidence — a CMS rule, a clinical trial, a financial model, a peer-reviewed study. We show our work, and we welcome challenges to our conclusions.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🧑‍⚕️</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Practitioner-Led</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">HTR advisors have direct operational experience in the domains they consult on — former hospital executives, health economists, clinical informaticists, and policy analysts with government service. Not just researchers.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Completely Independent</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">We have no vendor relationships, no referral arrangements, no political affiliations, and no preferred products. Our only commercial interest is your engagement fee — which means our only incentive is producing advice that actually works.</p>
          </div>
        </div>
      </div>

      {/* ── 5-STAGE ENGAGEMENT MODEL ──────────────────────────────────────── */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl font-black text-slate-900 mb-2">The 5-Stage Engagement Model</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">A transparent, structured process that keeps you informed — and in control — at every step.</p>
          <div className="space-y-8">
            {[
              {
                stage: "01",
                title: "Discovery Call",
                duration: "30–60 minutes · No obligation",
                desc: "A structured conversation with a principal advisor to understand your challenge, organizational context, and desired outcomes. We use this to identify the right service line, flag any conflicts of interest, and determine whether HTR Advisory is the right fit. You receive a written summary of the call within 24 hours.",
                outputs: ["Call summary memo", "Recommended service line", "Preliminary scope outline"],
              },
              {
                stage: "02",
                title: "Engagement Design",
                duration: "5–10 business days",
                desc: "We develop a formal Engagement Design document — our version of a Statement of Work, but more transparent. It specifies our methodology in plain language, the analytical frameworks we&apos;ll use, the data sources we&apos;ll access, team composition, and how we&apos;ll handle findings that are inconclusive or contrary to your hypothesis.",
                outputs: ["Formal Engagement Design document", "Team biography & role assignments", "Timeline with milestone schedule", "Data & access requirements list"],
              },
              {
                stage: "03",
                title: "Analysis & Interim Briefing",
                duration: "Weeks 3–10 (varies by service)",
                desc: "Active work begins. We provide a structured interim briefing at the midpoint — not just a status update, but preliminary findings. This gives your leadership team an opportunity to redirect the analysis if our early conclusions suggest a different question is more important than the original one. No surprises at final delivery.",
                outputs: ["Interim findings briefing (written + live)", "Data model / working analysis", "Revised scope (if needed)", "Risk register updates"],
              },
              {
                stage: "04",
                title: "Final Delivery",
                duration: "Final week",
                desc: "We deliver the written report or final product, followed by a live 90-minute readout session with your leadership team. We present findings, recommendations, and — critically — what we can&apos;t conclude with the available evidence. The readout is designed as a working session, not a presentation.",
                outputs: ["Full written report / deliverable", "Executive summary (1 page)", "Appendix with full methodology & data sources", "90-minute live readout session", "30-day follow-up Q&A access"],
              },
              {
                stage: "05",
                title: "Ongoing Advisory (Optional)",
                duration: "Quarterly or monthly retainer",
                desc: "Many clients convert their project engagements to an ongoing advisory retainer — quarterly strategy reviews, implementation check-ins, board presentation support, and on-call access to their assigned principal advisor as conditions evolve. No obligation, no automatic renewal.",
                outputs: ["Quarterly advisory sessions", "Implementation progress reviews", "Board presentation support", "On-call analyst access", "Annual engagement review & recalibration"],
              },
            ].map((stage) => (
              <div key={stage.stage} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 bg-indigo-700 text-white flex items-center justify-center p-6 shrink-0">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-black text-fuchsia-400">{stage.stage}</span>
                  </div>
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">{stage.title}</h3>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{stage.duration}</span>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">{stage.desc}</p>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Outputs</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.outputs.map((output) => (
                          <span key={output} className="text-xs bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 px-2 py-1 rounded-full font-medium">
                            {output}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM COMPOSITION ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Who You&apos;ll Work With</h2>
        <p className="text-slate-500 mb-10 max-w-2xl">Every HTR Advisory engagement is staffed with a defined team. No bait-and-switch — the advisors you meet in discovery are the advisors who work the engagement.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-fuchsia-200 rounded-xl p-8">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Principal Advisor</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">Leads every engagement. 15+ years of operational or policy experience in the relevant domain. Named at proposal stage and does not change without client notification and approval.</p>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex gap-2"><span className="text-fuchsia-600 shrink-0">✓</span>Primary client relationship owner</li>
              <li className="flex gap-2"><span className="text-fuchsia-600 shrink-0">✓</span>Signs off on all findings</li>
              <li className="flex gap-2"><span className="text-fuchsia-600 shrink-0">✓</span>Leads the readout session</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Research Analyst</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">Conducts the day-to-day analysis, literature review, financial modeling, and data work. Typically a specialist in one or two HTR pillars with deep quantitative skills.</p>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>Quantitative modeling & data analysis</li>
              <li className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>Literature review & evidence synthesis</li>
              <li className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>Available for client Q&A calls</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-8">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Domain Expert</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">Called in for specialized input — clinical workflows, regulatory interpretation, financial modeling validation, or equity framework application. Drawn from HTR&apos;s network of former policymakers, clinicians, and economists.</p>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>Engaged as needed, not billed as padding</li>
              <li className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>Identified by name in engagement design</li>
              <li className="flex gap-2"><span className="text-slate-400 shrink-0">✓</span>All credentials available on request</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── INDEPENDENCE & QA ─────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Independence Guarantee</h2>
              <div className="space-y-4">
                {[
                  { icon: "🚫", title: "No Vendor Relationships", desc: "HTR Advisory has no financial relationships with EHR vendors, technology companies, staffing firms, or any other commercial entities whose products we may evaluate or recommend." },
                  { icon: "🚫", title: "No Referral Fees", desc: "We do not accept referral fees, finder&apos;s fees, or commissions of any kind. If we recommend a vendor or partner, it is because they are the best option for your situation — full stop." },
                  { icon: "🚫", title: "No Undisclosed Subcontracting", desc: "We never outsource analytical work without prior client notification and approval. If we bring in a domain expert, you know who they are and what they're working on." },
                  { icon: "🚫", title: "No Conflicts of Interest", desc: "We disclose any real or potential conflicts of interest at the discovery call and will decline engagements where independence cannot be guaranteed." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Quality Assurance</h2>
              <div className="space-y-4">
                {[
                  { icon: "✅", title: "Peer Review on All Findings", desc: "Every deliverable is reviewed by a second HTR analyst before client delivery. Findings that cannot survive internal challenge don&apos;t make it into the report." },
                  { icon: "✅", title: "Methodology Documentation", desc: "Every analysis includes a full methodology appendix — data sources, analytical approach, assumptions, limitations. You can reproduce our work." },
                  { icon: "✅", title: "Inconclusive Findings Policy", desc: "We report what the evidence shows — including when the evidence is insufficient to reach a conclusion. We do not reverse-engineer findings to match client expectations." },
                  { icon: "✅", title: "30-Day Post-Delivery Access", desc: "After final delivery, your principal advisor remains available for 30 days to answer follow-up questions, clarify methodology, or assist with presentation of findings to your board." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMMUNICATION STANDARDS ───────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Communication Standards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Reporting Cadence</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-3"><span className="text-fuchsia-600 font-black shrink-0">Weekly</span>Written status update (5–7 bullet points) sent every Friday.</li>
              <li className="flex gap-3"><span className="text-fuchsia-600 font-black shrink-0">Biweekly</span>30-minute check-in call with principal advisor.</li>
              <li className="flex gap-3"><span className="text-fuchsia-600 font-black shrink-0">Midpoint</span>Full interim findings briefing with written memo.</li>
              <li className="flex gap-3"><span className="text-fuchsia-600 font-black shrink-0">Final</span>90-minute live readout + full written report.</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Escalation Protocol</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-black shrink-0">!</span>Scope questions → addressed within 24 hours by principal advisor.</li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black shrink-0">!!</span>Scope changes → formal change order within 48 hours, client approval required.</li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-black shrink-0">!!!</span>Critical findings → immediate notification, emergency briefing scheduled within 72 hours.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-linear-to-r from-fuchsia-600 to-slate-800 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Ready to Work Together?</h2>
          <p className="text-lg text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Start with a 30-minute discovery call. No commitment, no sales pitch — just a structured conversation about your challenge and whether HTR Advisory is the right partner.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Schedule a Discovery Call
          </Link>
        </div>
      </div>
    </div>
  );
}
