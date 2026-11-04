import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore all primary discovery categories in Praia da Pipa — from food and workspaces to activities and essential services.",
};

const categories = [
  {
    slug: "food-and-drink",
    title: "Food & Drink",
    icon: UtensilsCrossed,
    description:
      "Remote-work cafes, daily meals (PF), sunset spots, vegan choices, and local nightlife.",
    highlight: "Cafes with Wi-Fi & plugs",
  },
  {
    slug: "events-and-community",
    title: "Events & Community",
    icon: CalendarDays,
    description:
      "Nomad meetups, surf sessions, workshops, social gatherings, and local live music.",
    highlight: "Weekly meetups & gatherings",
  },
  {
    slug: "accommodation",
    title: "Accommodation",
    icon: Home,
    description:
      "Nomad-friendly pousadas, apartments, monthly rentals, and coliving options in Pipa.",
    highlight: "Partner quotes & long stays",
  },
  {
    slug: "transportation",
    title: "Transportation",
    icon: Bike,
    description:
      "Airport transfers from Natal, local taxis, moto-taxis, rentals, and regional bus schedules.",
    highlight: "Get Me a Ride routing",
  },
  {
    slug: "sports-and-activities",
    title: "Sports & Activities",
    icon: Waves,
    description:
      "Surf lessons, surfboard rentals, beach tennis, yoga, boat tours, and coastal treks.",
    highlight: "Local tide-aware adventures",
  },
  {
    slug: "essential-services",
    title: "Essential Services",
    icon: ShieldAlert,
    description:
      "Emergency numbers, healthcare clinics, pharmacies, laptop repair, laundry, and foreigner Pix guidance.",
    highlight: "Critical local info & safety",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
          >
            <Layers className="mr-1 h-3 w-3 inline" />
            Directory Index
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            All 6 Core Categories
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Discovery Categories
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Find exactly what you need in Praia da Pipa. Navigate every major
          dimension of nomad and local life through curated, verified areas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:bg-muted/30 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-[11px] font-normal">
                    {cat.highlight}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                  {cat.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>View listings & info</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
