import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

describe("Supabase Baseline Schema Migration (00001_initial_schema.sql)", () => {
  const migrationPath = resolve(
    process.cwd(),
    "supabase/migrations/00001_initial_schema.sql"
  );
  const sql = readFileSync(migrationPath, "utf-8");

  it("exists and is non-empty", () => {
    expect(sql.length).toBeGreaterThan(0);
  });

  it("enables pgcrypto extension", () => {
    expect(sql).toMatch(/create extension if not exists ["']pgcrypto["']/i);
  });

  it("creates public.profiles linked to auth.users with handle_new_user trigger", () => {
    expect(sql).toMatch(/create table public\.profiles/i);
    expect(sql).toMatch(/references auth\.users\(id\)/i);
    expect(sql).toMatch(/function public\.handle_new_user\(\)/i);
    expect(sql).toMatch(/trigger on_auth_user_created/i);
  });

  it("creates public.categories with hierarchical parent_id", () => {
    expect(sql).toMatch(/create table public\.categories/i);
    expect(sql).toMatch(/parent_id uuid references public\.categories\(id\)/i);
  });

  it("creates public.businesses with category foreign key and JSONB opening_hours", () => {
    expect(sql).toMatch(/create table public\.businesses/i);
    expect(sql).toMatch(/category_id uuid references public\.categories\(id\)/i);
    expect(sql).toMatch(/opening_hours jsonb/i);
  });

  it("defines decoupled statuses on public.businesses per lib/content/status.ts", () => {
    // listing_status check constraint
    expect(sql).toMatch(
      /check\s*\(\s*listing_status in \('draft', 'pending_review', 'published', 'archived'\)\)/i
    );
    // partner_status check constraint
    expect(sql).toMatch(
      /check\s*\(\s*partner_status in \('none', 'pending', 'approved', 'suspended'\)\)/i
    );
    // verification_status check constraint
    expect(sql).toMatch(
      /check\s*\(\s*verification_status in \('unverified', 'pending_verification', 'verified'\)\)/i
    );
    // visibility check constraint
    expect(sql).toMatch(
      /check\s*\(\s*visibility in \('public', 'members_only', 'hidden'\)\)/i
    );
  });

  it("creates public.business_members join table with role and status constraints", () => {
    expect(sql).toMatch(/create table public\.business_members/i);
    expect(sql).toMatch(/business_id uuid not null references public\.businesses\(id\)/i);
    expect(sql).toMatch(/user_id uuid not null references public\.profiles\(id\)/i);
    expect(sql).toMatch(/check\s*\(\s*role in \('owner', 'manager', 'staff'\)\)/i);
    expect(sql).toMatch(/check\s*\(\s*status in \('pending', 'active', 'revoked'\)\)/i);
    expect(sql).toMatch(/unique\s*\(\s*business_id,\s*user_id\s*\)/i);
  });

  it("creates normalized M:N taxonomy tables (business_tags & business_tag_assignments)", () => {
    expect(sql).toMatch(/create table public\.business_tags/i);
    expect(sql).toMatch(/create table public\.business_tag_assignments/i);
    expect(sql).toMatch(/primary key\s*\(\s*business_id,\s*tag_id\s*\)/i);
  });

  it("enables Row Level Security (RLS) on all defined tables", () => {
    expect(sql).toMatch(/alter table public\.profiles enable row level security;/i);
    expect(sql).toMatch(/alter table public\.categories enable row level security;/i);
    expect(sql).toMatch(/alter table public\.businesses enable row level security;/i);
    expect(sql).toMatch(/alter table public\.business_members enable row level security;/i);
    expect(sql).toMatch(/alter table public\.business_tags enable row level security;/i);
    expect(sql).toMatch(/alter table public\.business_tag_assignments enable row level security;/i);
  });

  it("defines baseline read policies for published businesses and active categories", () => {
    expect(sql).toMatch(/create policy ["']Published businesses are viewable by everyone["']/i);
    expect(sql).toMatch(/listing_status = 'published'/i);
    expect(sql).toMatch(/visibility = 'public'/i);
    expect(sql).toMatch(/create policy ["']Active categories are viewable by everyone["']/i);
  });
});
