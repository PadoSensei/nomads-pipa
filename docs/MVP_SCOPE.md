# Nomads Pipa — MVP Scope

## 1. Purpose

This document defines the features, priorities, dependencies, and implementation phases for the first public release of Nomads Pipa.

The MVP must deliver a useful local discovery platform while establishing the technical foundation for the partner ecosystem and Traffic Router loyalty system.

The project should be achievable by a solo developer without unnecessary infrastructure or complex integrations.

### Primary MVP objective

Launch a reliable platform that allows visitors to discover Pipa, find useful local services, explore community events, and connect with local businesses.

### Secondary MVP objective

Establish the foundations for a partner ecosystem that can eventually generate measurable physical visits through QR codes, quests, vouchers, and Flash Drops.

---

# 2. Product Scope Principles

All scope decisions should follow these principles:

1. **Launch usefulness before complexity:** Discovery and reliable local information come before advanced gamification.
2. **Build reusable foundations:** Authentication, permissions, business listings, and content management should support future features.
3. **Manual before automated:** Use simple operational workflows until there is enough activity to justify automation.
4. **One application:** Use a modular Next.js application rather than separate applications or microservices.
5. **Server-side trust:** All sensitive actions, including reward allocation and voucher redemption, must be validated on the server.
6. **Mobile-first:** Every launch-critical user journey must work on mobile.
7. **Measure actual value:** Track meaningful engagement and partner outcomes rather than vanity metrics.

---

# 3. MoSCoW Feature Prioritisation

## 3.1 Must Have — Required for launch

These features are necessary to launch a useful and trustworthy product.

| Feature                  | Description                                                                  | Acceptance criteria                                               |
| ------------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Application foundation   | Next.js, TypeScript, Tailwind CSS, shadcn/ui and Supabase setup.             | Application builds, deploys, and connects securely to Supabase.   |
| Responsive interface     | Mobile-first layout and navigation.                                          | Main pages work on mobile, tablet, and desktop.                   |
| Discovery Hub            | Main entry point for finding local information.                              | Users can access every primary category.                          |
| Directory listings       | Structured business and service information.                                 | Users can open listing details and access contact information.    |
| Category navigation      | Food, events, accommodation, transport, activities, services, and community. | No important category is hidden or inaccessible.                  |
| Food & Drink             | Contextual food and drink discovery.                                         | Users can browse listings by relevant categories and tags.        |
| Events calendar          | Display upcoming local and community events.                                 | Users can view event details and identify event types.            |
| Essential Services       | Access to important local information.                                       | Users can find emergency contacts and essential service listings. |
| About Us                 | Explain the product and introduce founders.                                  | Includes profiles for Maria, Lua, and João.                       |
| Partner application      | Businesses can apply to join.                                                | Application is stored and available for administrator review.     |
| Admin content management | Administrators manage core directory and event content.                      | Admin can create, update, publish, and archive content.           |
| Authentication           | Secure user sign-up and login.                                               | Users can authenticate and access protected features.             |
| Role permissions         | Separate admin, partner, and user permissions.                               | Users cannot access unauthorised dashboard functions.             |
| Basic SEO                | Search-friendly public pages and metadata.                                   | Public content has appropriate page titles and descriptions.      |
| Basic analytics          | Track core platform usage.                                                   | Key user journeys and enquiries can be measured.                  |
| Security foundation      | Database access controls and server-side validation.                         | Supabase Row Level Security is enabled for protected data.        |

## 3.2 Should Have — Important, but not launch-blocking

These features add significant value but can follow the initial public release.

| Feature                    | Description                                  | Acceptance criteria                                               |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| User profiles              | Basic profile information and preferences.   | Authenticated users can manage their profile.                     |
| Accommodation enquiries    | Request quotes from approved partners.       | Enquiries are stored and routed to the relevant team or partners. |
| Transportation routing     | "Get Me a Ride" flow.                        | Users can identify suitable transport providers.                  |
| Sports & Activities        | Curated activity directory.                  | Users can browse activities and contact providers.                |
| WhatsApp community links   | Access relevant groups.                      | Links are visible and categorised.                                |
| Partner dashboard          | Business profile and offer management.       | Approved partners can manage authorised information.              |
| QR visit tracking          | Record verified visits to partner locations. | Valid scans create auditable scan records.                        |
| Basic quest engine         | Simple quests linked to partner visits.      | Eligible scans advance quest progress.                            |
| Voucher wallet             | Store and display user vouchers.             | Users can view active, redeemed, and expired vouchers.            |
| Staff redemption interface | Simple mobile QR scanner.                    | Staff can validate an eligible voucher.                           |
| Basic partner analytics    | Display scans and redemptions.               | Partners can see metrics for their own businesses.                |

## 3.3 Could Have — Future enhancements

| Feature                           | Description                             | Reason to defer                                               |
| --------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| Flash Drops                       | Time-limited local offers.              | Requires stable voucher and redemption infrastructure.        |
| 2 km proximity targeting          | Target nearby users.                    | Adds location permission and targeting complexity.            |
| Golden QR                         | Higher-tier rewards.                    | Requires reliable reward and eligibility rules.               |
| Digital inventory                 | Collectible artwork and badges.         | Not essential to initial discovery value.                     |
| Advanced Quest Tree               | Multi-step and branching quests.        | Basic quest functionality should be validated first.          |
| Push notifications                | Notify users about offers and events.   | Requires engagement strategy and notification infrastructure. |
| Portuguese translation automation | Automated content translation.          | Manual review is preferable for important local information.  |
| Advanced partner analytics        | Campaign and conversion reporting.      | Requires sufficient data volume.                              |
| Concierge packages                | Packaged personalised assistance.       | Can initially be fulfilled manually.                          |
| Community attendance confirmation | Show who plans to attend an event.      | Requires additional community interaction features.           |
| Advanced search and filtering     | More sophisticated directory discovery. | Initial categories and tags should be validated first.        |

## 3.4 Won't Have — Explicitly excluded

The following features are not part of the initial MVP.

- Native iOS application.
- Native Android application.
- Full accommodation booking engine.
- Real-time taxi dispatch.
- Live driver tracking.
- In-app payment processing.
- Custom chat or messaging platform.
- Blockchain or NFT rewards.
- Full social network functionality.
- Automated AI concierge.
- Full offline QR redemption.
- Complex business advertising marketplace.
- Multi-city platform management.
- Automated partner commission accounting.

These exclusions should remain in place unless a clear business case justifies changing the scope.

---

# 4. MVP Release Strategy

The recommended approach is to build the platform in six phases.

Each phase should produce a working, testable result.

## Phase 1 — Technical Foundation

**Objective:** Establish the application structure and core infrastructure.

### Features

- Next.js project setup.
- TypeScript configuration.
- Tailwind CSS configuration.
- shadcn/ui installation.
- Supabase project connection.
- Environment configuration.
- Application layout.
- Main navigation.
- Responsive design foundations.
- Basic error and loading states.
- Deployment pipeline.

### Technical requirements

The project should use the Next.js App Router.

Suggested structure:

```text
src/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── partner/
│   ├── admin/
│   └── api/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
│   ├── discovery/
│   ├── businesses/
│   ├── events/
│   ├── auth/
│   └── partners/
├── lib/
│   ├── supabase/
│   ├── auth/
│   └── utils/
├── types/
└── config/
```

This is an initial organisational structure. Feature folders should only be expanded when the corresponding functionality exists.

### Acceptance criteria

- [ ] Application runs locally.
- [ ] Application builds successfully.
- [ ] Supabase connection works.
- [ ] Environment variables are configured securely.
- [ ] Main navigation renders correctly.
- [ ] Mobile and desktop layouts work.
- [ ] Production deployment is accessible.

**Deliverable:** A deployed application foundation.

---

## Phase 2 — Discovery & Content Platform

**Objective:** Make Nomads Pipa useful before introducing advanced functionality.

### Features

- Homepage.
- Discovery Hub.
- Main category navigation.
- Business directory.
- Business detail pages.
- Food & Drink categories.
- Events calendar.
- Essential Services.
- Accommodation listings.
- Transportation listings.
- Sports & Activities listings.
- Community links.
- About Us page.
- Founder profiles.
- Blog and editorial content.
- Basic search.
- Admin content management.

### Content categories

| Category            | Initial content                                                   |
| ------------------- | ----------------------------------------------------------------- |
| Food & Drink        | Restaurants, bars, cafes, delivery.                               |
| Events              | Official meetups, community picks, city events.                   |
| Accommodation       | Hostels, pousadas, apartments, houses.                            |
| Transportation      | Airport transfers, taxis, moto-taxis, rentals, buses.             |
| Sports & Activities | Surf, yoga, gyms, padel, beach tennis, football.                  |
| Essential Services  | Healthcare, emergency contacts, repair, laundry, couriers.        |
| Community           | WhatsApp groups, social initiatives, other Brazilian communities. |

### Admin functionality

Administrators must be able to:

- Create listings.
- Edit listings.
- Publish and unpublish listings.
- Manage categories.
- Upload images.
- Create and edit events.
- Manage editorial content.
- Review partner applications.

### Acceptance criteria

- [ ] All main categories are visible.
- [ ] Users can browse category listings.
- [ ] Listing detail pages work.
- [ ] Contact links work.
- [ ] Events can be created and published.
- [ ] Event types are visually distinguishable.
- [ ] Essential information is accessible.
- [ ] Administrators can manage core content.
- [ ] Blog formatting remains consistent after publication.

**Deliverable:** A functional local discovery platform.

---

## Phase 3 — Authentication & Partner Foundation

**Objective:** Introduce authenticated experiences and the business partner ecosystem.

### Features

- Supabase Auth integration.
- User registration.
- Login and logout.
- Password recovery.
- User profiles.
- Role-based access.
- Partner application form.
- Admin partner approval.
- Partner dashboard foundation.
- Business profile management.
- Partner-specific data access.

### Roles

Initial roles:

```text
user
partner
staff
admin
```

Business access should be associated with explicit business memberships rather than assuming one partner account owns every business.

### Partner application workflow

```text
Application Submitted
        |
        v
Pending Review
        |
        v
Administrator Review
        |
        +---- Rejected
        |
        v
Approved
        |
        v
Partner Access Enabled
```

### Acceptance criteria

- [ ] Users can register and authenticate.
- [ ] Users can recover account access.
- [ ] Protected routes require authentication.
- [ ] Partner applications are stored.
- [ ] Admin can approve or reject applications.
- [ ] Approved partners can access their dashboard.
- [ ] Partners cannot access other businesses' private data.
- [ ] Staff permissions are restricted.

**Deliverable:** A secure authenticated platform with partner onboarding.

---

## Phase 4 — Partner Offers & QR Foundation

**Objective:** Build the first version of the Traffic Router.

This phase introduces the foundation for measurable physical visits.

### Features

- QR code generation for participating businesses.
- QR scanning interface.
- Manual code entry fallback.
- Server-side scan validation.
- Scan history.
- Basic visit records.
- Basic quest definitions.
- Quest progress.
- Voucher creation.
- Voucher wallet.
- Staff redemption interface.
- Duplicate redemption prevention.

### Recommended implementation order

1. Establish business-specific QR identifiers.
2. Implement the scan endpoint.
3. Validate scan eligibility on the server.
4. Record scan events.
5. Add quest progression rules.
6. Create voucher records.
7. Implement staff redemption.
8. Add partner reporting.

### Important business rule

A QR scan is not automatically a voucher redemption.

The system must distinguish between:

- A recorded scan.
- A valid visit.
- A quest completion.
- A reward issuance.
- A voucher redemption.

Each event must have its own record and rules.

### Acceptance criteria

- [ ] Each participating business has a valid QR code.
- [ ] Users can scan a QR code.
- [ ] Manual code entry is supported.
- [ ] Invalid codes are rejected.
- [ ] Valid scan events are recorded.
- [ ] Duplicate submissions are handled safely.
- [ ] Eligible quest progress is updated.
- [ ] Eligible vouchers are issued.
- [ ] Staff can validate vouchers.
- [ ] Used vouchers cannot be redeemed again.
- [ ] Redemption events are auditable.

**Deliverable:** A basic operational QR loyalty system.

---

## Phase 5 — Partner Analytics & Engagement

**Objective:** Give businesses visibility into the value Nomads Pipa generates.

### Features

- Partner dashboard metrics.
- Total scans.
- Unique users.
- Quest completions.
- Voucher claims.
- Voucher redemptions.
- Basic date filtering.
- Simple campaign performance reporting.

### Optional additions

If the previous phases are stable:

- Basic Flash Drop creation.
- Offer duration configuration.
- Redemption limits.
- Offer status management.

### Acceptance criteria

- [ ] Partner sees only authorised business metrics.
- [ ] Scan counts match the audit records.
- [ ] Redemption counts are accurate.
- [ ] Expired offers cannot be redeemed.
- [ ] Campaign limits are enforced server-side.

**Deliverable:** A partner platform that can demonstrate measurable activity.

---

## Phase 6 — Public Launch & Optimisation

**Objective:** Prepare the product for real-world use in Pipa.

### Tasks

- Test all main user journeys.
- Validate mobile experience.
- Verify partner permissions.
- Review essential information.
- Check all business contact links.
- Test QR scanning on supported mobile browsers.
- Test voucher redemption.
- Check application performance.
- Review SEO metadata.
- Configure backups and monitoring.
- Prepare launch content.
- Onboard initial partner businesses.
- Collect initial user feedback.

### Acceptance criteria

- [ ] Critical user journeys pass testing.
- [ ] No known critical security issues remain.
- [ ] Core pages work on supported mobile browsers.
- [ ] Partner workflows have been tested with real partner accounts.
- [ ] QR redemption has been tested in a real business environment.
- [ ] Essential Services content has been reviewed.
- [ ] Production monitoring is active.
- [ ] Launch and rollback procedures are documented.

**Deliverable:** A stable first public release.

---

# 5. Feature Dependencies

Some features depend on other parts of the application being operational.

The following dependencies should influence implementation order.

| Feature              | Depends on                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Directory            | Database, categories, content management.                         |
| Events               | Database, admin content management.                               |
| Partner applications | Database, authentication, admin permissions.                      |
| Partner dashboard    | Authentication, business membership, authorisation.               |
| QR scanning          | Authentication, business records, QR validation endpoint.         |
| Quest progression    | Scan history, quest rules, user profiles.                         |
| Voucher wallet       | Authentication, voucher records.                                  |
| Voucher redemption   | Voucher wallet, staff permissions, server validation.             |
| Partner analytics    | Scan history, redemption history, business access controls.       |
| Flash Drops          | Partner dashboard, offers, voucher redemption, expiry and limits. |
| Proximity targeting  | Flash Drops, location permissions, geospatial filtering.          |
| Golden QR            | Quest progression, reward eligibility, reward configuration.      |

Do not start dependent features before their foundations are working.

---

# 6. Features That Can Be Managed Manually at Launch

To reduce development effort, some functionality should initially be operated manually.

| Function                      | Initial implementation                        |
| ----------------------------- | --------------------------------------------- |
| Partner approval              | Admin reviews applications.                   |
| Accommodation matching        | Admin or team forwards enquiries.             |
| Concierge                     | Manual fulfilment through WhatsApp.           |
| Event publishing              | Admin creates and updates events.             |
| Portuguese translation        | Manual review and editing.                    |
| Community groups              | Curated external WhatsApp links.              |
| Partner onboarding            | Direct communication and manual setup.        |
| Business content updates      | Admin-assisted updates.                       |
| Flash Drop campaigns          | Defer until voucher infrastructure is stable. |
| Partner performance reporting | Basic database-backed dashboard.              |

Manual workflows are acceptable when they do not compromise security, accuracy, or customer trust.

---

# 7. Recommended Database Scope

The initial database should support the product without creating unnecessary complexity.

## Core tables

| Table                   | Purpose                                      | Phase |
| ----------------------- | -------------------------------------------- | ----- |
| profiles                | User profile information.                    | 1–3   |
| businesses              | Business listings.                           | 2     |
| business_members        | Business user access.                        | 3     |
| categories              | Directory categories.                        | 2     |
| events                  | Community and city events.                   | 2     |
| accommodation_enquiries | Accommodation requests.                      | 2     |
| partner_applications    | Business applications.                       | 3     |
| quests                  | Quest definitions.                           | 4     |
| quest_steps             | Individual quest requirements.               | 4     |
| qr_codes                | Business QR identifiers.                     | 4     |
| scan_events             | Audit record of QR activity.                 | 4     |
| quest_progress          | User quest progress.                         | 4     |
| vouchers                | Issued user rewards.                         | 4     |
| voucher_redemptions     | Successful redemption records.               | 4     |
| offers                  | Partner promotional offers.                  | 5     |
| flash_drops             | Time-limited campaigns.                      | 5     |
| audit_logs              | Important administrative and system actions. | 1–4   |

Additional tables should be introduced only when a real feature requires them.

The complete schema, relationships, constraints, and indexes will be defined in `architecture/DATABASE.md`.

---

# 8. Technical Scope & Architecture Constraints

## Required stack

- Next.js.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase.
- PostgreSQL.
- Supabase Auth.
- Supabase Storage.

## Architecture constraints

- Single Next.js application for MVP.
- App Router.
- Server-side validation for sensitive operations.
- Supabase Row Level Security for protected data.
- Database migrations tracked in version control.
- Shared UI components.
- Feature-oriented application organisation.
- No unnecessary microservices.
- No separate mobile application.
- No complex background processing unless a feature requires it.

## Security constraints

Never trust the browser to:

- Award points.
- Complete quests.
- Validate voucher ownership.
- Confirm voucher redemption.
- Assign partner permissions.
- Determine administrative privileges.
- Override campaign limits.

These operations must be validated by trusted server-side logic and enforced by appropriate database constraints and permissions.

---

# 9. Suggested Solo-Developer Build Order

The following is a dependency-based sequence, not a fixed deadline.

| Order | Work package        | Expected outcome                                               |
| ----- | ------------------- | -------------------------------------------------------------- |
| 1     | Project setup       | Working Next.js application.                                   |
| 2     | Design system       | Reusable layout and UI components.                             |
| 3     | Supabase foundation | Database, authentication configuration, and security policies. |
| 4     | Discovery Hub       | Navigation and category browsing.                              |
| 5     | Directory           | Business listings and detail pages.                            |
| 6     | Events              | Calendar and event management.                                 |
| 7     | Essential content   | Essential Services, About Us, community links.                 |
| 8     | Admin tools         | Content and partner application management.                    |
| 9     | Partner access      | Partner dashboard and business memberships.                    |
| 10    | QR foundation       | QR codes and scan event validation.                            |
| 11    | Quest engine        | Quest progression and reward eligibility.                      |
| 12    | Voucher system      | Wallet and staff redemption.                                   |
| 13    | Analytics           | Partner metrics.                                               |
| 14    | Launch hardening    | Security, testing, performance, and deployment.                |

A key rule: do not spend significant time polishing advanced gamification before the discovery experience is genuinely useful.

---

# 10. MVP Acceptance Checklist

The following checklist should be completed before the first public release.

## Product

- [ ] Users understand what Nomads Pipa offers.
- [ ] All main categories are accessible.
- [ ] Discovery pages contain useful local information.
- [ ] Event labels are accurate.
- [ ] Essential information is easy to find.
- [ ] About Us includes the founders.
- [ ] Partner application process works.

## Technical

- [ ] Next.js application builds successfully.
- [ ] TypeScript checks pass.
- [ ] Supabase connection works.
- [ ] Database migrations are committed.
- [ ] Row Level Security policies are tested.
- [ ] Authentication works.
- [ ] Protected routes are enforced.
- [ ] Production environment variables are configured securely.

## User experience

- [ ] Mobile navigation works.
- [ ] Category navigation displays all options.
- [ ] Listing pages render correctly.
- [ ] Blog formatting is correct.
- [ ] Images are optimised.
- [ ] Loading and error states are clear.
- [ ] Contact links work.

## Partner ecosystem

- [ ] Partner applications are stored.
- [ ] Administrators can approve partners.
- [ ] Business data is properly isolated.
- [ ] Partner access is restricted.
- [ ] Staff permissions are restricted.

## Traffic Router, when included in the first release

- [ ] QR codes can be scanned.
- [ ] Scan events are validated server-side.
- [ ] Invalid scans are rejected.
- [ ] Duplicate scans are handled correctly.
- [ ] Quest progress is calculated server-side.
- [ ] Vouchers are issued according to rules.
- [ ] Staff can redeem eligible vouchers.
- [ ] Redemptions are recorded.
- [ ] Partners can see their own metrics.

---

# 11. Scope Change Policy

New features should not automatically enter the MVP.

Before adding a feature, evaluate:

1. Does it solve a validated user or partner problem?
2. Is it required for the core user journey?
3. Does it depend on unfinished infrastructure?
4. Can it be handled manually at launch?
5. What additional maintenance will it create?
6. Does it delay a more important feature?

A feature should be deferred if its complexity is disproportionate to its initial value.

The MVP scope should only change when there is a clear reason, an identified owner, and an understanding of the additional work.

---

# 12. Launch Definition

The first public release should be considered successful when:

- Visitors can use Nomads Pipa to find relevant local information.
- The directory and events experience is operational.
- Businesses can apply to become partners.
- Administrators can manage content.
- The platform works reliably on mobile.
- The application is secure and maintainable.
- The product can collect meaningful usage data.
- There is a clear path to introducing QR loyalty and partner engagement features.

**Final product rule:** Nomads Pipa must first become a platform people genuinely use to navigate Pipa. The Traffic Router should increase the value of that existing engagement, not be the only reason the platform exists.
