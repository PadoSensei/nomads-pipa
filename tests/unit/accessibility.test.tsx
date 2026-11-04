import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { HeaderNavLinks } from "@/components/layout/HeaderNavLinks"
import { MobileNavContent } from "@/components/layout/MobileNavContent"
import { PlaceholderPage } from "@/components/layout/PlaceholderPage"
import { CalendarDays } from "lucide-react"

// Mock usePathname to test active / inactive aria-current states
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}))

import { usePathname } from "next/navigation"

describe("Accessibility & Responsive QA Unit Tests", () => {
  describe("HeaderNavLinks", () => {
    it("sets aria-current='page' only on the active link and omits it on inactive links", () => {
      vi.mocked(usePathname).mockReturnValue("/categories")

      render(<HeaderNavLinks />)

      const activeLink = screen.getByRole("link", { name: "Categories" })
      expect(activeLink).toHaveAttribute("aria-current", "page")

      const inactiveLink = screen.getByRole("link", { name: "Events" })
      expect(inactiveLink).not.toHaveAttribute("aria-current")
    })

    it("has accessible navigation landmark with aria-label", () => {
      vi.mocked(usePathname).mockReturnValue("/")

      render(<HeaderNavLinks />)

      const nav = screen.getByRole("navigation", {
        name: "Desktop primary navigation",
      })
      expect(nav).toBeInTheDocument()
    })
  })

  describe("MobileNavContent", () => {
    it("sets aria-current='page' on active mobile link", () => {
      vi.mocked(usePathname).mockReturnValue("/events")

      render(<MobileNavContent />)

      const activeLink = screen.getByRole("link", { name: "Events" })
      expect(activeLink).toHaveAttribute("aria-current", "page")

      const inactiveLink = screen.getByRole("link", { name: "Explore" })
      expect(inactiveLink).not.toHaveAttribute("aria-current")
    })

    it("has accessible navigation landmark and minimum touch target size class", () => {
      vi.mocked(usePathname).mockReturnValue("/")

      render(<MobileNavContent />)

      const nav = screen.getByRole("navigation", {
        name: "Mobile bottom navigation",
      })
      expect(nav).toBeInTheDocument()

      const links = screen.getAllByRole("link")
      links.forEach((link) => {
        expect(link.className).toContain("min-h-[48px]")
      })
    })
  })

  describe("PlaceholderPage", () => {
    it("renders exactly one semantic h1 heading and a logical back link", () => {
      render(
        <PlaceholderPage
          title="Test Events Hub"
          description="A preview of community events."
          icon={CalendarDays}
        />
      )

      const heading = screen.getByRole("heading", { level: 1 })
      expect(heading).toHaveTextContent("Test Events Hub")

      const backLink = screen.getByRole("link", { name: /back to explore/i })
      expect(backLink).toBeInTheDocument()
    })
  })
})
