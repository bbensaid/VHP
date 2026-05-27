"use client";

import { useRef, useState, useEffect } from "react";

const MIN_PADDING = 16;
const MAX_PADDING = 400;
const HANDLE_PX = 6; // visible handle bar width

export function ResizableContent({ children }: { children: React.ReactNode }) {
  const [leftPad, setLeftPad] = useState(24);
  const [rightPad, setRightPad] = useState(24);
  const dragging = useRef<"left" | "right" | null>(null);
  const startX = useRef(0);
  const startPad = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - startX.current;
      if (dragging.current === "left") {
        setLeftPad(Math.min(MAX_PADDING, Math.max(MIN_PADDING, startPad.current + delta)));
      } else {
        setRightPad(Math.min(MAX_PADDING, Math.max(MIN_PADDING, startPad.current - delta)));
      }
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const startDrag = (side: "left" | "right") => (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = side;
    startX.current = e.clientX;
    startPad.current = side === "left" ? leftPad : rightPad;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div className="flex h-full min-h-full">
      {/* LEFT HANDLE — always a fixed-width visible bar on the absolute left edge */}
      <div
        onMouseDown={startDrag("left")}
        className="shrink-0 flex items-stretch cursor-col-resize select-none group"
        style={{ width: HANDLE_PX }}
        title="Drag to adjust left margin"
      >
        <div className="w-full bg-slate-200 group-hover:bg-sky-400 active:bg-sky-500 transition-colors rounded-full" />
      </div>

      {/* CONTENT — padding controlled by drag */}
      <div
        className="flex-1 min-w-0 py-6"
        style={{ paddingLeft: leftPad, paddingRight: rightPad }}
      >
        {children}
      </div>

      {/* RIGHT HANDLE — always a fixed-width visible bar on the absolute right edge */}
      <div
        onMouseDown={startDrag("right")}
        className="shrink-0 flex items-stretch cursor-col-resize select-none group"
        style={{ width: HANDLE_PX }}
        title="Drag to adjust right margin"
      >
        <div className="w-full bg-slate-200 group-hover:bg-sky-400 active:bg-sky-500 transition-colors rounded-full" />
      </div>
    </div>
  );
}
