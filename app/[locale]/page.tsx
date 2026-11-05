import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
  QrCode,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { SearchPill } from "@/components/ui/SearchPill";
import { QuickActionTile } from "@/components/ui/QuickActionTile";
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

export default async function HomePage() {
  const tHero = await getTranslations("HomeHero");
  const tActions = await getTranslations("QuickActions");

  return (
    <div className="flex flex-col bg-sand">
      {/* 1. HERO SECTION (Target 4.1 from client mockup) */}
      <section className="relative w-full h-[60vh] min-h-[460px] max-h-[580px] overflow-hidden">
        {/* Full-bleed hero background photo */}
        <Image
          src="/images/pipa-hero.webp"
          alt="Praia da Pipa Cliffs and Beach"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark gradient scrim at the bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

        {/* Top Header Chrome inside Hero */}
        <HeroHeader />

        {/* Hero Bottom Content */}
        <div className="absolute bottom-6 left-0 right-0 z-10 px-5 max-w-md mx-auto sm:max-w-2xl sm:px-8">
          {/* Headline in Heavy Italic Sans */}
          <h1 className="font-heading font-black italic tracking-tight text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05] drop-shadow-sm whitespace-pre-line">
            {tHero("headline")}
          </h1>

          <p className="mt-2 text-xs sm:text-sm font-semibold text-white/90 drop-shadow-xs max-w-xs sm:max-w-md">
            {tHero("subline")}
          </p>
        </div>
      </section>

      {/* 2. SEARCH PILL (Overlaps the hero bottom edge) */}
      <div className="relative -mt-6 z-20 px-4 max-w-md mx-auto w-full sm:max-w-lg">
        <SearchPill href="/categories" />
      </div>

      {/* 3. 2x2 QUICK ACTION TILES */}
      <section className="px-4 pt-6 max-w-md mx-auto w-full sm:max-w-lg">
        <div className="grid grid-cols-2 gap-3.5">
          <QuickActionTile
            title={tActions("stay")}
            subtitle={tActions("staySub")}
            icon={Home}
            href="/category/accommodation"
            tint="mint"
          />
          <QuickActionTile
            title={tActions("transport")}
            subtitle={tActions("transportSub")}
            icon={Bike}
            href="/category/transportation"
            tint="aqua"
          />
          <QuickActionTile
            title={tActions("events")}
            subtitle={tActions("eventsSub")}
            icon={CalendarDays}
            href="/events"
            tint="peach"
          />
          <QuickActionTile
            title={tActions("food")}
            subtitle={tActions("foodSub")}
            icon={UtensilsCrossed}
            href="/category/food-and-drink"
            tint="yellow"
          />
        </div>
      </section>

      {/* 4. PRESERVED RESTYLED CONTENT BELOW THE FOLD */}
      <section className="container mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-lagoon">
              Explore Pipa
            </span>
            <h2 className="font-heading font-bold text-2xl text-charcoal sm:text-3xl">
              Main Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-card p-5 shadow-xs ring-1 ring-border/60 transition-all hover:ring-lagoon hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist/60 text-ocean group-hover:bg-ocean group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] text-lagoon border-lagoon/40">
                      {cat.highlightBadge}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-heading font-bold text-base text-charcoal group-hover:text-ocean transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-ocean pt-2 border-t border-border/40">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. WHY NOMADS PIPA PILLARS */}
      <section className="border-t border-border/60 bg-card/60 py-12">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-lagoon">
              Why Nomads Pipa
            </span>
            <h2 className="mt-1 font-heading font-bold text-2xl text-charcoal">
              Built for Nomads & Locals
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {platformPillars.map((p, i) => {
              const PIcon = p.icon;
              return (
                <div key={i} className="rounded-2xl bg-card p-5 shadow-xs ring-1 ring-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-tint-mint)] text-ocean mb-3">
                    <PIcon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PARTNER CTA */}
      <section className="container mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border/60 text-center max-w-2xl mx-auto">
          <Badge className="bg-coral text-white font-medium mb-3">
            <Sparkles className="mr-1 h-3.5 w-3.5 inline" /> Local Partner Ecosystem
          </Badge>
          <h2 className="font-heading font-bold text-2xl text-charcoal sm:text-3xl">
            Are you a local business in Praia da Pipa?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Reach remote workers and international travellers during their stay. Join our curated community directory.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/partner"
              className={cn(
                buttonVariants({ size: "default" }),
                "rounded-full bg-ocean px-6 font-semibold text-white shadow-sm hover:bg-ocean/90"
              )}
            >
              <span>Partner With Nomads Pipa</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "rounded-full border-border/80 text-charcoal"
              )}
            >
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
