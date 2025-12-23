// components/Logo.tsx

import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {/* Icon */}
      <svg
        className="w-10 h-10 text-ui-primary flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>

      {/* Text Stacked on 3 Lines */}
      <div className="flex flex-col text-[10px] font-extrabold leading-none tracking-widest text-text-heading uppercase">
        <span>Health</span>
        <span>Transformation</span>
        <span>Review</span>
      </div>
    </div>
  );
};

export default Logo;
