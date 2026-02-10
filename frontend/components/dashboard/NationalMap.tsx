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
import type { PerformanceIndexProfile } from "@/lib/data/performance-index-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const getScoreColor = (score?: number): string => {
  if (score === undefined) return "#cbd5e1"; // slate-300
  if (score >= 80) return "#16a34a";      // green-600
  if (score >= 70) return "#22c55e";      // green-500
  if (score >= 60) return "#facc15";      // yellow-400
  return "#ef4444";                      // red-500
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
  data: Record<string, PerformanceIndexProfile>;
  searchQuery?: string;
  selectedRegion?: string;
}

export function NationalMap({ data, searchQuery = "", selectedRegion = "All" }: NationalMapProps) {
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
    <div className={isFullscreen ? "fixed inset-0 z-[5000] bg-slate-50 flex items-center justify-center p-4" : "w-full mx-auto relative pb-16"}>
      {isFullscreen && <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md border" title="Exit Fullscreen"><XMarkIcon className="w-6 h-6" /></button>}
      
      <ComposableMap projection="geoAlbersUsa" viewBox="0 0 800 600" width={800} height={600} style={{ width: "100%", height: "auto" }}>
        <rect x="0" y="0" width="800" height="600" fill="#ffffff" />
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
              const stateName = geo.properties.name;
              const stateId = stateNameToId(stateName);
              const stateData = data[stateId];

              // All filtering logic is now self-contained in this component
              const region = REGION_MAP[stateId] || "Other";
              const isVisible = 
                stateName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedRegion === "All" || region === selectedRegion);

              let fill = "#f1f5f9";      // Inactive / Filtered out: slate-100
              let hoverFill = "#f1f5f9"; // No hover effect for inactive
              
              if (isVisible) {
                fill = getScoreColor(stateData?.performanceScore);
                if (stateData) {
                  hoverFill = "#3b82f6"; // blue-500
                } else {
                  hoverFill = "#94a3b8"; // slate-400
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => { if (stateData && isVisible) router.push(`/dashboard/${stateId}`); }}
                  onMouseEnter={(evt) => {
                    if (isVisible) {
                      setTooltip({
                        visible: true, x: evt.clientX, y: evt.clientY,
                        content: (
                          <div className="min-w-[150px]">
                            <div className="font-bold text-sm mb-2 border-b pb-1">{stateName}</div>
                            {stateData ? (
                              <div className="flex justify-between items-center gap-4 text-xs">
                                <span>Index Score</span>
                                <span className="font-bold text-lg" style={{ color: getScoreColor(stateData.performanceScore) }}>{stateData.performanceScore}</span>
                              </div>
                            ) : (
                              <div className="text-xs text-slate-500">No data available</div>
                            )}
                          </div>
                        ),
                      });
                    }
                  }}
                  onMouseMove={(evt) => setTooltip(prev => ({ ...prev, x: evt.clientX, y: evt.clientY }))}
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

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button onClick={() => setPosition(p => ({...p, zoom: p.zoom * 1.2}))} className="bg-white p-2 rounded-lg shadow-sm border" title="Zoom In"><PlusIcon className="w-5 h-5" /></button>
        <button onClick={() => setPosition(p => ({...p, zoom: p.zoom / 1.2}))} className="bg-white p-2 rounded-lg shadow-sm border" title="Zoom Out"><MinusIcon className="w-5 h-5" /></button>
        <button onClick={() => setPosition({ coordinates: [-96, 37], zoom: 1 })} className="bg-white p-2 rounded-lg shadow-sm border" title="Reset Zoom"><ArrowPathIcon className="w-5 h-5" /></button>
        <button onClick={() => setIsFullscreen(!isFullscreen)} className="bg-white p-2 rounded-lg shadow-sm border" title="Fullscreen">{isFullscreen ? <ArrowsPointingInIcon className="w-5 h-5" /> : <ArrowsPointingOutIcon className="w-5 h-5" />}</button>
      </div>

      {tooltip.visible && <div className="fixed z-50 bg-white p-3 rounded-xl shadow-lg border pointer-events-none" style={{ left: tooltip.x + 20, top: tooltip.y }} >{tooltip.content}</div>}
      
      <div className="absolute bottom-4 right-4 w-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border text-xs overflow-hidden">
        <button onClick={() => setIsLegendOpen(!isLegendOpen)} className="flex items-center justify-between gap-2 p-2 w-full font-bold text-slate-700">
          <span>Performance Index</span>
          {isLegendOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
        </button>
        {isLegendOpen && (
          <div className="px-3 pb-3 space-y-1.5">
            {[ { score: "80+", label: "Leading" }, { score: "70-79", label: "Improving" }, { score: "60-69", label: "Stable" }, { score: "<60", label: "At Risk" }, { score: "N/A", label: "No Data" }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: getScoreColor(item.label === "Leading" ? 80 : item.label === "Improving" ? 70 : item.label === "Stable" ? 60 : item.label === "At Risk" ? 59 : undefined) }}></div>
                <span className="text-slate-600 font-medium w-16">{item.label}</span>
                <span className="text-slate-400 font-mono text-[10px]">{item.score}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
