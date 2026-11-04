import { Suspense } from "react";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeaderNavLinks } from "./HeaderNavLinks";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-xl transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
            <Compass className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45 motion-reduce:transform-none motion-reduce:transition-none" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Nomads Pipa
            </span>
            <span className="hidden text-[10px] font-medium tracking-wide uppercase text-accent-foreground/90 sm:inline-block">
              Praia da Pipa · RN
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <Suspense
          fallback={
            <div className="hidden h-8 w-80 rounded-full bg-muted/40 md:block animate-pulse" />
          }
        >
          <HeaderNavLinks />
        </Suspense>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/partner"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-primary px-3.5 font-medium text-primary-foreground shadow-sm hover:bg-primary/90 text-xs sm:text-sm sm:px-4"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-foreground hidden xs:inline mr-1.5" />
            <span>Become a Partner</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
