import type { BusinessListing } from "@/lib/content/businesses";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Wifi,
  Zap,
  Volume2,
  Heart,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { isKnownSubcategory } from "@/lib/content/i18n-keys";
import { getLocalizedListing } from "@/lib/content/localization";
import type { ContentLocale } from "@/lib/content/status";

export interface BusinessCardProps {
  business: BusinessListing;
}

export function BusinessCard({ business: rawBusiness }: BusinessCardProps) {
  const t = useTranslations("Directory");
  const locale = useLocale() as ContentLocale;
  const business = getLocalizedListing(rawBusiness, locale);

  const isQuietSpace = business.tags.includes("quiet-space");
  const isPartner = business.partnerStatus === "approved";

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-0 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      {/* Cover image / photo banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {business.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.coverImageUrl}
            alt={business.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/15 text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              {business.subcategory || business.category}
            </span>
          </div>
        )}

        {/* Partner badge overlay */}
        {isPartner && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-xs backdrop-blur-xs">
            <Sparkles className="h-3 w-3 text-sun" />
            <span>{t("partnerBadge")}</span>
          </div>
        )}

        {/* Price level pill */}
        {business.priceLevel && (
          <div className="absolute top-3 right-3 rounded-md bg-card/90 px-2 py-0.5 text-xs font-bold text-foreground shadow-xs backdrop-blur-xs">
            {business.priceLevel}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Category & Subcategory line */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {business.subcategory
              ? isKnownSubcategory(business.subcategory)
                ? t(`subcategories.${business.subcategory}`)
                : business.subcategory
              : business.category}
          </Badge>
          {business.verificationStatus === "verified" && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              <span>{t("verifiedBadge")}</span>
            </span>
          )}
        </div>

        {/* Business Name Link */}
        <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link
            href={`/business/${business.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm after:absolute after:inset-0"
          >
            {business.name}
          </Link>
        </h3>

        {/* Address */}
        {business.address && (
          <p className="mt-1 flex items-start gap-1 text-xs text-muted-foreground line-clamp-1">
            <MapPin className="h-3.5 w-3.5 shrink-0 translate-y-0.5" />
            <span>{business.address}</span>
          </p>
        )}

        {/* Description snippet */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        {/* Contextual Amenity Badges */}
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-1.5" aria-label="Amenities">
          {business.wifiSpeed !== undefined ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-800 border-emerald-200"
            >
              <Wifi className="h-3 w-3 text-emerald-600" />
              <span>{t("wifiSpeed", { speed: business.wifiSpeed })}</span>
            </Badge>
          ) : business.hasWifi ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-800 border-emerald-200"
            >
              <Wifi className="h-3 w-3 text-emerald-600" />
              <span>{t("tags.wifi")}</span>
            </Badge>
          ) : null}

          {business.hasPowerOutlets && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-900 border-amber-200"
            >
              <Zap className="h-3 w-3 text-amber-600" />
              <span>{t("powerOutlets")}</span>
            </Badge>
          )}

          {isQuietSpace && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-sky-50 text-sky-900 border-sky-200"
            >
              <Volume2 className="h-3 w-3 text-sky-600" />
              <span>{t("quietSpace")}</span>
            </Badge>
          )}

          {business.isPetFriendly && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-rose-50 text-rose-900 border-rose-200"
            >
              <Heart className="h-3 w-3 text-rose-600" />
              <span>{t("petFriendly")}</span>
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
