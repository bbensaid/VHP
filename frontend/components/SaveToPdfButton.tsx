"use client";

import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface SaveToPdfButtonProps {
  elementId: string;
  filename: string;
}

export default function SaveToPdfButton({ elementId, filename }: SaveToPdfButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Dynamic import to avoid SSR issues. 
      // Note: Ensure 'html2pdf.js' is installed in your project.
      const html2pdf = (await import("html2pdf.js")).default;
      
      const element = document.getElementById(elementId);
      if (!element) return;

      const opt = {
        margin: [0.5, 0.5],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("PDF generation requires html2pdf.js. Please run: npm install html2pdf.js");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group"
      title="Save as PDF"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <ArrowDownTrayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      )}
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
        {isLoading ? "Saving..." : "PDF"}
      </span>
    </button>
  );
}