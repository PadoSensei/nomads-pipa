/**
 * Supabase Domain Mappers for Nomads Pipa
 *
 * Provides typed mapping functions translating snake_case PostgreSQL relational rows
 * to camelCase application domain models (BaseListing, BusinessListing, etc.).
 *
 * The database schema acts as the database source of truth, and the domain
 * interfaces in lib/content/ act as the application source of truth.
 * This module is the explicit boundary between the two.
 */

import type {
  BusinessListing,
  ContactInfo,
  GeoLocation,
  PriceLevel,
  WeeklyOpeningHours,
} from "@/lib/content/businesses";
import type { CategorySlug, ContextualTagSlug } from "@/lib/content/categories";
import type {
  PartnerStatus,
  PublicationStatus,
  VerificationStatus,
  VisibilityStatus,
} from "@/lib/content/status";

/**
 * Shape of a raw database row from the `public.businesses` table.
 */
export interface DatabaseBusinessRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id?: string | null;
  category_slug?: string | null;
  subcategory?: string | null;
  address?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  whatsapp?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  instagram?: string | null;
  cover_image_url?: string | null;
  logo_url?: string | null;
  opening_hours?: unknown;
  price_level?: string | null;
  listing_status: string;
  partner_status: string;
  verification_status: string;
  visibility: string;
  has_wifi?: boolean | null;
  wifi_speed?: number | string | null;
  has_power_outlets?: boolean | null;
  is_pet_friendly?: boolean | null;
  is_demo?: boolean | null;
  created_at: string;
  updated_at: string;
}

/**
 * Options for mapping a business row to a BusinessListing.
 */
export interface MapBusinessOptions {
  categorySlug?: CategorySlug;
  tags?: ContextualTagSlug[];
}

/**
 * Parses and validates structured opening hours from a JSON / JSONB field.
 */
export function parseOpeningHours(rawHours: unknown): WeeklyOpeningHours | undefined {
  if (!rawHours || typeof rawHours !== "object" || Array.isArray(rawHours)) {
    return undefined;
  }

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  const result: WeeklyOpeningHours = {};
  let hasValidDay = false;

  const rawObj = rawHours as Record<string, unknown>;

  for (const day of days) {
    const entry = rawObj[day];
    if (entry && typeof entry === "object" && !Array.isArray(entry)) {
      const entryObj = entry as Record<string, unknown>;
      if (
        typeof entryObj.open === "string" &&
        typeof entryObj.close === "string"
      ) {
        result[day] = {
          open: entryObj.open,
          close: entryObj.close,
          ...(entryObj.isClosed === true ? { isClosed: true } : {}),
        };
        hasValidDay = true;
      }
    }
  }

  return hasValidDay ? result : undefined;
}

/**
 * Constructs a ContactInfo object from individual contact columns.
 */
export function buildContactInfo(row: DatabaseBusinessRow): ContactInfo | undefined {
  const contact: ContactInfo = {};
  let hasContact = false;

  if (row.whatsapp) {
    contact.whatsapp = row.whatsapp;
    hasContact = true;
  }
  if (row.phone) {
    contact.phone = row.phone;
    hasContact = true;
  }
  if (row.email) {
    contact.email = row.email;
    hasContact = true;
  }
  if (row.website) {
    contact.website = row.website;
    hasContact = true;
  }
  if (row.instagram) {
    contact.instagram = row.instagram;
    hasContact = true;
  }

  return hasContact ? contact : undefined;
}

/**
 * Constructs a GeoLocation object from latitude and longitude columns.
 */
export function buildLocation(row: DatabaseBusinessRow): GeoLocation | undefined {
  if (
    row.latitude !== null &&
    row.latitude !== undefined &&
    row.longitude !== null &&
    row.longitude !== undefined
  ) {
    const lat = typeof row.latitude === "string" ? parseFloat(row.latitude) : row.latitude;
    const lng = typeof row.longitude === "string" ? parseFloat(row.longitude) : row.longitude;

    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return { latitude: lat, longitude: lng };
    }
  }

  return undefined;
}

/**
 * Validates and casts price level.
 */
export function parsePriceLevel(priceLevel: string | null | undefined): PriceLevel | undefined {
  if (
    priceLevel === "$" ||
    priceLevel === "$$" ||
    priceLevel === "$$$" ||
    priceLevel === "$$$$"
  ) {
    return priceLevel;
  }
  return undefined;
}

/**
 * Transforms a raw snake_case database row from public.businesses into a typed BusinessListing domain model.
 *
 * @param row The database record from public.businesses
 * @param options Additional joined or relational data (e.g. categorySlug, tags)
 */
export function toBusinessListing(
  row: DatabaseBusinessRow,
  tagsOrOptions?: ContextualTagSlug[] | MapBusinessOptions
): BusinessListing {
  let tags: ContextualTagSlug[] = [];
  let categorySlug: CategorySlug = (row.category_slug as CategorySlug) || "food-and-drink";

  if (Array.isArray(tagsOrOptions)) {
    tags = tagsOrOptions;
  } else if (tagsOrOptions && typeof tagsOrOptions === "object") {
    if (tagsOrOptions.tags) {
      tags = tagsOrOptions.tags;
    }
    if (tagsOrOptions.categorySlug) {
      categorySlug = tagsOrOptions.categorySlug;
    }
  }

  const location = buildLocation(row);
  const contact = buildContactInfo(row);
  const openingHours = parseOpeningHours(row.opening_hours);
  const priceLevel = parsePriceLevel(row.price_level);

  const listing: BusinessListing = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    category: categorySlug,
    ...(row.address ? { address: row.address } : {}),
    ...(location ? { location } : {}),
    ...(contact ? { contact } : {}),
    ...(row.cover_image_url ? { coverImageUrl: row.cover_image_url } : {}),
    ...(row.logo_url ? { logoUrl: row.logo_url } : {}),

    // Decoupled statuses
    publicationStatus: row.listing_status as PublicationStatus,
    visibility: row.visibility as VisibilityStatus,
    verificationStatus: row.verification_status as VerificationStatus,
    partnerStatus: row.partner_status as PartnerStatus,

    // Additional fields
    ...(row.subcategory ? { subcategory: row.subcategory } : {}),
    tags,
    ...(priceLevel ? { priceLevel } : {}),
    ...(openingHours ? { openingHours } : {}),
    hasWifi: row.has_wifi ?? false,
    ...(row.wifi_speed !== null && row.wifi_speed !== undefined
      ? { wifiSpeed: typeof row.wifi_speed === "string" ? parseFloat(row.wifi_speed) : row.wifi_speed }
      : {}),
    hasPowerOutlets: row.has_power_outlets ?? false,
    isPetFriendly: row.is_pet_friendly ?? false,
    isDemo: row.is_demo ?? false,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return listing;
}
