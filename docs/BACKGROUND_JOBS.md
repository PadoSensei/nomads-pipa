# Nomads Pipa — Background Jobs & Scheduled Tasks

**Document:** `docs/BACKGROUND_JOBS.md`
**Status:** Technical specification  
**Stack:** Next.js, TypeScript, Supabase, PostgreSQL  
**Timezone:** `America/Fortaleza` for Pipa-local scheduling; timestamps stored in UTC.

---

## 1. Purpose

This document defines background jobs and scheduled processes required by Nomads Pipa.

Background jobs handle work that should happen automatically or outside a user's immediate request, including:

- Expiring vouchers and offers.
- Activating and ending Flash Drops.
- Processing quest-related events.
- Sending notifications.
- Maintaining analytics aggregates.
- Cleaning up temporary records.
- Detecting inconsistent or failed operations.

The system should favor simple, reliable implementations suitable for a solo developer.

## 2. Architecture

### 2.1 Recommended Components

| Component               | Responsibility                                               |
| ----------------------- | ------------------------------------------------------------ |
| Supabase PostgreSQL     | Persistent data and transactional business rules             |
| Supabase Cron / pg_cron | Scheduling database-oriented jobs                            |
| Supabase Edge Functions | Scheduled or event-driven server-side tasks when appropriate |
| Next.js server routes   | Authenticated application workflows                          |
| PostgreSQL functions    | Atomic updates and critical business rules                   |
| Supabase logs           | Execution diagnostics                                        |

Do not introduce a separate queue service in the MVP unless job volume or reliability requirements justify it.

### 2.2 Design Principles

1. Critical business rules must be enforced by PostgreSQL or trusted server-side code.
2. Jobs must be safe to retry.
3. Every job should have observable execution status.
4. Jobs must not rely on browser execution.
5. Scheduling should use UTC internally.
6. Local business hours and offer windows should use `America/Fortaleza`.
7. Long-running work should be divided into manageable batches.
8. Failures should be logged without exposing secrets or unnecessary personal data.

## 3. Job Registry

Maintain a central list of scheduled jobs and their configuration.

Recommended metadata:

- Job name
- Description
- Schedule
- Enabled status
- Last started time
- Last completed time
- Last execution status
- Error summary
- Execution duration

A simple `job_runs` table can store execution history.

### Suggested schema

```sql
create table if not exists public.job_runs (
  id uuid primary key default gen_random_uuid(),
  job_name text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running'
    check (status in ('running', 'success', 'failed')),
  processed_count integer not null default 0,
  error_message text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_job_runs_name_started
on public.job_runs (job_name, started_at desc);
```

Restrict access to this table to trusted backend roles.

## 4. Core Jobs

### 4.1 Expire Vouchers

**Purpose:** Ensure expired vouchers cannot be redeemed.

**Suggested frequency:** Every 5 minutes.

**Logic:**

1. Find active vouchers whose expiration time has passed.
2. Update their status to expired.
3. Record the transition where required.
4. Log the number of affected records.

Important: redemption validation must check expiration directly. The scheduled job is for status maintenance and user-interface consistency, not the primary security control.

**Priority:** P0

### 4.2 Expire Standard Offers

**Purpose:** Keep expired partner offers from appearing as available.

**Suggested frequency:** Every 5 minutes.

**Logic:**

1. Find active offers past their end time.
2. Mark them expired or inactive.
3. Preserve historical offer data.
4. Update relevant cached or aggregated views if used.

**Priority:** P0

### 4.3 Flash Drop Lifecycle

**Purpose:** Manage time-limited promotions.

**Suggested frequency:** Every minute.

**Lifecycle:**

- Scheduled
- Active
- Expired
- Exhausted
- Cancelled

**Logic:**

1. Activate scheduled Flash Drops when their start time arrives.
2. Expire active Flash Drops after their end time.
3. Mark offers exhausted when their claim limit is reached.
4. Preserve claim and redemption history.
5. Notify relevant users when supported.

The claim operation itself must enforce both expiration and claim limits transactionally. Do not rely on the scheduled job to prevent excess claims.

For the default MVP configuration, a Flash Drop may run for 90 minutes, target eligible users within 2 km, and accept claims from the first 10 eligible users.

**Priority:** P0

### 4.4 Quest Expiration

**Purpose:** Close quests that are no longer available.

**Suggested frequency:** Every 5 minutes.

**Logic:**

1. Find active quests past their end time.
2. Mark them expired.
3. Prevent new progress from being accepted.
4. Preserve completed quest records and reward history.
5. Update user-facing quest status.

Quest validation must independently check whether the quest is active at the time of the attempted action.

**Priority:** P0

### 4.5 Notification Dispatch

**Purpose:** Deliver relevant platform notifications.

**Suggested frequency:** Every minute, or through event-driven processing.

Potential notifications:

- Flash Drop available.
- Flash Drop about to expire.
- Quest completed.
- Reward unlocked.
- Voucher approaching expiration.
- Event reminder.
- Partner application status changed.

Notifications should be preference-aware and avoid excessive messaging.

A notification should have a unique event or idempotency key to prevent duplicate delivery when a job retries.

**Priority:** P1

### 4.6 Analytics Aggregation

**Purpose:** Generate reporting data without repeatedly scanning large operational tables.

**Suggested frequency:** Hourly or daily, depending on metric.

Potential aggregates:

- QR scans by business and date.
- Voucher claims and redemptions.
- Quest completions.
- Flash Drop performance.
- Active users.
- Event engagement.

Operational tables remain the source of truth. Aggregated analytics are derived reporting data.

**Priority:** P1

### 4.7 Temporary Data Cleanup

**Purpose:** Remove expired temporary records where retention rules permit.

**Suggested frequency:** Daily.

Potential candidates:

- Expired temporary QR tokens.
- Old abandoned temporary sessions.
- Expired one-time verification records.
- Old transient job artifacts.

Do not automatically delete financial, redemption, audit, or security records simply because they are old. Apply the platform's retention policy and legal requirements.

**Priority:** P2

## 5. Job Schedule

Suggested initial schedule:

| Job                       |       Frequency | Priority |
| ------------------------- | --------------: | -------- |
| Voucher expiration        | Every 5 minutes | P0       |
| Standard offer expiration | Every 5 minutes | P0       |
| Flash Drop lifecycle      |    Every minute | P0       |
| Quest expiration          | Every 5 minutes | P0       |
| Notification dispatch     |    Every minute | P1       |
| Analytics aggregation     |  Hourly / daily | P1       |
| Temporary data cleanup    |           Daily | P2       |

Schedules should be configurable rather than hard-coded throughout the application.

## 6. Idempotency and Concurrency

A job is idempotent when running it more than once produces the same final state as running it once.

All background jobs should be designed with retry safety in mind.

### Required protections

- Use conditional updates.
- Use unique constraints where appropriate.
- Use transactions for related database changes.
- Use stable event identifiers.
- Avoid assuming a job executes only once.
- Prevent overlapping executions where necessary.

### Example: Safe expiration update

```sql
update public.vouchers
set status = 'expired'
where status = 'active'
  and expires_at <= now();
```

Repeated execution does not repeatedly change already expired records.

### Example: Flash Drop claim limit

The claim operation must use a database transaction or a database function that locks and validates the relevant Flash Drop before inserting a claim.

The following conditions must be checked together:

- Flash Drop is active.
- Current time is within its validity period.
- The user is eligible.
- The user has not already claimed it, if duplicate claims are prohibited.
- The maximum claim count has not been reached.

The claim count update and claim insertion must succeed or fail together.

## 7. Job Execution Logging

Each execution should create a `job_runs` record.

Recommended lifecycle:

1. Insert a record with status `running`.
2. Execute the job.
3. Record processed count.
4. Set status to `success`.
5. If execution fails, record `failed` and a safe error summary.

Never log access tokens, passwords, service-role keys, or sensitive personal information.

## 8. Failure Handling

### Retry Strategy

For transient failures:

- Retry with a limited number of attempts.
- Use increasing delays between retries.
- Avoid immediate infinite retry loops.
- Record every failed attempt.

For permanent failures:

- Stop retrying automatically.
- Log the error.
- Alert an administrator when appropriate.
- Provide a safe manual recovery path.

### Partial Failure

Jobs processing many records should use batches.

If a batch fails, already completed records should remain consistent, and the next execution should safely resume from the remaining work.

## 9. Security

- Run privileged jobs using trusted server-side credentials.
- Never expose the Supabase service-role key to the browser.
- Restrict job execution permissions.
- Validate all input parameters.
- Use least-privilege database roles.
- Keep audit records for important administrative changes.
- Prevent users and partners from invoking privileged maintenance operations.

A public API route must never become an unrestricted trigger for administrative jobs.

## 10. Notifications and Delivery Tracking

If notifications are queued, use a dedicated table.

Suggested schema:

```sql
create table if not exists public.notification_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  notification_type text not null,
  payload jsonb not null default '{}'::jsonb,
  idempotency_key text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'sent', 'failed')),
  attempts integer not null default 0,
  scheduled_at timestamptz not null default now(),
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

create index if not exists idx_notification_queue_pending
on public.notification_queue (scheduled_at)
where status = 'pending';
```

The delivery worker should:

1. Select eligible pending notifications.
2. Claim records safely to avoid concurrent processing.
3. Send through the configured delivery channel.
4. Mark successful delivery.
5. Record failures and retry when appropriate.

The actual delivery channel may vary. Browser push, email, or another provider should be implemented behind a delivery adapter.

## 11. Timezone Handling

Store all timestamps as `timestamptz` in PostgreSQL.

Use UTC for:

- Database storage
- API timestamps
- Job execution records
- Event ordering

Use `America/Fortaleza` when interpreting Pipa-local schedules and displaying local times.

Avoid manually adding or subtracting fixed UTC offsets in application logic.

## 12. Monitoring

Monitor:

- Job success and failure counts.
- Last successful execution.
- Execution duration.
- Number of processed records.
- Queue backlog.
- Oldest pending notification.
- Repeated failures.
- Unexpected job overlap.

Alert when:

- A P0 job repeatedly fails.
- A scheduled job has not run within its expected interval.
- The notification queue grows unexpectedly.
- Database errors prevent critical lifecycle updates.

Use the observability strategy in `architecture/OBSERVABILITY.md` for centralized logging and alerts.

## 13. Testing Requirements

Test each job for:

- Normal successful execution.
- Empty result sets.
- Repeated execution.
- Expired and boundary-time records.
- Concurrent execution.
- Partial failure.
- Invalid or missing data.
- Permission restrictions.

Critical business-rule tests must also cover the underlying database functions and transactions.

### P0 Test Scenarios

- Expired vouchers cannot be redeemed even before the expiration job runs.
- Flash Drop claims cannot exceed the configured limit under concurrency.
- Expired quests reject new progress.
- Duplicate notification events do not produce duplicate queue records.
- A failed job can safely retry.
- Unauthorized users cannot execute privileged jobs.

## 14. MVP Implementation Plan

### Phase 1 — Critical Lifecycle Jobs

Implement:

1. Voucher expiration.
2. Standard offer expiration.
3. Flash Drop expiration and exhaustion.
4. Quest expiration.
5. Job execution logging.

### Phase 2 — Notifications and Reporting

Implement:

1. Notification queue.
2. Notification dispatch.
3. Hourly analytics aggregation.
4. Failure monitoring.

### Phase 3 — Optimization

Consider:

- More sophisticated queue processing.
- Batch tuning.
- Dead-letter handling.
- Advanced scheduling.
- Automated recovery workflows.

Do not add unnecessary infrastructure before real usage justifies it.

## 15. Definition of Done

Background job infrastructure is ready for MVP when:

- Critical lifecycle jobs run on schedule.
- Job execution is recorded.
- Jobs are safe to retry.
- Flash Drop limits remain correct under concurrent claims.
- Voucher and quest validity is enforced independently of scheduled jobs.
- Failed jobs can be identified.
- Privileged execution is protected.
- UTC storage and local scheduling are consistent.
- Critical jobs have automated tests.

---

**Architecture principle:** Background jobs maintain platform state and automate routine operations. They must never replace transactional validation of critical user actions such as claiming limited offers or redeeming vouchers.
