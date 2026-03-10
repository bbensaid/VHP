import React from 'react';
import { DashboardProvider } from '@/lib/context/DashboardContext';
import { getAllRhtStates } from '@/lib/sanity-dashboard-queries';

export const revalidate = 3600;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialStates = await getAllRhtStates();

  return (
    <DashboardProvider initialStates={initialStates}>
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>
    </DashboardProvider>
  );
}
