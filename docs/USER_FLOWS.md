# User Flows

**Project:** Nomads Pipa  
**File:** `product/USER_FLOWS.md`  
**Status:** Draft  
**Platform:** Mobile-first PWA  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

This document defines how users interact with Nomads Pipa from their first visit through recurring engagement.

It covers four primary user types:

1. **Visitor:** Someone exploring Pipa without an account.
2. **Nomad:** An authenticated user discovering Pipa and participating in the community.
3. **Business partner:** A business owner or manager using the Traffic Router.
4. **Business staff:** An authorised employee scanning QR codes and validating vouchers.

The objective is to make every important feature easy to understand, with clear actions, feedback, and outcomes.

## 2. User Types

| User             | Main motivation                 | Primary actions                                     |
| ---------------- | ------------------------------- | --------------------------------------------------- |
| Visitor          | Discover Pipa                   | Browse businesses, events, and services             |
| Nomad            | Experience Pipa and meet people | Join quests, scan QR codes, collect rewards         |
| Business owner   | Attract customers               | Create offers, track visits, manage business        |
| Business manager | Operate partner tools           | Manage listings, offers, and staff                  |
| Business staff   | Serve customers                 | Scan and redeem vouchers                            |
| Platform admin   | Operate Nomads Pipa             | Approve partners, moderate content, manage platform |

## 3. Core Navigation

### Nomad experience

- Explore
- Events
- Quests
- Wallet
- Profile

Secondary pages:

- Inventory.
- Business details.
- Category discovery.
- Community.
- Settings.

### Partner experience

- Overview.
- Business Profile.
- Traffic Router.
- Flash Drops.
- Analytics.
- Team & Access.
- Settings.

### Staff experience

- Scanner.
- Redemption result.
- Sign out.

---

# PART A — NOMAD FLOWS

## 4. Flow 01: First Visit and Discovery

<badge color="success">MVP — Must Have</badge>

**Goal:** Let visitors understand the value of Nomads Pipa and discover useful local information without requiring registration.

### Entry points

- Direct website visit.
- Shared link.
- QR code.
- Social media.
- Partner referral.

### Steps

1. Visitor opens Nomads Pipa.
2. Homepage displays a clear introduction.
3. Visitor sees today's highlights.
4. Visitor browses the main categories.
5. Visitor selects a category.
6. Visitor sees relevant businesses, services, or events.
7. Visitor opens a listing.
8. Visitor chooses an available action:
   - WhatsApp.
   - Website.
   - Get directions.
   - Enquire.
   - View offer.
9. Visitor can optionally create an account.

### Expected outcome

The visitor discovers something useful without unnecessary friction.

### Edge cases

- No listings available: display a useful empty state.
- Missing business information: hide unavailable fields.
- External link unavailable: show an alternative contact method if configured.
- Slow connection: show loading feedback and preserve navigation.

### Success metric

- Category-to-business-detail click-through rate.
- Business contact CTA clicks.
- Visitor-to-registration conversion.

## 5. Flow 02: Account Registration and Onboarding

<badge color="success">MVP — Must Have</badge>

**Goal:** Create a nomad account with minimal friction.

### Steps

1. User selects "Join Nomads Pipa".
2. Registration screen appears.
3. User enters:
   - Email.
   - Password.
   - Display name.
4. User accepts the applicable terms and privacy notice.
5. User submits the form.
6. Supabase Auth creates the account.
7. Email verification is requested.
8. User verifies their email.
9. Profile is created or completed.
10. User is redirected to the nomad dashboard.

### Optional onboarding

After registration, ask for:

- Preferred language.
- Interests.
- Whether they want community updates.
- Optional profile image.

Do not require location permission or extensive personal information during registration.

### Success state

The user sees a welcome message and a clear next action, such as exploring today's events or starting their first quest.

### Edge cases

| Scenario                 | Behaviour                       |
| ------------------------ | ------------------------------- |
| Email already registered | Explain and offer login         |
| Weak password            | Show validation guidance        |
| Invalid email            | Highlight the field             |
| Verification incomplete  | Show resend verification option |
| Network failure          | Preserve form input             |

## 6. Flow 03: Discover What to Do Today

<badge color="success">MVP — Must Have</badge>

**Goal:** Answer the question: "What should I do in Pipa today?"

### Steps

1. User opens Explore or Events.
2. User sees today's events and highlights.
3. User filters by interests:
   - Social.
   - Music.
   - Sports.
   - Food.
   - Wellness.
   - Culture.
4. User opens an event.
5. Event detail displays:
   - Time.
   - Location.
   - Description.
   - Event type.
   - External booking or contact link.
6. User chooses to attend or share the event.

### Event classification

Every event must display the correct classification:

- **Nomads Pipa Meet-up:** Official community event.
- **Community Pick:** Third-party event with community members confirmed going.
- **City Event:** General local event or cultural suggestion.

Do not display an event as a Community Pick unless the attendance criteria have been met.

### Edge cases

- Event cancelled: display cancellation status.
- Event time changed: update details and notify affected users where possible.
- No events today: suggest upcoming events and other activities.

## 7. Flow 04: Business and Service Discovery

<badge color="success">MVP — Must Have</badge>

**Goal:** Help users find the right local service for their needs.

### Steps

1. User opens Explore.
2. User chooses a category.
3. User selects a contextual filter.
4. System displays matching listings.
5. User opens a business.
6. User reviews the description, tags, contact information, and available offers.
7. User selects the appropriate CTA.

### Contextual discovery examples

| User need                         | Relevant filter or category |
| --------------------------------- | --------------------------- |
| Where can I work remotely?        | Cafes with Wi-Fi and plugs  |
| Where can I get a daily meal?     | PF / Daily Meal             |
| Where can I find vegan food?      | Vegan Options               |
| Where can I listen to live music? | Live Music Tonight          |
| Where can I meet people?          | Events / Community          |
| Where can I get a ride?           | Transportation              |
| Where can I rent a surfboard?     | Sports & Activities         |
| Where can I repair my laptop?     | Essential Services          |

The system should prioritise curated, useful results rather than trying to replicate a full map platform.

## 8. Flow 05: Quest Tree and Quest Participation

<badge color="success">MVP — Must Have</badge>

**Goal:** Encourage exploration through structured challenges and rewards.

### Steps

1. User opens Quests.
2. User sees the Quest Tree.
3. User selects an available quest.
4. Quest detail displays:
   - Description.
   - Required steps.
   - Progress.
   - Potential reward.
   - Relevant participating businesses.
5. User selects "Start Quest".
6. Quest status becomes Active.
7. User completes the required actions.
8. System validates each action.
9. Quest progress updates.
10. When all requirements are met, the quest becomes Completed.
11. Eligible rewards are issued.
12. User receives completion feedback.

### Quest states

| State            | User experience                          |
| ---------------- | ---------------------------------------- |
| Locked           | Requirements displayed where appropriate |
| Available        | Start Quest action                       |
| Active           | Progress and next step                   |
| Completed        | Completion summary                       |
| Reward available | Claim or view reward                     |

### Important business rule

A QR scan is evidence of a possible qualifying action, not automatic quest completion.

The server must verify that the scan corresponds to the correct quest step and satisfies its eligibility rules.

### Edge cases

- User scans the same QR twice: do not duplicate progress.
- QR is expired: show a clear message.
- Quest is no longer active: explain that it cannot be completed.
- User loses connection: do not show completion until the server confirms it.

## 9. Flow 06: QR Scan at a Partner Business

<badge color="success">MVP — Must Have</badge>

**Goal:** Record a valid visit or qualifying interaction.

### Steps

1. User visits a participating business.
2. User opens the Nomads Pipa app.
3. User selects the scan action from the relevant quest or campaign.
4. Camera permission is requested if necessary.
5. User scans the physical QR code.
6. Frontend submits the QR token and an idempotency key.
7. Server validates:
   - User authentication.
   - QR validity.
   - Expiry.
   - Revocation status.
   - Eligibility.
   - Duplicate requests.
8. Server records the scan event.
9. Quest engine evaluates whether the scan completes a step.
10. Frontend displays the server-confirmed result.

### Success feedback

Display:

- Business name.
- Scan result.
- Quest progress update, if applicable.
- Any reward issued.
- Suggested next action.

### Failure states

| Failure         | User message                                     |
| --------------- | ------------------------------------------------ |
| Invalid QR      | This QR code isn't recognised                    |
| Expired QR      | This QR code has expired                         |
| Already scanned | You've already completed this scan               |
| Not eligible    | This scan isn't available for your current quest |
| No connection   | Couldn't verify the scan. Please try again       |

Never issue points or rewards based only on a client-side success animation.

## 10. Flow 07: Inventory and Achievement Collection

<badge color="success">MVP — Must Have</badge>

**Goal:** Give users a visible record of achievements and unlocked digital collectibles.

### Steps

1. User opens Inventory.
2. System loads unlocked achievements.
3. User sees a grid of collectible artwork.
4. User selects an item.
5. Detail view displays:
   - Name.
   - Description.
   - Unlock date.
   - Associated quest or achievement.
6. User can share the achievement if sharing is enabled.

### Business rules

- Users cannot unlock items by changing frontend state.
- Achievements must be issued by validated server-side events.
- Inventory collectibles and redeemable vouchers are separate concepts.

## 11. Flow 08: Voucher Wallet

<badge color="success">MVP — Must Have</badge>

**Goal:** Let users see and use their available partner rewards.

### Steps

1. User opens Wallet.
2. System displays active vouchers.
3. User selects a voucher.
4. Detail view displays:
   - Business.
   - Reward.
   - Expiry.
   - Conditions.
   - Redemption instructions.
5. User visits the business.
6. Staff opens the scanner.
7. Staff scans the voucher QR.
8. Server validates the voucher and staff permissions.
9. Staff confirms the redemption.
10. Database records the redemption.
11. User receives confirmation.
12. Voucher moves to Redeemed.

### Voucher states

- Active.
- Redeemed.
- Expired.
- Revoked.

### Important rule

The user should not be able to redeem their own voucher through an unrestricted consumer endpoint.

Redemption must be confirmed through an authorised business staff workflow.

## 12. Flow 09: Flash Drop Discovery and Claim

<badge color="success">MVP — Must Have</badge>

**Goal:** Let users discover limited-time offers from nearby partners.

### Steps

1. Business manager publishes a Flash Drop.
2. Eligible users see the offer in Explore or the Flash Drops section.
3. User opens the offer.
4. Detail view displays:
   - Business.
   - Offer.
   - Expiry time.
   - Remaining availability, if shown.
   - Eligibility conditions.
5. User selects "Claim Offer".
6. Server validates campaign status and user eligibility.
7. Database checks the claim limit atomically.
8. Claim is created if eligible.
9. User receives a voucher or claim confirmation.
10. User visits the business and follows its redemption instructions.

### First-10-users rule

For campaigns limited to 10 users, the database must enforce the limit.

If the offer is full, display:

"This Flash Drop has been fully claimed."

### Edge cases

- Campaign expired.
- Campaign not yet active.
- User already claimed.
- Campaign fully claimed.
- User does not meet eligibility criteria.
- Network failure during claim.

If the claim request times out, the frontend should check the original request result before creating another claim.

---

# PART B — PARTNER FLOWS

## 13. Flow 10: Become a Partner

<badge color="success">MVP — Must Have</badge>

**Goal:** Allow local businesses to apply to join Nomads Pipa.

### Steps

1. Business owner opens Become a Partner.
2. Partner information page explains the value proposition.
3. Owner selects "Apply Now".
4. Application form appears.
5. Owner enters:
   - Business name.
   - Category.
   - Contact person.
   - Email.
   - WhatsApp number.
   - Location.
   - Website or social link, if available.
6. Owner submits the application.
7. System creates a `partner_applications` record.
8. Admin reviews the application.
9. Application is approved, rejected, or marked for more information.
10. Applicant receives the appropriate response.
11. Approved partner receives access to the business setup process.

### Application states

- Pending.
- Under review.
- Needs information.
- Approved.
- Rejected.

### Edge cases

- Duplicate application: flag for review.
- Missing information: explain required fields.
- Invalid contact details: prevent submission.
- Rejected application: provide an appropriate explanation where possible.

## 14. Flow 11: Business Profile Setup

<badge color="success">MVP — Must Have</badge>

**Goal:** Let approved partners create their public listing.

### Steps

1. Business owner signs in.
2. Owner opens Partner Dashboard.
3. System checks business membership.
4. Setup checklist appears.
5. Owner enters business details.
6. Owner uploads images.
7. Owner selects category and tags.
8. Owner adds contact information and opening hours.
9. Owner reviews the listing preview.
10. Owner submits changes.
11. Listing is published immediately or sent for moderation according to platform policy.

### Completion checklist

- [ ] Business name.
- [ ] Description.
- [ ] Category.
- [ ] Relevant tags.
- [ ] Main image.
- [ ] Location.
- [ ] Contact information.
- [ ] Opening hours or availability information.

### Success metric

Percentage of approved partners who complete their profile.

## 15. Flow 12: Create and Manage QR Campaigns

<badge color="success">MVP — Must Have</badge>

**Goal:** Let partners participate in the Traffic Router ecosystem.

### Steps

1. Owner or manager opens Traffic Router.
2. System displays existing QR campaigns.
3. Partner selects an approved campaign or requests a new one.
4. Partner reviews its purpose and reward rules.
5. Partner confirms participation.
6. Platform generates or activates the appropriate QR code.
7. Partner downloads or prints the QR material.
8. Partner places the QR code at the agreed location.
9. Users scan the code.
10. Partner reviews campaign activity in the dashboard.

### Permissions

Business owners and authorised managers may manage campaign settings within platform rules.

Staff may scan and validate eligible redemptions but cannot change campaign settings.

For MVP, platform-managed quest definitions may be simpler and safer than unrestricted partner-created quests.

## 16. Flow 13: Create a Flash Drop

<badge color="success">MVP — Must Have</badge>

**Goal:** Allow a business to launch a short-term offer to attract nearby nomads.

### Steps

1. Owner or manager opens Flash Drops.
2. Selects "Create Flash Drop".
3. Enters offer details.
4. Selects start and expiry times.
5. Sets maximum claims.
6. Chooses eligible audience and optional geographic targeting.
7. Reviews the offer.
8. Selects Publish.
9. Server validates the partner's permissions and campaign details.
10. Campaign becomes active at the configured start time.
11. Eligible users can discover and claim it.
12. Partner monitors campaign performance.

### Default MVP settings

- Duration: 90 minutes.
- Claim limit: 10.
- Geographic radius: optional 2km targeting.
- One claim per user.

These values should be configurable within platform-defined limits.

### Cancellation

An authorised owner or manager can cancel an active campaign.

Cancellation must prevent future claims but should not silently invalidate already issued vouchers. Existing claims must follow their published terms.

## 17. Flow 14: Partner Analytics

<badge color="success">MVP — Must Have</badge>

**Goal:** Show partners the value generated by Nomads Pipa.

### Steps

1. Owner or manager opens Analytics.
2. System checks business permissions.
3. Dashboard loads business-specific metrics.
4. Partner selects a date range.
5. System displays:
   - Total scans.
   - Unique users.
   - Quest participation.
   - Vouchers issued.
   - Vouchers redeemed.
   - Flash Drop claims.
6. Partner reviews campaign performance.

### Analytics rules

- Data must be scoped to the selected business.
- Metrics should use consistent date definitions.
- Unique user counts should avoid duplicate scan inflation.
- Personal information should not be exposed unnecessarily.

## 18. Flow 15: Manage Business Staff

<badge color="warning">Should Have</badge>

**Goal:** Allow business owners to grant and revoke operational access.

### Steps

1. Owner opens Team & Access.
2. Owner enters the invited staff member's email.
3. Owner assigns an allowed role.
4. System sends an invitation.
5. Staff member signs in or creates an account.
6. Staff membership becomes active.
7. Staff member can access the scanner.
8. Owner can later change the role or remove access.

### Security rules

- Only owners or authorised managers can manage memberships.
- Managers cannot change ownership.
- Staff cannot grant permissions to themselves.
- Removed staff immediately lose business access.

---

# PART C — STAFF FLOWS

## 19. Flow 16: Staff Login

<badge color="success">MVP — Must Have</badge>

**Goal:** Give staff secure access to the scanner without exposing the full partner dashboard.

### Steps

1. Staff opens `/staff/scanner`.
2. If unauthenticated, login screen appears.
3. Staff enters their account credentials.
4. Supabase Auth validates the session.
5. Server checks active business membership.
6. Staff is redirected to the scanner.
7. If the staff member has multiple business memberships, they select the relevant business.

### Failure cases

- No active membership: show an access-denied message.
- Membership revoked: block scanner access.
- Session expired: request login again.
- Business inactive: block relevant operations.

## 20. Flow 17: Staff Voucher Redemption

<badge color="success">MVP — Must Have</badge>

**Goal:** Verify and redeem a customer voucher quickly.

### Steps

1. Staff opens scanner.
2. Camera is activated after permission.
3. Staff scans customer voucher.
4. Frontend submits the token.
5. Server validates staff identity and business membership.
6. Server validates voucher ownership, status, expiry, and business.
7. Server presents the redemption result.
8. Staff confirms redemption if the workflow requires confirmation.
9. Server executes atomic redemption.
10. Scanner displays the final result.

### Result states

| Result               | Action                                       |
| -------------------- | -------------------------------------------- |
| Valid                | Continue to confirmation                     |
| Redeemed             | Explain that voucher was already used        |
| Expired              | Explain expiry                               |
| Invalid              | Reject                                       |
| Wrong business       | Reject                                       |
| Staff not authorised | Block action                                 |
| Network error        | Retry after checking previous request status |

### UX requirement

The interface must make the result immediately understandable, even in a busy business environment.

---

# PART D — ADMIN FLOWS

## 21. Flow 18: Partner Application Review

<badge color="success">MVP — Must Have</badge>

**Goal:** Maintain quality and prevent unverified businesses from publishing misleading listings.

### Steps

1. Admin signs in.
2. Admin opens Partner Applications.
3. System displays pending applications.
4. Admin reviews submitted information.
5. Admin checks business details.
6. Admin approves, rejects, or requests additional information.
7. System updates application status.
8. Applicant receives the appropriate notification.
9. If approved, business setup becomes available.

### Admin actions

- View application.
- Approve.
- Reject.
- Request additional information.
- Add internal notes.

Important actions must be recorded in the audit log.

## 22. Flow 19: Content Moderation

<badge color="warning">Should Have</badge>

**Goal:** Maintain accurate and useful directory and community information.

### Steps

1. Admin opens moderation queue.
2. Admin reviews submitted or flagged content.
3. Admin checks accuracy and relevance.
4. Admin approves, edits, hides, or rejects content according to policy.
5. System records the action.
6. Relevant user or partner receives an update when appropriate.

Moderation applies to:

- Business listings.
- Events.
- Community Picks.
- Posts.
- Partner images.
- Offers.

---

# PART E — EXCEPTIONS AND SYSTEM STATES

## 23. Network Failure

The PWA must handle unreliable mobile connections.

### Expected behaviour

- Display an understandable connection error.
- Preserve unsent form input where practical.
- Allow safe retry.
- Use idempotency keys for transactional actions.
- Never show a successful redemption or reward until confirmed by the server.

Read-only cached content may remain accessible where available.

Critical actions such as QR validation and voucher redemption must require an online server response.

## 24. Location Permission Denied

Location must not be required for basic discovery.

If a user denies permission:

- Continue showing non-location-dependent content.
- Allow manual browsing.
- Explain which features benefit from location.
- Do not repeatedly prompt the user.

Flash Drop eligibility can fall back to campaign rules that do not require GPS, where configured.

## 25. Camera Permission Denied

If the camera is unavailable:

- Explain why camera access is needed.
- Provide instructions to enable permission.
- Offer manual token entry only if supported by the secure backend workflow.
- Do not allow users to bypass server validation.

## 26. Expired or Invalid Content

For expired offers, events, quests, or vouchers:

- Show the correct status.
- Remove unavailable primary actions.
- Preserve useful historical information where appropriate.
- Suggest current alternatives when available.

## 27. Duplicate Requests

The frontend should prevent accidental repeated submissions, but database constraints remain the source of truth.

For transactional actions:

- Generate an idempotency key.
- Reuse the same key when retrying the same operation.
- Do not create a new key just because a request timed out.
- Check the original operation result before submitting a new operation.

This is particularly important for QR scans, voucher redemption, and Flash Drop claims.

---

# PART F — PRIORITISATION

## 28. MoSCoW Flow Priorities

| Flow                            | Priority           |
| ------------------------------- | ------------------ |
| First visit and discovery       | Must Have          |
| Registration and onboarding     | Must Have          |
| Events discovery                | Must Have          |
| Business discovery              | Must Have          |
| Quest participation             | Must Have          |
| QR scan                         | Must Have          |
| Inventory                       | Must Have          |
| Voucher wallet                  | Must Have          |
| Voucher redemption              | Must Have          |
| Flash Drop claim                | Must Have          |
| Partner application             | Must Have          |
| Business profile setup          | Must Have          |
| Traffic Router management       | Must Have          |
| Partner analytics               | Must Have          |
| Staff login and scanner         | Must Have          |
| Staff management                | Should Have        |
| Content moderation              | Should Have        |
| Advanced community interactions | Could Have         |
| Complex social feed             | Won't Have for MVP |
| Native iOS and Android apps     | Won't Have for MVP |
| Advanced AI recommendations     | Won't Have for MVP |

The exact scope should remain aligned with `product/MVP_SCOPE.md`.

## 29. Core Success Metrics

Measure whether the main journeys are working.

### Nomad metrics

- Visitor-to-registration conversion.
- Category-to-business-detail conversion.
- Event detail views.
- Quest starts.
- Quest completion rate.
- QR scans accepted.
- Vouchers issued.
- Voucher redemption rate.
- Returning users.

### Partner metrics

- Partner application submissions.
- Application approval rate.
- Business profile completion.
- Active partner businesses.
- QR scans per business.
- Flash Drop claims.
- Voucher redemptions.
- Partner retention.

### Staff metrics

- Successful voucher validations.
- Average redemption completion time.
- Failed redemption attempts.
- Scanner access failures.

Do not optimise for scan volume alone. The objective is useful engagement and measurable partner value.

## 30. Definition of Done

The user flow specification is complete when:

- Every primary user type has a documented journey.
- Discovery works without registration.
- Registration and authentication are clear.
- Quest progression has explicit validation rules.
- QR scans are separated from reward issuance.
- Voucher redemption is staff-authorised.
- Flash Drop limits are database-enforced.
- Partner onboarding is documented.
- Partner analytics have defined inputs.
- Error and offline states are considered.
- MVP and later-phase features are distinguished.

---

**Next recommended document:** `product/FEATURES.md` — a structured feature catalogue with descriptions, user value, requirements, dependencies, and acceptance criteria for development.
