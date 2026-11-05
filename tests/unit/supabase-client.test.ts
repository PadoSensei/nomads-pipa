import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock next/headers for node/vitest unit testing environment
const mockCookieStore = {
  getAll: vi.fn(() => [{ name: "sb-mock-token", value: "abc" }]),
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => mockCookieStore),
}));

describe("Supabase Client Factories", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    mockCookieStore.getAll.mockClear();
    mockCookieStore.set.mockClear();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("Browser Client (lib/supabase/client.ts)", () => {
    it("throws a descriptive error when required environment variables are missing", async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const { createClient } = await import("@/lib/supabase/client");

      expect(() => createClient()).toThrow(
        /Missing Supabase browser environment variables/
      );
    });

    it("creates browser client successfully when environment variables are set", async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://mock-project.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key";

      const { createClient } = await import("@/lib/supabase/client");
      const client = createClient();

      expect(client).toBeDefined();
      expect(typeof client.from).toBe("function");
      expect(typeof client.auth.getSession).toBe("function");
    });
  });

  describe("Server Client (lib/supabase/server.ts)", () => {
    it("throws a descriptive error when required environment variables are missing", async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const { createClient } = await import("@/lib/supabase/server");

      await expect(createClient()).rejects.toThrow(
        /Missing Supabase server environment variables/
      );
    });

    it("creates server client with Next.js cookie adapters when environment variables are set", async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://mock-project.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key";

      const { createClient } = await import("@/lib/supabase/server");
      const client = await createClient();

      expect(client).toBeDefined();
      expect(typeof client.from).toBe("function");
      expect(typeof client.auth.getUser).toBe("function");
    });

    it("safely handles Server Component read-only cookie stores without throwing", async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://mock-project.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key";

      // Mock set throwing as it does in React Server Component rendering
      mockCookieStore.set.mockImplementationOnce(() => {
        throw new Error("Cookies can only be modified in a Server Action or Route Handler.");
      });

      const { createClient } = await import("@/lib/supabase/server");
      const client = await createClient();

      expect(client).toBeDefined();
    });
  });
});
