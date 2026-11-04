import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Smoke test baseline", () => {
  it("renders a component and finds text with jest-dom matcher", () => {
    render(<div data-testid="smoke-element">Nomads Pipa Testing Baseline</div>)
    const element = screen.getByTestId("smoke-element")
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent("Nomads Pipa Testing Baseline")
  })
})
