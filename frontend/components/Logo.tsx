import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="inline-block group cursor-pointer select-none">
      
      {/* 1. FLEX CONTAINER */}
      <div className="flex items-center gap-2">
        
        {/* 2. IMAGE SIZE */}
        <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
          <Image 
            src="/logo-icon.svg" 
            alt="HTR Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 3. THE TEXT */}
        <div className="leading-tight">
          <div className="text-xs sm:text-sm font-extrabold text-black">HEALTH</div>
          <div className="text-xs sm:text-sm font-extrabold text-black">TRANSFORMATION</div>
          <div className="text-xs sm:text-sm font-extrabold text-black">REVIEW</div>
        </div>
      </div>

      {/* 4. TAGLINE */}
      <div className="mt-1 w-full hidden sm:block">
        <div className="w-full border-t border-gray-300" />
        <div className="mt-1 text-center text-gray-500 text-[10px] font-medium tracking-widest uppercase">
          Decoding the Value Transition
        </div>
      </div>
    </div>
  );
};

export default Logo;
