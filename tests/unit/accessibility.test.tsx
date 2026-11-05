import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { CalendarDays } from "lucide-react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

import LocaleLayout from "@/app/[locale]/layout";
import { HeaderNavLinks } from "@/components/layout/HeaderNavLinks";
import { MobileNavContent } from "@/components/layout/MobileNavContent";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import messagesEn from "@/messages/en.json";
import messagesEs from "@/messages/es.json";
import messagesPtBr from "@/messages/pt-BR.json";

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
    <NextIntlClientProvider locale="en" messages={messagesEn}>
      {ui}
    </NextIntlClientProvider>
  );
}

// Mock fonts used in layout
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Sora: () => ({ variable: "--font-sora" }),
}));

vi.mock("@/components/layout/AppHeader", () => ({
  AppHeader: () => <header data-testid="mock-app-header" />,
}));

vi.mock("@/components/layout/AppFooter", () => ({
  AppFooter: () => <footer data-testid="mock-app-footer" />,
}));

vi.mock("@/components/layout/MobileBottomNav", () => ({
  MobileBottomNav: () => <nav data-testid="mock-mobile-bottom-nav" />,
}));

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(
    async ({ locale, namespace }: { locale?: string; namespace?: string } = {}) => {
      const allMessages: Record<string, Record<string, unknown>> = {
        en: messagesEn,
        "pt-BR": messagesPtBr,
        es: messagesEs,
      };
      const activeLocale = locale || "en";
      const localeDict = allMessages[activeLocale] || messagesEn;
      const nsDict = (namespace ? localeDict[namespace] : localeDict) as
        | Record<string, unknown>
        | undefined;

      return (key: string) => {
        const val = nsDict?.[key];
        return typeof val === "string" ? val : key;
      };
    }
  ),
}));

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
      mockPathname.mockReturnValue("/categories");

      renderWithIntl(<MobileNavContent />);

      const activeLink = screen.getByRole("link", { name: "Explore" });
      expect(activeLink).toHaveAttribute("aria-current", "page");

      const inactiveLink = screen.getByRole("link", { name: "Community" });
      expect(inactiveLink).not.toHaveAttribute("aria-current");
    });

    it("has accessible navigation landmark, More dialog button, and minimum touch target size class", () => {
      mockPathname.mockReturnValue("/");

      renderWithIntl(<MobileNavContent />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link.className).toContain("min-h-[48px]");
      });

      const moreBtn = screen.getByRole("button", { name: "More" });
      expect(moreBtn).toBeInTheDocument();
      expect(moreBtn).toHaveAttribute("aria-haspopup", "dialog");
      expect(moreBtn.className).toContain("min-h-[48px]");
    });
  });

  describe("NP-026 Design System Primitives", () => {
    it("renders DirectoryCard with secure external link attributes and accessible label", async () => {
      const { DirectoryCard } = await import("@/components/ui/DirectoryCard");
      const { container } = render(
        <NextIntlClientProvider locale="en" messages={messagesEn}>
          <DirectoryCard
            id="test-card"
            name="Casas do Kai"
            description="Quiet bungalows near dolphins bay."
            typeLabel="Houses"
            contactUrl="https://example.com/contact"
            tint="mint"
          />
        </NextIntlClientProvider>
      );

      const anchor = container.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      expect(anchor?.textContent).toContain("Casas do Kai");
      expect(anchor?.textContent).toContain("(opens in new tab)");
    });

    it("renders FilterChips with accessible aria-pressed states", async () => {
      const { FilterChips } = await import("@/components/ui/FilterChips");
      const { container } = render(
        <FilterChips
          options={[
            { id: "all", label: "All" },
            { id: "houses", label: "Houses" },
          ]}
          selectedId="all"
          onSelect={() => {}}
        />
      );

      const buttons = container.querySelectorAll("button");
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
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

  describe("Skip-to-content Link (NP-020)", () => {
    it.each([
      { locale: "en", expectedText: messagesEn.Common.skipToContent },
      { locale: "pt-BR", expectedText: messagesPtBr.Common.skipToContent },
      { locale: "es", expectedText: messagesEs.Common.skipToContent },
    ])(
      "renders exactly one skip link with correct translation for $locale",
      async ({ locale, expectedText }) => {
        const { renderToStaticMarkup } = await import("react-dom/server");

        const layoutElement = await LocaleLayout({
          children: <div data-testid="page-child">Test content</div>,
          params: Promise.resolve({ locale }),
        });

        const html = renderToStaticMarkup(layoutElement);
        const div = document.createElement("div");
        div.innerHTML = html;

        const skipLinks = div.querySelectorAll('a[href="#main-content"]');
        expect(skipLinks).toHaveLength(1);

        const skipLink = skipLinks[0] as HTMLAnchorElement;
        expect(skipLink.textContent).toBe(expectedText);
        expect(skipLink.getAttribute("href")).toBe("#main-content");

        const mainLandmark = div.querySelector("#main-content");
        expect(mainLandmark).not.toBeNull();
        expect(mainLandmark?.tagName.toLowerCase()).toBe("main");
      }
    );
  });
});
