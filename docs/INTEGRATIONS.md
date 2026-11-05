# Integrations Architecture

**Project:** Nomads Pipa  
**Document:** `docs/INTEGRATIONS.md`
**Status:** Implementation-ready baseline  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

Nomads Pipa will connect selected external services to improve discovery, communication, payments, analytics, and partner operations.

The integration strategy must:

- Keep the MVP simple and affordable.
- Avoid unnecessary third-party dependencies.
- Protect user and business data.
- Allow integrations to be replaced without rewriting the application.
- Keep critical business logic inside Nomads Pipa.
- Provide a reliable experience on mobile devices.

**Core principle:** External services should extend Nomads Pipa, not control its core business logic.

## 2. Integration Strategy

Divide integrations into three categories.

| Priority          | Meaning                                       | Examples                                    |
| ----------------- | --------------------------------------------- | ------------------------------------------- |
| P0 — MVP          | Needed for essential functionality            | Supabase Auth, database, storage            |
| P1 — Early growth | Improves the product after initial validation | WhatsApp links, email delivery, maps        |
| P2 — Future       | Adds advanced functionality                   | Payment automation, CRM, advanced messaging |

Avoid integrating every possible service before validating the product.

## 3. Integration Architecture

Use a service layer between the frontend and external providers.

```text
                NOMADS PIPA
                     |
                     v
              Next.js Application
                     |
                     v
             Internal Service Layer
                     |
       +-------------+-------------+
       |             |             |
       v             v             v
    Supabase      WhatsApp       Email
       |
       +-----------------------------+
       |              |              |
       v              v              v
   PostgreSQL      Storage       Authentication
```

External API calls should be made through controlled server-side services whenever credentials, sensitive information, or trusted business logic are involved.

### Architecture rules

- UI components must not contain provider-specific business logic.
- API credentials must remain server-side.
- Validate all external API responses.
- Handle timeouts and failures.
- Avoid making critical user actions dependent on optional third-party services.
- Store provider identifiers where necessary.
- Document integration ownership and configuration.

## 4. Supabase

<badge color="success">P0 — MVP</badge>

Supabase is the primary backend infrastructure.

### Services used

| Service            | Responsibility                    |
| ------------------ | --------------------------------- |
| PostgreSQL         | Application database              |
| Supabase Auth      | User authentication               |
| Supabase Storage   | Images and digital artwork        |
| Row Level Security | Data access control               |
| Database functions | Transactional business operations |
| Realtime           | Optional live updates             |

### Integration requirements

- Use the official Supabase client libraries.
- Separate browser and server clients.
- Keep service-role credentials on the server.
- Apply RLS policies to user-facing tables.
- Use migrations for database changes.
- Validate all server-side mutations.

### Critical operations

The following operations must remain controlled by trusted backend logic:

- QR validation.
- Points allocation.
- Quest completion.
- Voucher redemption.
- Flash Drop claims.
- Partner permission checks.

Supabase is the source of truth for these operations.

## 5. WhatsApp Integration

<badge color="success">P0 — Basic links</badge>

WhatsApp is an important communication channel for Nomads Pipa.

The MVP should prioritize simple WhatsApp links rather than a complex messaging integration.

### Use cases

**Consumer experience**

- Contact a business.
- Join community WhatsApp groups.
- Contact transportation partners.
- Request accommodation quotes.
- Contact concierge services.
- Ask about events or activities.

**Partner experience**

- Receive customer inquiries.
- Respond to voucher questions.
- Confirm bookings.
- Receive partner notifications where appropriate.

### Basic integration

Use WhatsApp click-to-chat links.

Example:

```text
https://wa.me/5511999999999
```

The number must include the international country code and digits only.

Optional prefilled message:

```text
https://wa.me/5511999999999?text=Hello%20I%20found%20you%20on%20Nomads%20Pipa
```

Generate these links using validated phone numbers and properly encoded message text.

### WhatsApp group links

Store community group invitation links in a controlled directory.

Recommended fields:

- Group name.
- Description.
- Category.
- Language.
- Invitation URL.
- Active status.
- Last verification date.

Examples of categories:

- General Nomads Pipa.
- Surfing.
- Accommodation.
- Events.
- Sports.
- Remote work.
- Give Back.

Do not expose private group invitation links without authorization or community approval.

### Future: WhatsApp Business Platform

Consider the official WhatsApp Business Platform when automated notifications become necessary.

Potential uses:

- Voucher confirmation.
- Flash Drop notifications.
- Booking confirmations.
- Concierge updates.
- Partner communication workflows.

Before implementation, evaluate provider pricing, message templates, consent requirements, and applicable WhatsApp policies.

Do not automate unsolicited marketing messages.

## 6. Maps and Location Services

<badge color="warning">P1 — Early growth</badge>

Maps can improve local discovery and location-based functionality.

Nomads Pipa should remain a curated discovery platform, not a general-purpose maps competitor.

### Potential use cases

- Display partner business locations.
- Show nearby activities.
- Help users find events.
- Support transportation information.
- Display relevant local points of interest.
- Support proximity-based Flash Drop eligibility.

### Provider options

Possible providers include:

- Google Maps Platform.
- Mapbox.
- OpenStreetMap-based providers.

Choose a provider after comparing:

- Pricing.
- Usage limits.
- Mobile experience.
- Geocoding availability.
- Data licensing.
- Coverage in Pipa and surrounding areas.

Do not assume every provider offers identical local coverage.

### Location architecture

Location services should be abstracted behind an internal interface.

Example:

```ts
type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationProvider = {
  getCoordinates(): Promise<Coordinates>;
  calculateDistance(origin: Coordinates, destination: Coordinates): number;
};
```

The implementation should use a tested distance calculation.

### Privacy requirements

- Request location permission only when needed.
- Explain why location is requested.
- Provide a fallback when permission is denied.
- Avoid collecting continuous background location.
- Do not store unnecessary precise location history.

For Flash Drops, validate eligibility server-side. GPS is an additional signal, not definitive proof of physical presence.

## 7. Email Integration

<badge color="warning">P1 — Early growth</badge>

Email supports account communication and essential platform notifications.

### Use cases

- Account verification.
- Password reset.
- Welcome messages.
- Important account notifications.
- Partner onboarding.
- Concierge inquiry confirmations.
- Booking or quote request confirmations.

### Provider options

Possible providers:

- Resend.
- Postmark.
- Amazon SES.

Select one provider based on reliability, pricing, and integration simplicity.

### Email architecture

Use a reusable server-side email service.

Suggested interface:

```ts
type EmailMessage = {
  to: string;
  subject: string;
  template: string;
  data: Record<string, unknown>;
};

type EmailService = {
  send(message: EmailMessage): Promise<void>;
};
```

### Email rules

- Keep API keys server-side.
- Validate recipient addresses.
- Use approved templates.
- Log delivery status without exposing sensitive message content.
- Handle provider failures.
- Avoid sending duplicate transactional emails.
- Respect marketing consent and unsubscribe requirements.

Supabase Auth can handle authentication emails initially. A separate provider can be introduced when more control over transactional messaging is needed.

## 8. Payment Integration

<badge color="warning">P1/P2 — Based on business validation</badge>

Payments may eventually support:

- Paid concierge packages.
- Accommodation lead-generation packages.
- Partner subscriptions.
- Featured business listings.
- Paid experiences and activities.

### Provider options

Evaluate providers that support the Brazilian market, such as:

- Mercado Pago.
- Stripe, subject to account eligibility and local payment requirements.
- Other suitable Brazilian payment providers.

Do not select a payment provider until the actual commercial model is defined.

### Payment architecture

```text
User selects paid service
          |
          v
Next.js server creates payment
          |
          v
Payment provider checkout
          |
          v
Provider processes payment
          |
          v
Webhook reaches server
          |
          v
Signature and payment status verified
          |
          v
Database transaction updates order
          |
          v
User receives confirmation
```

### Payment security

- Never trust frontend payment-success messages.
- Verify webhook signatures.
- Use idempotency keys where supported.
- Record provider transaction identifiers.
- Store payment status in PostgreSQL.
- Never store raw card details.
- Handle failed, pending, refunded, and disputed payments.
- Reconcile payment records with provider records.

### MVP recommendation

Do not build a complex payment system before validating demand.

Initially, concierge inquiries and partner quote requests can be managed through controlled lead-generation workflows.

## 9. Analytics Integration

<badge color="success">P0 — Basic internal analytics</badge>

Nomads Pipa should use the internal analytics system defined in `architecture/OBSERVABILITY.md` as its source of truth for core product and business metrics.

Optional external analytics tools may be added for broader product insights.

Potential services include:

- Vercel Analytics.
- PostHog.
- Plausible Analytics.

### Events worth measuring

- Account registration.
- Profile completion.
- Business profile views.
- Contact clicks.
- Quest starts and completions.
- Voucher claims.
- Voucher redemptions.
- Flash Drop engagement.
- Concierge inquiries.

### Important distinction

Internal operational records are authoritative for:

- Validated scans.
- Reward allocation.
- Quest completion.
- Voucher redemption.
- Flash Drop claims.

External analytics tools must not determine whether rewards or commercial transactions have occurred.

### Privacy

- Minimize personal data sent to external analytics.
- Configure consent where required.
- Avoid sending authentication tokens.
- Avoid sending precise location coordinates.
- Review provider data-processing and retention policies.

## 10. Translation Integration

<badge color="warning">P1 — Content expansion</badge>

Nomads Pipa needs to support an international audience while operating in Brazil.

The initial language strategy should prioritize:

- English for the primary product interface.
- Portuguese for local business information and important service content.
- Clear language selection.
- Consistent translations for critical user flows.

### Recommended architecture

Use structured translation files for interface content.

Example:

```text
messages/
├── en.json
└── pt-BR.json
```

Example:

```json
{
  "navigation": {
    "home": "Home",
    "explore": "Explore",
    "quests": "Quests",
    "wallet": "Wallet"
  }
}
```

Portuguese equivalent:

```json
{
  "navigation": {
    "home": "Início",
    "explore": "Explorar",
    "quests": "Missões",
    "wallet": "Carteira"
  }
}
```

### Content translation rules

- Interface translations should be reviewed.
- Business descriptions should preserve their original meaning.
- Important safety and emergency information must receive human review.
- Automated translation may assist content production.
- Automatically translated content should not be published as verified without review.

Do not introduce real-time translation APIs into the MVP unless there is a clear need.

## 11. Transportation and Booking Providers

<badge color="secondary">P2 — Future</badge>

Nomads Pipa may eventually connect transportation and accommodation partners through structured booking workflows.

### Transportation use cases

- Airport transfer requests.
- Taxi inquiries.
- Moto-taxi contacts.
- Car rental inquiries.
- Motorbike rental inquiries.
- Bicycle rental inquiries.
- Local bus information.

### Initial implementation

Use curated partner listings with:

- Service description.
- Service area.
- Contact information.
- Price guidance where verified.
- Booking method.
- Availability information where maintained.

A unified "Get Me a Ride" flow can route users to the appropriate provider.

### Future implementation

If partner demand justifies it, introduce:

- Availability integrations.
- Booking APIs.
- Booking status tracking.
- Automated confirmations.

Do not imply real-time availability when a provider has not supplied it.

## 12. External Service Reliability

Every external integration can fail.

Design the application so optional integrations do not break unrelated functionality.

### Required handling

| Failure                         | Expected behavior                                |
| ------------------------------- | ------------------------------------------------ |
| WhatsApp unavailable            | Display alternative contact information          |
| Maps provider unavailable       | Show business address and text directions        |
| Email provider unavailable      | Preserve the request and report delivery status  |
| Analytics unavailable           | Continue core application operations             |
| Payment provider unavailable    | Keep order pending or report payment unavailable |
| Translation service unavailable | Use approved stored translations                 |

### Timeouts and retries

- Use reasonable request timeouts.
- Retry only operations that are safe to retry.
- Apply exponential backoff where appropriate.
- Avoid infinite retry loops.
- Use idempotency for operations that could create duplicate records.
- Record integration failures for diagnosis.

For example, a failed email notification must not cause a successful voucher redemption to be reversed.

## 13. Integration Configuration

Use environment variables for all external provider credentials.

Example `.env.example`:

```env
# Application
NEXT_PUBLIC_APP_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# QR security
QR_SIGNING_SECRET=

# Email
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM_ADDRESS=

# Maps - optional
NEXT_PUBLIC_MAP_PROVIDER_KEY=

# Analytics - optional
NEXT_PUBLIC_ANALYTICS_KEY=

# Payments - future
PAYMENT_PROVIDER_SECRET=
PAYMENT_WEBHOOK_SECRET=
```

Rules:

- Never commit real credentials.
- Keep private API keys server-side.
- Use different credentials for development and production.
- Restrict public API keys by domain or application where supported.
- Rotate credentials if compromised.
- Document every configured integration.

Only configure variables for services actually implemented.

## 14. Integration Testing

Every external integration must have tests.

### Required test cases

**Supabase**

- Authentication success and failure.
- Database permission enforcement.
- Storage upload restrictions.
- Transaction integrity.

**WhatsApp**

- Correct international phone number formatting.
- Correct link generation.
- Message encoding.
- Missing contact handling.

**Maps**

- Coordinate validation.
- Distance calculations.
- Permission denial.
- Provider failure fallback.

**Email**

- Valid recipient.
- Invalid recipient.
- Provider rejection.
- Duplicate notification prevention.

**Payments**

- Successful webhook verification.
- Invalid webhook signature rejection.
- Duplicate webhook handling.
- Pending and failed payment states.
- Refund handling.

**Analytics**

- Correct event names.
- No sensitive data in payloads.
- Failed external analytics requests do not interrupt core operations.

Use mocks for external services in unit tests and controlled test environments for integration tests.

## 15. Implementation Roadmap

### Phase 1 — MVP

- [ ] Supabase authentication.
- [ ] Supabase database.
- [ ] Supabase Storage.
- [ ] WhatsApp click-to-chat links.
- [ ] WhatsApp community group directory.
- [ ] Internal PostgreSQL analytics events.
- [ ] Basic email authentication flows.
- [ ] Integration error logging.

### Phase 2 — Early growth

- [ ] Dedicated transactional email provider.
- [ ] Map provider integration.
- [ ] Improved partner notifications.
- [ ] Internationalization framework.
- [ ] Partner lead management improvements.
- [ ] Optional external product analytics.

### Phase 3 — Commercial expansion

- [ ] Payment provider integration.
- [ ] Paid concierge checkout.
- [ ] Partner subscription workflows.
- [ ] Accommodation and transportation booking integrations.
- [ ] Automated WhatsApp notifications where appropriate.

## 16. Definition of Done

An integration is considered complete when:

1. Its purpose and business value are documented.
2. Credentials are securely configured.
3. Provider-specific logic is isolated.
4. Inputs and responses are validated.
5. Failure handling is implemented.
6. Relevant unit and integration tests pass.
7. Sensitive data is protected.
8. Monitoring and error reporting are available.
9. The integration does not unnecessarily block unrelated features.
10. Its operating cost and limitations are understood.

---

## 17. Final Architecture Principle

Nomads Pipa should own its user relationships, business rules, reward system, and operational data.

External providers should handle specialized capabilities such as messaging, maps, email delivery, and payment processing.

This keeps the platform flexible, reduces vendor lock-in, and allows a solo developer to expand the product without creating unnecessary infrastructure complexity.
