# Nomads Pipa — Analytics Architecture

**Document:** `docs/ANALYTICS.md`
**Status:** Technical specification  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, PostgreSQL

---

## 1. Purpose

The analytics system measures how users discover and interact with Nomads Pipa, how partners benefit from participation, and how effectively the platform connects visitors with local businesses.

Analytics should answer five questions:

1. Are users discovering useful local places and services?
2. Are users participating in quests and community activities?
3. Are partner offers generating meaningful engagement?
4. Are scans, voucher claims, and redemptions converting into measurable outcomes?
5. Is the platform growing sustainably?

The system must distinguish verified operational events from estimates and general engagement signals.

## 2. Architecture Principles

- PostgreSQL operational records are the source of truth.
- Analytics events provide additional behavioral context.
- Aggregated reporting tables improve dashboard performance.
- Partner analytics must be isolated by business.
- User privacy must be respected.
- Metrics must have documented definitions.
- Duplicate events must not inflate reporting.
- Analytics collection should not block critical user actions.
- Personal information should not be included unnecessarily.

## 3. Analytics Data Sources

Analytics should use two categories of data.

### 3.1 Operational Data

These records represent actual platform transactions and state changes.

Examples:

- `scan_events`
- Voucher claims
- Voucher redemptions
- Flash Drop claims
- Quest progress and completions
- Partner records
- Event participation records, where supported

Operational records are authoritative for metrics such as successful redemptions and validated quest completions.

### 3.2 Behavioral Analytics Events

These events describe activity within the application.

Examples:

- Page viewed
- Category opened
- Business listing viewed
- Search performed
- Offer viewed
- Quest opened
- Registration completed
- CTA clicked

Behavioral events help explain user journeys but do not prove offline visits, purchases, or other real-world outcomes.

## 4. Event Taxonomy

Use consistent event names in `snake_case`.

### 4.1 Core Event Names

| Event                  | Meaning                                |
| ---------------------- | -------------------------------------- |
| `page_viewed`          | User opened a page                     |
| `category_viewed`      | User opened a discovery category       |
| `business_viewed`      | User viewed a business listing         |
| `search_performed`     | User performed a search                |
| `cta_clicked`          | User selected a tracked call to action |
| `signup_completed`     | User completed registration            |
| `quest_started`        | User started a quest                   |
| `quest_step_completed` | A quest step was validated             |
| `quest_completed`      | A quest was completed                  |
| `qr_scan_succeeded`    | A QR interaction was validated         |
| `voucher_claimed`      | A voucher claim succeeded              |
| `voucher_redeemed`     | A voucher redemption succeeded         |
| `flash_drop_claimed`   | A Flash Drop claim succeeded           |
| `event_viewed`         | User opened an event                   |
| `event_cta_clicked`    | User selected an event action          |

Use operational records for events that represent completed transactions. Do not create a second independent source of truth for the same transaction.

### 4.2 Event Properties

Common properties may include:

- `event_name`
- `event_id`
- `user_id`, when authenticated and appropriate
- `session_id`
- `occurred_at`
- `page_path`
- `business_id`, when relevant
- `quest_id`, when relevant
- `voucher_id`, when relevant
- `source`
- `device_category`
- `app_version`

Avoid collecting precise location, sensitive personal information, or unnecessary device identifiers.

## 5. Suggested Database Schema

### 5.1 Analytics Events

```sql
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  user_id uuid references auth.users(id) on delete set null,
  session_id text,
  business_id uuid references public.businesses(id) on delete set null,
  occurred_at timestamptz not null default now(),
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_name_time
on public.analytics_events (event_name, occurred_at desc);

create index if not exists idx_analytics_events_business_time
on public.analytics_events (business_id, occurred_at desc);

create index if not exists idx_analytics_events_user_time
on public.analytics_events (user_id, occurred_at desc);
```

The schema assumes the `businesses` table already exists.

### 5.2 Daily Platform Metrics

```sql
create table if not exists public.analytics_daily_platform (
  date date primary key,
  active_users integer not null default 0,
  new_users integer not null default 0,
  business_views integer not null default 0,
  quest_completions integer not null default 0,
  voucher_claims integer not null default 0,
  voucher_redemptions integer not null default 0,
  qr_scans integer not null default 0,
  updated_at timestamptz not null default now()
);
```

### 5.3 Daily Partner Metrics

```sql
create table if not exists public.analytics_daily_business (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id),
  date date not null,
  listing_views integer not null default 0,
  qr_scans integer not null default 0,
  quest_completions integer not null default 0,
  voucher_claims integer not null default 0,
  voucher_redemptions integer not null default 0,
  flash_drop_claims integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (business_id, date)
);
```

These tables contain derived metrics, not transactional records.

## 6. Metric Definitions

Every dashboard metric must use a documented definition.

### 6.1 User Metrics

**New Users**

Count of accounts created during the reporting period.

**Active Users**

Count of distinct users who performed at least one qualifying activity during the period.

Qualifying activities should be defined consistently. A page view alone may be insufficient for meaningful active-user reporting.

**Returning Users**

Users who were active during the reporting period and had at least one qualifying activity before that period.

**Quest Participation Rate**

`Users who started at least one quest / Active users × 100`

### 6.2 Discovery Metrics

**Business Listing Views**

Number of recorded views of business listings.

**Category Engagement**

Number of recorded category views.

**Search Activity**

Number of searches performed.

**CTA Engagement Rate**

`Unique users who clicked a tracked CTA / Unique users who viewed the relevant page × 100`

Use unique users for user-level conversion metrics and event counts for interaction-volume metrics. Label the denominator clearly.

### 6.3 Quest Metrics

**Quest Starts**

Number of valid quest starts.

**Quest Completions**

Number of successfully validated quest completions.

**Quest Completion Rate**

`Completed quests / Started quests × 100`

Report the measurement period and cohort definition. For a more accurate conversion measure, follow users who started quests and measure whether they completed them within a defined observation window.

### 6.4 QR Metrics

**QR Scan Attempts**

Number of submitted scan attempts, if attempts are recorded.

**Successful QR Scans**

Number of scans validated by the server.

**Rejected QR Scans**

Number of scans rejected by validation.

A successful scan does not necessarily mean a voucher was redeemed or a purchase occurred.

### 6.5 Voucher Metrics

**Voucher Claims**

Number of successful voucher claims.

**Voucher Redemptions**

Number of successful, recorded redemptions.

**Voucher Redemption Rate**

`Successful redemptions / Eligible claims × 100`

Define how expired, cancelled, and still-active claims are treated before comparing reporting periods.

### 6.6 Flash Drop Metrics

**Flash Drop Claims**

Number of successful claims.

**Flash Drop Redemptions**

Number of successful redemptions.

**Flash Drop Conversion Rate**

`Successful redemptions / Eligible claims × 100`

Also report remaining claim capacity and campaign expiration where appropriate.

### 6.7 Partner Metrics

Partners should be able to see:

- Listing views
- QR scans
- Quest completions involving their business
- Voucher claims
- Voucher redemptions
- Flash Drop claims
- Offer performance over time

These are engagement indicators. They should not be described as guaranteed revenue or verified sales.

## 7. Partner ROI Reporting

Nomads Pipa should avoid claiming a financial return unless actual revenue or transaction data is available.

For the MVP, show measurable engagement:

- Number of users interacting with the listing.
- Number of successful QR scans.
- Number of voucher claims.
- Number of voucher redemptions.
- Number of quest completions.
- Performance of Flash Drops.

If partners later provide verified transaction values, a separate ROI model can be introduced.

Potential formula:

`Attributed revenue - Campaign cost = Estimated campaign return`

Only use this formula when the attribution method and revenue inputs are reliable and clearly disclosed.

## 8. Dashboard Design

### 8.1 Platform Admin Dashboard

Recommended overview:

- Total registered users
- New users
- Active users
- Approved partners
- Business listing views
- Quest starts and completions
- QR scans
- Voucher claims and redemptions
- Flash Drop performance
- Event engagement

Filters:

- Date range
- Business category
- Quest
- Campaign
- Event
- Acquisition source, where available

### 8.2 Partner Dashboard

Recommended overview:

- Listing views
- QR scans
- Voucher claims
- Voucher redemptions
- Quest completions
- Flash Drop claims
- Offer performance

Partners must only see metrics belonging to their own business or businesses they are explicitly authorized to manage.

### 8.3 User-Facing Progress

Users should see personal progress rather than internal analytics terminology.

Examples:

- Quests completed
- Rewards unlocked
- Vouchers available
- Vouchers redeemed
- Digital items collected

Do not expose other users' private activity.

## 9. Data Collection Strategy

### 9.1 Client-Side Events

Client-side tracking is suitable for behavioral events such as:

- Page views
- Category views
- Listing views
- CTA clicks
- Search interactions

The client should send only permitted event names and validated properties.

Do not trust client-submitted events for reward issuance, voucher redemption, or partner billing.

### 9.2 Server-Side Events

Server-side records should be used for:

- Successful QR validation
- Voucher claims
- Voucher redemptions
- Quest completions
- Flash Drop claims
- Partner account changes

These events should be written as part of the relevant trusted transaction or derived from its authoritative record.

## 10. Data Quality and Duplicate Prevention

Analytics must avoid double counting.

Recommended protections:

- Generate stable event IDs where practical.
- Use unique transaction identifiers.
- Enforce uniqueness on operational actions where needed.
- Deduplicate retried client events.
- Validate event names and property schemas.
- Use server timestamps for critical transactions.
- Reconcile aggregates against operational tables.

If an event is missing, do not invent a replacement record that implies a verified action occurred.

## 11. Privacy and Access Control

Analytics data can reveal user behavior and must be protected.

Requirements:

- Collect only necessary information.
- Avoid sensitive personal data in event properties.
- Do not expose raw user-level analytics to partners.
- Apply Supabase Row Level Security.
- Restrict analytics table writes to trusted pathways.
- Restrict aggregate access to authorized roles.
- Define data retention periods.
- Respect applicable privacy requirements, including Brazil's LGPD.

Where possible, use aggregated or anonymized reporting.

Precise location should not be collected for general analytics. If a feature needs location verification, handle that separately with clear purpose and permission controls.

## 12. Retention and Aggregation

Suggested starting policy, subject to legal review and operational needs:

| Data                  | Suggested treatment                                    |
| --------------------- | ------------------------------------------------------ |
| Raw behavioral events | Retain for a limited period                            |
| Daily aggregates      | Retain for long-term reporting                         |
| Voucher records       | Follow transaction and legal retention requirements    |
| Scan records          | Follow security and operational retention requirements |
| Audit logs            | Retain according to security policy                    |

Do not delete authoritative operational records simply to reduce analytics storage.

For larger datasets:

- Aggregate events daily.
- Partition large event tables by time when justified.
- Index common reporting dimensions.
- Archive or remove raw behavioral events according to policy.

## 13. Analytics Jobs

Use scheduled jobs described in `architecture/BACKGROUND_JOBS.md`.

Recommended jobs:

1. Aggregate platform metrics daily.
2. Aggregate partner metrics daily.
3. Reconcile voucher claims and redemptions.
4. Reconcile quest completion totals.
5. Detect unusual duplicate or invalid event patterns.

Aggregation jobs must be idempotent. Re-running a reporting job should not inflate counts.

## 14. Performance

For the MVP:

- Use indexed PostgreSQL queries.
- Keep dashboard date ranges bounded.
- Use daily aggregates for common charts.
- Avoid expensive queries on every dashboard render.
- Paginate detailed event lists.
- Cache non-sensitive aggregate responses where appropriate.

Do not introduce a separate analytics warehouse until query volume or reporting complexity justifies it.

## 15. Testing Requirements

Test:

- Event schema validation.
- Duplicate event handling.
- Correct metric calculations.
- Date range boundaries.
- Timezone conversion.
- Partner data isolation.
- RLS restrictions.
- Aggregation retry behavior.
- Reconciliation against operational records.
- Empty and incomplete reporting periods.

Critical transaction metrics must be tested against the authoritative database records.

## 16. MVP Priorities

### Must Have

- Defined event taxonomy.
- Operational metrics for scans, claims, and redemptions.
- Basic platform dashboard.
- Basic partner dashboard.
- Date-range filtering.
- Partner data isolation.
- Core metric definitions.

### Should Have

- Daily aggregate tables.
- Quest funnel reporting.
- Flash Drop conversion reporting.
- Event engagement reporting.
- CSV export.

### Could Have

- Cohort analysis.
- Campaign attribution.
- Advanced user retention reporting.
- Revenue attribution with verified partner data.
- External analytics integrations.

### Won't Have in Initial MVP

- Individual user tracking for advertising purposes.
- Guaranteed offline sales attribution.
- Complex predictive analytics.
- A dedicated data warehouse.
- Unrestricted partner access to raw user activity.

## 17. Definition of Done

Analytics is ready for MVP when:

- Core events follow a documented naming convention.
- Operational transactions remain the source of truth.
- Platform metrics are available.
- Partners see only their own authorized metrics.
- Scans, claims, and redemptions are clearly distinguished.
- Aggregate jobs can safely retry.
- Privacy and access controls are enforced.
- Dashboard calculations are tested and documented.

---

**Analytics principle:** Measure what the platform can actually verify. Keep engagement, claims, redemptions, visits, and revenue distinct so that users, partners, and administrators can trust the numbers.
