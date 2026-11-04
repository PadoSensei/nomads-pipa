import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Sora } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import "../globals.css";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleMetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleMetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Nomads Pipa — The Local Hub for Praia da Pipa",
    "pt-BR": "Nomads Pipa — O Hub Local da Praia da Pipa",
    es: "Nomads Pipa — El Hub Local de Praia da Pipa",
  };

  const descriptions: Record<string, string> = {
    en: "The digital companion connecting digital nomads, remote workers, travellers, local businesses, and community initiatives in Praia da Pipa, Brazil.",
    "pt-BR":
      "O companheiro digital que conecta nômades digitais, profissionais remotos, viajantes e comércio local na Praia da Pipa, Brasil.",
    es: "El compañero digital que conecta nómadas digitales, trabajadores remotos, viajeros y comercios locales en Praia da Pipa, Brasil.",
  };

  const ogLocales: Record<string, string> = {
    en: "en_US",
    "pt-BR": "pt_BR",
    es: "es_ES",
  };

  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;

  return {
    title: {
      default: title,
      template: "%s | Nomads Pipa",
    },
    description,
    keywords: [
      "Praia da Pipa",
      "Digital Nomads",
      "Remote Work Pipa",
      "Brazil Nomads",
      "Pipa Coworking",
      "Pipa Community",
      "Local Guide Pipa",
      "Nômades Pipa",
      "Trabalho Remoto Brasil",
    ],
    authors: [{ name: "Nomads Pipa Community" }],
    alternates: {
      canonical: `https://nomadspipa.com/${locale}`,
      languages: {
        en: "https://nomadspipa.com/en",
        "pt-BR": "https://nomadspipa.com/pt-BR",
        es: "https://nomadspipa.com/es",
        "x-default": "https://nomadspipa.com/en",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale] ?? "en_US",
      url: `https://nomadspipa.com/${locale}`,
      siteName: "Nomads Pipa",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        sora.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <AppHeader />
<<<<<<< HEAD
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 pb-16 outline-none md:pb-0"
          >
=======
          <main id="main-content" tabIndex={-1} className="flex-1 pb-16 outline-none md:pb-0">
>>>>>>> 580eb59fdaa13cc165a53cf8a404087274c46dea
            {children}
          </main>
          <AppFooter />
          <MobileBottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
