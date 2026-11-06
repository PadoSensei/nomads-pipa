import type enMessages from "@/messages/en.json";

export type DirectoryMessageKey =
  keyof typeof enMessages.Directory;

export type SubcategoryKey =
  keyof typeof enMessages.Directory.subcategories;

export type TagKey =
  keyof typeof enMessages.Directory.tags;

export function isKnownSubcategory(sub: string): sub is SubcategoryKey {
  return [
    "cafes",
    "restaurants",
    "bars",
    "daily-meals-pf",
    "pousadas",
    "hostels",
    "houses",
    "apartments",
  ].includes(sub);
}

export function isKnownTag(tag: string): tag is TagKey {
  return [
    "wifi",
    "power-outlets",
    "daily-meal-pf",
    "sunset-views",
    "remote-work-friendly",
    "quiet-space",
    "pet-friendly",
    "ocean-view",
    "date-night",
    "cold-beer",
    "vegan-options",
    "live-music",
    "weekday-nightlife",
    "espresso-martini",
  ].includes(tag);
}
