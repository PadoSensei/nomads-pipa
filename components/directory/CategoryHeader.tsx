import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { isKnownSubcategory } from "@/lib/content/i18n-keys";

export interface CategoryHeaderProps {
  categorySlug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  subcategories?: string[];
  activeSubcategory?: string;
  activeTags?: string[];
}

export function CategoryHeader({
  categorySlug,
  title,
  description,
  icon: Icon,
  subcategories,
  activeSubcategory,
  activeTags,
}: CategoryHeaderProps) {
  const t = useTranslations("Directory");

  // Helper to construct link URL preserving active tags
  const getSubcategoryHref = (sub?: string) => {
    const params = new URLSearchParams();
    if (sub) {
      params.set("subcategory", sub);
    }
    if (activeTags && activeTags.length > 0) {
      params.set("tags", activeTags.join(","));
    }
    const qs = params.toString();
    return `/category/${categorySlug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <header className="mb-8 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/20 text-primary">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* Subcategory filter chips */}
      {subcategories && subcategories.length > 0 && (
        <nav
          aria-label="Subcategory filter"
          className="flex flex-wrap items-center gap-2 pt-2"
        >
          {/* "All" chip */}
          <Link
            href={getSubcategoryHref(undefined)}
            className={`inline-flex min-h-[44px] items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              !activeSubcategory
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            aria-current={!activeSubcategory ? "page" : undefined}
          >
            {t("allSubcategories")}
          </Link>

          {subcategories.map((sub) => {
            const isActive = activeSubcategory === sub;
            return (
              <Link
                key={sub}
                href={getSubcategoryHref(sub)}
                className={`inline-flex min-h-[44px] items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isKnownSubcategory(sub) ? t(`subcategories.${sub}`) : sub}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
