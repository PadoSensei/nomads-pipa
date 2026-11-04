import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

// Mock next-intl hooks
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      languageSelectorLabel: "Select language",
    };
    return map[key] ?? key;
  },
}));

const mockReplace = vi.fn();
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/categories",
}));

describe("LanguageSelector Component", () => {
  it("renders header select menu with all three languages", () => {
    render(<LanguageSelector variant="header" />);

    const select = screen.getByLabelText("Select language");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("en");

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Português (Brasil)")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("navigates to selected locale preserving current pathname", () => {
    render(<LanguageSelector variant="header" />);

    const select = screen.getByLabelText("Select language");
    fireEvent.change(select, { target: { value: "pt-BR" } });

    expect(mockReplace).toHaveBeenCalledWith("/categories", { locale: "pt-BR" });
  });

  it("renders footer buttons with active indicators", () => {
    render(<LanguageSelector variant="footer" />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);

    const enButton = screen.getByRole("button", { name: "English" });
    expect(enButton).toHaveAttribute("aria-current", "true");

    const ptButton = screen.getByRole("button", { name: "Português (Brasil)" });
    expect(ptButton).not.toHaveAttribute("aria-current");

    fireEvent.click(ptButton);
    expect(mockReplace).toHaveBeenCalledWith("/categories", { locale: "pt-BR" });
  });
});
