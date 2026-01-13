import React from 'react';
import { DashboardProvider } from '@/lib/context/DashboardContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-slate-50">
         {children}
      </div>
    </DashboardProvider>
  );
}