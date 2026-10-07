"use client";

/**
 * FHIR Implementation Guide — Research Lab resource.
 *
 * Chapter 12 §12.5 lists it in the HTR Implementation Toolkit: a "step-by-step technical guide
 * for implementing the three priority FHIR use cases with EHR-specific configuration notes for
 * Epic, Oracle Health, Meditech, and TruBridge." The three use cases and their requirements
 * are Chapter 5 §5.2.2 / Figure 5.1. Steps cite the public federal specifications. Vendor
 * notes point to where each vendor's certified API documentation is published (ONC requires it
 * to be linked from the product's CHPL listing) rather than reproducing version-specific vendor
 * configuration, which HTR cannot verify.
 */

import { useState } from "react";

const USE_CASES = [
  {
    id: "patient-access",
    title: "Patient access API",
    basis: "ONC certification criterion §170.315(g)(10); CMS Interoperability and Patient Access rule",
    book: "Required compliance — all Vermont hospitals. Monitor smaller CAHs without robust IT departments.",
    steps: [
      "Confirm your EHR version is certified to §170.315(g)(10) on the ONC Certified Health IT Product List (chpl.healthit.gov).",
      "Enable the FHIR R4 patient-access endpoint and publish its service base URL — certified developers must make endpoints publicly available.",
      "Stand up app authorization: SMART App Launch (OAuth 2.0) with patient-facing scopes; define your app-registration process.",
      "Confirm the US Core profiles your version supports cover the USCDI data classes patients will request.",
      "Test with ONC's Inferno test kit (inferno.healthit.gov) before go-live; re-test after each EHR upgrade.",
      "Publish patient instructions and an app-privacy notice; track connected-app volume as the adoption measure.",
    ],
  },
  {
    id: "provider-access",
    title: "Provider access API (care coordination)",
    basis: "FHIR R4 / US Core query between organizations; national trust frameworks (Carequality, CommonWell, TEFCA)",
    book: "Highest-value use case for the Vermont CIN — inter-hospital care coordination the regionalization blueprint requires. Priority RHT IT advance investment.",
    steps: [
      "Choose the trust framework each partner can reach (Carequality, CommonWell, or a TEFCA QHIN) and confirm VHIE/VITL connectivity.",
      "Resolve patient identity: agree on a master patient index or matching rules across organizations before enabling queries.",
      "Define consent handling, including 42 CFR Part 2 substance-use records, which need segmentation from general exchange.",
      "Enable EHR-to-EHR FHIR query for the shared-patient roster; start with problems, medications, allergies and recent encounters.",
      "Embed the queried data in the care manager's workflow (not a separate portal) and measure time-to-information after a transition.",
    ],
  },
  {
    id: "prior-auth",
    title: "Payer-to-provider API (prior authorization and formulary)",
    basis: "HL7 Da Vinci CRD, DTR and PAS implementation guides; CMS Interoperability and Prior Authorization final rule (CMS-0057-F, 2024)",
    book: "Administrative-simplification priority; GMCB should require payer FHIR API compliance as a condition of rate approval.",
    steps: [
      "Inventory which of your payers are 'impacted payers' under CMS-0057-F and their published API timelines; ask the rest (e.g. commercial lines) for theirs.",
      "Enable Coverage Requirements Discovery (CRD) so the EHR learns at order time whether authorization is required.",
      "Enable Documentation Templates and Rules (DTR) so required documentation is gathered from the chart, not re-keyed.",
      "Pilot Prior Authorization Support (PAS) submission with one payer and one high-volume service before scaling.",
      "Measure turnaround and denial rate before and after; feed results to the state's prior-authorization reform work.",
    ],
  },
] as const;

const VENDORS = [
  { name: "Epic", note: "Public FHIR developer documentation at fhir.epic.com; certified API documentation linked from each product's CHPL listing." },
  { name: "Oracle Health (formerly Cerner)", note: "Millennium FHIR documentation at fhir.cerner.com; certified API documentation linked from CHPL." },
  { name: "MEDITECH", note: "Certified API documentation and endpoint list linked from the Expanse product's CHPL listing." },
  { name: "TruBridge (formerly CPSI)", note: "Certified API documentation linked from its CHPL listing. Common in critical access hospitals — check (g)(10) status first." },
];

export default function FHIRImplementationGuide() {
  const [open, setOpen] = useState<string>(USE_CASES[0].id);
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-5" data-testid="fhir-implementation-guide">
      <p className="text-sm text-slate-700 leading-relaxed">
        The three FHIR use cases Chapter 5 says Vermont needs most (Figure 5.1), as implementation steps. Tick steps off as you go;
        progress is not saved.
      </p>
      {USE_CASES.map((u) => {
        const doneCount = u.steps.filter((_, i) => done[`${u.id}-${i}`]).length;
        const isOpen = open === u.id;
        return (
          <section key={u.id} className="rounded-xl border border-slate-200 bg-white">
            <button type="button" onClick={() => setOpen(isOpen ? "" : u.id)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">{u.title}</p>
                <p className="text-[11px] text-slate-500">{u.basis}</p>
              </div>
              <span className="text-xs font-bold text-slate-500 shrink-0">{doneCount}/{u.steps.length}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5">
                <p className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 mb-3">
                  <strong>Vermont priority (book):</strong> {u.book}
                </p>
                <ol className="space-y-2">
                  {u.steps.map((s, i) => {
                    const key = `${u.id}-${i}`;
                    return (
                      <li key={key} className="flex items-start gap-2 text-sm text-slate-700">
                        <input type="checkbox" className="mt-1" checked={!!done[key]} onChange={(e) => setDone((d) => ({ ...d, [key]: e.target.checked }))} aria-label={`Step ${i + 1}`} />
                        <span><strong>{i + 1}.</strong> {s}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </section>
        );
      })}

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-black text-slate-900 mb-2">EHR-specific notes</h3>
        <p className="text-xs text-slate-500 mb-3">
          Configuration differs by version and contract, so HTR does not reproduce vendor settings. Every certified EHR must link
          its API documentation from its CHPL listing — start there for your exact version.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {VENDORS.map((v) => (
            <div key={v.name} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-black text-slate-900">{v.name}</p>
              <p className="text-xs text-slate-600 mt-1">{v.note}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-[11px] text-slate-400">
        Sources: the book, Chapter 5 §5.2.2 and Figure 5.1; ONC 21st Century Cures Act final rule (2020) and the CHPL; CMS
        Interoperability and Patient Access final rule (2020); CMS Interoperability and Prior Authorization final rule
        (CMS-0057-F, 2024); HL7 SMART App Launch and Da Vinci CRD/DTR/PAS implementation guides. Try the resources hands-on in
        the FHIR Interoperability Lab.
      </p>
    </div>
  );
}
