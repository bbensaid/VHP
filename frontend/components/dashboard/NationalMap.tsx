"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import {
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Quintile shading of whichever sourced indicator is selected (see lib/data/state-indicators.ts). Darker = higher
// value; whether higher is better depends on the indicator, so the map does not label states good or bad.
const SHADES = ["#e0e7ff", "#a5b4fc", "#818cf8", "#6366f1", "#4338ca"];
function quintileBreaks(values: number[]): number[] {
  const v = [...values].sort((a, b) => a - b);
  return [0.2, 0.4, 0.6, 0.8].map((q) => v[Math.min(v.length - 1, Math.floor(q * v.length))]);
}
const shadeFor = (value: number | null | undefined, breaks: number[]): string => {
  if (value == null) return "#cbd5e1"; // slate-300
  return SHADES[breaks.filter((b) => value >= b).length];
};

const stateNameToId = (name: string) => {
  if (name === 'District of Columbia') return 'district_of_columbia';
  return name.toLowerCase().replace(/\s+/g, "_");
}

const REGION_MAP: Record<string, string> = {
  vermont: "Northeast", maine: "Northeast", new_hampshire: "Northeast", massachusetts: "Northeast", connecticut: "Northeast", rhode_island: "Northeast", new_york: "Northeast", pennsylvania: "Northeast", new_jersey: "Northeast", district_of_columbia: "Northeast",
  texas: "South", florida: "South", georgia: "South", north_carolina: "South", south_carolina: "South", virginia: "South", alabama: "South", mississippi: "South", louisiana: "South", tennessee: "South", kentucky: "South", arkansas: "South", oklahoma: "South",
  ohio: "Midwest", michigan: "Midwest", indiana: "Midwest", illinois: "Midwest", wisconsin: "Midwest", minnesota: "Midwest", iowa: "Midwest", missouri: "Midwest", kansas: "Midwest", nebraska: "Midwest", north_dakota: "Midwest", south_dakota: "Midwest",
  california: "West", washington: "West", oregon: "West", idaho: "West", montana: "West", wyoming: "West", colorado: "West", utah: "West", nevada: "West", arizona: "West", new_mexico: "West", alaska: "West", hawaii: "West",
};

const REGION_VIEWS: Record<string, { coordinates: [number, number]; zoom: number }> = {
  All: { coordinates: [-96, 37], zoom: 1 }, Northeast: { coordinates: [-74, 42], zoom: 2.5 }, South: { coordinates: [-88, 33], zoom: 2 }, Midwest: { coordinates: [-94, 41], zoom: 2 }, West: { coordinates: [-115, 39], zoom: 1.7 },
};

interface NationalMapProps {
  /** Indicator value keyed by state id ("vermont", "new_hampshire"). */
  values: Record<string, number | null>;
  label: string;
  format: (v: number) => string;
  /** Detail-page slug for a state id. */
  hrefFor: (stateId: string) => string;
  searchQuery?: string;
  selectedRegion?: string;
}

export function NationalMap({ values, label, format, hrefFor, searchQuery = "", selectedRegion = "All" }: NationalMapProps) {
  const present = Object.values(values).filter((v): v is number => v != null);
  const breaks = quintileBreaks(present);
  const router = useRouter();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null as React.ReactNode });
  const [position, setPosition] = useState({ coordinates: [-96, 37] as [number, number], zoom: 1 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  useEffect(() => {
    const view = REGION_VIEWS[selectedRegion];
    if (view) setPosition(view);
  }, [selectedRegion]);

  useEffect(() => {
    if (position) setIsLegendOpen(position.zoom <= 1.1);
  }, [position]);

  const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number; }) => {
    if (pos && pos.coordinates && pos.zoom) setTimeout(() => setPosition(pos), 0);
  };

  if (!position) return null;

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-slate-50 flex items-center justify-center p-4" : "w-full mx-auto relative pb-4"}>
      {isFullscreen && <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md border" title="Exit Fullscreen"><XMarkIcon className="w-6 h-6" /></button>}

      <ComposableMap projection="geoAlbersUsa" viewBox="0 0 800 600" width={800} height={600} style={{ width: "100%", height: "auto" }}>
        <rect x="0" y="0" width="800" height="600" fill="#ffffff" />
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
              const stateName = geo.properties.name;
              const stateId = stateNameToId(stateName);
              const value = values[stateId];
              const stateData = value != null ? value : undefined;

              // All filtering logic is now self-contained in this component
              const region = REGION_MAP[stateId] || "Other";
              const isVisible =
                stateName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedRegion === "All" || region === selectedRegion);

              let fill = "#f1f5f9";      // Inactive / Filtered out: slate-100
              let hoverFill = "#f1f5f9"; // No hover effect for inactive

              if (isVisible) {
                fill = shadeFor(value, breaks);
                if (stateData != null) {
                  hoverFill = "#3b82f6"; // blue-500
                } else {
                  hoverFill = "#94a3b8"; // slate-400
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => { if (stateData != null && isVisible) router.push(hrefFor(stateId)); }}
                  onMouseEnter={(evt) => {
                    if (isVisible) {
                      // Boundary calculations to prevent clipping
                      const tooltipWidth = 180;
                      const tooltipHeight = 100;
                      let xPos = evt.clientX + 20;
                      let yPos = evt.clientY;

                      if (xPos + tooltipWidth > window.innerWidth) xPos = evt.clientX - tooltipWidth - 10;
                      if (yPos + tooltipHeight > window.innerHeight) yPos = evt.clientY - tooltipHeight;

                      setTooltip({
                        visible: true, x: xPos, y: yPos,
                        content: (
                          <div className="min-w-[150px]">
                            <div className="font-bold text-sm mb-2 border-b pb-1">{stateName}</div>
                            {stateData != null ? (
                              <div className="flex justify-between items-center gap-4 text-xs">
                                <span>{label}</span>
                                <span className="font-bold text-lg text-indigo-700">{format(stateData)}</span>
                              </div>
                            ) : (
                              <div className="text-xs text-slate-500">No data available</div>
                            )}
                          </div>
                        ),
                      });
                    }
                  }}
                  onMouseMove={(evt) => {
                    if (isVisible) {
                      const tooltipWidth = 180;
                      const tooltipHeight = 100;
                      let xPos = evt.clientX + 20;
                      let yPos = evt.clientY;

                      if (xPos + tooltipWidth > window.innerWidth) xPos = evt.clientX - tooltipWidth - 10;
                      if (yPos + tooltipHeight > window.innerHeight) yPos = evt.clientY - tooltipHeight;
                      
                      setTooltip(prev => ({ ...prev, x: xPos, y: yPos }))
                    }
                  }}
                  onMouseLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
                  style={{
                    default: { fill, stroke: "#ffffff", strokeWidth: 1, outline: "none", transition: "fill 0.2s ease" },
                    hover: { fill: hoverFill, stroke: "#ffffff", strokeWidth: 1.5, outline: "none", cursor: isVisible ? "pointer" : "default" },
                    pressed: { fill: "#2563eb", outline: "none" },
                  }}
                />
              );
            })}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="absolute top-4 left-4 flex flex-col gap-2 md:flex-row md:bottom-4 md:top-auto md:left-4">
        <button onClick={() => setPosition(p => ({...p, zoom: p.zoom * 1.2}))} className="bg-white p-2 rounded-lg shadow-sm border" title="Zoom In"><PlusIcon className="w-5 h-5" /></button>
        <button onClick={() => setPosition(p => ({...p, zoom: p.zoom / 1.2}))} className="bg-white p-2 rounded-lg shadow-sm border" title="Zoom Out"><MinusIcon className="w-5 h-5" /></button>
        <button onClick={() => setPosition({ coordinates: [-96, 37], zoom: 1 })} className="bg-white p-2 rounded-lg shadow-sm border" title="Reset Zoom"><ArrowPathIcon className="w-5 h-5" /></button>
        <button onClick={() => setIsFullscreen(!isFullscreen)} className="bg-white p-2 rounded-lg shadow-sm border" title="Fullscreen">{isFullscreen ? <ArrowsPointingInIcon className="w-5 h-5" /> : <ArrowsPointingOutIcon className="w-5 h-5" />}</button>
      </div>

      {tooltip.visible && <div className="fixed z-50 bg-white p-3 rounded-xl shadow-lg border pointer-events-none" style={{ left: tooltip.x, top: tooltip.y }} >{tooltip.content}</div>}

      <div className="absolute bottom-4 right-4 w-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border text-xs overflow-hidden">
        <button onClick={() => setIsLegendOpen(!isLegendOpen)} className="flex items-center justify-between gap-2 p-2 w-full font-bold text-slate-700">
          <span className="text-left">{label}</span>
          {isLegendOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
        </button>
        {isLegendOpen && (
          <div className="px-3 pb-3 space-y-1.5">
            {SHADES.map((c, i) => (
              <div key={c} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c }}></div>
                <span className="text-slate-500 font-mono text-[10px]">
                  {i === 0 ? `< ${format(breaks[0])}` : i === SHADES.length - 1 ? `≥ ${format(breaks[3])}` : `${format(breaks[i - 1])} – ${format(breaks[i])}`}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: "#cbd5e1" }}></div>
              <span className="text-slate-500 text-[10px]">No data</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}