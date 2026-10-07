import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import Header from "@/components/Header";
import { BrandProvider } from "@/components/BrandContext";
import { resolveBrand, getBrandConfig, normalizeHost } from "@/lib/brand";
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
import TesterHubButton from "@/components/TesterHubButton";

const inter = Inter({ subsets: ["latin"] });

const SITE_DESCRIPTION =
  "Policy, Economics, and Technology at the Nexus of Healthcare Reform.";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const { displayName } = getBrandConfig(resolveBrand(host));
  // Host-aware base so relative OG/canonical URLs resolve to the domain the
  // visitor is on (four production domains share one deployment — see lib/brand.ts).
  const metadataBase = new URL(
    host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  );
  return {
    metadataBase,
    title: displayName,
    description: SITE_DESCRIPTION,
    applicationName: displayName,
    // No title/description/url here on purpose: child segments that set only
    // `title`/`description` inherit this object as-is, so a root og:title or
    // og:url would stamp the homepage's values onto every shared page.
    // Crawlers fall back to <title>/<meta name="description">.
    openGraph: {
      type: "website",
      siteName: displayName,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo-icon.svg", type: "image/svg+xml" },
      ],
    },
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
  const hostHeader = (await headers()).get("host");
  const brand = resolveBrand(hostHeader);

  // The beta cookie is "granted:<host>". Access is only granted when the host
  // embedded in the cookie matches the current request host — so a cookie set
  // on one domain doesn't unlock another. (Legacy bare "granted" cookies from
  // before domain scoping are treated as ungranted and re-prompt at the gate.)
  const betaCookie = cookieStore.get("htr_beta")?.value ?? "";
  const grantedHost = betaCookie.startsWith("granted:")
    ? betaCookie.slice("granted:".length)
    : null;
  const betaGranted =
    grantedHost !== null && grantedHost === normalizeHost(hostHeader);

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
              <TesterHubButton />
              </VoiceProvider>
            </SidebarProvider>
          </TickerProvider>
          </BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
