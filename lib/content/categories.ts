/**
 * Category and Contextual Tag Types for Nomads Pipa
 *
 * Defines the core discovery categories, subcategories, and contextual intent tags
 * used throughout the application shell and discovery engine.
 */

/**
 * Slugs for primary discovery categories matching the application shell routes.
 */
export type CategorySlug =
  | "food-and-drink"
  | "accommodation"
  | "transportation"
  | "events-and-community"
  | "sports-and-activities"
  | "essential-services"
  | "community-give-back";

/**
 * Subcategories for Food & Drink
 */
export type FoodAndDrinkSubcategory =
  | "restaurants"
  | "cafes"
  | "bars"
  | "clubs"
  | "delivery"
  | "daily-meals-pf"
  | "meal-prep-marmitas";

/**
 * Subcategories for Accommodation
 */
export type AccommodationSubcategory =
  | "houses"
  | "hostels"
  | "pousadas"
  | "apartments"
  | "real-estate";

/**
 * Subcategories for Transportation
 */
export type TransportationSubcategory =
  | "airport-transfers"
  | "taxi"
  | "moto-taxi"
  | "car-rental"
  | "motorbike-rental"
  | "bicycle-rental"
  | "local-buses";

/**
 * Subcategories for Sports & Activities
 */
export type SportsAndActivitiesSubcategory =
  | "surf-lessons"
  | "surfboard-rentals"
  | "yoga"
  | "gyms"
  | "padel"
  | "beach-tennis"
  | "football"
  | "altinha";

/**
 * Subcategories for Community & Give Back
 */
export type CommunityGiveBackSubcategory =
  | "beach-cleanups"
  | "ngos"
  | "social-projects"
  | "volunteering"
  | "community-initiatives"
  | "other-nomad-communities";

/**
 * Contextual discovery tag identifiers.
 * Represents specific user intents (e.g. Wi-Fi, daily meal specials, sunset views).
 */
export type ContextualTagSlug =
  | "remote-work-friendly"
  | "wifi"
  | "power-outlets"
  | "daily-meal-pf"
  | "vegan-options"
  | "sunset-views"
  | "date-night"
  | "live-music"
  | "weekday-nightlife"
  | "cold-beer"
  | "espresso-martini"
  | "pet-friendly"
  | "quiet-space"
  | "ocean-view";

/**
 * Contextual discovery tag metadata.
 */
export interface ContextualTag {
  slug: ContextualTagSlug;
  name: string;
  description: string;
}

/**
 * Category metadata interface.
 */
export interface DiscoveryCategory {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  highlightBadge: string;
  displayOrder: number;
  isActive: boolean;
}

/**
 * Predefined catalog of contextual discovery tags.
 */
export const CONTEXTUAL_TAGS: Record<ContextualTagSlug, ContextualTag> = {
  "remote-work-friendly": {
    slug: "remote-work-friendly",
    name: "Remote Work Friendly",
    description: "Suitable environment for laptop work with verified comfort and connectivity",
  },
  wifi: {
    slug: "wifi",
    name: "Wi-Fi",
    description: "Reliable internet connectivity verified for remote work",
  },
  "power-outlets": {
    slug: "power-outlets",
    name: "Power Outlets",
    description: "Accessible electrical sockets available for laptops and devices",
  },
  "daily-meal-pf": {
    slug: "daily-meal-pf",
    name: "Daily Meal / PF",
    description: "Affordable Brazilian prato feito and daily lunchtime specials",
  },
  "vegan-options": {
    slug: "vegan-options",
    name: "Vegan Options",
    description: "Dedicated plant-based meals and dairy-free options available",
  },
  "sunset-views": {
    slug: "sunset-views",
    name: "Sunset Views",
    description: "Prime vantage point for Praia da Pipa cliff and ocean sunsets",
  },
  "date-night": {
    slug: "date-night",
    name: "Date Night",
    description: "Intimate and atmospheric setting suitable for an evening date",
  },
  "live-music": {
    slug: "live-music",
    name: "Live Music",
    description: "Live musical performances such as forró, samba, or acoustic sessions",
  },
  "weekday-nightlife": {
    slug: "weekday-nightlife",
    name: "Weekday Nightlife",
    description: "Active evening and late-night venue during Monday through Thursday",
  },
  "cold-beer": {
    slug: "cold-beer",
    name: "Cold Beer",
    description: "Consistently chilled cerveja estúpida (properly cold draft or bottle)",
  },
  "espresso-martini": {
    slug: "espresso-martini",
    name: "Espresso Martini",
    description: "Freshly prepared espresso martini cocktails",
  },
  "pet-friendly": {
    slug: "pet-friendly",
    name: "Pet Friendly",
    description: "Welcoming to dogs and companion pets",
  },
  "quiet-space": {
    slug: "quiet-space",
    name: "Quiet Space",
    description: "Low-noise environment suitable for calls or focused thinking",
  },
  "ocean-view": {
    slug: "ocean-view",
    name: "Ocean View",
    description: "Direct scenic visual of the Atlantic coastline or cliffs",
  },
};
