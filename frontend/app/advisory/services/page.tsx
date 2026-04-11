import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "All Advisory Services | HTR Advisory",
  description:
    "Complete catalog of HTR Advisory services: strategic consulting, custom research, IT project consulting, independent reviews, capability assessments, financial auditing, regulatory advisory, and training.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <span className="text-fuchsia-600 font-bold uppercase tracking-widest text-xs mb-3 block">HTR Advisory</span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">All Services</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Eight practice areas spanning all six HTR pillars. Every service is grounded in the same daily intelligence research that powers the HTR platform — applied to your specific strategic challenge.
          </p>
        </div>
      </div>

      {/* ── SERVICES LIST ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16 space-y-12">
        {ADVISORY_SERVICES.map((service, index) => (
          <div key={service.id} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
            {/* Header */}
            <div className={`p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-start gap-6`}>
              <div className={`w-14 h-14 ${service.accentBg} ${service.accentText} rounded-xl flex items-center justify-center text-3xl shrink-0 border ${service.accentBorder}`}>
                {service.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Service {String(index + 1).padStart(2, "0")}</span>
                  {service.pillars.map((p) => (
                    <span key={p} className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${PILLAR_STYLES[p].bg} ${PILLAR_STYLES[p].text} ${PILLAR_STYLES[p].border}`}>
                      {PILLAR_STYLES[p].label}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">{service.title}</h2>
                <p className="text-slate-600 leading-relaxed">{service.shortDescription}</p>
              </div>
              <Link
                href={service.href}
                className={`shrink-0 px-6 py-3 rounded-lg font-bold text-sm ${service.accentBg} ${service.accentText} border ${service.accentBorder} hover:opacity-80 transition-opacity whitespace-nowrap`}
              >
                Full Details →
              </Link>
            </div>

            {/* Deliverables + Quick Facts */}
            <div className="p-6 md:p-8 bg-white">
              <div className="md:flex gap-10">
                <div className="md:w-1/2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Key Deliverables</p>
                  <ul className="space-y-2">
                    {service.deliverables.slice(0, 4).map((d) => (
                      <li key={d} className="flex gap-2 items-start text-sm text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${service.accentText.replace("text-", "bg-")}`}></span>
                        {d}
                      </li>
                    ))}
                    {service.deliverables.length > 4 && (
                      <li className="text-xs text-slate-400 font-medium pl-3.5">+ {service.deliverables.length - 4} more deliverables</li>
                    )}
                  </ul>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Engagement Snapshot</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 font-medium">Scope</p>
                      <p className="text-sm font-bold text-slate-900">{service.scope}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 font-medium">Typical Duration</p>
                      <p className="text-sm font-bold text-slate-900">{service.typicalDuration}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 font-medium">Starting Price</p>
                      <p className="text-sm font-bold text-fuchsia-600">{service.startingPrice}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 font-medium">Best For</p>
                      <p className="text-sm font-bold text-slate-900">{service.bestFor}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Client Types</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.clientTypes.map((ct) => (
                        <span key={ct} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{ct}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── COMPARISON MATRIX ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Services at a Glance</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-indigo-700 text-white">
                <th className="text-left px-5 py-4 font-black">Service</th>
                <th className="text-left px-4 py-4 font-bold">Duration</th>
                <th className="text-left px-4 py-4 font-bold">Starting Price</th>
                <th className="text-left px-4 py-4 font-bold hidden md:table-cell">Best For</th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {ADVISORY_SERVICES.map((service, i) => (
                <tr key={service.id} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{service.icon}</span>
                      <span className="font-bold text-slate-900">{service.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{service.typicalDuration}</td>
                  <td className="px-4 py-4 font-bold text-fuchsia-600">{service.startingPrice}</td>
                  <td className="px-4 py-4 text-slate-600 hidden md:table-cell">{service.bestFor}</td>
                  <td className="px-4 py-4">
                    <Link href={service.href} className="text-fuchsia-600 font-bold hover:underline whitespace-nowrap">
                      Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-indigo-700 text-white rounded-2xl p-10 md:p-14 text-center">
          <h2 className="text-3xl font-black mb-4">Not Sure Where to Start?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Book a 30-minute no-obligation discovery call. We&apos;ll identify the right service line and scope a proposal — no pressure, no commitment.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-fuchsia-600 text-white font-black text-lg rounded-lg hover:bg-fuchsia-500 transition-colors shadow-lg"
          >
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </div>
  );
}
