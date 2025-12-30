// app/education/faculty/page.tsx
import React from "react";
import Link from "next/link";

const faculty = [
  {
    name: "Dr. Aris Thorne",
    role: "Chair of Technology Pillar",
    bio: "Former Chief Medical Information Officer at Mayo Clinic. Pioneer in clinical AI deployment.",
    tags: ["AI", "Clinical Ops"],
    imageColor: "bg-indigo-200"
  },
  {
    name: "Sarah Jenkins, MPH",
    role: "Chair of Policy Pillar",
    bio: "Served 10 years at CMS, architecting key components of the ACA and MACRA legislation.",
    tags: ["Regulation", "CMS"],
    imageColor: "bg-blue-200"
  },
  {
    name: "Marcus Chen",
    role: "Visiting Fellow, Economics",
    bio: "Founder of 3 digital health unicorns. Expert in go-to-market strategy and venture finance.",
    tags: ["Venture Capital", "Strategy"],
    imageColor: "bg-emerald-200"
  },
   {
    name: "Elena Roza",
    role: "Senior Fellow, Population Health",
    bio: "Designed value-based contracts for major national payer covering 15M lives.",
    tags: ["VBC", "Payer Strategy"],
    imageColor: "bg-purple-200"
  },
];

export default function FacultyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Learn from the Architects
            </h1>
            <p className="text-xl text-gray-600">
                HTR Academy courses are taught by the people who wrote the policies, built the technologies, and managed the budgets.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {faculty.map((person) => (
                <div key={person.name} className="flex flex-col sm:flex-row gap-6 p-6 bg-surface border border-ui-border rounded-xl hover:shadow-lg transition-shadow">
                    <div className={`w-32 h-32 ${person.imageColor} rounded-full flex-shrink-0 mx-auto sm:mx-0`}>
                        {/* Placeholder for Headshot */}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{person.name}</h3>
                        <p className="text-indigo-600 font-bold mb-3">{person.role}</p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {person.bio}
                        </p>
                        <div className="flex gap-2">
                            {person.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-10 bg-slate-900 rounded-2xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Become a Fellow</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                Are you a recognized expert in your field? HTR Academy is always looking for visiting faculty to lead masterclasses.
            </p>
            <Link href="/advisory/contact" className="px-6 py-3 bg-white text-slate-900 font-bold rounded hover:bg-slate-200 transition-colors">
                Apply to Teach
            </Link>
        </div>
      </div>
    </div>
  );
}