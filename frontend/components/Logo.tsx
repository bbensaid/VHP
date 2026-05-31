import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="inline-block group cursor-pointer select-none">
      
      {/* 1. FLEX CONTAINER */}
      <div className="flex items-center gap-2">
        
        {/* 2. IMAGE SIZE */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
          <Image
            src="/logo-hts-vector.svg"
            alt="HTS Logo"
            fill
            className="object-contain"
            priority
          />
        </div>


 
     {/*    <div className="leading-tight">
          <div className="text-[10px] sm:text-xs font-extrabold text-card-tech">HEALTH</div>
          <div className="text-[10px] sm:text-xs font-extrabold text-card-tech">TRANSFORMATION</div>
          <div className="text-[10px] sm:text-xs font-extrabold text-card-tech">REVIEW</div>
        </div>
      </div> */}

             <div className="leading-tight subpixel-antialiased">
          <div className="text-[10px] sm:text-xs font-bold text-slate-900">HEALTH</div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-900">TRANSFORMATION</div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-900">SOLUTIONS</div>
        </div>
      </div>




        {/* 3. THE TEXT 
        <div className="leading-tight">
          <div className="text-[10px] sm:text-xs font-extrabold text-card-economics">HEALTH</div>
          <div className="text-[10px] sm:text-xs font-extrabold text-card-policy">TRANSFORMATION</div>
          <div className="text-[10px] sm:text-xs font-extrabold text-card-tech">REVIEW</div>
        </div>
      </div>
*/}


  {/* DECODING THE VALUE TRANSITION */}
      {/* 4. TAGLINE */}
      <div className="mt-0 w-full hidden sm:block">
        <div className="w-full border-t border-gray-300" />
        <div className="mt-0.5 text-center text-[10px] font-semibold tracking-wide uppercase flex justify-center items-center gap-1.5 text-slate-600 subpixel-antialiased">
          <span>SHAPING</span>
          <span>HEALTHCARE</span>
          <span>TOGETHER</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
