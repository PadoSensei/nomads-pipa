import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { EventCard, formatWhatsAppUrl } from "@/components/events/EventCard";
import {
  demoOfficialMeetupEvent,
  demoCommunityPickEvent,
  demoCityEvent,
  type EventListing,
} from "@/lib/content";
import messagesEn from "@/messages/en.json";
import messagesPtBr from "@/messages/pt-BR.json";
import messagesEs from "@/messages/es.json";

function renderWithIntl(
  ui: React.ReactElement,
  locale: "en" | "pt-BR" | "es" = "en"
) {
  const messages =
    locale === "en"
      ? messagesEn
      : locale === "pt-BR"
      ? messagesPtBr
      : messagesEs;

  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("EventCard & Events Calendar (NP-024)", () => {
  it("renders event title, location, and description correctly", () => {
    renderWithIntl(<EventCard event={demoOfficialMeetupEvent} />);

    expect(screen.getByText(demoOfficialMeetupEvent.title)).toBeInTheDocument();
    expect(
      screen.getByText(demoOfficialMeetupEvent.locationName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(demoOfficialMeetupEvent.description)
    ).toBeInTheDocument();
  });

  it("renders distinct endorsement badges with localized labels and icons", () => {
    // Official Meetup
    const { unmount: unmount1 } = renderWithIntl(
      <EventCard event={demoOfficialMeetupEvent} />
    );
    expect(screen.getByText("Nomads Pipa Meet-up")).toBeInTheDocument();
    unmount1();

    // Community Pick
    const { unmount: unmount2 } = renderWithIntl(
      <EventCard event={demoCommunityPickEvent} />
    );
    expect(screen.getByText("Community Pick")).toBeInTheDocument();
    unmount2();

    // City Event
    const { unmount: unmount3 } = renderWithIntl(
      <EventCard event={demoCityEvent} />
    );
    expect(screen.getByText("City Event")).toBeInTheDocument();
    unmount3();
  });

  it("formats dates and times using the America/Fortaleza timezone (UTC-3)", () => {
    // demoOfficialMeetupEvent starts at "2025-10-17T17:00:00-03:00" and ends at "2025-10-17T20:00:00-03:00"
    renderWithIntl(<EventCard event={demoOfficialMeetupEvent} />, "en");

    expect(screen.getByText(/17:00 – 20:00/)).toBeInTheDocument();
  });

  it("formats WhatsApp URL cleanly without injected hardcoded messages", () => {
    expect(formatWhatsAppUrl("+55 84 99999-0010")).toBe(
      "https://wa.me/5584999990010"
    );
    expect(formatWhatsAppUrl("https://wa.me/123456")).toBe(
      "https://wa.me/123456"
    );
    expect(formatWhatsAppUrl(undefined)).toBeUndefined();
  });

  it("renders WhatsApp RSVP action CTA with accessible label when WhatsApp contact exists", () => {
    renderWithIntl(<EventCard event={demoOfficialMeetupEvent} />);

    const rsvpLink = screen.getByRole("link", {
      name: (accessibleName) =>
        accessibleName.includes("RSVP / Join Event") &&
        accessibleName.includes(demoOfficialMeetupEvent.title),
    });
    expect(rsvpLink).toBeInTheDocument();
    expect(rsvpLink).toHaveAttribute("href", "https://wa.me/5584999990010");
    expect(rsvpLink).toHaveAttribute("target", "_blank");
    expect(rsvpLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("handles missing WhatsApp contact gracefully without producing broken CTA", () => {
    const eventWithoutWa: EventListing = {
      ...demoCityEvent,
      contact: undefined,
    };

    renderWithIntl(<EventCard event={eventWithoutWa} />);

    expect(
      screen.queryByRole("link", { name: /RSVP/i })
    ).not.toBeInTheDocument();
  });

  it("supports multilingual rendering in pt-BR and es", () => {
    const { unmount } = renderWithIntl(
      <EventCard event={demoOfficialMeetupEvent} />,
      "pt-BR"
    );
    expect(screen.getByText("Encontro Nomads Pipa")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Confirmar Presença/i })
    ).toBeInTheDocument();
    unmount();

    renderWithIntl(<EventCard event={demoOfficialMeetupEvent} />, "es");
    expect(screen.getByText("Encuentro Nomads Pipa")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Confirmar Asistencia/i })
    ).toBeInTheDocument();
  });
});
