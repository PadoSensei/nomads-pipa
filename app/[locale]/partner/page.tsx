import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Become a Partner",
  description:
    "Partner with Nomads Pipa to reach digital nomads and remote workers visiting Praia da Pipa.",
};

export default function PartnerPage() {
  return (
    <PlaceholderPage
      title="Become a Local Partner"
      description="Connect your business directly with remote workers, digital nomads, and visitors staying in Praia da Pipa. Turn discovery into verified footfall, fill off-peak hours with Flash Drops, and participate in community quests."
      icon={Sparkles}
      badge="Partner Portal · Milestone M2"
      details={[
        {
          label: "Measurable Physical Footfall",
          description:
            "Drive real-world customer visits verified through smart QR code scans and quests.",
        },
        {
          label: "Dynamic Flash Drops",
          description:
            "Launch limited-time offers during quiet hours to instantly attract nearby nomads.",
        },
        {
          label: "Verified Business Presence",
          description:
            "Showcase amenities nomads look for: verified Wi-Fi speeds, power outlets, quiet zones, and WhatsApp links.",
        },
        {
          label: "Dedicated Staff Redemption",
          description:
            "A fast, 1-tap mobile scanner for your waitstaff with zero hardware investment.",
        },
      ]}
    />
  );
}
