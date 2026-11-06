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
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { contentService, parseDirectoryFilterParams } from "@/lib/content";
import {
  BusinessCard,
  CategoryHeader,
  ContextualFilterBar,
} from "@/components/directory";

interface CategoryMeta {
  title: string;
  description: string;
  icon: LucideIcon;
  subcategories: string[];
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  "food-and-drink": {
    title: "Food & Drink",
    description:
      "Curated local dining and cafes in Praia da Pipa. Filter by remote-work friendly cafes with verified Wi-Fi, daily meal specials (prato feito), sunset views, and live music.",
    icon: UtensilsCrossed,
    subcategories: ["cafes", "restaurants", "bars", "daily-meals-pf"],
  },
  "events-and-community": {
    title: "Events & Community",
    icon: CalendarDays,
    description:
      "Stay connected with what is happening in Pipa. Discover official Nomads Pipa meetups, community-vetted gatherings, workshops, and local cultural festivals.",
    subcategories: [],
  },
  accommodation: {
    title: "Accommodation",
    icon: Home,
    description:
      "Find vetted places to stay in Pipa for days, weeks, or months. Direct partner enquiry workflow connecting you with trusted hostels, pousadas, and private rentals.",
    subcategories: ["pousadas", "hostels", "houses", "apartments"],
  },
  transportation: {
    title: "Transportation",
    icon: Bike,
    description:
      "Navigate Pipa and Rio Grande do Norte with ease. Simple 'Get Me a Ride' routing for airport shuttles from Natal, local taxis, moto-taxis, and rental vehicles.",
    subcategories: [],
  },
  "sports-and-activities": {
    title: "Sports & Activities",
    icon: Waves,
    description:
      "Make the most of Pipa's unique nature and coastline. Find surf schools, board rentals, yoga studios, dolphin tours, boat trips, and beach fitness sessions.",
    subcategories: [],
  },
  "essential-services": {
    title: "Essential Services",
    icon: ShieldAlert,
    description:
      "Reliable and verified local essentials. Fast access to emergency numbers, local medical clinics, pharmacies, laptop repair, laundry, and foreign traveler Pix guidance.",
    subcategories: [],
  },
  "community-give-back": {
    title: "Community & Give Back",
    icon: HeartHandshake,
    description:
      "Connect with local community projects, social initiatives, and beach cleanups across Praia da Pipa and Tibau do Sul.",
    subcategories: [],
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    return {
      title: "Category",
    };
  }

  return {
    title: `${category.title} — Nomads Pipa`,
    description: category.description,
  };
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function CategoryListingsContent({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const rawSearchParams = await searchParams;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    notFound();
  }

  const filters = parseDirectoryFilterParams(rawSearchParams);
  const businesses = await contentService.getBusinessesByCategory(slug, filters);
  const t = await getTranslations("Directory");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Category Header */}
      <CategoryHeader
        categorySlug={slug}
        title={category.title}
        description={category.description}
        icon={category.icon}
        subcategories={category.subcategories}
        activeSubcategory={filters.subcategory}
        activeTags={filters.tags}
      />

      {/* Contextual Filter Bar */}
      <ContextualFilterBar
        categorySlug={slug}
        activeTags={filters.tags}
        activeSubcategory={filters.subcategory}
      />

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
          {(filters.tags?.length || filters.subcategory) && (
            <div className="mt-4">
              <Link
                href={`/category/${slug}`}
                className="inline-flex min-h-[44px] items-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
