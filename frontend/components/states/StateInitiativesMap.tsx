"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import {
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { StateInitiativesProfile } from "@/lib/data/state-initiatives-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const stateNameToId = (name: string) => {
  if (name === "District of Columbia") return "district_of_columbia";
  return name.toLowerCase().replace(/\s+/g, "_");
};

// Color scale based on number of initiatives
const getInitiativeColor = (count: number): string => {
  if (count === 0) return "#e2e8f0"; // slate-200 — no data
  if (count >= 4) return "#4f46e5"; // indigo-600 — highly active
  if (count >= 3) return "#0ea5e9"; // sky-500
  if (count >= 2) return "#10b981"; // emerald-500
  return "#94a3b8";                 // slate-400 — 1 initiative
};

interface Props {
  data: Record<string, StateInitiativesProfile>;
}

export function StateInitiativesMap({ data }: Props) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: React.ReactNode;
  }>({ visible: false, x: 0, y: 0, content: null });
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [-96, 37],
    zoom: 1,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number }) => {
    if (pos?.coordinates && pos?.zoom) setTimeout(() => setPosition(pos), 0);
  };

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-50 flex items-center justify-center p-4"
          : "w-full relative pb-4"
      }
    >
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md border"
          title="Exit Fullscreen"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      )}

      <ComposableMap
        projection="geoAlbersUsa"
        viewBox="0 0 800 600"
        width={800}
        height={600}
        style={{ width: "100%", height: "auto" }}
      >
        <rect x="0" y="0" width="800" height="600" fill="#f8fafc" />
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name as string;
                const stateId = stateNameToId(stateName);
                const profile = data[stateId];
                const count = profile?.initiatives?.length ?? 0;
                const fill = getInitiativeColor(count);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => router.push(`/states/${stateId}`)}
                    onMouseEnter={(evt) => {
                      const tooltipWidth = 200;
                      const tooltipHeight = 90;
                      let xPos = evt.clientX + 20;
                      let yPos = evt.clientY;
                      if (xPos + tooltipWidth > window.innerWidth) xPos = evt.clientX - tooltipWidth - 10;
                      if (yPos + tooltipHeight > window.innerHeight) yPos = evt.clientY - tooltipHeight;

                      setTooltip({
                        visible: true,
                        x: xPos,
                        y: yPos,
                        content: (
                          <div className="min-w-[160px]">
                            <div className="font-bold text-sm mb-1 border-b pb-1">{stateName}</div>
                            {count > 0 ? (
                              <div className="text-xs text-slate-600">
                                <span className="font-bold text-indigo-600">{count}</span> active initiative{count !== 1 ? "s" : ""}
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400">No data yet</div>
                            )}
                            <div className="text-[10px] text-slate-400 mt-1">Click to explore →</div>
                          </div>
                        ),
                      });
                    }}
                    onMouseMove={(evt) => {
                      const tooltipWidth = 200;
                      const tooltipHeight = 90;
                      let xPos = evt.clientX + 20;
                      let yPos = evt.clientY;
                      if (xPos + tooltipWidth > window.innerWidth) xPos = evt.clientX - tooltipWidth - 10;
                      if (yPos + tooltipHeight > window.innerHeight) yPos = evt.clientY - tooltipHeight;
                      setTooltip((prev) => ({ ...prev, x: xPos, y: yPos }));
                    }}
                    onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}
                    style={{
                      default: {
                        fill,
                        stroke: "#ffffff",
                        strokeWidth: 1,
                        outline: "none",
                        transition: "fill 0.15s ease",
                      },
                      hover: {
                        fill: "#6366f1",
                        stroke: "#ffffff",
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { fill: "#4338ca", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button
          onClick={() => setPosition((p) => ({ ...p, zoom: p.zoom * 1.3 }))}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50"
          title="Zoom In"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPosition((p) => ({ ...p, zoom: p.zoom / 1.3 }))}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50"
          title="Zoom Out"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPosition({ coordinates: [-96, 37], zoom: 1 })}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50"
          title="Reset"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50"
          title="Fullscreen"
        >
          {isFullscreen ? (
            <ArrowsPointingInIcon className="w-4 h-4" />
          ) : (
            <ArrowsPointingOutIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 text-xs p-3 min-w-[160px]">
        <div className="font-bold text-slate-700 mb-2">Initiatives Tracked</div>
        <div className="space-y-1.5">
          {[
            { label: "4+ initiatives", color: "#4f46e5" },
            { label: "3 initiatives", color: "#0ea5e9" },
            { label: "2 initiatives", color: "#10b981" },
            { label: "1 initiative", color: "#94a3b8" },
            { label: "No data yet", color: "#e2e8f0" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm border border-black/10 shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-white p-3 rounded-xl shadow-lg border border-slate-200 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
