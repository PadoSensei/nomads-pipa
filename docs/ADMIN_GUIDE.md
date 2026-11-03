# Admin Guide

**Project:** Nomads Pipa  
**Document:** `product/ADMIN_GUIDE.md`  
**Status:** Implementation-ready baseline  
**Audience:** Platform administrators and authorized operators

---

## 1. Purpose

The Admin Dashboard is the operational control center for Nomads Pipa.

It allows authorized administrators to manage the platform without requiring direct database access for routine tasks.

Administrators are responsible for:

- Approving and managing partner businesses.
- Maintaining directory quality.
- Managing quests and rewards.
- Monitoring QR activity.
- Managing vouchers and Flash Drops.
- Moderating community content.
- Supporting users and partners.
- Monitoring platform performance.

The administration experience should be simple enough for a small team to operate while maintaining strong security and accountability.

## 2. Administrator Access

### Roles

Use role-based access control.

| Role             | Responsibilities                                       |
| ---------------- | ------------------------------------------------------ |
| Super Admin      | Full platform configuration and management             |
| Content Admin    | Directory, editorial content, and community moderation |
| Partner Manager  | Business onboarding and partner support                |
| Operations Admin | Quest, QR, voucher, and campaign operations            |
| Support Admin    | User support and issue investigation                   |

For the MVP, these can be permission groups rather than separate application systems.

### Access rules

- Every administrator must have an authenticated account.
- Permissions must be checked server-side.
- Administrative actions must be recorded.
- Sensitive actions should require confirmation.
- Administrators should only receive the permissions needed for their role.
- Shared administrator accounts must not be used.

Never rely on hiding interface elements as the only security control.

## 3. Admin Dashboard Overview

The admin dashboard should provide a summary of platform activity.

### Main dashboard sections

| Section     | Purpose                                         |
| ----------- | ----------------------------------------------- |
| Overview    | Platform activity and important indicators      |
| Businesses  | Partner approvals and directory management      |
| Users       | User accounts and support                       |
| Quests      | Quest creation and management                   |
| Rewards     | Points, badges, and digital artwork             |
| QR & Scans  | Scan monitoring and investigation               |
| Vouchers    | Voucher configuration and redemption monitoring |
| Flash Drops | Limited-time promotional campaigns              |
| Events      | Community calendar management                   |
| Content     | Editorial content and category management       |
| Analytics   | Platform and partner performance                |
| Settings    | Platform configuration                          |

### Overview metrics

Display:

- Total registered users.
- Active users.
- Approved businesses.
- Pending partner applications.
- Active quests.
- Quest completions.
- Validated QR scans.
- Voucher claims and redemptions.
- Active Flash Drops.
- Recent operational errors.

Each metric should have a clear definition and time period.

## 4. Business Management

Administrators need to manage the complete partner lifecycle.

### Business onboarding

Recommended workflow:

```text
Partner submits application
          |
          v
Application enters pending status
          |
          v
Admin reviews information
          |
     +----+----+
     |         |
   Approve   Request changes
     |         |
     v         v
Business    Partner updates
published   application
     |
     v
Partner receives confirmation
```

### Business information

Administrators should be able to review:

- Business name.
- Category and subcategory.
- Description.
- Address and location.
- Contact information.
- Website and social links.
- Opening hours.
- Photos and logo.
- Available offers.
- Partner status.

### Business statuses

| Status            | Meaning                         |
| ----------------- | ------------------------------- |
| Pending           | Awaiting review                 |
| Approved          | Visible in the directory        |
| Changes Requested | Partner must update information |
| Suspended         | Temporarily unavailable         |
| Rejected          | Application not approved        |
| Archived          | Removed from active listings    |

### Admin actions

- Approve a business.
- Request additional information.
- Edit incorrect directory information.
- Suspend a business.
- Reactivate a suspended business.
- Archive an inactive listing.
- Review partner activity.

Every administrative change should be recorded.

## 5. Directory and Category Management

The directory is a curated local discovery experience, not a general-purpose map listing service.

Administrators should maintain useful categories and relevant recommendations.

### Main categories

- Transportation.
- Accommodation.
- Food & Drink.
- Events & Community.
- Sports & Activities.
- Essential Services.
- Wellness.
- Remote Work.
- Community & Social Impact.

### Management capabilities

- Create categories.
- Edit category descriptions.
- Manage subcategories.
- Reorder categories.
- Publish or unpublish categories.
- Feature selected businesses.
- Remove duplicate listings.
- Review outdated information.

### Featured listings

Featured placement should be transparent and controlled.

Where listings are sponsored or paid, identify them appropriately.

## 6. User Management

Administrators need tools to investigate account issues and support users.

### User information

Depending on permissions, administrators may view:

- Display name.
- Email address.
- Registration date.
- Account status.
- Profile completion.
- Quest participation.
- Reward history.
- Voucher activity.

Do not expose unnecessary personal information.

### Admin actions

- Search for a user.
- Review account status.
- Investigate reported problems.
- Suspend an account where justified.
- Restore an account.
- Review relevant reward history.
- Respond to support requests.

### Account suspension

Before suspending an account:

1. Review the relevant activity.
2. Record the reason.
3. Confirm the action.
4. Notify the user where appropriate.
5. Record the administrator responsible.

Avoid deleting user records simply to resolve an operational issue. Follow the platform's data retention and deletion procedures.

## 7. Quest Management

Administrators manage the gamification system.

### Quest creation

A quest should contain:

- Quest title.
- Description.
- Category.
- Artwork.
- Difficulty or experience level.
- Start and end dates where applicable.
- Required steps.
- Reward definition.
- Active status.

### Quest types

Examples:

- Visit a participating business.
- Complete a local experience.
- Attend a community event.
- Explore a selected category.
- Complete a multi-business journey.

### Quest publishing workflow

1. Create the quest.
2. Add quest steps.
3. Define validation requirements.
4. Configure rewards.
5. Preview the consumer experience.
6. Test using a staging account.
7. Publish.

### Quest statuses

- Draft.
- Scheduled.
- Active.
- Paused.
- Completed.
- Archived.

### Important reward rule

A scan event does not automatically equal quest completion.

The backend must validate the required quest conditions before recording completion and awarding rewards.

Administrators must not be able to create rewards that bypass the validation system accidentally.

## 8. Rewards and Digital Inventory

Administrators manage the digital rewards ecosystem.

### Reward types

- Digital badges.
- Collectible artwork.
- Quest completion rewards.
- Loyalty points.
- Status-based bonuses.
- Golden QR eligibility, where configured.

### Reward configuration

Each reward should define:

- Name.
- Description.
- Artwork.
- Reward type.
- Eligibility conditions.
- Related quest or campaign.
- Availability.
- Active status.

### Reward adjustments

Manual reward adjustments should be restricted to authorized administrators.

Every adjustment must record:

- User receiving the adjustment.
- Previous value.
- New value.
- Reason.
- Administrator responsible.
- Timestamp.

Do not allow unrestricted editing of points or inventory without an audit trail.

## 9. QR and Scan Monitoring

Administrators need visibility into QR activity to investigate operational issues.

### Scan records

Display:

- Scan identifier.
- Associated business.
- User reference where authorized.
- Scan timestamp.
- Validation result.
- Related quest.
- Reward outcome.
- Staff account responsible, where applicable.

### Scan statuses

- Received.
- Validated.
- Rejected.
- Duplicate.
- Expired.
- Rewarded.

### Admin investigation

Administrators should be able to:

- Search scans by business.
- Search scans by date.
- Review rejection reasons.
- Investigate duplicate attempts.
- Identify failed reward allocation.
- Review relevant staff actions.

### Security restriction

Administrators should not be able to convert an invalid scan into a valid one through a simple dashboard edit.

Corrections to reward records must use controlled, audited operations.

## 10. Voucher Management

Administrators manage voucher templates, campaigns, and redemption issues.

### Voucher configuration

- Voucher name.
- Description.
- Business.
- Discount or benefit.
- Start date.
- Expiration date.
- Claim limit.
- Redemption rules.
- Active status.

### Voucher statuses

- Draft.
- Active.
- Expired.
- Paused.
- Exhausted.
- Archived.

### Admin capabilities

- Create voucher templates.
- Edit eligible voucher details.
- Pause campaigns.
- Review claims.
- Review redemption history.
- Investigate failed redemptions.
- Review duplicate redemption attempts.

### Redemption integrity

A voucher can only be redeemed once unless its explicit rules support multiple uses.

The database must enforce the applicable redemption constraints.

## 11. Flash Drop Management

Flash Drops are time-limited offers intended to create immediate local engagement.

### Campaign configuration

Administrators should be able to review:

- Partner business.
- Offer description.
- Discount or benefit.
- Geographic eligibility radius.
- Publication time.
- Expiration time.
- Maximum claims.
- Current claims.
- Campaign status.

### Default campaign rules

For the initial MVP:

- Default duration: 90 minutes.
- Default eligibility radius: 2 km.
- Default claim capacity: 10 users.

These defaults should be configurable by authorized administrators.

### Admin controls

- View active campaigns.
- Pause a campaign.
- Cancel an invalid campaign.
- Investigate claim errors.
- Review capacity utilization.
- Review campaign results.

Do not manually increase campaign claims or bypass transactional claim limits.

## 12. Event and Community Management

Administrators maintain the community calendar.

### Event classifications

**Nomads Pipa Meet-up**

Official events organized or endorsed by the Nomads Pipa community.

**Community Pick**

Third-party events where community members have confirmed their intention to attend.

**City Event**

General local events and cultural suggestions.

These labels must remain distinct to avoid implying official endorsement.

### Event information

- Event title.
- Description.
- Date and time.
- Location.
- Organizer.
- Category.
- Event classification.
- Contact or booking link.
- Publication status.

### Admin actions

- Create events.
- Edit event details.
- Approve community submissions.
- Feature selected events.
- Remove outdated events.
- Correct classification.
- Archive completed events.

## 13. Content Management

Administrators maintain editorial content and local information.

### Content types

- Blog articles.
- Guides.
- Local recommendations.
- Emergency information.
- Transportation guides.
- Accommodation information.
- Community announcements.
- Give Back initiatives.

### Publishing workflow

1. Draft content.
2. Review information.
3. Verify relevant external links.
4. Review language and formatting.
5. Preview mobile layout.
6. Publish.
7. Review periodically.

### Translation

For the initial language strategy:

- English is the primary interface language.
- Portuguese content should be available for important local information.
- Automated translations require review.
- Emergency and safety information must be checked carefully.

### Content quality

Administrators should regularly check:

- Broken links.
- Outdated contact details.
- Incorrect opening hours.
- Missing images.
- Formatting issues.
- Outdated events.
- Incorrect translations.

## 14. Support and Moderation

The admin team needs a simple workflow for resolving user and partner problems.

### Support categories

- Account access.
- Profile problems.
- QR scan issues.
- Quest progress.
- Missing rewards.
- Voucher redemption.
- Partner listing corrections.
- Flash Drop problems.
- Community content reports.

### Support records

Each support case should contain:

- Case identifier.
- User or partner reference.
- Issue category.
- Description.
- Status.
- Assigned administrator.
- Resolution notes.
- Created and updated timestamps.

### Support statuses

- Open.
- In Progress.
- Waiting for User.
- Resolved.
- Closed.

### Moderation principles

- Apply consistent rules.
- Record moderation decisions.
- Provide reasons for significant actions.
- Restrict access to sensitive reports.
- Escalate serious safety or security concerns appropriately.

## 15. Analytics and Platform Health

Administrators should have a platform-wide view of performance.

### Key metrics

**Growth**

- Registrations.
- Active users.
- New businesses.
- Business approval rate.

**Engagement**

- Directory usage.
- Business profile views.
- Event engagement.
- Quest starts and completions.

**Traffic Router**

- Validated scans.
- Eligible visits.
- Voucher claims.
- Voucher redemptions.
- Flash Drop performance.

**Operations**

- Failed API requests.
- Authentication errors.
- QR validation errors.
- Database errors.
- Pending partner applications.

### Data integrity

Operational database records remain the source of truth.

Analytics should not invent or infer verified visits, sales, or redemptions from page views or unvalidated scans.

## 16. Platform Settings

Only authorized administrators should access global settings.

Potential settings include:

- Platform name and branding.
- Supported languages.
- Default categories.
- Quest configuration.
- Reward rules.
- Flash Drop defaults.
- Email configuration.
- Community links.
- Support contact details.
- Feature availability.

Sensitive infrastructure secrets must never be editable or displayed through ordinary dashboard forms.

## 17. Audit Log

All sensitive administrative actions should be recorded.

### Audit fields

- Administrator ID.
- Action.
- Target entity type.
- Target entity ID.
- Previous state where appropriate.
- New state where appropriate.
- Reason.
- Timestamp.

### Actions requiring audit records

- Business approval or suspension.
- User suspension or restoration.
- Quest publication or modification.
- Reward adjustment.
- Voucher campaign modification.
- Flash Drop cancellation.
- Event removal.
- Permission changes.
- Administrative configuration changes.

Audit records should be protected against unauthorized modification and deletion.

## 18. Admin Security Requirements

- Require authenticated administrator sessions.
- Enforce role-based authorization server-side.
- Apply least-privilege access.
- Protect sensitive operations with confirmation steps.
- Log privileged actions.
- Never expose Supabase service-role credentials.
- Restrict administrative API endpoints.
- Apply rate limits where appropriate.
- Review administrator access periodically.
- Revoke access when an administrator leaves the team.

High-impact actions should require additional confirmation and may require reauthentication.

## 19. MVP Admin Development Priorities

### P0 — Must Have

- [ ] Secure administrator login.
- [ ] Role-based access.
- [ ] Overview dashboard.
- [ ] Business approval workflow.
- [ ] Directory management.
- [ ] Quest management.
- [ ] Voucher management.
- [ ] QR scan monitoring.
- [ ] Flash Drop monitoring.
- [ ] Audit logging.

### P1 — Should Have

- [ ] User support tools.
- [ ] Event management.
- [ ] Content management.
- [ ] Reward inventory management.
- [ ] Partner analytics.
- [ ] Search and filtering.
- [ ] Support case management.

### P2 — Could Have

- [ ] Advanced reporting.
- [ ] Automated partner onboarding.
- [ ] Bulk content operations.
- [ ] Advanced moderation tools.
- [ ] Automated operational alerts.

## 20. Definition of Done

The Admin Dashboard is ready for MVP launch when:

1. Administrators can authenticate securely.
2. Permissions are enforced server-side.
3. Businesses can be reviewed and approved.
4. Directory content can be maintained.
5. Quests and vouchers can be managed.
6. QR activity can be investigated.
7. Flash Drop campaigns can be monitored.
8. Sensitive actions create audit records.
9. Administrators cannot bypass reward integrity rules.
10. The interface works on desktop and mobile.

**Final principle:** The Admin Dashboard should make Nomads Pipa manageable without making it possible to compromise the integrity of its users, businesses, or reward system.
