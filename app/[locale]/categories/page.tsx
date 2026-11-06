import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  ArrowRight,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import {
  DISCOVERY_CATEGORIES,
  type CategorySlug,
} from "@/lib/content/categories";
import { getLocalizedCategory } from "@/lib/content/localization";
import type { ContentLocale } from "@/lib/content/status";

const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  "food-and-drink": UtensilsCrossed,
  "events-and-community": CalendarDays,
  accommodation: Home,
  transportation: Bike,
  "sports-and-activities": Waves,
  "essential-services": ShieldAlert,
  "community-give-back": Layers,
};

import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Categories" });

  return {
    title: `${t("title")} — Nomads Pipa`,
    description: t("subtitle"),
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Categories" });
  const contentLocale = locale as ContentLocale;

  // The 6 core discovery areas
  const categorySlugs: CategorySlug[] = [
    "food-and-drink",
    "events-and-community",
    "accommodation",
    "transportation",
    "sports-and-activities",
    "essential-services",
  ];

  const categories = categorySlugs.map((slug) => {
    const raw = DISCOVERY_CATEGORIES.find((c) => c.slug === slug)!;
    const localized = getLocalizedCategory(raw, contentLocale);
    return {
      ...localized,
      icon: CATEGORY_ICONS[slug],
    };
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
          >
            <Layers className="mr-1 h-3 w-3 inline" />
            {t("directoryIndexBadge")}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {t("allCoreCategoriesCount")}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("categoriesPageTitle")}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          {t("categoriesPageDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:bg-muted/30 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-[11px] font-normal">
                    {cat.highlightBadge}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                  {cat.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>{t("viewListingsAndInfo")}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
