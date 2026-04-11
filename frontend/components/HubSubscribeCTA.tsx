"use client";

import React, { useState } from "react";

interface HubSubscribeCTAProps {
  pillar: string;
  bgClass: string;
  buttonClass: string;
}

export default function HubSubscribeCTA({ pillar, bgClass, buttonClass }: HubSubscribeCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pillar }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Subscription failed");

      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Subscription failed");
    }
  };

  return (
    <div className={`mt-16 p-8 rounded-2xl ${bgClass} text-center border border-slate-100`}>
      <h3 className="text-2xl font-black text-slate-900 mb-4">
        Stay Ahead in {pillar}
      </h3>
      <p className="ty-hero text-slate-700 mb-8 max-w-2xl mx-auto">
        Get weekly briefings on the metrics that matter. No fluff, just intelligence.
      </p>
      
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50"
          required
        />
        <button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
          className={`px-6 py-3 rounded-lg font-bold text-white transition-colors shadow-sm disabled:opacity-70 ${buttonClass}`}
        >
          {status === "loading" ? "..." : status === "success" ? "Joined!" : "Subscribe"}
        </button>
      </form>

      {message && (
        <p className={`text-sm mt-4 font-bold ${status === "error" ? "text-red-600" : "text-emerald-700"}`}>
          {message}
        </p>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Join 15,000+ healthcare leaders. Unsubscribe anytime.
      </p>
    </div>
  );
}