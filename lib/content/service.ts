import type { BusinessListing } from "./businesses";
import type { CategorySlug, ContextualTagSlug } from "./categories";

/**
 * Filter criteria for business queries.
 */
export interface BusinessFilterOptions {
  tags?: ContextualTagSlug[];
  subcategory?: string;
}

/**
 * Contract for directory content retrieval operations.
 * Allows decoupling UI presentation from fixtures or Supabase adapters.
 */
export interface ContentService {
  /**
   * Retrieves a single business listing by its slug.
   * Returns undefined if no business matches the slug.
   */
  getBusinessBySlug(slug: string): Promise<BusinessListing | undefined>;

  /**
   * Retrieves all businesses within a category matching optional filters.
   * Multiple tags are evaluated with intersection/AND semantics.
   */
  getBusinessesByCategory(
    categorySlug: CategorySlug | string,
    filters?: BusinessFilterOptions
  ): Promise<BusinessListing[]>;

  /**
   * Retrieves all businesses across all categories matching optional filters.
   */
  getAllBusinesses(filters?: BusinessFilterOptions): Promise<BusinessListing[]>;
}
