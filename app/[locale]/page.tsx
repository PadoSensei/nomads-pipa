import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { SearchPill } from "@/components/ui/SearchPill";
import { QuickActionTile } from "@/components/ui/QuickActionTile";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { contentService } from "@/lib/content";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  Compass,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  type LucideIcon,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export default async function HomePage() {
  const t = await getTranslations("Homepage");
  const locale = (await getLocale()) as ContentLocale;

  // Retrieve upcoming events via ContentService
  const allEvents = await contentService.getEvents();
  const upcomingEvents = allEvents.slice(0, 2);

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

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* 1. PHOTOGRAPHIC HERO SECTION WITH OVERLAPPING SEARCH */}
      <section className="relative w-full">
        {/* Mobile Header over Hero */}
        <div className="md:hidden">
          <HeroHeader />
        </div>

        {/* Hero Background Image */}
        <div className="relative h-[270px] sm:h-[320px] md:h-[400px] w-full overflow-hidden">
          <Image
            src="/images/pipa-hero.webp"
            alt="Praia da Pipa coastline"
            fill
            priority
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end px-5 pb-9 sm:px-8 max-w-5xl mx-auto">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {t("v16HeroHeadline")}
            </h1>
            <p className="mt-1 text-sm sm:text-base font-medium text-white/90 drop-shadow-xs">
              {t("v16HeroSubline")}
            </p>
          </div>
        </div>

        {/* Overlapping Search Pill */}
        <div className="relative -mt-6 px-4 max-w-2xl mx-auto z-10">
          <SearchPill />
        </div>
      </section>

      {/* 2. 2x2 QUICK ACTION DISCOVERY TILES */}
      <section className="px-4 pt-6 pb-4 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <QuickActionTile
            href="/category/accommodation"
            icon={Home}
            title={t("quickActionStayTitle")}
            subtitle={t("quickActionStaySubtitle")}
            tint="mint"
          />
          <QuickActionTile
            href="/community"
            icon={Users}
            title={t("quickActionCommunityTitle")}
            subtitle={t("quickActionCommunitySubtitle")}
            tint="aqua"
          />
          <QuickActionTile
            href="/events"
            icon={CalendarDays}
            title={t("quickActionEventsTitle")}
            subtitle={t("quickActionEventsSubtitle")}
            tint="peach"
          />
          <QuickActionTile
            href="/category/food-and-drink"
            icon={UtensilsCrossed}
            title={t("quickActionFoodTitle")}
            subtitle={t("quickActionFoodSubtitle")}
            tint="yellow"
          />
        </div>
      </section>

      {/* 3. CORE DISCOVERY CATEGORIES */}
      <section className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
              {t("mainDiscoveryAreas")}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70">
              {t("mainDiscoveryAreasSubtitle")}
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs sm:text-sm font-semibold text-ocean hover:underline flex items-center gap-1"
          >
            <span>{t("viewDirectoryIndex")}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={
                  category.slug === "essential-services"
                    ? "/essential-services"
                    : `/category/${category.slug}`
                }
                className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-white p-5 shadow-xs transition-all hover:border-ocean/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist/60 text-ocean group-hover:bg-ocean group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="border border-border/40 text-[11px] font-medium text-charcoal/80 bg-mist/40"
                    >
                      {category.highlightBadge}
                    </Badge>
                  </div>
                  <h3 className="mt-3.5 text-base font-bold text-charcoal group-hover:text-ocean">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/60 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-ocean pt-2 border-t border-border/40">
                  <span>{t("exploreCategory")}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. UPCOMING EVENTS TEASER */}
      {upcomingEvents.length > 0 && (
        <section className="container mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-charcoal">
                {t("featuredEventsTitle")}
              </h2>
              <p className="text-xs text-charcoal/70">
                {t("featuredEventsSubtitle")}
              </p>
            </div>
            <Link
              href="/events"
              className="text-xs font-semibold text-ocean hover:underline flex items-center gap-1"
            >
              <span>{t("viewAllEvents")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex flex-col justify-between rounded-2xl border border-border/60 bg-white p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-peach/60 px-2.5 py-0.5 text-[11px] font-semibold text-charcoal">
                      {evt.eventType === "official_meetup"
                        ? "Nomads Pipa Meet-up"
                        : evt.eventType === "community_pick"
                        ? "Community Pick"
                        : "City & Cultural"}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-base font-bold text-charcoal">
                    {evt.title}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/40 text-xs text-charcoal/80">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-ocean" />
                    {new Date(evt.startsAt).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-ocean" />
                    {evt.locationName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LOCAL BUSINESS & PARTNER BANNER */}
      <section className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 mb-8">
        <div className="rounded-3xl border border-border/60 bg-ocean text-white p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-yellow">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("partnerBadge")}</span>
            </span>
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-bold tracking-tight">
              {t("partnerTitle")}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
              {t("partnerSubtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/partner"
              className="inline-flex h-11 items-center justify-center rounded-full bg-yellow px-6 text-xs sm:text-sm font-bold text-charcoal shadow-sm hover:bg-yellow/90 transition-colors"
            >
              <span>{t("partnerCta")}</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
