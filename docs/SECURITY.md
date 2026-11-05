# Security Architecture

**Project:** Nomads Pipa  
**Document:** `docs/SECURITY.md`
**Status:** Draft  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

This document defines how Nomads Pipa protects:

- User accounts and personal information.
- Business accounts and partner data.
- QR codes and scan events.
- Quest progress and loyalty points.
- Vouchers and redemptions.
- Flash Drop campaigns.
- Staff scanner access.
- Platform administration.

Security must be built into the database and server architecture, not added only through frontend checks.

The goal is to create a secure MVP without introducing unnecessary infrastructure or complexity for a solo developer.

## 2. Security Principles

1. **Least privilege:** Every user receives only the permissions needed for their role.
2. **Server-side validation:** Never trust values submitted by the browser.
3. **Database enforcement:** Use PostgreSQL constraints, transactions, and RLS.
4. **Private by default:** User-specific and business-specific records are not publicly accessible.
5. **No client secrets:** Never expose service-role credentials or private signing keys.
6. **Auditability:** Important business and reward operations must be traceable.
7. **Idempotency:** Repeated requests must not create duplicate rewards or redemptions.
8. **Data minimisation:** Collect only the information required for the product.

## 3. Authentication

Use Supabase Auth.

### Authentication requirements

- Email and password authentication.
- Email verification.
- Password reset.
- Secure session handling.
- Session expiry and refresh.
- Logout.
- Optional OAuth providers in a later phase.

### User identity

The authenticated Supabase user ID is the source of truth for ownership.

Never accept a `user_id` from the frontend as proof that a user owns a record.

For example, a user viewing their voucher wallet should query records belonging to the authenticated user, not pass an arbitrary user ID.

### Server-side authentication

Every protected Next.js Route Handler must validate the current session.

Example:

```typescript
const {
  data: { user },
  error,
} = await supabase.auth.getUser();

if (error || !user) {
  return Response.json(
    {
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required.",
      },
    },
    { status: 401 }
  );
}
```

Use the authenticated user ID in subsequent database operations.

## 4. Role-Based Access Control

Nomads Pipa uses two distinct permission systems.

### Platform roles

Stored in `profiles.platform_role`.

| Role  | Access                          |
| ----- | ------------------------------- |
| user  | Standard consumer functionality |
| admin | Platform administration         |

Do not create a global `business_owner` role. A user may own one business and be staff at another.

### Business membership roles

Stored in `business_members.role`.

| Role    | Permissions                                     |
| ------- | ----------------------------------------------- |
| owner   | Full control of their business                  |
| manager | Manage listings, offers, and staff permissions  |
| staff   | Use the scanner and permitted operational tools |

### Permission matrix

| Action                  | User | Staff | Manager | Owner |              Admin |
| ----------------------- | ---: | ----: | ------: | ----: | -----------------: |
| View public listings    |  Yes |   Yes |     Yes |   Yes |                Yes |
| Update own profile      |  Yes |   Yes |     Yes |   Yes |                Yes |
| Use business scanner    |   No |   Yes |     Yes |   Yes | Yes, if authorised |
| View business analytics |   No |    No |     Yes |   Yes |                Yes |
| Edit business listing   |   No |    No |     Yes |   Yes |                Yes |
| Create Flash Drop       |   No |    No |     Yes |   Yes |                Yes |
| Manage business staff   |   No |    No | Limited |   Yes |                Yes |
| Manage platform content |   No |    No |      No |    No |                Yes |

The admin role should be used only for platform administration. Business permissions must still be checked independently.

## 5. Supabase Row Level Security

RLS must be enabled on every table containing private or business-specific information.

### Public-readable tables

Examples:

- Published businesses.
- Published events.
- Public categories.
- Public business tags.
- Published quests.

Anonymous users should only see published records and fields intended for public display.

### User-owned tables

Examples:

- Profiles.
- Quest progress.
- Gamification state.
- User achievements.
- Vouchers.
- Scan history.
- Accommodation enquiries.
- Concierge enquiries.

A user may access only their own records unless a specific, authorised business workflow grants limited access.

### Business-owned tables

Examples:

- Business settings.
- Business memberships.
- Business offers.
- QR codes.
- Flash Drops.
- Business analytics data.

Access must be limited to members of the relevant business with the required role.

### Example RLS policies

Enable RLS:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_members ENABLE ROW LEVEL SECURITY;
```

Users can read their own profile:

```sql
CREATE POLICY "Users read own profile"
ON profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());
```

Users can update their own profile:

```sql
CREATE POLICY "Users update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());
```

Users can read their own vouchers:

```sql
CREATE POLICY "Users read own vouchers"
ON vouchers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());
```

Users can read their own scan history:

```sql
CREATE POLICY "Users read own scans"
ON scan_events
FOR SELECT
TO authenticated
USING (user_id = auth.uid());
```

These are starting examples, not a complete policy set. Each table needs policies for every required operation, and sensitive writes should normally go through validated server endpoints or database functions.

## 6. Business Membership Security

Business membership is the foundation of partner access.

A user must have an active membership before accessing a business dashboard or scanner.

### Membership rules

- Owners can manage their business.
- Managers can perform approved operational tasks.
- Staff can use the scanner.
- Staff cannot change business ownership.
- Staff cannot manage other staff members unless explicitly authorised.
- Users cannot assign themselves a business role.
- Membership changes must be logged.

### Security checks

Every business endpoint should verify:

1. The user is authenticated.
2. The requested business exists.
3. The user has an active membership.
4. Their membership role allows the requested action.

Do not rely on a business ID stored in frontend state as proof of authorisation.

## 7. QR Code Security

QR codes are central to the Traffic Router system.

The design must prevent users from simply changing a QR payload to generate rewards or access another business's vouchers.

### QR token rules

- Use opaque, unpredictable tokens or signed tokens.
- Never put personal user information in QR codes.
- Never trust business IDs submitted independently of the validated token.
- Support expiry and revocation.
- Store only a token hash when practical.
- Validate token status server-side.
- Rate-limit scan attempts.
- Record accepted and rejected attempts where appropriate.

### Physical QR codes

A physical business QR code identifies a business, quest step, or campaign.

The authenticated user is identified through their Supabase session.

A physical QR code should not directly award points simply because it was scanned.

### Important limitation

A static QR code can be photographed or shared.

GPS proximity, scan limits, and staff verification can reduce abuse but cannot prove physical presence with certainty.

For higher-value rewards, use a staff-confirmed redemption or another stronger verification step.

## 8. Scan Event and Reward Security

A scan event and a reward are separate operations.

Recommended flow:

1. User scans a QR code.
2. Server validates the token.
3. Server checks scan eligibility.
4. Server records the scan event.
5. Quest engine evaluates whether the scan satisfies a quest step.
6. Reward engine checks eligibility.
7. Any points or vouchers are issued through an atomic transaction.

### Rules

- Never allow the browser to submit an arbitrary points amount.
- Never allow the browser to mark a quest as complete.
- Never allow a user to assign themselves a voucher.
- Never issue duplicate rewards for the same qualifying event.
- Record the reason when a scan or reward is rejected.

Use database constraints and transaction logic to enforce these rules.

## 9. Voucher Security

Vouchers represent a real commercial benefit and require strict controls.

### Voucher requirements

Each voucher should have:

- A unique identifier.
- An unpredictable redemption token.
- An owner.
- A linked business.
- An expiry date.
- A status.
- A redemption record when used.

### Valid statuses

- `active`
- `redeemed`
- `expired`
- `revoked`

### Redemption rules

A voucher may be redeemed only when:

- It belongs to the correct user.
- It is active.
- It has not expired.
- It has not already been redeemed.
- The staff member belongs to the relevant business.
- The voucher is valid for that business.

### Atomic redemption

Voucher redemption must be implemented using a database transaction or PostgreSQL function.

The operation should lock or conditionally update the voucher so two simultaneous requests cannot redeem it twice.

Use a unique constraint on the redemption record to provide an additional safeguard.

Example:

```sql
CREATE UNIQUE INDEX voucher_redemptions_one_per_voucher
ON voucher_redemptions (voucher_id);
```

The server should return a clear result for invalid, expired, revoked, and already-redeemed vouchers.

## 10. Staff Scanner Security

The scanner is a simplified interface, not a security exception.

Recommended route:

`/staff/scanner`

### Staff authentication

Staff must sign in with an individual account.

Do not use one shared password for an entire business.

For the MVP, staff can use normal Supabase Auth accounts with an assigned `business_members` record.

### Scanner permissions

Staff may:

- Scan an eligible voucher.
- See whether it is valid.
- See the minimum information needed to verify the offer.
- Confirm redemption.
- See the redemption result.

Staff may not automatically:

- Browse all customer profiles.
- View customer contact details.
- Edit voucher value.
- Issue arbitrary rewards.
- Access another business's scanner.
- View business financial or analytics data unless separately authorised.

### Staff account removal

When a staff member leaves:

1. A business owner or authorised manager removes their membership.
2. Future scanner requests fail authorisation.
3. Existing audit records remain available.
4. The user's personal account is not automatically deleted.

## 11. Flash Drop Security

Flash Drops use limited claims and potentially geographic targeting.

### Required controls

- Only business managers and owners can create campaigns.
- The business must be active.
- Start and expiry times must be validated.
- Claim limits must be enforced in PostgreSQL.
- Each user may claim only once unless the campaign explicitly allows otherwise.
- A user cannot change the campaign's claim limit.
- A user cannot claim an inactive or expired campaign.

### First-10-users rule

The first 10 valid claims must be determined by the database transaction.

Do not implement the limit using frontend counters or a simple read-then-insert sequence.

The transaction should:

1. Lock or safely update the campaign record.
2. Check the active period.
3. Check the claim count.
4. Check user eligibility.
5. Insert the claim.
6. Increment the claim count.
7. Commit.

If any check fails, no claim should be created.

### Geographic targeting

A 2km targeting radius can be used as an eligibility signal.

However:

- Browser GPS can be inaccurate.
- Users can deny location permission.
- Coordinates can be manipulated.
- Location data is sensitive.

Make location collection optional where possible and explain why it is requested.

Do not store precise location history unless there is a clear product requirement.

## 12. API and Application Security

### Next.js requirements

- Validate authentication in protected Route Handlers.
- Validate all incoming request bodies.
- Use server-side Supabase clients for protected operations.
- Keep secrets in server-only environment variables.
- Do not expose service-role credentials through public environment variables.
- Avoid returning private database columns.
- Use secure session and cookie handling.
- Avoid logging authentication tokens or QR tokens.

### Environment variables

Example:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
QR_SIGNING_SECRET=
```

The service-role key and signing secret must only be available in trusted server environments.

Do not prefix private secrets with `NEXT_PUBLIC_`.

### CORS and origins

Restrict cross-origin access to the application origins that actually need it.

Do not use permissive wildcard origins for sensitive endpoints.

Use appropriate CSRF protections for cookie-authenticated state-changing operations.

## 13. Rate Limiting and Abuse Prevention

Apply rate limits to:

- Login and password recovery.
- Public enquiry forms.
- QR scan attempts.
- Voucher redemption attempts.
- Flash Drop claims.
- Partner application submissions.

For the MVP, use a simple server-side rate-limiting strategy backed by a shared store or database mechanism appropriate to the deployment environment.

Do not rely only on in-memory counters in Next.js because server instances may not share state.

### Abuse monitoring

Monitor for:

- Repeated invalid QR scans.
- Excessive scan attempts.
- Repeated voucher redemption failures.
- Unusual Flash Drop claim patterns.
- Unexpected changes in business membership.
- Repeated public form submissions.

Do not automatically ban users based on one suspicious signal. Use thresholds, logging, and review.

## 14. Audit Logs

Use the `audit_logs` table for important security-sensitive actions.

Record:

- Actor user ID.
- Business ID when relevant.
- Action type.
- Target resource.
- Timestamp.
- Relevant non-sensitive metadata.
- Outcome.

Examples:

| Action                          | Logged       |
| ------------------------------- | ------------ |
| Business details updated        | Yes          |
| Staff member added or removed   | Yes          |
| Flash Drop created or cancelled | Yes          |
| Voucher redeemed                | Yes          |
| QR code revoked                 | Yes          |
| Admin changes platform content  | Yes          |
| Failed sensitive operation      | Where useful |

Never store passwords, session tokens, full QR tokens, or other secrets in audit logs.

Audit records should not be editable by ordinary users or business staff.

## 15. Privacy and Data Minimisation

Nomads Pipa should collect only information needed to provide its services.

### Suggested data rules

| Data                    | Handling                                                |
| ----------------------- | ------------------------------------------------------- |
| Email                   | Private account information                             |
| Display name            | Public only if user chooses                             |
| Profile photo           | Public only if user chooses                             |
| GPS coordinates         | Optional and purpose-limited                            |
| Scan history            | Visible to user; limited business visibility            |
| Voucher history         | Visible to user and authorised business staff as needed |
| Enquiry contact details | Visible only to authorised recipients                   |
| Analytics               | Aggregated where possible                               |

### Privacy requirements

- Explain why location is requested.
- Do not expose user contact details to unrelated partners.
- Do not make private profile fields publicly queryable.
- Define a retention period for operational logs and enquiries.
- Provide a way to request account deletion.
- Review third-party service access and data sharing.

The production privacy notice and legal compliance requirements should be reviewed before launch.

## 16. File and Image Upload Security

Use Supabase Storage for business images, profile images, and other approved uploads.

### Requirements

- Validate file type.
- Limit file size.
- Use generated storage paths.
- Restrict upload permissions.
- Do not trust the file extension alone.
- Avoid publicly exposing private documents.
- Use public buckets only for content intended to be public.

Suggested buckets:

| Bucket              | Access                           |
| ------------------- | -------------------------------- |
| `business-images`   | Public read, authorised write    |
| `event-images`      | Public read, authorised write    |
| `profile-images`    | Public read only if user opts in |
| `private-documents` | Private, restricted access       |

## 17. Security Testing Checklist

### Authentication

- [ ] Anonymous users cannot access protected endpoints.
- [ ] Expired sessions are rejected.
- [ ] Users cannot impersonate another user by changing request IDs.

### Database

- [ ] RLS is enabled on all private tables.
- [ ] Users cannot read another user's vouchers.
- [ ] Users cannot modify protected profile fields.
- [ ] Business members cannot access unrelated businesses.
- [ ] Staff cannot modify owner or manager permissions.

### QR and rewards

- [ ] Invalid QR tokens are rejected.
- [ ] Expired QR tokens are rejected.
- [ ] Repeated scan requests do not duplicate rewards.
- [ ] Users cannot award themselves points.
- [ ] Quest completion is validated server-side.

### Vouchers

- [ ] Expired vouchers cannot be redeemed.
- [ ] Redeemed vouchers cannot be redeemed again.
- [ ] Staff cannot redeem vouchers for unrelated businesses.
- [ ] Concurrent redemption attempts cannot create duplicate redemptions.

### Flash Drops

- [ ] Inactive campaigns cannot be claimed.
- [ ] Expired campaigns cannot be claimed.
- [ ] Users cannot claim the same campaign twice.
- [ ] The claim limit cannot be exceeded.
- [ ] Users cannot alter campaign settings.

### Operations

- [ ] Private secrets are not exposed in frontend bundles.
- [ ] Sensitive tokens are not written to logs.
- [ ] Rate limits work across application instances.
- [ ] Audit logs capture important partner actions.

## 18. MVP Security Priorities

Build security in this order:

| Priority    | Requirement                                      |
| ----------- | ------------------------------------------------ |
| Must Have   | Supabase Auth and server-side session validation |
| Must Have   | RLS for all private tables                       |
| Must Have   | Business membership permission checks            |
| Must Have   | Secure QR token validation                       |
| Must Have   | Atomic voucher redemption                        |
| Must Have   | Transactional Flash Drop claim limits            |
| Must Have   | No service-role key in browser                   |
| Must Have   | Staff authentication                             |
| Should Have | Rate limiting and abuse monitoring               |
| Should Have | Audit logs for partner operations                |
| Should Have | Account deletion workflow                        |
| Could Have  | Stronger verification for high-value rewards     |
| Could Have  | Advanced fraud detection                         |

## 19. Definition of Done

The security architecture is ready for MVP when:

- Authentication is implemented and tested.
- RLS policies are enabled and tested.
- Business permissions are enforced server-side.
- Staff scanner access requires authentication.
- QR tokens cannot be modified to grant rewards.
- Quest completion is validated server-side.
- Voucher redemption is atomic.
- Flash Drop limits are enforced by PostgreSQL.
- Private secrets are never exposed to the browser.
- Sensitive operations are auditable.
- Rate limits protect critical endpoints.
- User and partner data access is restricted.
- Privacy and retention rules are documented.

---
