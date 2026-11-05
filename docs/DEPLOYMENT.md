# Deployment Guide

**Project:** Nomads Pipa  
**Document:** `docs/DEPLOYMENT.md`
**Status:** Implementation-ready baseline  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Deployment Overview

Nomads Pipa will be deployed as a mobile-first Progressive Web App (PWA).

### Recommended infrastructure

| Component            | Service                        | Purpose                                        |
| -------------------- | ------------------------------ | ---------------------------------------------- |
| Frontend and hosting | Vercel                         | Next.js application hosting                    |
| Database             | Supabase PostgreSQL            | Application data                               |
| Authentication       | Supabase Auth                  | User, owner, and staff authentication          |
| File storage         | Supabase Storage               | Business images, avatars, digital artwork      |
| Backend functions    | Next.js server-side routes     | Application business logic                     |
| Source control       | GitHub                         | Version control and deployment integration     |
| Domain               | Custom domain                  | Public application access                      |
| Monitoring           | Vercel and Supabase dashboards | Errors, performance, and infrastructure health |

Keep infrastructure simple during the MVP. Avoid introducing additional services unless a concrete requirement justifies them.

## 2. Environments

Maintain three environments.

### Development

Used by the developer during implementation.

- Local Next.js application.
- Supabase development project.
- Test accounts and sample businesses.
- Test QR codes and vouchers.
- No real customer information.

### Staging

Used for pre-release testing.

- Separate Supabase staging project.
- Production-like configuration.
- Test partner accounts.
- Test staff scanner accounts.
- End-to-end testing of quests, QR scans, and voucher redemption.

### Production

Used by real Nomads Pipa users and partner businesses.

- Production Supabase project.
- Production domain.
- Real authentication and permissions.
- Backups and monitoring enabled.
- No development or test credentials.

**Important:** Never use production customer data in development or staging.

## 3. Repository Structure

Recommended project structure:

```text
nomads-pipa/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (consumer)/
│   ├── (partner)/
│   ├── staff/
│   └── api/
├── components/
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── validation/
│   └── services/
├── hooks/
├── types/
├── public/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── product/
├── architecture/
├── .env.example
├── package.json
└── README.md
```

Keep business logic out of UI components. Server-side operations should be organized into reusable services.

## 4. Environment Variables

Create a local `.env.local` file and configure equivalent variables in Vercel.

Example `.env.example`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

QR_SIGNING_SECRET=

NEXT_PUBLIC_MAP_PROVIDER_KEY=
```

Rules:

- `NEXT_PUBLIC_` variables are exposed to the browser.
- The Supabase service-role key must remain server-side.
- `QR_SIGNING_SECRET` must remain server-side.
- Never commit `.env.local` or production secrets to GitHub.
- Use different credentials for each environment.
- Rotate secrets if they are accidentally exposed.

The map provider key is optional and should only be configured if the MVP actually uses a map integration.

## 5. Supabase Setup

Create separate Supabase projects for development, staging, and production.

For each project:

1. Create the PostgreSQL database.
2. Configure Supabase Auth.
3. Configure Storage buckets.
4. Apply database migrations.
5. Configure Row Level Security (RLS).
6. Configure authentication redirect URLs.
7. Create required database indexes.
8. Verify database permissions.

### Database migrations

All schema changes must be stored as version-controlled SQL migrations.

Recommended workflow:

1. Create a migration locally.
2. Apply it to the development database.
3. Test affected functionality.
4. Apply it to staging.
5. Verify the migration.
6. Apply it to production during a controlled deployment.

Avoid manually changing production database tables through the dashboard without creating a corresponding migration.

### Migration order

Create tables in dependency order:

1. Profiles and base reference tables.
2. Categories.
3. Businesses.
4. Quests and quest steps.
5. User progress and gamification tables.
6. Vouchers and voucher claims.
7. Scan events.
8. Flash Drops and claims.
9. Analytics and supporting tables.

This ensures referenced tables exist before foreign keys are created.

## 6. Vercel Deployment

### Initial setup

1. Push the project repository to GitHub.
2. Connect the repository to Vercel.
3. Select the Next.js framework preset.
4. Configure environment variables.
5. Deploy to a preview environment.
6. Test the application.
7. Connect the production domain.

### Deployment branches

| Git branch       | Deployment          |
| ---------------- | ------------------- |
| `main`           | Production          |
| `develop`        | Staging             |
| Feature branches | Preview deployments |

Configure environment variables separately for Preview and Production deployments.

Do not assume every preview deployment should connect to the production database.

## 7. Build and Deployment Process

Every deployment should follow this sequence:

```text
Developer changes
       |
       v
Feature branch
       |
       v
TypeScript and lint checks
       |
       v
Build validation
       |
       v
Pull request review
       |
       v
Merge into develop
       |
       v
Staging deployment
       |
       v
Functional testing
       |
       v
Merge into main
       |
       v
Production deployment
       |
       v
Post-deployment verification
```

### Required checks

Before merging:

- TypeScript compilation succeeds.
- ESLint checks pass.
- Next.js production build succeeds.
- No secrets are committed.
- Relevant database migrations are included.
- Critical user flows are tested.

Suggested commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Use the project's actual package scripts if they differ.

## 8. QR and Voucher Deployment Considerations

QR redemption and voucher claims require special attention because they involve rewards and business operations.

### QR validation

- QR payloads must be validated server-side.
- Do not trust client-submitted reward values.
- Verify business ownership and staff permissions.
- Reject expired or invalid QR tokens.
- Apply rate limits to scan endpoints.
- Store scan history for auditing.

### Voucher redemption

- Redemption must be atomic.
- A voucher cannot be redeemed twice.
- Validate expiration and eligibility server-side.
- Record the staff member and business involved.
- Return a clear result to the scanner interface.

### Flash Drop

- Enforce the first-10 claim limit in PostgreSQL transactions.
- Use server-side time for offer expiration.
- Prevent duplicate claims by the same user.
- Validate the 2 km eligibility condition server-side.
- Treat GPS as an additional signal, not definitive proof of physical presence.

Never rely on browser-side logic to enforce reward limits.

## 9. PWA Configuration

The application should support installation on compatible mobile devices.

### MVP requirements

- Web app manifest.
- Application name and icons.
- Theme and background colors.
- Responsive layouts.
- HTTPS.
- Installable application experience.
- Appropriate offline fallback.

### Offline behavior

For the MVP, prioritize:

- Cached application shell.
- Clear offline status.
- Read-only access to previously cached content where appropriate.

Do not allow offline voucher redemption or QR reward validation. These actions require server confirmation.

## 10. Domain and HTTPS

Configure a custom domain for production.

Checklist:

- Add the domain in Vercel.
- Configure DNS records.
- Verify domain ownership.
- Enable HTTPS.
- Redirect HTTP to HTTPS.
- Set the canonical application URL.
- Update Supabase authentication redirect URLs.
- Test email authentication links.

Use a separate staging URL to avoid confusion between test and production accounts.

## 11. Storage and Media

Use Supabase Storage for:

- Business logos.
- Business gallery images.
- User avatars.
- Quest artwork.
- Digital badges.
- Promotional images.

Recommended practices:

- Compress uploaded images.
- Generate appropriately sized image variants.
- Restrict upload file types and sizes.
- Use private buckets for sensitive files.
- Use public buckets only for content intended to be publicly accessible.
- Validate upload permissions server-side.

Do not store sensitive personal documents in publicly accessible buckets.

## 12. Monitoring and Backups

### Application monitoring

Monitor:

- Deployment failures.
- Application errors.
- API response failures.
- Authentication issues.
- QR redemption failures.
- Voucher claim failures.
- Flash Drop claim errors.

### Database monitoring

Monitor:

- Database availability.
- Connection usage.
- Slow queries.
- Storage consumption.
- Failed authentication attempts.
- Backup status.

### Backup policy

Before public launch:

- Enable an appropriate Supabase backup plan.
- Confirm backup frequency and retention.
- Document database restoration steps.
- Test a restoration in a non-production environment.

A backup is not sufficient until restoration has been tested.

## 13. Rollback Procedure

If a production deployment introduces a critical issue:

1. Identify the affected deployment.
2. Stop additional deployments.
3. Roll back to the last known-good application deployment.
4. Verify application availability.
5. Check database compatibility.
6. Investigate the cause.
7. Prepare and test a fix in staging.
8. Redeploy after verification.

**Database caution:** Rolling back application code does not automatically reverse database migrations.

Prefer backward-compatible migrations:

- Add new nullable columns before requiring them.
- Avoid immediately removing columns used by the current application.
- Deploy code that supports both old and new structures during transitions.
- Remove obsolete database structures only after the new version is stable.

## 14. Security Deployment Checklist

Before production release:

- [ ] Supabase RLS enabled on user-facing tables.
- [ ] Server-side authorization verified.
- [ ] Service-role key is not exposed to the browser.
- [ ] QR signing secret is server-only.
- [ ] Staff scanner requires authenticated staff access.
- [ ] Business owners can only manage authorized businesses.
- [ ] Voucher redemption is atomic.
- [ ] Flash Drop claim limits are enforced in the database.
- [ ] API endpoints have appropriate validation and rate limits.
- [ ] Authentication redirect URLs are restricted.
- [ ] Production secrets are stored securely.
- [ ] Storage permissions are tested.

## 15. Pre-Launch Deployment Checklist

### Infrastructure

- [ ] GitHub repository connected.
- [ ] Vercel project configured.
- [ ] Development, staging, and production environments separated.
- [ ] Production domain connected.
- [ ] HTTPS working.
- [ ] Supabase production project configured.

### Application

- [ ] Production build succeeds.
- [ ] Mobile navigation tested.
- [ ] PWA installation tested.
- [ ] Authentication tested.
- [ ] Consumer dashboard tested.
- [ ] Partner dashboard tested.
- [ ] Staff scanner tested.

### Core functionality

- [ ] QR scans recorded correctly.
- [ ] Quest progress updates correctly.
- [ ] Points are awarded only after validation.
- [ ] Voucher redemption prevents duplicates.
- [ ] Flash Drop limit is enforced.
- [ ] Expired offers cannot be claimed.
- [ ] Analytics events are recorded correctly.

### Operations

- [ ] Database backup configured.
- [ ] Restoration procedure documented.
- [ ] Monitoring available.
- [ ] Error reporting verified.
- [ ] Rollback procedure understood.

## 16. Solo Developer Operating Routine

### Before development

- Pull the latest changes.
- Confirm the correct environment.
- Check for pending database migrations.

### Before merging

- Run lint and TypeScript checks.
- Run the production build.
- Test affected user flows.
- Review database changes.

### After deployment

- Open the production application.
- Test login.
- Test one critical consumer flow.
- Test one partner or staff flow.
- Check application and database logs.

### Weekly

- Review errors and failed requests.
- Check database usage.
- Verify backup status.
- Review dependency updates.
- Check for exposed secrets or permission mistakes.

---

## 17. Definition of Deployment Ready

Nomads Pipa is deployment-ready when:

1. The production application builds and loads reliably.
2. Authentication and authorization work correctly.
3. Consumer, partner, and staff interfaces are accessible.
4. QR, quest, voucher, and Flash Drop operations are validated server-side.
5. Database migrations are version-controlled.
6. Production secrets are protected.
7. Backups and restoration procedures are documented.
8. A rollback path exists.
9. Critical mobile user flows have been tested.

**Deployment principle:** Keep the MVP infrastructure lean, but never compromise database integrity, authentication, reward validation, or recovery procedures.
