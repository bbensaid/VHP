import Link from 'next/link'

export interface EarlyAccessFeature {
  icon: string
  title: string
  description: string
}

export interface EarlyAccessStep {
  step: number
  title: string
  description: string
}

export interface ConnectEarlyAccessProps {
  icon: string
  title: string
  subtitle: string
  features: EarlyAccessFeature[]
  steps: EarlyAccessStep[]
  emailSubject: string
  backTab: string
  backLabel: string
}

export default function ConnectEarlyAccess({
  icon,
  title,
  subtitle,
  features,
  steps,
  emailSubject,
  backTab,
  backLabel,
}: ConnectEarlyAccessProps) {
  const mailtoHref = `mailto:connect@htr.com?subject=${encodeURIComponent(emailSubject)}`

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* HERO */}
      <div className="bg-teal-600 text-white py-16 border-b border-teal-700">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <span className="text-teal-200 font-bold uppercase tracking-widest text-xs mb-4 block">
            HTR Connect · Early Access
          </span>
          <div className="text-6xl mb-4">{icon}</div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 tracking-tight">{title}</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT: Features + Process */}
          <div className="flex-1 space-y-10">

            {/* What you get */}
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 mb-5">What This Gives You</h2>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <span className="text-2xl shrink-0">{f.icon}</span>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm mb-0.5">{f.title}</h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 mb-5">How It Works</h2>
              <div className="space-y-4">
                {steps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-black shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm mb-0.5">{s.title}</h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: CTA sidebar */}
          <div className="md:w-80 space-y-5 shrink-0">

            {/* Primary CTA */}
            <div className="bg-teal-600 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-black mb-2">Get Early Access</h3>
              <p className="text-teal-100 text-sm mb-5 leading-relaxed">
                This feature is in active development. Email us directly and we will
                add you to the early access list — a member of the HTR Connect team
                will follow up within 48 hours.
              </p>
              <a
                href={mailtoHref}
                className="block w-full text-center py-3 px-4 rounded-xl bg-white text-teal-700 font-black text-sm hover:bg-teal-50 transition-colors shadow"
              >
                Email connect@htr.com →
              </a>
              <p className="text-teal-200 text-xs mt-3 text-center">
                Subject pre-filled: &ldquo;{emailSubject}&rdquo;
              </p>
            </div>

            {/* Back to Connect */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <h3 className="font-black text-slate-900 text-base mb-2">Back to Connect Hub</h3>
              <p className="text-slate-500 text-sm mb-4">
                Explore all six Connect services while this feature is being built.
              </p>
              <Link
                href={`/connect-hub?tab=${backTab}`}
                className="block w-full text-center py-2.5 border-2 border-teal-600 text-teal-600 font-black text-sm rounded-lg hover:bg-teal-50 transition-colors"
              >
                ← {backLabel}
              </Link>
            </div>

            {/* Contact info */}
            <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-black text-base mb-4 border-b border-slate-700 pb-3">
                Direct Contact
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Connect Team</p>
                  <p className="text-sm font-medium text-slate-200">connect@htr.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">General Inquiries</p>
                  <p className="text-sm font-medium text-slate-200">info@htr.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Phone</p>
                  <p className="text-sm font-medium text-slate-200">+1 (802) 555-0123</p>
                </div>
              </div>
            </div>

            {/* Confidentiality */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="flex gap-3 items-start">
                <span className="text-xl shrink-0">🔒</span>
                <div>
                  <h4 className="font-black text-slate-900 text-sm mb-1">Confidentiality Guaranteed</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    All Connect inquiries are treated as confidential. We never share
                    member identities or organizational information without explicit permission.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
