import { Suspense } from "react";
import type { Metadata } from "next";
import {
  ShieldAlert,
  Stethoscope,
  Wrench,
  CreditCard,
  Shirt,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { contentService } from "@/lib/content";
import { EssentialServiceCard } from "@/components/services";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EssentialServices" });

  return {
    title: `${t("title")} — Nomads Pipa`,
    description: t("subtitle"),
  };
}

interface EssentialServicesPageProps {
  params: Promise<{ locale: AppLocale }>;
}

async function EssentialServicesContent() {
  const services = await contentService.getEssentialServices();
  const t = await getTranslations("EssentialServices");

  // Group into hierarchy:
  // 1. Emergency Contacts & 24/7 (isEmergency === true or subcategory === "emergency")
  // 2. Healthcare (healthcare, dental, veterinary)
  // 3. Repairs & Tech (repairs)
  // 4. Payments & Pix (payments)
  // 5. Laundry & Daily Utility (laundry, couriers, beauty-wellness, immigration, others)

  const emergencyServices = services.filter((s) => s.isEmergency || s.essentialSubcategory === "emergency");
  const healthcareServices = services.filter(
    (s) =>
      !s.isEmergency &&
      (s.essentialSubcategory === "healthcare" ||
        s.essentialSubcategory === "dental" ||
        s.essentialSubcategory === "veterinary")
  );
  const repairServices = services.filter(
    (s) => !s.isEmergency && s.essentialSubcategory === "repairs"
  );
  const paymentServices = services.filter(
    (s) => !s.isEmergency && s.essentialSubcategory === "payments"
  );
  const utilityServices = services.filter(
    (s) =>
      !s.isEmergency &&
      s.essentialSubcategory !== "healthcare" &&
      s.essentialSubcategory !== "dental" &&
      s.essentialSubcategory !== "veterinary" &&
      s.essentialSubcategory !== "repairs" &&
      s.essentialSubcategory !== "payments"
  );

  return (
    <div className="space-y-12">
      {/* 1. Emergency & 24/7 Section */}
      {emergencyServices.length > 0 && (
        <section aria-labelledby="section-emergency" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-red-200/80 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="section-emergency" className="text-xl font-bold tracking-tight text-foreground">
                {t("sections.emergencyTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("sections.emergencySubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyServices.map((service) => (
              <EssentialServiceCard
                key={service.id}
                service={service}
                isEmergencyHighlight
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. Healthcare Section */}
      {healthcareServices.length > 0 && (
        <section aria-labelledby="section-healthcare" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/80 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="section-healthcare" className="text-xl font-bold tracking-tight text-foreground">
                {t("sections.healthcareTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("sections.healthcareSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {healthcareServices.map((service) => (
              <EssentialServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Repairs & Tech Section */}
      {repairServices.length > 0 && (
        <section aria-labelledby="section-repairs" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/80 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
              <Wrench className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="section-repairs" className="text-xl font-bold tracking-tight text-foreground">
                {t("sections.repairsTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("sections.repairsSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repairServices.map((service) => (
              <EssentialServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Payments & Pix Section */}
      {paymentServices.length > 0 && (
        <section aria-labelledby="section-payments" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/80 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
              <CreditCard className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="section-payments" className="text-xl font-bold tracking-tight text-foreground">
                {t("sections.paymentsTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("sections.paymentsSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paymentServices.map((service) => (
              <EssentialServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Laundry & Daily Utility Section */}
      {utilityServices.length > 0 && (
        <section aria-labelledby="section-utility" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/80 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
              <Shirt className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="section-utility" className="text-xl font-bold tracking-tight text-foreground">
                {t("sections.utilityTitle")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("sections.utilitySubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {utilityServices.map((service) => (
              <EssentialServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {services.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 px-6 py-16 text-center shadow-2xs">
          <p className="text-sm text-muted-foreground">
            {t("noServicesFound")}
          </p>
        </div>
      )}
    </div>
  );
}

export default async function EssentialServicesPage({
  params,
}: EssentialServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EssentialServices" });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="destructive"
            className="border border-red-300 px-2.5 py-0.5 text-xs font-semibold"
          >
            <ShieldAlert className="mr-1 h-3 w-3 inline" aria-hidden="true" />
            {t("badge")}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {t("verifiedPipaContacts")}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Demo Data Disclaimer Banner */}
      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-200">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-semibold">{t("demoNoticeTitle")}</p>
          <p className="text-amber-900/90 dark:text-amber-300/90 leading-relaxed">
            {t("demoNoticeDescription")}
          </p>
        </div>
      </div>

      {/* Structured Services Content */}
      <Suspense
        fallback={
          <div className="space-y-8">
            <div className="h-40 rounded-2xl bg-muted/40 animate-pulse" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
              <div className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
              <div className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
            </div>
          </div>
        }
      >
        <EssentialServicesContent />
      </Suspense>
    </div>
  );
}
