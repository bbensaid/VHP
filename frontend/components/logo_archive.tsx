import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="inline-block group cursor-pointer select-none">
      
      {/* 1. FLEX CONTAINER */}
      <div className="flex items-center gap-2">
        
        {/* 2. IMAGE SIZE */}
        <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0">
          <Image 
            src="/logo-icon.svg" 
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
          <div className="text-[10px] sm:text-xs font-extrabold text-black">REVIEW</div>
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
        <div className="mt-0 text-center text-[10px] font-medium tracking-widest uppercase flex justify-center items-center gap-1">
          {/* <span className="text-card-economics font-bold">OPTIMIZING CARE</span> */}
    
          <span className="text-slate-400 font-bold">EDUCATE</span>
          <span className="text-slate-400">-</span>
          <span className="text-slate-400 font-bold">ANALYZE</span>
          <span className="text-slate-400">-</span>
          <span className="text-slate-400 font-bold">ADVISE</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
