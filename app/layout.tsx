import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AppFooter } from "@/components/layout/AppFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#073F3B",
};

export const metadata: Metadata = {
  title: {
    default: "Nomads Pipa — The Local Hub for Praia da Pipa",
    template: "%s | Nomads Pipa",
  },
  description:
    "The digital companion connecting digital nomads, remote workers, travellers, local businesses, and community initiatives in Praia da Pipa, Brazil.",
  keywords: [
    "Praia da Pipa",
    "Digital Nomads",
    "Remote Work Pipa",
    "Brazil Nomads",
    "Pipa Coworking",
    "Pipa Community",
    "Local Guide Pipa",
  ],
  authors: [{ name: "Nomads Pipa Community" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nomadspipa.com",
    siteName: "Nomads Pipa",
    title: "Nomads Pipa — The Local Hub for Praia da Pipa",
    description:
      "Curated local discovery, community connections, verified workspaces, and local perks in Praia da Pipa, Brazil.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomads Pipa — The Local Hub for Praia da Pipa",
    description:
      "Curated local discovery, community connections, and verified local perks in Praia da Pipa, Brazil.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        sora.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
        <AppHeader />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <AppFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}
