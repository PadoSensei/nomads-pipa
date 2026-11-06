import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentService } from "@/lib/content";
import { BusinessDetail } from "@/components/directory";

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await contentService.getBusinessBySlug(slug);

  if (!business) {
    return {
      title: "Business Not Found",
    };
  }

  return {
    title: `${business.name} — Nomads Pipa`,
    description: business.description,
    openGraph: {
      title: `${business.name} — Nomads Pipa`,
      description: business.description,
      images: business.coverImageUrl ? [business.coverImageUrl] : undefined,
    },
  };
}

async function BusinessDetailContent({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await contentService.getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return <BusinessDetail business={business} />;
}

export default function BusinessDetailPage({ params }: BusinessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="h-8 w-32 rounded-xl bg-muted/40 animate-pulse mb-6" />
          <div className="aspect-video w-full rounded-3xl bg-muted/40 animate-pulse mb-8" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 rounded-xl bg-muted/40 animate-pulse" />
            <div className="h-6 w-1/3 rounded-xl bg-muted/40 animate-pulse" />
            <div className="h-24 w-full rounded-2xl bg-muted/40 animate-pulse" />
          </div>
        </div>
      }
    >
      <BusinessDetailContent params={params} />
    </Suspense>
  );
}
