import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { CalendarDays } from "lucide-react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { HeaderNavLinks } from "@/components/layout/HeaderNavLinks";
import { MobileNavContent } from "@/components/layout/MobileNavContent";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import messages from "@/messages/en.json"; // adjust if your messages live elsewhere

// One shared mock so both the plain Next hook and the locale-aware hook
// (next-intl's usePathname, which returns the path without the locale prefix)
// are controlled by the same value in each test.
const mockPathname = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return {
    ...actual,
    usePathname: mockPathname,
  };
});

vi.mock("@/i18n/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/i18n/navigation")>();
  return {
    ...actual,
    usePathname: mockPathname,
  };
});

function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("Accessibility & Responsive QA Unit Tests", () => {
  describe("HeaderNavLinks", () => {
    it("sets aria-current='page' only on the active link and omits it on inactive links", () => {
      mockPathname.mockReturnValue("/categories");

      renderWithIntl(<HeaderNavLinks />);

      const activeLink = screen.getByRole("link", { name: "Categories" });
      expect(activeLink).toHaveAttribute("aria-current", "page");

      const inactiveLink = screen.getByRole("link", { name: "Events" });
      expect(inactiveLink).not.toHaveAttribute("aria-current");
    });

    it("has accessible navigation landmark with aria-label", () => {
      mockPathname.mockReturnValue("/");

      renderWithIntl(<HeaderNavLinks />);

      const nav = screen.getByRole("navigation", {
        name: "Desktop primary navigation",
      });
      expect(nav).toBeInTheDocument();
    });
  });

  describe("MobileNavContent", () => {
    it("sets aria-current='page' on active mobile link", () => {
      mockPathname.mockReturnValue("/events");

      renderWithIntl(<MobileNavContent />);

      const activeLink = screen.getByRole("link", { name: "Events" });
      expect(activeLink).toHaveAttribute("aria-current", "page");

      const inactiveLink = screen.getByRole("link", { name: "Explore" });
      expect(inactiveLink).not.toHaveAttribute("aria-current");
    });

    it("has accessible navigation landmark and minimum touch target size class", () => {
      mockPathname.mockReturnValue("/");

      renderWithIntl(<MobileNavContent />);

      const nav = screen.getByRole("navigation", {
        name: "Mobile bottom navigation",
      });
      expect(nav).toBeInTheDocument();

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link.className).toContain("min-h-[48px]");
      });
    });
  });

  describe("PlaceholderPage", () => {
    it("renders exactly one semantic h1 heading and a logical back link", () => {
      renderWithIntl(
        <PlaceholderPage
          title="Test Events Hub"
          description="A preview of community events."
          icon={CalendarDays}
        />
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Test Events Hub");

      const backLink = screen.getByRole("link", { name: /back to explore/i });
      expect(backLink).toBeInTheDocument();
    });
  });
});
