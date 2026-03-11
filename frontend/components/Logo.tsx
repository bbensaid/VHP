import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="inline-block group cursor-pointer select-none">
      
      {/* 1. FLEX CONTAINER */}
      <div className="flex items-center gap-2">
        
        {/* 2. IMAGE SIZE */}
        <div className="relative h-12 w-12 sm:h-15 sm:w-15 flex-shrink-0">
          <Image 
            src="/logo-icon.svg" 
            alt="HTR Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>


 
     {/*    <div className="leading-tight">
          <div className="text-xs sm:text-sm font-extrabold text-card-tech">HEALTH</div>
          <div className="text-xs sm:text-sm font-extrabold text-card-tech">TRANSFORMATION</div>
          <div className="text-xs sm:text-sm font-extrabold text-card-tech">REVIEW</div>
        </div>
      </div> */}

             <div className="leading-tight">
          <div className="text-xs sm:text-sm font-extrabold text-black">HEALTH</div>
          <div className="text-xs sm:text-sm font-extrabold text-black">TRANSFORMATION</div>
          <div className="text-xs sm:text-sm font-extrabold text-black">REVIEW</div>
        </div>
      </div> 




        {/* 3. THE TEXT 
        <div className="leading-tight">
          <div className="text-xs sm:text-sm font-extrabold text-card-economics">HEALTH</div>
          <div className="text-xs sm:text-sm font-extrabold text-card-policy">TRANSFORMATION</div>
          <div className="text-xs sm:text-sm font-extrabold text-card-tech">REVIEW</div>
        </div>
      </div>
*/}


  {/* DECODING THE VALUE TRANSITION */}
      {/* 4. TAGLINE */}
      <div className="mt-0 w-full hidden sm:block">
        <div className="w-full border-t border-gray-300" />
        <div className="mt-0 text-center text-[10px] font-medium tracking-widest uppercase flex justify-center items-center gap-1">
          <span className="text-card-policy font-bold">OPTIMIZING CARE</span>
          <span className="text-gray-400">-</span>
          <span className="text-card-economics font-bold">DELIVERING HEALTH</span>
          {/* <span className="text-gray-400">-</span>
          <span className="text-card-tech font-bold">TECHNOLOGY</span> */}
        </div>
      </div>
    </div>
  );
};

export default Logo;
