# Product Roadmap

**Project:** Nomads Pipa  
**File:** `docs/ROADMAP.md`
**Status:** Proposed  
**Development approach:** Solo developer, iterative delivery  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Roadmap Objectives

The roadmap defines the order in which Nomads Pipa should be designed, developed, tested, and launched.

The main objectives are:

1. Launch a useful local discovery platform.
2. Establish a reliable business and content directory.
3. Introduce user accounts and partner accounts.
4. Implement the QR-based Traffic Router.
5. Launch quests, points, and digital rewards.
6. Give partners measurable marketing tools.
7. Expand into community, concierge, and additional services.

**Core strategy:** Do not build the entire ecosystem before launching. Validate the discovery experience and partner interest first.

---

## 2. Development Principles

### 2.1 Build in dependency order

Features should be implemented in the order that makes their dependencies available.

For example:

- QR scanning requires authentication and QR records.
- Quest completion requires validated scan events.
- Rewards require defined eligibility rules.
- Voucher redemption requires secure staff access.
- Partner analytics requires reliable event records.

### 2.2 Launch small, improve continuously

Each phase should produce a usable result rather than waiting for every feature to be finished.

### 2.3 Avoid premature complexity

For the first release:

- Use a PWA instead of native apps.
- Use Supabase Auth rather than building authentication.
- Use simple partner permissions.
- Use server-side validation for rewards.
- Use curated directory content rather than building a full map platform.
- Use predefined reward rules rather than a complex loyalty configuration engine.

---

# 3. Roadmap Overview

| Phase | Focus                            | Outcome                            |
| ----- | -------------------------------- | ---------------------------------- |
| 0     | Product and technical foundation | Stable project structure           |
| 1     | Discovery MVP                    | Public directory and events        |
| 2     | Accounts and partner portal      | Authenticated users and businesses |
| 3     | Traffic Router                   | QR scanning and validation         |
| 4     | Gamification                     | Quests, points, and inventory      |
| 5     | Rewards                          | Vouchers and staff redemption      |
| 6     | Partner growth                   | Flash Drops and analytics          |
| 7     | Expansion                        | Community, transport, concierge    |

Phases are sequential in terms of dependencies, but content preparation, partner outreach, and design can happen in parallel.

---

# 4. Phase 0 — Product and Technical Foundation

**Goal:** Prepare the application and development environment.

### Deliverables

- Finalise MVP scope.
- Confirm database schema.
- Confirm user roles and permissions.
- Create Next.js project.
- Configure TypeScript.
- Configure Tailwind CSS.
- Install and configure shadcn/ui.
- Create Supabase project.
- Configure environment variables.
- Set up database migrations.
- Configure development and production environments.
- Establish Git repository and basic CI checks.

### Technical tasks

- [ ] Create Next.js application.
- [ ] Configure TypeScript.
- [ ] Configure Tailwind CSS.
- [ ] Install shadcn/ui.
- [ ] Configure Supabase client.
- [ ] Configure Supabase Auth.
- [ ] Create initial database migrations.
- [ ] Configure Row Level Security.
- [ ] Create shared layout and navigation.
- [ ] Configure error handling.
- [ ] Create reusable form components.
- [ ] Establish code formatting and linting.

### Completion criteria

- Application runs locally.
- Supabase connection works.
- Database migrations can be applied.
- Authentication configuration is ready.
- Secrets are not exposed in client-side code.
- Main layout works on mobile.

**Milestone M0:** Technical foundation ready.

---

# 5. Phase 1 — Discovery MVP

<badge color="success">First public release</badge>

**Goal:** Make Nomads Pipa useful before introducing gamification.

### Features

- Homepage.
- Category directory.
- Business listings.
- Business detail pages.
- Contextual discovery filters.
- Events calendar.
- Essential Services.
- Basic admin content management.

### Development tasks

**Frontend**

- [ ] Build homepage.
- [ ] Build mobile navigation.
- [ ] Build category cards.
- [ ] Build business listing cards.
- [ ] Build business detail page.
- [ ] Build contextual filter UI.
- [ ] Build events calendar.
- [ ] Build essential services pages.
- [ ] Add loading and empty states.

**Backend**

- [ ] Implement categories.
- [ ] Implement businesses.
- [ ] Implement business tags.
- [ ] Implement events.
- [ ] Implement publication status.
- [ ] Implement admin content permissions.
- [ ] Add seed data for initial content.

**Content**

- [ ] Identify initial partner businesses.
- [ ] Collect business descriptions.
- [ ] Collect images and permissions.
- [ ] Verify contact information.
- [ ] Prepare category descriptions.
- [ ] Publish initial events.

### Completion criteria

- Visitors can browse without registration.
- Categories are accessible.
- Business details display correctly.
- Contextual filters work.
- Events are visible.
- Admins can manage published content.
- Mobile experience is usable.

**Milestone M1:** Public discovery MVP launched.

---

# 6. Phase 2 — User Accounts and Partner Portal

**Goal:** Introduce authenticated experiences for nomads and businesses.

### Features

- User registration.
- Login and logout.
- User profiles.
- Partner applications.
- Partner approval.
- Business management dashboard.
- Business membership roles.
- Accommodation enquiry forms.

### Development tasks

**Authentication**

- [ ] Configure Supabase Auth.
- [ ] Build registration page.
- [ ] Build login page.
- [ ] Build password recovery.
- [ ] Create profile onboarding.
- [ ] Implement protected routes.

**User experience**

- [ ] Build user profile page.
- [ ] Build account settings.
- [ ] Add user-specific dashboard.
- [ ] Add account status handling.

**Partner experience**

- [ ] Build partner application form.
- [ ] Build application review process.
- [ ] Build partner dashboard shell.
- [ ] Implement business membership.
- [ ] Implement owner and manager permissions.
- [ ] Allow authorised profile updates.

**Enquiries**

- [ ] Build accommodation quote request form.
- [ ] Store enquiries securely.
- [ ] Build basic admin enquiry view.

### Completion criteria

- Users can register and log in.
- Users can edit their own profiles.
- Partners can submit applications.
- Admins can approve partners.
- Partners can edit only their authorised businesses.
- Enquiries are stored securely.

**Milestone M2:** Authenticated user and partner experiences ready.

---

# 7. Phase 3 — Traffic Router Foundation

**Goal:** Connect digital user activity with physical partner locations.

This phase is the technical foundation of the Nomads Pipa loyalty ecosystem.

### Features

- QR code generation and management.
- QR scanning.
- Server-side QR validation.
- Scan event history.
- Business association.
- Optional location verification.
- Basic partner scan reporting.

### Development tasks

**QR infrastructure**

- [ ] Create QR code records.
- [ ] Generate secure random tokens.
- [ ] Associate QR codes with businesses.
- [ ] Build QR administration interface.
- [ ] Implement QR activation and revocation.

**Scanning**

- [ ] Build mobile QR scanner.
- [ ] Request camera permissions.
- [ ] Build scan result screen.
- [ ] Validate QR tokens server-side.
- [ ] Record accepted and rejected attempts appropriately.
- [ ] Implement duplicate request protection.

**Partner access**

- [ ] Create staff membership model.
- [ ] Build authenticated staff scanner route.
- [ ] Restrict staff to authorised businesses.
- [ ] Add audit records.

**Optional location verification**

- [ ] Add location permission request.
- [ ] Compare submitted coordinates with configured business coordinates.
- [ ] Store verification result.
- [ ] Provide a fallback when location is unavailable.

Location should be treated as a verification signal, not proof of physical presence.

### Completion criteria

- Valid QR codes are accepted.
- Invalid or revoked codes are rejected.
- Scan events are recorded.
- Duplicate requests do not create duplicate rewards.
- Staff access is authenticated.
- Staff can only access authorised business functions.

**Milestone M3:** Traffic Router operational.

---

# 8. Phase 4 — Gamification and Quest System

**Goal:** Turn validated partner interactions into a structured exploration experience.

### Features

- Quest Tree.
- Quest catalogue.
- Quest steps.
- Quest progress.
- Achievement unlocking.
- Points ledger.
- Inventory.
- Basic reward tiers.

### Development tasks

**Quest engine**

- [ ] Create quest definitions.
- [ ] Create quest steps.
- [ ] Define eligibility conditions.
- [ ] Build quest catalogue.
- [ ] Build quest detail pages.
- [ ] Build quest progression UI.
- [ ] Implement server-side step completion.

**Points**

- [ ] Define point earning rules.
- [ ] Create points transaction ledger.
- [ ] Implement reward eligibility.
- [ ] Prevent duplicate point transactions.
- [ ] Build points balance display.

**Inventory**

- [ ] Create achievement definitions.
- [ ] Implement achievement unlocking.
- [ ] Build inventory page.
- [ ] Display unlocked artwork and badges.

**Reward tiers**

- [ ] Define Standard reward eligibility.
- [ ] Define Golden QR eligibility.
- [ ] Configure reward values.
- [ ] Validate eligibility on the server.

### Completion criteria

- Users can view available quests.
- Users can start eligible quests.
- Validated scans can complete relevant quest steps.
- Progress persists across devices.
- Points are awarded only through defined rules.
- Achievements unlock correctly.

**Milestone M4:** Quest and progression system ready.

---

# 9. Phase 5 — Voucher Wallet and Redemption

**Goal:** Make rewards usable at partner locations.

### Features

- Voucher creation.
- Voucher wallet.
- Voucher status.
- Voucher QR display.
- Staff scanner redemption.
- Digital Welcome Pack.

### Development tasks

**Voucher system**

- [ ] Define voucher types.
- [ ] Create voucher issuance logic.
- [ ] Implement expiry rules.
- [ ] Build active voucher wallet.
- [ ] Build redeemed voucher history.
- [ ] Generate secure voucher tokens.

**Staff redemption**

- [ ] Extend staff scanner.
- [ ] Validate voucher ownership and eligibility.
- [ ] Implement atomic redemption.
- [ ] Prevent double redemption.
- [ ] Display clear success and failure states.
- [ ] Record staff member and business.

**Welcome Pack**

- [ ] Create welcome offer collection.
- [ ] Associate offers with partners.
- [ ] Build welcome pack page.
- [ ] Implement eligibility rules.

### Completion criteria

- Eligible users receive vouchers.
- Users can view voucher status.
- Staff can redeem valid vouchers.
- Expired and revoked vouchers are rejected.
- A voucher cannot be redeemed twice.
- Redemption history is recorded.

**Milestone M5:** Digital rewards usable at partner businesses.

---

# 10. Phase 6 — Partner Growth and Flash Drops

**Goal:** Give businesses measurable tools to attract nomads.

### Features

- Flash Drop creation.
- 90-minute offers.
- First-10 claim limit.
- Optional 2km targeting.
- Partner analytics.
- Staff management.

### Development tasks

**Flash Drops**

- [ ] Build offer creation form.
- [ ] Configure duration.
- [ ] Configure claim limit.
- [ ] Implement one-claim-per-user rule.
- [ ] Implement transactional claim allocation.
- [ ] Build active offers feed.
- [ ] Build offer expiry handling.
- [ ] Add optional proximity eligibility.

**Analytics**

- [ ] Create partner analytics page.
- [ ] Display QR scan totals.
- [ ] Display unique user totals.
- [ ] Display quest completions.
- [ ] Display voucher redemptions.
- [ ] Display Flash Drop claims.
- [ ] Add date filtering.

**Staff management**

- [ ] Build staff invitation flow.
- [ ] Assign staff roles.
- [ ] Implement access revocation.
- [ ] Add membership audit records.

### Completion criteria

- Partners can create authorised offers.
- Offers expire automatically based on their timestamps.
- The first-10 claim limit is enforced transactionally.
- Duplicate claims are rejected.
- Analytics display business-specific data.
- Staff access can be revoked.

**Milestone M6:** Partner growth ecosystem ready.

---

# 11. Phase 7 — Product Expansion

**Goal:** Expand Nomads Pipa beyond discovery and rewards.

### Features

- Get Me a Ride.
- Transportation directory.
- Accommodation expansion.
- Community Picks.
- WhatsApp links.
- Give Back.
- Concierge packages.
- Multilingual interface.
- Founder/About page.
- Editorial content improvements.

### Development tasks

- [ ] Build Get Me a Ride flow.
- [ ] Add transport partner listings.
- [ ] Expand accommodation categories.
- [ ] Build Community Picks.
- [ ] Add approved WhatsApp links.
- [ ] Build Give Back pages.
- [ ] Define concierge packages.
- [ ] Build concierge enquiry flow.
- [ ] Add Portuguese translations.
- [ ] Review English content.
- [ ] Add founder biographies.
- [ ] Fix blog publishing and formatting.
- [ ] Improve editorial content management.

### Completion criteria

- Each new module has clear ownership and content.
- External links are verified.
- Concierge package details are accurate.
- Portuguese interface content is reviewed.
- Content layouts work on mobile.

**Milestone M7:** Expanded Nomads Pipa ecosystem.

---

# 12. Suggested Solo-Developer Schedule

These are planning estimates, not delivery promises. Actual timing depends on experience, available hours, content readiness, and integration complexity.

| Phase                           | Estimated effort |
| ------------------------------- | ---------------: |
| Phase 0 — Foundation            |        1–2 weeks |
| Phase 1 — Discovery MVP         |        2–4 weeks |
| Phase 2 — Accounts and Partners |        2–3 weeks |
| Phase 3 — Traffic Router        |        2–3 weeks |
| Phase 4 — Gamification          |        2–3 weeks |
| Phase 5 — Vouchers              |        1–3 weeks |
| Phase 6 — Partner Growth        |        2–3 weeks |
| Phase 7 — Expansion             |          Ongoing |

**Estimated initial discovery launch:** Approximately 3–6 weeks.

**Estimated full core ecosystem:** Approximately 12–21 weeks.

These estimates assume focused development and exclude significant delays from content collection, partner onboarding, and external service integrations.

---

# 13. Testing and Quality Assurance

Testing should happen throughout development rather than only before launch.

## Required testing areas

### Functional testing

- Registration and login.
- Directory navigation.
- Search and filters.
- Partner applications.
- QR scanning.
- Quest progression.
- Voucher redemption.
- Flash Drop claims.

### Security testing

- Row Level Security.
- Role permissions.
- Unauthorised access attempts.
- QR token validation.
- Duplicate reward prevention.
- Voucher double-redemption prevention.
- Flash Drop claim-limit enforcement.

### Device testing

- iOS Safari.
- Android Chrome.
- Desktop browsers.
- Camera permissions.
- PWA installation.
- Responsive layouts.

### Performance testing

- Homepage loading.
- Image optimisation.
- Database query performance.
- Large directory lists.
- Slow network behaviour.

---

# 14. Launch Strategy

## Soft Launch

Start with a small group of local partners and users.

**Objectives:**

- Validate the directory.
- Check business information.
- Test QR scanning in real locations.
- Confirm staff understand voucher redemption.
- Gather user feedback.
- Identify technical problems.

## Public Launch

Once the core journeys are stable:

- Publish the public directory.
- Promote the PWA.
- Onboard additional businesses.
- Launch initial quests.
- Introduce the Welcome Pack.
- Begin collecting partner performance data.

## Post-Launch

Use actual usage data to decide what to build next.

Prioritise:

- Features used frequently.
- Features that improve partner value.
- Features that reduce user friction.
- Reliability and security improvements.

---

# 15. Key Product Metrics

| Area           | Metric                                  |
| -------------- | --------------------------------------- |
| Discovery      | Directory visits                        |
| Engagement     | Returning users                         |
| Conversion     | Partner contact clicks                  |
| Community      | Event detail views                      |
| Traffic Router | Valid QR scans                          |
| Gamification   | Quest starts and completions            |
| Loyalty        | Vouchers issued                         |
| Redemption     | Voucher redemption rate                 |
| Flash Drops    | Claims and completion rate              |
| Partner value  | Unique users visiting partner locations |
| Retention      | Returning users over time               |

Avoid treating raw scan volume as proof of business revenue. Partner ROI should distinguish scans, claims, redemptions, and any independently verified transactions.

---

# 16. Technical Release Checklist

Before each production release:

- [ ] Database migrations reviewed.
- [ ] RLS policies tested.
- [ ] Environment variables checked.
- [ ] No service-role secrets exposed in the browser.
- [ ] API validation implemented.
- [ ] Error handling tested.
- [ ] Mobile layout tested.
- [ ] Authentication flows tested.
- [ ] Relevant integration tests pass.
- [ ] Database backups and recovery approach reviewed.
- [ ] Production deployment verified.
- [ ] Basic monitoring and error reporting configured.

Store timestamps in UTC and interpret Pipa-local scheduling using the `America/Fortaleza` timezone.

---

# 17. Roadmap Change Control

New feature requests should be evaluated before being added to the active sprint.

Ask:

1. Does this solve a real user or partner problem?
2. Is it required for the current milestone?
3. Does it depend on unfinished infrastructure?
4. Can an existing feature solve the same problem?
5. What is the development and maintenance cost?
6. Will it delay the next launch milestone?

If a feature does not support the current milestone, place it in the backlog rather than interrupting active development.

---

# 18. Final Product Direction

Nomads Pipa should evolve in this order:

**Discover → Connect → Visit → Earn → Redeem → Return**

The directory creates initial value. The Traffic Router connects digital engagement with local businesses. Gamification encourages exploration. Rewards create reasons to return. Partner analytics demonstrate commercial value.

The long-term objective is to make Nomads Pipa a useful local ecosystem for nomads and businesses, not simply another directory or coupon application.
