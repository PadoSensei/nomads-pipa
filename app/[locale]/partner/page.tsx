import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partner" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partner" });

  return (
    <PlaceholderPage
      title={t("heroTitle")}
      description={t("heroDescription")}
      icon={Sparkles}
      badge={t("portalBadge")}
      details={[
        {
          label: t("feature1Title"),
          description: t("feature1Desc"),
        },
        {
          label: t("feature2Title"),
          description: t("feature2Desc"),
        },
        {
          label: t("feature3Title"),
          description: t("feature3Desc"),
        },
        {
          label: t("feature4Title"),
          description: t("feature4Desc"),
        },
      ]}
    />
  );
}
