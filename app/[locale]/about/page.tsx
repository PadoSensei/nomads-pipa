import type { Metadata } from "next";
import { Users, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  const founders = [
    {
      name: t("founderMariaName"),
      role: t("founderMariaRole"),
      bio: t("founderMariaBio"),
    },
    {
      name: t("founderLuaName"),
      role: t("founderLuaRole"),
      bio: t("founderLuaBio"),
    },
    {
      name: t("founderJoaoName"),
      role: t("founderJoaoRole"),
      bio: t("founderJoaoBio"),
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Badge
          variant="secondary"
          className="border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
        >
          <Compass className="mr-1 h-3 w-3 inline" />
          {t("badge")}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          {t("heroDescription")}
        </p>
      </div>

      {/* Vision Card */}
      <div className="mb-10 rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
        <h2 className="text-xl font-bold text-foreground">{t("missionTitle")}</h2>
        <p className="mt-3 text-sm text-foreground/80 leading-relaxed sm:text-base">
          {t("missionDescription")}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("vettedTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("vettedDesc")}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("communityTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("communityDesc")}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("impactTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("impactDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("foundersTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary font-bold text-lg">
                {founder.name[0]}
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {founder.name}
              </h3>
              <p className="text-xs font-medium text-accent-foreground">
                {founder.role}
              </p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed flex-1">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
