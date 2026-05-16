"use client";

import dynamic from "next/dynamic";

const CommandPalette  = dynamic(() => import("@/components/CommandPalette"),  { ssr: false });
const SessionTimeout  = dynamic(() => import("@/components/SessionTimeout"),  { ssr: false });
const VoiceFab        = dynamic(() => import("@/components/VoiceFab"),        { ssr: false });
const OnboardingModal = dynamic(() => import("@/components/OnboardingModal"), { ssr: false });

export default function ClientOnlyShell() {
  return (
    <>
      <CommandPalette />
      <SessionTimeout />
      <VoiceFab />
      <OnboardingModal />
    </>
  );
}
