# Nomads Pipa — Partner Guide

**Document:** `product/PARTNER_GUIDE.md`  
**Audience:** Business owners, managers, and authorized staff  
**Status:** Product documentation  
**Platform:** Nomads Pipa PWA

---

## 1. Purpose

The Partner Dashboard helps local businesses attract digital nomads, manage promotions, participate in quests, and measure the results of their participation in Nomads Pipa.

It is part of the Traffic Router ecosystem: a system designed to connect digital nomads with relevant local businesses through curated discovery, quests, QR interactions, and time-limited offers.

The dashboard is separate from the Nomads Pipa administration dashboard.

## 2. Partner Account Setup

### 2.1 Become a Partner

A business can apply through the **Become a Partner** page.

The application should collect:

- Business name and category
- Business description
- Physical address and map location
- Contact name and business contact details
- Opening hours
- Website and social media links
- Photos and logo
- Relevant services and amenities
- Preferred contact method
- Agreement to partner terms

### 2.2 Approval Process

A business must be reviewed before receiving a public listing or promotional access.

Suggested lifecycle:

1. Application submitted
2. Pending review
3. Additional information requested, if necessary
4. Approved or rejected
5. Partner account activated
6. Listing published

Only approved businesses can use partner-only features.

### 2.3 Account Roles

- **Business Owner:** Full access to the business account and its settings.
- **Business Manager:** Manages listings, promotions, and analytics.
- **Staff Member:** Uses authorized scanning and redemption tools.

Each staff member must have an individual authenticated account. The simplified staff scanner does not require access to the full partner dashboard, but it must never be unauthenticated.

## 3. Partner Dashboard

The dashboard should be mobile-first and easy to use during normal business operations.

### Main sections

| Section             | Purpose                               |
| ------------------- | ------------------------------------- |
| Overview            | Key activity and recent performance   |
| Business Profile    | Listing information and opening hours |
| Offers              | Standard discounts and promotions     |
| Flash Drops         | Time-limited local offers             |
| QR Scanner          | Verify eligible user QR codes         |
| Quest Participation | View participating quests             |
| Voucher Activity    | Review issued and redeemed vouchers   |
| Analytics           | Measure engagement and results        |
| Staff Access        | Manage authorized staff accounts      |

## 4. Business Profile

Partners should be able to maintain accurate information.

Editable fields include:

- Business description
- Categories and tags
- Address and location
- Opening hours
- Contact information
- Photos
- Website and social media
- Amenities and services
- Available offers

Changes to sensitive information or public-facing content may require administrative review.

**Best practice:** Keep opening hours, contact details, and offer conditions current. Incorrect information damages user trust.

## 5. Standard Offers

Partners may create standard offers for Nomads Pipa users.

Each offer should include:

- Offer title
- Description
- Discount or benefit
- Eligibility requirements
- Start and end dates
- Redemption instructions
- Maximum redemptions, if applicable
- Applicable days or time windows
- Active or paused status

Examples include a percentage discount, a complimentary extra, or a special menu price.

The platform should clearly display restrictions before a user claims or redeems an offer.

## 6. Flash Drops

### 6.1 What Is a Flash Drop?

A Flash Drop is a short-lived promotion designed to bring nearby nomads to a partner business.

The intended default configuration is:

- Duration: 90 minutes
- Target radius: 2 km
- Claim limit: First 10 eligible users
- Availability: Subject to partner plan and platform rules

The partner can activate a Flash Drop from the dashboard.

### 6.2 Creating a Flash Drop

The partner should:

1. Choose an offer or create a new one.
2. Enter the benefit and redemption conditions.
3. Confirm the available quantity.
4. Review the 90-minute validity period.
5. Confirm the offer.
6. Activate the Flash Drop.

The platform should display the activation time, expiration time, remaining claims, and current status.

### 6.3 Claim and Redemption Rules

- Claims must be recorded server-side.
- The first-10 limit must be enforced transactionally in PostgreSQL.
- A user should not be able to claim the same limited offer multiple times unless the offer explicitly permits it.
- Expired or exhausted offers must not accept additional claims.
- Redemption must be validated before the business provides the benefit.

The partner should not rely on screenshots or a user's claim confirmation alone as proof of redemption.

## 7. QR Scanner

### 7.1 Purpose

The QR Scanner allows authorized staff to validate user rewards, vouchers, and eligible quest interactions.

The scanner should be a simplified mobile interface with minimal navigation.

### 7.2 Staff Workflow

1. Staff member opens the authorized scanner.
2. Staff member signs in using their individual account.
3. Staff member scans the user's QR code.
4. The server validates the QR token and its intended use.
5. The scanner displays the result.
6. Staff member follows the displayed instructions.

Possible results:

- **Valid:** The requested action can proceed.
- **Already Redeemed:** The voucher or reward has already been used.
- **Expired:** The token or offer is no longer valid.
- **Not Eligible:** The user does not meet the offer conditions.
- **Invalid:** The QR code cannot be verified.
- **Temporarily Unavailable:** Validation could not be completed.

### 7.3 Security Rules

- Staff access must be restricted to the assigned business.
- Staff must not be able to view another business's customer or redemption records.
- QR validation must happen on the server.
- QR tokens must be protected against replay and unauthorized reuse.
- Redemption must be atomic to prevent double redemption.
- Staff actions must be recorded in an audit trail.

A physical QR code is not proof of a user's physical presence. GPS may be used as an additional signal, but should not be treated as definitive proof.

## 8. Quest Participation

Partners may participate in quests that encourage users to discover local businesses.

A quest may require a user to visit a location, scan a QR code, or complete another defined activity.

The partner should be able to see:

- Active quests involving their business
- The action required from users
- Reward or benefit conditions
- Quest validity period
- Relevant completion activity

A scan event does not automatically mean a quest has been completed. The platform validates the event against the quest's rules before awarding progress or rewards.

## 9. Vouchers and Rewards

Partners may accept eligible vouchers generated by Nomads Pipa.

Before providing a benefit, staff should confirm:

- The voucher is valid.
- The voucher applies to the business.
- The voucher has not expired.
- The voucher has not already been redeemed.
- The user meets any stated conditions.

A successful redemption should immediately update the voucher status and create a corresponding redemption record.

If validation fails, staff should not manually mark the voucher as redeemed.

## 10. Analytics and ROI

The dashboard should help partners understand whether Nomads Pipa is generating useful engagement.

### Core metrics

| Metric              | Meaning                                            |
| ------------------- | -------------------------------------------------- |
| QR Scans            | Valid QR interactions at the business              |
| Voucher Claims      | Vouchers claimed by users                          |
| Voucher Redemptions | Vouchers successfully redeemed                     |
| Quest Completions   | Validated quest completions involving the business |
| Flash Drop Claims   | Users who claimed a Flash Drop                     |
| Offer Conversion    | Claims that resulted in redemption                 |
| Returning Users     | Users with more than one qualifying interaction    |

### Suggested calculations

**Voucher redemption rate**

`Successful voucher redemptions / Total voucher claims × 100`

**Flash Drop conversion rate**

`Successful Flash Drop redemptions / Total Flash Drop claims × 100`

Metrics should clearly distinguish claims, scans, and completed redemptions. They represent different stages of user engagement.

### Reporting Principles

- Show the reporting period.
- Use clear metric definitions.
- Avoid presenting estimates as verified visits or sales.
- Do not expose individual user information unnecessarily.
- Provide downloadable reports only where supported by partner permissions.

Nomads Pipa can measure platform interactions, but should not claim that every scan represents a purchase or a confirmed visit.

## 11. Staff Management

Business owners and authorized managers should be able to:

- Invite staff members.
- Assign scanner-only access.
- Suspend or revoke staff access.
- Review staff redemption activity.
- See when staff accounts were last active, where available.

Staff permissions should follow least-privilege principles.

A staff member should not be able to edit the business profile, manage billing, or access full analytics unless explicitly authorized.

## 12. Partner Responsibilities

Partners agree to:

- Maintain accurate business information.
- Honor published offer conditions.
- Train staff to use the scanner correctly.
- Protect their account credentials.
- Avoid sharing staff accounts.
- Respect user privacy.
- Notify Nomads Pipa of material changes.
- Contact support when suspicious activity or technical problems occur.

Partners should not collect additional personal information from users unless necessary and legally appropriate.

## 13. Troubleshooting

| Problem                        | Recommended action                                                |
| ------------------------------ | ----------------------------------------------------------------- |
| QR code does not scan          | Improve lighting, reposition the camera, or request a new code    |
| QR code is invalid             | Do not redeem; ask the user to refresh the app or contact support |
| Voucher already redeemed       | Do not provide a second redemption automatically                  |
| Flash Drop unavailable         | Check its expiration and claim limit                              |
| Staff cannot sign in           | Verify account activation and contact the business owner          |
| Incorrect business information | Update the profile or contact support if editing is restricted    |
| Scanner cannot connect         | Check connectivity and retry before providing the benefit         |

Partners should never bypass server validation because of a scanner error.

## 14. Partner Support

The dashboard should provide a clear support route for:

- Account and access problems
- Business listing changes
- Offer configuration
- QR validation issues
- Voucher disputes
- Flash Drop problems
- Analytics questions
- Billing and partnership questions

Support requests should include the business name, issue category, approximate time, and relevant transaction reference where available. Avoid sending passwords or sensitive customer data.

## 15. Feature Priorities

### Must Have

- Partner application and approval
- Secure partner accounts
- Business profile management
- Staff scanner authentication
- Server-side QR validation
- Voucher redemption
- Basic activity analytics
- Business-scoped permissions

### Should Have

- Flash Drops
- Quest participation dashboard
- Staff management
- Advanced offer configuration
- Downloadable reports

### Could Have

- Automated campaign suggestions
- Advanced ROI reporting
- Scheduled promotions
- Multi-location business management

### Won't Have in Initial MVP

- Full point-of-sale integration
- Guaranteed attribution of offline sales
- Automated business accounting
- Complex customer relationship management

## 16. Definition of Done

The partner experience is ready for MVP when:

- Approved partners can access their dashboard.
- Partners can update their business profiles.
- Authorized staff can sign in to the simplified scanner.
- Staff access is restricted to the assigned business.
- Valid QR codes can be verified server-side.
- Voucher redemption cannot happen twice.
- Flash Drop claim limits are enforced server-side.
- Partners can distinguish scans, claims, and redemptions.
- Partner actions are auditable.
- The core experience works on mobile devices.

---

**Product principle:** Nomads Pipa should make participation simple for local businesses while keeping user rewards, redemptions, and business data secure and verifiable.
