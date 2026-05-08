"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const SessionTimeout  = dynamic(() => import("@/components/SessionTimeout"),  { ssr: false });

export default function ClientOnlyShell() {
  return (
    <>
      <CommandPalette />
      <SessionTimeout />
    </>
  );
}
