import type { EventListing, EventType } from "@/lib/content/events";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Compass,
  Landmark,
  MessageCircle,
  Ticket,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDateTime, formatTime } from "@/lib/formatters";
import { getLocalizedEvent } from "@/lib/content/localization";
import type { ContentLocale } from "@/lib/content/status";
import type { AppLocale } from "@/i18n/routing";

export interface EventCardProps {
  event: EventListing;
}

/**
 * Format a phone/WhatsApp number to a clean wa.me URL
 */
export function formatWhatsAppUrl(phoneOrUrl?: string): string | undefined {
  if (!phoneOrUrl) return undefined;
  if (phoneOrUrl.startsWith("http://") || phoneOrUrl.startsWith("https://")) {
    return phoneOrUrl;
  }
  // Strip non-digits
  const digits = phoneOrUrl.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : undefined;
}

export function EventCard({ event: rawEvent }: EventCardProps) {
  const t = useTranslations("Events");
  const locale = useLocale() as ContentLocale;
  const event = getLocalizedEvent(rawEvent, locale);

  const appLocale = locale as AppLocale;

  // Format date and time in America/Fortaleza timezone via formatters
  const startDateStr = formatDateTime(event.startsAt, appLocale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const startTimeStr = formatTime(event.startsAt, appLocale);
  const endTimeStr = event.endsAt ? formatTime(event.endsAt, appLocale) : undefined;

  const waUrl = formatWhatsAppUrl(event.contact?.whatsapp);

  // Badge config based on event classification (using icons + text, not color alone)
  const badgeConfig: Record<
    EventType,
    { label: string; icon: typeof Compass; className: string }
  > = {
    official_meetup: {
      label: t("officialMeetup"),
      icon: Compass,
      className: "bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold",
    },
    community_pick: {
      label: t("communityPick"),
      icon: Users,
      className: "bg-amber-100 text-amber-950 border-amber-300 font-semibold",
    },
    city_event: {
      label: t("cityEvent"),
      icon: Landmark,
      className: "bg-purple-100 text-purple-950 border-purple-300 font-semibold",
    },
  };

  const badge = badgeConfig[event.eventType];
  const BadgeIcon = badge.icon;

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      <div>
        {/* Top Meta: Endorsement Badge + Price */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs ${badge.className}`}
          >
            <BadgeIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{badge.label}</span>
          </Badge>

          {event.priceDescription && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
              <Ticket className="h-3 w-3" aria-hidden="true" />
              <span>{event.priceDescription}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-foreground">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>

        {/* Schedule & Location Details */}
        <div className="mt-4 space-y-2 border-t border-border/60 pt-3 text-xs sm:text-sm text-foreground/90">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span className="font-semibold capitalize">{startDateStr}</span>
            <span className="text-muted-foreground">·</span>
            <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="text-muted-foreground">
              {startTimeStr}
              {endTimeStr ? ` – ${endTimeStr}` : ""}
            </span>
          </div>

          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary shrink-0 translate-y-0.5" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{event.locationName}</span>
              {event.address && <span className="text-xs text-muted-foreground">{event.address}</span>}
            </div>
          </div>

          {event.organizerName && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
              <span>
                {t("organizedBy", { defaultMessage: "Hosted by" })}:{" "}
                <strong className="font-medium text-foreground">{event.organizerName}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action / RSVP Area */}
      {waUrl && (
        <div className="mt-6 border-t border-border/50 pt-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`${t("rsvp")}: ${event.title}`}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t("rsvp")}</span>
          </a>
        </div>
      )}
    </Card>
  );
}
