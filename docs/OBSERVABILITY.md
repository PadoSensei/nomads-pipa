# Observability & Monitoring

**Project:** Nomads Pipa  
**Document:** `architecture/OBSERVABILITY.md`  
**Status:** Implementation-ready baseline  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

Observability gives the developer visibility into what is happening inside Nomads Pipa after deployment.

The platform must provide enough information to answer five questions:

1. Is the application working?
2. Are users successfully completing important actions?
3. Are errors affecting consumers, partners, or staff?
4. Are QR scans, quests, vouchers, and Flash Drops behaving correctly?
5. Are partner businesses receiving measurable value?

Observability must support both technical operations and product decisions.

**Core principle:** Track what matters, protect user privacy, and make important failures visible before they become widespread.

## 2. Observability Strategy

Use four complementary areas:

| Area                   | Purpose                       | Example                         |
| ---------------------- | ----------------------------- | ------------------------------- |
| Application monitoring | Understand application health | API errors and response times   |
| Error tracking         | Find and diagnose bugs        | Failed voucher redemption       |
| Product analytics      | Understand user behavior      | Quest completion rate           |
| Business analytics     | Measure partner value         | Verified visits and redemptions |

Keep technical monitoring separate from product analytics.

A user opening the Quest Tree is a product event. An API returning an unexpected server error is a technical event.

## 3. Recommended Tooling

Use a lightweight monitoring stack suitable for a solo developer.

| Tool                           | Responsibility                         | Priority    |
| ------------------------------ | -------------------------------------- | ----------- |
| Vercel Analytics               | Basic traffic and web performance      | Recommended |
| Vercel deployment logs         | Build and runtime diagnostics          | Required    |
| Supabase Dashboard             | Database and authentication monitoring | Required    |
| Supabase Logs                  | Database and API diagnostics           | Required    |
| Sentry                         | Application error tracking             | Recommended |
| Custom PostgreSQL event tables | Product and business analytics         | Required    |

Tool selection should remain flexible. Avoid paying for multiple services that measure the same thing.

### Initial MVP setup

Start with:

- Vercel deployment and runtime logs.
- Supabase database and authentication logs.
- Structured application logs.
- A PostgreSQL-based event system.
- Basic partner analytics.

Add a dedicated error-tracking service when the application begins receiving real users or when debugging becomes difficult.

## 4. Structured Application Logging

Application logs must be consistent and searchable.

Use structured JSON logs rather than relying exclusively on free-form console messages.

### Recommended log fields

```json
{
  "timestamp": "2026-11-02T12:00:00Z",
  "level": "error",
  "service": "voucher-redemption",
  "environment": "production",
  "request_id": "req_example",
  "event": "voucher_redemption_failed",
  "error_code": "VOUCHER_ALREADY_REDEEMED"
}
```

The example is illustrative.

### Log levels

| Level | Meaning                              | Example                      |
| ----- | ------------------------------------ | ---------------------------- |
| DEBUG | Detailed development information     | Validation branch selected   |
| INFO  | Normal application activity          | Flash Drop published         |
| WARN  | Unexpected but recoverable condition | Expired QR submitted         |
| ERROR | Operation failed                     | Voucher redemption failed    |
| FATAL | Critical application failure         | Required service unavailable |

Production logging should avoid excessive DEBUG output.

### Logging rules

- Include timestamps.
- Include environment identifiers.
- Include request or correlation IDs.
- Use consistent event names.
- Avoid logging passwords, access tokens, or signing secrets.
- Avoid unnecessary personal information.
- Do not log complete QR payloads.
- Do not expose internal error details to end users.

## 5. Error Tracking

Capture errors that affect application reliability.

### Important error categories

**Authentication**

- Failed login.
- Invalid authentication session.
- Expired session.
- Unauthorized access.

**Consumer experience**

- Quest progress not loading.
- Inventory not updating.
- Voucher wallet unavailable.
- Directory content failing to load.

**QR and rewards**

- Invalid QR token.
- Failed scan validation.
- Duplicate reward attempt.
- Failed quest completion.
- Voucher redemption conflict.

**Partner operations**

- Flash Drop publication failure.
- Claim transaction failure.
- Business dashboard unavailable.
- Analytics query failure.

**Infrastructure**

- Database connection errors.
- API timeouts.
- Storage upload failures.
- Deployment failures.

### Error reporting requirements

Each report should contain:

- Error category.
- Timestamp.
- Environment.
- Affected operation.
- Request ID.
- Safe technical context.
- Relevant application version.

Do not include personal details unless strictly necessary for diagnosis.

### User-facing error handling

Users should receive clear, actionable messages.

Examples:

| Internal condition        | User-facing message                               |
| ------------------------- | ------------------------------------------------- |
| Invalid QR                | This QR code could not be verified.               |
| Expired voucher           | This voucher has expired.                         |
| Already redeemed          | This voucher has already been used.               |
| Network failure           | Connection problem. Please try again.             |
| Unauthorized staff action | You don't have permission to perform this action. |
| Flash Drop full           | This offer has reached its claim limit.           |

Never show database stack traces or internal implementation details to users.

## 6. Product Analytics

Product analytics helps determine whether Nomads Pipa is useful to digital nomads.

Track meaningful interactions rather than every click.

### Core event categories

**Onboarding**

- `signup_completed`
- `profile_completed`
- `welcome_pack_viewed`

**Discovery**

- `directory_viewed`
- `business_viewed`
- `category_selected`
- `business_contact_clicked`

**Community**

- `event_viewed`
- `event_attendance_intent`
- `whatsapp_group_clicked`

**Gamification**

- `quest_viewed`
- `quest_started`
- `quest_step_completed`
- `quest_completed`
- `reward_unlocked`

**QR**

- `qr_scan_attempted`
- `qr_scan_validated`
- `qr_scan_rejected`

**Vouchers**

- `voucher_viewed`
- `voucher_claimed`
- `voucher_redeemed`

**Flash Drops**

- `flash_drop_viewed`
- `flash_drop_claimed`
- `flash_drop_expired`

**Partner operations**

- `flash_drop_created`
- `business_profile_updated`
- `partner_dashboard_viewed`

## 7. Event Naming Convention

Use lowercase `snake_case` event names.

Each event should describe an action that actually occurred.

For example:

- `voucher_redeemed` means redemption was successfully committed.
- `voucher_redemption_failed` means the redemption operation failed.
- `qr_scan_attempted` means a scan request was received.
- `qr_scan_validated` means server-side validation succeeded.

Do not use `voucher_redeemed` when a user merely opens the scanner.

### Recommended event structure

```json
{
  "event_name": "quest_completed",
  "occurred_at": "2026-11-02T12:00:00Z",
  "user_id": "test-user-id",
  "business_id": "test-business-id",
  "quest_id": "test-quest-id",
  "source": "qr_scan",
  "environment": "production"
}
```

This is an illustrative structure, not a requirement to expose internal database identifiers to analytics consumers.

### Event integrity

Events should be recorded by trusted server-side operations whenever they represent:

- A financial or commercial outcome.
- A reward allocation.
- A voucher redemption.
- A verified QR scan.
- A completed quest.
- A limited-capacity claim.

Client-side events may be used for non-critical interface interactions, but must not be treated as proof of completed business actions.

## 8. Core Product Metrics

Measure the following metrics from the beginning.

### Acquisition and onboarding

| Metric                  | Definition                                       |
| ----------------------- | ------------------------------------------------ |
| New registrations       | Completed account registrations                  |
| Profile completion rate | Completed profiles / registered users            |
| Welcome Pack engagement | Users viewing the Welcome Pack                   |
| Activation rate         | New users completing a defined meaningful action |

Define activation consistently before comparing results over time.

### Discovery

| Metric                 | Definition                             |
| ---------------------- | -------------------------------------- |
| Business profile views | Unique profile views                   |
| Contact clicks         | Clicks on business contact actions     |
| Category engagement    | Interactions with discovery categories |
| Event interest         | Users expressing interest in an event  |

### Gamification

| Metric                        | Definition                        |
| ----------------------------- | --------------------------------- |
| Quest starts                  | Users starting quests             |
| Quest completion rate         | Completed quests / started quests |
| Average quest completion time | Time between start and completion |
| Rewards unlocked              | Successfully granted rewards      |
| Repeat participation          | Users completing multiple quests  |

### Voucher performance

| Metric              | Definition                           |
| ------------------- | ------------------------------------ |
| Voucher claims      | Successful voucher claims            |
| Voucher redemptions | Successfully redeemed vouchers       |
| Redemption rate     | Redemptions / claims                 |
| Expired vouchers    | Vouchers expiring without redemption |

### Flash Drop performance

| Metric               | Definition                           |
| -------------------- | ------------------------------------ |
| Offers published     | Successfully published offers        |
| Offer views          | Unique eligible-user views           |
| Claims               | Successful claims                    |
| Capacity utilization | Claims / available claim capacity    |
| Time to first claim  | Time from publication to first claim |
| Redemption rate      | Redeemed claims / successful claims  |

Use consistent definitions and date ranges across dashboards.

## 9. Partner ROI and Traffic Router Analytics

Partner analytics must focus on outcomes that can be measured reliably.

### Partner dashboard metrics

Each business should be able to see:

- QR scan attempts.
- Validated QR scans.
- Unique participating users.
- Quest completions attributed to the business.
- Voucher claims.
- Voucher redemptions.
- Flash Drop views and claims.
- Campaign performance over time.

### Distinguish visits from scans

A QR scan is not automatically a verified physical visit.

Use explicit metric labels:

| Metric          | Meaning                                                   |
| --------------- | --------------------------------------------------------- |
| Scan attempts   | QR scan requests received                                 |
| Validated scans | Requests passing server-side checks                       |
| Eligible visits | Events satisfying the configured visit verification rules |
| Rewarded visits | Eligible events that resulted in an approved reward       |
| Redemptions     | Successfully used vouchers                                |

Do not market raw scan counts as guaranteed foot traffic.

### ROI calculation

When partner campaign costs and reliable redemption data are available, calculate:

\[
ROI = \frac{\text{Attributed Benefit} - \text{Campaign Cost}}{\text{Campaign Cost}} \times 100
\]

Do not claim exact revenue attribution unless the partner provides verified transaction or sales data.

For the MVP, show measurable engagement and redemption metrics instead of presenting estimated sales as fact.

## 10. Database Design for Analytics

Use a dedicated event table for important product events.

Recommended conceptual structure:

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  event_name TEXT NOT NULL,

  user_id UUID REFERENCES profiles(id),
  business_id UUID REFERENCES businesses(id),

  entity_type TEXT,
  entity_id UUID,

  source TEXT,
  properties JSONB NOT NULL DEFAULT '{}',

  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX analytics_events_name_time_idx
ON analytics_events (event_name, occurred_at);

CREATE INDEX analytics_events_business_time_idx
ON analytics_events (business_id, occurred_at);

CREATE INDEX analytics_events_user_time_idx
ON analytics_events (user_id, occurred_at);
```

Adapt foreign keys to the actual schema and migration order in `architecture/DATABASE.md`.

### Important implementation rules

- Apply RLS and appropriate server-side write permissions.
- Do not allow clients to submit trusted business outcomes directly.
- Validate event names and properties.
- Keep properties small and structured.
- Avoid storing sensitive information.
- Avoid duplicating authoritative scan and redemption records unnecessarily.

The analytics event table is not a replacement for operational tables such as `scan_events`, voucher claims, or redemption records.

Operational records remain the source of truth for rewards and business transactions.

## 11. Monitoring Critical Business Operations

Certain operations require stronger monitoring because failures can affect business trust.

### QR scans

Monitor:

- Total scan attempts.
- Validation success rate.
- Invalid or expired QR frequency.
- Duplicate scan frequency.
- Server errors during validation.

### Quest completion

Monitor:

- Quest starts.
- Step completion.
- Completion failures.
- Reward allocation failures.
- Duplicate reward attempts.

### Voucher redemption

Monitor:

- Successful redemptions.
- Failed redemptions.
- Duplicate redemption attempts.
- Database transaction conflicts.
- Redemption latency.

### Flash Drops

Monitor:

- Successful publication.
- Claim volume.
- Capacity utilization.
- Duplicate claim attempts.
- Claim transaction failures.
- Expiration processing.

These metrics should be filterable by environment and time period.

## 12. Alerts and Incident Response

Do not create alerts for every minor event.

Prioritize failures that affect users, business partners, or data integrity.

### Initial alert conditions

| Condition                                | Priority   | Response                                          |
| ---------------------------------------- | ---------- | ------------------------------------------------- |
| Production application unavailable       | Critical   | Investigate immediately                           |
| Database unavailable                     | Critical   | Investigate immediately                           |
| Unauthorized reward allocation suspected | Critical   | Disable affected reward operation and investigate |
| Voucher double-redemption detected       | Critical   | Investigate data integrity                        |
| Flash Drop exceeds configured capacity   | Critical   | Stop claims and investigate                       |
| QR validation failure spike              | High       | Investigate QR service                            |
| Authentication failures increase sharply | High       | Check service and abuse patterns                  |
| Elevated API error rate                  | High       | Review logs and recent deployments                |
| Slow dashboard queries                   | Medium     | Review query performance                          |
| Failed media upload                      | Low/Medium | Review storage configuration                      |

Alert thresholds should be based on actual usage and baseline behavior rather than arbitrary fixed numbers.

### Incident response process

1. Detect and classify the issue.
2. Identify affected users and businesses.
3. Stop additional damage if necessary.
4. Preserve relevant logs.
5. Investigate the root cause.
6. Restore service or correct the data.
7. Test the fix in staging.
8. Deploy the fix.
9. Document the incident and prevention steps.

For suspected reward integrity issues, temporarily disable the affected operation rather than continuing to issue uncertain rewards.

## 13. Privacy and Data Protection

Analytics must respect user privacy.

### Data minimization

Do not collect information simply because it might be useful later.

Avoid collecting:

- Passwords.
- Authentication tokens.
- Full QR payloads.
- Precise location history without a clear product requirement.
- Personal information unrelated to the event.
- Sensitive demographic information without a justified purpose and appropriate consent.

### Access control

- Consumers must not access private internal analytics.
- Partners must only see authorized business data.
- Staff must not access platform-wide analytics.
- Administrators should have appropriately controlled access.
- Analytics exports must follow the same privacy restrictions.

### Location data

If location eligibility is required:

- Collect only what the operation needs.
- Avoid retaining unnecessary location history.
- Store eligibility results where possible instead of repeated precise coordinates.
- Clearly communicate location use.
- Apply an appropriate retention policy.

### Retention

Define retention periods for:

- Application logs.
- Security events.
- Product analytics.
- Operational scan records.
- Voucher redemption records.

Retention must reflect operational, legal, and business requirements. Do not retain personal data indefinitely by default.

## 14. Dashboard Requirements

### Developer operations dashboard

The developer should be able to monitor:

- Application availability.
- API error rates.
- Database health.
- Recent deployment status.
- Authentication failures.
- Critical QR and voucher errors.
- Background task failures, if applicable.

### Partner analytics dashboard

Partners should see only information relevant to their business:

- Scan activity.
- Verified eligibility events.
- Quest engagement.
- Voucher claims and redemptions.
- Flash Drop performance.
- Trends over selected periods.

### Platform analytics dashboard

Platform administrators should be able to monitor:

- Total active users.
- New registrations.
- Business participation.
- Quest engagement.
- Voucher activity.
- Flash Drop performance.
- Community event engagement.

Avoid exposing individual user activity when aggregated metrics are sufficient.

## 15. Implementation Roadmap

### Phase 1 — MVP foundations

- [ ] Establish structured logging.
- [ ] Track application errors.
- [ ] Monitor Vercel deployments.
- [ ] Monitor Supabase database health.
- [ ] Create analytics event schema.
- [ ] Track registrations and onboarding.
- [ ] Track validated QR scans.
- [ ] Track quest completions.
- [ ] Track voucher claims and redemptions.
- [ ] Track Flash Drop claims.

### Phase 2 — Partner visibility

- [ ] Build partner analytics queries.
- [ ] Display scan and redemption metrics.
- [ ] Add Flash Drop performance metrics.
- [ ] Add date filters.
- [ ] Restrict analytics by business ownership.
- [ ] Validate metrics against operational records.

### Phase 3 — Optimization

- [ ] Add alerting for critical failures.
- [ ] Improve error grouping.
- [ ] Add performance monitoring.
- [ ] Track activation and retention.
- [ ] Improve partner ROI reporting.
- [ ] Review data retention and analytics quality.

## 16. Definition of Done

Observability is considered implemented when:

1. Production errors can be identified and investigated.
2. Logs use a consistent structure.
3. Critical business events are recorded server-side.
4. QR, quest, voucher, and Flash Drop operations are measurable.
5. Operational records remain authoritative.
6. Partner analytics are restricted to authorized businesses.
7. Critical system failures can be detected.
8. Sensitive information is excluded from logs and analytics.
9. Retention policies are documented.
10. The developer can investigate a failed operation using its request or event identifier.

**Final principle:** Nomads Pipa should be able to measure what matters, detect what breaks, and prove what happened without compromising user privacy or business trust.
