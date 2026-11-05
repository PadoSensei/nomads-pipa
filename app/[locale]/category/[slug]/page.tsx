import { Suspense } from "react";
import type { Metadata } from "next";
import {
  UtensilsCrossed,
  CalendarDays,
  Home,
  Bike,
  Waves,
  ShieldAlert,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

interface CategoryMeta {
  title: string;
  description: string;
  icon: LucideIcon;
  details: { label: string; description: string }[];
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  "food-and-drink": {
    title: "Food & Drink",
    description:
      "Curated local dining and cafes in Praia da Pipa. Filter by remote-work friendly cafes with verified Wi-Fi, daily meal specials (prato feito), sunset views, and live music.",
    icon: UtensilsCrossed,
    details: [
      {
        label: "Remote-Work Cafes",
        description:
          "Verified power outlets, high-speed Wi-Fi, and laptop-friendly seating.",
      },
      {
        label: "Daily Meals & Marmitas",
        description:
          "Wholesome, budget-conscious local lunches and meal preps.",
      },
      {
        label: "Sunset & Nightlife",
        description:
          "Best cliffside viewpoints, craft cocktails, and evening vibes.",
      },
      {
        label: "Dietary Friendly",
        description:
          "Vegan, vegetarian, and gluten-conscious options in the village.",
      },
    ],
  },
  "events-and-community": {
    title: "Events & Community",
    icon: CalendarDays,
    description:
      "Stay connected with what is happening in Pipa. Discover official Nomads Pipa meetups, community-vetted gatherings, workshops, and local cultural festivals.",
    details: [
      {
        label: "Nomads Pipa Meetups",
        description:
          "Official weekly co-working lunches, sunset drinks, and mixers.",
      },
      {
        label: "Community Picks",
        description:
          "Third-party events where local community members have confirmed attendance.",
      },
      {
        label: "Cultural & City Events",
        description:
          "Live samba, forró nights, beach cleanups, and local celebrations.",
      },
    ],
  },
  accommodation: {
    title: "Accommodation",
    icon: Home,
    description:
      "Find vetted places to stay in Pipa for days, weeks, or months. Direct partner enquiry workflow connecting you with trusted hostels, pousadas, and private rentals.",
    details: [
      {
        label: "Direct Partner Enquiries",
        description:
          "Receive fast, personalized quotes directly from local accommodation partners.",
      },
      {
        label: "Nomad-Ready Living",
        description:
          "Spaces with verified desks, reliable internet, and peaceful environments.",
      },
      {
        label: "Monthly & Long-Term",
        description:
          "Discounts and terms tailored for extended seasonal stays.",
      },
    ],
  },
  transportation: {
    title: "Transportation",
    icon: Bike,
    description:
      "Navigate Pipa and Rio Grande do Norte with ease. Simple 'Get Me a Ride' routing for airport shuttles from Natal, local taxis, moto-taxis, and rental vehicles.",
    details: [
      {
        label: "Airport Transfers",
        description:
          "Reliable airport pickup and drop-off between Natal (NAT) and Pipa.",
      },
      {
        label: "Local Rides",
        description:
          "Direct WhatsApp links to vetted local taxi and moto-taxi drivers.",
      },
      {
        label: "Rentals & Micro-Mobility",
        description:
          "Car, motorbike, and bicycle rentals to explore surrounding beaches.",
      },
    ],
  },
  "sports-and-activities": {
    title: "Sports & Activities",
    icon: Waves,
    description:
      "Make the most of Pipa's unique nature and coastline. Find surf schools, board rentals, yoga studios, dolphin tours, boat trips, and beach fitness sessions.",
    details: [
      {
        label: "Surf & Water Sports",
        description:
          "Lessons at Praia do Madeiro, board rentals, and tide-dependent guidance.",
      },
      {
        label: "Wellness & Yoga",
        description:
          "Oceanfront yoga sessions, sound baths, and cliffside studios.",
      },
      {
        label: "Tours & Nature",
        description:
          "Dolphin watching in Baía dos Golfinhos, buggy tours, and ecological sanctuaries.",
      },
    ],
  },
  "essential-services": {
    title: "Essential Services",
    icon: ShieldAlert,
    description:
      "Reliable and verified local essentials. Fast access to emergency numbers, local medical clinics, pharmacies, laptop repair, laundry, and foreign traveler Pix guidance.",
    details: [
      {
        label: "Emergency & Medical",
        description:
          "24h emergency contacts, clinics (UBS), and English-speaking doctors.",
      },
      {
        label: "Tech & Work Support",
        description:
          "Hardware repairs, smartphone fixes, and courier/DHL drop-offs.",
      },
      {
        label: "Everyday Logistics",
        description:
          "Wash & fold laundry services, foreign exchange, and Pix guidance.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: "food-and-drink" },
    { slug: "events-and-community" },
    { slug: "accommodation" },
    { slug: "transportation" },
    { slug: "sports-and-activities" },
    { slug: "essential-services" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    return {
      title: "Category",
    };
  }

  return {
    title: `${category.title} — Nomads Pipa`,
    description: category.description,
  };
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "accommodation") {
    const { AccommodationDirectoryView } = await import(
      "@/components/discovery/AccommodationDirectoryView"
    );
    return <AccommodationDirectoryView />;
  }

  const category = CATEGORY_MAP[slug];

  if (!category) {
    return (
      <PlaceholderPage
        title="Category Directory"
        description="This category listing will be populated with curated and verified local partners in the upcoming milestone."
        icon={HelpCircle}
      />
    );
  }

  return (
    <PlaceholderPage
      title={category.title}
      description={category.description}
      icon={category.icon}
      badge="Discovery Category · Milestone M1"
      details={category.details}
    />
  );
}

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
