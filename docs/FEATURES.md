# Features Catalogue

**Project:** Nomads Pipa  
**File:** `docs/FEATURES.md`
**Status:** Draft  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

This document defines the features of Nomads Pipa, their priorities, requirements, dependencies, and acceptance criteria.

It serves as the central reference for:

- Product development.
- MVP planning.
- Feature estimation.
- Technical implementation.
- Testing.
- Future improvements.

Every feature is assigned a MoSCoW priority.

## 2. MoSCoW Prioritisation

| Priority    | Meaning                                         |
| ----------- | ----------------------------------------------- |
| Must Have   | Essential for the MVP to deliver its core value |
| Should Have | Important, but the MVP can launch without it    |
| Could Have  | Useful enhancement if time and resources allow  |
| Won't Have  | Explicitly excluded from the MVP                |

## 3. Product Modules

Nomads Pipa is organised into eight modules:

1. Discovery Directory.
2. Events and Community.
3. Transportation and Accommodation.
4. Traffic Router and QR Ecosystem.
5. Gamification and Quest System.
6. Voucher Wallet and Flash Drops.
7. Partner Dashboard.
8. Essential Services and Concierge.

---

# MODULE 01 — DISCOVERY DIRECTORY

## F-001: Homepage and Explore

<badge color="success">Must Have</badge>

**Description:** A central discovery page that helps nomads find useful places, activities, services, and events in Pipa.

**User value:** Quickly discover what is available without searching across multiple platforms.

**Requirements:**

- Display primary discovery categories.
- Display featured businesses.
- Show today's highlights.
- Display relevant events.
- Display active offers.
- Provide search and navigation.
- Allow browsing without registration.

**Acceptance criteria:**

- All primary categories are accessible from the homepage.
- Visitors can browse without logging in.
- Featured listings link to their detail pages.
- Mobile layout is fully usable.
- Empty and loading states are implemented.

**Dependencies:** Business directory, categories, events, offers.

## F-002: Category Directory

<badge color="success">Must Have</badge>

**Description:** Organise local businesses and services into understandable categories.

**Categories:**

- Food & Drink.
- Accommodation.
- Transportation.
- Events & Community.
- Sports & Activities.
- Essential Services.
- Community & Give Back.

**Requirements:**

- Category cards.
- Category descriptions.
- Relevant subcategories.
- Contextual filters.
- Business listings.
- Category-specific CTAs.

**Acceptance criteria:**

- Each published category has a dedicated page.
- Users can filter relevant listings.
- Empty categories display a useful message.
- Categories are manageable through the database.

## F-003: Business Listings

<badge color="success">Must Have</badge>

**Description:** Public business profiles containing useful information for nomads.

**Requirements:**

- Business name.
- Description.
- Images.
- Category and tags.
- Location.
- Contact information.
- Website and social links.
- Opening hours when available.
- Relevant offers.

**Acceptance criteria:**

- Only published businesses are publicly visible.
- Users can open business details.
- Contact links work correctly.
- Business owners can manage authorised information.
- Missing optional information does not break the page.

## F-004: Contextual Discovery Filters

<badge color="success">Must Have</badge>

**Description:** Help users find places based on what they need rather than only business categories.

**Examples:**

| User intent            | Filter                  |
| ---------------------- | ----------------------- |
| Find somewhere to work | Wi-Fi and power outlets |
| Find affordable food   | PF / Daily Meal         |
| Find vegan food        | Vegan Options           |
| Find a date spot       | Date Night              |
| Watch the sunset       | Sunset Views            |
| Find live music        | Live Music              |
| Find nightlife         | Weekday Nightlife       |
| Find cold beer         | Cold Beer               |
| Find a cocktail        | Espresso Martini        |

**Acceptance criteria:**

- Tags can be assigned to businesses.
- Users can filter by relevant tags.
- Results contain only published listings.
- Filters work on mobile.

## F-005: Search

<badge color="warning">Should Have</badge>

**Description:** Allow users to search businesses, events, and services.

**Requirements:**

- Search by name.
- Search by category.
- Search by relevant keywords.
- Display useful results.
- Provide empty-result feedback.

**Acceptance criteria:**

- Search returns relevant published content.
- Search does not expose private records.
- Search works on mobile.

---

# MODULE 02 — EVENTS AND COMMUNITY

## F-006: Community Events Calendar

<badge color="success">Must Have</badge>

**Description:** A calendar showing activities and events happening in Pipa.

**Requirements:**

- Event title.
- Description.
- Date and time.
- Location.
- Event category.
- External booking or contact link.
- Publication status.

**Event types:**

| Type                | Definition                                            |
| ------------------- | ----------------------------------------------------- |
| Nomads Pipa Meet-up | Official community event                              |
| Community Pick      | Third-party event with confirmed community attendance |
| City Event          | General city event or cultural suggestion             |

**Acceptance criteria:**

- Users can browse upcoming events.
- Users can distinguish official and third-party events.
- Cancelled events are clearly marked.
- Events display local Pipa time.
- Admins can manage event publication.

## F-007: Community Picks

<badge color="warning">Should Have</badge>

**Description:** Highlight third-party events that community members have confirmed they plan to attend.

**Requirements:**

- Event association.
- Community attendance confirmation.
- Visible Community Pick label.
- Attendance information.

**Acceptance criteria:**

- Only qualifying third-party events receive the label.
- Attendance information is not fabricated.
- Users can distinguish these events from official meetups.

## F-008: WhatsApp Community Links

<badge color="warning">Should Have</badge>

**Description:** Connect nomads to relevant WhatsApp communities.

**Requirements:**

- Community name.
- Description.
- Topic.
- Join link.
- Active/inactive status.

**Acceptance criteria:**

- Only approved links are displayed.
- External links open correctly.
- Broken links can be updated by admins.

## F-009: Give Back

<badge color="info">Could Have</badge>

**Description:** Connect nomads with local social projects and environmental initiatives.

**Examples:**

- Beach cleanups.
- NGO support.
- Community projects.
- Volunteering opportunities.

**Acceptance criteria:**

- Projects have descriptions and contact information.
- Participation details are clear.
- External organisations are correctly identified.

---

# MODULE 03 — TRANSPORTATION AND ACCOMMODATION

## F-010: Get Me a Ride

<badge color="success">Must Have</badge>

**Description:** A guided CTA that helps users choose an appropriate transportation option.

**User flow:**

1. User selects "Get Me a Ride".
2. System asks where the user needs to go.
3. System asks what type of transportation they need.
4. User selects an option:
   - Airport Transfer.
   - Taxi.
   - Moto-Taxi.
5. System presents available partner contact options.
6. User contacts the provider.

**Acceptance criteria:**

- The journey uses a small number of steps.
- Each option has relevant partner information.
- Users can contact the provider directly.
- No unverified booking confirmation is displayed.

## F-011: Transportation Directory

<badge color="warning">Should Have</badge>

**Description:** Provide access to local transportation services.

**Subcategories:**

- Car rental.
- Motorbike rental.
- Bicycle rental.
- Local buses.
- Airport transfers.
- Taxi and moto-taxi.

**Acceptance criteria:**

- Services are organised by type.
- Contact and availability information is shown when verified.
- Users can open partner details.

## F-012: Accommodation Directory

<badge color="success">Must Have</badge>

**Description:** Help nomads discover accommodation options.

**Subcategories:**

- Houses.
- Hostels.
- Pousadas.
- Apartments.
- Real estate.

**Acceptance criteria:**

- Users can browse accommodation categories.
- Each listing displays available details.
- Enquiry CTAs work.
- Listings can be managed by authorised partners.

## F-013: Accommodation Quote Requests

<badge color="warning">Should Have</badge>

**Description:** Allow users to request accommodation options from partner businesses.

**Requirements:**

- Check-in date.
- Check-out date.
- Number of guests.
- Accommodation type.
- Budget range.
- Contact details.
- Optional notes.

**Acceptance criteria:**

- Enquiries are stored securely.
- Only authorised recipients can access enquiry details.
- User receives submission confirmation.
- Duplicate submissions are handled appropriately.

---

# MODULE 04 — TRAFFIC ROUTER AND QR ECOSYSTEM

## F-014: Physical QR Code System

<badge color="success">Must Have</badge>

**Description:** Connect physical partner locations with digital actions inside Nomads Pipa.

**Requirements:**

- Unique QR token.
- Business association.
- Optional quest association.
- Active/inactive status.
- Expiry and revocation support.
- Server-side validation.

**Acceptance criteria:**

- Valid QR codes can be scanned.
- Invalid and expired codes are rejected.
- Tokens do not expose personal information.
- Repeated requests do not create duplicate rewards.

## F-015: QR Scan History

<badge color="success">Must Have</badge>

**Description:** Record scan attempts and accepted scans.

**Requirements:**

- User ID.
- QR code ID.
- Business ID.
- Timestamp.
- Scan status.
- Idempotency key.
- Optional verification signals.

**Acceptance criteria:**

- Scan events are recorded.
- Users can view their own history.
- Business members only see authorised information.
- Duplicate scan events are prevented where applicable.

## F-016: Quest-Linked Scan Validation

<badge color="success">Must Have</badge>

**Description:** Allow valid scans to satisfy specific quest requirements.

**Acceptance criteria:**

- QR code is associated with the correct quest step.
- User meets eligibility rules.
- Quest progress updates server-side.
- A scan cannot complete unrelated quest steps.
- Duplicate scans do not award duplicate progress.

## F-017: Partner QR Campaign Management

<badge color="warning">Should Have</badge>

**Description:** Allow approved partners to participate in QR campaigns and review their activity.

**Requirements:**

- Campaign overview.
- QR association.
- Campaign status.
- Scan totals.
- Participation information.

**Acceptance criteria:**

- Only authorised partner members can manage campaigns.
- Staff cannot change campaign settings.
- Campaign changes are auditable.

---

# MODULE 05 — GAMIFICATION AND QUEST SYSTEM

## F-018: Quest Tree

<badge color="success">Must Have</badge>

**Description:** A visual progression system encouraging users to explore Pipa.

**Requirements:**

- Available quests.
- Locked quests.
- Active quests.
- Completed quests.
- Required steps.
- Rewards.
- Progress indicators.

**Acceptance criteria:**

- Quest states are displayed correctly.
- Users can start eligible quests.
- Progress is stored in Supabase.
- Completion is determined server-side.

## F-019: Quest Progress Tracking

<badge color="success">Must Have</badge>

**Description:** Track user progress through individual quest steps.

**Requirements:**

- Quest start.
- Step completion.
- Completion timestamps.
- Progress status.
- Reward eligibility.

**Acceptance criteria:**

- Users can only update their own progress through authorised actions.
- Step completion is validated.
- Duplicate completion is prevented.
- Progress remains consistent across devices.

## F-020: Points and Loyalty Rewards

<badge color="success">Must Have</badge>

**Description:** Reward eligible user activities with points or other defined benefits.

**Requirements:**

- Defined earning rules.
- Transaction history.
- Reward eligibility.
- Server-side point calculations.

**Important distinction:**

A scan event does not automatically grant points. A validated action must meet an explicit reward rule.

**Acceptance criteria:**

- Points cannot be edited by the browser.
- Duplicate reward transactions are prevented.
- Each reward has an identifiable source event.

## F-021: Multi-Tier Rewards

<badge color="warning">Should Have</badge>

**Description:** Offer different rewards based on defined user progression or status.

**Example tiers:**

- Standard reward: basic discount.
- Golden QR: enhanced reward for eligible high-status nomads.

**Acceptance criteria:**

- Tier eligibility is defined.
- Reward values are stored and validated server-side.
- Partners see only the information needed to fulfil the reward.
- Higher-value rewards have stronger verification rules where appropriate.

## F-022: Inventory and Digital Collectibles

<badge color="success">Must Have</badge>

**Description:** Let users collect digital artwork and achievements.

**Requirements:**

- Achievement image.
- Name.
- Description.
- Unlock date.
- Associated quest.
- Rarity or category where applicable.

**Acceptance criteria:**

- Only earned achievements appear as unlocked.
- Inventory is private to the user by default.
- Collectibles are separate from redeemable vouchers.

---

# MODULE 06 — VOUCHERS AND FLASH DROPS

## F-023: Voucher Wallet

<badge color="success">Must Have</badge>

**Description:** Store and organise user rewards.

**Requirements:**

- Active vouchers.
- Redeemed vouchers.
- Expired vouchers.
- Voucher details.
- Expiry information.
- Redemption instructions.

**Acceptance criteria:**

- Users only see their own vouchers.
- Voucher status is accurate.
- Expired vouchers cannot be redeemed.
- Redemption status updates after server confirmation.

## F-024: Voucher QR Display

<badge color="success">Must Have</badge>

**Description:** Generate a secure voucher representation that authorised staff can scan.

**Acceptance criteria:**

- Voucher token is unpredictable.
- Personal information is not embedded in the QR.
- Invalid and revoked vouchers are rejected.
- Tokens are not reusable after successful redemption.

## F-025: Staff Scanner

<badge color="success">Must Have</badge>

**Description:** Provide a simplified, authenticated interface for business staff.

**Requirements:**

- Staff login.
- Business membership validation.
- Camera scanner.
- Voucher validation.
- Redemption confirmation.
- Clear result messages.

**Acceptance criteria:**

- Unauthenticated users cannot redeem vouchers.
- Staff can only operate for authorised businesses.
- Successful redemption is atomic.
- Duplicate redemption is rejected.
- The scanner works on supported mobile browsers.

## F-026: Flash Drops

<badge color="success">Must Have</badge>

**Description:** Allow partners to create short-term offers for eligible nomads.

**Requirements:**

- Offer title.
- Description.
- Reward.
- Start time.
- Expiry time.
- Maximum claims.
- Optional geographic radius.
- Eligibility conditions.

**Default campaign rules:**

- 90-minute duration.
- First 10 eligible users.
- Optional 2km targeting.
- One claim per user.

**Acceptance criteria:**

- Only authorised partners can publish offers.
- Inactive and expired offers cannot be claimed.
- Claim limits are enforced transactionally.
- A user cannot claim twice.
- Successful claims are recorded.

## F-027: Digital Welcome Pack

<badge color="warning">Should Have</badge>

**Description:** Introduce new nomads to participating partner benefits.

**Requirements:**

- Welcome message.
- Partner offers.
- Voucher links.
- Expiry information.
- Clear redemption instructions.

**Acceptance criteria:**

- Eligible new users can access the pack.
- Voucher terms are visible.
- Each reward has a defined validity period.
- Redeemed rewards update correctly.

---

# MODULE 07 — PARTNER DASHBOARD

## F-028: Partner Registration

<badge color="success">Must Have</badge>

**Description:** Let local businesses apply to join the platform.

**Requirements:**

- Business information.
- Contact person.
- Contact details.
- Business category.
- Location.
- Website or social links.

**Acceptance criteria:**

- Application is stored securely.
- Admin can review it.
- Applicant receives a status update.
- Duplicate applications are identified.

## F-029: Business Management Dashboard

<badge color="success">Must Have</badge>

**Description:** Give partners access to their business information and platform tools.

**Requirements:**

- Business overview.
- Profile management.
- Traffic Router.
- Offers.
- Analytics.
- Settings.

**Acceptance criteria:**

- Business data is restricted to authorised members.
- Role permissions are enforced.
- Changes are saved and validated.
- Dashboard works on mobile and desktop.

## F-030: Partner Analytics

<badge color="success">Must Have</badge>

**Description:** Demonstrate the value generated by Nomads Pipa.

**Metrics:**

- QR scans.
- Unique users.
- Quest completions.
- Vouchers issued.
- Voucher redemptions.
- Flash Drop claims.

**Acceptance criteria:**

- Metrics are business-specific.
- Date filters work.
- Duplicate events do not inflate counts.
- Personal information is not unnecessarily exposed.

## F-031: Business Staff Management

<badge color="warning">Should Have</badge>

**Description:** Let owners invite and manage employees.

**Requirements:**

- Staff invitation.
- Role assignment.
- Membership activation.
- Access revocation.

**Acceptance criteria:**

- Only authorised owners or managers can manage access.
- Staff permissions are limited.
- Revoked users immediately lose business access.

---

# MODULE 08 — ESSENTIAL SERVICES AND CONCIERGE

## F-032: Essential Services Directory

<badge color="success">Must Have</badge>

**Description:** Provide practical information and contacts for important local services.

**Subcategories:**

- Visa and immigration guidance.
- Emergency contacts.
- Hospitals and doctors.
- Dentists.
- Vaccine information.
- Veterinary care.
- Laptop and cellphone repair.
- Couriers and DHL.
- Laundry.
- Beauty and wellness.
- Pix payment guidance for foreigners.

**Acceptance criteria:**

- Information is organised by service type.
- Contact details are displayed where verified.
- Emergency information is clearly distinguished from general recommendations.
- Outdated information can be updated by admins.

## F-033: Concierge Service

<badge color="warning">Should Have</badge>

**Description:** Offer personalised assistance for users who want help organising their stay in Pipa.

**Suggested packages:**

| Package    | Description                                              |
| ---------- | -------------------------------------------------------- |
| Essential  | Basic local guidance and practical recommendations       |
| Experience | Help planning activities, dining, and social experiences |
| Premium    | More personalised planning and coordination              |

Package inclusions, pricing, and availability must be confirmed before publication.

**Requirements:**

- Package descriptions.
- Enquiry form.
- Contact details.
- Service expectations.
- Optional payment integration in a later phase.

**Acceptance criteria:**

- Users can understand what each package includes.
- Enquiries are securely stored.
- The team can follow up with the customer.
- No service is presented as confirmed until accepted by the provider.

## F-034: Pix Payment Guidance

<badge color="warning">Should Have</badge>

**Description:** Explain how foreigners can navigate Pix payments in Brazil.

**Requirements:**

- Plain-language guidance.
- Explanation of common payment scenarios.
- Links to verified financial service information.
- Warnings about scams and unofficial intermediaries.

**Acceptance criteria:**

- Information is reviewed and kept current.
- The platform does not request users' banking credentials.
- Content is educational, not financial advice.

---

# MODULE 09 — PLATFORM AND CONTENT MANAGEMENT

## F-035: Admin Content Management

<badge color="success">Must Have</badge>

**Description:** Allow authorised admins to manage listings, categories, events, and partner content.

**Requirements:**

- Create and edit categories.
- Approve business listings.
- Manage events.
- Manage community links.
- Review offers.
- Moderate inappropriate or inaccurate content.

**Acceptance criteria:**

- Only platform admins can access these tools.
- Important actions are recorded.
- Published content is visible to visitors.
- Draft content remains private.

## F-036: Multilingual Content

<badge color="warning">Should Have</badge>

**Description:** Support English and Portuguese content.

**Recommended MVP approach:**

- Interface labels use translation files.
- Core navigation is available in English and Portuguese.
- Important business and service descriptions receive reviewed translations.
- Automated translation may provide a draft but should not publish important information without review.

**Acceptance criteria:**

- Users can change interface language.
- Language preference persists.
- Missing translations have a fallback.
- Critical service and safety information is reviewed.

## F-037: Founder and About Page

<badge color="info">Could Have</badge>

**Description:** Introduce the people behind Nomads Pipa.

**Requirements:**

- Founder photos.
- Short biographies.
- Mission and story.
- Contact or community CTA.

**Acceptance criteria:**

- Content is editable.
- Images have appropriate permission.
- The page works on mobile.

## F-038: Blog and Editorial Content

<badge color="warning">Should Have</badge>

**Description:** Publish practical guides and editorial content about Pipa.

**Requirements:**

- Article title.
- Cover image.
- Rich text or structured content.
- Categories.
- Publication date.
- SEO metadata.

**Acceptance criteria:**

- Published articles render consistently.
- Formatting is preserved after publishing.
- Mobile layouts do not break.
- Draft articles are not publicly accessible.

---

# 4. Explicit MVP Exclusions

The following features should not be built during the initial MVP unless priorities change.

| Feature                               | Decision   | Reason                                   |
| ------------------------------------- | ---------- | ---------------------------------------- |
| Native iOS app                        | Won't Have | PWA is sufficient initially              |
| Native Android app                    | Won't Have | PWA is sufficient initially              |
| Full social network                   | Won't Have | High development and moderation cost     |
| Public direct messaging               | Won't Have | Privacy and moderation complexity        |
| AI recommendation engine              | Won't Have | Not required for initial validation      |
| Advanced GPS tracking                 | Won't Have | Privacy and complexity                   |
| Automated accommodation booking       | Won't Have | Requires provider integrations           |
| Complex partner loyalty configuration | Won't Have | Start with platform-defined rules        |
| Advanced fraud detection              | Won't Have | Begin with validation and audit controls |

---

# 5. Feature Dependencies

The following dependencies should guide implementation.

| Feature                 | Depends on                                     |
| ----------------------- | ---------------------------------------------- |
| Business directory      | Businesses, categories, tags                   |
| Events calendar         | Events                                         |
| Contextual discovery    | Categories, tags, businesses                   |
| User registration       | Supabase Auth, profiles                        |
| Quest Tree              | Quests, quest steps, progress                  |
| QR scanning             | Authentication, QR codes, scan events          |
| Quest completion        | Scan validation, quest rules                   |
| Points                  | Validated reward events                        |
| Inventory               | Achievements, user achievements                |
| Voucher wallet          | Vouchers, voucher ownership                    |
| Staff scanner           | Auth, business memberships, voucher redemption |
| Flash Drops             | Businesses, offers, claims                     |
| Partner analytics       | Scan, quest, voucher, and claim records        |
| Accommodation enquiries | Auth, accommodation enquiry records            |
| Concierge               | Enquiry records and service packages           |

---

# 6. Recommended Development Sequence

## Phase 1 — Discovery Foundation

Build:

- F-001 Homepage.
- F-002 Categories.
- F-003 Business Listings.
- F-004 Contextual Filters.
- F-006 Events Calendar.
- F-028 Partner Registration.
- F-035 Basic Admin Content Management.

**Goal:** Launch a useful local discovery product.

## Phase 2 — User Accounts

Build:

- F-005 Search.
- F-013 Accommodation Enquiries.
- User registration and profiles.
- Basic user dashboard.
- Essential Services directory.

**Goal:** Establish authenticated users and useful conversion journeys.

## Phase 3 — Traffic Router

Build:

- F-014 QR Codes.
- F-015 Scan History.
- F-016 Quest-Linked Scan Validation.
- F-025 Staff Scanner.

**Goal:** Verify physical partner interactions.

## Phase 4 — Gamification and Rewards

Build:

- F-018 Quest Tree.
- F-019 Quest Progress.
- F-020 Points.
- F-022 Inventory.
- F-023 Voucher Wallet.
- F-024 Voucher QR.
- F-025 Staff Redemption.

**Goal:** Turn verified interactions into a rewarding experience.

## Phase 5 — Partner Growth

Build:

- F-026 Flash Drops.
- F-029 Partner Dashboard.
- F-030 Analytics.
- F-031 Staff Management.
- F-027 Digital Welcome Pack.

**Goal:** Give businesses tools to attract and retain nomads.

## Phase 6 — Expansion

Build:

- F-007 Community Picks.
- F-008 WhatsApp Links.
- F-009 Give Back.
- F-010 Get Me a Ride.
- F-011 Transportation Directory.
- F-033 Concierge.
- F-036 Multilingual Content.
- F-037 About Page.
- F-038 Blog improvements.

**Goal:** Expand the local ecosystem and community value.

---

# 7. Global Acceptance Criteria

A feature is not considered complete until:

- Its requirements are implemented.
- Permissions are enforced.
- Data is validated.
- Loading states are present.
- Error states are handled.
- Mobile layouts work.
- Empty states are handled.
- Relevant integration tests pass.
- Analytics events are defined where appropriate.
- Documentation is updated.

## 8. MVP Launch Criteria

The MVP should be ready for initial launch when:

1. Visitors can discover useful businesses, categories, and events.
2. Users can register and manage their profiles.
3. Partners can apply and manage approved listings.
4. Physical QR codes can be validated.
5. Quest progress is tracked securely.
6. Eligible rewards can be issued.
7. Users can view their voucher wallet.
8. Staff can securely redeem vouchers.
9. Partners can launch limited Flash Drops.
10. Partners can see basic performance metrics.
11. Admins can manage public content.
12. Core flows work reliably on mobile devices.

**Product principle:** Build a genuinely useful discovery experience first, then use the Traffic Router and reward ecosystem to create measurable value for both nomads and local businesses.
