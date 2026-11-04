# Nomads Pipa — Foundation Alignment Review Report

**Review Date:** November 4, 2026
**Auditor:** Jules (AI Software Engineer)
**Repository Branch:** `master` (reviewed on working branch `jules-12787059480981255939-cb95aaaf`, tracked to `origin/master`)
**Commit SHA:** `b542b588d21cce374cc08fdee3e96ff499c112fa`
**Working-Tree Status at Audit Inception:** Clean (0 uncommitted files, 0 untracked files)
**Standard References:** WCAG 2.2 Level AA Target, Next.js 16 App Router, TypeScript 5, Tailwind CSS v4, `next-intl` v4

---

## 1. Executive Summary

### 1.1 Purpose and Audit Scope
This systematic alignment review evaluates the Nomads Pipa repository against product requirements, architectural specifications, design guidelines, and completed engineering issues. The primary objective is to establish an unvarnished, evidence-based baseline of what is genuinely implemented, verified, partially built, or merely planned before embarking on subsequent development milestones.

The scope encompassed:
1. **Document Analysis:** 24 architectural, design, operational, and product specification files in `docs/` alongside root operational guidelines (`README.md`, `AGENTS.md`).
2. **Issue and Task Verification:** Implementation and acceptance criteria for completed foundation tasks (NP-001, NP-002, NP-003, NP-016, NP-017, and NP-019).
3. **Requirement Classification:** Granular classification of all Must-Have capabilities and grouped Should/Could requirements from `docs/MVP_SCOPE.md` and `docs/FEATURES.md`.
4. **Cross-Project Consistency & Focus Audits:** Product completeness (Traffic Router, QR loops, partner workflows), Supabase/database architectural readiness, data model alignment between TypeScript types and relational schemas, task synergy/regressions across i18n, design tokens, and accessibility, solo-developer cognitive load, and documentation reliability.

### 1.2 High-Level Summary of Current State
- **Solid Modern Web Foundations:** The repository possesses a robust, modern Next.js 16 (Turbopack, Cache Components, React 19) shell with Tailwind CSS v4 design tokens, Google Fonts (Inter and Sora), and comprehensive internationalisation infrastructure (`next-intl`) supporting English (`en`), Brazilian Portuguese (`pt-BR`), and Spanish (`es`) with cookie/header-based locale negotiation via `proxy.ts`.
- **Decoupled TypeScript Content Definitions:** High-quality modular domain types live in `lib/content/`, defining independent, orthogonal dimensions for publication lifecycle (`draft | pending_review | published | archived`), audience visibility (`public | members_only | hidden`), commercial partnership (`none | pending | approved | suspended`), and factual verification (`unverified | pending_verification | verified`), accompanied by localized fallback helpers and realistic fictional demo fixtures.
- **Passing Automated Quality Checks:** The project currently passes linting (`pnpm lint`), strict TypeScript type checking (`pnpm typecheck`), static build optimization (`pnpm build` across 49 prerendered routes), and unit tests (`pnpm test` passing 33/33 tests across 5 test suites in Vitest).
- **Core Gap — Discovery Experience Is a Static Prototype:** Despite having category routing (`/category/[slug]`), about, community, partner, and events pages, **none** of the application pages or UI components consume the rich content models or demo fixtures in `lib/content/`. Every page currently renders static placeholder text with hardcoded English strings.
- **Core Gap — Zero Backend Implementation:** There is currently **zero Supabase code or configuration** in the repository. The `@supabase/supabase-js` and `@supabase/ssr` packages are not installed, there is no `supabase/` migrations directory, no `.env.example` file, no database clients, and no server-side authentication or RLS enforcement.
- **Core Gap — Traffic Router and Gamification Entirely Unstarted:** The signature differentiation of Nomads Pipa—location-verified QR scans, anti-spoofing HMAC verification, quest trees, digital stamp cards, voucher issuance, flash drops, and the staff redemption scanner—remains purely conceptual within specification documents.

---

## 2. Baseline Status and Verification Methodology

### 2.1 Git Repository and Merge Verification
At the inception of this audit, git history was examined:
- **Active Branch:** `jules-12787059480981255939-cb95aaaf`, pointing to commit `b542b588d21cce374cc08fdee3e96ff499c112fa` (`Merge pull request #13 from PadoSensei/feat/NP-016-i18n-18128328536407598881`).
- **Remote Tracking:** Exactly synchronized with `remotes/origin/master` (0 commits ahead, 0 commits behind).
- **Working Tree:** Pristine (no unstaged modifications, no untracked files, no active or broken merge states).
- **Recent Git History Reviewed:**
  - `b542b58` — `Merge pull request #13 from PadoSensei/feat/NP-016-i18n-18128328536407598881`
  - `6fc572d` — `fix(ci): resolve merge conflict marker in layout and adapt vitest for next-intl`
  - `07ae713` — `feat(brand): establish visual foundations and tokens` (NP-017)
  - `bcceabe` — `feat(content): define shared discovery content types and demo fixtures (NP-003)`
  - `2309fe9` — `feat(ci): establish testing and CI baseline (NP-001)`
  - `a62a3e4` — `Update README with comprehensive documentation guide`

### 2.2 Automated Verification Runs
The following checks were executed against the unaltered repository tree:

| Command | Status | Output / Findings |
| :--- | :--- | :--- |
| `pnpm test` | **PASS** | 5 test files passed, 33/33 tests passed in 3.56s. Note: Warning regarding Vite Native config loader format due to CommonJS in `vitest.config.ts`. |
| `pnpm typecheck` | **PASS** | TypeScript 5.9.3 executed without compiler errors (`tsc --noEmit`). |
| `pnpm lint` | **PASS** | ESLint 9 executed with 0 errors and 0 warnings. |
| `pnpm build` | **PASS** | Turbopack compilation succeeded in 7.2s. Static generation succeeded for 49 prerendered route variants in 2.4s. Cache components & Partial Prefetching enabled. |

*Crucial Engineering Note:* Passing automated checks demonstrates structural health and developer toolchain stability; it does **not** signify feature completeness against product requirements.

---

## 3. Completed Issue Verification

A rigorous audit of the closed tasks was conducted against the repository codebase:

### 3.1 NP-001: Testing and CI Baseline
- **Documented Objective:** Set up Vitest, React Testing Library, jsdom, and GitHub Actions CI workflow to run lint, typecheck, tests, and production build on every push and PR to `master`.
- **Implementation Evidence:**
  - `vitest.config.ts`: Configured with `react()` plugin, `jsdom` environment, `tests/setup.ts`, and inline dependency support for `next-intl`.
  - `package.json`: Contains scripts `"lint": "eslint"`, `"typecheck": "tsc --noEmit"`, `"test": "vitest run"`.
  - `.github/workflows/ci.yml`: Runs on Node.js 22 and pnpm 11.5.3 with `--frozen-lockfile`, enforcing lint, typecheck, test, and build.
  - `components/ui/carousel.tsx`: Corrected potential `react-hooks/set-state-in-effect` issues using `useSyncExternalStore`.
- **Audit Assessment:** **Fully Implemented and Verified.** The developer toolchain baseline is operating as intended.

### 3.2 NP-002: Application Shell
- **Documented Objective:** Build the global application shell, root navigation, mobile bottom navigation bar, header, and footer.
- **Implementation Evidence:**
  - `components/layout/AppHeader.tsx`: Responsive navigation bar with brand mark, desktop navigation links, and integrated language selector.
  - `components/layout/AppFooter.tsx`: Village guide footer with navigational groups, social links, and footer language switcher.
  - `components/layout/MobileBottomNav.tsx` & `MobileNavContent.tsx`: Fixed mobile navigation bar displaying Explore, Categories, Events, and Community tabs.
  - `components/layout/HeaderNavLinks.tsx`: Desktop link group handling active path highlighting.
  - `components/layout/PlaceholderPage.tsx`: Standardized card template for unimplemented milestone routes.
- **Audit Assessment:** **Implemented and Verified as a Foundation Shell.** Note: Navigation between pages works cleanly, but the shell currently wraps placeholder routes.

### 3.3 NP-003: Shared Discovery Content Types
- **Documented Objective:** Create modular TypeScript definitions and demo fixtures for listings, events, categories, and essential services with decoupled status dimensions.
- **Implementation Evidence:**
  - `lib/content/status.ts`: Exports `PublicationStatus`, `VisibilityStatus`, `EventLifecycleStatus`, `PartnerStatus`, `VerificationStatus`, and `ContentLocale`.
  - `lib/content/categories.ts`: Defines 6 primary discovery categories, subcategories, and 14 contextual tags (`wifi`, `power-outlets`, `daily-meal-pf`, `sunset-views`, etc.).
  - `lib/content/businesses.ts`: Defines `BaseListing`, `BusinessListing`, `ContactInfo`, `GeoLocation`, and `WeeklyOpeningHours`.
  - `lib/content/events.ts`: Defines `EventListing`, `EventType` (`official_meetup`, `community_pick`, `city_event`).
  - `lib/content/essential-services.ts`: Defines `EssentialServiceListing` across 10 essential categories.
  - `lib/content/demo-fixtures.ts`: 8 curated fictional demo fixtures (4 businesses, 2 events, 2 essential services).
  - `lib/content/localization.ts`: Translation helpers (`getLocalizedContent`, `getLocalizedListing`, `getLocalizedEvent`).
  - `tests/unit/content-types.test.ts`: 11 unit tests verifying type guards and fixture consistency.
- **Audit Assessment:** **Fully Implemented and Verified in Domain Code.** *Critical Finding:* While the domain models and unit tests are comprehensive, they are not yet integrated into the frontend UI or any database adapter.

### 3.4 NP-016: Internationalisation
- **Documented Objective:** Establish first-class i18n supporting English (`en`), Brazilian Portuguese (`pt-BR`), and Spanish (`es`) using `next-intl` with route prefixing (`/[locale]/`), cookie/header negotiation, and locale-aware formatting.
- **Implementation Evidence:**
  - `i18n/routing.ts` & `i18n/navigation.ts`: `routing` configured with locales `['en', 'pt-BR', 'es']`, `defaultLocale: 'en'`, `localePrefix: 'always'`.
  - `proxy.ts`: Next.js 16 Proxy layer (formerly middleware) inspecting `NEXT_LOCALE` cookie, browser `Accept-Language`, falling back to `en`.
  - `messages/`: Translation dictionaries for `en.json`, `pt-BR.json`, `es.json` spanning 10 namespaces (`Common`, `Navigation`, `Homepage`, `Categories`, `Events`, `Community`, `Partner`, `Footer`, `Errors`, `Forms`).
  - `lib/formatters.ts`: Locale-aware formatting functions anchored to the `America/Fortaleza` timezone (UTC-3) and BRL currency.
  - `tests/unit/i18n.test.ts` & `tests/unit/language-selector.test.tsx`: 16 comprehensive unit tests validating keys, parity, and switcher interactions.
- **Audit Assessment:** **Implemented and Verified in Routing & Header/Footer.** *Critical Finding:* The page content itself (`app/[locale]/page.tsx`, `app/[locale]/categories/page.tsx`, etc.) does not call `useTranslations()` or `getTranslations()`; home and directory copy remains hardcoded in English.

### 3.5 NP-017: Brand and Design Foundations
- **Documented Objective:** Establish the official brand palette, Google Fonts, Tailwind CSS v4 design tokens, and asset management structure.
- **Implementation Evidence:**
  - `app/globals.css`: Configures 7 core brand colors (`--color-ocean: #073F3B`, `--color-lagoon: #00A896`, `--color-sun: #F5C842`, `--color-coral: #FF6B4A`, `--color-sand: #FFF6EB`, `--color-charcoal: #1F2937`, `--color-mist: #E5E7EB`) with supporting tints.
  - Font mapping: Inter (`--font-inter`, `--font-sans`) and Sora (`--font-sora`, `--font-display`, `--font-heading`) via Google Fonts with `display: 'swap'`.
  - Custom elevation shadows (`shadow-card`, `shadow-card-hover`, `shadow-dropdown`) and base border radius (20px).
  - `public/brand/README.md`: Official guidelines forbidding synthetic logo creation and defining expected asset names.
- **Audit Assessment:** **Fully Implemented and Verified.** The token pipeline is cohesive and strictly avoids legacy `tailwind.config.ts`.

### 3.6 NP-019: Accessibility and Responsive Experience
- **Documented Objective:** Ensure WCAG 2.2 Level AA compliance, responsive touch targets (minimum 44px), skip links, focus states, `aria-current="page"`, and reduced-motion support.
- **Implementation Evidence:**
  - `docs/ACCESSIBILITY_RESPONSIVE_QA.md`: Comprehensive audit document tracking 10 discrete audit findings:
    - **Fixed in NP-019:** AUD-01 (Skip navigation link), AUD-02 (Mobile bottom nav touch targets >= 44px), AUD-03 (`aria-current="page"` indicators), AUD-04 (Visible focus rings on links), AUD-05 (Unused component imports/clean linter), AUD-06 (Reduced motion on brand hover).
    - **Deferred to NP-017:** AUD-07 (Color contrast tuning for secondary accents, completed in NP-017).
    - **Deferred to NP-016:** AUD-08 (Dynamic `<html lang="...">` and localized ARIA labels, completed in NP-016).
    - **Deferred to follow-up / component integration:** AUD-09 (Standardize footer heading level hierarchy or wrap in `<nav aria-label="Footer">`), AUD-10 (Live region announcements for Embla carousel slide changes with dynamic remote data).
  - `components/layout/MobileNavContent.tsx`: Interactive touch targets enforce `min-h-[48px]`.
  - `components/layout/HeaderNavLinks.tsx` & `MobileNavContent.tsx`: Explicit `aria-current={isActive ? "page" : undefined}` on navigation links.
  - Focus indicators: Explicit `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
  - Motion reduction: `motion-reduce:transform-none motion-reduce:transition-none` on interactive elements.
  - `tests/unit/accessibility.test.tsx`: 5 passing unit tests verifying landmarks, headings, touch targets, and ARIA attributes.
- **Audit Assessment:** **Implemented and Verified.** *Minor Glitch Discovered:* In `app/[locale]/layout.tsx`, the skip-to-content link `<a href="#main-content">Skip to main content</a>` was accidentally duplicated immediately above and below `<NextIntlClientProvider>` during a previous PR conflict resolution.

---

## 4. Product Requirements Classification

Below is the classification of all functional modules and requirements from `docs/MVP_SCOPE.md` and `docs/FEATURES.md`.

Each item is classified into one of six standard statuses:
1. **Implemented and verified**
2. **Partially implemented**
3. **Documented but not implemented**
4. **Missing**
5. **Blocked or awaiting a decision**
6. **No longer required**

| ID / Feature Area | MoSCoW Priority | Classification Status | Evidence / Repository State |
| :--- | :--- | :--- | :--- |
| **F-001: Homepage and Explore** | Must Have | **Partially implemented** | Implemented as a responsive landing page layout (`app/[locale]/page.tsx`). Shows category cards, platform pillars, and mission statement. *Gap:* Content is statically hardcoded in English; does not pull real listings or fixtures. |
| **F-002: Category Directory** | Must Have | **Partially implemented** | Route exists (`app/[locale]/categories/page.tsx` and `app/[locale]/category/[slug]/page.tsx`). Types exist in `lib/content/categories.ts`. *Gap:* Category detail route displays a static `PlaceholderPage` rather than listings. |
| **F-003: Business Listings** | Must Have | **Documented but not implemented** | Data models fully defined in `lib/content/businesses.ts` (`BusinessListing`). Schema specified in `docs/DATABASE.md`. *Gap:* No detail view (`/business/[slug]`), no business cards, no contact action handlers. |
| **F-004: Contextual Filters** | Must Have | **Documented but not implemented** | Tag types defined (`lib/content/categories.ts`). Schema in `docs/DATABASE.md`. *Gap:* No filter UI controls (Wi-Fi speed, power outlets, pet friendly, daily meal). |
| **F-005: Search** | Should Have | **Documented but not implemented** | Specified in `docs/FEATURES.md` and `docs/FRONTEND.md`. *Gap:* No search input, no full-text search index, no client-side search logic. |
| **F-006: Events Calendar** | Must Have | **Documented but not implemented** | Route exists (`app/[locale]/events/page.tsx`), but renders `PlaceholderPage`. Event models exist in `lib/content/events.ts`. Schema in `docs/DATABASE.md`. *Gap:* No calendar UI, no event list, no date filtering. |
| **F-007: Community Picks** | Should Have | **Documented but not implemented** | Event type `community_pick` defined in `lib/content/events.ts`. *Gap:* No UI presentation or community endorsement display. |
| **F-008: WhatsApp Community Links** | Should Have | **Documented but not implemented** | Route exists (`app/[locale]/community/page.tsx`), but strictly renders `PlaceholderPage`. Category metadata mentions WhatsApp context, but zero working links or community group directories exist in code. |
| **F-009: Give Back** | Could Have | **Documented but not implemented** | Subcategory defined in `lib/content/categories.ts` (`CommunityGiveBackSubcategory`). *Gap:* No dedicated view or initiative listings. |
| **F-010: Get Me a Ride** | Must Have | **Documented but not implemented** | Category defined (`transportation`). User flow specified in `docs/USER_FLOWS.md`. *Gap:* No driver listings, transfer request form, or WhatsApp pre-filled routing. |
| **F-011: Transport Directory** | Should Have | **Documented but not implemented** | Subcategories modeled (`TransportationSubcategory`). *Gap:* No transport provider listings or timetables. |
| **F-012: Accommodation Directory** | Must Have | **Documented but not implemented** | Category and subcategories modeled (`AccommodationSubcategory`). *Gap:* No accommodation cards, photo galleries, or amenity badges. |
| **F-013: Quote Requests** | Should Have | **Documented but not implemented** | Detailed flow in `docs/USER_FLOWS.md`. Form fields documented in `docs/DATABASE.md` (`accommodation_enquiries`). *Gap:* No enquiry form or backend submission endpoint. |
| **F-014: Physical QR Code System** | Must Have | **Documented but not implemented** | Cryptographic token design specified in `docs/SECURITY.md` (HMAC-SHA256, anti-spoofing nonce, 2-minute expiration). Table defined in `docs/DATABASE.md` (`qr_codes`). *Gap:* Zero QR generation or display code. |
| **F-015: QR Scan History** | Must Have | **Documented but not implemented** | Schema in `docs/DATABASE.md` (`scan_events`). *Gap:* No scan recording endpoint, no user history screen. |
| **F-016: Quest-Linked Validation** | Must Have | **Documented but not implemented** | Validation algorithms documented in `docs/SYSTEM_ARCHITECTURE.md` & `docs/API_Architecture.md`. *Gap:* No server validation functions. |
| **F-017: Partner QR Campaign** | Should Have | **Documented but not implemented** | Architecture specified in `docs/PARTNER_GUIDE.md`. *Gap:* No partner QR management UI. |
| **F-018: Quest Tree** | Must Have | **Documented but not implemented** | Visual graph and level specs documented in `docs/FEATURES.md`. Tables in `docs/DATABASE.md` (`quests`, `quest_steps`). *Gap:* No quest data types, no quest tree UI components. |
| **F-019: Quest Progress Tracking** | Must Have | **Documented but not implemented** | Schema in `docs/DATABASE.md` (`user_quests`, `user_quest_steps`). *Gap:* No quest state machine or progress indicators. |
| **F-020: Loyalty Points & Rewards** | Must Have | **Documented but not implemented** | Point allocation rules documented in `docs/FEATURES.md`. *Gap:* No point ledger, no points display in UI. |
| **F-021: Multi-Tier Rewards** | Should Have | **Documented but not implemented** | Tier structure documented in `docs/FEATURES.md`. *Gap:* No tier evaluation logic. |
| **F-022: Digital Inventory** | Must Have | **Documented but not implemented** | Collectible badges specified in `docs/FEATURES.md`. Table in `docs/DATABASE.md` (`user_inventory`). *Gap:* No inventory grid, badge rendering, or unlock triggers. |
| **F-023: Voucher Wallet** | Must Have | **Documented but not implemented** | Schema in `docs/DATABASE.md` (`vouchers`). User flow in `docs/USER_FLOWS.md`. *Gap:* No wallet screen, no voucher card components. |
| **F-024: Voucher QR Display** | Must Have | **Documented but not implemented** | Security specifications in `docs/SECURITY.md`. *Gap:* No dynamic QR code generation component. |
| **F-025: Staff Scanner** | Must Have | **Documented but not implemented** | Workflow specified in `docs/USER_FLOWS.md` & `docs/SECURITY.md`. Endpoint documented in `docs/API_Architecture.md`. *Gap:* No camera scanner interface (`/staff/scanner`), no barcode reader integration. |
| **F-026: Flash Drops** | Must Have | **Documented but not implemented** | Lifecycle and off-peak triggers documented in `docs/BACKGROUND_JOBS.md` & `docs/FEATURES.md`. Table in `docs/DATABASE.md` (`flash_drops`). *Gap:* No countdown timer components, claim modals, or broadcast mechanisms. |
| **F-027: Digital Welcome Pack** | Should Have | **Documented but not implemented** | Specified in `docs/FEATURES.md`. *Gap:* No welcome flow or onboarding modal. |
| **F-028: Partner Registration** | Must Have | **Partially implemented** | Route exists (`app/[locale]/partner/page.tsx`), but displays `PlaceholderPage`. Form fields documented in `docs/PARTNER_GUIDE.md` & `DATABASE.md`. *Gap:* No application form, validation, or storage. |
| **F-029: Partner Dashboard** | Must Have | **Documented but not implemented** | Specs in `docs/PARTNER_GUIDE.md` (`/partner/dashboard`). *Gap:* No partner layout, venue editor, or offer manager. |
| **F-030: Partner Analytics** | Must Have | **Documented but not implemented** | Metrics defined in `docs/ANALYTICS.md`. Aggregation queries in `docs/DATABASE.md`. *Gap:* No metric charts or reporting views. |
| **F-031: Staff Management** | Should Have | **Documented but not implemented** | Table in `docs/DATABASE.md` (`business_members`). *Gap:* No staff invitation or PIN assignment UI. |
| **F-032: Essential Services** | Must Have | **Documented but not implemented** | Types defined in `lib/content/essential-services.ts`. Fixtures in `demo-fixtures.ts`. *Gap:* No public essential services directory view. |
| **F-033: Concierge Service** | Should Have | **Documented but not implemented** | Described in `docs/FEATURES.md`. Manual WhatsApp workflow planned. *Gap:* No concierge intake or landing section. |
| **F-034: Pix Payment Guidance** | Should Have | **Documented but not implemented** | Documented in `docs/CONTENT_PLAN.md` & `USER_GUIDE.md`. *Gap:* No guide page or foreign credit card Pix workaround content. |
| **F-035: Admin Content Management** | Must Have | **Documented but not implemented** | Detailed manual in `docs/ADMIN_GUIDE.md` (`/admin/*`). *Gap:* No admin layout, role checks, listing management tables, or publish/archive buttons. |
| **F-036: Multilingual Content** | Should Have | **Partially implemented** | Routing, language switcher, dictionaries, and domain content translation models implemented (`next-intl`, `lib/content/localization.ts`). *Gap:* Pages do not consume translation keys yet. |
| **F-037: Founder & About Page** | Could Have | **Implemented and verified** | Fully rendered at `app/[locale]/about/page.tsx` with profiles for Maria, Lua, and João, values, and community context. *Minor note:* English copy is hardcoded. |
| **F-038: Blog & Editorial** | Should Have | **Documented but not implemented** | Mentioned in `docs/FEATURES.md`. *Gap:* No editorial route or articles. |
| **Authentication Foundation** | Must Have | **Documented but not implemented** | Specified in `docs/SYSTEM_ARCHITECTURE.md` & `SECURITY.md` (Supabase Auth). *Gap:* No login/signup UI, no auth context, no session middleware. |
| **Role-Based Access Control** | Must Have | **Documented but not implemented** | Roles defined in `docs/DATABASE.md` (`visitor`, `resident`, `partner`, `staff`, `admin`). *Gap:* No role checking utility, RLS policies not deployed. |
| **Basic SEO & Metadata** | Must Have | **Implemented and verified** | Implemented in `app/[locale]/layout.tsx` (`generateMetadata`) with localized titles, descriptions, OpenGraph, Twitter cards, and canonical `hreflang` tags. |
| **Basic Usage Analytics** | Must Have | **Documented but not implemented** | Comprehensive event taxonomy defined in `docs/ANALYTICS.md`. *Gap:* No analytics client, event dispatching, or cookie consent banner. |
| **Security Foundation & RLS** | Must Have | **Documented but not implemented** | RLS policies detailed in `docs/DATABASE.md` & `SECURITY.md`. *Gap:* Supabase client not initialized; policies not applied. |

---

## 5. Cross-Project Consistency & Special Focus Areas

### 5.1 Product Completeness: The Traffic Router & Gamification
- **Vision vs. Reality Gap:** Nomads Pipa's core product differentiator is the **Traffic Router**—driving footfall to local businesses through physical QR check-ins, quest progression, digital stamp cards, and dynamic Flash Drops during off-peak hours.
- **Current Footprint:** At present, this entire gamification and partner mechanics layer exists **strictly on paper**. The frontend currently functions as a prototype directory shell with placeholder cards.
- **Risk Assessment:** While it is normal for early foundations to precede gamification, care must be taken not to treat the current static landing pages as proof that the business model is functioning.

### 5.2 Architecture Readiness: Supabase & Relational Data Layer
- **Supabase Status:** Completely unstarted.
  - Zero packages installed (`@supabase/supabase-js`, `@supabase/ssr` missing from `package.json`).
  - No environment variable template (`.env.example` does not exist).
  - No client helpers (`lib/supabase/client.ts`, `lib/supabase/server.ts` do not exist).
  - No SQL migration files in the repo (all SQL resides solely as Markdown code blocks inside `docs/DATABASE.md`).
- **Readiness Verdict:** The application cannot support authentication, real user accounts, partner dashboards, or persistent listings until this layer is formally bootstrapped.

### 5.3 Data Model Consistency: `lib/content/` vs `docs/DATABASE.md` & `API_Architecture.md`
A comparison between the TypeScript types implemented in NP-003 and the PostgreSQL schema in `docs/DATABASE.md` revealed key alignments and notable divergences:
1. **Status Alignment & Decoupling:**
   - Both `status.ts` and `DATABASE.md` successfully decouple `partner_status` (`none | pending | approved | suspended`) from `verification_status` (`unverified | pending_verification | verified`).
   - *Divergence:* `DATABASE.md` uses `listing_status` (`draft | published | archived`) and `is_verified` (boolean), whereas `lib/content/status.ts` defines `PublicationStatus` (`draft | pending_review | published | archived`) and a tri-state `VerificationStatus` (`unverified | pending_verification | verified`).
2. **Identifier Strategy:**
   - `lib/content/businesses.ts` uses string `id` (slug-based in demo fixtures, e.g., `"cafe-praia-coworking"`).
   - `docs/DATABASE.md` strictly enforces UUID primary keys (`id uuid primary key default gen_random_uuid()`) with unique `slug text not null unique`.
3. **Complex Attributes & Normalization:**
   - `lib/content/businesses.ts` models opening hours as a structured typed object `WeeklyOpeningHours`, which matches the JSONB column `opening_hours jsonb` in PostgreSQL.
   - Tags: `lib/content/categories.ts` defines contextual tags as an enum/string array on the listing, whereas `docs/DATABASE.md` models a normalized `business_tags` and `business_tag_assignments` many-to-many join table.
   - Translation: `lib/content/localization.ts` models translations as an optional nested dictionary `translations?: Partial<Record<ContentLocale, ListingTranslation>>`. In PostgreSQL (`DATABASE.md`), multi-language content is partially flattened or planned as localized JSONB fields.
- **Alignment Verdict:** The TypeScript definitions in `lib/content/` are well-structured, but a mapping layer (or database type generation step) will be required when connecting to Supabase to translate UUID foreign keys and normalized join tables into the domain models.

### 5.4 Integration Between Completed Tasks (NP-016, NP-017, NP-019)
The three foundation PRs were examined together for regressions or conflicts:
1. **Duplicate Skip-Navigation Link in `layout.tsx`:**
   - In `app/[locale]/layout.tsx`, `<a href="#main-content">Skip to main content</a>` appears twice in `<body>`:
     - Line 137–141: Placed as the direct first child of `<body>`, immediately before `<NextIntlClientProvider>`.
     - Line 143–148: Placed as the first child *inside* `<NextIntlClientProvider>`, immediately before `<AppHeader />`.
   - **Resolution:** The outer link (line 137–141) should be removed, while the inner link (inside `<NextIntlClientProvider>`) should remain. Retaining the skip link inside `<NextIntlClientProvider>` allows its link text to be localized via `next-intl` (addressing AUD-08) rather than remaining hardcoded in English outside the translation provider.
2. **Internationalisation Disconnect on Pages:**
   - NP-016 configured `next-intl` beautifully in `i18n/request.ts` and `messages/*.json`. However, page components (`app/[locale]/page.tsx`, `categories/page.tsx`, `about/page.tsx`, etc.) do not use `useTranslations()`. When toggling from English to Portuguese or Spanish, only the header, footer, and language selector change language; the main page content remains entirely English.
3. **Brand Token Consistency:**
   - Brand tokens (`--color-ocean`, `--color-lagoon`, `--color-sand`) are utilized consistently across `app/globals.css`, `AppHeader`, `AppFooter`, and UI badges. No legacy Tailwind CSS conflicts exist.
4. **Responsive & A11y Standards:**
   - All interactive mobile elements in `MobileNavContent` satisfy the minimum 48px touch target height. `aria-current="page"` functions correctly on active routes.

### 5.5 Solo-Developer Sustainability
- **Assessment:** Developing a platform that encompasses public discovery, accommodation quoting, WhatsApp transport routing, cryptographic QR visit tracking, gamified quests, voucher wallets, staff camera scanners, partner dashboards, and administrative CMS is a very large undertaking for a solo developer.
- **Observation:** The documentation (`docs/ROADMAP.md` and `docs/MVP_SCOPE.md`) correctly advises "Launch usefulness before complexity" and "Discovery first". However, attempting to build the full backend for the entire gamification loop before completing a working public directory creates high risk of fatigue and delay.
- **Guidance:** The solo developer should build in small, vertically integrated slices. Prioritize getting real discovery data rendering on screen (leveraging the demo fixtures or a minimal Supabase read query) before designing complex write transactions for vouchers or quest state machines.

### 5.6 Documentation Reliability
1. **Outdated Header Paths:**
   - 9 out of 24 markdown files contain obsolete header paths (e.g., `**File:** architecture/DATABASE.md`, `product/ROADMAP.md`, `architecture/API.md`), whereas all documents reside directly under `docs/`.
2. **Environment Variable Naming Mismatch:**
   - `docs/DEPLOYMENT.md` specifies `QR_SIGNING_SECRET`, whereas `docs/SECURITY.md` specifies `QR_TOKEN_SIGNING_SECRET`.
3. **Outdated Scripts in Documentation:**
   - `README.md` section "Known Documentation Gaps" previously claimed that Vitest and tests were not installed; however, `package.json` now includes `vitest`, `pnpm test`, and `pnpm typecheck` (completed in NP-001). `README.md` should be refreshed to reflect this.

---

## 6. Technical and Product Risks

| Risk ID | Category | Description | Severity | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | Technical / Architecture | **Zero Supabase Integration:** Absence of database connection, migrations, and auth prevents true user accounts and dynamic data. | **High** | Establish Supabase baseline (client, types, initial migrations) as the immediate next technical priority. |
| **RSK-02** | Product / Value Delivery | **Fictional Prototype Syndrome:** Rich content models exist in domain types, but the app only displays empty placeholders. | **High** | Connect `lib/content/` demo fixtures immediately to category and listing views so the app is instantly usable for testing. |
| **RSK-03** | Product Scope | **Premature Complexity in Gamification:** Building QR anti-spoofing and multi-step quests before directory traffic is established. | **Medium** | Follow the phased roadmap: launch the discovery MVP and partner directory first; defer QR/quests to Phase 3 & 4. |
| **RSK-04** | User Experience | **Incomplete i18n on Content Pages:** Visitors switching to Portuguese or Spanish see English page bodies. | **Medium** | Wire `next-intl` translation keys or localized content helpers into category pages and hero banners. |
| **RSK-05** | Security / Operational | **Secret Naming Discrepancies:** Multiple names for QR HMAC secrets in documentation (`QR_SIGNING_SECRET` vs `QR_TOKEN_SIGNING_SECRET`). | **Low** | Standardize environment variable naming across documentation and code during backend bootstrapping. |
| **RSK-06** | Maintainability | **Duplicate Skip Link in Root Layout:** Layout renders two consecutive skip navigation links to `#main-content`. | **Low** | Remove duplicate element in the first corrective issue. |

---

## 7. Recommended Next Milestone

### 7.1 Milestone Evaluation
The product roadmap originally proposed:
- Phase 0: Foundation & Developer Workflow (Completed)
- Phase 1: Discovery MVP (Public directory, categories, listings, events)
- Phase 2: Accounts and Partner Portal
- Phase 3: Traffic Router & QR scanning
- Phase 4–6: Gamification, Rewards, Flash Drops

### 7.2 Strategic Recommendation
**Recommendation: Milestone M1 — Public Discovery Directory & Local Content Integration**

*Rationale:*
Rather than jumping straight to complex authentication, partner dashboards, or quest engines, the project needs a **fully working, beautiful, and localized discovery directory**.

The repository already contains rich domain models (`lib/content/`) and realistic demo fixtures for Pipa's top cafes, coworking spots, and events. By wiring these models into the Next.js App Router:
1. The app immediately becomes a useful local guide that can be shown to local business owners and nomads in Pipa.
2. The user experience can be validated on mobile devices with real information (Wi-Fi badges, opening hours, WhatsApp links).
3. In parallel, the Supabase foundation (database migrations and client initialization) can be set up in dependency order, enabling seamless transition from static demo fixtures to Supabase database queries without changing the UI component contracts.

---

## 8. Prioritised GitHub Issue Proposals

Below are the recommended new issue proposals starting sequentially at **NP-020**, designed for solo-developer execution.

### Proposal 1: NP-020 — Foundation Hygiene & Layout Clean-up
- **Objective:** Fix the layout skip-link regression, standardize QR environment secret naming, and align documentation headers with repository structure.
- **Scope:**
  - Remove redundant skip-navigation anchor tag in `app/[locale]/layout.tsx`.
  - Standardize `QR_SIGNING_SECRET` in `docs/SECURITY.md` and `docs/DEPLOYMENT.md`.
  - Fix document header path references in `docs/*.md`.
  - Update `README.md` to reflect that test runners and CI baseline are installed.
- **Dependencies:** None.
- **Priority:** P1 (Quick hygiene win, ~1 hour).
- **Acceptance Criteria:**
  - Exactly one `<a href="#main-content">` rendered in root layout.
  - All automated checks (`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`) pass.
  - No broken header path references in documentation.

### Proposal 2: NP-021 — Supabase Foundation & Database Schema Setup
- **Objective:** Establish the Supabase client architecture, environment configuration, and initial database migrations matching `docs/DATABASE.md`.
- **Scope:**
  - Install `@supabase/supabase-js` and `@supabase/ssr`.
  - Create `.env.example` with documented environment variables.
  - Create `lib/supabase/client.ts` (browser client) and `lib/supabase/server.ts` (server client with cookie handling).
  - Create `supabase/migrations/` containing the baseline schema: `profiles`, `categories`, `businesses`, `business_tags`, and `business_tag_assignments` with RLS enabled.
  - Add basic connectivity smoke test.
- **Dependencies:** NP-020.
- **Priority:** P0 (Blocks persistent data and auth).
- **Acceptance Criteria:**
  - Supabase SSR and browser clients can be imported cleanly.
  - SQL migrations execute cleanly against a local Supabase / PostgreSQL instance.
  - RLS is enabled by default on all created tables.

### Proposal 3: NP-022 — Discovery Directory UI: Category & Business Listing Views
- **Objective:** Replace placeholder category pages with functional listing directory views that consume `lib/content/` domain models and demo fixtures.
- **Scope:**
  - Build `BusinessCard` component displaying verified amenities (Wi-Fi speed, power plugs, quiet zone, pet friendly), rating, tags, and category.
  - Build category listing view (`app/[locale]/category/[slug]/page.tsx`) rendering real listings filtered by slug.
  - Build business detail view (`app/[locale]/business/[slug]/page.tsx`) with cover image, opening hours, location map placeholder, and WhatsApp contact button.
  - Support fallback between Supabase queries (when configured) and `demo-fixtures.ts`.
- **Dependencies:** NP-020 (Can run in parallel with NP-021).
- **Priority:** P0 (Core MVP discovery capability).
- **Acceptance Criteria:**
  - Clicking any category from `/categories` displays vetted venue cards with tags.
  - Clicking a venue opens the full detail page with functioning WhatsApp link and opening hours.
  - Missing optional fields do not crash the view.

### Proposal 4: NP-023 — Internationalise Page Copy & Dynamic Content
- **Objective:** Wire `next-intl` dictionaries and `getLocalizedListing` helpers into all existing page components so switching languages updates page copy.
- **Scope:**
  - Replace hardcoded English strings in `app/[locale]/page.tsx`, `categories/page.tsx`, and `about/page.tsx` with `useTranslations()`.
  - Integrate `getLocalizedListing` and `getLocalizedCategory` in directory components so listings render Portuguese or Spanish translations when available.
  - Add unit test verifying that translated category titles and listing descriptions render under `/pt-BR/` routes.
- **Dependencies:** NP-022.
- **Priority:** P1 (Essential for local Brazilian and international nomad audience).
- **Acceptance Criteria:**
  - Toggling language switcher changes hero headings, category descriptions, and venue descriptions to the selected language.
  - Base English fields serve as clean fallback when translations are missing.

### Proposal 5: NP-024 — Events Calendar & Essential Services Integration
- **Objective:** Deliver functional Events and Essential Services directory views using domain models.
- **Scope:**
  - Build `EventCard` displaying event type badges (`official_meetup`, `community_pick`, `city_event`) and local time formatted via `lib/formatters.ts`.
  - Implement `/events` page with upcoming date grouping and WhatsApp RSVP links.
  - Implement `/essential-services` page with quick-access cards for 24h health, emergency contacts, tech repair, and foreign Pix tips.
- **Dependencies:** NP-022.
- **Priority:** P1 (Daily utility features for residents and nomads).
- **Acceptance Criteria:**
  - Events display distinct visual tags communicating who organizes or endorses them.
  - Event times correctly reflect `America/Fortaleza` timezone.
  - Emergency contacts provide instant 1-tap phone dialer links.

### Proposal 6: NP-025 — Supabase Authentication & User Profiles
- **Objective:** Implement user sign-up, sign-in, session management, and basic nomad profile pages.
- **Scope:**
  - Build auth dialog or route (`/auth/login`, `/auth/sign-up`) supporting email/magic link and social login.
  - Create user profile schema in `profiles` table with automatic profile creation trigger on `auth.users` insert.
  - Create profile view (`/profile`) allowing users to update display name, phone, and country.
- **Dependencies:** NP-021.
- **Priority:** P1 (Prerequisite for quest progression, voucher wallet, and partner portal).
- **Acceptance Criteria:**
  - Users can sign up, authenticate, and log out.
  - Unauthenticated users attempting to access `/profile` are redirected to login.
  - Profile updates correctly write to Supabase PostgreSQL subject to RLS.

---

## 9. Conclusion

The Nomads Pipa repository has an exceptionally well-engineered frontend foundation, clean code organization, strict TypeScript definitions, and robust accessibility standards.

However, there is an acute disparity between the **documentation** (which describes a full-featured Traffic Router, QR cryptographic validation, quests, vouchers, partner portal, and staff scanner) and the **repository reality** (which is currently a static frontend shell with zero database connections and placeholder pages).

By executing the prioritized sequence outlined above—starting with hygiene (NP-020), establishing the Supabase backend (NP-021), and wiring the rich domain fixtures into the UI (NP-022 to NP-024)—the project will rapidly convert this strong foundation into a working, high-value local discovery application ready for real-world testing in Praia da Pipa.
