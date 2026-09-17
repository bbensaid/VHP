"use client";

import React from "react";
import Image from "next/image";
import { useBrand } from "@/components/BrandContext";

const Logo: React.FC = () => {
  const { brand, config } = useBrand();
  // Single mark on both domains for now. The artwork reads "HTR", so the
  // solutions domain currently shows it too — an HTS variant is still needed.
  const logoSrc = "/logo-option-2.png";
  const logoAlt = brand === "review" ? "HTR Logo" : "HTS Logo";
  return (
    <div className="inline-block group cursor-pointer select-none">

      {/* 1. FLEX CONTAINER — owns the type scale for the whole lockup. The
             wordmark inherits it and the mark is sized in em against it, so
             this one pair of classes drives both. */}
      <div className="flex items-center gap-2 text-[10px] sm:text-xs">

        {/* 2. IMAGE SIZE — em units, not pixels: the wordmark is 3 lines at
               leading-tight (1.25), so 3 x 1.25 = 3.75em is exactly its
               height. The mark tracks the type at every breakpoint and can
               never extend past it. */}
        <div className="relative h-[3.75em] w-[3.75em] shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            sizes="64px"
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
          <div className="font-bold text-slate-900">HEALTH</div>
          <div className="font-bold text-slate-900">TRANSFORMATION</div>
          <div className="font-bold text-slate-900">{config.logoWord}</div>
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
