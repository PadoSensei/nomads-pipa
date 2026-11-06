import { CONTEXTUAL_TAGS, type ContextualTagSlug } from "./categories";
import type { BusinessFilterOptions } from "./service";

export const VALID_CONTEXTUAL_TAGS = new Set<string>(Object.keys(CONTEXTUAL_TAGS));

/**
 * Parses search parameters into validated BusinessFilterOptions.
 * Standard format:
 * - `tags`: comma-separated tag slugs, e.g. "wifi,power-outlets"
 * - `subcategory`: single subcategory string, e.g. "cafes"
 *
 * Invalid/unknown tags are discarded safely.
 */
export function parseDirectoryFilterParams(
  searchParams: Record<string, string | string[] | undefined> | URLSearchParams
): BusinessFilterOptions {
  let tagsRaw: string | undefined;
  let subcategoryRaw: string | undefined;

  if (searchParams instanceof URLSearchParams) {
    tagsRaw = searchParams.get("tags") || undefined;
    subcategoryRaw = searchParams.get("subcategory") || undefined;
  } else {
    const rawTagVal = searchParams.tags;
    tagsRaw = Array.isArray(rawTagVal) ? rawTagVal[0] : rawTagVal;
    const rawSubcategoryVal = searchParams.subcategory;
    subcategoryRaw = Array.isArray(rawSubcategoryVal)
      ? rawSubcategoryVal[0]
      : rawSubcategoryVal;
  }

  const tags: ContextualTagSlug[] = [];
  if (tagsRaw) {
    const segments = tagsRaw.split(",").map((s) => s.trim().toLowerCase());
    for (const tag of segments) {
      if (VALID_CONTEXTUAL_TAGS.has(tag)) {
        if (!tags.includes(tag as ContextualTagSlug)) {
          tags.push(tag as ContextualTagSlug);
        }
      }
    }
  }

  const subcategory =
    subcategoryRaw && subcategoryRaw.trim() !== ""
      ? subcategoryRaw.trim().toLowerCase()
      : undefined;

  const result: BusinessFilterOptions = {};
  if (tags.length > 0) {
    result.tags = tags;
  }
  if (subcategory) {
    result.subcategory = subcategory;
  }

  return result;
}

/**
 * Builds a query string or relative URL path for updated filter selections.
 */
export function buildFilterQueryString(filters: BusinessFilterOptions): string {
  const params = new URLSearchParams();

  if (filters.subcategory) {
    params.set("subcategory", filters.subcategory);
  }

  if (filters.tags && filters.tags.length > 0) {
    params.set("tags", filters.tags.join(","));
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Toggles a contextual tag in an array of tags.
 */
export function toggleTagInList(
  currentTags: ContextualTagSlug[] | undefined,
  tagToToggle: ContextualTagSlug
): ContextualTagSlug[] {
  const list = currentTags ? [...currentTags] : [];
  const index = list.indexOf(tagToToggle);
  if (index >= 0) {
    list.splice(index, 1);
  } else {
    list.push(tagToToggle);
  }
  return list;
}
