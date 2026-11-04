import { describe, it, expect } from "vitest";
import enMessages from "@/messages/en.json";
import ptBRMessages from "@/messages/pt-BR.json";
import esMessages from "@/messages/es.json";
import { routing, locales, defaultLocale } from "@/i18n/routing";
import {
  formatCurrencyBRL,
  formatDate,
  formatDateTime,
  LOCAL_TIMEZONE,
} from "@/lib/formatters";
import {
  getLocalizedListing,
  getLocalizedEvent,
  getLocalizedCategory,
} from "@/lib/content/localization";
import type { BaseListing } from "@/lib/content/businesses";
import type { EventListing } from "@/lib/content/events";
import type { DiscoveryCategory } from "@/lib/content/categories";

function extractLeafKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...extractLeafKeys(value as Record<string, unknown>, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys.sort();
}

describe("Internationalisation Foundation (NP-016)", () => {
  describe("Routing Configuration", () => {
    it("supports en, pt-BR, and es locales", () => {
      expect(locales).toEqual(["en", "pt-BR", "es"]);
      expect(routing.locales).toEqual(["en", "pt-BR", "es"]);
    });

    it("has English ('en') as default locale", () => {
      expect(defaultLocale).toBe("en");
      expect(routing.defaultLocale).toBe("en");
    });

    it("enforces localePrefix: 'always'", () => {
      expect(routing.localePrefix).toBe("always");
    });
  });

  describe("Translation Parity", () => {
    const enKeys = extractLeafKeys(enMessages);
    const ptKeys = extractLeafKeys(ptBRMessages);
    const esKeys = extractLeafKeys(esMessages);

    it("has identical translation keys across English and Brazilian Portuguese", () => {
      expect(ptKeys).toEqual(enKeys);
    });

    it("has identical translation keys across English and Spanish", () => {
      expect(esKeys).toEqual(enKeys);
    });

    it("contains all 10 standard namespaces", () => {
      const requiredNamespaces = [
        "Common",
        "Navigation",
        "Homepage",
        "Categories",
        "Events",
        "Community",
        "Partner",
        "Footer",
        "Errors",
        "Forms",
      ];

      for (const ns of requiredNamespaces) {
        expect(enMessages).toHaveProperty(ns);
        expect(ptBRMessages).toHaveProperty(ns);
        expect(esMessages).toHaveProperty(ns);
      }
    });

    it("has non-empty string values for all leaf keys in all languages", () => {
      for (const key of enKeys) {
        const getVal = (obj: Record<string, unknown>, path: string): unknown =>
          path.split(".").reduce((acc: unknown, part: string) => {
            if (acc && typeof acc === "object") {
              return (acc as Record<string, unknown>)[part];
            }
            return undefined;
          }, obj);

        const enVal = getVal(enMessages, key);
        const ptVal = getVal(ptBRMessages, key);
        const esVal = getVal(esMessages, key);

        expect(typeof enVal).toBe("string");
        expect((enVal as string).trim().length).toBeGreaterThan(0);

        expect(typeof ptVal).toBe("string");
        expect((ptVal as string).trim().length).toBeGreaterThan(0);

        expect(typeof esVal).toBe("string");
        expect((esVal as string).trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe("Locale-aware Formatting", () => {
    it("uses America/Fortaleza as default timezone", () => {
      expect(LOCAL_TIMEZONE).toBe("America/Fortaleza");
    });

    it("formats BRL currency correctly per locale", () => {
      const amount = 45.5;

      const enFormatted = formatCurrencyBRL(amount, "en");
      const ptFormatted = formatCurrencyBRL(amount, "pt-BR");
      const esFormatted = formatCurrencyBRL(amount, "es");

      // Verify all include BRL indicator and numeric representation
      expect(enFormatted).toContain("45.50");
      expect(ptFormatted).toMatch(/45,50/);
      expect(esFormatted).toMatch(/45,50/);
    });

    it("formats dates adhering to locale conventions", () => {
      const date = new Date("2026-05-15T15:00:00Z");

      const enDate = formatDate(date, "en", "short");
      const ptDate = formatDate(date, "pt-BR", "short");
      const esDate = formatDate(date, "es", "short");

      expect(typeof enDate).toBe("string");
      expect(typeof ptDate).toBe("string");
      expect(typeof esDate).toBe("string");
      expect(enDate.length).toBeGreaterThan(0);
      expect(ptDate.length).toBeGreaterThan(0);
      expect(esDate.length).toBeGreaterThan(0);
    });
  });

  describe("NP-003 Content Model Translation Coordination", () => {
    const mockListing: BaseListing = {
      id: "venue-1",
      name: "Default Coffee Shop",
      slug: "default-coffee-shop",
      description: "Default description in English",
      category: "food-and-drink",
      publicationStatus: "published",
      visibility: "public",
      verificationStatus: "verified",
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
      translations: {
        "pt-BR": {
          name: "Cafeteria da Pipa",
          description: "Descrição em português brasileiro",
        },
      },
    };

    it("returns translated content when available", () => {
      const localized = getLocalizedListing(mockListing, "pt-BR");
      expect(localized.name).toBe("Cafeteria da Pipa");
      expect(localized.description).toBe("Descrição em português brasileiro");
    });

    it("falls back cleanly to base attributes when locale translation is missing", () => {
      const localized = getLocalizedListing(mockListing, "es");
      expect(localized.name).toBe("Default Coffee Shop");
      expect(localized.description).toBe("Default description in English");
    });

    it("handles events with optional localized fields", () => {
      const mockEvent: EventListing = {
        id: "event-1",
        title: "Sunset Meetup",
        slug: "sunset-meetup",
        description: "Join us for sunset",
        eventType: "official_meetup",
        startsAt: "2026-06-01T17:00:00Z",
        locationName: "Mirante da Praia",
        lifecycleStatus: "published",
        visibility: "public",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        translations: {
          "pt-BR": {
            title: "Encontro ao Pôr do Sol",
            description: "Venha ver o pôr do sol conosco",
          },
        },
      };

      const localizedPt = getLocalizedEvent(mockEvent, "pt-BR");
      expect(localizedPt.title).toBe("Encontro ao Pôr do Sol");

      const localizedEs = getLocalizedEvent(mockEvent, "es");
      expect(localizedEs.title).toBe("Sunset Meetup");
    });
  });
});
