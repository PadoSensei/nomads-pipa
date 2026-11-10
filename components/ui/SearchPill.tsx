"use client";

import { Link } from "@/i18n/navigation";
import { Search, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchPillProps {
  href?: string;
}

export function SearchPill({ href = "/categories" }: SearchPillProps) {
  const t = useTranslations("Forms");

  return (
    <Link
      href={href}
      className="group flex w-full items-center justify-between rounded-full bg-card px-4 py-3 shadow-[0_8px_24px_rgba(7,63,59,0.12)] ring-1 ring-border/50 transition-all hover:ring-lagoon focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[48px]"
    >
      <div className="flex items-center gap-3 text-muted-foreground">
        <Search className="h-5 w-5 text-charcoal/60" />
        <span className="text-sm font-normal text-charcoal/60 group-hover:text-charcoal transition-colors truncate">
          {t("searchPlaceholder")}
        </span>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean text-white shadow-xs transition-transform group-hover:scale-105">
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
