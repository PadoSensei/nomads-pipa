import { BlogView } from "@/components/discovery/BlogView";
import { setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-BR" }, { locale: "es" }];
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogView />;
}
