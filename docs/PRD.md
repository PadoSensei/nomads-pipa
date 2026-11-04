# Nomads Pipa — Product Requirements Document (PRD)

**Document status:** Draft  
**Version:** 1.0  
**Product:** Nomads Pipa  
**Platform:** Mobile-first Progressive Web App (PWA)  
**Initial market:** Pipa, Rio Grande do Norte, Brazil

---

# 1. Product Overview

## 1.1 Product vision

Nomads Pipa is a mobile-first digital hub connecting digital nomads, travellers, local businesses, and community initiatives in Pipa, Brazil.

The platform helps visitors navigate everyday life in Pipa by bringing together trusted local recommendations, accommodation, transportation, events, activities, essential services, and community connections.

For local businesses, Nomads Pipa provides a channel to reach an international audience, attract customers, distribute offers, and measure engagement through a digital loyalty and quest system.

The product should feel like a combination of:

- A practical local guide.
- A community and events platform.
- A discovery and recommendation service.
- A local business directory.
- A digital loyalty and rewards ecosystem.

It should not attempt to become another general-purpose maps or travel-booking platform. Its value comes from contextual local knowledge, community recommendations, curated partners, and useful connections.

## 1.2 Core value proposition

**For nomads and visitors:**

Find the right places, people, services, and experiences in Pipa without spending hours searching across disconnected websites and WhatsApp groups.

**For local businesses:**

Reach relevant visitors, convert discovery into physical visits, and build repeat customer relationships through measurable promotions and loyalty rewards.

**For the local community:**

Make it easier for visitors and residents to discover local initiatives, participate in events, support businesses, and contribute positively to Pipa.

## 1.3 Product principles

The following principles should guide product and engineering decisions.

| Principle                   | Requirement                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Mobile first                | All primary experiences must work comfortably on a mobile device.                       |
| Local relevance             | Prioritise useful, contextual information over generic listings.                        |
| Community-led               | Make recommendations and participation visible where appropriate.                       |
| Simple navigation           | Users should find essential categories quickly.                                         |
| Business value              | Partner features must create measurable value for local businesses.                     |
| Trust and safety            | Clearly distinguish verified partners, community recommendations, and general listings. |
| Lean implementation         | Prefer simple, maintainable features over complex systems that delay launch.            |
| International accessibility | First-class trilingual support (English, Brazilian Portuguese, Spanish) via next-intl.  |

---

# 2. Technical Stack & Platform Requirements

## 2.1 Required technology stack

The MVP must use the following stack.

| Layer             | Technology                                                                 | Purpose                                                                   |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Web framework     | Next.js                                                                    | Application framework, routing, rendering, and server-side functionality. |
| Language          | TypeScript                                                                 | Type safety and maintainability.                                          |
| Styling           | Tailwind CSS                                                               | Utility-first styling and responsive layouts.                             |
| UI components     | shadcn/ui                                                                  | Accessible, reusable interface components.                                |
| Backend           | Supabase                                                                   | Backend services and application data.                                    |
| Database          | PostgreSQL via Supabase                                                    | Relational data storage.                                                  |
| Authentication    | Supabase Auth                                                              | User and partner authentication.                                          |
| File storage      | Supabase Storage                                                           | Business images, profile images, and uploaded media.                      |
| Server-side logic | Next.js server functionality and Supabase Edge Functions where appropriate | Secure operations and integrations.                                       |
| Hosting           | Vercel or an equivalent Next.js-compatible platform                        | Application deployment.                                                   |

The selected stack is a product requirement, not an optional recommendation.

## 2.2 Architecture requirements

The application should use a modular architecture within a single Next.js project for the MVP.

Avoid introducing microservices or separate backend applications unless a clear scaling requirement emerges.

The application should have three main interface areas:

1. Public-facing discovery experience.
2. Authenticated nomad experience.
3. Authenticated partner/business management experience.

Administrative functionality should be restricted to authorised administrators.

## 2.3 PWA requirements

The platform should be installable as a Progressive Web App.

MVP requirements:

- Responsive mobile-first interface.
- Installable application manifest.
- Application icon and splash-screen configuration.
- HTTPS.
- Mobile-friendly navigation.
- Appropriate loading and error states.
- Basic offline fallback for the application shell where practical.

The first release should not promise full offline functionality. QR verification, voucher redemption, and other sensitive operations require a live connection to the backend.

## 2.4 Browser support

Prioritise:

- Mobile Safari on iOS.
- Chrome on Android.
- Chrome and Safari on desktop.

The experience should degrade gracefully when browser capabilities such as GPS or camera access are unavailable.

---

# 3. User Types & Roles

The platform must support distinct user experiences without requiring separate applications.

## 3.1 Nomad / Visitor

The primary consumer user.

Typical needs:

- Discover places and services.
- Find events and meet other people.
- Find accommodation and transport.
- Access reliable local information.
- Receive partner discounts.
- Participate in quests and earn rewards.
- Save useful places and offers.

Permissions:

- Browse public listings.
- Create and manage a profile.
- Save favourites.
- Join community activities where supported.
- Participate in quests.
- Collect and redeem eligible vouchers.
- Access eligible member benefits.

## 3.2 Local Resident

A resident may use many of the same discovery and community features as a visitor.

The platform should allow residents to participate in community recommendations and events without forcing them into a digital-nomad-specific experience.

For MVP purposes, resident and visitor accounts can share the same base user role, with an optional profile classification.

## 3.3 Business Partner

A registered local business that has been approved to manage its presence on Nomads Pipa.

Typical needs:

- Promote the business.
- Manage business information.
- Publish offers.
- Participate in quests.
- Attract customers.
- Track QR scans and voucher redemptions.
- Understand campaign performance.

Partner permissions:

- Manage assigned business listings.
- Manage permitted offers and vouchers.
- Access the partner dashboard.
- View business-specific analytics.
- Manage authorised staff access where supported.

A business account must not automatically receive administrative access to the entire platform.

## 3.4 Business Staff

Staff members need a simple interface to verify customer QR codes.

The staff experience should be deliberately restricted.

MVP permissions:

- Access assigned business redemption functionality.
- Scan or enter a redemption code.
- View the result of a redemption attempt.
- Confirm whether an offer is valid or already used.

Staff should not be able to modify business settings, financial information, or platform-wide content.

## 3.5 Platform Administrator

The administrator manages the overall platform.

Responsibilities:

- Approve and manage partners.
- Manage directory content.
- Manage categories.
- Create and manage quests.
- Create and manage platform-wide offers.
- Review reported content.
- Manage users and permissions.
- Monitor system activity and platform analytics.

Administrative access must be protected by server-side authorisation checks.

---

# 4. Core Product Areas

The platform is organised into the following product areas.

| Product area        | Main purpose                                               | MVP priority |
| ------------------- | ---------------------------------------------------------- | ------------ |
| Discovery Hub       | Help users navigate Pipa.                                  | Must Have    |
| Transportation      | Connect users with suitable transport options.             | Should Have  |
| Accommodation       | Discover accommodation and request partner quotes.         | Should Have  |
| Events & Community  | Help users find events and meet people.                    | Must Have    |
| Food & Drink        | Contextual discovery of restaurants, bars, and cafes.      | Must Have    |
| Sports & Activities | Discover activities and experiences.                       | Should Have  |
| Essential Services  | Find important local services and emergency information.   | Must Have    |
| Community           | Connect WhatsApp groups, initiatives, and social projects. | Should Have  |
| Partner Programme   | Allow local businesses to join the platform.               | Must Have    |
| Loyalty & Quests    | Encourage partner visits and repeat engagement.            | Should Have  |
| Concierge           | Offer personalised, higher-value assistance.               | Could Have   |

The MVP priorities above are provisional. The final release scope should be confirmed against available development time, partner readiness, and operational capacity.

---

# 5. Discovery Hub

## 5.1 Objective

The Discovery Hub is the main entry point into Nomads Pipa.

It should answer:

**"What do I need, and where can I find it in Pipa?"**

The experience should prioritise commonly needed information and contextual discovery rather than displaying an overwhelming directory.

## 5.2 Navigation requirements

Users must be able to access all main categories from the main navigation or discovery interface.

A known issue in the existing experience is that users cannot see all categories when entering the hub.

This must be treated as an MVP usability fix.

Requirements:

- Display all primary categories.
- Avoid hiding important categories behind unclear navigation.
- Use recognisable labels and icons.
- Support scrolling where necessary.
- Provide clear category entry points.
- Keep navigation consistent across mobile screens.

## 5.3 Discovery categories

The main discovery categories should include:

1. Food & Drink.
2. Events & Community.
3. Accommodation.
4. Transportation.
5. Sports & Activities.
6. Essential Services.
7. Local Experiences.
8. Community & Give Back.

The directory should support subcategories and contextual tags.

## 5.4 Listing information

A directory listing should support:

- Business or service name.
- Description.
- Category and subcategory.
- Location.
- Images.
- Contact information.
- WhatsApp link where applicable.
- Website or social links.
- Opening hours where relevant.
- Price information where available.
- Partner status.
- Verification status.
- Relevant tags.

Not every field needs to be mandatory.

The listing interface should remain useful even when information is incomplete.

## 5.5 Trust indicators

The interface should distinguish between:

- Verified Partner: an approved business partner.
- Community Pick: a recommendation supported by community participation.
- Official Event: an event organised or endorsed by Nomads Pipa.
- General Listing: an informational listing that has not received a special verification status.

Do not imply that every listing has been independently verified.

---

# 6. Transportation

## 6.1 Objective

Make it easy for visitors to identify an appropriate transport option without needing to understand every local service category.

## 6.2 Primary CTA

The main transportation entry point should be:

**"Get Me a Ride"**

Instead of presenting users with several competing transport buttons, ask a small number of questions and route them to the relevant option.

Example questions:

- Where are you going?
- When do you need transport?
- How many people are travelling?
- Do you need airport pickup, local transport, or a rental?

The system can then display suitable services.

## 6.3 Supported services

- Airport Transfer.
- Taxi.
- Moto-Taxi.
- Car Rental.
- Motorbike Rental.
- Bicycle Rental.
- Local Bus Schedules.

Airport transfer, taxi, and moto-taxi may be monetised through partner referrals or paid upsells.

## 6.4 MVP requirements

- Display available transport categories.
- Provide relevant partner contact links.
- Support WhatsApp enquiries.
- Clearly communicate whether a service requires advance booking.
- Display bus schedule information where reliable information is available.

The MVP does not need to operate its own dispatch or real-time vehicle tracking system.

---

# 7. Accommodation

## 7.1 Objective

Help users discover suitable accommodation and connect them with local providers.

## 7.2 Accommodation categories

- House rentals.
- Hostels.
- Pousadas.
- Apartments.
- Longer-term rentals.
- Real estate services.

## 7.3 Quote request feature

Provide a primary CTA:

**"Get Me Quotes from Partners"**

Users should be able to submit a basic accommodation enquiry.

Suggested fields:

- Check-in date.
- Check-out date or expected length of stay.
- Number of guests.
- Accommodation type.
- Approximate budget.
- Additional requirements.
- Contact details.

The request can be routed to relevant approved partners.

## 7.4 Monetisation

Potential revenue models:

- Paid partner listings.
- Qualified accommodation leads.
- Featured accommodation placements.
- Referral arrangements where legally and operationally appropriate.

The MVP should begin with a simple lead-request workflow rather than a full booking engine.

---

# 8. Events & Community Calendar

## 8.1 Objective

The calendar should answer:

**"If I want to meet people today, where should I go?"**

The experience should prioritise actionable events and social opportunities.

## 8.2 Event categories

Events should support the following labels:

| Label               | Definition                                                                          |
| ------------------- | ----------------------------------------------------------------------------------- |
| Nomads Pipa Meet-up | An official community event organised by Nomads Pipa.                               |
| Community Pick      | A third-party event where community members have confirmed that they are attending. |
| City Event          | A general event, cultural activity, or local suggestion.                            |

These labels must not be interchangeable.

## 8.3 Event data

Each event should support:

- Event title.
- Description.
- Start and end date/time.
- Location.
- Event category.
- Event label.
- Organiser.
- External booking or information link.
- Cost, if known.
- Image.
- Publication status.
- Whether it is recurring.
- Community attendance information where available.

## 8.4 MVP requirements

- Browse upcoming events.
- View events happening today.
- Filter by category or event type.
- Open event details.
- Link to WhatsApp, Instagram, or external booking pages.
- Allow administrators to publish and manage events.

A full ticketing system is not required for the MVP.

---

# 9. Food & Drink

## 9.1 Objective

Provide contextual food and drink discovery based on what users want to do, rather than competing directly with Google Maps.

The platform should answer questions such as:

- Where can I get a good daily meal?
- Where can I work remotely?
- Where can I watch the sunset?
- Where can I find live music tonight?
- Where can I get a genuinely cold beer?

## 9.2 Contextual categories

Initial categories should include:

- PF / daily meal.
- Weekly meal prep / marmitas.
- Date spots.
- Vegan options.
- Remote-work cafes.
- Cafes with Wi-Fi and plugs.
- Sunset views.
- Weekday nightlife.
- Live music tonight.
- Forró.
- Samba.
- Reggae.
- House music.
- Espresso Martini.
- Cold beer.

## 9.3 Listing subcategories

- Restaurants.
- Bars.
- Clubs.
- Cafes.
- Delivery.

## 9.4 MVP requirements

- Browse by contextual category.
- View relevant business details.
- Contact the business.
- View opening hours where available.
- Identify partner businesses.
- Display applicable member discounts.

Avoid promising live availability or real-time opening status unless that information is actively maintained.

---

# 10. Sports & Activities

## 10.1 Supported categories

- Surf lessons.
- Surfboard rentals.
- Yoga.
- Gyms.
- Padel.
- Beach tennis.
- Football.
- Altinha.
- Local activities and experiences.

## 10.2 MVP requirements

Each activity listing should support:

- Activity name.
- Description.
- Provider.
- Location.
- Price information where available.
- Contact or booking link.
- Schedule or availability information where maintained.
- Relevant images.
- Partner status.

The MVP should facilitate discovery and contact rather than build a complex activity-booking engine.

---

# 11. Essential Services

## 11.1 Objective

Provide visitors with reliable access to important services and practical local information.

This category has particular importance because users may need it when they are unfamiliar with the area.

## 11.2 Categories

- Visa and immigration guidance.
- Emergency contacts.
- Hospitals.
- Doctors.
- Dentists.
- Vaccine information.
- Veterinary care.
- Laptop repair.
- Mobile phone repair.
- Couriers and DHL.
- Laundry.
- Beauty and wellness.
- Pix payment guidance for foreigners.

## 11.3 Trust and accuracy requirements

Emergency and health-related information must be treated differently from ordinary promotional listings.

Requirements:

- Display clear contact information.
- Identify emergency services distinctly.
- Include the date information was last reviewed where practical.
- Avoid presenting general informational content as professional medical or legal advice.
- Provide official links for high-stakes information where possible.

---

# 12. Community & Give Back

## 12.1 Objective

Help users connect with existing communities and contribute positively to the local area.

## 12.2 Features

- WhatsApp community groups.
- Links to relevant communities in other Brazilian destinations.
- Give Back initiatives.
- NGO support.
- Social projects.
- Beach cleanups.
- Community volunteering.
- Local community recommendations.

## 12.3 MVP requirements

- Display curated community links.
- Provide short descriptions of each group or initiative.
- Include clear external links.
- Identify official Nomads Pipa initiatives separately from third-party organisations.

WhatsApp integration can initially be implemented through external invite links. A custom messaging platform is outside MVP scope.

---

# 13. Partner Programme

## 13.1 Objective

Give local businesses a clear way to join Nomads Pipa and reach the nomad community.

## 13.2 Become a Partner page

The page should explain:

- What Nomads Pipa is.
- Who the audience is.
- How businesses can benefit.
- Available partnership opportunities.
- How QR campaigns and vouchers work.
- How to apply.

Primary CTA:

**"Become a Partner"**

Secondary CTA:

**"Talk to Our Team"**

## 13.3 Partner onboarding

MVP onboarding can be managed through an application form and administrator approval.

Suggested fields:

- Business name.
- Business category.
- Contact person.
- Email.
- WhatsApp.
- Location.
- Website or social profile.
- Short business description.
- Partnership interest.

Once approved, the business can receive access to its partner dashboard.

---

# 14. Loyalty, Quests & Traffic Router

## 14.1 Objective

Create a measurable system that encourages visitors to discover partner businesses, visit physical locations, and return.

The Traffic Router is the platform's engagement and partner-conversion engine.

## 14.2 Quest Tree

Users should be able to browse available quests and track progress.

A quest may require:

- Visiting a partner business.
- Completing a QR scan.
- Visiting multiple participating businesses.
- Participating in a community activity.
- Completing a defined sequence of actions.

Each quest should define:

- Title.
- Description.
- Requirements.
- Reward.
- Participating businesses.
- Start and end dates.
- Maximum completions, if applicable.
- Active status.

The MVP should begin with simple quests rather than a complex branching RPG engine.

## 14.3 QR scan and verification

The intended flow:

1. User opens a quest or partner listing.
2. User visits the participating business.
3. User scans the business QR code.
4. Application submits the scan request.
5. Backend validates the code, user eligibility, and applicable location rules.
6. Backend records the event.
7. Backend updates relevant quest progress.
8. User receives confirmation and any eligible reward.

The backend must determine whether a scan is valid. The client must never be trusted to award points or confirm a successful redemption independently.

GPS should be used as an additional verification signal where appropriate, not as the only security mechanism.

## 14.4 Scan events versus rewards

A scan event and a reward transaction are separate concepts.

A valid scan may:

- Record a visit.
- Advance a quest.
- Award loyalty points.
- Unlock a voucher.
- Trigger a campaign reward.

Not every scan should automatically produce every reward.

Reward eligibility must be determined by explicit rules.

## 14.5 Inventory

Users should have an inventory displaying unlocked digital rewards.

Potential items:

- Digital badges.
- Collectible artwork.
- Quest completion awards.
- Special member status indicators.

The MVP can use simple digital assets and achievement records. Blockchain or NFT functionality is explicitly excluded.

## 14.6 Voucher wallet

Users should have access to:

- Available vouchers.
- Active vouchers.
- Redeemed vouchers.
- Expired vouchers.

Voucher information should include:

- Business.
- Offer description.
- Expiration.
- Redemption requirements.
- Redemption status.

## 14.7 Golden QR and tiered rewards

The system should support multiple reward tiers.

Examples:

- Standard QR: standard discount or loyalty reward.
- Golden QR: special reward for eligible high-status users or selected campaigns.

The reward rules must be configurable and enforced server-side.

Do not make Golden QR rewards available merely because a client submits a particular QR identifier.

---

# 15. Flash Drops

## 15.1 Objective

Allow a participating business to publish a time-limited offer that encourages immediate visits.

Example:

A cafe launches a 90-minute offer for eligible Nomads Pipa users within a 2 km radius.

## 15.2 Partner functionality

A partner should be able to:

- Create an offer.
- Define the discount or benefit.
- Set the duration.
- Set a maximum number of redemptions.
- Publish or activate the offer.
- View redemption activity.

## 15.3 Offer rules

Example campaign:

- Duration: 90 minutes.
- Maximum redemptions: 10.
- Eligibility: active Nomads Pipa users.
- Reward: defined business discount.
- Status: active, expired, exhausted, or cancelled.

The system must prevent redemption beyond the configured limit.

## 15.4 MVP implementation

Start with a basic time-limited offer system.

The 2 km proximity targeting feature should only be enabled when location permissions and reliable location handling are available.

Push notifications and sophisticated audience segmentation can be added later.

---

# 16. Staff QR Scanner

## 16.1 Objective

Give business staff a fast and simple way to validate vouchers or customer redemptions.

## 16.2 Requirements

- Mobile-friendly scanner interface.
- Camera permission handling.
- Manual code entry fallback.
- Server-side code validation.
- Clear success and failure states.
- Duplicate redemption prevention.
- Redemption audit history.

## 16.3 Staff experience

The interface should prioritise speed and clarity.

Staff should not need to navigate the full partner dashboard.

A successful redemption should display a clear confirmation. An invalid, expired, or already-used voucher should display an understandable reason.

---

# 17. Partner Dashboard & Analytics

## 17.1 Dashboard objective

Give business owners a simple overview of their performance on Nomads Pipa.

## 17.2 MVP dashboard features

- Business profile management.
- Offer management.
- Voucher management.
- QR campaign information.
- Scan counts.
- Voucher redemptions.
- Quest participation.
- Basic campaign performance.

## 17.3 Analytics principles

The dashboard should prioritise useful metrics rather than an overwhelming collection of charts.

Initial metrics:

- Total QR scans.
- Valid scans.
- Unique participating users.
- Voucher redemptions.
- Quest completions.
- Flash Drop redemptions.

Analytics must be scoped to the business or businesses the authenticated partner user is authorised to manage.

---

# 18. Concierge

## 18.1 Objective

Provide personalised, higher-value assistance for users who want more than self-service discovery.

## 18.2 Product structure

The concierge should eventually offer packaged service tiers rather than only à la carte assistance.

Possible package concepts:

- **Starter:** basic arrival and local orientation assistance.
- **Explorer:** personalised recommendations and activity planning.
- **Premium:** more comprehensive accommodation, transport, and experience coordination.

These are proposed product structures, not final commercial commitments.

## 18.3 MVP requirements

The first release can use:

- A dedicated concierge page.
- Clear service descriptions.
- Package information.
- Enquiry form.
- WhatsApp contact.
- Manual fulfilment by the Nomads Pipa team.

Automated itinerary planning and booking orchestration are outside initial MVP scope.

---

# 19. Content, Language & Editorial Management

## 19.1 Supported First-Class Languages (NP-016)

The platform supports three first-class languages from foundation:
- **English (`en`)**: Default language for international nomads and global travellers.
- **Brazilian Portuguese (`pt-BR`)**: Natural, culturally appropriate Portuguese for local Pipa residents, Brazilian nomads, and businesses.
- **Spanish (`es`)**: Broadly understandable Spanish for South American and international travellers.

## 19.2 Internationalisation Architecture

- **Locale-prefixed routing**: All routes are explicitly prefixed (`/en/...`, `/pt-BR/...`, `/es/...`) with `localePrefix: 'always'`. The root path `/` inspects `Accept-Language` headers and `NEXT_LOCALE` cookies, defaulting to `/en` without geolocation.
- **Separated message files**: Translation dictionaries are isolated in `messages/en.json`, `messages/pt-BR.json`, and `messages/es.json`, featuring type-safe keys via `next-intl` AppConfig module augmentation.
- **Language selector**: Accessible, keyboard-navigable language selector embedded in `AppHeader` and `AppFooter` displaying full language names ("English", "Português (Brasil)", "Español") while preserving current page pathnames.
- **Controlled fallback**: Development environments surface visible warnings for missing translation keys; production renders structured fallback markers without crashing or silently substituting English.
- **Formatting conventions**: Standardized currency formatting in BRL (`formatCurrencyBRL`), numbers, and dates anchored to `America/Fortaleza` timezone.
- **Shared content models (NP-003 coordination)**: Reusable listings and categories support optional `translations` maps (`Partial<Record<ContentLocale, ...>>`) with clean fallback helpers.

## 19.3 Blog and editorial content

The blog should support:

- Titles.
- Structured headings.
- Paragraphs.
- Lists.
- Images.
- Links.
- Publication dates.
- Draft and published states.

A known issue causes text formatting to break or become misaligned after publishing.

This must be addressed through a consistent content-rendering approach and editorial testing.

---

# 20. MVP Scope & Prioritisation

The MVP should prioritise a useful, trustworthy discovery product before introducing complex automation.

## 20.1 Must Have

- Responsive Next.js application.
- TypeScript implementation.
- Tailwind CSS and shadcn/ui component system.
- Supabase integration.
- Authentication and role-based access.
- Public Discovery Hub.
- Complete, visible category navigation.
- Core directory listings.
- Food & Drink discovery.
- Events calendar.
- Essential Services directory.
- Partner application and approval workflow.
- Basic admin content management.
- About Us page with founder profiles.
- Basic analytics and operational monitoring.

## 20.2 Should Have

- User profiles.
- Accommodation enquiries.
- Transportation enquiry routing.
- Sports and Activities directory.
- WhatsApp community links.
- Partner dashboard.
- QR-based visit verification.
- Basic quest engine.
- Voucher wallet.
- Staff redemption interface.
- Basic partner analytics.

## 20.3 Could Have

- Flash Drops.
- Proximity-targeted offers.
- Golden QR reward tiers.
- Digital collectible inventory.
- Advanced quest trees.
- Push notifications.
- Concierge packages.
- Community attendance confirmations.
- Automated translation workflow.
- Advanced campaign analytics.

## 20.4 Won't Have in the MVP

- Native iOS and Android applications.
- Full accommodation booking engine.
- Real-time taxi dispatch.
- In-app payment processing.
- Custom messaging platform.
- Blockchain or NFT rewards.
- Complex social networking features.
- Automated AI concierge.
- Full offline QR redemption.
- Advanced advertising auction or bidding system.

These exclusions should be revisited only when user demand and business performance justify the additional complexity.

---

# 21. Key User Journeys

## 21.1 New visitor

1. Opens Nomads Pipa.
2. Understands what the platform offers.
3. Browses the Discovery Hub.
4. Finds useful services, food, events, or accommodation.
5. Opens relevant listings.
6. Contacts businesses or joins community activities.
7. Optionally creates an account.

## 21.2 Returning nomad

1. Signs in.
2. Opens the dashboard.
3. Views upcoming events and relevant offers.
4. Checks available quests.
5. Visits a partner business.
6. Scans the QR code.
7. Receives eligible progress or rewards.
8. Checks their voucher wallet.

## 21.3 Business partner

1. Visits the Become a Partner page.
2. Submits an application.
3. Receives administrator approval.
4. Gains access to the partner dashboard.
5. Manages business information.
6. Publishes an offer or participates in a quest.
7. Staff validates customer redemptions.
8. Owner reviews performance metrics.

## 21.4 Staff redemption

1. Opens the staff scanner.
2. Scans a customer's QR code or enters the code manually.
3. Backend validates eligibility.
4. Staff receives a clear result.
5. Successful redemption is recorded in the audit history.

---

# 22. Success Metrics

The MVP should measure both consumer engagement and business value.

## 22.1 Consumer metrics

- Monthly active users.
- Returning users.
- Directory listing views.
- Event views.
- Community link clicks.
- Accommodation enquiries.
- Transportation enquiries.
- Quest participation.
- Voucher claims.
- Voucher redemption rate.

## 22.2 Partner metrics

- Partner applications.
- Approved partners.
- Active partner businesses.
- QR scans per partner.
- Unique visitors per partner.
- Voucher redemptions.
- Flash Drop participation.
- Partner retention.

## 22.3 Product quality metrics

- Mobile usability.
- Page load performance.
- Application error rate.
- Authentication success rate.
- QR validation success rate.
- Content accuracy.
- Broken link rate.

Initial numerical targets should be agreed after establishing a baseline from the first launch period.

---

# 23. Non-Functional Requirements

## Performance

- Prioritise fast mobile loading.
- Optimise images.
- Avoid unnecessary client-side JavaScript.
- Use server rendering or static generation where appropriate.
- Paginate large directories and activity feeds.

## Accessibility

- Use accessible shadcn/ui components.
- Support keyboard navigation.
- Maintain readable contrast.
- Provide clear labels for interactive controls.
- Do not rely exclusively on colour to communicate status.

## Reliability

- Validate important actions on the server.
- Prevent duplicate voucher redemption.
- Maintain an audit history for sensitive operations.
- Handle network failures gracefully.

## Maintainability

- Use TypeScript throughout the application.
- Keep feature logic modular.
- Reuse shared UI components.
- Centralise business rules.
- Document database changes.
- Use migrations for schema updates.

---

# 24. Open Product Decisions

The following decisions should be resolved during implementation planning.

| Decision               | Recommended starting point                              |
| ---------------------- | ------------------------------------------------------- |
| Portuguese translation | English-first with structured support for Portuguese.   |
| Partner approval       | Manual administrator approval.                          |
| Concierge              | Manual enquiry and fulfilment.                          |
| Transport              | Partner referrals rather than dispatch.                 |
| Accommodation          | Partner enquiry rather than booking engine.             |
| QR verification        | Server-side validation with optional GPS checks.        |
| Rewards                | Simple configurable rules before advanced gamification. |
| Flash Drops            | Introduce after basic voucher redemption is stable.     |
| Push notifications     | Defer until the PWA engagement model is established.    |
| Founder profiles       | Include Maria, Lua, and João on the About Us page.      |

---

# 25. Definition of MVP Success

The MVP is ready for public launch when:

1. A visitor can open the platform on mobile and navigate all main categories.
2. Users can discover useful local businesses and services.
3. Events and community information are accessible and understandable.
4. Essential service information is clearly presented.
5. A business can apply to become a partner.
6. An administrator can manage listings and approve partners.
7. Users can create accounts and access their profiles.
8. The application has a secure foundation for QR-based rewards.
9. The application is responsive and installable as a PWA.
10. The platform can be maintained by a small team without unnecessary operational complexity.

**Product direction:** Launch a genuinely useful local discovery and community platform first. Build the Traffic Router as the differentiating engagement and business-value layer on top of that foundation.
