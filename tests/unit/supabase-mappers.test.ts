import { describe, expect, it } from "vitest";
import {
  buildContactInfo,
  buildLocation,
  parseOpeningHours,
  parsePriceLevel,
  toBusinessListing,
  type DatabaseBusinessRow,
} from "@/lib/supabase/mappers";

describe("Supabase Domain Mappers", () => {
  const baseMockRow: DatabaseBusinessRow = {
    id: "e9f0e1d2-0000-4000-8000-000000000001",
    name: "Tribus Cafe Pipa",
    slug: "tribus-cafe-pipa",
    description: "Specialty coffee shop and community workspace.",
    category_id: "c1a2b3c4-0000-4000-8000-000000000001",
    category_slug: "food-and-drink",
    subcategory: "cafes",
    address: "Av. Baía dos Golfinhos, 120, Praia da Pipa",
    latitude: -6.2291234,
    longitude: -35.0504321,
    whatsapp: "+5584999990001",
    phone: "+558432460001",
    email: "contact@tribuspipa.com",
    website: "https://tribuspipa.com",
    instagram: "https://instagram.com/tribuspipa",
    cover_image_url: "https://example.com/tribus-cover.jpg",
    logo_url: "https://example.com/tribus-logo.png",
    opening_hours: {
      monday: { open: "08:00", close: "18:00" },
      tuesday: { open: "08:00", close: "18:00" },
      wednesday: { open: "08:00", close: "18:00" },
      thursday: { open: "08:00", close: "18:00" },
      friday: { open: "08:00", close: "20:00" },
      saturday: { open: "09:00", close: "20:00" },
      sunday: { open: "09:00", close: "15:00", isClosed: false },
    },
    price_level: "$$",
    listing_status: "published",
    partner_status: "approved",
    verification_status: "verified",
    visibility: "public",
    has_wifi: true,
    has_power_outlets: true,
    is_pet_friendly: true,
    is_demo: false,
    created_at: "2026-11-01T10:00:00.000Z",
    updated_at: "2026-11-04T12:00:00.000Z",
  };

  it("transforms a complete database business row into a BusinessListing domain model", () => {
    const listing = toBusinessListing(baseMockRow, [
      "remote-work-friendly",
      "wifi",
      "power-outlets",
    ]);

    expect(listing.id).toBe(baseMockRow.id);
    expect(listing.name).toBe("Tribus Cafe Pipa");
    expect(listing.slug).toBe("tribus-cafe-pipa");
    expect(listing.description).toBe("Specialty coffee shop and community workspace.");
    expect(listing.category).toBe("food-and-drink");
    expect(listing.subcategory).toBe("cafes");
    expect(listing.address).toBe(baseMockRow.address);

    // Geolocation mapping
    expect(listing.location).toEqual({
      latitude: -6.2291234,
      longitude: -35.0504321,
    });

    // Contact info mapping
    expect(listing.contact).toEqual({
      whatsapp: "+5584999990001",
      phone: "+558432460001",
      email: "contact@tribuspipa.com",
      website: "https://tribuspipa.com",
      instagram: "https://instagram.com/tribuspipa",
    });

    // Images
    expect(listing.coverImageUrl).toBe("https://example.com/tribus-cover.jpg");
    expect(listing.logoUrl).toBe("https://example.com/tribus-logo.png");

    // Decoupled statuses
    expect(listing.publicationStatus).toBe("published");
    expect(listing.partnerStatus).toBe("approved");
    expect(listing.verificationStatus).toBe("verified");
    expect(listing.visibility).toBe("public");

    // Amenities & flags
    expect(listing.hasWifi).toBe(true);
    expect(listing.hasPowerOutlets).toBe(true);
    expect(listing.isPetFriendly).toBe(true);
    expect(listing.isDemo).toBe(false);

    // Contextual tags
    expect(listing.tags).toEqual(["remote-work-friendly", "wifi", "power-outlets"]);

    // Price level & opening hours
    expect(listing.priceLevel).toBe("$$");
    expect(listing.openingHours?.monday).toEqual({ open: "08:00", close: "18:00" });

    // Timestamps
    expect(listing.createdAt).toBe("2026-11-01T10:00:00.000Z");
    expect(listing.updatedAt).toBe("2026-11-04T12:00:00.000Z");
  });

  it("handles minimal rows with null or missing optional fields", () => {
    const minimalRow: DatabaseBusinessRow = {
      id: "e9f0e1d2-0000-4000-8000-000000000002",
      name: "Minimal Venue",
      slug: "minimal-venue",
      description: null,
      listing_status: "draft",
      partner_status: "none",
      verification_status: "unverified",
      visibility: "public",
      created_at: "2026-11-01T00:00:00.000Z",
      updated_at: "2026-11-01T00:00:00.000Z",
    };

    const listing = toBusinessListing(minimalRow);

    expect(listing.id).toBe(minimalRow.id);
    expect(listing.name).toBe("Minimal Venue");
    expect(listing.slug).toBe("minimal-venue");
    expect(listing.description).toBe("");
    expect(listing.category).toBe("food-and-drink"); // default fallback
    expect(listing.publicationStatus).toBe("draft");
    expect(listing.partnerStatus).toBe("none");
    expect(listing.verificationStatus).toBe("unverified");
    expect(listing.visibility).toBe("public");
    expect(listing.tags).toEqual([]);
    expect(listing.location).toBeUndefined();
    expect(listing.contact).toBeUndefined();
    expect(listing.openingHours).toBeUndefined();
    expect(listing.priceLevel).toBeUndefined();
    expect(listing.hasWifi).toBe(false);
    expect(listing.hasPowerOutlets).toBe(false);
    expect(listing.isPetFriendly).toBe(false);
    expect(listing.isDemo).toBe(false);
  });

  it("supports options object for overriding categorySlug and tags", () => {
    const minimalRow: DatabaseBusinessRow = {
      id: "e9f0e1d2-0000-4000-8000-000000000003",
      name: "Surf School Pipa",
      slug: "surf-school-pipa",
      description: "Learn to surf at Praia do Madeiro.",
      listing_status: "published",
      partner_status: "approved",
      verification_status: "verified",
      visibility: "public",
      created_at: "2026-11-01T00:00:00.000Z",
      updated_at: "2026-11-01T00:00:00.000Z",
    };

    const listing = toBusinessListing(minimalRow, {
      categorySlug: "sports-and-activities",
      tags: ["quiet-space"],
    });

    expect(listing.category).toBe("sports-and-activities");
    expect(listing.tags).toEqual(["quiet-space"]);
  });

  describe("helper functions", () => {
    it("parseOpeningHours handles valid, invalid, and partial schedules", () => {
      expect(parseOpeningHours(null)).toBeUndefined();
      expect(parseOpeningHours("not an object")).toBeUndefined();
      expect(parseOpeningHours([])).toBeUndefined();
      expect(parseOpeningHours({})).toBeUndefined();

      const validHours = {
        monday: { open: "08:00", close: "18:00" },
        wednesday: { open: "10:00", close: "22:00", isClosed: true },
      };
      const parsed = parseOpeningHours(validHours);
      expect(parsed?.monday).toEqual({ open: "08:00", close: "18:00" });
      expect(parsed?.wednesday).toEqual({ open: "10:00", close: "22:00", isClosed: true });
      expect(parsed?.tuesday).toBeUndefined();
    });

    it("buildContactInfo returns undefined when no contact fields are present", () => {
      const emptyRow = { ...baseMockRow, whatsapp: null, phone: null, email: null, website: null, instagram: null };
      expect(buildContactInfo(emptyRow)).toBeUndefined();
    });

    it("buildLocation parses both numeric and valid string coordinates", () => {
      const stringCoordsRow = { ...baseMockRow, latitude: "-6.2200000", longitude: "-35.0500000" };
      expect(buildLocation(stringCoordsRow)).toEqual({
        latitude: -6.22,
        longitude: -35.05,
      });

      const invalidCoordsRow = { ...baseMockRow, latitude: "invalid", longitude: null };
      expect(buildLocation(invalidCoordsRow)).toBeUndefined();
    });

    it("parsePriceLevel only accepts valid price strings", () => {
      expect(parsePriceLevel("$")).toBe("$");
      expect(parsePriceLevel("$$")).toBe("$$");
      expect(parsePriceLevel("$$$")).toBe("$$$");
      expect(parsePriceLevel("$$$$")).toBe("$$$$");
      expect(parsePriceLevel("expensive")).toBeUndefined();
      expect(parsePriceLevel(null)).toBeUndefined();
    });
  });
});
