import Link from "next/link";
import { type LucideIcon, ArrowLeft, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlaceholderPageProps {
  title: string;
  badge?: string;
  description: string;
  icon: LucideIcon;
  details?: {
    label: string;
    description: string;
  }[];
}

export function PlaceholderPage({
  title,
  badge = "Coming Soon · Milestone M1",
  description,
  icon: Icon,
  details = [],
}: PlaceholderPageProps) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2 text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary shadow-inner">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {title}
                </h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Nomads Pipa Local Discovery Experience
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 border border-border px-3 py-1 text-xs font-semibold text-accent-foreground"
          >
            <Clock className="h-3.5 w-3.5" />
            {badge}
          </Badge>
        </div>

        <div className="mt-6 border-t border-border/60 pt-6">
          <p className="text-base text-foreground/90 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {details.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/60 bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border/60 pt-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-primary text-primary-foreground"
            )}
          >
            Explore Pipa
          </Link>
          <Link
            href="/categories"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full"
            )}
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
