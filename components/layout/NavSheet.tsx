"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { X, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface NavSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavSheet({ isOpen, onClose }: NavSheetProps) {
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const currentLocale = useLocale();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevActive = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      prevActive?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-xs flex-col bg-background p-6 shadow-2xl transition-transform"
      >
        <div className="flex items-center justify-between pb-6 border-b border-border/60">
          <span className="font-heading font-bold text-lg text-ocean">
            {tCommon("brandName")}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-mist/60 text-charcoal hover:bg-mist focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[44px] min-w-[44px]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-charcoal hover:text-ocean"
          >
            {tNav("explore")}
          </Link>
          <Link
            href="/categories"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-charcoal hover:text-ocean"
          >
            {tNav("categories")}
          </Link>
          <Link
            href="/events"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-charcoal hover:text-ocean"
          >
            {tNav("events")}
          </Link>
          <Link
            href="/community"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-charcoal hover:text-ocean"
          >
            {tNav("community")}
          </Link>
          <Link
            href="/essential-services"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-charcoal hover:text-ocean"
          >
            Essential Services
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-charcoal hover:text-ocean"
          >
            {tNav("about")}
          </Link>
          <Link
            href="/partner"
            onClick={onClose}
            className="flex items-center py-2 text-base font-medium text-ocean font-semibold hover:underline"
          >
            {tNav("partner")}
          </Link>
        </nav>

        <div className="pt-6 border-t border-border/60">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            <Globe className="h-3.5 w-3.5" />
            <span>{tCommon("languageSelectorLabel")}</span>
          </div>
          <div className="flex gap-2">
            {(
              [
                { code: "en", label: "EN" },
                { code: "pt-BR", label: "PT" },
                { code: "es", label: "ES" },
              ] as const
            ).map((lang) => (
              <Link
                key={lang.code}
                href="/"
                locale={lang.code}
                onClick={onClose}
                className={`flex-1 rounded-full py-2 text-center text-xs font-semibold transition-colors min-h-[44px] flex items-center justify-center ${
                  currentLocale === lang.code
                    ? "bg-ocean text-white"
                    : "bg-mist/50 text-charcoal hover:bg-mist"
                }`}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
