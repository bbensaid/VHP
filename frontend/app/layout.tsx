// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/TooltipContext";
import { TickerProvider } from "@/components/TickerContext";
import AppShell from "@/components/AppShell";
import { getTickerData } from "@/lib/ticker";
import CommandPalette from "@/components/CommandPalette";

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
      <body className={inter.className}>
        <CommandPalette />
        <TooltipProvider>
          <TickerProvider>
            {/* WRAP EVERYTHING */}
            <div className="flex flex-col min-h-screen">
              <Header />

              <AppShell tickerData={tickerData}>{children}</AppShell>

              <Footer />
            </div>
          </TickerProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
