import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Events & Community Calendar",
  description:
    "Discover meetups, surf sessions, workshops, and gatherings happening in Praia da Pipa.",
};

export default function EventsPage() {
  return (
    <PlaceholderPage
      title="Events & Community Calendar"
      description="Answering the essential nomad question: 'If I want to meet people today, where should I go?' Browse official Nomads Pipa meetups, vetted community picks, and local cultural festivals with distinct visual badges."
      icon={CalendarDays}
      badge="Coming Soon · Milestone M1"
      details={[
        {
          label: "Nomads Pipa Meetups",
          description:
            "Official weekly community coworking sessions, welcome dinners, and sunset mixers.",
        },
        {
          label: "Community Picks",
          description:
            "Third-party events where fellow remote workers and community members plan to go.",
        },
        {
          label: "City & Cultural Events",
          description:
            "Pipa festivals, live music schedules, beach cleanups, and local sports matches.",
        },
        {
          label: "WhatsApp RSVP & Direct Links",
          description:
            "Connect directly with event coordinators or join specific meetup group chats.",
        },
      ]}
    />
  );
}
