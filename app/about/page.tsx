import type { Metadata } from "next";
import { Users, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nomads Pipa, our mission, and the team behind the local companion app for Praia da Pipa.",
};

const founders = [
  {
    name: "Maria",
    role: "Community & Local Partnerships",
    bio: "Long-time resident of Pipa passionate about connecting travelers with authentic local businesses, cultural initiatives, and social impact projects.",
  },
  {
    name: "Lua",
    role: "Experience & Nomad Operations",
    bio: "Digital nomad advocate focusing on workspace curation, community gatherings, wellness routines, and welcoming newcomers to the village.",
  },
  {
    name: "João",
    role: "Product & Technology",
    bio: "Software engineer and remote worker building sustainable digital infrastructure and the Traffic Router to support local business growth.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Badge
          variant="secondary"
          className="border border-border/80 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
        >
          <Compass className="mr-1 h-3 w-3 inline" />
          Our Story
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Nomads Pipa
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Nomads Pipa was created to bridge the gap between visiting remote
          workers and the local community in Praia da Pipa, Rio Grande do Norte,
          Brazil.
        </p>
      </div>

      {/* Vision Card */}
      <div className="mb-10 rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
        <h2 className="text-xl font-bold text-foreground">Our Mission</h2>
        <p className="mt-3 text-sm text-foreground/80 leading-relaxed sm:text-base">
          Instead of relying on fragmented, out-of-date WhatsApp messages and
          generic map listings, Nomads Pipa provides a curated, mobile-first
          companion. We help visitors find reliable places to work, stay, eat,
          and socialize while creating measurable footfall and repeat customers
          for authentic local businesses through our Traffic Router and loyalty
          system.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Vetted & Authentic
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Carefully verified workspaces, Wi-Fi speeds, and local suggestions.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Community First
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Encouraging meaningful connections, meetups, and local give-back initiatives.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Local Economic Impact
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Directly supporting local merchants with measurable footfall and promotions.
            </p>
          </div>
        </div>
      </div>

      {/* Founders Section (Referenced in PRD & MVP Scope) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Meet the Founders
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary font-bold text-lg">
                {founder.name[0]}
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {founder.name}
              </h3>
              <p className="text-xs font-medium text-accent-foreground">
                {founder.role}
              </p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed flex-1">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
