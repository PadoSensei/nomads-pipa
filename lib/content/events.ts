/**
 * Event Types for Nomads Pipa
 *
 * Defines event models, distinguishing between official meetups, community picks,
 * and general city events.
 */

import type { ContactInfo, GeoLocation } from "./businesses";
import type { ContentLocale, EventLifecycleStatus, VisibilityStatus } from "./status";

/**
 * Optional localized translations for event listings.
 */
export interface EventListingTranslation {
  title?: string;
  description?: string;
  priceDescription?: string;
}

/**
 * Event classification.
 *
 * - official_meetup: "Nomads Pipa Meet-up" — official community event.
 * - community_pick: "Community Pick" — third-party event with confirmed community members attending.
 * - city_event: "City Event" — general local event or cultural suggestion.
 */
export type EventType = "official_meetup" | "community_pick" | "city_event";

/**
 * Display metadata for event types.
 */
export interface EventTypeMetadata {
  type: EventType;
  label: string;
  badgeLabel: string;
  description: string;
}

export const EVENT_TYPE_METADATA: Record<EventType, EventTypeMetadata> = {
  official_meetup: {
    type: "official_meetup",
    label: "Nomads Pipa Meet-up",
    badgeLabel: "Official Meet-up",
    description: "Official community event organised or hosted by Nomads Pipa",
  },
  community_pick: {
    type: "community_pick",
    label: "Community Pick",
    badgeLabel: "Community Pick",
    description:
      "Curated third-party event with confirmed community members planning to attend",
  },
  city_event: {
    type: "city_event",
    label: "City Event",
    badgeLabel: "City Event",
    description: "General local event, cultural festival, or regional activity in Pipa",
  },
};

/**
 * Event listing interface.
 */
export interface EventListing {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventType: EventType;

  // Schedule (ISO 8601 strings)
  startsAt: string;
  endsAt?: string;

  // Location / Venue
  locationName: string;
  address?: string;
  location?: GeoLocation;

  // Organiser & Contacts
  organizerName?: string;
  contact?: ContactInfo;
  externalBookingUrl?: string;

  // Optional pricing/cover description (e.g. "Free admission", "R$ 30 at door")
  priceDescription?: string;

  // Media
  coverImageUrl?: string;

  // Lifecycle & Visibility
  lifecycleStatus: EventLifecycleStatus;
  visibility: VisibilityStatus;

  // Demarcation for demo fixtures
  isDemo?: boolean;

  // Optional localized content per supported locale
  translations?: Partial<Record<ContentLocale, EventListingTranslation>>;

  createdAt: string;
  updatedAt: string;
}

/**
 * Type guard to check if an event is an official Nomads Pipa meetup.
 */
export function isOfficialMeetup(event: EventListing): boolean {
  return event.eventType === "official_meetup";
}

/**
 * Type guard to check if an event is a community pick.
 */
export function isCommunityPick(event: EventListing): boolean {
  return event.eventType === "community_pick";
}

/**
 * Type guard to check if an event is a general city event.
 */
export function isCityEvent(event: EventListing): boolean {
  return event.eventType === "city_event";
}
