import React from "react";
// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { TickerProvider } from "@/components/TickerContext";
import { SidebarProvider } from "@/components/SidebarContext";
import AppShell from "@/components/AppShell";
import { getTickerData } from "@/lib/ticker";
import CommandPalette from "@/components/CommandPalette";
import OnboardingModal from "@/components/OnboardingModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import SessionTimeout from "@/components/SessionTimeout";
import MvpWatermark from "@/components/MvpWatermark";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Transformation Review",
  description:
    "Policy, Economics, and Technology at the Nexus of Healthcare Reform.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tickerData = await getTickerData();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <MvpWatermark />
        <WebVitalsReporter />
        <ThemeProvider>
          {/* Skip navigation — visible on focus for keyboard users (WCAG 2.4.1) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-9999 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
          >
            Skip to main content
          </a>
          <SessionTimeout />
          <CommandPalette />
          <OnboardingModal />
          <TickerProvider>
            <SidebarProvider>
              <div className="flex flex-col h-screen overflow-hidden">
                <Header />
                <AppShell tickerData={tickerData}>
                  <main id="main-content">
                    <ErrorBoundary section="Page">{children}</ErrorBoundary>
                  </main>
                </AppShell>
              </div>
            </SidebarProvider>
          </TickerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
