"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// ── Glossary data ─────────────────────────────────────────────────────────────

type Term = {
  term: string;
  acronym?: string;
  definition: string;
  category: string;
};

const TERMS: Term[] = [
  // ── Programs ──────────────────────────────────────────────────────────────
  {
    term: "Dr. Dynasaur",
    definition:
      "Vermont's flagship Medicaid program for children ages 0–18 and pregnant women. Provides comprehensive coverage including preventive care, dental, vision, mental health, and prescriptions. Named after a beloved character from Vermont's public health campaigns. Children in families up to 317% of the Federal Poverty Level may qualify.",
    category: "Programs",
  },
  {
    term: "Choices for Care",
    acronym: "CFC",
    definition:
      "Vermont's Medicaid Home and Community-Based Services (HCBS) waiver program that provides long-term services and supports (LTSS) to seniors and adults with physical disabilities. Allows eligible Vermonters to receive nursing-facility-level care in their home, adult foster home, or residential care home instead of a nursing facility. Eligibility requires both a functional assessment and an income test.",
    category: "Programs",
  },
  {
    term: "AABD Medicaid",
    acronym: "AABD",
    definition:
      "Aged, Blind, and Disabled Medicaid. Vermont's traditional Medicaid program for residents who are age 65 or older, legally blind, or have a qualifying disability. Uses SSI-based income rules (non-MAGI methodology) and includes an asset test. SSI recipients are automatically enrolled.",
    category: "Programs",
  },
  {
    term: "Vermont Premium Assistance",
    acronym: "VPA",
    definition:
      "A Vermont Medicaid program that pays the employee share of premiums and cost-sharing for individuals who have access to employer-sponsored insurance, when doing so is cost-effective for the state compared to enrolling them in full Medicaid. The employer plan must meet minimum benefit standards.",
    category: "Programs",
  },
  {
    term: "Medicare Savings Program",
    acronym: "MSP",
    definition:
      "A group of Vermont Medicaid programs that help low-income Medicare beneficiaries pay their Medicare premiums, deductibles, and copayments. Includes four levels: Qualified Medicare Beneficiary (QMB), Specified Low-Income Medicare Beneficiary (SLMB), Qualifying Individual (QI), and Qualified Disabled and Working Individual (QDWI).",
    category: "Programs",
  },
  {
    term: "Former Foster Care Youth Medicaid",
    definition:
      "Vermont extends Medicaid eligibility to individuals who aged out of Vermont foster care until age 26, regardless of income. No income or asset test applies. This was established under the ACA to prevent gaps in coverage for young adults leaving the foster care system.",
    category: "Programs",
  },
  {
    term: "Vermont Health Access Program",
    acronym: "VHAP",
    definition:
      "A legacy Vermont program that provided Medicaid-like coverage to low-income adults before the ACA expansion. VHAP has been largely absorbed into the standard Adult Medicaid category under ACA expansion to 138% FPL.",
    category: "Programs",
  },

  // ── Eligibility & Income ───────────────────────────────────────────────────
  {
    term: "Modified Adjusted Gross Income",
    acronym: "MAGI",
    definition:
      "The income calculation methodology used by Vermont for most Medicaid programs (all non-elderly, non-disabled adults and children). MAGI is based on federal tax definitions and includes wages, salaries, tips, self-employment income, unemployment compensation, taxable Social Security benefits, and most other income. It generally does not count assets.",
    category: "Eligibility",
  },
  {
    term: "Federal Poverty Level",
    acronym: "FPL",
    definition:
      "An annual income measure published by the U.S. Department of Health and Human Services (HHS) that is used to determine eligibility for many federal and state assistance programs including Medicaid. Vermont Medicaid income thresholds are expressed as percentages of FPL (e.g., 138% FPL for adult Medicaid). FPL varies by household size and is updated each January.",
    category: "Eligibility",
  },
  {
    term: "Presumptive Eligibility",
    acronym: "PE",
    definition:
      "A process that allows qualified entities (hospitals, community health centers, navigators) to make a preliminary Medicaid eligibility determination and provide temporary coverage while a full application is processed. Designed to eliminate gaps in coverage during the application period. Vermont uses PE for pregnant women and children.",
    category: "Eligibility",
  },
  {
    term: "Categorical Eligibility",
    definition:
      "Eligibility for Medicaid based on membership in a specific category or group (e.g., pregnant women, children, people with disabilities, seniors), as opposed to solely income-based eligibility. A person must meet both categorical and financial requirements to qualify.",
    category: "Eligibility",
  },
  {
    term: "Nursing Facility Level of Care",
    acronym: "NFLOC",
    definition:
      "The functional eligibility standard for Vermont's Choices for Care program. An individual meets NFLOC if they need the kind of daily care that would be provided in a nursing facility — typically defined as needing assistance with three or more Activities of Daily Living (ADLs) or having significant cognitive impairment.",
    category: "Eligibility",
  },
  {
    term: "Activities of Daily Living",
    acronym: "ADLs",
    definition:
      "Basic self-care tasks used to assess an individual's functional capacity for programs like Choices for Care. Vermont ADLs include: bathing, dressing, eating, transferring (moving from bed to chair), toileting, and continence. The number and severity of ADL deficits determines the level of Choices for Care benefit.",
    category: "Eligibility",
  },
  {
    term: "Asset Test",
    definition:
      "A review of a Medicaid applicant's financial resources (savings, investments, property) to determine eligibility. Vermont applies asset tests only to non-MAGI programs (AABD Medicaid and Choices for Care). The general limit is $2,000 for an individual and $3,000 for a couple. Many assets are excluded, including a primary home, one vehicle, and certain retirement accounts.",
    category: "Eligibility",
  },
  {
    term: "Income Disregard",
    definition:
      "An amount of income that is subtracted before calculating eligibility — effectively allowing a person to have higher gross income and still qualify. Vermont's MAGI methodology includes a 5% FPL income disregard built into the threshold for most programs (e.g., the effective adult Medicaid threshold is 138% FPL, which already includes the 5% disregard).",
    category: "Eligibility",
  },
  {
    term: "Medically Needy",
    definition:
      "A Medicaid eligibility pathway for individuals whose income exceeds standard limits but who have high medical expenses. Vermont does not currently operate a robust Medically Needy program — most high-cost individuals are served through standard categories or spend-down provisions.",
    category: "Eligibility",
  },
  {
    term: "Retroactive Eligibility",
    definition:
      "Vermont Medicaid may cover medical expenses incurred up to three months before an application is submitted, if the applicant would have been eligible during that period. This can be critical for individuals with unexpected hospitalizations or high medical bills.",
    category: "Eligibility",
  },

  // ── Enrollment & Administration ────────────────────────────────────────────
  {
    term: "Health Benefits Exchange",
    acronym: "HBEE",
    definition:
      "Vermont's unified eligibility system for health coverage, managed through Vermont Health Connect. HBEE processes applications for both Medicaid and Qualified Health Plans (QHPs), determining which program a household qualifies for based on income and other factors. Vermont uses a single, integrated enrollment portal.",
    category: "Enrollment",
  },
  {
    term: "Vermont Health Connect",
    definition:
      "Vermont's online marketplace for health insurance, serving as the state's ACA exchange and Medicaid enrollment portal. Vermonters apply for all forms of publicly subsidized coverage — Medicaid, CHIP (Dr. Dynasaur), and subsidized commercial plans — through Vermont Health Connect at healthconnect.vermont.gov.",
    category: "Enrollment",
  },
  {
    term: "Notice of Decision",
    acronym: "NOD",
    definition:
      "A written notice Vermont sends after making a determination on a Medicaid application or eligibility review. The NOD explains whether you were approved or denied, which program you qualify for, the reason for any denial, and your right to appeal. Vermont must send a NOD within 45 days of a completed application (90 days for disability cases).",
    category: "Enrollment",
  },
  {
    term: "Annual Renewal",
    definition:
      "The process by which Vermont reviews Medicaid enrollee eligibility each year. Vermont uses ex parte renewal (automated data matching) to renew as many enrollees as possible without requiring action. Those who cannot be automatically renewed receive a renewal form. Failure to respond to a renewal notice can result in disenrollment.",
    category: "Enrollment",
  },
  {
    term: "Ex Parte Renewal",
    definition:
      "An automated Medicaid renewal process in which Vermont reviews existing data (tax records, Social Security data, state wage records) to verify continued eligibility without requiring the enrollee to submit a new application. Vermont is required to attempt ex parte renewal for all enrollees before sending paper renewal forms.",
    category: "Enrollment",
  },
  {
    term: "Special Enrollment Period",
    acronym: "SEP",
    definition:
      "A window outside the standard open enrollment period during which an individual can enroll in or change health coverage due to a qualifying life event. Medicaid has no special enrollment periods — a person can apply and enroll year-round whenever they become eligible.",
    category: "Enrollment",
  },
  {
    term: "Certified Application Counselor",
    acronym: "CAC",
    definition:
      "A trained and certified individual who assists Vermont residents in applying for health coverage through Vermont Health Connect. CACs work in hospitals, community health centers, social service agencies, and other settings. They provide free, unbiased assistance but cannot recommend specific plans.",
    category: "Enrollment",
  },
  {
    term: "Navigator",
    definition:
      "A federally funded role established by the ACA to help consumers understand and enroll in health coverage through the exchange. Vermont Navigators provide outreach, education, and enrollment assistance. They must be certified and cannot be compensated by insurance companies.",
    category: "Enrollment",
  },

  // ── Administration & Policy ────────────────────────────────────────────────
  {
    term: "Department of Vermont Health Access",
    acronym: "DVHA",
    definition:
      "The Vermont state agency responsible for administering Medicaid and other publicly funded health programs. DVHA sets eligibility policy, manages provider enrollment, oversees managed care and fee-for-service delivery, and interfaces with CMS on federal compliance. Located within the Vermont Agency of Human Services.",
    category: "Administration",
  },
  {
    term: "Centers for Medicare & Medicaid Services",
    acronym: "CMS",
    definition:
      "The federal agency within the U.S. Department of Health and Human Services that oversees Medicaid, Medicare, and the ACA exchanges. CMS approves Vermont's Medicaid State Plan, waivers, and amendments, and provides matching federal funds. Vermont must comply with all CMS regulations to receive federal Medicaid funding.",
    category: "Administration",
  },
  {
    term: "State Plan",
    definition:
      "A formal agreement between Vermont and CMS that describes how Vermont administers its Medicaid program — who is eligible, what benefits are covered, how providers are paid, and how the program is managed. Vermont must obtain CMS approval for any material change to its State Plan via a State Plan Amendment (SPA).",
    category: "Administration",
  },
  {
    term: "1115 Waiver",
    definition:
      "A federal waiver authority under Section 1115 of the Social Security Act that allows Vermont to test innovative Medicaid approaches that deviate from standard federal rules. Vermont has used 1115 waivers to expand eligibility, test new payment models, and pilot the Global Commitment to Health waiver, which gives Vermont broad flexibility to restructure its Medicaid program.",
    category: "Administration",
  },
  {
    term: "Global Commitment to Health",
    acronym: "GC",
    definition:
      "Vermont's comprehensive 1115 Medicaid waiver that provides the state with a capped federal allotment and broad programmatic flexibility in exchange for achieving health outcome targets. The Global Commitment waiver underpins much of Vermont's ability to run its unique, person-centered Medicaid system and fund services beyond the standard federal benefit package.",
    category: "Administration",
  },
  {
    term: "Federal Medical Assistance Percentage",
    acronym: "FMAP",
    definition:
      "The percentage of Medicaid costs the federal government pays. Vermont's FMAP varies by program and year but is generally around 50–57%. States with lower per-capita income receive higher FMAPs. Enhanced FMAPs apply to certain populations (e.g., ACA expansion adults at 90%) and during public health emergencies.",
    category: "Administration",
  },
  {
    term: "Dual Eligible",
    definition:
      "An individual who qualifies for both Medicare (federal, primarily age 65+ or disability) and Medicaid (state, low-income). Dual eligibles are among the most complex and high-cost populations in American healthcare. Vermont coordinates both programs to minimize gaps and cost-sharing burdens. Approximately 30,000+ Vermonters are dual eligible.",
    category: "Administration",
  },
  {
    term: "Coordinated Care",
    definition:
      "Vermont's approach to integrating physical health, mental health, and substance use treatment for Medicaid enrollees. Vermont Blueprint for Health and the Hub-and-Spoke model for opioid treatment are examples of coordinated care initiatives that Vermont Medicaid funds.",
    category: "Administration",
  },

  // ── Benefits ───────────────────────────────────────────────────────────────
  {
    term: "Mandatory Benefits",
    definition:
      "Services that federal law requires all state Medicaid programs to cover. Vermont's mandatory benefits include: inpatient and outpatient hospital, physician, lab, x-ray, FQHC/RHC services, home health, nursing facility care, family planning, EPSDT (for children), pregnancy-related services, and transportation.",
    category: "Benefits",
  },
  {
    term: "EPSDT",
    acronym: "EPSDT",
    definition:
      "Early and Periodic Screening, Diagnostic, and Treatment. A comprehensive preventive care benefit for Medicaid-enrolled children under age 21. EPSDT requires Vermont to screen children for physical, mental, developmental, dental, hearing, and vision conditions, and to cover treatment even if the specific service is not otherwise in Vermont's Medicaid State Plan.",
    category: "Benefits",
  },
  {
    term: "Home and Community-Based Services",
    acronym: "HCBS",
    definition:
      "Medicaid-funded services delivered in a person's home or community setting rather than an institution. Vermont's Choices for Care is the primary HCBS waiver. HCBS may include personal care attendants, adult day programs, respite care, home modifications, and meal delivery.",
    category: "Benefits",
  },
  {
    term: "Postpartum Coverage",
    definition:
      "Vermont extended Medicaid coverage for individuals who give birth from 60 days to 12 full months postpartum in 2022, utilizing the American Rescue Plan Act (ARP) option. Coverage continues automatically — no new application is needed. This extension covers physical and mental health care, substance use treatment, and all standard Medicaid benefits during the postpartum period.",
    category: "Benefits",
  },
  {
    term: "Behavioral Health",
    definition:
      "Mental health and substance use disorder services covered by Vermont Medicaid. Vermont integrates behavioral health into its Medicaid program through Blueprint for Health, the Hub-and-Spoke opioid treatment model, and community mental health centers (CMHCs). Vermont Medicaid covers inpatient psychiatric care, outpatient therapy, medication-assisted treatment (MAT), and crisis services.",
    category: "Benefits",
  },
];

const CATEGORIES = ["All", "Programs", "Eligibility", "Enrollment", "Administration", "Benefits"];

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function getCategoryStyle(cat: string) {
  switch (cat) {
    case "Programs":       return "bg-rose-50 text-rose-700 border border-rose-200";
    case "Eligibility":    return "bg-amber-50 text-amber-700 border border-amber-200";
    case "Enrollment":     return "bg-sky-50 text-sky-700 border border-sky-200";
    case "Administration": return "bg-slate-100 text-slate-600 border border-slate-200";
    case "Benefits":       return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    default:               return "bg-slate-50 text-slate-500 border border-slate-100";
  }
}

function getCategoryButtonStyle(cat: string, selected: boolean) {
  if (!selected) return "bg-white text-slate-500 border-slate-200 hover:border-slate-300";
  switch (cat) {
    case "All":            return "bg-slate-900 text-white border-slate-900 font-bold";
    case "Programs":       return "bg-rose-50 text-rose-700 border-rose-400 font-bold";
    case "Eligibility":    return "bg-amber-50 text-amber-700 border-amber-400 font-bold";
    case "Enrollment":     return "bg-sky-50 text-sky-700 border-sky-400 font-bold";
    case "Administration": return "bg-slate-100 text-slate-700 border-slate-400 font-bold";
    case "Benefits":       return "bg-emerald-50 text-emerald-700 border-emerald-400 font-bold";
    default:               return "bg-slate-900 text-white border-slate-900 font-bold";
  }
}

export default function MedicaidGlossaryPage() {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState<string | null>(null);
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    let results = [...TERMS];
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          (t.acronym?.toLowerCase().includes(q) ?? false)
      );
    } else if (letter) {
      results = results.filter((t) => t.term.charAt(0).toUpperCase() === letter);
    }
    if (category !== "All") {
      results = results.filter((t) => t.category === category);
    }
    return results.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, letter, category]);

  const grouped = useMemo(
    () =>
      filtered.reduce<Record<string, Term[]>>((acc, t) => {
        const l = t.term.charAt(0).toUpperCase();
        (acc[l] ??= []).push(t);
        return acc;
      }, {}),
    [filtered]
  );

  const activeLetters = new Set(TERMS.map((t) => t.term.charAt(0).toUpperCase()));

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-sky-50 to-white border-b border-slate-200 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link href="/academy/medicaid" className="text-[11px] font-bold text-sky-600 hover:text-sky-800">
              ← Medicaid Learning Center
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
              Academy · Glossary
            </span>
            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-rose-200">
              Vermont Medicaid
            </span>
          </div>
          <h1 className="ty-h1 font-black text-slate-900 mb-3">Vermont Medicaid Glossary</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
            {TERMS.length} key terms defined — programs, eligibility rules, enrollment concepts, policy frameworks, and benefit categories.
            Searchable and filterable by category and letter.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8">

        {/* ── SEARCH ───────────────────────────────────────────────────── */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search terms, acronyms, or definitions…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setLetter(null); }}
            className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>

        {/* ── CATEGORY FILTER ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${getCategoryButtonStyle(cat, category === cat)}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── ALPHABET BAR ─────────────────────────────────────────────── */}
        {!search && (
          <div className="flex flex-wrap gap-1 mb-6">
            {alphabet.map((l) => (
              <button
                key={l}
                onClick={() => setLetter(letter === l ? null : l)}
                disabled={!activeLetters.has(l)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                  letter === l
                    ? "bg-sky-600 text-white"
                    : activeLetters.has(l)
                    ? "bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-700"
                    : "bg-slate-50 text-slate-300 cursor-not-allowed"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {/* ── RESULTS COUNT ────────────────────────────────────────────── */}
        <p className="text-xs text-slate-400 mb-6">
          Showing {filtered.length} of {TERMS.length} terms
          {category !== "All" && ` in ${category}`}
          {letter && !search && ` starting with "${letter}"`}
          {search && ` matching "${search}"`}
        </p>

        {/* ── TERM GROUPS ──────────────────────────────────────────────── */}
        {Object.keys(grouped).sort().map((l) => (
          <div key={l} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-black text-slate-200">{l}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="space-y-4">
              {grouped[l].map((t) => (
                <div key={t.term} className="group bg-white border border-slate-200 hover:border-sky-200 rounded-xl p-5 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-slate-900 text-sm">{t.term}</h3>
                      {t.acronym && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {t.acronym}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded ${getCategoryStyle(t.category)}`}>
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.definition}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm">No terms found matching your search.</p>
            <button
              onClick={() => { setSearch(""); setLetter(null); setCategory("All"); }}
              className="mt-3 text-xs text-sky-600 hover:text-sky-800 underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── FOOTER CTA ───────────────────────────────────────────────── */}
        <div className="mt-12 bg-slate-950 rounded-2xl p-6 text-white text-center">
          <p className="text-sm font-black mb-1">Still have questions?</p>
          <p className="text-xs text-slate-400 mb-4">Ask our AI Analyst anything about Vermont Medicaid — trained on 23 official Vermont and federal documents.</p>
          <div className="flex justify-center gap-4">
            <Link href="/chat" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-2">Ask AI Analyst →</Link>
            <Link href="/medicaid-eligibility-simulator" className="text-xs font-bold text-rose-400 hover:text-rose-300 underline underline-offset-2">Check Eligibility →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
