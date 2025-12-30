import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. HERO HEADER */}
      <div className="bg-slate-900 text-white py-24 border-b border-indigo-900">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                Direct Engagement
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight">
                Hire an Expert
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Whether you need a keynote speaker for your board retreat or a full-time consultant for a transformation project, we have the expertise.
            </p>
        </div>
      </div>

      {/* 2. CONTACT FORM & SIDEBAR */}
      <div className="container mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
            
            {/* LEFT: The Form */}
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-200 md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Submit an Inquiry</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="block">
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Name</span>
                            <input type="text" className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Dr. Jane Doe" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Work Email</span>
                            <input type="email" className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="jane@hospital.org" />
                        </label>
                    </div>
                    
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Organization / Health System</span>
                        <input type="text" className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Mercy Regional Medical Center" />
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <label className="block">
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Inquiry Type</span>
                            <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                                <option>Strategic Consulting</option>
                                <option>Custom Research Project</option>
                                <option>Keynote Speaking</option>
                                <option>Expert Witness Testimony</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Estimated Budget</span>
                            <select className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                                <option>Under $10k</option>
                                <option>$10k - $50k</option>
                                <option>$50k - $250k</option>
                                <option>$250k+</option>
                            </select>
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Project Details</span>
                        <textarea rows={4} className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Tell us about the specific challenge you are facing..."></textarea>
                    </label>

                    <button type="button" className="w-full py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
                        Submit Request
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        We typically respond to RFPs within 48 business hours.
                    </p>
                </form>
            </div>

            {/* RIGHT: Contact Info & Trust Signals */}
            <div className="md:w-1/3 space-y-6">
                
                {/* Direct Contact Card */}
                <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg border border-slate-700">
                    <h4 className="text-lg font-bold mb-6 border-b border-slate-700 pb-4">Direct Contact</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">General Inquiries</p>
                            <p className="text-lg font-medium">advisory@htr.com</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Media & Press</p>
                            <p className="text-lg font-medium">press@htr.com</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Phone</p>
                            <p className="text-lg font-medium">+1 (802) 555-0123</p>
                        </div>
                    </div>
                </div>

                {/* Office Locations */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Our Offices</h4>
                    <div className="space-y-6">
                        <div>
                            <p className="font-bold text-gray-900">Burlington, VT</p>
                            <p className="text-gray-600 text-sm">120 St. Paul Street<br/>Burlington, VT 05401</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Washington, DC</p>
                            <p className="text-gray-600 text-sm">1400 K Street NW<br/>Washington, DC 20005</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}