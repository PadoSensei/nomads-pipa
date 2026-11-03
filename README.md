# Nomads Pipa

Welcome to **Nomads Pipa**, a mobile-first Progressive Web App (PWA) concept and digital hub designed to connect digital nomads, remote workers, travellers, local businesses, and community initiatives in Praia da Pipa (Rio Grande do Norte, Brazil).

Nomads Pipa addresses common nomad pain points—unreliable local information, fragmented WhatsApp groups, and disconnected services—by offering curated local discovery, verified workspaces and Wi-Fi, accommodation enquiries, community events, and an innovative local loyalty ecosystem.

---

## Table of Contents

- [Project Overview](#project-overview)
  - [The Traffic Router Ecosystem](#the-traffic-router-ecosystem)
  - [Three Distinct Platform Experiences](#three-distinct-platform-experiences)
- [Technology Stack](#technology-stack)
- [Implementation Status](#implementation-status)
- [Core Features](#core-features)
- [Architecture & Repository Structure](#architecture--repository-structure)
- [Getting Started & Local Setup](#getting-started--local-setup)
- [Environment Variables](#environment-variables)
- [Development Workflow & Testing](#development-workflow--testing)
- [Deployment](#deployment)
- [Documentation Directory](#documentation-directory)
- [Known Documentation Gaps & Inconsistencies](#known-documentation-gaps--inconsistencies)

---

## Project Overview

### The Traffic Router Ecosystem

Nomads Pipa goes beyond standard travel directories through its **Traffic Router** concept:
- **Footfall & Habit Loop**: Connects digital nomads seeking places to work, eat, and socialize with local partner venues via real-world visits.
- **Physical QR Scans & Quests**: Users discover partner locations, scan location-verified QR codes, complete curated community quests (e.g., trying local cafes, attending coworking sessions), and earn digital stamps or loyalty points.
- **Vouchers & Flash Drops**: Points are redeemable for partner-sponsored perks and time-sensitive Flash Drops (dynamic discounts during off-peak hours), creating a tangible incentive loop that drives measurable local commerce.

### Three Distinct Platform Experiences

The platform is designed to serve three separate user groups with clear authorization boundaries:

1. **Nomad / Visitor Experience**:
   - Public and authenticated mobile-first discovery of cafes, coworking spaces, wellness hubs, and events.
   - Interactive map, category filters, and curated recommendations.
   - Quest tracking, digital stamp cards, and voucher wallet.
2. **Partner Experience (Business Owners & Managers)**:
   - Partner dashboard to manage business profiles, opening hours, amenities (Wi-Fi speed, power outlets), and perks.
   - Campaign management for Flash Drops and quest sponsorships.
   - Analytics detailing impressions, menu views, physical visits, and voucher redemptions.
3. **Platform Administration & Staff Scanning**:
   - **Staff Scanner**: Fast, simplified mobile interface for venue staff to validate customer QR codes and voucher claims.
   - **Admin Console**: Content moderation, partner vetting, category management, platform-wide metrics, and audit logs.

---

## Technology Stack

The project is built on the following technologies:

| Layer | Technology | Status in Repo |
| --- | --- | --- |
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) | Installed & Configured |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5 | Installed & Configured |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 | Installed & Configured |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (using `@base-ui/react`, Lucide icons) | Configured (`components.json`, baseline components in `components/ui`) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL 15+, Row Level Security, Storage, Edge Functions) | Planned Architecture |
| **Package Manager** | [pnpm](https://pnpm.io/) v11 (`pnpm@11.5.3`) | Configured via `packageManager` and lockfile |

---

## Implementation Status

To help onboarding engineers understand what is built today versus what remains on the product roadmap:

### Implemented Today (Repository Foundation)
- Next.js 16 App Router foundation with React 19, TypeScript, and Turbopack.
- Tailwind CSS v4 pipeline configured via `app/globals.css`.
- shadcn/ui configuration (`components.json`) with initial UI components in `components/ui/`:
  - `avatar.tsx`
  - `badge.tsx`
  - `button.tsx`
  - `card.tsx`
  - `carousel.tsx`
- Project utility helpers (`lib/utils.ts`).
- ESLint 9 configuration with Next.js core web vitals plugin (`eslint.config.mjs`).
- Complete product and architectural specifications (22 documents in `docs/`).

### Planned (Documented Specifications to Build)
- **Supabase Integration**: Client initialization, authentication session handling, and schema migrations.
- **Database & RLS**: PostgreSQL schema for profiles, venues, events, quests, and voucher transactions ([docs/DATABASE.md](docs/DATABASE.md)).
- **Mobile-first PWA**: Service worker setup, web app manifest, offline shell caching, and install prompts.
- **Application Pages & Routes**: Directory listings, detail pages, maps, nomad profile, partner dashboard, and admin console ([docs/FRONTEND.md](docs/FRONTEND.md), [docs/API_Architecture.md](docs/API_Architecture.md)).
- **Traffic Router Features**: QR code generation/validation, cryptographic scan anti-spoofing, quest engines, and voucher redemption ([docs/SECURITY.md](docs/SECURITY.md), [docs/FEATURES.md](docs/FEATURES.md)).
- **Automated Testing Suite**: Vitest for unit/integration tests and Playwright for end-to-end user flows ([docs/TESTING.md](docs/TESTING.md)).

---

## Core Features

Full feature definitions, requirements, and acceptance criteria are catalogued in [`docs/FEATURES.md`](docs/FEATURES.md) and [`docs/MVP_SCOPE.md`](docs/MVP_SCOPE.md). Core planned feature areas include:

- **Local Discovery & Directory**: Categorized directory (Coworking, Cafes, Accommodation, Activities, Wellness, Dining) with search, filters (Wi-Fi speed, power sockets, pet friendly), and location pins.
- **Community & Events Board**: Local nomad meetups, workshops, surf sessions, and networking gatherings with RSVP support.
- **Direct Enquiries**: Frictionless connection to accommodation providers and operators via direct WhatsApp deep-links.
- **Quests & Gamification**: Multi-stop discovery routes incentivizing newcomers to explore local venues and earn achievements.
- **Flash Drops & Perks**: Real-time promotional drops and member discounts activated during off-peak windows.
- **Partner Portal**: Self-serve portal for local businesses to maintain operating hours, publish offers, and view conversion metrics.
- **Staff Redemption Scanner**: Camera-based QR verification screen enabling waitstaff to quickly validate voucher codes without requiring complex hardware.

---

## Architecture & Repository Structure

Nomads Pipa is structured as a **modular monolith** to minimize operational overhead while maintaining clean boundaries between business domains.

```text
nomads-pipa/
├── app/                  # Next.js App Router (pages, layouts, routes)
│   ├── globals.css       # Tailwind CSS v4 theme and styling rules
│   ├── layout.tsx        # Root HTML layout and metadata
│   └── page.tsx          # Initial home page
├── components/           # React UI components
│   └── ui/               # Reusable shadcn/ui primitives (button, card, etc.)
├── docs/                 # Product and technical architecture specifications (22 docs)
├── lib/                  # Shared utilities and helper functions (e.g. cn merge utility)
├── public/               # Static assets (SVGs, icons, images)
├── components.json       # shadcn/ui configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and npm scripts
├── pnpm-lock.yaml        # Pnpm dependency lockfile
├── pnpm-workspace.yaml   # Workspace manifest
└── tsconfig.json         # TypeScript compiler configuration
```

For deeper architectural details, see:
- [`docs/SYSTEM_ARCHITECTURE.md`](docs/SYSTEM_ARCHITECTURE.md) — System boundaries, data flow, and components.
- [`docs/FRONTEND.md`](docs/FRONTEND.md) — Frontend component patterns, state management, and PWA strategy.
- [`docs/DATABASE.md`](docs/DATABASE.md) — Entity-relationship models, tables, indexes, and Row Level Security.
- [`docs/API_Architecture.md`](docs/API_Architecture.md) — Route handlers, error conventions, and payload schemas.
- [`docs/SECURITY.md`](docs/SECURITY.md) — Authentication, permission guards, QR token cryptographic validation, and data protection.

---

## Getting Started & Local Setup

### Prerequisites

Ensure your development environment meets the following requirements:
- **Node.js**: v20 or higher recommended.
- **pnpm**: Version 11 (`11.5.3` specified in `package.json`). If needed, enable via corepack:
  ```bash
  corepack enable
  corepack prepare pnpm@11.5.3 --activate
  ```

### Installation

Clone the repository and install dependencies using pnpm:

```bash
pnpm install
```

### Running Locally

Start the local Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Environment Variables

The current repository foundation does not yet enforce runtime environment variables. However, once Supabase integration, mapping, and external services are connected according to architectural specs ([docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md)), the following variables will be required:

### Planned Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration (Planned)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application & Domain (Planned)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mapping Provider (Planned)
NEXT_PUBLIC_MAP_PROVIDER_KEY=your-map-api-key

# QR Token Security (Planned)
# Note: Named QR_SIGNING_SECRET in DEPLOYMENT.md / QR_TOKEN_SIGNING_SECRET in SECURITY.md
QR_SIGNING_SECRET=your-secure-random-secret

# Analytics & Integrations (Optional / Later Phases)
# NEXT_PUBLIC_ANALYTICS_KEY=your-analytics-key
# EMAIL_PROVIDER_API_KEY=your-email-api-key
# PAYMENT_PROVIDER_SECRET=your-payment-secret
# PAYMENT_WEBHOOK_SECRET=your-webhook-secret
```

> **Security Note**: Never commit actual secrets or keys to version control. Keep `SUPABASE_SERVICE_ROLE_KEY` and QR signing secrets restricted to server-side environments.

---

## Development Workflow & Testing

### Available Scripts

The following scripts are configured in `package.json`:

| Command | Action |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server with Turbopack |
| `pnpm build` | Compiles the production build via Next.js and runs TypeScript type checking |
| `pnpm start` | Runs the compiled production server |
| `pnpm lint` | Runs ESLint over the repository code |

### Testing Strategy (Planned)

The project specifications in [`docs/TESTING.md`](docs/TESTING.md) outline a Test-Driven Development (TDD) approach:
- **Unit & Component Testing**: Vitest and React Testing Library for UI components and utility functions.
- **End-to-End Testing**: Playwright for end-to-end user journeys (nomad discovery, QR redemption, partner portal).

*Note: Test runners and scripts (`pnpm test`, `pnpm test:e2e`) are detailed in [`docs/TESTING.md`](docs/TESTING.md) and will be added to `package.json` when test frameworks are installed.*

---

## Deployment

Nomads Pipa is architected to deploy to **Vercel** with **Supabase**:

- **Hosting**: Vercel (seamless Next.js App Router and Edge/Serverless integration).
- **Database, Auth & Storage**: Managed Supabase PostgreSQL project.
- **CI/CD**: GitHub Actions or Vercel Git integration triggering automated linting, builds, and preview deployments on pull requests.

For comprehensive launch requirements and deployment steps, consult:
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — Environment configuration, DNS, and baseline infrastructure.
- [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) — Pre-flight operational, performance, security, and content checklist.

---

## Documentation Directory

The `docs/` directory contains 22 technical and product specifications serving as the source of truth for the platform:

| Document | Topic & Focus Area |
| --- | --- |
| [`docs/PRD.md`](docs/PRD.md) | Product vision, target personas, problem statement, and high-level requirements |
| [`docs/MVP_SCOPE.md`](docs/MVP_SCOPE.md) | MoSCoW feature prioritization and phased delivery plan for initial launch |
| [`docs/FEATURES.md`](docs/FEATURES.md) | Granular feature catalogue, functional requirements, and acceptance criteria |
| [`docs/SYSTEM_ARCHITECTURE.md`](docs/SYSTEM_ARCHITECTURE.md) | High-level system structure, modular monolith design, and external services |
| [`docs/FRONTEND.md`](docs/FRONTEND.md) | Frontend architecture, mobile-first UX guidelines, component hierarchy, and PWA strategy |
| [`docs/DATABASE.md`](docs/DATABASE.md) | Relational schema definitions, PostgreSQL tables, indexes, and Row Level Security (RLS) |
| [`docs/API_Architecture.md`](docs/API_Architecture.md) | Route handlers, request/response models, authorization checks, and error formats |
| [`docs/SECURITY.md`](docs/SECURITY.md) | Threat modeling, role permissions, rate limiting, and cryptographic QR verification |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Infrastructure setup on Vercel and Supabase, environment variables, and releases |
| [`docs/TESTING.md`](docs/TESTING.md) | Testing strategy across unit, integration, and Playwright E2E suites |
| [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md) | Step-by-step user journeys for discovery, onboarding, questing, and redeeming |
| [`docs/USER_GUIDE.md`](docs/USER_GUIDE.md) | End-user handbook explaining PWA installation, map navigation, and community features |
| [`docs/PARTNER_GUIDE.md`](docs/PARTNER_GUIDE.md) | Merchant guide for creating listings, launching Flash Drops, and viewing metrics |
| [`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md) | Platform administrator manual for moderation, vetting partners, and monitoring |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Phased product roadmap from foundation and MVP through growth and monetization |
| [`docs/SPRINT_PLAN.md`](docs/SPRINT_PLAN.md) | Task breakdowns, engineering sprints, and backlog sequencing |
| [`docs/CONTENT_PLAN.md`](docs/CONTENT_PLAN.md) | Seed content strategy, initial partner onboarding pipeline, and editorial standards |
| [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) | Third-party service specifications (WhatsApp, maps, payments, transactional email) |
| [`docs/ANALYTICS.md`](docs/ANALYTICS.md) | Event tracking taxonomy, conversion funnels, and partner ROI reporting |
| [`docs/BACKGROUND_JOBS.md`](docs/BACKGROUND_JOBS.md) | Scheduled tasks, expiration handlers, and background processing architecture |
| [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md) | Logging, performance tracing, error tracking, and uptime monitoring |
| [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) | Operational and technical verification checklist required prior to production launch |

---

## Known Documentation Gaps & Inconsistencies

During review of the repository specifications, the following discrepancies and unresolved points were identified across the documentation:

1. **Document Header Path References vs. Repository Reality**:
   - Multiple Markdown files in `docs/` contain front-matter or header paths pointing to subfolders such as `architecture/<NAME>.md` or `product/<NAME>.md` (for example, `API_Architecture.md` cites `architecture/API.md`, `DATABASE.md` cites `architecture/DATABASE.md`, `PRD.md` lacks a header path).
   - In the repository, all 22 documents are placed flat directly inside `docs/`.
2. **Environment Variable Naming for QR Signing**:
   - `docs/DEPLOYMENT.md` specifies `QR_SIGNING_SECRET` for HMAC-SHA256 signature verification.
   - `docs/SECURITY.md` references `QR_TOKEN_SIGNING_SECRET` for signing time-limited redemption payloads.
   - *Resolution recommendation*: Standardize on `QR_SIGNING_SECRET` across both files and code.
3. **Documented Scripts vs. Configured Scripts in `package.json`**:
   - `docs/TESTING.md` specifies npm scripts (`"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`, `"test:e2e": "playwright test"`) and config files (`vitest.config.ts`, `playwright.config.ts`).
   - `package.json` currently only defines `dev`, `build`, `start`, and `lint`. Vitest, Playwright, and test configurations have not yet been installed.
4. **Dependencies Documented vs. Installed**:
   - Several architecture documents reference `@supabase/supabase-js`, `@supabase/ssr`, and testing libraries as active stack dependencies.
   - The current `package.json` only contains Next.js, React 19, Tailwind CSS v4, Lucide, and Base UI / shadcn dependencies. Supabase packages must be added when backend implementation begins.
5. **Pre-existing Lint Warning in UI Library**:
   - Running `pnpm lint` reveals an existing `react-hooks/set-state-in-effect` rule violation inside `components/ui/carousel.tsx` (`onSelect(api)` called synchronously inside `useEffect`), which is a generated shadcn component. This should be addressed when customizing UI primitives.
