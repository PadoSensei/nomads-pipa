import { describe, expect, it } from "vitest";
import {
  FixtureContentAdapter,
  parseDirectoryFilterParams,
  buildFilterQueryString,
  toggleTagInList,
} from "@/lib/content";
import { demoBusinessCafe, demoBusinessRestaurant } from "@/lib/content/demo-fixtures";

describe("Content Service & FixtureContentAdapter", () => {
  const adapter = new FixtureContentAdapter();

  it("getBusinessBySlug returns the expected business", async () => {
    const business = await adapter.getBusinessBySlug(demoBusinessCafe.slug);
    expect(business).toBeDefined();
    expect(business?.name).toBe(demoBusinessCafe.name);
    expect(business?.category).toBe("food-and-drink");
  });

  it("getBusinessBySlug returns undefined for an unknown slug", async () => {
    const business = await adapter.getBusinessBySlug("non-existent-slug");
    expect(business).toBeUndefined();
  });

  it("getBusinessesByCategory returns only matching businesses", async () => {
    const foodListings = await adapter.getBusinessesByCategory("food-and-drink");
    expect(foodListings.length).toBeGreaterThan(0);
    for (const b of foodListings) {
      expect(b.category).toBe("food-and-drink");
    }

    const accommodationListings = await adapter.getBusinessesByCategory("accommodation");
    for (const b of accommodationListings) {
      expect(b.category).toBe("accommodation");
    }
  });

  it("category filtering does not mutate fixture data", async () => {
    const originalTagsCount = demoBusinessCafe.tags.length;
    const results = await adapter.getBusinessesByCategory("food-and-drink", {
      tags: ["wifi"],
    });

    // Mutate the returned object to verify isolation
    results[0].tags.push("ocean-view");
    expect(demoBusinessCafe.tags.length).toBe(originalTagsCount);
  });
});

describe("Contextual Filtering Logic", () => {
  const adapter = new FixtureContentAdapter();

  it("handles no active tags (returns all category businesses)", async () => {
    const results = await adapter.getBusinessesByCategory("food-and-drink");
    expect(results.length).toBe(3); // Cafe, Restaurant, Sunset Lounge
  });

  it("filters with one active tag", async () => {
    const results = await adapter.getBusinessesByCategory("food-and-drink", {
      tags: ["daily-meal-pf"],
    });
    expect(results.length).toBe(1);
    expect(results[0].slug).toBe(demoBusinessRestaurant.slug);
  });

  it("filters with multiple active tags using intersection/AND semantics", async () => {
    const results = await adapter.getBusinessesByCategory("food-and-drink", {
      tags: ["wifi", "power-outlets"],
    });
    expect(results.length).toBe(1);
    expect(results[0].slug).toBe(demoBusinessCafe.slug);

    // Both wifi and sunset-views
    const sunsetWifi = await adapter.getBusinessesByCategory("food-and-drink", {
      tags: ["wifi", "sunset-views"],
    });
    expect(sunsetWifi.length).toBe(1);
    expect(sunsetWifi[0].slug).toBe("demo-mirante-sunset-lounge-tapas");
  });

  it("filters by subcategory", async () => {
    const results = await adapter.getBusinessesByCategory("food-and-drink", {
      subcategory: "cafes",
    });
    expect(results.length).toBe(1);
    expect(results[0].slug).toBe(demoBusinessCafe.slug);
  });

  it("combines subcategory and contextual tags", async () => {
    const results = await adapter.getBusinessesByCategory("food-and-drink", {
      subcategory: "bars",
      tags: ["sunset-views"],
    });
    expect(results.length).toBe(1);
    expect(results[0].slug).toBe("demo-mirante-sunset-lounge-tapas");

    const noMatch = await adapter.getBusinessesByCategory("food-and-drink", {
      subcategory: "cafes",
      tags: ["sunset-views"],
    });
    expect(noMatch).toEqual([]);
  });

  it("returns empty array when no businesses match selected criteria", async () => {
    const results = await adapter.getBusinessesByCategory("food-and-drink", {
      tags: ["daily-meal-pf", "sunset-views"],
    });
    expect(results).toEqual([]);
  });

  it("toggleTagInList adds and removes tags correctly", () => {
    const initial = toggleTagInList([], "wifi");
    expect(initial).toEqual(["wifi"]);

    const added = toggleTagInList(initial, "power-outlets");
    expect(added).toEqual(["wifi", "power-outlets"]);

    const removed = toggleTagInList(added, "wifi");
    expect(removed).toEqual(["power-outlets"]);
  });

  it("parseDirectoryFilterParams parses and sanitizes URL search parameters", () => {
    const parsed = parseDirectoryFilterParams({
      tags: "wifi,power-outlets,invalid-tag",
      subcategory: "cafes",
    });
    expect(parsed.tags).toEqual(["wifi", "power-outlets"]);
    expect(parsed.subcategory).toBe("cafes");

    const parsedFromParams = parseDirectoryFilterParams(
      new URLSearchParams("tags=sunset-views&subcategory=bars")
    );
    expect(parsedFromParams.tags).toEqual(["sunset-views"]);
    expect(parsedFromParams.subcategory).toBe("bars");

    // Test unknown-tag,wifi
    const unknownWithValid = parseDirectoryFilterParams(
      new URLSearchParams("tags=unknown-tag,wifi")
    );
    expect(unknownWithValid.tags).toEqual(["wifi"]);
  });

  it("buildFilterQueryString creates expected query string", () => {
    const qs = buildFilterQueryString({
      tags: ["wifi", "sunset-views"],
      subcategory: "cafes",
    });
    expect(qs).toBe("?subcategory=cafes&tags=wifi%2Csunset-views");

    const emptyQs = buildFilterQueryString({});
    expect(emptyQs).toBe("");
  });
});
