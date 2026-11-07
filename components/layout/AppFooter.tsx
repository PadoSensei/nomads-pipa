import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Compass, Sparkles, Heart } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

export async function AppFooter() {
  const t = await getTranslations("Footer");
  const tCommon = await getTranslations("Common");

  return (
    <footer className="border-t border-border/80 bg-muted/40 py-10 md:py-14">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                {tCommon("brandName")}
              </span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {t("tagline")}
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{t("communityLove")}</span>
              <Heart className="h-3.5 w-3.5 fill-accent-foreground text-accent-foreground inline" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("discoverHeading")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  {t("exploreHub")}
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="transition-colors hover:text-foreground"
                >
                  {t("allCategories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="transition-colors hover:text-foreground"
                >
                  {t("eventsMeetups")}
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="transition-colors hover:text-foreground"
                >
                  {t("communityInitiatives")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("partnersHeading")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/partner"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
                  {t("becomePartner")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  {t("aboutNomadsPipa")}
                </Link>
              </li>
              <li>
                <Link
                  href="/essential-services"
                  className="transition-colors hover:text-foreground"
                >
                  {t("essentialServices")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Secondary Language Switcher in Footer */}
        <div className="mt-8 border-t border-border/60 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Suspense
            fallback={
              <div className="h-7 w-20 rounded-full bg-muted/40 animate-pulse" />
            }
          >
            <LanguageSelector variant="footer" />
          </Suspense>
        </div>

        <div className="mt-4 border-t border-border/40 pt-4 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>{tCommon("copyright")}</p>
          <p className="text-center sm:text-right">
            {tCommon("locationFootnote")}
          </p>
        </div>
      </div>
    </footer>
  );
}
