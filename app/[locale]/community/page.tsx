import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Community & Give Back",
  description:
    "Connect with fellow remote workers, join local WhatsApp groups, and participate in social initiatives in Pipa.",
};

export default function CommunityPage() {
  return (
    <PlaceholderPage
      title="Community & Give Back"
      description="Connect with fellow digital nomads, local residents, and environmental projects in Praia da Pipa. Join interest-based WhatsApp groups and discover ways to contribute positively to the local village."
      icon={Users}
      badge="Coming Soon · Milestone M1"
      details={[
        {
          label: "WhatsApp Groups Directory",
          description:
            "Curated entry points for co-working, surfing, padel, housing, and social gatherings.",
        },
        {
          label: "Give Back & NGO Initiatives",
          description:
            "Support local turtle preservation (Projeto Tamar), beach cleanup days, and animal rescue.",
        },
        {
          label: "Nomad Networks Across Brazil",
          description:
            "Exchange tips with partner nomad communities in Florianópolis, Jericoacoara, and Rio.",
        },
        {
          label: "Community Recommendations",
          description:
            "Peer-vetted suggestions submitted and verified by experienced local residents.",
        },
      ]}
    />
  );
}
