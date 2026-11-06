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
import type { ContentLocale } from "./status";

/**
 * Optional localized translations for discovery categories.
 */
export interface CategoryTranslation {
  name?: string;
  tagline?: string;
  description?: string;
  highlightBadge?: string;
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
  translations?: Partial<Record<ContentLocale, CategoryTranslation>>;
}

/**
 * Predefined catalog of contextual discovery tags.
 */
/**
 * Canonical Discovery Categories Catalog with multilingual translations.
 */
export const DISCOVERY_CATEGORIES: DiscoveryCategory[] = [
  {
    slug: "food-and-drink",
    name: "Food & Drink",
    tagline: "Cafes, daily meals & sunset views",
    description:
      "Curated local dining and cafes in Praia da Pipa. Filter by remote-work friendly cafes with verified Wi-Fi, daily meal specials (prato feito), sunset views, and live music.",
    highlightBadge: "Wi-Fi & Plugs",
    displayOrder: 1,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Comida & Bebida",
        tagline: "Cafés, pratos feitos e pôr do sol",
        description:
          "Gastronomia e cafés selecionados na Praia da Pipa. Filtre por cafés ideais para trabalho remoto com Wi-Fi verificado, prato feito diário, vista para o pôr do sol e música ao vivo.",
        highlightBadge: "Wi-Fi & Tomadas",
      },
      es: {
        name: "Comida & Bebida",
        tagline: "Cafeterías, platos del día y atardeceres",
        description:
          "Gastronomía y cafeterías seleccionadas en Praia da Pipa. Filtra por cafeterías aptas para teletrabajo con Wi-Fi verificado, platos combinados (PF), vistas al atardecer y música en vivo.",
        highlightBadge: "Wi-Fi & Enchufes",
      },
    },
  },
  {
    slug: "events-and-community",
    name: "Events & Community",
    tagline: "Meetups, surf sessions & gatherings",
    description:
      "Stay connected with what is happening in Pipa. Discover official Nomads Pipa meetups, community-vetted gatherings, workshops, and local cultural festivals.",
    highlightBadge: "Meet people today",
    displayOrder: 2,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Eventos & Comunidade",
        tagline: "Encontros, surf e comunidade",
        description:
          "Fique por dentro de tudo o que acontece em Pipa. Descubra encontros oficiais do Nomads Pipa, reuniões comunitárias, workshops e festivais culturais locais.",
        highlightBadge: "Conheça pessoas hoje",
      },
      es: {
        name: "Eventos & Comunidad",
        tagline: "Encuentros, sesiones de surf y reuniones",
        description:
          "Mantente conectado con lo que pasa en Pipa. Descubre encuentros oficiales de Nomads Pipa, reuniones comunitarias, talleres y festivales culturales locales.",
        highlightBadge: "Conoce gente hoy",
      },
    },
  },
  {
    slug: "accommodation",
    name: "Accommodation",
    tagline: "Hostels, pousadas & monthly stays",
    description:
      "Find vetted places to stay in Pipa for days, weeks, or months. Direct partner enquiry workflow connecting you with trusted hostels, pousadas, and private rentals.",
    highlightBadge: "Direct Quotes",
    displayOrder: 3,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Hospedagem",
        tagline: "Hostels, pousadas e estadias mensais",
        description:
          "Encontre locais verificados para se hospedar em Pipa por dias, semanas ou meses. Contato direto com parceiros para hostels, pousadas e aluguéis de temporada confiáveis.",
        highlightBadge: "Orçamento Direto",
      },
      es: {
        name: "Alojamiento",
        tagline: "Hostales, posadas y estancias mensuales",
        description:
          "Encuentra lugares verificados para alojarte en Pipa por días, semanas o meses. Contacto directo con colaboradores para posadas, hostales y alquileres de confianza.",
        highlightBadge: "Presupuesto Directo",
      },
    },
  },
  {
    slug: "transportation",
    name: "Transportation",
    tagline: "Natal transfers, taxis & rentals",
    description:
      "Navigate Pipa and Rio Grande do Norte with ease. Simple 'Get Me a Ride' routing for airport shuttles from Natal, local taxis, moto-taxis, and rental vehicles.",
    highlightBadge: "Get Me a Ride",
    displayOrder: 4,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Transporte",
        tagline: "Transfers de Natal, táxis e aluguéis",
        description:
          "Desloque-se por Pipa e pelo Rio Grande do Norte com facilidade. Opções de transfer do aeroporto de Natal, táxis locais, moto-táxis e aluguel de veículos.",
        highlightBadge: "Chamar Transporte",
      },
      es: {
        name: "Transporte",
        tagline: "Traslados desde Natal, taxis y alquileres",
        description:
          "Muévete por Pipa y Rio Grande do Norte con facilidad. Conexión rápida para traslados desde el aeropuerto de Natal, taxis locales, mototaxis y alquiler de vehículos.",
        highlightBadge: "Pedir Transporte",
      },
    },
  },
  {
    slug: "sports-and-activities",
    name: "Sports & Activities",
    tagline: "Surf, yoga, boat tours & adventures",
    description:
      "Make the most of Pipa's unique nature and coastline. Find surf schools, board rentals, yoga studios, dolphin tours, boat trips, and beach fitness sessions.",
    highlightBadge: "Tide-Aware",
    displayOrder: 5,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Esportes & Atividades",
        tagline: "Surf, yoga, passeios de barco e aventuras",
        description:
          "Aproveite ao máximo a natureza e o litoral de Pipa. Aulas de surf, aluguel de pranchas, estúdios de yoga, passeios com golfinhos e atividades na praia.",
        highlightBadge: "De Acordo com a Maré",
      },
      es: {
        name: "Deportes & Actividades",
        tagline: "Surf, yoga, paseos en barco y aventuras",
        description:
          "Aprovecha al máximo la naturaleza y la costa de Pipa. Escuelas de surf, alquiler de tablas, estudios de yoga, avistamiento de delfines y actividades en la playa.",
        highlightBadge: "Atento a las Mareas",
      },
    },
  },
  {
    slug: "essential-services",
    name: "Essential Services",
    tagline: "Emergency, health, tech repair & Pix",
    description:
      "Reliable and verified local essentials. Fast access to emergency numbers, local medical clinics, pharmacies, laptop repair, laundry, and foreign traveler Pix guidance.",
    highlightBadge: "Verified & Safe",
    displayOrder: 6,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Serviços Essenciais",
        tagline: "Emergência, saúde, reparo técnico e Pix",
        description:
          "Informações e serviços essenciais verificados. Acesso rápido a números de emergência, clínicas médicas locais, farmácias, conserto de notebook, lavanderia e dicas sobre Pix.",
        highlightBadge: "Verificado & Seguro",
      },
      es: {
        name: "Servicios Esenciales",
        tagline: "Urgencias, salud, servicio técnico y Pix",
        description:
          "Servicios esenciales locales confiables y verificados. Acceso rápido a números de emergencia, centros de salud, farmacias, reparación de portátiles, lavandería y consejos sobre Pix.",
        highlightBadge: "Verificado & Seguro",
      },
    },
  },
  {
    slug: "community-give-back",
    name: "Community & Give Back",
    tagline: "Beach cleanups & social initiatives",
    description:
      "Connect with local community projects, social initiatives, and beach cleanups across Praia da Pipa and Tibau do Sul.",
    highlightBadge: "Social Impact",
    displayOrder: 7,
    isActive: true,
    translations: {
      "pt-BR": {
        name: "Comunidade & Voluntariado",
        tagline: "Limpezas de praia e ações sociais",
        description:
          "Conecte-se com projetos comunitários locais, iniciativas sociais e ações de limpeza de praia por toda a Praia da Pipa e Tibau do Sul.",
        highlightBadge: "Impacto Social",
      },
      es: {
        name: "Comunidad & Voluntariado",
        tagline: "Limpiezas de playa e iniciativas sociales",
        description:
          "Conecta con proyectos comunitarios locales, iniciativas sociales y limpiezas de playa en Praia da Pipa y Tibau do Sul.",
        highlightBadge: "Impacto Social",
      },
    },
  },
];

/**
 * Returns a DiscoveryCategory definition by its slug.
 */
export function getCategoryBySlug(
  slug: string
): DiscoveryCategory | undefined {
  return DISCOVERY_CATEGORIES.find((cat) => cat.slug === slug);
}

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
