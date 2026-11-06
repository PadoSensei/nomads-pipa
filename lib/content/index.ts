/**
 * Shared Discovery Content Types
 *
 * Central barrel exports for content definitions, interfaces, type guards,
 * and demo fixtures across Nomads Pipa.
 */

import { FixtureContentAdapter } from "./fixture-adapter";
import type { ContentService } from "./service";

export * from "./status";
export * from "./categories";
export * from "./businesses";
export * from "./events";
export * from "./essential-services";
export * from "./demo-fixtures";
export * from "./localization";
export * from "./service";
export * from "./fixture-adapter";
export * from "./filters";

/**
 * Default content service singleton instance backed by fixture adapter.
 * Future issues can swap this instance for SupabaseContentAdapter without modifying callers.
 */
export const contentService: ContentService = new FixtureContentAdapter();
