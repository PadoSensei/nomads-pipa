import { Suspense } from "react";
import type { Metadata } from "next";
import { CalendarDays, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { contentService } from "@/lib/content";
import { EventCard } from "@/components/events";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });

  return {
    title: `${t("title")} — Nomads Pipa`,
    description: t("subtitle"),
  };
}

interface EventsPageProps {
  params: Promise<{ locale: AppLocale }>;
}

async function EventsListContent() {
  const events = await contentService.getEvents();
  const t = await getTranslations("Events");

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 px-6 py-16 text-center shadow-2xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
          <CalendarDays className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          {t("noEventsFound")}
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="mr-1 h-3 w-3 inline text-accent-foreground" aria-hidden="true" />
            {t("upcomingEvents")}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {t("timezoneNotice", { defaultMessage: "All times in America/Fortaleza (Pipa local time)" })}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Events List */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-72 rounded-2xl bg-muted/40 animate-pulse" />
            <div className="h-72 rounded-2xl bg-muted/40 animate-pulse" />
            <div className="h-72 rounded-2xl bg-muted/40 animate-pulse" />
          </div>
        }
      >
        <EventsListContent />
      </Suspense>
    </div>
  );
}
