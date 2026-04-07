"use client";

import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon, UserCircleIcon, PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";

const ORG_TYPE_LABELS: Record<string, string> = {
  health_system: "Health System",
  health_plan:   "Health Plan",
  state_agency:  "State Agency",
  federal_agency:"Federal Agency",
  aco:           "ACO",
  fqhc:          "FQHC",
  cah:           "Critical Access Hospital",
  amc:           "Academic Medical Center",
  consulting:    "Consulting",
  vendor:        "Health IT Vendor",
  nonprofit:     "Nonprofit",
  academia:      "Academia",
  other:         "Other",
};

const PILLAR_OPTIONS = ["policy", "economics", "technology", "clinical", "equity", "operations"];

const PILLAR_COLORS: Record<string, string> = {
  policy:     "bg-sky-100 text-sky-700",
  economics:  "bg-emerald-100 text-emerald-700",
  technology: "bg-indigo-100 text-indigo-700",
  clinical:   "bg-rose-100 text-rose-700",
  equity:     "bg-violet-100 text-violet-700",
  operations: "bg-teal-100 text-teal-700",
};

interface Profile {
  id: string;
  display_name: string;
  title: string | null;
  organization: string | null;
  organization_type: string | null;
  bio: string | null;
  pillars: string[];
  state: string | null;
  linkedin_url: string | null;
  created_at: string;
}

export default function DirectoryClient() {
  const [profiles, setProfiles]     = useState<Profile[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [q, setQ]                   = useState("");
  const [orgFilter, setOrgFilter]   = useState("");
  const [pillarFilter, setPillarFilter] = useState("");

  // Edit own profile
  const [showEdit, setShowEdit]     = useState(false);
  const [saving, setSaving]         = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [form, setForm] = useState({
    display_name: "", title: "", organization: "",
    organization_type: "", bio: "", pillars: [] as string[],
    state: "", linkedin_url: "", is_public: true,
  });

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (q)           params.set("q", q);
      if (orgFilter)   params.set("org_type", orgFilter);
      if (pillarFilter) params.set("pillar", pillarFilter);

      const res = await fetch(`/api/directory?${params.toString()}`);
      if (res.status === 401) { setError("Sign in to view the member directory."); setLoading(false); return; }
      const json = await res.json();
      setProfiles(json.profiles ?? []);
    } catch {
      setError("Failed to load directory.");
    } finally {
      setLoading(false);
    }
  }, [q, orgFilter, pillarFilter]);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/directory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error); }
      setSaveSuccess(true);
      setShowEdit(false);
      fetchProfiles();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  function togglePillar(p: string) {
    setForm(f => ({
      ...f,
      pillars: f.pillars.includes(p) ? f.pillars.filter(x => x !== p) : [...f.pillars, p],
    }));
  }

  return (
    <div className="space-y-5">
      {/* Controls bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, org, or title…"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <select
          value={orgFilter}
          onChange={e => setOrgFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-400"
        >
          <option value="">All org types</option>
          {Object.entries(ORG_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select
          value={pillarFilter}
          onChange={e => setPillarFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-400"
        >
          <option value="">All pillars</option>
          {PILLAR_OPTIONS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
        </select>
        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shrink-0"
        >
          <PencilSquareIcon className="w-4 h-4" /> Edit My Profile
        </button>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-bold">
          <CheckIcon className="w-4 h-4" /> Profile saved successfully.
        </div>
      )}

      {/* Edit profile modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-black text-slate-900 text-xl mb-5">My Directory Profile</h2>
            <form onSubmit={saveProfile} className="space-y-4">
              {[
                { id: "display_name", label: "Display Name *", placeholder: "Dr. Jane Smith", required: true },
                { id: "title", label: "Title / Role", placeholder: "Chief Medical Officer" },
                { id: "organization", label: "Organization", placeholder: "Green Mountain Health" },
                { id: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/…" },
              ].map(f => (
                <div key={f.id}>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{f.label}</label>
                  <input
                    type="text"
                    required={f.required}
                    placeholder={f.placeholder}
                    value={(form as Record<string, unknown>)[f.id] as string}
                    onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Organization Type</label>
                <select
                  value={form.organization_type}
                  onChange={e => setForm(f => ({ ...f, organization_type: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm bg-white outline-none focus:border-indigo-400"
                >
                  <option value="">Select…</option>
                  {Object.entries(ORG_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Bio (max 600 chars)</label>
                <textarea
                  rows={3}
                  maxLength={600}
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Brief professional bio…"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Pillar Interests</label>
                <div className="flex flex-wrap gap-2">
                  {PILLAR_OPTIONS.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePillar(p)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                        form.pillars.includes(p)
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={form.is_public}
                  onChange={e => setForm(f => ({ ...f, is_public: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="is_public" className="text-sm text-slate-700">
                  Show profile in the member directory
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm"
                >
                  {saving ? "Saving…" : "Save Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-200 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results */}
      {error ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-800 text-sm font-semibold">{error}</div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400">
          <UserCircleIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No profiles found.</p>
          <p className="text-sm mt-1">Be the first — click "Edit My Profile" to add yourself.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-400 font-semibold">{profiles.length} member{profiles.length !== 1 ? "s" : ""}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map(p => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 font-black text-base">
                      {p.display_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-sm leading-tight truncate">{p.display_name}</p>
                    {p.title && <p className="text-slate-500 text-xs truncate">{p.title}</p>}
                    {p.organization && (
                      <p className="text-slate-400 text-xs truncate">{p.organization}</p>
                    )}
                  </div>
                </div>

                {p.organization_type && (
                  <span className="inline-block text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full mb-2">
                    {ORG_TYPE_LABELS[p.organization_type] ?? p.organization_type}
                  </span>
                )}

                {p.bio && (
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-3">{p.bio}</p>
                )}

                {p.pillars?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.pillars.map(pillar => (
                      <span
                        key={pillar}
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${PILLAR_COLORS[pillar] ?? "bg-slate-100 text-slate-600"}`}
                      >
                        {pillar.charAt(0).toUpperCase() + pillar.slice(1)}
                      </span>
                    ))}
                  </div>
                )}

                {p.linkedin_url && (
                  <a
                    href={p.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
