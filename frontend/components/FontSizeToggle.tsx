"use client";

import React, { useState, useEffect } from "react";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

interface FontSizeToggleProps {
  targetId: string;
}

// Explicit map ensures Tailwind scanner picks up these classes. Hoisted to
// module scope so the effect's dependency list stays stable.
const SIZE_CLASSES = {
  base: "prose-base",
  lg: "prose-lg",
  xl: "prose-xl",
} as const;

export default function FontSizeToggle({ targetId }: FontSizeToggleProps) {
  // Default matches the server-rendered 'prose-lg'
  const [currentSize, setCurrentSize] = useState<"base" | "lg" | "xl">("lg");

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Clean up all managed classes to prevent conflicts
    Object.values(SIZE_CLASSES).forEach(cls => element.classList.remove(cls));

    // Apply current size
    element.classList.add(SIZE_CLASSES[currentSize]);
  }, [currentSize, targetId]);

  const toggleSize = () => {
    setCurrentSize((prev) => {
      if (prev === "base") return "lg";
      if (prev === "lg") return "xl";
      return "base";
    });
  };

  return (
    <button
      onClick={toggleSize}
      className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group"
      title="Adjust Font Size"
    >
      <MagnifyingGlassPlusIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
        {currentSize === "base" ? "100%" : currentSize === "lg" ? "115%" : "130%"}
      </span>
    </button>
  );
}