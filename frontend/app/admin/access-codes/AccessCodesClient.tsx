"use client";

import React, { useState, useTransition } from "react";
import { TrashIcon, PlusIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ACCESS_DOMAINS } from "@/lib/brand";

type Code = {
  id: string;
  code: string;
  label: string | null;
  is_active: boolean;
  allowed_domains: string[];
  created_at: string;
};

// Short display label for a domain chip, e.g. "review .org".
function domainLabel(domain: string): string {
  const [name, tld] = domain.split(/\.(?=[^.]+$)/);
  const brand = name.replace("healthtransformation", "");
  return `${brand} .${tld}`;
}

function DomainCheckboxes({
  selected,
  onChange,
  disabled,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  const toggle = (domain: string) => {
    onChange(
      selected.includes(domain)
        ? selected.filter((d) => d !== domain)
        : [...selected, domain]
    );
  };
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {ACCESS_DOMAINS.map((domain) => (
        <label
          key={domain}
          className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={selected.includes(domain)}
            onChange={() => toggle(domain)}
            disabled={disabled}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
          />
          <span className="font-mono">{domain}</span>
        </label>
      ))}
    </div>
  );
}

export default function AccessCodesClient({ initialCodes }: { initialCodes: Code[] }) {
  const [codes, setCodes] = useState<Code[]>(initialCodes);
  const [newCode, setNewCode] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newDomains, setNewDomains] = useState<string[]>([...ACCESS_DOMAINS]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addError, setAddError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!newCode.trim()) return;
    if (newDomains.length === 0) {
      setAddError("Select at least one domain for this code.");
      return;
    }

    const res = await fetch("/api/admin/beta-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: newCode.trim(),
        label: newLabel.trim() || null,
        allowed_domains: newDomains,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setCodes((prev) => [...prev, data.code]);
      setNewCode("");
      setNewLabel("");
      setNewDomains([...ACCESS_DOMAINS]);
    } else {
      const data = await res.json().catch(() => ({}));
      setAddError(data.error || "Failed to add code. It may already exist.");
    }
  };

  const handleDomainsChange = (id: string, domains: string[]) => {
    if (domains.length === 0) return; // guarded by server too
    startTransition(async () => {
      const res = await fetch("/api/admin/beta-codes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, allowed_domains: domains }),
      });
      if (res.ok) {
        setCodes((prev) =>
          prev.map((c) => (c.id === id ? { ...c, allowed_domains: domains } : c))
        );
      }
    });
  };

  const handleToggle = (id: string, currentActive: boolean) => {
    startTransition(async () => {
      const res = await fetch("/api/admin/beta-codes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !currentActive }),
      });
      if (res.ok) {
        setCodes((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_active: !currentActive } : c))
        );
      }
    });
  };

  const handleDelete = (id: string, code: string) => {
    if (!confirm(`Delete access code "${code}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await fetch("/api/admin/beta-codes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCodes((prev) => prev.filter((c) => c.id !== id));
      }
    });
  };

  const activeCodes = codes.filter((c) => c.is_active);
  const inactiveCodes = codes.filter((c) => !c.is_active);

  return (
    <div className="max-w-2xl">

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-emerald-700">{activeCodes.length}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Active codes</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-slate-500">{inactiveCodes.length}</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Disabled codes</div>
        </div>
      </div>

      {/* Add new code */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="font-black text-slate-900 text-sm uppercase tracking-wide mb-4">Add New Access Code</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Access Code *</label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => { setNewCode(e.target.value); setAddError(""); }}
                placeholder="e.g. Jane_D_0.0.0"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-indigo-400"
                autoComplete="off"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Label (optional)</label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Jane D."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Allowed domains *</label>
            <DomainCheckboxes selected={newDomains} onChange={setNewDomains} disabled={isPending} />
          </div>
          {addError && <p className="text-rose-600 text-xs font-medium">{addError}</p>}
          <button
            type="submit"
            disabled={!newCode.trim() || isPending}
            className="self-start flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Add Code
          </button>
        </form>
      </div>

      {/* Code list */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-black text-slate-900 text-sm uppercase tracking-wide">All Access Codes</h2>
          <span className="text-xs text-slate-400">{codes.length} total</span>
        </div>

        {codes.length === 0 ? (
          <div className="px-6 py-10 text-center text-slate-400 text-sm">No access codes yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {codes.map((c) => (
              <div key={c.id} className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-sm font-bold text-slate-800">{c.code}</span>
                      {c.is_active
                        ? <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                        : <XCircleIcon className="w-4 h-4 text-slate-300 shrink-0" />
                      }
                    </div>
                    <div className="flex items-center gap-3">
                      {c.label && <span className="text-xs text-slate-500">{c.label}</span>}
                      <span className="text-[10px] text-slate-400">
                        Added {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggle(c.id, c.is_active)}
                      disabled={isPending}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-40 ${
                        c.is_active
                          ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100"
                          : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                    >
                      {c.is_active ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.code)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40"
                      title="Delete permanently"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Domain scope */}
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {(c.allowed_domains ?? []).length === 0 ? (
                    <span className="text-[11px] text-rose-500 font-semibold">No domains — code unusable</span>
                  ) : (
                    (c.allowed_domains ?? []).map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 rounded px-1.5 py-0.5"
                        title={d}
                      >
                        {domainLabel(d)}
                      </span>
                    ))
                  )}
                  <button
                    onClick={() => setEditingId(editingId === c.id ? null : c.id)}
                    disabled={isPending}
                    className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 underline disabled:opacity-40"
                  >
                    {editingId === c.id ? "Close" : "Edit domains"}
                  </button>
                </div>

                {editingId === c.id && (
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <DomainCheckboxes
                      selected={c.allowed_domains ?? []}
                      onChange={(next) => handleDomainsChange(c.id, next)}
                      disabled={isPending}
                    />
                    <p className="text-[10px] text-slate-400 mt-2">
                      Changes save immediately. At least one domain is required.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Disabled codes are rejected at the gate but kept for audit purposes. Delete removes permanently.
        Changes take effect immediately — no redeploy required.
      </p>
    </div>
  );
}
