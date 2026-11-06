import type { ContextualTagSlug } from "@/lib/content/categories";
import { Link } from "@/i18n/navigation";
import { toggleTagInList } from "@/lib/content/filters";
import { Wifi, Zap, Utensils, Sunset, X, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { TagKey } from "@/lib/content/i18n-keys";

export interface ContextualFilterBarProps {
  categorySlug: string;
  activeTags?: ContextualTagSlug[];
  activeSubcategory?: string;
}

interface FilterTagConfig {
  slug: ContextualTagSlug;
  icon: LucideIcon;
  tagKey: TagKey;
}

const SUPPORTED_FILTER_TAGS: FilterTagConfig[] = [
  { slug: "wifi", icon: Wifi, tagKey: "wifi" },
  { slug: "power-outlets", icon: Zap, tagKey: "power-outlets" },
  { slug: "daily-meal-pf", icon: Utensils, tagKey: "daily-meal-pf" },
  { slug: "sunset-views", icon: Sunset, tagKey: "sunset-views" },
];

export function ContextualFilterBar({
  categorySlug,
  activeTags = [],
  activeSubcategory,
}: ContextualFilterBarProps) {
  const t = useTranslations("Directory");

  const buildTagHref = (tag: ContextualTagSlug) => {
    const nextTags = toggleTagInList(activeTags, tag);
    const params = new URLSearchParams();
    if (activeSubcategory) {
      params.set("subcategory", activeSubcategory);
    }
    if (nextTags.length > 0) {
      params.set("tags", nextTags.join(","));
    }
    const qs = params.toString();
    return `/category/${categorySlug}${qs ? `?${qs}` : ""}`;
  };

  const clearHref = () => {
    const params = new URLSearchParams();
    if (activeSubcategory) {
      params.set("subcategory", activeSubcategory);
    }
    const qs = params.toString();
    return `/category/${categorySlug}${qs ? `?${qs}` : ""}`;
  };

  const hasActiveFilters = activeTags.length > 0;

  return (
    <div
      className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-card/60 p-3 shadow-2xs backdrop-blur-xs"
      role="region"
      aria-label="Contextual Filters"
    >
      <span className="text-xs font-semibold text-muted-foreground mr-1 hidden sm:inline">
        {t("filterByTag")}:
      </span>

      {SUPPORTED_FILTER_TAGS.map(({ slug, icon: Icon, tagKey }) => {
        const isActive = activeTags.includes(slug);
        return (
          <Link
            key={slug}
            href={buildTagHref(slug)}
            className={`inline-flex min-h-[44px] items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive
                ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                : "bg-background text-foreground/80 border border-border/80 hover:bg-muted/50"
            }`}
            aria-pressed={isActive}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span>{t(`tags.${tagKey}`)}</span>
          </Link>
        );
      })}

      {hasActiveFilters && (
        <Link
          href={clearHref()}
          className="ml-auto inline-flex min-h-[44px] items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-2"
        >
          <X className="h-3.5 w-3.5" />
          <span>{t("clearFilters")}</span>
        </Link>
      )}
    </div>
  );
}
