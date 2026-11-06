import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { BusinessCard, BusinessDetail } from "@/components/directory";
import {
  demoBusinessCafe,
  demoBusinessRestaurant,
  demoBusinessSunsetLounge,
} from "@/lib/content/demo-fixtures";
import type { AbstractIntlMessages } from "next-intl";
import enMessages from "@/messages/en.json";
import ptBRMessages from "@/messages/pt-BR.json";
import esMessages from "@/messages/es.json";

function renderWithLocale(
  ui: React.ReactElement,
  locale: "en" | "pt-BR" | "es",
  messages: AbstractIntlMessages
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("Internationalisation of Directory Content (NP-023)", () => {
  describe("BusinessCard Localized Content", () => {
    it("renders English base content by default", () => {
      renderWithLocale(<BusinessCard business={demoBusinessCafe} />, "en", enMessages);

      expect(screen.getByText("[DEMO] Coastal Nomad Workspace & Cafe")).toBeInTheDocument();
      expect(
        screen.getByText(/Fictional demo workspace offering oceanfront desks/i)
      ).toBeInTheDocument();
      expect(screen.getByText("Cafes")).toBeInTheDocument();
      expect(screen.getByText("Partner")).toBeInTheDocument();
    });

    it("renders Portuguese translations when viewing in pt-BR", () => {
      renderWithLocale(<BusinessCard business={demoBusinessCafe} />, "pt-BR", ptBRMessages);

      expect(screen.getByText("[DEMO] Coastal Nomad Workspace & Café")).toBeInTheDocument();
      expect(
        screen.getByText(/Espaço de coworking e café fictício à beira-mar/i)
      ).toBeInTheDocument();
      expect(screen.getByText("Cafés")).toBeInTheDocument();
      expect(screen.getByText("Parceiro")).toBeInTheDocument();
    });

    it("renders Spanish translations when viewing in es", () => {
      renderWithLocale(<BusinessCard business={demoBusinessCafe} />, "es", esMessages);

      expect(screen.getByText("[DEMO] Coastal Nomad Workspace & Café")).toBeInTheDocument();
      expect(
        screen.getByText(/Espacio de coworking y cafetería frente al mar ficticio/i)
      ).toBeInTheDocument();
      expect(screen.getByText("Cafés")).toBeInTheDocument();
      expect(screen.getByText("Socio")).toBeInTheDocument();
    });

    it("falls back cleanly to English base content when translation is absent", () => {
      // demoBusinessRestaurant does not have pt-BR or es translations in demo-fixtures
      renderWithLocale(
        <BusinessCard business={demoBusinessRestaurant} />,
        "pt-BR",
        ptBRMessages
      );

      expect(
        screen.getByText(demoBusinessRestaurant.name)
      ).toBeInTheDocument();
      expect(
        screen.getByText(demoBusinessRestaurant.description)
      ).toBeInTheDocument();
      // Subcategory should still be localized via messages dictionary
      expect(screen.getByText("Prato Feito (PF)")).toBeInTheDocument();
    });
  });

  describe("BusinessDetail Localized Content & Navigation", () => {
    it("renders English details and back button with category name", () => {
      renderWithLocale(
        <BusinessDetail business={demoBusinessCafe} />,
        "en",
        enMessages
      );

      expect(
        screen.getByRole("heading", {
          name: "[DEMO] Coastal Nomad Workspace & Cafe",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Fictional demo workspace offering oceanfront desks/i)
      ).toBeInTheDocument();

      const backLink = screen.getByRole("link", {
        name: "Back to Food & Drink",
      });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/en/category/food-and-drink");
    });

    it("renders Portuguese details and back button with localized category name in pt-BR", () => {
      renderWithLocale(
        <BusinessDetail business={demoBusinessCafe} />,
        "pt-BR",
        ptBRMessages
      );

      expect(
        screen.getByRole("heading", {
          name: "[DEMO] Coastal Nomad Workspace & Café",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Espaço de coworking e café fictício à beira-mar/i)
      ).toBeInTheDocument();

      const backLink = screen.getByRole("link", {
        name: "Voltar para Comida & Bebida",
      });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/pt-BR/category/food-and-drink");
    });

    it("renders Spanish details and back button with localized category name in es", () => {
      renderWithLocale(
        <BusinessDetail business={demoBusinessSunsetLounge} />,
        "es",
        esMessages
      );

      expect(
        screen.getByRole("heading", {
          name: "[DEMO] Mirante Sunset Lounge & Tapas",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Bar y terraza ficticio en el acantilado con vista a Praia do Amor/i)
      ).toBeInTheDocument();

      const backLink = screen.getByRole("link", {
        name: "Volver a Comida & Bebida",
      });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/es/category/food-and-drink");
    });
  });
});
