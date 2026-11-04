/**
 * Essential Services Content Types for Nomads Pipa
 *
 * Defines models for critical local information (healthcare, emergency, repairs, immigration)
 * extending BaseListing with safety and review metadata.
 */

import type { BaseListing } from "./businesses";

/**
 * Subcategories for Essential Services.
 */
export type EssentialServiceSubcategory =
  | "emergency"
  | "healthcare"
  | "dental"
  | "veterinary"
  | "repairs"
  | "couriers"
  | "laundry"
  | "beauty-wellness"
  | "immigration"
  | "payments";

/**
 * Essential Service listing model extending BaseListing.
 */
export interface EssentialServiceListing extends BaseListing {
  // Category must be essential-services
  category: "essential-services";

  // Detailed essential service subcategory
  essentialSubcategory: EssentialServiceSubcategory;

  // Distinguishes critical emergency services from standard services
  isEmergency: boolean;

  // Dedicated emergency contact phone number if applicable
  emergencyPhone?: string;

  // Date when critical contact details/information were last reviewed
  lastReviewedAt?: string;

  // Verified official governmental, health, or organizational link
  officialSourceUrl?: string;
}

/**
 * Type guard to check if an essential service is an emergency service.
 */
export function isEmergencyService(
  service: EssentialServiceListing
): boolean {
  return service.isEmergency;
}
