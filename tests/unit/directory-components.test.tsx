import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import {
  BusinessCard,
  BusinessDetail,
  CategoryHeader,
  ContextualFilterBar,
} from "@/components/directory";
import {
  demoBusinessCafe,
  demoBusinessRestaurant,
} from "@/lib/content/demo-fixtures";
import messages from "@/messages/en.json";
import { Utensils } from "lucide-react";

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("Directory Components", () => {
  describe("BusinessCard", () => {
    it("renders business name, category badge, and address", () => {
      renderWithIntl(<BusinessCard business={demoBusinessCafe} />);

      expect(screen.getByText(demoBusinessCafe.name)).toBeInTheDocument();
      expect(screen.getByText("Cafes")).toBeInTheDocument();
      expect(screen.getByText(demoBusinessCafe.address!)).toBeInTheDocument();
    });

    it("displays verified Wi-Fi speed and amenity badges", () => {
      renderWithIntl(<BusinessCard business={demoBusinessCafe} />);

      expect(screen.getByText("250 Mbps")).toBeInTheDocument();
      expect(screen.getByText("Power Outlets")).toBeInTheDocument();
      expect(screen.getByText("Quiet Space")).toBeInTheDocument();
      expect(screen.getByText("Pet Friendly")).toBeInTheDocument();
    });

    it("renders partner badge for approved partner venues", () => {
      renderWithIntl(<BusinessCard business={demoBusinessCafe} />);
      expect(screen.getByText("Partner")).toBeInTheDocument();
    });

    it("does not render partner badge for non-partner listings", () => {
      renderWithIntl(<BusinessCard business={demoBusinessRestaurant} />);
      expect(screen.queryByText("Partner")).not.toBeInTheDocument();
    });
  });

  describe("BusinessDetail", () => {
    it("renders comprehensive business information, description, and external CTAs", () => {
      renderWithIntl(<BusinessDetail business={demoBusinessCafe} />);

      expect(screen.getByRole("heading", { name: demoBusinessCafe.name })).toBeInTheDocument();
      expect(screen.getByText(demoBusinessCafe.description)).toBeInTheDocument();
      expect(screen.getByText("Opening Hours")).toBeInTheDocument();

      // Check external action links
      const whatsappLink = screen.getByLabelText(/WhatsApp Enquiries/i);
      expect(whatsappLink).toHaveAttribute("href", expect.stringContaining("wa.me"));
      expect(whatsappLink).toHaveAttribute("target", "_blank");
      expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");

      const mapsLink = screen.getByLabelText(/Google Maps Directions/i);
      expect(mapsLink).toHaveAttribute("href", expect.stringContaining("google.com/maps"));
    });
  });

  describe("CategoryHeader", () => {
    it("renders category title, description, and subcategory chips with active state", () => {
      renderWithIntl(
        <CategoryHeader
          categorySlug="food-and-drink"
          title="Food & Drink"
          description="Curated dining and cafes in Praia da Pipa"
          icon={Utensils}
          subcategories={["cafes", "restaurants", "bars"]}
          activeSubcategory="cafes"
        />
      );

      expect(screen.getByRole("heading", { name: "Food & Drink" })).toBeInTheDocument();
      expect(
        screen.getByText("Curated dining and cafes in Praia da Pipa")
      ).toBeInTheDocument();

      const cafesChip = screen.getByRole("link", { name: "Cafes" });
      expect(cafesChip).toHaveAttribute("aria-current", "page");

      const allChip = screen.getByRole("link", { name: "All Subcategories" });
      expect(allChip).not.toHaveAttribute("aria-current");
    });
  });

  describe("ContextualFilterBar", () => {
    it("renders supported tags with active states and clear button", () => {
      renderWithIntl(
        <ContextualFilterBar
          categorySlug="food-and-drink"
          activeTags={["wifi", "sunset-views"]}
        />
      );

      const wifiBtn = screen.getByRole("link", { name: "Wi-Fi" });
      expect(wifiBtn).toHaveAttribute("aria-pressed", "true");

      const outletsBtn = screen.getByRole("link", { name: "Power Outlets" });
      expect(outletsBtn).toHaveAttribute("aria-pressed", "false");

      const clearBtn = screen.getByRole("link", { name: "Clear filters" });
      expect(clearBtn).toBeInTheDocument();
    });
  });
});
