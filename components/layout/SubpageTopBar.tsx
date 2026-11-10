"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ChevronLeft, ChevronDown, Menu } from "lucide-react";
import { useLocale } from "next-intl";
import { NavSheet } from "./NavSheet";

export function SubpageTopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Do not render on the homepage because HeroHeader handles it
  if (pathname === "/" || pathname === "") {
    return null;
  }

  const locales: { code: "en" | "pt-BR" | "es"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "pt-BR", label: "PT" },
    { code: "es", label: "ES" },
  ];

  const currentLabel =
    locales.find((l) => l.code === currentLocale)?.label ?? currentLocale.toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border/50 bg-background/95 px-4 backdrop-blur-md md:hidden">
        {/* Left: Back button or Logo badge */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-mist/60 focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-ocean/20">
              <Image
                src="/brand/nomads-pipa-badge.webp"
                alt="Nomads Pipa"
                fill
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Right: Language Switcher & Menu */}
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-expanded={isLangOpen}
              aria-label={`Select language: ${currentLabel}`}
              className="flex h-9 items-center gap-1 rounded-full border border-border/60 bg-white/80 px-3 text-xs font-semibold text-charcoal shadow-2xs hover:bg-mist/40 focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px]"
            >
              <span>{currentLabel}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1 w-28 overflow-hidden rounded-2xl bg-card p-1 shadow-lg ring-1 ring-border/60 z-40">
                {locales.map((loc) => (
                  <Link
                    key={loc.code}
                    href={pathname}
                    locale={loc.code}
                    onClick={() => setIsLangOpen(false)}
                    className={`block w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                      loc.code === currentLocale
                        ? "bg-ocean text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {loc.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-mist/60 focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px] min-w-[44px]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <NavSheet isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
