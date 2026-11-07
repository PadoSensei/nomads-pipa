import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { EssentialServiceCard } from "@/components/services/EssentialServiceCard";
import {
  demoEssentialServiceClinic24h,
  demoEssentialServiceDoctor,
  demoEssentialServiceTechRepair,
  demoEssentialServicePixGuidance,
  demoEssentialServiceLaundry,
  type EssentialServiceListing,
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

describe("EssentialServiceCard & Directory (NP-024)", () => {
  it("renders 24/7 emergency service with urgent tel: link and 24/7 badge", () => {
    renderWithIntl(
      <EssentialServiceCard
        service={demoEssentialServiceClinic24h}
        isEmergencyHighlight
      />
    );

    expect(
      screen.getByText(demoEssentialServiceClinic24h.name)
    ).toBeInTheDocument();
    expect(screen.getByText("24/7 Available")).toBeInTheDocument();
    expect(screen.getByText("Emergency / 24h")).toBeInTheDocument();

    const callLink = screen.getByRole("link", {
      name: (accessibleName) =>
        accessibleName.includes("Call Now") &&
        accessibleName.includes(demoEssentialServiceClinic24h.name),
    });
    expect(callLink).toBeInTheDocument();
    expect(callLink.getAttribute("href")).toMatch(/^tel:\+?192|^tel:\+?5584900000192/);
  });

  it("renders WhatsApp contact with wa.me/ link and accessible label", () => {
    renderWithIntl(
      <EssentialServiceCard service={demoEssentialServicePixGuidance} />
    );

    const waLink = screen.getByRole("link", {
      name: (accessibleName) =>
        accessibleName.includes("WhatsApp Contact") &&
        accessibleName.includes(demoEssentialServicePixGuidance.name),
    });
    expect(waLink).toBeInTheDocument();
    expect(waLink).toHaveAttribute("href", "https://wa.me/5584900000055");
    expect(waLink).toHaveAttribute("target", "_blank");
  });

  it("renders tech repair and laundry services correctly with subcategory badges", () => {
    const { unmount: unmount1 } = renderWithIntl(
      <EssentialServiceCard service={demoEssentialServiceTechRepair} />
    );
    expect(screen.getByText("Tech & Repairs")).toBeInTheDocument();
    unmount1();

    renderWithIntl(
      <EssentialServiceCard service={demoEssentialServiceLaundry} />
    );
    expect(screen.getByText("Laundry")).toBeInTheDocument();
  });

  it("gracefully omits action buttons when phone or whatsapp contact is missing", () => {
    const serviceWithoutContacts: EssentialServiceListing = {
      ...demoEssentialServiceDoctor,
      contact: {},
      emergencyPhone: undefined,
    };

    renderWithIntl(
      <EssentialServiceCard service={serviceWithoutContacts} />
    );

    expect(
      screen.queryByRole("link", { name: /Call/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /WhatsApp/i })
    ).not.toBeInTheDocument();
  });

  it("renders in Portuguese and Spanish with translated content", () => {
    const { unmount } = renderWithIntl(
      <EssentialServiceCard service={demoEssentialServiceClinic24h} />,
      "pt-BR"
    );
    expect(
      screen.getByText(/Posto de Primeiros Socorros e Triagem 24h Pipa/)
    ).toBeInTheDocument();
    expect(screen.getByText("Atendimento 24h")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ligar/i })).toBeInTheDocument();
    unmount();

    renderWithIntl(
      <EssentialServiceCard service={demoEssentialServiceClinic24h} />,
      "es"
    );
    expect(
      screen.getByText(/Centro de Primeros Auxilios y Urgencias 24h Pipa/)
    ).toBeInTheDocument();
    expect(screen.getByText("Atención 24h")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Llamar/i })).toBeInTheDocument();
  });
});
