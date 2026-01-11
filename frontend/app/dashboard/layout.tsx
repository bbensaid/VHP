import React from 'react';
import { ProgramProvider } from '@/lib/context/ProgramContext'; // Import the provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgramProvider>
      <div className="min-h-screen bg-slate-50">
         {/* You can keep your Sidebar/Header here if you have one layout file */}
         {children}
      </div>
    </ProgramProvider>
  );
}