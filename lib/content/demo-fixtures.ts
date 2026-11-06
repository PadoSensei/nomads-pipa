/**
 * Demo Fixtures for Nomads Pipa
 *
 * Clearly labeled fictional demo content used strictly for interface development and testing.
 *
 * NOTICE:
 * All records here are strictly fictional placeholder fixtures (`isDemo: true`).
 * They DO NOT represent real Pipa businesses, real emergency contacts, real prices,
 * real event dates, or real verification claims.
 */

import type { BusinessListing } from "./businesses";
import type { EssentialServiceListing } from "./essential-services";
import type { EventListing } from "./events";

/**
 * Demo Business 1: Remote-work cafe and coworking space
 * Demonstrates: approved partner, verified workspace claims, tags.
 */
export const demoBusinessCafe: BusinessListing = {
  id: "demo-bus-001",
  name: "[DEMO] Coastal Nomad Workspace & Cafe",
  slug: "demo-coastal-nomad-workspace-cafe",
  description:
    "Fictional demo workspace offering oceanfront desks, high-speed fiber internet, and artisan coffee.",
  category: "food-and-drink",
  subcategory: "cafes",
  address: "Demo Rua Principal, 100, Praia da Pipa (Fictional)",
  location: {
    latitude: -6.2305,
    longitude: -35.0512,
  },
  contact: {
    whatsapp: "+55 84 99999-0001",
    email: "contact@demo-coastalnomad.example.com",
    website: "https://demo-coastalnomad.example.com",
    instagram: "@demo_coastalnomad",
  },
  coverImageUrl: "/images/demo-cafe-cover.webp",
  logoUrl: "/images/demo-cafe-logo.webp",
  publicationStatus: "published",
  visibility: "public",
  partnerStatus: "approved",
  verificationStatus: "verified",
  tags: [
    "remote-work-friendly",
    "wifi",
    "power-outlets",
    "ocean-view",
    "cold-beer",
    "quiet-space",
  ],
  priceLevel: "$$",
  openingHours: {
    monday: { open: "08:00", close: "19:00" },
    tuesday: { open: "08:00", close: "19:00" },
    wednesday: { open: "08:00", close: "19:00" },
    thursday: { open: "08:00", close: "19:00" },
    friday: { open: "08:00", close: "20:00" },
    saturday: { open: "09:00", close: "18:00" },
    sunday: { open: "10:00", close: "16:00" },
  },
  hasWifi: true,
  wifiSpeed: 250,
  hasPowerOutlets: true,
  isPetFriendly: true,
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Business 3: Clifftop Sunset Lounge & Bar
 * Demonstrates: sunset-views, partner venue, pet friendly, evening hours.
 */
export const demoBusinessSunsetLounge: BusinessListing = {
  id: "demo-bus-003",
  name: "[DEMO] Mirante Sunset Lounge & Tapas",
  slug: "demo-mirante-sunset-lounge-tapas",
  description:
    "Fictional cliffside bar and terrace overlooking Praia do Amor, featuring artisanal tapas, cocktails, and panoramic sunset views.",
  category: "food-and-drink",
  subcategory: "bars",
  address: "Demo Rua do Mirante, 20, Praia da Pipa (Fictional)",
  location: {
    latitude: -6.2345,
    longitude: -35.0489,
  },
  contact: {
    whatsapp: "+55 84 99999-0003",
    instagram: "@demo_mirante_sunset",
  },
  coverImageUrl: "/images/demo-sunset-cover.webp",
  publicationStatus: "published",
  visibility: "public",
  partnerStatus: "approved",
  verificationStatus: "verified",
  tags: ["wifi", "sunset-views", "ocean-view", "date-night", "cold-beer"],
  priceLevel: "$$$",
  openingHours: {
    monday: { open: "16:00", close: "23:00" },
    tuesday: { open: "16:00", close: "23:00" },
    wednesday: { open: "16:00", close: "23:00" },
    thursday: { open: "16:00", close: "23:00" },
    friday: { open: "15:30", close: "00:00" },
    saturday: { open: "15:30", close: "00:00" },
    sunday: { open: "15:30", close: "23:00" },
  },
  hasWifi: true,
  wifiSpeed: 80,
  hasPowerOutlets: false,
  isPetFriendly: true,
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Business 4: Boutique Pousada & Garden Workspace (Accommodation)
 * Demonstrates: accommodation category, quiet-space, wifi, power-outlets.
 */
export const demoBusinessPousada: BusinessListing = {
  id: "demo-bus-004",
  name: "[DEMO] Pousada Jardim Secreto & Nomad Suites",
  slug: "demo-pousada-jardim-secreto-nomad-suites",
  description:
    "Fictional serene boutique pousada surrounded by Atlantic rainforest gardens with dedicated work desks in every suite.",
  category: "accommodation",
  subcategory: "pousadas",
  address: "Demo Rua das Borboletas, 8, Praia da Pipa (Fictional)",
  location: {
    latitude: -6.228,
    longitude: -35.056,
  },
  contact: {
    whatsapp: "+55 84 99999-0004",
    email: "reservas@demo-jardimsecreto.example.com",
    website: "https://demo-jardimsecreto.example.com",
    instagram: "@demo_jardimsecreto_pipa",
  },
  coverImageUrl: "/images/demo-pousada-cover.webp",
  publicationStatus: "published",
  visibility: "public",
  partnerStatus: "approved",
  verificationStatus: "verified",
  tags: ["remote-work-friendly", "wifi", "power-outlets", "quiet-space", "pet-friendly"],
  priceLevel: "$$$",
  hasWifi: true,
  wifiSpeed: 300,
  hasPowerOutlets: true,
  isPetFriendly: true,
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Business 2: Traditional Brazilian meal restaurant
 * Demonstrates: non-partner listing, unverified claim, daily meal tag.
 */
export const demoBusinessRestaurant: BusinessListing = {
  id: "demo-bus-002",
  name: "[DEMO] Dona Maria Pipa Daily Specials & PF",
  slug: "demo-dona-maria-pipa-daily-specials-pf",
  description:
    "Fictional demo local eatery serving traditional Brazilian prato feito and wholesome daily meal prep.",
  category: "food-and-drink",
  subcategory: "daily-meals-pf",
  address: "Demo Avenida Baía dos Golfinhos, 50, Praia da Pipa (Fictional)",
  location: {
    latitude: -6.2291,
    longitude: -35.0534,
  },
  contact: {
    phone: "+55 84 99999-0002",
    whatsapp: "+55 84 99999-0002",
  },
  publicationStatus: "published",
  visibility: "public",
  partnerStatus: "none",
  verificationStatus: "unverified",
  tags: ["daily-meal-pf", "vegan-options"],
  priceLevel: "$",
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Event 1: Nomads Pipa Meet-up (Official)
 */
export const demoOfficialMeetupEvent: EventListing = {
  id: "demo-evt-001",
  title: "[DEMO] Nomads Pipa Friday Sunset Coworking & Mixer",
  slug: "demo-nomads-pipa-friday-sunset-coworking-mixer",
  description:
    "Fictional official community meetup to wrap up the week, meet fellow remote workers, and watch the Atlantic sunset.",
  eventType: "official_meetup",
  startsAt: "2025-10-17T17:00:00-03:00",
  endsAt: "2025-10-17T20:00:00-03:00",
  locationName: "Praia do Amor Clifftop Viewpoint (Fictional)",
  address: "Demo Chapadão Viewpoint, Praia da Pipa (Fictional)",
  organizerName: "Nomads Pipa Community Team",
  contact: {
    whatsapp: "+55 84 99999-0010",
  },
  priceDescription: "Free community gathering (BYO refreshments)",
  lifecycleStatus: "published",
  visibility: "public",
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Event 2: Community Pick (Third-party event with community members attending)
 */
export const demoCommunityPickEvent: EventListing = {
  id: "demo-evt-002",
  title: "[DEMO] Acoustic Forró Night at Praia Centro",
  slug: "demo-acoustic-forro-night-praia-centro",
  description:
    "Fictional third-party live music event where several Nomads Pipa community members have confirmed attendance.",
  eventType: "community_pick",
  startsAt: "2025-10-18T20:00:00-03:00",
  endsAt: "2025-10-19T01:00:00-03:00",
  locationName: "Demo Cultural Tavern Pipa (Fictional)",
  address: "Demo Rua do Céu, 15, Praia da Pipa (Fictional)",
  organizerName: "Demo Pipa Cultural Producers",
  externalBookingUrl: "https://demo-event-tickets.example.com/forro",
  priceDescription: "R$ 20 cover at the door",
  lifecycleStatus: "published",
  visibility: "public",
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Event 3: City Event (General local or cultural event)
 */
export const demoCityEvent: EventListing = {
  id: "demo-evt-003",
  title: "[DEMO] Pipa Cultural Fishermen Heritage Festival",
  slug: "demo-pipa-cultural-fishermen-heritage-festival",
  description:
    "Fictional annual city and municipal cultural celebration honoring the traditional fishing heritage of Praia da Pipa.",
  eventType: "city_event",
  startsAt: "2025-11-01T14:00:00-03:00",
  endsAt: "2025-11-01T22:00:00-03:00",
  locationName: "Praia do Centro Harbor Area (Fictional)",
  organizerName: "Demo Municipal Secretariat of Culture",
  priceDescription: "Public and open to everyone",
  lifecycleStatus: "published",
  visibility: "public",
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Demo Essential Service: 24/7 Community First Aid Post & Health Clinic
 */
export const demoEssentialService: EssentialServiceListing = {
  id: "demo-svc-001",
  name: "[DEMO] 24/7 Community First Aid Post & Health Clinic",
  slug: "demo-24-7-community-first-aid-post-health-clinic",
  description:
    "Fictional demonstration listing showing the data structure for an emergency healthcare provider.",
  category: "essential-services",
  essentialSubcategory: "emergency",
  address: "Demo Rodovia RN-003, Km 12, Tibau do Sul - RN (Fictional)",
  location: {
    latitude: -6.215,
    longitude: -35.06,
  },
  contact: {
    phone: "+55 84 99999-0099",
  },
  publicationStatus: "published",
  visibility: "public",
  verificationStatus: "verified",
  isEmergency: true,
  emergencyPhone: "192 (SAMU Brazil) / Demo Clinic: +55 84 99999-0099",
  lastReviewedAt: "2025-01-01T00:00:00Z",
  officialSourceUrl: "https://demo-health-prefeitura.example.gov.br",
  isDemo: true,
  createdAt: "2025-01-01T12:00:00Z",
  updatedAt: "2025-01-01T12:00:00Z",
};

/**
 * Collective demo fixtures object for development, mocking, and testing.
 */
export const demoFixtures = {
  businesses: [
    demoBusinessCafe,
    demoBusinessRestaurant,
    demoBusinessSunsetLounge,
    demoBusinessPousada,
  ],
  events: [
    demoOfficialMeetupEvent,
    demoCommunityPickEvent,
    demoCityEvent,
  ],
  essentialServices: [demoEssentialService],
};
