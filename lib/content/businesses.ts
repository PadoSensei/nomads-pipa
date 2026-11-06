/**
 * Business and Base Listing Types for Nomads Pipa
 *
 * Defines the core BaseListing interface shared across directory entities,
 * and BusinessListing extending BaseListing with business-specific details.
 */

import type { CategorySlug, ContextualTagSlug } from "./categories";
import type {
  ContentLocale,
  PartnerStatus,
  PublicationStatus,
  VerificationStatus,
  VisibilityStatus,
} from "./status";

/**
 * Optional localized translations for base listings.
 */
export interface ListingTranslation {
  name?: string;
  description?: string;
}

/**
 * Geographic coordinates.
 */
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

/**
 * Direct contact and social links.
 */
export interface ContactInfo {
  whatsapp?: string;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
}

/**
 * Daily schedule entry for opening hours.
 */
export interface DaySchedule {
  open: string; // e.g. "08:00"
  close: string; // e.g. "18:00"
  isClosed?: boolean;
}

/**
 * Weekly structured opening hours.
 */
export type WeeklyOpeningHours = Partial<
  Record<
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday",
    DaySchedule
  >
>;

/**
 * Common fields shared across all discovery directory entries
 * (businesses, services, accommodation, transport).
 */
export interface BaseListing {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: CategorySlug;
  address?: string;
  location?: GeoLocation;
  contact?: ContactInfo;
  coverImageUrl?: string;
  logoUrl?: string;

  // Editorial publication lifecycle
  publicationStatus: PublicationStatus;

  // Audience visibility
  visibility: VisibilityStatus;

  // Independent factual vetting
  verificationStatus: VerificationStatus;

  // Distinct marker for demo fixtures
  isDemo?: boolean;

  // Optional localized content per supported locale
  translations?: Partial<Record<ContentLocale, ListingTranslation>>;

  createdAt: string;
  updatedAt: string;
}

/**
 * Price level indicator for businesses and food venues.
 */
export type PriceLevel = "$" | "$$" | "$$$" | "$$$$";

/**
 * Business and venue listing interface.
 */
export interface BusinessListing extends BaseListing {
  // Independent commercial partnership standing
  partnerStatus: PartnerStatus;

  // Subcategory (e.g. cafes, restaurants, bars)
  subcategory?: string;

  // Contextual intent tags (e.g. Wi-Fi, daily-meal-pf, sunset-views)
  tags: ContextualTagSlug[];

  // Price level classification
  priceLevel?: PriceLevel;

  // Structured opening hours
  openingHours?: WeeklyOpeningHours;

  // Verified amenities
  hasWifi?: boolean;
  wifiSpeed?: number; // Verified Wi-Fi speed in Mbps
  hasPowerOutlets?: boolean;
  isPetFriendly?: boolean;
}
