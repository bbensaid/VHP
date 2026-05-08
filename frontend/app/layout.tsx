import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import { TickerProvider } from "@/components/TickerContext";
import { SidebarProvider } from "@/components/SidebarContext";
import AppShell from "@/components/AppShell";
import { getTickerData } from "@/lib/ticker";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import ClientOnlyShell from "@/components/ClientOnlyShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Transformation Review",
  description:
    "Policy, Economics, and Technology at the Nexus of Healthcare Reform.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const betaGranted = cookieStore.get("htr_beta")?.value === "granted";

  // Before beta access is granted, render nothing but the gate page itself.
  if (!betaGranted) {
    return (
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  const tickerData = await getTickerData();

  return (
    <html lang="en">
      <body className={`${inter.className} subpixel-antialiased`}>
        <WebVitalsReporter />
        <ThemeProvider>
          {/* Skip navigation — visible on focus for keyboard users (WCAG 2.4.1) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-9999 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
          >
            Skip to main content
          </a>
          <ClientOnlyShell />
          <TickerProvider>
            <SidebarProvider>
              <div className="flex flex-col h-screen">
                <Header />
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <AppShell tickerData={tickerData}>
                    <main id="main-content">
                      <ErrorBoundary section="Page">{children}</ErrorBoundary>
                    </main>
                  </AppShell>
                </div>
              </div>
            </SidebarProvider>
          </TickerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
