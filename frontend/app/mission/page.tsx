import React from "react";
import {
  LightBulbIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function MissionPage() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-5xl mx-auto font-sans text-gray-800">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Mission & Vision
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A future where geography does not dictate health outcomes.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission Section */}
        <section className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Our Mission
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed">
            To accelerate the adoption of sustainable, value-based care models
            in rural America by decoding the complex interplay of federal
            policy, market economics, and emerging technology.
          </p>
        </section>

        {/* Vision Section */}
        <section className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative z-10">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Our Vision
            </h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-6 text-slate-900">
              We envision a rural health system that is{" "}
              <strong className="font-bold text-slate-900">
                financially resilient
              </strong>
              ,{" "}
              <strong className="font-bold text-slate-900">
                technologically advanced
              </strong>
              , and{" "}
              <strong className="font-bold text-slate-900">
                clinically integrated
              </strong>
              .
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              In this future, the "Rural Health Transformation Program" is no
              longer a pilot, but the standard of care. Small community
              hospitals operate as high-tech triage and stabilization hubs,
              connected seamlessly to urban centers of excellence.
            </p>
          </div>
        </section>

        {/* Core Values Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <LightBulbIcon className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Innovation</h3>
              <p className="text-sm text-slate-600">
                Challenging the status quo with data-driven solutions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <UserGroupIcon className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Equity</h3>
              <p className="text-sm text-slate-600">
                Ensuring access to quality care for every community.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <ShieldCheckIcon className="w-8 h-8 text-indigo-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Integrity</h3>
              <p className="text-sm text-slate-600">
                Unbiased analysis rooted in rigorous evidence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
