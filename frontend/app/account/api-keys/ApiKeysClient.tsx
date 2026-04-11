"use client";

import { useState, useTransition } from "react";

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  tier: string;
  requests_today: number;
  last_used_at: string | null;
  created_at: string;
  revoked_at: string | null;
}

interface Props {
  initialKeys: ApiKey[];
  userId: string;
}

export default function ApiKeysClient({ initialKeys }: Props) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys.filter(k => !k.revoked_at));
  const [newName, setNewName] = useState("");
  const [newTier, setNewTier] = useState<"researcher" | "enterprise">("researcher");
  const [justCreated, setJustCreated] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [revoking, setRevoking] = useState<string | null>(null);
  const [rotating, setRotating] = useState<string | null>(null);

  async function createKey(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await fetch("/api/keys/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), tier: newTier }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to create key");
        return;
      }

      setKeys(prev => [json.record, ...prev]);
      setJustCreated(json.key);
      setNewName("");
    });
  }

  async function revokeKey(id: string) {
    setRevoking(id);
    setError(null);

    const res = await fetch("/api/keys/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyId: id }),
    });

    setRevoking(null);

    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? "Failed to revoke key");
      return;
    }

    setKeys(prev => prev.filter(k => k.id !== id));
  }

  async function rotateKey(id: string) {
    setRotating(id);
    setError(null);

    const res = await fetch("/api/keys/rotate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyId: id }),
    });

    setRotating(null);

    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Failed to rotate key");
      return;
    }

    // Replace old key with new record, show new raw key
    setKeys(prev => [json.record, ...prev.filter(k => k.id !== id)]);
    setJustCreated(json.key);
  }

  async function copyKey(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* New key banner */}
      {justCreated && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5">
          <p className="text-emerald-900 font-bold mb-1">API key created — copy it now</p>
          <p className="text-emerald-700 text-xs mb-3">This key will not be shown again. Store it securely.</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-white border border-emerald-200 rounded-xl px-4 py-2 text-sm font-mono text-emerald-900 break-all">
              {justCreated}
            </code>
            <button
              onClick={() => copyKey(justCreated)}
              className="shrink-0 bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-emerald-700 transition-colors"
              aria-label="Copy API key"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={() => setJustCreated(null)}
            className="mt-3 text-xs text-emerald-700 hover:text-emerald-900 underline"
          >
            I&apos;ve saved it, dismiss
          </button>
        </div>
      )}

      {/* Create form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Create New Key</h2>
        <form onSubmit={createKey} className="flex items-end gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <label htmlFor="key-name" className="block text-xs font-bold text-slate-600 mb-1.5">Name</label>
            <input
              id="key-name"
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Research script"
              required
              maxLength={100}
              className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="min-w-36">
            <label htmlFor="key-tier" className="block text-xs font-bold text-slate-600 mb-1.5">Tier</label>
            <select
              id="key-tier"
              value={newTier}
              onChange={e => setNewTier(e.target.value as "researcher" | "enterprise")}
              className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white"
            >
              <option value="researcher">Researcher (1,000/day)</option>
              <option value="enterprise">Enterprise (unlimited)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isPending || !newName.trim()}
            className="shrink-0 bg-indigo-600 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating…" : "Create Key"}
          </button>
        </form>
        {error && <p className="text-xs text-rose-600 mt-3">{error}</p>}
      </div>

      {/* Key list */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Active Keys</h2>
        </div>
        {keys.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-slate-400">No active API keys yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {keys.map(key => (
              <li key={key.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm">{key.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <code className="font-mono">{key.key_prefix}…</code>
                    {" · "}{key.tier}
                    {" · "}{key.requests_today} req today
                    {key.last_used_at && ` · Last used ${new Date(key.last_used_at).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => rotateKey(key.id)}
                    disabled={rotating === key.id || revoking === key.id}
                    className="text-xs font-bold text-amber-600 hover:text-amber-800 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Rotate key "${key.name}"`}
                    title="Generate a new key — old key stays valid for 24 hours"
                  >
                    {rotating === key.id ? "Rotating…" : "Rotate"}
                  </button>
                  <button
                    onClick={() => revokeKey(key.id)}
                    disabled={revoking === key.id || rotating === key.id}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 border border-rose-200 rounded-lg px-3 py-1.5 hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Revoke key "${key.name}"`}
                  >
                    {revoking === key.id ? "Revoking…" : "Revoke"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Rate limits info */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-700 ty-body mb-2">Rate limits</p>
        <p>• <strong>Researcher</strong> — 1,000 requests per day (resets midnight UTC)</p>
        <p>• <strong>Enterprise</strong> — Unlimited (contact us for SLA)</p>
        <p>• All requests must include the <code className="font-mono bg-slate-100 px-1 rounded">X-HTR-API-Key</code> header</p>
      </div>
    </div>
  );
}
