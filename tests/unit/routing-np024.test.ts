import { describe, it, expect } from "vitest";
import { contentService } from "@/lib/content";

describe("Routing & ContentService Integration (NP-024)", () => {
  it("getEvents() returns all events sorted chronologically by startsAt", async () => {
    const events = await contentService.getEvents();
    expect(events.length).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < events.length - 1; i++) {
      const current = new Date(events[i].startsAt).getTime();
      const next = new Date(events[i + 1].startsAt).getTime();
      expect(current).toBeLessThanOrEqual(next);
    }
  });

  it("getEssentialServices() returns all services or filters by emergency and subcategory", async () => {
    const allServices = await contentService.getEssentialServices();
    expect(allServices.length).toBeGreaterThanOrEqual(6);

    const emergencyOnly = await contentService.getEssentialServices({
      isEmergencyOnly: true,
    });
    expect(emergencyOnly.length).toBeGreaterThanOrEqual(2);
    expect(emergencyOnly.every((s) => s.isEmergency)).toBe(true);

    const repairsOnly = await contentService.getEssentialServices({
      essentialSubcategory: "repairs",
    });
    expect(repairsOnly.length).toBeGreaterThanOrEqual(1);
    expect(repairsOnly.every((s) => s.essentialSubcategory === "repairs")).toBe(
      true
    );
  });
});
