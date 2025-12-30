// app/education/webinars/page.tsx
import React from "react";
import AcademyCard from "@/components/academy/AcademyCard";

export default function WebinarsPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
       <div className="bg-slate-50 border-b border-gray-200 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">Live Intelligence</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Webinars & Roundtables
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join live discussions with global leaders. Q&A included in every session.
            </p>
        </div>
       </div>

       <div className="container mx-auto px-4 md:px-8 -mt-8">
         <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xl mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">
                    Next Up • Oct 25
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    The Future of Telehealth Reimbursement (2025 Outlook)
                </h2>
                <p className="text-gray-600 mb-6">
                    A critical town-hall style meeting regarding the expiring telehealth waivers and what the new fee schedule means for digital health companies.
                </p>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700">
                        Register Free
                    </button>
                    <button className="px-6 py-3 border border-gray-300 font-bold rounded hover:bg-gray-50">
                        Add to Calendar
                    </button>
                </div>
            </div>
            <div className="md:w-1/3 bg-slate-100 h-48 w-full rounded-lg flex items-center justify-center text-gray-400 font-bold">
                [Event Banner]
            </div>
         </div>

         <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Schedule</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AcademyCard 
                type="WEBINAR"
                pillar="Technology"
                title="Generative AI in the ER"
                description="Case study with Mercy Health."
                meta="Nov 02 • 1:00 PM EST"
                href="/education/webinars/gen-ai-er"
            />
            <AcademyCard 
                type="WEBINAR"
                pillar="Policy"
                title="Antitrust in Healthcare"
                description="FTC's new stance on mergers."
                meta="Nov 15 • 3:00 PM EST"
                href="/education/webinars/antitrust"
            />
            <AcademyCard 
                type="WEBINAR"
                pillar="Economics"
                title="The Cost of GLP-1s"
                description="Employer coverage strategies."
                meta="Dec 01 • 12:00 PM EST"
                href="/education/webinars/glp1"
            />
         </div>
       </div>
    </div>
  );
}