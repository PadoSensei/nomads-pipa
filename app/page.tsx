import Link from "next/link";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  ArrowRight,
  Compass,
  Sparkles,
  MapPin,
  QrCode,
  Users,
  Wifi,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const discoveryCategories = [
  {
    slug: "food-and-drink",
    title: "Food & Drink",
    icon: UtensilsCrossed,
    tagline: "Cafes, daily meals & sunset views",
    description:
      "Vetted remote-work cafes with fast Wi-Fi and power outlets, wholesome daily meal specials (prato feito), and oceanfront sunset spots.",
    highlightBadge: "Wi-Fi & Plugs",
  },
  {
    slug: "events-and-community",
    title: "Events & Community",
    icon: CalendarDays,
    tagline: "Meetups, surf sessions & gatherings",
    description:
      "Official community meetups, social dinners, surf sessions, and vetted local cultural events with clear organiser labels.",
    highlightBadge: "Meet people today",
  },
  {
    slug: "accommodation",
    title: "Accommodation",
    icon: Home,
    tagline: "Hostels, pousadas & monthly stays",
    description:
      "Nomad-ready living spaces with dedicated desks and fast connectivity. Direct partner enquiry routing for custom quotes and extended stays.",
    highlightBadge: "Direct Quotes",
  },
  {
    slug: "transportation",
    title: "Transportation",
    icon: Bike,
    tagline: "Natal transfers, taxis & rentals",
    description:
      "Convenient 'Get Me a Ride' routing for airport shuttles from Natal, trusted local taxi and moto-taxi drivers, plus scooter and bike rentals.",
    highlightBadge: "Get Me a Ride",
  },
  {
    slug: "sports-and-activities",
    title: "Sports & Activities",
    icon: Waves,
    tagline: "Surf, yoga, boat tours & adventures",
    description:
      "Praia do Madeiro surf lessons, cliffside yoga sessions, dolphin watching in Baía dos Golfinhos, beach tennis, and ecological trails.",
    highlightBadge: "Tide-Aware",
  },
  {
    slug: "essential-services",
    title: "Essential Services",
    icon: ShieldAlert,
    tagline: "Emergency, health, tech repair & Pix",
    description:
      "Critical local information: 24h health clinics, English-friendly doctors, laptop and smartphone repair, laundry, and foreign Pix payment tips.",
    highlightBadge: "Verified & Safe",
  },
];

const platformPillars = [
  {
    icon: Compass,
    title: "Contextual Local Discovery",
    description:
      "Not a generic directory. We curate practical answers for nomads: where to get reliable Wi-Fi, where to find great daily meals, and where to catch the sunset.",
  },
  {
    icon: Users,
    title: "Vibrant Nomad & Local Community",
    description:
      "Connect with fellow remote workers, exchange local tips, join social projects, and support Pipa's environmental initiatives.",
  },
  {
    icon: QrCode,
    title: "The Traffic Router & Perks",
    description:
      "Turn everyday discovery into rewards. Scan partner QR codes during physical visits, unlock community quests, and claim limited-time Flash Drops.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-secondary/60 via-background to-background py-14 sm:py-20 md:py-24">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Location Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3.5 py-1 text-xs font-semibold text-accent-foreground shadow-xs backdrop-blur-xs">
              <Sun className="h-3.5 w-3.5 text-accent-foreground" />
              <span>Praia da Pipa · Rio Grande do Norte · Brazil</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Your Local Companion in{" "}
              <span className="bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
                Praia da Pipa
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              The digital hub connecting digital nomads, remote workers, and
              travellers with curated local recommendations, community events,
              verified workspaces, and local business perks.
            </p>

            {/* Quick Action / Discovery Entry Point */}
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/categories"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full flex-1 rounded-full bg-primary font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
                )}
              >
                <span>Browse All Categories</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/events"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 w-full rounded-full border-border/80 font-medium sm:w-auto"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                <span>Events & Meetups</span>
              </Link>
            </div>

            {/* Quick Highlights Strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-primary" />
                Verified Wi-Fi Cafes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Curated Local Spots
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Community Perks & Quests
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SIX CORE DISCOVERY CATEGORIES (Prominent immediately after Hero) */}
      <section
        id="categories"
        className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20"
      >
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>Explore Pipa</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Main Discovery Areas
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Every major dimension of local life and nomad workflow in Pipa,
              structured for fast, reliable access.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <span>View directory index</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="border border-border/60 text-[11px] font-semibold text-accent-foreground"
                    >
                      {category.highlightBadge}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-accent-foreground">
                    {category.tagline}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-primary pt-2 border-t border-border/40">
                  <span>Explore category</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. CORE PLATFORM PILLARS */}
      <section className="border-y border-border/70 bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
              Why Nomads Pipa
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Built Specifically for Pipa Nomads & Locals
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              A community-driven companion designed to make everyday life and
              remote work in Pipa seamless, social, and connected.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {platformPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <PillarIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed sm:text-sm">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PARTNER CALL TO ACTION */}
      <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-secondary/40 to-muted/50 p-8 shadow-sm sm:p-12 md:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="border border-border/80 px-3 py-1 text-xs font-semibold text-accent-foreground"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 inline" />
              Local Business Ecosystem
            </Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Are you a local business in Praia da Pipa?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base">
              Reach remote workers and international travellers during their stay.
              Drive physical footfall with verified QR codes, fill quiet hours
              with Flash Drops, and become part of curated local quests.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/partner"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-md hover:bg-primary/90 sm:w-auto"
                )}
              >
                <span>Partner With Nomads Pipa</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 w-full rounded-full border-border/80 font-medium sm:w-auto"
                )}
              >
                <span>About the Platform</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
