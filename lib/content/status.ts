/**
 * Content Status and Visibility Types for Nomads Pipa
 *
 * Distinguishes between publication lifecycle, audience visibility,
 * commercial partner status, and factual verification status.
 */

/**
 * Editorial lifecycle state of content.
 */
export type PublicationStatus =
  | "draft"
  | "pending_review"
  | "published"
  | "archived";

/**
 * Audience access and visibility restriction.
 */
export type VisibilityStatus = "public" | "members_only" | "hidden";

/**
 * Event-specific lifecycle state, extending publication lifecycle with cancellation.
 */
export type EventLifecycleStatus = PublicationStatus | "cancelled";

/**
 * Commercial partnership standing between Nomads Pipa and a business/venue.
 * Kept completely decoupled from verification status.
 */
export type PartnerStatus = "none" | "pending" | "approved" | "suspended";

/**
 * Accuracy and vetting status of claims and directory details.
 * Kept completely decoupled from partner status.
 */
export type VerificationStatus =
  | "unverified"
  | "pending_verification"
  | "verified";

/**
 * Type guard to check if content is in a published state.
 */
export function isPublished(
  status: PublicationStatus | EventLifecycleStatus
): boolean {
  return status === "published";
}

/**
 * Type guard to check if content is publicly visible.
 */
export function isPubliclyVisible(visibility: VisibilityStatus): boolean {
  return visibility === "public";
}

/**
 * Type guard to check if a partner is officially approved.
 */
export function isApprovedPartner(status: PartnerStatus): boolean {
  return status === "approved";
}

/**
 * Type guard to check if content/listing details have been verified.
 */
export function isVerified(status: VerificationStatus): boolean {
  return status === "verified";
}
