// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/TooltipContext";
import Breadcrumbs from "@/components/Breadcrumbs"; // <--- 1. IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Transformation Review",
  description: "Policy, Economics, and Technology at the Nexus of Healthcare Reform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          {/* WRAP EVERYTHING */}
          <div className="flex flex-col min-h-screen">
            <Header />
            
            {/* MAIN CONTENT AREA */}
            <main className="flex-grow container mx-auto p-4 md:px-8">
              <Breadcrumbs /> {/* <--- 2. INSERT HERE */}
              {children}
            </main>
            
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}