// components/DefinitionToggle.tsx
"use client";

import React from "react";
import { useTooltipContext } from "./TooltipContext";

const DefinitionToggle: React.FC = () => {
  const { showTooltips, toggleTooltips } = useTooltipContext();

  return (
    <button
      onClick={toggleTooltips}
      className={`
        flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-all
        ${
          showTooltips
            ? "bg-ui-primary/10 text-ui-primary border-ui-primary"
            : "bg-surface-muted text-text-body border-ui-border hover:border-text-body"
        }
      `}
      title={
        showTooltips ? "Disable Smart Definitions" : "Enable Smart Definitions"
      }
    >
      <span className="text-sm">{showTooltips ? "✅" : "⚪"}</span>
      <span>{showTooltips ? "Definitions ON" : "Definitions OFF"}</span>
    </button>
  );
};

export default DefinitionToggle;
