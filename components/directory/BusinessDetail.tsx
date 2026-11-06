import type { BusinessListing } from "@/lib/content/businesses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { WeeklyOpeningHours } from "./WeeklyOpeningHours";
import {
  Wifi,
  Zap,
  Volume2,
  Heart,
  MapPin,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Phone,
  Camera,
  ArrowLeft,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isKnownSubcategory, isKnownTag } from "@/lib/content/i18n-keys";
import { getLocalizedCategory, getLocalizedListing } from "@/lib/content/localization";
import { getCategoryBySlug } from "@/lib/content/categories";
import type { ContentLocale } from "@/lib/content/status";

export interface BusinessDetailProps {
  business: BusinessListing;
}

export function BusinessDetail({ business: rawBusiness }: BusinessDetailProps) {
  const t = useTranslations("Directory");
  const locale = useLocale() as ContentLocale;
  const business = getLocalizedListing(rawBusiness, locale);

  // Look up localized category name for back button label
  const rawCategory = getCategoryBySlug(business.category);
  const localizedCategory = rawCategory
    ? getLocalizedCategory(rawCategory, locale)
    : undefined;

  const backLabel = localizedCategory
    ? t("backToCategory", { category: localizedCategory.name })
    : t("backToDirectory");

  const backHref = localizedCategory
    ? `/category/${business.category}`
    : `/categories`;

  const isPartner = business.partnerStatus === "approved";
  const isQuietSpace = business.tags.includes("quiet-space");

  // Format WhatsApp deep link
  const whatsappUrl = business.contact?.whatsapp
    ? `https://wa.me/${business.contact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  // Format Instagram link
  const instagramHandle = business.contact?.instagram?.replace(/^@/, "");
  const instagramUrl = instagramHandle
    ? `https://instagram.com/${instagramHandle}`
    : undefined;

  // Format Google Maps deep link
  const googleMapsUrl = business.location
    ? `https://www.google.com/maps/search/?api=1&query=${business.location.latitude},${business.location.longitude}`
    : business.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${business.name}, ${business.address}`
      )}`
    : undefined;

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={backHref}
          className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-xl text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* Hero Banner / Photo */}
      <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-sm">
        {business.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.coverImageUrl}
            alt={business.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/15 text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">
              {business.subcategory || business.category}
            </span>
          </div>
        )}

        {isPartner && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary/95 px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-sun" />
            <span>{t("partnerBadge")}</span>
          </div>
        )}

        {business.priceLevel && (
          <div className="absolute top-4 right-4 rounded-xl bg-card/90 px-3 py-1 text-sm font-bold text-foreground shadow-sm backdrop-blur-xs">
            {business.priceLevel}
          </div>
        )}
      </div>

      {/* Main Content Info */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {business.subcategory
                  ? isKnownSubcategory(business.subcategory)
                    ? t(`subcategories.${business.subcategory}`)
                    : business.subcategory
                  : business.category}
              </Badge>
              {business.verificationStatus === "verified" && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{t("verifiedBadge")}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {business.name}
            </h1>

            {business.address && (
              <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 translate-y-0.5" />
                <span>{business.address}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-neutral max-w-none">
            <p className="text-base leading-relaxed text-foreground/90">
              {business.description}
            </p>
          </div>

          {/* Amenity Badges */}
          <section aria-label="Amenities" className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              {t("filterByTag")}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {business.wifiSpeed !== undefined ? (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-800 border-emerald-200"
                >
                  <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{t("wifiSpeed", { speed: business.wifiSpeed })}</span>
                </Badge>
              ) : business.hasWifi ? (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-800 border-emerald-200"
                >
                  <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{t("tags.wifi")}</span>
                </Badge>
              ) : null}

              {business.hasPowerOutlets && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-amber-50 text-amber-900 border-amber-200"
                >
                  <Zap className="h-3.5 w-3.5 text-amber-600" />
                  <span>{t("powerOutlets")}</span>
                </Badge>
              )}

              {isQuietSpace && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-sky-50 text-sky-900 border-sky-200"
                >
                  <Volume2 className="h-3.5 w-3.5 text-sky-600" />
                  <span>{t("quietSpace")}</span>
                </Badge>
              )}

              {business.isPetFriendly && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-rose-50 text-rose-900 border-rose-200"
                >
                  <Heart className="h-3.5 w-3.5 text-rose-600" />
                  <span>{t("petFriendly")}</span>
                </Badge>
              )}

              {business.tags
                .filter((tag) => tag !== "quiet-space")
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-2.5 py-1 text-xs font-normal"
                  >
                    {isKnownTag(tag) ? t(`tags.${tag}`) : tag}
                  </Badge>
                ))}
            </div>
          </section>

          {/* External Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("contactWhatsApp")} (${business.name})`}
                className={`${buttonVariants({ variant: "default" })} min-h-[44px] min-w-[44px] flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs`}
              >
                <Phone className="mr-2 h-4 w-4" />
                <span>{t("contactWhatsApp")}</span>
              </a>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("viewInstagram")} (${business.name})`}
                className={`${buttonVariants({ variant: "outline" })} min-h-[44px] min-w-[44px] flex-1 font-semibold border-border/80`}
              >
                <Camera className="mr-2 h-4 w-4 text-pink-600" />
                <span>{t("viewInstagram")}</span>
              </a>
            )}

            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("openGoogleMaps")} (${business.name})`}
                className={`${buttonVariants({ variant: "secondary" })} min-h-[44px] min-w-[44px] flex-1 font-semibold`}
              >
                <ExternalLink className="mr-2 h-4 w-4 text-primary" />
                <span>{t("openGoogleMaps")}</span>
              </a>
            )}
          </div>
        </div>

        {/* Sidebar Schedule */}
        <div className="md:col-span-1 space-y-6">
          <WeeklyOpeningHours hours={business.openingHours} />
        </div>
      </div>
    </article>
  );
}
