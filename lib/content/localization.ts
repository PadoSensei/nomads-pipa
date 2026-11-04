/**
 * Content Localisation Helpers
 *
 * Provides utilities to extract localized versions of business listings,
 * events, and discovery categories, falling back cleanly to default fields.
 */

import type { ContentLocale } from "./status";
import type { BaseListing, BusinessListing } from "./businesses";
import type { EventListing } from "./events";
import type { DiscoveryCategory } from "./categories";

/**
 * Returns localized name and description for any BaseListing or BusinessListing.
 */
export function getLocalizedListing<T extends BaseListing>(
  listing: T,
  locale?: ContentLocale
): T {
  if (!locale || !listing.translations || !listing.translations[locale]) {
    return listing;
  }

  const translation = listing.translations[locale];
  return {
    ...listing,
    name: translation.name ?? listing.name,
    description: translation.description ?? listing.description,
  };
}

/**
 * Returns localized title, description, and priceDescription for an EventListing.
 */
export function getLocalizedEvent(
  event: EventListing,
  locale?: ContentLocale
): EventListing {
  if (!locale || !event.translations || !event.translations[locale]) {
    return event;
  }

  const translation = event.translations[locale];
  return {
    ...event,
    title: translation.title ?? event.title,
    description: translation.description ?? event.description,
    priceDescription: translation.priceDescription ?? event.priceDescription,
  };
}

/**
 * Returns localized metadata for a DiscoveryCategory.
 */
export function getLocalizedCategory(
  category: DiscoveryCategory,
  locale?: ContentLocale
): DiscoveryCategory {
  if (!locale || !category.translations || !category.translations[locale]) {
    return category;
  }

  const translation = category.translations[locale];
  return {
    ...category,
    name: translation.name ?? category.name,
    tagline: translation.tagline ?? category.tagline,
    description: translation.description ?? category.description,
    highlightBadge: translation.highlightBadge ?? category.highlightBadge,
  };
}
