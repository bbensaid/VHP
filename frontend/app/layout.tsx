import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import Header from "@/components/Header";
import { BrandProvider } from "@/components/BrandContext";
import { resolveBrand, getBrandConfig } from "@/lib/brand";
import { TickerProvider } from "@/components/TickerContext";
import { SidebarProvider } from "@/components/SidebarContext";
import AppShell from "@/components/AppShell";
import { getTickerData } from "@/lib/ticker";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import ClientOnlyShell from "@/components/ClientOnlyShell";
import WelcomeRedirect from "@/components/WelcomeRedirect";
import { VoiceProvider } from "@/components/VoiceContext";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { displayName } = getBrandConfig(resolveBrand(host));
  return {
    title: displayName,
    description:
      "Policy, Economics, and Technology at the Nexus of Healthcare Reform.",
  };
}

// Next 16 requires viewport in its own export — moved out of metadata.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const betaGranted = cookieStore.get("htr_beta")?.value === "granted";
  const brand = resolveBrand((await headers()).get("host"));

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
          <BrandProvider brand={brand}>
          {/* Skip navigation — visible on focus for keyboard users (WCAG 2.4.1) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-9999 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
          >
            Skip to main content
          </a>
          <WelcomeRedirect />
          <TickerProvider>
            <SidebarProvider>
              <VoiceProvider>
              <ClientOnlyShell />
              <div className="flex flex-col h-screen">
                <Header />
                <div className="flex-1 min-h-0 flex flex-col">
                  <AppShell tickerData={tickerData}>
                    <main id="main-content" className="contents">
                      <ErrorBoundary section="Page">{children}</ErrorBoundary>
                    </main>
                  </AppShell>
                </div>
              </div>
              </VoiceProvider>
            </SidebarProvider>
          </TickerProvider>
          </BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
