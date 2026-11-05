-- ============================================================================
-- NP-021: Baseline Database Migrations & Initial Schema
-- Order of execution:
--   1. Extensions (pgcrypto)
--   2. Profiles table (linked to auth.users) + handle_new_user() trigger
--   3. Categories table (hierarchical with parent_id)
--   4. Businesses table (with category_id, opening_hours jsonb, decoupled statuses)
--   5. Business members join table (owner, manager, staff)
--   6. Business tags & tag assignments (normalized M:N taxonomy)
--   7. Row Level Security (RLS) enabled on all tables with baseline policies
--   8. Indexes for performance
-- ============================================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. PROFILES TABLE & AUTH TRIGGER
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    display_name text,
    avatar_url text,
    email text,
    phone text,
    country text,
    profile_type text not null default 'visitor'
        check (profile_type in ('visitor', 'resident', 'other')),
    platform_role text not null default 'user'
        check (platform_role in ('user', 'admin')),
    preferred_language text not null default 'en',
    onboarding_completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Trigger function to automatically create a profile row for new auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id,
        display_name,
        email,
        avatar_url,
        preferred_language
    )
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        new.email,
        new.raw_user_meta_data->>'avatar_url',
        coalesce(new.raw_user_meta_data->>'preferred_language', 'en')
    );
    return new;
end;
$$;

create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- 3. CATEGORIES TABLE
create table public.categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    description text,
    icon text,
    parent_id uuid references public.categories(id) on delete set null,
    display_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now()
);

-- 4. BUSINESSES TABLE
-- Note: Decoupled lifecycle statuses per lib/content/status.ts:
-- - listing_status: 'draft', 'pending_review', 'published', 'archived'
-- - partner_status: 'none', 'pending', 'approved', 'suspended'
-- - verification_status: 'unverified', 'pending_verification', 'verified'
-- - visibility: 'public', 'members_only', 'hidden'
create table public.businesses (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    description text,
    category_id uuid references public.categories(id) on delete set null,
    subcategory text,
    address text,
    latitude numeric(10, 7),
    longitude numeric(10, 7),
    whatsapp text,
    phone text,
    email text,
    website text,
    instagram text,
    cover_image_url text,
    logo_url text,
    opening_hours jsonb not null default '{}'::jsonb,
    price_level text check (price_level is null or price_level in ('$', '$$', '$$$', '$$$$')),
    listing_status text not null default 'draft'
        check (listing_status in ('draft', 'pending_review', 'published', 'archived')),
    partner_status text not null default 'none'
        check (partner_status in ('none', 'pending', 'approved', 'suspended')),
    verification_status text not null default 'unverified'
        check (verification_status in ('unverified', 'pending_verification', 'verified')),
    visibility text not null default 'public'
        check (visibility in ('public', 'members_only', 'hidden')),
    has_wifi boolean not null default false,
    has_power_outlets boolean not null default false,
    is_pet_friendly boolean not null default false,
    is_demo boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (latitude is null or (latitude between -90 and 90)),
    check (longitude is null or (longitude between -180 and 180))
);

-- 5. BUSINESS MEMBERS JOIN TABLE
create table public.business_members (
    id uuid primary key default gen_random_uuid(),
    business_id uuid not null references public.businesses(id) on delete cascade,
    user_id uuid not null references public.profiles(id) on delete cascade,
    role text not null check (role in ('owner', 'manager', 'staff')),
    status text not null default 'active' check (status in ('pending', 'active', 'revoked')),
    created_at timestamptz not null default now(),
    unique (business_id, user_id)
);

-- 6. BUSINESS TAGS & ASSIGNMENTS (NORMALIZED M:N TAXONOMY)
create table public.business_tags (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    description text,
    created_at timestamptz not null default now()
);

create table public.business_tag_assignments (
    business_id uuid not null references public.businesses(id) on delete cascade,
    tag_id uuid not null references public.business_tags(id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (business_id, tag_id)
);

-- 7. PERFORMANCE INDEXES
create index idx_categories_parent_id on public.categories(parent_id);
create index idx_categories_slug on public.categories(slug);
create index idx_businesses_category_id on public.businesses(category_id);
create index idx_businesses_slug on public.businesses(slug);
create index idx_businesses_listing_status on public.businesses(listing_status);
create index idx_businesses_partner_status on public.businesses(partner_status);
create index idx_businesses_verification_status on public.businesses(verification_status);
create index idx_businesses_visibility on public.businesses(visibility);
create index idx_business_members_user on public.business_members(user_id, status);
create index idx_business_members_business on public.business_members(business_id, status);
create index idx_business_tags_slug on public.business_tags(slug);
create index idx_business_tag_assignments_tag_id on public.business_tag_assignments(tag_id);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.business_tags enable row level security;
alter table public.business_tag_assignments enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
    on public.profiles
    for select
    to anon, authenticated
    using (true);

create policy "Users can update their own profile"
    on public.profiles
    for update
    to authenticated
    using (id = (select auth.uid()))
    with check (id = (select auth.uid()));

-- Categories policies (public read active)
create policy "Active categories are viewable by everyone"
    on public.categories
    for select
    to anon, authenticated
    using (is_active = true);

-- Businesses policies
-- Public users can read published, publicly-visible listings
create policy "Published businesses are viewable by everyone"
    on public.businesses
    for select
    to anon, authenticated
    using (
        listing_status = 'published'
        and visibility = 'public'
    );

-- Business members can view their own business regardless of publication status
create policy "Members can view assigned business"
    on public.businesses
    for select
    to authenticated
    using (
        exists (
            select 1 from public.business_members bm
            where bm.business_id = public.businesses.id
              and bm.user_id = (select auth.uid())
              and bm.status = 'active'
        )
    );

-- Business members policies
create policy "Users can read own memberships"
    on public.business_members
    for select
    to authenticated
    using (user_id = (select auth.uid()));

-- Tags and assignments policies (public read-only)
create policy "Business tags are viewable by everyone"
    on public.business_tags
    for select
    to anon, authenticated
    using (true);

create policy "Business tag assignments are viewable by everyone"
    on public.business_tag_assignments
    for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.businesses b
            where b.id = public.business_tag_assignments.business_id
              and b.listing_status = 'published'
              and b.visibility = 'public'
        )
    );
