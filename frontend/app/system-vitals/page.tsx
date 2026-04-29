"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// ─── DATA ─────────────────────────────────────────────────────────────────────

type BedKey = "icu" | "medsurg" | "behavioral" | "snf";

interface BedCounts {
  total: number;
  avail: number;
}

interface Hospital {
  id: string;
  name: string;
  short: string;
  type: "tertiary" | "regional" | "critical";
  region: string;
  beds: Record<BedKey, BedCounts>;
  specialties: string[];
  transfer_center: boolean;
}

interface RepatPatient {
  id: string;
  name: string;
  age: number;
  dx: string;
  at: string;
  home: string;
  los: number;
  target_los: number;
  days_over: number;
  acuity: BedKey;
  specialty: string;
  blocker: string;
}

const HOSPITALS: Hospital[] = [
  { id: "uvmmc", name: "UVM Medical Center", short: "UVMMC", type: "tertiary", region: "Chittenden",
    beds: { icu: { total: 32, avail: 1 }, medsurg: { total: 180, avail: 12 }, behavioral: { total: 24, avail: 4 }, snf: { total: 0, avail: 0 } },
    specialties: ["cardiac", "neuro", "ortho", "psych", "peds", "oncology"], transfer_center: true },
  { id: "dhmc", name: "Dartmouth-Hitchcock (VT pts)", short: "DHMC", type: "tertiary", region: "Upper Valley",
    beds: { icu: { total: 40, avail: 6 }, medsurg: { total: 160, avail: 22 }, behavioral: { total: 18, avail: 2 }, snf: { total: 0, avail: 0 } },
    specialties: ["cardiac", "neuro", "ortho", "psych", "oncology"], transfer_center: true },
  { id: "cvmc", name: "Central VT Medical Center", short: "CVMC", type: "regional", region: "Washington",
    beds: { icu: { total: 12, avail: 4 }, medsurg: { total: 68, avail: 18 }, behavioral: { total: 10, avail: 3 }, snf: { total: 20, avail: 7 } },
    specialties: ["cardiac", "ortho"], transfer_center: false },
  { id: "svmc", name: "Southwestern VT Medical Center", short: "SVMC", type: "regional", region: "Bennington",
    beds: { icu: { total: 8, avail: 3 }, medsurg: { total: 52, avail: 11 }, behavioral: { total: 6, avail: 1 }, snf: { total: 14, avail: 5 } },
    specialties: ["cardiac", "ortho"], transfer_center: false },
  { id: "rrmc", name: "Rutland Regional Medical Center", short: "RRMC", type: "regional", region: "Rutland",
    beds: { icu: { total: 10, avail: 2 }, medsurg: { total: 72, avail: 9 }, behavioral: { total: 8, avail: 0 }, snf: { total: 18, avail: 4 } },
    specialties: ["cardiac", "ortho", "neuro"], transfer_center: false },
  { id: "nvrh", name: "Northeastern VT Regional", short: "NVRH", type: "critical", region: "Caledonia",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 25, avail: 6 }, behavioral: { total: 4, avail: 1 }, snf: { total: 10, avail: 3 } },
    specialties: ["any"], transfer_center: false },
  { id: "nch", name: "North Country Hospital", short: "NCH", type: "critical", region: "Orleans",
    beds: { icu: { total: 4, avail: 1 }, medsurg: { total: 25, avail: 9 }, behavioral: { total: 4, avail: 2 }, snf: { total: 8, avail: 2 } },
    specialties: ["any"], transfer_center: false },
  { id: "pmh", name: "Porter Medical Center", short: "PMH", type: "critical", region: "Addison",
    beds: { icu: { total: 4, avail: 3 }, medsurg: { total: 25, avail: 11 }, behavioral: { total: 0, avail: 0 }, snf: { total: 10, avail: 6 } },
    specialties: ["any"], transfer_center: false },
  { id: "sph", name: "Springfield Hospital", short: "SPH", type: "critical", region: "Windsor South",
    beds: { icu: { total: 2, avail: 0 }, medsurg: { total: 25, avail: 3 }, behavioral: { total: 0, avail: 0 }, snf: { total: 6, avail: 1 } },
    specialties: ["any"], transfer_center: false },
  { id: "gifford", name: "Gifford Medical Center", short: "GMC", type: "critical", region: "Orange",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 25, avail: 8 }, behavioral: { total: 4, avail: 2 }, snf: { total: 12, avail: 5 } },
    specialties: ["any"], transfer_center: false },
  { id: "mah", name: "Mt. Ascutney Hospital", short: "MAH", type: "critical", region: "Windsor North",
    beds: { icu: { total: 2, avail: 1 }, medsurg: { total: 18, avail: 5 }, behavioral: { total: 0, avail: 0 }, snf: { total: 14, avail: 7 } },
    specialties: ["any"], transfer_center: false },
  { id: "bmh", name: "Brattleboro Memorial", short: "BMH", type: "critical", region: "Windham",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 37, avail: 7 }, behavioral: { total: 8, avail: 1 }, snf: { total: 0, avail: 0 } },
    specialties: ["psych", "any"], transfer_center: false },
  { id: "gcottage", name: "Grace Cottage Hospital", short: "GCH", type: "critical", region: "Windham North",
    beds: { icu: { total: 0, avail: 0 }, medsurg: { total: 19, avail: 6 }, behavioral: { total: 0, avail: 0 }, snf: { total: 10, avail: 4 } },
    specialties: ["any"], transfer_center: false },
  { id: "copley", name: "Copley Hospital", short: "CPH", type: "critical", region: "Lamoille",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 25, avail: 9 }, behavioral: { total: 4, avail: 1 }, snf: { total: 8, avail: 3 } },
    specialties: ["any"], transfer_center: false },
];

const REPAT_PATIENTS: RepatPatient[] = [
  { id: "p1", name: "Patient A", age: 72, dx: "Post-CABG recovery", at: "UVMMC", home: "CVMC", los: 8, target_los: 5, days_over: 3, acuity: "medsurg", specialty: "cardiac", blocker: "Transport coordination pending" },
  { id: "p2", name: "Patient B", age: 58, dx: "Hip replacement rehab", at: "UVMMC", home: "RRMC", los: 6, target_los: 4, days_over: 2, acuity: "snf", specialty: "ortho", blocker: "SNF bed confirmed at RRMC" },
  { id: "p3", name: "Patient C", age: 81, dx: "Stroke — stable", at: "DHMC", home: "NVRH", los: 11, target_los: 7, days_over: 4, acuity: "medsurg", specialty: "neuro", blocker: "Family consent pending" },
  { id: "p4", name: "Patient D", age: 45, dx: "Pneumonia — resolving", at: "UVMMC", home: "NCH", los: 5, target_los: 3, days_over: 2, acuity: "medsurg", specialty: "any", blocker: "Discharge orders placed" },
  { id: "p5", name: "Patient E", age: 67, dx: "Behavioral health stabilization", at: "DHMC", home: "BMH", los: 14, target_los: 10, days_over: 4, acuity: "behavioral", specialty: "psych", blocker: "Bed confirmed at BMH" },
  { id: "p6", name: "Patient F", age: 54, dx: "CHF management", at: "UVMMC", home: "PMH", los: 9, target_los: 6, days_over: 3, acuity: "medsurg", specialty: "cardiac", blocker: "Outpatient cardiology f/u needed" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function totalAvail(h: Hospital) {
  return Object.values(h.beds).reduce((s, b) => s + b.avail, 0);
}

function bedColor(avail: number, total: number) {
  if (total === 0) return "#B4B2A9";
  const pct = avail / total;
  if (pct > 0.2) return "#639922";
  if (pct > 0.05) return "#BA7517";
  return "#E24B4A";
}

function overallStatus(h: Hospital): { cls: string; label: string } {
  let minPct = 1;
  (["icu", "medsurg", "behavioral", "snf"] as BedKey[]).forEach((k) => {
    if (h.beds[k].total > 0) {
      const p = h.beds[k].avail / h.beds[k].total;
      if (p < minPct) minPct = p;
    }
  });
  if (minPct > 0.2) return { cls: "green", label: "Capacity available" };
  if (minPct > 0.05) return { cls: "amber", label: "Capacity limited" };
  return { cls: "red", label: "Near capacity" };
}

// ─── CAPACITY GRID TAB ────────────────────────────────────────────────────────

const BED_TYPES: { k: BedKey; label: string }[] = [
  { k: "icu", label: "ICU" },
  { k: "medsurg", label: "Med-surg" },
  { k: "behavioral", label: "Behav." },
  { k: "snf", label: "SNF/step-down" },
];

const STATUS_STYLES = {
  green: "bg-[#EAF3DE] text-[#3B6D11]",
  amber: "bg-[#FAEEDA] text-[#854F0B]",
  red: "bg-[#FCEBEB] text-[#A32D2D]",
};

function HospCard({
  h,
  selected,
  onClick,
}: {
  h: Hospital;
  selected: boolean;
  onClick: () => void;
}) {
  const st = overallStatus(h);
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-xl p-3.5 cursor-pointer transition-all ${
        selected
          ? "border-2 border-[#185FA5]"
          : "border border-slate-200 dark:border-slate-700 hover:border-slate-400"
      }`}
    >
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-0.5">{h.name}</div>
      <div className="text-[11px] text-slate-400 mb-2.5">
        {h.type.charAt(0).toUpperCase() + h.type.slice(1)} · {h.region}
      </div>
      <div className="flex flex-col gap-1.5">
        {BED_TYPES.map(({ k, label }) => {
          const b = h.beds[k];
          if (b.total === 0) return null;
          const pct = Math.round((b.avail / b.total) * 100);
          const color = bedColor(b.avail, b.total);
          return (
            <div key={k} className="flex items-center gap-2">
              <div className="w-14 text-[11px] text-slate-500 shrink-0">{label}</div>
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="w-8 text-[11px] text-slate-500 text-right shrink-0">{b.avail}/{b.total}</div>
            </div>
          );
        })}
      </div>
      <div className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full mt-2.5 font-medium ${STATUS_STYLES[st.cls]}`}>
        {st.label}
      </div>
    </div>
  );
}

function DetailPane({ h }: { h: Hospital }) {
  const total = Object.values(h.beds).reduce((s, b) => s + b.total, 0);
  const avail = totalAvail(h);
  const occ = total > 0 ? Math.round(((total - avail) / total) * 100) : 0;
  const pending = Math.round(avail * 0.3);

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mt-3.5">
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">{h.name} — detail view</div>
      <div className="grid grid-cols-4 gap-2.5">
        {[
          { label: "Total beds", val: String(total), sub: "all types", color: "" },
          { label: "Available now", val: String(avail), sub: "across all units", color: "text-[#3B6D11]" },
          { label: "Occupancy", val: `${occ}%`, sub: "current", color: "" },
          { label: "Pending discharge", val: String(pending), sub: "est. next 24h", color: "" },
        ].map((m) => (
          <div key={m.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
            <div className="text-[11px] text-slate-500 mb-1">{m.label}</div>
            <div className={`text-xl font-semibold text-slate-900 dark:text-slate-100 ${m.color}`}>{m.val}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 text-xs text-slate-500">
        Specialties on staff: {h.specialties.join(", ")}
        {h.transfer_center && (
          <span className="ml-2 text-[#185FA5] font-medium">· Transfer center active</span>
        )}
      </div>
    </div>
  );
}

function CapacityGrid() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [selected, setSelected] = useState<string | null>(null);

  const uvmmc = HOSPITALS.find((h) => h.id === "uvmmc")!;
  const showSurge = uvmmc.beds.icu.avail <= 2;

  let hosps = [...HOSPITALS];
  if (filter !== "all") hosps = hosps.filter((h) => h.type === filter);
  if (sort === "avail") hosps.sort((a, b) => totalAvail(b) - totalAvail(a));
  else if (sort === "stress") hosps.sort((a, b) => totalAvail(a) - totalAvail(b));
  else hosps.sort((a, b) => a.name.localeCompare(b.name));

  const selectedHosp = selected ? HOSPITALS.find((h) => h.id === selected) : null;

  return (
    <div>
      {showSurge && (
        <div className="bg-[#FAEEDA] border border-[#FAC775] rounded-lg px-3 py-2 text-xs text-[#854F0B] mb-3.5">
          ⚠ Surge alert: UVMMC ICU at 97% capacity. Transfers may be delayed.
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs text-slate-500">Filter:</span>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setSelected(null); }}
          className="text-xs px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <option value="all">All hospitals</option>
          <option value="critical">Critical access only</option>
          <option value="regional">Regional only</option>
          <option value="tertiary">Tertiary only</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-xs px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <option value="name">Sort: name</option>
          <option value="avail">Sort: most available</option>
          <option value="stress">Sort: highest stress</option>
        </select>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-3 flex-wrap">
        {[{ color: "#639922", label: "Available" }, { color: "#BA7517", label: "Limited" }, { color: "#E24B4A", label: "Critical" }].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
        {hosps.map((h) => (
          <HospCard
            key={h.id}
            h={h}
            selected={selected === h.id}
            onClick={() => setSelected(selected === h.id ? null : h.id)}
          />
        ))}
      </div>

      {selectedHosp && <DetailPane h={selectedHosp} />}
    </div>
  );
}

// ─── TRANSFER ROUTING TAB ─────────────────────────────────────────────────────

const RANK_STYLES: Record<number, string> = {
  0: "bg-[#EAF3DE] text-[#3B6D11]",
  1: "bg-[#E6F1FB] text-[#185FA5]",
  2: "bg-[#F1EFE8] text-[#5F5E5A]",
  3: "bg-[#F1EFE8] text-[#5F5E5A]",
};

function TransferRouting() {
  const [fromId, setFromId] = useState(HOSPITALS[0].id);
  const [acuity, setAcuity] = useState<BedKey>("medsurg");
  const [specialty, setSpecialty] = useState("any");
  const [results, setResults] = useState<null | (Hospital & { score: number; hasSpec: boolean; bedAvail: number; bedTotal: number })[]>(null);

  function runTransfer() {
    const candidates = HOSPITALS.filter((h) => {
      if (h.id === fromId) return false;
      if (h.beds[acuity].avail < 1) return false;
      return true;
    });

    const scored = candidates.map((h) => {
      let score = 0;
      const bedPct = h.beds[acuity].total > 0 ? h.beds[acuity].avail / h.beds[acuity].total : 0;
      score += bedPct * 40;
      const hasSpec = specialty === "any" || h.specialties.includes(specialty) || h.specialties.includes("any");
      if (hasSpec) score += 35;
      if (h.type === "tertiary") score += 15;
      else if (h.type === "regional") score += 10;
      if (h.transfer_center) score += 10;
      return { ...h, score: Math.round(score), hasSpec, bedAvail: h.beds[acuity].avail, bedTotal: h.beds[acuity].total };
    }).sort((a, b) => b.score - a.score).slice(0, 4);

    setResults(scored);
  }

  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Find the best receiving hospital</div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-500">Sending hospital</label>
          <select
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="text-sm px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            {HOSPITALS.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-500">Acuity level</label>
          <select
            value={acuity}
            onChange={(e) => setAcuity(e.target.value as BedKey)}
            className="text-sm px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            <option value="icu">ICU / critical care</option>
            <option value="medsurg">Med-surg</option>
            <option value="behavioral">Behavioral health</option>
            <option value="snf">Skilled nursing / step-down</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-500">Specialty needed</label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="text-sm px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            <option value="any">Any / general medicine</option>
            <option value="cardiac">Cardiac</option>
            <option value="neuro">Neurology / stroke</option>
            <option value="ortho">Orthopedics</option>
            <option value="psych">Psychiatry</option>
            <option value="peds">Pediatrics</option>
            <option value="oncology">Oncology</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-500">Transport available</label>
          <select className="text-sm px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">
            <option value="ground">Ground ambulance</option>
            <option value="air">Air transport</option>
            <option value="either">Either</option>
          </select>
        </div>

        <button
          onClick={runTransfer}
          className="col-span-2 py-2 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors"
        >
          Find best match ↗
        </button>
      </div>

      {/* Results */}
      {results === null ? null : results.length === 0 ? (
        <div className="text-center py-8 text-sm text-slate-400">
          No hospitals with available capacity for this acuity level.
          <br />Consider out-of-state transfer or air transport to tertiary center.
        </div>
      ) : (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2.5">Recommended receiving hospitals</div>
          <div className="flex flex-col gap-2">
            {results.map((h, i) => {
              const tags = [
                { label: `${h.bedAvail} ${acuity} beds`, hit: h.bedAvail > 3 },
                { label: h.hasSpec ? (specialty === "any" ? "general med" : specialty) : `no ${specialty}`, hit: h.hasSpec },
                { label: h.transfer_center ? "transfer center" : "direct admit", hit: h.transfer_center },
                { label: h.type, hit: true },
              ];
              return (
                <div key={h.id} className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${RANK_STYLES[i]}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{h.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{h.region} county · {h.type}</div>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {tags.map((t) => (
                        <span
                          key={t.label}
                          className={`text-[11px] px-1.5 py-0.5 rounded-full border ${
                            t.hit
                              ? "bg-[#E6F1FB] text-[#185FA5] border-[#B5D4F4]"
                              : "bg-slate-50 dark:bg-slate-700 text-slate-500 border-slate-200 dark:border-slate-600"
                          }`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{h.score}</div>
                    <div className="text-[11px] text-slate-400">match score</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── REPATRIATION QUEUE TAB ───────────────────────────────────────────────────

function RepatriationQueue() {
  const [filter, setFilter] = useState("all");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  let patients = [...REPAT_PATIENTS];
  if (filter !== "all") patients = patients.filter((p) => p.at === filter);
  patients.sort((a, b) => b.days_over - a.days_over);

  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
        Patients ready for step-down or home hospital return
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-slate-500">At facility:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <option value="all">All tertiary centers</option>
          <option value="UVMMC">UVMMC</option>
          <option value="DHMC">Dartmouth-Hitchcock</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {patients.map((p) => {
          const homeH = HOSPITALS.find((h) => h.short === p.home || h.name.includes(p.home));
          const bedAvail = homeH ? homeH.beds[p.acuity].avail : 0;
          const canRepatriate = bedAvail > 0;
          const initials = p.name.split(" ").map((w) => w[0]).join("");

          return (
            <div key={p.id} className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sm font-semibold text-slate-500 shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {p.name} · {p.age}y · {p.dx}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  At <span className="font-medium text-slate-600 dark:text-slate-300">{p.at}</span> → home hospital:{" "}
                  <span className="font-medium text-slate-600 dark:text-slate-300">{p.home}</span> · {p.acuity} · {p.specialty}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  LOS: {p.los} days (target {p.target_los}) —{" "}
                  <span className="text-[#854F0B] font-semibold">{p.days_over}d over target</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {p.blocker} · {p.home} {p.acuity} beds:{" "}
                  <span className={`font-semibold ${canRepatriate ? "text-[#3B6D11]" : "text-[#A32D2D]"}`}>
                    {bedAvail} avail
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                {confirmId === p.id ? (
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-[11px] text-slate-500">Confirm transfer?</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setConfirmId(null)}
                        className="text-xs px-2 py-1 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { alert(`Transfer coordination initiated for ${p.name}`); setConfirmId(null); }}
                        className="text-xs px-2 py-1 rounded-md bg-[#185FA5] text-white hover:bg-[#145088]"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    disabled={!canRepatriate}
                    onClick={() => canRepatriate && setConfirmId(p.id)}
                    className={`text-xs px-3 py-1.5 border rounded-lg font-medium transition-colors ${
                      canRepatriate
                        ? "border-[#B5D4F4] text-[#185FA5] bg-white dark:bg-slate-800 hover:bg-[#E6F1FB]"
                        : "border-slate-200 dark:border-slate-600 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {canRepatriate ? "Initiate transfer" : "No bed available"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TICKER BAR ───────────────────────────────────────────────────────────────

function TickerBar() {
  const chips = HOSPITALS.slice(0, 8).map((h) => {
    const avail = totalAvail(h);
    const color = avail > 15 ? "#639922" : avail > 5 ? "#BA7517" : "#E24B4A";
    return { short: h.short, avail, color };
  });

  return (
    <div className="flex gap-2 flex-wrap pb-3.5 mb-0 border-b border-slate-200 dark:border-slate-700">
      {chips.map((c) => (
        <div
          key={c.short}
          className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1"
        >
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
          {c.short}:{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-100">{c.avail}</span> avail
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

type Tab = "capacity" | "transfer" | "repat";

const TABS: { id: Tab; label: string }[] = [
  { id: "capacity", label: "Capacity grid" },
  { id: "transfer", label: "Transfer routing" },
  { id: "repat", label: "Repatriation queue" },
];

export default function SystemVitalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("capacity");

  return (
    <div className="w-full font-sans text-slate-800 dark:text-slate-100 flex flex-col pb-20">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 dark:bg-red-950/20 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <Link
            href="/vermont-act-167"
            className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Vermont Act 167
          </Link>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
              Live Capacity · Synthetic Data
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-3">System Vitals</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm leading-relaxed">
            Bed capacity, interfacility transfer routing, and repatriation queue for Vermont&apos;s 14-hospital network.
            Identify capacity pressure, find the best receiving hospital for a transfer, and manage patients
            ready to return to their home facility.
          </p>
        </div>
      </div>

      {/* Main panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
        <TickerBar />

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mt-4 mb-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`text-sm px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? "border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-100 font-medium"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel content */}
        {activeTab === "capacity" && <CapacityGrid />}
        {activeTab === "transfer" && <TransferRouting />}
        {activeTab === "repat" && <RepatriationQueue />}
      </div>
    </div>
  );
}
