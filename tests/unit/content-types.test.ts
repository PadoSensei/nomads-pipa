import { describe, it, expect } from "vitest";
import {
  isPublished,
  isPubliclyVisible,
  isApprovedPartner,
  isVerified,
  isOfficialMeetup,
  isCommunityPick,
  isCityEvent,
  isEmergencyService,
  CONTEXTUAL_TAGS,
  EVENT_TYPE_METADATA,
  demoFixtures,
  demoBusinessCafe,
  demoBusinessRestaurant,
  demoOfficialMeetupEvent,
  demoCommunityPickEvent,
  demoCityEvent,
  demoEssentialService,
  type BusinessListing,
  type EventListing,
  type EssentialServiceListing,
  type PartnerStatus,
  type VerificationStatus,
} from "@/lib/content";

describe("Content Status & Guards", () => {
  it("correctly identifies publication status", () => {
    expect(isPublished("published")).toBe(true);
    expect(isPublished("draft")).toBe(false);
    expect(isPublished("pending_review")).toBe(false);
    expect(isPublished("archived")).toBe(false);
    expect(isPublished("cancelled")).toBe(false);
  });

  it("correctly identifies visibility status", () => {
    expect(isPubliclyVisible("public")).toBe(true);
    expect(isPubliclyVisible("members_only")).toBe(false);
    expect(isPubliclyVisible("hidden")).toBe(false);
  });

  it("strictly separates partner status and verification status", () => {
    const partnerStatus: PartnerStatus = "approved";
    const verificationStatus: VerificationStatus = "unverified";

    expect(isApprovedPartner(partnerStatus)).toBe(true);
    expect(isVerified(verificationStatus)).toBe(false);

    // Verify they are orthogonal
    expect(isApprovedPartner("none")).toBe(false);
    expect(isVerified("verified")).toBe(true);
  });
});

describe("Categories & Contextual Tags", () => {
  it("provides valid metadata for all contextual tags", () => {
    expect(CONTEXTUAL_TAGS["remote-work-friendly"]).toBeDefined();
    expect(CONTEXTUAL_TAGS["wifi"].name).toBe("Wi-Fi");
    expect(CONTEXTUAL_TAGS["daily-meal-pf"].name).toContain("Daily Meal");
    expect(CONTEXTUAL_TAGS["sunset-views"].description).toBeTruthy();
  });
});

describe("Event Classifications", () => {
  it("provides distinct definitions and labels for event types", () => {
    expect(EVENT_TYPE_METADATA.official_meetup.label).toBe("Nomads Pipa Meet-up");
    expect(EVENT_TYPE_METADATA.community_pick.label).toBe("Community Pick");
    expect(EVENT_TYPE_METADATA.city_event.label).toBe("City Event");
  });

  it("correctly guards event classifications", () => {
    expect(isOfficialMeetup(demoOfficialMeetupEvent)).toBe(true);
    expect(isCommunityPick(demoOfficialMeetupEvent)).toBe(false);
    expect(isCityEvent(demoOfficialMeetupEvent)).toBe(false);

    expect(isCommunityPick(demoCommunityPickEvent)).toBe(true);
    expect(isOfficialMeetup(demoCommunityPickEvent)).toBe(false);

    expect(isCityEvent(demoCityEvent)).toBe(true);
    expect(isCommunityPick(demoCityEvent)).toBe(false);
  });
});

describe("Essential Services", () => {
  it("identifies emergency services with contact metadata", () => {
    expect(isEmergencyService(demoEssentialService)).toBe(true);
    expect(demoEssentialService.isEmergency).toBe(true);
    expect(demoEssentialService.emergencyPhone).toBeDefined();
    expect(demoEssentialService.lastReviewedAt).toBeDefined();
    expect(demoEssentialService.officialSourceUrl).toBeDefined();
  });
});

describe("Demo Content Fixtures", () => {
  it("ensures all demo fixtures are clearly demarcated as demo content", () => {
    const allFixtures = [
      ...demoFixtures.businesses,
      ...demoFixtures.events,
      ...demoFixtures.essentialServices,
    ];

    expect(allFixtures.length).toBeGreaterThan(0);

    for (const fixture of allFixtures) {
      expect(fixture.isDemo).toBe(true);
      const nameOrTitle = "name" in fixture ? fixture.name : fixture.title;
      expect(nameOrTitle).toContain("[DEMO]");
      expect(fixture.slug).toContain("demo-");
    }
  });

  it("conforms to BusinessListing interface with expected properties", () => {
    const cafe: BusinessListing = demoBusinessCafe;
    expect(cafe.category).toBe("food-and-drink");
    expect(cafe.tags).toContain("remote-work-friendly");
    expect(cafe.tags).toContain("wifi");
    expect(cafe.partnerStatus).toBe("approved");
    expect(cafe.verificationStatus).toBe("verified");
    expect(cafe.openingHours?.monday?.open).toBe("08:00");

    const restaurant: BusinessListing = demoBusinessRestaurant;
    expect(restaurant.partnerStatus).toBe("none");
    expect(restaurant.verificationStatus).toBe("unverified");
    expect(restaurant.tags).toContain("daily-meal-pf");
  });

  it("conforms to EventListing interface across all 3 event types", () => {
    const events: EventListing[] = demoFixtures.events;
    expect(events).toHaveLength(3);

    const types = events.map((e) => e.eventType);
    expect(types).toContain("official_meetup");
    expect(types).toContain("community_pick");
    expect(types).toContain("city_event");
  });

  it("conforms to EssentialServiceListing interface", () => {
    const service: EssentialServiceListing = demoEssentialService;
    expect(service.category).toBe("essential-services");
    expect(service.essentialSubcategory).toBe("emergency");
  });
});
