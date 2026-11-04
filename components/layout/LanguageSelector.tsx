"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const languageNames: Record<AppLocale, string> = {
  en: "English",
  "pt-BR": "Português (Brasil)",
  es: "Español",
};

interface LanguageSelectorProps {
  className?: string;
  variant?: "header" | "compact" | "footer";
}

export function LanguageSelector({
  className,
  variant = "header",
}: LanguageSelectorProps) {
  const currentLocale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const handleLanguageChange = (nextLocale: AppLocale) => {
    if (nextLocale === currentLocale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  if (variant === "footer") {
    return (
      <div
        className={cn("flex flex-wrap items-center gap-2 text-xs", className)}
        role="region"
        aria-label={t("languageSelectorLabel")}
      >
        <span className="text-muted-foreground mr-1 flex items-center gap-1">
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("languageSelectorLabel")}:</span>
        </span>
        {routing.locales.map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <button
              key={locale}
              type="button"
              onClick={() => handleLanguageChange(locale)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "rounded px-2 py-1 font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-secondary text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {languageNames[locale]}
            </button>
          );
        })}
      </div>
    );
  }

  // Header and compact dropdown / select variant
  return (
    <div
      className={cn("relative inline-flex items-center", className)}
      role="region"
      aria-label="Language selection"
    >
      <label htmlFor="language-select" className="sr-only">
        {t("languageSelectorLabel")}
      </label>
      <div className="flex items-center gap-1 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-xs shadow-xs transition hover:border-primary/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
        <Globe
          className="h-3.5 w-3.5 text-muted-foreground shrink-0"
          aria-hidden="true"
        />
        <select
          id="language-select"
          value={currentLocale}
          onChange={(e) => handleLanguageChange(e.target.value as AppLocale)}
          aria-label={t("languageSelectorLabel")}
          className="bg-transparent font-medium text-foreground focus:outline-hidden cursor-pointer pr-1"
        >
          {routing.locales.map((locale) => (
            <option key={locale} value={locale} className="bg-popover text-popover-foreground">
              {languageNames[locale]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
