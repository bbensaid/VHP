"use client";

import React, { createContext, useContext } from "react";
import { BRAND_CONFIG, type Brand, type BrandConfig } from "@/lib/brand";

// Brand is resolved on the server (from the request Host header) and passed in
// as a prop. The provider exposes both the raw brand and its resolved config so
// client components can branch on logo wordmark / advisory visibility without
// re-reading the host.

interface BrandContextValue {
  brand: Brand;
  config: BrandConfig;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({
  brand,
  children,
}: {
  brand: Brand;
  children: React.ReactNode;
}) {
  const value: BrandContextValue = { brand, config: BRAND_CONFIG[brand] };
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    // Safe fallback for any component rendered outside the provider (e.g. the
    // beta gate, error pages). Default to the full-functionality variant.
    return { brand: "solutions", config: BRAND_CONFIG.solutions };
  }
  return ctx;
}
