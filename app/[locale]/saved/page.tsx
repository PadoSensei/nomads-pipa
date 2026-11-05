import { TopBar } from "@/components/layout/TopBar";
import { Link } from "@/i18n/navigation";
import { Bookmark, Compass } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-BR" }, { locale: "es" }];
}

export default async function SavedPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Saved");

  return (
    <div className="min-h-screen bg-sand pb-24">
      <TopBar title={t("title")} backHref="/" showFilter={false} />

      <main className="container mx-auto max-w-md px-4 pt-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-card border border-border/70 shadow-xs mb-4">
          <Bookmark className="h-8 w-8 text-lagoon" />
        </div>

        <h2 className="font-heading font-bold text-xl text-charcoal mb-2">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8 leading-relaxed">
          {t("emptyMessage")}
        </p>

        <Link
          href="/categories"
          className="inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-lagoon"
        >
          <Compass className="h-4 w-4" />
          <span>{t("exploreCta")}</span>
        </Link>
      </main>
    </div>
  );
}
