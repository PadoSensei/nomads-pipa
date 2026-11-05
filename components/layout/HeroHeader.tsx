"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NavSheet } from "./NavSheet";

export function HeroHeader() {
  const tNav = useTranslations("Navigation");
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const locales: { code: "en" | "pt-BR" | "es"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "pt-BR", label: "PT" },
    { code: "es", label: "ES" },
  ];

  const currentLabel =
    locales.find((l) => l.code === currentLocale)?.label ?? currentLocale.toUpperCase();

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4 sm:px-6">
        {/* Top-left: Circular Badge Logo */}
        <Link
          href="/"
          className="flex items-center rounded-full transition-transform hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-white"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/90 shadow-md">
            <Image
              src="/brand/nomads-pipa-badge.webp"
              alt="Nomads Pipa"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* Top-right: Language Switcher & Hamburger Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-expanded={isLangOpen}
              aria-haspopup="listbox"
              aria-label={`Select language: ${currentLabel}`}
              className="flex h-10 items-center gap-1 rounded-full bg-ocean/90 px-3.5 text-xs font-semibold text-white shadow-md backdrop-blur-xs transition-colors hover:bg-ocean focus:outline-hidden focus:ring-2 focus:ring-white min-h-[44px]"
            >
              <span>{currentLabel}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-80" />
            </button>

            {isLangOpen && (
              <div
                role="listbox"
                className="absolute right-0 mt-2 w-28 overflow-hidden rounded-2xl bg-card p-1 shadow-lg ring-1 ring-border/60 z-30"
              >
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

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            aria-label={tNav("openMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/90 text-white shadow-md backdrop-blur-xs transition-colors hover:bg-ocean focus:outline-hidden focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <NavSheet isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
