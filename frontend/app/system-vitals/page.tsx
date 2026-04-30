"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon, PhoneIcon, TruckIcon, ClipboardDocumentListIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  VT_HOSPITALS as HOSPITALS,
  REPAT_PATIENTS,
  totalAvail,
  type VTHospital as Hospital,
  type BedKey,
} from "@/lib/data/system-vitals-data";

// ─── DRIVE-TIME MATRIX (minutes, approximate Vermont geography) ───────────────
const DRIVE_TIME: Record<string, Record<string, number>> = {
  uvmmc:   { dhmc:105, cvmc:40,  svmc:130, rrmc:65,  nvrh:95,  nch:100, pmh:35,  sph:110, gifford:55, mah:90,  bmh:120, gcottage:130, copley:55  },
  dhmc:    { cvmc:90,  svmc:90,  rrmc:80,  nvrh:130, nch:140,  pmh:95,  sph:50,  gifford:70, mah:40,  bmh:70,  gcottage:75,  copley:115 },
  cvmc:    { svmc:120, rrmc:55,  nvrh:75,  nch:85,   pmh:55,   sph:80,  gifford:25, mah:70,  bmh:100, gcottage:110, copley:30  },
  svmc:    { rrmc:60,  nvrh:175, nch:185,  pmh:120,  sph:100,  gifford:100, mah:90,  bmh:55,  gcottage:60,  copley:130 },
  rrmc:    { nvrh:120, nch:130,  pmh:75,   sph:60,   gifford:50, mah:55,  bmh:70,  gcottage:90,  copley:70  },
  nvrh:    { nch:35,   pmh:120,  sph:140,  gifford:75, mah:120, bmh:155, gcottage:165, copley:80  },
  nch:     { pmh:130,  sph:150,  gifford:90, mah:130, bmh:165, gcottage:175, copley:90  },
  pmh:     { sph:110,  gifford:65, mah:90,  bmh:110, gcottage:120, copley:55  },
  sph:     { gifford:65, mah:25,  bmh:60,  gcottage:80,  copley:95  },
  gifford: { mah:50,   bmh:85,  gcottage:100, copley:40  },
  mah:     { bmh:55,   gcottage:70,  copley:80  },
  bmh:     { gcottage:20,  copley:115 },
  gcottage:{ copley:130 },
  copley:  {},
};

function getDriveTime(a: string, b: string): number {
  if (a === b) return 0;
  return DRIVE_TIME[a]?.[b] ?? DRIVE_TIME[b]?.[a] ?? 120;
}

// ─── ALGORITHM DEFINITIONS ────────────────────────────────────────────────────

type TransferAlgoId = "balanced" | "specialty_first" | "closest" | "capacity_first" | "conserve_tertiary";
type RepatAlgoId    = "days_over" | "home_bed_ready" | "closest_home" | "combined";

interface AlgoDef<T extends string> {
  id: T;
  label: string;
  description: string;
}

const TRANSFER_ALGOS: AlgoDef<TransferAlgoId>[] = [
  { id: "balanced",          label: "Best overall match",       description: "Balances bed availability, specialty coverage, hospital tier, and transfer infrastructure. Best general-purpose choice." },
  { id: "specialty_first",   label: "Specialty first",          description: "Prioritizes specialty-matched facilities above all else. Best for complex or subspecialty cases where clinical expertise is the binding constraint." },
  { id: "closest",           label: "Closest available bed",    description: "Ranks by estimated drive time from the sending hospital. Best for time-sensitive stable transfers where minutes matter." },
  { id: "capacity_first",    label: "Most available capacity",   description: "Maximizes the open bed percentage in the requested unit. Best during system-wide surge when finding a reliable bed fast is the priority." },
  { id: "conserve_tertiary", label: "Conserve tertiary capacity",description: "Prefers regional and critical access hospitals over tertiary centers. Best for step-down patients who don't require advanced subspecialty resources." },
];

const REPAT_ALGOS: AlgoDef<RepatAlgoId>[] = [
  { id: "days_over",      label: "Most overdue first",       description: "Sorts by days past clinical target length of stay. Best for clearing the most urgent LOS backlog at tertiary centers." },
  { id: "home_bed_ready", label: "Bed-confirmed first",      description: "Surfaces patients whose home hospital already has a confirmed bed available in the required unit. Best for completing transfers that are logistically ready now." },
  { id: "closest_home",   label: "Shortest transfer distance",description: "Prioritizes patients whose home hospital is geographically closest to the current tertiary center. Best for minimizing transport burden." },
  { id: "combined",       label: "Combined priority score",   description: "Weighs days overdue, home bed availability, and transfer distance together. Best balanced queue management when multiple patients are ready." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function bedColor(avail: number, total: number) {
  if (total === 0) return "#B4B2A9";
  const pct = avail / total;
  if (pct > 0.2) return "#639922";
  if (pct > 0.05) return "#BA7517";
  return "#E24B4A";
}

// Returns chip bg/text classes based on availability count
function chipStyle(avail: number): { bg: string; text: string; border: string } {
  if (avail > 15) return { bg: "bg-[#EAF3DE]", text: "text-[#2A5A0A]", border: "border-[#B8DFA0]" };
  if (avail > 5)  return { bg: "bg-[#FEF3C7]", text: "text-[#854F0B]", border: "border-[#FAC775]" };
  return              { bg: "bg-[#FCEBEB]", text: "text-[#A32D2D]", border: "border-[#F5B5B5]" };
}

const STATUS_STYLES = {
  green: "bg-[#EAF3DE] text-[#2A5A0A] border border-[#B8DFA0]",
  amber: "bg-[#FEF3C7] text-[#854F0B] border border-[#FAC775]",
  red:   "bg-[#FCEBEB] text-[#A32D2D] border border-[#F5B5B5]",
};

function overallStatus(h: Hospital): { cls: keyof typeof STATUS_STYLES; label: string } {
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

// ─── SHARED LABEL STYLE ───────────────────────────────────────────────────────
// Fix #4: replace all muted slate-400/500 labels with slate-600 minimum
const LABEL_SM  = "text-xs font-semibold text-slate-600 dark:text-slate-300";
const LABEL_XS  = "text-[11px] font-medium text-slate-600 dark:text-slate-300";
const LABEL_CAP = "text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400";

// ─── ALGORITHM SELECTOR WIDGET ────────────────────────────────────────────────

function AlgoSelector<T extends string>({ algos, value, onChange }: {
  algos: AlgoDef<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  const current = algos.find((a) => a.id === value)!;
  return (
    <div className="mb-5 p-3.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl">
      <div className={`${LABEL_CAP} mb-2`}>Ranking algorithm</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full text-sm font-semibold px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      >
        {algos.map((a) => (
          <option key={a.id} value={a.id}>{a.label}</option>
        ))}
      </select>
      <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
        {current.description}
      </p>
    </div>
  );
}

// ─── CAPACITY GRID TAB ────────────────────────────────────────────────────────

const BED_TYPES: { k: BedKey; label: string }[] = [
  { k: "icu",        label: "ICU" },
  { k: "medsurg",    label: "Med-surg" },
  { k: "behavioral", label: "Behav." },
  { k: "snf",        label: "SNF/step-dn" },
];

function HospCard({ h, selected, onClick }: { h: Hospital; selected: boolean; onClick: () => void }) {
  const st = overallStatus(h);
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-xl p-3.5 cursor-pointer transition-all ${
        selected
          ? "border-2 border-[#185FA5] shadow-md"
          : "border border-slate-200 dark:border-slate-700 hover:border-slate-400 hover:shadow-sm"
      }`}
    >
      <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-0.5 leading-tight">{h.name}</div>
      {/* Fix #4: type/region in slate-600 not slate-400 */}
      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-2.5">
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
              {/* Fix #4: label in slate-700 */}
              <div className="w-16 text-[11px] font-semibold text-slate-700 dark:text-slate-300 shrink-0">{label}</div>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
              </div>
              {/* Fix #4: counts in slate-700 */}
              <div className="w-10 text-[11px] font-bold text-slate-700 dark:text-slate-300 text-right shrink-0">{b.avail}/{b.total}</div>
            </div>
          );
        })}
      </div>
      <div className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full mt-2.5 font-semibold ${STATUS_STYLES[st.cls]}`}>
        {st.label}
      </div>
    </div>
  );
}

function DetailPane({ h }: { h: Hospital }) {
  const total   = Object.values(h.beds).reduce((s, b) => s + b.total, 0);
  const avail   = totalAvail(h);
  const occ     = total > 0 ? Math.round(((total - avail) / total) * 100) : 0;
  const pending = Math.round(avail * 0.3);
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mt-3.5">
      <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">{h.name} — detail view</div>
      <div className="grid grid-cols-4 gap-2.5">
        {[
          { label: "Total beds",        val: String(total),   sub: "all types",        color: "text-slate-900 dark:text-slate-100" },
          { label: "Available now",     val: String(avail),   sub: "across all units", color: "text-[#2A5A0A]" },
          { label: "Occupancy",         val: `${occ}%`,       sub: "current",          color: "text-slate-900 dark:text-slate-100" },
          { label: "Pending discharge", val: String(pending), sub: "est. next 24h",    color: "text-slate-900 dark:text-slate-100" },
        ].map((m) => (
          <div key={m.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
            <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">{m.label}</div>
            <div className={`text-xl font-bold ${m.color}`}>{m.val}</div>
            <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
        Specialties on staff: <span className="text-slate-800 dark:text-slate-200">{h.specialties.join(", ")}</span>
        {h.transfer_center && <span className="ml-2 text-[#185FA5] font-bold">· Transfer center active</span>}
      </div>
    </div>
  );
}

function CapacityGrid() {
  const [filter,   setFilter]   = useState("all");
  const [sort,     setSort]     = useState("name");
  const [selected, setSelected] = useState<string | null>(null);

  const uvmmc     = HOSPITALS.find((h) => h.id === "uvmmc")!;
  const showSurge = uvmmc.beds.icu.avail <= 2;

  let hosps = [...HOSPITALS];
  if (filter !== "all") hosps = hosps.filter((h) => h.type === filter);
  if (sort === "avail")       hosps.sort((a, b) => totalAvail(b) - totalAvail(a));
  else if (sort === "stress") hosps.sort((a, b) => totalAvail(a) - totalAvail(b));
  else                        hosps.sort((a, b) => a.name.localeCompare(b.name));

  const selectedHosp = selected ? HOSPITALS.find((h) => h.id === selected) : null;

  return (
    <div>
      {showSurge && (
        <div className="bg-[#FAEEDA] border border-[#FAC775] rounded-lg px-3 py-2 text-xs font-semibold text-[#854F0B] mb-3.5">
          ⚠ Surge alert: UVMMC ICU at 97% capacity. Transfers may be delayed.
        </div>
      )}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={LABEL_SM}>Filter:</span>
        <select value={filter} onChange={(e) => { setFilter(e.target.value); setSelected(null); }}
          className="text-xs font-semibold px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          <option value="all">All hospitals</option>
          <option value="critical">Critical access only</option>
          <option value="regional">Regional only</option>
          <option value="tertiary">Tertiary only</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="text-xs font-semibold px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          <option value="name">Sort: name</option>
          <option value="avail">Sort: most available</option>
          <option value="stress">Sort: highest stress</option>
        </select>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mb-3 flex-wrap">
        {[
          { bg: "bg-[#EAF3DE]", border: "border-[#B8DFA0]", text: "text-[#2A5A0A]", label: "Available (>20%)" },
          { bg: "bg-[#FEF3C7]", border: "border-[#FAC775]",  text: "text-[#854F0B]", label: "Limited (5–20%)" },
          { bg: "bg-[#FCEBEB]", border: "border-[#F5B5B5]",  text: "text-[#A32D2D]", label: "Critical (<5%)" },
        ].map((l) => (
          <div key={l.label} className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${l.bg} ${l.border} ${l.text}`}>
            {l.label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
        {hosps.map((h) => (
          <HospCard key={h.id} h={h} selected={selected === h.id}
            onClick={() => setSelected(selected === h.id ? null : h.id)} />
        ))}
      </div>
      {selectedHosp && <DetailPane h={selectedHosp} />}
    </div>
  );
}

// ─── TRANSFER ROUTING SCORING ─────────────────────────────────────────────────

type ScoredHospital = Hospital & { score: number; hasSpec: boolean; bedAvail: number; bedTotal: number; driveMin: number };

function scoreTransfer(candidates: Hospital[], fromId: string, acuity: BedKey, specialty: string, algo: TransferAlgoId): ScoredHospital[] {
  return candidates.map((h): ScoredHospital => {
    const bedAvail = h.beds[acuity].avail;
    const bedTotal = h.beds[acuity].total;
    const bedPct   = bedTotal > 0 ? bedAvail / bedTotal : 0;
    const hasSpec  = specialty === "any" || h.specialties.includes(specialty) || h.specialties.includes("any");
    const driveMin = getDriveTime(fromId, h.id);
    let score = 0;
    if (algo === "balanced")          { score += bedPct*40; if(hasSpec)score+=35; score+=h.type==="tertiary"?15:h.type==="regional"?10:0; if(h.transfer_center)score+=10; }
    else if (algo === "specialty_first") { if(hasSpec)score+=60; score+=bedPct*25; score+=h.type==="tertiary"?10:h.type==="regional"?5:0; if(h.transfer_center)score+=5; }
    else if (algo === "closest")      { score+=Math.max(0,100-(driveMin/180)*100)*0.7; if(bedAvail>0)score+=20; if(hasSpec)score+=10; }
    else if (algo === "capacity_first"){ score+=bedPct*70; if(hasSpec)score+=20; if(h.transfer_center)score+=10; }
    else if (algo === "conserve_tertiary"){ score+=h.type==="critical"?30:h.type==="regional"?20:0; score+=bedPct*40; if(hasSpec)score+=20; if(h.transfer_center)score+=10; }
    return { ...h, score: Math.round(score), hasSpec, bedAvail, bedTotal, driveMin };
  }).sort((a, b) => b.score - a.score).slice(0, 4);
}

const RANK_STYLES: Record<number, string> = {
  0: "bg-[#EAF3DE] text-[#2A5A0A] border border-[#B8DFA0]",
  1: "bg-[#E6F1FB] text-[#185FA5] border border-[#B5D4F4]",
  2: "bg-slate-100 text-slate-600 border border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
  3: "bg-slate-100 text-slate-600 border border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
};

function TransferRouting({ algo, onAlgoChange }: { algo: TransferAlgoId; onAlgoChange: (v: TransferAlgoId) => void }) {
  const [fromId,    setFromId]    = useState(HOSPITALS[0].id);
  const [acuity,    setAcuity]    = useState<BedKey>("medsurg");
  const [specialty, setSpecialty] = useState("any");
  const [results,   setResults]   = useState<ScoredHospital[] | null>(null);

  function runTransfer() {
    const candidates = HOSPITALS.filter((h) => h.id !== fromId && h.beds[acuity].avail >= 1);
    setResults(scoreTransfer(candidates, fromId, acuity, specialty, algo));
  }

  const currentAlgo = TRANSFER_ALGOS.find((a) => a.id === algo)!;
  const selectCls = "text-sm font-semibold px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full";

  return (
    <div>
      <AlgoSelector algos={TRANSFER_ALGOS} value={algo} onChange={onAlgoChange} />

      {/* Form card */}
      <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-5">
        <div className={`${LABEL_CAP} mb-4`}>Find the best receiving hospital</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className={LABEL_SM}>Sending hospital</label>
            <select value={fromId} onChange={(e) => setFromId(e.target.value)} className={selectCls}>
              {HOSPITALS.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={LABEL_SM}>Acuity level</label>
            <select value={acuity} onChange={(e) => setAcuity(e.target.value as BedKey)} className={selectCls}>
              <option value="icu">ICU / critical care</option>
              <option value="medsurg">Med-surg</option>
              <option value="behavioral">Behavioral health</option>
              <option value="snf">Skilled nursing / step-down</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={LABEL_SM}>Specialty needed</label>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={selectCls}>
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
            <label className={LABEL_SM}>Transport available</label>
            <select className={selectCls}>
              <option value="ground">Ground ambulance</option>
              <option value="air">Air transport</option>
              <option value="either">Either</option>
            </select>
          </div>
        </div>
        {/* Fix #3: prominent colored Find Best Match button */}
        <button onClick={runTransfer}
          className="w-full py-3 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Find best match
        </button>
      </div>

      {results === null ? null : results.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-2xl mb-2">🏥</div>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">No capacity found for this acuity level</div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Consider out-of-state transfer or air transport to a tertiary center.</div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className={LABEL_CAP}>Recommended receiving hospitals</div>
            <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              Ranked by: {currentAlgo.label}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {results.map((h, i) => {
              const tags = [
                { label: `${h.bedAvail} ${acuity} beds`, hit: h.bedAvail > 3 },
                { label: h.hasSpec ? (specialty === "any" ? "general med" : specialty) : `no ${specialty}`, hit: h.hasSpec },
                { label: h.transfer_center ? "transfer center" : "direct admit", hit: h.transfer_center },
                { label: h.type, hit: true },
                { label: `~${h.driveMin} min drive`, hit: h.driveMin < 60 },
              ];
              return (
                <div key={h.id} className={`flex items-center gap-3 bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 ${i === 0 ? "border-[#185FA5] shadow-sm" : "border-slate-200 dark:border-slate-700"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${RANK_STYLES[i]}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{h.name}</div>
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">{h.region} county · {h.type}</div>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {tags.map((t) => (
                        <span key={t.label}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                            t.hit
                              ? "bg-[#E6F1FB] text-[#185FA5] border-[#B5D4F4]"
                              : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600"
                          }`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-xl font-black ${i === 0 ? "text-[#185FA5]" : "text-slate-800 dark:text-slate-100"}`}>{h.score}</div>
                    <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400">match score</div>
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

// ─── TRANSFER CONFIRMATION PANEL (Fix #5) ─────────────────────────────────────

const TRANSPORT_OPTIONS = [
  { icon: TruckIcon,               name: "Vermont Emergency Medical Services", detail: "Ground ALS unit · Est. 25–40 min ETA", phone: "(802) 863-7310", available: true },
  { icon: TruckIcon,               name: "North East Ambulance",               detail: "Ground BLS unit · Est. 35–55 min ETA", phone: "(802) 748-8171", available: true },
  { icon: PhoneIcon,               name: "Air Methods — UVMMC MedFlight",      detail: "Helicopter · Est. 15–20 min ETA",     phone: "(802) 656-2560", available: false },
  { icon: UserGroupIcon,           name: "VT Social Services Transport",        detail: "Non-emergency medical transport",     phone: "(802) 241-2220", available: true },
  { icon: ClipboardDocumentListIcon,name: "Receiving Hospital — Case Management",detail: "Coordinate direct bed assignment",    phone: "(802) 371-4100", available: true },
];

function TransferConfirmPanel({ patientName, onDone }: { patientName: string; onDone: () => void }) {
  const [contacted, setContacted] = useState<Set<number>>(new Set());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-5 py-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleIcon className="w-5 h-5 text-indigo-200" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Transfer initiated</span>
            </div>
            <h3 className="text-white font-black text-lg leading-tight">Coordinating transfer for {patientName}</h3>
            <p className="text-indigo-200 text-xs font-medium mt-1">Select transport & coordination contacts to notify</p>
          </div>
          <button onClick={onDone} className="text-indigo-200 hover:text-white transition-colors ml-3 shrink-0 mt-0.5">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Transport options */}
        <div className="p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {TRANSPORT_OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            const done = contacted.has(i);
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                done
                  ? "bg-[#EAF3DE] border-[#B8DFA0]"
                  : opt.available
                    ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 opacity-60"
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${done ? "bg-[#3B6D11]" : "bg-indigo-100 dark:bg-indigo-900/40"}`}>
                  {done
                    ? <CheckCircleIcon className="w-5 h-5 text-white" />
                    : <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">{opt.name}</div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">{opt.detail}</div>
                  <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{opt.phone}</div>
                </div>
                {!opt.available ? (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full shrink-0">Unavailable</span>
                ) : done ? (
                  <span className="text-[10px] font-bold text-[#2A5A0A] bg-[#EAF3DE] px-2 py-0.5 rounded-full shrink-0">Notified ✓</span>
                ) : (
                  <button onClick={() => setContacted(new Set([...contacted, i]))}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                    Contact
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-3 text-center">
            {contacted.size} of {TRANSPORT_OPTIONS.filter(o => o.available).length} available contacts notified
          </div>
          <button onClick={onDone}
            className="w-full py-2.5 text-sm font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-slate-700 dark:hover:bg-white transition-colors">
            Close — transfer log saved
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── REPATRIATION SCORING ─────────────────────────────────────────────────────

function scoreRepat(patients: typeof REPAT_PATIENTS, algo: RepatAlgoId): typeof REPAT_PATIENTS {
  const withScore = patients.map((p) => {
    const homeH    = HOSPITALS.find((h) => h.short === p.home || h.name.includes(p.home));
    const bedAvail = homeH ? homeH.beds[p.acuity].avail : 0;
    const tertId   = p.at === "UVMMC" ? "uvmmc" : "dhmc";
    const homeId   = homeH?.id ?? "";
    const driveMin = getDriveTime(tertId, homeId);
    let score = 0;
    if      (algo === "days_over")      score = p.days_over * 10;
    else if (algo === "home_bed_ready") score = bedAvail > 0 ? 100 + p.days_over : 0;
    else if (algo === "closest_home")   score = Math.max(0, 200 - driveMin);
    else if (algo === "combined")       score = (p.days_over * 20) + (bedAvail > 0 ? 40 : 0) + Math.max(0, 40 - driveMin / 5);
    return { ...p, _score: score };
  });
  return withScore
    .sort((a, b) => (b as typeof b & { _score: number })._score - (a as typeof a & { _score: number })._score)
    .map(({ _score: _s, ...rest }) => rest) as typeof REPAT_PATIENTS;
}

function RepatriationQueue({ algo, onAlgoChange }: { algo: RepatAlgoId; onAlgoChange: (v: RepatAlgoId) => void }) {
  const [filter,        setFilter]        = useState("all");
  const [confirmId,     setConfirmId]     = useState<string | null>(null);
  const [showPanel,     setShowPanel]     = useState(false);
  const [panelPatient,  setPanelPatient]  = useState<string>("");

  let patients = [...REPAT_PATIENTS];
  if (filter !== "all") patients = patients.filter((p) => p.at === filter);
  patients = scoreRepat(patients, algo);

  const currentAlgo = REPAT_ALGOS.find((a) => a.id === algo)!;

  return (
    <div>
      {/* Fix #5: full-screen coordination panel */}
      {showPanel && <TransferConfirmPanel patientName={panelPatient} onDone={() => setShowPanel(false)} />}

      <AlgoSelector algos={REPAT_ALGOS} value={algo} onChange={onAlgoChange} />

      <div className={`${LABEL_CAP} mb-3`}>Patients ready for step-down or home hospital return</div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={LABEL_SM}>At facility:</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="text-xs font-semibold px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <option value="all">All tertiary centers</option>
            <option value="UVMMC">UVMMC</option>
            <option value="DHMC">Dartmouth-Hitchcock</option>
          </select>
        </div>
        <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
          Sorted by: {currentAlgo.label}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {patients.map((p) => {
          const homeH    = HOSPITALS.find((h) => h.short === p.home || h.name.includes(p.home));
          const bedAvail = homeH ? homeH.beds[p.acuity].avail : 0;
          const canRepat = bedAvail > 0;
          const tertId   = p.at === "UVMMC" ? "uvmmc" : "dhmc";
          const driveMin = getDriveTime(tertId, homeH?.id ?? "");
          const initials = p.name.split(" ").map((w) => w[0]).join("");

          return (
            <div key={p.id} className={`bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 transition-all ${canRepat ? "border-slate-200 dark:border-slate-700 hover:border-indigo-200" : "border-slate-200 dark:border-slate-700 opacity-80"}`}>
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${canRepat ? "bg-[#EAF3DE] text-[#2A5A0A]" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{p.name} · {p.age}y</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.days_over >= 4 ? "bg-[#FCEBEB] text-[#A32D2D]" : "bg-[#FEF3C7] text-[#854F0B]"}`}>
                      {p.days_over}d over target
                    </span>
                    {canRepat && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF3DE] text-[#2A5A0A]">Bed confirmed</span>}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{p.dx}</div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                    At <span className="font-bold text-slate-800 dark:text-slate-200">{p.at}</span>
                    {" "}→ home: <span className="font-bold text-slate-800 dark:text-slate-200">{p.home}</span>
                    {" "}· {p.acuity} · {p.specialty}
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      LOS: {p.los}d (target {p.target_los})
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">~{driveMin} min drive</span>
                    <span className={`text-[11px] font-bold ${canRepat ? "text-[#2A5A0A]" : "text-[#A32D2D]"}`}>
                      {bedAvail} {p.acuity} beds at {p.home}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5 italic">{p.blocker}</div>
                </div>

                {/* Action */}
                <div className="shrink-0 pt-0.5">
                  {confirmId === p.id ? (
                    <div className="flex flex-col gap-1.5 items-end">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Confirm?</span>
                      <div className="flex gap-1.5">
                        <button onClick={() => setConfirmId(null)}
                          className="text-xs font-bold px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50">
                          Cancel
                        </button>
                        <button
                          onClick={() => { setPanelPatient(p.name); setConfirmId(null); setShowPanel(true); }}
                          className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                          Confirm
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      disabled={!canRepat}
                      onClick={() => canRepat && setConfirmId(p.id)}
                      className={`text-xs font-bold px-3 py-2 border rounded-lg transition-colors ${
                        canRepat
                          ? "border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700 dark:hover:bg-indigo-900/50"
                          : "border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed"
                      }`}>
                      {canRepat ? "Initiate transfer" : "No bed available"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TICKER BAR (Fix #1) ──────────────────────────────────────────────────────

function TickerBar() {
  // Fix #1: all 14 hospitals, colored background chips
  const chips = HOSPITALS.map((h) => {
    const avail = totalAvail(h);
    const style = chipStyle(avail);
    return { short: h.short, avail, style };
  });
  return (
    <div className="flex gap-1.5 flex-wrap pb-3.5 border-b border-slate-200 dark:border-slate-700">
      {chips.map((c) => (
        <div key={c.short}
          className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${c.style.bg} ${c.style.border} ${c.style.text}`}>
          {c.short}: <span className="font-black">{c.avail}</span> avail
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

type Tab = "capacity" | "transfer" | "repat";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "capacity", label: "Capacity grid",      icon: "🏥" },
  { id: "transfer", label: "Transfer routing",   icon: "🔀" },
  { id: "repat",    label: "Repatriation queue", icon: "🏠" },
];

export default function SystemVitalsPage() {
  const [activeTab,    setActiveTab]    = useState<Tab>("capacity");
  const [transferAlgo, setTransferAlgo] = useState<TransferAlgoId>("balanced");
  const [repatAlgo,    setRepatAlgo]    = useState<RepatAlgoId>("days_over");

  return (
    <div className="w-full font-sans text-slate-800 dark:text-slate-100 flex flex-col pb-20">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 dark:bg-red-950/20 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <Link href="/vermont-act-167"
            className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Vermont Act 167
          </Link>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
              Live Capacity · Synthetic Data
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-3">System Vitals</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm font-medium leading-relaxed">
            Bed capacity, interfacility transfer routing, and repatriation queue for Vermont&apos;s 14-hospital network.
            Identify capacity pressure, find the best receiving hospital for a transfer, and manage patients
            ready to return to their home facility.
          </p>
        </div>
      </div>

      {/* Main panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 pb-0">
          <TickerBar />
        </div>

        {/* Fix #2: Raised tabs matching HubPageTemplate pattern */}
        <div className="px-5 pt-4">
          <nav className="flex items-end border border-slate-200 dark:border-slate-700 rounded-t-xl px-2 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm pt-2 gap-x-1">
            {TABS.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r
                    ${isActive
                      ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 z-10 -mb-px shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 mt-1.5"
                    }`}>
                  <span>{t.icon}</span>
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab content */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-700">
          {activeTab === "capacity" && <CapacityGrid />}
          {activeTab === "transfer" && <TransferRouting algo={transferAlgo} onAlgoChange={setTransferAlgo} />}
          {activeTab === "repat"    && <RepatriationQueue algo={repatAlgo} onAlgoChange={setRepatAlgo} />}
        </div>
      </div>
    </div>
  );
}
