import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface MediaListRowProps {
  id: string;
  slug: string;
  title: string;
  categoryLabel: string;
  readMinutes: number;
  imageUrl: string;
}

export function MediaListRow({
  slug,
  title,
  categoryLabel,
  readMinutes,
  imageUrl,
}: MediaListRowProps) {
  const t = useTranslations("Blog");

  return (
    <Link
      href={`/blog#${slug}`}
      className="group flex items-center justify-between rounded-2xl bg-card p-3 shadow-xs ring-1 ring-border/50 transition-all hover:ring-lagoon hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-lagoon min-h-[84px]"
    >
      <div className="flex items-center gap-3.5">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-heading font-bold text-sm text-charcoal leading-snug group-hover:text-ocean transition-colors">
            {title}
          </span>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-lagoon shrink-0" />
            <span>
              {t("readTime", { minutes: readMinutes })} · {categoryLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center text-charcoal/40 group-hover:text-charcoal transition-colors">
        <ChevronRight className="h-5 w-5" />
      </div>
    </Link>
  );
}
