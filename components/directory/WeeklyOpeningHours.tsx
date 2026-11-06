import type { WeeklyOpeningHours as WeeklyOpeningHoursType } from "@/lib/content/businesses";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export interface WeeklyOpeningHoursProps {
  hours?: WeeklyOpeningHoursType;
}

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export function WeeklyOpeningHours({ hours }: WeeklyOpeningHoursProps) {
  const t = useTranslations("Directory");

  if (!hours) return null;

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
      <div className="flex items-center gap-2 text-foreground font-semibold text-base mb-3">
        <Clock className="h-4 w-4 text-primary" />
        <h4>{t("openingHoursTitle")}</h4>
      </div>
      <dl className="grid grid-cols-1 gap-2 text-sm">
        {DAYS_OF_WEEK.map((day) => {
          const schedule = hours[day];
          const isClosed = !schedule || schedule.isClosed;

          return (
            <div
              key={day}
              className="flex items-center justify-between py-1 border-b border-border/40 last:border-b-0"
            >
              <dt className="text-muted-foreground font-medium">
                {t(`days.${day}` as `days.${typeof day}`)}
              </dt>
              <dd className="font-medium text-foreground">
                {isClosed ? (
                  <span className="text-muted-foreground text-xs font-normal">
                    {t("openingHoursClosed")}
                  </span>
                ) : (
                  <span>
                    {schedule.open} – {schedule.close}
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
