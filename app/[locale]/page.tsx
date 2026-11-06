import { Link } from "@/i18n/navigation";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  ArrowRight,
  Compass,
  Sparkles,
  MapPin,
  QrCode,
  Users,
  Wifi,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
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
  "community-give-back": Compass,
};

export default function HomePage() {
  const t = useTranslations("Homepage");
  const locale = useLocale() as ContentLocale;

  // The 6 core discovery areas shown on homepage
  const homeCategorySlugs: CategorySlug[] = [
    "food-and-drink",
    "events-and-community",
    "accommodation",
    "transportation",
    "sports-and-activities",
    "essential-services",
  ];

  const categories = homeCategorySlugs.map((slug) => {
    const raw = DISCOVERY_CATEGORIES.find((c) => c.slug === slug)!;
    const localized = getLocalizedCategory(raw, locale);
    return {
      ...localized,
      icon: CATEGORY_ICONS[slug],
    };
  });

  const platformPillars = [
    {
      icon: Compass,
      title: t("pillar1Title"),
      description: t("pillar1Desc"),
    },
    {
      icon: Users,
      title: t("pillar2Title"),
      description: t("pillar2Desc"),
    },
    {
      icon: QrCode,
      title: t("pillar3Title"),
      description: t("pillar3Desc"),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-secondary/60 via-background to-background py-14 sm:py-20 md:py-24">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Location Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3.5 py-1 text-xs font-semibold text-accent-foreground shadow-xs backdrop-blur-xs">
              <Sun className="h-3.5 w-3.5 text-accent-foreground" />
              <span>{t("locationPill")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t("heroHeadlineStart")}{" "}
              <span className="bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
                {t("heroLocation")}
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              {t("heroSubtitle")}
            </p>

            {/* Quick Action / Discovery Entry Point */}
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/categories"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full flex-1 rounded-full bg-primary font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
                )}
              >
                <span>{t("browseCategories")}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/events"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 w-full rounded-full border-border/80 font-medium sm:w-auto"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                <span>{t("eventsCta")}</span>
              </Link>
            </div>

            {/* Quick Highlights Strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-primary" />
                {t("verifiedWifiHighlight")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {t("curatedSpotsHighlight")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t("communityPerksHighlight")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SIX CORE DISCOVERY CATEGORIES */}
      <section
        id="categories"
        className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20"
      >
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{t("explorePipaBadge")}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t("mainDiscoveryAreas")}
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              {t("mainDiscoveryAreasSubtitle")}
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <span>{t("viewDirectoryIndex")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="border border-border/60 text-[11px] font-semibold text-accent-foreground"
                    >
                      {category.highlightBadge}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-accent-foreground">
                    {category.tagline}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-primary pt-2 border-t border-border/40">
                  <span>{t("exploreCategory")}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. CORE PLATFORM PILLARS */}
      <section className="border-y border-border/70 bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
              {t("whyNomadsPipaBadge")}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("whyNomadsPipaTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {t("whyNomadsPipaSubtitle")}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {platformPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <PillarIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PARTNER CALL TO ACTION */}
      <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-secondary/40 to-muted/50 p-8 shadow-sm sm:p-12 md:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="border border-border/80 px-3 py-1 text-xs font-semibold text-accent-foreground"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 inline" />
              {t("partnerBadge")}
            </Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t("partnerTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base">
              {t("partnerSubtitle")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/partner"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-md hover:bg-primary/90 sm:w-auto"
                )}
              >
                <span>{t("partnerCta")}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 w-full rounded-full border-border/80 font-medium sm:w-auto"
                )}
              >
                <span>{t("aboutPlatformCta")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
