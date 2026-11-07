import { Suspense } from "react";
import type { Metadata } from "next";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  HeartHandshake,
  type LucideIcon,
  FilterX,
  X,
} from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  contentService,
  parseDirectoryFilterParams,
  getCategoryBySlug,
  getLocalizedCategory,
  type ContextualTagSlug,
} from "@/lib/content";
import {
  BusinessCard,
  CategoryHeader,
  ContextualFilterBar,
} from "@/components/directory";
import type { AppLocale } from "@/i18n/routing";
import type { ContentLocale } from "@/lib/content/status";
import { isKnownSubcategory, isKnownTag } from "@/lib/content/i18n-keys";

interface CategoryMetaConfig {
  icon: LucideIcon;
  subcategories: string[];
}

const CATEGORY_CONFIG: Record<string, CategoryMetaConfig> = {
  "food-and-drink": {
    icon: UtensilsCrossed,
    subcategories: ["cafes", "restaurants", "bars", "daily-meals-pf"],
  },
  "events-and-community": {
    icon: CalendarDays,
    subcategories: [],
  },
  accommodation: {
    icon: Home,
    subcategories: ["pousadas", "hostels", "houses", "apartments"],
  },
  transportation: {
    icon: Bike,
    subcategories: [],
  },
  "sports-and-activities": {
    icon: Waves,
    subcategories: [],
  },
  "essential-services": {
    icon: ShieldAlert,
    subcategories: [],
  },
  "community-give-back": {
    icon: HeartHandshake,
    subcategories: [],
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const rawCategory = getCategoryBySlug(slug);

  if (!rawCategory) {
    return {
      title: "Category",
    };
  }

  const category = getLocalizedCategory(rawCategory, locale as ContentLocale);

  return {
    title: `${category.name} — Nomads Pipa`,
    description: category.description,
  };
}

interface CategoryPageProps {
  params: Promise<{ locale: AppLocale; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function CategoryListingsContent({
  params,
  searchParams,
}: CategoryPageProps) {
  const { locale, slug } = await params;

  if (slug === "essential-services") {
    redirect({ href: "/essential-services", locale });
  }

  const rawSearchParams = await searchParams;
  const rawCategory = getCategoryBySlug(slug);
  const config = CATEGORY_CONFIG[slug];

  if (!rawCategory || !config) {
    notFound();
  }

  const category = getLocalizedCategory(rawCategory, locale as ContentLocale);
  const filters = parseDirectoryFilterParams(rawSearchParams);
  const businesses = await contentService.getBusinessesByCategory(slug, filters);
  const t = await getTranslations({ locale, namespace: "Directory" });

  const hasActiveSubcategory = Boolean(filters.subcategory);
  const hasActiveTags = Boolean(filters.tags && filters.tags.length > 0);
  const hasAnyFilter = hasActiveSubcategory || hasActiveTags;

  // Helper to remove a single tag from active filters
  const getRemoveTagHref = (tagToRemove: ContextualTagSlug) => {
    const remainingTags = (filters.tags || []).filter((t) => t !== tagToRemove);
    const params = new URLSearchParams();
    if (filters.subcategory) {
      params.set("subcategory", filters.subcategory);
    }
    if (remainingTags.length > 0) {
      params.set("tags", remainingTags.join(","));
    }
    const qs = params.toString();
    return `/category/${slug}${qs ? `?${qs}` : ""}`;
  };

  // Helper to remove subcategory from active filters
  const getRemoveSubcategoryHref = () => {
    const params = new URLSearchParams();
    if (filters.tags && filters.tags.length > 0) {
      params.set("tags", filters.tags.join(","));
    }
    const qs = params.toString();
    return `/category/${slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Category Header */}
      <CategoryHeader
        categorySlug={slug}
        title={category.name}
        description={category.description}
        icon={config.icon}
        subcategories={config.subcategories}
        activeSubcategory={filters.subcategory}
        activeTags={filters.tags}
      />

      {/* Contextual Filter Bar */}
      <ContextualFilterBar
        categorySlug={slug}
        activeTags={filters.tags}
        activeSubcategory={filters.subcategory}
      />

      {/* Result Count and Active Filters Summary Strip */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {t("resultCount", { count: businesses.length })}
          </span>

          {hasAnyFilter && (
            <div className="flex flex-wrap items-center gap-1.5 ml-1" aria-label={t("activeFiltersLabel")}>
              {filters.subcategory && (
                <Link
                  href={getRemoveSubcategoryHref()}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-border/80 bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Remove subcategory filter: ${filters.subcategory}`}
                >
                  <span>
                    {isKnownSubcategory(filters.subcategory)
                      ? t(`subcategories.${filters.subcategory}`)
                      : filters.subcategory}
                  </span>
                  <X className="h-3 w-3 text-muted-foreground" />
                </Link>
              )}

              {filters.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={getRemoveTagHref(tag)}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-border/80 bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Remove tag filter: ${tag}`}
                >
                  <span>{isKnownTag(tag) ? t(`tags.${tag}`) : tag}</span>
                  <X className="h-3 w-3 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {hasAnyFilter && (
          <Link
            href={`/category/${slug}`}
            className="inline-flex min-h-[36px] items-center text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm w-fit"
          >
            {t("clearAllFilters")}
          </Link>
        )}
      </div>

      {/* Listings Grid or Empty State */}
      {businesses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 px-6 py-16 text-center shadow-2xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
            <FilterX className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {t("noFilteredResults")}
          </h3>
          <p className="mt-2 max-w-sm text-xs text-muted-foreground">
            {t("noFilteredResultsDescription")}
          </p>
          {hasAnyFilter && (
            <div className="mt-6">
              <Link
                href={`/category/${slug}`}
                className="inline-flex min-h-[44px] items-center rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("clearFilters")}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CategoryDetailPage({
  params,
  searchParams,
}: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="h-48 rounded-3xl bg-muted/40 animate-pulse mb-8" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-80 rounded-2xl bg-muted/40 animate-pulse" />
            <div className="h-80 rounded-2xl bg-muted/40 animate-pulse" />
            <div className="h-80 rounded-2xl bg-muted/40 animate-pulse" />
          </div>
        </div>
      }
    >
      <CategoryListingsContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
