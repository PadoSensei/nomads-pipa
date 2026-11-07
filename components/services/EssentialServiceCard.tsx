import type { EssentialServiceListing, EssentialServiceSubcategory } from "@/lib/content/essential-services";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Stethoscope,
  Wrench,
  CreditCard,
  Shirt,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedListing } from "@/lib/content/localization";
import type { ContentLocale } from "@/lib/content/status";
import { formatWhatsAppUrl } from "@/components/events/EventCard";

export interface EssentialServiceCardProps {
  service: EssentialServiceListing;
  isEmergencyHighlight?: boolean;
}

export function EssentialServiceCard({
  service: rawService,
  isEmergencyHighlight = false,
}: EssentialServiceCardProps) {
  const t = useTranslations("EssentialServices");
  const locale = useLocale() as ContentLocale;
  const service = getLocalizedListing(rawService, locale);

  const isEmergency = service.isEmergency;
  const phone = service.contact?.phone;
  const emergencyPhone = service.emergencyPhone;
  const rawWa = service.contact?.whatsapp;
  const waUrl = formatWhatsAppUrl(rawWa);

  // Parse phone number for tel: link (strip non-digits, keep leading + if present)
  const formatTelLink = (p?: string): string | undefined => {
    if (!p) return undefined;
    // Extract first phone sequence if multiple are mentioned
    const match = p.match(/\+?\d[\d\s-]{6,}\d/);
    if (!match) return undefined;
    const cleanDigits = match[0].replace(/[^\d+]/g, "");
    return cleanDigits ? `tel:${cleanDigits}` : undefined;
  };

  const telUrl = formatTelLink(emergencyPhone || phone);

  // Subcategory badge config
  const subcategoryIcons: Record<EssentialServiceSubcategory, typeof ShieldAlert> = {
    emergency: ShieldAlert,
    healthcare: Stethoscope,
    repairs: Wrench,
    payments: CreditCard,
    laundry: Shirt,
    dental: Stethoscope,
    veterinary: Stethoscope,
    couriers: HelpCircle,
    "beauty-wellness": HelpCircle,
    immigration: HelpCircle,
  };

  const SubIcon = subcategoryIcons[service.essentialSubcategory] || HelpCircle;

  return (
    <Card
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border transition-all ${
        isEmergencyHighlight || isEmergency
          ? "border-red-300/80 bg-red-50/30 dark:bg-red-950/20 shadow-xs hover:border-red-500 hover:shadow-md"
          : "border-border/70 bg-card shadow-xs hover:border-primary/40 hover:shadow-md"
      } p-5 sm:p-6`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge
            variant={isEmergency ? "destructive" : "secondary"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
          >
            <SubIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {service.essentialSubcategory === "emergency"
                ? t("emergencyBadge")
                : t(`subcategories.${service.essentialSubcategory}`)}
            </span>
          </Badge>

          {isEmergency && (
            <Badge
              variant="outline"
              className="bg-red-100 text-red-900 border-red-300 font-bold text-[11px] uppercase tracking-wider"
            >
              {t("available24h")}
            </Badge>
          )}

          {service.verificationStatus === "verified" && !isEmergency && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              <span>{t("verified")}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-foreground">
          {service.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {/* Address and metadata */}
        <div className="mt-4 space-y-2 border-t border-border/60 pt-3 text-xs sm:text-sm text-foreground/90">
          {service.address && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0 translate-y-0.5" aria-hidden="true" />
              <span className="text-xs text-foreground/90">{service.address}</span>
            </div>
          )}

          {emergencyPhone && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-700 dark:text-red-400">
              <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{emergencyPhone}</span>
            </div>
          )}

          {service.officialSourceUrl && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <a
                href={service.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("officialSource")}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Direct Contact Actions: Phone and WhatsApp */}
      <div className="mt-6 border-t border-border/50 pt-4 flex flex-col sm:flex-row gap-2">
        {telUrl && (
          <a
            href={telUrl}
            className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              isEmergency
                ? "bg-red-600 text-white shadow-xs hover:bg-red-700"
                : "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
            }`}
            aria-label={`${t("callNow")}: ${service.name}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{isEmergency ? t("callEmergency") : t("callNow")}</span>
          </a>
        )}

        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-xs transition-colors hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`${t("chatWhatsApp")}: ${service.name}`}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t("chatWhatsApp")}</span>
          </a>
        )}
      </div>
    </Card>
  );
}
