import type { BusinessListing } from "./businesses";
import type { CategorySlug } from "./categories";
import { demoFixtures } from "./demo-fixtures";
import type { BusinessFilterOptions, ContentService } from "./service";

/**
 * Predicate to check if a business satisfies the given filter options.
 * Tags are filtered using intersection/AND semantics (business must possess all specified tags).
 */
export function matchesBusinessFilters(
  business: BusinessListing,
  filters?: BusinessFilterOptions
): boolean {
  if (!filters) return true;

  if (filters.subcategory) {
    if (business.subcategory !== filters.subcategory) {
      return false;
    }
  }

  if (filters.tags && filters.tags.length > 0) {
    const businessTags = new Set(business.tags);
    const hasAllTags = filters.tags.every((tag) => businessTags.has(tag));
    if (!hasAllTags) {
      return false;
    }
  }

  return true;
}

/**
 * Fixture-backed implementation of the ContentService contract.
 * Queries lib/content/demo-fixtures.ts without mutating fixture data.
 */
export class FixtureContentAdapter implements ContentService {
  private getSource(): BusinessListing[] {
    // Return shallow copies to prevent accidental mutation of source fixtures
    return demoFixtures.businesses.map((b) => ({ ...b, tags: [...b.tags] }));
  }

  async getBusinessBySlug(slug: string): Promise<BusinessListing | undefined> {
    const list = this.getSource();
    return list.find((b) => b.slug === slug);
  }

  async getBusinessesByCategory(
    categorySlug: CategorySlug | string,
    filters?: BusinessFilterOptions
  ): Promise<BusinessListing[]> {
    const list = this.getSource();
    return list.filter(
      (b) => b.category === categorySlug && matchesBusinessFilters(b, filters)
    );
  }

  async getAllBusinesses(filters?: BusinessFilterOptions): Promise<BusinessListing[]> {
    const list = this.getSource();
    return list.filter((b) => matchesBusinessFilters(b, filters));
  }
}
