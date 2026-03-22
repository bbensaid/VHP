import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Start an Engagement | HTR Advisory",
  description:
    "Submit an inquiry to HTR Advisory. Strategic consulting, IT project advisory, independent reviews, financial auditing, regulatory counsel, capability assessments, and executive training.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-20 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <span className="text-fuchsia-600 font-bold uppercase tracking-widest text-xs mb-4 block">
            Start an Engagement
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Let&apos;s Talk About Your Challenge
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you need a 2-week policy brief or a 12-month transformation advisory — tell us what you&apos;re facing and we&apos;ll scope the right engagement.
          </p>
        </div>
      </div>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT: The Form */}
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-200 md:w-2/3">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Submit an Inquiry</h3>
            <p className="text-slate-500 text-sm mb-8">Complete all required fields (*). The more detail you provide, the better we can scope your engagement.</p>
            <ContactForm />
          </div>

          {/* RIGHT: Trust Signals + Contact Info */}
          <div className="md:w-1/3 space-y-5">

            {/* Response Time */}
            <div className="bg-fuchsia-600 text-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-bold mb-4 border-b border-fuchsia-500 pb-3">What Happens Next</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-fuchsia-700 flex items-center justify-center text-xs font-black shrink-0">1</span>
                  <div>
                    <p className="text-sm font-bold">Within 48 hours</p>
                    <p className="text-fuchsia-200 text-xs">A principal advisor reviews your inquiry and responds with initial thoughts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-fuchsia-700 flex items-center justify-center text-xs font-black shrink-0">2</span>
                  <div>
                    <p className="text-sm font-bold">Discovery Call (30 min)</p>
                    <p className="text-fuchsia-200 text-xs">We schedule a no-obligation call to understand the scope and recommend the right service line.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-fuchsia-700 flex items-center justify-center text-xs font-black shrink-0">3</span>
                  <div>
                    <p className="text-sm font-bold">Proposal Within 5 Days</p>
                    <p className="text-fuchsia-200 text-xs">We deliver a scoped proposal with team, timeline, deliverables, and pricing for your review.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Guide */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="text-base font-bold text-gray-900 mb-3">Not Sure Which Service?</h4>
              <p className="text-gray-600 text-sm mb-4">View our full services catalog with pricing guidance and comparison matrix.</p>
              <Link
                href="/advisory/services"
                className="block w-full text-center py-2.5 border-2 border-fuchsia-600 text-fuchsia-600 font-bold text-sm rounded-lg hover:bg-fuchsia-50 transition-colors"
              >
                View All Services & Pricing →
              </Link>
            </div>

            {/* Direct Contact */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-700">
              <h4 className="text-base font-bold mb-4 border-b border-slate-700 pb-3">Direct Contact</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">General Inquiries</p>
                  <p className="text-sm font-medium text-slate-200">advisory@htr.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Government / Policy Inquiries</p>
                  <p className="text-sm font-medium text-slate-200">policy@htr.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Media & Press</p>
                  <p className="text-sm font-medium text-slate-200">press@htr.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Phone</p>
                  <p className="text-sm font-medium text-slate-200">+1 (802) 555-0123</p>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Our Offices</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Burlington, VT</p>
                  <p className="text-gray-500 text-xs mt-0.5">120 St. Paul Street<br />Burlington, VT 05401</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Washington, DC</p>
                  <p className="text-gray-500 text-xs mt-0.5">1400 K Street NW<br />Washington, DC 20005</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4">Remote engagements served nationwide.</p>
            </div>

            {/* Confidentiality */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="flex gap-3 items-start">
                <span className="text-xl shrink-0">🔒</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Confidentiality Guaranteed</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">All inquiries are treated as confidential. We sign mutual NDAs at the start of any substantive engagement, and never discuss client identities without explicit permission.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
