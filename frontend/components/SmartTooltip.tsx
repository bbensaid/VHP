// components/SmartTooltip.tsx
"use client";

import React, { useState } from "react";

interface SmartTooltipProps {
  term: string;
  definition: string;
}

const SmartTooltip: React.FC<SmartTooltipProps> = ({ term, definition }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* THE TRIGGER (The word in the article)
         - Changed to 'text-ui-primary' for Blue color
         - Changed to 'font-bold' for visibility
         - Kept dotted underline to signal it's a definition, not a page link
      */}
      <span className="cursor-help font-bold text-ui-primary border-b-2 border-dotted border-ui-primary/40 hover:border-ui-primary hover:bg-ui-bg-light transition-colors duration-200 rounded-sm px-0.5">
        {term}
      </span>

      {/* THE POP-UP (The Card) */}
      {isVisible && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 p-5 bg-white border border-ui-border text-text-body text-sm rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          {/* Decorative Arrow pointing down */}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[1px] w-4 h-4 bg-white border-b border-r border-ui-border rotate-45"></span>

          {/* Header */}
          <span className="block font-bold text-base text-ui-primary mb-2 border-b border-ui-border pb-2">
            {term}
          </span>

          {/* Body Text */}
          <span className="block leading-relaxed text-gray-600 font-normal">
            {definition}
          </span>

          {/* Mini Footer */}
          <span className="block mt-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            HTR Glossary
          </span>
        </span>
      )}
    </span>
  );
};

export default SmartTooltip;
