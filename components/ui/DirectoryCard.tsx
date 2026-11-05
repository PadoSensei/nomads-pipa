import { ChevronRight, Home, Building2, Building } from "lucide-react";
import { useTranslations } from "next-intl";

interface DirectoryCardProps {
  id: string;
  name: string;
  description: string;
  typeLabel: string;
  contactUrl: string;
  tint?: "mint" | "yellow" | "peach";
}

export function DirectoryCard({
  name,
  description,
  typeLabel,
  contactUrl,
  tint = "mint",
}: DirectoryCardProps) {
  const t = useTranslations("Directory");

  const tintClasses = {
    mint: "bg-[var(--color-tint-mint)] text-ocean",
    yellow: "bg-[var(--color-tint-yellow)] text-[#D97706]",
    peach: "bg-[var(--color-tint-peach)] text-coral",
  }[tint];

  const Icon =
    typeLabel.toLowerCase() === "houses"
      ? Home
      : typeLabel.toLowerCase() === "hostels"
      ? Building2
      : Building;

  return (
    <a
      href={contactUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-2xl bg-card p-3.5 shadow-xs ring-1 ring-border/50 transition-all hover:ring-lagoon hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[72px]"
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tintClasses}`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex flex-col">
          <span className="font-heading font-bold text-sm text-charcoal leading-snug group-hover:text-ocean transition-colors">
            {name}
          </span>
          <span className="line-clamp-1 text-xs text-muted-foreground leading-snug">
            {description}
          </span>
          <span className="mt-1 text-[11px] font-semibold text-lagoon uppercase tracking-wider">
            {typeLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center text-charcoal/40 group-hover:text-charcoal transition-colors">
        <span className="sr-only">
          {t("externalLink")} {t("opensInNewTab")}
        </span>
        <ChevronRight className="h-5 w-5" />
      </div>
    </a>
  );
}
