import { Suspense } from "react";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Start an Engagement | HTR Advisory",
  description:
    "Submit an inquiry to HTR Advisory. Strategic consulting, IT project advisory, independent reviews, financial auditing, regulatory counsel, capability assessments, and executive training.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20 relative">

      {/* ── WATERMARK ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
        style={{ transform: "rotate(-30deg)" }}
      >
        <div className="text-center select-none">
          <p
            className="font-black uppercase tracking-widest text-slate-300 whitespace-nowrap"
            style={{ fontSize: "clamp(1.2rem, 3.5vw, 3rem)", lineHeight: 1.2 }}
          >
            Future Offering
          </p>
          <p
            className="font-black uppercase tracking-widest text-slate-300 whitespace-nowrap"
            style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.8rem)", lineHeight: 1.4 }}
          >
            Pending Availability of Qualified Volunteers
          </p>
        </div>
      </div>

      {/* ── AVAILABILITY BANNER ───────────────────────────────────────────── */}
      <div className="bg-amber-50 border-b-2 border-amber-300 py-3 px-4 text-center">
        <p className="text-sm font-bold text-amber-800">
          ⏳ Future Offering — Pending Availability of Qualified Volunteers.{" "}
          <span className="font-normal text-amber-700">This advisory service is not yet active. Submissions are recorded but cannot be acted upon until volunteer advisors are onboarded.</span>
        </p>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <span className="text-fuchsia-600 font-bold uppercase tracking-widest text-xs mb-4 block">
            Start an Engagement
          </span>
          <h1 className="ty-h1 font-bold mb-3 tracking-tight leading-tight">
            Let&apos;s Talk About Your Challenge
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you need a 2-week policy brief or a 12-month transformation advisory — tell us what you&apos;re facing and we&apos;ll scope the right engagement.
          </p>
        </div>
      </div>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT: The Form */}
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-200 md:w-2/3">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Submit an Inquiry</h3>
            <p className="text-slate-500 text-sm mb-8">Complete all required fields (*). The more detail you provide, the better we can scope your engagement.</p>
            <Suspense><ContactForm /></Suspense>
          </div>

          {/* RIGHT: Trust Signals + Contact Info */}
          <div className="md:w-1/3 space-y-5">

            {/* Future offering status */}
            <div className="bg-amber-600 text-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-bold mb-4 border-b border-amber-500 pb-3">Program Status</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-amber-700 flex items-center justify-center text-xs font-black shrink-0">⏳</span>
                  <div>
                    <p className="text-sm font-bold">Future Offering</p>
                    <p className="text-amber-100 text-xs">This advisory program is not yet active. We are in the process of onboarding qualified volunteer advisors before accepting engagements.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-amber-700 flex items-center justify-center text-xs font-black shrink-0">📋</span>
                  <div>
                    <p className="text-sm font-bold">Inquiries Recorded</p>
                    <p className="text-amber-100 text-xs">Submissions are logged and will be reviewed once the program launches. You will be contacted when advisors become available for your area of need.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-amber-700 flex items-center justify-center text-xs font-black shrink-0">✉️</span>
                  <div>
                    <p className="text-sm font-bold">Stay Informed</p>
                    <p className="text-amber-100 text-xs">Subscribe to HTR updates to be notified when the advisory program officially launches and begins accepting engagements.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services preview */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="text-base font-bold text-slate-900 mb-3">Explore What We Plan to Offer</h4>
              <p className="text-slate-600 ty-body mb-4">Browse the full services catalog to understand the scope of advisory support we are building toward.</p>
              <Link
                href="/advisory/services"
                className="block w-full text-center py-2.5 border-2 border-fuchsia-600 text-fuchsia-600 font-bold text-sm rounded-lg hover:bg-fuchsia-50 transition-colors"
              >
                View Services Overview →
              </Link>
            </div>

            {/* Direct Contact */}
            <div className="bg-indigo-700 text-white p-6 rounded-xl shadow-lg border border-indigo-600">
              <h4 className="text-base font-bold mb-4 border-b border-indigo-600 pb-3">Direct Contact</h4>
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
              <h4 className="text-base font-bold text-slate-900 mb-4 border-b border-gray-100 pb-3">Our Offices</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Burlington, VT</p>
                  <p className="text-slate-500 text-xs mt-0.5">120 St. Paul Street<br />Burlington, VT 05401</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Washington, DC</p>
                  <p className="text-slate-500 text-xs mt-0.5">1400 K Street NW<br />Washington, DC 20005</p>
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
