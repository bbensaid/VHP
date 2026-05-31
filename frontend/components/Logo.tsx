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
            src="/logo-icon8c.svg" 
            alt="HTR Logo" 
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

             <div className="leading-tight">
          <div className="text-[10px] sm:text-xs font-extrabold text-black">HEALTH</div>
          <div className="text-[10px] sm:text-xs font-extrabold text-black">TRANSFORMATION</div>
          <div className="text-[10px] sm:text-xs font-extrabold text-black">SOLUTIONS</div>
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
        <div className="mt-0 text-center text-[10px] font-medium tracking-wide uppercase flex justify-center items-center gap-1">
          {/* <span className="text-card-economics font-bold">OPTIMIZING CARE</span> */}
    
          <span className="text-slate-400 font-bold">SHAPING</span>
          <span className="text-slate-400"></span>
          <span className="text-slate-400 font-bold">HEALTHCARE</span>
          <span className="text-slate-400"></span>
          <span className="text-slate-400 font-bold">TOGETHER</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
