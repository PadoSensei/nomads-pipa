# Testing Strategy

**Project:** Nomads Pipa  
**Document:** `docs/TESTING.md`
**Status:** Implementation-ready baseline  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Testing Philosophy

Nomads Pipa will use a test-driven development (TDD) approach supported by automated and manual testing.

The objective is to prevent regressions, protect reward integrity, and allow the application to evolve without breaking existing functionality.

Testing is particularly important because Nomads Pipa handles:

- User accounts and permissions.
- Physical QR code scans.
- Quest progress and reward allocation.
- Voucher claims and redemption.
- Limited-quantity Flash Drops.
- Partner and staff operations.
- Location-based eligibility checks.

**Core principle:** Every critical business rule must have a test before its implementation is considered complete.

## 2. Test-Driven Development (TDD)

TDD will be the default development approach for business logic and critical user flows.

### The Red-Green-Refactor cycle

<escape>```text

1.  RED
    Write a test describing the expected behavior.
    Run it and confirm it fails.

         |

         v

2.  GREEN
    Write the minimum implementation needed
    to make the test pass.

         |

         v

3.  REFACTOR
    Improve the implementation without
    changing its behavior.

         |

         v

4.  REPEAT
    Add the next test and continue.

````</escape>

### Example: Voucher redemption

**Step 1 — Red**

Write a test that expects an active voucher to be redeemable once.

Additional tests should verify:

- An expired voucher cannot be redeemed.
- A redeemed voucher cannot be redeemed again.
- An unauthorized staff member cannot redeem it.
- A staff member cannot redeem a voucher for an unrelated business.

Run the tests and confirm they fail because the functionality has not yet been implemented.

**Step 2 — Green**

Implement the minimum server-side logic and database operations needed to satisfy the tests.

**Step 3 — Refactor**

Improve the code structure, error handling, and readability while keeping all tests passing.

**Step 4 — Repeat**

Add tests for additional scenarios, including simultaneous redemption attempts.

### When TDD is mandatory

Use TDD for:

- Authentication and authorization rules.
- QR validation.
- Scan event processing.
- Quest completion.
- Points and reward allocation.
- Voucher claiming and redemption.
- Flash Drop eligibility and capacity.
- Partner ownership permissions.
- Staff scanner permissions.
- Location-based eligibility.

For simple visual changes, use appropriate component tests and regression checks rather than forcing unnecessary test complexity.

## 3. Testing Pyramid

Use a layered testing strategy.

| Test type | Purpose | Priority |
|---|---|---|
| Unit tests | Test individual functions and business rules | High |
| Integration tests | Test services, APIs, and database behavior | High |
| End-to-end tests | Test complete user journeys | High |
| Component tests | Test UI behavior and interactions | Medium |
| Manual exploratory tests | Discover usability and unexpected issues | Medium |
| Performance tests | Check important system bottlenecks | Before launch |

### Recommended testing tools

| Tool | Purpose |
|---|---|
| Vitest | Unit and integration testing |
| React Testing Library | React component testing |
| Playwright | End-to-end browser testing |
| Supabase local development | Database and authentication testing |
| TypeScript | Compile-time type safety |
| ESLint | Code quality checks |

Keep the toolchain lightweight. Do not introduce additional testing platforms unless they provide a clear benefit.

## 4. Project Testing Structure

Recommended folder organization:

```text
nomads-pipa/
├── app/
├── components/
├── lib/
│   ├── services/
│   ├── validation/
│   └── supabase/
├── tests/
│   ├── unit/
│   │   ├── qr/
│   │   ├── quests/
│   │   ├── vouchers/
│   │   └── flash-drops/
│   ├── integration/
│   │   ├── database/
│   │   ├── api/
│   │   └── auth/
│   ├── e2e/
│   │   ├── consumer/
│   │   ├── partner/
│   │   └── staff/
│   └── fixtures/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── vitest.config.ts
└── playwright.config.ts
````

Keep tests close to the behavior they validate where practical. Use shared fixtures for repeatable test data.

## 5. Unit Testing

Unit tests validate individual functions without requiring the complete application.

### What to test

**QR validation**

- Valid token accepted.
- Invalid signature rejected.
- Expired token rejected.
- Malformed payload rejected.
- Token used in an unauthorized context rejected.

**Quest logic**

- Correct quest step recognized.
- Incomplete quest does not award completion.
- Duplicate scan does not award duplicate progress.
- Completed quest cannot be rewarded twice.
- Ineligible users cannot complete restricted steps.

**Points and inventory**

- Valid reward adds the expected points.
- Invalid events add no points.
- Duplicate reward events are ignored.
- Inventory reflects successfully unlocked artwork.

**Flash Drop**

- Active offer accepts eligible claims.
- Expired offer rejects claims.
- User cannot claim the same offer twice.
- Claim capacity is respected.

**Location eligibility**

- Distance calculation behaves correctly.
- Missing coordinates are handled safely.
- Invalid coordinates are rejected.
- Boundary conditions are tested.

Unit tests should not rely on actual GPS readings or external map services.

## 6. Integration Testing

Integration tests verify that different application components work together.

Use a local Supabase environment or an isolated test database.

### Database integration

Test:

- Foreign key relationships.
- Unique constraints.
- Row Level Security policies.
- Database functions and triggers.
- Transaction behavior.
- Migration execution.
- Rollback and recovery assumptions.

### API integration

Test:

- Request validation.
- Authentication requirements.
- Authorization rules.
- Successful responses.
- Expected error responses.
- Rate limiting.
- Duplicate request handling.

### Critical database behavior

**Voucher redemption**

Test that two simultaneous redemption requests cannot successfully redeem the same voucher.

The database must enforce this through atomic operations and appropriate constraints.

**Flash Drop capacity**

Test that concurrent claims cannot exceed the configured maximum of 10 users.

The limit must be enforced transactionally in PostgreSQL, not through frontend checks.

**Quest rewards**

Test that multiple qualifying scans cannot award the same quest completion reward more than once.

A scan event and a quest completion are separate concepts. A recorded scan must not automatically imply a completed quest.

## 7. End-to-End Testing

End-to-end tests simulate realistic user journeys through the application.

Use Playwright to test the most important workflows.

### Consumer journeys

**Journey A — Account creation**

1. Open Nomads Pipa.
2. Register an account.
3. Complete the required profile information.
4. Access the consumer dashboard.
5. Verify the account is available after signing out and back in.

**Journey B — Quest completion**

1. Sign in as a test user.
2. Open the Quest Tree.
3. Select an available quest.
4. Complete a qualifying action.
5. Verify progress updates.
6. Complete all required steps.
7. Verify the reward is granted once.
8. Check the inventory for the unlocked item.

**Journey C — Voucher redemption**

1. Open the voucher wallet.
2. Select an active voucher.
3. Present the redemption QR.
4. Open the staff scanner using an authorized staff account.
5. Scan the QR.
6. Confirm the business and voucher details.
7. Complete redemption.
8. Verify the voucher appears as redeemed.
9. Attempt another redemption and confirm it is rejected.

### Partner journeys

**Journey D — Flash Drop**

1. Sign in as a partner.
2. Open the Traffic Router dashboard.
3. Create a Flash Drop.
4. Set the discount and expiration.
5. Publish the offer.
6. Verify it is visible to eligible users.
7. Simulate claims from 10 different test accounts.
8. Verify an additional claim is rejected.
9. Verify the offer expires after its configured duration.

**Journey E — Partner analytics**

1. Sign in as a partner.
2. Open the analytics dashboard.
3. Verify scan counts.
4. Verify quest-related activity.
5. Verify voucher redemptions.
6. Confirm the partner cannot access another business's private analytics.

## 8. Security and Permission Testing

Security tests are mandatory before public launch.

### Role-based access

Test these roles:

| Role              | Expected access                              |
| ----------------- | -------------------------------------------- |
| Anonymous visitor | Public directory content only                |
| Consumer          | Own profile, quests, inventory, and vouchers |
| Partner owner     | Authorized business management and analytics |
| Staff             | Assigned business scanner operations         |
| Administrator     | Authorized platform management               |

### Required security tests

- Users cannot access another user's private profile.
- Consumers cannot access partner administration.
- Partners cannot modify another business.
- Staff cannot access unrelated business operations.
- Unauthenticated users cannot redeem vouchers.
- Users cannot award themselves points through client requests.
- Users cannot modify server-validated reward values.
- Supabase RLS policies prevent unauthorized data access.
- Sensitive server secrets are never exposed in browser responses.

### Staff scanner

The staff scanner can have a simplified interface without exposing the main consumer application.

It must still require secure staff authentication.

Test that:

- Staff sessions expire appropriately.
- Staff permissions are checked server-side.
- Staff accounts can only access assigned businesses.
- Scanner actions are recorded for auditing.
- Revoked staff access stops working.

## 9. Location and QR Testing

Physical QR codes and GPS eligibility require special testing.

### QR tests

Test:

- Valid QR.
- Invalid QR.
- Expired QR.
- Replayed QR where the token is intended to be single-use.
- QR associated with the wrong business.
- QR associated with an inactive campaign.
- Repeated scan requests.

### GPS tests

Use controlled test coordinates rather than depending on a physical device's current location.

Test:

- User inside the permitted radius.
- User outside the permitted radius.
- User exactly at the configured boundary.
- Missing GPS permission.
- Unavailable location.
- Invalid coordinates.
- Location timestamp too old.

GPS should be treated as an eligibility signal, not definitive proof of physical presence.

Static physical QR codes can be copied. The system must not treat possession of a QR image as proof that someone visited a business.

## 10. Test Data and Fixtures

Use dedicated test accounts and predictable test records.

### Suggested test accounts

| Account         | Role          | Purpose                     |
| --------------- | ------------- | --------------------------- |
| consumer-test-1 | Consumer      | Standard journey            |
| consumer-test-2 | Consumer      | Duplicate claim testing     |
| consumer-test-3 | Consumer      | Flash Drop capacity testing |
| partner-test-1  | Partner owner | Business dashboard          |
| partner-test-2  | Partner owner | Cross-business permissions  |
| staff-test-1    | Staff         | QR redemption               |
| admin-test-1    | Administrator | Administrative operations   |

These are test identities, not production accounts.

### Test data rules

- Never use real customer data.
- Use clearly identifiable test businesses.
- Reset test data between relevant test runs.
- Use fixed timestamps for expiration tests.
- Use predictable QR fixtures.
- Keep seed data separate from production data.

## 11. CI/CD Testing

Automated tests should run before code is merged into the production branch.

### Pull request pipeline

```text
Pull request opened
       |
       v
Install dependencies
       |
       v
TypeScript checks
       |
       v
ESLint
       |
       v
Unit tests
       |
       v
Integration tests
       |
       v
Production build
       |
       v
End-to-end critical smoke tests
       |
       v
All required checks pass?
       |
   +---+---+
   |       |
  YES      NO
   |       |
   v       v
Merge    Fix issues
```

### Suggested package scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  }
}
```

Adjust scripts to match the actual installed dependencies and project configuration.

### Merge requirements

A pull request should not be merged into `main` if:

- TypeScript checks fail.
- Lint checks fail.
- Required unit tests fail.
- Critical integration tests fail.
- Production build fails.
- Critical end-to-end tests fail.

Do not ignore failing tests simply to complete a deployment.

## 12. Regression Testing

Whenever an existing feature changes, run tests for related functionality.

Examples:

| Change                | Regression tests                            |
| --------------------- | ------------------------------------------- |
| QR validation update  | QR, scan history, quest progress            |
| Voucher update        | Claiming, redemption, duplicate prevention  |
| Quest update          | Progress, completion, rewards, inventory    |
| Flash Drop update     | Eligibility, capacity, expiration           |
| Authentication update | Consumer, partner, staff permissions        |
| Database migration    | Integration tests and affected E2E journeys |
| Navigation update     | Mobile layouts and core user journeys       |

Maintain a small critical smoke-test suite that runs on every production deployment.

## 13. Performance and Mobile Testing

Nomads Pipa is mobile-first. Test using realistic mobile conditions.

### Test scenarios

- Slow mobile connection.
- Small-screen layouts.
- Large-screen layouts.
- Application startup.
- Directory loading.
- Quest Tree rendering.
- QR scanner interaction.
- Voucher wallet loading.
- Partner dashboard loading.

### Performance priorities

- Avoid unnecessary client-side JavaScript.
- Optimize images.
- Avoid excessive database queries.
- Add indexes for frequently queried fields.
- Paginate larger directories and analytics datasets.
- Keep QR validation responsive.
- Monitor Supabase connection and query performance.

The application should remain usable on typical mobile devices and connections available to visitors in Pipa.

## 14. Accessibility and Usability Testing

Check:

- Keyboard navigation.
- Visible focus indicators.
- Form labels.
- Accessible error messages.
- Sufficient text contrast.
- Touch target sizes.
- Screen-reader labels for interactive elements.
- Clear loading and success states.
- Understandable redemption instructions.

Test the consumer experience in English and verify that Portuguese content does not break layouts when translation is introduced.

## 15. MVP Test Priorities

Prioritize tests according to business risk.

### P0 — Must pass before public launch

- Authentication and permissions.
- QR validation.
- Quest completion.
- Points and reward allocation.
- Voucher claim and redemption.
- Duplicate redemption prevention.
- Flash Drop first-10 claim limit.
- Partner data isolation.
- Staff scanner authorization.
- Database RLS policies.

### P1 — Should pass before public launch

- Consumer navigation.
- Business directory.
- Quest
