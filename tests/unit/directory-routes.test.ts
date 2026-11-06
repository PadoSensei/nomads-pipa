import { describe, expect, it } from "vitest";
import { generateMetadata as generateCategoryMetadata } from "@/app/[locale]/category/[slug]/page";
import { generateMetadata as generateBusinessMetadata } from "@/app/[locale]/business/[slug]/page";
import { demoBusinessCafe } from "@/lib/content/demo-fixtures";

describe("Route Metadata Generation", () => {
  it("category route generates dynamic metadata for valid category", async () => {
    const meta = await generateCategoryMetadata({
      params: Promise.resolve({ slug: "food-and-drink" }),
    });

    expect(meta.title).toBe("Food & Drink — Nomads Pipa");
    expect(meta.description).toContain("dining and cafes");
  });

  it("category route generates fallback metadata for unknown category", async () => {
    const meta = await generateCategoryMetadata({
      params: Promise.resolve({ slug: "unknown-category" }),
    });

    expect(meta.title).toBe("Category");
  });

  it("business route generates dynamic metadata from resolved business", async () => {
    const meta = await generateBusinessMetadata({
      params: Promise.resolve({ slug: demoBusinessCafe.slug }),
    });

    expect(meta.title).toBe(`${demoBusinessCafe.name} — Nomads Pipa`);
    expect(meta.description).toBe(demoBusinessCafe.description);
  });

  it("business route generates fallback metadata for unknown slug", async () => {
    const meta = await generateBusinessMetadata({
      params: Promise.resolve({ slug: "unknown-business-slug" }),
    });

    expect(meta.title).toBe("Business Not Found");
  });
});
