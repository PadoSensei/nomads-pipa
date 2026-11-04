import Link from "next/link";
import { Compass, Sparkles, Heart } from "lucide-react";

export function AppFooter() {
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
                Nomads Pipa
              </span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              The digital companion connecting digital nomads, remote workers,
              and conscious travellers with local businesses and community initiatives
              in Praia da Pipa, RN, Brazil.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 fill-accent-foreground text-accent-foreground inline" />
              <span>for the Pipa community.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Discover
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Explore Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="transition-colors hover:text-foreground"
                >
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="transition-colors hover:text-foreground"
                >
                  Events & Meetups
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="transition-colors hover:text-foreground"
                >
                  Community & Initiatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Partners & Info
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/partner"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  About Nomads Pipa
                </Link>
              </li>
              <li>
                <Link
                  href="/category/essential-services"
                  className="transition-colors hover:text-foreground"
                >
                  Essential Services & Health
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Nomads Pipa. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Praia da Pipa · Tibau do Sul · Rio Grande do Norte · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
