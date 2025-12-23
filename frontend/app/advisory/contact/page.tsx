import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="Hire an Expert"
      subtitle="Connect with our principal analysts and consultants."
      content={
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Engage HTR</h3>
            <p className="mb-6">
              Whether you need a keynote speaker for your board retreat or a
              full-time consultant for a 6-month transformation project, we have
              the expertise.
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="font-bold text-slate-900">Direct Contact</p>
              <p className="text-slate-600">advisory@htr.com</p>
              <p className="text-slate-600">+1 (802) 555-0123</p>
            </div>
          </div>
          <form className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold text-gray-700">Name</span>
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Dr. Jane Doe"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold text-gray-700">
                Organization
              </span>
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Medical Center"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold text-gray-700">
                Inquiry Type
              </span>
              <select className="border p-2 rounded">
                <option>Strategic Consulting</option>
                <option>Speaking Engagement</option>
                <option>Research Request</option>
              </select>
            </label>
            <button className="bg-indigo-600 text-white font-bold py-3 rounded mt-2 hover:bg-indigo-700">
              Submit Inquiry
            </button>
          </form>
        </div>
      }
    />
  );
}
