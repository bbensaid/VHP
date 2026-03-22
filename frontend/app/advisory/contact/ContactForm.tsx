"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ADVISORY_SERVICES } from "@/lib/advisory-data";

// Maps Research Lab practice label → ADVISORY_SERVICES id
const PRACTICE_TO_SERVICE_ID: Record<string, string> = {
  "Health IT Consulting":          "it-consulting",
  "Strategic Consulting":          "consulting",
  "Regulatory & Compliance":       "regulatory",
  "Custom Research & Analysis":    "research",
  "Financial & Actuarial Audit":   "financial-audit",
}

export default function ContactForm() {
  const searchParams = useSearchParams()
  const fromLab      = searchParams.get("from") === "research-lab"
  const labCategory  = searchParams.get("category") || ""
  const labPractice  = searchParams.get("practice") || ""

  const [selectedService, setSelectedService] = useState(
    PRACTICE_TO_SERVICE_ID[labPractice] || ""
  )
  const isTraining = selectedService === "training"

  // If the URL changes (e.g. user navigates), sync the select
  useEffect(() => {
    if (labPractice) setSelectedService(PRACTICE_TO_SERVICE_ID[labPractice] || "")
  }, [labPractice])

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

      {/* Research Lab referral banner */}
      {fromLab && (
        <div className="flex items-start gap-3 bg-fuchsia-50 border border-fuchsia-200 rounded-xl px-5 py-4">
          <span className="text-2xl shrink-0">🔬</span>
          <div>
            <p className="text-sm font-bold text-fuchsia-800">
              You came from the Research Lab — {labCategory}
            </p>
            <p className="text-xs text-fuchsia-600 mt-0.5">
              We've pre-filled the service field based on your analysis. Describe what you were modeling in the challenge section below and we'll tailor our response.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1 — Contact Info */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
          01 — Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></span>
            <input type="text" required className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" placeholder="Dr. Jane Doe" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Work Email <span className="text-red-500">*</span></span>
            <input type="email" required className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" placeholder="jane@healthsystem.org" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Title / Role <span className="text-red-500">*</span></span>
            <input type="text" required className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" placeholder="Chief Information Officer" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Phone <span className="text-slate-400 text-xs font-normal">(optional)</span></span>
            <input type="tel" className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" placeholder="+1 (802) 555-0100" />
          </label>
        </div>
      </div>

      {/* SECTION 2 — Organization */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
          02 — Your Organization
        </h4>
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Organization Name <span className="text-red-500">*</span></span>
            <input type="text" required className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" placeholder="Mercy Regional Health System" />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Organization Type <span className="text-red-500">*</span></span>
              <select required className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
                <option value="">Select type...</option>
                <option>Health System / IDN</option>
                <option>Independent Hospital</option>
                <option>Physician Group / Medical Practice</option>
                <option>Payer / Insurer / Health Plan</option>
                <option>State / Federal Government Agency</option>
                <option>Private Equity / Investment Firm</option>
                <option>Academic Medical Center</option>
                <option>Technology Vendor</option>
                <option>Non-Profit / FQHC / Community Health</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Approximate Annual Revenue</span>
              <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
                <option value="">Select range...</option>
                <option>Under $50M</option>
                <option>$50M – $250M</option>
                <option>$250M – $1B</option>
                <option>$1B – $5B</option>
                <option>Over $5B</option>
                <option>Not Applicable / Government</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Engagement Details */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
          03 — Engagement Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Service of Interest <span className="text-red-500">*</span></span>
            <select
              required
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            >
              <option value="">Select a service...</option>
              {ADVISORY_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
              <option value="unsure">Not Sure — Help Me Choose</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Preferred Engagement Format</span>
            <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
              <option>Remote / Virtual</option>
              <option>On-Site</option>
              <option>Hybrid (Remote + On-Site)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Estimated Project Timeline</span>
            <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
              <option>ASAP (within 30 days)</option>
              <option>1 – 3 Months</option>
              <option>3 – 6 Months</option>
              <option>Planning Ahead (6+ months)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Budget Tier</span>
            <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
              <option>Under $25,000</option>
              <option>$25,000 – $75,000</option>
              <option>$75,000 – $250,000</option>
              <option>$250,000+</option>
              <option>Equity / Success-Fee Arrangement</option>
              <option>Government / Grant Funded</option>
            </select>
          </label>
        </div>
      </div>

      {/* SECTION 4 — Training Fields (conditional) */}
      {isTraining && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h4 className="text-xs font-black text-purple-700 uppercase tracking-widest mb-4 pb-2 border-b border-purple-200">
            04 — Training Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Team Size for Training</span>
              <select className="mt-2 block w-full px-4 py-3 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                <option>1 – 10 participants</option>
                <option>10 – 25 participants</option>
                <option>25 – 50 participants</option>
                <option>50 – 100 participants</option>
                <option>100+ participants</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Preferred Training Format</span>
              <select className="mt-2 block w-full px-4 py-3 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                <option>On-Site Workshop</option>
                <option>Virtual Cohort</option>
                <option>Executive 1:1 Coaching</option>
                <option>Custom Curriculum Development</option>
                <option>Not Sure Yet</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {/* SECTION 5 — Challenge Description */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
          {isTraining ? "05" : "04"} — Your Challenge
        </h4>
        <div className="space-y-5">
          <div>
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-3">Urgency</span>
            <div className="flex flex-wrap gap-4">
              {[
                { value: "routine", label: "Routine", desc: "No immediate deadline" },
                { value: "time-sensitive", label: "Time-Sensitive", desc: "Decision needed within 60 days" },
                { value: "critical", label: "Critical / Emergency", desc: "Immediate response needed" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="urgency" value={opt.value} defaultChecked={opt.value === "routine"} className="accent-fuchsia-600 w-4 h-4" />
                  <span>
                    <span className="text-sm font-bold text-slate-900">{opt.label}</span>
                    <span className="text-xs text-slate-400 block">{opt.desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Describe Your Challenge <span className="text-red-500">*</span></span>
            <textarea
              required
              rows={6}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              placeholder={fromLab
                ? `I was using the ${labCategory} tools in the HTR Research Lab and would like HTR Advisory support to implement what I modeled. Specifically...`
                : "Tell us about the specific challenge, initiative, or strategic question you need support with. The more context you provide, the more tailored our response will be."
              }
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">How Did You Hear About HTR Advisory?</span>
            <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
              <option value="">Select...</option>
              <option>HTR Intelligence Platform (htr.com)</option>
              <option>Referral from a colleague</option>
              <option>Google / Search Engine</option>
              <option>Conference or Event</option>
              <option>LinkedIn</option>
              <option>Prior HTR Client</option>
              <option>Other</option>
            </select>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-fuchsia-600 text-white font-black text-lg rounded-lg hover:bg-fuchsia-700 transition-colors shadow-lg"
      >
        Submit Engagement Request
      </button>
      <p className="text-center text-xs text-gray-400">
        All inquiries are handled confidentially. We respond within 48 business hours.
      </p>
    </form>
  );
}
