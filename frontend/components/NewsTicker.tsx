// components/NewsTicker.tsx

import React from "react";
import Link from "next/link";

const NewsTicker: React.FC = () => {
  return (
    <div className="w-full bg-surface-muted border-y border-ui-border py-2 px-4 mb-8 flex items-center overflow-hidden">
      <span className="flex-shrink-0 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded mr-4 animate-pulse">
        Live Briefing
      </span>
      <div className="flex-grow overflow-hidden whitespace-nowrap text-sm text-text-body font-medium">
        <span className="mr-8">
          <strong className="text-text-heading">POLICY:</strong> FDA releases
          new AI SaMD guidance documents.
        </span>
        <span className="mr-8">
          <strong className="text-text-heading">M&A:</strong> UnitedHealth Group
          acquires regional home-health network for $3.2B.
        </span>
        <span className="mr-8">
          <strong className="text-text-heading">SCIENCE:</strong> CRISPR
          Therapeutics announces positive Phase 3 data for new SCD targets.
        </span>
      </div>
      <Link
        href="/policy/regulation"
        className="flex-shrink-0 text-xs font-bold text-ui-primary hover:underline ml-4 hidden md:block"
      >
        View All Updates &rarr;
      </Link>
    </div>
  );
};

export default NewsTicker;
