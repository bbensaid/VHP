"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoCentroid, geoAlbersUsa } from "d3-geo";
import {
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { rhtProgramData } from "@/lib/data/rht-program";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(amount);
};

// Helper for status colors
const getStatusStyles = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return { fill: "#34d399", text: "#064e3b" }; // Emerald-400 (Mint), Dark Green Text
    case "pending":
      return { fill: "#fbbf24", text: "#451a03" }; // Amber-400 (Honey), Dark Brown Text
    case "at risk":
      return { fill: "#e11d48", text: "#ffffff" }; // Rose-600 (Crimson), White Text
    default:
      return { fill: "#e2e8f0", text: "#64748b" }; // Slate-200, Slate-500 Text
  }
};

// State Abbreviation Lookup
const stateAbbreviations: { [key: string]: string } = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

// Region Mapping (Matches Dashboard Logic)
const REGION_MAP: Record<string, string> = {
  vermont: "Northeast",
  maine: "Northeast",
  new_hampshire: "Northeast",
  massachusetts: "Northeast",
  connecticut: "Northeast",
  rhode_island: "Northeast",
  new_york: "Northeast",
  pennsylvania: "Northeast",
  new_jersey: "Northeast",
  texas: "South",
  florida: "South",
  georgia: "South",
  north_carolina: "South",
  south_carolina: "South",
  virginia: "South",
  alabama: "South",
  mississippi: "South",
  louisiana: "South",
  tennessee: "South",
  kentucky: "South",
  arkansas: "South",
  oklahoma: "South",
  ohio: "Midwest",
  michigan: "Midwest",
  indiana: "Midwest",
  illinois: "Midwest",
  wisconsin: "Midwest",
  minnesota: "Midwest",
  iowa: "Midwest",
  missouri: "Midwest",
  kansas: "Midwest",
  nebraska: "Midwest",
  north_dakota: "Midwest",
  south_dakota: "Midwest",
  california: "West",
  washington: "West",
  oregon: "West",
  idaho: "West",
  montana: "West",
  wyoming: "West",
  colorado: "West",
  utah: "West",
  nevada: "West",
  arizona: "West",
  new_mexico: "West",
  alaska: "West",
  hawaii: "West",
};

// Region View Settings (Coordinates + Zoom)
const REGION_VIEWS: Record<
  string,
  { coordinates: [number, number]; zoom: number }
> = {
  All: { coordinates: [-96, 37], zoom: 1 },
  Northeast: { coordinates: [-74, 42], zoom: 2.5 },
  South: { coordinates: [-88, 33], zoom: 2 },
  Midwest: { coordinates: [-94, 41], zoom: 2 },
  West: { coordinates: [-115, 39], zoom: 1.7 },
};

interface NationalMapProps {
  searchQuery?: string;
  selectedRegion?: string;
}

export function NationalMap({
  searchQuery = "",
  selectedRegion = "All",
}: NationalMapProps) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: React.ReactNode;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });
  const [hoveredGeo, setHoveredGeo] = useState<string | null>(null);
  const [position, setPosition] = useState({
    coordinates: [-96, 37] as [number, number],
    zoom: 1,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-zoom when region changes
  useEffect(() => {
    const view = REGION_VIEWS[selectedRegion];
    if (view) {
      setPosition(view);
    }
  }, [selectedRegion]);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }));
  };

  const handleResetZoom = () => {
    const duration = 750; // ms
    const start = { ...position };
    const end = { coordinates: [-96, 37] as [number, number], zoom: 1 };
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out for smooth deceleration
      const ease = 1 - Math.pow(1 - progress, 3);

      const nextZoom = start.zoom + (end.zoom - start.zoom) * ease;
      const nextCoordinates: [number, number] = [
        start.coordinates[0] +
          (end.coordinates[0] - start.coordinates[0]) * ease,
        start.coordinates[1] +
          (end.coordinates[1] - start.coordinates[1]) * ease,
      ];

      setPosition({ coordinates: nextCoordinates, zoom: nextZoom });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleMoveEnd = (position: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    // Validate coordinates: geoAlbersUsa returns null for points outside US bounds.
    // We prevent updating state to invalid coordinates to avoid crashes.
    const projection = geoAlbersUsa();
    if (position?.coordinates && projection(position.coordinates)) {
      // Defer update to prevent render-cycle state update error from library
      setTimeout(() => setPosition(position), 0);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[5000] bg-white flex items-center justify-center p-4 h-screen w-screen"
          : "w-full mx-auto relative transition-all duration-300 ease-in-out"
      }
    >
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md border border-slate-200 hover:bg-slate-100 transition-colors z-50"
          title="Exit Fullscreen"
        >
          <XMarkIcon className="w-6 h-6 text-slate-600" />
        </button>
      )}
      <ComposableMap
        projection="geoAlbersUsa"
        viewBox="0 0 800 600"
        width={800}
        height={600}
        style={{
          width: "100%",
          height: isFullscreen ? "100%" : "auto",
          maxHeight: isFullscreen ? "100vh" : "none",
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          translateExtent={[
            [-100, -100],
            [900, 700],
          ]}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  // Match data by converting geo name to slug format used in rhtProgramData
                  const slug = stateName.toLowerCase().replace(/\s+/g, "_");
                  const data = rhtProgramData[slug];

                  const status = data?.status || "Active";
                  const styles = getStatusStyles(data ? status : "default");

                  // Filter Logic
                  const region = REGION_MAP[slug] || "Other";
                  const matchesRegion =
                    selectedRegion === "All" || region === selectedRegion;
                  const matchesSearch =
                    !searchQuery ||
                    stateName.toLowerCase().includes(searchQuery.toLowerCase());
                  const isVisible = matchesRegion && matchesSearch;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (data && isVisible)
                          router.push(`/dashboard/${slug}`);
                      }}
                      onMouseEnter={(evt) => {
                        setHoveredGeo(slug);
                        const content = (
                          <div className="min-w-[140px]">
                            <div className="font-bold text-sm mb-2 border-b border-slate-200 pb-1">
                              {stateName}
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center gap-4 text-xs">
                                <span className="text-slate-400">Status</span>
                                <span
                                  className="font-bold uppercase tracking-wider text-[10px]"
                                  style={{ color: styles.fill }}
                                >
                                  {status}
                                </span>
                              </div>
                              {data?.awardAmount && (
                                <div className="flex justify-between items-center gap-4 text-xs">
                                  <span className="text-slate-400">Award</span>
                                  <span className="font-mono text-slate-900">
                                    {data.awardAmount}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                        setTooltip({
                          visible: true,
                          x: evt.clientX,
                          y: evt.clientY,
                          content,
                        });
                      }}
                      onMouseMove={(evt) => {
                        setTooltip((prev) => ({
                          ...prev,
                          x: evt.clientX,
                          y: evt.clientY,
                        }));
                      }}
                      onMouseLeave={() => {
                        setTooltip((prev) => ({ ...prev, visible: false }));
                        setHoveredGeo(null);
                      }}
                      style={{
                        default: {
                          fill: isVisible ? styles.fill : "#f1f5f9", // Gray out if filtered
                          opacity: isVisible ? 1 : 0.5,
                          stroke: "#ffffff",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: data && isVisible ? "#2563eb" : "#cbd5e1", // Blue-600
                          stroke: "#ffffff",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: data && isVisible ? "pointer" : "default",
                        },
                        pressed: {
                          fill: "#4338ca",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })}

                {/* Render Labels (Abbr + Amount) */}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const stateName = geo.properties.name;
                  const slug = stateName.toLowerCase().replace(/\s+/g, "_");
                  const data = rhtProgramData[slug];
                  const abbr = stateAbbreviations[stateName];
                  const styles = getStatusStyles(
                    data ? data.status || "Active" : "default"
                  );

                  // Parse amount for compact label display (e.g. $200M)
                  const numericAmount = data
                    ? parseInt(data.awardAmount.replace(/[^0-9]/g, ""))
                    : 0;
                  const compactAmount = formatCurrency(numericAmount);

                  // Skip labels for very small states to avoid clutter, or if no data
                  const isSmallState = ["RI", "DE", "DC"].includes(abbr);

                  // Filter Logic for Labels
                  const region = REGION_MAP[slug] || "Other";
                  const matchesRegion =
                    selectedRegion === "All" || region === selectedRegion;
                  const matchesSearch =
                    !searchQuery ||
                    stateName.toLowerCase().includes(searchQuery.toLowerCase());
                  const isHovered = hoveredGeo === slug;

                  if (!data || isSmallState || !matchesRegion || !matchesSearch)
                    return null;

                  // Offset for specific states if needed (e.g. FL, MI often need tweaks)
                  // Using standard centroids for now

                  return (
                    <Marker key={`${geo.rsmKey}-marker`} coordinates={centroid}>
                      <g className="pointer-events-none font-sans">
                        <text
                          y="-2"
                          fontSize={10}
                          textAnchor="middle"
                          fill={isHovered ? "#ffffff" : styles.text}
                          fontWeight="bold"
                        >
                          {abbr}
                        </text>
                        <text
                          y="8"
                          fontSize={8}
                          textAnchor="middle"
                          fill={isHovered ? "#ffffff" : styles.text}
                        >
                          {compactAmount}
                        </text>
                      </g>
                    </Marker>
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-600"
          title="Zoom In"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-600"
          title="Zoom Out"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
        {(position.zoom !== 1 ||
          position.coordinates[0] !== -96 ||
          position.coordinates[1] !== 37) && (
          <button
            onClick={handleResetZoom}
            className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-600"
            title="Reset Zoom"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={toggleFullscreen}
          className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-600"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <ArrowsPointingInIcon className="w-5 h-5" />
          ) : (
            <ArrowsPointingOutIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-white text-slate-900 p-4 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100 pointer-events-none"
          style={{
            left: tooltip.x + 16,
            top: tooltip.y - 16,
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-sm border border-slate-200 text-xs space-y-2">
        <div className="font-bold text-slate-900 mb-1">Status Key</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          <span className="text-slate-600 font-medium">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <span className="text-slate-600 font-medium">Watch</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-600"></div>
          <span className="text-slate-600 font-medium">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <span className="text-slate-600 font-medium">No Data</span>
        </div>
      </div>
    </div>
  );
}
